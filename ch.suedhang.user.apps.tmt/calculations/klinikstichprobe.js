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
        "TMTAPerz": [],
        "TMTBPerz": [],
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
    // What Dimensions are given from App
    // Arrange them in the following array
    // ------------------------------------------

    calc.dimensions_app = [{
        "id": 0,
        "name": "Altersgruppe",
        "definitions": calc.cloneObj(group_age_props)
    }, {
        "id": 1,
        "name": "Ausbildungsstand",
        "definitions": calc.cloneObj(group_edu_props)
    }, {
        "id": 2,
        "name": "Messzeitpunkt",
        "definitions": calc.cloneObj(group_mz_props)
    }];

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

        current_vars.BA_Quotient.push(current_source.quotient);
        current_vars.TMTAPerz.push(current_source.percentile.result.A);
        current_vars.TMTBPerz.push(current_source.percentile.result.A);
        current_vars.TMTAError.push(current_source.TMTAError);
        current_vars.TMTATime.push(current_source.TMTATime);
        current_vars.TMTBError.push(current_source.TMTBError);
        current_vars.TMTBTime.push(current_source.TMTBTime);
        current_vars.TMTAZ.push(current_source.percentile.z_scores.tmtA_z);
        current_vars.TMTBZ.push(current_source.percentile.z_scores.tmtB_z);

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

        var group_age_props = calc.cloneObj(calc.group_age_props);
        var group_edu_props = calc.cloneObj(calc.group_edu_props);
        var group_mz_props = calc.cloneObj(calc.group_mz_props);
        var dimensions_app = calc.cloneObj(calc.dimensions_app);

        // Arrange Stuff as 'variables'
        var patient_scores = calc.getScoresInVars(d.patients, vars, info);


        // Return Stuff
        results.patient_scores = patient_scores;

        results.info = info;
        results.variables = vars;
        results.dimensions_app = dimensions_app;



        // Returning full (complete) responses is often used/helpful.
        results.full = d;

        return results;
    };


    // Return
    return calc.getResults(responses);
}
