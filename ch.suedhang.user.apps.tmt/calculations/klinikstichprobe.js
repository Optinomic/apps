function main(responses) {

    var calc = {};


    // ------------------------------------------
    // Definitions:
    // Interessting Vars of current App
    // ------------------------------------------

    calc.variables = {
        "TMTAError": [],
        "TMTATime": [],
        "TMTBError": [],
        "TMTBTime": [],
        "BA_Quotient": [],
        "TMTAZ": [],
        "TMTBZ": []
    };


    // ------------------------------------------
    // Info: com.optinomic.user.apps.klinikstichproben
    // What User App needs to know
    // ------------------------------------------

    calc.info = {
        "patient_app_id": "ch.suedhang.apps.tmt_V3",
        "patient_app_calculation": "tmt_score"
    };


    // ------------------------------------------
    // Arrange Results in Given Definitions
    // ------------------------------------------

    calc.arrangeScoresInVars = function(current_vars, current_source) {

        // Vorhandene Ergebnisse in calc.variables einpflegen.

        current_vars.BA_Quotient = current_source.quotient;
        current_vars.TMTAError = current_source.TMTAError;
        current_vars.TMTATime = current_source.TMTATime;
        current_vars.TMTBError = current_source.TMTBError;
        current_vars.TMTBTime = current_source.TMTBTime;
        current_vars.TMTAZ = current_source.percentile.z_scores.tmtA_z;
        current_vars.TMTBZ = current_source.percentile.z_scores.tmtB_z;

        return current_vars;
    };



    // ------------------------------------------
    // GENERIC -  should not be touched:
    // ------------------------------------------

    calc.getScoresInVars = function(p, vars, info) {

        var return_array = [];

        var vars_array = calc.getPropArray(vars);

        for (var pIndex = 0; pIndex < p.length; pIndex++) {

            var current_patient = p[pIndex];
            var source = current_patient.other_calculations[info.other_calculation];

            if (source.length) {

                var current_vars = calc.cloneObj(vars);


                var return_obj = {
                    "patient": current_patient.patient,
                    "scores": []
                };


                for (var sIndex = 0; sIndex < source.length; sIndex++) {

                    var current_source = source[sIndex];

                    var currect_vars = calc.arrangeScoresInVars(current_vars, current_source);


                    return_obj.scores.push(currect_vars);
                };




                return_array.push(return_obj);
            };
        };

        return return_array;
    };


    // ------------------------------------------
    // Helpers
    // ------------------------------------------

    calc.cloneObj = function(my_obj) {
        // Clone Obj. and Return
        return JSON.parse(JSON.stringify(my_obj));
    };


    calc.getPropArray = function(my_obj) {

        // Create 'all propertys array' from Object
        var propArray = [];

        for (var property in objectFull) {
            if (objectFull.hasOwnProperty(property)) {
                propArray.push(property);
            }
        }

        return propArray;
    };


    // ------------------------------------------
    // F U N C T I O N  -  Main
    // ------------------------------------------
    calc.getResults = function(d) {

        var results = {};
        var vars = calc.cloneObj(calc.variables);
        var vars_array = calc.getPropArray(vars);
        var info = calc.cloneObj(calc.info);
        info.other_calculation = info.patient_app_id + ':' + info.patient_app_calculation;

        // Arrange Stuff as 'variables'
        var patient_scores = calc.getScoresInVars(d.patients, vars, info);


        // Return Stuff
        results.patient_scores = patient_scores;

        results.info = info;
        results.variables = vars;
        results.vars_array = vars_array;

        // Returning full (complete) responses is often used/helpful.
        results.full = d;

        return results;
    };


    // Return
    return calc.getResults(responses);
}
