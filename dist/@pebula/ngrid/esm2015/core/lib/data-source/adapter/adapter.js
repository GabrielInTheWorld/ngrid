import { Subject, combineLatest, of, from, isObservable, asapScheduler } from 'rxjs';
import { filter, map, switchMap, tap, debounceTime, observeOn } from 'rxjs/operators';
import { filter as filteringFn } from '../triggers/filter';
import { applySort } from '../triggers/sort';
import { createChangeContainer, fromRefreshDataWrapper, EMPTY } from './utils';
const CUSTOM_BEHAVIOR_TRIGGER_KEYS = ['sort', 'filter', 'pagination'];
const TRIGGER_KEYS = [...CUSTOM_BEHAVIOR_TRIGGER_KEYS, 'data'];
const SOURCE_CHANGING_TOKEN = {};
const DEFAULT_INITIAL_CACHE_STATE = { filter: EMPTY, sort: EMPTY, pagination: {}, data: EMPTY };
/**
 * An adapter that handles changes
 */
export class PblDataSourceAdapter {
    /**
     * A Data Source adapter contains flow logic for the datasource and subsequent emissions of datasource instances.
     * The logic is determined by the combination of the config object and the sourceFactory provided to this adapter, making this adapter actually a container.
     *
     * There are 4 triggers that are responsible for datasource emissions, when one of them is triggered it will invoke the `sourceFactory`
     * returning a new datasource, i.e. a new datasource emission.
     *
     * The triggers are: filter, sort, pagination and refresh.
     *
     * The refresh trigger does not effect the input sent to the `sourceFactory` function, it is just a mean to initiate a call to create a new
     * datasource without changing previous flow variables.
     * It's important to note that calling `sourceFactory` with the same input 2 or more times does not guarantee identical response. For example
     * calling a remote server that might change it's data between calls.
     *
     * All other triggers (3) will change the input sent to the `sourceFactory` function which will use them to return a datasource.
     *
     * The input sent to `sourceFactory` is the values that each of the 3 triggers yields, when one trigger changes a new value for it is sent
     * and the last values of the other 2 triggers is sent with it. i.e. the combination of the last known value for all 3 triggers is sent.
     *
     * To enable smart caching and data management `sourceFactory` does not get the raw values of each trigger. `sourceFactory` will get
     * an event object that contains metadata about each trigger, whether it triggered the change or not as well as old and new values.
     *
     * The returned value from `sourceFactory` is then used as the datasource, applying all triggers that are not overridden by the user.
     * The returned value of `sourceFactory` can be a `DataSourceOf` or `false`.
     *   - `DataSourceOf` means a valid datasource, either observable/promise of array or an array.
     *   - `false` means skip, returning false will instruct the adapter to skip execution for this trigger cycle.
     *
     * Using a trigger is a binary configuration option, when a trigger is turned on it means that changes to it will be passed to the `sourceFactory`.
     * When a trigger is turned off it is not listened to and `undefined` will be sent as a value for it to the `sourceFactory`.
     *
     * The adapter comes with built in flow logic for all 3 triggers, when a trigger is turned off the adapter will take the result of `sourceFactory` and
     * apply the default behavior to it.
     *
     * For all triggers, the default behavior means client implementation. For filtering, client side filtering. For sorting, client side sorting.
     * For Pagination, client side pagination.
     *
     * You can opt in to one or more triggers and implement your own behavior inside the `sourceFactory`
     * @param sourceFactory - A function that returns the datasource based on flow instructions.
     * The instructions are optional, they might or might not exist depending on the configuration of the adapter.
     * When `sourceFactory` returns false the entire trigger cycle is skipped.
     * @param config - A configuration object describing how this adapter should behave.
     */
    constructor(sourceFactory, config) {
        this.sourceFactory = sourceFactory;
        this._inFlight = new Set();
        this._inPreFlight = false;
        this.config = Object.assign({}, config || {});
        this._refresh$ = new Subject();
        this._onSourceChange$ = new Subject();
        this.onSourceChanged = this._onSourceChange$.pipe(filter(d => d !== SOURCE_CHANGING_TOKEN));
        this.onSourceChanging = this._onSourceChange$.pipe(filter(d => d === SOURCE_CHANGING_TOKEN));
    }
    static hasCustomBehavior(config) {
        for (const key of CUSTOM_BEHAVIOR_TRIGGER_KEYS) {
            if (!!config[key]) {
                return true;
            }
        }
        return false;
    }
    /** Returns true if the event is triggered from a custom behavior (filter, sort and/or pagination and the configuration allows it) */
    static isCustomBehaviorEvent(event, config) {
        for (const key of CUSTOM_BEHAVIOR_TRIGGER_KEYS) {
            if (!!config[key] && event[key].changed) {
                return true;
            }
        }
        return false;
    }
    get inFlight() { return this._inPreFlight || this._inFlight.size > 0; }
    dispose() {
        this._refresh$.complete();
        this._onSourceChange$.complete();
    }
    refresh(data) {
        this._refresh$.next({ data });
    }
    /**
     * Clears the cache from any existing datasource trigger such as filter, sort etc.
     * @returns The cached value or null if not there.
     */
    clearCache(cacheKey) {
        if (cacheKey in this.cache) {
            const prev = this.cache[cacheKey];
            this.cache[cacheKey] = DEFAULT_INITIAL_CACHE_STATE[cacheKey];
            return prev;
        }
        else {
            return null;
        }
    }
    setPaginator(paginator) {
        this.paginator = paginator;
    }
    updateProcessingLogic(filter$, sort$, pagination$, initialState = {}) {
        let updates = -1;
        const changedFilter = e => updates === -1 || e.changed;
        const skipUpdate = (o) => o.skipUpdate !== true;
        this._lastSource = undefined;
        this.cache = Object.assign(Object.assign({}, DEFAULT_INITIAL_CACHE_STATE), initialState);
        const combine = [
            filter$.pipe(map(value => createChangeContainer('filter', value, this.cache)), filter(changedFilter)),
            sort$.pipe(filter(skipUpdate), map(value => createChangeContainer('sort', value, this.cache)), filter(changedFilter)),
            pagination$.pipe(map(value => createChangeContainer('pagination', value, this.cache)), filter(changedFilter)),
            this._refresh$.pipe(map(value => fromRefreshDataWrapper(createChangeContainer('data', value, this.cache))), filter(changedFilter)),
        ];
        const hasCustomBehavior = PblDataSourceAdapter.hasCustomBehavior(this.config);
        return combineLatest([combine[0], combine[1], combine[2], combine[3]])
            .pipe(tap(() => this._inPreFlight = true), 
        // Defer to next loop cycle, until no more incoming.
        // We use an async schedular here (instead of asapSchedular) because we want to have the largest debounce window without compromising integrity
        // With an async schedular we know we will run after all micro-tasks but before "real" async operations.
        debounceTime(0), switchMap(([filterInput, sort, pagination, data]) => {
            this._inPreFlight = false;
            updates++; // if first, will be 0 now (starts from -1).
            const event = {
                id: Math.random() * 10,
                filter: filterInput,
                sort,
                pagination,
                data,
                eventSource: data.changed ? 'data' : 'customTrigger',
                isInitial: updates === 0,
                updateTotalLength: (totalLength) => {
                    if (this.paginator) {
                        this.paginator.total = totalLength;
                    }
                }
            };
            this.onStartOfEvent(event);
            const runHandle = data.changed
                || (hasCustomBehavior && PblDataSourceAdapter.isCustomBehaviorEvent(event, this.config));
            const response$ = runHandle
                ? this.runHandle(event)
                    .pipe(map(data => {
                    if (data !== false) { // if the user didn't return "false" from his handler, we infer data was changed!
                        event.data.changed = true;
                    }
                    return { event, data };
                }))
                : of({ event, data: this._lastSource });
            return response$
                .pipe(map(response => {
                var _a;
                // If runHandle() returned false, we do not process and return undefined.
                if (response.data === false) {
                    return;
                }
                const config = this.config;
                const event = response.event;
                // mark which of the triggers has changes
                // The logic is based on the user's configuration and the incoming event
                const withChanges = {};
                for (const key of CUSTOM_BEHAVIOR_TRIGGER_KEYS) {
                    if (!config[key] && (event.isInitial || event[key].changed)) {
                        withChanges[key] = true;
                    }
                }
                // When data changed, apply some logic (caching, operational, etc...)
                if (event.data.changed) {
                    // cache the data when it has changed.
                    this._lastSource = response.data;
                    if (config.sort) {
                        // When the user is sorting (i.e. server sorting), the last sort cached is always the last source we get from the user.
                        this._lastSortedSource = this._lastSource;
                    }
                    else {
                        // When user is NOT sorting (we sort locally) AND the data has changed we need to apply sorting on it
                        // this might already be true (if sorting was the trigger)...
                        withChanges.sort = true;
                        // because we sort and then filter, filtering updates are also triggered by sort updated
                        withChanges.filter = true;
                    }
                    if (config.filter) {
                        // When the user is filtering (i.e. server filtering), the last filter cached is always the last source we get from the user.
                        this._lastFilteredSource = this._lastSource;
                    }
                    else {
                        // When user is NOT filtering (we filter locally) AND the data has changed we need to apply filtering on it
                        // this might already be true (if filtering was the trigger)...
                        withChanges.filter = true;
                    }
                }
                // When user is NOT applying pagination (we paginate locally) AND if we (sort OR filter) locally we also need to paginate locally
                if (!config.pagination && (withChanges.sort || withChanges.filter)) {
                    withChanges.pagination = true;
                }
                // Now, apply: sort --> filter --> pagination     ( ORDER MATTERS!!! )
                if (withChanges.sort) {
                    this._lastSortedSource = this.applySort(this._lastSource, event.sort.curr || event.sort.prev);
                }
                let data = this._lastSortedSource;
                // we check if filter was asked, but also if we have a filter we re-run
                // Only sorting is cached at this point filtering is always calculated
                if (withChanges.filter || (!config.filter && ((_a = event.filter.curr) === null || _a === void 0 ? void 0 : _a.filter))) {
                    data = this._lastFilteredSource = this.applyFilter(data, event.filter.curr || event.filter.prev);
                    if (!this.config.pagination) {
                        if (withChanges.filter || !withChanges.pagination) {
                            this.resetPagination(data.length);
                        }
                    }
                }
                if (withChanges.pagination) {
                    data = this.applyPagination(data);
                }
                const clonedEvent = Object.assign({}, event);
                // We use `combineLatest` which caches pervious events, only new events are replaced.
                // We need to mark everything as NOT CHANGED, so subsequent calls will not have their changed flag set to true.
                //
                // We also clone the object so we can pass on the proper values.
                // We create shallow clones so complex objects (column in sort, user data in data) will not throw on circular.
                // For pagination we deep clone because it contains primitives and we need to also clone the internal change objects.
                for (const k of TRIGGER_KEYS) {
                    clonedEvent[k] = k === 'pagination'
                        ? JSON.parse(JSON.stringify(event[k]))
                        : Object.assign({}, event[k]);
                    event[k].changed = false;
                }
                event.pagination.page.changed = event.pagination.perPage.changed = false;
                return {
                    event: clonedEvent,
                    data,
                    sorted: this._lastSortedSource,
                    filtered: this._lastFilteredSource,
                };
            }), tap(() => this.onEndOfEvent(event)), 
            // If runHandle() returned false, we will get undefined here, we do not emit these to the grid, nothing to do.
            filter(r => !!r));
        }));
    }
    applyFilter(data, dataSourceFilter) {
        return filteringFn(data, dataSourceFilter);
    }
    applySort(data, event) {
        return applySort(event.column, event.sort, data);
    }
    applyPagination(data) {
        if (this.paginator) {
            // Set the rendered rows length to the virtual page size. Fill in the data provided
            // from the index start until the end index or pagination size, whichever is smaller.
            const range = this.paginator.range;
            return data.slice(range[0], range[1]);
        }
        return data;
    }
    resetPagination(totalLength) {
        if (this.paginator) {
            this.paginator.total = totalLength;
            this.paginator.page = totalLength > 0 ? 1 : 0;
        }
    }
    onStartOfEvent(event) {
        this._inFlight.add(event);
    }
    onEndOfEvent(event) {
        this._inFlight.delete(event);
    }
    emitOnSourceChanging(event) {
        this._onSourceChange$.next(SOURCE_CHANGING_TOKEN);
    }
    emitOnSourceChanged(event, data) {
        this._onSourceChange$.next(data);
    }
    /**
     * Execute the user-provided function that returns the data collection.
     * This method wraps each of the triggers with a container providing metadata for the trigger. (Old value, was changed? and new value if changed)
     * This is where all cache logic is managed (createChangeContainer).
     *
     * To build a data collection the information from all triggers is required, even if it was not changed.
     * When a trigger is fired with a new value the new value replaces the old value for the trigger and all other triggers will keep their old value.
     * Sending the triggers to the handlers is not enough, we also need to the handlers which of the trigger's have change so they can return
     * data without doing redundant work.
     * For example, fetching paginated data from the server requires a call whenever the pages changes but if the filtering is local for the current page
     * and the filter trigger is fired the handler needs to know that pagination did not change so it will not go and fetch data from the server.
     *
     * The handler can return several data structures, observable, promise, array or false.
     * This method will normalize the response into an observable and notify that the source changed (onSourceChanged).
     *
     * When the response is false that handler wants to skip this cycle, this means that onSourceChanged will not emit and
     * a dead-end observable is returned (observable that will never emit).
     */
    runHandle(event) {
        const result = this.sourceFactory(event);
        if (result === false) {
            return of(false);
        }
        this.emitOnSourceChanging(event);
        const obs = Array.isArray(result)
            ? of(result)
            // else ->            observable : promise
            : (isObservable(result) ? result : from(result))
                .pipe(map(data => Array.isArray(data) ? data : [])) // TODO: should we error? warn? notify?
        ;
        return obs.pipe(observeOn(asapScheduler, 0), // run as a micro-task
        tap(data => this.emitOnSourceChanged(event, data)));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmdyaWQvY29yZS9zcmMvbGliL2RhdGEtc291cmNlL2FkYXB0ZXIvYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWMsT0FBTyxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDakcsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHdEYsT0FBTyxFQUFvQixNQUFNLElBQUksV0FBVyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDN0UsT0FBTyxFQUFnQyxTQUFTLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQVkzRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsc0JBQXNCLEVBQUUsS0FBSyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBRS9FLE1BQU0sNEJBQTRCLEdBQW1ELENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQztBQUN0SCxNQUFNLFlBQVksR0FBdUMsQ0FBQyxHQUFHLDRCQUE0QixFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ25HLE1BQU0scUJBQXFCLEdBQUcsRUFBRSxDQUFDO0FBRWpDLE1BQU0sMkJBQTJCLEdBQW1DLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO0FBRWhJOztHQUVHO0FBQ0gsTUFBTSxPQUFPLG9CQUFvQjtJQXVDL0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BeUNHO0lBQ0gsWUFBbUIsYUFBMkQsRUFDbEUsTUFBa0Y7UUFE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LE1BQU0sQ0FBQyxDQUFDO2lCQUMzQyxJQUFJLENBQUMsR0FBRyxDQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUUsQ0FBQyxDQUFDLHVDQUF1QztTQUNsRztRQUVELE9BQU8sR0FBRyxDQUFDLElBQUksQ0FDYixTQUFTLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxFQUFFLHNCQUFzQjtRQUNuRCxHQUFHLENBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxFQUFFLElBQVcsQ0FBQyxDQUFFLENBQzVELENBQUM7SUFDSixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0LCBjb21iaW5lTGF0ZXN0LCBvZiwgZnJvbSwgaXNPYnNlcnZhYmxlLCBhc2FwU2NoZWR1bGVyIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIG1hcCwgc3dpdGNoTWFwLCB0YXAsIGRlYm91bmNlVGltZSwgb2JzZXJ2ZU9uIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBQYmxQYWdpbmF0b3IsIFBibFBhZ2luYXRvckNoYW5nZUV2ZW50IH0gZnJvbSAnLi4vdHJpZ2dlcnMvcGFnaW5hdGlvbi90eXBlcyc7XG5pbXBvcnQgeyBEYXRhU291cmNlRmlsdGVyLCBmaWx0ZXIgYXMgZmlsdGVyaW5nRm4gfSBmcm9tICcuLi90cmlnZ2Vycy9maWx0ZXInO1xuaW1wb3J0IHsgUGJsTmdyaWREYXRhU291cmNlU29ydENoYW5nZSwgYXBwbHlTb3J0IH0gZnJvbSAnLi4vdHJpZ2dlcnMvc29ydCc7XG5cbmltcG9ydCB7XG4gIFJlZnJlc2hEYXRhV3JhcHBlcixcbiAgUGJsRGF0YVNvdXJjZUNvbmZpZ3VyYWJsZVRyaWdnZXJzLFxuICBQYmxEYXRhU291cmNlVHJpZ2dlcnMsXG4gIFBibERhdGFTb3VyY2VUcmlnZ2VyQ2FjaGUsXG4gIFBibERhdGFTb3VyY2VUcmlnZ2VyQ2hhbmdlZEV2ZW50LFxuICBUcmlnZ2VyQ2hhbmdlZEV2ZW50Rm9yLFxuICBQYmxEYXRhU291cmNlQWRhcHRlclByb2Nlc3NlZFJlc3VsdCxcbiAgUGJsRGF0YVNvdXJjZVRyaWdnZXJDaGFuZ2VIYW5kbGVyLFxufSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IGNyZWF0ZUNoYW5nZUNvbnRhaW5lciwgZnJvbVJlZnJlc2hEYXRhV3JhcHBlciwgRU1QVFkgfSBmcm9tICcuL3V0aWxzJztcblxuY29uc3QgQ1VTVE9NX0JFSEFWSU9SX1RSSUdHRVJfS0VZUzogQXJyYXk8a2V5b2YgUGJsRGF0YVNvdXJjZUNvbmZpZ3VyYWJsZVRyaWdnZXJzPiA9IFsnc29ydCcsICdmaWx0ZXInLCAncGFnaW5hdGlvbiddO1xuY29uc3QgVFJJR0dFUl9LRVlTOiBBcnJheTxrZXlvZiBQYmxEYXRhU291cmNlVHJpZ2dlcnM+ID0gWy4uLkNVU1RPTV9CRUhBVklPUl9UUklHR0VSX0tFWVMsICdkYXRhJ107XG5jb25zdCBTT1VSQ0VfQ0hBTkdJTkdfVE9LRU4gPSB7fTtcblxuY29uc3QgREVGQVVMVF9JTklUSUFMX0NBQ0hFX1NUQVRFOiBQYmxEYXRhU291cmNlVHJpZ2dlckNhY2hlPGFueT4gPSB7IGZpbHRlcjogRU1QVFksIHNvcnQ6IEVNUFRZLCBwYWdpbmF0aW9uOiB7fSwgZGF0YTogRU1QVFkgfTtcblxuLyoqXG4gKiBBbiBhZGFwdGVyIHRoYXQgaGFuZGxlcyBjaGFuZ2VzXG4gKi9cbmV4cG9ydCBjbGFzcyBQYmxEYXRhU291cmNlQWRhcHRlcjxUID0gYW55LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFREYXRhID0gYW55LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRFdmVudCBleHRlbmRzIFBibERhdGFTb3VyY2VUcmlnZ2VyQ2hhbmdlZEV2ZW50PFREYXRhPiA9IFBibERhdGFTb3VyY2VUcmlnZ2VyQ2hhbmdlZEV2ZW50PFREYXRhPj4ge1xuXG4gIHN0YXRpYyBoYXNDdXN0b21CZWhhdmlvcihjb25maWc6IFBhcnRpYWw8UmVjb3JkPGtleW9mIFBibERhdGFTb3VyY2VDb25maWd1cmFibGVUcmlnZ2VycywgYm9vbGVhbj4+KTogYm9vbGVhbiB7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgQ1VTVE9NX0JFSEFWSU9SX1RSSUdHRVJfS0VZUykge1xuICAgICAgaWYgKCEhY29uZmlnW2tleV0pIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKiBSZXR1cm5zIHRydWUgaWYgdGhlIGV2ZW50IGlzIHRyaWdnZXJlZCBmcm9tIGEgY3VzdG9tIGJlaGF2aW9yIChmaWx0ZXIsIHNvcnQgYW5kL29yIHBhZ2luYXRpb24gYW5kIHRoZSBjb25maWd1cmF0aW9uIGFsbG93cyBpdCkgKi9cbiAgc3RhdGljIGlzQ3VzdG9tQmVoYXZpb3JFdmVudChldmVudDogUGJsRGF0YVNvdXJjZVRyaWdnZXJDaGFuZ2VkRXZlbnQsIGNvbmZpZzogUGFydGlhbDxSZWNvcmQ8a2V5b2YgUGJsRGF0YVNvdXJjZUNvbmZpZ3VyYWJsZVRyaWdnZXJzLCBib29sZWFuPj4pIHtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBDVVNUT01fQkVIQVZJT1JfVFJJR0dFUl9LRVlTKSB7XG4gICAgICBpZiAoISFjb25maWdba2V5XSAmJiBldmVudFtrZXldLmNoYW5nZWQpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJlYWRvbmx5IG9uU291cmNlQ2hhbmdlZDogT2JzZXJ2YWJsZTxUW10+O1xuICByZWFkb25seSBvblNvdXJjZUNoYW5naW5nOiBPYnNlcnZhYmxlPHZvaWQ+O1xuXG4gIGdldCBpbkZsaWdodCgpIHsgcmV0dXJuIHRoaXMuX2luUHJlRmxpZ2h0IHx8IHRoaXMuX2luRmxpZ2h0LnNpemUgPiAwOyB9XG5cbiAgcHJvdGVjdGVkIHBhZ2luYXRvcj86IFBibFBhZ2luYXRvcjxhbnk+O1xuICBwcml2YXRlIHJlYWRvbmx5IGNvbmZpZzogUGFydGlhbDxSZWNvcmQ8a2V5b2YgUGJsRGF0YVNvdXJjZUNvbmZpZ3VyYWJsZVRyaWdnZXJzLCBib29sZWFuPj47XG4gIHByaXZhdGUgY2FjaGU6IFBibERhdGFTb3VyY2VUcmlnZ2VyQ2FjaGU8VERhdGE+O1xuICBwcml2YXRlIF9vblNvdXJjZUNoYW5nZSQ6IFN1YmplY3Q8YW55IHwgVFtdPjtcbiAgcHJpdmF0ZSBfcmVmcmVzaCQ6IFN1YmplY3Q8UmVmcmVzaERhdGFXcmFwcGVyPFREYXRhPj47XG4gIHByaXZhdGUgX2xhc3RTb3VyY2U6IFRbXTtcbiAgcHJpdmF0ZSBfbGFzdFNvcnRlZFNvdXJjZTogVFtdO1xuICBwcml2YXRlIF9sYXN0RmlsdGVyZWRTb3VyY2U6IFRbXTtcbiAgcHJpdmF0ZSBfaW5GbGlnaHQgPSBuZXcgU2V0PFRFdmVudD4oKTtcbiAgcHJpdmF0ZSBfaW5QcmVGbGlnaHQgPSBmYWxzZTtcblxuICAvKipcbiAgICogQSBEYXRhIFNvdXJjZSBhZGFwdGVyIGNvbnRhaW5zIGZsb3cgbG9naWMgZm9yIHRoZSBkYXRhc291cmNlIGFuZCBzdWJzZXF1ZW50IGVtaXNzaW9ucyBvZiBkYXRhc291cmNlIGluc3RhbmNlcy5cbiAgICogVGhlIGxvZ2ljIGlzIGRldGVybWluZWQgYnkgdGhlIGNvbWJpbmF0aW9uIG9mIHRoZSBjb25maWcgb2JqZWN0IGFuZCB0aGUgc291cmNlRmFjdG9yeSBwcm92aWRlZCB0byB0aGlzIGFkYXB0ZXIsIG1ha2luZyB0aGlzIGFkYXB0ZXIgYWN0dWFsbHkgYSBjb250YWluZXIuXG4gICAqXG4gICAqIFRoZXJlIGFyZSA0IHRyaWdnZXJzIHRoYXQgYXJlIHJlc3BvbnNpYmxlIGZvciBkYXRhc291cmNlIGVtaXNzaW9ucywgd2hlbiBvbmUgb2YgdGhlbSBpcyB0cmlnZ2VyZWQgaXQgd2lsbCBpbnZva2UgdGhlIGBzb3VyY2VGYWN0b3J5YFxuICAgKiByZXR1cm5pbmcgYSBuZXcgZGF0YXNvdXJjZSwgaS5lLiBhIG5ldyBkYXRhc291cmNlIGVtaXNzaW9uLlxuICAgKlxuICAgKiBUaGUgdHJpZ2dlcnMgYXJlOiBmaWx0ZXIsIHNvcnQsIHBhZ2luYXRpb24gYW5kIHJlZnJlc2guXG4gICAqXG4gICAqIFRoZSByZWZyZXNoIHRyaWdnZXIgZG9lcyBub3QgZWZmZWN0IHRoZSBpbnB1dCBzZW50IHRvIHRoZSBgc291cmNlRmFjdG9yeWAgZnVuY3Rpb24sIGl0IGlzIGp1c3QgYSBtZWFuIHRvIGluaXRpYXRlIGEgY2FsbCB0byBjcmVhdGUgYSBuZXdcbiAgICogZGF0YXNvdXJjZSB3aXRob3V0IGNoYW5naW5nIHByZXZpb3VzIGZsb3cgdmFyaWFibGVzLlxuICAgKiBJdCdzIGltcG9ydGFudCB0byBub3RlIHRoYXQgY2FsbGluZyBgc291cmNlRmFjdG9yeWAgd2l0aCB0aGUgc2FtZSBpbnB1dCAyIG9yIG1vcmUgdGltZXMgZG9lcyBub3QgZ3VhcmFudGVlIGlkZW50aWNhbCByZXNwb25zZS4gRm9yIGV4YW1wbGVcbiAgICogY2FsbGluZyBhIHJlbW90ZSBzZXJ2ZXIgdGhhdCBtaWdodCBjaGFuZ2UgaXQncyBkYXRhIGJldHdlZW4gY2FsbHMuXG4gICAqXG4gICAqIEFsbCBvdGhlciB0cmlnZ2VycyAoMykgd2lsbCBjaGFuZ2UgdGhlIGlucHV0IHNlbnQgdG8gdGhlIGBzb3VyY2VGYWN0b3J5YCBmdW5jdGlvbiB3aGljaCB3aWxsIHVzZSB0aGVtIHRvIHJldHVybiBhIGRhdGFzb3VyY2UuXG4gICAqXG4gICAqIFRoZSBpbnB1dCBzZW50IHRvIGBzb3VyY2VGYWN0b3J5YCBpcyB0aGUgdmFsdWVzIHRoYXQgZWFjaCBvZiB0aGUgMyB0cmlnZ2VycyB5aWVsZHMsIHdoZW4gb25lIHRyaWdnZXIgY2hhbmdlcyBhIG5ldyB2YWx1ZSBmb3IgaXQgaXMgc2VudFxuICAgKiBhbmQgdGhlIGxhc3QgdmFsdWVzIG9mIHRoZSBvdGhlciAyIHRyaWdnZXJzIGlzIHNlbnQgd2l0aCBpdC4gaS5lLiB0aGUgY29tYmluYXRpb24gb2YgdGhlIGxhc3Qga25vd24gdmFsdWUgZm9yIGFsbCAzIHRyaWdnZXJzIGlzIHNlbnQuXG4gICAqXG4gICAqIFRvIGVuYWJsZSBzbWFydCBjYWNoaW5nIGFuZCBkYXRhIG1hbmFnZW1lbnQgYHNvdXJjZUZhY3RvcnlgIGRvZXMgbm90IGdldCB0aGUgcmF3IHZhbHVlcyBvZiBlYWNoIHRyaWdnZXIuIGBzb3VyY2VGYWN0b3J5YCB3aWxsIGdldFxuICAgKiBhbiBldmVudCBvYmplY3QgdGhhdCBjb250YWlucyBtZXRhZGF0YSBhYm91dCBlYWNoIHRyaWdnZXIsIHdoZXRoZXIgaXQgdHJpZ2dlcmVkIHRoZSBjaGFuZ2Ugb3Igbm90IGFzIHdlbGwgYXMgb2xkIGFuZCBuZXcgdmFsdWVzLlxuICAgKlxuICAgKiBUaGUgcmV0dXJuZWQgdmFsdWUgZnJvbSBgc291cmNlRmFjdG9yeWAgaXMgdGhlbiB1c2VkIGFzIHRoZSBkYXRhc291cmNlLCBhcHBseWluZyBhbGwgdHJpZ2dlcnMgdGhhdCBhcmUgbm90IG92ZXJyaWRkZW4gYnkgdGhlIHVzZXIuXG4gICAqIFRoZSByZXR1cm5lZCB2YWx1ZSBvZiBgc291cmNlRmFjdG9yeWAgY2FuIGJlIGEgYERhdGFTb3VyY2VPZmAgb3IgYGZhbHNlYC5cbiAgICogICAtIGBEYXRhU291cmNlT2ZgIG1lYW5zIGEgdmFsaWQgZGF0YXNvdXJjZSwgZWl0aGVyIG9ic2VydmFibGUvcHJvbWlzZSBvZiBhcnJheSBvciBhbiBhcnJheS5cbiAgICogICAtIGBmYWxzZWAgbWVhbnMgc2tpcCwgcmV0dXJuaW5nIGZhbHNlIHdpbGwgaW5zdHJ1Y3QgdGhlIGFkYXB0ZXIgdG8gc2tpcCBleGVjdXRpb24gZm9yIHRoaXMgdHJpZ2dlciBjeWNsZS5cbiAgICpcbiAgICogVXNpbmcgYSB0cmlnZ2VyIGlzIGEgYmluYXJ5IGNvbmZpZ3VyYXRpb24gb3B0aW9uLCB3aGVuIGEgdHJpZ2dlciBpcyB0dXJuZWQgb24gaXQgbWVhbnMgdGhhdCBjaGFuZ2VzIHRvIGl0IHdpbGwgYmUgcGFzc2VkIHRvIHRoZSBgc291cmNlRmFjdG9yeWAuXG4gICAqIFdoZW4gYSB0cmlnZ2VyIGlzIHR1cm5lZCBvZmYgaXQgaXMgbm90IGxpc3RlbmVkIHRvIGFuZCBgdW5kZWZpbmVkYCB3aWxsIGJlIHNlbnQgYXMgYSB2YWx1ZSBmb3IgaXQgdG8gdGhlIGBzb3VyY2VGYWN0b3J5YC5cbiAgICpcbiAgICogVGhlIGFkYXB0ZXIgY29tZXMgd2l0aCBidWlsdCBpbiBmbG93IGxvZ2ljIGZvciBhbGwgMyB0cmlnZ2Vycywgd2hlbiBhIHRyaWdnZXIgaXMgdHVybmVkIG9mZiB0aGUgYWRhcHRlciB3aWxsIHRha2UgdGhlIHJlc3VsdCBvZiBgc291cmNlRmFjdG9yeWAgYW5kXG4gICAqIGFwcGx5IHRoZSBkZWZhdWx0IGJlaGF2aW9yIHRvIGl0LlxuICAgKlxuICAgKiBGb3IgYWxsIHRyaWdnZXJzLCB0aGUgZGVmYXVsdCBiZWhhdmlvciBtZWFucyBjbGllbnQgaW1wbGVtZW50YXRpb24uIEZvciBmaWx0ZXJpbmcsIGNsaWVudCBzaWRlIGZpbHRlcmluZy4gRm9yIHNvcnRpbmcsIGNsaWVudCBzaWRlIHNvcnRpbmcuXG4gICAqIEZvciBQYWdpbmF0aW9uLCBjbGllbnQgc2lkZSBwYWdpbmF0aW9uLlxuICAgKlxuICAgKiBZb3UgY2FuIG9wdCBpbiB0byBvbmUgb3IgbW9yZSB0cmlnZ2VycyBhbmQgaW1wbGVtZW50IHlvdXIgb3duIGJlaGF2aW9yIGluc2lkZSB0aGUgYHNvdXJjZUZhY3RvcnlgXG4gICAqIEBwYXJhbSBzb3VyY2VGYWN0b3J5IC0gQSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIGRhdGFzb3VyY2UgYmFzZWQgb24gZmxvdyBpbnN0cnVjdGlvbnMuXG4gICAqIFRoZSBpbnN0cnVjdGlvbnMgYXJlIG9wdGlvbmFsLCB0aGV5IG1pZ2h0IG9yIG1pZ2h0IG5vdCBleGlzdCBkZXBlbmRpbmcgb24gdGhlIGNvbmZpZ3VyYXRpb24gb2YgdGhlIGFkYXB0ZXIuXG4gICAqIFdoZW4gYHNvdXJjZUZhY3RvcnlgIHJldHVybnMgZmFsc2UgdGhlIGVudGlyZSB0cmlnZ2VyIGN5Y2xlIGlzIHNraXBwZWQuXG4gICAqIEBwYXJhbSBjb25maWcgLSBBIGNvbmZpZ3VyYXRpb24gb2JqZWN0IGRlc2NyaWJpbmcgaG93IHRoaXMgYWRhcHRlciBzaG91bGQgYmVoYXZlLlxuICAgKi9cbiAgY29uc3RydWN0b3IocHVibGljIHNvdXJjZUZhY3Rvcnk6IFBibERhdGFTb3VyY2VUcmlnZ2VyQ2hhbmdlSGFuZGxlcjxULCBURXZlbnQ+LFxuICAgICAgICAgICAgICBjb25maWc/OiBmYWxzZSB8IFBhcnRpYWw8UmVjb3JkPGtleW9mIFBibERhdGFTb3VyY2VDb25maWd1cmFibGVUcmlnZ2VycywgYm9vbGVhbj4+KSB7XG4gICAgdGhpcy5jb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCBjb25maWcgfHwge30pO1xuXG4gICAgdGhpcy5fcmVmcmVzaCQgPSBuZXcgU3ViamVjdDxSZWZyZXNoRGF0YVdyYXBwZXI8VERhdGE+PigpO1xuICAgIHRoaXMuX29uU291cmNlQ2hhbmdlJCA9IG5ldyBTdWJqZWN0PFRbXT4oKTtcbiAgICB0aGlzLm9uU291cmNlQ2hhbmdlZCA9IHRoaXMuX29uU291cmNlQ2hhbmdlJC5waXBlKGZpbHRlciggZCA9PiBkICE9PSBTT1VSQ0VfQ0hBTkdJTkdfVE9LRU4gKSk7XG4gICAgdGhpcy5vblNvdXJjZUNoYW5naW5nID0gdGhpcy5fb25Tb3VyY2VDaGFuZ2UkLnBpcGUoZmlsdGVyKCBkID0+IGQgPT09IFNPVVJDRV9DSEFOR0lOR19UT0tFTiApKTtcbiAgfVxuXG4gIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5fcmVmcmVzaCQuY29tcGxldGUoKTtcbiAgICB0aGlzLl9vblNvdXJjZUNoYW5nZSQuY29tcGxldGUoKTtcbiAgfVxuXG4gIHJlZnJlc2goZGF0YT86IFREYXRhKTogdm9pZCB7XG4gICAgdGhpcy5fcmVmcmVzaCQubmV4dCh7IGRhdGEgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXJzIHRoZSBjYWNoZSBmcm9tIGFueSBleGlzdGluZyBkYXRhc291cmNlIHRyaWdnZXIgc3VjaCBhcyBmaWx0ZXIsIHNvcnQgZXRjLlxuICAgKiBAcmV0dXJucyBUaGUgY2FjaGVkIHZhbHVlIG9yIG51bGwgaWYgbm90IHRoZXJlLlxuICAgKi9cbiAgY2xlYXJDYWNoZTxQIGV4dGVuZHMga2V5b2YgUGJsRGF0YVNvdXJjZVRyaWdnZXJDYWNoZT4oY2FjaGVLZXk6IFApOiBQYmxEYXRhU291cmNlVHJpZ2dlckNhY2hlPFREYXRhPltQXSB8IG51bGwge1xuICAgIGlmIChjYWNoZUtleSBpbiB0aGlzLmNhY2hlKSB7XG4gICAgICBjb25zdCBwcmV2ID0gdGhpcy5jYWNoZVtjYWNoZUtleV07XG4gICAgICB0aGlzLmNhY2hlW2NhY2hlS2V5XSA9IERFRkFVTFRfSU5JVElBTF9DQUNIRV9TVEFURVtjYWNoZUtleV07XG4gICAgICByZXR1cm4gcHJldjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgc2V0UGFnaW5hdG9yKHBhZ2luYXRvcjogUGJsUGFnaW5hdG9yPGFueT4gfCB1bmRlZmluZWQpOiB2b2lkIHtcbiAgICB0aGlzLnBhZ2luYXRvciA9IHBhZ2luYXRvcjtcbiAgfVxuXG4gIHVwZGF0ZVByb2Nlc3NpbmdMb2dpYyhmaWx0ZXIkOiBPYnNlcnZhYmxlPERhdGFTb3VyY2VGaWx0ZXI+LFxuICAgICAgICAgICAgICAgICAgICAgICAgc29ydCQ6IE9ic2VydmFibGU8UGJsTmdyaWREYXRhU291cmNlU29ydENoYW5nZSAmIHsgc2tpcFVwZGF0ZTogYm9vbGVhbiB9PixcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2luYXRpb24kOiBPYnNlcnZhYmxlPFBibFBhZ2luYXRvckNoYW5nZUV2ZW50PixcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxTdGF0ZTogUGFydGlhbDxQYmxEYXRhU291cmNlVHJpZ2dlckNhY2hlPFREYXRhPj4gPSB7fSk6IE9ic2VydmFibGU8UGJsRGF0YVNvdXJjZUFkYXB0ZXJQcm9jZXNzZWRSZXN1bHQ8VCwgVERhdGE+PiB7XG4gICAgbGV0IHVwZGF0ZXMgPSAtMTtcbiAgICBjb25zdCBjaGFuZ2VkRmlsdGVyID0gZSA9PiB1cGRhdGVzID09PSAtMSB8fCBlLmNoYW5nZWQ7XG4gICAgY29uc3Qgc2tpcFVwZGF0ZSA9IChvOiBQYmxOZ3JpZERhdGFTb3VyY2VTb3J0Q2hhbmdlICYgeyBza2lwVXBkYXRlOiBib29sZWFuIH0pID0+IG8uc2tpcFVwZGF0ZSAhPT0gdHJ1ZTtcblxuICAgIHRoaXMuX2xhc3RTb3VyY2UgPSB1bmRlZmluZWQ7XG5cbiAgICB0aGlzLmNhY2hlID0geyAuLi5ERUZBVUxUX0lOSVRJQUxfQ0FDSEVfU1RBVEUsIC4uLmluaXRpYWxTdGF0ZSB9O1xuXG4gICAgY29uc3QgY29tYmluZTogW1xuICAgICAgT2JzZXJ2YWJsZTxUcmlnZ2VyQ2hhbmdlZEV2ZW50Rm9yPCdmaWx0ZXInPj4sXG4gICAgICBPYnNlcnZhYmxlPFRyaWdnZXJDaGFuZ2VkRXZlbnRGb3I8J3NvcnQnPj4sXG4gICAgICBPYnNlcnZhYmxlPFRyaWdnZXJDaGFuZ2VkRXZlbnRGb3I8J3BhZ2luYXRpb24nPj4sXG4gICAgICBPYnNlcnZhYmxlPFRyaWdnZXJDaGFuZ2VkRXZlbnRGb3I8J2RhdGEnPj5cbiAgICBdID0gW1xuICAgICAgZmlsdGVyJC5waXBlKCBtYXAoIHZhbHVlID0+IGNyZWF0ZUNoYW5nZUNvbnRhaW5lcignZmlsdGVyJywgdmFsdWUsIHRoaXMuY2FjaGUpICksIGZpbHRlcihjaGFuZ2VkRmlsdGVyKSApLFxuICAgICAgc29ydCQucGlwZSggZmlsdGVyKHNraXBVcGRhdGUpLCBtYXAoIHZhbHVlID0+IGNyZWF0ZUNoYW5nZUNvbnRhaW5lcignc29ydCcsIHZhbHVlLCB0aGlzLmNhY2hlKSApLCBmaWx0ZXIoY2hhbmdlZEZpbHRlcikgKSxcbiAgICAgIHBhZ2luYXRpb24kLnBpcGUoIG1hcCggdmFsdWUgPT4gY3JlYXRlQ2hhbmdlQ29udGFpbmVyKCdwYWdpbmF0aW9uJywgdmFsdWUsIHRoaXMuY2FjaGUpICksIGZpbHRlcihjaGFuZ2VkRmlsdGVyKSApLFxuICAgICAgdGhpcy5fcmVmcmVzaCQucGlwZSggbWFwKCB2YWx1ZSA9PiBmcm9tUmVmcmVzaERhdGFXcmFwcGVyKGNyZWF0ZUNoYW5nZUNvbnRhaW5lcignZGF0YScsIHZhbHVlLCB0aGlzLmNhY2hlKSkgKSwgZmlsdGVyKGNoYW5nZWRGaWx0ZXIpICksXG4gICAgXTtcblxuICAgIGNvbnN0IGhhc0N1c3RvbUJlaGF2aW9yID0gUGJsRGF0YVNvdXJjZUFkYXB0ZXIuaGFzQ3VzdG9tQmVoYXZpb3IodGhpcy5jb25maWcpO1xuXG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoW2NvbWJpbmVbMF0sIGNvbWJpbmVbMV0sIGNvbWJpbmVbMl0sIGNvbWJpbmVbM11dKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcCggKCkgPT4gdGhpcy5faW5QcmVGbGlnaHQgPSB0cnVlKSxcbiAgICAgICAgLy8gRGVmZXIgdG8gbmV4dCBsb29wIGN5Y2xlLCB1bnRpbCBubyBtb3JlIGluY29taW5nLlxuICAgICAgICAvLyBXZSB1c2UgYW4gYXN5bmMgc2NoZWR1bGFyIGhlcmUgKGluc3RlYWQgb2YgYXNhcFNjaGVkdWxhcikgYmVjYXVzZSB3ZSB3YW50IHRvIGhhdmUgdGhlIGxhcmdlc3QgZGVib3VuY2Ugd2luZG93IHdpdGhvdXQgY29tcHJvbWlzaW5nIGludGVncml0eVxuICAgICAgICAvLyBXaXRoIGFuIGFzeW5jIHNjaGVkdWxhciB3ZSBrbm93IHdlIHdpbGwgcnVuIGFmdGVyIGFsbCBtaWNyby10YXNrcyBidXQgYmVmb3JlIFwicmVhbFwiIGFzeW5jIG9wZXJhdGlvbnMuXG4gICAgICAgIGRlYm91bmNlVGltZSgwKSxcbiAgICAgICAgc3dpdGNoTWFwKCAoW2ZpbHRlcklucHV0LCBzb3J0LCBwYWdpbmF0aW9uLCBkYXRhIF0pID0+IHtcbiAgICAgICAgICB0aGlzLl9pblByZUZsaWdodCA9IGZhbHNlO1xuXG4gICAgICAgICAgdXBkYXRlcysrOyAvLyBpZiBmaXJzdCwgd2lsbCBiZSAwIG5vdyAoc3RhcnRzIGZyb20gLTEpLlxuICAgICAgICAgIGNvbnN0IGV2ZW50OiBURXZlbnQgPSB7XG4gICAgICAgICAgICBpZDogTWF0aC5yYW5kb20oKSAqIDEwLFxuICAgICAgICAgICAgZmlsdGVyOiBmaWx0ZXJJbnB1dCxcbiAgICAgICAgICAgIHNvcnQsXG4gICAgICAgICAgICBwYWdpbmF0aW9uLFxuICAgICAgICAgICAgZGF0YSxcbiAgICAgICAgICAgIGV2ZW50U291cmNlOiBkYXRhLmNoYW5nZWQgPyAnZGF0YScgOiAnY3VzdG9tVHJpZ2dlcicsXG4gICAgICAgICAgICBpc0luaXRpYWw6IHVwZGF0ZXMgPT09IDAsXG4gICAgICAgICAgICB1cGRhdGVUb3RhbExlbmd0aDogKHRvdGFsTGVuZ3RoKSA9PiB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLnBhZ2luYXRvcikge1xuICAgICAgICAgICAgICAgIHRoaXMucGFnaW5hdG9yLnRvdGFsID0gdG90YWxMZW5ndGg7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGFzIFRFdmVudDtcbiAgICAgICAgICB0aGlzLm9uU3RhcnRPZkV2ZW50KGV2ZW50KTtcblxuICAgICAgICAgIGNvbnN0IHJ1bkhhbmRsZSA9IGRhdGEuY2hhbmdlZFxuICAgICAgICAgICAgfHwgKCBoYXNDdXN0b21CZWhhdmlvciAmJiBQYmxEYXRhU291cmNlQWRhcHRlci5pc0N1c3RvbUJlaGF2aW9yRXZlbnQoZXZlbnQsIHRoaXMuY29uZmlnKSApO1xuXG4gICAgICAgICAgY29uc3QgcmVzcG9uc2UkID0gcnVuSGFuZGxlXG4gICAgICAgICAgICA/IHRoaXMucnVuSGFuZGxlKGV2ZW50IGFzIFRFdmVudClcbiAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgIG1hcCggZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhICE9PSBmYWxzZSkgeyAvLyBpZiB0aGUgdXNlciBkaWRuJ3QgcmV0dXJuIFwiZmFsc2VcIiBmcm9tIGhpcyBoYW5kbGVyLCB3ZSBpbmZlciBkYXRhIHdhcyBjaGFuZ2VkIVxuICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LmRhdGEuY2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZXZlbnQsIGRhdGEgfTtcbiAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgOiBvZih7IGV2ZW50LCBkYXRhOiB0aGlzLl9sYXN0U291cmNlIH0pXG4gICAgICAgICAgICA7XG5cbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2UkXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKCByZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gSWYgcnVuSGFuZGxlKCkgcmV0dXJuZWQgZmFsc2UsIHdlIGRvIG5vdCBwcm9jZXNzIGFuZCByZXR1cm4gdW5kZWZpbmVkLlxuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBjb25maWcgPSB0aGlzLmNvbmZpZztcbiAgICAgICAgICAgICAgICBjb25zdCBldmVudCA9IHJlc3BvbnNlLmV2ZW50O1xuXG4gICAgICAgICAgICAgICAgLy8gbWFyayB3aGljaCBvZiB0aGUgdHJpZ2dlcnMgaGFzIGNoYW5nZXNcbiAgICAgICAgICAgICAgICAvLyBUaGUgbG9naWMgaXMgYmFzZWQgb24gdGhlIHVzZXIncyBjb25maWd1cmF0aW9uIGFuZCB0aGUgaW5jb21pbmcgZXZlbnRcbiAgICAgICAgICAgICAgICBjb25zdCB3aXRoQ2hhbmdlczogUGFydGlhbDxSZWNvcmQ8a2V5b2YgUGJsRGF0YVNvdXJjZUNvbmZpZ3VyYWJsZVRyaWdnZXJzLCBib29sZWFuPj4gPSB7fTtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBDVVNUT01fQkVIQVZJT1JfVFJJR0dFUl9LRVlTKSB7XG4gICAgICAgICAgICAgICAgICBpZiAoIWNvbmZpZ1trZXldICYmIChldmVudC5pc0luaXRpYWwgfHwgZXZlbnRba2V5XS5jaGFuZ2VkKSkge1xuICAgICAgICAgICAgICAgICAgICB3aXRoQ2hhbmdlc1trZXldID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBXaGVuIGRhdGEgY2hhbmdlZCwgYXBwbHkgc29tZSBsb2dpYyAoY2FjaGluZywgb3BlcmF0aW9uYWwsIGV0Yy4uLilcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQuZGF0YS5jaGFuZ2VkKSB7XG4gICAgICAgICAgICAgICAgICAvLyBjYWNoZSB0aGUgZGF0YSB3aGVuIGl0IGhhcyBjaGFuZ2VkLlxuICAgICAgICAgICAgICAgICAgdGhpcy5fbGFzdFNvdXJjZSA9IHJlc3BvbnNlLmRhdGE7XG5cbiAgICAgICAgICAgICAgICAgIGlmIChjb25maWcuc29ydCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBXaGVuIHRoZSB1c2VyIGlzIHNvcnRpbmcgKGkuZS4gc2VydmVyIHNvcnRpbmcpLCB0aGUgbGFzdCBzb3J0IGNhY2hlZCBpcyBhbHdheXMgdGhlIGxhc3Qgc291cmNlIHdlIGdldCBmcm9tIHRoZSB1c2VyLlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sYXN0U29ydGVkU291cmNlID0gdGhpcy5fbGFzdFNvdXJjZTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFdoZW4gdXNlciBpcyBOT1Qgc29ydGluZyAod2Ugc29ydCBsb2NhbGx5KSBBTkQgdGhlIGRhdGEgaGFzIGNoYW5nZWQgd2UgbmVlZCB0byBhcHBseSBzb3J0aW5nIG9uIGl0XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMgbWlnaHQgYWxyZWFkeSBiZSB0cnVlIChpZiBzb3J0aW5nIHdhcyB0aGUgdHJpZ2dlcikuLi5cbiAgICAgICAgICAgICAgICAgICAgd2l0aENoYW5nZXMuc29ydCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gYmVjYXVzZSB3ZSBzb3J0IGFuZCB0aGVuIGZpbHRlciwgZmlsdGVyaW5nIHVwZGF0ZXMgYXJlIGFsc28gdHJpZ2dlcmVkIGJ5IHNvcnQgdXBkYXRlZFxuICAgICAgICAgICAgICAgICAgICB3aXRoQ2hhbmdlcy5maWx0ZXIgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICBpZiAoY29uZmlnLmZpbHRlcikge1xuICAgICAgICAgICAgICAgICAgICAvLyBXaGVuIHRoZSB1c2VyIGlzIGZpbHRlcmluZyAoaS5lLiBzZXJ2ZXIgZmlsdGVyaW5nKSwgdGhlIGxhc3QgZmlsdGVyIGNhY2hlZCBpcyBhbHdheXMgdGhlIGxhc3Qgc291cmNlIHdlIGdldCBmcm9tIHRoZSB1c2VyLlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sYXN0RmlsdGVyZWRTb3VyY2UgPSB0aGlzLl9sYXN0U291cmNlO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gV2hlbiB1c2VyIGlzIE5PVCBmaWx0ZXJpbmcgKHdlIGZpbHRlciBsb2NhbGx5KSBBTkQgdGhlIGRhdGEgaGFzIGNoYW5nZWQgd2UgbmVlZCB0byBhcHBseSBmaWx0ZXJpbmcgb24gaXRcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcyBtaWdodCBhbHJlYWR5IGJlIHRydWUgKGlmIGZpbHRlcmluZyB3YXMgdGhlIHRyaWdnZXIpLi4uXG4gICAgICAgICAgICAgICAgICAgIHdpdGhDaGFuZ2VzLmZpbHRlciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gV2hlbiB1c2VyIGlzIE5PVCBhcHBseWluZyBwYWdpbmF0aW9uICh3ZSBwYWdpbmF0ZSBsb2NhbGx5KSBBTkQgaWYgd2UgKHNvcnQgT1IgZmlsdGVyKSBsb2NhbGx5IHdlIGFsc28gbmVlZCB0byBwYWdpbmF0ZSBsb2NhbGx5XG4gICAgICAgICAgICAgICAgaWYgKCFjb25maWcucGFnaW5hdGlvbiAmJiAod2l0aENoYW5nZXMuc29ydCB8fCB3aXRoQ2hhbmdlcy5maWx0ZXIpKSB7XG4gICAgICAgICAgICAgICAgICB3aXRoQ2hhbmdlcy5wYWdpbmF0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBOb3csIGFwcGx5OiBzb3J0IC0tPiBmaWx0ZXIgLS0+IHBhZ2luYXRpb24gICAgICggT1JERVIgTUFUVEVSUyEhISApXG5cbiAgICAgICAgICAgICAgICBpZiAod2l0aENoYW5nZXMuc29ydCkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5fbGFzdFNvcnRlZFNvdXJjZSA9IHRoaXMuYXBwbHlTb3J0KHRoaXMuX2xhc3RTb3VyY2UsIGV2ZW50LnNvcnQuY3VyciB8fCBldmVudC5zb3J0LnByZXYpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBkYXRhOiBUW10gPSB0aGlzLl9sYXN0U29ydGVkU291cmNlO1xuXG4gICAgICAgICAgICAgICAgLy8gd2UgY2hlY2sgaWYgZmlsdGVyIHdhcyBhc2tlZCwgYnV0IGFsc28gaWYgd2UgaGF2ZSBhIGZpbHRlciB3ZSByZS1ydW5cbiAgICAgICAgICAgICAgICAvLyBPbmx5IHNvcnRpbmcgaXMgY2FjaGVkIGF0IHRoaXMgcG9pbnQgZmlsdGVyaW5nIGlzIGFsd2F5cyBjYWxjdWxhdGVkXG4gICAgICAgICAgICAgICAgaWYgKHdpdGhDaGFuZ2VzLmZpbHRlciB8fCAoIWNvbmZpZy5maWx0ZXIgJiYgZXZlbnQuZmlsdGVyLmN1cnI/LmZpbHRlcikpIHtcbiAgICAgICAgICAgICAgICAgIGRhdGEgPSB0aGlzLl9sYXN0RmlsdGVyZWRTb3VyY2UgPSB0aGlzLmFwcGx5RmlsdGVyKGRhdGEsIGV2ZW50LmZpbHRlci5jdXJyIHx8IGV2ZW50LmZpbHRlci5wcmV2KTtcbiAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5jb25maWcucGFnaW5hdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBpZiAod2l0aENoYW5nZXMuZmlsdGVyIHx8ICF3aXRoQ2hhbmdlcy5wYWdpbmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNldFBhZ2luYXRpb24oZGF0YS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHdpdGhDaGFuZ2VzLnBhZ2luYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgIGRhdGEgPSB0aGlzLmFwcGx5UGFnaW5hdGlvbihkYXRhKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBjbG9uZWRFdmVudDogVEV2ZW50ID0geyAuLi5ldmVudCB9O1xuXG4gICAgICAgICAgICAgICAgLy8gV2UgdXNlIGBjb21iaW5lTGF0ZXN0YCB3aGljaCBjYWNoZXMgcGVydmlvdXMgZXZlbnRzLCBvbmx5IG5ldyBldmVudHMgYXJlIHJlcGxhY2VkLlxuICAgICAgICAgICAgICAgIC8vIFdlIG5lZWQgdG8gbWFyayBldmVyeXRoaW5nIGFzIE5PVCBDSEFOR0VELCBzbyBzdWJzZXF1ZW50IGNhbGxzIHdpbGwgbm90IGhhdmUgdGhlaXIgY2hhbmdlZCBmbGFnIHNldCB0byB0cnVlLlxuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgLy8gV2UgYWxzbyBjbG9uZSB0aGUgb2JqZWN0IHNvIHdlIGNhbiBwYXNzIG9uIHRoZSBwcm9wZXIgdmFsdWVzLlxuICAgICAgICAgICAgICAgIC8vIFdlIGNyZWF0ZSBzaGFsbG93IGNsb25lcyBzbyBjb21wbGV4IG9iamVjdHMgKGNvbHVtbiBpbiBzb3J0LCB1c2VyIGRhdGEgaW4gZGF0YSkgd2lsbCBub3QgdGhyb3cgb24gY2lyY3VsYXIuXG4gICAgICAgICAgICAgICAgLy8gRm9yIHBhZ2luYXRpb24gd2UgZGVlcCBjbG9uZSBiZWNhdXNlIGl0IGNvbnRhaW5zIHByaW1pdGl2ZXMgYW5kIHdlIG5lZWQgdG8gYWxzbyBjbG9uZSB0aGUgaW50ZXJuYWwgY2hhbmdlIG9iamVjdHMuXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBrIG9mIFRSSUdHRVJfS0VZUykge1xuICAgICAgICAgICAgICAgICAgY2xvbmVkRXZlbnRba10gPSBrID09PSAncGFnaW5hdGlvbidcbiAgICAgICAgICAgICAgICAgICAgPyBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGV2ZW50W2tdKSlcbiAgICAgICAgICAgICAgICAgICAgOiB7IC4uLmV2ZW50W2tdIH1cbiAgICAgICAgICAgICAgICAgIDtcbiAgICAgICAgICAgICAgICAgIGV2ZW50W2tdLmNoYW5nZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZXZlbnQucGFnaW5hdGlvbi5wYWdlLmNoYW5nZWQgPSBldmVudC5wYWdpbmF0aW9uLnBlclBhZ2UuY2hhbmdlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgIGV2ZW50OiBjbG9uZWRFdmVudCxcbiAgICAgICAgICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgICAgICAgICBzb3J0ZWQ6IHRoaXMuX2xhc3RTb3J0ZWRTb3VyY2UsXG4gICAgICAgICAgICAgICAgICBmaWx0ZXJlZDogdGhpcy5fbGFzdEZpbHRlcmVkU291cmNlLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICB0YXAoICgpID0+IHRoaXMub25FbmRPZkV2ZW50KGV2ZW50KSApLFxuICAgICAgICAgICAgICAvLyBJZiBydW5IYW5kbGUoKSByZXR1cm5lZCBmYWxzZSwgd2Ugd2lsbCBnZXQgdW5kZWZpbmVkIGhlcmUsIHdlIGRvIG5vdCBlbWl0IHRoZXNlIHRvIHRoZSBncmlkLCBub3RoaW5nIHRvIGRvLlxuICAgICAgICAgICAgICBmaWx0ZXIoIHIgPT4gISFyICksXG4gICAgICAgICAgICApO1xuICAgICAgICB9KSxcbiAgICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYXBwbHlGaWx0ZXIoZGF0YTogVFtdLCBkYXRhU291cmNlRmlsdGVyOiBEYXRhU291cmNlRmlsdGVyKTogVFtdIHtcbiAgICByZXR1cm4gZmlsdGVyaW5nRm4oZGF0YSwgZGF0YVNvdXJjZUZpbHRlcik7XG4gIH1cblxuICBwcm90ZWN0ZWQgYXBwbHlTb3J0KGRhdGE6IFRbXSwgZXZlbnQ6IFBibE5ncmlkRGF0YVNvdXJjZVNvcnRDaGFuZ2UpOiBUW10ge1xuICAgIHJldHVybiBhcHBseVNvcnQoZXZlbnQuY29sdW1uLCBldmVudC5zb3J0LCBkYXRhKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhcHBseVBhZ2luYXRpb24oZGF0YTogVFtdKTogIFRbXSB7XG4gICAgaWYgKHRoaXMucGFnaW5hdG9yKSB7XG4gICAgICAvLyBTZXQgdGhlIHJlbmRlcmVkIHJvd3MgbGVuZ3RoIHRvIHRoZSB2aXJ0dWFsIHBhZ2Ugc2l6ZS4gRmlsbCBpbiB0aGUgZGF0YSBwcm92aWRlZFxuICAgICAgLy8gZnJvbSB0aGUgaW5kZXggc3RhcnQgdW50aWwgdGhlIGVuZCBpbmRleCBvciBwYWdpbmF0aW9uIHNpemUsIHdoaWNoZXZlciBpcyBzbWFsbGVyLlxuICAgICAgY29uc3QgcmFuZ2UgPSB0aGlzLnBhZ2luYXRvci5yYW5nZTtcbiAgICAgIHJldHVybiBkYXRhLnNsaWNlKHJhbmdlWzBdLCByYW5nZVsxXSk7XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgcHJvdGVjdGVkIHJlc2V0UGFnaW5hdGlvbih0b3RhbExlbmd0aDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucGFnaW5hdG9yKSB7XG4gICAgICB0aGlzLnBhZ2luYXRvci50b3RhbCA9IHRvdGFsTGVuZ3RoO1xuICAgICAgdGhpcy5wYWdpbmF0b3IucGFnZSA9IHRvdGFsTGVuZ3RoID4gMCA/IDEgOiAwO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBvblN0YXJ0T2ZFdmVudChldmVudDogVEV2ZW50KTogdm9pZCB7XG4gICAgdGhpcy5faW5GbGlnaHQuYWRkKGV2ZW50KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBvbkVuZE9mRXZlbnQoZXZlbnQ6IFRFdmVudCk6IHZvaWQge1xuICAgIHRoaXMuX2luRmxpZ2h0LmRlbGV0ZShldmVudCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZW1pdE9uU291cmNlQ2hhbmdpbmcoZXZlbnQ6IFRFdmVudCkge1xuICAgIHRoaXMuX29uU291cmNlQ2hhbmdlJC5uZXh0KFNPVVJDRV9DSEFOR0lOR19UT0tFTik7XG4gIH1cblxuICBwcm90ZWN0ZWQgZW1pdE9uU291cmNlQ2hhbmdlZChldmVudDogVEV2ZW50LCBkYXRhOiBUW10pIHtcbiAgICB0aGlzLl9vblNvdXJjZUNoYW5nZSQubmV4dChkYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeGVjdXRlIHRoZSB1c2VyLXByb3ZpZGVkIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgZGF0YSBjb2xsZWN0aW9uLlxuICAgKiBUaGlzIG1ldGhvZCB3cmFwcyBlYWNoIG9mIHRoZSB0cmlnZ2VycyB3aXRoIGEgY29udGFpbmVyIHByb3ZpZGluZyBtZXRhZGF0YSBmb3IgdGhlIHRyaWdnZXIuIChPbGQgdmFsdWUsIHdhcyBjaGFuZ2VkPyBhbmQgbmV3IHZhbHVlIGlmIGNoYW5nZWQpXG4gICAqIFRoaXMgaXMgd2hlcmUgYWxsIGNhY2hlIGxvZ2ljIGlzIG1hbmFnZWQgKGNyZWF0ZUNoYW5nZUNvbnRhaW5lcikuXG4gICAqXG4gICAqIFRvIGJ1aWxkIGEgZGF0YSBjb2xsZWN0aW9uIHRoZSBpbmZvcm1hdGlvbiBmcm9tIGFsbCB0cmlnZ2VycyBpcyByZXF1aXJlZCwgZXZlbiBpZiBpdCB3YXMgbm90IGNoYW5nZWQuXG4gICAqIFdoZW4gYSB0cmlnZ2VyIGlzIGZpcmVkIHdpdGggYSBuZXcgdmFsdWUgdGhlIG5ldyB2YWx1ZSByZXBsYWNlcyB0aGUgb2xkIHZhbHVlIGZvciB0aGUgdHJpZ2dlciBhbmQgYWxsIG90aGVyIHRyaWdnZXJzIHdpbGwga2VlcCB0aGVpciBvbGQgdmFsdWUuXG4gICAqIFNlbmRpbmcgdGhlIHRyaWdnZXJzIHRvIHRoZSBoYW5kbGVycyBpcyBub3QgZW5vdWdoLCB3ZSBhbHNvIG5lZWQgdG8gdGhlIGhhbmRsZXJzIHdoaWNoIG9mIHRoZSB0cmlnZ2VyJ3MgaGF2ZSBjaGFuZ2Ugc28gdGhleSBjYW4gcmV0dXJuXG4gICAqIGRhdGEgd2l0aG91dCBkb2luZyByZWR1bmRhbnQgd29yay5cbiAgICogRm9yIGV4YW1wbGUsIGZldGNoaW5nIHBhZ2luYXRlZCBkYXRhIGZyb20gdGhlIHNlcnZlciByZXF1aXJlcyBhIGNhbGwgd2hlbmV2ZXIgdGhlIHBhZ2VzIGNoYW5nZXMgYnV0IGlmIHRoZSBmaWx0ZXJpbmcgaXMgbG9jYWwgZm9yIHRoZSBjdXJyZW50IHBhZ2VcbiAgICogYW5kIHRoZSBmaWx0ZXIgdHJpZ2dlciBpcyBmaXJlZCB0aGUgaGFuZGxlciBuZWVkcyB0byBrbm93IHRoYXQgcGFnaW5hdGlvbiBkaWQgbm90IGNoYW5nZSBzbyBpdCB3aWxsIG5vdCBnbyBhbmQgZmV0Y2ggZGF0YSBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIFRoZSBoYW5kbGVyIGNhbiByZXR1cm4gc2V2ZXJhbCBkYXRhIHN0cnVjdHVyZXMsIG9ic2VydmFibGUsIHByb21pc2UsIGFycmF5IG9yIGZhbHNlLlxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIG5vcm1hbGl6ZSB0aGUgcmVzcG9uc2UgaW50byBhbiBvYnNlcnZhYmxlIGFuZCBub3RpZnkgdGhhdCB0aGUgc291cmNlIGNoYW5nZWQgKG9uU291cmNlQ2hhbmdlZCkuXG4gICAqXG4gICAqIFdoZW4gdGhlIHJlc3BvbnNlIGlzIGZhbHNlIHRoYXQgaGFuZGxlciB3YW50cyB0byBza2lwIHRoaXMgY3ljbGUsIHRoaXMgbWVhbnMgdGhhdCBvblNvdXJjZUNoYW5nZWQgd2lsbCBub3QgZW1pdCBhbmRcbiAgICogYSBkZWFkLWVuZCBvYnNlcnZhYmxlIGlzIHJldHVybmVkIChvYnNlcnZhYmxlIHRoYXQgd2lsbCBuZXZlciBlbWl0KS5cbiAgICovXG4gIHByaXZhdGUgcnVuSGFuZGxlKGV2ZW50OiBURXZlbnQpOiBPYnNlcnZhYmxlPGZhbHNlIHwgVFtdPiB7XG5cbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLnNvdXJjZUZhY3RvcnkoZXZlbnQpO1xuICAgIGlmIChyZXN1bHQgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gb2YoZmFsc2UpO1xuICAgIH1cblxuICAgIHRoaXMuZW1pdE9uU291cmNlQ2hhbmdpbmcoZXZlbnQpO1xuXG4gICAgY29uc3Qgb2JzOiBPYnNlcnZhYmxlPFRbXT4gPSBBcnJheS5pc0FycmF5KHJlc3VsdClcbiAgICAgID8gb2YocmVzdWx0KVxuICAgICAgLy8gZWxzZSAtPiAgICAgICAgICAgIG9ic2VydmFibGUgOiBwcm9taXNlXG4gICAgICA6IChpc09ic2VydmFibGUocmVzdWx0KSA/IHJlc3VsdCA6IGZyb20ocmVzdWx0KSlcbiAgICAgICAgICAucGlwZShtYXAoIGRhdGEgPT4gQXJyYXkuaXNBcnJheShkYXRhKSA/IGRhdGEgOiBbXSApKSAvLyBUT0RPOiBzaG91bGQgd2UgZXJyb3I/IHdhcm4/IG5vdGlmeT9cbiAgICA7XG5cbiAgICByZXR1cm4gb2JzLnBpcGUoXG4gICAgICBvYnNlcnZlT24oYXNhcFNjaGVkdWxlciwgMCksIC8vIHJ1biBhcyBhIG1pY3JvLXRhc2tcbiAgICAgIHRhcCggZGF0YSA9PiB0aGlzLmVtaXRPblNvdXJjZUNoYW5nZWQoZXZlbnQsIGRhdGEgYXMgVFtdKSApLFxuICAgICk7XG4gIH1cbn1cbiJdfQ==