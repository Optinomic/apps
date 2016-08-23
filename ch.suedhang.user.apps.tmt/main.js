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
            console.log('(DATA): getCalculation: ', $scope.d.calculations);
        });
        call.error(function(data) {
            console.log('(ERROR): getCalculation:', data);
        });
    };






    // -------------------
    // TMT Init
    // -------------------
    $scope.tmt_init = function() {

        // Simulate responses from 'calculation'
        var d = $scope.d.dataMain.calculations[0].calculation_results.full;
        var pg = $scope.d.dataMain.patient_groups;

        // Calculate stuff
        var patient_scores = $scope.getPatientScores(d);
        var age_edu_scores = $scope.arrangePatientScoresAgeEdu(patient_scores);
        // var group_scores = $scope.getPatientGroupScores(patient_scores, pg);

        // Safe
        $scope.d.tmt = {};
        $scope.d.tmt.patient_scores = patient_scores;
        $scope.d.tmt.age_edu_scores = age_edu_scores;

        // $scope.d.tmt.group_scores = group_scores;

    };


    // -------------------
    // Data
    // -------------------

    $scope.getVariables = function() {

        // Interessante Variablen
        var variables = {
            "TMTAError": [],
            "TMTATime": [],
            "TMTBError": [],
            "TMTBTime": [],
            "Perz_A": [],
            "Perz_B": [],
            "BA_Quotient": [],
            "n": 0
        };

        // Clone Obj. and Return
        return JSON.parse(JSON.stringify(variables));
    };

    $scope.isArray = function(obj) {
        return (typeof obj !== 'undefined' &&
            obj && obj.constructor === Array);
    };

    $scope.concatAllArraysInObject = function(objectFull, objectToConcat) {



        // Create 'all propertys array'
        var allFullPropertys = [];

        var isArray =
            function(obj) {
                console.log('isArray: ', obj, (typeof obj !== 'undefined' &&
                    obj && obj.constructor === Array));
                return (typeof obj !== 'undefined' &&
                    obj && obj.constructor === Array);
            }

        for (var property in objectFull) {
            if (objectFull.hasOwnProperty(property)) {
                allFullPropertys.push(property);
            }
        }

        // Loop "allFullPropertys" and check if objectToConcat has them: if yes: Concat.
        for (var x = 0; x < allFullPropertys.length; x++) {
            var current_property = allFullPropertys[x];

            var ArrayFromObjectToConcat = objectToConcat[current_property];
            var isThisArray = $scope.isArray(ArrayFromObjectToConcat);

            if (isThisArray) {
                // Array found Concat!
                objectFull[current_property] = objectFull[current_property].concat(ArrayFromObjectToConcat);
            };

            // set n;
            if (objectFull.n !== objectFull[current_property].length) {
                objectFull.n = objectFull[current_property].length;
            };

        };



        // Return
        return objectFull;
    };

    $scope.getPatientScores = function(d) {

        // Get all TMT-Scores from a Patient and arrange it in a Array
        var all_scores = [];

        for (var i = 0; i < d.length; i++) {
            var current_result = d[i];



            // Scores Obj. erstellen.
            var scores = {
                "patient_details": {
                    "edu_years": null,
                    "edu_group": {},
                    "age": null
                },
                "mz_alle_vars": $scope.getVariables(),
                "mz_eintritt_vars": $scope.getVariables(),
                "mz_austritt_vars": $scope.getVariables(),
                "mz_anderer_vars": $scope.getVariables(),
                "mz_alle_details": [],
                "mz_eintritt_details": [],
                "mz_austritt_details": [],
                "mz_anderer_details": [],
                "patient": current_result.patient
            };



            var all_responses = current_result.other_calculations['ch.suedhang.apps.tmt_V3:tmt_score']

            for (var x = 0; x < all_responses.length; x++) {
                var current_response = all_responses[x];

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

                var messzeitpunkt = current_response.mz;


                // Details Obj. erstellen.
                var details_obj = {
                    "TMTAError": TMTAError,
                    "TMTATime": TMTATime,
                    "TMTBError": TMTBError,
                    "TMTBTime": TMTBTime,
                    "Perz_A": Perz_A,
                    "Perz_B": Perz_B,
                    "BA_Quotient": BA_Quotient,
                    "messzeitpunkt": messzeitpunkt,
                    //"full_response": current_response,
                    "event_id": event_id,
                    "patient_id": pid,
                    "filled_datestamp": filled
                };

                var details_obj_clone = JSON.parse(JSON.stringify(details_obj));
                //var details_obj_clone_2 = JSON.parse(JSON.stringify(details_obj_clone_1));


                // Interessante Variablen & Details Obj. speichern.
                scores.mz_alle_details.push(details_obj_clone);
                scores.mz_alle_vars.TMTAError.push(TMTAError);
                scores.mz_alle_vars.TMTATime.push(TMTATime);
                scores.mz_alle_vars.TMTBError.push(TMTBError);
                scores.mz_alle_vars.TMTBTime.push(TMTBTime);
                scores.mz_alle_vars.Perz_A.push(Perz_A);
                scores.mz_alle_vars.Perz_B.push(Perz_B);
                scores.mz_alle_vars.BA_Quotient.push(BA_Quotient);


                //details_responses.mz_eintritt_details.push(details_obj_clone_2);

                if (messzeitpunkt === 1) {
                    // Eintritt
                    scores.mz_eintritt_details.push(details_obj);
                    scores.mz_eintritt_vars.TMTAError.push(TMTAError);
                    scores.mz_eintritt_vars.TMTATime.push(TMTATime);
                    scores.mz_eintritt_vars.TMTBError.push(TMTBError);
                    scores.mz_eintritt_vars.TMTBTime.push(TMTBTime);
                    scores.mz_eintritt_vars.Perz_A.push(Perz_A);
                    scores.mz_eintritt_vars.Perz_B.push(Perz_B);
                    scores.mz_eintritt_vars.BA_Quotient.push(BA_Quotient);
                };


                if (messzeitpunkt === 2) {
                    // Austritt
                    scores.mz_austritt_details.push(details_obj);
                    scores.mz_austritt_vars.TMTAError.push(TMTAError);
                    scores.mz_austritt_vars.TMTATime.push(TMTATime);
                    scores.mz_austritt_vars.TMTBError.push(TMTBError);
                    scores.mz_austritt_vars.TMTBTime.push(TMTBTime);
                    scores.mz_austritt_vars.Perz_A.push(Perz_A);
                    scores.mz_austritt_vars.Perz_B.push(Perz_B);
                    scores.mz_austritt_vars.BA_Quotient.push(BA_Quotient);
                };


                if ((messzeitpunkt !== 1) && (messzeitpunkt !== 2)) {
                    // Austritt
                    scores.mz_anderer_details.push(details_obj);
                    scores.mz_anderer_vars.TMTAError.push(TMTAError);
                    scores.mz_anderer_vars.TMTATime.push(TMTATime);
                    scores.mz_anderer_vars.TMTBError.push(TMTBError);
                    scores.mz_anderer_vars.TMTBTime.push(TMTBTime);
                    scores.mz_anderer_vars.Perz_A.push(Perz_A);
                    scores.mz_anderer_vars.Perz_B.push(Perz_B);
                    scores.mz_anderer_vars.BA_Quotient.push(BA_Quotient);
                };

            };

            // scores.messzeitpunkt = mz_alle;
            all_scores.push(scores);
        };

        return all_scores;
    };

    $scope.arrangePatientScoresAgeEdu = function(patient_scores) {

        // Get all TMT-Patient-Scores and arrange it in a Array | Age & Edu

        // Data Model
        var age_edu_groups = [{
            "info": {
                "age_group": 0,
                "age_group_text": "Altersgruppe 18 - 24"
            },
            "edu_all": {
                "mz_alle": $scope.getVariables(),
                "mz_eintritt": $scope.getVariables(),
                "mz_austritt": $scope.getVariables(),
                "mz_anderer": $scope.getVariables()
            },
            "edu_high": {
                "mz_alle": $scope.getVariables(),
                "mz_eintritt": $scope.getVariables(),
                "mz_austritt": $scope.getVariables(),
                "mz_anderer": $scope.getVariables()
            },
            "edu_small": {
                "mz_alle": $scope.getVariables(),
                "mz_eintritt": $scope.getVariables(),
                "mz_austritt": $scope.getVariables(),
                "mz_anderer": $scope.getVariables()
            }
        }, {
            "info": {
                "age_group": 1,
                "age_group_text": "Altersgruppe 25 – 34"
            },
            "edu_all": {
                "mz_alle": $scope.getVariables(),
                "mz_eintritt": $scope.getVariables(),
                "mz_austritt": $scope.getVariables(),
                "mz_anderer": $scope.getVariables()
            },
            "edu_high": {
                "mz_alle": $scope.getVariables(),
                "mz_eintritt": $scope.getVariables(),
                "mz_austritt": $scope.getVariables(),
                "mz_anderer": $scope.getVariables()
            },
            "edu_small": {
                "mz_alle": $scope.getVariables(),
                "mz_eintritt": $scope.getVariables(),
                "mz_austritt": $scope.getVariables(),
                "mz_anderer": $scope.getVariables()
            }
        }, {
            "info": {
                "age_group": 2,
                "age_group_text": "Altersgruppe 35 – 44"
            },
            "edu_all": {
                "mz_alle": $scope.getVariables(),
                "mz_eintritt": $scope.getVariables(),
                "mz_austritt": $scope.getVariables(),
                "mz_anderer": $scope.getVariables()
            },
            "edu_high": {
                "mz_alle": $scope.getVariables(),
                "mz_eintritt": $scope.getVariables(),
                "mz_austritt": $scope.getVariables(),
                "mz_anderer": $scope.getVariables()
            },
            "edu_small": {
                "mz_alle": $scope.getVariables(),
                "mz_eintritt": $scope.getVariables(),
                "mz_austritt": $scope.getVariables(),
                "mz_anderer": $scope.getVariables()
            }
        }, {
            "info": {
                "age_group": 3,
                "age_group_text": "Altersgruppe 45 – 54"
            },
            "edu_all": {
                "mz_alle": $scope.getVariables(),
                "mz_eintritt": $scope.getVariables(),
                "mz_austritt": $scope.getVariables(),
                "mz_anderer": $scope.getVariables()
            },
            "edu_high": {
                "mz_alle": $scope.getVariables(),
                "mz_eintritt": $scope.getVariables(),
                "mz_austritt": $scope.getVariables(),
                "mz_anderer": $scope.getVariables()
            },
            "edu_small": {
                "mz_alle": $scope.getVariables(),
                "mz_eintritt": $scope.getVariables(),
                "mz_austritt": $scope.getVariables(),
                "mz_anderer": $scope.getVariables()
            }
        }, {
            "info": {
                "age_group": 4,
                "age_group_text": "Altersgruppe 55 – 59"
            },
            "edu_all": {
                "mz_alle": $scope.getVariables(),
                "mz_eintritt": $scope.getVariables(),
                "mz_austritt": $scope.getVariables(),
                "mz_anderer": $scope.getVariables()
            },
            "edu_high": {
                "mz_alle": $scope.getVariables(),
                "mz_eintritt": $scope.getVariables(),
                "mz_austritt": $scope.getVariables(),
                "mz_anderer": $scope.getVariables()
            },
            "edu_small": {
                "mz_alle": $scope.getVariables(),
                "mz_eintritt": $scope.getVariables(),
                "mz_austritt": $scope.getVariables(),
                "mz_anderer": $scope.getVariables()
            }
        }, {
            "info": {
                "age_group": 5,
                "age_group_text": "Altersgruppe 60 – 64"
            },
            "edu_all": {
                "mz_alle": $scope.getVariables(),
                "mz_eintritt": $scope.getVariables(),
                "mz_austritt": $scope.getVariables(),
                "mz_anderer": $scope.getVariables()
            },
            "edu_high": {
                "mz_alle": $scope.getVariables(),
                "mz_eintritt": $scope.getVariables(),
                "mz_austritt": $scope.getVariables(),
                "mz_anderer": $scope.getVariables()
            },
            "edu_small": {
                "mz_alle": $scope.getVariables(),
                "mz_eintritt": $scope.getVariables(),
                "mz_austritt": $scope.getVariables(),
                "mz_anderer": $scope.getVariables()
            }
        }, {
            "info": {
                "age_group": 6,
                "age_group_text": "Altersgruppe 65 – 69"
            },
            "edu_all": {
                "mz_alle": $scope.getVariables(),
                "mz_eintritt": $scope.getVariables(),
                "mz_austritt": $scope.getVariables(),
                "mz_anderer": $scope.getVariables()
            },
            "edu_high": {
                "mz_alle": $scope.getVariables(),
                "mz_eintritt": $scope.getVariables(),
                "mz_austritt": $scope.getVariables(),
                "mz_anderer": $scope.getVariables()
            },
            "edu_small": {
                "mz_alle": $scope.getVariables(),
                "mz_eintritt": $scope.getVariables(),
                "mz_austritt": $scope.getVariables(),
                "mz_anderer": $scope.getVariables()
            }
        }, {
            "info": {
                "age_group": 7,
                "age_group_text": "Altersgruppe 70 – 74"
            },
            "edu_all": {
                "mz_alle": $scope.getVariables(),
                "mz_eintritt": $scope.getVariables(),
                "mz_austritt": $scope.getVariables(),
                "mz_anderer": $scope.getVariables()
            },
            "edu_high": {
                "mz_alle": $scope.getVariables(),
                "mz_eintritt": $scope.getVariables(),
                "mz_austritt": $scope.getVariables(),
                "mz_anderer": $scope.getVariables()
            },
            "edu_small": {
                "mz_alle": $scope.getVariables(),
                "mz_eintritt": $scope.getVariables(),
                "mz_austritt": $scope.getVariables(),
                "mz_anderer": $scope.getVariables()
            }
        }, {
            "info": {
                "age_group": 8,
                "age_group_text": "Altersgruppe 75 – 79"
            },
            "edu_all": {
                "mz_alle": $scope.getVariables(),
                "mz_eintritt": $scope.getVariables(),
                "mz_austritt": $scope.getVariables(),
                "mz_anderer": $scope.getVariables()
            },
            "edu_high": {
                "mz_alle": $scope.getVariables(),
                "mz_eintritt": $scope.getVariables(),
                "mz_austritt": $scope.getVariables(),
                "mz_anderer": $scope.getVariables()
            },
            "edu_small": {
                "mz_alle": $scope.getVariables(),
                "mz_eintritt": $scope.getVariables(),
                "mz_austritt": $scope.getVariables(),
                "mz_anderer": $scope.getVariables()
            }
        }, {
            "info": {
                "age_group": 9,
                "age_group_text": "Altersgruppe 80 – 84"
            },
            "edu_all": {
                "mz_alle": $scope.getVariables(),
                "mz_eintritt": $scope.getVariables(),
                "mz_austritt": $scope.getVariables(),
                "mz_anderer": $scope.getVariables()
            },
            "edu_high": {
                "mz_alle": $scope.getVariables(),
                "mz_eintritt": $scope.getVariables(),
                "mz_austritt": $scope.getVariables(),
                "mz_anderer": $scope.getVariables()
            },
            "edu_small": {
                "mz_alle": $scope.getVariables(),
                "mz_eintritt": $scope.getVariables(),
                "mz_austritt": $scope.getVariables(),
                "mz_anderer": $scope.getVariables()
            }
        }, {
            "info": {
                "age_group": 10,
                "age_group_text": "Altersgruppe 85 – 89"
            },
            "edu_all": {
                "mz_alle": $scope.getVariables(),
                "mz_eintritt": $scope.getVariables(),
                "mz_austritt": $scope.getVariables(),
                "mz_anderer": $scope.getVariables()
            },
            "edu_high": {
                "mz_alle": $scope.getVariables(),
                "mz_eintritt": $scope.getVariables(),
                "mz_austritt": $scope.getVariables(),
                "mz_anderer": $scope.getVariables()
            },
            "edu_small": {
                "mz_alle": $scope.getVariables(),
                "mz_eintritt": $scope.getVariables(),
                "mz_austritt": $scope.getVariables(),
                "mz_anderer": $scope.getVariables()
            }
        }];


        for (var i = 0; i < patient_scores.length; i++) {
            var current_result = patient_scores[i];

            // Get Vars
            var age_group = current_result.patient_details.edu_group.altersgruppe;
            var education_high = current_result.patient_details.edu_group.education_high; //>12

            var edu_id = 'edu_small';
            if (education_high) {
                edu_id = 'edu_high';
            };

            var something_to_save = false;
            if (current_result.patient_details.edu_group.altersgruppe_found === true) {
                something_to_save = true;
            };

            // Safe in given 'edu_id' (edu_small / edu_high)
            if (something_to_save) {
                var safe_here = age_edu_groups[age_group][edu_id];

                //SUGUS

                // Concat | all Variables
                safe_here.mz_eintritt = $scope.concatAllArraysInObject(safe_here.mz_eintritt, current_result.mz_eintritt_vars);
                safe_here.mz_austritt = $scope.concatAllArraysInObject(safe_here.mz_austritt, current_result.mz_austritt_vars);
                safe_here.mz_anderer = $scope.concatAllArraysInObject(safe_here.mz_anderer, current_result.mz_anderer_vars);
                safe_here.mz_alle = $scope.concatAllArraysInObject(safe_here.mz_alle, current_result.mz_alle_vars);
                // console.log('XXXX safe_here.mz* : | 1 after > ', age_group, edu_id, safe_here.mz_eintritt)

                // Also in 'edu_all'
                edu_id = 'edu_all';
                safe_here = age_edu_groups[age_group][edu_id];
                safe_here.mz_eintritt = $scope.concatAllArraysInObject(safe_here.mz_eintritt, current_result.mz_eintritt_vars);
                safe_here.mz_austritt = $scope.concatAllArraysInObject(safe_here.mz_austritt, current_result.mz_austritt_vars);
                safe_here.mz_anderer = $scope.concatAllArraysInObject(safe_here.mz_anderer, current_result.mz_anderer_vars);
                safe_here.mz_alle = $scope.concatAllArraysInObject(safe_here.mz_alle, current_result.mz_alle_vars);
                // console.log('XXXX safe_here.mz* : | 2 after > ', age_group, edu_id, safe_here.mz_eintritt)

            };



        };

        return age_edu_groups;
    };


    $scope.isPIDinGroup = function(patients_array, search_pid) {
        var isPIDinGroup = false;

        for (var id = 0; id < patients_array.length; id++) {
            var current_patient = patients_array[id];

            if (current_patient.id === search_pid) {
                isPIDinGroup = true;
            };
        };

        return isPIDinGroup;
    };


    $scope.getPatientGroupScores = function(patient_scores, patient_groups) {

        var pg = [];

        patient_groups.forEach(function(current_pg, myPGIndex) {

            var scores = [];
            var scores_details = [];

            // Loop '$scope.d.bdi_scores.patients' and check if patient is in current_pg
            patient_scores.forEach(function(current_patient_score, myPatientResponseIndex) {

                var response_pid = current_patient_score.patient.id;
                var inside_group = $scope.isPIDinGroup(current_pg.patients, response_pid);

                // If YES:  concat()  Arrays.
                if (inside_group) {
                    scores = scores.concat(current_patient_score.scores);
                    scores_details = scores_details.concat(current_patient_score.scores_details);
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
