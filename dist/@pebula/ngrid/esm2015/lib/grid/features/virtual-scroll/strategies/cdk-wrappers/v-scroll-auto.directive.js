import { VIRTUAL_SCROLL_STRATEGY } from '@angular/cdk/scrolling';
import { Directive, Input } from '@angular/core';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { PblNgridComponent } from '../../../../ngrid.component';
import { PblNgridBaseVirtualScrollDirective } from '../base-v-scroll.directive';
import { PblNgridAutoSizeVirtualScrollStrategy, PblNgridItemSizeAverager } from './auto-size';
import * as i0 from "@angular/core";
import * as i1 from "../../../../ngrid.component";
/**
 * @deprecated Will be removed in v5
 * `vScrollAuto` will move to an independent package in v5. Note that the recommended dynamic strategy for nGrid is `vScrollDynamic`
 * Note that the default virtual scroll strategy will also change from `vScrollAuto` to `vScrollDynamic`
 */
export class PblCdkAutoSizeVirtualScrollDirective extends PblNgridBaseVirtualScrollDirective {
    constructor(grid) { super(grid, 'vScrollAuto'); }
    /**
     * The size of the items in the list (in pixels).
     * If this value is not set the height is calculated from the first rendered row item.
     *
     * @deprecated Will be removed in v5: `vScrollAuto` will move to an independent package in v5. Note that the recommended dynamic strategy for nGrid is `vScrollDynamic`
     */
    get vScrollAuto() { return this._vScrollAuto; }
    set vScrollAuto(value) { this._vScrollAuto = coerceNumberProperty(value); }
    ngOnInit() {
        if (!this._vScrollAuto) {
            this._vScrollAuto = this.grid.findInitialRowHeight() || 48;
        }
        this._scrollStrategy = new PblNgridAutoSizeVirtualScrollStrategy(this._minBufferPx, this._maxBufferPx, new PblNgridItemSizeAverager(this._vScrollAuto));
    }
    ngOnChanges() {
        var _a;
        (_a = this._scrollStrategy) === null || _a === void 0 ? void 0 : _a.updateBufferSize(this._minBufferPx, this._maxBufferPx);
    }
}
/** @nocollapse */ PblCdkAutoSizeVirtualScrollDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblCdkAutoSizeVirtualScrollDirective, deps: [{ token: i1.PblNgridComponent }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ PblCdkAutoSizeVirtualScrollDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblCdkAutoSizeVirtualScrollDirective, selector: "pbl-ngrid[vScrollAuto]", inputs: { minBufferPx: "minBufferPx", maxBufferPx: "maxBufferPx", wheelMode: "wheelMode", vScrollAuto: "vScrollAuto" }, providers: [{
            provide: VIRTUAL_SCROLL_STRATEGY,
            useExisting: PblCdkAutoSizeVirtualScrollDirective,
        }], usesInheritance: true, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblCdkAutoSizeVirtualScrollDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'pbl-ngrid[vScrollAuto]',
                    inputs: ['minBufferPx', 'maxBufferPx', 'wheelMode'],
                    providers: [{
                            provide: VIRTUAL_SCROLL_STRATEGY,
                            useExisting: PblCdkAutoSizeVirtualScrollDirective,
                        }],
                }]
        }], ctorParameters: function () { return [{ type: i1.PblNgridComponent }]; }, propDecorators: { vScrollAuto: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidi1zY3JvbGwtYXV0by5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25ncmlkL3NyYy9saWIvZ3JpZC9mZWF0dXJlcy92aXJ0dWFsLXNjcm9sbC9zdHJhdGVnaWVzL2Nkay13cmFwcGVycy92LXNjcm9sbC1hdXRvLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNqRSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDcEUsT0FBTyxFQUFFLG9CQUFvQixFQUFlLE1BQU0sdUJBQXVCLENBQUM7QUFDMUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDaEYsT0FBTyxFQUFFLHFDQUFxQyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sYUFBYSxDQUFDOzs7QUFFOUY7Ozs7R0FJRztBQVNILE1BQU0sT0FBTyxvQ0FBcUMsU0FBUSxrQ0FBaUQ7SUFZekcsWUFBWSxJQUE0QixJQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBVnpFOzs7OztPQUtHO0lBQ0gsSUFBYSxXQUFXLEtBQWtCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7SUFDckUsSUFBSSxXQUFXLENBQUMsS0FBa0IsSUFBSSxJQUFJLENBQUMsWUFBWSxHQUFHLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUt4RixRQUFRO1FBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDdEIsSUFBSSxDQUFDLFlBQVksR0FBSSxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLElBQUksRUFBRSxDQUFDO1NBQzdEO1FBQ0QsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLHFDQUFxQyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLHdCQUF3QixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO0lBQzFKLENBQUM7SUFFRCxXQUFXOztRQUNULE1BQUEsSUFBSSxDQUFDLGVBQWUsMENBQUUsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDL0UsQ0FBQzs7b0pBdkJVLG9DQUFvQzt3SUFBcEMsb0NBQW9DLHlLQUxwQyxDQUFDO1lBQ1YsT0FBTyxFQUFFLHVCQUF1QjtZQUNoQyxXQUFXLEVBQUUsb0NBQW9DO1NBQ2xELENBQUM7MkZBRVMsb0NBQW9DO2tCQVJoRCxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSx3QkFBd0I7b0JBQ2xDLE1BQU0sRUFBRSxDQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsV0FBVyxDQUFFO29CQUNyRCxTQUFTLEVBQUUsQ0FBQzs0QkFDVixPQUFPLEVBQUUsdUJBQXVCOzRCQUNoQyxXQUFXLHNDQUFzQzt5QkFDbEQsQ0FBQztpQkFDSDt3R0FTYyxXQUFXO3NCQUF2QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVklSVFVBTF9TQ1JPTExfU1RSQVRFR1kgfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcbmltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE9uSW5pdCwgT25DaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjb2VyY2VOdW1iZXJQcm9wZXJ0eSwgTnVtYmVySW5wdXQgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi8uLi9uZ3JpZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGJsTmdyaWRCYXNlVmlydHVhbFNjcm9sbERpcmVjdGl2ZSB9IGZyb20gJy4uL2Jhc2Utdi1zY3JvbGwuZGlyZWN0aXZlJztcbmltcG9ydCB7IFBibE5ncmlkQXV0b1NpemVWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3ksIFBibE5ncmlkSXRlbVNpemVBdmVyYWdlciB9IGZyb20gJy4vYXV0by1zaXplJztcblxuLyoqXG4gKiBAZGVwcmVjYXRlZCBXaWxsIGJlIHJlbW92ZWQgaW4gdjVcbiAqIGB2U2Nyb2xsQXV0b2Agd2lsbCBtb3ZlIHRvIGFuIGluZGVwZW5kZW50IHBhY2thZ2UgaW4gdjUuIE5vdGUgdGhhdCB0aGUgcmVjb21tZW5kZWQgZHluYW1pYyBzdHJhdGVneSBmb3IgbkdyaWQgaXMgYHZTY3JvbGxEeW5hbWljYFxuICogTm90ZSB0aGF0IHRoZSBkZWZhdWx0IHZpcnR1YWwgc2Nyb2xsIHN0cmF0ZWd5IHdpbGwgYWxzbyBjaGFuZ2UgZnJvbSBgdlNjcm9sbEF1dG9gIHRvIGB2U2Nyb2xsRHluYW1pY2BcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAncGJsLW5ncmlkW3ZTY3JvbGxBdXRvXScsIC8vIHRzbGludDpkaXNhYmxlLWxpbmU6IGRpcmVjdGl2ZS1zZWxlY3RvclxuICBpbnB1dHM6IFsgJ21pbkJ1ZmZlclB4JywgJ21heEJ1ZmZlclB4JywgJ3doZWVsTW9kZScgXSwgLy8gdHNsaW50OmRpc2FibGUtbGluZTogbm8taW5wdXRzLW1ldGFkYXRhLXByb3BlcnR5XG4gIHByb3ZpZGVyczogW3tcbiAgICBwcm92aWRlOiBWSVJUVUFMX1NDUk9MTF9TVFJBVEVHWSxcbiAgICB1c2VFeGlzdGluZzogUGJsQ2RrQXV0b1NpemVWaXJ0dWFsU2Nyb2xsRGlyZWN0aXZlLFxuICB9XSxcbn0pXG5leHBvcnQgY2xhc3MgUGJsQ2RrQXV0b1NpemVWaXJ0dWFsU2Nyb2xsRGlyZWN0aXZlIGV4dGVuZHMgUGJsTmdyaWRCYXNlVmlydHVhbFNjcm9sbERpcmVjdGl2ZTwndlNjcm9sbEF1dG8nPiBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcblxuICAvKipcbiAgICogVGhlIHNpemUgb2YgdGhlIGl0ZW1zIGluIHRoZSBsaXN0IChpbiBwaXhlbHMpLlxuICAgKiBJZiB0aGlzIHZhbHVlIGlzIG5vdCBzZXQgdGhlIGhlaWdodCBpcyBjYWxjdWxhdGVkIGZyb20gdGhlIGZpcnN0IHJlbmRlcmVkIHJvdyBpdGVtLlxuICAgKlxuICAgKiBAZGVwcmVjYXRlZCBXaWxsIGJlIHJlbW92ZWQgaW4gdjU6IGB2U2Nyb2xsQXV0b2Agd2lsbCBtb3ZlIHRvIGFuIGluZGVwZW5kZW50IHBhY2thZ2UgaW4gdjUuIE5vdGUgdGhhdCB0aGUgcmVjb21tZW5kZWQgZHluYW1pYyBzdHJhdGVneSBmb3IgbkdyaWQgaXMgYHZTY3JvbGxEeW5hbWljYFxuICAgKi9cbiAgQElucHV0KCkgZ2V0IHZTY3JvbGxBdXRvKCk6IE51bWJlcklucHV0IHsgcmV0dXJuIHRoaXMuX3ZTY3JvbGxBdXRvOyB9XG4gIHNldCB2U2Nyb2xsQXV0byh2YWx1ZTogTnVtYmVySW5wdXQpIHsgdGhpcy5fdlNjcm9sbEF1dG8gPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWx1ZSk7IH1cblxuICBwcml2YXRlIF92U2Nyb2xsQXV0bzogbnVtYmVyO1xuICBjb25zdHJ1Y3RvcihncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+KSB7IHN1cGVyKGdyaWQsICd2U2Nyb2xsQXV0bycpOyB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl92U2Nyb2xsQXV0bykge1xuICAgICAgdGhpcy5fdlNjcm9sbEF1dG8gID0gdGhpcy5ncmlkLmZpbmRJbml0aWFsUm93SGVpZ2h0KCkgfHwgNDg7XG4gICAgfVxuICAgIHRoaXMuX3Njcm9sbFN0cmF0ZWd5ID0gbmV3IFBibE5ncmlkQXV0b1NpemVWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3kodGhpcy5fbWluQnVmZmVyUHgsIHRoaXMuX21heEJ1ZmZlclB4LCBuZXcgUGJsTmdyaWRJdGVtU2l6ZUF2ZXJhZ2VyKHRoaXMuX3ZTY3JvbGxBdXRvKSk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICB0aGlzLl9zY3JvbGxTdHJhdGVneT8udXBkYXRlQnVmZmVyU2l6ZSh0aGlzLl9taW5CdWZmZXJQeCwgdGhpcy5fbWF4QnVmZmVyUHgpO1xuICB9XG59XG4iXX0=