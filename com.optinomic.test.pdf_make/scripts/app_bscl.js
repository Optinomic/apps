d.bscl_loadKS = function() {

    $scope.d.appData["ch.suedhang.apps.bscl_anq"].app_scope.ks = {};

    var ks_file = include_as_js_string(
        ks_bscl.json)

    ks_file = JSON.parse(ks_file);

    $scope.d.appData["ch.suedhang.apps.bscl_anq"].app_scope.ks = ks_file;



    $scope.d.appData["ch.suedhang.apps.bscl_anq"].app_scope.ks.text = '';
    $scope.d.appData["ch.suedhang.apps.bscl_anq"].app_scope.ks.dimensions.forEach(function(dim, dimID) {
        if ($scope.d.appData["ch.suedhang.apps.bscl_anq"].app_scope.ks.text !== '') {
            $scope.d.appData["ch.suedhang.apps.bscl_anq"].app_scope.ks.text = $scope.d.appData["ch.suedhang.apps.bscl_anq"].app_scope.ks.text + ', '
        };
        $scope.d.appData["ch.suedhang.apps.bscl_anq"].app_scope.ks.text = $scope.d.appData["ch.suedhang.apps.bscl_anq"].app_scope.ks.text + dim.name
    });
    $scope.d.appData["ch.suedhang.apps.bscl_anq"].app_scope.ks.text = $scope.d.appData["ch.suedhang.apps.bscl_anq"].app_scope.ks.n_scores + ' Messungen normiert nach ' + $scope.d.appData["ch.suedhang.apps.bscl_anq"].app_scope.ks.text;
    var datum_ks = $filter('date')($scope.d.appData["ch.suedhang.apps.bscl_anq"].app_scope.ks.date);
    $scope.d.appData["ch.suedhang.apps.bscl_anq"].app_scope.ks.text = $scope.d.appData["ch.suedhang.apps.bscl_anq"].app_scope.ks.text + ' (' + datum_ks + ')'



    $scope.d.appData["ch.suedhang.apps.bscl_anq"].app_scope.ks.normgurppe = {};
    //$scope.d.appData["ch.suedhang.apps.bscl_anq"].app_scope.ks.normgurppe.n = '(N=' + $scope.d.appData["ch.suedhang.apps.bscl_anq"].data.calculations["0"].calculation_results["0"].percentile.age_perz.n + ')';


    //$scope.d.appData["ch.suedhang.apps.bscl_anq"].app_scope.ks.normgurppe.text = age + ', ' + edu + ' ' + $scope.d.appData["ch.suedhang.apps.bscl_anq"].app_scope.ks.normgurppe.n;

    console.log('(✓) Klinikstichprobe geladen: ', $scope.d.appData["ch.suedhang.apps.bscl_anq"].app_scope.ks);
    // Follow the white rabbit
    d.bscl_init();
};

