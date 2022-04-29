import { ChangeDetectionStrategy, Component, ElementRef, Inject, Input, ViewEncapsulation, Optional, Attribute, ChangeDetectorRef, } from '@angular/core';
import { CdkHeaderRow } from '@angular/cdk/table';
import { PBL_NGRID_COMPONENT } from '../../tokens';
import { PblNgridBaseRowComponent, PBL_NGRID_BASE_ROW_TEMPLATE } from './base-row.component';
import { PblNgridMetaRowService } from '../meta-rows/meta-row.service';
import { applyMetaRowClass, initColumnOrMetaRow } from './utils';
import * as i0 from "@angular/core";
import * as i1 from "../meta-rows/meta-row.service";
export class PblNgridMetaRowComponent extends PblNgridBaseRowComponent {
    constructor(grid, cdRef, el, metaRows, isFooter) {
        super(grid, cdRef, el);
        this.metaRows = metaRows;
        this.gridWidthRow = false;
        this.isFooter = isFooter !== null;
        this.rowType = this.isFooter ? 'meta-footer' : 'meta-header';
    }
    get row() { return this._row; }
    set row(value) { this.updateRow(value); }
    get rowIndex() { return this._row.rowDef.rowIndex; }
    get meta() { return this._meta; }
    set meta(value) { this._meta = value; } // TODO: remove when removing pblMetaRow
    ngOnInit() {
        super.ngOnInit();
        this.handleVisibility();
    }
    ngOnDestroy() {
        this.metaRows.removeMetaRow(this);
        super.ngOnDestroy();
    }
    onCtor() { }
    detectChanges() {
        for (const cell of this._cells) {
            // TODO: the cells are created through code which mean's that they don't belong
            // to the CD tree and we need to manually mark them for checking
            // We can customize the diffing, detect context changes internally and only trigger these cells which have changed!
            cell.changeDetectorRef.markForCheck();
        }
    }
    cellCreated(column, cell) {
        cell.instance.setColumn(column, this.isFooter);
    }
    cellDestroyed(cell, previousIndex) {
    }
    cellMoved(previousItem, currentItem, previousIndex, currentIndex) {
    }
    updateRow(value) {
        var _a;
        if (value !== this._row) {
            applyMetaRowClass(this.metaRows, this, this.element, this._meta, value === null || value === void 0 ? void 0 : value.rowDef);
            if ((_a = this._row) === null || _a === void 0 ? void 0 : _a.isGroup) {
                this.element.classList.remove('pbl-meta-group-row');
            }
            if (value === null || value === void 0 ? void 0 : value.isGroup) {
                this.element.classList.add('pbl-meta-group-row');
            }
            this._row = value;
        }
    }
    handleVisibility() {
        initColumnOrMetaRow(this.element, this.isFooter);
        // TODO: add row visibility API like in columns and react to changes
        // - Remove showHeader showFooter inputs and move them to directives and inside let them use the API
    }
}
/** @nocollapse */ PblNgridMetaRowComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridMetaRowComponent, deps: [{ token: PBL_NGRID_COMPONENT, optional: true }, { token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i1.PblNgridMetaRowService }, { token: 'footer', attribute: true }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ PblNgridMetaRowComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridMetaRowComponent, selector: "pbl-ngrid-meta-row", inputs: { row: "row" }, host: { attributes: { "role": "row" } }, providers: [
        { provide: CdkHeaderRow, useExisting: PblNgridMetaRowComponent }
    ], usesInheritance: true, ngImport: i0, template: "<ng-container #viewRef></ng-container>", isInline: true, changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridMetaRowComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'pbl-ngrid-meta-row',
                    template: PBL_NGRID_BASE_ROW_TEMPLATE,
                    // tslint:disable-next-line: no-host-metadata-property
                    host: {
                        'role': 'row',
                    },
                    providers: [
                        { provide: CdkHeaderRow, useExisting: PblNgridMetaRowComponent }
                    ],
                    changeDetection: ChangeDetectionStrategy.Default,
                    encapsulation: ViewEncapsulation.None,
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [PBL_NGRID_COMPONENT]
                }, {
                    type: Optional
                }] }, { type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i1.PblNgridMetaRowService }, { type: undefined, decorators: [{
                    type: Attribute,
                    args: ['footer']
                }] }]; }, propDecorators: { row: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1yb3cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3JpZC9zcmMvbGliL2dyaWQvcm93L21ldGEtcm93LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsTUFBTSxFQUNOLEtBQUssRUFDTCxpQkFBaUIsRUFDakIsUUFBUSxFQUNSLFNBQVMsRUFFVCxpQkFBaUIsR0FHbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBR2xELE9BQU8sRUFBc0IsbUJBQW1CLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFdkUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLDJCQUEyQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFN0YsT0FBTyxFQUFFLHNCQUFzQixFQUFjLE1BQU0sK0JBQStCLENBQUM7QUFFbkYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLG1CQUFtQixFQUFFLE1BQU0sU0FBUyxDQUFDOzs7QUFlakUsTUFBTSxPQUFPLHdCQUF5QixTQUFRLHdCQUF1RDtJQWlCbkcsWUFBcUQsSUFBd0IsRUFDakUsS0FBd0IsRUFDdkIsRUFBMkIsRUFDWCxRQUFnQyxFQUM1QixRQUFhO1FBQzVDLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRkksYUFBUSxHQUFSLFFBQVEsQ0FBd0I7UUFQcEQsaUJBQVksR0FBWSxLQUFLLENBQUM7UUFVckMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLEtBQUssSUFBSSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUM7SUFDL0QsQ0FBQztJQXZCRCxJQUFJ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LEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLDBCQUEwQixFQUFFO3FCQUNqRTtvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsT0FBTztvQkFDaEQsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7aUJBQ3RDOzswQkFrQmMsTUFBTTsyQkFBQyxtQkFBbUI7OzBCQUFHLFFBQVE7OzBCQUlyQyxTQUFTOzJCQUFDLFFBQVE7NENBbEJsQixHQUFHO3NCQUFmLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgT3B0aW9uYWwsXG4gIEF0dHJpYnV0ZSxcbiAgQ29tcG9uZW50UmVmLFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgT25Jbml0LFxuICBPbkRlc3Ryb3ksXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2RrSGVhZGVyUm93IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcbmltcG9ydCB7IFBibE1ldGFSb3dEZWZpbml0aW9ucyB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQvY29yZSc7XG5cbmltcG9ydCB7IF9QYmxOZ3JpZENvbXBvbmVudCwgUEJMX05HUklEX0NPTVBPTkVOVCB9IGZyb20gJy4uLy4uL3Rva2Vucyc7XG5pbXBvcnQgeyBQYmxOZ3JpZE1ldGFDZWxsQ29tcG9uZW50IH0gZnJvbSAnLi4vY2VsbC9tZXRhLWNlbGwuY29tcG9uZW50JztcbmltcG9ydCB7IFBibE5ncmlkQmFzZVJvd0NvbXBvbmVudCwgUEJMX05HUklEX0JBU0VfUk9XX1RFTVBMQVRFIH0gZnJvbSAnLi9iYXNlLXJvdy5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGJsQ29sdW1uR3JvdXAsIFBibE1ldGFDb2x1bW4gfSBmcm9tICcuLi9jb2x1bW4vbW9kZWwnO1xuaW1wb3J0IHsgUGJsTmdyaWRNZXRhUm93U2VydmljZSwgUGJsTWV0YVJvdyB9IGZyb20gJy4uL21ldGEtcm93cy9tZXRhLXJvdy5zZXJ2aWNlJztcbmltcG9ydCB7IFBibENvbHVtblN0b3JlTWV0YVJvdyB9IGZyb20gJy4uL2NvbHVtbi9tYW5hZ2VtZW50JztcbmltcG9ydCB7IGFwcGx5TWV0YVJvd0NsYXNzLCBpbml0Q29sdW1uT3JNZXRhUm93IH0gZnJvbSAnLi91dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3BibC1uZ3JpZC1tZXRhLXJvdycsXG4gIHRlbXBsYXRlOiBQQkxfTkdSSURfQkFTRV9ST1dfVEVNUExBVEUsXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8taG9zdC1tZXRhZGF0YS1wcm9wZXJ0eVxuICBob3N0OiB7XG4gICAgJ3JvbGUnOiAncm93JyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgeyBwcm92aWRlOiBDZGtIZWFkZXJSb3csIHVzZUV4aXN0aW5nOiBQYmxOZ3JpZE1ldGFSb3dDb21wb25lbnQgfVxuICBdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHQsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkTWV0YVJvd0NvbXBvbmVudCBleHRlbmRzIFBibE5ncmlkQmFzZVJvd0NvbXBvbmVudDwnbWV0YS1oZWFkZXInIHwgJ21ldGEtZm9vdGVyJz4gaW1wbGVtZW50cyBQYmxNZXRhUm93LCBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgZ2V0IHJvdygpIHsgcmV0dXJuIHRoaXMuX3JvdzsgfVxuICBASW5wdXQoKSBzZXQgcm93KHZhbHVlOiBQYmxDb2x1bW5TdG9yZU1ldGFSb3cpIHsgdGhpcy51cGRhdGVSb3codmFsdWUpOyB9XG5cbiAgZ2V0IHJvd0luZGV4KCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9yb3cucm93RGVmLnJvd0luZGV4OyB9XG5cbiAgZ2V0IG1ldGEoKTogUGJsTWV0YVJvd0RlZmluaXRpb25zIHsgcmV0dXJuIHRoaXMuX21ldGE7IH1cbiAgc2V0IG1ldGEodmFsdWU6IFBibE1ldGFSb3dEZWZpbml0aW9ucykgeyB0aGlzLl9tZXRhID0gdmFsdWU7IH0gLy8gVE9ETzogcmVtb3ZlIHdoZW4gcmVtb3ZpbmcgcGJsTWV0YVJvd1xuXG4gIHJlYWRvbmx5IHJvd1R5cGU6ICdtZXRhLWhlYWRlcicgfCAnbWV0YS1mb290ZXInO1xuICByZWFkb25seSBlbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgcmVhZG9ubHkgaXNGb290ZXI6IGJvb2xlYW47XG4gIHJlYWRvbmx5IGdyaWRXaWR0aFJvdzogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIF9tZXRhOiBQYmxNZXRhUm93RGVmaW5pdGlvbnM7XG4gIHByaXZhdGUgX3JvdzogUGJsQ29sdW1uU3RvcmVNZXRhUm93O1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoUEJMX05HUklEX0NPTVBPTkVOVCkgQE9wdGlvbmFsKCkgZ3JpZDogX1BibE5ncmlkQ29tcG9uZW50LFxuICAgICAgICAgICAgICBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgICAgICAgICBlbDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgICAgICAgIHByaXZhdGUgcmVhZG9ubHkgbWV0YVJvd3M6IFBibE5ncmlkTWV0YVJvd1NlcnZpY2UsXG4gICAgICAgICAgICAgIEBBdHRyaWJ1dGUoJ2Zvb3RlcicpIGlzRm9vdGVyOiBhbnkpIHtcbiAgICBzdXBlcihncmlkLCBjZFJlZiwgZWwpO1xuICAgIHRoaXMuaXNGb290ZXIgPSBpc0Zvb3RlciAhPT0gbnVsbDtcbiAgICB0aGlzLnJvd1R5cGUgPSB0aGlzLmlzRm9vdGVyID8gJ21ldGEtZm9vdGVyJyA6ICdtZXRhLWhlYWRlcic7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBzdXBlci5uZ09uSW5pdCgpO1xuICAgIHRoaXMuaGFuZGxlVmlzaWJpbGl0eSgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5tZXRhUm93cy5yZW1vdmVNZXRhUm93KHRoaXMpO1xuICAgIHN1cGVyLm5nT25EZXN0cm95KCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgb25DdG9yKCkgeyB9XG5cbiAgcHJvdGVjdGVkIGRldGVjdENoYW5nZXMoKSB7XG4gICAgZm9yIChjb25zdCBjZWxsIG9mIHRoaXMuX2NlbGxzKSB7XG4gICAgICAvLyBUT0RPOiB0aGUgY2VsbHMgYXJlIGNyZWF0ZWQgdGhyb3VnaCBjb2RlIHdoaWNoIG1lYW4ncyB0aGF0IHRoZXkgZG9uJ3QgYmVsb25nXG4gICAgICAvLyB0byB0aGUgQ0QgdHJlZSBhbmQgd2UgbmVlZCB0byBtYW51YWxseSBtYXJrIHRoZW0gZm9yIGNoZWNraW5nXG4gICAgICAvLyBXZSBjYW4gY3VzdG9taXplIHRoZSBkaWZmaW5nLCBkZXRlY3QgY29udGV4dCBjaGFuZ2VzIGludGVybmFsbHkgYW5kIG9ubHkgdHJpZ2dlciB0aGVzZSBjZWxscyB3aGljaCBoYXZlIGNoYW5nZWQhXG4gICAgICBjZWxsLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBjZWxsQ3JlYXRlZChjb2x1bW46IFBibE1ldGFDb2x1bW4gfCBQYmxDb2x1bW5Hcm91cCwgY2VsbDogQ29tcG9uZW50UmVmPFBibE5ncmlkTWV0YUNlbGxDb21wb25lbnQ+KSB7XG4gICAgY2VsbC5pbnN0YW5jZS5zZXRDb2x1bW4oY29sdW1uLCB0aGlzLmlzRm9vdGVyKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBjZWxsRGVzdHJveWVkPyhjZWxsOiBDb21wb25lbnRSZWY8UGJsTmdyaWRNZXRhQ2VsbENvbXBvbmVudD4sIHByZXZpb3VzSW5kZXg6IG51bWJlcikge1xuXG4gIH1cblxuICBwcm90ZWN0ZWQgY2VsbE1vdmVkPyhwcmV2aW91c0l0ZW06IENvbXBvbmVudFJlZjxQYmxOZ3JpZE1ldGFDZWxsQ29tcG9uZW50PiwgY3VycmVudEl0ZW06IENvbXBvbmVudFJlZjxQYmxOZ3JpZE1ldGFDZWxsQ29tcG9uZW50PiwgcHJldmlvdXNJbmRleDogbnVtYmVyLCBjdXJyZW50SW5kZXg6IG51bWJlcikge1xuXG4gIH1cblxuICBwcm90ZWN0ZWQgdXBkYXRlUm93KHZhbHVlOiBQYmxDb2x1bW5TdG9yZU1ldGFSb3cpIHtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuX3Jvdykge1xuICAgICAgYXBwbHlNZXRhUm93Q2xhc3ModGhpcy5tZXRhUm93cywgdGhpcywgdGhpcy5lbGVtZW50LCB0aGlzLl9tZXRhLCB2YWx1ZT8ucm93RGVmKTtcbiAgICAgIGlmICh0aGlzLl9yb3c/LmlzR3JvdXApIHtcbiAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3BibC1tZXRhLWdyb3VwLXJvdycpO1xuICAgICAgfVxuICAgICAgaWYgKHZhbHVlPy5pc0dyb3VwKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdwYmwtbWV0YS1ncm91cC1yb3cnKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3JvdyA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlVmlzaWJpbGl0eSgpIHtcbiAgICBpbml0Q29sdW1uT3JNZXRhUm93KHRoaXMuZWxlbWVudCwgdGhpcy5pc0Zvb3Rlcik7XG4gICAgLy8gVE9ETzogYWRkIHJvdyB2aXNpYmlsaXR5IEFQSSBsaWtlIGluIGNvbHVtbnMgYW5kIHJlYWN0IHRvIGNoYW5nZXNcbiAgICAvLyAtIFJlbW92ZSBzaG93SGVhZGVyIHNob3dGb290ZXIgaW5wdXRzIGFuZCBtb3ZlIHRoZW0gdG8gZGlyZWN0aXZlcyBhbmQgaW5zaWRlIGxldCB0aGVtIHVzZSB0aGUgQVBJXG4gIH1cbn1cbiJdfQ==