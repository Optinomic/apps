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
            var current_template = $scope.d.dataMain.params.location.viewname;

            // Run Public-Functions:
            $scope.d.functions.getAllCalculations();

            // Check if we have survey_responses @ data.
            if (data.survey_responses.length !== 0) {
                console.log('(DATA): survey_responses:', data.survey_responses.length, data.survey_responses);
                $scope.d.haveData = true;


                // Run Specific Functions only when needed.

                if (current_template === 'tmt_scores') {
                    $scope.getCalculation();
                };

                if (current_template === 'export_toolbox_admin') {
                    $scope.setExport();
                };
            };

            // Finishing: Console Info & Init = done.
            console.log('Welcome, ', $scope.d.dataMain.apps.current.name, ' | ', current_template, $scope.d);
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
        obj.clinicsample_start = null;
        obj.clinicsample_end = null;
        obj.clinicsample_color = '#C5CAE9';

        return obj;
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


    $scope.initZScore = function() {

        $scope.d.zScore.init = false;

        // A 'settings - view'
        $scope.d.zScore.settings = false;


        // Toggles | Grafiken
        $scope.d.zScore.options = {
            "zscore_min": -3,
            "zscore_max": 3,
            "clinicsample_color": "#C5CAE9",
            "centered_zero": false,
            "show_text": true,
            "show_clinicsample": true,
            "show_clinicsample_scores": false,
            "show_numbers": true
        };

        $scope.d.zScore.options_ba = angular.copy($scope.d.zScore.options);

        $scope.d.zScore.toggles = {
            "show_text": true,
            "show_clinicsample": true,
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




    $scope.setZScore = function() {

        // INIT
        var messung = {};
        $scope.d.zScore.tmt_a = [];
        $scope.d.zScore.tmt_b = [];
        $scope.d.zScore.tmt_ba_quot = [];

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

            var clinicsample_source_obj = {};

            var mz_id = current_messung.Messzeitpunkt.Messzeitpunkt;
            var mz_text = current_messung.Messzeitpunkt.Messzeitpunkt_Text;
            var mz_datestamp = current_messung.date;
            var mz_datum = $filter('date')(mz_datestamp);

            $scope.d.zScore.normgruppe_klinik.age_edu_mz = $scope.d.zScore.normgruppe_klinik.age_edu_mz_base + $scope.twoDigits(mz_id);

            // Aktuelle Quelle für die Klinikstichprobe
            if ($scope.d.zScore.normgruppe_klinik.selected_mz_array === 99) {
                var age_edu_mz_obj = $scope.d.zScore.user_app_calc.age_edu_mz_obj[$scope.d.zScore.normgruppe_klinik.age_edu_99];
            } else {
                var age_edu_mz_obj = $scope.d.zScore.user_app_calc.age_edu_mz_obj[$scope.d.zScore.normgruppe_klinik.age_edu_mz];
            };

            console.log('age_edu_mz_obj |setZScore: ', $scope.d.zScore.normgruppe_klinik.selected_mz_array, $scope.d.zScore.normgruppe_klinik.age_edu_mz, age_edu_mz_obj);

            var messung = {
                "clinic_sample_age_edu_mz_obj": age_edu_mz_obj,
                "zscore": 0,
                "zscore_color": '#C5CAE9',
                "text_left": mz_text,
                "text_left_caption": mz_datum,
                "datum": mz_datum,
                "datestamp": mz_datestamp
            };

            // TMT - A
            var A_messung = angular.copy(messung);
            A_messung = $scope.addDefault(A_messung);

            if (age_edu_mz_obj.statistics.calculated) {
                if ((age_edu_mz_obj.statistics.TMTAZ.mean_1sd_min !== null) || (age_edu_mz_obj.statistics.TMTAZ.mean_1sd_min !== undefined)) {
                    A_messung.clinicsample_start = $scope.roundToTwo(age_edu_mz_obj.statistics.TMTAZ.mean_1sd_min);
                    A_messung.clinicsample_end = $scope.roundToTwo(age_edu_mz_obj.statistics.TMTAZ.mean_1sd_plus);
                };
            };


            A_messung.zscore = current_messung.percentile.z_scores.tmtA_z_rounded;
            A_messung.text_right = 'TMT A |  N=' + age_edu_mz_obj.n;
            A_messung.text_right_caption = 'Zeit:' + current_messung.TMTATime + ' Fehler:' + current_messung.TMTAError;

            if (current_messung.percentile.z_scores.tmtA_z_rounded > 2.5) {
                // Auffällige Testleistung
                A_messung.zscore_color = '#F44336';
            };

            // Set zscore_min | zscore_max  if zscore >= +/-3 
            if (Math.abs(A_messung.zscore) > (Math.abs($scope.d.zScore.options.zscore_min) - 0.5)) {
                $scope.d.zScore.options.zscore_min = (Math.abs(A_messung.zscore) + 1) * -1;
            };

            if (Math.abs(A_messung.zscore) > (Math.abs($scope.d.zScore.options.zscore_max) - 0.5)) {
                $scope.d.zScore.options.zscore_max = (Math.abs(A_messung.zscore) + 1);
            };


            // TMT - B
            var B_messung = angular.copy(messung);
            B_messung = $scope.addDefault(B_messung);

            if (age_edu_mz_obj.statistics.calculated) {
                if ((age_edu_mz_obj.statistics.TMTAZ.mean_1sd_min !== null) || (age_edu_mz_obj.statistics.TMTAZ.mean_1sd_min !== undefined)) {
                    B_messung.clinicsample_start = $scope.roundToTwo(age_edu_mz_obj.statistics.TMTAZ.mean_1sd_min);
                    B_messung.clinicsample_end = $scope.roundToTwo(age_edu_mz_obj.statistics.TMTAZ.mean_1sd_plus);
                };
            };


            B_messung.zscore = current_messung.percentile.z_scores.tmtB_z_rounded;
            B_messung.text_right = 'TMT B |  N=' + age_edu_mz_obj.n;
            B_messung.text_right_caption = 'Zeit: ' + current_messung.TMTBTime + ' Fehler: ' + current_messung.TMTBError;

            if (current_messung.percentile.z_scores.tmtB_z_rounded > 2.5) {
                // Auffällige Testleistung
                B_messung.zscore_color = '#F44336';
            };


            // Set zscore_min | zscore_max  if zscore >= +/-3 
            if (Math.abs(B_messung.zscore) > (Math.abs($scope.d.zScore.options.zscore_min) - 0.5)) {
                $scope.d.zScore.options.zscore_min = (Math.abs(B_messung.zscore) + 1) * -1;
            };

            if (Math.abs(B_messung.zscore) > (Math.abs($scope.d.zScore.options.zscore_max) - 0.5)) {
                $scope.d.zScore.options.zscore_max = (Math.abs(B_messung.zscore) + 1);
            };

            // Push and Save
            $scope.d.zScore.tmt_a.push(A_messung);
            $scope.d.zScore.tmt_b.push(B_messung);



            // TMT - B/A Quotient  
            // -  Nur bei Eintritt
            // -  Kritischer Wert:  2,5
            if (current_messung.mz === 1) {
                var BA_quotient = angular.copy(messung);
                BA_quotient = $scope.addDefault(BA_quotient);

                BA_quotient.zscore = current_messung.quotient_rounded;

                BA_quotient.marker_1_score = 2.5;
                BA_quotient.marker_1_text = 'Kritischer Wert';

                if (age_edu_mz_obj.statistics.calculated) {
                    if ((age_edu_mz_obj.statistics.BA_Quotient.mean_1sd_min !== null) || (age_edu_mz_obj.statistics.BA_Quotient.mean_1sd_min !== undefined)) {
                        BA_quotient.clinicsample_start = $scope.roundToTwo(age_edu_mz_obj.statistics.BA_Quotient.mean_1sd_min);
                        BA_quotient.clinicsample_end = $scope.roundToTwo(age_edu_mz_obj.statistics.BA_Quotient.mean_1sd_plus);
                    };
                };

                if (current_messung.quotient_rounded > 2.5) {
                    // Auffällige Testleistung
                    B_messung.zscore_color = '#F44336';
                };


                // Set zscore_min | zscore_max  if zscore >= +/-3 
                if (Math.abs(BA_quotient.zscore) > (Math.abs($scope.d.zScore.options_ba.zscore_min) - 0.5)) {
                    $scope.d.zScore.options_ba.zscore_min = (Math.abs(BA_quotient.zscore) + 1) * -1;
                };

                if (Math.abs(BA_quotient.zscore) > (Math.abs($scope.d.zScore.options_ba.zscore_max) - 0.5)) {
                    $scope.d.zScore.options_ba.zscore_max = (Math.abs(BA_quotient.zscore) + 1);
                };


                // Push and Save
                $scope.d.zScore.tmt_ba_quot.push(BA_quotient);
            };



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

        if (messungen.length > 0) {
            // Skala nur bei 'letzer' Messung anzeigen
            var id_last_a = parseInt($scope.d.zScore.tmt_a.length) - 1;
            var id_last_b = parseInt($scope.d.zScore.tmt_a.length) - 1;
            $scope.d.zScore.tmt_a[id_last_a].show_numbers = true;
            $scope.d.zScore.tmt_b[id_last_b].show_numbers = true;
        } else {
            $scope.d.haveData = false;
        };

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
        $scope.d.zScore.normgruppe_klinik.age_edu_mz_base = angular.copy($scope.d.zScore.normgruppe_klinik.age_edu_mz);
        $scope.d.zScore.normgruppe_klinik.age_edu_99 = 'age_' + $scope.twoDigits(age_group_id) + '_edu_' + $scope.twoDigits(edu_group_id) + '_mz_99';

        // Bei Änderungen ausführen.
        $scope.setZScore();
    };


    // -------------------------------------------
    // Helper - Functions
    // -------------------------------------------

    $scope.roundToTwo = function(num) {
        // Round a Number to 0.X 
        return +(Math.round(num + "e+2") + "e-2");
    };

    $scope.sortByKey = function(array, key) {
        return array.sort(function(a, b) {
            var x = a[key];
            var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    };



});
