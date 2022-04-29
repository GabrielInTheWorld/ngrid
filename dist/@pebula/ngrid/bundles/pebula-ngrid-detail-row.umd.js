(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/cdk/keycodes'), require('@angular/cdk/table'), require('@pebula/ngrid/core'), require('@pebula/ngrid'), require('@angular/cdk/coercion'), require('@angular/common'), require('@pebula/ngrid/target-events')) :
    typeof define === 'function' && define.amd ? define('@pebula/ngrid/detail-row', ['exports', '@angular/core', '@angular/cdk/keycodes', '@angular/cdk/table', '@pebula/ngrid/core', '@pebula/ngrid', '@angular/cdk/coercion', '@angular/common', '@pebula/ngrid/target-events'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.pebula = global.pebula || {}, global.pebula.ngrid = global.pebula.ngrid || {}, global.pebula.ngrid['detail-row'] = {}), global.ng.core, global.ng.cdk.keycodes, global.ng.cdk.table, global.pebula.ngrid.core, global.pebula.ngrid, global.ng.cdk.coercion, global.ng.common, global.pebula.ngrid['target-events']));
}(this, (function (exports, i0, keycodes, table, core, i1, coercion, common, targetEvents) { 'use strict';

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

    var PLUGIN_KEY = 'detailRow';

    var PBL_NGRID_ROW_TEMPLATE = '<ng-content select=".pbl-ngrid-row-prefix"></ng-content><ng-container #viewRef></ng-container><ng-content select=".pbl-ngrid-row-suffix"></ng-content>';
    var PblNgridDetailRowComponent = /** @class */ (function (_super) {
        __extends(PblNgridDetailRowComponent, _super);
        function PblNgridDetailRowComponent() {
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            _this.opened = false;
            return _this;
        }
        Object.defineProperty(PblNgridDetailRowComponent.prototype, "expended", {
            get: function () {
                return this.opened;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblNgridDetailRowComponent.prototype, "height", {
            get: function () {
                return _super.prototype.height + this.controller.getDetailRowHeight(this);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblNgridDetailRowComponent.prototype, "row", {
            get: function () { return this.context.$implicit; },
            enumerable: false,
            configurable: true
        });
        PblNgridDetailRowComponent.prototype.ngOnInit = function () {
            var _this = this;
            _super.prototype.ngOnInit.call(this);
            this.plugin.addDetailRow(this);
            var tradeEvents = this._extApi.pluginCtrl.getPlugin('targetEvents');
            tradeEvents.cellClick
                .pipe(core.unrx(this))
                .subscribe(function (event) {
                if (event.type === 'data' && event.row === _this.context.$implicit) {
                    var excludeToggleFrom = _this.plugin.excludeToggleFrom;
                    if (!excludeToggleFrom || !excludeToggleFrom.some(function (c) { return event.column.id === c; })) {
                        _this.toggle();
                    }
                }
            });
            tradeEvents.rowClick
                .pipe(core.unrx(this))
                .subscribe(function (event) {
                if (!event.root && event.type === 'data' && event.row === _this.context.$implicit) {
                    _this.toggle();
                }
            });
        };
        PblNgridDetailRowComponent.prototype.ngOnDestroy = function () {
            core.unrx.kill(this);
            this.plugin.removeDetailRow(this);
            this.controller.clearDetailRow(this, true);
            _super.prototype.ngOnDestroy.call(this);
        };
        PblNgridDetailRowComponent.prototype.updateRow = function () {
            if (_super.prototype.updateRow.call(this)) { // only if row has changed (TODO: use identity based change detection?)
                switch (this.plugin.whenContextChange) {
                    case 'context':
                        var isContextOpened = !!this.context.getExternal('detailRow');
                        isContextOpened && this.opened
                            ? this.controller.updateDetailRow(this) // if already opened, just update the context
                            : this.toggle(isContextOpened, true) // if not opened, force to the context state
                        ;
                        break;
                    case 'render':
                        if (this.opened) {
                            this.controller.updateDetailRow(this);
                        }
                        break;
                    case 'close':
                        this.toggle(false, true);
                        break;
                }
                this.plugin.markForCheck();
                this.controller.detectChanges(this);
                this.plugin.toggledRowContextChange.next(this);
                return true;
            }
            return false;
        };
        PblNgridDetailRowComponent.prototype.toggle = function (forceState, fromRender) {
            if (fromRender === void 0) { fromRender = false; }
            if (this.opened !== forceState) {
                var opened = false;
                if (this.opened) {
                    this.controller.clearDetailRow(this, fromRender);
                    this.element.classList.remove('pbl-row-detail-opened');
                }
                else if (this.controller.render(this, fromRender)) {
                    opened = true;
                    this.element.classList.add('pbl-row-detail-opened');
                }
                if (this.opened !== opened) {
                    this.opened = opened;
                    this.context.setExternal('detailRow', opened, true);
                    this.plugin.detailRowToggled(this);
                }
            }
        };
        /**
         * @internal
         */
        PblNgridDetailRowComponent.prototype.handleKeydown = function (event) {
            if (event.target === this.element) {
                var keyCode = event.keyCode;
                var isToggleKey = keyCode === keycodes.ENTER || keyCode === keycodes.SPACE;
                if (isToggleKey) {
                    event.preventDefault(); // prevents the page from scrolling down when pressing space
                    this.toggle();
                }
            }
        };
        PblNgridDetailRowComponent.prototype.onCtor = function () {
            _super.prototype.onCtor.call(this);
            this.plugin = this._extApi.pluginCtrl.getPlugin(PLUGIN_KEY); // TODO: THROW IF NO PLUGIN...
            this.controller = this.plugin.detailRowCtrl;
        };
        return PblNgridDetailRowComponent;
    }(i1.PblNgridRowComponent));
    /** @nocollapse */ PblNgridDetailRowComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridDetailRowComponent, deps: null, target: i0__namespace.ɵɵFactoryTarget.Component });
    /** @nocollapse */ PblNgridDetailRowComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridDetailRowComponent, selector: "pbl-ngrid-row[detailRow]", host: { attributes: { "role": "row" }, listeners: { "keydown": "handleKeydown($event)" }, properties: { "attr.tabindex": "grid.rowFocus" }, classAttribute: "pbl-ngrid-row pbl-row-detail-parent" }, providers: [
            { provide: table.CdkRow, useExisting: PblNgridDetailRowComponent }
        ], viewQueries: [{ propertyName: "_viewRef", first: true, predicate: ["viewRef"], descendants: true, read: i0.ViewContainerRef, static: true }], exportAs: ["pblNgridDetailRow"], usesInheritance: true, ngImport: i0__namespace, template: "<ng-content select=\".pbl-ngrid-row-prefix\"></ng-content><ng-container #viewRef></ng-container><ng-content select=\".pbl-ngrid-row-suffix\"></ng-content>", isInline: true, styles: [".pbl-row-detail-parent { position: relative; cursor: pointer; }"], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridDetailRowComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'pbl-ngrid-row[detailRow]',
                        exportAs: 'pblNgridDetailRow',
                        host: {
                            class: 'pbl-ngrid-row pbl-row-detail-parent',
                            role: 'row',
                            '[attr.tabindex]': 'grid.rowFocus',
                            '(keydown)': 'handleKeydown($event)'
                        },
                        template: PBL_NGRID_ROW_TEMPLATE,
                        styles: [".pbl-row-detail-parent { position: relative; cursor: pointer; }"],
                        providers: [
                            { provide: table.CdkRow, useExisting: PblNgridDetailRowComponent }
                        ],
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                    }]
            }], propDecorators: { _viewRef: [{
                    type: i0.ViewChild,
                    args: ['viewRef', { read: i0.ViewContainerRef, static: true }]
                }] } });

    /**
     * Marks the element as the display element for the detail row itself.
     */
    var PblNgridDetailRowDefDirective = /** @class */ (function (_super) {
        __extends(PblNgridDetailRowDefDirective, _super);
        function PblNgridDetailRowDefDirective(tRef, registry) {
            var _this = _super.call(this, tRef, registry) || this;
            _this.kind = 'detailRow';
            return _this;
        }
        return PblNgridDetailRowDefDirective;
    }(i1.PblNgridSingleTemplateRegistry));
    /** @nocollapse */ PblNgridDetailRowDefDirective.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridDetailRowDefDirective, deps: [{ token: i0__namespace.TemplateRef }, { token: i1__namespace.PblNgridRegistryService }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ PblNgridDetailRowDefDirective.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridDetailRowDefDirective, selector: "[pblNgridDetailRowDef]", inputs: { hasAnimation: ["pblNgridDetailRowDefHasAnimation", "hasAnimation"] }, usesInheritance: true, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridDetailRowDefDirective, decorators: [{
                type: i0.Directive,
                args: [{ selector: '[pblNgridDetailRowDef]' }]
            }], ctorParameters: function () { return [{ type: i0__namespace.TemplateRef }, { type: i1__namespace.PblNgridRegistryService }]; }, propDecorators: { hasAnimation: [{
                    type: i0.Input,
                    args: ['pblNgridDetailRowDefHasAnimation']
                }] } });
    var PblNgridDetailRowParentRefDirective = /** @class */ (function (_super) {
        __extends(PblNgridDetailRowParentRefDirective, _super);
        function PblNgridDetailRowParentRefDirective() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PblNgridDetailRowParentRefDirective.prototype.ngOnInit = function () {
            this.registry.setSingle('detailRowParent', this);
        };
        PblNgridDetailRowParentRefDirective.prototype.ngOnDestroy = function () {
            if (this.registry.getSingle('detailRowParent') === this) {
                this.registry.setSingle('detailRowParent', undefined);
            }
        };
        return PblNgridDetailRowParentRefDirective;
    }(i1.PblNgridRowDef));
    /** @nocollapse */ PblNgridDetailRowParentRefDirective.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridDetailRowParentRefDirective, deps: null, target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ PblNgridDetailRowParentRefDirective.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridDetailRowParentRefDirective, selector: "[pblNgridDetailRowParentRef]", inputs: { columns: ["pblNgridDetailRowParentRef", "columns"], when: ["pblNgridDetailRowParentRefWhen", "when"] }, usesInheritance: true, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridDetailRowParentRefDirective, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[pblNgridDetailRowParentRef]',
                        inputs: ['columns: pblNgridDetailRowParentRef', 'when: pblNgridDetailRowParentRefWhen'],
                    }]
            }] });

    var NOOP = function () { };
    /**
     * In charge of handling the lifecycle of detail row instances.
     * The whole lifecycle: Create, update, move, destroy, etc...
     *
     * This controller also sync's the rendering process to make sure we reuse detail rom elements within
     * a single rendering cycle (i.e. not long term caching but a short term one).
     * This is done for performance and to prevent flickering when a row is moved into a different element due to virtual scroll.
     * When this happen we just want to move all dom elements properly, swap the context and trigger change detection.
     * If we have left over rows to render we create new elements or if we have left over rows to clear, we remove them.
     * The logic for this relay on the fact that the row's context.$implicit is updated in a sync iteration by the cdk table
     * and afterwards we will have the onRenderRows event fired, allowing us to sync changes.
     * We also relay on the fact that the event run immediately after the iterations and everything is sync.
     *
     * > In the future, this is where we can support detail row caching
     */
    var DetailRowController = /** @class */ (function () {
        function DetailRowController(vcRef, extApi) {
            var _this = this;
            this.vcRef = vcRef;
            this.extApi = extApi;
            this.viewMap = new Map();
            this.pendingOps = new Map();
            this.deferOps = false;
            this.runMeasure = function () { return _this.extApi.grid.viewport.reMeasureCurrentRenderedContent(); };
            extApi.onInit(function () {
                _this.detailRowDef = extApi.grid.registry.getSingle('detailRow');
                extApi.cdkTable.beforeRenderRows.subscribe(function () { return _this.deferOps = true; });
                extApi.cdkTable.onRenderRows.subscribe(function () { return _this.flushPendingOps(); });
            });
            extApi.grid.registry.changes
                .subscribe(function (changes) {
                var e_1, _a;
                try {
                    for (var changes_1 = __values(changes), changes_1_1 = changes_1.next(); !changes_1_1.done; changes_1_1 = changes_1.next()) {
                        var c = changes_1_1.value;
                        switch (c.type) {
                            case 'detailRow':
                                if (c.op === 'remove') {
                                    _this.detailRowDef = undefined;
                                }
                                else {
                                    _this.detailRowDef = c.value;
                                }
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
            });
        }
        DetailRowController.prototype.render = function (parent, fromRender) {
            if (this.viewMap.has(parent)) {
                this.pendingOps.delete(parent); // if clear, then render we don't want to clear it later
                this.updateDetailRow(parent);
                return true;
            }
            else if (!this.deferOps) {
                return this._render(parent, fromRender);
            }
            else if (parent.context.$implicit && this.detailRowDef) {
                this.pendingOps.set(parent, { type: 'render', fromRender: fromRender });
                return true;
            }
            return false;
        };
        DetailRowController.prototype.clearDetailRow = function (parent, fromRender) {
            var state = this.viewMap.get(parent);
            if (state) {
                if (this.deferOps) {
                    this.pendingOps.set(parent, { type: 'clear', fromRender: fromRender });
                }
                else {
                    this._clearDetailRow(parent, fromRender);
                }
            }
        };
        DetailRowController.prototype.updateDetailRow = function (parent) {
            var state = this.viewMap.get(parent);
            if (state) {
                Object.assign(state.viewRef.context, this.createDetailRowContext(parent, true));
                state.viewRef.detectChanges();
            }
        };
        DetailRowController.prototype.getDetailRowHeight = function (parent) {
            var e_2, _a;
            var total = 0;
            var state = this.viewMap.get(parent);
            if (state) {
                try {
                    for (var _b = __values(state.viewRef.rootNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var e = _c.value;
                        total += e.getBoundingClientRect().height;
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            return total;
        };
        DetailRowController.prototype.detectChanges = function (parent) {
            var state = this.viewMap.get(parent);
            if (state) {
                state.viewRef.detectChanges();
            }
        };
        DetailRowController.prototype.createDetailRowContext = function (parent, fromRender) {
            var _this = this;
            return {
                $implicit: parent.context.$implicit,
                rowContext: parent.context,
                animation: { fromRender: fromRender, end: function () { return _this.checkHasAnimation(fromRender) ? _this.runMeasure() : undefined; }, },
            };
        };
        DetailRowController.prototype.flushPendingOps = function () {
            var e_3, _a, e_4, _b, e_5, _c;
            if (this.deferOps) {
                this.deferOps = false;
                var toRender = [];
                var toClear = [];
                try {
                    for (var _d = __values(this.pendingOps.entries()), _e = _d.next(); !_e.done; _e = _d.next()) {
                        var entry = _e.value;
                        var col = entry[1].type === 'clear' ? toClear : toRender;
                        col.push(entry);
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                this.pendingOps.clear();
                try {
                    for (var toRender_1 = __values(toRender), toRender_1_1 = toRender_1.next(); !toRender_1_1.done; toRender_1_1 = toRender_1.next()) {
                        var _f = __read(toRender_1_1.value, 2), parent = _f[0], op = _f[1];
                        if (this.viewMap.has(parent)) {
                            if (typeof ngDevMode === 'undefined' || ngDevMode) {
                                throw new Error('Invalid detail row state.');
                            }
                            return;
                        }
                        if (toClear.length) {
                            var _g = __read(toClear.pop(), 1), clearParent = _g[0];
                            this.viewMap.set(parent, this.viewMap.get(clearParent));
                            this.viewMap.delete(clearParent);
                            this.insertElementsToRow(parent); // don't detect changes, we'll do it in updateDetailRow
                            this.updateDetailRow(parent);
                            // notify about size changes
                            if (!this.checkHasAnimation(op.fromRender)) {
                                this.runMeasure();
                            }
                        }
                        else {
                            // when no more cleared left for reuse
                            this._render(parent, op.fromRender);
                        }
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (toRender_1_1 && !toRender_1_1.done && (_b = toRender_1.return)) _b.call(toRender_1);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
                try {
                    // remove cleared we can't reuse
                    for (var toClear_1 = __values(toClear), toClear_1_1 = toClear_1.next(); !toClear_1_1.done; toClear_1_1 = toClear_1.next()) {
                        var _h = __read(toClear_1_1.value, 2), parent = _h[0], op = _h[1];
                        this._clearDetailRow(parent, op.fromRender);
                    }
                }
                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                finally {
                    try {
                        if (toClear_1_1 && !toClear_1_1.done && (_c = toClear_1.return)) _c.call(toClear_1);
                    }
                    finally { if (e_5) throw e_5.error; }
                }
            }
        };
        DetailRowController.prototype._render = function (parent, fromRender) {
            if (parent.context.$implicit && this.detailRowDef) {
                var context = this.createDetailRowContext(parent, fromRender);
                this.viewMap.set(parent, { viewRef: this.vcRef.createEmbeddedView(this.detailRowDef.tRef, context) });
                this.insertElementsToRow(parent, true);
                // notify about size changes
                if (!this.checkHasAnimation(fromRender)) {
                    this.runMeasure();
                }
                return true;
            }
            return false;
        };
        DetailRowController.prototype._clearDetailRow = function (parent, fromRender) {
            var state = this.viewMap.get(parent);
            if (state) {
                var viewRef = state.viewRef;
                if (viewRef.context.animation.fromRender !== fromRender) {
                    viewRef.context.animation.fromRender = fromRender;
                    viewRef.detectChanges();
                }
                viewRef.destroy();
                if (!this.checkHasAnimation(fromRender)) {
                    this.runMeasure();
                }
                this.viewMap.delete(parent);
            }
        };
        DetailRowController.prototype.insertElementsToRow = function (parent, detectChanges) {
            var e_6, _a;
            var viewRef = this.viewMap.get(parent).viewRef;
            var beforeNode = parent.element.nextSibling;
            try {
                for (var _b = __values(viewRef.rootNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var e = _c.value;
                    parent.element.parentElement.insertBefore(e, beforeNode);
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_6) throw e_6.error; }
            }
            if (detectChanges) {
                viewRef.detectChanges();
            }
        };
        DetailRowController.prototype.checkHasAnimation = function (fromRender) {
            return this.detailRowDef.hasAnimation === 'always' || (this.detailRowDef.hasAnimation === 'interaction' && !fromRender);
        };
        return DetailRowController;
    }());

    var ROW_WHEN_TRUE = function () { return true; };
    var ROW_WHEN_FALSE = function () { return false; };
    function toggleDetailRow(grid, row, forceState) {
        var controller = i1.PblNgridPluginController.find(grid);
        if (controller) {
            var plugin = controller.getPlugin(PLUGIN_KEY);
            if (plugin) {
                return plugin.toggleDetailRow(row, forceState);
            }
        }
    }
    var PblNgridDetailRowPluginDirective = /** @class */ (function () {
        function PblNgridDetailRowPluginDirective(vcRef, pluginCtrl, ngZone, injector) {
            var _this = this;
            this.pluginCtrl = pluginCtrl;
            this.ngZone = ngZone;
            this.injector = injector;
            /**
             * Set the behavior when the row's context is changed while the detail row is opened  (another row is displayed in place of the current row) or closed.
             *
             * - context: use the context to determine if to open or close the detail row
             * - ignore: don't do anything, leave as is (for manual intervention)
             * - close: close the detail row
             * - render: re-render the row with the new context
             *
             * The default behavior is `context`
             *
             * This scenario will pop-up when using pagination and the user move between pages or change the page size.
             * It might also happen when the data is updated due to custom refresh calls on the datasource or any other scenario that might invoke a datasource update.
             *
             * The `ignore` phase, when used, will not trigger an update, leaving the detail row opened and showing data from the previous row.
             * The `ignore` is intended for use with `toggledRowContextChange`, which will emit when the row context has changed, this will allow the developer to
             * toggle the row (mimic `close`) or update the context manually. For example, if toggling open the detail row invokes a "fetch" operation that retrieves data for the detail row
             * this will allow updates on context change.
             *
             * Usually, what you will want is "context" (the default) which will remember the last state of the row and open it based on it.
             *
             * > Note that for "context" to work you need to use a datasource in client side mode and it must have a primary/identity column (pIndex) or it will not be able to identify the rows.
             *
             * > Note that `toggledRowContextChange` fires regardless of the value set in `whenContextChange`
             */
            this.whenContextChange = 'context';
            /**
             * Emits whenever a detail row instance is toggled on/off
             * Emits an event handler with the row, the toggle state and a toggle operation method.
             */
            this.toggleChange = new i0.EventEmitter();
            /**
             * Emits whenever the row context has changed while the row is toggled open.
             * This scenario is unique and will occur only when a detail row is opened AND the parent row has changed.
             *
             * For example, when using pagination and the user navigates to the next/previous set or when the rows per page size is changed.
             * It might also occur when the data is updated due to custom refresh calls on the datasource or any other scenario that might invoke a datasource update.
             *
             * Emits an event handler with the row, the toggle state and a toggle operation method.
             */
            this.toggledRowContextChange = new i0.EventEmitter();
            this._isSimpleRow = ROW_WHEN_TRUE;
            this._isDetailRow = ROW_WHEN_FALSE;
            this._detailRowRows = new Set();
            this._removePlugin = pluginCtrl.setPlugin(PLUGIN_KEY, this);
            this.grid = pluginCtrl.extApi.grid;
            this.detailRowCtrl = new DetailRowController(vcRef, pluginCtrl.extApi);
            pluginCtrl.onInit()
                .subscribe(function () {
                pluginCtrl.ensurePlugin('targetEvents'); // Depends on target-events plugin
                _this.grid.registry.changes
                    .subscribe(function (changes) {
                    var e_1, _b;
                    try {
                        for (var changes_1 = __values(changes), changes_1_1 = changes_1.next(); !changes_1_1.done; changes_1_1 = changes_1.next()) {
                            var c = changes_1_1.value;
                            switch (c.type) {
                                case 'detailRowParent':
                                    if (c.op === 'remove') {
                                        _this.pluginCtrl.extApi.cdkTable.removeRowDef(c.value);
                                        _this._detailRowDef = undefined;
                                    }
                                    _this.setupDetailRowParent();
                                    break;
                            }
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (changes_1_1 && !changes_1_1.done && (_b = changes_1.return)) _b.call(changes_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                });
                // if we start with an initial value, then update the grid cause we didn't do that
                // when it was set (we cant cause we're not init)
                // otherwise just setup the parent.
                if (_this._detailRow) {
                    _this.updateTable();
                }
                else {
                    _this.setupDetailRowParent();
                }
            });
        }
        Object.defineProperty(PblNgridDetailRowPluginDirective.prototype, "detailRow", {
            /**
             * Detail row control (none / all rows / selective rows)
             *
             * A detail row is an additional row added below a row rendered with the context of the row above it.
             *
             * You can enable/disable detail row for the entire grid by setting `detailRow` to true/false respectively.
             * To control detail row per row, provide a predicate.
             */
            get: function () { return this._detailRow; },
            set: function (value) {
                if (this._detailRow !== value) {
                    var grid = this.grid;
                    if (typeof value === 'function') {
                        this._isSimpleRow = function (index, rowData) { return !value(index, rowData); };
                        this._isDetailRow = value;
                    }
                    else {
                        value = coercion.coerceBooleanProperty(value);
                        this._isDetailRow = value ? ROW_WHEN_TRUE : ROW_WHEN_FALSE;
                        this._isSimpleRow = value ? ROW_WHEN_FALSE : ROW_WHEN_TRUE;
                    }
                    this._detailRow = value;
                    if (grid.isInit) {
                        this.updateTable();
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblNgridDetailRowPluginDirective.prototype, "singleDetailRow", {
            set: function (value) {
                var e_2, _b;
                value = coercion.coerceBooleanProperty(value);
                if (this._forceSingle !== value) {
                    this._forceSingle = value;
                    if (value && this._openedRow && this._openedRow.expended) {
                        try {
                            for (var _c = __values(this._detailRowRows), _d = _c.next(); !_d.done; _d = _c.next()) {
                                var detailRow = _d.value;
                                if (detailRow.context.$implicit !== this._openedRow.row) {
                                    detailRow.toggle(false);
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
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        PblNgridDetailRowPluginDirective.prototype.addDetailRow = function (detailRow) {
            this._detailRowRows.add(detailRow);
        };
        PblNgridDetailRowPluginDirective.prototype.removeDetailRow = function (detailRow) {
            this._detailRowRows.delete(detailRow);
        };
        PblNgridDetailRowPluginDirective.prototype.toggleDetailRow = function (row, forceState) {
            var e_3, _b;
            try {
                for (var _c = __values(this._detailRowRows), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var detailRow = _d.value;
                    if (detailRow.context.$implicit === row) {
                        detailRow.toggle(forceState);
                        return detailRow.expended;
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                }
                finally { if (e_3) throw e_3.error; }
            }
        };
        PblNgridDetailRowPluginDirective.prototype.markForCheck = function () {
            var _this = this;
            if (!this._cdPending) {
                this._cdPending = true;
                this.ngZone.runOutsideAngular(function () { return Promise.resolve()
                    .then(function () {
                    _this.ngZone.run(function () {
                        var _a;
                        _this._cdPending = false;
                        (_a = _this._defaultParentRef) === null || _a === void 0 ? void 0 : _a.changeDetectorRef.markForCheck();
                    });
                }); });
            }
        };
        PblNgridDetailRowPluginDirective.prototype.ngOnDestroy = function () {
            if (this._defaultParentRef) {
                this._defaultParentRef.destroy();
            }
            this._removePlugin(this.grid);
        };
        /** @internal */
        PblNgridDetailRowPluginDirective.prototype.detailRowToggled = function (event) {
            // logic for closing previous row
            var isSelf = this._openedRow && this._openedRow.row === event.row;
            if (event.expended) {
                if (this._forceSingle && this._openedRow && this._openedRow.expended && !isSelf) {
                    this._openedRow.toggle();
                }
                this._openedRow = event;
            }
            else if (isSelf) {
                this._openedRow = undefined;
            }
            this.toggleChange.emit(event);
        };
        PblNgridDetailRowPluginDirective.prototype.setupDetailRowParent = function () {
            var _this = this;
            var grid = this.grid;
            var cdkTable = this.pluginCtrl.extApi.cdkTable;
            if (this._detailRowDef) {
                cdkTable.removeRowDef(this._detailRowDef);
                this._detailRowDef = undefined;
            }
            if (this.detailRow) {
                var detailRow = this.pluginCtrl.extApi.registry.getSingle('detailRowParent');
                if (detailRow) {
                    this._detailRowDef = detailRow = detailRow.clone();
                    Object.defineProperty(detailRow, 'when', { enumerable: true, get: function () { return _this._isDetailRow; } });
                }
                else if (!this._defaultParentRef) {
                    // We don't have a template in the registry, so we register the default component which will push a new template to the registry
                    // TODO: move to module? set in root registry? put elsewhere to avoid grid sync (see event of registry change)...
                    this._defaultParentRef = this.injector.get(i0.ComponentFactoryResolver)
                        .resolveComponentFactory(PblNgridDefaultDetailRowParentComponent)
                        .create(this.injector);
                    this._defaultParentRef.changeDetectorRef.detectChanges(); // kick it for immediate emission of the registry value
                    return;
                }
            }
            this.resetTableRowDefs();
        };
        PblNgridDetailRowPluginDirective.prototype.resetTableRowDefs = function () {
            if (this._detailRowDef) {
                this._detailRow === false
                    ? this.pluginCtrl.extApi.cdkTable.removeRowDef(this._detailRowDef)
                    : this.pluginCtrl.extApi.cdkTable.addRowDef(this._detailRowDef);
            }
        };
        /**
         * Update the grid with detail row info.
         * Instead of calling for a change detection cycle we can assign the new predicates directly to the pblNgridRowDef instances.
         */
        PblNgridDetailRowPluginDirective.prototype.updateTable = function () {
            this.grid._tableRowDef.when = this._isSimpleRow;
            this.setupDetailRowParent();
            // Once we changed the `when` predicate on the `CdkRowDef` we must:
            //   1. Update the row cache (property `rowDefs`) to reflect the new change
            this.pluginCtrl.extApi.cdkTable.updateRowDefCache();
            //   2. re-render all rows.
            // The logic for re-rendering all rows is handled in `CdkTable._forceRenderDataRows()` which is a private method.
            // This is a workaround, assigning to `multiTemplateDataRows` will invoke the setter which
            // also calls `CdkTable._forceRenderDataRows()`
            // TODO: This is risky, the setter logic might change.
            // for example, if material will chack for change in `multiTemplateDataRows` setter from previous value...
            this.pluginCtrl.extApi.cdkTable.multiTemplateDataRows = !!this._detailRow;
        };
        return PblNgridDetailRowPluginDirective;
    }());
    /** @nocollapse */ PblNgridDetailRowPluginDirective.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridDetailRowPluginDirective, deps: [{ token: i0__namespace.ViewContainerRef }, { token: i1__namespace.PblNgridPluginController }, { token: i0__namespace.NgZone }, { token: i0__namespace.Injector }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ PblNgridDetailRowPluginDirective.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridDetailRowPluginDirective, selector: "pbl-ngrid[detailRow]", inputs: { detailRow: "detailRow", singleDetailRow: "singleDetailRow", excludeToggleFrom: "excludeToggleFrom", whenContextChange: "whenContextChange" }, outputs: { toggleChange: "toggleChange", toggledRowContextChange: "toggledRowContextChange" }, exportAs: ["pblNgridDetailRow"], ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridDetailRowPluginDirective, decorators: [{
                type: i0.Directive,
                args: [{ selector: 'pbl-ngrid[detailRow]', exportAs: 'pblNgridDetailRow' }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ViewContainerRef }, { type: i1__namespace.PblNgridPluginController }, { type: i0__namespace.NgZone }, { type: i0__namespace.Injector }]; }, propDecorators: { detailRow: [{
                    type: i0.Input
                }], singleDetailRow: [{
                    type: i0.Input
                }], excludeToggleFrom: [{
                    type: i0.Input
                }], whenContextChange: [{
                    type: i0.Input
                }], toggleChange: [{
                    type: i0.Output
                }], toggledRowContextChange: [{
                    type: i0.Output
                }] } });
    /**
     * Use to set the a default `pblNgridDetailRowParentRef` if the user did not set one.
     * @internal
     */
    var PblNgridDefaultDetailRowParentComponent = /** @class */ (function () {
        function PblNgridDefaultDetailRowParentComponent() {
        }
        return PblNgridDefaultDetailRowParentComponent;
    }());
    /** @nocollapse */ PblNgridDefaultDetailRowParentComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridDefaultDetailRowParentComponent, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    /** @nocollapse */ PblNgridDefaultDetailRowParentComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridDefaultDetailRowParentComponent, selector: "pbl-ngrid-default-detail-row-parent", ngImport: i0__namespace, template: "<pbl-ngrid-row *pblNgridDetailRowParentRef=\"let row;\" detailRow></pbl-ngrid-row>", isInline: true, components: [{ type: PblNgridDetailRowComponent, selector: "pbl-ngrid-row[detailRow]", exportAs: ["pblNgridDetailRow"] }], directives: [{ type: PblNgridDetailRowParentRefDirective, selector: "[pblNgridDetailRowParentRef]", inputs: ["pblNgridDetailRowParentRef", "pblNgridDetailRowParentRefWhen"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridDefaultDetailRowParentComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'pbl-ngrid-default-detail-row-parent',
                        template: "<pbl-ngrid-row *pblNgridDetailRowParentRef=\"let row;\" detailRow></pbl-ngrid-row>",
                    }]
            }] });

    var DETAIL_ROW = [
        PblNgridDetailRowPluginDirective,
        PblNgridDetailRowComponent,
        PblNgridDetailRowParentRefDirective,
        PblNgridDetailRowDefDirective,
    ];
    var PblNgridDetailRowModule = /** @class */ (function () {
        function PblNgridDetailRowModule() {
        }
        return PblNgridDetailRowModule;
    }());
    PblNgridDetailRowModule.NGRID_PLUGIN = i1.ngridPlugin({ id: PLUGIN_KEY }, PblNgridDetailRowPluginDirective);
    /** @nocollapse */ PblNgridDetailRowModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridDetailRowModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    /** @nocollapse */ PblNgridDetailRowModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridDetailRowModule, declarations: [PblNgridDetailRowPluginDirective,
            PblNgridDetailRowComponent,
            PblNgridDetailRowParentRefDirective,
            PblNgridDetailRowDefDirective, PblNgridDefaultDetailRowParentComponent], imports: [common.CommonModule, table.CdkTableModule, i1.PblNgridModule, targetEvents.PblNgridTargetEventsModule], exports: [PblNgridDetailRowPluginDirective,
            PblNgridDetailRowComponent,
            PblNgridDetailRowParentRefDirective,
            PblNgridDetailRowDefDirective] });
    /** @nocollapse */ PblNgridDetailRowModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridDetailRowModule, imports: [[common.CommonModule, table.CdkTableModule, i1.PblNgridModule, targetEvents.PblNgridTargetEventsModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridDetailRowModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [common.CommonModule, table.CdkTableModule, i1.PblNgridModule, targetEvents.PblNgridTargetEventsModule],
                        declarations: [DETAIL_ROW, PblNgridDefaultDetailRowParentComponent],
                        exports: [DETAIL_ROW],
                        // TODO(REFACTOR_REF 2): remove when ViewEngine is no longer supported by angular (V12 ???)
                        entryComponents: [PblNgridDetailRowComponent, PblNgridDefaultDetailRowParentComponent],
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.PblNgridDetailRowComponent = PblNgridDetailRowComponent;
    exports.PblNgridDetailRowDefDirective = PblNgridDetailRowDefDirective;
    exports.PblNgridDetailRowModule = PblNgridDetailRowModule;
    exports.PblNgridDetailRowParentRefDirective = PblNgridDetailRowParentRefDirective;
    exports.PblNgridDetailRowPluginDirective = PblNgridDetailRowPluginDirective;
    exports.toggleDetailRow = toggleDetailRow;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=pebula-ngrid-detail-row.umd.js.map
