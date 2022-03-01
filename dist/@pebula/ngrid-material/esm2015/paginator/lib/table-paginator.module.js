import { NgModule, ComponentFactoryResolver, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { PblNgridModule } from '@pebula/ngrid';
import { PblPaginatorComponent } from './table-paginator.component';
import * as i0 from "@angular/core";
// TODO: Remove MatPaginatorModule and the initial code in the constructor
// set the styles in the SCSS.
export class PblNgridPaginatorModule {
    constructor(cf, injector) {
        // this is a workaround to ensure CSS from mat slider is loaded, otherwise it is omitted.
        cf.resolveComponentFactory(MatPaginator).create(injector);
    }
}
/** @nocollapse */ PblNgridPaginatorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridPaginatorModule, deps: [{ token: i0.ComponentFactoryResolver }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ PblNgridPaginatorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridPaginatorModule, declarations: [PblPaginatorComponent], imports: [CommonModule, MatPaginatorModule, MatSelectModule, MatTooltipModule, MatButtonModule, PblNgridModule], exports: [PblPaginatorComponent] });
/** @nocollapse */ PblNgridPaginatorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridPaginatorModule, imports: [[CommonModule, MatPaginatorModule, MatSelectModule, MatTooltipModule, MatButtonModule, PblNgridModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridPaginatorModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, MatPaginatorModule, MatSelectModule, MatTooltipModule, MatButtonModule, PblNgridModule],
                    declarations: [PblPaginatorComponent],
                    exports: [PblPaginatorComponent],
                    // TODO(REFACTOR_REF 2): remove when ViewEngine is no longer supported by angular (V12 ???)
                    entryComponents: [PblPaginatorComponent, MatPaginator]
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i0.Injector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtcGFnaW5hdG9yLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmdyaWQtbWF0ZXJpYWwvcGFnaW5hdG9yL3NyYy9saWIvdGFibGUtcGFnaW5hdG9yLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLHdCQUF3QixFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQy9FLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFM0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7QUFDcEUsMEVBQTBFO0FBQzFFLDhCQUE4QjtBQVM5QixNQUFNLE9BQU8sdUJBQXVCO0lBQ2xDLFlBQVksRUFBNEIsRUFBRSxRQUFrQjtRQUMxRCx5RkFBeUY7UUFDekYsRUFBRSxDQUFDLHVCQUF1QixDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM1RCxDQUFDOzt1SUFKVSx1QkFBdUI7d0lBQXZCLHVCQUF1QixpQkFMbEIscUJBQXFCLGFBRDFCLFlBQVksRUFBRSxrQkFBa0IsRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZSxFQUFFLGNBQWMsYUFFcEcscUJBQXFCO3dJQUlyQix1QkFBdUIsWUFOekIsQ0FBRSxZQUFZLEVBQUUsa0JBQWtCLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxjQUFjLENBQUU7MkZBTXRHLHVCQUF1QjtrQkFQbkMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBRSxZQUFZLEVBQUUsa0JBQWtCLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxjQUFjLENBQUU7b0JBQ2pILFlBQVksRUFBRSxDQUFFLHFCQUFxQixDQUFFO29CQUN2QyxPQUFPLEVBQUUsQ0FBRSxxQkFBcUIsQ0FBRTtvQkFDbEMsMkZBQTJGO29CQUMzRixlQUFlLEVBQUUsQ0FBRSxxQkFBcUIsRUFBRSxZQUFZLENBQUU7aUJBQ3pEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNYXRQYWdpbmF0b3IsIE1hdFBhZ2luYXRvck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3BhZ2luYXRvcic7XG5pbXBvcnQgeyBNYXRTZWxlY3RNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zZWxlY3QnO1xuaW1wb3J0IHsgTWF0VG9vbHRpcE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3Rvb2x0aXAnO1xuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYnV0dG9uJztcblxuaW1wb3J0IHsgUGJsTmdyaWRNb2R1bGUgfSBmcm9tICdAcGVidWxhL25ncmlkJztcbmltcG9ydCB7IFBibFBhZ2luYXRvckNvbXBvbmVudCB9IGZyb20gJy4vdGFibGUtcGFnaW5hdG9yLmNvbXBvbmVudCc7XG4vLyBUT0RPOiBSZW1vdmUgTWF0UGFnaW5hdG9yTW9kdWxlIGFuZCB0aGUgaW5pdGlhbCBjb2RlIGluIHRoZSBjb25zdHJ1Y3RvclxuLy8gc2V0IHRoZSBzdHlsZXMgaW4gdGhlIFNDU1MuXG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFsgQ29tbW9uTW9kdWxlLCBNYXRQYWdpbmF0b3JNb2R1bGUsIE1hdFNlbGVjdE1vZHVsZSwgTWF0VG9vbHRpcE1vZHVsZSwgTWF0QnV0dG9uTW9kdWxlLCBQYmxOZ3JpZE1vZHVsZSBdLFxuICBkZWNsYXJhdGlvbnM6IFsgUGJsUGFnaW5hdG9yQ29tcG9uZW50IF0sXG4gIGV4cG9ydHM6IFsgUGJsUGFnaW5hdG9yQ29tcG9uZW50IF0sXG4gIC8vIFRPRE8oUkVGQUNUT1JfUkVGIDIpOiByZW1vdmUgd2hlbiBWaWV3RW5naW5lIGlzIG5vIGxvbmdlciBzdXBwb3J0ZWQgYnkgYW5ndWxhciAoVjEyID8/PylcbiAgZW50cnlDb21wb25lbnRzOiBbIFBibFBhZ2luYXRvckNvbXBvbmVudCwgTWF0UGFnaW5hdG9yIF1cbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRQYWdpbmF0b3JNb2R1bGUge1xuICBjb25zdHJ1Y3RvcihjZjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgICAvLyB0aGlzIGlzIGEgd29ya2Fyb3VuZCB0byBlbnN1cmUgQ1NTIGZyb20gbWF0IHNsaWRlciBpcyBsb2FkZWQsIG90aGVyd2lzZSBpdCBpcyBvbWl0dGVkLlxuICAgIGNmLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KE1hdFBhZ2luYXRvcikuY3JlYXRlKGluamVjdG9yKTtcbiAgfVxufVxuIl19