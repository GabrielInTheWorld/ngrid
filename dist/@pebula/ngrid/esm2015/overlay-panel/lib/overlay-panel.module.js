import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BidiModule } from '@angular/cdk/bidi';
import { OverlayModule } from '@angular/cdk/overlay';
import { PblNgridOverlayPanelFactory } from './overlay-panel.service';
import { PblNgridOverlayPanelDef } from './overlay-panel-def';
import * as i0 from "@angular/core";
export class PblNgridOverlayPanelModule {
}
/** @nocollapse */ PblNgridOverlayPanelModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridOverlayPanelModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ PblNgridOverlayPanelModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridOverlayPanelModule, declarations: [PblNgridOverlayPanelDef], imports: [CommonModule,
        OverlayModule,
        BidiModule], exports: [PblNgridOverlayPanelDef] });
/** @nocollapse */ PblNgridOverlayPanelModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridOverlayPanelModule, providers: [
        PblNgridOverlayPanelFactory,
    ], imports: [[
            CommonModule,
            OverlayModule,
            BidiModule,
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridOverlayPanelModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        OverlayModule,
                        BidiModule,
                    ],
                    declarations: [
                        PblNgridOverlayPanelDef,
                    ],
                    exports: [
                        PblNgridOverlayPanelDef,
                    ],
                    providers: [
                        PblNgridOverlayPanelFactory,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS1wYW5lbC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL25ncmlkL292ZXJsYXktcGFuZWwvc3JjL2xpYi9vdmVybGF5LXBhbmVsLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXJELE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3RFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDOztBQWtCOUQsTUFBTSxPQUFPLDBCQUEwQjs7MElBQTFCLDBCQUEwQjsySUFBMUIsMEJBQTBCLGlCQVRuQyx1QkFBdUIsYUFMdkIsWUFBWTtRQUNaLGFBQWE7UUFDYixVQUFVLGFBTVYsdUJBQXVCOzJJQU1kLDBCQUEwQixhQUoxQjtRQUNULDJCQUEyQjtLQUM1QixZQWJRO1lBQ1AsWUFBWTtZQUNaLGFBQWE7WUFDYixVQUFVO1NBQ1g7MkZBV1UsMEJBQTBCO2tCQWhCdEMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixhQUFhO3dCQUNiLFVBQVU7cUJBQ1g7b0JBQ0QsWUFBWSxFQUFFO3dCQUNaLHVCQUF1QjtxQkFDeEI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLHVCQUF1QjtxQkFDeEI7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULDJCQUEyQjtxQkFDNUI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEJpZGlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBPdmVybGF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZE92ZXJsYXlQYW5lbEZhY3RvcnkgfSBmcm9tICcuL292ZXJsYXktcGFuZWwuc2VydmljZSc7XG5pbXBvcnQgeyBQYmxOZ3JpZE92ZXJsYXlQYW5lbERlZiB9IGZyb20gJy4vb3ZlcmxheS1wYW5lbC1kZWYnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE92ZXJsYXlNb2R1bGUsXG4gICAgQmlkaU1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgUGJsTmdyaWRPdmVybGF5UGFuZWxEZWYsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBQYmxOZ3JpZE92ZXJsYXlQYW5lbERlZixcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgUGJsTmdyaWRPdmVybGF5UGFuZWxGYWN0b3J5LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZE92ZXJsYXlQYW5lbE1vZHVsZSB7XG5cbn1cbiJdfQ==