d.bscl_getKSLocation = function(location_array) {

    var current_ks = $scope.d.appData["ch.suedhang.apps.bscl_anq"].app_scope.ks;

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

d.bscl_create_pdf_stack = function() {

    var item = $scope.d.appData["ch.suedhang.apps.bscl_anq"].app_scope.bscl;
    var stack_all = [];
    var stack_eintritt = [];

    var left_colum = false;
    var stack_left = [];
    var stack_right = [];

    item.groups.forEach(function(group, groupID) {


        left_colum = !left_colum;
        if (left_colum) {
            var current_stack = stack_left;
        } else {
            var current_stack = stack_right;
        };




        var gruppen_name = {
            "text": group.description,
            "style": "h3",
            "margin": [0, 6, 0, 0]
        };

        current_stack.push(gruppen_name);


        var gaga = {
            "alignment": "left",
            "columns": [{
                "width": "auto",
                "stack": [{
                    "columns": [
                        { "text": "Eintritt", "alignment": "left" },
                        { "text": "Datum", "alignment": "right" }
                    ],
                    "fontSize": 10,
                    "color": "#212121",
                    "margin": [0, 3, 0, 1]
                }, {
                    "canvas": [{
                        type: "rect",
                        x: 0,
                        y: 0,
                        w: 250,
                        h: 30,
                        "lineColor": "#E0E0E0"
                    }]
                }, {
                    "columns": [
                        { "text": "Eintritt", "alignment": "left" },
                        { "text": "Datum", "alignment": "right" }
                    ],
                    "fontSize": 10,
                    "color": "#212121",
                    "margin": [0, 3, 0, 1]
                }, {
                    "canvas": [{
                        type: "rect",
                        x: 0,
                        y: 0,
                        w: item.zscore_options.width,
                        h: 30,
                        "lineColor": "#E0E0E0"
                    }]
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
                }]
            }],
            "columnGap": 12,
            "margin": [0, 0, 0, 6]
        };


        // stack_all.push(gruppen_name);
        // stack_eintritt.push(gruppen_name);


        item.zscore_options.width = 251;

        group.data.forEach(function(messung, messungID) {

            // Zahlen -3 | 0 | +3

            var count_steps = 0;
            if (item.zscore_options.zscore_min <= 0) {
                count_steps = Math.abs(item.zscore_options.zscore_min) + Math.abs(item.zscore_options.zscore_max);
            } else {
                count_steps = Math.abs(item.zscore_options.zscore_max) - Math.abs(item.zscore_options.zscore_min);
            };


            var zahlen_to_push = {};

            zahlen_to_push = {
                "columns": [],
                "width": item.zscore_options.width,
                "fontSize": 9,
                "color": "#757575",
                "margin": [0, 0, 0, 12]
            };

            for (var i = 0; i < count_steps + 1; i++) {
                var value = item.zscore_options.zscore_min + i;
                var alignment = "left";

                if (value === 0) {
                    alignment = "center";
                };

                if (value > 0) {
                    alignment = "right";
                };

                var obj_to_push = {
                    "text": value.toString(),
                    "alignment": alignment
                };
                zahlen_to_push.columns.push(obj_to_push);
            };

            // console.log(JSON.stringify(zahlen_to_push, null, 2));


            var z_score_grafik = {
                "alignment": "left",
                "columnGap": 12,
                "columns": [{
                    "width": item.zscore_options.width,
                    "stack": [{
                        "columns": [
                            { "text": messung.zscore.text_left, "alignment": "left" },
                            { "text": messung.zscore.text_right, "alignment": "right" }
                        ],
                        "fontSize": 10,
                        "color": "#212121",
                        "margin": [0, 3, 0, 1]
                    }, {
                        "canvas": $scope.d.templates.z_score(messung.zscore, item.zscore_options)
                    }]
                }, {
                    "width": 62,
                    "fontSize": 10,
                    "alignment": "left",
                    "stack": [],
                    "margin": [0, 13, 0, 0]
                }]
            };


            // Alle Messungen anzeigen
            var z_score_grafik_all = angular.copy(z_score_grafik);
            if (messungID === group.data.length - 1) {
                z_score_grafik_all.columns["0"].stack.push(zahlen_to_push);
            };
            current_stack.push(z_score_grafik_all);

            // Nur gewünschte Messungen anzeigen
            // if (messung.zscore.text_left === 'Eintritt') {
            //     var z_score_grafik_eintritt = angular.copy(z_score_grafik);
            //     z_score_grafik_eintritt.columns["0"].stack.push(zahlen_to_push);
            //     stack_eintritt.push(z_score_grafik_eintritt);
            // };


        });


    });


    var my_colums = {
        "columns": [{
            "width": item.zscore_options.width,
            "stack": stack_left
        }, {
            "width": item.zscore_options.width,
            "stack": stack_right
        }],
        "columnGap": 12,
    };

    stack_eintritt.push(my_colums);
    stack_all.push(my_colums);



    $scope.d.appData["ch.suedhang.apps.bscl_anq"].pdf.eintritt.push(stack_eintritt);
    $scope.d.appData["ch.suedhang.apps.bscl_anq"].pdf.all.push(stack_all);
};

d.bscl_init = function() {

    $scope.d.appData["ch.suedhang.apps.bscl_anq"].app_scope.bscl = {};

    // Default Z-Score Option
    $scope.d.appData["ch.suedhang.apps.bscl_anq"].app_scope.bscl.zscore_options = {
        "zscore_min": -4,
        "zscore_max": 12,
        "clinicsample_color": "#C5CAE9",
        "centered_zero": false,
        "show_text": false,
        "show_clinicsample": true,
        "show_clinicsample_scores": false,
        "show_numbers": true
    };



    // Gruppierung der Messungen
    $scope.d.appData["ch.suedhang.apps.bscl_anq"].app_scope.bscl.groups = angular.copy($scope.d.appData["ch.suedhang.apps.bscl_anq"].data.calculations["0"].calculation_results["0"].definitions.result_array);

    $scope.d.appData["ch.suedhang.apps.bscl_anq"].app_scope.bscl.groups.forEach(function(group, groupID) {
        delete group.result;
        group.data = [];
    });

    // Build  & Sort | Neueste Messung als letzter Eintrag
    var alle_messungen = angular.copy($scope.d.appData["ch.suedhang.apps.bscl_anq"].data.calculations[0].calculation_results);
    alle_messungen.forEach(function(messung, messungID) {
        messung.date = messung.info.filled;
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
        // if (mz_id === 99) {
        //     mz_id = 2; // Unbekannt => Anderer Messzeitpunkt
        // };


        // Gender
        var gender_id = 0 // Frau
        if ($scope.d.dataMain.patient.data.gender === 'male') {
            gender_id = 1;
        };

        // Default Pfad für MD-Array erstellen
        var current_ks = $scope.d.appData["ch.suedhang.apps.bscl_anq"].app_scope.ks;
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


        var md_data = d.bscl_getKSLocation(dimensions_path);
        // console.log('(!) 3 - md_data', dimensions_path, md_data);


        // Resultate in Gruppen schreiben
        $scope.d.appData["ch.suedhang.apps.bscl_anq"].app_scope.bscl.groups.forEach(function(group, groupID) {

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

            // console.log('(!) 4 - messung_obj', messung_obj);

            group.data.push(messung_obj);


        });
    });

    // MD - Daten befüllen
    $scope.d.appData["ch.suedhang.apps.bscl_anq"].app_scope.bscl.groups.forEach(function(group, groupID) {
        group.data.forEach(function(groupInner, groupInnerID) {
            d.bscl_changeClinicSample(groupInner, groupID);
            // console.log('(!) -- changeClinicSample', groupInner);
        });
    });


    d.bscl_create_pdf_stack();
};

d.bscl_changeClinicSample = function(current_sample, groupID) {

    current_sample.ks.path_data = d.bscl_getKSLocation(current_sample.ks.path_selected);

    if (current_sample.ks.path_data.statistics !== null) {


        var current_group = current_sample.calculation.definitions.result_array[groupID];
        var variable_name = current_group.short_description + "_" + "z_score";


        if (variable_name !== "zusatzitems_z_score") {

            // console.log('(?) current :: ', variable_name, current_group, current_sample.ks.path_data);

            current_sample.zscore.clinicsample_start = $scope.roundToTwo(current_sample.ks.path_data.statistics[variable_name].mean_1sd_min);
            current_sample.zscore.clinicsample_end = $scope.roundToTwo(current_sample.ks.path_data.statistics[variable_name].mean_1sd_plus);


            // Kliniksample gemäss Messzeitpunkt färben
            var mz_id = parseInt(current_sample.ks.path_data.path["0"]);

            // Eintritt / Austritt / Anderer MZ
            var cs_color = ['#9E9E9E', '#EEEEEE', '#E8EAF6'];
            current_sample.zscore.clinicsample_color = cs_color[mz_id];


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
        };



    } else {
        current_sample.zscore.clinicsample_start = 0;
        current_sample.zscore.clinicsample_end = 0;
    };
};
