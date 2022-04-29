import { PblNgridConfigService } from '@pebula/ngrid/core';
import * as i0 from "@angular/core";
import * as i1 from "./cell-tooltip.directive";
import * as i2 from "@angular/common";
import * as i3 from "@ng-bootstrap/ng-bootstrap";
import * as i4 from "@pebula/ngrid";
import * as i5 from "@pebula/ngrid/target-events";
export declare class PblNgridBsCellTooltipModule {
    static readonly NGRID_PLUGIN: never;
    constructor(parentModule: PblNgridBsCellTooltipModule, configService: PblNgridConfigService);
    static ɵfac: i0.ɵɵFactoryDeclaration<PblNgridBsCellTooltipModule, [{ optional: true; skipSelf: true; }, null]>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<PblNgridBsCellTooltipModule, [typeof i1.PblNgridCellTooltipDirective], [typeof i2.CommonModule, typeof i3.NgbTooltipModule, typeof i4.PblNgridModule, typeof i5.PblNgridTargetEventsModule], [typeof i1.PblNgridCellTooltipDirective, typeof i3.NgbTooltipModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<PblNgridBsCellTooltipModule>;
}
