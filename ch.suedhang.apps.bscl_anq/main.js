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


    $scope.buildZusatzitemsArray = function() {

        var zusatzitems_array = [];
        var survey_responses = $scope.d.dataMain.survey_responses;

        survey_responses.forEach(function(sr, srID) {

            var datum_messung = $filter('date')(sr.entity.data.response.q504V00);

            var zusatzitem = {
                "id": srID,
                "mz_id": sr.calculations["0"].calculation_result.info.mz.mz_id,
                "mz_typ": sr.calculations["0"].calculation_result.info.mz.mz_typ,
                "date": datum_messung,
                "items": [{
                    "id": 0,
                    "name": "Schlechter Appetit",
                    "result": null,
                    "field": parseInt(sr.calculations["0"].calculation_result.info.response["BSCL[sq504V11]"])
                }, {
                    "id": 1,
                    "name": "Einschlaf-schwierigkeiten",
                    "result": null,
                    "field": parseInt(sr.calculations["0"].calculation_result.info.response["BSCL[sq504V25]"])
                }, {
                    "id": 2,
                    "name": "Gedanken an den Tod und ans Sterben",
                    "result": null,
                    "field": parseInt(sr.calculations["0"].calculation_result.info.response["BSCL[sq504V39]"])
                }, {
                    "id": 3,
                    "name": "Schuldgefühle",
                    "result": null,
                    "field": parseInt(sr.calculations["0"].calculation_result.info.response["BSCL[sq504V52]"])
                }]
            };

            // Interpretation
            zusatzitem.items.forEach(function(item, itemID) {
                item.result = "undefined";

                if (item.field === 0) {
                    item.result = "überhaupt nicht";
                };
                if (item.field === 1) {
                    item.result = "ein wenig";
                };
                if (item.field === 2) {
                    item.result = "ziemlich";
                };
                if (item.field === 3) {
                    item.result = "stark";
                };
                if (item.field === 4) {
                    item.result = "sehr stark";
                };
            });

            zusatzitems_array.push(zusatzitem);
        });

        $scope.d.zusatzitems = zusatzitems_array;
    };


    $scope.loadKS = function() {

        $scope.d.ks = {};

        var ks_file = __opapp_include_as_js_string(includes/ks_bscl.json)

        ks_file = JSON.parse(ks_file);

        $scope.d.ks = ks_file;

        // console.log('DEBUG 1', $scope.d.ks);


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


        // console.log('DEBUG 2', $scope.d.dataMain.calculations["0"].calculation_results["0"]);

        $scope.d.ks.normgurppe = {};
        //$scope.d.ks.normgurppe.n = '(N=' + $scope.d.dataMain.calculations["0"].calculation_results["0"].percentile.age_perz.n + ')';


        //$scope.d.ks.normgurppe.text = age + ', ' + edu + ' ' + $scope.d.ks.normgurppe.n;

        console.log('(✓) Klinikstichprobe geladen: ', $scope.d.ks);

        // Follow the white rabbit
        $scope.init();
        $scope.buildZusatzitemsArray();
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
            //console.log('(???) ', pos, posID, current_dim);

            current_location_text = current_location_text + current_dim.name + ': ' + current_dim.array[pos].text;
        });


        var statistics = null;
        if (data_dive !== null) {
            statistics = data_dive.statistics;
            current_location_n = statistics.somatisierung_scale_score.n;
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


    $scope.init = function() {

        $scope.d.bscl = {};
        $scope.d.bscl.init = false;
        $scope.d.bscl.show_legend = false;

        // Default Z-Score Option
        $scope.d.bscl.zscore_options = {
            "zscore_min": -4,
            "zscore_max": 12,
            "clinicsample_color": "#C5CAE9",
            "centered_zero": false,
            "show_text": false,
            "show_clinicsample": true,
            "show_clinicsample_scores": false,
            "show_numbers": true
        };


        // Toggles | Grafiken
        $scope.d.bscl.toggles = {
            "show_text": true,
            "show_clinicsample": true,
            "show_clinicsample_scores": false
        };


        // Gruppierung der Messungen
        $scope.d.bscl.groups = angular.copy($scope.d.dataMain.calculations["0"].calculation_results["0"].definitions.result_array);

        // Reverse Group-Order
        $scope.d.bscl.groups.reverse();


        $scope.d.bscl.groups.forEach(function(group, groupID) {
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
                current_calc.date = sr.entity.data.response.q504V00;
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
            if (mz_id === 99) {
                mz_id = 5; // Unbekannt => Alle Messzeitpunkte
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
            $scope.d.bscl.groups.forEach(function(group, groupID) {

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
                        "text_left_caption": "BSCL",
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
                if (messung_obj.zscore.zscore >= 2) {
                    // Auffällige Testleistung: Rot
                    messung_obj.zscore.zscore_color = '#F44336';
                };

                // console.log('(!) 4 - messung_obj', messung_obj);

                group.data.push(messung_obj);


            });
        });

        // MD - Daten befüllen
        $scope.d.bscl.groups.forEach(function(group, groupID) {
            group.data.forEach(function(groupInner, groupInnerID) {
                $scope.changeClinicSample(groupInner, groupID);
                // console.log('(!) -- changeClinicSample', groupInner);
            });
        });

        $scope.d.bscl.show_legend = false;

        $scope.d.bscl.init = true;
    };


    $scope.changeClinicSample = function(current_sample, groupID) {

        current_sample.ks.path_data = $scope.getKSLocation(current_sample.ks.path_selected);

        if (current_sample.ks.path_data.statistics !== null) {


            var current_group = current_sample.calculation.definitions.result_array[groupID];
            var variable_name = current_group.short_description + "_" + "z_score";


            if (variable_name !== "zusatzitems_z_score") {

                //console.log('(?) current :: ', variable_name, current_group, current_sample.ks.path_data);

                current_sample.zscore.clinicsample_start = $scope.roundToTwo(current_sample.ks.path_data.statistics[variable_name].mean_1sd_min);
                current_sample.zscore.clinicsample_end = $scope.roundToTwo(current_sample.ks.path_data.statistics[variable_name].mean_1sd_plus);


                // Kliniksample gemäss Messzeitpunkt färben
                var mz_id = parseInt(current_sample.ks.path_data.path["0"]);

                // Austritt EP / Übertritt EP / Austritt EAS / Austritt EP
                var cs_color = ['#9E9E9E', '#EEEEEE', '#E8EAF6', '#BDBDBD', '#BDBDBD'];
                current_sample.zscore.clinicsample_color = cs_color[mz_id];

                if (current_sample.zscore.clinicsample_color === 'none') {
                    current_sample.zscore.clinicsample_color = '#9E9E9E';
                };


                // Auffällige Testleistung | im Vergleich KS | färben
                // current_sample.zscore.zscore_color = '#1A237E';
                // if (current_sample.zscore.zscore < current_sample.zscore.clinicsample_start) {
                //     // Auffällige Testleistung: Rot
                //     current_sample.zscore.zscore_color = '#4CAF50';
                // };
                // if (current_sample.zscore.zscore > current_sample.zscore.clinicsample_end) {
                //     // Auffällige Testleistung: Grün
                //     current_sample.zscore.zscore_color = '#F44336';
                // };
            };



        } else {
            current_sample.zscore.clinicsample_start = 0;
            current_sample.zscore.clinicsample_end = 0;
        };

        $scope.d.bscl.show_legend = true;

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
