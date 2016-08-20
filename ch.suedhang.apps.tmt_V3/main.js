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
                $scope.setZScore();
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
            name: 'WHQOL-Example (with stay)',
            sql: include_as_js_string(
                export.sql)
        };
        module_packages.push(data_query);

        // Init the given Export Settings
        $scope.d.sql_box = $scope.d.functions.getDefaultExportSettings($scope.d.dataMain.params.app_id, module_packages);

    };


    $scope.setZScore = function() {

        $scope.d.zScore = {};
        $scope.d.zScore.toggles = {
            "show_numbers": false,
            "show_clinicsample": true,
            "show_text": true
        };

        $scope.d.zScore.data_eintritt = {
            "zscore": 1.2,
            "zscore_min": -5.2,
            "zscore_max": 3.1,
            "text_left": "Ungünstige Somatisierung",
            "text_left_caption": "Dies ist eine sehr lange Beschreibung, welche so nicht vorkommen darf.",
            "text_right": "Text rechts",
            "text_right_caption": "Text rechts",
            "clinicsample_start": -2,
            "clinicsample_end": 1.8,
            "marker_1_score": null,
            "marker_1_text": "Zeitabbruch",
            "show_numbers": $scope.d.zScore.toggles.show_numbers,
            "show_clinicsample": $scope.d.zScore.toggles.show_clinicsample,
            "show_text": $scope.d.zScore.toggles.show_text,
        };
        $scope.d.zScore.data_austritt = {
            "zscore": 3.2,
            "zscore_min": -5.2,
            "zscore_max": 3.1,
            "text_left": "Ungünstige Somatisierung",
            "text_left_caption": "Dies ist eine sehr lange Beschreibung, welche so nicht vorkommen darf.",
            "text_right": "Text rechts",
            "text_right_caption": "Text rechts",
            "clinicsample_start": -2,
            "clinicsample_end": 1.8,
            "marker_1_score": null,
            "marker_1_text": "Zeitabbruch",
            "show_numbers": $scope.d.zScore.toggles.show_numbers,
            "show_clinicsample": $scope.d.zScore.toggles.show_clinicsample,
            "show_text": $scope.d.zScore.toggles.show_text,
        };
    };



});
