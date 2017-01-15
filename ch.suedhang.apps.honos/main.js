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
                $scope.setTableView();
                // $scope.setDataView();
                // $scope.setTimelineChartOptions();
                // $scope.setExport();

            };

            // Run Public-Functions:
            // $scope.d.functions.getAllCalculations();


            // Finishing: Console Info & Init = done.
            console.log('Welcome, ', $scope.d.dataMain.apps.current.name, $scope.d);
            $scope.d.init = true;
        });
    };
    $scope.loadMainData();




    // -----------------------------------
    // Table: View
    // -----------------------------------

    $scope.setTableView = function() {

        var survey_responses = $scope.d.dataMain.survey_responses;

        var honos = {
            "responses": []
        };



        survey_responses.forEach(function(resp, myRespID) {

            var problem_art = [{
                "code": "a",
                "name": "Phobisch"
            }, {
                "code": "b",
                "name": "Angst"
            }, {
                "code": "c",
                "name": "Zwangsgedanken/ -handlungen"
            }, {
                "code": "e",
                "name": "Dissoziativ"
            }, {
                "code": "f",
                "name": "Somatoform"
            }, {
                "code": "g",
                "name": "Essen"
            }, {
                "code": "h",
                "name": "Schlaf"
            }, {
                "code": "i",
                "name": "Sexuell"
            }];


            var resp_obj = {};

            resp_obj.datum = resp.entity.data.response.q402V00;

            var calculation = null;
            if ("calculations" in resp) {
                var calc = resp.calculations["0"].calculation_result;
                resp_obj.dropout = calc.dropout;
            };


            console.log('resp', myRespID, calc);

            if (resp.event.survey_name === "HoNOS Verlauf") {

                resp_obj.zeitpunkt = "Verlauf";
                resp_obj.summe = null;
                resp_obj.H1 = parseInt(resp.entity.data.response['H1[402V01]']);
                resp_obj.H2 = parseInt(resp.entity.data.response['H1[402V02]']);
                resp_obj.H3 = null;
                resp_obj.H4 = null;
                resp_obj.H5 = parseInt(resp.entity.data.response['H1[402V05]']);
                resp_obj.H6 = null;
                resp_obj.H7 = null;
                resp_obj.H8 = null;
                resp_obj.H8_text = null;
                resp_obj.H9 = null;
                resp_obj.H10 = null;
                resp_obj.H11 = null;
                resp_obj.H12 = null;


            } else {

                // H8-Text setzen
                resp_obj.H8_text = "Undefiniert";
                if (resp.entity.data.response['q402V09'] === "j") {
                    resp_obj.H8_text = "Andere: " + resp.entity.data.response['q402V10'];
                } else {
                    problem_art.forEach(function(problem, myProblemindex) {
                        if (problem.code === resp.entity.data.response['q402V09']) {
                            resp_obj.H8_text = problem.name;
                        };
                    });
                };

                var mz = 'Unbekannt';
                if (resp.entity.data.response.q401V04 === '1') {
                    mz = 'Eintritt';
                };
                if (resp.entity.data.response.q401V04 === '2') {
                    mz = 'Austritt';
                };
                if (resp.entity.data.response.q401V04 === '3') {
                    mz = 'Verlauf';
                };

                resp_obj.zeitpunkt = mz;
                resp_obj.summe = calc.sum_score.sum_total;


                resp_obj.H1 = parseInt(resp.entity.data.response['H1[402V01]']);
                resp_obj.H2 = parseInt(resp.entity.data.response['H1[402V02]']);
                resp_obj.H3 = parseInt(resp.entity.data.response['H1[402V03]']);
                resp_obj.H4 = parseInt(resp.entity.data.response['H1[402V04]']);
                resp_obj.H5 = parseInt(resp.entity.data.response['H1[402V05]']);
                resp_obj.H6 = parseInt(resp.entity.data.response['H1[402V06]']);
                resp_obj.H7 = parseInt(resp.entity.data.response['H1[402V07]']);
                resp_obj.H8 = parseInt(resp.entity.data.response['H1[402V08]']);
                resp_obj.H9 = parseInt(resp.entity.data.response['H2[402V11]']);
                resp_obj.H10 = parseInt(resp.entity.data.response['H2[402V12]']);
                resp_obj.H11 = parseInt(resp.entity.data.response['H2[402V13]']);
                resp_obj.H12 = parseInt(resp.entity.data.response['H2[402V14]']);

            };


            honos.responses.push(resp_obj);

        });

        // Sort Full-Table
        dataService.sortOn(honos.responses, 'datum', false, false);
        $scope.d.honos = honos;

    };



    // -----------------------------------
    // Chart: Timeline
    // -----------------------------------

    $scope.setTimelineChartOptions = function() {
        // -----------------------------------
        // Chart: Timeline Options
        // - fillDates:  Still experimental
        // -----------------------------------
        var myPatient = $scope.d.dataMain.patient.patient.data;
        var patientFullName = myPatient.last_name + ' ' + myPatient.first_name;

        $scope.d.timeline = {};
        $scope.d.timeline.data = $scope.d.grid.rowData;

        $scope.d.timeline.options = {
            'title': 'HoNOS',
            'focusField': 'sum_score_rounded',
            'defaultChart': 'day',
            'dateField': 'q402V00',
            'fillDates': false,
            'firstWeekDay': 'Mo',
            'patient': patientFullName
        };



        if ($scope.d.dataMain.params.location.viewname === 'score_timeline') {
            console.log('imelineChart: score_timeline');
            $scope.d.timeline.options.title = 'HoNOS Summen-Score (∑)';
            $scope.d.timeline.options.focusField = 'sum_score_rounded';
        };
        if ($scope.d.dataMain.params.location.viewname === 'honos1_timeline') {
            console.log('imelineChart: honos1_timeline');
            $scope.d.timeline.name = 'Überaktives, aggressives, Unruhe stiftendes oder agitiertes Verhalten';
            $scope.d.timeline.options.focusField = 'H1[402V01]';
            $scope.d.timeline.options.title = $scope.d.timeline.options.focusField;
        };
        if ($scope.d.dataMain.params.location.viewname === 'honos2_timeline') {
            console.log('imelineChart: honos1_timeline');
            $scope.d.timeline.options.title = '';
            $scope.d.timeline.name = 'Absichtliche Selbstverletzung';
            $scope.d.timeline.options.focusField = 'H1[402V02]';
            $scope.d.timeline.options.title = $scope.d.timeline.options.focusField;
        };
        if ($scope.d.dataMain.params.location.viewname === 'honos3_timeline') {
            console.log('imelineChart: honos3_timeline');
            $scope.d.timeline.options.title = '';
            $scope.d.timeline.name = 'Problematischer Alkohol- oder Drogenkonsum';
            $scope.d.timeline.options.focusField = 'H1[402V03]';
            $scope.d.timeline.options.title = $scope.d.timeline.options.focusField;
        };
        if ($scope.d.dataMain.params.location.viewname === 'honos4_timeline') {
            console.log('imelineChart: honos4_timeline');
            $scope.d.timeline.options.title = '';
            $scope.d.timeline.name = 'Kognitive Probleme';
            $scope.d.timeline.options.focusField = 'H1[402V04]';
            $scope.d.timeline.options.title = $scope.d.timeline.options.focusField;
        };
        if ($scope.d.dataMain.params.location.viewname === 'honos5_timeline') {
            console.log('imelineChart: honos5_timeline');
            $scope.d.timeline.options.title = '';
            $scope.d.timeline.name = 'Probleme in Zusammenhang mit körperlicher Erkrankung';
            $scope.d.timeline.options.focusField = 'H1[402V05]';
            $scope.d.timeline.options.title = $scope.d.timeline.options.focusField;
        };
        if ($scope.d.dataMain.params.location.viewname === 'honos6_timeline') {
            console.log('imelineChart: honos6_timeline');
            $scope.d.timeline.options.title = '';
            $scope.d.timeline.name = 'Probleme in Zusammenhang mit Halluzinationen und Wahnvorstellung';
            $scope.d.timeline.options.focusField = 'H1[402V06]';
            $scope.d.timeline.options.title = $scope.d.timeline.options.focusField;
        };
        if ($scope.d.dataMain.params.location.viewname === 'honos7_timeline') {
            console.log('imelineChart: honos7_timeline');
            $scope.d.timeline.options.title = '';
            $scope.d.timeline.name = 'Gedrückte Stimmung';
            $scope.d.timeline.options.focusField = 'H1[402V07]';
            $scope.d.timeline.options.title = $scope.d.timeline.options.focusField;
        };
        if ($scope.d.dataMain.params.location.viewname === 'honos8_timeline') {
            console.log('imelineChart: honos8_timeline');
            $scope.d.timeline.options.title = '';
            $scope.d.timeline.name = 'Andere psychische Probleme';
            $scope.d.timeline.options.focusField = 'H1[402V08]';
            $scope.d.timeline.options.title = $scope.d.timeline.options.focusField;
        };
        if ($scope.d.dataMain.params.location.viewname === 'honos9_timeline') {
            console.log('imelineChart: honos9_timeline');
            $scope.d.timeline.options.title = '';
            $scope.d.timeline.name = 'Probleme mit Beziehung';
            $scope.d.timeline.options.focusField = 'H2[402V11]';
            $scope.d.timeline.options.title = $scope.d.timeline.options.focusField;
        };
        if ($scope.d.dataMain.params.location.viewname === 'honos10_timeline') {
            console.log('imelineChart: honos10_timeline');
            $scope.d.timeline.options.title = '';
            $scope.d.timeline.name = 'Probleme mit alltäglichen Aktivitäten';
            $scope.d.timeline.options.focusField = 'H2[402V12]';
            $scope.d.timeline.options.title = $scope.d.timeline.options.focusField;
        };
        if ($scope.d.dataMain.params.location.viewname === 'honos11_timeline') {
            console.log('imelineChart: honos11_timeline');
            $scope.d.timeline.options.title = '';
            $scope.d.timeline.name = 'Probleme durch die Wohnbedingungen';
            $scope.d.timeline.options.focusField = 'H2[402V13]';
            $scope.d.timeline.options.title = $scope.d.timeline.options.focusField;
        };
        if ($scope.d.dataMain.params.location.viewname === 'honos12_timeline') {
            console.log('imelineChart: honos12_timeline');
            $scope.d.timeline.options.title = '';
            $scope.d.timeline.name = 'Probleme durch die Bedingungen in Beruf und Alltag';
            $scope.d.timeline.options.focusField = 'H2[402V14]';
            $scope.d.timeline.options.title = $scope.d.timeline.options.focusField;
        };
    };


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

        $scope.d.grid.rowData = $scope.d.functions.enrichResults($scope.d.grid.rowData);

        // automatic or manually like (columnDefsManually)
        // $scope.d.grid.columnDefs = $scope.d.functions.createColumnDefs($scope.d.grid.rowData, true);
        // console.log(angular.toJson($scope.d.grid.columnDefs));

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
