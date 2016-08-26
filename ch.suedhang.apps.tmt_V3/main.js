/**
 * @name Optinomic - AppCtrl
 * ---------------------------------------
 * Controller of the Optinomic-Application.
 */
app.controller('AppCtrl', function($scope, $filter, dataService, scopeDService) {

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

            // Run Public-Functions:
            $scope.d.functions.getAllCalculations();

            // Check if we have survey_responses @ data.
            if (data.survey_responses.length !== 0) {
                console.log('(DATA): survey_responses:', data.survey_responses.length, data.survey_responses);
                $scope.d.haveData = true;


                // Run App-Functions:
                $scope.initZScore();
                $scope.setExport();

            };



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



    // -------------------------------------------
    // Array - Functions
    // -------------------------------------------

    $scope.sortByKey = function(array, key) {
        return array.sort(function(a, b) {
            var x = a[key];
            var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    };


    $scope.addDefault = function(obj) {

        // Add Defaults for all Scores
        obj.zscore_min = -3;
        obj.zscore_max = 3;
        obj.clinicsample_start = -1;
        obj.clinicsample_end = -1;
        obj.clinicsample_color = '#3F51B5';


        // Add Toggle Settings
        obj.show_text = $scope.d.zScore.toggles.show_text;
        obj.show_clinicsample = $scope.d.zScore.toggles.show_clinicsample;
        obj.show_clinicsample_scores = $scope.d.zScore.toggles.show_clinicsample_scores;


        return obj;
    };



    $scope.initZScore = function() {
        $scope.d.zScore = {};
        $scope.d.zScore.init = false;

        // Toggles | Grafiken
        $scope.d.zScore.toggles = {
            "show_text": true,
            "show_clinicsample": false,
            "show_clinicsample_scores": false
        };

        // Klinische Stichprobe
        $scope.d.zScore.normgruppe_klinik = {};
        $scope.d.zScore.normgruppe_klinik.selected_pg_id = null;
        $scope.d.zScore.normgruppe_klinik.selected_pg = 'Keine klinische Stichprobe gewählt';


        $scope.setZScore();

    };


    $scope.changeClinicSample = function() {
        // Wenn Stichprobe gewählt automatisch anzeigen:
        if ($scope.d.zScore.normgruppe_klinik.selected_pg_id !== null) {
            $scope.d.zScore.toggles.show_clinicsample = true;
        } else {
            $scope.d.zScore.toggles.show_clinicsample = false;
        };

        // Name setzen
        $scope.d.zScore.normgruppe_klinik.selected_pg = $scope.d.dataMain.patient_groups[$scope.d.zScore.normgruppe_klinik.selected_pg_id].data.name;

        // Bei Änderungen ausführen.
        $scope.setZScore();
    };


    $scope.setZScore = function() {

        // INIT
        var messung = {};
        $scope.d.zScore.tmt_a = [];
        $scope.d.zScore.tmt_b = [];

        var messungen = $scope.d.dataMain.calculations[0].calculation_results;

        // Check if Eintritt & Austrittsmessung vorhanden
        var messungen_info = {
            "eintritt": false,
            "austritt": false,
            "anderer": false,
            "ein_und_austritt": false,
            "count": messungen.length
        };


        messungen.forEach(function(current_messung, myMessungIndex) {

            var mz_text = current_messung.Messzeitpunkt.Messzeitpunkt_Text;
            var mz_datestamp = current_messung.response.data.response.Date;
            var mz_datum = $filter('date')(mz_datestamp);

            var messung = {
                "zscore": 0,
                "text_left": mz_text,
                "text_left_caption": mz_datum,
                "datum": mz_datum,
                "datestamp": mz_datestamp
            };

            // TMT - A
            var A_messung = angular.copy(messung);
            A_messung = $scope.addDefault(A_messung);
            A_messung.zscore = current_messung.percentile.z_scores.tmtA_z_rounded;
            A_messung.text_right = 'TMT A';
            A_messung.text_right_caption = '';
            $scope.d.zScore.tmt_a.push(A_messung);


            // TMT - B
            var B_messung = angular.copy(messung);
            B_messung = $scope.addDefault(B_messung);
            B_messung.zscore = current_messung.percentile.z_scores.tmtB_z_rounded;
            B_messung.text_right = 'TMT B';
            B_messung.text_right_caption = '';
            $scope.d.zScore.tmt_b.push(B_messung);

            // Messzeitpunkt Info setzen

            if (current_messung.Messzeitpunkt.Messzeitpunkt === 1) {
                messungen_info.eintritt = true;
            };
            if (current_messung.Messzeitpunkt.Messzeitpunkt === 2) {
                messungen_info.austritt = true;
            };
            if (current_messung.Messzeitpunkt.Messzeitpunkt === 3) {
                messungen_info.anderer = true;
            };

        });

        // Sort Arrays
        $scope.d.zScore.tmt_a = $scope.sortByKey($scope.d.zScore.tmt_a, 'datestamp');
        $scope.d.zScore.tmt_b = $scope.sortByKey($scope.d.zScore.tmt_b, 'datestamp');


        // Check if Eintritt & Austrittsmessung vorhanden
        if ((messungen_info.eintritt) && (messungen_info.austritt)) {
            messungen_info.ein_und_austritt = true;
        };

        $scope.d.zScore.messungen_info = messungen_info;


        // Abgeschlossen
        $scope.d.zScore.init = true;


        // Grafiken anpassen gemäss | Toggles

        //  $scope.d.zScore.tmt_a.eintritt.show_text = $scope.d.zScore.toggles.show_text;
        //  $scope.d.zScore.tmt_a.eintritt.show_clinicsample = $scope.d.zScore.toggles.show_clinicsample;
        //  $scope.d.zScore.tmt_a.eintritt.show_clinicsample_scores = $scope.d.zScore.toggles.show_clinicsample_scores;
        //  
        //  $scope.d.zScore.tmt_a.austritt.show_text = $scope.d.zScore.toggles.show_text;
        //  $scope.d.zScore.tmt_a.austritt.show_clinicsample = $scope.d.zScore.toggles.show_clinicsample;
        //  $scope.d.zScore.tmt_a.austritt.show_clinicsample_scores = $scope.d.zScore.toggles.show_clinicsample_scores;
        //  
        //  $scope.d.zScore.tmt_b.eintritt.show_text = $scope.d.zScore.toggles.show_text;
        //  $scope.d.zScore.tmt_b.eintritt.show_clinicsample = $scope.d.zScore.toggles.show_clinicsample;
        //  $scope.d.zScore.tmt_b.eintritt.show_clinicsample_scores = $scope.d.zScore.toggles.show_clinicsample_scores;
        //  
        //  $scope.d.zScore.tmt_b.austritt.show_text = $scope.d.zScore.toggles.show_text;
        //  $scope.d.zScore.tmt_b.austritt.show_clinicsample = $scope.d.zScore.toggles.show_clinicsample;
        //  $scope.d.zScore.tmt_b.austritt.show_clinicsample_scores = $scope.d.zScore.toggles.show_clinicsample_scores;
        //  
        //  
        //  if ($scope.d.zScore.messungen_info.ein_und_austritt) {
        //      $scope.d.zScore.tmt_a.eintritt.show_numbers = false;
        //      $scope.d.zScore.tmt_a.austritt.show_numbers = true;
        //      $scope.d.zScore.tmt_b.eintritt.show_numbers = false;
        //      $scope.d.zScore.tmt_b.austritt.show_numbers = true;
        //  } else {
        //      $scope.d.zScore.tmt_a.eintritt.show_numbers = true;
        //      $scope.d.zScore.tmt_a.austritt.show_numbers = false;
        //      $scope.d.zScore.tmt_b.eintritt.show_numbers = true;
        //      $scope.d.zScore.tmt_b.austritt.show_numbers = false;
        //  };
        //  
        console.log('setZScore', $scope.d.zScore);
    };



});
