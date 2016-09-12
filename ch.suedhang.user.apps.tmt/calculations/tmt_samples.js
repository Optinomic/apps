function main(responses) {

    var calc = {};


    // ------------------------------------------
    // Definitions
    // ------------------------------------------

    calc.variables = {
        "TMTAError": [],
        "TMTATime": [],
        "TMTBError": [],
        "TMTBTime": [],
        "Perz_A": [],
        "Perz_B": [],
        "BA_Quotient": [],
        "TMTAZ": [],
        "TMTBZ": []
    };



    // ------------------------------------------
    // What 'Groups' do we have?
    // ------------------------------------------

    calc.group_age_props = [{
        "id": 0,
        "text": "Altersgruppe 18 - 24"
    }, {
        "id": 1,
        "text": "Altersgruppe 25 – 34"
    }, {
        "id": 2,
        "text": "Altersgruppe 35 – 44"
    }, {
        "id": 3,
        "text": "Altersgruppe 45 – 54"
    }, {
        "id": 4,
        "text": "Altersgruppe 55 – 59"
    }, {
        "id": 5,
        "text": "Altersgruppe 60 – 64"
    }, {
        "id": 6,
        "text": "Altersgruppe 65 – 69"
    }, {
        "id": 7,
        "text": "Altersgruppe 70 – 74"
    }, {
        "id": 8,
        "text": "Altersgruppe 75 – 79"
    }, {
        "id": 9,
        "text": "Altersgruppe 80 – 84"
    }, {
        "id": 10,
        "text": "Altersgruppe 85 – 89"
    }];


    calc.group_edu_props = [{
        "id": 0,
        "text": "Ausbildung: <= 12 Jahre"
    }, {
        "id": 1,
        "text": "Ausbildung: > 12 Jahre"
    }, {
        "id": 99,
        "text": "Ausbildung: Alle Levels"
    }];


    calc.group_mz_props = [{
        "id": 0,
        "text": "Messzeitpunkt: Eintritt",
        "survey_id": 1
    }, {
        "id": 1,
        "text": "Messzeitpunkt: Austritt",
        "survey_id": 2
    }, {
        "id": 2,
        "text": "Messzeitpunkt: Anderer",
        "survey_id": 3
    }, {
        "id": 3,
        "text": "Alle Messzeitpunkte",
        "survey_id": null
    }];






    // ------------------------------------------
    // Calculation   -   F U N C T I O N S
    // ------------------------------------------

    calc.getMultiDimensionalContainer = function(patient_groups) {

        var return_obj = {};

        // Do we want also to use Optinomic Patient-Groups?
        var want_patient_groups = true;

        // How do the 'Result' looks like?
        var result_types = [{
            "id": 0,
            "text": "Scores",
            "data": calc.getVariables()
        }, {
            "id": 1,
            "text": "Statistics",
            "data": calc.getVariables()
        }];



        // Description - Multidimensional Array
        var md_info = [{
            "id": 0,
            "text": "Altersgruppe",
            "all_available": false, //is last entry a all groups?
            "result": false, //is this where the result types are?
            "generic": false, //is this something generic?
            "n": calc.group_age_props.length,
            "array": calc.cloneObj(calc.group_age_props)
        }, {
            "id": 1,
            "text": "Ausbildungsniveau",
            "all_available": true, //is last entry a all groups?
            "result": false, //is this where the result types are?
            "generic": false, //is this something generic?
            "n": calc.group_edu_props.length,
            "array": calc.cloneObj(calc.group_edu_props)
        }, {
            "id": 2,
            "text": "Messzeitpunkt",
            "all_available": true, //is last entry a all groups?
            "result": false, //is this where the result types are?
            "generic": false, //is this something generic?
            "n": calc.group_mz_props.length,
            "array": calc.cloneObj(calc.group_mz_props)
        }];



        // Should not to be modified below:

        if (want_patient_groups) {
            var pg_info = {
                "id": 3,
                "text": "Patientengruppen",
                "all_available": false, //is last entry a all groups?
                "result": false, //is this where the result types are?
                "generic": true, //is this something generic?
                "n": patient_groups.length,
                "array": calc.cloneObj(patient_groups)
            };
            md_info.push(pg_info);
        };

        var result_array_id = 3
        var result_types_info = {
            "id": result_array_id,
            "text": "Ergebnis-Typen",
            "all_available": false, //is last entry a all groups?
            "result": true, //is this where the result types are?
            "generic": true, //is this something generic?
            "n": result_types.length,
            "array": calc.cloneObj(result_types)
        };
        if (want_patient_groups) {
            result_types_info.id = 4;
            result_array_id = 4;
        };
        md_info.push(result_types_info);


        // Create Multidimensional Array
        var md_array = [];
        for (var i = 0; i < md_info.length; i++) {
            var currend_prop = md_info[i];
            md_array.push(calc.cloneObj(currend_prop.array));
        };

        // Write to return_obj
        return_obj.globals = {
            "result_types_id": result_array_id
        };
        return_obj.info = md_info;
        return_obj.array = md_array;


        return return_obj;
    };


    calc.getPatientScores = function(d, md) {

        // Get all TMT-Scores from a Patient and arrange it in a Array
        // 
        var all_scores = [];

        for (var i = 0; i < d.length; i++) {
            var current_result = d[i];


            // Create Multidimensional Array
            var md_array = [];
            for (var i = 0; i < md.info.length; i++) {
                var currend_prop = md.info[i];
                md_array.push([]);
            };


            // Scores Obj. erstellen.
            var scores = {
                "patient_details": {
                    "edu_years": null,
                    "age_edu_group": {},
                    "age": null,
                    "pid": current_result.patient.id
                },
                "md": md_array,
                "mz_01_vars": calc.getVariables(),
                "mz_02_vars": calc.getVariables(),
                "mz_03_vars": calc.getVariables(),
                "mz_99_vars": calc.getVariables()
            };



            var all_responses = current_result.other_calculations['ch.suedhang.apps.tmt_V3:tmt_score']

            var data_here = false;

            for (var x = 0; x < all_responses.length; x++) {
                var current_response = all_responses[x];

                var TMTAError = current_response.TMTAError;
                var TMTATime = current_response.TMTATime;
                var TMTBError = current_response.TMTBError;
                var TMTBTime = current_response.TMTBTime;
                var Perz_A = current_response.percentile.result.A;
                var Perz_B = current_response.percentile.result.B;
                var BA_Quotient = current_response.quotient;
                var Z_A = current_response.percentile.z_scores.tmtA_z;
                var Z_B = current_response.percentile.z_scores.tmtB_z;

                scores.patient_details.edu_years = current_response.edu_years;
                scores.patient_details.age_edu_group = current_response.percentile.age_perz;
                scores.patient_details.age = current_response.set_age;

                var filled = current_response.response.data.filled;
                var event_id = current_response.response.data.event_id;
                var pid = current_result.patient.id;

                var messzeitpunkt = current_response.mz;


                if (current_response.edu_years !== null) {
                    data_here = true;
                };



                // Interessante Variablen & Details Obj. speichern.
                scores.mz_99_vars.TMTAError.push(TMTAError);
                scores.mz_99_vars.TMTATime.push(TMTATime);
                scores.mz_99_vars.TMTBError.push(TMTBError);
                scores.mz_99_vars.TMTBTime.push(TMTBTime);
                scores.mz_99_vars.Perz_A.push(Perz_A);
                scores.mz_99_vars.Perz_B.push(Perz_B);
                scores.mz_99_vars.BA_Quotient.push(BA_Quotient);
                scores.mz_99_vars.TMTAZ.push(Z_A);
                scores.mz_99_vars.TMTBZ.push(Z_B);
                scores.mz_99_vars.n = scores.mz_99_vars.BA_Quotient.length;


                if (messzeitpunkt === 1) {
                    // Eintritt
                    scores.mz_01_vars.TMTAError.push(TMTAError);
                    scores.mz_01_vars.TMTATime.push(TMTATime);
                    scores.mz_01_vars.TMTBError.push(TMTBError);
                    scores.mz_01_vars.TMTBTime.push(TMTBTime);
                    scores.mz_01_vars.Perz_A.push(Perz_A);
                    scores.mz_01_vars.Perz_B.push(Perz_B);
                    scores.mz_01_vars.BA_Quotient.push(BA_Quotient);
                    scores.mz_01_vars.TMTAZ.push(Z_A);
                    scores.mz_01_vars.TMTBZ.push(Z_B);
                    scores.mz_01_vars.n = scores.mz_01_vars.BA_Quotient.length;
                };


                if (messzeitpunkt === 2) {
                    // Austritt
                    scores.mz_02_vars.TMTAError.push(TMTAError);
                    scores.mz_02_vars.TMTATime.push(TMTATime);
                    scores.mz_02_vars.TMTBError.push(TMTBError);
                    scores.mz_02_vars.TMTBTime.push(TMTBTime);
                    scores.mz_02_vars.Perz_A.push(Perz_A);
                    scores.mz_02_vars.Perz_B.push(Perz_B);
                    scores.mz_02_vars.BA_Quotient.push(BA_Quotient);
                    scores.mz_02_vars.TMTAZ.push(Z_A);
                    scores.mz_02_vars.TMTBZ.push(Z_B);
                    scores.mz_02_vars.n = scores.mz_02_vars.BA_Quotient.length;
                };


                if ((messzeitpunkt !== 1) && (messzeitpunkt !== 2)) {
                    // Anderer
                    scores.mz_03_vars.TMTAError.push(TMTAError);
                    scores.mz_03_vars.TMTATime.push(TMTATime);
                    scores.mz_03_vars.TMTBError.push(TMTBError);
                    scores.mz_03_vars.TMTBTime.push(TMTBTime);
                    scores.mz_03_vars.Perz_A.push(Perz_A);
                    scores.mz_03_vars.Perz_B.push(Perz_B);
                    scores.mz_03_vars.BA_Quotient.push(BA_Quotient);
                    scores.mz_03_vars.TMTAZ.push(Z_A);
                    scores.mz_03_vars.TMTBZ.push(Z_B);
                    scores.mz_03_vars.n = scores.mz_03_vars.BA_Quotient.length;
                };
            };

            // Push only if Data available
            if (data_here) {
                all_scores.push(scores);
            };

        };

        return all_scores;
    };


    // ------------------------------------------
    // H e l p e r   -   F U N C T I O N S
    // ------------------------------------------

    calc.cloneObj = function(my_obj) {
        // Clone Obj. and Return
        return JSON.parse(JSON.stringify(my_obj));
    };



    // ------------------------------------------
    // NOT IN USE   -   F U N C T I O N S
    // ------------------------------------------

    calc.getVariables = function() {
        // Clone Obj. and Return
        return calc.cloneObj(calc.variables);
    };

    // ------------------------------------------
    //  calculation_simplestatistics.js
    //  S T A T I S T I C S   &   Helpers
    // ------------------------------------------



    // ------------------------------------------
    // F U N C T I O N  -  Main
    // ------------------------------------------
    calc.getResults = function(d) {

        var results = {};


        // Do the needed 'calculations'
        var patient_groups = d[0].patient_groups;
        var md = calc.getMultiDimensionalContainer(patient_groups);
        var patient_scores = calc.getPatientScores(d, md);

        // var age_edu_mz_obj = calc.getAgeEduObj();
        // var age_edu_mz_obj_prop_array = calc.getPropertyArrayFromOject(age_edu_mz_obj);
        // var patient_scores = calc.getPatientScores(d);
        // var age_edu_obj_scores = calc.getAgeEduObjScores(age_edu_mz_obj, patient_scores);
        // var age_edu_obj_statistics = calc.getAgeEduObjStatistics(age_edu_obj_scores, age_edu_mz_obj_prop_array);


        // Returning | Results in Obj.


        results.md = md;
        results.patient_scores = patient_scores;
        // results.patient_groups = patient_groups;
        // results.age_edu_obj = age_edu_mz_obj;
        // results.age_edu_obj_scores = age_edu_obj_scores;
        // results.age_edu_mz_obj = age_edu_obj_statistics;



        // Returning full (complete) responses is often used/helpful.
        results.full = responses;

        return results;
    };


    // Return
    return calc.getResults(responses);
}
