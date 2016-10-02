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
        "Perz_A": [],
        "Perz_B": [],
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
        current_vars.TMTAError = current_source.TMTAError;
        current_vars.TMTATime = current_source.TMTATime;
        current_vars.TMTBError = current_source.TMTBError;
        current_vars.TMTBTime = current_source.TMTBTime;

        return current_vars;
    };



    // ------------------------------------------
    // GENERIC -  should not be touched:
    // ------------------------------------------

    calc.getScoresInVars = function(p, vars, info) {

        var return_array = [];

        for (var pIndex = 0; pIndex < p.length; pIndex++) {

            var current_patient = p[pIndex];
            var source = current_patient.other_calculations[info.other_calculation];

            if (source.length) {

                var return_obj = {
                    "patient": current_patient.patient,
                    "vars": current_vars,
                    "scores": []
                };

                for (var sIndex = 0; sIndex < source.length; sIndex++) {

                    var current_vars = calc.cloneObj(vars);
                    var current_source = source[sIndex];

                    current_vars = calc.arrangeScoresInVars(current_vars, current_source);

                    return_obj.scores.push(current_vars);
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


    // ------------------------------------------
    // F U N C T I O N  -  Main
    // ------------------------------------------
    calc.getResults = function(d) {

        var results = {};
        var vars = calc.cloneObj(calc.variables);
        var info = calc.cloneObj(calc.info);
        info.other_calculation = info.patient_app_id + ':' + info.patient_app_calculation;

        // Arrange Stuff as 'variables'
        var patient_scores = calc.getScoresInVars(d.patients, vars, info);


        // Return Stuff
        results.patient_scores = patient_scores;

        results.info = info;
        results.variables = vars;

        // Returning full (complete) responses is often used/helpful.
        results.full = d;

        return results;
    };


    // Return
    return calc.getResults(responses);
}
