import { Directive, Injector, Input, ComponentFactoryResolver } from '@angular/core';
import { PblNgridComponent, PblNgridPluginController } from '@pebula/ngrid';
import { PblNgridBsSelectionComponent } from './bs-selection.component';
import * as i0 from "@angular/core";
import * as i1 from "@pebula/ngrid";
export const PLUGIN_KEY = 'bsSelectionColumn';
export class PblNgridBsSelectionPlugin {
    constructor(table, cfr, injector, pluginCtrl) {
        this.table = table;
        this.cfr = cfr;
        this.injector = injector;
        this._selectionClass = '';
        this._removePlugin = pluginCtrl.setPlugin(PLUGIN_KEY, this);
    }
    get isCheckboxDisabled() { return this._isCheckboxDisabled; }
    set isCheckboxDisabled(value) {
        if (value !== this._isCheckboxDisabled) {
            this._isCheckboxDisabled = value;
            if (this.cmpRef && value) {
                this.cmpRef.instance.isCheckboxDisabled = value;
                this.cmpRef.changeDetectorRef.detectChanges();
            }
        }
    }
    /**
     * Add's a selection column using material's `mat-checkbox` in the column specified.
     */
    get bsSelectionColumn() { return this._name; }
    set bsSelectionColumn(value) {
        if (value !== this._name) {
            this._name = value;
            if (!value) {
                if (this.cmpRef) {
                    this.cmpRef.destroy();
                    this.cmpRef = undefined;
                }
            }
            else {
                if (!this.cmpRef) {
                    this.cmpRef = this.cfr.resolveComponentFactory(PblNgridBsSelectionComponent).create(this.injector);
                    this.cmpRef.instance.table = this.table;
                    if (this._bulkSelectMode) {
                        this.cmpRef.instance.bulkSelectMode = this._bulkSelectMode;
                    }
                    this.cmpRef.instance.selectionClass = this._selectionClass;
                }
                if (this.isCheckboxDisabled) {
                    this.cmpRef.instance.isCheckboxDisabled = this.isCheckboxDisabled;
                }
                this.cmpRef.instance.name = value;
                this.cmpRef.changeDetectorRef.detectChanges();
            }
        }
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
            if (this.cmpRef) {
                this.cmpRef.instance.bulkSelectMode = value;
            }
        }
    }
    get bsSelectionClass() { return this._selectionClass; }
    set matCheckboxSelectionColor(value) {
        if (value !== this._selectionClass) {
            this._selectionClass = value;
            if (this.cmpRef) {
                this.cmpRef.instance.selectionClass = value;
            }
        }
    }
    ngOnDestroy() {
        if (this.cmpRef) {
            this.cmpRef.destroy();
        }
        this._removePlugin(this.table);
    }
}
/** @nocollapse */ PblNgridBsSelectionPlugin.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridBsSelectionPlugin, deps: [{ token: i1.PblNgridComponent }, { token: i0.ComponentFactoryResolver }, { token: i0.Injector }, { token: i1.PblNgridPluginController }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ PblNgridBsSelectionPlugin.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridBsSelectionPlugin, selector: "pbl-ngrid[bsSelectionColumn]", inputs: { isCheckboxDisabled: "isCheckboxDisabled", bsSelectionColumn: "bsSelectionColumn", bulkSelectMode: "bulkSelectMode", bsSelectionClass: "bsSelectionClass" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridBsSelectionPlugin, decorators: [{
            type: Directive,
            args: [{ selector: 'pbl-ngrid[bsSelectionColumn]' }]
        }], ctorParameters: function () { return [{ type: i1.PblNgridComponent }, { type: i0.ComponentFactoryResolver }, { type: i0.Injector }, { type: i1.PblNgridPluginController }]; }, propDecorators: { isCheckboxDisabled: [{
                type: Input
            }], bsSelectionColumn: [{
                type: Input
            }], bulkSelectMode: [{
                type: Input
            }], bsSelectionClass: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtc2VsZWN0aW9uLXBsdWdpbi5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL25ncmlkLWJvb3RzdHJhcC9zZWxlY3Rpb24tY29sdW1uL3NyYy9saWIvYnMtc2VsZWN0aW9uLXBsdWdpbi5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFhLHdCQUF3QixFQUFnQixNQUFNLGVBQWUsQ0FBQztBQUU5RyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFNUUsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sMEJBQTBCLENBQUM7OztBQVF4RSxNQUFNLENBQUMsTUFBTSxVQUFVLEdBQXdCLG1CQUFtQixDQUFDO0FBR25FLE1BQU0sT0FBTyx5QkFBeUI7SUErRXBDLFlBQW9CLEtBQTZCLEVBQzdCLEdBQTZCLEVBQzdCLFFBQWtCLEVBQzFCLFVBQW9DO1FBSDVCLFVBQUssR0FBTCxLQUFLLENBQXdCO1FBQzdCLFFBQUcsR0FBSCxHQUFHLENBQTBCO1FBQzdCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFQOUIsb0JBQWUsR0FBVyxFQUFFLENBQUM7UUFTbkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBbEZELElBQWEsa0JBQWtCLEtBQUssT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO0lBQ3RFLElBQUksa0JBQWtCLENBQUMsS0FBNEI7UUFDakQsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLG1CQUFtQixFQUFFO1lBQ3RDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUM7WUFDakMsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLEtBQUssRUFB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O3lJQTNGVSx5QkFBeUI7NkhBQXpCLHlCQUF5QjsyRkFBekIseUJBQXlCO2tCQURyQyxTQUFTO21CQUFDLEVBQUUsUUFBUSxFQUFFLDhCQUE4QixFQUFFOzZNQUd4QyxrQkFBa0I7c0JBQTlCLEtBQUs7Z0JBY08saUJBQWlCO3NCQUE3QixLQUFLO2dCQW9DTyxjQUFjO3NCQUExQixLQUFLO2dCQVVPLGdCQUFnQjtzQkFBNUIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5qZWN0b3IsIElucHV0LCBPbkRlc3Ryb3ksIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgQ29tcG9uZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50LCBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIgfSBmcm9tICdAcGVidWxhL25ncmlkJztcblxuaW1wb3J0IHsgUGJsTmdyaWRCc1NlbGVjdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vYnMtc2VsZWN0aW9uLmNvbXBvbmVudCc7XG5cbmRlY2xhcmUgbW9kdWxlICdAcGVidWxhL25ncmlkL2xpYi9leHQvdHlwZXMnIHtcbiAgaW50ZXJmYWNlIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uIHtcbiAgICBic1NlbGVjdGlvbkNvbHVtbj86IFBibE5ncmlkQnNTZWxlY3Rpb25QbHVnaW47XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IFBMVUdJTl9LRVk6ICdic1NlbGVjdGlvbkNvbHVtbicgPSAnYnNTZWxlY3Rpb25Db2x1bW4nO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdwYmwtbmdyaWRbYnNTZWxlY3Rpb25Db2x1bW5dJyB9KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkQnNTZWxlY3Rpb25QbHVnaW4gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gIEBJbnB1dCgpIGdldCBpc0NoZWNrYm94RGlzYWJsZWQoKSB7IHJldHVybiB0aGlzLl9pc0NoZWNrYm94RGlzYWJsZWQ7IH1cbiAgc2V0IGlzQ2hlY2tib3hEaXNhYmxlZCh2YWx1ZTogKHJvdzogYW55KSA9PiBib29sZWFuICkge1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5faXNDaGVja2JveERpc2FibGVkKSB7XG4gICAgICB0aGlzLl9pc0NoZWNrYm94RGlzYWJsZWQgPSB2YWx1ZTtcbiAgICAgIGlmICh0aGlzLmNtcFJlZiAmJiB2YWx1ZSkge1xuICAgICAgICB0aGlzLmNtcFJlZi5pbnN0YW5jZS5pc0NoZWNrYm94RGlzYWJsZWQgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5jbXBSZWYuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQncyBhIHNlbGVjdGlvbiBjb2x1bW4gdXNpbmcgbWF0ZXJpYWwncyBgbWF0LWNoZWNrYm94YCBpbiB0aGUgY29sdW1uIHNwZWNpZmllZC5cbiAgICovXG4gIEBJbnB1dCgpIGdldCBic1NlbGVjdGlvbkNvbHVtbigpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fbmFtZTsgfVxuICBzZXQgYnNTZWxlY3Rpb25Db2x1bW4odmFsdWU6IHN0cmluZyApIHtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuX25hbWUpIHtcbiAgICAgIHRoaXMuX25hbWUgPSB2YWx1ZTtcbiAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMuY21wUmVmKSB7XG4gICAgICAgICAgdGhpcy5jbXBSZWYuZGVzdHJveSgpO1xuICAgICAgICAgIHRoaXMuY21wUmVmID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIXRoaXMuY21wUmVmKSB7XG4gICAgICAgICAgdGhpcy5jbXBSZWYgPSB0aGlzLmNmci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShQYmxOZ3JpZEJzU2VsZWN0aW9uQ29tcG9uZW50KS5jcmVhdGUodGhpcy5pbmplY3Rvcik7XG4gICAgICAgICAgdGhpcy5jbXBSZWYuaW5zdGFuY2UudGFibGUgPSB0aGlzLnRhYmxlO1xuICAgICAgICAgIGlmICh0aGlzLl9idWxrU2VsZWN0TW9kZSkge1xuICAgICAgICAgICAgdGhpcy5jbXBSZWYuaW5zdGFuY2UuYnVsa1NlbGVjdE1vZGUgPSB0aGlzLl9idWxrU2VsZWN0TW9kZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5jbXBSZWYuaW5zdGFuY2Uuc2VsZWN0aW9uQ2xhc3MgPSB0aGlzLl9zZWxlY3Rpb25DbGFzcztcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pc0NoZWNrYm94RGlzYWJsZWQpIHtcbiAgICAgICAgICB0aGlzLmNtcFJlZi5pbnN0YW5jZS5pc0NoZWNrYm94RGlzYWJsZWQgPSB0aGlzLmlzQ2hlY2tib3hEaXNhYmxlZDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNtcFJlZi5pbnN0YW5jZS5uYW1lID0gdmFsdWU7XG4gICAgICAgIHRoaXMuY21wUmVmLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGVmaW5lcyB0aGUgYmVoYXZpb3Igd2hlbiBjbGlja2luZyBvbiB0aGUgYnVsayBzZWxlY3QgY2hlY2tib3ggKGhlYWRlcikuXG4gICAqIFRoZXJlIGFyZSAyIG9wdGlvbnM6XG4gICAqXG4gICAqIC0gYWxsOiBXaWxsIHNlbGVjdCBhbGwgaXRlbXMgaW4gdGhlIGN1cnJlbnQgY29sbGVjdGlvblxuICAgKiAtIHZpZXc6IFdpbGwgc2VsZWN0IG9ubHkgdGhlIHJlbmRlcmVkIGl0ZW1zIGluIHRoZSB2aWV3XG4gICAqXG4gICAqIFRoZSBkZWZhdWx0IHZhbHVlIGlzIGBhbGxgXG4gICAqL1xuICBASW5wdXQoKSBnZXQgYnVsa1NlbGVjdE1vZGUoKTogJ2FsbCcgfCAndmlldycgfCAnbm9uZScgeyByZXR1cm4gdGhpcy5fYnVsa1NlbGVjdE1vZGU7IH1cbiAgc2V0IGJ1bGtTZWxlY3RNb2RlKHZhbHVlOiAnYWxsJyB8ICd2aWV3JyB8ICdub25lJykge1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fYnVsa1NlbGVjdE1vZGUpIHtcbiAgICAgIHRoaXMuX2J1bGtTZWxlY3RNb2RlID0gdmFsdWU7XG4gICAgICBpZiAodGhpcy5jbXBSZWYpIHtcbiAgICAgICAgdGhpcy5jbXBSZWYuaW5zdGFuY2UuYnVsa1NlbGVjdE1vZGUgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBASW5wdXQoKSBnZXQgYnNTZWxlY3Rpb25DbGFzcygpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fc2VsZWN0aW9uQ2xhc3M7IH1cbiAgc2V0IG1hdENoZWNrYm94U2VsZWN0aW9uQ29sb3IodmFsdWU6IHN0cmluZykge1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fc2VsZWN0aW9uQ2xhc3MpIHtcbiAgICAgIHRoaXMuX3NlbGVjdGlvbkNsYXNzID0gdmFsdWU7XG4gICAgICBpZiAodGhpcy5jbXBSZWYpIHtcbiAgICAgICAgdGhpcy5jbXBSZWYuaW5zdGFuY2Uuc2VsZWN0aW9uQ2xhc3MgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9uYW1lOiBzdHJpbmc7XG4gIHByaXZhdGUgX2J1bGtTZWxlY3RNb2RlOiAnYWxsJyB8ICd2aWV3JyB8ICdub25lJztcbiAgcHJpdmF0ZSBfc2VsZWN0aW9uQ2xhc3M6IHN0cmluZyA9ICcnO1xuICBwcml2YXRlIGNtcFJlZjogQ29tcG9uZW50UmVmPFBibE5ncmlkQnNTZWxlY3Rpb25Db21wb25lbnQ+O1xuICBwcml2YXRlIF9yZW1vdmVQbHVnaW46ICh0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55PikgPT4gdm9pZDtcbiAgcHJpdmF0ZSBfaXNDaGVja2JveERpc2FibGVkOiAocm93OiBhbnkpID0+IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55PixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBjZnI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgICAgICAgICAgIHBsdWdpbkN0cmw6IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcikge1xuICAgIHRoaXMuX3JlbW92ZVBsdWdpbiA9IHBsdWdpbkN0cmwuc2V0UGx1Z2luKFBMVUdJTl9LRVksIHRoaXMpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuY21wUmVmKSB7XG4gICAgICB0aGlzLmNtcFJlZi5kZXN0cm95KCk7XG4gICAgfVxuICAgIHRoaXMuX3JlbW92ZVBsdWdpbih0aGlzLnRhYmxlKTtcbiAgfVxufVxuIl19