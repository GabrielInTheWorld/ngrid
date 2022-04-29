import { Component, Input, ViewChild, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { unrx } from '@pebula/ngrid/core';
import { PblNgridComponent, PblNgridHeaderCellDefDirective, PblNgridCellDefDirective, PblNgridFooterCellDefDirective, PblNgridPluginController, } from '@pebula/ngrid';
import * as i0 from "@angular/core";
import * as i1 from "@pebula/ngrid";
import * as i2 from "@angular/material/checkbox";
import * as i3 from "@angular/common";
const ALWAYS_FALSE_FN = () => false;
export class PblNgridCheckboxComponent {
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
    get color() { return this._color; }
    set color(value) {
        if (value !== this._color) {
            this._color = value;
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
/** @nocollapse */ PblNgridCheckboxComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridCheckboxComponent, deps: [{ token: i1.PblNgridComponent }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ PblNgridCheckboxComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridCheckboxComponent, selector: "pbl-ngrid-checkbox", inputs: { name: "name", bulkSelectMode: "bulkSelectMode", selection: "selection", isCheckboxDisabled: "isCheckboxDisabled", color: "color" }, viewQueries: [{ propertyName: "headerDef", first: true, predicate: PblNgridHeaderCellDefDirective, descendants: true, static: true }, { propertyName: "cellDef", first: true, predicate: PblNgridCellDefDirective, descendants: true, static: true }, { propertyName: "footerDef", first: true, predicate: PblNgridFooterCellDefDirective, descendants: true, static: true }], ngImport: i0, template: "<ng-container *pblNgridHeaderCellDef=\"name; col as col;\">\n  <mat-checkbox *ngIf=\"bulkSelectMode !== 'none'\"\n                style=\"overflow: initial\"\n                [color]=\"color\"\n                (click)=\"$event.stopPropagation()\"\n                (change)=\"$event ? masterToggle() : null\"\n                [checked]=\"allSelected\"\n                [indeterminate]=\"length > 0 && !allSelected\">\n  </mat-checkbox>\n</ng-container>\n<mat-checkbox *pblNgridCellDef=\"name; row as row;\"\n              style=\"overflow: initial\"\n              class=\"pbl-ngrid-selection-checkbox\"\n              [color]=\"color\"\n              [disabled]=isCheckboxDisabled(row)\n              (click)=\"$event.stopPropagation()\"\n              (change)=\"rowItemChange(row)\"\n              [checked]=\"selection.isSelected(row)\">\n</mat-checkbox>\n<span *pblNgridFooterCellDef=\"name; col as col;\">{{ length ? length : '' }}</span>\n", styles: [".mat-cell.pbl-ngrid-checkbox,.mat-header-cell.pbl-ngrid-checkbox{box-sizing:content-box;flex:0 0 24px;overflow:visible}.pbl-ngrid-selection-checkbox .mat-checkbox-background{transition:none}"], components: [{ type: i2.MatCheckbox, selector: "mat-checkbox", inputs: ["disableRipple", "color", "tabIndex", "aria-label", "aria-labelledby", "id", "labelPosition", "name", "required", "checked", "disabled", "indeterminate", "aria-describedby", "value"], outputs: ["change", "indeterminateChange"], exportAs: ["matCheckbox"] }], directives: [{ type: i1.PblNgridHeaderCellDefDirective, selector: "[pblNgridHeaderCellDef], [pblNgridHeaderCellTypeDef]", inputs: ["pblNgridHeaderCellDef", "pblNgridHeaderCellTypeDef"] }, { type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.PblNgridCellDefDirective, selector: "[pblNgridCellDef], [pblNgridCellTypeDef]", inputs: ["pblNgridCellDef", "pblNgridCellTypeDef"] }, { type: i1.PblNgridFooterCellDefDirective, selector: "[pblNgridFooterCellDef], [pblNgridFooterCellTypeDef]", inputs: ["pblNgridFooterCellDef", "pblNgridFooterCellTypeDef"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridCheckboxComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'pbl-ngrid-checkbox',
                    templateUrl: './table-checkbox.component.html',
                    styleUrls: ['./table-checkbox.component.scss'],
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
            }], color: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtY2hlY2tib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3JpZC1tYXRlcmlhbC9zZWxlY3Rpb24tY29sdW1uL3NyYy9saWIvdGFibGUtY2hlY2tib3guY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3JpZC1tYXRlcmlhbC9zZWxlY3Rpb24tY29sdW1uL3NyYy9saWIvdGFibGUtY2hlY2tib3guY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUE0Qix1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNySixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFHMUQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzFDLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsOEJBQThCLEVBQzlCLHdCQUF3QixFQUN4Qiw4QkFBOEIsRUFDOUIsd0JBQXdCLEdBQ3pCLE1BQU0sZUFBZSxDQUFDOzs7OztBQUV2QixNQUFNLGVBQWUsR0FBRyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUM7QUFTcEMsTUFBTSxPQUFPLHlCQUF5QjtJQXNFcEMsWUFBbUIsS0FBNkIsRUFBVSxHQUFzQjtRQUE3RCxVQUFLLEdBQUwsS0FBSyxDQUF3QjtRQUFVLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBUmhGLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBS1osd0JBQW1CLEdBQTBCLGVBQWUsQ0FBQztRQUluRSxNQUFNLFVBQVUsR0FBRyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEQsVUFBVSxDQUFDLE1BQU07YUFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FB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SUFBSTtpQkFDdEM7d0lBT1UsSUFBSTtzQkFBWixLQUFLO2dCQVdPLGNBQWM7c0JBQTFCLEtBQUs7Z0JBV08sU0FBUztzQkFBckIsS0FBSztnQkFVTyxrQkFBa0I7c0JBQTlCLEtBQUs7Z0JBVU8sS0FBSztzQkFBakIsS0FBSztnQkFVdUQsU0FBUztzQkFBckUsU0FBUzt1QkFBQyw4QkFBOEIsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7Z0JBQ0osT0FBTztzQkFBN0QsU0FBUzt1QkFBQyx3QkFBd0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7Z0JBQ1EsU0FBUztzQkFBckUsU0FBUzt1QkFBQyw4QkFBOEIsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBWaWV3Q2hpbGQsIFZpZXdFbmNhcHN1bGF0aW9uLCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3ksIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2VsZWN0aW9uTW9kZWwgfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHsgVGhlbWVQYWxldHRlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5cbmltcG9ydCB7IHVucnggfSBmcm9tICdAcGVidWxhL25ncmlkL2NvcmUnO1xuaW1wb3J0IHtcbiAgUGJsTmdyaWRDb21wb25lbnQsXG4gIFBibE5ncmlkSGVhZGVyQ2VsbERlZkRpcmVjdGl2ZSxcbiAgUGJsTmdyaWRDZWxsRGVmRGlyZWN0aXZlLFxuICBQYmxOZ3JpZEZvb3RlckNlbGxEZWZEaXJlY3RpdmUsXG4gIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcixcbn0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5cbmNvbnN0IEFMV0FZU19GQUxTRV9GTiA9ICgpID0+IGZhbHNlO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdwYmwtbmdyaWQtY2hlY2tib3gnLFxuICB0ZW1wbGF0ZVVybDogJy4vdGFibGUtY2hlY2tib3guY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi90YWJsZS1jaGVja2JveC5jb21wb25lbnQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRDaGVja2JveENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIC8qKlxuICAgKiBVbmlxdWUgbmFtZSBmb3IgdGhlIGNoZWNrYm94IGNvbHVtbi5cbiAgICogV2hlbiBub3Qgc2V0LCB0aGUgbmFtZSAnY2hlY2tib3gnIGlzIHVzZWQuXG4gICAqXG4gICAqKi9cbiAgQElucHV0KCkgbmFtZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBEZWZpbmVzIHRoZSBiZWhhdmlvciB3aGVuIGNsaWNraW5nIG9uIHRoZSBidWxrIHNlbGVjdCBjaGVja2JveCAoaGVhZGVyKS5cbiAgICogVGhlcmUgYXJlIDIgb3B0aW9uczpcbiAgICpcbiAgICogLSBhbGw6IFdpbGwgc2VsZWN0IGFsbCBpdGVtcyBpbiB0aGUgY3VycmVudCBjb2xsZWN0aW9uXG4gICAqIC0gdmlldzogV2lsbCBzZWxlY3Qgb25seSB0aGUgcmVuZGVyZWQgaXRlbXMgaW4gdGhlIHZpZXdcbiAgICpcbiAgICogVGhlIGRlZmF1bHQgdmFsdWUgaXMgYGFsbGBcbiAgICovXG4gIEBJbnB1dCgpIGdldCBidWxrU2VsZWN0TW9kZSgpOiAnYWxsJyB8ICd2aWV3JyB8ICdub25lJyB7IHJldHVybiB0aGlzLl9idWxrU2VsZWN0TW9kZTsgfVxuICBzZXQgYnVsa1NlbGVjdE1vZGUodmFsdWU6ICdhbGwnIHwgJ3ZpZXcnIHwgJ25vbmUnKSB7XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLl9idWxrU2VsZWN0TW9kZSkge1xuICAgICAgdGhpcy5fYnVsa1NlbGVjdE1vZGUgPSB2YWx1ZTtcbiAgICAgIHRoaXMuc2V0dXBTZWxlY3Rpb24oKTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIEEgQ3VzdG9tIHNlbGVjdGlvbiBtb2RlbCwgb3B0aW9uYWwuXG4gICAqIElmIG5vdCBzZXQsIHRoZSBzZWxlY3Rpb24gbW9kZWwgZnJvbSB0aGUgRGF0YVNvdXJjZSBpcyB1c2VkLlxuICAgKi9cbiAgQElucHV0KCkgZ2V0IHNlbGVjdGlvbigpOiBTZWxlY3Rpb25Nb2RlbDxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0aW9uO1xuICB9XG4gIHNldCBzZWxlY3Rpb24odmFsdWU6IFNlbGVjdGlvbk1vZGVsPGFueT4pIHtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuX3NlbGVjdGlvbikge1xuICAgICAgdGhpcy5fc2VsZWN0aW9uID0gdmFsdWU7XG4gICAgICB0aGlzLnNldHVwU2VsZWN0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCkgZ2V0IGlzQ2hlY2tib3hEaXNhYmxlZCgpIHsgcmV0dXJuIHRoaXMuX2lzQ2hlY2tib3hEaXNhYmxlZDsgfVxuICBzZXQgaXNDaGVja2JveERpc2FibGVkKHZhbHVlOiAocm93OiBhbnkpID0+IGJvb2xlYW4pIHtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuX2lzQ2hlY2tib3hEaXNhYmxlZCkge1xuICAgICAgdGhpcy5faXNDaGVja2JveERpc2FibGVkID0gdmFsdWU7XG4gICAgICBpZiAoIXRoaXMuX2lzQ2hlY2tib3hEaXNhYmxlZCB8fCB0eXBlb2YgdGhpcy5faXNDaGVja2JveERpc2FibGVkICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMuX2lzQ2hlY2tib3hEaXNhYmxlZCA9IEFMV0FZU19GQUxTRV9GTjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBASW5wdXQoKSBnZXQgY29sb3IoKTogVGhlbWVQYWxldHRlIHsgcmV0dXJuIHRoaXMuX2NvbG9yOyB9XG4gIHNldCBjb2xvcih2YWx1ZTogVGhlbWVQYWxldHRlKSB7XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLl9jb2xvcikge1xuICAgICAgdGhpcy5fY29sb3IgPSB2YWx1ZTtcbiAgICAgIGlmICh0aGlzLnRhYmxlLmlzSW5pdCkge1xuICAgICAgICB0aGlzLm1hcmtBbmREZXRlY3QoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBAVmlld0NoaWxkKFBibE5ncmlkSGVhZGVyQ2VsbERlZkRpcmVjdGl2ZSwgeyBzdGF0aWM6IHRydWUgfSkgaGVhZGVyRGVmOiBQYmxOZ3JpZEhlYWRlckNlbGxEZWZEaXJlY3RpdmU8YW55PjtcbiAgQFZpZXdDaGlsZChQYmxOZ3JpZENlbGxEZWZEaXJlY3RpdmUsIHsgc3RhdGljOiB0cnVlIH0pIGNlbGxEZWY6IFBibE5ncmlkQ2VsbERlZkRpcmVjdGl2ZTxhbnk+O1xuICBAVmlld0NoaWxkKFBibE5ncmlkRm9vdGVyQ2VsbERlZkRpcmVjdGl2ZSwgeyBzdGF0aWM6IHRydWUgfSkgZm9vdGVyRGVmOiBQYmxOZ3JpZEZvb3RlckNlbGxEZWZEaXJlY3RpdmU8YW55PjtcblxuICBhbGxTZWxlY3RlZCA9IGZhbHNlO1xuICBsZW5ndGg6IG51bWJlcjtcblxuICBwcml2YXRlIF9zZWxlY3Rpb246IFNlbGVjdGlvbk1vZGVsPGFueT47XG4gIHByaXZhdGUgX2J1bGtTZWxlY3RNb2RlOiAnYWxsJyB8ICd2aWV3JyB8ICdub25lJztcbiAgcHJpdmF0ZSBfaXNDaGVja2JveERpc2FibGVkOiAocm93OiBhbnkpID0+IGJvb2xlYW4gPSBBTFdBWVNfRkFMU0VfRk47XG4gIHByaXZhdGUgX2NvbG9yOiBUaGVtZVBhbGV0dGU7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICBjb25zdCBwbHVnaW5DdHJsID0gUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLmZpbmQodGFibGUpO1xuICAgIHBsdWdpbkN0cmwuZXZlbnRzXG4gICAgICAucGlwZSh1bnJ4KHRoaXMpKVxuICAgICAgLnN1YnNjcmliZSggZSA9PiB7XG4gICAgICAgIGlmIChlLmtpbmQgPT09ICdvbkRhdGFTb3VyY2UnKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3Rpb24gPSBlLmN1cnIuc2VsZWN0aW9uO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5zZWxlY3Rpb24gJiYgdGhpcy50YWJsZS5kcykge1xuICAgICAgdGhpcy5zZWxlY3Rpb24gPSB0aGlzLnRhYmxlLmRzLnNlbGVjdGlvbjtcbiAgICB9XG5cbiAgICBjb25zdCByZWdpc3RyeSA9IHRoaXMudGFibGUucmVnaXN0cnk7XG4gICAgcmVnaXN0cnkuYWRkTXVsdGkoJ2hlYWRlckNlbGwnLCB0aGlzLmhlYWRlckRlZik7XG4gICAgcmVnaXN0cnkuYWRkTXVsdGkoJ3RhYmxlQ2VsbCcsIHRoaXMuY2VsbERlZik7XG4gICAgcmVnaXN0cnkuYWRkTXVsdGkoJ2Zvb3RlckNlbGwnLCB0aGlzLmZvb3RlckRlZik7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB1bnJ4LmtpbGwodGhpcyk7XG4gIH1cblxuICBtYXN0ZXJUb2dnbGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuYWxsU2VsZWN0ZWQpIHtcbiAgICAgIHRoaXMuc2VsZWN0aW9uLmNsZWFyKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5nZXRDb2xsZWN0aW9uKCkuZmlsdGVyKGRhdGEgPT4gIXRoaXMuX2lzQ2hlY2tib3hEaXNhYmxlZChkYXRhKSk7XG4gICAgICB0aGlzLnNlbGVjdGlvbi5zZWxlY3QoLi4uc2VsZWN0ZWQpO1xuICAgIH1cbiAgfVxuXG4gIHJvd0l0ZW1DaGFuZ2Uocm93OiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdGlvbi50b2dnbGUocm93KTtcbiAgICB0aGlzLm1hcmtBbmREZXRlY3QoKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0Q29sbGVjdGlvbigpIHtcbiAgICBjb25zdCB7IGRzIH0gPSB0aGlzLnRhYmxlO1xuICAgIHJldHVybiB0aGlzLmJ1bGtTZWxlY3RNb2RlID09PSAndmlldycgPyBkcy5yZW5kZXJlZERhdGEgOiBkcy5zb3VyY2U7XG4gIH1cblxuICBwcml2YXRlIHNldHVwU2VsZWN0aW9uKCk6IHZvaWQge1xuICAgIHVucngua2lsbCh0aGlzLCB0aGlzLnRhYmxlKTtcbiAgICBpZiAodGhpcy5fc2VsZWN0aW9uKSB7XG4gICAgICB0aGlzLmxlbmd0aCA9IHRoaXMuc2VsZWN0aW9uLnNlbGVjdGVkLmxlbmd0aDtcbiAgICAgIHRoaXMuc2VsZWN0aW9uLmNoYW5nZWRcbiAgICAgICAgLnBpcGUodW5yeCh0aGlzLCB0aGlzLnRhYmxlKSlcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmhhbmRsZVNlbGVjdGlvbkNoYW5nZWQoKSk7XG4gICAgICBjb25zdCBjaGFuZ2VTb3VyY2UgPSB0aGlzLmJ1bGtTZWxlY3RNb2RlID09PSAndmlldycgPyB0aGlzLnRhYmxlLmRzLm9uUmVuZGVyZWREYXRhQ2hhbmdlZCA6IHRoaXMudGFibGUuZHMub25Tb3VyY2VDaGFuZ2VkO1xuICAgICAgY2hhbmdlU291cmNlXG4gICAgICAgIC5waXBlKHVucngodGhpcywgdGhpcy50YWJsZSkpXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5oYW5kbGVTZWxlY3Rpb25DaGFuZ2VkKCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxlbmd0aCA9IDA7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVTZWxlY3Rpb25DaGFuZ2VkKCkge1xuICAgIGNvbnN0IHsgbGVuZ3RoIH0gPSB0aGlzLmdldENvbGxlY3Rpb24oKS5maWx0ZXIoZGF0YSA9PiAhdGhpcy5faXNDaGVja2JveERpc2FibGVkKGRhdGEpKTtcbiAgICB0aGlzLmFsbFNlbGVjdGVkID0gIXRoaXMuc2VsZWN0aW9uLmlzRW1wdHkoKSAmJiB0aGlzLnNlbGVjdGlvbi5zZWxlY3RlZC5sZW5ndGggPT09IGxlbmd0aDtcbiAgICB0aGlzLmxlbmd0aCA9IHRoaXMuc2VsZWN0aW9uLnNlbGVjdGVkLmxlbmd0aDtcbiAgICB0aGlzLm1hcmtBbmREZXRlY3QoKTtcbiAgfVxuXG4gIHByaXZhdGUgbWFya0FuZERldGVjdCgpIHtcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cbn1cbiIsIjxuZy1jb250YWluZXIgKnBibE5ncmlkSGVhZGVyQ2VsbERlZj1cIm5hbWU7IGNvbCBhcyBjb2w7XCI+XG4gIDxtYXQtY2hlY2tib3ggKm5nSWY9XCJidWxrU2VsZWN0TW9kZSAhPT0gJ25vbmUnXCJcbiAgICAgICAgICAgICAgICBzdHlsZT1cIm92ZXJmbG93OiBpbml0aWFsXCJcbiAgICAgICAgICAgICAgICBbY29sb3JdPVwiY29sb3JcIlxuICAgICAgICAgICAgICAgIChjbGljayk9XCIkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcIlxuICAgICAgICAgICAgICAgIChjaGFuZ2UpPVwiJGV2ZW50ID8gbWFzdGVyVG9nZ2xlKCkgOiBudWxsXCJcbiAgICAgICAgICAgICAgICBbY2hlY2tlZF09XCJhbGxTZWxlY3RlZFwiXG4gICAgICAgICAgICAgICAgW2luZGV0ZXJtaW5hdGVdPVwibGVuZ3RoID4gMCAmJiAhYWxsU2VsZWN0ZWRcIj5cbiAgPC9tYXQtY2hlY2tib3g+XG48L25nLWNvbnRhaW5lcj5cbjxtYXQtY2hlY2tib3ggKnBibE5ncmlkQ2VsbERlZj1cIm5hbWU7IHJvdyBhcyByb3c7XCJcbiAgICAgICAgICAgICAgc3R5bGU9XCJvdmVyZmxvdzogaW5pdGlhbFwiXG4gICAgICAgICAgICAgIGNsYXNzPVwicGJsLW5ncmlkLXNlbGVjdGlvbi1jaGVja2JveFwiXG4gICAgICAgICAgICAgIFtjb2xvcl09XCJjb2xvclwiXG4gICAgICAgICAgICAgIFtkaXNhYmxlZF09aXNDaGVja2JveERpc2FibGVkKHJvdylcbiAgICAgICAgICAgICAgKGNsaWNrKT1cIiRldmVudC5zdG9wUHJvcGFnYXRpb24oKVwiXG4gICAgICAgICAgICAgIChjaGFuZ2UpPVwicm93SXRlbUNoYW5nZShyb3cpXCJcbiAgICAgICAgICAgICAgW2NoZWNrZWRdPVwic2VsZWN0aW9uLmlzU2VsZWN0ZWQocm93KVwiPlxuPC9tYXQtY2hlY2tib3g+XG48c3BhbiAqcGJsTmdyaWRGb290ZXJDZWxsRGVmPVwibmFtZTsgY29sIGFzIGNvbDtcIj57eyBsZW5ndGggPyBsZW5ndGggOiAnJyB9fTwvc3Bhbj5cbiJdfQ==