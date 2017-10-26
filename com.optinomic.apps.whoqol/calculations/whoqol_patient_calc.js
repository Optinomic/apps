function main(responses) {


    var calc = {};


    // ------------------------------------------
    // D e f i n i t i o n s
    // ------------------------------------------


    calc.result_types = ["sum_score", "scale_score", "z_score", "z_score_inverted"];

    calc.result_array = [{
        "id": 0,
        "description": "Koerperliche Lebensqualitaet",
        "short": "PHYS",
        "items": 7
    }, {
        "id": 1,
        "description": "Psychische Lebensqualitaet",
        "short": "PSYCH",
        "items": 6
    }];


    // ------------------------------------------
    // H e l p e r   -   F U N C T I O N S
    // ------------------------------------------

    calc.set_result_array = function(result_array) {

        function deUmlaut(value) {
            value = value.toLowerCase();
            value = value.replace(/ä/g, 'ae');
            value = value.replace(/ö/g, 'oe');
            value = value.replace(/ü/g, 'ue');
            value = value.replace(/ß/g, 'ss');
            value = value.replace(/ /g, '-');
            value = value.replace(/\./g, '');
            value = value.replace(/,/g, '');
            value = value.replace(/\(/g, '');
            value = value.replace(/\)/g, '');
            return value;
        };

        result_array.forEach(function(d, myResultID) {
            d.short_description = deUmlaut(d.description);
            d.short_description = d.short_description.replace(/[^a-z0-9]/gi, '_').toLowerCase();

            d.result = {};
            var name = "";
            calc.result_types.forEach(function(typ, myTypID) {
                name = d.short_description + "_" + typ;
                d.result[typ] = null;
            });

        });


        return result_array;
    };

    calc.create_all_results = function(result_array) {

        var variables = [];
        var variables_inner = [];
        var results = {};


        result_array.forEach(function(d, myResID) {

            calc.result_types.forEach(function(typ, myTypID) {
                name = d.short_description + "_" + typ;
                results[name] = d.result[typ];
                variables.push(name);
            });

        });

        calc.result_types.forEach(function(typ, myTypID) {
            variables_inner.push(typ);
        });


        var return_obj = {
            "all_variables": variables,
            "variables": variables_inner,
            "all_results": results
        };


        return return_obj;
    };

    calc.age_norm = function(filled_age, gender) {

        var altersgruppe = 0;
        var altersgruppe_text = 'Keine Altergruppe bestimmt';
        var altersgruppe_found = false;
        var n = 0;
        var M_Norm = [0, 0];
        var SD_Norm = [0, 0];

        // Altersgruppe & Normwerte WHOQOL [Phys., Psych.]
        if (filled_age < 26) {
            if (gender === 'male') {
                // Männer, Altersgruppe 18 - 25 | n = 124
                altersgruppe = 0;
                altersgruppe_text = "Männer, 18 - 25";
                n = 124;
                altersgruppe_found = true;
                M_Norm = [87.17, 79.07];
                SD_Norm = [13.62, 14.00];
            } else {
                // Frauen, Altersgruppe 18 - 25 | n = 116
                altersgruppe = 0;
                altersgruppe_text = "Frauen, 18 - 25";
                n = 116;
                altersgruppe_found = true;
                M_Norm = [86.04, 77.74];
                SD_Norm = [13.24, 15.12];
            };
        };

        if ((filled_age >= 26) && (filled_age <= 35)) {
            if (gender === 'male') {
                // Männer, Altersgruppe 26 - 35 | n = 180
                altersgruppe = 1;
                altersgruppe_text = "Männer, 26 - 35";
                n = 180;
                altersgruppe_found = true;
                M_Norm = [85.58, 77.80];
                SD_Norm = [13.02, 14.43];
            } else {
                // Frauen, Altersgruppe 26 - 55 | n = 214
                altersgruppe = 1;
                altersgruppe_text = "Frauen, 26 - 35";
                n = 214;
                altersgruppe_found = true;
                M_Norm = [82.87, 77.47];
                SD_Norm = [14.67, 15.41];
            };
        };

        if ((filled_age >= 36) && (filled_age <= 45)) {
            if (gender === 'male') {
                // Männer, Altersgruppe 36 - 45 | n = 170
                altersgruppe = 2;
                altersgruppe_text = "Männer, 36 - 45";
                n = 170;
                altersgruppe_found = true;
                M_Norm = [82.30, 75.28];
                SD_Norm = [15.76, 16.52];
            } else {
                // Frauen, Altersgruppe 36 - 45 | n = 193
                altersgruppe = 2;
                altersgruppe_text = "Frauen, 36 - 45";
                n = 193;
                altersgruppe_found = true;
                M_Norm = [79.48, 73.22];
                SD_Norm = [16.46, 16.31];
            };
        };

        if ((filled_age >= 46) && (filled_age <= 55)) {
            if (gender === 'male') {
                // Männer, Altersgruppe 46 - 55 | n = 125
                altersgruppe = 3;
                altersgruppe_text = "Männer, 46 - 55";
                n = 125;
                altersgruppe_found = true;
                M_Norm = [76.52, 74.69];
                SD_Norm = [17.71, 15.67];
            } else {
                // Frauen, Altersgruppe 46 - 55 | n = 143
                altersgruppe = 3;
                altersgruppe_text = "Frauen, 46 - 55";
                n = 143;
                altersgruppe_found = true;
                M_Norm = [77.14, 73.39];
                SD_Norm = [16.74, 15.28];
            };
        };

        if ((filled_age >= 56) && (filled_age <= 65)) {
            if (gender === 'male') {
                // Männer, Altersgruppe 56 - 65 | n = 171
                altersgruppe = 4;
                altersgruppe_text = "Männer, 56 - 65";
                n = 171;
                altersgruppe_found = true;
                M_Norm = [75.43, 75.67];
                SD_Norm = [16.37, 13.76];
            } else {
                // Frauen, Altersgruppe 56 - 65 | n = 224
                altersgruppe = 4;
                altersgruppe_text = "Frauen, 56 - 56";
                n = 224;
                altersgruppe_found = true;
                M_Norm = [71.03, 70.65];
                SD_Norm = [17.91, 17.26];
            };
        };

        if ((filled_age >= 66) && (filled_age <= 75)) {
            if (gender === 'male') {
                // Männer, Altersgruppe 66 - 75 | n = 121
                altersgruppe = 5;
                altersgruppe_text = "Männer, 66 - 75";
                n = 121;
                altersgruppe_found = true;
                M_Norm = [68.24, 74.58];
                SD_Norm = [14.99, 11.96];
            } else {
                // Frauen, Altersgruppe 66 - 75 | n = 148
                altersgruppe = 5;
                altersgruppe_text = "Frauen, 66 - 75";
                n = 148;
                altersgruppe_found = true;
                M_Norm = [65.04, 67.22];
                SD_Norm = [17.84, 15.00];
            };
        };

        if ((filled_age >= 76) && (filled_age <= 85)) {
            if (gender === 'male') {
                // Männer, Altersgruppe 76 - 85 | n = 31
                altersgruppe = 6;
                altersgruppe_text = "Männer, 76 - 85";
                n = 31;
                altersgruppe_found = true;
                M_Norm = [59.37, 69.01];
                SD_Norm = [17.19, 14.51];
            } else {
                // Frauen, Altersgruppe 76 - 85 | n = 80
                altersgruppe = 6;
                altersgruppe_text = "Frauen, 76 - 85";
                n = 80;
                altersgruppe_found = true;
                M_Norm = [60.49, 64.38];
                SD_Norm = [14.67, 13.52];
            };
        };

        if (filled_age >= 86) {
            if (gender === 'male') {
                // Männer, Altersgruppe > 85 | n = 3
                altersgruppe = 7;
                altersgruppe_text = "Männer, ab 86";
                n = 3;
                altersgruppe_found = true;
                M_Norm = [54.56, 50.00];
                SD_Norm = [22.75, 16.67];
            } else {
                // Frauen, Altersgruppe > 85 | n = 9
                altersgruppe = 7;
                altersgruppe_text = "Frauen, ab 86";
                n = 9;
                altersgruppe_found = true;
                M_Norm = [51.12, 25.14];
                SD_Norm = [58.8, 18.45];
            };
        };

        var age_norm = {
            "phys_norm_m": M_Norm[0],
            "phys_norm_sd": SD_Norm[0],
            "psych_norm_m": M_Norm[1],
            "psych_norm_sd": SD_Norm[1],
            "altersgruppe": altersgruppe,
            "altersgruppe_text": altersgruppe_text,
            "altersgruppe_found": altersgruppe_found,
            "n": n,
            "m_norm": M_Norm,
            "sd_norm": SD_Norm,
            "age_filled": filled_age,
            "gender": gender
        };

        return age_norm;
    };

    calc.getPatientAgeMz = function(birth_date, survey_filled_date) {
        if (birth_date !== null) {
            var today = new Date(survey_filled_date);
            var birthDate = new Date(birth_date);
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            };
        } else {
            var age = 1;
        };

        return age;
    };


    // ------------------------------------------
    // F U N C T I O N  -  Main
    // ------------------------------------------
    calc.getResults = function(myResponses) {


        var result_array = calc.set_result_array(calc.result_array);


        var allResults = [];
        var currentPatient = myResponses.patient;



        var responses_array = myResponses.survey_responses;
        responses_array.forEach(function(response, myindex) {
            var d = {};
            d.result_array = calc.cloneObj(result_array);
            var result = response.data.response;



            // -----------------------------------------------
            // Calculate 'sum_score'
            // -----------------------------------------------

            // Berchnung PHYS
            var PHYS_sum = 0;
            var PHYS_avg = 0;
            PHYS_sum = PHYS_sum + (6 - parseInt(result['EWHOQOL39[EWHOQOL3]']));
            PHYS_sum = PHYS_sum + (6 - parseInt(result['EWHOQOL39[EWHOQOL4]']));
            PHYS_sum = PHYS_sum + parseInt(result['EWHOQOL1014[EWHOQOL10]']);
            PHYS_sum = PHYS_sum + parseInt(result['EWHOQOL15']);
            PHYS_sum = PHYS_sum + parseInt(result['EWHOQOL1625[EWHOQOL16]']);
            PHYS_sum = PHYS_sum + parseInt(result['EWHOQOL1625[EWHOQOL17]']);
            PHYS_sum = PHYS_sum + parseInt(result['EWHOQOL1625[EWHOQOL18]']);
            d.result_array[0].result.sum_score = PHYS_sum;


            // Berchnung PSYCH
            var PSYCH_sum = 0;
            var PSYCH_avg = 0;

            PSYCH_sum = PSYCH_sum + parseInt(result['EWHOQOL39[EWHOQOL5]']);
            PSYCH_sum = PSYCH_sum + parseInt(result['EWHOQOL39[EWHOQOL6]']);
            PSYCH_sum = PSYCH_sum + parseInt(result['EWHOQOL39[EWHOQOL7]']);
            PSYCH_sum = PSYCH_sum + parseInt(result['EWHOQOL1014[EWHOQOL11]']);
            PSYCH_sum = PSYCH_sum + parseInt(result['EWHOQOL1625[EWHOQOL19]']);
            PSYCH_sum = PSYCH_sum + (6 - parseInt(result['EWHOQOL26']));
            d.result_array[1].result.sum_score = PSYCH_sum;


            // -----------------------------------------------
            // Get Norm
            // -----------------------------------------------

            var age_when_filled = calc.getPatientAgeMz(currentPatient.data.birthdate, response.data.filled);
            var age_norm = calc.age_norm(age_when_filled, currentPatient.data.gender);

            // -----------------------------------------------
            // Calculate 'scale_score'  |  'z_score'
            // -----------------------------------------------

            d.result_array.forEach(function(res, myResID) {
                // scale_score
                var avg = res.result.sum_score / res.items;
                avg = (avg * 4 - 4) * (100 / 16);
                res.result.scale_score = calc.roundToOne(avg);

                if (age_norm.altersgruppe_found === true) {
                    res.result.z_score = calc.roundToOne((res.result.scale_score - age_norm.m_norm[myResID]) / age_norm.sd_norm[myResID]);
                    res.result.z_score_inverted = res.result.z_score * -1;
                };
            });


            // -----------------------------------------------
            // Messzeitpunkt
            // -----------------------------------------------
            var mz = {
                "mz_id": 99,
                "mz_typ": 'Undefined',
                "mz_text": 'Undefined'
            };

            if ("Erhebungszeitpunkt" in result) {
                mz.mz_id = parseInt(result['Erhebungszeitpunkt']);

                if (mz.mz_id === 1) {
                    mz.mz_typ = 'Eintritt';
                    mz.mz_text = 'Eintritt - Entwöhnungstherapie';
                };

                if (mz.mz_id === 2) {
                    mz.mz_typ = 'Austritt';
                    mz.mz_text = 'Austritt - Entwöhnungstherapie';
                };

                if (mz.mz_id === 3) {
                    mz.mz_typ = 'Anderer';
                    mz.mz_text = 'Anderer Messzeitpunkt: ' + result['andererZeitpunkt'];
                };
            };


            // -----------------------------------------------
            // Create 'all_results' Object
            // -----------------------------------------------

            var all_results_obj = calc.create_all_results(d.result_array);
            d.all_results = all_results_obj.all_results;


            // -----------------------------------------------
            // Do not break old Templates 
            // -----------------------------------------------
            d.PHYS_avg = d.all_results.koerperliche_lebensqualitaet_scale_score;
            d.PHYS_sum = d.all_results.koerperliche_lebensqualitaet_sum_score;
            d.PSYCH_avg = d.all_results.psychische_lebensqualitaet_scale_score;
            d.PSYCH_sum = d.all_results.psychische_lebensqualitaet_sum_score;


            // -----------------------------------------------
            // Store Definitions & write results back
            // -----------------------------------------------

            d.definitions = {};
            d.definitions.all_results_variables = all_results_obj.all_variables;
            d.definitions.result_array = result_array;
            d.definitions.variables = all_results_obj.variables;

            response.data.response_id = response.id;
            d.info = response.data;
            d.info.mz = mz;
            d.info.age_norm = age_norm;
            d.info.hash = result['optinomixHASH'];
            allResults.push(d);
        });

        return allResults;
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

    calc.roundToOne = function(num) {
        // Round a Number to 0.X 
        return +(Math.round(num + "e+1") + "e-1");
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


    // Return
    return calc.getResults(responses);



}