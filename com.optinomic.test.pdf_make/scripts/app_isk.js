d.isk = function() {

    $scope.d.appData["ch.suedhang.apps.isk"].app_scope.ks = {};

    var ks_file = include_as_js_string(
        ks_isk.json)

    ks_file = JSON.parse(ks_file);

    $scope.d.appData["ch.suedhang.apps.isk"].app_scope.ks = ks_file;



    $scope.d.appData["ch.suedhang.apps.isk"].app_scope.ks.text = '';
    $scope.d.appData["ch.suedhang.apps.isk"].app_scope.ks.dimensions.forEach(function(dim, dimID) {
        if ($scope.d.appData["ch.suedhang.apps.isk"].app_scope.ks.text !== '') {
            $scope.d.appData["ch.suedhang.apps.isk"].app_scope.ks.text = $scope.d.appData["ch.suedhang.apps.isk"].app_scope.ks.text + ', '
        };
        $scope.d.appData["ch.suedhang.apps.isk"].app_scope.ks.text = $scope.d.appData["ch.suedhang.apps.isk"].app_scope.ks.text + dim.name
    });
    $scope.d.appData["ch.suedhang.apps.isk"].app_scope.ks.text = $scope.d.appData["ch.suedhang.apps.isk"].app_scope.ks.n_scores + ' Messungen normiert nach ' + $scope.d.appData["ch.suedhang.apps.isk"].app_scope.ks.text;
    var datum_ks = $filter('date')($scope.d.appData["ch.suedhang.apps.isk"].app_scope.ks.date);
    $scope.d.appData["ch.suedhang.apps.isk"].app_scope.ks.text = $scope.d.appData["ch.suedhang.apps.isk"].app_scope.ks.text + ' (' + datum_ks + ')'



    $scope.d.appData["ch.suedhang.apps.isk"].app_scope.ks.normgurppe = {};
    //$scope.d.appData["ch.suedhang.apps.isk"].app_scope.ks.normgurppe.n = '(N=' + $scope.d.appData["ch.suedhang.apps.isk"].data.calculations["0"].calculation_results["0"].percentile.age_perz.n + ')';


    //$scope.d.appData["ch.suedhang.apps.isk"].app_scope.ks.normgurppe.text = age + ', ' + edu + ' ' + $scope.d.appData["ch.suedhang.apps.isk"].app_scope.ks.normgurppe.n;

    console.log('(✓) Klinikstichprobe geladen: ', $scope.d.appData["ch.suedhang.apps.isk"].app_scope.ks);

    // Follow the white rabbit
    d.isk_init();
};


d.isk_getKSLocation = function(location_array) {

    var current_ks = $scope.d.appData["ch.suedhang.apps.isk"].app_scope.ks;

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

    $scope.d.appData["ch.suedhang.apps.isk"].app_scope.ISK = {};
    $scope.d.appData["ch.suedhang.apps.isk"].app_scope.ISK.init = false;
    $scope.d.appData["ch.suedhang.apps.isk"].app_scope.ISK.show_legend = false;

    // Default Z-Score Option
    $scope.d.appData["ch.suedhang.apps.isk"].app_scope.ISK.zscore_options = {
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
    $scope.d.appData["ch.suedhang.apps.isk"].app_scope.ISK.toggles = {
        "show_text": true,
        "show_clinicsample": true,
        "show_clinicsample_scores": false
    };


    // Gruppierung der Messungen
    $scope.d.appData["ch.suedhang.apps.isk"].app_scope.ISK.groups = angular.copy($scope.d.appData["ch.suedhang.apps.isk"].data.calculations["0"].calculation_results["0"].definitions.result_array);

    $scope.d.appData["ch.suedhang.apps.isk"].app_scope.ISK.groups.forEach(function(group, groupID) {
        delete group.result;
        group.data = [];
    });

    // Build  & Sort | Neueste Messung als letzter Eintrag
    var alle_messungen = angular.copy($scope.d.appData["ch.suedhang.apps.isk"].data.calculations[0].calculation_results);
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
        if (mz_id === 99) {
            mz_id = 2; // Unbekannt => Anderer Messzeitpunkt
        } else {
            mz_id = mz_id - 1;
        };


        // Gender
        var gender_id = 0 // Frau
        if ($scope.d.appData["ch.suedhang.apps.isk"].data.patient.data.gender === 'male') {
            gender_id = 1;
        };

        // Default Pfad für MD-Array erstellen
        var current_ks = $scope.d.appData["ch.suedhang.apps.isk"].app_scope.ks;
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
        $scope.d.appData["ch.suedhang.apps.isk"].app_scope.ISK.groups.forEach(function(group, groupID) {

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

            // console.log('(!) 4 - messung_obj', messung_obj);

            group.data.push(messung_obj);


        });
    });

    // MD - Daten befüllen
    $scope.d.appData["ch.suedhang.apps.isk"].app_scope.ISK.groups.forEach(function(group, groupID) {
        group.data.forEach(function(groupInner, groupInnerID) {
            d.isk_changeClinicSample(groupInner, groupID);
            // console.log('(!) -- changeClinicSample', groupInner);
        });
    });

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

    $scope.d.appData["ch.suedhang.apps.isk"].app_scope.ISK.show_legend = true;

    // console.log('(Done) changeClinicSample', current_sample);
};
