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

                // Run App-Functions:
                $scope.setDataView();
                $scope.setTscoreChart();

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
        };


        //console.log('dataGRID: ', $scope.d.grid);
    };


});
