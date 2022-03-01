import { filter } from 'rxjs/operators';
import { Component } from '@angular/core';
import { unrx } from '@pebula/ngrid/core';
import { initCellElement } from './utils';
import { PblNgridBaseCell } from './base-cell';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
const COLUMN_EDITABLE_CELL_CLASS = 'pbl-ngrid-editable-cell';
function initDataCellElement(el, column, prev) {
    if ((prev === null || prev === void 0 ? void 0 : prev.editable) && prev.editorTpl) {
        el.classList.remove(COLUMN_EDITABLE_CELL_CLASS);
    }
    if (column.editable && column.editorTpl) {
        el.classList.add(COLUMN_EDITABLE_CELL_CLASS);
    }
}
/** Cell template container that adds the right classes and role. */
export class PblNgridCellComponent extends PblNgridBaseCell {
    constructor() {
        super(...arguments);
        this.focused = false;
        this.selected = false;
    }
    syncColumn() {
        if (this.column) {
            this.colIndex = this.column.columnDef.grid.columnApi.indexOf(this.column);
        }
    }
    setContext(context) {
        this._rowCtx = context;
    }
    setColumn(column) {
        const prev = this.column;
        if (prev !== column) {
            if (prev) {
                unrx.kill(this, prev);
            }
            this.column = column;
            this.colIndex = this.column.columnDef.grid.columnApi.indexOf(column);
            column.columnDef.applyWidth(this.el);
            initCellElement(this.el, column, prev);
            initDataCellElement(this.el, column, prev);
            /*  Apply width changes to this data cell
                We don't update "update" events because they are followed by a resize event which will update the absolute value (px) */
            column.columnDef.widthChange
                .pipe(filter(event => event.reason !== 'update'), unrx(this, column))
                .subscribe(event => this.column.columnDef.applyWidth(this.el));
        }
    }
    ngDoCheck() {
        if (this._rowCtx) {
            const cellContext = this.cellCtx = this._rowCtx.cell(this.colIndex);
            this.template = cellContext.editing ? this.column.editorTpl : this.column.cellTpl;
            if (cellContext.focused !== this.focused) {
                if (this.focused = cellContext.focused) {
                    this.el.classList.add('pbl-ngrid-cell-focused');
                }
                else {
                    this.el.classList.remove('pbl-ngrid-cell-focused');
                }
            }
            if (this.cellCtx.selected !== this.selected) {
                if (this.selected = cellContext.selected) {
                    this.el.classList.add('pbl-ngrid-cell-selected');
                }
                else {
                    this.el.classList.remove('pbl-ngrid-cell-selected');
                }
            }
        }
    }
}
/** @nocollapse */ PblNgridCellComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridCellComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ PblNgridCellComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridCellComponent, selector: "pbl-ngrid-cell", host: { attributes: { "role": "gridcell" }, properties: { "attr.id": "column?.id", "attr.tabindex": "column?.columnDef?.grid.cellFocus" }, classAttribute: "pbl-ngrid-cell" }, exportAs: ["pblNgridCell"], usesInheritance: true, ngImport: i0, template: `<ng-container *ngTemplateOutlet="template; context: cellCtx"></ng-container>`, isInline: true, directives: [{ type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridCellComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'pbl-ngrid-cell',
                    template: `<ng-container *ngTemplateOutlet="template; context: cellCtx"></ng-container>`,
                    // tslint:disable-next-line: no-host-metadata-property
                    host: {
                        'class': 'pbl-ngrid-cell',
                        'role': 'gridcell',
                        '[attr.id]': 'column?.id',
                        '[attr.tabindex]': 'column?.columnDef?.grid.cellFocus'
                    },
                    exportAs: 'pblNgridCell',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25ncmlkL3NyYy9saWIvZ3JpZC9jZWxsL2NlbGwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QyxPQUFPLEVBQUUsU0FBUyxFQUF3QixNQUFNLGVBQWUsQ0FBQztBQUNoRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFJMUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUMxQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxhQUFhLENBQUM7OztBQUUvQyxNQUFNLDBCQUEwQixHQUFHLHlCQUF5QixDQUFDO0FBRTdELFNBQVMsbUJBQW1CLENBQUMsRUFBZSxFQUFFLE1BQWlCLEVBQUUsSUFBZ0I7SUFDL0UsSUFBSSxDQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxRQUFRLEtBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtRQUNwQyxFQUFFLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0tBQ2pEO0lBQ0QsSUFBSSxNQUFNLENBQUMsUUFBUSxJQUFJLE1BQU0sQ0FBQyxTQUFTLEVBQUU7UUFDdkMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsQ0FBQztLQUM5QztBQUNILENBQUM7QUFFRCxvRUFBb0U7QUFhcEUsTUFBTSxPQUFPLHFCQUFzQixTQUFRLGdCQUFnQjtJQVozRDs7UUF3QlUsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixhQUFRLEdBQUcsS0FBSyxDQUFDO0tBNEQxQjtJQTFEQyxVQUFVO1FBQ1IsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2YsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENB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QUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLFFBQVEsRUFBRSw4RUFBOEU7b0JBQ3hGLHNEQUFzRDtvQkFDdEQsSUFBSSxFQUFFO3dCQUNKLE9BQU8sRUFBRSxnQkFBZ0I7d0JBQ3pCLE1BQU0sRUFBRSxVQUFVO3dCQUNsQixXQUFXLEVBQUUsWUFBWTt3QkFDekIsaUJBQWlCLEVBQUUsbUNBQW1DO3FCQUN2RDtvQkFDRCxRQUFRLEVBQUUsY0FBYztpQkFDekIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDb21wb25lbnQsIERvQ2hlY2ssIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyB1bnJ4IH0gZnJvbSAnQHBlYnVsYS9uZ3JpZC9jb3JlJztcblxuaW1wb3J0IHsgUGJsUm93Q29udGV4dCwgUGJsQ2VsbENvbnRleHQgfSBmcm9tICcuLi9jb250ZXh0L2luZGV4JztcbmltcG9ydCB7IFBibENvbHVtbiB9IGZyb20gJy4uL2NvbHVtbi9tb2RlbCc7XG5pbXBvcnQgeyBpbml0Q2VsbEVsZW1lbnQgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7IFBibE5ncmlkQmFzZUNlbGwgfSBmcm9tICcuL2Jhc2UtY2VsbCc7XG5cbmNvbnN0IENPTFVNTl9FRElUQUJMRV9DRUxMX0NMQVNTID0gJ3BibC1uZ3JpZC1lZGl0YWJsZS1jZWxsJztcblxuZnVuY3Rpb24gaW5pdERhdGFDZWxsRWxlbWVudChlbDogSFRNTEVsZW1lbnQsIGNvbHVtbjogUGJsQ29sdW1uLCBwcmV2PzogUGJsQ29sdW1uKTogdm9pZCB7XG4gIGlmIChwcmV2Py5lZGl0YWJsZSAmJiBwcmV2LmVkaXRvclRwbCkge1xuICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoQ09MVU1OX0VESVRBQkxFX0NFTExfQ0xBU1MpO1xuICB9XG4gIGlmIChjb2x1bW4uZWRpdGFibGUgJiYgY29sdW1uLmVkaXRvclRwbCkge1xuICAgIGVsLmNsYXNzTGlzdC5hZGQoQ09MVU1OX0VESVRBQkxFX0NFTExfQ0xBU1MpO1xuICB9XG59XG5cbi8qKiBDZWxsIHRlbXBsYXRlIGNvbnRhaW5lciB0aGF0IGFkZHMgdGhlIHJpZ2h0IGNsYXNzZXMgYW5kIHJvbGUuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdwYmwtbmdyaWQtY2VsbCcsXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInRlbXBsYXRlOyBjb250ZXh0OiBjZWxsQ3R4XCI+PC9uZy1jb250YWluZXI+YCxcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1ob3N0LW1ldGFkYXRhLXByb3BlcnR5XG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAncGJsLW5ncmlkLWNlbGwnLFxuICAgICdyb2xlJzogJ2dyaWRjZWxsJyxcbiAgICAnW2F0dHIuaWRdJzogJ2NvbHVtbj8uaWQnLFxuICAgICdbYXR0ci50YWJpbmRleF0nOiAnY29sdW1uPy5jb2x1bW5EZWY/LmdyaWQuY2VsbEZvY3VzJ1xuICB9LFxuICBleHBvcnRBczogJ3BibE5ncmlkQ2VsbCcsXG59KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkQ2VsbENvbXBvbmVudCBleHRlbmRzIFBibE5ncmlkQmFzZUNlbGwgaW1wbGVtZW50cyBEb0NoZWNrIHtcblxuICBjb2x1bW46IFBibENvbHVtbjtcbiAgY2VsbEN0eDogUGJsQ2VsbENvbnRleHQgfCB1bmRlZmluZWQ7XG4gIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIHByaXZhdGUgX3Jvd0N0eDogUGJsUm93Q29udGV4dDxhbnk+O1xuXG4gIC8qKlxuICAgKiBUaGUgcG9zaXRpb24gb2YgdGhlIGNvbHVtbiBkZWYgYW1vbmcgYWxsIGNvbHVtbnMgcmVnYXJkbGVzcyBvZiB2aXNpYmlsaXR5LlxuICAgKi9cbiAgcHJpdmF0ZSBjb2xJbmRleDogbnVtYmVyO1xuICBwcml2YXRlIGZvY3VzZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBzZWxlY3RlZCA9IGZhbHNlO1xuXG4gIHN5bmNDb2x1bW4oKSB7XG4gICAgaWYgKHRoaXMuY29sdW1uKSB7XG4gICAgICB0aGlzLmNvbEluZGV4ID0gdGhpcy5jb2x1bW4uY29sdW1uRGVmLmdyaWQuY29sdW1uQXBpLmluZGV4T2YodGhpcy5jb2x1bW4pO1xuICAgIH1cbiAgfVxuXG4gIHNldENvbnRleHQoY29udGV4dDogUGJsUm93Q29udGV4dDxhbnk+KSB7XG4gICAgdGhpcy5fcm93Q3R4ID0gY29udGV4dDtcbiAgfVxuXG4gIHNldENvbHVtbihjb2x1bW46IFBibENvbHVtbikge1xuICAgIGNvbnN0IHByZXYgPSB0aGlzLmNvbHVtbjtcbiAgICBpZiAocHJldiAhPT0gY29sdW1uKSB7XG4gICAgICBpZiAocHJldikge1xuICAgICAgICB1bnJ4LmtpbGwodGhpcywgcHJldik7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY29sdW1uID0gY29sdW1uO1xuICAgICAgdGhpcy5jb2xJbmRleCA9IHRoaXMuY29sdW1uLmNvbHVtbkRlZi5ncmlkLmNvbHVtbkFwaS5pbmRleE9mKGNvbHVtbik7XG5cbiAgICAgIGNvbHVtbi5jb2x1bW5EZWYuYXBwbHlXaWR0aCh0aGlzLmVsKTtcbiAgICAgIGluaXRDZWxsRWxlbWVudCh0aGlzLmVsLCBjb2x1bW4sIHByZXYpO1xuICAgICAgaW5pdERhdGFDZWxsRWxlbWVudCh0aGlzLmVsLCBjb2x1bW4sIHByZXYpO1xuXG4gICAgICAvKiAgQXBwbHkgd2lkdGggY2hhbmdlcyB0byB0aGlzIGRhdGEgY2VsbFxuICAgICAgICAgIFdlIGRvbid0IHVwZGF0ZSBcInVwZGF0ZVwiIGV2ZW50cyBiZWNhdXNlIHRoZXkgYXJlIGZvbGxvd2VkIGJ5IGEgcmVzaXplIGV2ZW50IHdoaWNoIHdpbGwgdXBkYXRlIHRoZSBhYnNvbHV0ZSB2YWx1ZSAocHgpICovXG4gICAgICBjb2x1bW4uY29sdW1uRGVmLndpZHRoQ2hhbmdlXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIGZpbHRlciggZXZlbnQgPT4gZXZlbnQucmVhc29uICE9PSAndXBkYXRlJyksXG4gICAgICAgICAgdW5yeCh0aGlzLCBjb2x1bW4pLFxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoZXZlbnQgPT4gdGhpcy5jb2x1bW4uY29sdW1uRGVmLmFwcGx5V2lkdGgodGhpcy5lbCkpO1xuICAgIH1cbiAgfVxuXG4gIG5nRG9DaGVjaygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fcm93Q3R4KSB7XG4gICAgICBjb25zdCBjZWxsQ29udGV4dCA9IHRoaXMuY2VsbEN0eCA9IHRoaXMuX3Jvd0N0eC5jZWxsKHRoaXMuY29sSW5kZXgpO1xuXG4gICAgICB0aGlzLnRlbXBsYXRlID0gY2VsbENvbnRleHQuZWRpdGluZyA/IHRoaXMuY29sdW1uLmVkaXRvclRwbCA6IHRoaXMuY29sdW1uLmNlbGxUcGw7XG5cbiAgICAgIGlmIChjZWxsQ29udGV4dC5mb2N1c2VkICE9PSB0aGlzLmZvY3VzZWQpIHtcblxuICAgICAgICBpZiAodGhpcy5mb2N1c2VkID0gY2VsbENvbnRleHQuZm9jdXNlZCkge1xuICAgICAgICAgIHRoaXMuZWwuY2xhc3NMaXN0LmFkZCgncGJsLW5ncmlkLWNlbGwtZm9jdXNlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZWwuY2xhc3NMaXN0LnJlbW92ZSgncGJsLW5ncmlkLWNlbGwtZm9jdXNlZCcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5jZWxsQ3R4LnNlbGVjdGVkICE9PSB0aGlzLnNlbGVjdGVkKSB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkID0gY2VsbENvbnRleHQuc2VsZWN0ZWQpIHtcbiAgICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5hZGQoJ3BibC1uZ3JpZC1jZWxsLXNlbGVjdGVkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5lbC5jbGFzc0xpc3QucmVtb3ZlKCdwYmwtbmdyaWQtY2VsbC1zZWxlY3RlZCcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=