import { Injector, OnDestroy } from '@angular/core';
import { BooleanInput } from '@angular/cdk/coercion';
import { PblNgridComponent, PblNgridPluginController } from '@pebula/ngrid';
import { PblNgridCellEvent } from '@pebula/ngrid/target-events';
import * as i0 from "@angular/core";
declare module '@pebula/ngrid/core/lib/configuration/type' {
    interface PblNgridConfig {
        bsCellTooltip?: CellTooltipOptions & {
            /** When set to true will apply the default cell tooltip to ALL tables */
            autoSetAll?: boolean;
        };
    }
}
declare module '@pebula/ngrid/lib/ext/types' {
    interface PblNgridPluginExtension {
        bsCellTooltip?: PblNgridCellTooltipDirective<any>;
    }
    interface PblNgridPluginExtensionFactories {
        bsCellTooltip: keyof typeof PblNgridCellTooltipDirective;
    }
}
export declare const PLUGIN_KEY: 'bsCellTooltip';
export interface CellTooltipOptions {
    canShow?: boolean | ((event: PblNgridCellEvent<any>) => boolean);
    message?: (event: PblNgridCellEvent<any>) => string;
}
export declare class PblNgridCellTooltipDirective<T> implements CellTooltipOptions, OnDestroy {
    private table;
    private injector;
    static readonly PLUGIN_KEY: 'bsCellTooltip';
    set canShow(value: boolean | ((event: PblNgridCellEvent<T>) => boolean));
    message: (event: PblNgridCellEvent<T>) => string;
    tooltipClass: string;
    showDelay: number;
    hideDelay: number;
    private initArgs;
    private toolTip;
    private lastConfig;
    private _removePlugin;
    private _canShow;
    constructor(table: PblNgridComponent<any>, injector: Injector, pluginCtrl: PblNgridPluginController);
    static create<T = any>(table: PblNgridComponent<any>, injector: Injector): PblNgridCellTooltipDirective<T>;
    ngOnDestroy(): void;
    private init;
    private cellEnter;
    private cellLeave;
    private killTooltip;
    static ngAcceptInputType_canShow: BooleanInput;
    static ɵfac: i0.ɵɵFactoryDeclaration<PblNgridCellTooltipDirective<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<PblNgridCellTooltipDirective<any>, "[bsCellTooltip]", ["bsCellTooltip"], { "canShow": "bsCellTooltip"; "message": "message"; "tooltipClass": "tooltipClass"; "showDelay": "showDelay"; "hideDelay": "hideDelay"; }, {}, never>;
}
