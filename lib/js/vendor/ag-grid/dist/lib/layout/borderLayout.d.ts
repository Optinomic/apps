// Type definitions for ag-grid v3.3.3
// Project: http://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ceolter/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped
export default class BorderLayout {
    private eNorthWrapper;
    private eSouthWrapper;
    private eEastWrapper;
    private eWestWrapper;
    private eCenterWrapper;
    private eOverlayWrapper;
    private eCenterRow;
    private eNorthChildLayout;
    private eSouthChildLayout;
    private eEastChildLayout;
    private eWestChildLayout;
    private eCenterChildLayout;
    private isLayoutPanel;
    private fullHeight;
    private layoutActive;
    private eGui;
    private id;
    private childPanels;
    private centerHeightLastTime;
    private sizeChangeListeners;
    private overlays;
    constructor(params: any);
    addSizeChangeListener(listener: Function): void;
    fireSizeChanged(): void;
    private setupPanels(params);
    private setupPanel(content, ePanel);
    getGui(): any;
    doLayout(): boolean;
    private layoutChild(childPanel);
    private layoutHeight();
    private layoutHeightFullHeight();
    private layoutHeightNormal();
    getCentreHeight(): number;
    private layoutWidth();
    setEastVisible(visible: any): void;
    private setupOverlays();
    hideOverlay(): void;
    showOverlay(key: string): void;
    setSouthVisible(visible: any): void;
}
