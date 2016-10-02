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

        var return_array = [];

        for (var pIndex = 0; pIndex < p.length; pIndex++) {
            var current_patient = p[pIndex];
            var current_vars = calc.cloneObj(vars);

            var source = current_patient.other_calculations[info.other_calculation];

            if (source.length) {

                // Vorhandene Ergebnisse in calc.variables einpflegen.
                current_vars.TMTAError = source.TMTAError;
                current_vars.TMTATime = source.TMTATime;
                current_vars.TMTBError = source.TMTBError;
                current_vars.TMTBTime = source.TMTBTime;

                var return_obj = {
                    "patient": current_patient.patient,
                    "vars": current_vars,
                    "source": source
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
        results.patients = d.patients;
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
