import { ChangeDetectorRef, Injector, Directive, ElementRef, Optional, ViewContainerRef, ViewChild, Inject, } from '@angular/core';
import { unrx } from '@pebula/ngrid/core';
import { PBL_NGRID_COMPONENT } from '../../tokens';
import { PblNgridPluginController } from '../../ext/plugin-control';
import { EXT_API_TOKEN } from '../../ext/grid-ext-api';
import { moveItemInArrayExt } from '../column/management/column-store';
import * as i0 from "@angular/core";
export const PBL_NGRID_BASE_ROW_TEMPLATE = `<ng-container #viewRef></ng-container>`;
// tslint:disable-next-line: no-conflicting-lifecycle
export class PblNgridBaseRowComponent {
    constructor(grid, cdRef, elementRef) {
        this.cdRef = cdRef;
        this._cells = [];
        this._attached = true;
        this.element = elementRef.nativeElement;
        if (grid) {
            this.grid = grid;
        }
        this.onCtor();
    }
    get height() {
        return this.element.getBoundingClientRect().height;
    }
    get cellsLength() { return this._cells.length; }
    /**
     * An attached row will run change detection on it's children.
     * All rows are attached by default.
     */
    get attached() { return this._attached; }
    ngOnInit() {
        if (!this.grid) {
            if (typeof ngDevMode === 'undefined' || ngDevMode) {
                throw new Error(`When a grid row is used outside the scope of a grid, you must provide the grid instance.`);
            }
        }
        this.resolveTokens();
        this.element.setAttribute('data-rowtype', this.rowType);
        this._extApi.rowsApi.addRow(this);
    }
    ngAfterViewInit() {
        for (const c of this._extApi.columnStore.getColumnsOf(this)) {
            this._createCell(c);
        }
        this.detectChanges();
    }
    ngDoCheck() {
        if (this._attached && this.grid) {
            this.detectChanges();
        }
    }
    ngOnDestroy() {
        var _a;
        unrx.kill(this);
        (_a = this._extApi) === null || _a === void 0 ? void 0 : _a.rowsApi.removeRow(this);
    }
    /**
     * Marks the row as attached.
     * Rows are attached by default.
     * An attached row takes part in the change detection process
     */
    _attach() {
        if (!this._attached) {
            this._attached = true;
            return true;
        }
        return false;
    }
    /**
     * Marks the row as detached.
     * A detached row DOWS NOT take part in the change detection process.
     *
     * Usually when the rendering engine cache row elements for performance, these should be detached when cached and re-attached when returned into view.
     */
    _detach() {
        if (this._attached) {
            this._attached = false;
            return true;
        }
        return false;
    }
    _createCell(column, atIndex) {
        if (!this.canCreateCell || this.canCreateCell(column, atIndex)) {
            const cell = this.createComponent(column, atIndex);
            cell.instance.setOwner(this);
            if (this.cellCreated) {
                this.cellCreated(column, cell);
            }
        }
    }
    _destroyCell(cellOrCellIndex) {
        const cell = typeof cellOrCellIndex === 'number' ? this._cells[cellOrCellIndex] : cellOrCellIndex;
        if (cell) {
            const index = this._cells.indexOf(cell);
            if (!this.canDestroyCell || this.canDestroyCell(cell)) {
                const len = this._cells.length;
                this._viewRef.remove(index);
                if (len === this._cells.length) {
                    this._cells.splice(index, 1);
                }
                if (this.cellDestroyed) {
                    this.cellDestroyed(cell, index);
                }
            }
        }
    }
    _moveCell(fromIndex, toIndex) {
        const cmp = this._cells[fromIndex];
        if (cmp) {
            if (!this.canMoveCell || this.canMoveCell(fromIndex, toIndex, cmp)) {
                this._viewRef.move(cmp.hostView, toIndex);
                moveItemInArrayExt(this._cells, fromIndex, toIndex, (previousItem, currentItem, previousIndex, currentIndex) => {
                    if (this.cellMoved) {
                        this.cellMoved(previousItem, currentItem, previousIndex, currentIndex);
                    }
                });
            }
        }
    }
    createComponent(column, atIndex) {
        const viewRefLength = this._viewRef.length;
        if (!atIndex && atIndex !== 0) {
            atIndex = viewRefLength;
        }
        atIndex = Math.min(viewRefLength, atIndex);
        const cell = this._viewRef.createComponent(this._extApi.rowsApi.cellFactory.getComponentFactory(this), atIndex, this.cellInjector);
        this._cells.splice(atIndex, 0, cell);
        cell.onDestroy(() => this._cells.splice(this._cells.indexOf(cell), 1));
        return cell;
    }
    /**
     * Resolves the extensions API and the injector to be used when creating cells.
     */
    resolveTokens() {
        var _a;
        // The cells require the extApi and grid to live on the DI tree.
        // In the case of row it might not be there since the row is defined outside of the grid somewhere
        // Row's are defined view templates so their DI tree depended on their location hence we need to verify
        // that we can get the extApi from the viewRef's injector, if so, great if not we need to extend the injector we use
        // to build cells.
        const injector = (_a = this._viewRef) === null || _a === void 0 ? void 0 : _a.injector;
        const extApi = injector === null || injector === void 0 ? void 0 : injector.get(EXT_API_TOKEN, null);
        if (!extApi) {
            // _extApi might be here already...
            this._extApi = this._extApi || PblNgridPluginController.find(this.grid).extApi;
            this.cellInjector = Injector.create({
                providers: [
                    { provide: PBL_NGRID_COMPONENT, useValue: this.grid },
                    { provide: this.grid.constructor, useValue: this.grid },
                    { provide: EXT_API_TOKEN, useValue: this._extApi },
                ],
                parent: injector,
            });
        }
        else {
            this._extApi = this._extApi || extApi;
            this.cellInjector = injector;
        }
    }
}
/** @nocollapse */ PblNgridBaseRowComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridBaseRowComponent, deps: [{ token: PBL_NGRID_COMPONENT, optional: true }, { token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ PblNgridBaseRowComponent.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridBaseRowComponent, viewQueries: [{ propertyName: "_viewRef", first: true, predicate: ["viewRef"], descendants: true, read: ViewContainerRef, static: true }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridBaseRowComponent, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [PBL_NGRID_COMPONENT]
                }, {
                    type: Optional
                }] }, { type: i0.ChangeDetectorRef }, { type: i0.ElementRef }]; }, propDecorators: { _viewRef: [{
                type: ViewChild,
                args: ['viewRef', { read: ViewContainerRef, static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1yb3cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3JpZC9zcmMvbGliL2dyaWQvcm93L2Jhc2Utcm93LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ1UsaUJBQWlCLEVBQUUsUUFBUSxFQUMxQyxTQUFTLEVBQ1QsVUFBVSxFQUNWLFFBQVEsRUFHUixnQkFBZ0IsRUFDaEIsU0FBUyxFQUVULE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFMUMsT0FBTyxFQUFzQixtQkFBbUIsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsYUFBYSxFQUFnQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3JGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDOztBQUl2RSxNQUFNLENBQUMsTUFBTSwyQkFBMkIsR0FBSSx3Q0FBd0MsQ0FBQztBQUVyRixxREFBcUQ7QUFFckQsTUFBTSxPQUFnQix3QkFBd0I7SUErQjVDLFlBQXFELElBQTJCLEVBQzNELEtBQXdCLEVBQ2pDLFVBQW1DO1FBRDFCLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBUG5DLFdBQU0sR0FBc0QsRUFBRSxDQUFDO1FBSWpFLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFLdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsYUFBYSxDQUFDO1FBQ3hDLElBQUksSUFBSSxFQUFFO1lBQ1IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7U0FDbEI7UUFDRCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQS9CRCxJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxPQUFP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QUFHLElBQUksQ0FBQyxPQUFPLElBQUksd0JBQXdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUF5QyxDQUFDO1lBQ2xILElBQUksQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQztnQkFDbEMsU0FBUyxFQUFFO29CQUNULEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFO29CQUNyRCxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRTtvQkFDdkQsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFO2lCQUNuRDtnQkFDRCxNQUFNLEVBQUUsUUFBUTthQUNqQixDQUFDLENBQUM7U0FDSjthQUFNO1lBQ0wsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxJQUFJLE1BQU0sQ0FBQztZQUN0QyxJQUFJLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQztTQUM5QjtJQUNILENBQUM7O3dJQTNMbUIsd0JBQXdCLGtCQStCeEIsbUJBQW1COzRIQS9CbkIsd0JBQXdCLDBHQUlkLGdCQUFnQjsyRkFKMUIsd0JBQXdCO2tCQUQ3QyxTQUFTOzswQkFnQ0ssTUFBTTsyQkFBQyxtQkFBbUI7OzBCQUFHLFFBQVE7cUdBM0JjLFFBQVE7c0JBQXZFLFNBQVM7dUJBQUMsU0FBUyxFQUFFLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlclZpZXdJbml0LCBDaGFuZ2VEZXRlY3RvclJlZiwgSW5qZWN0b3IsIE9uSW5pdCxcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBPcHRpb25hbCxcbiAgRG9DaGVjayxcbiAgT25EZXN0cm95LFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBWaWV3Q2hpbGQsXG4gIENvbXBvbmVudFJlZixcbiAgSW5qZWN0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHVucnggfSBmcm9tICdAcGVidWxhL25ncmlkL2NvcmUnO1xuXG5pbXBvcnQgeyBfUGJsTmdyaWRDb21wb25lbnQsIFBCTF9OR1JJRF9DT01QT05FTlQgfSBmcm9tICcuLi8uLi90b2tlbnMnO1xuaW1wb3J0IHsgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyIH0gZnJvbSAnLi4vLi4vZXh0L3BsdWdpbi1jb250cm9sJztcbmltcG9ydCB7IEVYVF9BUElfVE9LRU4sIFBibE5ncmlkSW50ZXJuYWxFeHRlbnNpb25BcGkgfSBmcm9tICcuLi8uLi9leHQvZ3JpZC1leHQtYXBpJztcbmltcG9ydCB7IG1vdmVJdGVtSW5BcnJheUV4dCB9IGZyb20gJy4uL2NvbHVtbi9tYW5hZ2VtZW50L2NvbHVtbi1zdG9yZSc7XG5pbXBvcnQgeyBHcmlkUm93VHlwZSwgUGJsUm93VHlwZVRvQ2VsbFR5cGVNYXAgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IFBibFJvd1R5cGVUb0NvbHVtblR5cGVNYXAgfSBmcm9tICcuLi9jb2x1bW4vbWFuYWdlbWVudCc7XG5cbmV4cG9ydCBjb25zdCBQQkxfTkdSSURfQkFTRV9ST1dfVEVNUExBVEUgID0gYDxuZy1jb250YWluZXIgI3ZpZXdSZWY+PC9uZy1jb250YWluZXI+YDtcblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1jb25mbGljdGluZy1saWZlY3ljbGVcbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFBibE5ncmlkQmFzZVJvd0NvbXBvbmVudDxUUm93VHlwZSBleHRlbmRzIEdyaWRSb3dUeXBlLCBUID0gYW55PiBpbXBsZW1lbnRzIE9uSW5pdCwgRG9DaGVjaywgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICBncmlkOiBfUGJsTmdyaWRDb21wb25lbnQ8VD47XG5cbiAgQFZpZXdDaGlsZCgndmlld1JlZicsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiwgc3RhdGljOiB0cnVlIH0pIF92aWV3UmVmOiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gIHJlYWRvbmx5IGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gIGdldCBoZWlnaHQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG4gIH1cblxuICBnZXQgY2VsbHNMZW5ndGgoKSB7IHJldHVybiB0aGlzLl9jZWxscy5sZW5ndGg7IH1cblxuICAvKipcbiAgICogQW4gYXR0YWNoZWQgcm93IHdpbGwgcnVuIGNoYW5nZSBkZXRlY3Rpb24gb24gaXQncyBjaGlsZHJlbi5cbiAgICogQWxsIHJvd3MgYXJlIGF0dGFjaGVkIGJ5IGRlZmF1bHQuXG4gICAqL1xuICBnZXQgYXR0YWNoZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9hdHRhY2hlZDsgfVxuXG4gIGFic3RyYWN0IHJlYWRvbmx5IHJvd1R5cGU6IFRSb3dUeXBlO1xuXG4gIGFic3RyYWN0IGdldCByb3dJbmRleCgpOiBudW1iZXI7XG5cbiAgcHJvdGVjdGVkIF9leHRBcGk6IFBibE5ncmlkSW50ZXJuYWxFeHRlbnNpb25BcGk8VD47XG4gIHByb3RlY3RlZCBfY2VsbHM6IENvbXBvbmVudFJlZjxQYmxSb3dUeXBlVG9DZWxsVHlwZU1hcDxUUm93VHlwZT4+W10gPSBbXTtcblxuICBwcm90ZWN0ZWQgY2VsbEluamVjdG9yOiBJbmplY3RvcjtcblxuICBwcml2YXRlIF9hdHRhY2hlZCA9IHRydWU7XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChQQkxfTkdSSURfQ09NUE9ORU5UKSBAT3B0aW9uYWwoKSBncmlkOiBfUGJsTmdyaWRDb21wb25lbnQ8VD4sXG4gICAgICAgICAgICAgIHJlYWRvbmx5IGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgICAgICAgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgaWYgKGdyaWQpIHtcbiAgICAgIHRoaXMuZ3JpZCA9IGdyaWQ7XG4gICAgfVxuICAgIHRoaXMub25DdG9yKCk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAoIXRoaXMuZ3JpZCkge1xuICAgICAgaWYgKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFdoZW4gYSBncmlkIHJvdyBpcyB1c2VkIG91dHNpZGUgdGhlIHNjb3BlIG9mIGEgZ3JpZCwgeW91IG11c3QgcHJvdmlkZSB0aGUgZ3JpZCBpbnN0YW5jZS5gKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5yZXNvbHZlVG9rZW5zKCk7XG4gICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS1yb3d0eXBlJywgdGhpcy5yb3dUeXBlKTtcbiAgICB0aGlzLl9leHRBcGkucm93c0FwaS5hZGRSb3codGhpcylcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IGMgb2YgdGhpcy5fZXh0QXBpLmNvbHVtblN0b3JlLmdldENvbHVtbnNPZih0aGlzKSkge1xuICAgICAgdGhpcy5fY3JlYXRlQ2VsbChjKTtcbiAgICB9XG4gICAgdGhpcy5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBuZ0RvQ2hlY2soKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2F0dGFjaGVkICYmIHRoaXMuZ3JpZCkge1xuICAgICAgdGhpcy5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdW5yeC5raWxsKHRoaXMpO1xuICAgIHRoaXMuX2V4dEFwaT8ucm93c0FwaS5yZW1vdmVSb3codGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogTWFya3MgdGhlIHJvdyBhcyBhdHRhY2hlZC5cbiAgICogUm93cyBhcmUgYXR0YWNoZWQgYnkgZGVmYXVsdC5cbiAgICogQW4gYXR0YWNoZWQgcm93IHRha2VzIHBhcnQgaW4gdGhlIGNoYW5nZSBkZXRlY3Rpb24gcHJvY2Vzc1xuICAgKi9cbiAgX2F0dGFjaCgpOiBib29sZWFuIHtcbiAgICBpZiAoIXRoaXMuX2F0dGFjaGVkKSB7XG4gICAgICB0aGlzLl9hdHRhY2hlZCA9IHRydWU7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIE1hcmtzIHRoZSByb3cgYXMgZGV0YWNoZWQuXG4gICAqIEEgZGV0YWNoZWQgcm93IERPV1MgTk9UIHRha2UgcGFydCBpbiB0aGUgY2hhbmdlIGRldGVjdGlvbiBwcm9jZXNzLlxuICAgKlxuICAgKiBVc3VhbGx5IHdoZW4gdGhlIHJlbmRlcmluZyBlbmdpbmUgY2FjaGUgcm93IGVsZW1lbnRzIGZvciBwZXJmb3JtYW5jZSwgdGhlc2Ugc2hvdWxkIGJlIGRldGFjaGVkIHdoZW4gY2FjaGVkIGFuZCByZS1hdHRhY2hlZCB3aGVuIHJldHVybmVkIGludG8gdmlldy5cbiAgICovXG4gIF9kZXRhY2goKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuX2F0dGFjaGVkKSB7XG4gICAgICB0aGlzLl9hdHRhY2hlZCA9IGZhbHNlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIF9jcmVhdGVDZWxsKGNvbHVtbjogUGJsUm93VHlwZVRvQ29sdW1uVHlwZU1hcDxUUm93VHlwZT4sIGF0SW5kZXg/OiBudW1iZXIpIHtcbiAgICBpZiAoIXRoaXMuY2FuQ3JlYXRlQ2VsbCB8fCB0aGlzLmNhbkNyZWF0ZUNlbGwoY29sdW1uLCBhdEluZGV4KSkge1xuICAgICAgY29uc3QgY2VsbCA9IHRoaXMuY3JlYXRlQ29tcG9uZW50KGNvbHVtbiwgYXRJbmRleCk7XG4gICAgICBjZWxsLmluc3RhbmNlLnNldE93bmVyKHRoaXMpO1xuICAgICAgaWYgKHRoaXMuY2VsbENyZWF0ZWQpIHtcbiAgICAgICAgdGhpcy5jZWxsQ3JlYXRlZChjb2x1bW4sIGNlbGwpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9kZXN0cm95Q2VsbChjZWxsT3JDZWxsSW5kZXg6IG51bWJlciB8IENvbXBvbmVudFJlZjxQYmxSb3dUeXBlVG9DZWxsVHlwZU1hcDxUUm93VHlwZT4+KSB7XG4gICAgY29uc3QgY2VsbCA9IHR5cGVvZiBjZWxsT3JDZWxsSW5kZXggPT09ICdudW1iZXInID8gdGhpcy5fY2VsbHNbY2VsbE9yQ2VsbEluZGV4XSA6IGNlbGxPckNlbGxJbmRleDtcbiAgICBpZiAoY2VsbCkge1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9jZWxscy5pbmRleE9mKGNlbGwpO1xuICAgICAgaWYgKCF0aGlzLmNhbkRlc3Ryb3lDZWxsIHx8IHRoaXMuY2FuRGVzdHJveUNlbGwoY2VsbCkpIHtcbiAgICAgICAgY29uc3QgbGVuID0gdGhpcy5fY2VsbHMubGVuZ3RoO1xuICAgICAgICB0aGlzLl92aWV3UmVmLnJlbW92ZShpbmRleCk7XG4gICAgICAgIGlmIChsZW4gPT09IHRoaXMuX2NlbGxzLmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuX2NlbGxzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY2VsbERlc3Ryb3llZCkge1xuICAgICAgICAgIHRoaXMuY2VsbERlc3Ryb3llZChjZWxsLCBpbmRleCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfbW92ZUNlbGwoZnJvbUluZGV4OiBudW1iZXIsIHRvSW5kZXg6IG51bWJlcikge1xuICAgIGNvbnN0IGNtcCA9IHRoaXMuX2NlbGxzW2Zyb21JbmRleF07XG4gICAgaWYgKGNtcCkge1xuICAgICAgaWYgKCF0aGlzLmNhbk1vdmVDZWxsIHx8IHRoaXMuY2FuTW92ZUNlbGwoZnJvbUluZGV4LCB0b0luZGV4LCBjbXApKSB7XG4gICAgICAgIHRoaXMuX3ZpZXdSZWYubW92ZShjbXAuaG9zdFZpZXcsIHRvSW5kZXgpO1xuICAgICAgICBtb3ZlSXRlbUluQXJyYXlFeHQodGhpcy5fY2VsbHMsIGZyb21JbmRleCwgdG9JbmRleCwgKHByZXZpb3VzSXRlbSwgY3VycmVudEl0ZW0sIHByZXZpb3VzSW5kZXgsIGN1cnJlbnRJbmRleCkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLmNlbGxNb3ZlZCkge1xuICAgICAgICAgICAgdGhpcy5jZWxsTW92ZWQocHJldmlvdXNJdGVtLCBjdXJyZW50SXRlbSwgcHJldmlvdXNJbmRleCwgY3VycmVudEluZGV4KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBkZXRlY3RDaGFuZ2VzKCk7XG4gIHByb3RlY3RlZCBhYnN0cmFjdCBvbkN0b3IoKTtcblxuICBwcm90ZWN0ZWQgY2FuQ3JlYXRlQ2VsbD8oY29sdW1uOiBQYmxSb3dUeXBlVG9Db2x1bW5UeXBlTWFwPFRSb3dUeXBlPiwgYXRJbmRleD86IG51bWJlcik6IGJvb2xlYW47XG4gIHByb3RlY3RlZCBjYW5EZXN0cm95Q2VsbD8oY2VsbDogQ29tcG9uZW50UmVmPFBibFJvd1R5cGVUb0NlbGxUeXBlTWFwPFRSb3dUeXBlPj4pOiBib29sZWFuO1xuICBwcm90ZWN0ZWQgY2FuTW92ZUNlbGw/KGZyb21JbmRleDogbnVtYmVyLCB0b0luZGV4OiBudW1iZXIsIGNlbGw6IENvbXBvbmVudFJlZjxQYmxSb3dUeXBlVG9DZWxsVHlwZU1hcDxUUm93VHlwZT4+KTogYm9vbGVhbjtcbiAgcHJvdGVjdGVkIGNlbGxDcmVhdGVkPyhjb2x1bW46IFBibFJvd1R5cGVUb0NvbHVtblR5cGVNYXA8VFJvd1R5cGU+LCBjZWxsOiBDb21wb25lbnRSZWY8UGJsUm93VHlwZVRvQ2VsbFR5cGVNYXA8VFJvd1R5cGU+Pik7XG4gIHByb3RlY3RlZCBjZWxsRGVzdHJveWVkPyhjZWxsOiBDb21wb25lbnRSZWY8UGJsUm93VHlwZVRvQ2VsbFR5cGVNYXA8VFJvd1R5cGU+PiwgcHJldmlvdXNJbmRleDogbnVtYmVyKTtcbiAgcHJvdGVjdGVkIGNlbGxNb3ZlZD8ocHJldmlvdXNJdGVtOiBDb21wb25lbnRSZWY8UGJsUm93VHlwZVRvQ2VsbFR5cGVNYXA8VFJvd1R5cGU+PiwgY3VycmVudEl0ZW06IENvbXBvbmVudFJlZjxQYmxSb3dUeXBlVG9DZWxsVHlwZU1hcDxUUm93VHlwZT4+LCBwcmV2aW91c0luZGV4OiBudW1iZXIsIGN1cnJlbnRJbmRleDogbnVtYmVyKTtcblxuICBwcm90ZWN0ZWQgY3JlYXRlQ29tcG9uZW50KGNvbHVtbjogUGJsUm93VHlwZVRvQ29sdW1uVHlwZU1hcDxUUm93VHlwZT4sIGF0SW5kZXg/OiBudW1iZXIpIHtcbiAgICBjb25zdCB2aWV3UmVmTGVuZ3RoID0gdGhpcy5fdmlld1JlZi5sZW5ndGg7XG4gICAgaWYgKCFhdEluZGV4ICYmIGF0SW5kZXggIT09IDApIHtcbiAgICAgIGF0SW5kZXggPSB2aWV3UmVmTGVuZ3RoO1xuICAgIH1cbiAgICBhdEluZGV4ID0gTWF0aC5taW4odmlld1JlZkxlbmd0aCwgYXRJbmRleCk7XG4gICAgY29uc3QgY2VsbCA9IHRoaXMuX3ZpZXdSZWYuY3JlYXRlQ29tcG9uZW50KHRoaXMuX2V4dEFwaS5yb3dzQXBpLmNlbGxGYWN0b3J5LmdldENvbXBvbmVudEZhY3RvcnkodGhpcyksIGF0SW5kZXgsIHRoaXMuY2VsbEluamVjdG9yKTtcbiAgICB0aGlzLl9jZWxscy5zcGxpY2UoYXRJbmRleCwgMCwgY2VsbCk7XG4gICAgY2VsbC5vbkRlc3Ryb3koKCkgPT4gdGhpcy5fY2VsbHMuc3BsaWNlKHRoaXMuX2NlbGxzLmluZGV4T2YoY2VsbCksIDEpKTtcbiAgICByZXR1cm4gY2VsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNvbHZlcyB0aGUgZXh0ZW5zaW9ucyBBUEkgYW5kIHRoZSBpbmplY3RvciB0byBiZSB1c2VkIHdoZW4gY3JlYXRpbmcgY2VsbHMuXG4gICAqL1xuICBwcm90ZWN0ZWQgcmVzb2x2ZVRva2VucygpIHtcbiAgICAvLyBUaGUgY2VsbHMgcmVxdWlyZSB0aGUgZXh0QXBpIGFuZCBncmlkIHRvIGxpdmUgb24gdGhlIERJIHRyZWUuXG4gICAgLy8gSW4gdGhlIGNhc2Ugb2Ygcm93IGl0IG1pZ2h0IG5vdCBiZSB0aGVyZSBzaW5jZSB0aGUgcm93IGlzIGRlZmluZWQgb3V0c2lkZSBvZiB0aGUgZ3JpZCBzb21ld2hlcmVcbiAgICAvLyBSb3cncyBhcmUgZGVmaW5lZCB2aWV3IHRlbXBsYXRlcyBzbyB0aGVpciBESSB0cmVlIGRlcGVuZGVkIG9uIHRoZWlyIGxvY2F0aW9uIGhlbmNlIHdlIG5lZWQgdG8gdmVyaWZ5XG4gICAgLy8gdGhhdCB3ZSBjYW4gZ2V0IHRoZSBleHRBcGkgZnJvbSB0aGUgdmlld1JlZidzIGluamVjdG9yLCBpZiBzbywgZ3JlYXQgaWYgbm90IHdlIG5lZWQgdG8gZXh0ZW5kIHRoZSBpbmplY3RvciB3ZSB1c2VcbiAgICAvLyB0byBidWlsZCBjZWxscy5cbiAgICBjb25zdCBpbmplY3RvciA9IHRoaXMuX3ZpZXdSZWY/LmluamVjdG9yO1xuXG4gICAgY29uc3QgZXh0QXBpID0gaW5qZWN0b3I/LmdldDxQYmxOZ3JpZEludGVybmFsRXh0ZW5zaW9uQXBpPFQ+PihFWFRfQVBJX1RPS0VOLCBudWxsKTtcbiAgICBpZiAoIWV4dEFwaSkge1xuICAgICAgLy8gX2V4dEFwaSBtaWdodCBiZSBoZXJlIGFscmVhZHkuLi5cbiAgICAgIHRoaXMuX2V4dEFwaSA9IHRoaXMuX2V4dEFwaSB8fCBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIuZmluZCh0aGlzLmdyaWQpLmV4dEFwaSBhcyBQYmxOZ3JpZEludGVybmFsRXh0ZW5zaW9uQXBpPFQ+O1xuICAgICAgdGhpcy5jZWxsSW5qZWN0b3IgPSBJbmplY3Rvci5jcmVhdGUoe1xuICAgICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgICB7IHByb3ZpZGU6IFBCTF9OR1JJRF9DT01QT05FTlQsIHVzZVZhbHVlOiB0aGlzLmdyaWQgfSxcbiAgICAgICAgICB7IHByb3ZpZGU6IHRoaXMuZ3JpZC5jb25zdHJ1Y3RvciwgdXNlVmFsdWU6IHRoaXMuZ3JpZCB9LFxuICAgICAgICAgIHsgcHJvdmlkZTogRVhUX0FQSV9UT0tFTiwgdXNlVmFsdWU6IHRoaXMuX2V4dEFwaSB9LFxuICAgICAgICBdLFxuICAgICAgICBwYXJlbnQ6IGluamVjdG9yLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2V4dEFwaSA9IHRoaXMuX2V4dEFwaSB8fCBleHRBcGk7XG4gICAgICB0aGlzLmNlbGxJbmplY3RvciA9IGluamVjdG9yO1xuICAgIH1cbiAgfVxuXG59XG4iXX0=