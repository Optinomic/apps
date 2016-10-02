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

    calc.getScoresInVars = function(p, vars, info) {

        var calc_name = info.patient_app_id + ':' + info.patient_app_calculation;
        var source_score = p.other_calculations;


        return source_score;
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


        // Arrange Stuff as 'variables'
        var patientScores = calc.getScoresInVars(d.patients, vars, info);


        // Return Stuff
        results.patientScores = patientScores;

        results.info = calc.cloneObj(calc.info);
        results.variables = calc.cloneObj(calc.variables);

        // Returning full (complete) responses is often used/helpful.
        results.full = d;

        return results;
    };


    // Return
    return calc.getResults(responses);
}
