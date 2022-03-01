import { Directive, Input, Attribute } from '@angular/core';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { VIRTUAL_SCROLL_STRATEGY } from '@angular/cdk/scrolling';
import { PblNgridComponent } from '../../../ngrid.component';
import { NoVirtualScrollStrategy } from './noop';
import { PblNgridDynamicVirtualScrollStrategy } from './dynamic-size/dynamic-size';
import { PblNgridBaseVirtualScrollDirective } from './base-v-scroll.directive';
import * as i0 from "@angular/core";
import * as i1 from "../../../ngrid.component";
/** A virtual scroll strategy that supports unknown or dynamic size items. */
export class PblCdkVirtualScrollDirective extends PblNgridBaseVirtualScrollDirective {
    constructor(vScrollDynamic, vScrollNone, grid) {
        super(grid, vScrollDynamic === null ? 'vScrollNone' : 'vScrollDynamic');
        if (vScrollDynamic !== null && vScrollNone !== null) {
            if (typeof ngDevMode === 'undefined' || ngDevMode) {
                throw new Error(`Invalid vScroll instruction, only one value is allow.`);
            }
        }
    }
    /**
     * The size of the items in the list (in pixels).
     * If this value is not set the height is calculated from the first rendered row item.
     */
    get vScrollDynamic() { return this._vScrollDynamic; }
    set vScrollDynamic(value) { this._vScrollDynamic = coerceNumberProperty(value); }
    ngOnInit() {
        switch (this.type) {
            case 'vScrollDynamic':
                if (!this._vScrollDynamic) {
                    this.vScrollDynamic = this.grid.findInitialRowHeight() || 48;
                }
                this._scrollStrategy = new PblNgridDynamicVirtualScrollStrategy(this._vScrollDynamic, this._minBufferPx, this._maxBufferPx);
                break;
            default:
                this._scrollStrategy = new NoVirtualScrollStrategy();
                break;
        }
    }
    ngOnChanges() {
        var _a;
        if (this._scrollStrategy) {
            switch (this.type) {
                case 'vScrollDynamic':
                    (_a = this._scrollStrategy) === null || _a === void 0 ? void 0 : _a.updateItemAndBufferSize(this._vScrollDynamic, this._minBufferPx, this._maxBufferPx);
                    break;
                default:
                    break;
            }
        }
    }
}
/** @nocollapse */ PblCdkVirtualScrollDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblCdkVirtualScrollDirective, deps: [{ token: 'vScrollDynamic', attribute: true }, { token: 'vScrollNone', attribute: true }, { token: i1.PblNgridComponent }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ PblCdkVirtualScrollDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblCdkVirtualScrollDirective, selector: "pbl-ngrid[vScrollDynamic], pbl-ngrid[vScrollNone]", inputs: { minBufferPx: "minBufferPx", maxBufferPx: "maxBufferPx", wheelMode: "wheelMode", vScrollDynamic: "vScrollDynamic" }, providers: [{
            provide: VIRTUAL_SCROLL_STRATEGY,
            useExisting: PblCdkVirtualScrollDirective,
        }], usesInheritance: true, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblCdkVirtualScrollDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'pbl-ngrid[vScrollDynamic], pbl-ngrid[vScrollNone]',
                    inputs: ['minBufferPx', 'maxBufferPx', 'wheelMode'],
                    providers: [{
                            provide: VIRTUAL_SCROLL_STRATEGY,
                            useExisting: PblCdkVirtualScrollDirective,
                        }],
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Attribute,
                    args: ['vScrollDynamic']
                }] }, { type: undefined, decorators: [{
                    type: Attribute,
                    args: ['vScrollNone']
                }] }, { type: i1.PblNgridComponent }]; }, propDecorators: { vScrollDynamic: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidi1zY3JvbGwuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3JpZC9zcmMvbGliL2dyaWQvZmVhdHVyZXMvdmlydHVhbC1zY3JvbGwvc3RyYXRlZ2llcy92LXNjcm9sbC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQXFCLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEVBQUUsb0JBQW9CLEVBQWUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNqRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDakQsT0FBTyxFQUFFLG9DQUFvQyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDbkYsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7OztBQUUvRSw2RUFBNkU7QUFTN0UsTUFBTSxPQUFPLDRCQUE2QixTQUFRLGtDQUFvRTtJQVdwSCxZQUF5QyxjQUFtQixFQUN0QixXQUFnQixFQUMxQyxJQUE0QjtRQUN0QyxLQUFLLENBQUMsSUFBSSxFQUFFLGNBQWMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN4RSxJQUFJLGNBQWMsS0FBSyxJQUFJLElBQUksV0FBVyxLQUFLLElBQUksRUFBRTtZQUNuRCxJQUFJLE9BQU8sU0FBUyxLQUFLLFdBQVcsSUFBSSxTQUFTLEVBQUU7Z0JBQ2pELE1BQU0sSUFBSSxLQUFLLENBQUMsdURBQXVELENBQUMsQ0FBQzthQUMxRTtTQUNGO0lBQ0gsQ0FBQztJQWxCRDs7O09BR0c7SUFDSCxJQUFhLGNBQWMsS0FBa0IsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztJQUMzRSxJQUFJLGNBQWMsQ0FBQyxLQUFrQixJQUFJLElBQUksQ0FBQyxlQUFlLEdBQUcsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBZTlGLFFBQVE7UUFDTixRQUFRLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDakIsS0FBSyxnQkFBZ0I7Z0JBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFO29CQUN6QixJQUFJLENBQUMsY0FBYyxHQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxFQUFFLENBQUM7aUJBQy9EO2dCQUNELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxvQ0FBb0MsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUM1SCxNQUFNO1lBQ1I7Z0JBQ0UsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLHVCQUF1QixFQUFFLENBQUM7Z0JBQ3JELE1BQU07U0FDVDtJQUNILENBQUM7SUFFRCxXQUFXOztRQUNULElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN4QixRQUFRLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ2pCLEtBQUssZ0JBQWdCO29CQUNuQixNQUFDLElBQUksQ0FBQyxlQUF3RCwwQ0FBRSx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUNwSixNQUFNO2dCQUNSO29CQUNFLE1BQU07YUFDVDtTQUNGO0lBQ0gsQ0FBQzs7NElBOUNVLDRCQUE0QixrQkFXaEIsZ0JBQWdCLDhCQUNoQixhQUFhO2dJQVp6Qiw0QkFBNEIsME1BTDVCLENBQUM7WUFDVixPQUFPLEVBQUUsdUJBQXVCO1lBQ2hDLFdBQVcsRUFBRSw0QkFBNEI7U0FDMUMsQ0FBQzsyRkFFUyw0QkFBNEI7a0JBUnhDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLG1EQUFtRDtvQkFDN0QsTUFBTSxFQUFFLENBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxXQUFXLENBQUU7b0JBQ3JELFNBQVMsRUFBRSxDQUFDOzRCQUNWLE9BQU8sRUFBRSx1QkFBdUI7NEJBQ2hDLFdBQVcsOEJBQThCO3lCQUMxQyxDQUFDO2lCQUNIOzswQkFZYyxTQUFTOzJCQUFDLGdCQUFnQjs7MEJBQzFCLFNBQVM7MkJBQUMsYUFBYTs0RUFOdkIsY0FBYztzQkFBMUIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE9uSW5pdCwgT25DaGFuZ2VzLCBBdHRyaWJ1dGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGNvZXJjZU51bWJlclByb3BlcnR5LCBOdW1iZXJJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBWSVJUVUFMX1NDUk9MTF9TVFJBVEVHWSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9uZ3JpZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTm9WaXJ0dWFsU2Nyb2xsU3RyYXRlZ3kgfSBmcm9tICcuL25vb3AnO1xuaW1wb3J0IHsgUGJsTmdyaWREeW5hbWljVmlydHVhbFNjcm9sbFN0cmF0ZWd5IH0gZnJvbSAnLi9keW5hbWljLXNpemUvZHluYW1pYy1zaXplJztcbmltcG9ydCB7IFBibE5ncmlkQmFzZVZpcnR1YWxTY3JvbGxEaXJlY3RpdmUgfSBmcm9tICcuL2Jhc2Utdi1zY3JvbGwuZGlyZWN0aXZlJztcblxuLyoqIEEgdmlydHVhbCBzY3JvbGwgc3RyYXRlZ3kgdGhhdCBzdXBwb3J0cyB1bmtub3duIG9yIGR5bmFtaWMgc2l6ZSBpdGVtcy4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3BibC1uZ3JpZFt2U2Nyb2xsRHluYW1pY10sIHBibC1uZ3JpZFt2U2Nyb2xsTm9uZV0nLCAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOiBkaXJlY3RpdmUtc2VsZWN0b3JcbiAgaW5wdXRzOiBbICdtaW5CdWZmZXJQeCcsICdtYXhCdWZmZXJQeCcsICd3aGVlbE1vZGUnIF0sIC8vIHRzbGludDpkaXNhYmxlLWxpbmU6IG5vLWlucHV0cy1tZXRhZGF0YS1wcm9wZXJ0eVxuICBwcm92aWRlcnM6IFt7XG4gICAgcHJvdmlkZTogVklSVFVBTF9TQ1JPTExfU1RSQVRFR1ksXG4gICAgdXNlRXhpc3Rpbmc6IFBibENka1ZpcnR1YWxTY3JvbGxEaXJlY3RpdmUsXG4gIH1dLFxufSlcbmV4cG9ydCBjbGFzcyBQYmxDZGtWaXJ0dWFsU2Nyb2xsRGlyZWN0aXZlIGV4dGVuZHMgUGJsTmdyaWRCYXNlVmlydHVhbFNjcm9sbERpcmVjdGl2ZTwndlNjcm9sbER5bmFtaWMnIHwgJ3ZTY3JvbGxOb25lJz4gaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG5cbiAgLyoqXG4gICAqIFRoZSBzaXplIG9mIHRoZSBpdGVtcyBpbiB0aGUgbGlzdCAoaW4gcGl4ZWxzKS5cbiAgICogSWYgdGhpcyB2YWx1ZSBpcyBub3Qgc2V0IHRoZSBoZWlnaHQgaXMgY2FsY3VsYXRlZCBmcm9tIHRoZSBmaXJzdCByZW5kZXJlZCByb3cgaXRlbS5cbiAgICovXG4gIEBJbnB1dCgpIGdldCB2U2Nyb2xsRHluYW1pYygpOiBOdW1iZXJJbnB1dCB7IHJldHVybiB0aGlzLl92U2Nyb2xsRHluYW1pYzsgfVxuICBzZXQgdlNjcm9sbER5bmFtaWModmFsdWU6IE51bWJlcklucHV0KSB7IHRoaXMuX3ZTY3JvbGxEeW5hbWljID0gY29lcmNlTnVtYmVyUHJvcGVydHkodmFsdWUpOyB9XG5cbiAgcHJpdmF0ZSBfdlNjcm9sbER5bmFtaWM6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihAQXR0cmlidXRlKCd2U2Nyb2xsRHluYW1pYycpIHZTY3JvbGxEeW5hbWljOiBhbnksXG4gICAgICAgICAgICAgIEBBdHRyaWJ1dGUoJ3ZTY3JvbGxOb25lJykgdlNjcm9sbE5vbmU6IGFueSxcbiAgICAgICAgICAgICAgZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8YW55Pikge1xuICAgIHN1cGVyKGdyaWQsIHZTY3JvbGxEeW5hbWljID09PSBudWxsID8gJ3ZTY3JvbGxOb25lJyA6ICd2U2Nyb2xsRHluYW1pYycpO1xuICAgIGlmICh2U2Nyb2xsRHluYW1pYyAhPT0gbnVsbCAmJiB2U2Nyb2xsTm9uZSAhPT0gbnVsbCkge1xuICAgICAgaWYgKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgdlNjcm9sbCBpbnN0cnVjdGlvbiwgb25seSBvbmUgdmFsdWUgaXMgYWxsb3cuYCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcbiAgICAgIGNhc2UgJ3ZTY3JvbGxEeW5hbWljJzpcbiAgICAgICAgaWYgKCF0aGlzLl92U2Nyb2xsRHluYW1pYykge1xuICAgICAgICAgIHRoaXMudlNjcm9sbER5bmFtaWMgID0gdGhpcy5ncmlkLmZpbmRJbml0aWFsUm93SGVpZ2h0KCkgfHwgNDg7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc2Nyb2xsU3RyYXRlZ3kgPSBuZXcgUGJsTmdyaWREeW5hbWljVmlydHVhbFNjcm9sbFN0cmF0ZWd5KHRoaXMuX3ZTY3JvbGxEeW5hbWljLCB0aGlzLl9taW5CdWZmZXJQeCwgdGhpcy5fbWF4QnVmZmVyUHgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMuX3Njcm9sbFN0cmF0ZWd5ID0gbmV3IE5vVmlydHVhbFNjcm9sbFN0cmF0ZWd5KCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIGlmICh0aGlzLl9zY3JvbGxTdHJhdGVneSkge1xuICAgICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcbiAgICAgICAgY2FzZSAndlNjcm9sbER5bmFtaWMnOlxuICAgICAgICAgICh0aGlzLl9zY3JvbGxTdHJhdGVneSBhcyBQYmxOZ3JpZER5bmFtaWNWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3kpPy51cGRhdGVJdGVtQW5kQnVmZmVyU2l6ZSh0aGlzLl92U2Nyb2xsRHluYW1pYywgdGhpcy5fbWluQnVmZmVyUHgsIHRoaXMuX21heEJ1ZmZlclB4KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxufVxuIl19