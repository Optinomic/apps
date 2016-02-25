// Type definitions for ag-grid v3.3.3
// Project: http://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ceolter/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped
import { LoggerFactory } from "../logger";
/** Functionality for internal DnD functionality between GUI widgets. Eg this service is used to drag columns
 * from the 'available columns' list and putting them into the 'grouped columns' in the tool panel.
 * This service is NOT used by the column headers for resizing and moving, that is a different use case. */
export default class DragAndDropService {
    private dragItem;
    private mouseUpEventListener;
    private logger;
    init(loggerFactory: LoggerFactory): void;
    destroy(): void;
    private stopDragging();
    private setDragCssClasses(eListItem, dragging);
    addDragSource(eDragSource: any, dragSourceCallback: any): void;
    private onMouseDownDragSource(eDragSource, dragSourceCallback);
    addDropTarget(eDropTarget: any, dropTargetCallback: any): void;
}
