(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@pebula/ngrid/overlay-panel'), require('@pebula/ngrid'), require('@angular/common'), require('@angular/material/icon'), require('@angular/material/button'), require('@angular/material/menu'), require('@angular/material/form-field'), require('@angular/material/input'), require('@pebula/ngrid/core')) :
    typeof define === 'function' && define.amd ? define('@pebula/ngrid-material/context-menu', ['exports', '@angular/core', '@pebula/ngrid/overlay-panel', '@pebula/ngrid', '@angular/common', '@angular/material/icon', '@angular/material/button', '@angular/material/menu', '@angular/material/form-field', '@angular/material/input', '@pebula/ngrid/core'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.pebula = global.pebula || {}, global.pebula['ngrid-material'] = global.pebula['ngrid-material'] || {}, global.pebula['ngrid-material']['context-menu'] = {}), global.ng.core, global.pebula.ngrid['overlay-panel'], global.pebula.ngrid, global.ng.common, global.ng.material.icon, global.ng.material.button, global.ng.material.menu, global.ng.material.formField, global.ng.material.input, global.pebula.ngrid.core));
}(this, (function (exports, i0, i1, i2, i6, i2$1, i5, i2$2, i4, i7, i2$3) { 'use strict';

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
    var i6__namespace = /*#__PURE__*/_interopNamespace(i6);
    var i2__namespace$1 = /*#__PURE__*/_interopNamespace(i2$1);
    var i5__namespace = /*#__PURE__*/_interopNamespace(i5);
    var i2__namespace$2 = /*#__PURE__*/_interopNamespace(i2$2);
    var i4__namespace = /*#__PURE__*/_interopNamespace(i4);
    var i7__namespace = /*#__PURE__*/_interopNamespace(i7);
    var i2__namespace$3 = /*#__PURE__*/_interopNamespace(i2$3);

    var PLUGIN_KEY = 'matHeaderContextMenu';
    var PblNgridMatHeaderContextMenuPlugin = /** @class */ (function () {
        function PblNgridMatHeaderContextMenuPlugin(overlayPanelFactory, pluginCtrl) {
            this.pluginCtrl = pluginCtrl;
            this.overlayPanel = overlayPanelFactory.create(pluginCtrl.extApi.grid);
        }
        return PblNgridMatHeaderContextMenuPlugin;
    }());
    /** @nocollapse */ PblNgridMatHeaderContextMenuPlugin.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridMatHeaderContextMenuPlugin, deps: [{ token: i1__namespace.PblNgridOverlayPanelFactory }, { token: i2__namespace.PblNgridPluginController }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ PblNgridMatHeaderContextMenuPlugin.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridMatHeaderContextMenuPlugin, selector: "pbl-ngrid[matHeaderContextMenu]", inputs: { style: ["matHeaderContextMenu", "style"], config: "config" }, providers: [i1.PblNgridOverlayPanelFactory], ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridMatHeaderContextMenuPlugin, decorators: [{
                type: i0.Directive,
                args: [{ selector: 'pbl-ngrid[matHeaderContextMenu]', providers: [i1.PblNgridOverlayPanelFactory] }]
            }], ctorParameters: function () { return [{ type: i1__namespace.PblNgridOverlayPanelFactory }, { type: i2__namespace.PblNgridPluginController }]; }, propDecorators: { style: [{
                    type: i0.Input,
                    args: ['matHeaderContextMenu']
                }], config: [{
                    type: i0.Input
                }] } });

    var DEFAULT_CONFIG = { hasBackdrop: true, xPos: 'after', yPos: 'below' };
    var MatHeaderContextMenuTrigger = /** @class */ (function () {
        function MatHeaderContextMenuTrigger(plugin, elRef) {
            this.plugin = plugin;
            this.elRef = elRef;
        }
        MatHeaderContextMenuTrigger.prototype.openOverlayPanel = function () {
            var config = this.plugin.config || DEFAULT_CONFIG;
            this.plugin.overlayPanel.open(this.plugin.style, this.elRef, config, this.context);
        };
        return MatHeaderContextMenuTrigger;
    }());
    /** @nocollapse */ MatHeaderContextMenuTrigger.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: MatHeaderContextMenuTrigger, deps: [{ token: PblNgridMatHeaderContextMenuPlugin }, { token: i0__namespace.ElementRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    /** @nocollapse */ MatHeaderContextMenuTrigger.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.0", type: MatHeaderContextMenuTrigger, selector: "div[mat-header-context-menu-trigger]", host: { listeners: { "click": "openOverlayPanel()" }, classAttribute: "mat-header-context-menu-trigger" }, ngImport: i0__namespace, template: "<mat-icon style=\"height: 16px; width: 16px; font-size: 16px; line-height: 16px;\">more_vert</mat-icon>\n", styles: ["div.mat-header-context-menu-trigger{position:absolute;display:flex;align-items:center;right:0;height:100%;cursor:pointer;margin-right:12px;z-index:#100}[dir=rtl] div.mat-header-context-menu-trigger{right:unset;left:0;margin-right:unset;margin-left:12px}"], components: [{ type: i2__namespace$1.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }], encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: MatHeaderContextMenuTrigger, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'div[mat-header-context-menu-trigger]',
                        host: {
                            class: 'mat-header-context-menu-trigger',
                            '(click)': 'openOverlayPanel()',
                        },
                        templateUrl: "./header-context-menu-trigger.html",
                        styleUrls: ["./header-context-menu-trigger.scss"],
                        encapsulation: i0.ViewEncapsulation.None,
                    }]
            }], ctorParameters: function () { return [{ type: PblNgridMatHeaderContextMenuPlugin }, { type: i0__namespace.ElementRef }]; } });

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
            to[j] = from[i];
        return to;
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    var MatHeaderContextMenuExtension = /** @class */ (function (_super) {
        __extends(MatHeaderContextMenuExtension, _super);
        function MatHeaderContextMenuExtension(cfr) {
            var _this = _super.call(this) || this;
            _this.cfr = cfr;
            _this.name = 'matHeaderContextMenuTrigger';
            _this.kind = 'dataHeaderExtensions';
            _this.projectContent = false;
            return _this;
        }
        MatHeaderContextMenuExtension.prototype.shouldRender = function (context) {
            return !!context.injector.get(PblNgridMatHeaderContextMenuPlugin, false);
        };
        MatHeaderContextMenuExtension.prototype.getFactory = function (context) {
            return this.cfr.resolveComponentFactory(MatHeaderContextMenuTrigger);
        };
        MatHeaderContextMenuExtension.prototype.onCreated = function (context, cmpRef) {
            cmpRef.instance.context = context;
            cmpRef.changeDetectorRef.markForCheck();
        };
        return MatHeaderContextMenuExtension;
    }(i2.PblNgridMultiComponentRegistry));

    var MatExcelStyleHeaderMenu = /** @class */ (function () {
        function MatExcelStyleHeaderMenu(ref) {
            this.ref = ref;
            this.currentFilter = '';
            this.column = ref.data.col;
            this.grid = ref.data.grid;
            if (this.grid.ds.sort.column === this.column) {
                this.currentSort = this.grid.ds.sort.sort.order;
            }
            this.currentPin = this.column.columnDef.sticky ? 'start' : this.column.columnDef.stickyEnd ? 'end' : undefined;
            var dsFilter = this.grid.ds.filter;
            if (dsFilter && dsFilter.type === 'value' && dsFilter.columns && dsFilter.columns.indexOf(this.column) >= 0) {
                this.currentFilter = dsFilter.filter;
            }
        }
        MatExcelStyleHeaderMenu.prototype.ngAfterViewInit = function () {
            var _this = this;
            this.matMenu.closed.subscribe(function (reason) {
                _this.ref.close();
            });
            var view = this.menuViewLocation.createEmbeddedView(this.matMenu.templateRef);
            this.matMenu.setElevation(0);
            this.matMenu.focusFirstItem('program');
            this.matMenu._resetAnimation();
            view.markForCheck();
            view.detectChanges();
            this.matMenu._startAnimation();
        };
        MatExcelStyleHeaderMenu.prototype.hide = function () {
            this.grid.columnApi.hideColumns(this.column.id);
        };
        MatExcelStyleHeaderMenu.prototype.onSortToggle = function (sort) {
            if (this.currentSort === sort) {
                this.grid.ds.setSort();
            }
            else {
                this.grid.ds.setSort(this.column, { order: sort });
            }
        };
        MatExcelStyleHeaderMenu.prototype.onPinToggle = function (pin) {
            if (this.currentPin === pin) {
                this.column.columnDef.updatePin();
            }
            else {
                this.column.columnDef.updatePin(pin);
            }
        };
        MatExcelStyleHeaderMenu.prototype.filterColumn = function (filterValue) {
            this.currentFilter = filterValue;
            if (!filterValue) {
                this.grid.setFilter();
            }
            else {
                this.grid.setFilter(filterValue.trim(), [this.column]);
            }
        };
        MatExcelStyleHeaderMenu.prototype.clickTrap = function (event) {
            event.preventDefault();
            event.stopPropagation();
        };
        return MatExcelStyleHeaderMenu;
    }());
    /** @nocollapse */ MatExcelStyleHeaderMenu.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: MatExcelStyleHeaderMenu, deps: [{ token: i1__namespace.PblNgridOverlayPanelRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    /** @nocollapse */ MatExcelStyleHeaderMenu.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.0", type: MatExcelStyleHeaderMenu, selector: "mat-excel-style-header-menu", viewQueries: [{ propertyName: "matMenu", first: true, predicate: ["columnMenu"], descendants: true, read: i2$2.MatMenu, static: true }, { propertyName: "menuViewLocation", first: true, predicate: ["menuViewLocation"], descendants: true, read: i0.ViewContainerRef, static: true }], ngImport: i0__namespace, template: "<mat-menu #columnMenu=\"matMenu\" class=\"pbl-mat-menu-panel\">\n\n  <button *ngIf=\"column.sort\" mat-menu-item [matMenuTriggerFor]=\"sortMenu\">\n    <mat-icon>sort</mat-icon>Sort\n  </button>\n  <button mat-menu-item [matMenuTriggerFor]=\"pinMenu\">\n    <mat-icon>place</mat-icon>Pin\n  </button>\n  <button mat-menu-item (click)=\"grid.columnApi.autoSizeColumn(column)\">\n    <mat-icon>keyboard_tab</mat-icon>Auto Fit\n  </button>\n  <button mat-menu-item (click)=\"hide()\">\n    <mat-icon>visibility_off</mat-icon>Hide Column\n  </button>\n\n  <mat-menu #sortMenu=\"matMenu\">\n    <button mat-menu-item (click)=\"onSortToggle('asc')\" [class.menu-item-selected]=\"currentSort === 'asc'\">\n      <mat-icon [color]=\"currentSort === 'asc' ? 'primary' : ''\">arrow_upward</mat-icon>\n      <span>Ascending</span>\n    </button>\n    <button mat-menu-item (click)=\"onSortToggle('desc')\" [class.menu-item-selected]=\"currentSort === 'desc'\">\n      <mat-icon [color]=\"currentSort === 'desc' ? 'primary' : ''\">arrow_downward</mat-icon>\n      <span>Descending</span>\n    </button>\n  </mat-menu>\n\n  <mat-menu #pinMenu=\"matMenu\">\n    <button mat-menu-item (click)=\"onPinToggle('start')\" [class.menu-item-selected]=\"currentPin === 'start'\">\n      <span>Start</span>\n    </button>\n    <button mat-menu-item (click)=\"onPinToggle('end')\" [class.menu-item-selected]=\"currentPin === 'end'\">\n      <span>End</span>\n    </button>\n  </mat-menu>\n\n  <div class=\"mat-menu-item pbl-mat-menu-row\" (click)=\"clickTrap($event)\">\n    <mat-form-field>\n      <mat-label>Search</mat-label>\n      <input #input matInput (keyup)=\"filterColumn(input.value)\" [value]=\"currentFilter\">\n      <mat-icon matPrefix>search</mat-icon>\n      <button mat-button [style.visibility]=\"currentFilter ? 'visible' : 'hidden'\" matSuffix mat-icon-button aria-label=\"Clear\"\n              (click)=\"filterColumn('')\">\n        <mat-icon>close</mat-icon>\n      </button>\n    </mat-form-field>\n  </div>\n</mat-menu>\n<ng-container #menuViewLocation></ng-container>\n", styles: [".mat-menu-panel.pbl-mat-menu-panel{max-width:400px}.mat-menu-item.pbl-mat-menu-row{width:100%;box-sizing:border-box;line-height:inherit;height:auto;margin:6px 0;cursor:inherit}.mat-menu-item.pbl-mat-menu-row:hover{background:inherit}"], components: [{ type: i2__namespace$2.MatMenu, selector: "mat-menu", exportAs: ["matMenu"] }, { type: i2__namespace$2.MatMenuItem, selector: "[mat-menu-item]", inputs: ["disabled", "disableRipple", "role"], exportAs: ["matMenuItem"] }, { type: i2__namespace$1.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { type: i4__namespace.MatFormField, selector: "mat-form-field", inputs: ["color", "floatLabel", "appearance", "hideRequiredMarker", "hintLabel"], exportAs: ["matFormField"] }, { type: i5__namespace.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }], directives: [{ type: i6__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2__namespace$2.MatMenuTrigger, selector: "[mat-menu-trigger-for], [matMenuTriggerFor]", inputs: ["matMenuTriggerRestoreFocus", "mat-menu-trigger-for", "matMenuTriggerFor", "matMenuTriggerData"], outputs: ["menuOpened", "onMenuOpen", "menuClosed", "onMenuClose"], exportAs: ["matMenuTrigger"] }, { type: i4__namespace.MatLabel, selector: "mat-label" }, { type: i7__namespace.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["id", "disabled", "required", "type", "value", "readonly", "placeholder", "errorStateMatcher", "aria-describedby"], exportAs: ["matInput"] }, { type: i4__namespace.MatPrefix, selector: "[matPrefix]" }, { type: i4__namespace.MatSuffix, selector: "[matSuffix]" }], encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: MatExcelStyleHeaderMenu, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'mat-excel-style-header-menu',
                        templateUrl: "./excel-style-header-menu.html",
                        styleUrls: ["./excel-style-header-menu.scss"],
                        encapsulation: i0.ViewEncapsulation.None,
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.PblNgridOverlayPanelRef }]; }, propDecorators: { matMenu: [{
                    type: i0.ViewChild,
                    args: ['columnMenu', { read: i2$2.MatMenu, static: true }]
                }], menuViewLocation: [{
                    type: i0.ViewChild,
                    args: ['menuViewLocation', { read: i0.ViewContainerRef, static: true }]
                }] } });

    var PblNgridContextMenuModule = /** @class */ (function () {
        function PblNgridContextMenuModule(parentModule, registry, cfr, configService) {
            if (parentModule) {
                return;
            }
            registry.addMulti('dataHeaderExtensions', new MatHeaderContextMenuExtension(cfr));
            registry.addMulti('overlayPanels', new i1.PblNgridOverlayPanelComponentExtension('excelMenu', MatExcelStyleHeaderMenu, cfr));
        }
        return PblNgridContextMenuModule;
    }());
    PblNgridContextMenuModule.NGRID_PLUGIN = i2.ngridPlugin({ id: PLUGIN_KEY }, PblNgridMatHeaderContextMenuPlugin);
    /** @nocollapse */ PblNgridContextMenuModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridContextMenuModule, deps: [{ token: PblNgridContextMenuModule, optional: true, skipSelf: true }, { token: i2__namespace.PblNgridRegistryService }, { token: i0__namespace.ComponentFactoryResolver }, { token: i2__namespace$3.PblNgridConfigService }], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    /** @nocollapse */ PblNgridContextMenuModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridContextMenuModule, declarations: [MatHeaderContextMenuTrigger,
            PblNgridMatHeaderContextMenuPlugin,
            MatExcelStyleHeaderMenu], imports: [i6.CommonModule,
            i2$1.MatIconModule,
            i5.MatButtonModule,
            i2$2.MatMenuModule,
            i4.MatFormFieldModule,
            i7.MatInputModule,
            i2.PblNgridModule,
            i1.PblNgridOverlayPanelModule], exports: [PblNgridMatHeaderContextMenuPlugin] });
    /** @nocollapse */ PblNgridContextMenuModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridContextMenuModule, imports: [[
                i6.CommonModule,
                i2$1.MatIconModule,
                i5.MatButtonModule,
                i2$2.MatMenuModule,
                i4.MatFormFieldModule,
                i7.MatInputModule,
                i2.PblNgridModule,
                i1.PblNgridOverlayPanelModule,
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridContextMenuModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            i6.CommonModule,
                            i2$1.MatIconModule,
                            i5.MatButtonModule,
                            i2$2.MatMenuModule,
                            i4.MatFormFieldModule,
                            i7.MatInputModule,
                            i2.PblNgridModule,
                            i1.PblNgridOverlayPanelModule,
                        ],
                        declarations: [
                            MatHeaderContextMenuTrigger,
                            PblNgridMatHeaderContextMenuPlugin,
                            MatExcelStyleHeaderMenu,
                        ],
                        exports: [
                            PblNgridMatHeaderContextMenuPlugin,
                        ],
                        entryComponents: [
                            // TODO(REFACTOR_REF 2): remove when ViewEngine is no longer supported by angular (V12 ???)
                            MatHeaderContextMenuTrigger,
                            MatExcelStyleHeaderMenu,
                        ],
                    }]
            }], ctorParameters: function () {
            return [{ type: PblNgridContextMenuModule, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.SkipSelf
                        }] }, { type: i2__namespace.PblNgridRegistryService }, { type: i0__namespace.ComponentFactoryResolver }, { type: i2__namespace$3.PblNgridConfigService }];
        } });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.PblNgridContextMenuModule = PblNgridContextMenuModule;
    exports.PblNgridMatHeaderContextMenuPlugin = PblNgridMatHeaderContextMenuPlugin;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=pebula-ngrid-material-context-menu.umd.js.map
