d.tmt_loadKS = function(calculation_results) {

    var ks = {};

    var ks_file = include_as_js_string(
        ch_suedhang_user_apps_tmt_activated.json)

    ks_file = JSON.parse(ks_file);
    ks = ks_file;



    ks.text = '';
    ks.dimensions.forEach(function(dim, dimID) {
        if (ks.text !== '') {
            ks.text = ks.text + ', '
        };
        ks.text = ks.text + dim.name
    });
    ks.text = ks.n_scores + ' Messungen normiert nach ' + ks.text;
    var datum_ks = $filter('date')(ks.date);
    ks.text = ks.text + ' (' + datum_ks + ')'


    ks.normgurppe = {};
    ks.normgurppe.n = '(N=' + calculation_results.percentile.age_perz.n + ')';

    var age = calculation_results.percentile.age_perz.altersgruppe_text;
    var edu = calculation_results.percentile.age_perz.education;

    if (edu === 99) {
        edu = 'Jeder Ausbildungsgrad'
    };
    if (edu === 0) {
        edu = '<= 12 Jahre'
    };
    if (edu === 1) {
        edu = '> 12 Jahre'
    };
    ks.normgurppe.text = age + ', ' + edu + ' ' + ks.normgurppe.n;

    console.log('(✓) Klinikstichprobe geladen: ', ks);

    return ks;

};


d.tmt_getKSLocation = function(location_array) {

    var current_ks = $scope.d.appData["ch.suedhang.apps.tmt_V3"].app_scope.ks;

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


d.tmt_changeClinicSample = function(current_sample) {

    current_sample.ks.path_data = d.tmt_getKSLocation(current_sample.ks.path_selected);

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

    console.log('(Done) changeClinicSample', current_sample);
};

d.tmt_create_pdf_stack = function() {

    var tmt = $scope.d.appData["ch.suedhang.apps.tmt_V3"].app_scope.tmt;
    var stack = [];

    tmt.groups.forEach(function(group, groupID) {


        var gaga = [{
            "columns": [
                { "text": "Messzeitpunkt", "alignment": "left" },
                { "text": "Datum", "alignment": "right" }
            ],
            "fontSize": 10,
            "color": "#212121",
            "margin": [0, 3, 0, 1]
        }, {
            "canvas": $scope.d.templates.z_score()
        }, {
            "columns": [
                { "text": "Messzeitpunkt", "alignment": "left" },
                { "text": "Datum", "alignment": "right" }
            ],
            "fontSize": 10,
            "color": "#212121",
            "margin": [0, 3, 0, 1]
        }, {
            "canvas": $scope.d.templates.z_score()
        }, {
            "columns": [
                { "text": "-3", "alignment": "left" },
                { "text": "-2", "alignment": "left" },
                { "text": "-1", "alignment": "left" },
                { "text": "0", "alignment": "center" },
                { "text": "1", "alignment": "right" },
                { "text": "2", "alignment": "right" },
                { "text": "3", "alignment": "right" }
            ],
            "fontSize": 9,
            "color": "#757575"
        }];

        var z_scores_array = [];
        tmt.zscore_options.width = 270;

        group.data.forEach(function(messung, messungID) {

            var beschriftung = {
                "columns": [
                    { "text": messung.zscore.text_left, "alignment": "left" },
                    { "text": messung.zscore.text_right, "alignment": "right" }
                ],
                "fontSize": 10,
                "color": "#212121",
                "margin": [0, 3, 0, 1]
            };
            z_scores_array.push(beschriftung);

            var z_score_grafik = {
                "canvas": $scope.d.templates.z_score(messung.zscore, tmt.zscore_options)
            };
            z_scores_array.push(z_score_grafik);

        });


        var z_score_block = {
            "stack": [{
                "text": group.name,
                "style": "h3"
            }, {
                "alignment": "left",
                "columns": [{
                    "width": 110,
                    "fontSize": 10,
                    "alignment": "right",
                    "text": "LINKS: Dies ist ein Standardtext",
                    "margin": [0, 14, 0, 0]
                }, {
                    "width": "*",
                    "stack": z_scores_array
                }, {
                    "width": 110,
                    "fontSize": 10,
                    "alignment": "left",
                    "text": "RECHTS: Dies ist ein Standardtext für die Beschreibung, diese kann auch sehr lange sein.",
                    "margin": [0, 14, 0, 0]
                }],
                "columnGap": 12,
                "margin": [0, 0, 0, 6]
            }]
        };


        // push
        stack.push(z_score_block);

    });


    $scope.d.appData["ch.suedhang.apps.tmt_V3"].pdf = {
        "stack": stack
    };

};

d.tmt_initTMT = function() {

    $scope.d.appData["ch.suedhang.apps.tmt_V3"].app_scope.tmt = {};
    $scope.d.appData["ch.suedhang.apps.tmt_V3"].app_scope.tmt.init = false;
    $scope.d.appData["ch.suedhang.apps.tmt_V3"].app_scope.tmt.show_legend = false;

    // Default Z-Score Option
    $scope.d.appData["ch.suedhang.apps.tmt_V3"].app_scope.tmt.zscore_options = {
        "zscore_min": -6,
        "zscore_max": 6,
        "clinicsample_color": "#C5CAE9",
        "centered_zero": true,
        "show_text": true,
        "show_clinicsample": true,
        "show_clinicsample_scores": false,
        "show_numbers": true
    };


    // Gruppierung der Messungen
    $scope.d.appData["ch.suedhang.apps.tmt_V3"].app_scope.tmt.groups = [{
        "name": "TMT A",
        "data": []
    }, {
        "name": "TMT B",
        "data": []
    }];

    // Build 

    var alle_messungen = angular.copy($scope.d.appData["ch.suedhang.apps.tmt_V3"].data.calculations[0].calculation_results);

    // Sort | Neueste Messung als letzter Eintrag.
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


        // $scope.d.appData["ch.suedhang.apps.tmt_V3"].app_scope.tmt.zscore_options anpassen
        if (Math.abs(zscore_A) > (Math.abs($scope.d.appData["ch.suedhang.apps.tmt_V3"].app_scope.tmt.zscore_options.zscore_min) - 0.5)) {
            $scope.d.appData["ch.suedhang.apps.tmt_V3"].app_scope.tmt.zscore_options.zscore_min = (Math.abs(zscore_A) + 1) * -1;
        };

        if (Math.abs(zscore_B) > (Math.abs($scope.d.appData["ch.suedhang.apps.tmt_V3"].app_scope.tmt.zscore_options.zscore_max) - 0.5)) {
            $scope.d.appData["ch.suedhang.apps.tmt_V3"].app_scope.tmt.zscore_options.zscore_max = (Math.abs(zscore_B) + 1);
        };



        // Default Pfad für MD-Array erstellen
        var dimensions_path = [];
        var current_ks = $scope.d.appData["ch.suedhang.apps.tmt_V3"].app_scope.ks;
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
        $scope.d.appData["ch.suedhang.apps.tmt_V3"].app_scope.tmt.groups.forEach(function(group, groupID) {

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
    $scope.d.appData["ch.suedhang.apps.tmt_V3"].app_scope.tmt.groups.forEach(function(group, groupID) {
        group.data.forEach(function(groupInner, groupInnerID) {
            d.tmt_changeClinicSample(groupInner);
            //console.log('(!) 3 - changeClinicSample', groupID, groupInnerID, groupInner);
        });
    });


    d.tmt_create_pdf_stack();


};