// tslint:disable:use-host-property-decorator
// tslint:disable:directive-class-suffix
import { Directive, Input, Inject, Output, EventEmitter, } from '@angular/core';
import { CdkColumnDef } from '@angular/cdk/table';
import { uniqueColumnCss } from '../../utils/unique-column-css';
import { EXT_API_TOKEN } from '../../../ext/grid-ext-api';
import { isPblColumn } from '../model';
import { widthBreakout } from '../width-logic/dynamic-column-width';
import * as i0 from "@angular/core";
/**
 * Represents a runtime column definition for a user-defined column definitions.
 *
 * User defined column definitions are `PblColumn`, `PblMetaColumn`, `PblColumnGroup` etc...
 * They represent static column definitions and `PblNgridColumnDef` is the runtime instance of them.
 *
 */
export class PblNgridColumnDef extends CdkColumnDef {
    constructor(extApi) {
        super();
        this.extApi = extApi;
        this.isDragging = false;
        /**
         * An event emitted when width of this column has changed.
         */
        this.widthChange = new EventEmitter();
        /**
         * The complete width definition for the column.
         *
         * There are 2 width sets (tuple):
         * - [0]: The source width definitions as set in static column definition instance
         * - [1]: The absolute width definitions, as currently set in the DOM (getBoundingClientRect())
         *
         * Each set is made up of 3 primitive width definitions: MIN-WIDTH, WIDTH and MAX-WIDTH.
         * The tuple represents them in that order, i.e: [ MIN-WIDTH, WIDTH, MAX-WIDTH ]
         */
        this._widths = [];
        this.grid = extApi.grid;
        const { strategy } = extApi.widthCalc.dynamicColumnWidth;
        this.widthBreakout = c => widthBreakout(strategy, c);
    }
    get column() { return this._column; }
    ;
    set column(value) { this.attach(value); }
    /**
     * The absolute width definitions, as currently set in the DOM (getBoundingClientRect()).
     * If no measurements exists yet, return the user defined width's.
     *
     * The tuple represents them in that order, i.e: [ MIN-WIDTH, WIDTH, MAX-WIDTH ]
     */
    get widths() { return this._widths[1]; }
    /**
     * The last net width of the column.
     * The net width is the absolute width of the column, without padding, border etc...
     */
    get netWidth() { return this._netWidth; }
    /**
     * Update the "widths" for this column and when width has changed.
     *
     * The "widths" are the 3 values representing a width of a cell: [minWidth, width, maxWidth],
     * this method is given the width and will calculate the minWidth and maxWidth based on the column definitions.
     *
     * If at least one value of "widths" has changed, fires the `widthChange` event with the `reason` provided.
     *
     * The reason can be used to optionally update the relevant cells, based on the source (reason) of the update.
     * - attach: This runtime column definition instance was attached to a static column definition instance.
     * - update: The width value was updated in the static column definition instance , which triggered a width update to the runtime column definition instance
     * - resize: A resize event to the header PblColumn cell was triggered, the width of the static column definition is not updated, only the runtime value is.
     *
     * Note that this updates the width of the column-def instance, not the column definitions width itself.
     * Only when `reason === 'update'` it means that the column definition was updated and triggered this update
     *
     * @param width The new width
     * @param reason The reason for this change
     */
    updateWidth(width, reason) {
        const { isFixedWidth, parsedWidth } = this._column;
        /*  Setting the minimum width is based on the input.
            If the original width is pixel fixed we will take the maximum between it and the min width.
            If not, we will the take minWidth.
            If none of the above worked we will try to see if the current width is set with %, if so it will be our min width.
        */
        const minWidthPx = isFixedWidth
            ? Math.max(this._column.parsedWidth.value, this._column.minWidth || 0)
            : this._column.minWidth;
        let minWidth = minWidthPx && `${minWidthPx}px`;
        if (!minWidth && (parsedWidth === null || parsedWidth === void 0 ? void 0 : parsedWidth.type) === '%') {
            minWidth = width;
        }
        const maxWidth = isFixedWidth
            ? Math.min(this._column.parsedWidth.value, this._column.maxWidth || this._column.parsedWidth.value)
            : this._column.maxWidth;
        const newWidths = [minWidth || '', width, maxWidth ? `${maxWidth}px` : width];
        if (reason === 'resize') {
            this._widths[1] = newWidths;
            this.widthChange.emit({ reason });
        }
        else {
            const prev = this._widths[0] || [];
            this._widths[0] = newWidths;
            if (!this._widths[1]) {
                this._widths[1] = newWidths;
            }
            for (let i = 0; i < 3; i++) {
                if (prev[i] !== newWidths[i]) {
                    this.widthChange.emit({ reason });
                    break;
                }
            }
        }
    }
    /**
     * Apply the current absolute width definitions (minWidth, width, maxWidth) onto an element.
     */
    applyWidth(element) { setWidth(element, this.widths); }
    /**
     * Apply the source width definitions )set in static column definition instance) onto an element.
     */
    applySourceWidth(element) { setWidth(element, this._widths[0]); }
    /**
     * Query for cell elements related to this column definition.
     *
     * This query is not cached - cache in implementation.
     */
    queryCellElements(...filter) {
        const cssId = `.${uniqueColumnCss(this)}`;
        const query = [];
        if (filter.length === 0) {
            query.push(cssId);
        }
        else {
            for (const f of filter) {
                switch (f) {
                    case 'table':
                        query.push(`.pbl-ngrid-cell${cssId}`);
                        break;
                    case 'header':
                        query.push(`.pbl-ngrid-header-cell${cssId}:not(.pbl-header-group-cell)`);
                        break;
                    case 'headerGroup':
                        query.push(`.pbl-header-group-cell${cssId}`);
                        break;
                    case 'footer':
                        query.push(`.pbl-ngrid-footer-cell${cssId}:not(.pbl-footer-group-cell)`);
                        break;
                    case 'footerGroup':
                        query.push(`.pbl-footer-group-cell${cssId}`);
                        break;
                }
            }
        }
        // we query from the master table container and not CDKTable because of fixed meta rows
        return query.length === 0 ? [] : Array.from(this.extApi.element.querySelectorAll(query.join(', ')));
    }
    /** @internal */
    ngOnDestroy() {
        this.detach();
        this.widthChange.complete();
    }
    onResize() {
        if (isPblColumn(this.column)) {
            const prevNetWidth = this._netWidth;
            this._netWidth = this.widthBreakout(this.column.sizeInfo).content;
            if (prevNetWidth !== this._netWidth) {
                const width = `${this._netWidth}px`;
                this.updateWidth(width, 'resize');
            }
        }
    }
    updatePin(pin) {
        this.sticky = this.stickyEnd = false;
        switch (pin) {
            case 'start':
                this.sticky = true;
                break;
            case 'end':
                this.stickyEnd = true;
                break;
        }
        if (this.grid.isInit) {
            this.extApi.cdkTable.updateStickyColumnStyles();
        }
    }
    attach(column) {
        if (this._column !== column) {
            this.detach();
            if (column) {
                this._column = column;
                column.attach(this);
                this.name = column.id.replace(/ /g, '_');
                if (isPblColumn(column)) {
                    this.updatePin(column.pin);
                }
            }
        }
    }
    detach() {
        if (this._column) {
            const col = this._column;
            this._column = undefined;
            col.detach();
        }
    }
}
/** @nocollapse */ PblNgridColumnDef.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridColumnDef, deps: [{ token: EXT_API_TOKEN }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ PblNgridColumnDef.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridColumnDef, selector: "[pblNgridColumnDef]", inputs: { column: ["pblNgridColumnDef", "column"] }, outputs: { widthChange: "pblNgridColumnDefWidthChange" }, providers: [
        { provide: CdkColumnDef, useExisting: PblNgridColumnDef },
        { provide: 'MAT_SORT_HEADER_COLUMN_DEF', useExisting: PblNgridColumnDef }
    ], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridColumnDef, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pblNgridColumnDef]',
                    providers: [
                        { provide: CdkColumnDef, useExisting: PblNgridColumnDef },
                        { provide: 'MAT_SORT_HEADER_COLUMN_DEF', useExisting: PblNgridColumnDef }
                    ],
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [EXT_API_TOKEN]
                }] }]; }, propDecorators: { column: [{
                type: Input,
                args: ['pblNgridColumnDef']
            }], widthChange: [{
                type: Output,
                args: ['pblNgridColumnDefWidthChange']
            }] } });
