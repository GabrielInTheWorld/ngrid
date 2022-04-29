(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs'), require('rxjs/operators'), require('@angular/core'), require('@pebula/ngrid'), require('@angular/cdk/keycodes'), require('@angular/cdk/coercion'), require('@pebula/ngrid/core'), require('@angular/common'), require('@angular/cdk/table')) :
    typeof define === 'function' && define.amd ? define('@pebula/ngrid/target-events', ['exports', 'rxjs', 'rxjs/operators', '@angular/core', '@pebula/ngrid', '@angular/cdk/keycodes', '@angular/cdk/coercion', '@pebula/ngrid/core', '@angular/common', '@angular/cdk/table'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.pebula = global.pebula || {}, global.pebula.ngrid = global.pebula.ngrid || {}, global.pebula.ngrid['target-events'] = {}), global.rxjs, global.rxjs.operators, global.ng.core, global.pebula.ngrid, global.ng.cdk.keycodes, global.ng.cdk.coercion, global.pebula.ngrid.core, global.ng.common, global.ng.cdk.table));
}(this, (function (exports, rxjs, operators, i0, i1, keycodes, coercion, i1$1, common, table) { 'use strict';

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
    var i1__namespace$1 = /*#__PURE__*/_interopNamespace(i1$1);

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

    function isCellEvent(event) {
        return !!event.cellTarget;
    }
    function isDataCellEvent(event) {
        return isCellEvent(event) && !!event.context;
    }
    /**
     * Returns true if the element is a row element (`pbl-ngrid-row`, `cdk-row`).
     *
     * This function works under the following assumptions:
     *
     *   - A row element MUST contain a "role" attribute with the value "row"
     */
    function isRowContainer(element) {
        return element.getAttribute('role') === 'row';
    }
    /**
     * Find the cell element that is or wraps the provided element.
     * The element can be a table cell element (any type of) OR a nested element (any level) of a table cell element.
     *
     * This function works under the following assumptions:
     *
     *   - The parent of a cell element is a row element.
     *   - Each row element MUST contain a "role" attribute with the value "row"
     */
    function findParentCell(element) {
        while (element.parentElement) {
            if (isRowContainer(element.parentElement)) {
                return element;
            }
            element = element.parentElement;
        }
    }
    /**
     * Returns the position (index) of the cell (element) among it's siblings.
     */
    function findCellRenderIndex(cell) {
        var colIndex = 0;
        while (cell = cell.previousElementSibling) {
            colIndex++;
        }
        return colIndex;
    }
    /**
     * Returns table metadata for a given ROW element.
     * This function works under the following assumptions:
     *
     *   - Each row element MUST contain a "role" attribute with the value "row"
     *   - Each row element MUST contains the type identifier attribute "data-rowtype" (except "data" rows)
     *   - Allowed values for "data-rowtype" are: 'header' | 'meta-header' | 'footer' | 'meta-footer' | 'data'
     *   - Row's representing data items (data-rowtype="data") can omit the type attribute and the function will infer it.
     *
     * NOTE that this function DOES NOT identify subType of `meta-group` (`PblNgridMatrixRow<'header' | 'footer', 'meta-group'>`), it will return it as
     * 'meta`, you need to handle this case specifically.
     *
     * Because detection is based on DOM element position finding the original row index when multiple row containers are set (fixed/style/row) will not work.
     * The rowIndex will be relative to the container, and not the entire table.
     */
    function matrixRowFromRow(row, vcRef) {
        var rowAttrType = row.getAttribute('data-rowtype') || 'data';
        // TODO: Error if rowAttrType is not one of the allowed values!
        var rowIndex = 0;
        switch (rowAttrType) {
            case 'data':
                var sourceRow = row;
                while (row.previousElementSibling) {
                    rowIndex++;
                    row = row.previousElementSibling;
                }
                rowIndex = Math.min(rowIndex, vcRef.length - 1);
                while (rowIndex > -1) {
                    if (vcRef.get(rowIndex).rootNodes[0] === sourceRow) {
                        return {
                            type: 'data',
                            subType: 'data',
                            rowIndex: rowIndex,
                        };
                    }
                    rowIndex--;
                }
                return;
            case 'header':
            case 'footer':
                return {
                    type: rowAttrType,
                    subType: 'data',
                    rowIndex: rowIndex,
                };
            default:
                while (row.previousElementSibling && row.previousElementSibling.getAttribute('data-rowtype') === rowAttrType) {
                    rowIndex++;
                    row = row.previousElementSibling;
                }
                return {
                    type: rowAttrType === 'meta-footer' ? 'footer' : 'header',
                    subType: 'meta',
                    rowIndex: rowIndex,
                };
        }
    }
    /**
     * Given a list of cells stacked vertically (yAxis) and a list of cells stacked horizontally (xAxis) return all the cells inside (without the provided axis cells).
     *
     * In the following example, all [Yn] cells are provided in the yAxis param and all [Xn] cell in the xAxis params, the returned value will be an array
     * with all cells marked with Z.
     *    Y5  Z  Z  Z
     *    Y4  Z  Z  Z
     *    Y3  Z  Z  Z
     *    Y2  Z  Z  Z
     *    XY1 X2 X3 X4
     * @param contextApi
     * @param xAxis
     * @param yAxis
     */
    function getInnerCellsInRect(contextApi, xAxis, yAxis) {
        var e_1, _a, e_2, _b;
        var spaceInside = [];
        try {
            for (var yAxis_1 = __values(yAxis), yAxis_1_1 = yAxis_1.next(); !yAxis_1_1.done; yAxis_1_1 = yAxis_1.next()) {
                var vCell = yAxis_1_1.value;
                try {
                    for (var xAxis_1 = (e_2 = void 0, __values(xAxis)), xAxis_1_1 = xAxis_1.next(); !xAxis_1_1.done; xAxis_1_1 = xAxis_1.next()) {
                        var hCell = xAxis_1_1.value;
                        var vhContext = contextApi.findRowInCache(vCell.rowIdent).cells[hCell.colIndex];
                        if (vhContext) {
                            spaceInside.push({ rowIdent: vCell.rowIdent, colIndex: hCell.colIndex });
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (xAxis_1_1 && !xAxis_1_1.done && (_b = xAxis_1.return)) _b.call(xAxis_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (yAxis_1_1 && !yAxis_1_1.done && (_a = yAxis_1.return)) _a.call(yAxis_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return spaceInside;
    }
    function rangeBetween(n1, n2) {
        var min = Math.min(n1, n2);
        var max = min === n1 ? n2 : n1;
        var result = [];
        for (var i = min + 1; i < max; i++) {
            result.push(i);
        }
        return result;
    }

    var isOsx = /^mac/.test(navigator.platform.toLowerCase());
    var isMainMouseButtonClick = function (event) { return event.source.button === 0; };
    function handleFocusAndSelection(targetEvents) {
        var isCellFocusMode = function () { return targetEvents.grid.focusMode === 'cell'; };
        var handlers = createHandlers(targetEvents);
        // Handle array keys move (with shift for selection, without for cell focus change)
        targetEvents.keyDown
            .pipe(operators.filter(isCellFocusMode))
            .subscribe(handlers.handleKeyDown);
        // Handle mouse down on cell (focus) and then moving for selection.
        targetEvents.mouseDown
            .pipe(operators.filter(isCellFocusMode), operators.filter(isDataCellEvent), operators.filter(isMainMouseButtonClick), operators.tap(function (event) {
            event.source.stopPropagation();
            event.source.preventDefault();
        }), operators.tap(handlers.handleMouseDown), // handle mouse down focus
        operators.switchMap(function () { return targetEvents.cellEnter.pipe(operators.takeUntil(targetEvents.mouseUp)); }), operators.filter(isDataCellEvent), operators.filter(isMainMouseButtonClick))
            .subscribe(handlers.handleSelectionChangeByMouseClickAndMove); // now handle movements until mouseup
    }
    function createHandlers(targetEvents) {
        var contextApi = targetEvents.grid.contextApi;
        function focusCell(rowIdent, colIndex, markForCheck) {
            contextApi.focusCell({ rowIdent: rowIdent, colIndex: colIndex });
        }
        function handleMouseDown(event) {
            if (contextApi.focusedCell && event.source.shiftKey) {
                handleSelectionChangeByMouseClickAndMove(event);
            }
            else if (isOsx ? event.source.metaKey : event.source.ctrlKey) {
                if (event.context.selected) {
                    contextApi.unselectCells([event.context]);
                }
                else {
                    contextApi.selectCells([event.context]);
                }
            }
            else {
                focusCell(event.context.rowContext.identity, event.context.index);
            }
        }
        function handleKeyDown(event) {
            var source = event.source;
            if (isCellEvent(event)) {
                var sourceCell = event.cellTarget;
                var coeff = 1;
                var isHorizontal = false;
                switch (source.keyCode) {
                    case keycodes.UP_ARROW:
                        coeff = -1;
                    case keycodes.DOWN_ARROW: // tslint:disable-line: no-switch-case-fall-through
                        break;
                    case keycodes.LEFT_ARROW:
                        coeff = -1;
                    case keycodes.RIGHT_ARROW: // tslint:disable-line: no-switch-case-fall-through
                        isHorizontal = true;
                        break;
                    default:
                        return;
                }
                event.source.preventDefault();
                event.source.stopPropagation();
                var activeFocus = contextApi.focusedCell;
                if (!activeFocus) {
                    var cellContext = contextApi.getCell(sourceCell);
                    activeFocus = {
                        rowIdent: cellContext.rowContext.identity,
                        colIndex: cellContext.index,
                    };
                }
                if (!!source.shiftKey) {
                    handleSelectionChangeByArrows(activeFocus, isHorizontal ? [coeff, 0] : [0, coeff]);
                }
                else {
                    handleSingleItemFocus(activeFocus, isHorizontal ? [coeff, 0] : [0, coeff]);
                }
            }
        }
        /**
         * Handle selection changes caused ONLY by the use of the arrow keys with SHIFT key.
         *
         * The implementation is NOT incremental, it will re-calculate the selected cell on every arrow key press (every call to this function).
         *
         * First. A simple adjacent cell detection is performed to determine the direction of the current selected cells relative to the
         * source cell (usually the focused cell). We only care about 4 cells, adjacent to the source Cell: Top, Left, Bottom, Right
         *
         *    │ T │
         * ───┼───┼───
         *  R │ C │ L
         * ───┼───┼───
         *    │ B │
         *
         * We can only have 1 quarter selection with Arrow selection so it TL, TR, BR or BL, any other setup will clear the selection and start from scratch.
         *
         * > Note that the logic in this function is for use with arrow keys + SHIFT key, other selection logic
         * does not fit this scenario (e.g. MOUSE selection or ARROW KEYS + CTRL KEY selection)
         *
         * @param sourceCellRef A point reference to the source cell the direction is relative to
         * @param direction The direction of the new cell.
         * [1 | -1, 0] -> HORIZONTAL
         * [0, 1 | -1] -> VERTICAL
         */
        function handleSelectionChangeByArrows(sourceCellRef, direction) {
            var rowIdent = sourceCellRef.rowIdent, colIndex = sourceCellRef.colIndex;
            var sourceCellState = contextApi.findRowInCache(rowIdent);
            var _a = __read(direction, 2), moveH = _a[0], moveV = _a[1];
            var hAdj = [sourceCellState.cells[colIndex - 1], sourceCellState.cells[colIndex + 1]];
            var vAdj = [contextApi.findRowInCache(rowIdent, -1, true), contextApi.findRowInCache(rowIdent, 1, true)];
            var h = (hAdj[0] && hAdj[0].selected ? -1 : 0) + (hAdj[1] && hAdj[1].selected ? 1 : 0);
            var v = (vAdj[0] && vAdj[0].cells[colIndex].selected ? -1 : 0) + (vAdj[1] && vAdj[1].cells[colIndex].selected ? 1 : 0);
            if (h === 0) {
                h += moveH;
            }
            if (v === 0) {
                v += moveV;
            }
            var hCells = [];
            if (h !== 0) {
                var hContextIndex = colIndex;
                var hContext = sourceCellState.cells[colIndex];
                while (hContext && hContext.selected) {
                    hCells.push({ rowIdent: rowIdent, colIndex: hContextIndex });
                    hContextIndex += h;
                    hContext = sourceCellState.cells[hContextIndex];
                }
                if (moveH) {
                    if (h === moveH) {
                        if (hContext) {
                            hCells.push({ rowIdent: rowIdent, colIndex: hContextIndex });
                        }
                    }
                    else {
                        hCells.pop();
                    }
                }
            }
            var vCells = [];
            if (v !== 0) {
                var vContextIdent = rowIdent;
                var vContext = contextApi.findRowInCache(vContextIdent, v, true);
                while (vContext && vContext.cells[colIndex].selected) {
                    vContextIdent = vContext.identity;
                    vCells.push({ rowIdent: vContextIdent, colIndex: colIndex });
                    vContext = contextApi.findRowInCache(vContextIdent, v, true);
                }
                if (moveV) {
                    if (v === moveV) {
                        if (vContext) {
                            vCells.push({ rowIdent: vContext.identity, colIndex: colIndex });
                        }
                    }
                    else {
                        vCells.pop();
                    }
                }
            }
            var innerCells = getInnerCellsInRect(contextApi, hCells, vCells);
            contextApi.selectCells(__spreadArray(__spreadArray(__spreadArray([sourceCellRef], __read(hCells)), __read(vCells)), __read(innerCells)), true);
        }
        function handleSelectionChangeByMouseClickAndMove(event) {
            var e_1, _a;
            var cellContext = event.context;
            var activeFocus = contextApi.focusedCell || {
                rowIdent: cellContext.rowContext.identity,
                colIndex: cellContext.index,
            };
            var focusedRowState = contextApi.findRowInCache(activeFocus.rowIdent);
            var hCells = [];
            var vCells = [];
            try {
                for (var _b = __values(rangeBetween(activeFocus.colIndex, cellContext.index)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var i = _c.value;
                    hCells.push({ rowIdent: activeFocus.rowIdent, colIndex: i });
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            hCells.push({ rowIdent: activeFocus.rowIdent, colIndex: cellContext.index });
            var rowHeight = Math.abs(cellContext.rowContext.dsIndex - focusedRowState.dsIndex);
            var dir = focusedRowState.dsIndex > cellContext.rowContext.dsIndex ? -1 : 1;
            for (var i = 1; i <= rowHeight; i++) {
                var state = contextApi.findRowInCache(activeFocus.rowIdent, dir * i, true);
                vCells.push({ rowIdent: state.identity, colIndex: activeFocus.colIndex });
            }
            var innerCells = getInnerCellsInRect(contextApi, hCells, vCells);
            contextApi.selectCells(__spreadArray(__spreadArray(__spreadArray([activeFocus], __read(hCells)), __read(vCells)), __read(innerCells)), true);
        }
        /**
         * Swap the focus from the source cell to a straight adjacent cell (not diagonal).
         * @param sourceCellRef A point reference to the source cell the direction is relative to
         * @param direction The direction of the new cell.
         * [1 | -1, 0] -> HORIZONTAL
         * [0, 1 | -1] -> VERTICAL
         */
        function handleSingleItemFocus(sourceCellRef, direction) {
            var rowState = contextApi.findRowInCache(sourceCellRef.rowIdent, direction[1], true);
            if (rowState) {
                contextApi.focusCell({ rowIdent: rowState.identity, colIndex: sourceCellRef.colIndex + direction[0] });
            }
        }
        return {
            handleMouseDown: handleMouseDown,
            handleKeyDown: handleKeyDown,
            handleSelectionChangeByMouseClickAndMove: handleSelectionChangeByMouseClickAndMove
        };
    }

    var PLUGIN_KEY = 'targetEvents';
    function hasListeners(source) {
        return source.observers.length > 0;
    }
    function findEventSource(source) {
        var cellTarget = findParentCell(source.target);
        if (cellTarget) {
            return { type: 'cell', target: cellTarget };
        }
        else if (isRowContainer(source.target)) {
            return { type: 'cell', target: source.target };
        }
    }
    function runOnce() {
        i1.PblColumn.extendProperty('editable');
    }
    var PblNgridTargetEventsPlugin = /** @class */ (function () {
        function PblNgridTargetEventsPlugin(grid, injector, pluginCtrl) {
            var _this = this;
            this.grid = grid;
            this.injector = injector;
            this.pluginCtrl = pluginCtrl;
            this.rowClick = new i0.EventEmitter();
            this.rowDblClick = new i0.EventEmitter();
            this.rowEnter = new i0.EventEmitter();
            this.rowLeave = new i0.EventEmitter();
            this.cellClick = new i0.EventEmitter();
            this.cellDblClick = new i0.EventEmitter();
            this.cellEnter = new i0.EventEmitter();
            this.cellLeave = new i0.EventEmitter();
            this.mouseDown = new i0.EventEmitter();
            this.mouseUp = new i0.EventEmitter();
            this.keyUp = new i0.EventEmitter();
            this.keyDown = new i0.EventEmitter();
            this.destroyed = new rxjs.ReplaySubject();
            this._removePlugin = pluginCtrl.setPlugin(PLUGIN_KEY, this);
            pluginCtrl.onInit().subscribe(function () { return _this.init(); });
        }
        PblNgridTargetEventsPlugin.create = function (table, injector) {
            var pluginCtrl = i1.PblNgridPluginController.find(table);
            return new PblNgridTargetEventsPlugin(table, injector, pluginCtrl);
        };
        PblNgridTargetEventsPlugin.prototype.init = function () {
            this.setupDomEvents();
            handleFocusAndSelection(this);
        };
        PblNgridTargetEventsPlugin.prototype.setupDomEvents = function () {
            var _this = this;
            var grid = this.grid;
            var cdkTable = this.pluginCtrl.extApi.cdkTable;
            var cdkTableElement = cdkTable._element;
            var createCellEvent = function (cellTarget, source) {
                var e_1, _a;
                var rowTarget = cellTarget.parentElement;
                var matrixPoint = matrixRowFromRow(rowTarget, cdkTable._rowOutlet.viewContainer);
                if (matrixPoint) {
                    var event_1 = Object.assign(Object.assign({}, matrixPoint), { source: source, cellTarget: cellTarget, rowTarget: rowTarget });
                    if (matrixPoint.type === 'data') {
                        event_1.row = grid.ds.renderedData[matrixPoint.rowIndex];
                    }
                    else if (event_1.subType === 'meta') {
                        // When multiple containers exists (fixed/sticky/row) the rowIndex we get is the one relative to the container..
                        // We need to find the rowIndex relative to the definitions:
                        var metaRowService = _this.pluginCtrl.extApi.rowsApi.metaRowService;
                        var db = event_1.type === 'header' ? metaRowService.header : metaRowService.footer;
                        try {
                            for (var _b = __values([db.fixed, db.row, db.sticky]), _c = _b.next(); !_c.done; _c = _b.next()) {
                                var coll = _c.value;
                                var result = coll.find(function (item) { return item.el === event_1.rowTarget; });
                                if (result) {
                                    event_1.rowIndex = result.index;
                                    break;
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
                    /* `metadataFromElement()` does not provide column information nor the column itself. This will extend functionality to add the columnIndex and column.
                        The simple case is when `subType === 'data'`, in this case the column is always the data column for all types (header, data and footer)
            
                        If `subType !== 'data'` we need to get the proper column based type (type can only be `header` or `footer` at this point).
                        But that's not all, because `metadataFromElement()` does not handle `meta-group` subType we need to do it here...
                    */
                    event_1.colIndex = findCellRenderIndex(cellTarget);
                    if (matrixPoint.subType === 'data') {
                        var column = _this.grid.columnApi.findColumnAt(event_1.colIndex);
                        var columnIndex = _this.grid.columnApi.indexOf(column);
                        event_1.column = column;
                        event_1.context = _this.pluginCtrl.extApi.contextApi.getCell(event_1.rowIndex, columnIndex);
                        if (!event_1.context) {
                            _this.pluginCtrl.extApi.contextApi.clear(true);
                            event_1.context = _this.pluginCtrl.extApi.contextApi.getCell(event_1.rowIndex, columnIndex);
                        }
                    }
                    else {
                        var store = _this.pluginCtrl.extApi.columnStore;
                        var rowInfo = (matrixPoint.type === 'header' ? store.metaHeaderRows : store.metaFooterRows)[event_1.rowIndex];
                        var record = store.find(rowInfo.keys[event_1.colIndex]);
                        if (rowInfo.isGroup) {
                            event_1.subType = 'meta-group';
                            event_1.column = matrixPoint.type === 'header' ? record.headerGroup : record.footerGroup;
                        }
                        else {
                            event_1.column = matrixPoint.type === 'header' ? record.header : record.footer;
                        }
                    }
                    return event_1;
                }
            };
            var createRowEvent = function (rowTarget, source, root) {
                if (root) {
                    var event = {
                        source: source,
                        rowTarget: rowTarget,
                        type: root.type,
                        subType: root.subType,
                        rowIndex: root.rowIndex,
                        root: root
                    };
                    if (root.type === 'data') {
                        event.row = root.row;
                        event.context = root.context.rowContext;
                    }
                    return event;
                }
                else {
                    var matrixPoint = matrixRowFromRow(rowTarget, cdkTable._rowOutlet.viewContainer);
                    if (matrixPoint) {
                        var event = Object.assign(Object.assign({}, matrixPoint), { source: source, rowTarget: rowTarget });
                        if (matrixPoint.type === 'data') {
                            event.context = _this.pluginCtrl.extApi.contextApi.getRow(matrixPoint.rowIndex);
                            event.row = event.context.$implicit;
                        }
                        /*  If `subType !== 'data'` it can only be `meta` because `metadataFromElement()` does not handle `meta-group` subType.
                            We need to extend this missing part, we don't have columns here so we will try to infer it using the first column.
              
                            It's similar to how it's handled in cell clicks, but here we don't need to extends the column info.
                            We only need to change the `subType` when the row is a group row, getting a specific column is irrelevant.
                            We just need A column because group columns don't mix with regular meta columns.
              
                            NOTE: When subType is not 'data' the ype can only be `header` or `footer`.
                        */
                        if (matrixPoint.subType !== 'data') {
                            var store = _this.pluginCtrl.extApi.columnStore;
                            var rowInfo = (matrixPoint.type === 'header' ? store.metaHeaderRows : store.metaFooterRows)[event.rowIndex];
                            if (rowInfo.isGroup) {
                                event.subType = 'meta-group';
                            }
                        }
                        return event;
                    }
                }
            };
            var lastCellEnterEvent;
            var lastRowEnterEvent;
            var emitCellLeave = function (source) {
                if (lastCellEnterEvent) {
                    var lastCellEnterEventTemp = lastCellEnterEvent;
                    _this.cellLeave.emit(Object.assign({}, lastCellEnterEventTemp, { source: source }));
                    lastCellEnterEvent = undefined;
                    return lastCellEnterEventTemp;
                }
            };
            var emitRowLeave = function (source) {
                if (lastRowEnterEvent) {
                    var lastRowEnterEventTemp = lastRowEnterEvent;
                    _this.rowLeave.emit(Object.assign({}, lastRowEnterEventTemp, { source: source }));
                    lastRowEnterEvent = undefined;
                    return lastRowEnterEventTemp;
                }
            };
            var processEvent = function (e) {
                var result = findEventSource(e);
                if (result) {
                    if (result.type === 'cell') {
                        var event = createCellEvent(result.target, e);
                        if (event) {
                            return {
                                type: result.type,
                                event: event,
                                waitTime: hasListeners(_this.cellDblClick) ? 250 : 1,
                            };
                        }
                    }
                    else if (result.type === 'row') {
                        var event = createRowEvent(result.target, e);
                        if (event) {
                            return {
                                type: result.type,
                                event: event,
                                waitTime: hasListeners(_this.rowDblClick) ? 250 : 1,
                            };
                        }
                    }
                }
            };
            /** Split the result of processEvent into cell and row events, if type is row only row event is returned, if cell then cell is returned and row is created along side. */
            var splitProcessedEvent = function (event) {
                var cellEvent = event.type === 'cell' ? event.event : undefined;
                var rowEvent = cellEvent
                    ? createRowEvent(cellEvent.rowTarget, cellEvent.source, cellEvent)
                    : event.event;
                return { cellEvent: cellEvent, rowEvent: rowEvent };
            };
            var registerUpDownEvents = function (eventName, emitter) {
                rxjs.fromEvent(cdkTableElement, eventName)
                    .pipe(operators.takeUntil(_this.destroyed), operators.filter(function (source) { return hasListeners(emitter); }), operators.map(processEvent), operators.filter(function (result) { return !!result; }))
                    .subscribe(function (result) {
                    var _a = splitProcessedEvent(result), cellEvent = _a.cellEvent, rowEvent = _a.rowEvent;
                    emitter.emit(cellEvent || rowEvent);
                    _this.syncRow(cellEvent || rowEvent);
                });
            };
            registerUpDownEvents('mouseup', this.mouseUp);
            registerUpDownEvents('mousedown', this.mouseDown);
            registerUpDownEvents('keyup', this.keyUp);
            registerUpDownEvents('keydown', this.keyDown);
            /*
              Handling click stream for both click and double click events.
              We want to detect double clicks and clicks with minimal delays
              We check if a double click has listeners, if not we won't delay the click...
              TODO: on double click, don't wait the whole 250 ms if 2 clicks happen.
            */
            var clickStream = rxjs.fromEvent(cdkTableElement, 'click').pipe(operators.takeUntil(this.destroyed), operators.filter(function (source) { return hasListeners(_this.cellClick) || hasListeners(_this.cellDblClick) || hasListeners(_this.rowClick) || hasListeners(_this.rowDblClick); }), operators.map(processEvent), operators.filter(function (result) { return !!result; }));
            clickStream
                .pipe(operators.bufferWhen(function () { return clickStream.pipe(operators.debounce(function (e) { return rxjs.timer(e.waitTime); })); }), operators.filter(function (events) { return events.length > 0; }))
                .subscribe(function (events) {
                var event = events.shift();
                var isDoubleClick = events.length === 1; // if we have 2 events its double click, otherwise single.
                var _a = splitProcessedEvent(event), cellEvent = _a.cellEvent, rowEvent = _a.rowEvent;
                if (isDoubleClick) {
                    if (cellEvent) {
                        _this.cellDblClick.emit(cellEvent);
                    }
                    _this.rowDblClick.emit(rowEvent);
                }
                else {
                    if (cellEvent) {
                        _this.cellClick.emit(cellEvent);
                    }
                    _this.rowClick.emit(rowEvent);
                }
                _this.syncRow(cellEvent || rowEvent);
            });
            rxjs.fromEvent(cdkTableElement, 'mouseleave')
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function (source) {
                var lastEvent = emitCellLeave(source);
                lastEvent = emitRowLeave(source) || lastEvent;
                if (lastEvent) {
                    _this.syncRow(lastEvent);
                }
            });
            rxjs.fromEvent(cdkTableElement, 'mousemove')
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe(function (source) {
                var cellTarget = findParentCell(source.target);
                var lastCellTarget = lastCellEnterEvent && lastCellEnterEvent.cellTarget;
                var lastRowTarget = lastRowEnterEvent && lastRowEnterEvent.rowTarget;
                var cellEvent;
                var lastEvent;
                if (lastCellTarget !== cellTarget) {
                    lastEvent = emitCellLeave(source) || lastEvent;
                }
                if (cellTarget) {
                    if (lastCellTarget !== cellTarget) {
                        cellEvent = createCellEvent(cellTarget, source);
                        if (cellEvent) {
                            _this.cellEnter.emit(lastCellEnterEvent = cellEvent);
                        }
                    }
                    else {
                        return;
                    }
                }
                var rowTarget = (cellEvent && cellEvent.rowTarget) || (isRowContainer(source.target) && source.target);
                if (lastRowTarget !== rowTarget) {
                    lastEvent = emitRowLeave(source) || lastEvent;
                }
                if (rowTarget) {
                    if (lastRowTarget !== rowTarget) {
                        var rowEvent = createRowEvent(rowTarget, source, cellEvent);
                        if (rowEvent) {
                            _this.rowEnter.emit(lastRowEnterEvent = rowEvent);
                        }
                    }
                }
                if (lastEvent) {
                    _this.syncRow(lastEvent);
                }
            });
        };
        PblNgridTargetEventsPlugin.prototype.destroy = function () {
            this.destroyed.next();
            this.destroyed.complete();
            this._removePlugin(this.grid);
        };
        PblNgridTargetEventsPlugin.prototype.syncRow = function (event) {
            this.grid.rowsApi.syncRows(event.type, event.rowIndex);
        };
        return PblNgridTargetEventsPlugin;
    }());
    var PblNgridTargetEventsPluginDirective = /** @class */ (function (_super) {
        __extends(PblNgridTargetEventsPluginDirective, _super);
        function PblNgridTargetEventsPluginDirective(table, injector, pluginCtrl) {
            return _super.call(this, table, injector, pluginCtrl) || this;
        }
        PblNgridTargetEventsPluginDirective.prototype.ngOnDestroy = function () {
            this.destroy();
        };
        return PblNgridTargetEventsPluginDirective;
    }(PblNgridTargetEventsPlugin));
    /** @nocollapse */ PblNgridTargetEventsPluginDirective.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridTargetEventsPluginDirective, deps: [{ token: i1__namespace.PblNgridComponent }, { token: i0__namespace.Injector }, { token: i1__namespace.PblNgridPluginController }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ PblNgridTargetEventsPluginDirective.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridTargetEventsPluginDirective, selector: "pbl-ngrid[targetEvents], pbl-ngrid[rowClick], pbl-ngrid[rowDblClick], pbl-ngrid[rowEnter], pbl-ngrid[rowLeave], pbl-ngrid[cellClick], pbl-ngrid[cellDblClick], pbl-ngrid[cellEnter], pbl-ngrid[cellLeave], pbl-ngrid[keyDown], pbl-ngrid[keyUp]", outputs: { rowClick: "rowClick", rowDblClick: "rowDblClick", rowEnter: "rowEnter", rowLeave: "rowLeave", cellClick: "cellClick", cellDblClick: "cellDblClick", cellEnter: "cellEnter", cellLeave: "cellLeave", keyDown: "keyDown", keyUp: "keyUp" }, usesInheritance: true, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridTargetEventsPluginDirective, decorators: [{
                type: i0.Directive,
                args: [{
                        // tslint:disable-next-line:directive-selector
                        selector: 'pbl-ngrid[targetEvents], pbl-ngrid[rowClick], pbl-ngrid[rowDblClick], pbl-ngrid[rowEnter], pbl-ngrid[rowLeave], pbl-ngrid[cellClick], pbl-ngrid[cellDblClick], pbl-ngrid[cellEnter], pbl-ngrid[cellLeave], pbl-ngrid[keyDown], pbl-ngrid[keyUp]',
                        // tslint:disable-next-line:use-output-property-decorator
                        outputs: ['rowClick', 'rowDblClick', 'rowEnter', 'rowLeave', 'cellClick', 'cellDblClick', 'cellEnter', 'cellLeave', 'keyDown', 'keyUp']
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.PblNgridComponent }, { type: i0__namespace.Injector }, { type: i1__namespace.PblNgridPluginController }]; } });

    var PblNgridCellEditDirective = /** @class */ (function () {
        function PblNgridCellEditDirective(grid, injector, pluginCtrl) {
            var _this = this;
            this._click = false;
            this._dblClick = false;
            pluginCtrl.onInit()
                .subscribe(function () {
                _this.targetEventsPlugin = pluginCtrl.getPlugin('targetEvents') || pluginCtrl.createPlugin('targetEvents');
                _this.update();
            });
        }
        Object.defineProperty(PblNgridCellEditDirective.prototype, "cellEditClick", {
            set: function (value) {
                value = coercion.coerceBooleanProperty(value);
                if (this._click !== value) {
                    this._click = value;
                    this.update();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblNgridCellEditDirective.prototype, "cellEditDblClick", {
            set: function (value) {
                value = coercion.coerceBooleanProperty(value);
                if (this._dblClick !== value) {
                    this._dblClick = value;
                    this.update();
                }
            },
            enumerable: false,
            configurable: true
        });
        PblNgridCellEditDirective.prototype.ngOnDestroy = function () {
            i1$1.unrx.kill(this);
        };
        PblNgridCellEditDirective.prototype.update = function () {
            if (this.targetEventsPlugin) {
                i1$1.unrx.kill(this, this.targetEventsPlugin);
                if (this._click) {
                    this.targetEventsPlugin.cellClick
                        .pipe(i1$1.unrx(this, this.targetEventsPlugin))
                        .subscribe(function (event) {
                        if (event.type === 'data' && event.column.editable) {
                            event.context.startEdit(true);
                        }
                    });
                }
                if (this._dblClick) {
                    this.targetEventsPlugin.cellDblClick
                        .pipe(i1$1.unrx(this, this.targetEventsPlugin))
                        .subscribe(function (event) {
                        if (event.type === 'data' && event.column.editable) {
                            event.context.startEdit(true);
                        }
                    });
                }
            }
        };
        return PblNgridCellEditDirective;
    }());
    /** @nocollapse */ PblNgridCellEditDirective.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridCellEditDirective, deps: [{ token: i1__namespace.PblNgridComponent }, { token: i0__namespace.Injector }, { token: i1__namespace.PblNgridPluginController }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ PblNgridCellEditDirective.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridCellEditDirective, selector: "pbl-ngrid[cellEditClick], pbl-ngrid[cellEditDblClick]", inputs: { cellEditClick: "cellEditClick", cellEditDblClick: "cellEditDblClick" }, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridCellEditDirective, decorators: [{
                type: i0.Directive,
                args: [{
                        // tslint:disable-next-line:directive-selector
                        selector: 'pbl-ngrid[cellEditClick], pbl-ngrid[cellEditDblClick]',
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.PblNgridComponent }, { type: i0__namespace.Injector }, { type: i1__namespace.PblNgridPluginController }]; }, propDecorators: { cellEditClick: [{
                    type: i0.Input
                }], cellEditDblClick: [{
                    type: i0.Input
                }] } });

    var PblNgridTargetEventsModule = /** @class */ (function () {
        function PblNgridTargetEventsModule(configService) {
            i1.PblNgridPluginController.onCreatedSafe(PblNgridTargetEventsModule, function (grid, controller) {
                var targetEventsConfig = configService.get(PLUGIN_KEY);
                if (targetEventsConfig && targetEventsConfig.autoEnable === true) {
                    controller.onInit()
                        .subscribe(function () {
                        if (!controller.hasPlugin(PLUGIN_KEY)) {
                            controller.createPlugin(PLUGIN_KEY);
                        }
                    });
                }
            });
        }
        return PblNgridTargetEventsModule;
    }());
    PblNgridTargetEventsModule.NGRID_PLUGIN = i1.ngridPlugin({ id: PLUGIN_KEY, factory: 'create', runOnce: runOnce }, PblNgridTargetEventsPlugin);
    /** @nocollapse */ PblNgridTargetEventsModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridTargetEventsModule, deps: [{ token: i1__namespace$1.PblNgridConfigService }], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    /** @nocollapse */ PblNgridTargetEventsModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridTargetEventsModule, declarations: [PblNgridTargetEventsPluginDirective, PblNgridCellEditDirective], imports: [common.CommonModule, table.CdkTableModule, i1.PblNgridModule], exports: [PblNgridTargetEventsPluginDirective, PblNgridCellEditDirective] });
    /** @nocollapse */ PblNgridTargetEventsModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridTargetEventsModule, imports: [[common.CommonModule, table.CdkTableModule, i1.PblNgridModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridTargetEventsModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [common.CommonModule, table.CdkTableModule, i1.PblNgridModule],
                        declarations: [PblNgridTargetEventsPluginDirective, PblNgridCellEditDirective],
                        exports: [PblNgridTargetEventsPluginDirective, PblNgridCellEditDirective]
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace$1.PblNgridConfigService }]; } });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.PblNgridCellEditDirective = PblNgridCellEditDirective;
    exports.PblNgridTargetEventsModule = PblNgridTargetEventsModule;
    exports.PblNgridTargetEventsPlugin = PblNgridTargetEventsPlugin;
    exports.PblNgridTargetEventsPluginDirective = PblNgridTargetEventsPluginDirective;
    exports.isCellEvent = isCellEvent;
    exports.isDataCellEvent = isDataCellEvent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=pebula-ngrid-target-events.umd.js.map
