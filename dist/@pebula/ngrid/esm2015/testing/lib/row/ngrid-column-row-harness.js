import { __awaiter } from "tslib";
import { ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';
import { PblNgridColumnCellHarness, PblNgridDataCellHarness } from '../cell/ngrid-column-cell-harness';
/**
 * Harness for interacting with rows that are structured based on a column
 */
export class PblNgridColumnRowHarness extends ComponentHarness {
    getCells(filter = {}, type) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!type) {
                type = PblNgridColumnCellHarness;
            }
            return this.locatorForAll(type.with(filter))();
        });
    }
}
export class PblNgridColumnHeaderRowHarness extends PblNgridColumnRowHarness {
    getCellByColumnId(columnId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getCells({ columnIds: [columnId] });
            if (result) {
                return result[0];
            }
        });
    }
    getCells(filter = {}) {
        const _super = Object.create(null, {
            getCells: { get: () => super.getCells }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return _super.getCells.call(this, filter, PblNgridColumnCellHarness);
        });
    }
}
// TODO: better detection here, not relay on class that might change.
PblNgridColumnHeaderRowHarness.hostSelector = `div[pbl-ngrid-fixed-meta-row-container="header"] pbl-ngrid-column-row.pbl-ngrid-header-row-main`;
export class PblNgridDataRowHarness extends PblNgridColumnRowHarness {
    /**
     * Gets a `HarnessPredicate` that can be used to search for a nGrid data row with specific attributes.
     * @param options Options for narrowing the search
     * @return a `HarnessPredicate` configured with the given options.
     */
    static with(options = {}) {
        return getDataRowPredicate(PblNgridDataRowHarness, options);
    }
    getRowIndex() {
        return __awaiter(this, void 0, void 0, function* () {
            const attr = yield this.host().then(host => host.getAttribute('row-id'));
            return Number(attr);
        });
    }
    getRowIdentity() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.host().then(host => host.getAttribute('row-key'));
        });
    }
    getCells(filter = {}) {
        const _super = Object.create(null, {
            getCells: { get: () => super.getCells }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return _super.getCells.call(this, filter, PblNgridDataCellHarness);
        });
    }
}
// TODO: better detection here, not relay on class that might change.
PblNgridDataRowHarness.hostSelector = `pbl-cdk-table pbl-ngrid-row`;
export function getDataRowPredicate(type, options) {
    // We can't use FluentApi here because ngc will cry
    const predicate = new HarnessPredicate(type, options);
    predicate
        .addOption('rowIndex', options.rowIndex, (harness, rowIndex) => harness.getRowIndex().then(result => result === rowIndex))
        .addOption('rowIdentity', options.rowIdentity, (harness, rowIdentity) => HarnessPredicate.stringMatches(harness.getRowIdentity(), rowIdentity));
    return predicate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdyaWQtY29sdW1uLXJvdy1oYXJuZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3JpZC90ZXN0aW5nL3NyYy9saWIvcm93L25ncmlkLWNvbHVtbi1yb3ctaGFybmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLGdCQUFnQixFQUErQixnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXZHLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSx1QkFBdUIsRUFBbUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUV4STs7R0FFRztBQUNILE1BQU0sT0FBTyx3QkFBeUIsU0FBUSxnQkFBZ0I7SUFJdEQsUUFBUSxDQUFDLFNBQW1DLEVBQUUsRUFBRSxJQUF1Qzs7WUFDM0YsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDVCxJQUFJLEdBQUcseUJBQXlCLENBQUM7YUFDbEM7WUFDRCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBRSxFQUFFLENBQUM7UUFDbkQsQ0FBQztLQUFBO0NBQ0Y7QUFFRCxNQUFNLE9BQU8sOEJBQStCLFNBQVEsd0JBQXdCO0lBSXBFLGlCQUFpQixDQUFDLFFBQWdCOztZQUN0QyxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDOUQsSUFBSSxNQUFNLEVBQUU7Z0JBQ1YsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDbEI7UUFDSCxDQUFDO0tBQUE7SUFFSyxRQUFRLENBQUMsU0FBeUMsRUFBRTs7Ozs7WUFDeEQsT0FBTyxPQUFNLFFBQVEsWUFBQyxNQUFNLEVBQUUseUJBQXlCLEVBQUU7UUFDM0QsQ0FBQztLQUFBOztBQVpELHFFQUFxRTtBQUM5RCwyQ0FBWSxHQUFHLGlHQUFpRyxDQUFDO0FBYzFILE1BQU0sT0FBTyxzQkFBdUIsU0FBUSx3QkFBd0I7SUFJbEU7Ozs7T0FJRztJQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBeUMsRUFBRTtRQUNyRCxPQUFPLG1CQUFtQixDQUFDLHNCQUFzQixFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFSyxXQUFXOztZQUNmLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBRSxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUUsQ0FBQztZQUMzRSxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QixDQUFDO0tBQUE7SUFFSyxjQUFjOztZQUNsQixPQUFPLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBRSxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUUsQ0FBQztRQUN4RSxDQUFDO0tBQUE7SUFFSyxRQUFRLENBQUMsU0FBaUMsRUFBRTs7Ozs7WUFDaEQsT0FBTyxPQUFNLFFBQVEsWUFBQyxNQUFNLEVBQUUsdUJBQXVCLEVBQUU7UUFDekQsQ0FBQztLQUFBOztBQXZCRCxxRUFBcUU7QUFDOUQsbUNBQVksR0FBRyw2QkFBNkIsQ0FBQztBQXlCdEQsTUFBTSxVQUFVLG1CQUFtQixDQUFtQyxJQUFvQyxFQUMzQyxPQUFzQztJQUNuRyxtREFBbUQ7SUFDbkQsTUFBTSxTQUFTLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFFdEQsU0FBUztTQUNOLFNBQVMsQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLFFBQVEsRUFDbkMsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxDQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxLQUFLLFFBQVEsQ0FBQyxDQUFDO1NBQ3JGLFNBQVMsQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLFdBQVcsRUFDekMsQ0FBQyxPQUFPLEVBQUUsV0FBVyxFQUFFLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFFdkcsT0FBTyxTQUFTLENBQUM7QUFDbkIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudEhhcm5lc3MsIENvbXBvbmVudEhhcm5lc3NDb25zdHJ1Y3RvciwgSGFybmVzc1ByZWRpY2F0ZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay90ZXN0aW5nJztcbmltcG9ydCB7IENvbHVtbkNlbGxIYXJuZXNzRmlsdGVycywgRGF0YUNlbGxIYXJuZXNzRmlsdGVycywgQ29sdW1uSGVhZGVyQ2VsbEhhcm5lc3NGaWx0ZXJzLCBQYmxOZ3JpZERhdGFSb3dIYXJuZXNzRmlsdGVycyB9IGZyb20gJy4uL25ncmlkLWhhcm5lc3MtZmlsdGVycyc7XG5pbXBvcnQgeyBQYmxOZ3JpZENvbHVtbkNlbGxIYXJuZXNzLCBQYmxOZ3JpZERhdGFDZWxsSGFybmVzcywgUGJsTmdyaWRDb2x1bW5IZWFkZXJDZWxsSGFybmVzcyB9IGZyb20gJy4uL2NlbGwvbmdyaWQtY29sdW1uLWNlbGwtaGFybmVzcyc7XG5cbi8qKlxuICogSGFybmVzcyBmb3IgaW50ZXJhY3Rpbmcgd2l0aCByb3dzIHRoYXQgYXJlIHN0cnVjdHVyZWQgYmFzZWQgb24gYSBjb2x1bW5cbiAqL1xuZXhwb3J0IGNsYXNzIFBibE5ncmlkQ29sdW1uUm93SGFybmVzcyBleHRlbmRzIENvbXBvbmVudEhhcm5lc3Mge1xuICBhc3luYyBnZXRDZWxscyhmaWx0ZXI6IENvbHVtbkhlYWRlckNlbGxIYXJuZXNzRmlsdGVycywgdHlwZTogdHlwZW9mIFBibE5ncmlkQ29sdW1uSGVhZGVyQ2VsbEhhcm5lc3MpOiBQcm9taXNlPFBibE5ncmlkQ29sdW1uSGVhZGVyQ2VsbEhhcm5lc3NbXT5cbiAgYXN5bmMgZ2V0Q2VsbHMoZmlsdGVyOiBEYXRhQ2VsbEhhcm5lc3NGaWx0ZXJzLCB0eXBlOiB0eXBlb2YgUGJsTmdyaWREYXRhQ2VsbEhhcm5lc3MpOiBQcm9taXNlPFBibE5ncmlkRGF0YUNlbGxIYXJuZXNzW10+XG4gIGFzeW5jIGdldENlbGxzKGZpbHRlcjogQ29sdW1uQ2VsbEhhcm5lc3NGaWx0ZXJzKTogUHJvbWlzZTxQYmxOZ3JpZENvbHVtbkNlbGxIYXJuZXNzW10+O1xuICBhc3luYyBnZXRDZWxscyhmaWx0ZXI6IENvbHVtbkNlbGxIYXJuZXNzRmlsdGVycyA9IHt9LCB0eXBlPzogdHlwZW9mIFBibE5ncmlkQ29sdW1uQ2VsbEhhcm5lc3MpOiBQcm9taXNlPFBibE5ncmlkQ29sdW1uQ2VsbEhhcm5lc3NbXT4ge1xuICAgIGlmICghdHlwZSkge1xuICAgICAgdHlwZSA9IFBibE5ncmlkQ29sdW1uQ2VsbEhhcm5lc3M7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmxvY2F0b3JGb3JBbGwoIHR5cGUud2l0aChmaWx0ZXIpICkoKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRDb2x1bW5IZWFkZXJSb3dIYXJuZXNzIGV4dGVuZHMgUGJsTmdyaWRDb2x1bW5Sb3dIYXJuZXNzIHtcbiAgLy8gVE9ETzogYmV0dGVyIGRldGVjdGlvbiBoZXJlLCBub3QgcmVsYXkgb24gY2xhc3MgdGhhdCBtaWdodCBjaGFuZ2UuXG4gIHN0YXRpYyBob3N0U2VsZWN0b3IgPSBgZGl2W3BibC1uZ3JpZC1maXhlZC1tZXRhLXJvdy1jb250YWluZXI9XCJoZWFkZXJcIl0gcGJsLW5ncmlkLWNvbHVtbi1yb3cucGJsLW5ncmlkLWhlYWRlci1yb3ctbWFpbmA7XG5cbiAgYXN5bmMgZ2V0Q2VsbEJ5Q29sdW1uSWQoY29sdW1uSWQ6IHN0cmluZyk6IFByb21pc2U8UGJsTmdyaWRDb2x1bW5DZWxsSGFybmVzcz4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuZ2V0Q2VsbHMoeyBjb2x1bW5JZHM6IFtjb2x1bW5JZF0gfSk7XG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgcmV0dXJuIHJlc3VsdFswXTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBnZXRDZWxscyhmaWx0ZXI6IENvbHVtbkhlYWRlckNlbGxIYXJuZXNzRmlsdGVycyA9IHt9KSB7XG4gICAgcmV0dXJuIHN1cGVyLmdldENlbGxzKGZpbHRlciwgUGJsTmdyaWRDb2x1bW5DZWxsSGFybmVzcyk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFBibE5ncmlkRGF0YVJvd0hhcm5lc3MgZXh0ZW5kcyBQYmxOZ3JpZENvbHVtblJvd0hhcm5lc3Mge1xuICAvLyBUT0RPOiBiZXR0ZXIgZGV0ZWN0aW9uIGhlcmUsIG5vdCByZWxheSBvbiBjbGFzcyB0aGF0IG1pZ2h0IGNoYW5nZS5cbiAgc3RhdGljIGhvc3RTZWxlY3RvciA9IGBwYmwtY2RrLXRhYmxlIHBibC1uZ3JpZC1yb3dgO1xuXG4gIC8qKlxuICAgKiBHZXRzIGEgYEhhcm5lc3NQcmVkaWNhdGVgIHRoYXQgY2FuIGJlIHVzZWQgdG8gc2VhcmNoIGZvciBhIG5HcmlkIGRhdGEgcm93IHdpdGggc3BlY2lmaWMgYXR0cmlidXRlcy5cbiAgICogQHBhcmFtIG9wdGlvbnMgT3B0aW9ucyBmb3IgbmFycm93aW5nIHRoZSBzZWFyY2hcbiAgICogQHJldHVybiBhIGBIYXJuZXNzUHJlZGljYXRlYCBjb25maWd1cmVkIHdpdGggdGhlIGdpdmVuIG9wdGlvbnMuXG4gICAqL1xuICBzdGF0aWMgd2l0aChvcHRpb25zOiBQYmxOZ3JpZERhdGFSb3dIYXJuZXNzRmlsdGVycyA9IHt9KTogSGFybmVzc1ByZWRpY2F0ZTxQYmxOZ3JpZERhdGFSb3dIYXJuZXNzPiB7XG4gICAgcmV0dXJuIGdldERhdGFSb3dQcmVkaWNhdGUoUGJsTmdyaWREYXRhUm93SGFybmVzcywgb3B0aW9ucyk7XG4gIH1cblxuICBhc3luYyBnZXRSb3dJbmRleCgpOiBQcm9taXNlPG51bWJlciB8IHVuZGVmaW5lZD4ge1xuICAgIGNvbnN0IGF0dHIgPSBhd2FpdCB0aGlzLmhvc3QoKS50aGVuKCBob3N0ID0+IGhvc3QuZ2V0QXR0cmlidXRlKCdyb3ctaWQnKSApO1xuICAgIHJldHVybiBOdW1iZXIoYXR0cik7XG4gIH1cblxuICBhc3luYyBnZXRSb3dJZGVudGl0eSgpOiBQcm9taXNlPHN0cmluZyB8IHVuZGVmaW5lZD4ge1xuICAgIHJldHVybiBhd2FpdCB0aGlzLmhvc3QoKS50aGVuKCBob3N0ID0+IGhvc3QuZ2V0QXR0cmlidXRlKCdyb3cta2V5JykgKTtcbiAgfVxuXG4gIGFzeW5jIGdldENlbGxzKGZpbHRlcjogRGF0YUNlbGxIYXJuZXNzRmlsdGVycyA9IHt9KSB7XG4gICAgcmV0dXJuIHN1cGVyLmdldENlbGxzKGZpbHRlciwgUGJsTmdyaWREYXRhQ2VsbEhhcm5lc3MpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREYXRhUm93UHJlZGljYXRlPFQgZXh0ZW5kcyBQYmxOZ3JpZERhdGFSb3dIYXJuZXNzPih0eXBlOiBDb21wb25lbnRIYXJuZXNzQ29uc3RydWN0b3I8VD4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBQYmxOZ3JpZERhdGFSb3dIYXJuZXNzRmlsdGVycyk6IEhhcm5lc3NQcmVkaWNhdGU8VD4ge1xuICAvLyBXZSBjYW4ndCB1c2UgRmx1ZW50QXBpIGhlcmUgYmVjYXVzZSBuZ2Mgd2lsbCBjcnlcbiAgY29uc3QgcHJlZGljYXRlID0gbmV3IEhhcm5lc3NQcmVkaWNhdGUodHlwZSwgb3B0aW9ucyk7XG5cbiAgcHJlZGljYXRlXG4gICAgLmFkZE9wdGlvbigncm93SW5kZXgnLCBvcHRpb25zLnJvd0luZGV4LFxuICAgICAgICAoaGFybmVzcywgcm93SW5kZXgpID0+IGhhcm5lc3MuZ2V0Um93SW5kZXgoKS50aGVuKCByZXN1bHQgPT4gcmVzdWx0ID09PSByb3dJbmRleCkpXG4gICAgLmFkZE9wdGlvbigncm93SWRlbnRpdHknLCBvcHRpb25zLnJvd0lkZW50aXR5LFxuICAgICAgICAoaGFybmVzcywgcm93SWRlbnRpdHkpID0+IEhhcm5lc3NQcmVkaWNhdGUuc3RyaW5nTWF0Y2hlcyhoYXJuZXNzLmdldFJvd0lkZW50aXR5KCksIHJvd0lkZW50aXR5KSk7XG5cbiAgcmV0dXJuIHByZWRpY2F0ZTtcbn1cbiJdfQ==