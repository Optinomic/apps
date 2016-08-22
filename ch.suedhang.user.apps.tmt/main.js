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
        $scope.d.tmt = {};


        $scope.d.tmt.patient_scores = $scope.getPatientScores();

    };


    // -------------------
    // Data
    // -------------------
    $scope.getPatientScores = function() {

        // Get all TMT-Scores from a Patient and arrange it in a Array
        var all_scores = []

        var all_results = $scope.d.dataMain.calculations[0].calculation_results.full;
        all_results.forEach(function(current_result, myResultIndex) {

            // Interessante Variablen
            var variables = {
                "TMTAError": [],
                "TMTATime": [],
                "TMTBError": [],
                "TMTBTime": [],
                "Perz_A": [],
                "Perz_B": [],
                "BA_Quotient": [],
                "Details": []
            };

            // Scores Obj. erstellen.
            var scores = {
                "messzeitpunkt": {
                    "eintritt": JSON.parse(JSON.stringify(variables)),
                    "austritt": JSON.parse(JSON.stringify(variables)),
                    "anderer": JSON.parse(JSON.stringify(variables)),
                    "alle": JSON.parse(JSON.stringify(variables)),
                },
                "patient_details": {
                    "edu_years": null,
                    "edu_group": {},
                    "age": null
                },
                "patient": current_result.patient
            };

            var all_responses = current_result.other_calculations['ch.suedhang.apps.tmt_V3:tmt_score']

            all_responses.forEach(function(current_response, myResponseIndex) {

                var TMTAError = current_response.TMTAError;
                var TMTATime = current_response.TMTATime;
                var TMTBError = current_response.TMTBError;
                var TMTBTime = current_response.TMTBTime;
                var Perz_A = current_response.percentile.result.A;
                var Perz_B = current_response.percentile.result.B;
                var BA_Quotient = current_response.quotient;

                scores.patient_details.edu_years = current_response.edu_years;
                scores.patient_details.edu_group = current_response.percentile.age_perz;
                scores.patient_details.age = current_response.set_age;

                var filled = current_response.response.data.filled;
                var event_id = current_response.response.data.event_id;
                var pid = current_result.patient.id;


                // Details Obj. erstellen.
                var details_obj = {
                    "TMTAError": TMTAError,
                    "TMTATime": TMTATime,
                    "TMTBError": TMTBError,
                    "TMTBTime": TMTBTime,
                    "Perz_A": Perz_A,
                    "Perz_B": Perz_B,
                    "BA_Quotient": BA_Quotient,
                    "full_response": current_response,
                    "event_id": event_id,
                    "patient_id": pid,
                    "filled_datestamp": filled
                };

                // Interessante Variablen & Details Obj. speichern.
                scores.messzeitpunkt.alle.TMTAError.push(TMTAError);
                scores.messzeitpunkt.alle.TMTATime.push(TMTATime);
                scores.messzeitpunkt.alle.TMTBError.push(TMTBError);
                scores.messzeitpunkt.alle.TMTBTime.push(TMTBTime);
                scores.messzeitpunkt.alle.Perz_A.push(Perz_A);
                scores.messzeitpunkt.alle.Perz_B.push(Perz_B);
                scores.messzeitpunkt.alle.BA_Quotient.push(BA_Quotient);
                scores.messzeitpunkt.alle.Details.push(details_obj);

                if (current_response.Messzeitpunkt.Messzeitpunkt === 1) {
                    // Eintritt
                    scores.messzeitpunkt.eintritt.TMTAError.push(TMTAError);
                    scores.messzeitpunkt.eintritt.TMTATime.push(TMTATime);
                    scores.messzeitpunkt.eintritt.TMTBError.push(TMTBError);
                    scores.messzeitpunkt.eintritt.TMTBTime.push(TMTBTime);
                    scores.messzeitpunkt.eintritt.Perz_A.push(Perz_A);
                    scores.messzeitpunkt.eintritt.Perz_B.push(Perz_B);
                    scores.messzeitpunkt.eintritt.BA_Quotient.push(BA_Quotient);
                    scores.messzeitpunkt.eintritt.Details.push(details_obj);
                };

                if (current_response.Messzeitpunkt.Messzeitpunkt === 2) {
                    // Austritt
                    scores.messzeitpunkt.austritt.TMTAError.push(TMTAError);
                    scores.messzeitpunkt.austritt.TMTATime.push(TMTATime);
                    scores.messzeitpunkt.austritt.TMTBError.push(TMTBError);
                    scores.messzeitpunkt.austritt.TMTBTime.push(TMTBTime);
                    scores.messzeitpunkt.austritt.Perz_A.push(Perz_A);
                    scores.messzeitpunkt.austritt.Perz_B.push(Perz_B);
                    scores.messzeitpunkt.austritt.BA_Quotient.push(BA_Quotient);
                    scores.messzeitpunkt.austritt.Details.push(details_obj);
                };

                if ((current_response.Messzeitpunkt.Messzeitpunkt !== 1) && (current_response.Messzeitpunkt.Messzeitpunkt !== 2)) {
                    // Anderer Messzeitpunkt
                    scores.messzeitpunkt.anderer.TMTAError.push(TMTAError);
                    scores.messzeitpunkt.anderer.TMTATime.push(TMTATime);
                    scores.messzeitpunkt.anderer.TMTBError.push(TMTBError);
                    scores.messzeitpunkt.anderer.TMTBTime.push(TMTBTime);
                    scores.messzeitpunkt.anderer.Perz_A.push(Perz_A);
                    scores.messzeitpunkt.anderer.Perz_B.push(Perz_B);
                    scores.messzeitpunkt.anderer.BA_Quotient.push(BA_Quotient);
                    scores.messzeitpunkt.anderer.Details.push(details_obj);
                };
            });

            all_scores.push(scores);
        });


        console.log('getPatientScores', all_scores);
        return all_scores;
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


    // $scope.getPatientGroupScores = function() {
    // 
    //     var pg = [];
    //     var all_pg = $scope.d.dataMain.patient_groups;
    // 
    //     all_pg.forEach(function(current_pg, myPGIndex) {
    // 
    //         var scores = [];
    //         var scores_details = [];
    // 
    //         // Loop '$scope.d.bdi_scores.patients' and check if patient is in current_pg
    //         $scope.d.bdi_scores.patients.forEach(function(current_patient_response, myPatientResponseIndex) {
    // 
    //             var response_pid = current_patient_response.patient.id;
    //             var inside_group = $scope.isPIDinGroup(current_pg.patients, response_pid);
    // 
    //             // If YES:  concat()  Arrays.
    //             if (inside_group) {
    //                 scores = scores.concat(current_patient_response.scores);
    //                 scores_details = scores_details.concat(current_patient_response.scores_details);
    //             };
    // 
    //         });
    // 
    //         var data_model = {
    //             "group": {
    //                 "id": current_pg.id,
    //                 "data": current_pg.data,
    //                 "patients": current_pg.patients
    //             },
    //             "scores": scores,
    //             "scores_details": scores_details
    //         };
    //         pg.push(data_model);
    // 
    //     });
    // 
    //     // Save to $scope
    //     $scope.d.bdi_scores.patient_groups = pg;
    // };


});
