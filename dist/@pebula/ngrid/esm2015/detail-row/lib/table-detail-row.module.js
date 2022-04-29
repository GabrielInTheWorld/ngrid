import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
import { PblNgridModule, ngridPlugin } from '@pebula/ngrid';
import { PblNgridTargetEventsModule } from '@pebula/ngrid/target-events';
import { PLUGIN_KEY } from './detail-row/tokens';
import { PblNgridDetailRowParentRefDirective, PblNgridDetailRowDefDirective } from './detail-row/directives';
import { PblNgridDetailRowPluginDirective, PblNgridDefaultDetailRowParentComponent } from './detail-row/detail-row-plugin';
import { PblNgridDetailRowComponent } from './detail-row/row';
import * as i0 from "@angular/core";
const DETAIL_ROW = [
    PblNgridDetailRowPluginDirective,
    PblNgridDetailRowComponent,
    PblNgridDetailRowParentRefDirective,
    PblNgridDetailRowDefDirective,
];
export class PblNgridDetailRowModule {
}
PblNgridDetailRowModule.NGRID_PLUGIN = ngridPlugin({ id: PLUGIN_KEY }, PblNgridDetailRowPluginDirective);
/** @nocollapse */ PblNgridDetailRowModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridDetailRowModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ PblNgridDetailRowModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridDetailRowModule, declarations: [PblNgridDetailRowPluginDirective,
        PblNgridDetailRowComponent,
        PblNgridDetailRowParentRefDirective,
        PblNgridDetailRowDefDirective, PblNgridDefaultDetailRowParentComponent], imports: [CommonModule, CdkTableModule, PblNgridModule, PblNgridTargetEventsModule], exports: [PblNgridDetailRowPluginDirective,
        PblNgridDetailRowComponent,
        PblNgridDetailRowParentRefDirective,
        PblNgridDetailRowDefDirective] });
