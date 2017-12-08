d.isk_create_pdf_stack = function() {

    // Init
    var item = $scope.d.appData["ch.suedhang.apps.isk.production"].app_scope.ISK;

    // Klinikstichproben
    var ks = {
        "margin": [0, 6, 0, 0],
        "alignment": 'left',
        "columnGap": 12,
        "columns": [{
            "width": 192,
            "stack": [{
                "text": "Normstichprobe",
                "style": "h3"
            }, {
                "text": " Die Z-Werte wurden aufgrund der Normstichprobe nach Kanning (2009) berechnet.",
                "fontSize": 10,
                "style": "caption"
            }]
        }, {
            "width": "*",
            "stack": [{
                "text": "Klinikstichprobe",
                "style": "h3"
            }]
        }]
    };

    var ks_alle = angular.copy(ks);
    var ks_eintritt = angular.copy(ks);


    // Reverse Group-Order
    item.groups.reverse();

    item.groups.forEach(function(group, groupID) {

        var messungen_alle = [];
        var messungen_eintritt = [];


        group.data.forEach(function(messung, messungID) {

            var ks_nummer = messungID + 1;

            var ks_item = {
                "alignment": 'left',
                "margin": [0, 0, 0, 3],
                "columnGap": 6,
                "columns": [{
                    "width": 18,
                    "stack": [{
                        "text": [{
                            "text": "*",
                            "color": "#7986CB",
                            "fontSize": 10,
                            "style": "p"
                        }, {
                            "text": ks_nummer.toString(),
                            "fontSize": 10,
                            "color": "#3F51B5",
                            "style": "p"
                        }]
                    }]
                }, {
                    "width": "*",
                    "stack": [{
                        "text": " " + messung.ks.path_data.text_full,
                        "fontSize": 10,
                        "style": "caption"
                    }]
                }]
            };

            // Klinikstichprobe nur einmalig befüllen
            if (groupID === 0) {

                // Alle KS-Einträge
                ks_alle.columns[1].stack.push(ks_item);

                // Eintritt KS-Einträge
                if ((messung.calculation.info.mz.mz_id === 1) || (messung.calculation.info.mz.mz_id === 99)) {
                    // console.log('Klinikstichprobe', ks_eintritt);
                    ks_eintritt.columns[1].stack.push(ks_item);
                };
            };


            var z_score_grafik_b = {
                "alignment": "left",
                "columnGap": 12,
                "columns": [{
                    "width": item.zscore_options.width,
                    "stack": [{
                        "columns": [{
                            "width": "*",
                            "text": " " + messung.zscore.text_left,
                            "alignment": "left"
                        }, {
                            "width": 20,
                            "alignment": "center",
                            "text": [{
                                "text": "*",
                                "color": "#7986CB",
                                "fontSize": 9,
                                "style": "p"
                            }, {
                                "text": ks_nummer.toString(),
                                "fontSize": 9,
                                "color": "#3F51B5",
                                "style": "p"
                            }]
                        }, {
                            "width": "*",
                            "text": " " + messung.zscore.text_right,
                            "alignment": "right"
                        }],
                        "fontSize": 10,
                        "color": "#212121",
                        "margin": [0, 3, 0, 1]
                    }, {
                        "canvas": []
                    }]
                }]
            };

            item.zscore_options.width = 280;
            var z_score_grafik_b_all = angular.copy(z_score_grafik_b);
            z_score_grafik_b_all.columns["0"].width = item.zscore_options.width;
            z_score_grafik_b_all.columns["0"].stack[1].canvas = $scope.d.templates.z_score(messung.zscore, item.zscore_options);

            item.zscore_options.width = 280;
            var z_score_grafik_b_eintritt = angular.copy(z_score_grafik_b);
            z_score_grafik_b_eintritt.columns["0"].width = item.zscore_options.width;
            z_score_grafik_b_eintritt.columns["0"].stack[1].canvas = $scope.d.templates.z_score(messung.zscore, item.zscore_options);


            // Alle Messungen
            messungen_alle.push(z_score_grafik_b_all);

            // Eintritt
            if ((messung.calculation.info.mz.mz_id === 1) || (messung.calculation.info.mz.mz_id === 99)) {
                messungen_eintritt.push(z_score_grafik_b_eintritt);
            };
        });


        // Zahlen -3 | 0 | +3
        var z_score_zahlen = {};
        z_score_zahlen = $scope.d.templates.z_score_zahlen(item.zscore_options.zscore_min, item.zscore_options.zscore_max, 351);
        messungen_alle.push(z_score_zahlen);
        z_score_zahlen = $scope.d.templates.z_score_zahlen(item.zscore_options.zscore_min, item.zscore_options.zscore_max, 301);
        messungen_eintritt.push(z_score_zahlen);


        var group_data_model = {
            "stack": [{
                "text": group.description,
                "margin": [0, 6, 0, 0],
                "alignment": "left",
                "style": "h3"
            }, {
                "text": " " + group.full,
                "margin": [0, 3, 0, 3],
                "alignment": "left",
                "fontSize": 10,
                "style": "caption"
            }, {
                "alignment": "left",
                "columns": [{
                    "width": 110,
                    "fontSize": 10,
                    "alignment": "right",
                    "text": " " + group.sub_left,
                    "margin": [0, 12, 0, 0]
                }, {
                    "width": "auto",
                    "stack": []
                }, {
                    "width": 110,
                    "fontSize": 10,
                    "alignment": "left",
                    "text": " " + group.sub_right,
                    "margin": [0, 12, 0, 0]
                }],
                "columnGap": 12,
                "margin": [0, 0, 0, 6]
            }]
        };


        var group_alle = angular.copy(group_data_model);
        group_alle.stack[2].columns[1].stack = messungen_alle;

        var group_eintritt = angular.copy(group_data_model);
        group_eintritt.stack[2].columns[1].stack = messungen_eintritt;


        // Klinikstichprobe nur einmalig speichern
        if (groupID === 0) {
            console.log('Klinikstichproben', ks_alle, ks_eintritt);
            $scope.d.appData["ch.suedhang.apps.isk.production"].pdf.all.push($scope.d.templates.keepTogether(ks_alle));
            $scope.d.appData["ch.suedhang.apps.isk.production"].pdf.eintritt.push($scope.d.templates.keepTogether(ks_eintritt));
        };

        // Save
        $scope.d.appData["ch.suedhang.apps.isk.production"].pdf.all.push($scope.d.templates.keepTogether(group_alle));
        $scope.d.appData["ch.suedhang.apps.isk.production"].pdf.eintritt.push($scope.d.templates.keepTogether(group_eintritt));
    });
};

