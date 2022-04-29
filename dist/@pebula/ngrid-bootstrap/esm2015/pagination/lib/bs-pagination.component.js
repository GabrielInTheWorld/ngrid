import { ChangeDetectorRef, ChangeDetectionStrategy, Component, Input, Optional, ViewEncapsulation, } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { unrx } from '@pebula/ngrid/core';
import { PblNgridComponent } from '@pebula/ngrid';
import * as i0 from "@angular/core";
import * as i1 from "@pebula/ngrid";
import * as i2 from "@ng-bootstrap/ng-bootstrap";
import * as i3 from "@angular/common";
const DEFAULT_PAGE_SIZE_OPTIONS = [5, 10, 20, 50, 100];
export class PblNgridBsPagination {
    constructor(grid, cdr) {
        this.cdr = cdr;
        this.pages = [];
        this.pageSizes = DEFAULT_PAGE_SIZE_OPTIONS.slice();
        this._hidePageSize = false;
        this._hideRangeSelect = false;
        if (grid) {
            this.grid = grid;
        }
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
    get hidePageSize() { return this._hidePageSize; }
    set hidePageSize(value) { this._hidePageSize = coerceBooleanProperty(value); }
    get hideRangeSelect() { return this._hideRangeSelect; }
    set hideRangeSelect(value) { this._hideRangeSelect = coerceBooleanProperty(value); }
    ngOnDestroy() {
        unrx.kill(this);
    }
    _pageChanged(page) {
        this.paginator.page = page;
    }
    _perPageChanged(value) {
        const perPage = parseInt(value, 10);
        this.paginator.perPage = perPage;
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
/** @nocollapse */ PblNgridBsPagination.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridBsPagination, deps: [{ token: i1.PblNgridComponent, optional: true }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ PblNgridBsPagination.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridBsPagination, selector: "pbl-ngrid-bs-pagination", inputs: { pageSizeOptions: "pageSizeOptions", paginator: "paginator", grid: "grid", hidePageSize: "hidePageSize", hideRangeSelect: "hideRangeSelect" }, ngImport: i0, template: "<div class=\"d-flex align-items-center justify-content-end p-2\">\n\n  <div *ngIf=\"!hidePageSize\" class=\"mr-4\">\n    <label class=\"mr-2\" for=\"selectPerPage\">Item's per page</label>\n    <select *ngIf=\"pageSizes.length > 1\" #selectPerPage id=\"selectPerPage\"\n            class=\"custom-select\" style=\"width: auto\"\n            [value]=\"paginator.perPage\"\n            (change)=\"_perPageChanged(selectPerPage.value)\"\n            [disabled]=\"pageSizes[0] >= paginator.total && (!paginator.hasPrev() && !paginator.hasNext())\">\n      <option *ngFor=\"let pageSizeOption of pageSizes\" [value]=\"pageSizeOption\" [selected]=\"pageSizeOption == paginator.perPage\">\n        {{pageSizeOption}}\n      </option>\n    </select>\n    <div *ngIf=\"pageSizes.length <= 1\">{{paginator?.perPage}}</div>\n  </div>\n\n  <ngb-pagination class=\"d-flex align-items-center justify-content-end\"\n                  [collectionSize]=\"paginator.total\" [page]=\"paginator.page\" [pageSize]=\"paginator.perPage\"\n                  [maxSize]=\"5\" [rotate]=\"true\" [boundaryLinks]=\"true\"\n                  (pageChange)=\"_pageChanged($event)\"></ngb-pagination>\n</div>\n", styles: [".custom-select{transition:background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;display:inline-block;width:100%;height:calc(1.5em + .75rem + 2px);padding:.375rem 1.75rem .375rem .75rem;font-size:1rem;font-weight:400;line-height:1.5;color:#495057;vertical-align:middle;background:#fff url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5' viewBox='0 0 4 5'%3e%3cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e\") no-repeat right .75rem center/8px 10px;border:1px solid #ced4da;border-radius:.25rem;-webkit-appearance:none;-moz-appearance:none;appearance:none}"], components: [{ type: i2.NgbPagination, selector: "ngb-pagination", inputs: ["page", "disabled", "boundaryLinks", "directionLinks", "ellipses", "maxSize", "pageSize", "rotate", "size", "collectionSize"], outputs: ["pageChange"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridBsPagination, decorators: [{
            type: Component,
            args: [{
                    selector: 'pbl-ngrid-bs-pagination',
                    templateUrl: './bs-pagination.component.html',
                    styleUrls: ['./bs-pagination.component.scss'],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }]
        }], ctorParameters: function () { return [{ type: i1.PblNgridComponent, decorators: [{
                    type: Optional
                }] }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { pageSizeOptions: [{
                type: Input
            }], paginator: [{
                type: Input
            }], grid: [{
                type: Input
            }], hidePageSize: [{
                type: Input
            }], hideRangeSelect: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtcGFnaW5hdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL25ncmlkLWJvb3RzdHJhcC9wYWdpbmF0aW9uL3NyYy9saWIvYnMtcGFnaW5hdGlvbi5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL25ncmlkLWJvb3RzdHJhcC9wYWdpbmF0aW9uL3NyYy9saWIvYnMtcGFnaW5hdGlvbi5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsS0FBSyxFQUNMLFFBQVEsRUFDUixpQkFBaUIsR0FFbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFnQixxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRTVFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUMxQyxPQUFPLEVBQUUsaUJBQWlCLEVBQXlDLE1BQU0sZUFBZSxDQUFDOzs7OztBQUV6RixNQUFNLHlCQUF5QixHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBU3ZELE1BQU0sT0FBTyxvQkFBb0I7SUEwQy9CLFlBQXdCLElBQTRCLEVBQVUsR0FBc0I7UUFBdEIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUF6Q3BGLFVBQUssR0FBYSxFQUFFLENBQUM7UUFDckIsY0FBUyxHQUFhLHlCQUF5QixDQUFDLEtBQUssRUFBRSxDQUFDO1FBcUNoRCxrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUN0QixxQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFHL0IsSUFBSSxJQUFJLEVBQUU7WUFDUixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztTQUNsQjtJQUNILENBQUM7SUExQ0QsSUFBYSxlQUFlLEtBQWUsT0FBTyxJ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LENBQUMsRUFBRSxDQUFDLEdBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFBRTtTQUNsRjtRQUNELG1IQUFtSDtRQUNuSCxhQUFhO1FBQ2IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzFCLENBQUM7O29JQTdFVSxvQkFBb0I7d0hBQXBCLG9CQUFvQix1TkN2QmpDLDJwQ0FxQkE7MkZERWEsb0JBQW9CO2tCQVBoQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSx5QkFBeUI7b0JBQ25DLFdBQVcsRUFBRSxnQ0FBZ0M7b0JBQzdDLFNBQVMsRUFBRSxDQUFDLGdDQUFnQyxDQUFDO29CQUM3QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7aUJBQ3RDOzswQkEyQ2MsUUFBUTs0RUF0Q1IsZUFBZTtzQkFBM0IsS0FBSztnQkFPTyxTQUFTO3NCQUFyQixLQUFLO2dCQWtCRyxJQUFJO3NCQUFaLEtBQUs7Z0JBRU8sWUFBWTtzQkFBeEIsS0FBSztnQkFHTyxlQUFlO3NCQUEzQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPcHRpb25hbCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIE9uRGVzdHJveSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQsIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5cbmltcG9ydCB7IHVucnggfSBmcm9tICdAcGVidWxhL25ncmlkL2NvcmUnO1xuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQsIFBibFBhZ2luYXRvciwgUGJsUGFnaW5hdG9yQ2hhbmdlRXZlbnQgfSBmcm9tICdAcGVidWxhL25ncmlkJztcblxuY29uc3QgREVGQVVMVF9QQUdFX1NJWkVfT1BUSU9OUyA9IFs1LCAxMCwgMjAsIDUwLCAxMDBdO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdwYmwtbmdyaWQtYnMtcGFnaW5hdGlvbicsXG4gIHRlbXBsYXRlVXJsOiAnLi9icy1wYWdpbmF0aW9uLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vYnMtcGFnaW5hdGlvbi5jb21wb25lbnQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZEJzUGFnaW5hdGlvbiBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHBhZ2VzOiBudW1iZXJbXSA9IFtdO1xuICBwYWdlU2l6ZXM6IG51bWJlcltdID0gREVGQVVMVF9QQUdFX1NJWkVfT1BUSU9OUy5zbGljZSgpO1xuXG4gIEBJbnB1dCgpIGdldCBwYWdlU2l6ZU9wdGlvbnMoKTogbnVtYmVyW10geyByZXR1cm4gdGhpcy5fcGFnZVNpemVPcHRpb25zOyB9XG4gIHNldCBwYWdlU2l6ZU9wdGlvbnModmFsdWU6IG51bWJlcltdKSB7XG4gICAgdGhpcy5fcGFnZVNpemVPcHRpb25zID0gdmFsdWU7XG4gICAgdGhpcy5wYWdlU2l6ZXMgPSAodmFsdWUgfHwgREVGQVVMVF9QQUdFX1NJWkVfT1BUSU9OUykuc2xpY2UoKTtcbiAgICB0aGlzLnVwZGF0ZVBhZ2VTaXplcygpO1xuICB9XG5cbiAgQElucHV0KCkgZ2V0IHBhZ2luYXRvcigpOiBQYmxQYWdpbmF0b3I8bnVtYmVyPiB7IHJldHVybiB0aGlzLl9wYWdpbmF0b3I7IH1cbiAgc2V0IHBhZ2luYXRvcih2YWx1ZTogUGJsUGFnaW5hdG9yPG51bWJlcj4pIHtcbiAgICBpZiAodGhpcy5fcGFnaW5hdG9yID09PSB2YWx1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5fcGFnaW5hdG9yKSB7XG4gICAgICB1bnJ4LmtpbGwodGhpcywgdGhpcy5fcGFnaW5hdG9yKTtcbiAgICB9XG4gICAgdGhpcy5fcGFnaW5hdG9yID0gdmFsdWU7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICAvLyBwYWdpbmF0aW9uLm9uQ2hhbmdlIGlzIEJlaGF2aW9yU3ViamVjdCBzbyBoYW5kbGVQYWdlQ2hhbmdlIHdpbGwgdHJpZ2dlclxuICAgICAgdmFsdWUub25DaGFuZ2VcbiAgICAgICAgLnBpcGUodW5yeCh0aGlzLCB2YWx1ZSkpXG4gICAgICAgIC5zdWJzY3JpYmUoIGV2ZW50ID0+IHRoaXMuaGFuZGxlUGFnZUNoYW5nZShldmVudCkgKTtcbiAgICAgIHRoaXMudXBkYXRlUGFnZVNpemVzKCk7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCkgZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8YW55PjtcblxuICBASW5wdXQoKSBnZXQgaGlkZVBhZ2VTaXplKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5faGlkZVBhZ2VTaXplOyB9XG4gIHNldCBoaWRlUGFnZVNpemUodmFsdWU6IGJvb2xlYW4pIHsgdGhpcy5faGlkZVBhZ2VTaXplID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTsgfVxuXG4gIEBJbnB1dCgpIGdldCBoaWRlUmFuZ2VTZWxlY3QoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9oaWRlUmFuZ2VTZWxlY3Q7IH1cbiAgc2V0IGhpZGVSYW5nZVNlbGVjdCh2YWx1ZTogYm9vbGVhbikgeyB0aGlzLl9oaWRlUmFuZ2VTZWxlY3QgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpOyB9XG5cbiAgcHJpdmF0ZSBfcGFnZVNpemVPcHRpb25zOiBudW1iZXJbXTtcbiAgcHJpdmF0ZSBfcGFnaW5hdG9yOiBQYmxQYWdpbmF0b3I8bnVtYmVyPjtcbiAgcHJpdmF0ZSBfaGlkZVBhZ2VTaXplID0gZmFsc2U7XG4gIHByaXZhdGUgX2hpZGVSYW5nZVNlbGVjdCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIGlmIChncmlkKSB7XG4gICAgICB0aGlzLmdyaWQgPSBncmlkO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHVucngua2lsbCh0aGlzKTtcbiAgfVxuXG4gIF9wYWdlQ2hhbmdlZChwYWdlOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnBhZ2luYXRvci5wYWdlID0gcGFnZTtcbiAgfVxuXG4gIF9wZXJQYWdlQ2hhbmdlZCh2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgcGVyUGFnZSA9IHBhcnNlSW50KHZhbHVlLCAxMCk7XG4gICAgdGhpcy5wYWdpbmF0b3IucGVyUGFnZSA9IHBlclBhZ2U7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZVBhZ2VTaXplcygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5wYWdpbmF0b3IgJiYgdGhpcy5wYWdlU2l6ZXMuaW5kZXhPZih0aGlzLnBhZ2luYXRvci5wZXJQYWdlKSA9PT0gLTEpIHtcbiAgICAgIHRoaXMucGFnZVNpemVzLnB1c2godGhpcy5wYWdpbmF0b3IucGVyUGFnZSk7XG4gICAgfVxuICAgIHRoaXMucGFnZVNpemVzLnNvcnQoKGEsIGIpID0+IGEgLSBiKTtcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlUGFnZUNoYW5nZShldmVudDogUGJsUGFnaW5hdG9yQ2hhbmdlRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5wYWdlcy5sZW5ndGggIT09IHRoaXMucGFnaW5hdG9yLnRvdGFsUGFnZXMpIHtcbiAgICAgIGNvbnN0IHBhZ2VzID0gdGhpcy5wYWdlcyA9IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IDEsIGxlbiA9IHRoaXMucGFnaW5hdG9yLnRvdGFsUGFnZXMrMTsgaTxsZW47IGkrKykgeyBwYWdlcy5wdXNoKGkpOyB9XG4gICAgfVxuICAgIC8vIHRoaXMgaXMgcmVxdWlyZWQgaGVyZSB0byBwcmV2ZW50IGBFeHByZXNzaW9uQ2hhbmdlZEFmdGVySXRIYXNCZWVuQ2hlY2tlZEVycm9yYCB3aGVuIHRoZSBjb21wb25lbnQgaGFzIG9yIHdyYXBwZWRcbiAgICAvLyBieSBhbiBuZ0lmXG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2hpZGVQYWdlU2l6ZTogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfaGlkZVJhbmdlU2VsZWN0OiBCb29sZWFuSW5wdXQ7XG59XG4iLCI8ZGl2IGNsYXNzPVwiZC1mbGV4IGFsaWduLWl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNvbnRlbnQtZW5kIHAtMlwiPlxuXG4gIDxkaXYgKm5nSWY9XCIhaGlkZVBhZ2VTaXplXCIgY2xhc3M9XCJtci00XCI+XG4gICAgPGxhYmVsIGNsYXNzPVwibXItMlwiIGZvcj1cInNlbGVjdFBlclBhZ2VcIj5JdGVtJ3MgcGVyIHBhZ2U8L2xhYmVsPlxuICAgIDxzZWxlY3QgKm5nSWY9XCJwYWdlU2l6ZXMubGVuZ3RoID4gMVwiICNzZWxlY3RQZXJQYWdlIGlkPVwic2VsZWN0UGVyUGFnZVwiXG4gICAgICAgICAgICBjbGFzcz1cImN1c3RvbS1zZWxlY3RcIiBzdHlsZT1cIndpZHRoOiBhdXRvXCJcbiAgICAgICAgICAgIFt2YWx1ZV09XCJwYWdpbmF0b3IucGVyUGFnZVwiXG4gICAgICAgICAgICAoY2hhbmdlKT1cIl9wZXJQYWdlQ2hhbmdlZChzZWxlY3RQZXJQYWdlLnZhbHVlKVwiXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwicGFnZVNpemVzWzBdID49IHBhZ2luYXRvci50b3RhbCAmJiAoIXBhZ2luYXRvci5oYXNQcmV2KCkgJiYgIXBhZ2luYXRvci5oYXNOZXh0KCkpXCI+XG4gICAgICA8b3B0aW9uICpuZ0Zvcj1cImxldCBwYWdlU2l6ZU9wdGlvbiBvZiBwYWdlU2l6ZXNcIiBbdmFsdWVdPVwicGFnZVNpemVPcHRpb25cIiBbc2VsZWN0ZWRdPVwicGFnZVNpemVPcHRpb24gPT0gcGFnaW5hdG9yLnBlclBhZ2VcIj5cbiAgICAgICAge3twYWdlU2l6ZU9wdGlvbn19XG4gICAgICA8L29wdGlvbj5cbiAgICA8L3NlbGVjdD5cbiAgICA8ZGl2ICpuZ0lmPVwicGFnZVNpemVzLmxlbmd0aCA8PSAxXCI+e3twYWdpbmF0b3I/LnBlclBhZ2V9fTwvZGl2PlxuICA8L2Rpdj5cblxuICA8bmdiLXBhZ2luYXRpb24gY2xhc3M9XCJkLWZsZXggYWxpZ24taXRlbXMtY2VudGVyIGp1c3RpZnktY29udGVudC1lbmRcIlxuICAgICAgICAgICAgICAgICAgW2NvbGxlY3Rpb25TaXplXT1cInBhZ2luYXRvci50b3RhbFwiIFtwYWdlXT1cInBhZ2luYXRvci5wYWdlXCIgW3BhZ2VTaXplXT1cInBhZ2luYXRvci5wZXJQYWdlXCJcbiAgICAgICAgICAgICAgICAgIFttYXhTaXplXT1cIjVcIiBbcm90YXRlXT1cInRydWVcIiBbYm91bmRhcnlMaW5rc109XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAgIChwYWdlQ2hhbmdlKT1cIl9wYWdlQ2hhbmdlZCgkZXZlbnQpXCI+PC9uZ2ItcGFnaW5hdGlvbj5cbjwvZGl2PlxuIl19