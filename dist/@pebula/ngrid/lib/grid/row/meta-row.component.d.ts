import { ElementRef, ComponentRef, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { PblMetaRowDefinitions } from '@pebula/ngrid/core';
import { _PblNgridComponent } from '../../tokens';
import { PblNgridMetaCellComponent } from '../cell/meta-cell.component';
import { PblNgridBaseRowComponent } from './base-row.component';
import { PblColumnGroup, PblMetaColumn } from '../column/model';
import { PblNgridMetaRowService, PblMetaRow } from '../meta-rows/meta-row.service';
import { PblColumnStoreMetaRow } from '../column/management';
import * as i0 from "@angular/core";
export declare class PblNgridMetaRowComponent extends PblNgridBaseRowComponent<'meta-header' | 'meta-footer'> implements PblMetaRow, OnInit, OnDestroy {
    private readonly metaRows;
    get row(): PblColumnStoreMetaRow;
    set row(value: PblColumnStoreMetaRow);
    get rowIndex(): number;
    get meta(): PblMetaRowDefinitions;
    set meta(value: PblMetaRowDefinitions);
    readonly rowType: 'meta-header' | 'meta-footer';
    readonly element: HTMLElement;
    readonly isFooter: boolean;
    readonly gridWidthRow: boolean;
    private _meta;
    private _row;
    constructor(grid: _PblNgridComponent, cdRef: ChangeDetectorRef, el: ElementRef<HTMLElement>, metaRows: PblNgridMetaRowService, isFooter: any);
    ngOnInit(): void;
    ngOnDestroy(): void;
    protected onCtor(): void;
    protected detectChanges(): void;
    protected cellCreated(column: PblMetaColumn | PblColumnGroup, cell: ComponentRef<PblNgridMetaCellComponent>): void;
    protected cellDestroyed?(cell: ComponentRef<PblNgridMetaCellComponent>, previousIndex: number): void;
    protected cellMoved?(previousItem: ComponentRef<PblNgridMetaCellComponent>, currentItem: ComponentRef<PblNgridMetaCellComponent>, previousIndex: number, currentIndex: number): void;
    protected updateRow(value: PblColumnStoreMetaRow): void;
    private handleVisibility;
    static ɵfac: i0.ɵɵFactoryDeclaration<PblNgridMetaRowComponent, [{ optional: true; }, null, null, null, { attribute: "footer"; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PblNgridMetaRowComponent, "pbl-ngrid-meta-row", never, { "row": "row"; }, {}, never, never>;
}
