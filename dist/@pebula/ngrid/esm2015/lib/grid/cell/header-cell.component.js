// tslint:disable:use-host-property-decorator
// tslint:disable:directive-selector
import { first, filter } from 'rxjs/operators';
import { Component, ElementRef, ChangeDetectionStrategy, ViewEncapsulation, ViewContainerRef, ViewChild, NgZone, Inject, } from '@angular/core';
import { unrx } from '@pebula/ngrid/core';
import { EXT_API_TOKEN } from '../../ext/grid-ext-api';
import { PblNgridDataHeaderExtensionContext, PblNgridMultiComponentRegistry, PblNgridMultiTemplateRegistry } from '../registry';
import { applySourceWidth, applyWidth, initCellElement } from './utils';
import { PblNgridBaseCell } from './base-cell';
import { PblColumnSizeObserver } from '../features/column-size-observer/column-size-observer';
import * as i0 from "@angular/core";
const lastDataHeaderExtensions = new Map();
/**
 * Header cell component.
 * The header cell component will render the header cell template and add the proper classes and role.
 *
 * It is also responsible for creating and managing the any `dataHeaderExtensions` registered in the registry.
 * These extensions add features to the cells either as a template instance or as a component instance.
 * Examples: Sorting behavior, drag&drop/resize handlers, menus etc...
 */
