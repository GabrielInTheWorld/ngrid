import { __awaiter } from "tslib";
import { ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';
import { findHostClassMatch } from '../utils';
const CLASS_COLUMN_RE = /^cdk-column-(.+)$/;
/**
 * Harness for interacting with cells that belong to a column.
 * This can be a column header cell, data cell or a column footer cell
 */
export class PblNgridColumnCellHarness extends ComponentHarness {
    static with(options = {}) {
        return getColumnCellPredicate(PblNgridColumnCellHarness, options);
    }
    getText() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.host()).text();
        });
    }
    getColumnId() {
        return __awaiter(this, void 0, void 0, function* () {
            const match = yield findHostClassMatch(yield this.host(), CLASS_COLUMN_RE);
            if (match) {
                return match[1];
            }
            throw Error('Could not determine column name of cell.');
        });
    }
}
PblNgridColumnCellHarness.hostSelector = `pbl-ngrid-header-cell, pbl-ngrid-cell`;
export class PblNgridColumnHeaderCellHarness extends PblNgridColumnCellHarness {
    static with(options = {}) {
        return getColumnCellPredicate(PblNgridColumnHeaderCellHarness, options);
    }
}
// TODO: better detection here, not relay on class that might change.
PblNgridColumnHeaderCellHarness.hostSelector = `pbl-ngrid-header-cell`;
export class PblNgridDataCellHarness extends PblNgridColumnCellHarness {
    static with(options = {}) {
        return getColumnCellPredicate(PblNgridDataCellHarness, options);
    }
}
// TODO: better detection here, not relay on class that might change.
PblNgridDataCellHarness.hostSelector = `pbl-ngrid-cell`;
export function getColumnCellPredicate(type, options) {
    // We can't use FluentApi here because ngc will cry
    const predicate = new HarnessPredicate(type, options);
    predicate.addOption('columnIds', options.columnIds, (harness, columnIds) => harness.getColumnId().then(columnId => columnIds.indexOf(columnId) !== -1));
    return predicate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdyaWQtY29sdW1uLWNlbGwtaGFybmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmdyaWQvdGVzdGluZy9zcmMvbGliL2NlbGwvbmdyaWQtY29sdW1uLWNlbGwtaGFybmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLGdCQUFnQixFQUErQixnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXZHLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUU5QyxNQUFNLGVBQWUsR0FBRyxtQkFBbUIsQ0FBQztBQUU1Qzs7O0dBR0c7QUFDSCxNQUFNLE9BQU8seUJBQTBCLFNBQVEsZ0JBQWdCO0lBRzdELE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBb0MsRUFBRTtRQUNoRCxPQUFPLHNCQUFzQixDQUFDLHlCQUF5QixFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFSyxPQUFPOztZQUNYLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3BDLENBQUM7S0FBQTtJQUVLLFdBQVc7O1lBQ2YsTUFBTSxLQUFLLEdBQUcsTUFBTSxrQkFBa0IsQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxlQUFlLENBQUMsQ0FBQztZQUMzRSxJQUFJLEtBQUssRUFBRTtnQkFDVCxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNqQjtZQUVELE1BQU0sS0FBSyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7UUFDMUQsQ0FBQztLQUFBOztBQWpCTSxzQ0FBWSxHQUFHLHVDQUF1QyxDQUFDO0FBcUJoRSxNQUFNLE9BQU8sK0JBQWdDLFNBQVEseUJBQXlCO0lBSTVFLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBMEMsRUFBRTtRQUN0RCxPQUFPLHNCQUFzQixDQUFDLCtCQUErQixFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzFFLENBQUM7O0FBTEQscUVBQXFFO0FBQzlELDRDQUFZLEdBQUcsdUJBQXVCLENBQUM7QUFPaEQsTUFBTSxPQUFPLHVCQUF3QixTQUFRLHlCQUF5QjtJQUlwRSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQWtDLEVBQUU7UUFDOUMsT0FBTyxzQkFBc0IsQ0FBQyx1QkFBdUIsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNsRSxDQUFDOztBQUxELHFFQUFxRTtBQUM5RCxvQ0FBWSxHQUFHLGdCQUFnQixDQUFDO0FBT3pDLE1BQU0sVUFBVSxzQkFBc0IsQ0FBc0MsSUFBb0MsRUFDcEMsT0FBaUM7SUFDM0csbURBQW1EO0lBQ25ELE1BQU0sU0FBUyxHQUFHLElBQUksZ0JBQWdCLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3RELFNBQVMsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEosT0FBTyxTQUFTLENBQUM7QUFDbkIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudEhhcm5lc3MsIENvbXBvbmVudEhhcm5lc3NDb25zdHJ1Y3RvciwgSGFybmVzc1ByZWRpY2F0ZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay90ZXN0aW5nJztcbmltcG9ydCB7IENvbHVtbkNlbGxIYXJuZXNzRmlsdGVycywgQ29sdW1uSGVhZGVyQ2VsbEhhcm5lc3NGaWx0ZXJzLCBEYXRhQ2VsbEhhcm5lc3NGaWx0ZXJzIH0gZnJvbSAnLi4vbmdyaWQtaGFybmVzcy1maWx0ZXJzJztcbmltcG9ydCB7IGZpbmRIb3N0Q2xhc3NNYXRjaCB9IGZyb20gJy4uL3V0aWxzJztcblxuY29uc3QgQ0xBU1NfQ09MVU1OX1JFID0gL15jZGstY29sdW1uLSguKykkLztcblxuLyoqXG4gKiBIYXJuZXNzIGZvciBpbnRlcmFjdGluZyB3aXRoIGNlbGxzIHRoYXQgYmVsb25nIHRvIGEgY29sdW1uLlxuICogVGhpcyBjYW4gYmUgYSBjb2x1bW4gaGVhZGVyIGNlbGwsIGRhdGEgY2VsbCBvciBhIGNvbHVtbiBmb290ZXIgY2VsbFxuICovXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRDb2x1bW5DZWxsSGFybmVzcyBleHRlbmRzIENvbXBvbmVudEhhcm5lc3Mge1xuICBzdGF0aWMgaG9zdFNlbGVjdG9yID0gYHBibC1uZ3JpZC1oZWFkZXItY2VsbCwgcGJsLW5ncmlkLWNlbGxgO1xuXG4gIHN0YXRpYyB3aXRoKG9wdGlvbnM6IENvbHVtbkNlbGxIYXJuZXNzRmlsdGVycyA9IHt9KTogSGFybmVzc1ByZWRpY2F0ZTxQYmxOZ3JpZENvbHVtbkNlbGxIYXJuZXNzPiB7XG4gICAgcmV0dXJuIGdldENvbHVtbkNlbGxQcmVkaWNhdGUoUGJsTmdyaWRDb2x1bW5DZWxsSGFybmVzcywgb3B0aW9ucyk7XG4gIH1cblxuICBhc3luYyBnZXRUZXh0KCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmhvc3QoKSkudGV4dCgpO1xuICB9XG5cbiAgYXN5bmMgZ2V0Q29sdW1uSWQoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCBtYXRjaCA9IGF3YWl0IGZpbmRIb3N0Q2xhc3NNYXRjaChhd2FpdCB0aGlzLmhvc3QoKSwgQ0xBU1NfQ09MVU1OX1JFKTtcbiAgICBpZiAobWF0Y2gpIHtcbiAgICAgIHJldHVybiBtYXRjaFsxXTtcbiAgICB9XG5cbiAgICB0aHJvdyBFcnJvcignQ291bGQgbm90IGRldGVybWluZSBjb2x1bW4gbmFtZSBvZiBjZWxsLicpO1xuICB9XG59XG5cblxuZXhwb3J0IGNsYXNzIFBibE5ncmlkQ29sdW1uSGVhZGVyQ2VsbEhhcm5lc3MgZXh0ZW5kcyBQYmxOZ3JpZENvbHVtbkNlbGxIYXJuZXNzIHtcbiAgLy8gVE9ETzogYmV0dGVyIGRldGVjdGlvbiBoZXJlLCBub3QgcmVsYXkgb24gY2xhc3MgdGhhdCBtaWdodCBjaGFuZ2UuXG4gIHN0YXRpYyBob3N0U2VsZWN0b3IgPSBgcGJsLW5ncmlkLWhlYWRlci1jZWxsYDtcblxuICBzdGF0aWMgd2l0aChvcHRpb25zOiBDb2x1bW5IZWFkZXJDZWxsSGFybmVzc0ZpbHRlcnMgPSB7fSk6IEhhcm5lc3NQcmVkaWNhdGU8UGJsTmdyaWRDb2x1bW5IZWFkZXJDZWxsSGFybmVzcz4ge1xuICAgIHJldHVybiBnZXRDb2x1bW5DZWxsUHJlZGljYXRlKFBibE5ncmlkQ29sdW1uSGVhZGVyQ2VsbEhhcm5lc3MsIG9wdGlvbnMpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZERhdGFDZWxsSGFybmVzcyBleHRlbmRzIFBibE5ncmlkQ29sdW1uQ2VsbEhhcm5lc3Mge1xuICAvLyBUT0RPOiBiZXR0ZXIgZGV0ZWN0aW9uIGhlcmUsIG5vdCByZWxheSBvbiBjbGFzcyB0aGF0IG1pZ2h0IGNoYW5nZS5cbiAgc3RhdGljIGhvc3RTZWxlY3RvciA9IGBwYmwtbmdyaWQtY2VsbGA7XG5cbiAgc3RhdGljIHdpdGgob3B0aW9uczogRGF0YUNlbGxIYXJuZXNzRmlsdGVycyA9IHt9KTogSGFybmVzc1ByZWRpY2F0ZTxQYmxOZ3JpZERhdGFDZWxsSGFybmVzcz4ge1xuICAgIHJldHVybiBnZXRDb2x1bW5DZWxsUHJlZGljYXRlKFBibE5ncmlkRGF0YUNlbGxIYXJuZXNzLCBvcHRpb25zKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29sdW1uQ2VsbFByZWRpY2F0ZTxUIGV4dGVuZHMgUGJsTmdyaWRDb2x1bW5DZWxsSGFybmVzcz4odHlwZTogQ29tcG9uZW50SGFybmVzc0NvbnN0cnVjdG9yPFQ+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IENvbHVtbkNlbGxIYXJuZXNzRmlsdGVycyk6IEhhcm5lc3NQcmVkaWNhdGU8VD4ge1xuICAvLyBXZSBjYW4ndCB1c2UgRmx1ZW50QXBpIGhlcmUgYmVjYXVzZSBuZ2Mgd2lsbCBjcnlcbiAgY29uc3QgcHJlZGljYXRlID0gbmV3IEhhcm5lc3NQcmVkaWNhdGUodHlwZSwgb3B0aW9ucyk7XG4gIHByZWRpY2F0ZS5hZGRPcHRpb24oJ2NvbHVtbklkcycsIG9wdGlvbnMuY29sdW1uSWRzLCAoaGFybmVzcywgY29sdW1uSWRzKSA9PiBoYXJuZXNzLmdldENvbHVtbklkKCkudGhlbihjb2x1bW5JZCA9PiBjb2x1bW5JZHMuaW5kZXhPZihjb2x1bW5JZCkgIT09IC0xKSk7XG4gIHJldHVybiBwcmVkaWNhdGU7XG59XG4iXX0=