function main(responses) {




    var calc = {};


    // ------------------------------------------
    // Definitions:
    // Interessting Vars of current App
    // ------------------------------------------

    calc.variables = {
        "koerperliche_lebensqualitaet_sum_score": [],
        "koerperliche_lebensqualitaet_scale_score": [],
        "koerperliche_lebensqualitaet_z_score_inverted": [],
        "psychische_lebensqualitaet_sum_score": [],
        "psychische_lebensqualitaet_scale_score": [],
        "psychische_lebensqualitaet_z_score_inverted": []
    };


    // ------------------------------------------
    // What 'Groups' do we have?
    // ------------------------------------------


    calc.group_mz_props = [{
        "id": 0,
        "text": "Eintritt"
    }, {
        "id": 1,
        "text": "Austritt"
    }, {
        "id": 2,
        "text": "Anderer Messzeitpunkt"
    }, {
        "id": 3,
        "text": "Alle Messzeitpunkte"
    }];


    // ------------------------------------------
    // What Dimensions are given from App
    // Arrange them in the following array
    // ------------------------------------------

    calc.dimensions_app = [{
        "id": 2,
        "name": "Messzeitpunkt",
        "source": "app",
        "array": JSON.parse(JSON.stringify(calc.group_mz_props))
    }];


    // ------------------------------------------
    // Info: com.optinomic.user.apps.klinikstichproben
    // What User App needs to know
    // ------------------------------------------

    calc.info = {
        "patient_app_id": "com.optinomic.apps.whoqol",
        "patient_app_calculation": "phys_psych_calculation"
    };

    // ------------------------------------------
    // Do Statistics
    // ------------------------------------------
    calc.getStatistics = function(data_array) {

        // Interessante Berechnungen | Statistics
        var s = {};

        if (calc.isArray(data_array)) {
            s.n = data_array.length;
            s.min = calc.min(data_array);
            s.max = calc.max(data_array);
            s.mean = calc.mean(data_array);
            s.variance = calc.variance(data_array);
            s.standard_deviation = calc.standard_deviation(data_array);
            s.mean_1sd_min = s.mean - s.standard_deviation;
            s.mean_1sd_plus = s.mean + s.standard_deviation;
            s.z_score_min = calc.z_score(s.min, s.mean, s.standard_deviation);
            s.z_score_max = calc.z_score(s.max, s.mean, s.standard_deviation);
        };

        // Return
        return s;
    };

    // ------------------------------------------
    // Arrange Results in Given Definitions
    // ------------------------------------------

    calc.arrangeScoresInVars = function(current_vars, current_source) {


        // Vorhandene Ergebnisse in calc.variables einpflegen.
        current_vars.koerperliche_lebensqualitaet_sum_score.push(current_source.all_results.koerperliche_lebensqualitaet_sum_score);
        current_vars.koerperliche_lebensqualitaet_scale_score.push(current_source.all_results.koerperliche_lebensqualitaet_scale_score);
        current_vars.koerperliche_lebensqualitaet_z_score_inverted.push(current_source.all_results.koerperliche_lebensqualitaet_z_score_inverted);
        current_vars.psychische_lebensqualitaet_sum_score.push(current_source.all_results.psychische_lebensqualitaet_sum_score);
        current_vars.psychische_lebensqualitaet_scale_score.push(current_source.all_results.psychische_lebensqualitaet_scale_score);
        current_vars.psychische_lebensqualitaet_z_score_inverted.push(current_source.all_results.psychische_lebensqualitaet_z_score_inverted);


        return current_vars;
    };

    calc.arrangeScoresInDimensions = function(current_source) {
        var return_array = calc.cloneObj(calc.dimensions_app);

        // Vorhandene Mess-Ergebnisse in calc.dimensions_app einpflegen.


        var given_mz_group = parseInt(current_source.info.mz.mz_id);
        if (given_mz_group !== 99) {
            given_mz_group = given_mz_group - 1;
        };


        // Existieren 99'er (Alle)?  Ebenfalls hinzufügen.

        for (var dIndex = 0; dIndex < return_array.length; dIndex++) {
            var cd = return_array[dIndex];
            cd.dimensions = [];

            if (dIndex === 0) {

                if (given_mz_group !== 99) {
                    cd.dimensions.push(given_mz_group);
                } else {
                    // Messungen ohne Messzeitpunkt in 'Anderer MZ' setzen.
                    cd.dimensions.push(2);
                };

                // Immer in alle Messzeitpunkte
                cd.dimensions.push(3);
            };
        };


        return return_array;
    };



    // ------------------------------------------
    // GENERIC -  Down below should be untouched:
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

            if (source.length > 0) {

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
            var ret = undefined;
            if (dimensions.length == 1) {
                ret = new Array(dimensions[0]);
                for (var i = 0; i < dimensions[0]; i++)
                    ret[i] = null; //or another value
                return ret;
            } else {
                //recursion
                var rest = dimensions.slice(1);
                ret = new Array(dimensions[0]);
                for (var i = 0; i < dimensions[0]; i++)
                    ret[i] = createNDimArray(rest);
                return ret;
            };
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

        function concatAndStatistics(ziel, quelle, patient, vars_array) {

            var default_obj = {
                "patients": [],
                "scores": calc.cloneObj(calc.variables),
                "statistics": calc.cloneObj(calc.variables)
            };

            // Set Default if needed
            if ((ziel === null) || (ziel === undefined)) {
                ziel = default_obj;
            };


            // Concat stuff
            for (var vID = 0; vID < vars_array.length; vID++) {
                var current_var = vars_array[vID];
                ziel.scores[current_var] = ziel.scores[current_var].concat(quelle[current_var]);
                ziel.statistics[current_var] = calc.getStatistics(ziel.scores[current_var]);
            };

            ziel.patients.push(patient);

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
                    var md_data = null;

                    if (current_list.length === 1) {
                        md_data = data[current_list[0]];
                        md_data = concatAndStatistics(md_data, current_score, pid, vars_array);
                        data[current_list[0]] = md_data;
                    };

                    if (current_list.length === 2) {
                        md_data = data[current_list[0]][current_list[1]];
                        md_data = concatAndStatistics(md_data, current_score, pid, vars_array);
                        data[current_list[0]][current_list[1]] = md_data;
                    };

                    if (current_list.length === 3) {
                        md_data = data[current_list[0]][current_list[1]][current_list[2]];
                        md_data = concatAndStatistics(md_data, current_score, pid, vars_array);
                        data[current_list[0]][current_list[1]][current_list[2]] = md_data;
                    };

                    if (current_list.length === 4) {
                        md_data = data[current_list[0]][current_list[1]][current_list[2]][current_list[3]];
                        md_data = concatAndStatistics(md_data, current_score, pid, vars_array);
                        data[current_list[0]][current_list[1]][current_list[2]][current_list[3]] = md_data;
                    };

                    if (current_list.length === 5) {
                        md_data = data[current_list[0]][current_list[1]][current_list[2]][current_list[3]][current_list[4]];
                        md_data = concatAndStatistics(md_data, current_score, pid, vars_array);
                        data[current_list[0]][current_list[1]][current_list[2]][current_list[3]][current_list[4]] = md_data;
                    };

                    if (current_list.length === 6) {
                        md_data = data[current_list[0]][current_list[1]][current_list[2]][current_list[3]][current_list[4]][current_list[5]];
                        md_data = concatAndStatistics(md_data, current_score, pid, vars_array);
                        data[current_list[0]][current_list[1]][current_list[2]][current_list[3]][current_list[4]][current_list[5]] = md_data;
                    };

                    if (current_list.length === 7) {
                        md_data = data[current_list[0]][current_list[1]][current_list[2]][current_list[3]][current_list[4]][current_list[5]][current_list[6]];
                        md_data = concatAndStatistics(md_data, current_score, pid, vars_array);
                        data[current_list[0]][current_list[1]][current_list[2]][current_list[3]][current_list[4]][current_list[5]][current_list[6]] = md_data;
                    };

                    if (current_list.length === 8) {
                        md_data = data[current_list[0]][current_list[1]][current_list[2]][current_list[3]][current_list[4]][current_list[5]][current_list[6]][current_list[7]];
                        md_data = concatAndStatistics(md_data, current_score, pid, vars_array);
                        data[current_list[0]][current_list[1]][current_list[2]][current_list[3]][current_list[4]][current_list[5]][current_list[6]][current_list[7]] = md_data;
                    };

                    if (current_list.length === 9) {
                        md_data = data[current_list[0]][current_list[1]][current_list[2]][current_list[3]][current_list[4]][current_list[5]][current_list[6]][current_list[7]][current_list[8]];
                        md_data = concatAndStatistics(md_data, current_score, pid, vars_array);
                        data[current_list[0]][current_list[1]][current_list[2]][current_list[3]][current_list[4]][current_list[5]][current_list[6]][current_list[7]][current_list[8]] = md_data;
                    };

                    if (current_list.length === 10) {
                        md_data = data[current_list[0]][current_list[1]][current_list[2]][current_list[3]][current_list[4]][current_list[5]][current_list[6]][current_list[7]][current_list[8]][current_list[9]];
                        md_data = concatAndStatistics(md_data, current_score, pid, vars_array);
                        data[current_list[0]][current_list[1]][current_list[2]][current_list[3]][current_list[4]][current_list[5]][current_list[6]][current_list[7]][current_list[8]][current_list[9]] = md_data;
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

    calc.roundToTwo = function(num) {
        // Round a Number to 0.X 
        return +(Math.round(num + "e+2") + "e-2");
    };

    calc.isArray = function(obj) {
        return (typeof obj !== 'undefined' &&
            obj && obj.constructor === Array);
    };

    calc.merge_obj = function(obj1, obj2) {
        var obj3 = {};
        for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
        for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
        return obj3;
    }


    // ------------------------------------------
    //  calculation_simplestatistics.js
    //  S T A T I S T I C S
    // ------------------------------------------

    calc.sum = function(x) {
        var value = 0;
        for (var i = 0; i < x.length; i++) {
            value += x[i];
        }
        return value;
    }

    calc.mean = function(x) {
        // The mean of no numbers is null
        if (x.length === 0) return null;

        return calc.sum(x) / x.length;
    }

    calc.geometric_mean = function(x) {
        // The mean of no numbers is null
        if (x.length === 0) return null;

        // the starting value.
        var value = 1;

        for (var i = 0; i < x.length; i++) {
            // the geometric mean is only valid for positive numbers
            if (x[i] <= 0) return null;

            // repeatedly multiply the value by each number
            value *= x[i];
        }

        return Math.pow(value, 1 / x.length);
    }

    calc.harmonic_mean = function(x) {
        // The mean of no numbers is null
        if (x.length === 0) return null;

        var reciprocal_sum = 0;

        for (var i = 0; i < x.length; i++) {
            // the harmonic mean is only valid for positive numbers
            if (x[i] <= 0) return null;

            reciprocal_sum += 1 / x[i];
        }

        // divide n by the the reciprocal sum
        return x.length / reciprocal_sum;
    }

    calc.root_mean_square = function(x) {
        if (x.length === 0) return null;

        var sum_of_squares = 0;
        for (var i = 0; i < x.length; i++) {
            sum_of_squares += Math.pow(x[i], 2);
        }

        return Math.sqrt(sum_of_squares / x.length);
    }

    calc.min = function(x) {
        var value;
        for (var i = 0; i < x.length; i++) {
            // On the first iteration of this loop, min is
            // undefined and is thus made the minimum element in the array
            if (x[i] < value || value === undefined) value = x[i];
        }
        return value;
    }

    calc.max = function(x) {
        var value;
        for (var i = 0; i < x.length; i++) {
            // On the first iteration of this loop, max is
            // undefined and is thus made the maximum element in the array
            if (x[i] > value || value === undefined) value = x[i];
        }
        return value;
    }

    calc.variance = function(x) {
        // The variance of no numbers is null
        if (x.length === 0) return null;

        var mean_value = calc.mean(x),
            deviations = [];

        // Make a list of squared deviations from the mean.
        for (var i = 0; i < x.length; i++) {
            deviations.push(Math.pow(x[i] - mean_value, 2));
        }

        // Find the mean value of that list
        return calc.mean(deviations);
    }

    calc.standard_deviation = function(x) {
        // The standard deviation of no numbers is null
        if (x.length === 0) return null;

        return Math.sqrt(calc.variance(x));
    }

    calc.z_score = function(x, mean, standard_deviation) {
        return (x - mean) / standard_deviation;
    }



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


    return calc.getResults(responses);




}
