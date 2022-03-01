import { Directive, Input, ElementRef } from '@angular/core';
import { StylingDiffer } from '@pebula/ngrid/core';
import * as i0 from "@angular/core";
/*
    We're using `StylingDiffer`, which is an exact copy of the style differ used for `ngStyle` and `ngClass`.
    The class is not exposed so we use a hard-copy.
    `StylingDiffer` is used only when IVY is enabled but here we've adopted it to be used in both modes. (pre IVY and IVY)
*/
/**
 * Bind to the class / style attributes of the container of a cell template.
 * For class bindings use [ngridCellClass] and for style bindings use [ngridCellStyle].
 *
 * This is like [ngClass] or [ngStyle] but not for the host of the directive but to it's parent.
 *
 * - [ngridCellClass] accepts the same type of values that [ngClass] does.
 * - [ngridCellStyle] accepts the same type of values that [ngStyle] does.
 *
 * ## Example
 *
 * We want to create a new cell type called "balance" that represents the balance of a bank account.
 * We also want to have different background color, green if the account balance if positive and red if it's negative.
 *
 * ```html
 * <div *pblNgridCellTypeDef="'balance'; value as value"
 *      [ngClass]="value < 0 ? 'balance-negative' : 'balance-positive'">{{ value  }}
 * </div>
 * ```
 *
 * The example above will work but the background will not fill the entire cell, only the `div` it is applied on.
 * This is because the container of the `div` has internal styling that apply padding (among other styles) to the cell.
 *
 * The container is controlled internally by ngrid, but you can access it's style / class attributes using this directive.
 *
 * ```html
 * <div *pblNgridCellTypeDef="'balance'; value as value"
 *      [ngridCellClass]="value < 0 ? 'balance-negative' : 'balance-positive'">{{ value  }}
 * </div>
 * ```
 *
 * > Because style / class is applied on the parent and the parent can have multiple children it is possible to apply this directive
 * on multiple children, do not do this as it will have unexpected results.
 */
