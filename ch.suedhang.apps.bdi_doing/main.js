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
    // Download
    // -----------------------------------
    $scope.d.export = {};
    $scope.d.export.data = {};
    $scope.d.export.have_data = false;
    $scope.d.export.header = 'True';
    $scope.d.export.direct = 'False';
    $scope.d.export.format = 'csv';
    $scope.d.export.file = 1;
    $scope.d.export.delimitter = ';';
    $scope.d.export.sql_field = "select * from information_schema.tables";

    $scope.d.export.sql_field = "SELECT patient.id 
    , patient.last_name 
    , ((cast(response AS json))->>'BDI[BDI1]') as BDI1
    , ((cast(response AS json))->>'BDI[BDI2]') as BDI2
    , ((cast(response AS json))->>'BDI[BDI3]') as BDI3
    , ((cast(response AS json))->>'BDI[BDI4]') as BDI4
    , ((cast(response AS json))->>'BDI[BDI5]') as BDI5
    , ((cast(response AS json))->>'BDI[BDI6]') as BDI6
    , ((cast(response AS json))->>'BDI[BDI7]') as BDI7
    , ((cast(response AS json))->>'BDI[BDI8]') as BDI8
    , ((cast(response AS json))->>'BDI[BDI9]') as BDI9
    , ((cast(response AS json))->>'BDI[BDI10]') as BDI10
    , ((cast(response AS json))->>'BDI[BDI11]') as BDI11
    , ((cast(response AS json))->>'BDI[BDI12]') as BDI12
    , ((cast(response AS json))->>'BDI[BDI13]') as BDI13
    , ((cast(response AS json))->>'BDI[BDI14]') as BDI14
    , ((cast(response AS json))->>'BDI[BDI15]') as BDI15
    , ((cast(response AS json))->>'BDI[BDI16]') as BDI16
    , ((cast(response AS json))->>'BDI[BDI17]') as BDI17
    , ((cast(response AS json))->>'BDI[BDI18]') as BDI18
    , ((cast(response AS json))->>'BDI[BDI19]') as BDI19
    , ((cast(response AS json))->>'BDI[BDI20]') as BDI20   
    , ((cast(response AS json))->>'BDI[BDI21]') as BDI21
    FROM survey_response INNER JOIN patient ON(survey_response.patient = patient.id) 
    WHERE module = 'ch.suedhang.apps.bdi_doing'";

    // ToDO: M4 - Import - remove new lines.

    //var sql_import_string = "in_clude(`templates/export.sql')";
    //$scope.d.export.sql_field = sql_import_string.join(' *\n *');

    //$scope.d.export.sql_field = "SELECT 
    //patient.id, patient.last_name, ((cast(response AS json)) - >> 'BSCL[sq504V40]') as gaga, recode_into(((cast(response AS json)) - >> 'BSCL[sq504V40]'), '', '-1') as sq504V40, recode_into(((cast(response AS json)) - >> 'BSCL[sq504V40]'), '', '0') + 2 as gaga
    //FROM survey_response INNER JOIN patient ON(survey_response.patient = patient.id)
    //WHERE module = 'ch.suedhang.apps.bscl.anq'
    //";

    $scope.export = function() {

        var api = dataService.runSQL($scope.d.export.sql_field, $scope.d.export.delimitter, $scope.d.export.header, $scope.d.export.format, $scope.d.export.direct);
        var aSQL = dataService.getData(api);

        aSQL.then(function(data) {
            $scope.d.export.have_data = true;
            $scope.d.export.data = data;
            console.log('export - Done: ', $scope.d.export.data);
        });

    };

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
<<<<<<< HEAD
});
=======


});
>>>>>>> parent of dcfe627... BDI
