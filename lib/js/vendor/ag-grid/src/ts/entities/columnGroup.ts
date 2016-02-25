import {ColumnGroupChild} from "./columnGroupChild";
import {ColGroupDef} from "./colDef";
import Column from "./column";
import {AbstractColDef} from "./colDef";
import {OriginalColumnGroup} from "./originalColumnGroup";

export default class ColumnGroup implements ColumnGroupChild {

    public static HEADER_GROUP_SHOW_OPEN = 'open';
    public static HEADER_GROUP_SHOW_CLOSED = 'closed';

    // all the children of this group, regardless of whether they are opened or closed
    private children: ColumnGroupChild[];
    // depends on the open/closed state of the group, only displaying columns are stored here
    private displayedChildren: ColumnGroupChild[] = [];

    private groupId: string;
    private instanceId: number;
    private originalColumnGroup: OriginalColumnGroup;

    constructor(originalColumnGroup: OriginalColumnGroup, groupId: string, instanceId: number) {
        this.groupId = groupId;
        this.instanceId = instanceId;
        this.originalColumnGroup = originalColumnGroup;
    }

    // returns header name if it exists, otherwise null. if will not exist if
    // this group is a padding group, as they don't have colGroupDef's
    public getHeaderName(): string {
        if (this.originalColumnGroup.getColGroupDef()) {
            return this.originalColumnGroup.getColGroupDef().headerName;
        } else {
            return null;
        }
    }

    public getGroupId(): string {
        return this.groupId;
    }

    public getInstanceId(): number {
        return this.instanceId;
    }

    public isChildInThisGroupDeepSearch(wantedChild: ColumnGroupChild): boolean {
        var result = false;

        this.children.forEach( (foundChild: ColumnGroupChild) => {
            if (wantedChild === foundChild) {
                result = true;
            }
            if (foundChild instanceof ColumnGroup) {
                if ((<ColumnGroup>foundChild).isChildInThisGroupDeepSearch(wantedChild)) {
                    result = true;
                }
            }
        });

        return result;
    }

    public getActualWidth(): number {
        var groupActualWidth = 0;
        if (this.displayedChildren) {
            this.displayedChildren.forEach( (child: ColumnGroupChild)=> {
                groupActualWidth += child.getActualWidth();
            });
        }
        return groupActualWidth;
    }

    public getMinWidth(): number {
        var result = 0;
        this.displayedChildren.forEach( (groupChild: ColumnGroupChild) => {
            result += groupChild.getMinWidth();
        });
        return result;
    }

    public addChild(child: ColumnGroupChild): void {
        if (!this.children) {
            this.children = [];
        }
        this.children.push(child);
    }

    public getDisplayedChildren(): ColumnGroupChild[] {
        return this.displayedChildren;
    }

    public getLeafColumns(): Column[] {
        var result: Column[] = [];
        this.addLeafColumns(result);
        return result;
    }

    public getDisplayedLeafColumns(): Column[] {
        var result: Column[] = [];
        this.addDisplayedLeafColumns(result);
        return result;
    }

    // why two methods here doing the same thing?
    public getDefinition(): AbstractColDef {
        return this.originalColumnGroup.getColGroupDef();
    }
    public getColGroupDef(): ColGroupDef {
        return this.originalColumnGroup.getColGroupDef();
    }

    public isExpandable(): boolean {
        return this.originalColumnGroup.isExpandable();
    }

    public isExpanded(): boolean {
        return this.originalColumnGroup.isExpanded();
    }

    public setExpanded(expanded: boolean): void {
        this.originalColumnGroup.setExpanded(expanded);
    }

    private addDisplayedLeafColumns(leafColumns: Column[]): void {
        this.displayedChildren.forEach( (child: ColumnGroupChild) => {
            if (child instanceof Column) {
                leafColumns.push(<Column>child);
            } else if (child instanceof ColumnGroup) {
                (<ColumnGroup>child).addDisplayedLeafColumns(leafColumns);
            }
        });
    }

    private addLeafColumns(leafColumns: Column[]): void {
        this.children.forEach( (child: ColumnGroupChild) => {
            if (child instanceof Column) {
                leafColumns.push(<Column>child);
            } else if (child instanceof ColumnGroup) {
                (<ColumnGroup>child).addLeafColumns(leafColumns);
            }
        });
    }

    public getChildren(): ColumnGroupChild[] {
        return this.children;
    }

    public getColumnGroupShow(): string {
        return this.originalColumnGroup.getColumnGroupShow();
    }

    public calculateDisplayedColumns() {
        // clear out last time we calculated
        this.displayedChildren = [];
        // it not expandable, everything is visible
        if (!this.originalColumnGroup.isExpandable()) {
            this.displayedChildren = this.children;
            return;
        }
        // and calculate again
        for (var i = 0, j = this.children.length; i < j; i++) {
            var abstractColumn = this.children[i];
            var headerGroupShow = abstractColumn.getColumnGroupShow();
            switch (headerGroupShow) {
                case ColumnGroup.HEADER_GROUP_SHOW_OPEN:
                    // when set to open, only show col if group is open
                    if (this.originalColumnGroup.isExpanded()) {
                        this.displayedChildren.push(abstractColumn);
                    }
                    break;
                case ColumnGroup.HEADER_GROUP_SHOW_CLOSED:
                    // when set to open, only show col if group is open
                    if (!this.originalColumnGroup.isExpanded()) {
                        this.displayedChildren.push(abstractColumn);
                    }
                    break;
                default:
                    // default is always show the column
                    this.displayedChildren.push(abstractColumn);
                    break;
            }
        }
    }

}