d.isk = function() {

    $scope.d.appData["ch.suedhang.apps.isk.production"].app_scope.ks = {};

    var ks_file = __opapp_include_as_js_string(includes/ks_isk.json)

    ks_file = JSON.parse(ks_file);

    $scope.d.appData["ch.suedhang.apps.isk.production"].app_scope.ks = ks_file;



    $scope.d.appData["ch.suedhang.apps.isk.production"].app_scope.ks.text = '';
    $scope.d.appData["ch.suedhang.apps.isk.production"].app_scope.ks.dimensions.forEach(function(dim, dimID) {
        if ($scope.d.appData["ch.suedhang.apps.isk.production"].app_scope.ks.text !== '') {
            $scope.d.appData["ch.suedhang.apps.isk.production"].app_scope.ks.text = $scope.d.appData["ch.suedhang.apps.isk.production"].app_scope.ks.text + ', '
        };
        $scope.d.appData["ch.suedhang.apps.isk.production"].app_scope.ks.text = $scope.d.appData["ch.suedhang.apps.isk.production"].app_scope.ks.text + dim.name
    });
    $scope.d.appData["ch.suedhang.apps.isk.production"].app_scope.ks.text = $scope.d.appData["ch.suedhang.apps.isk.production"].app_scope.ks.n_scores + ' Messungen normiert nach ' + $scope.d.appData["ch.suedhang.apps.isk.production"].app_scope.ks.text;
    var datum_ks = $filter('date')($scope.d.appData["ch.suedhang.apps.isk.production"].app_scope.ks.date);
    $scope.d.appData["ch.suedhang.apps.isk.production"].app_scope.ks.text = $scope.d.appData["ch.suedhang.apps.isk.production"].app_scope.ks.text + ' (' + datum_ks + ')'



    $scope.d.appData["ch.suedhang.apps.isk.production"].app_scope.ks.normgurppe = {};
    //$scope.d.appData["ch.suedhang.apps.isk.production"].app_scope.ks.normgurppe.n = '(N=' + $scope.d.appData["ch.suedhang.apps.isk.production"].data.calculations["0"].calculation_results["0"].percentile.age_perz.n + ')';


    //$scope.d.appData["ch.suedhang.apps.isk.production"].app_scope.ks.normgurppe.text = age + ', ' + edu + ' ' + $scope.d.appData["ch.suedhang.apps.isk.production"].app_scope.ks.normgurppe.n;

    console.log('(✓) Klinikstichprobe geladen: ', $scope.d.appData["ch.suedhang.apps.isk.production"].app_scope.ks);

    // Follow the white rabbit
    d.isk_init();
};

