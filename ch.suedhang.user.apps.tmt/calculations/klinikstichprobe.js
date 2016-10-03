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

    calc.arrangeScoresInDimensions = function(current_source) {
        var return_array = calc.cloneObj(calc.dimensions_app);

        // Vorhandene Mess-Ergebnisse in calc.dimensions_app einpflegen.

        var given_age_group = current_source.percentile.age_perz.altersgruppe;

        var given_edu_group = 0;
        if (current_source.percentile.age_perz.education_high) {
            given_edu_group = 1;
        };

        var given_mz_group = current_source.mz - 1;


        // Existieren 99'er (Alle)?  Ebenfalls hinzufügen.

        for (var dIndex = 0; dIndex < return_array.length; dIndex++) {
            var cd = return_array[dIndex];
            cd.dimensions = [];

            if (dIndex === 0) {
                cd.dimensions.push(given_age_group);
            };

            if (dIndex === 1) {
                cd.dimensions.push(given_edu_group);
                // Jeder Ausbildungsgrad
                cd.dimensions.push(2);
            };

            if (dIndex === 2) {
                cd.dimensions.push(given_mz_group);
                // Alle Messzeitpunkte
                cd.dimensions.push(3);
            };
        };

        return return_array;
    };

    // ------------------------------------------
    // GENERIC -  should not be touched:
    // ------------------------------------------

    calc.getScoresInVars = function(p, vars, info) {

        var return_array = [];

        function getAllVariantsList(current_dimension) {

            var list = [];

            // Liste aller Varianten erstellen
            for (var pos = 0; pos < current_dimension.length; pos++) {
                var dim_pos = current_dimension[pos].dimensions;
                list[pos] = dim_pos;
            };

            // Build all Variants List
            var result = list[0].map(function(item) {
                return [item];
            });

            for (var k = 1; k < list.length; k++) {
                var next = [];
                result.forEach(function(item) {
                    list[k].forEach(function(word) {
                        var line = item.slice(0);
                        line.push(word);
                        next.push(line);
                    })
                });
                result = next;
            };

            return result;
        };

        for (var pIndex = 0; pIndex < p.length; pIndex++) {

            var current_patient = p[pIndex];
            var source = current_patient.other_calculations[info.other_calculation];

            if (source.length) {

                var return_obj = {
                    "patient": current_patient.patient,
                    "data": {
                        "dimensions": [],
                        "scores": []
                    }
                };

                // Loop Messungen
                for (var sIndex = 0; sIndex < source.length; sIndex++) {

                    var current_vars = calc.cloneObj(vars);
                    var current_source = source[sIndex];
                    var current_dimensions = {
                        "md_variants": [],
                        "info": []
                    };

                    current_vars = calc.arrangeScoresInVars(current_vars, current_source);
                    return_obj.data.scores.push(current_vars);

                    var dims = calc.arrangeScoresInDimensions(current_source);
                    current_dimensions.info = dims;
                    current_dimensions.md_variants = getAllVariantsList(dims);
                    return_obj.data.dimensions.push(current_dimensions);
                };

                return_array.push(return_obj);
            };
        };

        return return_array;
    };

    calc.getMDScoresArray = function(dimensions_app) {

        function createNDimArray(dimensions) {
            var t, i = 0,
                s = dimensions[0],
                arr = new Array(s);
            if (dimensions.length < 3)
                for (t = dimensions[1]; i < s;) arr[i++] = new Array(t);
            else
                for (t = dimensions.slice(1); i < s;) arr[i++] = createNDimArray(t);
            return arr;
        }

        var n_dimensions = [];
        for (var dIndex = 0; dIndex < dimensions_app.length; dIndex++) {
            var cd = dimensions_app[dIndex];
            n_dimensions.push(cd.array.length)
        };

        return createNDimArray(n_dimensions);
    };


    calc.writePatientScoresMD = function(patient_scores, md_app_scores) {


        function getObjProp(my_obj) {
            var allFullPropertys = [];
            for (var property in my_obj) {
                if (my_obj.hasOwnProperty(property)) {
                    allFullPropertys.push(property);
                }
            };
            return allFullPropertys;
        };

        function concatArrays(ziel, quelle, patient, vars_array) {

            var default_obj = {
                "patients": [],
                "scores": calc.cloneObj(calc.variables),
                "statistics": calc.cloneObj(calc.variables),
                "n": 0
            };

            // Set Default if needed
            if (ziel === null) {
                ziel = default_obj;
            };

            // Concat stuff
            for (var vID = 0; vID < vars_array.length; vID++) {
                var current_var = vars_array[vID];
                ziel.scores[current_var] = ziel.scores[current_var].concat(quelle[current_var]);
            };

            ziel.patients.push(patient);
            ziel.n = ziel.scores.length;


            return ziel;
        };


        var ps = calc.cloneObj(patient_scores);
        var data = calc.cloneObj(md_app_scores);
        var vars_array = getObjProp(calc.variables);


        for (var psID = 0; psID < ps.length; psID++) {

            var source_patient_scores = ps[psID];

            var pid = source_patient_scores.patient.id;
            var source_scores = source_patient_scores.data.scores;
            var source_dimensions = source_patient_scores.data.dimensions;


            for (var sID = 0; sID < source_scores.length; sID++) {
                var current_score = source_scores[sID];
                var md_variants = source_dimensions[sID].md_variants;


                // Write in all Variants
                for (var listID = 0; listID < md_variants.length; listID++) {

                    var current_list = md_variants[listID];

                    // Testwrite | Works
                    // data[2][1][0] = current_list;


                    // DIRTY - HACKING HERE!
                    // TO DO: How do I do this better?

                    var ziel = null;
                    if (current_list.length === 1) {
                        data[current_list[0]] = current_list;
                    };

                    if (current_list.length === 2) {
                        data[current_list[0]][current_list[1]] = current_list;
                    };

                    if (current_list.length === 3) {
                        data[current_list[0]][current_list[1]][current_list[2]] = concatArrays(data[current_list[0]][current_list[1]][current_list[2]], current_score, pid, vars_array);
                    };

                    if (current_list.length === 4) {
                        data[current_list[0]][current_list[1]][current_list[2]][current_list[3]] = current_list;
                    };

                    if (current_list.length === 5) {
                        data[current_list[0]][current_list[1]][current_list[2]][current_list[3]][current_list[4]] = current_list;
                    };

                };

            };

        };


        return data;
    };



    // ------------------------------------------
    // Helpers
    // ------------------------------------------

    calc.cloneObj = function(my_obj) {
        // Clone Obj. and Return
        return JSON.parse(JSON.stringify(my_obj));
    };


    calc.getObjProp = function(my_obj) {
        // Create 'all propertys array'
        var allFullPropertys = [];

        for (var property in my_obj) {
            if (my_obj.hasOwnProperty(property)) {
                allFullPropertys.push(property);
            }
        }

        return allFullPropertys;
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
        var md_patient_scores = calc.writePatientScoresMD(patient_scores, md_app_scores);


        // Return Stuff
        results.patient_scores = patient_scores;
        results.md_patient_scores = md_patient_scores;

        var definitions = {
            "info": info,
            "variables": vars,
            "variables_array": calc.getObjProp(vars),
            "dimensions_app": calc.cloneObj(calc.dimensions_app),
            "md_app_data_empty": md_app_scores
        };

        results.definitions = definitions;

        // Returning full (complete) responses is often used/helpful.
        results.full = d;

        return results;
    };


    // Return
    return calc.getResults(responses);
}
