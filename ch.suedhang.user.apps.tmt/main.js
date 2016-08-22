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
        $scope.d.haveData = true;
        var dataPromiseMain = dataService.getMainAppData();
        dataPromiseMain.then(function(data) {

            // Save Data to $scope.d
            $scope.d.dataMain = data;


            // Run App-Functions:
            $scope.tmt_init();
            //$scope.getPatientScores();
            $scope.getCalculation();


            // Finishing: Console Info & Init = done.
            console.log('Welcome, ', $scope.d.dataMain.apps.current.name, $scope.d);
            $scope.d.init = true;
        });
    };
    $scope.loadMainData();


    // -----------------------------------
    // Calculations
    // -----------------------------------

    $scope.getCalculation = function() {
        // Get specific calculation - Unneded already in 'd.dataMain.calculations[0].calculation_results'
        var call = dataService.getAppCalculationsUser('ch.suedhang.user.apps.tmt', 'tmt_scores');

        call.success(function(data) {
            // Save Data to $scope.d
            $scope.d.calculations = data.calculation_result;
            console.log('(DATA): getCalculation: ', data);
        });
        call.error(function(data) {
            console.log('(ERROR): getCalculation:', data);
        });
    };






    // -------------------
    // TMT Init
    // -------------------
    $scope.tmt_init = function() {

    };


    // -------------------
    // Data
    // -------------------
    $scope.getPatientScores = function() {
        // Get all TMT-Scores from a Patient and arrange it in a Array

        var patients = []
        var all_scores = []
        var all_scores_details = []
        var all_results = $scope.d.dataMain.calculations[0].calculation_results.full;

        all_results.forEach(function(current_result, myResultIndex) {

            var scores = [];
            var scores_details = [];
            var all_responses = current_result.other_calculations['ch.suedhang.apps.bdi:bdi_score']

            all_responses.forEach(function(current_response, myResponseIndex) {
                var score = current_response.score.score;
                var filled = current_response.response.data.filled;
                var event_id = current_response.response.data.event_id;
                var pid = current_response.full_responses.patient.id;

                //console.log('score: ', score);
                if (score !== null) {

                    var details_obj = {
                        "score": parseInt(score),
                        "event_id": event_id,
                        "patient_id": pid,
                        "filled_datestamp": filled,
                        "filled_date": $filter("amDateFormat")(filled, 'DD.MM.YYYY'),
                        "filled_time": $filter("amDateFormat")(filled, 'HH:mm'),
                        "filled_year": $filter("amDateFormat")(filled, 'YYYY'),
                        "filled_week": $filter("amDateFormat")(filled, 'YYYY, ww')
                    };

                    scores.push(parseInt(score));
                    scores_details.push(details_obj);
                    all_scores.push(parseInt(score));
                    all_scores_details.push(details_obj);
                };
            });

            var data_model = {
                "patient": current_result.patient,
                "scores": scores,
                "scores_details": scores_details
            };

            patients.push(data_model);
        });

        // Save to $scope
        $scope.d.bdi_scores.patients = patients;
        $scope.d.bdi_scores.all_scores = {
            "scores": all_scores,
            "scores_details": all_scores_details
        };

        $scope.getPatientGroupScores();
    };


    $scope.isPIDinGroup = function(patients_array, search_pid) {

        var isPIDinGroup = false;

        patients_array.forEach(function(current_patient, Index) {
            if (current_patient.id === search_pid) {
                isPIDinGroup = true;
                //console.log('(YES) isPIDinGroup', search_pid);
            };
        });

        return isPIDinGroup;
    };


    $scope.getPatientGroupScores = function() {

        var pg = [];
        var all_pg = $scope.d.dataMain.patient_groups;

        all_pg.forEach(function(current_pg, myPGIndex) {

            var scores = [];
            var scores_details = [];

            // Loop '$scope.d.bdi_scores.patients' and check if patient is in current_pg
            $scope.d.bdi_scores.patients.forEach(function(current_patient_response, myPatientResponseIndex) {

                var response_pid = current_patient_response.patient.id;
                var inside_group = $scope.isPIDinGroup(current_pg.patients, response_pid);

                // If YES:  concat()  Arrays.
                if (inside_group) {
                    scores = scores.concat(current_patient_response.scores);
                    scores_details = scores_details.concat(current_patient_response.scores_details);
                };

            });

            var data_model = {
                "group": {
                    "id": current_pg.id,
                    "data": current_pg.data,
                    "patients": current_pg.patients
                },
                "scores": scores,
                "scores_details": scores_details
            };
            pg.push(data_model);

        });

        // Save to $scope
        $scope.d.bdi_scores.patient_groups = pg;
    };


});
