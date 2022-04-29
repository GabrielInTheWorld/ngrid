import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PblNgridConfigService } from '@pebula/ngrid/core';
import { PblNgridModule, PblNgridPluginController, ngridPlugin } from '@pebula/ngrid';
import { PblNgridTargetEventsModule } from '@pebula/ngrid/target-events';
import { PblNgridCellTooltipDirective, PLUGIN_KEY } from './cell-tooltip.directive';
import * as i0 from "@angular/core";
import * as i1 from "@pebula/ngrid/core";
export class PblNgridCellTooltipModule {
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
PblNgridCellTooltipModule.NGRID_PLUGIN = ngridPlugin({ id: PLUGIN_KEY, factory: 'create' }, PblNgridCellTooltipDirective);
/** @nocollapse */ PblNgridCellTooltipModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridCellTooltipModule, deps: [{ token: PblNgridCellTooltipModule, optional: true, skipSelf: true }, { token: i1.PblNgridConfigService }], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ PblNgridCellTooltipModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridCellTooltipModule, declarations: [PblNgridCellTooltipDirective], imports: [CommonModule, MatTooltipModule, OverlayModule, PblNgridModule, PblNgridTargetEventsModule], exports: [PblNgridCellTooltipDirective, MatTooltipModule] });
/** @nocollapse */ PblNgridCellTooltipModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridCellTooltipModule, imports: [[CommonModule, MatTooltipModule, OverlayModule, PblNgridModule, PblNgridTargetEventsModule], MatTooltipModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridCellTooltipModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, MatTooltipModule, OverlayModule, PblNgridModule, PblNgridTargetEventsModule],
                    declarations: [PblNgridCellTooltipDirective],
                    exports: [PblNgridCellTooltipDirective, MatTooltipModule],
                }]
        }], ctorParameters: function () { return [{ type: PblNgridCellTooltipModule, decorators: [{
                    type: Optional
                }, {
                    type: SkipSelf
                }] }, { type: i1.PblNgridConfigService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC10b29sdGlwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmdyaWQtbWF0ZXJpYWwvY2VsbC10b29sdGlwL3NyYy9saWIvY2VsbC10b29sdGlwLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUU3RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUsY0FBYyxFQUFFLHdCQUF3QixFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0RixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUV6RSxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsVUFBVSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7OztBQU9wRixNQUFNLE9BQU8seUJBQXlCO0lBR3BDLFlBQW9DLFlBQXVDLEVBQy9ELGFBQW9DO1FBQzlDLElBQUksWUFBWSxFQUFFO1lBQ2hCLE9BQU87U0FDUjtRQUVELHdCQUF3QixDQUFDLE9BQU87YUFDN0IsU0FBUyxDQUFFLEtBQUssQ0FBQyxFQUFFO1lBQ2xCLHlFQUF5RTtZQUN6RSxrSEFBa0g7WUFDbEgsMEZBQTBGO1lBQzFGLHNJQUFzSTtZQUN0SSxpREFBaUQ7WUFDakQsTUFBTSxpQkFBaUIsR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3JGLElBQUksaUJBQWlCLElBQUksaUJBQWlCLENBQUMsVUFBVSxLQUFLLElBQUksRUFBRTtnQkFDOUQsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQztnQkFDcEMsVUFBVSxDQUFDLE1BQU0sRUFBRTtxQkFDbEIsU0FBUyxDQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyw0QkFBNEIsQ0FBQyxVQUFVLENBQUMsQ0FBRSxDQUFDO2FBQ3ZGO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDOztBQXRCZSxzQ0FBWSxHQUFHLFdBQVcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxFQUFFLDRCQUE0QixDQUFDLENBQUM7eUlBRHJHLHlCQUF5QixrQkFHYyx5QkFBeUI7MElBSGhFLHlCQUF5QixpQkFIcEIsNEJBQTRCLGFBRGpDLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLDBCQUEwQixhQUV6Riw0QkFBNEIsRUFBRSxnQkFBZ0I7MElBRTlDLHlCQUF5QixZQUozQixDQUFFLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLDBCQUEwQixDQUFFLEVBRTdELGdCQUFnQjsyRkFFOUMseUJBQXlCO2tCQUxyQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFFLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLDBCQUEwQixDQUFFO29CQUN0RyxZQUFZLEVBQUUsQ0FBRSw0QkFBNEIsQ0FBRTtvQkFDOUMsT0FBTyxFQUFFLENBQUUsNEJBQTRCLEVBQUUsZ0JBQWdCLENBQUU7aUJBQzVEOzBEQUltRCx5QkFBeUI7MEJBQTlELFFBQVE7OzBCQUFJLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgT3B0aW9uYWwsIFNraXBTZWxmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgT3ZlcmxheU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IE1hdFRvb2x0aXBNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90b29sdGlwJztcblxuaW1wb3J0IHsgUGJsTmdyaWRDb25maWdTZXJ2aWNlIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZC9jb3JlJztcbmltcG9ydCB7IFBibE5ncmlkTW9kdWxlLCBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsIG5ncmlkUGx1Z2luIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5pbXBvcnQgeyBQYmxOZ3JpZFRhcmdldEV2ZW50c01vZHVsZSB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQvdGFyZ2V0LWV2ZW50cyc7XG5cbmltcG9ydCB7IFBibE5ncmlkQ2VsbFRvb2x0aXBEaXJlY3RpdmUsIFBMVUdJTl9LRVkgfSBmcm9tICcuL2NlbGwtdG9vbHRpcC5kaXJlY3RpdmUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbIENvbW1vbk1vZHVsZSwgTWF0VG9vbHRpcE1vZHVsZSwgT3ZlcmxheU1vZHVsZSwgUGJsTmdyaWRNb2R1bGUsIFBibE5ncmlkVGFyZ2V0RXZlbnRzTW9kdWxlIF0sXG4gIGRlY2xhcmF0aW9uczogWyBQYmxOZ3JpZENlbGxUb29sdGlwRGlyZWN0aXZlIF0sXG4gIGV4cG9ydHM6IFsgUGJsTmdyaWRDZWxsVG9vbHRpcERpcmVjdGl2ZSwgTWF0VG9vbHRpcE1vZHVsZSBdLFxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZENlbGxUb29sdGlwTW9kdWxlIHtcbiAgc3RhdGljIHJlYWRvbmx5IE5HUklEX1BMVUdJTiA9IG5ncmlkUGx1Z2luKHsgaWQ6IFBMVUdJTl9LRVksIGZhY3Rvcnk6ICdjcmVhdGUnIH0sIFBibE5ncmlkQ2VsbFRvb2x0aXBEaXJlY3RpdmUpO1xuXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIHBhcmVudE1vZHVsZTogUGJsTmdyaWRDZWxsVG9vbHRpcE1vZHVsZSxcbiAgICAgICAgICAgICAgY29uZmlnU2VydmljZTogUGJsTmdyaWRDb25maWdTZXJ2aWNlKSB7XG4gICAgaWYgKHBhcmVudE1vZHVsZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlci5jcmVhdGVkXG4gICAgICAuc3Vic2NyaWJlKCBldmVudCA9PiB7XG4gICAgICAgIC8vIERvIG5vdCByZW1vdmUgdGhlIGV4cGxpY2l0IHJlZmVyZW5jZSB0byBgUGJsTmdyaWRDZWxsVG9vbHRpcERpcmVjdGl2ZWBcbiAgICAgICAgLy8gV2UgdXNlIGBQYmxOZ3JpZENlbGxUb29sdGlwRGlyZWN0aXZlLlBMVUdJTl9LRVlgIHRvIGNyZWF0ZSBhIGRpcmVjdCByZWZlcmVuY2UgdG8gYFBibE5ncmlkQ2VsbFRvb2x0aXBEaXJlY3RpdmVgXG4gICAgICAgIC8vIHdoaWNoIHdpbGwgZGlzYWJsZSBkZWFkIGNvZGUgZWxpbWluYXRpb24gZm9yIHRoZSBgUGJsTmdyaWRDZWxsVG9vbHRpcERpcmVjdGl2ZWAgcGx1Z2luLlxuICAgICAgICAvLyBJZiBpdCBpcyBub3Qgc2V0LCB1c2luZyB0aGUgcGx1Z2luIHdpbGwgb25seSB3b3JrIHdoZW4gaXQgaXMgdXNlZCBpbiB0ZW1wbGF0ZXMsIG90aGVyIHdpc2UsIGlmIHVzZWQgcHJvZ3JhbW1hdGljYWxseSAoYGF1dG9TZXRBbGxgKVxuICAgICAgICAvLyBDTEkgcHJvZCBidWlsZHMgd2lsbCByZW1vdmUgdGhlIHBsdWdpbidzIGNvZGUuXG4gICAgICAgIGNvbnN0IGNlbGxUb29sdGlwQ29uZmlnID0gY29uZmlnU2VydmljZS5nZXQoUGJsTmdyaWRDZWxsVG9vbHRpcERpcmVjdGl2ZS5QTFVHSU5fS0VZKTtcbiAgICAgICAgaWYgKGNlbGxUb29sdGlwQ29uZmlnICYmIGNlbGxUb29sdGlwQ29uZmlnLmF1dG9TZXRBbGwgPT09IHRydWUpIHtcbiAgICAgICAgICBjb25zdCBwbHVnaW5DdHJsID0gZXZlbnQuY29udHJvbGxlcjtcbiAgICAgICAgICBwbHVnaW5DdHJsLm9uSW5pdCgpXG4gICAgICAgICAgLnN1YnNjcmliZSggZXZ0ID0+IHBsdWdpbkN0cmwuZW5zdXJlUGx1Z2luKFBibE5ncmlkQ2VsbFRvb2x0aXBEaXJlY3RpdmUuUExVR0lOX0tFWSkgKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cbn1cbiJdfQ==