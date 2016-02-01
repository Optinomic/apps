'use strict';

/**
 * Service for storing/sharing Data
 */
angular.module('optinomicDataModule')
    .service('scopeDService', function() {

        var d = {};


        // -----------------------------------------------------------
        // Angular-Grid - https://www.ag-grid.com/
        // -----------------------------------------------------------

        d._init = {};
        d._init.grid = {
            grid_ready: false,
            data_loader: 0
        };


        d.grid = {};

        d.grid.default_options = {
            headerHeight: 50,
            rowHeight: 28,
            rowData: [],
            columnDefs: [],
            //pinnedColumnCount: 1,
            dontUseScrolls: false,
            enableFilter: true,
            rowSelection: 'single',
            enableColResize: true,
            enableCellExpressions: true,
            enableSorting: true,
            showToolPanel: false,
            rowHeight: 50,
            angularCompileRows: true,


            // EVENTS
            onReady: function(event) {
                console.log('the grid is now ready - updating');
                d._init.grid.grid_ready = true;
            },


            onRowSelected: function(event) {
                console.log('Row - Selected: ', event.node.data);

                if (event.node.data === d.grid.selected_row) {
                    d.grid.selected_row = null;
                    d.grid.is_row_selected = false;
                    d.grid.options.api.deselectAll();
                } else {
                    d.grid.selected_row = event.node.data;
                    d.grid.is_row_selected = true;
                };


            }
        };



        return d;

    });
