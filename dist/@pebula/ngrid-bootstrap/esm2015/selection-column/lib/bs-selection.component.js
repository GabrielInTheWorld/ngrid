import { Component, Input, ViewChild, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { unrx } from '@pebula/ngrid/core';
import { PblNgridComponent, PblNgridHeaderCellDefDirective, PblNgridCellDefDirective, PblNgridFooterCellDefDirective, PblNgridPluginController, } from '@pebula/ngrid';
import * as i0 from "@angular/core";
import * as i1 from "@pebula/ngrid";
import * as i2 from "@angular/common";
const ALWAYS_FALSE_FN = () => false;
export class PblNgridBsSelectionComponent {
    constructor(table, cdr) {
        this.table = table;
        this.cdr = cdr;
        this.allSelected = false;
        this._isCheckboxDisabled = ALWAYS_FALSE_FN;
        const pluginCtrl = PblNgridPluginController.find(table);
        pluginCtrl.events
            .pipe(unrx(this))
            .subscribe(e => {
            if (e.kind === 'onDataSource') {
                this.selection = e.curr.selection;
            }
        });
    }
    /**
     * Defines the behavior when clicking on the bulk select checkbox (header).
     * There are 2 options:
     *
     * - all: Will select all items in the current collection
     * - view: Will select only the rendered items in the view
     *
     * The default value is `all`
     */
    get bulkSelectMode() { return this._bulkSelectMode; }
    set bulkSelectMode(value) {
        if (value !== this._bulkSelectMode) {
            this._bulkSelectMode = value;
            this.setupSelection();
        }
    }
    /**
     * A Custom selection model, optional.
     * If not set, the selection model from the DataSource is used.
     */
    get selection() {
        return this._selection;
    }
    set selection(value) {
        if (value !== this._selection) {
            this._selection = value;
            this.setupSelection();
        }
    }
    get isCheckboxDisabled() { return this._isCheckboxDisabled; }
    set isCheckboxDisabled(value) {
        if (value !== this._isCheckboxDisabled) {
            this._isCheckboxDisabled = value;
            if (!this._isCheckboxDisabled || typeof this._isCheckboxDisabled !== 'function') {
                this._isCheckboxDisabled = ALWAYS_FALSE_FN;
            }
        }
    }
    get selectionClass() { return this._selectionClass; }
    set selectionClass(value) {
        if (value !== this._selectionClass) {
            this._selectionClass = value;
            if (this.table.isInit) {
                this.markAndDetect();
            }
        }
    }
    ngAfterViewInit() {
        if (!this.selection && this.table.ds) {
            this.selection = this.table.ds.selection;
        }
        const registry = this.table.registry;
        registry.addMulti('headerCell', this.headerDef);
        registry.addMulti('tableCell', this.cellDef);
        registry.addMulti('footerCell', this.footerDef);
    }
    ngOnDestroy() {
        unrx.kill(this);
    }
    masterToggle() {
        if (this.allSelected) {
            this.selection.clear();
        }
        else {
            const selected = this.getCollection().filter(data => !this._isCheckboxDisabled(data));
            this.selection.select(...selected);
        }
    }
    rowItemChange(row) {
        this.selection.toggle(row);
        this.markAndDetect();
    }
    onInput(a, b) {
        console.log(a, b);
    }
    getCollection() {
        const { ds } = this.table;
        return this.bulkSelectMode === 'view' ? ds.renderedData : ds.source;
    }
    setupSelection() {
        unrx.kill(this, this.table);
        if (this._selection) {
            this.length = this.selection.selected.length;
            this.selection.changed
                .pipe(unrx(this, this.table))
                .subscribe(() => this.handleSelectionChanged());
            const changeSource = this.bulkSelectMode === 'view' ? this.table.ds.onRenderedDataChanged : this.table.ds.onSourceChanged;
            changeSource
                .pipe(unrx(this, this.table))
                .subscribe(() => this.handleSelectionChanged());
        }
        else {
            this.length = 0;
        }
    }
    handleSelectionChanged() {
        const { length } = this.getCollection().filter(data => !this._isCheckboxDisabled(data));
        this.allSelected = !this.selection.isEmpty() && this.selection.selected.length === length;
        this.length = this.selection.selected.length;
        this.markAndDetect();
    }
    markAndDetect() {
        this.cdr.markForCheck();
        this.cdr.detectChanges();
    }
}
/** @nocollapse */ PblNgridBsSelectionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridBsSelectionComponent, deps: [{ token: i1.PblNgridComponent }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ PblNgridBsSelectionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridBsSelectionComponent, selector: "pbl-ngrid-bs-checkbox", inputs: { name: "name", bulkSelectMode: "bulkSelectMode", selection: "selection", isCheckboxDisabled: "isCheckboxDisabled", selectionClass: "selectionClass" }, viewQueries: [{ propertyName: "headerDef", first: true, predicate: PblNgridHeaderCellDefDirective, descendants: true, static: true }, { propertyName: "cellDef", first: true, predicate: PblNgridCellDefDirective, descendants: true, static: true }, { propertyName: "footerDef", first: true, predicate: PblNgridFooterCellDefDirective, descendants: true, static: true }], ngImport: i0, template: "<ng-container *pblNgridHeaderCellDef=\"name; col as col;\">\n  <label *ngIf=\"bulkSelectMode !== 'none'\"\n         [class]=\"selectionClass\">\n    <input type=\"checkbox\"\n           [checked]=\"allSelected\"\n           (input)=\"masterToggle()\">\n  </label>\n</ng-container>\n\n<label *pblNgridCellDef=\"name; row as row;\">\n  <input type=\"checkbox\"\n         [class]=\"selectionClass\"\n         [checked]=\"selection.isSelected(row)\"\n         [disabled]=\"isCheckboxDisabled(row)\"\n         (input)=\"rowItemChange(row)\">\n</label>\n\n<span *pblNgridFooterCellDef=\"name; col as col;\">{{ length ? length : '' }}</span>\n", styles: [""], directives: [{ type: i1.PblNgridHeaderCellDefDirective, selector: "[pblNgridHeaderCellDef], [pblNgridHeaderCellTypeDef]", inputs: ["pblNgridHeaderCellDef", "pblNgridHeaderCellTypeDef"] }, { type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.PblNgridCellDefDirective, selector: "[pblNgridCellDef], [pblNgridCellTypeDef]", inputs: ["pblNgridCellDef", "pblNgridCellTypeDef"] }, { type: i1.PblNgridFooterCellDefDirective, selector: "[pblNgridFooterCellDef], [pblNgridFooterCellTypeDef]", inputs: ["pblNgridFooterCellDef", "pblNgridFooterCellTypeDef"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridBsSelectionComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'pbl-ngrid-bs-checkbox',
                    templateUrl: './bs-selection.component.html',
                    styleUrls: ['./bs-selection.component.scss'],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                }]
        }], ctorParameters: function () { return [{ type: i1.PblNgridComponent }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { name: [{
                type: Input
            }], bulkSelectMode: [{
                type: Input
            }], selection: [{
                type: Input
            }], isCheckboxDisabled: [{
                type: Input
            }], selectionClass: [{
                type: Input
            }], headerDef: [{
                type: ViewChild,
                args: [PblNgridHeaderCellDefDirective, { static: true }]
            }], cellDef: [{
                type: ViewChild,
                args: [PblNgridCellDefDirective, { static: true }]
            }], footerDef: [{
                type: ViewChild,
                args: [PblNgridFooterCellDefDirective, { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtc2VsZWN0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmdyaWQtYm9vdHN0cmFwL3NlbGVjdGlvbi1jb2x1bW4vc3JjL2xpYi9icy1zZWxlY3Rpb24uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3JpZC1ib290c3RyYXAvc2VsZWN0aW9uLWNvbHVtbi9zcmMvbGliL2JzLXNlbGVjdGlvbi5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQTRCLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JKLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUUxRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDMUMsT0FBTyxFQUNMLGlCQUFpQixFQUNqQiw4QkFBOEIsRUFDOUIsd0JBQXdCLEVBQ3hCLDhCQUE4QixFQUM5Qix3QkFBd0IsR0FDekIsTUFBTSxlQUFlLENBQUM7Ozs7QUFFdkIsTUFBTSxlQUFlLEdBQUcsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDO0FBU3BDLE1BQU0sT0FBTyw0QkFBNEI7SUFzRXZDLFlBQW1CLEtBQTZCLEVBQVUsR0FBc0I7UUFBN0QsVUFBSyxHQUFMLEtBQUssQ0FBd0I7UUFBVSxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQVJoRixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUtaLHdCQUFtQixHQUEwQixlQUFlLENBQUM7UUFJbkUsTUFBTSxVQUFVLEdBQUcsd0JBQXdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hELFVBQVUsQ0FBQyxNQUFNO2FBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNoQixT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QUFFLENBQUMsK0JBQStCLENBQUM7b0JBQzVDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtpQkFDdEM7d0lBT1UsSUFBSTtzQkFBWixLQUFLO2dCQVdPLGNBQWM7c0JBQTFCLEtBQUs7Z0JBV08sU0FBUztzQkFBckIsS0FBSztnQkFVTyxrQkFBa0I7c0JBQTlCLEtBQUs7Z0JBVU8sY0FBYztzQkFBMUIsS0FBSztnQkFVdUQsU0FBUztzQkFBckUsU0FBUzt1QkFBQyw4QkFBOEIsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7Z0JBQ0osT0FBTztzQkFBN0QsU0FBUzt1QkFBQyx3QkFBd0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7Z0JBQ1EsU0FBUztzQkFBckUsU0FBUzt1QkFBQyw4QkFBOEIsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBWaWV3Q2hpbGQsIFZpZXdFbmNhcHN1bGF0aW9uLCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3ksIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2VsZWN0aW9uTW9kZWwgfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xuXG5pbXBvcnQgeyB1bnJ4IH0gZnJvbSAnQHBlYnVsYS9uZ3JpZC9jb3JlJztcbmltcG9ydCB7XG4gIFBibE5ncmlkQ29tcG9uZW50LFxuICBQYmxOZ3JpZEhlYWRlckNlbGxEZWZEaXJlY3RpdmUsXG4gIFBibE5ncmlkQ2VsbERlZkRpcmVjdGl2ZSxcbiAgUGJsTmdyaWRGb290ZXJDZWxsRGVmRGlyZWN0aXZlLFxuICBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsXG59IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuXG5jb25zdCBBTFdBWVNfRkFMU0VfRk4gPSAoKSA9PiBmYWxzZTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncGJsLW5ncmlkLWJzLWNoZWNrYm94JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2JzLXNlbGVjdGlvbi5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2JzLXNlbGVjdGlvbi5jb21wb25lbnQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRCc1NlbGVjdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIC8qKlxuICAgKiBVbmlxdWUgbmFtZSBmb3IgdGhlIGNoZWNrYm94IGNvbHVtbi5cbiAgICogV2hlbiBub3Qgc2V0LCB0aGUgbmFtZSAnY2hlY2tib3gnIGlzIHVzZWQuXG4gICAqXG4gICAqKi9cbiAgQElucHV0KCkgbmFtZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBEZWZpbmVzIHRoZSBiZWhhdmlvciB3aGVuIGNsaWNraW5nIG9uIHRoZSBidWxrIHNlbGVjdCBjaGVja2JveCAoaGVhZGVyKS5cbiAgICogVGhlcmUgYXJlIDIgb3B0aW9uczpcbiAgICpcbiAgICogLSBhbGw6IFdpbGwgc2VsZWN0IGFsbCBpdGVtcyBpbiB0aGUgY3VycmVudCBjb2xsZWN0aW9uXG4gICAqIC0gdmlldzogV2lsbCBzZWxlY3Qgb25seSB0aGUgcmVuZGVyZWQgaXRlbXMgaW4gdGhlIHZpZXdcbiAgICpcbiAgICogVGhlIGRlZmF1bHQgdmFsdWUgaXMgYGFsbGBcbiAgICovXG4gIEBJbnB1dCgpIGdldCBidWxrU2VsZWN0TW9kZSgpOiAnYWxsJyB8ICd2aWV3JyB8ICdub25lJyB7IHJldHVybiB0aGlzLl9idWxrU2VsZWN0TW9kZTsgfVxuICBzZXQgYnVsa1NlbGVjdE1vZGUodmFsdWU6ICdhbGwnIHwgJ3ZpZXcnIHwgJ25vbmUnKSB7XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLl9idWxrU2VsZWN0TW9kZSkge1xuICAgICAgdGhpcy5fYnVsa1NlbGVjdE1vZGUgPSB2YWx1ZTtcbiAgICAgIHRoaXMuc2V0dXBTZWxlY3Rpb24oKTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIEEgQ3VzdG9tIHNlbGVjdGlvbiBtb2RlbCwgb3B0aW9uYWwuXG4gICAqIElmIG5vdCBzZXQsIHRoZSBzZWxlY3Rpb24gbW9kZWwgZnJvbSB0aGUgRGF0YVNvdXJjZSBpcyB1c2VkLlxuICAgKi9cbiAgQElucHV0KCkgZ2V0IHNlbGVjdGlvbigpOiBTZWxlY3Rpb25Nb2RlbDxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0aW9uO1xuICB9XG4gIHNldCBzZWxlY3Rpb24odmFsdWU6IFNlbGVjdGlvbk1vZGVsPGFueT4pIHtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuX3NlbGVjdGlvbikge1xuICAgICAgdGhpcy5fc2VsZWN0aW9uID0gdmFsdWU7XG4gICAgICB0aGlzLnNldHVwU2VsZWN0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCkgZ2V0IGlzQ2hlY2tib3hEaXNhYmxlZCgpIHsgcmV0dXJuIHRoaXMuX2lzQ2hlY2tib3hEaXNhYmxlZDsgfVxuICBzZXQgaXNDaGVja2JveERpc2FibGVkKHZhbHVlOiAocm93OiBhbnkpID0+IGJvb2xlYW4pIHtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuX2lzQ2hlY2tib3hEaXNhYmxlZCkge1xuICAgICAgdGhpcy5faXNDaGVja2JveERpc2FibGVkID0gdmFsdWU7XG4gICAgICBpZiAoIXRoaXMuX2lzQ2hlY2tib3hEaXNhYmxlZCB8fCB0eXBlb2YgdGhpcy5faXNDaGVja2JveERpc2FibGVkICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMuX2lzQ2hlY2tib3hEaXNhYmxlZCA9IEFMV0FZU19GQUxTRV9GTjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBASW5wdXQoKSBnZXQgc2VsZWN0aW9uQ2xhc3MoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX3NlbGVjdGlvbkNsYXNzOyB9XG4gIHNldCBzZWxlY3Rpb25DbGFzcyh2YWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLl9zZWxlY3Rpb25DbGFzcykge1xuICAgICAgdGhpcy5fc2VsZWN0aW9uQ2xhc3MgPSB2YWx1ZTtcbiAgICAgIGlmICh0aGlzLnRhYmxlLmlzSW5pdCkge1xuICAgICAgICB0aGlzLm1hcmtBbmREZXRlY3QoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBAVmlld0NoaWxkKFBibE5ncmlkSGVhZGVyQ2VsbERlZkRpcmVjdGl2ZSwgeyBzdGF0aWM6IHRydWUgfSkgaGVhZGVyRGVmOiBQYmxOZ3JpZEhlYWRlckNlbGxEZWZEaXJlY3RpdmU8YW55PjtcbiAgQFZpZXdDaGlsZChQYmxOZ3JpZENlbGxEZWZEaXJlY3RpdmUsIHsgc3RhdGljOiB0cnVlIH0pIGNlbGxEZWY6IFBibE5ncmlkQ2VsbERlZkRpcmVjdGl2ZTxhbnk+O1xuICBAVmlld0NoaWxkKFBibE5ncmlkRm9vdGVyQ2VsbERlZkRpcmVjdGl2ZSwgeyBzdGF0aWM6IHRydWUgfSkgZm9vdGVyRGVmOiBQYmxOZ3JpZEZvb3RlckNlbGxEZWZEaXJlY3RpdmU8YW55PjtcblxuICBhbGxTZWxlY3RlZCA9IGZhbHNlO1xuICBsZW5ndGg6IG51bWJlcjtcblxuICBwcml2YXRlIF9zZWxlY3Rpb246IFNlbGVjdGlvbk1vZGVsPGFueT47XG4gIHByaXZhdGUgX2J1bGtTZWxlY3RNb2RlOiAnYWxsJyB8ICd2aWV3JyB8ICdub25lJztcbiAgcHJpdmF0ZSBfaXNDaGVja2JveERpc2FibGVkOiAocm93OiBhbnkpID0+IGJvb2xlYW4gPSBBTFdBWVNfRkFMU0VfRk47XG4gIHByaXZhdGUgX3NlbGVjdGlvbkNsYXNzOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICBjb25zdCBwbHVnaW5DdHJsID0gUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLmZpbmQodGFibGUpO1xuICAgIHBsdWdpbkN0cmwuZXZlbnRzXG4gICAgICAucGlwZSh1bnJ4KHRoaXMpKVxuICAgICAgLnN1YnNjcmliZSggZSA9PiB7XG4gICAgICAgIGlmIChlLmtpbmQgPT09ICdvbkRhdGFTb3VyY2UnKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3Rpb24gPSBlLmN1cnIuc2VsZWN0aW9uO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5zZWxlY3Rpb24gJiYgdGhpcy50YWJsZS5kcykge1xuICAgICAgdGhpcy5zZWxlY3Rpb24gPSB0aGlzLnRhYmxlLmRzLnNlbGVjdGlvbjtcbiAgICB9XG5cbiAgICBjb25zdCByZWdpc3RyeSA9IHRoaXMudGFibGUucmVnaXN0cnk7XG4gICAgcmVnaXN0cnkuYWRkTXVsdGkoJ2hlYWRlckNlbGwnLCB0aGlzLmhlYWRlckRlZik7XG4gICAgcmVnaXN0cnkuYWRkTXVsdGkoJ3RhYmxlQ2VsbCcsIHRoaXMuY2VsbERlZik7XG4gICAgcmVnaXN0cnkuYWRkTXVsdGkoJ2Zvb3RlckNlbGwnLCB0aGlzLmZvb3RlckRlZik7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB1bnJ4LmtpbGwodGhpcyk7XG4gIH1cblxuICBtYXN0ZXJUb2dnbGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuYWxsU2VsZWN0ZWQpIHtcbiAgICAgIHRoaXMuc2VsZWN0aW9uLmNsZWFyKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5nZXRDb2xsZWN0aW9uKCkuZmlsdGVyKGRhdGEgPT4gIXRoaXMuX2lzQ2hlY2tib3hEaXNhYmxlZChkYXRhKSk7XG4gICAgICB0aGlzLnNlbGVjdGlvbi5zZWxlY3QoLi4uc2VsZWN0ZWQpO1xuICAgIH1cbiAgfVxuXG4gIHJvd0l0ZW1DaGFuZ2Uocm93OiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdGlvbi50b2dnbGUocm93KTtcbiAgICB0aGlzLm1hcmtBbmREZXRlY3QoKTtcbiAgfVxuXG4gIG9uSW5wdXQoYSxiKXtcbiAgICBjb25zb2xlLmxvZyhhLGIpXG4gIH1cbiAgcHJpdmF0ZSBnZXRDb2xsZWN0aW9uKCkge1xuICAgIGNvbnN0IHsgZHMgfSA9IHRoaXMudGFibGU7XG4gICAgcmV0dXJuIHRoaXMuYnVsa1NlbGVjdE1vZGUgPT09ICd2aWV3JyA/IGRzLnJlbmRlcmVkRGF0YSA6IGRzLnNvdXJjZTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0dXBTZWxlY3Rpb24oKTogdm9pZCB7XG4gICAgdW5yeC5raWxsKHRoaXMsIHRoaXMudGFibGUpO1xuICAgIGlmICh0aGlzLl9zZWxlY3Rpb24pIHtcbiAgICAgIHRoaXMubGVuZ3RoID0gdGhpcy5zZWxlY3Rpb24uc2VsZWN0ZWQubGVuZ3RoO1xuICAgICAgdGhpcy5zZWxlY3Rpb24uY2hhbmdlZFxuICAgICAgICAucGlwZSh1bnJ4KHRoaXMsIHRoaXMudGFibGUpKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuaGFuZGxlU2VsZWN0aW9uQ2hhbmdlZCgpKTtcbiAgICAgIGNvbnN0IGNoYW5nZVNvdXJjZSA9IHRoaXMuYnVsa1NlbGVjdE1vZGUgPT09ICd2aWV3JyA/IHRoaXMudGFibGUuZHMub25SZW5kZXJlZERhdGFDaGFuZ2VkIDogdGhpcy50YWJsZS5kcy5vblNvdXJjZUNoYW5nZWQ7XG4gICAgICBjaGFuZ2VTb3VyY2VcbiAgICAgICAgLnBpcGUodW5yeCh0aGlzLCB0aGlzLnRhYmxlKSlcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmhhbmRsZVNlbGVjdGlvbkNoYW5nZWQoKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubGVuZ3RoID0gMDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZVNlbGVjdGlvbkNoYW5nZWQoKSB7XG4gICAgY29uc3QgeyBsZW5ndGggfSA9IHRoaXMuZ2V0Q29sbGVjdGlvbigpLmZpbHRlcihkYXRhID0+ICF0aGlzLl9pc0NoZWNrYm94RGlzYWJsZWQoZGF0YSkpO1xuICAgIHRoaXMuYWxsU2VsZWN0ZWQgPSAhdGhpcy5zZWxlY3Rpb24uaXNFbXB0eSgpICYmIHRoaXMuc2VsZWN0aW9uLnNlbGVjdGVkLmxlbmd0aCA9PT0gbGVuZ3RoO1xuICAgIHRoaXMubGVuZ3RoID0gdGhpcy5zZWxlY3Rpb24uc2VsZWN0ZWQubGVuZ3RoO1xuICAgIHRoaXMubWFya0FuZERldGVjdCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBtYXJrQW5kRGV0ZWN0KCkge1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgfVxufVxuIiwiPG5nLWNvbnRhaW5lciAqcGJsTmdyaWRIZWFkZXJDZWxsRGVmPVwibmFtZTsgY29sIGFzIGNvbDtcIj5cbiAgPGxhYmVsICpuZ0lmPVwiYnVsa1NlbGVjdE1vZGUgIT09ICdub25lJ1wiXG4gICAgICAgICBbY2xhc3NdPVwic2VsZWN0aW9uQ2xhc3NcIj5cbiAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgW2NoZWNrZWRdPVwiYWxsU2VsZWN0ZWRcIlxuICAgICAgICAgICAoaW5wdXQpPVwibWFzdGVyVG9nZ2xlKClcIj5cbiAgPC9sYWJlbD5cbjwvbmctY29udGFpbmVyPlxuXG48bGFiZWwgKnBibE5ncmlkQ2VsbERlZj1cIm5hbWU7IHJvdyBhcyByb3c7XCI+XG4gIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgW2NsYXNzXT1cInNlbGVjdGlvbkNsYXNzXCJcbiAgICAgICAgIFtjaGVja2VkXT1cInNlbGVjdGlvbi5pc1NlbGVjdGVkKHJvdylcIlxuICAgICAgICAgW2Rpc2FibGVkXT1cImlzQ2hlY2tib3hEaXNhYmxlZChyb3cpXCJcbiAgICAgICAgIChpbnB1dCk9XCJyb3dJdGVtQ2hhbmdlKHJvdylcIj5cbjwvbGFiZWw+XG5cbjxzcGFuICpwYmxOZ3JpZEZvb3RlckNlbGxEZWY9XCJuYW1lOyBjb2wgYXMgY29sO1wiPnt7IGxlbmd0aCA/IGxlbmd0aCA6ICcnIH19PC9zcGFuPlxuIl19