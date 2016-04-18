/**
 * @name Optinomic - AppCtrl
 * ---------------------------------------
 * Controller of the Optinomic-Application.
 */
app.controller('AppCtrl', function($scope, dataService, scopeDService) {

    // -----------------------------------
    // Init
    // -----------------------------------

    // Data-Sharing (do not remove)
    $scope.d = scopeDService;


    // -----------------------------------
    // Functions
    // -----------------------------------

    $scope.loadMainData = function() {
        // -----------------------------------
        // Get Data: d.dataMain
        // -----------------------------------
        $scope.d.haveData = false;
        var dataPromiseMain = dataService.getMainAppData();
        dataPromiseMain.then(function(data) {

            // Save Data to $scope.d
            $scope.d.dataMain = data;

            // Check if we have survey_responses @ data.
            if (data.survey_responses.length !== 0) {
                console.log('(DATA): survey_responses:', data.survey_responses.length, data.survey_responses);
                $scope.d.haveData = true;
                $scope.setDataView();

                // Run App-Functions:
                $scope.setExport();
                $scope.setDataView();

            };

            // Run Public-Functions:
            $scope.d.functions.getAllCalculations();



            // Finishing: Console Info & Init = done.
            console.log('Welcome, ', $scope.d.dataMain.apps.current.name, $scope.d);
            $scope.d.init = true;
        });
    };
    $scope.loadMainData();



    // -----------------------------------
    // <score-threshold>
    // -----------------------------------

    // Ranges initialisieren
    //$scope.scale_ranges = {
        //"ranges": [{
        //    "from": 0,
        //    "to": 8,
        //    "result": "Keine Depression",
        //    "result_color": "green"
        //}, {
        //    "from": 9,
        //    "to": 13,
        //    "result": "Minimale Depression",
        //    "result_color": "green"
        //}, {
        //    "from": 14,
        //    "to": 19,
        //    "result": "Leichte Depression",
        //    "result_color": "orange"
        //}, {
        //    "from": 20,
        //    "to": 28,
        //    "result": "Mittelschwere Depression",
        //    "result_color": "orange"
        //}, {
        //    "from": 29,
        //    "to": 63,
        //    "result": "Schwere Depression",
        //    "result_color": "red"
        //}]
    //};

    // -----------------------------------
    // DataView : angulargrid.com
    // -----------------------------------
<<<<<<< HEAD

    $scope.d.navigator = 0;

    $scope.setCurrentResultDate = function() {
        var date = $scope.d.dataMain.calculations[0].calculation_results[$scope.d.navigator].response.data.filled;

        $scope.d.dataMain.calculations[0].calculation_results[$scope.d.navigator].response.data.filled_date = {
            'filled_datestamp': date,
            'filled_date': $filter("amDateFormat")(date, 'DD.MM.YYYY'),
            'filled_time': $filter("amDateFormat")(date, 'HH:mm')
        };

        //console.log('setCurrentResultDate', $scope.d.dataMain.calculations[0].calculation_results[$scope.d.navigator].response.data);
    };


    $scope.prev = function() {
        var count = $scope.d.dataMain.calculations[0].calculation_results.length - 1;

        if ($scope.d.navigator === 0) {
            $scope.d.navigator = count;
        } else {
            $scope.d.navigator = $scope.d.navigator - 1
        };
        $scope.setCurrentResultDate();
    };

    $scope.next = function() {
        var count = $scope.d.dataMain.calculations[0].calculation_results.length - 1;

        if (count === $scope.d.navigator) {
            $scope.d.navigator = 0;
        } else {
            $scope.d.navigator = $scope.d.navigator + 1
        };
        $scope.setCurrentResultDate();

    };


    // -------------------
    // Data-Export
    // -------------------
    $scope.setExport = function() {


        // ------------------------------------------------
        // Export - Pakete definieren
        // i n c l u d e _ a s _ j s _ s t r i n g 
        // => (export.sql) muss sich in /includes befinden
        // ------------------------------------------------


        // Hinzufügen gespeicherter SQL-Dateien in /includes
        var module_packages = [];
        var data_query = {};
        data_query = {
            name: 'BDI-II',
            sql: include_as_js_string(
                export.sql)
        };
    };
=======
    $scope.setDataView = function() {

        var resultsArray = $scope.d.dataMain.survey_responses_array;

        $scope.d.grid = {};
        $scope.d.grid.rowData = $scope.d.functions.enrichResults(resultsArray);

        // automatic or manually like (columnDefsManually)
        $scope.d.grid.columnDefs = $scope.d.functions.createColumnDefs($scope.d.grid.rowData, true);

        // columnDefsManually: If you want to create columnDefs manually:
        // Ref: http://www.angulargrid.com/angular-grid-column-definitions/index.php
        var columnDefsManually = [{
            headerTooltip: "Datum",
            headerName: "Datum",
            editable: true,
            suppressSizeToFit: true,
            width: 145,
            field: "datestamp",
            cellClass: 'md-body-1',
        }, {
            headerTooltip: "Suchtdruck_1",
            headerName: "Suchtdruck (Int)",
            cellClass: 'md-body-2',
            suppressSizeToFit: true,
            width: 110,
            valueGetter: 'parseInt(data.Suchtdruck_1)',
            filter: 'number'
        }, {
            headerName: "Bemerkungen",
            editable: true,
            cellClass: 'md-body-1',
            field: "diary",
            filter: 'text'
        }, {
            headerTooltip: "PID",
            headerName: "Patient-ID",
            editable: false,
            field: "PID",
            hide: true,
            cellClass: 'md-body-1',
            width: 90
        }, {
            headerTooltip: "FID",
            headerName: "Fall-ID",
            editable: false,
            field: "FID",
            hide: true,
            cellClass: 'md-body-1',
            width: 90
        }];


        // DataView - Options
        $scope.d.grid.options = {
            headerHeight: 45,
            rowHeight: 28,
            rowData: $scope.d.grid.rowData,
            columnDefs: $scope.d.grid.columnDefs,
            //pinnedColumnCount: 1,
            dontUseScrolls: false,
            enableFilter: true,
            rowSelection: 'single',
            enableColResize: true,
            enableCellExpressions: true,
            enableSorting: true,
            showToolPanel: false
>>>>>>> parent of dcfe627... BDI
        };


        //console.log('dataGRID: ', $scope.d.grid);
    };