/**
 * Set the widths of an HTMLElement
 * @param el The element to set widths to
 * @param widths The widths, a tuple of 3 strings [ MIN-WIDTH, WIDTH, MAX-WIDTH ]
 */
function setWidth(el, widths) {
    el.style.minWidth = widths[0];
    el.style.width = widths[1];
    el.style.maxWidth = widths[2];
    // TODO(shlomiassaf)[perf, 4]: Instead of using a tuple for width, use a CSSStyleDeclaration object and just assign the props
    // This will avoid the additional check for %
    // We will need to implement it in all places that `_widths` is updated in `PblNgridColumnDef`
    // Another TODO is to cache the previous `boxSizing` in any case the column definition changes.
    // When the column does not have an explicit `minWidth` set and when the `width` is set explicitly to a % value
    // the logic in `PblNgridColumnDef.updateWidth` will set `minWidth` to the same value in `width`
    // This will cause an overflow unless we apply the border-box model
    if (widths[0] && widths[0].endsWith('%')) {
        el.style.boxSizing = 'border-box';
    }
    else {
        el.style.boxSizing = 'content-box';
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLWRlZi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmdyaWQvc3JjL2xpYi9ncmlkL2NvbHVtbi9kaXJlY3RpdmVzL2NvbHVtbi1kZWYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsNkNBQTZDO0FBQzdDLHdDQUF3QztBQUN4QyxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBRU4sTUFBTSxFQUNOLFlBQVksR0FDYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFHbEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxhQUFhLEVBQWdDLE1BQU0sMkJBQTJCLENBQUM7QUFDeEYsT0FBTyxFQUE2QixXQUFXLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDbEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHFDQUFxQyxDQUFDOztBQVVwRTs7Ozs7O0dBTUc7QUFRSCxNQUFNLE9BQU8saUJBQTZDLFNBQVEsWUFBWTtJQWlENUUsWUFBNkMsTUFBeUM7UUFDcEYsS0FBSyxFQUFFLENBQUM7UUFEbUMsV0FBTSxHQUFOLE1BQU0sQ0FBbUM7UUEvQnRGLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFJbkI7O1dBRUc7UUFDcUMsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBb0IsQ0FBQztRQUkzRjs7Ozs7Ozs7O1dBU0c7UUFDSyxZQUFPLEdBQTJCLEVBQUUsQ0FBQztRQVkzQyxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFFeEIsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUM7UUFDekQsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVB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QUN6RCxFQUFFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxXQUFXLG1CQUFtQixFQUFFO3FCQUMxRTtpQkFDRjs7MEJBa0RjLE1BQU07MkJBQUMsYUFBYTs0Q0FoREQsTUFBTTtzQkFBckMsS0FBSzt1QkFBQyxtQkFBbUI7Z0JBd0JjLFdBQVc7c0JBQWxELE1BQU07dUJBQUMsOEJBQThCOztBQW9NeEM7Ozs7R0FJRztBQUNILFNBQVMsUUFBUSxDQUFDLEVBQWUsRUFBRSxNQUFnQjtJQUNqRCxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUIsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNCLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUU5Qiw2SEFBNkg7SUFDN0gsNkNBQTZDO0lBQzdDLDhGQUE4RjtJQUM5RiwrRkFBK0Y7SUFFL0YsK0dBQStHO0lBQy9HLGdHQUFnRztJQUNoRyxtRUFBbUU7SUFDbkUsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUN4QyxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUM7S0FDbkM7U0FBTTtRQUNMLEVBQUUsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQztLQUNwQztBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZTp1c2UtaG9zdC1wcm9wZXJ0eS1kZWNvcmF0b3Jcbi8vIHRzbGludDpkaXNhYmxlOmRpcmVjdGl2ZS1jbGFzcy1zdWZmaXhcbmltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgSW5wdXQsXG4gIEluamVjdCxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDZGtDb2x1bW5EZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xuXG5pbXBvcnQgeyBfUGJsTmdyaWRDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi90b2tlbnMnO1xuaW1wb3J0IHsgdW5pcXVlQ29sdW1uQ3NzIH0gZnJvbSAnLi4vLi4vdXRpbHMvdW5pcXVlLWNvbHVtbi1jc3MnO1xuaW1wb3J0IHsgRVhUX0FQSV9UT0tFTiwgUGJsTmdyaWRJbnRlcm5hbEV4dGVuc2lvbkFwaSB9IGZyb20gJy4uLy4uLy4uL2V4dC9ncmlkLWV4dC1hcGknO1xuaW1wb3J0IHsgQ09MVU1OLCBQYmxDb2x1bW5TaXplSW5mbywgaXNQYmxDb2x1bW4gfSBmcm9tICcuLi9tb2RlbCc7XG5pbXBvcnQgeyB3aWR0aEJyZWFrb3V0IH0gZnJvbSAnLi4vd2lkdGgtbG9naWMvZHluYW1pYy1jb2x1bW4td2lkdGgnO1xuXG5leHBvcnQgdHlwZSBVcGRhdGVXaWR0aFJlYXNvbiA9ICdhdHRhY2gnIHwgJ3VwZGF0ZScgfCAncmVzaXplJztcblxuZXhwb3J0IHR5cGUgV2lkdGhTZXQgPSBbc3RyaW5nLCBzdHJpbmcsIHN0cmluZ107XG5cbmV4cG9ydCBpbnRlcmZhY2UgV2lkdGhDaGFuZ2VFdmVudCB7XG4gIHJlYXNvbjogVXBkYXRlV2lkdGhSZWFzb247XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHJ1bnRpbWUgY29sdW1uIGRlZmluaXRpb24gZm9yIGEgdXNlci1kZWZpbmVkIGNvbHVtbiBkZWZpbml0aW9ucy5cbiAqXG4gKiBVc2VyIGRlZmluZWQgY29sdW1uIGRlZmluaXRpb25zIGFyZSBgUGJsQ29sdW1uYCwgYFBibE1ldGFDb2x1bW5gLCBgUGJsQ29sdW1uR3JvdXBgIGV0Yy4uLlxuICogVGhleSByZXByZXNlbnQgc3RhdGljIGNvbHVtbiBkZWZpbml0aW9ucyBhbmQgYFBibE5ncmlkQ29sdW1uRGVmYCBpcyB0aGUgcnVudGltZSBpbnN0YW5jZSBvZiB0aGVtLlxuICpcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3BibE5ncmlkQ29sdW1uRGVmXScsXG4gIHByb3ZpZGVyczogW1xuICAgIHsgcHJvdmlkZTogQ2RrQ29sdW1uRGVmLCB1c2VFeGlzdGluZzogUGJsTmdyaWRDb2x1bW5EZWYgfSxcbiAgICB7IHByb3ZpZGU6ICdNQVRfU09SVF9IRUFERVJfQ09MVU1OX0RFRicsIHVzZUV4aXN0aW5nOiBQYmxOZ3JpZENvbHVtbkRlZiB9XG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkQ29sdW1uRGVmPFQgZXh0ZW5kcyBDT0xVTU4gPSBDT0xVTU4+IGV4dGVuZHMgQ2RrQ29sdW1uRGVmIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgQElucHV0KCdwYmxOZ3JpZENvbHVtbkRlZicpIGdldCBjb2x1bW4oKTogVCB7IHJldHVybiB0aGlzLl9jb2x1bW47IH07XG4gIHNldCBjb2x1bW4odmFsdWU6IFQpIHsgdGhpcy5hdHRhY2godmFsdWUpOyB9XG5cbiAgLyoqXG4gICAqIFRoZSBhYnNvbHV0ZSB3aWR0aCBkZWZpbml0aW9ucywgYXMgY3VycmVudGx5IHNldCBpbiB0aGUgRE9NIChnZXRCb3VuZGluZ0NsaWVudFJlY3QoKSkuXG4gICAqIElmIG5vIG1lYXN1cmVtZW50cyBleGlzdHMgeWV0LCByZXR1cm4gdGhlIHVzZXIgZGVmaW5lZCB3aWR0aCdzLlxuICAgKlxuICAgKiBUaGUgdHVwbGUgcmVwcmVzZW50cyB0aGVtIGluIHRoYXQgb3JkZXIsIGkuZTogWyBNSU4tV0lEVEgsIFdJRFRILCBNQVgtV0lEVEggXVxuICAgKi9cbiAgZ2V0IHdpZHRocygpOiBXaWR0aFNldCB7IHJldHVybiB0aGlzLl93aWR0aHNbMV07IH1cblxuICAvKipcbiAgICogVGhlIGxhc3QgbmV0IHdpZHRoIG9mIHRoZSBjb2x1bW4uXG4gICAqIFRoZSBuZXQgd2lkdGggaXMgdGhlIGFic29sdXRlIHdpZHRoIG9mIHRoZSBjb2x1bW4sIHdpdGhvdXQgcGFkZGluZywgYm9yZGVyIGV0Yy4uLlxuICAgKi9cbiAgZ2V0IG5ldFdpZHRoKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9uZXRXaWR0aDsgfVxuXG4gIGlzRHJhZ2dpbmcgPSBmYWxzZTtcblxuICByZWFkb25seSBncmlkOiBfUGJsTmdyaWRDb21wb25lbnQ8YW55PjtcblxuICAvKipcbiAgICogQW4gZXZlbnQgZW1pdHRlZCB3aGVuIHdpZHRoIG9mIHRoaXMgY29sdW1uIGhhcyBjaGFuZ2VkLlxuICAgKi9cbiAgQE91dHB1dCgncGJsTmdyaWRDb2x1bW5EZWZXaWR0aENoYW5nZScpIHdpZHRoQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxXaWR0aENoYW5nZUV2ZW50PigpO1xuXG4gIHByaXZhdGUgX2NvbHVtbjogVDtcblxuICAvKipcbiAgICogVGhlIGNvbXBsZXRlIHdpZHRoIGRlZmluaXRpb24gZm9yIHRoZSBjb2x1bW4uXG4gICAqXG4gICAqIFRoZXJlIGFyZSAyIHdpZHRoIHNldHMgKHR1cGxlKTpcbiAgICogLSBbMF06IFRoZSBzb3VyY2Ugd2lkdGggZGVmaW5pdGlvbnMgYXMgc2V0IGluIHN0YXRpYyBjb2x1bW4gZGVmaW5pdGlvbiBpbnN0YW5jZVxuICAgKiAtIFsxXTogVGhlIGFic29sdXRlIHdpZHRoIGRlZmluaXRpb25zLCBhcyBjdXJyZW50bHkgc2V0IGluIHRoZSBET00gKGdldEJvdW5kaW5nQ2xpZW50UmVjdCgpKVxuICAgKlxuICAgKiBFYWNoIHNldCBpcyBtYWRlIHVwIG9mIDMgcHJpbWl0aXZlIHdpZHRoIGRlZmluaXRpb25zOiBNSU4tV0lEVEgsIFdJRFRIIGFuZCBNQVgtV0lEVEguXG4gICAqIFRoZSB0dXBsZSByZXByZXNlbnRzIHRoZW0gaW4gdGhhdCBvcmRlciwgaS5lOiBbIE1JTi1XSURUSCwgV0lEVEgsIE1BWC1XSURUSCBdXG4gICAqL1xuICBwcml2YXRlIF93aWR0aHM6IFtXaWR0aFNldD8sIFdpZHRoU2V0P10gPSBbXTtcblxuICAvKipcbiAgICogVGhlIGxhc3QgbmV0IHdpZHRoIG9mIHRoZSBjb2x1bW4uXG4gICAqIFRoZSBuZXQgd2lkdGggaXMgdGhlIGFic29sdXRlIHdpZHRoIG9mIHRoZSBjb2x1bW4sIHdpdGhvdXQgcGFkZGluZywgYm9yZGVyIGV0Yy4uLlxuICAgKi9cbiAgcHJpdmF0ZSBfbmV0V2lkdGg6IG51bWJlcjtcblxuICBwcml2YXRlIHdpZHRoQnJlYWtvdXQ6IChjb2x1bW5JbmZvOiBQYmxDb2x1bW5TaXplSW5mbykgPT4gUmV0dXJuVHlwZTx0eXBlb2Ygd2lkdGhCcmVha291dD47XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChFWFRfQVBJX1RPS0VOKSBwcm90ZWN0ZWQgZXh0QXBpOiBQYmxOZ3JpZEludGVybmFsRXh0ZW5zaW9uQXBpPGFueT4pIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuZ3JpZCA9IGV4dEFwaS5ncmlkO1xuXG4gICAgY29uc3QgeyBzdHJhdGVneSB9ID0gZXh0QXBpLndpZHRoQ2FsYy5keW5hbWljQ29sdW1uV2lkdGg7XG4gICAgdGhpcy53aWR0aEJyZWFrb3V0ID0gYyA9PiB3aWR0aEJyZWFrb3V0KHN0cmF0ZWd5LCBjKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIFwid2lkdGhzXCIgZm9yIHRoaXMgY29sdW1uIGFuZCB3aGVuIHdpZHRoIGhhcyBjaGFuZ2VkLlxuICAgKlxuICAgKiBUaGUgXCJ3aWR0aHNcIiBhcmUgdGhlIDMgdmFsdWVzIHJlcHJlc2VudGluZyBhIHdpZHRoIG9mIGEgY2VsbDogW21pbldpZHRoLCB3aWR0aCwgbWF4V2lkdGhdLFxuICAgKiB0aGlzIG1ldGhvZCBpcyBnaXZlbiB0aGUgd2lkdGggYW5kIHdpbGwgY2FsY3VsYXRlIHRoZSBtaW5XaWR0aCBhbmQgbWF4V2lkdGggYmFzZWQgb24gdGhlIGNvbHVtbiBkZWZpbml0aW9ucy5cbiAgICpcbiAgICogSWYgYXQgbGVhc3Qgb25lIHZhbHVlIG9mIFwid2lkdGhzXCIgaGFzIGNoYW5nZWQsIGZpcmVzIHRoZSBgd2lkdGhDaGFuZ2VgIGV2ZW50IHdpdGggdGhlIGByZWFzb25gIHByb3ZpZGVkLlxuICAgKlxuICAgKiBUaGUgcmVhc29uIGNhbiBiZSB1c2VkIHRvIG9wdGlvbmFsbHkgdXBkYXRlIHRoZSByZWxldmFudCBjZWxscywgYmFzZWQgb24gdGhlIHNvdXJjZSAocmVhc29uKSBvZiB0aGUgdXBkYXRlLlxuICAgKiAtIGF0dGFjaDogVGhpcyBydW50aW1lIGNvbHVtbiBkZWZpbml0aW9uIGluc3RhbmNlIHdhcyBhdHRhY2hlZCB0byBhIHN0YXRpYyBjb2x1bW4gZGVmaW5pdGlvbiBpbnN0YW5jZS5cbiAgICogLSB1cGRhdGU6IFRoZSB3aWR0aCB2YWx1ZSB3YXMgdXBkYXRlZCBpbiB0aGUgc3RhdGljIGNvbHVtbiBkZWZpbml0aW9uIGluc3RhbmNlICwgd2hpY2ggdHJpZ2dlcmVkIGEgd2lkdGggdXBkYXRlIHRvIHRoZSBydW50aW1lIGNvbHVtbiBkZWZpbml0aW9uIGluc3RhbmNlXG4gICAqIC0gcmVzaXplOiBBIHJlc2l6ZSBldmVudCB0byB0aGUgaGVhZGVyIFBibENvbHVtbiBjZWxsIHdhcyB0cmlnZ2VyZWQsIHRoZSB3aWR0aCBvZiB0aGUgc3RhdGljIGNvbHVtbiBkZWZpbml0aW9uIGlzIG5vdCB1cGRhdGVkLCBvbmx5IHRoZSBydW50aW1lIHZhbHVlIGlzLlxuICAgKlxuICAgKiBOb3RlIHRoYXQgdGhpcyB1cGRhdGVzIHRoZSB3aWR0aCBvZiB0aGUgY29sdW1uLWRlZiBpbnN0YW5jZSwgbm90IHRoZSBjb2x1bW4gZGVmaW5pdGlvbnMgd2lkdGggaXRzZWxmLlxuICAgKiBPbmx5IHdoZW4gYHJlYXNvbiA9PT0gJ3VwZGF0ZSdgIGl0IG1lYW5zIHRoYXQgdGhlIGNvbHVtbiBkZWZpbml0aW9uIHdhcyB1cGRhdGVkIGFuZCB0cmlnZ2VyZWQgdGhpcyB1cGRhdGVcbiAgICpcbiAgICogQHBhcmFtIHdpZHRoIFRoZSBuZXcgd2lkdGhcbiAgICogQHBhcmFtIHJlYXNvbiBUaGUgcmVhc29uIGZvciB0aGlzIGNoYW5nZVxuICAgKi9cbiAgdXBkYXRlV2lkdGgod2lkdGg6IHN0cmluZywgcmVhc29uOiBVcGRhdGVXaWR0aFJlYXNvbik6IHZvaWQge1xuICAgIGNvbnN0IHsgaXNGaXhlZFdpZHRoLCBwYXJzZWRXaWR0aCB9ID0gdGhpcy5fY29sdW1uO1xuXG4gICAgLyogIFNldHRpbmcgdGhlIG1pbmltdW0gd2lkdGggaXMgYmFzZWQgb24gdGhlIGlucHV0LlxuICAgICAgICBJZiB0aGUgb3JpZ2luYWwgd2lkdGggaXMgcGl4ZWwgZml4ZWQgd2Ugd2lsbCB0YWtlIHRoZSBtYXhpbXVtIGJldHdlZW4gaXQgYW5kIHRoZSBtaW4gd2lkdGguXG4gICAgICAgIElmIG5vdCwgd2Ugd2lsbCB0aGUgdGFrZSBtaW5XaWR0aC5cbiAgICAgICAgSWYgbm9uZSBvZiB0aGUgYWJvdmUgd29ya2VkIHdlIHdpbGwgdHJ5IHRvIHNlZSBpZiB0aGUgY3VycmVudCB3aWR0aCBpcyBzZXQgd2l0aCAlLCBpZiBzbyBpdCB3aWxsIGJlIG91ciBtaW4gd2lkdGguXG4gICAgKi9cbiAgICBjb25zdCBtaW5XaWR0aFB4ID0gaXNGaXhlZFdpZHRoXG4gICAgICA/IE1hdGgubWF4KHRoaXMuX2NvbHVtbi5wYXJzZWRXaWR0aC52YWx1ZSwgdGhpcy5fY29sdW1uLm1pbldpZHRoIHx8IDApXG4gICAgICA6IHRoaXMuX2NvbHVtbi5taW5XaWR0aFxuICAgIDtcblxuICAgIGxldCBtaW5XaWR0aCA9IG1pbldpZHRoUHggJiYgYCR7bWluV2lkdGhQeH1weGA7XG4gICAgaWYgKCFtaW5XaWR0aCAmJiBwYXJzZWRXaWR0aD8udHlwZSA9PT0gJyUnKSB7XG4gICAgICBtaW5XaWR0aCA9IHdpZHRoO1xuICAgIH1cblxuICAgIGNvbnN0IG1heFdpZHRoID0gaXNGaXhlZFdpZHRoXG4gICAgICA/IE1hdGgubWluKHRoaXMuX2NvbHVtbi5wYXJzZWRXaWR0aC52YWx1ZSwgdGhpcy5fY29sdW1uLm1heFdpZHRoIHx8IHRoaXMuX2NvbHVtbi5wYXJzZWRXaWR0aC52YWx1ZSlcbiAgICAgIDogdGhpcy5fY29sdW1uLm1heFdpZHRoXG4gICAgO1xuXG4gICAgY29uc3QgbmV3V2lkdGhzID0gW21pbldpZHRoIHx8ICcnLCAgd2lkdGgsIG1heFdpZHRoID8gYCR7bWF4V2lkdGh9cHhgIDogd2lkdGhdIGFzIFdpZHRoU2V0O1xuICAgIGlmIChyZWFzb24gPT09ICdyZXNpemUnKSB7XG4gICAgICB0aGlzLl93aWR0aHNbMV0gPSBuZXdXaWR0aHM7XG4gICAgICB0aGlzLndpZHRoQ2hhbmdlLmVtaXQoeyByZWFzb24gfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHByZXYgPSB0aGlzLl93aWR0aHNbMF0gfHwgW107XG4gICAgICB0aGlzLl93aWR0aHNbMF0gPSBuZXdXaWR0aHM7XG4gICAgICBpZiAoIXRoaXMuX3dpZHRoc1sxXSkge1xuICAgICAgICB0aGlzLl93aWR0aHNbMV0gPSBuZXdXaWR0aHM7XG4gICAgICB9XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICBpZiAocHJldltpXSAhPT0gbmV3V2lkdGhzW2ldKSB7XG4gICAgICAgICAgdGhpcy53aWR0aENoYW5nZS5lbWl0KHsgcmVhc29uIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoZSBjdXJyZW50IGFic29sdXRlIHdpZHRoIGRlZmluaXRpb25zIChtaW5XaWR0aCwgd2lkdGgsIG1heFdpZHRoKSBvbnRvIGFuIGVsZW1lbnQuXG4gICAqL1xuICBhcHBseVdpZHRoKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogdm9pZCB7IHNldFdpZHRoKGVsZW1lbnQsIHRoaXMud2lkdGhzKTsgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB0aGUgc291cmNlIHdpZHRoIGRlZmluaXRpb25zIClzZXQgaW4gc3RhdGljIGNvbHVtbiBkZWZpbml0aW9uIGluc3RhbmNlKSBvbnRvIGFuIGVsZW1lbnQuXG4gICAqL1xuICBhcHBseVNvdXJjZVdpZHRoKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogdm9pZCB7IHNldFdpZHRoKGVsZW1lbnQsIHRoaXMuX3dpZHRoc1swXSk7IH1cblxuICAvKipcbiAgICogUXVlcnkgZm9yIGNlbGwgZWxlbWVudHMgcmVsYXRlZCB0byB0aGlzIGNvbHVtbiBkZWZpbml0aW9uLlxuICAgKlxuICAgKiBUaGlzIHF1ZXJ5IGlzIG5vdCBjYWNoZWQgLSBjYWNoZSBpbiBpbXBsZW1lbnRhdGlvbi5cbiAgICovXG4gIHF1ZXJ5Q2VsbEVsZW1lbnRzKC4uLmZpbHRlcjogQXJyYXk8J3RhYmxlJyB8ICdoZWFkZXInIHwgJ2hlYWRlckdyb3VwJyB8ICdmb290ZXInIHwgJ2Zvb3Rlckdyb3VwJz4pOiBIVE1MRWxlbWVudFtdIHtcbiAgICBjb25zdCBjc3NJZCA9IGAuJHt1bmlxdWVDb2x1bW5Dc3ModGhpcyl9YDtcblxuICAgIGNvbnN0IHF1ZXJ5OiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgaWYgKGZpbHRlci5sZW5ndGggPT09IDApIHtcbiAgICAgIHF1ZXJ5LnB1c2goY3NzSWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGNvbnN0IGYgb2YgZmlsdGVyKSB7XG4gICAgICAgIHN3aXRjaCAoZikge1xuICAgICAgICAgIGNhc2UgJ3RhYmxlJzpcbiAgICAgICAgICAgcXVlcnkucHVzaChgLnBibC1uZ3JpZC1jZWxsJHtjc3NJZH1gKTtcbiAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnaGVhZGVyJzpcbiAgICAgICAgICAgcXVlcnkucHVzaChgLnBibC1uZ3JpZC1oZWFkZXItY2VsbCR7Y3NzSWR9Om5vdCgucGJsLWhlYWRlci1ncm91cC1jZWxsKWApO1xuICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdoZWFkZXJHcm91cCc6XG4gICAgICAgICAgIHF1ZXJ5LnB1c2goYC5wYmwtaGVhZGVyLWdyb3VwLWNlbGwke2Nzc0lkfWApO1xuICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdmb290ZXInOlxuICAgICAgICAgICBxdWVyeS5wdXNoKGAucGJsLW5ncmlkLWZvb3Rlci1jZWxsJHtjc3NJZH06bm90KC5wYmwtZm9vdGVyLWdyb3VwLWNlbGwpYCk7XG4gICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2Zvb3Rlckdyb3VwJzpcbiAgICAgICAgICAgcXVlcnkucHVzaChgLnBibC1mb290ZXItZ3JvdXAtY2VsbCR7Y3NzSWR9YCk7XG4gICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8vIHdlIHF1ZXJ5IGZyb20gdGhlIG1hc3RlciB0YWJsZSBjb250YWluZXIgYW5kIG5vdCBDREtUYWJsZSBiZWNhdXNlIG9mIGZpeGVkIG1ldGEgcm93c1xuICAgIHJldHVybiBxdWVyeS5sZW5ndGggPT09IDAgPyBbXSA6IEFycmF5LmZyb20odGhpcy5leHRBcGkuZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHF1ZXJ5LmpvaW4oJywgJykpKSBhcyBhbnk7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZGV0YWNoKCk7XG4gICAgdGhpcy53aWR0aENoYW5nZS5jb21wbGV0ZSgpO1xuICB9XG5cbiAgb25SZXNpemUoKTogdm9pZCB7XG4gICAgaWYgKGlzUGJsQ29sdW1uKHRoaXMuY29sdW1uKSkge1xuICAgICAgY29uc3QgcHJldk5ldFdpZHRoID0gdGhpcy5fbmV0V2lkdGg7XG4gICAgICB0aGlzLl9uZXRXaWR0aCA9IHRoaXMud2lkdGhCcmVha291dCh0aGlzLmNvbHVtbi5zaXplSW5mbykuY29udGVudDtcblxuICAgICAgaWYgKHByZXZOZXRXaWR0aCAhPT0gdGhpcy5fbmV0V2lkdGgpIHtcbiAgICAgICAgY29uc3Qgd2lkdGggPSBgJHt0aGlzLl9uZXRXaWR0aH1weGA7XG4gICAgICAgIHRoaXMudXBkYXRlV2lkdGgod2lkdGgsICdyZXNpemUnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB1cGRhdGVQaW4ocGluPzogJ3N0YXJ0JyB8ICdlbmQnKTogdm9pZCB7XG4gICAgdGhpcy5zdGlja3kgPSB0aGlzLnN0aWNreUVuZCA9IGZhbHNlO1xuICAgIHN3aXRjaChwaW4pIHtcbiAgICAgIGNhc2UgJ3N0YXJ0JzpcbiAgICAgICAgdGhpcy5zdGlja3kgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2VuZCc6XG4gICAgICAgIHRoaXMuc3RpY2t5RW5kID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGlmICh0aGlzLmdyaWQuaXNJbml0KSB7XG4gICAgICB0aGlzLmV4dEFwaS5jZGtUYWJsZS51cGRhdGVTdGlja3lDb2x1bW5TdHlsZXMoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGF0dGFjaChjb2x1bW46IFQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fY29sdW1uICE9PSBjb2x1bW4pIHtcbiAgICAgIHRoaXMuZGV0YWNoKCk7XG4gICAgICBpZiAoY29sdW1uKSB7XG4gICAgICAgIHRoaXMuX2NvbHVtbiA9IGNvbHVtbjtcbiAgICAgICAgKGNvbHVtbiBhcyBhbnkpLmF0dGFjaCh0aGlzKTtcbiAgICAgICAgdGhpcy5uYW1lID0gY29sdW1uLmlkLnJlcGxhY2UoLyAvZywgJ18nKTtcbiAgICAgICAgaWYgKGlzUGJsQ29sdW1uKGNvbHVtbikpIHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZVBpbihjb2x1bW4ucGluKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZGV0YWNoKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9jb2x1bW4pIHtcbiAgICAgIGNvbnN0IGNvbCA9IHRoaXMuX2NvbHVtbjtcbiAgICAgIHRoaXMuX2NvbHVtbiA9IHVuZGVmaW5lZDtcbiAgICAgIGNvbC5kZXRhY2goKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBTZXQgdGhlIHdpZHRocyBvZiBhbiBIVE1MRWxlbWVudFxuICogQHBhcmFtIGVsIFRoZSBlbGVtZW50IHRvIHNldCB3aWR0aHMgdG9cbiAqIEBwYXJhbSB3aWR0aHMgVGhlIHdpZHRocywgYSB0dXBsZSBvZiAzIHN0cmluZ3MgWyBNSU4tV0lEVEgsIFdJRFRILCBNQVgtV0lEVEggXVxuICovXG5mdW5jdGlvbiBzZXRXaWR0aChlbDogSFRNTEVsZW1lbnQsIHdpZHRoczogV2lkdGhTZXQpIHtcbiAgZWwuc3R5bGUubWluV2lkdGggPSB3aWR0aHNbMF07XG4gIGVsLnN0eWxlLndpZHRoID0gd2lkdGhzWzFdO1xuICBlbC5zdHlsZS5tYXhXaWR0aCA9IHdpZHRoc1syXTtcblxuICAvLyBUT0RPKHNobG9taWFzc2FmKVtwZXJmLCA0XTogSW5zdGVhZCBvZiB1c2luZyBhIHR1cGxlIGZvciB3aWR0aCwgdXNlIGEgQ1NTU3R5bGVEZWNsYXJhdGlvbiBvYmplY3QgYW5kIGp1c3QgYXNzaWduIHRoZSBwcm9wc1xuICAvLyBUaGlzIHdpbGwgYXZvaWQgdGhlIGFkZGl0aW9uYWwgY2hlY2sgZm9yICVcbiAgLy8gV2Ugd2lsbCBuZWVkIHRvIGltcGxlbWVudCBpdCBpbiBhbGwgcGxhY2VzIHRoYXQgYF93aWR0aHNgIGlzIHVwZGF0ZWQgaW4gYFBibE5ncmlkQ29sdW1uRGVmYFxuICAvLyBBbm90aGVyIFRPRE8gaXMgdG8gY2FjaGUgdGhlIHByZXZpb3VzIGBib3hTaXppbmdgIGluIGFueSBjYXNlIHRoZSBjb2x1bW4gZGVmaW5pdGlvbiBjaGFuZ2VzLlxuXG4gIC8vIFdoZW4gdGhlIGNvbHVtbiBkb2VzIG5vdCBoYXZlIGFuIGV4cGxpY2l0IGBtaW5XaWR0aGAgc2V0IGFuZCB3aGVuIHRoZSBgd2lkdGhgIGlzIHNldCBleHBsaWNpdGx5IHRvIGEgJSB2YWx1ZVxuICAvLyB0aGUgbG9naWMgaW4gYFBibE5ncmlkQ29sdW1uRGVmLnVwZGF0ZVdpZHRoYCB3aWxsIHNldCBgbWluV2lkdGhgIHRvIHRoZSBzYW1lIHZhbHVlIGluIGB3aWR0aGBcbiAgLy8gVGhpcyB3aWxsIGNhdXNlIGFuIG92ZXJmbG93IHVubGVzcyB3ZSBhcHBseSB0aGUgYm9yZGVyLWJveCBtb2RlbFxuICBpZiAod2lkdGhzWzBdICYmIHdpZHRoc1swXS5lbmRzV2l0aCgnJScpKSB7XG4gICAgZWwuc3R5bGUuYm94U2l6aW5nID0gJ2JvcmRlci1ib3gnO1xuICB9IGVsc2Uge1xuICAgIGVsLnN0eWxlLmJveFNpemluZyA9ICdjb250ZW50LWJveCc7XG4gIH1cbn1cbiJdfQ==