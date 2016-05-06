/**
 * @name Optinomic - AppCtrl
 * ---------------------------------------
 * Controller of the Optinomic-Application.
 */
app.controller('AppCtrl', function($scope, dataService, scopeDService) {

    // -----------------------------------
    // Init
    // -----------------------------------

    // Data-Sharing (do not remove)
    $scope.d = scopeDService;


    // -----------------------------------
    // Functions
    // -----------------------------------

    $scope.loadMainData = function() {
        // -----------------------------------
        // Get Data: d.dataMain
        // -----------------------------------
        $scope.d.haveData = false;
        var dataPromiseMain = dataService.getMainAppData();
        dataPromiseMain.then(function(data) {

            // Save Data to $scope.d
            $scope.d.dataMain = data;

            // Check if we have survey_responses @ data.
            if (data.survey_responses.length !== 0) {
                console.log('(DATA): survey_responses:', data.survey_responses.length, data.survey_responses);
                $scope.d.haveData = true;


                // Run App-Functions:
                $scope.actInfoInit();
                $scope.setExport();



            };

            // Run Public-Functions:
            $scope.d.functions.getAllCalculations();


            // Finishing: Console Info & Init = done.
            console.log('Welcome, ', $scope.d.dataMain.apps.current.name, $scope.d);
            $scope.d.init = true;
        });
    };
    $scope.loadMainData();



    $scope.actInfoInit = function() {


        $scope.d.problemsubstanzen_label = {
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
            }]
        };


        // Problemsubstanzen ermitteln

        $scope.d.problemsubstanzen = [];

        var results = $scope.d.dataMain.survey_responses_group[0];

        results.forEach(function(result, myindex) {
            var response = result.entity.data.response;


            // Alkohol
            if (response['QNED0701[VNED070a]'] === 'Y') {
                var substanz = 'Alkohol'
                var answer_option = 0;
                var answer = parseInt(response.VNED073a);

                var my_result = $scope.d.problemsubstanzen_label.answer_options[answer_option];
                var text = substanz + ': ' + my_result[answer];

                $scope.d.problemsubstanzen.push(text);
            };

            // Optiate
            if (response.['QNED0702[VNED070ba]'] === 'Y') {
                var substanz = 'Heroin (Optiat)'
                var answer_option = 0;
                var answer = parseInt(response.VNED073ba);

                var my_result = $scope.label.answer_options[answer_option];
                var text = substanz + ': ' + my_result[answer];

                $scope.d.problemsubstanzen.push(text);
            };

            if (response.['QNED0702[VNED070bb]'] === 'Y') {
                var substanz = 'Methadon (Optiat)'
                var answer_option = 0;
                var answer = parseInt(response.VNED073bb);

                var my_result = $scope.label.answer_options[answer_option];
                var text = substanz + ': ' + my_result[answer];

                $scope.d.problemsubstanzen.push(text);
            };

            if (response.['QNED0702[VNED070bc]'] === 'Y') {
                var substanz = 'Buprenorphin (Optiat)'
                var answer_option = 0;
                var answer = parseInt(response.VNED073bc);

                var my_result = $scope.label.answer_options[answer_option];
                var text = substanz + ': ' + my_result[answer];

                $scope.d.problemsubstanzen.push(text);
            };

            if (response.['QNED0702[VNED070bd]'] === 'Y') {
                var substanz = 'Fentanyl (Optiat)'
                var answer_option = 0;
                var answer = parseInt(response.VNED073bc);

                var my_result = $scope.label.answer_options[answer_option];
                var text = substanz + ': ' + my_result[answer];

                $scope.d.problemsubstanzen.push(text);
            };

            if (response.['QNED0702[VNED070be]'] === 'Y') {
                var substanz = 'Andere Opioide' + response.VNED071be
                var answer_option = 0;
                var answer = parseInt(response.VNED073bd);

                var my_result = $scope.label.answer_options[answer_option];
                var text = substanz + ': ' + my_result[answer];

                $scope.d.problemsubstanzen.push(text);
            };

            // Kokain
            if (response.['QNED0703[VNED070ca]'] === 'Y') {
                var substanz = 'Kokain-Pulver'
                var answer_option = 0;
                var answer = parseInt(response.VNED073ca);

                var my_result = $scope.label.answer_options[answer_option];
                var text = substanz + ': ' + my_result[answer];

                $scope.d.problemsubstanzen.push(text);
            };

            if (response.['QNED0703[VNED070cb]'] === 'Y') {
                var substanz = 'Crack-Kokain'
                var answer_option = 0;
                var answer = parseInt(response.VNED073cb);

                var my_result = $scope.label.answer_options[answer_option];
                var text = substanz + ': ' + my_result[answer];

                $scope.d.problemsubstanzen.push(text);
            };

            if (response.['QNED0703[VNED070cc]'] === 'Y') {
                var substanz = 'Anderer Kokain-Typ ' + response.VNED071cc
                var answer_option = 0;
                var answer = parseInt(response.VNED073cc);

                var my_result = $scope.label.answer_options[answer_option];
                var text = substanz + ': ' + my_result[answer];

                $scope.d.problemsubstanzen.push(text);
            };

            // Andere Stimulanzien
            if (response.['QNED0704[VNED070da]'] === 'Y') {
                var substanz = 'Amphetamine'
                var answer_option = 0;
                var answer = parseInt(response.VNED073da);

                var my_result = $scope.label.answer_options[answer_option];
                var text = substanz + ': ' + my_result[answer];

                $scope.d.problemsubstanzen.push(text);
            };

            if (response.['QNED0704[VNED070db]'] === 'Y') {
                var substanz = 'Methamphetamine (Crystal Meth, Ice, Thai-Pillen)'
                var answer_option = 0;
                var answer = parseInt(response.VNED073db);

                var my_result = $scope.label.answer_options[answer_option];
                var text = substanz + ': ' + my_result[answer];

                $scope.d.problemsubstanzen.push(text);
            };

            if (response.['QNED0704[VNED070dc]'] === 'Y') {
                var substanz = 'MDMA und verwandte Stoffe (Ecstasy)'
                var answer_option = 0;
                var answer = parseInt(response.VNED073dc);

                var my_result = $scope.label.answer_options[answer_option];
                var text = substanz + ': ' + my_result[answer];

                $scope.d.problemsubstanzen.push(text);
            };

            if (response.['QNED0704[VNED070dd]'] === 'Y') {
                var substanz = 'Synthetische Cathinone (Mephedron, Methylon, Methcathinon/Ephedron, MDPV, Methedron)'
                var answer_option = 0;
                var answer = parseInt(response.VNED073dd);

                var my_result = $scope.label.answer_options[answer_option];
                var text = substanz + ': ' + my_result[answer];

                $scope.d.problemsubstanzen.push(text);
            };

            if (response.['QNED0704[VNED070de]'] === 'Y') {
                var substanz = 'Andere Stimulanzien ' + response.VNED071de
                var answer_option = 0;
                var answer = parseInt(response.VNED073de);

                var my_result = $scope.label.answer_options[answer_option];
                var text = substanz + ': ' + my_result[answer];

                $scope.d.problemsubstanzen.push(text);
            };

            // Hypnotika/Sedativa

            if (response.['QNED0705[VNED070ea]'] === 'Y') {
                var substanz = 'Barbiturate (missbräuchlich)'
                var answer_option = 0;
                var answer = parseInt(response.VNED073ea);

                var my_result = $scope.label.answer_options[answer_option];
                var text = substanz + ': ' + my_result[answer];

                $scope.d.problemsubstanzen.push(text);
            };

            if (response.['QNED0705[VNED070eb]'] === 'Y') {
                var substanz = 'Benzodiazepine (missbräuchlich)'
                var answer_option = 0;
                var answer = parseInt(response.VNED073eb);

                var my_result = $scope.label.answer_options[answer_option];
                var text = substanz + ': ' + my_result[answer];

                $scope.d.problemsubstanzen.push(text);
            };

            if (response.['QNED0705[VNED070ec]'] === 'Y') {
                var substanz = 'GHB/GBL (K.O.-Tropfen)'
                var answer_option = 0;
                var answer = parseInt(response.VNED073ec);

                var my_result = $scope.label.answer_options[answer_option];
                var text = substanz + ': ' + my_result[answer];

                $scope.d.problemsubstanzen.push(text);
            };

            if (response.['QNED0705[VNED070ed]'] === 'Y') {
                var substanz = 'Andere Schlaf-/Beruhigungsmittel ' + response.VNED071ed
                var answer_option = 0;
                var answer = parseInt(response.VNED073ed);

                var my_result = $scope.label.answer_options[answer_option];
                var text = substanz + ': ' + my_result[answer];

                $scope.d.problemsubstanzen.push(text);
            };

            // Halluzinogene

            if (response.['QNED0706[VNED070fa]'] === 'Y') {
                var substanz = 'LSD'
                var answer_option = 0;
                var answer = parseInt(response.VNED073fa);

                var my_result = $scope.label.answer_options[answer_option];
                var text = substanz + ': ' + my_result[answer];

                $scope.d.problemsubstanzen.push(text);
            };

            if (response.['QNED0706[VNED070fb]'] === 'Y') {
                var substanz = 'Ketamin'
                var answer_option = 0;
                var answer = parseInt(response.VNED073fb);

                var my_result = $scope.label.answer_options[answer_option];
                var text = substanz + ': ' + my_result[answer];

                $scope.d.problemsubstanzen.push(text);
            };

            if (response.['QNED0706[VNED070fc]'] === 'Y') {
                var substanz = 'Andere Halluzinogene ' + response.VNED071fc
                var answer_option = 0;
                var answer = parseInt(response.VNED073fc);

                var my_result = $scope.label.answer_options[answer_option];
                var text = substanz + ': ' + my_result[answer];

                $scope.d.problemsubstanzen.push(text);
            };

            // Weitere Substanzen
            if (response.['QNED0707[VNED070g]'] === 'Y') {
                var substanz = 'Flüchtige Stoffe'
                var answer_option = 0;
                var answer = parseInt(response.VNED073g);

                var my_result = $scope.label.answer_options[answer_option];
                var text = substanz + ': ' + my_result[answer];

                $scope.d.problemsubstanzen.push(text);
            };

            if (response.['QNED0707[VNED070h]'] === 'Y') {
                var substanz = 'Cannabis'
                var answer_option = 0;
                var answer = parseInt(response.VNED073h);

                var my_result = $scope.label.answer_options[answer_option];
                var text = substanz + ': ' + my_result[answer];

                $scope.d.problemsubstanzen.push(text);
            };

            if (response.['QNED0707[VNED070i]'] === 'Y') {
                var substanz = 'Tabak'
                var answer_option = 0;
                var answer = parseInt(response.VNED073i);
                var answer_tabak = parseInt(response.VZET020);

                var my_result = $scope.label.answer_options[answer_option];
                var my_tabak_result = $scope.label.answer_options[1];
                var text = substanz + ': ' + my_result[answer] + ' (' + my_tabak_result[answer_tabak] + ')';

                $scope.d.problemsubstanzen.push(text);
            };

            if (response.['QNED0707[VNED070j]'] === 'Y') {
                var substanz = response.VNED071j
                var answer_option = 0;
                var answer = parseInt(response.VNED073j);

                var my_result = $scope.label.answer_options[answer_option];
                var text = substanz + ': ' + my_result[answer];

                $scope.d.problemsubstanzen.push(text);
            };


            console.log('actInfoInit', $scope.d.problemsubstanzen);

        });
    };

    $scope.setExport = function() {


        // ------------------------------------------------
        // Export - Pakete definieren
        // i n c l u d e _ a s _ j s _ s t r i n g 
        // => (export.sql) muss sich in /includes befinden
        // ------------------------------------------------


        // Hinzufügen gespeicherter SQL-Dateien in /includes
        var module_packages = [];
        var data_query = {};

        data_query = {
            name: 'actInfo - Eintritt (Start)',
            sql: include_as_js_string(
                export.sql)
        };
        module_packages.push(data_query);

        // Init the given Export Settings
        $scope.d.sql_box = $scope.d.functions.getDefaultExportSettings($scope.d.dataMain.params.app_id, module_packages);
    };




    // -----------------------------------
    // <score-threshold>
    // -----------------------------------

    // Ranges initialisieren
    $scope.scale_ranges = {
        "ranges": [{
            "from": 0,
            "to": 8,
            "result": "Keine Depression",
            "result_color": "green"
        }, {
            "from": 9,
            "to": 13,
            "result": "Minimale Depression",
            "result_color": "green"
        }, {
            "from": 14,
            "to": 19,
            "result": "Leichte Depression",
            "result_color": "orange"
        }, {
            "from": 20,
            "to": 28,
            "result": "Mittelschwere Depression",
            "result_color": "orange"
        }, {
            "from": 29,
            "to": 63,
            "result": "Schwere Depression",
            "result_color": "red"
        }]
    };




});
