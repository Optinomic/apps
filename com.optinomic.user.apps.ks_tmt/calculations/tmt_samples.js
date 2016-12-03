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
    // Calculation-Init   -   F U N C T I O N S
    // ------------------------------------------

    calc.getMultiDimensionalContainer = function(pg) {

        // Note:  md = Multi Dimensional
        // Change this for your current App

        var return_obj = {};

        // Do we want also to use Optinomic Patient-Groups?
        var want_patient_groups = true;
        //  ==> Find a way to find all patients from group

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

            // Add 'data' to patient_groups
            var patient_groups = calc.cloneObj(pg);
            for (var pg_id = 0; pg_id < patient_groups.length; pg_id++) {
                var currend_patient_group = patient_groups[pg_id];

                currend_patient_group.data = calc.getVariables();
            };


            var pg_info = {
                "id": 3,
                "text": "Patientengruppen",
                "all_available": false, //is last entry a all groups?
                "result": false, //is this where the result types are?
                "generic": true, //is this something generic?
                "n": patient_groups.length,
                "array": patient_groups
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


        // Create Multidimensional (md) Array
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


    calc.getPatientScores = function(d) {

        // Get all TMT-Scores from a Patient and arrange it in a Array
        // Change this for your current App

        var all_scores = [];

        for (var i = 0; i < d.length; i++) {
            var current_result = d[i];





            var all_responses = current_result.other_calculations['ch.suedhang.apps.tmt_V3:tmt_score']

            for (var x = 0; x < all_responses.length; x++) {

                // Scores Obj. erstellen.
                var scores = {
                    "info": {},
                    "score": calc.getVariables()
                };


                var current_response = all_responses[x];

                // Set Groups & Some generic Vars
                var age_group_array_id = current_response.percentile.age_perz.altersgruppe;
                var edu_group_level = current_response.percentile.age_perz.education_high;
                if (edu_group_level === true) {
                    var edu_group_array_id = 1;
                } else {
                    var edu_group_array_id = 0;
                };
                var mz_group_array_id = current_response.mz - 1;

                var filled = current_response.response.data.filled;
                var event_id = current_response.response.data.event_id;
                var pid = current_result.patient.id;


                // Write Groups
                scores.info.group_age_array_id = age_group_array_id;
                scores.info.group_edu_array_id = edu_group_array_id;
                scores.info.group_mz_array_id = mz_group_array_id;

                // Write General Stuff
                scores.info.response = current_response;
                scores.info.filled = filled;
                scores.info.event_id = event_id;
                scores.info.pid = pid;


                // Match 'Variables' to 'Calculation - Response'
                scores.score.TMTAError = current_response.TMTAError;
                scores.score.TMTATime = current_response.TMTATime;
                scores.score.TMTBError = current_response.TMTBError;
                scores.score.TMTBTime = current_response.TMTBTime;
                scores.score.Perz_A = current_response.percentile.result.A;
                scores.score.Perz_B = current_response.percentile.result.B;
                scores.score.BA_Quotient = current_response.quotient;
                scores.score.TMTAZ = current_response.percentile.z_scores.tmtA_z;
                scores.score.TMTBZ = current_response.percentile.z_scores.tmtB_z;


                // Push only if Data available
                // Check if we have response - check whaterver you like.
                if (current_response.edu_years !== null) {
                    all_scores.push(scores);
                };
            };

        };

        return all_scores;
    };


    calc.mdFillPatientScores = function(md, ps) {

        var md_obj = calc.cloneObj(md);
        var md_array = md_obj.array;
        var md_globals = md_obj.globals;
        var md_info = md_obj.info;
        var patient_scores = calc.cloneObj(ps);


        for (var x = 0; x < patient_scores.length; x++) {
            var current_patient_score = patient_scores[x];

            // Read given ArrayPositions | Infos
            var md_pos_1_id = current_patient_score.info.group_age_array_id;
            var md_pos_2_id = current_patient_score.info.group_edu_array_id;
            var md_pos_3_id = current_patient_score.info.group_mz_array_id;

            // Test Write
            md_array[4][0].function = 'mdFillPatientScores';


            // JS - Error:

            // 'Connect' not generic md array positions
            // var md_pos_1_info = md_info[md_pos_1_id];
            // var md_pos_2_info = md_info[md_pos_3_id];
            // var md_pos_3_info = md_info[md_pos_4_id];

            // Check ArrayPositions Infos what to do.


        };

        return md_obj;

    };

    // ------------------------------------------
    // H e l p e r   -   F U N C T I O N S
    // ------------------------------------------

    calc.cloneObj = function(my_obj) {
        // Clone Obj. and Return
        return JSON.parse(JSON.stringify(my_obj));
    };

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
        var patient_groups = d.patient_groups;
        var md = calc.getMultiDimensionalContainer(patient_groups);
        var patient_scores = calc.getPatientScores(d.patients);
        var md_scores = calc.mdFillPatientScores(md, patient_scores);


        // Returning | Results in Obj.

        results.md = md;
        results.patient_groups = patient_groups;
        results.patient_scores = patient_scores;
        results.md_scores = md_scores;



        // Returning full (complete) responses is often used/helpful.
        results.full = responses;

        return results;
    };


    // Return
    return calc.getResults(responses);
}
