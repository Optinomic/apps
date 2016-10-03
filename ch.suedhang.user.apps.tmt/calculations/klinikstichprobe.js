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
        "text": "18 - 24"
    }, {
        "id": 1,
        "text": "25 – 34"
    }, {
        "id": 2,
        "text": "35 – 44"
    }, {
        "id": 3,
        "text": "45 – 54"
    }, {
        "id": 4,
        "text": "55 – 59"
    }, {
        "id": 5,
        "text": "60 – 64"
    }, {
        "id": 6,
        "text": "65 – 69"
    }, {
        "id": 7,
        "text": "70 – 74"
    }, {
        "id": 8,
        "text": "75 – 79"
    }, {
        "id": 9,
        "text": "80 – 84"
    }, {
        "id": 10,
        "text": "85 – 89"
    }];


    calc.group_edu_props = [{
        "id": 0,
        "text": "<= 12 Jahre"
    }, {
        "id": 1,
        "text": "> 12 Jahre"
    }, {
        "id": 99,
        "text": "Jeder Ausbildungsgrad"
    }];


    calc.group_mz_props = [{
        "id": 1,
        "text": "Eintritt"
    }, {
        "id": 2,
        "text": "Austritt"
    }, {
        "id": 3,
        "text": "Anderer Messzeitpunkt"
    }, {
        "id": 99,
        "text": "Alle Messzeitpunkte"
    }];


    // ------------------------------------------
    // What Dimensions are given from App
    // Arrange them in the following array
    // ------------------------------------------

    calc.dimensions_app = [{
        "id": 0,
        "name": "Altersgruppe",
        "array": JSON.parse(JSON.stringify(calc.group_age_props))
    }, {
        "id": 1,
        "name": "Ausbildungsgrad",
        "array": JSON.parse(JSON.stringify(calc.group_edu_props))
    }, {
        "id": 2,
        "name": "Messzeitpunkt",
        "array": JSON.parse(JSON.stringify(calc.group_mz_props))
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
                    "scores": [],
                };




                // Loop Messungen
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

    calc.getMDScoresArray = function(dimensions_app) {

        var return_array = [];

        // Create MD-App-Scores
        return_array = dimensions_app[0];

        //  for (var dIndex = 0; dIndex < dimensions_app_scores.length; dIndex++) {
        //      var cd = dimensions_app_scores[dIndex];
        //  
        //      // Loop Dimensions
        //  
        //      for (var cdIndex = 0; cdIndex < cd.array.length; cdIndex++) {
        //          var csd = dimensions_app_scores[dIndex];
        //      };
        //  
        //  };


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
        var md_app_scores = calc.getMDScoresArray(calc.cloneObj(calc.dimensions_app));


        // Return Stuff
        results.patient_scores = patient_scores;

        var definitions = {
            "info": info,
            "variables": vars,
            "dimensions_app": calc.cloneObj(calc.dimensions_app),
            "md_app_scores": md_app_scores
        };

        results.definitions = definitions;

        // Returning full (complete) responses is often used/helpful.
        results.full = d;

        return results;
    };


    // Return
    return calc.getResults(responses);
}
