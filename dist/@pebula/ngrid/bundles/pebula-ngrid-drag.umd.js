(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/cdk/drag-drop'), require('@pebula/ngrid'), require('rxjs'), require('@angular/cdk/coercion'), require('@angular/common'), require('@angular/cdk/scrolling'), require('@angular/cdk/bidi'), require('rxjs/operators'), require('@pebula/ngrid/core'), require('@angular/cdk/platform')) :
    typeof define === 'function' && define.amd ? define('@pebula/ngrid/drag', ['exports', '@angular/core', '@angular/cdk/drag-drop', '@pebula/ngrid', 'rxjs', '@angular/cdk/coercion', '@angular/common', '@angular/cdk/scrolling', '@angular/cdk/bidi', 'rxjs/operators', '@pebula/ngrid/core', '@angular/cdk/platform'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.pebula = global.pebula || {}, global.pebula.ngrid = global.pebula.ngrid || {}, global.pebula.ngrid.drag = {}), global.ng.core, global.ng.cdk.dragDrop, global.pebula.ngrid, global.rxjs, global.ng.cdk.coercion, global.ng.common, global.ng.cdk.scrolling, global.ng.cdk.bidi, global.rxjs.operators, global.pebula.ngrid.core, global.ng.cdk.platform));
}(this, (function (exports, i0, i2, i1$1, rxjs, coercion, common, i1, i4, operators, core, platform) { 'use strict';

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
    var i1__namespace$1 = /*#__PURE__*/_interopNamespace(i1$1);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);
    var i4__namespace = /*#__PURE__*/_interopNamespace(i4);

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

    var PblDropListRef = /** @class */ (function (_super) {
        __extends(PblDropListRef, _super);
        function PblDropListRef() {
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            /** Emits right before dragging has started. */
            _this.beforeExit = new rxjs.Subject();
            return _this;
        }
        PblDropListRef.prototype.withElement = function (element) {
            // TODO: Workaround, see if we can push this through https://github.com/angular/material2/issues/15086
            this.element = coercion.coerceElement(element);
            this.withScrollableParents([this.element]);
            return this;
        };
        PblDropListRef.prototype.dispose = function () {
            this.beforeExit.complete();
            _super.prototype.dispose.call(this);
        };
        return PblDropListRef;
    }(i2.DropListRef));

    var PblDragRef = /** @class */ (function (_super) {
        __extends(PblDragRef, _super);
        function PblDragRef() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, __spreadArray([], __read(args))) || this;
            /**
             * Fires when the root element changes
             *
             * > Does not emit on the initial setup.
             */
            _this.rootElementChanged = new i0.EventEmitter();
            _this.exited.subscribe(function (e) {
                var container = e.container;
                if (container instanceof PblDropListRef) {
                    container.beforeExit.next({ item: _this });
                }
            });
            return _this;
        }
        /**
         * Sets an alternate drag root element. The root element is the element that will be moved as
         * the user is dragging. Passing an alternate root element is useful when trying to enable
         * dragging on an element that you might not have access to.
         */
        PblDragRef.prototype.withRootElement = function (rootElement) {
            // the first call to `withRootElement` comes from the base class, before we construct the emitter.
            // We don't need it anyway...
            if (this.rootElementChanged) {
                var element = coercion.coerceElement(rootElement);
                if (this.getRootElement() !== element) {
                    this.rootElementChanged.next({ prev: this.getRootElement(), curr: element });
                }
            }
            return _super.prototype.withRootElement.call(this, rootElement);
        };
        PblDragRef.prototype.dispose = function () {
            this.rootElementChanged.complete();
            _super.prototype.dispose.call(this);
        };
        return PblDragRef;
    }(i2.DragRef));

    /** Default configuration to be used when creating a `DragRef`. */
    var DEFAULT_CONFIG = {
        dragStartThreshold: 5,
        pointerDirectionChangeThreshold: 5
    };
    /**
     * Service that allows for drag-and-drop functionality to be attached to DOM elements.
     */
    var PblDragDrop = /** @class */ (function () {
        function PblDragDrop(_document, _ngZone, _viewportRuler, _dragDropRegistry) {
            this._document = _document;
            this._ngZone = _ngZone;
            this._viewportRuler = _viewportRuler;
            this._dragDropRegistry = _dragDropRegistry;
        }
        /**
         * Turns an element into a draggable item.
         * @param element Element to which to attach the dragging functionality.
         * @param config Object used to configure the dragging behavior.
         */
        PblDragDrop.prototype.createDrag = function (element, config) {
            if (config === void 0) { config = DEFAULT_CONFIG; }
            return new PblDragRef(element, config, this._document, this._ngZone, this._viewportRuler, this._dragDropRegistry);
        };
        /**
         * Turns an element into a drop list.
         * @param element Element to which to attach the drop list functionality.
         */
        PblDragDrop.prototype.createDropList = function (element) {
            return new PblDropListRef(element, this._dragDropRegistry, this._document, this._ngZone, this._viewportRuler);
        };
        return PblDragDrop;
    }());
    /** @nocollapse */ PblDragDrop.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblDragDrop, deps: [{ token: common.DOCUMENT }, { token: i0__namespace.NgZone }, { token: i1__namespace.ViewportRuler }, { token: i2__namespace.DragDropRegistry }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    /** @nocollapse */ PblDragDrop.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblDragDrop, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblDragDrop, decorators: [{
                type: i0.Injectable,
                args: [{ providedIn: 'root' }]
            }], ctorParameters: function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [common.DOCUMENT]
                        }] }, { type: i0__namespace.NgZone }, { type: i1__namespace.ViewportRuler }, { type: i2__namespace.DragDropRegistry }];
        } });

    var CdkLazyDropList = /** @class */ (function (_super) {
        __extends(CdkLazyDropList, _super);
        function CdkLazyDropList(grid, element, dragDrop, changeDetectorRef, _scrollDispatcher, dir, group, config) {
            var _this = _super.call(this, element, dragDrop, changeDetectorRef, _scrollDispatcher, dir, group, config) || this;
            if (!(_this.pblDropListRef instanceof PblDropListRef)) {
                if (typeof ngDevMode === 'undefined' || ngDevMode) {
                    throw new Error('Invalid `DropListRef` injection, the ref is not an instance of PblDropListRef');
                }
                return _this;
            }
            // This is a workaround for https://github.com/angular/material2/pull/14153
            // Working around the missing capability for selecting a container element that is not the drop container host.
            _this.originalElement = element;
            if (grid) {
                _this.updateGrid(grid);
            }
            _this.initDropListRef();
            return _this;
        }
        Object.defineProperty(CdkLazyDropList.prototype, "pblDropListRef", {
            get: function () { return this._dropListRef; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CdkLazyDropList.prototype, "grid", {
            get: function () { var _a; return (_a = this._gridApi) === null || _a === void 0 ? void 0 : _a.grid; },
            set: function (value) { this.updateGrid(value); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CdkLazyDropList.prototype, "dir", {
            get: function () { var _a; return (_a = this._gridApi) === null || _a === void 0 ? void 0 : _a.getDirection(); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CdkLazyDropList.prototype, "gridApi", {
            get: function () { return this._gridApi; },
            enumerable: false,
            configurable: true
        });
        CdkLazyDropList.prototype.ngOnInit = function () {
            var _this = this;
            this._dropListRef.beforeStarted.subscribe(function () { return _this.beforeStarted(); });
        };
        CdkLazyDropList.prototype.addDrag = function (drag) {
            this.addItem(drag);
        };
        CdkLazyDropList.prototype.removeDrag = function (drag) {
            this.removeItem(drag);
        };
        /**
         * A chance for inheriting implementations to change/modify the drop list ref instance
         *
         * We can't do this via a DragDrop service replacement as we might have multiple drop-lists on the same
         * element which mean they must share the same DragDrop factory...
         */
        CdkLazyDropList.prototype.initDropListRef = function () { };
        CdkLazyDropList.prototype.beforeStarted = function () {
            if (this.directContainerElement) {
                var element = this.originalElement.nativeElement.querySelector(this.directContainerElement);
                this.element = new i0.ElementRef(element);
            }
            else {
                this.element = this.originalElement;
            }
            this.pblDropListRef.withElement(this.element);
            if (this.dir) {
                this.pblDropListRef.withDirection(this.dir);
            }
        };
        CdkLazyDropList.prototype.gridChanged = function (prev) { };
        CdkLazyDropList.prototype.updateGrid = function (grid) {
            if (grid !== this.grid) {
                var prev = this._gridApi;
                this._gridApi = grid ? i1$1.PblNgridPluginController.find(grid).extApi : undefined;
                this.gridChanged(prev);
            }
        };
        return CdkLazyDropList;
    }(i2.CdkDropList));
    /** @nocollapse */ CdkLazyDropList.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: CdkLazyDropList, deps: [{ token: i1__namespace$1.PblNgridComponent, optional: true }, { token: i0__namespace.ElementRef }, { token: i2__namespace.DragDrop }, { token: i0__namespace.ChangeDetectorRef }, { token: i1__namespace.ScrollDispatcher }, { token: i4__namespace.Directionality, optional: true }, { token: i2.CDK_DROP_LIST_GROUP, optional: true, skipSelf: true }, { token: i2.CDK_DRAG_CONFIG, optional: true }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ CdkLazyDropList.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: CdkLazyDropList, selector: "[cdkLazyDropList]", inputs: { directContainerElement: ["cdkDropListDirectContainerElement", "directContainerElement"] }, host: { properties: { "id": "id", "class.cdk-drop-list-dragging": "_dropListRef.isDragging()", "class.cdk-drop-list-receiving": "_dropListRef.isReceiving()" }, classAttribute: "cdk-drop-list" }, providers: [
            { provide: i2.DragDrop, useExisting: PblDragDrop },
            { provide: i2.CDK_DROP_LIST, useClass: CdkLazyDropList },
        ], exportAs: ["cdkLazyDropList"], usesInheritance: true, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: CdkLazyDropList, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[cdkLazyDropList]',
                        exportAs: 'cdkLazyDropList',
                        providers: [
                            { provide: i2.DragDrop, useExisting: PblDragDrop },
                            { provide: i2.CDK_DROP_LIST, useClass: CdkLazyDropList },
                        ],
                        host: {
                            'class': 'cdk-drop-list',
                            '[id]': 'id',
                            '[class.cdk-drop-list-dragging]': '_dropListRef.isDragging()',
                            '[class.cdk-drop-list-receiving]': '_dropListRef.isReceiving()',
                        }
                    }]
            }], ctorParameters: function () {
            return [{ type: i1__namespace$1.PblNgridComponent, decorators: [{
                            type: i0.Optional
                        }] }, { type: i0__namespace.ElementRef }, { type: i2__namespace.DragDrop }, { type: i0__namespace.ChangeDetectorRef }, { type: i1__namespace.ScrollDispatcher }, { type: i4__namespace.Directionality, decorators: [{
                            type: i0.Optional
                        }] }, { type: i2__namespace.CdkDropListGroup, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.Inject,
                            args: [i2.CDK_DROP_LIST_GROUP]
                        }, {
                            type: i0.SkipSelf
                        }] }, { type: undefined, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.Inject,
                            args: [i2.CDK_DRAG_CONFIG]
                        }] }];
        }, propDecorators: { directContainerElement: [{
                    type: i0.Input,
                    args: ['cdkDropListDirectContainerElement']
                }] } });

    var CdkLazyDrag = /** @class */ (function (_super) {
        __extends(CdkLazyDrag, _super);
        function CdkLazyDrag() {
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            _this._hostNotRoot = false;
            return _this;
        }
        Object.defineProperty(CdkLazyDrag.prototype, "rootElementSelectorClass", {
            /**
             * A class to set when the root element is not the host element. (i.e. when `cdkDragRootElement` is used).
             */
            set: function (value) {
                var _b, _c;
                if (value !== this._rootClass && this._hostNotRoot) {
                    if (this._rootClass) {
                        (_b = this.getRootElement().classList).remove.apply(_b, __spreadArray([], __read(this._rootClass.split(' '))));
                    }
                    if (value) {
                        (_c = this.getRootElement().classList).add.apply(_c, __spreadArray([], __read(value.split(' '))));
                    }
                }
                this._rootClass = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CdkLazyDrag.prototype, "pblDragRef", {
            get: function () { return this._dragRef; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CdkLazyDrag.prototype, "cdkDropList", {
            get: function () { return this.dropContainer; },
            set: function (dropList) {
                var _this = this;
                // TO SUPPORT `cdkDropList` via string input (ID) we need a reactive registry...
                var prev = this.cdkDropList;
                if (dropList !== prev) {
                    if (prev) {
                        prev.removeDrag(this);
                    }
                    this.dropContainer = dropList;
                    if (dropList) {
                        this._dragRef._withDropContainer(dropList.pblDropListRef);
                        this._dragRef.beforeStarted.subscribe(function () {
                            if (dropList.dir) {
                                _this._dragRef.withDirection(dropList.dir);
                            }
                        });
                        dropList.addDrag(this);
                    }
                    this.dropContainerChanged(prev);
                }
            },
            enumerable: false,
            configurable: true
        });
        CdkLazyDrag.prototype.ngOnInit = function () {
            var _this = this;
            if (!(this.pblDragRef instanceof PblDragRef)) {
                if (typeof ngDevMode === 'undefined' || ngDevMode) {
                    throw new Error('Invalid `DragRef` injection, the ref is not an instance of PblDragRef');
                }
                return;
            }
            this.pblDragRef.rootElementChanged.subscribe(function (event) {
                var _b, _c;
                var rootElementSelectorClass = _this._rootClass;
                var hostNotRoot = _this.element.nativeElement !== event.curr;
                if (rootElementSelectorClass) {
                    if (_this._hostNotRoot) {
                        (_b = event.prev.classList).remove.apply(_b, __spreadArray([], __read(rootElementSelectorClass.split(' '))));
                    }
                    if (hostNotRoot) {
                        (_c = event.curr.classList).add.apply(_c, __spreadArray([], __read(rootElementSelectorClass.split(' '))));
                    }
                }
                _this._hostNotRoot = hostNotRoot;
            });
        };
        // This is a workaround for https://github.com/angular/material2/pull/14158
        // Working around the issue of drop container is not the direct parent (father) of a drag item.
        // The entire ngAfterViewInit() overriding method can be removed if PR accepted.
        CdkLazyDrag.prototype.ngAfterViewInit = function () {
            var _this = this;
            this.started.subscribe(function (startedEvent) {
                if (_this.dropContainer) {
                    var element_1 = _this.getRootElement();
                    var initialRootElementParent_1 = element_1.parentNode;
                    if (!element_1.nextSibling && initialRootElementParent_1 !== _this.dropContainer.element.nativeElement) {
                        _this.ended.pipe(operators.take(1)).subscribe(function (endedEvent) { return initialRootElementParent_1.appendChild(element_1); });
                    }
                }
            });
            _super.prototype.ngAfterViewInit.call(this);
        };
        CdkLazyDrag.prototype.ngOnDestroy = function () {
            var _a;
            (_a = this.cdkDropList) === null || _a === void 0 ? void 0 : _a.removeDrag(this);
            _super.prototype.ngOnDestroy.call(this);
        };
        CdkLazyDrag.prototype.dropContainerChanged = function (prev) { };
        return CdkLazyDrag;
    }(i2.CdkDrag));
    /** @nocollapse */ CdkLazyDrag.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: CdkLazyDrag, deps: null, target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ CdkLazyDrag.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: CdkLazyDrag, selector: "[cdkLazyDrag]", inputs: { rootElementSelectorClass: ["cdkDragRootElementClass", "rootElementSelectorClass"], cdkDropList: "cdkDropList" }, host: { properties: { "class.cdk-drag-dragging": "_dragRef.isDragging()" }, classAttribute: "cdk-drag" }, providers: [
            { provide: i2.DragDrop, useExisting: PblDragDrop },
        ], exportAs: ["cdkLazyDrag"], usesInheritance: true, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: CdkLazyDrag, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[cdkLazyDrag]',
                        exportAs: 'cdkLazyDrag',
                        host: {
                            'class': 'cdk-drag',
                            '[class.cdk-drag-dragging]': '_dragRef.isDragging()',
                        },
                        providers: [
                            { provide: i2.DragDrop, useExisting: PblDragDrop },
                        ],
                    }]
            }], propDecorators: { rootElementSelectorClass: [{
                    type: i0.Input,
                    args: ['cdkDragRootElementClass']
                }], cdkDropList: [{
                    type: i0.Input
                }] } });

    /** Handle that can be used to drag and CdkDrag instance. */
    var PblDragHandle = /** @class */ (function (_super) {
        __extends(PblDragHandle, _super);
        function PblDragHandle(element, parentDrag) {
            var _this = _super.call(this, element, parentDrag) || this;
            _this.element = element;
            return _this;
        }
        return PblDragHandle;
    }(i2.CdkDragHandle));
    /** @nocollapse */ PblDragHandle.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblDragHandle, deps: [{ token: i0__namespace.ElementRef }, { token: i2.CDK_DRAG_PARENT, optional: true, skipSelf: true }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ PblDragHandle.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblDragHandle, selector: "[pblDragHandle]", host: { classAttribute: "cdk-drag-handle" }, providers: [
            {
                provide: i2.CDK_DRAG_HANDLE,
                useExisting: PblDragHandle
            }
        ], usesInheritance: true, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblDragHandle, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[pblDragHandle]',
                        host: {
                            'class': 'cdk-drag-handle'
                        },
                        providers: [
                            {
                                provide: i2.CDK_DRAG_HANDLE,
                                useExisting: PblDragHandle
                            }
                        ]
                    }]
            }], ctorParameters: function () {
            return [{ type: i0__namespace.ElementRef }, { type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [i2.CDK_DRAG_PARENT]
                        }, {
                            type: i0.Optional
                        }, {
                            type: i0.SkipSelf
                        }] }];
        } });

    var _PblDropListRef = function () { return PblDropListRef; };
    var PblRowDropListRef = /** @class */ (function (_super) {
        __extends(PblRowDropListRef, _super);
        function PblRowDropListRef() {
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            _this.scrollDif = 0;
            return _this;
        }
        PblRowDropListRef.prototype._getItemIndexFromPointerPosition = function (item, pointerX, pointerY, delta) {
            return _super.prototype._getItemIndexFromPointerPosition.call(this, item, pointerX, pointerY - this.scrollDif, delta);
        };
        PblRowDropListRef.prototype.start = function () {
            var _this = this;
            _super.prototype.start.call(this);
            this.scrollDif = 0;
            if (this.gridApi.grid.viewport.enabled) {
                var initialTop_1 = this.gridApi.grid.viewport.measureScrollOffset();
                this.gridApi.grid.viewport.elementScrolled()
                    .pipe(operators.takeUntil(this.dropped))
                    .subscribe(function () {
                    _this.scrollDif = _this.gridApi.grid.viewport.measureScrollOffset() - initialTop_1;
                });
            }
        };
        return PblRowDropListRef;
    }(_PblDropListRef()));
    function patchDropListRef$1(dropListRef, gridApi) {
        try {
            Object.setPrototypeOf(dropListRef, PblRowDropListRef.prototype);
        }
        catch (err) {
            dropListRef._getItemIndexFromPointerPosition = PblRowDropListRef.prototype._getItemIndexFromPointerPosition;
            dropListRef.start = PblRowDropListRef.prototype.start;
        }
        dropListRef.gridApi = gridApi;
    }

    var ROW_REORDER_PLUGIN_KEY = 'rowReorder';
    var _uniqueIdCounter$3 = 0;
    var PblNgridRowReorderPluginDirective = /** @class */ (function (_super) {
        __extends(PblNgridRowReorderPluginDirective, _super);
        function PblNgridRowReorderPluginDirective() {
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            _this.id = "pbl-ngrid-row-reorder-list-" + _uniqueIdCounter$3++;
            _this._rowReorder = false;
            return _this;
        }
        Object.defineProperty(PblNgridRowReorderPluginDirective.prototype, "rowReorder", {
            get: function () { return this._rowReorder; },
            set: function (value) {
                value = coercion.coerceBooleanProperty(value);
                this._rowReorder = value;
            },
            enumerable: false,
            configurable: true
        });
        ;
        PblNgridRowReorderPluginDirective.prototype.ngOnDestroy = function () {
            _super.prototype.ngOnDestroy.call(this);
            this._removePlugin(this.grid);
        };
        PblNgridRowReorderPluginDirective.prototype.getSortedItems = function () {
            var rowsApi = this.gridApi.rowsApi;
            // The CdkTable has a view repeater that cache view's for performance (only when virtual scroll enabled)
            // A cached view is not showing but still "living" so it's CdkDrag element is still up in the air
            // We need to filter them out
            // An alternative will be to catch the events of the rows attached/detached and add/remove them from the drop list.
            return _super.prototype.getSortedItems.call(this).filter(function (item) {
                var _a;
                return (_a = rowsApi.findRowByElement(item.getRootElement())) === null || _a === void 0 ? void 0 : _a.attached;
            });
        };
        PblNgridRowReorderPluginDirective.prototype.initDropListRef = function () {
            patchDropListRef$1(this.pblDropListRef, this.gridApi);
        };
        PblNgridRowReorderPluginDirective.prototype.gridChanged = function () {
            var _this = this;
            this._removePlugin = this.gridApi.pluginCtrl.setPlugin(ROW_REORDER_PLUGIN_KEY, this);
            this.directContainerElement = '.pbl-ngrid-scroll-container';
            this.dropped.subscribe(function (event) {
                var item = event.item;
                var previousIndex = _this.grid.ds.source.indexOf(item.draggedContext.row);
                var currentIndex = event.currentIndex + _this.grid.ds.renderStart;
                _this.grid.ds.moveItem(previousIndex, currentIndex, true);
                _this.grid.rowsApi.syncRows('data');
            });
        };
        return PblNgridRowReorderPluginDirective;
    }(CdkLazyDropList));
    /** @nocollapse */ PblNgridRowReorderPluginDirective.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridRowReorderPluginDirective, deps: null, target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ PblNgridRowReorderPluginDirective.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridRowReorderPluginDirective, selector: "pbl-ngrid[rowReorder]", inputs: { rowReorder: "rowReorder" }, host: { properties: { "id": "id", "class.cdk-drop-list-dragging": "_dropListRef.isDragging()", "class.cdk-drop-list-receiving": "_dropListRef.isReceiving()", "class.pbl-row-reorder": "rowReorder && !this.grid.ds?.sort.sort?.order && !this.grid.ds?.filter?.filter" }, classAttribute: "cdk-drop-list" }, providers: [
            { provide: i2.DragDrop, useExisting: PblDragDrop },
            { provide: i2.CdkDropListGroup, useValue: undefined },
            { provide: i2.CDK_DROP_LIST, useExisting: PblNgridRowReorderPluginDirective },
        ], exportAs: ["pblNgridRowReorder"], usesInheritance: true, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridRowReorderPluginDirective, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: 'pbl-ngrid[rowReorder]',
                        exportAs: 'pblNgridRowReorder',
                        host: {
                            'class': 'cdk-drop-list',
                            '[id]': 'id',
                            '[class.cdk-drop-list-dragging]': '_dropListRef.isDragging()',
                            '[class.cdk-drop-list-receiving]': '_dropListRef.isReceiving()',
                            '[class.pbl-row-reorder]': 'rowReorder && !this.grid.ds?.sort.sort?.order && !this.grid.ds?.filter?.filter',
                        },
                        providers: [
                            { provide: i2.DragDrop, useExisting: PblDragDrop },
                            { provide: i2.CdkDropListGroup, useValue: undefined },
                            { provide: i2.CDK_DROP_LIST, useExisting: PblNgridRowReorderPluginDirective },
                        ],
                    }]
            }], propDecorators: { rowReorder: [{
                    type: i0.Input
                }] } });

    var PblNgridRowDragDirective = /** @class */ (function (_super) {
        __extends(PblNgridRowDragDirective, _super);
        function PblNgridRowDragDirective() {
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            _this.rootElementSelector = 'pbl-ngrid-row';
            return _this;
        }
        Object.defineProperty(PblNgridRowDragDirective.prototype, "context", {
            get: function () {
                return this._context;
            },
            set: function (value) {
                this._context = value;
                var pluginCtrl = this.pluginCtrl = value && i1$1.PblNgridPluginController.find(value.grid);
                var plugin = pluginCtrl === null || pluginCtrl === void 0 ? void 0 : pluginCtrl.getPlugin(ROW_REORDER_PLUGIN_KEY);
                this.cdkDropList = plugin || undefined;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblNgridRowDragDirective.prototype, "draggedContext", {
            /**
             * Reference to the last dragged context.
             *
             * This context is not similar to the `context` property.
             * The `context` property holds the current context which is shared and updated on scroll so if a user start a drag and then scrolled
             * the context will point to the row in view and not the original cell.
             */
            get: function () {
                return this._draggedContext;
            },
            enumerable: false,
            configurable: true
        });
        PblNgridRowDragDirective.prototype.ngOnInit = function () {
            var _this = this;
            this.started.subscribe(function (event) {
                var _a = _this._context, col = _a.col, row = _a.row, grid = _a.grid, value = _a.value;
                _this._draggedContext = { col: col, row: row, grid: grid, value: value };
            });
            _super.prototype.ngOnInit.call(this);
        };
        return PblNgridRowDragDirective;
    }(CdkLazyDrag));
    /** @nocollapse */ PblNgridRowDragDirective.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridRowDragDirective, deps: null, target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ PblNgridRowDragDirective.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridRowDragDirective, selector: "[pblNgridRowDrag]", inputs: { context: ["pblNgridRowDrag", "context"] }, host: { properties: { "class.cdk-drag-dragging": "_dragRef.isDragging()" }, classAttribute: "cdk-drag" }, providers: [
            { provide: i2.DragDrop, useExisting: PblDragDrop },
            { provide: i2.CDK_DRAG_PARENT, useExisting: PblNgridRowDragDirective },
        ], exportAs: ["pblNgridRowDrag"], usesInheritance: true, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridRowDragDirective, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[pblNgridRowDrag]',
                        exportAs: 'pblNgridRowDrag',
                        host: {
                            'class': 'cdk-drag',
                            '[class.cdk-drag-dragging]': '_dragRef.isDragging()',
                        },
                        providers: [
                            { provide: i2.DragDrop, useExisting: PblDragDrop },
                            { provide: i2.CDK_DRAG_PARENT, useExisting: PblNgridRowDragDirective },
                        ]
                    }]
            }], propDecorators: { context: [{
                    type: i0.Input,
                    args: ['pblNgridRowDrag']
                }] } });

    var PblColumnDropListRef = /** @class */ (function (_super) {
        __extends(PblColumnDropListRef, _super);
        function PblColumnDropListRef() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PblColumnDropListRef.prototype._sortPredicate = function (newIndex, drag, drop) {
            var e_1, _a;
            var siblings = this.data.getSortedItems().map(function (c) { return c._dragRef; });
            var dragAtNewPosition = siblings[newIndex];
            if (dragAtNewPosition.data.column.wontBudge) {
                return false;
            }
            // we now need to find if between current and new position there are items with `wontBudge`
            var itemAtOriginalPosition = this.lastSwap ? this.lastSwap : drag;
            var currentIndex = siblings.findIndex(function (currentItem) { return currentItem === itemAtOriginalPosition; });
            var start = Math.min(newIndex, currentIndex);
            var itemsDraggedOver = siblings.slice(start, Math.abs(newIndex - currentIndex) + start);
            try {
                for (var itemsDraggedOver_1 = __values(itemsDraggedOver), itemsDraggedOver_1_1 = itemsDraggedOver_1.next(); !itemsDraggedOver_1_1.done; itemsDraggedOver_1_1 = itemsDraggedOver_1.next()) {
                    var dragItem = itemsDraggedOver_1_1.value;
                    if (dragItem.data.column.wontBudge && dragItem !== drag) {
                        return false;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (itemsDraggedOver_1_1 && !itemsDraggedOver_1_1.done && (_a = itemsDraggedOver_1.return)) _a.call(itemsDraggedOver_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            if (!drag.data.column.checkGroupLockConstraint(dragAtNewPosition.data.column)) {
                return false;
            }
            this.lastSwap = dragAtNewPosition;
            return true;
        };
        PblColumnDropListRef.prototype._sortItem = function (item, pointerX, pointerY, pointerDelta) {
            var _this = this;
            var lastSwap = this.lastSwap;
            this.sortPredicate = function (index, drag) { return _this._sortPredicate(index, drag, _this); };
            _super.prototype._sortItem.call(this, item, pointerX, pointerY, pointerDelta);
            if (this.lastSwap && this.lastSwap !== lastSwap && this.data.orientation === 'horizontal') {
                var siblings = this.data.getSortedItems().map(function (c) { return c._dragRef; });
                siblings.forEach(function (sibling, index) {
                    var e_2, _a;
                    // Don't do anything if the position hasn't changed.
                    // if (oldOrder[index] === sibling) {
                    //   return;
                    // }
                    var transform = sibling.getVisibleElement().style.transform;
                    try {
                        for (var _b = __values(sibling.data.getCells()), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var c = _c.value;
                            c.style.transform = transform;
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                });
            }
        };
        return PblColumnDropListRef;
    }(PblDropListRef));
    function patchDropListRef(dropListRef) {
        try {
            Object.setPrototypeOf(dropListRef, PblColumnDropListRef.prototype);
        }
        catch (err) {
            dropListRef._sortPredicate = PblColumnDropListRef.prototype._sortPredicate;
            dropListRef._sortItem = PblColumnDropListRef.prototype._sortItem;
        }
    }

    var COL_DRAG_CONTAINER_PLUGIN_KEY = 'columnDrag';
    var _uniqueIdCounter$2 = 0;
    var PblNgridColumnDragContainerDirective = /** @class */ (function (_super) {
        __extends(PblNgridColumnDragContainerDirective, _super);
        function PblNgridColumnDragContainerDirective() {
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            _this.id = "pbl-ngrid-column-drag-container-list-" + _uniqueIdCounter$2++;
            _this.orientation = 'horizontal';
            _this._columnDrag = false;
            _this.connections = new Set();
            return _this;
        }
        Object.defineProperty(PblNgridColumnDragContainerDirective.prototype, "columnDrag", {
            get: function () { return this._columnDrag; },
            set: function (value) {
                this._columnDrag = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        ;
        PblNgridColumnDragContainerDirective.prototype.hasConnections = function () {
            return this.connections.size > 0;
        };
        PblNgridColumnDragContainerDirective.prototype.canDrag = function (column) {
            return this.connections.size > 0;
        };
        PblNgridColumnDragContainerDirective.prototype.connectTo = function (dropList) {
            if (!this.connections.has(dropList)) {
                this.connections.add(dropList);
                this.connectedTo = Array.from(this.connections);
                this.connectionsChanged.next();
            }
        };
        PblNgridColumnDragContainerDirective.prototype.disconnectFrom = function (dropList) {
            if (this.connections.delete(dropList)) {
                this.connectedTo = Array.from(this.connections);
                this.connectionsChanged.next();
            }
        };
        PblNgridColumnDragContainerDirective.prototype.ngOnDestroy = function () {
            _super.prototype.ngOnDestroy.call(this);
            this.connectionsChanged.complete();
            this.dragging.complete();
            this._removePlugin(this.grid);
        };
        PblNgridColumnDragContainerDirective.prototype.initDropListRef = function () {
            patchDropListRef(this.pblDropListRef);
        };
        PblNgridColumnDragContainerDirective.prototype.beforeStarted = function () {
            _super.prototype.beforeStarted.call(this);
            this.dragging.next(true);
        };
        PblNgridColumnDragContainerDirective.prototype.gridChanged = function () {
            var _this = this;
            this.dragging = new rxjs.BehaviorSubject(false);
            this.connectionsChanged = new rxjs.Subject();
            this._removePlugin = this.gridApi.pluginCtrl.setPlugin(COL_DRAG_CONTAINER_PLUGIN_KEY, this);
            this.directContainerElement = '.pbl-ngrid-header-row-main';
            this.dragging.subscribe(function (isDragging) {
                var el = _this.originalElement.nativeElement;
                if (isDragging) {
                    el.classList.add('pbl-ngrid-column-list-dragging');
                }
                else {
                    el.classList.remove('pbl-ngrid-column-list-dragging');
                }
            });
            this.sortingDisabled = true;
        };
        return PblNgridColumnDragContainerDirective;
    }(CdkLazyDropList));
    /** @nocollapse */ PblNgridColumnDragContainerDirective.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridColumnDragContainerDirective, deps: null, target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ PblNgridColumnDragContainerDirective.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridColumnDragContainerDirective, selector: "pbl-ngrid[columnDrag]:not([columnReorder])", inputs: { columnDrag: "columnDrag" }, outputs: { dragging: "cdkDropDragging", connectionsChanged: "cdkDropConnectionsChanged" }, host: { properties: { "id": "id", "class.cdk-drop-list-dragging": "_dropListRef.isDragging()", "class.cdk-drop-list-receiving": "_dropListRef.isReceiving()" }, classAttribute: "cdk-drop-list" }, providers: [
            { provide: i2.DragDrop, useExisting: PblDragDrop },
            { provide: i2.CDK_DROP_LIST, useExisting: PblNgridColumnDragContainerDirective },
        ], exportAs: ["pblNgridColumnDragContainer"], usesInheritance: true, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridColumnDragContainerDirective, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: 'pbl-ngrid[columnDrag]:not([columnReorder])',
                        exportAs: 'pblNgridColumnDragContainer',
                        host: {
                            'class': 'cdk-drop-list',
                            '[id]': 'id',
                            '[class.cdk-drop-list-dragging]': '_dropListRef.isDragging()',
                            '[class.cdk-drop-list-receiving]': '_dropListRef.isReceiving()',
                        },
                        providers: [
                            { provide: i2.DragDrop, useExisting: PblDragDrop },
                            { provide: i2.CDK_DROP_LIST, useExisting: PblNgridColumnDragContainerDirective },
                        ],
                    }]
            }], propDecorators: { columnDrag: [{
                    type: i0.Input
                }], dragging: [{
                    type: i0.Output,
                    args: ['cdkDropDragging']
                }], connectionsChanged: [{
                    type: i0.Output,
                    args: ['cdkDropConnectionsChanged']
                }] } });

    var PblNgridColumnDragDirective = /** @class */ (function (_super) {
        __extends(PblNgridColumnDragDirective, _super);
        function PblNgridColumnDragDirective() {
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            _this.rootElementSelector = 'pbl-ngrid-header-cell';
            return _this;
        }
        Object.defineProperty(PblNgridColumnDragDirective.prototype, "column", {
            get: function () { return this._column; },
            set: function (value) {
                if (value !== this._column) {
                    this._column = value;
                    this.updateDisabledState();
                }
            },
            enumerable: false,
            configurable: true
        });
        PblNgridColumnDragDirective.prototype.ngAfterViewInit = function () {
            var _this = this;
            if (!this.cdkDropList) {
                this.cdkDropList = i1$1.PblNgridPluginController.findPlugin(this.column.columnDef.grid, COL_DRAG_CONTAINER_PLUGIN_KEY);
            }
            _super.prototype.ngAfterViewInit.call(this);
            this._dragRef.beforeStarted.subscribe(function () {
                var cdkDropList = _this.cdkDropList;
                if (cdkDropList === null || cdkDropList === void 0 ? void 0 : cdkDropList.canDrag(_this.column)) {
                    // we don't allow a new dragging session before the previous ends.
                    // this sound impossible, but due to animation transitions its actually is.
                    // if the `transitionend` is long enough, a new drag can start...
                    //
                    // the `disabled` state is checked by pointerDown AFTER calling before start so we can cancel the start...
                    if (cdkDropList._dropListRef.isDragging()) {
                        return _this.disabled = true;
                    }
                }
            });
            this.started.subscribe(function () {
                if (_this._column.columnDef) {
                    _this.column.columnDef.isDragging = true;
                }
            });
            this.ended.subscribe(function () {
                if (_this._column.columnDef) {
                    _this.column.columnDef.isDragging = false;
                }
            });
        };
        PblNgridColumnDragDirective.prototype.ngOnDestroy = function () {
            core.unrx.kill(this);
            _super.prototype.ngOnDestroy.call(this);
        };
        PblNgridColumnDragDirective.prototype.getCells = function () {
            if (!this.cache) {
                this.cache = this.column.columnDef.queryCellElements('table');
            }
            return this.cache;
        };
        PblNgridColumnDragDirective.prototype.reset = function () {
            var e_1, _b;
            _super.prototype.reset.call(this);
            if (this.cache) {
                try {
                    for (var _c = __values(this.cache), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var el = _d.value;
                        el.style.transform = "";
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                this.cache = undefined;
            }
        };
        PblNgridColumnDragDirective.prototype.dropContainerChanged = function (prev) {
            var _this = this;
            if (prev) {
                core.unrx.kill(this, prev);
            }
            this.updateDisabledState();
            this.updateBoundaryElement();
            if (this.cdkDropList) {
                this.cdkDropList.connectionsChanged
                    .pipe(core.unrx(this, this.cdkDropList))
                    .subscribe(function () { return _this.updateBoundaryElement(); });
            }
        };
        PblNgridColumnDragDirective.prototype.updateDisabledState = function () {
            this.disabled = this.column && this.cdkDropList ? !this.cdkDropList.canDrag(this.column) : true;
        };
        PblNgridColumnDragDirective.prototype.updateBoundaryElement = function () {
            var _a;
            if ((_a = this.cdkDropList) === null || _a === void 0 ? void 0 : _a.hasConnections()) {
                this.boundaryElement = undefined;
            }
            else {
                this.boundaryElement = this.cdkDropList.directContainerElement;
            }
        };
        return PblNgridColumnDragDirective;
    }(CdkLazyDrag));
    /** @nocollapse */ PblNgridColumnDragDirective.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridColumnDragDirective, deps: null, target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ PblNgridColumnDragDirective.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridColumnDragDirective, selector: "[pblNgridColumnDrag]", inputs: { column: ["pblNgridColumnDrag", "column"] }, host: { properties: { "class.cdk-drag-dragging": "_dragRef.isDragging()" }, classAttribute: "cdk-drag" }, providers: [
            { provide: i2.DragDrop, useExisting: PblDragDrop },
            { provide: i2.CDK_DRAG_PARENT, useExisting: PblNgridColumnDragDirective }
        ], exportAs: ["pblNgridColumnDrag"], usesInheritance: true, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridColumnDragDirective, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[pblNgridColumnDrag]',
                        exportAs: 'pblNgridColumnDrag',
                        host: {
                            'class': 'cdk-drag',
                            '[class.cdk-drag-dragging]': '_dragRef.isDragging()',
                        },
                        providers: [
                            { provide: i2.DragDrop, useExisting: PblDragDrop },
                            { provide: i2.CDK_DRAG_PARENT, useExisting: PblNgridColumnDragDirective }
                        ]
                    }]
            }], propDecorators: { column: [{
                    type: i0.Input,
                    args: ['pblNgridColumnDrag']
                }] } });

    var _uniqueIdCounter$1 = 0;
    var PblNgridColumnDropContainerDirective = /** @class */ (function (_super) {
        __extends(PblNgridColumnDropContainerDirective, _super);
        function PblNgridColumnDropContainerDirective() {
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            _this.id = "pbl-ngrid-column-drop-container-" + _uniqueIdCounter$1++;
            _this.orientation = 'horizontal';
            _this.columnEntered = _this.entered;
            _this.columnExited = _this.exited;
            _this.columnDropped = _this.dropped;
            return _this;
        }
        Object.defineProperty(PblNgridColumnDropContainerDirective.prototype, "columnContainer", {
            get: function () { return this._columnContainer; },
            enumerable: false,
            configurable: true
        });
        PblNgridColumnDropContainerDirective.prototype.canDrag = function (column) {
            return true;
        };
        PblNgridColumnDropContainerDirective.prototype.ngOnDestroy = function () {
            _super.prototype.ngOnDestroy.call(this);
            if (this._columnContainer) {
                this._columnContainer.disconnectFrom(this);
            }
        };
        PblNgridColumnDropContainerDirective.prototype.gridChanged = function () {
            var _a;
            var columnContainer = (_a = this.gridApi) === null || _a === void 0 ? void 0 : _a.pluginCtrl.getPlugin(COL_DRAG_CONTAINER_PLUGIN_KEY);
            if (columnContainer !== this._columnContainer) {
                if (this._columnContainer) {
                    this._columnContainer.disconnectFrom(this);
                }
                this._columnContainer = columnContainer;
                if (columnContainer) {
                    columnContainer.connectTo(this);
                }
            }
        };
        return PblNgridColumnDropContainerDirective;
    }(CdkLazyDropList));
    /** @nocollapse */ PblNgridColumnDropContainerDirective.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridColumnDropContainerDirective, deps: null, target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ PblNgridColumnDropContainerDirective.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridColumnDropContainerDirective, selector: "[pblColumnDropContainer]", inputs: { grid: ["pblColumnDropContainer", "grid"] }, outputs: { columnEntered: "columnEntered", columnExited: "columnExited", columnDropped: "columnDropped" }, host: { properties: { "id": "id" }, classAttribute: "cdk-drop-list" }, providers: [
            { provide: i2.DragDrop, useExisting: PblDragDrop },
            { provide: i2.CDK_DROP_LIST_GROUP, useValue: undefined },
            { provide: i2.CDK_DROP_LIST, useExisting: PblNgridColumnDropContainerDirective },
        ], exportAs: ["pblColumnDropContainer"], usesInheritance: true, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridColumnDropContainerDirective, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[pblColumnDropContainer]',
                        exportAs: 'pblColumnDropContainer',
                        inputs: ['grid: pblColumnDropContainer'],
                        host: {
                            'class': 'cdk-drop-list',
                            '[id]': 'id',
                        },
                        providers: [
                            { provide: i2.DragDrop, useExisting: PblDragDrop },
                            { provide: i2.CDK_DROP_LIST_GROUP, useValue: undefined },
                            { provide: i2.CDK_DROP_LIST, useExisting: PblNgridColumnDropContainerDirective },
                        ],
                    }]
            }], propDecorators: { columnEntered: [{
                    type: i0.Output
                }], columnExited: [{
                    type: i0.Output
                }], columnDropped: [{
                    type: i0.Output
                }] } });

    var COL_REORDER_PLUGIN_KEY = 'columnReorder';
    var PblNgridColumnReorderPluginDirective = /** @class */ (function (_super) {
        __extends(PblNgridColumnReorderPluginDirective, _super);
        function PblNgridColumnReorderPluginDirective() {
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            _this._columnReorder = false;
            _this._manualOverride = false;
            return _this;
        }
        Object.defineProperty(PblNgridColumnReorderPluginDirective.prototype, "columnReorder", {
            get: function () { return this._columnReorder; },
            set: function (value) {
                this._columnReorder = coercion.coerceBooleanProperty(value);
                this.sortingDisabled = !this._columnReorder;
            },
            enumerable: false,
            configurable: true
        });
        ;
        Object.defineProperty(PblNgridColumnReorderPluginDirective.prototype, "manualOverride", {
            /**
             * When true, will not move the column on drop.
             * Instead you need to handle the dropped event.
             */
            get: function () { return this._manualOverride; },
            set: function (value) { this._manualOverride = coercion.coerceBooleanProperty(value); },
            enumerable: false,
            configurable: true
        });
        ;
        PblNgridColumnReorderPluginDirective.prototype.canDrag = function (column) {
            return (this._columnReorder && column.reorder) || _super.prototype.canDrag.call(this, column);
        };
        PblNgridColumnReorderPluginDirective.prototype.ngOnInit = function () {
            var _this = this;
            _super.prototype.ngOnInit.call(this);
            this.dropped.subscribe(function (e) { return _this._pblReset(); });
            this.pblDropListRef.beforeExit.subscribe(function (e) { return _this._pblReset(); });
        };
        PblNgridColumnReorderPluginDirective.prototype.gridChanged = function () {
            var _this = this;
            _super.prototype.gridChanged.call(this);
            this.dropped.subscribe(function (event) {
                if (!_this.manualOverride && _this._columnReorder) {
                    _this.grid.columnApi.moveColumn(event.item.column, event.currentIndex);
                }
            });
        };
        PblNgridColumnReorderPluginDirective.prototype._pblReset = function () {
            this.dragging.next(false);
            var siblings = this.getSortedItems().map(function (c) { return c._dragRef; });
            siblings.forEach(function (sibling, index) {
                var e_1, _a;
                try {
                    for (var _b = __values(sibling.data.getCells()), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var c = _c.value;
                        c.style.transform = "";
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            });
        };
        return PblNgridColumnReorderPluginDirective;
    }(PblNgridColumnDragContainerDirective));
    /** @nocollapse */ PblNgridColumnReorderPluginDirective.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridColumnReorderPluginDirective, deps: null, target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ PblNgridColumnReorderPluginDirective.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridColumnReorderPluginDirective, selector: "pbl-ngrid[columnReorder]", inputs: { columnReorder: "columnReorder", manualOverride: "manualOverride" }, host: { properties: { "id": "id", "class.cdk-drop-list-dragging": "_dropListRef.isDragging()", "class.cdk-drop-list-receiving": "_dropListRef.isReceiving()" }, classAttribute: "cdk-drop-list" }, providers: [
            { provide: i2.DragDrop, useExisting: PblDragDrop },
            { provide: i2.CDK_DROP_LIST, useExisting: PblNgridColumnReorderPluginDirective },
        ], exportAs: ["pblNgridColumnReorder"], usesInheritance: true, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridColumnReorderPluginDirective, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: 'pbl-ngrid[columnReorder]',
                        exportAs: 'pblNgridColumnReorder',
                        host: {
                            'class': 'cdk-drop-list',
                            '[id]': 'id',
                            '[class.cdk-drop-list-dragging]': '_dropListRef.isDragging()',
                            '[class.cdk-drop-list-receiving]': '_dropListRef.isReceiving()',
                        },
                        providers: [
                            { provide: i2.DragDrop, useExisting: PblDragDrop },
                            { provide: i2.CDK_DROP_LIST, useExisting: PblNgridColumnReorderPluginDirective },
                        ],
                    }]
            }], propDecorators: { columnReorder: [{
                    type: i0.Input
                }], manualOverride: [{
                    type: i0.Input
                }] } });

    /**
     * Code from angular/material2 repository
     * File: https://github.com/angular/material2/blob/master/src/cdk/drag-drop/drag-styling.ts
     * Commit: https://github.com/angular/material2/blob/9cd3132607b4d5ae242291df41fb02dc7a453da8/src/cdk/drag-drop/drag-styling.ts
     *
     * This code is not public but required for the drag so duplicated here.
     **/
    /**
     * Shallow-extends a stylesheet object with another stylesheet object.
     * @docs-private
     */
    function extendStyles(dest, source) {
        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                dest[key] = source[key];
            }
        }
        return dest;
    }
    /**
     * Toggles whether the native drag interactions should be enabled for an element.
     * @param element Element on which to toggle the drag interactions.
     * @param enable Whether the drag interactions should be enabled.
     * @docs-private
     */
    function toggleNativeDragInteractions(element, enable) {
        var userSelect = enable ? '' : 'none';
        extendStyles(element.style, {
            touchAction: enable ? '' : 'none',
            webkitUserDrag: enable ? '' : 'none',
            webkitTapHighlightColor: enable ? '' : 'transparent',
            userSelect: userSelect,
            msUserSelect: userSelect,
            webkitUserSelect: userSelect,
            MozUserSelect: userSelect
        });
    }

    var COL_RESIZE_PLUGIN_KEY = 'columnResize';
    /** Options that can be used to bind a passive event listener. */
    var passiveEventListenerOptions = platform.normalizePassiveListenerOptions({ passive: true });
    /** Options that can be used to bind an active event listener. */
    var activeEventListenerOptions = platform.normalizePassiveListenerOptions({ passive: false });
    var PblNgridDragResizeComponent = /** @class */ (function () {
        function PblNgridDragResizeComponent(element, _ngZone, _viewportRuler, _dragDropRegistry, _config) {
            var _this = this;
            this.element = element;
            this._ngZone = _ngZone;
            this._viewportRuler = _viewportRuler;
            this._dragDropRegistry = _dragDropRegistry;
            this._config = _config;
            /**
             * The area (in pixels) in which the handle can be grabbed and resize the cell.
             * Default: 6
             */
            this.grabAreaWidth = 6;
            this._pointerMoveSubscription = rxjs.Subscription.EMPTY;
            this._pointerUpSubscription = rxjs.Subscription.EMPTY;
            this._rootElementInitSubscription = rxjs.Subscription.EMPTY;
            this._pointerDown = function (event) {
                _this._initializeDragSequence(_this._rootElement, event);
            };
            /** Handler that is invoked when the user moves their pointer after they've initiated a drag. */
            this._pointerMove = function (event) {
                var pointerPosition = _this._getPointerPositionOnPage(event);
                var distanceX = pointerPosition.x - _this._pickupPositionOnPage.x;
                var distanceY = pointerPosition.y - _this._pickupPositionOnPage.y;
                if (!_this._hasStartedDragging) {
                    // Only start dragging after the user has moved more than the minimum distance in either
                    // direction. Note that this is preferable over doing something like `skip(minimumDistance)`
                    // in the `pointerMove` subscription, because we're not guaranteed to have one move event
                    // per pixel of movement (e.g. if the user moves their pointer quickly).
                    if (Math.abs(distanceX) + Math.abs(distanceY) >= _this._config.dragStartThreshold) {
                        _this._hasStartedDragging = true;
                        // It will be a good thing if we turned of the header's resize observer to boost performance
                        // However, because we relay on the total grid minimum width updates to relatively even out the columns it will not work.
                        // Group cells will not cover all of the children, when we enlarge the width of a child in the group.
                        // This is because the max-width of the group is set proportional to the total min-width of the inner grid.
                        // For it to work we need to directly update the width of ALL OF THE GROUPS.
                        // this.column.columnDef.isDragging = true;
                        _this.column.sizeInfo.updateSize();
                        _this._lastWidth = _this._initialWidth = _this.column.columnDef.netWidth;
                    }
                    return;
                }
                _this._hasMoved = true;
                event.preventDefault();
                event.stopPropagation();
                var dir = _this._extApi.getDirection() === 'rtl' ? -1 : 1;
                var newWidth = Math.max(0, _this._initialWidth + (distanceX * dir));
                if (newWidth > _this.column.maxWidth) {
                    newWidth = _this.column.maxWidth;
                }
                else if (distanceX < 0 && newWidth < _this.column.minWidth) {
                    newWidth = _this.column.minWidth;
                }
                if (_this._lastWidth !== newWidth) {
                    _this._lastWidth = newWidth;
                    _this.column.updateWidth(newWidth + "px");
                    _this._extApi.widthCalc.resetColumnsWidth();
                    // `this.column.updateWidth` will update the grid width cell only, which will trigger a resize that will update all other cells
                    // `this.grid.resetColumnsWidth()` will re-adjust all other grid width cells, and if their size changes they will trigger the resize event...
                }
            };
            /** Handler that is invoked when the user lifts their pointer up, after initiating a drag. */
            this._pointerUp = function () {
                if (!_this.isDragging()) {
                    return;
                }
                _this._removeSubscriptions();
                _this._dragDropRegistry.stopDragging(_this);
                if (!_this._hasStartedDragging) {
                    return;
                }
                // this.column.columnDef.isDragging = false;
                _this.grid.columnApi.resizeColumn(_this.column, _this._lastWidth + 'px');
            };
            this._config = {
                dragStartThreshold: _config && _config.dragStartThreshold != null ? _config.dragStartThreshold : 5,
                pointerDirectionChangeThreshold: _config && _config.pointerDirectionChangeThreshold != null ? _config.pointerDirectionChangeThreshold : 5,
                zIndex: _config === null || _config === void 0 ? void 0 : _config.zIndex
            };
            _dragDropRegistry.registerDragItem(this);
        }
        Object.defineProperty(PblNgridDragResizeComponent.prototype, "context", {
            // tslint:disable-next-line:no-input-rename
            set: function (value) {
                if (value) {
                    var col = value.col, grid = value.grid;
                    if (i1$1.isPblColumn(col)) {
                        this.column = col;
                        this.grid = grid;
                        this._extApi = i1$1.PblNgridPluginController.find(grid).extApi;
                        return;
                    }
                }
                this.column = this._extApi = this.grid = undefined;
            },
            enumerable: false,
            configurable: true
        });
        PblNgridDragResizeComponent.prototype.ngAfterViewInit = function () {
            var _this = this;
            // We need to wait for the zone to stabilize, in order for the reference
            // element to be in the proper place in the DOM. This is mostly relevant
            // for draggable elements inside portals since they get stamped out in
            // their original DOM position and then they get transferred to the portal.
            this._rootElementInitSubscription = this._ngZone.onStable.asObservable().pipe(operators.take(1)).subscribe(function () {
                var rootElement = _this._rootElement = _this._getRootElement();
                var cell = rootElement.parentElement;
                cell.classList.add('pbl-ngrid-column-resize');
                rootElement.addEventListener('mousedown', _this._pointerDown, activeEventListenerOptions);
                rootElement.addEventListener('touchstart', _this._pointerDown, passiveEventListenerOptions);
                toggleNativeDragInteractions(rootElement, false);
            });
        };
        PblNgridDragResizeComponent.prototype.ngOnDestroy = function () {
            if (this._rootElement) {
                this._rootElement.removeEventListener('mousedown', this._pointerDown, activeEventListenerOptions);
                this._rootElement.removeEventListener('touchstart', this._pointerDown, passiveEventListenerOptions);
            }
            this._rootElementInitSubscription.unsubscribe();
            this._dragDropRegistry.removeDragItem(this);
            this._removeSubscriptions();
        };
        PblNgridDragResizeComponent.prototype.onDoubleClick = function (event) {
            this.grid.columnApi.autoSizeColumn(this.column);
        };
        /**
       * Sets up the different variables and subscriptions
       * that will be necessary for the dragging sequence.
       * @param referenceElement Element that started the drag sequence.
       * @param event Browser event object that started the sequence.
       */
        PblNgridDragResizeComponent.prototype._initializeDragSequence = function (referenceElement, event) {
            // Always stop propagation for the event that initializes
            // the dragging sequence, in order to prevent it from potentially
            // starting another sequence for a draggable parent somewhere up the DOM tree.
            event.stopPropagation();
            // Abort if the user is already dragging or is using a mouse button other than the primary one.
            if (this.isDragging() || (!this._isTouchEvent(event) && event.button !== 0)) {
                return;
            }
            this._hasStartedDragging = this._hasMoved = false;
            this._pointerMoveSubscription = this._dragDropRegistry.pointerMove
                .pipe(operators.auditTime(0, rxjs.animationFrameScheduler))
                .subscribe(this._pointerMove);
            this._pointerUpSubscription = this._dragDropRegistry.pointerUp.subscribe(this._pointerUp);
            this._scrollPosition = this._viewportRuler.getViewportScrollPosition();
            this._pickupPositionOnPage = this._getPointerPositionOnPage(event);
            this._dragDropRegistry.startDragging(this, event);
        };
        PblNgridDragResizeComponent.prototype._getPointerPositionOnPage = function (event) {
            var point = this._isTouchEvent(event) ? event.touches[0] : event;
            return {
                x: point.pageX - this._scrollPosition.left,
                y: point.pageY - this._scrollPosition.top
            };
        };
        PblNgridDragResizeComponent.prototype._isTouchEvent = function (event) {
            return event.type.startsWith('touch');
        };
        /**
         *
         * @deprecated Will be removed in v5, use `isDragging()` instead
         */
        PblNgridDragResizeComponent.prototype._isDragging = function () {
            return this.isDragging();
        };
        PblNgridDragResizeComponent.prototype.isDragging = function () {
            return this._dragDropRegistry.isDragging(this);
        };
        PblNgridDragResizeComponent.prototype._getRootElement = function () {
            return this.element.nativeElement;
        };
        PblNgridDragResizeComponent.prototype._removeSubscriptions = function () {
            this._pointerMoveSubscription.unsubscribe();
            this._pointerUpSubscription.unsubscribe();
        };
        return PblNgridDragResizeComponent;
    }());
    /** @nocollapse */ PblNgridDragResizeComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridDragResizeComponent, deps: [{ token: i0__namespace.ElementRef }, { token: i0__namespace.NgZone }, { token: i1__namespace.ViewportRuler }, { token: i2__namespace.DragDropRegistry }, { token: i2.CDK_DRAG_CONFIG, optional: true }], target: i0__namespace.ɵɵFactoryTarget.Component });
    /** @nocollapse */ PblNgridDragResizeComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridDragResizeComponent, selector: "pbl-ngrid-drag-resize", inputs: { context: "context", grabAreaWidth: "grabAreaWidth" }, host: { listeners: { "dblclick": "onDoubleClick($event)" }, properties: { "style.width.px": "grabAreaWidth" }, classAttribute: "pbl-ngrid-column-resizer" }, ngImport: i0__namespace, template: "<ng-content></ng-content>\n", styles: [".pbl-ngrid-column-resizer{position:absolute;right:0;height:100%;cursor:col-resize;z-index:50000}[dir=rtl] .pbl-ngrid-column-resizer{right:unset;left:0}"], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridDragResizeComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'pbl-ngrid-drag-resize',
                        host: {
                            'class': 'pbl-ngrid-column-resizer',
                            '[style.width.px]': 'grabAreaWidth',
                        },
                        templateUrl: './column-resize.component.html',
                        styleUrls: ['./column-resize.component.scss'],
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                    }]
            }], ctorParameters: function () {
            return [{ type: i0__namespace.ElementRef }, { type: i0__namespace.NgZone }, { type: i1__namespace.ViewportRuler }, { type: i2__namespace.DragDropRegistry }, { type: undefined, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.Inject,
                            args: [i2.CDK_DRAG_CONFIG]
                        }] }];
        }, propDecorators: { context: [{
                    type: i0.Input
                }], grabAreaWidth: [{
                    type: i0.Input
                }], onDoubleClick: [{
                    type: i0.HostListener,
                    args: ['dblclick', ['$event']]
                }] } });

    function checkGroupLockConstraint(column) {
        var e_1, _a;
        try {
            for (var _b = __values(this.groups), _c = _b.next(); !_c.done; _c = _b.next()) {
                var id = _c.value;
                var g = this.groupStore.find(id);
                if (g && g.lockColumns && !column.isInGroup(g)) {
                    return false;
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
        return true;
    }
    function colReorderExtendGrid() {
        i1$1.PblColumn.extendProperty('reorder');
        i1$1.PblColumn.extendProperty('wontBudge');
        i1$1.PblColumnGroup.extendProperty('lockColumns');
        i1$1.PblColumn.prototype.checkGroupLockConstraint = function (column) {
            return checkGroupLockConstraint.call(this, column) && checkGroupLockConstraint.call(column, this);
        };
    }

    var _uniqueIdCounter = 0;
    var PblNgridAggregationContainerDirective = /** @class */ (function (_super) {
        __extends(PblNgridAggregationContainerDirective, _super);
        function PblNgridAggregationContainerDirective() {
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            _this.id = "pbl-ngrid-column-aggregation-container-" + _uniqueIdCounter++;
            _this.orientation = 'horizontal';
            return _this;
        }
        PblNgridAggregationContainerDirective.prototype.ngOnInit = function () {
            var _this = this;
            _super.prototype.ngOnInit.call(this);
            this.pblDropListRef.dropped
                .subscribe(function (event) {
                var item = event.item;
                _this.pending = undefined;
                _this.grid.columnApi.addGroupBy(item.data.column);
            });
            this.pblDropListRef.entered
                .subscribe(function (event) {
                var e_1, _a;
                var item = event.item;
                _this.pending = item.data.column;
                item.getPlaceholderElement().style.display = 'none';
                try {
                    for (var _b = __values(item.data.getCells()), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var c = _c.value;
                        c.style.display = 'none';
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            });
            this.pblDropListRef.exited
                .subscribe(function (event) {
                var e_2, _a;
                var item = event.item;
                _this.pending = undefined;
                item.getPlaceholderElement().style.display = '';
                try {
                    for (var _b = __values(item.data.getCells()), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var c = _c.value;
                        c.style.display = '';
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            });
        };
        PblNgridAggregationContainerDirective.prototype.ngOnDestroy = function () {
            _super.prototype.ngOnDestroy.call(this);
            this.columnContainer.disconnectFrom(this);
        };
        PblNgridAggregationContainerDirective.prototype.gridChanged = function () {
            this.columnContainer = this.gridApi.pluginCtrl.getPlugin('columnReorder');
            this.columnContainer.connectTo(this);
        };
        return PblNgridAggregationContainerDirective;
    }(CdkLazyDropList));
    /** @nocollapse */ PblNgridAggregationContainerDirective.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridAggregationContainerDirective, deps: null, target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ PblNgridAggregationContainerDirective.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridAggregationContainerDirective, selector: "[pblAggregationContainer]", host: { properties: { "id": "id" }, classAttribute: "cdk-drop-list" }, providers: [
            { provide: i2.DragDrop, useExisting: PblDragDrop },
            { provide: i2.CDK_DROP_LIST_GROUP, useValue: undefined },
            { provide: i2.CDK_DROP_LIST, useExisting: PblNgridAggregationContainerDirective },
        ], exportAs: ["pblAggregationContainer"], usesInheritance: true, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridAggregationContainerDirective, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[pblAggregationContainer]',
                        exportAs: 'pblAggregationContainer',
                        host: {
                            'class': 'cdk-drop-list',
                            '[id]': 'id',
                        },
                        providers: [
                            { provide: i2.DragDrop, useExisting: PblDragDrop },
                            { provide: i2.CDK_DROP_LIST_GROUP, useValue: undefined },
                            { provide: i2.CDK_DROP_LIST, useExisting: PblNgridAggregationContainerDirective },
                        ],
                    }]
            }] });

    /**
     * Marks the element as the resizer template for cells.
     */
    var PblNgridCellDraggerRefDirective = /** @class */ (function (_super) {
        __extends(PblNgridCellDraggerRefDirective, _super);
        function PblNgridCellDraggerRefDirective(tRef, registry) {
            var _this = _super.call(this, tRef, registry) || this;
            _this.name = 'cellDragger';
            _this.kind = 'dataHeaderExtensions';
            return _this;
        }
        PblNgridCellDraggerRefDirective.prototype.shouldRender = function (context) {
            // We dont check for `context.col.reorder` because even if a specific column does not "reorder" we still need to render the cdk-drag
            // so the cdk-drop-list will be aware of this item, so if another item does reorder it will be able to move while taking this element into consideration.
            // I.E: It doesn't reorder but it's part of the playground.
            //
            // However, when the plugin does not exists for this table we don't need to render...
            var pluginCtrl = i1$1.PblNgridPluginController.find(context.grid);
            return pluginCtrl.hasPlugin(COL_DRAG_CONTAINER_PLUGIN_KEY);
        };
        return PblNgridCellDraggerRefDirective;
    }(i1$1.PblNgridMultiTemplateRegistry));
    /** @nocollapse */ PblNgridCellDraggerRefDirective.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridCellDraggerRefDirective, deps: [{ token: i0__namespace.TemplateRef }, { token: i1__namespace$1.PblNgridRegistryService }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ PblNgridCellDraggerRefDirective.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridCellDraggerRefDirective, selector: "[pblNgridCellDraggerRef]", usesInheritance: true, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridCellDraggerRefDirective, decorators: [{
                type: i0.Directive,
                args: [{ selector: '[pblNgridCellDraggerRef]' }]
            }], ctorParameters: function () { return [{ type: i0__namespace.TemplateRef }, { type: i1__namespace$1.PblNgridRegistryService }]; } });

    /**
     * Marks the element as the resizer template for cells.
     */
    var PblNgridCellResizerRefDirective = /** @class */ (function (_super) {
        __extends(PblNgridCellResizerRefDirective, _super);
        function PblNgridCellResizerRefDirective(tRef, registry) {
            var _this = _super.call(this, tRef, registry) || this;
            _this.name = 'cellResizer';
            _this.kind = 'dataHeaderExtensions';
            return _this;
        }
        PblNgridCellResizerRefDirective.prototype.shouldRender = function (context) {
            return !!context.col.resize;
        };
        return PblNgridCellResizerRefDirective;
    }(i1$1.PblNgridMultiTemplateRegistry));
    /** @nocollapse */ PblNgridCellResizerRefDirective.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridCellResizerRefDirective, deps: [{ token: i0__namespace.TemplateRef }, { token: i1__namespace$1.PblNgridRegistryService }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ PblNgridCellResizerRefDirective.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridCellResizerRefDirective, selector: "[pblNgridCellResizerRef]", usesInheritance: true, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridCellResizerRefDirective, decorators: [{
                type: i0.Directive,
                args: [{ selector: '[pblNgridCellResizerRef]' }]
            }], ctorParameters: function () { return [{ type: i0__namespace.TemplateRef }, { type: i1__namespace$1.PblNgridRegistryService }]; } });

    function colResizeExtendGrid() {
        i1$1.PblColumn.extendProperty('resize');
    }

    var DragPluginDefaultTemplatesComponent = /** @class */ (function () {
        function DragPluginDefaultTemplatesComponent() {
        }
        return DragPluginDefaultTemplatesComponent;
    }());
    /** @nocollapse */ DragPluginDefaultTemplatesComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: DragPluginDefaultTemplatesComponent, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    /** @nocollapse */ DragPluginDefaultTemplatesComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.0", type: DragPluginDefaultTemplatesComponent, selector: "pbl-drag-plugin-default-templates", ngImport: i0__namespace, template: "<pbl-ngrid-drag-resize *pblNgridCellResizerRef=\"let ctx\" [context]=\"ctx\"></pbl-ngrid-drag-resize>\n<span *pblNgridCellDraggerRef=\"let ctx\" [pblNgridColumnDrag]=\"ctx.col\" cdkDragRootElementClass=\"cdk-drag\"></span>", isInline: true, components: [{ type: PblNgridDragResizeComponent, selector: "pbl-ngrid-drag-resize", inputs: ["context", "grabAreaWidth"] }], directives: [{ type: PblNgridCellResizerRefDirective, selector: "[pblNgridCellResizerRef]" }, { type: PblNgridCellDraggerRefDirective, selector: "[pblNgridCellDraggerRef]" }, { type: PblNgridColumnDragDirective, selector: "[pblNgridColumnDrag]", inputs: ["pblNgridColumnDrag"], exportAs: ["pblNgridColumnDrag"] }], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: DragPluginDefaultTemplatesComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'pbl-drag-plugin-default-templates',
                        template: "<pbl-ngrid-drag-resize *pblNgridCellResizerRef=\"let ctx\" [context]=\"ctx\"></pbl-ngrid-drag-resize>\n<span *pblNgridCellDraggerRef=\"let ctx\" [pblNgridColumnDrag]=\"ctx.col\" cdkDragRootElementClass=\"cdk-drag\"></span>",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                    }]
            }] });

    function ngridPlugins() {
        return [
            i1$1.ngridPlugin({ id: ROW_REORDER_PLUGIN_KEY }, PblNgridRowReorderPluginDirective),
            i1$1.ngridPlugin({ id: COL_DRAG_CONTAINER_PLUGIN_KEY }, PblNgridColumnDragContainerDirective),
            i1$1.ngridPlugin({ id: COL_REORDER_PLUGIN_KEY, runOnce: colReorderExtendGrid }, PblNgridColumnReorderPluginDirective),
            i1$1.ngridPlugin({ id: COL_RESIZE_PLUGIN_KEY, runOnce: colResizeExtendGrid }, PblNgridDragResizeComponent),
        ];
    }
    var PblNgridDragModule = /** @class */ (function () {
        function PblNgridDragModule() {
        }
        PblNgridDragModule.withDefaultTemplates = function () {
            return {
                ngModule: PblNgridDragModule,
                providers: i1$1.provideCommon([{ component: DragPluginDefaultTemplatesComponent }]),
            };
        };
        return PblNgridDragModule;
    }());
    PblNgridDragModule.NGRID_PLUGIN = ngridPlugins();
    /** @nocollapse */ PblNgridDragModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridDragModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    /** @nocollapse */ PblNgridDragModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridDragModule, declarations: [DragPluginDefaultTemplatesComponent,
            CdkLazyDropList, CdkLazyDrag, PblDragHandle,
            PblNgridRowReorderPluginDirective, PblNgridRowDragDirective,
            PblNgridColumnDragContainerDirective,
            PblNgridColumnDropContainerDirective, PblNgridColumnReorderPluginDirective, PblNgridColumnDragDirective, PblNgridCellDraggerRefDirective,
            PblNgridAggregationContainerDirective,
            PblNgridDragResizeComponent, PblNgridCellResizerRefDirective], imports: [common.CommonModule,
            i1$1.PblNgridModule,
            i2.DragDropModule], exports: [i2.DragDropModule,
            CdkLazyDropList, CdkLazyDrag, PblDragHandle,
            PblNgridRowReorderPluginDirective, PblNgridRowDragDirective,
            PblNgridColumnDragContainerDirective,
            PblNgridColumnDropContainerDirective, PblNgridColumnReorderPluginDirective, PblNgridColumnDragDirective, PblNgridCellDraggerRefDirective,
            PblNgridAggregationContainerDirective,
            PblNgridDragResizeComponent, PblNgridCellResizerRefDirective] });
    /** @nocollapse */ PblNgridDragModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridDragModule, imports: [[
                common.CommonModule,
                i1$1.PblNgridModule,
                i2.DragDropModule
            ], i2.DragDropModule] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridDragModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            common.CommonModule,
                            i1$1.PblNgridModule,
                            i2.DragDropModule
                        ],
                        declarations: [
                            DragPluginDefaultTemplatesComponent,
                            CdkLazyDropList, CdkLazyDrag, PblDragHandle,
                            PblNgridRowReorderPluginDirective, PblNgridRowDragDirective,
                            PblNgridColumnDragContainerDirective,
                            PblNgridColumnDropContainerDirective, PblNgridColumnReorderPluginDirective, PblNgridColumnDragDirective, PblNgridCellDraggerRefDirective,
                            PblNgridAggregationContainerDirective,
                            PblNgridDragResizeComponent, PblNgridCellResizerRefDirective,
                        ],
                        exports: [
                            i2.DragDropModule,
                            CdkLazyDropList, CdkLazyDrag, PblDragHandle,
                            PblNgridRowReorderPluginDirective, PblNgridRowDragDirective,
                            PblNgridColumnDragContainerDirective,
                            PblNgridColumnDropContainerDirective, PblNgridColumnReorderPluginDirective, PblNgridColumnDragDirective, PblNgridCellDraggerRefDirective,
                            PblNgridAggregationContainerDirective,
                            PblNgridDragResizeComponent, PblNgridCellResizerRefDirective,
                        ],
                        // TODO(REFACTOR_REF 2): remove when ViewEngine is no longer supported by angular (V12 ???)
                        entryComponents: [DragPluginDefaultTemplatesComponent]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.CdkLazyDrag = CdkLazyDrag;
    exports.CdkLazyDropList = CdkLazyDropList;
    exports.PblDragDrop = PblDragDrop;
    exports.PblDragHandle = PblDragHandle;
    exports.PblDragRef = PblDragRef;
    exports.PblDropListRef = PblDropListRef;
    exports.PblNgridAggregationContainerDirective = PblNgridAggregationContainerDirective;
    exports.PblNgridCellDraggerRefDirective = PblNgridCellDraggerRefDirective;
    exports.PblNgridCellResizerRefDirective = PblNgridCellResizerRefDirective;
    exports.PblNgridColumnDragContainerDirective = PblNgridColumnDragContainerDirective;
    exports.PblNgridColumnDragDirective = PblNgridColumnDragDirective;
    exports.PblNgridColumnDropContainerDirective = PblNgridColumnDropContainerDirective;
    exports.PblNgridColumnReorderPluginDirective = PblNgridColumnReorderPluginDirective;
    exports.PblNgridDragModule = PblNgridDragModule;
    exports.PblNgridDragResizeComponent = PblNgridDragResizeComponent;
    exports.PblNgridRowDragDirective = PblNgridRowDragDirective;
    exports.PblNgridRowReorderPluginDirective = PblNgridRowReorderPluginDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=pebula-ngrid-drag.umd.js.map
