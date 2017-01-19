d.tmt_create_pdf_stack = function() {

    var tmt = $scope.d.appData["ch.suedhang.apps.tmt.production"].app_scope.tmt;
    var stack_all = [];
    var stack_eintritt = [];


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
                "text": " Die Z-Werte wurden aufgrund der Normstichprobe nach Tombaugh (2004) berechnet (N=39).",
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

    tmt.groups.forEach(function(group, groupID) {

        var gruppen_name = {
            "text": group.name,
            "margin": [0, 6, 0, 0],
            "style": "h3"
        };

        stack_all.push(gruppen_name);
        stack_eintritt.push(gruppen_name);


        tmt.zscore_options.width = 440;

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
                if (messung.zscore.text_left === 'Eintritt') {
                    // console.log('Klinikstichprobe', ks_eintritt);
                    ks_eintritt.columns[1].stack.push(ks_item);
                };
            };

            var zeit_fehler_array = [];
            if (group.name === "TMT A") {
                var zeit = { "text": "Zeit: " + messung.calculation.TMTATime };
                var fehler = { "text": "Fehler: " + messung.calculation.TMTAError };
                var ba = { "text": "B/A: " + $scope.roundToTwo(messung.calculation.quotient) };
            } else {
                var zeit = { "text": "Zeit: " + messung.calculation.TMTBTime };
                var fehler = { "text": "Fehler: " + messung.calculation.TMTBError };
                var ba = { "text": "B/A: " + $scope.roundToTwo(messung.calculation.quotient) };
            };
            zeit_fehler_array.push(zeit);
            zeit_fehler_array.push(fehler);

            if (messung.zscore.text_left === "Eintritt") {
                zeit_fehler_array.push(ba);
            };


            var count_steps = 0;
            if (tmt.zscore_options.zscore_min <= 0) {
                count_steps = Math.abs(tmt.zscore_options.zscore_min) + Math.abs(tmt.zscore_options.zscore_max);
            } else {
                count_steps = Math.abs(tmt.zscore_options.zscore_max) - Math.abs(tmt.zscore_options.zscore_min);
            };


            // Zahlen -3 | 0 | +3
            var zahlen_to_push = $scope.d.templates.z_score_zahlen(tmt.zscore_options.zscore_min, tmt.zscore_options.zscore_max, tmt.zscore_options.width);

            var z_score_grafik = {
                "alignment": "left",
                "columnGap": 12,
                "columns": [{
                    "width": "*",
                    "stack": [{
                        "columns": [
                            { "text": messung.zscore.text_left, "alignment": "left" }, {
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
                            },
                            { "text": messung.zscore.text_right, "alignment": "right" }
                        ],
                        "fontSize": 10,
                        "color": "#212121",
                        "margin": [0, 3, 0, 1]
                    }, {
                        "canvas": $scope.d.templates.z_score(messung.zscore, tmt.zscore_options)
                    }]
                }, {
                    "width": 62,
                    "fontSize": 10,
                    "alignment": "left",
                    "stack": zeit_fehler_array,
                    "margin": [0, 13, 0, 0]
                }]
            };


            // Alle Messungen anzeigen
            var z_score_grafik_all = angular.copy(z_score_grafik);
            if (messungID === group.data.length - 1) {
                z_score_grafik_all.columns["0"].stack.push(zahlen_to_push);
            };
            if (group.name !== "Zusatzitems") {
                stack_all.push($scope.d.templates.keepTogether(z_score_grafik_all));
            };

            // Nur gewünschte Messungen anzeigen
            if (messung.zscore.text_left === 'Eintritt') {
                var z_score_grafik_eintritt = angular.copy(z_score_grafik);
                z_score_grafik_eintritt.columns["0"].stack.push(zahlen_to_push);
                stack_eintritt.push($scope.d.templates.keepTogether(z_score_grafik_eintritt));
            };
        });

        // Klinikstichprobe nur einmalig speichern
        if (groupID === 0) {
            $scope.d.appData["ch.suedhang.apps.tmt.production"].pdf.all.push($scope.d.templates.keepTogether(ks_alle));
            $scope.d.appData["ch.suedhang.apps.tmt.production"].pdf.eintritt.push($scope.d.templates.keepTogether(ks_eintritt));
        };

    });

    $scope.d.appData["ch.suedhang.apps.tmt.production"].pdf.eintritt.push(stack_eintritt);
    $scope.d.appData["ch.suedhang.apps.tmt.production"].pdf.all.push(stack_all);
};

