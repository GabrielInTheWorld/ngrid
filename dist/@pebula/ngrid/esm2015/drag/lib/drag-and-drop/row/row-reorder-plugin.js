import { Directive, Input } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { DragDrop, CdkDropListGroup, CDK_DROP_LIST, } from '@angular/cdk/drag-drop';
import { PblDragDrop, CdkLazyDropList } from '../core/index';
import { patchDropListRef } from './row-drop-list-ref';
import * as i0 from "@angular/core";
export const ROW_REORDER_PLUGIN_KEY = 'rowReorder';
let _uniqueIdCounter = 0;
export class PblNgridRowReorderPluginDirective extends CdkLazyDropList {
    constructor() {
        super(...arguments);
        this.id = `pbl-ngrid-row-reorder-list-${_uniqueIdCounter++}`;
        this._rowReorder = false;
    }
    get rowReorder() { return this._rowReorder; }
    ;
    set rowReorder(value) {
        value = coerceBooleanProperty(value);
        this._rowReorder = value;
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        this._removePlugin(this.grid);
    }
    getSortedItems() {
        const { rowsApi } = this.gridApi;
        // The CdkTable has a view repeater that cache view's for performance (only when virtual scroll enabled)
        // A cached view is not showing but still "living" so it's CdkDrag element is still up in the air
        // We need to filter them out
        // An alternative will be to catch the events of the rows attached/detached and add/remove them from the drop list.
        return super.getSortedItems().filter(item => {
            var _a;
            return (_a = rowsApi.findRowByElement(item.getRootElement())) === null || _a === void 0 ? void 0 : _a.attached;
        });
    }
    initDropListRef() {
        patchDropListRef(this.pblDropListRef, this.gridApi);
    }
    gridChanged() {
        this._removePlugin = this.gridApi.pluginCtrl.setPlugin(ROW_REORDER_PLUGIN_KEY, this);
        this.directContainerElement = '.pbl-ngrid-scroll-container';
        this.dropped.subscribe((event) => {
            const item = event.item;
            const previousIndex = this.grid.ds.source.indexOf(item.draggedContext.row);
            const currentIndex = event.currentIndex + this.grid.ds.renderStart;
            this.grid.ds.moveItem(previousIndex, currentIndex, true);
            this.grid.rowsApi.syncRows('data');
        });
    }
}
/** @nocollapse */ PblNgridRowReorderPluginDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridRowReorderPluginDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ PblNgridRowReorderPluginDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridRowReorderPluginDirective, selector: "pbl-ngrid[rowReorder]", inputs: { rowReorder: "rowReorder" }, host: { properties: { "id": "id", "class.cdk-drop-list-dragging": "_dropListRef.isDragging()", "class.cdk-drop-list-receiving": "_dropListRef.isReceiving()", "class.pbl-row-reorder": "rowReorder && !this.grid.ds?.sort.sort?.order && !this.grid.ds?.filter?.filter" }, classAttribute: "cdk-drop-list" }, providers: [
        { provide: DragDrop, useExisting: PblDragDrop },
        { provide: CdkDropListGroup, useValue: undefined },
        { provide: CDK_DROP_LIST, useExisting: PblNgridRowReorderPluginDirective },
    ], exportAs: ["pblNgridRowReorder"], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridRowReorderPluginDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'pbl-ngrid[rowReorder]',
                    exportAs: 'pblNgridRowReorder',
                    host: {
                        'class': 'cdk-drop-list',
                        '[id]': 'id',
                        '[class.cdk-drop-list-dragging]': '_dropListRef.isDragging()',
                        '[class.cdk-drop-list-receiving]': '_dropListRef.isReceiving()',
                        '[class.pbl-row-reorder]': 'rowReorder && !this.grid.ds?.sort.sort?.order && !this.grid.ds?.filter?.filter',
                    },
                    providers: [
                        { provide: DragDrop, useExisting: PblDragDrop },
                        { provide: CdkDropListGroup, useValue: undefined },
                        { provide: CDK_DROP_LIST, useExisting: PblNgridRowReorderPluginDirective },
                    ],
                }]
        }], propDecorators: { rowReorder: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LXJlb3JkZXItcGx1Z2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3JpZC9kcmFnL3NyYy9saWIvZHJhZy1hbmQtZHJvcC9yb3cvcm93LXJlb3JkZXItcGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBZ0IscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RSxPQUFPLEVBQ0wsUUFBUSxFQUNSLGdCQUFnQixFQUNoQixhQUFhLEdBRWQsTUFBTSx3QkFBd0IsQ0FBQztBQUdoQyxPQUFPLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU3RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7QUFRdkQsTUFBTSxDQUFDLE1BQU0sc0JBQXNCLEdBQWlCLFlBQVksQ0FBQztBQUVqRSxJQUFJLGdCQUFnQixHQUFHLENBQUMsQ0FBQztBQWtCekIsTUFBTSxPQUFPLGlDQUEyQyxTQUFRLGVBQXdEO0lBaEJ4SDs7UUFrQkUsT0FBRSxHQUFHLDhCQUE4QixnQkFBZ0IsRUFBRSxFQUFFLENBQUM7UUFRaEQsZ0JBQVcsR0FBRyxLQUFLLENBQUM7S0FzQzdCO0lBNUNDLElBQWEsVUFBVSxLQUFjLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFBQSxDQUFDO0lBQ2hFLElBQUksVUFBVSxDQUFDLEtBQWM7UUFDM0IsS0FBSyxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO0lBQzNCLENBQUM7SUFLRCxXQUFXO1FBQ1QsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxjQUFjO1FBQ1osTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDakMsd0dBQXdHO1FBQ3hHLGlHQUFpRztRQUNqRyw2QkFBNkI7UUFDN0IsbUhBQW1IO1FBQ25ILE9BQVEsS0FBSyxDQUFDLGNBQWMsRUFBaUMsQ0FBQyxNQUFNLENBQUUsSUFBSSxDQUFDLEVBQUU7O1lBQzNFLE9BQU8sTUFBQSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLDBDQUFFLFFBQVEsQ0FBQztRQUNuRSxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFUyxlQUFlO1FBQ3ZCLGdCQUFnQixDQUFDLElBQUksQ0FBQyxjQUFxQixFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRVMsV0FBVztRQUNuQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyRixJQUFJLENBQUMsc0JBQXNCLEdBQUcsNkJBQTZCLENBQUM7UUFFNUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUUsQ0FBQyxLQUFxQixFQUFFLEVBQUU7WUFDaEQsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQW1DLENBQUM7WUFFdkQsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzNFLE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDO1lBQ25FLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3pELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNyQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7O2lKQTdDVSxpQ0FBaUM7cUlBQWpDLGlDQUFpQyxvWUFOakM7UUFDVCxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRTtRQUMvQyxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFO1FBQ2xELEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsaUNBQWlDLEVBQUU7S0FDM0U7MkZBRVUsaUNBQWlDO2tCQWhCN0MsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsdUJBQXVCO29CQUNqQyxRQUFRLEVBQUUsb0JBQW9CO29CQUM5QixJQUFJLEVBQUU7d0JBQ0osT0FBTyxFQUFFLGVBQWU7d0JBQ3hCLE1BQU0sRUFBRSxJQUFJO3dCQUNaLGdDQUFnQyxFQUFFLDJCQUEyQjt3QkFDN0QsaUNBQWlDLEVBQUUsNEJBQTRCO3dCQUMvRCx5QkFBeUIsRUFBRSxnRkFBZ0Y7cUJBQzVHO29CQUNELFNBQVMsRUFBRTt3QkFDVCxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRTt3QkFDL0MsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRTt3QkFDbEQsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLFdBQVcsbUNBQW1DLEVBQUU7cUJBQzNFO2lCQUNGOzhCQUtjLFVBQVU7c0JBQXRCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJvb2xlYW5JbnB1dCwgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gIERyYWdEcm9wLFxuICBDZGtEcm9wTGlzdEdyb3VwLFxuICBDREtfRFJPUF9MSVNULFxuICBDZGtEcmFnRHJvcCxcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XG5cbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50IH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5pbXBvcnQgeyBQYmxEcmFnRHJvcCwgQ2RrTGF6eURyb3BMaXN0IH0gZnJvbSAnLi4vY29yZS9pbmRleCc7XG5pbXBvcnQgeyBQYmxOZ3JpZFJvd0RyYWdEaXJlY3RpdmUgfSBmcm9tICcuL3Jvdy1kcmFnJztcbmltcG9ydCB7IHBhdGNoRHJvcExpc3RSZWYgfSBmcm9tICcuL3Jvdy1kcm9wLWxpc3QtcmVmJztcblxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvbGliL2V4dC90eXBlcycge1xuICBpbnRlcmZhY2UgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb24ge1xuICAgIHJvd1Jlb3JkZXI/OiBQYmxOZ3JpZFJvd1Jlb3JkZXJQbHVnaW5EaXJlY3RpdmU7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IFJPV19SRU9SREVSX1BMVUdJTl9LRVk6ICdyb3dSZW9yZGVyJyA9ICdyb3dSZW9yZGVyJztcblxubGV0IF91bmlxdWVJZENvdW50ZXIgPSAwO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdwYmwtbmdyaWRbcm93UmVvcmRlcl0nLCAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOiBkaXJlY3RpdmUtc2VsZWN0b3JcbiAgZXhwb3J0QXM6ICdwYmxOZ3JpZFJvd1Jlb3JkZXInLFxuICBob3N0OiB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6bm8taG9zdC1tZXRhZGF0YS1wcm9wZXJ0eVxuICAgICdjbGFzcyc6ICdjZGstZHJvcC1saXN0JyxcbiAgICAnW2lkXSc6ICdpZCcsXG4gICAgJ1tjbGFzcy5jZGstZHJvcC1saXN0LWRyYWdnaW5nXSc6ICdfZHJvcExpc3RSZWYuaXNEcmFnZ2luZygpJyxcbiAgICAnW2NsYXNzLmNkay1kcm9wLWxpc3QtcmVjZWl2aW5nXSc6ICdfZHJvcExpc3RSZWYuaXNSZWNlaXZpbmcoKScsXG4gICAgJ1tjbGFzcy5wYmwtcm93LXJlb3JkZXJdJzogJ3Jvd1Jlb3JkZXIgJiYgIXRoaXMuZ3JpZC5kcz8uc29ydC5zb3J0Py5vcmRlciAmJiAhdGhpcy5ncmlkLmRzPy5maWx0ZXI/LmZpbHRlcicsXG4gIH0sXG4gIHByb3ZpZGVyczogW1xuICAgIHsgcHJvdmlkZTogRHJhZ0Ryb3AsIHVzZUV4aXN0aW5nOiBQYmxEcmFnRHJvcCB9LFxuICAgIHsgcHJvdmlkZTogQ2RrRHJvcExpc3RHcm91cCwgdXNlVmFsdWU6IHVuZGVmaW5lZCB9LFxuICAgIHsgcHJvdmlkZTogQ0RLX0RST1BfTElTVCwgdXNlRXhpc3Rpbmc6IFBibE5ncmlkUm93UmVvcmRlclBsdWdpbkRpcmVjdGl2ZSB9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZFJvd1Jlb3JkZXJQbHVnaW5EaXJlY3RpdmU8VCA9IGFueT4gZXh0ZW5kcyBDZGtMYXp5RHJvcExpc3Q8VCwgUGJsTmdyaWRSb3dSZW9yZGVyUGx1Z2luRGlyZWN0aXZlPFQ+PiBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgaWQgPSBgcGJsLW5ncmlkLXJvdy1yZW9yZGVyLWxpc3QtJHtfdW5pcXVlSWRDb3VudGVyKyt9YDtcblxuICBASW5wdXQoKSBnZXQgcm93UmVvcmRlcigpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3Jvd1Jlb3JkZXI7IH07XG4gIHNldCByb3dSZW9yZGVyKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdmFsdWUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIHRoaXMuX3Jvd1Jlb3JkZXIgPSB2YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX3Jvd1Jlb3JkZXIgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfcmVtb3ZlUGx1Z2luOiAoZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8YW55PikgPT4gdm9pZDtcblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBzdXBlci5uZ09uRGVzdHJveSgpO1xuICAgIHRoaXMuX3JlbW92ZVBsdWdpbih0aGlzLmdyaWQpO1xuICB9XG5cbiAgZ2V0U29ydGVkSXRlbXMoKSB7XG4gICAgY29uc3QgeyByb3dzQXBpIH0gPSB0aGlzLmdyaWRBcGk7XG4gICAgLy8gVGhlIENka1RhYmxlIGhhcyBhIHZpZXcgcmVwZWF0ZXIgdGhhdCBjYWNoZSB2aWV3J3MgZm9yIHBlcmZvcm1hbmNlIChvbmx5IHdoZW4gdmlydHVhbCBzY3JvbGwgZW5hYmxlZClcbiAgICAvLyBBIGNhY2hlZCB2aWV3IGlzIG5vdCBzaG93aW5nIGJ1dCBzdGlsbCBcImxpdmluZ1wiIHNvIGl0J3MgQ2RrRHJhZyBlbGVtZW50IGlzIHN0aWxsIHVwIGluIHRoZSBhaXJcbiAgICAvLyBXZSBuZWVkIHRvIGZpbHRlciB0aGVtIG91dFxuICAgIC8vIEFuIGFsdGVybmF0aXZlIHdpbGwgYmUgdG8gY2F0Y2ggdGhlIGV2ZW50cyBvZiB0aGUgcm93cyBhdHRhY2hlZC9kZXRhY2hlZCBhbmQgYWRkL3JlbW92ZSB0aGVtIGZyb20gdGhlIGRyb3AgbGlzdC5cbiAgICByZXR1cm4gKHN1cGVyLmdldFNvcnRlZEl0ZW1zKCkgYXMgUGJsTmdyaWRSb3dEcmFnRGlyZWN0aXZlW10pLmZpbHRlciggaXRlbSA9PiB7XG4gICAgICByZXR1cm4gcm93c0FwaS5maW5kUm93QnlFbGVtZW50KGl0ZW0uZ2V0Um9vdEVsZW1lbnQoKSk/LmF0dGFjaGVkO1xuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGluaXREcm9wTGlzdFJlZigpOiB2b2lkIHtcbiAgICBwYXRjaERyb3BMaXN0UmVmKHRoaXMucGJsRHJvcExpc3RSZWYgYXMgYW55LCB0aGlzLmdyaWRBcGkpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdyaWRDaGFuZ2VkKCkge1xuICAgIHRoaXMuX3JlbW92ZVBsdWdpbiA9IHRoaXMuZ3JpZEFwaS5wbHVnaW5DdHJsLnNldFBsdWdpbihST1dfUkVPUkRFUl9QTFVHSU5fS0VZLCB0aGlzKTtcbiAgICB0aGlzLmRpcmVjdENvbnRhaW5lckVsZW1lbnQgPSAnLnBibC1uZ3JpZC1zY3JvbGwtY29udGFpbmVyJztcblxuICAgIHRoaXMuZHJvcHBlZC5zdWJzY3JpYmUoIChldmVudDogQ2RrRHJhZ0Ryb3A8VD4pID0+IHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBldmVudC5pdGVtIGFzIFBibE5ncmlkUm93RHJhZ0RpcmVjdGl2ZTxUPjtcblxuICAgICAgY29uc3QgcHJldmlvdXNJbmRleCA9IHRoaXMuZ3JpZC5kcy5zb3VyY2UuaW5kZXhPZihpdGVtLmRyYWdnZWRDb250ZXh0LnJvdyk7XG4gICAgICBjb25zdCBjdXJyZW50SW5kZXggPSBldmVudC5jdXJyZW50SW5kZXggKyB0aGlzLmdyaWQuZHMucmVuZGVyU3RhcnQ7XG4gICAgICB0aGlzLmdyaWQuZHMubW92ZUl0ZW0ocHJldmlvdXNJbmRleCwgY3VycmVudEluZGV4LCB0cnVlKTtcbiAgICAgIHRoaXMuZ3JpZC5yb3dzQXBpLnN5bmNSb3dzKCdkYXRhJyk7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfcm93UmVvcmRlcjogQm9vbGVhbklucHV0O1xufVxuIl19