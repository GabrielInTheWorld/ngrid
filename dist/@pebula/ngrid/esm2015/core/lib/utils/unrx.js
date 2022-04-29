import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
/**
 * Emits the values emitted by the source observable until a kill signal is sent to the group.
 * You can also specify a `subKillGroup` which can be used to kill specific subscriptions within a group.
 *
 * When a `killGroup` is "killed" all `subKillGroup` are killed as well. When a `subKillGroup` is "killed" the group remains
 * as well as other "subKillGroup" registered for that group.
 *
 * > WARNING: Do not apply operators that subscribe internally (e.g. combineLatest, switchMap) after the `killOnDestroy` operator.
 * Internal subscriptions will not unsubscribe automatically.
 * For more information see {@link https://blog.angularindepth.com/rxjs-avoiding-takeuntil-leaks-fb5182d047ef | this blog post}
 */
export function unrx(killGroup, subKillGroup) {
    return unrx.pipe(killGroup, subKillGroup);
}
(function (unrx) {
    const ALL_HANDLERS_TOKEN = {};
    const notifierStore = new WeakMap();
    function getNotifier(component, create = false) {
        let notifier = notifierStore.get(component);
        if (!notifier && create === true) {
            notifierStore.set(component, notifier = new Subject());
        }
        return notifier;
    }
    function kill(killGroup, ...subKillGroup) {
        if (subKillGroup.length === 0) {
            killAll(killGroup);
        }
        else {
            const notifier = getNotifier(killGroup);
            if (notifier) {
                for (const h of subKillGroup) {
                    notifier.next(h);
                }
            }
        }
    }
    unrx.kill = kill;
    /** {@inheritdoc unrx} */
    function pipe(killGroup, subKillGroup) {
        return (source) => source.pipe(takeUntil(getNotifier(killGroup, true).pipe(filter(h => h === ALL_HANDLERS_TOKEN || (subKillGroup && h === subKillGroup)))));
    }
    unrx.pipe = pipe;
    function killAll(obj) {
        const notifier = getNotifier(obj);
        if (notifier) {
            notifier.next(ALL_HANDLERS_TOKEN);
            notifier.complete();
            notifierStore.delete(obj);
        }
    }
})(unrx || (unrx = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5yeC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmdyaWQvY29yZS9zcmMvbGliL3V0aWxzL3VucngudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRW5EOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFNLFVBQVUsSUFBSSxDQUFJLFNBQWMsRUFBRSxZQUFrQjtJQUN4RCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUksU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQy9DLENBQUM7QUFFRCxXQUFpQixJQUFJO0lBQ25CLE1BQU0sa0JBQWtCLEdBQUcsRUFBRSxDQUFDO0lBQzlCLE1BQU0sYUFBYSxHQUFHLElBQUksT0FBTyxFQUFxQixDQUFDO0lBRXZELFNBQVMsV0FBVyxDQUFDLFNBQWMsRUFBRSxNQUFNLEdBQUcsS0FBSztRQUNqRCxJQUFJLFFBQVEsR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxRQUFRLElBQUksTUFBTSxLQUFLLElBQUksRUFBRTtZQUNoQyxhQUFhLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxRQUFRLEdBQUcsSUFBSSxPQUFPLEVBQU8sQ0FBQyxDQUFDO1NBQzdEO1FBQ0QsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQztJQWVELFNBQWdCLElBQUksQ0FBQyxTQUFjLEVBQUUsR0FBRyxZQUFtQjtRQUN6RCxJQUFJLFlBQVksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQzdCLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUNwQjthQUFNO1lBQ0wsTUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3hDLElBQUksUUFBUSxFQUFFO2dCQUNaLEtBQUssTUFBTSxDQUFDLElBQUksWUFBWSxFQUFFO29CQUM1QixRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNsQjthQUNGO1NBQ0Y7SUFDSCxDQUFDO0lBWGUsU0FBSSxPQVduQixDQUFBO0lBRUQseUJBQXlCO0lBQ3pCLFNBQWdCLElBQUksQ0FBSSxTQUFjLEVBQUUsWUFBa0I7UUFDeEQsT0FBTyxDQUFDLE1BQXFCLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQzNDLFNBQVMsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssa0JBQWtCLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxLQUFLLFlBQVksQ0FBRSxDQUFFLENBQUMsQ0FBQyxDQUMvSCxDQUFDO0lBQ0osQ0FBQztJQUplLFNBQUksT0FJbkIsQ0FBQTtJQUVELFNBQVMsT0FBTyxDQUFDLEdBQVE7UUFDdkIsTUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xDLElBQUksUUFBUSxFQUFFO1lBQ1osUUFBUSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQ2xDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNwQixhQUFhLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzNCO0lBQ0gsQ0FBQztBQUNILENBQUMsRUFyRGdCLElBQUksS0FBSixJQUFJLFFBcURwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG4vKipcbiAqIEVtaXRzIHRoZSB2YWx1ZXMgZW1pdHRlZCBieSB0aGUgc291cmNlIG9ic2VydmFibGUgdW50aWwgYSBraWxsIHNpZ25hbCBpcyBzZW50IHRvIHRoZSBncm91cC5cbiAqIFlvdSBjYW4gYWxzbyBzcGVjaWZ5IGEgYHN1YktpbGxHcm91cGAgd2hpY2ggY2FuIGJlIHVzZWQgdG8ga2lsbCBzcGVjaWZpYyBzdWJzY3JpcHRpb25zIHdpdGhpbiBhIGdyb3VwLlxuICpcbiAqIFdoZW4gYSBga2lsbEdyb3VwYCBpcyBcImtpbGxlZFwiIGFsbCBgc3ViS2lsbEdyb3VwYCBhcmUga2lsbGVkIGFzIHdlbGwuIFdoZW4gYSBgc3ViS2lsbEdyb3VwYCBpcyBcImtpbGxlZFwiIHRoZSBncm91cCByZW1haW5zXG4gKiBhcyB3ZWxsIGFzIG90aGVyIFwic3ViS2lsbEdyb3VwXCIgcmVnaXN0ZXJlZCBmb3IgdGhhdCBncm91cC5cbiAqXG4gKiA+IFdBUk5JTkc6IERvIG5vdCBhcHBseSBvcGVyYXRvcnMgdGhhdCBzdWJzY3JpYmUgaW50ZXJuYWxseSAoZS5nLiBjb21iaW5lTGF0ZXN0LCBzd2l0Y2hNYXApIGFmdGVyIHRoZSBga2lsbE9uRGVzdHJveWAgb3BlcmF0b3IuXG4gKiBJbnRlcm5hbCBzdWJzY3JpcHRpb25zIHdpbGwgbm90IHVuc3Vic2NyaWJlIGF1dG9tYXRpY2FsbHkuXG4gKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBzZWUge0BsaW5rIGh0dHBzOi8vYmxvZy5hbmd1bGFyaW5kZXB0aC5jb20vcnhqcy1hdm9pZGluZy10YWtldW50aWwtbGVha3MtZmI1MTgyZDA0N2VmIHwgdGhpcyBibG9nIHBvc3R9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1bnJ4PFQ+KGtpbGxHcm91cDogYW55LCBzdWJLaWxsR3JvdXA/OiBhbnkpOiAoc291cmNlOiBPYnNlcnZhYmxlPFQ+KSA9PiBPYnNlcnZhYmxlPFQ+IHtcbiAgcmV0dXJuIHVucngucGlwZTxUPihraWxsR3JvdXAsIHN1YktpbGxHcm91cCk7XG59XG5cbmV4cG9ydCBuYW1lc3BhY2UgdW5yeCB7XG4gIGNvbnN0IEFMTF9IQU5ETEVSU19UT0tFTiA9IHt9O1xuICBjb25zdCBub3RpZmllclN0b3JlID0gbmV3IFdlYWtNYXA8YW55LCBTdWJqZWN0PGFueT4+KCk7XG5cbiAgZnVuY3Rpb24gZ2V0Tm90aWZpZXIoY29tcG9uZW50OiBhbnksIGNyZWF0ZSA9IGZhbHNlKTogU3ViamVjdDxhbnk+IHwgdW5kZWZpbmVkIHtcbiAgICBsZXQgbm90aWZpZXIgPSBub3RpZmllclN0b3JlLmdldChjb21wb25lbnQpO1xuICAgIGlmICghbm90aWZpZXIgJiYgY3JlYXRlID09PSB0cnVlKSB7XG4gICAgICBub3RpZmllclN0b3JlLnNldChjb21wb25lbnQsIG5vdGlmaWVyID0gbmV3IFN1YmplY3Q8YW55PigpKTtcbiAgICB9XG4gICAgcmV0dXJuIG5vdGlmaWVyO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbmQgYSBcImtpbGxcIiBzaWduYWwgdG8gdGhlIHNwZWNpZmllZCBga2lsbEdyb3VwYC5cbiAgICogVGhpcyB3aWxsIGltbWVkaWF0ZWx5IHVuc3Vic2NyaWJlIGFsbCBzdWJzY3JpcHRpb25zIHdpdGggdGhlIGB1bnJ4YCBwaXBlIHJlZ2lzdGVyZWQgdW5kZXIgdGhlIHNwZWNpZmllZCBga2lsbEdyb3VwYC5cbiAgICpcbiAgICogTm90ZSB0aGF0IHRoZSBlbnRpcmUgYGtpbGxHcm91cGAgaXMgZGVzdHJveWVkLlxuICAgKi9cbiAgZXhwb3J0IGZ1bmN0aW9uIGtpbGwoa2lsbEdyb3VwOiBhbnkpOiB2b2lkO1xuICAvKipcbiAgICogU2VuZCBhIFwia2lsbFwiIHNpZ25hbCB0byBhIHNwZWNpZmljIGBzdWJLaWxsR3JvdXBgIGluIHRoZSBzcGVjaWZpZWQgYGtpbGxHcm91cGAuXG4gICAqIFRoaXMgd2lsbCBpbW1lZGlhdGVseSB1bnN1YnNjcmliZSBhbGwgc3Vic2NyaXB0aW9ucyB3aXRoIHRoZSBgdW5yeGAgcGlwZSByZWdpc3RlcmVkIHVuZGVyIHRoZSBzcGVjaWZpZWQgYGtpbGxHcm91cGAgYW5kIGBzdWJLaWxsR3JvdXBgLlxuICAgKlxuICAgKi9cbiAgZXhwb3J0IGZ1bmN0aW9uIGtpbGwoa2lsbEdyb3VwOiBhbnksIC4uLnN1YktpbGxHcm91cDogYW55W10pOiB2b2lkO1xuICBleHBvcnQgZnVuY3Rpb24ga2lsbChraWxsR3JvdXA6IGFueSwgLi4uc3ViS2lsbEdyb3VwOiBhbnlbXSk6IHZvaWQge1xuICAgIGlmIChzdWJLaWxsR3JvdXAubGVuZ3RoID09PSAwKSB7XG4gICAgICBraWxsQWxsKGtpbGxHcm91cCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG5vdGlmaWVyID0gZ2V0Tm90aWZpZXIoa2lsbEdyb3VwKTtcbiAgICAgIGlmIChub3RpZmllcikge1xuICAgICAgICBmb3IgKGNvbnN0IGggb2Ygc3ViS2lsbEdyb3VwKSB7XG4gICAgICAgICAgbm90aWZpZXIubmV4dChoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKiB7QGluaGVyaXRkb2MgdW5yeH0gKi9cbiAgZXhwb3J0IGZ1bmN0aW9uIHBpcGU8VD4oa2lsbEdyb3VwOiBhbnksIHN1YktpbGxHcm91cD86IGFueSk6IChzb3VyY2U6IE9ic2VydmFibGU8VD4pID0+IE9ic2VydmFibGU8VD4ge1xuICAgIHJldHVybiAoc291cmNlOiBPYnNlcnZhYmxlPFQ+KSA9PiBzb3VyY2UucGlwZShcbiAgICAgIHRha2VVbnRpbChnZXROb3RpZmllcihraWxsR3JvdXAsIHRydWUpLnBpcGUoZmlsdGVyKCBoID0+IGggPT09IEFMTF9IQU5ETEVSU19UT0tFTiB8fCAoc3ViS2lsbEdyb3VwICYmIGggPT09IHN1YktpbGxHcm91cCApICkpKVxuICAgICk7XG4gIH1cblxuICBmdW5jdGlvbiBraWxsQWxsKG9iajogYW55KTogdm9pZCB7XG4gICAgY29uc3Qgbm90aWZpZXIgPSBnZXROb3RpZmllcihvYmopO1xuICAgIGlmIChub3RpZmllcikge1xuICAgICAgbm90aWZpZXIubmV4dChBTExfSEFORExFUlNfVE9LRU4pO1xuICAgICAgbm90aWZpZXIuY29tcGxldGUoKTtcbiAgICAgIG5vdGlmaWVyU3RvcmUuZGVsZXRlKG9iaik7XG4gICAgfVxuICB9XG59XG4iXX0=