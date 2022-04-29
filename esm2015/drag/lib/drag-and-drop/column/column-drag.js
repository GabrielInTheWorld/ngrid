import { Directive, Input } from '@angular/core';
import { DragDrop, CDK_DRAG_PARENT } from '@angular/cdk/drag-drop';
import { unrx } from '@pebula/ngrid/core';
import { PblColumn, PblNgridPluginController } from '@pebula/ngrid';
import { PblDragDrop, CdkLazyDrag } from '../core/index';
import { COL_DRAG_CONTAINER_PLUGIN_KEY } from './column-drag-container';
import * as i0 from "@angular/core";
export class PblNgridColumnDragDirective extends CdkLazyDrag {
    constructor() {
        super(...arguments);
        this.rootElementSelector = 'pbl-ngrid-header-cell';
    }
    get column() { return this._column; }
    set column(value) {
        if (value !== this._column) {
            this._column = value;
            this.updateDisabledState();
        }
    }
    ngAfterViewInit() {
        if (!this.cdkDropList) {
            this.cdkDropList = PblNgridPluginController.findPlugin(this.column.columnDef.grid, COL_DRAG_CONTAINER_PLUGIN_KEY);
        }
        super.ngAfterViewInit();
        this._dragRef.beforeStarted.subscribe(() => {
            const { cdkDropList } = this;
            if (cdkDropList === null || cdkDropList === void 0 ? void 0 : cdkDropList.canDrag(this.column)) {
                // we don't allow a new dragging session before the previous ends.
                // this sound impossible, but due to animation transitions its actually is.
                // if the `transitionend` is long enough, a new drag can start...
                //
                // the `disabled` state is checked by pointerDown AFTER calling before start so we can cancel the start...
                if (cdkDropList._dropListRef.isDragging()) {
                    return this.disabled = true;
                }
            }
        });
        this.started.subscribe(() => {
            if (this._column.columnDef) {
                this.column.columnDef.isDragging = true;
            }
        });
        this.ended.subscribe(() => {
            if (this._column.columnDef) {
                this.column.columnDef.isDragging = false;
            }
        });
    }
    ngOnDestroy() {
        unrx.kill(this);
        super.ngOnDestroy();
    }
    getCells() {
        if (!this.cache) {
            this.cache = this.column.columnDef.queryCellElements('table');
        }
        return this.cache;
    }
    reset() {
        super.reset();
        if (this.cache) {
            for (const el of this.cache) {
                el.style.transform = ``;
            }
            this.cache = undefined;
        }
    }
    dropContainerChanged(prev) {
        if (prev) {
            unrx.kill(this, prev);
        }
        this.updateDisabledState();
        this.updateBoundaryElement();
        if (this.cdkDropList) {
            this.cdkDropList.connectionsChanged
                .pipe(unrx(this, this.cdkDropList))
                .subscribe(() => this.updateBoundaryElement());
        }
    }
    updateDisabledState() {
        this.disabled = this.column && this.cdkDropList ? !this.cdkDropList.canDrag(this.column) : true;
    }
    updateBoundaryElement() {
        var _a;
        if ((_a = this.cdkDropList) === null || _a === void 0 ? void 0 : _a.hasConnections()) {
            this.boundaryElement = undefined;
        }
        else {
            this.boundaryElement = this.cdkDropList.directContainerElement;
        }
    }
}
/** @nocollapse */ PblNgridColumnDragDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridColumnDragDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ PblNgridColumnDragDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridColumnDragDirective, selector: "[pblNgridColumnDrag]", inputs: { column: ["pblNgridColumnDrag", "column"] }, host: { properties: { "class.cdk-drag-dragging": "_dragRef.isDragging()" }, classAttribute: "cdk-drag" }, providers: [
        { provide: DragDrop, useExisting: PblDragDrop },
        { provide: CDK_DRAG_PARENT, useExisting: PblNgridColumnDragDirective }
    ], exportAs: ["pblNgridColumnDrag"], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridColumnDragDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pblNgridColumnDrag]',
                    exportAs: 'pblNgridColumnDrag',
                    host: {
                        'class': 'cdk-drag',
                        '[class.cdk-drag-dragging]': '_dragRef.isDragging()',
                    },
                    providers: [
                        { provide: DragDrop, useExisting: PblDragDrop },
                        { provide: CDK_DRAG_PARENT, useExisting: PblNgridColumnDragDirective }
                    ]
                }]
        }], propDecorators: { column: [{
                type: Input,
                args: ['pblNgridColumnDrag']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLWRyYWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25ncmlkL2RyYWcvc3JjL2xpYi9kcmFnLWFuZC1kcm9wL2NvbHVtbi9jb2x1bW4tZHJhZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRW5FLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUMxQyxPQUFPLEVBQUUsU0FBUyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pELE9BQU8sRUFBRSw2QkFBNkIsRUFBd0MsTUFBTSx5QkFBeUIsQ0FBQzs7QUFjOUcsTUFBTSxPQUFPLDJCQUFxQyxTQUFRLFdBQXVGO0lBWmpKOztRQWFFLHdCQUFtQixHQUFHLHVCQUF1QixDQUFDO0tBOEYvQztJQTVGQyxJQUFpQyxNQUFNLEtBQWdCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDN0UsSUFBSSxNQUFNLENBQUMsS0FBZ0I7UUFDekIsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUMxQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNyQixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztTQUM1QjtJQUNILENBQUM7SUFLRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDckIsSUFBSSxDQUFDLFdBQVcsR0FBRyx3QkFBd0IsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLDZCQUE2QixD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Qjs7UUFDM0IsSUFBSSxNQUFBLElBQUksQ0FBQyxXQUFXLDBDQUFFLGNBQWMsRUFBRSxFQUFFO1lBQ3RDLElBQUksQ0FBQyxlQUFlLEdBQUcsU0FBUyxDQUFDO1NBQ2xDO2FBQU07WUFDTCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsc0JBQXNCLENBQUM7U0FDaEU7SUFDSCxDQUFDOzsySUE5RlUsMkJBQTJCOytIQUEzQiwyQkFBMkIsK01BTDNCO1FBQ1QsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUU7UUFDL0MsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSwyQkFBMkIsRUFBRTtLQUN2RTsyRkFFVSwyQkFBMkI7a0JBWnZDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtvQkFDaEMsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsSUFBSSxFQUFFO3dCQUNKLE9BQU8sRUFBRSxVQUFVO3dCQUNuQiwyQkFBMkIsRUFBRSx1QkFBdUI7cUJBQ3JEO29CQUNELFNBQVMsRUFBRTt3QkFDVCxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRTt3QkFDL0MsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLFdBQVcsNkJBQTZCLEVBQUU7cUJBQ3ZFO2lCQUNGOzhCQUlrQyxNQUFNO3NCQUF0QyxLQUFLO3VCQUFDLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERyYWdEcm9wLCBDREtfRFJBR19QQVJFTlQgfSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcblxuaW1wb3J0IHsgdW5yeCB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQvY29yZSc7XG5pbXBvcnQgeyBQYmxDb2x1bW4sIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlciB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuaW1wb3J0IHsgUGJsRHJhZ0Ryb3AsIENka0xhenlEcmFnIH0gZnJvbSAnLi4vY29yZS9pbmRleCc7XG5pbXBvcnQgeyBDT0xfRFJBR19DT05UQUlORVJfUExVR0lOX0tFWSwgUGJsTmdyaWRDb2x1bW5EcmFnQ29udGFpbmVyRGlyZWN0aXZlIH0gZnJvbSAnLi9jb2x1bW4tZHJhZy1jb250YWluZXInO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbcGJsTmdyaWRDb2x1bW5EcmFnXScsXG4gIGV4cG9ydEFzOiAncGJsTmdyaWRDb2x1bW5EcmFnJyxcbiAgaG9zdDogeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLWhvc3QtbWV0YWRhdGEtcHJvcGVydHlcbiAgICAnY2xhc3MnOiAnY2RrLWRyYWcnLFxuICAgICdbY2xhc3MuY2RrLWRyYWctZHJhZ2dpbmddJzogJ19kcmFnUmVmLmlzRHJhZ2dpbmcoKScsXG4gIH0sXG4gIHByb3ZpZGVyczogW1xuICAgIHsgcHJvdmlkZTogRHJhZ0Ryb3AsIHVzZUV4aXN0aW5nOiBQYmxEcmFnRHJvcCB9LFxuICAgIHsgcHJvdmlkZTogQ0RLX0RSQUdfUEFSRU5ULCB1c2VFeGlzdGluZzogUGJsTmdyaWRDb2x1bW5EcmFnRGlyZWN0aXZlIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZENvbHVtbkRyYWdEaXJlY3RpdmU8VCA9IGFueT4gZXh0ZW5kcyBDZGtMYXp5RHJhZzxULCBQYmxOZ3JpZENvbHVtbkRyYWdDb250YWluZXJEaXJlY3RpdmU8VD4sIFBibE5ncmlkQ29sdW1uRHJhZ0RpcmVjdGl2ZTxUPj4ge1xuICByb290RWxlbWVudFNlbGVjdG9yID0gJ3BibC1uZ3JpZC1oZWFkZXItY2VsbCc7XG5cbiAgQElucHV0KCdwYmxOZ3JpZENvbHVtbkRyYWcnKSBnZXQgY29sdW1uKCk6IFBibENvbHVtbiB7IHJldHVybiB0aGlzLl9jb2x1bW47IH1cbiAgc2V0IGNvbHVtbih2YWx1ZTogUGJsQ29sdW1uKSB7XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLl9jb2x1bW4pIHtcbiAgICAgIHRoaXMuX2NvbHVtbiA9IHZhbHVlO1xuICAgICAgdGhpcy51cGRhdGVEaXNhYmxlZFN0YXRlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY29sdW1uOiBQYmxDb2x1bW47XG4gIHByaXZhdGUgY2FjaGU6IEhUTUxFbGVtZW50W107XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5jZGtEcm9wTGlzdCkge1xuICAgICAgdGhpcy5jZGtEcm9wTGlzdCA9IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlci5maW5kUGx1Z2luKHRoaXMuY29sdW1uLmNvbHVtbkRlZi5ncmlkLCBDT0xfRFJBR19DT05UQUlORVJfUExVR0lOX0tFWSk7XG4gICAgfVxuXG4gICAgc3VwZXIubmdBZnRlclZpZXdJbml0KCk7XG5cbiAgICB0aGlzLl9kcmFnUmVmLmJlZm9yZVN0YXJ0ZWQuc3Vic2NyaWJlKCAoKSA9PiB7XG4gICAgICBjb25zdCB7IGNka0Ryb3BMaXN0IH0gPSB0aGlzO1xuICAgICAgaWYgKGNka0Ryb3BMaXN0Py5jYW5EcmFnKHRoaXMuY29sdW1uKSkge1xuICAgICAgICAvLyB3ZSBkb24ndCBhbGxvdyBhIG5ldyBkcmFnZ2luZyBzZXNzaW9uIGJlZm9yZSB0aGUgcHJldmlvdXMgZW5kcy5cbiAgICAgICAgLy8gdGhpcyBzb3VuZCBpbXBvc3NpYmxlLCBidXQgZHVlIHRvIGFuaW1hdGlvbiB0cmFuc2l0aW9ucyBpdHMgYWN0dWFsbHkgaXMuXG4gICAgICAgIC8vIGlmIHRoZSBgdHJhbnNpdGlvbmVuZGAgaXMgbG9uZyBlbm91Z2gsIGEgbmV3IGRyYWcgY2FuIHN0YXJ0Li4uXG4gICAgICAgIC8vXG4gICAgICAgIC8vIHRoZSBgZGlzYWJsZWRgIHN0YXRlIGlzIGNoZWNrZWQgYnkgcG9pbnRlckRvd24gQUZURVIgY2FsbGluZyBiZWZvcmUgc3RhcnQgc28gd2UgY2FuIGNhbmNlbCB0aGUgc3RhcnQuLi5cbiAgICAgICAgaWYgKGNka0Ryb3BMaXN0Ll9kcm9wTGlzdFJlZi5pc0RyYWdnaW5nKCkpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuc3RhcnRlZC5zdWJzY3JpYmUoICgpID0+IHtcbiAgICAgIGlmICh0aGlzLl9jb2x1bW4uY29sdW1uRGVmKSB7XG4gICAgICAgIHRoaXMuY29sdW1uLmNvbHVtbkRlZi5pc0RyYWdnaW5nID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLmVuZGVkLnN1YnNjcmliZSggKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuX2NvbHVtbi5jb2x1bW5EZWYpIHtcbiAgICAgICAgdGhpcy5jb2x1bW4uY29sdW1uRGVmLmlzRHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHVucngua2lsbCh0aGlzKTtcbiAgICBzdXBlci5uZ09uRGVzdHJveSgpO1xuICB9XG5cbiAgZ2V0Q2VsbHMoKTogSFRNTEVsZW1lbnRbXSB7XG4gICAgaWYgKCF0aGlzLmNhY2hlKSB7XG4gICAgICB0aGlzLmNhY2hlID0gdGhpcy5jb2x1bW4uY29sdW1uRGVmLnF1ZXJ5Q2VsbEVsZW1lbnRzKCd0YWJsZScpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jYWNoZTtcbiAgfVxuXG4gIHJlc2V0KCk6IHZvaWQge1xuICAgIHN1cGVyLnJlc2V0KCk7XG4gICAgaWYgKHRoaXMuY2FjaGUpIHtcbiAgICAgIGZvciAoY29uc3QgZWwgb2YgdGhpcy5jYWNoZSkge1xuICAgICAgICBlbC5zdHlsZS50cmFuc2Zvcm0gPSBgYDtcbiAgICAgIH1cbiAgICAgIHRoaXMuY2FjaGUgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGRyb3BDb250YWluZXJDaGFuZ2VkKHByZXY6IFBibE5ncmlkQ29sdW1uRHJhZ0NvbnRhaW5lckRpcmVjdGl2ZTxUPikge1xuICAgIGlmIChwcmV2KSB7XG4gICAgICB1bnJ4LmtpbGwodGhpcywgcHJldik7XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVEaXNhYmxlZFN0YXRlKCk7XG5cbiAgICB0aGlzLnVwZGF0ZUJvdW5kYXJ5RWxlbWVudCgpO1xuICAgIGlmICh0aGlzLmNka0Ryb3BMaXN0KSB7XG4gICAgICB0aGlzLmNka0Ryb3BMaXN0LmNvbm5lY3Rpb25zQ2hhbmdlZFxuICAgICAgICAucGlwZSh1bnJ4KHRoaXMsIHRoaXMuY2RrRHJvcExpc3QpKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMudXBkYXRlQm91bmRhcnlFbGVtZW50KCkpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlRGlzYWJsZWRTdGF0ZSgpIHtcbiAgICB0aGlzLmRpc2FibGVkID0gdGhpcy5jb2x1bW4gJiYgdGhpcy5jZGtEcm9wTGlzdCA/ICF0aGlzLmNka0Ryb3BMaXN0LmNhbkRyYWcodGhpcy5jb2x1bW4pIDogdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlQm91bmRhcnlFbGVtZW50KCkge1xuICAgIGlmICh0aGlzLmNka0Ryb3BMaXN0Py5oYXNDb25uZWN0aW9ucygpKSB7XG4gICAgICB0aGlzLmJvdW5kYXJ5RWxlbWVudCA9IHVuZGVmaW5lZDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ib3VuZGFyeUVsZW1lbnQgPSB0aGlzLmNka0Ryb3BMaXN0LmRpcmVjdENvbnRhaW5lckVsZW1lbnQ7XG4gICAgfVxuICB9XG59XG4iXX0=