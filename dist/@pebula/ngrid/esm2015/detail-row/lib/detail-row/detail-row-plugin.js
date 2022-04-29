import { Directive, EventEmitter, Injector, Input, Output, ComponentFactoryResolver, NgZone, ViewContainerRef, Component } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { PblNgridPluginController } from '@pebula/ngrid';
import { PLUGIN_KEY } from './tokens';
import { DetailRowController } from './detail-row-controller';
import * as i0 from "@angular/core";
import * as i1 from "@pebula/ngrid";
import * as i2 from "./row";
import * as i3 from "./directives";
export const ROW_WHEN_TRUE = () => true;
export const ROW_WHEN_FALSE = () => false;
export function toggleDetailRow(grid, row, forceState) {
    const controller = PblNgridPluginController.find(grid);
    if (controller) {
        const plugin = controller.getPlugin(PLUGIN_KEY);
        if (plugin) {
            return plugin.toggleDetailRow(row, forceState);
        }
    }
}
export class PblNgridDetailRowPluginDirective {
    constructor(vcRef, pluginCtrl, ngZone, injector) {
        this.pluginCtrl = pluginCtrl;
        this.ngZone = ngZone;
        this.injector = injector;
        /**
         * Set the behavior when the row's context is changed while the detail row is opened  (another row is displayed in place of the current row) or closed.
         *
         * - context: use the context to determine if to open or close the detail row
         * - ignore: don't do anything, leave as is (for manual intervention)
         * - close: close the detail row
         * - render: re-render the row with the new context
         *
         * The default behavior is `context`
         *
         * This scenario will pop-up when using pagination and the user move between pages or change the page size.
         * It might also happen when the data is updated due to custom refresh calls on the datasource or any other scenario that might invoke a datasource update.
         *
         * The `ignore` phase, when used, will not trigger an update, leaving the detail row opened and showing data from the previous row.
         * The `ignore` is intended for use with `toggledRowContextChange`, which will emit when the row context has changed, this will allow the developer to
         * toggle the row (mimic `close`) or update the context manually. For example, if toggling open the detail row invokes a "fetch" operation that retrieves data for the detail row
         * this will allow updates on context change.
         *
         * Usually, what you will want is "context" (the default) which will remember the last state of the row and open it based on it.
         *
         * > Note that for "context" to work you need to use a datasource in client side mode and it must have a primary/identity column (pIndex) or it will not be able to identify the rows.
         *
         * > Note that `toggledRowContextChange` fires regardless of the value set in `whenContextChange`
         */
        this.whenContextChange = 'context';
        /**
         * Emits whenever a detail row instance is toggled on/off
         * Emits an event handler with the row, the toggle state and a toggle operation method.
         */
        this.toggleChange = new EventEmitter();
        /**
         * Emits whenever the row context has changed while the row is toggled open.
         * This scenario is unique and will occur only when a detail row is opened AND the parent row has changed.
         *
         * For example, when using pagination and the user navigates to the next/previous set or when the rows per page size is changed.
         * It might also occur when the data is updated due to custom refresh calls on the datasource or any other scenario that might invoke a datasource update.
         *
         * Emits an event handler with the row, the toggle state and a toggle operation method.
         */
        this.toggledRowContextChange = new EventEmitter();
        this._isSimpleRow = ROW_WHEN_TRUE;
        this._isDetailRow = ROW_WHEN_FALSE;
        this._detailRowRows = new Set();
        this._removePlugin = pluginCtrl.setPlugin(PLUGIN_KEY, this);
        this.grid = pluginCtrl.extApi.grid;
        this.detailRowCtrl = new DetailRowController(vcRef, pluginCtrl.extApi);
        pluginCtrl.onInit()
            .subscribe(() => {
            pluginCtrl.ensurePlugin('targetEvents'); // Depends on target-events plugin
            this.grid.registry.changes
                .subscribe(changes => {
                for (const c of changes) {
                    switch (c.type) {
                        case 'detailRowParent':
                            if (c.op === 'remove') {
                                this.pluginCtrl.extApi.cdkTable.removeRowDef(c.value);
                                this._detailRowDef = undefined;
                            }
                            this.setupDetailRowParent();
                            break;
                    }
                }
            });
            // if we start with an initial value, then update the grid cause we didn't do that
            // when it was set (we cant cause we're not init)
            // otherwise just setup the parent.
            if (this._detailRow) {
                this.updateTable();
            }
            else {
                this.setupDetailRowParent();
            }
        });
    }
    /**
     * Detail row control (none / all rows / selective rows)
     *
     * A detail row is an additional row added below a row rendered with the context of the row above it.
     *
     * You can enable/disable detail row for the entire grid by setting `detailRow` to true/false respectively.
     * To control detail row per row, provide a predicate.
     */
    get detailRow() { return this._detailRow; }
    set detailRow(value) {
        if (this._detailRow !== value) {
            const grid = this.grid;
            if (typeof value === 'function') {
                this._isSimpleRow = (index, rowData) => !value(index, rowData);
                this._isDetailRow = value;
            }
            else {
                value = coerceBooleanProperty(value);
                this._isDetailRow = value ? ROW_WHEN_TRUE : ROW_WHEN_FALSE;
                this._isSimpleRow = value ? ROW_WHEN_FALSE : ROW_WHEN_TRUE;
            }
            this._detailRow = value;
            if (grid.isInit) {
                this.updateTable();
            }
        }
    }
    set singleDetailRow(value) {
        value = coerceBooleanProperty(value);
        if (this._forceSingle !== value) {
            this._forceSingle = value;
            if (value && this._openedRow && this._openedRow.expended) {
                for (const detailRow of this._detailRowRows) {
                    if (detailRow.context.$implicit !== this._openedRow.row) {
                        detailRow.toggle(false);
                    }
                }
            }
        }
    }
    addDetailRow(detailRow) {
        this._detailRowRows.add(detailRow);
    }
    removeDetailRow(detailRow) {
        this._detailRowRows.delete(detailRow);
    }
    toggleDetailRow(row, forceState) {
        for (const detailRow of this._detailRowRows) {
            if (detailRow.context.$implicit === row) {
                detailRow.toggle(forceState);
                return detailRow.expended;
            }
        }
    }
    markForCheck() {
        if (!this._cdPending) {
            this._cdPending = true;
            this.ngZone.runOutsideAngular(() => Promise.resolve()
                .then(() => {
                this.ngZone.run(() => {
                    var _a;
                    this._cdPending = false;
                    (_a = this._defaultParentRef) === null || _a === void 0 ? void 0 : _a.changeDetectorRef.markForCheck();
                });
            }));
        }
    }
    ngOnDestroy() {
        if (this._defaultParentRef) {
            this._defaultParentRef.destroy();
        }
        this._removePlugin(this.grid);
    }
    /** @internal */
    detailRowToggled(event) {
        // logic for closing previous row
        const isSelf = this._openedRow && this._openedRow.row === event.row;
        if (event.expended) {
            if (this._forceSingle && this._openedRow && this._openedRow.expended && !isSelf) {
                this._openedRow.toggle();
            }
            this._openedRow = event;
        }
        else if (isSelf) {
            this._openedRow = undefined;
        }
        this.toggleChange.emit(event);
    }
    setupDetailRowParent() {
        const grid = this.grid;
        const cdkTable = this.pluginCtrl.extApi.cdkTable;
        if (this._detailRowDef) {
            cdkTable.removeRowDef(this._detailRowDef);
            this._detailRowDef = undefined;
        }
        if (this.detailRow) {
            let detailRow = this.pluginCtrl.extApi.registry.getSingle('detailRowParent');
            if (detailRow) {
                this._detailRowDef = detailRow = detailRow.clone();
                Object.defineProperty(detailRow, 'when', { enumerable: true, get: () => this._isDetailRow });
            }
            else if (!this._defaultParentRef) {
                // We don't have a template in the registry, so we register the default component which will push a new template to the registry
                // TODO: move to module? set in root registry? put elsewhere to avoid grid sync (see event of registry change)...
                this._defaultParentRef = this.injector.get(ComponentFactoryResolver)
                    .resolveComponentFactory(PblNgridDefaultDetailRowParentComponent)
                    .create(this.injector);
                this._defaultParentRef.changeDetectorRef.detectChanges(); // kick it for immediate emission of the registry value
                return;
            }
        }
        this.resetTableRowDefs();
    }
    resetTableRowDefs() {
        if (this._detailRowDef) {
            this._detailRow === false
                ? this.pluginCtrl.extApi.cdkTable.removeRowDef(this._detailRowDef)
                : this.pluginCtrl.extApi.cdkTable.addRowDef(this._detailRowDef);
        }
    }
    /**
     * Update the grid with detail row info.
     * Instead of calling for a change detection cycle we can assign the new predicates directly to the pblNgridRowDef instances.
     */
    updateTable() {
        this.grid._tableRowDef.when = this._isSimpleRow;
        this.setupDetailRowParent();
        // Once we changed the `when` predicate on the `CdkRowDef` we must:
        //   1. Update the row cache (property `rowDefs`) to reflect the new change
        this.pluginCtrl.extApi.cdkTable.updateRowDefCache();
        //   2. re-render all rows.
        // The logic for re-rendering all rows is handled in `CdkTable._forceRenderDataRows()` which is a private method.
        // This is a workaround, assigning to `multiTemplateDataRows` will invoke the setter which
        // also calls `CdkTable._forceRenderDataRows()`
        // TODO: This is risky, the setter logic might change.
        // for example, if material will chack for change in `multiTemplateDataRows` setter from previous value...
        this.pluginCtrl.extApi.cdkTable.multiTemplateDataRows = !!this._detailRow;
    }
}
/** @nocollapse */ PblNgridDetailRowPluginDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridDetailRowPluginDirective, deps: [{ token: i0.ViewContainerRef }, { token: i1.PblNgridPluginController }, { token: i0.NgZone }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ PblNgridDetailRowPluginDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridDetailRowPluginDirective, selector: "pbl-ngrid[detailRow]", inputs: { detailRow: "detailRow", singleDetailRow: "singleDetailRow", excludeToggleFrom: "excludeToggleFrom", whenContextChange: "whenContextChange" }, outputs: { toggleChange: "toggleChange", toggledRowContextChange: "toggledRowContextChange" }, exportAs: ["pblNgridDetailRow"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridDetailRowPluginDirective, decorators: [{
            type: Directive,
            args: [{ selector: 'pbl-ngrid[detailRow]', exportAs: 'pblNgridDetailRow' }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }, { type: i1.PblNgridPluginController }, { type: i0.NgZone }, { type: i0.Injector }]; }, propDecorators: { detailRow: [{
                type: Input
            }], singleDetailRow: [{
                type: Input
            }], excludeToggleFrom: [{
                type: Input
            }], whenContextChange: [{
                type: Input
            }], toggleChange: [{
                type: Output
            }], toggledRowContextChange: [{
                type: Output
            }] } });
