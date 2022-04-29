import { Subject } from 'rxjs';
import { OnDestroy, OnChanges, EventEmitter } from '@angular/core';
import { BooleanInput } from '@angular/cdk/coercion';
import { PblNgridComponent, PblNgridPluginController } from '@pebula/ngrid';
import { PblNgridSortable, PblNgridBsSortDirection, PblNgridBsSortState } from './types';
import * as i0 from "@angular/core";
declare module '@pebula/ngrid/lib/ext/types' {
    interface PblNgridPluginExtension {
        bsSortable?: PblNgridBsSortablePlugin;
    }
}
export declare const PLUGIN_KEY: 'bsSortable';
export declare class PblNgridBsSortablePlugin implements OnChanges, OnDestroy {
    grid: PblNgridComponent<any>;
    private pluginCtrl;
    get bsSortableDisabled(): any;
    set bsSortableDisabled(value: any);
    /** Collection of all registered sortables that this directive manages. */
    sortables: Map<string, PblNgridSortable>;
    /** Used to notify any child components listening to state changes. */
    readonly _stateChanges: Subject<void>;
    /** The id of the most recently sorted MatSortable. */
    active: string;
    /**
     * The direction to set when an PblNgridSortable is initially sorted.
     * May be overriden by the PblNgridSortable's sort start.
     */
    start: 'asc' | 'desc';
    /** The sort direction of the currently active MatSortable. */
    get direction(): PblNgridBsSortDirection;
    set direction(direction: PblNgridBsSortDirection);
    bsArrowPosition: 'before' | 'after';
    /**
     * Whether to disable the user from clearing the sort by finishing the sort direction cycle.
     * May be overriden by the MatSortable's disable clear input.
     */
    get disableClear(): boolean;
    set disableClear(v: boolean);
    private _disableClear;
    /** Event emitted when the user changes either the active sort or sort direction. */
    readonly sortChange: EventEmitter<PblNgridBsSortState>;
    private _direction;
    private _disabled;
    private _removePlugin;
    private origin;
    constructor(grid: PblNgridComponent<any>, pluginCtrl: PblNgridPluginController);
    /**
     * Register function to be used by the contained PblNgridSortable. Adds the PblNgridSortable to the
     * collection of PblNgridSortable.
     */
    register(sortable: PblNgridSortable): void;
    /**
     * Unregister function to be used by the contained PblNgridSortables. Removes the PblNgridSortable from the
     * collection of contained PblNgridSortables.
     */
    deregister(sortable: PblNgridSortable): void;
    /** Sets the active sort id and determines the new sort direction. */
    sort(sortable: PblNgridSortable): void;
    /** Returns the next sort direction of the active sortable, checking for potential overrides. */
    getNextSortDirection(sortable: PblNgridSortable): PblNgridBsSortDirection;
    ngOnChanges(): void;
    ngOnDestroy(): void;
    private onSort;
    private handleEvents;
    static ngAcceptInputType_bsSortableDisabled: BooleanInput;
    static ngAcceptInputType_disableClear: BooleanInput;
    static ɵfac: i0.ɵɵFactoryDeclaration<PblNgridBsSortablePlugin, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<PblNgridBsSortablePlugin, "pbl-ngrid[bsSortable]", ["pblBsSortable"], { "active": "bsSortableActive"; "start": "bsSortableStart"; "direction": "bsSortableDirection"; "bsArrowPosition": "bsArrowPosition"; "disableClear": "matSortDisableClear"; }, { "sortChange": "matSortChange"; }, never>;
}
