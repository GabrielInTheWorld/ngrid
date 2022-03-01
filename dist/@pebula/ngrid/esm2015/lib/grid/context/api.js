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
        this.focusChanged = this.focusChanged$
            .pipe(buffer(this.focusChanged$.pipe(debounceTime(0, asapScheduler))), map(events => ({ prev: events[0].prev, curr: events[events.length - 1].curr })));
        /**
         * Notify when the selected cells has changed.
         */
        this.selectionChanged = this.selectionChanged$.asObservable();
        this.columnApi = extApi.columnApi;
        extApi.events
            .pipe(filter(e => e.kind === 'onDataSource'), take(1)).subscribe(() => {
            this.vcRef = extApi.cdkTable._rowOutlet.viewContainer;
            this.syncViewAndContext();
            extApi.cdkTable.onRenderRows.subscribe(() => this.syncViewAndContext());
        });
        extApi.events.pipe(ON_DESTROY).subscribe(e => this.destroy());
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
                        const wasRemoved = removeFromArray(this.activeSelected, item => item.colIndex === colIndex && item.rowIdent === rowIdent);
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
                        const wasRemoved = removeFromArray(this.activeSelected, item => item.colIndex === colIndex && item.rowIdent === rowState.identity);
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
            curr,
        });
    }
    destroy() {
        this.focusChanged$.complete();
        this.selectionChanged$.complete();
    }
    syncViewAndContext() {
        this.viewCacheGhost.forEach(ident => {
            if (!this.findRowInView(ident)) {
                this.cache.get(ident).firstRender = false;
            }
        });
        this.viewCacheGhost = new Set(Array.from(this.viewCache.values()).filter(v => v.firstRender).map(v => v.identity));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3JpZC9zcmMvbGliL2dyaWQvY29udGV4dC9hcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQWMsYUFBYSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHekUsT0FBTyxFQUFFLFVBQVUsRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQWNqRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDckUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUN0QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBRXhDLE1BQU0sT0FBTyxVQUFVO0lBa0RyQixZQUFvQixNQUF1QztRQUF2QyxXQUFNLEdBQU4sTUFBTSxDQUFpQztRQWpEbkQsY0FBUyxHQUFHLElBQUksR0FBRyxFQUE0QixDQUFDO1FBQ2hELG1CQUFjLEdBQUcsSUFBSSxHQUFHLEVBQU8sQ0FBQztRQUNoQyxVQUFLLEdBQUcsSUFBSSxHQUFHLEVBQTJCLENBQUM7UUFLM0MsbUJBQWMsR0FBb0IsRUFBRSxDQUFDO1FBQ3JDLGtCQUFhLEdBQUcsSUFBSSxlQUFlLENBQTRCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztRQUNyRyxzQkFBaUIsR0FBRyxJQUFJLE9BQU8sRUFBaUMsQ0FBQztRQUV6RTs7OztXQUlHO1FBQ00saUJBQVksR0FBMEMsSUFBSSxDQUFDLGFBQWE7YUFDOUUsSUFBSSxDQUNILE1BQU0sQ0FBNEIsSUFBSSxDQUFDLGFBQWEsQ0FB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ZSwgYXNhcFNjaGVkdWxlciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBidWZmZXIsIG1hcCwgZmlsdGVyLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBPTl9ERVNUUk9ZLCByZW1vdmVGcm9tQXJyYXkgfSBmcm9tICdAcGVidWxhL25ncmlkL2NvcmUnO1xuaW1wb3J0IHsgUGJsTmdyaWRJbnRlcm5hbEV4dGVuc2lvbkFwaSB9IGZyb20gJy4uLy4uL2V4dC9ncmlkLWV4dC1hcGknO1xuaW1wb3J0IHsgUGJsQ29sdW1uIH0gZnJvbSAnLi4vY29sdW1uL21vZGVsJztcbmltcG9ydCB7IENvbHVtbkFwaSB9IGZyb20gJy4uL2NvbHVtbi9tYW5hZ2VtZW50JztcbmltcG9ydCB7XG4gIFJvd0NvbnRleHRTdGF0ZSxcbiAgQ2VsbENvbnRleHRTdGF0ZSxcbiAgUGJsTmdyaWRDZWxsQ29udGV4dCxcbiAgUGJsTmdyaWRSb3dDb250ZXh0LFxuICBDZWxsUmVmZXJlbmNlLFxuICBHcmlkRGF0YVBvaW50LFxuICBQYmxOZ3JpZEZvY3VzQ2hhbmdlZEV2ZW50LFxuICBQYmxOZ3JpZFNlbGVjdGlvbkNoYW5nZWRFdmVudFxufSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IGZpbmRSb3dSZW5kZXJlZEluZGV4LCByZXNvbHZlQ2VsbFJlZmVyZW5jZSB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHsgUGJsUm93Q29udGV4dCB9IGZyb20gJy4vcm93JztcbmltcG9ydCB7IFBibENlbGxDb250ZXh0IH0gZnJvbSAnLi9jZWxsJztcblxuZXhwb3J0IGNsYXNzIENvbnRleHRBcGk8VCA9IGFueT4ge1xuICBwcml2YXRlIHZpZXdDYWNoZSA9IG5ldyBNYXA8bnVtYmVyLCBQYmxSb3dDb250ZXh0PFQ+PigpO1xuICBwcml2YXRlIHZpZXdDYWNoZUdob3N0ID0gbmV3IFNldDxhbnk+KCk7XG4gIHByaXZhdGUgY2FjaGUgPSBuZXcgTWFwPGFueSwgUm93Q29udGV4dFN0YXRlPFQ+PigpO1xuICBwcml2YXRlIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmO1xuICBwcml2YXRlIGNvbHVtbkFwaTogQ29sdW1uQXBpPFQ+O1xuXG4gIHByaXZhdGUgYWN0aXZlRm9jdXNlZDogR3JpZERhdGFQb2ludDtcbiAgcHJpdmF0ZSBhY3RpdmVTZWxlY3RlZDogR3JpZERhdGFQb2ludFtdID0gW107XG4gIHByaXZhdGUgZm9jdXNDaGFuZ2VkJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UGJsTmdyaWRGb2N1c0NoYW5nZWRFdmVudD4oeyBwcmV2OiB1bmRlZmluZWQsIGN1cnI6IHVuZGVmaW5lZCB9KTtcbiAgcHJpdmF0ZSBzZWxlY3Rpb25DaGFuZ2VkJCA9IG5ldyBTdWJqZWN0PFBibE5ncmlkU2VsZWN0aW9uQ2hhbmdlZEV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBOb3RpZnkgd2hlbiB0aGUgZm9jdXMgaGFzIGNoYW5nZWQuXG4gICAqXG4gICAqID4gTm90ZSB0aGF0IHRoZSBub3RpZmljYXRpb24gaXMgbm90IGltbWVkaWF0ZSwgaXQgd2lsbCBvY2N1ciBvbiB0aGUgY2xvc2VzdCBtaWNyby10YXNrIGFmdGVyIHRoZSBjaGFuZ2UuXG4gICAqL1xuICByZWFkb25seSBmb2N1c0NoYW5nZWQ6IE9ic2VydmFibGU8UGJsTmdyaWRGb2N1c0NoYW5nZWRFdmVudD4gPSB0aGlzLmZvY3VzQ2hhbmdlZCRcbiAgICAucGlwZShcbiAgICAgIGJ1ZmZlcjxQYmxOZ3JpZEZvY3VzQ2hhbmdlZEV2ZW50Pih0aGlzLmZvY3VzQ2hhbmdlZCQucGlwZShkZWJvdW5jZVRpbWUoMCwgYXNhcFNjaGVkdWxlcikpKSxcbiAgICAgIG1hcCggZXZlbnRzID0+ICh7IHByZXY6IGV2ZW50c1swXS5wcmV2LCBjdXJyOiBldmVudHNbZXZlbnRzLmxlbmd0aCAtIDFdLmN1cnIgfSkgKVxuICAgICk7XG5cbiAgLyoqXG4gICAqIE5vdGlmeSB3aGVuIHRoZSBzZWxlY3RlZCBjZWxscyBoYXMgY2hhbmdlZC5cbiAgICovXG4gIHJlYWRvbmx5IHNlbGVjdGlvbkNoYW5nZWQ6IE9ic2VydmFibGU8UGJsTmdyaWRTZWxlY3Rpb25DaGFuZ2VkRXZlbnQ+ID0gdGhpcy5zZWxlY3Rpb25DaGFuZ2VkJC5hc09ic2VydmFibGUoKTtcblxuICAvKipcbiAgICogVGhlIHJlZmVyZW5jZSB0byBjdXJyZW50bHkgZm9jdXNlZCBjZWxsIGNvbnRleHQuXG4gICAqIFlvdSBjYW4gcmV0cmlldmUgdGhlIGFjdHVhbCBjb250ZXh0IG9yIGNvbnRleHQgY2VsbCB1c2luZyBgZmluZFJvd0luVmlld2AgYW5kIC8gb3IgYGZpbmRSb3dJbkNhY2hlYC5cbiAgICpcbiAgICogPiBOb3RlIHRoYXQgd2hlbiB2aXJ0dWFsIHNjcm9sbCBpcyBlbmFibGVkIHRoZSBjdXJyZW50bHkgZm9jdXNlZCBjZWxsIGRvZXMgbm90IGhhdmUgdG8gZXhpc3QgaW4gdGhlIHZpZXcuXG4gICAqIElmIHRoaXMgaXMgdGhlIGNhc2UgYGZpbmRSb3dJblZpZXdgIHdpbGwgcmV0dXJuIHVuZGVmaW5lZCwgdXNlIGBmaW5kUm93SW5DYWNoZWAgaW5zdGVhZC5cbiAgICovXG4gIGdldCBmb2N1c2VkQ2VsbCgpOiBHcmlkRGF0YVBvaW50IHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5hY3RpdmVGb2N1c2VkID8gey4uLnRoaXMuYWN0aXZlRm9jdXNlZCB9IDogdW5kZWZpbmVkO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSByZWZlcmVuY2UgdG8gY3VycmVudGx5IHNlbGVjdGVkIHJhbmdlIG9mIGNlbGwncyBjb250ZXh0LlxuICAgKiBZb3UgY2FuIHJldHJpZXZlIHRoZSBhY3R1YWwgY29udGV4dCBvciBjb250ZXh0IGNlbGwgdXNpbmcgYGZpbmRSb3dJblZpZXdgIGFuZCAvIG9yIGBmaW5kUm93SW5DYWNoZWAuXG4gICAqXG4gICAqID4gTm90ZSB0aGF0IHdoZW4gdmlydHVhbCBzY3JvbGwgaXMgZW5hYmxlZCB0aGUgY3VycmVudGx5IHNlbGVjdGVkIGNlbGxzIGRvZXMgbm90IGhhdmUgdG8gZXhpc3QgaW4gdGhlIHZpZXcuXG4gICAqIElmIHRoaXMgaXMgdGhlIGNhc2UgYGZpbmRSb3dJblZpZXdgIHdpbGwgcmV0dXJuIHVuZGVmaW5lZCwgdXNlIGBmaW5kUm93SW5DYWNoZWAgaW5zdGVhZC5cbiAgICovXG4gIGdldCBzZWxlY3RlZENlbGxzKCk6IEdyaWREYXRhUG9pbnRbXSB7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlU2VsZWN0ZWQuc2xpY2UoKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZXh0QXBpOiBQYmxOZ3JpZEludGVybmFsRXh0ZW5zaW9uQXBpPFQ+KSB7XG4gICAgdGhpcy5jb2x1bW5BcGkgPSBleHRBcGkuY29sdW1uQXBpO1xuICAgIGV4dEFwaS5ldmVudHNcbiAgICAgIC5waXBlKFxuICAgICAgICBmaWx0ZXIoIGUgPT4gZS5raW5kID09PSAnb25EYXRhU291cmNlJyksXG4gICAgICAgIHRha2UoMSksXG4gICAgICApLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMudmNSZWYgPSBleHRBcGkuY2RrVGFibGUuX3Jvd091dGxldC52aWV3Q29udGFpbmVyO1xuICAgICAgICB0aGlzLnN5bmNWaWV3QW5kQ29udGV4dCgpO1xuICAgICAgICBleHRBcGkuY2RrVGFibGUub25SZW5kZXJSb3dzLnN1YnNjcmliZSgoKSA9PiB0aGlzLnN5bmNWaWV3QW5kQ29udGV4dCgpKTtcbiAgICAgIH0pO1xuXG4gICAgZXh0QXBpLmV2ZW50cy5waXBlKE9OX0RFU1RST1kpLnN1YnNjcmliZSggZSA9PiB0aGlzLmRlc3Ryb3koKSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvY3VzIHRoZSBwcm92aWRlZCBjZWxsLlxuICAgKiBJZiBhIGNlbGwgaXMgbm90IHByb3ZpZGVkIHdpbGwgdW4tZm9jdXMgKGJsdXIpIHRoZSBjdXJyZW50bHkgZm9jdXNlZCBjZWxsIChpZiB0aGVyZSBpcyBvbmUpLlxuICAgKiBAcGFyYW0gY2VsbFJlZiBBIFJlZmVyZW5jZSB0byB0aGUgY2VsbFxuICAgKi9cbiAgZm9jdXNDZWxsKGNlbGxSZWY/OiBDZWxsUmVmZXJlbmNlKTogdm9pZCB7XG4gICAgaWYgKCFjZWxsUmVmKSB7XG4gICAgICBpZiAodGhpcy5hY3RpdmVGb2N1c2VkKSB7XG4gICAgICAgIGNvbnN0IHsgcm93SWRlbnQsIGNvbEluZGV4IH0gPSB0aGlzLmFjdGl2ZUZvY3VzZWQ7XG4gICAgICAgIHRoaXMuYWN0aXZlRm9jdXNlZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0ZShyb3dJZGVudCwgY29sSW5kZXgsIHsgZm9jdXNlZDogZmFsc2UgfSk7XG4gICAgICAgIHRoaXMuZW1pdEZvY3VzQ2hhbmdlZCh0aGlzLmFjdGl2ZUZvY3VzZWQpO1xuICAgICAgICBjb25zdCByb3dDb250ZXh0ID0gdGhpcy5maW5kUm93SW5WaWV3KHJvd0lkZW50KTtcbiAgICAgICAgaWYgKHJvd0NvbnRleHQpIHtcbiAgICAgICAgICB0aGlzLmV4dEFwaS5ncmlkLnJvd3NBcGkuc3luY1Jvd3MoJ2RhdGEnLCByb3dDb250ZXh0LmluZGV4KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCByZWYgPSByZXNvbHZlQ2VsbFJlZmVyZW5jZShjZWxsUmVmLCB0aGlzIGFzIGFueSk7XG4gICAgICBpZiAocmVmKSB7XG4gICAgICAgIHRoaXMuZm9jdXNDZWxsKCk7XG4gICAgICAgIGlmIChyZWYgaW5zdGFuY2VvZiBQYmxDZWxsQ29udGV4dCkge1xuICAgICAgICAgIGlmICghcmVmLmZvY3VzZWQgJiYgIXRoaXMuZXh0QXBpLmdyaWQudmlld3BvcnQuaXNTY3JvbGxpbmcpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU3RhdGUocmVmLnJvd0NvbnRleHQuaWRlbnRpdHksIHJlZi5pbmRleCwgeyBmb2N1c2VkOiB0cnVlIH0pO1xuXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUZvY3VzZWQgPSB7IHJvd0lkZW50OiByZWYucm93Q29udGV4dC5pZGVudGl0eSwgY29sSW5kZXg6IHJlZi5pbmRleCB9O1xuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdENlbGxzKCBbIHRoaXMuYWN0aXZlRm9jdXNlZCBdLCB0cnVlKTtcblxuICAgICAgICAgICAgdGhpcy5leHRBcGkuZ3JpZC5yb3dzQXBpLnN5bmNSb3dzKCdkYXRhJywgcmVmLnJvd0NvbnRleHQuaW5kZXgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlKHJlZlswXS5pZGVudGl0eSwgcmVmWzFdLCB7IGZvY3VzZWQ6IHRydWUgfSk7XG4gICAgICAgICAgdGhpcy5hY3RpdmVGb2N1c2VkID0geyByb3dJZGVudDogcmVmWzBdLmlkZW50aXR5LCBjb2xJbmRleDogcmVmWzFdIH07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbWl0Rm9jdXNDaGFuZ2VkKHRoaXMuYWN0aXZlRm9jdXNlZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdCBhbGwgcHJvdmlkZWQgY2VsbHMuXG4gICAqIEBwYXJhbSBjZWxsUmVmIEEgUmVmZXJlbmNlIHRvIHRoZSBjZWxsXG4gICAqIEBwYXJhbSBjbGVhckN1cnJlbnQgQ2xlYXIgdGhlIGN1cnJlbnQgc2VsZWN0aW9uIGJlZm9yZSBhcHBseWluZyB0aGUgbmV3IHNlbGVjdGlvbi5cbiAgICogRGVmYXVsdCB0byBmYWxzZSAoYWRkIHRvIGN1cnJlbnQpLlxuICAgKi9cbiAgc2VsZWN0Q2VsbHMoY2VsbFJlZnM6IENlbGxSZWZlcmVuY2VbXSwgY2xlYXJDdXJyZW50PzogYm9vbGVhbik6IHZvaWQge1xuICAgIGNvbnN0IHRvTWFya1JlbmRlcmVkID0gbmV3IFNldDxudW1iZXI+KCk7XG5cbiAgICBpZiAoY2xlYXJDdXJyZW50KSB7XG4gICAgICB0aGlzLnVuc2VsZWN0Q2VsbHMoKTtcbiAgICB9XG5cbiAgICBjb25zdCBhZGRlZDogR3JpZERhdGFQb2ludFtdID0gW107XG5cbiAgICBmb3IgKGNvbnN0IGNlbGxSZWYgb2YgY2VsbFJlZnMpIHtcbiAgICAgIGNvbnN0IHJlZiA9IHJlc29sdmVDZWxsUmVmZXJlbmNlKGNlbGxSZWYsIHRoaXMgYXMgYW55KTtcbiAgICAgIGlmIChyZWYgaW5zdGFuY2VvZiBQYmxDZWxsQ29udGV4dCkge1xuICAgICAgICBpZiAoIXJlZi5zZWxlY3RlZCAmJiAhdGhpcy5leHRBcGkuZ3JpZC52aWV3cG9ydC5pc1Njcm9sbGluZykge1xuICAgICAgICAgIGNvbnN0IHJvd0lkZW50ID0gcmVmLnJvd0NvbnRleHQuaWRlbnRpdHlcbiAgICAgICAgICBjb25zdCBjb2xJbmRleCA9IHJlZi5pbmRleDtcbiAgICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlKHJvd0lkZW50LCBjb2xJbmRleCwgeyBzZWxlY3RlZDogdHJ1ZSB9KTtcblxuICAgICAgICAgIGNvbnN0IGRhdGFQb2ludCA9IHsgcm93SWRlbnQsIGNvbEluZGV4IH07XG4gICAgICAgICAgdGhpcy5hY3RpdmVTZWxlY3RlZC5wdXNoKGRhdGFQb2ludCk7XG4gICAgICAgICAgYWRkZWQucHVzaChkYXRhUG9pbnQpO1xuXG4gICAgICAgICAgdG9NYXJrUmVuZGVyZWQuYWRkKHJlZi5yb3dDb250ZXh0LmluZGV4KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChyZWYpIHtcbiAgICAgICAgY29uc3QgWyByb3dTdGF0ZSwgY29sSW5kZXggXSA9IHJlZjtcbiAgICAgICAgaWYgKCFyb3dTdGF0ZS5jZWxsc1tjb2xJbmRleF0uc2VsZWN0ZWQpIHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlKHJvd1N0YXRlLmlkZW50aXR5LCBjb2xJbmRleCwgeyBzZWxlY3RlZDogdHJ1ZSB9KTtcbiAgICAgICAgICB0aGlzLmFjdGl2ZVNlbGVjdGVkLnB1c2goIHsgcm93SWRlbnQ6IHJvd1N0YXRlLmlkZW50aXR5LCBjb2xJbmRleCB9ICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodG9NYXJrUmVuZGVyZWQuc2l6ZSA+IDApIHtcbiAgICAgIHRoaXMuZXh0QXBpLmdyaWQucm93c0FwaS5zeW5jUm93cygnZGF0YScsIC4uLkFycmF5LmZyb20odG9NYXJrUmVuZGVyZWQudmFsdWVzKCkpKTtcbiAgICB9XG5cbiAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZWQkLm5leHQoeyBhZGRlZCwgcmVtb3ZlZDogW10gfSk7XG4gIH1cblxuICAvKipcbiAgICogVW5zZWxlY3QgYWxsIHByb3ZpZGVkIGNlbGxzLlxuICAgKiBJZiBjZWxscyBhcmUgbm90IHByb3ZpZGVkIHdpbGwgdW4tc2VsZWN0IGFsbCBjdXJyZW50bHkgc2VsZWN0ZWQgY2VsbHMuXG4gICAqIEBwYXJhbSBjZWxsUmVmIEEgUmVmZXJlbmNlIHRvIHRoZSBjZWxsXG4gICAqL1xuICB1bnNlbGVjdENlbGxzKGNlbGxSZWZzPzogQ2VsbFJlZmVyZW5jZVtdKTogdm9pZCB7XG4gICAgY29uc3QgdG9NYXJrUmVuZGVyZWQgPSBuZXcgU2V0PG51bWJlcj4oKTtcbiAgICBsZXQgdG9VbnNlbGVjdDogQ2VsbFJlZmVyZW5jZVtdID0gdGhpcy5hY3RpdmVTZWxlY3RlZDtcbiAgICBsZXQgcmVtb3ZlQWxsID0gdHJ1ZTtcblxuICAgIGlmKEFycmF5LmlzQXJyYXkoY2VsbFJlZnMpKSB7XG4gICAgICB0b1Vuc2VsZWN0ID0gY2VsbFJlZnM7XG4gICAgICByZW1vdmVBbGwgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hY3RpdmVTZWxlY3RlZCA9IFtdO1xuICAgIH1cblxuICAgIGNvbnN0IHJlbW92ZWQ6IEdyaWREYXRhUG9pbnRbXSA9IFtdO1xuXG4gICAgZm9yIChjb25zdCBjZWxsUmVmIG9mIHRvVW5zZWxlY3QpIHtcbiAgICAgIGNvbnN0IHJlZiA9IHJlc29sdmVDZWxsUmVmZXJlbmNlKGNlbGxSZWYsIHRoaXMgYXMgYW55KTtcbiAgICAgIGlmIChyZWYgaW5zdGFuY2VvZiBQYmxDZWxsQ29udGV4dCkge1xuICAgICAgICBpZiAocmVmLnNlbGVjdGVkKSB7XG4gICAgICAgICAgY29uc3Qgcm93SWRlbnQgPSByZWYucm93Q29udGV4dC5pZGVudGl0eVxuICAgICAgICAgIGNvbnN0IGNvbEluZGV4ID0gcmVmLmluZGV4O1xuICAgICAgICAgIHRoaXMudXBkYXRlU3RhdGUocm93SWRlbnQsIGNvbEluZGV4LCB7IHNlbGVjdGVkOiBmYWxzZSB9KTtcbiAgICAgICAgICBpZiAoIXJlbW92ZUFsbCkge1xuICAgICAgICAgICAgY29uc3Qgd2FzUmVtb3ZlZCA9IHJlbW92ZUZyb21BcnJheSh0aGlzLmFjdGl2ZVNlbGVjdGVkLCBpdGVtID0+IGl0ZW0uY29sSW5kZXggPT09IGNvbEluZGV4ICYmIGl0ZW0ucm93SWRlbnQgPT09IHJvd0lkZW50KTtcbiAgICAgICAgICAgIGlmICh3YXNSZW1vdmVkKSB7XG4gICAgICAgICAgICAgIHJlbW92ZWQucHVzaCh7IHJvd0lkZW50LCBjb2xJbmRleCB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICB0b01hcmtSZW5kZXJlZC5hZGQocmVmLnJvd0NvbnRleHQuaW5kZXgpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHJlZikge1xuICAgICAgICBjb25zdCBbIHJvd1N0YXRlLCBjb2xJbmRleCBdID0gcmVmO1xuICAgICAgICBpZiAocm93U3RhdGUuY2VsbHNbY29sSW5kZXhdLnNlbGVjdGVkKSB7XG4gICAgICAgICAgdGhpcy51cGRhdGVTdGF0ZShyb3dTdGF0ZS5pZGVudGl0eSwgY29sSW5kZXgsIHsgc2VsZWN0ZWQ6IGZhbHNlIH0pO1xuICAgICAgICAgIGlmICghcmVtb3ZlQWxsKSB7XG4gICAgICAgICAgICBjb25zdCB3YXNSZW1vdmVkID0gcmVtb3ZlRnJvbUFycmF5KHRoaXMuYWN0aXZlU2VsZWN0ZWQsIGl0ZW0gPT4gaXRlbS5jb2xJbmRleCA9PT0gY29sSW5kZXggJiYgaXRlbS5yb3dJZGVudCA9PT0gcm93U3RhdGUuaWRlbnRpdHkpO1xuICAgICAgICAgICAgaWYgKHdhc1JlbW92ZWQpIHtcbiAgICAgICAgICAgICAgcmVtb3ZlZC5wdXNoKHsgcm93SWRlbnQ6IHJvd1N0YXRlLmlkZW50aXR5LCBjb2xJbmRleCB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0b01hcmtSZW5kZXJlZC5zaXplID4gMCkge1xuICAgICAgdGhpcy5leHRBcGkuZ3JpZC5yb3dzQXBpLnN5bmNSb3dzKCdkYXRhJywgLi4uQXJyYXkuZnJvbSh0b01hcmtSZW5kZXJlZC52YWx1ZXMoKSkpO1xuICAgIH1cblxuICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlZCQubmV4dCh7IGFkZGVkOiBbXSwgcmVtb3ZlZCB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhcnMgdGhlIGVudGlyZSBjb250ZXh0LCBpbmNsdWRpbmcgdmlldyBjYWNoZSBhbmQgbWVtb3J5IGNhY2hlIChyb3dzIG91dCBvZiB2aWV3KVxuICAgKiBAcGFyYW0gc3luY1ZpZXcgSWYgdHJ1ZSB3aWxsIHN5bmMgdGhlIHZpZXcgYW5kIHRoZSBjb250ZXh0IHJpZ2h0IGFmdGVyIGNsZWFyaW5nIHdoaWNoIHdpbGwgZW5zdXJlIHRoZSB2aWV3IGNhY2hlIGlzIGhvdCBhbmQgc3luY2VkIHdpdGggdGhlIGFjdHVhbCByZW5kZXJlZCByb3dzXG4gICAqIFNvbWUgcGx1Z2lucyB3aWxsIGV4cGVjdCBhIHJvdyB0byBoYXZlIGEgY29udGV4dCBzbyB0aGlzIG1pZ2h0IGJlIHJlcXVpcmVkLlxuICAgKiBUaGUgdmlldyBhbmQgY29udGV4dCBhcmUgc3luY2VkIGV2ZXJ5IHRpbWUgcm93cyBhcmUgcmVuZGVyZWQgc28gbWFrZSBzdXJlIHlvdSBzZXQgdGhpcyB0byB0cnVlIG9ubHkgd2hlbiB5b3Uga25vdyB0aGVyZSBpcyBubyByZW5kZXJpbmcgY2FsbCBjb21pbmcgZG93biB0aGUgcGlwZS5cbiAgICovXG4gIGNsZWFyKHN5bmNWaWV3PzogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMudmlld0NhY2hlLmNsZWFyKCk7XG4gICAgdGhpcy52aWV3Q2FjaGVHaG9zdC5jbGVhcigpO1xuICAgIHRoaXMuY2FjaGUuY2xlYXIoKTtcbiAgICBpZiAoc3luY1ZpZXcgPT09IHRydWUpIHtcbiAgICAgIGZvciAoY29uc3QgciBvZiB0aGlzLmV4dEFwaS5yb3dzQXBpLmRhdGFSb3dzKCkpIHtcbiAgICAgICAgdGhpcy52aWV3Q2FjaGUuc2V0KHIucm93SW5kZXgsIHIuY29udGV4dCk7XG4gICAgICAgIC8vIHdlJ3JlIGNsZWFyaW5nIHRoZSBleGlzdGluZyB2aWV3IHN0YXRlIG9uIHRoZSBjb21wb25lbnRcbiAgICAgICAgLy8gSWYgaW4gdGhlIGZ1dHVyZSB3ZSB3YW50IHRvIHVwZGF0ZSBzdGF0ZSBhbmQgbm90IGNsZWFyLCByZW1vdmUgdGhpcyBvbmVcbiAgICAgICAgLy8gYW5kIGluc3RlYWQganVzdCB0YWtlIHRoZSBzdGF0ZSBhbmQgcHV0IGl0IGluIHRoZSBjYWNoZS5cbiAgICAgICAgLy8gZS5nLiBpZiBvbiBjb2x1bW4gc3dhcCB3ZSB3YW50IHRvIHN3YXAgY2VsbHMgaW4gdGhlIGNvbnRleHQuLi5cbiAgICAgICAgci5jb250ZXh0LmZyb21TdGF0ZSh0aGlzLmdldENyZWF0ZVN0YXRlKHIuY29udGV4dCkpO1xuICAgICAgICB0aGlzLnN5bmNWaWV3QW5kQ29udGV4dCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNhdmVTdGF0ZShjb250ZXh0OiBQYmxOZ3JpZFJvd0NvbnRleHQ8VD4pIHtcbiAgICBpZiAoY29udGV4dCBpbnN0YW5jZW9mIFBibFJvd0NvbnRleHQpIHtcbiAgICAgIHRoaXMuY2FjaGUuc2V0KGNvbnRleHQuaWRlbnRpdHksIGNvbnRleHQuZ2V0U3RhdGUoKSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0Um93KHJvdzogbnVtYmVyIHwgSFRNTEVsZW1lbnQpOiBQYmxOZ3JpZFJvd0NvbnRleHQ8VD4gfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IGluZGV4ID0gdHlwZW9mIHJvdyA9PT0gJ251bWJlcicgPyByb3cgOiBmaW5kUm93UmVuZGVyZWRJbmRleChyb3cpO1xuICAgIHJldHVybiB0aGlzLnJvd0NvbnRleHQoaW5kZXgpO1xuICB9XG5cbiAgZ2V0Q2VsbChjZWxsOiBIVE1MRWxlbWVudCB8IEdyaWREYXRhUG9pbnQpOiBQYmxOZ3JpZENlbGxDb250ZXh0IHwgdW5kZWZpbmVkXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGNlbGwgY29udGV4dCBmb3IgdGhlIGNlbGwgYXQgdGhlIHBvaW50IHNwZWNpZmllZFxuICAgKiBAcGFyYW0gcm93XG4gICAqIEBwYXJhbSBjb2xcbiAgICovXG4gIGdldENlbGwocm93OiBudW1iZXIsIGNvbDogbnVtYmVyKTogUGJsTmdyaWRDZWxsQ29udGV4dCB8IHVuZGVmaW5lZDtcbiAgZ2V0Q2VsbChyb3dPckNlbGxFbGVtZW50OiBudW1iZXIgfCBIVE1MRWxlbWVudCB8IEdyaWREYXRhUG9pbnQsIGNvbD86IG51bWJlcik6IFBibE5ncmlkQ2VsbENvbnRleHQgfCB1bmRlZmluZWQge1xuICAgIGlmICh0eXBlb2Ygcm93T3JDZWxsRWxlbWVudCA9PT0gJ251bWJlcicpIHtcbiAgICAgIGNvbnN0IHJvd0NvbnRleHQgPSB0aGlzLnJvd0NvbnRleHQocm93T3JDZWxsRWxlbWVudCk7XG4gICAgICBpZiAocm93Q29udGV4dCkge1xuICAgICAgICByZXR1cm4gcm93Q29udGV4dC5jZWxsKGNvbCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHJlZiA9IHJlc29sdmVDZWxsUmVmZXJlbmNlKHJvd09yQ2VsbEVsZW1lbnQsIHRoaXMgYXMgYW55KTtcbiAgICAgIGlmIChyZWYgaW5zdGFuY2VvZiBQYmxDZWxsQ29udGV4dCkge1xuICAgICAgICByZXR1cm4gcmVmO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldERhdGFJdGVtKGNlbGw6IENlbGxSZWZlcmVuY2UpOiBhbnkge1xuICAgIGNvbnN0IHJlZiA9IHJlc29sdmVDZWxsUmVmZXJlbmNlKGNlbGwsIHRoaXMgYXMgYW55KTtcbiAgICBpZiAocmVmIGluc3RhbmNlb2YgUGJsQ2VsbENvbnRleHQpIHtcbiAgICAgIHJldHVybiByZWYuY29sLmdldFZhbHVlKHJlZi5yb3dDb250ZXh0LiRpbXBsaWNpdCk7XG4gICAgfSBlbHNlIGlmIChyZWYpIHtcbiAgICAgIGNvbnN0IHJvdyA9IHRoaXMuZXh0QXBpLmdyaWQuZHMuc291cmNlW3JlZlswXS5kc0luZGV4XTtcbiAgICAgIGNvbnN0IGNvbHVtbiA9IHRoaXMuZXh0QXBpLmdyaWQuY29sdW1uQXBpLmZpbmRDb2x1bW5BdChyZWZbMV0pO1xuICAgICAgcmV0dXJuIGNvbHVtbi5nZXRWYWx1ZShyb3cpO1xuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZUNlbGxDb250ZXh0KHJlbmRlclJvd0luZGV4OiBudW1iZXIsIGNvbHVtbjogUGJsQ29sdW1uKTogUGJsQ2VsbENvbnRleHQ8VD4ge1xuICAgIGNvbnN0IHJvd0NvbnRleHQgPSB0aGlzLnJvd0NvbnRleHQocmVuZGVyUm93SW5kZXgpO1xuICAgIGNvbnN0IGNvbEluZGV4ID0gdGhpcy5jb2x1bW5BcGkuaW5kZXhPZihjb2x1bW4pO1xuICAgIHJldHVybiByb3dDb250ZXh0LmNlbGwoY29sSW5kZXgpO1xuICB9XG5cbiAgcm93Q29udGV4dChyZW5kZXJSb3dJbmRleDogbnVtYmVyKTogUGJsUm93Q29udGV4dDxUPiB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMudmlld0NhY2hlLmdldChyZW5kZXJSb3dJbmRleCk7XG4gIH1cblxuICB1cGRhdGVTdGF0ZShyb3dJZGVudGl0eTogYW55LCBjb2x1bW5JbmRleDogbnVtYmVyLCBjZWxsU3RhdGU6IFBhcnRpYWw8Q2VsbENvbnRleHRTdGF0ZTxUPj4pOiB2b2lkO1xuICB1cGRhdGVTdGF0ZShyb3dJZGVudGl0eTogYW55LCByb3dTdGF0ZTogUGFydGlhbDxSb3dDb250ZXh0U3RhdGU8VD4+KTogdm9pZDtcbiAgdXBkYXRlU3RhdGUocm93SWRlbnRpdHk6IGFueSwgcm93U3RhdGVPckNlbGxJbmRleDogUGFydGlhbDxSb3dDb250ZXh0U3RhdGU8VD4+IHwgbnVtYmVyLCBjZWxsU3RhdGU/OiBQYXJ0aWFsPENlbGxDb250ZXh0U3RhdGU8VD4+KTogdm9pZCB7XG4gICAgY29uc3QgY3VycmVudFJvd1N0YXRlID0gdGhpcy5jYWNoZS5nZXQocm93SWRlbnRpdHkpO1xuICAgIGlmIChjdXJyZW50Um93U3RhdGUpIHtcbiAgICAgIGlmICh0eXBlb2Ygcm93U3RhdGVPckNlbGxJbmRleCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgY29uc3QgY3VycmVudENlbGxTdGF0ZSA9IGN1cnJlbnRSb3dTdGF0ZS5jZWxsc1tyb3dTdGF0ZU9yQ2VsbEluZGV4XTtcbiAgICAgICAgaWYgKGN1cnJlbnRDZWxsU3RhdGUpIHtcbiAgICAgICAgICBPYmplY3QuYXNzaWduKGN1cnJlbnRDZWxsU3RhdGUsIGNlbGxTdGF0ZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24oY3VycmVudFJvd1N0YXRlLCByb3dTdGF0ZU9yQ2VsbEluZGV4KTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHJvd0NvbnRleHQgPSB0aGlzLmZpbmRSb3dJblZpZXcocm93SWRlbnRpdHkpO1xuICAgICAgaWYgKHJvd0NvbnRleHQpIHtcbiAgICAgICAgcm93Q29udGV4dC5mcm9tU3RhdGUoY3VycmVudFJvd1N0YXRlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVHJ5IHRvIGZpbmQgYSBzcGVjaWZpYyByb3csIHVzaW5nIHRoZSByb3cgaWRlbnRpdHksIGluIHRoZSBjdXJyZW50IHZpZXcuXG4gICAqIElmIHRoZSByb3cgaXMgbm90IGluIHRoZSB2aWV3IChvciBldmVuIG5vdCBpbiB0aGUgY2FjaGUpIGl0IHdpbGwgcmV0dXJuIHVuZGVmaW5lZCwgb3RoZXJ3aXNlIHJldHVybnMgdGhlIHJvdydzIGNvbnRleHQgaW5zdGFuY2UgKGBQYmxSb3dDb250ZXh0YClcbiAgICogQHBhcmFtIHJvd0lkZW50aXR5IFRoZSByb3cncyBpZGVudGl0eS4gSWYgYSBzcGVjaWZpYyBpZGVudGl0eSBpcyB1c2VkLCBwbGVhc2UgcHJvdmlkZSBpdCBvdGhlcndpc2UgcHJvdmlkZSB0aGUgaW5kZXggb2YgdGhlIHJvdyBpbiB0aGUgZGF0YXNvdXJjZS5cbiAgICovXG4gIGZpbmRSb3dJblZpZXcocm93SWRlbnRpdHk6IGFueSk6IFBibFJvd0NvbnRleHQ8VD4gfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IHJvd1N0YXRlID0gdGhpcy5jYWNoZS5nZXQocm93SWRlbnRpdHkpO1xuICAgIGlmIChyb3dTdGF0ZSkge1xuICAgICAgY29uc3QgcmVuZGVyUm93SW5kZXggPSByb3dTdGF0ZS5kc0luZGV4IC0gdGhpcy5leHRBcGkuZ3JpZC5kcy5yZW5kZXJTdGFydDtcbiAgICAgIGNvbnN0IHJvd0NvbnRleHQgPSB0aGlzLnZpZXdDYWNoZS5nZXQocmVuZGVyUm93SW5kZXgpO1xuICAgICAgaWYgKHJvd0NvbnRleHQgJiYgcm93Q29udGV4dC5pZGVudGl0eSA9PT0gcm93SWRlbnRpdHkpIHtcbiAgICAgICAgcmV0dXJuIHJvd0NvbnRleHQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRyeSB0byBmaW5kIGEgc3BlY2lmaWMgcm93IGNvbnRleHQsIHVzaW5nIHRoZSByb3cgaWRlbnRpdHksIGluIHRoZSBjb250ZXh0IGNhY2hlLlxuICAgKiBOb3RlIHRoYXQgdGhlIGNhY2hlIGRvZXMgbm90IGhvbGQgdGhlIGNvbnRleHQgaXRzZWxmIGJ1dCBvbmx5IHRoZSBzdGF0ZSB0aGF0IGNhbiBsYXRlciBiZSB1c2VkIHRvIHJldHJpZXZlIGEgY29udGV4dCBpbnN0YW5jZS4gVGhlIGNvbnRleHQgaW5zdGFuY2VcbiAgICogaXMgb25seSB1c2VkIGFzIGNvbnRleHQgZm9yIHJvd3MgaW4gdmlldy5cbiAgICogQHBhcmFtIHJvd0lkZW50aXR5IFRoZSByb3cncyBpZGVudGl0eS4gSWYgYSBzcGVjaWZpYyBpZGVudGl0eSBpcyB1c2VkLCBwbGVhc2UgcHJvdmlkZSBpdCBvdGhlcndpc2UgcHJvdmlkZSB0aGUgaW5kZXggb2YgdGhlIHJvdyBpbiB0aGUgZGF0YXNvdXJjZS5cbiAgICovXG4gIGZpbmRSb3dJbkNhY2hlKHJvd0lkZW50aXR5OiBhbnkpOiBSb3dDb250ZXh0U3RhdGU8VD4gfCB1bmRlZmluZWQ7XG4gIC8qKlxuICAgKiBUcnkgdG8gZmluZCBhIHNwZWNpZmljIHJvdyBjb250ZXh0LCB1c2luZyB0aGUgcm93IGlkZW50aXR5LCBpbiB0aGUgY29udGV4dCBjYWNoZS5cbiAgICogTm90ZSB0aGF0IHRoZSBjYWNoZSBkb2VzIG5vdCBob2xkIHRoZSBjb250ZXh0IGl0c2VsZiBidXQgb25seSB0aGUgc3RhdGUgdGhhdCBjYW4gbGF0ZXIgYmUgdXNlZCB0byByZXRyaWV2ZSBhIGNvbnRleHQgaW5zdGFuY2UuIFRoZSBjb250ZXh0IGluc3RhbmNlXG4gICAqIGlzIG9ubHkgdXNlZCBhcyBjb250ZXh0IGZvciByb3dzIGluIHZpZXcuXG4gICAqIEBwYXJhbSByb3dJZGVudGl0eSBUaGUgcm93J3MgaWRlbnRpdHkuIElmIGEgc3BlY2lmaWMgaWRlbnRpdHkgaXMgdXNlZCwgcGxlYXNlIHByb3ZpZGUgaXQgb3RoZXJ3aXNlIHByb3ZpZGUgdGhlIGluZGV4IG9mIHRoZSByb3cgaW4gdGhlIGRhdGFzb3VyY2UuXG4gICAqIEBwYXJhbSBvZmZzZXQgV2hlbiBzZXQsIHJldHVybnMgdGhlIHJvdyBhdCB0aGUgb2Zmc2V0IGZyb20gdGhlIHJvdyB3aXRoIHRoZSBwcm92aWRlZCByb3cgaWRlbnRpdHkuIENhbiBiZSBhbnkgbnVtZXJpYyB2YWx1ZSAoZS5nIDUsIC02LCA0KS5cbiAgICogQHBhcmFtIGNyZWF0ZSBXaGV0aGVyIHRvIGNyZWF0ZSBhIG5ldyBzdGF0ZSBpZiB0aGUgY3VycmVudCBzdGF0ZSBkb2VzIG5vdCBleGlzdC5cbiAgICovXG4gIGZpbmRSb3dJbkNhY2hlKHJvd0lkZW50aXR5OiBhbnksIG9mZnNldDogbnVtYmVyLCBjcmVhdGU6IGJvb2xlYW4pOiBSb3dDb250ZXh0U3RhdGU8VD4gfCB1bmRlZmluZWQ7XG4gIGZpbmRSb3dJbkNhY2hlKHJvd0lkZW50aXR5OiBhbnksIG9mZnNldD86IG51bWJlciwgY3JlYXRlPzogYm9vbGVhbik6IFJvd0NvbnRleHRTdGF0ZTxUPiB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3Qgcm93U3RhdGUgPSB0aGlzLmNhY2hlLmdldChyb3dJZGVudGl0eSk7XG5cbiAgICBpZiAoIW9mZnNldCkge1xuICAgICAgcmV0dXJuIHJvd1N0YXRlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkc0luZGV4ID0gcm93U3RhdGUuZHNJbmRleCArIG9mZnNldDtcbiAgICAgIGNvbnN0IGlkZW50aXR5ID0gdGhpcy5nZXRSb3dJZGVudGl0eShkc0luZGV4KTtcbiAgICAgIGlmIChpZGVudGl0eSAhPT0gbnVsbCkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5maW5kUm93SW5DYWNoZShpZGVudGl0eSk7XG4gICAgICAgIGlmICghcmVzdWx0ICYmIGNyZWF0ZSAmJiBkc0luZGV4IDwgdGhpcy5leHRBcGkuZ3JpZC5kcy5sZW5ndGgpIHtcbiAgICAgICAgICByZXN1bHQgPSBQYmxSb3dDb250ZXh0LmRlZmF1bHRTdGF0ZShpZGVudGl0eSwgZHNJbmRleCwgdGhpcy5jb2x1bW5BcGkuY29sdW1ucy5sZW5ndGgpO1xuICAgICAgICAgIHRoaXMuY2FjaGUuc2V0KGlkZW50aXR5LCByZXN1bHQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0Um93SWRlbnRpdHkoZHNJbmRleDogbnVtYmVyLCByb3dEYXRhPzogVCk6IHN0cmluZyB8IG51bWJlciB8IG51bGwge1xuICAgIGNvbnN0IHsgZHMgfSA9IHRoaXMuZXh0QXBpLmdyaWQ7XG4gICAgY29uc3QgeyBwcmltYXJ5IH0gPSB0aGlzLmV4dEFwaS5jb2x1bW5TdG9yZTtcblxuICAgIGNvbnN0IHJvdyA9IHJvd0RhdGEgfHwgZHMuc291cmNlW2RzSW5kZXhdO1xuICAgIGlmICghcm93KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHByaW1hcnkgPyBwcmltYXJ5LmdldFZhbHVlKHJvdykgOiBkc0luZGV4O1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2NyZWF0ZVJvd0NvbnRleHQoZGF0YTogVCwgcmVuZGVyUm93SW5kZXg6IG51bWJlcik6IFBibFJvd0NvbnRleHQ8VD4ge1xuICAgIGNvbnN0IGNvbnRleHQgPSBuZXcgUGJsUm93Q29udGV4dDxUPihkYXRhLCB0aGlzLmV4dEFwaS5ncmlkLmRzLnJlbmRlclN0YXJ0ICsgcmVuZGVyUm93SW5kZXgsIHRoaXMuZXh0QXBpKTtcbiAgICBjb250ZXh0LmZyb21TdGF0ZSh0aGlzLmdldENyZWF0ZVN0YXRlKGNvbnRleHQpKTtcbiAgICB0aGlzLmFkZFRvVmlld0NhY2hlKHJlbmRlclJvd0luZGV4LCBjb250ZXh0KTtcbiAgICByZXR1cm4gY29udGV4dDtcbiAgfVxuXG4gIF91cGRhdGVSb3dDb250ZXh0KHJvd0NvbnRleHQ6IFBibFJvd0NvbnRleHQ8VD4sIHJlbmRlclJvd0luZGV4OiBudW1iZXIpIHtcbiAgICBjb25zdCBkc0luZGV4ID0gdGhpcy5leHRBcGkuZ3JpZC5kcy5yZW5kZXJTdGFydCArIHJlbmRlclJvd0luZGV4O1xuICAgIGNvbnN0IGlkZW50aXR5ID0gdGhpcy5nZXRSb3dJZGVudGl0eShkc0luZGV4LCByb3dDb250ZXh0LiRpbXBsaWNpdCk7XG4gICAgaWYgKHJvd0NvbnRleHQuaWRlbnRpdHkgIT09IGlkZW50aXR5KSB7XG4gICAgICByb3dDb250ZXh0LnNhdmVTdGF0ZSgpO1xuICAgICAgcm93Q29udGV4dC5kc0luZGV4ID0gZHNJbmRleDtcbiAgICAgIHJvd0NvbnRleHQuaWRlbnRpdHkgPSBpZGVudGl0eTtcbiAgICAgIHJvd0NvbnRleHQuZnJvbVN0YXRlKHRoaXMuZ2V0Q3JlYXRlU3RhdGUocm93Q29udGV4dCkpO1xuICAgICAgdGhpcy5hZGRUb1ZpZXdDYWNoZShyZW5kZXJSb3dJbmRleCwgcm93Q29udGV4dClcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFkZFRvVmlld0NhY2hlKHJvd0luZGV4OiBudW1iZXIsIHJvd0NvbnRleHQ6IFBibFJvd0NvbnRleHQ8VD4pIHtcbiAgICB0aGlzLnZpZXdDYWNoZS5zZXQocm93SW5kZXgsIHJvd0NvbnRleHQpO1xuICAgIHRoaXMudmlld0NhY2hlR2hvc3QuZGVsZXRlKHJvd0NvbnRleHQuaWRlbnRpdHkpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRDcmVhdGVTdGF0ZShjb250ZXh0OiBQYmxSb3dDb250ZXh0PFQ+KSB7XG4gICAgbGV0IHN0YXRlID0gdGhpcy5jYWNoZS5nZXQoY29udGV4dC5pZGVudGl0eSk7XG4gICAgaWYgKCFzdGF0ZSkge1xuICAgICAgc3RhdGUgPSBQYmxSb3dDb250ZXh0LmRlZmF1bHRTdGF0ZShjb250ZXh0LmlkZW50aXR5LCBjb250ZXh0LmRzSW5kZXgsIHRoaXMuY29sdW1uQXBpLmNvbHVtbnMubGVuZ3RoKTtcbiAgICAgIHRoaXMuY2FjaGUuc2V0KGNvbnRleHQuaWRlbnRpdHksIHN0YXRlKTtcbiAgICB9XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG5cbiAgcHJpdmF0ZSBlbWl0Rm9jdXNDaGFuZ2VkKGN1cnI6IFBibE5ncmlkRm9jdXNDaGFuZ2VkRXZlbnRbJ2N1cnInXSk6IHZvaWQge1xuICAgIHRoaXMuZm9jdXNDaGFuZ2VkJC5uZXh0KHtcbiAgICAgIHByZXY6IHRoaXMuZm9jdXNDaGFuZ2VkJC52YWx1ZS5jdXJyLFxuICAgICAgY3VycixcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmZvY3VzQ2hhbmdlZCQuY29tcGxldGUoKTtcbiAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZWQkLmNvbXBsZXRlKCk7XG4gIH1cblxuICBwcml2YXRlIHN5bmNWaWV3QW5kQ29udGV4dCgpIHtcbiAgICB0aGlzLnZpZXdDYWNoZUdob3N0LmZvckVhY2goIGlkZW50ID0+IHtcbiAgICAgIGlmICghdGhpcy5maW5kUm93SW5WaWV3KGlkZW50KSkge1xuICAgICAgICB0aGlzLmNhY2hlLmdldChpZGVudCkuZmlyc3RSZW5kZXIgPSBmYWxzZVxuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMudmlld0NhY2hlR2hvc3QgPSBuZXcgU2V0KEFycmF5LmZyb20odGhpcy52aWV3Q2FjaGUudmFsdWVzKCkpLmZpbHRlciggdiA9PiB2LmZpcnN0UmVuZGVyICkubWFwKCB2ID0+IHYuaWRlbnRpdHkgKSk7XG4gIH1cbn1cblxuIl19