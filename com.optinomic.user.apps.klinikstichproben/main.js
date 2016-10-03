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
        $scope.getUserAppCalculation(app_id, app_claculation);


        ks.fake = $scope.getFakeData();
        $scope.writePatientScoresMD(ks.fake.patient_scores, ks.fake.definitions.md_app_data_empty);

        // Safe
        ks.pg = pg;


        // Safe to $scope
        $scope.d.ks = ks;

        console.log('(!) Init, ', $scope.d.dataMain.apps.current.name, $scope.d.ks);
    };



    // -----------------------------------
    // Calculations
    // -----------------------------------


    $scope.getUserAppCalculation = function(app_id, calc_name) {
        // Get specific calculation - Unneded already in 'd.dataMain.calculations[0].calculation_results'
        var call = dataService.getAppCalculationsUser(app_id, calc_name);

        call.success(function(data) {
            // Save Data to $scope.d
            console.log('(DATA): getCalculation: ', data.calculation_result);
            $scope.d.ks.user_app_calc = data.calculation_result;
        });
        call.error(function(data) {
            console.log('(ERROR): getCalculation:', data);
            $scope.d.ks.user_app_calc = {};
        });
    };



    // -------------------
    // Unneeded
    // -------------------


    $scope.writePatientScoresMD = function(patient_scores, md_app_scores) {

        var data = md_app_scores;
        var ps = patient_scoresc;

        var default_obj = {
            "patients": [],
            "scores": [],
            "statistics": [],
            "n": 0
        };


        // createNDimArray([3, 2, 3]);

        for (var psID = 0; psID < ps.length; psID++) {

            var source_patient_scores = ps[psID];
            var source_dimensions = source_patient_scores.data.dimensions;
            var source_scores = source_patient_scores.data.scores;

            for (var scoreID = 0; scoreID < source_scores.length; scoreID++) {
                var current_dimension = source_dimensions[scoreID];
                var current_score = source_scores[scoreID];


                // Alle Varianten für MD-Array erstellen
                for (var pos = 0; pos < current_dimension.length; pos++) {

                    var dim_pos = current_dimension[pos].dimensions;


                };

                //Test Write
                //data[0][0][0] = default_obj;

                console.log('data', data);
                console.log('data', data[0]);
                console.log('data', data[0][0]);
                console.log('data', data[0][0][0]);
                console.log('data', data[0, 0, 0]);

            };

        };


        $scope.d.md_patient_scores = data;
        console.log('writePatientScoresMD:', $scope.d.md_patient_scores);
    };




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

    $scope.createNDimArray = function(dimensions) {
        var t, i = 0,
            s = dimensions[0],
            arr = new Array(s);
        if (dimensions.length < 3)
            for (t = dimensions[1]; i < s;) arr[i++] = new Array(t);
        else
            for (t = dimensions.slice(1); i < s;) arr[i++] = createNDimArray(t);
        return arr;
    }

    $scope.getFakeData = function() {
        var fake = {
            "patient_scores": [{
                "data": {
                    "dimensions": [
                        [{
                            "array": [{
                                "text": "18 - 24",
                                "id": 0
                            }, {
                                "text": "25 – 34",
                                "id": 1
                            }, {
                                "text": "35 – 44",
                                "id": 2
                            }, {
                                "text": "45 – 54",
                                "id": 3
                            }, {
                                "text": "55 – 59",
                                "id": 4
                            }, {
                                "text": "60 – 64",
                                "id": 5
                            }, {
                                "text": "65 – 69",
                                "id": 6
                            }, {
                                "text": "70 – 74",
                                "id": 7
                            }, {
                                "text": "75 – 79",
                                "id": 8
                            }, {
                                "text": "80 – 84",
                                "id": 9
                            }, {
                                "text": "85 – 89",
                                "id": 10
                            }],
                            "name": "Altersgruppe",
                            "id": 0,
                            "dimensions": [
                                2
                            ]
                        }, {
                            "array": [{
                                "text": "<= 12 Jahre",
                                "id": 0
                            }, {
                                "text": "> 12 Jahre",
                                "id": 1
                            }, {
                                "text": "Jeder Ausbildungsgrad",
                                "id": 99
                            }],
                            "name": "Ausbildungsgrad",
                            "id": 1,
                            "dimensions": [
                                1,
                                2
                            ]
                        }, {
                            "array": [{
                                "text": "Eintritt",
                                "id": 1
                            }, {
                                "text": "Austritt",
                                "id": 2
                            }, {
                                "text": "Anderer Messzeitpunkt",
                                "id": 3
                            }, {
                                "text": "Alle Messzeitpunkte",
                                "id": 99
                            }],
                            "name": "Messzeitpunkt",
                            "id": 2,
                            "dimensions": [
                                2,
                                3
                            ]
                        }],
                        [{
                            "array": [{
                                "text": "18 - 24",
                                "id": 0
                            }, {
                                "text": "25 – 34",
                                "id": 1
                            }, {
                                "text": "35 – 44",
                                "id": 2
                            }, {
                                "text": "45 – 54",
                                "id": 3
                            }, {
                                "text": "55 – 59",
                                "id": 4
                            }, {
                                "text": "60 – 64",
                                "id": 5
                            }, {
                                "text": "65 – 69",
                                "id": 6
                            }, {
                                "text": "70 – 74",
                                "id": 7
                            }, {
                                "text": "75 – 79",
                                "id": 8
                            }, {
                                "text": "80 – 84",
                                "id": 9
                            }, {
                                "text": "85 – 89",
                                "id": 10
                            }],
                            "name": "Altersgruppe",
                            "id": 0,
                            "dimensions": [
                                2
                            ]
                        }, {
                            "array": [{
                                "text": "<= 12 Jahre",
                                "id": 0
                            }, {
                                "text": "> 12 Jahre",
                                "id": 1
                            }, {
                                "text": "Jeder Ausbildungsgrad",
                                "id": 99
                            }],
                            "name": "Ausbildungsgrad",
                            "id": 1,
                            "dimensions": [
                                1,
                                2
                            ]
                        }, {
                            "array": [{
                                "text": "Eintritt",
                                "id": 1
                            }, {
                                "text": "Austritt",
                                "id": 2
                            }, {
                                "text": "Anderer Messzeitpunkt",
                                "id": 3
                            }, {
                                "text": "Alle Messzeitpunkte",
                                "id": 99
                            }],
                            "name": "Messzeitpunkt",
                            "id": 2,
                            "dimensions": [
                                1,
                                3
                            ]
                        }],
                        [{
                            "array": [{
                                "text": "18 - 24",
                                "id": 0
                            }, {
                                "text": "25 – 34",
                                "id": 1
                            }, {
                                "text": "35 – 44",
                                "id": 2
                            }, {
                                "text": "45 – 54",
                                "id": 3
                            }, {
                                "text": "55 – 59",
                                "id": 4
                            }, {
                                "text": "60 – 64",
                                "id": 5
                            }, {
                                "text": "65 – 69",
                                "id": 6
                            }, {
                                "text": "70 – 74",
                                "id": 7
                            }, {
                                "text": "75 – 79",
                                "id": 8
                            }, {
                                "text": "80 – 84",
                                "id": 9
                            }, {
                                "text": "85 – 89",
                                "id": 10
                            }],
                            "name": "Altersgruppe",
                            "id": 0,
                            "dimensions": [
                                2
                            ]
                        }, {
                            "array": [{
                                "text": "<= 12 Jahre",
                                "id": 0
                            }, {
                                "text": "> 12 Jahre",
                                "id": 1
                            }, {
                                "text": "Jeder Ausbildungsgrad",
                                "id": 99
                            }],
                            "name": "Ausbildungsgrad",
                            "id": 1,
                            "dimensions": [
                                1,
                                2
                            ]
                        }, {
                            "array": [{
                                "text": "Eintritt",
                                "id": 1
                            }, {
                                "text": "Austritt",
                                "id": 2
                            }, {
                                "text": "Anderer Messzeitpunkt",
                                "id": 3
                            }, {
                                "text": "Alle Messzeitpunkte",
                                "id": 99
                            }],
                            "name": "Messzeitpunkt",
                            "id": 2,
                            "dimensions": [
                                0,
                                3
                            ]
                        }]
                    ],
                    "scores": [{
                        "TMTAError": [
                            0
                        ],
                        "TMTBError": [
                            2
                        ],
                        "TMTBZ": [-2.470444850700792],
                        "TMTATime": [
                            77
                        ],
                        "TMTAPerz": [
                            10
                        ],
                        "TMTBPerz": [
                            10
                        ],
                        "TMTBTime": [
                            99
                        ],
                        "BA_Quotient": [
                            1.2857142857142858
                        ],
                        "TMTAZ": [-4.802775024777007]
                    }, {
                        "TMTAError": [
                            2
                        ],
                        "TMTBError": [
                            4
                        ],
                        "TMTBZ": [-1.7391834247410116],
                        "TMTATime": [
                            43
                        ],
                        "TMTAPerz": [
                            20
                        ],
                        "TMTBPerz": [
                            20
                        ],
                        "TMTBTime": [
                            87
                        ],
                        "BA_Quotient": [
                            2.0232558139534884
                        ],
                        "TMTAZ": [-1.4331020812685829]
                    }, {
                        "TMTAError": [
                            0
                        ],
                        "TMTBError": [
                            0
                        ],
                        "TMTBZ": [
                            1.5514929920780012
                        ],
                        "TMTATime": [
                            25
                        ],
                        "TMTAPerz": [
                            60
                        ],
                        "TMTBPerz": [
                            60
                        ],
                        "TMTBTime": [
                            33
                        ],
                        "BA_Quotient": [
                            1.32
                        ],
                        "TMTAZ": [
                            0.35084241823587703
                        ]
                    }]
                },
                "patient": {
                    "data": {
                        "address2": null,
                        "cis_lead_doctor": 2,
                        "email": "beat@ottiger.org",
                        "deceased": false,
                        "first_name": "Patient",
                        "four_letter_code": "TTNE",
                        "stay_id": 3,
                        "country": "CH",
                        "phone_mobile": "079 635 85 84",
                        "phone_home": null,
                        "gender": "male",
                        "city": "Oberrieden",
                        "ahv": "123.345.234.345",
                        "lead_therapist": 2,
                        "address1": "Haldenstrasse 7",
                        "last_name": "Ottiger",
                        "language": "de",
                        "birth_name": "Beat",
                        "title": null,
                        "notes": "Just me myself and I. Partienten Notizen.",
                        "cis_pid": 1007,
                        "zip_code": "8942",
                        "birthdate": "1973-05-21T00:00:00.000000000000Z"
                    },
                    "id": 1
                }
            }, {
                "data": {
                    "dimensions": [
                        [{
                            "array": [{
                                "text": "18 - 24",
                                "id": 0
                            }, {
                                "text": "25 – 34",
                                "id": 1
                            }, {
                                "text": "35 – 44",
                                "id": 2
                            }, {
                                "text": "45 – 54",
                                "id": 3
                            }, {
                                "text": "55 – 59",
                                "id": 4
                            }, {
                                "text": "60 – 64",
                                "id": 5
                            }, {
                                "text": "65 – 69",
                                "id": 6
                            }, {
                                "text": "70 – 74",
                                "id": 7
                            }, {
                                "text": "75 – 79",
                                "id": 8
                            }, {
                                "text": "80 – 84",
                                "id": 9
                            }, {
                                "text": "85 – 89",
                                "id": 10
                            }],
                            "name": "Altersgruppe",
                            "id": 0,
                            "dimensions": [
                                2
                            ]
                        }, {
                            "array": [{
                                "text": "<= 12 Jahre",
                                "id": 0
                            }, {
                                "text": "> 12 Jahre",
                                "id": 1
                            }, {
                                "text": "Jeder Ausbildungsgrad",
                                "id": 99
                            }],
                            "name": "Ausbildungsgrad",
                            "id": 1,
                            "dimensions": [
                                1,
                                2
                            ]
                        }, {
                            "array": [{
                                "text": "Eintritt",
                                "id": 1
                            }, {
                                "text": "Austritt",
                                "id": 2
                            }, {
                                "text": "Anderer Messzeitpunkt",
                                "id": 3
                            }, {
                                "text": "Alle Messzeitpunkte",
                                "id": 99
                            }],
                            "name": "Messzeitpunkt",
                            "id": 2,
                            "dimensions": [
                                2,
                                3
                            ]
                        }],
                        [{
                            "array": [{
                                "text": "18 - 24",
                                "id": 0
                            }, {
                                "text": "25 – 34",
                                "id": 1
                            }, {
                                "text": "35 – 44",
                                "id": 2
                            }, {
                                "text": "45 – 54",
                                "id": 3
                            }, {
                                "text": "55 – 59",
                                "id": 4
                            }, {
                                "text": "60 – 64",
                                "id": 5
                            }, {
                                "text": "65 – 69",
                                "id": 6
                            }, {
                                "text": "70 – 74",
                                "id": 7
                            }, {
                                "text": "75 – 79",
                                "id": 8
                            }, {
                                "text": "80 – 84",
                                "id": 9
                            }, {
                                "text": "85 – 89",
                                "id": 10
                            }],
                            "name": "Altersgruppe",
                            "id": 0,
                            "dimensions": [
                                2
                            ]
                        }, {
                            "array": [{
                                "text": "<= 12 Jahre",
                                "id": 0
                            }, {
                                "text": "> 12 Jahre",
                                "id": 1
                            }, {
                                "text": "Jeder Ausbildungsgrad",
                                "id": 99
                            }],
                            "name": "Ausbildungsgrad",
                            "id": 1,
                            "dimensions": [
                                0,
                                2
                            ]
                        }, {
                            "array": [{
                                "text": "Eintritt",
                                "id": 1
                            }, {
                                "text": "Austritt",
                                "id": 2
                            }, {
                                "text": "Anderer Messzeitpunkt",
                                "id": 3
                            }, {
                                "text": "Alle Messzeitpunkte",
                                "id": 99
                            }],
                            "name": "Messzeitpunkt",
                            "id": 2,
                            "dimensions": [
                                1,
                                3
                            ]
                        }],
                        [{
                            "array": [{
                                "text": "18 - 24",
                                "id": 0
                            }, {
                                "text": "25 – 34",
                                "id": 1
                            }, {
                                "text": "35 – 44",
                                "id": 2
                            }, {
                                "text": "45 – 54",
                                "id": 3
                            }, {
                                "text": "55 – 59",
                                "id": 4
                            }, {
                                "text": "60 – 64",
                                "id": 5
                            }, {
                                "text": "65 – 69",
                                "id": 6
                            }, {
                                "text": "70 – 74",
                                "id": 7
                            }, {
                                "text": "75 – 79",
                                "id": 8
                            }, {
                                "text": "80 – 84",
                                "id": 9
                            }, {
                                "text": "85 – 89",
                                "id": 10
                            }],
                            "name": "Altersgruppe",
                            "id": 0,
                            "dimensions": [
                                2
                            ]
                        }, {
                            "array": [{
                                "text": "<= 12 Jahre",
                                "id": 0
                            }, {
                                "text": "> 12 Jahre",
                                "id": 1
                            }, {
                                "text": "Jeder Ausbildungsgrad",
                                "id": 99
                            }],
                            "name": "Ausbildungsgrad",
                            "id": 1,
                            "dimensions": [
                                1,
                                2
                            ]
                        }, {
                            "array": [{
                                "text": "Eintritt",
                                "id": 1
                            }, {
                                "text": "Austritt",
                                "id": 2
                            }, {
                                "text": "Anderer Messzeitpunkt",
                                "id": 3
                            }, {
                                "text": "Alle Messzeitpunkte",
                                "id": 99
                            }],
                            "name": "Messzeitpunkt",
                            "id": 2,
                            "dimensions": [
                                0,
                                3
                            ]
                        }],
                        [{
                            "array": [{
                                "text": "18 - 24",
                                "id": 0
                            }, {
                                "text": "25 – 34",
                                "id": 1
                            }, {
                                "text": "35 – 44",
                                "id": 2
                            }, {
                                "text": "45 – 54",
                                "id": 3
                            }, {
                                "text": "55 – 59",
                                "id": 4
                            }, {
                                "text": "60 – 64",
                                "id": 5
                            }, {
                                "text": "65 – 69",
                                "id": 6
                            }, {
                                "text": "70 – 74",
                                "id": 7
                            }, {
                                "text": "75 – 79",
                                "id": 8
                            }, {
                                "text": "80 – 84",
                                "id": 9
                            }, {
                                "text": "85 – 89",
                                "id": 10
                            }],
                            "name": "Altersgruppe",
                            "id": 0,
                            "dimensions": [
                                2
                            ]
                        }, {
                            "array": [{
                                "text": "<= 12 Jahre",
                                "id": 0
                            }, {
                                "text": "> 12 Jahre",
                                "id": 1
                            }, {
                                "text": "Jeder Ausbildungsgrad",
                                "id": 99
                            }],
                            "name": "Ausbildungsgrad",
                            "id": 1,
                            "dimensions": [
                                1,
                                2
                            ]
                        }, {
                            "array": [{
                                "text": "Eintritt",
                                "id": 1
                            }, {
                                "text": "Austritt",
                                "id": 2
                            }, {
                                "text": "Anderer Messzeitpunkt",
                                "id": 3
                            }, {
                                "text": "Alle Messzeitpunkte",
                                "id": 99
                            }],
                            "name": "Messzeitpunkt",
                            "id": 2,
                            "dimensions": [
                                1,
                                3
                            ]
                        }],
                        [{
                            "array": [{
                                "text": "18 - 24",
                                "id": 0
                            }, {
                                "text": "25 – 34",
                                "id": 1
                            }, {
                                "text": "35 – 44",
                                "id": 2
                            }, {
                                "text": "45 – 54",
                                "id": 3
                            }, {
                                "text": "55 – 59",
                                "id": 4
                            }, {
                                "text": "60 – 64",
                                "id": 5
                            }, {
                                "text": "65 – 69",
                                "id": 6
                            }, {
                                "text": "70 – 74",
                                "id": 7
                            }, {
                                "text": "75 – 79",
                                "id": 8
                            }, {
                                "text": "80 – 84",
                                "id": 9
                            }, {
                                "text": "85 – 89",
                                "id": 10
                            }],
                            "name": "Altersgruppe",
                            "id": 0,
                            "dimensions": [
                                2
                            ]
                        }, {
                            "array": [{
                                "text": "<= 12 Jahre",
                                "id": 0
                            }, {
                                "text": "> 12 Jahre",
                                "id": 1
                            }, {
                                "text": "Jeder Ausbildungsgrad",
                                "id": 99
                            }],
                            "name": "Ausbildungsgrad",
                            "id": 1,
                            "dimensions": [
                                1,
                                2
                            ]
                        }, {
                            "array": [{
                                "text": "Eintritt",
                                "id": 1
                            }, {
                                "text": "Austritt",
                                "id": 2
                            }, {
                                "text": "Anderer Messzeitpunkt",
                                "id": 3
                            }, {
                                "text": "Alle Messzeitpunkte",
                                "id": 99
                            }],
                            "name": "Messzeitpunkt",
                            "id": 2,
                            "dimensions": [
                                0,
                                3
                            ]
                        }]
                    ],
                    "scores": [{
                        "TMTAError": [
                            1
                        ],
                        "TMTBError": [
                            2
                        ],
                        "TMTBZ": [-13.987812309567337],
                        "TMTATime": [
                            66
                        ],
                        "TMTAPerz": [
                            10
                        ],
                        "TMTBPerz": [
                            10
                        ],
                        "TMTBTime": [
                            288
                        ],
                        "BA_Quotient": [
                            4.363636363636363
                        ],
                        "TMTAZ": [-3.7125867195242814]
                    }, {
                        "TMTAError": [
                            0
                        ],
                        "TMTBError": [
                            1
                        ],
                        "TMTBZ": [-3.262644728823888],
                        "TMTATime": [
                            20
                        ],
                        "TMTAPerz": [
                            80
                        ],
                        "TMTBPerz": [
                            80
                        ],
                        "TMTBTime": [
                            112
                        ],
                        "BA_Quotient": [
                            5.6
                        ],
                        "TMTAZ": [
                            0.8463825569871158
                        ]
                    }, {
                        "TMTAError": [
                            0
                        ],
                        "TMTBError": [
                            0
                        ],
                        "TMTBZ": [
                            1.1249238269347959
                        ],
                        "TMTATime": [
                            20
                        ],
                        "TMTAPerz": [
                            80
                        ],
                        "TMTBPerz": [
                            80
                        ],
                        "TMTBTime": [
                            40
                        ],
                        "BA_Quotient": [
                            2
                        ],
                        "TMTAZ": [
                            0.8463825569871158
                        ]
                    }, {
                        "TMTAError": [
                            5
                        ],
                        "TMTBError": [
                            6
                        ],
                        "TMTBZ": [-3.140767824497258],
                        "TMTATime": [
                            56
                        ],
                        "TMTAPerz": [
                            10
                        ],
                        "TMTBPerz": [
                            10
                        ],
                        "TMTBTime": [
                            110
                        ],
                        "BA_Quotient": [
                            1.9642857142857142
                        ],
                        "TMTAZ": [-2.721506442021804]
                    }, {
                        "TMTAError": [
                            1
                        ],
                        "TMTBError": [
                            3
                        ],
                        "TMTBZ": [-2.226691042047532],
                        "TMTATime": [
                            45
                        ],
                        "TMTAPerz": [
                            20
                        ],
                        "TMTBPerz": [
                            20
                        ],
                        "TMTBTime": [
                            95
                        ],
                        "BA_Quotient": [
                            2.111111111111111
                        ],
                        "TMTAZ": [-1.6313181367690783]
                    }]
                },
                "patient": {
                    "data": {
                        "address2": null,
                        "cis_lead_doctor": null,
                        "email": "nora.schoenenberger@suedhang.ch",
                        "deceased": false,
                        "first_name": "Frida",
                        "four_letter_code": "IHDL",
                        "stay_id": 40,
                        "country": "CH",
                        "phone_mobile": null,
                        "phone_home": null,
                        "gender": "female",
                        "city": "Coyoacan",
                        "ahv": null,
                        "lead_therapist": 11,
                        "address1": "Riviera 1",
                        "last_name": "Kahlo",
                        "language": "de",
                        "birth_name": null,
                        "title": "Dr.",
                        "notes": null,
                        "cis_pid": 70706,
                        "zip_code": "12345",
                        "birthdate": "1973-07-06T00:00:00.000000000000Z"
                    },
                    "id": 24
                }
            }],
            "md_patient_scores": [
                [
                    [
                        null,
                        null,
                        null,
                        null
                    ],
                    [
                        null,
                        null,
                        null,
                        null
                    ],
                    [
                        null,
                        null,
                        null,
                        null
                    ]
                ],
                [
                    [
                        null,
                        null,
                        null,
                        null
                    ],
                    [
                        null,
                        null,
                        null,
                        null
                    ],
                    [
                        null,
                        null,
                        null,
                        null
                    ]
                ],
                [
                    [
                        null,
                        null,
                        null,
                        null
                    ],
                    [
                        null,
                        null,
                        null,
                        null
                    ],
                    [
                        null,
                        null,
                        null,
                        null
                    ]
                ],
                [
                    [
                        null,
                        null,
                        null,
                        null
                    ],
                    [
                        null,
                        null,
                        null,
                        null
                    ],
                    [
                        null,
                        null,
                        null,
                        null
                    ]
                ],
                [
                    [
                        null,
                        null,
                        null,
                        null
                    ],
                    [
                        null,
                        null,
                        null,
                        null
                    ],
                    [
                        null,
                        null,
                        null,
                        null
                    ]
                ],
                [
                    [
                        null,
                        null,
                        null,
                        null
                    ],
                    [
                        null,
                        null,
                        null,
                        null
                    ],
                    [
                        null,
                        null,
                        null,
                        null
                    ]
                ],
                [
                    [
                        null,
                        null,
                        null,
                        null
                    ],
                    [
                        null,
                        null,
                        null,
                        null
                    ],
                    [
                        null,
                        null,
                        null,
                        null
                    ]
                ],
                [
                    [
                        null,
                        null,
                        null,
                        null
                    ],
                    [
                        null,
                        null,
                        null,
                        null
                    ],
                    [
                        null,
                        null,
                        null,
                        null
                    ]
                ],
                [
                    [
                        null,
                        null,
                        null,
                        null
                    ],
                    [
                        null,
                        null,
                        null,
                        null
                    ],
                    [
                        null,
                        null,
                        null,
                        null
                    ]
                ],
                [
                    [
                        null,
                        null,
                        null,
                        null
                    ],
                    [
                        null,
                        null,
                        null,
                        null
                    ],
                    [
                        null,
                        null,
                        null,
                        null
                    ]
                ],
                [
                    [
                        null,
                        null,
                        null,
                        null
                    ],
                    [
                        null,
                        null,
                        null,
                        null
                    ],
                    [
                        null,
                        null,
                        null,
                        null
                    ]
                ]
            ],
            "full": {
                "patient_groups": [{
                    "patients": [{
                        "data": {
                            "address2": null,
                            "cis_lead_doctor": null,
                            "email": "pataaaanaa@gmail.com",
                            "deceased": false,
                            "first_name": "Tagore",
                            "four_letter_code": "GMRA",
                            "stay_id": 44,
                            "country": "CH",
                            "phone_mobile": null,
                            "phone_home": null,
                            "gender": "female",
                            "city": "Zürich",
                            "ahv": "234.123.456.567",
                            "lead_therapist": 2,
                            "address1": "Fulltown 3",
                            "last_name": "Ramachandran",
                            "language": "de",
                            "birth_name": "Rama",
                            "title": null,
                            "notes": null,
                            "cis_pid": 0,
                            "zip_code": "8904",
                            "birthdate": "1984-07-14T00:00:00.000000000000Z"
                        },
                        "id": 16
                    }, {
                        "data": {
                            "address2": "111",
                            "cis_lead_doctor": null,
                            "email": "katrin.schlaefli@suedhang.ch",
                            "deceased": false,
                            "first_name": "Südhang",
                            "four_letter_code": "DNN2",
                            "stay_id": 15,
                            "country": "CH",
                            "phone_mobile": "1111",
                            "phone_home": "1111",
                            "gender": "male",
                            "city": "11",
                            "ahv": "11111",
                            "lead_therapist": 3,
                            "address1": "111",
                            "last_name": "Mann20",
                            "language": "de",
                            "birth_name": "1111",
                            "title": "1",
                            "notes": null,
                            "cis_pid": 20,
                            "zip_code": "11",
                            "birthdate": "1994-04-27T00:00:00.000000000000Z"
                        },
                        "id": 14
                    }, {
                        "data": {
                            "address2": null,
                            "cis_lead_doctor": null,
                            "email": "gaga@gmail.com",
                            "deceased": false,
                            "first_name": "Forel",
                            "four_letter_code": "RNE4",
                            "stay_id": 10,
                            "country": "CH",
                            "phone_mobile": null,
                            "phone_home": null,
                            "gender": "male",
                            "city": "Ellikon an der Thur",
                            "ahv": null,
                            "lead_therapist": 4,
                            "address1": "Islikonerstr. 5",
                            "last_name": "Mann40",
                            "language": "de",
                            "birth_name": "Alkbert",
                            "title": null,
                            "notes": null,
                            "cis_pid": 44444,
                            "zip_code": "8548",
                            "birthdate": "1965-01-22T00:00:00.000000000000Z"
                        },
                        "id": 11
                    }, {
                        "data": {
                            "address2": "null",
                            "cis_lead_doctor": null,
                            "email": "katrin.schlaefli@suedhang.ch",
                            "deceased": false,
                            "first_name": "Testo",
                            "four_letter_code": "SSTO",
                            "stay_id": 28,
                            "country": "CH",
                            "phone_mobile": "null",
                            "phone_home": "11 111 111",
                            "gender": "male",
                            "city": "Osterone",
                            "ahv": "asdf",
                            "lead_therapist": 3,
                            "address1": "Tastenstrasse 3",
                            "last_name": "Testosteron",
                            "language": "de",
                            "birth_name": "Softie",
                            "title": null,
                            "notes": "null",
                            "cis_pid": 666,
                            "zip_code": "3333",
                            "birthdate": "1988-11-11T00:00:00.000000000000Z"
                        },
                        "id": 21
                    }, {
                        "data": {
                            "address2": null,
                            "cis_lead_doctor": null,
                            "email": "katrin.schlaefli@suedhang.ch",
                            "deceased": false,
                            "first_name": "Südhang",
                            "four_letter_code": "DAN6",
                            "stay_id": null,
                            "country": "CH",
                            "phone_mobile": null,
                            "phone_home": null,
                            "gender": "female",
                            "city": "Thunh",
                            "ahv": null,
                            "lead_therapist": null,
                            "address1": "Strasse 5",
                            "last_name": "Frau60",
                            "language": "de",
                            "birth_name": "Forel",
                            "title": "PD Dr. rer. nat.",
                            "notes": "Frau, 60-jährig, Klinik Südhang",
                            "cis_pid": 3000,
                            "zip_code": "3300",
                            "birthdate": "1954-03-03T00:00:00.000000000000Z"
                        },
                        "id": 7
                    }, {
                        "data": {
                            "address2": null,
                            "cis_lead_doctor": null,
                            "email": "beat@ottiger.org",
                            "deceased": false,
                            "first_name": "Max",
                            "four_letter_code": "XSAE",
                            "stay_id": 16,
                            "country": "CH",
                            "phone_mobile": "079 - 635 85 84",
                            "phone_home": null,
                            "gender": "male",
                            "city": "Oberrieden",
                            "ahv": "756.73.234.234",
                            "lead_therapist": 2,
                            "address1": "Haldenstrasse 7",
                            "last_name": "Muster",
                            "language": "de",
                            "birth_name": null,
                            "title": null,
                            "notes": null,
                            "cis_pid": 123456,
                            "zip_code": "8942",
                            "birthdate": "1973-05-21T00:00:00.000000000000Z"
                        },
                        "id": 15
                    }, {
                        "data": {
                            "address2": null,
                            "cis_lead_doctor": null,
                            "email": "info@forel-klinik.ch",
                            "deceased": false,
                            "first_name": "Forel",
                            "four_letter_code": "RAE3",
                            "stay_id": 11,
                            "country": "CH",
                            "phone_mobile": null,
                            "phone_home": null,
                            "gender": "female",
                            "city": "Ellikon an der Thur",
                            "ahv": null,
                            "lead_therapist": 4,
                            "address1": "Islikonerstr. 5",
                            "last_name": "Frau30",
                            "language": "de",
                            "birth_name": null,
                            "title": null,
                            "notes": null,
                            "cis_pid": 22222,
                            "zip_code": "8548",
                            "birthdate": "1984-07-14T00:00:00.000000000000Z"
                        },
                        "id": 10
                    }, {
                        "data": {
                            "address2": null,
                            "cis_lead_doctor": null,
                            "email": "thomas.feron@composable.io",
                            "deceased": false,
                            "first_name": "Hillary",
                            "four_letter_code": "LRRT",
                            "stay_id": 5,
                            "country": "CH",
                            "phone_mobile": "079 - 234 23 23",
                            "phone_home": null,
                            "gender": "female",
                            "city": "Zürich",
                            "ahv": "234.234.234.234",
                            "lead_therapist": 2,
                            "address1": "Somwhere 1",
                            "last_name": "Dirty",
                            "language": "de",
                            "birth_name": null,
                            "title": null,
                            "notes": "DIRTY TESTs",
                            "cis_pid": 230,
                            "zip_code": "8800",
                            "birthdate": "1980-12-21T00:00:00.000000000000Z"
                        },
                        "id": 3
                    }, {
                        "data": {
                            "address2": null,
                            "cis_lead_doctor": null,
                            "email": "katrin.schlaefli@suedhang.ch",
                            "deceased": false,
                            "first_name": "Mann25",
                            "four_letter_code": "ND2N",
                            "stay_id": 13,
                            "country": "CH",
                            "phone_mobile": null,
                            "phone_home": null,
                            "gender": "male",
                            "city": "Bern",
                            "ahv": null,
                            "lead_therapist": 3,
                            "address1": "Postfach",
                            "last_name": "Südhang",
                            "language": "de",
                            "birth_name": null,
                            "title": "Dr.",
                            "notes": "Mann, 25-jährig, Klinik Südhang",
                            "cis_pid": 20140721,
                            "zip_code": null,
                            "birthdate": "1989-07-07T00:00:00.000000000000Z"
                        },
                        "id": 13
                    }, {
                        "data": {
                            "address2": null,
                            "cis_lead_doctor": null,
                            "email": "hans.menning@forel-klinik.ch",
                            "deceased": false,
                            "first_name": "Forel",
                            "four_letter_code": "RAE4",
                            "stay_id": 17,
                            "country": "CH",
                            "phone_mobile": null,
                            "phone_home": null,
                            "gender": "female",
                            "city": "Ellikon an der Thur",
                            "ahv": null,
                            "lead_therapist": 5,
                            "address1": "Islikonerstr. 5",
                            "last_name": "Frau40",
                            "language": "de",
                            "birth_name": "Alkerli",
                            "title": null,
                            "notes": null,
                            "cis_pid": 66666,
                            "zip_code": "8548",
                            "birthdate": "1974-07-15T00:00:00.000000000000Z"
                        },
                        "id": 12
                    }, {
                        "data": {
                            "address2": null,
                            "cis_lead_doctor": null,
                            "email": "katrin.schlaefli@suedhang.ch",
                            "deceased": false,
                            "first_name": "Südhang",
                            "four_letter_code": "DNN4",
                            "stay_id": 6,
                            "country": "CH",
                            "phone_mobile": "123",
                            "phone_home": "123",
                            "gender": "male",
                            "city": "Oberrieden",
                            "ahv": null,
                            "lead_therapist": 3,
                            "address1": "Irgendwo 23",
                            "last_name": "Mann40",
                            "language": "de",
                            "birth_name": null,
                            "title": "Dr.",
                            "notes": "Mann 40ig Jahre - Kliniks Südhang",
                            "cis_pid": 123,
                            "zip_code": "8942",
                            "birthdate": "1974-01-01T00:00:00.000000000000Z"
                        },
                        "id": 4
                    }, {
                        "data": {
                            "address2": null,
                            "cis_lead_doctor": null,
                            "email": "elvis@presley.com",
                            "deceased": true,
                            "first_name": "Elvira",
                            "four_letter_code": "VRRE",
                            "stay_id": 42,
                            "country": "CH",
                            "phone_mobile": "123123",
                            "phone_home": "234534",
                            "gender": "female",
                            "city": "Somewhere",
                            "ahv": "123.123.123.123",
                            "lead_therapist": 2,
                            "address1": "Memphisstr. 123",
                            "last_name": "Persley",
                            "language": "de",
                            "birth_name": null,
                            "title": null,
                            "notes": "Love me tender.",
                            "cis_pid": 12,
                            "zip_code": "3421",
                            "birthdate": "1935-01-08T00:00:00.000000000000Z"
                        },
                        "id": 25
                    }, {
                        "data": {
                            "address2": null,
                            "cis_lead_doctor": null,
                            "email": "nora.schoenenberger@suedhang.ch",
                            "deceased": false,
                            "first_name": "Frida",
                            "four_letter_code": "IHDL",
                            "stay_id": 40,
                            "country": "CH",
                            "phone_mobile": null,
                            "phone_home": null,
                            "gender": "female",
                            "city": "Coyoacan",
                            "ahv": null,
                            "lead_therapist": 11,
                            "address1": "Riviera 1",
                            "last_name": "Kahlo",
                            "language": "de",
                            "birth_name": null,
                            "title": "Dr.",
                            "notes": null,
                            "cis_pid": 70706,
                            "zip_code": "12345",
                            "birthdate": "1973-07-06T00:00:00.000000000000Z"
                        },
                        "id": 24
                    }, {
                        "data": {
                            "address2": null,
                            "cis_lead_doctor": null,
                            "email": "thomas.feron@redspline.com",
                            "deceased": false,
                            "first_name": "TomF",
                            "four_letter_code": "MSMN",
                            "stay_id": 39,
                            "country": "CH",
                            "phone_mobile": null,
                            "phone_home": "234534",
                            "gender": "male",
                            "city": "Over the rainbow",
                            "ahv": "234.234.234.234",
                            "lead_therapist": 9,
                            "address1": "Somewhere",
                            "last_name": "Testpatient",
                            "language": "en",
                            "birth_name": null,
                            "title": null,
                            "notes": "Thomas Feron: Test Patient.",
                            "cis_pid": 1928374655,
                            "zip_code": "7312",
                            "birthdate": "1980-03-21T00:00:00.000000000000Z"
                        },
                        "id": 26
                    }, {
                        "data": {
                            "address2": null,
                            "cis_lead_doctor": 2,
                            "email": "beat@ottiger.org",
                            "deceased": false,
                            "first_name": "Patient",
                            "four_letter_code": "TTNE",
                            "stay_id": 3,
                            "country": "CH",
                            "phone_mobile": "079 635 85 84",
                            "phone_home": null,
                            "gender": "male",
                            "city": "Oberrieden",
                            "ahv": "123.345.234.345",
                            "lead_therapist": 2,
                            "address1": "Haldenstrasse 7",
                            "last_name": "Ottiger",
                            "language": "de",
                            "birth_name": "Beat",
                            "title": null,
                            "notes": "Just me myself and I. Partienten Notizen.",
                            "cis_pid": 1007,
                            "zip_code": "8942",
                            "birthdate": "1973-05-21T00:00:00.000000000000Z"
                        },
                        "id": 1
                    }, {
                        "data": {
                            "address2": null,
                            "cis_lead_doctor": null,
                            "email": "susanneeee@boehling.de",
                            "deceased": false,
                            "first_name": "Susanne",
                            "four_letter_code": "SHNN",
                            "stay_id": 43,
                            "country": "CH",
                            "phone_mobile": "+41796358584",
                            "phone_home": "+41796358584",
                            "gender": "female",
                            "city": "Oberrieden",
                            "ahv": "345.234.234.12.45",
                            "lead_therapist": 2,
                            "address1": "Haldenstrasse 7",
                            "last_name": "Böhling",
                            "language": "de",
                            "birth_name": null,
                            "title": null,
                            "notes": "Testpatientin",
                            "cis_pid": 1973234,
                            "zip_code": "8942",
                            "birthdate": "1959-09-22T00:00:00.000000000000Z"
                        },
                        "id": 28
                    }, {
                        "data": {
                            "address2": null,
                            "cis_lead_doctor": null,
                            "email": "eeeeeeee@suedhang.ch",
                            "deceased": false,
                            "first_name": "Ernest",
                            "four_letter_code": "NMSA",
                            "stay_id": 22,
                            "country": "CU",
                            "phone_mobile": null,
                            "phone_home": "1111111",
                            "gender": "male",
                            "city": "Havanna",
                            "ahv": null,
                            "lead_therapist": 3,
                            "address1": "Mare 1",
                            "last_name": "Hemingway",
                            "language": "de",
                            "birth_name": null,
                            "title": null,
                            "notes": null,
                            "cis_pid": 6666606,
                            "zip_code": "111111111",
                            "birthdate": "1899-07-21T00:00:00.000000000000Z"
                        },
                        "id": 18
                    }, {
                        "data": {
                            "address2": null,
                            "cis_lead_doctor": null,
                            "email": "helgejugert@gmx.de",
                            "deceased": false,
                            "first_name": "Helge",
                            "four_letter_code": "LGGR",
                            "stay_id": 21,
                            "country": "CH",
                            "phone_mobile": null,
                            "phone_home": null,
                            "gender": "male",
                            "city": "Zürich",
                            "ahv": null,
                            "lead_therapist": 8,
                            "address1": "brabla street 21",
                            "last_name": "Jugert",
                            "language": "de",
                            "birth_name": null,
                            "title": null,
                            "notes": null,
                            "cis_pid": 12345,
                            "zip_code": "8765",
                            "birthdate": "1975-01-27T00:00:00.000000000000Z"
                        },
                        "id": 17
                    }, {
                        "data": {
                            "address2": "gaga",
                            "cis_lead_doctor": null,
                            "email": "ottigerb@gmail.com",
                            "deceased": false,
                            "first_name": "Vorname",
                            "four_letter_code": "RSMS",
                            "stay_id": null,
                            "country": "CH",
                            "phone_mobile": "41796358584",
                            "phone_home": "41796358584",
                            "gender": "male",
                            "city": "Sugus",
                            "ahv": null,
                            "lead_therapist": null,
                            "address1": "gaga",
                            "last_name": "Test",
                            "language": "de",
                            "birth_name": null,
                            "title": null,
                            "notes": null,
                            "cis_pid": 231,
                            "zip_code": "8942",
                            "birthdate": "1973-05-21T00:00:00.000000000000Z"
                        },
                        "id": 8
                    }, {
                        "data": {
                            "address2": null,
                            "cis_lead_doctor": null,
                            "email": "hans.menning@forel-klinik.ch",
                            "deceased": false,
                            "first_name": "Forel",
                            "four_letter_code": "RNE5",
                            "stay_id": null,
                            "country": "CH",
                            "phone_mobile": "078 636 64 64 ",
                            "phone_home": "078 636 64 64 ",
                            "gender": "male",
                            "city": "Ellikon",
                            "ahv": "123.456.789.123",
                            "lead_therapist": null,
                            "address1": "Islikonerstr. 5",
                            "last_name": "Mann50",
                            "language": "de",
                            "birth_name": null,
                            "title": "Dr",
                            "notes": "Ich bin der Erste!",
                            "cis_pid": 12345,
                            "zip_code": "8548",
                            "birthdate": null
                        },
                        "id": 9
                    }, {
                        "data": {
                            "address2": null,
                            "cis_lead_doctor": null,
                            "email": "ruuuuu@suedhang.ch",
                            "deceased": false,
                            "first_name": "Fjodor",
                            "four_letter_code": "OSOK",
                            "stay_id": 23,
                            "country": "RU",
                            "phone_mobile": null,
                            "phone_home": null,
                            "gender": "male",
                            "city": "St. Petsersburg",
                            "ahv": null,
                            "lead_therapist": 3,
                            "address1": "Wolgaprospekt",
                            "last_name": "Dostojewski",
                            "language": "de",
                            "birth_name": null,
                            "title": null,
                            "notes": "Pathologisches Spielen",
                            "cis_pid": 6,
                            "zip_code": null,
                            "birthdate": "1965-02-27T00:00:00.000000000000Z"
                        },
                        "id": 19
                    }, {
                        "data": {
                            "address2": null,
                            "cis_lead_doctor": null,
                            "email": "katrin.schlaefli@suedhang.ch",
                            "deceased": false,
                            "first_name": "Testine",
                            "four_letter_code": "SSNS",
                            "stay_id": 27,
                            "country": "CH",
                            "phone_mobile": null,
                            "phone_home": null,
                            "gender": "female",
                            "city": "Testingen",
                            "ahv": null,
                            "lead_therapist": 6,
                            "address1": "Teststrasse 2",
                            "last_name": "Test",
                            "language": "de",
                            "birth_name": null,
                            "title": null,
                            "notes": "HoNOS Testung",
                            "cis_pid": 99999999,
                            "zip_code": "9999",
                            "birthdate": "1955-11-11T00:00:00.000000000000Z"
                        },
                        "id": 20
                    }, {
                        "data": {
                            "address2": null,
                            "cis_lead_doctor": null,
                            "email": "tanielsen@gmail.com",
                            "deceased": false,
                            "first_name": "Duncan",
                            "four_letter_code": "NFAF",
                            "stay_id": 19,
                            "country": "CH",
                            "phone_mobile": "11234",
                            "phone_home": "1234",
                            "gender": "female",
                            "city": "Beeston",
                            "ahv": "12",
                            "lead_therapist": 5,
                            "address1": "1, Some Street",
                            "last_name": "Fyfe",
                            "language": "en",
                            "birth_name": "Fyfe",
                            "title": "Dr",
                            "notes": "Severe coffee addiction",
                            "cis_pid": 12,
                            "zip_code": "1234",
                            "birthdate": "1956-02-22T00:00:00.000000000000Z"
                        },
                        "id": 2
                    }, {
                        "data": {
                            "address2": "Tobler 2",
                            "cis_lead_doctor": null,
                            "email": "nora.schoenenberger@suedhang.ch",
                            "deceased": false,
                            "first_name": "Fridolin",
                            "four_letter_code": "ILIE",
                            "stay_id": 41,
                            "country": "CH",
                            "phone_mobile": "078 123 45 67",
                            "phone_home": null,
                            "gender": "male",
                            "city": "Bern",
                            "ahv": "756.1234.5678.90",
                            "lead_therapist": 3,
                            "address1": "c/o Alfred Hinz",
                            "last_name": "Müller",
                            "language": "de",
                            "birth_name": null,
                            "title": null,
                            "notes": "tic-tac",
                            "cis_pid": 10800,
                            "zip_code": "3012",
                            "birthdate": null
                        },
                        "id": 27
                    }, {
                        "data": {
                            "address2": "7",
                            "cis_lead_doctor": null,
                            "email": "tttttttttt@suedhang.ch",
                            "deceased": false,
                            "first_name": "Frieda-Anna",
                            "four_letter_code": "ISNE",
                            "stay_id": 33,
                            "country": "CH",
                            "phone_mobile": "079 6258584",
                            "phone_home": "043 605 78 80",
                            "gender": "female",
                            "city": "Stadt",
                            "ahv": "123.765.342.657",
                            "lead_therapist": 6,
                            "address1": "Strasse 7",
                            "last_name": "Muster",
                            "language": "de",
                            "birth_name": null,
                            "title": null,
                            "notes": "So ein Tag - so wunderschön wie heute.",
                            "cis_pid": 202,
                            "zip_code": "7777",
                            "birthdate": "1907-07-07T00:00:00.000000000000Z"
                        },
                        "id": 23
                    }, {
                        "data": {
                            "address2": null,
                            "cis_lead_doctor": null,
                            "email": "katrin.schlaefli@suedhang.ch",
                            "deceased": false,
                            "first_name": "Südhang",
                            "four_letter_code": "DNN5",
                            "stay_id": 8,
                            "country": "CH",
                            "phone_mobile": null,
                            "phone_home": null,
                            "gender": "male",
                            "city": "Biel",
                            "ahv": null,
                            "lead_therapist": 3,
                            "address1": "Dort 1",
                            "last_name": "Mann50",
                            "language": "de",
                            "birth_name": null,
                            "title": null,
                            "notes": "Mann, 50-jährig, Klinik Südhang",
                            "cis_pid": 2000,
                            "zip_code": "2500",
                            "birthdate": "1964-02-02T00:00:00.000000000000Z"
                        },
                        "id": 6
                    }, {
                        "data": {
                            "address2": null,
                            "cis_lead_doctor": null,
                            "email": "mmmmmm@suedhang.ch",
                            "deceased": false,
                            "first_name": "Frieda",
                            "four_letter_code": "ISDE",
                            "stay_id": 29,
                            "country": "CH",
                            "phone_mobile": null,
                            "phone_home": null,
                            "gender": "female",
                            "city": "1111",
                            "ahv": null,
                            "lead_therapist": 3,
                            "address1": "Musterweg 1",
                            "last_name": "Muster",
                            "language": "de",
                            "birth_name": null,
                            "title": null,
                            "notes": null,
                            "cis_pid": 11111111,
                            "zip_code": "Musteringen",
                            "birthdate": "1911-11-11T00:00:00.000000000000Z"
                        },
                        "id": 22
                    }, {
                        "data": {
                            "address2": null,
                            "cis_lead_doctor": null,
                            "email": "katrin.schlaefli@suedhang.ch",
                            "deceased": false,
                            "first_name": "Südhang",
                            "four_letter_code": "DAN3",
                            "stay_id": 37,
                            "country": "CH",
                            "phone_mobile": null,
                            "phone_home": null,
                            "gender": "female",
                            "city": "Bern",
                            "ahv": null,
                            "lead_therapist": 11,
                            "address1": "Südhang 2",
                            "last_name": "Frau35",
                            "language": "de",
                            "birth_name": null,
                            "title": null,
                            "notes": "Frau 35-jährig - Klinik Südhang",
                            "cis_pid": 1000,
                            "zip_code": "3000",
                            "birthdate": "1979-01-01T00:00:00.000000000000Z"
                        },
                        "id": 5
                    }],
                    "entity": {
                        "data": {
                            "modules_to_deactivate": [],
                            "modules_to_activate": [
                                "com.optinomic.init.stay"
                            ],
                            "sql_filter": "WHERE 1 = 1",
                            "name": "Alle Patienten"
                        },
                        "id": 1
                    }
                }, {
                    "patients": [{
                        "data": {
                            "address2": null,
                            "cis_lead_doctor": null,
                            "email": "nora.schoenenberger@suedhang.ch",
                            "deceased": false,
                            "first_name": "Frida",
                            "four_letter_code": "IHDL",
                            "stay_id": 40,
                            "country": "CH",
                            "phone_mobile": null,
                            "phone_home": null,
                            "gender": "female",
                            "city": "Coyoacan",
                            "ahv": null,
                            "lead_therapist": 11,
                            "address1": "Riviera 1",
                            "last_name": "Kahlo",
                            "language": "de",
                            "birth_name": null,
                            "title": "Dr.",
                            "notes": null,
                            "cis_pid": 70706,
                            "zip_code": "12345",
                            "birthdate": "1973-07-06T00:00:00.000000000000Z"
                        },
                        "id": 24
                    }, {
                        "data": {
                            "address2": null,
                            "cis_lead_doctor": null,
                            "email": "beat@ottiger.org",
                            "deceased": false,
                            "first_name": "Max",
                            "four_letter_code": "XSAE",
                            "stay_id": 16,
                            "country": "CH",
                            "phone_mobile": "079 - 635 85 84",
                            "phone_home": null,
                            "gender": "male",
                            "city": "Oberrieden",
                            "ahv": "756.73.234.234",
                            "lead_therapist": 2,
                            "address1": "Haldenstrasse 7",
                            "last_name": "Muster",
                            "language": "de",
                            "birth_name": null,
                            "title": null,
                            "notes": null,
                            "cis_pid": 123456,
                            "zip_code": "8942",
                            "birthdate": "1973-05-21T00:00:00.000000000000Z"
                        },
                        "id": 15
                    }, {
                        "data": {
                            "address2": null,
                            "cis_lead_doctor": null,
                            "email": "elvis@presley.com",
                            "deceased": true,
                            "first_name": "Elvira",
                            "four_letter_code": "VRRE",
                            "stay_id": 42,
                            "country": "CH",
                            "phone_mobile": "123123",
                            "phone_home": "234534",
                            "gender": "female",
                            "city": "Somewhere",
                            "ahv": "123.123.123.123",
                            "lead_therapist": 2,
                            "address1": "Memphisstr. 123",
                            "last_name": "Persley",
                            "language": "de",
                            "birth_name": null,
                            "title": null,
                            "notes": "Love me tender.",
                            "cis_pid": 12,
                            "zip_code": "3421",
                            "birthdate": "1935-01-08T00:00:00.000000000000Z"
                        },
                        "id": 25
                    }, {
                        "data": {
                            "address2": null,
                            "cis_lead_doctor": 2,
                            "email": "beat@ottiger.org",
                            "deceased": false,
                            "first_name": "Patient",
                            "four_letter_code": "TTNE",
                            "stay_id": 3,
                            "country": "CH",
                            "phone_mobile": "079 635 85 84",
                            "phone_home": null,
                            "gender": "male",
                            "city": "Oberrieden",
                            "ahv": "123.345.234.345",
                            "lead_therapist": 2,
                            "address1": "Haldenstrasse 7",
                            "last_name": "Ottiger",
                            "language": "de",
                            "birth_name": "Beat",
                            "title": null,
                            "notes": "Just me myself and I. Partienten Notizen.",
                            "cis_pid": 1007,
                            "zip_code": "8942",
                            "birthdate": "1973-05-21T00:00:00.000000000000Z"
                        },
                        "id": 1
                    }],
                    "entity": {
                        "data": {
                            "modules_to_deactivate": [],
                            "modules_to_activate": [
                                "com.optinomic.cis.medication",
                                "com.optinomic.cis.diagnoses",
                                "com.optinomic.cis.hisoryentry",
                                "ch.suedhang.apps.actinfo_ein"
                            ],
                            "sql_filter": "LEFT JOIN (SELECT *, cast(value as json) AS json \nFROM annotations) AS ann \nON ann.patient_id = p.id AND ann.module = 'com.optinomic.init.stay' \nWHERE ann.json#>>'{patient_group_selector,current_eas}' = 'true' \nOR ann.json#>>'{patient_group_selector,past_eas}' = 'true'",
                            "name": "EAS (Stammdaten-App)"
                        },
                        "id": 5
                    }
                }, {
                    "patients": [{
                        "data": {
                            "address2": null,
                            "cis_lead_doctor": null,
                            "email": "eeeeeeee@suedhang.ch",
                            "deceased": false,
                            "first_name": "Ernest",
                            "four_letter_code": "NMSA",
                            "stay_id": 22,
                            "country": "CU",
                            "phone_mobile": null,
                            "phone_home": "1111111",
                            "gender": "male",
                            "city": "Havanna",
                            "ahv": null,
                            "lead_therapist": 3,
                            "address1": "Mare 1",
                            "last_name": "Hemingway",
                            "language": "de",
                            "birth_name": null,
                            "title": null,
                            "notes": null,
                            "cis_pid": 6666606,
                            "zip_code": "111111111",
                            "birthdate": "1899-07-21T00:00:00.000000000000Z"
                        },
                        "id": 18
                    }, {
                        "data": {
                            "address2": null,
                            "cis_lead_doctor": 2,
                            "email": "beat@ottiger.org",
                            "deceased": false,
                            "first_name": "Patient",
                            "four_letter_code": "TTNE",
                            "stay_id": 3,
                            "country": "CH",
                            "phone_mobile": "079 635 85 84",
                            "phone_home": null,
                            "gender": "male",
                            "city": "Oberrieden",
                            "ahv": "123.345.234.345",
                            "lead_therapist": 2,
                            "address1": "Haldenstrasse 7",
                            "last_name": "Ottiger",
                            "language": "de",
                            "birth_name": "Beat",
                            "title": null,
                            "notes": "Just me myself and I. Partienten Notizen.",
                            "cis_pid": 1007,
                            "zip_code": "8942",
                            "birthdate": "1973-05-21T00:00:00.000000000000Z"
                        },
                        "id": 1
                    }, {
                        "data": {
                            "address2": null,
                            "cis_lead_doctor": null,
                            "email": "elvis@presley.com",
                            "deceased": true,
                            "first_name": "Elvira",
                            "four_letter_code": "VRRE",
                            "stay_id": 42,
                            "country": "CH",
                            "phone_mobile": "123123",
                            "phone_home": "234534",
                            "gender": "female",
                            "city": "Somewhere",
                            "ahv": "123.123.123.123",
                            "lead_therapist": 2,
                            "address1": "Memphisstr. 123",
                            "last_name": "Persley",
                            "language": "de",
                            "birth_name": null,
                            "title": null,
                            "notes": "Love me tender.",
                            "cis_pid": 12,
                            "zip_code": "3421",
                            "birthdate": "1935-01-08T00:00:00.000000000000Z"
                        },
                        "id": 25
                    }],
                    "entity": {
                        "data": {
                            "modules_to_deactivate": [],
                            "modules_to_activate": [
                                "ch.suedhang.apps.bscl.anq"
                            ],
                            "name": "Stationäre Patienten"
                        },
                        "id": 2
                    }
                }, {
                    "patients": [{
                        "data": {
                            "address2": null,
                            "cis_lead_doctor": null,
                            "email": "ruuuuu@suedhang.ch",
                            "deceased": false,
                            "first_name": "Fjodor",
                            "four_letter_code": "OSOK",
                            "stay_id": 23,
                            "country": "RU",
                            "phone_mobile": null,
                            "phone_home": null,
                            "gender": "male",
                            "city": "St. Petsersburg",
                            "ahv": null,
                            "lead_therapist": 3,
                            "address1": "Wolgaprospekt",
                            "last_name": "Dostojewski",
                            "language": "de",
                            "birth_name": null,
                            "title": null,
                            "notes": "Pathologisches Spielen",
                            "cis_pid": 6,
                            "zip_code": null,
                            "birthdate": "1965-02-27T00:00:00.000000000000Z"
                        },
                        "id": 19
                    }, {
                        "data": {
                            "address2": null,
                            "cis_lead_doctor": null,
                            "email": "eeeeeeee@suedhang.ch",
                            "deceased": false,
                            "first_name": "Ernest",
                            "four_letter_code": "NMSA",
                            "stay_id": 22,
                            "country": "CU",
                            "phone_mobile": null,
                            "phone_home": "1111111",
                            "gender": "male",
                            "city": "Havanna",
                            "ahv": null,
                            "lead_therapist": 3,
                            "address1": "Mare 1",
                            "last_name": "Hemingway",
                            "language": "de",
                            "birth_name": null,
                            "title": null,
                            "notes": null,
                            "cis_pid": 6666606,
                            "zip_code": "111111111",
                            "birthdate": "1899-07-21T00:00:00.000000000000Z"
                        },
                        "id": 18
                    }, {
                        "data": {
                            "address2": "7",
                            "cis_lead_doctor": null,
                            "email": "tttttttttt@suedhang.ch",
                            "deceased": false,
                            "first_name": "Frieda-Anna",
                            "four_letter_code": "ISNE",
                            "stay_id": 33,
                            "country": "CH",
                            "phone_mobile": "079 6258584",
                            "phone_home": "043 605 78 80",
                            "gender": "female",
                            "city": "Stadt",
                            "ahv": "123.765.342.657",
                            "lead_therapist": 6,
                            "address1": "Strasse 7",
                            "last_name": "Muster",
                            "language": "de",
                            "birth_name": null,
                            "title": null,
                            "notes": "So ein Tag - so wunderschön wie heute.",
                            "cis_pid": 202,
                            "zip_code": "7777",
                            "birthdate": "1907-07-07T00:00:00.000000000000Z"
                        },
                        "id": 23
                    }, {
                        "data": {
                            "address2": null,
                            "cis_lead_doctor": null,
                            "email": "elvis@presley.com",
                            "deceased": true,
                            "first_name": "Elvira",
                            "four_letter_code": "VRRE",
                            "stay_id": 42,
                            "country": "CH",
                            "phone_mobile": "123123",
                            "phone_home": "234534",
                            "gender": "female",
                            "city": "Somewhere",
                            "ahv": "123.123.123.123",
                            "lead_therapist": 2,
                            "address1": "Memphisstr. 123",
                            "last_name": "Persley",
                            "language": "de",
                            "birth_name": null,
                            "title": null,
                            "notes": "Love me tender.",
                            "cis_pid": 12,
                            "zip_code": "3421",
                            "birthdate": "1935-01-08T00:00:00.000000000000Z"
                        },
                        "id": 25
                    }],
                    "entity": {
                        "data": {
                            "modules_to_deactivate": [],
                            "modules_to_activate": [],
                            "name": "Superstars"
                        },
                        "id": 3
                    }
                }],
                "patients": [{
                    "annotations": {
                        "module": {},
                        "patient": {},
                        "patient_module": {}
                    },
                    "foreign_survey_responses": {
                        "ch.suedhang.apps.tmt_V3": []
                    },
                    "patient": {
                        "data": {
                            "address2": null,
                            "cis_lead_doctor": null,
                            "email": "beat@ottiger.org",
                            "deceased": false,
                            "first_name": "Max",
                            "four_letter_code": "XSAE",
                            "stay_id": 16,
                            "country": "CH",
                            "phone_mobile": "079 - 635 85 84",
                            "phone_home": null,
                            "gender": "male",
                            "city": "Oberrieden",
                            "ahv": "756.73.234.234",
                            "lead_therapist": 2,
                            "address1": "Haldenstrasse 7",
                            "last_name": "Muster",
                            "language": "de",
                            "birth_name": null,
                            "title": null,
                            "notes": null,
                            "cis_pid": 123456,
                            "zip_code": "8942",
                            "birthdate": "1973-05-21T00:00:00.000000000000Z"
                        },
                        "id": 15
                    },
                    "other_calculations": {
                        "ch.suedhang.apps.tmt_V3:tmt_score": []
                    }
                }, {
                    "annotations": {
                        "module": {},
                        "patient": {
                            "app": {
                                "com.optinomic.cis.diagnoses": {
                                    "diagnoses": [{
                                        "datestamp_week": "2016, 05",
                                        "datestamp": "2016-01-25T08:42:19.339Z",
                                        "datestamp_time": "09:42",
                                        "datestamp_full_day": "Monday, 25th January 2016",
                                        "uniqueid": "AJBKD2OA8G9DR83FV8LR8THOAN33GKK2",
                                        "custom_text": "Subkortikale vaskuläre Demenz | Mit anderen Symptomen, vorwiegend depressiv, F01.23",
                                        "user": 2,
                                        "datestamp_day": "25.01.2016",
                                        "diagn_rank": 1,
                                        "datestamp_sort": "201601250942191919",
                                        "diagn": {
                                            "icd_code": "F01.23",
                                            "icd_id": "2457",
                                            "icd_class": "5",
                                            "icd_display": "Subkortikale vaskuläre Demenz | Mit anderen Symptomen, vorwiegend depressiv, F01.23",
                                            "icd_titel": "Subkortikale vaskuläre Demenz | Mit anderen Symptomen, vorwiegend depressiv"
                                        },
                                        "icd_url_info": "http://www.icd-code.de/suche/icd/code/F01.-.html?sp=SF01.23",
                                        "diagn_selected": true
                                    }]
                                },
                                "com.optinomic.cis.medication": {
                                    "medication": [{
                                        "datestamp_week": "2016, 04",
                                        "datestamp_edit": "2016-01-22T20:57:34.344Z",
                                        "medication_start_verordnung_user": 2,
                                        "datestamp": "2016-01-22T20:45:09.725Z",
                                        "medication_verabreichung": "oral",
                                        "medication_stop_verordnung_datum": null,
                                        "url_open_drug_db": "http://just-medical.oddb.org/de/just-medical/search/zone/drugs/search_query/SYMBICORT/search_type/st_oddb#best_result",
                                        "medication_dosierung_ab": 0,
                                        "medication_dosierung_mi": 0,
                                        "datestamp_time": "21:45",
                                        "datestamp_full_day": "Friday, 22nd January 2016",
                                        "medication_dosierung_mo": 0,
                                        "medication_name": "SYMBICORT 100/6 Turbuhaler",
                                        "datestamp_edit_time": "21:57",
                                        "medication_dosierung_interval": "",
                                        "uniqueid": "RPRYGM8D7IRCDQ6LJMMGILQ0WX3M9IJ4",
                                        "medication_dosierung_na": 2,
                                        "datestamp_edit_sort": "201601222157343434",
                                        "user": 2,
                                        "datestamp_day": "22.01.2016",
                                        "medication_start_verordnung_datum": "2016-01-06T23:00:00.000Z",
                                        "datestamp_edit_week": "2016, 04",
                                        "datestamp_edit_day": "22.01.2016",
                                        "medication_stop_verordnung_user": null,
                                        "datestamp_sort": "20160122214509099",
                                        "medication_selected": true,
                                        "medication_bemerkungen": "",
                                        "medication_status": "1",
                                        "datestamp_edit_full_day": "Friday, 22nd January 2016",
                                        "url_compendium": "https://compendium.ch/search/all/SYMBICORT/contains/de",
                                        "medication": {
                                            "medi_order": "100",
                                            "medi_info": "120 Dos",
                                            "medi_activated": true,
                                            "_lowerName": "symbicort 100/6 turbuhaler",
                                            "_lowerCode": "2321493",
                                            "medi_code": "2321493",
                                            "medi_name": "SYMBICORT 100/6 Turbuhaler"
                                        }
                                    }, {
                                        "datestamp_week": "2016, 04",
                                        "datestamp_edit": "2016-01-22T21:42:31.388Z",
                                        "medication_start_verordnung_user": 2,
                                        "datestamp": "2016-01-22T21:02:16.191Z",
                                        "medication_verabreichung": "oral",
                                        "medication_stop_verordnung_datum": null,
                                        "url_open_drug_db": "http://just-medical.oddb.org/de/just-medical/search/zone/drugs/search_query/RITALIN/search_type/st_oddb#best_result",
                                        "medication_dosierung_ab": 1.5,
                                        "medication_dosierung_mi": 0,
                                        "datestamp_time": "22:02",
                                        "datestamp_full_day": "Friday, 22nd January 2016",
                                        "medication_dosierung_mo": 1,
                                        "medication_name": "RITALIN LA Kaps 20 mg",
                                        "datestamp_edit_time": "22:42",
                                        "medication_dosierung_interval": "",
                                        "uniqueid": "AFYW1SD0IKLL2T4TURU2HIND48GHELU1",
                                        "medication_dosierung_na": 0,
                                        "datestamp_edit_sort": "201601222242313131",
                                        "user": 2,
                                        "datestamp_day": "22.01.2016",
                                        "medication_start_verordnung_datum": "2016-01-22T21:02:16.191Z",
                                        "datestamp_edit_week": "2016, 04",
                                        "datestamp_edit_day": "22.01.2016",
                                        "medication_stop_verordnung_user": null,
                                        "datestamp_sort": "201601222202161616",
                                        "medication_selected": true,
                                        "medication_bemerkungen": "",
                                        "medication_status": 0,
                                        "datestamp_edit_full_day": "Friday, 22nd January 2016",
                                        "url_compendium": "https://compendium.ch/search/all/RITALIN/contains/de",
                                        "medication": {
                                            "medi_order": "100",
                                            "medi_info": "30 Stk",
                                            "medi_activated": true,
                                            "_lowerName": "ritalin la kaps 20 mg",
                                            "_lowerCode": "2510923",
                                            "medi_code": "2510923",
                                            "medi_name": "RITALIN LA Kaps 20 mg"
                                        }
                                    }, {
                                        "datestamp_week": "2016, 04",
                                        "datestamp_edit": "2016-01-22T21:04:30.189Z",
                                        "medication_start_verordnung_user": 2,
                                        "datestamp": "2016-01-22T21:04:06.022Z",
                                        "medication_verabreichung": "oral",
                                        "medication_stop_verordnung_datum": null,
                                        "url_open_drug_db": "http://just-medical.oddb.org/de/just-medical/search/zone/drugs/search_query/ABFÜHRTEE/search_type/st_oddb#best_result",
                                        "medication_dosierung_ab": 0,
                                        "medication_dosierung_mi": 0,
                                        "datestamp_time": "22:04",
                                        "datestamp_full_day": "Friday, 22nd January 2016",
                                        "medication_dosierung_mo": 0,
                                        "medication_name": "ABFÜHRTEE Sidroga Beutel",
                                        "datestamp_edit_time": "22:04",
                                        "medication_dosierung_interval": "",
                                        "uniqueid": "KKGOG0B6OI3PVPUPFKYYNSL5C8RU3YTU",
                                        "medication_dosierung_na": 0,
                                        "datestamp_edit_sort": "201601222204303030",
                                        "user": 2,
                                        "datestamp_day": "22.01.2016",
                                        "medication_start_verordnung_datum": "2016-01-22T21:04:06.022Z",
                                        "datestamp_edit_week": "2016, 04",
                                        "datestamp_edit_day": "22.01.2016",
                                        "medication_stop_verordnung_user": null,
                                        "datestamp_sort": "20160122220406066",
                                        "medication_selected": true,
                                        "medication_bemerkungen": "",
                                        "medication_status": "0",
                                        "datestamp_edit_full_day": "Friday, 22nd January 2016",
                                        "url_compendium": "https://compendium.ch/search/all/ABFÜHRTEE/contains/de",
                                        "medication": {
                                            "medi_order": "100",
                                            "medi_info": "",
                                            "medi_activated": true,
                                            "_lowerName": "abführtee sidroga beutel",
                                            "_lowerCode": "",
                                            "medi_code": "",
                                            "medi_name": "ABFÜHRTEE Sidroga Beutel"
                                        }
                                    }]
                                }
                            }
                        },
                        "patient_module": {}
                    },
                    "foreign_survey_responses": {
                        "ch.suedhang.apps.tmt_V3": [{
                            "data": {
                                "response": {
                                    "tmt_b_error": 2,
                                    "edu_years": 15,
                                    "survey_version": "ng_survey_v1",
                                    "tmt_a_error": 0,
                                    "mz": "3",
                                    "tmt_b_time": 99,
                                    "tmt_a_time": 77
                                },
                                "event_id": 10764,
                                "filled": "2016-09-30T17:02:19.000000000000Z"
                            },
                            "id": 3068
                        }, {
                            "data": {
                                "response": {
                                    "tmt_b_error": 4,
                                    "edu_years": 15,
                                    "survey_version": "ng_survey_v1",
                                    "tmt_a_error": 2,
                                    "mz": "2",
                                    "tmt_b_time": 87,
                                    "tmt_a_time": 43
                                },
                                "event_id": 10588,
                                "filled": "2016-09-02T12:00:26.000000000000Z"
                            },
                            "id": 3045
                        }, {
                            "data": {
                                "response": {
                                    "tmt_b_error": 0,
                                    "edu_years": 15,
                                    "survey_version": "ng_survey_v1",
                                    "tmt_a_error": 0,
                                    "mz": "1",
                                    "tmt_b_time": 33,
                                    "tmt_a_time": 25
                                },
                                "event_id": 10586,
                                "filled": "2016-09-02T11:25:56.000000000000Z"
                            },
                            "id": 3044
                        }, {
                            "data": {
                                "response": {
                                    "tmt_b_error": 8,
                                    "edu_years": 14,
                                    "tmt_a_error": 4,
                                    "mz": "3",
                                    "tmt_b_time": 88,
                                    "tmt_a_time": 44
                                },
                                "event_id": 10585,
                                "filled": "2016-09-02T11:17:20.000000000000Z"
                            },
                            "id": 3043
                        }, {
                            "data": {
                                "response": {
                                    "TMTAError": "0.0000000000",
                                    "Ausbildungsjahre": "17.0000000000",
                                    "datestamp": "2016-08-21 20:09:31",
                                    "TMTBError": "1.0000000000",
                                    "optinomixHASH": "2541625d-264f-4295-a6a4-5a3f2d1ad59f",
                                    "BAzWert": "-1.0800000000",
                                    "submitdate": "2016-08-21 20:09:31",
                                    "TMTATime": "34.0000000000",
                                    "BzWert": "-0.8700000000",
                                    "startdate": "2016-08-21 20:06:21",
                                    "Date": "2016-08-21 00:00:00",
                                    "AzWert": "0.2500000000",
                                    "startlanguage": "de",
                                    "TMTBTime": "64.0000000000",
                                    "PID": "1007",
                                    "id": "13",
                                    "FID": "123",
                                    "Alter": "56.0000000000",
                                    "Messzeitpunkt": "2",
                                    "lastpage": "3"
                                },
                                "event_id": 10516,
                                "filled": "2016-08-21T20:09:31.000000000000Z"
                            },
                            "id": 3039
                        }, {
                            "data": {
                                "response": {
                                    "TMTAError": "0.0000000000",
                                    "Ausbildungsjahre": "17.0000000000",
                                    "datestamp": "2016-08-20 19:11:54",
                                    "TMTBError": "0.0000000000",
                                    "optinomixHASH": "9a7ce6dd-1bf4-438c-b609-e2fd0f18a852",
                                    "BAzWert": "",
                                    "submitdate": "2016-08-20 19:11:54",
                                    "TMTATime": "36.0000000000",
                                    "BzWert": "",
                                    "startdate": "2016-08-20 19:10:58",
                                    "Date": "2016-08-20 00:00:00",
                                    "AzWert": "",
                                    "startlanguage": "de",
                                    "TMTBTime": "54.0000000000",
                                    "PID": "1007",
                                    "id": "12",
                                    "FID": "123",
                                    "Alter": "42.0000000000",
                                    "Messzeitpunkt": "1",
                                    "lastpage": "3"
                                },
                                "event_id": 10510,
                                "filled": "2016-08-20T19:11:54.000000000000Z"
                            },
                            "id": 3038
                        }]
                    },
                    "patient": {
                        "data": {
                            "address2": null,
                            "cis_lead_doctor": 2,
                            "email": "beat@ottiger.org",
                            "deceased": false,
                            "first_name": "Patient",
                            "four_letter_code": "TTNE",
                            "stay_id": 3,
                            "country": "CH",
                            "phone_mobile": "079 635 85 84",
                            "phone_home": null,
                            "gender": "male",
                            "city": "Oberrieden",
                            "ahv": "123.345.234.345",
                            "lead_therapist": 2,
                            "address1": "Haldenstrasse 7",
                            "last_name": "Ottiger",
                            "language": "de",
                            "birth_name": "Beat",
                            "title": null,
                            "notes": "Just me myself and I. Partienten Notizen.",
                            "cis_pid": 1007,
                            "zip_code": "8942",
                            "birthdate": "1973-05-21T00:00:00.000000000000Z"
                        },
                        "id": 1
                    },
                    "other_calculations": {
                        "ch.suedhang.apps.tmt_V3:tmt_score": [{
                            "TMTAError": 0,
                            "TMTBError": 2,
                            "edu_years": 15,
                            "response": {
                                "data": {
                                    "response": {
                                        "tmt_b_error": 2,
                                        "edu_years": 15,
                                        "survey_version": "ng_survey_v1",
                                        "tmt_a_error": 0,
                                        "mz": "3",
                                        "tmt_b_time": 99,
                                        "tmt_a_time": 77
                                    },
                                    "event_id": 10764,
                                    "filled": "2016-09-30T17:02:19.000000000000Z"
                                },
                                "id": 3068
                            },
                            "TMTATime": 77,
                            "quotient": 1.2857142857142858,
                            "date": "2016-09-30T17:02:19.000000000000Z",
                            "mz": 3,
                            "TMTBTime": 99,
                            "quotient_rounded": 1.29,
                            "percentile": {
                                "education": 1,
                                "time_error": {
                                    "TMTAError": 0,
                                    "TMTBError": 2,
                                    "TMTATime": 77,
                                    "TMTBTime": 99
                                },
                                "age_perz": {
                                    "perz90": [
                                        16,
                                        40
                                    ],
                                    "tmtB_norm_m": 58.46,
                                    "tmtA_norm_m": 28.54,
                                    "education": 99,
                                    "perz50": [
                                        26,
                                        58
                                    ],
                                    "altersgruppe": 2,
                                    "perz60": [
                                        24,
                                        53
                                    ],
                                    "n": 39,
                                    "perz10": [
                                        46,
                                        87
                                    ],
                                    "perz20": [
                                        36,
                                        70
                                    ],
                                    "perz70": [
                                        23,
                                        50
                                    ],
                                    "altersgruppe_text": "Altersgruppe 35 – 44",
                                    "perz80": [
                                        20,
                                        45
                                    ],
                                    "tmtA_norm_sd": 10.09,
                                    "education_high": true,
                                    "perz30": [
                                        32,
                                        62
                                    ],
                                    "tmtB_norm_sd": 16.41,
                                    "altersgruppe_found": true,
                                    "perz40": [
                                        28,
                                        60
                                    ]
                                },
                                "result": {
                                    "calculated": true,
                                    "A": 10,
                                    "B": 10
                                },
                                "vars": {
                                    "edu_years": 15,
                                    "d": {
                                        "tmt_b_error": 2,
                                        "edu_years": 15,
                                        "survey_version": "ng_survey_v1",
                                        "tmt_a_error": 0,
                                        "mz": "3",
                                        "tmt_b_time": 99,
                                        "tmt_a_time": 77
                                    },
                                    "set_age": 43
                                },
                                "z_scores": {
                                    "tmtB_z_zeitabbruch": -14.719073735527116,
                                    "tmtA_z_zeitabbruch_rounded": -15.01,
                                    "calculated": true,
                                    "tmtB_z_zeitabbruch_rounded": -14.72,
                                    "tmtA_z": -4.802775024777007,
                                    "quotient": 1.2857142857142858,
                                    "tmtB_z": -2.470444850700792,
                                    "tmtA_z_rounded": -4.8,
                                    "quotient_rounded": 1.29,
                                    "tmtB_z_rounded": -2.47,
                                    "tmtA_z_zeitabbruch": -15.010901883052528
                                }
                            },
                            "Messzeitpunkt": {
                                "Messzeitpunkt_Text": "Anderer Messzeitpunkt",
                                "Messzeitpunkt": 3
                            },
                            "set_age": 43,
                            "birthdate": "1973-05-21T00:00:00.000000000000Z"
                        }, {
                            "TMTAError": 2,
                            "TMTBError": 4,
                            "edu_years": 15,
                            "response": {
                                "data": {
                                    "response": {
                                        "tmt_b_error": 4,
                                        "edu_years": 15,
                                        "survey_version": "ng_survey_v1",
                                        "tmt_a_error": 2,
                                        "mz": "2",
                                        "tmt_b_time": 87,
                                        "tmt_a_time": 43
                                    },
                                    "event_id": 10588,
                                    "filled": "2016-09-02T12:00:26.000000000000Z"
                                },
                                "id": 3045
                            },
                            "TMTATime": 43,
                            "quotient": 2.0232558139534884,
                            "date": "2016-09-02T12:00:26.000000000000Z",
                            "mz": 2,
                            "TMTBTime": 87,
                            "quotient_rounded": 2.02,
                            "percentile": {
                                "education": 1,
                                "time_error": {
                                    "TMTAError": 2,
                                    "TMTBError": 4,
                                    "TMTATime": 43,
                                    "TMTBTime": 87
                                },
                                "age_perz": {
                                    "perz90": [
                                        16,
                                        40
                                    ],
                                    "tmtB_norm_m": 58.46,
                                    "tmtA_norm_m": 28.54,
                                    "education": 99,
                                    "perz50": [
                                        26,
                                        58
                                    ],
                                    "altersgruppe": 2,
                                    "perz60": [
                                        24,
                                        53
                                    ],
                                    "n": 39,
                                    "perz10": [
                                        46,
                                        87
                                    ],
                                    "perz20": [
                                        36,
                                        70
                                    ],
                                    "perz70": [
                                        23,
                                        50
                                    ],
                                    "altersgruppe_text": "Altersgruppe 35 – 44",
                                    "perz80": [
                                        20,
                                        45
                                    ],
                                    "tmtA_norm_sd": 10.09,
                                    "education_high": true,
                                    "perz30": [
                                        32,
                                        62
                                    ],
                                    "tmtB_norm_sd": 16.41,
                                    "altersgruppe_found": true,
                                    "perz40": [
                                        28,
                                        60
                                    ]
                                },
                                "result": {
                                    "calculated": true,
                                    "A": 20,
                                    "B": 10
                                },
                                "vars": {
                                    "edu_years": 15,
                                    "d": {
                                        "tmt_b_error": 4,
                                        "edu_years": 15,
                                        "survey_version": "ng_survey_v1",
                                        "tmt_a_error": 2,
                                        "mz": "2",
                                        "tmt_b_time": 87,
                                        "tmt_a_time": 43
                                    },
                                    "set_age": 43
                                },
                                "z_scores": {
                                    "tmtB_z_zeitabbruch": -14.719073735527116,
                                    "tmtA_z_zeitabbruch_rounded": -15.01,
                                    "calculated": true,
                                    "tmtB_z_zeitabbruch_rounded": -14.72,
                                    "tmtA_z": -1.4331020812685829,
                                    "quotient": 2.0232558139534884,
                                    "tmtB_z": -1.7391834247410116,
                                    "tmtA_z_rounded": -1.43,
                                    "quotient_rounded": 2.02,
                                    "tmtB_z_rounded": -1.74,
                                    "tmtA_z_zeitabbruch": -15.010901883052528
                                }
                            },
                            "Messzeitpunkt": {
                                "Messzeitpunkt_Text": "Austritt",
                                "Messzeitpunkt": 2
                            },
                            "set_age": 43,
                            "birthdate": "1973-05-21T00:00:00.000000000000Z"
                        }, {
                            "TMTAError": 0,
                            "TMTBError": 0,
                            "edu_years": 15,
                            "response": {
                                "data": {
                                    "response": {
                                        "tmt_b_error": 0,
                                        "edu_years": 15,
                                        "survey_version": "ng_survey_v1",
                                        "tmt_a_error": 0,
                                        "mz": "1",
                                        "tmt_b_time": 33,
                                        "tmt_a_time": 25
                                    },
                                    "event_id": 10586,
                                    "filled": "2016-09-02T11:25:56.000000000000Z"
                                },
                                "id": 3044
                            },
                            "TMTATime": 25,
                            "quotient": 1.32,
                            "date": "2016-09-02T11:25:56.000000000000Z",
                            "mz": 1,
                            "TMTBTime": 33,
                            "quotient_rounded": 1.32,
                            "percentile": {
                                "education": 1,
                                "time_error": {
                                    "TMTAError": 0,
                                    "TMTBError": 0,
                                    "TMTATime": 25,
                                    "TMTBTime": 33
                                },
                                "age_perz": {
                                    "perz90": [
                                        16,
                                        40
                                    ],
                                    "tmtB_norm_m": 58.46,
                                    "tmtA_norm_m": 28.54,
                                    "education": 99,
                                    "perz50": [
                                        26,
                                        58
                                    ],
                                    "altersgruppe": 2,
                                    "perz60": [
                                        24,
                                        53
                                    ],
                                    "n": 39,
                                    "perz10": [
                                        46,
                                        87
                                    ],
                                    "perz20": [
                                        36,
                                        70
                                    ],
                                    "perz70": [
                                        23,
                                        50
                                    ],
                                    "altersgruppe_text": "Altersgruppe 35 – 44",
                                    "perz80": [
                                        20,
                                        45
                                    ],
                                    "tmtA_norm_sd": 10.09,
                                    "education_high": true,
                                    "perz30": [
                                        32,
                                        62
                                    ],
                                    "tmtB_norm_sd": 16.41,
                                    "altersgruppe_found": true,
                                    "perz40": [
                                        28,
                                        60
                                    ]
                                },
                                "result": {
                                    "calculated": true,
                                    "A": 60,
                                    "B": 90
                                },
                                "vars": {
                                    "edu_years": 15,
                                    "d": {
                                        "tmt_b_error": 0,
                                        "edu_years": 15,
                                        "survey_version": "ng_survey_v1",
                                        "tmt_a_error": 0,
                                        "mz": "1",
                                        "tmt_b_time": 33,
                                        "tmt_a_time": 25
                                    },
                                    "set_age": 43
                                },
                                "z_scores": {
                                    "tmtB_z_zeitabbruch": -14.719073735527116,
                                    "tmtA_z_zeitabbruch_rounded": -15.01,
                                    "calculated": true,
                                    "tmtB_z_zeitabbruch_rounded": -14.72,
                                    "tmtA_z": 0.35084241823587703,
                                    "quotient": 1.32,
                                    "tmtB_z": 1.5514929920780012,
                                    "tmtA_z_rounded": 0.35,
                                    "quotient_rounded": 1.32,
                                    "tmtB_z_rounded": 1.55,
                                    "tmtA_z_zeitabbruch": -15.010901883052528
                                }
                            },
                            "Messzeitpunkt": {
                                "Messzeitpunkt_Text": "Eintritt",
                                "Messzeitpunkt": 1
                            },
                            "set_age": 43,
                            "birthdate": "1973-05-21T00:00:00.000000000000Z"
                        }]
                    }
                }, {
                    "annotations": {
                        "module": {},
                        "patient": {},
                        "patient_module": {}
                    },
                    "foreign_survey_responses": {
                        "ch.suedhang.apps.tmt_V3": [{
                            "data": {
                                "response": {
                                    "tmt_b_error": 2,
                                    "edu_years": 14,
                                    "survey_version": "ng_survey_v1",
                                    "tmt_a_error": 1,
                                    "mz": "3",
                                    "tmt_b_time": 288,
                                    "tmt_a_time": 66
                                },
                                "event_id": 10766,
                                "filled": "2016-09-30T17:03:36.000000000000Z"
                            },
                            "id": 3069
                        }, {
                            "data": {
                                "response": {
                                    "tmt_b_error": 1,
                                    "edu_years": 10,
                                    "survey_version": "ng_survey_v1",
                                    "tmt_a_error": 0,
                                    "mz": "2",
                                    "tmt_b_time": 112,
                                    "tmt_a_time": 20
                                },
                                "event_id": 10761,
                                "filled": "2016-09-30T06:26:28.000000000000Z"
                            },
                            "id": 3067
                        }, {
                            "data": {
                                "response": {
                                    "tmt_b_error": 0,
                                    "edu_years": 15,
                                    "survey_version": "ng_survey_v1",
                                    "tmt_a_error": 0,
                                    "mz": "1",
                                    "tmt_b_time": 40,
                                    "tmt_a_time": 20
                                },
                                "event_id": 10672,
                                "filled": "2016-09-14T09:28:46.000000000000Z"
                            },
                            "id": 3060
                        }, {
                            "data": {
                                "response": {
                                    "tmt_b_error": 6,
                                    "edu_years": 14,
                                    "survey_version": "ng_survey_v1",
                                    "tmt_a_error": 5,
                                    "mz": "2",
                                    "tmt_b_time": 110,
                                    "tmt_a_time": 56
                                },
                                "event_id": 10651,
                                "filled": "2016-09-12T13:10:30.000000000000Z"
                            },
                            "id": 3049
                        }, {
                            "data": {
                                "response": {
                                    "tmt_b_error": 3,
                                    "edu_years": 14,
                                    "survey_version": "ng_survey_v1",
                                    "tmt_a_error": 1,
                                    "mz": "1",
                                    "tmt_b_time": 95,
                                    "tmt_a_time": 45
                                },
                                "event_id": 10650,
                                "filled": "2016-09-12T13:09:09.000000000000Z"
                            },
                            "id": 3048
                        }, {
                            "data": {
                                "response": {
                                    "TMTAError": "0.0000000000",
                                    "Ausbildungsjahre": "15.0000000000",
                                    "datestamp": "2016-07-18 14:04:59",
                                    "TMTBError": "0.0000000000",
                                    "optinomixHASH": "1d082eb7-abac-4214-9511-2fae33ab7c8a",
                                    "BAzWert": "0.5000000000",
                                    "submitdate": "2016-07-18 14:04:59",
                                    "TMTATime": "60.0000000000",
                                    "BzWert": "-0.9000000000",
                                    "startdate": "2016-07-18 14:04:13",
                                    "Date": "2016-07-18 00:00:00",
                                    "AzWert": "-1.2000000000",
                                    "startlanguage": "de",
                                    "TMTBTime": "120.0000000000",
                                    "PID": "70706",
                                    "id": "10",
                                    "FID": "10",
                                    "Alter": "101.0000000000",
                                    "Messzeitpunkt": "3",
                                    "lastpage": "3"
                                },
                                "event_id": 10279,
                                "filled": "2016-07-18T14:04:59.000000000000Z"
                            },
                            "id": 3027
                        }]
                    },
                    "patient": {
                        "data": {
                            "address2": null,
                            "cis_lead_doctor": null,
                            "email": "nora.schoenenberger@suedhang.ch",
                            "deceased": false,
                            "first_name": "Frida",
                            "four_letter_code": "IHDL",
                            "stay_id": 40,
                            "country": "CH",
                            "phone_mobile": null,
                            "phone_home": null,
                            "gender": "female",
                            "city": "Coyoacan",
                            "ahv": null,
                            "lead_therapist": 11,
                            "address1": "Riviera 1",
                            "last_name": "Kahlo",
                            "language": "de",
                            "birth_name": null,
                            "title": "Dr.",
                            "notes": null,
                            "cis_pid": 70706,
                            "zip_code": "12345",
                            "birthdate": "1973-07-06T00:00:00.000000000000Z"
                        },
                        "id": 24
                    },
                    "other_calculations": {
                        "ch.suedhang.apps.tmt_V3:tmt_score": [{
                            "TMTAError": 1,
                            "TMTBError": 2,
                            "edu_years": 14,
                            "response": {
                                "data": {
                                    "response": {
                                        "tmt_b_error": 2,
                                        "edu_years": 14,
                                        "survey_version": "ng_survey_v1",
                                        "tmt_a_error": 1,
                                        "mz": "3",
                                        "tmt_b_time": 288,
                                        "tmt_a_time": 66
                                    },
                                    "event_id": 10766,
                                    "filled": "2016-09-30T17:03:36.000000000000Z"
                                },
                                "id": 3069
                            },
                            "TMTATime": 66,
                            "quotient": 4.363636363636363,
                            "date": "2016-09-30T17:03:36.000000000000Z",
                            "mz": 3,
                            "TMTBTime": 288,
                            "quotient_rounded": 4.36,
                            "percentile": {
                                "education": 1,
                                "time_error": {
                                    "TMTAError": 1,
                                    "TMTBError": 2,
                                    "TMTATime": 66,
                                    "TMTBTime": 288
                                },
                                "age_perz": {
                                    "perz90": [
                                        16,
                                        40
                                    ],
                                    "tmtB_norm_m": 58.46,
                                    "tmtA_norm_m": 28.54,
                                    "education": 99,
                                    "perz50": [
                                        26,
                                        58
                                    ],
                                    "altersgruppe": 2,
                                    "perz60": [
                                        24,
                                        53
                                    ],
                                    "n": 39,
                                    "perz10": [
                                        46,
                                        87
                                    ],
                                    "perz20": [
                                        36,
                                        70
                                    ],
                                    "perz70": [
                                        23,
                                        50
                                    ],
                                    "altersgruppe_text": "Altersgruppe 35 – 44",
                                    "perz80": [
                                        20,
                                        45
                                    ],
                                    "tmtA_norm_sd": 10.09,
                                    "education_high": true,
                                    "perz30": [
                                        32,
                                        62
                                    ],
                                    "tmtB_norm_sd": 16.41,
                                    "altersgruppe_found": true,
                                    "perz40": [
                                        28,
                                        60
                                    ]
                                },
                                "result": {
                                    "calculated": true,
                                    "A": 10,
                                    "B": 10
                                },
                                "vars": {
                                    "edu_years": 14,
                                    "d": {
                                        "tmt_b_error": 2,
                                        "edu_years": 14,
                                        "survey_version": "ng_survey_v1",
                                        "tmt_a_error": 1,
                                        "mz": "3",
                                        "tmt_b_time": 288,
                                        "tmt_a_time": 66
                                    },
                                    "set_age": 43
                                },
                                "z_scores": {
                                    "tmtB_z_zeitabbruch": -14.719073735527116,
                                    "tmtA_z_zeitabbruch_rounded": -15.01,
                                    "calculated": true,
                                    "tmtB_z_zeitabbruch_rounded": -14.72,
                                    "tmtA_z": -3.7125867195242814,
                                    "quotient": 4.363636363636363,
                                    "tmtB_z": -13.987812309567337,
                                    "tmtA_z_rounded": -3.71,
                                    "quotient_rounded": 4.36,
                                    "tmtB_z_rounded": -13.99,
                                    "tmtA_z_zeitabbruch": -15.010901883052528
                                }
                            },
                            "Messzeitpunkt": {
                                "Messzeitpunkt_Text": "Anderer Messzeitpunkt",
                                "Messzeitpunkt": 3
                            },
                            "set_age": 43,
                            "birthdate": "1973-07-06T00:00:00.000000000000Z"
                        }, {
                            "TMTAError": 0,
                            "TMTBError": 1,
                            "edu_years": 10,
                            "response": {
                                "data": {
                                    "response": {
                                        "tmt_b_error": 1,
                                        "edu_years": 10,
                                        "survey_version": "ng_survey_v1",
                                        "tmt_a_error": 0,
                                        "mz": "2",
                                        "tmt_b_time": 112,
                                        "tmt_a_time": 20
                                    },
                                    "event_id": 10761,
                                    "filled": "2016-09-30T06:26:28.000000000000Z"
                                },
                                "id": 3067
                            },
                            "TMTATime": 20,
                            "quotient": 5.6,
                            "date": "2016-09-30T06:26:28.000000000000Z",
                            "mz": 2,
                            "TMTBTime": 112,
                            "quotient_rounded": 5.6,
                            "percentile": {
                                "education": 0,
                                "time_error": {
                                    "TMTAError": 0,
                                    "TMTBError": 1,
                                    "TMTATime": 20,
                                    "TMTBTime": 112
                                },
                                "age_perz": {
                                    "perz90": [
                                        16,
                                        40
                                    ],
                                    "tmtB_norm_m": 58.46,
                                    "tmtA_norm_m": 28.54,
                                    "education": 99,
                                    "perz50": [
                                        26,
                                        58
                                    ],
                                    "altersgruppe": 2,
                                    "perz60": [
                                        24,
                                        53
                                    ],
                                    "n": 39,
                                    "perz10": [
                                        46,
                                        87
                                    ],
                                    "perz20": [
                                        36,
                                        70
                                    ],
                                    "perz70": [
                                        23,
                                        50
                                    ],
                                    "altersgruppe_text": "Altersgruppe 35 – 44",
                                    "perz80": [
                                        20,
                                        45
                                    ],
                                    "tmtA_norm_sd": 10.09,
                                    "education_high": false,
                                    "perz30": [
                                        32,
                                        62
                                    ],
                                    "tmtB_norm_sd": 16.41,
                                    "altersgruppe_found": true,
                                    "perz40": [
                                        28,
                                        60
                                    ]
                                },
                                "result": {
                                    "calculated": true,
                                    "A": 80,
                                    "B": 10
                                },
                                "vars": {
                                    "edu_years": 10,
                                    "d": {
                                        "tmt_b_error": 1,
                                        "edu_years": 10,
                                        "survey_version": "ng_survey_v1",
                                        "tmt_a_error": 0,
                                        "mz": "2",
                                        "tmt_b_time": 112,
                                        "tmt_a_time": 20
                                    },
                                    "set_age": 43
                                },
                                "z_scores": {
                                    "tmtB_z_zeitabbruch": -14.719073735527116,
                                    "tmtA_z_zeitabbruch_rounded": -15.01,
                                    "calculated": true,
                                    "tmtB_z_zeitabbruch_rounded": -14.72,
                                    "tmtA_z": 0.8463825569871158,
                                    "quotient": 5.6,
                                    "tmtB_z": -3.262644728823888,
                                    "tmtA_z_rounded": 0.85,
                                    "quotient_rounded": 5.6,
                                    "tmtB_z_rounded": -3.26,
                                    "tmtA_z_zeitabbruch": -15.010901883052528
                                }
                            },
                            "Messzeitpunkt": {
                                "Messzeitpunkt_Text": "Austritt",
                                "Messzeitpunkt": 2
                            },
                            "set_age": 43,
                            "birthdate": "1973-07-06T00:00:00.000000000000Z"
                        }, {
                            "TMTAError": 0,
                            "TMTBError": 0,
                            "edu_years": 15,
                            "response": {
                                "data": {
                                    "response": {
                                        "tmt_b_error": 0,
                                        "edu_years": 15,
                                        "survey_version": "ng_survey_v1",
                                        "tmt_a_error": 0,
                                        "mz": "1",
                                        "tmt_b_time": 40,
                                        "tmt_a_time": 20
                                    },
                                    "event_id": 10672,
                                    "filled": "2016-09-14T09:28:46.000000000000Z"
                                },
                                "id": 3060
                            },
                            "TMTATime": 20,
                            "quotient": 2,
                            "date": "2016-09-14T09:28:46.000000000000Z",
                            "mz": 1,
                            "TMTBTime": 40,
                            "quotient_rounded": 2,
                            "percentile": {
                                "education": 1,
                                "time_error": {
                                    "TMTAError": 0,
                                    "TMTBError": 0,
                                    "TMTATime": 20,
                                    "TMTBTime": 40
                                },
                                "age_perz": {
                                    "perz90": [
                                        16,
                                        40
                                    ],
                                    "tmtB_norm_m": 58.46,
                                    "tmtA_norm_m": 28.54,
                                    "education": 99,
                                    "perz50": [
                                        26,
                                        58
                                    ],
                                    "altersgruppe": 2,
                                    "perz60": [
                                        24,
                                        53
                                    ],
                                    "n": 39,
                                    "perz10": [
                                        46,
                                        87
                                    ],
                                    "perz20": [
                                        36,
                                        70
                                    ],
                                    "perz70": [
                                        23,
                                        50
                                    ],
                                    "altersgruppe_text": "Altersgruppe 35 – 44",
                                    "perz80": [
                                        20,
                                        45
                                    ],
                                    "tmtA_norm_sd": 10.09,
                                    "education_high": true,
                                    "perz30": [
                                        32,
                                        62
                                    ],
                                    "tmtB_norm_sd": 16.41,
                                    "altersgruppe_found": true,
                                    "perz40": [
                                        28,
                                        60
                                    ]
                                },
                                "result": {
                                    "calculated": true,
                                    "A": 80,
                                    "B": 90
                                },
                                "vars": {
                                    "edu_years": 15,
                                    "d": {
                                        "tmt_b_error": 0,
                                        "edu_years": 15,
                                        "survey_version": "ng_survey_v1",
                                        "tmt_a_error": 0,
                                        "mz": "1",
                                        "tmt_b_time": 40,
                                        "tmt_a_time": 20
                                    },
                                    "set_age": 43
                                },
                                "z_scores": {
                                    "tmtB_z_zeitabbruch": -14.719073735527116,
                                    "tmtA_z_zeitabbruch_rounded": -15.01,
                                    "calculated": true,
                                    "tmtB_z_zeitabbruch_rounded": -14.72,
                                    "tmtA_z": 0.8463825569871158,
                                    "quotient": 2,
                                    "tmtB_z": 1.1249238269347959,
                                    "tmtA_z_rounded": 0.85,
                                    "quotient_rounded": 2,
                                    "tmtB_z_rounded": 1.12,
                                    "tmtA_z_zeitabbruch": -15.010901883052528
                                }
                            },
                            "Messzeitpunkt": {
                                "Messzeitpunkt_Text": "Eintritt",
                                "Messzeitpunkt": 1
                            },
                            "set_age": 43,
                            "birthdate": "1973-07-06T00:00:00.000000000000Z"
                        }, {
                            "TMTAError": 5,
                            "TMTBError": 6,
                            "edu_years": 14,
                            "response": {
                                "data": {
                                    "response": {
                                        "tmt_b_error": 6,
                                        "edu_years": 14,
                                        "survey_version": "ng_survey_v1",
                                        "tmt_a_error": 5,
                                        "mz": "2",
                                        "tmt_b_time": 110,
                                        "tmt_a_time": 56
                                    },
                                    "event_id": 10651,
                                    "filled": "2016-09-12T13:10:30.000000000000Z"
                                },
                                "id": 3049
                            },
                            "TMTATime": 56,
                            "quotient": 1.9642857142857142,
                            "date": "2016-09-12T13:10:30.000000000000Z",
                            "mz": 2,
                            "TMTBTime": 110,
                            "quotient_rounded": 1.96,
                            "percentile": {
                                "education": 1,
                                "time_error": {
                                    "TMTAError": 5,
                                    "TMTBError": 6,
                                    "TMTATime": 56,
                                    "TMTBTime": 110
                                },
                                "age_perz": {
                                    "perz90": [
                                        16,
                                        40
                                    ],
                                    "tmtB_norm_m": 58.46,
                                    "tmtA_norm_m": 28.54,
                                    "education": 99,
                                    "perz50": [
                                        26,
                                        58
                                    ],
                                    "altersgruppe": 2,
                                    "perz60": [
                                        24,
                                        53
                                    ],
                                    "n": 39,
                                    "perz10": [
                                        46,
                                        87
                                    ],
                                    "perz20": [
                                        36,
                                        70
                                    ],
                                    "perz70": [
                                        23,
                                        50
                                    ],
                                    "altersgruppe_text": "Altersgruppe 35 – 44",
                                    "perz80": [
                                        20,
                                        45
                                    ],
                                    "tmtA_norm_sd": 10.09,
                                    "education_high": true,
                                    "perz30": [
                                        32,
                                        62
                                    ],
                                    "tmtB_norm_sd": 16.41,
                                    "altersgruppe_found": true,
                                    "perz40": [
                                        28,
                                        60
                                    ]
                                },
                                "result": {
                                    "calculated": true,
                                    "A": 10,
                                    "B": 10
                                },
                                "vars": {
                                    "edu_years": 14,
                                    "d": {
                                        "tmt_b_error": 6,
                                        "edu_years": 14,
                                        "survey_version": "ng_survey_v1",
                                        "tmt_a_error": 5,
                                        "mz": "2",
                                        "tmt_b_time": 110,
                                        "tmt_a_time": 56
                                    },
                                    "set_age": 43
                                },
                                "z_scores": {
                                    "tmtB_z_zeitabbruch": -14.719073735527116,
                                    "tmtA_z_zeitabbruch_rounded": -15.01,
                                    "calculated": true,
                                    "tmtB_z_zeitabbruch_rounded": -14.72,
                                    "tmtA_z": -2.721506442021804,
                                    "quotient": 1.9642857142857142,
                                    "tmtB_z": -3.140767824497258,
                                    "tmtA_z_rounded": -2.72,
                                    "quotient_rounded": 1.96,
                                    "tmtB_z_rounded": -3.14,
                                    "tmtA_z_zeitabbruch": -15.010901883052528
                                }
                            },
                            "Messzeitpunkt": {
                                "Messzeitpunkt_Text": "Austritt",
                                "Messzeitpunkt": 2
                            },
                            "set_age": 43,
                            "birthdate": "1973-07-06T00:00:00.000000000000Z"
                        }, {
                            "TMTAError": 1,
                            "TMTBError": 3,
                            "edu_years": 14,
                            "response": {
                                "data": {
                                    "response": {
                                        "tmt_b_error": 3,
                                        "edu_years": 14,
                                        "survey_version": "ng_survey_v1",
                                        "tmt_a_error": 1,
                                        "mz": "1",
                                        "tmt_b_time": 95,
                                        "tmt_a_time": 45
                                    },
                                    "event_id": 10650,
                                    "filled": "2016-09-12T13:09:09.000000000000Z"
                                },
                                "id": 3048
                            },
                            "TMTATime": 45,
                            "quotient": 2.111111111111111,
                            "date": "2016-09-12T13:09:09.000000000000Z",
                            "mz": 1,
                            "TMTBTime": 95,
                            "quotient_rounded": 2.11,
                            "percentile": {
                                "education": 1,
                                "time_error": {
                                    "TMTAError": 1,
                                    "TMTBError": 3,
                                    "TMTATime": 45,
                                    "TMTBTime": 95
                                },
                                "age_perz": {
                                    "perz90": [
                                        16,
                                        40
                                    ],
                                    "tmtB_norm_m": 58.46,
                                    "tmtA_norm_m": 28.54,
                                    "education": 99,
                                    "perz50": [
                                        26,
                                        58
                                    ],
                                    "altersgruppe": 2,
                                    "perz60": [
                                        24,
                                        53
                                    ],
                                    "n": 39,
                                    "perz10": [
                                        46,
                                        87
                                    ],
                                    "perz20": [
                                        36,
                                        70
                                    ],
                                    "perz70": [
                                        23,
                                        50
                                    ],
                                    "altersgruppe_text": "Altersgruppe 35 – 44",
                                    "perz80": [
                                        20,
                                        45
                                    ],
                                    "tmtA_norm_sd": 10.09,
                                    "education_high": true,
                                    "perz30": [
                                        32,
                                        62
                                    ],
                                    "tmtB_norm_sd": 16.41,
                                    "altersgruppe_found": true,
                                    "perz40": [
                                        28,
                                        60
                                    ]
                                },
                                "result": {
                                    "calculated": true,
                                    "A": 20,
                                    "B": 10
                                },
                                "vars": {
                                    "edu_years": 14,
                                    "d": {
                                        "tmt_b_error": 3,
                                        "edu_years": 14,
                                        "survey_version": "ng_survey_v1",
                                        "tmt_a_error": 1,
                                        "mz": "1",
                                        "tmt_b_time": 95,
                                        "tmt_a_time": 45
                                    },
                                    "set_age": 43
                                },
                                "z_scores": {
                                    "tmtB_z_zeitabbruch": -14.719073735527116,
                                    "tmtA_z_zeitabbruch_rounded": -15.01,
                                    "calculated": true,
                                    "tmtB_z_zeitabbruch_rounded": -14.72,
                                    "tmtA_z": -1.6313181367690783,
                                    "quotient": 2.111111111111111,
                                    "tmtB_z": -2.226691042047532,
                                    "tmtA_z_rounded": -1.63,
                                    "quotient_rounded": 2.11,
                                    "tmtB_z_rounded": -2.23,
                                    "tmtA_z_zeitabbruch": -15.010901883052528
                                }
                            },
                            "Messzeitpunkt": {
                                "Messzeitpunkt_Text": "Eintritt",
                                "Messzeitpunkt": 1
                            },
                            "set_age": 43,
                            "birthdate": "1973-07-06T00:00:00.000000000000Z"
                        }]
                    }
                }]
            },
            "definitions": {
                "md_app_data_empty": [
                    [
                        [
                            null,
                            null,
                            null,
                            null
                        ],
                        [
                            null,
                            null,
                            null,
                            null
                        ],
                        [
                            null,
                            null,
                            null,
                            null
                        ]
                    ],
                    [
                        [
                            null,
                            null,
                            null,
                            null
                        ],
                        [
                            null,
                            null,
                            null,
                            null
                        ],
                        [
                            null,
                            null,
                            null,
                            null
                        ]
                    ],
                    [
                        [
                            null,
                            null,
                            null,
                            null
                        ],
                        [
                            null,
                            null,
                            null,
                            null
                        ],
                        [
                            null,
                            null,
                            null,
                            null
                        ]
                    ],
                    [
                        [
                            null,
                            null,
                            null,
                            null
                        ],
                        [
                            null,
                            null,
                            null,
                            null
                        ],
                        [
                            null,
                            null,
                            null,
                            null
                        ]
                    ],
                    [
                        [
                            null,
                            null,
                            null,
                            null
                        ],
                        [
                            null,
                            null,
                            null,
                            null
                        ],
                        [
                            null,
                            null,
                            null,
                            null
                        ]
                    ],
                    [
                        [
                            null,
                            null,
                            null,
                            null
                        ],
                        [
                            null,
                            null,
                            null,
                            null
                        ],
                        [
                            null,
                            null,
                            null,
                            null
                        ]
                    ],
                    [
                        [
                            null,
                            null,
                            null,
                            null
                        ],
                        [
                            null,
                            null,
                            null,
                            null
                        ],
                        [
                            null,
                            null,
                            null,
                            null
                        ]
                    ],
                    [
                        [
                            null,
                            null,
                            null,
                            null
                        ],
                        [
                            null,
                            null,
                            null,
                            null
                        ],
                        [
                            null,
                            null,
                            null,
                            null
                        ]
                    ],
                    [
                        [
                            null,
                            null,
                            null,
                            null
                        ],
                        [
                            null,
                            null,
                            null,
                            null
                        ],
                        [
                            null,
                            null,
                            null,
                            null
                        ]
                    ],
                    [
                        [
                            null,
                            null,
                            null,
                            null
                        ],
                        [
                            null,
                            null,
                            null,
                            null
                        ],
                        [
                            null,
                            null,
                            null,
                            null
                        ]
                    ],
                    [
                        [
                            null,
                            null,
                            null,
                            null
                        ],
                        [
                            null,
                            null,
                            null,
                            null
                        ],
                        [
                            null,
                            null,
                            null,
                            null
                        ]
                    ]
                ],
                "variables": {
                    "TMTAError": [],
                    "TMTBError": [],
                    "TMTBZ": [],
                    "TMTATime": [],
                    "TMTAPerz": [],
                    "TMTBPerz": [],
                    "TMTBTime": [],
                    "BA_Quotient": [],
                    "TMTAZ": []
                },
                "dimensions_app": [{
                    "array": [{
                        "text": "18 - 24",
                        "id": 0
                    }, {
                        "text": "25 – 34",
                        "id": 1
                    }, {
                        "text": "35 – 44",
                        "id": 2
                    }, {
                        "text": "45 – 54",
                        "id": 3
                    }, {
                        "text": "55 – 59",
                        "id": 4
                    }, {
                        "text": "60 – 64",
                        "id": 5
                    }, {
                        "text": "65 – 69",
                        "id": 6
                    }, {
                        "text": "70 – 74",
                        "id": 7
                    }, {
                        "text": "75 – 79",
                        "id": 8
                    }, {
                        "text": "80 – 84",
                        "id": 9
                    }, {
                        "text": "85 – 89",
                        "id": 10
                    }],
                    "name": "Altersgruppe",
                    "id": 0
                }, {
                    "array": [{
                        "text": "<= 12 Jahre",
                        "id": 0
                    }, {
                        "text": "> 12 Jahre",
                        "id": 1
                    }, {
                        "text": "Jeder Ausbildungsgrad",
                        "id": 99
                    }],
                    "name": "Ausbildungsgrad",
                    "id": 1
                }, {
                    "array": [{
                        "text": "Eintritt",
                        "id": 1
                    }, {
                        "text": "Austritt",
                        "id": 2
                    }, {
                        "text": "Anderer Messzeitpunkt",
                        "id": 3
                    }, {
                        "text": "Alle Messzeitpunkte",
                        "id": 99
                    }],
                    "name": "Messzeitpunkt",
                    "id": 2
                }],
                "info": {
                    "patient_app_id": "ch.suedhang.apps.tmt_V3",
                    "other_calculation": "ch.suedhang.apps.tmt_V3:tmt_score",
                    "patient_app_calculation": "tmt_score"
                }
            }
        };

        return fake;
    };


});
