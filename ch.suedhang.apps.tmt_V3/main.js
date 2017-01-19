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

                if (current_template === 'tmt_scores') {
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

        var ks_file = include_as_js_string(
            ch_suedhang_user_apps_tmt_activated.json)

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
        $scope.d.ks.normgurppe.n = '(N=' + $scope.d.dataMain.calculations["0"].calculation_results["0"].percentile.age_perz.n + ')';

        var age = $scope.d.dataMain.calculations["0"].calculation_results["0"].percentile.age_perz.altersgruppe_text;
        var edu = $scope.d.dataMain.calculations["0"].calculation_results["0"].percentile.age_perz.education;

        if (edu === 99) {
            edu = 'Jeder Ausbildungsgrad'
        };
        if (edu === 0) {
            edu = '<= 12 Jahre'
        };
        if (edu === 1) {
            edu = '> 12 Jahre'
        };
        $scope.d.ks.normgurppe.text = age + ', ' + edu + ' ' + $scope.d.ks.normgurppe.n;

        console.log('(✓) Klinikstichprobe geladen: ', $scope.d.ks);

        // Follow the white rabbit
        $scope.initTMT();
    };


    $scope.getKSLocation = function(location_array) {

        var current_ks = $scope.d.ks;

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


        var statistics = null;
        if (data_dive !== null) {
            statistics = data_dive.statistics;
            current_location_n = data_dive.patients.length;
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

        return angular.copy(location);
    };


    $scope.initTMT = function() {

        $scope.d.TMT = {};
        $scope.d.TMT.init = false;
        $scope.d.TMT.show_legend = false;

        // Default Z-Score Option
        $scope.d.TMT.zscore_options = {
            "zscore_min": -6,
            "zscore_max": 6,
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



        // Build  & Sort | Neueste Messung als letzter Eintrag
        // Loop via survey_responses
        var survey_responses = $scope.d.dataMain.survey_responses;
        var alle_messungen = [];
        survey_responses.forEach(function(sr, srID) {
            if (("calculations" in sr) && (sr.calculations.length > 0)) {
                var current_calc = sr.calculations["0"].calculation_result;
                current_calc.date = current_calc.info.filled;
                alle_messungen.push(current_calc);
            } else {
                var sr_event = sr.entity.data.event_id;
                var all_calcs = $scope.d.dataMain.calculations["0"].calculation_results;
                all_calcs.forEach(function(cc, ccID) {
                    if (sr.entity.data.event_id === cc.response.data.event_id) {
                        cc.date = cc.response.data.filled;
                        alle_messungen.push(cc);
                    }
                });

            };
        });
        dataService.sortOn(alle_messungen, 'date', false, false);



        // Loop alle_messungen und messung in TMT A / TMT B pushen
        alle_messungen.forEach(function(messung, messungID) {

            // console.log('(!) 1 - Messung', messungID, messung);


            // Variablen vorbereiten | verdrahten.
            var mz_id = messung.Messzeitpunkt.Messzeitpunkt - 1;
            var mz_text = messung.Messzeitpunkt.Messzeitpunkt_Text;
            var datum_messung = $filter('date')(messung.date);
            var zeit_messung = messung.date.substring(11, 16);

            var zscore_A = messung.percentile.z_scores.tmtA_z_rounded;
            var zscore_B = messung.percentile.z_scores.tmtB_z_rounded;

            var zeitabbruch_A = messung.percentile.z_scores.tmtA_z_zeitabbruch_rounded;
            var zeitabbruch_B = messung.percentile.z_scores.tmtB_z_zeitabbruch_rounded;

            // Eintritt / Austritt / Anderer MZ
            var cs_color = ['#9E9E9E', '#EEEEEE', '#ebebeb'];
            var current_cs_color = cs_color[mz_id];


            // $scope.d.TMT.zscore_options anpassen
            if (Math.abs(zscore_A) > (Math.abs($scope.d.TMT.zscore_options.zscore_min) - 0.5)) {
                $scope.d.TMT.zscore_options.zscore_min = (Math.abs(zscore_A) + 1) * -1;
            };

            if (Math.abs(zscore_B) > (Math.abs($scope.d.TMT.zscore_options.zscore_max) - 0.5)) {
                $scope.d.TMT.zscore_options.zscore_max = (Math.abs(zscore_B) + 1);
            };



            // Default Pfad für MD-Array erstellen
            var dimensions_path = [];
            var current_ks = $scope.d.ks;
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
            // console.log('(!) 2 - dimensions_path', dimensions_path);


            // var md_data = $scope.getKSLocation(dimensions_path);
            // console.log('(!) 3 - md_data', dimensions_path, md_data);


            // Resultate in Gruppen schreiben
            $scope.d.TMT.groups.forEach(function(group, groupID) {

                var messung_obj = {
                    "calculation": messung,
                    "ks": {
                        //"path_data": md_data,
                        "path_data": null,
                        "path_selected": dimensions_path,
                        "show_controls": false
                    },
                    "zscore": {
                        "zscore": null,
                        "zscore_color": '#1A237E',
                        "text_left": mz_text,
                        "text_left_caption": "TMT",
                        "text_right": datum_messung,
                        "text_right_caption": "",
                        "clinicsample_start": 0,
                        "clinicsample_end": 0,
                        "clinicsample_color": current_cs_color,
                        "marker_1_score": null,
                        "marker_1_text": "Zeitabbruch",
                        "marker_1_color": "#F44336",
                    },
                };

                if (group.name === 'TMT A') {
                    messung_obj.zscore.text_left_caption = group.name;
                    messung_obj.zscore.zscore = zscore_A;
                    messung_obj.zscore.marker_1_score = zeitabbruch_A;
                    // messung_obj.zscore.clinicsample_start = $scope.roundToTwo(md_data.statistics['TMTAZ'].mean_1sd_min);
                    // messung_obj.zscore.clinicsample_end = $scope.roundToTwo(md_data.statistics['TMTAZ'].mean_1sd_plus);

                    group.data.push(messung_obj);
                };

                if (group.name === 'TMT B') {
                    messung_obj.zscore.text_left_caption = group.name;
                    messung_obj.zscore.zscore = zscore_B;
                    messung_obj.zscore.marker_1_score = zeitabbruch_B;
                    // messung_obj.zscore.clinicsample_start = $scope.roundToTwo(md_data.statistics['TMTBZ'].mean_1sd_min);
                    // messung_obj.zscore.clinicsample_end = $scope.roundToTwo(md_data.statistics['TMTBZ'].mean_1sd_plus);

                    group.data.push(messung_obj);
                };


                // Auffällige Testleistung |  färben
                if (messung_obj.zscore.zscore < messung_obj.zscore.clinicsample_start) {
                    // Auffällige Testleistung: Rot
                    messung_obj.zscore.zscore_color = '#C62828';
                };
                if (messung_obj.zscore.zscore > messung_obj.zscore.clinicsample_end) {
                    // Auffällige Testleistung: Grün
                    messung_obj.zscore.zscore_color = '#2E7D32';
                };
            });

        });

        // MD - Daten befüllen
        $scope.d.TMT.groups.forEach(function(group, groupID) {
            group.data.forEach(function(groupInner, groupInnerID) {
                $scope.changeClinicSample(groupInner);
                //console.log('(!) 3 - changeClinicSample', groupID, groupInnerID, groupInner);
            });
        });
        $scope.d.TMT.show_legend = false;


        $scope.d.TMT.init = true;
    };


    $scope.changeClinicSample = function(current_sample) {

        current_sample.ks.path_data = $scope.getKSLocation(current_sample.ks.path_selected);

        if (current_sample.ks.path_data.statistics !== null) {
            if (current_sample.zscore.text_left_caption === 'TMT A') {
                current_sample.zscore.clinicsample_start = $scope.roundToTwo(current_sample.ks.path_data.statistics['TMTAZ'].mean_1sd_min);
                current_sample.zscore.clinicsample_end = $scope.roundToTwo(current_sample.ks.path_data.statistics['TMTAZ'].mean_1sd_plus);
            };

            if (current_sample.zscore.text_left_caption === 'TMT B') {
                current_sample.zscore.clinicsample_start = $scope.roundToTwo(current_sample.ks.path_data.statistics['TMTBZ'].mean_1sd_min);
                current_sample.zscore.clinicsample_end = $scope.roundToTwo(current_sample.ks.path_data.statistics['TMTBZ'].mean_1sd_plus);
            };


            // Auffällige Testleistung |  färben
            current_sample.zscore.zscore_color = '#1A237E';
            if (current_sample.zscore.zscore < current_sample.zscore.clinicsample_start) {
                // Auffällige Testleistung: Rot
                current_sample.zscore.zscore_color = '#F44336';
            };
            if (current_sample.zscore.zscore > current_sample.zscore.clinicsample_end) {
                // Auffällige Testleistung: Grün
                current_sample.zscore.zscore_color = '#4CAF50';
            };



        } else {
            current_sample.zscore.clinicsample_start = 0;
            current_sample.zscore.clinicsample_end = 0;
        };

        $scope.d.TMT.show_legend = true;

        console.log('(Done) changeClinicSample', current_sample);
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
