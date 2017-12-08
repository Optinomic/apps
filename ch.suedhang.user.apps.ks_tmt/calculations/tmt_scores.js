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
        "TMTBZ": [],
        // do not modify the below:
        "n": 0
    };

    calc.group_age_props = [{
        "age_group_id": 0,
        "age_group_text": "Altersgruppe 18 - 24"
    }, {
        "age_group_id": 1,
        "age_group_text": "Altersgruppe 25 – 34"
    }, {
        "age_group_id": 2,
        "age_group_text": "Altersgruppe 35 – 44"
    }, {
        "age_group_id": 3,
        "age_group_text": "Altersgruppe 45 – 54"
    }, {
        "age_group_id": 4,
        "age_group_text": "Altersgruppe 55 – 59"
    }, {
        "age_group_id": 5,
        "age_group_text": "Altersgruppe 60 – 64"
    }, {
        "age_group_id": 6,
        "age_group_text": "Altersgruppe 65 – 69"
    }, {
        "age_group_id": 7,
        "age_group_text": "Altersgruppe 70 – 74"
    }, {
        "age_group_id": 8,
        "age_group_text": "Altersgruppe 75 – 79"
    }, {
        "age_group_id": 9,
        "age_group_text": "Altersgruppe 80 – 84"
    }, {
        "age_group_id": 10,
        "age_group_text": "Altersgruppe 85 – 89"
    }];

    calc.group_edu_props = [{
        "edu_group_id": 0,
        "edu_group_text": "Ausbildung: <= 12 Jahre"
    }, {
        "edu_group_id": 1,
        "edu_group_text": "Ausbildung: > 12 Jahre"
    }, {
        "edu_group_id": 99,
        "edu_group_text": "Ausbildung: Alle Levels"
    }];

    calc.group_mz_props = [{
        "mz_group_id": 1,
        "mz_group_text": "Messzeitpunkt: Eintritt"
    }, {
        "mz_group_id": 2,
        "mz_group_text": "Messzeitpunkt: Austritt"
    }, {
        "mz_group_id": 3,
        "mz_group_text": "Messzeitpunkt: Anderer"
    }, {
        "mz_group_id": 99,
        "mz_group_text": "Alle Messzeitpunkte"
    }];


    // ------------------------------------------
    // H e l p e r   -   F U N C T I O N S
    // ------------------------------------------

    calc.getPatientScores = function(d) {

        // Get all TMT-Scores from a Patient and arrange it in a Array
        var all_scores = [];

        for (var i = 0; i < d.length; i++) {
            var current_result = d[i];


            // Scores Obj. erstellen.
            var scores = {
                "patient_details": {
                    "edu_years": null,
                    "age_edu_group": {},
                    "age": null
                },
                "mz_01_vars": calc.getVariables(),
                "mz_02_vars": calc.getVariables(),
                "mz_03_vars": calc.getVariables(),
                "mz_99_vars": calc.getVariables(),
                "pid": current_result.patient.id
            };



            var all_responses = current_result.other_calculations['ch.suedhang.apps.tmt_V3:tmt_score']

            var data_here = false;

            for (var x = 0; x < all_responses.length; x++) {
                var current_response = all_responses[x];

                var TMTAError = current_response.TMTAError;
                var TMTATime = current_response.TMTATime;
                var TMTBError = current_response.TMTBError;
                var TMTBTime = current_response.TMTBTime;
                var Perz_A = current_response.percentile.result.A;
                var Perz_B = current_response.percentile.result.B;
                var BA_Quotient = current_response.quotient;
                var Z_A = current_response.percentile.z_scores.tmtA_z;
                var Z_B = current_response.percentile.z_scores.tmtB_z;

                scores.patient_details.edu_years = current_response.edu_years;
                scores.patient_details.age_edu_group = current_response.percentile.age_perz;
                scores.patient_details.age = current_response.set_age;

                var filled = current_response.response.data.filled;
                var event_id = current_response.response.data.event_id;
                var pid = current_result.patient.id;

                var messzeitpunkt = current_response.mz;


                if (current_response.edu_years !== null) {
                    data_here = true;
                };



                // Interessante Variablen & Details Obj. speichern.
                scores.mz_99_vars.TMTAError.push(TMTAError);
                scores.mz_99_vars.TMTATime.push(TMTATime);
                scores.mz_99_vars.TMTBError.push(TMTBError);
                scores.mz_99_vars.TMTBTime.push(TMTBTime);
                scores.mz_99_vars.Perz_A.push(Perz_A);
                scores.mz_99_vars.Perz_B.push(Perz_B);
                scores.mz_99_vars.BA_Quotient.push(BA_Quotient);
                scores.mz_99_vars.TMTAZ.push(Z_A);
                scores.mz_99_vars.TMTBZ.push(Z_B);
                scores.mz_99_vars.n = scores.mz_99_vars.BA_Quotient.length;


                if (messzeitpunkt === 1) {
                    // Eintritt
                    scores.mz_01_vars.TMTAError.push(TMTAError);
                    scores.mz_01_vars.TMTATime.push(TMTATime);
                    scores.mz_01_vars.TMTBError.push(TMTBError);
                    scores.mz_01_vars.TMTBTime.push(TMTBTime);
                    scores.mz_01_vars.Perz_A.push(Perz_A);
                    scores.mz_01_vars.Perz_B.push(Perz_B);
                    scores.mz_01_vars.BA_Quotient.push(BA_Quotient);
                    scores.mz_01_vars.TMTAZ.push(Z_A);
                    scores.mz_01_vars.TMTBZ.push(Z_B);
                    scores.mz_01_vars.n = scores.mz_01_vars.BA_Quotient.length;
                };


                if (messzeitpunkt === 2) {
                    // Austritt
                    scores.mz_02_vars.TMTAError.push(TMTAError);
                    scores.mz_02_vars.TMTATime.push(TMTATime);
                    scores.mz_02_vars.TMTBError.push(TMTBError);
                    scores.mz_02_vars.TMTBTime.push(TMTBTime);
                    scores.mz_02_vars.Perz_A.push(Perz_A);
                    scores.mz_02_vars.Perz_B.push(Perz_B);
                    scores.mz_02_vars.BA_Quotient.push(BA_Quotient);
                    scores.mz_02_vars.TMTAZ.push(Z_A);
                    scores.mz_02_vars.TMTBZ.push(Z_B);
                    scores.mz_02_vars.n = scores.mz_02_vars.BA_Quotient.length;
                };


                if ((messzeitpunkt !== 1) && (messzeitpunkt !== 2)) {
                    // Anderer
                    scores.mz_03_vars.TMTAError.push(TMTAError);
                    scores.mz_03_vars.TMTATime.push(TMTATime);
                    scores.mz_03_vars.TMTBError.push(TMTBError);
                    scores.mz_03_vars.TMTBTime.push(TMTBTime);
                    scores.mz_03_vars.Perz_A.push(Perz_A);
                    scores.mz_03_vars.Perz_B.push(Perz_B);
                    scores.mz_03_vars.BA_Quotient.push(BA_Quotient);
                    scores.mz_03_vars.TMTAZ.push(Z_A);
                    scores.mz_03_vars.TMTBZ.push(Z_B);
                    scores.mz_03_vars.n = scores.mz_03_vars.BA_Quotient.length;
                };
            };

            // Push only if Data available
            if (data_here) {
                all_scores.push(scores);
            };

        };

        return all_scores;
    };

    calc.getAgeEduObj = function() {

        var retrun_obj = {};

        // Propertys from Data Model
        var age_props = calc.group_age_props;
        var edu_props = calc.group_edu_props;
        var mz_props = calc.group_mz_props;

        // Create 'all propertys array' from Array
        var allVarsPropertys = [];
        var allVars = calc.getVariables('variables');
        for (var property in allVars) {
            if (allVars.hasOwnProperty(property)) {
                allVarsPropertys.push(property);
            }
        };

        // var
        var twoDigits = function(id) {
            var return_text = '';
            id = parseInt(id);
            if (id < 10) {
                return_text = '0' + id.toString();
            } else {
                return_text = id.toString();
            };
            return return_text;
        };


        var merge_obj = function(obj1, obj2) {
            var obj3 = {};
            for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
            for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
            return obj3;
        };


        // Create 'multidimensional Array in a Object.

        var obj_name = '';

        for (var group_id = 0; group_id < age_props.length; group_id++) {
            // Init & Add stuff:
            var inner_obj = {};
            var obj_to_merge_age = age_props[group_id];
            var name_age = obj_to_merge_age.age_group_id;

            var age_group_array = [];
            age_group_array.push(obj_to_merge_age.age_group_id);
            age_group_array.push(obj_to_merge_age.age_group_text);
            age_group_array.push(group_id);
            inner_obj.age_group = age_group_array;

            //inner_obj = calc.merge_obj(inner_obj, obj_to_merge_age);
            //inner_obj.age_group_array_id = group_id;

            for (var edu_prop_id = 0; edu_prop_id < edu_props.length; edu_prop_id++) {
                // Init & Add stuff:
                var obj_to_merge_edu = edu_props[edu_prop_id];
                var name_edu = obj_to_merge_edu.edu_group_id;
                //inner_obj = calc.merge_obj(inner_obj, obj_to_merge_edu);
                //inner_obj.edu_group_array_id = edu_prop_id;
                var edu_group_array = [];
                edu_group_array.push(obj_to_merge_edu.edu_group_id);
                edu_group_array.push(obj_to_merge_edu.edu_group_text);
                edu_group_array.push(edu_prop_id);
                inner_obj.edu_group = edu_group_array;


                for (var mz_prop_id = 0; mz_prop_id < mz_props.length; mz_prop_id++) {
                    // Init & Add stuff:
                    var obj_to_merge_mz = mz_props[mz_prop_id];
                    var name_mz = obj_to_merge_mz.mz_group_id;

                    var mz_group_array = [];
                    mz_group_array.push(obj_to_merge_mz.mz_group_id);
                    mz_group_array.push(obj_to_merge_mz.mz_group_text);
                    mz_group_array.push(mz_prop_id);
                    inner_obj.mz_group = mz_group_array;

                    //inner_obj = calc.merge_obj(inner_obj, obj_to_merge_mz);
                    //inner_obj.mz_group_array_id = mz_prop_id;

                    // Place for Statistics & Scores & Patients
                    inner_obj.scores = calc.variables;
                    inner_obj.statistics = {
                        "calculated": false
                    };
                    inner_obj.patients = [];
                    inner_obj.n = null;

                    // Build ObjectName
                    obj_name = 'age_' + twoDigits(name_age) + '_edu_' + twoDigits(name_edu) + '_mz_' + twoDigits(name_mz);

                    // Write to Object
                    retrun_obj[obj_name] = JSON.parse(JSON.stringify(inner_obj));
                };
            };
        };


        return retrun_obj;
    };

    calc.getAgeEduObjScores = function(age_edu_mz_obj, patient_scores) {
        var returnObj = age_edu_mz_obj;

        var twoDigits = function(id) {
            var return_text = '';
            id = parseInt(id);
            if (id < 10) {
                return_text = '0' + id.toString();
            } else {
                return_text = id.toString();
            };
            return return_text;
        };

        // Test Write:  Works
        // returnObj.age_00_edu_00_mz_00.patients.push(73);
        // returnObj.age_00_edu_00_mz_00.scores.BA_Quotient.push(73);

        for (var patient_score_id = 0; patient_score_id < patient_scores.length; patient_score_id++) {
            var current_patient_score = patient_scores[patient_score_id];

            var age_group = current_patient_score.patient_details.age_edu_group.altersgruppe;
            var age_group_name = twoDigits(age_group);

            if (current_patient_score.patient_details.age_edu_group.education_high) {
                var edu_group_name = '01';
            } else {
                var edu_group_name = '00';
            };

            //var edu_group = current_patient_score.patient_details.age_edu_group.education;

            var edu_relevant_groups = [];
            edu_relevant_groups.push(edu_group_name);

            if (edu_group_name !== '99') {
                edu_relevant_groups.push('99');
            };

            for (var edu_relevant_group_id = 0; edu_relevant_group_id < edu_relevant_groups.length; edu_relevant_group_id++) {
                edu_group_name = edu_relevant_groups[edu_relevant_group_id];

                // Loop alle Messzeitpunkte
                var mz = calc.group_mz_props;

                for (var mz_array_id = 0; mz_array_id < mz.length; mz_array_id++) {
                    var current_mz = mz[mz_array_id];
                    var mz_group_name = twoDigits(current_mz.mz_group_id);

                    // Build Obj - Names
                    var age_edu_obj_name = 'age_' + age_group_name + '_edu_' + edu_group_name + '_mz_' + mz_group_name;
                    var mz_vars_name = 'mz_' + mz_group_name + '_vars';

                    // Get Vars to operate
                    var ziel_obj = returnObj[age_edu_obj_name];
                    var quell_obj = current_patient_score[mz_vars_name];


                    // N aufzählen von Ziel.
                    ziel_obj.n = quell_obj.n;
                    ziel_obj.scores = calc.concatAllArraysInObject(ziel_obj.scores, quell_obj);

                    // Patients setzen
                    var pid = current_patient_score.pid;

                    // Für jede Messung dieses Patienten - PID ablegen.
                    for (var anz_pid = 0; anz_pid < quell_obj.n; anz_pid++) {
                        ziel_obj.patients.push(pid);
                    };

                };
            };

        };

        // SUGUS - Bookmark

        return returnObj;
    };

    calc.getAgeEduObjStatistics = function(age_edu_obj_scores, age_edu_mz_obj_prop_array) {

        var returnObj = age_edu_obj_scores;

        for (var prop_id = 0; prop_id < age_edu_mz_obj_prop_array.length; prop_id++) {
            var current_age_edu_mz_name = age_edu_mz_obj_prop_array[prop_id];
            var current_age_edu_mz = age_edu_obj_scores[current_age_edu_mz_name];

            // Make Sure 'n' is correct - everywhere.
            var update_n = current_age_edu_mz.scores.BA_Quotient.length;
            current_age_edu_mz.n = update_n;
            current_age_edu_mz.scores.n = update_n;

            // Do we have Data?
            if (update_n > 0) {

                var vars_array = calc.getPropertyArrayFromOject(current_age_edu_mz.scores);

                for (var vars_id = 0; vars_id < vars_array.length; vars_id++) {
                    var current_var_name = vars_array[vars_id];

                    var current_score = current_age_edu_mz.scores[current_var_name];

                    // Run Statistics;
                    if (calc.isArray(current_score)) {
                        current_age_edu_mz.statistics[current_var_name] = calc.getStatistics(current_score);
                    } else {
                        current_age_edu_mz.statistics[current_var_name] = current_score;
                    };
                };

                // Mark as 'Calculated'
                current_age_edu_mz.statistics.calculated = true;
            };
        };


        return returnObj;
    };

    calc.getStatistics = function(data_array) {

        // Interessante Berechnungen | Statistics
        var s = {};

        if (calc.isArray(data_array)) {
            s.n = data_array.legth;
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

    calc.concatAllArraysInObject = function(objectFull, objectToConcat) {


        // Create 'all propertys array'
        var allFullPropertys = [];

        for (var property in objectFull) {
            if (objectFull.hasOwnProperty(property)) {
                allFullPropertys.push(property);
            }
        }

        // Loop "allFullPropertys" and check if objectToConcat has them: if yes: Concat.
        for (var x = 0; x < allFullPropertys.length; x++) {
            var current_property = allFullPropertys[x];
            var ArrayFromObjectToConcat = objectToConcat[current_property];
            var isThisArray = calc.isArray(ArrayFromObjectToConcat);

            if (isThisArray) {
                // Array found Concat!
                objectFull[current_property] = objectFull[current_property].concat(ArrayFromObjectToConcat);

                // set n;
                objectFull.n = objectFull[current_property].length;
            };
        };


        // Return
        return objectFull;
    };

    calc.getVariables = function() {
        // Interessante Variablen
        var variables = calc.variables;

        // Clone Obj. and Return
        return JSON.parse(JSON.stringify(variables));
    };

    // ------------------------------------------
    //  calculation_simplestatistics.js
    //  S T A T I S T I C S   &   Helpers
    // ------------------------------------------

    __opapp_include(../lib/js/optinomic/statistics/calculation_simplestatistics.js)


    // ------------------------------------------
    // F U N C T I O N  -  Main
    // ------------------------------------------
    calc.getResults = function(d) {

        var results = {};


        // Do the needed 'calculations'
        var age_edu_mz_obj = calc.getAgeEduObj();
        var age_edu_mz_obj_prop_array = calc.getPropertyArrayFromOject(age_edu_mz_obj);
        var patient_scores = calc.getPatientScores(d.patients);
        var age_edu_obj_scores = calc.getAgeEduObjScores(age_edu_mz_obj, patient_scores);
        var age_edu_obj_statistics = calc.getAgeEduObjStatistics(age_edu_obj_scores, age_edu_mz_obj_prop_array);


        // Returning | Results in Obj.
        // results.age_edu_obj = age_edu_mz_obj;
        results.patient_scores = patient_scores;
        // results.age_edu_obj_scores = age_edu_obj_scores;
        results.age_edu_mz_obj = age_edu_obj_statistics;


        // Return Useful Definitions
        var definitions = {
            "age": calc.group_age_props,
            "edu": calc.group_edu_props,
            "mz": calc.group_mz_props,
            "age_edu_mz_obj_prop_array": age_edu_mz_obj_prop_array
        };
        results.definitions = definitions;


        // Returning full (complete) responses is often used/helpful.
        results.full = responses;

        return results;
    };


    // Return
    return calc.getResults(responses);
}
