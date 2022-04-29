import { Inject, InjectionToken, Injector, Optional, NgModule, NgModuleRef, Self, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule as ScrollingModuleExp } from '@angular/cdk-experimental/scrolling';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkTableModule } from '@angular/cdk/table';
import { PEB_NGRID_CONFIG, PblNgridConfigService } from '@pebula/ngrid/core';
/**
 * NOTE ABOUT IMPORTS
 *
 * DO NOT IMPORT FROM BARREL MODULES OR ANY MODULE THAT AGGREGATE AND EXPORT SYMBOLS
 * THE ANGULAR NGC COMPILER DOES NOT HANDLE IT WELL AND THE EXPORTED CODE MIGHT NOT WORK (METADATA ISSUE)
 *
 * THE CIRCULAR RUNTIME DETECTION DOES NOT WORK IN THIS CASE BECAUSE THERE IS NO ACTUAL CIRCULAR REFERENCE
 * IT HAPPENS BECAUSE OF THE WAY ANGULAR RE-BUILDS THE D.TS FILES AND METADATA FILES
 */
import { PblNgridRegistryService } from './grid/registry/registry.service';
import { PblCdkTableComponent } from './grid/pbl-cdk-table/pbl-cdk-table.component';
import { PblNgridRowDef, PblNgridRowOverride } from './grid/row/row-def.directive';
import { PblNgridRowComponent } from './grid/row/row.component';
import { PblNgridColumnRowComponent } from './grid/row/columns-row.component';
import { PblNgridMetaRowComponent } from './grid/row/meta-row.component';
import { PblNgridMetaRowContainerComponent } from './grid/meta-rows/meta-row-container';
import { PblNgridColumnDef } from './grid/column/directives/column-def';
import { PblNgridHeaderCellDefDirective } from './grid/cell/cell-def/header-cell-def.directive';
import { PblNgridFooterCellDefDirective } from './grid/cell/cell-def/footer-cell-def.directive';
import { PblNgridCellDefDirective } from './grid/cell/cell-def/cell-def.directive';
import { PblNgridEditorCellDefDirective } from './grid/cell/cell-def/edit-cell-def.directive';
import { PblNgridHeaderCellComponent } from './grid/cell/header-cell.component';
import { PblNgridCellComponent } from './grid/cell/cell.component';
import { PblNgridFooterCellComponent } from './grid/cell/footer-cell.component';
import { PblNgridMetaCellComponent } from './grid/cell/meta-cell.component';
import { PblNgridCellEditAutoFocusDirective } from './grid/cell/cell-edit-auto-focus.directive';
import { PblNgridCellStyling } from './grid/cell/cell-styling.directive';
import { PblNgridOuterSectionDirective } from './grid/directives/directives';
import { PblNgridHeaderExtensionRefDirective } from './grid/registry/directives/data-header-extensions';
import { PblNgridNoDataRefDirective } from './grid/registry/directives/no-data-ref.directive';
import { PblNgridPaginatorRefDirective } from './grid/registry/directives/paginator-ref.directive';
import { PblNgridHideColumns } from './grid/features/hide-columns.directive';
import { PblCdkVirtualScrollViewportComponent } from './grid/features/virtual-scroll/virtual-scroll-viewport.component';
import { PblCdkVirtualScrollDirective } from './grid/features/virtual-scroll/strategies/v-scroll.directive';
// TODO: Move to an independent package in v4
import { PblCdkAutoSizeVirtualScrollDirective } from './grid/features/virtual-scroll/strategies/cdk-wrappers/v-scroll-auto.directive';
import { PblCdkFixedSizedVirtualScrollDirective } from './grid/features/virtual-scroll/strategies/cdk-wrappers/v-scroll-fixed.directive';
import { PblNgridScrolling } from './grid/features/virtual-scroll/scrolling-plugin.directive';
import { PblNgridComponent } from './grid/ngrid.component';
import { PROVIDERS } from './di-factories';
import * as i0 from "@angular/core";
import * as i1 from "./grid/registry/registry.service";
export const COMMON_TABLE_TEMPLATE_INIT = new InjectionToken('COMMON TABLE TEMPLATE INIT');
export function provideCommon(components) {
    return [
        { provide: COMMON_TABLE_TEMPLATE_INIT, multi: true, useValue: components },
    ];
}
export class PblNgridModule {
    constructor(ngRef, registry, components) {
        if (components) {
            for (const multi of components) {
                for (const c of multi) {
                    if (c.root) {
                        registry = registry.getRoot();
                    }
                    PblNgridModule.loadCommonTemplates(ngRef, c.component, { registry, destroy: true });
                }
            }
        }
    }
    static forRoot(config, components) {
        return {
            ngModule: PblNgridModule,
            providers: [
                { provide: PEB_NGRID_CONFIG, useValue: config },
                PblNgridConfigService,
                provideCommon(components),
            ]
        };
    }
    static withCommon(components) {
        return {
            ngModule: PblNgridModule,
            providers: provideCommon(components),
        };
    }
    static loadCommonTemplates(ngRef, component, options) {
        let { injector } = ngRef;
        const { registry, destroy } = options || {};
        if (registry) {
            injector = Injector.create({
                providers: [{ provide: PblNgridRegistryService, useValue: registry }],
                parent: ngRef.injector
            });
        }
        const cmpRef = ngRef.componentFactoryResolver.resolveComponentFactory(component).create(injector);
        cmpRef.changeDetectorRef.detectChanges();
        if (destroy) {
            ngRef.onDestroy(() => {
                try {
                    cmpRef.destroy();
                }
                catch (err) { }
            });
        }
        return cmpRef;
    }
}
/** @nocollapse */ PblNgridModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridModule, deps: [{ token: i0.NgModuleRef }, { token: i1.PblNgridRegistryService }, { token: COMMON_TABLE_TEMPLATE_INIT, optional: true, self: true }], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ PblNgridModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridModule, declarations: [PblNgridMetaRowContainerComponent,
        PblCdkTableComponent,
        PblNgridColumnDef,
        PblNgridRowDef, PblNgridRowOverride, PblNgridRowComponent, PblNgridColumnRowComponent, PblNgridMetaRowComponent,
        PblNgridCellStyling,
        PblNgridOuterSectionDirective,
        PblNgridHeaderExtensionRefDirective,
        PblNgridNoDataRefDirective,
        PblNgridPaginatorRefDirective,
        PblNgridHeaderCellDefDirective,
        PblNgridFooterCellDefDirective,
        PblNgridCellDefDirective, PblNgridEditorCellDefDirective,
        PblNgridHeaderCellComponent,
        PblNgridCellComponent,
        PblNgridFooterCellComponent,
        PblNgridMetaCellComponent,
        PblNgridHideColumns,
        PblCdkVirtualScrollViewportComponent, PblNgridScrolling,
        PblCdkVirtualScrollDirective,
        // TODO: Move to an independent package in v4
        PblCdkAutoSizeVirtualScrollDirective, PblCdkFixedSizedVirtualScrollDirective,
        PblNgridCellEditAutoFocusDirective,
        PblNgridComponent], imports: [CommonModule,
        ScrollingModule, ScrollingModuleExp,
        CdkTableModule], exports: [PblNgridRowDef, PblNgridRowOverride, PblNgridRowComponent, PblNgridColumnRowComponent, PblNgridMetaRowComponent,
        PblNgridCellStyling,
        PblNgridOuterSectionDirective,
        PblNgridHeaderExtensionRefDirective,
        PblNgridNoDataRefDirective,
        PblNgridPaginatorRefDirective,
        PblNgridHeaderCellDefDirective,
        PblNgridFooterCellDefDirective,
        PblNgridCellDefDirective, PblNgridEditorCellDefDirective, PblNgridScrolling,
        PblNgridHeaderCellComponent,
        PblNgridCellComponent,
        PblNgridFooterCellComponent,
        PblNgridMetaCellComponent,
        PblNgridHideColumns,
        PblCdkVirtualScrollDirective,
        // TODO: Move to an independent package in v4
        PblCdkAutoSizeVirtualScrollDirective, PblCdkFixedSizedVirtualScrollDirective,
        PblNgridCellEditAutoFocusDirective,
        PblNgridComponent] });
