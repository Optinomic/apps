import {OriginalColumnGroupChild} from "./originalColumnGroupChild";
import {ColGroupDef} from "./colDef";
import ColumnGroup from "./columnGroup";

export class OriginalColumnGroup implements OriginalColumnGroupChild {

    private colGroupDef: ColGroupDef;
    private children: OriginalColumnGroupChild[];
    private groupId: string;

    private expandable = false;
    private expanded = false;

    constructor(colGroupDef: ColGroupDef, groupId: string) {
        this.colGroupDef = colGroupDef;
        this.groupId = groupId;
    }

    public setExpanded(expanded: boolean): void {
        this.expanded = expanded;
    }

    public isExpandable(): boolean {
        return this.expandable;
    }

    public isExpanded(): boolean {
        return this.expanded;
    }

    public getGroupId(): string {
        return this.groupId;
    }

    public setChildren(children: OriginalColumnGroupChild[]): void {
        this.children = children;
    }

    public getChildren(): OriginalColumnGroupChild[] {
        return this.children;
    }

    public getColGroupDef(): ColGroupDef {
        return this.colGroupDef;
    }

    public getColumnGroupShow(): string {
        if (this.colGroupDef) {
            return this.colGroupDef.columnGroupShow;
        } else {
            // if there is no col def, then this must be a padding
            // group, which means we have exactly only child. we then
            // take the value from the child and push it up, making
            // this group 'invisible'.
            return this.children[0].getColumnGroupShow();
        }
    }

    // need to check that this group has at least one col showing when both expanded and contracted.
    // if not, then we don't allow expanding and contracting on this group
    public calculateExpandable() {
        // want to make sure the group doesn't disappear when it's open
        var atLeastOneShowingWhenOpen = false;
        // want to make sure the group doesn't disappear when it's closed
        var atLeastOneShowingWhenClosed = false;
        // want to make sure the group has something to show / hide
        var atLeastOneChangeable = false;

        for (var i = 0, j = this.children.length; i < j; i++) {
            var abstractColumn = this.children[i];
            // if the abstractColumn is a grid generated group, there will be no colDef
            var headerGroupShow = abstractColumn.getColumnGroupShow();
            if (headerGroupShow === ColumnGroup.HEADER_GROUP_SHOW_OPEN) {
                atLeastOneShowingWhenOpen = true;
                atLeastOneChangeable = true;
            } else if (headerGroupShow === ColumnGroup.HEADER_GROUP_SHOW_CLOSED) {
                atLeastOneShowingWhenClosed = true;
                atLeastOneChangeable = true;
            } else {
                atLeastOneShowingWhenOpen = true;
                atLeastOneShowingWhenClosed = true;
            }
        }

        this.expandable = atLeastOneShowingWhenOpen && atLeastOneShowingWhenClosed && atLeastOneChangeable;
    }
}
