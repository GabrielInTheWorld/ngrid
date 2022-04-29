import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { PblNgridModule } from '@pebula/ngrid';
import { PblNgridBsPagination } from './bs-pagination.component';
import * as i0 from "@angular/core";
export class PblNgridBsPaginationModule {
}
/** @nocollapse */ PblNgridBsPaginationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridBsPaginationModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ PblNgridBsPaginationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridBsPaginationModule, declarations: [PblNgridBsPagination], imports: [CommonModule, NgbPaginationModule, PblNgridModule], exports: [NgbPaginationModule, PblNgridBsPagination] });
/** @nocollapse */ PblNgridBsPaginationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridBsPaginationModule, imports: [[CommonModule, NgbPaginationModule, PblNgridModule], NgbPaginationModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridBsPaginationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, NgbPaginationModule, PblNgridModule],
                    declarations: [PblNgridBsPagination],
                    exports: [NgbPaginationModule, PblNgridBsPagination],
                    // TODO(REFACTOR_REF 2): remove when ViewEngine is no longer supported by angular (V12 ???)
                    entryComponents: [PblNgridBsPagination]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtcGFnaW5hdGlvbi5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL25ncmlkLWJvb3RzdHJhcC9wYWdpbmF0aW9uL3NyYy9saWIvYnMtcGFnaW5hdGlvbi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBc0MsTUFBTSxlQUFlLENBQUM7QUFDN0UsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRWpFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7O0FBU2pFLE1BQU0sT0FBTywwQkFBMEI7OzBJQUExQiwwQkFBMEI7MklBQTFCLDBCQUEwQixpQkFMckIsb0JBQW9CLGFBRHpCLFlBQVksRUFBRSxtQkFBbUIsRUFBRSxjQUFjLGFBRWpELG1CQUFtQixFQUFFLG9CQUFvQjsySUFJekMsMEJBQTBCLFlBTjVCLENBQUUsWUFBWSxFQUFFLG1CQUFtQixFQUFFLGNBQWMsQ0FBRSxFQUVuRCxtQkFBbUI7MkZBSW5CLDBCQUEwQjtrQkFQdEMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBRSxZQUFZLEVBQUUsbUJBQW1CLEVBQUUsY0FBYyxDQUFFO29CQUM5RCxZQUFZLEVBQUUsQ0FBRSxvQkFBb0IsQ0FBRTtvQkFDdEMsT0FBTyxFQUFFLENBQUUsbUJBQW1CLEVBQUUsb0JBQW9CLENBQUU7b0JBQ3RELDJGQUEyRjtvQkFDM0YsZUFBZSxFQUFFLENBQUUsb0JBQW9CLENBQUU7aUJBQzFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ2JQYWdpbmF0aW9uTW9kdWxlIH0gZnJvbSAnQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAnO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZE1vZHVsZSB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuaW1wb3J0IHsgUGJsTmdyaWRCc1BhZ2luYXRpb24gfSBmcm9tICcuL2JzLXBhZ2luYXRpb24uY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogWyBDb21tb25Nb2R1bGUsIE5nYlBhZ2luYXRpb25Nb2R1bGUsIFBibE5ncmlkTW9kdWxlIF0sXG4gIGRlY2xhcmF0aW9uczogWyBQYmxOZ3JpZEJzUGFnaW5hdGlvbiBdLFxuICBleHBvcnRzOiBbIE5nYlBhZ2luYXRpb25Nb2R1bGUsIFBibE5ncmlkQnNQYWdpbmF0aW9uIF0sXG4gIC8vIFRPRE8oUkVGQUNUT1JfUkVGIDIpOiByZW1vdmUgd2hlbiBWaWV3RW5naW5lIGlzIG5vIGxvbmdlciBzdXBwb3J0ZWQgYnkgYW5ndWxhciAoVjEyID8/PylcbiAgZW50cnlDb21wb25lbnRzOiBbIFBibE5ncmlkQnNQYWdpbmF0aW9uIF1cbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRCc1BhZ2luYXRpb25Nb2R1bGUgeyB9XG4iXX0=