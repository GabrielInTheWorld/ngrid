import { VIRTUAL_SCROLL_STRATEGY } from '@angular/cdk/scrolling';
import { Directive, Input } from '@angular/core';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { PblNgridComponent } from '../../../../ngrid.component';
import { PblNgridBaseVirtualScrollDirective } from '../base-v-scroll.directive';
import { PblNgridFixedSizeVirtualScrollStrategy } from './fixed-size';
import * as i0 from "@angular/core";
import * as i1 from "../../../../ngrid.component";
/**
 * @deprecated Will be removed in v5
 * `vScrollFixed` will move to an independent package in v5.
 * Note that the recommended dynamic strategy for nGrid is `vScrollDynamic`
 */
export class PblCdkFixedSizedVirtualScrollDirective extends PblNgridBaseVirtualScrollDirective {
    constructor(grid) { super(grid, 'vScrollFixed'); }
    /**
     * The size of the items in the list (in pixels).
     * If this value is not set the height is calculated from the first rendered row item.
     *
     * @deprecated Will be removed in v5: `vScrollFixed` will move to an independent package in v5. Note that the recommended dynamic strategy for nGrid is `vScrollDynamic`
     */
    get vScrollFixed() { return this._vScrollFixed; }
    set vScrollFixed(value) { this._vScrollFixed = coerceNumberProperty(value); }
    ngOnInit() {
        if (!this._vScrollFixed) {
            this.vScrollFixed = this.grid.findInitialRowHeight() || 48;
        }
        this._scrollStrategy = new PblNgridFixedSizeVirtualScrollStrategy(this._vScrollFixed, this._minBufferPx, this._maxBufferPx);
    }
    ngOnChanges() {
        var _a;
        (_a = this._scrollStrategy) === null || _a === void 0 ? void 0 : _a.updateItemAndBufferSize(this._vScrollFixed, this._minBufferPx, this._maxBufferPx);
    }
}
/** @nocollapse */ PblCdkFixedSizedVirtualScrollDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblCdkFixedSizedVirtualScrollDirective, deps: [{ token: i1.PblNgridComponent }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ PblCdkFixedSizedVirtualScrollDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblCdkFixedSizedVirtualScrollDirective, selector: "pbl-ngrid[vScrollFixed]", inputs: { minBufferPx: "minBufferPx", maxBufferPx: "maxBufferPx", wheelMode: "wheelMode", vScrollFixed: "vScrollFixed" }, providers: [{
            provide: VIRTUAL_SCROLL_STRATEGY,
            useExisting: PblCdkFixedSizedVirtualScrollDirective,
        }], usesInheritance: true, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblCdkFixedSizedVirtualScrollDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'pbl-ngrid[vScrollFixed]',
                    inputs: ['minBufferPx', 'maxBufferPx', 'wheelMode'],
                    providers: [{
                            provide: VIRTUAL_SCROLL_STRATEGY,
                            useExisting: PblCdkFixedSizedVirtualScrollDirective,
                        }],
                }]
        }], ctorParameters: function () { return [{ type: i1.PblNgridComponent }]; }, propDecorators: { vScrollFixed: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidi1zY3JvbGwtZml4ZWQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3JpZC9zcmMvbGliL2dyaWQvZmVhdHVyZXMvdmlydHVhbC1zY3JvbGwvc3RyYXRlZ2llcy9jZGstd3JhcHBlcnMvdi1zY3JvbGwtZml4ZWQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUNwRSxPQUFPLEVBQUUsb0JBQW9CLEVBQWUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsa0NBQWtDLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNoRixPQUFPLEVBQUUsc0NBQXNDLEVBQUUsTUFBTSxjQUFjLENBQUM7OztBQUV0RTs7OztHQUlHO0FBU0gsTUFBTSxPQUFPLHNDQUF1QyxTQUFRLGtDQUFrRDtJQWE1RyxZQUFZLElBQXVCLElBQUksS0FBSyxDQUFDLElBQUksRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFYckU7Ozs7O09BS0c7SUFDSCxJQUFhLFlBQVksS0FBa0IsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztJQUN2RSxJQUFJLFlBQVksQ0FBQyxLQUFrQixJQUFJLElBQUksQ0FBQyxhQUFhLEdBQUcsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBTTFGLFFBQVE7UUFDTixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN2QixJQUFJLENBQUMsWUFBWSxHQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxFQUFFLENBQUM7U0FDN0Q7UUFDRCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksc0NBQXNDLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM5SCxDQUFDO0lBRUQsV0FBVzs7UUFDVCxNQUFBLElBQUksQ0FBQyxlQUFlLDBDQUFFLHVCQUF1QixDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDMUcsQ0FBQzs7c0pBeEJVLHNDQUFzQzswSUFBdEMsc0NBQXNDLDRLQUx0QyxDQUFDO1lBQ1YsT0FBTyxFQUFFLHVCQUF1QjtZQUNoQyxXQUFXLEVBQUUsc0NBQXNDO1NBQ3BELENBQUM7MkZBRVMsc0NBQXNDO2tCQVJsRCxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSx5QkFBeUI7b0JBQ25DLE1BQU0sRUFBRSxDQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsV0FBVyxDQUFFO29CQUNyRCxTQUFTLEVBQUUsQ0FBQzs0QkFDVixPQUFPLEVBQUUsdUJBQXVCOzRCQUNoQyxXQUFXLHdDQUF3Qzt5QkFDcEQsQ0FBQztpQkFDSDt3R0FTYyxZQUFZO3NCQUF4QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVklSVFVBTF9TQ1JPTExfU1RSQVRFR1kgfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcbmltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE9uSW5pdCwgT25DaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjb2VyY2VOdW1iZXJQcm9wZXJ0eSwgTnVtYmVySW5wdXQgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi8uLi9uZ3JpZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGJsTmdyaWRCYXNlVmlydHVhbFNjcm9sbERpcmVjdGl2ZSB9IGZyb20gJy4uL2Jhc2Utdi1zY3JvbGwuZGlyZWN0aXZlJztcbmltcG9ydCB7IFBibE5ncmlkRml4ZWRTaXplVmlydHVhbFNjcm9sbFN0cmF0ZWd5IH0gZnJvbSAnLi9maXhlZC1zaXplJztcblxuLyoqXG4gKiBAZGVwcmVjYXRlZCBXaWxsIGJlIHJlbW92ZWQgaW4gdjVcbiAqIGB2U2Nyb2xsRml4ZWRgIHdpbGwgbW92ZSB0byBhbiBpbmRlcGVuZGVudCBwYWNrYWdlIGluIHY1LlxuICogTm90ZSB0aGF0IHRoZSByZWNvbW1lbmRlZCBkeW5hbWljIHN0cmF0ZWd5IGZvciBuR3JpZCBpcyBgdlNjcm9sbER5bmFtaWNgXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3BibC1uZ3JpZFt2U2Nyb2xsRml4ZWRdJywgLy8gdHNsaW50OmRpc2FibGUtbGluZTogZGlyZWN0aXZlLXNlbGVjdG9yXG4gIGlucHV0czogWyAnbWluQnVmZmVyUHgnLCAnbWF4QnVmZmVyUHgnLCAnd2hlZWxNb2RlJyBdLCAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOiBuby1pbnB1dHMtbWV0YWRhdGEtcHJvcGVydHlcbiAgcHJvdmlkZXJzOiBbe1xuICAgIHByb3ZpZGU6IFZJUlRVQUxfU0NST0xMX1NUUkFURUdZLFxuICAgIHVzZUV4aXN0aW5nOiBQYmxDZGtGaXhlZFNpemVkVmlydHVhbFNjcm9sbERpcmVjdGl2ZSxcbiAgfV0sXG59KVxuZXhwb3J0IGNsYXNzIFBibENka0ZpeGVkU2l6ZWRWaXJ0dWFsU2Nyb2xsRGlyZWN0aXZlIGV4dGVuZHMgUGJsTmdyaWRCYXNlVmlydHVhbFNjcm9sbERpcmVjdGl2ZTwndlNjcm9sbEZpeGVkJz4gaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG5cbiAgLyoqXG4gICAqIFRoZSBzaXplIG9mIHRoZSBpdGVtcyBpbiB0aGUgbGlzdCAoaW4gcGl4ZWxzKS5cbiAgICogSWYgdGhpcyB2YWx1ZSBpcyBub3Qgc2V0IHRoZSBoZWlnaHQgaXMgY2FsY3VsYXRlZCBmcm9tIHRoZSBmaXJzdCByZW5kZXJlZCByb3cgaXRlbS5cbiAgICpcbiAgICogQGRlcHJlY2F0ZWQgV2lsbCBiZSByZW1vdmVkIGluIHY1OiBgdlNjcm9sbEZpeGVkYCB3aWxsIG1vdmUgdG8gYW4gaW5kZXBlbmRlbnQgcGFja2FnZSBpbiB2NS4gTm90ZSB0aGF0IHRoZSByZWNvbW1lbmRlZCBkeW5hbWljIHN0cmF0ZWd5IGZvciBuR3JpZCBpcyBgdlNjcm9sbER5bmFtaWNgXG4gICAqL1xuICBASW5wdXQoKSBnZXQgdlNjcm9sbEZpeGVkKCk6IE51bWJlcklucHV0IHsgcmV0dXJuIHRoaXMuX3ZTY3JvbGxGaXhlZDsgfVxuICBzZXQgdlNjcm9sbEZpeGVkKHZhbHVlOiBOdW1iZXJJbnB1dCkgeyB0aGlzLl92U2Nyb2xsRml4ZWQgPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWx1ZSk7IH1cblxuICBwcml2YXRlIF92U2Nyb2xsRml4ZWQ6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihncmlkOiBQYmxOZ3JpZENvbXBvbmVudCkgeyBzdXBlcihncmlkLCAndlNjcm9sbEZpeGVkJyk7IH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX3ZTY3JvbGxGaXhlZCkge1xuICAgICAgdGhpcy52U2Nyb2xsRml4ZWQgID0gdGhpcy5ncmlkLmZpbmRJbml0aWFsUm93SGVpZ2h0KCkgfHwgNDg7XG4gICAgfVxuICAgIHRoaXMuX3Njcm9sbFN0cmF0ZWd5ID0gbmV3IFBibE5ncmlkRml4ZWRTaXplVmlydHVhbFNjcm9sbFN0cmF0ZWd5KHRoaXMuX3ZTY3JvbGxGaXhlZCwgdGhpcy5fbWluQnVmZmVyUHgsIHRoaXMuX21heEJ1ZmZlclB4KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMuX3Njcm9sbFN0cmF0ZWd5Py51cGRhdGVJdGVtQW5kQnVmZmVyU2l6ZSh0aGlzLl92U2Nyb2xsRml4ZWQsIHRoaXMuX21pbkJ1ZmZlclB4LCB0aGlzLl9tYXhCdWZmZXJQeCk7XG4gIH1cbn1cbiJdfQ==