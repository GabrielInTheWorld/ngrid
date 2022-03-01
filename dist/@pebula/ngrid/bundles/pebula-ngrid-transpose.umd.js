(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/cdk/coercion'), require('@pebula/ngrid/core'), require('@pebula/ngrid'), require('rxjs'), require('rxjs/operators'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@pebula/ngrid/transpose', ['exports', '@angular/core', '@angular/cdk/coercion', '@pebula/ngrid/core', '@pebula/ngrid', 'rxjs', 'rxjs/operators', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.pebula = global.pebula || {}, global.pebula.ngrid = global.pebula.ngrid || {}, global.pebula.ngrid.transpose = {}), global.ng.core, global.ng.cdk.coercion, global.pebula.ngrid.core, global.pebula.ngrid, global.rxjs, global.rxjs.operators, global.ng.common));
}(this, (function (exports, i0, coercion, i2, i1, rxjs, operators, common) { 'use strict';

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
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);
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

    var LOCAL_COLUMN_DEF = Symbol('LOCAL_COLUMN_DEF');
    var VIRTUAL_REFRESH = {};
    var TransposeTableSession = /** @class */ (function () {
        function TransposeTableSession(grid, pluginCtrl, updateColumns, sourceFactoryWrapper) {
            this.grid = grid;
            this.pluginCtrl = pluginCtrl;
            this.updateColumns = updateColumns;
            this.sourceFactoryWrapper = sourceFactoryWrapper;
            this.init();
            if (grid.columns && grid.columnApi.visibleColumns.length > 0) {
                this.onInvalidateHeaders();
            }
            this.onDataSource(this.grid.ds);
        }
        TransposeTableSession.prototype.destroy = function (updateTable) {
            if (!this.destroyed) {
                this.destroyed = true;
                i2.unrx.kill(this, this.grid);
                this.grid.showHeader = this.headerRow;
                this.grid.columns = this.columnsInput;
                if (updateTable) {
                    this.grid.invalidateColumns();
                    this.grid.ds.refresh(VIRTUAL_REFRESH);
                }
            }
        };
        TransposeTableSession.prototype.init = function () {
            var _this = this;
            this.headerRow = this.grid.showHeader;
            this.grid.showHeader = false;
            this.pluginCtrl.events
                .pipe(i2.ON_INVALIDATE_HEADERS, i2.unrx(this, this.grid))
                .subscribe(function (e) { return _this.onInvalidateHeaders(); });
            this.pluginCtrl.events
                .pipe(i2.unrx(this, this.grid))
                .subscribe(function (e) { return e.kind === 'onDataSource' && _this.onDataSource(e.curr); });
        };
        TransposeTableSession.prototype.onInvalidateHeaders = function () {
            if (!this.grid.columns[LOCAL_COLUMN_DEF]) {
                this.columnsInput = this.grid.columns;
                this.storeColumns = this.grid.columnApi.visibleColumns;
                this.updateColumns();
            }
        };
        TransposeTableSession.prototype.onDataSource = function (ds) {
            var _this = this;
            this.unPatchDataSource();
            if (ds) {
                this.ds = ds;
                this.dsSourceFactory = ds.adapter.sourceFactory;
                this.ds.adapter.sourceFactory = function (event) {
                    var rawSource = event.data.changed && event.data.curr === VIRTUAL_REFRESH
                        ? _this.ds.source
                        : _this.dsSourceFactory(event);
                    if (rawSource === false) {
                        return rawSource;
                    }
                    else if (_this.destroyed) {
                        _this.unPatchDataSource();
                        return _this.rawSource;
                    }
                    var obs = rxjs.isObservable(rawSource)
                        ? rawSource
                        : Array.isArray(rawSource) ? rxjs.of(rawSource) : rxjs.from(rawSource) // promise...
                    ;
                    return obs
                        .pipe(operators.tap(function (source) { return _this.rawSource = source; }), operators.map(_this.sourceFactoryWrapper));
                };
            }
        };
        TransposeTableSession.prototype.unPatchDataSource = function () {
            if (this.ds) {
                this.ds.adapter.sourceFactory = this.dsSourceFactory;
                this.ds = this.dsSourceFactory = undefined;
            }
        };
        return TransposeTableSession;
    }());

    var TRANSFORM_ROW_REF = Symbol('TRANSFORM_ROW_REF');
    function getCellValueAsHeader(row) {
        return row.label;
    }
    function getCellValueTransformed(colAsRow) {
        return i2.getValue(colAsRow, this.data[TRANSFORM_ROW_REF]);
    }
    function createTransformedColumn(row, index) {
        var _a;
        return { prop: "__transform_item_" + index + "__", data: (_a = {}, _a[TRANSFORM_ROW_REF] = row, _a) };
    }

    var DEFAULT_HEADER_COLUMN = { prop: '__transpose__', css: 'pbl-ngrid-header-cell pbl-ngrid-transposed-header-cell' };
    var PLUGIN_KEY = 'transpose';
    /**
     * Transpose plugin.
     *
     * This plugin will swaps around the rows and columns of the grid.
     *
     * A **regular grid** (not transposed) represents rows horizontally:
     *
     * - Each horizontal row represents an item in the collection.
     * - Each vertical column represents the same property of all rows in the collection.
     *
     * A **transposed** grid represents row vertically:
     *
     * - Each horizontal row represents the same property of all rows in the collection.
     * - Each vertical row represents an item in the collection.
     *
     * > Note that transposing a grid might not play nice with other plugins and/or features.
     * For example, using pagination with transpose make no sense.
     */
    var PblNgridTransposePluginDirective = /** @class */ (function () {
        function PblNgridTransposePluginDirective(grid, pluginCtrl, config) {
            var _this = this;
            this.grid = grid;
            this.pluginCtrl = pluginCtrl;
            this._header = DEFAULT_HEADER_COLUMN;
            this._removePlugin = pluginCtrl.setPlugin(PLUGIN_KEY, this);
            var transposePlugin = config.get('transposePlugin');
            if (transposePlugin) {
                this.header = transposePlugin.header;
                this.defaultCol = transposePlugin.defaultCol || {};
                this.matchTemplates = transposePlugin.matchTemplates || false;
            }
            pluginCtrl.onInit()
                .subscribe(function () {
                if (_this.enabled !== undefined) {
                    _this.updateState(undefined, _this.enabled);
                }
            });
        }
        Object.defineProperty(PblNgridTransposePluginDirective.prototype, "transpose", {
            get: function () { return this.enabled; },
            set: function (value) {
                value = coercion.coerceBooleanProperty(value);
                if (value !== this.enabled && this.grid.isInit) {
                    this.updateState(this.enabled, value);
                }
                this.enabled = value;
            },
            enumerable: false,
            configurable: true
        });
        ;
        Object.defineProperty(PblNgridTransposePluginDirective.prototype, "header", {
            /**
             * Column definitions for the new header column, this is the column the first column that
             * will display all the headers.
             *
             * This is an optional value, when not set a default column settings is used:
             *
             * ```js
             * {
             *  prop: '__transpose__',
             *  css: 'pbl-ngrid-header-cell pbl-ngrid-transposed-header-cell',
             * }
             * ```
             *
             * When set, the new column values will merge into the default definitions, overriding existing properties
             * set on the default column settings.
             *
             * > The header column behave like any other column and you can also provide define it in the `column` property on the grid.
             * When using this approach the column defined on the grid is used as is (no merging). Just make sure you use the right `prop` value for it.
             * e.g. if `header` is not set here its `__transpose__` otherwise, the actual `prop` value.
             */
            set: function (value) {
                this._header = Object.assign({}, DEFAULT_HEADER_COLUMN, value || {});
            },
            enumerable: false,
            configurable: true
        });
        PblNgridTransposePluginDirective.prototype.ngOnDestroy = function () {
            this._removePlugin(this.grid);
            this.disable(false);
            i2.unrx.kill(this);
        };
        PblNgridTransposePluginDirective.prototype.disable = function (updateTable) {
            if (this.gridState) {
                var gridState = this.gridState;
                this.columns = this.selfColumn = this.gridState = this.columns = this.selfColumn = undefined;
                gridState.destroy(updateTable);
            }
        };
        PblNgridTransposePluginDirective.prototype.enable = function (refreshDataSource) {
            var _this = this;
            if (refreshDataSource === void 0) { refreshDataSource = false; }
            if (this.gridState) {
                this.disable(false);
            }
            var sourceFactoryWrapper = function (results) {
                var _a, e_1, _b, e_2, _c;
                if (results) {
                    var local = _this.grid.columns = (_a = i1.columnFactory()
                        .default(_this.defaultCol || {}))
                        .table.apply(_a, __spreadArray([_this.selfColumn], __read(results.map(createTransformedColumn)))).build();
                    var prev = _this.gridState.columnsInput;
                    local.header = prev.header;
                    local.headerGroup = prev.headerGroup;
                    local.footer = prev.footer;
                    local[LOCAL_COLUMN_DEF] = true;
                    _this.grid.invalidateColumns();
                    var matchTemplates = coercion.coerceBooleanProperty(_this.matchTemplates);
                    var prop = _this._header.prop;
                    var columnKeysToProxy = ['type'];
                    if (matchTemplates) {
                        columnKeysToProxy.push('cellTpl');
                    }
                    /* The following logic is not for the faint of heart.
                       Basically, the transpose plugin does not swap the actual data but the columns.
                       When transposing, all rows will swap to columns so, A new column definition is created,
                       with columns equal to the total number or items in the datasource.
                       Each column (new one) represents a row so we save a reference to the actual row in the new column.
            
                       The next step is to create a new datasource, the new datasource is simply a collection of all of the original columns.
            
                       Now when `getValue` is called on the new column it is called with a "row" which is the original column.
                       Because the new column has a reference to the actual (original) row we can call the `getValue` on the old column with the actual row.
            
                       In this process, all of the column metadata related to the presentation layer is lost. For example, if CSS classes will
                       not be the same, templates, types etc... This is because when the grid renders a cell that cell has a single template across
                       all rows but now we need a different template for every row.
            
                       We can proxy a (VERY) limited set of metadata properties related to the presentation layer, valid only on render time.
                       This relays on the fact that each row is rendered complete, starting from the first cell to the last so
                       with that we can get a reference to the original column tha that now represents the whole row.
                     */
                    var currentColumn_1;
                    try {
                        for (var _d = __values(_this.grid.columnApi.visibleColumns), _e = _d.next(); !_e.done; _e = _d.next()) {
                            var c = _e.value;
                            if (c.orgProp === prop) {
                                c.getValue = function (row) {
                                    currentColumn_1 = row;
                                    return row.label;
                                };
                            }
                            else {
                                c.getValue = getCellValueTransformed;
                                var _loop_1 = function (key) {
                                    Object.defineProperty(c, key, { configurable: true, get: function () { return currentColumn_1 && currentColumn_1[key]; }, set: function (value) { } });
                                };
                                try {
                                    for (var columnKeysToProxy_1 = (e_2 = void 0, __values(columnKeysToProxy)), columnKeysToProxy_1_1 = columnKeysToProxy_1.next(); !columnKeysToProxy_1_1.done; columnKeysToProxy_1_1 = columnKeysToProxy_1.next()) {
                                        var key = columnKeysToProxy_1_1.value;
                                        _loop_1(key);
                                    }
                                }
                                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                                finally {
                                    try {
                                        if (columnKeysToProxy_1_1 && !columnKeysToProxy_1_1.done && (_c = columnKeysToProxy_1.return)) _c.call(columnKeysToProxy_1);
                                    }
                                    finally { if (e_2) throw e_2.error; }
                                }
                            }
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_e && !_e.done && (_b = _d.return)) _b.call(_d);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    return _this.columns;
                }
                return results;
            };
            this.gridState = new TransposeTableSession(this.grid, this.pluginCtrl, function () { return _this.updateColumns(_this.grid.columnApi.visibleColumns); }, sourceFactoryWrapper);
            if (refreshDataSource) {
                this.pluginCtrl.extApi.contextApi.clear();
                this.grid.ds.refresh();
            }
            else if (this.grid.ds.length > 0) {
                this.grid.ds.refresh(VIRTUAL_REFRESH);
            }
        };
        PblNgridTransposePluginDirective.prototype.updateState = function (prev, curr) {
            var isFirst = prev === undefined;
            if (!curr) {
                this.disable(true);
            }
            else {
                this.enable(!isFirst);
            }
        };
        PblNgridTransposePluginDirective.prototype.updateColumns = function (columns) {
            var e_3, _a;
            var prop = this._header.prop;
            this.columns = [];
            try {
                for (var columns_1 = __values(columns), columns_1_1 = columns_1.next(); !columns_1_1.done; columns_1_1 = columns_1.next()) {
                    var c = columns_1_1.value;
                    if (c.orgProp === prop) {
                        this.selfColumn = c;
                    }
                    else {
                        this.columns.push(c);
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (columns_1_1 && !columns_1_1.done && (_a = columns_1.return)) _a.call(columns_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
            if (!this.selfColumn) {
                // TODO: don't assume columns[0]
                this.selfColumn = new i1.PblColumn(this._header, this.pluginCtrl.extApi.columnStore.groupStore);
            }
        };
        return PblNgridTransposePluginDirective;
    }());
    /** @nocollapse */ PblNgridTransposePluginDirective.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridTransposePluginDirective, deps: [{ token: i1__namespace.PblNgridComponent }, { token: i1__namespace.PblNgridPluginController }, { token: i2__namespace.PblNgridConfigService }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ PblNgridTransposePluginDirective.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridTransposePluginDirective, selector: "pbl-ngrid[transpose]", inputs: { transpose: "transpose", header: ["transposeHeaderCol", "header"], defaultCol: ["transposeDefaultCol", "defaultCol"], matchTemplates: "matchTemplates" }, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridTransposePluginDirective, decorators: [{
                type: i0.Directive,
                args: [{ selector: 'pbl-ngrid[transpose]' }]
            }], ctorParameters: function () { return [{ type: i1__namespace.PblNgridComponent }, { type: i1__namespace.PblNgridPluginController }, { type: i2__namespace.PblNgridConfigService }]; }, propDecorators: { transpose: [{
                    type: i0.Input
                }], header: [{
                    type: i0.Input,
                    args: ['transposeHeaderCol']
                }], defaultCol: [{
                    type: i0.Input,
                    args: ['transposeDefaultCol']
                }], matchTemplates: [{
                    type: i0.Input
                }] } });

    var PblNgridTransposeModule = /** @class */ (function () {
        function PblNgridTransposeModule() {
        }
        return PblNgridTransposeModule;
    }());
    PblNgridTransposeModule.NGRID_PLUGIN = i1.ngridPlugin({ id: PLUGIN_KEY }, PblNgridTransposePluginDirective);
    /** @nocollapse */ PblNgridTransposeModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridTransposeModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    /** @nocollapse */ PblNgridTransposeModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridTransposeModule, declarations: [PblNgridTransposePluginDirective], imports: [common.CommonModule, i1.PblNgridModule], exports: [PblNgridTransposePluginDirective] });
    /** @nocollapse */ PblNgridTransposeModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridTransposeModule, imports: [[common.CommonModule, i1.PblNgridModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridTransposeModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [common.CommonModule, i1.PblNgridModule],
                        declarations: [PblNgridTransposePluginDirective],
                        exports: [PblNgridTransposePluginDirective],
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.PblNgridTransposeModule = PblNgridTransposeModule;
    exports.PblNgridTransposePluginDirective = PblNgridTransposePluginDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=pebula-ngrid-transpose.umd.js.map
