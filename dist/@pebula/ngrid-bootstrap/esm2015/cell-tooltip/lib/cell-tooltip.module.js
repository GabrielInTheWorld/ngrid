import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { PblNgridConfigService } from '@pebula/ngrid/core';
import { PblNgridModule, PblNgridPluginController, ngridPlugin } from '@pebula/ngrid';
import { PblNgridTargetEventsModule } from '@pebula/ngrid/target-events';
import { PblNgridCellTooltipDirective, PLUGIN_KEY } from './cell-tooltip.directive';
import * as i0 from "@angular/core";
import * as i1 from "@pebula/ngrid/core";
export class PblNgridBsCellTooltipModule {
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
/** @nocollapse */ PblNgridBsCellTooltipModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridBsCellTooltipModule, deps: [{ token: PblNgridBsCellTooltipModule, optional: true, skipSelf: true }, { token: i1.PblNgridConfigService }], target: i0.ɵɵFactoryTarget.NgModule });
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
                }] }, { type: i1.PblNgridConfigService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC10b29sdGlwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmdyaWQtYm9vdHN0cmFwL2NlbGwtdG9vbHRpcC9zcmMvbGliL2NlbGwtdG9vbHRpcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUU5RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUsY0FBYyxFQUFFLHdCQUF3QixFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0RixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUV6RSxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsVUFBVSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7OztBQU9wRixNQUFNLE9BQU8sMkJBQTJCO0lBR3RDLFlBQW9DLFlBQXlDLEVBQ2pFLGFBQW9DO1FBQzlDLElBQUksWUFBWSxFQUFFO1lBQ2hCLE9BQU87U0FDUjtRQUVELHdCQUF3QixDQUFDLE9BQU87YUFDN0IsU0FBUyxDQUFFLEtBQUssQ0FBQyxFQUFFO1lBQ2xCLHlFQUF5RTtZQUN6RSxrSEFBa0g7WUFDbEgsMEZBQTBGO1lBQzFGLHNJQUFzSTtZQUN0SSxpREFBaUQ7WUFDakQsTUFBTSxpQkFBaUIsR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3JGLElBQUksaUJBQWlCLElBQUksaUJBQWlCLENBQUMsVUFBVSxLQUFLLElBQUksRUFBRTtnQkFDOUQsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQztnQkFDcEMsVUFBVSxDQUFDLE1BQU0sRUFBRTtxQkFDbEIsU0FBUyxDQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyw0QkFBNEIsQ0FBQyxVQUFVLENBQUMsQ0FBRSxDQUFDO2FBQ3ZGO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDOztBQXRCZSx3Q0FBWSxHQUFHLFdBQVcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxFQUFFLDRCQUE0QixDQUFDLENBQUM7MklBRHJHLDJCQUEyQixrQkFHWSwyQkFBMkI7NElBSGxFLDJCQUEyQixpQkFIdEIsNEJBQTRCLGFBRGpDLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLEVBQUUsMEJBQTBCLGFBRTFFLDRCQUE0QixFQUFFLGdCQUFnQjs0SUFFOUMsMkJBQTJCLFlBSjdCLENBQUUsWUFBWSxFQUFFLGdCQUFnQixFQUFFLGNBQWMsRUFBRSwwQkFBMEIsQ0FBRSxFQUU5QyxnQkFBZ0I7MkZBRTlDLDJCQUEyQjtrQkFMdkMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBRSxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxFQUFFLDBCQUEwQixDQUFFO29CQUN2RixZQUFZLEVBQUUsQ0FBRSw0QkFBNEIsQ0FBRTtvQkFDOUMsT0FBTyxFQUFFLENBQUUsNEJBQTRCLEVBQUUsZ0JBQWdCLENBQUU7aUJBQzVEOzBEQUltRCwyQkFBMkI7MEJBQWhFLFFBQVE7OzBCQUFJLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgT3B0aW9uYWwsIFNraXBTZWxmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdiVG9vbHRpcE1vZHVsZSB9IGZyb20gJ0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwJztcblxuaW1wb3J0IHsgUGJsTmdyaWRDb25maWdTZXJ2aWNlIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZC9jb3JlJztcbmltcG9ydCB7IFBibE5ncmlkTW9kdWxlLCBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsIG5ncmlkUGx1Z2luIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5pbXBvcnQgeyBQYmxOZ3JpZFRhcmdldEV2ZW50c01vZHVsZSB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQvdGFyZ2V0LWV2ZW50cyc7XG5cbmltcG9ydCB7IFBibE5ncmlkQ2VsbFRvb2x0aXBEaXJlY3RpdmUsIFBMVUdJTl9LRVkgfSBmcm9tICcuL2NlbGwtdG9vbHRpcC5kaXJlY3RpdmUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbIENvbW1vbk1vZHVsZSwgTmdiVG9vbHRpcE1vZHVsZSwgUGJsTmdyaWRNb2R1bGUsIFBibE5ncmlkVGFyZ2V0RXZlbnRzTW9kdWxlIF0sXG4gIGRlY2xhcmF0aW9uczogWyBQYmxOZ3JpZENlbGxUb29sdGlwRGlyZWN0aXZlIF0sXG4gIGV4cG9ydHM6IFsgUGJsTmdyaWRDZWxsVG9vbHRpcERpcmVjdGl2ZSwgTmdiVG9vbHRpcE1vZHVsZSBdLFxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZEJzQ2VsbFRvb2x0aXBNb2R1bGUge1xuICBzdGF0aWMgcmVhZG9ubHkgTkdSSURfUExVR0lOID0gbmdyaWRQbHVnaW4oeyBpZDogUExVR0lOX0tFWSwgZmFjdG9yeTogJ2NyZWF0ZScgfSwgUGJsTmdyaWRDZWxsVG9vbHRpcERpcmVjdGl2ZSk7XG5cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcGFyZW50TW9kdWxlOiBQYmxOZ3JpZEJzQ2VsbFRvb2x0aXBNb2R1bGUsXG4gICAgICAgICAgICAgIGNvbmZpZ1NlcnZpY2U6IFBibE5ncmlkQ29uZmlnU2VydmljZSkge1xuICAgIGlmIChwYXJlbnRNb2R1bGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIuY3JlYXRlZFxuICAgICAgLnN1YnNjcmliZSggZXZlbnQgPT4ge1xuICAgICAgICAvLyBEbyBub3QgcmVtb3ZlIHRoZSBleHBsaWNpdCByZWZlcmVuY2UgdG8gYFBibE5ncmlkQ2VsbFRvb2x0aXBEaXJlY3RpdmVgXG4gICAgICAgIC8vIFdlIHVzZSBgUGJsTmdyaWRDZWxsVG9vbHRpcERpcmVjdGl2ZS5QTFVHSU5fS0VZYCB0byBjcmVhdGUgYSBkaXJlY3QgcmVmZXJlbmNlIHRvIGBQYmxOZ3JpZENlbGxUb29sdGlwRGlyZWN0aXZlYFxuICAgICAgICAvLyB3aGljaCB3aWxsIGRpc2FibGUgZGVhZCBjb2RlIGVsaW1pbmF0aW9uIGZvciB0aGUgYFBibE5ncmlkQ2VsbFRvb2x0aXBEaXJlY3RpdmVgIHBsdWdpbi5cbiAgICAgICAgLy8gSWYgaXQgaXMgbm90IHNldCwgdXNpbmcgdGhlIHBsdWdpbiB3aWxsIG9ubHkgd29yayB3aGVuIGl0IGlzIHVzZWQgaW4gdGVtcGxhdGVzLCBvdGhlciB3aXNlLCBpZiB1c2VkIHByb2dyYW1tYXRpY2FsbHkgKGBhdXRvU2V0QWxsYClcbiAgICAgICAgLy8gQ0xJIHByb2QgYnVpbGRzIHdpbGwgcmVtb3ZlIHRoZSBwbHVnaW4ncyBjb2RlLlxuICAgICAgICBjb25zdCBjZWxsVG9vbHRpcENvbmZpZyA9IGNvbmZpZ1NlcnZpY2UuZ2V0KFBibE5ncmlkQ2VsbFRvb2x0aXBEaXJlY3RpdmUuUExVR0lOX0tFWSk7XG4gICAgICAgIGlmIChjZWxsVG9vbHRpcENvbmZpZyAmJiBjZWxsVG9vbHRpcENvbmZpZy5hdXRvU2V0QWxsID09PSB0cnVlKSB7XG4gICAgICAgICAgY29uc3QgcGx1Z2luQ3RybCA9IGV2ZW50LmNvbnRyb2xsZXI7XG4gICAgICAgICAgcGx1Z2luQ3RybC5vbkluaXQoKVxuICAgICAgICAgIC5zdWJzY3JpYmUoIGV2dCA9PiBwbHVnaW5DdHJsLmVuc3VyZVBsdWdpbihQYmxOZ3JpZENlbGxUb29sdGlwRGlyZWN0aXZlLlBMVUdJTl9LRVkpICk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG59XG4iXX0=