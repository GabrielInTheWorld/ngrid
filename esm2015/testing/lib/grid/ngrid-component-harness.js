import { __awaiter } from "tslib";
import { ContentContainerComponentHarness, HarnessPredicate } from '@angular/cdk/testing';
import { PblNgridColumnHeaderRowHarness, PblNgridDataRowHarness } from '../row/ngrid-column-row-harness';
export class PblNgridHarness extends ContentContainerComponentHarness {
    static register(key, method) {
        PblNgridHarness.prototype[key] = method;
    }
    /**
     * Gets a `HarnessPredicate` that can be used to search for a nGrid with specific attributes.
     * @param options Options for narrowing the search
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return new HarnessPredicate(PblNgridHarness, options);
    }
    getColumnHeaderRow() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.locatorFor(PblNgridColumnHeaderRowHarness)();
        });
    }
    getDataRow(rowIdentOrIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof rowIdentOrIndex === 'number') {
                return this.locatorFor(PblNgridDataRowHarness.with({ rowIndex: rowIdentOrIndex }))();
            }
            else {
                return this.locatorFor(PblNgridDataRowHarness.with({ rowIdentity: rowIdentOrIndex }))();
            }
        });
    }
    getDataRows() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.forceStabilize();
            return this.locatorForAll(PblNgridDataRowHarness)();
        });
    }
}
PblNgridHarness.hostSelector = 'pbl-ngrid';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdyaWQtY29tcG9uZW50LWhhcm5lc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25ncmlkL3Rlc3Rpbmcvc3JjL2xpYi9ncmlkL25ncmlkLWNvbXBvbmVudC1oYXJuZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMxRixPQUFPLEVBQUUsOEJBQThCLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUd6RyxNQUFNLE9BQU8sZUFBZ0IsU0FBUSxnQ0FBZ0M7SUFHbkUsTUFBTSxDQUFDLFFBQVEsQ0FBa0MsR0FBTSxFQUFFLE1BQTBCO1FBQ2pGLGVBQWUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDO0lBQzFDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFrQyxFQUFFO1FBQzlDLE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQyxlQUFlLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVLLGtCQUFrQjs7WUFDdEIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLDhCQUE4QixDQUFDLEVBQUUsQ0FBQztRQUMzRCxDQUFDO0tBQUE7SUFJSyxVQUFVLENBQUMsZUFBZ0M7O1lBQy9DLElBQUksT0FBTyxlQUFlLEtBQUssUUFBUSxFQUFFO2dCQUN2QyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDO2FBQ3RGO2lCQUFNO2dCQUNMLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFLENBQUUsQ0FBQyxFQUFFLENBQUM7YUFDMUY7UUFDSCxDQUFDO0tBQUE7SUFFSyxXQUFXOztZQUNmLE1BQU0sSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQzVCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFLENBQUM7UUFDdEQsQ0FBQztLQUFBOztBQWhDTSw0QkFBWSxHQUFHLFdBQVcsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnRlbnRDb250YWluZXJDb21wb25lbnRIYXJuZXNzLCBIYXJuZXNzUHJlZGljYXRlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Rlc3RpbmcnO1xuaW1wb3J0IHsgUGJsTmdyaWRDb2x1bW5IZWFkZXJSb3dIYXJuZXNzLCBQYmxOZ3JpZERhdGFSb3dIYXJuZXNzIH0gZnJvbSAnLi4vcm93L25ncmlkLWNvbHVtbi1yb3ctaGFybmVzcyc7XG5pbXBvcnQgeyBQYmxOZ3JpZEhhcm5lc3NGaWx0ZXJzIH0gZnJvbSAnLi4vbmdyaWQtaGFybmVzcy1maWx0ZXJzJztcblxuZXhwb3J0IGNsYXNzIFBibE5ncmlkSGFybmVzcyBleHRlbmRzIENvbnRlbnRDb250YWluZXJDb21wb25lbnRIYXJuZXNzIHtcbiAgc3RhdGljIGhvc3RTZWxlY3RvciA9ICdwYmwtbmdyaWQnO1xuXG4gIHN0YXRpYyByZWdpc3RlcjxQIGV4dGVuZHMga2V5b2YgUGJsTmdyaWRIYXJuZXNzPihrZXk6IFAsIG1ldGhvZDogUGJsTmdyaWRIYXJuZXNzW1BdKSB7XG4gICAgUGJsTmdyaWRIYXJuZXNzLnByb3RvdHlwZVtrZXldID0gbWV0aG9kO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYSBgSGFybmVzc1ByZWRpY2F0ZWAgdGhhdCBjYW4gYmUgdXNlZCB0byBzZWFyY2ggZm9yIGEgbkdyaWQgd2l0aCBzcGVjaWZpYyBhdHRyaWJ1dGVzLlxuICAgKiBAcGFyYW0gb3B0aW9ucyBPcHRpb25zIGZvciBuYXJyb3dpbmcgdGhlIHNlYXJjaFxuICAgKiBAcmV0dXJuIGEgYEhhcm5lc3NQcmVkaWNhdGVgIGNvbmZpZ3VyZWQgd2l0aCB0aGUgZ2l2ZW4gb3B0aW9ucy5cbiAgICovXG4gIHN0YXRpYyB3aXRoKG9wdGlvbnM6IFBibE5ncmlkSGFybmVzc0ZpbHRlcnMgPSB7fSk6IEhhcm5lc3NQcmVkaWNhdGU8UGJsTmdyaWRIYXJuZXNzPiB7XG4gICAgcmV0dXJuIG5ldyBIYXJuZXNzUHJlZGljYXRlKFBibE5ncmlkSGFybmVzcywgb3B0aW9ucyk7XG4gIH1cblxuICBhc3luYyBnZXRDb2x1bW5IZWFkZXJSb3coKTogUHJvbWlzZTxQYmxOZ3JpZENvbHVtbkhlYWRlclJvd0hhcm5lc3M+IHtcbiAgICByZXR1cm4gdGhpcy5sb2NhdG9yRm9yKFBibE5ncmlkQ29sdW1uSGVhZGVyUm93SGFybmVzcykoKTtcbiAgfVxuXG4gIGFzeW5jIGdldERhdGFSb3cocm93SWRlbnRpdHk6IHN0cmluZyk6IFByb21pc2U8UGJsTmdyaWREYXRhUm93SGFybmVzcyB8IHVuZGVmaW5lZD5cbiAgYXN5bmMgZ2V0RGF0YVJvdyhyb3dJbmRleDogbnVtYmVyKTogUHJvbWlzZTxQYmxOZ3JpZERhdGFSb3dIYXJuZXNzIHwgdW5kZWZpbmVkPjsgLy8gdHNsaW50OmRpc2FibGUtbGluZTogdW5pZmllZC1zaWduYXR1cmVzXG4gIGFzeW5jIGdldERhdGFSb3cocm93SWRlbnRPckluZGV4OiBzdHJpbmcgfCBudW1iZXIpOiBQcm9taXNlPFBibE5ncmlkRGF0YVJvd0hhcm5lc3MgfCB1bmRlZmluZWQ+IHtcbiAgICBpZiAodHlwZW9mIHJvd0lkZW50T3JJbmRleCA9PT0gJ251bWJlcicpIHtcbiAgICAgIHJldHVybiB0aGlzLmxvY2F0b3JGb3IoUGJsTmdyaWREYXRhUm93SGFybmVzcy53aXRoKHsgcm93SW5kZXg6IHJvd0lkZW50T3JJbmRleCB9KSkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMubG9jYXRvckZvcihQYmxOZ3JpZERhdGFSb3dIYXJuZXNzLndpdGgoeyByb3dJZGVudGl0eTogcm93SWRlbnRPckluZGV4IH0gKSkoKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBnZXREYXRhUm93cygpOiBQcm9taXNlPFBibE5ncmlkRGF0YVJvd0hhcm5lc3NbXT4ge1xuICAgIGF3YWl0IHRoaXMuZm9yY2VTdGFiaWxpemUoKTtcbiAgICByZXR1cm4gdGhpcy5sb2NhdG9yRm9yQWxsKFBibE5ncmlkRGF0YVJvd0hhcm5lc3MpKCk7XG4gIH1cbn1cblxuIl19