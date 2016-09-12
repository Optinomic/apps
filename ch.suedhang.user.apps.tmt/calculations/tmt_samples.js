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
    // H e l p e r   -   F U N C T I O N S
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
            "all_available": true, //is last entry a all groups?
            "result": false, //is this where the result types are?
            "n": calc.group_age_props.length,
            "array": calc.cloneObj(calc.group_age_props)
        }, {
            "id": 1,
            "text": "Ausbildungsniveau",
            "all_available": true, //is last entry a all groups?
            "result": false, //is this where the result types are?
            "n": calc.group_edu_props.length,
            "array": calc.cloneObj(calc.group_edu_props)
        }, {
            "id": 2,
            "text": "Messzeitpunkt",
            "all_available": true, //is last entry a all groups?
            "result": false, //is this where the result types are?
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

        // var age_edu_mz_obj = calc.getAgeEduObj();
        // var age_edu_mz_obj_prop_array = calc.getPropertyArrayFromOject(age_edu_mz_obj);
        // var patient_scores = calc.getPatientScores(d);
        // var age_edu_obj_scores = calc.getAgeEduObjScores(age_edu_mz_obj, patient_scores);
        // var age_edu_obj_statistics = calc.getAgeEduObjStatistics(age_edu_obj_scores, age_edu_mz_obj_prop_array);


        // Returning | Results in Obj.


        results.md = md;
        // results.patient_groups = patient_groups;
        // results.age_edu_obj = age_edu_mz_obj;
        // results.patient_scores = patient_scores;
        // results.age_edu_obj_scores = age_edu_obj_scores;
        // results.age_edu_mz_obj = age_edu_obj_statistics;



        // Returning full (complete) responses is often used/helpful.
        // results.full = responses;

        return results;
    };


    // Return
    return calc.getResults(responses);
}
