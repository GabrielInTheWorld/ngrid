(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs/operators'), require('rxjs'), require('@angular/cdk/collections'), require('@angular/cdk/table'), require('@angular/cdk/drag-drop'), require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('@pebula/ngrid/core', ['exports', 'rxjs/operators', 'rxjs', '@angular/cdk/collections', '@angular/cdk/table', '@angular/cdk/drag-drop', '@angular/core'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.pebula = global.pebula || {}, global.pebula.ngrid = global.pebula.ngrid || {}, global.pebula.ngrid.core = {}), global.rxjs.operators, global.rxjs, global.ng.cdk.collections, global.ng.cdk.table, global.ng.cdk.dragDrop, global.ng.core));
}(this, (function (exports, operators, rxjs, collections, table, dragDrop, i0) { 'use strict';

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

    var eventFilterFactory = function (kind) { return function (o) { return o.pipe(operators.filter(function (e) { return e.kind === kind; })); }; };
    var once = function (pipe) { return function (o) { return pipe(o).pipe(operators.take(1)); }; };
    var ON_CONSTRUCTED = once(eventFilterFactory('onConstructed'));
    var ON_INIT = once(eventFilterFactory('onInit'));
    var ON_DESTROY = once(eventFilterFactory('onDestroy'));
    var ON_BEFORE_INVALIDATE_HEADERS = eventFilterFactory('beforeInvalidateHeaders');
    var ON_INVALIDATE_HEADERS = eventFilterFactory('onInvalidateHeaders');
    var ON_RESIZE_ROW = eventFilterFactory('onResizeRow');

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

    /**
     * Emits the values emitted by the source observable until a kill signal is sent to the group.
     * You can also specify a `subKillGroup` which can be used to kill specific subscriptions within a group.
     *
     * When a `killGroup` is "killed" all `subKillGroup` are killed as well. When a `subKillGroup` is "killed" the group remains
     * as well as other "subKillGroup" registered for that group.
     *
     * > WARNING: Do not apply operators that subscribe internally (e.g. combineLatest, switchMap) after the `killOnDestroy` operator.
     * Internal subscriptions will not unsubscribe automatically.
     * For more information see {@link https://blog.angularindepth.com/rxjs-avoiding-takeuntil-leaks-fb5182d047ef | this blog post}
     */
    function unrx(killGroup, subKillGroup) {
        return unrx.pipe(killGroup, subKillGroup);
    }
    (function (unrx) {
        var ALL_HANDLERS_TOKEN = {};
        var notifierStore = new WeakMap();
        function getNotifier(component, create) {
            if (create === void 0) { create = false; }
            var notifier = notifierStore.get(component);
            if (!notifier && create === true) {
                notifierStore.set(component, notifier = new rxjs.Subject());
            }
            return notifier;
        }
        function kill(killGroup) {
            var e_1, _a;
            var subKillGroup = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                subKillGroup[_i - 1] = arguments[_i];
            }
            if (subKillGroup.length === 0) {
                killAll(killGroup);
            }
            else {
                var notifier = getNotifier(killGroup);
                if (notifier) {
                    try {
                        for (var subKillGroup_1 = __values(subKillGroup), subKillGroup_1_1 = subKillGroup_1.next(); !subKillGroup_1_1.done; subKillGroup_1_1 = subKillGroup_1.next()) {
                            var h = subKillGroup_1_1.value;
                            notifier.next(h);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (subKillGroup_1_1 && !subKillGroup_1_1.done && (_a = subKillGroup_1.return)) _a.call(subKillGroup_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
            }
        }
        unrx.kill = kill;
        /** {@inheritdoc unrx} */
        function pipe(killGroup, subKillGroup) {
            return function (source) { return source.pipe(operators.takeUntil(getNotifier(killGroup, true).pipe(operators.filter(function (h) { return h === ALL_HANDLERS_TOKEN || (subKillGroup && h === subKillGroup); })))); };
        }
        unrx.pipe = pipe;
        function killAll(obj) {
            var notifier = getNotifier(obj);
            if (notifier) {
                notifier.next(ALL_HANDLERS_TOKEN);
                notifier.complete();
                notifierStore.delete(obj);
            }
        }
    })(unrx || (unrx = {}));

    function removeFromArray(arr, value) {
        if (Array.isArray(value)) {
            return value.map(function (v) { return _removeFromArray(arr, v); });
        }
        else if (typeof value === 'function') {
            var idx = arr.findIndex(value);
            if (idx > -1) {
                arr.splice(idx, 1);
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return _removeFromArray(arr, value);
        }
    }
    function _removeFromArray(arr, value) {
        var idx = arr.indexOf(value);
        if (idx > -1) {
            arr.splice(idx, 1);
            return true;
        }
        else {
            return false;
        }
    }

    // This code is taken from an historical point in the angular repo
    // It no longer exists and class/style diffing is done internally in the core package embedded into the renderer.
    //
    // The code was taken from https://github.com/angular/angular/blob/2961bf06c61c78695d453b05fe6d5dd8a4f91da8/packages/common/src/directives/styling_differ.ts
    // And was removed in https://github.com/angular/angular/tree/69de7680f5e08165800d4db399949ea6bdff48d9
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Used to diff and convert ngStyle/ngClass instructions into [style] and [class] bindings.
     *
     * ngStyle and ngClass both accept various forms of input and behave differently than that
     * of how [style] and [class] behave in Angular.
     *
     * The differences are:
     *  - ngStyle and ngClass both **deep-watch** their binding values for changes each time CD runs
     *    while [style] and [class] bindings do not (they check for identity changes)
     *  - ngStyle allows for unit-based keys (e.g. `{'max-width.px':value}`) and [style] does not
     *  - ngClass supports arrays of class values and [class] only accepts map and string values
     *  - ngClass allows for multiple className keys (space-separated) within an array or map
     *     (as the * key) while [class] only accepts a simple key/value map object
     *
     * Having Angular understand and adapt to all the different forms of behavior is complicated
     * and unnecessary. Instead, ngClass and ngStyle should have their input values be converted
     * into something that the core-level [style] and [class] bindings understand.
     *
     * This [StylingDiffer] class handles this conversion by creating a new output value each time
     * the input value of the binding value has changed (either via identity change or deep collection
     * content change).
     *
     * ## Why do we care about ngStyle/ngClass?
     * The styling algorithm code (documented inside of `render3/interfaces/styling.ts`) needs to
     * respect and understand the styling values emitted through ngStyle and ngClass (when they
     * are present and used in a template).
     *
     * Instead of having these directives manage styling on their own, they should be included
     * into the Angular styling algorithm that exists for [style] and [class] bindings.
     *
     * Here's why:
     *
     * - If ngStyle/ngClass is used in combination with [style]/[class] bindings then the
     *   styles and classes would fall out of sync and be applied and updated at
     *   inconsistent times
     * - Both ngClass/ngStyle should respect [class.name] and [style.prop] bindings (and not arbitrarily
     *   overwrite their changes)
     *
     *   ```
     *   <!-- if `w1` is updated then it will always override `w2`
     *        if `w2` is updated then it will always override `w1`
     *        if both are updated at the same time then `w1` wins -->
     *   <div [ngStyle]="{width:w1}" [style.width]="w2">...</div>
     *
     *   <!-- if `w1` is updated then it will always lose to `w2`
     *        if `w2` is updated then it will always override `w1`
     *        if both are updated at the same time then `w2` wins -->
     *   <div [style]="{width:w1}" [style.width]="w2">...</div>
     *   ```
     * - ngClass/ngStyle were written as a directives and made use of maps, closures and other
     *   expensive data structures which were evaluated each time CD runs
     */
    var StylingDiffer = /** @class */ (function () {
        function StylingDiffer(_name, _options) {
            this._name = _name;
            this._options = _options;
            /**
             * Normalized string map representing the last value set via `setValue()` or null if no value has
             * been set or the last set value was null
             */
            this.value = null;
            /**
             * The last set value that was applied via `setValue()`
             */
            this._inputValue = null;
            /**
             * The type of value that the `_lastSetValue` variable is
             */
            this._inputValueType = 0 /* Null */;
            /**
             * Whether or not the last value change occurred because the variable itself changed reference
             * (identity)
             */
            this._inputValueIdentityChangeSinceLastCheck = false;
        }
        /**
         * Sets the input value for the differ and updates the output value if necessary.
         *
         * @param value the new styling input value provided from the ngClass/ngStyle binding
         */
        StylingDiffer.prototype.setInput = function (value) {
            if (value !== this._inputValue) {
                var type = void 0;
                if (!value) { // matches empty strings, null, false and undefined
                    type = 0 /* Null */;
                    value = null;
                }
                else if (Array.isArray(value)) {
                    type = 4 /* Array */;
                }
                else if (value instanceof Set) {
                    type = 8 /* Set */;
                }
                else if (typeof value === 'string') {
                    if (!(this._options & 4 /* AllowStringValue */)) {
                        throw new Error(this._name + ' string values are not allowed');
                    }
                    type = 1 /* String */;
                }
                else {
                    type = 2 /* StringMap */;
                }
                this._inputValue = value;
                this._inputValueType = type;
                this._inputValueIdentityChangeSinceLastCheck = true;
                this._processValueChange(true);
            }
        };
        /**
         * Checks the input value for identity or deep changes and updates output value if necessary.
         *
         * This function can be called right after `setValue()` is called, but it can also be
         * called incase the existing value (if it's a collection) changes internally. If the
         * value is indeed a collection it will do the necessary diffing work and produce a
         * new object value as assign that to `value`.
         *
         * @returns whether or not the value has changed in some way.
         */
        StylingDiffer.prototype.updateValue = function () {
            var valueHasChanged = this._inputValueIdentityChangeSinceLastCheck;
            if (!this._inputValueIdentityChangeSinceLastCheck &&
                (this._inputValueType & 14 /* Collection */)) {
                valueHasChanged = this._processValueChange(false);
            }
            else {
                // this is set to false in the event that the value is a collection.
                // This way (if the identity hasn't changed), then the algorithm can
                // diff the collection value to see if the contents have mutated
                // (otherwise the value change was processed during the time when
                // the variable changed).
                this._inputValueIdentityChangeSinceLastCheck = false;
            }
            return valueHasChanged;
        };
        /**
         * Examines the last set value to see if there was a change in content.
         *
         * @param inputValueIdentityChanged whether or not the last set value changed in identity or not
         * @returns `true` when the value has changed (either by identity or by shape if its a
         * collection)
         */
        StylingDiffer.prototype._processValueChange = function (inputValueIdentityChanged) {
            // if the inputValueIdentityChanged then we know that input has changed
            var inputChanged = inputValueIdentityChanged;
            var newOutputValue = null;
            var trimValues = (this._options & 1 /* TrimProperties */) ? true : false;
            var parseOutUnits = (this._options & 8 /* AllowUnits */) ? true : false;
            var allowSubKeys = (this._options & 2 /* AllowSubKeys */) ? true : false;
            switch (this._inputValueType) {
                // case 1: [input]="string"
                case 1 /* String */: {
                    if (inputValueIdentityChanged) {
                        // process string input only if the identity has changed since the strings are immutable
                        var keys = this._inputValue.split(/\s+/g);
                        if (this._options & 16 /* ForceAsMap */) {
                            newOutputValue = {};
                            for (var i = 0; i < keys.length; i++) {
                                newOutputValue[keys[i]] = true;
                            }
                        }
                        else {
                            newOutputValue = keys.join(' ');
                        }
                    }
                    break;
                }
                // case 2: [input]="{key:value}"
                case 2 /* StringMap */: {
                    var inputMap = this._inputValue;
                    var inputKeys = Object.keys(inputMap);
                    if (!inputValueIdentityChanged) {
                        // if StringMap and the identity has not changed then output value must have already been
                        // initialized to a StringMap, so we can safely compare the input and output maps
                        inputChanged = mapsAreEqual(inputKeys, inputMap, this.value);
                    }
                    if (inputChanged) {
                        newOutputValue = bulidMapFromStringMap(trimValues, parseOutUnits, allowSubKeys, inputMap, inputKeys);
                    }
                    break;
                }
                // case 3a: [input]="[str1, str2, ...]"
                // case 3b: [input]="Set"
                case 4 /* Array */:
                case 8 /* Set */: {
                    var inputKeys = Array.from(this._inputValue);
                    if (!inputValueIdentityChanged) {
                        var outputKeys = Object.keys(this.value);
                        inputChanged = !keyArraysAreEqual(outputKeys, inputKeys);
                    }
                    if (inputChanged) {
                        newOutputValue =
                            bulidMapFromStringArray(this._name, trimValues, allowSubKeys, inputKeys);
                    }
                    break;
                }
                // case 4: [input]="null|undefined"
                default:
                    inputChanged = inputValueIdentityChanged;
                    newOutputValue = null;
                    break;
            }
            if (inputChanged) {
                // update the readonly `value` property by casting it to `any` first
                this.value = newOutputValue;
            }
            return inputChanged;
        };
        return StylingDiffer;
    }());
    /**
     * @param trim whether the keys should be trimmed of leading or trailing whitespace
     * @param parseOutUnits whether units like "px" should be parsed out of the key name and appended to
     *   the value
     * @param allowSubKeys whether key needs to be subsplit by whitespace into multiple keys
     * @param values values of the map
     * @param keys keys of the map
     * @return a normalized string map based on the input string map
     */
    function bulidMapFromStringMap(trim, parseOutUnits, allowSubKeys, values, keys) {
        var map = {};
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var value = values[key];
            if (value !== undefined) {
                if (typeof value !== 'boolean') {
                    value = '' + value;
                }
                // Map uses untrimmed keys, so don't trim until passing to `setMapValues`
                setMapValues(map, trim ? key.trim() : key, value, parseOutUnits, allowSubKeys);
            }
        }
        return map;
    }
    /**
     * @param trim whether the keys should be trimmed of leading or trailing whitespace
     * @param parseOutUnits whether units like "px" should be parsed out of the key name and appended to
     *   the value
     * @param allowSubKeys whether key needs to be subsplit by whitespace into multiple keys
     * @param values values of the map
     * @param keys keys of the map
     * @return a normalized string map based on the input string array
     */
    function bulidMapFromStringArray(errorPrefix, trim, allowSubKeys, keys) {
        var map = {};
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            // ngDevMode && assertValidValue(errorPrefix, key);
            key = trim ? key.trim() : key;
            setMapValues(map, key, true, false, allowSubKeys);
        }
        return map;
    }
    function assertValidValue(errorPrefix, value) {
        if (typeof value !== 'string') {
            throw new Error(errorPrefix + " can only toggle CSS classes expressed as strings, got: " + value);
        }
    }
    function setMapValues(map, key, value, parseOutUnits, allowSubKeys) {
        if (allowSubKeys && key.indexOf(' ') > 0) {
            var innerKeys = key.split(/\s+/g);
            for (var j = 0; j < innerKeys.length; j++) {
                setIndividualMapValue(map, innerKeys[j], value, parseOutUnits);
            }
        }
        else {
            setIndividualMapValue(map, key, value, parseOutUnits);
        }
    }
    function setIndividualMapValue(map, key, value, parseOutUnits) {
        if (parseOutUnits && typeof value === 'string') {
            // parse out the unit (e.g. ".px") from the key and append it to the value
            // e.g. for [width.px]="40" => ["width","40px"]
            var unitIndex = key.indexOf('.');
            if (unitIndex > 0) {
                var unit = key.substr(unitIndex + 1); // skip over the "." in "width.px"
                key = key.substring(0, unitIndex);
                value += unit;
            }
        }
        map[key] = value;
    }
    /**
     * Compares two maps and returns true if they are equal
     *
     * @param inputKeys value of `Object.keys(inputMap)` it's unclear if this actually performs better
     * @param inputMap map to compare
     * @param outputMap map to compare
     */
    function mapsAreEqual(inputKeys, inputMap, outputMap) {
        var outputKeys = Object.keys(outputMap);
        if (inputKeys.length !== outputKeys.length) {
            return true;
        }
        for (var i = 0, n = inputKeys.length; i <= n; i++) {
            var key = inputKeys[i];
            if (key !== outputKeys[i] || inputMap[key] !== outputMap[key]) {
                return true;
            }
        }
        return false;
    }
    /**
     * Compares two Object.keys() arrays and returns true if they are equal.
     *
     * @param keyArray1 Object.keys() array to compare
     * @param keyArray1 Object.keys() array to compare
     */
    function keyArraysAreEqual(keyArray1, keyArray2) {
        if (!Array.isArray(keyArray1) || !Array.isArray(keyArray2)) {
            return false;
        }
        if (keyArray1.length !== keyArray2.length) {
            return false;
        }
        for (var i = 0; i < keyArray1.length; i++) {
            if (keyArray1[i] !== keyArray2[i]) {
                return false;
            }
        }
        return true;
    }

    /**
     * Given an object (item) and a path, returns the value at the path
     */
    function deepPathGet(item, col) {
        var e_1, _a;
        if (col.path) {
            try {
                for (var _b = __values(col.path), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var p = _c.value;
                    item = item[p];
                    if (!item)
                        return;
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
        return item[col.prop];
    }
    /**
     * Given an object (item) and a path, returns the value at the path
     */
    function deepPathSet(item, col, value) {
        var e_2, _a;
        if (col.path) {
            try {
                for (var _b = __values(col.path), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var p = _c.value;
                    item = item[p];
                    if (!item)
                        return;
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
        item[col.prop] = value;
    }
    function getValue(col, row) {
        if (col.transform) {
            return col.transform(deepPathGet(row, col), row, col);
        }
        return deepPathGet(row, col);
    }

    var PblTokenPaginator = /** @class */ (function () {
        function PblTokenPaginator() {
            this.kind = 'token';
            this._perPage = 10;
            this._total = 0;
            this.onChange$ = new rxjs.BehaviorSubject({ page: [null, null] });
            this.onChange = this.onChange$.asObservable();
            this.reset();
        }
        Object.defineProperty(PblTokenPaginator.prototype, "perPage", {
            get: function () { return this._perPage; },
            set: function (value) {
                if (value < 1) {
                    throw new Error("Invalid total size value " + value);
                }
                if (this._perPage !== value) {
                    var changes = { perPage: [this._perPage, this._perPage = value] };
                    this.emit(changes);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblTokenPaginator.prototype, "page", {
            get: function () { return this._page; },
            set: function (value) {
                if (this._page !== value) {
                    var idx = this._tokens.indexOf(value);
                    if (idx === -1) {
                        throw new Error("Invalid page token " + value);
                    }
                    this._cursor = idx;
                    var prev = this._page;
                    this._page = value;
                    this.emit({ page: [prev, value] });
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblTokenPaginator.prototype, "total", {
            get: function () { return this._total; },
            set: function (value) {
                var changes = { total: [this._total, this._total = value] };
                this.emit(changes);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblTokenPaginator.prototype, "totalPages", {
            get: function () {
                return this._tokens.length;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblTokenPaginator.prototype, "range", {
            get: function () {
                if (!this._range) {
                    var start = (this._cursor) * this.perPage;
                    var end = Math.min(this._total, start + this.perPage);
                    this._range = this.noCacheMode
                        ? [0, end - start]
                        : [start, end];
                }
                return this._range;
            },
            enumerable: false,
            configurable: true
        });
        PblTokenPaginator.prototype.reset = function () {
            this._tokens = [null];
            this._cursor = 0;
            this._total = 0;
            this.page = null;
        };
        PblTokenPaginator.prototype.canMove = function (value) {
            return this._tokens.indexOf(value) > -1;
        };
        PblTokenPaginator.prototype.hasNext = function () { return this._cursor < this._tokens.length - 1; };
        PblTokenPaginator.prototype.hasPrev = function () { return this._cursor > 0; };
        PblTokenPaginator.prototype.move = function (value) { this.page = value; };
        PblTokenPaginator.prototype.nextPage = function () { this.page = this._tokens[++this._cursor]; };
        PblTokenPaginator.prototype.prevPage = function () { this.page = this._tokens[--this._cursor]; };
        PblTokenPaginator.prototype.addNext = function (value) {
            var nextPointer = this._cursor + 1;
            // if next pointer is not like what we got, set it and delete all after (invalidate them)
            if (this._tokens[nextPointer] !== value) {
                this._tokens[nextPointer] = value;
                this._tokens.splice(nextPointer + 1);
            }
        };
        PblTokenPaginator.prototype.emit = function (changes) {
            var _this = this;
            this._range = undefined;
            if (this.queuedChanges) {
                Object.assign(this.queuedChanges, changes);
            }
            else {
                this.queuedChanges = changes;
                setTimeout(function () {
                    _this.queuedChanges = undefined;
                    _this.onChange$.next(changes);
                });
            }
        };
        return PblTokenPaginator;
    }());

    var PblPagingPaginator = /** @class */ (function () {
        function PblPagingPaginator() {
            this.kind = 'pageNumber';
            this._total = 0;
            this._perPage = 10;
            this._page = 1;
            this._totalPages = 0;
            this.onChange$ = new rxjs.BehaviorSubject({ page: [null, 1] });
            this.onChange = this.onChange$.asObservable();
        }
        Object.defineProperty(PblPagingPaginator.prototype, "perPage", {
            get: function () { return this._perPage; },
            set: function (value) {
                if (value < 1) {
                    throw new Error("Invalid total size value " + value);
                }
                if (this._perPage !== value) {
                    var changes = { perPage: [this._perPage, this._perPage = value] };
                    var prev = this._page;
                    this.calcPages();
                    if (prev !== this._page) {
                        changes.page = [prev, this._page];
                    }
                    this.emit(changes);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblPagingPaginator.prototype, "page", {
            /**
             * Get / Set the current page
             */
            get: function () { return this._page; },
            set: function (value) {
                if (value < 0 || value > this._totalPages) {
                    throw new Error("Invalid page index " + value);
                }
                if (this._page !== value) {
                    var prev = this._page;
                    this._page = value;
                    this.emit({ page: [prev, value] });
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblPagingPaginator.prototype, "total", {
            get: function () { return this._total; },
            set: function (value) {
                if (value < 0) {
                    throw new Error("Invalid total size value " + value);
                }
                if (this._total !== value) {
                    var changes = { total: [this._total, this._total = value] };
                    var prev = this._page;
                    this.calcPages();
                    if (prev !== this._page) {
                        changes.page = [prev, this._page];
                    }
                    this.emit(changes);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblPagingPaginator.prototype, "totalPages", {
            /**
             * The amount of pages in this paginator
             */
            get: function () {
                return this._totalPages;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblPagingPaginator.prototype, "range", {
            get: function () {
                if (!this._range) {
                    var start = (this.page - 1) * this.perPage;
                    var end = Math.min(this._total, start + this.perPage);
                    this._range = this.noCacheMode
                        ? [0, end - start]
                        : [start, end];
                }
                return this._range;
            },
            enumerable: false,
            configurable: true
        });
        PblPagingPaginator.prototype.canMove = function (value) {
            var p = this._page + value;
            return p >= 1 && p <= this.totalPages;
        };
        PblPagingPaginator.prototype.hasNext = function () { return this.canMove(1); };
        PblPagingPaginator.prototype.hasPrev = function () { return this.canMove(-1); };
        PblPagingPaginator.prototype.move = function (value) { this.page = this._page + value; };
        PblPagingPaginator.prototype.nextPage = function () { this.move(1); };
        PblPagingPaginator.prototype.prevPage = function () { this.move(-1); };
        PblPagingPaginator.prototype.reset = function () {
            this.page = 1;
        };
        /**
         * Calculate the number of pages.
         * returns true if the current page has changed due to calculation. (current page \> new pages value)
         */
        PblPagingPaginator.prototype.calcPages = function () {
            this._totalPages = Math.ceil(this._total / this.perPage);
            if (this._totalPages > 0 && this._page > this._totalPages) {
                this.page = this._totalPages;
            }
        };
        PblPagingPaginator.prototype.emit = function (changes) {
            var _this = this;
            this._range = undefined;
            if (this.queuedChanges) {
                Object.assign(this.queuedChanges, changes);
            }
            else {
                this.queuedChanges = changes;
                setTimeout(function () {
                    _this.queuedChanges = undefined;
                    _this.onChange$.next(changes);
                });
            }
        };
        return PblPagingPaginator;
    }());

    /**
     * Apply sorting on a collection, based on column and sort definitions.
     * If the sort definition doesn't have a sorting function the default sorter is used.
     */
    function applySort(column, sort, data) {
        if (!sort || !sort.order) {
            return data;
        }
        var sortFn = typeof sort.sortFn === 'function'
            ? sort.sortFn
            : typeof column.sort === 'function'
                ? column.sort
                : defaultSorter;
        return column && data
            ? sortFn(column, sort, data.slice())
            : data || [];
    }
    function defaultSorter(column, sort, data) {
        return data.sort(function (a, b) {
            var directionMultiplier = (sort.order === 'asc' ? 1 : -1);
            var valueA = getValue(column, a);
            var valueB = getValue(column, b);
            valueA = isNaN(+valueA) ? valueA : +valueA;
            valueB = isNaN(+valueB) ? valueB : +valueB;
            if (valueA && valueB) {
                return (valueA < valueB ? -1 : valueA === valueB ? 0 : 1) * directionMultiplier;
            }
            return (valueA ? 1 : -1) * directionMultiplier;
        });
    }

    function createFilter(value, columns) {
        return value === undefined
            ? undefined
            : {
                columns: columns,
                type: typeof value === 'function' ? 'predicate' : 'value',
                filter: value
            };
    }
    function filter(rawData, filter) {
        if (!filter || !rawData || rawData.length === 0) {
            return rawData;
        }
        else {
            var cols_1 = filter.columns;
            if (filter.type === 'predicate') {
                var value_1 = filter.filter;
                return rawData.filter(function (v) { return value_1(v, cols_1); });
            }
            else if (filter.type === 'value') {
                var value_2 = typeof filter.filter.toLowerCase === 'function' ? filter.filter.toLowerCase() : filter.filter;
                return rawData.filter(function (row) { return cols_1.some(function (col) {
                    var predicate = col.filter || genericColumnPredicate;
                    return predicate(col.filter ? filter.filter : value_2, getValue(col, row), row, col);
                }); });
            }
        }
        return rawData;
    }
    /**
     * A generic column predicate that compares the inclusion (text) of the value in the column value.
     */
    var genericColumnPredicate = function (filterValue, colValue, row, col) {
        return colValue && colValue.toString().toLowerCase().includes(filterValue);
    };

    var EMPTY = Object.freeze({});
    var DEEP_COMPARATORS = {
        filter: function (prev, curr) {
            return prev.filter === curr.filter
                && prev.type == curr.type;
            // TODO: deep compare columns
            // && (prev.columns || []).join() === (curr.columns || []).join();
        },
        sort: function (prev, curr) {
            if (prev.column === curr.column) {
                var pSort = prev.sort || {};
                var cSort = curr.sort || {};
                return pSort.order === cSort.order && pSort.sortFn === cSort.sortFn;
            }
        },
        data: function (prev, curr) {
            return prev === curr;
        }
    };
    function fromRefreshDataWrapper(change) {
        return {
            changed: change.changed,
            prev: change.prev.data,
            curr: change.hasOwnProperty('curr') ? change.curr.data : change.prev.data,
        };
    }
    function createChangeContainer(type, value, cache) {
        var e_1, _a;
        if (type === 'pagination') {
            var pagination_1 = (value || {});
            var cached_1 = cache['pagination'];
            // we compare weak because we dont want changes from undefined to null etc...
            var changedKeys = Object.keys(pagination_1).filter(function (k) { return cached_1[k] != pagination_1[k][1] && k !== 'total'; });
            var event = {
                changed: changedKeys.length > 0,
                page: createNotChangedEvent(cached_1.page),
                perPage: createNotChangedEvent(cached_1.perPage),
            };
            if (event.changed) {
                try {
                    for (var changedKeys_1 = __values(changedKeys), changedKeys_1_1 = changedKeys_1.next(); !changedKeys_1_1.done; changedKeys_1_1 = changedKeys_1.next()) {
                        var k = changedKeys_1_1.value;
                        event[k].changed = true;
                        event[k].prev = pagination_1[k][0];
                        event[k].curr = cached_1[k] = pagination_1[k][1];
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (changedKeys_1_1 && !changedKeys_1_1.done && (_a = changedKeys_1.return)) _a.call(changedKeys_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            return event;
        }
        else {
            value = value || EMPTY;
            var cachedValue = cache[type];
            if (value === cachedValue) {
                return createNotChangedEvent(cachedValue);
            }
            else if (value !== EMPTY && cachedValue !== EMPTY) {
                var fn = DEEP_COMPARATORS[type];
                if (fn(cachedValue, value)) {
                    return createNotChangedEvent(cachedValue);
                }
            }
            cache[type] = value;
            return { changed: true, prev: cachedValue, curr: value };
        }
    }
    function createNotChangedEvent(value) {
        return { changed: false, prev: value, curr: value };
    }

    var CUSTOM_BEHAVIOR_TRIGGER_KEYS = ['sort', 'filter', 'pagination'];
    var TRIGGER_KEYS = __spreadArray(__spreadArray([], __read(CUSTOM_BEHAVIOR_TRIGGER_KEYS)), ['data']);
    var SOURCE_CHANGING_TOKEN = {};
    var DEFAULT_INITIAL_CACHE_STATE = { filter: EMPTY, sort: EMPTY, pagination: {}, data: EMPTY };
    /**
     * An adapter that handles changes
     */
    var PblDataSourceAdapter = /** @class */ (function () {
        /**
         * A Data Source adapter contains flow logic for the datasource and subsequent emissions of datasource instances.
         * The logic is determined by the combination of the config object and the sourceFactory provided to this adapter, making this adapter actually a container.
         *
         * There are 4 triggers that are responsible for datasource emissions, when one of them is triggered it will invoke the `sourceFactory`
         * returning a new datasource, i.e. a new datasource emission.
         *
         * The triggers are: filter, sort, pagination and refresh.
         *
         * The refresh trigger does not effect the input sent to the `sourceFactory` function, it is just a mean to initiate a call to create a new
         * datasource without changing previous flow variables.
         * It's important to note that calling `sourceFactory` with the same input 2 or more times does not guarantee identical response. For example
         * calling a remote server that might change it's data between calls.
         *
         * All other triggers (3) will change the input sent to the `sourceFactory` function which will use them to return a datasource.
         *
         * The input sent to `sourceFactory` is the values that each of the 3 triggers yields, when one trigger changes a new value for it is sent
         * and the last values of the other 2 triggers is sent with it. i.e. the combination of the last known value for all 3 triggers is sent.
         *
         * To enable smart caching and data management `sourceFactory` does not get the raw values of each trigger. `sourceFactory` will get
         * an event object that contains metadata about each trigger, whether it triggered the change or not as well as old and new values.
         *
         * The returned value from `sourceFactory` is then used as the datasource, applying all triggers that are not overridden by the user.
         * The returned value of `sourceFactory` can be a `DataSourceOf` or `false`.
         *   - `DataSourceOf` means a valid datasource, either observable/promise of array or an array.
         *   - `false` means skip, returning false will instruct the adapter to skip execution for this trigger cycle.
         *
         * Using a trigger is a binary configuration option, when a trigger is turned on it means that changes to it will be passed to the `sourceFactory`.
         * When a trigger is turned off it is not listened to and `undefined` will be sent as a value for it to the `sourceFactory`.
         *
         * The adapter comes with built in flow logic for all 3 triggers, when a trigger is turned off the adapter will take the result of `sourceFactory` and
         * apply the default behavior to it.
         *
         * For all triggers, the default behavior means client implementation. For filtering, client side filtering. For sorting, client side sorting.
         * For Pagination, client side pagination.
         *
         * You can opt in to one or more triggers and implement your own behavior inside the `sourceFactory`
         * @param sourceFactory - A function that returns the datasource based on flow instructions.
         * The instructions are optional, they might or might not exist depending on the configuration of the adapter.
         * When `sourceFactory` returns false the entire trigger cycle is skipped.
         * @param config - A configuration object describing how this adapter should behave.
         */
        function PblDataSourceAdapter(sourceFactory, config) {
            this.sourceFactory = sourceFactory;
            this._inFlight = new Set();
            this._inPreFlight = false;
            this.config = Object.assign({}, config || {});
            this._refresh$ = new rxjs.Subject();
            this._onSourceChange$ = new rxjs.Subject();
            this.onSourceChanged = this._onSourceChange$.pipe(operators.filter(function (d) { return d !== SOURCE_CHANGING_TOKEN; }));
            this.onSourceChanging = this._onSourceChange$.pipe(operators.filter(function (d) { return d === SOURCE_CHANGING_TOKEN; }));
        }
        PblDataSourceAdapter.hasCustomBehavior = function (config) {
            var e_1, _b;
            try {
                for (var CUSTOM_BEHAVIOR_TRIGGER_KEYS_1 = __values(CUSTOM_BEHAVIOR_TRIGGER_KEYS), CUSTOM_BEHAVIOR_TRIGGER_KEYS_1_1 = CUSTOM_BEHAVIOR_TRIGGER_KEYS_1.next(); !CUSTOM_BEHAVIOR_TRIGGER_KEYS_1_1.done; CUSTOM_BEHAVIOR_TRIGGER_KEYS_1_1 = CUSTOM_BEHAVIOR_TRIGGER_KEYS_1.next()) {
                    var key = CUSTOM_BEHAVIOR_TRIGGER_KEYS_1_1.value;
                    if (!!config[key]) {
                        return true;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (CUSTOM_BEHAVIOR_TRIGGER_KEYS_1_1 && !CUSTOM_BEHAVIOR_TRIGGER_KEYS_1_1.done && (_b = CUSTOM_BEHAVIOR_TRIGGER_KEYS_1.return)) _b.call(CUSTOM_BEHAVIOR_TRIGGER_KEYS_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return false;
        };
        /** Returns true if the event is triggered from a custom behavior (filter, sort and/or pagination and the configuration allows it) */
        PblDataSourceAdapter.isCustomBehaviorEvent = function (event, config) {
            var e_2, _b;
            try {
                for (var CUSTOM_BEHAVIOR_TRIGGER_KEYS_2 = __values(CUSTOM_BEHAVIOR_TRIGGER_KEYS), CUSTOM_BEHAVIOR_TRIGGER_KEYS_2_1 = CUSTOM_BEHAVIOR_TRIGGER_KEYS_2.next(); !CUSTOM_BEHAVIOR_TRIGGER_KEYS_2_1.done; CUSTOM_BEHAVIOR_TRIGGER_KEYS_2_1 = CUSTOM_BEHAVIOR_TRIGGER_KEYS_2.next()) {
                    var key = CUSTOM_BEHAVIOR_TRIGGER_KEYS_2_1.value;
                    if (!!config[key] && event[key].changed) {
                        return true;
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (CUSTOM_BEHAVIOR_TRIGGER_KEYS_2_1 && !CUSTOM_BEHAVIOR_TRIGGER_KEYS_2_1.done && (_b = CUSTOM_BEHAVIOR_TRIGGER_KEYS_2.return)) _b.call(CUSTOM_BEHAVIOR_TRIGGER_KEYS_2);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return false;
        };
        Object.defineProperty(PblDataSourceAdapter.prototype, "inFlight", {
            get: function () { return this._inPreFlight || this._inFlight.size > 0; },
            enumerable: false,
            configurable: true
        });
        PblDataSourceAdapter.prototype.dispose = function () {
            this._refresh$.complete();
            this._onSourceChange$.complete();
        };
        PblDataSourceAdapter.prototype.refresh = function (data) {
            this._refresh$.next({ data: data });
        };
        /**
         * Clears the cache from any existing datasource trigger such as filter, sort etc.
         * @returns The cached value or null if not there.
         */
        PblDataSourceAdapter.prototype.clearCache = function (cacheKey) {
            if (cacheKey in this.cache) {
                var prev = this.cache[cacheKey];
                this.cache[cacheKey] = DEFAULT_INITIAL_CACHE_STATE[cacheKey];
                return prev;
            }
            else {
                return null;
            }
        };
        PblDataSourceAdapter.prototype.setPaginator = function (paginator) {
            this.paginator = paginator;
        };
        PblDataSourceAdapter.prototype.updateProcessingLogic = function (filter$, sort$, pagination$, initialState) {
            var _this = this;
            if (initialState === void 0) { initialState = {}; }
            var updates = -1;
            var changedFilter = function (e) { return updates === -1 || e.changed; };
            var skipUpdate = function (o) { return o.skipUpdate !== true; };
            this._lastSource = undefined;
            this.cache = Object.assign(Object.assign({}, DEFAULT_INITIAL_CACHE_STATE), initialState);
            var combine = [
                filter$.pipe(operators.map(function (value) { return createChangeContainer('filter', value, _this.cache); }), operators.filter(changedFilter)),
                sort$.pipe(operators.filter(skipUpdate), operators.map(function (value) { return createChangeContainer('sort', value, _this.cache); }), operators.filter(changedFilter)),
                pagination$.pipe(operators.map(function (value) { return createChangeContainer('pagination', value, _this.cache); }), operators.filter(changedFilter)),
                this._refresh$.pipe(operators.map(function (value) { return fromRefreshDataWrapper(createChangeContainer('data', value, _this.cache)); }), operators.filter(changedFilter)),
            ];
            var hasCustomBehavior = PblDataSourceAdapter.hasCustomBehavior(this.config);
            return rxjs.combineLatest([combine[0], combine[1], combine[2], combine[3]])
                .pipe(operators.tap(function () { return _this._inPreFlight = true; }), 
            // Defer to next loop cycle, until no more incoming.
            // We use an async schedular here (instead of asapSchedular) because we want to have the largest debounce window without compromising integrity
            // With an async schedular we know we will run after all micro-tasks but before "real" async operations.
            operators.debounceTime(0), operators.switchMap(function (_b) {
                var _c = __read(_b, 4), filterInput = _c[0], sort = _c[1], pagination = _c[2], data = _c[3];
                _this._inPreFlight = false;
                updates++; // if first, will be 0 now (starts from -1).
                var event = {
                    id: Math.random() * 10,
                    filter: filterInput,
                    sort: sort,
                    pagination: pagination,
                    data: data,
                    eventSource: data.changed ? 'data' : 'customTrigger',
                    isInitial: updates === 0,
                    updateTotalLength: function (totalLength) {
                        if (_this.paginator) {
                            _this.paginator.total = totalLength;
                        }
                    }
                };
                _this.onStartOfEvent(event);
                var runHandle = data.changed
                    || (hasCustomBehavior && PblDataSourceAdapter.isCustomBehaviorEvent(event, _this.config));
                var response$ = runHandle
                    ? _this.runHandle(event)
                        .pipe(operators.map(function (data) {
                        if (data !== false) { // if the user didn't return "false" from his handler, we infer data was changed!
                            event.data.changed = true;
                        }
                        return { event: event, data: data };
                    }))
                    : rxjs.of({ event: event, data: _this._lastSource });
                return response$
                    .pipe(operators.map(function (response) {
                    var e_3, _b, e_4, _c;
                    var _a;
                    // If runHandle() returned false, we do not process and return undefined.
                    if (response.data === false) {
                        return;
                    }
                    var config = _this.config;
                    var event = response.event;
                    // mark which of the triggers has changes
                    // The logic is based on the user's configuration and the incoming event
                    var withChanges = {};
                    try {
                        for (var CUSTOM_BEHAVIOR_TRIGGER_KEYS_3 = __values(CUSTOM_BEHAVIOR_TRIGGER_KEYS), CUSTOM_BEHAVIOR_TRIGGER_KEYS_3_1 = CUSTOM_BEHAVIOR_TRIGGER_KEYS_3.next(); !CUSTOM_BEHAVIOR_TRIGGER_KEYS_3_1.done; CUSTOM_BEHAVIOR_TRIGGER_KEYS_3_1 = CUSTOM_BEHAVIOR_TRIGGER_KEYS_3.next()) {
                            var key = CUSTOM_BEHAVIOR_TRIGGER_KEYS_3_1.value;
                            if (!config[key] && (event.isInitial || event[key].changed)) {
                                withChanges[key] = true;
                            }
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (CUSTOM_BEHAVIOR_TRIGGER_KEYS_3_1 && !CUSTOM_BEHAVIOR_TRIGGER_KEYS_3_1.done && (_b = CUSTOM_BEHAVIOR_TRIGGER_KEYS_3.return)) _b.call(CUSTOM_BEHAVIOR_TRIGGER_KEYS_3);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                    // When data changed, apply some logic (caching, operational, etc...)
                    if (event.data.changed) {
                        // cache the data when it has changed.
                        _this._lastSource = response.data;
                        if (config.sort) {
                            // When the user is sorting (i.e. server sorting), the last sort cached is always the last source we get from the user.
                            _this._lastSortedSource = _this._lastSource;
                        }
                        else {
                            // When user is NOT sorting (we sort locally) AND the data has changed we need to apply sorting on it
                            // this might already be true (if sorting was the trigger)...
                            withChanges.sort = true;
                            // because we sort and then filter, filtering updates are also triggered by sort updated
                            withChanges.filter = true;
                        }
                        if (config.filter) {
                            // When the user is filtering (i.e. server filtering), the last filter cached is always the last source we get from the user.
                            _this._lastFilteredSource = _this._lastSource;
                        }
                        else {
                            // When user is NOT filtering (we filter locally) AND the data has changed we need to apply filtering on it
                            // this might already be true (if filtering was the trigger)...
                            withChanges.filter = true;
                        }
                    }
                    // When user is NOT applying pagination (we paginate locally) AND if we (sort OR filter) locally we also need to paginate locally
                    if (!config.pagination && (withChanges.sort || withChanges.filter)) {
                        withChanges.pagination = true;
                    }
                    // Now, apply: sort --> filter --> pagination     ( ORDER MATTERS!!! )
                    if (withChanges.sort) {
                        _this._lastSortedSource = _this.applySort(_this._lastSource, event.sort.curr || event.sort.prev);
                    }
                    var data = _this._lastSortedSource;
                    // we check if filter was asked, but also if we have a filter we re-run
                    // Only sorting is cached at this point filtering is always calculated
                    if (withChanges.filter || (!config.filter && ((_a = event.filter.curr) === null || _a === void 0 ? void 0 : _a.filter))) {
                        data = _this._lastFilteredSource = _this.applyFilter(data, event.filter.curr || event.filter.prev);
                        if (!_this.config.pagination) {
                            if (withChanges.filter || !withChanges.pagination) {
                                _this.resetPagination(data.length);
                            }
                        }
                    }
                    if (withChanges.pagination) {
                        data = _this.applyPagination(data);
                    }
                    var clonedEvent = Object.assign({}, event);
                    try {
                        // We use `combineLatest` which caches pervious events, only new events are replaced.
                        // We need to mark everything as NOT CHANGED, so subsequent calls will not have their changed flag set to true.
                        //
                        // We also clone the object so we can pass on the proper values.
                        // We create shallow clones so complex objects (column in sort, user data in data) will not throw on circular.
                        // For pagination we deep clone because it contains primitives and we need to also clone the internal change objects.
                        for (var TRIGGER_KEYS_1 = __values(TRIGGER_KEYS), TRIGGER_KEYS_1_1 = TRIGGER_KEYS_1.next(); !TRIGGER_KEYS_1_1.done; TRIGGER_KEYS_1_1 = TRIGGER_KEYS_1.next()) {
                            var k = TRIGGER_KEYS_1_1.value;
                            clonedEvent[k] = k === 'pagination'
                                ? JSON.parse(JSON.stringify(event[k]))
                                : Object.assign({}, event[k]);
                            event[k].changed = false;
                        }
                    }
                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                    finally {
                        try {
                            if (TRIGGER_KEYS_1_1 && !TRIGGER_KEYS_1_1.done && (_c = TRIGGER_KEYS_1.return)) _c.call(TRIGGER_KEYS_1);
                        }
                        finally { if (e_4) throw e_4.error; }
                    }
                    event.pagination.page.changed = event.pagination.perPage.changed = false;
                    return {
                        event: clonedEvent,
                        data: data,
                        sorted: _this._lastSortedSource,
                        filtered: _this._lastFilteredSource,
                    };
                }), operators.tap(function () { return _this.onEndOfEvent(event); }), 
                // If runHandle() returned false, we will get undefined here, we do not emit these to the grid, nothing to do.
                operators.filter(function (r) { return !!r; }));
            }));
        };
        PblDataSourceAdapter.prototype.applyFilter = function (data, dataSourceFilter) {
            return filter(data, dataSourceFilter);
        };
        PblDataSourceAdapter.prototype.applySort = function (data, event) {
            return applySort(event.column, event.sort, data);
        };
        PblDataSourceAdapter.prototype.applyPagination = function (data) {
            if (this.paginator) {
                // Set the rendered rows length to the virtual page size. Fill in the data provided
                // from the index start until the end index or pagination size, whichever is smaller.
                var range = this.paginator.range;
                return data.slice(range[0], range[1]);
            }
            return data;
        };
        PblDataSourceAdapter.prototype.resetPagination = function (totalLength) {
            if (this.paginator) {
                this.paginator.total = totalLength;
                this.paginator.page = totalLength > 0 ? 1 : 0;
            }
        };
        PblDataSourceAdapter.prototype.onStartOfEvent = function (event) {
            this._inFlight.add(event);
        };
        PblDataSourceAdapter.prototype.onEndOfEvent = function (event) {
            this._inFlight.delete(event);
        };
        PblDataSourceAdapter.prototype.emitOnSourceChanging = function (event) {
            this._onSourceChange$.next(SOURCE_CHANGING_TOKEN);
        };
        PblDataSourceAdapter.prototype.emitOnSourceChanged = function (event, data) {
            this._onSourceChange$.next(data);
        };
        /**
         * Execute the user-provided function that returns the data collection.
         * This method wraps each of the triggers with a container providing metadata for the trigger. (Old value, was changed? and new value if changed)
         * This is where all cache logic is managed (createChangeContainer).
         *
         * To build a data collection the information from all triggers is required, even if it was not changed.
         * When a trigger is fired with a new value the new value replaces the old value for the trigger and all other triggers will keep their old value.
         * Sending the triggers to the handlers is not enough, we also need to the handlers which of the trigger's have change so they can return
         * data without doing redundant work.
         * For example, fetching paginated data from the server requires a call whenever the pages changes but if the filtering is local for the current page
         * and the filter trigger is fired the handler needs to know that pagination did not change so it will not go and fetch data from the server.
         *
         * The handler can return several data structures, observable, promise, array or false.
         * This method will normalize the response into an observable and notify that the source changed (onSourceChanged).
         *
         * When the response is false that handler wants to skip this cycle, this means that onSourceChanged will not emit and
         * a dead-end observable is returned (observable that will never emit).
         */
        PblDataSourceAdapter.prototype.runHandle = function (event) {
            var _this = this;
            var result = this.sourceFactory(event);
            if (result === false) {
                return rxjs.of(false);
            }
            this.emitOnSourceChanging(event);
            var obs = Array.isArray(result)
                ? rxjs.of(result)
                // else ->            observable : promise
                : (rxjs.isObservable(result) ? result : rxjs.from(result))
                    .pipe(operators.map(function (data) { return Array.isArray(data) ? data : []; })) // TODO: should we error? warn? notify?
            ;
            return obs.pipe(operators.observeOn(rxjs.asapScheduler, 0), // run as a micro-task
            operators.tap(function (data) { return _this.emitOnSourceChanged(event, data); }));
        };
        return PblDataSourceAdapter;
    }());

    var PROCESSING_SUBSCRIPTION_GROUP = {};
    var PblDataSource = /** @class */ (function (_super) {
        __extends(PblDataSource, _super);
        function PblDataSource(adapter, options) {
            var _this = _super.call(this) || this;
            _this._selection = new collections.SelectionModel(true, []);
            _this._tableConnectionChange$ = new rxjs.Subject();
            _this._onRenderDataChanging = new rxjs.Subject();
            _this._renderData$ = new rxjs.BehaviorSubject([]);
            _this._filter$ = new rxjs.BehaviorSubject(undefined);
            _this._sort$ = new rxjs.BehaviorSubject({ column: null, sort: null, skipUpdate: false });
            _this._onError$ = new rxjs.Subject();
            options = options || {};
            _this.adapter = adapter;
            _this.onSourceChanging = _this._adapter.onSourceChanging;
            // emit source changed event every time adapter gets new data
            _this.onSourceChanged = _this.adapter.onSourceChanged
                .pipe(operators.observeOn(rxjs.asapScheduler, 0), // emit on the end of the current turn (micro-task) to ensure `onSourceChanged` emission in `_updateProcessingLogic` run's first.
            operators.mapTo(undefined));
            _this.onRenderDataChanging = _this._onRenderDataChanging.asObservable();
            _this.onRenderedDataChanged = _this._renderData$.pipe(operators.skip(1), operators.mapTo(undefined));
            _this.onError = _this._onError$.asObservable();
            _this.tableConnectionChange = _this._tableConnectionChange$.asObservable();
            _this.keepAlive = options.keepAlive || false;
            _this.skipInitial = options.skipInitial || false;
            _this.sortChange = _this._sort$.asObservable();
            return _this;
        }
        Object.defineProperty(PblDataSource.prototype, "pagination", {
            get: function () { return this._pagination; },
            set: function (value) {
                if (this._pagination !== value) {
                    this._pagination = value;
                    switch (value) {
                        case 'pageNumber':
                            this._paginator = new PblPagingPaginator();
                            break;
                        case 'token':
                            this._paginator = new PblTokenPaginator();
                            break;
                        default:
                            this._paginator = undefined;
                            break;
                    }
                    if (this._adapter) {
                        this._adapter.setPaginator(this._paginator);
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblDataSource.prototype, "adapter", {
            get: function () { return this._adapter; },
            set: function (value) {
                if (this._adapter !== value) {
                    this._adapter = value;
                    if (this.pagination) {
                        this._adapter.setPaginator(this._paginator);
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        ;
        Object.defineProperty(PblDataSource.prototype, "renderStart", {
            /** Returns the starting index of the rendered data */
            get: function () { return this._lastRange ? this._lastRange.start : 0; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblDataSource.prototype, "renderLength", {
            get: function () { return this._renderData$.value.length; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblDataSource.prototype, "renderedData", {
            get: function () { return this._renderData$.value || []; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblDataSource.prototype, "sortedData", {
            /**
             * The `source` with sorting applied.
             * Valid only when sorting is performed client-side.
             *
             * To get real-time notifications use `onRenderDataChanging`.
             * The sorted data is updated just before `onRenderDataChanging` fire.
             */
            get: function () { return (this._lastAdapterEvent && this._lastAdapterEvent.sorted) || []; },
            enumerable: false,
            configurable: true
        });
        ;
        Object.defineProperty(PblDataSource.prototype, "filteredData", {
            /**
             * The `source` with filtering applied.
             * Valid only when filtering is performed client-side.
             * If sorting is applied as well, the filtered results are also sorted.
             *
             * To get real-time notifications use `onRenderDataChanging`.
             * The filtered data is updated just before `onRenderDataChanging` fire.
             */
            get: function () { return (this._lastAdapterEvent && this._lastAdapterEvent.filtered) || []; },
            enumerable: false,
            configurable: true
        });
        ;
        Object.defineProperty(PblDataSource.prototype, "filter", {
            get: function () { return this._filter$.value; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblDataSource.prototype, "sort", {
            get: function () { return this._sort$.value; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblDataSource.prototype, "paginator", {
            get: function () { return this._paginator; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblDataSource.prototype, "length", {
            get: function () { return this.source.length; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblDataSource.prototype, "source", {
            get: function () { return this._source || []; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblDataSource.prototype, "selection", {
            /** Represents selected items on the data source. */
            get: function () { return this._selection; },
            enumerable: false,
            configurable: true
        });
        /**
         * A custom trigger that invokes a manual data source change with the provided data value in the `data` property at tht event.
         */
        PblDataSource.prototype.refresh = function (data) {
            if (this._tableConnected) {
                this._adapter.refresh(data);
            }
            else {
                this._lastRefresh = data;
            }
        };
        PblDataSource.prototype.setFilter = function (value, columns) {
            if (value && typeof value !== 'function' && (!columns || columns.length === 0)) {
                throw new Error('Invalid filter definitions, columns are mandatory when using a single value input.');
            }
            this._filter$.next(createFilter(value, columns || []));
        };
        /**
         * Refresh the filters result.
         *
         * Note that this should only be used when using a predicate function filter and not the simple value filter.
         * In general the filter is refreshed every time it is set and each time the data is updated so manually refreshing a value filter
         * has no impact.
         *
         * For custom predicate function filters this might be useful.
         *
         */
        PblDataSource.prototype.syncFilter = function () {
            var currentFilter = this._adapter.clearCache('filter');
            if (currentFilter) {
                this.setFilter(currentFilter.filter, currentFilter.columns);
            }
        };
        PblDataSource.prototype.setSort = function (column, sort, skipUpdate) {
            if (skipUpdate === void 0) { skipUpdate = false; }
            if (!column || typeof column === 'boolean') {
                this._sort$.next({ column: null, sort: {}, skipUpdate: !!column });
            }
            else {
                this._sort$.next({ column: column, sort: sort, skipUpdate: skipUpdate });
            }
        };
        PblDataSource.prototype.dispose = function () {
            if (!this._disposed) {
                unrx.kill(this);
                this._adapter.dispose();
                this._onRenderDataChanging.complete();
                this._renderData$.complete();
                this._filter$.complete();
                this._sort$.complete();
                this._onError$.complete();
                this._disposed = true;
            }
        };
        PblDataSource.prototype.disconnect = function (cv) {
            this._lastRefresh = undefined;
            this._tableConnectionChange$.next(this._tableConnected = false);
            if (this.keepAlive === false) {
                this.dispose();
            }
        };
        PblDataSource.prototype.connect = function (cv) {
            if (this._disposed) {
                throw new Error('PblDataSource is disposed. Use `keepAlive` if you move datasource between tables.');
            }
            this._tableConnected = true;
            this._updateProcessingLogic(cv);
            this._tableConnectionChange$.next(this._tableConnected);
            return this._renderData$;
        };
        /**
         * Move's an item (in the entire source) from one index to the other, pushing the item in the destination one item backwards.
         *
         * Note that if the rendered data is a subset of the entire source (i.e virtual scroll & range) the indices are considered
         * local to the rendered view and are translated to fit the entire source.
         *
         * Tp disable this behavior, set the `absolute` parameter to `true`
         */
        PblDataSource.prototype.moveItem = function (fromIndex, toIndex, absolute) {
            if (absolute === void 0) { absolute = false; }
            if (absolute !== true && this._lastRange) {
                fromIndex = this._lastRange.start + fromIndex;
                toIndex = this._lastRange.start + toIndex;
            }
            if (this.length > 0) {
                this._eventEmitter.emitEvent({ source: 'ds', kind: 'onBeforeMoveItem', fromIndex: fromIndex, toIndex: toIndex });
                dragDrop.moveItemInArray(this._source, fromIndex, toIndex);
                var data = this._lastRange
                    ? this._source.slice(this._lastRange.start, this._lastRange.end)
                    : this._source;
                this._renderData$.next(data);
            }
        };
        PblDataSource.prototype._attachEmitter = function (emitter) {
            this._eventEmitter = emitter;
        };
        PblDataSource.prototype._detachEmitter = function () {
            this._eventEmitter = undefined;
        };
        PblDataSource.prototype._updateProcessingLogic = function (cv) {
            var _this = this;
            var initialState = { filter: this.filter, sort: this.sort };
            var paginator = this._paginator;
            if (paginator) {
                initialState.pagination = { page: paginator.page, perPage: paginator.perPage };
            }
            var stream = this._adapter.updateProcessingLogic(this._filter$, this._sort$, paginator ? paginator.onChange : rxjs.of(undefined), initialState);
            unrx.kill(this, PROCESSING_SUBSCRIPTION_GROUP);
            var trimToRange = function (range, data) { return data.slice(range.start, range.end + 1); };
            /* We use this flag to skip handling `viewChange` events
               This is on when a call to get data from the adapter (stream) is initiated and set off once the data arrives.
               In this period, we don't want to update the view, instead, we save the last view range and when the data arrive we trim it to fit the view. */
            var skipViewChange;
            var lastEmittedSource;
            // We listen to view changes (scroll updates, practical only in virtual scroll) and trim the data displayed based on what
            // the view change instructs us.
            cv.viewChange
                .pipe(unrx(this, PROCESSING_SUBSCRIPTION_GROUP))
                .subscribe(function (range) {
                var _a, _b;
                if (((_a = _this._lastRange) === null || _a === void 0 ? void 0 : _a.start) === range.start && ((_b = _this._lastRange) === null || _b === void 0 ? void 0 : _b.end) === range.end) {
                    return;
                }
                _this._lastRange = range;
                if (!skipViewChange) {
                    if (range && (lastEmittedSource === null || lastEmittedSource === void 0 ? void 0 : lastEmittedSource.length)) {
                        _this._renderData$.next(trimToRange(_this._lastRange, lastEmittedSource));
                    }
                }
            });
            // We listen to incoming data update triggers when the data is about to change
            stream
                .pipe(unrx(this, PROCESSING_SUBSCRIPTION_GROUP), operators.tap(function (result) {
                lastEmittedSource = result.data;
                skipViewChange = true;
                _this._onRenderDataChanging.next(_this._lastAdapterEvent = result);
            }))
                .subscribe(function (_c) {
                var data = _c.data;
                if (_this._lastRange && (data === null || data === void 0 ? void 0 : data.length)) {
                    data = trimToRange(_this._lastRange, data);
                }
                _this._renderData$.next(data);
                skipViewChange = false;
            }, function (error) { _this._onError$.next(error); });
            this._adapter.onSourceChanged
                .pipe(unrx(this, PROCESSING_SUBSCRIPTION_GROUP))
                .subscribe(function (source) { return _this._source = source || []; });
            if (this._lastRefresh !== undefined) {
                this._adapter.refresh(this._lastRefresh);
                this._lastRefresh = undefined;
            }
            else if (!this.skipInitial) {
                // _refresh$ is a Subject, we must emit once so combineLatest will work
                this.refresh();
            }
        };
        return PblDataSource;
    }(table.DataSource));

    var PblDataSourceBaseFactory = /** @class */ (function () {
        function PblDataSourceBaseFactory() {
            this._adapter = {};
            this._dsOptions = {};
        }
        /**
         * Set the main trigger handler.
         * The trigger handler is the core of the datasource, responsible for returning the data collection.
         *
         * By default the handler is triggered only when the datasource is required.
         * This can happened when:
         *   - The table connected to the datasource.
         *   - A manual call to `PblDataSource.refresh()` was invoked.
         *
         * There are additional triggers (filter/sort/pagination) which occur when their values change, e.g. when
         * a filter has change or when a page in the paginator was changed.
         *
         * By default, these triggers are handled automatically, resulting in a client-side behavior for each of them.
         * For example, a client side paginator will move to the next page based on an already existing data collection (no need to fetch from the server).
         *
         * To handle additional trigger you need to explicitly set them using `setCustomTriggers`.
         */
        PblDataSourceBaseFactory.prototype.onTrigger = function (handler) {
            this._adapter.onTrigger = handler;
            return this;
        };
        /**
         * A list of triggers that will be handled by the trigger handler.
         * By default all triggers are handled by the adapter, resulting in a client-side filter/sort/pagination that works out of the box.
         * To implement server side filtering, sorting and/or pagination specify which should be handled by the on trigger handler.
         *
         * You can mix and match, e.g. support only paging from the server, or only paging and sorting, and leave filtering for the client side.
         */
        PblDataSourceBaseFactory.prototype.setCustomTriggers = function () {
            var e_1, _a;
            var triggers = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                triggers[_i] = arguments[_i];
            }
            if (triggers.length === 0) {
                this._adapter.customTriggers = false;
            }
            else {
                var customTriggers = this._adapter.customTriggers = {};
                try {
                    for (var triggers_1 = __values(triggers), triggers_1_1 = triggers_1.next(); !triggers_1_1.done; triggers_1_1 = triggers_1.next()) {
                        var t = triggers_1_1.value;
                        customTriggers[t] = true;
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (triggers_1_1 && !triggers_1_1.done && (_a = triggers_1.return)) _a.call(triggers_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            return this;
        };
        /**
         * Skip the first trigger emission.
         * Use this for late binding, usually with a call to refresh() on the data source.
         *
         * Note that only the internal trigger call is skipped, a custom calls to refresh will go through
         */
        PblDataSourceBaseFactory.prototype.skipInitialTrigger = function () {
            this._dsOptions.skipInitial = true;
            return this;
        };
        PblDataSourceBaseFactory.prototype.keepAlive = function () {
            this._dsOptions.keepAlive = true;
            return this;
        };
        PblDataSourceBaseFactory.prototype.onCreated = function (handler) {
            this._onCreated = handler;
            return this;
        };
        PblDataSourceBaseFactory.prototype.create = function () {
            var ds = this.createDataSource(this.createAdapter());
            if (this._onCreated) {
                this._onCreated(ds);
            }
            return ds;
        };
        return PblDataSourceBaseFactory;
    }());

    var PblDataSourceFactory = /** @class */ (function (_super) {
        __extends(PblDataSourceFactory, _super);
        function PblDataSourceFactory() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PblDataSourceFactory.prototype.createAdapter = function () {
            return new PblDataSourceAdapter(this._adapter.onTrigger, this._adapter.customTriggers || false);
        };
        PblDataSourceFactory.prototype.createDataSource = function (adapter) {
            return new PblDataSource(adapter, this._dsOptions);
        };
        return PblDataSourceFactory;
    }(PblDataSourceBaseFactory));
    function createDS() {
        return new PblDataSourceFactory();
    }

    var DEFAULT_TABLE_CONFIG = {
        showHeader: true,
        showFooter: false,
        noFiller: false,
        clearContextOnSourceChanging: false,
    };
    var PEB_NGRID_CONFIG = new i0.InjectionToken('PEB_NGRID_CONFIG');
    var PblNgridConfigService = /** @class */ (function () {
        function PblNgridConfigService(_config) {
            var e_1, _a;
            this.config = new Map();
            this.configNotify = new Map();
            if (_config) {
                try {
                    for (var _b = __values(Object.keys(_config)), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var key = _c.value;
                        this.config.set(key, _config[key]);
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
            var gridConfig = this.config.get('table') || {};
            this.config.set('table', Object.assign(Object.assign({}, DEFAULT_TABLE_CONFIG), gridConfig));
        }
        PblNgridConfigService.prototype.has = function (section) {
            return this.config.has(section);
        };
        PblNgridConfigService.prototype.get = function (section, fallback) {
            return this.config.get(section) || fallback;
        };
        PblNgridConfigService.prototype.set = function (section, value) {
            var prev = this.get(section);
            value = Object.assign({}, value);
            Object.freeze(value);
            this.config.set(section, value);
            this.notify(section, value, prev);
        };
        PblNgridConfigService.prototype.onUpdate = function (section) {
            return this.getGetNotifier(section);
        };
        PblNgridConfigService.prototype.getGetNotifier = function (section) {
            var notifier = this.configNotify.get(section);
            if (!notifier) {
                this.configNotify.set(section, notifier = new rxjs.ReplaySubject(1));
            }
            return notifier;
        };
        PblNgridConfigService.prototype.notify = function (section, curr, prev) {
            this.getGetNotifier(section).next({ curr: curr, prev: prev });
        };
        return PblNgridConfigService;
    }());
    /** @nocollapse */ PblNgridConfigService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridConfigService, deps: [{ token: PEB_NGRID_CONFIG, optional: true }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    /** @nocollapse */ PblNgridConfigService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridConfigService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridConfigService, decorators: [{
                type: i0.Injectable,
                args: [{ providedIn: 'root' }]
            }], ctorParameters: function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.Inject,
                            args: [PEB_NGRID_CONFIG]
                        }] }];
        } });

    function deprecatedWarning(deprecated, version, alt) {
        console.warn("\"" + deprecated + "\" is deprecated and will be removed in version " + version + ", use \"" + alt + "\" instead.");
    }

    /**
     * Generated bundle index. Do not edit.
     */

    exports.ON_BEFORE_INVALIDATE_HEADERS = ON_BEFORE_INVALIDATE_HEADERS;
    exports.ON_CONSTRUCTED = ON_CONSTRUCTED;
    exports.ON_DESTROY = ON_DESTROY;
    exports.ON_INIT = ON_INIT;
    exports.ON_INVALIDATE_HEADERS = ON_INVALIDATE_HEADERS;
    exports.ON_RESIZE_ROW = ON_RESIZE_ROW;
    exports.PEB_NGRID_CONFIG = PEB_NGRID_CONFIG;
    exports.PblDataSource = PblDataSource;
    exports.PblDataSourceAdapter = PblDataSourceAdapter;
    exports.PblDataSourceBaseFactory = PblDataSourceBaseFactory;
    exports.PblDataSourceFactory = PblDataSourceFactory;
    exports.PblNgridConfigService = PblNgridConfigService;
    exports.PblPagingPaginator = PblPagingPaginator;
    exports.PblTokenPaginator = PblTokenPaginator;
    exports.StylingDiffer = StylingDiffer;
    exports.applySort = applySort;
    exports.createDS = createDS;
    exports.deepPathGet = deepPathGet;
    exports.deepPathSet = deepPathSet;
    exports.deprecatedWarning = deprecatedWarning;
    exports.getValue = getValue;
    exports.removeFromArray = removeFromArray;
    exports.unrx = unrx;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=pebula-ngrid-core.umd.js.map