/**
 * Use to set the a default `pblNgridDetailRowParentRef` if the user did not set one.
 * @internal
 */
export class PblNgridDefaultDetailRowParentComponent {
}
/** @nocollapse */ PblNgridDefaultDetailRowParentComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridDefaultDetailRowParentComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ PblNgridDefaultDetailRowParentComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridDefaultDetailRowParentComponent, selector: "pbl-ngrid-default-detail-row-parent", ngImport: i0, template: `<pbl-ngrid-row *pblNgridDetailRowParentRef="let row;" detailRow></pbl-ngrid-row>`, isInline: true, components: [{ type: i2.PblNgridDetailRowComponent, selector: "pbl-ngrid-row[detailRow]", exportAs: ["pblNgridDetailRow"] }], directives: [{ type: i3.PblNgridDetailRowParentRefDirective, selector: "[pblNgridDetailRowParentRef]", inputs: ["pblNgridDetailRowParentRef", "pblNgridDetailRowParentRefWhen"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridDefaultDetailRowParentComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'pbl-ngrid-default-detail-row-parent',
                    template: `<pbl-ngrid-row *pblNgridDetailRowParentRef="let row;" detailRow></pbl-ngrid-row>`,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV0YWlsLXJvdy1wbHVnaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25ncmlkL2RldGFpbC1yb3cvc3JjL2xpYi9kZXRhaWwtcm93L2RldGFpbC1yb3ctcGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFFLHdCQUF3QixFQUFnQixNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pLLE9BQU8sRUFBZ0IscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RSxPQUFPLEVBQXFCLHdCQUF3QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTVFLE9BQU8sRUFBNEIsVUFBVSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBR2hFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDOzs7OztBQVE5RCxNQUFNLENBQUMsTUFBTSxhQUFhLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDO0FBQ3hDLE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUM7QUFFMUMsTUFBTSxVQUFVLGVBQWUsQ0FBVSxJQUEwQixFQUFFLEdBQU0sRUFBRSxVQUFvQjtJQUMvRixNQUFNLFVBQVUsR0FBRyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkQsSUFBSSxVQUFVLEVBQUU7UUFDZCxNQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2hELElBQUksTUFBTSxFQUFFO1lBQ1YsT0FBTyxNQUFNLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztTQUNoRDtLQUNGO0FBQ0gsQ0FBQztBQUdELE1BQU0sT0FBTyxnQ0FB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MkZBQWhDLGdDQUFnQztrQkFENUMsU0FBUzttQkFBQyxFQUFFLFFBQVEsRUFBRSxzQkFBc0IsRUFBRSxRQUFRLEVBQUUsbUJBQW1CLEVBQUU7MExBVS9ELFNBQVM7c0JBQXJCLEtBQUs7Z0JBcUJPLGVBQWU7c0JBQTNCLEtBQUs7Z0JBaUJHLGlCQUFpQjtzQkFBekIsS0FBSztnQkEwQkcsaUJBQWlCO3NCQUF6QixLQUFLO2dCQU1JLFlBQVk7c0JBQXJCLE1BQU07Z0JBVUcsdUJBQXVCO3NCQUFoQyxNQUFNOztBQW1LVDs7O0dBR0c7QUFLSCxNQUFNLE9BQU8sdUNBQXVDOzt1SkFBdkMsdUNBQXVDOzJJQUF2Qyx1Q0FBdUMsMkVBRnhDLGtGQUFrRjsyRkFFakYsdUNBQXVDO2tCQUpsRCxTQUFTO21CQUFDO29CQUNWLFFBQVEsRUFBRSxxQ0FBcUM7b0JBQy9DLFFBQVEsRUFBRSxrRkFBa0Y7aUJBQzdGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIEluamVjdG9yLCBJbnB1dCwgT25EZXN0cm95LCBPdXRwdXQsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgQ29tcG9uZW50UmVmLCBOZ1pvbmUsIFZpZXdDb250YWluZXJSZWYsIENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQsIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlciB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuXG5pbXBvcnQgeyBQYmxEZXRhaWxzUm93VG9nZ2xlRXZlbnQsIFBMVUdJTl9LRVkgfSBmcm9tICcuL3Rva2Vucyc7XG5pbXBvcnQgeyBQYmxOZ3JpZERldGFpbFJvd0NvbXBvbmVudCB9IGZyb20gJy4vcm93JztcbmltcG9ydCB7IFBibE5ncmlkRGV0YWlsUm93UGFyZW50UmVmRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzJztcbmltcG9ydCB7IERldGFpbFJvd0NvbnRyb2xsZXIgfSBmcm9tICcuL2RldGFpbC1yb3ctY29udHJvbGxlcic7XG5cbmRlY2xhcmUgbW9kdWxlICdAcGVidWxhL25ncmlkL2xpYi9leHQvdHlwZXMnIHtcbiAgaW50ZXJmYWNlIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uIHtcbiAgICBkZXRhaWxSb3c/OiBQYmxOZ3JpZERldGFpbFJvd1BsdWdpbkRpcmVjdGl2ZTxhbnk+O1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBST1dfV0hFTl9UUlVFID0gKCkgPT4gdHJ1ZTtcbmV4cG9ydCBjb25zdCBST1dfV0hFTl9GQUxTRSA9ICgpID0+IGZhbHNlO1xuXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlRGV0YWlsUm93PFQgPSBhbnk+KGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PFQ+LCByb3c6IFQsIGZvcmNlU3RhdGU/OiBib29sZWFuKTogYm9vbGVhbiB8IHZvaWQge1xuICBjb25zdCBjb250cm9sbGVyID0gUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLmZpbmQoZ3JpZCk7XG4gIGlmIChjb250cm9sbGVyKSB7XG4gICAgY29uc3QgcGx1Z2luID0gY29udHJvbGxlci5nZXRQbHVnaW4oUExVR0lOX0tFWSk7XG4gICAgaWYgKHBsdWdpbikge1xuICAgICAgcmV0dXJuIHBsdWdpbi50b2dnbGVEZXRhaWxSb3cocm93LCBmb3JjZVN0YXRlKTtcbiAgICB9XG4gIH1cbn1cblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAncGJsLW5ncmlkW2RldGFpbFJvd10nLCBleHBvcnRBczogJ3BibE5ncmlkRGV0YWlsUm93JyB9KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkRGV0YWlsUm93UGx1Z2luRGlyZWN0aXZlPFQ+IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgLyoqXG4gICAqIERldGFpbCByb3cgY29udHJvbCAobm9uZSAvIGFsbCByb3dzIC8gc2VsZWN0aXZlIHJvd3MpXG4gICAqXG4gICAqIEEgZGV0YWlsIHJvdyBpcyBhbiBhZGRpdGlvbmFsIHJvdyBhZGRlZCBiZWxvdyBhIHJvdyByZW5kZXJlZCB3aXRoIHRoZSBjb250ZXh0IG9mIHRoZSByb3cgYWJvdmUgaXQuXG4gICAqXG4gICAqIFlvdSBjYW4gZW5hYmxlL2Rpc2FibGUgZGV0YWlsIHJvdyBmb3IgdGhlIGVudGlyZSBncmlkIGJ5IHNldHRpbmcgYGRldGFpbFJvd2AgdG8gdHJ1ZS9mYWxzZSByZXNwZWN0aXZlbHkuXG4gICAqIFRvIGNvbnRyb2wgZGV0YWlsIHJvdyBwZXIgcm93LCBwcm92aWRlIGEgcHJlZGljYXRlLlxuICAgKi9cbiAgQElucHV0KCkgZ2V0IGRldGFpbFJvdygpOiAoIChpbmRleDogbnVtYmVyLCByb3dEYXRhOiBUKSA9PiBib29sZWFuICkgfCBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2RldGFpbFJvdzsgfVxuICBzZXQgZGV0YWlsUm93KHZhbHVlOiAoIChpbmRleDogbnVtYmVyLCByb3dEYXRhOiBUKSA9PiBib29sZWFuICkgfCBib29sZWFuICkge1xuICAgIGlmICh0aGlzLl9kZXRhaWxSb3cgIT09IHZhbHVlKSB7XG4gICAgICBjb25zdCBncmlkID0gdGhpcy5ncmlkO1xuXG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMuX2lzU2ltcGxlUm93ID0gKGluZGV4OiBudW1iZXIsIHJvd0RhdGE6IFQpID0+ICEodmFsdWUgYXMgYW55KShpbmRleCwgcm93RGF0YSk7XG4gICAgICAgIHRoaXMuX2lzRGV0YWlsUm93ID0gdmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgICAgIHRoaXMuX2lzRGV0YWlsUm93ID0gdmFsdWUgPyBST1dfV0hFTl9UUlVFIDogUk9XX1dIRU5fRkFMU0U7XG4gICAgICAgIHRoaXMuX2lzU2ltcGxlUm93ID0gdmFsdWUgPyBST1dfV0hFTl9GQUxTRSA6IFJPV19XSEVOX1RSVUU7XG4gICAgICB9XG4gICAgICB0aGlzLl9kZXRhaWxSb3cgPSB2YWx1ZTtcblxuICAgICAgaWYgKGdyaWQuaXNJbml0KSB7XG4gICAgICAgIHRoaXMudXBkYXRlVGFibGUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBASW5wdXQoKSBzZXQgc2luZ2xlRGV0YWlsUm93KHZhbHVlOiBib29sZWFuKSB7XG4gICAgdmFsdWUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIGlmICh0aGlzLl9mb3JjZVNpbmdsZSAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuX2ZvcmNlU2luZ2xlID0gdmFsdWU7XG4gICAgICBpZiAodmFsdWUgJiYgdGhpcy5fb3BlbmVkUm93ICYmIHRoaXMuX29wZW5lZFJvdy5leHBlbmRlZCkge1xuICAgICAgICBmb3IgKGNvbnN0IGRldGFpbFJvdyBvZiB0aGlzLl9kZXRhaWxSb3dSb3dzKSB7XG4gICAgICAgICAgaWYgKGRldGFpbFJvdy5jb250ZXh0LiRpbXBsaWNpdCAhPT0gdGhpcy5fb3BlbmVkUm93LnJvdykge1xuICAgICAgICAgICAgZGV0YWlsUm93LnRvZ2dsZShmYWxzZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEEgbGlzdCBvZiBjb2x1bW5zIHRoYXQgd2lsbCBub3QgdHJpZ2dlciBhIGRldGFpbCByb3cgdG9nZ2xlIHdoZW4gY2xpY2tlZC5cbiAgICovXG4gIEBJbnB1dCgpIGV4Y2x1ZGVUb2dnbGVGcm9tOiBzdHJpbmdbXTtcblxuICAvKipcbiAgICogU2V0IHRoZSBiZWhhdmlvciB3aGVuIHRoZSByb3cncyBjb250ZXh0IGlzIGNoYW5nZWQgd2hpbGUgdGhlIGRldGFpbCByb3cgaXMgb3BlbmVkICAoYW5vdGhlciByb3cgaXMgZGlzcGxheWVkIGluIHBsYWNlIG9mIHRoZSBjdXJyZW50IHJvdykgb3IgY2xvc2VkLlxuICAgKlxuICAgKiAtIGNvbnRleHQ6IHVzZSB0aGUgY29udGV4dCB0byBkZXRlcm1pbmUgaWYgdG8gb3BlbiBvciBjbG9zZSB0aGUgZGV0YWlsIHJvd1xuICAgKiAtIGlnbm9yZTogZG9uJ3QgZG8gYW55dGhpbmcsIGxlYXZlIGFzIGlzIChmb3IgbWFudWFsIGludGVydmVudGlvbilcbiAgICogLSBjbG9zZTogY2xvc2UgdGhlIGRldGFpbCByb3dcbiAgICogLSByZW5kZXI6IHJlLXJlbmRlciB0aGUgcm93IHdpdGggdGhlIG5ldyBjb250ZXh0XG4gICAqXG4gICAqIFRoZSBkZWZhdWx0IGJlaGF2aW9yIGlzIGBjb250ZXh0YFxuICAgKlxuICAgKiBUaGlzIHNjZW5hcmlvIHdpbGwgcG9wLXVwIHdoZW4gdXNpbmcgcGFnaW5hdGlvbiBhbmQgdGhlIHVzZXIgbW92ZSBiZXR3ZWVuIHBhZ2VzIG9yIGNoYW5nZSB0aGUgcGFnZSBzaXplLlxuICAgKiBJdCBtaWdodCBhbHNvIGhhcHBlbiB3aGVuIHRoZSBkYXRhIGlzIHVwZGF0ZWQgZHVlIHRvIGN1c3RvbSByZWZyZXNoIGNhbGxzIG9uIHRoZSBkYXRhc291cmNlIG9yIGFueSBvdGhlciBzY2VuYXJpbyB0aGF0IG1pZ2h0IGludm9rZSBhIGRhdGFzb3VyY2UgdXBkYXRlLlxuICAgKlxuICAgKiBUaGUgYGlnbm9yZWAgcGhhc2UsIHdoZW4gdXNlZCwgd2lsbCBub3QgdHJpZ2dlciBhbiB1cGRhdGUsIGxlYXZpbmcgdGhlIGRldGFpbCByb3cgb3BlbmVkIGFuZCBzaG93aW5nIGRhdGEgZnJvbSB0aGUgcHJldmlvdXMgcm93LlxuICAgKiBUaGUgYGlnbm9yZWAgaXMgaW50ZW5kZWQgZm9yIHVzZSB3aXRoIGB0b2dnbGVkUm93Q29udGV4dENoYW5nZWAsIHdoaWNoIHdpbGwgZW1pdCB3aGVuIHRoZSByb3cgY29udGV4dCBoYXMgY2hhbmdlZCwgdGhpcyB3aWxsIGFsbG93IHRoZSBkZXZlbG9wZXIgdG9cbiAgICogdG9nZ2xlIHRoZSByb3cgKG1pbWljIGBjbG9zZWApIG9yIHVwZGF0ZSB0aGUgY29udGV4dCBtYW51YWxseS4gRm9yIGV4YW1wbGUsIGlmIHRvZ2dsaW5nIG9wZW4gdGhlIGRldGFpbCByb3cgaW52b2tlcyBhIFwiZmV0Y2hcIiBvcGVyYXRpb24gdGhhdCByZXRyaWV2ZXMgZGF0YSBmb3IgdGhlIGRldGFpbCByb3dcbiAgICogdGhpcyB3aWxsIGFsbG93IHVwZGF0ZXMgb24gY29udGV4dCBjaGFuZ2UuXG4gICAqXG4gICAqIFVzdWFsbHksIHdoYXQgeW91IHdpbGwgd2FudCBpcyBcImNvbnRleHRcIiAodGhlIGRlZmF1bHQpIHdoaWNoIHdpbGwgcmVtZW1iZXIgdGhlIGxhc3Qgc3RhdGUgb2YgdGhlIHJvdyBhbmQgb3BlbiBpdCBiYXNlZCBvbiBpdC5cbiAgICpcbiAgICogPiBOb3RlIHRoYXQgZm9yIFwiY29udGV4dFwiIHRvIHdvcmsgeW91IG5lZWQgdG8gdXNlIGEgZGF0YXNvdXJjZSBpbiBjbGllbnQgc2lkZSBtb2RlIGFuZCBpdCBtdXN0IGhhdmUgYSBwcmltYXJ5L2lkZW50aXR5IGNvbHVtbiAocEluZGV4KSBvciBpdCB3aWxsIG5vdCBiZSBhYmxlIHRvIGlkZW50aWZ5IHRoZSByb3dzLlxuICAgKlxuICAgKiA+IE5vdGUgdGhhdCBgdG9nZ2xlZFJvd0NvbnRleHRDaGFuZ2VgIGZpcmVzIHJlZ2FyZGxlc3Mgb2YgdGhlIHZhbHVlIHNldCBpbiBgd2hlbkNvbnRleHRDaGFuZ2VgXG4gICAqL1xuICBASW5wdXQoKSB3aGVuQ29udGV4dENoYW5nZTogJ2lnbm9yZScgfCAnY2xvc2UnIHwgJ3JlbmRlcicgfCAnY29udGV4dCcgPSAnY29udGV4dCc7XG5cbiAgLyoqXG4gICAqIEVtaXRzIHdoZW5ldmVyIGEgZGV0YWlsIHJvdyBpbnN0YW5jZSBpcyB0b2dnbGVkIG9uL29mZlxuICAgKiBFbWl0cyBhbiBldmVudCBoYW5kbGVyIHdpdGggdGhlIHJvdywgdGhlIHRvZ2dsZSBzdGF0ZSBhbmQgYSB0b2dnbGUgb3BlcmF0aW9uIG1ldGhvZC5cbiAgICovXG4gIEBPdXRwdXQoKSB0b2dnbGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPFBibERldGFpbHNSb3dUb2dnbGVFdmVudDxUPj4oKTtcbiAgLyoqXG4gICAqIEVtaXRzIHdoZW5ldmVyIHRoZSByb3cgY29udGV4dCBoYXMgY2hhbmdlZCB3aGlsZSB0aGUgcm93IGlzIHRvZ2dsZWQgb3Blbi5cbiAgICogVGhpcyBzY2VuYXJpbyBpcyB1bmlxdWUgYW5kIHdpbGwgb2NjdXIgb25seSB3aGVuIGEgZGV0YWlsIHJvdyBpcyBvcGVuZWQgQU5EIHRoZSBwYXJlbnQgcm93IGhhcyBjaGFuZ2VkLlxuICAgKlxuICAgKiBGb3IgZXhhbXBsZSwgd2hlbiB1c2luZyBwYWdpbmF0aW9uIGFuZCB0aGUgdXNlciBuYXZpZ2F0ZXMgdG8gdGhlIG5leHQvcHJldmlvdXMgc2V0IG9yIHdoZW4gdGhlIHJvd3MgcGVyIHBhZ2Ugc2l6ZSBpcyBjaGFuZ2VkLlxuICAgKiBJdCBtaWdodCBhbHNvIG9jY3VyIHdoZW4gdGhlIGRhdGEgaXMgdXBkYXRlZCBkdWUgdG8gY3VzdG9tIHJlZnJlc2ggY2FsbHMgb24gdGhlIGRhdGFzb3VyY2Ugb3IgYW55IG90aGVyIHNjZW5hcmlvIHRoYXQgbWlnaHQgaW52b2tlIGEgZGF0YXNvdXJjZSB1cGRhdGUuXG4gICAqXG4gICAqIEVtaXRzIGFuIGV2ZW50IGhhbmRsZXIgd2l0aCB0aGUgcm93LCB0aGUgdG9nZ2xlIHN0YXRlIGFuZCBhIHRvZ2dsZSBvcGVyYXRpb24gbWV0aG9kLlxuICAgKi9cbiAgQE91dHB1dCgpIHRvZ2dsZWRSb3dDb250ZXh0Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxQYmxEZXRhaWxzUm93VG9nZ2xlRXZlbnQ8VD4+KCk7XG5cbiAgcHVibGljIHJlYWRvbmx5IGRldGFpbFJvd0N0cmw6IERldGFpbFJvd0NvbnRyb2xsZXI7XG5cbiAgcHJpdmF0ZSBfb3BlbmVkUm93PzogUGJsRGV0YWlsc1Jvd1RvZ2dsZUV2ZW50PFQ+O1xuICBwcml2YXRlIF9mb3JjZVNpbmdsZTogYm9vbGVhbjtcbiAgcHJpdmF0ZSBfaXNTaW1wbGVSb3c6IChpbmRleDogbnVtYmVyLCByb3dEYXRhOiBUKSA9PiBib29sZWFuID0gUk9XX1dIRU5fVFJVRTtcbiAgcHJpdmF0ZSBfaXNEZXRhaWxSb3c6IChpbmRleDogbnVtYmVyLCByb3dEYXRhOiBUKSA9PiBib29sZWFuID0gUk9XX1dIRU5fRkFMU0U7XG4gIHByaXZhdGUgX2RldGFpbFJvd1Jvd3MgPSBuZXcgU2V0PFBibE5ncmlkRGV0YWlsUm93Q29tcG9uZW50PigpO1xuICBwcml2YXRlIF9kZXRhaWxSb3c6ICggKGluZGV4OiBudW1iZXIsIHJvd0RhdGE6IFQpID0+IGJvb2xlYW4gKSB8IGJvb2xlYW47XG4gIHByaXZhdGUgX2RldGFpbFJvd0RlZjogUGJsTmdyaWREZXRhaWxSb3dQYXJlbnRSZWZEaXJlY3RpdmU8VD47XG4gIHByaXZhdGUgX2RlZmF1bHRQYXJlbnRSZWY6IENvbXBvbmVudFJlZjxQYmxOZ3JpZERlZmF1bHREZXRhaWxSb3dQYXJlbnRDb21wb25lbnQ+O1xuICBwcml2YXRlIF9yZW1vdmVQbHVnaW46IChncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+KSA9PiB2b2lkO1xuICBwcml2YXRlIF9jZFBlbmRpbmc6IGJvb2xlYW47XG4gIHByaXZhdGUgcmVhZG9ubHkgZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8YW55PjtcblxuICBjb25zdHJ1Y3Rvcih2Y1JlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgICAgICAgcHJpdmF0ZSByZWFkb25seSBwbHVnaW5DdHJsOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXI8VD4sXG4gICAgICAgICAgICAgIHByaXZhdGUgcmVhZG9ubHkgbmdab25lOiBOZ1pvbmUsXG4gICAgICAgICAgICAgIHByaXZhdGUgcmVhZG9ubHkgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgdGhpcy5fcmVtb3ZlUGx1Z2luID0gcGx1Z2luQ3RybC5zZXRQbHVnaW4oUExVR0lOX0tFWSwgdGhpcyk7XG4gICAgdGhpcy5ncmlkID0gcGx1Z2luQ3RybC5leHRBcGkuZ3JpZDtcbiAgICB0aGlzLmRldGFpbFJvd0N0cmwgPSBuZXcgRGV0YWlsUm93Q29udHJvbGxlcih2Y1JlZiwgcGx1Z2luQ3RybC5leHRBcGkpO1xuXG4gICAgcGx1Z2luQ3RybC5vbkluaXQoKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHBsdWdpbkN0cmwuZW5zdXJlUGx1Z2luKCd0YXJnZXRFdmVudHMnKTsgLy8gRGVwZW5kcyBvbiB0YXJnZXQtZXZlbnRzIHBsdWdpblxuXG4gICAgICAgIHRoaXMuZ3JpZC5yZWdpc3RyeS5jaGFuZ2VzXG4gICAgICAgICAgLnN1YnNjcmliZSggY2hhbmdlcyA9PiB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGMgb2YgY2hhbmdlcykge1xuICAgICAgICAgICAgICBzd2l0Y2ggKGMudHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2RldGFpbFJvd1BhcmVudCc6XG4gICAgICAgICAgICAgICAgICBpZiAoYy5vcCA9PT0gJ3JlbW92ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW5DdHJsLmV4dEFwaS5jZGtUYWJsZS5yZW1vdmVSb3dEZWYoYy52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RldGFpbFJvd0RlZiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHRoaXMuc2V0dXBEZXRhaWxSb3dQYXJlbnQoKTtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gaWYgd2Ugc3RhcnQgd2l0aCBhbiBpbml0aWFsIHZhbHVlLCB0aGVuIHVwZGF0ZSB0aGUgZ3JpZCBjYXVzZSB3ZSBkaWRuJ3QgZG8gdGhhdFxuICAgICAgICAvLyB3aGVuIGl0IHdhcyBzZXQgKHdlIGNhbnQgY2F1c2Ugd2UncmUgbm90IGluaXQpXG4gICAgICAgIC8vIG90aGVyd2lzZSBqdXN0IHNldHVwIHRoZSBwYXJlbnQuXG4gICAgICAgIGlmICh0aGlzLl9kZXRhaWxSb3cpIHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZVRhYmxlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zZXR1cERldGFpbFJvd1BhcmVudCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIGFkZERldGFpbFJvdyhkZXRhaWxSb3c6IFBibE5ncmlkRGV0YWlsUm93Q29tcG9uZW50KTogdm9pZCB7XG4gICAgdGhpcy5fZGV0YWlsUm93Um93cy5hZGQoZGV0YWlsUm93KTtcbiAgfVxuXG4gIHJlbW92ZURldGFpbFJvdyhkZXRhaWxSb3c6IFBibE5ncmlkRGV0YWlsUm93Q29tcG9uZW50KTogdm9pZCB7XG4gICAgdGhpcy5fZGV0YWlsUm93Um93cy5kZWxldGUoZGV0YWlsUm93KTtcbiAgfVxuXG4gIHRvZ2dsZURldGFpbFJvdyhyb3c6IGFueSwgZm9yY2VTdGF0ZT86IGJvb2xlYW4pOiBib29sZWFuIHwgdm9pZCB7XG4gICAgZm9yIChjb25zdCBkZXRhaWxSb3cgb2YgdGhpcy5fZGV0YWlsUm93Um93cykge1xuICAgICAgaWYgKGRldGFpbFJvdy5jb250ZXh0LiRpbXBsaWNpdCA9PT0gcm93KSB7XG4gICAgICAgIGRldGFpbFJvdy50b2dnbGUoZm9yY2VTdGF0ZSk7XG4gICAgICAgIHJldHVybiBkZXRhaWxSb3cuZXhwZW5kZWQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbWFya0ZvckNoZWNrKCkge1xuICAgIGlmICghdGhpcy5fY2RQZW5kaW5nKSB7XG4gICAgICB0aGlzLl9jZFBlbmRpbmcgPSB0cnVlO1xuICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4gUHJvbWlzZS5yZXNvbHZlKClcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9jZFBlbmRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuX2RlZmF1bHRQYXJlbnRSZWY/LmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2RlZmF1bHRQYXJlbnRSZWYpIHtcbiAgICAgIHRoaXMuX2RlZmF1bHRQYXJlbnRSZWYuZGVzdHJveSgpO1xuICAgIH1cbiAgICB0aGlzLl9yZW1vdmVQbHVnaW4odGhpcy5ncmlkKTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgZGV0YWlsUm93VG9nZ2xlZChldmVudDogUGJsRGV0YWlsc1Jvd1RvZ2dsZUV2ZW50PFQ+KTogdm9pZCB7XG4gICAgLy8gbG9naWMgZm9yIGNsb3NpbmcgcHJldmlvdXMgcm93XG4gICAgY29uc3QgaXNTZWxmID0gdGhpcy5fb3BlbmVkUm93ICYmIHRoaXMuX29wZW5lZFJvdy5yb3cgPT09IGV2ZW50LnJvdztcbiAgICBpZiAoZXZlbnQuZXhwZW5kZWQpIHtcbiAgICAgIGlmICh0aGlzLl9mb3JjZVNpbmdsZSAmJiB0aGlzLl9vcGVuZWRSb3cgJiYgdGhpcy5fb3BlbmVkUm93LmV4cGVuZGVkICYmICFpc1NlbGYpIHtcbiAgICAgICAgdGhpcy5fb3BlbmVkUm93LnRvZ2dsZSgpO1xuICAgICAgfVxuICAgICAgdGhpcy5fb3BlbmVkUm93ID0gZXZlbnQ7XG4gICAgfSBlbHNlIGlmIChpc1NlbGYpIHtcbiAgICAgIHRoaXMuX29wZW5lZFJvdyA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgdGhpcy50b2dnbGVDaGFuZ2UuZW1pdChldmVudCk7XG4gIH1cblxuICBwcml2YXRlIHNldHVwRGV0YWlsUm93UGFyZW50KCk6IHZvaWQge1xuICAgIGNvbnN0IGdyaWQgPSB0aGlzLmdyaWQ7XG4gICAgY29uc3QgY2RrVGFibGUgPSB0aGlzLnBsdWdpbkN0cmwuZXh0QXBpLmNka1RhYmxlO1xuICAgIGlmICh0aGlzLl9kZXRhaWxSb3dEZWYpIHtcbiAgICAgIGNka1RhYmxlLnJlbW92ZVJvd0RlZih0aGlzLl9kZXRhaWxSb3dEZWYpO1xuICAgICAgdGhpcy5fZGV0YWlsUm93RGVmID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBpZiAodGhpcy5kZXRhaWxSb3cpIHtcbiAgICAgIGxldCBkZXRhaWxSb3cgPSB0aGlzLnBsdWdpbkN0cmwuZXh0QXBpLnJlZ2lzdHJ5LmdldFNpbmdsZSgnZGV0YWlsUm93UGFyZW50Jyk7XG4gICAgICBpZiAoZGV0YWlsUm93KSB7XG4gICAgICAgIHRoaXMuX2RldGFpbFJvd0RlZiA9IGRldGFpbFJvdyA9IGRldGFpbFJvdy5jbG9uZSgpO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZGV0YWlsUm93LCAnd2hlbicsIHsgZW51bWVyYWJsZTogdHJ1ZSwgIGdldDogKCkgPT4gdGhpcy5faXNEZXRhaWxSb3cgfSk7XG4gICAgICB9IGVsc2UgaWYgKCF0aGlzLl9kZWZhdWx0UGFyZW50UmVmKSB7XG4gICAgICAgIC8vIFdlIGRvbid0IGhhdmUgYSB0ZW1wbGF0ZSBpbiB0aGUgcmVnaXN0cnksIHNvIHdlIHJlZ2lzdGVyIHRoZSBkZWZhdWx0IGNvbXBvbmVudCB3aGljaCB3aWxsIHB1c2ggYSBuZXcgdGVtcGxhdGUgdG8gdGhlIHJlZ2lzdHJ5XG4gICAgICAgIC8vIFRPRE86IG1vdmUgdG8gbW9kdWxlPyBzZXQgaW4gcm9vdCByZWdpc3RyeT8gcHV0IGVsc2V3aGVyZSB0byBhdm9pZCBncmlkIHN5bmMgKHNlZSBldmVudCBvZiByZWdpc3RyeSBjaGFuZ2UpLi4uXG4gICAgICAgIHRoaXMuX2RlZmF1bHRQYXJlbnRSZWYgPSB0aGlzLmluamVjdG9yLmdldChDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpXG4gICAgICAgICAgLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFBibE5ncmlkRGVmYXVsdERldGFpbFJvd1BhcmVudENvbXBvbmVudClcbiAgICAgICAgICAuY3JlYXRlKHRoaXMuaW5qZWN0b3IpO1xuICAgICAgICB0aGlzLl9kZWZhdWx0UGFyZW50UmVmLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTsgLy8ga2ljayBpdCBmb3IgaW1tZWRpYXRlIGVtaXNzaW9uIG9mIHRoZSByZWdpc3RyeSB2YWx1ZVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMucmVzZXRUYWJsZVJvd0RlZnMoKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRUYWJsZVJvd0RlZnMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2RldGFpbFJvd0RlZikge1xuICAgICAgdGhpcy5fZGV0YWlsUm93ID09PSBmYWxzZVxuICAgICAgICA/IHRoaXMucGx1Z2luQ3RybC5leHRBcGkuY2RrVGFibGUucmVtb3ZlUm93RGVmKHRoaXMuX2RldGFpbFJvd0RlZilcbiAgICAgICAgOiB0aGlzLnBsdWdpbkN0cmwuZXh0QXBpLmNka1RhYmxlLmFkZFJvd0RlZih0aGlzLl9kZXRhaWxSb3dEZWYpXG4gICAgICA7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgZ3JpZCB3aXRoIGRldGFpbCByb3cgaW5mby5cbiAgICogSW5zdGVhZCBvZiBjYWxsaW5nIGZvciBhIGNoYW5nZSBkZXRlY3Rpb24gY3ljbGUgd2UgY2FuIGFzc2lnbiB0aGUgbmV3IHByZWRpY2F0ZXMgZGlyZWN0bHkgdG8gdGhlIHBibE5ncmlkUm93RGVmIGluc3RhbmNlcy5cbiAgICovXG4gIHByaXZhdGUgdXBkYXRlVGFibGUoKTogdm9pZCB7XG4gICAgdGhpcy5ncmlkLl90YWJsZVJvd0RlZi53aGVuID0gdGhpcy5faXNTaW1wbGVSb3c7XG4gICAgdGhpcy5zZXR1cERldGFpbFJvd1BhcmVudCgpO1xuICAgIC8vIE9uY2Ugd2UgY2hhbmdlZCB0aGUgYHdoZW5gIHByZWRpY2F0ZSBvbiB0aGUgYENka1Jvd0RlZmAgd2UgbXVzdDpcbiAgICAvLyAgIDEuIFVwZGF0ZSB0aGUgcm93IGNhY2hlIChwcm9wZXJ0eSBgcm93RGVmc2ApIHRvIHJlZmxlY3QgdGhlIG5ldyBjaGFuZ2VcbiAgICB0aGlzLnBsdWdpbkN0cmwuZXh0QXBpLmNka1RhYmxlLnVwZGF0ZVJvd0RlZkNhY2hlKCk7XG5cbiAgICAvLyAgIDIuIHJlLXJlbmRlciBhbGwgcm93cy5cbiAgICAvLyBUaGUgbG9naWMgZm9yIHJlLXJlbmRlcmluZyBhbGwgcm93cyBpcyBoYW5kbGVkIGluIGBDZGtUYWJsZS5fZm9yY2VSZW5kZXJEYXRhUm93cygpYCB3aGljaCBpcyBhIHByaXZhdGUgbWV0aG9kLlxuICAgIC8vIFRoaXMgaXMgYSB3b3JrYXJvdW5kLCBhc3NpZ25pbmcgdG8gYG11bHRpVGVtcGxhdGVEYXRhUm93c2Agd2lsbCBpbnZva2UgdGhlIHNldHRlciB3aGljaFxuICAgIC8vIGFsc28gY2FsbHMgYENka1RhYmxlLl9mb3JjZVJlbmRlckRhdGFSb3dzKClgXG4gICAgLy8gVE9ETzogVGhpcyBpcyByaXNreSwgdGhlIHNldHRlciBsb2dpYyBtaWdodCBjaGFuZ2UuXG4gICAgLy8gZm9yIGV4YW1wbGUsIGlmIG1hdGVyaWFsIHdpbGwgY2hhY2sgZm9yIGNoYW5nZSBpbiBgbXVsdGlUZW1wbGF0ZURhdGFSb3dzYCBzZXR0ZXIgZnJvbSBwcmV2aW91cyB2YWx1ZS4uLlxuICAgIHRoaXMucGx1Z2luQ3RybC5leHRBcGkuY2RrVGFibGUubXVsdGlUZW1wbGF0ZURhdGFSb3dzID0gISF0aGlzLl9kZXRhaWxSb3c7XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGV0YWlsUm93OiBCb29sZWFuSW5wdXQgfCAoIChpbmRleDogbnVtYmVyLCByb3dEYXRhOiBhbnkpID0+IGJvb2xlYW4gKTtcbn1cblxuLyoqXG4gKiBVc2UgdG8gc2V0IHRoZSBhIGRlZmF1bHQgYHBibE5ncmlkRGV0YWlsUm93UGFyZW50UmVmYCBpZiB0aGUgdXNlciBkaWQgbm90IHNldCBvbmUuXG4gKiBAaW50ZXJuYWxcbiAqL1xuIEBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3BibC1uZ3JpZC1kZWZhdWx0LWRldGFpbC1yb3ctcGFyZW50JyxcbiAgdGVtcGxhdGU6IGA8cGJsLW5ncmlkLXJvdyAqcGJsTmdyaWREZXRhaWxSb3dQYXJlbnRSZWY9XCJsZXQgcm93O1wiIGRldGFpbFJvdz48L3BibC1uZ3JpZC1yb3c+YCxcbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWREZWZhdWx0RGV0YWlsUm93UGFyZW50Q29tcG9uZW50IHsgfVxuIl19