export class PblNgridHeaderCellComponent extends PblNgridBaseCell {
    constructor(extApi, elementRef, zone) {
        super(extApi, elementRef);
        this.zone = zone;
    }
    get columnDef() { var _a; return (_a = this.column) === null || _a === void 0 ? void 0 : _a.columnDef; }
    get grid() { return this.extApi.grid; }
    setColumn(column, gridWidthRow) {
        const prev = this.column;
        if (prev !== column) {
            if (prev) {
                unrx.kill(this, prev);
            }
            this.column = column;
            let predicate;
            let view;
            let widthUpdater;
            widthUpdater = gridWidthRow ? applySourceWidth : applyWidth;
            predicate = event => (!gridWidthRow && event.reason !== 'update') || (gridWidthRow && event.reason !== 'resize');
            view = !gridWidthRow ? this.initMainHeaderColumnView(column) : undefined;
            if (gridWidthRow && !this.resizeObserver) {
                this.resizeObserver = new PblColumnSizeObserver(this.el, this.extApi);
            }
            this.columnDef.widthChange
                .pipe(filter(predicate), unrx(this, column))
                .subscribe(widthUpdater.bind(this));
            if (view) {
                view.detectChanges();
            }
            widthUpdater.call(this);
            initCellElement(this.el, column);
        }
    }
    updateSize() {
        if (this.resizeObserver) {
            this.resizeObserver.updateSize();
        }
    }
    ngAfterViewInit() {
        if (this.resizeObserver) {
            this.resizeObserver.column = this.column;
        }
    }
    ngOnDestroy() {
        var _a;
        (_a = this.resizeObserver) === null || _a === void 0 ? void 0 : _a.destroy();
        if (this.column) {
            unrx(this, this.column);
        }
        super.ngOnDestroy();
    }
    initMainHeaderColumnView(col) {
        this.cellCtx = PblNgridDataHeaderExtensionContext.createDateHeaderCtx(this, this.vcRef.injector);
        const context = this.cellCtx;
        const view = this.vcRef.createEmbeddedView(col.headerCellTpl, context);
        this.zone.onStable
            .pipe(first())
            .subscribe(() => {
            this.runHeaderExtensions(context, view);
            const v = this.vcRef.get(0);
            // at this point the view might get destroyed, its possible...
            if (!v.destroyed) {
                v.detectChanges();
            }
        });
        return view;
    }
    runHeaderExtensions(context, view) {
        // we collect the first header extension for each unique name only once per grid instance
        let extensions = lastDataHeaderExtensions.get(this.grid);
        if (!extensions) {
            const dataHeaderExtensions = new Map();
            this.grid.registry.forMulti('dataHeaderExtensions', values => {
                for (const value of values) {
                    if (!dataHeaderExtensions.has(value.name)) {
                        dataHeaderExtensions.set(value.name, value);
                    }
                }
            });
            extensions = Array.from(dataHeaderExtensions.values());
            lastDataHeaderExtensions.set(this.grid, extensions);
            // destroy it on the next turn, we know all cells will render on the same turn.
            this.zone.onStable.pipe(first()).subscribe(() => lastDataHeaderExtensions.delete(this.grid));
        }
        let { rootNodes } = view;
        for (const ext of extensions) {
            if (!ext.shouldRender || ext.shouldRender(context)) {
                if (ext instanceof PblNgridMultiTemplateRegistry) {
                    const extView = this.vcRef.createEmbeddedView(ext.tRef, context);
                    extView.markForCheck();
                }
                else if (ext instanceof PblNgridMultiComponentRegistry) {
                    rootNodes = this.createComponent(ext, context, rootNodes);
                }
            }
        }
    }
    createComponent(ext, context, rootNodes) {
        const factory = ext.getFactory(context);
        const projectedContent = [];
        if (ext.projectContent) {
            projectedContent.push(rootNodes);
        }
        const cmpRef = this.vcRef.createComponent(factory, this.vcRef.length, null, projectedContent);
        if (ext.projectContent) {
            rootNodes = [cmpRef.location.nativeElement];
        }
        if (ext.onCreated) {
            ext.onCreated(context, cmpRef);
        }
        return rootNodes;
    }
}
/** @nocollapse */ PblNgridHeaderCellComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridHeaderCellComponent, deps: [{ token: EXT_API_TOKEN }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ PblNgridHeaderCellComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridHeaderCellComponent, selector: "pbl-ngrid-header-cell", host: { attributes: { "role": "columnheader" }, classAttribute: "cdk-header-cell pbl-ngrid-header-cell" }, viewQueries: [{ propertyName: "vcRef", first: true, predicate: ["vcRef"], descendants: true, read: ViewContainerRef, static: true }], exportAs: ["ngridHeaderCell"], usesInheritance: true, ngImport: i0, template: `<ng-container #vcRef></ng-container>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridHeaderCellComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'pbl-ngrid-header-cell',
                    // tslint:disable-next-line: no-host-metadata-property
                    host: {
                        class: 'cdk-header-cell pbl-ngrid-header-cell',
                        role: 'columnheader',
                    },
                    exportAs: 'ngridHeaderCell',
                    template: `<ng-container #vcRef></ng-container>`,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [EXT_API_TOKEN]
                }] }, { type: i0.ElementRef }, { type: i0.NgZone }]; }, propDecorators: { vcRef: [{
                type: ViewChild,
                args: ['vcRef', { read: ViewContainerRef, static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLWNlbGwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3JpZC9zcmMvbGliL2dyaWQvY2VsbC9oZWFkZXItY2VsbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsNkNBQTZDO0FBQzdDLG9DQUFvQztBQUNwQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQy9DLE9BQU8sRUFHTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsZ0JBQWdCLEVBQ2hCLFNBQVMsRUFDVCxNQUFNLEVBRU4sTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxJQUFJLEVBQTRCLE1BQU0sb0JBQW9CLENBQUM7QUFHcEUsT0FBTyxFQUFFLGFBQWEsRUFBZ0MsTUFBTSx3QkFBd0IsQ0FBQztBQUdyRixPQUFPLEVBQUUsa0NBQWtDLEVBQUUsOEJBQThCLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFaEksT0FBTyxFQUFFLGdCQUFnQixFQUFFLFVBQVUsRUFBRSxlQUFlLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDeEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVEQUF1RCxDQUFDOztBQUU5RixNQUFNLHdCQUF3QixHQUFHLElBQUksR0FBRyxFQUEwRSxDQUFDO0FBRW5IOzs7Ozs7O0dBT0c7QUFhSCxNQUFNLE9BQU8sMkJBQXVELFNBQVEsZ0JBQWdCO0lBVzFGLFlBQW1DLE1BQW9DLEVBQzNELFVBQXNCLEVBQ2QsSUFBWTtRQUM5QixLQUFLLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBRFIsU0FBSSxHQUFKLElBQUksQ0FBUTtJQUVoQyxDQUFDO0lBVEQsSUFB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Q0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUU5RixJQUFJLEdBQUcsQ0FBQyxjQUFjLEVBQUU7WUFDdEIsU0FBUyxHQUFHLENBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUUsQ0FBQztTQUMvQztRQUVELElBQUksR0FBRyxDQUFDLFNBQVMsRUFBRTtZQUNqQixHQUFHLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztTQUNoQztRQUVELE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7OzJJQTVJVSwyQkFBMkIsa0JBV2xCLGFBQWE7K0hBWHRCLDJCQUEyQixtUEFDVixnQkFBZ0IsaUdBTGxDLHNDQUFzQzsyRkFJckMsMkJBQTJCO2tCQVp2QyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSx1QkFBdUI7b0JBQ2pDLHNEQUFzRDtvQkFDdEQsSUFBSSxFQUFFO3dCQUNKLEtBQUssRUFBRSx1Q0FBdUM7d0JBQzlDLElBQUksRUFBRSxjQUFjO3FCQUNyQjtvQkFDRCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixRQUFRLEVBQUUsc0NBQXNDO29CQUNoRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7aUJBQ3RDOzswQkFZYyxNQUFNOzJCQUFDLGFBQWE7MEZBVjZCLEtBQUs7c0JBQWxFLFNBQVM7dUJBQUMsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZTp1c2UtaG9zdC1wcm9wZXJ0eS1kZWNvcmF0b3Jcbi8vIHRzbGludDpkaXNhYmxlOmRpcmVjdGl2ZS1zZWxlY3RvclxuaW1wb3J0IHsgZmlyc3QsIGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIE9uRGVzdHJveSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIFZpZXdDaGlsZCxcbiAgTmdab25lLFxuICBFbWJlZGRlZFZpZXdSZWYsXG4gIEluamVjdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyB1bnJ4LCBQYmxOZ3JpZE11bHRpUmVnaXN0cnlNYXAgfSBmcm9tICdAcGVidWxhL25ncmlkL2NvcmUnO1xuXG5pbXBvcnQgeyBfUGJsTmdyaWRDb21wb25lbnQgfSBmcm9tICcuLi8uLi90b2tlbnMnO1xuaW1wb3J0IHsgRVhUX0FQSV9UT0tFTiwgUGJsTmdyaWRJbnRlcm5hbEV4dGVuc2lvbkFwaSB9IGZyb20gJy4uLy4uL2V4dC9ncmlkLWV4dC1hcGknO1xuaW1wb3J0IHsgQ09MVU1OLCBQYmxNZXRhQ29sdW1uLCBQYmxDb2x1bW4gfSBmcm9tICcuLi9jb2x1bW4vbW9kZWwnO1xuaW1wb3J0IHsgTWV0YUNlbGxDb250ZXh0LCBQYmxOZ3JpZE1ldGFDZWxsQ29udGV4dCB9IGZyb20gJy4uL2NvbnRleHQvaW5kZXgnO1xuaW1wb3J0IHsgUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dCwgUGJsTmdyaWRNdWx0aUNvbXBvbmVudFJlZ2lzdHJ5LCBQYmxOZ3JpZE11bHRpVGVtcGxhdGVSZWdpc3RyeSB9IGZyb20gJy4uL3JlZ2lzdHJ5JztcbmltcG9ydCB7IFBibE5ncmlkQ29sdW1uRGVmLCBXaWR0aENoYW5nZUV2ZW50IH0gZnJvbSAnLi4vY29sdW1uL2RpcmVjdGl2ZXMvY29sdW1uLWRlZic7XG5pbXBvcnQgeyBhcHBseVNvdXJjZVdpZHRoLCBhcHBseVdpZHRoLCBpbml0Q2VsbEVsZW1lbnQgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7IFBibE5ncmlkQmFzZUNlbGwgfSBmcm9tICcuL2Jhc2UtY2VsbCc7XG5pbXBvcnQgeyBQYmxDb2x1bW5TaXplT2JzZXJ2ZXIgfSBmcm9tICcuLi9mZWF0dXJlcy9jb2x1bW4tc2l6ZS1vYnNlcnZlci9jb2x1bW4tc2l6ZS1vYnNlcnZlcic7XG5cbmNvbnN0IGxhc3REYXRhSGVhZGVyRXh0ZW5zaW9ucyA9IG5ldyBNYXA8X1BibE5ncmlkQ29tcG9uZW50LCBQYmxOZ3JpZE11bHRpUmVnaXN0cnlNYXBbJ2RhdGFIZWFkZXJFeHRlbnNpb25zJ11bXT4oKTtcblxuLyoqXG4gKiBIZWFkZXIgY2VsbCBjb21wb25lbnQuXG4gKiBUaGUgaGVhZGVyIGNlbGwgY29tcG9uZW50IHdpbGwgcmVuZGVyIHRoZSBoZWFkZXIgY2VsbCB0ZW1wbGF0ZSBhbmQgYWRkIHRoZSBwcm9wZXIgY2xhc3NlcyBhbmQgcm9sZS5cbiAqXG4gKiBJdCBpcyBhbHNvIHJlc3BvbnNpYmxlIGZvciBjcmVhdGluZyBhbmQgbWFuYWdpbmcgdGhlIGFueSBgZGF0YUhlYWRlckV4dGVuc2lvbnNgIHJlZ2lzdGVyZWQgaW4gdGhlIHJlZ2lzdHJ5LlxuICogVGhlc2UgZXh0ZW5zaW9ucyBhZGQgZmVhdHVyZXMgdG8gdGhlIGNlbGxzIGVpdGhlciBhcyBhIHRlbXBsYXRlIGluc3RhbmNlIG9yIGFzIGEgY29tcG9uZW50IGluc3RhbmNlLlxuICogRXhhbXBsZXM6IFNvcnRpbmcgYmVoYXZpb3IsIGRyYWcmZHJvcC9yZXNpemUgaGFuZGxlcnMsIG1lbnVzIGV0Yy4uLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdwYmwtbmdyaWQtaGVhZGVyLWNlbGwnLFxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLWhvc3QtbWV0YWRhdGEtcHJvcGVydHlcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnY2RrLWhlYWRlci1jZWxsIHBibC1uZ3JpZC1oZWFkZXItY2VsbCcsXG4gICAgcm9sZTogJ2NvbHVtbmhlYWRlcicsXG4gIH0sXG4gIGV4cG9ydEFzOiAnbmdyaWRIZWFkZXJDZWxsJyxcbiAgdGVtcGxhdGU6IGA8bmctY29udGFpbmVyICN2Y1JlZj48L25nLWNvbnRhaW5lcj5gLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRIZWFkZXJDZWxsQ29tcG9uZW50PFQgZXh0ZW5kcyBDT0xVTU4gPSBDT0xVTU4+IGV4dGVuZHMgUGJsTmdyaWRCYXNlQ2VsbCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGQoJ3ZjUmVmJywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IHRydWUgfSkgdmNSZWY6IFZpZXdDb250YWluZXJSZWY7XG5cbiAgY29sdW1uOiBQYmxDb2x1bW47XG4gIGNlbGxDdHg6IFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQgfCBNZXRhQ2VsbENvbnRleHQ7XG5cbiAgZ2V0IGNvbHVtbkRlZigpOiBQYmxOZ3JpZENvbHVtbkRlZjxQYmxDb2x1bW4+IHsgcmV0dXJuIHRoaXMuY29sdW1uPy5jb2x1bW5EZWY7IH1cbiAgZ2V0IGdyaWQoKTogX1BibE5ncmlkQ29tcG9uZW50IHsgcmV0dXJuIHRoaXMuZXh0QXBpLmdyaWQ7IH1cblxuICBwcml2YXRlIHJlc2l6ZU9ic2VydmVyOiBQYmxDb2x1bW5TaXplT2JzZXJ2ZXI7XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChFWFRfQVBJX1RPS0VOKSBleHRBcGk6IFBibE5ncmlkSW50ZXJuYWxFeHRlbnNpb25BcGksXG4gICAgICAgICAgICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgIHByaXZhdGUgem9uZTogTmdab25lKSB7XG4gICAgc3VwZXIoZXh0QXBpLCBlbGVtZW50UmVmKTtcbiAgfVxuXG4gIHNldENvbHVtbihjb2x1bW46IFBibENvbHVtbiwgZ3JpZFdpZHRoUm93OiBib29sZWFuKSB7XG4gICAgY29uc3QgcHJldiA9IHRoaXMuY29sdW1uO1xuICAgIGlmIChwcmV2ICE9PSBjb2x1bW4pIHtcbiAgICAgIGlmIChwcmV2KSB7XG4gICAgICAgIHVucngua2lsbCh0aGlzLCBwcmV2KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jb2x1bW4gPSBjb2x1bW47XG5cbiAgICAgIGxldCBwcmVkaWNhdGU6IChldmVudDogV2lkdGhDaGFuZ2VFdmVudCkgPT4gYm9vbGVhbjtcbiAgICAgIGxldCB2aWV3OiBFbWJlZGRlZFZpZXdSZWY8UGJsTmdyaWRNZXRhQ2VsbENvbnRleHQ8YW55LCBQYmxNZXRhQ29sdW1uIHwgUGJsQ29sdW1uPj5cbiAgICAgIGxldCB3aWR0aFVwZGF0ZXI6ICguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZDtcblxuICAgICAgd2lkdGhVcGRhdGVyID0gZ3JpZFdpZHRoUm93ID8gYXBwbHlTb3VyY2VXaWR0aCA6IGFwcGx5V2lkdGg7XG4gICAgICBwcmVkaWNhdGUgPSBldmVudCA9PiAoIWdyaWRXaWR0aFJvdyAmJiBldmVudC5yZWFzb24gIT09ICd1cGRhdGUnKSB8fCAoZ3JpZFdpZHRoUm93ICYmIGV2ZW50LnJlYXNvbiAhPT0gJ3Jlc2l6ZScpO1xuICAgICAgdmlldyA9ICFncmlkV2lkdGhSb3cgPyB0aGlzLmluaXRNYWluSGVhZGVyQ29sdW1uVmlldyhjb2x1bW4pIDogdW5kZWZpbmVkO1xuICAgICAgaWYgKGdyaWRXaWR0aFJvdyAmJiAhdGhpcy5yZXNpemVPYnNlcnZlcikge1xuICAgICAgICB0aGlzLnJlc2l6ZU9ic2VydmVyID0gbmV3IFBibENvbHVtblNpemVPYnNlcnZlcih0aGlzLmVsLCB0aGlzLmV4dEFwaSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY29sdW1uRGVmLndpZHRoQ2hhbmdlXG4gICAgICAgIC5waXBlKGZpbHRlcihwcmVkaWNhdGUpLCB1bnJ4KHRoaXMsIGNvbHVtbikpXG4gICAgICAgIC5zdWJzY3JpYmUod2lkdGhVcGRhdGVyLmJpbmQodGhpcykpO1xuXG4gICAgICBpZiAodmlldykge1xuICAgICAgICB2aWV3LmRldGVjdENoYW5nZXMoKTtcbiAgICAgIH1cblxuICAgICAgd2lkdGhVcGRhdGVyLmNhbGwodGhpcyk7XG4gICAgICBpbml0Q2VsbEVsZW1lbnQodGhpcy5lbCwgY29sdW1uKTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGVTaXplKCkge1xuICAgIGlmICh0aGlzLnJlc2l6ZU9ic2VydmVyKSB7XG4gICAgICB0aGlzLnJlc2l6ZU9ic2VydmVyLnVwZGF0ZVNpemUoKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgaWYgKHRoaXMucmVzaXplT2JzZXJ2ZXIpIHtcbiAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIuY29sdW1uID0gdGhpcy5jb2x1bW47XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5yZXNpemVPYnNlcnZlcj8uZGVzdHJveSgpO1xuICAgIGlmICh0aGlzLmNvbHVtbikge1xuICAgICAgdW5yeCh0aGlzLCB0aGlzLmNvbHVtbik7XG4gICAgfVxuICAgIHN1cGVyLm5nT25EZXN0cm95KCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaW5pdE1haW5IZWFkZXJDb2x1bW5WaWV3KGNvbDogUGJsQ29sdW1uKSB7XG4gICAgdGhpcy5jZWxsQ3R4ID0gUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dC5jcmVhdGVEYXRlSGVhZGVyQ3R4KHRoaXMgYXMgUGJsTmdyaWRIZWFkZXJDZWxsQ29tcG9uZW50PFBibENvbHVtbj4sIHRoaXMudmNSZWYuaW5qZWN0b3IpO1xuICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLmNlbGxDdHggYXMgUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dDtcbiAgICBjb25zdCB2aWV3ID0gdGhpcy52Y1JlZi5jcmVhdGVFbWJlZGRlZFZpZXcoY29sLmhlYWRlckNlbGxUcGwsIGNvbnRleHQpO1xuICAgIHRoaXMuem9uZS5vblN0YWJsZVxuICAgICAgLnBpcGUoZmlyc3QoKSlcbiAgICAgIC5zdWJzY3JpYmUoICgpID0+IHtcbiAgICAgICAgdGhpcy5ydW5IZWFkZXJFeHRlbnNpb25zKGNvbnRleHQsIHZpZXcgYXMgRW1iZWRkZWRWaWV3UmVmPFBibE5ncmlkTWV0YUNlbGxDb250ZXh0PGFueSwgUGJsQ29sdW1uPj4pO1xuICAgICAgICBjb25zdCB2ID0gdGhpcy52Y1JlZi5nZXQoMCk7XG4gICAgICAgIC8vIGF0IHRoaXMgcG9pbnQgdGhlIHZpZXcgbWlnaHQgZ2V0IGRlc3Ryb3llZCwgaXRzIHBvc3NpYmxlLi4uXG4gICAgICAgIGlmICghdi5kZXN0cm95ZWQpIHtcbiAgICAgICAgICB2LmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgcmV0dXJuIHZpZXc7XG4gIH1cblxuICBwcm90ZWN0ZWQgcnVuSGVhZGVyRXh0ZW5zaW9ucyhjb250ZXh0OiBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0LCB2aWV3OiBFbWJlZGRlZFZpZXdSZWY8UGJsTmdyaWRNZXRhQ2VsbENvbnRleHQ8YW55LCBQYmxDb2x1bW4+Pik6IHZvaWQge1xuICAgIC8vIHdlIGNvbGxlY3QgdGhlIGZpcnN0IGhlYWRlciBleHRlbnNpb24gZm9yIGVhY2ggdW5pcXVlIG5hbWUgb25seSBvbmNlIHBlciBncmlkIGluc3RhbmNlXG4gICAgbGV0IGV4dGVuc2lvbnMgPSBsYXN0RGF0YUhlYWRlckV4dGVuc2lvbnMuZ2V0KHRoaXMuZ3JpZCk7XG4gICAgaWYgKCFleHRlbnNpb25zKSB7XG4gICAgICBjb25zdCBkYXRhSGVhZGVyRXh0ZW5zaW9ucyA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XG5cbiAgICAgIHRoaXMuZ3JpZC5yZWdpc3RyeS5mb3JNdWx0aSgnZGF0YUhlYWRlckV4dGVuc2lvbnMnLCB2YWx1ZXMgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHZhbHVlIG9mIHZhbHVlcykge1xuICAgICAgICAgIGlmICghZGF0YUhlYWRlckV4dGVuc2lvbnMuaGFzKHZhbHVlLm5hbWUpKSB7XG4gICAgICAgICAgICBkYXRhSGVhZGVyRXh0ZW5zaW9ucy5zZXQodmFsdWUubmFtZSwgdmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGV4dGVuc2lvbnMgPSBBcnJheS5mcm9tKGRhdGFIZWFkZXJFeHRlbnNpb25zLnZhbHVlcygpKTtcbiAgICAgIGxhc3REYXRhSGVhZGVyRXh0ZW5zaW9ucy5zZXQodGhpcy5ncmlkLCBleHRlbnNpb25zKTtcbiAgICAgIC8vIGRlc3Ryb3kgaXQgb24gdGhlIG5leHQgdHVybiwgd2Uga25vdyBhbGwgY2VsbHMgd2lsbCByZW5kZXIgb24gdGhlIHNhbWUgdHVybi5cbiAgICAgIHRoaXMuem9uZS5vblN0YWJsZS5waXBlKGZpcnN0KCkpLnN1YnNjcmliZSggKCkgPT4gbGFzdERhdGFIZWFkZXJFeHRlbnNpb25zLmRlbGV0ZSh0aGlzLmdyaWQpICk7XG4gICAgfVxuXG4gICAgbGV0IHsgcm9vdE5vZGVzIH0gPSB2aWV3O1xuXG4gICAgZm9yIChjb25zdCBleHQgb2YgZXh0ZW5zaW9ucykge1xuICAgICAgaWYgKCFleHQuc2hvdWxkUmVuZGVyIHx8IGV4dC5zaG91bGRSZW5kZXIoY29udGV4dCkpIHtcbiAgICAgICAgaWYgKGV4dCBpbnN0YW5jZW9mIFBibE5ncmlkTXVsdGlUZW1wbGF0ZVJlZ2lzdHJ5KSB7XG4gICAgICAgICAgY29uc3QgZXh0VmlldyA9IHRoaXMudmNSZWYuY3JlYXRlRW1iZWRkZWRWaWV3KGV4dC50UmVmLCBjb250ZXh0KTtcbiAgICAgICAgICBleHRWaWV3Lm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9IGVsc2UgaWYgKGV4dCBpbnN0YW5jZW9mIFBibE5ncmlkTXVsdGlDb21wb25lbnRSZWdpc3RyeSkge1xuICAgICAgICAgIHJvb3ROb2RlcyA9IHRoaXMuY3JlYXRlQ29tcG9uZW50KGV4dCwgY29udGV4dCwgcm9vdE5vZGVzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBjcmVhdGVDb21wb25lbnQoZXh0OiBQYmxOZ3JpZE11bHRpQ29tcG9uZW50UmVnaXN0cnk8YW55LCBcImRhdGFIZWFkZXJFeHRlbnNpb25zXCI+LCBjb250ZXh0OiBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0LCByb290Tm9kZXM6IGFueVtdKTogYW55W10ge1xuICAgIGNvbnN0IGZhY3RvcnkgPSBleHQuZ2V0RmFjdG9yeShjb250ZXh0KTtcbiAgICBjb25zdCBwcm9qZWN0ZWRDb250ZW50OiBhbnlbXVtdID0gW107XG5cbiAgICBpZiAoZXh0LnByb2plY3RDb250ZW50KSB7XG4gICAgICBwcm9qZWN0ZWRDb250ZW50LnB1c2gocm9vdE5vZGVzKTtcbiAgICB9XG5cbiAgICBjb25zdCBjbXBSZWYgPSB0aGlzLnZjUmVmLmNyZWF0ZUNvbXBvbmVudChmYWN0b3J5LCB0aGlzLnZjUmVmLmxlbmd0aCwgbnVsbCwgcHJvamVjdGVkQ29udGVudCk7XG5cbiAgICBpZiAoZXh0LnByb2plY3RDb250ZW50KSB7XG4gICAgICByb290Tm9kZXMgPSBbIGNtcFJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50IF07XG4gICAgfVxuXG4gICAgaWYgKGV4dC5vbkNyZWF0ZWQpIHtcbiAgICAgIGV4dC5vbkNyZWF0ZWQoY29udGV4dCwgY21wUmVmKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcm9vdE5vZGVzO1xuICB9XG59XG4iXX0=