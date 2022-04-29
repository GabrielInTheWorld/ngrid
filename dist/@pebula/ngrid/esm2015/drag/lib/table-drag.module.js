import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PblNgridModule, provideCommon, ngridPlugin } from '@pebula/ngrid';
import './drag-and-drop/column/extend-grid'; // to make sure d.ts stay in published lib and so agumentation kicks in
import { colReorderExtendGrid } from './drag-and-drop/column/extend-grid';
import { PblNgridAggregationContainerDirective } from './drag-and-drop/column/aggregation-column';
import { PblNgridCellDraggerRefDirective } from './drag-and-drop/column/cell-dragger-ref';
import { PblNgridColumnDragDirective } from './drag-and-drop/column/column-drag';
import { PblNgridColumnDropContainerDirective } from './drag-and-drop/column/column-drop-container';
import { PblNgridColumnDragContainerDirective, COL_DRAG_CONTAINER_PLUGIN_KEY } from './drag-and-drop/column/column-drag-container';
import { PblNgridColumnReorderPluginDirective, COL_REORDER_PLUGIN_KEY } from './drag-and-drop/column/column-reorder-plugin';
import { CdkLazyDropList } from './drag-and-drop/core/drop-list';
import { CdkLazyDrag } from './drag-and-drop/core/drag';
import { PblDragHandle } from './drag-and-drop/core/drag-handle';
import { PblNgridRowReorderPluginDirective, ROW_REORDER_PLUGIN_KEY } from './drag-and-drop/row/row-reorder-plugin';
import { PblNgridRowDragDirective } from './drag-and-drop/row/row-drag';
import { PblNgridDragResizeComponent, COL_RESIZE_PLUGIN_KEY } from './column-resize/column-resize.component';
import { PblNgridCellResizerRefDirective } from './column-resize/cell-resizer-ref';
import './column-resize/extend-grid'; // to make sure d.ts stay in published lib and so agumentation kicks in
import { colResizeExtendGrid } from './column-resize/extend-grid';
import { DragPluginDefaultTemplatesComponent } from './default-settings.component';
import * as i0 from "@angular/core";
export function ngridPlugins() {
    return [
        ngridPlugin({ id: ROW_REORDER_PLUGIN_KEY }, PblNgridRowReorderPluginDirective),
        ngridPlugin({ id: COL_DRAG_CONTAINER_PLUGIN_KEY }, PblNgridColumnDragContainerDirective),
        ngridPlugin({ id: COL_REORDER_PLUGIN_KEY, runOnce: colReorderExtendGrid }, PblNgridColumnReorderPluginDirective),
        ngridPlugin({ id: COL_RESIZE_PLUGIN_KEY, runOnce: colResizeExtendGrid }, PblNgridDragResizeComponent),
    ];
}
export class PblNgridDragModule {
    static withDefaultTemplates() {
        return {
            ngModule: PblNgridDragModule,
            providers: provideCommon([{ component: DragPluginDefaultTemplatesComponent }]),
        };
    }
}
PblNgridDragModule.NGRID_PLUGIN = ngridPlugins();
/** @nocollapse */ PblNgridDragModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridDragModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ PblNgridDragModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridDragModule, declarations: [DragPluginDefaultTemplatesComponent,
        CdkLazyDropList, CdkLazyDrag, PblDragHandle,
        PblNgridRowReorderPluginDirective, PblNgridRowDragDirective,
        PblNgridColumnDragContainerDirective,
        PblNgridColumnDropContainerDirective, PblNgridColumnReorderPluginDirective, PblNgridColumnDragDirective, PblNgridCellDraggerRefDirective,
        PblNgridAggregationContainerDirective,
        PblNgridDragResizeComponent, PblNgridCellResizerRefDirective], imports: [CommonModule,
        PblNgridModule,
        DragDropModule], exports: [DragDropModule,
        CdkLazyDropList, CdkLazyDrag, PblDragHandle,
        PblNgridRowReorderPluginDirective, PblNgridRowDragDirective,
        PblNgridColumnDragContainerDirective,
        PblNgridColumnDropContainerDirective, PblNgridColumnReorderPluginDirective, PblNgridColumnDragDirective, PblNgridCellDraggerRefDirective,
        PblNgridAggregationContainerDirective,
        PblNgridDragResizeComponent, PblNgridCellResizerRefDirective] });
