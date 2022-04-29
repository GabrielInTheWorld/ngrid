(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@ng-bootstrap/ng-bootstrap'), require('@pebula/ngrid'), require('@angular/cdk/coercion'), require('@pebula/ngrid/core')) :
    typeof define === 'function' && define.amd ? define('@pebula/ngrid-bootstrap/pagination', ['exports', '@angular/core', '@angular/common', '@ng-bootstrap/ng-bootstrap', '@pebula/ngrid', '@angular/cdk/coercion', '@pebula/ngrid/core'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.pebula = global.pebula || {}, global.pebula['ngrid-bootstrap'] = global.pebula['ngrid-bootstrap'] || {}, global.pebula['ngrid-bootstrap'].pagination = {}), global.ng.core, global.ng.common, global.ngb, global.pebula.ngrid, global.ng.cdk.coercion, global.pebula.ngrid.core));
}(this, (function (exports, i0, i3, i2, i1, coercion, core) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                }
            });
        }
        n['default'] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var i3__namespace = /*#__PURE__*/_interopNamespace(i3);
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);

    var DEFAULT_PAGE_SIZE_OPTIONS = [5, 10, 20, 50, 100];
    var PblNgridBsPagination = /** @class */ (function () {
        function PblNgridBsPagination(grid, cdr) {
            this.cdr = cdr;
            this.pages = [];
            this.pageSizes = DEFAULT_PAGE_SIZE_OPTIONS.slice();
            this._hidePageSize = false;
            this._hideRangeSelect = false;
            if (grid) {
                this.grid = grid;
            }
        }
        Object.defineProperty(PblNgridBsPagination.prototype, "pageSizeOptions", {
            get: function () { return this._pageSizeOptions; },
            set: function (value) {
                this._pageSizeOptions = value;
                this.pageSizes = (value || DEFAULT_PAGE_SIZE_OPTIONS).slice();
                this.updatePageSizes();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblNgridBsPagination.prototype, "paginator", {
            get: function () { return this._paginator; },
            set: function (value) {
                var _this = this;
                if (this._paginator === value) {
                    return;
                }
                if (this._paginator) {
                    core.unrx.kill(this, this._paginator);
                }
                this._paginator = value;
                if (value) {
                    // pagination.onChange is BehaviorSubject so handlePageChange will trigger
                    value.onChange
                        .pipe(core.unrx(this, value))
                        .subscribe(function (event) { return _this.handlePageChange(event); });
                    this.updatePageSizes();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblNgridBsPagination.prototype, "hidePageSize", {
            get: function () { return this._hidePageSize; },
            set: function (value) { this._hidePageSize = coercion.coerceBooleanProperty(value); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblNgridBsPagination.prototype, "hideRangeSelect", {
            get: function () { return this._hideRangeSelect; },
            set: function (value) { this._hideRangeSelect = coercion.coerceBooleanProperty(value); },
            enumerable: false,
            configurable: true
        });
        PblNgridBsPagination.prototype.ngOnDestroy = function () {
            core.unrx.kill(this);
        };
        PblNgridBsPagination.prototype._pageChanged = function (page) {
            this.paginator.page = page;
        };
        PblNgridBsPagination.prototype._perPageChanged = function (value) {
            var perPage = parseInt(value, 10);
            this.paginator.perPage = perPage;
        };
        PblNgridBsPagination.prototype.updatePageSizes = function () {
            if (this.paginator && this.pageSizes.indexOf(this.paginator.perPage) === -1) {
                this.pageSizes.push(this.paginator.perPage);
            }
            this.pageSizes.sort(function (a, b) { return a - b; });
        };
        PblNgridBsPagination.prototype.handlePageChange = function (event) {
            if (this.pages.length !== this.paginator.totalPages) {
                var pages = this.pages = [];
                for (var i = 1, len = this.paginator.totalPages + 1; i < len; i++) {
                    pages.push(i);
                }
            }
            // this is required here to prevent `ExpressionChangedAfterItHasBeenCheckedError` when the component has or wrapped
            // by an ngIf
            this.cdr.detectChanges();
            this.cdr.markForCheck();
        };
        return PblNgridBsPagination;
    }());
    /** @nocollapse */ PblNgridBsPagination.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridBsPagination, deps: [{ token: i1__namespace.PblNgridComponent, optional: true }, { token: i0__namespace.ChangeDetectorRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    /** @nocollapse */ PblNgridBsPagination.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridBsPagination, selector: "pbl-ngrid-bs-pagination", inputs: { pageSizeOptions: "pageSizeOptions", paginator: "paginator", grid: "grid", hidePageSize: "hidePageSize", hideRangeSelect: "hideRangeSelect" }, ngImport: i0__namespace, template: "<div class=\"d-flex align-items-center justify-content-end p-2\">\n\n  <div *ngIf=\"!hidePageSize\" class=\"mr-4\">\n    <label class=\"mr-2\" for=\"selectPerPage\">Item's per page</label>\n    <select *ngIf=\"pageSizes.length > 1\" #selectPerPage id=\"selectPerPage\"\n            class=\"custom-select\" style=\"width: auto\"\n            [value]=\"paginator.perPage\"\n            (change)=\"_perPageChanged(selectPerPage.value)\"\n            [disabled]=\"pageSizes[0] >= paginator.total && (!paginator.hasPrev() && !paginator.hasNext())\">\n      <option *ngFor=\"let pageSizeOption of pageSizes\" [value]=\"pageSizeOption\" [selected]=\"pageSizeOption == paginator.perPage\">\n        {{pageSizeOption}}\n      </option>\n    </select>\n    <div *ngIf=\"pageSizes.length <= 1\">{{paginator?.perPage}}</div>\n  </div>\n\n  <ngb-pagination class=\"d-flex align-items-center justify-content-end\"\n                  [collectionSize]=\"paginator.total\" [page]=\"paginator.page\" [pageSize]=\"paginator.perPage\"\n                  [maxSize]=\"5\" [rotate]=\"true\" [boundaryLinks]=\"true\"\n                  (pageChange)=\"_pageChanged($event)\"></ngb-pagination>\n</div>\n", styles: [".custom-select{transition:background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;display:inline-block;width:100%;height:calc(1.5em + .75rem + 2px);padding:.375rem 1.75rem .375rem .75rem;font-size:1rem;font-weight:400;line-height:1.5;color:#495057;vertical-align:middle;background:#fff url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5' viewBox='0 0 4 5'%3e%3cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e\") no-repeat right .75rem center/8px 10px;border:1px solid #ced4da;border-radius:.25rem;-webkit-appearance:none;-moz-appearance:none;appearance:none}"], components: [{ type: i2__namespace.NgbPagination, selector: "ngb-pagination", inputs: ["page", "disabled", "boundaryLinks", "directionLinks", "ellipses", "maxSize", "pageSize", "rotate", "size", "collectionSize"], outputs: ["pageChange"] }], directives: [{ type: i3__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridBsPagination, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'pbl-ngrid-bs-pagination',
                        templateUrl: './bs-pagination.component.html',
                        styleUrls: ['./bs-pagination.component.scss'],
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None
                    }]
            }], ctorParameters: function () {
            return [{ type: i1__namespace.PblNgridComponent, decorators: [{
                            type: i0.Optional
                        }] }, { type: i0__namespace.ChangeDetectorRef }];
        }, propDecorators: { pageSizeOptions: [{
                    type: i0.Input
                }], paginator: [{
                    type: i0.Input
                }], grid: [{
                    type: i0.Input
                }], hidePageSize: [{
                    type: i0.Input
                }], hideRangeSelect: [{
                    type: i0.Input
                }] } });

    var PblNgridBsPaginationModule = /** @class */ (function () {
        function PblNgridBsPaginationModule() {
        }
        return PblNgridBsPaginationModule;
    }());
    /** @nocollapse */ PblNgridBsPaginationModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridBsPaginationModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    /** @nocollapse */ PblNgridBsPaginationModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridBsPaginationModule, declarations: [PblNgridBsPagination], imports: [i3.CommonModule, i2.NgbPaginationModule, i1.PblNgridModule], exports: [i2.NgbPaginationModule, PblNgridBsPagination] });
    /** @nocollapse */ PblNgridBsPaginationModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridBsPaginationModule, imports: [[i3.CommonModule, i2.NgbPaginationModule, i1.PblNgridModule], i2.NgbPaginationModule] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridBsPaginationModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i3.CommonModule, i2.NgbPaginationModule, i1.PblNgridModule],
                        declarations: [PblNgridBsPagination],
                        exports: [i2.NgbPaginationModule, PblNgridBsPagination],
                        // TODO(REFACTOR_REF 2): remove when ViewEngine is no longer supported by angular (V12 ???)
                        entryComponents: [PblNgridBsPagination]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.PblNgridBsPagination = PblNgridBsPagination;
    exports.PblNgridBsPaginationModule = PblNgridBsPaginationModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=pebula-ngrid-bootstrap-pagination.umd.js.map
