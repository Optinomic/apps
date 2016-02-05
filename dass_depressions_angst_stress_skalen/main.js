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
                $scope.setCurrentResultDate();

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

    $scope.d.export.sql_field = "SELECT patient.id , patient.last_name , ((cast(response AS json))->>'BSCL[sq504V40]') as gaga , recode_into(((cast(response AS json))->>'BSCL[sq504V40]'), '', '-1') as sq504V40 , recode_into(((cast(response AS json))->>'BSCL[sq504V40]'), '', '0') + 2 as gaga FROM survey_response INNER JOIN patient ON(survey_response.patient = patient.id) WHERE module = 'ch.suedhang.apps.bscl.anq'";


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
    $scope.d.depression_scale_range = {
        "ranges": [{
            "from": 0,
            "to": 9,
            "result": "Keine erhöhte Wahrscheinlichkeit für das Vorliegen einer depressiven Störung.",
            "result_color": "green"
        }, {
            "from": 10,
            "to": 21,
            "result": "Erhöhte Wahrscheinlichkeit für das Vorliegen einer depressiven Störung.",
            "result_color": "green"
        }]
    };
    $scope.d.angst_scale_range = {
        "ranges": [{
            "from": 0,
            "to": 5,
            "result": "Keine erhöhte Wahrscheinlichkeit für das Vorliegen einer Angststörung.",
            "result_color": "green"
        }, {
            "from": 7,
            "to": 21,
            "result": "Erhöhte Wahrscheinlichkeit für das Vorliegen einer Angststörung.",
            "result_color": "green"
        }]
    };
    $scope.d.stress_scale_range = {
        "ranges": [{
            "from": 0,
            "to": 9,
            "result": "Keine erhöhte Wahrscheinlichkeit für das Vorliegen einer Stressbelastung.",
            "result_color": "green"
        }, {
            "from": 10,
            "to": 21,
            "result": "Erhöhte Wahrscheinlichkeit für das Vorliegen einer Stressbelastung.",
            "result_color": "green"
        }]
    };


    // -----------------------------------
    // Navigation
    // -----------------------------------

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


    // -----------------------------------
    // DataView : angulargrid.com
    // -----------------------------------
    $scope.setDataView = function() {

        // If we have multiple surveys - make sure to take the right 'responses'.
        var currentResultGroup = 0;
        $scope.d.dataMain.survey_responses_group_definitions.forEach(function(current_group_def, myindex) {
            if (current_group_def.survey === 'Second example survey') {
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


        // Init Responses

        // DataView - Options
        $scope.d.grid.options = $scope.d.grid.default_options;
        $scope.d.grid.options.columnDefs = $scope.d.functions.createColumnDefs($scope.d.grid.rowData, true, true);



        //console.log('dataGRID: ', $scope.d.grid);
    };


});
