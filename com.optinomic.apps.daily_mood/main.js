/**
 * @name Optinomic - AppCtrl
 * ---------------------------------------
 * Controller of the Optinomic-Application.
 */
app.controller('AppCtrl', function($scope, $filter, dataService, scopeDService) {

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
                $scope.setDataView();
                $scope.setExport();

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
    // DataView : angulargrid.com
    // -----------------------------------
    $scope.setDataView = function() {

        // If we have multiple surveys - make sure to take the right 'responses'.
        var currentResultGroup = 0;
        $scope.d.dataMain.survey_responses_group_definitions.forEach(function(current_group_def, myindex) {
            if (current_group_def.survey === 'aus_survey') {
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
            my_response.display = 'Mood: ' + my_response.filled.substring(0, 10) + ' = ' + my_response.daily_mood;

            $scope.d.dataMain.survey_responses_array.push(my_response);
        });

        var resultsArray = dataService.sortByKey($scope.d.dataMain.survey_responses_array, 'filled');
        console.log('===>  sorted resultsArray: ', resultsArray);


        // DataView - Options
        $scope.d.grid.options = $scope.d.grid.default_options;
        $scope.d.grid.options.columnDefs = $scope.d.functions.createColumnDefs(resultsArray, true, true);
        $scope.d.grid.options.rowData = resultsArray;


        $scope.setTimelineChartOptions();

        //console.log('dataGRID: ', $scope.d.grid);
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
        $scope.d.timeline.data = $scope.d.grid.options.rowData;

        $scope.d.timeline.options = {
            'title': 'Tägliche Stimmung',
            'focusField': 'daily_mood',
            'defaultChart': 'day',
            'dateField': 'filled',
            'fillDates': false,
            'firstWeekDay': 'Mo',
            'patient': patientFullName
        };
    };



    // -------------------------------------------------
    // Update Data-Grid when Data loaded & Grid is ready
    // -------------------------------------------------
    $scope.$watch('d._init.grid', function(newValue, oldValue) {

        if ($scope.d._init.grid.grid_ready === true) {
            // -----------------------------------

            // Sorting
            var sortModel = [{
                colId: 'filled',
                sort: 'desc'
            }];

            $scope.d.grid.options.api.setSortModel(sortModel);


            console.log('(FIRE) updateDataView', $scope.d.grid.options);


        };

    }, true);




});
