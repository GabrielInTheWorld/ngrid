import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PblNgridModule, ngridPlugin } from '@pebula/ngrid';
import { PblNgridMatCheckboxSelectionDirective, PLUGIN_KEY } from './checkbox-plugin.directive';
import { PblNgridCheckboxComponent } from './table-checkbox.component';
import * as i0 from "@angular/core";
export class PblNgridCheckboxModule {
}
PblNgridCheckboxModule.NGRID_PLUGIN = ngridPlugin({ id: PLUGIN_KEY }, PblNgridMatCheckboxSelectionDirective);
/** @nocollapse */ PblNgridCheckboxModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridCheckboxModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ PblNgridCheckboxModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridCheckboxModule, declarations: [PblNgridMatCheckboxSelectionDirective, PblNgridCheckboxComponent], imports: [CommonModule, MatCheckboxModule, PblNgridModule], exports: [PblNgridMatCheckboxSelectionDirective, PblNgridCheckboxComponent] });
/** @nocollapse */ PblNgridCheckboxModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridCheckboxModule, imports: [[CommonModule, MatCheckboxModule, PblNgridModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridCheckboxModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, MatCheckboxModule, PblNgridModule],
                    declarations: [PblNgridMatCheckboxSelectionDirective, PblNgridCheckboxComponent],
                    exports: [PblNgridMatCheckboxSelectionDirective, PblNgridCheckboxComponent],
                    // TODO(REFACTOR_REF 2): remove when ViewEngine is no longer supported by angular (V12 ???)
                    entryComponents: [PblNgridCheckboxComponent]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtY2hlY2tib3gubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3JpZC1tYXRlcmlhbC9zZWxlY3Rpb24tY29sdW1uL3NyYy9saWIvdGFibGUtY2hlY2tib3gubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRS9ELE9BQU8sRUFBRSxjQUFjLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBRSxxQ0FBcUMsRUFBRSxVQUFVLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNoRyxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7QUFTdkUsTUFBTSxPQUFPLHNCQUFzQjs7QUFDakIsbUNBQVksR0FBRyxXQUFXLENBQUMsRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLEVBQUUscUNBQXFDLENBQUMsQ0FBQztzSUFEM0Ysc0JBQXNCO3VJQUF0QixzQkFBc0IsaUJBTGpCLHFDQUFxQyxFQUFFLHlCQUF5QixhQURyRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsY0FBYyxhQUUvQyxxQ0FBcUMsRUFBRSx5QkFBeUI7dUlBSWhFLHNCQUFzQixZQU54QixDQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxjQUFjLENBQUU7MkZBTWpELHNCQUFzQjtrQkFQbEMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsY0FBYyxDQUFFO29CQUM1RCxZQUFZLEVBQUUsQ0FBRSxxQ0FBcUMsRUFBRSx5QkFBeUIsQ0FBRTtvQkFDbEYsT0FBTyxFQUFFLENBQUUscUNBQXFDLEVBQUUseUJBQXlCLENBQUU7b0JBQzdFLDJGQUEyRjtvQkFDM0YsZUFBZSxFQUFFLENBQUUseUJBQXlCLENBQUU7aUJBQy9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNYXRDaGVja2JveE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NoZWNrYm94JztcblxuaW1wb3J0IHsgUGJsTmdyaWRNb2R1bGUsIG5ncmlkUGx1Z2luIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5pbXBvcnQgeyBQYmxOZ3JpZE1hdENoZWNrYm94U2VsZWN0aW9uRGlyZWN0aXZlLCBQTFVHSU5fS0VZIH0gZnJvbSAnLi9jaGVja2JveC1wbHVnaW4uZGlyZWN0aXZlJztcbmltcG9ydCB7IFBibE5ncmlkQ2hlY2tib3hDb21wb25lbnQgfSBmcm9tICcuL3RhYmxlLWNoZWNrYm94LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFsgQ29tbW9uTW9kdWxlLCBNYXRDaGVja2JveE1vZHVsZSwgUGJsTmdyaWRNb2R1bGUgXSxcbiAgZGVjbGFyYXRpb25zOiBbIFBibE5ncmlkTWF0Q2hlY2tib3hTZWxlY3Rpb25EaXJlY3RpdmUsIFBibE5ncmlkQ2hlY2tib3hDb21wb25lbnQgXSxcbiAgZXhwb3J0czogWyBQYmxOZ3JpZE1hdENoZWNrYm94U2VsZWN0aW9uRGlyZWN0aXZlLCBQYmxOZ3JpZENoZWNrYm94Q29tcG9uZW50IF0sXG4gIC8vIFRPRE8oUkVGQUNUT1JfUkVGIDIpOiByZW1vdmUgd2hlbiBWaWV3RW5naW5lIGlzIG5vIGxvbmdlciBzdXBwb3J0ZWQgYnkgYW5ndWxhciAoVjEyID8/PylcbiAgZW50cnlDb21wb25lbnRzOiBbIFBibE5ncmlkQ2hlY2tib3hDb21wb25lbnQgXVxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZENoZWNrYm94TW9kdWxlIHtcbiAgc3RhdGljIHJlYWRvbmx5IE5HUklEX1BMVUdJTiA9IG5ncmlkUGx1Z2luKHsgaWQ6IFBMVUdJTl9LRVkgfSwgUGJsTmdyaWRNYXRDaGVja2JveFNlbGVjdGlvbkRpcmVjdGl2ZSk7XG59XG4iXX0=