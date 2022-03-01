import { Subject, merge } from 'rxjs';
import * as i0 from '@angular/core';
import { EventEmitter, Directive, Input, Output, Component, ViewEncapsulation, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { unrx, ON_INVALIDATE_HEADERS } from '@pebula/ngrid/core';
import * as i1 from '@pebula/ngrid';
import { PblNgridMultiComponentRegistry, ngridPlugin, PblNgridModule } from '@pebula/ngrid';
import { CommonModule } from '@angular/common';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** @docs-private */
function getSortDuplicateSortableIdError(id) {
    return Error(`Cannot have two PblNgridBsSortable with the same id (${id}).`);
}
/** @docs-private */
function getSortHeaderNotContainedWithinSortError() {
    return Error(`PblNgridBsSortable must be placed within a parent element with the bsSortable directive.`);
}
/** @docs-private */
function getSortHeaderMissingIdError() {
    return Error(`PblNgridBsSortable must be provided with a unique id.`);
}
/** @docs-private */
function getSortInvalidDirectionError(direction) {
    return Error(`${direction} is not a valid sort direction ('asc' or 'desc').`);
}

const PLUGIN_KEY = 'bsSortable';
class PblNgridBsSortablePlugin {
    constructor(grid, pluginCtrl) {
        this.grid = grid;
        this.pluginCtrl = pluginCtrl;
        /** Collection of all registered sortables that this directive manages. */
        this.sortables = new Map();
        /** Used to notify any child components listening to state changes. */
        this._stateChanges = new Subject();
        /**
         * The direction to set when an PblNgridSortable is initially sorted.
         * May be overriden by the PblNgridSortable's sort start.
         */
        this.start = 'asc';
        this.bsArrowPosition = 'after';
        /** Event emitted when the user changes either the active sort or sort direction. */
        this.sortChange = new EventEmitter();
        this._direction = '';
        this._disabled = false;
        this.origin = 'click';
        this._removePlugin = pluginCtrl.setPlugin(PLUGIN_KEY, this);
        this.sortChange
            .pipe(unrx(this))
            .subscribe(s => {
            this.onSort(s, this.origin);
            this.origin = 'click';
        });
        this.handleEvents();
    }
    get bsSortableDisabled() { return this._disabled; }
    set bsSortableDisabled(value) { this._disabled = coerceBooleanProperty(value); }
    /** The sort direction of the currently active MatSortable. */
    get direction() { return this._direction; }
    set direction(direction) {
        if (direction && direction !== 'asc' && direction !== 'desc' &&
            (typeof ngDevMode === 'undefined' || ngDevMode)) {
            throw getSortInvalidDirectionError(direction);
        }
        this._direction = direction;
    }
    /**
     * Whether to disable the user from clearing the sort by finishing the sort direction cycle.
     * May be overriden by the MatSortable's disable clear input.
     */
    get disableClear() { return this._disableClear; }
    set disableClear(v) { this._disableClear = coerceBooleanProperty(v); }
    /**
     * Register function to be used by the contained PblNgridSortable. Adds the PblNgridSortable to the
     * collection of PblNgridSortable.
     */
    register(sortable) {
        if (typeof ngDevMode === 'undefined' || ngDevMode) {
            if (!sortable.id) {
                throw getSortHeaderMissingIdError();
            }
            if (this.sortables.has(sortable.id)) {
                throw getSortDuplicateSortableIdError(sortable.id);
            }
        }
        this.sortables.set(sortable.id, sortable);
    }
    /**
     * Unregister function to be used by the contained PblNgridSortables. Removes the PblNgridSortable from the
     * collection of contained PblNgridSortables.
     */
    deregister(sortable) {
        this.sortables.delete(sortable.id);
    }
    /** Sets the active sort id and determines the new sort direction. */
    sort(sortable) {
        if (this.active != sortable.id) {
            this.active = sortable.id;
            this.direction = sortable.start ? sortable.start : this.start;
        }
        else {
            this.direction = this.getNextSortDirection(sortable);
        }
        this.sortChange.emit({ active: this.active, direction: this.direction });
    }
    /** Returns the next sort direction of the active sortable, checking for potential overrides. */
    getNextSortDirection(sortable) {
        if (!sortable) {
            return '';
        }
        // Get the sort direction cycle with the potential sortable overrides.
        const disableClear = sortable.disableClear != null ? sortable.disableClear : this.disableClear;
        let sortDirectionCycle = getSortDirectionCycle(sortable.start || this.start, disableClear);
        // Get and return the next direction in the cycle
        let nextDirectionIndex = sortDirectionCycle.indexOf(this.direction) + 1;
        if (nextDirectionIndex >= sortDirectionCycle.length) {
            nextDirectionIndex = 0;
        }
        return sortDirectionCycle[nextDirectionIndex];
    }
    ngOnChanges() {
        this._stateChanges.next();
    }
    ngOnDestroy() {
        this._stateChanges.complete();
        this._removePlugin(this.grid);
        unrx.kill(this);
    }
    onSort(sort, origin) {
        const table = this.grid;
        const column = table.columnApi.visibleColumns.find(c => c.id === sort.active);
        if (origin !== 'click' || !column || !column.sort) {
            return;
        }
        else {
            const newSort = {};
            const sortFn = typeof column.sort === 'function' && column.sort;
            if (sort.direction) {
                newSort.order = sort.direction;
            }
            if (sortFn) {
                newSort.sortFn = sortFn;
            }
            const currentSort = table.ds.sort;
            if (column === currentSort.column) {
                const _sort = currentSort.sort || {};
                if (newSort.order === _sort.order) {
                    return;
                }
            }
            table.ds.setSort(column, newSort);
        }
    }
    handleEvents() {
        const handleDataSourceSortChange = (sortChange) => {
            const { column } = sortChange;
            const order = sortChange.sort ? sortChange.sort.order : undefined;
            if (column) {
                if (this.active === column.id && this.direction === (order || '')) {
                    return;
                }
                const sortable = this.sortables.get(column.id);
                if (sortable) {
                    this.origin = 'ds';
                    this.active = undefined;
                    sortable.start = order || 'asc';
                    sortable._handleClick();
                }
            }
            else if (this.active) { // clear mode (hit from code, not click).
                const sortable = this.sortables.get(this.active);
                if (sortable) {
                    if (!sortable.disableClear) {
                        let nextSortDir;
                        while (nextSortDir = this.getNextSortDirection(sortable)) {
                            this.direction = nextSortDir;
                        }
                    }
                    this.origin = 'ds';
                    sortable._handleClick();
                }
            }
        };
        this.pluginCtrl.events
            .pipe(ON_INVALIDATE_HEADERS)
            .subscribe(e => {
            var _a;
            const hasActiveSort = this.active;
            if ((_a = this.grid.ds) === null || _a === void 0 ? void 0 : _a.sort) {
                if (!this.grid.ds.sort.column && hasActiveSort) {
                    this.onSort({ active: this.active, direction: this.direction || 'asc' }, this.origin);
                }
                else if (this.grid.ds.sort.column && !hasActiveSort) {
                    setTimeout(() => handleDataSourceSortChange(this.grid.ds.sort));
                }
            }
        });
        this.pluginCtrl.events
            .subscribe(e => {
            if (e.kind === 'onDataSource') {
                unrx.kill(this, e.prev);
                if (this.active) {
                    this.onSort({ active: this.active, direction: this.direction || 'asc' }, this.origin);
                }
                this.grid.ds.sortChange
                    .pipe(unrx(this, e.curr))
                    .subscribe(event => { handleDataSourceSortChange(event); });
            }
        });
    }
}
/** @nocollapse */ PblNgridBsSortablePlugin.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridBsSortablePlugin, deps: [{ token: i1.PblNgridComponent }, { token: i1.PblNgridPluginController }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ PblNgridBsSortablePlugin.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridBsSortablePlugin, selector: "pbl-ngrid[bsSortable]", inputs: { active: ["bsSortableActive", "active"], start: ["bsSortableStart", "start"], direction: ["bsSortableDirection", "direction"], bsArrowPosition: "bsArrowPosition", disableClear: ["matSortDisableClear", "disableClear"] }, outputs: { sortChange: "matSortChange" }, exportAs: ["pblBsSortable"], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridBsSortablePlugin, decorators: [{
            type: Directive,
            args: [{ selector: 'pbl-ngrid[bsSortable]', exportAs: 'pblBsSortable' }]
        }], ctorParameters: function () { return [{ type: i1.PblNgridComponent }, { type: i1.PblNgridPluginController }]; }, propDecorators: { active: [{
                type: Input,
                args: ['bsSortableActive']
            }], start: [{
                type: Input,
                args: ['bsSortableStart']
            }], direction: [{
                type: Input,
                args: ['bsSortableDirection']
            }], bsArrowPosition: [{
                type: Input
            }], disableClear: [{
                type: Input,
                args: ['matSortDisableClear']
            }], sortChange: [{
                type: Output,
                args: ['matSortChange']
            }] } });
