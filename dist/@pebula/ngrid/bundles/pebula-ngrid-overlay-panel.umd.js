(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@pebula/ngrid'), require('rxjs'), require('rxjs/operators'), require('@angular/core'), require('@angular/cdk/overlay'), require('@angular/cdk/portal'), require('@angular/common'), require('@angular/cdk/bidi')) :
    typeof define === 'function' && define.amd ? define('@pebula/ngrid/overlay-panel', ['exports', '@pebula/ngrid', 'rxjs', 'rxjs/operators', '@angular/core', '@angular/cdk/overlay', '@angular/cdk/portal', '@angular/common', '@angular/cdk/bidi'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.pebula = global.pebula || {}, global.pebula.ngrid = global.pebula.ngrid || {}, global.pebula.ngrid['overlay-panel'] = {}), global.pebula.ngrid, global.rxjs, global.rxjs.operators, global.ng.core, global.ng.cdk.overlay, global.ng.cdk.portal, global.ng.common, global.ng.cdk.bidi));
}(this, (function (exports, i1, rxjs, operators, i0, i1$1, portal, common, bidi) { 'use strict';

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

    var i1__namespace$1 = /*#__PURE__*/_interopNamespace(i1);
    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1$1);

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

    var PblNgridOverlayPanelComponentExtension = /** @class */ (function (_super) {
        __extends(PblNgridOverlayPanelComponentExtension, _super);
        function PblNgridOverlayPanelComponentExtension(name, component, cfr, injector) {
            var _this = _super.call(this) || this;
            _this.component = component;
            _this.cfr = cfr;
            _this.injector = injector;
            _this.kind = 'overlayPanels';
            _this.projectContent = false;
            _this.name = name;
            return _this;
        }
        PblNgridOverlayPanelComponentExtension.prototype.getFactory = function (context) {
            return this.cfr.resolveComponentFactory(this.component);
        };
        PblNgridOverlayPanelComponentExtension.prototype.onCreated = function (context, cmpRef) {
            cmpRef.changeDetectorRef.markForCheck();
            cmpRef.changeDetectorRef.detectChanges();
        };
        return PblNgridOverlayPanelComponentExtension;
    }(i1.PblNgridMultiComponentRegistry));

    var PblNgridOverlayPanelRef = /** @class */ (function () {
        function PblNgridOverlayPanelRef(overlayRef, data) {
            var _this = this;
            this.overlayRef = overlayRef;
            this.data = data;
            this._closed$ = new rxjs.Subject();
            this.closed = this._closed$.asObservable();
            this._closingActions(this, overlayRef)
                .pipe(operators.takeUntil(this.closed))
                .subscribe(function () { return _this.close(); });
        }
        PblNgridOverlayPanelRef.prototype.close = function () {
            if (this._closed$) {
                var closed$ = this._closed$;
                this._closed$ = undefined;
                closed$.next();
                closed$.complete();
                this.overlayRef.detach();
                this.overlayRef.dispose();
            }
        };
        PblNgridOverlayPanelRef.prototype._closingActions = function (overlayPanelRef, overlayRef) {
            var backdrop = overlayRef.backdropClick();
            var detachments = overlayRef.detachments();
            return rxjs.merge(backdrop, detachments, overlayPanelRef.closed);
        };
        return PblNgridOverlayPanelRef;
    }());

    var DEFAULT_OVERLAY_PANEL_CONFIG = {
        hasBackdrop: false,
        xPos: 'center',
        yPos: 'center',
        insetPos: false,
    };
    var PblNgridOverlayPanelFactory = /** @class */ (function () {
        function PblNgridOverlayPanelFactory(_overlay, zone) {
            this._overlay = _overlay;
            this.zone = zone;
        }
        PblNgridOverlayPanelFactory.prototype.create = function (grid) {
            return new PblNgridOverlayPanel(this._overlay, this.zone, grid);
        };
        return PblNgridOverlayPanelFactory;
    }());
    /** @nocollapse */ PblNgridOverlayPanelFactory.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridOverlayPanelFactory, deps: [{ token: i1__namespace.Overlay }, { token: i0__namespace.NgZone }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    /** @nocollapse */ PblNgridOverlayPanelFactory.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridOverlayPanelFactory });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridOverlayPanelFactory, decorators: [{
                type: i0.Injectable
            }], ctorParameters: function () { return [{ type: i1__namespace.Overlay }, { type: i0__namespace.NgZone }]; } });
    var PblNgridOverlayPanel = /** @class */ (function () {
        function PblNgridOverlayPanel(_overlay, zone, grid) {
            this._overlay = _overlay;
            this.zone = zone;
            this.grid = grid;
            var controller = i1.PblNgridPluginController.find(grid);
            this.injector = controller.injector;
            this.vcRef = controller.injector.get(i0.ViewContainerRef);
            this._scrollStrategy = function () { return _overlay.scrollStrategies.reposition(); };
        }
        /**
         * Opens a panel relative to a cell element using the overlay panel extension registry template/component with the name provided in `extName`.
         * The cell element is referenced by the `columnId` and the `rowRenderPosition`.
         *
         * If the `rowRenderPosition` is "header" or "footer" then the grid's header / footer rows are targeted, otherwise the number provided should reference
         * the rendered row index to use to get the cell from.
         *
         * > Note that this helper method does not allow targeting meta cells.
         */
        PblNgridOverlayPanel.prototype.openGridCell = function (extName, columnId, rowRenderPosition, config, data) {
            var column = this.grid.columnApi.findColumn(columnId);
            if (!column) {
                if (typeof ngDevMode === 'undefined' || ngDevMode) {
                    throw new Error('Could not find the column ' + columnId);
                }
                return;
            }
            var section;
            var rowRenderIndex = 0;
            switch (rowRenderPosition) {
                case 'header':
                case 'footer':
                    section = rowRenderPosition;
                    break;
                default:
                    if (typeof rowRenderPosition === 'number') {
                        section = 'table';
                        rowRenderIndex = rowRenderPosition;
                    }
                    break;
            }
            if (!section) {
                if (typeof ngDevMode === 'undefined' || ngDevMode) {
                    throw new Error('Invalid "rowRenderPosition" provided, use "header", "footer" or any number >= 0.');
                }
                return;
            }
            var el = column && column.columnDef.queryCellElements(section)[rowRenderIndex];
            if (!el) {
                if (typeof ngDevMode === 'undefined' || ngDevMode) {
                    throw new Error("Could not find a cell for the column " + columnId + " at render index " + rowRenderIndex);
                }
                return;
            }
            return this.open(extName, new i0.ElementRef(el), config, data);
        };
        PblNgridOverlayPanel.prototype.open = function (extName, source, config, data) {
            var _this = this;
            config = Object.assign(Object.assign({}, DEFAULT_OVERLAY_PANEL_CONFIG), config || {});
            var match = this.findNamesExtension(extName);
            if (!match) {
                if (typeof ngDevMode === 'undefined' || ngDevMode) {
                    throw new Error('Could not find the overlay panel with the name ' + extName);
                }
                return;
            }
            return this.zone.run(function () {
                var overlayRef = _this._createOverlay(source, config);
                var overlayPanelRef = new PblNgridOverlayPanelRef(overlayRef, data);
                _this._setPosition(overlayRef.getConfig().positionStrategy, config);
                if (match instanceof i1.PblNgridMultiTemplateRegistry) {
                    var tPortal = _this._getTemplatePortal(match.tRef, overlayPanelRef);
                    var viewRef = overlayRef.attach(tPortal);
                    viewRef.markForCheck();
                    viewRef.detectChanges();
                }
                else {
                    var cPortal = _this._getComponentPortal(overlayPanelRef, match);
                    var cmpRef = overlayRef.attach(cPortal);
                    match.onCreated(null, cmpRef);
                }
                overlayRef.updatePosition();
                return overlayPanelRef;
            });
        };
        /**
         * This method creates the overlay from the provided menu's template and saves its
         * OverlayRef so that it can be attached to the DOM when openMenu is called.
         */
        PblNgridOverlayPanel.prototype._createOverlay = function (element, config) {
            var overlayConfig = this._getOverlayConfig(element, config);
            var overlayRef = this._overlay.create(overlayConfig);
            overlayRef.getConfig().hasBackdrop = !!config.hasBackdrop;
            // Consume the `keydownEvents` in order to prevent them from going to another overlay.
            // Ideally we'd also have our keyboard event logic in here, however doing so will
            // break anybody that may have implemented the `MatMenuPanel` themselves.
            overlayRef.keydownEvents().subscribe();
            return overlayRef;
        };
        /**
         * This method builds the configuration object needed to create the overlay, the OverlayState.
         * @returns OverlayConfig
         */
        PblNgridOverlayPanel.prototype._getOverlayConfig = function (element, config) {
            var positionStrategy = this._overlay
                .position()
                .flexibleConnectedTo(element)
                .withLockedPosition();
            return new i1$1.OverlayConfig({
                positionStrategy: positionStrategy,
                backdropClass: config.backdropClass || 'cdk-overlay-transparent-backdrop',
                scrollStrategy: this._scrollStrategy(),
                direction: this.grid.dir,
            });
        };
        PblNgridOverlayPanel.prototype._getTemplatePortal = function (tRef, overlayPanelRef) {
            var context = {
                grid: this.grid,
                ref: overlayPanelRef,
            };
            return new portal.TemplatePortal(tRef, this.vcRef, context);
        };
        PblNgridOverlayPanel.prototype._getComponentPortal = function (overlayPanelRef, componentExtension) {
            var portalInjector = i0.Injector.create({
                providers: [
                    { provide: PblNgridOverlayPanelRef, useValue: overlayPanelRef },
                ],
                parent: componentExtension.injector || this.injector,
            });
            return new portal.ComponentPortal(componentExtension.component, this.vcRef, portalInjector, componentExtension.cfr || null);
        };
        PblNgridOverlayPanel.prototype._setPosition = function (positionStrategy, config) {
            var _a = __read(config.xPos === 'center'
                ? ['center', 'center']
                : config.xPos === 'before' ? ['end', 'start'] : ['start', 'end'], 2), originX = _a[0], originFallbackX = _a[1];
            var _b = __read(config.yPos === 'center'
                ? ['center', 'center']
                : config.yPos === 'above' ? ['bottom', 'top'] : ['top', 'bottom'], 2), overlayY = _b[0], overlayFallbackY = _b[1];
            var _c = __read([overlayY, overlayFallbackY], 2), originY = _c[0], originFallbackY = _c[1];
            var _d = __read([originX, originFallbackX], 2), overlayX = _d[0], overlayFallbackX = _d[1];
            var offsetY = 0;
            if (!config.insetPos) {
                if (overlayY !== 'center') {
                    originY = overlayY === 'top' ? 'bottom' : 'top';
                }
                if (overlayFallbackY !== 'center') {
                    originFallbackY = overlayFallbackY === 'top' ? 'bottom' : 'top';
                }
            }
            positionStrategy.withPositions([
                { originX: originX, originY: originY, overlayX: overlayX, overlayY: overlayY, offsetY: offsetY },
                { originX: originFallbackX, originY: originY, overlayX: overlayFallbackX, overlayY: overlayY, offsetY: offsetY },
                {
                    originX: originX,
                    originY: originFallbackY,
                    overlayX: overlayX,
                    overlayY: overlayFallbackY,
                    offsetY: -offsetY
                },
                {
                    originX: originFallbackX,
                    originY: originFallbackY,
                    overlayX: overlayFallbackX,
                    overlayY: overlayFallbackY,
                    offsetY: -offsetY
                }
            ]);
        };
        PblNgridOverlayPanel.prototype.findNamesExtension = function (extName) {
            var match;
            this.grid.registry.forMulti('overlayPanels', function (values) {
                var e_1, _a;
                try {
                    for (var values_1 = __values(values), values_1_1 = values_1.next(); !values_1_1.done; values_1_1 = values_1.next()) {
                        var value = values_1_1.value;
                        if (value.name === extName) {
                            match = value;
                            return true;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (values_1_1 && !values_1_1.done && (_a = values_1.return)) _a.call(values_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            });
            return match;
        };
        return PblNgridOverlayPanel;
    }());

    var PblNgridOverlayPanelDef = /** @class */ (function (_super) {
        __extends(PblNgridOverlayPanelDef, _super);
        function PblNgridOverlayPanelDef(tRef, registry) {
            var _this = _super.call(this, tRef, registry) || this;
            _this.kind = 'overlayPanels';
            return _this;
        }
        return PblNgridOverlayPanelDef;
    }(i1.PblNgridMultiTemplateRegistry));
    /** @nocollapse */ PblNgridOverlayPanelDef.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridOverlayPanelDef, deps: [{ token: i0__namespace.TemplateRef }, { token: i1__namespace$1.PblNgridRegistryService }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ PblNgridOverlayPanelDef.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridOverlayPanelDef, selector: "[pblNgridOverlayPanelDef]", inputs: { name: ["pblNgridOverlayPanelDef", "name"] }, usesInheritance: true, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridOverlayPanelDef, decorators: [{
                type: i0.Directive,
                args: [{ selector: '[pblNgridOverlayPanelDef]' }]
            }], ctorParameters: function () { return [{ type: i0__namespace.TemplateRef }, { type: i1__namespace$1.PblNgridRegistryService }]; }, propDecorators: { name: [{
                    type: i0.Input,
                    args: ['pblNgridOverlayPanelDef']
                }] } });

    var PblNgridOverlayPanelModule = /** @class */ (function () {
        function PblNgridOverlayPanelModule() {
        }
        return PblNgridOverlayPanelModule;
    }());
    /** @nocollapse */ PblNgridOverlayPanelModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridOverlayPanelModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    /** @nocollapse */ PblNgridOverlayPanelModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridOverlayPanelModule, declarations: [PblNgridOverlayPanelDef], imports: [common.CommonModule,
            i1$1.OverlayModule,
            bidi.BidiModule], exports: [PblNgridOverlayPanelDef] });
    /** @nocollapse */ PblNgridOverlayPanelModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridOverlayPanelModule, providers: [
            PblNgridOverlayPanelFactory,
        ], imports: [[
                common.CommonModule,
                i1$1.OverlayModule,
                bidi.BidiModule,
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridOverlayPanelModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            common.CommonModule,
                            i1$1.OverlayModule,
                            bidi.BidiModule,
                        ],
                        declarations: [
                            PblNgridOverlayPanelDef,
                        ],
                        exports: [
                            PblNgridOverlayPanelDef,
                        ],
                        providers: [
                            PblNgridOverlayPanelFactory,
                        ],
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.PblNgridOverlayPanel = PblNgridOverlayPanel;
    exports.PblNgridOverlayPanelComponentExtension = PblNgridOverlayPanelComponentExtension;
    exports.PblNgridOverlayPanelDef = PblNgridOverlayPanelDef;
    exports.PblNgridOverlayPanelFactory = PblNgridOverlayPanelFactory;
    exports.PblNgridOverlayPanelModule = PblNgridOverlayPanelModule;
    exports.PblNgridOverlayPanelRef = PblNgridOverlayPanelRef;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=pebula-ngrid-overlay-panel.umd.js.map
