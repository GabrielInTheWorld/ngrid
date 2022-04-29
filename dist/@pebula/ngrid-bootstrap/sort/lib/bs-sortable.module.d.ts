import { ComponentFactoryResolver } from '@angular/core';
import { PblNgridRegistryService } from '@pebula/ngrid';
import * as i0 from "@angular/core";
import * as i1 from "./bs-sortable-plugin";
import * as i2 from "./bs-sortable/bs-sortable.component";
import * as i3 from "@angular/common";
import * as i4 from "@pebula/ngrid";
export declare class PblNgridBsSortableModule {
    private registry;
    static readonly NGRID_PLUGIN: never;
    constructor(registry: PblNgridRegistryService, cfr: ComponentFactoryResolver);
    static ɵfac: i0.ɵɵFactoryDeclaration<PblNgridBsSortableModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<PblNgridBsSortableModule, [typeof i1.PblNgridBsSortablePlugin, typeof i2.PblNgridBsSortable], [typeof i3.CommonModule, typeof i4.PblNgridModule], [typeof i1.PblNgridBsSortablePlugin, typeof i2.PblNgridBsSortable]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<PblNgridBsSortableModule>;
}
