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

            // Check if we have survey_responses @ data.
            if (data.survey_responses.length !== 0) {
                console.log('(DATA): survey_responses:', data.survey_responses.length, data.survey_responses);
                $scope.d.haveData = true;


                // Run Specific Functions only when needed.

                if (current_template === 'tmt_scores') {
                    $scope.loadKS();
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



    $scope.loadKS = function() {

        $scope.d.ks = {};

        var ks_file = include_as_js_string(
            ch_suedhang_user_apps_tmt_activated.json)

        ks_file = JSON.parse(ks_file);

        $scope.d.ks = ks_file;
        console.log('(✓) Klinikstichprobe geladen: ', $scope.d.ks);

        // Follow the white rabbit
        $scope.initTMT();
    };


    $scope.getKSLocation = function(location_array) {

        var current_ks = angular.copy($scope.d.ks);

        var data_dive = current_ks.data;
        var current_location_text = "";
        var current_location_full = "";
        var current_location_n_text = "";
        var current_location_n = 0;


        location_array.forEach(function(pos, posID) {
            data_dive = data_dive[pos];

            if (current_location_text !== "") {
                current_location_text = current_location_text + ' | '
            };

            var current_dim = current_ks.dimensions[posID];
            current_location_text = current_location_text + current_dim.name + ': ' + current_dim.array[pos].text;
        });


        var my_data = null;
        if (data_dive !== null) {
            my_data = data_dive;
            current_location_n = my_data.patients.length;
            current_location_n_text = 'N=' + current_location_n;
            current_location_full = current_location_text + ' (' + current_location_n_text + ')';
        };

        var location = {
            "data": my_data,
            "path": location_array,
            "text": current_location_text,
            "n_text": current_location_n_text,
            "text_full": current_location_full,
            "n": current_location_n
        };

        return angular.copy(location);
    };


    $scope.initTMT = function() {

        $scope.d.TMT = {};
        $scope.d.TMT.init = false;

        // Default Z-Score Option
        $scope.d.TMT.zscore_options = {
            "zscore_min": -3,
            "zscore_max": 3,
            "clinicsample_color": "#C5CAE9",
            "centered_zero": true,
            "show_text": true,
            "show_clinicsample": true,
            "show_clinicsample_scores": false,
            "show_numbers": true
        };


        // Toggles | Grafiken
        $scope.d.TMT.toggles = {
            "show_text": true,
            "show_clinicsample": true,
            "show_clinicsample_scores": false
        };


        // Gruppierung der Messungen
        $scope.d.TMT.groups = [{
            "name": "TMT A",
            "data": []
        }, {
            "name": "TMT B",
            "data": []
        }];

        // Build 

        var alle_messungen = $scope.d.dataMain.calculations[0].calculation_results;

        // Loop alle_messungen und messung in TMT A / TMT B pushen
        alle_messungen.forEach(function(messung, messungID) {

            console.log('(!) messung', messungID, messung);


            // Variablen vorbereiten | verdrahten.
            var mz_id = messung.Messzeitpunkt.Messzeitpunkt - 1;
            var mz_text = messung.Messzeitpunkt.Messzeitpunkt_Text;
            var datum_messung = $filter('date')(messung.date);
            var zeit_messung = messung.date.substring(11, 16);

            var zscore_A = messung.percentile.z_scores.tmtA_z_rounded;
            var zscore_B = messung.percentile.z_scores.tmtB_z_rounded;

            var zeitabbruch_A = messung.percentile.z_scores.tmtA_z_zeitabbruch_rounded;
            var zeitabbruch_B = messung.percentile.z_scores.tmtB_z_zeitabbruch_rounded;

            var cs_color = ['#C5CAE9', '#D1C4E9', '#BBDEFB'];
            var current_cs_color = cs_color[mz_id];


            // $scope.d.TMT.zscore_options anpassen
            if (Math.abs(zscore_A) > (Math.abs($scope.d.TMT.zscore_options.zscore_min) - 0.5)) {
                $scope.d.TMT.zscore_options.zscore_min = (Math.abs(zscore_A) + 1) * -1;
            };

            if (Math.abs(zscore_B) > (Math.abs($scope.d.TMT.zscore_options.zscore_max) - 0.5)) {
                $scope.d.TMT.zscore_options.zscore_max = (Math.abs(zscore_B) + 1);
            };



            // Pfad für MD-Array erstellen
            var dimensions_path = [];
            var current_ks = angular.copy($scope.d.ks);
            current_ks.dimensions.forEach(function(current_dim, myDimID) {

                var default_last = current_dim.array.length - 1;
                dimensions_path[myDimID] = default_last;

                if (current_dim.name === "Altersgruppe") {
                    dimensions_path[myDimID] = messung.percentile.age_perz.altersgruppe;
                };

                if (current_dim.name === "Ausbildungsgrad") {
                    if (messung.edu_years > 12) {
                        dimensions_path[myDimID] = 1;
                    } else {
                        dimensions_path[myDimID] = 0;
                    };
                };

                if (current_dim.name === "Messzeitpunkt") {
                    dimensions_path[myDimID] = mz_id;
                };
            });
            // console.log('(!) dimensions_path', dimensions_path);


            var md_data = $scope.getKSLocation(dimensions_path);
            // console.log('(!) md_data', dimensions_path, md_data);


            // Resultate in Gruppen schreiben
            $scope.d.TMT.groups.forEach(function(group, groupID) {

                var messung_obj = {
                    "calculation": messung,
                    "ks": {
                        "path_data": md_data,
                        "path_selected": dimensions_path,
                        "show_controls": false
                    },
                    "zscore": {
                        "zscore": null,
                        "zscore_color": '#1A237E',
                        "text_left": mz_text,
                        "text_left_caption": "TMT",
                        "text_right": datum_messung,
                        "text_right_caption": zeit_messung,
                        "clinicsample_start": 0,
                        "clinicsample_end": 0,
                        "clinicsample_color": current_cs_color,
                        "marker_1_score": null,
                        "marker_1_text": "Zeitabbruch",
                        "marker_1_color": "#F44336",
                    },
                };

                if (group.name === 'TMT A') {
                    messung_obj.text_left_caption = group.name;
                    messung_obj.zscore.zscore = zscore_A;
                    messung_obj.zscore.marker_1_score = zeitabbruch_A;
                    messung_obj.zscore.clinicsample_start = $scope.roundToTwo(md_data.data.statistics['TMTAZ'].mean_1sd_min);
                    messung_obj.zscore.clinicsample_end = $scope.roundToTwo(md_data.data.statistics['TMTAZ'].mean_1sd_plus);

                    group.data.push(messung_obj);
                };

                if (group.name === 'TMT B') {
                    messung_obj.text_left_caption = group.name;
                    messung_obj.zscore.zscore = zscore_B;
                    messung_obj.zscore.marker_1_score = zeitabbruch_B;
                    messung_obj.zscore.clinicsample_start = $scope.roundToTwo(md_data.data.statistics['TMTBZ'].mean_1sd_min);
                    messung_obj.zscore.clinicsample_end = $scope.roundToTwo(md_data.data.statistics['TMTBZ'].mean_1sd_plus);

                    group.data.push(messung_obj);
                };
            });
        });


        $scope.d.TMT.init = true;

    };






    $scope.changeClinicSample = function() {};


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



});
