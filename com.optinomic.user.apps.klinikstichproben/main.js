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


            // Run App-Functions
            $scope.ks_init();


            // Finishing: Console Info & Init = done.
            console.log('Welcome, ', $scope.d.dataMain.apps.current.name, $scope.d);

            $scope.d.init = true;
        });
    };
    $scope.loadMainData();



    // -------------------
    // TMT Init
    // -------------------
    $scope.ks_init = function() {

        //  Create GUI for THIS later:
        var app_id = 'ch.suedhang.user.apps.tmt';
        var app_claculation = 'tmt_klinikstichprobe';


        // Init
        var ks = {};
        var pg = $scope.d.dataMain.patient_groups;


        // Calculate stuff
        var patient_calculations = $scope.getCalculation(app_id, app_claculation);


        // Safe
        ks.pg = pg;
        ks.patient_calculations = patient_calculations;

        // Safe to $scope
        $scope.d.ks = ks;

        console.log('(!) Init, ', $scope.d.dataMain.apps.current.name, $scope.d.ks);
    };



    // -----------------------------------
    // Calculations
    // -----------------------------------

    $scope.getPatientAppCalculation = function(app_id, calc_name) {
        // Get specific calculation - Unneded already in 'd.dataMain.calculations[0].calculation_results'
        var call = dataService.getAppCalculationsUser(app_id, calc_name);

        call.success(function(data) {
            // Save Data to $scope.d
            console.log('(DATA): getCalculation: ', data.calculation_result);
            return data.calculation_result;
        });
        call.error(function(data) {
            console.log('(ERROR): getCalculation:', data);
            return {};
        });
    };

    $scope.getUserAppCalculation = function(app_id, calc_name) {
        // Get specific calculation - Unneded already in 'd.dataMain.calculations[0].calculation_results'
        var call = dataService.getAppCalculationsUser(app_id, calc_name);

        call.success(function(data) {
            // Save Data to $scope.d
            console.log('(DATA): getCalculation: ', data.calculation_result);
            return data.calculation_result;
        });
        call.error(function(data) {
            console.log('(ERROR): getCalculation:', data);
            return {};
        });
    };



    // -------------------
    // Unneeded
    // -------------------



    $scope.setAgeEduStatistics = function(age_edu_scores) {

        // Calculate Statistics for all | Age & Edu Groups

        // Data Model
        var statistics_age_edu_groups = $scope.getAgeEduGroup('empty');

        // Propertys from Data Model
        var edu_props = ['edu_all', 'edu_high', 'edu_small'];
        var mz_props = ['mz_eintritt', 'mz_austritt', 'mz_anderer', 'mz_alle'];

        // Create 'all propertys array'
        var allFullPropertys = [];
        var objectFull = $scope.getVariables('variables');
        for (var property in objectFull) {
            if (objectFull.hasOwnProperty(property)) {
                allFullPropertys.push(property);
            }
        }

        for (var group_id = 0; group_id < 11; group_id++) {

            var ziel = statistics_age_edu_groups[group_id];
            var quelle = age_edu_scores[group_id];


            for (var edu_prop_id = 0; edu_prop_id < edu_props.length; edu_prop_id++) {
                var edu_prop = edu_props[edu_prop_id];

                var ziel_edu = ziel[edu_prop];
                var quelle_edu = quelle[edu_prop];


                for (var mz_prop_id = 0; mz_prop_id < mz_props.length; mz_prop_id++) {
                    var mz_prop = mz_props[mz_prop_id];

                    var ziel_mz = ziel_edu[mz_prop];
                    var quelle_mz = quelle_edu[mz_prop];

                    if (quelle_mz.n > 0) {

                        ziel_mz.n = quelle_mz.n;


                        // Loop "allFullPropertys" and check if objectToConcat has them: if yes: Concat.
                        for (var x = 0; x < allFullPropertys.length; x++) {
                            var current_property = allFullPropertys[x];

                            var dataArray = quelle_mz[current_property];

                            if ($scope.isArray(dataArray)) {
                                // Do Statistics
                                ziel_mz[current_property] = 73;


                            };
                        };


                    } else {
                        ziel_mz.n = 0;
                    };


                };
            };


            //Writing back?
            statistics_age_edu_groups[group_id] = ziel;
        };

        return statistics_age_edu_groups;
    };


    $scope.getVariables = function(mode) {
        // Variablen oder 'Empty'?
        mode = mode === undefined ? 'variables' : mode;

        // Interessante Variablen
        var variables = {
            "TMTAError": [],
            "TMTATime": [],
            "TMTBError": [],
            "TMTBTime": [],
            "Perz_A": [],
            "Perz_B": [],
            "BA_Quotient": [],
            // do not modify the below:
            "n": 0
        };

        if (mode === 'empty') {
            variables = {};
        };

        // Clone Obj. and Return
        return JSON.parse(JSON.stringify(variables));
    };


    $scope.getAgeEduGroup = function(mode) {
        // Variablen oder 'Empty'?
        mode = mode === undefined ? 'variables' : mode;


        // Data Model
        var age_edu_groups = [{
            "info": {
                "age_group": 0,
                "age_group_text": "Altersgruppe 18 - 24"
            },
            "edu_all": {
                "mz_alle": $scope.getVariables(mode),
                "mz_eintritt": $scope.getVariables(mode),
                "mz_austritt": $scope.getVariables(mode),
                "mz_anderer": $scope.getVariables(mode)
            },
            "edu_high": {
                "mz_alle": $scope.getVariables(mode),
                "mz_eintritt": $scope.getVariables(mode),
                "mz_austritt": $scope.getVariables(mode),
                "mz_anderer": $scope.getVariables(mode)
            },
            "edu_small": {
                "mz_alle": $scope.getVariables(mode),
                "mz_eintritt": $scope.getVariables(mode),
                "mz_austritt": $scope.getVariables(mode),
                "mz_anderer": $scope.getVariables(mode)
            }
        }, {
            "info": {
                "age_group": 1,
                "age_group_text": "Altersgruppe 25 – 34"
            },
            "edu_all": {
                "mz_alle": $scope.getVariables(mode),
                "mz_eintritt": $scope.getVariables(mode),
                "mz_austritt": $scope.getVariables(mode),
                "mz_anderer": $scope.getVariables(mode)
            },
            "edu_high": {
                "mz_alle": $scope.getVariables(mode),
                "mz_eintritt": $scope.getVariables(mode),
                "mz_austritt": $scope.getVariables(mode),
                "mz_anderer": $scope.getVariables(mode)
            },
            "edu_small": {
                "mz_alle": $scope.getVariables(mode),
                "mz_eintritt": $scope.getVariables(mode),
                "mz_austritt": $scope.getVariables(mode),
                "mz_anderer": $scope.getVariables(mode)
            }
        }, {
            "info": {
                "age_group": 2,
                "age_group_text": "Altersgruppe 35 – 44"
            },
            "edu_all": {
                "mz_alle": $scope.getVariables(mode),
                "mz_eintritt": $scope.getVariables(mode),
                "mz_austritt": $scope.getVariables(mode),
                "mz_anderer": $scope.getVariables(mode)
            },
            "edu_high": {
                "mz_alle": $scope.getVariables(mode),
                "mz_eintritt": $scope.getVariables(mode),
                "mz_austritt": $scope.getVariables(mode),
                "mz_anderer": $scope.getVariables(mode)
            },
            "edu_small": {
                "mz_alle": $scope.getVariables(mode),
                "mz_eintritt": $scope.getVariables(mode),
                "mz_austritt": $scope.getVariables(mode),
                "mz_anderer": $scope.getVariables(mode)
            }
        }, {
            "info": {
                "age_group": 3,
                "age_group_text": "Altersgruppe 45 – 54"
            },
            "edu_all": {
                "mz_alle": $scope.getVariables(mode),
                "mz_eintritt": $scope.getVariables(mode),
                "mz_austritt": $scope.getVariables(mode),
                "mz_anderer": $scope.getVariables(mode)
            },
            "edu_high": {
                "mz_alle": $scope.getVariables(mode),
                "mz_eintritt": $scope.getVariables(mode),
                "mz_austritt": $scope.getVariables(mode),
                "mz_anderer": $scope.getVariables(mode)
            },
            "edu_small": {
                "mz_alle": $scope.getVariables(mode),
                "mz_eintritt": $scope.getVariables(mode),
                "mz_austritt": $scope.getVariables(mode),
                "mz_anderer": $scope.getVariables(mode)
            }
        }, {
            "info": {
                "age_group": 4,
                "age_group_text": "Altersgruppe 55 – 59"
            },
            "edu_all": {
                "mz_alle": $scope.getVariables(mode),
                "mz_eintritt": $scope.getVariables(mode),
                "mz_austritt": $scope.getVariables(mode),
                "mz_anderer": $scope.getVariables(mode)
            },
            "edu_high": {
                "mz_alle": $scope.getVariables(mode),
                "mz_eintritt": $scope.getVariables(mode),
                "mz_austritt": $scope.getVariables(mode),
                "mz_anderer": $scope.getVariables(mode)
            },
            "edu_small": {
                "mz_alle": $scope.getVariables(mode),
                "mz_eintritt": $scope.getVariables(mode),
                "mz_austritt": $scope.getVariables(mode),
                "mz_anderer": $scope.getVariables(mode)
            }
        }, {
            "info": {
                "age_group": 5,
                "age_group_text": "Altersgruppe 60 – 64"
            },
            "edu_all": {
                "mz_alle": $scope.getVariables(mode),
                "mz_eintritt": $scope.getVariables(mode),
                "mz_austritt": $scope.getVariables(mode),
                "mz_anderer": $scope.getVariables(mode)
            },
            "edu_high": {
                "mz_alle": $scope.getVariables(mode),
                "mz_eintritt": $scope.getVariables(mode),
                "mz_austritt": $scope.getVariables(mode),
                "mz_anderer": $scope.getVariables(mode)
            },
            "edu_small": {
                "mz_alle": $scope.getVariables(mode),
                "mz_eintritt": $scope.getVariables(mode),
                "mz_austritt": $scope.getVariables(mode),
                "mz_anderer": $scope.getVariables(mode)
            }
        }, {
            "info": {
                "age_group": 6,
                "age_group_text": "Altersgruppe 65 – 69"
            },
            "edu_all": {
                "mz_alle": $scope.getVariables(mode),
                "mz_eintritt": $scope.getVariables(mode),
                "mz_austritt": $scope.getVariables(mode),
                "mz_anderer": $scope.getVariables(mode)
            },
            "edu_high": {
                "mz_alle": $scope.getVariables(mode),
                "mz_eintritt": $scope.getVariables(mode),
                "mz_austritt": $scope.getVariables(mode),
                "mz_anderer": $scope.getVariables(mode)
            },
            "edu_small": {
                "mz_alle": $scope.getVariables(mode),
                "mz_eintritt": $scope.getVariables(mode),
                "mz_austritt": $scope.getVariables(mode),
                "mz_anderer": $scope.getVariables(mode)
            }
        }, {
            "info": {
                "age_group": 7,
                "age_group_text": "Altersgruppe 70 – 74"
            },
            "edu_all": {
                "mz_alle": $scope.getVariables(mode),
                "mz_eintritt": $scope.getVariables(mode),
                "mz_austritt": $scope.getVariables(mode),
                "mz_anderer": $scope.getVariables(mode)
            },
            "edu_high": {
                "mz_alle": $scope.getVariables(mode),
                "mz_eintritt": $scope.getVariables(mode),
                "mz_austritt": $scope.getVariables(mode),
                "mz_anderer": $scope.getVariables(mode)
            },
            "edu_small": {
                "mz_alle": $scope.getVariables(mode),
                "mz_eintritt": $scope.getVariables(mode),
                "mz_austritt": $scope.getVariables(mode),
                "mz_anderer": $scope.getVariables(mode)
            }
        }, {
            "info": {
                "age_group": 8,
                "age_group_text": "Altersgruppe 75 – 79"
            },
            "edu_all": {
                "mz_alle": $scope.getVariables(mode),
                "mz_eintritt": $scope.getVariables(mode),
                "mz_austritt": $scope.getVariables(mode),
                "mz_anderer": $scope.getVariables(mode)
            },
            "edu_high": {
                "mz_alle": $scope.getVariables(mode),
                "mz_eintritt": $scope.getVariables(mode),
                "mz_austritt": $scope.getVariables(mode),
                "mz_anderer": $scope.getVariables(mode)
            },
            "edu_small": {
                "mz_alle": $scope.getVariables(mode),
                "mz_eintritt": $scope.getVariables(mode),
                "mz_austritt": $scope.getVariables(mode),
                "mz_anderer": $scope.getVariables(mode)
            }
        }, {
            "info": {
                "age_group": 9,
                "age_group_text": "Altersgruppe 80 – 84"
            },
            "edu_all": {
                "mz_alle": $scope.getVariables(mode),
                "mz_eintritt": $scope.getVariables(mode),
                "mz_austritt": $scope.getVariables(mode),
                "mz_anderer": $scope.getVariables(mode)
            },
            "edu_high": {
                "mz_alle": $scope.getVariables(mode),
                "mz_eintritt": $scope.getVariables(mode),
                "mz_austritt": $scope.getVariables(mode),
                "mz_anderer": $scope.getVariables(mode)
            },
            "edu_small": {
                "mz_alle": $scope.getVariables(mode),
                "mz_eintritt": $scope.getVariables(mode),
                "mz_austritt": $scope.getVariables(mode),
                "mz_anderer": $scope.getVariables(mode)
            }
        }, {
            "info": {
                "age_group": 10,
                "age_group_text": "Altersgruppe 85 – 89"
            },
            "edu_all": {
                "mz_alle": $scope.getVariables(mode),
                "mz_eintritt": $scope.getVariables(mode),
                "mz_austritt": $scope.getVariables(mode),
                "mz_anderer": $scope.getVariables(mode)
            },
            "edu_high": {
                "mz_alle": $scope.getVariables(mode),
                "mz_eintritt": $scope.getVariables(mode),
                "mz_austritt": $scope.getVariables(mode),
                "mz_anderer": $scope.getVariables(mode)
            },
            "edu_small": {
                "mz_alle": $scope.getVariables(mode),
                "mz_eintritt": $scope.getVariables(mode),
                "mz_austritt": $scope.getVariables(mode),
                "mz_anderer": $scope.getVariables(mode)
            }
        }];


        // Return
        return age_edu_groups;
    };

    $scope.getAgeEduObj = function() {

        var retrun_obj = {};


        // Propertys from Data Model
        var age_props = [{
            "age_group": 0,
            "age_group_text": "Altersgruppe 18 - 24"
        }, {
            "age_group": 1,
            "age_group_text": "Altersgruppe 25 – 34"
        }, {
            "age_group": 2,
            "age_group_text": "Altersgruppe 35 – 44"
        }, {
            "age_group": 3,
            "age_group_text": "Altersgruppe 45 – 54"
        }, {
            "age_group": 4,
            "age_group_text": "Altersgruppe 55 – 59"
        }, {
            "age_group": 5,
            "age_group_text": "Altersgruppe 60 – 64"
        }, {
            "age_group": 6,
            "age_group_text": "Altersgruppe 65 – 69"
        }, {
            "age_group": 7,
            "age_group_text": "Altersgruppe 70 – 74"
        }, {
            "age_group": 8,
            "age_group_text": "Altersgruppe 75 – 79"
        }, {
            "age_group": 9,
            "age_group_text": "Altersgruppe 80 – 84"
        }, {
            "age_group": 10,
            "age_group_text": "Altersgruppe 85 – 89"
        }];
        var edu_props = ['edu_all', 'edu_high', 'edu_small'];
        var mz_props = ['mz_eintritt', 'mz_austritt', 'mz_anderer', 'mz_alle'];

        // Create 'all propertys array' from Array
        var allVarsPropertys = [];
        var allVars = $scope.getVariables('variables');
        for (var property in allVars) {
            if (allVars.hasOwnProperty(property)) {
                allVarsPropertys.push(property);
            }
        };

        // var
        var twoDigits = function(id) {
            var return_text = '';
            id = parseInt(id);
            if (id < 10) {
                return_text = '0' + id.toString();
            } else {
                return_text = id.toString();
            };
            return return_text;
        };


        // Create 'multidimensional Array in a Object.

        var obj_name = '';


        for (var group_id = 0; group_id < age_props.length; group_id++) {
            var inner_obj = {
                "info": {},
                "scores": allVars,
                "statistics": allVars
            };
            inner_obj.info = age_props[group_id];

            for (var edu_prop_id = 0; edu_prop_id < edu_props.length; edu_prop_id++) {
                inner_obj.info.education = edu_prop_id;

                for (var mz_prop_id = 0; mz_prop_id < mz_props.length; mz_prop_id++) {

                    inner_obj.info.mz = mz_prop_id;
                    obj_name = 'age_' + twoDigits(group_id) + '_edu_' + twoDigits(edu_prop_id) + '_mz_' + twoDigits(mz_prop_id);

                    // Write to Object
                    retrun_obj[obj_name] = inner_obj;
                };
            };
        };


        return retrun_obj;
    };

    $scope.concatAllArraysInObject = function(objectFull, objectToConcat) {


        var isArray = function(obj) {
            return (typeof obj !== 'undefined' &&
                obj && obj.constructor === Array);
        };

        // Create 'all propertys array'
        var allFullPropertys = [];

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
                // console.log('N=', objectFull[current_property].length, objectFull[current_property]);
                // set n;
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



    // -------------------
    // Small Herlpers
    // -------------------

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

    $scope.isArray = function(obj) {
        return (typeof obj !== 'undefined' &&
            obj && obj.constructor === Array);
    };


});