// "Copy" from App

d.tmt_loadKS = function(calculation_results) {

    var ks = {};

    var ks_file = include_as_js_string(
        ks_tmt.json)

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

    var current_ks = $scope.d.appData["ch.suedhang.apps.tmt.production"].app_scope.ks;

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

    //console.log('(Done) changeClinicSample', current_sample);
};

d.tmt_initTMT = function() {


    $scope.d.appData["ch.suedhang.apps.tmt.production"].app_scope.tmt = {};
    $scope.d.appData["ch.suedhang.apps.tmt.production"].app_scope.tmt.init = false;
    $scope.d.appData["ch.suedhang.apps.tmt.production"].app_scope.tmt.show_legend = false;

    // Default Z-Score Option
    $scope.d.appData["ch.suedhang.apps.tmt.production"].app_scope.tmt.zscore_options = {
        "zscore_min": -5,
        "zscore_max": 5,
        "clinicsample_color": "#C5CAE9",
        "centered_zero": true,
        "show_text": true,
        "show_clinicsample": true,
        "show_clinicsample_scores": false,
        "show_numbers": true
    };


    // Gruppierung der Messungen
    $scope.d.appData["ch.suedhang.apps.tmt.production"].app_scope.tmt.groups = [{
        "name": "TMT A",
        "data": []
    }, {
        "name": "TMT B",
        "data": []
    }];


    // Build  & Sort | Neueste Messung als letzter Eintrag
    // Loop via survey_responses
    var survey_responses = $scope.d.appData["ch.suedhang.apps.tmt.production"].data.survey_responses;
    var alle_messungen = [];
    survey_responses.forEach(function(sr, srID) {
        if (("calculations" in sr) && (sr.calculations.length > 0)) {
            var current_calc = sr.calculations["0"].calculation_result;
            current_calc.date = current_calc.info.filled;
            alle_messungen.push(current_calc);
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


        // $scope.d.appData["ch.suedhang.apps.tmt.production"].app_scope.tmt.zscore_options anpassen
        if (Math.abs(zscore_A) > (Math.abs($scope.d.appData["ch.suedhang.apps.tmt.production"].app_scope.tmt.zscore_options.zscore_min) - 0.5)) {
            $scope.d.appData["ch.suedhang.apps.tmt.production"].app_scope.tmt.zscore_options.zscore_min = (Math.abs(zscore_A) + 1) * -1;
        };

        if (Math.abs(zscore_B) > (Math.abs($scope.d.appData["ch.suedhang.apps.tmt.production"].app_scope.tmt.zscore_options.zscore_max) - 0.5)) {
            $scope.d.appData["ch.suedhang.apps.tmt.production"].app_scope.tmt.zscore_options.zscore_max = (Math.abs(zscore_B) + 1);
        };



        // Default Pfad für MD-Array erstellen
        var dimensions_path = [];
        var current_ks = $scope.d.appData["ch.suedhang.apps.tmt.production"].app_scope.ks;
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
        $scope.d.appData["ch.suedhang.apps.tmt.production"].app_scope.tmt.groups.forEach(function(group, groupID) {

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
    $scope.d.appData["ch.suedhang.apps.tmt.production"].app_scope.tmt.groups.forEach(function(group, groupID) {
        group.data.forEach(function(groupInner, groupInnerID) {
            d.tmt_changeClinicSample(groupInner);
            //console.log('(!) 3 - changeClinicSample', groupID, groupInnerID, groupInner);
        });
    });


    d.tmt_create_pdf_stack();
};
