import { NgModule, Optional, SkipSelf, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PblNgridConfigService } from '@pebula/ngrid/core';
import { PblNgridRegistryService, PblNgridModule, ngridPlugin } from '@pebula/ngrid';
import { PblNgridOverlayPanelModule, PblNgridOverlayPanelComponentExtension } from '@pebula/ngrid/overlay-panel';
import { MatHeaderContextMenuTrigger } from './header-context/header-context-menu-trigger';
import { MatHeaderContextMenuExtension } from './header-context/header-context-menu-extension';
import { PblNgridMatHeaderContextMenuPlugin, PLUGIN_KEY } from './header-context/header-context-menu.directive';
import { MatExcelStyleHeaderMenu } from './header-context/styles/excel-style-header-menu';
import * as i0 from "@angular/core";
import * as i1 from "@pebula/ngrid";
import * as i2 from "@pebula/ngrid/core";
export class PblNgridContextMenuModule {
    constructor(parentModule, registry, cfr, configService) {
        if (parentModule) {
            return;
        }
        registry.addMulti('dataHeaderExtensions', new MatHeaderContextMenuExtension(cfr));
        registry.addMulti('overlayPanels', new PblNgridOverlayPanelComponentExtension('excelMenu', MatExcelStyleHeaderMenu, cfr));
    }
}
PblNgridContextMenuModule.NGRID_PLUGIN = ngridPlugin({ id: PLUGIN_KEY }, PblNgridMatHeaderContextMenuPlugin);
/** @nocollapse */ PblNgridContextMenuModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridContextMenuModule, deps: [{ token: PblNgridContextMenuModule, optional: true, skipSelf: true }, { token: i1.PblNgridRegistryService }, { token: i0.ComponentFactoryResolver }, { token: i2.PblNgridConfigService }], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ PblNgridContextMenuModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridContextMenuModule, declarations: [MatHeaderContextMenuTrigger,
        PblNgridMatHeaderContextMenuPlugin,
        MatExcelStyleHeaderMenu], imports: [CommonModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatFormFieldModule,
        MatInputModule,
        PblNgridModule,
        PblNgridOverlayPanelModule], exports: [PblNgridMatHeaderContextMenuPlugin] });
