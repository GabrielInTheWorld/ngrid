import { take } from 'rxjs/operators';
import { Input, Directive } from '@angular/core';
import { DragDrop, CdkDrag } from '@angular/cdk/drag-drop';
import { PblDragRef } from './drag-ref';
import { PblDragDrop } from './drag-drop';
import * as i0 from "@angular/core";
export class CdkLazyDrag extends CdkDrag {
    constructor() {
        super(...arguments);
        this._hostNotRoot = false;
    }
    /**
     * A class to set when the root element is not the host element. (i.e. when `cdkDragRootElement` is used).
     */
    set rootElementSelectorClass(value) {
        if (value !== this._rootClass && this._hostNotRoot) {
            if (this._rootClass) {
                this.getRootElement().classList.remove(...this._rootClass.split(' '));
            }
            if (value) {
                this.getRootElement().classList.add(...value.split(' '));
            }
        }
        this._rootClass = value;
    }
    get pblDragRef() { return this._dragRef; }
    get cdkDropList() { return this.dropContainer; }
    set cdkDropList(dropList) {
        // TO SUPPORT `cdkDropList` via string input (ID) we need a reactive registry...
        const prev = this.cdkDropList;
        if (dropList !== prev) {
            if (prev) {
                prev.removeDrag(this);
            }
            this.dropContainer = dropList;
            if (dropList) {
                this._dragRef._withDropContainer(dropList.pblDropListRef);
                this._dragRef.beforeStarted.subscribe(() => {
                    if (dropList.dir) {
                        this._dragRef.withDirection(dropList.dir);
                    }
                });
                dropList.addDrag(this);
            }
            this.dropContainerChanged(prev);
        }
    }
    ngOnInit() {
        if (!(this.pblDragRef instanceof PblDragRef)) {
            if (typeof ngDevMode === 'undefined' || ngDevMode) {
                throw new Error('Invalid `DragRef` injection, the ref is not an instance of PblDragRef');
            }
            return;
        }
        this.pblDragRef.rootElementChanged.subscribe(event => {
            const rootElementSelectorClass = this._rootClass;
            const hostNotRoot = this.element.nativeElement !== event.curr;
            if (rootElementSelectorClass) {
                if (this._hostNotRoot) {
                    event.prev.classList.remove(...rootElementSelectorClass.split(' '));
                }
                if (hostNotRoot) {
                    event.curr.classList.add(...rootElementSelectorClass.split(' '));
                }
            }
            this._hostNotRoot = hostNotRoot;
        });
    }
    // This is a workaround for https://github.com/angular/material2/pull/14158
    // Working around the issue of drop container is not the direct parent (father) of a drag item.
    // The entire ngAfterViewInit() overriding method can be removed if PR accepted.
    ngAfterViewInit() {
        this.started.subscribe(startedEvent => {
            if (this.dropContainer) {
                const element = this.getRootElement();
                const initialRootElementParent = element.parentNode;
                if (!element.nextSibling && initialRootElementParent !== this.dropContainer.element.nativeElement) {
                    this.ended.pipe(take(1)).subscribe(endedEvent => initialRootElementParent.appendChild(element));
                }
            }
        });
        super.ngAfterViewInit();
    }
    ngOnDestroy() {
        var _a;
        (_a = this.cdkDropList) === null || _a === void 0 ? void 0 : _a.removeDrag(this);
        super.ngOnDestroy();
    }
    dropContainerChanged(prev) { }
}
/** @nocollapse */ CdkLazyDrag.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: CdkLazyDrag, deps: null, target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ CdkLazyDrag.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: CdkLazyDrag, selector: "[cdkLazyDrag]", inputs: { rootElementSelectorClass: ["cdkDragRootElementClass", "rootElementSelectorClass"], cdkDropList: "cdkDropList" }, host: { properties: { "class.cdk-drag-dragging": "_dragRef.isDragging()" }, classAttribute: "cdk-drag" }, providers: [
        { provide: DragDrop, useExisting: PblDragDrop },
    ], exportAs: ["cdkLazyDrag"], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: CdkLazyDrag, decorators: [{
            type: Directive,
            args: [{
                    selector: '[cdkLazyDrag]',
                    exportAs: 'cdkLazyDrag',
                    host: {
                        'class': 'cdk-drag',
                        '[class.cdk-drag-dragging]': '_dragRef.isDragging()',
                    },
                    providers: [
                        { provide: DragDrop, useExisting: PblDragDrop },
                    ],
                }]
        }], propDecorators: { rootElementSelectorClass: [{
                type: Input,
                args: ['cdkDragRootElementClass']
            }], cdkDropList: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmdyaWQvZHJhZy9zcmMvbGliL2RyYWctYW5kLWRyb3AvY29yZS9kcmFnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0QyxPQUFPLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBb0MsTUFBTSxlQUFlLENBQUM7QUFDbkYsT0FBTyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUUzRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxhQUFhLENBQUM7O0FBYzFDLE1BQU0sT0FBTyxXQUFvRixTQUFRLE9BQVU7SUFYbkg7O1FBcURVLGlCQUFZLEdBQUcsS0FBSyxDQUFDO0tBK0M5QjtJQXZGQzs7T0FFRztJQUNILElBQXNDLHdCQUF3QixDQUFDLEtBQWE7UUFDMUUsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ2xELElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDbkIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ3ZFO1lBQ0QsSUFBSSxLQUFLLEVBQUU7Z0JBQ1QsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDMUQ7U0FDRjtRQUNELElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO0lBQzFCLENBQUM7SUFFRCxJQUFJLFVBQVUsS0FBdUIs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QUFDLE9BQU8sQ0FBQyxDQUFFLENBQUM7aUJBQ25HO2FBQ0Y7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQsV0FBVzs7UUFDVCxNQUFBLElBQUksQ0FBQyxXQUFXLDBDQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVTLG9CQUFvQixDQUFDLElBQU8sSUFBSSxDQUFDOzsySEF4RmhDLFdBQVc7K0dBQVgsV0FBVyw2UUFKWDtRQUNULEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFO0tBQ2hEOzJGQUVVLFdBQVc7a0JBWHZCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGVBQWU7b0JBQ3pCLFFBQVEsRUFBRSxhQUFhO29CQUN2QixJQUFJLEVBQUU7d0JBQ0osT0FBTyxFQUFFLFVBQVU7d0JBQ25CLDJCQUEyQixFQUFFLHVCQUF1QjtxQkFDckQ7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFO3FCQUNoRDtpQkFDRjs4QkFNdUMsd0JBQXdCO3NCQUE3RCxLQUFLO3VCQUFDLHlCQUF5QjtnQkFjbkIsV0FBVztzQkFBdkIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBJbnB1dCwgRGlyZWN0aXZlLCBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRHJhZ0Ryb3AsIENka0RyYWcgfSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcblxuaW1wb3J0IHsgUGJsRHJhZ1JlZiB9IGZyb20gJy4vZHJhZy1yZWYnO1xuaW1wb3J0IHsgUGJsRHJhZ0Ryb3AgfSBmcm9tICcuL2RyYWctZHJvcCc7XG5pbXBvcnQgeyBDZGtMYXp5RHJvcExpc3QgfSBmcm9tICcuL2Ryb3AtbGlzdCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tjZGtMYXp5RHJhZ10nLCAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOiBkaXJlY3RpdmUtc2VsZWN0b3JcbiAgZXhwb3J0QXM6ICdjZGtMYXp5RHJhZycsXG4gIGhvc3Q6IHsgLy8gdHNsaW50OmRpc2FibGUtbGluZTpuby1ob3N0LW1ldGFkYXRhLXByb3BlcnR5XG4gICAgJ2NsYXNzJzogJ2Nkay1kcmFnJyxcbiAgICAnW2NsYXNzLmNkay1kcmFnLWRyYWdnaW5nXSc6ICdfZHJhZ1JlZi5pc0RyYWdnaW5nKCknLFxuICB9LFxuICBwcm92aWRlcnM6IFtcbiAgICB7IHByb3ZpZGU6IERyYWdEcm9wLCB1c2VFeGlzdGluZzogUGJsRHJhZ0Ryb3AgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2RrTGF6eURyYWc8VCA9IGFueSwgWiBleHRlbmRzIENka0xhenlEcm9wTGlzdDxUPiA9IENka0xhenlEcm9wTGlzdDxUPiwgRFJlZiA9IGFueT4gZXh0ZW5kcyBDZGtEcmFnPFQ+IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gIC8qKlxuICAgKiBBIGNsYXNzIHRvIHNldCB3aGVuIHRoZSByb290IGVsZW1lbnQgaXMgbm90IHRoZSBob3N0IGVsZW1lbnQuIChpLmUuIHdoZW4gYGNka0RyYWdSb290RWxlbWVudGAgaXMgdXNlZCkuXG4gICAqL1xuICBASW5wdXQoJ2Nka0RyYWdSb290RWxlbWVudENsYXNzJykgc2V0IHJvb3RFbGVtZW50U2VsZWN0b3JDbGFzcyh2YWx1ZTogc3RyaW5nKSB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6bm8taW5wdXQtcmVuYW1lXG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLl9yb290Q2xhc3MgJiYgdGhpcy5faG9zdE5vdFJvb3QpIHtcbiAgICAgIGlmICh0aGlzLl9yb290Q2xhc3MpIHtcbiAgICAgICAgdGhpcy5nZXRSb290RWxlbWVudCgpLmNsYXNzTGlzdC5yZW1vdmUoLi4udGhpcy5fcm9vdENsYXNzLnNwbGl0KCcgJykpO1xuICAgICAgfVxuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuZ2V0Um9vdEVsZW1lbnQoKS5jbGFzc0xpc3QuYWRkKC4uLnZhbHVlLnNwbGl0KCcgJykpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9yb290Q2xhc3MgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBwYmxEcmFnUmVmKCk6IFBibERyYWdSZWY8RFJlZj4geyByZXR1cm4gdGhpcy5fZHJhZ1JlZiBhcyBhbnk7IH1cblxuICBASW5wdXQoKSBnZXQgY2RrRHJvcExpc3QoKTogWiB7IHJldHVybiB0aGlzLmRyb3BDb250YWluZXIgYXMgWjsgfVxuICBzZXQgY2RrRHJvcExpc3QoZHJvcExpc3Q6IFopIHtcbiAgICAvLyBUTyBTVVBQT1JUIGBjZGtEcm9wTGlzdGAgdmlhIHN0cmluZyBpbnB1dCAoSUQpIHdlIG5lZWQgYSByZWFjdGl2ZSByZWdpc3RyeS4uLlxuICAgIGNvbnN0IHByZXYgPSB0aGlzLmNka0Ryb3BMaXN0O1xuICAgIGlmIChkcm9wTGlzdCAhPT0gcHJldikge1xuICAgICAgaWYgKHByZXYpIHtcbiAgICAgICAgcHJldi5yZW1vdmVEcmFnKHRoaXMpO1xuICAgICAgfVxuICAgICAgdGhpcy5kcm9wQ29udGFpbmVyID0gZHJvcExpc3Q7XG4gICAgICBpZiAoZHJvcExpc3QpIHtcbiAgICAgICAgdGhpcy5fZHJhZ1JlZi5fd2l0aERyb3BDb250YWluZXIoZHJvcExpc3QucGJsRHJvcExpc3RSZWYpO1xuICAgICAgICB0aGlzLl9kcmFnUmVmLmJlZm9yZVN0YXJ0ZWQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICBpZiAoZHJvcExpc3QuZGlyKSB7XG4gICAgICAgICAgICB0aGlzLl9kcmFnUmVmLndpdGhEaXJlY3Rpb24oZHJvcExpc3QuZGlyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBkcm9wTGlzdC5hZGREcmFnKHRoaXMpO1xuICAgICAgfVxuICAgICAgdGhpcy5kcm9wQ29udGFpbmVyQ2hhbmdlZChwcmV2KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9yb290Q2xhc3M6IHN0cmluZztcbiAgcHJpdmF0ZSBfaG9zdE5vdFJvb3QgPSBmYWxzZTtcblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAoISh0aGlzLnBibERyYWdSZWYgaW5zdGFuY2VvZiBQYmxEcmFnUmVmKSkge1xuICAgICAgaWYgKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYERyYWdSZWZgIGluamVjdGlvbiwgdGhlIHJlZiBpcyBub3QgYW4gaW5zdGFuY2Ugb2YgUGJsRHJhZ1JlZicpXG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMucGJsRHJhZ1JlZi5yb290RWxlbWVudENoYW5nZWQuc3Vic2NyaWJlKCBldmVudCA9PiB7XG4gICAgICBjb25zdCByb290RWxlbWVudFNlbGVjdG9yQ2xhc3MgPSB0aGlzLl9yb290Q2xhc3M7XG4gICAgICBjb25zdCBob3N0Tm90Um9vdCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50ICE9PSBldmVudC5jdXJyO1xuXG4gICAgICBpZiAocm9vdEVsZW1lbnRTZWxlY3RvckNsYXNzKSB7XG4gICAgICAgIGlmICh0aGlzLl9ob3N0Tm90Um9vdCkge1xuICAgICAgICAgIGV2ZW50LnByZXYuY2xhc3NMaXN0LnJlbW92ZSguLi5yb290RWxlbWVudFNlbGVjdG9yQ2xhc3Muc3BsaXQoJyAnKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhvc3ROb3RSb290KSB7XG4gICAgICAgICAgZXZlbnQuY3Vyci5jbGFzc0xpc3QuYWRkKC4uLnJvb3RFbGVtZW50U2VsZWN0b3JDbGFzcy5zcGxpdCgnICcpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5faG9zdE5vdFJvb3QgPSBob3N0Tm90Um9vdDtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFRoaXMgaXMgYSB3b3JrYXJvdW5kIGZvciBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9tYXRlcmlhbDIvcHVsbC8xNDE1OFxuICAvLyBXb3JraW5nIGFyb3VuZCB0aGUgaXNzdWUgb2YgZHJvcCBjb250YWluZXIgaXMgbm90IHRoZSBkaXJlY3QgcGFyZW50IChmYXRoZXIpIG9mIGEgZHJhZyBpdGVtLlxuICAvLyBUaGUgZW50aXJlIG5nQWZ0ZXJWaWV3SW5pdCgpIG92ZXJyaWRpbmcgbWV0aG9kIGNhbiBiZSByZW1vdmVkIGlmIFBSIGFjY2VwdGVkLlxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zdGFydGVkLnN1YnNjcmliZSggc3RhcnRlZEV2ZW50ID0+IHtcbiAgICAgIGlmICh0aGlzLmRyb3BDb250YWluZXIpIHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuZ2V0Um9vdEVsZW1lbnQoKTtcbiAgICAgICAgY29uc3QgaW5pdGlhbFJvb3RFbGVtZW50UGFyZW50ID0gZWxlbWVudC5wYXJlbnROb2RlIGFzIEhUTUxFbGVtZW50O1xuICAgICAgICBpZiAoIWVsZW1lbnQubmV4dFNpYmxpbmcgJiYgaW5pdGlhbFJvb3RFbGVtZW50UGFyZW50ICE9PSB0aGlzLmRyb3BDb250YWluZXIuZWxlbWVudC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgdGhpcy5lbmRlZC5waXBlKHRha2UoMSkpLnN1YnNjcmliZSggZW5kZWRFdmVudCA9PiBpbml0aWFsUm9vdEVsZW1lbnRQYXJlbnQuYXBwZW5kQ2hpbGQoZWxlbWVudCkgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIHN1cGVyLm5nQWZ0ZXJWaWV3SW5pdCgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5jZGtEcm9wTGlzdD8ucmVtb3ZlRHJhZyh0aGlzKTtcbiAgICBzdXBlci5uZ09uRGVzdHJveSgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGRyb3BDb250YWluZXJDaGFuZ2VkKHByZXY6IFopIHsgfVxufVxuIl19