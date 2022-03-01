(function (global, factory) {
        typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@pebula/ngrid-material/selection-column'), require('@pebula/ngrid-material/paginator'), require('@pebula/ngrid-material/sort'), require('@pebula/ngrid-material/cell-tooltip'), require('@pebula/ngrid-material/context-menu')) :
        typeof define === 'function' && define.amd ? define('@pebula/ngrid-material', ['exports', '@angular/core', '@angular/common', '@pebula/ngrid-material/selection-column', '@pebula/ngrid-material/paginator', '@pebula/ngrid-material/sort', '@pebula/ngrid-material/cell-tooltip', '@pebula/ngrid-material/context-menu'], factory) :
        (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.pebula = global.pebula || {}, global.pebula['ngrid-material'] = {}), global.ng.core, global.ng.common, global.pebula['ngrid-material']['selection-column'], global.pebula['ngrid-material'].paginator, global.pebula['ngrid-material'].sort, global.pebula['ngrid-material']['cell-tooltip'], global.pebula['ngrid-material']['context-menu']));
}(this, (function (exports, i0, common, selectionColumn, paginator, sort, cellTooltip, contextMenu) { 'use strict';

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

        var PblNgridMaterialModule = /** @class */ (function () {
            function PblNgridMaterialModule() {
            }
            return PblNgridMaterialModule;
        }());
        /** @nocollapse */ PblNgridMaterialModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridMaterialModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
        /** @nocollapse */ PblNgridMaterialModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridMaterialModule, imports: [common.CommonModule,
                selectionColumn.PblNgridCheckboxModule,
                paginator.PblNgridPaginatorModule,
                sort.PblNgridMatSortModule,
                cellTooltip.PblNgridCellTooltipModule,
                contextMenu.PblNgridContextMenuModule], exports: [selectionColumn.PblNgridCheckboxModule,
                paginator.PblNgridPaginatorModule,
                sort.PblNgridMatSortModule,
                cellTooltip.PblNgridCellTooltipModule,
                contextMenu.PblNgridContextMenuModule] });
        /** @nocollapse */ PblNgridMaterialModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridMaterialModule, imports: [[
                    common.CommonModule,
                    selectionColumn.PblNgridCheckboxModule,
                    paginator.PblNgridPaginatorModule,
                    sort.PblNgridMatSortModule,
                    cellTooltip.PblNgridCellTooltipModule,
                    contextMenu.PblNgridContextMenuModule,
                ], selectionColumn.PblNgridCheckboxModule,
                paginator.PblNgridPaginatorModule,
                sort.PblNgridMatSortModule,
                cellTooltip.PblNgridCellTooltipModule,
                contextMenu.PblNgridContextMenuModule] });
        i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridMaterialModule, decorators: [{
                    type: i0.NgModule,
                    args: [{
                            imports: [
                                common.CommonModule,
                                selectionColumn.PblNgridCheckboxModule,
                                paginator.PblNgridPaginatorModule,
                                sort.PblNgridMatSortModule,
                                cellTooltip.PblNgridCellTooltipModule,
                                contextMenu.PblNgridContextMenuModule,
                            ],
                            exports: [
                                selectionColumn.PblNgridCheckboxModule,
                                paginator.PblNgridPaginatorModule,
                                sort.PblNgridMatSortModule,
                                cellTooltip.PblNgridCellTooltipModule,
                                contextMenu.PblNgridContextMenuModule,
                            ]
                        }]
                }] });

        /**
         * Generated bundle index. Do not edit.
         */

        exports.PblNgridMaterialModule = PblNgridMaterialModule;

        Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=pebula-ngrid-material.umd.js.map
