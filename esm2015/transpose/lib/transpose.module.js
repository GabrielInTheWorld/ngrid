import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PblNgridModule, ngridPlugin } from '@pebula/ngrid';
import { PblNgridTransposePluginDirective, PLUGIN_KEY } from './transpose-plugin.directive';
import * as i0 from "@angular/core";
export class PblNgridTransposeModule {
}
PblNgridTransposeModule.NGRID_PLUGIN = ngridPlugin({ id: PLUGIN_KEY }, PblNgridTransposePluginDirective);
/** @nocollapse */ PblNgridTransposeModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridTransposeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ PblNgridTransposeModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridTransposeModule, declarations: [PblNgridTransposePluginDirective], imports: [CommonModule, PblNgridModule], exports: [PblNgridTransposePluginDirective] });
/** @nocollapse */ PblNgridTransposeModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridTransposeModule, imports: [[CommonModule, PblNgridModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridTransposeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, PblNgridModule],
                    declarations: [PblNgridTransposePluginDirective],
                    exports: [PblNgridTransposePluginDirective],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNwb3NlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmdyaWQvdHJhbnNwb3NlL3NyYy9saWIvdHJhbnNwb3NlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsY0FBYyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1RCxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsVUFBVSxFQUFFLE1BQU0sOEJBQThCLENBQUM7O0FBTzVGLE1BQU0sT0FBTyx1QkFBdUI7O0FBQ2xCLG9DQUFZLEdBQUcsV0FBVyxDQUFDLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxFQUFFLGdDQUFnQyxDQUFDLENBQUM7dUlBRHRGLHVCQUF1Qjt3SUFBdkIsdUJBQXVCLGlCQUhsQixnQ0FBZ0MsYUFEckMsWUFBWSxFQUFFLGNBQWMsYUFFNUIsZ0NBQWdDO3dJQUVoQyx1QkFBdUIsWUFKekIsQ0FBRSxZQUFZLEVBQUUsY0FBYyxDQUFFOzJGQUk5Qix1QkFBdUI7a0JBTG5DLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUUsWUFBWSxFQUFFLGNBQWMsQ0FBRTtvQkFDekMsWUFBWSxFQUFFLENBQUUsZ0NBQWdDLENBQUU7b0JBQ2xELE9BQU8sRUFBRSxDQUFFLGdDQUFnQyxDQUFFO2lCQUM5QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZE1vZHVsZSwgbmdyaWRQbHVnaW4gfSBmcm9tICdAcGVidWxhL25ncmlkJztcbmltcG9ydCB7IFBibE5ncmlkVHJhbnNwb3NlUGx1Z2luRGlyZWN0aXZlLCBQTFVHSU5fS0VZIH0gZnJvbSAnLi90cmFuc3Bvc2UtcGx1Z2luLmRpcmVjdGl2ZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFsgQ29tbW9uTW9kdWxlLCBQYmxOZ3JpZE1vZHVsZSBdLFxuICBkZWNsYXJhdGlvbnM6IFsgUGJsTmdyaWRUcmFuc3Bvc2VQbHVnaW5EaXJlY3RpdmUgXSxcbiAgZXhwb3J0czogWyBQYmxOZ3JpZFRyYW5zcG9zZVBsdWdpbkRpcmVjdGl2ZSBdLFxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZFRyYW5zcG9zZU1vZHVsZSB7XG4gIHN0YXRpYyByZWFkb25seSBOR1JJRF9QTFVHSU4gPSBuZ3JpZFBsdWdpbih7IGlkOiBQTFVHSU5fS0VZIH0sIFBibE5ncmlkVHJhbnNwb3NlUGx1Z2luRGlyZWN0aXZlKTtcbn1cbiJdfQ==