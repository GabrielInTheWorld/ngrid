import { ComponentFactory, ComponentRef, ComponentFactoryResolver } from '@angular/core';
import { PblNgridMultiComponentRegistry, PblNgridDataHeaderExtensionContext } from '@pebula/ngrid';
import { PblNgridBsSortable } from './bs-sortable/bs-sortable.component';
export declare class PblBsSortableExtension extends PblNgridMultiComponentRegistry<PblNgridBsSortable, 'dataHeaderExtensions'> {
    private cfr;
    readonly name: 'bsSortContainer';
    readonly kind: 'dataHeaderExtensions';
    readonly projectContent = true;
    constructor(cfr: ComponentFactoryResolver);
    shouldRender(context: PblNgridDataHeaderExtensionContext): boolean;
    getFactory(context: PblNgridDataHeaderExtensionContext): ComponentFactory<PblNgridBsSortable>;
    onCreated(context: PblNgridDataHeaderExtensionContext, cmpRef: ComponentRef<PblNgridBsSortable>): void;
    /**
     * Check that the current `MatSort` does not already have a sortable header with the provided id.
     */
    private deregisterId;
}
