(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs'), require('@angular/core'), require('@angular/cdk/coercion'), require('@pebula/ngrid/core'), require('@pebula/ngrid'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@pebula/ngrid-bootstrap/sort', ['exports', 'rxjs', '@angular/core', '@angular/cdk/coercion', '@pebula/ngrid/core', '@pebula/ngrid', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.pebula = global.pebula || {}, global.pebula['ngrid-bootstrap'] = global.pebula['ngrid-bootstrap'] || {}, global.pebula['ngrid-bootstrap'].sort = {}), global.rxjs, global.ng.core, global.ng.cdk.coercion, global.pebula.ngrid.core, global.pebula.ngrid, global.ng.common));
}(this, (function (exports, rxjs, i0, coercion, core, i1, common) { 'use strict';

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

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /** @docs-private */
    function getSortDuplicateSortableIdError(id) {
        return Error("Cannot have two PblNgridBsSortable with the same id (" + id + ").");
    }
    /** @docs-private */
    function getSortHeaderNotContainedWithinSortError() {
        return Error("PblNgridBsSortable must be placed within a parent element with the bsSortable directive.");
    }
    /** @docs-private */
    function getSortHeaderMissingIdError() {
        return Error("PblNgridBsSortable must be provided with a unique id.");
    }
    /** @docs-private */
    function getSortInvalidDirectionError(direction) {
        return Error(direction + " is not a valid sort direction ('asc' or 'desc').");
    }

    var PLUGIN_KEY = 'bsSortable';
    var PblNgridBsSortablePlugin = /** @class */ (function () {
        function PblNgridBsSortablePlugin(grid, pluginCtrl) {
            var _this = this;
            this.grid = grid;
            this.pluginCtrl = pluginCtrl;
            /** Collection of all registered sortables that this directive manages. */
            this.sortables = new Map();
            /** Used to notify any child components listening to state changes. */
            this._stateChanges = new rxjs.Subject();
            /**
             * The direction to set when an PblNgridSortable is initially sorted.
             * May be overriden by the PblNgridSortable's sort start.
             */
            this.start = 'asc';
            this.bsArrowPosition = 'after';
            /** Event emitted when the user changes either the active sort or sort direction. */
            this.sortChange = new i0.EventEmitter();
            this._direction = '';
            this._disabled = false;
            this.origin = 'click';
            this._removePlugin = pluginCtrl.setPlugin(PLUGIN_KEY, this);
            this.sortChange
                .pipe(core.unrx(this))
                .subscribe(function (s) {
                _this.onSort(s, _this.origin);
                _this.origin = 'click';
            });
            this.handleEvents();
        }
        Object.defineProperty(PblNgridBsSortablePlugin.prototype, "bsSortableDisabled", {
            get: function () { return this._disabled; },
            set: function (value) { this._disabled = coercion.coerceBooleanProperty(value); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblNgridBsSortablePlugin.prototype, "direction", {
            /** The sort direction of the currently active MatSortable. */
            get: function () { return this._direction; },
            set: function (direction) {
                if (direction && direction !== 'asc' && direction !== 'desc' &&
                    (typeof ngDevMode === 'undefined' || ngDevMode)) {
                    throw getSortInvalidDirectionError(direction);
                }
                this._direction = direction;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(PblNgridBsSortablePlugin.prototype, "disableClear", {
            /**
             * Whether to disable the user from clearing the sort by finishing the sort direction cycle.
             * May be overriden by the MatSortable's disable clear input.
             */
            get: function () { return this._disableClear; },
            set: function (v) { this._disableClear = coercion.coerceBooleanProperty(v); },
            enumerable: false,
            configurable: true
        });
        /**
         * Register function to be used by the contained PblNgridSortable. Adds the PblNgridSortable to the
         * collection of PblNgridSortable.
         */
        PblNgridBsSortablePlugin.prototype.register = function (sortable) {
            if (typeof ngDevMode === 'undefined' || ngDevMode) {
                if (!sortable.id) {
                    throw getSortHeaderMissingIdError();
                }
                if (this.sortables.has(sortable.id)) {
                    throw getSortDuplicateSortableIdError(sortable.id);
                }
            }
            this.sortables.set(sortable.id, sortable);
        };
        /**
         * Unregister function to be used by the contained PblNgridSortables. Removes the PblNgridSortable from the
         * collection of contained PblNgridSortables.
         */
        PblNgridBsSortablePlugin.prototype.deregister = function (sortable) {
            this.sortables.delete(sortable.id);
        };
        /** Sets the active sort id and determines the new sort direction. */
        PblNgridBsSortablePlugin.prototype.sort = function (sortable) {
            if (this.active != sortable.id) {
                this.active = sortable.id;
                this.direction = sortable.start ? sortable.start : this.start;
            }
            else {
                this.direction = this.getNextSortDirection(sortable);
            }
            this.sortChange.emit({ active: this.active, direction: this.direction });
        };
        /** Returns the next sort direction of the active sortable, checking for potential overrides. */
        PblNgridBsSortablePlugin.prototype.getNextSortDirection = function (sortable) {
            if (!sortable) {
                return '';
            }
            // Get the sort direction cycle with the potential sortable overrides.
            var disableClear = sortable.disableClear != null ? sortable.disableClear : this.disableClear;
            var sortDirectionCycle = getSortDirectionCycle(sortable.start || this.start, disableClear);
            // Get and return the next direction in the cycle
            var nextDirectionIndex = sortDirectionCycle.indexOf(this.direction) + 1;
            if (nextDirectionIndex >= sortDirectionCycle.length) {
                nextDirectionIndex = 0;
            }
            return sortDirectionCycle[nextDirectionIndex];
        };
        PblNgridBsSortablePlugin.prototype.ngOnChanges = function () {
            this._stateChanges.next();
        };
        PblNgridBsSortablePlugin.prototype.ngOnDestroy = function () {
            this._stateChanges.complete();
            this._removePlugin(this.grid);
            core.unrx.kill(this);
        };
        PblNgridBsSortablePlugin.prototype.onSort = function (sort, origin) {
            var table = this.grid;
            var column = table.columnApi.visibleColumns.find(function (c) { return c.id === sort.active; });
            if (origin !== 'click' || !column || !column.sort) {
                return;
            }
            else {
                var newSort = {};
                var sortFn = typeof column.sort === 'function' && column.sort;
                if (sort.direction) {
                    newSort.order = sort.direction;
                }
                if (sortFn) {
                    newSort.sortFn = sortFn;
                }
                var currentSort = table.ds.sort;
                if (column === currentSort.column) {
                    var _sort = currentSort.sort || {};
                    if (newSort.order === _sort.order) {
                        return;
                    }
                }
                table.ds.setSort(column, newSort);
            }
        };
        PblNgridBsSortablePlugin.prototype.handleEvents = function () {
            var _this = this;
            var handleDataSourceSortChange = function (sortChange) {
                var column = sortChange.column;
                var order = sortChange.sort ? sortChange.sort.order : undefined;
                if (column) {
                    if (_this.active === column.id && _this.direction === (order || '')) {
                        return;
                    }
                    var sortable = _this.sortables.get(column.id);
                    if (sortable) {
                        _this.origin = 'ds';
                        _this.active = undefined;
                        sortable.start = order || 'asc';
                        sortable._handleClick();
                    }
                }
                else if (_this.active) { // clear mode (hit from code, not click).
                    var sortable = _this.sortables.get(_this.active);
                    if (sortable) {
                        if (!sortable.disableClear) {
                            var nextSortDir = void 0;
                            while (nextSortDir = _this.getNextSortDirection(sortable)) {
                                _this.direction = nextSortDir;
                            }
                        }
                        _this.origin = 'ds';
                        sortable._handleClick();
                    }
                }
            };
            this.pluginCtrl.events
                .pipe(core.ON_INVALIDATE_HEADERS)
                .subscribe(function (e) {
                var _a;
                var hasActiveSort = _this.active;
                if ((_a = _this.grid.ds) === null || _a === void 0 ? void 0 : _a.sort) {
                    if (!_this.grid.ds.sort.column && hasActiveSort) {
                        _this.onSort({ active: _this.active, direction: _this.direction || 'asc' }, _this.origin);
                    }
                    else if (_this.grid.ds.sort.column && !hasActiveSort) {
                        setTimeout(function () { return handleDataSourceSortChange(_this.grid.ds.sort); });
                    }
                }
            });
            this.pluginCtrl.events
                .subscribe(function (e) {
                if (e.kind === 'onDataSource') {
                    core.unrx.kill(_this, e.prev);
                    if (_this.active) {
                        _this.onSort({ active: _this.active, direction: _this.direction || 'asc' }, _this.origin);
                    }
                    _this.grid.ds.sortChange
                        .pipe(core.unrx(_this, e.curr))
                        .subscribe(function (event) { handleDataSourceSortChange(event); });
                }
            });
        };
        return PblNgridBsSortablePlugin;
    }());
    /** @nocollapse */ PblNgridBsSortablePlugin.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridBsSortablePlugin, deps: [{ token: i1__namespace.PblNgridComponent }, { token: i1__namespace.PblNgridPluginController }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ PblNgridBsSortablePlugin.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridBsSortablePlugin, selector: "pbl-ngrid[bsSortable]", inputs: { active: ["bsSortableActive", "active"], start: ["bsSortableStart", "start"], direction: ["bsSortableDirection", "direction"], bsArrowPosition: "bsArrowPosition", disableClear: ["matSortDisableClear", "disableClear"] }, outputs: { sortChange: "matSortChange" }, exportAs: ["pblBsSortable"], usesOnChanges: true, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridBsSortablePlugin, decorators: [{
                type: i0.Directive,
                args: [{ selector: 'pbl-ngrid[bsSortable]', exportAs: 'pblBsSortable' }]
            }], ctorParameters: function () { return [{ type: i1__namespace.PblNgridComponent }, { type: i1__namespace.PblNgridPluginController }]; }, propDecorators: { active: [{
                    type: i0.Input,
                    args: ['bsSortableActive']
                }], start: [{
                    type: i0.Input,
                    args: ['bsSortableStart']
                }], direction: [{
                    type: i0.Input,
                    args: ['bsSortableDirection']
                }], bsArrowPosition: [{
                    type: i0.Input
                }], disableClear: [{
                    type: i0.Input,
                    args: ['matSortDisableClear']
                }], sortChange: [{
                    type: i0.Output,
                    args: ['matSortChange']
                }] } });
    function getSortDirectionCycle(start, disableClear) {
        var sortOrder = ['asc', 'desc'];
        if (start == 'desc') {
            sortOrder.reverse();
        }
        if (!disableClear) {
            sortOrder.push('');
        }
        return sortOrder;
    }

    var PblNgridBsSortable = /** @class */ (function () {
        function PblNgridBsSortable(cdRef, plugin) {
            var _this = this;
            this.plugin = plugin;
            rxjs.merge(plugin.sortChange, plugin._stateChanges)
                .subscribe(function () {
                if (_this._isSorted()) {
                    _this._updateArrowDirection();
                }
                cdRef.markForCheck();
            });
        }
        PblNgridBsSortable.prototype.ngOnInit = function () {
            // Initialize the direction of the arrow and set the view state to be immediately that state.
            this._updateArrowDirection();
            this.plugin.register(this);
        };
        PblNgridBsSortable.prototype.ngOnDestroy = function () {
            this.plugin.deregister(this);
            core.unrx.kill(this);
        };
        PblNgridBsSortable.prototype._handleClick = function () {
            if (!this._isDisabled()) {
                this._toggleOnInteraction();
            }
        };
        PblNgridBsSortable.prototype._updateArrowDirection = function () {
            this._direction = this._isSorted()
                ? this.plugin.direction
                : (this.start || this.plugin.start);
        };
        PblNgridBsSortable.prototype._isAfter = function () {
            return this.plugin.bsArrowPosition === 'after';
        };
        /** Whether this PblNgridBsSortable is currently sorted in either ascending or descending order. */
        PblNgridBsSortable.prototype._isSorted = function () {
            return this.plugin.active == this.id && (this.plugin.direction === 'asc' || this.plugin.direction === 'desc');
        };
        PblNgridBsSortable.prototype._isDisabled = function () {
            return this.plugin.bsSortableDisabled; //|| this.disabled;
        };
        /** Triggers the sort on this sort header and removes the indicator hint. */
        PblNgridBsSortable.prototype._toggleOnInteraction = function () {
            this.plugin.sort(this);
        };
        return PblNgridBsSortable;
    }());
    /** @nocollapse */ PblNgridBsSortable.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridBsSortable, deps: [{ token: i0__namespace.ChangeDetectorRef }, { token: PblNgridBsSortablePlugin }], target: i0__namespace.ɵɵFactoryTarget.Component });
    /** @nocollapse */ PblNgridBsSortable.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridBsSortable, selector: "pbl-bs-sortable", host: { listeners: { "click": "_handleClick()" } }, ngImport: i0__namespace, template: "<div class=\"pbl-bs-sortable\"\n     [class.pbl-bs-sortable-after]=\"_isAfter()\"\n     [class.pbl-bs-sortable-sorted]=\"_isSorted()\"\n     [class.pbl-bs-sortable-disabled]=\"_isDisabled()\"\n     [class.asc]=\"_direction === 'asc'\"\n     [class.desc]=\"_direction === 'desc'\"\n     role=\"button\">\n\n  <ng-content></ng-content>\n</div>\n", styles: [".pbl-bs-sortable{cursor:pointer;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-user-select:none}.pbl-bs-sortable.pbl-bs-sortable-sorted{position:relative}.pbl-bs-sortable.pbl-bs-sortable-sorted:before{content:\"\";display:block;position:absolute;background:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAmxJREFUeAHtmksrRVEUx72fH8CIGQNJkpGUUmakDEiZSJRIZsRQmCkTJRmZmJgQE0kpX0D5DJKJgff7v+ru2u3O3vvc67TOvsdatdrnnP1Y///v7HvvubdbUiIhBISAEBACQkAICAEhIAQ4CXSh2DnyDfmCPEG2Iv9F9MPlM/LHyAecdyMzHYNwR3fdNK/OH9HXl1UCozD24TCvILxizEDWIEzA0FcM8woCgRrJCoS5PIwrANQSMAJX1LEI9bqpQo4JYNFFKRSvIgsxHDVnqZgIkPnNBM0rIGtYk9YOOsqgbgepRCfdbmFtqhFkVEDVPjJp0+Z6e6hRHhqBKgg6ZDCvYBygVmUoEGoh5JTRvIJwhJo1aUOoh4CLPMyvxxi7EWOMgnCGsXXI1GIXlZUYX7ucU+kbR8NW8lh3O7cue0Pk32MKndfUxQFAwxdirk3fHappAnc0oqDPzDfGTBrCfHP04dM4oTV8cxr0SVzH9FF07xD3ib6xCDE+M+aUcVygtWzzbtGX2rPBrEUYfecfQkaFzYi6HjVnGBdtL7epqAlc1+jRdAap74RrnPc4BCijttY2tRcdN0g17w7HqZrXhdJTYAuS3hd8z+vKgK3V1zWPae0mZDMykadBn1hTQBLnZNwVrJpSe/NwEeDsEwCctEOsJTsgxLvCqUl2ACftEGvJDgjxrnBqkh3ASTvEWrIDQrwrnJpkB3DSDrGW7IAQ7wqnJtkBnLRztejXXVu4+mxz/nQ9jR1w5VB86ejLTFcnnDwhzV+F6T+CHZlx6THSjn76eyyBIOPHyDakhBAQAkJACAgBISAEhIAQYCLwC8JxpAmsEGt6AAAAAElFTkSuQmCC\") no-repeat;background-size:22px;width:22px;height:22px;margin-left:-22px}.pbl-bs-sortable.pbl-bs-sortable-sorted.pbl-bs-sortable-after:before{right:0;transform:translateX(100%);-ms-transform:translateX(100%)}.pbl-bs-sortable.pbl-bs-sortable-sorted.desc:before{transform:rotate(180deg);-ms-transform:rotate(180deg)}.pbl-bs-sortable.pbl-bs-sortable-sorted.desc.pbl-bs-sortable-after:before{transform:translateX(100%) rotate(180deg);-ms-transform:translateX(100%) rotate(180deg)}"], changeDetection: i0__namespace.ChangeDetectionStrategy.OnPush, encapsulation: i0__namespace.ViewEncapsulation.None });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridBsSortable, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'pbl-bs-sortable',
                        templateUrl: './bs-sortable.component.html',
                        styleUrls: ['./bs-sortable.component.scss'],
                        encapsulation: i0.ViewEncapsulation.None,
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        host: {
                            '(click)': '_handleClick()',
                        }
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.ChangeDetectorRef }, { type: PblNgridBsSortablePlugin }]; } });

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

    var PblBsSortableExtension = /** @class */ (function (_super) {
        __extends(PblBsSortableExtension, _super);
        function PblBsSortableExtension(cfr) {
            var _this = _super.call(this) || this;
            _this.cfr = cfr;
            _this.name = 'bsSortContainer';
            _this.kind = 'dataHeaderExtensions';
            _this.projectContent = true;
            return _this;
        }
        PblBsSortableExtension.prototype.shouldRender = function (context) {
            return !!context.col.sort && !!context.injector.get(PblNgridBsSortablePlugin, false);
        };
        PblBsSortableExtension.prototype.getFactory = function (context) {
            return this.cfr.resolveComponentFactory(PblNgridBsSortable);
        };
        PblBsSortableExtension.prototype.onCreated = function (context, cmpRef) {
            // We assign the ID and also verify that it does not exist on the `MatSort` container
            // It might exists on specific scenarios when a header is removed and added instantly but the "add" part happens before the teardown so the `MatSort` will throw.
            this.deregisterId(context, cmpRef.instance.id = context.col.id);
            cmpRef.changeDetectorRef.markForCheck();
        };
        /**
         * Check that the current `MatSort` does not already have a sortable header with the provided id.
         */
        PblBsSortableExtension.prototype.deregisterId = function (context, id) {
            var matSort = context.injector.get(PblNgridBsSortablePlugin);
            var matSortHeader = matSort.sortables.get(id);
            if (matSortHeader) {
                matSort.deregister(matSortHeader);
            }
        };
        return PblBsSortableExtension;
    }(i1.PblNgridMultiComponentRegistry));

    var PblNgridBsSortableModule = /** @class */ (function () {
        function PblNgridBsSortableModule(registry, cfr) {
            this.registry = registry;
            registry.addMulti('dataHeaderExtensions', new PblBsSortableExtension(cfr));
        }
        return PblNgridBsSortableModule;
    }());
    PblNgridBsSortableModule.NGRID_PLUGIN = i1.ngridPlugin({ id: PLUGIN_KEY }, PblNgridBsSortablePlugin);
    /** @nocollapse */ PblNgridBsSortableModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridBsSortableModule, deps: [{ token: i1__namespace.PblNgridRegistryService }, { token: i0__namespace.ComponentFactoryResolver }], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    /** @nocollapse */ PblNgridBsSortableModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridBsSortableModule, declarations: [PblNgridBsSortablePlugin, PblNgridBsSortable], imports: [common.CommonModule, i1.PblNgridModule], exports: [PblNgridBsSortablePlugin, PblNgridBsSortable] });
    /** @nocollapse */ PblNgridBsSortableModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridBsSortableModule, imports: [[common.CommonModule, i1.PblNgridModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridBsSortableModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [common.CommonModule, i1.PblNgridModule],
                        declarations: [PblNgridBsSortablePlugin, PblNgridBsSortable],
                        exports: [PblNgridBsSortablePlugin, PblNgridBsSortable],
                        // TODO(REFACTOR_REF 2): remove when ViewEngine is no longer supported by angular (V12 ???)
                        entryComponents: [PblNgridBsSortable],
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.PblNgridRegistryService }, { type: i0__namespace.ComponentFactoryResolver }]; } });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.PblNgridBsSortable = PblNgridBsSortable;
    exports.PblNgridBsSortableModule = PblNgridBsSortableModule;
    exports.PblNgridBsSortablePlugin = PblNgridBsSortablePlugin;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=pebula-ngrid-bootstrap-sort.umd.js.map
