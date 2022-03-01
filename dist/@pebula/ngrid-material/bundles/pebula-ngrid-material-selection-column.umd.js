(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@pebula/ngrid/core'), require('@pebula/ngrid'), require('@angular/material/checkbox'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@pebula/ngrid-material/selection-column', ['exports', '@angular/core', '@pebula/ngrid/core', '@pebula/ngrid', '@angular/material/checkbox', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.pebula = global.pebula || {}, global.pebula['ngrid-material'] = global.pebula['ngrid-material'] || {}, global.pebula['ngrid-material']['selection-column'] = {}), global.ng.core, global.pebula.ngrid.core, global.pebula.ngrid, global.ng.material.checkbox, global.ng.common));
}(this, (function (exports, i0, core, i1, i2, i3) { 'use strict';

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

    var ALWAYS_FALSE_FN = function () { return false; };
    var PblNgridCheckboxComponent = /** @class */ (function () {
        function PblNgridCheckboxComponent(table, cdr) {
            var _this = this;
            this.table = table;
            this.cdr = cdr;
            this.allSelected = false;
            this._isCheckboxDisabled = ALWAYS_FALSE_FN;
            var pluginCtrl = i1.PblNgridPluginController.find(table);
            pluginCtrl.events
                .pipe(core.unrx(this))
                .subscribe(function (e) {
                if (e.kind === 'onDataSource') {
                    _this.selection = e.curr.selection;
                }
            });
        }
        Object.defineProperty(PblNgridCheckboxComponent.prototype, "bulkSelectMode", {
            /**
             * Defines the behavior when clicking on the bulk select checkbox (header).
             * There are 2 options:
             *
             * - all: Will select all items in the current collection
             * - view: Will select only the rendered items in the view
             *
             * The default value is `all`
             */
            get: function () { return this._bulkSelectMode; },
            set: function (value) {
                if (value !== this._bulkSelectMode) {
                    this._bulkSelectMode = value;
                    this.setupSelection();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblNgridCheckboxComponent.prototype, "selection", {
            /**
             * A Custom selection model, optional.
             * If not set, the selection model from the DataSource is used.
             */
            get: function () {
                return this._selection;
            },
            set: function (value) {
                if (value !== this._selection) {
                    this._selection = value;
                    this.setupSelection();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblNgridCheckboxComponent.prototype, "isCheckboxDisabled", {
            get: function () { return this._isCheckboxDisabled; },
            set: function (value) {
                if (value !== this._isCheckboxDisabled) {
                    this._isCheckboxDisabled = value;
                    if (!this._isCheckboxDisabled || typeof this._isCheckboxDisabled !== 'function') {
                        this._isCheckboxDisabled = ALWAYS_FALSE_FN;
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblNgridCheckboxComponent.prototype, "color", {
            get: function () { return this._color; },
            set: function (value) {
                if (value !== this._color) {
                    this._color = value;
                    if (this.table.isInit) {
                        this.markAndDetect();
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        PblNgridCheckboxComponent.prototype.ngAfterViewInit = function () {
            if (!this.selection && this.table.ds) {
                this.selection = this.table.ds.selection;
            }
            var registry = this.table.registry;
            registry.addMulti('headerCell', this.headerDef);
            registry.addMulti('tableCell', this.cellDef);
            registry.addMulti('footerCell', this.footerDef);
        };
        PblNgridCheckboxComponent.prototype.ngOnDestroy = function () {
            core.unrx.kill(this);
        };
        PblNgridCheckboxComponent.prototype.masterToggle = function () {
            var _a;
            var _this = this;
            if (this.allSelected) {
                this.selection.clear();
            }
            else {
                var selected = this.getCollection().filter(function (data) { return !_this._isCheckboxDisabled(data); });
                (_a = this.selection).select.apply(_a, __spreadArray([], __read(selected)));
            }
        };
        PblNgridCheckboxComponent.prototype.rowItemChange = function (row) {
            this.selection.toggle(row);
            this.markAndDetect();
        };
        PblNgridCheckboxComponent.prototype.getCollection = function () {
            var ds = this.table.ds;
            return this.bulkSelectMode === 'view' ? ds.renderedData : ds.source;
        };
        PblNgridCheckboxComponent.prototype.setupSelection = function () {
            var _this = this;
            core.unrx.kill(this, this.table);
            if (this._selection) {
                this.length = this.selection.selected.length;
                this.selection.changed
                    .pipe(core.unrx(this, this.table))
                    .subscribe(function () { return _this.handleSelectionChanged(); });
                var changeSource = this.bulkSelectMode === 'view' ? this.table.ds.onRenderedDataChanged : this.table.ds.onSourceChanged;
                changeSource
                    .pipe(core.unrx(this, this.table))
                    .subscribe(function () { return _this.handleSelectionChanged(); });
            }
            else {
                this.length = 0;
            }
        };
        PblNgridCheckboxComponent.prototype.handleSelectionChanged = function () {
            var _this = this;
            var length = this.getCollection().filter(function (data) { return !_this._isCheckboxDisabled(data); }).length;
            this.allSelected = !this.selection.isEmpty() && this.selection.selected.length === length;
            this.length = this.selection.selected.length;
            this.markAndDetect();
        };
        PblNgridCheckboxComponent.prototype.markAndDetect = function () {
            this.cdr.markForCheck();
            this.cdr.detectChanges();
        };
        return PblNgridCheckboxComponent;
    }());
    /** @nocollapse */ PblNgridCheckboxComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridCheckboxComponent, deps: [{ token: i1__namespace.PblNgridComponent }, { token: i0__namespace.ChangeDetectorRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    /** @nocollapse */ PblNgridCheckboxComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridCheckboxComponent, selector: "pbl-ngrid-checkbox", inputs: { name: "name", bulkSelectMode: "bulkSelectMode", selection: "selection", isCheckboxDisabled: "isCheckboxDisabled", color: "color" }, viewQueries: [{ propertyName: "headerDef", first: true, predicate: i1.PblNgridHeaderCellDefDirective, descendants: true, static: true }, { propertyName: "cellDef", first: true, predicate: i1.PblNgridCellDefDirective, descendants: true, static: true }, { propertyName: "footerDef", first: true, predicate: i1.PblNgridFooterCellDefDirective, descendants: true, static: true }], ngImport: i0__namespace, template: "<ng-container *pblNgridHeaderCellDef=\"name; col as col;\">\n  <mat-checkbox *ngIf=\"bulkSelectMode !== 'none'\"\n                style=\"overflow: initial\"\n                [color]=\"color\"\n                (click)=\"$event.stopPropagation()\"\n                (change)=\"$event ? masterToggle() : null\"\n                [checked]=\"allSelected\"\n                [indeterminate]=\"length > 0 && !allSelected\">\n  </mat-checkbox>\n</ng-container>\n<mat-checkbox *pblNgridCellDef=\"name; row as row;\"\n              style=\"overflow: initial\"\n              class=\"pbl-ngrid-selection-checkbox\"\n              [color]=\"color\"\n              [disabled]=isCheckboxDisabled(row)\n              (click)=\"$event.stopPropagation()\"\n              (change)=\"rowItemChange(row)\"\n              [checked]=\"selection.isSelected(row)\">\n</mat-checkbox>\n<span *pblNgridFooterCellDef=\"name; col as col;\">{{ length ? length : '' }}</span>\n", styles: [".mat-cell.pbl-ngrid-checkbox,.mat-header-cell.pbl-ngrid-checkbox{box-sizing:content-box;flex:0 0 24px;overflow:visible}.pbl-ngrid-selection-checkbox .mat-checkbox-background{transition:none}"], components: [{ type: i2__namespace.MatCheckbox, selector: "mat-checkbox", inputs: ["disableRipple", "color", "tabIndex", "aria-label", "aria-labelledby", "id", "labelPosition", "name", "required", "checked", "disabled", "indeterminate", "aria-describedby", "value"], outputs: ["change", "indeterminateChange"], exportAs: ["matCheckbox"] }], directives: [{ type: i1__namespace.PblNgridHeaderCellDefDirective, selector: "[pblNgridHeaderCellDef], [pblNgridHeaderCellTypeDef]", inputs: ["pblNgridHeaderCellDef", "pblNgridHeaderCellTypeDef"] }, { type: i3__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1__namespace.PblNgridCellDefDirective, selector: "[pblNgridCellDef], [pblNgridCellTypeDef]", inputs: ["pblNgridCellDef", "pblNgridCellTypeDef"] }, { type: i1__namespace.PblNgridFooterCellDefDirective, selector: "[pblNgridFooterCellDef], [pblNgridFooterCellTypeDef]", inputs: ["pblNgridFooterCellDef", "pblNgridFooterCellTypeDef"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridCheckboxComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'pbl-ngrid-checkbox',
                        templateUrl: './table-checkbox.component.html',
                        styleUrls: ['./table-checkbox.component.scss'],
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.PblNgridComponent }, { type: i0__namespace.ChangeDetectorRef }]; }, propDecorators: { name: [{
                    type: i0.Input
                }], bulkSelectMode: [{
                    type: i0.Input
                }], selection: [{
                    type: i0.Input
                }], isCheckboxDisabled: [{
                    type: i0.Input
                }], color: [{
                    type: i0.Input
                }], headerDef: [{
                    type: i0.ViewChild,
                    args: [i1.PblNgridHeaderCellDefDirective, { static: true }]
                }], cellDef: [{
                    type: i0.ViewChild,
                    args: [i1.PblNgridCellDefDirective, { static: true }]
                }], footerDef: [{
                    type: i0.ViewChild,
                    args: [i1.PblNgridFooterCellDefDirective, { static: true }]
                }] } });

    var PLUGIN_KEY = 'matCheckboxSelection';
    var PblNgridMatCheckboxSelectionDirective = /** @class */ (function () {
        function PblNgridMatCheckboxSelectionDirective(table, cfr, injector, pluginCtrl) {
            this.table = table;
            this.cfr = cfr;
            this.injector = injector;
            this._color = 'primary';
            this._removePlugin = pluginCtrl.setPlugin(PLUGIN_KEY, this);
        }
        Object.defineProperty(PblNgridMatCheckboxSelectionDirective.prototype, "isCheckboxDisabled", {
            get: function () { return this._isCheckboxDisabled; },
            set: function (value) {
                if (value !== this._isCheckboxDisabled) {
                    this._isCheckboxDisabled = value;
                    if (this.cmpRef && value) {
                        this.cmpRef.instance.isCheckboxDisabled = value;
                        this.cmpRef.changeDetectorRef.detectChanges();
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblNgridMatCheckboxSelectionDirective.prototype, "matCheckboxSelection", {
            /**
             * Add's a selection column using material's `mat-checkbox` in the column specified.
             */
            get: function () { return this._name; },
            set: function (value) {
                if (value !== this._name) {
                    this._name = value;
                    if (!value) {
                        if (this.cmpRef) {
                            this.cmpRef.destroy();
                            this.cmpRef = undefined;
                        }
                    }
                    else {
                        if (!this.cmpRef) {
                            this.cmpRef = this.cfr.resolveComponentFactory(PblNgridCheckboxComponent).create(this.injector);
                            this.cmpRef.instance.table = this.table;
                            if (this._bulkSelectMode) {
                                this.cmpRef.instance.bulkSelectMode = this._bulkSelectMode;
                            }
                            this.cmpRef.instance.color = this._color;
                        }
                        if (this.isCheckboxDisabled) {
                            this.cmpRef.instance.isCheckboxDisabled = this.isCheckboxDisabled;
                        }
                        this.cmpRef.instance.name = value;
                        this.cmpRef.changeDetectorRef.detectChanges();
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblNgridMatCheckboxSelectionDirective.prototype, "bulkSelectMode", {
            /**
             * Defines the behavior when clicking on the bulk select checkbox (header).
             * There are 2 options:
             *
             * - all: Will select all items in the current collection
             * - view: Will select only the rendered items in the view
             *
             * The default value is `all`
             */
            get: function () { return this._bulkSelectMode; },
            set: function (value) {
                if (value !== this._bulkSelectMode) {
                    this._bulkSelectMode = value;
                    if (this.cmpRef) {
                        this.cmpRef.instance.bulkSelectMode = value;
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblNgridMatCheckboxSelectionDirective.prototype, "matCheckboxSelectionColor", {
            get: function () { return this._color; },
            set: function (value) {
                if (value !== this._color) {
                    this._color = value;
                    if (this.cmpRef) {
                        this.cmpRef.instance.color = value;
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        PblNgridMatCheckboxSelectionDirective.prototype.ngOnDestroy = function () {
            if (this.cmpRef) {
                this.cmpRef.destroy();
            }
            this._removePlugin(this.table);
        };
        return PblNgridMatCheckboxSelectionDirective;
    }());
    /** @nocollapse */ PblNgridMatCheckboxSelectionDirective.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridMatCheckboxSelectionDirective, deps: [{ token: i1__namespace.PblNgridComponent }, { token: i0__namespace.ComponentFactoryResolver }, { token: i0__namespace.Injector }, { token: i1__namespace.PblNgridPluginController }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ PblNgridMatCheckboxSelectionDirective.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridMatCheckboxSelectionDirective, selector: "pbl-ngrid[matCheckboxSelection]", inputs: { isCheckboxDisabled: "isCheckboxDisabled", matCheckboxSelection: "matCheckboxSelection", bulkSelectMode: "bulkSelectMode", matCheckboxSelectionColor: "matCheckboxSelectionColor" }, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridMatCheckboxSelectionDirective, decorators: [{
                type: i0.Directive,
                args: [{ selector: 'pbl-ngrid[matCheckboxSelection]' }]
            }], ctorParameters: function () { return [{ type: i1__namespace.PblNgridComponent }, { type: i0__namespace.ComponentFactoryResolver }, { type: i0__namespace.Injector }, { type: i1__namespace.PblNgridPluginController }]; }, propDecorators: { isCheckboxDisabled: [{
                    type: i0.Input
                }], matCheckboxSelection: [{
                    type: i0.Input
                }], bulkSelectMode: [{
                    type: i0.Input
                }], matCheckboxSelectionColor: [{
                    type: i0.Input
                }] } });

    var PblNgridCheckboxModule = /** @class */ (function () {
        function PblNgridCheckboxModule() {
        }
        return PblNgridCheckboxModule;
    }());
    PblNgridCheckboxModule.NGRID_PLUGIN = i1.ngridPlugin({ id: PLUGIN_KEY }, PblNgridMatCheckboxSelectionDirective);
    /** @nocollapse */ PblNgridCheckboxModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridCheckboxModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    /** @nocollapse */ PblNgridCheckboxModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridCheckboxModule, declarations: [PblNgridMatCheckboxSelectionDirective, PblNgridCheckboxComponent], imports: [i3.CommonModule, i2.MatCheckboxModule, i1.PblNgridModule], exports: [PblNgridMatCheckboxSelectionDirective, PblNgridCheckboxComponent] });
    /** @nocollapse */ PblNgridCheckboxModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridCheckboxModule, imports: [[i3.CommonModule, i2.MatCheckboxModule, i1.PblNgridModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridCheckboxModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i3.CommonModule, i2.MatCheckboxModule, i1.PblNgridModule],
                        declarations: [PblNgridMatCheckboxSelectionDirective, PblNgridCheckboxComponent],
                        exports: [PblNgridMatCheckboxSelectionDirective, PblNgridCheckboxComponent],
                        // TODO(REFACTOR_REF 2): remove when ViewEngine is no longer supported by angular (V12 ???)
                        entryComponents: [PblNgridCheckboxComponent]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.PblNgridCheckboxComponent = PblNgridCheckboxComponent;
    exports.PblNgridCheckboxModule = PblNgridCheckboxModule;
    exports.PblNgridMatCheckboxSelectionDirective = PblNgridMatCheckboxSelectionDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=pebula-ngrid-material-selection-column.umd.js.map
