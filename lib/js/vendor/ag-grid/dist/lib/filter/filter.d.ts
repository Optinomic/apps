// Type definitions for ag-grid v3.3.3
// Project: http://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ceolter/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped
export interface Filter {
    getGui(): any;
    isFilterActive(): boolean;
    doesFilterPass(params: any): boolean;
    afterGuiAttached?(params?: {
        hidePopup?: Function;
    }): void;
    onNewRowsLoaded?(): void;
}
