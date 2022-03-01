import { ChangeDetectorRef } from '@angular/core';
import { PblNgridBsSortablePlugin } from '../bs-sortable-plugin';
import { PblNgridBsSortDirection, PblNgridSortable } from '../types';
import * as i0 from "@angular/core";
export declare class PblNgridBsSortable implements PblNgridSortable {
    private plugin;
    id: string;
    /** Starting sort direction. */
    start: 'asc' | 'desc';
    /** Whether to disable clearing the sorting state. */
    disableClear: boolean;
    _direction: PblNgridBsSortDirection;
    constructor(cdRef: ChangeDetectorRef, plugin: PblNgridBsSortablePlugin);
    ngOnInit(): void;
    ngOnDestroy(): void;
    _handleClick(): void;
    _updateArrowDirection(): void;
    _isAfter(): boolean;
    /** Whether this PblNgridBsSortable is currently sorted in either ascending or descending order. */
    _isSorted(): boolean;
    _isDisabled(): any;
    /** Triggers the sort on this sort header and removes the indicator hint. */
    _toggleOnInteraction(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PblNgridBsSortable, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PblNgridBsSortable, "pbl-bs-sortable", never, {}, {}, never, ["*"]>;
}