function getSortDirectionCycle(start, disableClear) {
    let sortOrder = ['asc', 'desc'];
    if (start == 'desc') {
        sortOrder.reverse();
    }
    if (!disableClear) {
        sortOrder.push('');
    }
    return sortOrder;
}

class PblNgridBsSortable {
    constructor(cdRef, plugin) {
        this.plugin = plugin;
        merge(plugin.sortChange, plugin._stateChanges)
            .subscribe(() => {
            if (this._isSorted()) {
                this._updateArrowDirection();
            }
            cdRef.markForCheck();
        });
    }
    ngOnInit() {
        // Initialize the direction of the arrow and set the view state to be immediately that state.
        this._updateArrowDirection();
        this.plugin.register(this);
    }
    ngOnDestroy() {
        this.plugin.deregister(this);
        unrx.kill(this);
    }
    _handleClick() {
        if (!this._isDisabled()) {
            this._toggleOnInteraction();
        }
    }
    _updateArrowDirection() {
        this._direction = this._isSorted()
            ? this.plugin.direction
            : (this.start || this.plugin.start);
    }
    _isAfter() {
        return this.plugin.bsArrowPosition === 'after';
    }
    /** Whether this PblNgridBsSortable is currently sorted in either ascending or descending order. */
    _isSorted() {
        return this.plugin.active == this.id && (this.plugin.direction === 'asc' || this.plugin.direction === 'desc');
    }
    _isDisabled() {
        return this.plugin.bsSortableDisabled; //|| this.disabled;
    }
    /** Triggers the sort on this sort header and removes the indicator hint. */
    _toggleOnInteraction() {
        this.plugin.sort(this);
    }
}
/** @nocollapse */ PblNgridBsSortable.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridBsSortable, deps: [{ token: i0.ChangeDetectorRef }, { token: PblNgridBsSortablePlugin }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ PblNgridBsSortable.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridBsSortable, selector: "pbl-bs-sortable", host: { listeners: { "click": "_handleClick()" } }, ngImport: i0, template: "<div class=\"pbl-bs-sortable\"\n     [class.pbl-bs-sortable-after]=\"_isAfter()\"\n     [class.pbl-bs-sortable-sorted]=\"_isSorted()\"\n     [class.pbl-bs-sortable-disabled]=\"_isDisabled()\"\n     [class.asc]=\"_direction === 'asc'\"\n     [class.desc]=\"_direction === 'desc'\"\n     role=\"button\">\n\n  <ng-content></ng-content>\n</div>\n", styles: [".pbl-bs-sortable{cursor:pointer;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-user-select:none}.pbl-bs-sortable.pbl-bs-sortable-sorted{position:relative}.pbl-bs-sortable.pbl-bs-sortable-sorted:before{content:\"\";display:block;position:absolute;background:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAmxJREFUeAHtmksrRVEUx72fH8CIGQNJkpGUUmakDEiZSJRIZsRQmCkTJRmZmJgQE0kpX0D5DJKJgff7v+ru2u3O3vvc67TOvsdatdrnnP1Y///v7HvvubdbUiIhBISAEBACQkAICAEhIAQ4CXSh2DnyDfmCPEG2Iv9F9MPlM/LHyAecdyMzHYNwR3fdNK/OH9HXl1UCozD24TCvILxizEDWIEzA0FcM8woCgRrJCoS5PIwrANQSMAJX1LEI9bqpQo4JYNFFKRSvIgsxHDVnqZgIkPnNBM0rIGtYk9YOOsqgbgepRCfdbmFtqhFkVEDVPjJp0+Z6e6hRHhqBKgg6ZDCvYBygVmUoEGoh5JTRvIJwhJo1aUOoh4CLPMyvxxi7EWOMgnCGsXXI1GIXlZUYX7ucU+kbR8NW8lh3O7cue0Pk32MKndfUxQFAwxdirk3fHappAnc0oqDPzDfGTBrCfHP04dM4oTV8cxr0SVzH9FF07xD3ib6xCDE+M+aUcVygtWzzbtGX2rPBrEUYfecfQkaFzYi6HjVnGBdtL7epqAlc1+jRdAap74RrnPc4BCijttY2tRcdN0g17w7HqZrXhdJTYAuS3hd8z+vKgK3V1zWPae0mZDMykadBn1hTQBLnZNwVrJpSe/NwEeDsEwCctEOsJTsgxLvCqUl2ACftEGvJDgjxrnBqkh3ASTvEWrIDQrwrnJpkB3DSDrGW7IAQ7wqnJtkBnLRztejXXVu4+mxz/nQ9jR1w5VB86ejLTFcnnDwhzV+F6T+CHZlx6THSjn76eyyBIOPHyDakhBAQAkJACAgBISAEhIAQYCLwC8JxpAmsEGt6AAAAAElFTkSuQmCC\") no-repeat;background-size:22px;width:22px;height:22px;margin-left:-22px}.pbl-bs-sortable.pbl-bs-sortable-sorted.pbl-bs-sortable-after:before{right:0;transform:translateX(100%);-ms-transform:translateX(100%)}.pbl-bs-sortable.pbl-bs-sortable-sorted.desc:before{transform:rotate(180deg);-ms-transform:rotate(180deg)}.pbl-bs-sortable.pbl-bs-sortable-sorted.desc.pbl-bs-sortable-after:before{transform:translateX(100%) rotate(180deg);-ms-transform:translateX(100%) rotate(180deg)}"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridBsSortable, decorators: [{
            type: Component,
            args: [{
                    selector: 'pbl-bs-sortable',
                    templateUrl: './bs-sortable.component.html',
                    styleUrls: ['./bs-sortable.component.scss'],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: {
                        '(click)': '_handleClick()',
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: PblNgridBsSortablePlugin }]; } });

class PblBsSortableExtension extends PblNgridMultiComponentRegistry {
    constructor(cfr) {
        super();
        this.cfr = cfr;
        this.name = 'bsSortContainer';
        this.kind = 'dataHeaderExtensions';
        this.projectContent = true;
    }
    shouldRender(context) {
        return !!context.col.sort && !!context.injector.get(PblNgridBsSortablePlugin, false);
    }
    getFactory(context) {
        return this.cfr.resolveComponentFactory(PblNgridBsSortable);
    }
    onCreated(context, cmpRef) {
        // We assign the ID and also verify that it does not exist on the `MatSort` container
        // It might exists on specific scenarios when a header is removed and added instantly but the "add" part happens before the teardown so the `MatSort` will throw.
        this.deregisterId(context, cmpRef.instance.id = context.col.id);
        cmpRef.changeDetectorRef.markForCheck();
    }
    /**
     * Check that the current `MatSort` does not already have a sortable header with the provided id.
     */
    deregisterId(context, id) {
        const matSort = context.injector.get(PblNgridBsSortablePlugin);
        const matSortHeader = matSort.sortables.get(id);
        if (matSortHeader) {
            matSort.deregister(matSortHeader);
        }
    }
}

class PblNgridBsSortableModule {
    constructor(registry, cfr) {
        this.registry = registry;
        registry.addMulti('dataHeaderExtensions', new PblBsSortableExtension(cfr));
    }
}
PblNgridBsSortableModule.NGRID_PLUGIN = ngridPlugin({ id: PLUGIN_KEY }, PblNgridBsSortablePlugin);
/** @nocollapse */ PblNgridBsSortableModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridBsSortableModule, deps: [{ token: i1.PblNgridRegistryService }, { token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ PblNgridBsSortableModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridBsSortableModule, declarations: [PblNgridBsSortablePlugin, PblNgridBsSortable], imports: [CommonModule, PblNgridModule], exports: [PblNgridBsSortablePlugin, PblNgridBsSortable] });
/** @nocollapse */ PblNgridBsSortableModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridBsSortableModule, imports: [[CommonModule, PblNgridModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridBsSortableModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, PblNgridModule],
                    declarations: [PblNgridBsSortablePlugin, PblNgridBsSortable],
                    exports: [PblNgridBsSortablePlugin, PblNgridBsSortable],
                    // TODO(REFACTOR_REF 2): remove when ViewEngine is no longer supported by angular (V12 ???)
                    entryComponents: [PblNgridBsSortable],
                }]
        }], ctorParameters: function () { return [{ type: i1.PblNgridRegistryService }, { type: i0.ComponentFactoryResolver }]; } });

/**
 * Generated bundle index. Do not edit.
 */

export { PblNgridBsSortable, PblNgridBsSortableModule, PblNgridBsSortablePlugin };
//# sourceMappingURL=pebula-ngrid-bootstrap-sort.js.map
