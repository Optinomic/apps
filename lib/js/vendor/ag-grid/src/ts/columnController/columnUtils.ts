import constants from '../constants';
import GridOptionsWrapper from "../gridOptionsWrapper";
import {ColumnGroupChild} from "../entities/columnGroupChild";
import ColumnGroup from "../entities/columnGroup";
import {OriginalColumnGroupChild} from "../entities/originalColumnGroupChild";
import {OriginalColumnGroup} from "../entities/originalColumnGroup";
import Column from "../entities/column";

// takes in a list of columns, as specified by the column definitions, and returns column groups
export default class ColumnUtils {

    private gridOptionsWrapper: GridOptionsWrapper;

    public init(gridOptionsWrapper: GridOptionsWrapper): void {
        this.gridOptionsWrapper = gridOptionsWrapper;
    }

    public calculateColInitialWidth(colDef: any): number {
        if (!colDef.width) {
            // if no width defined in colDef, use default
            return this.gridOptionsWrapper.getColWidth();
        } else if (colDef.width < this.gridOptionsWrapper.getMinColWidth()) {
            // if width in col def to small, set to min width
            return this.gridOptionsWrapper.getMinColWidth();
        } else {
            // otherwise use the provided width
            return colDef.width;
        }
    }

    public getPathForColumn(column: Column, allDisplayedColumnGroups: ColumnGroupChild[]): ColumnGroup[] {
        var result: ColumnGroup[] = [];
        var found = false;

        recursePath(allDisplayedColumnGroups, 0);

        // we should always find the path, but in case there is a bug somewhere, returning null
        // will make it fail rather than provide a 'hard to track down' bug
        if (found) {
            return result;
        } else {
            return null;
        }

        function recursePath(balancedColumnTree: ColumnGroupChild[], dept: number): void {

            for (var i = 0; i<balancedColumnTree.length; i++) {
                if (found) {
                    // quit the search, so 'result' is kept with the found result
                    return;
                }
                var node = balancedColumnTree[i];
                if (node instanceof ColumnGroup) {
                    var nextNode = <ColumnGroup> node;
                    recursePath(nextNode.getChildren(), dept+1);
                    result[dept] = node;
                } else {
                    if (node === column) {
                        found = true;
                    }
                }
            }
        }
    }

    public deptFirstOriginalTreeSearch(tree: OriginalColumnGroupChild[], callback: (treeNode: OriginalColumnGroupChild)=>void ): void {

        if (!tree) { return; }

        tree.forEach( (child: OriginalColumnGroupChild) => {
            if (child instanceof OriginalColumnGroup) {
                this.deptFirstOriginalTreeSearch((<OriginalColumnGroup>child).getChildren(), callback);
            }
            callback(child);
        });

    }

    public deptFirstAllColumnTreeSearch(tree: ColumnGroupChild[], callback: (treeNode: ColumnGroupChild)=>void ): void {

        if (!tree) { return; }

        tree.forEach( (child: ColumnGroupChild) => {
            if (child instanceof ColumnGroup) {
                this.deptFirstAllColumnTreeSearch((<ColumnGroup>child).getChildren(), callback);
            }
            callback(child);
        });

    }

    public deptFirstDisplayedColumnTreeSearch(tree: ColumnGroupChild[], callback: (treeNode: ColumnGroupChild)=>void ): void {

        if (!tree) { return; }

        tree.forEach( (child: ColumnGroupChild) => {
            if (child instanceof ColumnGroup) {
                this.deptFirstDisplayedColumnTreeSearch((<ColumnGroup>child).getDisplayedChildren(), callback);
            }
            callback(child);
        });

    }

}