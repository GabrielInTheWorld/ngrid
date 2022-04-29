(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/cdk/coercion'), require('@pebula/ngrid/core'), require('@pebula/ngrid'), require('@angular/material/paginator'), require('@angular/material/form-field'), require('@angular/material/select'), require('@angular/material/core'), require('@angular/material/button'), require('@angular/common'), require('@angular/material/tooltip')) :
    typeof define === 'function' && define.amd ? define('@pebula/ngrid-material/paginator', ['exports', '@angular/core', '@angular/cdk/coercion', '@pebula/ngrid/core', '@pebula/ngrid', '@angular/material/paginator', '@angular/material/form-field', '@angular/material/select', '@angular/material/core', '@angular/material/button', '@angular/common', '@angular/material/tooltip'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.pebula = global.pebula || {}, global.pebula['ngrid-material'] = global.pebula['ngrid-material'] || {}, global.pebula['ngrid-material'].paginator = {}), global.ng.core, global.ng.cdk.coercion, global.pebula.ngrid.core, global.pebula.ngrid, global.ng.material.paginator, global.ng.material.formField, global.ng.material.select, global.ng.material.core, global.ng.material.button, global.ng.common, global.ng.material.tooltip));
}(this, (function (exports, i0, coercion, core, i1, i2, i3, i4, i5, i6, i7, i8) { 'use strict';

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
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);
    var i3__namespace = /*#__PURE__*/_interopNamespace(i3);
    var i4__namespace = /*#__PURE__*/_interopNamespace(i4);
    var i5__namespace = /*#__PURE__*/_interopNamespace(i5);
    var i6__namespace = /*#__PURE__*/_interopNamespace(i6);
    var i7__namespace = /*#__PURE__*/_interopNamespace(i7);
    var i8__namespace = /*#__PURE__*/_interopNamespace(i8);

    var DEFAULT_PAGE_SIZE_OPTIONS = [5, 10, 20, 50, 100];
    var PblPaginatorComponent = /** @class */ (function () {
        function PblPaginatorComponent(grid, _intl, cdr) {
            var _this = this;
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
                .pipe(core.unrx(this))
                .subscribe(function () { return _this.cdr.markForCheck(); });
        }
        Object.defineProperty(PblPaginatorComponent.prototype, "pageSizeOptions", {
            get: function () { return this._pageSizeOptions; },
            set: function (value) {
                this._pageSizeOptions = value;
                this.pageSizes = (value || DEFAULT_PAGE_SIZE_OPTIONS).slice();
                this.updatePageSizes();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblPaginatorComponent.prototype, "paginator", {
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
        Object.defineProperty(PblPaginatorComponent.prototype, "table", {
            /**
             * @deprecated Will be removed in v5, Use `grid` instead
             */
            get: function () {
                if (typeof ngDevMode === 'undefined' || ngDevMode) {
                    core.deprecatedWarning('PblPaginatorComponent.table', '4', 'PblPaginatorComponent.grid');
                }
                return this.grid;
            },
            /**
             * @deprecated Will be removed in v5, Use `grid` instead
             */
            set: function (value) {
                if (typeof ngDevMode === 'undefined' || ngDevMode) {
                    console.warn("\"PblPaginatorComponent.table\" is deprecated and will be removed in version 5, use \"grid\" instead.");
                }
                this.grid = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblPaginatorComponent.prototype, "hidePageSize", {
            get: function () { return this._hidePageSize; },
            set: function (value) { this._hidePageSize = coercion.coerceBooleanProperty(value); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblPaginatorComponent.prototype, "hideRangeSelect", {
            get: function () { return this._hideRangeSelect; },
            set: function (value) { this._hideRangeSelect = coercion.coerceBooleanProperty(value); },
            enumerable: false,
            configurable: true
        });
        PblPaginatorComponent.prototype.ngOnDestroy = function () {
            core.unrx.kill(this);
        };
        PblPaginatorComponent.prototype.updatePageSizes = function () {
            if (this.paginator && this.pageSizes.indexOf(this.paginator.perPage) === -1) {
                this.pageSizes.push(this.paginator.perPage);
            }
            this.pageSizes.sort(function (a, b) { return a - b; });
        };
        PblPaginatorComponent.prototype.handlePageChange = function (event) {
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
        return PblPaginatorComponent;
    }());
    /** @nocollapse */ PblPaginatorComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblPaginatorComponent, deps: [{ token: i1__namespace.PblNgridComponent, optional: true }, { token: i2__namespace.MatPaginatorIntl }, { token: i0__namespace.ChangeDetectorRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    /** @nocollapse */ PblPaginatorComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.0", type: PblPaginatorComponent, selector: "pbl-ngrid-paginator", inputs: { pageSizeOptions: "pageSizeOptions", paginator: "paginator", table: "table", grid: "grid", hidePageSize: "hidePageSize", hideRangeSelect: "hideRangeSelect" }, host: { classAttribute: "mat-paginator" }, ngImport: i0__namespace, template: "<div class=\"mat-paginator-outer-container\">\n  <div class=\"mat-paginator-container\">\n    <div *ngIf=\"!hidePageSize\" class=\"mat-paginator-page-size\">\n      <div class=\"mat-paginator-page-size-label\">\n        {{_intl.itemsPerPageLabel}}\n      </div>\n\n      <mat-form-field *ngIf=\"pageSizes.length > 1\"\n                      class=\"mat-paginator-page-size-select\">\n        <mat-select\n          [value]=\"paginator.perPage\"\n          [aria-label]=\"_intl.itemsPerPageLabel\"\n          [disabled]=\"pageSizes[0] >= paginator.total && (!paginator.hasPrev() && !paginator.hasNext())\"\n          (selectionChange)=\"paginator.perPage = $event.value\">\n          <mat-option *ngFor=\"let pageSizeOption of pageSizes\" [value]=\"pageSizeOption\">\n            {{pageSizeOption}}\n          </mat-option>\n        </mat-select>\n      </mat-form-field>\n      <div *ngIf=\"pageSizes.length <= 1\">{{paginator?.perPage}}</div>\n    </div>\n\n    <div class=\"mat-paginator-range-actions\">\n      <div *ngIf=\"paginator.kind ==='pageNumber'\" class=\"mat-paginator-range-label\">\n        {{_intl.getRangeLabel(paginator.page - 1, paginator.perPage, paginator.total)}}\n      </div>\n\n      <button mat-icon-button type=\"button\"\n              class=\"mat-paginator-navigation-previous\"\n              (click)=\"paginator.prevPage()\"\n              [attr.aria-label]=\"_intl.previousPageLabel\"\n              [matTooltip]=\"_intl.previousPageLabel\"\n              [matTooltipPosition]=\"'above'\"\n              [disabled]=\"!paginator.hasPrev()\">\n        <svg class=\"mat-paginator-icon\" viewBox=\"0 0 24 24\" focusable=\"false\">\n          <path d=\"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z\"/>\n        </svg>\n      </button>\n\n      <mat-form-field *ngIf=\"!hideRangeSelect && paginator.kind ==='pageNumber' && pageSizes.length >= 1\"\n                      class=\"mat-paginator-page-size-select\">\n        <mat-select\n          [value]=\"paginator.page\"\n          [disabled]=\"paginator.totalPages === 1\"\n          (selectionChange)=\"paginator.page = $event.value\">\n          <mat-option *ngFor=\"let p of pages\" [value]=\"p\">{{p}}</mat-option>\n        </mat-select>\n      </mat-form-field>\n\n      <button mat-icon-button type=\"button\"\n              class=\"mat-paginator-navigation-next\"\n              (click)=\"paginator.nextPage()\"\n              [attr.aria-label]=\"_intl.nextPageLabel\"\n              [matTooltip]=\"_intl.nextPageLabel\"\n              [matTooltipPosition]=\"'above'\"\n              [disabled]=\"!paginator.hasNext()\">\n        <svg class=\"mat-paginator-icon\" viewBox=\"0 0 24 24\" focusable=\"false\">\n          <path d=\"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z\"/>\n        </svg>\n      </button>\n    </div>\n  </div>\n</div>\n", styles: [".mat-paginator-range-label{flex-grow:1}.mat-paginator-container{box-sizing:border-box}"], components: [{ type: i3__namespace.MatFormField, selector: "mat-form-field", inputs: ["color", "floatLabel", "appearance", "hideRequiredMarker", "hintLabel"], exportAs: ["matFormField"] }, { type: i4__namespace.MatSelect, selector: "mat-select", inputs: ["disabled", "disableRipple", "tabIndex"], exportAs: ["matSelect"] }, { type: i5__namespace.MatOption, selector: "mat-option", exportAs: ["matOption"] }, { type: i6__namespace.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }], directives: [{ type: i7__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i7__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i8__namespace.MatTooltip, selector: "[matTooltip]", exportAs: ["matTooltip"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblPaginatorComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'pbl-ngrid-paginator',
                        templateUrl: './table-paginator.component.html',
                        styleUrls: ['./table-paginator.component.scss'],
                        host: {
                            'class': 'mat-paginator',
                        },
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None
                    }]
            }], ctorParameters: function () {
            return [{ type: i1__namespace.PblNgridComponent, decorators: [{
                            type: i0.Optional
                        }] }, { type: i2__namespace.MatPaginatorIntl }, { type: i0__namespace.ChangeDetectorRef }];
        }, propDecorators: { pageSizeOptions: [{
                    type: i0.Input
                }], paginator: [{
                    type: i0.Input
                }], table: [{
                    type: i0.Input
                }], grid: [{
                    type: i0.Input
                }], hidePageSize: [{
                    type: i0.Input
                }], hideRangeSelect: [{
                    type: i0.Input
                }] } });

    // TODO: Remove MatPaginatorModule and the initial code in the constructor
    // set the styles in the SCSS.
    var PblNgridPaginatorModule = /** @class */ (function () {
        function PblNgridPaginatorModule(cf, injector) {
            // this is a workaround to ensure CSS from mat slider is loaded, otherwise it is omitted.
            cf.resolveComponentFactory(i2.MatPaginator).create(injector);
        }
        return PblNgridPaginatorModule;
    }());
    /** @nocollapse */ PblNgridPaginatorModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridPaginatorModule, deps: [{ token: i0__namespace.ComponentFactoryResolver }, { token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    /** @nocollapse */ PblNgridPaginatorModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridPaginatorModule, declarations: [PblPaginatorComponent], imports: [i7.CommonModule, i2.MatPaginatorModule, i4.MatSelectModule, i8.MatTooltipModule, i6.MatButtonModule, i1.PblNgridModule], exports: [PblPaginatorComponent] });
    /** @nocollapse */ PblNgridPaginatorModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridPaginatorModule, imports: [[i7.CommonModule, i2.MatPaginatorModule, i4.MatSelectModule, i8.MatTooltipModule, i6.MatButtonModule, i1.PblNgridModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridPaginatorModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i7.CommonModule, i2.MatPaginatorModule, i4.MatSelectModule, i8.MatTooltipModule, i6.MatButtonModule, i1.PblNgridModule],
                        declarations: [PblPaginatorComponent],
                        exports: [PblPaginatorComponent],
                        // TODO(REFACTOR_REF 2): remove when ViewEngine is no longer supported by angular (V12 ???)
                        entryComponents: [PblPaginatorComponent, i2.MatPaginator]
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ComponentFactoryResolver }, { type: i0__namespace.Injector }]; } });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.PblNgridPaginatorModule = PblNgridPaginatorModule;
    exports.PblPaginatorComponent = PblPaginatorComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=pebula-ngrid-material-paginator.umd.js.map
