import * as i0 from '@angular/core';
import { Component, ChangeDetectionStrategy, ViewEncapsulation, Optional, Input, NgModule } from '@angular/core';
import * as i3 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i2 from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import * as i1 from '@pebula/ngrid';
import { PblNgridModule } from '@pebula/ngrid';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { unrx } from '@pebula/ngrid/core';

const DEFAULT_PAGE_SIZE_OPTIONS = [5, 10, 20, 50, 100];
class PblNgridBsPagination {
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

class PblNgridBsPaginationModule {
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

/**
 * Generated bundle index. Do not edit.
 */

export { PblNgridBsPagination, PblNgridBsPaginationModule };
//# sourceMappingURL=pebula-ngrid-bootstrap-pagination.js.map
