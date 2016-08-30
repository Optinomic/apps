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
                $scope.getCalculation();

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




    $scope.addDefault = function(obj) {

        // Add Defaults for all Scores
        obj.zscore_min = -3;
        obj.zscore_max = 3;
        obj.clinicsample_start = -1;
        obj.clinicsample_end = 1;
        obj.clinicsample_color = '#C5CAE9';

        // Remember to Show them later - if needed.
        obj.show_numbers = false;


        // Add Toggle Settings
        obj.show_text = $scope.d.zScore.toggles.show_text;
        obj.show_clinicsample = $scope.d.zScore.toggles.show_clinicsample;
        obj.show_clinicsample_scores = $scope.d.zScore.toggles.show_clinicsample_scores;


        return obj;
    };



    $scope.initZScore = function() {

        $scope.d.zScore.init = false;

        // Toggles | Grafiken
        $scope.d.zScore.toggles = {
            "show_text": true,
            "show_clinicsample": false,
            "show_clinicsample_scores": false
        };


        // var erste_messung = $scope.d.dataMain.calculations[0].calculation_results[0];

        $scope.d.zScore.normgruppe_tmt = {};


        // Klinische Stichprobe
        $scope.d.zScore.normgruppe_klinik = {};
        $scope.d.zScore.normgruppe_klinik.selected_age_group_id = 0;
        $scope.d.zScore.normgruppe_klinik.selected_edu_group_id = 99;
        $scope.d.zScore.normgruppe_klinik.selected_mz_group_id = 99;

        $scope.d.zScore.normgruppe_klinik.select_mz_array = [{
            "id": 0,
            "text": "Jeweilige Messzeitpunkte vergleichen."
        }, {
            "id": 99,
            "text": "Alle Messzeitpunkte verwenden."
        }];
        $scope.d.zScore.normgruppe_klinik.selected_mz_array = 0;



        // Store Current Age & Edu Group from Normgruppe TMT

        if ($scope.d.dataMain.calculations[0].calculation_results.length !== 0) {

            var current_messung = $scope.d.dataMain.calculations[0].calculation_results[0];

            $scope.d.zScore.normgruppe_tmt.age_group = $scope.d.zScore.user_app_calc.definitions.age[current_messung.percentile.age_perz.altersgruppe];
            $scope.d.zScore.normgruppe_klinik.selected_age_group_id = current_messung.percentile.age_perz.altersgruppe;

            $scope.d.zScore.normgruppe_tmt.edu_group = {};
            $scope.d.zScore.user_app_calc.definitions.edu.forEach(function(current_edu, myEduIndex) {
                if (current_edu.edu_group_id === current_messung.percentile.age_perz.education) {
                    $scope.d.zScore.normgruppe_tmt.edu_group = current_edu;
                };
            });
            $scope.d.zScore.normgruppe_klinik.selected_edu_group_id = current_messung.percentile.age_perz.education;


        };

        $scope.changeClinicSample();

    };


    $scope.twoDigits = function(id) {
        var return_text = '';
        id = parseInt(id);
        if (id < 10) {
            return_text = '0' + id.toString();
        } else {
            return_text = id.toString();
        };
        return return_text;
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

            //  Messungen mit Variablen befüllen.

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
            if (current_messung.percentile.z_scores.tmtA_z_rounded > 2.5) {
                // Auffällige Testleistung
                A_messung.zscore_color = '#F44336';
            };
            $scope.d.zScore.tmt_a.push(A_messung);


            // TMT - B
            var B_messung = angular.copy(messung);
            B_messung = $scope.addDefault(B_messung);
            B_messung.zscore = current_messung.percentile.z_scores.tmtB_z_rounded;
            B_messung.text_right = 'TMT B';
            B_messung.text_right_caption = '';
            if (current_messung.percentile.z_scores.tmtB_z_rounded > 2.5) {
                // Auffällige Testleistung
                B_messung.zscore_color = '#F44336';
            };
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

        // Sort Arrays  |  Do not sort:  Same order as results.
        // $scope.d.zScore.tmt_a = $scope.sortByKey($scope.d.zScore.tmt_a, 'datestamp');
        // $scope.d.zScore.tmt_b = $scope.sortByKey($scope.d.zScore.tmt_b, 'datestamp');

        // Skala nur bei 'letzer' Messung anzeigen
        var id_last_a = parseInt($scope.d.zScore.tmt_a.length) - 1;
        var id_last_b = parseInt($scope.d.zScore.tmt_a.length) - 1;
        // console.log('LAST:', id_last_a, id_last_b, $scope.d.zScore.tmt_a);
        $scope.d.zScore.tmt_a[id_last_a].show_numbers = true;
        $scope.d.zScore.tmt_b[id_last_b].show_numbers = true;


        // Check if Eintritt & Austrittsmessung vorhanden
        if ((messungen_info.eintritt) && (messungen_info.austritt)) {
            messungen_info.ein_und_austritt = true;
        };

        $scope.d.zScore.messungen_info = messungen_info;


        // Abgeschlossen
        $scope.d.zScore.init = true;


        console.log('setZScore', $scope.d.zScore);
    };


    $scope.getCalculation = function() {
        // Get specific User calculation
        var call = dataService.getAppCalculationsUser('ch.suedhang.user.apps.tmt', 'tmt_scores');

        call.success(function(data) {
            // Save Data to $scope.d
            $scope.d.zScore = {};

            $scope.d.zScore.user_app_calc = data.calculation_result;
            console.log('(DATA): getUserAppCalculation (tmt_scores): ', $scope.d.zScore.user_app_calc);

            // Set Stuff
            $scope.initZScore();
        });
        call.error(function(data) {
            console.log('(ERROR): getCalculation:', data);
        });
    };



    $scope.changeClinicSample = function() {


        var age_group_id = $scope.d.zScore.normgruppe_klinik.selected_age_group_id;
        var edu_group_id = $scope.d.zScore.normgruppe_klinik.selected_edu_group_id;
        var mz_group_id = $scope.d.zScore.normgruppe_klinik.selected_mz_group_id;

        $scope.d.zScore.normgruppe_klinik.age_edu_mz = 'age_' + $scope.twoDigits(age_group_id) + '_edu_' + $scope.twoDigits(edu_group_id) + '_mz_';
        $scope.d.zScore.normgruppe_klinik.age_edu_99 = 'age_' + $scope.twoDigits(age_group_id) + '_edu_' + $scope.twoDigits(edu_group_id) + '_mz_99';

        // Bei Änderungen ausführen.
        $scope.setZScore();
    };


    // -------------------------------------------
    // Helper - Functions
    // -------------------------------------------

    $scope.sortByKey = function(array, key) {
        return array.sort(function(a, b) {
            var x = a[key];
            var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    };



});
