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
    // Dataexport
    // -----------------------------------

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
            name: 'HoNOS',
            sql: include_as_js_string(
                export.sql)
        };
        module_packages.push(data_query);

        // Init the given Export Settings
        $scope.d.sql_box = $scope.d.functions.getDefaultExportSettings($scope.d.dataMain.params.app_id, module_packages);
    };




    // -----------------------------------
    // DataView : angulargrid.com
    // -----------------------------------
    $scope.setDataView = function() {



        // set data - we only have one survey - so easy:
        // Which survey - check: dataMain.survey_responses_group
        var group_id = 0;
        $scope.d.grid.rowData = [];

        $scope.d.dataMain.survey_responses_group[group_id].forEach(function(current_result, myindex) {
            // Add response fields to grid
            var my_response = current_result.entity.data.response;
            my_response.filled = current_result.entity.data.filled;

            // Add calculation fields to grid
            var my_calculations = current_result.calculations[group_id].calculation_result;
            my_response.dropout = my_calculations.dropout.dropout;
            my_response.dropout_id = my_calculations.dropout.dropout_id;
            my_response.dropout_raeson = my_calculations.dropout.dropout_raeson;
            my_response.count_kA = my_calculations.sum_score.count_kA;
            my_response.count_value = my_calculations.sum_score.count_value;
            my_response.sum_score = my_calculations.sum_score.sum_score;
            my_response.sum_score_rounded = my_calculations.sum_score.sum_score_rounded;
            my_response.sum_total = my_calculations.sum_score.sum_total;

            $scope.d.grid.rowData.push(my_response);
        });

        // automatic or manually like (columnDefsManually)
        $scope.d.grid.columnDefs = $scope.d.functions.createColumnDefs($scope.d.grid.rowData, true);
        console.log(angular.toJson($scope.d.grid.columnDefs));

        // columnDefsManually: If you want to create columnDefs manually:
        // Ref: http://www.angulargrid.com/angular-grid-column-definitions/index.php
        var columnDefsManually = [{
            "headerTooltip": "PID",
            "headerName": "PID",
            "cellClass": "md-body-1",
            "field": "PID",
            "hide": true,
            "width": 110,
            "suppressSizeToFit": true
        }, {
            "headerTooltip": "FID",
            "headerName": "FID",
            "cellClass": "md-body-1",
            "field": "FID",
            "hide": true,
            "width": 110,
            "suppressSizeToFit": true
        }, {
            "headerTooltip": "datestamp",
            "headerName": "datestamp",
            "cellClass": "md-body-1",
            "field": "datestamp",
            "width": 145,
            "suppressSizeToFit": true,
            "hide": true
        }, {
            "headerTooltip": "datestamp_day",
            "headerName": "datestamp_day",
            "cellClass": "md-body-1",
            "field": "datestamp_day",
            "hide": false,
            "width": 88,
            "suppressSizeToFit": true,
            "pinned": "left"
        }, {
            "headerTooltip": "datestamp_time",
            "headerName": "datestamp_time",
            "cellClass": "md-body-1",
            "field": "datestamp_time",
            "hide": false,
            "width": 62,
            "suppressSizeToFit": true,
            "pinned": "left"
        }, {
            "headerTooltip": "datestamp_week",
            "headerName": "datestamp_week",
            "cellClass": "md-body-1",
            "field": "datestamp_week",
            "width": 78,
            "hide": true
        }, {
            "headerTooltip": "datestamp_weekday",
            "headerName": "datestamp_weekday",
            "cellClass": "md-body-1",
            "field": "datestamp_weekday",
            "width": 145,
            "hide": true
        }, {
            "headerTooltip": "datestamp_year",
            "headerName": "datestamp_year",
            "cellClass": "md-body-1",
            "field": "datestamp_year",
            "width": 145,
            "hide": true,
            "sort": "asc",
            "filter": "number"
        }, {
            "headerTooltip": "dropout",
            "headerName": "dropout",
            "cellClass": "md-body-1",
            "width": 80,
            "field": "dropout"
        }, {
            "headerTooltip": "dropout_id",
            "headerName": "dropout_id",
            "cellClass": "md-body-1",
            "hide": true,
            "field": "dropout_id"
        }, {
            "headerTooltip": "dropout_raeson",
            "headerName": "dropout_raeson",
            "cellClass": "md-body-1",
            "field": "dropout_raeson"
        }, {
            "headerTooltip": "Σ - Summenscore",
            "headerName": "Σ",
            "cellClass": "md-body-1",
            "width": 52,
            "suppressSizeToFit": true,
            "hide": true,
            "field": "sum_score"
        }, {
            "headerTooltip": "Σ - Summenscore (gerundet)",
            "headerName": "Σ (gerundet)",
            "cellClass": "md-body-1",
            "pinned": "left",
            "width": 52,
            "suppressSizeToFit": true,
            "hide": false,
            "field": "sum_score_rounded"
        }, {
            "headerTooltip": "sum_total",
            "headerName": "sum_total",
            "cellClass": "md-body-1",
            "width": 52,
            "suppressSizeToFit": true,
            "hide": true,
            "field": "sum_total"
        }, {
            "headerTooltip": "Überaktives, aggressives, Unruhe stiftendes oder agitiertes Verhalten",
            "headerName": "H1[402V01]",
            "cellClass": "md-body-1",
            "width": 52,
            "suppressSizeToFit": true,
            "field": "H1[402V01]",
            "filter": "number"
        }, {
            "headerTooltip": "Absichtliche Selbstverletzung",
            "headerName": "H1[402V02]",
            "cellClass": "md-body-1",
            "width": 52,
            "suppressSizeToFit": true,
            "field": "H1[402V02]"
        }, {
            "headerTooltip": "Problematischer Alkohol- oder Drogenkonsum",
            "headerName": "H1[402V03]",
            "cellClass": "md-body-1",
            "width": 52,
            "suppressSizeToFit": true,
            "field": "H1[402V03]"
        }, {
            "headerTooltip": "Kognitive Probleme",
            "headerName": "H1[402V04]",
            "cellClass": "md-body-1",
            "width": 52,
            "suppressSizeToFit": true,
            "field": "H1[402V04]"
        }, {
            "headerTooltip": "Probleme in Zusammenhang mit körperlicher Erkrankung",
            "headerName": "H1[402V05]",
            "cellClass": "md-body-1",
            "width": 52,
            "suppressSizeToFit": true,
            "field": "H1[402V05]"
        }, {
            "headerTooltip": "Probleme in Zusammenhang mit Halluzinationen und Wahnvorstellung",
            "headerName": "H1[402V06]",
            "cellClass": "md-body-1",
            "width": 52,
            "suppressSizeToFit": true,
            "field": "H1[402V06]"
        }, {
            "headerTooltip": "Gedrückte Stimmung",
            "headerName": "H1[402V07]",
            "cellClass": "md-body-1",
            "width": 52,
            "suppressSizeToFit": true,
            "field": "H1[402V07]"
        }, {
            "headerTooltip": "Andere psychische Probleme",
            "headerName": "H1[402V08]",
            "cellClass": "md-body-1",
            "width": 52,
            "suppressSizeToFit": true,
            "field": "H1[402V08]"
        }, {
            "headerTooltip": "Probleme mit Beziehung",
            "headerName": "H2[402V11]",
            "cellClass": "md-body-1",
            "width": 52,
            "suppressSizeToFit": true,
            "field": "H2[402V11]"
        }, {
            "headerTooltip": "Probleme mit alltäglichen Aktivitäten",
            "headerName": "H2[402V12]",
            "cellClass": "md-body-1",
            "width": 52,
            "suppressSizeToFit": true,
            "field": "H2[402V12]"
        }, {
            "headerTooltip": "Probleme durch die Wohnbedingungen",
            "headerName": "H2[402V13]",
            "cellClass": "md-body-1",
            "width": 52,
            "suppressSizeToFit": true,
            "field": "H2[402V13]"
        }, {
            "headerTooltip": "Probleme durch die Bedingungen in Beruf und Alltag",
            "headerName": "H2[402V14]",
            "cellClass": "md-body-1",
            "width": 52,
            "suppressSizeToFit": true,
            "field": "H2[402V14]"
        }, {
            "headerTooltip": "cgiSG",
            "headerName": "cgiSG",
            "cellClass": "md-body-1",
            "width": 52,
            "suppressSizeToFit": true,
            "hide": true,
            "field": "cgiSG"
        }, {
            "headerTooltip": "cgiZA",
            "headerName": "cgiZA",
            "cellClass": "md-body-1",
            "width": 52,
            "hide": true,
            "suppressSizeToFit": true,
            "field": "cgiZA"
        }, {
            "headerTooltip": "q401V04",
            "headerName": "q401V04",
            "cellClass": "md-body-1",
            "width": 52,
            "suppressSizeToFit": true,
            "field": "q401V04"
        }, {
            "headerTooltip": "q401V05",
            "headerName": "q401V05",
            "cellClass": "md-body-1",
            "width": 52,
            "suppressSizeToFit": true,
            "field": "q401V05"
        }, {
            "headerTooltip": "q401V06",
            "headerName": "q401V06",
            "cellClass": "md-body-1",
            "width": 52,
            "suppressSizeToFit": true,
            "field": "q401V06"
        }, {
            "headerTooltip": "q402V00",
            "headerName": "q402V00",
            "cellClass": "md-body-1",
            "hide": true,
            "field": "q402V00"
        }, {
            "headerTooltip": "q402V09",
            "headerName": "q402V09",
            "cellClass": "md-body-1",
            "field": "q402V09",
            "width": 10,
            "suppressSizeToFit": true
        }, {
            "headerTooltip": "q402V10",
            "headerName": "q402V10",
            "cellClass": "md-body-1",
            "field": "q402V10"
        }, {
            "headerTooltip": "count_kA",
            "headerName": "count_kA",
            "cellClass": "md-body-1",
            "width": 52,
            "hide": true,
            "suppressSizeToFit": true,
            "field": "count_kA"
        }, {
            "headerTooltip": "count_value",
            "headerName": "count_value",
            "cellClass": "md-body-1",
            "width": 52,
            "hide": true,
            "suppressSizeToFit": true,
            "field": "count_value"
        }, {
            "headerTooltip": "filled",
            "headerName": "filled",
            "cellClass": "md-body-1",
            "field": "filled",
            "width": 145,
            "suppressSizeToFit": true,
            "hide": true
        }, {
            "headerTooltip": "filled_day",
            "headerName": "filled_day",
            "cellClass": "md-body-1",
            "field": "filled_day",
            "hide": true,
            "width": 88,
            "suppressSizeToFit": true
        }, {
            "headerTooltip": "filled_time",
            "headerName": "filled_time",
            "cellClass": "md-body-1",
            "field": "filled_time",
            "hide": true,
            "width": 62,
            "suppressSizeToFit": true
        }, {
            "headerTooltip": "filled_week",
            "headerName": "filled_week",
            "cellClass": "md-body-1",
            "field": "filled_week",
            "width": 78,
            "hide": true
        }, {
            "headerTooltip": "filled_weekday",
            "headerName": "filled_weekday",
            "cellClass": "md-body-1",
            "field": "filled_weekday",
            "width": 145,
            "hide": true
        }, {
            "headerTooltip": "filled_year",
            "headerName": "filled_year",
            "cellClass": "md-body-1",
            "field": "filled_year",
            "width": 145,
            "hide": true,
            "sort": "asc",
            "filter": "number"
        }, {
            "headerTooltip": "startdate",
            "headerName": "startdate",
            "cellClass": "md-body-1",
            "field": "startdate",
            "width": 145,
            "suppressSizeToFit": true,
            "hide": true
        }, {
            "headerTooltip": "startdate_day",
            "headerName": "startdate_day",
            "cellClass": "md-body-1",
            "field": "startdate_day",
            "hide": true,
            "width": 88,
            "suppressSizeToFit": true
        }, {
            "headerTooltip": "startdate_time",
            "headerName": "startdate_time",
            "cellClass": "md-body-1",
            "field": "startdate_time",
            "hide": true,
            "width": 62,
            "suppressSizeToFit": true
        }, {
            "headerTooltip": "startdate_week",
            "headerName": "startdate_week",
            "cellClass": "md-body-1",
            "field": "startdate_week",
            "width": 78,
            "hide": true
        }, {
            "headerTooltip": "startdate_weekday",
            "headerName": "startdate_weekday",
            "cellClass": "md-body-1",
            "field": "startdate_weekday",
            "width": 145,
            "hide": true
        }, {
            "headerTooltip": "startdate_year",
            "headerName": "startdate_year",
            "cellClass": "md-body-1",
            "field": "startdate_year",
            "width": 145,
            "hide": true,
            "sort": "asc",
            "filter": "number"
        }, {
            "headerTooltip": "startlanguage",
            "headerName": "startlanguage",
            "cellClass": "md-body-1",
            "field": "startlanguage",
            "hide": true
        }, {
            "headerTooltip": "submitdate",
            "headerName": "submitdate",
            "cellClass": "md-body-1",
            "field": "submitdate",
            "width": 145,
            "suppressSizeToFit": true,
            "hide": true
        }, {
            "headerTooltip": "submitdate_day",
            "headerName": "submitdate_day",
            "cellClass": "md-body-1",
            "field": "submitdate_day",
            "hide": true,
            "width": 88,
            "suppressSizeToFit": true
        }, {
            "headerTooltip": "submitdate_time",
            "headerName": "submitdate_time",
            "cellClass": "md-body-1",
            "field": "submitdate_time",
            "hide": true,
            "width": 62,
            "suppressSizeToFit": true
        }, {
            "headerTooltip": "submitdate_week",
            "headerName": "submitdate_week",
            "cellClass": "md-body-1",
            "field": "submitdate_week",
            "width": 78,
            "hide": true
        }, {
            "headerTooltip": "submitdate_weekday",
            "headerName": "submitdate_weekday",
            "cellClass": "md-body-1",
            "field": "submitdate_weekday",
            "width": 145,
            "hide": true
        }, {
            "headerTooltip": "submitdate_year",
            "headerName": "submitdate_year",
            "cellClass": "md-body-1",
            "field": "submitdate_year",
            "width": 145,
            "hide": true,
            "sort": "asc",
            "filter": "number"
        }, {
            "headerTooltip": "id",
            "headerName": "id",
            "cellClass": "md-body-1",
            "field": "id",
            "width": 110,
            "hide": true
        }, {
            "headerTooltip": "lastpage",
            "headerName": "lastpage",
            "cellClass": "md-body-1",
            "field": "lastpage",
            "hide": true
        }, {
            "headerTooltip": "optinomixHASH",
            "headerName": "optinomixHASH",
            "cellClass": "md-body-1",
            "field": "optinomixHASH",
            "width": 110,
            "hide": true
        }];

        $scope.d.grid.columnDefs = columnDefsManually;


        // DataView - Options
        $scope.d.grid.options = $scope.d.grid.default_options;
        $scope.d.grid.options.rowData = $scope.d.grid.rowData;
        $scope.d.grid.options.columnDefs = $scope.d.grid.columnDefs;


        //console.log('dataGRID: ', $scope.d.grid);
    };





});
