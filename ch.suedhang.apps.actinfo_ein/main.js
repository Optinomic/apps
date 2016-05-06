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
