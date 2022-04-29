import { Subject } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { Component, ChangeDetectionStrategy, ElementRef, EventEmitter, Inject, InjectionToken, Input, ChangeDetectorRef, ViewChild, ViewEncapsulation, NgZone, Output, Optional, } from '@angular/core';
import { Directionality } from '@angular/cdk/bidi';
import { CdkVirtualScrollViewport, VIRTUAL_SCROLL_STRATEGY, ScrollDispatcher, ViewportRuler, } from '@angular/cdk/scrolling';
import { PblNgridConfigService, unrx } from '@pebula/ngrid/core';
import { PblNgridBaseVirtualScrollDirective } from './strategies/base-v-scroll.directive';
import { PblVirtualScrollForOf } from './virtual-scroll-for-of';
import { EXT_API_TOKEN } from '../../../ext/grid-ext-api';
import { createScrollWatcherFn } from './scroll-logic/virtual-scroll-watcher';
import { PblNgridAutoSizeVirtualScrollStrategy } from './strategies/cdk-wrappers/auto-size';
import { RowIntersectionTracker } from './row-intersection';
import { resolveScrollStrategy } from './utils';
import { VirtualScrollHightPaging } from './virtual-scroll-height-paging';
import * as i0 from "@angular/core";
import * as i1 from "@pebula/ngrid/core";
import * as i2 from "@angular/cdk/bidi";
import * as i3 from "@angular/cdk/scrolling";
import * as i4 from "@angular/common";
export const DISABLE_INTERSECTION_OBSERVABLE = new InjectionToken('When found in the DI tree and resolves to true, disable the use of IntersectionObserver');
const APP_DEFAULT_VIRTUAL_SCROLL_STRATEGY = () => new PblNgridAutoSizeVirtualScrollStrategy(100, 200);
export class PblCdkVirtualScrollViewportComponent extends CdkVirtualScrollViewport {
    constructor(elRef, cdr, ngZone, config, pblScrollStrategy, dir, scrollDispatcher, viewportRuler, extApi, disableIntersectionObserver) {
        super(elRef, cdr, ngZone, 
        // TODO: Replace with `PblNgridDynamicVirtualScrollStrategy` in v4
        pblScrollStrategy = resolveScrollStrategy(config, pblScrollStrategy, APP_DEFAULT_VIRTUAL_SCROLL_STRATEGY), dir, scrollDispatcher, viewportRuler);
        this.cdr = cdr;
        this.pblScrollStrategy = pblScrollStrategy;
        this.extApi = extApi;
        /**
         * Event emitted when the scrolling state of rows in the grid changes.
         * When scrolling starts `true` is emitted and when the scrolling ends `false` is emitted.
         *
         * The grid is in "scrolling" state from the first scroll event and until 2 animation frames
         * have passed without a scroll event.
         *
         * When scrolling, the emitted value is the direction: -1 or 1
         * When not scrolling, the emitted value is 0.
         *
         * NOTE: This event runs outside the angular zone.
         */
        this.scrolling = new EventEmitter();
        /**
         * Emits an estimation of the current frame rate while scrolling, in a 500ms interval.
         *
         * The frame rate value is the average frame rate from all measurements since the scrolling began.
         * To estimate the frame rate, a significant number of measurements is required so value is emitted every 500 ms.
         * This means that a single scroll or short scroll bursts will not result in a `scrollFrameRate` emissions.
         *
         * Valid on when virtual scrolling is enabled.
         *
         * NOTE: This event runs outside the angular zone.
         *
         * In the future the measurement logic might be replaced with the Frame Timing API
         * See:
         * - https://developers.google.com/web/updates/2014/11/frame-timing-api
         * - https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver
         * - https://github.com/googlearchive/frame-timing-polyfill/wiki/Explainer
         */
        this.scrollFrameRate = new EventEmitter();
        /**
         * The `scrollHeight` of the virtual scroll viewport.
         * The `scrollHeight` is updated by the virtual scroll (update logic and frequency depends on the strategy implementation) through
         * the `setTotalContentSize(size)` method. The input size is used to position a dummy spacer element at a position that mimics the `scrollHeight`.
         *
         * In theory, the size sent to `setTotalContentSize` should equal the `scrollHeight` value, once the browser update's the layout.
         * In reality it does not happen, sometimes they are not equal. Setting a size will result in a different `scrollHeight`.
         * This might be due to changes in measurements when handling sticky meta rows (moving back and forth)
         *
         * Because the position of the dummy spacer element is set through DI the layout will run in the next micro-task after the call to `setTotalContentSize`.
         */
        this.scrollHeight = 0;
        this.ngeRenderedContentSize = 0;
        this.offsetChange$ = new Subject();
        this.offset = 0;
        this._isScrolling = false;
        this.element = elRef.nativeElement;
        this.grid = extApi.grid;
        if (config.has('virtualScroll')) {
            this.wheelModeDefault = config.get('virtualScroll').wheelMode;
        }
        config.onUpdate('virtualScroll').pipe(unrx(this)).subscribe(change => this.wheelModeDefault = change.curr.wheelMode);
        this.enabled = pblScrollStrategy.type && pblScrollStrategy.type !== 'vScrollNone';
        extApi.setViewport(this);
        this.offsetChange = this.offsetChange$.asObservable();
        this._minWidth$ = this.grid.columnApi.totalColumnWidthChange;
        this.intersection = new RowIntersectionTracker(this.element, !!disableIntersectionObserver);
    }
    get isScrolling() { return this._isScrolling; }
    get wheelMode() {
        return this.pblScrollStrategy.wheelMode || this.wheelModeDefault || 'passive';
    }
    /**
     * Get the current bounding client rectangle boxes for the virtual scroll container
     * Since performing these measurements impact performance the values are are cached between request animation frames.
     * I.E 2 subsequent measurements will always return the same value, the next measurement will only take place after
     * the next animation frame (using `requestAnimationFrame` API)
     */
    get getBoundingClientRects() {
        if (!this._boundingClientRects) {
            const innerBox = this._innerBoxHelper.nativeElement.getBoundingClientRect();
            const clientRect = this.element.getBoundingClientRect();
            this._boundingClientRects = {
                clientRect,
                innerWidth: innerBox.width,
                innerHeight: innerBox.height,
                scrollBarWidth: clientRect.width - innerBox.width,
                scrollBarHeight: clientRect.height - innerBox.height,
            };
            const resetCurrentBox = () => this._boundingClientRects = undefined;
            if (this._isScrolling) {
                this.scrolling.pipe(filter(scrolling => scrolling === 0), take(1)).subscribe(resetCurrentBox);
            }
            else {
                requestAnimationFrame(resetCurrentBox);
            }
        }
        return this._boundingClientRects;
    }
    get innerWidth() {
        return this.getBoundingClientRects.innerWidth;
    }
    get outerWidth() {
        return this.getBoundingClientRects.clientRect.width;
    }
    get innerHeight() {
        return this.getBoundingClientRects.innerWidth;
    }
    get outerHeight() {
        return this.getBoundingClientRects.clientRect.height;
    }
    get scrollWidth() {
        return this.element.scrollWidth;
    }
    /**
     * When true, the virtual paging feature is enabled because the virtual content size exceed the supported height of the browser so paging is enable.
     */
    get virtualPagingActive() { var _a, _b; return (_b = (_a = this.heightPaging) === null || _a === void 0 ? void 0 : _a.active) !== null && _b !== void 0 ? _b : false; }
    ngOnInit() {
        this.pblScrollStrategy.attachExtApi(this.extApi);
        if (this.enabled) {
            // Enabling virtual scroll event with browser height limit
            // Based on: http://jsfiddle.net/SDa2B/263/
            this.heightPaging = new VirtualScrollHightPaging(this);
        }
        super.ngOnInit();
        // Init the scrolling watcher which track scroll events an emits `scrolling` and `scrollFrameRate` events.
        this.ngZone.runOutsideAngular(() => this.elementScrolled().subscribe(createScrollWatcherFn(this)));
    }
    ngAfterViewInit() {
        // If virtual scroll is disabled (`NoVirtualScrollStrategy`) we need to disable any effect applied
        // by the viewport, wrapping the content injected to it.
        // The main effect is the grid having height 0 at all times, unless the height is explicitly set.
        // This happens because the content taking out of the layout, wrapped in absolute positioning.
        // Additionally, the host itself (viewport) is set to contain: strict.
        const { grid } = this;
        if (this.enabled) {
            this.forOf = new PblVirtualScrollForOf(this.extApi, this.ngZone);
            if (!this.heightPaging.active) {
                this.forOf.wheelControl.wheelListen();
            }
            // `wheel` mode does not work well with the workaround to fix height limit, so we disable it when it's on
            this.heightPaging.activeChanged
                .subscribe(() => {
                if (this.heightPaging.active) {
                    this.forOf.wheelControl.wheelUnListen();
                }
                else {
                    this.forOf.wheelControl.wheelListen();
                }
            });
        }
        this.scrolling
            .pipe(unrx(this))
            .subscribe(isScrolling => {
            this._isScrolling = !!isScrolling;
            if (isScrolling) {
                grid.addClass('pbl-ngrid-scrolling');
            }
            else {
                grid.removeClass('pbl-ngrid-scrolling');
            }
        });
    }
    ngOnDestroy() {
        var _a;
        this.intersection.destroy();
        (_a = this.heightPaging) === null || _a === void 0 ? void 0 : _a.dispose();
        super.ngOnDestroy();
        this.detachViewPort();
        this.offsetChange$.complete();
        unrx.kill(this);
    }
    reMeasureCurrentRenderedContent() {
        this.pblScrollStrategy.onContentRendered();
    }
    measureScrollOffset(from) {
        const scrollOffset = super.measureScrollOffset(from);
        return (!from || from === 'top') && this.heightPaging ? this.heightPaging.transformScrollOffset(scrollOffset) : scrollOffset;
    }
    getOffsetToRenderedContentStart() {
        var _a, _b;
        const renderedContentStart = super.getOffsetToRenderedContentStart();
        return (_b = (_a = this.heightPaging) === null || _a === void 0 ? void 0 : _a.transformOffsetToRenderedContentStart(renderedContentStart)) !== null && _b !== void 0 ? _b : renderedContentStart;
    }
    setRenderedContentOffset(offset, to = 'to-start') {
        var _a;
        if ((_a = this.heightPaging) === null || _a === void 0 ? void 0 : _a.active) {
            offset = this.heightPaging.transformRenderedContentOffset(offset, to);
        }
        super.setRenderedContentOffset(offset, to);
        if (this.enabled) {
            if (this.offset !== offset) {
                this.offset = offset;
                if (!this.isCDPending) {
                    this.isCDPending = true;
                    this.ngZone.runOutsideAngular(() => Promise.resolve()
                        .then(() => {
                        this.isCDPending = false;
                        this.offsetChange$.next(this.offset);
                    }));
                }
            }
        }
    }
    setTotalContentSize(size) {
        var _a;
        if ((_a = this.heightPaging) === null || _a === void 0 ? void 0 : _a.shouldTransformTotalContentSize(size)) {
            size = this.heightPaging.transformTotalContentSize(size, super.measureScrollOffset());
        }
        super.setTotalContentSize(size);
        // TODO(shlomiassaf)[perf, 3]: run this once... (aggregate all calls within the same animation frame)
        requestAnimationFrame(() => {
            this.scrollHeight = this.element.scrollHeight; //size;
            this.updateFiller();
            // We must trigger a change detection cycle because the filler div element is updated through bindings
            this.cdr.markForCheck();
        });
    }
    /** Measure the combined size of all of the rendered items. */
    measureRenderedContentSize() {
        let size = super.measureRenderedContentSize();
        if (this.orientation === 'vertical') {
            size -= this.stickyRowHeaderContainer.offsetHeight + this.stickyRowFooterContainer.offsetHeight;
            // Compensate for hz scroll bar, if exists, only in non virtual scroll mode.
            if (!this.enabled) {
                size += this.outerHeight - this.innerHeight;
            }
        }
        return this.ngeRenderedContentSize = size;
    }
    checkViewportSize() {
        // TODO: Check for changes in `CdkVirtualScrollViewport` source code, when resizing is handled!
        // see https://github.com/angular/material2/blob/28fb3abe77c5336e4739c820584ec99c23f1ae38/src/cdk/scrolling/virtual-scroll-viewport.ts#L341
        const prev = this.getViewportSize();
        super.checkViewportSize();
        if (prev !== this.getViewportSize()) {
            this.updateFiller();
        }
    }
    detachViewPort() {
        if (this.forOf) {
            this.forOf.destroy();
            this.forOf = undefined;
        }
    }
    /**
     * TODO(REFACTOR_REF 1): Move to use rowApi so we can accept rows/cells and not html elements.
     * It will allow us to bring into view rows as well.
     * This will change the methods signature!
     * @internal
     */
    _scrollIntoView(cellElement) {
        const container = this.element;
        const elBox = cellElement.getBoundingClientRect();
        const containerBox = this.getBoundingClientRects.clientRect;
        // Vertical handling.
        // We have vertical virtual scroll, so here we use the virtual scroll API to scroll into the target
        if (elBox.top < containerBox.top) { // out from top
            const offset = elBox.top - containerBox.top;
            this.scrollToOffset(this.measureScrollOffset() + offset);
        }
        else if (elBox.bottom > containerBox.bottom) { // out from bottom
            const offset = elBox.bottom - (containerBox.bottom - this.getScrollBarThickness('horizontal'));
            this.scrollToOffset(this.measureScrollOffset() + offset);
        }
        // Horizontal handling.
        // We DON'T have horizontal virtual scroll, so here we use the DOM API to scroll into the target
        // TODO: When implementing horizontal virtual scroll, refactor this as well.
        if (elBox.left < containerBox.left) { // out from left
            const offset = elBox.left - containerBox.left;
            container.scroll(container.scrollLeft + offset, container.scrollTop);
        }
        else if (elBox.right > containerBox.right) { // out from right
            const offset = elBox.right - (containerBox.right - this.getScrollBarThickness('vertical'));
            container.scroll(container.scrollLeft + offset, container.scrollTop);
        }
    }
    onSourceLengthChange(prev, curr) {
        this.checkViewportSize();
        this.updateFiller();
    }
    attach(forOf) {
        super.attach(forOf);
        const scrollStrategy = this.pblScrollStrategy instanceof PblNgridBaseVirtualScrollDirective
            ? this.pblScrollStrategy._scrollStrategy
            : this.pblScrollStrategy;
        if (scrollStrategy instanceof PblNgridAutoSizeVirtualScrollStrategy) {
            scrollStrategy.averager.setRowInfo(forOf);
        }
    }
    setRenderedRange(range) {
        super.setRenderedRange(range);
    }
    getScrollBarThickness(location) {
        switch (location) {
            case 'horizontal':
                return this.outerHeight - this.innerHeight;
            case 'vertical':
                return this.outerWidth - this.innerWidth;
        }
    }
    updateFiller() {
        this.measureRenderedContentSize();
        if (this.grid.noFiller) {
            this.pblFillerHeight = undefined;
        }
        else {
            this.pblFillerHeight = this.getViewportSize() >= this.ngeRenderedContentSize ?
                `calc(100% - ${this.ngeRenderedContentSize}px)`
                : undefined;
        }
    }
}
/** @nocollapse */ PblCdkVirtualScrollViewportComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblCdkVirtualScrollViewportComponent, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i0.NgZone }, { token: i1.PblNgridConfigService }, { token: VIRTUAL_SCROLL_STRATEGY, optional: true }, { token: i2.Directionality, optional: true }, { token: i3.ScrollDispatcher }, { token: i3.ViewportRuler }, { token: EXT_API_TOKEN }, { token: DISABLE_INTERSECTION_OBSERVABLE, optional: true }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ PblCdkVirtualScrollViewportComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.0", type: PblCdkVirtualScrollViewportComponent, selector: "pbl-cdk-virtual-scroll-viewport", inputs: { stickyRowHeaderContainer: "stickyRowHeaderContainer", stickyRowFooterContainer: "stickyRowFooterContainer" }, outputs: { scrolling: "scrolling", scrollFrameRate: "scrollFrameRate" }, host: { properties: { "class.cdk-virtual-scroll-disabled": "!enabled", "class.cdk-virtual-scroll-orientation-horizontal": "orientation === \"horizontal\"", "class.cdk-virtual-scroll-orientation-vertical": "orientation === \"vertical\"" }, classAttribute: "cdk-virtual-scroll-viewport" }, viewQueries: [{ propertyName: "_innerBoxHelper", first: true, predicate: ["innerBoxHelper"], descendants: true, static: true }], usesInheritance: true, ngImport: i0, template: "<p #innerBoxHelper class=\"cdk-virtual-scroll-inner-width\"></p>\n<ng-content select=\".cdk-virtual-scroll-before-content-wrapper\"></ng-content>\n<!--\n  Wrap the rendered content in an element that will be used to offset it based on the scroll\n  position.\n-->\n<div #contentWrapper [class.cdk-virtual-scroll-content-wrapper]=\"enabled\" style=\"width: 100%\" [style.minWidth.px]=\"_minWidth$ | async\">\n  <ng-content></ng-content>\n</div>\n\n<!--\n  Spacer used to force the scrolling container to the correct size for the *total* number of items\n  so that the scrollbar captures the size of the entire data set.\n-->\n<div *ngIf=\"enabled\" class=\"cdk-virtual-scroll-spacer\"\n     [style.width]=\"_totalContentWidth\" [style.height]=\"_totalContentHeight\"></div>\n<div *ngIf=\"pblFillerHeight && enabled\"\n    class=\"pbl-ngrid-space-fill\"\n    [style.minWidth.px]=\"_minWidth$ | async\"\n    [style.top.px]=\"ngeRenderedContentSize\"\n    [style.height]=\"pblFillerHeight\"></div>\n", styles: ["pbl-cdk-virtual-scroll-viewport{display:block;position:relative;overflow:auto;contain:strict;transform:translateZ(0);will-change:scroll-position;-webkit-overflow-scrolling:touch}pbl-cdk-virtual-scroll-viewport .cdk-virtual-scroll-content-wrapper{position:absolute;top:0;left:0;contain:content}[dir=rtl] pbl-cdk-virtual-scroll-viewport .cdk-virtual-scroll-content-wrapper{right:0;left:auto}.cdk-virtual-scroll-inner-width{width:100%;height:100%;position:absolute;margin:0!important;padding:0!important}.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper{min-height:100%}.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>dl:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>ol:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>table:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>ul:not([cdkVirtualFor]){padding-left:0;padding-right:0;margin-left:0;margin-right:0;border-left-width:0;border-right-width:0;outline:none}.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper{min-width:100%}.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>dl:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>ol:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>table:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>ul:not([cdkVirtualFor]){padding-top:0;padding-bottom:0;margin-top:0;margin-bottom:0;border-top-width:0;border-bottom-width:0;outline:none}.cdk-virtual-scroll-spacer{position:absolute;top:0;left:0;height:1px;width:1px;transform-origin:0 0}[dir=rtl] .cdk-virtual-scroll-spacer{right:0;left:auto;transform-origin:100% 0}.pbl-ngrid-space-fill{position:absolute;left:0;width:100%}"], directives: [{ type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "async": i4.AsyncPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: PblCdkVirtualScrollViewportComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'pbl-cdk-virtual-scroll-viewport',
                    templateUrl: 'virtual-scroll-viewport.component.html',
                    styleUrls: ['virtual-scroll-viewport.component.scss'],
                    host: {
                        class: 'cdk-virtual-scroll-viewport',
                        '[class.cdk-virtual-scroll-disabled]': '!enabled',
                        '[class.cdk-virtual-scroll-orientation-horizontal]': 'orientation === "horizontal"',
                        '[class.cdk-virtual-scroll-orientation-vertical]': 'orientation === "vertical"'
                    },
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i0.NgZone }, { type: i1.PblNgridConfigService }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [VIRTUAL_SCROLL_STRATEGY]
                }] }, { type: i2.Directionality, decorators: [{
                    type: Optional
                }] }, { type: i3.ScrollDispatcher }, { type: i3.ViewportRuler }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [EXT_API_TOKEN]
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [DISABLE_INTERSECTION_OBSERVABLE]
                }] }]; }, propDecorators: { _innerBoxHelper: [{
                type: ViewChild,
                args: ['innerBoxHelper', { static: true }]
            }], stickyRowHeaderContainer: [{
                type: Input
            }], stickyRowFooterContainer: [{
                type: Input
            }], scrolling: [{
                type: Output
            }], scrollFrameRate: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbC1zY3JvbGwtdmlld3BvcnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3JpZC9zcmMvbGliL2dyaWQvZmVhdHVyZXMvdmlydHVhbC1zY3JvbGwvdmlydHVhbC1zY3JvbGwtdmlld3BvcnQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3JpZC9zcmMvbGliL2dyaWQvZmVhdHVyZXMvdmlydHVhbC1zY3JvbGwvdmlydHVhbC1zY3JvbGwtdmlld3BvcnQuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlDLE9BQU8sRUFFTCxTQUFTLEVBQ1QsdUJBQXVCLEVBQ3ZCLFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLGNBQWMsRUFDZCxLQUFLLEVBQ0wsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxpQkFBaUIsRUFDakIsTUFBTSxFQUNOLE1BQU0sRUFDTixRQUFRLEdBR1QsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRW5ELE9BQU8sRUFDTCx3QkFBd0IsRUFDeEIsdUJBQXVCLEVBQ3ZCLGdCQUFnQixFQUVoQixhQUFhLEdBQ2QsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsSUFBSSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFHakUsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLE1BQU0sc0NBQXNDLENBQUE7QUFFekYsT0FBTyxFQUEwQixxQkFBcUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3hGLE9BQU8sRUFBRSxhQUFhLEVBQWdDLE1BQU0s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c0JBQXNCLENBQUMsQ0FBQztnQkFDNUUsZUFBZSxJQUFJLENBQUMsc0JBQXNCLEtBQUs7Z0JBQy9DLENBQUMsQ0FBQyxTQUFTLENBQ1o7U0FDRjtJQUNILENBQUM7O29KQXJZVSxvQ0FBb0Msd0lBaUpmLHVCQUF1Qix3SUFJbkMsYUFBYSxhQUNELCtCQUErQjt3SUF0SnBELG9DQUFvQyxnc0JDcEVqRCxxK0JBcUJBOzJGRCtDYSxvQ0FBb0M7a0JBYmhELFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGlDQUFpQztvQkFDM0MsV0FBVyxFQUFFLHdDQUF3QztvQkFDckQsU0FBUyxFQUFFLENBQUUsd0NBQXdDLENBQUU7b0JBQ3ZELElBQUksRUFBRTt3QkFDSixLQUFLLEVBQUUsNkJBQTZCO3dCQUNwQyxxQ0FBcUMsRUFBRSxVQUFVO3dCQUNqRCxtREFBbUQsRUFBRSw4QkFBOEI7d0JBQ25GLGlEQUFpRCxFQUFFLDRCQUE0QjtxQkFDaEY7b0JBQ0QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRDs7MEJBa0pjLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMsdUJBQXVCOzswQkFDMUMsUUFBUTs7MEJBR1IsTUFBTTsyQkFBQyxhQUFhOzswQkFDcEIsUUFBUTs7MEJBQUksTUFBTTsyQkFBQywrQkFBK0I7NENBaEpoQixlQUFlO3NCQUE3RCxTQUFTO3VCQUFDLGdCQUFnQixFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtnQkFVcEMsd0JBQXdCO3NCQUFoQyxLQUFLO2dCQUNHLHdCQUF3QjtzQkFBaEMsS0FBSztnQkFjSSxTQUFTO3NCQUFsQixNQUFNO2dCQW1CRyxlQUFlO3NCQUF4QixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ29tcG9uZW50LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3QsXG4gIEluamVjdGlvblRva2VuLFxuICBJbnB1dCxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIE5nWm9uZSxcbiAgT3V0cHV0LFxuICBPcHRpb25hbCxcbiAgT25Jbml0LFxuICBPbkRlc3Ryb3ksXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IExpc3RSYW5nZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2xsZWN0aW9ucyc7XG5pbXBvcnQge1xuICBDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQsXG4gIFZJUlRVQUxfU0NST0xMX1NUUkFURUdZLFxuICBTY3JvbGxEaXNwYXRjaGVyLFxuICBDZGtWaXJ0dWFsRm9yT2YsXG4gIFZpZXdwb3J0UnVsZXIsXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xuaW1wb3J0IHsgUGJsTmdyaWRDb25maWdTZXJ2aWNlLCB1bnJ4IH0gZnJvbSAnQHBlYnVsYS9uZ3JpZC9jb3JlJztcblxuaW1wb3J0IHsgX1BibE5ncmlkQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vdG9rZW5zJztcbmltcG9ydCB7IFBibE5ncmlkQmFzZVZpcnR1YWxTY3JvbGxEaXJlY3RpdmUgfSBmcm9tICcuL3N0cmF0ZWdpZXMvYmFzZS12LXNjcm9sbC5kaXJlY3RpdmUnXG5pbXBvcnQgeyBQYmxOZ3JpZFZpcnR1YWxTY3JvbGxTdHJhdGVneSB9IGZyb20gJy4vc3RyYXRlZ2llcy90eXBlcyc7XG5pbXBvcnQgeyBOZ2VWaXJ0dWFsVGFibGVSb3dJbmZvLCBQYmxWaXJ0dWFsU2Nyb2xsRm9yT2YgfSBmcm9tICcuL3ZpcnR1YWwtc2Nyb2xsLWZvci1vZic7XG5pbXBvcnQgeyBFWFRfQVBJX1RPS0VOLCBQYmxOZ3JpZEludGVybmFsRXh0ZW5zaW9uQXBpIH0gZnJvbSAnLi4vLi4vLi4vZXh0L2dyaWQtZXh0LWFwaSc7XG5pbXBvcnQgeyBjcmVhdGVTY3JvbGxXYXRjaGVyRm4gfSBmcm9tICcuL3Njcm9sbC1sb2dpYy92aXJ0dWFsLXNjcm9sbC13YXRjaGVyJztcbmltcG9ydCB7IFBibE5ncmlkQXV0b1NpemVWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3kgfSBmcm9tICcuL3N0cmF0ZWdpZXMvY2RrLXdyYXBwZXJzL2F1dG8tc2l6ZSc7XG5pbXBvcnQgeyBSb3dJbnRlcnNlY3Rpb25UcmFja2VyIH0gZnJvbSAnLi9yb3ctaW50ZXJzZWN0aW9uJztcbmltcG9ydCB7IHJlc29sdmVTY3JvbGxTdHJhdGVneSB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHsgVmlydHVhbFNjcm9sbEhpZ2h0UGFnaW5nIH0gZnJvbSAnLi92aXJ0dWFsLXNjcm9sbC1oZWlnaHQtcGFnaW5nJztcblxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvY29yZS9saWIvY29uZmlndXJhdGlvbi90eXBlJyB7XG4gIGludGVyZmFjZSBQYmxOZ3JpZENvbmZpZyB7XG4gICAgdmlydHVhbFNjcm9sbD86IHtcbiAgICAgIHdoZWVsTW9kZT86IFBibE5ncmlkQmFzZVZpcnR1YWxTY3JvbGxEaXJlY3RpdmVbJ3doZWVsTW9kZSddO1xuICAgICAgZGVmYXVsdFN0cmF0ZWd5PygpOiBQYmxOZ3JpZFZpcnR1YWxTY3JvbGxTdHJhdGVneTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IERJU0FCTEVfSU5URVJTRUNUSU9OX09CU0VSVkFCTEUgPSBuZXcgSW5qZWN0aW9uVG9rZW48Ym9vbGVhbj4oJ1doZW4gZm91bmQgaW4gdGhlIERJIHRyZWUgYW5kIHJlc29sdmVzIHRvIHRydWUsIGRpc2FibGUgdGhlIHVzZSBvZiBJbnRlcnNlY3Rpb25PYnNlcnZlcicpO1xuY29uc3QgQVBQX0RFRkFVTFRfVklSVFVBTF9TQ1JPTExfU1RSQVRFR1kgPSAoKSA9PiBuZXcgUGJsTmdyaWRBdXRvU2l6ZVZpcnR1YWxTY3JvbGxTdHJhdGVneSgxMDAsIDIwMCk7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3BibC1jZGstdmlydHVhbC1zY3JvbGwtdmlld3BvcnQnLFxuICB0ZW1wbGF0ZVVybDogJ3ZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbICd2aXJ0dWFsLXNjcm9sbC12aWV3cG9ydC5jb21wb25lbnQuc2NzcycgXSxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnY2RrLXZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0JyxcbiAgICAnW2NsYXNzLmNkay12aXJ0dWFsLXNjcm9sbC1kaXNhYmxlZF0nOiAnIWVuYWJsZWQnLFxuICAgICdbY2xhc3MuY2RrLXZpcnR1YWwtc2Nyb2xsLW9yaWVudGF0aW9uLWhvcml6b250YWxdJzogJ29yaWVudGF0aW9uID09PSBcImhvcml6b250YWxcIicsXG4gICAgJ1tjbGFzcy5jZGstdmlydHVhbC1zY3JvbGwtb3JpZW50YXRpb24tdmVydGljYWxdJzogJ29yaWVudGF0aW9uID09PSBcInZlcnRpY2FsXCInXG4gIH0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFBibENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydENvbXBvbmVudCBleHRlbmRzIENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICBnZXQgaXNTY3JvbGxpbmcoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9pc1Njcm9sbGluZzsgfVxuICByZWFkb25seSBlbmFibGVkOiBib29sZWFuO1xuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgQFZpZXdDaGlsZCgnaW5uZXJCb3hIZWxwZXInLCB7IHN0YXRpYzogdHJ1ZSB9KSBfaW5uZXJCb3hIZWxwZXI6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuXG4gIC8qKlxuICAgKiBFbWl0cyB0aGUgb2Zmc2V0IChpbiBwaXhlbHMpIG9mIHRoZSByZW5kZXJlZCBjb250ZW50IGV2ZXJ5IHRpbWUgaXQgY2hhbmdlcy5cbiAgICogVGhlIGVtaXNzaW9uIGlzIGRvbmUgT1VUU0lERSBvZiBhbmd1bGFyIChpLmUuIG5vIGNoYW5nZSBkZXRlY3Rpb24gY3ljbGUgaXMgdHJpZ2dlcmVkKS5cbiAgICpcbiAgICogTm90ZSB0aGF0IHdoZW4gbm90IGVuYWJsZWQgKGkuZSBgTm9WaXJ0dWFsU2Nyb2xsU3RyYXRlZ3lgIGlzIHVzZWQpIHRoZXJlIGFyZSBubyBlbWlzc2lvbnMuXG4gICAqL1xuICByZWFkb25seSBvZmZzZXRDaGFuZ2U6IE9ic2VydmFibGU8bnVtYmVyPjtcblxuICBASW5wdXQoKSBzdGlja3lSb3dIZWFkZXJDb250YWluZXI6IEhUTUxFbGVtZW50O1xuICBASW5wdXQoKSBzdGlja3lSb3dGb290ZXJDb250YWluZXI6IEhUTUxFbGVtZW50O1xuXG4gIC8qKlxuICAgKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHNjcm9sbGluZyBzdGF0ZSBvZiByb3dzIGluIHRoZSBncmlkIGNoYW5nZXMuXG4gICAqIFdoZW4gc2Nyb2xsaW5nIHN0YXJ0cyBgdHJ1ZWAgaXMgZW1pdHRlZCBhbmQgd2hlbiB0aGUgc2Nyb2xsaW5nIGVuZHMgYGZhbHNlYCBpcyBlbWl0dGVkLlxuICAgKlxuICAgKiBUaGUgZ3JpZCBpcyBpbiBcInNjcm9sbGluZ1wiIHN0YXRlIGZyb20gdGhlIGZpcnN0IHNjcm9sbCBldmVudCBhbmQgdW50aWwgMiBhbmltYXRpb24gZnJhbWVzXG4gICAqIGhhdmUgcGFzc2VkIHdpdGhvdXQgYSBzY3JvbGwgZXZlbnQuXG4gICAqXG4gICAqIFdoZW4gc2Nyb2xsaW5nLCB0aGUgZW1pdHRlZCB2YWx1ZSBpcyB0aGUgZGlyZWN0aW9uOiAtMSBvciAxXG4gICAqIFdoZW4gbm90IHNjcm9sbGluZywgdGhlIGVtaXR0ZWQgdmFsdWUgaXMgMC5cbiAgICpcbiAgICogTk9URTogVGhpcyBldmVudCBydW5zIG91dHNpZGUgdGhlIGFuZ3VsYXIgem9uZS5cbiAgICovXG4gIEBPdXRwdXQoKSBzY3JvbGxpbmcgPSBuZXcgRXZlbnRFbWl0dGVyPCAtMSB8IDAgfCAxID4oKTtcblxuICAvKipcbiAgICogRW1pdHMgYW4gZXN0aW1hdGlvbiBvZiB0aGUgY3VycmVudCBmcmFtZSByYXRlIHdoaWxlIHNjcm9sbGluZywgaW4gYSA1MDBtcyBpbnRlcnZhbC5cbiAgICpcbiAgICogVGhlIGZyYW1lIHJhdGUgdmFsdWUgaXMgdGhlIGF2ZXJhZ2UgZnJhbWUgcmF0ZSBmcm9tIGFsbCBtZWFzdXJlbWVudHMgc2luY2UgdGhlIHNjcm9sbGluZyBiZWdhbi5cbiAgICogVG8gZXN0aW1hdGUgdGhlIGZyYW1lIHJhdGUsIGEgc2lnbmlmaWNhbnQgbnVtYmVyIG9mIG1lYXN1cmVtZW50cyBpcyByZXF1aXJlZCBzbyB2YWx1ZSBpcyBlbWl0dGVkIGV2ZXJ5IDUwMCBtcy5cbiAgICogVGhpcyBtZWFucyB0aGF0IGEgc2luZ2xlIHNjcm9sbCBvciBzaG9ydCBzY3JvbGwgYnVyc3RzIHdpbGwgbm90IHJlc3VsdCBpbiBhIGBzY3JvbGxGcmFtZVJhdGVgIGVtaXNzaW9ucy5cbiAgICpcbiAgICogVmFsaWQgb24gd2hlbiB2aXJ0dWFsIHNjcm9sbGluZyBpcyBlbmFibGVkLlxuICAgKlxuICAgKiBOT1RFOiBUaGlzIGV2ZW50IHJ1bnMgb3V0c2lkZSB0aGUgYW5ndWxhciB6b25lLlxuICAgKlxuICAgKiBJbiB0aGUgZnV0dXJlIHRoZSBtZWFzdXJlbWVudCBsb2dpYyBtaWdodCBiZSByZXBsYWNlZCB3aXRoIHRoZSBGcmFtZSBUaW1pbmcgQVBJXG4gICAqIFNlZTpcbiAgICogLSBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS93ZWIvdXBkYXRlcy8yMDE0LzExL2ZyYW1lLXRpbWluZy1hcGlcbiAgICogLSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvUGVyZm9ybWFuY2VPYnNlcnZlclxuICAgKiAtIGh0dHBzOi8vZ2l0aHViLmNvbS9nb29nbGVhcmNoaXZlL2ZyYW1lLXRpbWluZy1wb2x5ZmlsbC93aWtpL0V4cGxhaW5lclxuICAgKi9cbiAgQE91dHB1dCgpIHNjcm9sbEZyYW1lUmF0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gIC8qKlxuICAgKiBUaGUgYHNjcm9sbEhlaWdodGAgb2YgdGhlIHZpcnR1YWwgc2Nyb2xsIHZpZXdwb3J0LlxuICAgKiBUaGUgYHNjcm9sbEhlaWdodGAgaXMgdXBkYXRlZCBieSB0aGUgdmlydHVhbCBzY3JvbGwgKHVwZGF0ZSBsb2dpYyBhbmQgZnJlcXVlbmN5IGRlcGVuZHMgb24gdGhlIHN0cmF0ZWd5IGltcGxlbWVudGF0aW9uKSB0aHJvdWdoXG4gICAqIHRoZSBgc2V0VG90YWxDb250ZW50U2l6ZShzaXplKWAgbWV0aG9kLiBUaGUgaW5wdXQgc2l6ZSBpcyB1c2VkIHRvIHBvc2l0aW9uIGEgZHVtbXkgc3BhY2VyIGVsZW1lbnQgYXQgYSBwb3NpdGlvbiB0aGF0IG1pbWljcyB0aGUgYHNjcm9sbEhlaWdodGAuXG4gICAqXG4gICAqIEluIHRoZW9yeSwgdGhlIHNpemUgc2VudCB0byBgc2V0VG90YWxDb250ZW50U2l6ZWAgc2hvdWxkIGVxdWFsIHRoZSBgc2Nyb2xsSGVpZ2h0YCB2YWx1ZSwgb25jZSB0aGUgYnJvd3NlciB1cGRhdGUncyB0aGUgbGF5b3V0LlxuICAgKiBJbiByZWFsaXR5IGl0IGRvZXMgbm90IGhhcHBlbiwgc29tZXRpbWVzIHRoZXkgYXJlIG5vdCBlcXVhbC4gU2V0dGluZyBhIHNpemUgd2lsbCByZXN1bHQgaW4gYSBkaWZmZXJlbnQgYHNjcm9sbEhlaWdodGAuXG4gICAqIFRoaXMgbWlnaHQgYmUgZHVlIHRvIGNoYW5nZXMgaW4gbWVhc3VyZW1lbnRzIHdoZW4gaGFuZGxpbmcgc3RpY2t5IG1ldGEgcm93cyAobW92aW5nIGJhY2sgYW5kIGZvcnRoKVxuICAgKlxuICAgKiBCZWNhdXNlIHRoZSBwb3NpdGlvbiBvZiB0aGUgZHVtbXkgc3BhY2VyIGVsZW1lbnQgaXMgc2V0IHRocm91Z2ggREkgdGhlIGxheW91dCB3aWxsIHJ1biBpbiB0aGUgbmV4dCBtaWNyby10YXNrIGFmdGVyIHRoZSBjYWxsIHRvIGBzZXRUb3RhbENvbnRlbnRTaXplYC5cbiAgICovXG4gIHNjcm9sbEhlaWdodCA9IDA7XG5cbiAgbmdlUmVuZGVyZWRDb250ZW50U2l6ZSA9IDA7XG4gIHBibEZpbGxlckhlaWdodDogc3RyaW5nO1xuXG4gIGdldCB3aGVlbE1vZGUoKTogUGJsTmdyaWRCYXNlVmlydHVhbFNjcm9sbERpcmVjdGl2ZVsnd2hlZWxNb2RlJ10ge1xuICAgIHJldHVybiAodGhpcy5wYmxTY3JvbGxTdHJhdGVneSBhcyBQYmxOZ3JpZEJhc2VWaXJ0dWFsU2Nyb2xsRGlyZWN0aXZlKS53aGVlbE1vZGUgfHwgdGhpcy53aGVlbE1vZGVEZWZhdWx0IHx8ICdwYXNzaXZlJztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGN1cnJlbnQgYm91bmRpbmcgY2xpZW50IHJlY3RhbmdsZSBib3hlcyBmb3IgdGhlIHZpcnR1YWwgc2Nyb2xsIGNvbnRhaW5lclxuICAgKiBTaW5jZSBwZXJmb3JtaW5nIHRoZXNlIG1lYXN1cmVtZW50cyBpbXBhY3QgcGVyZm9ybWFuY2UgdGhlIHZhbHVlcyBhcmUgYXJlIGNhY2hlZCBiZXR3ZWVuIHJlcXVlc3QgYW5pbWF0aW9uIGZyYW1lcy5cbiAgICogSS5FIDIgc3Vic2VxdWVudCBtZWFzdXJlbWVudHMgd2lsbCBhbHdheXMgcmV0dXJuIHRoZSBzYW1lIHZhbHVlLCB0aGUgbmV4dCBtZWFzdXJlbWVudCB3aWxsIG9ubHkgdGFrZSBwbGFjZSBhZnRlclxuICAgKiB0aGUgbmV4dCBhbmltYXRpb24gZnJhbWUgKHVzaW5nIGByZXF1ZXN0QW5pbWF0aW9uRnJhbWVgIEFQSSlcbiAgICovXG4gIGdldCBnZXRCb3VuZGluZ0NsaWVudFJlY3RzKCk6IHsgY2xpZW50UmVjdDogRE9NUmVjdDsgaW5uZXJXaWR0aDogbnVtYmVyOyBpbm5lckhlaWdodDogbnVtYmVyOyBzY3JvbGxCYXJXaWR0aDogbnVtYmVyOyBzY3JvbGxCYXJIZWlnaHQ6IG51bWJlcjsgfSB7XG4gICAgaWYgKCF0aGlzLl9ib3VuZGluZ0NsaWVudFJlY3RzKSB7XG4gICAgICBjb25zdCBpbm5lckJveCA9IHRoaXMuX2lubmVyQm94SGVscGVyLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBjb25zdCBjbGllbnRSZWN0ID0gdGhpcy5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgdGhpcy5fYm91bmRpbmdDbGllbnRSZWN0cyA9IHtcbiAgICAgICAgY2xpZW50UmVjdCxcbiAgICAgICAgaW5uZXJXaWR0aDogaW5uZXJCb3gud2lkdGgsXG4gICAgICAgIGlubmVySGVpZ2h0OiBpbm5lckJveC5oZWlnaHQsXG4gICAgICAgIHNjcm9sbEJhcldpZHRoOiBjbGllbnRSZWN0LndpZHRoIC0gaW5uZXJCb3gud2lkdGgsXG4gICAgICAgIHNjcm9sbEJhckhlaWdodDogY2xpZW50UmVjdC5oZWlnaHQgLSBpbm5lckJveC5oZWlnaHQsXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlc2V0Q3VycmVudEJveCA9ICgpID0+IHRoaXMuX2JvdW5kaW5nQ2xpZW50UmVjdHMgPSB1bmRlZmluZWQ7XG4gICAgICBpZiAodGhpcy5faXNTY3JvbGxpbmcpIHtcbiAgICAgICAgdGhpcy5zY3JvbGxpbmcucGlwZShmaWx0ZXIoc2Nyb2xsaW5nID0+IHNjcm9sbGluZyA9PT0gMCksIHRha2UoMSkpLnN1YnNjcmliZShyZXNldEN1cnJlbnRCb3gpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlc2V0Q3VycmVudEJveCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX2JvdW5kaW5nQ2xpZW50UmVjdHM7XG4gIH1cblxuICBnZXQgaW5uZXJXaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmdldEJvdW5kaW5nQ2xpZW50UmVjdHMuaW5uZXJXaWR0aDtcbiAgfVxuXG4gIGdldCBvdXRlcldpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0cy5jbGllbnRSZWN0LndpZHRoO1xuICB9XG5cbiAgZ2V0IGlubmVySGVpZ2h0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0cy5pbm5lcldpZHRoO1xuICB9XG5cbiAgZ2V0IG91dGVySGVpZ2h0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0cy5jbGllbnRSZWN0LmhlaWdodDtcbiAgfVxuXG4gIGdldCBzY3JvbGxXaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnQuc2Nyb2xsV2lkdGg7XG4gIH1cblxuICAvKipcbiAgICogV2hlbiB0cnVlLCB0aGUgdmlydHVhbCBwYWdpbmcgZmVhdHVyZSBpcyBlbmFibGVkIGJlY2F1c2UgdGhlIHZpcnR1YWwgY29udGVudCBzaXplIGV4Y2VlZCB0aGUgc3VwcG9ydGVkIGhlaWdodCBvZiB0aGUgYnJvd3NlciBzbyBwYWdpbmcgaXMgZW5hYmxlLlxuICAgKi9cbiAgZ2V0IHZpcnR1YWxQYWdpbmdBY3RpdmUoKSB7IHJldHVybiB0aGlzLmhlaWdodFBhZ2luZz8uYWN0aXZlID8/IGZhbHNlOyB9XG5cbiAgcmVhZG9ubHkgaW50ZXJzZWN0aW9uOiBSb3dJbnRlcnNlY3Rpb25UcmFja2VyO1xuICByZWFkb25seSBlbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgcmVhZG9ubHkgX21pbldpZHRoJDogT2JzZXJ2YWJsZTxudW1iZXI+O1xuXG4gIHByaXZhdGUgb2Zmc2V0Q2hhbmdlJCA9IG5ldyBTdWJqZWN0PG51bWJlcj4oKTtcbiAgcHJpdmF0ZSBvZmZzZXQgPSAwO1xuICBwcml2YXRlIGlzQ0RQZW5kaW5nOiBib29sZWFuO1xuICBwcml2YXRlIF9pc1Njcm9sbGluZyA9IGZhbHNlO1xuXG4gIHByaXZhdGUgd2hlZWxNb2RlRGVmYXVsdDogIFBibE5ncmlkQmFzZVZpcnR1YWxTY3JvbGxEaXJlY3RpdmVbJ3doZWVsTW9kZSddO1xuICBwcml2YXRlIGdyaWQ6IF9QYmxOZ3JpZENvbXBvbmVudDxhbnk+O1xuICBwcml2YXRlIGZvck9mPzogUGJsVmlydHVhbFNjcm9sbEZvck9mPGFueT47XG4gIHByaXZhdGUgX2JvdW5kaW5nQ2xpZW50UmVjdHM6IFBibENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydENvbXBvbmVudFsnZ2V0Qm91bmRpbmdDbGllbnRSZWN0cyddO1xuICBwcml2YXRlIGhlaWdodFBhZ2luZzogVmlydHVhbFNjcm9sbEhpZ2h0UGFnaW5nO1xuXG4gIGNvbnN0cnVjdG9yKGVsUmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICAgICAgICBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgICAgICAgY29uZmlnOiBQYmxOZ3JpZENvbmZpZ1NlcnZpY2UsXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoVklSVFVBTF9TQ1JPTExfU1RSQVRFR1kpIHB1YmxpYyBwYmxTY3JvbGxTdHJhdGVneTogUGJsTmdyaWRWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3ksXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIGRpcjogRGlyZWN0aW9uYWxpdHksXG4gICAgICAgICAgICAgIHNjcm9sbERpc3BhdGNoZXI6IFNjcm9sbERpc3BhdGNoZXIsXG4gICAgICAgICAgICAgIHZpZXdwb3J0UnVsZXI6IFZpZXdwb3J0UnVsZXIsXG4gICAgICAgICAgICAgIEBJbmplY3QoRVhUX0FQSV9UT0tFTikgcHJpdmF0ZSBleHRBcGk6IFBibE5ncmlkSW50ZXJuYWxFeHRlbnNpb25BcGksXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoRElTQUJMRV9JTlRFUlNFQ1RJT05fT0JTRVJWQUJMRSkgZGlzYWJsZUludGVyc2VjdGlvbk9ic2VydmVyPzogYm9vbGVhbikge1xuICAgIHN1cGVyKGVsUmVmLFxuICAgICAgICAgIGNkcixcbiAgICAgICAgICBuZ1pvbmUsXG4gICAgICAgICAgICAvLyBUT0RPOiBSZXBsYWNlIHdpdGggYFBibE5ncmlkRHluYW1pY1ZpcnR1YWxTY3JvbGxTdHJhdGVneWAgaW4gdjRcbiAgICAgICAgICBwYmxTY3JvbGxTdHJhdGVneSA9IHJlc29sdmVTY3JvbGxTdHJhdGVneShjb25maWcsIHBibFNjcm9sbFN0cmF0ZWd5LCBBUFBfREVGQVVMVF9WSVJUVUFMX1NDUk9MTF9TVFJBVEVHWSksXG4gICAgICAgICAgZGlyLFxuICAgICAgICAgIHNjcm9sbERpc3BhdGNoZXIsXG4gICAgICAgICAgdmlld3BvcnRSdWxlcik7XG4gICAgdGhpcy5lbGVtZW50ID0gZWxSZWYubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLmdyaWQgPSBleHRBcGkuZ3JpZDtcblxuICAgIGlmIChjb25maWcuaGFzKCd2aXJ0dWFsU2Nyb2xsJykpIHtcbiAgICAgIHRoaXMud2hlZWxNb2RlRGVmYXVsdCA9IGNvbmZpZy5nZXQoJ3ZpcnR1YWxTY3JvbGwnKS53aGVlbE1vZGU7XG4gICAgfVxuICAgIGNvbmZpZy5vblVwZGF0ZSgndmlydHVhbFNjcm9sbCcpLnBpcGUodW5yeCh0aGlzKSkuc3Vic2NyaWJlKCBjaGFuZ2UgPT4gdGhpcy53aGVlbE1vZGVEZWZhdWx0ID0gY2hhbmdlLmN1cnIud2hlZWxNb2RlKTtcblxuICAgIHRoaXMuZW5hYmxlZCA9IHBibFNjcm9sbFN0cmF0ZWd5LnR5cGUgJiYgcGJsU2Nyb2xsU3RyYXRlZ3kudHlwZSAhPT0gJ3ZTY3JvbGxOb25lJztcblxuICAgIGV4dEFwaS5zZXRWaWV3cG9ydCh0aGlzKTtcbiAgICB0aGlzLm9mZnNldENoYW5nZSA9IHRoaXMub2Zmc2V0Q2hhbmdlJC5hc09ic2VydmFibGUoKTtcblxuICAgIHRoaXMuX21pbldpZHRoJCA9IHRoaXMuZ3JpZC5jb2x1bW5BcGkudG90YWxDb2x1bW5XaWR0aENoYW5nZTtcblxuICAgIHRoaXMuaW50ZXJzZWN0aW9uID0gbmV3IFJvd0ludGVyc2VjdGlvblRyYWNrZXIodGhpcy5lbGVtZW50LCAhIWRpc2FibGVJbnRlcnNlY3Rpb25PYnNlcnZlcik7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnBibFNjcm9sbFN0cmF0ZWd5LmF0dGFjaEV4dEFwaSh0aGlzLmV4dEFwaSk7XG4gICAgaWYgKHRoaXMuZW5hYmxlZCkge1xuICAgICAgLy8gRW5hYmxpbmcgdmlydHVhbCBzY3JvbGwgZXZlbnQgd2l0aCBicm93c2VyIGhlaWdodCBsaW1pdFxuICAgICAgLy8gQmFzZWQgb246IGh0dHA6Ly9qc2ZpZGRsZS5uZXQvU0RhMkIvMjYzL1xuICAgICAgdGhpcy5oZWlnaHRQYWdpbmcgPSBuZXcgVmlydHVhbFNjcm9sbEhpZ2h0UGFnaW5nKHRoaXMpO1xuICAgIH1cbiAgICBzdXBlci5uZ09uSW5pdCgpO1xuXG4gICAgLy8gSW5pdCB0aGUgc2Nyb2xsaW5nIHdhdGNoZXIgd2hpY2ggdHJhY2sgc2Nyb2xsIGV2ZW50cyBhbiBlbWl0cyBgc2Nyb2xsaW5nYCBhbmQgYHNjcm9sbEZyYW1lUmF0ZWAgZXZlbnRzLlxuICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCAoKSA9PiB0aGlzLmVsZW1lbnRTY3JvbGxlZCgpLnN1YnNjcmliZShjcmVhdGVTY3JvbGxXYXRjaGVyRm4odGhpcykpICk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgLy8gSWYgdmlydHVhbCBzY3JvbGwgaXMgZGlzYWJsZWQgKGBOb1ZpcnR1YWxTY3JvbGxTdHJhdGVneWApIHdlIG5lZWQgdG8gZGlzYWJsZSBhbnkgZWZmZWN0IGFwcGxpZWRcbiAgICAvLyBieSB0aGUgdmlld3BvcnQsIHdyYXBwaW5nIHRoZSBjb250ZW50IGluamVjdGVkIHRvIGl0LlxuICAgIC8vIFRoZSBtYWluIGVmZmVjdCBpcyB0aGUgZ3JpZCBoYXZpbmcgaGVpZ2h0IDAgYXQgYWxsIHRpbWVzLCB1bmxlc3MgdGhlIGhlaWdodCBpcyBleHBsaWNpdGx5IHNldC5cbiAgICAvLyBUaGlzIGhhcHBlbnMgYmVjYXVzZSB0aGUgY29udGVudCB0YWtpbmcgb3V0IG9mIHRoZSBsYXlvdXQsIHdyYXBwZWQgaW4gYWJzb2x1dGUgcG9zaXRpb25pbmcuXG4gICAgLy8gQWRkaXRpb25hbGx5LCB0aGUgaG9zdCBpdHNlbGYgKHZpZXdwb3J0KSBpcyBzZXQgdG8gY29udGFpbjogc3RyaWN0LlxuICAgIGNvbnN0IHsgZ3JpZCB9ID0gdGhpcztcbiAgICBpZiAodGhpcy5lbmFibGVkKSB7XG4gICAgICB0aGlzLmZvck9mID0gbmV3IFBibFZpcnR1YWxTY3JvbGxGb3JPZjxhbnk+KHRoaXMuZXh0QXBpLCB0aGlzLm5nWm9uZSk7XG4gICAgICBpZiAoIXRoaXMuaGVpZ2h0UGFnaW5nLmFjdGl2ZSkge1xuICAgICAgICB0aGlzLmZvck9mLndoZWVsQ29udHJvbC53aGVlbExpc3RlbigpO1xuICAgICAgfVxuXG4gICAgICAvLyBgd2hlZWxgIG1vZGUgZG9lcyBub3Qgd29yayB3ZWxsIHdpdGggdGhlIHdvcmthcm91bmQgdG8gZml4IGhlaWdodCBsaW1pdCwgc28gd2UgZGlzYWJsZSBpdCB3aGVuIGl0J3Mgb25cbiAgICAgIHRoaXMuaGVpZ2h0UGFnaW5nLmFjdGl2ZUNoYW5nZWRcbiAgICAgICAgLnN1YnNjcmliZSggKCkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLmhlaWdodFBhZ2luZy5hY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMuZm9yT2Yud2hlZWxDb250cm9sLndoZWVsVW5MaXN0ZW4oKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5mb3JPZi53aGVlbENvbnRyb2wud2hlZWxMaXN0ZW4oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuc2Nyb2xsaW5nXG4gICAgICAucGlwZSh1bnJ4KHRoaXMpKVxuICAgICAgLnN1YnNjcmliZSggaXNTY3JvbGxpbmcgPT4ge1xuICAgICAgICB0aGlzLl9pc1Njcm9sbGluZyA9ICEhaXNTY3JvbGxpbmc7XG4gICAgICAgIGlmIChpc1Njcm9sbGluZykge1xuICAgICAgICAgIGdyaWQuYWRkQ2xhc3MoJ3BibC1uZ3JpZC1zY3JvbGxpbmcnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBncmlkLnJlbW92ZUNsYXNzKCdwYmwtbmdyaWQtc2Nyb2xsaW5nJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5pbnRlcnNlY3Rpb24uZGVzdHJveSgpO1xuICAgIHRoaXMuaGVpZ2h0UGFnaW5nPy5kaXNwb3NlKCk7XG4gICAgc3VwZXIubmdPbkRlc3Ryb3koKTtcbiAgICB0aGlzLmRldGFjaFZpZXdQb3J0KCk7XG4gICAgdGhpcy5vZmZzZXRDaGFuZ2UkLmNvbXBsZXRlKCk7XG4gICAgdW5yeC5raWxsKHRoaXMpO1xuICB9XG5cbiAgcmVNZWFzdXJlQ3VycmVudFJlbmRlcmVkQ29udGVudCgpIHtcbiAgICB0aGlzLnBibFNjcm9sbFN0cmF0ZWd5Lm9uQ29udGVudFJlbmRlcmVkKCk7XG4gIH1cblxuICBtZWFzdXJlU2Nyb2xsT2Zmc2V0KGZyb20/OiAndG9wJyB8ICdsZWZ0JyB8ICdyaWdodCcgfCAnYm90dG9tJyB8ICdzdGFydCcgfCAnZW5kJyk6IG51bWJlciB7XG4gICAgY29uc3Qgc2Nyb2xsT2Zmc2V0ID0gc3VwZXIubWVhc3VyZVNjcm9sbE9mZnNldChmcm9tKTtcbiAgICByZXR1cm4gKCFmcm9tIHx8IGZyb20gPT09ICd0b3AnKSAmJiB0aGlzLmhlaWdodFBhZ2luZyA/IHRoaXMuaGVpZ2h0UGFnaW5nLnRyYW5zZm9ybVNjcm9sbE9mZnNldChzY3JvbGxPZmZzZXQpIDogc2Nyb2xsT2Zmc2V0O1xuICB9XG5cbiAgZ2V0T2Zmc2V0VG9SZW5kZXJlZENvbnRlbnRTdGFydCgpOiBudW1iZXIgfCBudWxsIHtcbiAgICBjb25zdCByZW5kZXJlZENvbnRlbnRTdGFydCA9IHN1cGVyLmdldE9mZnNldFRvUmVuZGVyZWRDb250ZW50U3RhcnQoKTtcbiAgICByZXR1cm4gdGhpcy5oZWlnaHRQYWdpbmc/LnRyYW5zZm9ybU9mZnNldFRvUmVuZGVyZWRDb250ZW50U3RhcnQocmVuZGVyZWRDb250ZW50U3RhcnQpID8/IHJlbmRlcmVkQ29udGVudFN0YXJ0O1xuICB9XG5cbiAgc2V0UmVuZGVyZWRDb250ZW50T2Zmc2V0KG9mZnNldDogbnVtYmVyLCB0bzogJ3RvLXN0YXJ0JyB8ICd0by1lbmQnID0gJ3RvLXN0YXJ0Jykge1xuICAgIGlmICh0aGlzLmhlaWdodFBhZ2luZz8uYWN0aXZlKSB7XG4gICAgICBvZmZzZXQgPSB0aGlzLmhlaWdodFBhZ2luZy50cmFuc2Zvcm1SZW5kZXJlZENvbnRlbnRPZmZzZXQob2Zmc2V0LCB0byk7XG4gICAgfVxuICAgIHN1cGVyLnNldFJlbmRlcmVkQ29udGVudE9mZnNldChvZmZzZXQsIHRvKTtcbiAgICBpZiAodGhpcy5lbmFibGVkKSB7XG4gICAgICBpZiAodGhpcy5vZmZzZXQgIT09IG9mZnNldCkge1xuICAgICAgICB0aGlzLm9mZnNldCA9IG9mZnNldDtcbiAgICAgICAgaWYgKCF0aGlzLmlzQ0RQZW5kaW5nKSB7XG4gICAgICAgICAgdGhpcy5pc0NEUGVuZGluZyA9IHRydWU7XG5cbiAgICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiBQcm9taXNlLnJlc29sdmUoKVxuICAgICAgICAgICAgLnRoZW4oICgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5pc0NEUGVuZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICB0aGlzLm9mZnNldENoYW5nZSQubmV4dCh0aGlzLm9mZnNldCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzZXRUb3RhbENvbnRlbnRTaXplKHNpemU6IG51bWJlcikge1xuICAgIGlmICh0aGlzLmhlaWdodFBhZ2luZz8uc2hvdWxkVHJhbnNmb3JtVG90YWxDb250ZW50U2l6ZShzaXplKSkge1xuICAgICAgc2l6ZSA9IHRoaXMuaGVpZ2h0UGFnaW5nLnRyYW5zZm9ybVRvdGFsQ29udGVudFNpemUoc2l6ZSwgc3VwZXIubWVhc3VyZVNjcm9sbE9mZnNldCgpKTtcbiAgICB9XG4gICAgc3VwZXIuc2V0VG90YWxDb250ZW50U2l6ZShzaXplKTtcblxuICAgIC8vIFRPRE8oc2hsb21pYXNzYWYpW3BlcmYsIDNdOiBydW4gdGhpcyBvbmNlLi4uIChhZ2dyZWdhdGUgYWxsIGNhbGxzIHdpdGhpbiB0aGUgc2FtZSBhbmltYXRpb24gZnJhbWUpXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMuc2Nyb2xsSGVpZ2h0ID0gdGhpcy5lbGVtZW50LnNjcm9sbEhlaWdodDsgLy9zaXplO1xuICAgICAgdGhpcy51cGRhdGVGaWxsZXIoKTtcbiAgICAgIC8vIFdlIG11c3QgdHJpZ2dlciBhIGNoYW5nZSBkZXRlY3Rpb24gY3ljbGUgYmVjYXVzZSB0aGUgZmlsbGVyIGRpdiBlbGVtZW50IGlzIHVwZGF0ZWQgdGhyb3VnaCBiaW5kaW5nc1xuICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgfSlcbiAgfVxuXG4gIC8qKiBNZWFzdXJlIHRoZSBjb21iaW5lZCBzaXplIG9mIGFsbCBvZiB0aGUgcmVuZGVyZWQgaXRlbXMuICovXG4gIG1lYXN1cmVSZW5kZXJlZENvbnRlbnRTaXplKCk6IG51bWJlciB7XG4gICAgbGV0IHNpemUgPSBzdXBlci5tZWFzdXJlUmVuZGVyZWRDb250ZW50U2l6ZSgpO1xuICAgIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAndmVydGljYWwnKSB7XG4gICAgICBzaXplIC09IHRoaXMuc3RpY2t5Um93SGVhZGVyQ29udGFpbmVyLm9mZnNldEhlaWdodCArIHRoaXMuc3RpY2t5Um93Rm9vdGVyQ29udGFpbmVyLm9mZnNldEhlaWdodDtcblxuICAgICAgLy8gQ29tcGVuc2F0ZSBmb3IgaHogc2Nyb2xsIGJhciwgaWYgZXhpc3RzLCBvbmx5IGluIG5vbiB2aXJ0dWFsIHNjcm9sbCBtb2RlLlxuICAgICAgaWYgKCF0aGlzLmVuYWJsZWQpIHtcbiAgICAgICAgc2l6ZSArPSB0aGlzLm91dGVySGVpZ2h0IC0gdGhpcy5pbm5lckhlaWdodDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMubmdlUmVuZGVyZWRDb250ZW50U2l6ZSA9IHNpemU7XG4gIH1cblxuICBjaGVja1ZpZXdwb3J0U2l6ZSgpIHtcbiAgICAvLyBUT0RPOiBDaGVjayBmb3IgY2hhbmdlcyBpbiBgQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0YCBzb3VyY2UgY29kZSwgd2hlbiByZXNpemluZyBpcyBoYW5kbGVkIVxuICAgIC8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9tYXRlcmlhbDIvYmxvYi8yOGZiM2FiZTc3YzUzMzZlNDczOWM4MjA1ODRlYzk5YzIzZjFhZTM4L3NyYy9jZGsvc2Nyb2xsaW5nL3ZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0LnRzI0wzNDFcbiAgICBjb25zdCBwcmV2ID0gdGhpcy5nZXRWaWV3cG9ydFNpemUoKTtcbiAgICBzdXBlci5jaGVja1ZpZXdwb3J0U2l6ZSgpO1xuICAgIGlmIChwcmV2ICE9PSB0aGlzLmdldFZpZXdwb3J0U2l6ZSgpKSB7XG4gICAgICB0aGlzLnVwZGF0ZUZpbGxlcigpO1xuICAgIH1cbiAgfVxuXG4gIGRldGFjaFZpZXdQb3J0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmZvck9mKSB7XG4gICAgICB0aGlzLmZvck9mLmRlc3Ryb3koKTtcbiAgICAgIHRoaXMuZm9yT2YgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRPRE8oUkVGQUNUT1JfUkVGIDEpOiBNb3ZlIHRvIHVzZSByb3dBcGkgc28gd2UgY2FuIGFjY2VwdCByb3dzL2NlbGxzIGFuZCBub3QgaHRtbCBlbGVtZW50cy5cbiAgICogSXQgd2lsbCBhbGxvdyB1cyB0byBicmluZyBpbnRvIHZpZXcgcm93cyBhcyB3ZWxsLlxuICAgKiBUaGlzIHdpbGwgY2hhbmdlIHRoZSBtZXRob2RzIHNpZ25hdHVyZSFcbiAgICogQGludGVybmFsXG4gICAqL1xuICBfc2Nyb2xsSW50b1ZpZXcoY2VsbEVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5lbGVtZW50O1xuICAgIGNvbnN0IGVsQm94ID0gY2VsbEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgY29udGFpbmVyQm94ID0gdGhpcy5nZXRCb3VuZGluZ0NsaWVudFJlY3RzLmNsaWVudFJlY3Q7XG5cbiAgICAvLyBWZXJ0aWNhbCBoYW5kbGluZy5cbiAgICAvLyBXZSBoYXZlIHZlcnRpY2FsIHZpcnR1YWwgc2Nyb2xsLCBzbyBoZXJlIHdlIHVzZSB0aGUgdmlydHVhbCBzY3JvbGwgQVBJIHRvIHNjcm9sbCBpbnRvIHRoZSB0YXJnZXRcbiAgICBpZiAoZWxCb3gudG9wIDwgY29udGFpbmVyQm94LnRvcCkgeyAvLyBvdXQgZnJvbSB0b3BcbiAgICAgIGNvbnN0IG9mZnNldCA9IGVsQm94LnRvcCAtIGNvbnRhaW5lckJveC50b3A7XG4gICAgICB0aGlzLnNjcm9sbFRvT2Zmc2V0KHRoaXMubWVhc3VyZVNjcm9sbE9mZnNldCgpICsgb2Zmc2V0KTtcbiAgICB9IGVsc2UgaWYgKGVsQm94LmJvdHRvbSA+IGNvbnRhaW5lckJveC5ib3R0b20pIHsgLy8gb3V0IGZyb20gYm90dG9tXG4gICAgICBjb25zdCBvZmZzZXQgPSBlbEJveC5ib3R0b20gLSAoY29udGFpbmVyQm94LmJvdHRvbSAtIHRoaXMuZ2V0U2Nyb2xsQmFyVGhpY2tuZXNzKCdob3Jpem9udGFsJykpO1xuICAgICAgdGhpcy5zY3JvbGxUb09mZnNldCh0aGlzLm1lYXN1cmVTY3JvbGxPZmZzZXQoKSArIG9mZnNldCk7XG4gICAgfVxuXG4gICAgLy8gSG9yaXpvbnRhbCBoYW5kbGluZy5cbiAgICAvLyBXZSBET04nVCBoYXZlIGhvcml6b250YWwgdmlydHVhbCBzY3JvbGwsIHNvIGhlcmUgd2UgdXNlIHRoZSBET00gQVBJIHRvIHNjcm9sbCBpbnRvIHRoZSB0YXJnZXRcbiAgICAvLyBUT0RPOiBXaGVuIGltcGxlbWVudGluZyBob3Jpem9udGFsIHZpcnR1YWwgc2Nyb2xsLCByZWZhY3RvciB0aGlzIGFzIHdlbGwuXG4gICAgaWYgKGVsQm94LmxlZnQgPCBjb250YWluZXJCb3gubGVmdCkgeyAvLyBvdXQgZnJvbSBsZWZ0XG4gICAgICBjb25zdCBvZmZzZXQgPSBlbEJveC5sZWZ0IC0gY29udGFpbmVyQm94LmxlZnQ7XG4gICAgICBjb250YWluZXIuc2Nyb2xsKGNvbnRhaW5lci5zY3JvbGxMZWZ0ICsgb2Zmc2V0LCBjb250YWluZXIuc2Nyb2xsVG9wKTtcbiAgICB9IGVsc2UgaWYgKGVsQm94LnJpZ2h0ID4gY29udGFpbmVyQm94LnJpZ2h0KSB7IC8vIG91dCBmcm9tIHJpZ2h0XG4gICAgICBjb25zdCBvZmZzZXQgPSBlbEJveC5yaWdodCAtIChjb250YWluZXJCb3gucmlnaHQgLSB0aGlzLmdldFNjcm9sbEJhclRoaWNrbmVzcygndmVydGljYWwnKSk7XG4gICAgICBjb250YWluZXIuc2Nyb2xsKGNvbnRhaW5lci5zY3JvbGxMZWZ0ICsgb2Zmc2V0LCBjb250YWluZXIuc2Nyb2xsVG9wKTtcbiAgICB9XG4gIH1cblxuICBvblNvdXJjZUxlbmd0aENoYW5nZShwcmV2OiBudW1iZXIsIGN1cnI6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuY2hlY2tWaWV3cG9ydFNpemUoKTtcbiAgICB0aGlzLnVwZGF0ZUZpbGxlcigpO1xuICB9XG5cbiAgYXR0YWNoKGZvck9mOiBDZGtWaXJ0dWFsRm9yT2Y8YW55PiAmIE5nZVZpcnR1YWxUYWJsZVJvd0luZm8pIHtcbiAgICBzdXBlci5hdHRhY2goZm9yT2YpO1xuICAgIGNvbnN0IHNjcm9sbFN0cmF0ZWd5ID0gdGhpcy5wYmxTY3JvbGxTdHJhdGVneSBpbnN0YW5jZW9mIFBibE5ncmlkQmFzZVZpcnR1YWxTY3JvbGxEaXJlY3RpdmVcbiAgICAgID8gdGhpcy5wYmxTY3JvbGxTdHJhdGVneS5fc2Nyb2xsU3RyYXRlZ3lcbiAgICAgIDogdGhpcy5wYmxTY3JvbGxTdHJhdGVneVxuICAgIDtcbiAgICBpZiAoc2Nyb2xsU3RyYXRlZ3kgaW5zdGFuY2VvZiBQYmxOZ3JpZEF1dG9TaXplVmlydHVhbFNjcm9sbFN0cmF0ZWd5KSB7XG4gICAgICBzY3JvbGxTdHJhdGVneS5hdmVyYWdlci5zZXRSb3dJbmZvKGZvck9mKTtcbiAgICB9XG4gIH1cblxuICBzZXRSZW5kZXJlZFJhbmdlKHJhbmdlOiBMaXN0UmFuZ2UpIHtcbiAgICBzdXBlci5zZXRSZW5kZXJlZFJhbmdlKHJhbmdlKTtcbiAgfVxuXG4gIGdldFNjcm9sbEJhclRoaWNrbmVzcyhsb2NhdGlvbjogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJykge1xuICAgIHN3aXRjaCAobG9jYXRpb24pIHtcbiAgICAgIGNhc2UgJ2hvcml6b250YWwnOlxuICAgICAgICByZXR1cm4gdGhpcy5vdXRlckhlaWdodCAtIHRoaXMuaW5uZXJIZWlnaHQ7XG4gICAgICBjYXNlICd2ZXJ0aWNhbCc6XG4gICAgICAgIHJldHVybiB0aGlzLm91dGVyV2lkdGggLSB0aGlzLmlubmVyV2lkdGg7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVGaWxsZXIoKTogdm9pZCB7XG4gICAgdGhpcy5tZWFzdXJlUmVuZGVyZWRDb250ZW50U2l6ZSgpO1xuICAgIGlmICh0aGlzLmdyaWQubm9GaWxsZXIpIHtcbiAgICAgIHRoaXMucGJsRmlsbGVySGVpZ2h0ID0gdW5kZWZpbmVkO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBibEZpbGxlckhlaWdodCA9IHRoaXMuZ2V0Vmlld3BvcnRTaXplKCkgPj0gdGhpcy5uZ2VSZW5kZXJlZENvbnRlbnRTaXplID9cbiAgICAgICAgYGNhbGMoMTAwJSAtICR7dGhpcy5uZ2VSZW5kZXJlZENvbnRlbnRTaXplfXB4KWBcbiAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgIDtcbiAgICB9XG4gIH1cblxufVxuXG5kZWNsYXJlIGdsb2JhbCB7XG4gIGludGVyZmFjZSBDU1NTdHlsZURlY2xhcmF0aW9uIHtcbiAgICBjb250YWluOiBzdHJpbmc7XG4gIH1cbn1cbiIsIjxwICNpbm5lckJveEhlbHBlciBjbGFzcz1cImNkay12aXJ0dWFsLXNjcm9sbC1pbm5lci13aWR0aFwiPjwvcD5cbjxuZy1jb250ZW50IHNlbGVjdD1cIi5jZGstdmlydHVhbC1zY3JvbGwtYmVmb3JlLWNvbnRlbnQtd3JhcHBlclwiPjwvbmctY29udGVudD5cbjwhLS1cbiAgV3JhcCB0aGUgcmVuZGVyZWQgY29udGVudCBpbiBhbiBlbGVtZW50IHRoYXQgd2lsbCBiZSB1c2VkIHRvIG9mZnNldCBpdCBiYXNlZCBvbiB0aGUgc2Nyb2xsXG4gIHBvc2l0aW9uLlxuLS0+XG48ZGl2ICNjb250ZW50V3JhcHBlciBbY2xhc3MuY2RrLXZpcnR1YWwtc2Nyb2xsLWNvbnRlbnQtd3JhcHBlcl09XCJlbmFibGVkXCIgc3R5bGU9XCJ3aWR0aDogMTAwJVwiIFtzdHlsZS5taW5XaWR0aC5weF09XCJfbWluV2lkdGgkIHwgYXN5bmNcIj5cbiAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuPC9kaXY+XG5cbjwhLS1cbiAgU3BhY2VyIHVzZWQgdG8gZm9yY2UgdGhlIHNjcm9sbGluZyBjb250YWluZXIgdG8gdGhlIGNvcnJlY3Qgc2l6ZSBmb3IgdGhlICp0b3RhbCogbnVtYmVyIG9mIGl0ZW1zXG4gIHNvIHRoYXQgdGhlIHNjcm9sbGJhciBjYXB0dXJlcyB0aGUgc2l6ZSBvZiB0aGUgZW50aXJlIGRhdGEgc2V0LlxuLS0+XG48ZGl2ICpuZ0lmPVwiZW5hYmxlZFwiIGNsYXNzPVwiY2RrLXZpcnR1YWwtc2Nyb2xsLXNwYWNlclwiXG4gICAgIFtzdHlsZS53aWR0aF09XCJfdG90YWxDb250ZW50V2lkdGhcIiBbc3R5bGUuaGVpZ2h0XT1cIl90b3RhbENvbnRlbnRIZWlnaHRcIj48L2Rpdj5cbjxkaXYgKm5nSWY9XCJwYmxGaWxsZXJIZWlnaHQgJiYgZW5hYmxlZFwiXG4gICAgY2xhc3M9XCJwYmwtbmdyaWQtc3BhY2UtZmlsbFwiXG4gICAgW3N0eWxlLm1pbldpZHRoLnB4XT1cIl9taW5XaWR0aCQgfCBhc3luY1wiXG4gICAgW3N0eWxlLnRvcC5weF09XCJuZ2VSZW5kZXJlZENvbnRlbnRTaXplXCJcbiAgICBbc3R5bGUuaGVpZ2h0XT1cInBibEZpbGxlckhlaWdodFwiPjwvZGl2PlxuIl19