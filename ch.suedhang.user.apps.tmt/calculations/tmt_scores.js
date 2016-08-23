function main(responses) {

    var calc = {};


include(../lib/js/optinomic/statistics/calculation_simplestatistics.js)


    // ------------------------------------------
    // H e l p e r   -   F U N C T I O N S
    // ------------------------------------------


    calc.getVariables = function(num) {
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
            "n": 0,
            "statistics": {}
        };

        // Clone Obj. and Return
        return JSON.parse(JSON.stringify(variables));
    };


    calc.getStatistics = function(ss_array) {
        
        // Interessante Berechnungen
        var statistics = {};

        if (calc.isArray(ss_array)) {
			statistics.n = ss_array.legth,
			statistics.min = calc.min(ss_array)
		};

        // Return
        return statistics;
    };



    calc.concatAllArraysInObject = function(objectFull, objectToConcat) {

        // Create 'all propertys array'
        var allFullPropertys = [];

        var isArray = function(obj) {
            return (typeof obj !== 'undefined' &&
                obj && obj.constructor === Array);
        };

        for (var property in objectFull) {
            if (objectFull.hasOwnProperty(property)) {
                allFullPropertys.push(property);
            }
        }

        // Loop "allFullPropertys" and check if objectToConcat has them: if yes: Concat.
        for (var x = 0; x < allFullPropertys.length; x++) {
            var current_property = allFullPropertys[x];

            var ArrayFromObjectToConcat = objectToConcat[current_property];
            var isThisArray = calc.isArray(ArrayFromObjectToConcat);

            if (isThisArray) {
                // Array found Concat!
                objectFull[current_property] = objectFull[current_property].concat(ArrayFromObjectToConcat);

                // Do Statistics!
                objectFull.statistics[current_property] = calc.getStatistics(objectFull[current_property]);

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
        var age_edu_groups = [{
            "info": {
                "age_group": 0,
                "age_group_text": "Altersgruppe 18 - 24"
            },
            "edu_all": {
                "mz_alle": calc.getVariables(),
                "mz_eintritt": calc.getVariables(),
                "mz_austritt": calc.getVariables(),
                "mz_anderer": calc.getVariables()
            },
            "edu_high": {
                "mz_alle": calc.getVariables(),
                "mz_eintritt": calc.getVariables(),
                "mz_austritt": calc.getVariables(),
                "mz_anderer": calc.getVariables()
            },
            "edu_small": {
                "mz_alle": calc.getVariables(),
                "mz_eintritt": calc.getVariables(),
                "mz_austritt": calc.getVariables(),
                "mz_anderer": calc.getVariables()
            }
        }, {
            "info": {
                "age_group": 1,
                "age_group_text": "Altersgruppe 25 – 34"
            },
            "edu_all": {
                "mz_alle": calc.getVariables(),
                "mz_eintritt": calc.getVariables(),
                "mz_austritt": calc.getVariables(),
                "mz_anderer": calc.getVariables()
            },
            "edu_high": {
                "mz_alle": calc.getVariables(),
                "mz_eintritt": calc.getVariables(),
                "mz_austritt": calc.getVariables(),
                "mz_anderer": calc.getVariables()
            },
            "edu_small": {
                "mz_alle": calc.getVariables(),
                "mz_eintritt": calc.getVariables(),
                "mz_austritt": calc.getVariables(),
                "mz_anderer": calc.getVariables()
            }
        }, {
            "info": {
                "age_group": 2,
                "age_group_text": "Altersgruppe 35 – 44"
            },
            "edu_all": {
                "mz_alle": calc.getVariables(),
                "mz_eintritt": calc.getVariables(),
                "mz_austritt": calc.getVariables(),
                "mz_anderer": calc.getVariables()
            },
            "edu_high": {
                "mz_alle": calc.getVariables(),
                "mz_eintritt": calc.getVariables(),
                "mz_austritt": calc.getVariables(),
                "mz_anderer": calc.getVariables()
            },
            "edu_small": {
                "mz_alle": calc.getVariables(),
                "mz_eintritt": calc.getVariables(),
                "mz_austritt": calc.getVariables(),
                "mz_anderer": calc.getVariables()
            }
        }, {
            "info": {
                "age_group": 3,
                "age_group_text": "Altersgruppe 45 – 54"
            },
            "edu_all": {
                "mz_alle": calc.getVariables(),
                "mz_eintritt": calc.getVariables(),
                "mz_austritt": calc.getVariables(),
                "mz_anderer": calc.getVariables()
            },
            "edu_high": {
                "mz_alle": calc.getVariables(),
                "mz_eintritt": calc.getVariables(),
                "mz_austritt": calc.getVariables(),
                "mz_anderer": calc.getVariables()
            },
            "edu_small": {
                "mz_alle": calc.getVariables(),
                "mz_eintritt": calc.getVariables(),
                "mz_austritt": calc.getVariables(),
                "mz_anderer": calc.getVariables()
            }
        }, {
            "info": {
                "age_group": 4,
                "age_group_text": "Altersgruppe 55 – 59"
            },
            "edu_all": {
                "mz_alle": calc.getVariables(),
                "mz_eintritt": calc.getVariables(),
                "mz_austritt": calc.getVariables(),
                "mz_anderer": calc.getVariables()
            },
            "edu_high": {
                "mz_alle": calc.getVariables(),
                "mz_eintritt": calc.getVariables(),
                "mz_austritt": calc.getVariables(),
                "mz_anderer": calc.getVariables()
            },
            "edu_small": {
                "mz_alle": calc.getVariables(),
                "mz_eintritt": calc.getVariables(),
                "mz_austritt": calc.getVariables(),
                "mz_anderer": calc.getVariables()
            }
        }, {
            "info": {
                "age_group": 5,
                "age_group_text": "Altersgruppe 60 – 64"
            },
            "edu_all": {
                "mz_alle": calc.getVariables(),
                "mz_eintritt": calc.getVariables(),
                "mz_austritt": calc.getVariables(),
                "mz_anderer": calc.getVariables()
            },
            "edu_high": {
                "mz_alle": calc.getVariables(),
                "mz_eintritt": calc.getVariables(),
                "mz_austritt": calc.getVariables(),
                "mz_anderer": calc.getVariables()
            },
            "edu_small": {
                "mz_alle": calc.getVariables(),
                "mz_eintritt": calc.getVariables(),
                "mz_austritt": calc.getVariables(),
                "mz_anderer": calc.getVariables()
            }
        }, {
            "info": {
                "age_group": 6,
                "age_group_text": "Altersgruppe 65 – 69"
            },
            "edu_all": {
                "mz_alle": calc.getVariables(),
                "mz_eintritt": calc.getVariables(),
                "mz_austritt": calc.getVariables(),
                "mz_anderer": calc.getVariables()
            },
            "edu_high": {
                "mz_alle": calc.getVariables(),
                "mz_eintritt": calc.getVariables(),
                "mz_austritt": calc.getVariables(),
                "mz_anderer": calc.getVariables()
            },
            "edu_small": {
                "mz_alle": calc.getVariables(),
                "mz_eintritt": calc.getVariables(),
                "mz_austritt": calc.getVariables(),
                "mz_anderer": calc.getVariables()
            }
        }, {
            "info": {
                "age_group": 7,
                "age_group_text": "Altersgruppe 70 – 74"
            },
            "edu_all": {
                "mz_alle": calc.getVariables(),
                "mz_eintritt": calc.getVariables(),
                "mz_austritt": calc.getVariables(),
                "mz_anderer": calc.getVariables()
            },
            "edu_high": {
                "mz_alle": calc.getVariables(),
                "mz_eintritt": calc.getVariables(),
                "mz_austritt": calc.getVariables(),
                "mz_anderer": calc.getVariables()
            },
            "edu_small": {
                "mz_alle": calc.getVariables(),
                "mz_eintritt": calc.getVariables(),
                "mz_austritt": calc.getVariables(),
                "mz_anderer": calc.getVariables()
            }
        }, {
            "info": {
                "age_group": 8,
                "age_group_text": "Altersgruppe 75 – 79"
            },
            "edu_all": {
                "mz_alle": calc.getVariables(),
                "mz_eintritt": calc.getVariables(),
                "mz_austritt": calc.getVariables(),
                "mz_anderer": calc.getVariables()
            },
            "edu_high": {
                "mz_alle": calc.getVariables(),
                "mz_eintritt": calc.getVariables(),
                "mz_austritt": calc.getVariables(),
                "mz_anderer": calc.getVariables()
            },
            "edu_small": {
                "mz_alle": calc.getVariables(),
                "mz_eintritt": calc.getVariables(),
                "mz_austritt": calc.getVariables(),
                "mz_anderer": calc.getVariables()
            }
        }, {
            "info": {
                "age_group": 9,
                "age_group_text": "Altersgruppe 80 – 84"
            },
            "edu_all": {
                "mz_alle": calc.getVariables(),
                "mz_eintritt": calc.getVariables(),
                "mz_austritt": calc.getVariables(),
                "mz_anderer": calc.getVariables()
            },
            "edu_high": {
                "mz_alle": calc.getVariables(),
                "mz_eintritt": calc.getVariables(),
                "mz_austritt": calc.getVariables(),
                "mz_anderer": calc.getVariables()
            },
            "edu_small": {
                "mz_alle": calc.getVariables(),
                "mz_eintritt": calc.getVariables(),
                "mz_austritt": calc.getVariables(),
                "mz_anderer": calc.getVariables()
            }
        }, {
            "info": {
                "age_group": 10,
                "age_group_text": "Altersgruppe 85 – 89"
            },
            "edu_all": {
                "mz_alle": calc.getVariables(),
                "mz_eintritt": calc.getVariables(),
                "mz_austritt": calc.getVariables(),
                "mz_anderer": calc.getVariables()
            },
            "edu_high": {
                "mz_alle": calc.getVariables(),
                "mz_eintritt": calc.getVariables(),
                "mz_austritt": calc.getVariables(),
                "mz_anderer": calc.getVariables()
            },
            "edu_small": {
                "mz_alle": calc.getVariables(),
                "mz_eintritt": calc.getVariables(),
                "mz_austritt": calc.getVariables(),
                "mz_anderer": calc.getVariables()
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

    calc.getResults = function(d) {
        // Calculate stuff first.

        // var patient_scores = [];
        var patient_scores = calc.getPatientScores(d);
        var age_edu_scores = calc.arrangePatientScoresAgeEdu(patient_scores);

        // Build & add stuff to returnObj.
        var returnObj = {};
        returnObj.patient_scores = patient_scores;
        returnObj.age_edu_scores = age_edu_scores;


        returnObj.full = d;

        // Return
        return returnObj;
    };


    // Return
    return calc.getResults(responses);
}
