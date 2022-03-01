import { Directive, ElementRef, Injector, Input, NgZone, ViewContainerRef, Renderer2, ComponentFactoryResolver, ChangeDetectorRef, ApplicationRef, } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { NgbTooltip, NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { unrx, PblNgridConfigService } from '@pebula/ngrid/core';
import { PblNgridComponent, PblNgridPluginController } from '@pebula/ngrid';
import * as i0 from "@angular/core";
import * as i1 from "@pebula/ngrid";
export const PLUGIN_KEY = 'bsCellTooltip';
const DEFAULT_OPTIONS = {
    canShow: (event) => {
        const element = (event.cellTarget.firstElementChild || event.cellTarget);
        return element.scrollWidth > element.offsetWidth;
    },
    message: (event) => {
        return event.cellTarget.innerText;
    }
};
export class PblNgridCellTooltipDirective {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC10b29sdGlwLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmdyaWQtYm9vdHN0cmFwL2NlbGwtdG9vbHRpcC9zcmMvbGliL2NlbGwtdG9vbHRpcC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsUUFBUSxFQUVSLEtBQUssRUFDTCxNQUFNLEVBQ04sZ0JBQWdCLEVBQ2hCLFNBQVMsRUFDVCx3QkFBd0IsRUFDeEIsaUJBQWlCLEVBQ2pCLGNBQWMsR0FDZixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFM0MsT0FBTyxFQUFnQixxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzVFLE9BQU8sRUFBRSxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUUxRSxPQUFPLEVBQUUsSUFBSSxFQUFFLHFCQUFxQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDakUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLHdCQUF3QixFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFxQjVFLE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBb0IsZUFBZSxDQUFDO0FBRTNELE1BQU0sZUFBZSxHQUF1QjtJQUMxQyxPQUFPLEVBQUUsQ0FBQyxLQUE2QixFQUFXLEVBQUU7UUFDbEQsTUFBTSxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLGlCQUFpQixJQUFJLEtBQUssQ0FBQyxVQUFVLENBQWdCLENBQUM7UUFDeEYsT0FBTyxPQUFPLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUM7SUFDbkQsQ0FBQztJQUNELE9BQU8sRUFBRSxDQUFDLEtBQTZCLEVBQVUsRUFBRTtRQUNqRCxPQUFPLEtBQUssQ0FBQyxVQUFVLENBQUMsU0FB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RyxJQUFJLENBQUMsWUFBWSxDQUFDO2FBQy9DO1lBQ0QsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsRUFBRTtnQkFDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQzthQUN6QztZQUNELElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7YUFDMUM7WUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3JCO0lBQ0gsQ0FBQztJQUVPLFNBQVMsQ0FBQyxLQUEyQjtRQUMzQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVPLFdBQVc7UUFDakIsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDckIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUMzQixJQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztTQUMxQjtJQUNILENBQUM7O0FBeEhlLHVDQUFVLEdBQW9CLFVBQVUsQ0FBQzs0SUFEOUMsNEJBQTRCO2dJQUE1Qiw0QkFBNEI7MkZBQTVCLDRCQUE0QjtrQkFEeEMsU0FBUzttQkFBQyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFO3NLQUt2QyxPQUFPO3NCQUFsQyxLQUFLO3VCQUFDLGVBQWU7Z0JBVWIsT0FBTztzQkFBZixLQUFLO2dCQUVHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBJbmplY3RvcixcbiAgT25EZXN0cm95LFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBSZW5kZXJlcjIsXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIEFwcGxpY2F0aW9uUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgTmdiVG9vbHRpcCwgTmdiVG9vbHRpcENvbmZpZyB9IGZyb20gJ0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwJztcblxuaW1wb3J0IHsgdW5yeCwgUGJsTmdyaWRDb25maWdTZXJ2aWNlIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZC9jb3JlJztcbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50LCBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIgfSBmcm9tICdAcGVidWxhL25ncmlkJztcbmltcG9ydCB7IFBibE5ncmlkQ2VsbEV2ZW50IH0gZnJvbSAnQHBlYnVsYS9uZ3JpZC90YXJnZXQtZXZlbnRzJztcblxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvY29yZS9saWIvY29uZmlndXJhdGlvbi90eXBlJyB7XG4gIGludGVyZmFjZSBQYmxOZ3JpZENvbmZpZyB7XG4gICAgYnNDZWxsVG9vbHRpcD86IENlbGxUb29sdGlwT3B0aW9ucyAmIHtcbiAgICAgIC8qKiBXaGVuIHNldCB0byB0cnVlIHdpbGwgYXBwbHkgdGhlIGRlZmF1bHQgY2VsbCB0b29sdGlwIHRvIEFMTCB0YWJsZXMgKi9cbiAgICAgIGF1dG9TZXRBbGw/OiBib29sZWFuO1xuICAgIH07XG4gIH1cbn1cblxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvbGliL2V4dC90eXBlcycge1xuICBpbnRlcmZhY2UgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb24ge1xuICAgIGJzQ2VsbFRvb2x0aXA/OiBQYmxOZ3JpZENlbGxUb29sdGlwRGlyZWN0aXZlPGFueT47XG4gIH1cbiAgaW50ZXJmYWNlIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uRmFjdG9yaWVzIHtcbiAgICBic0NlbGxUb29sdGlwOiBrZXlvZiB0eXBlb2YgUGJsTmdyaWRDZWxsVG9vbHRpcERpcmVjdGl2ZTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgUExVR0lOX0tFWTogJ2JzQ2VsbFRvb2x0aXAnID0gJ2JzQ2VsbFRvb2x0aXAnO1xuXG5jb25zdCBERUZBVUxUX09QVElPTlM6IENlbGxUb29sdGlwT3B0aW9ucyA9IHtcbiAgY2FuU2hvdzogKGV2ZW50OiBQYmxOZ3JpZENlbGxFdmVudDxhbnk+KTogYm9vbGVhbiA9PiB7XG4gICAgY29uc3QgZWxlbWVudCA9IChldmVudC5jZWxsVGFyZ2V0LmZpcnN0RWxlbWVudENoaWxkIHx8IGV2ZW50LmNlbGxUYXJnZXQpIGFzIEhUTUxFbGVtZW50O1xuICAgIHJldHVybiBlbGVtZW50LnNjcm9sbFdpZHRoID4gZWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgfSxcbiAgbWVzc2FnZTogKGV2ZW50OiBQYmxOZ3JpZENlbGxFdmVudDxhbnk+KTogc3RyaW5nID0+IHtcbiAgICByZXR1cm4gZXZlbnQuY2VsbFRhcmdldC5pbm5lclRleHQ7XG4gIH1cbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2VsbFRvb2x0aXBPcHRpb25zIHtcbiAgY2FuU2hvdz86IGJvb2xlYW4gfCAoIChldmVudDogUGJsTmdyaWRDZWxsRXZlbnQ8YW55PikgPT4gYm9vbGVhbiApO1xuICBtZXNzYWdlPzogKGV2ZW50OiBQYmxOZ3JpZENlbGxFdmVudDxhbnk+KSA9PiBzdHJpbmc7XG59XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tic0NlbGxUb29sdGlwXScsIGV4cG9ydEFzOiAnYnNDZWxsVG9vbHRpcCcgfSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZENlbGxUb29sdGlwRGlyZWN0aXZlPFQ+IGltcGxlbWVudHMgQ2VsbFRvb2x0aXBPcHRpb25zLCBPbkRlc3Ryb3kge1xuICBzdGF0aWMgcmVhZG9ubHkgUExVR0lOX0tFWTogJ2JzQ2VsbFRvb2x0aXAnID0gUExVR0lOX0tFWTtcblxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8taW5wdXQtcmVuYW1lXG4gIEBJbnB1dCgnYnNDZWxsVG9vbHRpcCcpIHNldCBjYW5TaG93KHZhbHVlOiBib29sZWFuIHwgKCAoZXZlbnQ6IFBibE5ncmlkQ2VsbEV2ZW50PFQ+KSA9PiBib29sZWFuICkpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLl9jYW5TaG93ID0gdmFsdWU7XG4gICAgfSBlbHNlIGlmICggKHZhbHVlIGFzIGFueSkgPT09ICcnKSB7XG4gICAgICB0aGlzLl9jYW5TaG93ID0gdW5kZWZpbmVkO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9jYW5TaG93ID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKSA/IGUgPT4gdHJ1ZSA6IGUgPT4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCkgbWVzc2FnZTogKGV2ZW50OiBQYmxOZ3JpZENlbGxFdmVudDxUPikgPT4gc3RyaW5nO1xuXG4gIEBJbnB1dCgpIHRvb2x0aXBDbGFzczogc3RyaW5nO1xuICBASW5wdXQoKSBzaG93RGVsYXk6IG51bWJlcjtcbiAgQElucHV0KCkgaGlkZURlbGF5OiBudW1iZXI7XG5cbiAgcHJpdmF0ZSBpbml0QXJnczogWyBSZW5kZXJlcjIsIEluamVjdG9yLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIFZpZXdDb250YWluZXJSZWYsIE5nYlRvb2x0aXBDb25maWcsIE5nWm9uZSwgYW55LCBDaGFuZ2VEZXRlY3RvclJlZiwgQXBwbGljYXRpb25SZWYgXTtcblxuICBwcml2YXRlIHRvb2xUaXA6IE5nYlRvb2x0aXA7XG4gIHByaXZhdGUgbGFzdENvbmZpZzogQ2VsbFRvb2x0aXBPcHRpb25zO1xuICBwcml2YXRlIF9yZW1vdmVQbHVnaW46ICh0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55PikgPT4gdm9pZDtcbiAgcHJpdmF0ZSBfY2FuU2hvdzogKGV2ZW50OiBQYmxOZ3JpZENlbGxFdmVudDxUPikgPT4gYm9vbGVhbjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvciwgcGx1Z2luQ3RybDogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyKSB7XG4gICAgdGhpcy5fcmVtb3ZlUGx1Z2luID0gcGx1Z2luQ3RybC5zZXRQbHVnaW4oUExVR0lOX0tFWSwgdGhpcyk7XG5cbiAgICBjb25zdCBjb25maWdTZXJ2aWNlID0gaW5qZWN0b3IuZ2V0KFBibE5ncmlkQ29uZmlnU2VydmljZSk7XG5cbiAgICB0aGlzLmluaXRBcmdzID0gW1xuICAgICAgaW5qZWN0b3IuZ2V0KFJlbmRlcmVyMiksXG4gICAgICBpbmplY3RvcixcbiAgICAgIGluamVjdG9yLmdldChDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpLFxuICAgICAgaW5qZWN0b3IuZ2V0KFZpZXdDb250YWluZXJSZWYpLFxuICAgICAgaW5qZWN0b3IuZ2V0KE5nYlRvb2x0aXBDb25maWcpLFxuICAgICAgaW5qZWN0b3IuZ2V0KE5nWm9uZSksXG4gICAgICBpbmplY3Rvci5nZXQoRE9DVU1FTlQpLFxuICAgICAgaW5qZWN0b3IuZ2V0KENoYW5nZURldGVjdG9yUmVmKSxcbiAgICAgIGluamVjdG9yLmdldChBcHBsaWNhdGlvblJlZiksXG4gICAgXTtcblxuICAgIGNvbmZpZ1NlcnZpY2Uub25VcGRhdGUoJ2JzQ2VsbFRvb2x0aXAnKVxuICAgICAgLnBpcGUodW5yeCh0aGlzKSlcbiAgICAgIC5zdWJzY3JpYmUoIGNmZyA9PiB0aGlzLmxhc3RDb25maWcgPSBjZmcuY3VyciApO1xuXG4gICAgcGx1Z2luQ3RybC5vbkluaXQoKS5zdWJzY3JpYmUoICgpID0+IHRoaXMuaW5pdChwbHVnaW5DdHJsKSApO1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZTxUID0gYW55Pih0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55PiwgaW5qZWN0b3I6IEluamVjdG9yKTogUGJsTmdyaWRDZWxsVG9vbHRpcERpcmVjdGl2ZTxUPiB7XG4gICAgcmV0dXJuIG5ldyBQYmxOZ3JpZENlbGxUb29sdGlwRGlyZWN0aXZlPFQ+KHRhYmxlLCBpbmplY3RvciwgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLmZpbmQodGFibGUpKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZVBsdWdpbih0aGlzLnRhYmxlKTtcbiAgICB0aGlzLmtpbGxUb29sdGlwKCk7XG4gICAgdW5yeC5raWxsKHRoaXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0KHBsdWdpbkN0cmw6IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcik6IHZvaWQge1xuICAgIC8vIERlcGVuZHMgb24gdGFyZ2V0LWV2ZW50cyBwbHVnaW5cbiAgICAvLyBpZiBpdCdzIG5vdCBzZXQsIGNyZWF0ZSBpdC5cbiAgICBjb25zdCB0YXJnZXRFdmVudHNQbHVnaW4gPSBwbHVnaW5DdHJsLmdldFBsdWdpbigndGFyZ2V0RXZlbnRzJykgfHwgcGx1Z2luQ3RybC5jcmVhdGVQbHVnaW4oJ3RhcmdldEV2ZW50cycpO1xuICAgIHRhcmdldEV2ZW50c1BsdWdpbi5jZWxsRW50ZXJcbiAgICAgIC5waXBlKHVucngodGhpcykpXG4gICAgICAuc3Vic2NyaWJlKCBldmVudCA9PiB0aGlzLmNlbGxFbnRlcihldmVudCkgKTtcblxuICAgIHRhcmdldEV2ZW50c1BsdWdpbi5jZWxsTGVhdmVcbiAgICAgIC5waXBlKHVucngodGhpcykpXG4gICAgICAuc3Vic2NyaWJlKCBldmVudCA9PiB0aGlzLmNlbGxMZWF2ZShldmVudCkgKTtcbiAgfVxuXG4gIHByaXZhdGUgY2VsbEVudGVyKGV2ZW50OiBQYmxOZ3JpZENlbGxFdmVudDxUPik6IHZvaWQge1xuICAgIHRoaXMua2lsbFRvb2x0aXAoKTtcblxuICAgIGlmICghdGhpcy5fY2FuU2hvdykge1xuICAgICAgLy8gVE9ETzogdGhpcyB3aWxsIHNldCBsYXN0Q29uZmlnIC8gZGVmYXVsdCBvcHRpb24gb25jZVxuICAgICAgLy8gYnV0IGlmIHVzZXIgY2hhbmdlcyBsYXN0Q29uZmlnIGl0IHdpbGwgbmV2ZXIgdXBkYXRlIGFnYWluLi4uXG4gICAgICB0aGlzLmNhblNob3cgPSAodGhpcy5sYXN0Q29uZmlnICYmIHRoaXMubGFzdENvbmZpZy5jYW5TaG93KSB8fCBERUZBVUxUX09QVElPTlMuY2FuU2hvdztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fY2FuU2hvdyhldmVudCkpIHtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMuaW5pdEFyZ3Muc2xpY2UoKSBhcyBQYmxOZ3JpZENlbGxUb29sdGlwRGlyZWN0aXZlPGFueT5bJ2luaXRBcmdzJ107XG5cbiAgICAgIHRoaXMudG9vbFRpcCA9IG5ldyBOZ2JUb29sdGlwKFxuICAgICAgICBuZXcgRWxlbWVudFJlZjxhbnk+KGV2ZW50LmNlbGxUYXJnZXQpLFxuICAgICAgICAuLi5wYXJhbXMsXG4gICAgICApO1xuXG4gICAgICB0aGlzLnRvb2xUaXAuY29udGFpbmVyID0gJ2JvZHknO1xuICAgICAgY29uc3QgbWVzc2FnZSA9IHRoaXMubWVzc2FnZSB8fCAodGhpcy5sYXN0Q29uZmlnICYmIHRoaXMubGFzdENvbmZpZy5tZXNzYWdlKSB8fCBERUZBVUxUX09QVElPTlMubWVzc2FnZTtcbiAgICAgIHRoaXMudG9vbFRpcC5uZ2JUb29sdGlwID0gbWVzc2FnZShldmVudCk7XG5cbiAgICAgIC8vIGlmICh0aGlzLnBvc2l0aW9uKSB7XG4gICAgICAvLyAgIHRoaXMudG9vbFRpcC5wb3NpdGlvbiA9IHRoaXMucG9zaXRpb247XG4gICAgICAvLyB9XG4gICAgICBpZiAodGhpcy50b29sdGlwQ2xhc3MpIHtcbiAgICAgICAgdGhpcy50b29sVGlwLnRvb2x0aXBDbGFzcyA9IHRoaXMudG9vbHRpcENsYXNzO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuc2hvd0RlbGF5ID49IDApIHtcbiAgICAgICAgdGhpcy50b29sVGlwLm9wZW5EZWxheSA9IHRoaXMuc2hvd0RlbGF5O1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuaGlkZURlbGF5ID49IDApIHtcbiAgICAgICAgdGhpcy50b29sVGlwLmNsb3NlRGVsYXkgPSB0aGlzLmhpZGVEZWxheTtcbiAgICAgIH1cbiAgICAgIHRoaXMudG9vbFRpcC5vcGVuKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjZWxsTGVhdmUoZXZlbnQ6IFBibE5ncmlkQ2VsbEV2ZW50PFQ+KTogdm9pZCB7XG4gICAgdGhpcy5raWxsVG9vbHRpcCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBraWxsVG9vbHRpcCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy50b29sVGlwKSB7XG4gICAgICB0aGlzLnRvb2xUaXAuY2xvc2UoKTtcbiAgICAgIHRoaXMudG9vbFRpcC5uZ09uRGVzdHJveSgpO1xuICAgICAgdGhpcy50b29sVGlwID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9jYW5TaG93OiBCb29sZWFuSW5wdXQ7XG59XG4iXX0=