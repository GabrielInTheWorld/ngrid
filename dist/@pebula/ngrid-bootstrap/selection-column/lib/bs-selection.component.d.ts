import { AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { PblNgridComponent, PblNgridHeaderCellDefDirective, PblNgridCellDefDirective, PblNgridFooterCellDefDirective } from '@pebula/ngrid';
import * as i0 from "@angular/core";
export declare class PblNgridBsSelectionComponent implements AfterViewInit, OnDestroy {
    table: PblNgridComponent<any>;
    private cdr;
    /**
     * Unique name for the checkbox column.
     * When not set, the name 'checkbox' is used.
     *
     **/
    name: string;
    /**
     * Defines the behavior when clicking on the bulk select checkbox (header).
     * There are 2 options:
     *
     * - all: Will select all items in the current collection
     * - view: Will select only the rendered items in the view
     *
     * The default value is `all`
     */
    get bulkSelectMode(): 'all' | 'view' | 'none';
    set bulkSelectMode(value: 'all' | 'view' | 'none');
    /**
     * A Custom selection model, optional.
     * If not set, the selection model from the DataSource is used.
     */
    get selection(): SelectionModel<any>;
    set selection(value: SelectionModel<any>);
    get isCheckboxDisabled(): (row: any) => boolean;
    set isCheckboxDisabled(value: (row: any) => boolean);
    get selectionClass(): string;
    set selectionClass(value: string);
    headerDef: PblNgridHeaderCellDefDirective<any>;
    cellDef: PblNgridCellDefDirective<any>;
    footerDef: PblNgridFooterCellDefDirective<any>;
    allSelected: boolean;
    length: number;
    private _selection;
    private _bulkSelectMode;
    private _isCheckboxDisabled;
    private _selectionClass;
    constructor(table: PblNgridComponent<any>, cdr: ChangeDetectorRef);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    masterToggle(): void;
    rowItemChange(row: any): void;
    onInput(a: any, b: any): void;
    private getCollection;
    private setupSelection;
    private handleSelectionChanged;
    private markAndDetect;
    static ɵfac: i0.ɵɵFactoryDeclaration<PblNgridBsSelectionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PblNgridBsSelectionComponent, "pbl-ngrid-bs-checkbox", never, { "name": "name"; "bulkSelectMode": "bulkSelectMode"; "selection": "selection"; "isCheckboxDisabled": "isCheckboxDisabled"; "selectionClass": "selectionClass"; }, {}, never, never>;
}
