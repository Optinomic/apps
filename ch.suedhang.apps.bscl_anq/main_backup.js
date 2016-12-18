/**
 * @name Optinomic - AppCtrl
 * ---------------------------------------
 * Controller of the Optinomic-Application.
 */
app.controller('AppCtrl', function($scope, $mdDialog, dataService, scopeDService) {

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
            var current_template = $scope.d.dataMain.params.location.viewname;


            // Check if we have survey_responses @ data.
            if (data.survey_responses.length !== 0) {
                console.log('(DATA): survey_responses:', data.survey_responses.length, data.survey_responses);

                // Run Specific Functions only when needed.

                if (current_template === 'chart_tscore') {
                    $scope.setTscoreChart();
                };

                if (current_template === 'data_survey_responses') {
                    $scope.setDataView();
                };

                if (current_template === 'data_export_admin') {
                    $scope.setExport();
                };


                // Display Results
                $scope.d.haveData = true;
            };

            // Finishing: Console Info & Init = done.
            console.log('Welcome, ', $scope.d.dataMain.apps.current.name, $scope.d);
            $scope.d.init = true;
            $scope.d.functions._InitData('dataMain', true);
        });
    };
    $scope.loadMainData();


    // -----------------------------------
    // Init: Export-Data
    // -----------------------------------
    $scope.setExport = function() {


        // ------------------------------------------------
        // Export - Pakete definieren
        // i n c l u d e _ a s _ j s _ s t r i n g 
        // => (export.sql) muss sich in /includes befinden
        // ------------------------------------------------

        // Hinzufügen gespeicherter SQL-Dateien in /includes
        var module_packages = [];

        // var data_query = {};
        // data_query = {
        //     name: 'WHQOL-Example (with stay)',
        //     sql: in clude_as_js_string(
        //         export.sql)
        // };
        // module_packages.push(data_query);

        // Init the given Export Settings
        $scope.d.sql_box = $scope.d.functions.getDefaultExportSettings($scope.d.dataMain.params.app_id, module_packages);

    };


    // -----------------------------------
    // Chart: T-Score <chart-tscore>
    // -----------------------------------

    $scope.getAnswer = function(calc) {

        var myResults = calc;
        //console.log('getAnswer', myResults);

        var score_answer = [{
            "scale": 0,
            "question": "GSI (Global Severity Index)",
            "stanine": myResults.stanine.gsi,
            "t_score": myResults.t_scores.gsi,
            "scale_score": myResults.scale_scores.gsi,
            "sum_score": myResults.sum_scores.gsi
        }, {
            "scale": 1,
            "question": "Psychotizismus",
            "t_score": myResults.t_scores.psychot,
            "scale_score": myResults.scale_scores.psychot,
            "sum_score": myResults.sum_scores.psychot
        }, {
            "scale": 2,
            "question": "Paranoides Denken",
            "t_score": myResults.t_scores.paranoid,
            "scale_score": myResults.scale_scores.paranoid,
            "sum_score": myResults.sum_scores.paranoid
        }, {
            "scale": 3,
            "question": "Phobische Angst",
            "t_score": myResults.t_scores.phobisch,
            "scale_score": myResults.scale_scores.phobisch,
            "sum_score": myResults.sum_scores.phobisch
        }, {
            "scale": 4,
            "question": "Aggressivität/ Feindseligkeit",
            "t_score": myResults.t_scores.aggr,
            "scale_score": myResults.scale_scores.aggr,
            "sum_score": myResults.sum_scores.aggr
        }, {
            "scale": 5,
            "question": "Ängstlichkeit",
            "t_score": myResults.t_scores.angst,
            "scale_score": myResults.scale_scores.angst,
            "sum_score": myResults.sum_scores.angst
        }, {
            "scale": 6,
            "question": "Depressivität",
            "t_score": myResults.t_scores.depr,
            "scale_score": myResults.scale_scores.depr,
            "sum_score": myResults.sum_scores.depr
        }, {
            "scale": 7,
            "question": "Unsicherheit im Sozialkontakt",
            "t_score": myResults.t_scores.soz,
            "scale_score": myResults.scale_scores.soz,
            "sum_score": myResults.sum_scores.soz
        }, {
            "scale": 8,
            "question": "Zwanghaftigkeit",
            "t_score": myResults.t_scores.zwang,
            "scale_score": myResults.scale_scores.zwang,
            "sum_score": myResults.sum_scores.zwang
        }, {
            "scale": 9,
            "question": "Somatisierung",
            "t_score": myResults.t_scores.somat,
            "scale_score": myResults.scale_scores.somat,
            "sum_score": myResults.sum_scores.somat
        }];

        return score_answer;
    };

    $scope.setTscoreChart = function() {

        // Options
        $scope.options_plot = {
            'show_scores': true,
            'language': 'De'
        };


        // Create - Plot-Data from Calculation Results
        $scope.d.tscore_plot = [];

        var mySurveyResponses = $scope.d.dataMain.survey_responses;
        mySurveyResponses.forEach(function(survey_response, myindex) {

            var mySurveyResponseCalculations = survey_response.calculations;
            mySurveyResponseCalculations.forEach(function(calculation, myindex) {

                if (calculation.calculation_name === "get_results") {

                    var inner_calculation = calculation.calculation_result;
                    if (inner_calculation) {

                        if (survey_response.entity.data.response.q501V05 === '0') {
                            // Only if: Ja, Patient/in wird nun den BSCL ausfüllen

                            var myLabel = '';
                            myLabel = survey_response.entity.data.filled_day;


                            if (survey_response.entity.data.response.q501V04 === '1') {
                                myLabel = 'Eintritt';
                            };
                            if (survey_response.entity.data.response.q501V04 === '2') {
                                myLabel = 'Austritt';
                            };
                            if (survey_response.entity.data.response.q501V04 === '3') {
                                myLabel = 'Übertritt';
                            };

                            console.log();

                            var plot_item = {
                                "label": myLabel,
                                "label_datestamp": survey_response.entity.data.filled_day + ', ' + survey_response.entity.data.filled_time,
                                "scores": $scope.getAnswer(inner_calculation)
                            }
                            $scope.d.tscore_plot.push(plot_item);
                        };
                    };
                };
            });
        });
    };

    // -----------------------------------
    // DataView : angulargrid.com
    // -----------------------------------
    $scope.setDataView = function() {

        // If we have multiple surveys - make sure to take the right 'responses'.
        var currentResultGroup = 0;
        $scope.d.dataMain.survey_responses_group_definitions.forEach(function(current_group_def, myindex) {
            if (current_group_def.survey === 'BSCL - ANQ') {
                currentResultGroup = current_group_def.id;
            };
        });

        // Loop trough all responses from selected 'survey-group' above and save respnses in survey_responses_array
        $scope.d.dataMain.survey_responses_array = [];
        $scope.d.dataMain.survey_responses_group[currentResultGroup].forEach(function(current_result, myindex) {
            var my_response = current_result.entity.data.response;

            // If ng-survey survey @ some more info to 'response'.
            my_response.filled = current_result.entity.data.filled;
            my_response.survey_name = current_result.event.survey_name;

            $scope.d.dataMain.survey_responses_array.push(my_response);
        });
        var resultsArray = $scope.d.dataMain.survey_responses_array;


        // DataView - Options
        $scope.d.grid.options = $scope.d.grid.default_options;
        $scope.d.grid.options.columnDefs = $scope.d.functions.createColumnDefs(resultsArray, true, true);
        $scope.d.grid.options.rowData = resultsArray;


        //console.log('dataGRID: ', $scope.d.grid);
    };


});