/** @nocollapse */ PblNgridDetailRowModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridDetailRowModule, imports: [[CommonModule, CdkTableModule, PblNgridModule, PblNgridTargetEventsModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridDetailRowModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, CdkTableModule, PblNgridModule, PblNgridTargetEventsModule],
                    declarations: [DETAIL_ROW, PblNgridDefaultDetailRowParentComponent],
                    exports: [DETAIL_ROW],
                    // TODO(REFACTOR_REF 2): remove when ViewEngine is no longer supported by angular (V12 ???)
                    entryComponents: [PblNgridDetailRowComponent, PblNgridDefaultDetailRowParentComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtZGV0YWlsLXJvdy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL25ncmlkL2RldGFpbC1yb3cvc3JjL2xpYi90YWJsZS1kZXRhaWwtcm93Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDNUQsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFekUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxtQ0FBbUMsRUFBRSw2QkFBNkIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzdHLE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSx1Q0FBdUMsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzNILE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGtCQUFrQixDQUFDOztBQUU5RCxNQUFNLFVBQVUsR0FBRztJQUNqQixnQ0FBZ0M7SUFDaEMsMEJBQTBCO0lBQzFCLG1DQUFtQztJQUNuQyw2QkFBNkI7Q0FDOUIsQ0FBQztBQVNGLE1BQU0sT0FBTyx1QkFBdUI7O0FBQ2xCLG9DQUFZLEdBQUcsV0FBVyxDQUFDLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxFQUFFLGdDQUFnQyxDQUFDLENBQUM7dUlBRHRGLHVCQUF1Qjt3SUFBdkIsdUJBQXVCLGlCQWJsQyxnQ0FBZ0M7UUFDaEMsMEJBQTBCO1FBQzFCLG1DQUFtQztRQUNuQyw2QkFBNkIsRUFLRCx1Q0FBdUMsYUFEeEQsWUFBWSxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsMEJBQTBCLGFBUG5GLGdDQUFnQztRQUNoQywwQkFBMEI7UUFDMUIsbUNBQW1DO1FBQ25DLDZCQUE2Qjt3SUFVbEIsdUJBQXVCLFlBTnpCLENBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsMEJBQTBCLENBQUU7MkZBTTFFLHVCQUF1QjtrQkFQbkMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBRSxZQUFZLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSwwQkFBMEIsQ0FBRTtvQkFDckYsWUFBWSxFQUFFLENBQUUsVUFBVSxFQUFFLHVDQUF1QyxDQUFFO29CQUNyRSxPQUFPLEVBQUUsQ0FBRSxVQUFVLENBQUU7b0JBQ3ZCLDJGQUEyRjtvQkFDM0YsZUFBZSxFQUFFLENBQUUsMEJBQTBCLEVBQUUsdUNBQXVDLENBQUU7aUJBQ3pGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IENka1RhYmxlTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcbmltcG9ydCB7IFBibE5ncmlkTW9kdWxlLCBuZ3JpZFBsdWdpbiB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuaW1wb3J0IHsgUGJsTmdyaWRUYXJnZXRFdmVudHNNb2R1bGUgfSBmcm9tICdAcGVidWxhL25ncmlkL3RhcmdldC1ldmVudHMnO1xuXG5pbXBvcnQgeyBQTFVHSU5fS0VZIH0gZnJvbSAnLi9kZXRhaWwtcm93L3Rva2Vucyc7XG5pbXBvcnQgeyBQYmxOZ3JpZERldGFpbFJvd1BhcmVudFJlZkRpcmVjdGl2ZSwgUGJsTmdyaWREZXRhaWxSb3dEZWZEaXJlY3RpdmUgfSBmcm9tICcuL2RldGFpbC1yb3cvZGlyZWN0aXZlcyc7XG5pbXBvcnQgeyBQYmxOZ3JpZERldGFpbFJvd1BsdWdpbkRpcmVjdGl2ZSwgUGJsTmdyaWREZWZhdWx0RGV0YWlsUm93UGFyZW50Q29tcG9uZW50IH0gZnJvbSAnLi9kZXRhaWwtcm93L2RldGFpbC1yb3ctcGx1Z2luJztcbmltcG9ydCB7IFBibE5ncmlkRGV0YWlsUm93Q29tcG9uZW50IH0gZnJvbSAnLi9kZXRhaWwtcm93L3Jvdyc7XG5cbmNvbnN0IERFVEFJTF9ST1cgPSBbXG4gIFBibE5ncmlkRGV0YWlsUm93UGx1Z2luRGlyZWN0aXZlLFxuICBQYmxOZ3JpZERldGFpbFJvd0NvbXBvbmVudCxcbiAgUGJsTmdyaWREZXRhaWxSb3dQYXJlbnRSZWZEaXJlY3RpdmUsXG4gIFBibE5ncmlkRGV0YWlsUm93RGVmRGlyZWN0aXZlLFxuXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogWyBDb21tb25Nb2R1bGUsIENka1RhYmxlTW9kdWxlLCBQYmxOZ3JpZE1vZHVsZSwgUGJsTmdyaWRUYXJnZXRFdmVudHNNb2R1bGUgXSxcbiAgZGVjbGFyYXRpb25zOiBbIERFVEFJTF9ST1csIFBibE5ncmlkRGVmYXVsdERldGFpbFJvd1BhcmVudENvbXBvbmVudCBdLFxuICBleHBvcnRzOiBbIERFVEFJTF9ST1cgXSxcbiAgLy8gVE9ETyhSRUZBQ1RPUl9SRUYgMik6IHJlbW92ZSB3aGVuIFZpZXdFbmdpbmUgaXMgbm8gbG9uZ2VyIHN1cHBvcnRlZCBieSBhbmd1bGFyIChWMTIgPz8/KVxuICBlbnRyeUNvbXBvbmVudHM6IFsgUGJsTmdyaWREZXRhaWxSb3dDb21wb25lbnQsIFBibE5ncmlkRGVmYXVsdERldGFpbFJvd1BhcmVudENvbXBvbmVudCBdLFxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZERldGFpbFJvd01vZHVsZSB7XG4gIHN0YXRpYyByZWFkb25seSBOR1JJRF9QTFVHSU4gPSBuZ3JpZFBsdWdpbih7IGlkOiBQTFVHSU5fS0VZIH0sIFBibE5ncmlkRGV0YWlsUm93UGx1Z2luRGlyZWN0aXZlKTtcbn1cbiJdfQ==