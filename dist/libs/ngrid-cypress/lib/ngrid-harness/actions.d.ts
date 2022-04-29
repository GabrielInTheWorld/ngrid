/// <reference types="cypress" />
/// <reference types="../extend-cypress" />
import { NGridCypressHarness } from './ngrid-harness';
export interface DragOptions {
    /**
     * delay in between steps
     * @default 0
     */
    delay?: number;
    /**
     * interpolation between coords
     * @default 0
     */
    steps?: number;
    /**
     * >=10 steps
     * @default false
     */
    smooth?: boolean;
}
export declare class NGridCypressHarnessActions {
    private readonly harness;
    constructor(harness: NGridCypressHarness);
    dragMoveColumns(sourceColumnId: string, targetColumnId: string, opts?: DragOptions): Cypress.Chainable<NGridCypressHarness>;
}
