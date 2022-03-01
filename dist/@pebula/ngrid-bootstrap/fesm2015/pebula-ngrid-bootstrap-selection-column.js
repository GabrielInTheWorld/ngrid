import * as i0 from '@angular/core';
import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, ViewChild, Directive, NgModule } from '@angular/core';
import '@angular/cdk/collections';
import { unrx } from '@pebula/ngrid/core';
import * as i1 from '@pebula/ngrid';
import { PblNgridPluginController, PblNgridHeaderCellDefDirective, PblNgridCellDefDirective, PblNgridFooterCellDefDirective, ngridPlugin, PblNgridModule } from '@pebula/ngrid';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';

const ALWAYS_FALSE_FN = () => false;
class PblNgridBsSelectionComponent {
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

const PLUGIN_KEY = 'bsSelectionColumn';
class PblNgridBsSelectionPlugin {
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

class PblNgridBsSelectionModule {
}
PblNgridBsSelectionModule.NGRID_PLUGIN = ngridPlugin({ id: PLUGIN_KEY }, PblNgridBsSelectionPlugin);
/** @nocollapse */ PblNgridBsSelectionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridBsSelectionModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ PblNgridBsSelectionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridBsSelectionModule, declarations: [PblNgridBsSelectionPlugin, PblNgridBsSelectionComponent], imports: [CommonModule, MatCheckboxModule, PblNgridModule], exports: [PblNgridBsSelectionPlugin, PblNgridBsSelectionComponent] });
/** @nocollapse */ PblNgridBsSelectionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridBsSelectionModule, imports: [[CommonModule, MatCheckboxModule, PblNgridModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridBsSelectionModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, MatCheckboxModule, PblNgridModule],
                    declarations: [PblNgridBsSelectionPlugin, PblNgridBsSelectionComponent],
                    exports: [PblNgridBsSelectionPlugin, PblNgridBsSelectionComponent],
                    // TODO(REFACTOR_REF 2): remove when ViewEngine is no longer supported by angular (V12 ???)
                    entryComponents: [PblNgridBsSelectionComponent]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { PblNgridBsSelectionComponent, PblNgridBsSelectionModule, PblNgridBsSelectionPlugin };
//# sourceMappingURL=pebula-ngrid-bootstrap-selection-column.js.map
