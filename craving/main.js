/**
 * @name Optinomic - AppCtrl
 * ---------------------------------------
 * Controller of the Optinomic-Application.
 */
app.controller('AppCtrl', function($scope, dataService, scopeDService) {

    // -----------------------------------
    // Init
    // -----------------------------------
    $scope.appID = 'com.optinomic.apps.craving';

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
        var dataPromiseMain = dataService.getMainAppData($scope.appID);
        dataPromiseMain.then(function(data) {

            console.log('(DATA): loadedMainData:', data);

            // Save Data
            $scope.d.dataMain = data;

            // Check if we have survey_responses | data.
            if (data.survey_responses.length !== 0) {
                $scope.d.haveData = true;
                console.log('(DATA): haveData:', data.survey_responses.length, $scope.haveData);
            }

            // Load Data / Calculations
            //$scope.loadResults();


            // Run Functions a.s.a Data:
            $scope.setDataView();
            $scope.setTimelineChartOptions();
            $scope.setTscoreChart();


            console.log('Welcome, ', $scope.d.dataMain.apps.current.name, $scope.d);
            $scope.init = true;

            //FAKE DATA:  Do this in 'loadResults'.success
            $scope.d.haveData = true;
        });
    };
    $scope.loadMainData();




    // -----------------------------------
    // Data: Get Calculations 
    // -----------------------------------

    $scope.loadResults = function() {
        // -----------------------------------
        // Get Survey-Results: 
        // -----------------------------------
        var call = dataService.getAppCalculations($scope.appID, 'another_calculation');

        call.success(function(data) {
            console.log('(DATA): getAppCalculations:', data);
        });
        call.error(function(data) {
            console.log('(ERROR): getAppCalculations:', data);
        });
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

        $scope.d.options = {
            'title': 'Suchtdruck',
            'focusField': 'Suchtdruck_1',
            'fillDates': false,
            'firstWeekDay': 'Mo',
            'patient': patientFullName
        };


    };

    // -----------------------------------
    // Chart: T-Score
    // -----------------------------------




    $scope.getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }


    $scope.getAnswer = function() {
        var score_answer = [{
            "question": "GSI",
            "t_score": $scope.getRandomInt(0, 100),
            "stanine": 0,
            "sum_score": 0
        }, {
            "question": "Psychotizismus",
            "t_score": $scope.getRandomInt(0, 100),
            "stanine": 0,
            "sum_score": 0
        }, {
            "question": "Paranoides Denken",
            "t_score": $scope.getRandomInt(0, 100),
            "stanine": 0,
            "sum_score": 0
        }, {
            "question": "Phobische Angst",
            "t_score": $scope.getRandomInt(0, 100),
            "stanine": 0,
            "sum_score": 0
        }, {
            "question": "Aggressivität/ Feindseligkeit",
            "t_score": $scope.getRandomInt(0, 100),
            "stanine": 0,
            "sum_score": 0
        }, {
            "question": "Ängstlichkeit",
            "t_score": $scope.getRandomInt(0, 100),
            "stanine": 0,
            "sum_score": 0
        }, {
            "question": "Depressivität",
            "t_score": $scope.getRandomInt(0, 100),
            "stanine": 0,
            "sum_score": 0
        }, {
            "question": "Unsicherheit im Sozialkontakt",
            "t_score": $scope.getRandomInt(0, 100),
            "stanine": 0,
            "sum_score": 0
        }, {
            "question": "Zwanghaftigkeit",
            "t_score": $scope.getRandomInt(0, 100),
            "stanine": 0,
            "sum_score": 0
        }, {
            "question": "Somatisierung",
            "t_score": $scope.getRandomInt(0, 100),
            "stanine": 0,
            "sum_score": 0
        }];

        return score_answer;
    };


    $scope.setTscoreChart = function() {

        // Options
        $scope.options_plot = {
            'show_scores': true
        };


        // Results
        $scope.plotdata = [{
            "label": "Eintritt",
            "scores": $scope.getAnswer()
        }, {
            "label": "Austritt",
            "scores": $scope.getAnswer()
        }];

    };


    // -----------------------------------
    // DataView : angulargrid.com
    // -----------------------------------
    $scope.setDataView = function() {

        var columnDefs = [{
            headerName: "Datum",
            editable: true,
            field: "datestamp"
        }, {
            headerTooltip: "Suchtdruck_1",
            headerName: "Suchtdruck",
            editable: false,
            field: "Suchtdruck_1"
        }, {
            headerName: "Bemerkungen",
            editable: true,
            field: "diary"
        }, {
            headerTooltip: "PID",
            headerName: "Patient-ID",
            editable: false,
            field: "PID",
            width: 90
        }, {
            headerTooltip: "FID",
            headerName: "Fall-ID",
            editable: false,
            field: "FID",
            width: 90
        }];

        // DataView - Options
        $scope.d.gridOptions = {
            columnDefs: columnDefs,
            rowData: $scope.d.craving,
            pinnedColumnCount: 1,
            dontUseScrolls: false,
            enableFilter: true,
            enableColResize: true,
            enableSorting: true
        };

    };


});
