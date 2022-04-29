import { Injector, OnDestroy, ComponentFactoryResolver } from '@angular/core';
import { PblNgridComponent, PblNgridPluginController } from '@pebula/ngrid';
import * as i0 from "@angular/core";
declare module '@pebula/ngrid/lib/ext/types' {
    interface PblNgridPluginExtension {
        bsSelectionColumn?: PblNgridBsSelectionPlugin;
    }
}
export declare const PLUGIN_KEY: 'bsSelectionColumn';
export declare class PblNgridBsSelectionPlugin implements OnDestroy {
    private table;
    private cfr;
    private injector;
    get isCheckboxDisabled(): (row: any) => boolean;
    set isCheckboxDisabled(value: (row: any) => boolean);
    /**
     * Add's a selection column using material's `mat-checkbox` in the column specified.
     */
    get bsSelectionColumn(): string;
    set bsSelectionColumn(value: string);
    /**
     * Defines the behavior when clicking on the bulk select checkbox (header).
     * There are 2 options:
     *
     * - all: Will select all items in the current collection
     * - view: Will select only the rendered items in the view
     *
     * The default value is `all`
     */
    get bulkSelectMode(): 'all' | 'view' | 'none';
    set bulkSelectMode(value: 'all' | 'view' | 'none');
    get bsSelectionClass(): string;
    set matCheckboxSelectionColor(value: string);
    private _name;
    private _bulkSelectMode;
    private _selectionClass;
    private cmpRef;
    private _removePlugin;
    private _isCheckboxDisabled;
    constructor(table: PblNgridComponent<any>, cfr: ComponentFactoryResolver, injector: Injector, pluginCtrl: PblNgridPluginController);
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PblNgridBsSelectionPlugin, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<PblNgridBsSelectionPlugin, "pbl-ngrid[bsSelectionColumn]", never, { "isCheckboxDisabled": "isCheckboxDisabled"; "bsSelectionColumn": "bsSelectionColumn"; "bulkSelectMode": "bulkSelectMode"; "bsSelectionClass": "bsSelectionClass"; }, {}, never>;
}
