import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PblNgridConfigService } from '@pebula/ngrid/core';
import { PblNgridPluginController, PblNgridModule, ngridPlugin } from '@pebula/ngrid';
import { registerBuiltInHandlers } from './core/built-in-handlers/_register';
import { PblNgridStatePlugin, PblNgridStatePluginDirective, PLUGIN_KEY } from './state-plugin';
import * as i0 from "@angular/core";
import * as i1 from "@pebula/ngrid/core";
export class PblNgridStatePluginModule {
    constructor(configService) {
        PblNgridPluginController.onCreatedSafe(PblNgridStatePluginModule, (grid, controller) => {
            const targetEventsConfig = configService.get(PLUGIN_KEY);
            if (targetEventsConfig && targetEventsConfig.autoEnable === true) {
                controller.onInit()
                    .subscribe(() => {
                    if (!controller.hasPlugin(PLUGIN_KEY)) {
                        const instance = controller.createPlugin(PLUGIN_KEY);
                        if (targetEventsConfig.autoEnableOptions) {
                            instance.loadOptions = targetEventsConfig.autoEnableOptions.loadOptions;
                            instance.saveOptions = targetEventsConfig.autoEnableOptions.saveOptions;
                        }
                    }
                });
            }
        });
    }
}
PblNgridStatePluginModule.NGRID_PLUGIN = ngridPlugin({ id: PLUGIN_KEY, factory: 'create', runOnce: registerBuiltInHandlers }, PblNgridStatePlugin);
/** @nocollapse */ PblNgridStatePluginModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridStatePluginModule, deps: [{ token: i1.PblNgridConfigService }], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ PblNgridStatePluginModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridStatePluginModule, declarations: [PblNgridStatePluginDirective], imports: [CommonModule,
        PblNgridModule], exports: [PblNgridStatePluginDirective] });
