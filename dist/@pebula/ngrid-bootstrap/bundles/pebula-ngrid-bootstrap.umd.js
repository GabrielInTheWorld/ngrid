(function (global, factory) {
        typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
        typeof define === 'function' && define.amd ? define('@pebula/ngrid-bootstrap', ['exports', '@angular/core', '@angular/common'], factory) :
        (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.pebula = global.pebula || {}, global.pebula['ngrid-bootstrap'] = {}), global.ng.core, global.ng.common));
}(this, (function (exports, i0, common) { 'use strict';

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

        var PblNgridBootstrapModule = /** @class */ (function () {
            function PblNgridBootstrapModule() {
            }
            return PblNgridBootstrapModule;
        }());
        /** @nocollapse */ PblNgridBootstrapModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridBootstrapModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
        /** @nocollapse */ PblNgridBootstrapModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridBootstrapModule, imports: [common.CommonModule] });
        /** @nocollapse */ PblNgridBootstrapModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridBootstrapModule, imports: [[common.CommonModule]] });
        i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridBootstrapModule, decorators: [{
                    type: i0.NgModule,
                    args: [{
                            imports: [common.CommonModule],
                        }]
                }] });

        /**
         * Generated bundle index. Do not edit.
         */

        exports.PblNgridBootstrapModule = PblNgridBootstrapModule;

        Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=pebula-ngrid-bootstrap.umd.js.map
