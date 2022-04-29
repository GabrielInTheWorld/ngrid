import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
import { PblNgridConfigService } from '@pebula/ngrid/core';
import { PblNgridModule, PblNgridPluginController, ngridPlugin } from '@pebula/ngrid';
import { PblNgridStickyPluginDirective, setStickyRow, setStickyColumns, PLUGIN_KEY } from './sticky/sticky-plugin';
import * as i0 from "@angular/core";
import * as i1 from "@pebula/ngrid/core";
const MAPPER = (v) => [v, true];
export class PblNgridStickyModule {
    constructor(configService) {
        PblNgridPluginController.onCreatedSafe(PblNgridStickyModule, (grid, controller) => {
            if (controller && !controller.hasPlugin('sticky')) {
                controller.onInit()
                    .subscribe(() => {
                    const stickyPluginConfig = configService.get('stickyPlugin');
                    if (stickyPluginConfig) {
                        if (stickyPluginConfig.headers) {
                            setStickyRow(grid, 'header', stickyPluginConfig.headers.map(MAPPER));
                        }
                        if (stickyPluginConfig.footers) {
                            setStickyRow(grid, 'footer', stickyPluginConfig.footers.map(MAPPER));
                        }
                        if (stickyPluginConfig.columnStart) {
                            setStickyColumns(grid, 'start', stickyPluginConfig.columnStart.map(MAPPER));
                        }
                        if (stickyPluginConfig.columnEnd) {
                            setStickyColumns(grid, 'end', stickyPluginConfig.columnEnd.map(MAPPER));
                        }
                    }
                });
            }
        });
    }
}
PblNgridStickyModule.NGRID_PLUGIN = ngridPlugin({ id: PLUGIN_KEY }, PblNgridStickyPluginDirective);
/** @nocollapse */ PblNgridStickyModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridStickyModule, deps: [{ token: i1.PblNgridConfigService }], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ PblNgridStickyModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridStickyModule, declarations: [PblNgridStickyPluginDirective], imports: [CommonModule, CdkTableModule, PblNgridModule], exports: [PblNgridStickyPluginDirective] });
/** @nocollapse */ PblNgridStickyModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridStickyModule, imports: [[CommonModule, CdkTableModule, PblNgridModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridStickyModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, CdkTableModule, PblNgridModule],
                    declarations: [PblNgridStickyPluginDirective],
                    exports: [PblNgridStickyPluginDirective],
                }]
        }], ctorParameters: function () { return [{ type: i1.PblNgridConfigService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RpY2t5Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmdyaWQvc3RpY2t5L3NyYy9saWIvc3RpY2t5Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFM0QsT0FBTyxFQUFFLGNBQWMsRUFBRSx3QkFBd0IsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEYsT0FBTyxFQUFFLDZCQUE2QixFQUFFLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxVQUFVLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7O0FBYW5ILE1BQU0sTUFBTSxHQUFHLENBQUksQ0FBSSxFQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFPcEQsTUFBTSxPQUFPLG9CQUFvQjtJQUkvQixZQUFZLGFBQW9DO1FBQzlDLHdCQUF3QixDQUFDLGFBQWEsQ0FDcEMsb0JBQW9CLEVBQ3BCLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUFFO1lBQ25CLElBQUksVUFBVSxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDakQsVUFBVSxDQUFDLE1BQU0sRUFBRTtxQkFDaEIsU0FBUyxDQUFDLEdBQUcsRUFBRTtvQkFDZCxNQUFNLGtCQUFrQixHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7b0JBQzdELElBQUksa0JBQWtCLEVBQUU7d0JBQ3RCLElBQUksa0JBQWtCLENBQUMsT0FBTyxFQUFFOzRCQUM5QixZQUFZLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7eUJBQ3RFO3dCQUNELElBQUksa0JBQWtCLENBQUMsT0FBTyxFQUFFOzRCQUM5QixZQUFZLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7eUJBQ3RFO3dCQUNELElBQUksa0JBQWtCLENBQUMsV0FBVyxFQUFFOzRCQUNsQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzt5QkFDN0U7d0JBQ0QsSUFBSSxrQkFBa0IsQ0FBQyxTQUFTLEVBQUU7NEJBQ2hDLGdCQUFnQixDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsa0JBQWtCLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO3lCQUN6RTtxQkFDRjtnQkFDSCxDQUFDLENBQUMsQ0FBQzthQUNOO1FBQ0gsQ0FBQyxDQUNGLENBQUM7SUFDSixDQUFDOztBQTVCZSxpQ0FBWSxHQUFHLFdBQVcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsRUFBRSw2QkFBNkIsQ0FBQyxDQUFDO29JQUZuRixvQkFBb0I7cUlBQXBCLG9CQUFvQixpQkFIZiw2QkFBNkIsYUFEbEMsWUFBWSxFQUFFLGNBQWMsRUFBRSxjQUFjLGFBRTVDLDZCQUE2QjtxSUFFN0Isb0JBQW9CLFlBSnRCLENBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxjQUFjLENBQUU7MkZBSTlDLG9CQUFvQjtrQkFMaEMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBRSxZQUFZLEVBQUUsY0FBYyxFQUFFLGNBQWMsQ0FBRTtvQkFDekQsWUFBWSxFQUFFLENBQUUsNkJBQTZCLENBQUU7b0JBQy9DLE9BQU8sRUFBRSxDQUFFLDZCQUE2QixDQUFFO2lCQUMzQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQ2RrVGFibGVNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xuaW1wb3J0IHsgUGJsTmdyaWRDb25maWdTZXJ2aWNlIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZC9jb3JlJztcblxuaW1wb3J0IHsgUGJsTmdyaWRNb2R1bGUsIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlciwgbmdyaWRQbHVnaW4gfSBmcm9tICdAcGVidWxhL25ncmlkJztcbmltcG9ydCB7IFBibE5ncmlkU3RpY2t5UGx1Z2luRGlyZWN0aXZlLCBzZXRTdGlja3lSb3csIHNldFN0aWNreUNvbHVtbnMsIFBMVUdJTl9LRVkgfSBmcm9tICcuL3N0aWNreS9zdGlja3ktcGx1Z2luJztcblxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvY29yZS9saWIvY29uZmlndXJhdGlvbi90eXBlJyB7XG4gIGludGVyZmFjZSBQYmxOZ3JpZENvbmZpZyB7XG4gICAgc3RpY2t5UGx1Z2luPzoge1xuICAgICAgaGVhZGVycz86IEFycmF5PCd0YWJsZScgfCBudW1iZXI+O1xuICAgICAgZm9vdGVycz86IEFycmF5PCd0YWJsZScgfCBudW1iZXI+O1xuICAgICAgY29sdW1uU3RhcnQ/OiBBcnJheTxzdHJpbmcgfCBudW1iZXI+O1xuICAgICAgY29sdW1uRW5kPzogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPjtcbiAgICB9XG4gIH1cbn1cblxuY29uc3QgTUFQUEVSID0gPFQ+KHY6IFQpOiBbVCwgYm9vbGVhbl0gPT4gW3YsIHRydWVdO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbIENvbW1vbk1vZHVsZSwgQ2RrVGFibGVNb2R1bGUsIFBibE5ncmlkTW9kdWxlIF0sXG4gIGRlY2xhcmF0aW9uczogWyBQYmxOZ3JpZFN0aWNreVBsdWdpbkRpcmVjdGl2ZSBdLFxuICBleHBvcnRzOiBbIFBibE5ncmlkU3RpY2t5UGx1Z2luRGlyZWN0aXZlIF0sXG59KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkU3RpY2t5TW9kdWxlIHtcblxuICBzdGF0aWMgcmVhZG9ubHkgTkdSSURfUExVR0lOID0gbmdyaWRQbHVnaW4oeyBpZDogUExVR0lOX0tFWSB9LCBQYmxOZ3JpZFN0aWNreVBsdWdpbkRpcmVjdGl2ZSk7XG5cbiAgY29uc3RydWN0b3IoY29uZmlnU2VydmljZTogUGJsTmdyaWRDb25maWdTZXJ2aWNlKSB7XG4gICAgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLm9uQ3JlYXRlZFNhZmUoXG4gICAgICBQYmxOZ3JpZFN0aWNreU1vZHVsZSxcbiAgICAgIChncmlkLCBjb250cm9sbGVyKSA9PiB7XG4gICAgICAgIGlmIChjb250cm9sbGVyICYmICFjb250cm9sbGVyLmhhc1BsdWdpbignc3RpY2t5JykpIHtcbiAgICAgICAgICBjb250cm9sbGVyLm9uSW5pdCgpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgY29uc3Qgc3RpY2t5UGx1Z2luQ29uZmlnID0gY29uZmlnU2VydmljZS5nZXQoJ3N0aWNreVBsdWdpbicpO1xuICAgICAgICAgICAgICBpZiAoc3RpY2t5UGx1Z2luQ29uZmlnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN0aWNreVBsdWdpbkNvbmZpZy5oZWFkZXJzKSB7XG4gICAgICAgICAgICAgICAgICBzZXRTdGlja3lSb3coZ3JpZCwgJ2hlYWRlcicsIHN0aWNreVBsdWdpbkNvbmZpZy5oZWFkZXJzLm1hcChNQVBQRVIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHN0aWNreVBsdWdpbkNvbmZpZy5mb290ZXJzKSB7XG4gICAgICAgICAgICAgICAgICBzZXRTdGlja3lSb3coZ3JpZCwgJ2Zvb3RlcicsIHN0aWNreVBsdWdpbkNvbmZpZy5mb290ZXJzLm1hcChNQVBQRVIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHN0aWNreVBsdWdpbkNvbmZpZy5jb2x1bW5TdGFydCkge1xuICAgICAgICAgICAgICAgICAgc2V0U3RpY2t5Q29sdW1ucyhncmlkLCAnc3RhcnQnLCBzdGlja3lQbHVnaW5Db25maWcuY29sdW1uU3RhcnQubWFwKE1BUFBFUikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc3RpY2t5UGx1Z2luQ29uZmlnLmNvbHVtbkVuZCkge1xuICAgICAgICAgICAgICAgICAgc2V0U3RpY2t5Q29sdW1ucyhncmlkLCAnZW5kJywgc3RpY2t5UGx1Z2luQ29uZmlnLmNvbHVtbkVuZC5tYXAoTUFQUEVSKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICApO1xuICB9XG59XG4iXX0=