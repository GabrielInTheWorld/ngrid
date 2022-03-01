import { Directive, Inject, IterableDiffers, Optional, TemplateRef } from '@angular/core';
import { CdkRowDef, CDK_TABLE } from '@angular/cdk/table';
import { PblNgridRegistryService } from '../registry/registry.service';
import { PblNgridPluginController } from '../../ext/plugin-control';
import { EXT_API_TOKEN } from '../../ext/grid-ext-api';
import * as i0 from "@angular/core";
import * as i1 from "../registry/registry.service";
export class PblNgridRowDef extends CdkRowDef {
    constructor(template, _differs, registry, _table) {
        super(template, _differs, _table);
        this.registry = registry;
        this._table = _table;
        /**
         * Empty rows.
         * We don't supply column rows to the CdkTable so it will not render them.
         * We render internally.
         */
        this.columns = [];
    }
    getColumnsDiff() {
        return null;
    }
    clone() {
        const clone = Object.create(this);
        // Provide 0 column so CdkTable will not render.
        this.columns = [];
        return clone;
    }
}
/** @nocollapse */ PblNgridRowDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridRowDef, deps: [{ token: i0.TemplateRef }, { token: i0.IterableDiffers }, { token: i1.PblNgridRegistryService }, { token: CDK_TABLE, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ PblNgridRowDef.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridRowDef, selector: "[pblNgridRowDef]", inputs: { columns: ["pblNgridRowDefColumns", "columns"], when: ["pblNgridRowDefWhen", "when"] }, providers: [
        { provide: CdkRowDef, useExisting: PblNgridRowDef },
    ], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridRowDef, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pblNgridRowDef]',
                    inputs: ['columns: pblNgridRowDefColumns', 'when: pblNgridRowDefWhen'],
                    providers: [
                        { provide: CdkRowDef, useExisting: PblNgridRowDef },
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }, { type: i0.IterableDiffers }, { type: i1.PblNgridRegistryService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [CDK_TABLE]
                }, {
                    type: Optional
                }] }]; } });
/**
 * A directive for quick replacements of the row container component.
 *
 * When used inside the content of the grid:
 *
 * ```html
 * <pbl-ngrid [dataSource]="ds" [columns]="columns">
 *   <pbl-ngrid-row *pblNgridRowOverride="let row;" row></pbl-ngrid-row>
 * </pbl-ngrid>
 * ```
 *
 * However, when used outside of the grid you must provide a reference to the grid so it can register as a template:
 *
 * ```html
 * <pbl-ngrid-row *pblNgridRowOverride="let row; grid: myGrid" row></pbl-ngrid-row>
 * <pbl-ngrid #myGrid [dataSource]="ds" [columns]="columns"></pbl-ngrid>
 * ```
 */
