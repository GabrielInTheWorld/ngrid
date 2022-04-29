import { Subject } from 'rxjs';
import { Directive, Input, Output, EventEmitter } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ON_INVALIDATE_HEADERS, unrx } from '@pebula/ngrid/core';
import { PblNgridComponent, PblNgridPluginController } from '@pebula/ngrid';
import { getSortDuplicateSortableIdError, getSortHeaderMissingIdError, getSortInvalidDirectionError } from './sort-errors';
import * as i0 from "@angular/core";
import * as i1 from "@pebula/ngrid";
export const PLUGIN_KEY = 'bsSortable';
export class PblNgridBsSortablePlugin {
    constructor(grid, pluginCtrl) {
        this.grid = grid;
        this.pluginCtrl = pluginCtrl;
        /** Collection of all registered sortables that this directive manages. */
        this.sortables = new Map();
        /** Used to notify any child components listening to state changes. */
        this._stateChanges = new Subject();
        /**
         * The direction to set when an PblNgridSortable is initially sorted.
         * May be overriden by the PblNgridSortable's sort start.
         */
        this.start = 'asc';
        this.bsArrowPosition = 'after';
        /** Event emitted when the user changes either the active sort or sort direction. */
        this.sortChange = new EventEmitter();
        this._direction = '';
        this._disabled = false;
        this.origin = 'click';
        this._removePlugin = pluginCtrl.setPlugin(PLUGIN_KEY, this);
        this.sortChange
            .pipe(unrx(this))
            .subscribe(s => {
            this.onSort(s, this.origin);
            this.origin = 'click';
        });
        this.handleEvents();
    }
    get bsSortableDisabled() { return this._disabled; }
    set bsSortableDisabled(value) { this._disabled = coerceBooleanProperty(value); }
    /** The sort direction of the currently active MatSortable. */
    get direction() { return this._direction; }
    set direction(direction) {
        if (direction && direction !== 'asc' && direction !== 'desc' &&
            (typeof ngDevMode === 'undefined' || ngDevMode)) {
            throw getSortInvalidDirectionError(direction);
        }
        this._direction = direction;
    }
    /**
     * Whether to disable the user from clearing the sort by finishing the sort direction cycle.
     * May be overriden by the MatSortable's disable clear input.
     */
    get disableClear() { return this._disableClear; }
    set disableClear(v) { this._disableClear = coerceBooleanProperty(v); }
    /**
     * Register function to be used by the contained PblNgridSortable. Adds the PblNgridSortable to the
     * collection of PblNgridSortable.
     */
    register(sortable) {
        if (typeof ngDevMode === 'undefined' || ngDevMode) {
            if (!sortable.id) {
                throw getSortHeaderMissingIdError();
            }
            if (this.sortables.has(sortable.id)) {
                throw getSortDuplicateSortableIdError(sortable.id);
            }
        }
        this.sortables.set(sortable.id, sortable);
    }
    /**
     * Unregister function to be used by the contained PblNgridSortables. Removes the PblNgridSortable from the
     * collection of contained PblNgridSortables.
     */
    deregister(sortable) {
        this.sortables.delete(sortable.id);
    }
    /** Sets the active sort id and determines the new sort direction. */
    sort(sortable) {
        if (this.active != sortable.id) {
            this.active = sortable.id;
            this.direction = sortable.start ? sortable.start : this.start;
        }
        else {
            this.direction = this.getNextSortDirection(sortable);
        }
        this.sortChange.emit({ active: this.active, direction: this.direction });
    }
    /** Returns the next sort direction of the active sortable, checking for potential overrides. */
    getNextSortDirection(sortable) {
        if (!sortable) {
            return '';
        }
        // Get the sort direction cycle with the potential sortable overrides.
        const disableClear = sortable.disableClear != null ? sortable.disableClear : this.disableClear;
        let sortDirectionCycle = getSortDirectionCycle(sortable.start || this.start, disableClear);
        // Get and return the next direction in the cycle
        let nextDirectionIndex = sortDirectionCycle.indexOf(this.direction) + 1;
        if (nextDirectionIndex >= sortDirectionCycle.length) {
            nextDirectionIndex = 0;
        }
        return sortDirectionCycle[nextDirectionIndex];
    }
    ngOnChanges() {
        this._stateChanges.next();
    }
    ngOnDestroy() {
        this._stateChanges.complete();
        this._removePlugin(this.grid);
        unrx.kill(this);
    }
    onSort(sort, origin) {
        const table = this.grid;
        const column = table.columnApi.visibleColumns.find(c => c.id === sort.active);
        if (origin !== 'click' || !column || !column.sort) {
            return;
        }
        else {
            const newSort = {};
            const sortFn = typeof column.sort === 'function' && column.sort;
            if (sort.direction) {
                newSort.order = sort.direction;
            }
            if (sortFn) {
                newSort.sortFn = sortFn;
            }
            const currentSort = table.ds.sort;
            if (column === currentSort.column) {
                const _sort = currentSort.sort || {};
                if (newSort.order === _sort.order) {
                    return;
                }
            }
            table.ds.setSort(column, newSort);
        }
    }
    handleEvents() {
        const handleDataSourceSortChange = (sortChange) => {
            const { column } = sortChange;
            const order = sortChange.sort ? sortChange.sort.order : undefined;
            if (column) {
                if (this.active === column.id && this.direction === (order || '')) {
                    return;
                }
                const sortable = this.sortables.get(column.id);
                if (sortable) {
                    this.origin = 'ds';
                    this.active = undefined;
                    sortable.start = order || 'asc';
                    sortable._handleClick();
                }
            }
            else if (this.active) { // clear mode (hit from code, not click).
                const sortable = this.sortables.get(this.active);
                if (sortable) {
                    if (!sortable.disableClear) {
                        let nextSortDir;
                        while (nextSortDir = this.getNextSortDirection(sortable)) {
                            this.direction = nextSortDir;
                        }
                    }
                    this.origin = 'ds';
                    sortable._handleClick();
                }
            }
        };
        this.pluginCtrl.events
            .pipe(ON_INVALIDATE_HEADERS)
            .subscribe(e => {
            var _a;
            const hasActiveSort = this.active;
            if ((_a = this.grid.ds) === null || _a === void 0 ? void 0 : _a.sort) {
                if (!this.grid.ds.sort.column && hasActiveSort) {
                    this.onSort({ active: this.active, direction: this.direction || 'asc' }, this.origin);
                }
                else if (this.grid.ds.sort.column && !hasActiveSort) {
                    setTimeout(() => handleDataSourceSortChange(this.grid.ds.sort));
                }
            }
        });
        this.pluginCtrl.events
            .subscribe(e => {
            if (e.kind === 'onDataSource') {
                unrx.kill(this, e.prev);
                if (this.active) {
                    this.onSort({ active: this.active, direction: this.direction || 'asc' }, this.origin);
                }
                this.grid.ds.sortChange
                    .pipe(unrx(this, e.curr))
                    .subscribe(event => { handleDataSourceSortChange(event); });
            }
        });
    }
}
/** @nocollapse */ PblNgridBsSortablePlugin.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridBsSortablePlugin, deps: [{ token: i1.PblNgridComponent }, { token: i1.PblNgridPluginController }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ PblNgridBsSortablePlugin.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridBsSortablePlugin, selector: "pbl-ngrid[bsSortable]", inputs: { active: ["bsSortableActive", "active"], start: ["bsSortableStart", "start"], direction: ["bsSortableDirection", "direction"], bsArrowPosition: "bsArrowPosition", disableClear: ["matSortDisableClear", "disableClear"] }, outputs: { sortChange: "matSortChange" }, exportAs: ["pblBsSortable"], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridBsSortablePlugin, decorators: [{
            type: Directive,
            args: [{ selector: 'pbl-ngrid[bsSortable]', exportAs: 'pblBsSortable' }]
        }], ctorParameters: function () { return [{ type: i1.PblNgridComponent }, { type: i1.PblNgridPluginController }]; }, propDecorators: { active: [{
                type: Input,
                args: ['bsSortableActive']
            }], start: [{
                type: Input,
                args: ['bsSortableStart']
            }], direction: [{
                type: Input,
                args: ['bsSortableDirection']
            }], bsArrowPosition: [{
                type: Input
            }], disableClear: [{
                type: Input,
                args: ['matSortDisableClear']
            }], sortChange: [{
                type: Output,
                args: ['matSortChange']
            }] } });
