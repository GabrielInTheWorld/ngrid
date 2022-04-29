import * as i0 from '@angular/core';
import { Renderer2, ComponentFactoryResolver, ViewContainerRef, NgZone, ChangeDetectorRef, ApplicationRef, ElementRef, Directive, Input, NgModule, Optional, SkipSelf } from '@angular/core';
import { DOCUMENT, CommonModule } from '@angular/common';
import { NgbTooltipConfig, NgbTooltip, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import * as i1$1 from '@pebula/ngrid/core';
import { PblNgridConfigService, unrx } from '@pebula/ngrid/core';
import * as i1 from '@pebula/ngrid';
import { PblNgridPluginController, ngridPlugin, PblNgridModule } from '@pebula/ngrid';
import { PblNgridTargetEventsModule } from '@pebula/ngrid/target-events';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

const PLUGIN_KEY = 'bsCellTooltip';
const DEFAULT_OPTIONS = {
    canShow: (event) => {
        const element = (event.cellTarget.firstElementChild || event.cellTarget);
        return element.scrollWidth > element.offsetWidth;
    },
    message: (event) => {
        return event.cellTarget.innerText;
    }
};
class PblNgridCellTooltipDirective {
    constructor(table, injector, pluginCtrl) {
        this.table = table;
        this.injector = injector;
        this._removePlugin = pluginCtrl.setPlugin(PLUGIN_KEY, this);
        const configService = injector.get(PblNgridConfigService);
        this.initArgs = [
            injector.get(Renderer2),
            injector,
            injector.get(ComponentFactoryResolver),
            injector.get(ViewContainerRef),
            injector.get(NgbTooltipConfig),
            injector.get(NgZone),
            injector.get(DOCUMENT),
            injector.get(ChangeDetectorRef),
            injector.get(ApplicationRef),
        ];
        configService.onUpdate('bsCellTooltip')
            .pipe(unrx(this))
            .subscribe(cfg => this.lastConfig = cfg.curr);
        pluginCtrl.onInit().subscribe(() => this.init(pluginCtrl));
    }
    // tslint:disable-next-line:no-input-rename
    set canShow(value) {
        if (typeof value === 'function') {
            this._canShow = value;
        }
        else if (value === '') {
            this._canShow = undefined;
        }
        else {
            this._canShow = coerceBooleanProperty(value) ? e => true : e => false;
        }
    }
    static create(table, injector) {
        return new PblNgridCellTooltipDirective(table, injector, PblNgridPluginController.find(table));
    }
    ngOnDestroy() {
        this._removePlugin(this.table);
        this.killTooltip();
        unrx.kill(this);
    }
    init(pluginCtrl) {
        // Depends on target-events plugin
        // if it's not set, create it.
        const targetEventsPlugin = pluginCtrl.getPlugin('targetEvents') || pluginCtrl.createPlugin('targetEvents');
        targetEventsPlugin.cellEnter
            .pipe(unrx(this))
            .subscribe(event => this.cellEnter(event));
        targetEventsPlugin.cellLeave
            .pipe(unrx(this))
            .subscribe(event => this.cellLeave(event));
    }
    cellEnter(event) {
        this.killTooltip();
        if (!this._canShow) {
            // TODO: this will set lastConfig / default option once
            // but if user changes lastConfig it will never update again...
            this.canShow = (this.lastConfig && this.lastConfig.canShow) || DEFAULT_OPTIONS.canShow;
        }
        if (this._canShow(event)) {
            const params = this.initArgs.slice();
            this.toolTip = new NgbTooltip(new ElementRef(event.cellTarget), ...params);
            this.toolTip.container = 'body';
            const message = this.message || (this.lastConfig && this.lastConfig.message) || DEFAULT_OPTIONS.message;
            this.toolTip.ngbTooltip = message(event);
            // if (this.position) {
            //   this.toolTip.position = this.position;
            // }
            if (this.tooltipClass) {
                this.toolTip.tooltipClass = this.tooltipClass;
            }
            if (this.showDelay >= 0) {
                this.toolTip.openDelay = this.showDelay;
            }
            if (this.hideDelay >= 0) {
                this.toolTip.closeDelay = this.hideDelay;
            }
            this.toolTip.open();
        }
    }
    cellLeave(event) {
        this.killTooltip();
    }
    killTooltip() {
        if (this.toolTip) {
            this.toolTip.close();
            this.toolTip.ngOnDestroy();
            this.toolTip = undefined;
        }
    }
}
PblNgridCellTooltipDirective.PLUGIN_KEY = PLUGIN_KEY;
/** @nocollapse */ PblNgridCellTooltipDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridCellTooltipDirective, deps: [{ token: i1.PblNgridComponent }, { token: i0.Injector }, { token: i1.PblNgridPluginController }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ PblNgridCellTooltipDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridCellTooltipDirective, selector: "[bsCellTooltip]", inputs: { canShow: ["bsCellTooltip", "canShow"], message: "message", tooltipClass: "tooltipClass", showDelay: "showDelay", hideDelay: "hideDelay" }, exportAs: ["bsCellTooltip"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridCellTooltipDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[bsCellTooltip]', exportAs: 'bsCellTooltip' }]
        }], ctorParameters: function () { return [{ type: i1.PblNgridComponent }, { type: i0.Injector }, { type: i1.PblNgridPluginController }]; }, propDecorators: { canShow: [{
                type: Input,
                args: ['bsCellTooltip']
            }], message: [{
                type: Input
            }], tooltipClass: [{
                type: Input
            }], showDelay: [{
                type: Input
            }], hideDelay: [{
                type: Input
            }] } });

