(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs'), require('@angular/core'), require('@pebula/ngrid/core'), require('rxjs/operators'), require('@angular/common'), require('@angular/cdk/table'), require('@angular/cdk/collections'), require('@angular/cdk/bidi'), require('@angular/cdk/platform'), require('@angular/cdk/scrolling'), require('@angular/cdk/coercion'), require('@angular/cdk-experimental/scrolling')) :
    typeof define === 'function' && define.amd ? define('@pebula/ngrid', ['exports', 'rxjs', '@angular/core', '@pebula/ngrid/core', 'rxjs/operators', '@angular/common', '@angular/cdk/table', '@angular/cdk/collections', '@angular/cdk/bidi', '@angular/cdk/platform', '@angular/cdk/scrolling', '@angular/cdk/coercion', '@angular/cdk-experimental/scrolling'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.pebula = global.pebula || {}, global.pebula.ngrid = {}), global.rxjs, global.ng.core, global.pebula.ngrid.core, global.rxjs.operators, global.ng.common, global.ng.cdk.table, global.ng.cdk.collections, global.ng.cdk.bidi, global.ng.cdk.platform, global.ng.cdk.scrolling, global.ng.cdk.coercion, global.ng.cdkExperimental.scrolling));
}(this, (function (exports, rxjs, i0, i1, operators, i1$1, i4, collections, i1$2, i2, i3, coercion, scrolling) { 'use strict';

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
    var i1__namespace$2 = /*#__PURE__*/_interopNamespace(i1);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1$1);
    var i4__namespace = /*#__PURE__*/_interopNamespace(i4);
    var i1__namespace$1 = /*#__PURE__*/_interopNamespace(i1$2);
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);
    var i3__namespace = /*#__PURE__*/_interopNamespace(i3);

    function bindGridToDataSource(extApi) {
        extApi.events.subscribe(function (event) {
            if (event.kind === 'onDataSource') {
                var curr = event.curr, prev = event.prev;
                if (prev && prev.hostGrid === extApi.grid) {
                    prev.hostGrid = undefined;
                }
                if (curr) {
                    curr.hostGrid = extApi.grid;
                }
            }
            else if (event.kind === 'onDestroy') {
                var ds = extApi.grid.ds;
                if (ds.hostGrid === extApi.grid) {
                    ds.hostGrid = undefined;
                }
            }
        });
    }

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

    var EXT_API_TOKEN = new i0.InjectionToken('PBL_NGRID_EXTERNAL_API');

    function metaRowSectionFactory() {
        return { fixed: [], row: [], sticky: [], all: [] };
    }
    var PblNgridMetaRowService = /** @class */ (function () {
        function PblNgridMetaRowService(extApi) {
            var _this = this;
            this.extApi = extApi;
            this.header = metaRowSectionFactory();
            this.footer = metaRowSectionFactory();
            this.sync$ = new rxjs.Subject();
            this.hzScroll$ = new rxjs.Subject();
            this.sync = this.sync$ // TODO: complete
                .pipe(operators.debounceTime(0, rxjs.asapScheduler));
            this.hzScroll = this.hzScroll$.asObservable();
            extApi.onInit(function () {
                var grid = extApi.grid;
                var hzOffset = grid.viewport.measureScrollOffset('start');
                var trackScroll = true;
                grid.viewport.elementScrolled()
                    .pipe(operators.filter(function () { return trackScroll; }), operators.auditTime(0, rxjs.animationFrameScheduler))
                    .subscribe({
                    next: function () {
                        var newOffset = grid.viewport.measureScrollOffset('start');
                        if (hzOffset !== newOffset) {
                            _this.hzScroll$.next(hzOffset = newOffset);
                        }
                        else if (grid.viewport.isScrolling) {
                            trackScroll = false;
                            grid.viewport.scrolling
                                .pipe(operators.take(1))
                                .subscribe(function () { return trackScroll = true; });
                        }
                    },
                    complete: function () { return _this.hzScroll$.complete(); },
                });
            });
        }
        PblNgridMetaRowService.prototype.addMetaRow = function (metaRow) {
            var columnStore = this.extApi.columnStore;
            var header = columnStore.metaHeaderRows;
            var footer = columnStore.metaFooterRows;
            var rowDef = metaRow.meta;
            if (rowDef === columnStore.headerColumnDef) {
                if (metaRow.gridWidthRow === true) {
                    // This is a dummy row used to measure width and get width resize notifications
                    this.gridWidthRow = { rowDef: rowDef, el: metaRow.element };
                }
                else {
                    // This is the main header column row, it doesn't have an index but we will assign as if it's the last
                    // so other features will be able to sort by physical location
                    this.addToSection(this.header, metaRow, columnStore.metaHeaderRows.length);
                }
            }
            else if (rowDef === columnStore.footerColumnDef) {
                // This is the main footer column row
                this.addToSection(this.footer, metaRow, 0);
            }
            else {
                // All meta rows
                var index = header.findIndex(function (h) { return h.rowDef === rowDef; });
                if (index > -1) {
                    this.addToSection(this.header, metaRow, index);
                }
                else {
                    index = footer.findIndex(function (h) { return h.rowDef === rowDef; });
                    if (index > -1) {
                        this.addToSection(this.footer, metaRow, index);
                    }
                    else {
                        if (typeof ngDevMode === 'undefined' || ngDevMode) {
                            throw new Error('Invalid operation');
                        }
                    }
                }
            }
            this.sync$.next();
        };
        PblNgridMetaRowService.prototype.removeMetaRow = function (metaRow) {
            var rowDef = metaRow.meta;
            var index = this.header.all.indexOf(metaRow.meta);
            if (index > -1) {
                this.header.all.splice(index, 1);
                index = this.header[rowDef.type].findIndex(function (h) { return h.rowDef === rowDef; });
                this.header[rowDef.type].splice(index, 1);
                this.sync$.next();
            }
            else if ((index = this.footer.all.indexOf(metaRow.meta)) > -1) {
                this.footer.all.splice(index, 1);
                index = this.footer[rowDef.type].findIndex(function (h) { return h.rowDef === rowDef; });
                this.footer[rowDef.type].splice(index, 1);
                this.sync$.next();
            }
        };
        PblNgridMetaRowService.prototype.addToSection = function (section, metaRow, index) {
            var rowDef = metaRow.meta;
            section[rowDef.type].push({ index: index, rowDef: rowDef, el: metaRow.element });
            section.all.push(rowDef);
        };
        return PblNgridMetaRowService;
    }());
    /** @nocollapse */ PblNgridMetaRowService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridMetaRowService, deps: [{ token: EXT_API_TOKEN }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    /** @nocollapse */ PblNgridMetaRowService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridMetaRowService });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridMetaRowService, decorators: [{
                type: i0.Injectable
            }], ctorParameters: function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [EXT_API_TOKEN]
                        }] }];
        } });

    var PblNgridMetaRowContainerComponent = /** @class */ (function () {
        function PblNgridMetaRowContainerComponent(metaRows, elRef) {
            var _this = this;
            this.metaRows = metaRows;
            this._width$ = new rxjs.Subject();
            this._totalColumnWidth = 0;
            this._hzScrollDir = 1;
            this.element = elRef.nativeElement;
            metaRows.sync.pipe(i1.unrx(this)).subscribe(function () { return _this.syncRowDefinitions(); });
            this.metaRows.extApi.events
                .pipe(i1.ON_RESIZE_ROW, i1.unrx(this))
                .subscribe(function (event) { return _this.updateWidths(); });
            this.metaRows.extApi.grid.columnApi.totalColumnWidthChange
                .pipe(i1.unrx(this))
                .subscribe(function (width) {
                _this._totalColumnWidth = width;
                _this.updateWidths();
            });
            this._hzScrollDir = this.metaRows.extApi.getDirection() === 'rtl' ? -1 : 1;
            this.metaRows.extApi.directionChange()
                .pipe(i1.unrx(this))
                .subscribe(function (dir) { return _this._hzScrollDir = dir === 'rtl' ? -1 : 1; });
        }
        PblNgridMetaRowContainerComponent.prototype.ngOnChanges = function (changes) {
            var _this = this;
            if ('type' in changes) {
                var scrollContainerElement_1 = this.element;
                scrollContainerElement_1.scrollLeft = this.metaRows.extApi.grid.viewport.measureScrollOffset('start') * this._hzScrollDir;
                if (changes.type.isFirstChange) {
                    this.metaRows.hzScroll
                        .pipe(i1.unrx(this))
                        .subscribe(function (offset) { return scrollContainerElement_1.scrollLeft = offset * _this._hzScrollDir; });
                    this.metaRows.extApi.cdkTable.onRenderRows
                        .pipe(i1.unrx(this))
                        .subscribe(function () { _this.updateWidths(); });
                }
            }
        };
        PblNgridMetaRowContainerComponent.prototype.ngOnDestroy = function () {
            this._width$.complete();
            i1.unrx.kill(this);
        };
        PblNgridMetaRowContainerComponent.prototype.updateWidths = function () {
            this._innerWidth = this.metaRows.extApi.grid.viewport.innerWidth;
            this._minWidth = this.metaRows.extApi.cdkTable.minWidth;
            this._width = Math.max(this._innerWidth, this._minWidth);
            this._width$.next(Math.max(this._innerWidth, this._totalColumnWidth));
        };
        PblNgridMetaRowContainerComponent.prototype.syncRowDefinitions = function () {
            var e_1, _a;
            var isHeader = this.type === 'header';
            var section = isHeader ? this.metaRows.header : this.metaRows.footer;
            var widthContainer = this.element.firstElementChild;
            var container = widthContainer.nextElementSibling;
            if (isHeader) {
                widthContainer.appendChild(this.metaRows.gridWidthRow.el);
            }
            try {
                for (var _b = __values(section.fixed), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var def = _c.value;
                    container.appendChild(def.el);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        return PblNgridMetaRowContainerComponent;
    }());
    /** @nocollapse */ PblNgridMetaRowContainerComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridMetaRowContainerComponent, deps: [{ token: PblNgridMetaRowService }, { token: i0__namespace.ElementRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    /** @nocollapse */ PblNgridMetaRowContainerComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridMetaRowContainerComponent, selector: "div[pbl-ngrid-fixed-meta-row-container]", inputs: { type: ["pbl-ngrid-fixed-meta-row-container", "type"] }, host: { properties: { "style.width.px": "_innerWidth" }, styleAttribute: "flex: 0 0 auto; overflow: hidden;" }, usesOnChanges: true, ngImport: i0__namespace, template: "<div class=\"pbl-cdk-table\" style=\"height: 0px; overflow: hidden;\" [style.width.px]=\"_width\"></div><div class=\"pbl-cdk-table\" [style.width.px]=\"_width$ | async\"></div>", isInline: true, pipes: { "async": i1__namespace.AsyncPipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridMetaRowContainerComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'div[pbl-ngrid-fixed-meta-row-container]',
                        template: "<div class=\"pbl-cdk-table\" style=\"height: 0px; overflow: hidden;\" [style.width.px]=\"_width\"></div><div class=\"pbl-cdk-table\" [style.width.px]=\"_width$ | async\"></div>",
                        host: {
                            style: 'flex: 0 0 auto; overflow: hidden;',
                            '[style.width.px]': '_innerWidth',
                        },
                    }]
            }], ctorParameters: function () { return [{ type: PblNgridMetaRowService }, { type: i0__namespace.ElementRef }]; }, propDecorators: { type: [{
                    type: i0.Input,
                    args: ['pbl-ngrid-fixed-meta-row-container']
                }] } });

    var COLUMN_NAME_CSS_PREFIX = 'pbl-ngrid-column';
    /**
     * Returns a css class unique to the column
     */
    function uniqueColumnCss(columnDef) {
        return COLUMN_NAME_CSS_PREFIX + "-" + columnDef.cssClassFriendlyName;
    }
    /**
     * Returns a css class unique to the type of the column (columns might share types)
     */
    function uniqueColumnTypeCss(type) {
        return COLUMN_NAME_CSS_PREFIX + "-type-" + type.name;
    }

    var RE_PARSE_STYLE_LENGTH_UNIT = /((?:\d*\.)?\d+)(%|px)$/;
    function parseStyleWidth(exp) {
        var match = RE_PARSE_STYLE_LENGTH_UNIT.exec(exp);
        if (match) {
            return { value: Number(match[1]), type: match[2] };
        }
    }
    function initDefinitions(def, target) {
        var copyKeys = ['id', 'label', 'css', 'minWidth', 'width', 'maxWidth', 'type'];
        copyKeys.forEach(function (k) { return k in def && (target[k] = def[k]); });
        if (def.data) {
            target.data = Object.assign(target.data || {}, def.data);
        }
    }

    var PBL_NGRID_META_COLUMN_MARK = Symbol('PblMetaColumn');
    var CLONE_PROPERTIES$2 = ['kind', 'rowIndex'];
    function isPblMetaColumn(def) {
        return def instanceof PblMetaColumn || (def && def[PBL_NGRID_META_COLUMN_MARK] === true);
    }
    var PblMetaColumn = /** @class */ (function () {
        function PblMetaColumn(def) {
            var e_1, _a;
            /**
             * A place to store things...
             * This must be an object, values are shadow-copied so persist data between multiple plugins.
             */
            this.data = {};
            this.defaultWidth = '';
            this[PBL_NGRID_META_COLUMN_MARK] = true;
            initDefinitions(def, this);
            try {
                for (var CLONE_PROPERTIES_1 = __values(CLONE_PROPERTIES$2), CLONE_PROPERTIES_1_1 = CLONE_PROPERTIES_1.next(); !CLONE_PROPERTIES_1_1.done; CLONE_PROPERTIES_1_1 = CLONE_PROPERTIES_1.next()) {
                    var prop = CLONE_PROPERTIES_1_1.value;
                    if (prop in def) {
                        this[prop] = def[prop];
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (CLONE_PROPERTIES_1_1 && !CLONE_PROPERTIES_1_1.done && (_a = CLONE_PROPERTIES_1.return)) _a.call(CLONE_PROPERTIES_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            if (!isPblMetaColumn(def)) {
                if (typeof def.type === 'string') {
                    this.type = { name: def.type };
                }
            }
        }
        Object.defineProperty(PblMetaColumn.prototype, "width", {
            /**
             * The width in px or % in the following format: ##% or ##px
             * Examples: '50%', '50px'
             */
            get: function () { return this._width; },
            set: function (value) {
                if (value !== this._width) {
                    this._parsedWidth = parseStyleWidth(this._width = value);
                    // Error in dev, on prod just let it be unset
                    if (typeof ngDevMode === 'undefined' || ngDevMode) {
                        if (!this._parsedWidth && value) {
                            throw new Error("Invalid width \"" + value + "\" in column " + this.id + ". Valid values are ##% or ##px (50% / 50px)");
                        }
                    }
                    var isFixedWidth = this._parsedWidth && this._parsedWidth.type === 'px';
                    Object.defineProperty(this, 'isFixedWidth', { value: isFixedWidth, configurable: true });
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblMetaColumn.prototype, "parsedWidth", {
            //#endregion PblMetaColumnDefinition
            get: function () { return this._parsedWidth; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblMetaColumn.prototype, "columnDef", {
            /**
             * The column def for this column.
             */
            get: function () { return this._columnDef; },
            enumerable: false,
            configurable: true
        });
        PblMetaColumn.extendProperty = function (name) {
            if (CLONE_PROPERTIES$2.indexOf(name) === -1) {
                CLONE_PROPERTIES$2.push(name);
            }
        };
        PblMetaColumn.prototype.attach = function (columnDef) {
            this.detach();
            this._columnDef = columnDef;
            this.columnDef.updateWidth(this.width || this.defaultWidth, 'attach');
        };
        PblMetaColumn.prototype.detach = function () {
            this._columnDef = undefined;
        };
        PblMetaColumn.prototype.updateWidth = function (fallbackDefault) {
            this.defaultWidth = fallbackDefault || '';
            if (this.columnDef) {
                this.columnDef.updateWidth(this.width || fallbackDefault, 'update');
            }
        };
        return PblMetaColumn;
    }());

    var PBL_NGRID_COLUMN_GROUP_MARK = Symbol('PblColumnGroup');
    var CLONE_PROPERTIES$1 = [];
    function isPblColumnGroup(def) {
        return def instanceof PblColumnGroup || (def && def[PBL_NGRID_COLUMN_GROUP_MARK] === true);
    }
    function getId(value) {
        return typeof value === 'string' ? value : value.id;
    }
    var PblColumnGroupStore = /** @class */ (function () {
        function PblColumnGroupStore() {
            this.store = new Map();
            this._all = [];
        }
        Object.defineProperty(PblColumnGroupStore.prototype, "all", {
            get: function () { return this._all; },
            enumerable: false,
            configurable: true
        });
        /**
         * Attach a column to a group.
         */
        PblColumnGroupStore.prototype.attach = function (group, column) {
            var g = this._find(group);
            if (g) {
                g.activeColumns.add(getId(column));
                return true;
            }
            return false;
        };
        /**
         * Detach a column from a group.
         */
        PblColumnGroupStore.prototype.detach = function (group, column) {
            var g = this._find(group);
            if (g) {
                return g.activeColumns.delete(getId(column));
            }
            return false;
        };
        /**
         * Returns a list of `PblColumnGroup` that does not have columns attached.
         */
        PblColumnGroupStore.prototype.findGhosts = function () {
            return Array.from(this.store.values())
                .filter(function (item) { return item.activeColumns.size === 0; })
                .map(function (item) { return item.group; });
        };
        PblColumnGroupStore.prototype.add = function (group) {
            this.store.set(group.id, { group: group, activeColumns: new Set() });
            this.updateAll();
        };
        PblColumnGroupStore.prototype.remove = function (group) {
            var g = this.find(group);
            if (g && this.store.delete(g.id)) {
                this.updateAll();
                return true;
            }
            return false;
        };
        PblColumnGroupStore.prototype.find = function (group) {
            var g = this._find(group);
            if (g) {
                return g.group;
            }
        };
        PblColumnGroupStore.prototype.clone = function () {
            var c = new PblColumnGroupStore();
            c.store = new Map(this.store);
            c.updateAll();
            return c;
        };
        PblColumnGroupStore.prototype._find = function (group) {
            return this.store.get(getId(group));
        };
        PblColumnGroupStore.prototype.updateAll = function () {
            this._all = Array.from(this.store.values()).map(function (item) { return item.group; });
        };
        return PblColumnGroupStore;
    }());
    var PblColumnGroup = /** @class */ (function (_super) {
        __extends(PblColumnGroup, _super);
        function PblColumnGroup(def, columns, placeholder) {
            var e_1, _a, e_2, _b;
            if (placeholder === void 0) { placeholder = false; }
            var _this = _super.call(this, isPblColumnGroup(def)
                ? def
                : Object.assign({ id: "group-" + def.columnIds.join('.') + "-row-" + def.rowIndex, kind: 'header' }, def)) || this;
            _this.placeholder = placeholder;
            _this[PBL_NGRID_COLUMN_GROUP_MARK] = true;
            _this.columnIds = def.columnIds;
            _this.columns = columns;
            try {
                for (var columns_1 = __values(columns), columns_1_1 = columns_1.next(); !columns_1_1.done; columns_1_1 = columns_1.next()) {
                    var c = columns_1_1.value;
                    c.markInGroup(_this);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (columns_1_1 && !columns_1_1.done && (_a = columns_1.return)) _a.call(columns_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            try {
                for (var CLONE_PROPERTIES_1 = __values(CLONE_PROPERTIES$1), CLONE_PROPERTIES_1_1 = CLONE_PROPERTIES_1.next(); !CLONE_PROPERTIES_1_1.done; CLONE_PROPERTIES_1_1 = CLONE_PROPERTIES_1.next()) {
                    var prop = CLONE_PROPERTIES_1_1.value;
                    if (prop in def) {
                        _this[prop] = def[prop];
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (CLONE_PROPERTIES_1_1 && !CLONE_PROPERTIES_1_1.done && (_b = CLONE_PROPERTIES_1.return)) _b.call(CLONE_PROPERTIES_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return _this;
        }
        Object.defineProperty(PblColumnGroup.prototype, "isVisible", {
            //#endregion PblColumnGroupDefinition
            /**
             * Returns the visible state of the column.
             * The column is visible if AT LEAST ONE child column is visible (i.e. not hidden)
             */
            get: function () {
                return this.columns.some(function (c) { return !c.hidden; });
            },
            enumerable: false,
            configurable: true
        });
        PblColumnGroup.extendProperty = function (name) {
            if (CLONE_PROPERTIES$1.indexOf(name) === -1) {
                CLONE_PROPERTIES$1.push(name);
            }
        };
        PblColumnGroup.prototype.createSlave = function (columns) {
            if (columns === void 0) { columns = []; }
            var slave = new PblColumnGroup(Object.assign(Object.assign({}, this), { id: this.id + '-slave' + Date.now() }), columns);
            slave.slaveOf = this;
            Object.defineProperty(slave, 'template', { get: function () { return this.slaveOf.template; }, set: function (value) { } });
            return slave;
        };
        PblColumnGroup.prototype.replace = function (newColumn) {
            var id = newColumn.id;
            var idx = this.columns.findIndex(function (c) { return c.id === id; });
            if (idx > -1) {
                this.columns.splice(idx, 1, newColumn);
                return true;
            }
            return false;
        };
        return PblColumnGroup;
    }(PblMetaColumn));

    var PBL_NGRID_COLUMN_MARK = Symbol('PblColumn');
    var CLONE_PROPERTIES = ['pIndex', 'transform', 'filter', 'sort', 'alias', 'headerType', 'footerType', 'pin'];
    function isPblColumn(def) {
        return def instanceof PblColumn || (def && def[PBL_NGRID_COLUMN_MARK] === true);
    }
    var PblColumn = /** @class */ (function () {
        function PblColumn(def, groupStore) {
            var e_1, _b, e_2, _c;
            /**
             * A place to store things...
             * This must be an object, values are shadow-copied so persist data between multiple plugins.
             */
            this.data = {};
            this.defaultWidth = '';
            /**
             * Groups that this column belongs to.
             * WARNING: DO NOT ADD/REMOVE GROUPS DIRECTLY, USE markInGroup/markNotInGroup.
             */
            this._groups = new Set();
            this[PBL_NGRID_COLUMN_MARK] = true;
            if (isPblColumn(def)) {
                initDefinitions(def, this);
                this.prop = def.prop;
                this.path = def.path;
                this.orgProp = def.orgProp;
                this.groupStore = groupStore || def.groupStore;
                this._groups = new Set(def._groups);
                try {
                    for (var _d = __values(Array.from(def._groups.values())), _e = _d.next(); !_e.done; _e = _d.next()) {
                        var id = _e.value;
                        var g = this.groupStore.find(id);
                        if (g) {
                            this.markInGroup(g);
                            g.replace(this);
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
            }
            else {
                var path = def.path || def.prop.split('.');
                var prop = def.path ? def.prop : path.pop();
                def = Object.create(def);
                def.id = def.id || def.prop || def.label;
                def.label = 'label' in def ? def.label : prop;
                if (typeof def.type === 'string') {
                    def.type = { name: def.type };
                }
                if (typeof def.headerType === 'string') {
                    def.headerType = { name: def.headerType };
                }
                if (typeof def.footerType === 'string') {
                    def.footerType = { name: def.footerType };
                }
                initDefinitions(def, this);
                this.groupStore = groupStore || new PblColumnGroupStore();
                this.prop = prop;
                this.orgProp = def.prop;
                if (path.length) {
                    this.path = path;
                }
            }
            try {
                for (var CLONE_PROPERTIES_1 = __values(CLONE_PROPERTIES), CLONE_PROPERTIES_1_1 = CLONE_PROPERTIES_1.next(); !CLONE_PROPERTIES_1_1.done; CLONE_PROPERTIES_1_1 = CLONE_PROPERTIES_1.next()) {
                    var prop = CLONE_PROPERTIES_1_1.value;
                    if (prop in def) {
                        this[prop] = def[prop];
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (CLONE_PROPERTIES_1_1 && !CLONE_PROPERTIES_1_1.done && (_c = CLONE_PROPERTIES_1.return)) _c.call(CLONE_PROPERTIES_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        Object.defineProperty(PblColumn.prototype, "width", {
            /**
             * The width in px or % in the following format: ##% or ##px
             * Examples: '50%', '50px'
             */
            get: function () { return this._width; },
            set: function (value) {
                var _a;
                if (value !== this._width) {
                    this._parsedWidth = parseStyleWidth(this._width = value);
                    // Error in dev, on prod just let it be unset
                    if (typeof ngDevMode === 'undefined' || ngDevMode) {
                        if (!this._parsedWidth && value) {
                            throw new Error("Invalid width \"" + value + "\" in column " + this.prop + ". Valid values are ##% or ##px (50% / 50px)");
                        }
                    }
                    var isFixedWidth = ((_a = this._parsedWidth) === null || _a === void 0 ? void 0 : _a.type) === 'px';
                    Object.defineProperty(this, 'isFixedWidth', { value: isFixedWidth, configurable: true });
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblColumn.prototype, "parsedWidth", {
            get: function () { return this._parsedWidth; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblColumn.prototype, "columnDef", {
            /**
             * The column def for this column.
             */
            get: function () { return this._columnDef; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblColumn.prototype, "groups", {
            get: function () { return Array.from(this._groups.values()); },
            enumerable: false,
            configurable: true
        });
        PblColumn.extendProperty = function (name) {
            if (CLONE_PROPERTIES.indexOf(name) === -1) {
                CLONE_PROPERTIES.push(name);
            }
        };
        PblColumn.prototype.attach = function (columnDef) {
            this.detach();
            this._columnDef = columnDef;
            if (this.defaultWidth) {
                this.columnDef.updateWidth(this.width || this.defaultWidth, 'attach');
            }
        };
        PblColumn.prototype.detach = function () {
            this._columnDef = undefined;
        };
        PblColumn.prototype.setDefaultWidth = function (defaultWidth) {
            this.defaultWidth = defaultWidth;
        };
        PblColumn.prototype.updateWidth = function (width) {
            if (width) {
                this.width = width;
            }
            var columnDef = this.columnDef;
            if (columnDef) {
                columnDef.updateWidth(this.width || this.defaultWidth || '', 'update');
            }
        };
        /**
         * Get the value this column points to in the provided row
         */
        PblColumn.prototype.getValue = function (row) { return i1.getValue(this, row); };
        /**
         * Set a value in the provided row where this column points to
         */
        PblColumn.prototype.setValue = function (row, value) { return i1.deepPathSet(row, this, value); };
        /**
         * Mark's that this column belong to the provided group.
         * \> Note that this internal to the column and does not effect the group in any way.
         */
        PblColumn.prototype.markInGroup = function (g) {
            this.groupStore.attach(g, this);
            this._groups.add(g.id);
        };
        /**
         * Mark's that this column does not belong to the provided group.
         * \> Note that this internal to the column and does not effect the group in any way.
         */
        PblColumn.prototype.markNotInGroup = function (g) {
            this.groupStore.detach(g, this);
            return this._groups.delete(g.id);
        };
        PblColumn.prototype.isInGroup = function (g) {
            return this._groups.has(g.id);
        };
        PblColumn.prototype.getGroupOfRow = function (rowIndex) {
            var e_3, _b;
            var groupIds = this.groups;
            try {
                for (var groupIds_1 = __values(groupIds), groupIds_1_1 = groupIds_1.next(); !groupIds_1_1.done; groupIds_1_1 = groupIds_1.next()) {
                    var id = groupIds_1_1.value;
                    var g = this.groupStore.find(id);
                    if (g && g.rowIndex === rowIndex) {
                        return g;
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (groupIds_1_1 && !groupIds_1_1.done && (_b = groupIds_1.return)) _b.call(groupIds_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
        };
        PblColumn.prototype.groupLogic = function (columnGroups, groupExists) {
            var _b = __read(columnGroups, 3), gPrev = _b[0], gCurr = _b[1], gNext = _b[2];
            // STATE: This column has same group of previous column, nothing to do.
            if (gCurr === gPrev) {
                return gCurr;
            }
            // STATE: The group exists in one of the columns BUT NOT in the LAST COLUMN (i.e: Its a slave split)
            if (groupExists) {
                // If the previous sibling group is a slave and this group is the origin of the slave, convert this group to the slave.
                if (gPrev && gCurr === gPrev.slaveOf) {
                    return gPrev;
                }
                if (gNext && gCurr === gNext.slaveOf) {
                    return gNext;
                }
                // Otherwise create the slave.
                var g = gCurr.createSlave([this]);
                this.groupStore.add(g);
                // If the current group is a placeholder and either the previous OR next sibling group is a placeholder as well
                // we want to group them together, although they are not related, because they both have identical headers (empty header).
                // Note that we still create the salve, we just don't use it.
                if (gCurr.placeholder) {
                    var prevPH = gPrev && gPrev.placeholder;
                    var nextPH = gNext && gNext.slaveOf && gNext.placeholder;
                    var groupWithPlaceholder = prevPH ? gPrev : nextPH ? gNext : undefined;
                    // const groupWithPlaceholder = prevPH && gPrev;
                    if (groupWithPlaceholder) {
                        return groupWithPlaceholder;
                    }
                }
                return g;
            }
            else if (gCurr === null || gCurr === void 0 ? void 0 : gCurr.slaveOf) {
                // STATE: The group IS a slave and it is set AFTER an item that belongs to the group it is slave of.
                if (gCurr.slaveOf === gPrev) {
                    return gCurr.slaveOf;
                }
                if (gCurr.slaveOf === (gPrev === null || gPrev === void 0 ? void 0 : gPrev.slaveOf)) {
                    return gPrev;
                }
                // STATE: The group IS a slave and it is set BEFORE an item that belongs to the group it is slave of.
                if (gCurr.slaveOf === gNext) {
                    return gCurr.slaveOf;
                }
            }
            else {
                if ((gPrev === null || gPrev === void 0 ? void 0 : gPrev.placeholder) && (gCurr === null || gCurr === void 0 ? void 0 : gCurr.placeholder)) {
                    return gPrev;
                }
            }
            return gCurr;
        };
        /**
         * Calculates if the column width is locked by a maximum by checking if the given width is equal to the max width.
         * If the result of the calculation (true/false) does not equal the previous lock state it will set the new lock state
         * and return true.
         * Otherwise return false.
         * @internal
         */
        PblColumn.prototype.checkMaxWidthLock = function (actualWidth) {
            if (actualWidth === this.maxWidth) {
                if (!this.maxWidthLock) {
                    this.maxWidthLock = true;
                    return true;
                }
            }
            else if (this.maxWidthLock) {
                this.maxWidthLock = false;
                return true;
            }
            return false;
        };
        return PblColumn;
    }());

    var PblColumnFactory = /** @class */ (function () {
        function PblColumnFactory() {
            this._raw = { table: { cols: [] }, header: [], footer: [], headerGroup: [] };
            this._defaults = {
                table: {},
                header: {},
                footer: {},
            };
            this._currentHeaderRow = 0;
            this._currentFooterRow = 0;
        }
        Object.defineProperty(PblColumnFactory.prototype, "currentHeaderRow", {
            get: function () { return this._currentHeaderRow; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblColumnFactory.prototype, "currentFooterRow", {
            get: function () { return this._currentFooterRow; },
            enumerable: false,
            configurable: true
        });
        PblColumnFactory.fromDefinitionSet = function (defs) {
            var f = new PblColumnFactory();
            Object.assign(f._raw, defs);
            return f;
        };
        PblColumnFactory.prototype.build = function () {
            var _this = this;
            var _c = this, _defaults = _c._defaults, _raw = _c._raw;
            var groupStore = new PblColumnGroupStore();
            var table = {
                header: _raw.table.header,
                footer: _raw.table.footer,
                cols: _raw.table.cols.map(function (d) { return new PblColumn(Object.assign(Object.assign({}, _defaults.table), d), groupStore); }),
            };
            var header = _raw.header.map(function (h) { return ({
                rowIndex: h.rowIndex,
                rowClassName: h.rowClassName,
                type: h.type || 'fixed',
                cols: h.cols.map(function (c) { return new PblMetaColumn(Object.assign(Object.assign({}, _defaults.header), c)); }),
            }); });
            var footer = _raw.footer.map(function (f) { return ({
                rowIndex: f.rowIndex,
                rowClassName: f.rowClassName,
                type: f.type || 'fixed',
                cols: f.cols.map(function (c) { return new PblMetaColumn(Object.assign(Object.assign({}, _defaults.footer), c)); })
            }); });
            var headerGroup = _raw.headerGroup.map(function (hg) { return ({
                rowIndex: hg.rowIndex,
                rowClassName: hg.rowClassName,
                type: hg.type || 'fixed',
                cols: _this.buildHeaderGroups(hg.rowIndex, hg.cols, table.cols).map(function (g) {
                    groupStore.add(g);
                    return g;
                }),
            }); });
            return {
                groupStore: groupStore,
                table: table,
                header: header,
                footer: footer,
                headerGroup: headerGroup,
            };
        };
        PblColumnFactory.prototype.default = function (def, type) {
            if (type === void 0) { type = 'table'; }
            this._defaults[type] = def;
            return this;
        };
        PblColumnFactory.prototype.table = function () {
            var _c;
            var defs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                defs[_i] = arguments[_i];
            }
            var rowOptions = defs[0].prop ? {} : defs.shift();
            var header = rowOptions.header, footer = rowOptions.footer;
            Object.assign(this._raw.table, { header: header, footer: footer });
            (_c = this._raw.table.cols).push.apply(_c, __spreadArray([], __read(defs)));
            return this;
        };
        PblColumnFactory.prototype.header = function () {
            var defs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                defs[_i] = arguments[_i];
            }
            var rowIndex = this._currentHeaderRow++;
            var rowOptions = this.processRowOptions(defs);
            var rowClassName = this.genRowClass(rowOptions, rowIndex);
            var headers = defs.map(function (d) {
                var def = {
                    id: d.id,
                    kind: 'header',
                    rowIndex: rowIndex
                };
                return Object.assign(def, d);
            });
            this._raw.header.push({
                rowIndex: rowIndex,
                rowClassName: rowClassName,
                cols: headers,
                type: (rowOptions && rowOptions.type) || 'fixed',
            });
            return this;
        };
        PblColumnFactory.prototype.footer = function () {
            var defs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                defs[_i] = arguments[_i];
            }
            var rowIndex = this._currentFooterRow++;
            var rowOptions = this.processRowOptions(defs);
            var rowClassName = this.genRowClass(rowOptions, rowIndex);
            var footers = defs.map(function (d) {
                var def = {
                    id: d.id,
                    kind: 'footer',
                    rowIndex: rowIndex
                };
                return Object.assign(def, d);
            });
            this._raw.footer.push({
                rowIndex: rowIndex,
                rowClassName: rowClassName,
                cols: footers,
                type: (rowOptions && rowOptions.type) || 'fixed',
            });
            return this;
        };
        PblColumnFactory.prototype.headerGroup = function () {
            var defs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                defs[_i] = arguments[_i];
            }
            var rowIndex = this._currentHeaderRow++;
            var rowOptions = this.processRowOptions(defs, 'columnIds', 'prop');
            var rowClassName = this.genRowClass(rowOptions, rowIndex);
            var headerGroups = defs.map(function (d) { return Object.assign({ rowIndex: rowIndex }, d); });
            this._raw.headerGroup.push({
                rowIndex: rowIndex,
                rowClassName: rowClassName,
                cols: headerGroups,
                type: (rowOptions && rowOptions.type) || 'fixed',
            });
            return this;
        };
        PblColumnFactory.prototype.processRowOptions = function (defs) {
            var e_1, _c;
            var mustHaveProperty = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                mustHaveProperty[_i - 1] = arguments[_i];
            }
            if (mustHaveProperty.length === 0) {
                mustHaveProperty = ['id'];
            }
            try {
                for (var mustHaveProperty_1 = __values(mustHaveProperty), mustHaveProperty_1_1 = mustHaveProperty_1.next(); !mustHaveProperty_1_1.done; mustHaveProperty_1_1 = mustHaveProperty_1.next()) {
                    var prop = mustHaveProperty_1_1.value;
                    if (prop in defs[0]) {
                        return;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (mustHaveProperty_1_1 && !mustHaveProperty_1_1.done && (_c = mustHaveProperty_1.return)) _c.call(mustHaveProperty_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return defs.shift();
        };
        PblColumnFactory.prototype.genRowClass = function (rowOptions, fallbackRowIndex) {
            return (rowOptions && rowOptions.rowClassName) || "pbl-ngrid-row-index-" + fallbackRowIndex.toString();
        };
        PblColumnFactory.prototype.buildHeaderGroups = function (rowIndex, headerGroupDefs, table) {
            var e_2, _c;
            var _a, _b;
            var headerGroup = [];
            // Building of header group rows requires some work.
            // The user defined groups might not cover all columns, creating gaps between group columns so we need to add placeholder groups to cover these gaps.
            // Moreover, the user might not specify a `prop`, which we might need to complete.
            // We do that for each header group row.
            //
            // The end goal is to return a list of `PblColumnGroup` that span over the entire columns of the grid.
            //
            // The logic is as follows:
            // For each column in the grid, find a matching column group - a group pointing at the column by having the same `prop`
            // If found, check it's span and skip X amount of columns where X is the span.
            // If a span is not defined then treat it as a greedy group that spans over all columns ahead until the next column that has a matching group column.
            //
            // If a column does not have a matching group column, search for group columns without a `prop` specified and when found set their `prop` to the current
            // column so we will now use them as if it's a user provided group for this column...
            //
            // If no group columns exists (or left), we create an ad-hoc group column and we will now use them as if it's a user provided group for this column...
            //
            var tableDefs = table.slice();
            var defs = headerGroupDefs.slice();
            var _loop_1 = function (d) {
                // TODO: remove in V5, when prop & span are deprecated
                // @deprecated Will be removed in v5
                if (d.prop) {
                    if (typeof ngDevMode === 'undefined' || ngDevMode) {
                        i1.deprecatedWarning('PblColumnGroupDefinition.prop', '4', 'PblColumnGroupDefinition.columnIds');
                        i1.deprecatedWarning('PblColumnGroupDefinition.span', '4', 'PblColumnGroupDefinition.columnIds');
                    }
                    var start = tableDefs.findIndex(function (c) { return c.orgProp === d.prop; });
                    d.columnIds = tableDefs.slice(start, start + d.span + 1).map(function (c) { return c.id; });
                    delete d.prop;
                    delete d.span;
                }
                d.rowIndex = rowIndex;
                var group = new PblColumnGroup(d, tableDefs.filter(function (c) { return d.columnIds.indexOf(c.orgProp) > -1; }), false);
                headerGroup.push(group);
            };
            try {
                for (var defs_1 = __values(defs), defs_1_1 = defs_1.next(); !defs_1_1.done; defs_1_1 = defs_1.next()) {
                    var d = defs_1_1.value;
                    _loop_1(d);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (defs_1_1 && !defs_1_1.done && (_c = defs_1.return)) _c.call(defs_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            var marker = 0;
            var _loop_2 = function () {
                var column = tableDefs.shift();
                var orgProp = column.orgProp;
                var existingGroupIndex = headerGroup.findIndex(function (hg) { return hg.columnIds.indexOf(orgProp) > -1; });
                if (existingGroupIndex > -1) {
                    var hg = headerGroup[existingGroupIndex];
                    if (existingGroupIndex < marker) {
                        var columns = [column];
                        while (hg.columnIds.indexOf((_a = tableDefs[0]) === null || _a === void 0 ? void 0 : _a.orgProp) > -1) {
                            columns.push(tableDefs.shift());
                        }
                        headerGroup[marker] = hg.createSlave(columns);
                        marker += 1;
                    }
                    else {
                        while (hg.columnIds.indexOf((_b = tableDefs[0]) === null || _b === void 0 ? void 0 : _b.orgProp) > -1) {
                            tableDefs.shift();
                        }
                        marker += 1;
                    }
                }
                else {
                    var prev_1 = headerGroup[marker - 1];
                    if (prev_1 === null || prev_1 === void 0 ? void 0 : prev_1.placeholder) {
                        var clone = Object.keys(prev_1).reduce(function (p, c) {
                            p[c] = prev_1[c];
                            return p;
                        }, {});
                        clone.columnIds = __spreadArray(__spreadArray([], __read(clone.columnIds)), [orgProp]);
                        delete clone.id;
                        headerGroup[marker - 1] = new PblColumnGroup(clone, __spreadArray(__spreadArray([], __read(prev_1.columns)), [column]), true);
                    }
                    else {
                        var d = { rowIndex: rowIndex, kind: 'header', columnIds: [orgProp] };
                        headerGroup.splice(marker, 0, new PblColumnGroup(d, [column], true));
                        marker += 1;
                    }
                }
            };
            while (tableDefs.length) {
                _loop_2();
            }
            return headerGroup;
        };
        return PblColumnFactory;
    }());
    function columnFactory() {
        return new PblColumnFactory();
    }

    /**
     * A class that represents the dimensions and style of a column cell.
     * The class is bound to an element and a column.
     *
     * Calling `updateSize()` will sync the layout from the DOM element to the class properties
     * and trigger a resize event on the column's column definition object.
     *
     * > Note that `updateSize()` only works when a column is attached
     *
     * This class shouldn't be used directly. In NGrid, it is wrapped by `PblColumnSizeObserver` which automatically triggers
     * update size events using the `ResizeObserver` API.
     */
    var ColumnSizeInfo = /** @class */ (function () {
        function ColumnSizeInfo(target) {
            this.target = target;
        }
        Object.defineProperty(ColumnSizeInfo.prototype, "column", {
            get: function () { return this._column; },
            set: function (value) { this.attachColumn(value); },
            enumerable: false,
            configurable: true
        });
        ColumnSizeInfo.prototype.attachColumn = function (column) {
            this.detachColumn();
            if (column) {
                column.sizeInfo = this;
            }
            this._column = column;
        };
        ColumnSizeInfo.prototype.detachColumn = function () {
            if (this._column) {
                this._column.sizeInfo = undefined;
                this._column = undefined;
            }
        };
        ColumnSizeInfo.prototype.updateSize = function () {
            if (this.column && !this.column.columnDef.isDragging) {
                var el = this.target;
                var rect = el.getBoundingClientRect();
                this.width = rect.width;
                this.height = rect.height;
                this.style = getComputedStyle(el);
                this.column.columnDef.onResize();
            }
        };
        return ColumnSizeInfo;
    }());

    /**
     * A column width calculator that calculates column width for a specific column or a group of columns.
     * It also provide the minimum required row width for the total columns added up to that point.
     *
     * The `DynamicColumnWidthLogic` takes into account real-time DOM measurements (especially box-model metadata), hence "dynamic".
     * It performs the calculation based on `PblColumn` and actual DOM size metadata.
     *
     * The `DynamicColumnWidthLogic` has 3 responsibilities:
     *
     * - It is responsible for enforcing the `maxWidth` boundary constraint for every column it processes by calculating the actual width
     * of a column and calling `PblColumn.checkMaxWidthLock` to verify if max width lock has changed due to the new actual width.
     *
     * - It calculates the absolute width for a group of columns, so `PblCdkVirtualScrollViewportComponentGroupColumn` can have an exact size that wraps it's children.
     *
     * - It calculates the `minimumRowWidth`, which represents the minimum width required width of the row, i.e. table.
     *
     * > Note that an instance of `DynamicColumnWidthLogic` represents a one-time pass for all columns, for every run a new instance is required.
     */
    var DynamicColumnWidthLogic = /** @class */ (function () {
        function DynamicColumnWidthLogic(strategy, dir) {
            this.strategy = strategy;
            this.dir = dir;
            this.cols = new Map();
            this._minimumRowWidth = 0;
        }
        Object.defineProperty(DynamicColumnWidthLogic.prototype, "minimumRowWidth", {
            get: function () { return this._minimumRowWidth; },
            enumerable: false,
            configurable: true
        });
        ;
        DynamicColumnWidthLogic.prototype.reset = function () {
            this.maxWidthLockChanged = false;
            this._minimumRowWidth = 0;
            this.cols.clear();
        };
        /**
         * Returns a breakout of the width of the column, breaking it into the width of the content and the rest of the width
         */
        DynamicColumnWidthLogic.prototype.widthBreakout = function (columnInfo) {
            return widthBreakout(this.strategy, columnInfo);
        };
        /**
         * Add a column to the calculation.
         *
         * The operation will update the minimum required width and trigger a `checkMaxWidthLock` on the column.
         * If the max width lock has changed the `maxWidthLockChanged` is set to true.
         *
         * A column that was previously added is ignored.
         *
         * Note that once `maxWidthLockChanged` is set to true it will never change.
         */
        DynamicColumnWidthLogic.prototype.addColumn = function (columnInfo) {
            if (!this.cols.has(columnInfo)) {
                var column = columnInfo.column;
                var minWidth = column.minWidth || 0;
                if (column.isFixedWidth) {
                    minWidth = Math.max(column.parsedWidth.value, minWidth);
                }
                var nonContent = this.strategy.cell(columnInfo);
                var width = minWidth + nonContent;
                this.cols.set(columnInfo, width);
                this._minimumRowWidth += width;
                if (column.maxWidth) {
                    var actualWidth = columnInfo.width - nonContent;
                    if (column.checkMaxWidthLock(actualWidth)) {
                        this.maxWidthLockChanged = true;
                    }
                }
            }
        };
        /**
         * Run each of the columns through `addColumn` and returns the sum of the width all columns using
         * the box model space strategy.
         *
         * The result represents the absolute width to be used in a `PblColumnGroup`.
         *
         * > Note that when a table has multiple column-group rows each column is the child of multiple group column, hence calling `addColumn` with the
         * same group more then once. However, since `addColumn()` ignores columns it already processed it is safe.
         */
        DynamicColumnWidthLogic.prototype.addGroup = function (columnInfos) {
            var e_1, _a;
            var sum = 0;
            try {
                for (var columnInfos_1 = __values(columnInfos), columnInfos_1_1 = columnInfos_1.next(); !columnInfos_1_1.done; columnInfos_1_1 = columnInfos_1.next()) {
                    var c = columnInfos_1_1.value;
                    this.addColumn(c);
                    sum += c.width;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (columnInfos_1_1 && !columnInfos_1_1.done && (_a = columnInfos_1.return)) _a.call(columnInfos_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            sum -= this.strategy.group(columnInfos, this.dir);
            return sum;
        };
        return DynamicColumnWidthLogic;
    }());
    /**
    * Returns a breakout of the width of the column, breaking it into the width of the content and the rest of the width
    */
    function widthBreakout(strategy, columnInfo) {
        var nonContent = strategy.cell(columnInfo);
        return {
            content: columnInfo.width - nonContent,
            nonContent: nonContent,
        };
    }
    var DYNAMIC_PADDING_BOX_MODEL_SPACE_STRATEGY = {
        cell: function (col) {
            var style = col.style;
            return parseInt(style.paddingLeft, 10) + parseInt(style.paddingRight, 10);
        },
        groupCell: function (col) {
            return 0;
        },
        group: function (cols, dir) {
            var len = cols.length;
            return len > 0 ? parseInt(cols[0].style[dir === 'rtl' ? 'paddingRight' : 'paddingLeft'], 10) + parseInt(cols[len - 1].style[dir === 'rtl' ? 'paddingLeft' : 'paddingRight'], 10) : 0;
        }
    };

    /**
     * Represents a runtime column definition for a user-defined column definitions.
     *
     * User defined column definitions are `PblColumn`, `PblMetaColumn`, `PblColumnGroup` etc...
     * They represent static column definitions and `PblNgridColumnDef` is the runtime instance of them.
     *
     */
    var PblNgridColumnDef = /** @class */ (function (_super) {
        __extends(PblNgridColumnDef, _super);
        function PblNgridColumnDef(extApi) {
            var _this = _super.call(this) || this;
            _this.extApi = extApi;
            _this.isDragging = false;
            /**
             * An event emitted when width of this column has changed.
             */
            _this.widthChange = new i0.EventEmitter();
            /**
             * The complete width definition for the column.
             *
             * There are 2 width sets (tuple):
             * - [0]: The source width definitions as set in static column definition instance
             * - [1]: The absolute width definitions, as currently set in the DOM (getBoundingClientRect())
             *
             * Each set is made up of 3 primitive width definitions: MIN-WIDTH, WIDTH and MAX-WIDTH.
             * The tuple represents them in that order, i.e: [ MIN-WIDTH, WIDTH, MAX-WIDTH ]
             */
            _this._widths = [];
            _this.grid = extApi.grid;
            var strategy = extApi.widthCalc.dynamicColumnWidth.strategy;
            _this.widthBreakout = function (c) { return widthBreakout(strategy, c); };
            return _this;
        }
        Object.defineProperty(PblNgridColumnDef.prototype, "column", {
            get: function () { return this._column; },
            set: function (value) { this.attach(value); },
            enumerable: false,
            configurable: true
        });
        ;
        Object.defineProperty(PblNgridColumnDef.prototype, "widths", {
            /**
             * The absolute width definitions, as currently set in the DOM (getBoundingClientRect()).
             * If no measurements exists yet, return the user defined width's.
             *
             * The tuple represents them in that order, i.e: [ MIN-WIDTH, WIDTH, MAX-WIDTH ]
             */
            get: function () { return this._widths[1]; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblNgridColumnDef.prototype, "netWidth", {
            /**
             * The last net width of the column.
             * The net width is the absolute width of the column, without padding, border etc...
             */
            get: function () { return this._netWidth; },
            enumerable: false,
            configurable: true
        });
        /**
         * Update the "widths" for this column and when width has changed.
         *
         * The "widths" are the 3 values representing a width of a cell: [minWidth, width, maxWidth],
         * this method is given the width and will calculate the minWidth and maxWidth based on the column definitions.
         *
         * If at least one value of "widths" has changed, fires the `widthChange` event with the `reason` provided.
         *
         * The reason can be used to optionally update the relevant cells, based on the source (reason) of the update.
         * - attach: This runtime column definition instance was attached to a static column definition instance.
         * - update: The width value was updated in the static column definition instance , which triggered a width update to the runtime column definition instance
         * - resize: A resize event to the header PblColumn cell was triggered, the width of the static column definition is not updated, only the runtime value is.
         *
         * Note that this updates the width of the column-def instance, not the column definitions width itself.
         * Only when `reason === 'update'` it means that the column definition was updated and triggered this update
         *
         * @param width The new width
         * @param reason The reason for this change
         */
        PblNgridColumnDef.prototype.updateWidth = function (width, reason) {
            var _a = this._column, isFixedWidth = _a.isFixedWidth, parsedWidth = _a.parsedWidth;
            /*  Setting the minimum width is based on the input.
                If the original width is pixel fixed we will take the maximum between it and the min width.
                If not, we will the take minWidth.
                If none of the above worked we will try to see if the current width is set with %, if so it will be our min width.
            */
            var minWidthPx = isFixedWidth
                ? Math.max(this._column.parsedWidth.value, this._column.minWidth || 0)
                : this._column.minWidth;
            var minWidth = minWidthPx && minWidthPx + "px";
            if (!minWidth && (parsedWidth === null || parsedWidth === void 0 ? void 0 : parsedWidth.type) === '%') {
                minWidth = width;
            }
            var maxWidth = isFixedWidth
                ? Math.min(this._column.parsedWidth.value, this._column.maxWidth || this._column.parsedWidth.value)
                : this._column.maxWidth;
            var newWidths = [minWidth || '', width, maxWidth ? maxWidth + "px" : width];
            if (reason === 'resize') {
                this._widths[1] = newWidths;
                this.widthChange.emit({ reason: reason });
            }
            else {
                var prev = this._widths[0] || [];
                this._widths[0] = newWidths;
                if (!this._widths[1]) {
                    this._widths[1] = newWidths;
                }
                for (var i = 0; i < 3; i++) {
                    if (prev[i] !== newWidths[i]) {
                        this.widthChange.emit({ reason: reason });
                        break;
                    }
                }
            }
        };
        /**
         * Apply the current absolute width definitions (minWidth, width, maxWidth) onto an element.
         */
        PblNgridColumnDef.prototype.applyWidth = function (element) { setWidth(element, this.widths); };
        /**
         * Apply the source width definitions )set in static column definition instance) onto an element.
         */
        PblNgridColumnDef.prototype.applySourceWidth = function (element) { setWidth(element, this._widths[0]); };
        /**
         * Query for cell elements related to this column definition.
         *
         * This query is not cached - cache in implementation.
         */
        PblNgridColumnDef.prototype.queryCellElements = function () {
            var e_1, _a;
            var filter = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                filter[_i] = arguments[_i];
            }
            var cssId = "." + uniqueColumnCss(this);
            var query = [];
            if (filter.length === 0) {
                query.push(cssId);
            }
            else {
                try {
                    for (var filter_1 = __values(filter), filter_1_1 = filter_1.next(); !filter_1_1.done; filter_1_1 = filter_1.next()) {
                        var f = filter_1_1.value;
                        switch (f) {
                            case 'table':
                                query.push(".pbl-ngrid-cell" + cssId);
                                break;
                            case 'header':
                                query.push(".pbl-ngrid-header-cell" + cssId + ":not(.pbl-header-group-cell)");
                                break;
                            case 'headerGroup':
                                query.push(".pbl-header-group-cell" + cssId);
                                break;
                            case 'footer':
                                query.push(".pbl-ngrid-footer-cell" + cssId + ":not(.pbl-footer-group-cell)");
                                break;
                            case 'footerGroup':
                                query.push(".pbl-footer-group-cell" + cssId);
                                break;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (filter_1_1 && !filter_1_1.done && (_a = filter_1.return)) _a.call(filter_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            // we query from the master table container and not CDKTable because of fixed meta rows
            return query.length === 0 ? [] : Array.from(this.extApi.element.querySelectorAll(query.join(', ')));
        };
        /** @internal */
        PblNgridColumnDef.prototype.ngOnDestroy = function () {
            this.detach();
            this.widthChange.complete();
        };
        PblNgridColumnDef.prototype.onResize = function () {
            if (isPblColumn(this.column)) {
                var prevNetWidth = this._netWidth;
                this._netWidth = this.widthBreakout(this.column.sizeInfo).content;
                if (prevNetWidth !== this._netWidth) {
                    var width = this._netWidth + "px";
                    this.updateWidth(width, 'resize');
                }
            }
        };
        PblNgridColumnDef.prototype.updatePin = function (pin) {
            this.sticky = this.stickyEnd = false;
            switch (pin) {
                case 'start':
                    this.sticky = true;
                    break;
                case 'end':
                    this.stickyEnd = true;
                    break;
            }
            if (this.grid.isInit) {
                this.extApi.cdkTable.updateStickyColumnStyles();
            }
        };
        PblNgridColumnDef.prototype.attach = function (column) {
            if (this._column !== column) {
                this.detach();
                if (column) {
                    this._column = column;
                    column.attach(this);
                    this.name = column.id.replace(/ /g, '_');
                    if (isPblColumn(column)) {
                        this.updatePin(column.pin);
                    }
                }
            }
        };
        PblNgridColumnDef.prototype.detach = function () {
            if (this._column) {
                var col = this._column;
                this._column = undefined;
                col.detach();
            }
        };
        return PblNgridColumnDef;
    }(i4.CdkColumnDef));
    /** @nocollapse */ PblNgridColumnDef.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridColumnDef, deps: [{ token: EXT_API_TOKEN }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ PblNgridColumnDef.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridColumnDef, selector: "[pblNgridColumnDef]", inputs: { column: ["pblNgridColumnDef", "column"] }, outputs: { widthChange: "pblNgridColumnDefWidthChange" }, providers: [
            { provide: i4.CdkColumnDef, useExisting: PblNgridColumnDef },
            { provide: 'MAT_SORT_HEADER_COLUMN_DEF', useExisting: PblNgridColumnDef }
        ], usesInheritance: true, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridColumnDef, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[pblNgridColumnDef]',
                        providers: [
                            { provide: i4.CdkColumnDef, useExisting: PblNgridColumnDef },
                            { provide: 'MAT_SORT_HEADER_COLUMN_DEF', useExisting: PblNgridColumnDef }
                        ],
                    }]
            }], ctorParameters: function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [EXT_API_TOKEN]
                        }] }];
        }, propDecorators: { column: [{
                    type: i0.Input,
                    args: ['pblNgridColumnDef']
                }], widthChange: [{
                    type: i0.Output,
                    args: ['pblNgridColumnDefWidthChange']
                }] } });
    /**
     * Set the widths of an HTMLElement
     * @param el The element to set widths to
     * @param widths The widths, a tuple of 3 strings [ MIN-WIDTH, WIDTH, MAX-WIDTH ]
     */
    function setWidth(el, widths) {
        el.style.minWidth = widths[0];
        el.style.width = widths[1];
        el.style.maxWidth = widths[2];
        // TODO(shlomiassaf)[perf, 4]: Instead of using a tuple for width, use a CSSStyleDeclaration object and just assign the props
        // This will avoid the additional check for %
        // We will need to implement it in all places that `_widths` is updated in `PblNgridColumnDef`
        // Another TODO is to cache the previous `boxSizing` in any case the column definition changes.
        // When the column does not have an explicit `minWidth` set and when the `width` is set explicitly to a % value
        // the logic in `PblNgridColumnDef.updateWidth` will set `minWidth` to the same value in `width`
        // This will cause an overflow unless we apply the border-box model
        if (widths[0] && widths[0].endsWith('%')) {
            el.style.boxSizing = 'border-box';
        }
        else {
            el.style.boxSizing = 'content-box';
        }
    }

    function findCellDefById(cellDefs, colDef, searchParent) {
        var e_1, _a;
        try {
            for (var cellDefs_1 = __values(cellDefs), cellDefs_1_1 = cellDefs_1.next(); !cellDefs_1_1.done; cellDefs_1_1 = cellDefs_1.next()) {
                var cellDef = cellDefs_1_1.value;
                if (cellDef.type) {
                    if (colDef.type && cellDef.type === colDef.type.name) {
                        return cellDef;
                    }
                }
                else {
                    var id = cellDef.name;
                    if (id === colDef.id) {
                        return cellDef;
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (cellDefs_1_1 && !cellDefs_1_1.done && (_a = cellDefs_1.return)) _a.call(cellDefs_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    function findCellDef(registry, colDef, kind, searchParent) {
        var cellDefs = registry.getMulti(kind);
        if (cellDefs) {
            var type = void 0;
            if (isPblColumn(colDef)) {
                switch (kind) {
                    case 'headerCell':
                        if (colDef.headerType) {
                            type = { id: colDef.id, type: colDef.headerType };
                        }
                        break;
                    case 'footerCell':
                        if (colDef.footerType) {
                            type = { id: colDef.id, type: colDef.footerType };
                        }
                        break;
                }
            }
            if (!type) {
                type = colDef;
            }
            var match = findCellDefById(cellDefs, type);
            if (match) {
                return match;
            }
        }
        if (searchParent && registry.parent) {
            return findCellDef(registry.parent, colDef, kind, searchParent);
        }
    }

    /**
     * A column width calculator that, based on all of the columns, calculates the default column width
     * and minimum required row width.
     *
     * The default column width is the width for all columns that does not have a width setting defined.
     * In addition, a `minimumRowWidth` is calculated, which represents the minimum width required width of the row, i.e. table.
     *
     * The `StaticColumnWidthLogic` does not take into account real-time DOM measurements (especially box-model metadata), hence "static".
     * It performs the calculation based on "dry" `PblColumn` metadata input from the user.
     *
     * The `StaticColumnWidthLogic` is less accurate and best used as a measurement baseline followed by a more accurate calculation.
     * This is why it outputs a default column width and not a column specific width.
     */
    var StaticColumnWidthLogic = /** @class */ (function () {
        function StaticColumnWidthLogic() {
            this._agg = {
                pct: 0,
                px: 0,
                minRowWidth: 0,
                pctCount: 0,
                pxCount: 0,
                count: 0 // total columns without a fixed value
            };
        }
        Object.defineProperty(StaticColumnWidthLogic.prototype, "minimumRowWidth", {
            get: function () { return this._agg.minRowWidth; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(StaticColumnWidthLogic.prototype, "defaultColumnWidth", {
            /**
             * Returns the calculated default width for a column.
             * This is the width for columns that does not have a specific width, adjusting them to fit the table.
             * It's important to run this method AFTER aggregating all columns through `addColumn()`.
             * The result contains 2 values, pct and px.
             * pct is the total width in percent that the column should spread taking into account columns with fixed % width.
             * px is the total width in pixels that the column should shrink taking into account columns with fixed pixel width.
             *
             * The algorithm is simple:
             *  1) Sum all columns with fixed percent width
             *  2) From the entire row width (100%) deduct the total fixed width (step 1).
             *     This result represents the % left for all columns without a fixed width (percent and pixel).
             *  3) Sum all columns with fixed pixel width.
             *     The result represent the total amount of width in pixel taken by columns with fixed width.
             *  4) Count all the columns without a fixed width.
             *
             *  For 2 & 3 we get values that we need to spread even between all of the columns without fixed width (percent and pixel).
             *  The exact width is the total percent left (2) minus the total width in pixel taken by columns with fixed with.
             *  We now need to divide the result from 2 & 3 by the result from 4.
             *
             * Both values should be used together on the `width` style property using the `calc` function:
             * e.g.: `calc(${pct}% - ${px}px)`
             *
             * This value is calculated every time it is called, use it once all columns are added.
             */
            get: function () {
                var agg = this._agg;
                var pct = (100 - agg.pct) / agg.count;
                var px = agg.px / agg.count;
                return { pct: pct, px: px };
            },
            enumerable: false,
            configurable: true
        });
        StaticColumnWidthLogic.prototype.addColumn = function (column) {
            var agg = this._agg;
            var width = column.parsedWidth;
            var minWidth = column.minWidth || 0;
            if (width) {
                switch (width.type) {
                    case '%':
                        agg.pctCount += 1;
                        agg.pct += width.value;
                        break;
                    case 'px':
                        agg.pxCount += 1;
                        agg.px += width.value;
                        minWidth = width.value;
                        break;
                    default:
                        if (typeof ngDevMode === 'undefined' || ngDevMode) {
                            throw new Error("Invalid width \"" + column.width + "\" in column " + column.prop + ". Valid values are ##% or ##px (50% / 50px)");
                        }
                        return;
                }
            }
            else if (column.maxWidthLock) {
                agg.pxCount += 1;
                agg.px += column.maxWidth;
            }
            else {
                agg.count += 1;
            }
            agg.minRowWidth += minWidth;
        };
        return StaticColumnWidthLogic;
    }());

    /**
     * Updates the column sizes of the columns provided based on the column definition metadata for each column.
     * The final width represent a static width, it is the value as set in the definition (except column without width, where the calculated global width is set).
     */
    function resetColumnWidths(rowWidth, tableColumns, metaColumns) {
        var e_1, _a, e_2, _b, e_3, _c;
        var _d = rowWidth.defaultColumnWidth, pct = _d.pct, px = _d.px;
        var defaultWidth = "calc(" + pct + "% - " + px + "px)";
        try {
            for (var tableColumns_1 = __values(tableColumns), tableColumns_1_1 = tableColumns_1.next(); !tableColumns_1_1.done; tableColumns_1_1 = tableColumns_1.next()) {
                var c = tableColumns_1_1.value;
                c.setDefaultWidth(defaultWidth);
                c.updateWidth();
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (tableColumns_1_1 && !tableColumns_1_1.done && (_a = tableColumns_1.return)) _a.call(tableColumns_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        try {
            for (var metaColumns_1 = __values(metaColumns), metaColumns_1_1 = metaColumns_1.next(); !metaColumns_1_1.done; metaColumns_1_1 = metaColumns_1.next()) {
                var m = metaColumns_1_1.value;
                try {
                    for (var _e = (e_3 = void 0, __values([m.header, m.footer])), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var c = _f.value;
                        if (c) {
                            c.updateWidth('');
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_c = _e.return)) _c.call(_e);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                // We don't handle groups because they are handled by `PblNgridComponent.resizeRows()`
                // which set the width for each.
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (metaColumns_1_1 && !metaColumns_1_1.done && (_b = metaColumns_1.return)) _b.call(metaColumns_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
    }

    var HiddenColumns = /** @class */ (function () {
        function HiddenColumns() {
            this.hidden = new Set();
            this.allHidden = new Set();
            this.indirect = new Map();
            this.clear(false);
        }
        HiddenColumns.prototype.add = function (columns, indirect) {
            var e_1, _a, e_2, _b;
            var collection;
            if (indirect) {
                collection = this.indirect.get(indirect);
                if (!collection) {
                    this.indirect.set(indirect, collection = new Set());
                }
            }
            else {
                collection = this.hidden;
            }
            var size = collection.size;
            if (columns[0] instanceof PblColumn) {
                try {
                    for (var columns_1 = __values(columns), columns_1_1 = columns_1.next(); !columns_1_1.done; columns_1_1 = columns_1.next()) {
                        var c = columns_1_1.value;
                        collection.add(c.id);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (columns_1_1 && !columns_1_1.done && (_a = columns_1.return)) _a.call(columns_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            else {
                try {
                    for (var columns_2 = __values(columns), columns_2_1 = columns_2.next(); !columns_2_1.done; columns_2_1 = columns_2.next()) {
                        var c = columns_2_1.value;
                        collection.add(c);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (columns_2_1 && !columns_2_1.done && (_b = columns_2.return)) _b.call(columns_2);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            return collection.size !== size;
        };
        /**
         * Show the column.
         */
        HiddenColumns.prototype.remove = function (columns, indirect) {
            var e_3, _a, e_4, _b;
            var collection;
            if (indirect) {
                collection = this.indirect.get(indirect);
                if (!collection) {
                    this.indirect.set(indirect, collection = new Set());
                }
            }
            else {
                collection = this.hidden;
            }
            var size = collection.size;
            if (columns[0] instanceof PblColumn) {
                try {
                    for (var columns_3 = __values(columns), columns_3_1 = columns_3.next(); !columns_3_1.done; columns_3_1 = columns_3.next()) {
                        var c = columns_3_1.value;
                        collection.delete(c.id);
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (columns_3_1 && !columns_3_1.done && (_a = columns_3.return)) _a.call(columns_3);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
            else {
                try {
                    for (var columns_4 = __values(columns), columns_4_1 = columns_4.next(); !columns_4_1.done; columns_4_1 = columns_4.next()) {
                        var c = columns_4_1.value;
                        collection.delete(c);
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (columns_4_1 && !columns_4_1.done && (_b = columns_4.return)) _b.call(columns_4);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
            }
            return collection.size !== size;
        };
        HiddenColumns.prototype.clear = function (onlyHidden) {
            this.hidden.clear();
            if (!onlyHidden) {
                this.indirect.clear();
                this.allHidden.clear();
            }
            else {
                this.syncAllHidden();
            }
        };
        HiddenColumns.prototype.syncAllHidden = function () {
            var e_5, _a, e_6, _b, e_7, _c;
            this.allHidden.clear();
            try {
                for (var _d = __values(this.hidden), _e = _d.next(); !_e.done; _e = _d.next()) {
                    var id = _e.value;
                    this.allHidden.add(id);
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                }
                finally { if (e_5) throw e_5.error; }
            }
            try {
                for (var _f = __values(this.indirect.values()), _g = _f.next(); !_g.done; _g = _f.next()) {
                    var indirect = _g.value;
                    try {
                        for (var indirect_1 = (e_7 = void 0, __values(indirect)), indirect_1_1 = indirect_1.next(); !indirect_1_1.done; indirect_1_1 = indirect_1.next()) {
                            var id = indirect_1_1.value;
                            this.allHidden.add(id);
                        }
                    }
                    catch (e_7_1) { e_7 = { error: e_7_1 }; }
                    finally {
                        try {
                            if (indirect_1_1 && !indirect_1_1.done && (_c = indirect_1.return)) _c.call(indirect_1);
                        }
                        finally { if (e_7) throw e_7.error; }
                    }
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                }
                finally { if (e_6) throw e_6.error; }
            }
            return this;
        };
        return HiddenColumns;
    }());

    var MetaRowsStore = /** @class */ (function () {
        function MetaRowsStore(differs) {
            this.differs = differs;
            this.visibleChanged$ = new rxjs.Subject();
            this.hDiffers = [];
            this.fDiffers = [];
        }
        MetaRowsStore.prototype.setHeader = function (value) {
            var index = value.rowDef.rowIndex;
            this.headers[index] = value;
            if (this.hDiffers[index]) {
                var diff = this.hDiffers[index].diff(value.keys);
                if (diff) {
                    this.visibleChanged$.next({ metaRow: value, changes: diff });
                }
            }
            else {
                this.hDiffers[index] = this.differs.find([]).create();
                this.hDiffers[index].diff(value.keys);
            }
        };
        MetaRowsStore.prototype.setFooter = function (value) {
            var index = value.rowDef.rowIndex;
            this.footers[index] = value;
            if (this.fDiffers[index]) {
                var diff = this.fDiffers[index].diff(value.keys);
                if (diff) {
                    this.visibleChanged$.next({ metaRow: value, changes: diff });
                }
            }
            else {
                this.fDiffers[index] = this.differs.find([]).create();
                this.fDiffers[index].diff(value.keys);
            }
        };
        MetaRowsStore.prototype.updateHeader = function (value) {
            this.setHeader(Object.assign(this.headers[value.rowDef.rowIndex] || {}, value));
        };
        MetaRowsStore.prototype.updateFooter = function (value) {
            this.setFooter(Object.assign(this.footers[value.rowDef.rowIndex] || {}, value));
        };
        MetaRowsStore.prototype.clear = function () {
            this.headers = [];
            this.footers = [];
        };
        MetaRowsStore.prototype.dispose = function () {
            this.visibleChanged$.complete();
        };
        return MetaRowsStore;
    }());

    var PblColumnStore = /** @class */ (function () {
        function PblColumnStore(extApi, differs) {
            var _this = this;
            this.extApi = extApi;
            this.differs = differs;
            this.byId = new Map();
            this.hiddenColumns = new HiddenColumns();
            this._visibleChanged$ = new rxjs.Subject();
            this.grid = extApi.grid;
            this.metaRowsStore = new MetaRowsStore(differs);
            this.resetIds();
            this.resetColumns();
            this.metaRowsStore.visibleChanged$
                .subscribe(function (event) {
                event.changes.forEachOperation(function (record, previousIndex, currentIndex) {
                    if (record.previousIndex == null) {
                        var columns = _this.find(record.item);
                        var col = event.metaRow.kind === 'header' ?
                            event.metaRow.isGroup ? columns.headerGroup : columns.header
                            : event.metaRow.isGroup ? columns.footerGroup : columns.footer;
                        event.metaRow.rowDef.cols.splice(currentIndex, 0, col);
                    }
                    else if (currentIndex == null) {
                        event.metaRow.rowDef.cols.splice(previousIndex, 1);
                    }
                    else {
                        moveItemInArray(event.metaRow.rowDef.cols, previousIndex, currentIndex);
                    }
                });
            });
        }
        Object.defineProperty(PblColumnStore.prototype, "metaHeaderRows", {
            get: function () { return this.metaRowsStore.headers; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblColumnStore.prototype, "metaFooterRows", {
            get: function () { return this.metaRowsStore.footers; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblColumnStore.prototype, "primary", {
            get: function () { return this._primary; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblColumnStore.prototype, "groupStore", {
            get: function () { return this._groupStore; },
            enumerable: false,
            configurable: true
        });
        PblColumnStore.prototype.getColumnsOf = function (row) {
            switch (row.rowType) {
                case 'data':
                case 'header':
                case 'footer':
                    return this.visibleColumns;
                case 'meta-header':
                case 'meta-footer':
                    return row._row.rowDef.cols;
            }
            return [];
        };
        PblColumnStore.prototype.columnRowChange = function () {
            return this._visibleChanged$;
        };
        PblColumnStore.prototype.metaRowChange = function () {
            return this.metaRowsStore.visibleChanged$.asObservable();
        };
        PblColumnStore.prototype.isColumnHidden = function (column) {
            return this.hiddenColumns.hidden.has(column.id);
        };
        PblColumnStore.prototype.clearColumnVisibility = function () {
            this.updateColumnVisibility(undefined, this.allColumns);
        };
        PblColumnStore.prototype.updateColumnVisibility = function (hide, show) {
            var didHide = hide && this.hiddenColumns.add(hide);
            var didShow = show && this.hiddenColumns.remove(show);
            if (didShow || didHide) {
                this.setHidden();
                if (didShow) {
                    // TODO(shlomiassaf) [perf, 4]: Right now we attach all columns, we can improve it by attaching only those "added" (we know them from "changes")
                    this.attachCustomCellTemplates();
                    this.attachCustomHeaderCellTemplates();
                }
                this.checkVisibleChanges();
                // This is mostly required when we un-hide things (didShow === true)
                // However, when we hide, we only need it when the event comes from any are not in the view
                // i.e. areas outside of the grid or areas which are CONTENT of the grid
                this.grid.rowsApi.syncRows();
            }
        };
        PblColumnStore.prototype.addGroupBy = function () {
            var columns = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                columns[_i] = arguments[_i];
            }
            if (this.hiddenColumns.add(columns, 'groupBy')) {
                this.setHidden();
                this.checkVisibleChanges();
            }
        };
        PblColumnStore.prototype.removeGroupBy = function () {
            var columns = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                columns[_i] = arguments[_i];
            }
            if (this.hiddenColumns.remove(columns, 'groupBy')) {
                this.setHidden();
                this.checkVisibleChanges();
            }
        };
        /**
         * Move the provided `column` to the position of the `anchor` column.
         * The new location of the anchor column will be it's original location plus or minus 1, depending on the delta between
         * the columns. If the origin of the `column` is before the `anchor` then the anchor's new position is minus one, otherwise plus 1.
         */
        PblColumnStore.prototype.moveColumn = function (column, anchor) {
            var _a = this, visibleColumns = _a.visibleColumns, allColumns = _a.allColumns;
            var anchorIndex = visibleColumns.indexOf(anchor);
            var columnIndex = visibleColumns.indexOf(column);
            if (anchorIndex > -1 && columnIndex > -1) {
                moveItemInArray(visibleColumns, columnIndex, anchorIndex);
                if (this.hiddenColumns.allHidden.size > 0) {
                    anchorIndex = allColumns.indexOf(anchor);
                    columnIndex = allColumns.indexOf(column);
                }
                moveItemInArray(allColumns, columnIndex, anchorIndex);
                this.checkVisibleChanges();
                return true;
            }
        };
        PblColumnStore.prototype.swapColumns = function (col1, col2) {
            var col1Index = this.visibleColumns.indexOf(col1);
            var col2Index = this.visibleColumns.indexOf(col2);
            if (col1Index > -1 && col2Index > -1) {
                var _a = this, visibleColumns = _a.visibleColumns, allColumns = _a.allColumns;
                visibleColumns[col1Index] = col2;
                visibleColumns[col2Index] = col1;
                if (this.hiddenColumns.allHidden.size) {
                    col1Index = allColumns.indexOf(col1);
                    col2Index = allColumns.indexOf(col2);
                }
                allColumns[col1Index] = col2;
                allColumns[col2Index] = col1;
                this.checkVisibleChanges();
                return true;
            }
            return false;
        };
        PblColumnStore.prototype.find = function (id) {
            return this.byId.get(id);
        };
        PblColumnStore.prototype.getAllHeaderGroup = function () {
            return this._groupStore ? this._groupStore.all : [];
        };
        PblColumnStore.prototype.getStaticWidth = function () {
            var e_1, _a;
            var rowWidth = new StaticColumnWidthLogic();
            try {
                for (var _b = __values(this.visibleColumns), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var column = _c.value;
                    rowWidth.addColumn(column);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return rowWidth;
        };
        PblColumnStore.prototype.invalidate = function (columnOrDefinitionSet) {
            var e_2, _a, e_3, _b, e_4, _c, e_5, _d, e_6, _e, e_7, _f;
            var columnSet = this.lastSet = 'groupStore' in columnOrDefinitionSet
                ? columnOrDefinitionSet
                : PblColumnFactory.fromDefinitionSet(columnOrDefinitionSet).build();
            var groupStore = columnSet.groupStore, table = columnSet.table, header = columnSet.header, footer = columnSet.footer, headerGroup = columnSet.headerGroup;
            this._groupStore = groupStore.clone();
            var rowWidth = new StaticColumnWidthLogic();
            this.resetColumns();
            this.resetIds();
            this.headerColumnDef = {
                rowClassName: (table.header && table.header.rowClassName) || '',
                type: (table.header && table.header.type) || 'fixed',
            };
            this.footerColumnDef = {
                rowClassName: (table.footer && table.footer.rowClassName) || '',
                type: (table.footer && table.footer.type) || 'fixed',
            };
            this._primary = undefined;
            this.hiddenColumnIds = Array.from(this.hiddenColumns.hidden);
            var hidden = this.hiddenColumns.syncAllHidden().allHidden;
            try {
                for (var _g = __values(table.cols), _h = _g.next(); !_h.done; _h = _g.next()) {
                    var def = _h.value;
                    var column = void 0;
                    column = new PblColumn(def, this.groupStore);
                    var columnRecord = this.getColumnRecord(column.id);
                    columnRecord.data = column;
                    this.allColumns.push(column);
                    this.columnIds.push(column.id);
                    column.hidden = hidden.has(column.id);
                    if (!column.hidden) {
                        this.visibleColumns.push(column);
                        this.visibleColumnIds.push(column.id);
                        rowWidth.addColumn(column);
                    }
                    if (column.pIndex) {
                        if (this._primary && i0.isDevMode()) {
                            console.warn("Multiple primary index columns defined: previous: \"" + this._primary.id + "\", current: \"" + column.id + "\"");
                        }
                        this._primary = column;
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_h && !_h.done && (_a = _g.return)) _a.call(_g);
                }
                finally { if (e_2) throw e_2.error; }
            }
            try {
                for (var header_1 = __values(header), header_1_1 = header_1.next(); !header_1_1.done; header_1_1 = header_1.next()) {
                    var rowDef = header_1_1.value;
                    // TODO: this is shady, if we add objects to reoDef type later they will be copied by ref, need proper class with clone() method
                    var newRowDef = Object.assign({}, rowDef);
                    newRowDef.cols = [];
                    var keys = [];
                    try {
                        for (var _j = (e_4 = void 0, __values(rowDef.cols)), _k = _j.next(); !_k.done; _k = _j.next()) {
                            var def = _k.value;
                            var metaCol = this.getColumnRecord(def.id, this.metaColumns);
                            var column = metaCol.header || (metaCol.header = new PblMetaColumn(def));
                            keys.push(column.id);
                            newRowDef.cols.push(column);
                        }
                    }
                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                    finally {
                        try {
                            if (_k && !_k.done && (_c = _j.return)) _c.call(_j);
                        }
                        finally { if (e_4) throw e_4.error; }
                    }
                    this.metaRowsStore.setHeader({ rowDef: newRowDef, keys: keys, kind: 'header' });
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (header_1_1 && !header_1_1.done && (_b = header_1.return)) _b.call(header_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
            try {
                for (var headerGroup_1 = __values(headerGroup), headerGroup_1_1 = headerGroup_1.next(); !headerGroup_1_1.done; headerGroup_1_1 = headerGroup_1.next()) {
                    var rowDef = headerGroup_1_1.value;
                    this._updateGroup(rowDef);
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (headerGroup_1_1 && !headerGroup_1_1.done && (_d = headerGroup_1.return)) _d.call(headerGroup_1);
                }
                finally { if (e_5) throw e_5.error; }
            }
            try {
                for (var footer_1 = __values(footer), footer_1_1 = footer_1.next(); !footer_1_1.done; footer_1_1 = footer_1.next()) {
                    var rowDef = footer_1_1.value;
                    // TODO: this is shady, if we add objects to reoDef type later they will be copied by ref, need proper class with clone() method
                    var newRowDef = Object.assign({}, rowDef);
                    newRowDef.cols = [];
                    var keys = [];
                    try {
                        for (var _l = (e_7 = void 0, __values(rowDef.cols)), _m = _l.next(); !_m.done; _m = _l.next()) {
                            var def = _m.value;
                            var metaCol = this.getColumnRecord(def.id, this.metaColumns);
                            var column = metaCol.footer || (metaCol.footer = new PblMetaColumn(def));
                            keys.push(column.id);
                            newRowDef.cols.push(column);
                        }
                    }
                    catch (e_7_1) { e_7 = { error: e_7_1 }; }
                    finally {
                        try {
                            if (_m && !_m.done && (_f = _l.return)) _f.call(_l);
                        }
                        finally { if (e_7) throw e_7.error; }
                    }
                    this.metaRowsStore.setFooter({ rowDef: newRowDef, keys: keys, kind: 'footer' });
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (footer_1_1 && !footer_1_1.done && (_e = footer_1.return)) _e.call(footer_1);
                }
                finally { if (e_6) throw e_6.error; }
            }
            resetColumnWidths(rowWidth, this.visibleColumns, this.metaColumns);
            this.differ = this.differs.find(this.visibleColumns).create(function (i, c) { return c.id; });
            this.differ.diff(this.visibleColumns);
        };
        PblColumnStore.prototype.updateGroups = function () {
            var e_8, _a, e_9, _b;
            var rowIndex = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                rowIndex[_i] = arguments[_i];
            }
            if (rowIndex.length === 0) {
                try {
                    for (var _c = __values(this.lastSet.headerGroup), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var rowDef = _d.value;
                        this._updateGroup(rowDef);
                    }
                }
                catch (e_8_1) { e_8 = { error: e_8_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                    }
                    finally { if (e_8) throw e_8.error; }
                }
            }
            else {
                var rows = rowIndex.slice();
                try {
                    for (var _e = __values(this.lastSet.headerGroup), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var rowDef = _f.value;
                        var idx = rows.indexOf(rowDef.rowIndex);
                        if (idx > -1) {
                            rows.splice(idx, 1);
                            this._updateGroup(rowDef);
                            if (rows.length === 0) {
                                return;
                            }
                        }
                    }
                }
                catch (e_9_1) { e_9 = { error: e_9_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_9) throw e_9.error; }
                }
            }
        };
        PblColumnStore.prototype.attachCustomCellTemplates = function (columns) {
            var e_10, _a;
            var registry = this.grid.registry;
            if (!columns) {
                columns = this.visibleColumns;
            }
            try {
                for (var _b = __values(this.visibleColumns), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var col = _c.value;
                    var cell = findCellDef(registry, col, 'tableCell', true);
                    if (cell) {
                        col.cellTpl = cell.tRef;
                    }
                    else {
                        var defaultCellTemplate = registry.getMultiDefault('tableCell');
                        col.cellTpl = defaultCellTemplate ? defaultCellTemplate.tRef : this.grid._fbTableCell;
                    }
                    var editorCell = findCellDef(registry, col, 'editorCell', true);
                    if (editorCell) {
                        col.editorTpl = editorCell.tRef;
                    }
                    else {
                        var defaultCellTemplate = registry.getMultiDefault('editorCell');
                        col.editorTpl = defaultCellTemplate ? defaultCellTemplate.tRef : undefined;
                    }
                }
            }
            catch (e_10_1) { e_10 = { error: e_10_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_10) throw e_10.error; }
            }
        };
        PblColumnStore.prototype.attachCustomHeaderCellTemplates = function (columns) {
            var e_11, _a;
            var registry = this.grid.registry;
            if (!columns) {
                columns = [].concat(this.visibleColumns, this.metaColumns);
            }
            var defaultHeaderCellTemplate = registry.getMultiDefault('headerCell') || { tRef: this.grid._fbHeaderCell };
            var defaultFooterCellTemplate = registry.getMultiDefault('footerCell') || { tRef: this.grid._fbFooterCell };
            try {
                for (var columns_1 = __values(columns), columns_1_1 = columns_1.next(); !columns_1_1.done; columns_1_1 = columns_1.next()) {
                    var col = columns_1_1.value;
                    if (isPblColumn(col)) {
                        var headerCellDef = findCellDef(registry, col, 'headerCell', true) || defaultHeaderCellTemplate;
                        var footerCellDef = findCellDef(registry, col, 'footerCell', true) || defaultFooterCellTemplate;
                        col.headerCellTpl = headerCellDef.tRef;
                        col.footerCellTpl = footerCellDef.tRef;
                    }
                    else {
                        if (col.header) {
                            var headerCellDef = findCellDef(registry, col.header, 'headerCell', true) || defaultHeaderCellTemplate;
                            col.header.template = headerCellDef.tRef;
                        }
                        if (col.headerGroup) {
                            var headerCellDef = findCellDef(registry, col.headerGroup, 'headerCell', true) || defaultHeaderCellTemplate;
                            col.headerGroup.template = headerCellDef.tRef;
                        }
                        if (col.footer) {
                            var footerCellDef = findCellDef(registry, col.footer, 'footerCell', true) || defaultFooterCellTemplate;
                            col.footer.template = footerCellDef.tRef;
                        }
                    }
                }
            }
            catch (e_11_1) { e_11 = { error: e_11_1 }; }
            finally {
                try {
                    if (columns_1_1 && !columns_1_1.done && (_a = columns_1.return)) _a.call(columns_1);
                }
                finally { if (e_11) throw e_11.error; }
            }
        };
        PblColumnStore.prototype.dispose = function () {
            this._visibleChanged$.complete();
            this.metaRowsStore.dispose();
        };
        PblColumnStore.prototype._updateGroup = function (columnSet) {
            var e_12, _a;
            var keys = [];
            var allKeys = [];
            var groups = [];
            for (var tIndex = 0; tIndex < this.visibleColumns.length; tIndex++) {
                var columns = [this.visibleColumns[tIndex - 1], this.visibleColumns[tIndex], this.visibleColumns[tIndex + 1]];
                var columnGroups = columns.map(function (c) { return c ? c.getGroupOfRow(columnSet.rowIndex) : undefined; });
                // true when the group exists in one of the columns BUT NOT in the LAST COLUMN (i.e: Its a slave split)
                var groupExists = groups.lastIndexOf(columnGroups[1]) !== -1;
                var column = columns[1];
                var gColumn = column.groupLogic(columnGroups, groupExists);
                if (gColumn !== columnGroups[1]) {
                    column.markNotInGroup(columnGroups[1]);
                    column.markInGroup(gColumn);
                }
                var metaCol = this.getColumnRecord(gColumn.id, this.metaColumns);
                if (!metaCol.headerGroup) {
                    metaCol.headerGroup = gColumn;
                }
                if (groups.lastIndexOf(gColumn) === -1) {
                    allKeys.push(gColumn.id);
                    if (gColumn.isVisible) {
                        keys.push(gColumn.id);
                    }
                }
                gColumn.replace(column);
                groups.push(gColumn);
            }
            var _loop_1 = function (ghost) {
                if (ghost.rowIndex === columnSet.rowIndex) {
                    var id_1 = ghost.id;
                    var idx = allKeys.indexOf(id_1);
                    if (idx !== -1) {
                        allKeys.splice(idx, 1);
                        idx = keys.indexOf(id_1);
                        if (idx !== -1) {
                            keys.splice(idx, 1);
                        }
                        this_1.metaColumns.splice(this_1.metaColumns.findIndex(function (m) { return m.id === id_1; }), 1);
                    }
                    this_1._groupStore.remove(ghost);
                }
            };
            var this_1 = this;
            try {
                for (var _b = __values(this._groupStore.findGhosts()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var ghost = _c.value;
                    _loop_1(ghost);
                }
            }
            catch (e_12_1) { e_12 = { error: e_12_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_12) throw e_12.error; }
            }
            this.metaRowsStore.updateHeader({ rowDef: columnSet, keys: keys, allKeys: allKeys, isGroup: true, kind: 'header' });
        };
        PblColumnStore.prototype.getColumnRecord = function (id, collection) {
            var columnRecord = this.byId.get(id);
            if (!columnRecord) {
                this.byId.set(id, columnRecord = { id: id });
                if (collection) {
                    collection.push(columnRecord);
                }
            }
            return columnRecord;
        };
        PblColumnStore.prototype.setHidden = function () {
            var e_13, _a, e_14, _b;
            var _this = this;
            var hidden = this.hiddenColumns.syncAllHidden().allHidden;
            this.visibleColumns = [];
            try {
                for (var _c = __values(this.allColumns), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var c = _d.value;
                    c.hidden = hidden.has(c.id);
                    if (!c.hidden) {
                        this.visibleColumns.push(c);
                    }
                }
            }
            catch (e_13_1) { e_13 = { error: e_13_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_13) throw e_13.error; }
            }
            try {
                for (var _e = __values(this.metaRowsStore.headers), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var h = _f.value;
                    if (h.isGroup) {
                        h.keys = h.allKeys.filter(function (key) { return _this.find(key).headerGroup.isVisible; });
                    }
                }
            }
            catch (e_14_1) { e_14 = { error: e_14_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                }
                finally { if (e_14) throw e_14.error; }
            }
            resetColumnWidths(this.getStaticWidth(), this.visibleColumns, this.metaColumns);
        };
        PblColumnStore.prototype.resetColumns = function () {
            this.allColumns = [];
            this.visibleColumns = [];
            this.metaColumns = [];
            this.byId.clear();
        };
        PblColumnStore.prototype.resetIds = function () {
            this.columnIds = [];
            this.visibleColumnIds = [];
            this.hiddenColumnIds = [];
            this.metaRowsStore.clear();
        };
        PblColumnStore.prototype.checkVisibleChanges = function () {
            var _this = this;
            if (this.differ) {
                if (!this.columnUpdateInProgress) {
                    this.columnUpdateInProgress = true;
                    Promise.resolve()
                        .then(function () {
                        _this.columnUpdateInProgress = false;
                        var changes = _this.differ.diff(_this.visibleColumns);
                        if (changes) {
                            _this.hiddenColumnIds = Array.from(_this.hiddenColumns.hidden);
                            _this.visibleColumnIds = Array.from(_this.visibleColumns).map(function (c) { return c.id; });
                            _this.columnIds = Array.from(_this.allColumns).map(function (c) { return c.id; });
                            _this._visibleChanged$.next({ columns: _this.visibleColumns, changes: changes });
                            _this.afterColumnPositionChange();
                        }
                    });
                }
            }
            // no differ means we did not invalidate yet, so nothing will change until it start showing
        };
        PblColumnStore.prototype.afterColumnPositionChange = function () {
            // TODO: This shouldn't be here, it should be the responsibility of the caller to clear the context
            // Because now there is not option to control it.
            this.extApi.contextApi.clear(true);
            this.updateGroups();
            this.extApi.widthCalc.resetColumnsWidth();
            // now, any newly added column cells must first spin up to get a size
            // and most importantly have their ngAfterViewInit fired so the resize column will update the sizeInfo of the column!
            this.extApi.rowsApi.syncRows('header', true);
            this.extApi.widthCalc.calcColumnWidth();
        };
        return PblColumnStore;
    }());
    /**
     * Moves an item one index in an array to another.
     * @param array Array in which to move the item.
     * @param fromIndex Starting index of the item.
     * @param toIndex Index to which the item should be moved.
     */
    function moveItemInArray(array, fromIndex, toIndex) {
        var from = clamp(fromIndex, array.length - 1);
        var to = clamp(toIndex, array.length - 1);
        if (from === to) {
            return;
        }
        var target = array[from];
        var delta = to < from ? -1 : 1;
        for (var i = from; i !== to; i += delta) {
            array[i] = array[i + delta];
        }
        array[to] = target;
    }
    function moveItemInArrayExt(array, fromIndex, toIndex, fn) {
        var from = clamp(fromIndex, array.length - 1);
        var to = clamp(toIndex, array.length - 1);
        if (from === to) {
            return;
        }
        var target = array[from];
        var delta = to < from ? -1 : 1;
        for (var i = from; i !== to; i += delta) {
            var next = i + delta;
            fn(array[i], array[next], i, next);
            array[i] = array[next];
        }
        fn(array[to], target, to, from);
        array[to] = target;
    }
    /** Clamps a number between zero and a maximum. */
    function clamp(value, max) {
        return Math.max(0, Math.min(max, value));
    }

    var ColumnApi = /** @class */ (function () {
        function ColumnApi() {
        }
        // workaround, we need a parameter-less constructor since @ngtools/webpack@8.0.4
        // Non @Injectable classes are now getting addded with hard reference to the ctor params which at the class creation point are undefined
        // forwardRef() will not help since it's not inject by angular, we instantiate the class..
        // probably due to https://github.com/angular/angular-cli/commit/639198499973e0f437f059b3c933c72c733d93d8
        ColumnApi.create = function (extApi) {
            var instance = new ColumnApi();
            instance.grid = extApi.grid;
            instance.store = extApi.columnStore;
            instance.extApi = extApi;
            return instance;
        };
        Object.defineProperty(ColumnApi.prototype, "visibleColumnIds", {
            get: function () { return this.store.visibleColumnIds; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ColumnApi.prototype, "hiddenColumnIds", {
            get: function () { return this.store.hiddenColumnIds; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ColumnApi.prototype, "visibleColumns", {
            get: function () { return this.store.visibleColumns; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ColumnApi.prototype, "columns", {
            get: function () { return this.store.allColumns; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ColumnApi.prototype, "columnIds", {
            get: function () { return this.store.columnIds; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ColumnApi.prototype, "totalColumnWidthChange", {
            get: function () {
                var _this = this;
                if (!this._totalColumnWidthChange) {
                    this._totalColumnWidthChange = this.extApi.events
                        .pipe(i1.ON_RESIZE_ROW, 
                    // We might get a null sizeInfo when a new column is added - see syncColumnGroupsSize()
                    operators.map(function (e) { return _this.grid.columnApi.visibleColumns.reduce(function (p, c) { var _a, _b; return (_b = p + ((_a = c.sizeInfo) === null || _a === void 0 ? void 0 : _a.width)) !== null && _b !== void 0 ? _b : 0; }, 0); }));
                }
                return this._totalColumnWidthChange;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Returns the `PblColumn` at the specified index from the list of rendered columns (i.e. not hidden).
         */
        ColumnApi.prototype.findColumnAt = function (renderColumnIndex) {
            return this.store.visibleColumns[renderColumnIndex];
        };
        /**
         * Returns the column matching provided `id`.
         *
         * The search is performed on all known columns.
         */
        ColumnApi.prototype.findColumn = function (id) {
            var result = this.store.find(id);
            if (result) {
                return result.data;
            }
        };
        /**
        * Returns the render index of column or -1 if not found.
        *
        * The render index represents the current location of the column in the group of visible columns.
        */
        ColumnApi.prototype.renderIndexOf = function (column) {
            var c = typeof column === 'string' ? this.findColumn(column) : column;
            return this.store.visibleColumns.indexOf(c);
        };
        /**
         * Returns the index of a column or -1 if not found.
         */
        ColumnApi.prototype.indexOf = function (column) {
            var c = typeof column === 'string' ? this.findColumn(column) : column;
            return this.store.allColumns.indexOf(c);
        };
        ColumnApi.prototype.isColumnHidden = function (column) {
            return this.store.isColumnHidden(column);
        };
        /**
         * Hide columns in the table
         */
        ColumnApi.prototype.hideColumns = function (column) {
            var columns = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                columns[_i - 1] = arguments[_i];
            }
            this.store.updateColumnVisibility(__spreadArray([column], __read(columns)));
        };
        ColumnApi.prototype.showColumns = function (columnOrShowAll) {
            var columns = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                columns[_i - 1] = arguments[_i];
            }
            if (columnOrShowAll === true) {
                this.store.clearColumnVisibility();
            }
            else {
                this.store.updateColumnVisibility(undefined, __spreadArray([columnOrShowAll], __read(columns)));
            }
        };
        /**
         * Update the width of the column with the provided width.
         *
         * The width is set in px or % in the following format: ##% or ##px
         * Examples: '50%', '50px'
         *
         * Resizing the column will trigger a table width resizing event, updating column group if necessary.
         */
        ColumnApi.prototype.resizeColumn = function (column, width) {
            column.updateWidth(width);
            // this.grid.resetColumnsWidth();
            // this.grid.resizeColumns();
        };
        /**
         * Resize the column to best fit it's content.
         *
         * - Content: All of the cells rendered for this column (header, data and footer cells).
         * - Best fit: The width of the cell with the height width measured.
         *
         * The best fit found (width) is then used to call `resizeColumn()`.
         */
        ColumnApi.prototype.autoSizeColumn = function (column) {
            var size = this.findColumnAutoSize(column);
            this.resizeColumn(column, size + "px");
        };
        ColumnApi.prototype.autoSizeColumns = function () {
            var e_1, _c;
            var columns = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                columns[_i] = arguments[_i];
            }
            var cols = columns.length > 0 ? columns : this.visibleColumns;
            try {
                for (var cols_1 = __values(cols), cols_1_1 = cols_1.next(); !cols_1_1.done; cols_1_1 = cols_1.next()) {
                    var column = cols_1_1.value;
                    var size = this.findColumnAutoSize(column);
                    column.updateWidth(size + "px");
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (cols_1_1 && !cols_1_1.done && (_c = cols_1.return)) _c.call(cols_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            // this.grid.resetColumnsWidth();
            // this.grid.resizeColumns();
        };
        /**
         * For each visible column in the table, resize the width to a proportional width relative to the total width provided.
         */
        ColumnApi.prototype.autoSizeToFit = function (totalWidth, options) {
            var e_2, _c;
            if (options === void 0) { options = {}; }
            var wLogic = this.extApi.widthCalc.dynamicColumnWidth;
            var visibleColumns = this.visibleColumns;
            var columnBehavior = options.columnBehavior || (function () { return options; });
            var overflowTotalWidth = 0;
            var totalMinWidth = 0;
            var withMinWidth = [];
            var widthBreakouts = visibleColumns.map(function (column, index) {
                var widthBreakout = wLogic.widthBreakout(column.sizeInfo);
                var instructions = Object.assign(Object.assign({}, (columnBehavior(column) || {})), options);
                overflowTotalWidth += widthBreakout.content;
                totalWidth -= widthBreakout.nonContent;
                if (instructions.keepMinWidth && column.minWidth) {
                    totalMinWidth += column.minWidth;
                    withMinWidth.push(index);
                }
                return Object.assign(Object.assign({}, widthBreakout), { instructions: instructions });
            });
            var p = totalMinWidth / totalWidth;
            var level = (overflowTotalWidth * p - totalMinWidth) / (1 - p);
            try {
                for (var withMinWidth_1 = __values(withMinWidth), withMinWidth_1_1 = withMinWidth_1.next(); !withMinWidth_1_1.done; withMinWidth_1_1 = withMinWidth_1.next()) {
                    var i = withMinWidth_1_1.value;
                    var addition = level * (visibleColumns[i].minWidth / totalMinWidth);
                    widthBreakouts[i].content += addition;
                    overflowTotalWidth += addition;
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (withMinWidth_1_1 && !withMinWidth_1_1.done && (_c = withMinWidth_1.return)) _c.call(withMinWidth_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            for (var i = 0; i < visibleColumns.length; i++) {
                var widthBreakout = widthBreakouts[i];
                var instructions = widthBreakout.instructions;
                var column = visibleColumns[i];
                var r = widthBreakout.content / overflowTotalWidth;
                if (!instructions.keepMinWidth || !column.minWidth) {
                    column.minWidth = undefined;
                }
                if (!instructions.keepMaxWidth || !column.maxWidth) {
                    column.maxWidth = undefined;
                    column.checkMaxWidthLock(column.sizeInfo.width); // if its locked, we need to release...
                }
                // There are 3 scenarios when updating the column
                // 1) if it's a fixed width or we're force into fixed width
                // 2) Not fixed width and width is set (%)
                // 3) Not fixed width an width is not set ( the width depends on the calculated `defaultWidth` done in `this.grid.resetColumnsWidth()` )
                var width = void 0;
                var forceWidthType = instructions.forceWidthType;
                if (forceWidthType === 'px' || (!forceWidthType && column.isFixedWidth)) { // (1)
                    width = totalWidth * r + "px";
                }
                else if (forceWidthType === '%' || (!forceWidthType && column.width)) { // (2)
                    width = 100 * r + "%";
                } // else (3) -> the update is skipped and it will run through resetColumnsWidth
                if (width) {
                    column.updateWidth(width);
                }
            }
            // we now reset the column widths, this will calculate a new `defaultWidth` and set it in all columns but the relevant ones are column from (3)
            // It will also mark all columnDefs for check
            this.extApi.widthCalc.resetColumnsWidth();
            this.extApi.widthCalc.calcColumnWidth();
        };
        ColumnApi.prototype.moveColumn = function (column, anchor) {
            if (isPblColumn(anchor)) {
                return column === anchor ? false : this.store.moveColumn(column, anchor);
            }
            else {
                var a = this.findColumnAt(anchor);
                return a ? this.moveColumn(column, a) : false;
            }
        };
        /**
         * Swap positions between 2 existing columns.
         */
        ColumnApi.prototype.swapColumns = function (col1, col2) {
            return this.store.swapColumns(col1, col2);
        };
        ColumnApi.prototype.addGroupBy = function () {
            var _c;
            var column = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                column[_i] = arguments[_i];
            }
            (_c = this.store).addGroupBy.apply(_c, __spreadArray([], __read(column)));
        };
        ColumnApi.prototype.removeGroupBy = function () {
            var _c;
            var column = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                column[_i] = arguments[_i];
            }
            (_c = this.store).removeGroupBy.apply(_c, __spreadArray([], __read(column)));
        };
        ColumnApi.prototype.findColumnAutoSize = function (column) {
            var e_3, _c;
            var columnDef = column.columnDef;
            var cells = columnDef.queryCellElements();
            for (var i = 0, len = cells.length; i < len; i++) {
                var parentRow = this.extApi.rowsApi.findRowByElement(cells[i].parentElement);
                if (parentRow.rowType === 'header' && parentRow.gridWidthRow) {
                    cells.splice(i, 1);
                    break;
                }
            }
            var size = 0;
            var internalWidth;
            try {
                for (var cells_1 = __values(cells), cells_1_1 = cells_1.next(); !cells_1_1.done; cells_1_1 = cells_1.next()) {
                    var c = cells_1_1.value;
                    if (c.childElementCount <= 1) {
                        var element = (c.firstElementChild || c);
                        internalWidth = element.scrollWidth;
                    }
                    else {
                        internalWidth = 0;
                        var el = c.firstElementChild;
                        do {
                            switch (getComputedStyle(el).position) {
                                case 'sticky':
                                case 'absolute':
                                case 'fixed':
                                    break;
                                default:
                                    internalWidth += el.scrollWidth;
                                    break;
                            }
                        } while (el = el.nextElementSibling);
                    }
                    if (internalWidth > size) {
                        size = internalWidth + 1;
                        // we add 1 pixel because `element.scrollWidth` does not support subpixel values, the width is converted to an integer removing subpixel values (fractions).
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (cells_1_1 && !cells_1_1.done && (_c = cells_1.return)) _c.call(cells_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
            return size;
        };
        return ColumnApi;
    }());

    function initColumnOrMetaRow(element, isFooter) {
        var _c;
        (_c = element.classList).add.apply(_c, __spreadArray([], __read((isFooter ? ['cdk-footer-row', 'pbl-ngrid-footer-row'] : ['cdk-header-row', 'pbl-ngrid-header-row']))));
    }
    function setRowVisibility(element, visible) {
        if (visible) {
            element.classList.remove('pbl-ngrid-row-hidden');
        }
        else {
            element.classList.add('pbl-ngrid-row-hidden');
        }
    }
    function applyMetaRowClass(metaRowsService, metaRows, element, oldMetaRow, newMetaRow) {
        if (oldMetaRow) {
            if (oldMetaRow.rowClassName) {
                element.classList.remove(oldMetaRow.rowClassName);
            }
            metaRowsService.removeMetaRow(metaRows);
        }
        metaRows.meta = newMetaRow;
        if (newMetaRow) {
            if (newMetaRow.rowClassName) {
                element.classList.add(newMetaRow.rowClassName);
            }
            metaRowsService.addMetaRow(metaRows);
        }
    }
    var FIRST_LAST_ROW_SELECTORS = {
        header: {
            selector: 'pbl-ngrid-header-row',
            first: 'pbl-ngrid-first-header-row',
            last: 'pbl-ngrid-last-header-row',
        },
        footer: {
            selector: 'pbl-ngrid-footer-row',
            first: 'pbl-ngrid-first-footer-row',
            last: 'pbl-ngrid-last-footer-row',
        }
    };
    function updateMetaRowFirstLastClass(section, root, prev) {
        var _a, _b;
        var sectionCss = FIRST_LAST_ROW_SELECTORS[section];
        var rows = root.querySelectorAll("." + sectionCss.selector + ":not(.pbl-ngrid-row-visually-hidden):not(.pbl-ngrid-row-hidden)");
        var first = rows[0];
        if (prev.first !== first) {
            (_a = prev.first) === null || _a === void 0 ? void 0 : _a.classList.remove(sectionCss.first);
            first === null || first === void 0 ? void 0 : first.classList.add(sectionCss.first);
        }
        var last = rows[rows.length - 1];
        if (prev.last !== last) {
            (_b = prev.last) === null || _b === void 0 ? void 0 : _b.classList.remove(sectionCss.last);
            last === null || last === void 0 ? void 0 : last.classList.add(sectionCss.last);
        }
        return { first: first, last: last };
    }

    function isPblNgridRowComponent(row) {
        return row.rowType === 'data';
    }
    var PblRowsApi = /** @class */ (function () {
        function PblRowsApi(extApi, zone, cellFactory) {
            var e_1, _b;
            var _this = this;
            this.extApi = extApi;
            this.zone = zone;
            this.cellFactory = cellFactory;
            this.allByElement = new Map();
            this.allRows = new Set();
            this.rows = new Map();
            this.columnRows = new Set();
            this.metaHeaderRows = new Set();
            this.metaFooterRows = new Set();
            this.firstLast = {
                header: {},
                footer: {},
            };
            this.metaRowService = new PblNgridMetaRowService(extApi);
            extApi.onConstructed(function () { return _this.cdkTable = extApi.cdkTable; });
            try {
                for (var _c = __values(['header', 'data', 'footer', 'meta-header', 'meta-footer']), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var type = _d.value;
                    this.rows.set(type, new Set());
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
            /* List to sync events which notify about changes in meta rows and update the first/last rows to have the class marking it is the first/last */
            this.metaRowService.sync
                .pipe(i1.unrx(this))
                .subscribe(function () {
                _this.firstLast.header = updateMetaRowFirstLastClass('header', _this.extApi.element, _this.firstLast.header);
                _this.firstLast.footer = updateMetaRowFirstLastClass('footer', _this.extApi.element, _this.firstLast.footer);
            });
            extApi.columnStore.columnRowChange()
                .pipe(i1.unrx(this))
                .subscribe(function (event) {
                var gridWidthRow = _this.gridWidthRow;
                var requireSizeUpdate = false;
                event.changes.forEachOperation(function (record, previousIndex, currentIndex) {
                    var e_2, _b, e_3, _c, e_4, _d;
                    if (record.previousIndex == null) {
                        try {
                            for (var _e = __values(_this.columnRows), _f = _e.next(); !_f.done; _f = _e.next()) {
                                var r = _f.value;
                                r._createCell(record.item, currentIndex);
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                    }
                    else if (currentIndex == null) {
                        try {
                            for (var _g = __values(_this.columnRows), _h = _g.next(); !_h.done; _h = _g.next()) {
                                var r = _h.value;
                                r._destroyCell(previousIndex);
                            }
                        }
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (_h && !_h.done && (_c = _g.return)) _c.call(_g);
                            }
                            finally { if (e_3) throw e_3.error; }
                        }
                    }
                    else {
                        try {
                            for (var _j = __values(_this.columnRows), _k = _j.next(); !_k.done; _k = _j.next()) {
                                var r = _k.value;
                                r._moveCell(previousIndex, currentIndex);
                            }
                        }
                        catch (e_4_1) { e_4 = { error: e_4_1 }; }
                        finally {
                            try {
                                if (_k && !_k.done && (_d = _j.return)) _d.call(_j);
                            }
                            finally { if (e_4) throw e_4.error; }
                        }
                        if (!requireSizeUpdate && gridWidthRow) {
                            var lastIndex = gridWidthRow.cellsLength - 1;
                            requireSizeUpdate = currentIndex === lastIndex || previousIndex === lastIndex;
                        }
                    }
                });
                if (requireSizeUpdate) {
                    _this.gridWidthRow.updateSize();
                }
            });
            extApi.columnStore.metaRowChange()
                .pipe(i1.unrx(this))
                .subscribe(function (event) {
                var e_5, _b;
                var rows = event.metaRow.kind === 'header' ? _this.metaHeaderRows : _this.metaFooterRows;
                var _loop_1 = function (r) {
                    if (r.row.rowDef.rowIndex === event.metaRow.rowDef.rowIndex) {
                        event.changes.forEachOperation(function (record, previousIndex, currentIndex) {
                            if (record.previousIndex == null) {
                                var columns = _this.extApi.columnStore.find(record.item);
                                var col = event.metaRow.kind === 'header' ?
                                    event.metaRow.isGroup ? columns.headerGroup : columns.header
                                    : event.metaRow.isGroup ? columns.footerGroup : columns.footer;
                                r._createCell(col, currentIndex);
                            }
                            else if (currentIndex == null) {
                                r._destroyCell(previousIndex);
                            }
                            else {
                                r._moveCell(previousIndex, currentIndex);
                            }
                        });
                        return "break";
                    }
                };
                try {
                    for (var rows_1 = __values(rows), rows_1_1 = rows_1.next(); !rows_1_1.done; rows_1_1 = rows_1.next()) {
                        var r = rows_1_1.value;
                        var state_1 = _loop_1(r);
                        if (state_1 === "break")
                            break;
                    }
                }
                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                finally {
                    try {
                        if (rows_1_1 && !rows_1_1.done && (_b = rows_1.return)) _b.call(rows_1);
                    }
                    finally { if (e_5) throw e_5.error; }
                }
            });
            extApi.onConstructed(function () {
                _this.intersection = extApi.viewport.intersection;
                if (_this.intersection.observerMode) {
                    _this.intersection.intersectionChanged
                        .subscribe(function (entries) {
                        var e_6, _b;
                        try {
                            for (var entries_1 = __values(entries), entries_1_1 = entries_1.next(); !entries_1_1.done; entries_1_1 = entries_1.next()) {
                                var e = entries_1_1.value;
                                var row = _this.allByElement.get(e.target);
                                if (isPblNgridRowComponent(row)) {
                                    row._setOutOfViewState(!e.isIntersecting);
                                }
                            }
                        }
                        catch (e_6_1) { e_6 = { error: e_6_1 }; }
                        finally {
                            try {
                                if (entries_1_1 && !entries_1_1.done && (_b = entries_1.return)) _b.call(entries_1);
                            }
                            finally { if (e_6) throw e_6.error; }
                        }
                    });
                }
                else {
                    // only needed for non intersection observer mode
                    // TODO: remove when IntersectionObserver is required
                    var lastScrollState_1 = extApi.viewport.isScrolling;
                    extApi.viewport.scrolling
                        .subscribe(function (scrolling) {
                        if (scrolling === 0 && lastScrollState_1) {
                            // TODO: be smarter here, start from edges, stop when both edge hit in view row
                            // use isOutOfView location (top/bottom) to speed up
                            _this.forceUpdateOutOfView.apply(_this, __spreadArray([], __read(_this.dataRows())));
                        }
                        lastScrollState_1 = !!scrolling;
                    });
                }
            });
            extApi.events
                .pipe(i1.ON_INVALIDATE_HEADERS)
                .subscribe(function (event) {
                var e_7, _b;
                var dataRows = _this.dataRows();
                try {
                    for (var dataRows_1 = __values(dataRows), dataRows_1_1 = dataRows_1.next(); !dataRows_1_1.done; dataRows_1_1 = dataRows_1.next()) {
                        var row = dataRows_1_1.value;
                        row._rebuildCells();
                    }
                }
                catch (e_7_1) { e_7 = { error: e_7_1 }; }
                finally {
                    try {
                        if (dataRows_1_1 && !dataRows_1_1.done && (_b = dataRows_1.return)) _b.call(dataRows_1);
                    }
                    finally { if (e_7) throw e_7.error; }
                }
                // TODO: reset viewport and virtual scroll state/cache/calculations
            });
            // Handle item moves to update the context with the new index
            extApi.events
                .subscribe(function (event) {
                if (event.kind === 'onBeforeMoveItem') {
                    try {
                        var fromIndex = event.fromIndex, toIndex = event.toIndex;
                        var main = extApi.grid.rowsApi.findDataRowByDsIndex(fromIndex);
                        if (fromIndex < toIndex) {
                            for (var i = fromIndex + 1; i <= toIndex; i++) {
                                extApi.grid.rowsApi.findDataRowByDsIndex(i).context.dsIndex -= 1;
                            }
                        }
                        else {
                            for (var i = fromIndex - 1; i >= toIndex; i--) {
                                extApi.grid.rowsApi.findDataRowByDsIndex(i).context.dsIndex += 1;
                            }
                        }
                        main.context.dsIndex = toIndex;
                    }
                    catch (err) {
                    }
                }
            });
        }
        PblRowsApi.prototype.forceUpdateOutOfView = function () {
            var e_8, _b, e_9, _c;
            var rows = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                rows[_i] = arguments[_i];
            }
            if (this.intersection.observerMode) {
                var entries = this.intersection.snapshot();
                try {
                    for (var entries_2 = __values(entries), entries_2_1 = entries_2.next(); !entries_2_1.done; entries_2_1 = entries_2.next()) {
                        var e = entries_2_1.value;
                        var row = this.allByElement.get(e.target);
                        if (isPblNgridRowComponent(row)) {
                            row._setOutOfViewState(!e.isIntersecting);
                        }
                    }
                }
                catch (e_8_1) { e_8 = { error: e_8_1 }; }
                finally {
                    try {
                        if (entries_2_1 && !entries_2_1.done && (_b = entries_2.return)) _b.call(entries_2);
                    }
                    finally { if (e_8) throw e_8.error; }
                }
            }
            else {
                var clientRect = this.extApi.viewport.getBoundingClientRects.clientRect;
                try {
                    for (var rows_2 = __values(rows), rows_2_1 = rows_2.next(); !rows_2_1.done; rows_2_1 = rows_2.next()) {
                        var row = rows_2_1.value;
                        row._setOutOfViewState(isOutOfView(row, clientRect));
                    }
                }
                catch (e_9_1) { e_9 = { error: e_9_1 }; }
                finally {
                    try {
                        if (rows_2_1 && !rows_2_1.done && (_c = rows_2.return)) _c.call(rows_2);
                    }
                    finally { if (e_9) throw e_9.error; }
                }
            }
        };
        PblRowsApi.prototype.addRow = function (row) {
            this.allRows.add(row);
            this.allByElement.set(row.element, row);
            var rows = this.rows.get(row.rowType);
            rows.add(row);
            switch (row.rowType) {
                case 'header':
                    if (row.gridWidthRow) {
                        this.gridWidthRow = row;
                    }
                case 'data': // tslint:disable-line: no-switch-case-fall-through
                    this.intersection.track(row.element);
                case 'footer': // tslint:disable-line: no-switch-case-fall-through
                    this.columnRows.add(row);
                    break;
                case 'meta-header':
                    this.metaHeaderRows.add(row);
                    break;
                case 'meta-footer':
                    this.metaFooterRows.add(row);
                    break;
            }
        };
        PblRowsApi.prototype.removeRow = function (row) {
            this.allRows.delete(row);
            this.allByElement.delete(row.element);
            var rows = this.rows.get(row.rowType);
            if (rows) {
                rows.delete(row);
            }
            switch (row.rowType) {
                case 'header':
                    if (row.gridWidthRow && row === this.gridWidthRow) {
                        this.gridWidthRow = undefined;
                    }
                case 'data': // tslint:disable-line: no-switch-case-fall-through
                    this.intersection.untrack(row.element);
                case 'footer': // tslint:disable-line: no-switch-case-fall-through
                    this.columnRows.delete(row);
                    break;
                case 'meta-header':
                    this.metaHeaderRows.delete(row);
                    break;
                case 'meta-footer':
                    this.metaFooterRows.delete(row);
                    break;
            }
        };
        PblRowsApi.prototype.dataRows = function () {
            return Array.from(this.rows.get('data'));
        };
        PblRowsApi.prototype.findRowByElement = function (element) {
            return this.allByElement.get(element);
        };
        PblRowsApi.prototype.findDataRowByDsIndex = function (index) {
            var e_10, _b;
            var _a;
            try {
                for (var _c = __values(this.dataRows()), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var r = _d.value;
                    if (((_a = r.context) === null || _a === void 0 ? void 0 : _a.dsIndex) === index) {
                        return r;
                    }
                }
            }
            catch (e_10_1) { e_10 = { error: e_10_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                }
                finally { if (e_10) throw e_10.error; }
            }
        };
        PblRowsApi.prototype.findDataRowByIndex = function (index) {
            var e_11, _b;
            try {
                for (var _c = __values(this.dataRows()), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var r = _d.value;
                    if (r.rowIndex === index) {
                        return r;
                    }
                }
            }
            catch (e_11_1) { e_11 = { error: e_11_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                }
                finally { if (e_11) throw e_11.error; }
            }
        };
        PblRowsApi.prototype.findDataRowByIdentity = function (identity) {
            var e_12, _b;
            var _a;
            try {
                for (var _c = __values(this.dataRows()), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var r = _d.value;
                    if (((_a = r.context) === null || _a === void 0 ? void 0 : _a.identity) === identity) {
                        return r;
                    }
                }
            }
            catch (e_12_1) { e_12 = { error: e_12_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                }
                finally { if (e_12) throw e_12.error; }
            }
        };
        PblRowsApi.prototype.findColumnRow = function (type) {
            return Array.from(this.rows.get(type))
                .find(function (r) { return r.gridWidthRow === false; });
        };
        PblRowsApi.prototype.syncRows = function (rowType) {
            var e_13, _b, e_14, _c, e_15, _d;
            var _this = this;
            if (rowType === void 0) { rowType = false; }
            var rowsIndex = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                rowsIndex[_i - 1] = arguments[_i];
            }
            if (!i0.NgZone.isInAngularZone()) {
                this.zone.run(function () { return _this.syncRows.apply(_this, __spreadArray([rowType], __read(rowsIndex))); });
                return;
            }
            var detectChanges = typeof rowType === 'boolean'
                ? rowType
                : typeof rowsIndex[0] === 'boolean'
                    ? rowsIndex.shift()
                    : false;
            var rows;
            var useSpecificRows = rowsIndex.length > 0;
            switch (rowType) {
                case 'header':
                case 'data':
                case 'footer':
                case 'meta-header':
                case 'meta-footer':
                    rows = this.rows.get(rowType);
                    break;
                default: // boolean or 'all'
                    useSpecificRows = false;
                    rows = this.allRows;
                    break;
            }
            if (!useSpecificRows) {
                try {
                    for (var _e = __values(Array.from(rows)), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var r = _f.value;
                        r.ngDoCheck();
                    }
                }
                catch (e_13_1) { e_13 = { error: e_13_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_13) throw e_13.error; }
                }
            }
            else {
                try {
                    for (var rowsIndex_1 = __values(rowsIndex), rowsIndex_1_1 = rowsIndex_1.next(); !rowsIndex_1_1.done; rowsIndex_1_1 = rowsIndex_1.next()) {
                        var index = rowsIndex_1_1.value;
                        try {
                            for (var _g = (e_15 = void 0, __values(Array.from(rows))), _h = _g.next(); !_h.done; _h = _g.next()) {
                                var r = _h.value;
                                if (r.rowIndex === index) {
                                    r.ngDoCheck();
                                }
                            }
                        }
                        catch (e_15_1) { e_15 = { error: e_15_1 }; }
                        finally {
                            try {
                                if (_h && !_h.done && (_d = _g.return)) _d.call(_g);
                            }
                            finally { if (e_15) throw e_15.error; }
                        }
                    }
                }
                catch (e_14_1) { e_14 = { error: e_14_1 }; }
                finally {
                    try {
                        if (rowsIndex_1_1 && !rowsIndex_1_1.done && (_c = rowsIndex_1.return)) _c.call(rowsIndex_1);
                    }
                    finally { if (e_14) throw e_14.error; }
                }
            }
        };
        return PblRowsApi;
    }());
    function isOutOfView(row, viewPortRect, location) {
        var elRect = row.element.getBoundingClientRect();
        var isInsideOfView;
        switch (location) {
            case 'top':
                isInsideOfView = elRect.bottom >= viewPortRect.top;
                break;
            case 'bottom':
                isInsideOfView = elRect.top <= viewPortRect.bottom;
                break;
            default:
                isInsideOfView = (elRect.bottom >= viewPortRect.top && elRect.top <= viewPortRect.bottom);
                break;
        }
        return !isInsideOfView;
    }

    /**
     * Tokens for symboles that will cause cyclic dependencies.
     */
    var PBL_NGRID_COMPONENT = new i0.InjectionToken('PblNgridComponent');

    /** @internal */
    var PLUGIN_STORE = new Map();
    function ngridPlugin(metadata, target) {
        if (metadata.runOnce) {
            metadata.runOnce();
        }
        PLUGIN_STORE.set(metadata.id, Object.assign(Object.assign({}, metadata), { target: target }));
        return metadata.id;
    }

    var NGRID_PLUGIN_CONTEXT = new WeakMap();
    var CREATED$ = new rxjs.Subject();
    var REGISTERED_TO_CREATE = new WeakSet();
    /** @internal */
    var PblNgridPluginContext = /** @class */ (function () {
        function PblNgridPluginContext() {
            this._events = new rxjs.Subject();
            this.events = this._events.asObservable();
        }
        // workaround, we need a parameter-less constructor since @ngtools/webpack@8.0.4
        // Non @Injectable classes are now getting addded with hard reference to the ctor params which at the class creation point are undefined
        // forwardRef() will not help since it's not inject by angular, we instantiate the class..
        // probably due to https://github.com/angular/angular-cli/commit/639198499973e0f437f059b3c933c72c733d93d8
        PblNgridPluginContext.create = function (injector, extApi) {
            if (NGRID_PLUGIN_CONTEXT.has(extApi.grid)) {
                if (typeof ngDevMode === 'undefined' || ngDevMode) {
                    throw new Error("Grid instance is already registered for extensions.");
                }
                return;
            }
            var instance = new PblNgridPluginContext();
            NGRID_PLUGIN_CONTEXT.set(extApi.grid, instance);
            instance.grid = extApi.grid;
            instance.injector = injector;
            instance.extApi = extApi;
            instance.controller = new PblNgridPluginController(instance);
            return {
                plugin: instance,
                init: function () { return CREATED$.next({ table: instance.grid, controller: instance.controller }); },
            };
        };
        PblNgridPluginContext.prototype.emitEvent = function (event) {
            this._events.next(event);
        };
        PblNgridPluginContext.prototype.destroy = function () {
            if (!NGRID_PLUGIN_CONTEXT.has(this.grid)) {
                if (typeof ngDevMode === 'undefined' || ngDevMode) {
                    throw new Error("Grid is not registered.");
                }
                return;
            }
            this._events.complete();
            NGRID_PLUGIN_CONTEXT.delete(this.grid);
        };
        return PblNgridPluginContext;
    }());
    var PblNgridPluginController = /** @class */ (function () {
        function PblNgridPluginController(context) {
            this.context = context;
            this.plugins = new Map();
            this.grid = context.grid;
            this.extApi = context.extApi;
            this.events = context.events;
        }
        PblNgridPluginController.onCreatedSafe = function (token, fn) {
            if (!REGISTERED_TO_CREATE.has(token)) {
                REGISTERED_TO_CREATE.add(token);
                PblNgridPluginController.created.subscribe(function (event) { return fn(event.table, event.controller); });
            }
        };
        PblNgridPluginController.find = function (grid) {
            var context = NGRID_PLUGIN_CONTEXT.get(grid);
            if (context) {
                return context.controller;
            }
        };
        PblNgridPluginController.findPlugin = function (grid, name) {
            var _a;
            return (_a = PblNgridPluginController.find(grid)) === null || _a === void 0 ? void 0 : _a.getPlugin(name);
        };
        Object.defineProperty(PblNgridPluginController.prototype, "injector", {
            get: function () { return this.context.injector; },
            enumerable: false,
            configurable: true
        });
        /**
         * A Simple shortcut to the `onInit` event which is fired once.
         * If the grid has already been init the event will fire immediately, otherwise it will emit once when `onInit`
         * occurs and cleanup the subscription.
         *
         * The boolean value emitted reflects the state it was emitted on.
         * false - grid was already initialized
         * true - grid was just initialized
         *
         * In other words, if you get false, it means you called this method when the grid was already initialized.
         */
        PblNgridPluginController.prototype.onInit = function () {
            return this.grid.isInit ? rxjs.of(false) : this.events.pipe(i1.ON_INIT, operators.mapTo(true));
        };
        PblNgridPluginController.prototype.hasPlugin = function (name) {
            return this.plugins.has(name);
        };
        PblNgridPluginController.prototype.getPlugin = function (name) {
            return this.plugins.get(name);
        };
        PblNgridPluginController.prototype.ensurePlugin = function (name) {
            return this.getPlugin(name) || this.createPlugin(name);
        };
        /**
         * Registers the `plugin` with the `name` with the `table`
         */
        PblNgridPluginController.prototype.setPlugin = function (name, plugin) {
            var _this = this;
            if (!PLUGIN_STORE.has(name)) {
                if (typeof ngDevMode === 'undefined' || ngDevMode) {
                    throw new Error("Unknown plugin " + name + ".");
                }
                return;
            }
            if (this.plugins.has(name)) {
                if (typeof ngDevMode === 'undefined' || ngDevMode) {
                    throw new Error("Plugin " + name + " is already registered for this grid.");
                }
                return;
            }
            this.plugins.set(name, plugin);
            return function (tbl) { return _this.grid === tbl && _this.plugins.delete(name); };
        };
        /**
         * Checks if the grid is declared in a location within the DI that has access to an ancestor token.
         * For example, if we want to use `createPlugin()` only if the grid is defined in a module that has a specific parent module imported into it
         * we will use `hasAncestor(MyParentModule)`
         */
        PblNgridPluginController.prototype.hasAncestor = function (token) {
            return !!this.injector.get(token, null, i0.InjectFlags.Optional);
        };
        PblNgridPluginController.prototype.createPlugin = function (name) {
            if (!PLUGIN_STORE.has(name)) {
                if (typeof ngDevMode === 'undefined' || ngDevMode) {
                    throw new Error("Unknown plugin " + name + ".");
                }
                return;
            }
            var metadata = PLUGIN_STORE.get(name);
            var methodName = metadata.factory;
            if (!methodName) {
                if (typeof ngDevMode === 'undefined' || ngDevMode) {
                    throw new Error("Invalid plugin configuration for " + name + ", no factory metadata.");
                }
                return;
            }
            else if (typeof metadata.target[methodName] !== 'function') {
                if (typeof ngDevMode === 'undefined' || ngDevMode) {
                    throw new Error("Invalid plugin configuration for " + name + ", factory metadata does not point to a function.");
                }
                return;
            }
            return metadata.target[methodName](this.grid, this.context.injector);
        };
        return PblNgridPluginController;
    }());
    PblNgridPluginController.created = CREATED$.asObservable();

    var PBL_NGRID_BASE_ROW_TEMPLATE = "<ng-container #viewRef></ng-container>";
    // tslint:disable-next-line: no-conflicting-lifecycle
    var PblNgridBaseRowComponent = /** @class */ (function () {
        function PblNgridBaseRowComponent(grid, cdRef, elementRef) {
            this.cdRef = cdRef;
            this._cells = [];
            this._attached = true;
            this.element = elementRef.nativeElement;
            if (grid) {
                this.grid = grid;
            }
            this.onCtor();
        }
        Object.defineProperty(PblNgridBaseRowComponent.prototype, "height", {
            get: function () {
                return this.element.getBoundingClientRect().height;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblNgridBaseRowComponent.prototype, "cellsLength", {
            get: function () { return this._cells.length; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblNgridBaseRowComponent.prototype, "attached", {
            /**
             * An attached row will run change detection on it's children.
             * All rows are attached by default.
             */
            get: function () { return this._attached; },
            enumerable: false,
            configurable: true
        });
        PblNgridBaseRowComponent.prototype.ngOnInit = function () {
            if (!this.grid) {
                if (typeof ngDevMode === 'undefined' || ngDevMode) {
                    throw new Error("When a grid row is used outside the scope of a grid, you must provide the grid instance.");
                }
            }
            this.resolveTokens();
            this.element.setAttribute('data-rowtype', this.rowType);
            this._extApi.rowsApi.addRow(this);
        };
        PblNgridBaseRowComponent.prototype.ngAfterViewInit = function () {
            var e_1, _b;
            try {
                for (var _c = __values(this._extApi.columnStore.getColumnsOf(this)), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var c = _d.value;
                    this._createCell(c);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this.detectChanges();
        };
        PblNgridBaseRowComponent.prototype.ngDoCheck = function () {
            if (this._attached && this.grid) {
                this.detectChanges();
            }
        };
        PblNgridBaseRowComponent.prototype.ngOnDestroy = function () {
            var _a;
            i1.unrx.kill(this);
            (_a = this._extApi) === null || _a === void 0 ? void 0 : _a.rowsApi.removeRow(this);
        };
        /**
         * Marks the row as attached.
         * Rows are attached by default.
         * An attached row takes part in the change detection process
         */
        PblNgridBaseRowComponent.prototype._attach = function () {
            if (!this._attached) {
                this._attached = true;
                return true;
            }
            return false;
        };
        /**
         * Marks the row as detached.
         * A detached row DOWS NOT take part in the change detection process.
         *
         * Usually when the rendering engine cache row elements for performance, these should be detached when cached and re-attached when returned into view.
         */
        PblNgridBaseRowComponent.prototype._detach = function () {
            if (this._attached) {
                this._attached = false;
                return true;
            }
            return false;
        };
        PblNgridBaseRowComponent.prototype._createCell = function (column, atIndex) {
            if (!this.canCreateCell || this.canCreateCell(column, atIndex)) {
                var cell = this.createComponent(column, atIndex);
                cell.instance.setOwner(this);
                if (this.cellCreated) {
                    this.cellCreated(column, cell);
                }
            }
        };
        PblNgridBaseRowComponent.prototype._destroyCell = function (cellOrCellIndex) {
            var cell = typeof cellOrCellIndex === 'number' ? this._cells[cellOrCellIndex] : cellOrCellIndex;
            if (cell) {
                var index = this._cells.indexOf(cell);
                if (!this.canDestroyCell || this.canDestroyCell(cell)) {
                    var len = this._cells.length;
                    this._viewRef.remove(index);
                    if (len === this._cells.length) {
                        this._cells.splice(index, 1);
                    }
                    if (this.cellDestroyed) {
                        this.cellDestroyed(cell, index);
                    }
                }
            }
        };
        PblNgridBaseRowComponent.prototype._moveCell = function (fromIndex, toIndex) {
            var _this = this;
            var cmp = this._cells[fromIndex];
            if (cmp) {
                if (!this.canMoveCell || this.canMoveCell(fromIndex, toIndex, cmp)) {
                    this._viewRef.move(cmp.hostView, toIndex);
                    moveItemInArrayExt(this._cells, fromIndex, toIndex, function (previousItem, currentItem, previousIndex, currentIndex) {
                        if (_this.cellMoved) {
                            _this.cellMoved(previousItem, currentItem, previousIndex, currentIndex);
                        }
                    });
                }
            }
        };
        PblNgridBaseRowComponent.prototype.createComponent = function (column, atIndex) {
            var _this = this;
            var viewRefLength = this._viewRef.length;
            if (!atIndex && atIndex !== 0) {
                atIndex = viewRefLength;
            }
            atIndex = Math.min(viewRefLength, atIndex);
            var cell = this._viewRef.createComponent(this._extApi.rowsApi.cellFactory.getComponentFactory(this), atIndex, this.cellInjector);
            this._cells.splice(atIndex, 0, cell);
            cell.onDestroy(function () { return _this._cells.splice(_this._cells.indexOf(cell), 1); });
            return cell;
        };
        /**
         * Resolves the extensions API and the injector to be used when creating cells.
         */
        PblNgridBaseRowComponent.prototype.resolveTokens = function () {
            var _a;
            // The cells require the extApi and grid to live on the DI tree.
            // In the case of row it might not be there since the row is defined outside of the grid somewhere
            // Row's are defined view templates so their DI tree depended on their location hence we need to verify
            // that we can get the extApi from the viewRef's injector, if so, great if not we need to extend the injector we use
            // to build cells.
            var injector = (_a = this._viewRef) === null || _a === void 0 ? void 0 : _a.injector;
            var extApi = injector === null || injector === void 0 ? void 0 : injector.get(EXT_API_TOKEN, null);
            if (!extApi) {
                // _extApi might be here already...
                this._extApi = this._extApi || PblNgridPluginController.find(this.grid).extApi;
                this.cellInjector = i0.Injector.create({
                    providers: [
                        { provide: PBL_NGRID_COMPONENT, useValue: this.grid },
                        { provide: this.grid.constructor, useValue: this.grid },
                        { provide: EXT_API_TOKEN, useValue: this._extApi },
                    ],
                    parent: injector,
                });
            }
            else {
                this._extApi = this._extApi || extApi;
                this.cellInjector = injector;
            }
        };
        return PblNgridBaseRowComponent;
    }());
    /** @nocollapse */ PblNgridBaseRowComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridBaseRowComponent, deps: [{ token: PBL_NGRID_COMPONENT, optional: true }, { token: i0__namespace.ChangeDetectorRef }, { token: i0__namespace.ElementRef }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ PblNgridBaseRowComponent.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridBaseRowComponent, viewQueries: [{ propertyName: "_viewRef", first: true, predicate: ["viewRef"], descendants: true, read: i0.ViewContainerRef, static: true }], ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridBaseRowComponent, decorators: [{
                type: i0.Directive
            }], ctorParameters: function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [PBL_NGRID_COMPONENT]
                        }, {
                            type: i0.Optional
                        }] }, { type: i0__namespace.ChangeDetectorRef }, { type: i0__namespace.ElementRef }];
        }, propDecorators: { _viewRef: [{
                    type: i0.ViewChild,
                    args: ['viewRef', { read: i0.ViewContainerRef, static: true }]
                }] } });

    var currentItemArgs;
    var currentRow;
    var RowToRepeaterBridge = /** @class */ (function () {
        function RowToRepeaterBridge() {
        }
        RowToRepeaterBridge.prototype.bridgeRow = function (row) {
            var itemArgs = currentItemArgs;
            currentItemArgs = undefined;
            currentRow = row;
            return itemArgs;
        };
        RowToRepeaterBridge.prototype.bridgeContext = function (itemArgs, createView) {
            currentRow = undefined;
            currentItemArgs = itemArgs;
            var view = createView();
            if (view.rootNodes[0] !== currentRow.element) {
                if (typeof ngDevMode === 'undefined' || ngDevMode) {
                    throw new Error("Invalid view state, current row element is not the current rendered element!");
                }
            }
            currentRow = currentItemArgs = undefined;
            return view;
        };
        return RowToRepeaterBridge;
    }());
    var rowContextBridge = new RowToRepeaterBridge();

    var PBL_NGRID_ROW_TEMPLATE = '<ng-content select=".pbl-ngrid-row-prefix"></ng-content><ng-container #viewRef></ng-container><ng-content select=".pbl-ngrid-row-suffix"></ng-content>';
    var PblNgridRowComponent = /** @class */ (function (_super) {
        __extends(PblNgridRowComponent, _super);
        function PblNgridRowComponent() {
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            _this.rowType = 'data';
            /** Indicates if intersection observer is on, detecting outOfView state for us */
            _this.observerMode = true;
            _this.outOfView = false;
            return _this;
        }
        Object.defineProperty(PblNgridRowComponent.prototype, "rowIndex", {
            get: function () { return this._rowIndex; },
            enumerable: false,
            configurable: true
        });
        PblNgridRowComponent.prototype.ngOnInit = function () {
            _super.prototype.ngOnInit.call(this);
            this.updateRow();
            // Doing nothing if IntersectionObserver is enable, otherwise updates the initial state
            this.updateOutOfView();
        };
        PblNgridRowComponent.prototype.ngOnDestroy = function () {
            var _a;
            _super.prototype.ngOnDestroy.call(this);
            (_a = this.context) === null || _a === void 0 ? void 0 : _a.detachRow(this);
        };
        PblNgridRowComponent.prototype.updateRow = function () {
            if (this.currRow !== this.context.$implicit) {
                this.prevRow = this.currRow;
                this.currRow = this.context.$implicit;
                if (this.currRow) {
                    if (this.grid.rowClassUpdate && this.grid.rowClassUpdateFreq === 'item') {
                        this.updateHostClass();
                    }
                    this.identityUpdated();
                }
                return true;
            }
            return false;
        };
        PblNgridRowComponent.prototype.getCell = function (index) {
            var _a;
            return (_a = this._cells[index]) === null || _a === void 0 ? void 0 : _a.instance;
        };
        PblNgridRowComponent.prototype.getCellById = function (id) {
            var _a;
            var cellViewIndex = this._extApi.columnApi.renderIndexOf(id);
            return (_a = this._cells[cellViewIndex]) === null || _a === void 0 ? void 0 : _a.instance;
        };
        /**
         * Rebuild the cells rendered.
         * This should be called when the columns have changed and new columns created in the column store.
         *
         * The new columns are new instances, clones of the previous columns and they DONT have a column definition!
         * This method will iterate over existing cells, updating each cell with the new column now in it's location and creating a column def for it.
         * If there are more cells rendered then in the store, it will remove those extra cells
         * If there are less cells rendered then in the store, it will create new ones.
         * This will ensure we don't create or remove cells unless we need to, saving on DOM operations.
         */
        PblNgridRowComponent.prototype._rebuildCells = function () {
            var columns = this._extApi.columnStore.getColumnsOf(this);
            this.context._rebuildCells(this._extApi.columnStore.allColumns);
            var targetLen = columns.length;
            for (var i = 0; i < targetLen; i++) {
                var cellCmpRef = this._cells[i];
                if (!cellCmpRef) {
                    this._createCell(columns[i]);
                }
                else {
                    this.attachColumn(columns[i], cellCmpRef);
                }
            }
            var currentLen = this.cellsLength;
            while (currentLen > targetLen) {
                this._destroyCell(--currentLen);
            }
            this.detectChanges();
        };
        /**
         * Updates the outOfView state of this row and sync it with the context
         * If the context's state is different from the new outOfView state, will invoke a change detection cycle.
         * @internal
         */
        PblNgridRowComponent.prototype._setOutOfViewState = function (outOfView) {
            var _a;
            if (this.outOfView !== outOfView) {
                this.outOfView = outOfView;
                if (((_a = this.context) === null || _a === void 0 ? void 0 : _a.outOfView) !== outOfView) {
                    this.context.outOfView = outOfView;
                    // TODO: If scrolling, mark the row for check and update only after scroll is done
                    this.ngDoCheck();
                }
            }
        };
        /**
         * Updates the `outOfView` flag of the context attached to this row
         *
         * This method is backward compatible to support browser without the IntersectionObservable API.
         *
         * If the browser DOES NOT support IntersectionObserver it will calculate the state using bounding rect APIs (force param has no effect, always true).
         * If the browser support IntersectionObserver it will do nothing when force is not set to true but when * set to true it will use
         * the IntersectionObserver `takeRecords` method to update the outOfView state.
         *
         * > NOTE that this method has a direct impact on performance as it uses DOM apis that trigger layout reflows.
         * Use with caution.
         */
        PblNgridRowComponent.prototype.updateOutOfView = function (force) {
            if (!this.observerMode || force) {
                this._extApi.rowsApi.forceUpdateOutOfView(this);
            }
        };
        PblNgridRowComponent.prototype.onCtor = function () {
            var _b = rowContextBridge.bridgeRow(this), context = _b.context, index = _b.index;
            this.grid = context.grid;
            this._extApi = PblNgridPluginController.find(this.grid).extApi;
            this._rowIndex = index;
            this.context = context;
            this.context.attachRow(this);
        };
        PblNgridRowComponent.prototype.detectChanges = function () {
            var e_1, _b;
            if (this.grid.rowClassUpdate && this.grid.rowClassUpdateFreq === 'ngDoCheck') {
                this.updateHostClass();
            }
            try {
                for (var _c = __values(this._cells), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var cell = _d.value;
                    // TODO: the cells are created through code which mean's that they don't belong
                    // to the CD tree and we need to manually mark them for checking
                    // We can customize the diffing, detect context changes internally and only trigger these cells which have changed!
                    cell.instance.setContext(this.context);
                    cell.changeDetectorRef.detectChanges();
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        PblNgridRowComponent.prototype.updateHostClass = function () {
            var e_2, _b, e_3, _c, e_4, _d;
            var el = this.element;
            // if there is an updater, work with it
            // otherwise, clear previous classes that got applied (assumed a live binding change of the updater function)
            // users should be aware to tear down the updater only when they want to stop this feature, if the goal is just to toggle on/off
            // it's better to set the frequency to `none` and return nothing from the function (replace it) so the differ is not nuked.
            if (this.grid.rowClassUpdate) {
                if (!this._classDiffer) {
                    this._classDiffer = new i1.StylingDiffer('NgClass', 1 /* TrimProperties */ | 2 /* AllowSubKeys */ | 4 /* AllowStringValue */ | 16 /* ForceAsMap */);
                    this._lastClass = new Set();
                }
                var newValue = this.grid.rowClassUpdate(this.context);
                this._classDiffer.setInput(newValue);
                if (this._classDiffer.updateValue()) {
                    var lastClass = this._lastClass;
                    this._lastClass = new Set();
                    var value = this._classDiffer.value || {};
                    try {
                        for (var _e = __values(Object.keys(value)), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var key = _f.value;
                            if (value[key]) {
                                el.classList.add(key);
                                this._lastClass.add(key);
                            }
                            else {
                                el.classList.remove(key);
                            }
                            lastClass.delete(key);
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    if (lastClass.size > 0) {
                        try {
                            for (var _g = __values(lastClass.values()), _h = _g.next(); !_h.done; _h = _g.next()) {
                                var key = _h.value;
                                el.classList.remove(key);
                            }
                        }
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (_h && !_h.done && (_c = _g.return)) _c.call(_g);
                            }
                            finally { if (e_3) throw e_3.error; }
                        }
                    }
                }
            }
            else if (this._classDiffer) {
                var value = this._classDiffer.value || {};
                this._classDiffer = this._lastClass = undefined;
                try {
                    for (var _j = __values(Object.keys(value)), _k = _j.next(); !_k.done; _k = _j.next()) {
                        var key = _k.value;
                        el.classList.remove(key);
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (_k && !_k.done && (_d = _j.return)) _d.call(_j);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
            }
        };
        PblNgridRowComponent.prototype.cellCreated = function (column, cell) {
            this.attachColumn(column, cell);
        };
        PblNgridRowComponent.prototype.cellDestroyed = function (cell, previousIndex) {
            i1.unrx.kill(this, cell.instance.column);
        };
        PblNgridRowComponent.prototype.cellMoved = function (previousItem, currentItem, previousIndex, currentIndex) {
            currentItem.instance.syncColumn();
            this.context.updateCell(previousItem.instance.cellCtx.clone(currentItem.instance.column));
            currentItem.changeDetectorRef.markForCheck();
        };
        PblNgridRowComponent.prototype.identityUpdated = function () {
            this.element.setAttribute('row-id', this.context.dsIndex);
            this.element.setAttribute('row-key', this.context.identity);
        };
        PblNgridRowComponent.prototype.attachColumn = function (column, cell) {
            if (!column.columnDef) {
                new PblNgridColumnDef(this._extApi).column = column;
                column.columnDef.name = column.id;
            }
            cell.instance.setColumn(column);
            cell.instance.setContext(this.context);
        };
        return PblNgridRowComponent;
    }(PblNgridBaseRowComponent));
    /** @nocollapse */ PblNgridRowComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridRowComponent, deps: null, target: i0__namespace.ɵɵFactoryTarget.Component });
    /** @nocollapse */ PblNgridRowComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridRowComponent, selector: "pbl-ngrid-row[row]", host: { attributes: { "role": "row" }, classAttribute: "cdk-row pbl-ngrid-row" }, providers: [
            { provide: i4.CdkRow, useExisting: PblNgridRowComponent }
        ], viewQueries: [{ propertyName: "_viewRef", first: true, predicate: ["viewRef"], descendants: true, read: i0.ViewContainerRef, static: true }], exportAs: ["pblNgridRow"], usesInheritance: true, ngImport: i0__namespace, template: "<ng-content select=\".pbl-ngrid-row-prefix\"></ng-content><ng-container #viewRef></ng-container><ng-content select=\".pbl-ngrid-row-suffix\"></ng-content>", isInline: true, changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridRowComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'pbl-ngrid-row[row]',
                        template: PBL_NGRID_ROW_TEMPLATE,
                        host: {
                            'class': 'cdk-row pbl-ngrid-row',
                            'role': 'row',
                        },
                        providers: [
                            { provide: i4.CdkRow, useExisting: PblNgridRowComponent }
                        ],
                        exportAs: 'pblNgridRow',
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                    }]
            }], propDecorators: { _viewRef: [{
                    type: i0.ViewChild,
                    args: ['viewRef', { read: i0.ViewContainerRef, static: true }]
                }] } });

    /**
     * The row that represents the columns of the grid.
     * There are only 2 column rows in a grid, the top (header) and bottom (footer), both optional.
     */
    var PblNgridColumnRowComponent = /** @class */ (function (_super) {
        __extends(PblNgridColumnRowComponent, _super);
        function PblNgridColumnRowComponent(grid, cdRef, el, metaRows, isFooter, gridWidthRow) {
            var _this = _super.call(this, grid, cdRef, el) || this;
            _this.metaRows = metaRows;
            _this.gridWidthRow = gridWidthRow !== null;
            _this.isFooter = isFooter !== null;
            _this.rowType = _this.isFooter ? 'footer' : 'header';
            return _this;
        }
        Object.defineProperty(PblNgridColumnRowComponent.prototype, "row", {
            set: function (value) { this.updateRow(value); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblNgridColumnRowComponent.prototype, "rowIndex", {
            get: function () { return 0; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblNgridColumnRowComponent.prototype, "meta", {
            get: function () { return this._meta; },
            set: function (value) { this._meta = value; } // TODO: remove when removing pblMetaRow
            ,
            enumerable: false,
            configurable: true
        });
        PblNgridColumnRowComponent.prototype.ngOnInit = function () {
            _super.prototype.ngOnInit.call(this);
            this.handleVisibility();
        };
        PblNgridColumnRowComponent.prototype.ngOnDestroy = function () {
            this.metaRows.removeMetaRow(this);
            _super.prototype.ngOnDestroy.call(this);
        };
        PblNgridColumnRowComponent.prototype.updateSize = function () {
            var e_1, _a;
            if (this.gridWidthRow) {
                try {
                    for (var _b = __values(this._cells), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var c = _c.value;
                        c.instance.updateSize();
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        };
        PblNgridColumnRowComponent.prototype.onCtor = function () { };
        PblNgridColumnRowComponent.prototype.detectChanges = function () {
            var e_2, _a;
            try {
                for (var _b = __values(this._cells), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var cell = _c.value;
                    // TODO: the cells are created through code which mean's that they don't belong
                    // to the CD tree and we need to manually mark them for checking
                    // We can customize the diffing, detect context changes internally and only trigger these cells which have changed!
                    cell.changeDetectorRef.markForCheck();
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
        };
        PblNgridColumnRowComponent.prototype.updateRow = function (value) {
            if (value !== this._meta) {
                applyMetaRowClass(this.metaRows, this, this.element, this._meta, value);
            }
        };
        PblNgridColumnRowComponent.prototype.cellCreated = function (column, cell) {
            if (!column.columnDef) {
                new PblNgridColumnDef(this._extApi).column = column;
                column.columnDef.name = column.id;
            }
            cell.instance.setColumn(column, this.gridWidthRow);
        };
        PblNgridColumnRowComponent.prototype.cellDestroyed = function (cell, previousIndex) {
            i1.unrx.kill(this, cell.instance.column);
        };
        PblNgridColumnRowComponent.prototype.handleVisibility = function () {
            var _this = this;
            initColumnOrMetaRow(this.element, this.isFooter);
            var key = this.isFooter ? 'showFooter' : 'showHeader';
            if (!this._extApi.grid[key]) {
                setRowVisibility(this.element, false);
            }
            this._extApi.propChanged
                .pipe(i1.unrx(this))
                .subscribe(function (event) {
                if (event.source === _this._extApi.grid && event.key === key) {
                    setRowVisibility(_this.element, event.prev === false);
                }
            });
        };
        return PblNgridColumnRowComponent;
    }(PblNgridBaseRowComponent));
    /** @nocollapse */ PblNgridColumnRowComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridColumnRowComponent, deps: [{ token: PBL_NGRID_COMPONENT, optional: true }, { token: i0__namespace.ChangeDetectorRef }, { token: i0__namespace.ElementRef }, { token: PblNgridMetaRowService }, { token: 'footer', attribute: true }, { token: 'gridWidthRow', attribute: true }], target: i0__namespace.ɵɵFactoryTarget.Component });
    /** @nocollapse */ PblNgridColumnRowComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridColumnRowComponent, selector: "pbl-ngrid-column-row", inputs: { row: "row" }, host: { attributes: { "role": "row" } }, providers: [
            { provide: i4.CdkHeaderRow, useExisting: PblNgridColumnRowComponent }
        ], usesInheritance: true, ngImport: i0__namespace, template: "<ng-container #viewRef></ng-container>", isInline: true, changeDetection: i0__namespace.ChangeDetectionStrategy.Default, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridColumnRowComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'pbl-ngrid-column-row',
                        template: PBL_NGRID_BASE_ROW_TEMPLATE,
                        host: {
                            'role': 'row',
                        },
                        providers: [
                            { provide: i4.CdkHeaderRow, useExisting: PblNgridColumnRowComponent }
                        ],
                        changeDetection: i0.ChangeDetectionStrategy.Default,
                        encapsulation: i0.ViewEncapsulation.None,
                    }]
            }], ctorParameters: function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [PBL_NGRID_COMPONENT]
                        }, {
                            type: i0.Optional
                        }] }, { type: i0__namespace.ChangeDetectorRef }, { type: i0__namespace.ElementRef }, { type: PblNgridMetaRowService }, { type: undefined, decorators: [{
                            type: i0.Attribute,
                            args: ['footer']
                        }] }, { type: undefined, decorators: [{
                            type: i0.Attribute,
                            args: ['gridWidthRow']
                        }] }];
        }, propDecorators: { row: [{
                    type: i0.Input
                }] } });

    var PblNgridMetaRowComponent = /** @class */ (function (_super) {
        __extends(PblNgridMetaRowComponent, _super);
        function PblNgridMetaRowComponent(grid, cdRef, el, metaRows, isFooter) {
            var _this = _super.call(this, grid, cdRef, el) || this;
            _this.metaRows = metaRows;
            _this.gridWidthRow = false;
            _this.isFooter = isFooter !== null;
            _this.rowType = _this.isFooter ? 'meta-footer' : 'meta-header';
            return _this;
        }
        Object.defineProperty(PblNgridMetaRowComponent.prototype, "row", {
            get: function () { return this._row; },
            set: function (value) { this.updateRow(value); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblNgridMetaRowComponent.prototype, "rowIndex", {
            get: function () { return this._row.rowDef.rowIndex; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblNgridMetaRowComponent.prototype, "meta", {
            get: function () { return this._meta; },
            set: function (value) { this._meta = value; } // TODO: remove when removing pblMetaRow
            ,
            enumerable: false,
            configurable: true
        });
        PblNgridMetaRowComponent.prototype.ngOnInit = function () {
            _super.prototype.ngOnInit.call(this);
            this.handleVisibility();
        };
        PblNgridMetaRowComponent.prototype.ngOnDestroy = function () {
            this.metaRows.removeMetaRow(this);
            _super.prototype.ngOnDestroy.call(this);
        };
        PblNgridMetaRowComponent.prototype.onCtor = function () { };
        PblNgridMetaRowComponent.prototype.detectChanges = function () {
            var e_1, _b;
            try {
                for (var _c = __values(this._cells), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var cell = _d.value;
                    // TODO: the cells are created through code which mean's that they don't belong
                    // to the CD tree and we need to manually mark them for checking
                    // We can customize the diffing, detect context changes internally and only trigger these cells which have changed!
                    cell.changeDetectorRef.markForCheck();
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        PblNgridMetaRowComponent.prototype.cellCreated = function (column, cell) {
            cell.instance.setColumn(column, this.isFooter);
        };
        PblNgridMetaRowComponent.prototype.cellDestroyed = function (cell, previousIndex) {
        };
        PblNgridMetaRowComponent.prototype.cellMoved = function (previousItem, currentItem, previousIndex, currentIndex) {
        };
        PblNgridMetaRowComponent.prototype.updateRow = function (value) {
            var _a;
            if (value !== this._row) {
                applyMetaRowClass(this.metaRows, this, this.element, this._meta, value === null || value === void 0 ? void 0 : value.rowDef);
                if ((_a = this._row) === null || _a === void 0 ? void 0 : _a.isGroup) {
                    this.element.classList.remove('pbl-meta-group-row');
                }
                if (value === null || value === void 0 ? void 0 : value.isGroup) {
                    this.element.classList.add('pbl-meta-group-row');
                }
                this._row = value;
            }
        };
        PblNgridMetaRowComponent.prototype.handleVisibility = function () {
            initColumnOrMetaRow(this.element, this.isFooter);
            // TODO: add row visibility API like in columns and react to changes
            // - Remove showHeader showFooter inputs and move them to directives and inside let them use the API
        };
        return PblNgridMetaRowComponent;
    }(PblNgridBaseRowComponent));
    /** @nocollapse */ PblNgridMetaRowComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridMetaRowComponent, deps: [{ token: PBL_NGRID_COMPONENT, optional: true }, { token: i0__namespace.ChangeDetectorRef }, { token: i0__namespace.ElementRef }, { token: PblNgridMetaRowService }, { token: 'footer', attribute: true }], target: i0__namespace.ɵɵFactoryTarget.Component });
    /** @nocollapse */ PblNgridMetaRowComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridMetaRowComponent, selector: "pbl-ngrid-meta-row", inputs: { row: "row" }, host: { attributes: { "role": "row" } }, providers: [
            { provide: i4.CdkHeaderRow, useExisting: PblNgridMetaRowComponent }
        ], usesInheritance: true, ngImport: i0__namespace, template: "<ng-container #viewRef></ng-container>", isInline: true, changeDetection: i0__namespace.ChangeDetectionStrategy.Default, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridMetaRowComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'pbl-ngrid-meta-row',
                        template: PBL_NGRID_BASE_ROW_TEMPLATE,
                        // tslint:disable-next-line: no-host-metadata-property
                        host: {
                            'role': 'row',
                        },
                        providers: [
                            { provide: i4.CdkHeaderRow, useExisting: PblNgridMetaRowComponent }
                        ],
                        changeDetection: i0.ChangeDetectionStrategy.Default,
                        encapsulation: i0.ViewEncapsulation.None,
                    }]
            }], ctorParameters: function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [PBL_NGRID_COMPONENT]
                        }, {
                            type: i0.Optional
                        }] }, { type: i0__namespace.ChangeDetectorRef }, { type: i0__namespace.ElementRef }, { type: PblNgridMetaRowService }, { type: undefined, decorators: [{
                            type: i0.Attribute,
                            args: ['footer']
                        }] }];
        }, propDecorators: { row: [{
                    type: i0.Input
                }] } });

    var NGRID_CELL_FACTORY = new i0.InjectionToken('PblNgridCellFactoryResolver');
    var PblNgridCellFactoryResolver = /** @class */ (function () {
        function PblNgridCellFactoryResolver(factoryMap) {
            this.factoryMap = factoryMap;
        }
        PblNgridCellFactoryResolver.prototype.getComponentFactory = function (row) {
            return this.factoryMap[row.rowType];
        };
        return PblNgridCellFactoryResolver;
    }());
    /** @nocollapse */ PblNgridCellFactoryResolver.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridCellFactoryResolver, deps: [{ token: NGRID_CELL_FACTORY }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    /** @nocollapse */ PblNgridCellFactoryResolver.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridCellFactoryResolver });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridCellFactoryResolver, decorators: [{
                type: i0.Injectable
            }], ctorParameters: function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [NGRID_CELL_FACTORY]
                        }] }];
        } });

    /**
     * A Registry for templates of table parts.
     *
     * The registry is hierarchical, where each instance of a registry has a parent which allows cascading templates.
     * The hierarchy is manged by angular DI.
     *
     * > The root registry does not have a parent.
     *
     * Each instance of a registry (including root) is a hierarchy by itself, composed of 2 internal levels.
     * The first level (L1 below) is used for fixed templates, the second level (L2 below) is used for dynamic templates.
     *
     * - Root Registry
     *   - Child Registry
     *     - ChildOfChild Registry
     *
     * In the example above there are 3 registries: Root, Child and ChildOfChild.
     *
     * When searching for a template in `ChildOfChild` it will search in the following order (top to bottom):
     *   - ChildOfChild
     *   - Child
     *   - Root
     *
     * If a registry does not contain the template the search will move to the next one.
     */
    var PblNgridRegistryService = /** @class */ (function () {
        function PblNgridRegistryService(_parent) {
            this._parent = _parent;
            this._multi = {};
            this._multiDefaults = {};
            this._singles = {};
            this.changes$ = new rxjs.Subject();
            this.changes = this.changes$.asObservable();
            if (this._parent) {
                this._parent.changes.pipe(i1.unrx(this)).subscribe(this.changes$);
                this.root = this._parent.root;
            }
            else {
                this.root = this;
            }
        }
        Object.defineProperty(PblNgridRegistryService.prototype, "parent", {
            get: function () { return this._parent; },
            enumerable: false,
            configurable: true
        });
        PblNgridRegistryService.prototype.getRoot = function () { return this.root; };
        /**
         * Returns the registered value for the single `kind`.
         * If not found will try to search the parent.
         */
        PblNgridRegistryService.prototype.getSingle = function (kind) {
            return this._singles[kind] || (this._parent && this._parent.getSingle(kind));
        };
        PblNgridRegistryService.prototype.setSingle = function (kind, value) {
            var previous = this.getSingle(kind);
            if (value !== previous) {
                this._singles[kind] = value;
                this.emitChanges({ op: value ? 'add' : 'remove', type: kind, value: value });
            }
        };
        /**
         * Returns the registered default value for the multi `kind`.
         * If not found will try to search the parent.
         */
        PblNgridRegistryService.prototype.getMultiDefault = function (kind) {
            return this._multiDefaults[kind] || (this._parent && this._parent.getMultiDefault(kind));
        };
        PblNgridRegistryService.prototype.setMultiDefault = function (kind, value) {
            var previous = this.getMultiDefault(kind);
            if (value !== previous) {
                this._multiDefaults[kind] = value;
                this.emitChanges({ op: value ? 'add' : 'remove', type: kind, value: value });
            }
        };
        /**
         * Returns the registered values for the multi `kind`.
         * If not found WILL NOT search the parent.
         */
        PblNgridRegistryService.prototype.getMulti = function (kind) {
            return this._multi[kind];
        };
        PblNgridRegistryService.prototype.addMulti = function (kind, cellDef) {
            var multi = this.getMulti(kind) || (this._multi[kind] = []);
            multi.push(cellDef);
            if (cellDef.name === '*') {
                this.setMultiDefault(kind, cellDef);
            }
            this.emitChanges({ op: 'add', type: kind, value: cellDef });
        };
        PblNgridRegistryService.prototype.removeMulti = function (kind, cellDef) {
            var multi = this.getMulti(kind);
            if (multi) {
                var idx = multi.indexOf(cellDef);
                if (idx > -1) {
                    multi.splice(idx, 1);
                }
                this.emitChanges({ op: 'remove', type: kind, value: cellDef });
            }
        };
        /**
         * Iterate over all multi-registry value of the provided `kind` ascending order, starting from the last ancestor (this registry) up to
         * the root parent.
         *
         * Each time a collection for the `kind` is found the handler is invoked and then repeating the process on the parent.
         * If the `kind` does not exist the handler is not called moving on to the next parent.
         *
         * To bail out (stop the process and don't iterate to the next parent), return true from the handler.
         *
         * @returns The number of times that handler was invoked, i.e 0 means no matches.
         */
        PblNgridRegistryService.prototype.forMulti = function (kind, handler) {
            var registry = this;
            var hasSome = 0;
            while (registry) {
                var values = registry.getMulti(kind);
                if (values) {
                    hasSome++;
                    if (handler(values) === true) {
                        return;
                    }
                }
                registry = registry.parent;
            }
            return hasSome;
        };
        PblNgridRegistryService.prototype.ngOnDestroy = function () {
            this.changes$.complete();
            i1.unrx.kill(this);
        };
        /**
         * Delay all notifications sent through `changes` and buffer then until next call to `bufferEnd()`.
         * When `bufferEnd()` is called it will flush all changes.
         *
         * > It's important to note that buffering does not freeze the registry, adding and removing templates will change the
         * registry and will effect queries. Buffering block the `changes` event stream and nothing more.
         */
        PblNgridRegistryService.prototype.bufferStart = function () {
            if (!this.root.bufferedData) {
                this.root.bufferedData = [];
            }
        };
        PblNgridRegistryService.prototype.bufferEnd = function () {
            if (this.root.bufferedData) {
                var data = this.root.bufferedData;
                this.root.bufferedData = undefined;
                this.emitChanges(data);
            }
        };
        PblNgridRegistryService.prototype.emitChanges = function (events) {
            var _a;
            var e = Array.isArray(events) ? events : [events];
            if (this.root.bufferedData) {
                (_a = this.root.bufferedData).push.apply(_a, __spreadArray([], __read(e)));
            }
            else {
                this.changes$.next(e);
            }
        };
        return PblNgridRegistryService;
    }());
    /** @nocollapse */ PblNgridRegistryService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridRegistryService, deps: [{ token: PblNgridRegistryService, optional: true, skipSelf: true }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    /** @nocollapse */ PblNgridRegistryService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridRegistryService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridRegistryService, decorators: [{
                type: i0.Injectable,
                args: [{ providedIn: 'root' }]
            }], ctorParameters: function () {
            return [{ type: PblNgridRegistryService, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.SkipSelf
                        }] }];
        } });

    var PblNgridRowDef = /** @class */ (function (_super) {
        __extends(PblNgridRowDef, _super);
        function PblNgridRowDef(template, _differs, registry, _table) {
            var _this = _super.call(this, template, _differs, _table) || this;
            _this.registry = registry;
            _this._table = _table;
            /**
             * Empty rows.
             * We don't supply column rows to the CdkTable so it will not render them.
             * We render internally.
             */
            _this.columns = [];
            return _this;
        }
        PblNgridRowDef.prototype.getColumnsDiff = function () {
            return null;
        };
        PblNgridRowDef.prototype.clone = function () {
            var clone = Object.create(this);
            // Provide 0 column so CdkTable will not render.
            this.columns = [];
            return clone;
        };
        return PblNgridRowDef;
    }(i4.CdkRowDef));
    /** @nocollapse */ PblNgridRowDef.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridRowDef, deps: [{ token: i0__namespace.TemplateRef }, { token: i0__namespace.IterableDiffers }, { token: PblNgridRegistryService }, { token: i4.CDK_TABLE, optional: true }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ PblNgridRowDef.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridRowDef, selector: "[pblNgridRowDef]", inputs: { columns: ["pblNgridRowDefColumns", "columns"], when: ["pblNgridRowDefWhen", "when"] }, providers: [
            { provide: i4.CdkRowDef, useExisting: PblNgridRowDef },
        ], usesInheritance: true, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridRowDef, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[pblNgridRowDef]',
                        inputs: ['columns: pblNgridRowDefColumns', 'when: pblNgridRowDefWhen'],
                        providers: [
                            { provide: i4.CdkRowDef, useExisting: PblNgridRowDef },
                        ]
                    }]
            }], ctorParameters: function () {
            return [{ type: i0__namespace.TemplateRef }, { type: i0__namespace.IterableDiffers }, { type: PblNgridRegistryService }, { type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [i4.CDK_TABLE]
                        }, {
                            type: i0.Optional
                        }] }];
        } });
    /**
     * A directive for quick replacements of the row container component.
     *
     * When used inside the content of the grid:
     *
     * ```html
     * <pbl-ngrid [dataSource]="ds" [columns]="columns">
     *   <pbl-ngrid-row *pblNgridRowOverride="let row;" row></pbl-ngrid-row>
     * </pbl-ngrid>
     * ```
     *
     * However, when used outside of the grid you must provide a reference to the grid so it can register as a template:
     *
     * ```html
     * <pbl-ngrid-row *pblNgridRowOverride="let row; grid: myGrid" row></pbl-ngrid-row>
     * <pbl-ngrid #myGrid [dataSource]="ds" [columns]="columns"></pbl-ngrid>
     * ```
     */
    var PblNgridRowOverride = /** @class */ (function (_super) {
        __extends(PblNgridRowOverride, _super);
        function PblNgridRowOverride(template, _differs, registry, extApi) {
            var _this = _super.call(this, template, _differs, registry, extApi === null || extApi === void 0 ? void 0 : extApi.cdkTable) || this;
            _this.extApi = extApi;
            _this.when = function () { return true; };
            return _this;
        }
        PblNgridRowOverride.prototype.ngOnInit = function () {
            var _a;
            if (!this.extApi && this.grid) {
                this.extApi = PblNgridPluginController.find(this.grid).extApi;
            }
            (_a = this.extApi) === null || _a === void 0 ? void 0 : _a.cdkTable.addRowDef(this);
        };
        return PblNgridRowOverride;
    }(PblNgridRowDef));
    /** @nocollapse */ PblNgridRowOverride.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridRowOverride, deps: [{ token: i0__namespace.TemplateRef }, { token: i0__namespace.IterableDiffers }, { token: PblNgridRegistryService }, { token: EXT_API_TOKEN, optional: true }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ PblNgridRowOverride.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridRowOverride, selector: "[pblNgridRowOverride]", inputs: { columns: ["pblNgridRowDefColumns", "columns"], when: ["pblNgridRowDefWhen", "when"], grid: ["pblNgridRowDefGrid", "grid"] }, providers: [
            { provide: i4.CdkRowDef, useExisting: PblNgridRowDef },
        ], usesInheritance: true, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridRowOverride, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[pblNgridRowOverride]',
                        inputs: ['columns: pblNgridRowDefColumns', 'when: pblNgridRowDefWhen', 'grid: pblNgridRowDefGrid'],
                        providers: [
                            { provide: i4.CdkRowDef, useExisting: PblNgridRowDef },
                        ]
                    }]
            }], ctorParameters: function () {
            return [{ type: i0__namespace.TemplateRef }, { type: i0__namespace.IterableDiffers }, { type: PblNgridRegistryService }, { type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [EXT_API_TOKEN]
                        }, {
                            type: i0.Optional
                        }] }];
        } });

    var MetaCellContext = /** @class */ (function () {
        function MetaCellContext() {
        }
        Object.defineProperty(MetaCellContext.prototype, "$implicit", {
            get: function () { return this; },
            enumerable: false,
            configurable: true
        });
        // workaround, we need a parameter-less constructor since @ngtools/webpack@8.0.4
        // Non @Injectable classes are now getting addded with hard reference to the ctor params which at the class creation point are undefined
        // forwardRef() will not help since it's not inject by angular, we instantiate the class..
        // probably due to https://github.com/angular/angular-cli/commit/639198499973e0f437f059b3c933c72c733d93d8
        MetaCellContext.create = function (col, grid) {
            var instance = new MetaCellContext();
            instance.col = col;
            instance.grid = grid;
            return instance;
        };
        return MetaCellContext;
    }());
    var PblCellContext = /** @class */ (function () {
        function PblCellContext() {
            this._editing = false;
            this._focused = false;
            this._selected = false;
            this._external = {};
        }
        Object.defineProperty(PblCellContext.prototype, "$implicit", {
            get: function () { return this; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblCellContext.prototype, "row", {
            get: function () { return this.rowContext.$implicit; },
            enumerable: false,
            configurable: true
        });
        ;
        Object.defineProperty(PblCellContext.prototype, "value", {
            get: function () { return this.col.getValue(this.row); },
            set: function (v) { this.col.setValue(this.row, v); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblCellContext.prototype, "rowContext", {
            get: function () { return this._rowContext; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblCellContext.prototype, "editing", {
            get: function () { return this._editing; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblCellContext.prototype, "focused", {
            get: function () { return this._focused; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblCellContext.prototype, "selected", {
            get: function () { return this._selected; },
            enumerable: false,
            configurable: true
        });
        // workaround, we need a parameter-less constructor since @ngtools/webpack@8.0.4
        // Non @Injectable classes are now getting addded with hard reference to the ctor params which at the class creation point are undefined
        // forwardRef() will not help since it's not inject by angular, we instantiate the class..
        // probably due to https://github.com/angular/angular-cli/commit/639198499973e0f437f059b3c933c72c733d93d8
        PblCellContext.create = function (rowContext, col, extApi) {
            var instance = new PblCellContext();
            instance._rowContext = rowContext;
            instance.col = col;
            instance.extApi = extApi;
            Object.defineProperties(instance, {
                grid: { value: extApi.grid },
                index: { value: extApi.grid.columnApi.indexOf(col) },
            });
            return instance;
        };
        PblCellContext.defaultState = function () {
            return { editing: false, focused: false, selected: false, external: {} };
        };
        PblCellContext.prototype.clone = function (col) {
            var ctx = PblCellContext.create(this._rowContext, col || this.col, this.extApi);
            ctx.fromState(this.getState(), this._rowContext, true);
            return ctx;
        };
        PblCellContext.prototype.getExternal = function (key) {
            return this._external[key];
        };
        PblCellContext.prototype.setExternal = function (key, value, saveState) {
            if (saveState === void 0) { saveState = false; }
            this._external[key] = value;
            if (saveState) {
                this._rowContext.saveState();
            }
        };
        PblCellContext.prototype.getState = function () {
            return {
                editing: this._editing,
                focused: this._focused,
                selected: this._selected,
                external: this._external,
            };
        };
        PblCellContext.prototype.fromState = function (state, rowContext, skipRowUpdate) {
            var requiresReset = !skipRowUpdate && this._editing === state.editing;
            this._rowContext = rowContext;
            this._editing = state.editing;
            this._focused = state.focused;
            this._selected = state.selected;
            this._external = state.external;
            if (requiresReset) {
                rowContext.updateCell(this);
            }
        };
        PblCellContext.prototype.startEdit = function (markForCheck) {
            if (this.col.editorTpl && !this.editing) {
                this._editing = true;
                this._rowContext.updateCell(this);
                if (markForCheck) {
                    this.grid.rowsApi.syncRows('data', true, this.rowContext.index);
                }
            }
        };
        PblCellContext.prototype.stopEdit = function (markForCheck) {
            if (this.editing && !this.grid.viewport.isScrolling) {
                this._editing = false;
                this._rowContext.updateCell(this);
                if (markForCheck) {
                    this.grid.rowsApi.syncRows('data', this.rowContext.index);
                }
            }
        };
        return PblCellContext;
    }());

    var PblRowContext = /** @class */ (function () {
        function PblRowContext(_data, dsIndex, extApi) {
            this.extApi = extApi;
            this.external = {};
            this.dsIndex = dsIndex;
            this._$implicit = _data;
            this.identity = this.extApi.contextApi.getRowIdentity(dsIndex, _data);
            this.grid = extApi.grid;
            this._rebuildCells(this.extApi.grid.columnApi.columns);
        }
        Object.defineProperty(PblRowContext.prototype, "$implicit", {
            /** Data for the row that this cell is located within. */
            get: function () { return this._$implicit; },
            set: function (value) {
                if (this._$implicit !== value) {
                    this._$implicit = value;
                    this.updateRowData();
                }
            },
            enumerable: false,
            configurable: true
        });
        ;
        Object.defineProperty(PblRowContext.prototype, "dataIndex", {
            /** Index of the data object in the provided data array. */
            get: function () { return this.index; },
            set: function (value) { this.index = value; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblRowContext.prototype, "length", {
            /**
             * Returns the length of cells context stored in this row
             */
            get: function () { var _a, _b; return (_b = (_a = this.cells) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0; },
            enumerable: false,
            configurable: true
        });
        PblRowContext.defaultState = function (identity, dsIndex, cellsCount) {
            var cells = [];
            for (var i = 0; i < cellsCount; i++) {
                cells.push(PblCellContext.defaultState());
            }
            return { identity: identity, dsIndex: dsIndex, cells: cells, firstRender: true, external: {} };
        };
        PblRowContext.prototype.getExternal = function (key) {
            return this.external[key];
        };
        PblRowContext.prototype.setExternal = function (key, value, saveState) {
            if (saveState === void 0) { saveState = false; }
            this.external[key] = value;
            if (saveState) {
                this.saveState();
            }
        };
        PblRowContext.prototype.getState = function () {
            return {
                identity: this.identity,
                dsIndex: this.dsIndex,
                firstRender: this.firstRender,
                cells: this.cells.map(function (c) { return c.getState(); }),
                external: this.external,
            };
        };
        PblRowContext.prototype.fromState = function (state) {
            this.firstRender = state.firstRender;
            this.dsIndex = state.dsIndex;
            this.external = state.external;
            for (var i = 0, len = this.cells.length; i < len; i++) {
                this.cells[i].fromState(state.cells[i], this);
            }
        };
        PblRowContext.prototype.saveState = function () {
            this.extApi.contextApi.saveState(this);
        };
        /**
         * Returns the cell context for the column at the specified position.
         * > The position is relative to ALL columns (NOT RENDERED COLUMNS)
         */
        PblRowContext.prototype.cell = function (index) {
            var idx = typeof index === 'number' ? index : this.grid.columnApi.indexOf(index);
            return this.cells[idx];
        };
        PblRowContext.prototype.getCells = function () {
            return (this.cells && this.cells.slice()) || [];
        };
        PblRowContext.prototype.updateCell = function (cell) {
            this.cells[cell.index] = cell.clone();
        };
        PblRowContext.prototype.attachRow = function (row) {
            this.detachRow(this._attachedRow);
            this._attachedRow = row;
            if (this._updatePending) {
                this.updateRowData();
            }
        };
        PblRowContext.prototype.detachRow = function (row) {
            if (row && this._attachedRow === row) {
                this.saveState();
                this._attachedRow = undefined;
            }
        };
        PblRowContext.prototype._rebuildCells = function (columns) {
            var cells = this.cells = [];
            var len = columns.length;
            for (var columnIndex = 0; columnIndex < len; columnIndex++) {
                var cellContext = PblCellContext.create(this, columns[columnIndex], this.extApi);
                cells.push(cellContext);
            }
        };
        PblRowContext.prototype.updateRowData = function () {
            if (this._attachedRow) {
                this._updatePending = false;
                this.extApi.contextApi._updateRowContext(this, this._attachedRow.rowIndex);
                this._attachedRow.updateRow();
            }
            else {
                this._updatePending = !!this._$implicit;
            }
        };
        return PblRowContext;
    }());

    /** IE 11 compatible matches implementation. */
    function matches(element, selector) {
        return element.matches ?
            element.matches(selector) :
            element['msMatchesSelector'](selector);
    }
    /** IE 11 compatible closest implementation. */
    function closest(element, selector) {
        if (!(element instanceof Node)) {
            return null;
        }
        var curr = element;
        while (curr != null && !(curr instanceof Element && matches(curr, selector))) {
            curr = curr.parentNode;
        }
        return (curr || null);
    }
    function findRowRenderedIndex(el) {
        var rows = Array.from(closest(el, 'pbl-cdk-table').querySelectorAll('pbl-ngrid-row'));
        return rows.indexOf(el);
    }
    function findCellRenderedIndex(el) {
        var rowEl = closest(el, 'pbl-ngrid-row');
        var cells = Array.from(rowEl.querySelectorAll('pbl-ngrid-cell'));
        return [findRowRenderedIndex(rowEl), cells.indexOf(el)];
    }
    /**
     * Resolves the context from one of the possible types in `CellReference`.
     * If the context is within the view it will return the `PblCellContext instance, otherwise it will
     * return a tuple with the first item being the row context state and the seconds item pointing to the cell index.
     *
     * If no context is found, returns undefined.
     */
    function resolveCellReference(cellRef, context) {
        var rowIdent;
        var colIndex;
        if (isGridDataPoint(cellRef)) {
            rowIdent = cellRef.rowIdent;
            colIndex = cellRef.colIndex;
        }
        else if (isCellContext(cellRef)) {
            rowIdent = cellRef.rowContext.identity;
            colIndex = cellRef.index;
        }
        else {
            var _a = __read(findCellRenderedIndex(cellRef), 2), r = _a[0], c = _a[1];
            var rowContext = context.viewCache.get(r);
            if (rowContext) {
                var column = context.columnApi.findColumnAt(c);
                var columnIndex = context.columnApi.indexOf(column);
                return rowContext.cell(columnIndex);
            }
            else {
                return;
            }
        }
        var rowState = context.cache.get(rowIdent);
        if (rowState) {
            var rowContext = context.extApi.grid.contextApi.findRowInView(rowState.identity);
            if (rowContext) {
                return rowContext.cell(colIndex);
            }
            else {
                var cellState = rowState.cells[colIndex];
                if (cellState) {
                    return [rowState, colIndex];
                }
            }
        }
    }
    function isGridDataPoint(obj) {
        return 'rowIdent' in obj && 'colIndex' in obj;
    }
    function isCellContext(obj) {
        return 'rowContext' in obj && 'index' in obj;
    }

    var ContextApi = /** @class */ (function () {
        function ContextApi(extApi) {
            var _this = this;
            this.extApi = extApi;
            this.viewCache = new Map();
            this.viewCacheGhost = new Set();
            this.cache = new Map();
            this.activeSelected = [];
            this.focusChanged$ = new rxjs.BehaviorSubject({ prev: undefined, curr: undefined });
            this.selectionChanged$ = new rxjs.Subject();
            /**
             * Notify when the focus has changed.
             *
             * > Note that the notification is not immediate, it will occur on the closest micro-task after the change.
             */
            this.focusChanged = this.focusChanged$
                .pipe(operators.buffer(this.focusChanged$.pipe(operators.debounceTime(0, rxjs.asapScheduler))), operators.map(function (events) { return ({ prev: events[0].prev, curr: events[events.length - 1].curr }); }));
            /**
             * Notify when the selected cells has changed.
             */
            this.selectionChanged = this.selectionChanged$.asObservable();
            this.columnApi = extApi.columnApi;
            extApi.events
                .pipe(operators.filter(function (e) { return e.kind === 'onDataSource'; }), operators.take(1)).subscribe(function () {
                _this.vcRef = extApi.cdkTable._rowOutlet.viewContainer;
                _this.syncViewAndContext();
                extApi.cdkTable.onRenderRows.subscribe(function () { return _this.syncViewAndContext(); });
            });
            extApi.events.pipe(i1.ON_DESTROY).subscribe(function (e) { return _this.destroy(); });
        }
        Object.defineProperty(ContextApi.prototype, "focusedCell", {
            /**
             * The reference to currently focused cell context.
             * You can retrieve the actual context or context cell using `findRowInView` and / or `findRowInCache`.
             *
             * > Note that when virtual scroll is enabled the currently focused cell does not have to exist in the view.
             * If this is the case `findRowInView` will return undefined, use `findRowInCache` instead.
             */
            get: function () {
                return this.activeFocused ? Object.assign({}, this.activeFocused) : undefined;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ContextApi.prototype, "selectedCells", {
            /**
             * The reference to currently selected range of cell's context.
             * You can retrieve the actual context or context cell using `findRowInView` and / or `findRowInCache`.
             *
             * > Note that when virtual scroll is enabled the currently selected cells does not have to exist in the view.
             * If this is the case `findRowInView` will return undefined, use `findRowInCache` instead.
             */
            get: function () {
                return this.activeSelected.slice();
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Focus the provided cell.
         * If a cell is not provided will un-focus (blur) the currently focused cell (if there is one).
         * @param cellRef A Reference to the cell
         */
        ContextApi.prototype.focusCell = function (cellRef) {
            if (!cellRef) {
                if (this.activeFocused) {
                    var _a = this.activeFocused, rowIdent = _a.rowIdent, colIndex = _a.colIndex;
                    this.activeFocused = undefined;
                    this.updateState(rowIdent, colIndex, { focused: false });
                    this.emitFocusChanged(this.activeFocused);
                    var rowContext = this.findRowInView(rowIdent);
                    if (rowContext) {
                        this.extApi.grid.rowsApi.syncRows('data', rowContext.index);
                    }
                }
            }
            else {
                var ref = resolveCellReference(cellRef, this);
                if (ref) {
                    this.focusCell();
                    if (ref instanceof PblCellContext) {
                        if (!ref.focused && !this.extApi.grid.viewport.isScrolling) {
                            this.updateState(ref.rowContext.identity, ref.index, { focused: true });
                            this.activeFocused = { rowIdent: ref.rowContext.identity, colIndex: ref.index };
                            this.selectCells([this.activeFocused], true);
                            this.extApi.grid.rowsApi.syncRows('data', ref.rowContext.index);
                        }
                    }
                    else {
                        this.updateState(ref[0].identity, ref[1], { focused: true });
                        this.activeFocused = { rowIdent: ref[0].identity, colIndex: ref[1] };
                    }
                    this.emitFocusChanged(this.activeFocused);
                }
            }
        };
        /**
         * Select all provided cells.
         * @param cellRef A Reference to the cell
         * @param clearCurrent Clear the current selection before applying the new selection.
         * Default to false (add to current).
         */
        ContextApi.prototype.selectCells = function (cellRefs, clearCurrent) {
            var e_1, _a, _b;
            var toMarkRendered = new Set();
            if (clearCurrent) {
                this.unselectCells();
            }
            var added = [];
            try {
                for (var cellRefs_1 = __values(cellRefs), cellRefs_1_1 = cellRefs_1.next(); !cellRefs_1_1.done; cellRefs_1_1 = cellRefs_1.next()) {
                    var cellRef = cellRefs_1_1.value;
                    var ref = resolveCellReference(cellRef, this);
                    if (ref instanceof PblCellContext) {
                        if (!ref.selected && !this.extApi.grid.viewport.isScrolling) {
                            var rowIdent = ref.rowContext.identity;
                            var colIndex = ref.index;
                            this.updateState(rowIdent, colIndex, { selected: true });
                            var dataPoint = { rowIdent: rowIdent, colIndex: colIndex };
                            this.activeSelected.push(dataPoint);
                            added.push(dataPoint);
                            toMarkRendered.add(ref.rowContext.index);
                        }
                    }
                    else if (ref) {
                        var _c = __read(ref, 2), rowState = _c[0], colIndex = _c[1];
                        if (!rowState.cells[colIndex].selected) {
                            this.updateState(rowState.identity, colIndex, { selected: true });
                            this.activeSelected.push({ rowIdent: rowState.identity, colIndex: colIndex });
                        }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (cellRefs_1_1 && !cellRefs_1_1.done && (_a = cellRefs_1.return)) _a.call(cellRefs_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            if (toMarkRendered.size > 0) {
                (_b = this.extApi.grid.rowsApi).syncRows.apply(_b, __spreadArray(['data'], __read(Array.from(toMarkRendered.values()))));
            }
            this.selectionChanged$.next({ added: added, removed: [] });
        };
        /**
         * Unselect all provided cells.
         * If cells are not provided will un-select all currently selected cells.
         * @param cellRef A Reference to the cell
         */
        ContextApi.prototype.unselectCells = function (cellRefs) {
            var e_2, _a, _b;
            var toMarkRendered = new Set();
            var toUnselect = this.activeSelected;
            var removeAll = true;
            if (Array.isArray(cellRefs)) {
                toUnselect = cellRefs;
                removeAll = false;
            }
            else {
                this.activeSelected = [];
            }
            var removed = [];
            var _loop_1 = function (cellRef) {
                var ref = resolveCellReference(cellRef, this_1);
                if (ref instanceof PblCellContext) {
                    if (ref.selected) {
                        var rowIdent_1 = ref.rowContext.identity;
                        var colIndex_1 = ref.index;
                        this_1.updateState(rowIdent_1, colIndex_1, { selected: false });
                        if (!removeAll) {
                            var wasRemoved = i1.removeFromArray(this_1.activeSelected, function (item) { return item.colIndex === colIndex_1 && item.rowIdent === rowIdent_1; });
                            if (wasRemoved) {
                                removed.push({ rowIdent: rowIdent_1, colIndex: colIndex_1 });
                            }
                        }
                        toMarkRendered.add(ref.rowContext.index);
                    }
                }
                else if (ref) {
                    var _c = __read(ref, 2), rowState_1 = _c[0], colIndex_2 = _c[1];
                    if (rowState_1.cells[colIndex_2].selected) {
                        this_1.updateState(rowState_1.identity, colIndex_2, { selected: false });
                        if (!removeAll) {
                            var wasRemoved = i1.removeFromArray(this_1.activeSelected, function (item) { return item.colIndex === colIndex_2 && item.rowIdent === rowState_1.identity; });
                            if (wasRemoved) {
                                removed.push({ rowIdent: rowState_1.identity, colIndex: colIndex_2 });
                            }
                        }
                    }
                }
            };
            var this_1 = this;
            try {
                for (var toUnselect_1 = __values(toUnselect), toUnselect_1_1 = toUnselect_1.next(); !toUnselect_1_1.done; toUnselect_1_1 = toUnselect_1.next()) {
                    var cellRef = toUnselect_1_1.value;
                    _loop_1(cellRef);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (toUnselect_1_1 && !toUnselect_1_1.done && (_a = toUnselect_1.return)) _a.call(toUnselect_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            if (toMarkRendered.size > 0) {
                (_b = this.extApi.grid.rowsApi).syncRows.apply(_b, __spreadArray(['data'], __read(Array.from(toMarkRendered.values()))));
            }
            this.selectionChanged$.next({ added: [], removed: removed });
        };
        /**
         * Clears the entire context, including view cache and memory cache (rows out of view)
         * @param syncView If true will sync the view and the context right after clearing which will ensure the view cache is hot and synced with the actual rendered rows
         * Some plugins will expect a row to have a context so this might be required.
         * The view and context are synced every time rows are rendered so make sure you set this to true only when you know there is no rendering call coming down the pipe.
         */
        ContextApi.prototype.clear = function (syncView) {
            var e_3, _a;
            this.viewCache.clear();
            this.viewCacheGhost.clear();
            this.cache.clear();
            if (syncView === true) {
                try {
                    for (var _b = __values(this.extApi.rowsApi.dataRows()), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var r = _c.value;
                        this.viewCache.set(r.rowIndex, r.context);
                        // we're clearing the existing view state on the component
                        // If in the future we want to update state and not clear, remove this one
                        // and instead just take the state and put it in the cache.
                        // e.g. if on column swap we want to swap cells in the context...
                        r.context.fromState(this.getCreateState(r.context));
                        this.syncViewAndContext();
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
        };
        ContextApi.prototype.saveState = function (context) {
            if (context instanceof PblRowContext) {
                this.cache.set(context.identity, context.getState());
            }
        };
        ContextApi.prototype.getRow = function (row) {
            var index = typeof row === 'number' ? row : findRowRenderedIndex(row);
            return this.rowContext(index);
        };
        ContextApi.prototype.getCell = function (rowOrCellElement, col) {
            if (typeof rowOrCellElement === 'number') {
                var rowContext = this.rowContext(rowOrCellElement);
                if (rowContext) {
                    return rowContext.cell(col);
                }
            }
            else {
                var ref = resolveCellReference(rowOrCellElement, this);
                if (ref instanceof PblCellContext) {
                    return ref;
                }
            }
        };
        ContextApi.prototype.getDataItem = function (cell) {
            var ref = resolveCellReference(cell, this);
            if (ref instanceof PblCellContext) {
                return ref.col.getValue(ref.rowContext.$implicit);
            }
            else if (ref) {
                var row = this.extApi.grid.ds.source[ref[0].dsIndex];
                var column = this.extApi.grid.columnApi.findColumnAt(ref[1]);
                return column.getValue(row);
            }
        };
        ContextApi.prototype.createCellContext = function (renderRowIndex, column) {
            var rowContext = this.rowContext(renderRowIndex);
            var colIndex = this.columnApi.indexOf(column);
            return rowContext.cell(colIndex);
        };
        ContextApi.prototype.rowContext = function (renderRowIndex) {
            return this.viewCache.get(renderRowIndex);
        };
        ContextApi.prototype.updateState = function (rowIdentity, rowStateOrCellIndex, cellState) {
            var currentRowState = this.cache.get(rowIdentity);
            if (currentRowState) {
                if (typeof rowStateOrCellIndex === 'number') {
                    var currentCellState = currentRowState.cells[rowStateOrCellIndex];
                    if (currentCellState) {
                        Object.assign(currentCellState, cellState);
                    }
                }
                else {
                    Object.assign(currentRowState, rowStateOrCellIndex);
                }
                var rowContext = this.findRowInView(rowIdentity);
                if (rowContext) {
                    rowContext.fromState(currentRowState);
                }
            }
        };
        /**
         * Try to find a specific row, using the row identity, in the current view.
         * If the row is not in the view (or even not in the cache) it will return undefined, otherwise returns the row's context instance (`PblRowContext`)
         * @param rowIdentity The row's identity. If a specific identity is used, please provide it otherwise provide the index of the row in the datasource.
         */
        ContextApi.prototype.findRowInView = function (rowIdentity) {
            var rowState = this.cache.get(rowIdentity);
            if (rowState) {
                var renderRowIndex = rowState.dsIndex - this.extApi.grid.ds.renderStart;
                var rowContext = this.viewCache.get(renderRowIndex);
                if (rowContext && rowContext.identity === rowIdentity) {
                    return rowContext;
                }
            }
        };
        ContextApi.prototype.findRowInCache = function (rowIdentity, offset, create) {
            var rowState = this.cache.get(rowIdentity);
            if (!offset) {
                return rowState;
            }
            else {
                var dsIndex = rowState.dsIndex + offset;
                var identity = this.getRowIdentity(dsIndex);
                if (identity !== null) {
                    var result = this.findRowInCache(identity);
                    if (!result && create && dsIndex < this.extApi.grid.ds.length) {
                        result = PblRowContext.defaultState(identity, dsIndex, this.columnApi.columns.length);
                        this.cache.set(identity, result);
                    }
                    return result;
                }
            }
        };
        ContextApi.prototype.getRowIdentity = function (dsIndex, rowData) {
            var ds = this.extApi.grid.ds;
            var primary = this.extApi.columnStore.primary;
            var row = rowData || ds.source[dsIndex];
            if (!row) {
                return null;
            }
            else {
                return primary ? primary.getValue(row) : dsIndex;
            }
        };
        /** @internal */
        ContextApi.prototype._createRowContext = function (data, renderRowIndex) {
            var context = new PblRowContext(data, this.extApi.grid.ds.renderStart + renderRowIndex, this.extApi);
            context.fromState(this.getCreateState(context));
            this.addToViewCache(renderRowIndex, context);
            return context;
        };
        ContextApi.prototype._updateRowContext = function (rowContext, renderRowIndex) {
            var dsIndex = this.extApi.grid.ds.renderStart + renderRowIndex;
            var identity = this.getRowIdentity(dsIndex, rowContext.$implicit);
            if (rowContext.identity !== identity) {
                rowContext.saveState();
                rowContext.dsIndex = dsIndex;
                rowContext.identity = identity;
                rowContext.fromState(this.getCreateState(rowContext));
                this.addToViewCache(renderRowIndex, rowContext);
            }
        };
        ContextApi.prototype.addToViewCache = function (rowIndex, rowContext) {
            this.viewCache.set(rowIndex, rowContext);
            this.viewCacheGhost.delete(rowContext.identity);
        };
        ContextApi.prototype.getCreateState = function (context) {
            var state = this.cache.get(context.identity);
            if (!state) {
                state = PblRowContext.defaultState(context.identity, context.dsIndex, this.columnApi.columns.length);
                this.cache.set(context.identity, state);
            }
            return state;
        };
        ContextApi.prototype.emitFocusChanged = function (curr) {
            this.focusChanged$.next({
                prev: this.focusChanged$.value.curr,
                curr: curr,
            });
        };
        ContextApi.prototype.destroy = function () {
            this.focusChanged$.complete();
            this.selectionChanged$.complete();
        };
        ContextApi.prototype.syncViewAndContext = function () {
            var _this = this;
            this.viewCacheGhost.forEach(function (ident) {
                if (!_this.findRowInView(ident)) {
                    _this.cache.get(ident).firstRender = false;
                }
            });
            this.viewCacheGhost = new Set(Array.from(this.viewCache.values()).filter(function (v) { return v.firstRender; }).map(function (v) { return v.identity; }));
        };
        return ContextApi;
    }());

    var PblNgridMultiTemplateRegistry = /** @class */ (function () {
        function PblNgridMultiTemplateRegistry(tRef, registry) {
            this.tRef = tRef;
            this.registry = registry;
        }
        PblNgridMultiTemplateRegistry.prototype.ngOnInit = function () {
            this.registry.addMulti(this.kind, this);
        };
        PblNgridMultiTemplateRegistry.prototype.ngOnDestroy = function () {
            this.registry.removeMulti(this.kind, this);
        };
        return PblNgridMultiTemplateRegistry;
    }());
    /** @nocollapse */ PblNgridMultiTemplateRegistry.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridMultiTemplateRegistry, deps: [{ token: i0__namespace.TemplateRef }, { token: PblNgridRegistryService }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ PblNgridMultiTemplateRegistry.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridMultiTemplateRegistry, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridMultiTemplateRegistry, decorators: [{
                type: i0.Directive
            }], ctorParameters: function () { return [{ type: i0__namespace.TemplateRef }, { type: PblNgridRegistryService }]; } });

    var PblNgridDataHeaderExtensionContext = /** @class */ (function (_super) {
        __extends(PblNgridDataHeaderExtensionContext, _super);
        function PblNgridDataHeaderExtensionContext() {
            return _super.call(this) || this;
        }
        // workaround, we need a parameter-less constructor since @ngtools/webpack@8.0.4
        // Non @Injectable classes are now getting addded with hard reference to the ctor params which at the class creation point are undefined
        // forwardRef() will not help since it's not inject by angular, we instantiate the class..
        // probably due to https://github.com/angular/angular-cli/commit/639198499973e0f437f059b3c933c72c733d93d8
        PblNgridDataHeaderExtensionContext.createDateHeaderCtx = function (headerCell, injector) {
            var instance = new PblNgridDataHeaderExtensionContext();
            instance.col = headerCell.columnDef.column;
            instance.grid = headerCell.grid;
            Object.defineProperty(instance, 'injector', { value: injector });
            return instance;
        };
        return PblNgridDataHeaderExtensionContext;
    }(MetaCellContext));
    /**
     * A generic, multi-purpose template reference for data header extensions.
     * The template's context is `PblNgridDataHeaderExtensionContext`:
     *
     * ```ts
     * interface PblNgridDataHeaderExtensionContext {
     *   col: PblMetaColumn;
     *   grid: PblNgridComponent<any>;
     *   injector: Injector;
     * }
     * ```
     *
     * By default it will render if registered but it is possible to provide a predicate to conditionally load it.
     *
     * ```html
     * <div *pblNgridHeaderExtensionRef="let ctx"></div>
     * ````
     *
     * Or with a `shouldRender` predicate:
     *
     * ```html
     * <div *pblNgridHeaderExtensionRef="shouldRender; let ctx"></div>
     * ```
     *
     * And in the component the template is defined on:
     *
     * ```ts
     * class MyComponent {
     *
     *   shouldRender = (context: PblNgridDataHeaderExtensionContext) => {
     *     // Some code returning true or false
     *   }
     * }
     * ```
     *
     * Note that the `shouldRender` predicate is run once when the header initialize.
     */
    var PblNgridHeaderExtensionRefDirective = /** @class */ (function (_super) {
        __extends(PblNgridHeaderExtensionRefDirective, _super);
        function PblNgridHeaderExtensionRefDirective(tRef, registry) {
            var _this = _super.call(this, tRef, registry) || this;
            _this.name = 'genericHeaderExtension-' + PblNgridHeaderExtensionRefDirective._id++;
            _this.kind = 'dataHeaderExtensions';
            return _this;
        }
        return PblNgridHeaderExtensionRefDirective;
    }(PblNgridMultiTemplateRegistry));
    PblNgridHeaderExtensionRefDirective._id = 0;
    /** @nocollapse */ PblNgridHeaderExtensionRefDirective.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridHeaderExtensionRefDirective, deps: [{ token: i0__namespace.TemplateRef }, { token: PblNgridRegistryService }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ PblNgridHeaderExtensionRefDirective.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridHeaderExtensionRefDirective, selector: "[pblNgridHeaderExtensionRef]", inputs: { shouldRender: ["pblNgridHeaderExtensionRef", "shouldRender"] }, usesInheritance: true, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridHeaderExtensionRefDirective, decorators: [{
                type: i0.Directive,
                args: [{ selector: '[pblNgridHeaderExtensionRef]' }]
            }], ctorParameters: function () { return [{ type: i0__namespace.TemplateRef }, { type: PblNgridRegistryService }]; }, propDecorators: { shouldRender: [{
                    type: i0.Input,
                    args: ['pblNgridHeaderExtensionRef']
                }] } });

    var PblNgridMultiComponentRegistry = /** @class */ (function () {
        function PblNgridMultiComponentRegistry() {
        }
        return PblNgridMultiComponentRegistry;
    }());

    var PblNgridSingleTemplateRegistry = /** @class */ (function () {
        function PblNgridSingleTemplateRegistry(tRef, registry) {
            this.tRef = tRef;
            this.registry = registry;
        }
        PblNgridSingleTemplateRegistry.prototype.ngOnInit = function () {
            this.registry.setSingle(this.kind, this);
        };
        PblNgridSingleTemplateRegistry.prototype.ngOnDestroy = function () {
            this.registry.setSingle(this.kind, undefined);
        };
        return PblNgridSingleTemplateRegistry;
    }());
    /** @nocollapse */ PblNgridSingleTemplateRegistry.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridSingleTemplateRegistry, deps: [{ token: i0__namespace.TemplateRef }, { token: PblNgridRegistryService }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ PblNgridSingleTemplateRegistry.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridSingleTemplateRegistry, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridSingleTemplateRegistry, decorators: [{
                type: i0.Directive
            }], ctorParameters: function () { return [{ type: i0__namespace.TemplateRef }, { type: PblNgridRegistryService }]; } });

    /**
     * Marks the element as the display element when grid has no data.
     *
     * @example
     * ```html
     *   <pbl-ngrid>
     *     <div *pblNgridNoDataRef style="height: 100%; display: flex; align-items: center; justify-content: center">
     *       <span>No Data</span>
     *     </div>
     *   </pbl-ngrid>
     * ```
     */
    var PblNgridNoDataRefDirective = /** @class */ (function (_super) {
        __extends(PblNgridNoDataRefDirective, _super);
        function PblNgridNoDataRefDirective(tRef, registry) {
            var _this = _super.call(this, tRef, registry) || this;
            _this.kind = 'noData';
            return _this;
        }
        return PblNgridNoDataRefDirective;
    }(PblNgridSingleTemplateRegistry));
    /** @nocollapse */ PblNgridNoDataRefDirective.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridNoDataRefDirective, deps: [{ token: i0__namespace.TemplateRef }, { token: PblNgridRegistryService }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ PblNgridNoDataRefDirective.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridNoDataRefDirective, selector: "[pblNgridNoDataRef]", usesInheritance: true, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridNoDataRefDirective, decorators: [{
                type: i0.Directive,
                args: [{ selector: '[pblNgridNoDataRef]' }]
            }], ctorParameters: function () { return [{ type: i0__namespace.TemplateRef }, { type: PblNgridRegistryService }]; } });

    /**
     * Marks the element as the display element for pagination
     */
    var PblNgridPaginatorRefDirective = /** @class */ (function (_super) {
        __extends(PblNgridPaginatorRefDirective, _super);
        function PblNgridPaginatorRefDirective(tRef, registry) {
            var _this = _super.call(this, tRef, registry) || this;
            _this.kind = 'paginator';
            return _this;
        }
        return PblNgridPaginatorRefDirective;
    }(PblNgridSingleTemplateRegistry));
    /** @nocollapse */ PblNgridPaginatorRefDirective.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridPaginatorRefDirective, deps: [{ token: i0__namespace.TemplateRef }, { token: PblNgridRegistryService }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ PblNgridPaginatorRefDirective.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridPaginatorRefDirective, selector: "[pblNgridPaginatorRef]", usesInheritance: true, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridPaginatorRefDirective, decorators: [{
                type: i0.Directive,
                args: [{ selector: '[pblNgridPaginatorRef]' }]
            }], ctorParameters: function () { return [{ type: i0__namespace.TemplateRef }, { type: PblNgridRegistryService }]; } });

    /*
        We're using `StylingDiffer`, which is an exact copy of the style differ used for `ngStyle` and `ngClass`.
        The class is not exposed so we use a hard-copy.
        `StylingDiffer` is used only when IVY is enabled but here we've adopted it to be used in both modes. (pre IVY and IVY)
    */
    /**
     * Bind to the class / style attributes of the container of a cell template.
     * For class bindings use [ngridCellClass] and for style bindings use [ngridCellStyle].
     *
     * This is like [ngClass] or [ngStyle] but not for the host of the directive but to it's parent.
     *
     * - [ngridCellClass] accepts the same type of values that [ngClass] does.
     * - [ngridCellStyle] accepts the same type of values that [ngStyle] does.
     *
     * ## Example
     *
     * We want to create a new cell type called "balance" that represents the balance of a bank account.
     * We also want to have different background color, green if the account balance if positive and red if it's negative.
     *
     * ```html
     * <div *pblNgridCellTypeDef="'balance'; value as value"
     *      [ngClass]="value < 0 ? 'balance-negative' : 'balance-positive'">{{ value  }}
     * </div>
     * ```
     *
     * The example above will work but the background will not fill the entire cell, only the `div` it is applied on.
     * This is because the container of the `div` has internal styling that apply padding (among other styles) to the cell.
     *
     * The container is controlled internally by ngrid, but you can access it's style / class attributes using this directive.
     *
     * ```html
     * <div *pblNgridCellTypeDef="'balance'; value as value"
     *      [ngridCellClass]="value < 0 ? 'balance-negative' : 'balance-positive'">{{ value  }}
     * </div>
     * ```
     *
     * > Because style / class is applied on the parent and the parent can have multiple children it is possible to apply this directive
     * on multiple children, do not do this as it will have unexpected results.
     */
    var PblNgridCellStyling = /** @class */ (function () {
        function PblNgridCellStyling(elRef) {
            this.elRef = elRef;
            this._lastStyle = new Set();
            this._lastClass = new Set();
        }
        Object.defineProperty(PblNgridCellStyling.prototype, "style", {
            set: function (value) {
                if (!this._styleDiffer) {
                    this._styleDiffer = new i1.StylingDiffer('NgStyle', 8 /* AllowUnits */);
                }
                this._styleDiffer.setInput(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblNgridCellStyling.prototype, "klass", {
            set: function (value) {
                if (!this._classDiffer) {
                    this._classDiffer = new i1.StylingDiffer('NgClass', 1 /* TrimProperties */ | 2 /* AllowSubKeys */ | 4 /* AllowStringValue */ | 16 /* ForceAsMap */);
                }
                this._classDiffer.setInput(value);
            },
            enumerable: false,
            configurable: true
        });
        PblNgridCellStyling.prototype.ngAfterViewInit = function () {
            this._parent = this.elRef.nativeElement.parentElement;
            this.updateParent();
        };
        PblNgridCellStyling.prototype.ngDoCheck = function () { this, this.updateParent(); };
        PblNgridCellStyling.prototype.updateParent = function () {
            var e_1, _c, e_2, _d, e_3, _e, e_4, _f;
            var _a, _b;
            if (this._parent) {
                if ((_a = this._styleDiffer) === null || _a === void 0 ? void 0 : _a.updateValue()) {
                    var lastStyle = this._lastStyle;
                    this._lastStyle = new Set();
                    try {
                        for (var _g = __values(Object.keys(this._styleDiffer.value)), _h = _g.next(); !_h.done; _h = _g.next()) {
                            var key = _h.value;
                            this._parent.style[key] = this._styleDiffer.value[key];
                            lastStyle.delete(key);
                            this._lastStyle.add(key);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_h && !_h.done && (_c = _g.return)) _c.call(_g);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    if (lastStyle.size > 0) {
                        try {
                            for (var _j = __values(lastStyle.values()), _k = _j.next(); !_k.done; _k = _j.next()) {
                                var key = _k.value;
                                this._parent.style[key] = null;
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (_k && !_k.done && (_d = _j.return)) _d.call(_j);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                    }
                }
                if ((_b = this._classDiffer) === null || _b === void 0 ? void 0 : _b.updateValue()) {
                    var lastClass = this._lastClass;
                    this._lastClass = new Set();
                    try {
                        for (var _l = __values(Object.keys(this._classDiffer.value)), _m = _l.next(); !_m.done; _m = _l.next()) {
                            var key = _m.value;
                            if (this._classDiffer.value[key]) {
                                this._parent.classList.add(key);
                                this._lastClass.add(key);
                            }
                            else {
                                this._parent.classList.remove(key);
                            }
                            lastClass.delete(key);
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_m && !_m.done && (_e = _l.return)) _e.call(_l);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                    if (lastClass.size > 0) {
                        try {
                            for (var _o = __values(lastClass.values()), _p = _o.next(); !_p.done; _p = _o.next()) {
                                var key = _p.value;
                                this._parent.classList.remove(key);
                            }
                        }
                        catch (e_4_1) { e_4 = { error: e_4_1 }; }
                        finally {
                            try {
                                if (_p && !_p.done && (_f = _o.return)) _f.call(_o);
                            }
                            finally { if (e_4) throw e_4.error; }
                        }
                    }
                }
            }
        };
        return PblNgridCellStyling;
    }());
    /** @nocollapse */ PblNgridCellStyling.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridCellStyling, deps: [{ token: i0__namespace.ElementRef }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ PblNgridCellStyling.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridCellStyling, selector: "[ngridCellStyle], [ngridCellClass]", inputs: { style: ["ngridCellStyle", "style"], klass: ["ngridCellClass", "klass"] }, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridCellStyling, decorators: [{
                type: i0.Directive,
                args: [{ selector: '[ngridCellStyle], [ngridCellClass]' }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }]; }, propDecorators: { style: [{
                    type: i0.Input,
                    args: ['ngridCellStyle']
                }], klass: [{
                    type: i0.Input,
                    args: ['ngridCellClass']
                }] } });

    function initCellElement(el, column, prev) {
        var e_1, _a, e_2, _b, e_3, _c, e_4, _d;
        if (prev) {
            // If IE 11 is dropped before we switch to setting a single class name, change to multi param
            // with destructuring.
            var classList_1 = el.classList;
            try {
                for (var _e = __values(prev.columnDef._columnCssClassName), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var className = _f.value;
                    classList_1.add(className);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
                }
                finally { if (e_1) throw e_1.error; }
            }
            el.classList.remove(uniqueColumnCss(prev.columnDef));
            if (prev.type) {
                el.classList.remove(uniqueColumnTypeCss(prev.type));
            }
            if (prev.css) {
                var css = prev.css.split(' ');
                try {
                    for (var css_1 = __values(css), css_1_1 = css_1.next(); !css_1_1.done; css_1_1 = css_1.next()) {
                        var c = css_1_1.value;
                        el.classList.remove(c);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (css_1_1 && !css_1_1.done && (_b = css_1.return)) _b.call(css_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        // If IE 11 is dropped before we switch to setting a single class name, change to multi param
        // with destructuring.
        var classList = el.classList;
        try {
            for (var _g = __values(column.columnDef._columnCssClassName), _h = _g.next(); !_h.done; _h = _g.next()) {
                var className = _h.value;
                classList.add(className);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_h && !_h.done && (_c = _g.return)) _c.call(_g);
            }
            finally { if (e_3) throw e_3.error; }
        }
        el.classList.add(uniqueColumnCss(column.columnDef));
        if (column.type) {
            el.classList.add(uniqueColumnTypeCss(column.type));
        }
        if (column.css) {
            var css = column.css.split(' ');
            try {
                for (var css_2 = __values(css), css_2_1 = css_2.next(); !css_2_1.done; css_2_1 = css_2.next()) {
                    var c = css_2_1.value;
                    el.classList.add(c);
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (css_2_1 && !css_2_1.done && (_d = css_2.return)) _d.call(css_2);
                }
                finally { if (e_4) throw e_4.error; }
            }
        }
    }
    function initCellHeaderFooter(element, isFooter) {
        var _a;
        (_a = element.classList).add.apply(_a, __spreadArray([], __read((isFooter ? ['cdk-footer-cell', 'pbl-ngrid-footer-cell'] : ['cdk-header-cell', 'pbl-ngrid-header-cell']))));
    }
    function applyWidth() {
        this.columnDef.applyWidth(this.el);
    }
    function applySourceWidth() {
        this.columnDef.applySourceWidth(this.el);
    }

    var PblNgridBaseCell = /** @class */ (function () {
        function PblNgridBaseCell(extApi, elementRef) {
            this.extApi = extApi;
            this.el = elementRef.nativeElement;
        }
        Object.defineProperty(PblNgridBaseCell.prototype, "owner", {
            get: function () { return this._owner; },
            enumerable: false,
            configurable: true
        });
        PblNgridBaseCell.prototype.setOwner = function (owner) {
            this._owner = owner;
        };
        PblNgridBaseCell.prototype.focus = function () {
            this.el.focus({ preventScroll: true });
            this.extApi.viewport._scrollIntoView(this.el);
        };
        PblNgridBaseCell.prototype.ngOnDestroy = function () {
            i1.unrx.kill(this);
        };
        return PblNgridBaseCell;
    }());
    /** @nocollapse */ PblNgridBaseCell.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridBaseCell, deps: [{ token: EXT_API_TOKEN }, { token: i0__namespace.ElementRef }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ PblNgridBaseCell.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridBaseCell, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridBaseCell, decorators: [{
                type: i0.Directive
            }], ctorParameters: function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [EXT_API_TOKEN]
                        }] }, { type: i0__namespace.ElementRef }];
        } });

    var PBL_NGRID_MAP = new Map();
    /**
     * A controller that groups columns of a grid and listens to resize events
     * and will notify the grid once resize occurs
     */
    var PblNgridColumnSizeObserverGroup = /** @class */ (function () {
        function PblNgridColumnSizeObserverGroup(extApi) {
            var _this = this;
            this.extApi = extApi;
            this.columns = [];
            this.entries = new WeakMap();
            this.ro = new ResizeObserver(function (entries) {
                requestAnimationFrame(function () { return _this.onResize(entries); });
            });
        }
        PblNgridColumnSizeObserverGroup.get = function (extApi) {
            var controller = PBL_NGRID_MAP.get(extApi.grid);
            if (!controller) {
                controller = new PblNgridColumnSizeObserverGroup(extApi);
                PBL_NGRID_MAP.set(extApi.grid, controller);
            }
            return controller;
        };
        PblNgridColumnSizeObserverGroup.prototype.has = function (col) {
            return this.columns.indexOf(col) !== -1;
        };
        PblNgridColumnSizeObserverGroup.prototype.hasColumn = function (column) {
            return this.columns.some(function (c) { return c.column === column; });
        };
        PblNgridColumnSizeObserverGroup.prototype.add = function (col) {
            this.entries.set(col.target, col);
            this.ro.observe(col.target);
            this.columns.push(col);
        };
        PblNgridColumnSizeObserverGroup.prototype.remove = function (col) {
            this.ro.unobserve(col.target);
            this.entries.delete(col.target);
            var idx = this.columns.indexOf(col);
            if (idx > -1) {
                this.columns.splice(idx, 1);
            }
            if (this.columns.length === 0) {
                this.ro.disconnect();
                PBL_NGRID_MAP.delete(this.extApi.grid);
            }
        };
        PblNgridColumnSizeObserverGroup.prototype.onResize = function (entries) {
            var e_1, _a, e_2, _b;
            var resized = [];
            try {
                for (var entries_1 = __values(entries), entries_1_1 = entries_1.next(); !entries_1_1.done; entries_1_1 = entries_1.next()) {
                    var entry = entries_1_1.value;
                    var o = this.entries.get(entry.target);
                    if (o) {
                        resized.push(o);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (entries_1_1 && !entries_1_1.done && (_a = entries_1.return)) _a.call(entries_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            if (resized.length > 0) {
                var isDragging = false;
                try {
                    for (var resized_1 = __values(resized), resized_1_1 = resized_1.next(); !resized_1_1.done; resized_1_1 = resized_1.next()) {
                        var c = resized_1_1.value;
                        isDragging = isDragging || c.column.columnDef.isDragging;
                        c.updateSize();
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (resized_1_1 && !resized_1_1.done && (_b = resized_1.return)) _b.call(resized_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                if (!isDragging) {
                    this.extApi.widthCalc.calcColumnWidth(this.columns.map(function (c) { return c.column; }));
                }
            }
        };
        return PblNgridColumnSizeObserverGroup;
    }());

    /**
     * A wrapper around `ColumnSizeInfo` that listen to size changes from the element of a cell, using the `ResizeObserver` API.
     * When a resize event is triggered it will call `updateSize()` which in turn update the layout and notify the column about the resize event.
     *
     * In other words, all cell element of the grid, attached to a column, which are wrapped with this observer will trigger resize events.
     *
     * Because most of the size changes concern all columns of a row and because ResizeObserver will emit them all in the same event
     * an entire row should emit once, with all columns.
     *
     * > This class can be extended by a Directive class to be used by declarative markup in angular templates.
     */
    var PblColumnSizeObserver = /** @class */ (function (_super) {
        __extends(PblColumnSizeObserver, _super);
        function PblColumnSizeObserver(element, extApi) {
            var _this = _super.call(this, element) || this;
            _this.controller = PblNgridColumnSizeObserverGroup.get(extApi);
            return _this;
        }
        PblColumnSizeObserver.prototype.attachColumn = function (column) {
            _super.prototype.attachColumn.call(this, column);
            if (!column) {
                this.controller.remove(this);
            }
            else if (!this.controller.has(this)) {
                this.updateSize();
                this.controller.add(this);
            }
        };
        PblColumnSizeObserver.prototype.destroy = function () {
            this.controller.remove(this);
            this.detachColumn();
        };
        return PblColumnSizeObserver;
    }(ColumnSizeInfo));

    var lastDataHeaderExtensions = new Map();
    /**
     * Header cell component.
     * The header cell component will render the header cell template and add the proper classes and role.
     *
     * It is also responsible for creating and managing the any `dataHeaderExtensions` registered in the registry.
     * These extensions add features to the cells either as a template instance or as a component instance.
     * Examples: Sorting behavior, drag&drop/resize handlers, menus etc...
     */
    var PblNgridHeaderCellComponent = /** @class */ (function (_super) {
        __extends(PblNgridHeaderCellComponent, _super);
        function PblNgridHeaderCellComponent(extApi, elementRef, zone) {
            var _this = _super.call(this, extApi, elementRef) || this;
            _this.zone = zone;
            return _this;
        }
        Object.defineProperty(PblNgridHeaderCellComponent.prototype, "columnDef", {
            get: function () { var _a; return (_a = this.column) === null || _a === void 0 ? void 0 : _a.columnDef; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblNgridHeaderCellComponent.prototype, "grid", {
            get: function () { return this.extApi.grid; },
            enumerable: false,
            configurable: true
        });
        PblNgridHeaderCellComponent.prototype.setColumn = function (column, gridWidthRow) {
            var prev = this.column;
            if (prev !== column) {
                if (prev) {
                    i1.unrx.kill(this, prev);
                }
                this.column = column;
                var predicate = void 0;
                var view = void 0;
                var widthUpdater = void 0;
                widthUpdater = gridWidthRow ? applySourceWidth : applyWidth;
                predicate = function (event) { return (!gridWidthRow && event.reason !== 'update') || (gridWidthRow && event.reason !== 'resize'); };
                view = !gridWidthRow ? this.initMainHeaderColumnView(column) : undefined;
                if (gridWidthRow && !this.resizeObserver) {
                    this.resizeObserver = new PblColumnSizeObserver(this.el, this.extApi);
                }
                this.columnDef.widthChange
                    .pipe(operators.filter(predicate), i1.unrx(this, column))
                    .subscribe(widthUpdater.bind(this));
                if (view) {
                    view.detectChanges();
                }
                widthUpdater.call(this);
                initCellElement(this.el, column);
            }
        };
        PblNgridHeaderCellComponent.prototype.updateSize = function () {
            if (this.resizeObserver) {
                this.resizeObserver.updateSize();
            }
        };
        PblNgridHeaderCellComponent.prototype.ngAfterViewInit = function () {
            if (this.resizeObserver) {
                this.resizeObserver.column = this.column;
            }
        };
        PblNgridHeaderCellComponent.prototype.ngOnDestroy = function () {
            var _a;
            (_a = this.resizeObserver) === null || _a === void 0 ? void 0 : _a.destroy();
            if (this.column) {
                i1.unrx(this, this.column);
            }
            _super.prototype.ngOnDestroy.call(this);
        };
        PblNgridHeaderCellComponent.prototype.initMainHeaderColumnView = function (col) {
            var _this = this;
            this.cellCtx = PblNgridDataHeaderExtensionContext.createDateHeaderCtx(this, this.vcRef.injector);
            var context = this.cellCtx;
            var view = this.vcRef.createEmbeddedView(col.headerCellTpl, context);
            this.zone.onStable
                .pipe(operators.first())
                .subscribe(function () {
                _this.runHeaderExtensions(context, view);
                var v = _this.vcRef.get(0);
                // at this point the view might get destroyed, its possible...
                if (!v.destroyed) {
                    v.detectChanges();
                }
            });
            return view;
        };
        PblNgridHeaderCellComponent.prototype.runHeaderExtensions = function (context, view) {
            var e_1, _b;
            var _this = this;
            // we collect the first header extension for each unique name only once per grid instance
            var extensions = lastDataHeaderExtensions.get(this.grid);
            if (!extensions) {
                var dataHeaderExtensions_1 = new Map();
                this.grid.registry.forMulti('dataHeaderExtensions', function (values) {
                    var e_2, _b;
                    try {
                        for (var values_1 = __values(values), values_1_1 = values_1.next(); !values_1_1.done; values_1_1 = values_1.next()) {
                            var value = values_1_1.value;
                            if (!dataHeaderExtensions_1.has(value.name)) {
                                dataHeaderExtensions_1.set(value.name, value);
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (values_1_1 && !values_1_1.done && (_b = values_1.return)) _b.call(values_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                });
                extensions = Array.from(dataHeaderExtensions_1.values());
                lastDataHeaderExtensions.set(this.grid, extensions);
                // destroy it on the next turn, we know all cells will render on the same turn.
                this.zone.onStable.pipe(operators.first()).subscribe(function () { return lastDataHeaderExtensions.delete(_this.grid); });
            }
            var rootNodes = view.rootNodes;
            try {
                for (var extensions_1 = __values(extensions), extensions_1_1 = extensions_1.next(); !extensions_1_1.done; extensions_1_1 = extensions_1.next()) {
                    var ext = extensions_1_1.value;
                    if (!ext.shouldRender || ext.shouldRender(context)) {
                        if (ext instanceof PblNgridMultiTemplateRegistry) {
                            var extView = this.vcRef.createEmbeddedView(ext.tRef, context);
                            extView.markForCheck();
                        }
                        else if (ext instanceof PblNgridMultiComponentRegistry) {
                            rootNodes = this.createComponent(ext, context, rootNodes);
                        }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (extensions_1_1 && !extensions_1_1.done && (_b = extensions_1.return)) _b.call(extensions_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        PblNgridHeaderCellComponent.prototype.createComponent = function (ext, context, rootNodes) {
            var factory = ext.getFactory(context);
            var projectedContent = [];
            if (ext.projectContent) {
                projectedContent.push(rootNodes);
            }
            var cmpRef = this.vcRef.createComponent(factory, this.vcRef.length, null, projectedContent);
            if (ext.projectContent) {
                rootNodes = [cmpRef.location.nativeElement];
            }
            if (ext.onCreated) {
                ext.onCreated(context, cmpRef);
            }
            return rootNodes;
        };
        return PblNgridHeaderCellComponent;
    }(PblNgridBaseCell));
    /** @nocollapse */ PblNgridHeaderCellComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridHeaderCellComponent, deps: [{ token: EXT_API_TOKEN }, { token: i0__namespace.ElementRef }, { token: i0__namespace.NgZone }], target: i0__namespace.ɵɵFactoryTarget.Component });
    /** @nocollapse */ PblNgridHeaderCellComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridHeaderCellComponent, selector: "pbl-ngrid-header-cell", host: { attributes: { "role": "columnheader" }, classAttribute: "cdk-header-cell pbl-ngrid-header-cell" }, viewQueries: [{ propertyName: "vcRef", first: true, predicate: ["vcRef"], descendants: true, read: i0.ViewContainerRef, static: true }], exportAs: ["ngridHeaderCell"], usesInheritance: true, ngImport: i0__namespace, template: "<ng-container #vcRef></ng-container>", isInline: true, changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridHeaderCellComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'pbl-ngrid-header-cell',
                        // tslint:disable-next-line: no-host-metadata-property
                        host: {
                            class: 'cdk-header-cell pbl-ngrid-header-cell',
                            role: 'columnheader',
                        },
                        exportAs: 'ngridHeaderCell',
                        template: "<ng-container #vcRef></ng-container>",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                    }]
            }], ctorParameters: function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [EXT_API_TOKEN]
                        }] }, { type: i0__namespace.ElementRef }, { type: i0__namespace.NgZone }];
        }, propDecorators: { vcRef: [{
                    type: i0.ViewChild,
                    args: ['vcRef', { read: i0.ViewContainerRef, static: true }]
                }] } });

    var COLUMN_EDITABLE_CELL_CLASS = 'pbl-ngrid-editable-cell';
    function initDataCellElement(el, column, prev) {
        if ((prev === null || prev === void 0 ? void 0 : prev.editable) && prev.editorTpl) {
            el.classList.remove(COLUMN_EDITABLE_CELL_CLASS);
        }
        if (column.editable && column.editorTpl) {
            el.classList.add(COLUMN_EDITABLE_CELL_CLASS);
        }
    }
    /** Cell template container that adds the right classes and role. */
    var PblNgridCellComponent = /** @class */ (function (_super) {
        __extends(PblNgridCellComponent, _super);
        function PblNgridCellComponent() {
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            _this.focused = false;
            _this.selected = false;
            return _this;
        }
        PblNgridCellComponent.prototype.syncColumn = function () {
            if (this.column) {
                this.colIndex = this.column.columnDef.grid.columnApi.indexOf(this.column);
            }
        };
        PblNgridCellComponent.prototype.setContext = function (context) {
            this._rowCtx = context;
        };
        PblNgridCellComponent.prototype.setColumn = function (column) {
            var _this = this;
            var prev = this.column;
            if (prev !== column) {
                if (prev) {
                    i1.unrx.kill(this, prev);
                }
                this.column = column;
                this.colIndex = this.column.columnDef.grid.columnApi.indexOf(column);
                column.columnDef.applyWidth(this.el);
                initCellElement(this.el, column, prev);
                initDataCellElement(this.el, column, prev);
                /*  Apply width changes to this data cell
                    We don't update "update" events because they are followed by a resize event which will update the absolute value (px) */
                column.columnDef.widthChange
                    .pipe(operators.filter(function (event) { return event.reason !== 'update'; }), i1.unrx(this, column))
                    .subscribe(function (event) { return _this.column.columnDef.applyWidth(_this.el); });
            }
        };
        PblNgridCellComponent.prototype.ngDoCheck = function () {
            if (this._rowCtx) {
                var cellContext = this.cellCtx = this._rowCtx.cell(this.colIndex);
                this.template = cellContext.editing ? this.column.editorTpl : this.column.cellTpl;
                if (cellContext.focused !== this.focused) {
                    if (this.focused = cellContext.focused) {
                        this.el.classList.add('pbl-ngrid-cell-focused');
                    }
                    else {
                        this.el.classList.remove('pbl-ngrid-cell-focused');
                    }
                }
                if (this.cellCtx.selected !== this.selected) {
                    if (this.selected = cellContext.selected) {
                        this.el.classList.add('pbl-ngrid-cell-selected');
                    }
                    else {
                        this.el.classList.remove('pbl-ngrid-cell-selected');
                    }
                }
            }
        };
        return PblNgridCellComponent;
    }(PblNgridBaseCell));
    /** @nocollapse */ PblNgridCellComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridCellComponent, deps: null, target: i0__namespace.ɵɵFactoryTarget.Component });
    /** @nocollapse */ PblNgridCellComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridCellComponent, selector: "pbl-ngrid-cell", host: { attributes: { "role": "gridcell" }, properties: { "attr.id": "column?.id", "attr.tabindex": "column?.columnDef?.grid.cellFocus" }, classAttribute: "pbl-ngrid-cell" }, exportAs: ["pblNgridCell"], usesInheritance: true, ngImport: i0__namespace, template: "<ng-container *ngTemplateOutlet=\"template; context: cellCtx\"></ng-container>", isInline: true, directives: [{ type: i1__namespace.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridCellComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'pbl-ngrid-cell',
                        template: "<ng-container *ngTemplateOutlet=\"template; context: cellCtx\"></ng-container>",
                        // tslint:disable-next-line: no-host-metadata-property
                        host: {
                            'class': 'pbl-ngrid-cell',
                            'role': 'gridcell',
                            '[attr.id]': 'column?.id',
                            '[attr.tabindex]': 'column?.columnDef?.grid.cellFocus'
                        },
                        exportAs: 'pblNgridCell',
                    }]
            }] });

    var PblNgridFooterCellComponent = /** @class */ (function (_super) {
        __extends(PblNgridFooterCellComponent, _super);
        function PblNgridFooterCellComponent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(PblNgridFooterCellComponent.prototype, "columnDef", {
            get: function () { var _a; return (_a = this.column) === null || _a === void 0 ? void 0 : _a.columnDef; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblNgridFooterCellComponent.prototype, "grid", {
            get: function () { return this.extApi.grid; },
            enumerable: false,
            configurable: true
        });
        PblNgridFooterCellComponent.prototype.setColumn = function (column) {
            var prev = this.column;
            if (prev !== column) {
                if (prev) {
                    i1.unrx.kill(this, prev);
                }
                this.column = column;
                this.cellCtx = MetaCellContext.create(column, this.grid);
                applyWidth.call(this);
                initCellElement(this.el, column);
                this.columnDef.widthChange
                    .pipe(operators.filter(function (event) { return event.reason !== 'update'; }), i1.unrx(this, column))
                    .subscribe(applyWidth.bind(this));
            }
        };
        PblNgridFooterCellComponent.prototype.ngOnDestroy = function () {
            if (this.column) {
                i1.unrx(this, this.column);
            }
            _super.prototype.ngOnDestroy.call(this);
        };
        return PblNgridFooterCellComponent;
    }(PblNgridBaseCell));
    /** @nocollapse */ PblNgridFooterCellComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridFooterCellComponent, deps: null, target: i0__namespace.ɵɵFactoryTarget.Component });
    /** @nocollapse */ PblNgridFooterCellComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridFooterCellComponent, selector: "pbl-ngrid-footer-cell", host: { attributes: { "role": "gridcell" }, classAttribute: "cdk-footer-cell pbl-ngrid-footer-cell" }, usesInheritance: true, ngImport: i0__namespace, template: "<ng-container *ngTemplateOutlet=\"column?.footerCellTpl; context: cellCtx\"></ng-container>", isInline: true, directives: [{ type: i1__namespace.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridFooterCellComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'pbl-ngrid-footer-cell',
                        template: "<ng-container *ngTemplateOutlet=\"column?.footerCellTpl; context: cellCtx\"></ng-container>",
                        host: {
                            class: 'cdk-footer-cell pbl-ngrid-footer-cell',
                            role: 'gridcell',
                        },
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                    }]
            }] });

    var HEADER_GROUP_CSS = "pbl-header-group-cell";
    var HEADER_GROUP_PLACE_HOLDER_CSS = "pbl-header-group-cell-placeholder";
    /**
     * Header cell component.
     * The header cell component will render the header cell template and add the proper classes and role.
     *
     * It is also responsible for creating and managing the any `dataHeaderExtensions` registered in the registry.
     * These extensions add features to the cells either as a template instance or as a component instance.
     * Examples: Sorting behavior, drag&drop/resize handlers, menus etc...
     */
    var PblNgridMetaCellComponent = /** @class */ (function (_super) {
        __extends(PblNgridMetaCellComponent, _super);
        function PblNgridMetaCellComponent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(PblNgridMetaCellComponent.prototype, "columnDef", {
            get: function () { return this.column.columnDef; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblNgridMetaCellComponent.prototype, "grid", {
            get: function () { return this.extApi.grid; },
            enumerable: false,
            configurable: true
        });
        PblNgridMetaCellComponent.prototype.setColumn = function (column, isFooter) {
            var _this = this;
            var prev = this.column;
            if (prev !== column) {
                if (prev) {
                    i1.unrx.kill(this, prev);
                }
                this.column = column;
                if (column) {
                    if (!column.columnDef) {
                        new PblNgridColumnDef(this.extApi).column = column;
                        column.columnDef.name = column.id;
                    }
                    this.cellCtx = MetaCellContext.create(column, this.grid);
                    if (isPblColumnGroup(column)) {
                        this.el.classList.add(HEADER_GROUP_CSS);
                        if (column.placeholder) {
                            this.el.classList.add(HEADER_GROUP_PLACE_HOLDER_CSS);
                        }
                    }
                    this.columnDef.widthChange
                        .pipe(operators.filter(function (event) { return event.reason !== 'resize'; }), i1.unrx(this, column))
                        .subscribe(function (event) { return _this.columnDef.applySourceWidth(_this.el); });
                    applySourceWidth.call(this);
                    initCellElement(this.el, column);
                    initCellHeaderFooter(this.el, isFooter);
                }
            }
        };
        PblNgridMetaCellComponent.prototype.ngOnDestroy = function () {
            if (this.column) {
                i1.unrx(this, this.column);
            }
            _super.prototype.ngOnDestroy.call(this);
        };
        return PblNgridMetaCellComponent;
    }(PblNgridBaseCell));
    /** @nocollapse */ PblNgridMetaCellComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridMetaCellComponent, deps: null, target: i0__namespace.ɵɵFactoryTarget.Component });
    /** @nocollapse */ PblNgridMetaCellComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridMetaCellComponent, selector: "pbl-ngrid-meta-cell", host: { attributes: { "role": "cell" } }, viewQueries: [{ propertyName: "vcRef", first: true, predicate: ["vcRef"], descendants: true, read: i0.ViewContainerRef, static: true }], exportAs: ["ngridMetaCell"], usesInheritance: true, ngImport: i0__namespace, template: "<ng-container *ngTemplateOutlet=\"column?.template; context: cellCtx\"></ng-container>", isInline: true, directives: [{ type: i1__namespace.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridMetaCellComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'pbl-ngrid-meta-cell',
                        // tslint:disable-next-line: no-host-metadata-property
                        host: {
                            role: 'cell',
                        },
                        exportAs: 'ngridMetaCell',
                        template: "<ng-container *ngTemplateOutlet=\"column?.template; context: cellCtx\"></ng-container>",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                    }]
            }], propDecorators: { vcRef: [{
                    type: i0.ViewChild,
                    args: ['vcRef', { read: i0.ViewContainerRef, static: true }]
                }] } });

    // tslint:disable:use-input-property-decorator
    var PblNgridBaseCellDef = /** @class */ (function () {
        function PblNgridBaseCellDef(tRef, registry) {
            this.tRef = tRef;
            this.registry = registry;
        }
        return PblNgridBaseCellDef;
    }());
    /** @nocollapse */ PblNgridBaseCellDef.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridBaseCellDef, deps: [{ token: i0__namespace.TemplateRef }, { token: PblNgridRegistryService }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ PblNgridBaseCellDef.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridBaseCellDef, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridBaseCellDef, decorators: [{
                type: i0.Directive
            }], ctorParameters: function () { return [{ type: i0__namespace.TemplateRef }, { type: PblNgridRegistryService }]; } });

    /**
     * Header Cell definition for the pbl-ngrid.
     * Captures the template of a column's data row header cell as well as header cell-specific properties.
     *
     * `pblNgridHeaderCellDef` does the same thing that `matHeaderCellDef` and `cdkHeaderCellDef` do with one difference,
     * `pblNgridHeaderCellDef` is independent and does not require a column definition parent, instead it accept the ID of
     * the header cell.
     *
     * NOTE: Defining '*' as id will declare the header cell template as default, replacing the table's default header cell template.
     *
     * Make sure you set the proper id of the property you want to override.
     * When the `id` is set explicitly in the table column definition, this is not a problem but when if it's not set
     * the table generates a unique id based on a logic. If `name` is set the name is used, if no name is set
     * the `prop` is used (full with dot notation).
     */
    var PblNgridHeaderCellDefDirective = /** @class */ (function (_super) {
        __extends(PblNgridHeaderCellDefDirective, _super);
        function PblNgridHeaderCellDefDirective(tRef, registry) {
            return _super.call(this, tRef, registry) || this;
        }
        PblNgridHeaderCellDefDirective.prototype.ngOnInit = function () {
            // TODO: listen to property changes (name) and re-register cell
            this.registry.addMulti('headerCell', this);
        };
        PblNgridHeaderCellDefDirective.prototype.ngOnDestroy = function () {
            this.registry.removeMulti('headerCell', this);
        };
        return PblNgridHeaderCellDefDirective;
    }(PblNgridBaseCellDef));
    /** @nocollapse */ PblNgridHeaderCellDefDirective.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridHeaderCellDefDirective, deps: [{ token: i0__namespace.TemplateRef }, { token: PblNgridRegistryService }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ PblNgridHeaderCellDefDirective.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridHeaderCellDefDirective, selector: "[pblNgridHeaderCellDef], [pblNgridHeaderCellTypeDef]", inputs: { name: ["pblNgridHeaderCellDef", "name"], type: ["pblNgridHeaderCellTypeDef", "type"] }, usesInheritance: true, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridHeaderCellDefDirective, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[pblNgridHeaderCellDef], [pblNgridHeaderCellTypeDef]',
                        inputs: [
                            'name:pblNgridHeaderCellDef',
                            'type:pblNgridHeaderCellTypeDef',
                        ]
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.TemplateRef }, { type: PblNgridRegistryService }]; } });

    /**
     * Cell definition for the pbl-ngrid.
     * Captures the template of a column's data row cell as well as cell-specific properties.
     *
     * `pblNgridCellDef` does the same thing that `matCellDef` and `cdkCellDef` do with one difference, `pblNgridCellDef` is
     * independent and does not require a column definition parent, instead it accept the ID of the cell.
     *
     * NOTE: Defining '*' as id will declare the cell template as default, replacing the table's default cell template.
     *
     * Make sure you set the proper id of the property you want to override.
     * When the `id` is set explicitly in the table column definition, this is not a problem but when if it's not set
     * the table generates a unique id based on a logic. If `name` is set the name is used, if no name is set
     * the `prop` is used (full with dot notation).
     */
    var PblNgridCellDefDirective = /** @class */ (function (_super) {
        __extends(PblNgridCellDefDirective, _super);
        function PblNgridCellDefDirective(tRef, registry) {
            return _super.call(this, tRef, registry) || this;
        }
        PblNgridCellDefDirective.prototype.ngOnInit = function () {
            // TODO: listen to property changes (name) and re-register cell
            this.registry.addMulti('tableCell', this);
        };
        PblNgridCellDefDirective.prototype.ngOnDestroy = function () {
            this.registry.removeMulti('tableCell', this);
        };
        return PblNgridCellDefDirective;
    }(PblNgridBaseCellDef));
    /** @nocollapse */ PblNgridCellDefDirective.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridCellDefDirective, deps: [{ token: i0__namespace.TemplateRef }, { token: PblNgridRegistryService }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ PblNgridCellDefDirective.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridCellDefDirective, selector: "[pblNgridCellDef], [pblNgridCellTypeDef]", inputs: { name: ["pblNgridCellDef", "name"], type: ["pblNgridCellTypeDef", "type"] }, usesInheritance: true, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridCellDefDirective, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[pblNgridCellDef], [pblNgridCellTypeDef]',
                        inputs: [
                            'name:pblNgridCellDef',
                            'type:pblNgridCellTypeDef',
                        ]
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.TemplateRef }, { type: PblNgridRegistryService }]; } });

    var PblNgridEditorCellDefDirective = /** @class */ (function (_super) {
        __extends(PblNgridEditorCellDefDirective, _super);
        function PblNgridEditorCellDefDirective(tRef, registry) {
            return _super.call(this, tRef, registry) || this;
        }
        PblNgridEditorCellDefDirective.prototype.ngOnInit = function () {
            // TODO: listen to property changes (name) and re-register cell
            this.registry.addMulti('editorCell', this);
        };
        PblNgridEditorCellDefDirective.prototype.ngOnDestroy = function () {
            this.registry.removeMulti('editorCell', this);
        };
        return PblNgridEditorCellDefDirective;
    }(PblNgridBaseCellDef));
    /** @nocollapse */ PblNgridEditorCellDefDirective.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridEditorCellDefDirective, deps: [{ token: i0__namespace.TemplateRef }, { token: PblNgridRegistryService }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ PblNgridEditorCellDefDirective.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridEditorCellDefDirective, selector: "[pblNgridCellEditorDef], [pblNgridCellEditorTypeDef]", inputs: { name: ["pblNgridCellEditorDef", "name"], type: ["pblNgridCellEditorTypeDef", "type"] }, usesInheritance: true, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridEditorCellDefDirective, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[pblNgridCellEditorDef], [pblNgridCellEditorTypeDef]',
                        inputs: [
                            'name:pblNgridCellEditorDef',
                            'type:pblNgridCellEditorTypeDef',
                        ]
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.TemplateRef }, { type: PblNgridRegistryService }]; } });

    var PblNgridFooterCellDefDirective = /** @class */ (function (_super) {
        __extends(PblNgridFooterCellDefDirective, _super);
        function PblNgridFooterCellDefDirective(tRef, registry) {
            return _super.call(this, tRef, registry) || this;
        }
        PblNgridFooterCellDefDirective.prototype.ngOnInit = function () {
            // TODO: listen to property changes (name) and re-register cell
            this.registry.addMulti('footerCell', this);
        };
        PblNgridFooterCellDefDirective.prototype.ngOnDestroy = function () {
            this.registry.removeMulti('footerCell', this);
        };
        return PblNgridFooterCellDefDirective;
    }(PblNgridBaseCellDef));
    /** @nocollapse */ PblNgridFooterCellDefDirective.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridFooterCellDefDirective, deps: [{ token: i0__namespace.TemplateRef }, { token: PblNgridRegistryService }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ PblNgridFooterCellDefDirective.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridFooterCellDefDirective, selector: "[pblNgridFooterCellDef], [pblNgridFooterCellTypeDef]", inputs: { name: ["pblNgridFooterCellDef", "name"], type: ["pblNgridFooterCellTypeDef", "type"] }, usesInheritance: true, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridFooterCellDefDirective, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[pblNgridFooterCellDef], [pblNgridFooterCellTypeDef]',
                        inputs: [
                            'name:pblNgridFooterCellDef',
                            'type:pblNgridFooterCellTypeDef',
                        ]
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.TemplateRef }, { type: PblNgridRegistryService }]; } });

    var PblNgridCellEditAutoFocusDirective = /** @class */ (function () {
        function PblNgridCellEditAutoFocusDirective(elRef, ngZone) {
            this.elRef = elRef;
            this.ngZone = ngZone;
        }
        PblNgridCellEditAutoFocusDirective.prototype.ngAfterViewInit = function () {
            var _this = this;
            var doFocus = function () {
                var context = _this.context;
                if (context.editing && !context.rowContext.outOfView) {
                    _this.elRef.nativeElement.focus();
                }
            };
            this.ngZone.runOutsideAngular(function () {
                Promise.resolve().then(function () {
                    if (!_this._destroyed) {
                        var viewport = _this.context.grid.viewport;
                        if (viewport && viewport.isScrolling) {
                            viewport.scrolling.pipe(operators.take(1)).subscribe(doFocus);
                        }
                        else {
                            doFocus();
                        }
                    }
                });
            });
        };
        PblNgridCellEditAutoFocusDirective.prototype.ngOnDestroy = function () {
            this._destroyed = true;
        };
        return PblNgridCellEditAutoFocusDirective;
    }());
    /** @nocollapse */ PblNgridCellEditAutoFocusDirective.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridCellEditAutoFocusDirective, deps: [{ token: i0__namespace.ElementRef }, { token: i0__namespace.NgZone }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ PblNgridCellEditAutoFocusDirective.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridCellEditAutoFocusDirective, selector: "[pblCellEditAutoFocus]", inputs: { context: ["pblCellEditAutoFocus", "context"] }, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridCellEditAutoFocusDirective, decorators: [{
                type: i0.Directive,
                args: [{ selector: '[pblCellEditAutoFocus]' }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ElementRef }, { type: i0__namespace.NgZone }]; }, propDecorators: { context: [{
                    type: i0.Input,
                    args: ['pblCellEditAutoFocus']
                }] } });

    var PblNgridBaseRowViewRepeaterStrategy = /** @class */ (function () {
        function PblNgridBaseRowViewRepeaterStrategy(extApi) {
            var _this = this;
            this.extApi = extApi;
            this.workaroundEnabled = false;
            this._cachedRenderDefMap = new Map();
            extApi
                .onConstructed(function () {
                var cdkTable = extApi.cdkTable;
                _this.renderer = cdkTable;
                _this.workaroundEnabled = !cdkTable['_cachedRenderDefMap'] && typeof _this.renderer._renderCellTemplateForItem === 'function';
            });
        }
        PblNgridBaseRowViewRepeaterStrategy.prototype.applyChanges = function (changes, vcRef, itemContextFactory, itemValueResolver, itemViewChanged) {
            var _this = this;
            var createEmbeddedView = function (record, adjustedPreviousIndex, currentIndex) {
                var itemArgs = itemContextFactory(record, adjustedPreviousIndex, currentIndex);
                itemArgs.context = _this.extApi.contextApi._createRowContext(itemArgs.context.$implicit, itemArgs.index);
                return rowContextBridge.bridgeContext(itemArgs, function () { return vcRef.createEmbeddedView(itemArgs.templateRef, itemArgs.context, itemArgs.index); });
            };
            var baseState = { vcRef: vcRef, createEmbeddedView: createEmbeddedView, itemValueResolver: itemValueResolver };
            changes.forEachOperation(function (record, adjustedPreviousIndex, currentIndex) {
                var state = Object.create(baseState);
                state.record = record;
                if (record.previousIndex == null) {
                    _this.addItem(adjustedPreviousIndex, currentIndex, state);
                    if (state.op === 1 /* INSERTED */) {
                    }
                }
                else if (currentIndex == null) {
                    _this.removeItem(adjustedPreviousIndex, state);
                }
                else {
                    _this.moveItem(adjustedPreviousIndex, currentIndex, state);
                }
                if (_this.workaroundEnabled) {
                    _this.patch20765afterOp(state);
                }
                _this.afterOperation(state);
            });
            if (this.workaroundEnabled) {
                this.patch20765(changes, baseState);
            }
        };
        PblNgridBaseRowViewRepeaterStrategy.prototype.detach = function () { };
        PblNgridBaseRowViewRepeaterStrategy.prototype.addItem = function (adjustedPreviousIndex, currentIndex, state) { };
        PblNgridBaseRowViewRepeaterStrategy.prototype.removeItem = function (removeAt, state) { };
        PblNgridBaseRowViewRepeaterStrategy.prototype.moveItem = function (moveFrom, moveTo, state) { };
        PblNgridBaseRowViewRepeaterStrategy.prototype.afterOperation = function (state) { };
        // See https://github.com/angular/components/pull/20765
        PblNgridBaseRowViewRepeaterStrategy.prototype.patch20765 = function (changes, baseState) {
            var _this = this;
            changes.forEachIdentityChange = function (fn) {
                changes.constructor.prototype.forEachIdentityChange.call(changes, function (record) {
                    fn(record);
                    if (_this._cachedRenderDefMap.get(record.currentIndex) !== record.item.rowDef) {
                        baseState.vcRef.remove(record.currentIndex);
                        baseState.createEmbeddedView(record, null, record.currentIndex);
                        _this._cachedRenderDefMap.set(record.currentIndex, record.item.rowDef);
                    }
                });
            };
        };
        PblNgridBaseRowViewRepeaterStrategy.prototype.patch20765afterOp = function (state) {
            switch (state.op) {
                case 0 /* REPLACED */:
                case 1 /* INSERTED */:
                case 2 /* MOVED */:
                    this._cachedRenderDefMap.set(state.record.currentIndex, state.record.item.rowDef);
                    break;
                case 3 /* REMOVED */:
                    this._cachedRenderDefMap.delete(state.record.previousIndex);
                    break;
            }
        };
        return PblNgridBaseRowViewRepeaterStrategy;
    }());
    /** @nocollapse */ PblNgridBaseRowViewRepeaterStrategy.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridBaseRowViewRepeaterStrategy, deps: [{ token: EXT_API_TOKEN }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    /** @nocollapse */ PblNgridBaseRowViewRepeaterStrategy.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridBaseRowViewRepeaterStrategy });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridBaseRowViewRepeaterStrategy, decorators: [{
                type: i0.Injectable
            }], ctorParameters: function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [EXT_API_TOKEN]
                        }] }];
        } });

    /**
     * This is a noop strategy that simply prevents the CDK from rendering cells for each row and instead the logic for it is now
     * handled within the row itself.
     *
     * This is very powerful and eliminate the need to use column declaration in strings.
     * Since we have a column store we can take it directly from there.
     *
     * Additionally, a temp fix for a bug is applied (see `workaroundEnabled`
     * Remove when and if PR https://github.com/angular/components/pull/20765 is accepted and the old version not supporting the solution is not supported by ngrid.
     */
    var PblNgridCachedRowViewRepeaterStrategy = /** @class */ (function (_super) {
        __extends(PblNgridCachedRowViewRepeaterStrategy, _super);
        function PblNgridCachedRowViewRepeaterStrategy() {
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            /**
             * The size of the cache used to store unused views.
             * Setting the cache size to `0` will disable caching. Defaults to 20 views.
             */
            _this.viewCacheSize = 20;
            /**
             * View cache that stores embedded view instances that have been previously stamped out,
             * but don't are not currently rendered. The view repeater will reuse these views rather than
             * creating brand new ones.
             */
            _this._viewCache = [];
            return _this;
        }
        PblNgridCachedRowViewRepeaterStrategy.prototype.detach = function () {
            var e_1, _a;
            try {
                for (var _b = __values(this._viewCache), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var view = _c.value;
                    view.destroy();
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        PblNgridCachedRowViewRepeaterStrategy.prototype.addItem = function (adjustedPreviousIndex, currentIndex, state) {
            /* Inserts a view for a new item, either from the cache or by creating a new one.
               Returns `undefined` if the item was inserted into a cached view. */
            state.view = this._insertViewFromCache(currentIndex, state.vcRef);
            if (state.view) {
                state.view.context.$implicit = state.itemValueResolver(state.record);
                state.op = 0 /* REPLACED */;
            }
            else {
                state.view = state.createEmbeddedView(state.record, adjustedPreviousIndex, currentIndex);
                state.op = 1 /* INSERTED */;
            }
        };
        PblNgridCachedRowViewRepeaterStrategy.prototype.removeItem = function (removeAt, state) {
            /** Detaches the view at the given index and inserts into the view cache. */
            var detachedView = this._detachView(removeAt, state.vcRef);
            this._maybeCacheView(detachedView, state.vcRef);
            state.op = 3 /* REMOVED */;
        };
        PblNgridCachedRowViewRepeaterStrategy.prototype.moveItem = function (moveFrom, moveTo, state) {
            state.view = state.vcRef.get(moveFrom);
            state.vcRef.move(state.view, moveTo);
            state.view.context.$implicit = state.itemValueResolver(state.record);
            state.op = 2 /* MOVED */;
        };
        /**
         * Cache the given detached view. If the cache is full, the view will be
         * destroyed.
         */
        PblNgridCachedRowViewRepeaterStrategy.prototype._maybeCacheView = function (view, viewContainerRef) {
            if (this._viewCache.length < this.viewCacheSize) {
                this._viewCache.push(view);
                this.extApi.rowsApi.findRowByElement(view.rootNodes[0])._detach();
                // Notify this row is not part of the view, its cached (however, the component and any child component is not destroyed)
            }
            else {
                var index = viewContainerRef.indexOf(view);
                // The host component could remove views from the container outside of
                // the view repeater. It's unlikely this will occur, but just in case,
                // destroy the view on its own, otherwise destroy it through the
                // container to ensure that all the references are removed.
                if (index === -1) {
                    view.destroy();
                }
                else {
                    viewContainerRef.remove(index);
                }
            }
        };
        /** Inserts a recycled view from the cache at the given index. */
        PblNgridCachedRowViewRepeaterStrategy.prototype._insertViewFromCache = function (index, viewContainerRef) {
            var cachedView = this._viewCache.pop();
            if (cachedView) {
                // Notify that the items is not longer cached, now live and playing the game
                this.extApi.rowsApi.findRowByElement(cachedView.rootNodes[0])._attach();
                viewContainerRef.insert(cachedView, index);
            }
            return cachedView || null;
        };
        /** Detaches the embedded view at the given index. */
        PblNgridCachedRowViewRepeaterStrategy.prototype._detachView = function (index, viewContainerRef) {
            return viewContainerRef.detach(index);
        };
        return PblNgridCachedRowViewRepeaterStrategy;
    }(PblNgridBaseRowViewRepeaterStrategy));
    /** @nocollapse */ PblNgridCachedRowViewRepeaterStrategy.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridCachedRowViewRepeaterStrategy, deps: null, target: i0__namespace.ɵɵFactoryTarget.Injectable });
    /** @nocollapse */ PblNgridCachedRowViewRepeaterStrategy.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridCachedRowViewRepeaterStrategy });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridCachedRowViewRepeaterStrategy, decorators: [{
                type: i0.Injectable
            }] });

    /**
     * Wrapper for the CdkTable that extends it's functionality to support various table features.
     * This wrapper also applies Material Design table styles (i.e. `MatTable` styles).
     *
     * Most of the extensions are done using mixins, this is mostly for clarity and separation of the features added.
     * This approach will allow easy removal when a feature is no longer required/implemented natively.
     */
    var PblCdkTableComponent = /** @class */ (function (_super) {
        __extends(PblCdkTableComponent, _super);
        function PblCdkTableComponent(_differs, _changeDetectorRef, _elementRef, role, _dir, injector, grid, extApi, _document, platform, _viewRepeater, _coalescedStyleScheduler, _viewportRuler, _stickyPositioningListener) {
            var _this = _super.call(this, _differs, _changeDetectorRef, _elementRef, role, _dir, _document, platform, _viewRepeater, _coalescedStyleScheduler, _viewportRuler, _stickyPositioningListener) || this;
            _this.injector = injector;
            _this.grid = grid;
            _this.extApi = extApi;
            _this.platform = platform;
            _this._minWidth = null;
            _this.pblStickyColumnStylesNeedReset = false;
            //#endregion CSS-CLASS-CONTROL
            //#region CLEAR-ROW-DEFS
            // TODO: remove if https://github.com/angular/material2/pull/13000 is pushed
            _this._cachedRowDefs = { header: new Set(), footer: new Set() }; //tslint:disable-line
            _this.cdRef = _changeDetectorRef;
            extApi.setCdkTable(_this);
            _this.trackBy = _this.grid.trackBy;
            return _this;
        }
        Object.defineProperty(PblCdkTableComponent.prototype, "_element", {
            get: function () { return this._elementRef.nativeElement; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblCdkTableComponent.prototype, "beforeRenderRows", {
            get: function () {
                if (!this.beforeRenderRows$) {
                    this.beforeRenderRows$ = new rxjs.Subject();
                }
                return this.beforeRenderRows$.asObservable();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblCdkTableComponent.prototype, "onRenderRows", {
            get: function () {
                if (!this.onRenderRows$) {
                    this.onRenderRows$ = new rxjs.Subject();
                }
                return this.onRenderRows$.asObservable();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblCdkTableComponent.prototype, "minWidth", {
            get: function () { return this._minWidth; },
            set: function (value) {
                this._minWidth = value || null;
                this._element.style.minWidth = value ? value + 'px' : null;
            },
            enumerable: false,
            configurable: true
        });
        PblCdkTableComponent.prototype.ngOnInit = function () {
            var _this = this;
            var _a, _b, _c;
            // We implement our own sticky styler because we don't have access to the one at CdkTable (private)
            // We need it because our CdkRowDef classes does not expose columns, it's always an empty array
            // This is to prevent CdkTable from rendering cells, we do that.
            // This is why the styler will not work on columns, cause internall in CdkTable it sees nothing.
            this.pblStickyStyler = new i4.StickyStyler(this._isNativeHtmlTable, this.stickyCssClass, ((_a = this._dir) === null || _a === void 0 ? void 0 : _a.value) || 'ltr', this._coalescedStyleScheduler, this.platform.isBrowser, this.needsPositionStickyOnElement, this._stickyPositioningListener);
            // This will also run from CdkTable and `updateStickyColumnStyles()` is invoked multiple times
            // but we don't care, we have a window
            ((_c = (_b = this._dir) === null || _b === void 0 ? void 0 : _b.change) !== null && _c !== void 0 ? _c : rxjs.of())
                .pipe(i1.unrx(this))
                .subscribe(function (value) {
                _this.pblStickyStyler.direction = value;
                _this.pblStickyColumnStylesNeedReset = true;
                _this.updateStickyColumnStyles();
            });
            // It's imperative we register to dir changes before super.ngOnInit because it register there as well
            // and it will come first and make sticky state pending, cancelling our pblStickyStyler.
            _super.prototype.ngOnInit.call(this);
        };
        PblCdkTableComponent.prototype.updateStickyColumnStyles = function () {
            var _this = this;
            if (this._isStickyPending) {
                return;
            }
            this._isStickyPending = true;
            Promise.resolve()
                .then(function () {
                _this._isStickyPending = false;
                _this._updateStickyColumnStyles();
            });
        };
        PblCdkTableComponent.prototype.ngOnDestroy = function () {
            _super.prototype.ngOnDestroy.call(this);
            i1.unrx.kill(this);
            if (this.onRenderRows$) {
                this.onRenderRows$.complete();
            }
        };
        //#region CSS-CLASS-CONTROL
        PblCdkTableComponent.prototype.addClass = function (cssClassName) {
            this._element.classList.add(cssClassName);
        };
        PblCdkTableComponent.prototype.removeClass = function (cssClassName) {
            this._element.classList.remove(cssClassName);
        };
        // TODO: remove if https://github.com/angular/material2/pull/13000 is pushed
        PblCdkTableComponent.prototype.addHeaderRowDef = function (headerRowDef) {
            _super.prototype.addHeaderRowDef.call(this, headerRowDef);
            this._cachedRowDefs.header.add(headerRowDef);
        };
        // TODO: remove if https://github.com/angular/material2/pull/13000 is pushed
        PblCdkTableComponent.prototype.clearHeaderRowDefs = function () {
            var e_1, _d;
            var header = this._cachedRowDefs.header;
            try {
                for (var _e = __values(Array.from(header.values())), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var rowDef = _f.value;
                    this.removeHeaderRowDef(rowDef);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_d = _e.return)) _d.call(_e);
                }
                finally { if (e_1) throw e_1.error; }
            }
            header.clear();
        };
        // TODO: remove if https://github.com/angular/material2/pull/13000 is pushed
        PblCdkTableComponent.prototype.addFooterRowDef = function (footerRowDef) {
            _super.prototype.addFooterRowDef.call(this, footerRowDef);
            this._cachedRowDefs.footer.add(footerRowDef);
        };
        // TODO: remove if https://github.com/angular/material2/pull/13000 is pushed
        PblCdkTableComponent.prototype.clearFooterRowDefs = function () {
            var e_2, _d;
            var footer = this._cachedRowDefs.footer;
            try {
                for (var _e = __values(Array.from(footer.values())), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var rowDef = _f.value;
                    this.removeFooterRowDef(rowDef);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_d = _e.return)) _d.call(_e);
                }
                finally { if (e_2) throw e_2.error; }
            }
            footer.clear();
        };
        //#endregion CLEAR-ROW-DEFS
        /**
         * An alias for `_cacheRowDefs()`
         */
        PblCdkTableComponent.prototype.updateRowDefCache = function () {
            this._cacheRowDefs();
        };
        PblCdkTableComponent.prototype.renderRows = function () {
            if (this.beforeRenderRows$) {
                this.beforeRenderRows$.next();
            }
            _super.prototype.renderRows.call(this);
            if (this.onRenderRows$) {
                this.onRenderRows$.next(this._rowOutlet);
            }
        };
        PblCdkTableComponent.prototype.pblForceRenderDataRows = function () {
            try {
                this._forceRenderDataRows();
            }
            catch (ex) {
                this.multiTemplateDataRows = this.multiTemplateDataRows;
            }
        };
        PblCdkTableComponent.prototype._updateStickyColumnStyles = function () {
            // We let the parent do the work on rows, it will see 0 columns so then we act.
            _super.prototype.updateStickyColumnStyles.call(this);
            var stickyStartStates = this.extApi.columnApi.visibleColumns.map(function (c) { var _a, _b; return (_b = (_a = c.columnDef) === null || _a === void 0 ? void 0 : _a.sticky) !== null && _b !== void 0 ? _b : false; });
            var stickyEndStates = this.extApi.columnApi.visibleColumns.map(function (c) { var _a, _b; return (_b = (_a = c.columnDef) === null || _a === void 0 ? void 0 : _a.stickyEnd) !== null && _b !== void 0 ? _b : false; });
            var headerRow = this.extApi.rowsApi.findColumnRow('header');
            var footerRow = this.extApi.rowsApi.findColumnRow('footer');
            var rows = this.extApi.rowsApi.dataRows().map(function (r) { return r.element; });
            if (headerRow) {
                rows.unshift(headerRow.element);
            }
            if (footerRow) {
                rows.push(footerRow.element);
            }
            // internal reset, coming from Dir change
            // It will probably get added to CDK ask well, remove when addedd
            if (this.pblStickyColumnStylesNeedReset) {
                this.pblStickyStyler.clearStickyPositioning(rows, ['left', 'right']);
                this.pblStickyColumnStylesNeedReset = false;
            }
            this.pblStickyStyler.updateStickyColumns(rows, stickyStartStates, stickyEndStates, true);
            // Reset the dirty state of the sticky input change since it has been used.
            this.extApi.columnApi.columns.forEach(function (c) { var _a; return (_a = c.columnDef) === null || _a === void 0 ? void 0 : _a.resetStickyChanged(); });
        };
        return PblCdkTableComponent;
    }(i4.CdkTable));
    /** @nocollapse */ PblCdkTableComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblCdkTableComponent, deps: [{ token: i0__namespace.IterableDiffers }, { token: i0__namespace.ChangeDetectorRef }, { token: i0__namespace.ElementRef }, { token: 'role', attribute: true }, { token: i1__namespace$1.Directionality, optional: true }, { token: i0__namespace.Injector }, { token: PBL_NGRID_COMPONENT }, { token: EXT_API_TOKEN }, { token: i1$1.DOCUMENT }, { token: i2__namespace.Platform }, { token: collections._VIEW_REPEATER_STRATEGY }, { token: i4._COALESCED_STYLE_SCHEDULER }, { token: i3__namespace.ViewportRuler }, { token: i4.STICKY_POSITIONING_LISTENER, optional: true, skipSelf: true }], target: i0__namespace.ɵɵFactoryTarget.Component });
    /** @nocollapse */ PblCdkTableComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.0", type: PblCdkTableComponent, selector: "pbl-cdk-table", host: { classAttribute: "pbl-cdk-table" }, providers: [
            { provide: i4.CDK_TABLE, useExisting: PblCdkTableComponent },
            { provide: collections._VIEW_REPEATER_STRATEGY, useClass: PblNgridCachedRowViewRepeaterStrategy },
            { provide: i4._COALESCED_STYLE_SCHEDULER, useClass: i4._CoalescedStyleScheduler },
            // Prevent nested tables from seeing this table's StickyPositioningListener.
            { provide: i4.STICKY_POSITIONING_LISTENER, useValue: null },
        ], exportAs: ["pblCdkTable"], usesInheritance: true, ngImport: i0__namespace, template: "\n  <ng-content select=\"caption\"></ng-content>\n  <ng-content select=\"colgroup, col\"></ng-content>\n  <ng-container headerRowOutlet></ng-container>\n  <ng-container rowOutlet></ng-container>\n  <ng-container noDataRowOutlet></ng-container>\n  <ng-container footerRowOutlet></ng-container>\n", isInline: true, directives: [{ type: i4__namespace.HeaderRowOutlet, selector: "[headerRowOutlet]" }, { type: i4__namespace.DataRowOutlet, selector: "[rowOutlet]" }, { type: i4__namespace.NoDataRowOutlet, selector: "[noDataRowOutlet]" }, { type: i4__namespace.FooterRowOutlet, selector: "[footerRowOutlet]" }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblCdkTableComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'pbl-cdk-table',
                        exportAs: 'pblCdkTable',
                        template: i4.CDK_TABLE_TEMPLATE,
                        host: {
                            'class': 'pbl-cdk-table',
                        },
                        providers: [
                            { provide: i4.CDK_TABLE, useExisting: PblCdkTableComponent },
                            { provide: collections._VIEW_REPEATER_STRATEGY, useClass: PblNgridCachedRowViewRepeaterStrategy },
                            { provide: i4._COALESCED_STYLE_SCHEDULER, useClass: i4._CoalescedStyleScheduler },
                            // Prevent nested tables from seeing this table's StickyPositioningListener.
                            { provide: i4.STICKY_POSITIONING_LISTENER, useValue: null },
                        ],
                        encapsulation: i0.ViewEncapsulation.None,
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    }]
            }], ctorParameters: function () {
            return [{ type: i0__namespace.IterableDiffers }, { type: i0__namespace.ChangeDetectorRef }, { type: i0__namespace.ElementRef }, { type: undefined, decorators: [{
                            type: i0.Attribute,
                            args: ['role']
                        }] }, { type: i1__namespace$1.Directionality, decorators: [{
                            type: i0.Optional
                        }] }, { type: i0__namespace.Injector }, { type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [PBL_NGRID_COMPONENT]
                        }] }, { type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [EXT_API_TOKEN]
                        }] }, { type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [i1$1.DOCUMENT]
                        }] }, { type: i2__namespace.Platform }, { type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [collections._VIEW_REPEATER_STRATEGY]
                        }] }, { type: i4__namespace._CoalescedStyleScheduler, decorators: [{
                            type: i0.Inject,
                            args: [i4._COALESCED_STYLE_SCHEDULER]
                        }] }, { type: i3__namespace.ViewportRuler }, { type: undefined, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.SkipSelf
                        }, {
                            type: i0.Inject,
                            args: [i4.STICKY_POSITIONING_LISTENER]
                        }] }];
        } });

    var PblNgridColumnWidthCalc = /** @class */ (function () {
        function PblNgridColumnWidthCalc(extApi) {
            var _this = this;
            this.extApi = extApi;
            this.onWidthCalc = new rxjs.Subject();
            this.columnStore = extApi.columnStore;
            this.dynamicColumnWidth = new DynamicColumnWidthLogic(DYNAMIC_PADDING_BOX_MODEL_SPACE_STRATEGY, extApi.getDirection());
            extApi.directionChange()
                .pipe(operators.takeUntil(extApi.events.pipe(i1.ON_DESTROY)))
                .subscribe(function (dir) { return _this.dynamicColumnWidth.dir = dir; });
            extApi.events.pipe(i1.ON_DESTROY).subscribe(function () { return _this.onWidthCalc.complete(); });
            extApi.onInit(function () { return _this.listenToResize(); });
        }
        /**
         * Updates the column sizes for all columns in the grid based on the column definition metadata for each column.
         * The final width represent a static width, it is the value as set in the definition (except column without width, where the calculated global width is set).
         */
        PblNgridColumnWidthCalc.prototype.resetColumnsWidth = function () {
            resetColumnWidths(this.columnStore.getStaticWidth(), this.columnStore.visibleColumns, this.columnStore.metaColumns);
        };
        PblNgridColumnWidthCalc.prototype.calcColumnWidth = function (columns) {
            var _a;
            if (!columns) {
                columns = this.columnStore.visibleColumns;
            }
            // protect from per-mature resize.
            // Will happen on additional header/header-group rows AND ALSO when vScrollNone is set
            // This will cause size not to populate because it takes time to render the rows, since it's not virtual and happens immediately.
            // TODO: find a better protection.
            if (!((_a = columns[0]) === null || _a === void 0 ? void 0 : _a.sizeInfo)) {
                return;
            }
            // stores and calculates width for columns added to it. Aggregate's the total width of all added columns.
            var rowWidth = this.dynamicColumnWidth;
            rowWidth.reset();
            this.syncColumnGroupsSize();
            // if this is a grid without groups
            if (rowWidth.minimumRowWidth === 0) {
                // - We filter at the end because on add column we will have a column that still didn't get the resize event hence not having the size info
                // We will ignore it because once it will get it a new resize event is triggered
                rowWidth.addGroup(columns.map(function (c) { return c.sizeInfo; }).filter(function (c) { return !!c; }));
            }
            // if the max lock state has changed we need to update re-calculate the static width's again.
            if (rowWidth.maxWidthLockChanged) {
                this.resetColumnsWidth();
                this.calcColumnWidth(columns);
                return;
            }
            this.onWidthCalc.next(rowWidth);
        };
        /**
         * Update the size of all group columns in the grid based on the size of their visible children (not hidden).
         * @param dynamicWidthLogic - Optional logic container, if not set a new one is created.
         */
        PblNgridColumnWidthCalc.prototype.syncColumnGroupsSize = function () {
            var e_1, _b;
            var _loop_1 = function (g) {
                // - We go over all columns because g.columns does not represent the current owned columns of the group it is static, representing the initial state.
                // Only columns hold their group owners.
                // - We filter at the end because on add column we will have a column that still didn't get the resize event hence not having the size info
                // We will ignore it because once it will get it a new resize event is triggered
                // TODO: find way to improve iteration
                var colSizeInfos = this_1.columnStore.visibleColumns.filter(function (c) { return !c.hidden && c.isInGroup(g); }).map(function (c) { return c.sizeInfo; }).filter(function (c) { return !!c; });
                if (colSizeInfos.length > 0) {
                    var groupWidth = this_1.dynamicColumnWidth.addGroup(colSizeInfos);
                    g.minWidth = groupWidth;
                    g.updateWidth(groupWidth + "px");
                }
                else {
                    g.minWidth = undefined;
                    g.updateWidth("0px");
                }
            };
            var this_1 = this;
            try {
                // From all meta columns (header/footer/headerGroup) we filter only `headerGroup` columns.
                // For each we calculate it's width from all of the columns that the headerGroup "groups".
                // We use the same strategy and the same RowWidthDynamicAggregator instance which will prevent duplicate calculations.
                // Note that we might have multiple header groups, i.e. same columns on multiple groups with different row index.
                for (var _c = __values(this.columnStore.getAllHeaderGroup()), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var g = _d.value;
                    _loop_1(g);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        PblNgridColumnWidthCalc.prototype.listenToResize = function () {
            var _this = this;
            var element = this.extApi.element;
            var resizeObserver;
            var ro$ = rxjs.fromEventPattern(function (handler) {
                if (!resizeObserver) {
                    resizeObserver = new ResizeObserver(handler);
                    resizeObserver.observe(element);
                }
            }, function (handler) {
                if (resizeObserver) {
                    resizeObserver.unobserve(element);
                    resizeObserver.disconnect();
                    resizeObserver = undefined;
                }
            });
            // Skip the first emission
            // Debounce all resizes until the next complete animation frame without a resize
            // finally maps to the entries collection
            // SKIP:  We should skip the first emission (`skip(1)`) before we debounce, since its called upon calling "observe" on the resizeObserver.
            //        The problem is that some grid might require this because they do change size.
            //        An example is a grid in a mat-tab that is hidden, the grid will hit the resize one when we focus the tab
            //        which will require a resize handling because it's initial size is 0
            //        To workaround this, we only skip elements not yet added to the DOM, which means they will not trigger a resize event.
            var skipValue = document.body.contains(element) ? 1 : 0;
            ro$
                .pipe(operators.skip(skipValue), operators.debounceTime(0, rxjs.animationFrameScheduler), operators.takeUntil(this.extApi.events.pipe(i1.ON_DESTROY)))
                .subscribe(function (args) {
                if (skipValue === 0) {
                    skipValue = 1;
                    _this.extApi.columnStore.visibleColumns.forEach(function (c) { return c.sizeInfo.updateSize(); });
                }
                _this.onResize(args[0]);
            });
        };
        PblNgridColumnWidthCalc.prototype.onResize = function (entries) {
            var _a;
            (_a = this.extApi.viewport) === null || _a === void 0 ? void 0 : _a.checkViewportSize();
            this.calcColumnWidth();
        };
        return PblNgridColumnWidthCalc;
    }());

    function noDataViewLogicap(extApi) {
        var noDateEmbeddedVRef;
        var logicap = function (force) {
            if (noDateEmbeddedVRef) {
                extApi.grid.removeView(noDateEmbeddedVRef, 'beforeContent');
                noDateEmbeddedVRef = undefined;
                logicap.viewActive = false;
            }
            if (force === false) {
                return;
            }
            var noData = extApi.grid.ds && extApi.grid.ds.renderLength === 0;
            if (noData) {
                extApi.grid.addClass('pbl-ngrid-empty');
            }
            else {
                extApi.grid.removeClass('pbl-ngrid-empty');
            }
            if (noData || force === true) {
                var noDataTemplate = extApi.registry.getSingle('noData');
                if (noDataTemplate) {
                    noDateEmbeddedVRef = extApi.grid.createView('beforeContent', noDataTemplate.tRef, { $implicit: extApi.grid }, 0);
                    logicap.viewActive = true;
                }
            }
        };
        return logicap;
    }

    /**
     * Listens to registry changes and update the grid
     * Must run when the grid in at content init
     */
    function bindRegistryLogicap(extApi) {
        return function () {
            // no need to unsubscribe, the reg service is per grid instance and it will destroy when this grid destroy.
            // Also, at this point initial changes from templates provided in the content are already inside so they will not trigger
            // the order here is very important, because component top of this grid will fire life cycle hooks AFTER this component
            // so if we have a top level component registering a template on top it will not show unless we listen.
            extApi.registry.changes
                .subscribe(function (changes) {
                var e_1, _a;
                var gridCell = false;
                var headerFooterCell = false;
                try {
                    for (var changes_1 = __values(changes), changes_1_1 = changes_1.next(); !changes_1_1.done; changes_1_1 = changes_1.next()) {
                        var c = changes_1_1.value;
                        switch (c.type) {
                            case 'tableCell':
                                gridCell = true;
                                break;
                            case 'headerCell':
                            case 'footerCell':
                                headerFooterCell = true;
                                break;
                            case 'noData':
                                extApi.logicaps.noData();
                                break;
                            case 'paginator':
                                extApi.logicaps.pagination();
                                break;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (changes_1_1 && !changes_1_1.done && (_a = changes_1.return)) _a.call(changes_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                if (gridCell) {
                    extApi.columnStore.attachCustomCellTemplates();
                }
                if (headerFooterCell) {
                    extApi.columnStore.attachCustomHeaderCellTemplates();
                }
            });
        };
    }

    function paginationViewLogicap(extApi) {
        var paginationKillKey = 'pblPaginationKillKey';
        var paginatorEmbeddedVRef;
        return function () {
            var ds = extApi.grid.ds;
            var usePagination = ds && extApi.grid.usePagination;
            if (usePagination) {
                ds.pagination = extApi.grid.usePagination || false;
                if (ds.paginator) {
                    ds.paginator.noCacheMode = extApi.grid.noCachePaginator;
                }
            }
            if (extApi.grid.isInit) {
                i1.unrx.kill(extApi.grid, paginationKillKey);
                if (paginatorEmbeddedVRef) {
                    extApi.grid.removeView(paginatorEmbeddedVRef, 'beforeContent');
                    paginatorEmbeddedVRef = undefined;
                }
                if (usePagination) {
                    var paginatorTemplate = extApi.registry.getSingle('paginator');
                    if (paginatorTemplate) {
                        paginatorEmbeddedVRef = extApi.grid.createView('beforeContent', paginatorTemplate.tRef, { $implicit: extApi.grid });
                    }
                }
            }
        };
    }

    function logicap(extApi) {
        return {
            bindRegistry: bindRegistryLogicap(extApi),
            noData: noDataViewLogicap(extApi),
            pagination: paginationViewLogicap(extApi),
        };
    }

    function createApis(grid, tokens) {
        return new InternalExtensionApi(grid, tokens);
    }
    var InternalExtensionApi = /** @class */ (function () {
        function InternalExtensionApi(grid, tokens) {
            var _this = this;
            this.grid = grid;
            this.propChanged = this._propChanged = new rxjs.Subject();
            this.config = tokens.config;
            this.registry = tokens.registry;
            this.element = tokens.elRef.nativeElement;
            if (tokens.dir) {
                this.dir = tokens.dir;
            }
            var _c = this.createPlugin(tokens), plugin = _c.plugin, init = _c.init;
            this._create = init;
            this.plugin = plugin;
            this.events = plugin.events;
            this.columnStore = new PblColumnStore(this, tokens.injector.get(i0.IterableDiffers));
            this.widthCalc = new PblNgridColumnWidthCalc(this);
            var cellFactory = tokens.injector.get(PblNgridCellFactoryResolver);
            this.rowsApi = new PblRowsApi(this, tokens.ngZone, cellFactory);
            this.columnApi = ColumnApi.create(this);
            this._contextApi = new ContextApi(this);
            this.logicaps = logicap(this);
            bindGridToDataSource(this);
            this.events.pipe(i1.ON_DESTROY).subscribe(function (e) { return _this._propChanged.complete(); });
            this.widthCalc
                .onWidthCalc
                .subscribe(function (rowWidth) {
                _this._cdkTable.minWidth = rowWidth.minimumRowWidth;
                tokens.ngZone.run(function () {
                    _this.rowsApi.syncRows('header');
                    _this.plugin.emitEvent({ source: 'grid', kind: 'onResizeRow' });
                });
            });
        }
        Object.defineProperty(InternalExtensionApi.prototype, "cdkTable", {
            get: function () { return this._cdkTable; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(InternalExtensionApi.prototype, "contextApi", {
            get: function () { return this._contextApi || (this._contextApi = new ContextApi(this)); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(InternalExtensionApi.prototype, "viewport", {
            get: function () { return this._viewPort; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(InternalExtensionApi.prototype, "pluginCtrl", {
            get: function () { return this.plugin.controller; },
            enumerable: false,
            configurable: true
        });
        InternalExtensionApi.prototype.getDirection = function () {
            var _a, _b;
            return (_b = (_a = this.dir) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : 'ltr';
        };
        InternalExtensionApi.prototype.directionChange = function () {
            var _a, _b;
            return (_b = (_a = this.dir) === null || _a === void 0 ? void 0 : _a.change.asObservable()) !== null && _b !== void 0 ? _b : rxjs.EMPTY;
        };
        InternalExtensionApi.prototype.onConstructed = function (fn) {
            if (!this._create) {
                rxjs.of(false);
            }
            else {
                this.events.pipe(i1.ON_CONSTRUCTED).subscribe(fn);
            }
        };
        InternalExtensionApi.prototype.onInit = function (fn) {
            this.plugin.controller.onInit().subscribe(fn);
        };
        InternalExtensionApi.prototype.setCdkTable = function (cdkTable) {
            this._cdkTable = cdkTable;
            var globalCreateEvent = this._create;
            delete this._create;
            this.plugin.emitEvent({ source: 'grid', kind: 'onConstructed' });
            globalCreateEvent();
        };
        InternalExtensionApi.prototype.setViewport = function (viewport) {
            this._viewPort = viewport;
        };
        InternalExtensionApi.prototype.notifyPropChanged = function (source, key, prev, curr) {
            if (prev !== curr) {
                this._propChanged.next({ source: source, key: key, prev: prev, curr: curr });
            }
        };
        InternalExtensionApi.prototype.createPlugin = function (tokens) {
            // Create an injector for the extensions/plugins
            // This injector allow plugins (that choose so) to provide a factory function for runtime use.
            // I.E: as if they we're created by angular via template...
            // This allows seamless plugin-to-plugin dependencies without requiring specific template syntax.
            // And also allows auto plugin binding (app wide) without the need for template syntax.
            var pluginInjector = i0.Injector.create({
                providers: [
                    { provide: i0.ViewContainerRef, useValue: tokens.vcRef },
                    { provide: i0.ElementRef, useValue: tokens.elRef },
                    { provide: i0.ChangeDetectorRef, useValue: tokens.cdRef },
                ],
                parent: tokens.injector,
            });
            return PblNgridPluginContext.create(pluginInjector, this);
        };
        return InternalExtensionApi;
    }());

    var PblNgridBaseVirtualScrollDirective = /** @class */ (function () {
        function PblNgridBaseVirtualScrollDirective(grid, type) {
            this.grid = grid;
            this.type = type;
            this._maxBufferPx = 200;
            this._minBufferPx = 100;
        }
        Object.defineProperty(PblNgridBaseVirtualScrollDirective.prototype, "minBufferPx", {
            /**
             * The minimum amount of buffer rendered beyond the viewport (in pixels).
             * If the amount of buffer dips below this number, more items will be rendered. Defaults to 100px.
             *
             * Default: 100
             */
            get: function () { return this._minBufferPx; },
            set: function (value) { this._minBufferPx = coercion.coerceNumberProperty(value); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblNgridBaseVirtualScrollDirective.prototype, "maxBufferPx", {
            /**
             * The number of pixels worth of buffer to render for when rendering new items. Defaults to 200px.
             *
             * Default: 200
             */
            get: function () { return this._maxBufferPx; },
            set: function (value) { this._maxBufferPx = coercion.coerceNumberProperty(value); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblNgridBaseVirtualScrollDirective.prototype, "wheelMode", {
            get: function () { return this._wheelMode; },
            set: function (value) {
                switch (value) {
                    case 'passive':
                    case 'blocking':
                        this._wheelMode = value;
                        break;
                    default:
                        var wheelMode = coercion.coerceNumberProperty(value);
                        if (wheelMode && wheelMode >= 1 && wheelMode <= 60) {
                            this._wheelMode = wheelMode;
                        }
                        break;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblNgridBaseVirtualScrollDirective.prototype, "scrolledIndexChange", {
            get: function () { return this._scrollStrategy.scrolledIndexChange; },
            set: function (value) { this._scrollStrategy.scrolledIndexChange = value; },
            enumerable: false,
            configurable: true
        });
        PblNgridBaseVirtualScrollDirective.prototype.attachExtApi = function (extApi) { this._scrollStrategy.attachExtApi(extApi); };
        PblNgridBaseVirtualScrollDirective.prototype.attach = function (viewport) { this._scrollStrategy.attach(viewport); };
        PblNgridBaseVirtualScrollDirective.prototype.detach = function () { this._scrollStrategy.detach(); };
        PblNgridBaseVirtualScrollDirective.prototype.onContentScrolled = function () { this._scrollStrategy.onContentScrolled(); };
        PblNgridBaseVirtualScrollDirective.prototype.onDataLengthChanged = function () { this._scrollStrategy.onDataLengthChanged(); };
        PblNgridBaseVirtualScrollDirective.prototype.onContentRendered = function () { this._scrollStrategy.onContentRendered(); };
        PblNgridBaseVirtualScrollDirective.prototype.onRenderedOffsetChanged = function () { this._scrollStrategy.onRenderedOffsetChanged(); };
        PblNgridBaseVirtualScrollDirective.prototype.scrollToIndex = function (index, behavior) { this._scrollStrategy.scrollToIndex(index, behavior); };
        return PblNgridBaseVirtualScrollDirective;
    }());

    function resolveScrollStrategy(config, scrollStrategy, fallback) {
        if (!scrollStrategy && config.has('virtualScroll')) {
            var virtualScrollConfig = config.get('virtualScroll');
            if (typeof virtualScrollConfig.defaultStrategy === 'function') {
                scrollStrategy = virtualScrollConfig.defaultStrategy();
            }
        }
        return scrollStrategy || fallback();
    }
    /**
     * Returns the split range from an aggregated range.
     * An aggregated range describes the range of header, data and footer rows currently in view.
     * This function will split the range into core section, each having it's own range.
     *
     * Note that an aggregated range can span over a single section, all sections or just 2 sections.
     * If a section is not part of the aggregated range it's range is invalid, i.e: ListRange.start >= ListRange.end.
     *
     * @param range The aggregated range
     * @param headerLen The total length of header rows in the grid
     * @param dataLen The total length of data rows in the grid
     * @returns A tuple containing the ranges [header, data, footer].
     */
    function splitRange(range, headerLen, dataLen) {
        return [
            { start: range.start, end: headerLen },
            { start: Math.max(0, range.start - headerLen), end: Math.max(0, range.end - headerLen) },
            { start: 0, end: Math.max(0, range.end - (dataLen + headerLen)) },
        ];
    }
    /**
     * Update sticky positioning values to the rows to match virtual scroll content offset.
     * This function should run after `CdkTable` updated the sticky rows.
     *
     * ## Why
     * `CdkTable` applies sticky positioning to rows by setting top/bottom value to `0px`.
     * Virtual scroll use's a container with an offset to simulate the scrolling.
     *
     * The 2 does not work together, the virtual scroll offset will throw the sticky row out of bound, thus the top/bottom value must be compensated
     * based on the offset.
     */
    function updateStickyRows(offset, rows, stickyState, type) {
        var coeff = type === 'top' ? -1 : 1;
        var agg = 0;
        if (coeff === 1) {
            rows = rows.slice().reverse();
        }
        for (var i in rows) {
            if (stickyState[i]) {
                var row = rows[i];
                row.style[type] = coeff * (offset + (coeff * agg)) + "px";
                agg += row.getBoundingClientRect().height; // TODO: cache this and update cache actively (size change)
                row.style.display = null;
            }
        }
    }
    /**
     * Measures the combined size (width for horizontal orientation, height for vertical) of all items
     * in the specified view within the specified range.
     * Throws an error if the range includes items that are not currently rendered.
     *
     * > This is function is identical to `CdkVirtualForOf.measureRangeSize` with minor adjustments
     */
    function measureRangeSize(viewContainer, range, renderedRange, stickyState) {
        if (stickyState === void 0) { stickyState = []; }
        if (range.start >= range.end) {
            return 0;
        }
        if (range.start < renderedRange.start || range.end > renderedRange.end) {
            if (typeof ngDevMode === 'undefined' || ngDevMode) {
                throw Error("Attempt to measure an item that isn't rendered.");
            }
            return;
        }
        // The index into the list of rendered views for the first item in the range.
        var renderedStartIndex = range.start - renderedRange.start;
        // The length of the range we're measuring.
        var rangeLen = range.end - range.start;
        // Loop over all the views, find the first and land node and compute the size by subtracting
        // the top of the first node from the bottom of the last one.
        var firstNode;
        var lastNode;
        // Find the first node by starting from the beginning and going forwards.
        for (var i = 0; i < rangeLen; i++) {
            var view = viewContainer.get(i + renderedStartIndex);
            if (view && view.rootNodes.length) {
                firstNode = lastNode = view.rootNodes[0];
                break;
            }
        }
        // Find the last node by starting from the end and going backwards.
        for (var i = rangeLen - 1; i > -1; i--) {
            var view = viewContainer.get(i + renderedStartIndex);
            if (view && view.rootNodes.length) {
                lastNode = view.rootNodes[view.rootNodes.length - 1];
                break;
            }
        }
        return firstNode && lastNode ? getOffset('end', lastNode) - getOffset('start', firstNode) : 0;
    }
    /** Helper to extract the offset of a DOM Node in a certain direction. */
    function getOffset(direction, node) {
        var el = node;
        if (!el.getBoundingClientRect) {
            return 0;
        }
        var rect = el.getBoundingClientRect();
        return direction === 'start' ? rect.top : rect.bottom;
    }
    function calculateBrowserPxLimit() {
        try {
            var div = document.createElement('div');
            div.style.position = 'absolute';
            div.style.top = '9999999999999999px';
            document.body.appendChild(div);
            var size = Math.abs(div.getBoundingClientRect().top) * 0.85;
            document.body.removeChild(div);
            // We return 85% of the limit, rounded down to the closes million.
            // E.G: if the limit is 33,554,428 then 85% is 28,521,263.8 which is rounded down to 28,000,000
            return size - (size % 1000000);
        }
        catch (err) {
            // TODO: Either return null, or return a value based on the browser implementation which we might get as a param.
            return 10000000;
        }
    }

    /**
     * A class that manages the life cycle of sticky meta rows (header & footer) while scrolling.
     * Sticky meta rows are moved to containers outside of the table so they do not depend on the `position: sticky` property.
     *
     * For `position: sticky` to work, a reference position is required (`top` for header, `bottom` for footer) which must reflect the current
     * offset measured by the virtual scroll viewport (this position compensate the offset of virtual scroll so the position is leveled, i.e. like top 0)
     *
     * When the user scroll's:
     * - The offset changes by the browser
     * - The virtual scroll will detect the new offset and update the wrapper with the new offset.
     *
     * There is a time gap between the operations above which causes rows to flicker in and out of view, this is why we move them to a fixed location.
     */
    var MetaRowStickyScroll = /** @class */ (function () {
        function MetaRowStickyScroll(viewport, viewPortEl, metaRows) {
            this.viewport = viewport;
            this.viewPortEl = viewPortEl;
            this.metaRows = metaRows;
            this.runningHeader = false;
            this.runningFooter = false;
            this.canMoveHeader = true;
            this.canMoveFooter = true;
            this.movedFooterRows = [];
            this.movedHeaderRows = [];
        }
        MetaRowStickyScroll.prototype.canMove = function () {
            return this.canMoveHeader || this.canMoveFooter;
        };
        MetaRowStickyScroll.prototype.isRunning = function () {
            return this.runningHeader || this.runningFooter;
        };
        MetaRowStickyScroll.prototype.move = function (offset, viewPortElRect) {
            this.moveHeader(offset, viewPortElRect);
            this.moveFooter(offset, viewPortElRect);
            return this.isRunning() && !this.canMoveHeader && !this.canMoveFooter;
        };
        MetaRowStickyScroll.prototype.restore = function (renderedContentOffset) {
            var _a = this.metaRows, header = _a.header, footer = _a.footer;
            if (this.restoreHeader()) {
                updateStickyRows(renderedContentOffset, header.rows, header.sticky, 'top');
            }
            if (this.restoreFooter()) {
                updateStickyRows(renderedContentOffset, footer.rows, footer.sticky, 'bottom');
            }
        };
        MetaRowStickyScroll.prototype.moveHeader = function (offset, viewPortElRect) {
            if (!this.runningHeader || this.canMoveHeader) {
                this.runningHeader = true;
                this.canMoveHeader = false;
                var stickyAndRendered = [];
                var headerRows = this.metaRows.header;
                var mostTopRect = void 0;
                for (var i = 0, len = headerRows.rows.length; i < len; i++) {
                    var rowEl = headerRows.rows[i];
                    if (headerRows.sticky[i]) {
                        var elRect = rowEl.getBoundingClientRect();
                        if (headerRows.rendered[i]) {
                            var calc = elRect.top - viewPortElRect.top - offset;
                            // if after the scroll the element is still in view, return
                            if (calc >= 0 || -calc < viewPortElRect.height) {
                                this.canMoveHeader = true;
                                return;
                            }
                        }
                        if (!mostTopRect) {
                            mostTopRect = elRect;
                        }
                        stickyAndRendered.push(i);
                    }
                }
                if (stickyAndRendered.length) {
                    this.viewport.stickyRowHeaderContainer.style.top = mostTopRect.top + 'px';
                    this.cloneAndMoveRow(this.viewport.stickyRowHeaderContainer, headerRows.rows, stickyAndRendered, this.movedHeaderRows);
                }
            }
        };
        MetaRowStickyScroll.prototype.moveFooter = function (offset, viewPortElRect) {
            if (!this.runningFooter || this.canMoveFooter) {
                this.runningFooter = true;
                this.canMoveFooter = false;
                var stickyAndRendered = [];
                var footerRows = this.metaRows.footer;
                var mostTopRect = void 0;
                for (var i = 0, len = footerRows.rows.length; i < len; i++) {
                    var rowEl = footerRows.rows[i];
                    if (footerRows.sticky[i]) {
                        var elRect = rowEl.getBoundingClientRect();
                        if (footerRows.rendered[i]) {
                            var calc = elRect.bottom - viewPortElRect.bottom + offset;
                            // if after the scroll the element is still in view, return
                            if (calc >= 0 && calc < viewPortElRect.height) {
                                this.canMoveFooter = true;
                                return;
                            }
                        }
                        mostTopRect = elRect;
                        stickyAndRendered.push(i);
                    }
                }
                if (stickyAndRendered.length) {
                    this.viewport.stickyRowFooterContainer.style.bottom = "calc(100% - " + mostTopRect.bottom + "px)";
                    this.cloneAndMoveRow(this.viewport.stickyRowFooterContainer, footerRows.rows, stickyAndRendered, this.movedFooterRows);
                }
            }
        };
        MetaRowStickyScroll.prototype.restoreHeader = function () {
            if (this.runningHeader) {
                var movedHeaderRows = this.movedHeaderRows;
                this.movedHeaderRows = [];
                this.restoreRows(movedHeaderRows, this.metaRows.header.rows);
                this.runningHeader = false;
                this.canMoveHeader = true;
                return true;
            }
            return false;
        };
        MetaRowStickyScroll.prototype.restoreFooter = function () {
            if (this.runningFooter) {
                var movedFooterRows = this.movedFooterRows;
                this.movedFooterRows = [];
                this.restoreRows(movedFooterRows, this.metaRows.footer.rows);
                this.runningFooter = false;
                this.canMoveFooter = true;
                return true;
            }
            return false;
        };
        MetaRowStickyScroll.prototype.cloneAndMoveRow = function (stickyRowContainer, rows, stickyAndRendered, restoreRef) {
            var e_1, _a;
            var innerRowContainer = stickyRowContainer.firstElementChild;
            stickyRowContainer.style.width = this.viewport.innerWidth + 'px';
            innerRowContainer.style.transform = "translateX(-" + this.viewPortEl.scrollLeft + "px)";
            try {
                for (var stickyAndRendered_1 = __values(stickyAndRendered), stickyAndRendered_1_1 = stickyAndRendered_1.next(); !stickyAndRendered_1_1.done; stickyAndRendered_1_1 = stickyAndRendered_1.next()) {
                    var i = stickyAndRendered_1_1.value;
                    var rowEl = rows[i];
                    var clone = rowEl.cloneNode();
                    clone.style.width = '0';
                    rowEl.style.top = rowEl.style.bottom = rowEl.style.position = '';
                    rowEl.parentElement.insertBefore(clone, rowEl);
                    innerRowContainer.appendChild(rowEl);
                    restoreRef.push([rowEl, clone, i]);
                    // Assign the clone to be the sticky row element, this will ensure that stick row updates
                    // will set the `top` on an actual element in the viewport, thus updating with each layout reflow.
                    // if not set, when we return the original row it's `top` value will be true but will not show because it will not trigger a reflow.
                    rows[i] = clone;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (stickyAndRendered_1_1 && !stickyAndRendered_1_1.done && (_a = stickyAndRendered_1.return)) _a.call(stickyAndRendered_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        MetaRowStickyScroll.prototype.restoreRows = function (restoreRef, rows) {
            var e_2, _a;
            try {
                for (var restoreRef_1 = __values(restoreRef), restoreRef_1_1 = restoreRef_1.next(); !restoreRef_1_1.done; restoreRef_1_1 = restoreRef_1.next()) {
                    var _b = __read(restoreRef_1_1.value, 3), rowEl = _b[0], clone = _b[1], index = _b[2];
                    rowEl.style.position = clone.style.position;
                    rowEl.style.zIndex = clone.style.zIndex;
                    rowEl.style.top = clone.style.top;
                    rowEl.style.bottom = clone.style.bottom;
                    clone.parentElement.insertBefore(rowEl, clone);
                    clone.parentElement.removeChild(clone);
                    rows[index] = rowEl;
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (restoreRef_1_1 && !restoreRef_1_1.done && (_a = restoreRef_1.return)) _a.call(restoreRef_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
        };
        return MetaRowStickyScroll;
    }());

    function sortByIndex(a, b) { return a.index - b.index; }
    ;
    var PblVirtualScrollForOf = /** @class */ (function () {
        function PblVirtualScrollForOf(extApi, ngZone) {
            var _this = this;
            this.ngZone = ngZone;
            this.destroyed = new rxjs.Subject();
            this.renderedContentOffset = 0;
            /** The length of meta rows [0] = header [1] = footer */
            this.metaRows = [0, 0];
            this.header = { rows: [], sticky: [], rendered: [] };
            this.footer = { rows: [], sticky: [], rendered: [] };
            this.grid = extApi.grid;
            this.cdkTable = extApi.cdkTable;
            this.viewport = extApi.viewport;
            this.viewChange = this.cdkTable.viewChange;
            extApi.events
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function (event) {
                if (event.kind === 'onDataSource') {
                    _this.detachView();
                    _this.attachView(event.curr);
                }
            });
            this.attachView(extApi.grid.ds);
            var metaRowService = extApi.rowsApi.metaRowService;
            metaRowService.sync
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function () {
                var headers = metaRowService.header.row.concat(metaRowService.header.sticky).sort(sortByIndex);
                var footers = metaRowService.footer.row.concat(metaRowService.footer.sticky).sort(sortByIndex);
                _this.header.rows = headers.map(function (h) { return h.el; });
                _this.header.sticky = headers.map(function (h) { return h.rowDef.type === 'sticky'; });
                _this.footer.rows = footers.map(function (h) { return h.el; });
                _this.footer.sticky = footers.map(function (h) { return h.rowDef.type === 'sticky'; });
                updateStickyRows(_this.renderedContentOffset, _this.header.rows, _this.header.sticky, 'top');
                updateStickyRows(_this.renderedContentOffset, _this.footer.rows, _this.footer.sticky, 'bottom');
            });
            this.viewport.offsetChange
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function (offset) {
                if (_this.renderedContentOffset !== offset) {
                    _this.renderedContentOffset = offset;
                    updateStickyRows(offset, _this.header.rows, _this.header.sticky, 'top');
                    updateStickyRows(offset, _this.footer.rows, _this.footer.sticky, 'bottom');
                }
            });
            this.wheelControl = this.initWheelControl();
        }
        Object.defineProperty(PblVirtualScrollForOf.prototype, "headerLength", {
            get: function () { return this.header.rows.length; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblVirtualScrollForOf.prototype, "rowLength", {
            get: function () { return this.vcRefs.data.length; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblVirtualScrollForOf.prototype, "footerLength", {
            get: function () { return this.footer.rows.length; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblVirtualScrollForOf.prototype, "vcRefs", {
            get: function () {
                var value = {
                    header: this.cdkTable._headerRowOutlet.viewContainer,
                    data: this.cdkTable._rowOutlet.viewContainer,
                    footer: this.cdkTable._footerRowOutlet.viewContainer,
                };
                Object.defineProperty(this, 'vcRefs', { value: value, configurable: true });
                return value;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Measures the combined size (width for horizontal orientation, height for vertical) of all items
         * in the specified range. Throws an error if the range includes items that are not currently
         * rendered.
         */
        PblVirtualScrollForOf.prototype.measureRangeSize = function (range, orientation) {
            if (range.start >= range.end) {
                return 0;
            }
            var renderedRanges = this._renderedRanges;
            var ranges = splitRange(range, this.metaRows[0], this.ds.length);
            var stickyStates = [this.header.sticky, [], this.footer.sticky];
            var vcRefs = [this.vcRefs.header, this.vcRefs.data, this.vcRefs.footer];
            var vcRefSizeReducer = function (total, vcRef, index) {
                return total + measureRangeSize(vcRef, ranges[index], renderedRanges[index], stickyStates[index]);
            };
            return vcRefs.reduce(vcRefSizeReducer, 0);
        };
        PblVirtualScrollForOf.prototype.destroy = function () {
            this.detachView();
            this.destroyed.next();
            this.destroyed.complete();
        };
        PblVirtualScrollForOf.prototype.initWheelControl = function () {
            var _this = this;
            var listening = false;
            var offset = 0;
            var viewPort = this.viewport.element;
            var metaRowStickyScroll = new MetaRowStickyScroll(this.viewport, viewPort, { header: this.header, footer: this.footer });
            var scrollPosition;
            var wheelListen = function () {
                if (!listening) {
                    viewPort.addEventListener('wheel', handler, true);
                    listening = true;
                }
            };
            var wheelUnListen = function () {
                if (listening) {
                    viewPort.removeEventListener('wheel', handler, true);
                    listening = false;
                }
            };
            var updateScrollPosition = function () { return scrollPosition = (_this.viewport.measureScrollOffset()) / (_this.viewport.scrollHeight - _this.viewport.getViewportSize()); };
            var scrollEnd$ = this.viewport.scrolling.pipe(operators.filter(function (s) { return !s; }));
            var handler = function (event) {
                if (event.deltaY) {
                    if ((scrollPosition === 1 && event.deltaY > 0) || (offset === 0 && event.deltaY < 0)) {
                        return;
                    }
                    var newOffset = offset + event.deltaY;
                    newOffset = Math.min(_this.viewport.scrollHeight, Math.max(0, newOffset));
                    if (newOffset !== offset) {
                        offset = newOffset;
                        if (metaRowStickyScroll.canMove() && metaRowStickyScroll.move(event.deltaY, viewPort.getBoundingClientRect())) {
                            var restore_1 = function () {
                                metaRowStickyScroll.restore(_this.renderedContentOffset);
                                updateScrollPosition();
                            };
                            switch (_this.viewport.wheelMode) {
                                case 'passive':
                                    wheelUnListen();
                                    _this.viewport.scrolling
                                        .pipe(operators.debounceTime(150), operators.filter(function (s) { return !s; }), operators.take(1)).subscribe(function () {
                                        restore_1();
                                        wheelListen();
                                    });
                                    break;
                                case 'blocking':
                                    scrollEnd$.pipe(operators.take(1)).subscribe(restore_1);
                                    break;
                                default:
                                    var threshold_1 = _this.viewport.wheelMode;
                                    var removedEvent_1 = false;
                                    _this.viewport.scrollFrameRate
                                        .pipe(operators.takeUntil(scrollEnd$.pipe(operators.take(1))))
                                        .subscribe({
                                        next: function (frameRate) {
                                            if (!removedEvent_1 && frameRate < threshold_1) {
                                                wheelUnListen();
                                                removedEvent_1 = true;
                                            }
                                        },
                                        complete: function () {
                                            var lastWheel$ = rxjs.fromEvent(viewPort, 'wheel').pipe(operators.debounceTime(50), operators.take(1));
                                            rxjs.race(lastWheel$, rxjs.timer(51))
                                                .subscribe(function () {
                                                restore_1();
                                                if (removedEvent_1) {
                                                    wheelListen();
                                                }
                                            });
                                            // we restore back after 100 ms, for some reason, if it's immediate, we hit a cycle of wheel/scroll/no-scroll and not wheel/scroll/WAIIIIIT/no-scrol
                                            // TODO: maybe we can measure time between no-scrolling and wheel to find this MS value
                                            //        OR, register a temp `wheel` listener that will detect wheel end and re-register the original handler.
                                        }
                                    });
                            }
                        }
                    }
                    _this.viewport.scrollToOffset(offset);
                    event.preventDefault();
                    event.stopPropagation();
                    return true;
                }
            };
            updateScrollPosition();
            // We don't auto enable, the virtual scroll viewport component will decide
            // wheelListen();
            this.viewport
                .scrolling
                .subscribe(function (isScrolling) {
                if (!isScrolling) {
                    offset = _this.viewport.measureScrollOffset();
                }
            });
            return { wheelListen: wheelListen, wheelUnListen: wheelUnListen, get listening() { return listening; } };
        };
        PblVirtualScrollForOf.prototype.attachView = function (ds) {
            var _this = this;
            if (ds) {
                this.ds = ds;
                this._renderedRanges = [{ start: 0, end: 0 }, this.cdkTable.viewChange.value, { start: 0, end: 0 }];
                this.viewport.renderedRangeStream
                    .pipe(operators.takeUntil(this.destroyed))
                    .subscribe(function (range) {
                    if (_this.headerLength + _this.footerLength === 0) { // if no row/sticky meta rows, move on...
                        _this._renderedRanges = [{ start: 0, end: 0 }, range, { start: 0, end: 0 }];
                        return _this.cdkTable.viewChange.next(range);
                    }
                    /*  WHAT IS GOING ON HERE? */
                    /*  Table rows are split into 3 sections: Header, Data, Footer.
                        In the virtual playground only DATA rows are dynamic. Header & Footer rows are fixed.
          
                        The `CdkTable` works the same, also have the same sections with a stream API for DATA rows only.
                        `CdkTable.viewChange.next(RANGE)` will emit to the datasource which will result in a new data section from the datasource.
          
                        `CdkTable` alone does not support virtual scrolling, to achieve it we use a virtual scroll viewport which wraps the entire `CdkTable`.
                        This means that ALL sections are wrapped (hence scrolled over) but only DATA rows are moving...
          
                        Each emission of `ListRange` in `renderedRangeStream` is based on size calculation of ALL sections (see `measureRangeSize` above)
                        and we need to extract the relevant range for DATA rows only and pass it on to the grid.
          
                        To make this work we need to extract Header/Footer rows based on the starting position of the range and handle them as well.
                        Because the grid will only handle the scrolling of DATA rows we need to update HEADER/FOOTER rows to show/hide based on the range.
          
                        Because Header/Footer rows are fixed we do this by hiding them with `display: none`, unless they are sticky / pinned.
                        One exception is the main header row, which we hide virtually because we need it to render and reflect the cell size.
          
                        We first extract the actual ranges for each section and update the `CdkTable` with the DATA row range.
                        We then wait for the rows to render, which is the time for us to also "render" Header/Footer rows...
                        We don't "render" them per-se, they are already rendered, we just show/hide them based on the range and state (sticky).
                        This is important, hiding will cause the total height of the scroll container to shrink to the size it should be.
                        We defer this operation to run AFTER the rows are rendered (not immediately) because an immediate change will trigger
                        a change in the scroll container size resulting in a scroll event that will bring us back here but this time with
                        a height that does not fit the range. Immediate change removes rows (Header/Footer) before the new range is applied.
                        Only after the rows are rendered we can show/hide the Header/Footer rows.
                    */
                    // Extracting actual ranges for each section.
                    _this._renderedRanges = splitRange(range, _this.metaRows[0], ds.length);
                    var _a = __read(_this._renderedRanges, 3), header = _a[0], data = _a[1], footer = _a[2];
                    _this.cdkTable.onRenderRows.pipe(operators.take(1)).subscribe(function () {
                        // We update the header DOM elements in reverse, skipping the last (first when reversed) DOM element.
                        // The skipped element is the grid's header row that must keep track of the layout for internal size calculation (e.g. group header rows).
                        // An hidden row is one that is out of range AND not sticky
                        if (_this.headerLength > 0) {
                            var htmlRows = _this.header.rows;
                            var renderedRows = _this.header.rendered;
                            var stickyRows = _this.header.sticky;
                            var rowIndex = 0;
                            for (var len = _this.header.sticky.length - 1; rowIndex < len; rowIndex++) {
                                // assign rendered state + if not rendered and not sticky, set display to "none"
                                htmlRows[rowIndex].style.display = !(renderedRows[rowIndex] = rowIndex >= header.start) && !stickyRows[rowIndex]
                                    ? 'none'
                                    : null;
                            }
                            // Here we update the main header row, when we need to hide it we apply a class that will hide it virtually, i.e. not showing but keeping internal layout.
                            if (!(renderedRows[rowIndex] = rowIndex >= header.start) && !stickyRows[rowIndex]) {
                                htmlRows[rowIndex].classList.add('pbl-ngrid-row-visually-hidden');
                            }
                            else if (_this.grid.showHeader && htmlRows[rowIndex]) {
                                htmlRows[rowIndex].classList.remove('pbl-ngrid-row-visually-hidden');
                            }
                        }
                        if (_this.footerLength > 0) {
                            var htmlRows = _this.footer.rows;
                            var renderedRows = _this.footer.rendered;
                            var stickyRows = _this.footer.sticky;
                            var rowIndex = 0;
                            for (var len = _this.footer.sticky.length; rowIndex < len; rowIndex++) {
                                // assign rendered state + if not rendered and not sticky, set display to "none"
                                htmlRows[rowIndex].style.display = !(renderedRows[rowIndex] = rowIndex < footer.end) && !stickyRows[rowIndex]
                                    ? 'none'
                                    : null;
                            }
                        }
                    });
                    _this.cdkTable.viewChange.next(data);
                });
                // add meta rows to the total row count.
                this.dataStream = ds.onRenderDataChanging
                    .pipe(operators.takeUntil(this.destroyed), operators.map(function (_a) {
                    var data = _a.data;
                    var metaRows = _this.metaRows = [_this.header.rows.length, _this.footer.rows.length];
                    return new Array(data.length + metaRows[0] + metaRows[1]);
                }));
                ds.onRenderedDataChanged
                    .pipe(operators.takeUntil(this.destroyed), operators.map(function () { return ds.length; }), operators.startWith(0), operators.pairwise(), operators.filter(function (_a) {
                    var _b = __read(_a, 2), prev = _b[0], curr = _b[1];
                    return prev !== curr;
                }))
                    .subscribe(function (_a) {
                    var _b = __read(_a, 2), prev = _b[0], curr = _b[1];
                    _this.ngZone.onStable.pipe(operators.take(1)).subscribe(function () { return _this.viewport.onSourceLengthChange(prev, curr); });
                });
                this.viewport.attach(this);
            }
        };
        PblVirtualScrollForOf.prototype.detachView = function () {
            this.ds = undefined;
            this.viewport.detach();
        };
        return PblVirtualScrollForOf;
    }());

    /**
     * Returns an handler (function) that should be called when an element starts scrolling.
     * The handler will track the scrolling until done emitting 2 events in the process:
     *
     * - `PblCdkVirtualScrollViewportComponent.scrolling`: Update the state of scrolling
     * - `PblCdkVirtualScrollViewportComponent.scrollFrameRate`: Update the estimated frame rate while scrolling
     *
     * `scrollFrameRate` is measured based on the frequency `requestAnimationFrame` is fired on.
     * The event will fire every 500ms, starting after 500ms of scrolling have passed which will allow decent sampling time.
     */
    function createScrollWatcherFn(vScrollViewport) {
        var scrolling = 0;
        var lastOffset = vScrollViewport.measureScrollOffset();
        return function () {
            /*  `scrolling` is a boolean flag that turns on with the first `scroll` events and ends after 2 browser animation frames have passed without a `scroll` event.
                This is an attempt to detect a scroll end event, which does not exist.
        
                `scrollFrameRate` is a number that represent a rough estimation of the frame rate by measuring the time passed between each request animation frame
                while the `scrolling` state is true. The frame rate value is the average frame rate from all measurements since the scrolling began.
                To estimate the frame rate, a significant number of measurements is required so value is emitted every 500 ms.
                This means that a single scroll or short scroll bursts will not result in a `scrollFrameRate` emissions.
        
            */
            if (scrolling === 0) {
                /*  The measure array holds values required for frame rate measurements.
                    [0] Storage for last timestamp taken
                    [1] The sum of all measurements taken (a measurement is the time between 2 snapshots)
                    [2] The count of all measurements
                    [3] The sum of all measurements taken WITHIN the current buffer window. This buffer is flushed into [1] every X ms (see buggerWindow const).
                */
                var bufferWindow_1 = 499;
                var measure_1 = [performance.now(), 0, 0, 0];
                var offset = vScrollViewport.measureScrollOffset();
                if (lastOffset === offset) {
                    return;
                }
                var delta = lastOffset < offset ? 1 : -1;
                vScrollViewport.scrolling.next(delta);
                var raf_1 = function () {
                    var time = -measure_1[0] + (measure_1[0] = performance.now());
                    if (time > 5) {
                        measure_1[1] += time;
                        measure_1[2] += 1;
                    }
                    if (scrolling === -1) {
                        scrolling = 0;
                        lastOffset = vScrollViewport.measureScrollOffset();
                        vScrollViewport.scrolling.next(0);
                    }
                    else {
                        if (measure_1[1] > bufferWindow_1) {
                            measure_1[3] += measure_1[1];
                            measure_1[1] = 0;
                            vScrollViewport.scrollFrameRate.emit(1000 / (measure_1[3] / measure_1[2]));
                        }
                        scrolling = scrolling === 1 ? -1 : 1;
                        requestAnimationFrame(raf_1);
                    }
                };
                requestAnimationFrame(raf_1);
            }
            scrolling++;
        };
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * A class that tracks the size of items that have been seen and uses it to estimate the average
     * item size.
     */
    var ItemSizeAverager = /** @class */ (function () {
        /** @param defaultItemSize The default size to use for items when no data is available. */
        function ItemSizeAverager(defaultItemSize) {
            if (defaultItemSize === void 0) { defaultItemSize = 50; }
            /** The total amount of weight behind the current average. */
            this._totalWeight = 0;
            this._defaultItemSize = defaultItemSize;
            this._averageItemSize = defaultItemSize;
        }
        /** Returns the average item size. */
        ItemSizeAverager.prototype.getAverageItemSize = function () {
            return this._averageItemSize;
        };
        /**
         * Adds a measurement sample for the estimator to consider.
         * @param range The measured range.
         * @param size The measured size of the given range in pixels.
         */
        ItemSizeAverager.prototype.addSample = function (range, size) {
            var newTotalWeight = this._totalWeight + range.end - range.start;
            if (newTotalWeight) {
                var newAverageItemSize = (size + this._averageItemSize * this._totalWeight) / newTotalWeight;
                if (newAverageItemSize) {
                    this._averageItemSize = newAverageItemSize;
                    this._totalWeight = newTotalWeight;
                }
            }
        };
        /** Resets the averager. */
        ItemSizeAverager.prototype.reset = function () {
            this._averageItemSize = this._defaultItemSize;
            this._totalWeight = 0;
        };
        return ItemSizeAverager;
    }());
    /** Virtual scrolling strategy for lists with items of unknown or dynamic size. */
    var AutoSizeVirtualScrollStrategy = /** @class */ (function () {
        /**
         * @param minBufferPx The minimum amount of buffer rendered beyond the viewport (in pixels).
         *     If the amount of buffer dips below this number, more items will be rendered.
         * @param maxBufferPx The number of pixels worth of buffer to shoot for when rendering new items.
         *     If the actual amount turns out to be less it will not necessarily trigger an additional
         *     rendering cycle (as long as the amount of buffer is still greater than `minBufferPx`).
         * @param averager The averager used to estimate the size of unseen items.
         */
        function AutoSizeVirtualScrollStrategy(minBufferPx, maxBufferPx, averager) {
            if (averager === void 0) { averager = new ItemSizeAverager(); }
            /** @docs-private Implemented as part of VirtualScrollStrategy. */
            this.scrolledIndexChange = new rxjs.Observable(function () {
                // TODO(mmalerba): Implement.
                if (typeof ngDevMode === 'undefined' || ngDevMode) {
                    throw Error('cdk-virtual-scroll: scrolledIndexChange is currently not supported for the' +
                        ' autosize scroll strategy');
                }
            });
            /** The attached viewport. */
            this._viewport = null;
            /**
             * The number of consecutive cycles where removing extra items has failed. Failure here means that
             * we estimated how many items we could safely remove, but our estimate turned out to be too much
             * and it wasn't safe to remove that many elements.
             */
            this._removalFailures = 0;
            this._minBufferPx = minBufferPx;
            this._maxBufferPx = maxBufferPx;
            this._averager = averager;
        }
        /**
         * Attaches this scroll strategy to a viewport.
         * @param viewport The viewport to attach this strategy to.
         */
        AutoSizeVirtualScrollStrategy.prototype.attach = function (viewport) {
            this._averager.reset();
            this._viewport = viewport;
            this._renderContentForCurrentOffset();
        };
        /** Detaches this scroll strategy from the currently attached viewport. */
        AutoSizeVirtualScrollStrategy.prototype.detach = function () {
            this._viewport = null;
        };
        /** @docs-private Implemented as part of VirtualScrollStrategy. */
        AutoSizeVirtualScrollStrategy.prototype.onContentScrolled = function () {
            if (this._viewport) {
                this._updateRenderedContentAfterScroll();
            }
        };
        /** @docs-private Implemented as part of VirtualScrollStrategy. */
        AutoSizeVirtualScrollStrategy.prototype.onDataLengthChanged = function () {
            if (this._viewport) {
                this._renderContentForCurrentOffset();
                this._checkRenderedContentSize();
            }
        };
        /** @docs-private Implemented as part of VirtualScrollStrategy. */
        AutoSizeVirtualScrollStrategy.prototype.onContentRendered = function () {
            if (this._viewport) {
                this._checkRenderedContentSize();
            }
        };
        /** @docs-private Implemented as part of VirtualScrollStrategy. */
        AutoSizeVirtualScrollStrategy.prototype.onRenderedOffsetChanged = function () {
            if (this._viewport) {
                this._checkRenderedContentOffset();
            }
        };
        /** Scroll to the offset for the given index. */
        AutoSizeVirtualScrollStrategy.prototype.scrollToIndex = function () {
            if (typeof ngDevMode === 'undefined' || ngDevMode) {
                // TODO(mmalerba): Implement.
                throw Error('cdk-virtual-scroll: scrollToIndex is currently not supported for the autosize'
                    + ' scroll strategy');
            }
        };
        /**
         * Update the buffer parameters.
         * @param minBufferPx The minimum amount of buffer rendered beyond the viewport (in pixels).
         * @param maxBufferPx The number of buffer items to render beyond the edge of the viewport (in
         *     pixels).
         */
        AutoSizeVirtualScrollStrategy.prototype.updateBufferSize = function (minBufferPx, maxBufferPx) {
            if (maxBufferPx < minBufferPx) {
                throw ('CDK virtual scroll: maxBufferPx must be greater than or equal to minBufferPx');
            }
            this._minBufferPx = minBufferPx;
            this._maxBufferPx = maxBufferPx;
        };
        /** Update the rendered content after the user scrolls. */
        AutoSizeVirtualScrollStrategy.prototype._updateRenderedContentAfterScroll = function () {
            var viewport = this._viewport;
            // The current scroll offset.
            var scrollOffset = viewport.measureScrollOffset();
            // The delta between the current scroll offset and the previously recorded scroll offset.
            var scrollDelta = scrollOffset - this._lastScrollOffset;
            // The magnitude of the scroll delta.
            var scrollMagnitude = Math.abs(scrollDelta);
            // The currently rendered range.
            var renderedRange = viewport.getRenderedRange();
            // If we're scrolling toward the top, we need to account for the fact that the predicted amount
            // of content and the actual amount of scrollable space may differ. We address this by slowly
            // correcting the difference on each scroll event.
            var offsetCorrection = 0;
            if (scrollDelta < 0) {
                // The content offset we would expect based on the average item size.
                var predictedOffset = renderedRange.start * this._averager.getAverageItemSize();
                // The difference between the predicted size of the unrendered content at the beginning and
                // the actual available space to scroll over. We need to reduce this to zero by the time the
                // user scrolls to the top.
                // - 0 indicates that the predicted size and available space are the same.
                // - A negative number that the predicted size is smaller than the available space.
                // - A positive number indicates the predicted size is larger than the available space
                var offsetDifference = predictedOffset - this._lastRenderedContentOffset;
                // The amount of difference to correct during this scroll event. We calculate this as a
                // percentage of the total difference based on the percentage of the distance toward the top
                // that the user scrolled.
                offsetCorrection = Math.round(offsetDifference *
                    Math.max(0, Math.min(1, scrollMagnitude / (scrollOffset + scrollMagnitude))));
                // Based on the offset correction above, we pretend that the scroll delta was bigger or
                // smaller than it actually was, this way we can start to eliminate the difference.
                scrollDelta = scrollDelta - offsetCorrection;
                scrollMagnitude = Math.abs(scrollDelta);
            }
            // The current amount of buffer past the start of the viewport.
            var startBuffer = this._lastScrollOffset - this._lastRenderedContentOffset;
            // The current amount of buffer past the end of the viewport.
            var endBuffer = (this._lastRenderedContentOffset + this._lastRenderedContentSize) -
                (this._lastScrollOffset + viewport.getViewportSize());
            // The amount of unfilled space that should be filled on the side the user is scrolling toward
            // in order to safely absorb the scroll delta.
            var underscan = scrollMagnitude + this._minBufferPx -
                (scrollDelta < 0 ? startBuffer : endBuffer);
            // Check if there's unfilled space that we need to render new elements to fill.
            if (underscan > 0) {
                // Check if the scroll magnitude was larger than the viewport size. In this case the user
                // won't notice a discontinuity if we just jump to the new estimated position in the list.
                // However, if the scroll magnitude is smaller than the viewport the user might notice some
                // jitteriness if we just jump to the estimated position. Instead we make sure to scroll by
                // the same number of pixels as the scroll magnitude.
                if (scrollMagnitude >= viewport.getViewportSize()) {
                    this._renderContentForCurrentOffset();
                }
                else {
                    // The number of new items to render on the side the user is scrolling towards. Rather than
                    // just filling the underscan space, we actually fill enough to have a buffer size of
                    // `maxBufferPx`. This gives us a little wiggle room in case our item size estimate is off.
                    var addItems = Math.max(0, Math.ceil((underscan - this._minBufferPx + this._maxBufferPx) /
                        this._averager.getAverageItemSize()));
                    // The amount of filled space beyond what is necessary on the side the user is scrolling
                    // away from.
                    var overscan = (scrollDelta < 0 ? endBuffer : startBuffer) - this._minBufferPx +
                        scrollMagnitude;
                    // The number of currently rendered items to remove on the side the user is scrolling away
                    // from. If removal has failed in recent cycles we are less aggressive in how much we try to
                    // remove.
                    var unboundedRemoveItems = Math.floor(overscan / this._averager.getAverageItemSize() / (this._removalFailures + 1));
                    var removeItems = Math.min(renderedRange.end - renderedRange.start, Math.max(0, unboundedRemoveItems));
                    // The new range we will tell the viewport to render. We first expand it to include the new
                    // items we want rendered, we then contract the opposite side to remove items we no longer
                    // want rendered.
                    var range = this._expandRange(renderedRange, scrollDelta < 0 ? addItems : 0, scrollDelta > 0 ? addItems : 0);
                    if (scrollDelta < 0) {
                        range.end = Math.max(range.start + 1, range.end - removeItems);
                    }
                    else {
                        range.start = Math.min(range.end - 1, range.start + removeItems);
                    }
                    // The new offset we want to set on the rendered content. To determine this we measure the
                    // number of pixels we removed and then adjust the offset to the start of the rendered
                    // content or to the end of the rendered content accordingly (whichever one doesn't require
                    // that the newly added items to be rendered to calculate.)
                    var contentOffset = void 0;
                    var contentOffsetTo = void 0;
                    if (scrollDelta < 0) {
                        var removedSize = viewport.measureRangeSize({
                            start: range.end,
                            end: renderedRange.end,
                        });
                        // Check that we're not removing too much.
                        if (removedSize <= overscan) {
                            contentOffset =
                                this._lastRenderedContentOffset + this._lastRenderedContentSize - removedSize;
                            this._removalFailures = 0;
                        }
                        else {
                            // If the removal is more than the overscan can absorb just undo it and record the fact
                            // that the removal failed so we can be less aggressive next time.
                            range.end = renderedRange.end;
                            contentOffset = this._lastRenderedContentOffset + this._lastRenderedContentSize;
                            this._removalFailures++;
                        }
                        contentOffsetTo = 'to-end';
                    }
                    else {
                        var removedSize = viewport.measureRangeSize({
                            start: renderedRange.start,
                            end: range.start,
                        });
                        // Check that we're not removing too much.
                        if (removedSize <= overscan) {
                            contentOffset = this._lastRenderedContentOffset + removedSize;
                            this._removalFailures = 0;
                        }
                        else {
                            // If the removal is more than the overscan can absorb just undo it and record the fact
                            // that the removal failed so we can be less aggressive next time.
                            range.start = renderedRange.start;
                            contentOffset = this._lastRenderedContentOffset;
                            this._removalFailures++;
                        }
                        contentOffsetTo = 'to-start';
                    }
                    // Set the range and offset we calculated above.
                    viewport.setRenderedRange(range);
                    viewport.setRenderedContentOffset(contentOffset + offsetCorrection, contentOffsetTo);
                }
            }
            else if (offsetCorrection) {
                // Even if the rendered range didn't change, we may still need to adjust the content offset to
                // simulate scrolling slightly slower or faster than the user actually scrolled.
                viewport.setRenderedContentOffset(this._lastRenderedContentOffset + offsetCorrection);
            }
            // Save the scroll offset to be compared to the new value on the next scroll event.
            this._lastScrollOffset = scrollOffset;
        };
        /**
         * Checks the size of the currently rendered content and uses it to update the estimated item size
         * and estimated total content size.
         */
        AutoSizeVirtualScrollStrategy.prototype._checkRenderedContentSize = function () {
            var viewport = this._viewport;
            this._lastRenderedContentSize = viewport.measureRenderedContentSize();
            this._averager.addSample(viewport.getRenderedRange(), this._lastRenderedContentSize);
            this._updateTotalContentSize(this._lastRenderedContentSize);
        };
        /** Checks the currently rendered content offset and saves the value for later use. */
        AutoSizeVirtualScrollStrategy.prototype._checkRenderedContentOffset = function () {
            var viewport = this._viewport;
            this._lastRenderedContentOffset = viewport.getOffsetToRenderedContentStart();
        };
        /**
         * Recalculates the rendered content based on our estimate of what should be shown at the current
         * scroll offset.
         */
        AutoSizeVirtualScrollStrategy.prototype._renderContentForCurrentOffset = function () {
            var viewport = this._viewport;
            var scrollOffset = viewport.measureScrollOffset();
            this._lastScrollOffset = scrollOffset;
            this._removalFailures = 0;
            var itemSize = this._averager.getAverageItemSize();
            var firstVisibleIndex = Math.min(viewport.getDataLength() - 1, Math.floor(scrollOffset / itemSize));
            var bufferSize = Math.ceil(this._maxBufferPx / itemSize);
            var range = this._expandRange(this._getVisibleRangeForIndex(firstVisibleIndex), bufferSize, bufferSize);
            viewport.setRenderedRange(range);
            viewport.setRenderedContentOffset(itemSize * range.start);
        };
        // TODO: maybe move to base class, can probably share with fixed size strategy.
        /**
         * Gets the visible range of data for the given start index. If the start index is too close to
         * the end of the list it may be backed up to ensure the estimated size of the range is enough to
         * fill the viewport.
         * Note: must not be called if `this._viewport` is null
         * @param startIndex The index to start the range at
         * @return a range estimated to be large enough to fill the viewport when rendered.
         */
        AutoSizeVirtualScrollStrategy.prototype._getVisibleRangeForIndex = function (startIndex) {
            var viewport = this._viewport;
            var range = {
                start: startIndex,
                end: startIndex +
                    Math.ceil(viewport.getViewportSize() / this._averager.getAverageItemSize())
            };
            var extra = range.end - viewport.getDataLength();
            if (extra > 0) {
                range.start = Math.max(0, range.start - extra);
            }
            return range;
        };
        // TODO: maybe move to base class, can probably share with fixed size strategy.
        /**
         * Expand the given range by the given amount in either direction.
         * Note: must not be called if `this._viewport` is null
         * @param range The range to expand
         * @param expandStart The number of items to expand the start of the range by.
         * @param expandEnd The number of items to expand the end of the range by.
         * @return The expanded range.
         */
        AutoSizeVirtualScrollStrategy.prototype._expandRange = function (range, expandStart, expandEnd) {
            var viewport = this._viewport;
            var start = Math.max(0, range.start - expandStart);
            var end = Math.min(viewport.getDataLength(), range.end + expandEnd);
            return { start: start, end: end };
        };
        /** Update the viewport's total content size. */
        AutoSizeVirtualScrollStrategy.prototype._updateTotalContentSize = function (renderedContentSize) {
            var viewport = this._viewport;
            var renderedRange = viewport.getRenderedRange();
            var totalSize = renderedContentSize +
                (viewport.getDataLength() - (renderedRange.end - renderedRange.start)) *
                    this._averager.getAverageItemSize();
            viewport.setTotalContentSize(totalSize);
        };
        return AutoSizeVirtualScrollStrategy;
    }());

    var PblNgridAutoSizeVirtualScrollStrategy = /** @class */ (function (_super) {
        __extends(PblNgridAutoSizeVirtualScrollStrategy, _super);
        function PblNgridAutoSizeVirtualScrollStrategy(minBufferPx, maxBufferPx, averager) {
            if (averager === void 0) { averager = new PblNgridItemSizeAverager(); }
            var _this = _super.call(this, minBufferPx, maxBufferPx, averager) || this;
            _this.averager = averager;
            return _this;
        }
        Object.defineProperty(PblNgridAutoSizeVirtualScrollStrategy.prototype, "type", {
            get: function () { return 'vScrollAuto'; },
            enumerable: false,
            configurable: true
        });
        PblNgridAutoSizeVirtualScrollStrategy.prototype.attachExtApi = function (extApi) {
            this.extApi = extApi;
        };
        PblNgridAutoSizeVirtualScrollStrategy.prototype.attach = function (viewport) {
            if (!this.extApi) {
                if (typeof ngDevMode === 'undefined' || ngDevMode) {
                    throw new Error('Invalid use of attach, you must first attach `PblNgridExtensionApi`');
                }
            }
            _super.prototype.attach.call(this, viewport);
        };
        return PblNgridAutoSizeVirtualScrollStrategy;
    }(AutoSizeVirtualScrollStrategy));
    var PblNgridItemSizeAverager = /** @class */ (function (_super) {
        __extends(PblNgridItemSizeAverager, _super);
        function PblNgridItemSizeAverager() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PblNgridItemSizeAverager.prototype.addSample = function (range, size) {
            if (this.rowInfo && this.rowInfo.rowLength === 0) {
                this.reset();
            }
            else {
                _super.prototype.addSample.call(this, range, size);
            }
        };
        /**
         * A temp workaround to solve the actual vs wanted rendered row issue in `CdkVirtualScrollViewport`
         *
         * `CdkVirtualScrollViewport.getRenderedRange()` return the rows that the virtual container want's the grid to render
         * however, the actual rendered rows might be different. This is a problem especially in init, when the rendered rows are actually 0
         * but `CdkVirtualScrollViewport.getRenderedRange()` return the initial range of rows that should be rendered. This results in a wrong
         * calculation of the average item size in `ItemSizeAverager`
         *
         * SEE: https://github.com/angular/material2/blob/a9e550e5bf93cd68c342d1a50d8576d8f3812ebe/src/cdk/scrolling/virtual-scroll-viewport.ts#L212-L220
         */
        PblNgridItemSizeAverager.prototype.setRowInfo = function (rowInfo) {
            this.rowInfo = rowInfo;
        };
        return PblNgridItemSizeAverager;
    }(ItemSizeAverager));

    var RowIntersectionTracker = /** @class */ (function () {
        function RowIntersectionTracker(rootElement, forceManual) {
            var intersectionChanged = this.intersectionChanged = new rxjs.Subject();
            if (!forceManual && !!IntersectionObserver) {
                this.intersectionObserver = new IntersectionObserver(function (entries) { return intersectionChanged.next(entries); }, {
                    root: rootElement,
                    rootMargin: '0px',
                    threshold: 0.0,
                });
            }
        }
        Object.defineProperty(RowIntersectionTracker.prototype, "observerMode", {
            get: function () { return !!this.intersectionObserver; },
            enumerable: false,
            configurable: true
        });
        RowIntersectionTracker.prototype.snapshot = function () {
            var _a, _b;
            return (_b = (_a = this.intersectionObserver) === null || _a === void 0 ? void 0 : _a.takeRecords()) !== null && _b !== void 0 ? _b : [];
        };
        RowIntersectionTracker.prototype.track = function (element) {
            var _a;
            (_a = this.intersectionObserver) === null || _a === void 0 ? void 0 : _a.observe(element);
        };
        RowIntersectionTracker.prototype.untrack = function (element) {
            var _a;
            (_a = this.intersectionObserver) === null || _a === void 0 ? void 0 : _a.unobserve(element);
        };
        RowIntersectionTracker.prototype.destroy = function () {
            var _a;
            this.intersectionChanged.complete();
            (_a = this.intersectionObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
        };
        return RowIntersectionTracker;
    }());

    /**
     * Logic for height paging:
     *
     * The whole logic is here to workaround browser issues with PX limit.
     * With virtual scroll we simulate the height by rendering a small viewport size box that inside
     * we create a fake element that simulate the height of the total items we need to render.
     * When the user scrolls we calculate the items that should be rendered for that scroll position.
     *
     * This is ok, until we reach a limit of maximum height/width a browser can handle which is implementation based.
     * Chrome will break on 34m PX, same for safari but firefox (OSX) it's 17m.
     *
     * What paging does is set a fixed height, which is below the limit of the browser.
     * Then fit the total height required into the fixed height we defined using math.
     *
     * This is done via pages. We split the scroll area into pages, each page we go over will offset the scroll bar a bit
     * to compensate for the gap between the total height and the fixed height.
     *
     * For example, if the total items height is 1000px and the fixed height is 600px, we have a 400px height to compensate while scrolling.
     * If we have 11 pages, that's 10 pages we swap, each swap should compensate 40px so we will in total compensate 400px.
     * When the user scroll's down and reaches the "page" we slightly shift the scroll bar up 40px, giving us 40px more to scroll down, 10 times like this and we get 400px additional scroll area
     * which is what we need for all of our items.
     *
     * This is the theory, in practice this depends on the scroll delta, on large scrolls we can't change the actual scroll position, we just recalculate the current page/offset
     * On small delta's we do calculate and if a fix is required we will do it.
     *
     * This "fix" only happen when the scroll position + delta moves us from a page to the next/prev page.
     * Since we're talking large scale here, the pages are quite big so getting to that point should be rare.
     *
     * The logic here is incomplete, especially when switching from location based calculation where we set the page/offset based on the scroll offset
     * To page based calculation where we calculate the location (scroll offset) based on the page/offset we're in.
     *
     * The 2 methods can't work together because if you do a paged based calc you push the scroll offset which will reflect on the next location based calc.
     *
     * The 2 methods run based on the scroll delta, on large scroll gaps we want to do location based calc because we don't really scroll it might be wheel but also might be dragging the bar.
     * On small incremental wheel events we want to determine when the page shifts.
     *
     * In general, we want to have lower page height which means more offset points.
     * This means more places where the user can "see" these jumps but each jump is minimal.
     * However, if we do large page height, less jumps, we probably be in a situation where the user never see these jumps.
     * The problem is, when the jumps occurs the whole math is useless, and this happens on MOST up scrolls.
     *
     * This is to say, we need to refactor this process to use only one method and find the sweet spot for the page height.
     * Maybe 3 X ViewPort size...
     */
    // const LOG = msg => console.log(msg) ;
    /* Height limits: Chrome,  Safari: ~34m | FireFox: ~17m
    */
    var MAX_SCROLL_HEIGHT = calculateBrowserPxLimit();
    var VirtualScrollHightPaging = /** @class */ (function () {
        function VirtualScrollHightPaging(viewport) {
            var _this = this;
            this.viewport = viewport;
            this.afterToEnd = false;
            this.active = false;
            this.activeChanged = new rxjs.Subject();
            var onContentScrolled = viewport.pblScrollStrategy.onContentScrolled;
            viewport.pblScrollStrategy.onContentScrolled = function () {
                if (_this.active) {
                    var scrollOffset = viewport.element.scrollTop;
                    var delta = scrollOffset - _this.prevScrollOffset;
                    var viewportSize = delta > 0 ? viewport.getViewportSize() : 80;
                    if (Math.abs(delta) > viewportSize) {
                        // LOG(`DELTA#BEFORE ${scrollOffset} - ${this.page}`);
                        _this.page = Math.floor(scrollOffset * ((_this.totalHeight - viewportSize) / (MAX_SCROLL_HEIGHT - viewportSize)) * (1 / _this.pageHeight));
                        // LOG(`DELTA ${scrollOffset} - ${this.page}`);
                        _this.offset = Math.round(_this.page * _this.coff);
                        _this.prevScrollOffset = scrollOffset;
                    }
                    else if (_this.prevScrollOffset !== scrollOffset) {
                        // next page
                        if (delta > 0 && scrollOffset + _this.offset > (_this.page + 1) * _this.pageHeight) {
                            // LOG(`NEXT ${scrollOffset}`);
                            _this.page += 1;
                            _this.offset += _this.coff;
                            viewport.element.scrollTop = _this.prevScrollOffset = Math.floor(scrollOffset - _this.coff);
                            // LOG(`NEXT# 2 ${viewport.element.scrollTop}`);
                            return;
                        }
                        // prev page
                        else if (delta < 0 && scrollOffset + _this.offset < _this.page * _this.pageHeight) {
                            // LOG(`PREV ${scrollOffset}`);
                            _this.page -= 1;
                            _this.offset -= _this.coff;
                            viewport.element.scrollTop = _this.prevScrollOffset = Math.floor(scrollOffset + _this.coff);
                            // LOG(`PREV# 2 ${viewport.element.scrollTop}`);
                            return;
                        }
                        else {
                            // LOG(`SKIP ${scrollOffset}`);
                            _this.prevScrollOffset = scrollOffset;
                        }
                    }
                }
                onContentScrolled.call(viewport.pblScrollStrategy);
            };
        }
        VirtualScrollHightPaging.prototype.transformScrollOffset = function (originalOffset) {
            return originalOffset + (this.active ? this.offset : 0);
        };
        VirtualScrollHightPaging.prototype.transformOffsetToRenderedContentStart = function (originalRenderContentStart) {
            return (!originalRenderContentStart || !this.active)
                ? originalRenderContentStart
                : originalRenderContentStart + this.offset;
        };
        VirtualScrollHightPaging.prototype.transformRenderedContentOffset = function (offset, to) {
            if (to === void 0) { to = 'to-start'; }
            if (this.active) {
                if (!this.afterToEnd) {
                    offset -= this.offset;
                }
                this.afterToEnd = to === 'to-end';
            }
            return offset;
        };
        VirtualScrollHightPaging.prototype.transformTotalContentSize = function (totalHeight, scrollOffset) {
            var wasActive = !!this.active;
            if (totalHeight <= MAX_SCROLL_HEIGHT) {
                this.active = false;
            }
            else if (this.totalHeight !== totalHeight) {
                this.active = true;
                this.totalHeight = totalHeight;
                this.pageHeight = MAX_SCROLL_HEIGHT / 100;
                this.pageCount = Math.ceil(totalHeight / this.pageHeight);
                this.coff = Math.floor((totalHeight - MAX_SCROLL_HEIGHT) / (this.pageCount - 1));
                this.prevScrollOffset = scrollOffset;
                this.offset = this.offset || 0;
                this.page = this.page || 0;
                this.afterToEnd = !!this.afterToEnd;
                totalHeight = MAX_SCROLL_HEIGHT;
            }
            if (wasActive !== this.active) {
                this.activeChanged.next();
            }
            return totalHeight;
        };
        VirtualScrollHightPaging.prototype.shouldTransformTotalContentSize = function (totalHeight) {
            if (totalHeight <= MAX_SCROLL_HEIGHT) {
                this.active = false;
            }
            else if (this.totalHeight !== totalHeight) {
                return true;
            }
            return false;
        };
        VirtualScrollHightPaging.prototype.dispose = function () {
            this.activeChanged.complete();
        };
        return VirtualScrollHightPaging;
    }());

    var DISABLE_INTERSECTION_OBSERVABLE = new i0.InjectionToken('When found in the DI tree and resolves to true, disable the use of IntersectionObserver');
    var APP_DEFAULT_VIRTUAL_SCROLL_STRATEGY = function () { return new PblNgridAutoSizeVirtualScrollStrategy(100, 200); };
    var PblCdkVirtualScrollViewportComponent = /** @class */ (function (_super) {
        __extends(PblCdkVirtualScrollViewportComponent, _super);
        function PblCdkVirtualScrollViewportComponent(elRef, cdr, ngZone, config, pblScrollStrategy, dir, scrollDispatcher, viewportRuler, extApi, disableIntersectionObserver) {
            var _this = _super.call(this, elRef, cdr, ngZone, 
            // TODO: Replace with `PblNgridDynamicVirtualScrollStrategy` in v4
            pblScrollStrategy = resolveScrollStrategy(config, pblScrollStrategy, APP_DEFAULT_VIRTUAL_SCROLL_STRATEGY), dir, scrollDispatcher, viewportRuler) || this;
            _this.cdr = cdr;
            _this.pblScrollStrategy = pblScrollStrategy;
            _this.extApi = extApi;
            /**
             * Event emitted when the scrolling state of rows in the grid changes.
             * When scrolling starts `true` is emitted and when the scrolling ends `false` is emitted.
             *
             * The grid is in "scrolling" state from the first scroll event and until 2 animation frames
             * have passed without a scroll event.
             *
             * When scrolling, the emitted value is the direction: -1 or 1
             * When not scrolling, the emitted value is 0.
             *
             * NOTE: This event runs outside the angular zone.
             */
            _this.scrolling = new i0.EventEmitter();
            /**
             * Emits an estimation of the current frame rate while scrolling, in a 500ms interval.
             *
             * The frame rate value is the average frame rate from all measurements since the scrolling began.
             * To estimate the frame rate, a significant number of measurements is required so value is emitted every 500 ms.
             * This means that a single scroll or short scroll bursts will not result in a `scrollFrameRate` emissions.
             *
             * Valid on when virtual scrolling is enabled.
             *
             * NOTE: This event runs outside the angular zone.
             *
             * In the future the measurement logic might be replaced with the Frame Timing API
             * See:
             * - https://developers.google.com/web/updates/2014/11/frame-timing-api
             * - https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver
             * - https://github.com/googlearchive/frame-timing-polyfill/wiki/Explainer
             */
            _this.scrollFrameRate = new i0.EventEmitter();
            /**
             * The `scrollHeight` of the virtual scroll viewport.
             * The `scrollHeight` is updated by the virtual scroll (update logic and frequency depends on the strategy implementation) through
             * the `setTotalContentSize(size)` method. The input size is used to position a dummy spacer element at a position that mimics the `scrollHeight`.
             *
             * In theory, the size sent to `setTotalContentSize` should equal the `scrollHeight` value, once the browser update's the layout.
             * In reality it does not happen, sometimes they are not equal. Setting a size will result in a different `scrollHeight`.
             * This might be due to changes in measurements when handling sticky meta rows (moving back and forth)
             *
             * Because the position of the dummy spacer element is set through DI the layout will run in the next micro-task after the call to `setTotalContentSize`.
             */
            _this.scrollHeight = 0;
            _this.ngeRenderedContentSize = 0;
            _this.offsetChange$ = new rxjs.Subject();
            _this.offset = 0;
            _this._isScrolling = false;
            _this.element = elRef.nativeElement;
            _this.grid = extApi.grid;
            if (config.has('virtualScroll')) {
                _this.wheelModeDefault = config.get('virtualScroll').wheelMode;
            }
            config.onUpdate('virtualScroll').pipe(i1.unrx(_this)).subscribe(function (change) { return _this.wheelModeDefault = change.curr.wheelMode; });
            _this.enabled = pblScrollStrategy.type && pblScrollStrategy.type !== 'vScrollNone';
            extApi.setViewport(_this);
            _this.offsetChange = _this.offsetChange$.asObservable();
            _this._minWidth$ = _this.grid.columnApi.totalColumnWidthChange;
            _this.intersection = new RowIntersectionTracker(_this.element, !!disableIntersectionObserver);
            return _this;
        }
        Object.defineProperty(PblCdkVirtualScrollViewportComponent.prototype, "isScrolling", {
            get: function () { return this._isScrolling; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblCdkVirtualScrollViewportComponent.prototype, "wheelMode", {
            get: function () {
                return this.pblScrollStrategy.wheelMode || this.wheelModeDefault || 'passive';
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblCdkVirtualScrollViewportComponent.prototype, "getBoundingClientRects", {
            /**
             * Get the current bounding client rectangle boxes for the virtual scroll container
             * Since performing these measurements impact performance the values are are cached between request animation frames.
             * I.E 2 subsequent measurements will always return the same value, the next measurement will only take place after
             * the next animation frame (using `requestAnimationFrame` API)
             */
            get: function () {
                var _this = this;
                if (!this._boundingClientRects) {
                    var innerBox = this._innerBoxHelper.nativeElement.getBoundingClientRect();
                    var clientRect = this.element.getBoundingClientRect();
                    this._boundingClientRects = {
                        clientRect: clientRect,
                        innerWidth: innerBox.width,
                        innerHeight: innerBox.height,
                        scrollBarWidth: clientRect.width - innerBox.width,
                        scrollBarHeight: clientRect.height - innerBox.height,
                    };
                    var resetCurrentBox = function () { return _this._boundingClientRects = undefined; };
                    if (this._isScrolling) {
                        this.scrolling.pipe(operators.filter(function (scrolling) { return scrolling === 0; }), operators.take(1)).subscribe(resetCurrentBox);
                    }
                    else {
                        requestAnimationFrame(resetCurrentBox);
                    }
                }
                return this._boundingClientRects;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblCdkVirtualScrollViewportComponent.prototype, "innerWidth", {
            get: function () {
                return this.getBoundingClientRects.innerWidth;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblCdkVirtualScrollViewportComponent.prototype, "outerWidth", {
            get: function () {
                return this.getBoundingClientRects.clientRect.width;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblCdkVirtualScrollViewportComponent.prototype, "innerHeight", {
            get: function () {
                return this.getBoundingClientRects.innerWidth;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblCdkVirtualScrollViewportComponent.prototype, "outerHeight", {
            get: function () {
                return this.getBoundingClientRects.clientRect.height;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblCdkVirtualScrollViewportComponent.prototype, "scrollWidth", {
            get: function () {
                return this.element.scrollWidth;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblCdkVirtualScrollViewportComponent.prototype, "virtualPagingActive", {
            /**
             * When true, the virtual paging feature is enabled because the virtual content size exceed the supported height of the browser so paging is enable.
             */
            get: function () { var _a, _b; return (_b = (_a = this.heightPaging) === null || _a === void 0 ? void 0 : _a.active) !== null && _b !== void 0 ? _b : false; },
            enumerable: false,
            configurable: true
        });
        PblCdkVirtualScrollViewportComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.pblScrollStrategy.attachExtApi(this.extApi);
            if (this.enabled) {
                // Enabling virtual scroll event with browser height limit
                // Based on: http://jsfiddle.net/SDa2B/263/
                this.heightPaging = new VirtualScrollHightPaging(this);
            }
            _super.prototype.ngOnInit.call(this);
            // Init the scrolling watcher which track scroll events an emits `scrolling` and `scrollFrameRate` events.
            this.ngZone.runOutsideAngular(function () { return _this.elementScrolled().subscribe(createScrollWatcherFn(_this)); });
        };
        PblCdkVirtualScrollViewportComponent.prototype.ngAfterViewInit = function () {
            var _this = this;
            // If virtual scroll is disabled (`NoVirtualScrollStrategy`) we need to disable any effect applied
            // by the viewport, wrapping the content injected to it.
            // The main effect is the grid having height 0 at all times, unless the height is explicitly set.
            // This happens because the content taking out of the layout, wrapped in absolute positioning.
            // Additionally, the host itself (viewport) is set to contain: strict.
            var grid = this.grid;
            if (this.enabled) {
                this.forOf = new PblVirtualScrollForOf(this.extApi, this.ngZone);
                if (!this.heightPaging.active) {
                    this.forOf.wheelControl.wheelListen();
                }
                // `wheel` mode does not work well with the workaround to fix height limit, so we disable it when it's on
                this.heightPaging.activeChanged
                    .subscribe(function () {
                    if (_this.heightPaging.active) {
                        _this.forOf.wheelControl.wheelUnListen();
                    }
                    else {
                        _this.forOf.wheelControl.wheelListen();
                    }
                });
            }
            this.scrolling
                .pipe(i1.unrx(this))
                .subscribe(function (isScrolling) {
                _this._isScrolling = !!isScrolling;
                if (isScrolling) {
                    grid.addClass('pbl-ngrid-scrolling');
                }
                else {
                    grid.removeClass('pbl-ngrid-scrolling');
                }
            });
        };
        PblCdkVirtualScrollViewportComponent.prototype.ngOnDestroy = function () {
            var _a;
            this.intersection.destroy();
            (_a = this.heightPaging) === null || _a === void 0 ? void 0 : _a.dispose();
            _super.prototype.ngOnDestroy.call(this);
            this.detachViewPort();
            this.offsetChange$.complete();
            i1.unrx.kill(this);
        };
        PblCdkVirtualScrollViewportComponent.prototype.reMeasureCurrentRenderedContent = function () {
            this.pblScrollStrategy.onContentRendered();
        };
        PblCdkVirtualScrollViewportComponent.prototype.measureScrollOffset = function (from) {
            var scrollOffset = _super.prototype.measureScrollOffset.call(this, from);
            return (!from || from === 'top') && this.heightPaging ? this.heightPaging.transformScrollOffset(scrollOffset) : scrollOffset;
        };
        PblCdkVirtualScrollViewportComponent.prototype.getOffsetToRenderedContentStart = function () {
            var _a, _b;
            var renderedContentStart = _super.prototype.getOffsetToRenderedContentStart.call(this);
            return (_b = (_a = this.heightPaging) === null || _a === void 0 ? void 0 : _a.transformOffsetToRenderedContentStart(renderedContentStart)) !== null && _b !== void 0 ? _b : renderedContentStart;
        };
        PblCdkVirtualScrollViewportComponent.prototype.setRenderedContentOffset = function (offset, to) {
            var _this = this;
            if (to === void 0) { to = 'to-start'; }
            var _a;
            if ((_a = this.heightPaging) === null || _a === void 0 ? void 0 : _a.active) {
                offset = this.heightPaging.transformRenderedContentOffset(offset, to);
            }
            _super.prototype.setRenderedContentOffset.call(this, offset, to);
            if (this.enabled) {
                if (this.offset !== offset) {
                    this.offset = offset;
                    if (!this.isCDPending) {
                        this.isCDPending = true;
                        this.ngZone.runOutsideAngular(function () { return Promise.resolve()
                            .then(function () {
                            _this.isCDPending = false;
                            _this.offsetChange$.next(_this.offset);
                        }); });
                    }
                }
            }
        };
        PblCdkVirtualScrollViewportComponent.prototype.setTotalContentSize = function (size) {
            var _this = this;
            var _a;
            if ((_a = this.heightPaging) === null || _a === void 0 ? void 0 : _a.shouldTransformTotalContentSize(size)) {
                size = this.heightPaging.transformTotalContentSize(size, _super.prototype.measureScrollOffset.call(this));
            }
            _super.prototype.setTotalContentSize.call(this, size);
            // TODO(shlomiassaf)[perf, 3]: run this once... (aggregate all calls within the same animation frame)
            requestAnimationFrame(function () {
                _this.scrollHeight = _this.element.scrollHeight; //size;
                _this.updateFiller();
                // We must trigger a change detection cycle because the filler div element is updated through bindings
                _this.cdr.markForCheck();
            });
        };
        /** Measure the combined size of all of the rendered items. */
        PblCdkVirtualScrollViewportComponent.prototype.measureRenderedContentSize = function () {
            var size = _super.prototype.measureRenderedContentSize.call(this);
            if (this.orientation === 'vertical') {
                size -= this.stickyRowHeaderContainer.offsetHeight + this.stickyRowFooterContainer.offsetHeight;
                // Compensate for hz scroll bar, if exists, only in non virtual scroll mode.
                if (!this.enabled) {
                    size += this.outerHeight - this.innerHeight;
                }
            }
            return this.ngeRenderedContentSize = size;
        };
        PblCdkVirtualScrollViewportComponent.prototype.checkViewportSize = function () {
            // TODO: Check for changes in `CdkVirtualScrollViewport` source code, when resizing is handled!
            // see https://github.com/angular/material2/blob/28fb3abe77c5336e4739c820584ec99c23f1ae38/src/cdk/scrolling/virtual-scroll-viewport.ts#L341
            var prev = this.getViewportSize();
            _super.prototype.checkViewportSize.call(this);
            if (prev !== this.getViewportSize()) {
                this.updateFiller();
            }
        };
        PblCdkVirtualScrollViewportComponent.prototype.detachViewPort = function () {
            if (this.forOf) {
                this.forOf.destroy();
                this.forOf = undefined;
            }
        };
        /**
         * TODO(REFACTOR_REF 1): Move to use rowApi so we can accept rows/cells and not html elements.
         * It will allow us to bring into view rows as well.
         * This will change the methods signature!
         * @internal
         */
        PblCdkVirtualScrollViewportComponent.prototype._scrollIntoView = function (cellElement) {
            var container = this.element;
            var elBox = cellElement.getBoundingClientRect();
            var containerBox = this.getBoundingClientRects.clientRect;
            // Vertical handling.
            // We have vertical virtual scroll, so here we use the virtual scroll API to scroll into the target
            if (elBox.top < containerBox.top) { // out from top
                var offset = elBox.top - containerBox.top;
                this.scrollToOffset(this.measureScrollOffset() + offset);
            }
            else if (elBox.bottom > containerBox.bottom) { // out from bottom
                var offset = elBox.bottom - (containerBox.bottom - this.getScrollBarThickness('horizontal'));
                this.scrollToOffset(this.measureScrollOffset() + offset);
            }
            // Horizontal handling.
            // We DON'T have horizontal virtual scroll, so here we use the DOM API to scroll into the target
            // TODO: When implementing horizontal virtual scroll, refactor this as well.
            if (elBox.left < containerBox.left) { // out from left
                var offset = elBox.left - containerBox.left;
                container.scroll(container.scrollLeft + offset, container.scrollTop);
            }
            else if (elBox.right > containerBox.right) { // out from right
                var offset = elBox.right - (containerBox.right - this.getScrollBarThickness('vertical'));
                container.scroll(container.scrollLeft + offset, container.scrollTop);
            }
        };
        PblCdkVirtualScrollViewportComponent.prototype.onSourceLengthChange = function (prev, curr) {
            this.checkViewportSize();
            this.updateFiller();
        };
        PblCdkVirtualScrollViewportComponent.prototype.attach = function (forOf) {
            _super.prototype.attach.call(this, forOf);
            var scrollStrategy = this.pblScrollStrategy instanceof PblNgridBaseVirtualScrollDirective
                ? this.pblScrollStrategy._scrollStrategy
                : this.pblScrollStrategy;
            if (scrollStrategy instanceof PblNgridAutoSizeVirtualScrollStrategy) {
                scrollStrategy.averager.setRowInfo(forOf);
            }
        };
        PblCdkVirtualScrollViewportComponent.prototype.setRenderedRange = function (range) {
            _super.prototype.setRenderedRange.call(this, range);
        };
        PblCdkVirtualScrollViewportComponent.prototype.getScrollBarThickness = function (location) {
            switch (location) {
                case 'horizontal':
                    return this.outerHeight - this.innerHeight;
                case 'vertical':
                    return this.outerWidth - this.innerWidth;
            }
        };
        PblCdkVirtualScrollViewportComponent.prototype.updateFiller = function () {
            this.measureRenderedContentSize();
            if (this.grid.noFiller) {
                this.pblFillerHeight = undefined;
            }
            else {
                this.pblFillerHeight = this.getViewportSize() >= this.ngeRenderedContentSize ?
                    "calc(100% - " + this.ngeRenderedContentSize + "px)"
                    : undefined;
            }
        };
        return PblCdkVirtualScrollViewportComponent;
    }(i3.CdkVirtualScrollViewport));
    /** @nocollapse */ PblCdkVirtualScrollViewportComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblCdkVirtualScrollViewportComponent, deps: [{ token: i0__namespace.ElementRef }, { token: i0__namespace.ChangeDetectorRef }, { token: i0__namespace.NgZone }, { token: i1__namespace$2.PblNgridConfigService }, { token: i3.VIRTUAL_SCROLL_STRATEGY, optional: true }, { token: i1__namespace$1.Directionality, optional: true }, { token: i3__namespace.ScrollDispatcher }, { token: i3__namespace.ViewportRuler }, { token: EXT_API_TOKEN }, { token: DISABLE_INTERSECTION_OBSERVABLE, optional: true }], target: i0__namespace.ɵɵFactoryTarget.Component });
    /** @nocollapse */ PblCdkVirtualScrollViewportComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.0", type: PblCdkVirtualScrollViewportComponent, selector: "pbl-cdk-virtual-scroll-viewport", inputs: { stickyRowHeaderContainer: "stickyRowHeaderContainer", stickyRowFooterContainer: "stickyRowFooterContainer" }, outputs: { scrolling: "scrolling", scrollFrameRate: "scrollFrameRate" }, host: { properties: { "class.cdk-virtual-scroll-disabled": "!enabled", "class.cdk-virtual-scroll-orientation-horizontal": "orientation === \"horizontal\"", "class.cdk-virtual-scroll-orientation-vertical": "orientation === \"vertical\"" }, classAttribute: "cdk-virtual-scroll-viewport" }, viewQueries: [{ propertyName: "_innerBoxHelper", first: true, predicate: ["innerBoxHelper"], descendants: true, static: true }], usesInheritance: true, ngImport: i0__namespace, template: "<p #innerBoxHelper class=\"cdk-virtual-scroll-inner-width\"></p>\n<ng-content select=\".cdk-virtual-scroll-before-content-wrapper\"></ng-content>\n<!--\n  Wrap the rendered content in an element that will be used to offset it based on the scroll\n  position.\n-->\n<div #contentWrapper [class.cdk-virtual-scroll-content-wrapper]=\"enabled\" style=\"width: 100%\" [style.minWidth.px]=\"_minWidth$ | async\">\n  <ng-content></ng-content>\n</div>\n\n<!--\n  Spacer used to force the scrolling container to the correct size for the *total* number of items\n  so that the scrollbar captures the size of the entire data set.\n-->\n<div *ngIf=\"enabled\" class=\"cdk-virtual-scroll-spacer\"\n     [style.width]=\"_totalContentWidth\" [style.height]=\"_totalContentHeight\"></div>\n<div *ngIf=\"pblFillerHeight && enabled\"\n    class=\"pbl-ngrid-space-fill\"\n    [style.minWidth.px]=\"_minWidth$ | async\"\n    [style.top.px]=\"ngeRenderedContentSize\"\n    [style.height]=\"pblFillerHeight\"></div>\n", styles: ["pbl-cdk-virtual-scroll-viewport{display:block;position:relative;overflow:auto;contain:strict;transform:translateZ(0);will-change:scroll-position;-webkit-overflow-scrolling:touch}pbl-cdk-virtual-scroll-viewport .cdk-virtual-scroll-content-wrapper{position:absolute;top:0;left:0;contain:content}[dir=rtl] pbl-cdk-virtual-scroll-viewport .cdk-virtual-scroll-content-wrapper{right:0;left:auto}.cdk-virtual-scroll-inner-width{width:100%;height:100%;position:absolute;margin:0!important;padding:0!important}.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper{min-height:100%}.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>dl:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>ol:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>table:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>ul:not([cdkVirtualFor]){padding-left:0;padding-right:0;margin-left:0;margin-right:0;border-left-width:0;border-right-width:0;outline:none}.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper{min-width:100%}.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>dl:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>ol:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>table:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>ul:not([cdkVirtualFor]){padding-top:0;padding-bottom:0;margin-top:0;margin-bottom:0;border-top-width:0;border-bottom-width:0;outline:none}.cdk-virtual-scroll-spacer{position:absolute;top:0;left:0;height:1px;width:1px;transform-origin:0 0}[dir=rtl] .cdk-virtual-scroll-spacer{right:0;left:auto;transform-origin:100% 0}.pbl-ngrid-space-fill{position:absolute;left:0;width:100%}"], directives: [{ type: i1__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "async": i1__namespace.AsyncPipe }, changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblCdkVirtualScrollViewportComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'pbl-cdk-virtual-scroll-viewport',
                        templateUrl: 'virtual-scroll-viewport.component.html',
                        styleUrls: ['virtual-scroll-viewport.component.scss'],
                        host: {
                            class: 'cdk-virtual-scroll-viewport',
                            '[class.cdk-virtual-scroll-disabled]': '!enabled',
                            '[class.cdk-virtual-scroll-orientation-horizontal]': 'orientation === "horizontal"',
                            '[class.cdk-virtual-scroll-orientation-vertical]': 'orientation === "vertical"'
                        },
                        encapsulation: i0.ViewEncapsulation.None,
                        changeDetection: i0.ChangeDetectionStrategy.OnPush
                    }]
            }], ctorParameters: function () {
            return [{ type: i0__namespace.ElementRef }, { type: i0__namespace.ChangeDetectorRef }, { type: i0__namespace.NgZone }, { type: i1__namespace$2.PblNgridConfigService }, { type: undefined, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.Inject,
                            args: [i3.VIRTUAL_SCROLL_STRATEGY]
                        }] }, { type: i1__namespace$1.Directionality, decorators: [{
                            type: i0.Optional
                        }] }, { type: i3__namespace.ScrollDispatcher }, { type: i3__namespace.ViewportRuler }, { type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [EXT_API_TOKEN]
                        }] }, { type: undefined, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.Inject,
                            args: [DISABLE_INTERSECTION_OBSERVABLE]
                        }] }];
        }, propDecorators: { _innerBoxHelper: [{
                    type: i0.ViewChild,
                    args: ['innerBoxHelper', { static: true }]
                }], stickyRowHeaderContainer: [{
                    type: i0.Input
                }], stickyRowFooterContainer: [{
                    type: i0.Input
                }], scrolling: [{
                    type: i0.Output
                }], scrollFrameRate: [{
                    type: i0.Output
                }] } });

    function internalApiFactory(grid) { return grid._extApi; }
    function pluginControllerFactory(grid) { return grid._plugin.controller; }
    function metaRowServiceFactory(grid) { return grid._extApi.rowsApi.metaRowService; }
    var PblNgridComponent = /** @class */ (function () {
        function PblNgridComponent(injector, vcRef, elRef, ngZone, cdr, config, 
        // TODO: Make private in v5
        /** @deprecated Will be removed in v5 */
        registry, id, dir) {
            var _this = this;
            this.elRef = elRef;
            this.ngZone = ngZone;
            this.cdr = cdr;
            this.config = config;
            this.registry = registry;
            this.id = id;
            this.rowClassUpdateFreq = 'item';
            this.rowFocus = '';
            this.cellFocus = '';
            this._dir = 'ltr';
            this._minDataViewHeight = 0;
            this._noCachePaginator = false;
            this._extApi = createApis(this, { config: config, registry: registry, ngZone: ngZone, injector: injector, vcRef: vcRef, elRef: elRef, cdRef: cdr, dir: dir });
            dir === null || dir === void 0 ? void 0 : dir.change.pipe(i1.unrx(this, 'dir'), operators.startWith(dir.value)).subscribe(function (value) { return _this._dir = value; });
            var gridConfig = config.get('table');
            this.showHeader = gridConfig.showHeader;
            this.showFooter = gridConfig.showFooter;
            this.noFiller = gridConfig.noFiller;
            this._extApi.onConstructed(function () {
                _this._viewport = _this._extApi.viewport;
                _this._cdkTable = _this._extApi.cdkTable;
            });
            this.contextApi = this._extApi.contextApi;
            this._store = this._extApi.columnStore;
            this._plugin = this._extApi.plugin;
            this.columnApi = this._extApi.columnApi;
            this.rowsApi = this._extApi.rowsApi;
        }
        Object.defineProperty(PblNgridComponent.prototype, "showHeader", {
            /**
             * Show/Hide the header row.
             * Default: true
             */
            get: function () { return this._showHeader; },
            set: function (value) {
                this._extApi.notifyPropChanged(this, 'showHeader', this._showHeader, this._showHeader = coercion.coerceBooleanProperty(value));
            },
            enumerable: false,
            configurable: true
        });
        ;
        Object.defineProperty(PblNgridComponent.prototype, "showFooter", {
            /**
             * Show/Hide the footer row.
             * Default: false
             */
            get: function () { return this._showFooter; },
            set: function (value) {
                this._extApi.notifyPropChanged(this, 'showFooter', this._showFooter, this._showFooter = coercion.coerceBooleanProperty(value));
            },
            enumerable: false,
            configurable: true
        });
        ;
        Object.defineProperty(PblNgridComponent.prototype, "noFiller", {
            /**
             * When true, the filler is disabled.
             */
            get: function () { return this._noFiller; },
            set: function (value) {
                this._noFiller = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        ;
        Object.defineProperty(PblNgridComponent.prototype, "dataSource", {
            /**
             * The grid's source of data
             *
             * @remarks
             * The grid's source of data, which can be provided in 2 ways:
             *
             * - DataSourceOf<T>
             * - PblDataSource<T>
             *
             * The grid only works with `PblDataSource<T>`, `DataSourceOf<T>` is a shortcut for providing
             * the data array directly.
             *
             * `DataSourceOf<T>` can be:
             *
             * - Simple data array (each object represents one grid row)
             * - Promise for a data array
             * - Stream that emits a data array each time the array changes
             *
             * When a `DataSourceOf<T>` is provided it is converted into an instance of `PblDataSource<T>`.
             *
             * To access the `PblDataSource<T>` instance use the `ds` property (readonly).
             *
             * It is highly recommended to use `PblDataSource<T>` directly, the datasource factory makes it easy.
             * For example, when an array is provided the factory is used to convert it to a datasource:
             *
             * ```typescript
             * const collection: T[] = [];
             * const pblDataSource = createDS<T>().onTrigger( () => collection ).create();
             * ```
             *
             * > This is a write-only (setter) property that triggers the `setDataSource` method.
             */
            set: function (value) {
                if (value instanceof i1.PblDataSource) {
                    this.setDataSource(value);
                }
                else {
                    this.setDataSource(i1.createDS().onTrigger(function () { return value || []; }).create());
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblNgridComponent.prototype, "ds", {
            get: function () { return this._dataSource; },
            enumerable: false,
            configurable: true
        });
        ;
        Object.defineProperty(PblNgridComponent.prototype, "usePagination", {
            get: function () { return this._pagination; },
            set: function (value) {
                if (value === '') {
                    value = 'pageNumber';
                }
                if (value !== this._pagination) {
                    this._pagination = value;
                    this._extApi.logicaps.pagination();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblNgridComponent.prototype, "noCachePaginator", {
            get: function () { return this._noCachePaginator; },
            set: function (value) {
                value = coercion.coerceBooleanProperty(value);
                if (this._noCachePaginator !== value) {
                    this._noCachePaginator = value;
                    if (this.ds && this.ds.paginator) {
                        this.ds.paginator.noCacheMode = value;
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblNgridComponent.prototype, "minDataViewHeight", {
            /**
             * The minimum height to assign to the data viewport (where data rows are shown)
             *
             * The data viewport is the scrollable area where all data rows are visible, and some metadata rows might also be there
             * depending on their type (fixed/row/sticky) as well as outer section items.
             *
             * By default, the data viewport has no size and it will grow based on the available space it has left within the container.
             * The container will first assign height to any fixed rows and dynamic content (before/after) provided.
             *
             * If the container height is fixed (e.g. `<pbl-ngrid style="height: 500px"></pbl-ngrid>`) and there is no height left
             * for the data viewport then it will get no height (0 height).
             *
             * To deal with this issue there are 2 options:
             *
             * 1. Do not limit the height of the container
             * 2. Provide a default minimum height for the data viewport
             *
             * Option number 1 is not practical, it will disable all scrolling in the table, making it a long box scrollable by the host container.
             *
             * This is where we use option number 2.
             * By defining a default minimum height we ensure visibility and since there's a scroll there, the user can view all of the data.
             *
             * There are 2 types of inputs:
             *
             * A. Default minimum height in PX
             * B. Default minimum height in ROW COUNT
             *
             * For A, provide a positive value, for B provide a negative value.
             *
             * For example:
             *
             *  - Minimum data viewport of 100 pixels: `<pbl-ngrid minDataViewHeight="100"></pbl-ngrid>`
             *  - Minimum data viewport of 2 ros: `<pbl-ngrid minDataViewHeight="-2"></pbl-ngrid>`
             *
             * Notes when using rows:
             *  - The row height is calculated based on an initial row pre-loaded by the grid, this row will get it's height from the CSS theme defined.
             *  - The ROW COUNT is the lower value between the actual row count provided and the total rows to render.
             *
             * ## Container Overflow:
             *
             * Note that when using a default minimum height, if the minimum height of the data viewport PLUS the height of all other elements in the container EXCEEDS any fixed
             * height assigned to the container, the container will render a scrollbar which results in the possibility of 2 scrollbars, 1 for the container and the seconds
             * for the data viewport, if it has enough data rows.
             */
            get: function () { return this.minDataViewHeight; },
            set: function (value) {
                value = coercion.coerceNumberProperty(value);
                if (this._minDataViewHeight !== value) {
                    this._minDataViewHeight = value;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblNgridComponent.prototype, "fallbackMinHeight", {
            /**
             * @deprecated Will be removed in v5, see `minDataViewHeight`
             */
            get: function () {
                if (typeof ngDevMode === 'undefined' || ngDevMode) {
                    i1.deprecatedWarning('PblNgridComponent.fallbackMinHeight', '4', 'PblNgridComponent.minDataViewHeight');
                }
                return this._minDataViewHeight > 0 ? this._minDataViewHeight : undefined;
            },
            set: function (value) {
                if (typeof ngDevMode === 'undefined' || ngDevMode) {
                    i1.deprecatedWarning('PblNgridComponent.fallbackMinHeight', '4', 'PblNgridComponent.minDataViewHeight');
                }
                this.minDataViewHeight = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblNgridComponent.prototype, "dir", {
            get: function () { return this._dir; },
            enumerable: false,
            configurable: true
        });
        ;
        Object.defineProperty(PblNgridComponent.prototype, "virtualPagingActive", {
            /**
             * When true, the virtual paging feature is enabled because the virtual content size exceed the supported height of the browser so paging is enable.
             */
            get: function () { return this.viewport.virtualPagingActive; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblNgridComponent.prototype, "metaHeaderRows", {
            get: function () { return this._store.metaHeaderRows; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblNgridComponent.prototype, "metaFooterRows", {
            get: function () { return this._store.metaFooterRows; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblNgridComponent.prototype, "metaColumns", {
            get: function () { return this._store.metaColumns; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblNgridComponent.prototype, "columnRowDef", {
            get: function () {
                return {
                    header: this._store.headerColumnDef,
                    footer: this._store.footerColumnDef
                };
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblNgridComponent.prototype, "viewport", {
            get: function () { return this._viewport; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblNgridComponent.prototype, "innerTableMinWidth", {
            get: function () { var _a; return (_a = this._cdkTable) === null || _a === void 0 ? void 0 : _a.minWidth; },
            enumerable: false,
            configurable: true
        });
        PblNgridComponent.prototype.ngAfterContentInit = function () {
            this._extApi.logicaps.bindRegistry();
        };
        PblNgridComponent.prototype.ngAfterViewInit = function () {
            var _this = this;
            this.invalidateColumns();
            Object.defineProperty(this, 'isInit', { value: true });
            this._plugin.emitEvent({ source: 'grid', kind: 'onInit' });
            this._extApi.logicaps.pagination();
            this.contextApi.focusChanged
                .subscribe(function (event) {
                var _a, _b;
                if (event.curr) {
                    (_b = (_a = _this.rowsApi
                        .findDataRowByIdentity(event.curr.rowIdent)) === null || _a === void 0 ? void 0 : _a.getCellById(_this.columnApi.columnIds[event.curr.colIndex])) === null || _b === void 0 ? void 0 : _b.focus();
                }
            });
        };
        PblNgridComponent.prototype.ngOnChanges = function (changes) {
            var _this = this;
            var processColumns = false;
            if (changes.focusMode) {
                this.rowFocus = this.focusMode === 'row' ? 0 : '';
                this.cellFocus = this.focusMode === 'cell' ? 0 : '';
            }
            if (changes.columns && this.isInit) {
                processColumns = true;
            }
            if (processColumns === true) {
                this.invalidateColumns();
                this.ngZone.onStable.pipe(operators.take(1)).subscribe(function () { return _this.rowsApi.syncRows('all', true); });
            }
        };
        PblNgridComponent.prototype.ngOnDestroy = function () {
            var _this = this;
            this._store.dispose();
            var destroy = function () {
                _this._plugin.destroy();
                _this.viewport.detachViewPort();
                i1.unrx.kill(_this);
            };
            var p;
            this._plugin.emitEvent({ source: 'grid', kind: 'onDestroy', wait: function (_p) { return p = _p; } });
            if (p) {
                p.then(destroy).catch(destroy);
            }
            else {
                destroy();
            }
        };
        PblNgridComponent.prototype.trackBy = function (index, item) {
            return index;
        };
        PblNgridComponent.prototype.setSort = function (columnOrAlias, sort, skipUpdate) {
            if (skipUpdate === void 0) { skipUpdate = false; }
            if (!columnOrAlias || typeof columnOrAlias === 'boolean') {
                this.ds.setSort(!!columnOrAlias);
                return;
            }
            var column;
            if (typeof columnOrAlias === 'string') {
                column = this._store.visibleColumns.find(function (c) { return c.alias ? c.alias === columnOrAlias : (c.sort && c.id === columnOrAlias); });
                if (!column && i0.isDevMode()) {
                    console.warn("Could not find column with alias \"" + columnOrAlias + "\".");
                    return;
                }
            }
            else {
                column = columnOrAlias;
            }
            this.ds.setSort(column, sort, skipUpdate);
        };
        PblNgridComponent.prototype.setFilter = function (value, columns) {
            var e_1, _c;
            if (arguments.length > 0) {
                var columnInstances = void 0;
                if (Array.isArray(columns) && typeof columns[0] === 'string') {
                    columnInstances = [];
                    var _loop_1 = function (colId) {
                        var column = this_1._store.visibleColumns.find(function (c) { return c.alias ? c.alias === colId : (c.id === colId); });
                        if (!column && i0.isDevMode()) {
                            console.warn("Could not find column with alias " + colId + " \"" + colId + "\".");
                            return { value: void 0 };
                        }
                        columnInstances.push(column);
                    };
                    var this_1 = this;
                    try {
                        for (var columns_1 = __values(columns), columns_1_1 = columns_1.next(); !columns_1_1.done; columns_1_1 = columns_1.next()) {
                            var colId = columns_1_1.value;
                            var state_1 = _loop_1(colId);
                            if (typeof state_1 === "object")
                                return state_1.value;
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (columns_1_1 && !columns_1_1.done && (_c = columns_1.return)) _c.call(columns_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
                else {
                    columnInstances = columns;
                }
                this.ds.setFilter(value, columnInstances);
            }
            else {
                this.ds.setFilter();
            }
        };
        PblNgridComponent.prototype.setDataSource = function (value) {
            var _this = this;
            if (this._dataSource !== value) {
                // KILL ALL subscriptions for the previous datasource.
                if (this._dataSource) {
                    i1.unrx.kill(this, this._dataSource);
                }
                var prev = this._dataSource;
                this._dataSource = value;
                this._cdkTable.dataSource = value;
                this._extApi.logicaps.pagination();
                this._extApi.logicaps.noData(false);
                if ((prev === null || prev === void 0 ? void 0 : prev.hostGrid) === this) {
                    prev._detachEmitter();
                }
                this._dataSource._attachEmitter(this._plugin);
                this._plugin.emitEvent({
                    source: 'ds',
                    kind: 'onDataSource',
                    prev: prev,
                    curr: value
                });
                // clear the context, new datasource
                this._extApi.contextApi.clear();
                if (value) {
                    if (i0.isDevMode()) {
                        value.onError.pipe(i1.unrx(this, value)).subscribe(console.error.bind(console));
                    }
                    // We register to this event because it fires before the entire data-changing process starts.
                    // This is required because `onRenderDataChanging` is fired async, just before the data is emitted.
                    // Its not enough to clear the context when `setDataSource` is called, we also need to handle `refresh` calls which will not
                    // trigger this method.
                    value.onSourceChanging
                        .pipe(i1.unrx(this, value))
                        .subscribe(function () {
                        if (_this.config.get('table').clearContextOnSourceChanging) {
                            _this._extApi.contextApi.clear();
                        }
                    });
                    // Run CD, scheduled as a micro-task, after each rendering
                    value.onRenderDataChanging
                        .pipe(operators.filter(function (_c) {
                        var event = _c.event;
                        return !event.isInitial && (event.pagination.changed || event.sort.changed || event.filter.changed);
                    }), 
                    // Context between the operations are not supported at the moment
                    // Event for client side operations...
                    // TODO: can we remove this? we clear the context with `onSourceChanging`
                    operators.tap(function () { return !_this._store.primary && _this._extApi.contextApi.clear(); }), operators.switchMap(function () { return value.onRenderedDataChanged.pipe(operators.take(1), operators.mapTo(_this.ds.renderLength)); }), operators.observeOn(rxjs.asapScheduler), i1.unrx(this, value))
                        .subscribe(function (previousRenderLength) {
                        // If the number of rendered items has changed the grid will update the data and run CD on it.
                        // so we only update the rows.
                        if (previousRenderLength === _this.ds.renderLength) {
                            _this.rowsApi.syncRows(true);
                        }
                        else {
                            _this.rowsApi.syncRows('header', true);
                            _this.rowsApi.syncRows('footer', true);
                        }
                    });
                    // Handling no data overlay
                    // Handling fallback minimum height.
                    value.onRenderedDataChanged
                        .pipe(operators.map(function () { return _this.ds.renderLength; }), operators.startWith(null), operators.pairwise(), operators.tap(function (_c) {
                        var _d = __read(_c, 2), prev = _d[0], curr = _d[1];
                        var noDataShowing = !!_this._extApi.logicaps.noData.viewActive;
                        if ((curr > 0 && noDataShowing) || (curr === 0 && !noDataShowing)) {
                            _this._extApi.logicaps.noData();
                        }
                    }), operators.observeOn(rxjs.animationFrameScheduler), // ww want to give the browser time to remove/add rows
                    i1.unrx(this, value))
                        .subscribe(function () {
                        var el = _this.viewport.element;
                        if (_this.ds.renderLength > 0 && _this._minDataViewHeight) {
                            var h = void 0;
                            if (_this._minDataViewHeight > 0) {
                                h = Math.min(_this._minDataViewHeight, _this.viewport.measureRenderedContentSize());
                            }
                            else {
                                var rowHeight = _this.findInitialRowHeight();
                                var rowCount = Math.min(_this.ds.renderLength, _this._minDataViewHeight * -1);
                                h = rowHeight * rowCount;
                            }
                            el.style.minHeight = h + 'px';
                            // We need to trigger CD when not using virtual scroll or else the rows won't show on initial load, only after user interactions
                            if (!_this.viewport.enabled) {
                                _this.rowsApi.syncRows(true);
                            }
                        }
                    });
                }
            }
        };
        /**
         * Invalidates the header, including a full rebuild of column headers
         */
        PblNgridComponent.prototype.invalidateColumns = function () {
            this._plugin.emitEvent({ source: 'grid', kind: 'beforeInvalidateHeaders' });
            this._extApi.contextApi.clear();
            this._store.invalidate(this.columns);
            this._store.attachCustomCellTemplates();
            this._store.attachCustomHeaderCellTemplates();
            this._cdkTable.clearHeaderRowDefs();
            this._cdkTable.clearFooterRowDefs();
            // this.cdr.markForCheck();
            this.cdr.detectChanges();
            // after invalidating the headers we now have optional header/headerGroups/footer rows added
            // we need to update the template with this data which will create new rows (header/footer)
            this.resetHeaderRowDefs();
            this.resetFooterRowDefs();
            this.cdr.markForCheck();
            // Each row will rebuild it's own cells.
            // This will be done in the RowsApi, which listens to `onInvalidateHeaders`
            this._plugin.emitEvent({ source: 'grid', kind: 'onInvalidateHeaders' });
        };
        /**
         * Create an embedded view before or after the user projected content.
         */
        PblNgridComponent.prototype.createView = function (location, templateRef, context, index) {
            var vcRef = this.getInternalVcRef(location);
            var view = vcRef.createEmbeddedView(templateRef, context, index);
            view.detectChanges();
            return view;
        };
        /**
         * Remove an already created embedded view.
         * @param view - The view to remove
         * @param location - The location, if not set defaults to `before`
         * @returns true when a view was removed, false when not. (did not exist in the view container for the provided location)
         */
        PblNgridComponent.prototype.removeView = function (view, location) {
            var vcRef = this.getInternalVcRef(location);
            var idx = vcRef.indexOf(view);
            if (idx === -1) {
                return false;
            }
            else {
                vcRef.remove(idx);
                return true;
            }
        };
        /**
         * Resize all visible columns to fit content of the grid.
         * @param forceFixedWidth - When true will resize all columns with absolute pixel values, otherwise will keep the same format as originally set (% or none)
         */
        PblNgridComponent.prototype.autoSizeColumnToFit = function (options) {
            var _c = this.viewport, innerWidth = _c.innerWidth, outerWidth = _c.outerWidth;
            // calculate auto-size on the width without scroll bar and take box model gaps into account
            // TODO: if no scroll bar exists the calc will not include it, next if more rows are added a scroll bar will appear...
            this.columnApi.autoSizeToFit(outerWidth - (outerWidth - innerWidth), options);
        };
        PblNgridComponent.prototype.findInitialRowHeight = function () {
            var rowElement;
            var row = this.rowsApi.findDataRowByIndex(0);
            if (row) {
                var height = getComputedStyle(row.element).height;
                return parseInt(height, 10);
            }
            else if (this._vcRefBeforeContent) {
                rowElement = this._vcRefBeforeContent.length > 0
                    ? this._vcRefBeforeContent.get(0).rootNodes[0]
                    : this._vcRefBeforeContent.element.nativeElement;
                rowElement = rowElement.previousElementSibling;
                rowElement.style.display = '';
                var height = getComputedStyle(rowElement).height;
                rowElement.style.display = 'none';
                return parseInt(height, 10);
            }
        };
        PblNgridComponent.prototype.addClass = function () {
            var e_2, _c;
            var cls = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                cls[_i] = arguments[_i];
            }
            try {
                for (var cls_1 = __values(cls), cls_1_1 = cls_1.next(); !cls_1_1.done; cls_1_1 = cls_1.next()) {
                    var c = cls_1_1.value;
                    this.elRef.nativeElement.classList.add(c);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (cls_1_1 && !cls_1_1.done && (_c = cls_1.return)) _c.call(cls_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
        };
        PblNgridComponent.prototype.removeClass = function () {
            var e_3, _c;
            var cls = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                cls[_i] = arguments[_i];
            }
            try {
                for (var cls_2 = __values(cls), cls_2_1 = cls_2.next(); !cls_2_1.done; cls_2_1 = cls_2.next()) {
                    var c = cls_2_1.value;
                    this.elRef.nativeElement.classList.remove(c);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (cls_2_1 && !cls_2_1.done && (_c = cls_2.return)) _c.call(cls_2);
                }
                finally { if (e_3) throw e_3.error; }
            }
        };
        PblNgridComponent.prototype.getInternalVcRef = function (location) {
            return location === 'beforeTable'
                ? this._vcRefBeforeTable
                : location === 'beforeContent' ? this._vcRefBeforeContent : this._vcRefAfterContent;
        };
        PblNgridComponent.prototype.resetHeaderRowDefs = function () {
            var e_4, _c;
            if (this._headerRowDefs) {
                // The grid header (main, with column names) is always the last row def (index 0)
                // Because we want it to show last (after custom headers, group headers...) we first need to pull it and then push.
                this._cdkTable.clearHeaderRowDefs();
                var arr = this._headerRowDefs.toArray();
                arr.push(arr.shift());
                try {
                    for (var arr_1 = __values(arr), arr_1_1 = arr_1.next(); !arr_1_1.done; arr_1_1 = arr_1.next()) {
                        var rowDef = arr_1_1.value;
                        this._cdkTable.addHeaderRowDef(rowDef);
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (arr_1_1 && !arr_1_1.done && (_c = arr_1.return)) _c.call(arr_1);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
            }
        };
        PblNgridComponent.prototype.resetFooterRowDefs = function () {
            var e_5, _c;
            if (this._footerRowDefs) {
                this._cdkTable.clearFooterRowDefs();
                try {
                    for (var _d = __values(this._footerRowDefs.toArray()), _e = _d.next(); !_e.done; _e = _d.next()) {
                        var rowDef = _e.value;
                        this._cdkTable.addFooterRowDef(rowDef);
                    }
                }
                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                finally {
                    try {
                        if (_e && !_e.done && (_c = _d.return)) _c.call(_d);
                    }
                    finally { if (e_5) throw e_5.error; }
                }
            }
        };
        return PblNgridComponent;
    }());
    /** @nocollapse */ PblNgridComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridComponent, deps: [{ token: i0__namespace.Injector }, { token: i0__namespace.ViewContainerRef }, { token: i0__namespace.ElementRef }, { token: i0__namespace.NgZone }, { token: i0__namespace.ChangeDetectorRef }, { token: i1__namespace$2.PblNgridConfigService }, { token: PblNgridRegistryService }, { token: 'id', attribute: true }, { token: i1__namespace$1.Directionality, optional: true }], target: i0__namespace.ɵɵFactoryTarget.Component });
    /** @nocollapse */ PblNgridComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridComponent, selector: "pbl-ngrid", inputs: { showHeader: "showHeader", showFooter: "showFooter", noFiller: "noFiller", focusMode: "focusMode", dataSource: "dataSource", usePagination: "usePagination", noCachePaginator: "noCachePaginator", columns: "columns", rowClassUpdate: "rowClassUpdate", rowClassUpdateFreq: "rowClassUpdateFreq", minDataViewHeight: "minDataViewHeight", fallbackMinHeight: "fallbackMinHeight" }, providers: [
            { provide: PBL_NGRID_COMPONENT, useExisting: PblNgridComponent },
            PblNgridRegistryService,
            {
                provide: PblNgridPluginController,
                useFactory: pluginControllerFactory,
                deps: [i0.forwardRef((function () { return PblNgridComponent; }))],
            },
            {
                provide: EXT_API_TOKEN,
                useFactory: internalApiFactory,
                deps: [i0.forwardRef((function () { return PblNgridComponent; }))],
            },
            {
                provide: PblNgridMetaRowService,
                useFactory: metaRowServiceFactory,
                deps: [i0.forwardRef((function () { return PblNgridComponent; }))],
            }
        ], viewQueries: [{ propertyName: "_vcRefBeforeTable", first: true, predicate: ["beforeTable"], descendants: true, read: i0.ViewContainerRef, static: true }, { propertyName: "_vcRefBeforeContent", first: true, predicate: ["beforeContent"], descendants: true, read: i0.ViewContainerRef, static: true }, { propertyName: "_vcRefAfterContent", first: true, predicate: ["afterContent"], descendants: true, read: i0.ViewContainerRef, static: true }, { propertyName: "_fbTableCell", first: true, predicate: ["fbTableCell"], descendants: true, read: i0.TemplateRef, static: true }, { propertyName: "_fbHeaderCell", first: true, predicate: ["fbHeaderCell"], descendants: true, read: i0.TemplateRef, static: true }, { propertyName: "_fbFooterCell", first: true, predicate: ["fbFooterCell"], descendants: true, read: i0.TemplateRef, static: true }, { propertyName: "_tableRowDef", first: true, predicate: i4.CdkRowDef, descendants: true, static: true }, { propertyName: "_headerRowDefs", predicate: i4.CdkHeaderRowDef, descendants: true }, { propertyName: "_footerRowDefs", predicate: i4.CdkFooterRowDef, descendants: true }], usesOnChanges: true, ngImport: i0__namespace, template: "<!-- GRID HEADER ROW DEF - THE MAIN HEADER OF THE GRID -->\n<pbl-ngrid-column-row *cdkHeaderRowDef=\"[]; sticky: columnRowDef.header?.type === 'sticky'\"\n                      [row]=\"columnRowDef.header\"\n                      class=\"pbl-ngrid-header-row-main\"></pbl-ngrid-column-row>\n\n<!-- DUPLICATE HEADER FOR THE MAIN HEADER, NEVER SEEN (NOT VISUAL), USED FOR RESIZING -->\n<pbl-ngrid-column-row *cdkHeaderRowDef=\"[];\"\n                      [row]=\"columnRowDef.header\"\n                      gridWidthRow\n                      style=\"visibility: hidden !important;\"\n                      class=\"pbl-ngrid-row-visually-hidden\"></pbl-ngrid-column-row>\n\n<!-- MULTI-HEADER ROW DEF & MULTI-HEADER GROUP ROW DEFINITION TEMPLATES -->\n<ng-container *ngFor=\"let row of metaHeaderRows;\">\n  <pbl-ngrid-meta-row *cdkHeaderRowDef=\"[]; sticky: row.rowDef.type === 'sticky'\" [row]=\"row\"></pbl-ngrid-meta-row>\n</ng-container>\n\n<!-- GRID FOOTER ROW DEF -->\n<pbl-ngrid-column-row *cdkFooterRowDef=\"[]; sticky: columnRowDef.footer?.type === 'sticky'\"\n                      footer [row]=\"columnRowDef.footer\"></pbl-ngrid-column-row>\n<!-- GRID FOOTER ROW DEF -->\n<!-- MULTI-FOOTER ROW DEF -->\n<ng-container *ngFor=\"let row of metaFooterRows;\">\n  <pbl-ngrid-meta-row footer *cdkFooterRowDef=\"[]; sticky: row.rowDef.type === 'sticky'\" [row]=\"row\"></pbl-ngrid-meta-row>\n</ng-container>\n\n<div class=\"pbl-ngrid-container\">\n  <ng-container #beforeTable></ng-container>\n  <div pbl-ngrid-fixed-meta-row-container=\"header\"></div>\n  <pbl-cdk-virtual-scroll-viewport class=\"pbl-ngrid-scroll-container\"\n                                   [stickyRowHeaderContainer]=\"stickyRowHeaderContainer\" [stickyRowFooterContainer]=\"stickyRowFooterContainer\">\n    <pbl-cdk-table tabindex=\"-1\">\n      <!-- Row templates. The columns used are set at the row template level -->\n\n      <!-- GRID RECORD ROW DEFINITION TEMPLATES -->\n      <!-- We dont need columns because we implement them internally -->\n      <pbl-ngrid-row *pblNgridRowDef=\"let row;\" row></pbl-ngrid-row>\n      <!-- GRID RECORD ROW DEFINITION TEMPLATES -->\n    </pbl-cdk-table>\n  </pbl-cdk-virtual-scroll-viewport>\n  <div pbl-ngrid-fixed-meta-row-container=\"footer\"></div>\n\n  <ng-container #beforeContent>\n    <!-- This dummy row is used to extract an initial row height -->\n    <div role=\"row\" row=\"\" class=\"pbl-ngrid-row cdk-row\" style=\"display: none;\"></div>\n  </ng-container>\n  <ng-content></ng-content>\n  <ng-container #afterContent></ng-container>\n\n  <!-- Placeholder for header/footer scroll containers that will get populated with header/meta roles when the following conditions are met:\n       - Virtual scrolling is enabled\n       - Rows are rendered in the viewport\n       - Container is scrolling\n\n       The placeholder is fixed so the browsers does not use sticky positioning while scrolling, which takes the rows out of view while scrolling.\n       While scrolling the rows are moved into this placeholder and when scrolling ends they return to their original positioning.\n\n       The actual rows are added into the internal div, within the placeholder.\n       The top container get the proper width and the internal header gets the scroll offset (horizontal) that matches the current offset.\n       This has an effect only when scrolling with the wheel within a long scrolling session.\n\n       Implementation is in the virtual scroll viewport (more precisely in `PblVirtualScrollForOf`)\n  -->\n  <div #stickyRowHeaderContainer class=\"pbl-ngrid-sticky-row-scroll-container\"><div [style.minWidth.px]=\"innerTableMinWidth\"></div></div> <!-- HEADERS -->\n  <div #stickyRowFooterContainer class=\"pbl-ngrid-sticky-row-scroll-container\"><div [style.minWidth.px]=\"innerTableMinWidth\"></div></div> <!-- FOOTERS -->\n</div>\n\n<ng-template #fbTableCell let-value=\"value\"><div>{{value}}</div></ng-template>\n<ng-template #fbHeaderCell let-column=\"col\"><div>{{column.label}}</div></ng-template>\n<ng-template #fbFooterCell let-column=\"col\"><div>{{column.label}}</div></ng-template>\n", components: [{ type: PblNgridColumnRowComponent, selector: "pbl-ngrid-column-row", inputs: ["row"] }, { type: PblNgridMetaRowComponent, selector: "pbl-ngrid-meta-row", inputs: ["row"] }, { type: PblNgridMetaRowContainerComponent, selector: "div[pbl-ngrid-fixed-meta-row-container]", inputs: ["pbl-ngrid-fixed-meta-row-container"] }, { type: PblCdkVirtualScrollViewportComponent, selector: "pbl-cdk-virtual-scroll-viewport", inputs: ["stickyRowHeaderContainer", "stickyRowFooterContainer"], outputs: ["scrolling", "scrollFrameRate"] }, { type: PblCdkTableComponent, selector: "pbl-cdk-table", exportAs: ["pblCdkTable"] }, { type: PblNgridRowComponent, selector: "pbl-ngrid-row[row]", exportAs: ["pblNgridRow"] }], directives: [{ type: i4__namespace.CdkHeaderRowDef, selector: "[cdkHeaderRowDef]", inputs: ["cdkHeaderRowDef", "cdkHeaderRowDefSticky"] }, { type: i1__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i4__namespace.CdkFooterRowDef, selector: "[cdkFooterRowDef]", inputs: ["cdkFooterRowDef", "cdkFooterRowDefSticky"] }, { type: PblNgridRowDef, selector: "[pblNgridRowDef]", inputs: ["pblNgridRowDefColumns", "pblNgridRowDefWhen"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'pbl-ngrid',
                        templateUrl: './ngrid.component.html',
                        providers: [
                            { provide: PBL_NGRID_COMPONENT, useExisting: PblNgridComponent },
                            PblNgridRegistryService,
                            {
                                provide: PblNgridPluginController,
                                useFactory: pluginControllerFactory,
                                deps: [i0.forwardRef((function () { return PblNgridComponent; }))],
                            },
                            {
                                provide: EXT_API_TOKEN,
                                useFactory: internalApiFactory,
                                deps: [i0.forwardRef((function () { return PblNgridComponent; }))],
                            },
                            {
                                provide: PblNgridMetaRowService,
                                useFactory: metaRowServiceFactory,
                                deps: [i0.forwardRef((function () { return PblNgridComponent; }))],
                            }
                        ],
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                    }]
            }], ctorParameters: function () {
            return [{ type: i0__namespace.Injector }, { type: i0__namespace.ViewContainerRef }, { type: i0__namespace.ElementRef }, { type: i0__namespace.NgZone }, { type: i0__namespace.ChangeDetectorRef }, { type: i1__namespace$2.PblNgridConfigService }, { type: PblNgridRegistryService }, { type: undefined, decorators: [{
                            type: i0.Attribute,
                            args: ['id']
                        }] }, { type: i1__namespace$1.Directionality, decorators: [{
                            type: i0.Optional
                        }] }];
        }, propDecorators: { showHeader: [{
                    type: i0.Input
                }], showFooter: [{
                    type: i0.Input
                }], noFiller: [{
                    type: i0.Input
                }], focusMode: [{
                    type: i0.Input
                }], dataSource: [{
                    type: i0.Input
                }], usePagination: [{
                    type: i0.Input
                }], noCachePaginator: [{
                    type: i0.Input
                }], columns: [{
                    type: i0.Input
                }], rowClassUpdate: [{
                    type: i0.Input
                }], rowClassUpdateFreq: [{
                    type: i0.Input
                }], minDataViewHeight: [{
                    type: i0.Input
                }], fallbackMinHeight: [{
                    type: i0.Input
                }], _vcRefBeforeTable: [{
                    type: i0.ViewChild,
                    args: ['beforeTable', { read: i0.ViewContainerRef, static: true }]
                }], _vcRefBeforeContent: [{
                    type: i0.ViewChild,
                    args: ['beforeContent', { read: i0.ViewContainerRef, static: true }]
                }], _vcRefAfterContent: [{
                    type: i0.ViewChild,
                    args: ['afterContent', { read: i0.ViewContainerRef, static: true }]
                }], _fbTableCell: [{
                    type: i0.ViewChild,
                    args: ['fbTableCell', { read: i0.TemplateRef, static: true }]
                }], _fbHeaderCell: [{
                    type: i0.ViewChild,
                    args: ['fbHeaderCell', { read: i0.TemplateRef, static: true }]
                }], _fbFooterCell: [{
                    type: i0.ViewChild,
                    args: ['fbFooterCell', { read: i0.TemplateRef, static: true }]
                }], _tableRowDef: [{
                    type: i0.ViewChild,
                    args: [i4.CdkRowDef, { static: true }]
                }], _headerRowDefs: [{
                    type: i0.ViewChildren,
                    args: [i4.CdkHeaderRowDef]
                }], _footerRowDefs: [{
                    type: i0.ViewChildren,
                    args: [i4.CdkFooterRowDef]
                }] } });

    // tslint:disable:use-host-property-decorator
    /**
     * A directive that marks the template as a projected section inside the grid.
     * The location of the project content is set by the position input.
     *
     * Note that this directive can only be set as the content inside the grid.
     */
    var PblNgridOuterSectionDirective = /** @class */ (function () {
        function PblNgridOuterSectionDirective(grid, tRef) {
            this.grid = grid;
            this.tRef = tRef;
        }
        PblNgridOuterSectionDirective.prototype.ngAfterViewInit = function () {
            this.grid.createView(this.position === 'bottom' ? 'beforeContent' : 'beforeTable', this.tRef);
        };
        return PblNgridOuterSectionDirective;
    }());
    /** @nocollapse */ PblNgridOuterSectionDirective.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridOuterSectionDirective, deps: [{ token: PblNgridComponent }, { token: i0__namespace.TemplateRef }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ PblNgridOuterSectionDirective.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridOuterSectionDirective, selector: "[pblNgridOuterSection]", inputs: { position: ["pblNgridOuterSection", "position"] }, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridOuterSectionDirective, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[pblNgridOuterSection]',
                        inputs: ['position:pblNgridOuterSection'] // tslint:disable-line:use-input-property-decorator
                    }]
            }], ctorParameters: function () { return [{ type: PblNgridComponent }, { type: i0__namespace.TemplateRef }]; } });

    var noop = function () { };
    var NoVirtualScrollStrategy = /** @class */ (function () {
        function NoVirtualScrollStrategy() {
            this.attachExtApi = noop;
            this.attach = noop;
            this.detach = noop;
            this.onContentScrolled = noop;
            this.onDataLengthChanged = noop;
            this.onContentRendered = noop;
            this.onRenderedOffsetChanged = noop;
            this.scrollToIndex = noop;
        }
        Object.defineProperty(NoVirtualScrollStrategy.prototype, "type", {
            get: function () { return 'vScrollNone'; },
            enumerable: false,
            configurable: true
        });
        return NoVirtualScrollStrategy;
    }());

    var SizeGroup = /** @class */ (function () {
        function SizeGroup(groupIndex, maxItems) {
            this.groupIndex = groupIndex;
            this.maxItems = maxItems;
            this.rawTotal = 0;
            this.length = 0;
            this.items = [];
            this.dsStart = groupIndex * maxItems;
            this.dsEnd = this.dsStart + maxItems - 1;
        }
        SizeGroup.prototype.set = function (dsIndex, height) {
            var index = dsIndex - this.dsStart;
            var prev = this.items[index];
            this.items[index] = height;
            this.rawTotal += height - (prev || 0);
            if (!prev && height) {
                this.length += 1;
            }
        };
        SizeGroup.prototype.remove = function (dsIndex) {
            var index = dsIndex - this.dsStart;
            var prev = this.items[index];
            if (prev) {
                this.rawTotal -= prev;
                this.items[index] = undefined;
                this.length -= 1;
                return true;
            }
            return false;
        };
        SizeGroup.prototype.has = function (dsIndex) {
            var index = dsIndex - this.dsStart;
            return !!this.items[index];
        };
        SizeGroup.prototype.clear = function () {
            this.rawTotal = this.length = 0;
            this.items = [];
        };
        SizeGroup.prototype.getItemSize = function (dsIndex) {
            var index = dsIndex - this.dsStart;
            return this.items[index];
        };
        SizeGroup.prototype.getSizeBefore = function (dsIndex, itemSize) {
            var index = dsIndex - this.dsStart;
            var total = index * itemSize;
            for (var i = 0; i < index; i++) {
                var size = this.items[i];
                if (size) {
                    total += size - itemSize;
                }
            }
            return total;
        };
        SizeGroup.prototype.getSize = function (itemSize) {
            return (itemSize * (this.maxItems - this.length)) + this.rawTotal;
        };
        SizeGroup.prototype.getSubSize = function (dsIndexStart, dsIndexEnd, itemSize) {
            var indexStart = Math.max(dsIndexStart, this.dsStart) - this.dsStart;
            var indexEnd = this.maxItems - (this.dsEnd - Math.min(dsIndexEnd, this.dsEnd)) - 1;
            var total = 0;
            for (var i = indexStart; i <= indexEnd; i++) {
                total += this.items[i] || itemSize;
            }
            return total;
        };
        SizeGroup.prototype.getSizeAfter = function (dsIndex, itemSize) {
            var index = this.dsEnd - dsIndex;
            var total = index * itemSize;
            for (var i = (this.maxItems - index); i < this.maxItems; i++) {
                var size = this.items[i];
                if (size) {
                    total += size - itemSize;
                }
            }
            return total;
        };
        SizeGroup.prototype.getRawDiffSize = function (itemSize) {
            return this.rawTotal - itemSize - this.length;
        };
        return SizeGroup;
    }());

    var SizeGroupCollection = /** @class */ (function () {
        function SizeGroupCollection() {
            this._groups = [];
        }
        Object.defineProperty(SizeGroupCollection.prototype, "collection", {
            get: function () { return this._groups; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SizeGroupCollection.prototype, "length", {
            get: function () { return this._groups.length; },
            enumerable: false,
            configurable: true
        });
        SizeGroupCollection.prototype.set = function (group) {
            var groupIndex = group.groupIndex;
            var index = this.findGroupIndexIndex(groupIndex, true);
            if (index === -1) {
                this._groups.push(group);
            }
            else {
                var closestGroup = this._groups[index];
                if (closestGroup.groupIndex === groupIndex) {
                    this._groups[groupIndex] = group;
                }
                else if (closestGroup.groupIndex < groupIndex) {
                    this._groups.splice(index + 1, 0, group);
                }
                else {
                    this._groups.splice(index, 0, group);
                }
            }
        };
        SizeGroupCollection.prototype.remove = function (groupIndex) {
            var index = this.findGroupIndexIndex(groupIndex);
            if (index > -1) {
                this._groups.splice(index, 1);
                return true;
            }
            return false;
        };
        SizeGroupCollection.prototype.get = function (groupIndex) {
            return this._groups[this.findGroupIndexIndex(groupIndex)];
        };
        SizeGroupCollection.prototype.has = function (groupIndex) {
            return this.findGroupIndexIndex(groupIndex) > -1;
        };
        SizeGroupCollection.prototype.clear = function () {
            this._groups = [];
        };
        SizeGroupCollection.prototype.findGroupIndexIndex = function (groupIndex, matchClosest) {
            var start = 0;
            var end = this._groups.length - 1;
            var mid = -1;
            while (start <= end) {
                mid = Math.floor((start + end) / 2);
                if (this._groups[mid].groupIndex === groupIndex) {
                    return mid;
                }
                else if (this._groups[mid].groupIndex < groupIndex) {
                    start = mid + 1;
                }
                else {
                    end = mid - 1;
                }
            }
            return matchClosest ? mid : -1;
        };
        return SizeGroupCollection;
    }());

    var Sizer = /** @class */ (function () {
        function Sizer(groupSize) {
            this.groupSize = 50;
            this.groups = new SizeGroupCollection();
            if (groupSize > 0) {
                this.groupSize = groupSize;
            }
        }
        Sizer.prototype.clear = function () {
            this.groups.clear();
        };
        Sizer.prototype.setSize = function (dsIndex, height) {
            var groupIndex = this.getGroupIndex(dsIndex);
            if (height === this.itemSize) {
                var group = this.groups.get(groupIndex);
                if (group) {
                    group.remove(dsIndex);
                    if (group.length === 0) {
                        this.groups.remove(groupIndex);
                    }
                }
            }
            else {
                var group = this.groups.get(groupIndex);
                if (!group) {
                    group = new SizeGroup(groupIndex, this.groupSize);
                    this.groups.set(group);
                }
                group.set(dsIndex, height);
            }
        };
        Sizer.prototype.getTotalContentSize = function () {
            var e_1, _b;
            var itemSize = this.itemSize;
            var total = this.itemsLength * itemSize;
            try {
                for (var _c = __values(this.groups.collection), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var g = _d.value;
                    total += g.getRawDiffSize(itemSize);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return total;
        };
        Sizer.prototype.getSizeForItem = function (dsIndex) {
            var _a;
            var groupIndex = this.getGroupIndex(dsIndex);
            return ((_a = this.groups.get(groupIndex)) === null || _a === void 0 ? void 0 : _a.getItemSize(dsIndex)) || this.itemSize;
        };
        Sizer.prototype.getSizeBefore = function (dsIndex) {
            var e_2, _b;
            var itemSize = this.itemSize;
            // We want all items before `dsIndex`
            // If dsIndex is 0 we want nothing
            // If dsIndex is 1 we want only 0 so `dsIndex` is also the "count" here.
            var total = dsIndex * itemSize;
            try {
                for (var _c = __values(this.groups.collection), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var g = _d.value;
                    if (g.dsStart < dsIndex) {
                        if (g.dsEnd > dsIndex) {
                            total += g.getSizeBefore(dsIndex, itemSize) - itemSize * (dsIndex - g.dsStart);
                        }
                        else {
                            total += g.getRawDiffSize(itemSize);
                        }
                    }
                    else {
                        break;
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return total;
        };
        Sizer.prototype.getSizeForRange = function (dsIndexStart, dsIndexEnd) {
            var groupSize = this.groupSize;
            var itemSize = this.itemSize;
            var total = 0;
            var startGroupIndex = this.getGroupIndex(dsIndexStart);
            var endGroupIndex = this.getGroupIndex(dsIndexEnd);
            var startGroup = this.groups.get(startGroupIndex);
            if (startGroupIndex === endGroupIndex) {
                if (startGroup) {
                    total += startGroup.getSubSize(dsIndexStart, dsIndexEnd, itemSize);
                }
                else {
                    total += (dsIndexEnd - dsIndexStart + 1) * itemSize;
                }
            }
            else {
                for (var i = startGroupIndex + 1; i < endGroupIndex; i++) {
                    var g = this.groups.get(i);
                    total += g ? g.getSize(itemSize) : itemSize * groupSize;
                }
                if (startGroup) {
                    total += startGroup.getSizeAfter(dsIndexStart - 1, itemSize);
                }
                else {
                    total += ((startGroupIndex + 1) * groupSize - dsIndexStart + 1) * itemSize;
                }
                var endGroup = this.groups.get(endGroupIndex);
                if (endGroup) {
                    total += endGroup.getSizeBefore(dsIndexEnd + 1, itemSize);
                }
                else {
                    total += (dsIndexEnd - (endGroupIndex * groupSize) + 1) * itemSize;
                }
            }
            return total;
        };
        Sizer.prototype.getSizeAfter = function (dsIndex) {
            var itemSize = this.itemSize;
            var groups = this.groups.collection;
            var total = (this.itemsLength - dsIndex - 1) * itemSize;
            for (var i = groups.length - 1; i > -1; i--) {
                var g = groups[i];
                if (g.dsEnd > dsIndex) {
                    if (g.dsStart > dsIndex) {
                        total += g.getRawDiffSize(itemSize);
                    }
                    else {
                        total += g.getSizeAfter(dsIndex, itemSize) - itemSize * (g.dsEnd - dsIndex);
                    }
                }
                else {
                    break;
                }
            }
            return total;
        };
        Sizer.prototype.findRenderItemAtOffset = function (offset) {
            var _b = this, itemSize = _b.itemSize, groupSize = _b.groupSize;
            var maxGroupIndex = this.getGroupIndex(this.itemsLength);
            var firstVisibleIndex = Math.floor(offset / itemSize);
            var groupIndex = this.getGroupIndex(firstVisibleIndex);
            var groupStartPos = this.getSizeBefore(groupSize * groupIndex);
            while (true) {
                if (groupStartPos < offset) {
                    if (groupIndex >= maxGroupIndex) {
                        groupIndex = maxGroupIndex;
                        break;
                    }
                    groupIndex += 1;
                    groupStartPos += this.getSizeForRange(groupSize * groupIndex, groupSize * (groupIndex + 1) - 1);
                    if (groupStartPos >= offset) {
                        groupStartPos -= this.getSizeForRange(groupSize * groupIndex, groupSize * (groupIndex + 1) - 1);
                        groupIndex -= 1;
                        break;
                    }
                }
                else if (groupStartPos > offset) {
                    if (groupIndex <= 0) {
                        groupIndex = 0;
                        break;
                    }
                    groupIndex -= 1;
                    groupStartPos -= this.getSizeForRange(groupSize * groupIndex, groupSize * (groupIndex + 1) - 1);
                    if (groupStartPos <= offset) {
                        break;
                    }
                }
                else {
                    break;
                }
            }
            var index = groupSize * groupIndex;
            var group = this.groups.get(groupIndex);
            if (!group) {
                while (groupStartPos < offset) {
                    groupStartPos += itemSize;
                    index += 1;
                }
            }
            else {
                while (groupStartPos < offset) {
                    groupStartPos += group.getItemSize(index) || itemSize;
                    index += 1;
                }
            }
            return index;
        };
        Sizer.prototype.getGroupIndex = function (dsIndex) {
            return Math.floor(dsIndex / this.groupSize);
        };
        return Sizer;
    }());

    var PblNgridDynamicVirtualScrollStrategy = /** @class */ (function () {
        /**
         * @param itemSize The size of the items in the virtually scrolling list.
         * @param minBufferPx The minimum amount of buffer (in pixels) before needing to render more
         * @param maxBufferPx The amount of buffer (in pixels) to render when rendering more.
         */
        function PblNgridDynamicVirtualScrollStrategy(itemSize, minBufferPx, maxBufferPx) {
            this.type = 'vScrollDynamic';
            this._scrolledIndexChange = new rxjs.Subject();
            /** @docs-private Implemented as part of VirtualScrollStrategy. */
            this.scrolledIndexChange = this._scrolledIndexChange.pipe(operators.distinctUntilChanged());
            /** The attached viewport. */
            this._viewport = null;
            this._lastExcessHeight = 0;
            this.sizer = new Sizer();
            this.sizer.itemSize = itemSize;
            this._minBufferPx = minBufferPx;
            this._maxBufferPx = maxBufferPx;
        }
        /**
         * Update the item size and buffer size.
         * @param itemSize The size of the items in the virtually scrolling list.
         * @param minBufferPx The minimum amount of buffer (in pixels) before needing to render more
         * @param maxBufferPx The amount of buffer (in pixels) to render when rendering more.
         */
        PblNgridDynamicVirtualScrollStrategy.prototype.updateItemAndBufferSize = function (itemSize, minBufferPx, maxBufferPx) {
            if (maxBufferPx < minBufferPx && (typeof ngDevMode === 'undefined' || ngDevMode)) {
                throw Error('CDK virtual scroll: maxBufferPx must be greater than or equal to minBufferPx');
            }
            this.sizer.itemSize = itemSize;
            this._minBufferPx = minBufferPx;
            this._maxBufferPx = maxBufferPx;
            this._updateTotalContentSize();
            this._updateRenderedRange();
        };
        PblNgridDynamicVirtualScrollStrategy.prototype.attachExtApi = function (extApi) {
            var _this = this;
            this.extApi = extApi;
            this.extApi.events
                .subscribe(function (event) {
                if (event.kind === 'onDataSource') {
                    _this.onDatasource(event.curr, event.prev);
                }
            });
            if (this.extApi.grid.ds) {
                this.onDatasource(this.extApi.grid.ds);
            }
        };
        PblNgridDynamicVirtualScrollStrategy.prototype.attach = function (viewport) {
            if (!this.extApi) {
                if (typeof ngDevMode === 'undefined' || ngDevMode) {
                    throw new Error('Invalid use of attach, you must first attach `PblNgridExtensionApi`');
                }
            }
            this._viewport = viewport;
            this._updateSizeAndRange();
        };
        PblNgridDynamicVirtualScrollStrategy.prototype.detach = function () {
            this._scrolledIndexChange.complete();
            this._viewport = null;
        };
        PblNgridDynamicVirtualScrollStrategy.prototype.onContentScrolled = function () {
            this._updateRenderedRange();
        };
        PblNgridDynamicVirtualScrollStrategy.prototype.onDataLengthChanged = function () {
            this.sizer.itemsLength = this._viewport.getDataLength();
            this._updateSizeAndRange();
        };
        PblNgridDynamicVirtualScrollStrategy.prototype.onContentRendered = function () {
            this._checkRenderedContentSize();
        };
        PblNgridDynamicVirtualScrollStrategy.prototype.onRenderedOffsetChanged = function () {
            if (this._viewport) {
                this._lastRenderedContentOffset = this._viewport.getOffsetToRenderedContentStart();
            }
        };
        /**
         * Scroll to the offset for the given index.
         * @param index The index of the element to scroll to.
         * @param behavior The ScrollBehavior to use when scrolling.
         */
        PblNgridDynamicVirtualScrollStrategy.prototype.scrollToIndex = function (index, behavior) {
            if (this._viewport) {
                this._viewport.scrollToOffset(this.sizer.getSizeBefore(index), behavior);
            }
        };
        PblNgridDynamicVirtualScrollStrategy.prototype.onDatasource = function (curr, prev) {
            var _this = this;
            if (prev) {
                i1.unrx.kill(this, prev);
            }
            if (curr) {
                curr.onSourceChanging
                    .pipe(i1.unrx(this, curr))
                    .subscribe(function () {
                    _this.sizer.clear();
                });
            }
        };
        PblNgridDynamicVirtualScrollStrategy.prototype._updateSizeAndRange = function () {
            this._updateTotalContentSize();
            this._updateRenderedRange(true);
        };
        /** Update the viewport's total content size. */
        PblNgridDynamicVirtualScrollStrategy.prototype._updateTotalContentSize = function () {
            var e_1, _a;
            if (!this._viewport) {
                return;
            }
            try {
                for (var _b = __values(this.extApi.rowsApi.dataRows()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var row = _c.value;
                    if (row.context) {
                        this.sizer.setSize(row.context.dsIndex, row.height);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this._viewport.setTotalContentSize(this.sizer.getTotalContentSize());
        };
        PblNgridDynamicVirtualScrollStrategy.prototype._checkRenderedContentSize = function () {
            this._updateTotalContentSize();
        };
        /** Update the viewport's rendered range. */
        PblNgridDynamicVirtualScrollStrategy.prototype._updateRenderedRange = function (skipSizeSync) {
            if (!this._viewport) {
                return;
            }
            var renderedRange = this._viewport.getRenderedRange();
            // if (!skipSizeSync) {
            //   for (let i = renderedRange.start; i <= renderedRange.end; i++) {
            //     this.sizer.setSize(i, this.extApi.rowsApi.findDataRowByDsIndex(i)?.height ?? this.sizer.itemSize);
            //   }
            // }
            var newRange = { start: renderedRange.start, end: renderedRange.end };
            var viewportSize = this._viewport.getViewportSize();
            var dataLength = this._viewport.getDataLength();
            var scrollOffset = this._viewport.measureScrollOffset();
            var firstVisibleIndex = this.sizer.findRenderItemAtOffset(scrollOffset);
            var excessHeight = 0;
            // When user scrolls to the top, rows change context, sometimes new rows are added etc.
            // With dynamic size, rows with additional size payload will cause the scroll offset to change because they are added
            // before the visible rows, this will throw the entire scroll out of sync.
            // To solve this we use a 2 step process.
            // 1) For each `_updateRenderRange` cycle of scrolling to the TOP, we sum up excess all height and save them.
            // 2) If we had excess height it will create a scroll change which will lead us back here. Now we check if we
            // have previously saved access height, if so we reduce the scroll offset back to what it was supposed to be, like adding the height did not effect the offset.
            // Since the first step causes a scroll offset flicker, the grid will jump forward and show rows not in the range we want, if we just move back on the 2nd tick
            // it will cause a flicker in the grid. To prevent it we compensate by pushing in the 1st tick, the rendered content offset forward to match the offset change.
            // In the second tick we revet it and restore the offset.
            if (this._lastExcessHeight) {
                var lastExcessHeight = this._lastExcessHeight;
                this._lastExcessHeight = 0;
                this._viewport.setRenderedContentOffset(this._lastRenderedContentOffset - lastExcessHeight);
                this._viewport.scrollToOffset(scrollOffset - lastExcessHeight);
                return;
            }
            // If user scrolls to the bottom of the list and data changes to a smaller list
            if (newRange.end > dataLength) {
                // We have to recalculate the first visible index based on new data length and viewport size.
                var spaceToFill = viewportSize;
                var expandEnd = firstVisibleIndex;
                while (spaceToFill > 0) {
                    spaceToFill -= this.sizer.getSizeForItem(++expandEnd);
                }
                var maxVisibleItems = expandEnd - firstVisibleIndex;
                var newVisibleIndex = Math.max(0, Math.min(firstVisibleIndex, dataLength - maxVisibleItems));
                // If first visible index changed we must update scroll offset to handle start/end buffers
                // Current range must also be adjusted to cover the new position (bottom of new list).
                if (firstVisibleIndex !== newVisibleIndex) {
                    firstVisibleIndex = newVisibleIndex;
                    scrollOffset = this.sizer.getSizeBefore(firstVisibleIndex);
                    newRange.start = firstVisibleIndex;
                }
                newRange.end = Math.max(0, Math.min(dataLength, newRange.start + maxVisibleItems));
            }
            var contentOffset = this.sizer.getSizeBefore(newRange.start);
            var currentStartBuffer = scrollOffset - contentOffset;
            if (currentStartBuffer < this._minBufferPx && newRange.start !== 0) {
                var spaceToFill = this._maxBufferPx - currentStartBuffer;
                if (spaceToFill < 0) {
                    spaceToFill = Math.abs(spaceToFill) + this._maxBufferPx;
                }
                var expandStart = newRange.start;
                while (spaceToFill > 0) {
                    var newSize = this.sizer.getSizeForItem(--expandStart);
                    spaceToFill -= newSize;
                    excessHeight += newSize - this.sizer.itemSize;
                }
                expandStart = Math.max(0, expandStart);
                if (expandStart !== newRange.start) {
                    newRange.start = expandStart;
                    contentOffset = this.sizer.getSizeBefore(expandStart);
                }
                spaceToFill = viewportSize + this._minBufferPx;
                var expandEnd = firstVisibleIndex;
                while (spaceToFill > 0) {
                    spaceToFill -= this.sizer.getSizeForItem(++expandEnd);
                }
                newRange.end = Math.min(dataLength, expandEnd);
            }
            else {
                var renderDataEnd = contentOffset + this.sizer.getSizeForRange(newRange.start, newRange.end);
                var currentEndBuffer = renderDataEnd - (scrollOffset + viewportSize);
                if (currentEndBuffer < this._minBufferPx && newRange.end !== dataLength) {
                    var spaceToFill = this._maxBufferPx - currentEndBuffer;
                    if (spaceToFill < 0) {
                        spaceToFill = Math.abs(spaceToFill) + this._maxBufferPx;
                    }
                    var expandEnd = newRange.end;
                    while (spaceToFill > 0) {
                        spaceToFill -= this.sizer.getSizeForItem(++expandEnd);
                    }
                    if (expandEnd > 0) {
                        newRange.end = Math.min(dataLength, expandEnd);
                        spaceToFill = this._minBufferPx;
                        var expandStart = firstVisibleIndex;
                        while (spaceToFill > 0) {
                            spaceToFill -= this.sizer.getSizeForItem(--expandStart);
                        }
                        expandStart = Math.max(0, expandStart);
                        if (expandStart !== newRange.start) {
                            newRange.start = expandStart;
                            contentOffset = this.sizer.getSizeBefore(expandStart);
                        }
                    }
                }
            }
            this._lastExcessHeight = excessHeight;
            this._viewport.setRenderedRange(newRange);
            this._viewport.setRenderedContentOffset(contentOffset + excessHeight);
            this._scrolledIndexChange.next(Math.floor(firstVisibleIndex));
        };
        return PblNgridDynamicVirtualScrollStrategy;
    }());

    /** A virtual scroll strategy that supports unknown or dynamic size items. */
    var PblCdkVirtualScrollDirective = /** @class */ (function (_super) {
        __extends(PblCdkVirtualScrollDirective, _super);
        function PblCdkVirtualScrollDirective(vScrollDynamic, vScrollNone, grid) {
            var _this = _super.call(this, grid, vScrollDynamic === null ? 'vScrollNone' : 'vScrollDynamic') || this;
            if (vScrollDynamic !== null && vScrollNone !== null) {
                if (typeof ngDevMode === 'undefined' || ngDevMode) {
                    throw new Error("Invalid vScroll instruction, only one value is allow.");
                }
            }
            return _this;
        }
        Object.defineProperty(PblCdkVirtualScrollDirective.prototype, "vScrollDynamic", {
            /**
             * The size of the items in the list (in pixels).
             * If this value is not set the height is calculated from the first rendered row item.
             */
            get: function () { return this._vScrollDynamic; },
            set: function (value) { this._vScrollDynamic = coercion.coerceNumberProperty(value); },
            enumerable: false,
            configurable: true
        });
        PblCdkVirtualScrollDirective.prototype.ngOnInit = function () {
            switch (this.type) {
                case 'vScrollDynamic':
                    if (!this._vScrollDynamic) {
                        this.vScrollDynamic = this.grid.findInitialRowHeight() || 48;
                    }
                    this._scrollStrategy = new PblNgridDynamicVirtualScrollStrategy(this._vScrollDynamic, this._minBufferPx, this._maxBufferPx);
                    break;
                default:
                    this._scrollStrategy = new NoVirtualScrollStrategy();
                    break;
            }
        };
        PblCdkVirtualScrollDirective.prototype.ngOnChanges = function () {
            var _a;
            if (this._scrollStrategy) {
                switch (this.type) {
                    case 'vScrollDynamic':
                        (_a = this._scrollStrategy) === null || _a === void 0 ? void 0 : _a.updateItemAndBufferSize(this._vScrollDynamic, this._minBufferPx, this._maxBufferPx);
                        break;
                    default:
                        break;
                }
            }
        };
        return PblCdkVirtualScrollDirective;
    }(PblNgridBaseVirtualScrollDirective));
    /** @nocollapse */ PblCdkVirtualScrollDirective.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblCdkVirtualScrollDirective, deps: [{ token: 'vScrollDynamic', attribute: true }, { token: 'vScrollNone', attribute: true }, { token: PblNgridComponent }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ PblCdkVirtualScrollDirective.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblCdkVirtualScrollDirective, selector: "pbl-ngrid[vScrollDynamic], pbl-ngrid[vScrollNone]", inputs: { minBufferPx: "minBufferPx", maxBufferPx: "maxBufferPx", wheelMode: "wheelMode", vScrollDynamic: "vScrollDynamic" }, providers: [{
                provide: i3.VIRTUAL_SCROLL_STRATEGY,
                useExisting: PblCdkVirtualScrollDirective,
            }], usesInheritance: true, usesOnChanges: true, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblCdkVirtualScrollDirective, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: 'pbl-ngrid[vScrollDynamic], pbl-ngrid[vScrollNone]',
                        inputs: ['minBufferPx', 'maxBufferPx', 'wheelMode'],
                        providers: [{
                                provide: i3.VIRTUAL_SCROLL_STRATEGY,
                                useExisting: PblCdkVirtualScrollDirective,
                            }],
                    }]
            }], ctorParameters: function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Attribute,
                            args: ['vScrollDynamic']
                        }] }, { type: undefined, decorators: [{
                            type: i0.Attribute,
                            args: ['vScrollNone']
                        }] }, { type: PblNgridComponent }];
        }, propDecorators: { vScrollDynamic: [{
                    type: i0.Input
                }] } });

    var PblNgridScrolling = /** @class */ (function () {
        function PblNgridScrolling(table, pluginCtrl, zone) {
            var _this = this;
            /**
             * Event emitted when the scrolling state of rows in the table changes.
             * When scrolling starts `true` is emitted and when the scrolling ends `false` is emitted.
             *
             * The table is in "scrolling" state from the first scroll event and until 2 animation frames
             * have passed without a scroll event.
             *
             * When scrolling, the emitted value is the direction: -1 or 1
             * When not scrolling, the emitted value is 0.
             *
             * NOTE: This event runs outside the angular zone.
             */
            this.scrolling = new i0.EventEmitter();
            pluginCtrl.onInit()
                .subscribe(function () {
                var viewport = table.viewport;
                if (viewport) {
                    viewport.scrolling.subscribe(function (isScrolling) { return zone.run(function () { return _this.scrolling.next(isScrolling); }); });
                }
            });
        }
        return PblNgridScrolling;
    }());
    /** @nocollapse */ PblNgridScrolling.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridScrolling, deps: [{ token: PblNgridComponent }, { token: PblNgridPluginController }, { token: i0__namespace.NgZone }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ PblNgridScrolling.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridScrolling, selector: "pbl-ngrid[scrolling]", outputs: { scrolling: "scrolling" }, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridScrolling, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: 'pbl-ngrid[scrolling]' // tslint:disable-line: directive-selector
                    }]
            }], ctorParameters: function () { return [{ type: PblNgridComponent }, { type: PblNgridPluginController }, { type: i0__namespace.NgZone }]; }, propDecorators: { scrolling: [{
                    type: i0.Output
                }] } });

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /** Virtual scrolling strategy for lists with items of known fixed size. */
    var FixedSizeVirtualScrollStrategy = /** @class */ (function () {
        /**
         * @param itemSize The size of the items in the virtually scrolling list.
         * @param minBufferPx The minimum amount of buffer (in pixels) before needing to render more
         * @param maxBufferPx The amount of buffer (in pixels) to render when rendering more.
         */
        function FixedSizeVirtualScrollStrategy(itemSize, minBufferPx, maxBufferPx) {
            this._scrolledIndexChange = new rxjs.Subject();
            /** @docs-private Implemented as part of VirtualScrollStrategy. */
            this.scrolledIndexChange = this._scrolledIndexChange.pipe(operators.distinctUntilChanged());
            /** The attached viewport. */
            this._viewport = null;
            this._itemSize = itemSize;
            this._minBufferPx = minBufferPx;
            this._maxBufferPx = maxBufferPx;
        }
        /**
         * Attaches this scroll strategy to a viewport.
         * @param viewport The viewport to attach this strategy to.
         */
        FixedSizeVirtualScrollStrategy.prototype.attach = function (viewport) {
            this._viewport = viewport;
            this._updateTotalContentSize();
            this._updateRenderedRange();
        };
        /** Detaches this scroll strategy from the currently attached viewport. */
        FixedSizeVirtualScrollStrategy.prototype.detach = function () {
            this._scrolledIndexChange.complete();
            this._viewport = null;
        };
        /**
         * Update the item size and buffer size.
         * @param itemSize The size of the items in the virtually scrolling list.
         * @param minBufferPx The minimum amount of buffer (in pixels) before needing to render more
         * @param maxBufferPx The amount of buffer (in pixels) to render when rendering more.
         */
        FixedSizeVirtualScrollStrategy.prototype.updateItemAndBufferSize = function (itemSize, minBufferPx, maxBufferPx) {
            if (maxBufferPx < minBufferPx && (typeof ngDevMode === 'undefined' || ngDevMode)) {
                throw Error('CDK virtual scroll: maxBufferPx must be greater than or equal to minBufferPx');
            }
            this._itemSize = itemSize;
            this._minBufferPx = minBufferPx;
            this._maxBufferPx = maxBufferPx;
            this._updateTotalContentSize();
            this._updateRenderedRange();
        };
        /** @docs-private Implemented as part of VirtualScrollStrategy. */
        FixedSizeVirtualScrollStrategy.prototype.onContentScrolled = function () {
            this._updateRenderedRange();
        };
        /** @docs-private Implemented as part of VirtualScrollStrategy. */
        FixedSizeVirtualScrollStrategy.prototype.onDataLengthChanged = function () {
            this._updateTotalContentSize();
            this._updateRenderedRange();
        };
        /** @docs-private Implemented as part of VirtualScrollStrategy. */
        FixedSizeVirtualScrollStrategy.prototype.onContentRendered = function () { };
        /** @docs-private Implemented as part of VirtualScrollStrategy. */
        FixedSizeVirtualScrollStrategy.prototype.onRenderedOffsetChanged = function () { };
        /**
         * Scroll to the offset for the given index.
         * @param index The index of the element to scroll to.
         * @param behavior The ScrollBehavior to use when scrolling.
         */
        FixedSizeVirtualScrollStrategy.prototype.scrollToIndex = function (index, behavior) {
            if (this._viewport) {
                this._viewport.scrollToOffset(index * this._itemSize, behavior);
            }
        };
        /** Update the viewport's total content size. */
        FixedSizeVirtualScrollStrategy.prototype._updateTotalContentSize = function () {
            if (!this._viewport) {
                return;
            }
            this._viewport.setTotalContentSize(this._viewport.getDataLength() * this._itemSize);
        };
        /** Update the viewport's rendered range. */
        FixedSizeVirtualScrollStrategy.prototype._updateRenderedRange = function () {
            if (!this._viewport) {
                return;
            }
            var renderedRange = this._viewport.getRenderedRange();
            var newRange = { start: renderedRange.start, end: renderedRange.end };
            var viewportSize = this._viewport.getViewportSize();
            var dataLength = this._viewport.getDataLength();
            var scrollOffset = this._viewport.measureScrollOffset();
            var firstVisibleIndex = scrollOffset / this._itemSize;
            // If user scrolls to the bottom of the list and data changes to a smaller list
            if (newRange.end > dataLength) {
                // We have to recalculate the first visible index based on new data length and viewport size.
                var maxVisibleItems = Math.ceil(viewportSize / this._itemSize);
                var newVisibleIndex = Math.max(0, Math.min(firstVisibleIndex, dataLength - maxVisibleItems));
                // If first visible index changed we must update scroll offset to handle start/end buffers
                // Current range must also be adjusted to cover the new position (bottom of new list).
                if (firstVisibleIndex != newVisibleIndex) {
                    firstVisibleIndex = newVisibleIndex;
                    scrollOffset = newVisibleIndex * this._itemSize;
                    newRange.start = Math.floor(firstVisibleIndex);
                }
                newRange.end = Math.max(0, Math.min(dataLength, newRange.start + maxVisibleItems));
            }
            var startBuffer = scrollOffset - newRange.start * this._itemSize;
            if (startBuffer < this._minBufferPx && newRange.start != 0) {
                var expandStart = Math.ceil((this._maxBufferPx - startBuffer) / this._itemSize);
                newRange.start = Math.max(0, newRange.start - expandStart);
                newRange.end = Math.min(dataLength, Math.ceil(firstVisibleIndex + (viewportSize + this._minBufferPx) / this._itemSize));
            }
            else {
                var endBuffer = newRange.end * this._itemSize - (scrollOffset + viewportSize);
                if (endBuffer < this._minBufferPx && newRange.end != dataLength) {
                    var expandEnd = Math.ceil((this._maxBufferPx - endBuffer) / this._itemSize);
                    if (expandEnd > 0) {
                        newRange.end = Math.min(dataLength, newRange.end + expandEnd);
                        newRange.start = Math.max(0, Math.floor(firstVisibleIndex - this._minBufferPx / this._itemSize));
                    }
                }
            }
            this._viewport.setRenderedRange(newRange);
            this._viewport.setRenderedContentOffset(this._itemSize * newRange.start);
            this._scrolledIndexChange.next(Math.floor(firstVisibleIndex));
        };
        return FixedSizeVirtualScrollStrategy;
    }());

    var PblNgridFixedSizeVirtualScrollStrategy = /** @class */ (function (_super) {
        __extends(PblNgridFixedSizeVirtualScrollStrategy, _super);
        function PblNgridFixedSizeVirtualScrollStrategy(itemSize, minBufferPx, maxBufferPx) {
            var _this = _super.call(this, itemSize, minBufferPx, maxBufferPx) || this;
            _this.itemSize = itemSize;
            return _this;
        }
        Object.defineProperty(PblNgridFixedSizeVirtualScrollStrategy.prototype, "type", {
            get: function () { return 'vScrollFixed'; },
            enumerable: false,
            configurable: true
        });
        PblNgridFixedSizeVirtualScrollStrategy.prototype.attachExtApi = function (extApi) {
            this.extApi = extApi;
        };
        PblNgridFixedSizeVirtualScrollStrategy.prototype.attach = function (viewport) {
            if (!this.extApi) {
                if (typeof ngDevMode === 'undefined' || ngDevMode) {
                    throw new Error('Invalid use of attach, you must first attach `PblNgridExtensionApi`');
                }
            }
            _super.prototype.attach.call(this, this.viewport = viewport);
        };
        PblNgridFixedSizeVirtualScrollStrategy.prototype.onContentScrolled = function () {
            // https://github.com/shlomiassaf/ngrid/issues/11
            // This is a workaround an issue with FixedSizeVirtualScrollStrategy
            // When:
            //    - The rendered data is changed so the data length is now LOWER then the current range (end - start)
            //    - The rendering direction is towards the top (start > end)
            //
            // For the issue to occur a big gap between the data length and the range length (gap), which does not happen on normal scrolling
            // but only when the data source is replaced (e.g. filtering).
            //
            // In such cases `onDataLengthChanged` is called which will call `_updateRenderedRange` which will calculate a new range
            // that is big, it will give the `start` a new value which creates the big gap.
            // It will then calculate a new "end" and leave the "start" so we have a big gap, larger then the viewport size.
            // After that it will create the new offset which is the itemSize * start, which is a bit lower then the offset but is large and again does not fit the viewport size
            // The scroll change will trigger `onContentScrolled` which will call `_updateRenderedRange` again,
            // with the same outcome, reducing the offset slightly, calling `onContentScrolled` again.
            // It will repeat until reaching the proper offset.
            //
            // The amount of offset reduced each time is approx the size of the buffers. (mix/max Buffer).
            //
            // This strategy is here only because of this error, it will let the initial update run and catch it's subsequent scroll event.
            if (!this.viewport) {
                return;
            }
            var _a = this.viewport.getRenderedRange(), start = _a.start, end = _a.end;
            var rangeLength = end - start;
            var dataLength = this.viewport.getDataLength();
            if (rangeLength < 0 && dataLength < -rangeLength) {
                start = dataLength - end;
                this.viewport.setRenderedRange({ start: start, end: end });
                this.viewport.setRenderedContentOffset(this.itemSize * start);
                // this._scrolledIndexChange.next(Math.floor(firstVisibleIndex));
            }
            else {
                _super.prototype.onContentScrolled.call(this);
            }
        };
        return PblNgridFixedSizeVirtualScrollStrategy;
    }(FixedSizeVirtualScrollStrategy));

    var PblNgridHideColumns = /** @class */ (function () {
        function PblNgridHideColumns(pluginCtrl, differs) {
            this.pluginCtrl = pluginCtrl;
            this.differs = differs;
            this.columnStore = pluginCtrl.extApi.columnStore;
        }
        Object.defineProperty(PblNgridHideColumns.prototype, "hideColumns", {
            set: function (value) {
                this.hidden = value;
                this.dirty = true;
            },
            enumerable: false,
            configurable: true
        });
        PblNgridHideColumns.prototype.ngDoCheck = function () {
            if (this.dirty) {
                this.dirty = false;
                var value = this.hidden;
                if (!this.differ && value) {
                    try {
                        this.differ = this.differs.find(value).create();
                    }
                    catch (e) {
                        if (typeof ngDevMode === 'undefined' || ngDevMode) {
                            throw new Error("Cannot find a differ supporting object '" + value + ". hideColumns only supports binding to Iterables such as Arrays.");
                        }
                        return;
                    }
                }
            }
            if (this.differ) {
                var hideColumns = this.hidden || [];
                var changes = this.differ.diff(hideColumns);
                if (changes) {
                    var hide_1 = [];
                    var show_1 = [];
                    changes.forEachOperation(function (record, previousIndex, currentIndex) {
                        if (record.previousIndex == null) {
                            hide_1.push(record.item);
                        }
                        else if (currentIndex == null) {
                            show_1.push(record.item);
                        }
                    });
                    this.columnStore.updateColumnVisibility(hide_1, show_1);
                }
                if (!this.hidden) {
                    this.differ = undefined;
                }
            }
        };
        return PblNgridHideColumns;
    }());
    /** @nocollapse */ PblNgridHideColumns.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridHideColumns, deps: [{ token: PblNgridPluginController }, { token: i0__namespace.IterableDiffers }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ PblNgridHideColumns.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridHideColumns, selector: "pbl-ngrid[hideColumns]", inputs: { hideColumns: "hideColumns" }, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridHideColumns, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: 'pbl-ngrid[hideColumns]'
                    }]
            }], ctorParameters: function () { return [{ type: PblNgridPluginController }, { type: i0__namespace.IterableDiffers }]; }, propDecorators: { hideColumns: [{
                    type: i0.Input,
                    args: ['hideColumns']
                }] } });

    /**
     * @deprecated Will be removed in v5
     * `vScrollAuto` will move to an independent package in v5. Note that the recommended dynamic strategy for nGrid is `vScrollDynamic`
     * Note that the default virtual scroll strategy will also change from `vScrollAuto` to `vScrollDynamic`
     */
    var PblCdkAutoSizeVirtualScrollDirective = /** @class */ (function (_super) {
        __extends(PblCdkAutoSizeVirtualScrollDirective, _super);
        function PblCdkAutoSizeVirtualScrollDirective(grid) {
            return _super.call(this, grid, 'vScrollAuto') || this;
        }
        Object.defineProperty(PblCdkAutoSizeVirtualScrollDirective.prototype, "vScrollAuto", {
            /**
             * The size of the items in the list (in pixels).
             * If this value is not set the height is calculated from the first rendered row item.
             *
             * @deprecated Will be removed in v5: `vScrollAuto` will move to an independent package in v5. Note that the recommended dynamic strategy for nGrid is `vScrollDynamic`
             */
            get: function () { return this._vScrollAuto; },
            set: function (value) { this._vScrollAuto = coercion.coerceNumberProperty(value); },
            enumerable: false,
            configurable: true
        });
        PblCdkAutoSizeVirtualScrollDirective.prototype.ngOnInit = function () {
            if (!this._vScrollAuto) {
                this._vScrollAuto = this.grid.findInitialRowHeight() || 48;
            }
            this._scrollStrategy = new PblNgridAutoSizeVirtualScrollStrategy(this._minBufferPx, this._maxBufferPx, new PblNgridItemSizeAverager(this._vScrollAuto));
        };
        PblCdkAutoSizeVirtualScrollDirective.prototype.ngOnChanges = function () {
            var _a;
            (_a = this._scrollStrategy) === null || _a === void 0 ? void 0 : _a.updateBufferSize(this._minBufferPx, this._maxBufferPx);
        };
        return PblCdkAutoSizeVirtualScrollDirective;
    }(PblNgridBaseVirtualScrollDirective));
    /** @nocollapse */ PblCdkAutoSizeVirtualScrollDirective.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblCdkAutoSizeVirtualScrollDirective, deps: [{ token: PblNgridComponent }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ PblCdkAutoSizeVirtualScrollDirective.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblCdkAutoSizeVirtualScrollDirective, selector: "pbl-ngrid[vScrollAuto]", inputs: { minBufferPx: "minBufferPx", maxBufferPx: "maxBufferPx", wheelMode: "wheelMode", vScrollAuto: "vScrollAuto" }, providers: [{
                provide: i3.VIRTUAL_SCROLL_STRATEGY,
                useExisting: PblCdkAutoSizeVirtualScrollDirective,
            }], usesInheritance: true, usesOnChanges: true, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblCdkAutoSizeVirtualScrollDirective, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: 'pbl-ngrid[vScrollAuto]',
                        inputs: ['minBufferPx', 'maxBufferPx', 'wheelMode'],
                        providers: [{
                                provide: i3.VIRTUAL_SCROLL_STRATEGY,
                                useExisting: PblCdkAutoSizeVirtualScrollDirective,
                            }],
                    }]
            }], ctorParameters: function () { return [{ type: PblNgridComponent }]; }, propDecorators: { vScrollAuto: [{
                    type: i0.Input
                }] } });

    /**
     * @deprecated Will be removed in v5
     * `vScrollFixed` will move to an independent package in v5.
     * Note that the recommended dynamic strategy for nGrid is `vScrollDynamic`
     */
    var PblCdkFixedSizedVirtualScrollDirective = /** @class */ (function (_super) {
        __extends(PblCdkFixedSizedVirtualScrollDirective, _super);
        function PblCdkFixedSizedVirtualScrollDirective(grid) {
            return _super.call(this, grid, 'vScrollFixed') || this;
        }
        Object.defineProperty(PblCdkFixedSizedVirtualScrollDirective.prototype, "vScrollFixed", {
            /**
             * The size of the items in the list (in pixels).
             * If this value is not set the height is calculated from the first rendered row item.
             *
             * @deprecated Will be removed in v5: `vScrollFixed` will move to an independent package in v5. Note that the recommended dynamic strategy for nGrid is `vScrollDynamic`
             */
            get: function () { return this._vScrollFixed; },
            set: function (value) { this._vScrollFixed = coercion.coerceNumberProperty(value); },
            enumerable: false,
            configurable: true
        });
        PblCdkFixedSizedVirtualScrollDirective.prototype.ngOnInit = function () {
            if (!this._vScrollFixed) {
                this.vScrollFixed = this.grid.findInitialRowHeight() || 48;
            }
            this._scrollStrategy = new PblNgridFixedSizeVirtualScrollStrategy(this._vScrollFixed, this._minBufferPx, this._maxBufferPx);
        };
        PblCdkFixedSizedVirtualScrollDirective.prototype.ngOnChanges = function () {
            var _a;
            (_a = this._scrollStrategy) === null || _a === void 0 ? void 0 : _a.updateItemAndBufferSize(this._vScrollFixed, this._minBufferPx, this._maxBufferPx);
        };
        return PblCdkFixedSizedVirtualScrollDirective;
    }(PblNgridBaseVirtualScrollDirective));
    /** @nocollapse */ PblCdkFixedSizedVirtualScrollDirective.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblCdkFixedSizedVirtualScrollDirective, deps: [{ token: PblNgridComponent }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ PblCdkFixedSizedVirtualScrollDirective.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblCdkFixedSizedVirtualScrollDirective, selector: "pbl-ngrid[vScrollFixed]", inputs: { minBufferPx: "minBufferPx", maxBufferPx: "maxBufferPx", wheelMode: "wheelMode", vScrollFixed: "vScrollFixed" }, providers: [{
                provide: i3.VIRTUAL_SCROLL_STRATEGY,
                useExisting: PblCdkFixedSizedVirtualScrollDirective,
            }], usesInheritance: true, usesOnChanges: true, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblCdkFixedSizedVirtualScrollDirective, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: 'pbl-ngrid[vScrollFixed]',
                        inputs: ['minBufferPx', 'maxBufferPx', 'wheelMode'],
                        providers: [{
                                provide: i3.VIRTUAL_SCROLL_STRATEGY,
                                useExisting: PblCdkFixedSizedVirtualScrollDirective,
                            }],
                    }]
            }], ctorParameters: function () { return [{ type: PblNgridComponent }]; }, propDecorators: { vScrollFixed: [{
                    type: i0.Input
                }] } });

    function ngridCellFactory(cfr) {
        return {
            'data': cfr.resolveComponentFactory(PblNgridCellComponent),
            'header': cfr.resolveComponentFactory(PblNgridHeaderCellComponent),
            'footer': cfr.resolveComponentFactory(PblNgridFooterCellComponent),
            'meta-header': cfr.resolveComponentFactory(PblNgridMetaCellComponent),
            'meta-footer': cfr.resolveComponentFactory(PblNgridMetaCellComponent),
        };
    }
    var PROVIDERS = [
        {
            provide: NGRID_CELL_FACTORY,
            useFactory: ngridCellFactory,
            deps: [i0.ComponentFactoryResolver],
        },
        PblNgridCellFactoryResolver,
    ];

    var COMMON_TABLE_TEMPLATE_INIT = new i0.InjectionToken('COMMON TABLE TEMPLATE INIT');
    function provideCommon(components) {
        return [
            { provide: COMMON_TABLE_TEMPLATE_INIT, multi: true, useValue: components },
        ];
    }
    var PblNgridModule = /** @class */ (function () {
        function PblNgridModule(ngRef, registry, components) {
            var e_1, _a, e_2, _b;
            if (components) {
                try {
                    for (var components_1 = __values(components), components_1_1 = components_1.next(); !components_1_1.done; components_1_1 = components_1.next()) {
                        var multi = components_1_1.value;
                        try {
                            for (var multi_1 = (e_2 = void 0, __values(multi)), multi_1_1 = multi_1.next(); !multi_1_1.done; multi_1_1 = multi_1.next()) {
                                var c = multi_1_1.value;
                                if (c.root) {
                                    registry = registry.getRoot();
                                }
                                PblNgridModule.loadCommonTemplates(ngRef, c.component, { registry: registry, destroy: true });
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (multi_1_1 && !multi_1_1.done && (_b = multi_1.return)) _b.call(multi_1);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (components_1_1 && !components_1_1.done && (_a = components_1.return)) _a.call(components_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        }
        PblNgridModule.forRoot = function (config, components) {
            return {
                ngModule: PblNgridModule,
                providers: [
                    { provide: i1.PEB_NGRID_CONFIG, useValue: config },
                    i1.PblNgridConfigService,
                    provideCommon(components),
                ]
            };
        };
        PblNgridModule.withCommon = function (components) {
            return {
                ngModule: PblNgridModule,
                providers: provideCommon(components),
            };
        };
        PblNgridModule.loadCommonTemplates = function (ngRef, component, options) {
            var injector = ngRef.injector;
            var _a = options || {}, registry = _a.registry, destroy = _a.destroy;
            if (registry) {
                injector = i0.Injector.create({
                    providers: [{ provide: PblNgridRegistryService, useValue: registry }],
                    parent: ngRef.injector
                });
            }
            var cmpRef = ngRef.componentFactoryResolver.resolveComponentFactory(component).create(injector);
            cmpRef.changeDetectorRef.detectChanges();
            if (destroy) {
                ngRef.onDestroy(function () {
                    try {
                        cmpRef.destroy();
                    }
                    catch (err) { }
                });
            }
            return cmpRef;
        };
        return PblNgridModule;
    }());
    /** @nocollapse */ PblNgridModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridModule, deps: [{ token: i0__namespace.NgModuleRef }, { token: PblNgridRegistryService }, { token: COMMON_TABLE_TEMPLATE_INIT, optional: true, self: true }], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    /** @nocollapse */ PblNgridModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridModule, declarations: [PblNgridMetaRowContainerComponent,
            PblCdkTableComponent,
            PblNgridColumnDef,
            PblNgridRowDef, PblNgridRowOverride, PblNgridRowComponent, PblNgridColumnRowComponent, PblNgridMetaRowComponent,
            PblNgridCellStyling,
            PblNgridOuterSectionDirective,
            PblNgridHeaderExtensionRefDirective,
            PblNgridNoDataRefDirective,
            PblNgridPaginatorRefDirective,
            PblNgridHeaderCellDefDirective,
            PblNgridFooterCellDefDirective,
            PblNgridCellDefDirective, PblNgridEditorCellDefDirective,
            PblNgridHeaderCellComponent,
            PblNgridCellComponent,
            PblNgridFooterCellComponent,
            PblNgridMetaCellComponent,
            PblNgridHideColumns,
            PblCdkVirtualScrollViewportComponent, PblNgridScrolling,
            PblCdkVirtualScrollDirective,
            // TODO: Move to an independent package in v4
            PblCdkAutoSizeVirtualScrollDirective, PblCdkFixedSizedVirtualScrollDirective,
            PblNgridCellEditAutoFocusDirective,
            PblNgridComponent], imports: [i1$1.CommonModule,
            i3.ScrollingModule, scrolling.ScrollingModule,
            i4.CdkTableModule], exports: [PblNgridRowDef, PblNgridRowOverride, PblNgridRowComponent, PblNgridColumnRowComponent, PblNgridMetaRowComponent,
            PblNgridCellStyling,
            PblNgridOuterSectionDirective,
            PblNgridHeaderExtensionRefDirective,
            PblNgridNoDataRefDirective,
            PblNgridPaginatorRefDirective,
            PblNgridHeaderCellDefDirective,
            PblNgridFooterCellDefDirective,
            PblNgridCellDefDirective, PblNgridEditorCellDefDirective, PblNgridScrolling,
            PblNgridHeaderCellComponent,
            PblNgridCellComponent,
            PblNgridFooterCellComponent,
            PblNgridMetaCellComponent,
            PblNgridHideColumns,
            PblCdkVirtualScrollDirective,
            // TODO: Move to an independent package in v4
            PblCdkAutoSizeVirtualScrollDirective, PblCdkFixedSizedVirtualScrollDirective,
            PblNgridCellEditAutoFocusDirective,
            PblNgridComponent] });
    /** @nocollapse */ PblNgridModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridModule, providers: __spreadArray([], __read(PROVIDERS)), imports: [[
                i1$1.CommonModule,
                i3.ScrollingModule, scrolling.ScrollingModule,
                i4.CdkTableModule,
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            i1$1.CommonModule,
                            i3.ScrollingModule, scrolling.ScrollingModule,
                            i4.CdkTableModule,
                        ],
                        declarations: [
                            PblNgridMetaRowContainerComponent,
                            PblCdkTableComponent,
                            PblNgridColumnDef,
                            PblNgridRowDef, PblNgridRowOverride, PblNgridRowComponent, PblNgridColumnRowComponent, PblNgridMetaRowComponent,
                            PblNgridCellStyling,
                            PblNgridOuterSectionDirective,
                            PblNgridHeaderExtensionRefDirective,
                            PblNgridNoDataRefDirective,
                            PblNgridPaginatorRefDirective,
                            PblNgridHeaderCellDefDirective,
                            PblNgridFooterCellDefDirective,
                            PblNgridCellDefDirective, PblNgridEditorCellDefDirective,
                            PblNgridHeaderCellComponent,
                            PblNgridCellComponent,
                            PblNgridFooterCellComponent,
                            PblNgridMetaCellComponent,
                            PblNgridHideColumns,
                            PblCdkVirtualScrollViewportComponent, PblNgridScrolling,
                            PblCdkVirtualScrollDirective,
                            // TODO: Move to an independent package in v4
                            PblCdkAutoSizeVirtualScrollDirective, PblCdkFixedSizedVirtualScrollDirective,
                            PblNgridCellEditAutoFocusDirective,
                            PblNgridComponent,
                        ],
                        providers: __spreadArray([], __read(PROVIDERS)),
                        exports: [
                            PblNgridRowDef, PblNgridRowOverride, PblNgridRowComponent, PblNgridColumnRowComponent, PblNgridMetaRowComponent,
                            PblNgridCellStyling,
                            PblNgridOuterSectionDirective,
                            PblNgridHeaderExtensionRefDirective,
                            PblNgridNoDataRefDirective,
                            PblNgridPaginatorRefDirective,
                            PblNgridHeaderCellDefDirective,
                            PblNgridFooterCellDefDirective,
                            PblNgridCellDefDirective, PblNgridEditorCellDefDirective, PblNgridScrolling,
                            PblNgridHeaderCellComponent,
                            PblNgridCellComponent,
                            PblNgridFooterCellComponent,
                            PblNgridMetaCellComponent,
                            PblNgridHideColumns,
                            PblCdkVirtualScrollDirective,
                            // TODO: Move to an independent package in v4
                            PblCdkAutoSizeVirtualScrollDirective, PblCdkFixedSizedVirtualScrollDirective,
                            PblNgridCellEditAutoFocusDirective,
                            PblNgridComponent,
                        ],
                        // TODO(REFACTOR_REF 2): remove when ViewEngine is no longer supported by angular (V12 ???)
                        // Since these are no longer part of the main grid template but now generated programmatically we need to put them here for non viewEngine compilation to work (e.g. stackblitz)
                        entryComponents: [PblNgridHeaderCellComponent, PblNgridCellComponent, PblNgridFooterCellComponent, PblNgridMetaCellComponent]
                    }]
            }], ctorParameters: function () {
            return [{ type: i0__namespace.NgModuleRef }, { type: PblNgridRegistryService }, { type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [COMMON_TABLE_TEMPLATE_INIT]
                        }, {
                            type: i0.Optional
                        }, {
                            type: i0.Self
                        }] }];
        } });

    /* LEAVE THIS, WE NEED IT SO THE AUGMENTATION IN THE FILE WILL LOAD. */
    var utils = {
        isPblColumn: isPblColumn,
        isPblMetaColumn: isPblMetaColumn,
        isPblColumnGroup: isPblColumnGroup,
    };

    /**
     * Generated bundle index. Do not edit.
     */

    Object.defineProperty(exports, 'PEB_NGRID_CONFIG', {
        enumerable: true,
        get: function () {
            return i1.PEB_NGRID_CONFIG;
        }
    });
    Object.defineProperty(exports, 'PblDataSource', {
        enumerable: true,
        get: function () {
            return i1.PblDataSource;
        }
    });
    Object.defineProperty(exports, 'PblDataSourceAdapter', {
        enumerable: true,
        get: function () {
            return i1.PblDataSourceAdapter;
        }
    });
    Object.defineProperty(exports, 'PblDataSourceFactory', {
        enumerable: true,
        get: function () {
            return i1.PblDataSourceFactory;
        }
    });
    Object.defineProperty(exports, 'PblNgridConfigService', {
        enumerable: true,
        get: function () {
            return i1.PblNgridConfigService;
        }
    });
    Object.defineProperty(exports, 'applySort', {
        enumerable: true,
        get: function () {
            return i1.applySort;
        }
    });
    Object.defineProperty(exports, 'createDS', {
        enumerable: true,
        get: function () {
            return i1.createDS;
        }
    });
    exports.ColumnApi = ColumnApi;
    exports.DISABLE_INTERSECTION_OBSERVABLE = DISABLE_INTERSECTION_OBSERVABLE;
    exports.EXT_API_TOKEN = EXT_API_TOKEN;
    exports.NGRID_CELL_FACTORY = NGRID_CELL_FACTORY;
    exports.NoVirtualScrollStrategy = NoVirtualScrollStrategy;
    exports.PBL_NGRID_ROW_TEMPLATE = PBL_NGRID_ROW_TEMPLATE;
    exports.PblCdkAutoSizeVirtualScrollDirective = PblCdkAutoSizeVirtualScrollDirective;
    exports.PblCdkFixedSizedVirtualScrollDirective = PblCdkFixedSizedVirtualScrollDirective;
    exports.PblCdkVirtualScrollDirective = PblCdkVirtualScrollDirective;
    exports.PblColumn = PblColumn;
    exports.PblColumnFactory = PblColumnFactory;
    exports.PblColumnGroup = PblColumnGroup;
    exports.PblMetaColumn = PblMetaColumn;
    exports.PblNgridAutoSizeVirtualScrollStrategy = PblNgridAutoSizeVirtualScrollStrategy;
    exports.PblNgridBaseVirtualScrollDirective = PblNgridBaseVirtualScrollDirective;
    exports.PblNgridCellComponent = PblNgridCellComponent;
    exports.PblNgridCellDefDirective = PblNgridCellDefDirective;
    exports.PblNgridCellEditAutoFocusDirective = PblNgridCellEditAutoFocusDirective;
    exports.PblNgridCellStyling = PblNgridCellStyling;
    exports.PblNgridColumnRowComponent = PblNgridColumnRowComponent;
    exports.PblNgridComponent = PblNgridComponent;
    exports.PblNgridDataHeaderExtensionContext = PblNgridDataHeaderExtensionContext;
    exports.PblNgridDynamicVirtualScrollStrategy = PblNgridDynamicVirtualScrollStrategy;
    exports.PblNgridEditorCellDefDirective = PblNgridEditorCellDefDirective;
    exports.PblNgridFixedSizeVirtualScrollStrategy = PblNgridFixedSizeVirtualScrollStrategy;
    exports.PblNgridFooterCellComponent = PblNgridFooterCellComponent;
    exports.PblNgridFooterCellDefDirective = PblNgridFooterCellDefDirective;
    exports.PblNgridHeaderCellComponent = PblNgridHeaderCellComponent;
    exports.PblNgridHeaderCellDefDirective = PblNgridHeaderCellDefDirective;
    exports.PblNgridHeaderExtensionRefDirective = PblNgridHeaderExtensionRefDirective;
    exports.PblNgridHideColumns = PblNgridHideColumns;
    exports.PblNgridMetaCellComponent = PblNgridMetaCellComponent;
    exports.PblNgridMetaRowComponent = PblNgridMetaRowComponent;
    exports.PblNgridModule = PblNgridModule;
    exports.PblNgridMultiComponentRegistry = PblNgridMultiComponentRegistry;
    exports.PblNgridMultiTemplateRegistry = PblNgridMultiTemplateRegistry;
    exports.PblNgridNoDataRefDirective = PblNgridNoDataRefDirective;
    exports.PblNgridOuterSectionDirective = PblNgridOuterSectionDirective;
    exports.PblNgridPaginatorRefDirective = PblNgridPaginatorRefDirective;
    exports.PblNgridPluginController = PblNgridPluginController;
    exports.PblNgridRegistryService = PblNgridRegistryService;
    exports.PblNgridRowComponent = PblNgridRowComponent;
    exports.PblNgridRowDef = PblNgridRowDef;
    exports.PblNgridRowOverride = PblNgridRowOverride;
    exports.PblNgridScrolling = PblNgridScrolling;
    exports.PblNgridSingleTemplateRegistry = PblNgridSingleTemplateRegistry;
    exports.PblRowContext = PblRowContext;
    exports.columnFactory = columnFactory;
    exports.isPblColumn = isPblColumn;
    exports.isPblColumnGroup = isPblColumnGroup;
    exports.isPblMetaColumn = isPblMetaColumn;
    exports.ngridPlugin = ngridPlugin;
    exports.provideCommon = provideCommon;
    exports.utils = utils;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=pebula-ngrid.umd.js.map