/** @nocollapse */ PblNgridModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridModule, providers: [
        ...PROVIDERS,
    ], imports: [[
            CommonModule,
            ScrollingModule, ScrollingModuleExp,
            CdkTableModule,
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ScrollingModule, ScrollingModuleExp,
                        CdkTableModule,
                    ],
                    declarations: [
                        PblNgridMetaRowContainerComponent,
                        PblCdkTableComponent,
                        PblNgridColumnDef,
                        PblNgridRowDef, PblNgridRowOverride, PblNgridRowComponent, PblNgridColumnRowComponent, PblNgridMetaRowComponent,
                        PblNgridCellStyling,
                        PblNgridOuterSectionDirective,
                        PblNgridHeaderExtensionRefDirective,
                        PblNgridNoDataRefDirective,
                        PblNgridPaginatorRefDirective,
                        PblNgridHeaderCellDefDirective,
                        PblNgridFooterCellDefDirective,
                        PblNgridCellDefDirective, PblNgridEditorCellDefDirective,
                        PblNgridHeaderCellComponent,
                        PblNgridCellComponent,
                        PblNgridFooterCellComponent,
                        PblNgridMetaCellComponent,
                        PblNgridHideColumns,
                        PblCdkVirtualScrollViewportComponent, PblNgridScrolling,
                        PblCdkVirtualScrollDirective,
                        // TODO: Move to an independent package in v4
                        PblCdkAutoSizeVirtualScrollDirective, PblCdkFixedSizedVirtualScrollDirective,
                        PblNgridCellEditAutoFocusDirective,
                        PblNgridComponent,
                    ],
                    providers: [
                        ...PROVIDERS,
                    ],
                    exports: [
                        PblNgridRowDef, PblNgridRowOverride, PblNgridRowComponent, PblNgridColumnRowComponent, PblNgridMetaRowComponent,
                        PblNgridCellStyling,
                        PblNgridOuterSectionDirective,
                        PblNgridHeaderExtensionRefDirective,
                        PblNgridNoDataRefDirective,
                        PblNgridPaginatorRefDirective,
                        PblNgridHeaderCellDefDirective,
                        PblNgridFooterCellDefDirective,
                        PblNgridCellDefDirective, PblNgridEditorCellDefDirective, PblNgridScrolling,
                        PblNgridHeaderCellComponent,
                        PblNgridCellComponent,
                        PblNgridFooterCellComponent,
                        PblNgridMetaCellComponent,
                        PblNgridHideColumns,
                        PblCdkVirtualScrollDirective,
                        // TODO: Move to an independent package in v4
                        PblCdkAutoSizeVirtualScrollDirective, PblCdkFixedSizedVirtualScrollDirective,
                        PblNgridCellEditAutoFocusDirective,
                        PblNgridComponent,
                    ],
                    // TODO(REFACTOR_REF 2): remove when ViewEngine is no longer supported by angular (V12 ???)
                    // Since these are no longer part of the main grid template but now generated programmatically we need to put them here for non viewEngine compilation to work (e.g. stackblitz)
                    entryComponents: [PblNgridHeaderCellComponent, PblNgridCellComponent, PblNgridFooterCellComponent, PblNgridMetaCellComponent]
                }]
        }], ctorParameters: function () { return [{ type: i0.NgModuleRef }, { type: i1.PblNgridRegistryService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [COMMON_TABLE_TEMPLATE_INIT]
                }, {
                    type: Optional
                }, {
                    type: Self
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdyaWQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3JpZC9zcmMvbGliL25ncmlkLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsTUFBTSxFQUNOLGNBQWMsRUFDZCxRQUFRLEVBRVIsUUFBUSxFQUNSLFFBQVEsRUFDUixXQUFXLEVBRVgsSUFBSSxHQUNMLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsZUFBZSxJQUFJLGtCQUFrQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDNUYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQWtCLHFCQUFxQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFHN0Y7Ozs7Ozs7O0dBUUc7QUFDSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTyw4Q0FBOEMsQ0FBQztBQUNyRixPQUFPLEVBQUUsY0FBYyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDbkYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDaEUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDOUUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDekUsT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDeEYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDeEUsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDaEcsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDaEcsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDbkYsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDOUYsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDaEYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDbkUsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDaEYsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDNUUsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDaEcsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDekUsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDN0UsT0FBTyxFQUFFLG1DQUFtQyxFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFDeEcsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDOUYsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFDbkcsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDN0UsT0FBTyxFQUFFLG9DQUFvQyxFQUFFLE1BQU0sa0VBQWtFLENBQUM7QUFDeEgsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sOERBQThELENBQUM7QUFDNUcsNkNBQTZDO0FBQzdDLE9BQU8sRUFBRSxvQ0FBb0MsRUFBRSxNQUFPLGdGQUFnRixDQUFDO0FBQ3ZJLE9BQU8sRUFBRSxzQ0FBc0MsRUFBRSxNQUFPLGlGQUFpRixDQUFDO0FBQzFJLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDJEQUEyRCxDQUFDO0FBQzlGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzNELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBRTNDLE1BQU0sQ0FBQyxNQUFNLDBCQUEwQixHQUFHLElBQUksY0FBYyxDQUFDLDRCQUE0QixDQUFDLENBQUM7QUFXM0YsTUFBTSxVQUFVLGFBQWEsQ0FBQyxVQUFnQztJQUM1RCxPQUFPO1FBQ0wsRUFBRSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFO0tBQzNFLENBQUM7QUFDSixDQUFDO0FBb0VELE1BQU0sT0FBTyxjQUFjO0lBRXpCLFlBQVksS0FBdUIsRUFDdkIsUUFBaUMsRUFDdUIsVUFBa0M7UUFFcEcsSUFBSSxVQUFVLEVBQUU7WUFDZCxLQUFLLE1BQU0sS0FBSyxJQUFJLFVBQVUsRUFBRTtnQkFDOUIsS0FBSyxNQUFNLENBQUMsSUFBSSxLQUFLLEVBQUU7b0JBQ3JCLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRTt3QkFDVixRQUFRLEdBQUcsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO3FCQUMvQjtvQkFDRCxjQUFjLENBQUMsbUJBQW1CLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7aUJBQ3JGO2FBQ0Y7U0FDRjtJQUNILENBQUM7SUFFRCxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQXNCLEVBQUUsVUFBZ0M7UUFDckUsT0FBTztZQUNMLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFNBQVMsRUFBRTtnQkFDVCxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFO2dCQUMvQyxxQkFBcUI7Z0JBQ3JCLGFBQWEsQ0FBQyxVQUFVLENBQUM7YUFDMUI7U0FDRixDQUFDO0lBQ0osQ0FBQztJQUVELE1BQU0sQ0FBQyxVQUFVLENBQUMsVUFBZ0M7UUFDaEQsT0FBTztZQUNMLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFNBQVMsRUFBRSxhQUFhLENBQUMsVUFBVSxDQUFDO1NBQ3JDLENBQUM7SUFDSixDQUFDO0lBRUQsTUFBTSxDQUFDLG1CQUFtQixDQUFJLEtBQXVCLEVBQ3ZCLFNBQWtCLEVBQ2xCLE9BS0M7UUFDN0IsSUFBSSxFQUFFLFFBQVEsRUFBRSxHQUFHLEtBQUssQ0FBQztRQUN6QixNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxHQUFHLE9BQU8sSUFBSyxFQUFVLENBQUM7UUFFckQsSUFBSSxRQUFRLEVBQUU7WUFDWixRQUFRLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQztnQkFDekIsU0FBUyxFQUFFLENBQUUsRUFBRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFFO2dCQUN2RSxNQUFNLEVBQUUsS0FBSyxDQUFDLFFBQVE7YUFDdkIsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsd0JBQXdCLENBQUMsdUJBQXVCLENBQUksU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JHLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN6QyxJQUFJLE9BQU8sRUFBRTtZQUNYLEtBQUssQ0FBQyxTQUFTLENBQUUsR0FBRyxFQUFFO2dCQUNwQixJQUFJO29CQUNGLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztpQkFDbEI7Z0JBQUMsT0FBTyxHQUFHLEVBQUUsR0FBRTtZQUNsQixDQUFDLENBQUMsQ0FBQztTQUNKO1FBRUQsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQzs7OEhBakVVLGNBQWMsb0ZBSUwsMEJBQTBCOytIQUpuQyxjQUFjLGlCQTNEdkIsaUNBQWlDO1FBQ2pDLG9CQUFvQjtRQUNwQixpQkFBaUI7UUFDakIsY0FBYyxFQUFFLG1CQUFtQixFQUFFLG9CQUFvQixFQUFFLDBCQUEwQixFQUFFLHdCQUF3QjtRQUMvRyxtQkFBbUI7UUFDbkIsNkJBQTZCO1FBQzdCLG1DQUFtQztRQUNuQywwQkFBMEI7UUFDMUIsNkJBQTZCO1FBQzdCLDhCQUE4QjtRQUM5Qiw4QkFBOEI7UUFDOUIsd0JBQXdCLEVBQUUsOEJBQThCO1FBQ3hELDJCQUEyQjtRQUMzQixxQkFBcUI7UUFDckIsMkJBQTJCO1FBQzNCLHlCQUF5QjtRQUV6QixtQkFBbUI7UUFFbkIsb0NBQW9DLEVBQUUsaUJBQWlCO1FBQ3ZELDRCQUE0QjtRQUM1Qiw2Q0FBNkM7UUFDN0Msb0NBQW9DLEVBQUUsc0NBQXNDO1FBRTVFLGtDQUFrQztRQUVsQyxpQkFBaUIsYUEvQmpCLFlBQVk7UUFDWixlQUFlLEVBQUUsa0JBQWtCO1FBQ25DLGNBQWMsYUFtQ2QsY0FBYyxFQUFFLG1CQUFtQixFQUFFLG9CQUFvQixFQUFFLDBCQUEwQixFQUFFLHdCQUF3QjtRQUMvRyxtQkFBbUI7UUFDbkIsNkJBQTZCO1FBQzdCLG1DQUFtQztRQUNuQywwQkFBMEI7UUFDMUIsNkJBQTZCO1FBQzdCLDhCQUE4QjtRQUM5Qiw4QkFBOEI7UUFDOUIsd0JBQXdCLEVBQUUsOEJBQThCLEVBQUUsaUJBQWlCO1FBQzNFLDJCQUEyQjtRQUMzQixxQkFBcUI7UUFDckIsMkJBQTJCO1FBQzNCLHlCQUF5QjtRQUV6QixtQkFBbUI7UUFDbkIsNEJBQTRCO1FBQzVCLDZDQUE2QztRQUM3QyxvQ0FBb0MsRUFBRSxzQ0FBc0M7UUFFNUUsa0NBQWtDO1FBRWxDLGlCQUFpQjsrSEFNUixjQUFjLGFBL0JkO1FBQ1QsR0FBRyxTQUFTO0tBQ2IsWUFwQ1E7WUFDUCxZQUFZO1lBQ1osZUFBZSxFQUFFLGtCQUFrQjtZQUNuQyxjQUFjO1NBQ2Y7MkZBNkRVLGNBQWM7a0JBbEUxQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLGVBQWUsRUFBRSxrQkFBa0I7d0JBQ25DLGNBQWM7cUJBQ2Y7b0JBQ0QsWUFBWSxFQUFFO3dCQUNaLGlDQUFpQzt3QkFDakMsb0JBQW9CO3dCQUNwQixpQkFBaUI7d0JBQ2pCLGNBQWMsRUFBRSxtQkFBbUIsRUFBRSxvQkFBb0IsRUFBRSwwQkFBMEIsRUFBRSx3QkFBd0I7d0JBQy9HLG1CQUFtQjt3QkFDbkIsNkJBQTZCO3dCQUM3QixtQ0FBbUM7d0JBQ25DLDBCQUEwQjt3QkFDMUIsNkJBQTZCO3dCQUM3Qiw4QkFBOEI7d0JBQzlCLDhCQUE4Qjt3QkFDOUIsd0JBQXdCLEVBQUUsOEJBQThCO3dCQUN4RCwyQkFBMkI7d0JBQzNCLHFCQUFxQjt3QkFDckIsMkJBQTJCO3dCQUMzQix5QkFBeUI7d0JBRXpCLG1CQUFtQjt3QkFFbkIsb0NBQW9DLEVBQUUsaUJBQWlCO3dCQUN2RCw0QkFBNEI7d0JBQzVCLDZDQUE2Qzt3QkFDN0Msb0NBQW9DLEVBQUUsc0NBQXNDO3dCQUU1RSxrQ0FBa0M7d0JBRWxDLGlCQUFpQjtxQkFDbEI7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULEdBQUcsU0FBUztxQkFDYjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsY0FBYyxFQUFFLG1CQUFtQixFQUFFLG9CQUFvQixFQUFFLDBCQUEwQixFQUFFLHdCQUF3Qjt3QkFDL0csbUJBQW1CO3dCQUNuQiw2QkFBNkI7d0JBQzdCLG1DQUFtQzt3QkFDbkMsMEJBQTBCO3dCQUMxQiw2QkFBNkI7d0JBQzdCLDhCQUE4Qjt3QkFDOUIsOEJBQThCO3dCQUM5Qix3QkFBd0IsRUFBRSw4QkFBOEIsRUFBRSxpQkFBaUI7d0JBQzNFLDJCQUEyQjt3QkFDM0IscUJBQXFCO3dCQUNyQiwyQkFBMkI7d0JBQzNCLHlCQUF5Qjt3QkFFekIsbUJBQW1CO3dCQUNuQiw0QkFBNEI7d0JBQzVCLDZDQUE2Qzt3QkFDN0Msb0NBQW9DLEVBQUUsc0NBQXNDO3dCQUU1RSxrQ0FBa0M7d0JBRWxDLGlCQUFpQjtxQkFDbEI7b0JBQ0QsMkZBQTJGO29CQUMzRixnTEFBZ0w7b0JBQ2hMLGVBQWUsRUFBRSxDQUFFLDJCQUEyQixFQUFFLHFCQUFxQixFQUFFLDJCQUEyQixFQUFHLHlCQUF5QixDQUFDO2lCQUNoSTs7MEJBS2MsTUFBTTsyQkFBQywwQkFBMEI7OzBCQUFHLFFBQVE7OzBCQUFJLElBQUkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnRSZWYsXG4gIEluamVjdCxcbiAgSW5qZWN0aW9uVG9rZW4sXG4gIEluamVjdG9yLFxuICBUeXBlLFxuICBPcHRpb25hbCxcbiAgTmdNb2R1bGUsXG4gIE5nTW9kdWxlUmVmLFxuICBNb2R1bGVXaXRoUHJvdmlkZXJzLFxuICBTZWxmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IFNjcm9sbGluZ01vZHVsZSBhcyBTY3JvbGxpbmdNb2R1bGVFeHAgfSBmcm9tICdAYW5ndWxhci9jZGstZXhwZXJpbWVudGFsL3Njcm9sbGluZyc7XG5pbXBvcnQgeyBTY3JvbGxpbmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcbmltcG9ydCB7IENka1RhYmxlTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcbmltcG9ydCB7IFBFQl9OR1JJRF9DT05GSUcsIFBibE5ncmlkQ29uZmlnLCBQYmxOZ3JpZENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAcGVidWxhL25ncmlkL2NvcmUnO1xuXG5cbi8qKlxuICogTk9URSBBQk9VVCBJTVBPUlRTXG4gKlxuICogRE8gTk9UIElNUE9SVCBGUk9NIEJBUlJFTCBNT0RVTEVTIE9SIEFOWSBNT0RVTEUgVEhBVCBBR0dSRUdBVEUgQU5EIEVYUE9SVCBTWU1CT0xTXG4gKiBUSEUgQU5HVUxBUiBOR0MgQ09NUElMRVIgRE9FUyBOT1QgSEFORExFIElUIFdFTEwgQU5EIFRIRSBFWFBPUlRFRCBDT0RFIE1JR0hUIE5PVCBXT1JLIChNRVRBREFUQSBJU1NVRSlcbiAqXG4gKiBUSEUgQ0lSQ1VMQVIgUlVOVElNRSBERVRFQ1RJT04gRE9FUyBOT1QgV09SSyBJTiBUSElTIENBU0UgQkVDQVVTRSBUSEVSRSBJUyBOTyBBQ1RVQUwgQ0lSQ1VMQVIgUkVGRVJFTkNFXG4gKiBJVCBIQVBQRU5TIEJFQ0FVU0UgT0YgVEhFIFdBWSBBTkdVTEFSIFJFLUJVSUxEUyBUSEUgRC5UUyBGSUxFUyBBTkQgTUVUQURBVEEgRklMRVNcbiAqL1xuaW1wb3J0IHsgUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UgfSBmcm9tICcuL2dyaWQvcmVnaXN0cnkvcmVnaXN0cnkuc2VydmljZSc7XG5pbXBvcnQgeyBQYmxDZGtUYWJsZUNvbXBvbmVudCB9ICBmcm9tICcuL2dyaWQvcGJsLWNkay10YWJsZS9wYmwtY2RrLXRhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQYmxOZ3JpZFJvd0RlZiwgUGJsTmdyaWRSb3dPdmVycmlkZSB9IGZyb20gJy4vZ3JpZC9yb3cvcm93LWRlZi5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgUGJsTmdyaWRSb3dDb21wb25lbnQgfSBmcm9tICcuL2dyaWQvcm93L3Jvdy5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGJsTmdyaWRDb2x1bW5Sb3dDb21wb25lbnQgfSBmcm9tICcuL2dyaWQvcm93L2NvbHVtbnMtcm93LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQYmxOZ3JpZE1ldGFSb3dDb21wb25lbnQgfSBmcm9tICcuL2dyaWQvcm93L21ldGEtcm93LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQYmxOZ3JpZE1ldGFSb3dDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL2dyaWQvbWV0YS1yb3dzL21ldGEtcm93LWNvbnRhaW5lcic7XG5pbXBvcnQgeyBQYmxOZ3JpZENvbHVtbkRlZiB9IGZyb20gJy4vZ3JpZC9jb2x1bW4vZGlyZWN0aXZlcy9jb2x1bW4tZGVmJztcbmltcG9ydCB7IFBibE5ncmlkSGVhZGVyQ2VsbERlZkRpcmVjdGl2ZSB9IGZyb20gJy4vZ3JpZC9jZWxsL2NlbGwtZGVmL2hlYWRlci1jZWxsLWRlZi5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgUGJsTmdyaWRGb290ZXJDZWxsRGVmRGlyZWN0aXZlIH0gZnJvbSAnLi9ncmlkL2NlbGwvY2VsbC1kZWYvZm9vdGVyLWNlbGwtZGVmLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBQYmxOZ3JpZENlbGxEZWZEaXJlY3RpdmUgfSBmcm9tICcuL2dyaWQvY2VsbC9jZWxsLWRlZi9jZWxsLWRlZi5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgUGJsTmdyaWRFZGl0b3JDZWxsRGVmRGlyZWN0aXZlIH0gZnJvbSAnLi9ncmlkL2NlbGwvY2VsbC1kZWYvZWRpdC1jZWxsLWRlZi5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgUGJsTmdyaWRIZWFkZXJDZWxsQ29tcG9uZW50IH0gZnJvbSAnLi9ncmlkL2NlbGwvaGVhZGVyLWNlbGwuY29tcG9uZW50JztcbmltcG9ydCB7IFBibE5ncmlkQ2VsbENvbXBvbmVudCB9IGZyb20gJy4vZ3JpZC9jZWxsL2NlbGwuY29tcG9uZW50JztcbmltcG9ydCB7IFBibE5ncmlkRm9vdGVyQ2VsbENvbXBvbmVudCB9IGZyb20gJy4vZ3JpZC9jZWxsL2Zvb3Rlci1jZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQYmxOZ3JpZE1ldGFDZWxsQ29tcG9uZW50IH0gZnJvbSAnLi9ncmlkL2NlbGwvbWV0YS1jZWxsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQYmxOZ3JpZENlbGxFZGl0QXV0b0ZvY3VzRGlyZWN0aXZlIH0gZnJvbSAnLi9ncmlkL2NlbGwvY2VsbC1lZGl0LWF1dG8tZm9jdXMuZGlyZWN0aXZlJztcbmltcG9ydCB7IFBibE5ncmlkQ2VsbFN0eWxpbmcgfSBmcm9tICcuL2dyaWQvY2VsbC9jZWxsLXN0eWxpbmcuZGlyZWN0aXZlJztcbmltcG9ydCB7IFBibE5ncmlkT3V0ZXJTZWN0aW9uRGlyZWN0aXZlIH0gZnJvbSAnLi9ncmlkL2RpcmVjdGl2ZXMvZGlyZWN0aXZlcyc7XG5pbXBvcnQgeyBQYmxOZ3JpZEhlYWRlckV4dGVuc2lvblJlZkRpcmVjdGl2ZSB9IGZyb20gJy4vZ3JpZC9yZWdpc3RyeS9kaXJlY3RpdmVzL2RhdGEtaGVhZGVyLWV4dGVuc2lvbnMnO1xuaW1wb3J0IHsgUGJsTmdyaWROb0RhdGFSZWZEaXJlY3RpdmUgfSBmcm9tICcuL2dyaWQvcmVnaXN0cnkvZGlyZWN0aXZlcy9uby1kYXRhLXJlZi5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgUGJsTmdyaWRQYWdpbmF0b3JSZWZEaXJlY3RpdmUgfSBmcm9tICcuL2dyaWQvcmVnaXN0cnkvZGlyZWN0aXZlcy9wYWdpbmF0b3ItcmVmLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBQYmxOZ3JpZEhpZGVDb2x1bW5zIH0gZnJvbSAnLi9ncmlkL2ZlYXR1cmVzL2hpZGUtY29sdW1ucy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgUGJsQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0Q29tcG9uZW50IH0gZnJvbSAnLi9ncmlkL2ZlYXR1cmVzL3ZpcnR1YWwtc2Nyb2xsL3ZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQYmxDZGtWaXJ0dWFsU2Nyb2xsRGlyZWN0aXZlIH0gZnJvbSAnLi9ncmlkL2ZlYXR1cmVzL3ZpcnR1YWwtc2Nyb2xsL3N0cmF0ZWdpZXMvdi1zY3JvbGwuZGlyZWN0aXZlJztcbi8vIFRPRE86IE1vdmUgdG8gYW4gaW5kZXBlbmRlbnQgcGFja2FnZSBpbiB2NFxuaW1wb3J0IHsgUGJsQ2RrQXV0b1NpemVWaXJ0dWFsU2Nyb2xsRGlyZWN0aXZlIH0gIGZyb20gJy4vZ3JpZC9mZWF0dXJlcy92aXJ0dWFsLXNjcm9sbC9zdHJhdGVnaWVzL2Nkay13cmFwcGVycy92LXNjcm9sbC1hdXRvLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBQYmxDZGtGaXhlZFNpemVkVmlydHVhbFNjcm9sbERpcmVjdGl2ZSB9ICBmcm9tICcuL2dyaWQvZmVhdHVyZXMvdmlydHVhbC1zY3JvbGwvc3RyYXRlZ2llcy9jZGstd3JhcHBlcnMvdi1zY3JvbGwtZml4ZWQuZGlyZWN0aXZlJztcbmltcG9ydCB7IFBibE5ncmlkU2Nyb2xsaW5nIH0gZnJvbSAnLi9ncmlkL2ZlYXR1cmVzL3ZpcnR1YWwtc2Nyb2xsL3Njcm9sbGluZy1wbHVnaW4uZGlyZWN0aXZlJztcbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50IH0gZnJvbSAnLi9ncmlkL25ncmlkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQUk9WSURFUlMgfSBmcm9tICcuL2RpLWZhY3Rvcmllcyc7XG5cbmV4cG9ydCBjb25zdCBDT01NT05fVEFCTEVfVEVNUExBVEVfSU5JVCA9IG5ldyBJbmplY3Rpb25Ub2tlbignQ09NTU9OIFRBQkxFIFRFTVBMQVRFIElOSVQnKTtcblxuZXhwb3J0IGludGVyZmFjZSBDb21tb25UZW1wbGF0ZUluaXQge1xuICBjb21wb25lbnQ6IFR5cGU8YW55PjtcbiAgLyoqXG4gICAqIFdoZW4gdHJ1ZSB3aWxsIHVzZSB0aGUgcm9vdCByZWdpc3RyeSBzZXJ2aWNlIChmb3IgdGVtcGxhdGVzKS5cbiAgICogT3RoZXJ3aXNlLCB1c2VzIHRoZSBwcm92aWRlZCByZWdpc3RyeSBmcm9tIHRoZSBkZXBlbmRlbmN5IHRyZWUuXG4gICAqL1xuICByb290PzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVDb21tb24oY29tcG9uZW50czogQ29tbW9uVGVtcGxhdGVJbml0W10pOiBhbnkge1xuICByZXR1cm4gW1xuICAgIHsgcHJvdmlkZTogQ09NTU9OX1RBQkxFX1RFTVBMQVRFX0lOSVQsIG11bHRpOiB0cnVlLCB1c2VWYWx1ZTogY29tcG9uZW50cyB9LFxuICBdO1xufVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFNjcm9sbGluZ01vZHVsZSwgU2Nyb2xsaW5nTW9kdWxlRXhwLFxuICAgIENka1RhYmxlTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBQYmxOZ3JpZE1ldGFSb3dDb250YWluZXJDb21wb25lbnQsXG4gICAgUGJsQ2RrVGFibGVDb21wb25lbnQsXG4gICAgUGJsTmdyaWRDb2x1bW5EZWYsXG4gICAgUGJsTmdyaWRSb3dEZWYsIFBibE5ncmlkUm93T3ZlcnJpZGUsIFBibE5ncmlkUm93Q29tcG9uZW50LCBQYmxOZ3JpZENvbHVtblJvd0NvbXBvbmVudCwgUGJsTmdyaWRNZXRhUm93Q29tcG9uZW50LFxuICAgIFBibE5ncmlkQ2VsbFN0eWxpbmcsXG4gICAgUGJsTmdyaWRPdXRlclNlY3Rpb25EaXJlY3RpdmUsXG4gICAgUGJsTmdyaWRIZWFkZXJFeHRlbnNpb25SZWZEaXJlY3RpdmUsXG4gICAgUGJsTmdyaWROb0RhdGFSZWZEaXJlY3RpdmUsXG4gICAgUGJsTmdyaWRQYWdpbmF0b3JSZWZEaXJlY3RpdmUsXG4gICAgUGJsTmdyaWRIZWFkZXJDZWxsRGVmRGlyZWN0aXZlLFxuICAgIFBibE5ncmlkRm9vdGVyQ2VsbERlZkRpcmVjdGl2ZSxcbiAgICBQYmxOZ3JpZENlbGxEZWZEaXJlY3RpdmUsIFBibE5ncmlkRWRpdG9yQ2VsbERlZkRpcmVjdGl2ZSxcbiAgICBQYmxOZ3JpZEhlYWRlckNlbGxDb21wb25lbnQsXG4gICAgUGJsTmdyaWRDZWxsQ29tcG9uZW50LFxuICAgIFBibE5ncmlkRm9vdGVyQ2VsbENvbXBvbmVudCxcbiAgICBQYmxOZ3JpZE1ldGFDZWxsQ29tcG9uZW50LFxuXG4gICAgUGJsTmdyaWRIaWRlQ29sdW1ucyxcblxuICAgIFBibENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydENvbXBvbmVudCwgUGJsTmdyaWRTY3JvbGxpbmcsXG4gICAgUGJsQ2RrVmlydHVhbFNjcm9sbERpcmVjdGl2ZSxcbiAgICAvLyBUT0RPOiBNb3ZlIHRvIGFuIGluZGVwZW5kZW50IHBhY2thZ2UgaW4gdjRcbiAgICBQYmxDZGtBdXRvU2l6ZVZpcnR1YWxTY3JvbGxEaXJlY3RpdmUsIFBibENka0ZpeGVkU2l6ZWRWaXJ0dWFsU2Nyb2xsRGlyZWN0aXZlLFxuXG4gICAgUGJsTmdyaWRDZWxsRWRpdEF1dG9Gb2N1c0RpcmVjdGl2ZSxcblxuICAgIFBibE5ncmlkQ29tcG9uZW50LFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICAuLi5QUk9WSURFUlMsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBQYmxOZ3JpZFJvd0RlZiwgUGJsTmdyaWRSb3dPdmVycmlkZSwgUGJsTmdyaWRSb3dDb21wb25lbnQsIFBibE5ncmlkQ29sdW1uUm93Q29tcG9uZW50LCBQYmxOZ3JpZE1ldGFSb3dDb21wb25lbnQsXG4gICAgUGJsTmdyaWRDZWxsU3R5bGluZyxcbiAgICBQYmxOZ3JpZE91dGVyU2VjdGlvbkRpcmVjdGl2ZSxcbiAgICBQYmxOZ3JpZEhlYWRlckV4dGVuc2lvblJlZkRpcmVjdGl2ZSxcbiAgICBQYmxOZ3JpZE5vRGF0YVJlZkRpcmVjdGl2ZSxcbiAgICBQYmxOZ3JpZFBhZ2luYXRvclJlZkRpcmVjdGl2ZSxcbiAgICBQYmxOZ3JpZEhlYWRlckNlbGxEZWZEaXJlY3RpdmUsXG4gICAgUGJsTmdyaWRGb290ZXJDZWxsRGVmRGlyZWN0aXZlLFxuICAgIFBibE5ncmlkQ2VsbERlZkRpcmVjdGl2ZSwgUGJsTmdyaWRFZGl0b3JDZWxsRGVmRGlyZWN0aXZlLCBQYmxOZ3JpZFNjcm9sbGluZyxcbiAgICBQYmxOZ3JpZEhlYWRlckNlbGxDb21wb25lbnQsXG4gICAgUGJsTmdyaWRDZWxsQ29tcG9uZW50LFxuICAgIFBibE5ncmlkRm9vdGVyQ2VsbENvbXBvbmVudCxcbiAgICBQYmxOZ3JpZE1ldGFDZWxsQ29tcG9uZW50LFxuXG4gICAgUGJsTmdyaWRIaWRlQ29sdW1ucyxcbiAgICBQYmxDZGtWaXJ0dWFsU2Nyb2xsRGlyZWN0aXZlLFxuICAgIC8vIFRPRE86IE1vdmUgdG8gYW4gaW5kZXBlbmRlbnQgcGFja2FnZSBpbiB2NFxuICAgIFBibENka0F1dG9TaXplVmlydHVhbFNjcm9sbERpcmVjdGl2ZSwgUGJsQ2RrRml4ZWRTaXplZFZpcnR1YWxTY3JvbGxEaXJlY3RpdmUsXG5cbiAgICBQYmxOZ3JpZENlbGxFZGl0QXV0b0ZvY3VzRGlyZWN0aXZlLFxuXG4gICAgUGJsTmdyaWRDb21wb25lbnQsXG4gIF0sXG4gIC8vIFRPRE8oUkVGQUNUT1JfUkVGIDIpOiByZW1vdmUgd2hlbiBWaWV3RW5naW5lIGlzIG5vIGxvbmdlciBzdXBwb3J0ZWQgYnkgYW5ndWxhciAoVjEyID8/PylcbiAgLy8gU2luY2UgdGhlc2UgYXJlIG5vIGxvbmdlciBwYXJ0IG9mIHRoZSBtYWluIGdyaWQgdGVtcGxhdGUgYnV0IG5vdyBnZW5lcmF0ZWQgcHJvZ3JhbW1hdGljYWxseSB3ZSBuZWVkIHRvIHB1dCB0aGVtIGhlcmUgZm9yIG5vbiB2aWV3RW5naW5lIGNvbXBpbGF0aW9uIHRvIHdvcmsgKGUuZy4gc3RhY2tibGl0eilcbiAgZW50cnlDb21wb25lbnRzOiBbIFBibE5ncmlkSGVhZGVyQ2VsbENvbXBvbmVudCwgUGJsTmdyaWRDZWxsQ29tcG9uZW50LCBQYmxOZ3JpZEZvb3RlckNlbGxDb21wb25lbnQgLCBQYmxOZ3JpZE1ldGFDZWxsQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZE1vZHVsZSB7XG5cbiAgY29uc3RydWN0b3IobmdSZWY6IE5nTW9kdWxlUmVmPGFueT4sXG4gICAgICAgICAgICAgIHJlZ2lzdHJ5OiBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSxcbiAgICAgICAgICAgICAgQEluamVjdChDT01NT05fVEFCTEVfVEVNUExBVEVfSU5JVCkgQE9wdGlvbmFsKCkgQFNlbGYoKSBjb21wb25lbnRzOiBDb21tb25UZW1wbGF0ZUluaXRbXVtdKSB7XG5cbiAgICBpZiAoY29tcG9uZW50cykge1xuICAgICAgZm9yIChjb25zdCBtdWx0aSBvZiBjb21wb25lbnRzKSB7XG4gICAgICAgIGZvciAoY29uc3QgYyBvZiBtdWx0aSkge1xuICAgICAgICAgIGlmIChjLnJvb3QpIHtcbiAgICAgICAgICAgIHJlZ2lzdHJ5ID0gcmVnaXN0cnkuZ2V0Um9vdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBQYmxOZ3JpZE1vZHVsZS5sb2FkQ29tbW9uVGVtcGxhdGVzKG5nUmVmLCBjLmNvbXBvbmVudCwgeyByZWdpc3RyeSwgZGVzdHJveTogdHJ1ZSB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZzogUGJsTmdyaWRDb25maWcsIGNvbXBvbmVudHM6IENvbW1vblRlbXBsYXRlSW5pdFtdKTogTW9kdWxlV2l0aFByb3ZpZGVyczxQYmxOZ3JpZE1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogUGJsTmdyaWRNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiBQRUJfTkdSSURfQ09ORklHLCB1c2VWYWx1ZTogY29uZmlnIH0sXG4gICAgICAgIFBibE5ncmlkQ29uZmlnU2VydmljZSxcbiAgICAgICAgcHJvdmlkZUNvbW1vbihjb21wb25lbnRzKSxcbiAgICAgIF1cbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIHdpdGhDb21tb24oY29tcG9uZW50czogQ29tbW9uVGVtcGxhdGVJbml0W10pOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFBibE5ncmlkTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBQYmxOZ3JpZE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogcHJvdmlkZUNvbW1vbihjb21wb25lbnRzKSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGxvYWRDb21tb25UZW1wbGF0ZXM8VD4obmdSZWY6IE5nTW9kdWxlUmVmPGFueT4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudDogVHlwZTxUPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucz86IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qKiBXaGVuIHNldCB3aWxsIHVzZSBpdCBhcyBmaXJzdCByZWdpc3RyeSBpbiB0aGUgREkgdHJlZSAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVnaXN0cnk/OiBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qKiBXaGVuIHNldCB3aWxsIGRlc3Ryb3kgdGhlIGNvbXBvbmVudCB3aGVuIHRoZSBtb2R1bGUgaXMgZGVzdHJveWVkLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzdHJveT86IGJvb2xlYW47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pOiBDb21wb25lbnRSZWY8VD4ge1xuICAgIGxldCB7IGluamVjdG9yIH0gPSBuZ1JlZjtcbiAgICBjb25zdCB7IHJlZ2lzdHJ5LCBkZXN0cm95IH0gPSBvcHRpb25zIHx8ICh7fSBhcyBhbnkpO1xuXG4gICAgaWYgKHJlZ2lzdHJ5KSB7XG4gICAgICBpbmplY3RvciA9IEluamVjdG9yLmNyZWF0ZSh7XG4gICAgICAgIHByb3ZpZGVyczogWyB7IHByb3ZpZGU6IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlLCB1c2VWYWx1ZTogcmVnaXN0cnkgfSBdLFxuICAgICAgICBwYXJlbnQ6IG5nUmVmLmluamVjdG9yXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBjbXBSZWYgPSBuZ1JlZi5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3Rvcnk8VD4oY29tcG9uZW50KS5jcmVhdGUoaW5qZWN0b3IpO1xuICAgIGNtcFJlZi5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgaWYgKGRlc3Ryb3kpIHtcbiAgICAgIG5nUmVmLm9uRGVzdHJveSggKCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNtcFJlZi5kZXN0cm95KCk7XG4gICAgICAgIH0gY2F0Y2goIGVycikge31cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBjbXBSZWY7XG4gIH1cbn1cbiJdfQ==