(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@ng-bootstrap/ng-bootstrap'), require('@pebula/ngrid'), require('@pebula/ngrid/target-events'), require('@angular/cdk/coercion'), require('@pebula/ngrid/core')) :
    typeof define === 'function' && define.amd ? define('@pebula/ngrid-bootstrap/cell-tooltip', ['exports', '@angular/core', '@angular/common', '@ng-bootstrap/ng-bootstrap', '@pebula/ngrid', '@pebula/ngrid/target-events', '@angular/cdk/coercion', '@pebula/ngrid/core'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.pebula = global.pebula || {}, global.pebula['ngrid-bootstrap'] = global.pebula['ngrid-bootstrap'] || {}, global.pebula['ngrid-bootstrap']['cell-tooltip'] = {}), global.ng.core, global.ng.common, global.ngb, global.pebula.ngrid, global.pebula.ngrid['target-events'], global.ng.cdk.coercion, global.pebula.ngrid.core));
}(this, (function (exports, i0, common, ngBootstrap, i1$1, targetEvents, coercion, i1) { 'use strict';

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
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1$1);
    var i1__namespace$1 = /*#__PURE__*/_interopNamespace(i1);

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

    var PLUGIN_KEY = 'bsCellTooltip';
    var DEFAULT_OPTIONS = {
        canShow: function (event) {
            var element = (event.cellTarget.firstElementChild || event.cellTarget);
            return element.scrollWidth > element.offsetWidth;
        },
        message: function (event) {
            return event.cellTarget.innerText;
        }
    };
    var PblNgridCellTooltipDirective = /** @class */ (function () {
        function PblNgridCellTooltipDirective(table, injector, pluginCtrl) {
            var _this = this;
            this.table = table;
            this.injector = injector;
            this._removePlugin = pluginCtrl.setPlugin(PLUGIN_KEY, this);
            var configService = injector.get(i1.PblNgridConfigService);
            this.initArgs = [
                injector.get(i0.Renderer2),
                injector,
                injector.get(i0.ComponentFactoryResolver),
                injector.get(i0.ViewContainerRef),
                injector.get(ngBootstrap.NgbTooltipConfig),
                injector.get(i0.NgZone),
                injector.get(common.DOCUMENT),
                injector.get(i0.ChangeDetectorRef),
                injector.get(i0.ApplicationRef),
            ];
            configService.onUpdate('bsCellTooltip')
                .pipe(i1.unrx(this))
                .subscribe(function (cfg) { return _this.lastConfig = cfg.curr; });
            pluginCtrl.onInit().subscribe(function () { return _this.init(pluginCtrl); });
        }
        Object.defineProperty(PblNgridCellTooltipDirective.prototype, "canShow", {
            // tslint:disable-next-line:no-input-rename
            set: function (value) {
                if (typeof value === 'function') {
                    this._canShow = value;
                }
                else if (value === '') {
                    this._canShow = undefined;
                }
                else {
                    this._canShow = coercion.coerceBooleanProperty(value) ? function (e) { return true; } : function (e) { return false; };
                }
            },
            enumerable: false,
            configurable: true
        });
        PblNgridCellTooltipDirective.create = function (table, injector) {
            return new PblNgridCellTooltipDirective(table, injector, i1$1.PblNgridPluginController.find(table));
        };
        PblNgridCellTooltipDirective.prototype.ngOnDestroy = function () {
            this._removePlugin(this.table);
            this.killTooltip();
            i1.unrx.kill(this);
        };
        PblNgridCellTooltipDirective.prototype.init = function (pluginCtrl) {
            var _this = this;
            // Depends on target-events plugin
            // if it's not set, create it.
            var targetEventsPlugin = pluginCtrl.getPlugin('targetEvents') || pluginCtrl.createPlugin('targetEvents');
            targetEventsPlugin.cellEnter
                .pipe(i1.unrx(this))
                .subscribe(function (event) { return _this.cellEnter(event); });
            targetEventsPlugin.cellLeave
                .pipe(i1.unrx(this))
                .subscribe(function (event) { return _this.cellLeave(event); });
        };
        PblNgridCellTooltipDirective.prototype.cellEnter = function (event) {
            this.killTooltip();
            if (!this._canShow) {
                // TODO: this will set lastConfig / default option once
                // but if user changes lastConfig it will never update again...
                this.canShow = (this.lastConfig && this.lastConfig.canShow) || DEFAULT_OPTIONS.canShow;
            }
            if (this._canShow(event)) {
                var params = this.initArgs.slice();
                this.toolTip = new (ngBootstrap.NgbTooltip.bind.apply(ngBootstrap.NgbTooltip, __spreadArray([void 0, new i0.ElementRef(event.cellTarget)], __read(params))))();
                this.toolTip.container = 'body';
                var message = this.message || (this.lastConfig && this.lastConfig.message) || DEFAULT_OPTIONS.message;
                this.toolTip.ngbTooltip = message(event);
                // if (this.position) {
                //   this.toolTip.position = this.position;
                // }
                if (this.tooltipClass) {
                    this.toolTip.tooltipClass = this.tooltipClass;
                }
                if (this.showDelay >= 0) {
                    this.toolTip.openDelay = this.showDelay;
                }
                if (this.hideDelay >= 0) {
                    this.toolTip.closeDelay = this.hideDelay;
                }
                this.toolTip.open();
            }
        };
        PblNgridCellTooltipDirective.prototype.cellLeave = function (event) {
            this.killTooltip();
        };
        PblNgridCellTooltipDirective.prototype.killTooltip = function () {
            if (this.toolTip) {
                this.toolTip.close();
                this.toolTip.ngOnDestroy();
                this.toolTip = undefined;
            }
        };
        return PblNgridCellTooltipDirective;
    }());
    PblNgridCellTooltipDirective.PLUGIN_KEY = PLUGIN_KEY;
    /** @nocollapse */ PblNgridCellTooltipDirective.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridCellTooltipDirective, deps: [{ token: i1__namespace.PblNgridComponent }, { token: i0__namespace.Injector }, { token: i1__namespace.PblNgridPluginController }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ PblNgridCellTooltipDirective.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridCellTooltipDirective, selector: "[bsCellTooltip]", inputs: { canShow: ["bsCellTooltip", "canShow"], message: "message", tooltipClass: "tooltipClass", showDelay: "showDelay", hideDelay: "hideDelay" }, exportAs: ["bsCellTooltip"], ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridCellTooltipDirective, decorators: [{
                type: i0.Directive,
                args: [{ selector: '[bsCellTooltip]', exportAs: 'bsCellTooltip' }]
            }], ctorParameters: function () { return [{ type: i1__namespace.PblNgridComponent }, { type: i0__namespace.Injector }, { type: i1__namespace.PblNgridPluginController }]; }, propDecorators: { canShow: [{
                    type: i0.Input,
                    args: ['bsCellTooltip']
                }], message: [{
                    type: i0.Input
                }], tooltipClass: [{
                    type: i0.Input
                }], showDelay: [{
                    type: i0.Input
                }], hideDelay: [{
                    type: i0.Input
                }] } });

    var PblNgridBsCellTooltipModule = /** @class */ (function () {
        function PblNgridBsCellTooltipModule(parentModule, configService) {
            if (parentModule) {
                return;
            }
            i1$1.PblNgridPluginController.created
                .subscribe(function (event) {
                // Do not remove the explicit reference to `PblNgridCellTooltipDirective`
                // We use `PblNgridCellTooltipDirective.PLUGIN_KEY` to create a direct reference to `PblNgridCellTooltipDirective`
                // which will disable dead code elimination for the `PblNgridCellTooltipDirective` plugin.
                // If it is not set, using the plugin will only work when it is used in templates, other wise, if used programmatically (`autoSetAll`)
                // CLI prod builds will remove the plugin's code.
                var cellTooltipConfig = configService.get(PblNgridCellTooltipDirective.PLUGIN_KEY);
                if (cellTooltipConfig && cellTooltipConfig.autoSetAll === true) {
                    var pluginCtrl_1 = event.controller;
                    pluginCtrl_1.onInit()
                        .subscribe(function (evt) { return pluginCtrl_1.ensurePlugin(PblNgridCellTooltipDirective.PLUGIN_KEY); });
                }
            });
        }
        return PblNgridBsCellTooltipModule;
    }());
    PblNgridBsCellTooltipModule.NGRID_PLUGIN = i1$1.ngridPlugin({ id: PLUGIN_KEY, factory: 'create' }, PblNgridCellTooltipDirective);
    /** @nocollapse */ PblNgridBsCellTooltipModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridBsCellTooltipModule, deps: [{ token: PblNgridBsCellTooltipModule, optional: true, skipSelf: true }, { token: i1__namespace$1.PblNgridConfigService }], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    /** @nocollapse */ PblNgridBsCellTooltipModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridBsCellTooltipModule, declarations: [PblNgridCellTooltipDirective], imports: [common.CommonModule, ngBootstrap.NgbTooltipModule, i1$1.PblNgridModule, targetEvents.PblNgridTargetEventsModule], exports: [PblNgridCellTooltipDirective, ngBootstrap.NgbTooltipModule] });
    /** @nocollapse */ PblNgridBsCellTooltipModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridBsCellTooltipModule, imports: [[common.CommonModule, ngBootstrap.NgbTooltipModule, i1$1.PblNgridModule, targetEvents.PblNgridTargetEventsModule], ngBootstrap.NgbTooltipModule] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridBsCellTooltipModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [common.CommonModule, ngBootstrap.NgbTooltipModule, i1$1.PblNgridModule, targetEvents.PblNgridTargetEventsModule],
                        declarations: [PblNgridCellTooltipDirective],
                        exports: [PblNgridCellTooltipDirective, ngBootstrap.NgbTooltipModule],
                    }]
            }], ctorParameters: function () {
            return [{ type: PblNgridBsCellTooltipModule, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.SkipSelf
                        }] }, { type: i1__namespace$1.PblNgridConfigService }];
        } });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.PblNgridBsCellTooltipModule = PblNgridBsCellTooltipModule;
    exports.PblNgridCellTooltipDirective = PblNgridCellTooltipDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=pebula-ngrid-bootstrap-cell-tooltip.umd.js.map