export class PblNgridRowOverride extends PblNgridRowDef {
    constructor(template, _differs, registry, extApi) {
        super(template, _differs, registry, extApi === null || extApi === void 0 ? void 0 : extApi.cdkTable);
        this.extApi = extApi;
        this.when = () => true;
    }
    ngOnInit() {
        var _a;
        if (!this.extApi && this.grid) {
            this.extApi = PblNgridPluginController.find(this.grid).extApi;
        }
        (_a = this.extApi) === null || _a === void 0 ? void 0 : _a.cdkTable.addRowDef(this);
    }
}
/** @nocollapse */ PblNgridRowOverride.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridRowOverride, deps: [{ token: i0.TemplateRef }, { token: i0.IterableDiffers }, { token: i1.PblNgridRegistryService }, { token: EXT_API_TOKEN, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ PblNgridRowOverride.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridRowOverride, selector: "[pblNgridRowOverride]", inputs: { columns: ["pblNgridRowDefColumns", "columns"], when: ["pblNgridRowDefWhen", "when"], grid: ["pblNgridRowDefGrid", "grid"] }, providers: [
        { provide: CdkRowDef, useExisting: PblNgridRowDef },
    ], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridRowOverride, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pblNgridRowOverride]',
                    inputs: ['columns: pblNgridRowDefColumns', 'when: pblNgridRowDefWhen', 'grid: pblNgridRowDefGrid'],
                    providers: [
                        { provide: CdkRowDef, useExisting: PblNgridRowDef },
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }, { type: i0.IterableDiffers }, { type: i1.PblNgridRegistryService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [EXT_API_TOKEN]
                }, {
                    type: Optional
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LWRlZi5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25ncmlkL3NyYy9saWIvZ3JpZC9yb3cvcm93LWRlZi5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDbEcsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUcxRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUV2RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsYUFBYSxFQUF3QixNQUFNLHdCQUF3QixDQUFDOzs7QUFTN0UsTUFBTSxPQUFPLGNBQWtCLFNBQVEsU0FBWTtJQVNqRCxZQUFZLFFBQTRDLEVBQzVDLFFBQXlCLEVBQ2YsUUFBaUMsRUFDTCxNQUFZO1FBQzVELEtBQUssQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRmQsYUFBUSxHQUFSLFFBQVEsQ0FBeUI7UUFDTCxXQUFNLEdBQU4sTUFBTSxDQUFNO1FBVjlEOzs7O1dBSUc7UUFDSCxZQUFPLEdBQXFCLEVBQUUsQ0FBQztJQU8vQixDQUFDO0lBRUQsY0FBYztRQUNaLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELEtBQUs7UUFDSCxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xDLGdEQUFnRDtRQUNoRCxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNsQixPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7OzhIQXpCVSxjQUFjLG1IQVlMLFNBQVM7a0hBWmxCLGNBQWMsNElBSmQ7UUFDVCxFQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBQztLQUNsRDsyRkFFVSxjQUFjO2tCQVAxQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLE1BQU0sRUFBRSxDQUFDLGdDQUFnQyxFQUFFLDBCQUEwQixDQUFDO29CQUN0RSxTQUFTLEVBQUU7d0JBQ1QsRUFBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsZ0JBQWdCLEVBQUM7cUJBQ2xEO2lCQUNGOzswQkFhYyxNQUFNOzJCQUFDLFNBQVM7OzBCQUFHLFFBQVE7O0FBZ0IxQzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFRSCxNQUFNLE9BQU8sbUJBQXVCLFNBQVEsY0FBaUI7SUFJM0QsWUFBWSxRQUE0QyxFQUM1QyxRQUF5QixFQUN6QixRQUFpQyxFQUNVLE1BQWdDO1FBQ3JGLEtBQUssQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsUUFBUSxDQUFDLENBQUM7UUFERCxXQUFNLEdBQU4sTUFBTSxDQUEwQjtRQUVyRixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQztJQUN6QixDQUFDO0lBRUQsUUFBUTs7UUFDTixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQzdCLElBQUksQ0FBQyxNQUFNLEdBQUcsd0JBQXdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUM7U0FDL0Q7UUFDRCxNQUFBLElBQUksQ0FBQyxNQUFNLDBDQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEMsQ0FBQzs7bUlBakJVLG1CQUFtQixtSEFPVixhQUFhO3VIQVB0QixtQkFBbUIsdUxBSm5CO1FBQ1QsRUFBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxjQUFjLEVBQUM7S0FDbEQ7MkZBRVUsbUJBQW1CO2tCQVAvQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSx1QkFBdUI7b0JBQ2pDLE1BQU0sRUFBRSxDQUFDLGdDQUFnQyxFQUFFLDBCQUEwQixFQUFFLDBCQUEwQixDQUFDO29CQUNsRyxTQUFTLEVBQUU7d0JBQ1QsRUFBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxjQUFjLEVBQUM7cUJBQ2xEO2lCQUNGOzswQkFRYyxNQUFNOzJCQUFDLGFBQWE7OzBCQUFHLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEluamVjdCwgSXRlcmFibGVEaWZmZXJzLCBPcHRpb25hbCwgVGVtcGxhdGVSZWYsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2RrUm93RGVmLCBDREtfVEFCTEUgfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xuXG5pbXBvcnQgeyBfUGJsTmdyaWRDb21wb25lbnQgfSBmcm9tICcuLi8uLi90b2tlbnMnO1xuaW1wb3J0IHsgUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UgfSBmcm9tICcuLi9yZWdpc3RyeS9yZWdpc3RyeS5zZXJ2aWNlJztcbmltcG9ydCB7IFBibE5ncmlkUm93Q29udGV4dCB9IGZyb20gJy4uL2NvbnRleHQvdHlwZXMnO1xuaW1wb3J0IHsgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyIH0gZnJvbSAnLi4vLi4vZXh0L3BsdWdpbi1jb250cm9sJztcbmltcG9ydCB7IEVYVF9BUElfVE9LRU4sIFBibE5ncmlkRXh0ZW5zaW9uQXBpIH0gZnJvbSAnLi4vLi4vZXh0L2dyaWQtZXh0LWFwaSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1twYmxOZ3JpZFJvd0RlZl0nLFxuICBpbnB1dHM6IFsnY29sdW1uczogcGJsTmdyaWRSb3dEZWZDb2x1bW5zJywgJ3doZW46IHBibE5ncmlkUm93RGVmV2hlbiddLFxuICBwcm92aWRlcnM6IFtcbiAgICB7cHJvdmlkZTogQ2RrUm93RGVmLCB1c2VFeGlzdGluZzogUGJsTmdyaWRSb3dEZWZ9LFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkUm93RGVmPFQ+IGV4dGVuZHMgQ2RrUm93RGVmPFQ+IHtcblxuICAvKipcbiAgICogRW1wdHkgcm93cy5cbiAgICogV2UgZG9uJ3Qgc3VwcGx5IGNvbHVtbiByb3dzIHRvIHRoZSBDZGtUYWJsZSBzbyBpdCB3aWxsIG5vdCByZW5kZXIgdGhlbS5cbiAgICogV2UgcmVuZGVyIGludGVybmFsbHkuXG4gICAqL1xuICBjb2x1bW5zOiBJdGVyYWJsZTxzdHJpbmc+ID0gW107XG5cbiAgY29uc3RydWN0b3IodGVtcGxhdGU6IFRlbXBsYXRlUmVmPFBibE5ncmlkUm93Q29udGV4dDxUPj4sXG4gICAgICAgICAgICAgIF9kaWZmZXJzOiBJdGVyYWJsZURpZmZlcnMsXG4gICAgICAgICAgICAgIHByb3RlY3RlZCByZWdpc3RyeTogUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UsXG4gICAgICAgICAgICAgIEBJbmplY3QoQ0RLX1RBQkxFKSBAT3B0aW9uYWwoKSBwdWJsaWMgX3RhYmxlPzogYW55KSB7XG4gICAgc3VwZXIodGVtcGxhdGUsIF9kaWZmZXJzLCBfdGFibGUpO1xuICB9XG5cbiAgZ2V0Q29sdW1uc0RpZmYoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjbG9uZSgpOiB0aGlzIHtcbiAgICBjb25zdCBjbG9uZSA9IE9iamVjdC5jcmVhdGUodGhpcyk7XG4gICAgLy8gUHJvdmlkZSAwIGNvbHVtbiBzbyBDZGtUYWJsZSB3aWxsIG5vdCByZW5kZXIuXG4gICAgdGhpcy5jb2x1bW5zID0gW107XG4gICAgcmV0dXJuIGNsb25lO1xuICB9XG59XG5cbi8qKlxuICogQSBkaXJlY3RpdmUgZm9yIHF1aWNrIHJlcGxhY2VtZW50cyBvZiB0aGUgcm93IGNvbnRhaW5lciBjb21wb25lbnQuXG4gKlxuICogV2hlbiB1c2VkIGluc2lkZSB0aGUgY29udGVudCBvZiB0aGUgZ3JpZDpcbiAqXG4gKiBgYGBodG1sXG4gKiA8cGJsLW5ncmlkIFtkYXRhU291cmNlXT1cImRzXCIgW2NvbHVtbnNdPVwiY29sdW1uc1wiPlxuICogICA8cGJsLW5ncmlkLXJvdyAqcGJsTmdyaWRSb3dPdmVycmlkZT1cImxldCByb3c7XCIgcm93PjwvcGJsLW5ncmlkLXJvdz5cbiAqIDwvcGJsLW5ncmlkPlxuICogYGBgXG4gKlxuICogSG93ZXZlciwgd2hlbiB1c2VkIG91dHNpZGUgb2YgdGhlIGdyaWQgeW91IG11c3QgcHJvdmlkZSBhIHJlZmVyZW5jZSB0byB0aGUgZ3JpZCBzbyBpdCBjYW4gcmVnaXN0ZXIgYXMgYSB0ZW1wbGF0ZTpcbiAqXG4gKiBgYGBodG1sXG4gKiA8cGJsLW5ncmlkLXJvdyAqcGJsTmdyaWRSb3dPdmVycmlkZT1cImxldCByb3c7IGdyaWQ6IG15R3JpZFwiIHJvdz48L3BibC1uZ3JpZC1yb3c+XG4gKiA8cGJsLW5ncmlkICNteUdyaWQgW2RhdGFTb3VyY2VdPVwiZHNcIiBbY29sdW1uc109XCJjb2x1bW5zXCI+PC9wYmwtbmdyaWQ+XG4gKiBgYGBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3BibE5ncmlkUm93T3ZlcnJpZGVdJyxcbiAgaW5wdXRzOiBbJ2NvbHVtbnM6IHBibE5ncmlkUm93RGVmQ29sdW1ucycsICd3aGVuOiBwYmxOZ3JpZFJvd0RlZldoZW4nLCAnZ3JpZDogcGJsTmdyaWRSb3dEZWZHcmlkJ10sXG4gIHByb3ZpZGVyczogW1xuICAgIHtwcm92aWRlOiBDZGtSb3dEZWYsIHVzZUV4aXN0aW5nOiBQYmxOZ3JpZFJvd0RlZn0sXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRSb3dPdmVycmlkZTxUPiBleHRlbmRzIFBibE5ncmlkUm93RGVmPFQ+IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBncmlkOiBfUGJsTmdyaWRDb21wb25lbnQ8VD47XG5cbiAgY29uc3RydWN0b3IodGVtcGxhdGU6IFRlbXBsYXRlUmVmPFBibE5ncmlkUm93Q29udGV4dDxUPj4sXG4gICAgICAgICAgICAgIF9kaWZmZXJzOiBJdGVyYWJsZURpZmZlcnMsXG4gICAgICAgICAgICAgIHJlZ2lzdHJ5OiBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSxcbiAgICAgICAgICAgICAgQEluamVjdChFWFRfQVBJX1RPS0VOKSBAT3B0aW9uYWwoKSBwcml2YXRlIGV4dEFwaT86IFBibE5ncmlkRXh0ZW5zaW9uQXBpPFQ+KSB7XG4gICAgc3VwZXIodGVtcGxhdGUsIF9kaWZmZXJzLCByZWdpc3RyeSwgZXh0QXBpPy5jZGtUYWJsZSk7XG4gICAgdGhpcy53aGVuID0gKCkgPT4gdHJ1ZTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICghdGhpcy5leHRBcGkgJiYgdGhpcy5ncmlkKSB7XG4gICAgICB0aGlzLmV4dEFwaSA9IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlci5maW5kKHRoaXMuZ3JpZCkuZXh0QXBpO1xuICAgIH1cbiAgICB0aGlzLmV4dEFwaT8uY2RrVGFibGUuYWRkUm93RGVmKHRoaXMpO1xuICB9XG59XG4iXX0=