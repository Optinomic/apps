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
        d.grid.export_settings = {};
        d.grid.export_settings.details = false;
        d.grid.export_settings.allColumns = false;
        d.grid.export_settings.columnSeparator = ';';

        d.grid.default_options = {
            headerHeight: 50,
            rowHeight: 50,
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
            angularCompileRows: true,


            // EVENTS
            onGridReady: function(event) {
                console.log('(READY) d.grid', d.grid);
                d._init.grid.grid_ready = true;

                // Make Sure nothing is selected as 'default'
                d.grid.selected_row = null;
                d.grid.is_row_selected = false;
                d.grid.options.api.deselectAll();
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


        // -----------------------------------------------------------
        // Export
        // -----------------------------------------------------------




        // V1
        d.default_export_obj = {};
        d.default_export_obj.packages = [];
        d.default_export_obj.data = {};
        d.default_export_obj.have_data = false;
        d.default_export_obj.header = 'True';
        d.default_export_obj.direct = 'False';
        d.default_export_obj.format = 'csv';
        d.default_export_obj.sql_field = '';
        d.default_export_obj.state = 'settings';
        d.default_export_obj.delimitter = d.grid.export_settings.columnSeparator;


        return d;

    });
