import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PblNgridModule, PblNgridConfigService, PblNgridPluginController, ngridPlugin } from '@pebula/ngrid';
import { PblNgridTargetEventsModule } from '@pebula/ngrid/target-events';
import { PLUGIN_KEY, PblNgridClipboardPlugin } from './clipboard.plugin';
import * as i0 from "@angular/core";
import * as i1 from "@pebula/ngrid";
export class PblNgridClipboardPluginModule {
    constructor(configService) {
        PblNgridPluginController.onCreatedSafe(PblNgridClipboardPluginModule, (grid, controller) => {
            const config = configService.get(PLUGIN_KEY, {});
            if (config.autoEnable === true) {
                controller.onInit()
                    .subscribe(() => {
                    if (!controller.hasPlugin(PLUGIN_KEY)) {
                        controller.createPlugin(PLUGIN_KEY);
                    }
                });
            }
        });
    }
}
PblNgridClipboardPluginModule.NGRID_PLUGIN = ngridPlugin({ id: PLUGIN_KEY, factory: 'create' }, PblNgridClipboardPlugin);
/** @nocollapse */ PblNgridClipboardPluginModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridClipboardPluginModule, deps: [{ token: i1.PblNgridConfigService }], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ PblNgridClipboardPluginModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridClipboardPluginModule, declarations: [PblNgridClipboardPlugin], imports: [CommonModule, PblNgridModule, PblNgridTargetEventsModule], exports: [PblNgridClipboardPlugin] });
/** @nocollapse */ PblNgridClipboardPluginModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridClipboardPluginModule, imports: [[CommonModule, PblNgridModule, PblNgridTargetEventsModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridClipboardPluginModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, PblNgridModule, PblNgridTargetEventsModule],
                    declarations: [PblNgridClipboardPlugin],
                    exports: [PblNgridClipboardPlugin],
                }]
        }], ctorParameters: function () { return [{ type: i1.PblNgridConfigService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpcGJvYXJkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmdyaWQvY2xpcGJvYXJkL3NyYy9saWIvY2xpcGJvYXJkLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsY0FBYyxFQUFFLHFCQUFxQixFQUFFLHdCQUF3QixFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUV6RSxPQUFPLEVBQUUsVUFBVSxFQUFFLHVCQUF1QixFQUFFLE1BQU0sb0JBQW9CLENBQUM7OztBQU96RSxNQUFNLE9BQU8sNkJBQTZCO0lBSXhDLFlBQVksYUFBb0M7UUFDOUMsd0JBQXdCLENBQUMsYUFBYSxDQUNwQyw2QkFBNkIsRUFDN0IsQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQUU7WUFDbkIsTUFBTSxNQUFNLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDakQsSUFBSSxNQUFNLENBQUMsVUFBVSxLQUFLLElBQUksRUFBRTtnQkFDOUIsVUFBVSxDQUFDLE1BQU0sRUFBRTtxQkFDaEIsU0FBUyxDQUFDLEdBQUcsRUFBRTtvQkFDZCxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsRUFBRTt3QkFDckMsVUFBVSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztxQkFDckM7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7YUFDTjtRQUNILENBQUMsQ0FDRixDQUFDO0lBQ0osQ0FBQzs7QUFqQmUsMENBQVksR0FBRyxXQUFXLENBQUMsRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDOzZJQUZoRyw2QkFBNkI7OElBQTdCLDZCQUE2QixpQkFIeEIsdUJBQXVCLGFBRDVCLFlBQVksRUFBRSxjQUFjLEVBQUUsMEJBQTBCLGFBRXhELHVCQUF1Qjs4SUFFdkIsNkJBQTZCLFlBSi9CLENBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSwwQkFBMEIsQ0FBRTsyRkFJMUQsNkJBQTZCO2tCQUx6QyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFFLFlBQVksRUFBRSxjQUFjLEVBQUUsMEJBQTBCLENBQUU7b0JBQ3JFLFlBQVksRUFBRSxDQUFFLHVCQUF1QixDQUFFO29CQUN6QyxPQUFPLEVBQUUsQ0FBRSx1QkFBdUIsQ0FBRTtpQkFDckMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgUGJsTmdyaWRNb2R1bGUsIFBibE5ncmlkQ29uZmlnU2VydmljZSwgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLCBuZ3JpZFBsdWdpbiB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuaW1wb3J0IHsgUGJsTmdyaWRUYXJnZXRFdmVudHNNb2R1bGUgfSBmcm9tICdAcGVidWxhL25ncmlkL3RhcmdldC1ldmVudHMnO1xuXG5pbXBvcnQgeyBQTFVHSU5fS0VZLCBQYmxOZ3JpZENsaXBib2FyZFBsdWdpbiB9IGZyb20gJy4vY2xpcGJvYXJkLnBsdWdpbic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFsgQ29tbW9uTW9kdWxlLCBQYmxOZ3JpZE1vZHVsZSwgUGJsTmdyaWRUYXJnZXRFdmVudHNNb2R1bGUgXSxcbiAgZGVjbGFyYXRpb25zOiBbIFBibE5ncmlkQ2xpcGJvYXJkUGx1Z2luIF0sXG4gIGV4cG9ydHM6IFsgUGJsTmdyaWRDbGlwYm9hcmRQbHVnaW4gXSxcbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRDbGlwYm9hcmRQbHVnaW5Nb2R1bGUge1xuXG4gIHN0YXRpYyByZWFkb25seSBOR1JJRF9QTFVHSU4gPSBuZ3JpZFBsdWdpbih7IGlkOiBQTFVHSU5fS0VZLCBmYWN0b3J5OiAnY3JlYXRlJyB9LCBQYmxOZ3JpZENsaXBib2FyZFBsdWdpbik7XG5cbiAgY29uc3RydWN0b3IoY29uZmlnU2VydmljZTogUGJsTmdyaWRDb25maWdTZXJ2aWNlKSB7XG4gICAgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLm9uQ3JlYXRlZFNhZmUoXG4gICAgICBQYmxOZ3JpZENsaXBib2FyZFBsdWdpbk1vZHVsZSxcbiAgICAgIChncmlkLCBjb250cm9sbGVyKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbmZpZyA9IGNvbmZpZ1NlcnZpY2UuZ2V0KFBMVUdJTl9LRVksIHt9KTtcbiAgICAgICAgaWYgKGNvbmZpZy5hdXRvRW5hYmxlID09PSB0cnVlKSB7XG4gICAgICAgICAgY29udHJvbGxlci5vbkluaXQoKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgIGlmICghY29udHJvbGxlci5oYXNQbHVnaW4oUExVR0lOX0tFWSkpIHtcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyLmNyZWF0ZVBsdWdpbihQTFVHSU5fS0VZKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgKTtcbiAgfVxufVxuIl19