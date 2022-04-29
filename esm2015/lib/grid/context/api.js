import { BehaviorSubject, Subject, asapScheduler } from 'rxjs';
import { debounceTime, buffer, map, filter, take } from 'rxjs/operators';
import { ON_DESTROY, removeFromArray } from '@pebula/ngrid/core';
import { findRowRenderedIndex, resolveCellReference } from './utils';
import { PblRowContext } from './row';
import { PblCellContext } from './cell';
export class ContextApi {
    constructor(extApi) {
        this.extApi = extApi;
        this.viewCache = new Map();
        this.viewCacheGhost = new Set();
        this.cache = new Map();
        this.activeSelected = [];
        this.focusChanged$ = new BehaviorSubject({ prev: undefined, curr: undefined });
        this.selectionChanged$ = new Subject();
        /**
         * Notify when the focus has changed.
         *
         * > Note that the notification is not immediate, it will occur on the closest micro-task after the change.
         */
        this.focusChanged = this.focusChanged$.pipe(buffer(this.focusChanged$.pipe(debounceTime(0, asapScheduler))), map((events) => { var _a, _b; return ({ prev: (_a = events[0]) === null || _a === void 0 ? void 0 : _a.prev, curr: (_b = events[events.length - 1]) === null || _b === void 0 ? void 0 : _b.curr }); }));
        /**
         * Notify when the selected cells has changed.
         */
        this.selectionChanged = this.selectionChanged$.asObservable();
        this.columnApi = extApi.columnApi;
        extApi.events
            .pipe(filter((e) => e.kind === 'onDataSource'), take(1))
            .subscribe(() => {
            this.vcRef = extApi.cdkTable._rowOutlet.viewContainer;
            this.syncViewAndContext();
            extApi.cdkTable.onRenderRows.subscribe(() => this.syncViewAndContext());
        });
        extApi.events.pipe(ON_DESTROY).subscribe((e) => this.destroy());
    }
    /**
     * The reference to currently focused cell context.
     * You can retrieve the actual context or context cell using `findRowInView` and / or `findRowInCache`.
     *
     * > Note that when virtual scroll is enabled the currently focused cell does not have to exist in the view.
     * If this is the case `findRowInView` will return undefined, use `findRowInCache` instead.
     */
    get focusedCell() {
        return this.activeFocused ? Object.assign({}, this.activeFocused) : undefined;
    }
    /**
     * The reference to currently selected range of cell's context.
     * You can retrieve the actual context or context cell using `findRowInView` and / or `findRowInCache`.
     *
     * > Note that when virtual scroll is enabled the currently selected cells does not have to exist in the view.
     * If this is the case `findRowInView` will return undefined, use `findRowInCache` instead.
     */
    get selectedCells() {
        return this.activeSelected.slice();
    }
    /**
     * Focus the provided cell.
     * If a cell is not provided will un-focus (blur) the currently focused cell (if there is one).
     * @param cellRef A Reference to the cell
     */
    focusCell(cellRef) {
        if (!cellRef) {
            if (this.activeFocused) {
                const { rowIdent, colIndex } = this.activeFocused;
                this.activeFocused = undefined;
                this.updateState(rowIdent, colIndex, { focused: false });
                this.emitFocusChanged(this.activeFocused);
                const rowContext = this.findRowInView(rowIdent);
                if (rowContext) {
                    this.extApi.grid.rowsApi.syncRows('data', rowContext.index);
                }
            }
        }
        else {
            const ref = resolveCellReference(cellRef, this);
            if (ref) {
                this.focusCell();
                if (ref instanceof PblCellContext) {
                    if (!ref.focused && !this.extApi.grid.viewport.isScrolling) {
                        this.updateState(ref.rowContext.identity, ref.index, { focused: true });
                        this.activeFocused = { rowIdent: ref.rowContext.identity, colIndex: ref.index };
                        this.selectCells([this.activeFocused], true);
                        this.extApi.grid.rowsApi.syncRows('data', ref.rowContext.index);
                    }
                }
                else {
                    this.updateState(ref[0].identity, ref[1], { focused: true });
                    this.activeFocused = { rowIdent: ref[0].identity, colIndex: ref[1] };
                }
                this.emitFocusChanged(this.activeFocused);
            }
        }
    }
    /**
     * Select all provided cells.
     * @param cellRef A Reference to the cell
     * @param clearCurrent Clear the current selection before applying the new selection.
     * Default to false (add to current).
     */
    selectCells(cellRefs, clearCurrent) {
        const toMarkRendered = new Set();
        if (clearCurrent) {
            this.unselectCells();
        }
        const added = [];
        for (const cellRef of cellRefs) {
            const ref = resolveCellReference(cellRef, this);
            if (ref instanceof PblCellContext) {
                if (!ref.selected && !this.extApi.grid.viewport.isScrolling) {
                    const rowIdent = ref.rowContext.identity;
                    const colIndex = ref.index;
                    this.updateState(rowIdent, colIndex, { selected: true });
                    const dataPoint = { rowIdent, colIndex };
                    this.activeSelected.push(dataPoint);
                    added.push(dataPoint);
                    toMarkRendered.add(ref.rowContext.index);
                }
            }
            else if (ref) {
                const [rowState, colIndex] = ref;
                if (!rowState.cells[colIndex].selected) {
                    this.updateState(rowState.identity, colIndex, { selected: true });
                    this.activeSelected.push({ rowIdent: rowState.identity, colIndex });
                }
            }
        }
        if (toMarkRendered.size > 0) {
            this.extApi.grid.rowsApi.syncRows('data', ...Array.from(toMarkRendered.values()));
        }
        this.selectionChanged$.next({ added, removed: [] });
    }
    /**
     * Unselect all provided cells.
     * If cells are not provided will un-select all currently selected cells.
     * @param cellRef A Reference to the cell
     */
    unselectCells(cellRefs) {
        const toMarkRendered = new Set();
        let toUnselect = this.activeSelected;
        let removeAll = true;
        if (Array.isArray(cellRefs)) {
            toUnselect = cellRefs;
            removeAll = false;
        }
        else {
            this.activeSelected = [];
        }
        const removed = [];
        for (const cellRef of toUnselect) {
            const ref = resolveCellReference(cellRef, this);
            if (ref instanceof PblCellContext) {
                if (ref.selected) {
                    const rowIdent = ref.rowContext.identity;
                    const colIndex = ref.index;
                    this.updateState(rowIdent, colIndex, { selected: false });
                    if (!removeAll) {
                        const wasRemoved = removeFromArray(this.activeSelected, (item) => item.colIndex === colIndex && item.rowIdent === rowIdent);
                        if (wasRemoved) {
                            removed.push({ rowIdent, colIndex });
                        }
                    }
                    toMarkRendered.add(ref.rowContext.index);
                }
            }
            else if (ref) {
                const [rowState, colIndex] = ref;
                if (rowState.cells[colIndex].selected) {
                    this.updateState(rowState.identity, colIndex, { selected: false });
                    if (!removeAll) {
                        const wasRemoved = removeFromArray(this.activeSelected, (item) => item.colIndex === colIndex && item.rowIdent === rowState.identity);
                        if (wasRemoved) {
                            removed.push({ rowIdent: rowState.identity, colIndex });
                        }
                    }
                }
            }
        }
        if (toMarkRendered.size > 0) {
            this.extApi.grid.rowsApi.syncRows('data', ...Array.from(toMarkRendered.values()));
        }
        this.selectionChanged$.next({ added: [], removed });
    }
    /**
     * Clears the entire context, including view cache and memory cache (rows out of view)
     * @param syncView If true will sync the view and the context right after clearing which will ensure the view cache is hot and synced with the actual rendered rows
     * Some plugins will expect a row to have a context so this might be required.
     * The view and context are synced every time rows are rendered so make sure you set this to true only when you know there is no rendering call coming down the pipe.
     */
    clear(syncView) {
        this.viewCache.clear();
        this.viewCacheGhost.clear();
        this.cache.clear();
        if (syncView === true) {
            for (const r of this.extApi.rowsApi.dataRows()) {
                this.viewCache.set(r.rowIndex, r.context);
                // we're clearing the existing view state on the component
                // If in the future we want to update state and not clear, remove this one
                // and instead just take the state and put it in the cache.
                // e.g. if on column swap we want to swap cells in the context...
                r.context.fromState(this.getCreateState(r.context));
                this.syncViewAndContext();
            }
        }
    }
    saveState(context) {
        if (context instanceof PblRowContext) {
            this.cache.set(context.identity, context.getState());
        }
    }
    getRow(row) {
        const index = typeof row === 'number' ? row : findRowRenderedIndex(row);
        return this.rowContext(index);
    }
    getCell(rowOrCellElement, col) {
        if (typeof rowOrCellElement === 'number') {
            const rowContext = this.rowContext(rowOrCellElement);
            if (rowContext) {
                return rowContext.cell(col);
            }
        }
        else {
            const ref = resolveCellReference(rowOrCellElement, this);
            if (ref instanceof PblCellContext) {
                return ref;
            }
        }
    }
    getDataItem(cell) {
        const ref = resolveCellReference(cell, this);
        if (ref instanceof PblCellContext) {
            return ref.col.getValue(ref.rowContext.$implicit);
        }
        else if (ref) {
            const row = this.extApi.grid.ds.source[ref[0].dsIndex];
            const column = this.extApi.grid.columnApi.findColumnAt(ref[1]);
            return column.getValue(row);
        }
    }
    createCellContext(renderRowIndex, column) {
        const rowContext = this.rowContext(renderRowIndex);
        const colIndex = this.columnApi.indexOf(column);
        return rowContext.cell(colIndex);
    }
    rowContext(renderRowIndex) {
        return this.viewCache.get(renderRowIndex);
    }
    updateState(rowIdentity, rowStateOrCellIndex, cellState) {
        const currentRowState = this.cache.get(rowIdentity);
        if (currentRowState) {
            if (typeof rowStateOrCellIndex === 'number') {
                const currentCellState = currentRowState.cells[rowStateOrCellIndex];
                if (currentCellState) {
                    Object.assign(currentCellState, cellState);
                }
            }
            else {
                Object.assign(currentRowState, rowStateOrCellIndex);
            }
            const rowContext = this.findRowInView(rowIdentity);
            if (rowContext) {
                rowContext.fromState(currentRowState);
            }
        }
    }
    /**
     * Try to find a specific row, using the row identity, in the current view.
     * If the row is not in the view (or even not in the cache) it will return undefined, otherwise returns the row's context instance (`PblRowContext`)
     * @param rowIdentity The row's identity. If a specific identity is used, please provide it otherwise provide the index of the row in the datasource.
     */
    findRowInView(rowIdentity) {
        const rowState = this.cache.get(rowIdentity);
        if (rowState) {
            const renderRowIndex = rowState.dsIndex - this.extApi.grid.ds.renderStart;
            const rowContext = this.viewCache.get(renderRowIndex);
            if (rowContext && rowContext.identity === rowIdentity) {
                return rowContext;
            }
        }
    }
    findRowInCache(rowIdentity, offset, create) {
        const rowState = this.cache.get(rowIdentity);
        if (!offset) {
            return rowState;
        }
        else {
            const dsIndex = rowState.dsIndex + offset;
            const identity = this.getRowIdentity(dsIndex);
            if (identity !== null) {
                let result = this.findRowInCache(identity);
                if (!result && create && dsIndex < this.extApi.grid.ds.length) {
                    result = PblRowContext.defaultState(identity, dsIndex, this.columnApi.columns.length);
                    this.cache.set(identity, result);
                }
                return result;
            }
        }
    }
    getRowIdentity(dsIndex, rowData) {
        const { ds } = this.extApi.grid;
        const { primary } = this.extApi.columnStore;
        const row = rowData || ds.source[dsIndex];
        if (!row) {
            return null;
        }
        else {
            return primary ? primary.getValue(row) : dsIndex;
        }
    }
    /** @internal */
    _createRowContext(data, renderRowIndex) {
        const context = new PblRowContext(data, this.extApi.grid.ds.renderStart + renderRowIndex, this.extApi);
        context.fromState(this.getCreateState(context));
        this.addToViewCache(renderRowIndex, context);
        return context;
    }
    _updateRowContext(rowContext, renderRowIndex) {
        const dsIndex = this.extApi.grid.ds.renderStart + renderRowIndex;
        const identity = this.getRowIdentity(dsIndex, rowContext.$implicit);
        if (rowContext.identity !== identity) {
            rowContext.saveState();
            rowContext.dsIndex = dsIndex;
            rowContext.identity = identity;
            rowContext.fromState(this.getCreateState(rowContext));
            this.addToViewCache(renderRowIndex, rowContext);
        }
    }
    addToViewCache(rowIndex, rowContext) {
        this.viewCache.set(rowIndex, rowContext);
        this.viewCacheGhost.delete(rowContext.identity);
    }
    getCreateState(context) {
        let state = this.cache.get(context.identity);
        if (!state) {
            state = PblRowContext.defaultState(context.identity, context.dsIndex, this.columnApi.columns.length);
            this.cache.set(context.identity, state);
        }
        return state;
    }
    emitFocusChanged(curr) {
        this.focusChanged$.next({
            prev: this.focusChanged$.value.curr,
            curr
        });
    }
    destroy() {
        this.focusChanged$.complete();
        this.selectionChanged$.complete();
    }
    syncViewAndContext() {
        this.viewCacheGhost.forEach((ident) => {
            if (!this.findRowInView(ident)) {
                this.cache.get(ident).firstRender = false;
            }
        });
        this.viewCacheGhost = new Set(Array.from(this.viewCache.values())
            .filter((v) => v.firstRender)
            .map((v) => v.identity));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3JpZC9zcmMvbGliL2dyaWQvY29udGV4dC9hcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQWMsYUFBYSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHekUsT0FBTyxFQUFFLFVBQVUsRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQWNqRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDckUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUN0QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBRXhDLE1BQU0sT0FBTyxVQUFVO0lBaURyQixZQUFvQixNQUF1QztRQUF2QyxXQUFNLEdBQU4sTUFBTSxDQUFpQztRQWhEbkQsY0FBUyxHQUFHLElBQUksR0FBRyxFQUE0QixDQUFDO1FBQ2hELG1CQUFjLEdBQUcsSUFBSSxHQUFHLEVBQU8sQ0FBQztRQUNoQyxVQUFLLEdBQUcsSUFBSSxHQUFHLEVBQTJCLENBQUM7UUFLM0MsbUJBQWMsR0FBb0IsRUFBRSxDQUFDO1FBQ3JDLGtCQUFhLEdBQUcsSUFBSSxlQUFlLENBQTRCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztRQUNyRyxzQkFBaUIsR0FBRyxJQUFJLE9BQU8sRUFBaUMsQ0FBQztRQUV6RTs7OztXQUlHO1FBQ00saUJBQVksR0FBMEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ3BGLE1BQU0sQ0FBNEIsSUFBSSxDQUFDLGFBQWEsQ0FB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SixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFN1YmplY3QsIE9ic2VydmFibGUsIGFzYXBTY2hlZHVsZXIgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgYnVmZmVyLCBtYXAsIGZpbHRlciwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgT05fREVTVFJPWSwgcmVtb3ZlRnJvbUFycmF5IH0gZnJvbSAnQHBlYnVsYS9uZ3JpZC9jb3JlJztcbmltcG9ydCB7IFBibE5ncmlkSW50ZXJuYWxFeHRlbnNpb25BcGkgfSBmcm9tICcuLi8uLi9leHQvZ3JpZC1leHQtYXBpJztcbmltcG9ydCB7IFBibENvbHVtbiB9IGZyb20gJy4uL2NvbHVtbi9tb2RlbCc7XG5pbXBvcnQgeyBDb2x1bW5BcGkgfSBmcm9tICcuLi9jb2x1bW4vbWFuYWdlbWVudCc7XG5pbXBvcnQge1xuICBSb3dDb250ZXh0U3RhdGUsXG4gIENlbGxDb250ZXh0U3RhdGUsXG4gIFBibE5ncmlkQ2VsbENvbnRleHQsXG4gIFBibE5ncmlkUm93Q29udGV4dCxcbiAgQ2VsbFJlZmVyZW5jZSxcbiAgR3JpZERhdGFQb2ludCxcbiAgUGJsTmdyaWRGb2N1c0NoYW5nZWRFdmVudCxcbiAgUGJsTmdyaWRTZWxlY3Rpb25DaGFuZ2VkRXZlbnRcbn0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBmaW5kUm93UmVuZGVyZWRJbmRleCwgcmVzb2x2ZUNlbGxSZWZlcmVuY2UgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7IFBibFJvd0NvbnRleHQgfSBmcm9tICcuL3Jvdyc7XG5pbXBvcnQgeyBQYmxDZWxsQ29udGV4dCB9IGZyb20gJy4vY2VsbCc7XG5cbmV4cG9ydCBjbGFzcyBDb250ZXh0QXBpPFQgPSBhbnk+IHtcbiAgcHJpdmF0ZSB2aWV3Q2FjaGUgPSBuZXcgTWFwPG51bWJlciwgUGJsUm93Q29udGV4dDxUPj4oKTtcbiAgcHJpdmF0ZSB2aWV3Q2FjaGVHaG9zdCA9IG5ldyBTZXQ8YW55PigpO1xuICBwcml2YXRlIGNhY2hlID0gbmV3IE1hcDxhbnksIFJvd0NvbnRleHRTdGF0ZTxUPj4oKTtcbiAgcHJpdmF0ZSB2Y1JlZjogVmlld0NvbnRhaW5lclJlZjtcbiAgcHJpdmF0ZSBjb2x1bW5BcGk6IENvbHVtbkFwaTxUPjtcblxuICBwcml2YXRlIGFjdGl2ZUZvY3VzZWQ6IEdyaWREYXRhUG9pbnQ7XG4gIHByaXZhdGUgYWN0aXZlU2VsZWN0ZWQ6IEdyaWREYXRhUG9pbnRbXSA9IFtdO1xuICBwcml2YXRlIGZvY3VzQ2hhbmdlZCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFBibE5ncmlkRm9jdXNDaGFuZ2VkRXZlbnQ+KHsgcHJldjogdW5kZWZpbmVkLCBjdXJyOiB1bmRlZmluZWQgfSk7XG4gIHByaXZhdGUgc2VsZWN0aW9uQ2hhbmdlZCQgPSBuZXcgU3ViamVjdDxQYmxOZ3JpZFNlbGVjdGlvbkNoYW5nZWRFdmVudD4oKTtcblxuICAvKipcbiAgICogTm90aWZ5IHdoZW4gdGhlIGZvY3VzIGhhcyBjaGFuZ2VkLlxuICAgKlxuICAgKiA+IE5vdGUgdGhhdCB0aGUgbm90aWZpY2F0aW9uIGlzIG5vdCBpbW1lZGlhdGUsIGl0IHdpbGwgb2NjdXIgb24gdGhlIGNsb3Nlc3QgbWljcm8tdGFzayBhZnRlciB0aGUgY2hhbmdlLlxuICAgKi9cbiAgcmVhZG9ubHkgZm9jdXNDaGFuZ2VkOiBPYnNlcnZhYmxlPFBibE5ncmlkRm9jdXNDaGFuZ2VkRXZlbnQ+ID0gdGhpcy5mb2N1c0NoYW5nZWQkLnBpcGUoXG4gICAgYnVmZmVyPFBibE5ncmlkRm9jdXNDaGFuZ2VkRXZlbnQ+KHRoaXMuZm9jdXNDaGFuZ2VkJC5waXBlKGRlYm91bmNlVGltZSgwLCBhc2FwU2NoZWR1bGVyKSkpLFxuICAgIG1hcCgoZXZlbnRzKSA9PiAoeyBwcmV2OiBldmVudHNbMF0/LnByZXYsIGN1cnI6IGV2ZW50c1tldmVudHMubGVuZ3RoIC0gMV0/LmN1cnIgfSkpXG4gICk7XG5cbiAgLyoqXG4gICAqIE5vdGlmeSB3aGVuIHRoZSBzZWxlY3RlZCBjZWxscyBoYXMgY2hhbmdlZC5cbiAgICovXG4gIHJlYWRvbmx5IHNlbGVjdGlvbkNoYW5nZWQ6IE9ic2VydmFibGU8UGJsTmdyaWRTZWxlY3Rpb25DaGFuZ2VkRXZlbnQ+ID0gdGhpcy5zZWxlY3Rpb25DaGFuZ2VkJC5hc09ic2VydmFibGUoKTtcblxuICAvKipcbiAgICogVGhlIHJlZmVyZW5jZSB0byBjdXJyZW50bHkgZm9jdXNlZCBjZWxsIGNvbnRleHQuXG4gICAqIFlvdSBjYW4gcmV0cmlldmUgdGhlIGFjdHVhbCBjb250ZXh0IG9yIGNvbnRleHQgY2VsbCB1c2luZyBgZmluZFJvd0luVmlld2AgYW5kIC8gb3IgYGZpbmRSb3dJbkNhY2hlYC5cbiAgICpcbiAgICogPiBOb3RlIHRoYXQgd2hlbiB2aXJ0dWFsIHNjcm9sbCBpcyBlbmFibGVkIHRoZSBjdXJyZW50bHkgZm9jdXNlZCBjZWxsIGRvZXMgbm90IGhhdmUgdG8gZXhpc3QgaW4gdGhlIHZpZXcuXG4gICAqIElmIHRoaXMgaXMgdGhlIGNhc2UgYGZpbmRSb3dJblZpZXdgIHdpbGwgcmV0dXJuIHVuZGVmaW5lZCwgdXNlIGBmaW5kUm93SW5DYWNoZWAgaW5zdGVhZC5cbiAgICovXG4gIGdldCBmb2N1c2VkQ2VsbCgpOiBHcmlkRGF0YVBvaW50IHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5hY3RpdmVGb2N1c2VkID8geyAuLi50aGlzLmFjdGl2ZUZvY3VzZWQgfSA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgcmVmZXJlbmNlIHRvIGN1cnJlbnRseSBzZWxlY3RlZCByYW5nZSBvZiBjZWxsJ3MgY29udGV4dC5cbiAgICogWW91IGNhbiByZXRyaWV2ZSB0aGUgYWN0dWFsIGNvbnRleHQgb3IgY29udGV4dCBjZWxsIHVzaW5nIGBmaW5kUm93SW5WaWV3YCBhbmQgLyBvciBgZmluZFJvd0luQ2FjaGVgLlxuICAgKlxuICAgKiA+IE5vdGUgdGhhdCB3aGVuIHZpcnR1YWwgc2Nyb2xsIGlzIGVuYWJsZWQgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBjZWxscyBkb2VzIG5vdCBoYXZlIHRvIGV4aXN0IGluIHRoZSB2aWV3LlxuICAgKiBJZiB0aGlzIGlzIHRoZSBjYXNlIGBmaW5kUm93SW5WaWV3YCB3aWxsIHJldHVybiB1bmRlZmluZWQsIHVzZSBgZmluZFJvd0luQ2FjaGVgIGluc3RlYWQuXG4gICAqL1xuICBnZXQgc2VsZWN0ZWRDZWxscygpOiBHcmlkRGF0YVBvaW50W10ge1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZVNlbGVjdGVkLnNsaWNlKCk7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGV4dEFwaTogUGJsTmdyaWRJbnRlcm5hbEV4dGVuc2lvbkFwaTxUPikge1xuICAgIHRoaXMuY29sdW1uQXBpID0gZXh0QXBpLmNvbHVtbkFwaTtcbiAgICBleHRBcGkuZXZlbnRzXG4gICAgICAucGlwZShcbiAgICAgICAgZmlsdGVyKChlKSA9PiBlLmtpbmQgPT09ICdvbkRhdGFTb3VyY2UnKSxcbiAgICAgICAgdGFrZSgxKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMudmNSZWYgPSBleHRBcGkuY2RrVGFibGUuX3Jvd091dGxldC52aWV3Q29udGFpbmVyO1xuICAgICAgICB0aGlzLnN5bmNWaWV3QW5kQ29udGV4dCgpO1xuICAgICAgICBleHRBcGkuY2RrVGFibGUub25SZW5kZXJSb3dzLnN1YnNjcmliZSgoKSA9PiB0aGlzLnN5bmNWaWV3QW5kQ29udGV4dCgpKTtcbiAgICAgIH0pO1xuXG4gICAgZXh0QXBpLmV2ZW50cy5waXBlKE9OX0RFU1RST1kpLnN1YnNjcmliZSgoZSkgPT4gdGhpcy5kZXN0cm95KCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvY3VzIHRoZSBwcm92aWRlZCBjZWxsLlxuICAgKiBJZiBhIGNlbGwgaXMgbm90IHByb3ZpZGVkIHdpbGwgdW4tZm9jdXMgKGJsdXIpIHRoZSBjdXJyZW50bHkgZm9jdXNlZCBjZWxsIChpZiB0aGVyZSBpcyBvbmUpLlxuICAgKiBAcGFyYW0gY2VsbFJlZiBBIFJlZmVyZW5jZSB0byB0aGUgY2VsbFxuICAgKi9cbiAgZm9jdXNDZWxsKGNlbGxSZWY/OiBDZWxsUmVmZXJlbmNlKTogdm9pZCB7XG4gICAgaWYgKCFjZWxsUmVmKSB7XG4gICAgICBpZiAodGhpcy5hY3RpdmVGb2N1c2VkKSB7XG4gICAgICAgIGNvbnN0IHsgcm93SWRlbnQsIGNvbEluZGV4IH0gPSB0aGlzLmFjdGl2ZUZvY3VzZWQ7XG4gICAgICAgIHRoaXMuYWN0aXZlRm9jdXNlZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0ZShyb3dJZGVudCwgY29sSW5kZXgsIHsgZm9jdXNlZDogZmFsc2UgfSk7XG4gICAgICAgIHRoaXMuZW1pdEZvY3VzQ2hhbmdlZCh0aGlzLmFjdGl2ZUZvY3VzZWQpO1xuICAgICAgICBjb25zdCByb3dDb250ZXh0ID0gdGhpcy5maW5kUm93SW5WaWV3KHJvd0lkZW50KTtcbiAgICAgICAgaWYgKHJvd0NvbnRleHQpIHtcbiAgICAgICAgICB0aGlzLmV4dEFwaS5ncmlkLnJvd3NBcGkuc3luY1Jvd3MoJ2RhdGEnLCByb3dDb250ZXh0LmluZGV4KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCByZWYgPSByZXNvbHZlQ2VsbFJlZmVyZW5jZShjZWxsUmVmLCB0aGlzIGFzIGFueSk7XG4gICAgICBpZiAocmVmKSB7XG4gICAgICAgIHRoaXMuZm9jdXNDZWxsKCk7XG4gICAgICAgIGlmIChyZWYgaW5zdGFuY2VvZiBQYmxDZWxsQ29udGV4dCkge1xuICAgICAgICAgIGlmICghcmVmLmZvY3VzZWQgJiYgIXRoaXMuZXh0QXBpLmdyaWQudmlld3BvcnQuaXNTY3JvbGxpbmcpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU3RhdGUocmVmLnJvd0NvbnRleHQuaWRlbnRpdHksIHJlZi5pbmRleCwgeyBmb2N1c2VkOiB0cnVlIH0pO1xuXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUZvY3VzZWQgPSB7IHJvd0lkZW50OiByZWYucm93Q29udGV4dC5pZGVudGl0eSwgY29sSW5kZXg6IHJlZi5pbmRleCB9O1xuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdENlbGxzKFt0aGlzLmFjdGl2ZUZvY3VzZWRdLCB0cnVlKTtcblxuICAgICAgICAgICAgdGhpcy5leHRBcGkuZ3JpZC5yb3dzQXBpLnN5bmNSb3dzKCdkYXRhJywgcmVmLnJvd0NvbnRleHQuaW5kZXgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlKHJlZlswXS5pZGVudGl0eSwgcmVmWzFdLCB7IGZvY3VzZWQ6IHRydWUgfSk7XG4gICAgICAgICAgdGhpcy5hY3RpdmVGb2N1c2VkID0geyByb3dJZGVudDogcmVmWzBdLmlkZW50aXR5LCBjb2xJbmRleDogcmVmWzFdIH07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbWl0Rm9jdXNDaGFuZ2VkKHRoaXMuYWN0aXZlRm9jdXNlZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdCBhbGwgcHJvdmlkZWQgY2VsbHMuXG4gICAqIEBwYXJhbSBjZWxsUmVmIEEgUmVmZXJlbmNlIHRvIHRoZSBjZWxsXG4gICAqIEBwYXJhbSBjbGVhckN1cnJlbnQgQ2xlYXIgdGhlIGN1cnJlbnQgc2VsZWN0aW9uIGJlZm9yZSBhcHBseWluZyB0aGUgbmV3IHNlbGVjdGlvbi5cbiAgICogRGVmYXVsdCB0byBmYWxzZSAoYWRkIHRvIGN1cnJlbnQpLlxuICAgKi9cbiAgc2VsZWN0Q2VsbHMoY2VsbFJlZnM6IENlbGxSZWZlcmVuY2VbXSwgY2xlYXJDdXJyZW50PzogYm9vbGVhbik6IHZvaWQge1xuICAgIGNvbnN0IHRvTWFya1JlbmRlcmVkID0gbmV3IFNldDxudW1iZXI+KCk7XG5cbiAgICBpZiAoY2xlYXJDdXJyZW50KSB7XG4gICAgICB0aGlzLnVuc2VsZWN0Q2VsbHMoKTtcbiAgICB9XG5cbiAgICBjb25zdCBhZGRlZDogR3JpZERhdGFQb2ludFtdID0gW107XG5cbiAgICBmb3IgKGNvbnN0IGNlbGxSZWYgb2YgY2VsbFJlZnMpIHtcbiAgICAgIGNvbnN0IHJlZiA9IHJlc29sdmVDZWxsUmVmZXJlbmNlKGNlbGxSZWYsIHRoaXMgYXMgYW55KTtcbiAgICAgIGlmIChyZWYgaW5zdGFuY2VvZiBQYmxDZWxsQ29udGV4dCkge1xuICAgICAgICBpZiAoIXJlZi5zZWxlY3RlZCAmJiAhdGhpcy5leHRBcGkuZ3JpZC52aWV3cG9ydC5pc1Njcm9sbGluZykge1xuICAgICAgICAgIGNvbnN0IHJvd0lkZW50ID0gcmVmLnJvd0NvbnRleHQuaWRlbnRpdHk7XG4gICAgICAgICAgY29uc3QgY29sSW5kZXggPSByZWYuaW5kZXg7XG4gICAgICAgICAgdGhpcy51cGRhdGVTdGF0ZShyb3dJZGVudCwgY29sSW5kZXgsIHsgc2VsZWN0ZWQ6IHRydWUgfSk7XG5cbiAgICAgICAgICBjb25zdCBkYXRhUG9pbnQgPSB7IHJvd0lkZW50LCBjb2xJbmRleCB9O1xuICAgICAgICAgIHRoaXMuYWN0aXZlU2VsZWN0ZWQucHVzaChkYXRhUG9pbnQpO1xuICAgICAgICAgIGFkZGVkLnB1c2goZGF0YVBvaW50KTtcblxuICAgICAgICAgIHRvTWFya1JlbmRlcmVkLmFkZChyZWYucm93Q29udGV4dC5pbmRleCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocmVmKSB7XG4gICAgICAgIGNvbnN0IFtyb3dTdGF0ZSwgY29sSW5kZXhdID0gcmVmO1xuICAgICAgICBpZiAoIXJvd1N0YXRlLmNlbGxzW2NvbEluZGV4XS5zZWxlY3RlZCkge1xuICAgICAgICAgIHRoaXMudXBkYXRlU3RhdGUocm93U3RhdGUuaWRlbnRpdHksIGNvbEluZGV4LCB7IHNlbGVjdGVkOiB0cnVlIH0pO1xuICAgICAgICAgIHRoaXMuYWN0aXZlU2VsZWN0ZWQucHVzaCh7IHJvd0lkZW50OiByb3dTdGF0ZS5pZGVudGl0eSwgY29sSW5kZXggfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodG9NYXJrUmVuZGVyZWQuc2l6ZSA+IDApIHtcbiAgICAgIHRoaXMuZXh0QXBpLmdyaWQucm93c0FwaS5zeW5jUm93cygnZGF0YScsIC4uLkFycmF5LmZyb20odG9NYXJrUmVuZGVyZWQudmFsdWVzKCkpKTtcbiAgICB9XG5cbiAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZWQkLm5leHQoeyBhZGRlZCwgcmVtb3ZlZDogW10gfSk7XG4gIH1cblxuICAvKipcbiAgICogVW5zZWxlY3QgYWxsIHByb3ZpZGVkIGNlbGxzLlxuICAgKiBJZiBjZWxscyBhcmUgbm90IHByb3ZpZGVkIHdpbGwgdW4tc2VsZWN0IGFsbCBjdXJyZW50bHkgc2VsZWN0ZWQgY2VsbHMuXG4gICAqIEBwYXJhbSBjZWxsUmVmIEEgUmVmZXJlbmNlIHRvIHRoZSBjZWxsXG4gICAqL1xuICB1bnNlbGVjdENlbGxzKGNlbGxSZWZzPzogQ2VsbFJlZmVyZW5jZVtdKTogdm9pZCB7XG4gICAgY29uc3QgdG9NYXJrUmVuZGVyZWQgPSBuZXcgU2V0PG51bWJlcj4oKTtcbiAgICBsZXQgdG9VbnNlbGVjdDogQ2VsbFJlZmVyZW5jZVtdID0gdGhpcy5hY3RpdmVTZWxlY3RlZDtcbiAgICBsZXQgcmVtb3ZlQWxsID0gdHJ1ZTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KGNlbGxSZWZzKSkge1xuICAgICAgdG9VbnNlbGVjdCA9IGNlbGxSZWZzO1xuICAgICAgcmVtb3ZlQWxsID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWN0aXZlU2VsZWN0ZWQgPSBbXTtcbiAgICB9XG5cbiAgICBjb25zdCByZW1vdmVkOiBHcmlkRGF0YVBvaW50W10gPSBbXTtcblxuICAgIGZvciAoY29uc3QgY2VsbFJlZiBvZiB0b1Vuc2VsZWN0KSB7XG4gICAgICBjb25zdCByZWYgPSByZXNvbHZlQ2VsbFJlZmVyZW5jZShjZWxsUmVmLCB0aGlzIGFzIGFueSk7XG4gICAgICBpZiAocmVmIGluc3RhbmNlb2YgUGJsQ2VsbENvbnRleHQpIHtcbiAgICAgICAgaWYgKHJlZi5zZWxlY3RlZCkge1xuICAgICAgICAgIGNvbnN0IHJvd0lkZW50ID0gcmVmLnJvd0NvbnRleHQuaWRlbnRpdHk7XG4gICAgICAgICAgY29uc3QgY29sSW5kZXggPSByZWYuaW5kZXg7XG4gICAgICAgICAgdGhpcy51cGRhdGVTdGF0ZShyb3dJZGVudCwgY29sSW5kZXgsIHsgc2VsZWN0ZWQ6IGZhbHNlIH0pO1xuICAgICAgICAgIGlmICghcmVtb3ZlQWxsKSB7XG4gICAgICAgICAgICBjb25zdCB3YXNSZW1vdmVkID0gcmVtb3ZlRnJvbUFycmF5KFxuICAgICAgICAgICAgICB0aGlzLmFjdGl2ZVNlbGVjdGVkLFxuICAgICAgICAgICAgICAoaXRlbSkgPT4gaXRlbS5jb2xJbmRleCA9PT0gY29sSW5kZXggJiYgaXRlbS5yb3dJZGVudCA9PT0gcm93SWRlbnRcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAod2FzUmVtb3ZlZCkge1xuICAgICAgICAgICAgICByZW1vdmVkLnB1c2goeyByb3dJZGVudCwgY29sSW5kZXggfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHRvTWFya1JlbmRlcmVkLmFkZChyZWYucm93Q29udGV4dC5pbmRleCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocmVmKSB7XG4gICAgICAgIGNvbnN0IFtyb3dTdGF0ZSwgY29sSW5kZXhdID0gcmVmO1xuICAgICAgICBpZiAocm93U3RhdGUuY2VsbHNbY29sSW5kZXhdLnNlbGVjdGVkKSB7XG4gICAgICAgICAgdGhpcy51cGRhdGVTdGF0ZShyb3dTdGF0ZS5pZGVudGl0eSwgY29sSW5kZXgsIHsgc2VsZWN0ZWQ6IGZhbHNlIH0pO1xuICAgICAgICAgIGlmICghcmVtb3ZlQWxsKSB7XG4gICAgICAgICAgICBjb25zdCB3YXNSZW1vdmVkID0gcmVtb3ZlRnJvbUFycmF5KFxuICAgICAgICAgICAgICB0aGlzLmFjdGl2ZVNlbGVjdGVkLFxuICAgICAgICAgICAgICAoaXRlbSkgPT4gaXRlbS5jb2xJbmRleCA9PT0gY29sSW5kZXggJiYgaXRlbS5yb3dJZGVudCA9PT0gcm93U3RhdGUuaWRlbnRpdHlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAod2FzUmVtb3ZlZCkge1xuICAgICAgICAgICAgICByZW1vdmVkLnB1c2goeyByb3dJZGVudDogcm93U3RhdGUuaWRlbnRpdHksIGNvbEluZGV4IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0b01hcmtSZW5kZXJlZC5zaXplID4gMCkge1xuICAgICAgdGhpcy5leHRBcGkuZ3JpZC5yb3dzQXBpLnN5bmNSb3dzKCdkYXRhJywgLi4uQXJyYXkuZnJvbSh0b01hcmtSZW5kZXJlZC52YWx1ZXMoKSkpO1xuICAgIH1cblxuICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlZCQubmV4dCh7IGFkZGVkOiBbXSwgcmVtb3ZlZCB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhcnMgdGhlIGVudGlyZSBjb250ZXh0LCBpbmNsdWRpbmcgdmlldyBjYWNoZSBhbmQgbWVtb3J5IGNhY2hlIChyb3dzIG91dCBvZiB2aWV3KVxuICAgKiBAcGFyYW0gc3luY1ZpZXcgSWYgdHJ1ZSB3aWxsIHN5bmMgdGhlIHZpZXcgYW5kIHRoZSBjb250ZXh0IHJpZ2h0IGFmdGVyIGNsZWFyaW5nIHdoaWNoIHdpbGwgZW5zdXJlIHRoZSB2aWV3IGNhY2hlIGlzIGhvdCBhbmQgc3luY2VkIHdpdGggdGhlIGFjdHVhbCByZW5kZXJlZCByb3dzXG4gICAqIFNvbWUgcGx1Z2lucyB3aWxsIGV4cGVjdCBhIHJvdyB0byBoYXZlIGEgY29udGV4dCBzbyB0aGlzIG1pZ2h0IGJlIHJlcXVpcmVkLlxuICAgKiBUaGUgdmlldyBhbmQgY29udGV4dCBhcmUgc3luY2VkIGV2ZXJ5IHRpbWUgcm93cyBhcmUgcmVuZGVyZWQgc28gbWFrZSBzdXJlIHlvdSBzZXQgdGhpcyB0byB0cnVlIG9ubHkgd2hlbiB5b3Uga25vdyB0aGVyZSBpcyBubyByZW5kZXJpbmcgY2FsbCBjb21pbmcgZG93biB0aGUgcGlwZS5cbiAgICovXG4gIGNsZWFyKHN5bmNWaWV3PzogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMudmlld0NhY2hlLmNsZWFyKCk7XG4gICAgdGhpcy52aWV3Q2FjaGVHaG9zdC5jbGVhcigpO1xuICAgIHRoaXMuY2FjaGUuY2xlYXIoKTtcbiAgICBpZiAoc3luY1ZpZXcgPT09IHRydWUpIHtcbiAgICAgIGZvciAoY29uc3QgciBvZiB0aGlzLmV4dEFwaS5yb3dzQXBpLmRhdGFSb3dzKCkpIHtcbiAgICAgICAgdGhpcy52aWV3Q2FjaGUuc2V0KHIucm93SW5kZXgsIHIuY29udGV4dCk7XG4gICAgICAgIC8vIHdlJ3JlIGNsZWFyaW5nIHRoZSBleGlzdGluZyB2aWV3IHN0YXRlIG9uIHRoZSBjb21wb25lbnRcbiAgICAgICAgLy8gSWYgaW4gdGhlIGZ1dHVyZSB3ZSB3YW50IHRvIHVwZGF0ZSBzdGF0ZSBhbmQgbm90IGNsZWFyLCByZW1vdmUgdGhpcyBvbmVcbiAgICAgICAgLy8gYW5kIGluc3RlYWQganVzdCB0YWtlIHRoZSBzdGF0ZSBhbmQgcHV0IGl0IGluIHRoZSBjYWNoZS5cbiAgICAgICAgLy8gZS5nLiBpZiBvbiBjb2x1bW4gc3dhcCB3ZSB3YW50IHRvIHN3YXAgY2VsbHMgaW4gdGhlIGNvbnRleHQuLi5cbiAgICAgICAgci5jb250ZXh0LmZyb21TdGF0ZSh0aGlzLmdldENyZWF0ZVN0YXRlKHIuY29udGV4dCkpO1xuICAgICAgICB0aGlzLnN5bmNWaWV3QW5kQ29udGV4dCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNhdmVTdGF0ZShjb250ZXh0OiBQYmxOZ3JpZFJvd0NvbnRleHQ8VD4pIHtcbiAgICBpZiAoY29udGV4dCBpbnN0YW5jZW9mIFBibFJvd0NvbnRleHQpIHtcbiAgICAgIHRoaXMuY2FjaGUuc2V0KGNvbnRleHQuaWRlbnRpdHksIGNvbnRleHQuZ2V0U3RhdGUoKSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0Um93KHJvdzogbnVtYmVyIHwgSFRNTEVsZW1lbnQpOiBQYmxOZ3JpZFJvd0NvbnRleHQ8VD4gfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IGluZGV4ID0gdHlwZW9mIHJvdyA9PT0gJ251bWJlcicgPyByb3cgOiBmaW5kUm93UmVuZGVyZWRJbmRleChyb3cpO1xuICAgIHJldHVybiB0aGlzLnJvd0NvbnRleHQoaW5kZXgpO1xuICB9XG5cbiAgZ2V0Q2VsbChjZWxsOiBIVE1MRWxlbWVudCB8IEdyaWREYXRhUG9pbnQpOiBQYmxOZ3JpZENlbGxDb250ZXh0IHwgdW5kZWZpbmVkO1xuICAvKipcbiAgICogUmV0dXJuIHRoZSBjZWxsIGNvbnRleHQgZm9yIHRoZSBjZWxsIGF0IHRoZSBwb2ludCBzcGVjaWZpZWRcbiAgICogQHBhcmFtIHJvd1xuICAgKiBAcGFyYW0gY29sXG4gICAqL1xuICBnZXRDZWxsKHJvdzogbnVtYmVyLCBjb2w6IG51bWJlcik6IFBibE5ncmlkQ2VsbENvbnRleHQgfCB1bmRlZmluZWQ7XG4gIGdldENlbGwocm93T3JDZWxsRWxlbWVudDogbnVtYmVyIHwgSFRNTEVsZW1lbnQgfCBHcmlkRGF0YVBvaW50LCBjb2w/OiBudW1iZXIpOiBQYmxOZ3JpZENlbGxDb250ZXh0IHwgdW5kZWZpbmVkIHtcbiAgICBpZiAodHlwZW9mIHJvd09yQ2VsbEVsZW1lbnQgPT09ICdudW1iZXInKSB7XG4gICAgICBjb25zdCByb3dDb250ZXh0ID0gdGhpcy5yb3dDb250ZXh0KHJvd09yQ2VsbEVsZW1lbnQpO1xuICAgICAgaWYgKHJvd0NvbnRleHQpIHtcbiAgICAgICAgcmV0dXJuIHJvd0NvbnRleHQuY2VsbChjb2wpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCByZWYgPSByZXNvbHZlQ2VsbFJlZmVyZW5jZShyb3dPckNlbGxFbGVtZW50LCB0aGlzIGFzIGFueSk7XG4gICAgICBpZiAocmVmIGluc3RhbmNlb2YgUGJsQ2VsbENvbnRleHQpIHtcbiAgICAgICAgcmV0dXJuIHJlZjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXREYXRhSXRlbShjZWxsOiBDZWxsUmVmZXJlbmNlKTogYW55IHtcbiAgICBjb25zdCByZWYgPSByZXNvbHZlQ2VsbFJlZmVyZW5jZShjZWxsLCB0aGlzIGFzIGFueSk7XG4gICAgaWYgKHJlZiBpbnN0YW5jZW9mIFBibENlbGxDb250ZXh0KSB7XG4gICAgICByZXR1cm4gcmVmLmNvbC5nZXRWYWx1ZShyZWYucm93Q29udGV4dC4kaW1wbGljaXQpO1xuICAgIH0gZWxzZSBpZiAocmVmKSB7XG4gICAgICBjb25zdCByb3cgPSB0aGlzLmV4dEFwaS5ncmlkLmRzLnNvdXJjZVtyZWZbMF0uZHNJbmRleF07XG4gICAgICBjb25zdCBjb2x1bW4gPSB0aGlzLmV4dEFwaS5ncmlkLmNvbHVtbkFwaS5maW5kQ29sdW1uQXQocmVmWzFdKTtcbiAgICAgIHJldHVybiBjb2x1bW4uZ2V0VmFsdWUocm93KTtcbiAgICB9XG4gIH1cblxuICBjcmVhdGVDZWxsQ29udGV4dChyZW5kZXJSb3dJbmRleDogbnVtYmVyLCBjb2x1bW46IFBibENvbHVtbik6IFBibENlbGxDb250ZXh0PFQ+IHtcbiAgICBjb25zdCByb3dDb250ZXh0ID0gdGhpcy5yb3dDb250ZXh0KHJlbmRlclJvd0luZGV4KTtcbiAgICBjb25zdCBjb2xJbmRleCA9IHRoaXMuY29sdW1uQXBpLmluZGV4T2YoY29sdW1uKTtcbiAgICByZXR1cm4gcm93Q29udGV4dC5jZWxsKGNvbEluZGV4KTtcbiAgfVxuXG4gIHJvd0NvbnRleHQocmVuZGVyUm93SW5kZXg6IG51bWJlcik6IFBibFJvd0NvbnRleHQ8VD4gfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLnZpZXdDYWNoZS5nZXQocmVuZGVyUm93SW5kZXgpO1xuICB9XG5cbiAgdXBkYXRlU3RhdGUocm93SWRlbnRpdHk6IGFueSwgY29sdW1uSW5kZXg6IG51bWJlciwgY2VsbFN0YXRlOiBQYXJ0aWFsPENlbGxDb250ZXh0U3RhdGU8VD4+KTogdm9pZDtcbiAgdXBkYXRlU3RhdGUocm93SWRlbnRpdHk6IGFueSwgcm93U3RhdGU6IFBhcnRpYWw8Um93Q29udGV4dFN0YXRlPFQ+Pik6IHZvaWQ7XG4gIHVwZGF0ZVN0YXRlKFxuICAgIHJvd0lkZW50aXR5OiBhbnksXG4gICAgcm93U3RhdGVPckNlbGxJbmRleDogUGFydGlhbDxSb3dDb250ZXh0U3RhdGU8VD4+IHwgbnVtYmVyLFxuICAgIGNlbGxTdGF0ZT86IFBhcnRpYWw8Q2VsbENvbnRleHRTdGF0ZTxUPj5cbiAgKTogdm9pZCB7XG4gICAgY29uc3QgY3VycmVudFJvd1N0YXRlID0gdGhpcy5jYWNoZS5nZXQocm93SWRlbnRpdHkpO1xuICAgIGlmIChjdXJyZW50Um93U3RhdGUpIHtcbiAgICAgIGlmICh0eXBlb2Ygcm93U3RhdGVPckNlbGxJbmRleCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgY29uc3QgY3VycmVudENlbGxTdGF0ZSA9IGN1cnJlbnRSb3dTdGF0ZS5jZWxsc1tyb3dTdGF0ZU9yQ2VsbEluZGV4XTtcbiAgICAgICAgaWYgKGN1cnJlbnRDZWxsU3RhdGUpIHtcbiAgICAgICAgICBPYmplY3QuYXNzaWduKGN1cnJlbnRDZWxsU3RhdGUsIGNlbGxTdGF0ZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24oY3VycmVudFJvd1N0YXRlLCByb3dTdGF0ZU9yQ2VsbEluZGV4KTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHJvd0NvbnRleHQgPSB0aGlzLmZpbmRSb3dJblZpZXcocm93SWRlbnRpdHkpO1xuICAgICAgaWYgKHJvd0NvbnRleHQpIHtcbiAgICAgICAgcm93Q29udGV4dC5mcm9tU3RhdGUoY3VycmVudFJvd1N0YXRlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVHJ5IHRvIGZpbmQgYSBzcGVjaWZpYyByb3csIHVzaW5nIHRoZSByb3cgaWRlbnRpdHksIGluIHRoZSBjdXJyZW50IHZpZXcuXG4gICAqIElmIHRoZSByb3cgaXMgbm90IGluIHRoZSB2aWV3IChvciBldmVuIG5vdCBpbiB0aGUgY2FjaGUpIGl0IHdpbGwgcmV0dXJuIHVuZGVmaW5lZCwgb3RoZXJ3aXNlIHJldHVybnMgdGhlIHJvdydzIGNvbnRleHQgaW5zdGFuY2UgKGBQYmxSb3dDb250ZXh0YClcbiAgICogQHBhcmFtIHJvd0lkZW50aXR5IFRoZSByb3cncyBpZGVudGl0eS4gSWYgYSBzcGVjaWZpYyBpZGVudGl0eSBpcyB1c2VkLCBwbGVhc2UgcHJvdmlkZSBpdCBvdGhlcndpc2UgcHJvdmlkZSB0aGUgaW5kZXggb2YgdGhlIHJvdyBpbiB0aGUgZGF0YXNvdXJjZS5cbiAgICovXG4gIGZpbmRSb3dJblZpZXcocm93SWRlbnRpdHk6IGFueSk6IFBibFJvd0NvbnRleHQ8VD4gfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IHJvd1N0YXRlID0gdGhpcy5jYWNoZS5nZXQocm93SWRlbnRpdHkpO1xuICAgIGlmIChyb3dTdGF0ZSkge1xuICAgICAgY29uc3QgcmVuZGVyUm93SW5kZXggPSByb3dTdGF0ZS5kc0luZGV4IC0gdGhpcy5leHRBcGkuZ3JpZC5kcy5yZW5kZXJTdGFydDtcbiAgICAgIGNvbnN0IHJvd0NvbnRleHQgPSB0aGlzLnZpZXdDYWNoZS5nZXQocmVuZGVyUm93SW5kZXgpO1xuICAgICAgaWYgKHJvd0NvbnRleHQgJiYgcm93Q29udGV4dC5pZGVudGl0eSA9PT0gcm93SWRlbnRpdHkpIHtcbiAgICAgICAgcmV0dXJuIHJvd0NvbnRleHQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRyeSB0byBmaW5kIGEgc3BlY2lmaWMgcm93IGNvbnRleHQsIHVzaW5nIHRoZSByb3cgaWRlbnRpdHksIGluIHRoZSBjb250ZXh0IGNhY2hlLlxuICAgKiBOb3RlIHRoYXQgdGhlIGNhY2hlIGRvZXMgbm90IGhvbGQgdGhlIGNvbnRleHQgaXRzZWxmIGJ1dCBvbmx5IHRoZSBzdGF0ZSB0aGF0IGNhbiBsYXRlciBiZSB1c2VkIHRvIHJldHJpZXZlIGEgY29udGV4dCBpbnN0YW5jZS4gVGhlIGNvbnRleHQgaW5zdGFuY2VcbiAgICogaXMgb25seSB1c2VkIGFzIGNvbnRleHQgZm9yIHJvd3MgaW4gdmlldy5cbiAgICogQHBhcmFtIHJvd0lkZW50aXR5IFRoZSByb3cncyBpZGVudGl0eS4gSWYgYSBzcGVjaWZpYyBpZGVudGl0eSBpcyB1c2VkLCBwbGVhc2UgcHJvdmlkZSBpdCBvdGhlcndpc2UgcHJvdmlkZSB0aGUgaW5kZXggb2YgdGhlIHJvdyBpbiB0aGUgZGF0YXNvdXJjZS5cbiAgICovXG4gIGZpbmRSb3dJbkNhY2hlKHJvd0lkZW50aXR5OiBhbnkpOiBSb3dDb250ZXh0U3RhdGU8VD4gfCB1bmRlZmluZWQ7XG4gIC8qKlxuICAgKiBUcnkgdG8gZmluZCBhIHNwZWNpZmljIHJvdyBjb250ZXh0LCB1c2luZyB0aGUgcm93IGlkZW50aXR5LCBpbiB0aGUgY29udGV4dCBjYWNoZS5cbiAgICogTm90ZSB0aGF0IHRoZSBjYWNoZSBkb2VzIG5vdCBob2xkIHRoZSBjb250ZXh0IGl0c2VsZiBidXQgb25seSB0aGUgc3RhdGUgdGhhdCBjYW4gbGF0ZXIgYmUgdXNlZCB0byByZXRyaWV2ZSBhIGNvbnRleHQgaW5zdGFuY2UuIFRoZSBjb250ZXh0IGluc3RhbmNlXG4gICAqIGlzIG9ubHkgdXNlZCBhcyBjb250ZXh0IGZvciByb3dzIGluIHZpZXcuXG4gICAqIEBwYXJhbSByb3dJZGVudGl0eSBUaGUgcm93J3MgaWRlbnRpdHkuIElmIGEgc3BlY2lmaWMgaWRlbnRpdHkgaXMgdXNlZCwgcGxlYXNlIHByb3ZpZGUgaXQgb3RoZXJ3aXNlIHByb3ZpZGUgdGhlIGluZGV4IG9mIHRoZSByb3cgaW4gdGhlIGRhdGFzb3VyY2UuXG4gICAqIEBwYXJhbSBvZmZzZXQgV2hlbiBzZXQsIHJldHVybnMgdGhlIHJvdyBhdCB0aGUgb2Zmc2V0IGZyb20gdGhlIHJvdyB3aXRoIHRoZSBwcm92aWRlZCByb3cgaWRlbnRpdHkuIENhbiBiZSBhbnkgbnVtZXJpYyB2YWx1ZSAoZS5nIDUsIC02LCA0KS5cbiAgICogQHBhcmFtIGNyZWF0ZSBXaGV0aGVyIHRvIGNyZWF0ZSBhIG5ldyBzdGF0ZSBpZiB0aGUgY3VycmVudCBzdGF0ZSBkb2VzIG5vdCBleGlzdC5cbiAgICovXG4gIGZpbmRSb3dJbkNhY2hlKHJvd0lkZW50aXR5OiBhbnksIG9mZnNldDogbnVtYmVyLCBjcmVhdGU6IGJvb2xlYW4pOiBSb3dDb250ZXh0U3RhdGU8VD4gfCB1bmRlZmluZWQ7XG4gIGZpbmRSb3dJbkNhY2hlKHJvd0lkZW50aXR5OiBhbnksIG9mZnNldD86IG51bWJlciwgY3JlYXRlPzogYm9vbGVhbik6IFJvd0NvbnRleHRTdGF0ZTxUPiB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3Qgcm93U3RhdGUgPSB0aGlzLmNhY2hlLmdldChyb3dJZGVudGl0eSk7XG5cbiAgICBpZiAoIW9mZnNldCkge1xuICAgICAgcmV0dXJuIHJvd1N0YXRlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkc0luZGV4ID0gcm93U3RhdGUuZHNJbmRleCArIG9mZnNldDtcbiAgICAgIGNvbnN0IGlkZW50aXR5ID0gdGhpcy5nZXRSb3dJZGVudGl0eShkc0luZGV4KTtcbiAgICAgIGlmIChpZGVudGl0eSAhPT0gbnVsbCkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5maW5kUm93SW5DYWNoZShpZGVudGl0eSk7XG4gICAgICAgIGlmICghcmVzdWx0ICYmIGNyZWF0ZSAmJiBkc0luZGV4IDwgdGhpcy5leHRBcGkuZ3JpZC5kcy5sZW5ndGgpIHtcbiAgICAgICAgICByZXN1bHQgPSBQYmxSb3dDb250ZXh0LmRlZmF1bHRTdGF0ZShpZGVudGl0eSwgZHNJbmRleCwgdGhpcy5jb2x1bW5BcGkuY29sdW1ucy5sZW5ndGgpO1xuICAgICAgICAgIHRoaXMuY2FjaGUuc2V0KGlkZW50aXR5LCByZXN1bHQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0Um93SWRlbnRpdHkoZHNJbmRleDogbnVtYmVyLCByb3dEYXRhPzogVCk6IHN0cmluZyB8IG51bWJlciB8IG51bGwge1xuICAgIGNvbnN0IHsgZHMgfSA9IHRoaXMuZXh0QXBpLmdyaWQ7XG4gICAgY29uc3QgeyBwcmltYXJ5IH0gPSB0aGlzLmV4dEFwaS5jb2x1bW5TdG9yZTtcblxuICAgIGNvbnN0IHJvdyA9IHJvd0RhdGEgfHwgZHMuc291cmNlW2RzSW5kZXhdO1xuICAgIGlmICghcm93KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHByaW1hcnkgPyBwcmltYXJ5LmdldFZhbHVlKHJvdykgOiBkc0luZGV4O1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2NyZWF0ZVJvd0NvbnRleHQoZGF0YTogVCwgcmVuZGVyUm93SW5kZXg6IG51bWJlcik6IFBibFJvd0NvbnRleHQ8VD4ge1xuICAgIGNvbnN0IGNvbnRleHQgPSBuZXcgUGJsUm93Q29udGV4dDxUPihkYXRhLCB0aGlzLmV4dEFwaS5ncmlkLmRzLnJlbmRlclN0YXJ0ICsgcmVuZGVyUm93SW5kZXgsIHRoaXMuZXh0QXBpKTtcbiAgICBjb250ZXh0LmZyb21TdGF0ZSh0aGlzLmdldENyZWF0ZVN0YXRlKGNvbnRleHQpKTtcbiAgICB0aGlzLmFkZFRvVmlld0NhY2hlKHJlbmRlclJvd0luZGV4LCBjb250ZXh0KTtcbiAgICByZXR1cm4gY29udGV4dDtcbiAgfVxuXG4gIF91cGRhdGVSb3dDb250ZXh0KHJvd0NvbnRleHQ6IFBibFJvd0NvbnRleHQ8VD4sIHJlbmRlclJvd0luZGV4OiBudW1iZXIpIHtcbiAgICBjb25zdCBkc0luZGV4ID0gdGhpcy5leHRBcGkuZ3JpZC5kcy5yZW5kZXJTdGFydCArIHJlbmRlclJvd0luZGV4O1xuICAgIGNvbnN0IGlkZW50aXR5ID0gdGhpcy5nZXRSb3dJZGVudGl0eShkc0luZGV4LCByb3dDb250ZXh0LiRpbXBsaWNpdCk7XG4gICAgaWYgKHJvd0NvbnRleHQuaWRlbnRpdHkgIT09IGlkZW50aXR5KSB7XG4gICAgICByb3dDb250ZXh0LnNhdmVTdGF0ZSgpO1xuICAgICAgcm93Q29udGV4dC5kc0luZGV4ID0gZHNJbmRleDtcbiAgICAgIHJvd0NvbnRleHQuaWRlbnRpdHkgPSBpZGVudGl0eTtcbiAgICAgIHJvd0NvbnRleHQuZnJvbVN0YXRlKHRoaXMuZ2V0Q3JlYXRlU3RhdGUocm93Q29udGV4dCkpO1xuICAgICAgdGhpcy5hZGRUb1ZpZXdDYWNoZShyZW5kZXJSb3dJbmRleCwgcm93Q29udGV4dCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhZGRUb1ZpZXdDYWNoZShyb3dJbmRleDogbnVtYmVyLCByb3dDb250ZXh0OiBQYmxSb3dDb250ZXh0PFQ+KSB7XG4gICAgdGhpcy52aWV3Q2FjaGUuc2V0KHJvd0luZGV4LCByb3dDb250ZXh0KTtcbiAgICB0aGlzLnZpZXdDYWNoZUdob3N0LmRlbGV0ZShyb3dDb250ZXh0LmlkZW50aXR5KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0Q3JlYXRlU3RhdGUoY29udGV4dDogUGJsUm93Q29udGV4dDxUPikge1xuICAgIGxldCBzdGF0ZSA9IHRoaXMuY2FjaGUuZ2V0KGNvbnRleHQuaWRlbnRpdHkpO1xuICAgIGlmICghc3RhdGUpIHtcbiAgICAgIHN0YXRlID0gUGJsUm93Q29udGV4dC5kZWZhdWx0U3RhdGUoY29udGV4dC5pZGVudGl0eSwgY29udGV4dC5kc0luZGV4LCB0aGlzLmNvbHVtbkFwaS5jb2x1bW5zLmxlbmd0aCk7XG4gICAgICB0aGlzLmNhY2hlLnNldChjb250ZXh0LmlkZW50aXR5LCBzdGF0ZSk7XG4gICAgfVxuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuXG4gIHByaXZhdGUgZW1pdEZvY3VzQ2hhbmdlZChjdXJyOiBQYmxOZ3JpZEZvY3VzQ2hhbmdlZEV2ZW50WydjdXJyJ10pOiB2b2lkIHtcbiAgICB0aGlzLmZvY3VzQ2hhbmdlZCQubmV4dCh7XG4gICAgICBwcmV2OiB0aGlzLmZvY3VzQ2hhbmdlZCQudmFsdWUuY3VycixcbiAgICAgIGN1cnJcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmZvY3VzQ2hhbmdlZCQuY29tcGxldGUoKTtcbiAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZWQkLmNvbXBsZXRlKCk7XG4gIH1cblxuICBwcml2YXRlIHN5bmNWaWV3QW5kQ29udGV4dCgpIHtcbiAgICB0aGlzLnZpZXdDYWNoZUdob3N0LmZvckVhY2goKGlkZW50KSA9PiB7XG4gICAgICBpZiAoIXRoaXMuZmluZFJvd0luVmlldyhpZGVudCkpIHtcbiAgICAgICAgdGhpcy5jYWNoZS5nZXQoaWRlbnQpLmZpcnN0UmVuZGVyID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy52aWV3Q2FjaGVHaG9zdCA9IG5ldyBTZXQoXG4gICAgICBBcnJheS5mcm9tKHRoaXMudmlld0NhY2hlLnZhbHVlcygpKVxuICAgICAgICAuZmlsdGVyKCh2KSA9PiB2LmZpcnN0UmVuZGVyKVxuICAgICAgICAubWFwKCh2KSA9PiB2LmlkZW50aXR5KVxuICAgICk7XG4gIH1cbn1cbiJdfQ==