/** @nocollapse */ PblNgridDragModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridDragModule, imports: [[
            CommonModule,
            PblNgridModule,
            DragDropModule
        ], DragDropModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridDragModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        PblNgridModule,
                        DragDropModule
                    ],
                    declarations: [
                        DragPluginDefaultTemplatesComponent,
                        CdkLazyDropList, CdkLazyDrag, PblDragHandle,
                        PblNgridRowReorderPluginDirective, PblNgridRowDragDirective,
                        PblNgridColumnDragContainerDirective,
                        PblNgridColumnDropContainerDirective, PblNgridColumnReorderPluginDirective, PblNgridColumnDragDirective, PblNgridCellDraggerRefDirective,
                        PblNgridAggregationContainerDirective,
                        PblNgridDragResizeComponent, PblNgridCellResizerRefDirective,
                    ],
                    exports: [
                        DragDropModule,
                        CdkLazyDropList, CdkLazyDrag, PblDragHandle,
                        PblNgridRowReorderPluginDirective, PblNgridRowDragDirective,
                        PblNgridColumnDragContainerDirective,
                        PblNgridColumnDropContainerDirective, PblNgridColumnReorderPluginDirective, PblNgridColumnDragDirective, PblNgridCellDraggerRefDirective,
                        PblNgridAggregationContainerDirective,
                        PblNgridDragResizeComponent, PblNgridCellResizerRefDirective,
                    ],
                    // TODO(REFACTOR_REF 2): remove when ViewEngine is no longer supported by angular (V12 ???)
                    entryComponents: [DragPluginDefaultTemplatesComponent]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtZHJhZy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL25ncmlkL2RyYWcvc3JjL2xpYi90YWJsZS1kcmFnLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXhELE9BQU8sRUFBRSxjQUFjLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzRSxPQUFPLG9DQUFvQyxDQUFDLENBQUMsdUVBQXVFO0FBQ3BILE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFBO0FBQ3pFLE9BQU8sRUFBRSxxQ0FBcUMsRUFBRSxNQUFNLDJDQUEyQyxDQUFBO0FBQ2pHLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFBO0FBQ3pGLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLG9DQUFvQyxDQUFBO0FBQ2hGLE9BQU8sRUFBRSxvQ0FBb0MsRUFBRSxNQUFNLDhDQUE4QyxDQUFBO0FBQ25HLE9BQU8sRUFBRSxvQ0FBb0MsRUFBRSw2QkFBNkIsRUFBRSxNQUFNLDhDQUE4QyxDQUFBO0FBQ2xJLE9BQU8sRUFBRSxvQ0FBb0MsRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDhDQUE4QyxDQUFBO0FBRTNILE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNqRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRWpFLE9BQU8sRUFBRSxpQ0FBaUMsRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHdDQUF3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QUFFO2lCQUN6RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRHJhZ0Ryb3BNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcblxuaW1wb3J0IHsgUGJsTmdyaWRNb2R1bGUsIHByb3ZpZGVDb21tb24sIG5ncmlkUGx1Z2luIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5cbmltcG9ydCAnLi9kcmFnLWFuZC1kcm9wL2NvbHVtbi9leHRlbmQtZ3JpZCc7IC8vIHRvIG1ha2Ugc3VyZSBkLnRzIHN0YXkgaW4gcHVibGlzaGVkIGxpYiBhbmQgc28gYWd1bWVudGF0aW9uIGtpY2tzIGluXG5pbXBvcnQgeyBjb2xSZW9yZGVyRXh0ZW5kR3JpZCB9IGZyb20gJy4vZHJhZy1hbmQtZHJvcC9jb2x1bW4vZXh0ZW5kLWdyaWQnXG5pbXBvcnQgeyBQYmxOZ3JpZEFnZ3JlZ2F0aW9uQ29udGFpbmVyRGlyZWN0aXZlIH0gZnJvbSAnLi9kcmFnLWFuZC1kcm9wL2NvbHVtbi9hZ2dyZWdhdGlvbi1jb2x1bW4nXG5pbXBvcnQgeyBQYmxOZ3JpZENlbGxEcmFnZ2VyUmVmRGlyZWN0aXZlIH0gZnJvbSAnLi9kcmFnLWFuZC1kcm9wL2NvbHVtbi9jZWxsLWRyYWdnZXItcmVmJ1xuaW1wb3J0IHsgUGJsTmdyaWRDb2x1bW5EcmFnRGlyZWN0aXZlIH0gZnJvbSAnLi9kcmFnLWFuZC1kcm9wL2NvbHVtbi9jb2x1bW4tZHJhZydcbmltcG9ydCB7IFBibE5ncmlkQ29sdW1uRHJvcENvbnRhaW5lckRpcmVjdGl2ZSB9IGZyb20gJy4vZHJhZy1hbmQtZHJvcC9jb2x1bW4vY29sdW1uLWRyb3AtY29udGFpbmVyJ1xuaW1wb3J0IHsgUGJsTmdyaWRDb2x1bW5EcmFnQ29udGFpbmVyRGlyZWN0aXZlLCBDT0xfRFJBR19DT05UQUlORVJfUExVR0lOX0tFWSB9IGZyb20gJy4vZHJhZy1hbmQtZHJvcC9jb2x1bW4vY29sdW1uLWRyYWctY29udGFpbmVyJ1xuaW1wb3J0IHsgUGJsTmdyaWRDb2x1bW5SZW9yZGVyUGx1Z2luRGlyZWN0aXZlLCBDT0xfUkVPUkRFUl9QTFVHSU5fS0VZIH0gZnJvbSAnLi9kcmFnLWFuZC1kcm9wL2NvbHVtbi9jb2x1bW4tcmVvcmRlci1wbHVnaW4nXG5cbmltcG9ydCB7IENka0xhenlEcm9wTGlzdCB9IGZyb20gJy4vZHJhZy1hbmQtZHJvcC9jb3JlL2Ryb3AtbGlzdCc7XG5pbXBvcnQgeyBDZGtMYXp5RHJhZyB9IGZyb20gJy4vZHJhZy1hbmQtZHJvcC9jb3JlL2RyYWcnO1xuaW1wb3J0IHsgUGJsRHJhZ0hhbmRsZSB9IGZyb20gJy4vZHJhZy1hbmQtZHJvcC9jb3JlL2RyYWctaGFuZGxlJztcblxuaW1wb3J0IHsgUGJsTmdyaWRSb3dSZW9yZGVyUGx1Z2luRGlyZWN0aXZlLCBST1dfUkVPUkRFUl9QTFVHSU5fS0VZIH0gZnJvbSAnLi9kcmFnLWFuZC1kcm9wL3Jvdy9yb3ctcmVvcmRlci1wbHVnaW4nO1xuaW1wb3J0IHsgUGJsTmdyaWRSb3dEcmFnRGlyZWN0aXZlIH0gZnJvbSAnLi9kcmFnLWFuZC1kcm9wL3Jvdy9yb3ctZHJhZyc7XG5cbmltcG9ydCB7IFBibE5ncmlkRHJhZ1Jlc2l6ZUNvbXBvbmVudCwgQ09MX1JFU0laRV9QTFVHSU5fS0VZIH0gZnJvbSAnLi9jb2x1bW4tcmVzaXplL2NvbHVtbi1yZXNpemUuY29tcG9uZW50JztcbmltcG9ydCB7IFBibE5ncmlkQ2VsbFJlc2l6ZXJSZWZEaXJlY3RpdmUgfSBmcm9tICcuL2NvbHVtbi1yZXNpemUvY2VsbC1yZXNpemVyLXJlZic7XG5pbXBvcnQgJy4vY29sdW1uLXJlc2l6ZS9leHRlbmQtZ3JpZCc7IC8vIHRvIG1ha2Ugc3VyZSBkLnRzIHN0YXkgaW4gcHVibGlzaGVkIGxpYiBhbmQgc28gYWd1bWVudGF0aW9uIGtpY2tzIGluXG5pbXBvcnQgeyBjb2xSZXNpemVFeHRlbmRHcmlkIH0gZnJvbSAnLi9jb2x1bW4tcmVzaXplL2V4dGVuZC1ncmlkJztcblxuXG5pbXBvcnQgeyBEcmFnUGx1Z2luRGVmYXVsdFRlbXBsYXRlc0NvbXBvbmVudCB9IGZyb20gJy4vZGVmYXVsdC1zZXR0aW5ncy5jb21wb25lbnQnO1xuXG5leHBvcnQgZnVuY3Rpb24gbmdyaWRQbHVnaW5zKCkge1xuICByZXR1cm4gW1xuICAgIG5ncmlkUGx1Z2luKHsgaWQ6IFJPV19SRU9SREVSX1BMVUdJTl9LRVkgfSwgUGJsTmdyaWRSb3dSZW9yZGVyUGx1Z2luRGlyZWN0aXZlKSxcbiAgICBuZ3JpZFBsdWdpbih7IGlkOiBDT0xfRFJBR19DT05UQUlORVJfUExVR0lOX0tFWSB9LCBQYmxOZ3JpZENvbHVtbkRyYWdDb250YWluZXJEaXJlY3RpdmUpLFxuICAgIG5ncmlkUGx1Z2luKHsgaWQ6IENPTF9SRU9SREVSX1BMVUdJTl9LRVksIHJ1bk9uY2U6IGNvbFJlb3JkZXJFeHRlbmRHcmlkIH0sIFBibE5ncmlkQ29sdW1uUmVvcmRlclBsdWdpbkRpcmVjdGl2ZSksXG4gICAgbmdyaWRQbHVnaW4oeyBpZDogQ09MX1JFU0laRV9QTFVHSU5fS0VZLCBydW5PbmNlOiBjb2xSZXNpemVFeHRlbmRHcmlkIH0sIFBibE5ncmlkRHJhZ1Jlc2l6ZUNvbXBvbmVudCksXG4gIF1cbn1cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBQYmxOZ3JpZE1vZHVsZSxcbiAgICBEcmFnRHJvcE1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBEcmFnUGx1Z2luRGVmYXVsdFRlbXBsYXRlc0NvbXBvbmVudCxcbiAgICBDZGtMYXp5RHJvcExpc3QsIENka0xhenlEcmFnLCBQYmxEcmFnSGFuZGxlLFxuICAgIFBibE5ncmlkUm93UmVvcmRlclBsdWdpbkRpcmVjdGl2ZSwgUGJsTmdyaWRSb3dEcmFnRGlyZWN0aXZlLFxuICAgIFBibE5ncmlkQ29sdW1uRHJhZ0NvbnRhaW5lckRpcmVjdGl2ZSxcbiAgICBQYmxOZ3JpZENvbHVtbkRyb3BDb250YWluZXJEaXJlY3RpdmUsIFBibE5ncmlkQ29sdW1uUmVvcmRlclBsdWdpbkRpcmVjdGl2ZSwgUGJsTmdyaWRDb2x1bW5EcmFnRGlyZWN0aXZlLCBQYmxOZ3JpZENlbGxEcmFnZ2VyUmVmRGlyZWN0aXZlLFxuICAgIFBibE5ncmlkQWdncmVnYXRpb25Db250YWluZXJEaXJlY3RpdmUsXG4gICAgUGJsTmdyaWREcmFnUmVzaXplQ29tcG9uZW50LCBQYmxOZ3JpZENlbGxSZXNpemVyUmVmRGlyZWN0aXZlLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRHJhZ0Ryb3BNb2R1bGUsXG4gICAgQ2RrTGF6eURyb3BMaXN0LCBDZGtMYXp5RHJhZywgUGJsRHJhZ0hhbmRsZSxcbiAgICBQYmxOZ3JpZFJvd1Jlb3JkZXJQbHVnaW5EaXJlY3RpdmUsIFBibE5ncmlkUm93RHJhZ0RpcmVjdGl2ZSxcbiAgICBQYmxOZ3JpZENvbHVtbkRyYWdDb250YWluZXJEaXJlY3RpdmUsXG4gICAgUGJsTmdyaWRDb2x1bW5Ecm9wQ29udGFpbmVyRGlyZWN0aXZlLCBQYmxOZ3JpZENvbHVtblJlb3JkZXJQbHVnaW5EaXJlY3RpdmUsIFBibE5ncmlkQ29sdW1uRHJhZ0RpcmVjdGl2ZSwgUGJsTmdyaWRDZWxsRHJhZ2dlclJlZkRpcmVjdGl2ZSxcbiAgICBQYmxOZ3JpZEFnZ3JlZ2F0aW9uQ29udGFpbmVyRGlyZWN0aXZlLFxuICAgIFBibE5ncmlkRHJhZ1Jlc2l6ZUNvbXBvbmVudCwgUGJsTmdyaWRDZWxsUmVzaXplclJlZkRpcmVjdGl2ZSxcbiAgXSxcbiAgLy8gVE9ETyhSRUZBQ1RPUl9SRUYgMik6IHJlbW92ZSB3aGVuIFZpZXdFbmdpbmUgaXMgbm8gbG9uZ2VyIHN1cHBvcnRlZCBieSBhbmd1bGFyIChWMTIgPz8/KVxuICBlbnRyeUNvbXBvbmVudHM6IFsgRHJhZ1BsdWdpbkRlZmF1bHRUZW1wbGF0ZXNDb21wb25lbnQgXVxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZERyYWdNb2R1bGUge1xuXG4gIHN0YXRpYyByZWFkb25seSBOR1JJRF9QTFVHSU4gPSBuZ3JpZFBsdWdpbnMoKTtcblxuICBzdGF0aWMgd2l0aERlZmF1bHRUZW1wbGF0ZXMoKTogTW9kdWxlV2l0aFByb3ZpZGVyczxQYmxOZ3JpZERyYWdNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFBibE5ncmlkRHJhZ01vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogcHJvdmlkZUNvbW1vbiggWyB7IGNvbXBvbmVudDogRHJhZ1BsdWdpbkRlZmF1bHRUZW1wbGF0ZXNDb21wb25lbnQgfSBdKSxcbiAgICB9O1xuICB9XG59XG4iXX0=