class PblNgridBsCellTooltipModule {
    constructor(parentModule, configService) {
        if (parentModule) {
            return;
        }
        PblNgridPluginController.created
            .subscribe(event => {
            // Do not remove the explicit reference to `PblNgridCellTooltipDirective`
            // We use `PblNgridCellTooltipDirective.PLUGIN_KEY` to create a direct reference to `PblNgridCellTooltipDirective`
            // which will disable dead code elimination for the `PblNgridCellTooltipDirective` plugin.
            // If it is not set, using the plugin will only work when it is used in templates, other wise, if used programmatically (`autoSetAll`)
            // CLI prod builds will remove the plugin's code.
            const cellTooltipConfig = configService.get(PblNgridCellTooltipDirective.PLUGIN_KEY);
            if (cellTooltipConfig && cellTooltipConfig.autoSetAll === true) {
                const pluginCtrl = event.controller;
                pluginCtrl.onInit()
                    .subscribe(evt => pluginCtrl.ensurePlugin(PblNgridCellTooltipDirective.PLUGIN_KEY));
            }
        });
    }
}
PblNgridBsCellTooltipModule.NGRID_PLUGIN = ngridPlugin({ id: PLUGIN_KEY, factory: 'create' }, PblNgridCellTooltipDirective);
/** @nocollapse */ PblNgridBsCellTooltipModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridBsCellTooltipModule, deps: [{ token: PblNgridBsCellTooltipModule, optional: true, skipSelf: true }, { token: i1$1.PblNgridConfigService }], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ PblNgridBsCellTooltipModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridBsCellTooltipModule, declarations: [PblNgridCellTooltipDirective], imports: [CommonModule, NgbTooltipModule, PblNgridModule, PblNgridTargetEventsModule], exports: [PblNgridCellTooltipDirective, NgbTooltipModule] });
/** @nocollapse */ PblNgridBsCellTooltipModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridBsCellTooltipModule, imports: [[CommonModule, NgbTooltipModule, PblNgridModule, PblNgridTargetEventsModule], NgbTooltipModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridBsCellTooltipModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, NgbTooltipModule, PblNgridModule, PblNgridTargetEventsModule],
                    declarations: [PblNgridCellTooltipDirective],
                    exports: [PblNgridCellTooltipDirective, NgbTooltipModule],
                }]
        }], ctorParameters: function () { return [{ type: PblNgridBsCellTooltipModule, decorators: [{
                    type: Optional
                }, {
                    type: SkipSelf
                }] }, { type: i1$1.PblNgridConfigService }]; } });

/**
 * Generated bundle index. Do not edit.
 */

export { PblNgridBsCellTooltipModule, PblNgridCellTooltipDirective };
//# sourceMappingURL=pebula-ngrid-bootstrap-cell-tooltip.js.map
