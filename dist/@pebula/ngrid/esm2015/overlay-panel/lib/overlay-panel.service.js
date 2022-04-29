import { Injectable, ViewContainerRef, ElementRef, Injector, NgZone } from '@angular/core';
import { Overlay, OverlayConfig, } from '@angular/cdk/overlay';
import { TemplatePortal, ComponentPortal } from '@angular/cdk/portal';
import { PblNgridPluginController, PblNgridMultiTemplateRegistry } from '@pebula/ngrid';
import { PblNgridOverlayPanelRef } from './overlay-panel-ref';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
const DEFAULT_OVERLAY_PANEL_CONFIG = {
    hasBackdrop: false,
    xPos: 'center',
    yPos: 'center',
    insetPos: false,
};
export class PblNgridOverlayPanelFactory {
    constructor(_overlay, zone) {
        this._overlay = _overlay;
        this.zone = zone;
    }
    create(grid) {
        return new PblNgridOverlayPanel(this._overlay, this.zone, grid);
    }
}
/** @nocollapse */ PblNgridOverlayPanelFactory.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridOverlayPanelFactory, deps: [{ token: i1.Overlay }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ PblNgridOverlayPanelFactory.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridOverlayPanelFactory });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblNgridOverlayPanelFactory, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Overlay }, { type: i0.NgZone }]; } });
export class PblNgridOverlayPanel {
    constructor(_overlay, zone, grid) {
        this._overlay = _overlay;
        this.zone = zone;
        this.grid = grid;
        const controller = PblNgridPluginController.find(grid);
        this.injector = controller.injector;
        this.vcRef = controller.injector.get(ViewContainerRef);
        this._scrollStrategy = () => _overlay.scrollStrategies.reposition();
    }
    /**
     * Opens a panel relative to a cell element using the overlay panel extension registry template/component with the name provided in `extName`.
     * The cell element is referenced by the `columnId` and the `rowRenderPosition`.
     *
     * If the `rowRenderPosition` is "header" or "footer" then the grid's header / footer rows are targeted, otherwise the number provided should reference
     * the rendered row index to use to get the cell from.
     *
     * > Note that this helper method does not allow targeting meta cells.
     */
    openGridCell(extName, columnId, rowRenderPosition, config, data) {
        const column = this.grid.columnApi.findColumn(columnId);
        if (!column) {
            if (typeof ngDevMode === 'undefined' || ngDevMode) {
                throw new Error('Could not find the column ' + columnId);
            }
            return;
        }
        let section;
        let rowRenderIndex = 0;
        switch (rowRenderPosition) {
            case 'header':
            case 'footer':
                section = rowRenderPosition;
                break;
            default:
                if (typeof rowRenderPosition === 'number') {
                    section = 'table';
                    rowRenderIndex = rowRenderPosition;
                }
                break;
        }
        if (!section) {
            if (typeof ngDevMode === 'undefined' || ngDevMode) {
                throw new Error('Invalid "rowRenderPosition" provided, use "header", "footer" or any number >= 0.');
            }
            return;
        }
        const el = column && column.columnDef.queryCellElements(section)[rowRenderIndex];
        if (!el) {
            if (typeof ngDevMode === 'undefined' || ngDevMode) {
                throw new Error(`Could not find a cell for the column ${columnId} at render index ${rowRenderIndex}`);
            }
            return;
        }
        return this.open(extName, new ElementRef(el), config, data);
    }
    open(extName, source, config, data) {
        config = Object.assign(Object.assign({}, DEFAULT_OVERLAY_PANEL_CONFIG), config || {});
        const match = this.findNamesExtension(extName);
        if (!match) {
            if (typeof ngDevMode === 'undefined' || ngDevMode) {
                throw new Error('Could not find the overlay panel with the name ' + extName);
            }
            return;
        }
        return this.zone.run(() => {
            const overlayRef = this._createOverlay(source, config);
            const overlayPanelRef = new PblNgridOverlayPanelRef(overlayRef, data);
            this._setPosition(overlayRef.getConfig().positionStrategy, config);
            if (match instanceof PblNgridMultiTemplateRegistry) {
                const tPortal = this._getTemplatePortal(match.tRef, overlayPanelRef);
                const viewRef = overlayRef.attach(tPortal);
                viewRef.markForCheck();
                viewRef.detectChanges();
            }
            else {
                const cPortal = this._getComponentPortal(overlayPanelRef, match);
                const cmpRef = overlayRef.attach(cPortal);
                match.onCreated(null, cmpRef);
            }
            overlayRef.updatePosition();
            return overlayPanelRef;
        });
    }
    /**
     * This method creates the overlay from the provided menu's template and saves its
     * OverlayRef so that it can be attached to the DOM when openMenu is called.
     */
    _createOverlay(element, config) {
        const overlayConfig = this._getOverlayConfig(element, config);
        const overlayRef = this._overlay.create(overlayConfig);
        overlayRef.getConfig().hasBackdrop = !!config.hasBackdrop;
        // Consume the `keydownEvents` in order to prevent them from going to another overlay.
        // Ideally we'd also have our keyboard event logic in here, however doing so will
        // break anybody that may have implemented the `MatMenuPanel` themselves.
        overlayRef.keydownEvents().subscribe();
        return overlayRef;
    }
    /**
     * This method builds the configuration object needed to create the overlay, the OverlayState.
     * @returns OverlayConfig
     */
    _getOverlayConfig(element, config) {
        const positionStrategy = this._overlay
            .position()
            .flexibleConnectedTo(element)
            .withLockedPosition();
        return new OverlayConfig({
            positionStrategy,
            backdropClass: config.backdropClass || 'cdk-overlay-transparent-backdrop',
            scrollStrategy: this._scrollStrategy(),
            direction: this.grid.dir,
        });
    }
    _getTemplatePortal(tRef, overlayPanelRef) {
        const context = {
            grid: this.grid,
            ref: overlayPanelRef,
        };
        return new TemplatePortal(tRef, this.vcRef, context);
    }
    _getComponentPortal(overlayPanelRef, componentExtension) {
        const portalInjector = Injector.create({
            providers: [
                { provide: PblNgridOverlayPanelRef, useValue: overlayPanelRef },
            ],
            parent: componentExtension.injector || this.injector,
        });
        return new ComponentPortal(componentExtension.component, this.vcRef, portalInjector, componentExtension.cfr || null);
    }
    _setPosition(positionStrategy, config) {
        let [originX, originFallbackX] = config.xPos === 'center'
            ? ['center', 'center']
            : config.xPos === 'before' ? ['end', 'start'] : ['start', 'end'];
        let [overlayY, overlayFallbackY] = config.yPos === 'center'
            ? ['center', 'center']
            : config.yPos === 'above' ? ['bottom', 'top'] : ['top', 'bottom'];
        let [originY, originFallbackY] = [overlayY, overlayFallbackY];
        let [overlayX, overlayFallbackX] = [originX, originFallbackX];
        let offsetY = 0;
        if (!config.insetPos) {
            if (overlayY !== 'center') {
                originY = overlayY === 'top' ? 'bottom' : 'top';
            }
            if (overlayFallbackY !== 'center') {
                originFallbackY = overlayFallbackY === 'top' ? 'bottom' : 'top';
            }
        }
        positionStrategy.withPositions([
            { originX, originY, overlayX, overlayY, offsetY },
            { originX: originFallbackX, originY, overlayX: overlayFallbackX, overlayY, offsetY },
            {
                originX,
                originY: originFallbackY,
                overlayX,
                overlayY: overlayFallbackY,
                offsetY: -offsetY
            },
            {
                originX: originFallbackX,
                originY: originFallbackY,
                overlayX: overlayFallbackX,
                overlayY: overlayFallbackY,
                offsetY: -offsetY
            }
        ]);
    }
    findNamesExtension(extName) {
        let match;
        this.grid.registry.forMulti('overlayPanels', values => {
            for (const value of values) {
                if (value.name === extName) {
                    match = value;
                    return true;
                }
            }
        });
        return match;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS1wYW5lbC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3JpZC9vdmVybGF5LXBhbmVsL3NyYy9saWIvb3ZlcmxheS1wYW5lbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBZSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFeEcsT0FBTyxFQUdMLE9BQU8sRUFDUCxhQUFhLEdBSWQsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RFLE9BQU8sRUFBRSx3QkFBd0IsRUFBcUIsNkJBQTZCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0csT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0scUJBQXFCLENBQUM7OztBQW1COUQsTUFBTSw0QkFBNEIsR0FBK0I7SUFDL0QsV0FBVyxFQUFFLEtBQUs7SUFDbEIsSUFBSSxFQUFFLFFBQVE7SUFDZCxJQUFJLEVBQUUsUUFBUTtJQUNkLFFBQVEsRUFBRSxLQUFLO0NBQ2hCLENBQUM7QUFHRixNQUFNLE9BQU8sMkJBQTJCO0lBQ3RDLFlBQW9CLFFBQWlCLEVBQVUsSUFBWTtRQUF2QyxhQUFRLEdBQVIsUUFBUSxDQUFTO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBUTtJQUFJLENBQUM7SUFFaEUsTUFBTSxDQUFJLElBQTBCO1FBQ2xDLE9BQU8sSUFBSSxvQkFBb0IsQ0FBSSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDckUsQ0FBQzs7MklBTFUsMkJBQTJCOytJQUEzQiwyQkFBMkI7MkZBQTNCLDJCQUEyQjtrQkFEdkMsVUFBVTs7QUFTWCxNQUFNLE9BQU8sb0JBQW9CO0lBTS9CLFlBQW9CLFFBQWlCLEVBQ2pCLElBQVksRUFDSixJQUEwQjtRQUZsQyxhQUFRLEdBQVIsUUFBUSxDQUFTO1FBQ2pCLFNBQUksR0FBSixJQUFJLENBQVE7UUFDSixTQUFJLEdBQUosSUFBSSxDQUFzQjtRQUNwRCxNQUFNLFVBQVUsR0FBRyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsZUFBZSxHQUFHLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0RSxDQUFDO0lBR0Q7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLENBQVUsT0FBZSxFQUFFLFFBQWdCLEVBQUUsaUJBQStDLEVBQUUsTUFBbUMsRUFBRSxJQUFRO1FBQ3JKLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1gsSUFBSSxPQUFPLFNBQVMsS0FBSyxXQUFXLElBQUksU0FBUyxFQUFFO2dCQUNqRCxNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixHQUFHLFFBQVEsQ0FBQyxDQUFDO2FBQzFEO1lBQ0QsT0FBTztTQUNSO1FBRUQsSUFBSSxPQUFzQyxDQUFDO1FBQzNDLElBQUksY0FBYyxHQUFHLENBQUMsQ0FBQztRQUN2QixRQUFRLGlCQUFpQixFQUFFO1lBQ3pCLEtBQUssUUFBUSxDQUFDO1lBQ2QsS0FBSyxRQUFRO2dCQUNYLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQztnQkFDNUIsTUFBTTtZQUNSO2dCQUNFLElBQUksT0FBTyxpQkFBaUIsS0FBSyxRQUFRLEVBQUU7b0JBQ3pDLE9BQU8sR0FBRyxPQUFPLENBQUM7b0JBQ2xCLGNBQWMsR0FBRyxpQkFBaUIsQ0FBQztpQkFDcEM7Z0JBQ0QsTUFBTTtTQUNUO1FBRUQsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNaLElBQUksT0FBTyxTQUFTLEtBQUssV0FBVyxJQUFJLFNBQVMsRUFBRTtnQkFDakQsTUFBTSxJQUFJLEtBQUssQ0FBQyxrRkFBa0YsQ0FBQyxDQUFDO2FBQ3JHO1lBQ0QsT0FBTztTQUNSO1FBRUQsTUFBTSxFQUFFLEdBQUcsTUFBTSxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDakYsSUFBSSxDQUFDLEVBQUUsRUFBRTtZQUNQLElBQUksT0FBTyxTQUFTLEtBQUssV0FBVyxJQUFJLFNBQVMsRUFBRTtnQkFDakQsTUFBTSxJQUFJLEtBQUssQ0FBQyx3Q0FBd0MsUUFBUSxvQkFBb0IsY0FBYyxFQUFFLENBQUMsQ0FBQzthQUN2RztZQUNELE9BQU87U0FDUjtRQUVELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFRCxJQUFJLENBQVUsT0FBZSxFQUFFLE1BQStCLEVBQUUsTUFBbUMsRUFBRSxJQUFRO1FBQzNHLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxtQkFBTSw0QkFBNEIsR0FBSSxNQUFNLElBQUksRUFBRSxDQUFDLENBQUM7UUFDMUUsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRS9DLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixJQUFJLE9BQU8sU0FBUyxLQUFLLFdBQVcsSUFBSSxTQUFTLEVBQUU7Z0JBQ2pELE1BQU0sSUFBSSxLQUFLLENBQUMsaURBQWlELEdBQUcsT0FBTyxDQUFDLENBQUM7YUFDOUU7WUFDRCxPQUFPO1NBQ1I7UUFFRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRTtZQUN4QixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztZQUN2RCxNQUFNLGVBQWUsR0FBRyxJQUFJLHVCQUF1QixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN0RSxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxnQkFBcUQsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUV4RyxJQUFJLEtBQUssWUFBWSw2QkFBNkIsRUFBRTtnQkFDbEQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsZUFBZSxDQUFDLENBQUM7Z0JBQ3JFLE1BQU0sT0FBTyxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzNDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDdkIsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO2FBQ3pCO2lCQUFNO2dCQUNMLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDLENBQUE7Z0JBQ2hFLE1BQU0sTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2FBQy9CO1lBRUQsVUFBVSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQzVCLE9BQU8sZUFBZSxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7T0FHRztJQUNLLGNBQWMsQ0FBQyxPQUFnQyxFQUFFLE1BQWtDO1FBQ3pGLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDOUQsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDdkQsVUFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQTtRQUN6RCxzRkFBc0Y7UUFDdEYsaUZBQWlGO1FBQ2pGLHlFQUF5RTtRQUN6RSxVQUFVLENBQUMsYUFBYSxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFdkMsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQztJQUVEOzs7T0FHRztJQUNLLGlCQUFpQixDQUFDLE9BQWdDLEVBQUUsTUFBa0M7UUFDNUYsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsUUFBUTthQUNuQyxRQUFRLEVBQUU7YUFDVixtQkFBbUIsQ0FBQyxPQUFPLENBQUM7YUFDNUIsa0JBQWtCLEVBQUUsQ0FBQztRQUV4QixPQUFPLElBQUksYUFBYSxDQUFDO1lBQ3ZCLGdCQUFnQjtZQUNoQixhQUFhLEVBQUUsTUFBTSxDQUFDLGFBQWEsSUFBSSxrQ0FBa0M7WUFDekUsY0FBYyxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDdEMsU0FBUyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRztTQUN6QixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU8sa0JBQWtCLENBQUMsSUFBOEMsRUFBRSxlQUF3QztRQUNqSCxNQUFNLE9BQU8sR0FBZ0M7WUFDM0MsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsR0FBRyxFQUFFLGVBQWU7U0FDckIsQ0FBQztRQUNGLE9BQU8sSUFBSSxjQUFjLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVPLG1CQUFtQixDQUFDLGVBQXdDLEVBQ3hDLGtCQUErRDtRQUN6RixNQUFNLGNBQWMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDO1lBQ3JDLFNBQVMsRUFBRTtnQkFDVCxFQUFFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFO2FBQ2hFO1lBQ0QsTUFBTSxFQUFFLGtCQUFrQixDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUTtTQUNyRCxDQUFDLENBQUM7UUFDSCxPQUFPLElBQUksZUFBZSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLGNBQWMsRUFBRSxrQkFBa0IsQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLENBQUE7SUFDdEgsQ0FBQztJQUVPLFlBQVksQ0FBQyxnQkFBbUQsRUFBRSxNQUFrQztRQUMxRyxJQUFJLENBQUMsT0FBTyxFQUFFLGVBQWUsQ0FBQyxHQUM1QixNQUFNLENBQUMsSUFBSSxLQUFLLFFBQVE7WUFDdEIsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQztZQUN0QixDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUVyRSxJQUFJLENBQUMsUUFBUSxFQUFFLGdCQUFnQixDQUFDLEdBQzlCLE1BQU0sQ0FBQyxJQUFJLEtBQUssUUFBUTtZQUN0QixDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDO1lBQ3RCLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRXRFLElBQUksQ0FBQyxPQUFPLEVBQUUsZUFBZSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsUUFBUSxFQUFFLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFDOUQsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBRWhCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO1lBQ3BCLElBQUksUUFBUSxLQUFLLFFBQVEsRUFBRTtnQkFDekIsT0FBTyxHQUFHLFFBQVEsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO2FBQ2pEO1lBQ0QsSUFBSSxnQkFBZ0IsS0FBSyxRQUFRLEVBQUU7Z0JBQ2pDLGVBQWUsR0FBRyxnQkFBZ0IsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO2FBQ2pFO1NBQ0Y7UUFFRCxnQkFBZ0IsQ0FBQyxhQUFhLENBQUM7WUFDN0IsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFDO1lBQy9DLEVBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUM7WUFDbEY7Z0JBQ0UsT0FBTztnQkFDUCxPQUFPLEVBQUUsZUFBZTtnQkFDeEIsUUFBUTtnQkFDUixRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixPQUFPLEVBQUUsQ0FBQyxPQUFPO2FBQ2xCO1lBQ0Q7Z0JBQ0UsT0FBTyxFQUFFLGVBQWU7Z0JBQ3hCLE9BQU8sRUFBRSxlQUFlO2dCQUN4QixRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixPQUFPLEVBQUUsQ0FBQyxPQUFPO2FBQ2xCO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLGtCQUFrQixDQUFDLE9BQWU7UUFDeEMsSUFBSSxLQUFnSSxDQUFDO1FBQ3JJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDcEQsS0FBSyxNQUFNLEtBQUssSUFBSSxNQUFNLEVBQUU7Z0JBQzFCLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUU7b0JBQzFCLEtBQUssR0FBRyxLQUFLLENBQUM7b0JBQ2QsT0FBTyxJQUFJLENBQUM7aUJBQ2I7YUFDRjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBWaWV3Q29udGFpbmVyUmVmLCBFbGVtZW50UmVmLCBJbmplY3RvciwgVGVtcGxhdGVSZWYsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQge1xuICBGbGV4aWJsZUNvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3ksXG4gIEhvcml6b250YWxDb25uZWN0aW9uUG9zLFxuICBPdmVybGF5LFxuICBPdmVybGF5Q29uZmlnLFxuICBPdmVybGF5UmVmLFxuICBWZXJ0aWNhbENvbm5lY3Rpb25Qb3MsXG4gIFNjcm9sbFN0cmF0ZWd5LFxufSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBUZW1wbGF0ZVBvcnRhbCwgQ29tcG9uZW50UG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsIFBibE5ncmlkQ29tcG9uZW50LCBQYmxOZ3JpZE11bHRpVGVtcGxhdGVSZWdpc3RyeSB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZE92ZXJsYXlQYW5lbENvbXBvbmVudEV4dGVuc2lvbiB9IGZyb20gJy4vY29tcG9uZW50LXJlZ2lzdHJ5LWV4dGVuc2lvbic7XG5pbXBvcnQgeyBQYmxOZ3JpZE92ZXJsYXlQYW5lbFJlZiB9IGZyb20gJy4vb3ZlcmxheS1wYW5lbC1yZWYnO1xuaW1wb3J0IHsgUGJsTmdyaWRPdmVybGF5UGFuZWxDb250ZXh0IH0gZnJvbSAnLi9vdmVybGF5LXBhbmVsLWRlZic7XG5cbmRlY2xhcmUgbW9kdWxlICdAcGVidWxhL25ncmlkL2NvcmUvbGliL3JlZ2lzdHJ5L3R5cGVzJyB7XG4gIGludGVyZmFjZSBQYmxOZ3JpZE11bHRpUmVnaXN0cnlNYXAge1xuICAgIG92ZXJsYXlQYW5lbHM/OlxuICAgICAgfCBQYmxOZ3JpZE11bHRpVGVtcGxhdGVSZWdpc3RyeTxhbnksICdvdmVybGF5UGFuZWxzJz5cbiAgICAgIHwgUGJsTmdyaWRPdmVybGF5UGFuZWxDb21wb25lbnRFeHRlbnNpb248YW55PjtcbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBibE5ncmlkT3ZlcmxheVBhbmVsQ29uZmlnIHtcbiAgaGFzQmFja2Ryb3A/OiBib29sZWFuO1xuICBiYWNrZHJvcENsYXNzPzogc3RyaW5nO1xuICB4UG9zPzogJ2JlZm9yZScgfCAnY2VudGVyJyB8ICdhZnRlcic7XG4gIHlQb3M/OiAnYWJvdmUnIHwgJ2NlbnRlcicgfCAnYmVsb3cnO1xuICBpbnNldFBvcz86IGJvb2xlYW47XG59XG5cbmNvbnN0IERFRkFVTFRfT1ZFUkxBWV9QQU5FTF9DT05GSUc6IFBibE5ncmlkT3ZlcmxheVBhbmVsQ29uZmlnID0ge1xuICBoYXNCYWNrZHJvcDogZmFsc2UsXG4gIHhQb3M6ICdjZW50ZXInLFxuICB5UG9zOiAnY2VudGVyJyxcbiAgaW5zZXRQb3M6IGZhbHNlLFxufTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkT3ZlcmxheVBhbmVsRmFjdG9yeSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX292ZXJsYXk6IE92ZXJsYXksIHByaXZhdGUgem9uZTogTmdab25lKSB7IH1cblxuICBjcmVhdGU8VD4oZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8VD4pOiBQYmxOZ3JpZE92ZXJsYXlQYW5lbDxUPiB7XG4gICAgcmV0dXJuIG5ldyBQYmxOZ3JpZE92ZXJsYXlQYW5lbDxUPih0aGlzLl9vdmVybGF5LCB0aGlzLnpvbmUsIGdyaWQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZE92ZXJsYXlQYW5lbDxUID0gYW55PiB7XG5cbiAgcHJpdmF0ZSB2Y1JlZjogVmlld0NvbnRhaW5lclJlZjtcbiAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3I7XG4gIHByaXZhdGUgX3Njcm9sbFN0cmF0ZWd5OiAoKSA9PiBTY3JvbGxTdHJhdGVneTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9vdmVybGF5OiBPdmVybGF5LFxuICAgICAgICAgICAgICBwcml2YXRlIHpvbmU6IE5nWm9uZSxcbiAgICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PFQ+KSB7XG4gICAgY29uc3QgY29udHJvbGxlciA9IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlci5maW5kKGdyaWQpO1xuICAgIHRoaXMuaW5qZWN0b3IgPSBjb250cm9sbGVyLmluamVjdG9yO1xuICAgIHRoaXMudmNSZWYgPSBjb250cm9sbGVyLmluamVjdG9yLmdldChWaWV3Q29udGFpbmVyUmVmKTtcbiAgICB0aGlzLl9zY3JvbGxTdHJhdGVneSA9ICgpID0+IF9vdmVybGF5LnNjcm9sbFN0cmF0ZWdpZXMucmVwb3NpdGlvbigpO1xuICB9XG5cblxuICAvKipcbiAgICogT3BlbnMgYSBwYW5lbCByZWxhdGl2ZSB0byBhIGNlbGwgZWxlbWVudCB1c2luZyB0aGUgb3ZlcmxheSBwYW5lbCBleHRlbnNpb24gcmVnaXN0cnkgdGVtcGxhdGUvY29tcG9uZW50IHdpdGggdGhlIG5hbWUgcHJvdmlkZWQgaW4gYGV4dE5hbWVgLlxuICAgKiBUaGUgY2VsbCBlbGVtZW50IGlzIHJlZmVyZW5jZWQgYnkgdGhlIGBjb2x1bW5JZGAgYW5kIHRoZSBgcm93UmVuZGVyUG9zaXRpb25gLlxuICAgKlxuICAgKiBJZiB0aGUgYHJvd1JlbmRlclBvc2l0aW9uYCBpcyBcImhlYWRlclwiIG9yIFwiZm9vdGVyXCIgdGhlbiB0aGUgZ3JpZCdzIGhlYWRlciAvIGZvb3RlciByb3dzIGFyZSB0YXJnZXRlZCwgb3RoZXJ3aXNlIHRoZSBudW1iZXIgcHJvdmlkZWQgc2hvdWxkIHJlZmVyZW5jZVxuICAgKiB0aGUgcmVuZGVyZWQgcm93IGluZGV4IHRvIHVzZSB0byBnZXQgdGhlIGNlbGwgZnJvbS5cbiAgICpcbiAgICogPiBOb3RlIHRoYXQgdGhpcyBoZWxwZXIgbWV0aG9kIGRvZXMgbm90IGFsbG93IHRhcmdldGluZyBtZXRhIGNlbGxzLlxuICAgKi9cbiAgb3BlbkdyaWRDZWxsPFQgPSBhbnk+KGV4dE5hbWU6IHN0cmluZywgY29sdW1uSWQ6IHN0cmluZywgcm93UmVuZGVyUG9zaXRpb246IG51bWJlciB8ICdoZWFkZXInIHwgJ2Zvb3RlcicsIGNvbmZpZz86IFBibE5ncmlkT3ZlcmxheVBhbmVsQ29uZmlnLCBkYXRhPzogVCk6IFBibE5ncmlkT3ZlcmxheVBhbmVsUmVmPFQ+IHtcbiAgICBjb25zdCBjb2x1bW4gPSB0aGlzLmdyaWQuY29sdW1uQXBpLmZpbmRDb2x1bW4oY29sdW1uSWQpO1xuICAgIGlmICghY29sdW1uKSB7XG4gICAgICBpZiAodHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmdEZXZNb2RlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGZpbmQgdGhlIGNvbHVtbiAnICsgY29sdW1uSWQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBzZWN0aW9uOiAndGFibGUnIHwgJ2hlYWRlcicgfCAnZm9vdGVyJztcbiAgICBsZXQgcm93UmVuZGVySW5kZXggPSAwO1xuICAgIHN3aXRjaCAocm93UmVuZGVyUG9zaXRpb24pIHtcbiAgICAgIGNhc2UgJ2hlYWRlcic6XG4gICAgICBjYXNlICdmb290ZXInOlxuICAgICAgICBzZWN0aW9uID0gcm93UmVuZGVyUG9zaXRpb247XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKHR5cGVvZiByb3dSZW5kZXJQb3NpdGlvbiA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICBzZWN0aW9uID0gJ3RhYmxlJztcbiAgICAgICAgICByb3dSZW5kZXJJbmRleCA9IHJvd1JlbmRlclBvc2l0aW9uO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGlmICghc2VjdGlvbikge1xuICAgICAgaWYgKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgXCJyb3dSZW5kZXJQb3NpdGlvblwiIHByb3ZpZGVkLCB1c2UgXCJoZWFkZXJcIiwgXCJmb290ZXJcIiBvciBhbnkgbnVtYmVyID49IDAuJyk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZWwgPSBjb2x1bW4gJiYgY29sdW1uLmNvbHVtbkRlZi5xdWVyeUNlbGxFbGVtZW50cyhzZWN0aW9uKVtyb3dSZW5kZXJJbmRleF07XG4gICAgaWYgKCFlbCkge1xuICAgICAgaWYgKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBmaW5kIGEgY2VsbCBmb3IgdGhlIGNvbHVtbiAke2NvbHVtbklkfSBhdCByZW5kZXIgaW5kZXggJHtyb3dSZW5kZXJJbmRleH1gKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5vcGVuKGV4dE5hbWUsIG5ldyBFbGVtZW50UmVmKGVsKSwgY29uZmlnLCBkYXRhKTtcbiAgfVxuXG4gIG9wZW48VCA9IGFueT4oZXh0TmFtZTogc3RyaW5nLCBzb3VyY2U6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LCBjb25maWc/OiBQYmxOZ3JpZE92ZXJsYXlQYW5lbENvbmZpZywgZGF0YT86IFQpOiBQYmxOZ3JpZE92ZXJsYXlQYW5lbFJlZjxUPiB7XG4gICAgY29uZmlnID0gT2JqZWN0LmFzc2lnbih7IC4uLkRFRkFVTFRfT1ZFUkxBWV9QQU5FTF9DT05GSUcgfSwgY29uZmlnIHx8IHt9KTtcbiAgICBjb25zdCBtYXRjaCA9IHRoaXMuZmluZE5hbWVzRXh0ZW5zaW9uKGV4dE5hbWUpO1xuXG4gICAgaWYgKCFtYXRjaCkge1xuICAgICAgaWYgKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBmaW5kIHRoZSBvdmVybGF5IHBhbmVsIHdpdGggdGhlIG5hbWUgJyArIGV4dE5hbWUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgIGNvbnN0IG92ZXJsYXlSZWYgPSB0aGlzLl9jcmVhdGVPdmVybGF5KHNvdXJjZSwgY29uZmlnKTtcbiAgICAgIGNvbnN0IG92ZXJsYXlQYW5lbFJlZiA9IG5ldyBQYmxOZ3JpZE92ZXJsYXlQYW5lbFJlZihvdmVybGF5UmVmLCBkYXRhKTtcbiAgICAgIHRoaXMuX3NldFBvc2l0aW9uKG92ZXJsYXlSZWYuZ2V0Q29uZmlnKCkucG9zaXRpb25TdHJhdGVneSBhcyBGbGV4aWJsZUNvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3ksIGNvbmZpZyk7XG5cbiAgICAgIGlmIChtYXRjaCBpbnN0YW5jZW9mIFBibE5ncmlkTXVsdGlUZW1wbGF0ZVJlZ2lzdHJ5KSB7XG4gICAgICAgIGNvbnN0IHRQb3J0YWwgPSB0aGlzLl9nZXRUZW1wbGF0ZVBvcnRhbChtYXRjaC50UmVmLCBvdmVybGF5UGFuZWxSZWYpO1xuICAgICAgICBjb25zdCB2aWV3UmVmID0gb3ZlcmxheVJlZi5hdHRhY2godFBvcnRhbCk7XG4gICAgICAgIHZpZXdSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIHZpZXdSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgY1BvcnRhbCA9IHRoaXMuX2dldENvbXBvbmVudFBvcnRhbChvdmVybGF5UGFuZWxSZWYsIG1hdGNoKVxuICAgICAgICBjb25zdCBjbXBSZWYgPSBvdmVybGF5UmVmLmF0dGFjaChjUG9ydGFsKTtcbiAgICAgICAgbWF0Y2gub25DcmVhdGVkKG51bGwsIGNtcFJlZik7XG4gICAgICB9XG5cbiAgICAgIG92ZXJsYXlSZWYudXBkYXRlUG9zaXRpb24oKTtcbiAgICAgIHJldHVybiBvdmVybGF5UGFuZWxSZWY7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgY3JlYXRlcyB0aGUgb3ZlcmxheSBmcm9tIHRoZSBwcm92aWRlZCBtZW51J3MgdGVtcGxhdGUgYW5kIHNhdmVzIGl0c1xuICAgKiBPdmVybGF5UmVmIHNvIHRoYXQgaXQgY2FuIGJlIGF0dGFjaGVkIHRvIHRoZSBET00gd2hlbiBvcGVuTWVudSBpcyBjYWxsZWQuXG4gICAqL1xuICBwcml2YXRlIF9jcmVhdGVPdmVybGF5KGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LCBjb25maWc6IFBibE5ncmlkT3ZlcmxheVBhbmVsQ29uZmlnKTogT3ZlcmxheVJlZiB7XG4gICAgY29uc3Qgb3ZlcmxheUNvbmZpZyA9IHRoaXMuX2dldE92ZXJsYXlDb25maWcoZWxlbWVudCwgY29uZmlnKTtcbiAgICBjb25zdCBvdmVybGF5UmVmID0gdGhpcy5fb3ZlcmxheS5jcmVhdGUob3ZlcmxheUNvbmZpZyk7XG4gICAgb3ZlcmxheVJlZi5nZXRDb25maWcoKS5oYXNCYWNrZHJvcCA9ICEhY29uZmlnLmhhc0JhY2tkcm9wXG4gICAgLy8gQ29uc3VtZSB0aGUgYGtleWRvd25FdmVudHNgIGluIG9yZGVyIHRvIHByZXZlbnQgdGhlbSBmcm9tIGdvaW5nIHRvIGFub3RoZXIgb3ZlcmxheS5cbiAgICAvLyBJZGVhbGx5IHdlJ2QgYWxzbyBoYXZlIG91ciBrZXlib2FyZCBldmVudCBsb2dpYyBpbiBoZXJlLCBob3dldmVyIGRvaW5nIHNvIHdpbGxcbiAgICAvLyBicmVhayBhbnlib2R5IHRoYXQgbWF5IGhhdmUgaW1wbGVtZW50ZWQgdGhlIGBNYXRNZW51UGFuZWxgIHRoZW1zZWx2ZXMuXG4gICAgb3ZlcmxheVJlZi5rZXlkb3duRXZlbnRzKCkuc3Vic2NyaWJlKCk7XG5cbiAgICByZXR1cm4gb3ZlcmxheVJlZjtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBidWlsZHMgdGhlIGNvbmZpZ3VyYXRpb24gb2JqZWN0IG5lZWRlZCB0byBjcmVhdGUgdGhlIG92ZXJsYXksIHRoZSBPdmVybGF5U3RhdGUuXG4gICAqIEByZXR1cm5zIE92ZXJsYXlDb25maWdcbiAgICovXG4gIHByaXZhdGUgX2dldE92ZXJsYXlDb25maWcoZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sIGNvbmZpZzogUGJsTmdyaWRPdmVybGF5UGFuZWxDb25maWcpOiBPdmVybGF5Q29uZmlnIHtcbiAgICBjb25zdCBwb3NpdGlvblN0cmF0ZWd5ID0gdGhpcy5fb3ZlcmxheVxuICAgICAgLnBvc2l0aW9uKClcbiAgICAgIC5mbGV4aWJsZUNvbm5lY3RlZFRvKGVsZW1lbnQpXG4gICAgICAud2l0aExvY2tlZFBvc2l0aW9uKCk7XG5cbiAgICByZXR1cm4gbmV3IE92ZXJsYXlDb25maWcoe1xuICAgICAgcG9zaXRpb25TdHJhdGVneSxcbiAgICAgIGJhY2tkcm9wQ2xhc3M6IGNvbmZpZy5iYWNrZHJvcENsYXNzIHx8ICdjZGstb3ZlcmxheS10cmFuc3BhcmVudC1iYWNrZHJvcCcsIC8vIFRPRE86IGRvbid0IHVzZSB0aGUgY2RrJ3MgY2xhc3MsIGNyZWF0ZSBpdFxuICAgICAgc2Nyb2xsU3RyYXRlZ3k6IHRoaXMuX3Njcm9sbFN0cmF0ZWd5KCksXG4gICAgICBkaXJlY3Rpb246IHRoaXMuZ3JpZC5kaXIsXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRUZW1wbGF0ZVBvcnRhbCh0UmVmOiBUZW1wbGF0ZVJlZjxQYmxOZ3JpZE92ZXJsYXlQYW5lbENvbnRleHQ+LCBvdmVybGF5UGFuZWxSZWY6IFBibE5ncmlkT3ZlcmxheVBhbmVsUmVmKSB7XG4gICAgY29uc3QgY29udGV4dDogUGJsTmdyaWRPdmVybGF5UGFuZWxDb250ZXh0ID0ge1xuICAgICAgZ3JpZDogdGhpcy5ncmlkLFxuICAgICAgcmVmOiBvdmVybGF5UGFuZWxSZWYsXG4gICAgfTtcbiAgICByZXR1cm4gbmV3IFRlbXBsYXRlUG9ydGFsKHRSZWYsIHRoaXMudmNSZWYsIGNvbnRleHQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0Q29tcG9uZW50UG9ydGFsKG92ZXJsYXlQYW5lbFJlZjogUGJsTmdyaWRPdmVybGF5UGFuZWxSZWYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRFeHRlbnNpb246IFBibE5ncmlkT3ZlcmxheVBhbmVsQ29tcG9uZW50RXh0ZW5zaW9uPGFueT4pIHtcbiAgICBjb25zdCBwb3J0YWxJbmplY3RvciA9IEluamVjdG9yLmNyZWF0ZSh7XG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiBQYmxOZ3JpZE92ZXJsYXlQYW5lbFJlZiwgdXNlVmFsdWU6IG92ZXJsYXlQYW5lbFJlZiB9LFxuICAgICAgXSxcbiAgICAgIHBhcmVudDogY29tcG9uZW50RXh0ZW5zaW9uLmluamVjdG9yIHx8IHRoaXMuaW5qZWN0b3IsXG4gICAgfSk7XG4gICAgcmV0dXJuIG5ldyBDb21wb25lbnRQb3J0YWwoY29tcG9uZW50RXh0ZW5zaW9uLmNvbXBvbmVudCwgdGhpcy52Y1JlZiwgcG9ydGFsSW5qZWN0b3IsIGNvbXBvbmVudEV4dGVuc2lvbi5jZnIgfHwgbnVsbClcbiAgfVxuXG4gIHByaXZhdGUgX3NldFBvc2l0aW9uKHBvc2l0aW9uU3RyYXRlZ3k6IEZsZXhpYmxlQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneSwgY29uZmlnOiBQYmxOZ3JpZE92ZXJsYXlQYW5lbENvbmZpZykge1xuICAgIGxldCBbb3JpZ2luWCwgb3JpZ2luRmFsbGJhY2tYXTogSG9yaXpvbnRhbENvbm5lY3Rpb25Qb3NbXSA9XG4gICAgICBjb25maWcueFBvcyA9PT0gJ2NlbnRlcidcbiAgICAgICAgPyBbJ2NlbnRlcicsICdjZW50ZXInXVxuICAgICAgICA6IGNvbmZpZy54UG9zID09PSAnYmVmb3JlJyA/IFsnZW5kJywgJ3N0YXJ0J10gOiBbJ3N0YXJ0JywgJ2VuZCddO1xuXG4gICAgbGV0IFtvdmVybGF5WSwgb3ZlcmxheUZhbGxiYWNrWV06IFZlcnRpY2FsQ29ubmVjdGlvblBvc1tdID1cbiAgICAgIGNvbmZpZy55UG9zID09PSAnY2VudGVyJ1xuICAgICAgICA/IFsnY2VudGVyJywgJ2NlbnRlciddXG4gICAgICAgIDogY29uZmlnLnlQb3MgPT09ICdhYm92ZScgPyBbJ2JvdHRvbScsICd0b3AnXSA6IFsndG9wJywgJ2JvdHRvbSddO1xuXG4gICAgbGV0IFtvcmlnaW5ZLCBvcmlnaW5GYWxsYmFja1ldID0gW292ZXJsYXlZLCBvdmVybGF5RmFsbGJhY2tZXTtcbiAgICBsZXQgW292ZXJsYXlYLCBvdmVybGF5RmFsbGJhY2tYXSA9IFtvcmlnaW5YLCBvcmlnaW5GYWxsYmFja1hdO1xuICAgIGxldCBvZmZzZXRZID0gMDtcblxuICAgIGlmICghY29uZmlnLmluc2V0UG9zKSB7XG4gICAgICBpZiAob3ZlcmxheVkgIT09ICdjZW50ZXInKSB7XG4gICAgICAgIG9yaWdpblkgPSBvdmVybGF5WSA9PT0gJ3RvcCcgPyAnYm90dG9tJyA6ICd0b3AnO1xuICAgICAgfVxuICAgICAgaWYgKG92ZXJsYXlGYWxsYmFja1kgIT09ICdjZW50ZXInKSB7XG4gICAgICAgIG9yaWdpbkZhbGxiYWNrWSA9IG92ZXJsYXlGYWxsYmFja1kgPT09ICd0b3AnID8gJ2JvdHRvbScgOiAndG9wJztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwb3NpdGlvblN0cmF0ZWd5LndpdGhQb3NpdGlvbnMoW1xuICAgICAge29yaWdpblgsIG9yaWdpblksIG92ZXJsYXlYLCBvdmVybGF5WSwgb2Zmc2V0WX0sXG4gICAgICB7b3JpZ2luWDogb3JpZ2luRmFsbGJhY2tYLCBvcmlnaW5ZLCBvdmVybGF5WDogb3ZlcmxheUZhbGxiYWNrWCwgb3ZlcmxheVksIG9mZnNldFl9LFxuICAgICAge1xuICAgICAgICBvcmlnaW5YLFxuICAgICAgICBvcmlnaW5ZOiBvcmlnaW5GYWxsYmFja1ksXG4gICAgICAgIG92ZXJsYXlYLFxuICAgICAgICBvdmVybGF5WTogb3ZlcmxheUZhbGxiYWNrWSxcbiAgICAgICAgb2Zmc2V0WTogLW9mZnNldFlcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG9yaWdpblg6IG9yaWdpbkZhbGxiYWNrWCxcbiAgICAgICAgb3JpZ2luWTogb3JpZ2luRmFsbGJhY2tZLFxuICAgICAgICBvdmVybGF5WDogb3ZlcmxheUZhbGxiYWNrWCxcbiAgICAgICAgb3ZlcmxheVk6IG92ZXJsYXlGYWxsYmFja1ksXG4gICAgICAgIG9mZnNldFk6IC1vZmZzZXRZXG4gICAgICB9XG4gICAgXSk7XG4gIH1cblxuICBwcml2YXRlIGZpbmROYW1lc0V4dGVuc2lvbihleHROYW1lOiBzdHJpbmcpIHtcbiAgICBsZXQgbWF0Y2g6IFBibE5ncmlkTXVsdGlUZW1wbGF0ZVJlZ2lzdHJ5PFBibE5ncmlkT3ZlcmxheVBhbmVsQ29udGV4dCwgJ292ZXJsYXlQYW5lbHMnPiB8IFBibE5ncmlkT3ZlcmxheVBhbmVsQ29tcG9uZW50RXh0ZW5zaW9uPGFueT47XG4gICAgdGhpcy5ncmlkLnJlZ2lzdHJ5LmZvck11bHRpKCdvdmVybGF5UGFuZWxzJywgdmFsdWVzID0+IHtcbiAgICAgIGZvciAoY29uc3QgdmFsdWUgb2YgdmFsdWVzKSB7XG4gICAgICAgIGlmICh2YWx1ZS5uYW1lID09PSBleHROYW1lKSB7XG4gICAgICAgICAgbWF0Y2ggPSB2YWx1ZTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBtYXRjaDtcbiAgfVxufVxuXG5cbiJdfQ==