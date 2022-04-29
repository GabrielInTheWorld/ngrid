import { fromEvent, timer, ReplaySubject } from 'rxjs';
import { bufferWhen, debounce, map, filter, takeUntil } from 'rxjs/operators';
import { Directive, EventEmitter, Injector } from '@angular/core';
import { PblNgridComponent, PblNgridPluginController, PblColumn } from '@pebula/ngrid';
import { matrixRowFromRow, isRowContainer, findCellRenderIndex, findParentCell } from './utils';
import { handleFocusAndSelection } from './focus-and-selection';
import * as i0 from "@angular/core";
import * as i1 from "@pebula/ngrid";
export const PLUGIN_KEY = 'targetEvents';
function hasListeners(source) {
    return source.observers.length > 0;
}
function findEventSource(source) {
    const cellTarget = findParentCell(source.target);
    if (cellTarget) {
        return { type: 'cell', target: cellTarget };
    }
    else if (isRowContainer(source.target)) {
        return { type: 'cell', target: source.target };
    }
}
export function runOnce() {
    PblColumn.extendProperty('editable');
}
export class PblNgridTargetEventsPlugin {
    constructor(grid, injector, pluginCtrl) {
        this.grid = grid;
        this.injector = injector;
        this.pluginCtrl = pluginCtrl;
        this.rowClick = new EventEmitter();
        this.rowDblClick = new EventEmitter();
        this.rowEnter = new EventEmitter();
        this.rowLeave = new EventEmitter();
        this.cellClick = new EventEmitter();
        this.cellDblClick = new EventEmitter();
        this.cellEnter = new EventEmitter();
        this.cellLeave = new EventEmitter();
        this.mouseDown = new EventEmitter();
        this.mouseUp = new EventEmitter();
        this.keyUp = new EventEmitter();
        this.keyDown = new EventEmitter();
        this.destroyed = new ReplaySubject();
        this._removePlugin = pluginCtrl.setPlugin(PLUGIN_KEY, this);
        pluginCtrl.onInit().subscribe(() => this.init());
    }
    static create(table, injector) {
        const pluginCtrl = PblNgridPluginController.find(table);
        return new PblNgridTargetEventsPlugin(table, injector, pluginCtrl);
    }
    init() {
        this.setupDomEvents();
        handleFocusAndSelection(this);
    }
    setupDomEvents() {
        const grid = this.grid;
        const cdkTable = this.pluginCtrl.extApi.cdkTable;
        const cdkTableElement = cdkTable._element;
        const createCellEvent = (cellTarget, source) => {
            const rowTarget = cellTarget.parentElement;
            const matrixPoint = matrixRowFromRow(rowTarget, cdkTable._rowOutlet.viewContainer);
            if (matrixPoint) {
                const event = Object.assign(Object.assign({}, matrixPoint), { source, cellTarget, rowTarget });
                if (matrixPoint.type === 'data') {
                    event.row = grid.ds.renderedData[matrixPoint.rowIndex];
                }
                else if (event.subType === 'meta') {
                    // When multiple containers exists (fixed/sticky/row) the rowIndex we get is the one relative to the container..
                    // We need to find the rowIndex relative to the definitions:
                    const { metaRowService } = this.pluginCtrl.extApi.rowsApi;
                    const db = event.type === 'header' ? metaRowService.header : metaRowService.footer;
                    for (const coll of [db.fixed, db.row, db.sticky]) {
                        const result = coll.find(item => item.el === event.rowTarget);
                        if (result) {
                            event.rowIndex = result.index;
                            break;
                        }
                    }
                }
                /* `metadataFromElement()` does not provide column information nor the column itself. This will extend functionality to add the columnIndex and column.
                    The simple case is when `subType === 'data'`, in this case the column is always the data column for all types (header, data and footer)
        
                    If `subType !== 'data'` we need to get the proper column based type (type can only be `header` or `footer` at this point).
                    But that's not all, because `metadataFromElement()` does not handle `meta-group` subType we need to do it here...
                */
                event.colIndex = findCellRenderIndex(cellTarget);
                if (matrixPoint.subType === 'data') {
                    const column = this.grid.columnApi.findColumnAt(event.colIndex);
                    const columnIndex = this.grid.columnApi.indexOf(column);
                    event.column = column;
                    event.context = this.pluginCtrl.extApi.contextApi.getCell(event.rowIndex, columnIndex);
                    if (!event.context) {
                        this.pluginCtrl.extApi.contextApi.clear(true);
                        event.context = this.pluginCtrl.extApi.contextApi.getCell(event.rowIndex, columnIndex);
                    }
                }
                else {
                    const store = this.pluginCtrl.extApi.columnStore;
                    const rowInfo = (matrixPoint.type === 'header' ? store.metaHeaderRows : store.metaFooterRows)[event.rowIndex];
                    const record = store.find(rowInfo.keys[event.colIndex]);
                    if (rowInfo.isGroup) {
                        event.subType = 'meta-group';
                        event.column = matrixPoint.type === 'header' ? record.headerGroup : record.footerGroup;
                    }
                    else {
                        event.column = matrixPoint.type === 'header' ? record.header : record.footer;
                    }
                }
                return event;
            }
        };
        const createRowEvent = (rowTarget, source, root) => {
            if (root) {
                const event = {
                    source,
                    rowTarget,
                    type: root.type,
                    subType: root.subType,
                    rowIndex: root.rowIndex,
                    root
                };
                if (root.type === 'data') {
                    event.row = root.row;
                    event.context = root.context.rowContext;
                }
                return event;
            }
            else {
                const matrixPoint = matrixRowFromRow(rowTarget, cdkTable._rowOutlet.viewContainer);
                if (matrixPoint) {
                    const event = Object.assign(Object.assign({}, matrixPoint), { source, rowTarget });
                    if (matrixPoint.type === 'data') {
                        event.context = this.pluginCtrl.extApi.contextApi.getRow(matrixPoint.rowIndex);
                        event.row = event.context.$implicit;
                    }
                    /*  If `subType !== 'data'` it can only be `meta` because `metadataFromElement()` does not handle `meta-group` subType.
                        We need to extend this missing part, we don't have columns here so we will try to infer it using the first column.
          
                        It's similar to how it's handled in cell clicks, but here we don't need to extends the column info.
                        We only need to change the `subType` when the row is a group row, getting a specific column is irrelevant.
                        We just need A column because group columns don't mix with regular meta columns.
          
                        NOTE: When subType is not 'data' the ype can only be `header` or `footer`.
                    */
                    if (matrixPoint.subType !== 'data') {
                        const store = this.pluginCtrl.extApi.columnStore;
                        const rowInfo = (matrixPoint.type === 'header' ? store.metaHeaderRows : store.metaFooterRows)[event.rowIndex];
                        if (rowInfo.isGroup) {
                            event.subType = 'meta-group';
                        }
                    }
                    return event;
                }
            }
        };
        let lastCellEnterEvent;
        let lastRowEnterEvent;
        const emitCellLeave = (source) => {
            if (lastCellEnterEvent) {
                const lastCellEnterEventTemp = lastCellEnterEvent;
                this.cellLeave.emit(Object.assign({}, lastCellEnterEventTemp, { source }));
                lastCellEnterEvent = undefined;
                return lastCellEnterEventTemp;
            }
        };
        const emitRowLeave = (source) => {
            if (lastRowEnterEvent) {
                const lastRowEnterEventTemp = lastRowEnterEvent;
                this.rowLeave.emit(Object.assign({}, lastRowEnterEventTemp, { source }));
                lastRowEnterEvent = undefined;
                return lastRowEnterEventTemp;
            }
        };
        const processEvent = (e) => {
            const result = findEventSource(e);
            if (result) {
                if (result.type === 'cell') {
                    const event = createCellEvent(result.target, e);
                    if (event) {
                        return {
                            type: result.type,
                            event,
                            waitTime: hasListeners(this.cellDblClick) ? 250 : 1,
                        };
                    }
                }
                else if (result.type === 'row') {
                    const event = createRowEvent(result.target, e);
                    if (event) {
                        return {
                            type: result.type,
                            event,
                            waitTime: hasListeners(this.rowDblClick) ? 250 : 1,
                        };
                    }
                }
            }
        };
        /** Split the result of processEvent into cell and row events, if type is row only row event is returned, if cell then cell is returned and row is created along side. */
        const splitProcessedEvent = (event) => {
            const cellEvent = event.type === 'cell' ? event.event : undefined;
            const rowEvent = cellEvent
                ? createRowEvent(cellEvent.rowTarget, cellEvent.source, cellEvent)
                : event.event;
            return { cellEvent, rowEvent };
        };
        const registerUpDownEvents = (eventName, emitter) => {
            fromEvent(cdkTableElement, eventName)
                .pipe(takeUntil(this.destroyed), filter(source => hasListeners(emitter)), map(processEvent), filter(result => !!result))
                .subscribe(result => {
                const { cellEvent, rowEvent } = splitProcessedEvent(result);
                emitter.emit(cellEvent || rowEvent);
                this.syncRow(cellEvent || rowEvent);
            });
        };
        registerUpDownEvents('mouseup', this.mouseUp);
        registerUpDownEvents('mousedown', this.mouseDown);
        registerUpDownEvents('keyup', this.keyUp);
        registerUpDownEvents('keydown', this.keyDown);
        /*
          Handling click stream for both click and double click events.
          We want to detect double clicks and clicks with minimal delays
          We check if a double click has listeners, if not we won't delay the click...
          TODO: on double click, don't wait the whole 250 ms if 2 clicks happen.
        */
        const clickStream = fromEvent(cdkTableElement, 'click').pipe(takeUntil(this.destroyed), filter(source => hasListeners(this.cellClick) || hasListeners(this.cellDblClick) || hasListeners(this.rowClick) || hasListeners(this.rowDblClick)), map(processEvent), filter(result => !!result));
        clickStream
            .pipe(bufferWhen(() => clickStream.pipe(debounce(e => timer(e.waitTime)))), filter(events => events.length > 0))
            .subscribe(events => {
            const event = events.shift();
            const isDoubleClick = events.length === 1; // if we have 2 events its double click, otherwise single.
            const { cellEvent, rowEvent } = splitProcessedEvent(event);
            if (isDoubleClick) {
                if (cellEvent) {
                    this.cellDblClick.emit(cellEvent);
                }
                this.rowDblClick.emit(rowEvent);
            }
            else {
                if (cellEvent) {
                    this.cellClick.emit(cellEvent);
                }
                this.rowClick.emit(rowEvent);
            }
            this.syncRow(cellEvent || rowEvent);
        });
        fromEvent(cdkTableElement, 'mouseleave')
            .pipe(takeUntil(this.destroyed))
            .subscribe((source) => {
            let lastEvent = emitCellLeave(source);
            lastEvent = emitRowLeave(source) || lastEvent;
            if (lastEvent) {
                this.syncRow(lastEvent);
            }
        });
        fromEvent(cdkTableElement, 'mousemove')
            .pipe(takeUntil(this.destroyed))
            .subscribe((source) => {
            const cellTarget = findParentCell(source.target);
            const lastCellTarget = lastCellEnterEvent && lastCellEnterEvent.cellTarget;
            const lastRowTarget = lastRowEnterEvent && lastRowEnterEvent.rowTarget;
            let cellEvent;
            let lastEvent;
            if (lastCellTarget !== cellTarget) {
                lastEvent = emitCellLeave(source) || lastEvent;
            }
            if (cellTarget) {
                if (lastCellTarget !== cellTarget) {
                    cellEvent = createCellEvent(cellTarget, source);
                    if (cellEvent) {
                        this.cellEnter.emit(lastCellEnterEvent = cellEvent);
                    }
                }
                else {
                    return;
                }
            }
            const rowTarget = (cellEvent && cellEvent.rowTarget) || (isRowContainer(source.target) && source.target);
            if (lastRowTarget !== rowTarget) {
                lastEvent = emitRowLeave(source) || lastEvent;
            }
            if (rowTarget) {
                if (lastRowTarget !== rowTarget) {
                    const rowEvent = createRowEvent(rowTarget, source, cellEvent);
                    if (rowEvent) {
                        this.rowEnter.emit(lastRowEnterEvent = rowEvent);
                    }
                }
            }
            if (lastEvent) {
                this.syncRow(lastEvent);
            }
        });
    }
    destroy() {
        this.destroyed.next();
        this.destroyed.complete();
        this._removePlugin(this.grid);
    }
    syncRow(event) {
        this.grid.rowsApi.syncRows(event.type, event.rowIndex);
    }
}
export class PblNgridTargetEventsPluginDirective extends PblNgridTargetEventsPlugin {
    constructor(table, injector, pluginCtrl) {
        super(table, injector, pluginCtrl);
    }
    ngOnDestroy() {
        this.destroy();
    }
}
/** @nocollapse */ PblNgridTargetEventsPluginDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridTargetEventsPluginDirective, deps: [{ token: i1.PblNgridComponent }, { token: i0.Injector }, { token: i1.PblNgridPluginController }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ PblNgridTargetEventsPluginDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridTargetEventsPluginDirective, selector: "pbl-ngrid[targetEvents], pbl-ngrid[rowClick], pbl-ngrid[rowDblClick], pbl-ngrid[rowEnter], pbl-ngrid[rowLeave], pbl-ngrid[cellClick], pbl-ngrid[cellDblClick], pbl-ngrid[cellEnter], pbl-ngrid[cellLeave], pbl-ngrid[keyDown], pbl-ngrid[keyUp]", outputs: { rowClick: "rowClick", rowDblClick: "rowDblClick", rowEnter: "rowEnter", rowLeave: "rowLeave", cellClick: "cellClick", cellDblClick: "cellDblClick", cellEnter: "cellEnter", cellLeave: "cellLeave", keyDown: "keyDown", keyUp: "keyUp" }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridTargetEventsPluginDirective, decorators: [{
            type: Directive,
            args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: 'pbl-ngrid[targetEvents], pbl-ngrid[rowClick], pbl-ngrid[rowDblClick], pbl-ngrid[rowEnter], pbl-ngrid[rowLeave], pbl-ngrid[cellClick], pbl-ngrid[cellDblClick], pbl-ngrid[cellEnter], pbl-ngrid[cellLeave], pbl-ngrid[keyDown], pbl-ngrid[keyUp]',
                    // tslint:disable-next-line:use-output-property-decorator
                    outputs: ['rowClick', 'rowDblClick', 'rowEnter', 'rowLeave', 'cellClick', 'cellDblClick', 'cellEnter', 'cellLeave', 'keyDown', 'keyUp']
                }]
        }], ctorParameters: function () { return [{ type: i1.PblNgridComponent }, { type: i0.Injector }, { type: i1.PblNgridPluginController }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFyZ2V0LWV2ZW50cy1wbHVnaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25ncmlkL3RhcmdldC1ldmVudHMvc3JjL2xpYi90YXJnZXQtZXZlbnRzL3RhcmdldC1ldmVudHMtcGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFZLGFBQWEsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNqRSxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlFLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFhLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU3RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsd0JBQXdCLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR3ZGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLEVBQUUsbUJBQW1CLEVBQUUsY0FBYyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ2hHLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDOzs7QUFvQmhFLE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBbUIsY0FBYyxDQUFDO0FBRXpELFNBQVMsWUFBWSxDQUFDLE1BQXNDO0lBQzFELE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBQ3JDLENBQUM7QUFFRCxTQUFTLGVBQWUsQ0FBQyxNQUFhO0lBQ3BDLE1BQU0sVUFBVSxHQUFHLGNBQWMsQ0FBQyxNQUFNLENBQUMsTUFBYSxDQUFDLENBQUM7SUFDeEQsSUFBSSxVQUFVLEVBQUU7UUFDZCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLENBQUM7S0FDN0M7U0FBTSxJQUFJLGNBQWMsQ0FB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LEVBQUU7Z0JBQ2IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUN6QjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELE9BQU87UUFDTCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVPLE9BQU8sQ0FBdUIsS0FBdUU7UUFDM0csSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3pELENBQUM7Q0FDRjtBQVFELE1BQU0sT0FBTyxtQ0FBdUMsU0FBUSwwQkFBNkI7SUFFdkYsWUFBWSxLQUE2QixFQUFFLFFBQWtCLEVBQUUsVUFBb0M7UUFDakcsS0FBSyxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDakIsQ0FBQzs7bUpBUlUsbUNBQW1DO3VJQUFuQyxtQ0FBbUM7MkZBQW5DLG1DQUFtQztrQkFOL0MsU0FBUzttQkFBQztvQkFDVCw4Q0FBOEM7b0JBQzlDLFFBQVEsRUFBRSxpUEFBaVA7b0JBQzNQLHlEQUF5RDtvQkFDekQsT0FBTyxFQUFFLENBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxjQUFjLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFFO2lCQUMxSSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZyb21FdmVudCwgdGltZXIsIE9ic2VydmVyLCBSZXBsYXlTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBidWZmZXJXaGVuLCBkZWJvdW5jZSwgbWFwLCBmaWx0ZXIsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBPbkRlc3Ryb3ksIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50LCBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsIFBibENvbHVtbiB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuXG5pbXBvcnQgKiBhcyBFdmVudHMgZnJvbSAnLi9ldmVudHMnO1xuaW1wb3J0IHsgbWF0cml4Um93RnJvbVJvdywgaXNSb3dDb250YWluZXIsIGZpbmRDZWxsUmVuZGVySW5kZXgsIGZpbmRQYXJlbnRDZWxsIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyBoYW5kbGVGb2N1c0FuZFNlbGVjdGlvbiB9IGZyb20gJy4vZm9jdXMtYW5kLXNlbGVjdGlvbic7XG5cbmRlY2xhcmUgbW9kdWxlICdAcGVidWxhL25ncmlkL2NvcmUvbGliL2NvbmZpZ3VyYXRpb24vdHlwZScge1xuICBpbnRlcmZhY2UgUGJsTmdyaWRDb25maWcge1xuICAgIHRhcmdldEV2ZW50cz86IHtcbiAgICAgIC8qKiBXaGVuIHNldCB0byB0cnVlIHdpbGwgZW5hYmxlIHRoZSB0YXJnZXQgZXZlbnRzIHBsdWdpbiBvbiBhbGwgdGFibGUgaW5zdGFuY2VzIGJ5IGRlZmF1bHQuICovXG4gICAgICBhdXRvRW5hYmxlPzogYm9vbGVhbjtcbiAgICB9O1xuICB9XG59XG5cbmRlY2xhcmUgbW9kdWxlICdAcGVidWxhL25ncmlkL2xpYi9leHQvdHlwZXMnIHtcbiAgaW50ZXJmYWNlIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uIHtcbiAgICB0YXJnZXRFdmVudHM/OiBQYmxOZ3JpZFRhcmdldEV2ZW50c1BsdWdpbjtcbiAgfVxuICBpbnRlcmZhY2UgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb25GYWN0b3JpZXMge1xuICAgIHRhcmdldEV2ZW50czoga2V5b2YgdHlwZW9mIFBibE5ncmlkVGFyZ2V0RXZlbnRzUGx1Z2luO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBQTFVHSU5fS0VZOiAndGFyZ2V0RXZlbnRzJyA9ICd0YXJnZXRFdmVudHMnO1xuXG5mdW5jdGlvbiBoYXNMaXN0ZW5lcnMoc291cmNlOiB7IG9ic2VydmVyczogT2JzZXJ2ZXI8YW55PltdIH0pOiBib29sZWFuIHtcbiAgcmV0dXJuIHNvdXJjZS5vYnNlcnZlcnMubGVuZ3RoID4gMDtcbn1cblxuZnVuY3Rpb24gZmluZEV2ZW50U291cmNlKHNvdXJjZTogRXZlbnQpOiB7IHR5cGU6ICdyb3cnIHwgJ2NlbGwnLCB0YXJnZXQ6IEhUTUxFbGVtZW50IH0gfCB1bmRlZmluZWQge1xuICBjb25zdCBjZWxsVGFyZ2V0ID0gZmluZFBhcmVudENlbGwoc291cmNlLnRhcmdldCBhcyBhbnkpO1xuICBpZiAoY2VsbFRhcmdldCkge1xuICAgIHJldHVybiB7IHR5cGU6ICdjZWxsJywgdGFyZ2V0OiBjZWxsVGFyZ2V0IH07XG4gIH0gZWxzZSBpZiAoaXNSb3dDb250YWluZXIoc291cmNlLnRhcmdldCBhcyBhbnkpKSB7XG4gICAgcmV0dXJuIHsgdHlwZTogJ2NlbGwnLCB0YXJnZXQ6IHNvdXJjZS50YXJnZXQgYXMgYW55IH07XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJ1bk9uY2UoKTogdm9pZCB7XG4gIFBibENvbHVtbi5leHRlbmRQcm9wZXJ0eSgnZWRpdGFibGUnKTtcbn1cblxuZXhwb3J0IGNsYXNzIFBibE5ncmlkVGFyZ2V0RXZlbnRzUGx1Z2luPFQgPSBhbnk+IHtcbiAgcm93Q2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50cy5QYmxOZ3JpZFJvd0V2ZW50PFQ+PigpO1xuICByb3dEYmxDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzLlBibE5ncmlkUm93RXZlbnQ8VD4+KCk7XG4gIHJvd0VudGVyID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudHMuUGJsTmdyaWRSb3dFdmVudDxUPj4oKTtcbiAgcm93TGVhdmUgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50cy5QYmxOZ3JpZFJvd0V2ZW50PFQ+PigpO1xuXG4gIGNlbGxDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzLlBibE5ncmlkQ2VsbEV2ZW50PFQsIE1vdXNlRXZlbnQ+PigpO1xuICBjZWxsRGJsQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50cy5QYmxOZ3JpZENlbGxFdmVudDxULCBNb3VzZUV2ZW50Pj4oKTtcbiAgY2VsbEVudGVyID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudHMuUGJsTmdyaWRDZWxsRXZlbnQ8VCwgTW91c2VFdmVudD4+KCk7XG4gIGNlbGxMZWF2ZSA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzLlBibE5ncmlkQ2VsbEV2ZW50PFQsIE1vdXNlRXZlbnQ+PigpO1xuXG4gIG1vdXNlRG93biA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzLlBibE5ncmlkQ2VsbEV2ZW50PFQsIE1vdXNlRXZlbnQ+IHwgRXZlbnRzLlBibE5ncmlkUm93RXZlbnQ8VD4+KCk7XG4gIG1vdXNlVXAgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50cy5QYmxOZ3JpZENlbGxFdmVudDxULCBNb3VzZUV2ZW50PiB8IEV2ZW50cy5QYmxOZ3JpZFJvd0V2ZW50PFQ+PigpO1xuICBrZXlVcCA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzLlBibE5ncmlkQ2VsbEV2ZW50PFQsIEtleWJvYXJkRXZlbnQ+IHwgRXZlbnRzLlBibE5ncmlkUm93RXZlbnQ8VD4+KCk7XG4gIGtleURvd24gPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50cy5QYmxOZ3JpZENlbGxFdmVudDxULCBLZXlib2FyZEV2ZW50PiB8IEV2ZW50cy5QYmxOZ3JpZFJvd0V2ZW50PFQ+PigpO1xuXG4gIHByb3RlY3RlZCByZWFkb25seSBkZXN0cm95ZWQgPSBuZXcgUmVwbGF5U3ViamVjdDx2b2lkPigpO1xuXG4gIHByaXZhdGUgX3JlbW92ZVBsdWdpbjogKHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+KSA9PiB2b2lkO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LFxuICAgICAgICAgICAgICBwcm90ZWN0ZWQgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgICAgICAgICAgICBwcm90ZWN0ZWQgcGx1Z2luQ3RybDogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyKSB7XG4gICAgdGhpcy5fcmVtb3ZlUGx1Z2luID0gcGx1Z2luQ3RybC5zZXRQbHVnaW4oUExVR0lOX0tFWSwgdGhpcyk7XG4gICAgcGx1Z2luQ3RybC5vbkluaXQoKS5zdWJzY3JpYmUoICgpID0+IHRoaXMuaW5pdCgpICk7XG4gIH1cblxuICBzdGF0aWMgY3JlYXRlPFQgPSBhbnk+KHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCBpbmplY3RvcjogSW5qZWN0b3IpOiBQYmxOZ3JpZFRhcmdldEV2ZW50c1BsdWdpbjxUPiB7XG4gICAgY29uc3QgcGx1Z2luQ3RybCA9IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlci5maW5kKHRhYmxlKTtcbiAgICByZXR1cm4gbmV3IFBibE5ncmlkVGFyZ2V0RXZlbnRzUGx1Z2luPFQ+KHRhYmxlLCBpbmplY3RvciwgcGx1Z2luQ3RybCk7XG4gIH1cblxuICBwcml2YXRlIGluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zZXR1cERvbUV2ZW50cygpO1xuICAgIGhhbmRsZUZvY3VzQW5kU2VsZWN0aW9uKHRoaXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXR1cERvbUV2ZW50cygpOiB2b2lkIHtcbiAgICBjb25zdCBncmlkID0gdGhpcy5ncmlkO1xuICAgIGNvbnN0IGNka1RhYmxlID0gdGhpcy5wbHVnaW5DdHJsLmV4dEFwaS5jZGtUYWJsZTtcbiAgICBjb25zdCBjZGtUYWJsZUVsZW1lbnQgPSBjZGtUYWJsZS5fZWxlbWVudDtcblxuICAgIGNvbnN0IGNyZWF0ZUNlbGxFdmVudCA9IDxURXZlbnQgZXh0ZW5kcyBFdmVudD4oY2VsbFRhcmdldDogSFRNTEVsZW1lbnQsIHNvdXJjZTogVEV2ZW50KTogRXZlbnRzLlBibE5ncmlkQ2VsbEV2ZW50PFQsIFRFdmVudD4gfCB1bmRlZmluZWQgPT4ge1xuICAgICAgY29uc3Qgcm93VGFyZ2V0ID0gY2VsbFRhcmdldC5wYXJlbnRFbGVtZW50O1xuICAgICAgY29uc3QgbWF0cml4UG9pbnQgPSBtYXRyaXhSb3dGcm9tUm93KHJvd1RhcmdldCwgY2RrVGFibGUuX3Jvd091dGxldC52aWV3Q29udGFpbmVyKTtcbiAgICAgIGlmIChtYXRyaXhQb2ludCkge1xuICAgICAgICBjb25zdCBldmVudDogRXZlbnRzLlBibE5ncmlkQ2VsbEV2ZW50PFQsIFRFdmVudD4gPSB7IC4uLm1hdHJpeFBvaW50LCBzb3VyY2UsIGNlbGxUYXJnZXQsIHJvd1RhcmdldCB9IGFzIGFueTtcbiAgICAgICAgaWYgKG1hdHJpeFBvaW50LnR5cGUgPT09ICdkYXRhJykge1xuICAgICAgICAgIChldmVudCBhcyBFdmVudHMuUGJsTmdyaWREYXRhTWF0cml4UG9pbnQ8VD4pLnJvdyA9IGdyaWQuZHMucmVuZGVyZWREYXRhW21hdHJpeFBvaW50LnJvd0luZGV4XTtcbiAgICAgICAgfSBlbHNlIGlmIChldmVudC5zdWJUeXBlID09PSAnbWV0YScpIHtcbiAgICAgICAgICAvLyBXaGVuIG11bHRpcGxlIGNvbnRhaW5lcnMgZXhpc3RzIChmaXhlZC9zdGlja3kvcm93KSB0aGUgcm93SW5kZXggd2UgZ2V0IGlzIHRoZSBvbmUgcmVsYXRpdmUgdG8gdGhlIGNvbnRhaW5lci4uXG4gICAgICAgICAgLy8gV2UgbmVlZCB0byBmaW5kIHRoZSByb3dJbmRleCByZWxhdGl2ZSB0byB0aGUgZGVmaW5pdGlvbnM6XG4gICAgICAgICAgY29uc3QgeyBtZXRhUm93U2VydmljZSB9ID0gdGhpcy5wbHVnaW5DdHJsLmV4dEFwaS5yb3dzQXBpO1xuICAgICAgICAgIGNvbnN0IGRiID0gZXZlbnQudHlwZSA9PT0gJ2hlYWRlcicgPyBtZXRhUm93U2VydmljZS5oZWFkZXIgOiBtZXRhUm93U2VydmljZS5mb290ZXI7XG5cbiAgICAgICAgICBmb3IgKGNvbnN0IGNvbGwgb2YgW2RiLmZpeGVkLCBkYi5yb3csIGRiLnN0aWNreV0pIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGNvbGwuZmluZCggaXRlbSA9PiBpdGVtLmVsID09PSBldmVudC5yb3dUYXJnZXQgKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgZXZlbnQucm93SW5kZXggPSByZXN1bHQuaW5kZXg7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qIGBtZXRhZGF0YUZyb21FbGVtZW50KClgIGRvZXMgbm90IHByb3ZpZGUgY29sdW1uIGluZm9ybWF0aW9uIG5vciB0aGUgY29sdW1uIGl0c2VsZi4gVGhpcyB3aWxsIGV4dGVuZCBmdW5jdGlvbmFsaXR5IHRvIGFkZCB0aGUgY29sdW1uSW5kZXggYW5kIGNvbHVtbi5cbiAgICAgICAgICAgIFRoZSBzaW1wbGUgY2FzZSBpcyB3aGVuIGBzdWJUeXBlID09PSAnZGF0YSdgLCBpbiB0aGlzIGNhc2UgdGhlIGNvbHVtbiBpcyBhbHdheXMgdGhlIGRhdGEgY29sdW1uIGZvciBhbGwgdHlwZXMgKGhlYWRlciwgZGF0YSBhbmQgZm9vdGVyKVxuXG4gICAgICAgICAgICBJZiBgc3ViVHlwZSAhPT0gJ2RhdGEnYCB3ZSBuZWVkIHRvIGdldCB0aGUgcHJvcGVyIGNvbHVtbiBiYXNlZCB0eXBlICh0eXBlIGNhbiBvbmx5IGJlIGBoZWFkZXJgIG9yIGBmb290ZXJgIGF0IHRoaXMgcG9pbnQpLlxuICAgICAgICAgICAgQnV0IHRoYXQncyBub3QgYWxsLCBiZWNhdXNlIGBtZXRhZGF0YUZyb21FbGVtZW50KClgIGRvZXMgbm90IGhhbmRsZSBgbWV0YS1ncm91cGAgc3ViVHlwZSB3ZSBuZWVkIHRvIGRvIGl0IGhlcmUuLi5cbiAgICAgICAgKi9cbiAgICAgICAgZXZlbnQuY29sSW5kZXggPSBmaW5kQ2VsbFJlbmRlckluZGV4KGNlbGxUYXJnZXQpO1xuICAgICAgICBpZiAobWF0cml4UG9pbnQuc3ViVHlwZSA9PT0gJ2RhdGEnKSB7XG4gICAgICAgICAgY29uc3QgY29sdW1uID0gdGhpcy5ncmlkLmNvbHVtbkFwaS5maW5kQ29sdW1uQXQoZXZlbnQuY29sSW5kZXgpO1xuICAgICAgICAgIGNvbnN0IGNvbHVtbkluZGV4ID0gdGhpcy5ncmlkLmNvbHVtbkFwaS5pbmRleE9mKGNvbHVtbik7XG4gICAgICAgICAgZXZlbnQuY29sdW1uID0gY29sdW1uO1xuICAgICAgICAgIChldmVudCBhcyBFdmVudHMuUGJsTmdyaWREYXRhTWF0cml4UG9pbnQ8VD4pLmNvbnRleHQgPSB0aGlzLnBsdWdpbkN0cmwuZXh0QXBpLmNvbnRleHRBcGkuZ2V0Q2VsbChldmVudC5yb3dJbmRleCwgY29sdW1uSW5kZXgpO1xuICAgICAgICAgIGlmICghKGV2ZW50IGFzIEV2ZW50cy5QYmxOZ3JpZERhdGFNYXRyaXhQb2ludDxUPikuY29udGV4dCkge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW5DdHJsLmV4dEFwaS5jb250ZXh0QXBpLmNsZWFyKHRydWUpO1xuICAgICAgICAgICAgKGV2ZW50IGFzIEV2ZW50cy5QYmxOZ3JpZERhdGFNYXRyaXhQb2ludDxUPikuY29udGV4dCA9IHRoaXMucGx1Z2luQ3RybC5leHRBcGkuY29udGV4dEFwaS5nZXRDZWxsKGV2ZW50LnJvd0luZGV4LCBjb2x1bW5JbmRleCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHN0b3JlID0gdGhpcy5wbHVnaW5DdHJsLmV4dEFwaS5jb2x1bW5TdG9yZTtcbiAgICAgICAgICBjb25zdCByb3dJbmZvID0gKG1hdHJpeFBvaW50LnR5cGUgPT09ICdoZWFkZXInID8gc3RvcmUubWV0YUhlYWRlclJvd3MgOiBzdG9yZS5tZXRhRm9vdGVyUm93cylbZXZlbnQucm93SW5kZXhdO1xuICAgICAgICAgIGNvbnN0IHJlY29yZCA9IHN0b3JlLmZpbmQocm93SW5mby5rZXlzW2V2ZW50LmNvbEluZGV4XSk7XG4gICAgICAgICAgaWYgKHJvd0luZm8uaXNHcm91cCkge1xuICAgICAgICAgICAgZXZlbnQuc3ViVHlwZSA9ICdtZXRhLWdyb3VwJztcbiAgICAgICAgICAgIGV2ZW50LmNvbHVtbiA9IG1hdHJpeFBvaW50LnR5cGUgPT09ICdoZWFkZXInID8gcmVjb3JkLmhlYWRlckdyb3VwIDogcmVjb3JkLmZvb3Rlckdyb3VwO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBldmVudC5jb2x1bW4gPSBtYXRyaXhQb2ludC50eXBlID09PSAnaGVhZGVyJyA/IHJlY29yZC5oZWFkZXIgOiByZWNvcmQuZm9vdGVyO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZXZlbnQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY3JlYXRlUm93RXZlbnQgPSA8VEV2ZW50IGV4dGVuZHMgRXZlbnQ+KHJvd1RhcmdldDogSFRNTEVsZW1lbnQsIHNvdXJjZTogVEV2ZW50LCByb290PzogRXZlbnRzLlBibE5ncmlkQ2VsbEV2ZW50PFQsIFRFdmVudD4pOiBFdmVudHMuUGJsTmdyaWRSb3dFdmVudDxUPiB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBpZiAocm9vdCkge1xuICAgICAgICBjb25zdCBldmVudDogRXZlbnRzLlBibE5ncmlkUm93RXZlbnQ8VD4gPSB7XG4gICAgICAgICAgc291cmNlLFxuICAgICAgICAgIHJvd1RhcmdldCxcbiAgICAgICAgICB0eXBlOiByb290LnR5cGUsXG4gICAgICAgICAgc3ViVHlwZTogcm9vdC5zdWJUeXBlLFxuICAgICAgICAgIHJvd0luZGV4OiByb290LnJvd0luZGV4LFxuICAgICAgICAgIHJvb3RcbiAgICAgICAgfSBhcyBhbnk7XG4gICAgICAgIGlmIChyb290LnR5cGUgPT09ICdkYXRhJykge1xuICAgICAgICAgIChldmVudCBhcyBFdmVudHMuUGJsTmdyaWREYXRhTWF0cml4Um93PFQ+KS5yb3cgPSByb290LnJvdztcbiAgICAgICAgICAoZXZlbnQgYXMgRXZlbnRzLlBibE5ncmlkRGF0YU1hdHJpeFJvdzxUPikuY29udGV4dCA9IHJvb3QuY29udGV4dC5yb3dDb250ZXh0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBldmVudDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IG1hdHJpeFBvaW50ID0gbWF0cml4Um93RnJvbVJvdyhyb3dUYXJnZXQsIGNka1RhYmxlLl9yb3dPdXRsZXQudmlld0NvbnRhaW5lcik7XG4gICAgICAgIGlmIChtYXRyaXhQb2ludCkge1xuICAgICAgICAgIGNvbnN0IGV2ZW50OiBFdmVudHMuUGJsTmdyaWRSb3dFdmVudDxUPiA9IHsgLi4ubWF0cml4UG9pbnQsIHNvdXJjZSwgcm93VGFyZ2V0IH0gYXMgYW55O1xuICAgICAgICAgIGlmIChtYXRyaXhQb2ludC50eXBlID09PSAnZGF0YScpIHtcbiAgICAgICAgICAgIChldmVudCBhcyBFdmVudHMuUGJsTmdyaWREYXRhTWF0cml4Um93PFQ+KS5jb250ZXh0ID0gdGhpcy5wbHVnaW5DdHJsLmV4dEFwaS5jb250ZXh0QXBpLmdldFJvdyhtYXRyaXhQb2ludC5yb3dJbmRleCk7XG4gICAgICAgICAgICAoZXZlbnQgYXMgRXZlbnRzLlBibE5ncmlkRGF0YU1hdHJpeFJvdzxUPikucm93ID0gKGV2ZW50IGFzIEV2ZW50cy5QYmxOZ3JpZERhdGFNYXRyaXhSb3c8VD4pLmNvbnRleHQuJGltcGxpY2l0O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8qICBJZiBgc3ViVHlwZSAhPT0gJ2RhdGEnYCBpdCBjYW4gb25seSBiZSBgbWV0YWAgYmVjYXVzZSBgbWV0YWRhdGFGcm9tRWxlbWVudCgpYCBkb2VzIG5vdCBoYW5kbGUgYG1ldGEtZ3JvdXBgIHN1YlR5cGUuXG4gICAgICAgICAgICAgIFdlIG5lZWQgdG8gZXh0ZW5kIHRoaXMgbWlzc2luZyBwYXJ0LCB3ZSBkb24ndCBoYXZlIGNvbHVtbnMgaGVyZSBzbyB3ZSB3aWxsIHRyeSB0byBpbmZlciBpdCB1c2luZyB0aGUgZmlyc3QgY29sdW1uLlxuXG4gICAgICAgICAgICAgIEl0J3Mgc2ltaWxhciB0byBob3cgaXQncyBoYW5kbGVkIGluIGNlbGwgY2xpY2tzLCBidXQgaGVyZSB3ZSBkb24ndCBuZWVkIHRvIGV4dGVuZHMgdGhlIGNvbHVtbiBpbmZvLlxuICAgICAgICAgICAgICBXZSBvbmx5IG5lZWQgdG8gY2hhbmdlIHRoZSBgc3ViVHlwZWAgd2hlbiB0aGUgcm93IGlzIGEgZ3JvdXAgcm93LCBnZXR0aW5nIGEgc3BlY2lmaWMgY29sdW1uIGlzIGlycmVsZXZhbnQuXG4gICAgICAgICAgICAgIFdlIGp1c3QgbmVlZCBBIGNvbHVtbiBiZWNhdXNlIGdyb3VwIGNvbHVtbnMgZG9uJ3QgbWl4IHdpdGggcmVndWxhciBtZXRhIGNvbHVtbnMuXG5cbiAgICAgICAgICAgICAgTk9URTogV2hlbiBzdWJUeXBlIGlzIG5vdCAnZGF0YScgdGhlIHlwZSBjYW4gb25seSBiZSBgaGVhZGVyYCBvciBgZm9vdGVyYC5cbiAgICAgICAgICAqL1xuICAgICAgICAgIGlmIChtYXRyaXhQb2ludC5zdWJUeXBlICE9PSAnZGF0YScpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0b3JlID0gdGhpcy5wbHVnaW5DdHJsLmV4dEFwaS5jb2x1bW5TdG9yZTtcblxuICAgICAgICAgICAgY29uc3Qgcm93SW5mbyA9IChtYXRyaXhQb2ludC50eXBlID09PSAnaGVhZGVyJyA/IHN0b3JlLm1ldGFIZWFkZXJSb3dzIDogc3RvcmUubWV0YUZvb3RlclJvd3MpW2V2ZW50LnJvd0luZGV4XTtcbiAgICAgICAgICAgIGlmIChyb3dJbmZvLmlzR3JvdXApIHtcbiAgICAgICAgICAgICAgZXZlbnQuc3ViVHlwZSA9ICdtZXRhLWdyb3VwJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGV2ZW50O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGxhc3RDZWxsRW50ZXJFdmVudDogRXZlbnRzLlBibE5ncmlkQ2VsbEV2ZW50PFQsIE1vdXNlRXZlbnQ+O1xuICAgIGxldCBsYXN0Um93RW50ZXJFdmVudDogRXZlbnRzLlBibE5ncmlkUm93RXZlbnQ8VD47XG4gICAgY29uc3QgZW1pdENlbGxMZWF2ZSA9IChzb3VyY2U6IE1vdXNlRXZlbnQpOiBFdmVudHMuUGJsTmdyaWRDZWxsRXZlbnQ8VD4gfCB1bmRlZmluZWQgPT4ge1xuICAgICAgaWYgKGxhc3RDZWxsRW50ZXJFdmVudCkge1xuICAgICAgICBjb25zdCBsYXN0Q2VsbEVudGVyRXZlbnRUZW1wID0gbGFzdENlbGxFbnRlckV2ZW50O1xuICAgICAgICB0aGlzLmNlbGxMZWF2ZS5lbWl0KE9iamVjdC5hc3NpZ24oe30sIGxhc3RDZWxsRW50ZXJFdmVudFRlbXAsIHsgc291cmNlIH0pKTtcbiAgICAgICAgbGFzdENlbGxFbnRlckV2ZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICByZXR1cm4gbGFzdENlbGxFbnRlckV2ZW50VGVtcDtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgZW1pdFJvd0xlYXZlID0gKHNvdXJjZTogTW91c2VFdmVudCk6IEV2ZW50cy5QYmxOZ3JpZFJvd0V2ZW50PFQ+IHwgdW5kZWZpbmVkID0+IHtcbiAgICAgIGlmIChsYXN0Um93RW50ZXJFdmVudCkge1xuICAgICAgICBjb25zdCBsYXN0Um93RW50ZXJFdmVudFRlbXAgPSBsYXN0Um93RW50ZXJFdmVudDtcbiAgICAgICAgdGhpcy5yb3dMZWF2ZS5lbWl0KE9iamVjdC5hc3NpZ24oe30sIGxhc3RSb3dFbnRlckV2ZW50VGVtcCwgeyBzb3VyY2UgfSkpO1xuICAgICAgICBsYXN0Um93RW50ZXJFdmVudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgcmV0dXJuIGxhc3RSb3dFbnRlckV2ZW50VGVtcDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBwcm9jZXNzRXZlbnQgPSA8VEV2ZW50IGV4dGVuZHMgRXZlbnQ+KGU6IFRFdmVudCkgPT4ge1xuICAgICAgY29uc3QgcmVzdWx0ID0gZmluZEV2ZW50U291cmNlKGUpO1xuICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICBpZiAocmVzdWx0LnR5cGUgPT09ICdjZWxsJykge1xuICAgICAgICAgIGNvbnN0IGV2ZW50ID0gY3JlYXRlQ2VsbEV2ZW50PFRFdmVudD4ocmVzdWx0LnRhcmdldCwgZSk7XG4gICAgICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICB0eXBlOiByZXN1bHQudHlwZSxcbiAgICAgICAgICAgICAgZXZlbnQsXG4gICAgICAgICAgICAgIHdhaXRUaW1lOiBoYXNMaXN0ZW5lcnModGhpcy5jZWxsRGJsQ2xpY2spID8gMjUwIDogMSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdC50eXBlID09PSAncm93Jykge1xuICAgICAgICAgIGNvbnN0IGV2ZW50ID0gY3JlYXRlUm93RXZlbnQocmVzdWx0LnRhcmdldCwgZSk7XG4gICAgICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICB0eXBlOiByZXN1bHQudHlwZSxcbiAgICAgICAgICAgICAgZXZlbnQsXG4gICAgICAgICAgICAgIHdhaXRUaW1lOiBoYXNMaXN0ZW5lcnModGhpcy5yb3dEYmxDbGljaykgPyAyNTAgOiAxLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqIFNwbGl0IHRoZSByZXN1bHQgb2YgcHJvY2Vzc0V2ZW50IGludG8gY2VsbCBhbmQgcm93IGV2ZW50cywgaWYgdHlwZSBpcyByb3cgb25seSByb3cgZXZlbnQgaXMgcmV0dXJuZWQsIGlmIGNlbGwgdGhlbiBjZWxsIGlzIHJldHVybmVkIGFuZCByb3cgaXMgY3JlYXRlZCBhbG9uZyBzaWRlLiAqL1xuICAgIGNvbnN0IHNwbGl0UHJvY2Vzc2VkRXZlbnQgPSA8VEV2ZW50IGV4dGVuZHMgRXZlbnQ+KGV2ZW50OiBSZXR1cm5UeXBlPHR5cGVvZiBwcm9jZXNzRXZlbnQ+KSA9PiB7XG4gICAgICBjb25zdCBjZWxsRXZlbnQgPSBldmVudC50eXBlID09PSAnY2VsbCcgPyBldmVudC5ldmVudCBhcyBFdmVudHMuUGJsTmdyaWRDZWxsRXZlbnQ8VCwgVEV2ZW50PiA6IHVuZGVmaW5lZDtcbiAgICAgIGNvbnN0IHJvd0V2ZW50ID0gY2VsbEV2ZW50XG4gICAgICAgID8gY3JlYXRlUm93RXZlbnQ8VEV2ZW50PihjZWxsRXZlbnQucm93VGFyZ2V0LCBjZWxsRXZlbnQuc291cmNlLCBjZWxsRXZlbnQpXG4gICAgICAgIDogZXZlbnQuZXZlbnQgYXMgRXZlbnRzLlBibE5ncmlkUm93RXZlbnQ8VD5cbiAgICAgIDtcbiAgICAgIHJldHVybiB7IGNlbGxFdmVudCwgcm93RXZlbnQgfTtcbiAgICB9O1xuXG4gICAgY29uc3QgcmVnaXN0ZXJVcERvd25FdmVudHMgPSA8VEV2ZW50IGV4dGVuZHMgRXZlbnQ+KGV2ZW50TmFtZTogc3RyaW5nLCBlbWl0dGVyOiBFdmVudEVtaXR0ZXI8RXZlbnRzLlBibE5ncmlkQ2VsbEV2ZW50PFQsIFRFdmVudD4gfCBFdmVudHMuUGJsTmdyaWRSb3dFdmVudDxUPj4pID0+IHtcbiAgICAgIGZyb21FdmVudChjZGtUYWJsZUVsZW1lbnQsIGV2ZW50TmFtZSlcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSxcbiAgICAgICAgICBmaWx0ZXIoIHNvdXJjZSA9PiBoYXNMaXN0ZW5lcnMoZW1pdHRlcikgKSxcbiAgICAgICAgICBtYXAocHJvY2Vzc0V2ZW50KSxcbiAgICAgICAgICBmaWx0ZXIoIHJlc3VsdCA9PiAhIXJlc3VsdCApLFxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoIHJlc3VsdCA9PiB7XG4gICAgICAgICAgY29uc3QgeyBjZWxsRXZlbnQsIHJvd0V2ZW50IH0gPSBzcGxpdFByb2Nlc3NlZEV2ZW50PFRFdmVudD4ocmVzdWx0KTtcbiAgICAgICAgICBlbWl0dGVyLmVtaXQoY2VsbEV2ZW50IHx8IHJvd0V2ZW50KTtcbiAgICAgICAgICB0aGlzLnN5bmNSb3coY2VsbEV2ZW50IHx8IHJvd0V2ZW50KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJVcERvd25FdmVudHM8TW91c2VFdmVudD4oJ21vdXNldXAnLCB0aGlzLm1vdXNlVXApO1xuICAgIHJlZ2lzdGVyVXBEb3duRXZlbnRzPE1vdXNlRXZlbnQ+KCdtb3VzZWRvd24nLCB0aGlzLm1vdXNlRG93bik7XG4gICAgcmVnaXN0ZXJVcERvd25FdmVudHM8S2V5Ym9hcmRFdmVudD4oJ2tleXVwJywgdGhpcy5rZXlVcCk7XG4gICAgcmVnaXN0ZXJVcERvd25FdmVudHM8S2V5Ym9hcmRFdmVudD4oJ2tleWRvd24nLCB0aGlzLmtleURvd24pO1xuXG4gICAgLypcbiAgICAgIEhhbmRsaW5nIGNsaWNrIHN0cmVhbSBmb3IgYm90aCBjbGljayBhbmQgZG91YmxlIGNsaWNrIGV2ZW50cy5cbiAgICAgIFdlIHdhbnQgdG8gZGV0ZWN0IGRvdWJsZSBjbGlja3MgYW5kIGNsaWNrcyB3aXRoIG1pbmltYWwgZGVsYXlzXG4gICAgICBXZSBjaGVjayBpZiBhIGRvdWJsZSBjbGljayBoYXMgbGlzdGVuZXJzLCBpZiBub3Qgd2Ugd29uJ3QgZGVsYXkgdGhlIGNsaWNrLi4uXG4gICAgICBUT0RPOiBvbiBkb3VibGUgY2xpY2ssIGRvbid0IHdhaXQgdGhlIHdob2xlIDI1MCBtcyBpZiAyIGNsaWNrcyBoYXBwZW4uXG4gICAgKi9cbiAgICBjb25zdCBjbGlja1N0cmVhbSA9IGZyb21FdmVudChjZGtUYWJsZUVsZW1lbnQsICdjbGljaycpLnBpcGUoXG4gICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpLFxuICAgICAgZmlsdGVyKCBzb3VyY2UgPT4gaGFzTGlzdGVuZXJzKHRoaXMuY2VsbENsaWNrKSB8fCBoYXNMaXN0ZW5lcnModGhpcy5jZWxsRGJsQ2xpY2spIHx8IGhhc0xpc3RlbmVycyh0aGlzLnJvd0NsaWNrKSB8fCBoYXNMaXN0ZW5lcnModGhpcy5yb3dEYmxDbGljaykgKSxcbiAgICAgIG1hcChwcm9jZXNzRXZlbnQpLFxuICAgICAgZmlsdGVyKCByZXN1bHQgPT4gISFyZXN1bHQgKSxcbiAgICApO1xuXG4gICAgY2xpY2tTdHJlYW1cbiAgICAgIC5waXBlKFxuICAgICAgICBidWZmZXJXaGVuKCAoKSA9PiBjbGlja1N0cmVhbS5waXBlKCBkZWJvdW5jZSggZSA9PiB0aW1lcihlLndhaXRUaW1lKSApICkgKSxcbiAgICAgICAgZmlsdGVyKCBldmVudHMgPT4gZXZlbnRzLmxlbmd0aCA+IDAgKSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoIGV2ZW50cyA9PiB7XG4gICAgICAgIGNvbnN0IGV2ZW50ID0gZXZlbnRzLnNoaWZ0KCk7XG4gICAgICAgIGNvbnN0IGlzRG91YmxlQ2xpY2sgPSBldmVudHMubGVuZ3RoID09PSAxOyAvLyBpZiB3ZSBoYXZlIDIgZXZlbnRzIGl0cyBkb3VibGUgY2xpY2ssIG90aGVyd2lzZSBzaW5nbGUuXG4gICAgICAgIGNvbnN0IHsgY2VsbEV2ZW50LCByb3dFdmVudCB9ID0gc3BsaXRQcm9jZXNzZWRFdmVudDxNb3VzZUV2ZW50PihldmVudCk7XG4gICAgICAgIGlmIChpc0RvdWJsZUNsaWNrKSB7XG4gICAgICAgICAgaWYgKGNlbGxFdmVudCkge1xuICAgICAgICAgICAgdGhpcy5jZWxsRGJsQ2xpY2suZW1pdChjZWxsRXZlbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnJvd0RibENsaWNrLmVtaXQocm93RXZlbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChjZWxsRXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuY2VsbENsaWNrLmVtaXQoY2VsbEV2ZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5yb3dDbGljay5lbWl0KHJvd0V2ZW50KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN5bmNSb3coY2VsbEV2ZW50IHx8IHJvd0V2ZW50KTtcbiAgICAgIH0pO1xuXG5cbiAgICBmcm9tRXZlbnQoY2RrVGFibGVFbGVtZW50LCAnbW91c2VsZWF2ZScpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoIChzb3VyY2U6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgbGV0IGxhc3RFdmVudDogRXZlbnRzLlBibE5ncmlkUm93RXZlbnQ8VD4gfCBFdmVudHMuUGJsTmdyaWRDZWxsRXZlbnQ8VD4gPSBlbWl0Q2VsbExlYXZlKHNvdXJjZSk7XG4gICAgICAgIGxhc3RFdmVudCA9IGVtaXRSb3dMZWF2ZShzb3VyY2UpIHx8IGxhc3RFdmVudDtcbiAgICAgICAgaWYgKGxhc3RFdmVudCkge1xuICAgICAgICAgIHRoaXMuc3luY1JvdyhsYXN0RXZlbnQpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIGZyb21FdmVudChjZGtUYWJsZUVsZW1lbnQsICdtb3VzZW1vdmUnKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCAoc291cmNlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGNlbGxUYXJnZXQ6IEhUTUxFbGVtZW50ID0gZmluZFBhcmVudENlbGwoc291cmNlLnRhcmdldCBhcyBhbnkpO1xuICAgICAgICBjb25zdCBsYXN0Q2VsbFRhcmdldCA9IGxhc3RDZWxsRW50ZXJFdmVudCAmJiBsYXN0Q2VsbEVudGVyRXZlbnQuY2VsbFRhcmdldDtcbiAgICAgICAgY29uc3QgbGFzdFJvd1RhcmdldCA9IGxhc3RSb3dFbnRlckV2ZW50ICYmIGxhc3RSb3dFbnRlckV2ZW50LnJvd1RhcmdldDtcblxuICAgICAgICBsZXQgY2VsbEV2ZW50OiBFdmVudHMuUGJsTmdyaWRDZWxsRXZlbnQ8VCwgTW91c2VFdmVudD47XG4gICAgICAgIGxldCBsYXN0RXZlbnQ6IEV2ZW50cy5QYmxOZ3JpZFJvd0V2ZW50PFQ+IHwgRXZlbnRzLlBibE5ncmlkQ2VsbEV2ZW50PFQ+O1xuXG4gICAgICAgIGlmIChsYXN0Q2VsbFRhcmdldCAhPT0gY2VsbFRhcmdldCkge1xuICAgICAgICAgIGxhc3RFdmVudCA9IGVtaXRDZWxsTGVhdmUoc291cmNlKSB8fCBsYXN0RXZlbnQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2VsbFRhcmdldCkge1xuICAgICAgICAgIGlmIChsYXN0Q2VsbFRhcmdldCAhPT0gY2VsbFRhcmdldCkge1xuICAgICAgICAgICAgY2VsbEV2ZW50ID0gY3JlYXRlQ2VsbEV2ZW50KGNlbGxUYXJnZXQsIHNvdXJjZSk7XG4gICAgICAgICAgICBpZiAoY2VsbEV2ZW50KSB7XG4gICAgICAgICAgICAgIHRoaXMuY2VsbEVudGVyLmVtaXQobGFzdENlbGxFbnRlckV2ZW50ID0gY2VsbEV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJvd1RhcmdldCA9IChjZWxsRXZlbnQgJiYgY2VsbEV2ZW50LnJvd1RhcmdldCkgfHwgKGlzUm93Q29udGFpbmVyKHNvdXJjZS50YXJnZXQgYXMgYW55KSAmJiBzb3VyY2UudGFyZ2V0IGFzIGFueSk7XG5cbiAgICAgICAgaWYgKGxhc3RSb3dUYXJnZXQgIT09IHJvd1RhcmdldCkge1xuICAgICAgICAgIGxhc3RFdmVudCA9IGVtaXRSb3dMZWF2ZShzb3VyY2UpIHx8IGxhc3RFdmVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyb3dUYXJnZXQpIHtcbiAgICAgICAgICBpZiAobGFzdFJvd1RhcmdldCAhPT0gcm93VGFyZ2V0KSB7XG4gICAgICAgICAgICBjb25zdCByb3dFdmVudCA9IGNyZWF0ZVJvd0V2ZW50KHJvd1RhcmdldCwgc291cmNlLCBjZWxsRXZlbnQpO1xuICAgICAgICAgICAgaWYgKHJvd0V2ZW50KSB7XG4gICAgICAgICAgICAgIHRoaXMucm93RW50ZXIuZW1pdChsYXN0Um93RW50ZXJFdmVudCA9IHJvd0V2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGFzdEV2ZW50KSB7XG4gICAgICAgICAgdGhpcy5zeW5jUm93KGxhc3RFdmVudCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgZGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3llZC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95ZWQuY29tcGxldGUoKTtcbiAgICB0aGlzLl9yZW1vdmVQbHVnaW4odGhpcy5ncmlkKTtcbiAgfVxuXG4gIHByaXZhdGUgc3luY1JvdzxURXZlbnQgZXh0ZW5kcyBFdmVudD4oZXZlbnQ6IEV2ZW50cy5QYmxOZ3JpZFJvd0V2ZW50PFQ+IHwgRXZlbnRzLlBibE5ncmlkQ2VsbEV2ZW50PFQsIFRFdmVudD4pOiB2b2lkIHtcbiAgICB0aGlzLmdyaWQucm93c0FwaS5zeW5jUm93cyhldmVudC50eXBlLCBldmVudC5yb3dJbmRleCk7XG4gIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkaXJlY3RpdmUtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICdwYmwtbmdyaWRbdGFyZ2V0RXZlbnRzXSwgcGJsLW5ncmlkW3Jvd0NsaWNrXSwgcGJsLW5ncmlkW3Jvd0RibENsaWNrXSwgcGJsLW5ncmlkW3Jvd0VudGVyXSwgcGJsLW5ncmlkW3Jvd0xlYXZlXSwgcGJsLW5ncmlkW2NlbGxDbGlja10sIHBibC1uZ3JpZFtjZWxsRGJsQ2xpY2tdLCBwYmwtbmdyaWRbY2VsbEVudGVyXSwgcGJsLW5ncmlkW2NlbGxMZWF2ZV0sIHBibC1uZ3JpZFtrZXlEb3duXSwgcGJsLW5ncmlkW2tleVVwXScsXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp1c2Utb3V0cHV0LXByb3BlcnR5LWRlY29yYXRvclxuICBvdXRwdXRzOiBbICdyb3dDbGljaycsICdyb3dEYmxDbGljaycsICdyb3dFbnRlcicsICdyb3dMZWF2ZScsICdjZWxsQ2xpY2snLCAnY2VsbERibENsaWNrJywgJ2NlbGxFbnRlcicsICdjZWxsTGVhdmUnLCAna2V5RG93bicsICdrZXlVcCcgXVxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZFRhcmdldEV2ZW50c1BsdWdpbkRpcmVjdGl2ZTxUPiBleHRlbmRzIFBibE5ncmlkVGFyZ2V0RXZlbnRzUGx1Z2luPFQ+IGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICBjb25zdHJ1Y3Rvcih0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55PiwgaW5qZWN0b3I6IEluamVjdG9yLCBwbHVnaW5DdHJsOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIpIHtcbiAgICBzdXBlcih0YWJsZSwgaW5qZWN0b3IsIHBsdWdpbkN0cmwpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5kZXN0cm95KCk7XG4gIH1cblxufVxuIl19