export class PblNgridCellStyling {
    constructor(elRef) {
        this.elRef = elRef;
        this._lastStyle = new Set();
        this._lastClass = new Set();
    }
    set style(value) {
        if (!this._styleDiffer) {
            this._styleDiffer = new StylingDiffer('NgStyle', 8 /* AllowUnits */);
        }
        this._styleDiffer.setInput(value);
    }
    set klass(value) {
        if (!this._classDiffer) {
            this._classDiffer = new StylingDiffer('NgClass', 1 /* TrimProperties */ | 2 /* AllowSubKeys */ | 4 /* AllowStringValue */ | 16 /* ForceAsMap */);
        }
        this._classDiffer.setInput(value);
    }
    ngAfterViewInit() {
        this._parent = this.elRef.nativeElement.parentElement;
        this.updateParent();
    }
    ngDoCheck() { this, this.updateParent(); }
    updateParent() {
        var _a, _b;
        if (this._parent) {
            if ((_a = this._styleDiffer) === null || _a === void 0 ? void 0 : _a.updateValue()) {
                const lastStyle = this._lastStyle;
                this._lastStyle = new Set();
                for (const key of Object.keys(this._styleDiffer.value)) {
                    this._parent.style[key] = this._styleDiffer.value[key];
                    lastStyle.delete(key);
                    this._lastStyle.add(key);
                }
                if (lastStyle.size > 0) {
                    for (const key of lastStyle.values()) {
                        this._parent.style[key] = null;
                    }
                }
            }
            if ((_b = this._classDiffer) === null || _b === void 0 ? void 0 : _b.updateValue()) {
                const lastClass = this._lastClass;
                this._lastClass = new Set();
                for (const key of Object.keys(this._classDiffer.value)) {
                    if (this._classDiffer.value[key]) {
                        this._parent.classList.add(key);
                        this._lastClass.add(key);
                    }
                    else {
                        this._parent.classList.remove(key);
                    }
                    lastClass.delete(key);
                }
                if (lastClass.size > 0) {
                    for (const key of lastClass.values()) {
                        this._parent.classList.remove(key);
                    }
                }
            }
        }
    }
}
/** @nocollapse */ PblNgridCellStyling.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridCellStyling, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ PblNgridCellStyling.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridCellStyling, selector: "[ngridCellStyle], [ngridCellClass]", inputs: { style: ["ngridCellStyle", "style"], klass: ["ngridCellClass", "klass"] }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridCellStyling, decorators: [{
            type: Directive,
            args: [{ selector: '[ngridCellStyle], [ngridCellClass]' }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { style: [{
                type: Input,
                args: ['ngridCellStyle']
            }], klass: [{
                type: Input,
                args: ['ngridCellClass']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC1zdHlsaW5nLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmdyaWQvc3JjL2xpYi9ncmlkL2NlbGwvY2VsbC1zdHlsaW5nLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFFLGFBQWEsRUFBd0IsTUFBTSxvQkFBb0IsQ0FBQzs7QUFFekU7Ozs7RUFJRTtBQUdGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQ0c7QUFFSCxNQUFNLE9BQU8sbUJBQW1CO0lBeUI5QixZQUFvQixLQUE4QjtRQUE5QixVQUFLLEdBQUwsS0FBSyxDQUF5QjtRQUgxQyxlQUFVLEdBQUcsSUFBSSxHQUFHLEVBQVUsQ0FBQztRQUMvQixlQUFVLEdBQUcsSUFBSSxHQUFHLEVBQVUsQ0FBQztJQUVlLENBQUM7SUF2QnZELElBQTZCLEtBQUssQ0FBQyxLQUFnQztRQUNqRSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUN0QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksYUFBYSxDQUFtQyxTQUFTLHFCQUFrQyxDQUFDO1NBQ3JIO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELElBQTZCLEtBQUssQ0FBQyxLQUFpRTtRQUNsRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUN0QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksYUFBYSxDQUNuQyxTQUFTLEVBQ1QsNkNBQXVFLDJCQUF3QyxzQkFBa0MsQ0FDbEosQ0FBQztTQUNIO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQVVELGVBQWU7UUFDYixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQztRQUN0RCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELFNBQVMsS0FBVyxJQUFJLEVBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUV2QyxZQUFZOztRQUNsQixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsSUFBSSxNQUFBLElBQUksQ0FBQyxZQUFZLDBDQUFFLFdBQVcsRUFBRSxFQUFFO2dCQUNwQyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO2dCQUNsQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksR0FBRyxFQUFVLENBQUM7Z0JBQ3BDLEtBQUssTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUN0RCxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDdkQsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDdEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQzFCO2dCQUNELElBQUksU0FBUyxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUU7b0JBQ3RCLEtBQUssTUFBTSxHQUFHLElBQUksU0FBUyxDQUFDLE1BQU0sRUFBRSxFQUFFO3dCQUNwQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7cUJBQ2hDO2lCQUNGO2FBQ0Y7WUFFRCxJQUFJLE1BQUEsSUFBSSxDQUFDLFlBQVksMENBQUUsV0FBVyxFQUFFLEVBQUU7Z0JBQ3BDLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7Z0JBQ2xDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxHQUFHLEVBQVUsQ0FBQztnQkFDcEMsS0FBSyxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQ3RELElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7d0JBQ2hDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDaEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQzFCO3lCQUFNO3dCQUNMLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztxQkFDcEM7b0JBQ0QsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDdkI7Z0JBQ0QsSUFBSSxTQUFTLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRTtvQkFDdEIsS0FBSyxNQUFNLEdBQUcsSUFBSSxTQUFTLENBQUMsTUFBTSxFQUFFLEVBQUU7d0JBQ3BDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztxQkFDcEM7aUJBQ0Y7YUFDRjtTQUNGO0lBQ0gsQ0FBQzs7bUlBdEVVLG1CQUFtQjt1SEFBbkIsbUJBQW1COzJGQUFuQixtQkFBbUI7a0JBRC9CLFNBQVM7bUJBQUMsRUFBRSxRQUFRLEVBQUUsb0NBQW9DLEVBQUU7aUdBRzlCLEtBQUs7c0JBQWpDLEtBQUs7dUJBQUMsZ0JBQWdCO2dCQU9NLEtBQUs7c0JBQWpDLEtBQUs7dUJBQUMsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3R5bGluZ0RpZmZlciwgU3R5bGluZ0RpZmZlck9wdGlvbnMgfSBmcm9tICdAcGVidWxhL25ncmlkL2NvcmUnO1xuXG4vKlxuICAgIFdlJ3JlIHVzaW5nIGBTdHlsaW5nRGlmZmVyYCwgd2hpY2ggaXMgYW4gZXhhY3QgY29weSBvZiB0aGUgc3R5bGUgZGlmZmVyIHVzZWQgZm9yIGBuZ1N0eWxlYCBhbmQgYG5nQ2xhc3NgLlxuICAgIFRoZSBjbGFzcyBpcyBub3QgZXhwb3NlZCBzbyB3ZSB1c2UgYSBoYXJkLWNvcHkuXG4gICAgYFN0eWxpbmdEaWZmZXJgIGlzIHVzZWQgb25seSB3aGVuIElWWSBpcyBlbmFibGVkIGJ1dCBoZXJlIHdlJ3ZlIGFkb3B0ZWQgaXQgdG8gYmUgdXNlZCBpbiBib3RoIG1vZGVzLiAocHJlIElWWSBhbmQgSVZZKVxuKi9cblxuXG4vKipcbiAqIEJpbmQgdG8gdGhlIGNsYXNzIC8gc3R5bGUgYXR0cmlidXRlcyBvZiB0aGUgY29udGFpbmVyIG9mIGEgY2VsbCB0ZW1wbGF0ZS5cbiAqIEZvciBjbGFzcyBiaW5kaW5ncyB1c2UgW25ncmlkQ2VsbENsYXNzXSBhbmQgZm9yIHN0eWxlIGJpbmRpbmdzIHVzZSBbbmdyaWRDZWxsU3R5bGVdLlxuICpcbiAqIFRoaXMgaXMgbGlrZSBbbmdDbGFzc10gb3IgW25nU3R5bGVdIGJ1dCBub3QgZm9yIHRoZSBob3N0IG9mIHRoZSBkaXJlY3RpdmUgYnV0IHRvIGl0J3MgcGFyZW50LlxuICpcbiAqIC0gW25ncmlkQ2VsbENsYXNzXSBhY2NlcHRzIHRoZSBzYW1lIHR5cGUgb2YgdmFsdWVzIHRoYXQgW25nQ2xhc3NdIGRvZXMuXG4gKiAtIFtuZ3JpZENlbGxTdHlsZV0gYWNjZXB0cyB0aGUgc2FtZSB0eXBlIG9mIHZhbHVlcyB0aGF0IFtuZ1N0eWxlXSBkb2VzLlxuICpcbiAqICMjIEV4YW1wbGVcbiAqXG4gKiBXZSB3YW50IHRvIGNyZWF0ZSBhIG5ldyBjZWxsIHR5cGUgY2FsbGVkIFwiYmFsYW5jZVwiIHRoYXQgcmVwcmVzZW50cyB0aGUgYmFsYW5jZSBvZiBhIGJhbmsgYWNjb3VudC5cbiAqIFdlIGFsc28gd2FudCB0byBoYXZlIGRpZmZlcmVudCBiYWNrZ3JvdW5kIGNvbG9yLCBncmVlbiBpZiB0aGUgYWNjb3VudCBiYWxhbmNlIGlmIHBvc2l0aXZlIGFuZCByZWQgaWYgaXQncyBuZWdhdGl2ZS5cbiAqXG4gKiBgYGBodG1sXG4gKiA8ZGl2ICpwYmxOZ3JpZENlbGxUeXBlRGVmPVwiJ2JhbGFuY2UnOyB2YWx1ZSBhcyB2YWx1ZVwiXG4gKiAgICAgIFtuZ0NsYXNzXT1cInZhbHVlIDwgMCA/ICdiYWxhbmNlLW5lZ2F0aXZlJyA6ICdiYWxhbmNlLXBvc2l0aXZlJ1wiPnt7IHZhbHVlICB9fVxuICogPC9kaXY+XG4gKiBgYGBcbiAqXG4gKiBUaGUgZXhhbXBsZSBhYm92ZSB3aWxsIHdvcmsgYnV0IHRoZSBiYWNrZ3JvdW5kIHdpbGwgbm90IGZpbGwgdGhlIGVudGlyZSBjZWxsLCBvbmx5IHRoZSBgZGl2YCBpdCBpcyBhcHBsaWVkIG9uLlxuICogVGhpcyBpcyBiZWNhdXNlIHRoZSBjb250YWluZXIgb2YgdGhlIGBkaXZgIGhhcyBpbnRlcm5hbCBzdHlsaW5nIHRoYXQgYXBwbHkgcGFkZGluZyAoYW1vbmcgb3RoZXIgc3R5bGVzKSB0byB0aGUgY2VsbC5cbiAqXG4gKiBUaGUgY29udGFpbmVyIGlzIGNvbnRyb2xsZWQgaW50ZXJuYWxseSBieSBuZ3JpZCwgYnV0IHlvdSBjYW4gYWNjZXNzIGl0J3Mgc3R5bGUgLyBjbGFzcyBhdHRyaWJ1dGVzIHVzaW5nIHRoaXMgZGlyZWN0aXZlLlxuICpcbiAqIGBgYGh0bWxcbiAqIDxkaXYgKnBibE5ncmlkQ2VsbFR5cGVEZWY9XCInYmFsYW5jZSc7IHZhbHVlIGFzIHZhbHVlXCJcbiAqICAgICAgW25ncmlkQ2VsbENsYXNzXT1cInZhbHVlIDwgMCA/ICdiYWxhbmNlLW5lZ2F0aXZlJyA6ICdiYWxhbmNlLXBvc2l0aXZlJ1wiPnt7IHZhbHVlICB9fVxuICogPC9kaXY+XG4gKiBgYGBcbiAqXG4gKiA+IEJlY2F1c2Ugc3R5bGUgLyBjbGFzcyBpcyBhcHBsaWVkIG9uIHRoZSBwYXJlbnQgYW5kIHRoZSBwYXJlbnQgY2FuIGhhdmUgbXVsdGlwbGUgY2hpbGRyZW4gaXQgaXMgcG9zc2libGUgdG8gYXBwbHkgdGhpcyBkaXJlY3RpdmVcbiAqIG9uIG11bHRpcGxlIGNoaWxkcmVuLCBkbyBub3QgZG8gdGhpcyBhcyBpdCB3aWxsIGhhdmUgdW5leHBlY3RlZCByZXN1bHRzLlxuICovXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbbmdyaWRDZWxsU3R5bGVdLCBbbmdyaWRDZWxsQ2xhc3NdJyB9KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkQ2VsbFN0eWxpbmcge1xuXG4gIEBJbnB1dCgnbmdyaWRDZWxsU3R5bGUnKSBzZXQgc3R5bGUodmFsdWU6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0pIHtcbiAgICBpZiAoIXRoaXMuX3N0eWxlRGlmZmVyKSB7XG4gICAgICB0aGlzLl9zdHlsZURpZmZlciA9IG5ldyBTdHlsaW5nRGlmZmVyPHsgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgbnVsbCB9PignTmdTdHlsZScsIFN0eWxpbmdEaWZmZXJPcHRpb25zLkFsbG93VW5pdHMpO1xuICAgIH1cbiAgICB0aGlzLl9zdHlsZURpZmZlci5zZXRJbnB1dCh2YWx1ZSk7XG4gIH1cblxuICBASW5wdXQoJ25ncmlkQ2VsbENsYXNzJykgc2V0IGtsYXNzKHZhbHVlOiBzdHJpbmcgfCBzdHJpbmdbXSB8IFNldDxzdHJpbmc+IHwgeyBba2xhc3M6IHN0cmluZ106IGFueSB9KSB7XG4gICAgaWYgKCF0aGlzLl9jbGFzc0RpZmZlcikge1xuICAgICAgdGhpcy5fY2xhc3NEaWZmZXIgPSBuZXcgU3R5bGluZ0RpZmZlcjx7IFtrbGFzczogc3RyaW5nXTogdHJ1ZSB9PihcbiAgICAgICAgJ05nQ2xhc3MnLFxuICAgICAgICBTdHlsaW5nRGlmZmVyT3B0aW9ucy5UcmltUHJvcGVydGllcyB8IFN0eWxpbmdEaWZmZXJPcHRpb25zLkFsbG93U3ViS2V5cyB8IFN0eWxpbmdEaWZmZXJPcHRpb25zLkFsbG93U3RyaW5nVmFsdWUgfCBTdHlsaW5nRGlmZmVyT3B0aW9ucy5Gb3JjZUFzTWFwLFxuICAgICAgKTtcbiAgICB9XG4gICAgdGhpcy5fY2xhc3NEaWZmZXIuc2V0SW5wdXQodmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc3R5bGVEaWZmZXI6IFN0eWxpbmdEaWZmZXI8eyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBudWxsIH0+O1xuICBwcml2YXRlIF9jbGFzc0RpZmZlcjogU3R5bGluZ0RpZmZlcjx7IFtrbGFzczogc3RyaW5nXTogdHJ1ZSB9PjtcbiAgcHJpdmF0ZSBfcGFyZW50OiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBfbGFzdFN0eWxlID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gIHByaXZhdGUgX2xhc3RDbGFzcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7IH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fcGFyZW50ID0gdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgdGhpcy51cGRhdGVQYXJlbnQoKTtcbiAgfVxuXG4gIG5nRG9DaGVjaygpOiB2b2lkIHsgdGhpcyx0aGlzLnVwZGF0ZVBhcmVudCgpOyB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVQYXJlbnQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3BhcmVudCkge1xuICAgICAgaWYgKHRoaXMuX3N0eWxlRGlmZmVyPy51cGRhdGVWYWx1ZSgpKSB7XG4gICAgICAgIGNvbnN0IGxhc3RTdHlsZSA9IHRoaXMuX2xhc3RTdHlsZTtcbiAgICAgICAgdGhpcy5fbGFzdFN0eWxlID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHRoaXMuX3N0eWxlRGlmZmVyLnZhbHVlKSkge1xuICAgICAgICAgIHRoaXMuX3BhcmVudC5zdHlsZVtrZXldID0gdGhpcy5fc3R5bGVEaWZmZXIudmFsdWVba2V5XTtcbiAgICAgICAgICBsYXN0U3R5bGUuZGVsZXRlKGtleSk7XG4gICAgICAgICAgdGhpcy5fbGFzdFN0eWxlLmFkZChrZXkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsYXN0U3R5bGUuc2l6ZSA+IDApIHtcbiAgICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBsYXN0U3R5bGUudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIHRoaXMuX3BhcmVudC5zdHlsZVtrZXldID0gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX2NsYXNzRGlmZmVyPy51cGRhdGVWYWx1ZSgpKSB7XG4gICAgICAgIGNvbnN0IGxhc3RDbGFzcyA9IHRoaXMuX2xhc3RDbGFzcztcbiAgICAgICAgdGhpcy5fbGFzdENsYXNzID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHRoaXMuX2NsYXNzRGlmZmVyLnZhbHVlKSkge1xuICAgICAgICAgIGlmICh0aGlzLl9jbGFzc0RpZmZlci52YWx1ZVtrZXldKSB7XG4gICAgICAgICAgICB0aGlzLl9wYXJlbnQuY2xhc3NMaXN0LmFkZChrZXkpO1xuICAgICAgICAgICAgdGhpcy5fbGFzdENsYXNzLmFkZChrZXkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9wYXJlbnQuY2xhc3NMaXN0LnJlbW92ZShrZXkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBsYXN0Q2xhc3MuZGVsZXRlKGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxhc3RDbGFzcy5zaXplID4gMCkge1xuICAgICAgICAgIGZvciAoY29uc3Qga2V5IG9mIGxhc3RDbGFzcy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgdGhpcy5fcGFyZW50LmNsYXNzTGlzdC5yZW1vdmUoa2V5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==