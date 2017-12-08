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
            $scope.d.init = true;
            var current_template = $scope.d.dataMain.params.location.viewname;

            // Check if we have survey_responses @ data.
            if (data.survey_responses.length !== 0) {
                console.log('(DATA): survey_responses:', data.survey_responses.length, data.survey_responses);
                $scope.d.haveData = true;


                // Run Specific Functions only when needed.

                if (current_template === 'z_scores') {
                    $scope.loadKS();
                };

                if (current_template === 'export_toolbox_admin') {
                    $scope.setExport();
                };
            };

            // Finishing: Console Info & Init = done.
            console.log('Welcome, ', $scope.d.dataMain.apps.current.name, ' | ', current_template, $scope.d);
        });
    };
    $scope.loadMainData();



    $scope.loadKS = function() {

        $scope.d.ks = {};

        var ks_file = __opapp_include_as_js_string(includes/ks_isk.json)

        ks_file = JSON.parse(ks_file);

        $scope.d.ks = ks_file;


        $scope.d.ks.text = '';
        $scope.d.ks.dimensions.forEach(function(dim, dimID) {
            if ($scope.d.ks.text !== '') {
                $scope.d.ks.text = $scope.d.ks.text + ', '
            };
            $scope.d.ks.text = $scope.d.ks.text + dim.name
        });
        $scope.d.ks.text = $scope.d.ks.n_scores + ' Messungen normiert nach ' + $scope.d.ks.text;
        var datum_ks = $filter('date')($scope.d.ks.date);
        $scope.d.ks.text = $scope.d.ks.text + ' (' + datum_ks + ')'


        $scope.d.ks.normgurppe = {};
        //$scope.d.ks.normgurppe.n = '(N=' + $scope.d.dataMain.calculations["0"].calculation_results["0"].percentile.age_perz.n + ')';


        //$scope.d.ks.normgurppe.text = age + ', ' + edu + ' ' + $scope.d.ks.normgurppe.n;

        console.log('(✓) Klinikstichprobe geladen: ', $scope.d.ks);

        // Follow the white rabbit
        $scope.initISK();
    };


    $scope.getKSLocation = function(location_array) {

        var current_ks = $scope.d.ks;

        var data_dive = current_ks.data;
        var current_location_text = "";
        var current_location_full = "";
        var current_location_n_text = "";
        var current_location_n = 0;


        console.log('(?) location_array', location_array);

        location_array.forEach(function(pos, posID) {
            data_dive = data_dive[pos];

            if (current_location_text !== "") {
                current_location_text = current_location_text + ' | '
            };

            var current_dim = current_ks.dimensions[posID];

            console.log('(?) current_dim', pos, posID, current_dim);
            current_location_text = current_location_text + current_dim.name + ': ' + current_dim.array[pos].text;
        });


        var statistics = null;
        if (data_dive !== null) {
            statistics = data_dive.statistics;
            current_location_n = statistics.selbststeuerung_z_score.n;
            current_location_n_text = 'N=' + current_location_n;
            current_location_full = current_location_text + ' (' + current_location_n_text + ')';
        } else {
            statistics = null;
            current_location_n = 0;
            current_location_n_text = 'N=' + current_location_n;
            current_location_full = current_location_text + ' (' + current_location_n_text + ')';
        };

        var location = {
            "statistics": statistics,
            "path": location_array,
            "text": current_location_text,
            "n_text": current_location_n_text,
            "text_full": current_location_full,
            "n": current_location_n
        };

        //console.log('getKSLocation', location);

        return angular.copy(location);
    };


    $scope.initISK = function() {

        $scope.d.ISK = {};
        $scope.d.ISK.init = false;
        $scope.d.ISK.show_legend = false;

        // Default Z-Score Option
        $scope.d.ISK.zscore_options = {
            "zscore_min": -4,
            "zscore_max": 4,
            "clinicsample_color": "#C5CAE9",
            "centered_zero": true,
            "show_text": false,
            "show_clinicsample": true,
            "show_clinicsample_scores": false,
            "show_numbers": true
        };


        // Toggles | Grafiken
        $scope.d.ISK.toggles = {
            "show_text": true,
            "show_clinicsample": true,
            "show_clinicsample_scores": false
        };


        // Gruppierung der Messungen
        $scope.d.ISK.groups = angular.copy($scope.d.dataMain.calculations["0"].calculation_results["0"].definitions.result_array);

        $scope.d.ISK.groups.forEach(function(group, groupID) {
            delete group.result;
            group.data = [];
        });


        // Build  & Sort | Neueste Messung als letzter Eintrag
        // Loop via survey_responses
        var survey_responses = $scope.d.dataMain.survey_responses;
        var alle_messungen = [];
        survey_responses.forEach(function(sr, srID) {
            if (("calculations" in sr) && (sr.calculations.length > 0)) {
                var current_calc = sr.calculations["0"].calculation_result;
                current_calc.date = current_calc.info.filled;
                alle_messungen.push(current_calc);
            };
        });
        dataService.sortOn(alle_messungen, 'date', false, false);



        // Loop alle_messungen und messung in ISK A / ISK B pushen
        alle_messungen.forEach(function(messung, messungID) {

            // console.log('(!) 1 - Messung', messungID, messung);


            // Variablen vorbereiten | verdrahten.
            var mz_text = messung.info.mz.mz_typ;
            var datum_messung = $filter('date')(messung.info.filled);


            // Messzeitpung
            var mz_id = messung.info.mz.mz_id;
            if ((mz_id === 99) || (mz_id === null)) {
                mz_id = 2; // Unbekannt => Anderer Messzeitpunkt
            } else {
                //mz_id = mz_id;
                mz_id = mz_id - 1;
            };


            // Gender
            var gender_id = 0 // Frau
            if ($scope.d.dataMain.patient.data.gender === 'male') {
                gender_id = 1;
            };

            // Default Pfad für MD-Array erstellen
            var current_ks = $scope.d.ks;
            var dimensions_path = [];
            current_ks.dimensions.forEach(function(current_dim, myDimID) {

                var default_last = current_dim.array.length - 1;
                dimensions_path[myDimID] = default_last;

                if (current_dim.name === "Messzeitpunkt") {
                    dimensions_path[myDimID] = mz_id;
                };

                if (current_dim.name === "Geschlecht") {
                    dimensions_path[myDimID] = gender_id;
                };
            });

            // console.log('(!) 2 - dimensions_path', dimensions_path);


            var md_data = $scope.getKSLocation(dimensions_path);
            // console.log('(!) 3 - md_data', dimensions_path, md_data);


            // Resultate in Gruppen schreiben
            $scope.d.ISK.groups.forEach(function(group, groupID) {

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
                        "text_left_caption": "ISK",
                        "text_right": datum_messung,
                        "text_right_caption": "",
                        "clinicsample_start": 0,
                        "clinicsample_end": 0,
                        "clinicsample_color": '#9FA8DA',
                        "marker_1_score": null,
                        "marker_1_text": "",
                        "marker_1_color": "#F44336",
                    },
                };



                var variable_name = group.short_description + "_" + "z_score";
                messung_obj.zscore.zscore = messung.all_results[variable_name];
                messung_obj.zscore.text_left_caption = group.description;


                // Auffällige Testleistung |  Vergleich mit den Gesunden
                if (Math.abs(messung_obj.zscore.zscore) >= 2) {
                    // Auffällige Testleistung: Rot
                    messung_obj.zscore.zscore_color = '#F44336';
                };

                if (Math.abs(messung_obj.zscore.zscore) < 1) {
                    // Auffällige Testleistung: Grün
                    messung_obj.zscore.zscore_color = '#4CAF50';
                };


                group.data.push(messung_obj);


            });
        });

        // MD - Daten befüllen
        $scope.d.ISK.groups.forEach(function(group, groupID) {
            group.data.forEach(function(groupInner, groupInnerID) {
                $scope.changeClinicSample(groupInner, groupID);
                // console.log('(!) -- changeClinicSample', groupInner);
            });
        });

        $scope.d.ISK.show_legend = false;

        $scope.d.ISK.init = true;
    };


    $scope.changeClinicSample = function(current_sample, groupID) {

        current_sample.ks.path_data = $scope.getKSLocation(current_sample.ks.path_selected);

        if (current_sample.ks.path_data.statistics !== null) {


            var current_group = current_sample.calculation.definitions.result_array[groupID];
            var variable_name = current_group.short_description + "_" + "z_score";
            current_sample.zscore.clinicsample_start = $scope.roundToTwo(current_sample.ks.path_data.statistics[variable_name].mean_1sd_min);
            current_sample.zscore.clinicsample_end = $scope.roundToTwo(current_sample.ks.path_data.statistics[variable_name].mean_1sd_plus);


            // Kliniksample gemäss Messzeitpunkt färben
            var mz_id = parseInt(current_sample.ks.path_data.path["0"]);

            // Eintritt / Austritt / Anderer MZ
            var cs_color = ['#9E9E9E', '#EEEEEE', '#E8EAF6'];
            current_sample.zscore.clinicsample_color = cs_color[mz_id];


            // Auffällige Testleistung | Vergleich KS färben
            // current_sample.zscore.zscore_color = '#1A237E';
            // if (current_sample.zscore.zscore < current_sample.zscore.clinicsample_start) {
            //     // Auffällige Testleistung: Rot
            //     current_sample.zscore.zscore_color = '#F44336';
            // };
            // if (current_sample.zscore.zscore > current_sample.zscore.clinicsample_end) {
            //     // Auffällige Testleistung: Grün
            //     current_sample.zscore.zscore_color = '#4CAF50';
            // };



        } else {
            current_sample.zscore.clinicsample_start = 0;
            current_sample.zscore.clinicsample_end = 0;
        };

        $scope.d.ISK.show_legend = true;

        // console.log('(Done) changeClinicSample', current_sample);
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
            name: 'WHQOL-Example (with stay)',
            sql: __opapp_include_as_js_string(includes/export.sql)
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
