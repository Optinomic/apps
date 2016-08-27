function main(responses) {

    var calc = {};


    include(../lib/js/optinomic/statistics/calculation_simplestatistics.js)




    // ------------------------------------------
    // Definitions
    // ------------------------------------------

    calc.group_age_props = [{
        "age_group_id": 0,
        "age_group_text": "Altersgruppe 18 - 24"
    }, {
        "age_group_id": 1,
        "age_group_text": "Altersgruppe 25 – 34"
    }, {
        "age_group_id": 2,
        "age_group_text": "Altersgruppe 35 – 44"
    }, {
        "age_group_id": 3,
        "age_group_text": "Altersgruppe 45 – 54"
    }, {
        "age_group_id": 4,
        "age_group_text": "Altersgruppe 55 – 59"
    }, {
        "age_group_id": 5,
        "age_group_text": "Altersgruppe 60 – 64"
    }, {
        "age_group_id": 6,
        "age_group_text": "Altersgruppe 65 – 69"
    }, {
        "age_group_id": 7,
        "age_group_text": "Altersgruppe 70 – 74"
    }, {
        "age_group_id": 8,
        "age_group_text": "Altersgruppe 75 – 79"
    }, {
        "age_group_id": 9,
        "age_group_text": "Altersgruppe 80 – 84"
    }, {
        "age_group_id": 10,
        "age_group_text": "Altersgruppe 85 – 89"
    }];

    calc.group_edu_props = [{
        "edu_group_id": 0,
        "edu_high": false,
        "edu_group_text": "Ausbildung: <= 12 Jahre"
    }, {
        "edu_group_id": 1,
        "edu_high": true,
        "edu_group_text": "Ausbildung: > 12 Jahre"
    }, {
        "edu_group_id": 99,
        "edu_high": null,
        "edu_group_text": "Ausbildung: Alle Levels"
    }];

    calc.group_mz_props = [{
        "mz_group_id": 0,
        "mz_group_text": "Messzeitpunkt: Eintritt"
    }, {
        "mz_group_id": 1,
        "mz_group_text": "Messzeitpunkt: Austritt"
    }, {
        "mz_group_id": 3,
        "mz_group_text": "Messzeitpunkt: Anderer"
    }, {
        "mz_group_id": 99,
        "mz_group_text": "All Messzeitpunkte"
    }];


    // ------------------------------------------
    // H e l p e r   -   F U N C T I O N S
    // ------------------------------------------



    calc.getVariables = function(mode) {
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

    calc.merge_obj = function(obj1,obj2){
        var obj3 = {};
        for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
        for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
        return obj3;
    }


    calc.getAgeEduObj = function() {

        var retrun_obj = {};

        // Propertys from Data Model
        var age_props = calc.group_age_props;
        var edu_props = calc.group_edu_props;
        var mz_props = calc.group_mz_props;

        // Create 'all propertys array' from Array
        var allVarsPropertys = [];
        var allVars = calc.getVariables('variables');
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



        var merge_obj = function(obj1,obj2) {
            var obj3 = {};
            for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
            for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
            return obj3;
        };

 
        // Create 'multidimensional Array in a Object.

        var obj_name = '';


        for (var group_id = 0; group_id < age_props.length; group_id++) {
            var inner_obj = {}; 

            var obj_to_merge = age_props[group_id];

            //Add stuff;
            inner_obj.age_group_array_id = group_id;
            //inner_obj.age_group_id = 73;
            //inner_obj.age_group_text = '73';


            for (var edu_prop_id = 0; edu_prop_id < edu_props.length; edu_prop_id++) {
                inner_obj.edu_group_array_id = edu_prop_id;

                for (var mz_prop_id = 0; mz_prop_id < mz_props.length; mz_prop_id++) {

                    inner_obj.edu_group_array_id = mz_prop_id;
                    obj_name = 'age_' + twoDigits(group_id) + '_edu_' + twoDigits(edu_prop_id) + '_mz_' + twoDigits(mz_prop_id);

                    // Write to Object
                    retrun_obj[obj_name] = inner_obj;
                };
            };
        };


        return retrun_obj;
    };

    calc.getAgeEduGroup = function(mode) {
        // Variablen oder 'Empty'?
        mode = mode === undefined ? 'variables' : mode;


        // Data Model
        var age_edu_groups = [{
            "info": {
                "age_group": 0,
                "age_group_text": "Altersgruppe 18 - 24"
            },
            "edu_all": {
                "mz_alle": calc.getVariables(mode),
                "mz_eintritt": calc.getVariables(mode),
                "mz_austritt": calc.getVariables(mode),
                "mz_anderer": calc.getVariables(mode)
            },
            "edu_high": {
                "mz_alle": calc.getVariables(mode),
                "mz_eintritt": calc.getVariables(mode),
                "mz_austritt": calc.getVariables(mode),
                "mz_anderer": calc.getVariables(mode)
            },
            "edu_small": {
                "mz_alle": calc.getVariables(mode),
                "mz_eintritt": calc.getVariables(mode),
                "mz_austritt": calc.getVariables(mode),
                "mz_anderer": calc.getVariables(mode)
            }
        }, {
            "info": {
                "age_group": 1,
                "age_group_text": "Altersgruppe 25 – 34"
            },
            "edu_all": {
                "mz_alle": calc.getVariables(mode),
                "mz_eintritt": calc.getVariables(mode),
                "mz_austritt": calc.getVariables(mode),
                "mz_anderer": calc.getVariables(mode)
            },
            "edu_high": {
                "mz_alle": calc.getVariables(mode),
                "mz_eintritt": calc.getVariables(mode),
                "mz_austritt": calc.getVariables(mode),
                "mz_anderer": calc.getVariables(mode)
            },
            "edu_small": {
                "mz_alle": calc.getVariables(mode),
                "mz_eintritt": calc.getVariables(mode),
                "mz_austritt": calc.getVariables(mode),
                "mz_anderer": calc.getVariables(mode)
            }
        }, {
            "info": {
                "age_group": 2,
                "age_group_text": "Altersgruppe 35 – 44"
            },
            "edu_all": {
                "mz_alle": calc.getVariables(mode),
                "mz_eintritt": calc.getVariables(mode),
                "mz_austritt": calc.getVariables(mode),
                "mz_anderer": calc.getVariables(mode)
            },
            "edu_high": {
                "mz_alle": calc.getVariables(mode),
                "mz_eintritt": calc.getVariables(mode),
                "mz_austritt": calc.getVariables(mode),
                "mz_anderer": calc.getVariables(mode)
            },
            "edu_small": {
                "mz_alle": calc.getVariables(mode),
                "mz_eintritt": calc.getVariables(mode),
                "mz_austritt": calc.getVariables(mode),
                "mz_anderer": calc.getVariables(mode)
            }
        }, {
            "info": {
                "age_group": 3,
                "age_group_text": "Altersgruppe 45 – 54"
            },
            "edu_all": {
                "mz_alle": calc.getVariables(mode),
                "mz_eintritt": calc.getVariables(mode),
                "mz_austritt": calc.getVariables(mode),
                "mz_anderer": calc.getVariables(mode)
            },
            "edu_high": {
                "mz_alle": calc.getVariables(mode),
                "mz_eintritt": calc.getVariables(mode),
                "mz_austritt": calc.getVariables(mode),
                "mz_anderer": calc.getVariables(mode)
            },
            "edu_small": {
                "mz_alle": calc.getVariables(mode),
                "mz_eintritt": calc.getVariables(mode),
                "mz_austritt": calc.getVariables(mode),
                "mz_anderer": calc.getVariables(mode)
            }
        }, {
            "info": {
                "age_group": 4,
                "age_group_text": "Altersgruppe 55 – 59"
            },
            "edu_all": {
                "mz_alle": calc.getVariables(mode),
                "mz_eintritt": calc.getVariables(mode),
                "mz_austritt": calc.getVariables(mode),
                "mz_anderer": calc.getVariables(mode)
            },
            "edu_high": {
                "mz_alle": calc.getVariables(mode),
                "mz_eintritt": calc.getVariables(mode),
                "mz_austritt": calc.getVariables(mode),
                "mz_anderer": calc.getVariables(mode)
            },
            "edu_small": {
                "mz_alle": calc.getVariables(mode),
                "mz_eintritt": calc.getVariables(mode),
                "mz_austritt": calc.getVariables(mode),
                "mz_anderer": calc.getVariables(mode)
            }
        }, {
            "info": {
                "age_group": 5,
                "age_group_text": "Altersgruppe 60 – 64"
            },
            "edu_all": {
                "mz_alle": calc.getVariables(mode),
                "mz_eintritt": calc.getVariables(mode),
                "mz_austritt": calc.getVariables(mode),
                "mz_anderer": calc.getVariables(mode)
            },
            "edu_high": {
                "mz_alle": calc.getVariables(mode),
                "mz_eintritt": calc.getVariables(mode),
                "mz_austritt": calc.getVariables(mode),
                "mz_anderer": calc.getVariables(mode)
            },
            "edu_small": {
                "mz_alle": calc.getVariables(mode),
                "mz_eintritt": calc.getVariables(mode),
                "mz_austritt": calc.getVariables(mode),
                "mz_anderer": calc.getVariables(mode)
            }
        }, {
            "info": {
                "age_group": 6,
                "age_group_text": "Altersgruppe 65 – 69"
            },
            "edu_all": {
                "mz_alle": calc.getVariables(mode),
                "mz_eintritt": calc.getVariables(mode),
                "mz_austritt": calc.getVariables(mode),
                "mz_anderer": calc.getVariables(mode)
            },
            "edu_high": {
                "mz_alle": calc.getVariables(mode),
                "mz_eintritt": calc.getVariables(mode),
                "mz_austritt": calc.getVariables(mode),
                "mz_anderer": calc.getVariables(mode)
            },
            "edu_small": {
                "mz_alle": calc.getVariables(mode),
                "mz_eintritt": calc.getVariables(mode),
                "mz_austritt": calc.getVariables(mode),
                "mz_anderer": calc.getVariables(mode)
            }
        }, {
            "info": {
                "age_group": 7,
                "age_group_text": "Altersgruppe 70 – 74"
            },
            "edu_all": {
                "mz_alle": calc.getVariables(mode),
                "mz_eintritt": calc.getVariables(mode),
                "mz_austritt": calc.getVariables(mode),
                "mz_anderer": calc.getVariables(mode)
            },
            "edu_high": {
                "mz_alle": calc.getVariables(mode),
                "mz_eintritt": calc.getVariables(mode),
                "mz_austritt": calc.getVariables(mode),
                "mz_anderer": calc.getVariables(mode)
            },
            "edu_small": {
                "mz_alle": calc.getVariables(mode),
                "mz_eintritt": calc.getVariables(mode),
                "mz_austritt": calc.getVariables(mode),
                "mz_anderer": calc.getVariables(mode)
            }
        }, {
            "info": {
                "age_group": 8,
                "age_group_text": "Altersgruppe 75 – 79"
            },
            "edu_all": {
                "mz_alle": calc.getVariables(mode),
                "mz_eintritt": calc.getVariables(mode),
                "mz_austritt": calc.getVariables(mode),
                "mz_anderer": calc.getVariables(mode)
            },
            "edu_high": {
                "mz_alle": calc.getVariables(mode),
                "mz_eintritt": calc.getVariables(mode),
                "mz_austritt": calc.getVariables(mode),
                "mz_anderer": calc.getVariables(mode)
            },
            "edu_small": {
                "mz_alle": calc.getVariables(mode),
                "mz_eintritt": calc.getVariables(mode),
                "mz_austritt": calc.getVariables(mode),
                "mz_anderer": calc.getVariables(mode)
            }
        }, {
            "info": {
                "age_group": 9,
                "age_group_text": "Altersgruppe 80 – 84"
            },
            "edu_all": {
                "mz_alle": calc.getVariables(mode),
                "mz_eintritt": calc.getVariables(mode),
                "mz_austritt": calc.getVariables(mode),
                "mz_anderer": calc.getVariables(mode)
            },
            "edu_high": {
                "mz_alle": calc.getVariables(mode),
                "mz_eintritt": calc.getVariables(mode),
                "mz_austritt": calc.getVariables(mode),
                "mz_anderer": calc.getVariables(mode)
            },
            "edu_small": {
                "mz_alle": calc.getVariables(mode),
                "mz_eintritt": calc.getVariables(mode),
                "mz_austritt": calc.getVariables(mode),
                "mz_anderer": calc.getVariables(mode)
            }
        }, {
            "info": {
                "age_group": 10,
                "age_group_text": "Altersgruppe 85 – 89"
            },
            "edu_all": {
                "mz_alle": calc.getVariables(mode),
                "mz_eintritt": calc.getVariables(mode),
                "mz_austritt": calc.getVariables(mode),
                "mz_anderer": calc.getVariables(mode)
            },
            "edu_high": {
                "mz_alle": calc.getVariables(mode),
                "mz_eintritt": calc.getVariables(mode),
                "mz_austritt": calc.getVariables(mode),
                "mz_anderer": calc.getVariables(mode)
            },
            "edu_small": {
                "mz_alle": calc.getVariables(mode),
                "mz_eintritt": calc.getVariables(mode),
                "mz_austritt": calc.getVariables(mode),
                "mz_anderer": calc.getVariables(mode)
            }
        }];


        // Return
        return age_edu_groups;
    };


    calc.getStatistics = function(data_array) {

        // Interessante Berechnungen | Statistics
        var s = {};

        if (calc.isArray(data_array)) {
            s.n = data_array.legth;
            s.min = calc.min(data_array);
            s.max = calc.max(data_array);
            s.mean = calc.mean(data_array);
            s.variance = calc.variance(data_array);
            s.standard_deviation = calc.standard_deviation(data_array);
            s.z_score_min = calc.z_score(s.min, s.mean, s.standard_deviation);
            s.z_score_max = calc.z_score(s.max, s.mean, s.standard_deviation);
        };

        // Return
        return s;
    };



    calc.concatAllArraysInObject = function(objectFull, objectToConcat) {


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
            var ss_current_property = 'ss_' + current_property;
            var ArrayFromObjectToConcat = objectToConcat[current_property];
            var isThisArray = calc.isArray(ArrayFromObjectToConcat);

            if (isThisArray) {
                // Array found Concat!
                objectFull[current_property] = objectFull[current_property].concat(ArrayFromObjectToConcat);

                // Do Statistics!
                if (current_property === 'TMTATime') {
                    objectFull.ss_TMTATime = calc.getStatistics(objectFull[current_property]);
                };

                // set n;
                objectFull.n = objectFull[current_property].length;
            };
        };


        // Return
        return objectFull;
    };

    calc.isPIDinGroup = function(patients_array, search_pid) {

        var isPIDinGroup = false;

        for (var id = 0; id < patients_array.length; id++) {
            var current_patient = patients_array[id];

            if (current_patient.id === search_pid) {
                isPIDinGroup = true;
            };
        };

        return isPIDinGroup;
    };

    calc.setAgeEduStatistics = function(age_edu_scores) {

        // Calculate Statistics for all | Age & Edu Groups

        // Data Model
        var statistics_age_edu_groups = calc.getAgeEduGroup('empty');

        // Propertys from Data Model
        var edu_props = ['edu_all', 'edu_high', 'edu_small'];
        var mz_props = ['mz_eintritt', 'mz_austritt', 'mz_anderer', 'mz_alle'];

        // Create 'all propertys array'
        var allFullPropertys = [];
        var objectFull = calc.getVariables('variables');
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

                        // ziel_mz.n = quelle_mz.n;

                        // Loop "allFullPropertys" and check if objectToConcat has them: if yes: Concat.
                        for (var x = 0; x < allFullPropertys.length; x++) {
                            var current_property = allFullPropertys[x];

                            var dataArray = quelle_mz[current_property];

                            if (calc.isArray(dataArray)) {

                                // Do Statistics
                                ziel_mz.statistics = 73;

                            };
                        };

                        //Writing back?
                        //quelle_edu[mz_prop] = ziel;

                    } else {
                        ziel_mz.n = 0;
                    };

                    //ziel_edu[mz_prop] = ziel_mz;

                };
            };


            //Writing back?
            statistics_age_edu_groups[group_id] = ziel;
        };

        return statistics_age_edu_groups;
    };

    calc.getPatientScores = function(d) {

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
                "mz_alle_vars": calc.getVariables(),
                "mz_eintritt_vars": calc.getVariables(),
                "mz_austritt_vars": calc.getVariables(),
                "mz_anderer_vars": calc.getVariables(),
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

    calc.arrangePatientScoresAgeEdu = function(patient_scores) {

        // Get all TMT-Patient-Scores and arrange it in a Array | Age & Edu

        // Data Model
        var age_edu_groups = calc.getAgeEduGroup('variables');


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

                // Concat | all Variables...
                safe_here.mz_eintritt = calc.concatAllArraysInObject(safe_here.mz_eintritt, current_result.mz_eintritt_vars);
                safe_here.mz_austritt = calc.concatAllArraysInObject(safe_here.mz_austritt, current_result.mz_austritt_vars);
                safe_here.mz_anderer = calc.concatAllArraysInObject(safe_here.mz_anderer, current_result.mz_anderer_vars);
                safe_here.mz_alle = calc.concatAllArraysInObject(safe_here.mz_alle, current_result.mz_alle_vars);

                // ...also in 'edu_all'
                edu_id = 'edu_all';
                safe_here = age_edu_groups[age_group][edu_id];
                safe_here.mz_eintritt = calc.concatAllArraysInObject(safe_here.mz_eintritt, current_result.mz_eintritt_vars);
                safe_here.mz_austritt = calc.concatAllArraysInObject(safe_here.mz_austritt, current_result.mz_austritt_vars);
                safe_here.mz_anderer = calc.concatAllArraysInObject(safe_here.mz_anderer, current_result.mz_anderer_vars);
                safe_here.mz_alle = calc.concatAllArraysInObject(safe_here.mz_alle, current_result.mz_alle_vars);

            };
        };


        return age_edu_groups;
    };


    // ------------------------------------------
    // F U N C T I O N  -  Main
    // ------------------------------------------


    // Do the needed 'calculations'
    var patient_scores = calc.getPatientScores(responses);
    var age_edu_obj = calc.getAgeEduObj();
    var age_edu_scores = calc.arrangePatientScoresAgeEdu(patient_scores);
    var age_edu_statistics = calc.setAgeEduStatistics(age_edu_scores);


    // Returning | Results in returnObj.
    calc.age_edu_obj = age_edu_obj;
    calc.patient_scores = patient_scores;
    calc.age_edu_scores = age_edu_scores;
    calc.age_edu_statistics = age_edu_statistics;


    // Returning full (complete) responses is often used/helpful.
    calc.full = responses;


    // Return
    return calc;
}
