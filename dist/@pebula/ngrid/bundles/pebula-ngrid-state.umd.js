(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@pebula/ngrid'), require('rxjs'), require('rxjs/operators'), require('@angular/core'), require('@pebula/ngrid/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@pebula/ngrid/state', ['exports', '@pebula/ngrid', 'rxjs', 'rxjs/operators', '@angular/core', '@pebula/ngrid/core', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.pebula = global.pebula || {}, global.pebula.ngrid = global.pebula.ngrid || {}, global.pebula.ngrid.state = {}), global.pebula.ngrid, global.rxjs, global.rxjs.operators, global.ng.core, global.pebula.ngrid.core, global.ng.common));
}(this, (function (exports, i1, rxjs, operators, i0, i1$1, common) { 'use strict';

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

    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);
    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var i1__namespace$1 = /*#__PURE__*/_interopNamespace(i1$1);

    var _instance;
    var StateVisor = /** @class */ (function () {
        function StateVisor() {
            this.rootChunkSections = new Map();
            this.chunkHandlers = new Map();
        }
        StateVisor.get = function () { return _instance || (_instance = new StateVisor()); };
        StateVisor.prototype.registerRootChunkSection = function (chunkId, config) {
            if (!this.rootChunkSections.has(chunkId)) {
                this.rootChunkSections.set(chunkId, config);
            }
        };
        StateVisor.prototype.registerChunkHandlerDefinition = function (chunkHandlerDefs) {
            var chunkId = chunkHandlerDefs.chunkId;
            var handlersForGroup = this.chunkHandlers.get(chunkId) || [];
            handlersForGroup.push(chunkHandlerDefs);
            this.chunkHandlers.set(chunkId, handlersForGroup);
        };
        StateVisor.prototype.getRootSections = function () {
            return Array.from(this.rootChunkSections.entries());
        };
        StateVisor.prototype.getDefinitionsForSection = function (chunkId) {
            return this.chunkHandlers.get(chunkId) || [];
        };
        return StateVisor;
    }());
    var stateVisor = StateVisor.get();

    var PblNgridLocalStoragePersistAdapter = /** @class */ (function () {
        function PblNgridLocalStoragePersistAdapter() {
        }
        PblNgridLocalStoragePersistAdapter.prototype.save = function (id, state) {
            try {
                var store = this.loadGlobalStateStore();
                store[id] = state;
                if (!state.__metadata__) {
                    state.__metadata__ = {};
                }
                state.__metadata__.updatedAt = new Date().toISOString();
                this.saveGlobalStateStore(store);
                return Promise.resolve();
            }
            catch (err) {
                return Promise.reject(err);
            }
        };
        PblNgridLocalStoragePersistAdapter.prototype.load = function (id) {
            return Promise.resolve(this.loadGlobalStateStore()[id] || {});
        };
        PblNgridLocalStoragePersistAdapter.prototype.exists = function (id) {
            var store = this.loadGlobalStateStore() || {};
            return Promise.resolve(id in store);
        };
        PblNgridLocalStoragePersistAdapter.prototype.loadGlobalStateStore = function () {
            var raw = localStorage.getItem(PblNgridLocalStoragePersistAdapter.globalStateKey);
            return raw ? JSON.parse(raw) : {};
        };
        PblNgridLocalStoragePersistAdapter.prototype.saveGlobalStateStore = function (store) {
            localStorage.setItem(PblNgridLocalStoragePersistAdapter.globalStateKey, JSON.stringify(store));
        };
        return PblNgridLocalStoragePersistAdapter;
    }());
    PblNgridLocalStoragePersistAdapter.globalStateKey = 'pebulaNgridState';

    /* ======================= Global State Object */

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

    var PblNgridStateChunkHandlerHost = /** @class */ (function () {
        function PblNgridStateChunkHandlerHost(chunkId) {
            this.chunkId = chunkId;
            this.keys = new Set();
            this.rKeys = new Set();
        }
        PblNgridStateChunkHandlerHost.prototype.handleKeys = function () {
            var e_1, _a;
            var keys = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                keys[_i] = arguments[_i];
            }
            try {
                for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                    var k = keys_1_1.value;
                    this.keys.add(k);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return this;
        };
        /**
         * Required keys are keys that cannot get excluded.
         * Either by adding the to the `exclude` option or by omitting them from the `include` option.
         */
        PblNgridStateChunkHandlerHost.prototype.requiredKeys = function () {
            var e_2, _a;
            var keys = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                keys[_i] = arguments[_i];
            }
            try {
                for (var keys_2 = __values(keys), keys_2_1 = keys_2.next(); !keys_2_1.done; keys_2_1 = keys_2.next()) {
                    var k = keys_2_1.value;
                    this.keys.add(k);
                    this.rKeys.add(k);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (keys_2_1 && !keys_2_1.done && (_a = keys_2.return)) _a.call(keys_2);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return this;
        };
        PblNgridStateChunkHandlerHost.prototype.serialize = function (fn) {
            this.sFn = fn;
            return this;
        };
        PblNgridStateChunkHandlerHost.prototype.deserialize = function (fn) {
            this.dFn = fn;
            return this;
        };
        PblNgridStateChunkHandlerHost.prototype.register = function () {
            if (this.keys.size === 0) {
                if (typeof ngDevMode === 'undefined' || ngDevMode) {
                    throw new Error('Invalid state chunk handler, no keys defined.');
                }
                return;
            }
            if (!this.sFn) {
                if (typeof ngDevMode === 'undefined' || ngDevMode) {
                    throw new Error('Invalid state chunk handler, missing serialize handler.');
                }
                return;
            }
            if (!this.dFn) {
                if (typeof ngDevMode === 'undefined' || ngDevMode) {
                    throw new Error('Invalid state chunk handler, missing deserialize handler.');
                }
                return;
            }
            stateVisor.registerChunkHandlerDefinition({
                chunkId: this.chunkId,
                keys: Array.from(this.keys.values()),
                rKeys: Array.from(this.rKeys.values()),
                serialize: this.sFn,
                deserialize: this.dFn,
            });
        };
        return PblNgridStateChunkHandlerHost;
    }());
    function createStateChunkHandler(section) {
        return new PblNgridStateChunkHandlerHost(section);
    }

    var PblNgridIdAttributeIdentResolver = /** @class */ (function () {
        function PblNgridIdAttributeIdentResolver() {
        }
        PblNgridIdAttributeIdentResolver.prototype.resolveId = function (ctx) {
            return ctx.grid.id;
        };
        return PblNgridIdAttributeIdentResolver;
    }());

    function resolveId(grid, options) {
        var id = options.identResolver.resolveId(createChunkSectionContext(grid, options));
        if (!id) {
            if (typeof ngDevMode === 'undefined' || ngDevMode) {
                throw new Error('Could not resolve a unique id for an ngrid instance, state is disabled');
            }
        }
        return id;
    }
    function serialize(def, state, ctx) {
        var e_1, _a;
        var keyPredicate = stateKeyPredicateFactory(def.chunkId, ctx.options);
        try {
            for (var _b = __values(def.keys), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                if (!keyPredicate || def.rKeys.indexOf(key) > -1 || keyPredicate(key)) {
                    state[key] = def.serialize(key, ctx);
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
    }
    function deserialize(def, state, ctx) {
        var e_2, _a;
        var keyPredicate = stateKeyPredicateFactory(def.chunkId, ctx.options);
        try {
            for (var _b = __values(def.keys), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                if (key in state) {
                    if (!keyPredicate || def.rKeys.indexOf(key) > -1 || keyPredicate(key)) {
                        def.deserialize(key, state[key], ctx);
                    }
                }
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
    function normalizeOptions(mode, options) {
        if (!options) {
            options = {};
        }
        if (!options.persistenceAdapter) {
            options.persistenceAdapter = new PblNgridLocalStoragePersistAdapter();
        }
        if (!options.identResolver) {
            options.identResolver = new PblNgridIdAttributeIdentResolver();
        }
        if (mode === 'load') {
            var opt = options;
            if (!opt.strategy) {
                opt.strategy = 'overwrite';
            }
        }
        return options;
    }
    function getExtApi(grid) {
        var controller = i1.PblNgridPluginController.find(grid);
        if (controller) {
            return controller.extApi;
        }
    }
    function createChunkSectionContext(grid, options) {
        return { grid: grid, extApi: getExtApi(grid), options: options };
    }
    function createChunkContext(sectionContext, chunkConfig, mode) {
        return Object.assign(Object.assign({}, sectionContext), { source: chunkConfig.sourceMatcher(sectionContext), runChildChunk: function (childChunkId, state, source, data) {
                var e_3, _a;
                var childContext = Object.assign(Object.assign({}, sectionContext), { source: source, data: data });
                var defs = stateVisor.getDefinitionsForSection(childChunkId);
                var action = mode === 'serialize' ? serialize : deserialize;
                try {
                    for (var defs_1 = __values(defs), defs_1_1 = defs_1.next(); !defs_1_1.done; defs_1_1 = defs_1.next()) {
                        var def = defs_1_1.value;
                        action(def, state, childContext);
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (defs_1_1 && !defs_1_1.done && (_a = defs_1.return)) _a.call(defs_1);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            } });
    }
    function stateKeyPredicateFactory(chunkId, options, rootPredicate) {
        if (rootPredicate === void 0) { rootPredicate = false; }
        // TODO: chunkId ans options include/exclude combination does not change
        // we need to cache it... e.g. each column def will create a new predicate if we don't cache.
        var filter = options.include || options.exclude;
        if (filter) {
            // -1: Exclude, 1: Include
            var mode = filter === options.include ? 1 : -1;
            var chunkFilter_1 = filter[chunkId];
            if (typeof chunkFilter_1 === 'boolean') {
                return mode === 1
                    ? function (key) { return chunkFilter_1; }
                    : function (key) { return !chunkFilter_1; };
            }
            else if (Array.isArray(chunkFilter_1)) {
                if (rootPredicate) {
                    // root predicate is for RootStateChunks and when set to true
                    // the key itself has no impact on the predicate. If the filter is boolean nothing changes
                    // but if it's an array, the array is ignored and considered as true ignoring the key because a key does not existing when checking the root
                    return function (k) { return true; };
                }
                else {
                    return mode === 1
                        ? function (key) { return chunkFilter_1.indexOf(key) > -1; }
                        : function (key) { return chunkFilter_1.indexOf(key) === -1; };
                }
            }
            else if (mode === 1) {
                return function (key) { return false; };
            }
        }
    }

    function hasState(grid, options) {
        return Promise.resolve()
            .then(function () {
            options = normalizeOptions('save', options);
            var id = resolveId(grid, options);
            return options.persistenceAdapter.exists(id);
        });
    }
    function saveState(grid, options) {
        return Promise.resolve()
            .then(function () {
            var e_1, _a, e_2, _b;
            options = normalizeOptions('save', options);
            var id = resolveId(grid, options);
            var state = {};
            var context = createChunkSectionContext(grid, options);
            try {
                for (var _c = __values(stateVisor.getRootSections()), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var _e = __read(_d.value, 2), chunkId = _e[0], chunkConfig = _e[1];
                    var keyPredicate = stateKeyPredicateFactory(chunkId, options, true);
                    if (!keyPredicate || keyPredicate(chunkId)) {
                        var sectionState = chunkConfig.stateMatcher(state);
                        var chunkContext = createChunkContext(context, chunkConfig, 'serialize');
                        var defs = stateVisor.getDefinitionsForSection(chunkId);
                        try {
                            for (var defs_1 = (e_2 = void 0, __values(defs)), defs_1_1 = defs_1.next(); !defs_1_1.done; defs_1_1 = defs_1.next()) {
                                var def = defs_1_1.value;
                                serialize(def, sectionState, chunkContext);
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (defs_1_1 && !defs_1_1.done && (_b = defs_1.return)) _b.call(defs_1);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return options.persistenceAdapter.save(id, state);
        });
    }
    function loadState(grid, options) {
        return Promise.resolve()
            .then(function () {
            options = normalizeOptions('load', options);
            var id = resolveId(grid, options);
            return options.persistenceAdapter.load(id)
                .then(function (state) {
                var e_3, _a, e_4, _b;
                var context = createChunkSectionContext(grid, options);
                try {
                    for (var _c = __values(stateVisor.getRootSections()), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var _e = __read(_d.value, 2), chunkId = _e[0], chunkConfig = _e[1];
                        var keyPredicate = stateKeyPredicateFactory(chunkId, options, true);
                        if (!keyPredicate || keyPredicate(chunkId)) {
                            var sectionState = chunkConfig.stateMatcher(state);
                            var chunkContext = createChunkContext(context, chunkConfig, 'deserialize');
                            var defs = stateVisor.getDefinitionsForSection(chunkId);
                            try {
                                for (var defs_2 = (e_4 = void 0, __values(defs)), defs_2_1 = defs_2.next(); !defs_2_1.done; defs_2_1 = defs_2.next()) {
                                    var def = defs_2_1.value;
                                    deserialize(def, sectionState, chunkContext);
                                }
                            }
                            catch (e_4_1) { e_4 = { error: e_4_1 }; }
                            finally {
                                try {
                                    if (defs_2_1 && !defs_2_1.done && (_b = defs_2.return)) _b.call(defs_2);
                                }
                                finally { if (e_4) throw e_4.error; }
                            }
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                return state;
            });
        });
    }

    function registerGridHandlers() {
        stateVisor.registerRootChunkSection('grid', {
            sourceMatcher: function (ctx) { return ctx.grid; },
            stateMatcher: function (state) { return state.grid || (state.grid = {}); }
        });
        createStateChunkHandler('grid')
            .handleKeys('showHeader', 'showFooter', 'focusMode', 'usePagination', 'minDataViewHeight')
            .serialize(function (key, ctx) {
            switch (key) {
                default:
                    return ctx.source[key];
            }
        })
            .deserialize(function (key, stateValue, ctx) {
            // We must assert the type starting from 3.5 onwards
            // See "Fixes to unsound writes to indexed access types" in https://devblogs.microsoft.com/typescript/announcing-typescript-3-5
            ctx.source[key] = stateValue;
        })
            .register();
    }

    function registerColumnDefChildHandlers() {
        /* ====================================================================================================================================================== */
        createStateChunkHandler('dataColumn')
            .requiredKeys('id', 'prop')
            .handleKeys('label', 'css', 'type', 'width', 'minWidth', 'maxWidth', // PblNgridBaseColumnState (all optional)
        'headerType', 'footerType', 'sort', 'alias', 'editable', 'pin')
            .serialize(function (key, ctx) {
            var c = ctx.data.activeColumn || ctx.data.pblColumn;
            if (c) {
                switch (key) {
                    case 'prop':
                        return c.orgProp;
                    default:
                        break;
                }
            }
            var value = c ? c[key] : ctx.source[key];
            switch (key) {
                case 'sort':
                    if (typeof value === 'boolean') {
                        return value;
                    }
                    else {
                        return;
                    }
                default:
                    break;
            }
            return value;
        })
            .deserialize(function (key, stateValue, ctx) {
            var activeColumn = ctx.data.activeColumn;
            if (activeColumn) {
                switch (key) {
                    case 'width':
                        activeColumn.updateWidth(stateValue);
                        break;
                }
            }
            if (ctx.source) {
                switch (key) {
                    case 'prop':
                        return;
                    case 'type':
                    case 'headerType':
                    case 'footerType':
                        var typeValue = ctx.source[key];
                        var stateTypeDef = stateValue;
                        if (stateTypeDef && typeof stateTypeDef !== 'string' && typeValue && typeof typeValue !== 'string') {
                            typeValue.name = stateTypeDef.name;
                            if (stateTypeDef.data) {
                                typeValue.data = Object.assign(typeValue.data || {}, stateTypeDef.data);
                            }
                            return;
                        }
                        break;
                }
                // We must assert the type starting from 3.5 onwards
                // See "Fixes to unsound writes to indexed access types" in https://devblogs.microsoft.com/typescript/announcing-typescript-3-5
                ctx.source[key] = stateValue;
            }
        })
            .register();
        /* ====================================================================================================================================================== */
        createStateChunkHandler('dataMetaRow')
            .handleKeys('rowClassName', 'type') // All Optional
            .serialize(function (key, ctx) {
            var active = ctx.data.active || ctx.source;
            if (active) {
                return active[key];
            }
        })
            .deserialize(function (key, stateValue, ctx) {
            // We must assert the type starting from 3.5 onwards
            // See "Fixes to unsound writes to indexed access types" in https://devblogs.microsoft.com/typescript/announcing-typescript-3-5
            ctx.source[key] = stateValue;
        })
            .register();
        /* ====================================================================================================================================================== */
        createStateChunkHandler('metaRow')
            // Note that we are not handling `cols`, this should be called from the parent, as a different child chunk handling process for each column
            .handleKeys('rowClassName', 'type', // All Optional like dataMetaRow
        'rowIndex')
            .serialize(function (key, ctx) {
            return ctx.source[key];
        })
            .deserialize(function (key, stateValue, ctx) {
        })
            .register();
        /* ====================================================================================================================================================== */
        createStateChunkHandler('metaGroupRow')
            // Note that we are not handling `cols`, this should be called from the parent, as a different child chunk handling process for each column
            .handleKeys('rowClassName', 'type', // All Optional like dataMetaRow
        'rowIndex')
            .serialize(function (key, ctx) {
            return ctx.source[key];
        })
            .deserialize(function (key, stateValue, ctx) {
        })
            .register();
        /* ====================================================================================================================================================== */
        createStateChunkHandler('metaColumn')
            .requiredKeys('kind', 'rowIndex')
            .handleKeys('id', 'label', 'css', 'type', 'width', 'minWidth', 'maxWidth')
            .serialize(function (key, ctx) {
            return ctx.source[key];
        })
            .deserialize(function (key, stateValue, ctx) {
        })
            .register();
        /* ====================================================================================================================================================== */
        createStateChunkHandler('metaGroupColumn')
            .requiredKeys('columnIds', 'rowIndex')
            .handleKeys('id', 'label', 'css', 'type', 'width', 'minWidth', 'maxWidth')
            .serialize(function (key, ctx) {
            return ctx.source[key];
        })
            .deserialize(function (key, stateValue, ctx) {
        })
            .register();
    }

    function runChildChunksForRowMetaColumns(childChunkId, ctx, columns) {
        var e_1, _a;
        var stateColumns = [];
        try {
            for (var columns_1 = __values(columns), columns_1_1 = columns_1.next(); !columns_1_1.done; columns_1_1 = columns_1.next()) {
                var col = columns_1_1.value;
                var c = {};
                ctx.runChildChunk(childChunkId, c, col);
                stateColumns.push(c);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (columns_1_1 && !columns_1_1.done && (_a = columns_1.return)) _a.call(columns_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return stateColumns;
    }
    /** Runs the process for the `header` and `footer` sections in the `table` section (if they exist) */
    function runChildChunkForDataMetaRows(mode, state, ctx) {
        var e_2, _a;
        var columnStore = ctx.extApi.columnStore;
        var table = ctx.source.table;
        try {
            for (var _b = __values(['header', 'footer']), _c = _b.next(); !_c.done; _c = _b.next()) {
                var kind = _c.value;
                // This is a mapping of the from->to relationship (i.e serializing or deserializing)
                var src = mode === 's' ? table : state;
                var dest = src === table ? state : table;
                // we need to have a source
                if (src[kind]) {
                    var active = kind === 'header' ? columnStore.headerColumnDef : columnStore.footerColumnDef;
                    if (!dest[kind]) {
                        dest[kind] = {};
                    }
                    ctx.runChildChunk('dataMetaRow', state[kind], table[kind], { kind: kind, active: active });
                }
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
    function runChildChunksForRowDataColumns(mode, state, ctx) {
        var e_3, _a;
        var table = ctx.source.table;
        var src = mode === 's' ? table : state;
        var resolve = src === state
            ? function (col) { return ({ colState: col, pblColumn: table.cols.find(function (tCol) { return (i1.utils.isPblColumn(tCol) && tCol.orgProp === col.prop) || (tCol.id === col.id || tCol.prop === col.prop); }) }); }
            : function (col) { return ({ colState: state.cols[state.cols.push({}) - 1], pblColumn: i1.utils.isPblColumn(col) && col }); };
        if (src.cols && src.cols.length > 0) {
            try {
                for (var _b = __values(src.cols), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var col = _c.value;
                    var _d = resolve(col), colState = _d.colState, pblColumn = _d.pblColumn;
                    var data = {
                        pblColumn: i1.utils.isPblColumn(pblColumn) && pblColumn,
                        activeColumn: ctx.grid.columnApi.findColumn(col.id || col.prop),
                    };
                    ctx.runChildChunk('dataColumn', colState, pblColumn, data);
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
    }
    function registerColumnDefHandlers() {
        stateVisor.registerRootChunkSection('columns', {
            sourceMatcher: function (ctx) { return ctx.grid.columns; },
            stateMatcher: function (state) { return state.columns || (state.columns = {
                table: {
                    cols: [],
                },
                header: [],
                footer: [],
                headerGroup: [],
            }); }
        });
        createStateChunkHandler('columns')
            .handleKeys('table', 'header', 'headerGroup', 'footer')
            .serialize(function (key, ctx) {
            var e_4, _a, e_5, _b;
            switch (key) {
                case 'table':
                    var state = { cols: [] };
                    runChildChunkForDataMetaRows('s', state, ctx);
                    runChildChunksForRowDataColumns('s', state, ctx);
                    return state;
                case 'header':
                case 'footer':
                    var source = ctx.source[key];
                    if (source && source.length > 0) {
                        var rows = [];
                        try {
                            for (var source_1 = __values(source), source_1_1 = source_1.next(); !source_1_1.done; source_1_1 = source_1.next()) {
                                var row = source_1_1.value;
                                var r = {};
                                ctx.runChildChunk('metaRow', r, row);
                                r.cols = runChildChunksForRowMetaColumns('metaColumn', ctx, row.cols);
                                rows.push(r);
                            }
                        }
                        catch (e_4_1) { e_4 = { error: e_4_1 }; }
                        finally {
                            try {
                                if (source_1_1 && !source_1_1.done && (_a = source_1.return)) _a.call(source_1);
                            }
                            finally { if (e_4) throw e_4.error; }
                        }
                        return rows;
                    }
                    break;
                case 'headerGroup':
                    var headerGroupSource = ctx.source.headerGroup;
                    if (headerGroupSource && headerGroupSource.length > 0) {
                        var rows = [];
                        try {
                            for (var headerGroupSource_1 = __values(headerGroupSource), headerGroupSource_1_1 = headerGroupSource_1.next(); !headerGroupSource_1_1.done; headerGroupSource_1_1 = headerGroupSource_1.next()) {
                                var row = headerGroupSource_1_1.value;
                                var r = {};
                                ctx.runChildChunk('metaGroupRow', r, row);
                                r.cols = runChildChunksForRowMetaColumns('metaColumn', ctx, row.cols);
                                rows.push(r);
                            }
                        }
                        catch (e_5_1) { e_5 = { error: e_5_1 }; }
                        finally {
                            try {
                                if (headerGroupSource_1_1 && !headerGroupSource_1_1.done && (_b = headerGroupSource_1.return)) _b.call(headerGroupSource_1);
                            }
                            finally { if (e_5) throw e_5.error; }
                        }
                        return rows;
                    }
                    break;
            }
        })
            .deserialize(function (key, stateValue, ctx) {
            var e_6, _a;
            switch (key) {
                case 'table':
                    var state = stateValue;
                    runChildChunkForDataMetaRows('d', state, ctx);
                    runChildChunksForRowDataColumns('d', state, ctx);
                    break;
                case 'header':
                case 'footer':
                    var source = ctx.source[key];
                    var metaRowsState = stateValue;
                    if (metaRowsState && metaRowsState.length > 0) {
                        var _loop_1 = function (rowState) {
                            var e_7, _b;
                            var row = source.find(function (r) { return r.rowIndex === rowState.rowIndex; });
                            if (row) {
                                ctx.runChildChunk('metaRow', rowState, row);
                                var _loop_2 = function (colState) {
                                    var col = row.cols.find(function (r) { return r.id === colState.id; });
                                    if (col) {
                                        var activeColStore = ctx.extApi.columnStore.find(colState.id);
                                        ctx.runChildChunk('metaColumn', colState, col);
                                    }
                                };
                                try {
                                    for (var _c = (e_7 = void 0, __values(rowState.cols)), _d = _c.next(); !_d.done; _d = _c.next()) {
                                        var colState = _d.value;
                                        _loop_2(colState);
                                    }
                                }
                                catch (e_7_1) { e_7 = { error: e_7_1 }; }
                                finally {
                                    try {
                                        if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                                    }
                                    finally { if (e_7) throw e_7.error; }
                                }
                            }
                        };
                        try {
                            for (var metaRowsState_1 = __values(metaRowsState), metaRowsState_1_1 = metaRowsState_1.next(); !metaRowsState_1_1.done; metaRowsState_1_1 = metaRowsState_1.next()) {
                                var rowState = metaRowsState_1_1.value;
                                _loop_1(rowState);
                            }
                        }
                        catch (e_6_1) { e_6 = { error: e_6_1 }; }
                        finally {
                            try {
                                if (metaRowsState_1_1 && !metaRowsState_1_1.done && (_a = metaRowsState_1.return)) _a.call(metaRowsState_1);
                            }
                            finally { if (e_6) throw e_6.error; }
                        }
                    }
                    break;
                case 'headerGroup':
                    break;
            }
        })
            .register();
        registerColumnDefChildHandlers();
    }

    function registerColumnOrderHandlers() {
        stateVisor.registerRootChunkSection('columnOrder', {
            sourceMatcher: function (ctx) { return ctx.grid.columnApi; },
            stateMatcher: function (state) {
                if (!state.columnOrder) {
                    state.columnOrder = [];
                }
                return state;
            }
        });
        createStateChunkHandler('columnOrder')
            .handleKeys('columnOrder')
            .serialize(function (key, ctx) { return ctx.source.visibleColumnIds.slice(); })
            .deserialize(function (key, columnOrder, ctx) {
            var extApi = ctx.extApi, grid = ctx.grid;
            var lastMove;
            if ((columnOrder === null || columnOrder === void 0 ? void 0 : columnOrder.length) === grid.columnApi.visibleColumns.length) {
                for (var i = 0, len = columnOrder.length; i < len; i++) {
                    var anchor = grid.columnApi.visibleColumns[i];
                    if (columnOrder[i] !== anchor.id) {
                        var column = grid.columnApi.findColumn(columnOrder[i]);
                        if (!column) {
                            return;
                        }
                        lastMove = [column, anchor];
                        grid.columnApi.moveColumn(column, anchor);
                    }
                }
            }
            // With this revert/redo of the last move we just trigger a redraw.
            if (lastMove) {
                grid.columnApi.moveColumn(lastMove[1], lastMove[0]);
                grid.columnApi.moveColumn(lastMove[0], lastMove[1]);
            }
        })
            .register();
    }

    /**
     * Return's the `User Preferences` preset which focuses on saving and restoring state that the user
     * can define and would want to restore between sessions.
     *
     * For example, saving column width's which the user might have changed using the mouse or any other custom way provided to him (through API).
     * Saving the column order, so if the user re-ordered the table the order can be loaded back again...
     */
    function userSessionPref() {
        var e_1, _a;
        var basedOn = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            basedOn[_i] = arguments[_i];
        }
        var resultFilter = {
            grid: [
                'showFooter',
                'showHeader',
            ],
            columnVisibility: true,
            columnOrder: true,
            columns: ['table'],
            dataColumn: [
                'width',
            ]
        };
        if (basedOn.length > 0) {
            try {
                for (var basedOn_1 = __values(basedOn), basedOn_1_1 = basedOn_1.next(); !basedOn_1_1.done; basedOn_1_1 = basedOn_1.next()) {
                    var b = basedOn_1_1.value;
                    mergeStateChunkKeyFilter(resultFilter, b);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (basedOn_1_1 && !basedOn_1_1.done && (_a = basedOn_1.return)) _a.call(basedOn_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        return resultFilter;
    }
    /**
     * Merge a head and tail chunk filters so keys from tail will be merged into head if:
     *
     * - The key does not exist in head
     * - The key exist in head but the value of it is an Array and the value of tail is an Array as well.
     *   In such case, both array's are merged into a single unique array.
     */
    function mergeStateChunkKeyFilter(mergeHead, mergeTail) {
        var e_2, _a;
        try {
            for (var _b = __values(Object.keys(mergeTail)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var k = _c.value;
                var tailValue = mergeTail[k];
                if (k in mergeHead) {
                    var tailHead = mergeHead[k];
                    if (Array.isArray(tailHead) && Array.isArray(tailValue)) {
                        var s = new Set(__spreadArray(__spreadArray([], __read(tailHead)), __read(tailValue)));
                        mergeHead[k] = Array.from(s.values());
                    }
                }
                else {
                    mergeHead[k] = mergeTail[k];
                }
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

    var PLUGIN_KEY = 'state';
    var PblNgridStatePlugin = /** @class */ (function () {
        function PblNgridStatePlugin(grid, injector, pluginCtrl) {
            var _this = this;
            this.grid = grid;
            this.injector = injector;
            this.pluginCtrl = pluginCtrl;
            this._events = new rxjs.Subject();
            this._removePlugin = pluginCtrl.setPlugin(PLUGIN_KEY, this);
            this.afterLoadState = this._events.pipe(operators.filter(function (e) { return e.phase === 'load' && e.position === 'after'; }), operators.mapTo(undefined));
            this.afterSaveState = this._events.pipe(operators.filter(function (e) { return e.phase === 'save' && e.position === 'after'; }), operators.mapTo(undefined));
            this.onError = this._events.pipe(operators.filter(function (e) { return !!e.error; }), operators.map(function (e) { return ({ phase: e.phase, error: e.error }); }));
            pluginCtrl.events
                .pipe(i1$1.ON_INVALIDATE_HEADERS, operators.take(1))
                .subscribe(function (event) {
                var initialLoadOptions = Object.assign(Object.assign({}, (_this.loadOptions || {})), { avoidRedraw: true });
                hasState(grid, initialLoadOptions)
                    .then(function (value) {
                    if (value) {
                        return _this._load(initialLoadOptions);
                    }
                })
                    .then(function () {
                    pluginCtrl.events
                        .pipe(i1$1.ON_RESIZE_ROW, operators.skip(1), operators.debounceTime(500))
                        .subscribe(function (event) { return _this.save(); });
                });
            });
            pluginCtrl.events
                .pipe(i1$1.ON_DESTROY)
                .subscribe(function (event) {
                event.wait(_this.save());
                _this._events.complete();
            });
        }
        PblNgridStatePlugin.create = function (table, injector) {
            var pluginCtrl = i1.PblNgridPluginController.find(table);
            return new PblNgridStatePlugin(table, injector, pluginCtrl);
        };
        PblNgridStatePlugin.prototype.load = function () {
            return this._load(this.loadOptions);
        };
        PblNgridStatePlugin.prototype.save = function () {
            var _this = this;
            return saveState(this.grid, this.saveOptions)
                .then(function () { return _this._events.next({ phase: 'save', position: 'after' }); })
                .catch(function (error) { return _this._events.next({ phase: 'save', position: 'after', error: error }); });
        };
        PblNgridStatePlugin.prototype.destroy = function () {
            this._removePlugin(this.grid);
        };
        PblNgridStatePlugin.prototype._load = function (loadOptions) {
            var _this = this;
            return loadState(this.grid, loadOptions)
                .then(function () { return _this._events.next({ phase: 'load', position: 'after' }); })
                .catch(function (error) { return _this._events.next({ phase: 'load', position: 'after', error: error }); });
        };
        return PblNgridStatePlugin;
    }());
    var PblNgridStatePluginDirective = /** @class */ (function (_super) {
        __extends(PblNgridStatePluginDirective, _super);
        function PblNgridStatePluginDirective(grid, injector, pluginCtrl) {
            var _this = _super.call(this, grid, injector, pluginCtrl) || this;
            _this.loadOptions = { include: userSessionPref() };
            _this.saveOptions = { include: userSessionPref() };
            return _this;
        }
        PblNgridStatePluginDirective.prototype.ngOnDestroy = function () {
            this.destroy();
        };
        return PblNgridStatePluginDirective;
    }(PblNgridStatePlugin));
    /** @nocollapse */ PblNgridStatePluginDirective.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridStatePluginDirective, deps: [{ token: i1__namespace.PblNgridComponent }, { token: i0__namespace.Injector }, { token: i1__namespace.PblNgridPluginController }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ PblNgridStatePluginDirective.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridStatePluginDirective, selector: "pbl-ngrid[persistState]", inputs: { loadOptions: "loadOptions", saveOptions: "saveOptions" }, outputs: { afterLoadState: "afterLoadState", afterSaveState: "afterSaveState", onError: "onError" }, usesInheritance: true, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridStatePluginDirective, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: 'pbl-ngrid[persistState]',
                        outputs: ['afterLoadState', 'afterSaveState', 'onError'],
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.PblNgridComponent }, { type: i0__namespace.Injector }, { type: i1__namespace.PblNgridPluginController }]; }, propDecorators: { loadOptions: [{
                    type: i0.Input
                }], saveOptions: [{
                    type: i0.Input
                }] } });

    function registerColumnVisibilityHandlers() {
        stateVisor.registerRootChunkSection('columnVisibility', {
            sourceMatcher: function (ctx) { return ctx.grid.columnApi; },
            stateMatcher: function (state) {
                if (!state.columnVisibility) {
                    state.columnVisibility = [];
                }
                return state;
            }
        });
        createStateChunkHandler('columnVisibility')
            .handleKeys('columnVisibility')
            .serialize(function (key, ctx) { return ctx.source.hiddenColumnIds; })
            .deserialize(function (key, columnVisibility, ctx) {
            ctx.extApi.columnStore.updateColumnVisibility(columnVisibility);
        })
            .register();
    }

    function registerBuiltInHandlers() {
        registerGridHandlers();
        registerColumnDefHandlers();
        registerColumnVisibilityHandlers(); // order is important, we want visibility set before ordering
        registerColumnOrderHandlers();
    }

    var PblNgridStatePluginModule = /** @class */ (function () {
        function PblNgridStatePluginModule(configService) {
            i1.PblNgridPluginController.onCreatedSafe(PblNgridStatePluginModule, function (grid, controller) {
                var targetEventsConfig = configService.get(PLUGIN_KEY);
                if (targetEventsConfig && targetEventsConfig.autoEnable === true) {
                    controller.onInit()
                        .subscribe(function () {
                        if (!controller.hasPlugin(PLUGIN_KEY)) {
                            var instance = controller.createPlugin(PLUGIN_KEY);
                            if (targetEventsConfig.autoEnableOptions) {
                                instance.loadOptions = targetEventsConfig.autoEnableOptions.loadOptions;
                                instance.saveOptions = targetEventsConfig.autoEnableOptions.saveOptions;
                            }
                        }
                    });
                }
            });
        }
        return PblNgridStatePluginModule;
    }());
    PblNgridStatePluginModule.NGRID_PLUGIN = i1.ngridPlugin({ id: PLUGIN_KEY, factory: 'create', runOnce: registerBuiltInHandlers }, PblNgridStatePlugin);
    /** @nocollapse */ PblNgridStatePluginModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridStatePluginModule, deps: [{ token: i1__namespace$1.PblNgridConfigService }], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    /** @nocollapse */ PblNgridStatePluginModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridStatePluginModule, declarations: [PblNgridStatePluginDirective], imports: [common.CommonModule,
            i1.PblNgridModule], exports: [PblNgridStatePluginDirective] });
    /** @nocollapse */ PblNgridStatePluginModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridStatePluginModule, providers: [], imports: [[
                common.CommonModule,
                i1.PblNgridModule,
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridStatePluginModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            common.CommonModule,
                            i1.PblNgridModule,
                        ],
                        declarations: [
                            PblNgridStatePluginDirective,
                        ],
                        exports: [
                            PblNgridStatePluginDirective,
                        ],
                        providers: [],
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$1.PblNgridConfigService }]; } });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.PblNgridLocalStoragePersistAdapter = PblNgridLocalStoragePersistAdapter;
    exports.PblNgridStatePlugin = PblNgridStatePlugin;
    exports.PblNgridStatePluginDirective = PblNgridStatePluginDirective;
    exports.PblNgridStatePluginModule = PblNgridStatePluginModule;
    exports.StateVisor = StateVisor;
    exports.createStateChunkHandler = createStateChunkHandler;
    exports.hasState = hasState;
    exports.loadState = loadState;
    exports.registerColumnDefHandlers = registerColumnDefHandlers;
    exports.registerColumnOrderHandlers = registerColumnOrderHandlers;
    exports.registerGridHandlers = registerGridHandlers;
    exports.saveState = saveState;
    exports.stateVisor = stateVisor;
    exports.userSessionPref = userSessionPref;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=pebula-ngrid-state.umd.js.map
