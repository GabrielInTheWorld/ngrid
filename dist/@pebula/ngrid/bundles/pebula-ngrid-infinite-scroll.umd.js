(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@pebula/ngrid/core'), require('rxjs'), require('rxjs/operators'), require('@pebula/ngrid'), require('@angular/core'), require('@angular/cdk/table'), require('@angular/common'), require('@pebula/ngrid/target-events')) :
    typeof define === 'function' && define.amd ? define('@pebula/ngrid/infinite-scroll', ['exports', '@pebula/ngrid/core', 'rxjs', 'rxjs/operators', '@pebula/ngrid', '@angular/core', '@angular/cdk/table', '@angular/common', '@pebula/ngrid/target-events'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.pebula = global.pebula || {}, global.pebula.ngrid = global.pebula.ngrid || {}, global.pebula.ngrid['infinite-scroll'] = {}), global.pebula.ngrid.core, global.rxjs, global.rxjs.operators, global.pebula.ngrid, global.ng.core, global.ng.cdk.table, global.ng.common, global.pebula.ngrid['target-events']));
}(this, (function (exports, core, rxjs, operators, ngrid, i0, table, common, targetEvents) { 'use strict';

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

    var INFINITE_SCROLL_DEFFERED_ROW = {};

    /*
    This cache will force the blocks to align perfectly, where no event can be fired with rows
    that overlap any other pervious or future event unless they overlap fully.
    For example, if the block size is 50 and strictBlocks is true the events will include fromRow, toRows: [0, 49] [50, 99] .... [300, 349]
    If strictBlocks is false you might get the above but might also get [73, 122] etc...

    While the user scrolls slowly the datasource will output strict blocks natively, the anomalies happen when
    the user scrolls fast, into a scroll area with no rows.

    Using strictBlocks fits to scenarios where the server returns page based pagination with no option to get items between pages. (i.e. fixed page size)
    If your server returns pagination based on "skip" and "limit" then using strictBlocks does not add any value.

    When using strictBlocks cache performance might improve but the tradeoff is a little bit more API calls.
    */
    /**
     * A Caching strategy that enforces storing cache rows in blocks where
     *
     *  - All blocks have the same predefined size (configurable)
     *  - A block contains items in a sequence (I.E A block is a page)
     *  - Each block must continue a sequence from the last block.
     *
     * In Addition, the cache is limited by size (configurable).
     * When items are added or when maximum size is updated the cache will auto-purge items
     * that cause overflow.
     *
     * If items are added which breaks the current sequence the entire cache is purged automatically.
     *
     * This is best for grid's that use a datasource with page based pagination.
     * While the user scrolls, each next item is most often the next block in sequence.
     *
     * Note that when pre-defining the virtual size to the total amount of rows will allow the user
     * to fast scroll which might break the sequence, skipping a block or more, thus purging the entire cache.
     */
    var SequencedBlockCache = /** @class */ (function () {
        function SequencedBlockCache(context, options) {
            this.context = context;
            this.end = -1;
            this.start = 0;
            this._maxSize = 0;
            this.options = Object.assign({}, (options || {}));
        }
        Object.defineProperty(SequencedBlockCache.prototype, "maxSize", {
            get: function () { return this._maxSize; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SequencedBlockCache.prototype, "size", {
            get: function () { return this.end - this.start + 1; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SequencedBlockCache.prototype, "empty", {
            get: function () { return this.size === 0; },
            enumerable: false,
            configurable: true
        });
        SequencedBlockCache.prototype.remove = function (startRow, count) {
            var start = Math.max(startRow, this.start);
            var end = Math.min(startRow + count - 1, this.end);
            return [[start, end]];
        };
        /**
         * Set the new max size for this cache.
         * @returns When new max size is bigger the old & current size violates the new max size, return the number of items trimmed from the cache
         * with positive value if trimmed from end, negative value if trimmed from start. Otherwise returns 0.
         */
        SequencedBlockCache.prototype.setCacheSize = function (maxSize) {
            this._maxSize = Math.max(0, maxSize);
            var oversize = this.alignBoundary(this.lastAdd || 1);
            if (oversize < 0) {
                return [
                    [this.start + oversize, this.start - 1],
                ];
            }
            else if (oversize > 0) {
                return [
                    [this.end + 1, this.end + oversize],
                ];
            }
            else {
                return [];
            }
        };
        SequencedBlockCache.prototype.update = function (startRow, endRow, direction) {
            if (this.empty) {
                return this.add(startRow, endRow - startRow + 1);
            }
            else if (this.isSibling(startRow, endRow, direction)) {
                if (direction === -1) {
                    var offset = this.start - startRow;
                    return this.add(startRow, offset);
                }
                else if (direction === 1) {
                    var offset = endRow - this.end;
                    return this.add(this.end + 1, offset);
                }
                else {
                    if (typeof ngDevMode === 'undefined' || ngDevMode) {
                        throw new Error('Infinite scroll - Sequenced block cache Error');
                    }
                    return;
                }
            }
            else {
                var result = this.clear();
                this.add(startRow, endRow - startRow + 1);
                return result;
            }
        };
        SequencedBlockCache.prototype.clear = function () {
            this.lastAdd = undefined;
            if (this.empty) {
                return [[0, 0]];
            }
            var _a = this, start = _a.start, end = _a.end;
            this.start = 0;
            this.end = -1;
            return [[start, end]];
        };
        SequencedBlockCache.prototype.createBlock = function (startIndex, endIndex, totalLength) {
            if (totalLength === void 0) { totalLength = 0; }
            var _a = __read(this.matchBlock(startIndex, endIndex) || [], 3), direction = _a[0], start = _a[1], end = _a[2];
            if (!direction) {
                return undefined;
            }
            var blockSize = this.context.options.blockSize;
            var fromRow;
            var toRow;
            switch (direction) {
                case -1:
                    fromRow = Math.max(0, end - (blockSize - 1));
                    toRow = end;
                    break;
                case 1:
                    fromRow = start;
                    toRow = start + blockSize - 1;
                    break;
            }
            if (totalLength && fromRow >= totalLength) {
                return undefined;
            }
            // Strict Block logic:
            // Now, we align the block to match a sequential world of blocks based on the block size.
            // If we have a gap we want to divert to the nearest block start/end, based on the direction.
            // If we go down (direction is 1) we want the nearest block start BELOW us, getting duplicates in the call but ensuring no gaps ahead
            // If we go up (direction is -1) we want to nearest block start ABOVE us, getting duplicates in the call but ensuring no gaps ahead.
            var main = direction === 1 ? fromRow : toRow;
            var rem = main % blockSize;
            if (rem !== 0) {
                fromRow = main - rem;
                toRow = fromRow + blockSize - 1;
            }
            if (totalLength) {
                if (toRow >= totalLength) {
                    toRow = totalLength - 1;
                    fromRow = toRow - (toRow % blockSize);
                }
            }
            return [direction, fromRow, toRow];
        };
        SequencedBlockCache.prototype.matchBlock = function (start, end) {
            if (this.empty) {
                return [1, start, end];
            }
            if (start >= this.start && end <= this.end) {
                return undefined;
            }
            if (start < this.start && end >= this.start - 1) {
                return [-1, start, this.start - 1];
            }
            if (end > this.end && start <= this.end + 1) {
                return [1, this.end + 1, end];
            }
            return [end > this.end ? 1 : -1, start, end];
        };
        SequencedBlockCache.prototype.oversize = function () {
            return this._maxSize ? Math.max(this.size - this._maxSize, 0) : 0;
        };
        SequencedBlockCache.prototype.isSibling = function (startRow, endRow, direction) {
            if (direction === 1) {
                return this.end + 1 === startRow;
            }
            if (direction === -1) {
                return this.start - 1 === endRow;
            }
            return false;
        };
        SequencedBlockCache.prototype.add = function (startRow, count) {
            if (startRow < 0 || count <= 0) {
                return [];
            }
            var oversize;
            var end = startRow + count - 1;
            if (this.empty) {
                this.start = startRow;
                this.end = end;
                oversize = this.alignBoundary(1);
            }
            else if (startRow < this.start) {
                this.start = startRow;
                oversize = this.alignBoundary(-(this.lastAdd = -1));
            }
            else if (end > this.end) {
                this.end = end;
                oversize = this.alignBoundary(-(this.lastAdd = 1));
            }
            if (oversize < 0) {
                return [
                    [this.start + oversize, this.start - 1],
                ];
            }
            else if (oversize > 0) {
                return [
                    [this.end + 1, this.end + oversize],
                ];
            }
            else {
                return [];
            }
        };
        /**
         * Align the cache to fix max size.
         * @returns the number of items trimmed from the cache with positive value if trimmed from end, negative value if trimmed from start.
        */
        SequencedBlockCache.prototype.alignBoundary = function (trimFrom) {
            var oversize = this.oversize();
            if (oversize) {
                if (trimFrom === 1) {
                    this.end -= oversize;
                }
                else {
                    this.start += oversize;
                    return -oversize;
                }
            }
            return oversize;
        };
        return SequencedBlockCache;
    }());

    var Fragment = /** @class */ (function () {
        function Fragment(start, end) {
            this.start = start;
            this.end = end;
        }
        Fragment.calcEnd = function (startRow, count) {
            return startRow + count - 1;
        };
        Object.defineProperty(Fragment.prototype, "size", {
            get: function () { return this.end - this.start + 1; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Fragment.prototype, "empty", {
            get: function () { return this.size === 0; },
            enumerable: false,
            configurable: true
        });
        Fragment.prototype.containsRow = function (rowIndex) {
            return rowIndex >= this.start && rowIndex <= this.end;
        };
        Fragment.prototype.equals = function (f) {
            return this.start === f.start && this.end === f.end;
        };
        return Fragment;
    }());

    var Fragments = /** @class */ (function (_super) {
        __extends(Fragments, _super);
        function Fragments() {
            var _this = _super.apply(this, __spreadArray([], __read(arguments))) || this;
            _this.dirty = false;
            _this._size = 0;
            return _this;
        }
        Object.defineProperty(Fragments.prototype, "size", {
            get: function () {
                if (this.dirty) {
                    this.onDirty();
                }
                return this._size;
            },
            enumerable: false,
            configurable: true
        });
        Fragments.prototype.remove = function (startRow, count, startFrom) {
            if (startFrom === void 0) { startFrom = 0; }
            var result = [];
            var endRow = Fragment.calcEnd(startRow, count);
            var index = this.searchByRow(startRow, startFrom);
            if (index !== -1) {
                var item = this[index];
                var originalEnd = item.end;
                var gap = originalEnd - endRow;
                item.end = startRow - 1;
                if (gap === 0) {
                    result.push([startRow, endRow]);
                }
                else if (gap < 0) {
                    result.push.apply(result, __spreadArray([[startRow, originalEnd]], __read(this.remove(originalEnd + 1, gap, index + 1))));
                }
                else {
                    var f = new Fragment(endRow + 1, originalEnd);
                    this.splice(index, 0, f);
                    result.push([startRow, endRow]);
                }
                if (result.length > 0) {
                    this.markDirty();
                }
            }
            return result;
        };
        Fragments.prototype.removeItems = function (count, location) {
            var result = [];
            var f;
            while (count > 0) {
                f = location === -1 ? this.shift() : this.pop();
                if (!f) {
                    break;
                }
                if (f.size > count) {
                    if (location === -1) {
                        f.start += count;
                        result.push([f.start - count, f.start - 1]);
                    }
                    else {
                        f.end -= count;
                        result.push([f.end + 1, f.end + count]);
                    }
                    count = 0;
                }
                else {
                    count = count - f.size;
                    result.push([f.start, f.end]);
                    f = undefined;
                }
            }
            if (f) {
                if (location === -1) {
                    this.unshift(f);
                }
                else {
                    this.push(f);
                }
            }
            if (result.length > 0) {
                this.markDirty();
            }
            return result;
        };
        Fragments.prototype.clear = function () {
            var result = [];
            while (this.length > 0) {
                var f = this.shift();
                result.push([f.start, f.end]);
            }
            if (result.length > 0) {
                this.markDirty();
            }
            return result;
        };
        /**
         * Returns the first row index of a missing row that is the most close (based on the direction) to the provided rowIndex.
         * If the provided rowIndex is missing, returns the provided rowIndex.
         * Note that when the direction is -1 the closest missing row might be -1, i.e. all rows are in-place and nothing is missing
         */
        Fragments.prototype.findClosestMissing = function (rowIndex, direction) {
            var fragment = this[this.searchByRow(rowIndex)];
            if (fragment) { // we assume fragments must have gaps or else they are merged
                return direction === 1 ? fragment.end + 1 : fragment.start - 1;
            }
            return rowIndex;
        };
        Fragments.prototype.containsRange = function (startRow, endRow) {
            var first = this[this.searchByRow(startRow)];
            return first && endRow <= first.end; // we assume fragments must have gaps or else they are merged
        };
        /**
         * Search all fragments and find the index of the fragments that contains a specific row index
         */
        Fragments.prototype.searchByRow = function (rowIndex, startFrom) {
            if (startFrom === void 0) { startFrom = 0; }
            var end = this.length - 1;
            while (startFrom <= end) {
                var mid = Math.floor((startFrom + end) / 2);
                var item = this[mid];
                if (item.containsRow(rowIndex)) {
                    return mid;
                }
                else if (item.end < rowIndex) {
                    startFrom = mid + 1;
                }
                else {
                    end = mid - 1;
                }
            }
            return -1;
        };
        /**
         * Search for the row that either contain the rowIndex or is the closest to it (from the start)
         * I.e, if no fragment contains the rowIndex, the closest fragment to it will return it's index
         * If The row index is greater then the end of the hightest fragment -1 is returned
         * */
        Fragments.prototype.searchRowProximity = function (rowIndex, startFrom) {
            if (startFrom === void 0) { startFrom = 0; }
            var end = this.length - 1;
            var mostProximate = -1;
            while (startFrom <= end) {
                var mid = Math.floor((startFrom + end) / 2);
                var item = this[mid];
                if (item.containsRow(rowIndex)) {
                    return mid;
                }
                else if (item.end < rowIndex) {
                    startFrom = mid + 1;
                }
                else {
                    mostProximate = mid;
                    end = mid - 1;
                }
            }
            return mostProximate;
        };
        Fragments.prototype.markDirty = function () {
            this.dirty = true;
        };
        /**
         * Check and verify that there are no sequential blocks (e.g. block 1 [0, 99], block 2 [100, 199])
         * If there are, merge them into a single block
         */
        Fragments.prototype.checkAndMerge = function () {
            for (var i = 1; i < this.length; i++) {
                if (this[i - 1].end + 1 === this[i].start) {
                    this[i - 1].end = this[i].end;
                    this.splice(i, 1);
                    i -= 1;
                }
            }
        };
        Fragments.prototype.onDirty = function () {
            this.dirty = false;
            this._size = this.reduce(function (s, f) { return s + f.size; }, 0);
        };
        return Fragments;
    }(Array));

    var IntersectionType;
    (function (IntersectionType) {
        /** No intersection between "source" and "target" */
        IntersectionType[IntersectionType["none"] = 0] = "none";
        /** "source" and "target" are equal */
        IntersectionType[IntersectionType["full"] = 1] = "full";
        /** "target" contains the entire "source" */
        IntersectionType[IntersectionType["contained"] = 2] = "contained";
        /** "source" contains the entire "target" */
        IntersectionType[IntersectionType["contains"] = 3] = "contains";
        /** A portion from the "source" is not intersected with the "target" */
        IntersectionType[IntersectionType["partial"] = 4] = "partial";
    })(IntersectionType || (IntersectionType = {}));
    function intersect(f1, f2) {
        var min = f1.start < f2.start ? f1 : f2;
        var max = min === f1 ? f2 : f1;
        return min.end < max.start
            ? null
            : new Fragment(max.start, min.end < max.end ? min.end : max.end);
    }
    function findIntersectionType(source, target, intersection) {
        if (source.equals(target)) {
            return IntersectionType.full;
        }
        if (intersection === undefined) {
            intersection = intersect(source, target);
        }
        if (!intersection) {
            return IntersectionType.none;
        }
        if (source.equals(intersection)) {
            return IntersectionType.contained;
        }
        if (target.equals(intersection)) {
            return IntersectionType.contains;
        }
        return IntersectionType.partial;
    }

    /**
     * A Caching strategy that enforces storing cache rows in blocks where
     *
     *  - All blocks have the same predefined size (configurable)
     *  - A block contains items in a sequence (I.E A block is a page)
     *
     * In Addition, the cache is limited by size (configurable).
     * When items are added or when maximum size is updated the cache will auto-purge items
     * that cause overflow.
     *
     * Beside overflow, not other logic can perform automatic purging.
     *
     * This is best for grid's that use a datasource with an index based pagination (skip/limit) and
     */
    var FragmentedBlockCache = /** @class */ (function () {
        function FragmentedBlockCache(context, options) {
            this.context = context;
            this._maxSize = 0;
            // DO NOT MODIFY FRAGMENT ITEMS IN THE COLLECTION WITHOUT CALLING "markDirty()" afterwards
            this.fragments = new Fragments();
            this.lastStartRow = 0;
            this.lastDir = 1;
            this.options = Object.assign({}, (options || {}));
        }
        Object.defineProperty(FragmentedBlockCache.prototype, "maxSize", {
            get: function () { return this._maxSize; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FragmentedBlockCache.prototype, "size", {
            get: function () { return this.fragments.size; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FragmentedBlockCache.prototype, "empty", {
            get: function () { return this.size === 0; },
            enumerable: false,
            configurable: true
        });
        FragmentedBlockCache.prototype.remove = function (startRow, count) {
            return this.fragments.remove(startRow, count);
        };
        /**
         * Set the new max size for this cache.
         * @returns When new max size is bigger the old & current size violates the new max size, return the number of items trimmed from the cache
         * with positive value if trimmed from end, negative value if trimmed from start. Otherwise returns 0.
         */
        FragmentedBlockCache.prototype.setCacheSize = function (maxSize) {
            this._maxSize = Math.max(0, maxSize);
            return this.alignBoundary();
        };
        FragmentedBlockCache.prototype.update = function (startRow, endRow, direction) {
            this.coldLocation = direction === 1 ? -1 : 1;
            return this.add(startRow, endRow);
        };
        FragmentedBlockCache.prototype.clear = function () {
            this.coldLocation = undefined;
            if (this.empty) {
                return [[0, 0]];
            }
            return this.fragments.clear();
        };
        FragmentedBlockCache.prototype.createBlock = function (startIndex, endIndex, totalLength) {
            if (totalLength === void 0) { totalLength = 0; }
            var _a = __read(this.matchBlock(startIndex, endIndex) || [], 3), direction = _a[0], start = _a[1], end = _a[2];
            // LOG(`CREATE BLOCK: [${startIndex}, ${endIndex}] => [${direction}, ${start}, ${end}]`)
            if (!direction) {
                return undefined;
            }
            var blockSize = this.context.options.blockSize;
            var strictPaging = this.options.strictPaging;
            var fromRow;
            var toRow;
            switch (direction) {
                case -1:
                    fromRow = Math.max(0, end - (blockSize - 1));
                    toRow = end;
                    if (!strictPaging && fromRow < start) {
                        fromRow = Math.min(this.fragments.findClosestMissing(fromRow, 1), start);
                    }
                    break;
                case 1:
                    fromRow = start;
                    toRow = start + blockSize - 1;
                    if (!strictPaging && toRow > end) {
                        toRow = Math.max(this.fragments.findClosestMissing(toRow, -1), end);
                    }
                    break;
            }
            if (totalLength && fromRow >= totalLength) {
                return undefined;
            }
            // Strict Block logic:
            // Now, we align the block to match a sequential world of blocks based on the block size.
            // If we have a gap we want to divert to the nearest block start/end, based on the direction.
            // If we go down (direction is 1) we want the nearest block start BELOW us, getting duplicates in the call but ensuring no gaps ahead
            // If we go up (direction is -1) we want to nearest block start ABOVE us, getting duplicates in the call but ensuring no gaps ahead.
            if (strictPaging) {
                var main = direction === 1 ? fromRow : toRow;
                var rem = main % blockSize;
                if (rem !== 0) {
                    fromRow = main - rem;
                    toRow = fromRow + blockSize - 1;
                }
            }
            if (totalLength && toRow >= totalLength) {
                toRow = totalLength - 1;
                if (strictPaging) {
                    fromRow = toRow - (toRow % blockSize);
                }
            }
            return [direction, fromRow, toRow];
        };
        FragmentedBlockCache.prototype.matchBlock = function (start, end) {
            if (this.empty) {
                return [1, start, end];
            }
            var iFirst = this.fragments.searchRowProximity(start);
            var iLast = this.fragments.searchRowProximity(end);
            if (iFirst === -1) {
                return [1, start, end];
            }
            var first = this.fragments[iFirst];
            if (iLast === -1) {
                return [1, first.containsRow(start) ? first.end + 1 : start, end];
            }
            var intersectionType = findIntersectionType(first, new Fragment(start, end));
            var dir = this.lastStartRow > start ? -1 : this.lastStartRow === start ? this.lastDir : 1;
            this.lastStartRow = start;
            this.lastDir = dir;
            // The logic here assumes that there are not sequential blocks, (e.g. block 1 [0, 99], block 2 [100, 199])
            // All sequential blocks are to be merged via checkAndMerge on the fragments collection
            switch (intersectionType) {
                case IntersectionType.none:
                    return [dir, start, end];
                case IntersectionType.partial:
                    if (iFirst === iLast) {
                        if (start < first.start) {
                            return [dir, start, first.start - 1];
                        }
                        else {
                            return [dir, first.end + 1, end];
                        }
                    }
                    else {
                        var last_1 = this.fragments[iLast];
                        return [dir, start < first.start ? start : first.end + 1, end >= last_1.start ? last_1.start - 1 : end];
                    }
                case IntersectionType.contained:
                    var last = this.fragments[iLast];
                    return [dir, start, end >= last.start ? last.start - 1 : end];
                case IntersectionType.contains:
                case IntersectionType.full:
                    return undefined;
            }
        };
        FragmentedBlockCache.prototype.add = function (startRow, endRow) {
            if (startRow < 0 || endRow <= 0) {
                return [];
            }
            var newFragment = new Fragment(startRow, endRow);
            var iFirst = this.fragments.searchRowProximity(startRow);
            var first = this.fragments[iFirst];
            var intersectionType = !first ? null : findIntersectionType(first, newFragment);
            switch (intersectionType) {
                case null:
                    // EDGE CASE: when  "first" is undefined, i.e. "iFirst" is -1
                    // This edge case means no proximity, i,e. the new fragment is AFTER the last fragment we currently have (or we have no fragments)
                    this.fragments.push(newFragment);
                    break;
                case IntersectionType.none: // it means first === last
                    this.fragments.splice(iFirst, 0, newFragment);
                    break;
                case IntersectionType.partial:
                case IntersectionType.contained:
                    var iLast = this.fragments.searchRowProximity(endRow);
                    if (iLast === -1) {
                        iLast = this.fragments.length - 1;
                    }
                    var last = this.fragments[iLast];
                    first.start = Math.min(newFragment.start, first.start);
                    if (newFragment.end >= last.start) {
                        first.end = newFragment.end;
                        this.fragments.splice(iFirst + 1, iLast - iFirst);
                    }
                    else {
                        first.end = Math.max(newFragment.end, first.end);
                        this.fragments.splice(iFirst + 1, (iLast - 1) - iFirst);
                    }
                    break;
                case IntersectionType.contains:
                case IntersectionType.full:
                    return [];
            }
            this.fragments.markDirty();
            this.fragments.checkAndMerge();
            return this.alignBoundary();
        };
        FragmentedBlockCache.prototype.oversize = function () {
            return this._maxSize ? Math.max(this.size - this._maxSize, 0) : 0;
        };
        FragmentedBlockCache.prototype.alignBoundary = function () {
            var oversize = this.oversize();
            return oversize > 0 ? this.fragments.removeItems(oversize, this.coldLocation || 1) : [];
        };
        return FragmentedBlockCache;
    }());

    /**
     * A Caching strategy that enforces storing cache rows in blocks where
     *
     *  - All blocks have the same predefined size (configurable)
     *  - A block contains items in a sequence (I.E A block is a page)
     *  - Each block must continue a sequence from the last block.
     *
     * In Addition, the cache is limited by size (configurable).
     * When items are added or when maximum size is updated the cache will auto-purge items
     * that cause overflow.
     *
     * If items are added which breaks the current sequence the entire cache is purged automatically.
     *
     * This is best for grid's that use a datasource with page based pagination.
     * While the user scrolls, each next item is most often the next block in sequence.
     *
     * Note that when pre-defining the virtual size to the total amount of rows will allow the user
     * to fast scroll which might break the sequence, skipping a block or more, thus purging the entire cache.
     */
    var NoOpBlockCache = /** @class */ (function () {
        function NoOpBlockCache(context, virtualRow) {
            this.context = context;
            this.virtualRow = virtualRow;
            this.ds = context.getDataSource();
        }
        Object.defineProperty(NoOpBlockCache.prototype, "maxSize", {
            get: function () { return this.ds.length; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NoOpBlockCache.prototype, "size", {
            get: function () { return this.ds.length; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NoOpBlockCache.prototype, "empty", {
            get: function () { return this.size === 0; },
            enumerable: false,
            configurable: true
        });
        NoOpBlockCache.prototype.remove = function (startRow, count) {
            var start = 0;
            var end = Math.min(startRow + count - 1, this.ds.length);
            return [[start, end]];
        };
        /**
         * Set the new max size for this cache.
         * @returns When new max size is bigger the old & current size violates the new max size, return the number of items trimmed from the cache
         * with positive value if trimmed from end, negative value if trimmed from start. Otherwise returns 0.
         */
        NoOpBlockCache.prototype.setCacheSize = function (maxSize) {
            return [];
        };
        NoOpBlockCache.prototype.update = function (startRow, endRow, direction) {
            return [];
        };
        NoOpBlockCache.prototype.clear = function () {
            return [[0, this.ds.length - 1]];
        };
        NoOpBlockCache.prototype.createBlock = function (startIndex, endIndex, totalLength) {
            if (totalLength === void 0) { totalLength = 0; }
            var _a = __read(this.matchBlock(startIndex, endIndex) || [], 3), direction = _a[0], start = _a[1], end = _a[2];
            if (!direction) {
                return undefined;
            }
            var blockSize = this.context.options.blockSize;
            var fromRow;
            var toRow;
            switch (direction) {
                case -1:
                    fromRow = Math.max(0, end - (blockSize - 1));
                    toRow = end;
                    break;
                case 1:
                    fromRow = start;
                    toRow = start + blockSize - 1;
                    break;
            }
            if (totalLength && fromRow >= totalLength) {
                return undefined;
            }
            if (totalLength) {
                if (toRow >= totalLength) {
                    toRow = totalLength - 1;
                }
            }
            return [direction, fromRow, toRow];
        };
        NoOpBlockCache.prototype.matchBlock = function (start, end) {
            if (start === end) {
                return [1, start, end];
            }
            var source = this.ds.source;
            for (var i = start; i <= end; i++) {
                if (source[i] !== this.virtualRow) {
                    start = i;
                }
                else {
                    break;
                }
            }
            if (start === end) {
                return undefined;
            }
            else {
                return [1, start, end];
            }
        };
        return NoOpBlockCache;
    }());

    function createCacheAdapter(context, options) {
        switch (options.type) {
            case 'noOpCache':
                return new NoOpBlockCache(context, INFINITE_SCROLL_DEFFERED_ROW);
            case 'sequenceBlocks':
                return new SequencedBlockCache(context, options.options);
            case 'fragmentedBlocks':
                return new FragmentedBlockCache(context, options.options);
        }
    }

    function normalizeCacheOptions(options) {
        if (!options) {
            options = { type: 'noOpCache' };
        }
        return options;
    }
    var PblInfiniteScrollDataSourceCache = /** @class */ (function () {
        function PblInfiniteScrollDataSourceCache(context, options) {
            this.context = context;
            this.cacheAdapter = createCacheAdapter(context, normalizeCacheOptions(options));
            this.setCacheSize(300);
        }
        Object.defineProperty(PblInfiniteScrollDataSourceCache.prototype, "maxSize", {
            get: function () { return this.cacheAdapter.maxSize; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblInfiniteScrollDataSourceCache.prototype, "size", {
            get: function () { return this.cacheAdapter.size; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblInfiniteScrollDataSourceCache.prototype, "empty", {
            get: function () { return this.cacheAdapter.empty; },
            enumerable: false,
            configurable: true
        });
        PblInfiniteScrollDataSourceCache.prototype.setCacheSize = function (maxSize) {
            this.cacheAdapter.setCacheSize(maxSize);
        };
        PblInfiniteScrollDataSourceCache.prototype.matchNewBlock = function () {
            var ds = this.context.getDataSource();
            var totalLength = this.context.totalLength;
            var renderEnd = ds.renderStart + ds.renderLength;
            var start = ds.renderStart;
            var end = totalLength ? Math.min(renderEnd, totalLength) : renderEnd;
            return this.cacheAdapter.createBlock(start, end, totalLength);
        };
        PblInfiniteScrollDataSourceCache.prototype.createInitialBlock = function () {
            var ds = this.context.getDataSource();
            var totalLength = this.context.totalLength;
            var renderEnd = ds.renderLength;
            var start = 0;
            var end = totalLength ? Math.min(renderEnd, totalLength) : renderEnd;
            return this.cacheAdapter.createBlock(start, end, totalLength);
        };
        PblInfiniteScrollDataSourceCache.prototype.update = function (startRow, endRow, direction) {
            return this.cacheAdapter.update(startRow, endRow, direction);
        };
        PblInfiniteScrollDataSourceCache.prototype.clear = function () {
            return this.cacheAdapter.clear();
        };
        return PblInfiniteScrollDataSourceCache;
    }());

    function normalizeOptions(rawOptions) {
        var options = rawOptions || {};
        options.blockSize = Number(options.blockSize);
        if (Number.isNaN(options.blockSize)) {
            options.blockSize = 50;
        }
        else if (options.blockSize <= 0) {
            options.blockSize = 50;
        }
        options.initialVirtualSize = Number(options.initialVirtualSize);
        if (Number.isNaN(options.initialVirtualSize)) {
            options.initialVirtualSize = 0;
        }
        return options;
    }
    function shouldTriggerInvisibleScroll(context) {
        var ds = context.getDataSource();
        if (context.totalLength && ds.renderStart > context.totalLength) {
            return false;
        }
        return !!(context.cache.matchNewBlock());
    }
    function tryAddVirtualRowsBlock(source, event, blockSize) {
        var currLen = source.length;
        if (currLen < event.totalLength && event.totalLength > event.toRow && source[currLen - 1] !== INFINITE_SCROLL_DEFFERED_ROW) {
            var len = Math.min(currLen + blockSize - 1, event.totalLength);
            for (var i = currLen; i < len; i++) {
                source[i] = INFINITE_SCROLL_DEFFERED_ROW;
            }
            return true;
        }
        return false;
    }
    function upgradeChangeEventToInfinite(totalLength, event, blockMatch) {
        var _a = __read(blockMatch, 3), direction = _a[0], start = _a[1], end = _a[2];
        if (!event.isInitial) {
            if (direction === 1 && end === totalLength - 1) {
                event.isLastBlock = true;
            }
        }
        event.direction = direction;
        event.fromRow = start;
        event.offset = (end - start) + 1;
        event.toRow = end;
        return event;
    }
    /**
     * Update the cache with new block information to reflect the last triggered event and
     * also update the datasource with the new values, removing values that are purged due to cache logic.
     * Returns the new datasource, or the original datasource editing in-place.
     *
     * For example, if the cache was empty the values provided are returned
     * Otherwise, the original datasource is edited and returned.
     */
    function updateCacheAndDataSource(context, event, values) {
        var e_1, _a;
        if (context.cache.empty) {
            return values;
        }
        var source = context.getDataSource().source;
        var toRemove = context.cache.update(event.fromRow, event.toRow, event.direction);
        try {
            for (var toRemove_1 = __values(toRemove), toRemove_1_1 = toRemove_1.next(); !toRemove_1_1.done; toRemove_1_1 = toRemove_1.next()) {
                var _b = __read(toRemove_1_1.value, 2), start = _b[0], end = _b[1];
                for (var i = start; i <= end; i++) {
                    source[i] = INFINITE_SCROLL_DEFFERED_ROW;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (toRemove_1_1 && !toRemove_1_1.done && (_a = toRemove_1.return)) _a.call(toRemove_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var fromRow = event.fromRow;
        for (var i = 0, len = values.length; i < len; i++) {
            source[i + fromRow] = values[i];
        }
        return source;
    }

    var PblInfiniteScrollDataSource = /** @class */ (function (_super) {
        __extends(PblInfiniteScrollDataSource, _super);
        function PblInfiniteScrollDataSource(context, options) {
            var _this = _super.call(this, context.getAdapter(), options) || this;
            _this.context = context;
            return _this;
        }
        Object.defineProperty(PblInfiniteScrollDataSource.prototype, "maxCacheSize", {
            get: function () { return this.context.cache.maxSize; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblInfiniteScrollDataSource.prototype, "cacheSize", {
            get: function () { return this.context.cache.size; },
            enumerable: false,
            configurable: true
        });
        PblInfiniteScrollDataSource.prototype.setCacheSize = function (maxSize) {
            this.context.cache.setCacheSize(maxSize);
        };
        PblInfiniteScrollDataSource.prototype.purgeCache = function () {
            var e_1, _a;
            var source = this.source;
            try {
                for (var _b = __values(this.context.cache.clear()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var _d = __read(_c.value, 2), start = _d[0], end = _d[1];
                    for (var i = start; i <= end; i++) {
                        source[i] = INFINITE_SCROLL_DEFFERED_ROW;
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
            this.refresh();
        };
        PblInfiniteScrollDataSource.prototype.isVirtualRow = function (row) {
            return row === INFINITE_SCROLL_DEFFERED_ROW;
        };
        PblInfiniteScrollDataSource.prototype.isVirtualContext = function (context) {
            return context.$implicit === INFINITE_SCROLL_DEFFERED_ROW;
        };
        /**
         * Update the size of the datasource to reflect a virtual size.
         * This will extend the scrollable size of the grid.
         *
         * > Note that you can only add to the size, if the current size is larger than the new size nothing will happen.
         */
        PblInfiniteScrollDataSource.prototype.updateVirtualSize = function (newSize) {
            var _this = this;
            if (this.adapter.inFlight) {
                this.onRenderDataChanging
                    .pipe(operators.take(1))
                    .subscribe(function (r) {
                    PblInfiniteScrollDataSource.updateVirtualSize(newSize, r.data);
                    // we must refire so virtual scroll viewport can catch it
                    // because it also listen's to this stream but it is registered before us.
                    // See virtual-scroll/virtual-scroll-for-of.ts where "dataStream" is assigned
                    _this._onRenderDataChanging.next(r);
                });
            }
            else {
                PblInfiniteScrollDataSource.updateVirtualSize(newSize, this.source);
            }
        };
        PblInfiniteScrollDataSource.updateVirtualSize = function (newSize, values) {
            if (values && values.length < newSize) {
                for (var i = values.length; i < newSize; i++) {
                    values[i] = INFINITE_SCROLL_DEFFERED_ROW;
                }
            }
        };
        return PblInfiniteScrollDataSource;
    }(ngrid.PblDataSource));

    var PblInfiniteScrollDataSourceAdapter = /** @class */ (function (_super) {
        __extends(PblInfiniteScrollDataSourceAdapter, _super);
        function PblInfiniteScrollDataSourceAdapter(context, config, onVirtualLoading) {
            var _this = _super.call(this, function (e) { return context.onTrigger(e); }, config) || this;
            _this.context = context;
            _this.virtualRowsLoading = onVirtualLoading.pipe(operators.debounceTime(24));
            return _this;
        }
        PblInfiniteScrollDataSourceAdapter.prototype.dispose = function () {
            this.context.dispose();
            _super.prototype.dispose.call(this);
        };
        PblInfiniteScrollDataSourceAdapter.prototype.emitOnSourceChanging = function (event) {
            if (event.isInitial) {
                _super.prototype.emitOnSourceChanging.call(this, event);
            }
        };
        return PblInfiniteScrollDataSourceAdapter;
    }(ngrid.PblDataSourceAdapter));

    // const LOG = msg => console.log(msg);
    /**
     * A wrapper around an on trigger observable call that will prevent it from
     * closing if marked to do so (calling `keepAlive()`).
     * If `keepAlive()` was called and the observable has been unsubscribed the teardown logic
     * will not unsubscribe from the underlying on-trigger observable, it will let it roll until
     * finished or being killed again.
     * Keep alive is a toggle, if "used" it can not be used again unless `keepAlive()` is called again.
     *
     * This observable is used internally by the execution queue to prevent on-trigger calls from being invoked and
     * cancelled multiple times.
     * This usually happen when scrolling, since the scroll might not break the current page block fetched, until fetched
     * it will keep asking for it, hence the need to keep it alive.
     * Each execution must return an observable or it will get canceled, so we return the currently executed trigger
     * instead of running it again...
     * @internal
     */
    var TriggerExecutionProxyObservable = /** @class */ (function (_super) {
        __extends(TriggerExecutionProxyObservable, _super);
        function TriggerExecutionProxyObservable(event, target) {
            var _this = _super.call(this, function (subscriber) { return _this.onSubscribe(subscriber); }) || this;
            _this.event = event;
            _this.target = target;
            _this.onKilled = new rxjs.Subject();
            _this.canLive = false;
            return _this;
            // LOG(`NEW[${event.id}]: ${event.fromRow} - ${event.toRow}`);
        }
        TriggerExecutionProxyObservable.prototype.keepAlive = function () {
            this.canLive = true;
        };
        TriggerExecutionProxyObservable.prototype.onSubscribe = function (subscriber) {
            var _this = this;
            this.subscriber = subscriber;
            if (!this.baseSubscription) {
                this.baseSubscription = this.target.subscribe({
                    next: function (v) { return _this.subscriber.next(v); },
                    error: function (e) {
                        _this.error = e;
                        _this.subscriber.error(e);
                    },
                    complete: function () {
                        _this.completed = true;
                        _this.subscriber.complete();
                    },
                });
            }
            return function () { return _this.tearDown(); };
        };
        TriggerExecutionProxyObservable.prototype.tearDown = function () {
            if (!this.canLive || this.completed || this.error) {
                // LOG(`UNSUBSCRIBE${this.event.id}: ${this.event.fromRow} - ${this.event.toRow}`);
                this.baseSubscription.unsubscribe();
                this.onKilled.next();
                this.onKilled.complete();
            }
            else {
                // LOG(`REMOVE CREDIT${this.event.id}: ${this.event.fromRow} - ${this.event.toRow}`);
                this.canLive = false;
            }
        };
        return TriggerExecutionProxyObservable;
    }(rxjs.Observable));

    // const LOG = msg => console.log(msg);
    /**
     * Execute a data source trigger based on infinite trigger change events provided.
     * Each time an execution starts the event is compared to already in-process event that were executed and did not yet finish.
     * If the event overlaps with an existing event, it will not execute.
     * Events overlap when the event to be executed has a range that is contained with any other in-flight event.
     */
    var TriggerExecutionQueue = /** @class */ (function () {
        function TriggerExecutionQueue(handler) {
            this.handler = handler;
            this.slots = 2;
            this.runningEvents = new Map();
        }
        /**
         * Execute an event and keep track of it until execution is done.
         * Before execution, check if one of the events currently in execution, contains the provided event.
         * If so, the execution is will not go through.
         * Event contains another event only if the range (from/to) of the other event is within the boundaries of it's own range.
         * For example, the event from row 50 to row 100 contains the event from row 70 to row 100 but it does not contain
         * the event from row 49 to row 50.
         * @param event
         * @param fallbackToOverlap When true (and then a containing event is found), will signal the containing event to
         * that an event with a set or all items it is fetching trying to execute again but was denied and it will also
         * return it's currently running observable.
         * Due to how the datasource works, it will try to unsubscribe/cancel the currently running observable and subscribe
         * to the returned observable (which is the same), by signaling we allow the running observable to prevent closing the
         * running call and remain in fact we're making it "hot" for period of time so it will not cancel any running call.
         */
        TriggerExecutionQueue.prototype.execute = function (event, fallbackToOverlap) {
            var _this = this;
            if (fallbackToOverlap === void 0) { fallbackToOverlap = false; }
            var overlap = this.checkOverlap(event);
            if (!!overlap) {
                if (fallbackToOverlap) {
                    overlap.keepAlive();
                    return overlap;
                }
                return false;
            }
            // LOG(`EXECUTING HANDLER: ${event.fromRow} - ${event.toRow}`);
            var result = this.handler(event);
            if (result === false) {
                return false;
            }
            var triggerResult = Array.isArray(result)
                ? rxjs.of(result)
                : rxjs.isObservable(result)
                    ? result
                    : rxjs.from(result);
            // LOG(`CREATE[${event.id}]: ${event.fromRow} - ${event.toRow}`);
            var obs = new TriggerExecutionProxyObservable(event, triggerResult);
            obs.onKilled.subscribe(function () { return _this.runningEvents.delete(event); });
            this.runningEvents.set(event, obs);
            return obs;
        };
        TriggerExecutionQueue.prototype.checkOverlap = function (event) {
            var e_1, _a;
            try {
                for (var _b = __values(this.runningEvents.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var _d = __read(_c.value, 2), e = _d[0], v = _d[1];
                    if (event.fromRow >= e.fromRow && event.toRow <= e.toRow) {
                        // LOG(`OVERLAPPED: ${event.fromRow} - ${event.toRow}`);
                        return v;
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
        };
        return TriggerExecutionQueue;
    }());

    /**
     * @internal
     */
    var EventState = /** @class */ (function () {
        function EventState(event) {
            if (event === void 0) { event = null; }
            this.event = event;
        }
        EventState.prototype.isDone = function () {
            return this.done;
        };
        EventState.prototype.rangeEquals = function (event) {
            return event.fromRow === this.event.fromRow && event.toRow === this.event.toRow;
        };
        /**
         * When true is returned, the handling of `PblDataSource.onRenderedDataChanged` should be skipped.
         * Usually, the event state will keep track of the returned value and check if the length of items returned covers
         * the total length required by the event. Only when not enough items have been returned, the returned value will be true.
         * Once true is returned, it will toggle back to false, i.e. it will tell you to skip once only.
         */
        EventState.prototype.skipNextRender = function () {
            if (this.notFull) {
                this.notFull = false;
                return true;
            }
            return false;
        };
        EventState.prototype.pipe = function () {
            var _this = this;
            return function (o) {
                return o.pipe(operators.tap(function (values) {
                    _this.done = true;
                    _this.notFull = values.length < _this.event.offset;
                }));
            };
        };
        return EventState;
    }());

    var PblInfiniteScrollDSContext = /** @class */ (function () {
        function PblInfiniteScrollDSContext(factoryOptions) {
            this.factoryOptions = factoryOptions;
            this.onVirtualLoading = new rxjs.BehaviorSubject(false);
            this.virtualLoadingSessions = 0;
            this.timeoutCancelTokens = new Set();
            this.ignoreScrolling = false;
            this.lastEventState = new EventState();
            this.options = normalizeOptions(factoryOptions.infiniteOptions);
            if (this.options.initialVirtualSize > 0) {
                this.totalLength = this.options.initialVirtualSize;
            }
            this.queue = new TriggerExecutionQueue(this.factoryOptions.onTrigger);
        }
        PblInfiniteScrollDSContext.prototype.onTrigger = function (rawEvent) {
            var _this = this;
            if (rawEvent.isInitial) {
                return this.invokeInitialOnTrigger(rawEvent);
            }
            if (this.pendingTrigger$) {
                // LOG(`HAS pendingTrigger$`);
                var pendingTrigger$ = this.pendingTrigger$;
                this.pendingTrigger$ = undefined;
                if (rawEvent.data.changed && rawEvent.data.curr === pendingTrigger$) {
                    // LOG(`PENDING - MATCHED!`);
                    this.currentSessionToken = undefined;
                    return pendingTrigger$
                        .pipe(operators.finalize(function () {
                        // LOG(`PENDING - RESULT DONE`);
                        _this.deferSyncRows(16, function () { return _this.tickVirtualLoading(-1); });
                    }));
                }
            }
            if (this.currentSessionToken && rawEvent.data.changed && rawEvent.data.curr === this.currentSessionToken) {
                if (this.ds.hostGrid.viewport.isScrolling) {
                    this.handleScrolling(rawEvent);
                    return rxjs.of(this.ds.source);
                }
                var _a = this.invokeRuntimeOnTrigger(rawEvent), result_1 = _a.result, event = _a.event;
                if (!result_1 || !event) { // !event for type gate, because if we have "result: then "event" is always set
                    // LOG('NO SCROLL - FALSE TRIGGER!');
                    this.currentSessionToken = undefined;
                    return false;
                }
                else {
                    var source = this.ds.source;
                    if (tryAddVirtualRowsBlock(source, event, this.options.blockSize)) {
                        this.pendingTrigger$ = result_1;
                        this.tickVirtualLoading(1);
                        // LOG('NO SCROLL - VIRTUAL ROWS ADDED');
                        return rxjs.of(source)
                            .pipe(operators.finalize(function () {
                            _this.deferSyncRows();
                            // LOG('NO SCROLL - VIRTUAL ROWS RENDERED');
                            _this.currentSessionToken = undefined;
                            _this.ds.refresh(result_1);
                        }));
                    }
                    else {
                        // LOG('NO SCROLL - NO VIRTUAL ROWS ADDED');
                        return result_1
                            .pipe(operators.finalize(function () {
                            // LOG(`NO SCROLL - RESULT DONE`);
                            _this.deferSyncRows(16);
                            _this.currentSessionToken = undefined;
                        }));
                    }
                }
            }
            if (rawEvent.data.changed || (this.customTriggers && PblInfiniteScrollDataSourceAdapter.isCustomBehaviorEvent(rawEvent, this.customTriggers))) {
                this.cache.clear();
                rawEvent.isInitial = true;
                return this.invokeInitialOnTrigger(rawEvent);
            }
            return false;
            // throw new Error('Invalid');
        };
        PblInfiniteScrollDSContext.prototype.getAdapter = function () {
            if (!this.adapter) {
                this.customTriggers = this.factoryOptions.customTriggers || false;
                // we can't allow any internal trigger handlers to run
                // It will throw the entire datasource out of sync, infinite ds can't do that
                this.adapter = new PblInfiniteScrollDataSourceAdapter(this, { filter: true, sort: true, pagination: true }, this.onVirtualLoading);
            }
            return this.adapter;
        };
        PblInfiniteScrollDSContext.prototype.getDataSource = function () {
            var _this = this;
            if (!this.ds) {
                this.ds = new PblInfiniteScrollDataSource(this, this.factoryOptions.dsOptions);
                this.cache = new PblInfiniteScrollDataSourceCache(this, this.factoryOptions.cacheOptions);
                this.ds.onRenderedDataChanged.subscribe(function () { return _this.onRenderedDataChanged(); });
                if (this.factoryOptions.onCreated) {
                    this.factoryOptions.onCreated(this.ds);
                }
            }
            return this.ds;
        };
        PblInfiniteScrollDSContext.prototype.dispose = function () {
            var e_1, _a;
            this.onVirtualLoading.complete();
            try {
                for (var _b = __values(this.timeoutCancelTokens.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var t = _c.value;
                    clearTimeout(t);
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
        /**
         * This is where we detect if we need to internally invoke a trigger because we've reached an area
         * in the grid where row's does not exists but we show the dummy row, hence we need to fetch them.
         * The grid will never trigger an event here since from the grid's perspective a row is showing...
         * This detection also handle's scrolling and session so we don't invoke the trigger to much.
         */
        PblInfiniteScrollDSContext.prototype.onRenderedDataChanged = function () {
            var _this = this;
            if (this.lastEventState.skipNextRender()) {
                // if the current event returned items that did not occupy the whole range of the event
                // stop, we don't want to check anything cause we already know we are missing items.
                // since we know we're missing items, we also know we're going to call the same range again which
                // did not return anyway, so it is useless and in the worst case might cause infinite loop
                // LOG(`RENDER DATA SKIPPING DUE TO SKIP NEXT RENDER!`);
                return;
            }
            if (!this.currentSessionToken) {
                if (shouldTriggerInvisibleScroll(this)) {
                    // LOG(`RENDER DATA CHANGED FROM ROW ${this.ds.renderStart}`);
                    var t_1 = this.currentSessionToken = {};
                    this.safeAsyncOp(function () {
                        if (_this.currentSessionToken === t_1) {
                            _this.ds.refresh(t_1);
                        }
                    }, 0);
                }
            }
            else {
                // LOG(`RENDER DATA WITH SESSION FROM ROW ${this.ds.renderStart}`);
                if (!this.ds.hostGrid.viewport.isScrolling) {
                    // LOG(`SESSION OVERRIDE`);
                    this.ds.refresh(this.currentSessionToken = {});
                }
                else {
                    if (!this.ignoreScrolling) {
                        this.ignoreScrolling = true;
                        this.ds.hostGrid.viewport.scrolling
                            .pipe(operators.filter(function (d) { return d === 0; }), operators.take(1))
                            .subscribe(function (d) {
                            _this.ignoreScrolling = false;
                            if (shouldTriggerInvisibleScroll(_this)) {
                                // LOG(`OVERRIDING AFTER SCROLL SESSION`);
                                _this.currentSessionToken = undefined;
                                _this.onRenderedDataChanged();
                            }
                        });
                    }
                }
            }
        };
        /**
         * Create a new event state for the given event, store it in the lastEventState property
         * and returns a pipe that will sync the state of the event as the call progress.
         * @param event
         */
        PblInfiniteScrollDSContext.prototype.wrapEventState = function (event) {
            return (this.lastEventState = new EventState(event)).pipe();
        };
        PblInfiniteScrollDSContext.prototype.deferSyncRows = function (ms, runBefore, runAfter) {
            var _this = this;
            if (ms === void 0) { ms = 0; }
            this.safeAsyncOp(function () {
                runBefore && runBefore();
                _this.ds.hostGrid.rowsApi.syncRows('data', true);
                runAfter && runAfter();
            }, ms);
        };
        PblInfiniteScrollDSContext.prototype.safeAsyncOp = function (fn, delay) {
            var _this = this;
            var cancelToken = setTimeout(function () {
                _this.timeoutCancelTokens.delete(cancelToken);
                fn();
            }, delay);
            this.timeoutCancelTokens.add(cancelToken);
        };
        PblInfiniteScrollDSContext.prototype.tickVirtualLoading = function (value) {
            this.virtualLoadingSessions = this.virtualLoadingSessions + value;
            var inVirtualLoad = this.onVirtualLoading.value;
            switch (this.virtualLoadingSessions) {
                case 0:
                    inVirtualLoad && this.onVirtualLoading.next(false);
                    break;
                case 1:
                    !inVirtualLoad && this.onVirtualLoading.next(true);
                    break;
                default:
                    if (this.virtualLoadingSessions < 0) {
                        this.virtualLoadingSessions = 0;
                    }
                    break;
            }
        };
        PblInfiniteScrollDSContext.prototype.handleScrolling = function (rawEvent) {
            var _this = this;
            this.tickVirtualLoading(1);
            var newBlock = this.cache.matchNewBlock();
            var event = newBlock ? this.tryGetInfiniteEvent(rawEvent, newBlock) : false;
            if (event !== false) {
                if (tryAddVirtualRowsBlock(this.ds.source, event, this.options.blockSize)) {
                    // LOG('SCROLL - VIRTUAL ROWS ADDED');
                }
            }
            this.ds.hostGrid.viewport.scrolling
                .pipe(operators.filter(function (d) { return d === 0; }), operators.take(1))
                .subscribe(function (d) {
                var result = _this.invokeRuntimeOnTrigger(rawEvent).result;
                if (!!result) {
                    if (_this.pendingTrigger$) {
                        _this.tickVirtualLoading(-1);
                    }
                    // LOG('SCROLL DONE - HAS RESULT - HAS PENDING');
                    _this.ds.refresh(_this.pendingTrigger$ = result);
                }
                else if (!_this.pendingTrigger$) {
                    // LOG('SCROLL DONE = NO RESULT - NOT HAS PENDING');
                    _this.ds.refresh(_this.pendingTrigger$ = rxjs.of(_this.ds.source));
                }
                else {
                    // LOG('SCROLL DONE = NO RESULT - HAS PENDING');
                    _this.tickVirtualLoading(-1);
                }
            });
        };
        PblInfiniteScrollDSContext.prototype.invokeInitialOnTrigger = function (rawEvent) {
            var _this = this;
            var event = this.tryGetInfiniteEvent(rawEvent, rawEvent.isInitial ? this.cache.createInitialBlock() : this.cache.createInitialBlock());
            var result = this.queue.execute(event);
            return result && result.pipe(this.wrapEventState(event), operators.tap(function (values) {
                _this.cache.clear();
                if (values.length > 1) {
                    _this.cache.update(0, values.length - 1, 1);
                }
                PblInfiniteScrollDataSource.updateVirtualSize(_this.options.initialVirtualSize, values);
                if (!rawEvent.isInitial) {
                    _this.ds.hostGrid.viewport.scrollToOffset(0);
                }
            }));
        };
        PblInfiniteScrollDSContext.prototype.invokeRuntimeOnTrigger = function (rawEvent) {
            var _this = this;
            var newBlock = this.cache.matchNewBlock();
            var event = newBlock ? this.tryGetInfiniteEvent(rawEvent, newBlock) : false;
            if (event !== false) {
                if (this.lastEventState.isDone() && this.lastEventState.rangeEquals(event)) {
                    return { event: false };
                }
                event.eventSource = 'infiniteScroll';
                var triggerResult = this.queue.execute(event, true);
                if (triggerResult !== false) {
                    return {
                        event: event,
                        result: triggerResult
                            .pipe(
                        // tap( () => LOG(`TRIGGER[${event.id}]: ${event.fromRow} - ${event.toRow}`)),
                        this.wrapEventState(event), operators.map(function (values) { return updateCacheAndDataSource(_this, event, values); })),
                    };
                }
            }
            return { event: event };
        };
        PblInfiniteScrollDSContext.prototype.tryGetInfiniteEvent = function (rawEvent, block) {
            var _this = this;
            var totalLength = this.totalLength || 0;
            rawEvent.updateTotalLength = function (totalLength) { _this.totalLength = totalLength; };
            rawEvent.totalLength = totalLength;
            return upgradeChangeEventToInfinite(totalLength, rawEvent, block);
        };
        return PblInfiniteScrollDSContext;
    }());

    var PblInfiniteScrollDSFactory = /** @class */ (function (_super) {
        __extends(PblInfiniteScrollDSFactory, _super);
        function PblInfiniteScrollDSFactory() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PblInfiniteScrollDSFactory.prototype.withInfiniteScrollOptions = function (options) {
            this.infiniteScrollOptions = options;
            return this;
        };
        PblInfiniteScrollDSFactory.prototype.withCacheOptions = function (type, options) {
            this.cacheOptions = { type: type, options: options };
            return this;
        };
        PblInfiniteScrollDSFactory.prototype.create = function () {
            var factoryOptions = {
                onTrigger: this._adapter.onTrigger,
                customTriggers: this._adapter.customTriggers,
                onCreated: this._onCreated,
                dsOptions: this._dsOptions,
                infiniteOptions: this.infiniteScrollOptions,
                cacheOptions: this.cacheOptions,
            };
            this.context = new PblInfiniteScrollDSContext(factoryOptions);
            _super.prototype.onCreated.call(this, null);
            return _super.prototype.create.call(this);
        };
        PblInfiniteScrollDSFactory.prototype.createAdapter = function () {
            return this.context.getAdapter();
        };
        PblInfiniteScrollDSFactory.prototype.createDataSource = function (adapter) {
            return this.context.getDataSource();
        };
        return PblInfiniteScrollDSFactory;
    }(core.PblDataSourceBaseFactory));
    function createInfiniteScrollDS() {
        return new PblInfiniteScrollDSFactory();
    }

    var PblNgridInfiniteVirtualRowRefDirective = /** @class */ (function (_super) {
        __extends(PblNgridInfiniteVirtualRowRefDirective, _super);
        function PblNgridInfiniteVirtualRowRefDirective() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PblNgridInfiniteVirtualRowRefDirective.prototype.ngOnInit = function () {
            this.registry.setSingle('infiniteVirtualRow', this);
        };
        PblNgridInfiniteVirtualRowRefDirective.prototype.ngOnDestroy = function () {
            this.registry.setSingle('infiniteVirtualRow', undefined);
        };
        return PblNgridInfiniteVirtualRowRefDirective;
    }(ngrid.PblNgridRowDef));
    /** @nocollapse */ PblNgridInfiniteVirtualRowRefDirective.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridInfiniteVirtualRowRefDirective, deps: null, target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ PblNgridInfiniteVirtualRowRefDirective.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridInfiniteVirtualRowRefDirective, selector: "[pblNgridInfiniteVirtualRowDef]", inputs: { columns: ["pblNgridInfiniteVirtualRowDefColumns", "columns"], when: ["pblNgridInfiniteVirtualRowDefWhen", "when"] }, usesInheritance: true, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridInfiniteVirtualRowRefDirective, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[pblNgridInfiniteVirtualRowDef]',
                        inputs: ['columns: pblNgridInfiniteVirtualRowDefColumns', 'when: pblNgridInfiniteVirtualRowDefWhen'],
                    }]
            }] });

    var PBL_NGRID_ROW_TEMPLATE = "<ng-content select=\".pbl-ngrid-row-prefix\"></ng-content><ng-content></ng-content><ng-content select=\".pbl-ngrid-row-suffix\"></ng-content>";
    var PblNgridInfiniteRowComponent = /** @class */ (function (_super) {
        __extends(PblNgridInfiniteRowComponent, _super);
        function PblNgridInfiniteRowComponent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PblNgridInfiniteRowComponent.prototype.canCreateCell = function () {
            return false;
        };
        return PblNgridInfiniteRowComponent;
    }(ngrid.PblNgridRowComponent));
    /** @nocollapse */ PblNgridInfiniteRowComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridInfiniteRowComponent, deps: null, target: i0__namespace.ɵɵFactoryTarget.Component });
    /** @nocollapse */ PblNgridInfiniteRowComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridInfiniteRowComponent, selector: "pbl-ngrid-row[infiniteRow]", host: { attributes: { "role": "row" }, classAttribute: "pbl-ngrid-row" }, providers: [
            { provide: table.CdkRow, useExisting: ngrid.PblNgridRowComponent }
        ], exportAs: ["pblNgridInfiniteRow"], usesInheritance: true, ngImport: i0__namespace, template: "<ng-content select=\".pbl-ngrid-row-prefix\"></ng-content><ng-content></ng-content><ng-content select=\".pbl-ngrid-row-suffix\"></ng-content>", isInline: true, changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridInfiniteRowComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'pbl-ngrid-row[infiniteRow]',
                        template: PBL_NGRID_ROW_TEMPLATE,
                        host: {
                            'class': 'pbl-ngrid-row',
                            'role': 'row',
                        },
                        providers: [
                            { provide: table.CdkRow, useExisting: ngrid.PblNgridRowComponent }
                        ],
                        exportAs: 'pblNgridInfiniteRow',
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        encapsulation: i0.ViewEncapsulation.None,
                    }]
            }] });

    /**
     * Use to set the a default `pblNgridInfiniteVirtualRowDef` if the user did not set one.
     */
    var PblNgridDefaultInfiniteVirtualRowComponent = /** @class */ (function () {
        function PblNgridDefaultInfiniteVirtualRowComponent() {
        }
        PblNgridDefaultInfiniteVirtualRowComponent.prototype.createCell = function (column) {
        };
        PblNgridDefaultInfiniteVirtualRowComponent.prototype.destroyCell = function (column) {
        };
        return PblNgridDefaultInfiniteVirtualRowComponent;
    }());
    /** @nocollapse */ PblNgridDefaultInfiniteVirtualRowComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridDefaultInfiniteVirtualRowComponent, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    /** @nocollapse */ PblNgridDefaultInfiniteVirtualRowComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridDefaultInfiniteVirtualRowComponent, selector: "pbl-ngrid-default-infinite-virtual-row", ngImport: i0__namespace, template: "<pbl-ngrid-row in *pblNgridInfiniteVirtualRowDef=\"let row;\" class=\"pbl-ngrid-infinite-virtual-row\" infiniteRow>\n  ...Loading\n</pbl-ngrid-row>\n", styles: [".pbl-ngrid-infinite-virtual-row .pbl-ngrid-cell{position:relative}.pbl-ngrid-infinite-virtual-row .pbl-ngrid-cell:before{position:absolute;top:12px;left:12px;right:12px;bottom:12px;content:\" \";-webkit-animation-duration:2s;animation-duration:2s;-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite;-webkit-animation-name:placeload;animation-name:placeload;-webkit-animation-timing-function:ease;animation-timing-function:ease;background:#f6f7f8;background:#eee;background:linear-gradient(90deg,#eee 8%,#ddd 18%,#eee 33%);background-size:200px 100%;border-radius:4px}@-webkit-keyframes placeload{0%{background-position:-200px 0}to{background-position:200px 0}}@keyframes placeload{0%{background-position:-200px 0}to{background-position:200px 0}}"], components: [{ type: PblNgridInfiniteRowComponent, selector: "pbl-ngrid-row[infiniteRow]", exportAs: ["pblNgridInfiniteRow"] }], directives: [{ type: PblNgridInfiniteVirtualRowRefDirective, selector: "[pblNgridInfiniteVirtualRowDef]", inputs: ["pblNgridInfiniteVirtualRowDefColumns", "pblNgridInfiniteVirtualRowDefWhen"] }], encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridDefaultInfiniteVirtualRowComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'pbl-ngrid-default-infinite-virtual-row',
                        templateUrl: './default-infinite-virtual-row.component.html',
                        styleUrls: ['./default-infinite-virtual-row.component.scss'],
                        encapsulation: i0.ViewEncapsulation.None,
                    }]
            }] });

    var PLUGIN_KEY = 'infiniteScroll';
    var IS_INFINITE_VIRTUAL_ROW = function (index, rowData) {
        return rowData === INFINITE_SCROLL_DEFFERED_ROW;
    };
    var IS_NOT_INFINITE_VIRTUAL_ROW = function (index, rowData) {
        return !IS_INFINITE_VIRTUAL_ROW(index, rowData);
    };
    var PblNgridInfiniteScrollPlugin = /** @class */ (function () {
        function PblNgridInfiniteScrollPlugin(grid, pluginCtrl, injector) {
            var _this = this;
            this.grid = grid;
            this.pluginCtrl = pluginCtrl;
            this.injector = injector;
            this._enabled = false;
            this._removePlugin = pluginCtrl.setPlugin(PLUGIN_KEY, this);
            grid.registry.changes
                .subscribe(function (changes) {
                var e_1, _a;
                try {
                    for (var changes_1 = __values(changes), changes_1_1 = changes_1.next(); !changes_1_1.done; changes_1_1 = changes_1.next()) {
                        var c = changes_1_1.value;
                        switch (c.type) {
                            case 'infiniteVirtualRow':
                                if (c.op === 'remove') {
                                    _this.pluginCtrl.extApi.cdkTable.removeRowDef(c.value);
                                    _this._infiniteVirtualRowDef = undefined;
                                }
                                _this.setupInfiniteVirtualRow();
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
            pluginCtrl.events
                .pipe(core.ON_DESTROY)
                .subscribe(function () {
                if (_this._infiniteVirtualRowRef) {
                    _this._infiniteVirtualRowRef.destroy();
                }
                _this._removePlugin(_this.grid);
            });
            pluginCtrl.events.subscribe(function (event) {
                if (event.kind === 'onDataSource') {
                    var prevState = _this._enabled;
                    _this._enabled = event.curr instanceof PblInfiniteScrollDataSource;
                    if (_this._enabled !== prevState) {
                        pluginCtrl.onInit().subscribe(function () { return _this.updateTable(); });
                    }
                }
            });
        }
        PblNgridInfiniteScrollPlugin.create = function (grid, injector) {
            var pluginCtrl = ngrid.PblNgridPluginController.find(grid);
            return new PblNgridInfiniteScrollPlugin(grid, pluginCtrl, injector);
        };
        PblNgridInfiniteScrollPlugin.prototype.setupInfiniteVirtualRow = function () {
            var grid = this.grid;
            var cdkTable = this.pluginCtrl.extApi.cdkTable;
            if (this._infiniteVirtualRowDef) {
                cdkTable.removeRowDef(this._infiniteVirtualRowDef);
                this._infiniteVirtualRowDef = undefined;
            }
            if (this._enabled) {
                var infiniteVirtualRow = grid.registry.getSingle('infiniteVirtualRow');
                if (infiniteVirtualRow) {
                    this._infiniteVirtualRowDef = infiniteVirtualRow = infiniteVirtualRow.clone();
                    Object.defineProperty(infiniteVirtualRow, 'when', { enumerable: true, get: function () { return IS_INFINITE_VIRTUAL_ROW; } });
                }
                else if (!this._infiniteVirtualRowRef) {
                    // TODO: move to module? set in root registry? put elsewhere to avoid grid sync (see event of registry change)...
                    this._infiniteVirtualRowRef = this.injector.get(i0.ComponentFactoryResolver)
                        .resolveComponentFactory(PblNgridDefaultInfiniteVirtualRowComponent)
                        .create(this.injector);
                    this._infiniteVirtualRowRef.changeDetectorRef.detectChanges();
                    return;
                }
            }
            this.resetTableRowDefs();
        };
        PblNgridInfiniteScrollPlugin.prototype.resetTableRowDefs = function () {
            if (this._infiniteVirtualRowDef) {
                this._enabled === false
                    ? this.pluginCtrl.extApi.cdkTable.removeRowDef(this._infiniteVirtualRowDef)
                    : this.pluginCtrl.extApi.cdkTable.addRowDef(this._infiniteVirtualRowDef);
            }
        };
        /**
         * Update the grid with detail row infor.
         * Instead of calling for a change detection cycle we can assign the new predicates directly to the pblNgridRowDef instances.
         */
        PblNgridInfiniteScrollPlugin.prototype.updateTable = function () {
            this.grid._tableRowDef.when = !!this._enabled ? IS_NOT_INFINITE_VIRTUAL_ROW : undefined;
            this.setupInfiniteVirtualRow();
            // Once we changed the `when` predicate on the `CdkRowDef` we must:
            //   1. Update the row cache (property `rowDefs`) to reflect the new change
            this.pluginCtrl.extApi.cdkTable.updateRowDefCache();
            //   2. re-render all rows.
            // The logic for re-rendering all rows is handled in `CdkTable._forceRenderDataRows()` which is a private method.
            // This is a workaround, assigning to `multiTemplateDataRows` will invoke the setter which
            // also calls `CdkTable._forceRenderDataRows()`
            // TODO: This is risky, the setter logic might change.
            // for example, if material will check for change in `multiTemplateDataRows` setter from previous value...
            this.pluginCtrl.extApi.cdkTable.multiTemplateDataRows = !!this._enabled;
        };
        return PblNgridInfiniteScrollPlugin;
    }());

    var PblNgridInfiniteScrollModule = /** @class */ (function () {
        function PblNgridInfiniteScrollModule() {
            ngrid.PblNgridPluginController.onCreatedSafe(PblNgridInfiniteScrollModule, function (grid, controller) {
                if (controller && controller.hasAncestor(PblNgridInfiniteScrollModule)) {
                    controller.createPlugin(PLUGIN_KEY);
                }
            });
        }
        return PblNgridInfiniteScrollModule;
    }());
    PblNgridInfiniteScrollModule.NGRID_PLUGIN = ngrid.ngridPlugin({ id: PLUGIN_KEY, factory: 'create' }, PblNgridInfiniteScrollPlugin);
    /** @nocollapse */ PblNgridInfiniteScrollModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridInfiniteScrollModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    /** @nocollapse */ PblNgridInfiniteScrollModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridInfiniteScrollModule, declarations: [PblNgridInfiniteVirtualRowRefDirective, PblNgridInfiniteRowComponent, PblNgridDefaultInfiniteVirtualRowComponent], imports: [common.CommonModule, table.CdkTableModule, ngrid.PblNgridModule, targetEvents.PblNgridTargetEventsModule], exports: [PblNgridInfiniteVirtualRowRefDirective, PblNgridInfiniteRowComponent] });
    /** @nocollapse */ PblNgridInfiniteScrollModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridInfiniteScrollModule, imports: [[common.CommonModule, table.CdkTableModule, ngrid.PblNgridModule, targetEvents.PblNgridTargetEventsModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridInfiniteScrollModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [common.CommonModule, table.CdkTableModule, ngrid.PblNgridModule, targetEvents.PblNgridTargetEventsModule],
                        declarations: [PblNgridInfiniteVirtualRowRefDirective, PblNgridInfiniteRowComponent, PblNgridDefaultInfiniteVirtualRowComponent],
                        exports: [PblNgridInfiniteVirtualRowRefDirective, PblNgridInfiniteRowComponent],
                        // TODO(REFACTOR_REF 2): remove when ViewEngine is no longer supported by angular (V12 ???)
                        entryComponents: [PblNgridDefaultInfiniteVirtualRowComponent],
                    }]
            }], ctorParameters: function () { return []; } });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.PblNgridInfiniteRowComponent = PblNgridInfiniteRowComponent;
    exports.PblNgridInfiniteScrollModule = PblNgridInfiniteScrollModule;
    exports.PblNgridInfiniteVirtualRowRefDirective = PblNgridInfiniteVirtualRowRefDirective;
    exports.createInfiniteScrollDS = createInfiniteScrollDS;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=pebula-ngrid-infinite-scroll.umd.js.map
