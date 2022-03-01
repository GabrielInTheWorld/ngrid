import { map } from 'rxjs/operators';
import { ON_RESIZE_ROW } from '@pebula/ngrid/core';
import { isPblColumn } from '../model/column';
export class ColumnApi {
    constructor() { }
    // workaround, we need a parameter-less constructor since @ngtools/webpack@8.0.4
    // Non @Injectable classes are now getting addded with hard reference to the ctor params which at the class creation point are undefined
    // forwardRef() will not help since it's not inject by angular, we instantiate the class..
    // probably due to https://github.com/angular/angular-cli/commit/639198499973e0f437f059b3c933c72c733d93d8
    static create(extApi) {
        const instance = new ColumnApi();
        instance.grid = extApi.grid;
        instance.store = extApi.columnStore;
        instance.extApi = extApi;
        return instance;
    }
    get visibleColumnIds() { return this.store.visibleColumnIds; }
    get hiddenColumnIds() { return this.store.hiddenColumnIds; }
    get visibleColumns() { return this.store.visibleColumns; }
    get columns() { return this.store.allColumns; }
    get columnIds() { return this.store.columnIds; }
    get totalColumnWidthChange() {
        if (!this._totalColumnWidthChange) {
            this._totalColumnWidthChange = this.extApi.events
                .pipe(ON_RESIZE_ROW, 
            // We might get a null sizeInfo when a new column is added - see syncColumnGroupsSize()
            map(e => this.grid.columnApi.visibleColumns.reduce((p, c) => { var _a, _b; return (_b = p + ((_a = c.sizeInfo) === null || _a === void 0 ? void 0 : _a.width)) !== null && _b !== void 0 ? _b : 0; }, 0)));
        }
        return this._totalColumnWidthChange;
    }
    /**
     * Returns the `PblColumn` at the specified index from the list of rendered columns (i.e. not hidden).
     */
    findColumnAt(renderColumnIndex) {
        return this.store.visibleColumns[renderColumnIndex];
    }
    /**
     * Returns the column matching provided `id`.
     *
     * The search is performed on all known columns.
     */
    findColumn(id) {
        const result = this.store.find(id);
        if (result) {
            return result.data;
        }
    }
    /**
    * Returns the render index of column or -1 if not found.
    *
    * The render index represents the current location of the column in the group of visible columns.
    */
    renderIndexOf(column) {
        const c = typeof column === 'string' ? this.findColumn(column) : column;
        return this.store.visibleColumns.indexOf(c);
    }
    /**
     * Returns the index of a column or -1 if not found.
     */
    indexOf(column) {
        const c = typeof column === 'string' ? this.findColumn(column) : column;
        return this.store.allColumns.indexOf(c);
    }
    isColumnHidden(column) {
        return this.store.isColumnHidden(column);
    }
    /**
     * Hide columns in the table
     */
    hideColumns(column, ...columns) {
        this.store.updateColumnVisibility([column, ...columns]);
    }
    showColumns(columnOrShowAll, ...columns) {
        if (columnOrShowAll === true) {
            this.store.clearColumnVisibility();
        }
        else {
            this.store.updateColumnVisibility(undefined, [columnOrShowAll, ...columns]);
        }
    }
    /**
     * Update the width of the column with the provided width.
     *
     * The width is set in px or % in the following format: ##% or ##px
     * Examples: '50%', '50px'
     *
     * Resizing the column will trigger a table width resizing event, updating column group if necessary.
     */
    resizeColumn(column, width) {
        column.updateWidth(width);
        // this.grid.resetColumnsWidth();
        // this.grid.resizeColumns();
    }
    /**
     * Resize the column to best fit it's content.
     *
     * - Content: All of the cells rendered for this column (header, data and footer cells).
     * - Best fit: The width of the cell with the height width measured.
     *
     * The best fit found (width) is then used to call `resizeColumn()`.
     */
    autoSizeColumn(column) {
        const size = this.findColumnAutoSize(column);
        this.resizeColumn(column, `${size}px`);
    }
    autoSizeColumns(...columns) {
        const cols = columns.length > 0 ? columns : this.visibleColumns;
        for (const column of cols) {
            const size = this.findColumnAutoSize(column);
            column.updateWidth(`${size}px`);
        }
        // this.grid.resetColumnsWidth();
        // this.grid.resizeColumns();
    }
    /**
     * For each visible column in the table, resize the width to a proportional width relative to the total width provided.
     */
    autoSizeToFit(totalWidth, options = {}) {
        const wLogic = this.extApi.widthCalc.dynamicColumnWidth;
        const { visibleColumns } = this;
        const columnBehavior = options.columnBehavior || (() => options);
        let overflowTotalWidth = 0;
        let totalMinWidth = 0;
        const withMinWidth = [];
        const widthBreakouts = visibleColumns.map((column, index) => {
            const widthBreakout = wLogic.widthBreakout(column.sizeInfo);
            const instructions = Object.assign(Object.assign({}, (columnBehavior(column) || {})), options);
            overflowTotalWidth += widthBreakout.content;
            totalWidth -= widthBreakout.nonContent;
            if (instructions.keepMinWidth && column.minWidth) {
                totalMinWidth += column.minWidth;
                withMinWidth.push(index);
            }
            return Object.assign(Object.assign({}, widthBreakout), { instructions });
        });
        const p = totalMinWidth / totalWidth;
        const level = (overflowTotalWidth * p - totalMinWidth) / (1 - p);
        for (const i of withMinWidth) {
            const addition = level * (visibleColumns[i].minWidth / totalMinWidth);
            widthBreakouts[i].content += addition;
            overflowTotalWidth += addition;
        }
        for (let i = 0; i < visibleColumns.length; i++) {
            const widthBreakout = widthBreakouts[i];
            const instructions = widthBreakout.instructions;
            const column = visibleColumns[i];
            const r = widthBreakout.content / overflowTotalWidth;
            if (!instructions.keepMinWidth || !column.minWidth) {
                column.minWidth = undefined;
            }
            if (!instructions.keepMaxWidth || !column.maxWidth) {
                column.maxWidth = undefined;
                column.checkMaxWidthLock(column.sizeInfo.width); // if its locked, we need to release...
            }
            // There are 3 scenarios when updating the column
            // 1) if it's a fixed width or we're force into fixed width
            // 2) Not fixed width and width is set (%)
            // 3) Not fixed width an width is not set ( the width depends on the calculated `defaultWidth` done in `this.grid.resetColumnsWidth()` )
            let width;
            const { forceWidthType } = instructions;
            if (forceWidthType === 'px' || (!forceWidthType && column.isFixedWidth)) { // (1)
                width = `${totalWidth * r}px`;
            }
            else if (forceWidthType === '%' || (!forceWidthType && column.width)) { // (2)
                width = `${100 * r}%`;
            } // else (3) -> the update is skipped and it will run through resetColumnsWidth
            if (width) {
                column.updateWidth(width);
            }
        }
        // we now reset the column widths, this will calculate a new `defaultWidth` and set it in all columns but the relevant ones are column from (3)
        // It will also mark all columnDefs for check
        this.extApi.widthCalc.resetColumnsWidth();
        this.extApi.widthCalc.calcColumnWidth();
    }
    moveColumn(column, anchor) {
        if (isPblColumn(anchor)) {
            return column === anchor ? false : this.store.moveColumn(column, anchor);
        }
        else {
            const a = this.findColumnAt(anchor);
            return a ? this.moveColumn(column, a) : false;
        }
    }
    /**
     * Swap positions between 2 existing columns.
     */
    swapColumns(col1, col2) {
        return this.store.swapColumns(col1, col2);
    }
    addGroupBy(...column) { this.store.addGroupBy(...column); }
    removeGroupBy(...column) { this.store.removeGroupBy(...column); }
    findColumnAutoSize(column) {
        const { columnDef } = column;
        const cells = columnDef.queryCellElements();
        for (let i = 0, len = cells.length; i < len; i++) {
            const parentRow = this.extApi.rowsApi.findRowByElement(cells[i].parentElement);
            if (parentRow.rowType === 'header' && parentRow.gridWidthRow) {
                cells.splice(i, 1);
                break;
            }
        }
        let size = 0;
        let internalWidth;
        for (const c of cells) {
            if (c.childElementCount <= 1) {
                const element = (c.firstElementChild || c);
                internalWidth = element.scrollWidth;
            }
            else {
                internalWidth = 0;
                let el = c.firstElementChild;
                do {
                    switch (getComputedStyle(el).position) {
                        case 'sticky':
                        case 'absolute':
                        case 'fixed':
                            break;
                        default:
                            internalWidth += el.scrollWidth;
                            break;
                    }
                } while (el = el.nextElementSibling);
            }
            if (internalWidth > size) {
                size = internalWidth + 1;
                // we add 1 pixel because `element.scrollWidth` does not support subpixel values, the width is converted to an integer removing subpixel values (fractions).
            }
        }
        return size;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLWFwaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmdyaWQvc3JjL2xpYi9ncmlkL2NvbHVtbi9tYW5hZ2VtZW50L2NvbHVtbi1hcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUluRCxPQUFPLEVBQWEsV0FBVyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFJekQsTUFBTSxPQUFPLFNBQVM7SUF1Q3BCLGdCQUF3QixDQUFDO0lBckN6QixnRkFBZ0Y7SUFDaEYsd0lBQXdJO0lBQ3hJLDBGQUEwRjtJQUMxRix5R0FBeUc7SUFDekcsTUFBTSxDQUFDLE1BQU0sQ0FBSSxNQUE0QjtRQUMzQyxNQUFNLFFBQVEsR0FBRyxJQUFJLFNBQVMsRUFBSyxDQUFDO1FBRXBDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztRQUM1QixRQUFRLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7UUFDcEMsUUFBUSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFFekIsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQztJQUVELElBQUksZ0JBQWdCLEtBQWUsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztJQUN4RSxJQUFJLGVBQWUsS0FBZSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztJQUN0RSxJQUFJLGNBQWMsS0FBa0IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7SUFDdkUsSUFBSSxPQUFPLEtBQWtCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQzVELElB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NEpBQTRKO2FBQzdKO1NBQ0Y7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgT05fUkVTSVpFX1JPVyB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQvY29yZSc7XG5pbXBvcnQgeyBfUGJsTmdyaWRDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi90b2tlbnMnO1xuaW1wb3J0IHsgUGJsTmdyaWRFeHRlbnNpb25BcGkgfSBmcm9tICcuLi8uLi8uLi9leHQvZ3JpZC1leHQtYXBpJztcbmltcG9ydCB7IFBibE5ncmlkQ29sdW1uUm93Q29tcG9uZW50IH0gZnJvbSAnLi4vLi4vcm93L2NvbHVtbnMtcm93LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQYmxDb2x1bW4sIGlzUGJsQ29sdW1uIH0gZnJvbSAnLi4vbW9kZWwvY29sdW1uJztcbmltcG9ydCB7IFBibENvbHVtblN0b3JlIH0gZnJvbSAnLi9jb2x1bW4tc3RvcmUnO1xuaW1wb3J0IHsgQXV0b1NpemVUb0ZpdE9wdGlvbnMgfSBmcm9tICcuL3R5cGVzJztcblxuZXhwb3J0IGNsYXNzIENvbHVtbkFwaTxUPiB7XG5cbiAgLy8gd29ya2Fyb3VuZCwgd2UgbmVlZCBhIHBhcmFtZXRlci1sZXNzIGNvbnN0cnVjdG9yIHNpbmNlIEBuZ3Rvb2xzL3dlYnBhY2tAOC4wLjRcbiAgLy8gTm9uIEBJbmplY3RhYmxlIGNsYXNzZXMgYXJlIG5vdyBnZXR0aW5nIGFkZGRlZCB3aXRoIGhhcmQgcmVmZXJlbmNlIHRvIHRoZSBjdG9yIHBhcmFtcyB3aGljaCBhdCB0aGUgY2xhc3MgY3JlYXRpb24gcG9pbnQgYXJlIHVuZGVmaW5lZFxuICAvLyBmb3J3YXJkUmVmKCkgd2lsbCBub3QgaGVscCBzaW5jZSBpdCdzIG5vdCBpbmplY3QgYnkgYW5ndWxhciwgd2UgaW5zdGFudGlhdGUgdGhlIGNsYXNzLi5cbiAgLy8gcHJvYmFibHkgZHVlIHRvIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXItY2xpL2NvbW1pdC82MzkxOTg0OTk5NzNlMGY0MzdmMDU5YjNjOTMzYzcyYzczM2Q5M2Q4XG4gIHN0YXRpYyBjcmVhdGU8VD4oZXh0QXBpOiBQYmxOZ3JpZEV4dGVuc2lvbkFwaSk6IENvbHVtbkFwaTxUPiB7XG4gICAgY29uc3QgaW5zdGFuY2UgPSBuZXcgQ29sdW1uQXBpPFQ+KCk7XG5cbiAgICBpbnN0YW5jZS5ncmlkID0gZXh0QXBpLmdyaWQ7XG4gICAgaW5zdGFuY2Uuc3RvcmUgPSBleHRBcGkuY29sdW1uU3RvcmU7XG4gICAgaW5zdGFuY2UuZXh0QXBpID0gZXh0QXBpO1xuXG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9XG5cbiAgZ2V0IHZpc2libGVDb2x1bW5JZHMoKTogc3RyaW5nW10geyByZXR1cm4gdGhpcy5zdG9yZS52aXNpYmxlQ29sdW1uSWRzOyB9XG4gIGdldCBoaWRkZW5Db2x1bW5JZHMoKTogc3RyaW5nW10geyByZXR1cm4gdGhpcy5zdG9yZS5oaWRkZW5Db2x1bW5JZHM7IH1cbiAgZ2V0IHZpc2libGVDb2x1bW5zKCk6IFBibENvbHVtbltdIHsgcmV0dXJuIHRoaXMuc3RvcmUudmlzaWJsZUNvbHVtbnM7IH1cbiAgZ2V0IGNvbHVtbnMoKTogUGJsQ29sdW1uW10geyByZXR1cm4gdGhpcy5zdG9yZS5hbGxDb2x1bW5zOyB9XG4gIGdldCBjb2x1bW5JZHMoKTogc3RyaW5nW10geyByZXR1cm4gdGhpcy5zdG9yZS5jb2x1bW5JZHM7IH1cblxuICBnZXQgdG90YWxDb2x1bW5XaWR0aENoYW5nZSgpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIGlmICghdGhpcy5fdG90YWxDb2x1bW5XaWR0aENoYW5nZSkge1xuICAgICAgdGhpcy5fdG90YWxDb2x1bW5XaWR0aENoYW5nZSA9IHRoaXMuZXh0QXBpLmV2ZW50c1xuICAgICAgICAucGlwZShcbiAgICAgICAgICBPTl9SRVNJWkVfUk9XLFxuICAgICAgICAgIC8vIFdlIG1pZ2h0IGdldCBhIG51bGwgc2l6ZUluZm8gd2hlbiBhIG5ldyBjb2x1bW4gaXMgYWRkZWQgLSBzZWUgc3luY0NvbHVtbkdyb3Vwc1NpemUoKVxuICAgICAgICAgIG1hcCggZSA9PiB0aGlzLmdyaWQuY29sdW1uQXBpLnZpc2libGVDb2x1bW5zLnJlZHVjZSggKHAsIGMpID0+IHAgKyBjLnNpemVJbmZvPy53aWR0aCA/PyAwLCAwICkgKSxcbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3RvdGFsQ29sdW1uV2lkdGhDaGFuZ2U7XG4gIH1cblxuICBwcml2YXRlIGdyaWQ6IF9QYmxOZ3JpZENvbXBvbmVudDxUPjtcbiAgcHJpdmF0ZSBzdG9yZTogUGJsQ29sdW1uU3RvcmU7XG4gIHByaXZhdGUgZXh0QXBpOiBQYmxOZ3JpZEV4dGVuc2lvbkFwaTtcbiAgcHJpdmF0ZSBfdG90YWxDb2x1bW5XaWR0aENoYW5nZTogT2JzZXJ2YWJsZTxudW1iZXI+O1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7IH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgYFBibENvbHVtbmAgYXQgdGhlIHNwZWNpZmllZCBpbmRleCBmcm9tIHRoZSBsaXN0IG9mIHJlbmRlcmVkIGNvbHVtbnMgKGkuZS4gbm90IGhpZGRlbikuXG4gICAqL1xuICBmaW5kQ29sdW1uQXQocmVuZGVyQ29sdW1uSW5kZXg6IG51bWJlcik6IFBibENvbHVtbiB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUudmlzaWJsZUNvbHVtbnNbcmVuZGVyQ29sdW1uSW5kZXhdO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGNvbHVtbiBtYXRjaGluZyBwcm92aWRlZCBgaWRgLlxuICAgKlxuICAgKiBUaGUgc2VhcmNoIGlzIHBlcmZvcm1lZCBvbiBhbGwga25vd24gY29sdW1ucy5cbiAgICovXG4gIGZpbmRDb2x1bW4oaWQ6IHN0cmluZyk6IFBibENvbHVtbiB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy5zdG9yZS5maW5kKGlkKTtcbiAgICBpZiAocmVzdWx0KSB7XG4gICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICogUmV0dXJucyB0aGUgcmVuZGVyIGluZGV4IG9mIGNvbHVtbiBvciAtMSBpZiBub3QgZm91bmQuXG4gICpcbiAgKiBUaGUgcmVuZGVyIGluZGV4IHJlcHJlc2VudHMgdGhlIGN1cnJlbnQgbG9jYXRpb24gb2YgdGhlIGNvbHVtbiBpbiB0aGUgZ3JvdXAgb2YgdmlzaWJsZSBjb2x1bW5zLlxuICAqL1xuICByZW5kZXJJbmRleE9mKGNvbHVtbjogc3RyaW5nIHwgUGJsQ29sdW1uKTogbnVtYmVyIHtcbiAgICBjb25zdCBjID0gdHlwZW9mIGNvbHVtbiA9PT0gJ3N0cmluZycgPyB0aGlzLmZpbmRDb2x1bW4oY29sdW1uKSA6IGNvbHVtbjtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS52aXNpYmxlQ29sdW1ucy5pbmRleE9mKGMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGluZGV4IG9mIGEgY29sdW1uIG9yIC0xIGlmIG5vdCBmb3VuZC5cbiAgICovXG4gIGluZGV4T2YoY29sdW1uOiBzdHJpbmcgfCBQYmxDb2x1bW4pOiBudW1iZXIge1xuICAgIGNvbnN0IGMgPSB0eXBlb2YgY29sdW1uID09PSAnc3RyaW5nJyA/IHRoaXMuZmluZENvbHVtbihjb2x1bW4pIDogY29sdW1uO1xuICAgIHJldHVybiB0aGlzLnN0b3JlLmFsbENvbHVtbnMuaW5kZXhPZihjKTtcbiAgfVxuXG4gIGlzQ29sdW1uSGlkZGVuKGNvbHVtbjogUGJsQ29sdW1uKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuaXNDb2x1bW5IaWRkZW4oY29sdW1uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIaWRlIGNvbHVtbnMgaW4gdGhlIHRhYmxlXG4gICAqL1xuICBoaWRlQ29sdW1ucyhjb2x1bW46IFBibENvbHVtbiB8IHN0cmluZywgIC4uLmNvbHVtbnM6IFBibENvbHVtbltdIHwgc3RyaW5nW10pOiB2b2lkIHtcbiAgICB0aGlzLnN0b3JlLnVwZGF0ZUNvbHVtblZpc2liaWxpdHkoW2NvbHVtbiwgLi4uY29sdW1uc10gYXMgUGJsQ29sdW1uW10gfCBzdHJpbmdbXSk7XG4gIH1cblxuICAvKipcbiAgICogQ2hhbmdlIHRoZSB2aXNpYmlsaXR5IHN0YXRlIG9mIHRoZSBwcm92aWRlZCBjb2x1bW5zIHRvIHZpc2libGUuXG4gICAqIElmIG5vIGNvbHVtbnMgYXJlIHByb3ZpZGVkIGFsbCBjb2x1bW5zXG4gICAqL1xuICBzaG93Q29sdW1ucyhzaG93QWxsOiB0cnVlKTogdm9pZDtcbiAgc2hvd0NvbHVtbnMoY29sdW1uOiBQYmxDb2x1bW4gfCBzdHJpbmcsICAuLi5jb2x1bW5zOiBQYmxDb2x1bW5bXSB8IHN0cmluZ1tdKTogdm9pZDtcbiAgc2hvd0NvbHVtbnMoY29sdW1uT3JTaG93QWxsOiBQYmxDb2x1bW4gfCBzdHJpbmcgfCB0cnVlLCAgLi4uY29sdW1uczogUGJsQ29sdW1uW10gfCBzdHJpbmdbXSk6IHZvaWQge1xuICAgIGlmIChjb2x1bW5PclNob3dBbGwgPT09IHRydWUpIHtcbiAgICAgIHRoaXMuc3RvcmUuY2xlYXJDb2x1bW5WaXNpYmlsaXR5KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RvcmUudXBkYXRlQ29sdW1uVmlzaWJpbGl0eSh1bmRlZmluZWQsIFtjb2x1bW5PclNob3dBbGwsIC4uLmNvbHVtbnNdIGFzIFBibENvbHVtbltdIHwgc3RyaW5nW10pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIHdpZHRoIG9mIHRoZSBjb2x1bW4gd2l0aCB0aGUgcHJvdmlkZWQgd2lkdGguXG4gICAqXG4gICAqIFRoZSB3aWR0aCBpcyBzZXQgaW4gcHggb3IgJSBpbiB0aGUgZm9sbG93aW5nIGZvcm1hdDogIyMlIG9yICMjcHhcbiAgICogRXhhbXBsZXM6ICc1MCUnLCAnNTBweCdcbiAgICpcbiAgICogUmVzaXppbmcgdGhlIGNvbHVtbiB3aWxsIHRyaWdnZXIgYSB0YWJsZSB3aWR0aCByZXNpemluZyBldmVudCwgdXBkYXRpbmcgY29sdW1uIGdyb3VwIGlmIG5lY2Vzc2FyeS5cbiAgICovXG4gIHJlc2l6ZUNvbHVtbihjb2x1bW46IFBibENvbHVtbiwgd2lkdGg6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbHVtbi51cGRhdGVXaWR0aCh3aWR0aCk7XG4gICAgLy8gdGhpcy5ncmlkLnJlc2V0Q29sdW1uc1dpZHRoKCk7XG4gICAgLy8gdGhpcy5ncmlkLnJlc2l6ZUNvbHVtbnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNpemUgdGhlIGNvbHVtbiB0byBiZXN0IGZpdCBpdCdzIGNvbnRlbnQuXG4gICAqXG4gICAqIC0gQ29udGVudDogQWxsIG9mIHRoZSBjZWxscyByZW5kZXJlZCBmb3IgdGhpcyBjb2x1bW4gKGhlYWRlciwgZGF0YSBhbmQgZm9vdGVyIGNlbGxzKS5cbiAgICogLSBCZXN0IGZpdDogVGhlIHdpZHRoIG9mIHRoZSBjZWxsIHdpdGggdGhlIGhlaWdodCB3aWR0aCBtZWFzdXJlZC5cbiAgICpcbiAgICogVGhlIGJlc3QgZml0IGZvdW5kICh3aWR0aCkgaXMgdGhlbiB1c2VkIHRvIGNhbGwgYHJlc2l6ZUNvbHVtbigpYC5cbiAgICovXG4gIGF1dG9TaXplQ29sdW1uKGNvbHVtbjogUGJsQ29sdW1uKTogdm9pZCB7XG4gICAgY29uc3Qgc2l6ZSA9IHRoaXMuZmluZENvbHVtbkF1dG9TaXplKGNvbHVtbik7XG4gICAgdGhpcy5yZXNpemVDb2x1bW4oY29sdW1uLCBgJHtzaXplfXB4YCk7XG4gIH1cblxuICAvKipcbiAgICogRm9yIGVhY2ggdmlzaWJsZSBjb2x1bW4gaW4gdGhlIHRhYmxlLCByZXNpemUgdG8gYmVzdCBmaXQgaXQncyBjb250ZW50LlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIHNpbXBseSBydW4gYGF1dG9TaXplQ29sdW1uKClgIG9uIHRoZSB2aXNpYmxlIGNvbHVtbnMgaW4gdGhlIHRhYmxlLlxuICAgKi9cbiAgYXV0b1NpemVDb2x1bW5zKCk6IHZvaWQ7XG4gIC8qKlxuICAgKiBGb3IgZWFjaCBjb2x1bW4gaW4gdGhlIGxpc3Qgb2YgY29sdW1uIHByb3ZpZGVkLCByZXNpemUgdG8gYmVzdCBmaXQgaXQncyBjb250ZW50LlxuICAgKlxuICAgKiBNYWtlIHN1cmUgeW91IGFyZSBub3QgcmVzaXppbmcgYW4gaGlkZGVuIGNvbHVtbi5cbiAgICogVGhpcyBtZXRob2Qgd2lsbCBzaW1wbHkgcnVuIGBhdXRvU2l6ZUNvbHVtbigpYCBvbiB0aGUgY29sdW1ucyBwcm92aWRlZC5cbiAgICovXG4gIGF1dG9TaXplQ29sdW1ucyguLi5jb2x1bW5zOiBQYmxDb2x1bW5bXSk6IHZvaWQ7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6dW5pZmllZC1zaWduYXR1cmVzXG4gIGF1dG9TaXplQ29sdW1ucyguLi5jb2x1bW5zOiBQYmxDb2x1bW5bXSk6IHZvaWQge1xuICAgIGNvbnN0IGNvbHMgPSBjb2x1bW5zLmxlbmd0aCA+IDAgPyBjb2x1bW5zIDogdGhpcy52aXNpYmxlQ29sdW1ucztcbiAgICBmb3IgKGNvbnN0IGNvbHVtbiBvZiBjb2xzKSB7XG4gICAgICBjb25zdCBzaXplID0gdGhpcy5maW5kQ29sdW1uQXV0b1NpemUoY29sdW1uKTtcbiAgICAgIGNvbHVtbi51cGRhdGVXaWR0aChgJHtzaXplfXB4YCk7XG4gICAgfVxuICAgIC8vIHRoaXMuZ3JpZC5yZXNldENvbHVtbnNXaWR0aCgpO1xuICAgIC8vIHRoaXMuZ3JpZC5yZXNpemVDb2x1bW5zKCk7XG4gIH1cblxuICAvKipcbiAgICogRm9yIGVhY2ggdmlzaWJsZSBjb2x1bW4gaW4gdGhlIHRhYmxlLCByZXNpemUgdGhlIHdpZHRoIHRvIGEgcHJvcG9ydGlvbmFsIHdpZHRoIHJlbGF0aXZlIHRvIHRoZSB0b3RhbCB3aWR0aCBwcm92aWRlZC5cbiAgICovXG4gIGF1dG9TaXplVG9GaXQodG90YWxXaWR0aDogbnVtYmVyLCBvcHRpb25zOiBBdXRvU2l6ZVRvRml0T3B0aW9ucyA9IHt9KTogdm9pZCB7XG4gICAgY29uc3Qgd0xvZ2ljID0gdGhpcy5leHRBcGkud2lkdGhDYWxjLmR5bmFtaWNDb2x1bW5XaWR0aDtcbiAgICBjb25zdCB7IHZpc2libGVDb2x1bW5zIH0gPSB0aGlzO1xuICAgIGNvbnN0IGNvbHVtbkJlaGF2aW9yOiBBdXRvU2l6ZVRvRml0T3B0aW9uc1snY29sdW1uQmVoYXZpb3InXSA9IG9wdGlvbnMuY29sdW1uQmVoYXZpb3IgfHwgKCAoKSA9PiBvcHRpb25zICkgYXMgYW55O1xuXG4gICAgbGV0IG92ZXJmbG93VG90YWxXaWR0aCA9IDA7XG4gICAgbGV0IHRvdGFsTWluV2lkdGggPSAwO1xuXG4gICAgY29uc3Qgd2l0aE1pbldpZHRoOiBudW1iZXJbXSA9IFtdO1xuXG4gICAgY29uc3Qgd2lkdGhCcmVha291dHMgPSB2aXNpYmxlQ29sdW1ucy5tYXAoIChjb2x1bW4sIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCB3aWR0aEJyZWFrb3V0ID0gd0xvZ2ljLndpZHRoQnJlYWtvdXQoY29sdW1uLnNpemVJbmZvKTtcbiAgICAgIGNvbnN0IGluc3RydWN0aW9ucyA9IHsgLi4uKGNvbHVtbkJlaGF2aW9yKGNvbHVtbikgfHwge30pLCAuLi5vcHRpb25zIH07XG5cbiAgICAgIG92ZXJmbG93VG90YWxXaWR0aCArPSB3aWR0aEJyZWFrb3V0LmNvbnRlbnQ7XG4gICAgICB0b3RhbFdpZHRoIC09IHdpZHRoQnJlYWtvdXQubm9uQ29udGVudDtcblxuICAgICAgaWYgKGluc3RydWN0aW9ucy5rZWVwTWluV2lkdGggJiYgY29sdW1uLm1pbldpZHRoKSB7XG4gICAgICAgIHRvdGFsTWluV2lkdGggKz0gY29sdW1uLm1pbldpZHRoO1xuICAgICAgICB3aXRoTWluV2lkdGgucHVzaChpbmRleCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7IC4uLndpZHRoQnJlYWtvdXQsIGluc3RydWN0aW9ucyB9O1xuICAgIH0pO1xuXG4gICAgY29uc3QgcCA9IHRvdGFsTWluV2lkdGggLyB0b3RhbFdpZHRoO1xuICAgIGNvbnN0IGxldmVsID0gKG92ZXJmbG93VG90YWxXaWR0aCAqIHAgIC0gdG90YWxNaW5XaWR0aCkgLyAoMSAtIHApO1xuICAgIGZvciAoY29uc3QgaSBvZiB3aXRoTWluV2lkdGgpIHtcbiAgICAgIGNvbnN0IGFkZGl0aW9uID0gbGV2ZWwgKiAodmlzaWJsZUNvbHVtbnNbaV0ubWluV2lkdGggLyB0b3RhbE1pbldpZHRoKVxuICAgICAgd2lkdGhCcmVha291dHNbaV0uY29udGVudCArPSBhZGRpdGlvbjtcbiAgICAgIG92ZXJmbG93VG90YWxXaWR0aCArPSBhZGRpdGlvbjtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZpc2libGVDb2x1bW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCB3aWR0aEJyZWFrb3V0ID0gd2lkdGhCcmVha291dHNbaV07XG4gICAgICBjb25zdCBpbnN0cnVjdGlvbnMgPSB3aWR0aEJyZWFrb3V0Lmluc3RydWN0aW9ucztcbiAgICAgIGNvbnN0IGNvbHVtbiA9IHZpc2libGVDb2x1bW5zW2ldO1xuXG4gICAgICBjb25zdCByID0gd2lkdGhCcmVha291dC5jb250ZW50IC8gb3ZlcmZsb3dUb3RhbFdpZHRoO1xuXG4gICAgICBpZiAoIWluc3RydWN0aW9ucy5rZWVwTWluV2lkdGggfHwgIWNvbHVtbi5taW5XaWR0aCkge1xuICAgICAgICBjb2x1bW4ubWluV2lkdGggPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICBpZiAoIWluc3RydWN0aW9ucy5rZWVwTWF4V2lkdGggfHwgIWNvbHVtbi5tYXhXaWR0aCkge1xuICAgICAgICBjb2x1bW4ubWF4V2lkdGggPSB1bmRlZmluZWQ7XG4gICAgICAgIGNvbHVtbi5jaGVja01heFdpZHRoTG9jayhjb2x1bW4uc2l6ZUluZm8ud2lkdGgpOyAvLyBpZiBpdHMgbG9ja2VkLCB3ZSBuZWVkIHRvIHJlbGVhc2UuLi5cbiAgICAgIH1cblxuICAgICAgLy8gVGhlcmUgYXJlIDMgc2NlbmFyaW9zIHdoZW4gdXBkYXRpbmcgdGhlIGNvbHVtblxuICAgICAgLy8gMSkgaWYgaXQncyBhIGZpeGVkIHdpZHRoIG9yIHdlJ3JlIGZvcmNlIGludG8gZml4ZWQgd2lkdGhcbiAgICAgIC8vIDIpIE5vdCBmaXhlZCB3aWR0aCBhbmQgd2lkdGggaXMgc2V0ICglKVxuICAgICAgLy8gMykgTm90IGZpeGVkIHdpZHRoIGFuIHdpZHRoIGlzIG5vdCBzZXQgKCB0aGUgd2lkdGggZGVwZW5kcyBvbiB0aGUgY2FsY3VsYXRlZCBgZGVmYXVsdFdpZHRoYCBkb25lIGluIGB0aGlzLmdyaWQucmVzZXRDb2x1bW5zV2lkdGgoKWAgKVxuICAgICAgbGV0IHdpZHRoOiBzdHJpbmc7XG4gICAgICBjb25zdCB7IGZvcmNlV2lkdGhUeXBlIH0gPSBpbnN0cnVjdGlvbnM7XG4gICAgICBpZiAoZm9yY2VXaWR0aFR5cGUgPT09ICdweCcgfHwgKCFmb3JjZVdpZHRoVHlwZSAmJiBjb2x1bW4uaXNGaXhlZFdpZHRoKSkgeyAvLyAoMSlcbiAgICAgICAgd2lkdGggPSBgJHt0b3RhbFdpZHRoICogcn1weGA7XG4gICAgICB9IGVsc2UgaWYgKGZvcmNlV2lkdGhUeXBlID09PSAnJScgfHwgKCFmb3JjZVdpZHRoVHlwZSAmJiBjb2x1bW4ud2lkdGgpKSB7IC8vICgyKVxuICAgICAgICB3aWR0aCA9IGAkezEwMCAqIHJ9JWA7XG4gICAgICB9IC8vIGVsc2UgKDMpIC0+IHRoZSB1cGRhdGUgaXMgc2tpcHBlZCBhbmQgaXQgd2lsbCBydW4gdGhyb3VnaCByZXNldENvbHVtbnNXaWR0aFxuXG4gICAgICBpZiAod2lkdGgpIHtcbiAgICAgICAgY29sdW1uLnVwZGF0ZVdpZHRoKHdpZHRoKTtcbiAgICAgIH1cblxuICAgIH1cbiAgICAvLyB3ZSBub3cgcmVzZXQgdGhlIGNvbHVtbiB3aWR0aHMsIHRoaXMgd2lsbCBjYWxjdWxhdGUgYSBuZXcgYGRlZmF1bHRXaWR0aGAgYW5kIHNldCBpdCBpbiBhbGwgY29sdW1ucyBidXQgdGhlIHJlbGV2YW50IG9uZXMgYXJlIGNvbHVtbiBmcm9tICgzKVxuICAgIC8vIEl0IHdpbGwgYWxzbyBtYXJrIGFsbCBjb2x1bW5EZWZzIGZvciBjaGVja1xuICAgIHRoaXMuZXh0QXBpLndpZHRoQ2FsYy5yZXNldENvbHVtbnNXaWR0aCgpO1xuICAgIHRoaXMuZXh0QXBpLndpZHRoQ2FsYy5jYWxjQ29sdW1uV2lkdGgoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNb3ZlIHRoZSBwcm92aWRlZCBgY29sdW1uYCB0byB0aGUgcG9zaXRpb24gb2YgdGhlIGBhbmNob3JgIGNvbHVtbi5cbiAgICogVGhlIG5ldyBsb2NhdGlvbiBvZiB0aGUgYW5jaG9yIGNvbHVtbiB3aWxsIGJlIGl0J3Mgb3JpZ2luYWwgbG9jYXRpb24gcGx1cyBvciBtaW51cyAxLCBkZXBlbmRpbmcgb24gdGhlIGRlbHRhIGJldHdlZW5cbiAgICogdGhlIGNvbHVtbnMuIElmIHRoZSBvcmlnaW4gb2YgdGhlIGBjb2x1bW5gIGlzIGJlZm9yZSB0aGUgYGFuY2hvcmAgdGhlbiB0aGUgYW5jaG9yJ3MgbmV3IHBvc2l0aW9uIGlzIG1pbnVzIG9uZSwgb3RoZXJ3aXNlIHBsdXMgMS5cbiAgICovXG4gIG1vdmVDb2x1bW4oY29sdW1uOiBQYmxDb2x1bW4sIGFuY2hvcjogUGJsQ29sdW1uKTogYm9vbGVhbjtcbiAgICAvKipcbiAgICogTW92ZSB0aGUgcHJvdmlkZWQgYGNvbHVtbmAgdG8gdGhlIHBvc2l0aW9uIG9mIHRoZSBjb2x1bW4gYXQgYHJlbmRlckNvbHVtbkluZGV4YC5cbiAgICogYHJlbmRlckNvbHVtbkluZGV4YCBtdXN0IGJlIGEgdmlzaWJsZSBjb2x1bW4gKGkuZS4gbm90IGhpZGRlbilcbiAgICovXG4gIG1vdmVDb2x1bW4oY29sdW1uOiBQYmxDb2x1bW4sIHJlbmRlckNvbHVtbkluZGV4OiBudW1iZXIpOiBib29sZWFuOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOnVuaWZpZWQtc2lnbmF0dXJlc1xuICBtb3ZlQ29sdW1uKGNvbHVtbjogUGJsQ29sdW1uLCBhbmNob3I6IFBibENvbHVtbiB8IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIGlmIChpc1BibENvbHVtbihhbmNob3IpKSB7XG4gICAgICByZXR1cm4gY29sdW1uID09PSBhbmNob3IgPyBmYWxzZSA6IHRoaXMuc3RvcmUubW92ZUNvbHVtbihjb2x1bW4sIGFuY2hvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGEgPSB0aGlzLmZpbmRDb2x1bW5BdChhbmNob3IpO1xuICAgICAgcmV0dXJuIGEgPyB0aGlzLm1vdmVDb2x1bW4oY29sdW1uLCBhKSA6IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTd2FwIHBvc2l0aW9ucyBiZXR3ZWVuIDIgZXhpc3RpbmcgY29sdW1ucy5cbiAgICovXG4gIHN3YXBDb2x1bW5zKGNvbDE6IFBibENvbHVtbiwgY29sMjogUGJsQ29sdW1uKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuc3dhcENvbHVtbnMoY29sMSwgY29sMik7XG4gIH1cblxuICBhZGRHcm91cEJ5KC4uLmNvbHVtbjogUGJsQ29sdW1uW10pOiB2b2lkIHsgdGhpcy5zdG9yZS5hZGRHcm91cEJ5KC4uLmNvbHVtbik7IH1cbiAgcmVtb3ZlR3JvdXBCeSguLi5jb2x1bW46IFBibENvbHVtbltdKTogdm9pZCB7IHRoaXMuc3RvcmUucmVtb3ZlR3JvdXBCeSguLi5jb2x1bW4pOyB9XG5cbiAgcHJpdmF0ZSBmaW5kQ29sdW1uQXV0b1NpemUoY29sdW1uOiBQYmxDb2x1bW4pOiBudW1iZXIge1xuICAgIGNvbnN0IHsgY29sdW1uRGVmIH0gPSBjb2x1bW47XG4gICAgY29uc3QgY2VsbHMgPSBjb2x1bW5EZWYucXVlcnlDZWxsRWxlbWVudHMoKTtcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gY2VsbHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGNvbnN0IHBhcmVudFJvdyA9IHRoaXMuZXh0QXBpLnJvd3NBcGkuZmluZFJvd0J5RWxlbWVudChjZWxsc1tpXS5wYXJlbnRFbGVtZW50KTtcbiAgICAgIGlmIChwYXJlbnRSb3cucm93VHlwZSA9PT0gJ2hlYWRlcicgJiYgKHBhcmVudFJvdyBhcyB1bmtub3duIGFzIFBibE5ncmlkQ29sdW1uUm93Q29tcG9uZW50KS5ncmlkV2lkdGhSb3cpIHtcbiAgICAgICAgY2VsbHMuc3BsaWNlKGksIDEpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgc2l6ZSA9IDA7XG4gICAgbGV0IGludGVybmFsV2lkdGg6IG51bWJlcjtcbiAgICBmb3IgKGNvbnN0IGMgb2YgY2VsbHMpIHtcbiAgICAgIGlmIChjLmNoaWxkRWxlbWVudENvdW50IDw9IDEpIHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IChjLmZpcnN0RWxlbWVudENoaWxkIHx8IGMpIGFzIEhUTUxFbGVtZW50O1xuICAgICAgICBpbnRlcm5hbFdpZHRoID0gZWxlbWVudC5zY3JvbGxXaWR0aDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGludGVybmFsV2lkdGggPSAwO1xuICAgICAgICBsZXQgZWw6IEVsZW1lbnQgPSBjLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgc3dpdGNoIChnZXRDb21wdXRlZFN0eWxlKGVsKS5wb3NpdGlvbikge1xuICAgICAgICAgICAgY2FzZSAnc3RpY2t5JzpcbiAgICAgICAgICAgIGNhc2UgJ2Fic29sdXRlJzpcbiAgICAgICAgICAgIGNhc2UgJ2ZpeGVkJzpcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICBpbnRlcm5hbFdpZHRoICs9IGVsLnNjcm9sbFdpZHRoO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH0gd2hpbGUgKGVsID0gZWwubmV4dEVsZW1lbnRTaWJsaW5nKVxuICAgICAgfVxuICAgICAgaWYgKGludGVybmFsV2lkdGggPiBzaXplKSB7XG4gICAgICAgIHNpemUgPSBpbnRlcm5hbFdpZHRoICsgMTtcbiAgICAgICAgLy8gd2UgYWRkIDEgcGl4ZWwgYmVjYXVzZSBgZWxlbWVudC5zY3JvbGxXaWR0aGAgZG9lcyBub3Qgc3VwcG9ydCBzdWJwaXhlbCB2YWx1ZXMsIHRoZSB3aWR0aCBpcyBjb252ZXJ0ZWQgdG8gYW4gaW50ZWdlciByZW1vdmluZyBzdWJwaXhlbCB2YWx1ZXMgKGZyYWN0aW9ucykuXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzaXplO1xuICB9XG59XG4iXX0=