import { ChangeDetectorRef, ChangeDetectionStrategy, Component, Input, Optional, ViewEncapsulation, } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { deprecatedWarning, unrx } from '@pebula/ngrid/core';
import { PblNgridComponent } from '@pebula/ngrid';
import * as i0 from "@angular/core";
import * as i1 from "@pebula/ngrid";
import * as i2 from "@angular/material/paginator";
import * as i3 from "@angular/material/form-field";
import * as i4 from "@angular/material/select";
import * as i5 from "@angular/material/core";
import * as i6 from "@angular/material/button";
import * as i7 from "@angular/common";
import * as i8 from "@angular/material/tooltip";
const DEFAULT_PAGE_SIZE_OPTIONS = [5, 10, 20, 50, 100];
export class PblPaginatorComponent {
    constructor(grid, _intl, cdr) {
        this._intl = _intl;
        this.cdr = cdr;
        this.pages = [];
        this.pageSizes = DEFAULT_PAGE_SIZE_OPTIONS.slice();
        this._hidePageSize = false;
        this._hideRangeSelect = false;
        if (grid) {
            this.grid = grid;
        }
        _intl.changes
            .pipe(unrx(this))
            .subscribe(() => this.cdr.markForCheck());
    }
    get pageSizeOptions() { return this._pageSizeOptions; }
    set pageSizeOptions(value) {
        this._pageSizeOptions = value;
        this.pageSizes = (value || DEFAULT_PAGE_SIZE_OPTIONS).slice();
        this.updatePageSizes();
    }
    get paginator() { return this._paginator; }
    set paginator(value) {
        if (this._paginator === value) {
            return;
        }
        if (this._paginator) {
            unrx.kill(this, this._paginator);
        }
        this._paginator = value;
        if (value) {
            // pagination.onChange is BehaviorSubject so handlePageChange will trigger
            value.onChange
                .pipe(unrx(this, value))
                .subscribe(event => this.handlePageChange(event));
            this.updatePageSizes();
        }
    }
    /**
     * @deprecated Will be removed in v5, Use `grid` instead
     */
    get table() {
        if (typeof ngDevMode === 'undefined' || ngDevMode) {
            deprecatedWarning('PblPaginatorComponent.table', '4', 'PblPaginatorComponent.grid');
        }
        return this.grid;
    }
    /**
     * @deprecated Will be removed in v5, Use `grid` instead
     */
    set table(value) {
        if (typeof ngDevMode === 'undefined' || ngDevMode) {
            console.warn(`"PblPaginatorComponent.table" is deprecated and will be removed in version 5, use "grid" instead.`);
        }
        this.grid = value;
    }
    get hidePageSize() { return this._hidePageSize; }
    set hidePageSize(value) { this._hidePageSize = coerceBooleanProperty(value); }
    get hideRangeSelect() { return this._hideRangeSelect; }
    set hideRangeSelect(value) { this._hideRangeSelect = coerceBooleanProperty(value); }
    ngOnDestroy() {
        unrx.kill(this);
    }
    updatePageSizes() {
        if (this.paginator && this.pageSizes.indexOf(this.paginator.perPage) === -1) {
            this.pageSizes.push(this.paginator.perPage);
        }
        this.pageSizes.sort((a, b) => a - b);
    }
    handlePageChange(event) {
        if (this.pages.length !== this.paginator.totalPages) {
            const pages = this.pages = [];
            for (let i = 1, len = this.paginator.totalPages + 1; i < len; i++) {
                pages.push(i);
            }
        }
        // this is required here to prevent `ExpressionChangedAfterItHasBeenCheckedError` when the component has or wrapped
        // by an ngIf
        this.cdr.detectChanges();
        this.cdr.markForCheck();
    }
}
/** @nocollapse */ PblPaginatorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblPaginatorComponent, deps: [{ token: i1.PblNgridComponent, optional: true }, { token: i2.MatPaginatorIntl }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ PblPaginatorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.0", type: PblPaginatorComponent, selector: "pbl-ngrid-paginator", inputs: { pageSizeOptions: "pageSizeOptions", paginator: "paginator", table: "table", grid: "grid", hidePageSize: "hidePageSize", hideRangeSelect: "hideRangeSelect" }, host: { classAttribute: "mat-paginator" }, ngImport: i0, template: "<div class=\"mat-paginator-outer-container\">\n  <div class=\"mat-paginator-container\">\n    <div *ngIf=\"!hidePageSize\" class=\"mat-paginator-page-size\">\n      <div class=\"mat-paginator-page-size-label\">\n        {{_intl.itemsPerPageLabel}}\n      </div>\n\n      <mat-form-field *ngIf=\"pageSizes.length > 1\"\n                      class=\"mat-paginator-page-size-select\">\n        <mat-select\n          [value]=\"paginator.perPage\"\n          [aria-label]=\"_intl.itemsPerPageLabel\"\n          [disabled]=\"pageSizes[0] >= paginator.total && (!paginator.hasPrev() && !paginator.hasNext())\"\n          (selectionChange)=\"paginator.perPage = $event.value\">\n          <mat-option *ngFor=\"let pageSizeOption of pageSizes\" [value]=\"pageSizeOption\">\n            {{pageSizeOption}}\n          </mat-option>\n        </mat-select>\n      </mat-form-field>\n      <div *ngIf=\"pageSizes.length <= 1\">{{paginator?.perPage}}</div>\n    </div>\n\n    <div class=\"mat-paginator-range-actions\">\n      <div *ngIf=\"paginator.kind ==='pageNumber'\" class=\"mat-paginator-range-label\">\n        {{_intl.getRangeLabel(paginator.page - 1, paginator.perPage, paginator.total)}}\n      </div>\n\n      <button mat-icon-button type=\"button\"\n              class=\"mat-paginator-navigation-previous\"\n              (click)=\"paginator.prevPage()\"\n              [attr.aria-label]=\"_intl.previousPageLabel\"\n              [matTooltip]=\"_intl.previousPageLabel\"\n              [matTooltipPosition]=\"'above'\"\n              [disabled]=\"!paginator.hasPrev()\">\n        <svg class=\"mat-paginator-icon\" viewBox=\"0 0 24 24\" focusable=\"false\">\n          <path d=\"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z\"/>\n        </svg>\n      </button>\n\n      <mat-form-field *ngIf=\"!hideRangeSelect && paginator.kind ==='pageNumber' && pageSizes.length >= 1\"\n                      class=\"mat-paginator-page-size-select\">\n        <mat-select\n          [value]=\"paginator.page\"\n          [disabled]=\"paginator.totalPages === 1\"\n          (selectionChange)=\"paginator.page = $event.value\">\n          <mat-option *ngFor=\"let p of pages\" [value]=\"p\">{{p}}</mat-option>\n        </mat-select>\n      </mat-form-field>\n\n      <button mat-icon-button type=\"button\"\n              class=\"mat-paginator-navigation-next\"\n              (click)=\"paginator.nextPage()\"\n              [attr.aria-label]=\"_intl.nextPageLabel\"\n              [matTooltip]=\"_intl.nextPageLabel\"\n              [matTooltipPosition]=\"'above'\"\n              [disabled]=\"!paginator.hasNext()\">\n        <svg class=\"mat-paginator-icon\" viewBox=\"0 0 24 24\" focusable=\"false\">\n          <path d=\"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z\"/>\n        </svg>\n      </button>\n    </div>\n  </div>\n</div>\n", styles: [".mat-paginator-range-label{flex-grow:1}.mat-paginator-container{box-sizing:border-box}"], components: [{ type: i3.MatFormField, selector: "mat-form-field", inputs: ["color", "floatLabel", "appearance", "hideRequiredMarker", "hintLabel"], exportAs: ["matFormField"] }, { type: i4.MatSelect, selector: "mat-select", inputs: ["disabled", "disableRipple", "tabIndex"], exportAs: ["matSelect"] }, { type: i5.MatOption, selector: "mat-option", exportAs: ["matOption"] }, { type: i6.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }], directives: [{ type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i7.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i8.MatTooltip, selector: "[matTooltip]", exportAs: ["matTooltip"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblPaginatorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'pbl-ngrid-paginator',
                    templateUrl: './table-paginator.component.html',
                    styleUrls: ['./table-paginator.component.scss'],
                    host: {
                        'class': 'mat-paginator',
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }]
        }], ctorParameters: function () { return [{ type: i1.PblNgridComponent, decorators: [{
                    type: Optional
                }] }, { type: i2.MatPaginatorIntl }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { pageSizeOptions: [{
                type: Input
            }], paginator: [{
                type: Input
            }], table: [{
                type: Input
            }], grid: [{
                type: Input
            }], hidePageSize: [{
                type: Input
            }], hideRangeSelect: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtcGFnaW5hdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmdyaWQtbWF0ZXJpYWwvcGFnaW5hdG9yL3NyYy9saWIvdGFibGUtcGFnaW5hdG9yLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmdyaWQtbWF0ZXJpYWwvcGFnaW5hdG9yL3NyYy9saWIvdGFibGUtcGFnaW5hdG9yLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxLQUFLLEVBQ0wsUUFBUSxFQUNSLGlCQUFpQixHQUVsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWdCLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFL0QsT0FBTyxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzdELE9BQU8sRUFBRSxpQkFBaUIsRUFBeUMsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7QUFFekYsTUFBTSx5QkFBeUIsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztBQVl2RCxNQUFNLE9BQU8scUJBQXFCO0lBNkRoQyxZQUF3QixJQUE0QixFQUNqQyxLQUF1QixFQUN0QixHQUFzQjtRQUR2QixVQUFLLEdBQUwsS0FBSyxDQUFrQjtRQUN0QixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQTlEMUMsVUFBSyxHQUFhLEVBQUUsQ0FBQztRQUNyQixjQUFTLEdBQWEseUJBQXlCLENBQUMsS0FBSyxFQUFFLENBQUM7UUF3RGhELGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLHFCQUFnQixHQUFHLEtBQUss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M0IsS0FBSztnQkFPTyxTQUFTO3NCQUFyQixLQUFLO2dCQXFCTyxLQUFLO3NCQUFqQixLQUFLO2dCQWdCRyxJQUFJO3NCQUFaLEtBQUs7Z0JBRU8sWUFBWTtzQkFBeEIsS0FBSztnQkFHTyxlQUFlO3NCQUEzQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPcHRpb25hbCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIE9uRGVzdHJveSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQsIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBNYXRQYWdpbmF0b3JJbnRsIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvcGFnaW5hdG9yJztcblxuaW1wb3J0IHsgZGVwcmVjYXRlZFdhcm5pbmcsIHVucnggfSBmcm9tICdAcGVidWxhL25ncmlkL2NvcmUnO1xuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQsIFBibFBhZ2luYXRvciwgUGJsUGFnaW5hdG9yQ2hhbmdlRXZlbnQgfSBmcm9tICdAcGVidWxhL25ncmlkJztcblxuY29uc3QgREVGQVVMVF9QQUdFX1NJWkVfT1BUSU9OUyA9IFs1LCAxMCwgMjAsIDUwLCAxMDBdO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdwYmwtbmdyaWQtcGFnaW5hdG9yJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RhYmxlLXBhZ2luYXRvci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3RhYmxlLXBhZ2luYXRvci5jb21wb25lbnQuc2NzcyddLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1wYWdpbmF0b3InLFxuICB9LFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBQYmxQYWdpbmF0b3JDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwYWdlczogbnVtYmVyW10gPSBbXTtcbiAgcGFnZVNpemVzOiBudW1iZXJbXSA9IERFRkFVTFRfUEFHRV9TSVpFX09QVElPTlMuc2xpY2UoKTtcblxuICBASW5wdXQoKSBnZXQgcGFnZVNpemVPcHRpb25zKCk6IG51bWJlcltdIHsgcmV0dXJuIHRoaXMuX3BhZ2VTaXplT3B0aW9uczsgfVxuICBzZXQgcGFnZVNpemVPcHRpb25zKHZhbHVlOiBudW1iZXJbXSkge1xuICAgIHRoaXMuX3BhZ2VTaXplT3B0aW9ucyA9IHZhbHVlO1xuICAgIHRoaXMucGFnZVNpemVzID0gKHZhbHVlIHx8IERFRkFVTFRfUEFHRV9TSVpFX09QVElPTlMpLnNsaWNlKCk7XG4gICAgdGhpcy51cGRhdGVQYWdlU2l6ZXMoKTtcbiAgfVxuXG4gIEBJbnB1dCgpIGdldCBwYWdpbmF0b3IoKTogUGJsUGFnaW5hdG9yPG51bWJlcj4geyByZXR1cm4gdGhpcy5fcGFnaW5hdG9yOyB9XG4gIHNldCBwYWdpbmF0b3IodmFsdWU6IFBibFBhZ2luYXRvcjxudW1iZXI+KSB7XG4gICAgaWYgKHRoaXMuX3BhZ2luYXRvciA9PT0gdmFsdWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuX3BhZ2luYXRvcikge1xuICAgICAgdW5yeC5raWxsKHRoaXMsIHRoaXMuX3BhZ2luYXRvcik7XG4gICAgfVxuICAgIHRoaXMuX3BhZ2luYXRvciA9IHZhbHVlO1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgLy8gcGFnaW5hdGlvbi5vbkNoYW5nZSBpcyBCZWhhdmlvclN1YmplY3Qgc28gaGFuZGxlUGFnZUNoYW5nZSB3aWxsIHRyaWdnZXJcbiAgICAgIHZhbHVlLm9uQ2hhbmdlXG4gICAgICAgIC5waXBlKHVucngodGhpcywgdmFsdWUpKVxuICAgICAgICAuc3Vic2NyaWJlKCBldmVudCA9PiB0aGlzLmhhbmRsZVBhZ2VDaGFuZ2UoZXZlbnQpICk7XG4gICAgICB0aGlzLnVwZGF0ZVBhZ2VTaXplcygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBXaWxsIGJlIHJlbW92ZWQgaW4gdjUsIFVzZSBgZ3JpZGAgaW5zdGVhZFxuICAgKi9cbiAgQElucHV0KCkgZ2V0IHRhYmxlKCk6IFBibE5ncmlkQ29tcG9uZW50PGFueT4ge1xuICAgIGlmICh0eXBlb2YgbmdEZXZNb2RlID09PSAndW5kZWZpbmVkJyB8fCBuZ0Rldk1vZGUpIHtcbiAgICAgIGRlcHJlY2F0ZWRXYXJuaW5nKCdQYmxQYWdpbmF0b3JDb21wb25lbnQudGFibGUnLCAnNCcsICdQYmxQYWdpbmF0b3JDb21wb25lbnQuZ3JpZCcpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5ncmlkO1xuICB9XG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBXaWxsIGJlIHJlbW92ZWQgaW4gdjUsIFVzZSBgZ3JpZGAgaW5zdGVhZFxuICAgKi9cbiAgc2V0IHRhYmxlKHZhbHVlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+KSB7XG4gICAgaWYgKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkge1xuICAgICAgY29uc29sZS53YXJuKGBcIlBibFBhZ2luYXRvckNvbXBvbmVudC50YWJsZVwiIGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB2ZXJzaW9uIDUsIHVzZSBcImdyaWRcIiBpbnN0ZWFkLmApXG4gICAgfVxuICAgIHRoaXMuZ3JpZCA9IHZhbHVlO1xuICB9XG5cbiAgQElucHV0KCkgZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8YW55PjtcblxuICBASW5wdXQoKSBnZXQgaGlkZVBhZ2VTaXplKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5faGlkZVBhZ2VTaXplOyB9XG4gIHNldCBoaWRlUGFnZVNpemUodmFsdWU6IGJvb2xlYW4pIHsgdGhpcy5faGlkZVBhZ2VTaXplID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTsgfVxuXG4gIEBJbnB1dCgpIGdldCBoaWRlUmFuZ2VTZWxlY3QoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9oaWRlUmFuZ2VTZWxlY3Q7IH1cbiAgc2V0IGhpZGVSYW5nZVNlbGVjdCh2YWx1ZTogYm9vbGVhbikgeyB0aGlzLl9oaWRlUmFuZ2VTZWxlY3QgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpOyB9XG5cbiAgcHJpdmF0ZSBfcGFnZVNpemVPcHRpb25zOiBudW1iZXJbXTtcbiAgcHJpdmF0ZSBfcGFnaW5hdG9yOiBQYmxQYWdpbmF0b3I8bnVtYmVyPjtcbiAgcHJpdmF0ZSBfaGlkZVBhZ2VTaXplID0gZmFsc2U7XG4gIHByaXZhdGUgX2hpZGVSYW5nZVNlbGVjdCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sXG4gICAgICAgICAgICAgIHB1YmxpYyBfaW50bDogTWF0UGFnaW5hdG9ySW50bCxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgaWYgKGdyaWQpIHtcbiAgICAgIHRoaXMuZ3JpZCA9IGdyaWQ7XG4gICAgfVxuICAgIF9pbnRsLmNoYW5nZXNcbiAgICAgIC5waXBlKHVucngodGhpcykpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHVucngua2lsbCh0aGlzKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlUGFnZVNpemVzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnBhZ2luYXRvciAmJiB0aGlzLnBhZ2VTaXplcy5pbmRleE9mKHRoaXMucGFnaW5hdG9yLnBlclBhZ2UpID09PSAtMSkge1xuICAgICAgdGhpcy5wYWdlU2l6ZXMucHVzaCh0aGlzLnBhZ2luYXRvci5wZXJQYWdlKTtcbiAgICB9XG4gICAgdGhpcy5wYWdlU2l6ZXMuc29ydCgoYSwgYikgPT4gYSAtIGIpO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVQYWdlQ2hhbmdlKGV2ZW50OiBQYmxQYWdpbmF0b3JDaGFuZ2VFdmVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnBhZ2VzLmxlbmd0aCAhPT0gdGhpcy5wYWdpbmF0b3IudG90YWxQYWdlcykge1xuICAgICAgY29uc3QgcGFnZXMgPSB0aGlzLnBhZ2VzID0gW107XG4gICAgICBmb3IgKGxldCBpID0gMSwgbGVuID0gdGhpcy5wYWdpbmF0b3IudG90YWxQYWdlcysxOyBpPGxlbjsgaSsrKSB7IHBhZ2VzLnB1c2goaSk7IH1cbiAgICB9XG4gICAgLy8gdGhpcyBpcyByZXF1aXJlZCBoZXJlIHRvIHByZXZlbnQgYEV4cHJlc3Npb25DaGFuZ2VkQWZ0ZXJJdEhhc0JlZW5DaGVja2VkRXJyb3JgIHdoZW4gdGhlIGNvbXBvbmVudCBoYXMgb3Igd3JhcHBlZFxuICAgIC8vIGJ5IGFuIG5nSWZcbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfaGlkZVBhZ2VTaXplOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9oaWRlUmFuZ2VTZWxlY3Q6IEJvb2xlYW5JbnB1dDtcbn1cbiIsIjxkaXYgY2xhc3M9XCJtYXQtcGFnaW5hdG9yLW91dGVyLWNvbnRhaW5lclwiPlxuICA8ZGl2IGNsYXNzPVwibWF0LXBhZ2luYXRvci1jb250YWluZXJcIj5cbiAgICA8ZGl2ICpuZ0lmPVwiIWhpZGVQYWdlU2l6ZVwiIGNsYXNzPVwibWF0LXBhZ2luYXRvci1wYWdlLXNpemVcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJtYXQtcGFnaW5hdG9yLXBhZ2Utc2l6ZS1sYWJlbFwiPlxuICAgICAgICB7e19pbnRsLml0ZW1zUGVyUGFnZUxhYmVsfX1cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8bWF0LWZvcm0tZmllbGQgKm5nSWY9XCJwYWdlU2l6ZXMubGVuZ3RoID4gMVwiXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJtYXQtcGFnaW5hdG9yLXBhZ2Utc2l6ZS1zZWxlY3RcIj5cbiAgICAgICAgPG1hdC1zZWxlY3RcbiAgICAgICAgICBbdmFsdWVdPVwicGFnaW5hdG9yLnBlclBhZ2VcIlxuICAgICAgICAgIFthcmlhLWxhYmVsXT1cIl9pbnRsLml0ZW1zUGVyUGFnZUxhYmVsXCJcbiAgICAgICAgICBbZGlzYWJsZWRdPVwicGFnZVNpemVzWzBdID49IHBhZ2luYXRvci50b3RhbCAmJiAoIXBhZ2luYXRvci5oYXNQcmV2KCkgJiYgIXBhZ2luYXRvci5oYXNOZXh0KCkpXCJcbiAgICAgICAgICAoc2VsZWN0aW9uQ2hhbmdlKT1cInBhZ2luYXRvci5wZXJQYWdlID0gJGV2ZW50LnZhbHVlXCI+XG4gICAgICAgICAgPG1hdC1vcHRpb24gKm5nRm9yPVwibGV0IHBhZ2VTaXplT3B0aW9uIG9mIHBhZ2VTaXplc1wiIFt2YWx1ZV09XCJwYWdlU2l6ZU9wdGlvblwiPlxuICAgICAgICAgICAge3twYWdlU2l6ZU9wdGlvbn19XG4gICAgICAgICAgPC9tYXQtb3B0aW9uPlxuICAgICAgICA8L21hdC1zZWxlY3Q+XG4gICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgPGRpdiAqbmdJZj1cInBhZ2VTaXplcy5sZW5ndGggPD0gMVwiPnt7cGFnaW5hdG9yPy5wZXJQYWdlfX08L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJtYXQtcGFnaW5hdG9yLXJhbmdlLWFjdGlvbnNcIj5cbiAgICAgIDxkaXYgKm5nSWY9XCJwYWdpbmF0b3Iua2luZCA9PT0ncGFnZU51bWJlcidcIiBjbGFzcz1cIm1hdC1wYWdpbmF0b3ItcmFuZ2UtbGFiZWxcIj5cbiAgICAgICAge3tfaW50bC5nZXRSYW5nZUxhYmVsKHBhZ2luYXRvci5wYWdlIC0gMSwgcGFnaW5hdG9yLnBlclBhZ2UsIHBhZ2luYXRvci50b3RhbCl9fVxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBjbGFzcz1cIm1hdC1wYWdpbmF0b3ItbmF2aWdhdGlvbi1wcmV2aW91c1wiXG4gICAgICAgICAgICAgIChjbGljayk9XCJwYWdpbmF0b3IucHJldlBhZ2UoKVwiXG4gICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiX2ludGwucHJldmlvdXNQYWdlTGFiZWxcIlxuICAgICAgICAgICAgICBbbWF0VG9vbHRpcF09XCJfaW50bC5wcmV2aW91c1BhZ2VMYWJlbFwiXG4gICAgICAgICAgICAgIFttYXRUb29sdGlwUG9zaXRpb25dPVwiJ2Fib3ZlJ1wiXG4gICAgICAgICAgICAgIFtkaXNhYmxlZF09XCIhcGFnaW5hdG9yLmhhc1ByZXYoKVwiPlxuICAgICAgICA8c3ZnIGNsYXNzPVwibWF0LXBhZ2luYXRvci1pY29uXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZvY3VzYWJsZT1cImZhbHNlXCI+XG4gICAgICAgICAgPHBhdGggZD1cIk0xNS40MSA3LjQxTDE0IDZsLTYgNiA2IDYgMS40MS0xLjQxTDEwLjgzIDEyelwiLz5cbiAgICAgICAgPC9zdmc+XG4gICAgICA8L2J1dHRvbj5cblxuICAgICAgPG1hdC1mb3JtLWZpZWxkICpuZ0lmPVwiIWhpZGVSYW5nZVNlbGVjdCAmJiBwYWdpbmF0b3Iua2luZCA9PT0ncGFnZU51bWJlcicgJiYgcGFnZVNpemVzLmxlbmd0aCA+PSAxXCJcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cIm1hdC1wYWdpbmF0b3ItcGFnZS1zaXplLXNlbGVjdFwiPlxuICAgICAgICA8bWF0LXNlbGVjdFxuICAgICAgICAgIFt2YWx1ZV09XCJwYWdpbmF0b3IucGFnZVwiXG4gICAgICAgICAgW2Rpc2FibGVkXT1cInBhZ2luYXRvci50b3RhbFBhZ2VzID09PSAxXCJcbiAgICAgICAgICAoc2VsZWN0aW9uQ2hhbmdlKT1cInBhZ2luYXRvci5wYWdlID0gJGV2ZW50LnZhbHVlXCI+XG4gICAgICAgICAgPG1hdC1vcHRpb24gKm5nRm9yPVwibGV0IHAgb2YgcGFnZXNcIiBbdmFsdWVdPVwicFwiPnt7cH19PC9tYXQtb3B0aW9uPlxuICAgICAgICA8L21hdC1zZWxlY3Q+XG4gICAgICA8L21hdC1mb3JtLWZpZWxkPlxuXG4gICAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgY2xhc3M9XCJtYXQtcGFnaW5hdG9yLW5hdmlnYXRpb24tbmV4dFwiXG4gICAgICAgICAgICAgIChjbGljayk9XCJwYWdpbmF0b3IubmV4dFBhZ2UoKVwiXG4gICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiX2ludGwubmV4dFBhZ2VMYWJlbFwiXG4gICAgICAgICAgICAgIFttYXRUb29sdGlwXT1cIl9pbnRsLm5leHRQYWdlTGFiZWxcIlxuICAgICAgICAgICAgICBbbWF0VG9vbHRpcFBvc2l0aW9uXT1cIidhYm92ZSdcIlxuICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiIXBhZ2luYXRvci5oYXNOZXh0KClcIj5cbiAgICAgICAgPHN2ZyBjbGFzcz1cIm1hdC1wYWdpbmF0b3ItaWNvblwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmb2N1c2FibGU9XCJmYWxzZVwiPlxuICAgICAgICAgIDxwYXRoIGQ9XCJNMTAgNkw4LjU5IDcuNDEgMTMuMTcgMTJsLTQuNTggNC41OUwxMCAxOGw2LTZ6XCIvPlxuICAgICAgICA8L3N2Zz5cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuIl19