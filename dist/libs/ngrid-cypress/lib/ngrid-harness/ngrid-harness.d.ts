import { NGridCypressHarnessActions } from './actions';
export declare class NGridCypressHarness {
    readonly element: HTMLElement;
    readonly actions: NGridCypressHarnessActions;
    constructor(element: HTMLElement);
    getHeaderMetaRows(): ({
        type: "fixed";
        isGroup: boolean;
        rowIndex: string;
        cells: ({
            groupCell: boolean;
            slave: boolean;
            id: string;
            placeholder: boolean;
            el: Element;
        } | {
            id: string;
            el: Element;
            groupCell?: undefined;
            slave?: undefined;
            placeholder?: undefined;
        })[];
    } | {
        type: "sticky" | "row";
        isGroup: boolean;
        rowIndex: string;
        cells: ({
            groupCell: boolean;
            slave: boolean;
            id: string;
            placeholder: boolean;
            el: Element;
        } | {
            id: string;
            el: Element;
            groupCell?: undefined;
            slave?: undefined;
            placeholder?: undefined;
        })[];
    })[];
    getColumns(): string[];
    private parseMetaCell;
    private findClassMatch;
}
