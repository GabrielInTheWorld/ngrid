// tslint:disable:no-output-rename
import { Directive, EventEmitter, Output } from '@angular/core';
import { DragDrop, CDK_DROP_LIST, CDK_DROP_LIST_GROUP } from '@angular/cdk/drag-drop';
import { CdkLazyDropList, PblDragDrop } from '../core/index';
import { COL_DRAG_CONTAINER_PLUGIN_KEY } from './column-drag-container';
import * as i0 from "@angular/core";
let _uniqueIdCounter = 0;
export class PblNgridColumnDropContainerDirective extends CdkLazyDropList {
    constructor() {
        super(...arguments);
        this.id = `pbl-ngrid-column-drop-container-${_uniqueIdCounter++}`;
        this.orientation = 'horizontal';
        this.columnEntered = this.entered;
        this.columnExited = this.exited;
        this.columnDropped = this.dropped;
    }
    get columnContainer() { return this._columnContainer; }
    canDrag(column) {
        return true;
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        if (this._columnContainer) {
            this._columnContainer.disconnectFrom(this);
        }
    }
    gridChanged() {
        var _a;
        const columnContainer = (_a = this.gridApi) === null || _a === void 0 ? void 0 : _a.pluginCtrl.getPlugin(COL_DRAG_CONTAINER_PLUGIN_KEY);
        if (columnContainer !== this._columnContainer) {
            if (this._columnContainer) {
                this._columnContainer.disconnectFrom(this);
            }
            this._columnContainer = columnContainer;
            if (columnContainer) {
                columnContainer.connectTo(this);
            }
        }
    }
}
/** @nocollapse */ PblNgridColumnDropContainerDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridColumnDropContainerDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ PblNgridColumnDropContainerDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridColumnDropContainerDirective, selector: "[pblColumnDropContainer]", inputs: { grid: ["pblColumnDropContainer", "grid"] }, outputs: { columnEntered: "columnEntered", columnExited: "columnExited", columnDropped: "columnDropped" }, host: { properties: { "id": "id" }, classAttribute: "cdk-drop-list" }, providers: [
        { provide: DragDrop, useExisting: PblDragDrop },
        { provide: CDK_DROP_LIST_GROUP, useValue: undefined },
        { provide: CDK_DROP_LIST, useExisting: PblNgridColumnDropContainerDirective },
    ], exportAs: ["pblColumnDropContainer"], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridColumnDropContainerDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pblColumnDropContainer]',
                    exportAs: 'pblColumnDropContainer',
                    inputs: ['grid: pblColumnDropContainer'],
                    host: {
                        'class': 'cdk-drop-list',
                        '[id]': 'id',
                    },
                    providers: [
                        { provide: DragDrop, useExisting: PblDragDrop },
                        { provide: CDK_DROP_LIST_GROUP, useValue: undefined },
                        { provide: CDK_DROP_LIST, useExisting: PblNgridColumnDropContainerDirective },
                    ],
                }]
        }], propDecorators: { columnEntered: [{
                type: Output
            }], columnExited: [{
                type: Output
            }], columnDropped: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLWRyb3AtY29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3JpZC9kcmFnL3NyYy9saWIvZHJhZy1hbmQtZHJvcC9jb2x1bW4vY29sdW1uLWRyb3AtY29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGtDQUFrQztBQUNsQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEUsT0FBTyxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUV0RixPQUFPLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQUUsNkJBQTZCLEVBQXdDLE1BQU0seUJBQXlCLENBQUM7O0FBRzlHLElBQUksZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO0FBZ0J6QixNQUFNLE9BQU8sb0NBQThDLFNBQVEsZUFBa0I7SUFkckY7O1FBZUUsT0FBRSxHQUFHLG1DQUFtQyxnQkFBZ0IsRUFBRSxFQUFFLENBQUM7UUFDN0QsZ0JBQVcsR0FBOEIsWUFBWSxDQUFDO1FBRTVDLGtCQUFhLEdBQXFELElBQUksQ0FBQyxPQUFjLENBQUM7UUFDdEYsaUJBQVksR0FBb0QsSUFBSSxDQUFDLE1BQWEsQ0FBQztRQUNuRixrQkFBYSxHQUFvRCxJQUFJLENBQUMsT0FBYyxDQUFDO0tBNkJoRztJQTNCQyxJQUFJLGVBQWUsS0FBMkMsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO0lBRzdGLE9BQU8sQ0FBQyxNQUFjO1FBQ3BCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELFdBQVc7UUFDVCxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDcEIsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDekIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM1QztJQUNILENBQUM7SUFFUyxXQUFXOztRQUNuQixNQUFNLGVBQWUsR0FBRyxNQUFBLElBQUksQ0FBQyxPQUFPLDBDQUFFLFVBQVUsQ0FBQyxTQUFTLENBQUMsNkJBQTZCLENBQUMsQ0FBQTtRQUN6RixJQUFJLGVBQWUsS0FBSyxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDN0MsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQ3pCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDNUM7WUFDRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZUFBZSxDQUFDO1lBQ3hDLElBQUksZUFBZSxFQUFFO2dCQUNuQixlQUFlLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2pDO1NBQ0Y7SUFDSCxDQUFDOztvSkFqQ1Usb0NBQW9DO3dJQUFwQyxvQ0FBb0MsMlJBTnBDO1FBQ1QsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUU7UUFDL0MsRUFBRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRTtRQUNyRCxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFFLG9DQUFvQyxFQUFFO0tBQzlFOzJGQUVVLG9DQUFvQztrQkFkaEQsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsMEJBQTBCO29CQUNwQyxRQUFRLEVBQUUsd0JBQXdCO29CQUNsQyxNQUFNLEVBQUUsQ0FBQyw4QkFBOEIsQ0FBQztvQkFDeEMsSUFBSSxFQUFFO3dCQUNKLE9BQU8sRUFBRSxlQUFlO3dCQUN4QixNQUFNLEVBQUUsSUFBSTtxQkFDYjtvQkFDRCxTQUFTLEVBQUU7d0JBQ1QsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUU7d0JBQy9DLEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUU7d0JBQ3JELEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxXQUFXLHNDQUFzQyxFQUFFO3FCQUM5RTtpQkFDRjs4QkFLVyxhQUFhO3NCQUF0QixNQUFNO2dCQUNHLFlBQVk7c0JBQXJCLE1BQU07Z0JBQ0csYUFBYTtzQkFBdEIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRzbGludDpkaXNhYmxlOm5vLW91dHB1dC1yZW5hbWVcbmltcG9ydCB7IERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERyYWdEcm9wLCBDREtfRFJPUF9MSVNULCBDREtfRFJPUF9MSVNUX0dST1VQIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XG5pbXBvcnQgeyBDT0xVTU4gfSBmcm9tICdAcGVidWxhL25ncmlkJztcbmltcG9ydCB7IENka0xhenlEcm9wTGlzdCwgUGJsRHJhZ0Ryb3AgfSBmcm9tICcuLi9jb3JlL2luZGV4JztcbmltcG9ydCB7IENPTF9EUkFHX0NPTlRBSU5FUl9QTFVHSU5fS0VZLCBQYmxOZ3JpZENvbHVtbkRyYWdDb250YWluZXJEaXJlY3RpdmUgfSBmcm9tICcuL2NvbHVtbi1kcmFnLWNvbnRhaW5lcic7XG5pbXBvcnQgeyBQYmxDb2x1bW5EcmFnRHJvcENvbnRhaW5lckRyb3AsIFBibENvbHVtbkRyYWdEcm9wQ29udGFpbmVyRW50ZXIsIFBibENvbHVtbkRyYWdEcm9wQ29udGFpbmVyRXhpdCB9IGZyb20gJy4vY29sdW1uLWRyb3AtY29udGFpbmVyLmV2ZW50cyc7XG5cbmxldCBfdW5pcXVlSWRDb3VudGVyID0gMDtcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3BibENvbHVtbkRyb3BDb250YWluZXJdJyxcbiAgZXhwb3J0QXM6ICdwYmxDb2x1bW5Ecm9wQ29udGFpbmVyJyxcbiAgaW5wdXRzOiBbJ2dyaWQ6IHBibENvbHVtbkRyb3BDb250YWluZXInXSxcbiAgaG9zdDogeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOnVzZS1ob3N0LXByb3BlcnR5LWRlY29yYXRvclxuICAgICdjbGFzcyc6ICdjZGstZHJvcC1saXN0JyxcbiAgICAnW2lkXSc6ICdpZCcsXG4gIH0sXG4gIHByb3ZpZGVyczogW1xuICAgIHsgcHJvdmlkZTogRHJhZ0Ryb3AsIHVzZUV4aXN0aW5nOiBQYmxEcmFnRHJvcCB9LFxuICAgIHsgcHJvdmlkZTogQ0RLX0RST1BfTElTVF9HUk9VUCwgdXNlVmFsdWU6IHVuZGVmaW5lZCB9LFxuICAgIHsgcHJvdmlkZTogQ0RLX0RST1BfTElTVCwgdXNlRXhpc3Rpbmc6IFBibE5ncmlkQ29sdW1uRHJvcENvbnRhaW5lckRpcmVjdGl2ZSB9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZENvbHVtbkRyb3BDb250YWluZXJEaXJlY3RpdmU8VCA9IGFueT4gZXh0ZW5kcyBDZGtMYXp5RHJvcExpc3Q8VD4ge1xuICBpZCA9IGBwYmwtbmdyaWQtY29sdW1uLWRyb3AtY29udGFpbmVyLSR7X3VuaXF1ZUlkQ291bnRlcisrfWA7XG4gIG9yaWVudGF0aW9uOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnID0gJ2hvcml6b250YWwnO1xuXG4gIEBPdXRwdXQoKSBjb2x1bW5FbnRlcmVkOiBFdmVudEVtaXR0ZXI8UGJsQ29sdW1uRHJhZ0Ryb3BDb250YWluZXJFbnRlcjxUPj4gPSB0aGlzLmVudGVyZWQgYXMgYW55O1xuICBAT3V0cHV0KCkgY29sdW1uRXhpdGVkOiBFdmVudEVtaXR0ZXI8UGJsQ29sdW1uRHJhZ0Ryb3BDb250YWluZXJFeGl0PFQ+PiA9IHRoaXMuZXhpdGVkIGFzIGFueTtcbiAgQE91dHB1dCgpIGNvbHVtbkRyb3BwZWQ6IEV2ZW50RW1pdHRlcjxQYmxDb2x1bW5EcmFnRHJvcENvbnRhaW5lckRyb3A8VD4+ID0gdGhpcy5kcm9wcGVkIGFzIGFueTtcblxuICBnZXQgY29sdW1uQ29udGFpbmVyKCk6IFBibE5ncmlkQ29sdW1uRHJhZ0NvbnRhaW5lckRpcmVjdGl2ZSB7IHJldHVybiB0aGlzLl9jb2x1bW5Db250YWluZXI7IH1cbiAgcHJpdmF0ZSBfY29sdW1uQ29udGFpbmVyOiBQYmxOZ3JpZENvbHVtbkRyYWdDb250YWluZXJEaXJlY3RpdmU7XG5cbiAgY2FuRHJhZyhjb2x1bW46IENPTFVNTik6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgc3VwZXIubmdPbkRlc3Ryb3koKTtcbiAgICBpZiAodGhpcy5fY29sdW1uQ29udGFpbmVyKSB7XG4gICAgICB0aGlzLl9jb2x1bW5Db250YWluZXIuZGlzY29ubmVjdEZyb20odGhpcyk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGdyaWRDaGFuZ2VkKCkge1xuICAgIGNvbnN0IGNvbHVtbkNvbnRhaW5lciA9IHRoaXMuZ3JpZEFwaT8ucGx1Z2luQ3RybC5nZXRQbHVnaW4oQ09MX0RSQUdfQ09OVEFJTkVSX1BMVUdJTl9LRVkpXG4gICAgaWYgKGNvbHVtbkNvbnRhaW5lciAhPT0gdGhpcy5fY29sdW1uQ29udGFpbmVyKSB7XG4gICAgICBpZiAodGhpcy5fY29sdW1uQ29udGFpbmVyKSB7XG4gICAgICAgIHRoaXMuX2NvbHVtbkNvbnRhaW5lci5kaXNjb25uZWN0RnJvbSh0aGlzKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2NvbHVtbkNvbnRhaW5lciA9IGNvbHVtbkNvbnRhaW5lcjtcbiAgICAgIGlmIChjb2x1bW5Db250YWluZXIpIHtcbiAgICAgICAgY29sdW1uQ29udGFpbmVyLmNvbm5lY3RUbyh0aGlzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxufVxuIl19