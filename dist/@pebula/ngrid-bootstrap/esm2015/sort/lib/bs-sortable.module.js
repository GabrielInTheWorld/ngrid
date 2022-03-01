import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PblNgridRegistryService, PblNgridModule, ngridPlugin } from '@pebula/ngrid';
import { PblNgridBsSortablePlugin, PLUGIN_KEY } from './bs-sortable-plugin';
import { PblBsSortableExtension } from './bs-sortable-component-extension';
import { PblNgridBsSortable } from './bs-sortable/bs-sortable.component';
import * as i0 from "@angular/core";
import * as i1 from "@pebula/ngrid";
export class PblNgridBsSortableModule {
    constructor(registry, cfr) {
        this.registry = registry;
        registry.addMulti('dataHeaderExtensions', new PblBsSortableExtension(cfr));
    }
}
PblNgridBsSortableModule.NGRID_PLUGIN = ngridPlugin({ id: PLUGIN_KEY }, PblNgridBsSortablePlugin);
/** @nocollapse */ PblNgridBsSortableModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridBsSortableModule, deps: [{ token: i1.PblNgridRegistryService }, { token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ PblNgridBsSortableModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridBsSortableModule, declarations: [PblNgridBsSortablePlugin, PblNgridBsSortable], imports: [CommonModule, PblNgridModule], exports: [PblNgridBsSortablePlugin, PblNgridBsSortable] });
/** @nocollapse */ PblNgridBsSortableModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridBsSortableModule, imports: [[CommonModule, PblNgridModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridBsSortableModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, PblNgridModule],
                    declarations: [PblNgridBsSortablePlugin, PblNgridBsSortable],
                    exports: [PblNgridBsSortablePlugin, PblNgridBsSortable],
                    // TODO(REFACTOR_REF 2): remove when ViewEngine is no longer supported by angular (V12 ???)
                    entryComponents: [PblNgridBsSortable],
                }]
        }], ctorParameters: function () { return [{ type: i1.PblNgridRegistryService }, { type: i0.ComponentFactoryResolver }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtc29ydGFibGUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3JpZC1ib290c3RyYXAvc29ydC9zcmMvbGliL2JzLXNvcnRhYmxlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLHdCQUF3QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25FLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsY0FBYyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDNUUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDM0UsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0scUNBQXFDLENBQUM7OztBQVN6RSxNQUFNLE9BQU8sd0JBQXdCO0lBR25DLFlBQW9CLFFBQWlDLEVBQUUsR0FBNkI7UUFBaEUsYUFBUSxHQUFSLFFBQVEsQ0FBeUI7UUFDbkQsUUFBUSxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDN0UsQ0FBQzs7QUFKZSxxQ0FBWSxHQUFHLFdBQVcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDO3dJQUQ5RSx3QkFBd0I7eUlBQXhCLHdCQUF3QixpQkFMbkIsd0JBQXdCLEVBQUUsa0JBQWtCLGFBRGpELFlBQVksRUFBRSxjQUFjLGFBRTVCLHdCQUF3QixFQUFFLGtCQUFrQjt5SUFJNUMsd0JBQXdCLFlBTjFCLENBQUUsWUFBWSxFQUFFLGNBQWMsQ0FBRTsyRkFNOUIsd0JBQXdCO2tCQVBwQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFFLFlBQVksRUFBRSxjQUFjLENBQUU7b0JBQ3pDLFlBQVksRUFBRSxDQUFFLHdCQUF3QixFQUFFLGtCQUFrQixDQUFFO29CQUM5RCxPQUFPLEVBQUUsQ0FBRSx3QkFBd0IsRUFBRSxrQkFBa0IsQ0FBRTtvQkFDekQsMkZBQTJGO29CQUMzRixlQUFlLEVBQUUsQ0FBRSxrQkFBa0IsQ0FBRTtpQkFDeEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSwgUGJsTmdyaWRNb2R1bGUsIG5ncmlkUGx1Z2luIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5pbXBvcnQgeyBQYmxOZ3JpZEJzU29ydGFibGVQbHVnaW4sIFBMVUdJTl9LRVkgfSBmcm9tICcuL2JzLXNvcnRhYmxlLXBsdWdpbic7XG5pbXBvcnQgeyBQYmxCc1NvcnRhYmxlRXh0ZW5zaW9uIH0gZnJvbSAnLi9icy1zb3J0YWJsZS1jb21wb25lbnQtZXh0ZW5zaW9uJztcbmltcG9ydCB7IFBibE5ncmlkQnNTb3J0YWJsZSB9IGZyb20gJy4vYnMtc29ydGFibGUvYnMtc29ydGFibGUuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogWyBDb21tb25Nb2R1bGUsIFBibE5ncmlkTW9kdWxlIF0sXG4gIGRlY2xhcmF0aW9uczogWyBQYmxOZ3JpZEJzU29ydGFibGVQbHVnaW4sIFBibE5ncmlkQnNTb3J0YWJsZSBdLFxuICBleHBvcnRzOiBbIFBibE5ncmlkQnNTb3J0YWJsZVBsdWdpbiwgUGJsTmdyaWRCc1NvcnRhYmxlIF0sXG4gIC8vIFRPRE8oUkVGQUNUT1JfUkVGIDIpOiByZW1vdmUgd2hlbiBWaWV3RW5naW5lIGlzIG5vIGxvbmdlciBzdXBwb3J0ZWQgYnkgYW5ndWxhciAoVjEyID8/PylcbiAgZW50cnlDb21wb25lbnRzOiBbIFBibE5ncmlkQnNTb3J0YWJsZSBdLFxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZEJzU29ydGFibGVNb2R1bGUge1xuICBzdGF0aWMgcmVhZG9ubHkgTkdSSURfUExVR0lOID0gbmdyaWRQbHVnaW4oeyBpZDogUExVR0lOX0tFWSB9LCBQYmxOZ3JpZEJzU29ydGFibGVQbHVnaW4pO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVnaXN0cnk6IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlLCBjZnI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcikge1xuICAgIHJlZ2lzdHJ5LmFkZE11bHRpKCdkYXRhSGVhZGVyRXh0ZW5zaW9ucycsIG5ldyBQYmxCc1NvcnRhYmxlRXh0ZW5zaW9uKGNmcikpO1xuICB9XG59XG4iXX0=