d.isk_getKSLocation = function(location_array) {

    var current_ks = $scope.d.appData["ch.suedhang.apps.isk.production"].app_scope.ks;

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

    //console.log('getKSLocation', location);

    return angular.copy(location);
};

d.isk_init = function() {

    $scope.d.appData["ch.suedhang.apps.isk.production"].app_scope.ISK = {};
    $scope.d.appData["ch.suedhang.apps.isk.production"].app_scope.ISK.init = false;
    $scope.d.appData["ch.suedhang.apps.isk.production"].app_scope.ISK.show_legend = false;

    // Default Z-Score Option
    $scope.d.appData["ch.suedhang.apps.isk.production"].app_scope.ISK.zscore_options = {
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
    $scope.d.appData["ch.suedhang.apps.isk.production"].app_scope.ISK.toggles = {
        "show_text": true,
        "show_clinicsample": true,
        "show_clinicsample_scores": false
    };


    // Gruppierung der Messungen
    $scope.d.appData["ch.suedhang.apps.isk.production"].app_scope.ISK.groups = angular.copy($scope.d.appData["ch.suedhang.apps.isk.production"].data.calculations["0"].calculation_results["0"].definitions.result_array);

    $scope.d.appData["ch.suedhang.apps.isk.production"].app_scope.ISK.groups.forEach(function(group, groupID) {
        delete group.result;
        group.data = [];
    });


    // Build  & Sort | Neueste Messung als letzter Eintrag
    // Loop via survey_responses
    var survey_responses = $scope.d.appData["ch.suedhang.apps.isk.production"].data.survey_responses;
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
            mz_id = mz_id - 1;
        };


        // Gender
        var gender_id = 0 // Frau
        if ($scope.d.dataMain.patient.data.gender === 'male') {
            gender_id = 1;
        };

        // Default Pfad für MD-Array erstellen
        var current_ks = $scope.d.appData["ch.suedhang.apps.isk.production"].app_scope.ks;
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


        var md_data = d.isk_getKSLocation(dimensions_path);
        // console.log('(!) 3 - md_data', dimensions_path, md_data);


        // Resultate in Gruppen schreiben
        $scope.d.appData["ch.suedhang.apps.isk.production"].app_scope.ISK.groups.forEach(function(group, groupID) {

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
    $scope.d.appData["ch.suedhang.apps.isk.production"].app_scope.ISK.groups.forEach(function(group, groupID) {
        group.data.forEach(function(groupInner, groupInnerID) {
            d.isk_changeClinicSample(groupInner, groupID);
            // console.log('(!) -- changeClinicSample', groupInner);
        });
    });


    d.isk_create_pdf_stack();
};

d.isk_changeClinicSample = function(current_sample, groupID) {

    current_sample.ks.path_data = d.isk_getKSLocation(current_sample.ks.path_selected);

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


        // Auffällige Testleistung | Vergleich KS  färben
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

    $scope.d.appData["ch.suedhang.apps.isk.production"].app_scope.ISK.show_legend = true;

    // console.log('(Done) changeClinicSample', current_sample);
};
