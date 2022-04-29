(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@pebula/ngrid/core'), require('@pebula/ngrid'), require('@angular/common'), require('@angular/cdk/table')) :
    typeof define === 'function' && define.amd ? define('@pebula/ngrid/sticky', ['exports', '@angular/core', '@pebula/ngrid/core', '@pebula/ngrid', '@angular/common', '@angular/cdk/table'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.pebula = global.pebula || {}, global.pebula.ngrid = global.pebula.ngrid || {}, global.pebula.ngrid.sticky = {}), global.ng.core, global.pebula.ngrid.core, global.pebula.ngrid, global.ng.common, global.ng.cdk.table));
}(this, (function (exports, i0, i1$1, i1, common, table) { 'use strict';

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
    var i1__namespace$1 = /*#__PURE__*/_interopNamespace(i1$1);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);

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

    var PLUGIN_KEY = 'sticky';
    function setStickyRow(grid, type, valueOrBulk, state) {
        var e_1, _a;
        var isHeader = type === 'header';
        var queryList = isHeader ? grid._headerRowDefs : grid._footerRowDefs;
        var bulk = Array.isArray(valueOrBulk) ? valueOrBulk : [[valueOrBulk, state]];
        var addOneIfMainExists = (isHeader && grid.showHeader) || (!isHeader && grid.showFooter) ? 1 : 0;
        var changed;
        try {
            for (var bulk_1 = __values(bulk), bulk_1_1 = bulk_1.next(); !bulk_1_1.done; bulk_1_1 = bulk_1.next()) {
                var _b = __read(bulk_1_1.value, 2), value = _b[0], state_1 = _b[1];
                // the index from the user is 0 based or the grid header/footer row.
                // we store them both, so we need to convert... our first is always the grid header/footer and then we have the same order as the user's.
                var idx = value === 'table' ? 0 : value + addOneIfMainExists;
                if (!isHeader) {
                    // sticky-styler stickRows() methods will reverse the order of footer columns
                    // so we actually need to set another row to make the row we want sticky.
                    // we could reverse the collection, but choosing the opposite side is better.
                    // think [0, 1, 2, 3, 4] and we want 1. sticky-styler will reverse to [4, 3, 2, 1, 0] so doing nothing will stick 3.
                    // the opposite is length MINUS 1 MINUS index which is 5 - 1 - 1 which is 3, in the revered array its the row 1 which is what we wanted.
                    idx = (queryList.length - 1) - idx;
                }
                var rowDef = queryList.toArray()[idx];
                if (rowDef && rowDef.sticky !== state_1) {
                    rowDef.sticky = state_1;
                    changed = true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (bulk_1_1 && !bulk_1_1.done && (_a = bulk_1.return)) _a.call(bulk_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (changed) {
            var cdkTable = i1.PblNgridPluginController.find(grid).extApi.cdkTable;
            if (isHeader) {
                cdkTable.updateStickyHeaderRowStyles();
            }
            else {
                cdkTable.updateStickyFooterRowStyles();
            }
        }
    }
    function setStickyColumns(grid, type, valueOrBulk, state) {
        var e_2, _a;
        var bulk = Array.isArray(valueOrBulk) ? valueOrBulk : [[valueOrBulk, state]];
        var changed;
        var _loop_1 = function (columnId, state_2) {
            if (typeof columnId === 'string') {
                columnId = grid.columnApi.visibleColumns.findIndex(function (c) { return c.orgProp === columnId; });
            }
            var c = grid.columnApi.visibleColumns[columnId];
            if (c) {
                changed = true;
                c.pin = state_2 ? type : undefined;
                if (type === 'end') {
                    c.columnDef.stickyEnd = state_2;
                    c.columnDef.sticky = false;
                }
                else {
                    c.columnDef.sticky = state_2;
                    c.columnDef.stickyEnd = false;
                }
            }
        };
        try {
            for (var bulk_2 = __values(bulk), bulk_2_1 = bulk_2.next(); !bulk_2_1.done; bulk_2_1 = bulk_2.next()) {
                var _b = __read(bulk_2_1.value, 2), columnId = _b[0], state_2 = _b[1];
                _loop_1(columnId, state_2);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (bulk_2_1 && !bulk_2_1.done && (_a = bulk_2.return)) _a.call(bulk_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
        if (changed) {
            var cdkTable = i1.PblNgridPluginController.find(grid).extApi.cdkTable;
            cdkTable.updateStickyColumnStyles();
        }
    }
    var PblNgridStickyPluginDirective = /** @class */ (function () {
        function PblNgridStickyPluginDirective(grid, _differs, pluginCtrl) {
            var _this = this;
            this.grid = grid;
            this._differs = _differs;
            this.pluginCtrl = pluginCtrl;
            this._columnCache = { start: [], end: [] };
            this.viewInitialized = false;
            this._removePlugin = pluginCtrl.setPlugin(PLUGIN_KEY, this);
            pluginCtrl.events
                .pipe(i1$1.ON_RESIZE_ROW)
                .subscribe(function () {
                var cdkTable = pluginCtrl.extApi.cdkTable;
                cdkTable.updateStickyHeaderRowStyles();
                cdkTable.updateStickyColumnStyles();
                cdkTable.updateStickyFooterRowStyles();
            });
            pluginCtrl.events
                .pipe(i1$1.ON_INVALIDATE_HEADERS)
                .subscribe(function () {
                if (_this._startDiffer && _this.grid.isInit) {
                    _this._startDiffer.diff([]);
                    _this.applyColumnDiff('start', _this._columnCache.start, _this._startDiffer);
                }
                if (_this._endDiffer && _this.grid.isInit) {
                    _this._endDiffer.diff([]);
                    _this.applyColumnDiff('end', _this._columnCache.end, _this._endDiffer);
                }
            });
        }
        Object.defineProperty(PblNgridStickyPluginDirective.prototype, "stickyColumnStart", {
            /**
             * Set the header rows you want to apply sticky positioning to.
             * Valid values are:
             *   - `grid` - Literal string `grid` that will set the grid's main header row.
             *   - number  - The index of the row, for multi-header row. The index refers to the order you defined the header/headerGroup rows (base 0);
             *
             * For performance considerations only new values will trigger a change (i.e. the array should be treated as immutable).
             * Manipulating the array will not trigger a change (the sticky state will not change) unless sending a copy of it (replacing it, e.g. Array.slice())
             */
            set: function (value) {
                if (!this._startDiffer) {
                    this._startDiffer = this._differs.find([]).create();
                }
                this.applyColumnDiff('start', value, this._startDiffer);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblNgridStickyPluginDirective.prototype, "stickyColumnEnd", {
            /**
             * Set the footer rows you want to apply sticky positioning to.
             * Valid values are:
             *   - `grid` - Literal string `grid` that will set the grid's main footer row.
             *   - number  - The index of the row, for multi-footer row. The index refers to the order you defined the footer rows (base 0);
             *
             * For performance considerations only new values will trigger a change (i.e. the array should be treated as immutable).
             * Manipulating the array will not trigger a change (the sticky state will not change) unless sending a copy of it (replacing it, e.g. Array.slice())
             */
            set: function (value) {
                if (!this._endDiffer) {
                    this._endDiffer = this._differs.find([]).create();
                }
                this.applyColumnDiff('end', value, this._endDiffer);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblNgridStickyPluginDirective.prototype, "stickyHeader", {
            /**
           * Set the header rows you want to apply sticky positioning to.
           * Valid values are:
           *   - `grid` - Literal string `grid` that will set the grid's main header row.
           *   - number  - The index of the row, for multi-header row. The index refers to the order you defined the header/headerGroup rows (base 0);
           *
           * For performance considerations only new values will trigger a change (i.e. the array should be treated as immutable).
           * Manipulating the array will not trigger a change (the sticky state will not change) unless sending a copy of it (replacing it, e.g. Array.slice())
           */
            set: function (value) {
                if (!this._headerDiffer) {
                    this._headerDiffer = this._differs.find([]).create();
                }
                this.applyRowDiff('header', value, this._headerDiffer);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblNgridStickyPluginDirective.prototype, "stickyFooter", {
            /**
             * Set the footer rows you want to apply sticky positioning to.
             * Valid values are:
             *   - `grid` - Literal string `grid` that will set the grid's main footer row.
             *   - number  - The index of the row, for multi-footer row. The index refers to the order you defined the footer rows (base 0);
             *
             * For performance considerations only new values will trigger a change (i.e. the array should be treated as immutable).
             * Manipulating the array will not trigger a change (the sticky state will not change) unless sending a copy of it (replacing it, e.g. Array.slice())
             */
            set: function (value) {
                if (!this._footerDiffer) {
                    this._footerDiffer = this._differs.find([]).create();
                }
                this.applyRowDiff('footer', value, this._footerDiffer);
            },
            enumerable: false,
            configurable: true
        });
        PblNgridStickyPluginDirective.prototype.ngAfterViewInit = function () {
            this.viewInitialized = true;
        };
        PblNgridStickyPluginDirective.prototype.ngOnDestroy = function () {
            this._removePlugin(this.grid);
        };
        PblNgridStickyPluginDirective.prototype.applyColumnDiff = function (type, value, differ) {
            var _this = this;
            if (!this.viewInitialized) {
                requestAnimationFrame(function () { return _this.applyColumnDiff(type, value, differ); });
                return;
            }
            this._columnCache[type] = value || [];
            var changes = differ.diff(value || []);
            var bulk = [];
            changes.forEachOperation(function (record, prevIndex, currentIndex) {
                if (record.previousIndex == null) {
                    bulk.push([record.item, true]);
                }
                else if (currentIndex == null) {
                    bulk.push([record.item, false]);
                }
            });
            if (bulk.length > 0) {
                setStickyColumns(this.grid, type, bulk);
            }
        };
        PblNgridStickyPluginDirective.prototype.applyRowDiff = function (type, value, differ) {
            var _this = this;
            if (!this.grid.isInit) {
                this.pluginCtrl.onInit()
                    .subscribe(function () {
                    _this.applyRowDiff(type, value, differ);
                });
                return;
            }
            var changes = differ.diff(value || []);
            var bulk = [];
            changes.forEachOperation(function (record, prevIndex, currentIndex) {
                if (record.previousIndex == null) {
                    bulk.push([record.item, true]);
                }
                else if (currentIndex == null) {
                    bulk.push([record.item, false]);
                }
            });
            if (bulk.length > 0) {
                setStickyRow(this.grid, type, bulk);
            }
        };
        return PblNgridStickyPluginDirective;
    }());
    /** @nocollapse */ PblNgridStickyPluginDirective.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridStickyPluginDirective, deps: [{ token: i1__namespace.PblNgridComponent }, { token: i0__namespace.IterableDiffers }, { token: i1__namespace.PblNgridPluginController }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ PblNgridStickyPluginDirective.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridStickyPluginDirective, selector: "pbl-ngrid[stickyColumnStart], pbl-ngrid[stickyColumnEnd], pbl-ngrid[stickyHeader], pbl-ngrid[stickyFooter]", inputs: { stickyColumnStart: "stickyColumnStart", stickyColumnEnd: "stickyColumnEnd", stickyHeader: "stickyHeader", stickyFooter: "stickyFooter" }, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridStickyPluginDirective, decorators: [{
                type: i0.Directive,
                args: [{ selector: 'pbl-ngrid[stickyColumnStart], pbl-ngrid[stickyColumnEnd], pbl-ngrid[stickyHeader], pbl-ngrid[stickyFooter]' }]
            }], ctorParameters: function () { return [{ type: i1__namespace.PblNgridComponent }, { type: i0__namespace.IterableDiffers }, { type: i1__namespace.PblNgridPluginController }]; }, propDecorators: { stickyColumnStart: [{
                    type: i0.Input
                }], stickyColumnEnd: [{
                    type: i0.Input
                }], stickyHeader: [{
                    type: i0.Input
                }], stickyFooter: [{
                    type: i0.Input
                }] } });

    var MAPPER = function (v) { return [v, true]; };
    var PblNgridStickyModule = /** @class */ (function () {
        function PblNgridStickyModule(configService) {
            i1.PblNgridPluginController.onCreatedSafe(PblNgridStickyModule, function (grid, controller) {
                if (controller && !controller.hasPlugin('sticky')) {
                    controller.onInit()
                        .subscribe(function () {
                        var stickyPluginConfig = configService.get('stickyPlugin');
                        if (stickyPluginConfig) {
                            if (stickyPluginConfig.headers) {
                                setStickyRow(grid, 'header', stickyPluginConfig.headers.map(MAPPER));
                            }
                            if (stickyPluginConfig.footers) {
                                setStickyRow(grid, 'footer', stickyPluginConfig.footers.map(MAPPER));
                            }
                            if (stickyPluginConfig.columnStart) {
                                setStickyColumns(grid, 'start', stickyPluginConfig.columnStart.map(MAPPER));
                            }
                            if (stickyPluginConfig.columnEnd) {
                                setStickyColumns(grid, 'end', stickyPluginConfig.columnEnd.map(MAPPER));
                            }
                        }
                    });
                }
            });
        }
        return PblNgridStickyModule;
    }());
    PblNgridStickyModule.NGRID_PLUGIN = i1.ngridPlugin({ id: PLUGIN_KEY }, PblNgridStickyPluginDirective);
    /** @nocollapse */ PblNgridStickyModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridStickyModule, deps: [{ token: i1__namespace$1.PblNgridConfigService }], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    /** @nocollapse */ PblNgridStickyModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridStickyModule, declarations: [PblNgridStickyPluginDirective], imports: [common.CommonModule, table.CdkTableModule, i1.PblNgridModule], exports: [PblNgridStickyPluginDirective] });
    /** @nocollapse */ PblNgridStickyModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridStickyModule, imports: [[common.CommonModule, table.CdkTableModule, i1.PblNgridModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridStickyModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [common.CommonModule, table.CdkTableModule, i1.PblNgridModule],
                        declarations: [PblNgridStickyPluginDirective],
                        exports: [PblNgridStickyPluginDirective],
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$1.PblNgridConfigService }]; } });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.PblNgridStickyModule = PblNgridStickyModule;
    exports.PblNgridStickyPluginDirective = PblNgridStickyPluginDirective;
    exports.setStickyColumns = setStickyColumns;
    exports.setStickyRow = setStickyRow;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=pebula-ngrid-sticky.umd.js.map