/** @nocollapse */ PblNgridStatePluginModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridStatePluginModule, providers: [], imports: [[
            CommonModule,
            PblNgridModule,
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridStatePluginModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        PblNgridModule,
                    ],
                    declarations: [
                        PblNgridStatePluginDirective,
                    ],
                    exports: [
                        PblNgridStatePluginDirective,
                    ],
                    providers: [],
                }]
        }], ctorParameters: function () { return [{ type: i1.PblNgridConfigService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdyaWQtc3RhdGUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3JpZC9zdGF0ZS9zcmMvbGliL25ncmlkLXN0YXRlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsY0FBYyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV0RixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUM3RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsNEJBQTRCLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQWUvRixNQUFNLE9BQU8seUJBQXlCO0lBSXBDLFlBQVksYUFBb0M7UUFDOUMsd0JBQXdCLENBQUMsYUFBYSxDQUNwQyx5QkFBeUIsRUFDekIsQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQUU7WUFDbkIsTUFBTSxrQkFBa0IsR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3pELElBQUksa0JBQWtCLElBQUksa0JBQWtCLENBQUMsVUFBVSxLQUFLLElBQUksRUFBRTtnQkFDaEUsVUFBVSxDQUFDLE1BQU0sRUFBRTtxQkFDaEIsU0FBUyxDQUFDLEdBQUcsRUFBRTtvQkFDZCxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsRUFBRTt3QkFDckMsTUFBTSxRQUFRLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQzt3QkFDckQsSUFBSSxrQkFBa0IsQ0FBQyxpQkFBaUIsRUFBRTs0QkFDeEMsUUFBUSxDQUFDLFdBQVcsR0FBRyxrQkFBa0IsQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUM7NEJBQ3hFLFFBQVEsQ0FBQyxXQUFXLEdBQUcsa0JBQWtCLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDO3lCQUN6RTtxQkFDRjtnQkFDSCxDQUFDLENBQUMsQ0FBQzthQUNOO1FBQ0gsQ0FBQyxDQUNGLENBQUM7SUFDSixDQUFDOztBQXJCZSxzQ0FBWSxHQUFHLFdBQVcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO3lJQUY5SCx5QkFBeUI7MElBQXpCLHlCQUF5QixpQkFQbEMsNEJBQTRCLGFBSjVCLFlBQVk7UUFDWixjQUFjLGFBTWQsNEJBQTRCOzBJQUluQix5QkFBeUIsYUFGekIsRUFBRyxZQVZMO1lBQ1AsWUFBWTtZQUNaLGNBQWM7U0FDZjsyRkFTVSx5QkFBeUI7a0JBYnJDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osY0FBYztxQkFDZjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1osNEJBQTRCO3FCQUM3QjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsNEJBQTRCO3FCQUM3QjtvQkFDRCxTQUFTLEVBQUUsRUFBRztpQkFDZiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUGJsTmdyaWRDb25maWdTZXJ2aWNlIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZC9jb3JlJztcbmltcG9ydCB7IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlciwgUGJsTmdyaWRNb2R1bGUsIG5ncmlkUGx1Z2luIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5cbmltcG9ydCB7IHJlZ2lzdGVyQnVpbHRJbkhhbmRsZXJzIH0gZnJvbSAnLi9jb3JlL2J1aWx0LWluLWhhbmRsZXJzL19yZWdpc3Rlcic7XG5pbXBvcnQgeyBQYmxOZ3JpZFN0YXRlUGx1Z2luLCBQYmxOZ3JpZFN0YXRlUGx1Z2luRGlyZWN0aXZlLCBQTFVHSU5fS0VZIH0gZnJvbSAnLi9zdGF0ZS1wbHVnaW4nO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFBibE5ncmlkTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBQYmxOZ3JpZFN0YXRlUGx1Z2luRGlyZWN0aXZlLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgUGJsTmdyaWRTdGF0ZVBsdWdpbkRpcmVjdGl2ZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbIF0sXG59KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkU3RhdGVQbHVnaW5Nb2R1bGUge1xuXG4gIHN0YXRpYyByZWFkb25seSBOR1JJRF9QTFVHSU4gPSBuZ3JpZFBsdWdpbih7IGlkOiBQTFVHSU5fS0VZLCBmYWN0b3J5OiAnY3JlYXRlJywgcnVuT25jZTogcmVnaXN0ZXJCdWlsdEluSGFuZGxlcnMgfSwgUGJsTmdyaWRTdGF0ZVBsdWdpbik7XG5cbiAgY29uc3RydWN0b3IoY29uZmlnU2VydmljZTogUGJsTmdyaWRDb25maWdTZXJ2aWNlKSB7XG4gICAgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLm9uQ3JlYXRlZFNhZmUoXG4gICAgICBQYmxOZ3JpZFN0YXRlUGx1Z2luTW9kdWxlLFxuICAgICAgKGdyaWQsIGNvbnRyb2xsZXIpID0+IHtcbiAgICAgICAgY29uc3QgdGFyZ2V0RXZlbnRzQ29uZmlnID0gY29uZmlnU2VydmljZS5nZXQoUExVR0lOX0tFWSk7XG4gICAgICAgIGlmICh0YXJnZXRFdmVudHNDb25maWcgJiYgdGFyZ2V0RXZlbnRzQ29uZmlnLmF1dG9FbmFibGUgPT09IHRydWUpIHtcbiAgICAgICAgICBjb250cm9sbGVyLm9uSW5pdCgpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgaWYgKCFjb250cm9sbGVyLmhhc1BsdWdpbihQTFVHSU5fS0VZKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluc3RhbmNlID0gY29udHJvbGxlci5jcmVhdGVQbHVnaW4oUExVR0lOX0tFWSk7XG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldEV2ZW50c0NvbmZpZy5hdXRvRW5hYmxlT3B0aW9ucykge1xuICAgICAgICAgICAgICAgICAgaW5zdGFuY2UubG9hZE9wdGlvbnMgPSB0YXJnZXRFdmVudHNDb25maWcuYXV0b0VuYWJsZU9wdGlvbnMubG9hZE9wdGlvbnM7XG4gICAgICAgICAgICAgICAgICBpbnN0YW5jZS5zYXZlT3B0aW9ucyA9IHRhcmdldEV2ZW50c0NvbmZpZy5hdXRvRW5hYmxlT3B0aW9ucy5zYXZlT3B0aW9ucztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICk7XG4gIH1cbn1cbiJdfQ==