/** @nocollapse */ PblNgridContextMenuModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridContextMenuModule, imports: [[
            CommonModule,
            MatIconModule,
            MatButtonModule,
            MatMenuModule,
            MatFormFieldModule,
            MatInputModule,
            PblNgridModule,
            PblNgridOverlayPanelModule,
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridContextMenuModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        MatIconModule,
                        MatButtonModule,
                        MatMenuModule,
                        MatFormFieldModule,
                        MatInputModule,
                        PblNgridModule,
                        PblNgridOverlayPanelModule,
                    ],
                    declarations: [
                        MatHeaderContextMenuTrigger,
                        PblNgridMatHeaderContextMenuPlugin,
                        MatExcelStyleHeaderMenu,
                    ],
                    exports: [
                        PblNgridMatHeaderContextMenuPlugin,
                    ],
                    entryComponents: [
                        // TODO(REFACTOR_REF 2): remove when ViewEngine is no longer supported by angular (V12 ???)
                        MatHeaderContextMenuTrigger,
                        MatExcelStyleHeaderMenu,
                    ],
                }]
        }], ctorParameters: function () { return [{ type: PblNgridContextMenuModule, decorators: [{
                    type: Optional
                }, {
                    type: SkipSelf
                }] }, { type: i1.PblNgridRegistryService }, { type: i0.ComponentFactoryResolver }, { type: i2.PblNgridConfigService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1tZW51Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmdyaWQtbWF0ZXJpYWwvY29udGV4dC1tZW51L3NyYy9saWIvY29udGV4dC1tZW51Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUV6RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsY0FBYyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsc0NBQXNDLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUVqSCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUMzRixPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUMvRixPQUFPLEVBQUUsa0NBQWtDLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDaEgsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0saURBQWlELENBQUM7Ozs7QUEyQjFGLE1BQU0sT0FBTyx5QkFBeUI7SUFHcEMsWUFBb0MsWUFBdUMsRUFDL0QsUUFBaUMsRUFDakMsR0FBNkIsRUFDN0IsYUFBb0M7UUFDOUMsSUFBSSxZQUFZLEVBQUU7WUFDaEIsT0FBTztTQUNSO1FBQ0QsUUFBUSxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLDZCQUE2QixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDbEYsUUFBUSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsSUFBSSxzQ0FBc0MsQ0FBQyxXQUFXLEVBQUUsdUJBQXVCLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUM1SCxDQUFDOztBQVhlLHNDQUFZLEdBQUcsV0FBVyxDQUFDLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxFQUFFLGtDQUFrQyxDQUFDLENBQUM7eUlBRHhGLHlCQUF5QixrQkFHYyx5QkFBeUI7MElBSGhFLHlCQUF5QixpQkFibEMsMkJBQTJCO1FBQzNCLGtDQUFrQztRQUNsQyx1QkFBdUIsYUFadkIsWUFBWTtRQUNaLGFBQWE7UUFDYixlQUFlO1FBQ2YsYUFBYTtRQUNiLGtCQUFrQjtRQUNsQixjQUFjO1FBQ2QsY0FBYztRQUNkLDBCQUEwQixhQVExQixrQ0FBa0M7MElBUXpCLHlCQUF5QixZQXhCM0I7WUFDUCxZQUFZO1lBQ1osYUFBYTtZQUNiLGVBQWU7WUFDZixhQUFhO1lBQ2Isa0JBQWtCO1lBQ2xCLGNBQWM7WUFDZCxjQUFjO1lBQ2QsMEJBQTBCO1NBQzNCOzJGQWVVLHlCQUF5QjtrQkF6QnJDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osYUFBYTt3QkFDYixlQUFlO3dCQUNmLGFBQWE7d0JBQ2Isa0JBQWtCO3dCQUNsQixjQUFjO3dCQUNkLGNBQWM7d0JBQ2QsMEJBQTBCO3FCQUMzQjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1osMkJBQTJCO3dCQUMzQixrQ0FBa0M7d0JBQ2xDLHVCQUF1QjtxQkFDeEI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLGtDQUFrQztxQkFDbkM7b0JBQ0QsZUFBZSxFQUFFO3dCQUNmLDJGQUEyRjt3QkFDM0YsMkJBQTJCO3dCQUMzQix1QkFBdUI7cUJBQ3hCO2lCQUNGOzBEQUltRCx5QkFBeUI7MEJBQTlELFFBQVE7OzBCQUFJLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgT3B0aW9uYWwsIFNraXBTZWxmLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNYXRJY29uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaWNvbic7XG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24nO1xuaW1wb3J0IHsgTWF0TWVudU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL21lbnUnO1xuaW1wb3J0IHsgTWF0Rm9ybUZpZWxkTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZm9ybS1maWVsZCc7XG5pbXBvcnQgeyBNYXRJbnB1dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2lucHV0JztcblxuaW1wb3J0IHsgUGJsTmdyaWRDb25maWdTZXJ2aWNlIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZC9jb3JlJztcbmltcG9ydCB7IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlLCBQYmxOZ3JpZE1vZHVsZSwgbmdyaWRQbHVnaW4gfSBmcm9tICdAcGVidWxhL25ncmlkJztcbmltcG9ydCB7IFBibE5ncmlkT3ZlcmxheVBhbmVsTW9kdWxlLCBQYmxOZ3JpZE92ZXJsYXlQYW5lbENvbXBvbmVudEV4dGVuc2lvbiB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQvb3ZlcmxheS1wYW5lbCc7XG5cbmltcG9ydCB7IE1hdEhlYWRlckNvbnRleHRNZW51VHJpZ2dlciB9IGZyb20gJy4vaGVhZGVyLWNvbnRleHQvaGVhZGVyLWNvbnRleHQtbWVudS10cmlnZ2VyJztcbmltcG9ydCB7IE1hdEhlYWRlckNvbnRleHRNZW51RXh0ZW5zaW9uIH0gZnJvbSAnLi9oZWFkZXItY29udGV4dC9oZWFkZXItY29udGV4dC1tZW51LWV4dGVuc2lvbic7XG5pbXBvcnQgeyBQYmxOZ3JpZE1hdEhlYWRlckNvbnRleHRNZW51UGx1Z2luLCBQTFVHSU5fS0VZIH0gZnJvbSAnLi9oZWFkZXItY29udGV4dC9oZWFkZXItY29udGV4dC1tZW51LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNYXRFeGNlbFN0eWxlSGVhZGVyTWVudSB9IGZyb20gJy4vaGVhZGVyLWNvbnRleHQvc3R5bGVzL2V4Y2VsLXN0eWxlLWhlYWRlci1tZW51JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBNYXRNZW51TW9kdWxlLFxuICAgIE1hdEZvcm1GaWVsZE1vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICBQYmxOZ3JpZE1vZHVsZSxcbiAgICBQYmxOZ3JpZE92ZXJsYXlQYW5lbE1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTWF0SGVhZGVyQ29udGV4dE1lbnVUcmlnZ2VyLFxuICAgIFBibE5ncmlkTWF0SGVhZGVyQ29udGV4dE1lbnVQbHVnaW4sXG4gICAgTWF0RXhjZWxTdHlsZUhlYWRlck1lbnUsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBQYmxOZ3JpZE1hdEhlYWRlckNvbnRleHRNZW51UGx1Z2luLFxuICBdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICAvLyBUT0RPKFJFRkFDVE9SX1JFRiAyKTogcmVtb3ZlIHdoZW4gVmlld0VuZ2luZSBpcyBubyBsb25nZXIgc3VwcG9ydGVkIGJ5IGFuZ3VsYXIgKFYxMiA/Pz8pXG4gICAgTWF0SGVhZGVyQ29udGV4dE1lbnVUcmlnZ2VyLFxuICAgIE1hdEV4Y2VsU3R5bGVIZWFkZXJNZW51LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZENvbnRleHRNZW51TW9kdWxlIHtcbiAgc3RhdGljIHJlYWRvbmx5IE5HUklEX1BMVUdJTiA9IG5ncmlkUGx1Z2luKHsgaWQ6IFBMVUdJTl9LRVkgfSwgUGJsTmdyaWRNYXRIZWFkZXJDb250ZXh0TWVudVBsdWdpbik7XG5cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcGFyZW50TW9kdWxlOiBQYmxOZ3JpZENvbnRleHRNZW51TW9kdWxlLFxuICAgICAgICAgICAgICByZWdpc3RyeTogUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UsXG4gICAgICAgICAgICAgIGNmcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgICAgICAgICAgICBjb25maWdTZXJ2aWNlOiBQYmxOZ3JpZENvbmZpZ1NlcnZpY2UpIHtcbiAgICBpZiAocGFyZW50TW9kdWxlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJlZ2lzdHJ5LmFkZE11bHRpKCdkYXRhSGVhZGVyRXh0ZW5zaW9ucycsIG5ldyBNYXRIZWFkZXJDb250ZXh0TWVudUV4dGVuc2lvbihjZnIpKTtcbiAgICByZWdpc3RyeS5hZGRNdWx0aSgnb3ZlcmxheVBhbmVscycsIG5ldyBQYmxOZ3JpZE92ZXJsYXlQYW5lbENvbXBvbmVudEV4dGVuc2lvbignZXhjZWxNZW51JywgTWF0RXhjZWxTdHlsZUhlYWRlck1lbnUsIGNmcikpO1xuICB9XG59XG4iXX0=