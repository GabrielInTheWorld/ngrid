import * as i0 from '@angular/core';
import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, ViewChild, Directive, NgModule } from '@angular/core';
import '@angular/cdk/collections';
import { unrx } from '@pebula/ngrid/core';
import * as i1 from '@pebula/ngrid';
import { PblNgridPluginController, PblNgridHeaderCellDefDirective, PblNgridCellDefDirective, PblNgridFooterCellDefDirective, ngridPlugin, PblNgridModule } from '@pebula/ngrid';
import * as i2 from '@angular/material/checkbox';
import { MatCheckboxModule } from '@angular/material/checkbox';
import * as i3 from '@angular/common';
import { CommonModule } from '@angular/common';

const ALWAYS_FALSE_FN = () => false;
class PblNgridCheckboxComponent {
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

const PLUGIN_KEY = 'matCheckboxSelection';
class PblNgridMatCheckboxSelectionDirective {
    constructor(table, cfr, injector, pluginCtrl) {
        this.table = table;
        this.cfr = cfr;
        this.injector = injector;
        this._color = 'primary';
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
    get matCheckboxSelection() { return this._name; }
    set matCheckboxSelection(value) {
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
                    this.cmpRef = this.cfr.resolveComponentFactory(PblNgridCheckboxComponent).create(this.injector);
                    this.cmpRef.instance.table = this.table;
                    if (this._bulkSelectMode) {
                        this.cmpRef.instance.bulkSelectMode = this._bulkSelectMode;
                    }
                    this.cmpRef.instance.color = this._color;
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
    get matCheckboxSelectionColor() { return this._color; }
    set matCheckboxSelectionColor(value) {
        if (value !== this._color) {
            this._color = value;
            if (this.cmpRef) {
                this.cmpRef.instance.color = value;
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
/** @nocollapse */ PblNgridMatCheckboxSelectionDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridMatCheckboxSelectionDirective, deps: [{ token: i1.PblNgridComponent }, { token: i0.ComponentFactoryResolver }, { token: i0.Injector }, { token: i1.PblNgridPluginController }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ PblNgridMatCheckboxSelectionDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridMatCheckboxSelectionDirective, selector: "pbl-ngrid[matCheckboxSelection]", inputs: { isCheckboxDisabled: "isCheckboxDisabled", matCheckboxSelection: "matCheckboxSelection", bulkSelectMode: "bulkSelectMode", matCheckboxSelectionColor: "matCheckboxSelectionColor" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridMatCheckboxSelectionDirective, decorators: [{
            type: Directive,
            args: [{ selector: 'pbl-ngrid[matCheckboxSelection]' }]
        }], ctorParameters: function () { return [{ type: i1.PblNgridComponent }, { type: i0.ComponentFactoryResolver }, { type: i0.Injector }, { type: i1.PblNgridPluginController }]; }, propDecorators: { isCheckboxDisabled: [{
                type: Input
            }], matCheckboxSelection: [{
                type: Input
            }], bulkSelectMode: [{
                type: Input
            }], matCheckboxSelectionColor: [{
                type: Input
            }] } });

class PblNgridCheckboxModule {
}
PblNgridCheckboxModule.NGRID_PLUGIN = ngridPlugin({ id: PLUGIN_KEY }, PblNgridMatCheckboxSelectionDirective);
/** @nocollapse */ PblNgridCheckboxModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridCheckboxModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ PblNgridCheckboxModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridCheckboxModule, declarations: [PblNgridMatCheckboxSelectionDirective, PblNgridCheckboxComponent], imports: [CommonModule, MatCheckboxModule, PblNgridModule], exports: [PblNgridMatCheckboxSelectionDirective, PblNgridCheckboxComponent] });
/** @nocollapse */ PblNgridCheckboxModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridCheckboxModule, imports: [[CommonModule, MatCheckboxModule, PblNgridModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridCheckboxModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, MatCheckboxModule, PblNgridModule],
                    declarations: [PblNgridMatCheckboxSelectionDirective, PblNgridCheckboxComponent],
                    exports: [PblNgridMatCheckboxSelectionDirective, PblNgridCheckboxComponent],
                    // TODO(REFACTOR_REF 2): remove when ViewEngine is no longer supported by angular (V12 ???)
                    entryComponents: [PblNgridCheckboxComponent]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { PblNgridCheckboxComponent, PblNgridCheckboxModule, PblNgridMatCheckboxSelectionDirective };
//# sourceMappingURL=pebula-ngrid-material-selection-column.js.map
