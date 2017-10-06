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
                "gramm": calc.roundToOne(gramm),
                "volumenprozent ": 5,
            };
            if (gramm > 0) {
                return_obj.gramm_total = calc.roundToOne(return_obj.gramm_total + gramm);
                return_obj.drinks.push(drink_obj);
            };
        };

        if (d['QZEA120[VZEA120b]'] !== "") {
            var gramm = parseInt(d['QZEA120[VZEA120b]']) * 0.4;
            var drink_obj = {
                "drink": "Suure Most",
                "gramm": calc.roundToOne(gramm),
                "volumenprozent": 5,
            };
            if (gramm > 0) {
                return_obj.gramm_total = calc.roundToOne(return_obj.gramm_total + gramm);
                return_obj.drinks.push(drink_obj);
            };
        };

        if (d['QZEA120[VZEA120c]'] !== "") {
            var gramm = parseInt(d['QZEA120[VZEA120c]']) * 0.4;
            var drink_obj = {
                "drink": "Alcopop",
                "gramm": calc.roundToOne(gramm),
                "volumenprozent": 5,
            };
            if (gramm > 0) {
                return_obj.gramm_total = calc.roundToOne(return_obj.gramm_total + gramm);
                return_obj.drinks.push(drink_obj);
            };
        };

        if (d['QZEA120[VZEA120d]'] !== "") {
            var gramm = parseInt(d['QZEA120[VZEA120d]']) * 0.4;
            var drink_obj = {
                "drink": "andere 5 Vol.-%",
                "gramm": calc.roundToOne(gramm),
                "volumenprozent": 5,
            };
            if (gramm > 0) {
                return_obj.gramm_total = calc.roundToOne(return_obj.gramm_total + gramm);
                return_obj.drinks.push(drink_obj);
            };
        };

        if (d['QZEA120[VZEA120e]'] !== "") {
            var gramm = parseInt(d['QZEA120[VZEA120e]']) * 0.96;
            var drink_obj = {
                "drink": "Wein/Champagner/Sekt",
                "gramm": calc.roundToOne(gramm),
                "volumenprozent": 12,
            };
            if (gramm > 0) {
                return_obj.gramm_total = calc.roundToOne(return_obj.gramm_total + gramm);
                return_obj.drinks.push(drink_obj);
            };
        };

        if (d['QZEA120[VZEA120f]'] !== "") {
            var gramm = parseInt(d['QZEA120[VZEA120f]']) * 0.96;
            var drink_obj = {
                "drink": "andere 12 Vol.-%",
                "gramm": calc.roundToOne(gramm),
                "volumenprozent": 12,
            };
            if (gramm > 0) {
                return_obj.gramm_total = calc.roundToOne(return_obj.gramm_total + gramm);
                return_obj.drinks.push(drink_obj);
            };
        };

        if (d['QZEA120[VZEA120g]'] !== "") {
            var gramm = parseInt(d['QZEA120[VZEA120g]']) * 1.6;
            var drink_obj = {
                "drink": "Wermut/Portwein",
                "gramm": calc.roundToOne(gramm),
                "volumenprozent": 20,
            };
            if (gramm > 0) {
                return_obj.gramm_total = calc.roundToOne(return_obj.gramm_total + gramm);
                return_obj.drinks.push(drink_obj);
            };
        };

        if (d['QZEA120[VZEA120h]'] !== "") {
            var gramm = parseInt(d['QZEA120[VZEA120h]']) * 1.6;
            var drink_obj = {
                "drink": "andere 20 Vol.-%",
                "gramm": calc.roundToOne(gramm),
                "volumenprozent": 20,
            };
            if (gramm > 0) {
                return_obj.gramm_total = calc.roundToOne(return_obj.gramm_total + gramm);
                return_obj.drinks.push(drink_obj);
            };
        };

        if (d['QZEA120[VZEA120i]'] !== "") {
            var gramm = parseInt(d['QZEA120[VZEA120i]']) * 3.2;
            var drink_obj = {
                "drink": "Schnäpse (ink. Café Schnaps)",
                "gramm": calc.roundToOne(gramm),
                "volumenprozent": 40,
            };
            if (gramm > 0) {
                return_obj.gramm_total = calc.roundToOne(return_obj.gramm_total + gramm);
                return_obj.drinks.push(drink_obj);
            };
        };

        if (d['QZEA120[VZEA120j]'] !== "") {
            var gramm = parseInt(d['QZEA120[VZEA120j]']) * 3.2;
            var drink_obj = {
                "drink": "andere 40 Vol.-%",
                "gramm": calc.roundToOne(gramm),
                "volumenprozent": 40,
            };
            if (gramm > 0) {
                return_obj.gramm_total = calc.roundToOne(return_obj.gramm_total + gramm);
                return_obj.drinks.push(drink_obj);
            };
        };


        // Build Summary
        var drink_text = '';
        return_obj.drinks.forEach(function(drink, drinkID) {
            if (drinkID > 0) {
                return_obj.drinks_summary = return_obj.drinks_summary + ', ';
            };

            if (return_obj.drinks.length > 1) {
                drink_text = drink.gramm + 'g ' + drink.drink;
            } else {
                drink_text = drink.drink;
            };
            return_obj.drinks_summary = return_obj.drinks_summary + drink_text;
        });

        if (return_obj.drinks.length > 1) {
            return_obj.drinks_summary = 'bestehend aus ' + return_obj.drinks_summary;
        } else {
            return_obj.drinks_summary = 'ausschliesslich ' + return_obj.drinks_summary;
        };

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
                "1": "Täglich",
                "2": "4-6 Tage pro Woche",
                "3": "2-3 Tage pro Woche",
                "4": "1 Tag pro Woche oder weniger",
                "5": "Kein Konsum",
                "999": "Nicht bekannt"
            }, {
                "0": "0 bis 10 Zigaretten pro Tag",
                "1": "11-20 Zigaretten pro Tag",
                "2": "21-30 Zigaretten pro Tag",
                "3": "31 und mehr Zigaretten pro Tag",
                "999": "Nicht bekannt"
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
            var audit = calc.AUDIT_Score(response, patient.gender);
            var audit_text = audit.interpretation.result;
            var audit_score = audit.AUDIT_Score;
            audit_text = "Bei Eintritt bestand eine «" + audit_text + "» (∑=" + audit_score + ")."

            obj_to_push = {
                "audit": audit_text,
                "substanz": substanz,
                "label": my_result[answer] + ', jeweils ' + g_alc.gramm_total + 'g (' + g_alc.drinks_summary + ').',
                "drinks": g_alc
            };

            if (g_alc.gramm_total === 0) {
                obj_to_push.label = my_result[answer];
            };

            problemsubstanzen.push(obj_to_push);
        };

        // Nikotin
        var nikotin_konsum = parseInt(response.VZET010);

        if ((nikotin_konsum !== 1) && (nikotin_konsum !== 999)) {
            substanz = 'Tabak (Nikotin)'

            var menge = parseInt(response.VZET020);
            var FAGERSTROEM = calc.FAGERSTROEM_Score(response, patient);
            var fagerstroem_text = FAGERSTROEM.interpretation.result;
            var fagerstroem_score = FAGERSTROEM.FAGERSTROEM_Score;
            fagerstroem_text = "Bei Eintritt bestand eine «" + fagerstroem_text + "» (∑=" + fagerstroem_score + ")."

            answer_option = 2;
            my_result = problemsubstanzen_label.answer_options[answer_option];

            answer_option = 1;
            my_result_menge = problemsubstanzen_label.answer_options[answer_option];

            obj_to_push = {
                "substanz": substanz,
                "label": my_result[nikotin_konsum] + ' (' + my_result_menge[menge] + ').',
                "fagerstroem": fagerstroem_text
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


        // Return
        var return_obj = {
            "substanzen": problemsubstanzen,
            "description": summary_description
        };


        return return_obj;
    };


    // Problemsubstanzen aufzählen
    calc.Zusatzangaben = function(response, patient) {

        // Anzahl Entzüge
        var anz_entzuege = parseInt(response['VYEE010']);
        var entzuege = {
            "angabe": anz_entzuege,
            "text": "Die Anzahl der bisherigen Entzugsbehandlungen ist nicht bekannt."
        };

        if (anz_entzuege === 0) {
            entzuege.text = "Es liegen keine professionell begleitete Entzugsbehandlungen vor."
        };

        if (anz_entzuege === 1) {
            entzuege.text = "Es handelt sich um die erste professionell begleitete Entzugsbehandlung."
        };

        if (anz_entzuege === 2) {
            entzuege.text = "Vor dem aktuellen Entzug wurde eine professionell begleitete Entzugsbehandlung durchgeführt."
        };

        if ((anz_entzuege === 3) || (anz_entzuege === 4) || (anz_entzuege === 5) || (anz_entzuege === 6)) {
            var count_text = "";
            if (anz_entzuege === 3) { count_text = "zwei" };
            if (anz_entzuege === 4) { count_text = "drei" };
            if (anz_entzuege === 5) { count_text = "vier" };
            if (anz_entzuege === 6) { count_text = "fünf oder mehr" };
            entzuege.text = "Vor dem aktuellen Entzug wurden " + count_text + " professionell begleitete Entzugsbehandlungen durchgeführt."
        };


        // Alter
        var hauptproblemsubstanzen = [];
        hauptproblemsubstanzen.push("Alkohol");
        hauptproblemsubstanzen.push("Heroin");
        hauptproblemsubstanzen.push("Methadon (missbräuchlich)");
        hauptproblemsubstanzen.push("Buprenorphin (missbräuchlich)");
        hauptproblemsubstanzen.push("Fentanyl (missbräuchlich)");
        hauptproblemsubstanzen.push("andere Opioide");
        hauptproblemsubstanzen.push("Kokain-Pulver");
        hauptproblemsubstanzen.push("Crack-Kokain");
        hauptproblemsubstanzen.push("Anderer Kokain-Typ");
        hauptproblemsubstanzen.push("Amphetamine");
        hauptproblemsubstanzen.push("Methamphetamine (Crystal Meth, Ice, Thai-Pillen)");
        hauptproblemsubstanzen.push("MDMA und verwandte Stoffe (Ecstasy)");
        hauptproblemsubstanzen.push("Synthetische Cathinone (Mephedron, Methylon, Methcathinon/Ephedron, MDPV, Methedron)");
        hauptproblemsubstanzen.push("andere Stimulanzien");
        hauptproblemsubstanzen.push("Barbiturate (missbräuchlich)");
        hauptproblemsubstanzen.push("Benzodiazepine (missbräuchlich)");
        hauptproblemsubstanzen.push("GHB/GBL");
        hauptproblemsubstanzen.push("andere Schlafmittel/Beruhigungsmittel");
        hauptproblemsubstanzen.push("LSD");
        hauptproblemsubstanzen.push("Ketamin");
        hauptproblemsubstanzen.push("andere Halluzinogene");
        hauptproblemsubstanzen.push("Flüchtige Stoffe");
        hauptproblemsubstanzen.push("Cannabis");
        hauptproblemsubstanzen.push("Tabak");
        hauptproblemsubstanzen.push("andere Substanzen (alle Typen)");
        hauptproblemsubstanzen.push("Glücksspielsucht");
        hauptproblemsubstanzen.push("Computer- bzw. Internetsucht");
        hauptproblemsubstanzen.push("Essstörungen");
        hauptproblemsubstanzen.push("andere suchtähnliche Verhaltensweisen (alle Typen)");

        var hauptproblem_substanz = parseInt(response['VNED010']);
        var konsumalter_regelmaessig = parseInt(response['VMED050']);
        var konsumalter_problematisch = parseInt(response['VMED060']);

        if (hauptproblem_substanz !== 999) {
            var hauptproblem_substanz_text = hauptproblemsubstanzen[hauptproblem_substanz - 1];
        } else {
            var hauptproblem_substanz_text = "Unbekannt";
        };


        var konsumalter = {
            "hauptproblem_substanz_angabe": hauptproblem_substanz,
            "hauptproblem_substanz_text": hauptproblem_substanz_text,
            "konsumalter_regelmaessig_angabe": konsumalter_regelmaessig,
            "konsumalter_probplematisch_angabe": konsumalter_problematisch,
            "kunsumalter_text": "",
            "konsumalter_done": false
        };

        if ((konsumalter_regelmaessig !== undefined) && (konsumalter_regelmaessig !== null)) {
            if (hauptproblem_substanz_text !== "Unbekannt") {
                konsumalter.kunsumalter_text = "Seit dem Alter von " + konsumalter.konsumalter_regelmaessig_angabe + " Jahren wurde die Hauptproblemsubstanz «" + konsumalter.hauptproblem_substanz_text + "» regelmässig konsumiert. ";
                konsumalter.hauptproblem_substanz_found = false;
            } else {
                konsumalter.kunsumalter_text = "Seit dem Alter von " + konsumalter.konsumalter_regelmaessig_angabe + " Jahren wurde die Hauptproblemsubstanz regelmässig konsumiert. ";
                konsumalter.hauptproblem_substanz_found = true;
            };
            konsumalter.konsumalter_done = true;
        };

        if ((konsumalter_problematisch !== undefined) && (konsumalter_problematisch !== null)) {
            konsumalter.kunsumalter_text = konsumalter.kunsumalter_text + "Ein problematischer Konsum besteht seit dem Alter von " + konsumalter.konsumalter_probplematisch_angabe + " Jahren.";
            konsumalter.konsumalter_done = true;
        };

        var zusatz = konsumalter;
        zusatz.entzuege_angabe = entzuege.angabe;
        zusatz.entzuege_text = entzuege.text;

        // Return

        return zusatz;
    };


    // ------------------------------------------
    // PDF
    // ------------------------------------------


    calc.pdfmake_problemsubstanzen = function(ps, list) {

        // console.warn('START: pdfmake_problemsubstanzen', ps);

        var d = {
            "stack": [],
        };

        // Inhalt
        var titel = {
            "text": "Problemsubstanzen",
            "style": "h2"
        };
        var einleitung = {
            "text": ps.description + " ",
            "style": "p"
        };

        var ps_list = {
            "ol": []
        };

        var ps_text = {
            "text": [],
        };
        ps_text.text.push(einleitung);


        ps.substanzen.forEach(function(s, sID) {
            var line = {
                "style": "p",
                "text": [
                    { "text": s.substanz + ": ", "bold": true },
                    { "text": s.label, "bold": false },
                ],
                "margin": [0, 6, 0, 0]
            };



            var trenner = "";
            if (sID !== 0) {
                trenner = "; ";
            };
            ps_text.text.push(trenner);
            ps_text.text.push(line.text[0]);
            ps_text.text.push(line.text[1]);

            if ("audit" in s) {
                line.text.push({ "text": " " + s.audit, "bold": false });
                ps_text.text.push({ "text": " " + s.audit, "bold": false });
            };
            if ("fagerstroem" in s) {
                line.text.push({ "text": " " + s.fagerstroem, "bold": false });
                ps_text.text.push({ "text": " " + s.fagerstroem, "bold": false });
            };
            ps_list.ol.push(line);
        });


        // Abfüllen
        d.stack.push(titel);

        if (list === true) {
            d.stack.push(einleitung);
            d.stack.push(ps_list);
        } else {
            d.stack.push(ps_text);
        };


        // console.warn('pdfmake_problemsubstanzen', d);
        // console.log(JSON.stringify(d, null, 2));

        return d;
    };

    calc.pdfmake_zusatzangaben = function(zusatz) {

        // console.warn('START: pdfmake_problemsubstanzen', ps);

        var d = {
            "stack": [],
        };

        // Inhalt


        var texte = {
            "text": zusatz.kunsumalter_text + " " + zusatz.entzuege_text,
            "style": "p"
        };


        // Abfüllen
        d.stack.push(texte);


        // console.warn('pdfmake_problemsubstanzen', d);
        // console.log(JSON.stringify(d, null, 2));

        return d;
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


            // -------------------------------------

            // Messzeitpunkt
            myResults.messzeitpunkt = {
                "mz_id": 1,
                "mz_text": "Eintritt"
            };

            if ('VMEB001' in result) {
                myResults.messzeitpunkt.mz_date = result.VMEB001;
            } else {
                myResults.messzeitpunkt.mz_date = result.datestamp
            };
            myResults.messzeitpunkt.mz_datum = calc.formatDateCH(myResults.messzeitpunkt.mz_date);

            // AUDIT & FAGERSTROEM
            myResults.AUDIT = calc.AUDIT_Score(result, patient.gender);
            myResults.FAGERSTROEM = calc.FAGERSTROEM_Score(result, patient);

            // Problemsubstanzen
            myResults.problemsubstanzen = calc.Problem_Substanzen(result, patient);
            myResults.zusatzangaben = calc.Zusatzangaben(result, patient);


            // Prebuild PDF (http://pdfmake.org/)
            myResults.pdfmake = {};
            myResults.pdfmake.problemsubstanzen_ol = calc.pdfmake_problemsubstanzen(myResults.problemsubstanzen, true);
            myResults.pdfmake.problemsubstanzen_text = calc.pdfmake_problemsubstanzen(myResults.problemsubstanzen, false);
            myResults.pdfmake.zusatzangaben_text = calc.pdfmake_zusatzangaben(myResults.zusatzangaben);


            // -------------------------------------
            // Write Results for the Return
            // Do not modify stuff here
            // -------------------------------------
            myResults.hash = result['optinomixHASH'];
            myResults.response = response;
            allResults.push(myResults);
        });

        return allResults;
    };


    // Return
    return calc.getResults(responses);



}