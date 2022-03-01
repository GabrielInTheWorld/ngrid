import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
import { PblNgridModule, ngridPlugin } from '@pebula/ngrid';
import { PblNgridBlockUiDefDirective } from './block-ui/directives';
import { PblNgridBlockUiPluginDirective, PLUGIN_KEY } from './block-ui/block-ui-plugin';
import * as i0 from "@angular/core";
export class PblNgridBlockUiModule {
}
PblNgridBlockUiModule.NGRID_PLUGIN = ngridPlugin({ id: PLUGIN_KEY }, PblNgridBlockUiPluginDirective);
/** @nocollapse */ PblNgridBlockUiModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridBlockUiModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ PblNgridBlockUiModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridBlockUiModule, declarations: [PblNgridBlockUiDefDirective, PblNgridBlockUiPluginDirective], imports: [CommonModule, CdkTableModule, PblNgridModule], exports: [PblNgridBlockUiDefDirective, PblNgridBlockUiPluginDirective] });
/** @nocollapse */ PblNgridBlockUiModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridBlockUiModule, imports: [[CommonModule, CdkTableModule, PblNgridModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridBlockUiModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, CdkTableModule, PblNgridModule],
                    declarations: [PblNgridBlockUiDefDirective, PblNgridBlockUiPluginDirective],
                    exports: [PblNgridBlockUiDefDirective, PblNgridBlockUiPluginDirective]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtYmxvY2stdWkubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3JpZC9ibG9jay11aS9zcmMvbGliL3RhYmxlLWJsb2NrLXVpLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDNUQsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDcEUsT0FBTyxFQUFFLDhCQUE4QixFQUFFLFVBQVUsRUFBRSxNQUFNLDRCQUE0QixDQUFDOztBQU94RixNQUFNLE9BQU8scUJBQXFCOztBQUNoQixrQ0FBWSxHQUFHLFdBQVcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsRUFBRSw4QkFBOEIsQ0FBQyxDQUFDO3FJQURwRixxQkFBcUI7c0lBQXJCLHFCQUFxQixpQkFIaEIsMkJBQTJCLEVBQUUsOEJBQThCLGFBRGhFLFlBQVksRUFBRSxjQUFjLEVBQUUsY0FBYyxhQUUzQywyQkFBMkIsRUFBRSw4QkFBOEI7c0lBRTVELHFCQUFxQixZQUp2QixDQUFFLFlBQVksRUFBRSxjQUFjLEVBQUUsY0FBYyxDQUFFOzJGQUk5QyxxQkFBcUI7a0JBTGpDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxjQUFjLENBQUU7b0JBQ3pELFlBQVksRUFBRSxDQUFFLDJCQUEyQixFQUFFLDhCQUE4QixDQUFFO29CQUM3RSxPQUFPLEVBQUUsQ0FBRywyQkFBMkIsRUFBRSw4QkFBOEIsQ0FBRztpQkFDM0UiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgQ2RrVGFibGVNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xuaW1wb3J0IHsgUGJsTmdyaWRNb2R1bGUsIG5ncmlkUGx1Z2luIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5pbXBvcnQgeyBQYmxOZ3JpZEJsb2NrVWlEZWZEaXJlY3RpdmUgfSBmcm9tICcuL2Jsb2NrLXVpL2RpcmVjdGl2ZXMnO1xuaW1wb3J0IHsgUGJsTmdyaWRCbG9ja1VpUGx1Z2luRGlyZWN0aXZlLCBQTFVHSU5fS0VZIH0gZnJvbSAnLi9ibG9jay11aS9ibG9jay11aS1wbHVnaW4nO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbIENvbW1vbk1vZHVsZSwgQ2RrVGFibGVNb2R1bGUsIFBibE5ncmlkTW9kdWxlIF0sXG4gIGRlY2xhcmF0aW9uczogWyBQYmxOZ3JpZEJsb2NrVWlEZWZEaXJlY3RpdmUsIFBibE5ncmlkQmxvY2tVaVBsdWdpbkRpcmVjdGl2ZSBdLFxuICBleHBvcnRzOiBbICBQYmxOZ3JpZEJsb2NrVWlEZWZEaXJlY3RpdmUsIFBibE5ncmlkQmxvY2tVaVBsdWdpbkRpcmVjdGl2ZSAgXVxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZEJsb2NrVWlNb2R1bGUge1xuICBzdGF0aWMgcmVhZG9ubHkgTkdSSURfUExVR0lOID0gbmdyaWRQbHVnaW4oeyBpZDogUExVR0lOX0tFWSB9LCBQYmxOZ3JpZEJsb2NrVWlQbHVnaW5EaXJlY3RpdmUpO1xufVxuIl19