function getSortDirectionCycle(start, disableClear) {
    let sortOrder = ['asc', 'desc'];
    if (start == 'desc') {
        sortOrder.reverse();
    }
    if (!disableClear) {
        sortOrder.push('');
    }
    return sortOrder;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtc29ydGFibGUtcGx1Z2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3JpZC1ib290c3RyYXAvc29ydC9zcmMvbGliL2JzLXNvcnRhYmxlLXBsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxTQUFTLEVBQXdCLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdGLE9BQU8sRUFBZ0IscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsSUFBSSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDakUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLHdCQUF3QixFQUF5QyxNQUFNLGVBQWUsQ0FBQztBQUVuSCxPQUFPLEVBQUUsK0JBQStCLEVBQUUsMkJBQTJCLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQVEzSCxNQUFNLENBQUMsTUFBTSxVQUFVLEdBQWlCLFlBQVksQ0FBQztBQUdyRCxNQUFNLE9BQU8sd0JBQXdCO0lBaURuQyxZQUFtQixJQUE0QixFQUFVLFVBQW9DO1FBQTFFLFNBQUksR0FBSixJQUFJLENBQXdCO1FBQVUsZUFBVSxHQUFWLFVBQVUsQ0FBMEI7UUE1QzdGLDBFQUEwRTtRQUMxRSxjQUFTLEdBQUcsSUFBSSxHQUFHLEVBQTRCLENBQUM7UUFFaEQsc0VBQXNFO1FBQzdELGtCQUFhLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUs3Qzs7O1dBR0c7UUFDdUIsVUFBSyxHQUFtQixLQUFLLENBQUM7UUFZL0Msb0JBQWUsR0FBdUIsT0FBTyxDQUFDO1FBV3ZELG9GQUFvRjtRQUNsRCxlQUFVLEdBQXNDLElBQUksWUFBWSxFQUF1QixDQUFDO1FBRWxILGVBQVUsR0FBNEIsRUFBRSxD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RCxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVO3FCQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQ3hCLFNBQVMsQ0FBRSxLQUFLLENBQUMsRUFBRSxHQUFHLDBCQUEwQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDaEU7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7O3dJQTVNVSx3QkFBd0I7NEhBQXhCLHdCQUF3QjsyRkFBeEIsd0JBQXdCO2tCQURwQyxTQUFTO21CQUFDLEVBQUUsUUFBUSxFQUFFLHVCQUF1QixFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUU7K0lBYTlDLE1BQU07c0JBQWhDLEtBQUs7dUJBQUMsa0JBQWtCO2dCQU1DLEtBQUs7c0JBQTlCLEtBQUs7dUJBQUMsaUJBQWlCO2dCQUdVLFNBQVM7c0JBQTFDLEtBQUs7dUJBQUMscUJBQXFCO2dCQVNuQixlQUFlO3NCQUF2QixLQUFLO2dCQU9GLFlBQVk7c0JBRGYsS0FBSzt1QkFBQyxxQkFBcUI7Z0JBTU0sVUFBVTtzQkFBM0MsTUFBTTt1QkFBQyxlQUFlOztBQXdLekIsU0FBUyxxQkFBcUIsQ0FBQyxLQUFxQixFQUNyQixZQUFxQjtJQUNsRCxJQUFJLFNBQVMsR0FBOEIsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDM0QsSUFBSSxLQUFLLElBQUksTUFBTSxFQUFFO1FBQUUsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDO0tBQUU7SUFDN0MsSUFBSSxDQUFDLFlBQVksRUFBRTtRQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7S0FBRTtJQUUxQyxPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQsIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBPTl9JTlZBTElEQVRFX0hFQURFUlMsIHVucnggfSBmcm9tICdAcGVidWxhL25ncmlkL2NvcmUnO1xuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQsIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlciwgUGJsTmdyaWRTb3J0RGVmaW5pdGlvbiwgUGJsRGF0YVNvdXJjZSB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuaW1wb3J0IHsgUGJsTmdyaWRTb3J0YWJsZSwgUGJsTmdyaWRCc1NvcnREaXJlY3Rpb24sIFBibE5ncmlkQnNTb3J0U3RhdGUgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IGdldFNvcnREdXBsaWNhdGVTb3J0YWJsZUlkRXJyb3IsIGdldFNvcnRIZWFkZXJNaXNzaW5nSWRFcnJvciwgZ2V0U29ydEludmFsaWREaXJlY3Rpb25FcnJvciB9IGZyb20gJy4vc29ydC1lcnJvcnMnO1xuaW1wb3J0IHsgUGJsTmdyaWRCc1NvcnRhYmxlIH0gZnJvbSAnLi9icy1zb3J0YWJsZS9icy1zb3J0YWJsZS5jb21wb25lbnQnO1xuXG5kZWNsYXJlIG1vZHVsZSAnQHBlYnVsYS9uZ3JpZC9saWIvZXh0L3R5cGVzJyB7XG4gIGludGVyZmFjZSBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbiB7XG4gICAgYnNTb3J0YWJsZT86IFBibE5ncmlkQnNTb3J0YWJsZVBsdWdpbjtcbiAgfVxufVxuZXhwb3J0IGNvbnN0IFBMVUdJTl9LRVk6ICdic1NvcnRhYmxlJyA9ICdic1NvcnRhYmxlJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAncGJsLW5ncmlkW2JzU29ydGFibGVdJywgZXhwb3J0QXM6ICdwYmxCc1NvcnRhYmxlJyB9KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkQnNTb3J0YWJsZVBsdWdpbiBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcblxuICBnZXQgYnNTb3J0YWJsZURpc2FibGVkKCkgeyByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7IH1cbiAgc2V0IGJzU29ydGFibGVEaXNhYmxlZCh2YWx1ZTogYW55KSB7IHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTsgfVxuXG4gIC8qKiBDb2xsZWN0aW9uIG9mIGFsbCByZWdpc3RlcmVkIHNvcnRhYmxlcyB0aGF0IHRoaXMgZGlyZWN0aXZlIG1hbmFnZXMuICovXG4gIHNvcnRhYmxlcyA9IG5ldyBNYXA8c3RyaW5nLCBQYmxOZ3JpZFNvcnRhYmxlPigpO1xuXG4gIC8qKiBVc2VkIHRvIG5vdGlmeSBhbnkgY2hpbGQgY29tcG9uZW50cyBsaXN0ZW5pbmcgdG8gc3RhdGUgY2hhbmdlcy4gKi9cbiAgcmVhZG9ubHkgX3N0YXRlQ2hhbmdlcyA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgLyoqIFRoZSBpZCBvZiB0aGUgbW9zdCByZWNlbnRseSBzb3J0ZWQgTWF0U29ydGFibGUuICovXG4gIEBJbnB1dCgnYnNTb3J0YWJsZUFjdGl2ZScpIGFjdGl2ZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgZGlyZWN0aW9uIHRvIHNldCB3aGVuIGFuIFBibE5ncmlkU29ydGFibGUgaXMgaW5pdGlhbGx5IHNvcnRlZC5cbiAgICogTWF5IGJlIG92ZXJyaWRlbiBieSB0aGUgUGJsTmdyaWRTb3J0YWJsZSdzIHNvcnQgc3RhcnQuXG4gICAqL1xuICBASW5wdXQoJ2JzU29ydGFibGVTdGFydCcpIHN0YXJ0OiAnYXNjJyB8ICdkZXNjJyA9ICdhc2MnO1xuXG4gIC8qKiBUaGUgc29ydCBkaXJlY3Rpb24gb2YgdGhlIGN1cnJlbnRseSBhY3RpdmUgTWF0U29ydGFibGUuICovXG4gIEBJbnB1dCgnYnNTb3J0YWJsZURpcmVjdGlvbicpIGdldCBkaXJlY3Rpb24oKTogUGJsTmdyaWRCc1NvcnREaXJlY3Rpb24geyByZXR1cm4gdGhpcy5fZGlyZWN0aW9uOyB9XG4gIHNldCBkaXJlY3Rpb24oZGlyZWN0aW9uOiBQYmxOZ3JpZEJzU29ydERpcmVjdGlvbikge1xuICAgIGlmIChkaXJlY3Rpb24gJiYgZGlyZWN0aW9uICE9PSAnYXNjJyAmJiBkaXJlY3Rpb24gIT09ICdkZXNjJyAmJlxuICAgICAgKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkpIHtcbiAgICAgIHRocm93IGdldFNvcnRJbnZhbGlkRGlyZWN0aW9uRXJyb3IoZGlyZWN0aW9uKTtcbiAgICB9XG4gICAgdGhpcy5fZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICB9XG5cbiAgQElucHV0KCkgYnNBcnJvd1Bvc2l0aW9uOiAnYmVmb3JlJyB8ICdhZnRlcicgPSAnYWZ0ZXInO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRvIGRpc2FibGUgdGhlIHVzZXIgZnJvbSBjbGVhcmluZyB0aGUgc29ydCBieSBmaW5pc2hpbmcgdGhlIHNvcnQgZGlyZWN0aW9uIGN5Y2xlLlxuICAgKiBNYXkgYmUgb3ZlcnJpZGVuIGJ5IHRoZSBNYXRTb3J0YWJsZSdzIGRpc2FibGUgY2xlYXIgaW5wdXQuXG4gICAqL1xuICBASW5wdXQoJ21hdFNvcnREaXNhYmxlQ2xlYXInKVxuICBnZXQgZGlzYWJsZUNsZWFyKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fZGlzYWJsZUNsZWFyOyB9XG4gIHNldCBkaXNhYmxlQ2xlYXIodjogYm9vbGVhbikgeyB0aGlzLl9kaXNhYmxlQ2xlYXIgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodik7IH1cbiAgcHJpdmF0ZSBfZGlzYWJsZUNsZWFyOiBib29sZWFuO1xuXG4gIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHVzZXIgY2hhbmdlcyBlaXRoZXIgdGhlIGFjdGl2ZSBzb3J0IG9yIHNvcnQgZGlyZWN0aW9uLiAqL1xuICBAT3V0cHV0KCdtYXRTb3J0Q2hhbmdlJykgcmVhZG9ubHkgc29ydENoYW5nZTogRXZlbnRFbWl0dGVyPFBibE5ncmlkQnNTb3J0U3RhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcjxQYmxOZ3JpZEJzU29ydFN0YXRlPigpO1xuXG4gIHByaXZhdGUgX2RpcmVjdGlvbjogUGJsTmdyaWRCc1NvcnREaXJlY3Rpb24gPSAnJztcbiAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBfcmVtb3ZlUGx1Z2luOiAodGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4pID0+IHZvaWQ7XG4gIHByaXZhdGUgb3JpZ2luOiAnZHMnIHwgJ2NsaWNrJyA9ICdjbGljayc7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sIHByaXZhdGUgcGx1Z2luQ3RybDogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyKSB7XG4gICAgdGhpcy5fcmVtb3ZlUGx1Z2luID0gcGx1Z2luQ3RybC5zZXRQbHVnaW4oUExVR0lOX0tFWSwgdGhpcyk7XG5cbiAgICB0aGlzLnNvcnRDaGFuZ2VcbiAgICAgIC5waXBlKHVucngodGhpcykpXG4gICAgICAuc3Vic2NyaWJlKCBzID0+IHtcbiAgICAgICAgdGhpcy5vblNvcnQocywgdGhpcy5vcmlnaW4pO1xuICAgICAgICB0aGlzLm9yaWdpbiA9ICdjbGljayc7XG4gICAgICB9KTtcblxuICAgIHRoaXMuaGFuZGxlRXZlbnRzKCk7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXIgZnVuY3Rpb24gdG8gYmUgdXNlZCBieSB0aGUgY29udGFpbmVkIFBibE5ncmlkU29ydGFibGUuIEFkZHMgdGhlIFBibE5ncmlkU29ydGFibGUgdG8gdGhlXG4gICAqIGNvbGxlY3Rpb24gb2YgUGJsTmdyaWRTb3J0YWJsZS5cbiAgICovXG4gIHJlZ2lzdGVyKHNvcnRhYmxlOiBQYmxOZ3JpZFNvcnRhYmxlKTogdm9pZCB7XG4gICAgaWYgKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkge1xuICAgICAgaWYgKCFzb3J0YWJsZS5pZCkge1xuICAgICAgICB0aHJvdyBnZXRTb3J0SGVhZGVyTWlzc2luZ0lkRXJyb3IoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuc29ydGFibGVzLmhhcyhzb3J0YWJsZS5pZCkpIHtcbiAgICAgICAgdGhyb3cgZ2V0U29ydER1cGxpY2F0ZVNvcnRhYmxlSWRFcnJvcihzb3J0YWJsZS5pZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5zb3J0YWJsZXMuc2V0KHNvcnRhYmxlLmlkLCBzb3J0YWJsZSk7XG4gIH1cblxuICAvKipcbiAgICogVW5yZWdpc3RlciBmdW5jdGlvbiB0byBiZSB1c2VkIGJ5IHRoZSBjb250YWluZWQgUGJsTmdyaWRTb3J0YWJsZXMuIFJlbW92ZXMgdGhlIFBibE5ncmlkU29ydGFibGUgZnJvbSB0aGVcbiAgICogY29sbGVjdGlvbiBvZiBjb250YWluZWQgUGJsTmdyaWRTb3J0YWJsZXMuXG4gICAqL1xuICBkZXJlZ2lzdGVyKHNvcnRhYmxlOiBQYmxOZ3JpZFNvcnRhYmxlKTogdm9pZCB7XG4gICAgdGhpcy5zb3J0YWJsZXMuZGVsZXRlKHNvcnRhYmxlLmlkKTtcbiAgfVxuXG4gIC8qKiBTZXRzIHRoZSBhY3RpdmUgc29ydCBpZCBhbmQgZGV0ZXJtaW5lcyB0aGUgbmV3IHNvcnQgZGlyZWN0aW9uLiAqL1xuICBzb3J0KHNvcnRhYmxlOiBQYmxOZ3JpZFNvcnRhYmxlKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuYWN0aXZlICE9IHNvcnRhYmxlLmlkKSB7XG4gICAgICB0aGlzLmFjdGl2ZSA9IHNvcnRhYmxlLmlkO1xuICAgICAgdGhpcy5kaXJlY3Rpb24gPSBzb3J0YWJsZS5zdGFydCA/IHNvcnRhYmxlLnN0YXJ0IDogdGhpcy5zdGFydDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kaXJlY3Rpb24gPSB0aGlzLmdldE5leHRTb3J0RGlyZWN0aW9uKHNvcnRhYmxlKTtcbiAgICB9XG5cbiAgICB0aGlzLnNvcnRDaGFuZ2UuZW1pdCh7YWN0aXZlOiB0aGlzLmFjdGl2ZSwgZGlyZWN0aW9uOiB0aGlzLmRpcmVjdGlvbn0pO1xuICB9XG5cbiAgLyoqIFJldHVybnMgdGhlIG5leHQgc29ydCBkaXJlY3Rpb24gb2YgdGhlIGFjdGl2ZSBzb3J0YWJsZSwgY2hlY2tpbmcgZm9yIHBvdGVudGlhbCBvdmVycmlkZXMuICovXG4gIGdldE5leHRTb3J0RGlyZWN0aW9uKHNvcnRhYmxlOiBQYmxOZ3JpZFNvcnRhYmxlKTogUGJsTmdyaWRCc1NvcnREaXJlY3Rpb24ge1xuICAgIGlmICghc29ydGFibGUpIHsgcmV0dXJuICcnOyB9XG5cbiAgICAvLyBHZXQgdGhlIHNvcnQgZGlyZWN0aW9uIGN5Y2xlIHdpdGggdGhlIHBvdGVudGlhbCBzb3J0YWJsZSBvdmVycmlkZXMuXG4gICAgY29uc3QgZGlzYWJsZUNsZWFyID0gc29ydGFibGUuZGlzYWJsZUNsZWFyICE9IG51bGwgPyBzb3J0YWJsZS5kaXNhYmxlQ2xlYXIgOiB0aGlzLmRpc2FibGVDbGVhcjtcbiAgICBsZXQgc29ydERpcmVjdGlvbkN5Y2xlID0gZ2V0U29ydERpcmVjdGlvbkN5Y2xlKHNvcnRhYmxlLnN0YXJ0IHx8IHRoaXMuc3RhcnQsIGRpc2FibGVDbGVhcik7XG5cbiAgICAvLyBHZXQgYW5kIHJldHVybiB0aGUgbmV4dCBkaXJlY3Rpb24gaW4gdGhlIGN5Y2xlXG4gICAgbGV0IG5leHREaXJlY3Rpb25JbmRleCA9IHNvcnREaXJlY3Rpb25DeWNsZS5pbmRleE9mKHRoaXMuZGlyZWN0aW9uKSArIDE7XG4gICAgaWYgKG5leHREaXJlY3Rpb25JbmRleCA+PSBzb3J0RGlyZWN0aW9uQ3ljbGUubGVuZ3RoKSB7IG5leHREaXJlY3Rpb25JbmRleCA9IDA7IH1cbiAgICByZXR1cm4gc29ydERpcmVjdGlvbkN5Y2xlW25leHREaXJlY3Rpb25JbmRleF07XG4gIH1cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICB0aGlzLl9zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fc3RhdGVDaGFuZ2VzLmNvbXBsZXRlKCk7XG4gICAgdGhpcy5fcmVtb3ZlUGx1Z2luKHRoaXMuZ3JpZCk7XG4gICAgdW5yeC5raWxsKHRoaXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBvblNvcnQoc29ydDogUGJsTmdyaWRCc1NvcnRTdGF0ZSwgb3JpZ2luOiAnZHMnIHwgJ2NsaWNrJyk6IHZvaWQge1xuICAgIGNvbnN0IHRhYmxlID0gdGhpcy5ncmlkO1xuICAgIGNvbnN0IGNvbHVtbiA9IHRhYmxlLmNvbHVtbkFwaS52aXNpYmxlQ29sdW1ucy5maW5kKGMgPT4gYy5pZCA9PT0gc29ydC5hY3RpdmUpO1xuXG4gICAgaWYgKCBvcmlnaW4gIT09ICdjbGljaycgfHwgIWNvbHVtbiB8fCAhY29sdW1uLnNvcnQgKSB7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG5ld1NvcnQ6IFBibE5ncmlkU29ydERlZmluaXRpb24gPSB7IH07XG4gICAgICBjb25zdCBzb3J0Rm4gPSB0eXBlb2YgY29sdW1uLnNvcnQgPT09ICdmdW5jdGlvbicgJiYgY29sdW1uLnNvcnQ7XG4gICAgICBpZiAoc29ydC5kaXJlY3Rpb24pIHtcbiAgICAgICAgbmV3U29ydC5vcmRlciA9IHNvcnQuZGlyZWN0aW9uO1xuICAgICAgfVxuICAgICAgaWYgKHNvcnRGbikge1xuICAgICAgICBuZXdTb3J0LnNvcnRGbiA9IHNvcnRGbjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGN1cnJlbnRTb3J0ID0gdGFibGUuZHMuc29ydDtcbiAgICAgIGlmIChjb2x1bW4gPT09IGN1cnJlbnRTb3J0LmNvbHVtbikge1xuICAgICAgICBjb25zdCBfc29ydCA9IGN1cnJlbnRTb3J0LnNvcnQgfHwge307XG4gICAgICAgIGlmIChuZXdTb3J0Lm9yZGVyID09PSBfc29ydC5vcmRlcikge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGFibGUuZHMuc2V0U29ydChjb2x1bW4sIG5ld1NvcnQpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlRXZlbnRzKCkge1xuICAgIGNvbnN0IGhhbmRsZURhdGFTb3VyY2VTb3J0Q2hhbmdlID0gKHNvcnRDaGFuZ2U6IFBibERhdGFTb3VyY2VbJ3NvcnQnXSkgPT4ge1xuICAgICAgY29uc3QgeyBjb2x1bW4gfSA9IHNvcnRDaGFuZ2U7XG4gICAgICBjb25zdCBvcmRlciA9IHNvcnRDaGFuZ2Uuc29ydCA/IHNvcnRDaGFuZ2Uuc29ydC5vcmRlciA6IHVuZGVmaW5lZDtcblxuICAgICAgaWYgKGNvbHVtbikge1xuICAgICAgICBpZiAodGhpcy5hY3RpdmUgPT09IGNvbHVtbi5pZCAmJiB0aGlzLmRpcmVjdGlvbiA9PT0gKG9yZGVyIHx8ICcnKSkgeyByZXR1cm47IH1cbiAgICAgICAgY29uc3Qgc29ydGFibGU6IFBibE5ncmlkU29ydGFibGUgPSB0aGlzLnNvcnRhYmxlcy5nZXQoY29sdW1uLmlkKSBhcyBhbnk7XG4gICAgICAgIGlmIChzb3J0YWJsZSkge1xuICAgICAgICAgIHRoaXMub3JpZ2luID0gJ2RzJztcbiAgICAgICAgICB0aGlzLmFjdGl2ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBzb3J0YWJsZS5zdGFydCA9IG9yZGVyIHx8ICdhc2MnO1xuICAgICAgICAgIChzb3J0YWJsZSBhcyBQYmxOZ3JpZEJzU29ydGFibGUpLl9oYW5kbGVDbGljaygpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuYWN0aXZlKSB7IC8vIGNsZWFyIG1vZGUgKGhpdCBmcm9tIGNvZGUsIG5vdCBjbGljaykuXG4gICAgICAgIGNvbnN0IHNvcnRhYmxlOiBQYmxOZ3JpZFNvcnRhYmxlID0gdGhpcy5zb3J0YWJsZXMuZ2V0KHRoaXMuYWN0aXZlKSBhcyBhbnk7XG4gICAgICAgIGlmIChzb3J0YWJsZSApIHtcbiAgICAgICAgICBpZiAoIXNvcnRhYmxlLmRpc2FibGVDbGVhcikge1xuICAgICAgICAgICAgbGV0IG5leHRTb3J0RGlyOiBQYmxOZ3JpZEJzU29ydERpcmVjdGlvbjtcbiAgICAgICAgICAgIHdoaWxlIChuZXh0U29ydERpciA9IHRoaXMuZ2V0TmV4dFNvcnREaXJlY3Rpb24oc29ydGFibGUpKSB7XG4gICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gbmV4dFNvcnREaXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMub3JpZ2luID0gJ2RzJztcbiAgICAgICAgICAoc29ydGFibGUgYXMgUGJsTmdyaWRCc1NvcnRhYmxlKS5faGFuZGxlQ2xpY2soKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMucGx1Z2luQ3RybC5ldmVudHNcbiAgICAgIC5waXBlKE9OX0lOVkFMSURBVEVfSEVBREVSUylcbiAgICAgIC5zdWJzY3JpYmUoIGUgPT4ge1xuICAgICAgICBjb25zdCBoYXNBY3RpdmVTb3J0ID0gdGhpcy5hY3RpdmU7XG4gICAgICAgIGlmICh0aGlzLmdyaWQuZHM/LnNvcnQpIHtcbiAgICAgICAgICBpZiAoIXRoaXMuZ3JpZC5kcy5zb3J0LmNvbHVtbiAmJiBoYXNBY3RpdmVTb3J0KSB7XG4gICAgICAgICAgICB0aGlzLm9uU29ydCh7IGFjdGl2ZTogdGhpcy5hY3RpdmUsIGRpcmVjdGlvbjogdGhpcy5kaXJlY3Rpb24gfHwgJ2FzYycgfSwgdGhpcy5vcmlnaW4pO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5ncmlkLmRzLnNvcnQuY29sdW1uICYmICFoYXNBY3RpdmVTb3J0KSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGhhbmRsZURhdGFTb3VyY2VTb3J0Q2hhbmdlKHRoaXMuZ3JpZC5kcy5zb3J0KSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIHRoaXMucGx1Z2luQ3RybC5ldmVudHNcbiAgICAgIC5zdWJzY3JpYmUoIGUgPT4ge1xuICAgICAgICBpZiAoZS5raW5kID09PSAnb25EYXRhU291cmNlJykge1xuICAgICAgICAgIHVucngua2lsbCh0aGlzLCBlLnByZXYpO1xuICAgICAgICAgIGlmICh0aGlzLmFjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5vblNvcnQoeyBhY3RpdmU6IHRoaXMuYWN0aXZlLCBkaXJlY3Rpb246IHRoaXMuZGlyZWN0aW9uIHx8ICdhc2MnIH0sIHRoaXMub3JpZ2luKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5ncmlkLmRzLnNvcnRDaGFuZ2VcbiAgICAgICAgICAgIC5waXBlKHVucngodGhpcywgZS5jdXJyKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoIGV2ZW50ID0+IHsgaGFuZGxlRGF0YVNvdXJjZVNvcnRDaGFuZ2UoZXZlbnQpOyB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfYnNTb3J0YWJsZURpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlQ2xlYXI6IEJvb2xlYW5JbnB1dDtcbn1cblxuZnVuY3Rpb24gZ2V0U29ydERpcmVjdGlvbkN5Y2xlKHN0YXJ0OiAnYXNjJyB8ICdkZXNjJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlQ2xlYXI6IGJvb2xlYW4pOiBQYmxOZ3JpZEJzU29ydERpcmVjdGlvbltdIHtcbiAgbGV0IHNvcnRPcmRlcjogUGJsTmdyaWRCc1NvcnREaXJlY3Rpb25bXSA9IFsnYXNjJywgJ2Rlc2MnXTtcbiAgaWYgKHN0YXJ0ID09ICdkZXNjJykgeyBzb3J0T3JkZXIucmV2ZXJzZSgpOyB9XG4gIGlmICghZGlzYWJsZUNsZWFyKSB7IHNvcnRPcmRlci5wdXNoKCcnKTsgfVxuXG4gIHJldHVybiBzb3J0T3JkZXI7XG59XG4iXX0=