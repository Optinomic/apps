// 'ch.suedhang.apps.actinfo_ein'
d.actinfo_ein_get_problemsubstanzen_table = function(results) {
    // var results = $scope.d.dataMain.survey_responses_group[0];

    var problemsubstanzen_label = {
        "answer_options": [{
            "1": " täglich",
            "2": " 4-6 Tage pro Woche",
            "3": " 2-3 Tage pro Woche",
            "4": " 1 Tag pro Woche oder weniger",
            "5": " kein Konsum",
            "999": " nicht bekannt"
        }, {
            "0": " 0 bis 10 Zigaretten pro Tag",
            "1": " 11-20 Zigaretten pro Tag",
            "2": " 21-30 Zigaretten pro Tag",
            "3": " 31 und mehr Zigaretten pro Tag",
            "999": " nicht bekannt"
        }]
    };

    var tables = [];


    var current_results = [];
    current_results.push(results[results.length - 1]);


    // Problemsubstanzen ermitteln
    current_results.forEach(function(result, myindex) {
        console.log('ch.suedhang.apps.actinfo_ein ==== ', result);

        var response = result.entity.data.response;
        result.problemsubstanzen = [];

        var substanz = '';
        var answer_option = 0;
        var answer = 0;
        var my_result = {};
        var text = '';
        var obj_to_push = {};


        // Alkohol
        if (response['QNED0701[VNED070a]'] === 'Y') {
            substanz = 'Alkohol'
            answer_option = 0;
            answer = parseInt(response.VNED073a);

            my_result = problemsubstanzen_label.answer_options[answer_option];
            text = substanz + ': ' + my_result[answer];

            obj_to_push = {
                "substanz": substanz,
                "label": my_result[answer]
            };

            result.problemsubstanzen.push(obj_to_push);
        };

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

            result.problemsubstanzen.push(obj_to_push);
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

            result.problemsubstanzen.push(obj_to_push);
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

            result.problemsubstanzen.push(obj_to_push);
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

            result.problemsubstanzen.push(obj_to_push);
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

            result.problemsubstanzen.push(obj_to_push);
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

            result.problemsubstanzen.push(obj_to_push);
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

            result.problemsubstanzen.push(obj_to_push);
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

            result.problemsubstanzen.push(obj_to_push);
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

            result.problemsubstanzen.push(obj_to_push);
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

            result.problemsubstanzen.push(obj_to_push);
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

            result.problemsubstanzen.push(obj_to_push);
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

            result.problemsubstanzen.push(obj_to_push);
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

            result.problemsubstanzen.push(obj_to_push);
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

            result.problemsubstanzen.push(obj_to_push);
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

            result.problemsubstanzen.push(obj_to_push);
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

            result.problemsubstanzen.push(obj_to_push);
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

            result.problemsubstanzen.push(obj_to_push);
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

            result.problemsubstanzen.push(obj_to_push);
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

            result.problemsubstanzen.push(obj_to_push);
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

            result.problemsubstanzen.push(obj_to_push);
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

            result.problemsubstanzen.push(obj_to_push);
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

            result.problemsubstanzen.push(obj_to_push);
        };

        if (response['QNED0707[VNED070i]'] === 'Y') {
            substanz = 'Tabak'
            answer_option = 0;
            answer = parseInt(response.VNED073i);
            var answer_tabak = parseInt(response.VZET020);

            my_result = problemsubstanzen_label.answer_options[answer_option];
            var my_tabak_result = problemsubstanzen_label.answer_options[1];
            text = substanz + ': ' + my_result[answer] + ' (' + my_tabak_result[answer_tabak] + ')';

            obj_to_push = {
                "substanz": substanz,
                "label": my_result[answer] + ' (' + my_tabak_result[answer_tabak] + ')'
            };

            result.problemsubstanzen.push(obj_to_push);
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

            result.problemsubstanzen.push(obj_to_push);
        };


        var table_to_push = {
            "problemsubstanzen": result.problemsubstanzen,
            "datum": $filter("amDateFormat")(result.entity.data.response.VMEB001, 'DD.MM.YYYY')
        };

        tables.push(table_to_push);
    });

    return tables;
};
