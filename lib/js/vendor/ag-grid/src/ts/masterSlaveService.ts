/// <reference path="columnController/columnController.ts" />
/// <reference path="gridOptionsWrapper.ts" />
/// <reference path="logger.ts" />
/// <reference path="events.ts" />
/// <reference path="eventService.ts" />

module ag.grid {

    export class MasterSlaveService {

        private gridOptionsWrapper: GridOptionsWrapper;
        private columnController: ColumnController;
        private gridPanel: GridPanel;
        private logger: Logger;
        private eventService: EventService;

        // flag to mark if we are consuming. to avoid cyclic events (ie slave firing back to master
        // while processing a master event) we mark this if consuming an event, and if we are, then
        // we don't fire back any events.
        private consuming = false;

        public init(gridOptionsWrapper: GridOptionsWrapper,
                    columnController: ColumnController,
                    gridPanel: GridPanel,
                    loggerFactory: LoggerFactory,
                    eventService: EventService) {
            this.gridOptionsWrapper = gridOptionsWrapper;
            this.columnController = columnController;
            this.gridPanel = gridPanel;
            this.eventService = eventService;
            this.logger = loggerFactory.create('MasterSlaveService');

            eventService.addEventListener(Events.EVENT_COLUMN_MOVED, this.fireColumnEvent.bind(this));
            eventService.addEventListener(Events.EVENT_COLUMN_VISIBLE, this.fireColumnEvent.bind(this));
            eventService.addEventListener(Events.EVENT_COLUMN_PINNED, this.fireColumnEvent.bind(this));
            eventService.addEventListener(Events.EVENT_COLUMN_GROUP_OPENED, this.fireColumnEvent.bind(this));
            eventService.addEventListener(Events.EVENT_COLUMN_RESIZED, this.fireColumnEvent.bind(this));
        }

        // common logic across all the fire methods
        private fireEvent(callback: (slaveService: MasterSlaveService)=>void): void {
            // if we are already consuming, then we are acting on an event from a master,
            // so we don't cause a cyclic firing of events
            if (this.consuming) {
                return;
            }

            // iterate through the slave grids, and pass each slave service to the callback
            var slaveGrids = this.gridOptionsWrapper.getSlaveGrids();
            if (slaveGrids) {
                slaveGrids.forEach( (slaveGridOptions: GridOptions) => {
                    if (slaveGridOptions.api) {
                        var slaveService = slaveGridOptions.api.__getMasterSlaveService();
                        callback(slaveService);
                    }
                });
            }
        }

        // common logic across all consume methods. very little common logic, however extracting
        // guarantees consistency across the methods.
        private onEvent(callback: ()=>void): void {
            this.consuming = true;
            callback();
            this.consuming = false;
        }

        private fireColumnEvent(event: ColumnChangeEvent): void {
            this.fireEvent( (slaveService: MasterSlaveService)=> {
                slaveService.onColumnEvent(event);
            });
        }

        public fireHorizontalScrollEvent(horizontalScroll: number): void {
            this.fireEvent( (slaveService: MasterSlaveService)=> {
                slaveService.onScrollEvent(horizontalScroll);
            });
        }

        public onScrollEvent(horizontalScroll: number): void {
            this.onEvent(()=> {
                this.gridPanel.setHorizontalScrollPosition(horizontalScroll);
            });
        }

        public getMasterColumns(event: ColumnChangeEvent): Column[] {
            var result: Column[] = [];
            if (event.getColumn()) {
                result.push(event.getColumn());
            }
            if (event.getColumns()) {
                event.getColumns().forEach( (column: Column) => {
                    result.push(column);
                });
            }
            return result;
        }

        public getColumnIds(event: ColumnChangeEvent): string[] {
            var result: string[] = [];
            if (event.getColumn()) {
                result.push(event.getColumn().getColId());
            }
            if (event.getColumns()) {
                event.getColumns().forEach( (column: Column) => {
                    result.push(column.getColId());
                });
            }
            return result;
        }

        public onColumnEvent(event: ColumnChangeEvent): void {
            this.onEvent(() => {

                // the column in the event is from the master grid. need to
                // look up the equivalent from this (slave) grid
                var masterColumn = event.getColumn();
                var slaveColumn: Column;
                if (masterColumn) {
                    slaveColumn = this.columnController.getColumn(masterColumn.getColId());
                }
                // if event was with respect to a master column, that is not present in this
                // grid, then we ignore the event
                if (masterColumn && !slaveColumn) { return; }

                // likewise for column group
                var masterColumnGroup = event.getColumnGroup();
                var slaveColumnGroup: ColumnGroup;
                if (masterColumnGroup) {
                    var colId = masterColumnGroup.getGroupId();
                    var instanceId = masterColumnGroup.getInstanceId();
                    slaveColumnGroup = this.columnController.getColumnGroup(colId, instanceId);
                }
                if (masterColumnGroup && !slaveColumnGroup) { return; }

                // in time, all the methods below should use the column ids, it's a more generic way
                // of handling columns, and also allows for single or multi column events
                var columnIds = this.getColumnIds(event);
                var masterColumns = this.getMasterColumns(event);

                switch (event.getType()) {
                    case Events.EVENT_COLUMN_MOVED:
                        this.logger.log('onColumnEvent-> processing '+event+' fromIndex = '+ event.getFromIndex() + ', toIndex = ' + event.getToIndex());
                        this.columnController.moveColumn(event.getFromIndex(), event.getToIndex());
                        break;
                    case Events.EVENT_COLUMN_VISIBLE:
                        this.logger.log('onColumnEvent-> processing '+event+' visible = '+ event.isVisible());
                        this.columnController.setColumnsVisible(columnIds, event.isVisible());
                        break;
                    case Events.EVENT_COLUMN_PINNED:
                        this.logger.log('onColumnEvent-> processing '+event+' pinned = '+ event.getPinned());
                        this.columnController.setColumnsPinned(columnIds, event.getPinned());
                        break;
                    case Events.EVENT_COLUMN_GROUP_OPENED:
                        this.logger.log('onColumnEvent-> processing '+event+' expanded = '+ masterColumnGroup.isExpanded());
                        this.columnController.setColumnGroupOpened(slaveColumnGroup, masterColumnGroup.isExpanded());
                        break;
                    case Events.EVENT_COLUMN_RESIZED:
                        masterColumns.forEach( (masterColumn: Column)=> {
                            this.logger.log('onColumnEvent-> processing '+event+' actualWidth = '+ masterColumn.getActualWidth());
                            this.columnController.setColumnWidth(masterColumn.getColId(), masterColumn.getActualWidth(), event.isFinished());
                        });
                        break;
                }

            });
        }
    }

}