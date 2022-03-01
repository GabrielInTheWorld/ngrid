(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/testing')) :
    typeof define === 'function' && define.amd ? define('@pebula/ngrid/testing', ['exports', '@angular/cdk/testing'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.pebula = global.pebula || {}, global.pebula.ngrid = global.pebula.ngrid || {}, global.pebula.ngrid.testing = {}), global.ng.cdk.testing));
}(this, (function (exports, testing) { 'use strict';

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

    function findHostClassMatch(hostElement, regExp) {
        return __awaiter(this, void 0, void 0, function () {
            var classAttribute;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, hostElement.getAttribute('class')];
                    case 1:
                        classAttribute = _a.sent();
                        return [2 /*return*/, findClassMatch(classAttribute, regExp)];
                }
            });
        });
    }
    function findClassMatch(classAttributeValue, regExp) {
        var e_1, _a;
        try {
            for (var _b = __values(classAttributeValue.split(' ')), _c = _b.next(); !_c.done; _c = _b.next()) {
                var c = _c.value;
                var match = c.trim().match(regExp);
                if (match) {
                    return match;
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

    function mixObjects(base, mixins) {
        mixins.forEach(function (mixin) {
            Object.getOwnPropertyNames(mixin)
                .concat(Object.getOwnPropertySymbols(mixin))
                .forEach(function (name) {
                // mixin can't override base behavior, only add
                if (!base.hasOwnProperty(name)) {
                    // if its a property descriptor we need to rewire the context
                    var propDesc = Object.getOwnPropertyDescriptor(mixin, name);
                    if (propDesc) {
                        Object.defineProperty(base, name, propDesc);
                    }
                    else {
                        base[name] = mixin[name];
                    }
                }
            });
        });
    }
    /**
     * Type-less mixin
     */
    function MixinFree(base, mixin, extend) {
        if (extend === void 0) { extend = 'both'; }
        if (extend === 'proto' || extend === 'both') {
            mixObjects(base.prototype, [mixin.prototype]);
        }
        if (extend === 'class' || extend === 'both') {
            mixObjects(base, [mixin]);
        }
        return base;
    }
    /**
     * A type friendly, class based, mixin functions that mix in instance and static members.
     *
     * EXAMPLE:
     * ```ts
     * class User_ {
     *   id: number;
     *   firstName: string;
     *   lastName: string;
     * }
     *
     * class FullName {
     *   get fullName(): string {
     *     return `${this['firstName']} ${this['lastName']}`;
     *   }
     *
     *   static createId(): number {
     *     // a shady id generator.
     *     return Date.now();
     *   }
     * }
     *
     * export const User = Mixin(User_, FullName);
     * export type User = Mixin<User_, FullName>;
     *
     * // not using it:
     * const user = new User();
     * user.id = User.createId();
     * user.firstName = 'John';
     * user.lastName = 'Doe';
     * console.log(user.fullName); // John Doe
     * ```
     *
     * > To allow Generics in static members (e.g. static createUser(): T) see MixinExt
     *
     * ## Limitations:
     * From a type perspective this utility has limitations.
     *
     * #### You can't (currently) extend a mixed in type.
     *```ts
     *  export const User = Mixin(User_, FullName);
     *
     *  export class MyExtendedUser extends User { // <- Type Error
     *  }
     *```
     *
     * ```
     * Type 'Type<User_ & FullName> & typeof FullName & typeof User_' is not a constructor function type.
     * ```
     *
     * The error is misleading, this is a current known TS limitation (see [Github Issue](https://github.com/Microsoft/TypeScript/issues/4890))
     *
     * #### You can use generic inference once, from that point the generic param types for mixin have to be explicitly set:
     * ```ts
     *   export const User = Mixin(User_, FullName); // fine
     *
     *   export const UserNumber2 = Mixin(User, OtherMixin); // Error
     * ```
     *
     * ```
     * The type argument for type parameter 'TBASE' cannot be inferred from the usage.
     * Consider specifying the type arguments explicitly.
     * Type argument candidate 'FullName' is not a valid type argument because it is not a supertype of candidate 'User_'.
     * Property 'fullName' is missing in type 'User_'.
     * ```
     * This might be related to the previous limitation, or not...
     *
     *
     * There are 2 solution:
     *
     * 1) Using the built in interface that supports up to 6 mixins at once. (base + 6)
     * ```ts
     * export const User = Mixin(User_, FullName, OtherMixin); //  FullName, OtherMixin are 2, you can rest param your way for 5 more...
     * export type User = User_ & FullName & OtherMixin
     * ```
     * > This time we cant use `Mixin` to apply the User **type** so we just do it manually...
     *
     * 2) going the long way:
     * ```ts
     *   export const User = Mixin(User_, FullName); // fine
     *
     *   export const UserNumber2 = Mixin<User, typeof User, OtherMixin, typeof OtherMixin>(User, OtherMixin);
     * ```
     *
     *
     * @param base
     * @param mixin
     */
    function Mixin(base) {
        var mixins = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            mixins[_i - 1] = arguments[_i];
        }
        mixObjects(base.prototype, mixins.map(function (m) { return m.prototype; }));
        mixObjects(base, mixins);
        return base;
    }
    /**
     * For full description see Mixin function.
     *
     * The MixinExt utility does the same as Mixin but also allows adding an extra static type to the intersection.
     *
     * Although static members are mixed in there is a situation that requires an additional static mixin.
     * In a TypeScript class we can not apply generics on static members in the class level, only in a member based level.
     * If we want to return our final mixin type from a static member (e.g: factory) we need a different type.
     *
     * Example:
     * ```ts
     * class User_ {
     *   id: number;
     *   firstName: string;
     *   lastName: string;
     * }
     *
     * class FullName {
     *   get fullName(): string {
     *     return `${this['firstName']} ${this['lastName']}`;
     *   }
     * }
     *
     * const createNew = {
     *   create(): any {
     *     return new User_(); // at this point User_ is fully mixed in.
     *   }
     * }
     *
     * interface CreateStatic<T> {
     *   create(): Mixin<T, FullName>;
     * }
     *
     * export const User = MixinExt(User_, createNew as CreateStatic<User_>, FullName );
     * export type User = Mixin<User_, FullName>;
     * ```
     *
     * > Same as Mixin, MixinExt supports up to 6 mixins but only 1 extra static member.
     * If you need more then 1 just intersect all of your extera static interfaces to 1.
     * @param base
     * @param extraStatic Optional object for extra static member, use for static functions that require generics with Generics.
     * @param mixins
     */
    function MixinExt(base, extraStatic) {
        var mixins = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            mixins[_i - 2] = arguments[_i];
        }
        Mixin.apply(void 0, __spreadArray([base], __read(mixins)));
        mixObjects(base, Array.of(extraStatic));
        return base;
    }

    var CLASS_COLUMN_RE = /^cdk-column-(.+)$/;
    /**
     * Harness for interacting with cells that belong to a column.
     * This can be a column header cell, data cell or a column footer cell
     */
    var PblNgridColumnCellHarness = /** @class */ (function (_super) {
        __extends(PblNgridColumnCellHarness, _super);
        function PblNgridColumnCellHarness() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PblNgridColumnCellHarness.with = function (options) {
            if (options === void 0) { options = {}; }
            return getColumnCellPredicate(PblNgridColumnCellHarness, options);
        };
        PblNgridColumnCellHarness.prototype.getText = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.host()];
                        case 1: return [2 /*return*/, (_a.sent()).text()];
                    }
                });
            });
        };
        PblNgridColumnCellHarness.prototype.getColumnId = function () {
            return __awaiter(this, void 0, void 0, function () {
                var match, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = findHostClassMatch;
                            return [4 /*yield*/, this.host()];
                        case 1: return [4 /*yield*/, _a.apply(void 0, [_b.sent(), CLASS_COLUMN_RE])];
                        case 2:
                            match = _b.sent();
                            if (match) {
                                return [2 /*return*/, match[1]];
                            }
                            throw Error('Could not determine column name of cell.');
                    }
                });
            });
        };
        return PblNgridColumnCellHarness;
    }(testing.ComponentHarness));
    PblNgridColumnCellHarness.hostSelector = "pbl-ngrid-header-cell, pbl-ngrid-cell";
    var PblNgridColumnHeaderCellHarness = /** @class */ (function (_super) {
        __extends(PblNgridColumnHeaderCellHarness, _super);
        function PblNgridColumnHeaderCellHarness() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PblNgridColumnHeaderCellHarness.with = function (options) {
            if (options === void 0) { options = {}; }
            return getColumnCellPredicate(PblNgridColumnHeaderCellHarness, options);
        };
        return PblNgridColumnHeaderCellHarness;
    }(PblNgridColumnCellHarness));
    // TODO: better detection here, not relay on class that might change.
    PblNgridColumnHeaderCellHarness.hostSelector = "pbl-ngrid-header-cell";
    var PblNgridDataCellHarness = /** @class */ (function (_super) {
        __extends(PblNgridDataCellHarness, _super);
        function PblNgridDataCellHarness() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PblNgridDataCellHarness.with = function (options) {
            if (options === void 0) { options = {}; }
            return getColumnCellPredicate(PblNgridDataCellHarness, options);
        };
        return PblNgridDataCellHarness;
    }(PblNgridColumnCellHarness));
    // TODO: better detection here, not relay on class that might change.
    PblNgridDataCellHarness.hostSelector = "pbl-ngrid-cell";
    function getColumnCellPredicate(type, options) {
        // We can't use FluentApi here because ngc will cry
        var predicate = new testing.HarnessPredicate(type, options);
        predicate.addOption('columnIds', options.columnIds, function (harness, columnIds) { return harness.getColumnId().then(function (columnId) { return columnIds.indexOf(columnId) !== -1; }); });
        return predicate;
    }

    /**
     * Harness for interacting with rows that are structured based on a column
     */
    var PblNgridColumnRowHarness = /** @class */ (function (_super_1) {
        __extends(PblNgridColumnRowHarness, _super_1);
        function PblNgridColumnRowHarness() {
            return _super_1 !== null && _super_1.apply(this, arguments) || this;
        }
        PblNgridColumnRowHarness.prototype.getCells = function (filter, type) {
            if (filter === void 0) { filter = {}; }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!type) {
                        type = PblNgridColumnCellHarness;
                    }
                    return [2 /*return*/, this.locatorForAll(type.with(filter))()];
                });
            });
        };
        return PblNgridColumnRowHarness;
    }(testing.ComponentHarness));
    var PblNgridColumnHeaderRowHarness = /** @class */ (function (_super_1) {
        __extends(PblNgridColumnHeaderRowHarness, _super_1);
        function PblNgridColumnHeaderRowHarness() {
            return _super_1 !== null && _super_1.apply(this, arguments) || this;
        }
        PblNgridColumnHeaderRowHarness.prototype.getCellByColumnId = function (columnId) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getCells({ columnIds: [columnId] })];
                        case 1:
                            result = _a.sent();
                            if (result) {
                                return [2 /*return*/, result[0]];
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        PblNgridColumnHeaderRowHarness.prototype.getCells = function (filter) {
            if (filter === void 0) { filter = {}; }
            var _super = Object.create(null, {
                getCells: { get: function () { return _super_1.prototype.getCells; } }
            });
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, _super.getCells.call(this, filter, PblNgridColumnCellHarness)];
                });
            });
        };
        return PblNgridColumnHeaderRowHarness;
    }(PblNgridColumnRowHarness));
    // TODO: better detection here, not relay on class that might change.
    PblNgridColumnHeaderRowHarness.hostSelector = "div[pbl-ngrid-fixed-meta-row-container=\"header\"] pbl-ngrid-column-row.pbl-ngrid-header-row-main";
    var PblNgridDataRowHarness = /** @class */ (function (_super_1) {
        __extends(PblNgridDataRowHarness, _super_1);
        function PblNgridDataRowHarness() {
            return _super_1 !== null && _super_1.apply(this, arguments) || this;
        }
        /**
         * Gets a `HarnessPredicate` that can be used to search for a nGrid data row with specific attributes.
         * @param options Options for narrowing the search
         * @return a `HarnessPredicate` configured with the given options.
         */
        PblNgridDataRowHarness.with = function (options) {
            if (options === void 0) { options = {}; }
            return getDataRowPredicate(PblNgridDataRowHarness, options);
        };
        PblNgridDataRowHarness.prototype.getRowIndex = function () {
            return __awaiter(this, void 0, void 0, function () {
                var attr;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.host().then(function (host) { return host.getAttribute('row-id'); })];
                        case 1:
                            attr = _a.sent();
                            return [2 /*return*/, Number(attr)];
                    }
                });
            });
        };
        PblNgridDataRowHarness.prototype.getRowIdentity = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.host().then(function (host) { return host.getAttribute('row-key'); })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        PblNgridDataRowHarness.prototype.getCells = function (filter) {
            if (filter === void 0) { filter = {}; }
            var _super = Object.create(null, {
                getCells: { get: function () { return _super_1.prototype.getCells; } }
            });
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, _super.getCells.call(this, filter, PblNgridDataCellHarness)];
                });
            });
        };
        return PblNgridDataRowHarness;
    }(PblNgridColumnRowHarness));
    // TODO: better detection here, not relay on class that might change.
    PblNgridDataRowHarness.hostSelector = "pbl-cdk-table pbl-ngrid-row";
    function getDataRowPredicate(type, options) {
        // We can't use FluentApi here because ngc will cry
        var predicate = new testing.HarnessPredicate(type, options);
        predicate
            .addOption('rowIndex', options.rowIndex, function (harness, rowIndex) { return harness.getRowIndex().then(function (result) { return result === rowIndex; }); })
            .addOption('rowIdentity', options.rowIdentity, function (harness, rowIdentity) { return testing.HarnessPredicate.stringMatches(harness.getRowIdentity(), rowIdentity); });
        return predicate;
    }

    var PblNgridHarness = /** @class */ (function (_super) {
        __extends(PblNgridHarness, _super);
        function PblNgridHarness() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PblNgridHarness.register = function (key, method) {
            PblNgridHarness.prototype[key] = method;
        };
        /**
         * Gets a `HarnessPredicate` that can be used to search for a nGrid with specific attributes.
         * @param options Options for narrowing the search
         * @return a `HarnessPredicate` configured with the given options.
         */
        PblNgridHarness.with = function (options) {
            if (options === void 0) { options = {}; }
            return new testing.HarnessPredicate(PblNgridHarness, options);
        };
        PblNgridHarness.prototype.getColumnHeaderRow = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.locatorFor(PblNgridColumnHeaderRowHarness)()];
                });
            });
        };
        PblNgridHarness.prototype.getDataRow = function (rowIdentOrIndex) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (typeof rowIdentOrIndex === 'number') {
                        return [2 /*return*/, this.locatorFor(PblNgridDataRowHarness.with({ rowIndex: rowIdentOrIndex }))()];
                    }
                    else {
                        return [2 /*return*/, this.locatorFor(PblNgridDataRowHarness.with({ rowIdentity: rowIdentOrIndex }))()];
                    }
                    return [2 /*return*/];
                });
            });
        };
        PblNgridHarness.prototype.getDataRows = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.forceStabilize()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, this.locatorForAll(PblNgridDataRowHarness)()];
                    }
                });
            });
        };
        return PblNgridHarness;
    }(testing.ContentContainerComponentHarness));
    PblNgridHarness.hostSelector = 'pbl-ngrid';

    var e_1, _a;
    exports.ScrollToLocation = void 0;
    (function (ScrollToLocation) {
        ScrollToLocation[ScrollToLocation["VerticalStart"] = 0] = "VerticalStart";
        ScrollToLocation[ScrollToLocation["VerticalEnd"] = 1] = "VerticalEnd";
        ScrollToLocation[ScrollToLocation["HorizontalStart"] = 2] = "HorizontalStart";
        ScrollToLocation[ScrollToLocation["HorizontalEnd"] = 3] = "HorizontalEnd";
    })(exports.ScrollToLocation || (exports.ScrollToLocation = {}));
    var PblNgridHarnessActions = /** @class */ (function (_super) {
        __extends(PblNgridHarnessActions, _super);
        function PblNgridHarnessActions() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PblNgridHarnessActions.prototype.waitForRenderChanged = function (fn, timeoutMs, frequency) {
            if (timeoutMs === void 0) { timeoutMs = 500; }
            if (frequency === void 0) { frequency = 10; }
            return __awaiter(this, void 0, void 0, function () {
                var rowIdentities, result, _a, interval, wait, newRows, i, newIdentity, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this.getDataRows().then(function (rows) { return rows.map(function (r) { return r.getRowIdentity(); }); }).then(function (rows) { return Promise.all(rows); })];
                        case 1:
                            rowIdentities = _c.sent();
                            if (!(typeof fn === 'function')) return [3 /*break*/, 3];
                            return [4 /*yield*/, fn()];
                        case 2:
                            _a = _c.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            _a = undefined;
                            _c.label = 4;
                        case 4:
                            result = _a;
                            frequency = Math.max(frequency, 1);
                            timeoutMs = Math.max(timeoutMs, 0);
                            interval = Math.floor(timeoutMs / frequency);
                            wait = function () { return new Promise(function (res) { setTimeout(res, interval); }); };
                            _c.label = 5;
                        case 5:
                            if (!(frequency > 0)) return [3 /*break*/, 14];
                            return [4 /*yield*/, wait()];
                        case 6:
                            _c.sent();
                            return [4 /*yield*/, this.getDataRows()];
                        case 7:
                            newRows = _c.sent();
                            if (rowIdentities.length !== newRows.length) {
                                return [2 /*return*/];
                            }
                            i = 0;
                            _c.label = 8;
                        case 8:
                            if (!(i < rowIdentities.length)) return [3 /*break*/, 13];
                            if (!newRows[i]) return [3 /*break*/, 10];
                            return [4 /*yield*/, newRows[i].getRowIdentity()];
                        case 9:
                            _b = (_c.sent());
                            return [3 /*break*/, 11];
                        case 10:
                            _b = null;
                            _c.label = 11;
                        case 11:
                            newIdentity = _b;
                            if (newIdentity !== rowIdentities[i]) {
                                return [2 /*return*/];
                            }
                            _c.label = 12;
                        case 12:
                            i++;
                            return [3 /*break*/, 8];
                        case 13:
                            frequency -= 1;
                            return [3 /*break*/, 5];
                        case 14: return [2 /*return*/, result];
                    }
                });
            });
        };
        PblNgridHarnessActions.prototype.getColumnIds = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.getColumnHeaderRow()
                            .then(function (header) { return header.getCells(); })
                            .then(function (columns) { return Promise.all(columns.map(function (c) { return c.getColumnId(); })); })];
                });
            });
        };
        PblNgridHarnessActions.prototype.getViewPortData = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.forceStabilize()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, this.getDataRows()
                                    .then(function (rows) { return rows.map(function (r) { return r.getCells().then(function (cells) { return cells.map(function (c) { return c.getText(); }); }); }); })
                                    .then(function (rows) { return Promise.all(rows.map(function (pRow) { return pRow.then(function (row) { return Promise.all(row); }); })); })];
                    }
                });
            });
        };
        PblNgridHarnessActions.prototype.scrollTo = function (x, y) {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            // TODO: support protractor env
                            _a = scrollDom;
                            return [4 /*yield*/, this.locatorFor('pbl-cdk-virtual-scroll-viewport')()];
                        case 1:
                            // TODO: support protractor env
                            _a.apply(void 0, [_b.sent(), x, y]);
                            return [2 /*return*/];
                    }
                });
            });
        };
        PblNgridHarnessActions.prototype.scrollToLocation = function (location) {
            return __awaiter(this, void 0, void 0, function () {
                var viewPort, element, x, y;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.locatorFor('pbl-cdk-virtual-scroll-viewport')()];
                        case 1:
                            viewPort = _a.sent();
                            element = viewPort.element;
                            x = element.scrollLeft;
                            y = element.scrollTop;
                            switch (location) {
                                case exports.ScrollToLocation.HorizontalStart:
                                    x = 0;
                                    break;
                                case exports.ScrollToLocation.HorizontalEnd:
                                    x = element.scrollWidth;
                                    break;
                                case exports.ScrollToLocation.VerticalStart:
                                    y = 0;
                                    break;
                                case exports.ScrollToLocation.VerticalEnd:
                                    y = element.scrollHeight;
                                    break;
                            }
                            scrollDom(viewPort, x, y);
                            return [2 /*return*/];
                    }
                });
            });
        };
        return PblNgridHarnessActions;
    }(PblNgridHarness));
    function scrollDom(viewPort, x, y) {
        return __awaiter(this, void 0, void 0, function () {
            var element;
            return __generator(this, function (_a) {
                element = viewPort.element;
                element.scroll(x, y);
                return [2 /*return*/];
            });
        });
    }
    var keys = Object.getOwnPropertyNames(PblNgridHarnessActions.prototype);
    try {
        for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
            var key = keys_1_1.value;
            PblNgridHarness.register(key, PblNgridHarnessActions.prototype[key]);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
        }
        finally { if (e_1) throw e_1.error; }
    }

    /**
     * Generated bundle index. Do not edit.
     */

    exports.PblNgridColumnCellHarness = PblNgridColumnCellHarness;
    exports.PblNgridColumnHeaderCellHarness = PblNgridColumnHeaderCellHarness;
    exports.PblNgridColumnHeaderRowHarness = PblNgridColumnHeaderRowHarness;
    exports.PblNgridDataCellHarness = PblNgridDataCellHarness;
    exports.PblNgridHarness = PblNgridHarness;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=pebula-ngrid-testing.umd.js.map
