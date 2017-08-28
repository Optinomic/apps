function main(responses) {


        var calc = {};

        // ------------------------------------------
        // H e l p e r   -   F U N C T I O N S
        // ------------------------------------------

        // Runden
        calc.roundToOne = function(num) {
            return +(Math.round(num + "e+1") + "e-1");
        }

        // CH Datumsformat
        calc.formatDateCH = function(date_string) {
            date_string = date_string || null
            if (date_string !== null) {

                // 1952-11-19T00:00:00.000000000000Z
                var year = parseInt(date_string.substring(0, 4));
                var month = parseInt(date_string.substring(5, 7));
                var day = parseInt(date_string.substring(8, 10));
                var date_string_return = day + "." + month + "." + year

                return date_string_return;
            } else {
                return null;
            }
        };

        // Calculate AUDIT-Score 
        calc.AUDIT_Score = function(d, gender) {

            var score = 0;
            var count_valid_scores = 0;

            if (d.VZEA010 !== '999') {
                score = score + parseInt(d.VZEA010);
                count_valid_scores = count_valid_scores + 1;
            };

            if (d.VZEA020 !== '999') {
                score = score + parseInt(d.VZEA020);
                count_valid_scores = count_valid_scores + 1;
            };

            if (d.VZEA030 !== '999') {
                score = score + parseInt(d.VZEA030);
                count_valid_scores = count_valid_scores + 1;
            };

            if (d.VZEA040 !== '999') {
                score = score + parseInt(d.VZEA040);
                count_valid_scores = count_valid_scores + 1;
            };

            if (d.VZEA050 !== '999') {
                score = score + parseInt(d.VZEA050);
                count_valid_scores = count_valid_scores + 1;
            };

            if (d.VZEA060 !== '999') {
                score = score + parseInt(d.VZEA060);
                count_valid_scores = count_valid_scores + 1;
            }

            if (d.VZEA070 !== '999') {
                score = score + parseInt(d.VZEA070);
                count_valid_scores = count_valid_scores + 1;
            };

            if (d.VZEA080 !== '999') {
                score = score + parseInt(d.VZEA080);
                count_valid_scores = count_valid_scores + 1;
            };

            if (d.VZEA090 !== '999') {
                score = score + parseInt(d.VZEA090);
                count_valid_scores = count_valid_scores + 1;
            };

            if (d.VZEA100 !== '999') {
                score = score + parseInt(d.VZEA100);
                count_valid_scores = count_valid_scores + 1;
            };


            var anz_mw_to_add = 10 - count_valid_scores;
            var AUDIT_Score_Mean = calc.roundToOne(score / count_valid_scores);

            score = score + (anz_mw_to_add * AUDIT_Score_Mean);


            // Populations (Men / Woman)

            var scale_ranges_men = [{
                "from": 0,
                "to": 7,
                "result": "Risikoarmer Alkoholkonsum",
                "result_color": "#4CAF50"
            }, {
                "from": 8,
                "to": 15,
                "result": "Verdacht auf eine alkoholbezogene Störung",
                "result_color": "#FF9800"
            }, {
                "from": 16,
                "to": 40,
                "result": "Hohe Wahrscheinlichkeit einer Alkoholabhängigkeit",
                "result_color": "#F44336"
            }];

            var scale_ranges_woman = [{
                "from": 0,
                "to": 4,
                "result": "Risikoarmer Alkoholkonsum",
                "result_color": "#4CAF50"
            }, {
                "from": 5,
                "to": 14,
                "result": "Verdacht auf eine alkoholbezogene Störung",
                "result_color": "#FF9800"
            }, {
                "from": 15,
                "to": 40,
                "result": "Hohe Wahrscheinlichkeit einer Alkoholabhängigkeit",
                "result_color": "#F44336"
            }];


            // Current Population festlegen
            var current_population = {};

            if (gender === 'male') {
                // Mann
                current_population = scale_ranges_men;
            } else {
                // Frau
                current_population = scale_ranges_woman;
            };


            var selected_population = {};
            selected_population = current_population[0];

            if (score >= current_population[1].from) {
                selected_population = current_population[1];
            };
            if (score >= current_population[2].from) {
                selected_population = current_population[2];
            };


            var return_obj = {
                "AUDIT_Score": score,
                "AUDIT_Score_Mean": AUDIT_Score_Mean,
                "valid_scores": count_valid_scores,
                "gender": gender,
                "interpretation": selected_population,
                "ranges": { "ranges": current_population }
            };


            return return_obj;
        };


        // Calculate FAGERSTOEM-Score
        calc.FAGERSTROEM_Score = function(d, patient) {

            var patient_name = patient.last_name;

            if (patient.gender === 'male') {
                patient_name = 'Herr ' + patient_name;
                var nichtraucher = 'Nichtraucher';
            } else {
                patient_name = 'Frau ' + patient_name;
                var nichtraucher = 'Nichtraucherin';
            };


            var score = 0;
            var count_valid_scores = 0;
            var anwers = 0;

            if ((d.VZET020 !== '999') && (d.VZET020 !== '')) {
                score = score + parseInt(d.VZET020);
                count_valid_scores = count_valid_scores + 3;
                anwers = anwers + 1;
            };

            if ((d.VZET030 !== '999') && (d.VZET030 !== '')) {
                score = score + parseInt(d.VZET030);
                count_valid_scores = count_valid_scores + 3;
                anwers = anwers + 1;
            };

            if ((d.VZET040 !== '999') && (d.VZET040 !== '')) {
                score = score + parseInt(d.VZET040);
                count_valid_scores = count_valid_scores + 1;
                anwers = anwers + 1;
            };

            if ((d.VZET050 !== '999') && (d.VZET050 !== '')) {
                score = score + parseInt(d.VZET050);
                count_valid_scores = count_valid_scores + 1;
                anwers = anwers + 1;
            };

            if ((d.VZET060 !== '999') && (d.VZET060 !== '')) {
                score = score + parseInt(d.VZET060);
                count_valid_scores = count_valid_scores + 1;
                anwers = anwers + 1;
            };

            if ((d.VZET070 !== '999') && (d.VZET070 !== '')) {
                score = score + parseInt(d.VZET070);
                count_valid_scores = count_valid_scores + 1;
                anwers = anwers + 1;
            };

            var anz_mw_to_add = 10 - count_valid_scores;
            var Fagerstroem_Mean = calc.roundToOne(score / count_valid_scores);

            score = score + (anz_mw_to_add * Fagerstroem_Mean)


            var scale_ranges_fagerstoem = [{
                "from": 0,
                "to": 2,
                "result": "Gering ausgeprägte körperliche Nikotinabhängigkeit.",
                "result_color": "#4CAF50",
                "logo_speed": 10
            }, {
                "from": 3,
                "to": 4,
                "result": "Mittelstark ausgeprägte körperliche Nikotinabhängigkeit.",
                "result_color": "#FF9800",
                "logo_speed": 25
            }, {
                "from": 5,
                "to": 6,
                "result": "Stark ausgeprägte körperliche Nikotinabhängigkeit.",
                "result_color": "#F44336",
                "logo_speed": 50
            }, {
                "from": 7,
                "to": 10,
                "result": "Sehr stark ausgeprägte körperliche Nikotinabhängigkeit.",
                "result_color": "#F44336",
                "logo_speed": 55
            }];


            var selected_population = {};

            if (score !== null) {

                selected_population = scale_ranges_fagerstoem[0];

                if (score >= scale_ranges_fagerstoem[1].from) {
                    selected_population = scale_ranges_fagerstoem[1];
                };
                if (score >= scale_ranges_fagerstoem[2].from) {
                    selected_population = scale_ranges_fagerstoem[2];
                };
                if (score >= scale_ranges_fagerstoem[3].from) {
                    selected_population = scale_ranges_fagerstoem[3];
                };
            } else {
                selected_population = {
                    "from": 999,
                    "to": 999,
                    "result": "Keine Interpretation möglich.",
                    "result_color": "#F44336",
                    "logo_speed": 55
                }
            };



            var nikotin_konsum = parseInt(d.VZET010);
            var smoker = null;

            if ('VMEB001' in d) {
                var mz_date = d.VMEB001;
            } else {
                var mz_date = d.datestamp
            };

            var mz_datum = calc.formatDateCH(mz_date);



            switch (nikotin_konsum) {
                case 999:
                    var fagerstroem_text = "Das Rauchverhalten ist bei Eintritt nicht bekannt.";
                    break;
                case 1:
                    smoker = false;
                    var nichtraucher = "Nichtraucherin";
                    if (patient.gender === "male") {
                        nichtraucher = "Nichtraucher";
                    };

                    var fagerstroem_text = "Am " + mz_datum + " gab " + patient_name + " gab an, «" + nichtraucher + "» zu sein.";


                    break;
                default:

                    var fagerstroem_text = selected_population.result;
                    var fagerstroem_score = score;
                    smoker = true;

                    fagerstroem_text = "Bei Eintritt bestand eine «" + fagerstroem_text + "» (∑=" + fagerstroem_score + ")."

                    if (score === 999) {
                        fagerstroem_text = "Das Rauchverhalten ist bei Eintritt nicht bekannt.";
                    };

            };

            var smoker_obj = {
                "summyary": fagerstroem_text,
                "smoker": smoker,
                "date": mz_date,
                "datum": mz_datum
            };

            var return_obj = {
                "FAGERSTROEM_Score": score,
                "Fagerstroem_Mean": Fagerstroem_Mean,
                "valid_scores": count_valid_scores,
                "answers": anwers,
                "interpretation": selected_population,
                "ranges": { "ranges": scale_ranges_fagerstoem },
                "smoker": smoker_obj
            };


            return return_obj;
        };

        // Drinks / Gramm Alkohol berechnen
        calc.get_anz_g_alc = function(d) {

            var return_obj = {
                "gramm_total": 0,
                "drinks": [],
                "drinks_summary": ""
            };


            if (d['QZEA120[VZEA120a]'] !== "") {
                var gramm = parseInt(d['QZEA120[VZEA120a]']) * 0.4;
                var drink_obj = {
                    "drink": "Bier",
                    "gramm": gramm,
                    "volumenprozent ": 5,
                };
                if (gramm > 0) {
                    return_obj.gramm_total = return_obj.gramm_total + gramm;
                    return_obj.drinks.push(drink_obj);
                };
            };

            if (d['QZEA120[VZEA120b]'] !== "") {
                var gramm = parseInt(d['QZEA120[VZEA120b]']) * 0.4;
                var drink_obj = {
                    "drink": "Suure Most",
                    "gramm": gramm,
                    "volumenprozent": 5,
                };
                if (gramm > 0) {
                    return_obj.gramm_total = return_obj.gramm_total + gramm;
                    return_obj.drinks.push(drink_obj);
                };
            };

            if (d['QZEA120[VZEA120c]'] !== "") {
                var gramm = parseInt(d['QZEA120[VZEA120c]']) * 0.4;
                var drink_obj = {
                    "drink": "Alcopop",
                    "gramm": gramm,
                    "volumenprozent": 5,
                };
                if (gramm > 0) {
                    return_obj.gramm_total = return_obj.gramm_total + gramm;
                    return_obj.drinks.push(drink_obj);
                };
            };

            if (d['QZEA120[VZEA120d]'] !== "") {
                var gramm = parseInt(d['QZEA120[VZEA120d]']) * 0.4;
                var drink_obj = {
                    "drink": "Andere 5%",
                    "gramm": gramm,
                    "volumenprozent": 5,
                };
                if (gramm > 0) {
                    return_obj.gramm_total = return_obj.gramm_total + gramm;
                    return_obj.drinks.push(drink_obj);
                };
            };

            if (d['QZEA120[VZEA120e]'] !== "") {
                var gramm = parseInt(d['QZEA120[VZEA120e]']) * 0.96;
                var drink_obj = {
                    "drink": "Wein/Champagner/Sekt",
                    "gramm": gramm,
                    "volumenprozent": 12,
                };
                if (gramm > 0) {
                    return_obj.gramm_total = return_obj.gramm_total + gramm;
                    return_obj.drinks.push(drink_obj);
                };
            };

            if (d['QZEA120[VZEA120f]'] !== "") {
                var gramm = parseInt(d['QZEA120[VZEA120f]']) * 0.96;
                var drink_obj = {
                    "drink": "Andere 12%",
                    "gramm": gramm,
                    "volumenprozent": 12,
                };
                if (gramm > 0) {
                    return_obj.gramm_total = return_obj.gramm_total + gramm;
                    return_obj.drinks.push(drink_obj);
                };
            };

            if (d['QZEA120[VZEA120g]'] !== "") {
                var gramm = parseInt(d['QZEA120[VZEA120g]']) * 1.6;
                var drink_obj = {
                    "drink": "Wermut/Portwein",
                    "gramm": gramm,
                    "volumenprozent": 20,
                };
                if (gramm > 0) {
                    return_obj.gramm_total = return_obj.gramm_total + gramm;
                    return_obj.drinks.push(drink_obj);
                };
            };

            if (d['QZEA120[VZEA120h]'] !== "") {
                var gramm = parseInt(d['QZEA120[VZEA120h]']) * 1.6;
                var drink_obj = {
                    "drink": "Andere 20%",
                    "gramm": gramm,
                    "volumenprozent": 20,
                };
                if (gramm > 0) {
                    return_obj.gramm_total = return_obj.gramm_total + gramm;
                    return_obj.drinks.push(drink_obj);
                };
            };

            if (d['QZEA120[VZEA120i]'] !== "") {
                var gramm = parseInt(d['QZEA120[VZEA120i]']) * 3.2;
                var drink_obj = {
                    "drink": "Schnäpse (ink. Café Schnaps)",
                    "gramm": gramm,
                    "volumenprozent": 40,
                };
                if (gramm > 0) {
                    return_obj.gramm_total = return_obj.gramm_total + gramm;
                    return_obj.drinks.push(drink_obj);
                };
            };

            if (d['QZEA120[VZEA120j]'] !== "") {
                var gramm = parseInt(d['QZEA120[VZEA120j]']) * 3.2;
                var drink_obj = {
                    "drink": "Andere 40%",
                    "gramm": gramm,
                    "volumenprozent": 40,
                };
                if (gramm > 0) {
                    return_obj.gramm_total = return_obj.gramm_total + gramm;
                    return_obj.drinks.push(drink_obj);
                };
            };


            // Build Summary
            return_obj.drinks.forEach(function(drink, drinkID) {
                if (drinkID > 0) {
                    return_obj.drinks_summary = return_obj.drinks_summary + ', ';
                };

                var drink_text = drink.drink + ' (' + drink.gramm + 'g)';
                return_obj.drinks_summary = return_obj.drinks_summary + drink_text;
            });


            return return_obj;
        };

        // Problemsubstanzen aufzählen
        calc.Problem_Substanzen = function(response, patient) {

            var substanz = '';
            var answer_option = 0;
            var answer = 0;
            var my_result = {};
            var text = '';
            var obj_to_push = {};
            var problemsubstanzen = [];
            var patient_name = patient.last_name;

            if (patient.gender === 'male') {
                patient_name = 'Herr ' + patient_name;
                var nichtraucher = 'Nichtraucher';
            } else {
                patient_name = 'Frau ' + patient_name;
                var nichtraucher = 'Nichtraucherin';
            };

            var problemsubstanzen_label = {
                "answer_options": [{
                    "1": "täglich",
                    "2": "4-6 Tage pro Woche",
                    "3": "2-3 Tage pro Woche",
                    "4": "1 Tag pro Woche oder weniger",
                    "5": "kein Konsum",
                    "999": "nicht bekannt"
                }, {
                    "0": "0 bis 10 Zigaretten pro Tag",
                    "1": "11-20 Zigaretten pro Tag",
                    "2": "21-30 Zigaretten pro Tag",
                    "3": "31 und mehr Zigaretten pro Tag",
                    "999": "nicht bekannt"
                }, {
                    "1": "Nie",
                    "2": "1 Tag pro Woche oder weniger",
                    "3": "2-3 Tage pro Woche",
                    "4": "4-6 Tage pro Woche",
                    "5": "Einmal täglich",
                    "6": "Mehrmals täglich",
                    "999": "Nicht bekannt"
                }]
            };


            // Alkohol
            if (response['QNED0701[VNED070a]'] === 'Y') {
                substanz = 'Alkohol'
                answer_option = 0;
                answer = parseInt(response.VNED073a);

                my_result = problemsubstanzen_label.answer_options[answer_option];
                text = substanz + ': ' + my_result[answer];
                var g_alc = calc.get_anz_g_alc(response);


                obj_to_push = {
                    "substanz": substanz,
                    "label": my_result[answer] + ' jeweils ' + g_alc.gramm_total + 'g',
                    "drinks": g_alc
                };

                problemsubstanzen.push(obj_to_push);
            };

            // Nikotin
            var nikotin_konsum = parseInt(response.VZET010);

            if ((nikotin_konsum !== 1) && (nikotin_konsum !== 999)) {
                substanz = 'Tabak (Nikotin)'
                answer_option = 2;

                var FAGERSTROEM = calc.FAGERSTROEM_Score(response, patient);
                var fagerstroem_text = FAGERSTROEM.interpretation.result;
                var fagerstroem_score = FAGERSTROEM.FAGERSTROEM_Score;
                fagerstroem_text = "Bei Eintritt bestand eine «" + fagerstroem_text + "» (∑=" + fagerstroem_score + ")."

                my_result = problemsubstanzen_label.answer_options[answer_option];
                text = substanz + ': ' + my_result[nikotin_konsum];

                obj_to_push = {
                    "substanz": substanz,
                    "label": my_result[nikotin_konsum] + '. ' + fagerstroem_text
                };

                problemsubstanzen.push(obj_to_push);
            };

            //  if (response['QNED0707[VNED070i]'] === 'Y') {
            //      substanz = 'Nikotin / Tabak'
            //      answer_option = 1;
            //      answer = parseInt(response.VNED073i);
            //      var answer_tabak = parseInt(response.VZET020);
            //  
            //      my_result = problemsubstanzen_label.answer_options[answer_option];
            //      var my_tabak_result = problemsubstanzen_label.answer_options[1];
            //      text = substanz + ': ' + my_result[answer] + ' (' + my_tabak_result[answer_tabak] + ')';
            //  
            //      obj_to_push = {
            //          "substanz": substanz,
            //          "label": my_result[answer] + ' (' + my_tabak_result[answer_tabak] + ')'
            //      };
            //  
            //      problemsubstanzen.push(obj_to_push);
            //  };

            // Optiate
            if (response['QNED0702[VNED070ba]'] === 'Y') {
                substanz = 'Heroin (Opiat)'
                answer_option = 0;
                answer = parseInt(response.VNED073ba);

                my_result = problemsubstanzen_label.answer_options[answer_option];
                text = substanz + ': ' + my_result[answer];

                obj_to_push = {
                    "substanz": substanz,
                    "label": my_result[answer]
                };

                problemsubstanzen.push(obj_to_push);
            };

            if (response['QNED0702[VNED070bb]'] === 'Y') {
                substanz = 'Methadon (Opiat)'
                answer_option = 0;
                answer = parseInt(response.VNED073bb);

                my_result = problemsubstanzen_label.answer_options[answer_option];
                text = substanz + ': ' + my_result[answer];

                obj_to_push = {
                    "substanz": substanz,
                    "label": my_result[answer]
                };

                problemsubstanzen.push(obj_to_push);
            };

            if (response['QNED0702[VNED070bc]'] === 'Y') {
                substanz = 'Buprenorphin (Opiat)'
                answer_option = 0;
                answer = parseInt(response.VNED073bc);

                my_result = problemsubstanzen_label.answer_options[answer_option];
                text = substanz + ': ' + my_result[answer];

                obj_to_push = {
                    "substanz": substanz,
                    "label": my_result[answer]
                };

                problemsubstanzen.push(obj_to_push);
            };

            if (response['QNED0702[VNED070bd]'] === 'Y') {
                substanz = 'Fentanyl (Opiat)'
                answer_option = 0;
                answer = parseInt(response.VNED073bc);

                my_result = problemsubstanzen_label.answer_options[answer_option];
                text = substanz + ': ' + my_result[answer];

                obj_to_push = {
                    "substanz": substanz,
                    "label": my_result[answer]
                };

                problemsubstanzen.push(obj_to_push);
            };

            if (response['QNED0702[VNED070be]'] === 'Y') {
                substanz = 'Andere Opioide' + response.VNED071be
                answer_option = 0;
                answer = parseInt(response.VNED073bd);

                my_result = problemsubstanzen_label.answer_options[answer_option];
                text = substanz + ': ' + my_result[answer];

                obj_to_push = {
                    "substanz": substanz,
                    "label": my_result[answer]
                };

                problemsubstanzen.push(obj_to_push);
            };

            // Kokain
            if (response['QNED0703[VNED070ca]'] === 'Y') {
                substanz = 'Kokain-Pulver'
                answer_option = 0;
                answer = parseInt(response.VNED073ca);

                my_result = problemsubstanzen_label.answer_options[answer_option];
                text = substanz + ': ' + my_result[answer];

                obj_to_push = {
                    "substanz": substanz,
                    "label": my_result[answer]
                };

                problemsubstanzen.push(obj_to_push);
            };

            if (response['QNED0703[VNED070cb]'] === 'Y') {
                substanz = 'Crack-Kokain'
                answer_option = 0;
                answer = parseInt(response.VNED073cb);

                my_result = problemsubstanzen_label.answer_options[answer_option];
                text = substanz + ': ' + my_result[answer];

                obj_to_push = {
                    "substanz": substanz,
                    "label": my_result[answer]
                };

                problemsubstanzen.push(obj_to_push);
            };

            if (response['QNED0703[VNED070cc]'] === 'Y') {
                substanz = 'Anderer Kokain-Typ ' + response.VNED071cc
                answer_option = 0;
                answer = parseInt(response.VNED073cc);

                my_result = problemsubstanzen_label.answer_options[answer_option];
                text = substanz + ': ' + my_result[answer];

                obj_to_push = {
                    "substanz": substanz,
                    "label": my_result[answer]
                };

                problemsubstanzen.push(obj_to_push);
            };

            // Andere Stimulanzien
            if (response['QNED0704[VNED070da]'] === 'Y') {
                substanz = 'Amphetamine'
                answer_option = 0;
                answer = parseInt(response.VNED073da);

                my_result = problemsubstanzen_label.answer_options[answer_option];
                text = substanz + ': ' + my_result[answer];

                obj_to_push = {
                    "substanz": substanz,
                    "label": my_result[answer]
                };

                problemsubstanzen.push(obj_to_push);
            };

            if (response['QNED0704[VNED070db]'] === 'Y') {
                substanz = 'Methamphetamine (Crystal Meth, Ice, Thai-Pillen)'
                answer_option = 0;
                answer = parseInt(response.VNED073db);

                my_result = problemsubstanzen_label.answer_options[answer_option];
                text = substanz + ': ' + my_result[answer];

                obj_to_push = {
                    "substanz": substanz,
                    "label": my_result[answer]
                };

                problemsubstanzen.push(obj_to_push);
            };

            if (response['QNED0704[VNED070dc]'] === 'Y') {
                substanz = 'MDMA und verwandte Stoffe (Ecstasy)'
                answer_option = 0;
                answer = parseInt(response.VNED073dc);

                my_result = problemsubstanzen_label.answer_options[answer_option];
                text = substanz + ': ' + my_result[answer];

                obj_to_push = {
                    "substanz": substanz,
                    "label": my_result[answer]
                };

                problemsubstanzen.push(obj_to_push);
            };

            if (response['QNED0704[VNED070dd]'] === 'Y') {
                substanz = 'Synthetische Cathinone (Mephedron, Methylon, Methcathinon/Ephedron, MDPV, Methedron)'
                answer_option = 0;
                answer = parseInt(response.VNED073dd);

                my_result = problemsubstanzen_label.answer_options[answer_option];
                text = substanz + ': ' + my_result[answer];

                obj_to_push = {
                    "substanz": substanz,
                    "label": my_result[answer]
                };

                problemsubstanzen.push(obj_to_push);
            };

            if (response['QNED0704[VNED070de]'] === 'Y') {
                substanz = 'Andere Stimulanzien ' + response.VNED071de
                answer_option = 0;
                answer = parseInt(response.VNED073de);

                my_result = problemsubstanzen_label.answer_options[answer_option];
                text = substanz + ': ' + my_result[answer];

                obj_to_push = {
                    "substanz": substanz,
                    "label": my_result[answer]
                };

                problemsubstanzen.push(obj_to_push);
            };

            // Hypnotika/Sedativa

            if (response['QNED0705[VNED070ea]'] === 'Y') {
                substanz = 'Barbiturate (missbräuchlich)'
                answer_option = 0;
                answer = parseInt(response.VNED073ea);

                my_result = problemsubstanzen_label.answer_options[answer_option];
                text = substanz + ': ' + my_result[answer];

                obj_to_push = {
                    "substanz": substanz,
                    "label": my_result[answer]
                };

                problemsubstanzen.push(obj_to_push);
            };

            if (response['QNED0705[VNED070eb]'] === 'Y') {
                substanz = 'Benzodiazepine (missbräuchlich)'
                answer_option = 0;
                answer = parseInt(response.VNED073eb);

                my_result = problemsubstanzen_label.answer_options[answer_option];
                text = substanz + ': ' + my_result[answer];

                obj_to_push = {
                    "substanz": substanz,
                    "label": my_result[answer]
                };

                problemsubstanzen.push(obj_to_push);
            };

            if (response['QNED0705[VNED070ec]'] === 'Y') {
                substanz = 'GHB/GBL (K.O.-Tropfen)'
                answer_option = 0;
                answer = parseInt(response.VNED073ec);

                my_result = problemsubstanzen_label.answer_options[answer_option];
                text = substanz + ': ' + my_result[answer];

                obj_to_push = {
                    "substanz": substanz,
                    "label": my_result[answer]
                };

                problemsubstanzen.push(obj_to_push);
            };

            if (response['QNED0705[VNED070ed]'] === 'Y') {
                substanz = 'Andere Schlaf-/Beruhigungsmittel ' + response.VNED071ed
                answer_option = 0;
                answer = parseInt(response.VNED073ed);

                my_result = problemsubstanzen_label.answer_options[answer_option];
                text = substanz + ': ' + my_result[answer];

                obj_to_push = {
                    "substanz": substanz,
                    "label": my_result[answer]
                };

                problemsubstanzen.push(obj_to_push);
            };

            // Halluzinogene

            if (response['QNED0706[VNED070fa]'] === 'Y') {
                substanz = 'LSD'
                answer_option = 0;
                answer = parseInt(response.VNED073fa);

                my_result = problemsubstanzen_label.answer_options[answer_option];
                text = substanz + ': ' + my_result[answer];

                obj_to_push = {
                    "substanz": substanz,
                    "label": my_result[answer]
                };

                problemsubstanzen.push(obj_to_push);
            };

            if (response['QNED0706[VNED070fb]'] === 'Y') {
                substanz = 'Ketamin'
                answer_option = 0;
                answer = parseInt(response.VNED073fb);

                my_result = problemsubstanzen_label.answer_options[answer_option];
                text = substanz + ': ' + my_result[answer];

                obj_to_push = {
                    "substanz": substanz,
                    "label": my_result[answer]
                };

                problemsubstanzen.push(obj_to_push);
            };

            if (response['QNED0706[VNED070fc]'] === 'Y') {
                substanz = 'Andere Halluzinogene ' + response.VNED071fc
                answer_option = 0;
                answer = parseInt(response.VNED073fc);

                my_result = problemsubstanzen_label.answer_options[answer_option];
                text = substanz + ': ' + my_result[answer];

                obj_to_push = {
                    "substanz": substanz,
                    "label": my_result[answer]
                };

                problemsubstanzen.push(obj_to_push);
            };

            // Weitere Substanzen
            if (response['QNED0707[VNED070g]'] === 'Y') {
                substanz = 'Flüchtige Stoffe'
                answer_option = 0;
                answer = parseInt(response.VNED073g);

                my_result = problemsubstanzen_label.answer_options[answer_option];
                text = substanz + ': ' + my_result[answer];

                obj_to_push = {
                    "substanz": substanz,
                    "label": my_result[answer]
                };

                problemsubstanzen.push(obj_to_push);
            };

            if (response['QNED0707[VNED070h]'] === 'Y') {
                substanz = 'Cannabis'
                answer_option = 0;
                answer = parseInt(response.VNED073h);

                my_result = problemsubstanzen_label.answer_options[answer_option];
                text = substanz + ': ' + my_result[answer];

                obj_to_push = {
                    "substanz": substanz,
                    "label": my_result[answer]
                };

                problemsubstanzen.push(obj_to_push);
            };



            if (response['QNED0707[VNED070j]'] === 'Y') {
                substanz = response.VNED071j
                answer_option = 0;
                answer = parseInt(response.VNED073j);

                my_result = problemsubstanzen_label.answer_options[answer_option];
                text = substanz + ': ' + my_result[answer];

                obj_to_push = {
                    "substanz": substanz,
                    "label": my_result[answer]
                };

                problemsubstanzen.push(obj_to_push);
            };


            if (problemsubstanzen.length > 0) {
                var summary_description = "Folgende Substanzen konsumierte " + patient_name + " vor dem aktuellen Entzug in der angegebenen Häufigkeit:"
            } else {
                var summary_description = "Keine Angaben zu Problemsubstanzen vorhanden."
            };

            var return_obj = {
                "substanzen": problemsubstanzen,
                "description": summary_description
            };


            return return_obj;
        };


        // ------------------------------------------
        // F U N C T I O N  -  Main
        // ------------------------------------------
        calc.getResults = function(myResponses) {

            var responses_array = myResponses.survey_responses;
            var allResults = [];

            responses_array.forEach(function(response, myindex) {
                var myResults = {};
                var result = response.data.response;

                var patient = myResponses.patient.data;
                var gender = myResponses.patient.data.gender;

                // Something
                myResults.MZ = {
                    "mz_id": 1,
                    "mz_text": "Eintritt"
                };

                if ('VMEB001' in result) {
                    myResults.MZ.mz_date = result.VMEB001;
                } else {
                    myResults.MZ.mz_date = result.datestamp
                };

                myResults.MZ.mz_datum = calc.formatDateCH(myResults.MZ.mz_date);

                myResults.AUDIT = calc.AUDIT_Score(result, gender);
                myResults.FAGERSTROEM = calc.FAGERSTROEM_Score(result, patient);
                myResults.problemsubstanzen = calc.Problem_Substanzen(result, patient);


                // Write Results for the Return
                // Do not modify stuff here
                // myResults.full = myResponses;
                myResults.hash = result['optinomixHASH'];
                myResults.response = response;
                allResults.push(myResults);
            });

            return allResults;
        };


        // Return
        return calc.getResults(responses);



}