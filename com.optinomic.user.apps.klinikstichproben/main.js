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
        $scope.d.haveData = true;

        var dataPromiseMain = dataService.getMainAppData();
        dataPromiseMain.then(function(data) {

            // Save Data to $scope.d
            $scope.d.dataMain = data;
            var current_template = $scope.d.dataMain.params.location.viewname;


            // Run App-Functions
            $scope.d.ks = $scope.ks_init();

            $scope.getDimensions();

            if (current_template === 'klinikstichproben') {
                $scope.getAllKSApps();
            };


            // Finishing: Console Info & Init = done.
            console.log('Welcome, ', $scope.d.dataMain.apps.current.name, current_template, $scope.d);

            $scope.d.init = true;
        });
    };
    $scope.loadMainData();



    // --------------------------
    // Klinikstichprobe (ks) Init
    // --------------------------
    $scope.ks_init = function() {

        var ks = {};

        //  Create GUI for THIS later:
        //  Select all User-Apps with '*_klinikstichprobe' Calculations
        ks.app = {
            "selected": null,
            "calculations": {
                "all": null,
                "selected": null
            }
        };

        ks.apps = [];

        // Init
        ks.init = false;
        ks.pg = $scope.d.dataMain.patient_groups;
        ks.definitions = {};

        ks.md = {};
        ks.md.selected = {};
        ks.md.selected_info = {};

        ks.result_explorer = {
            "types": {
                "all": [{
                    "id": 0,
                    "name": 'Alle Variablen'
                }, {
                    "id": 1,
                    "name": 'Einzelne Variablen'
                }],
                "selected": null,
                "selected_var": null
            },
            "ks": {}
        };
        ks.result_explorer.types.selected = ks.result_explorer.types.all[1];

        // Klinikstichproben | Sets
        ks.ks_versions = {
            "tabs": {
                "selectedIndex": 0,
                "content": "SelectApp",
                "all": [{
                    "name": "App",
                    "disabled": false,
                    "tab_index": 0
                }]
            },
            "versions": {
                "all": [],
                "activated": []
            }
        };

        ks.create = {
            "step": 0,
            "pg_dimensions": [],
            "version": {
                "date": new Date(),
                "n_scores": null,
                "dimensions": [],
                "variables": [],
                "data": [],
                "id": 9999
            }
        };



        // Patienten-Gruppen | Dimensionen
        ks.pg_dimensions = {
            "tabs": {
                "selectedIndex": 0,
                "all": [{
                    "name": "Übersicht",
                    "disabled": false,
                    "tab_index": 0
                }, {
                    "name": "",
                    "disabled": false,
                    "tab_index": 1
                }]
            },
            "dimensions": {
                "all": [],
                "selected": {}
            }
        };



        return ks;
    };


    // -----------------------------------
    // Calculations
    // -----------------------------------


    $scope.getUserAppCalculation = function(app_id, calc_name) {


        $scope.d.ks.create.step = $scope.d.ks.create.step + 1;



        // Get specific calculation - Unneded already in 'd.dataMain.calculations[0].calculation_results'
        var call = dataService.getAppCalculationsUser(app_id, calc_name);

        call.success(function(data) {
            // Save Data to $scope.d
            $scope.d.ks.user_app_calc = data.calculation_result;

            // Clone some stuff for Using
            $scope.d.ks.md.scores = angular.copy($scope.d.ks.user_app_calc.md_patient_scores);
            $scope.d.ks.definitions.dimensions_app = angular.copy($scope.d.ks.user_app_calc.definitions.dimensions_app);
            $scope.d.ks.dimensions_app = angular.copy($scope.d.ks.user_app_calc.definitions.dimensions_app);

            // Init 'User-Selection' for Dimenstions | jeweils letzter Eintrag
            $scope.d.ks.dimensions_app.forEach(function(current_dim, myDimID) {
                current_dim.selected = current_dim.array[current_dim.array.length - 1];
            });
            $scope.d.ks.result_explorer.types.selected_var = $scope.d.ks.user_app_calc.definitions.variables_array[0];

            $scope.d.ks.definitions = $scope.merge_obj($scope.d.ks.definitions, $scope.d.ks.user_app_calc.definitions);
            $scope.d.ks.init = true;

            // Some more Functions to Run because we have Data.
            // $scope.enhanceDimensionsPG();

            $scope.d.ks.create.step = $scope.d.ks.create.step + 1;
            $scope.d.ks.functions.initSetAddPG();

            console.log('(DATA) Init, ', $scope.d.dataMain.apps.current.name, $scope.d.ks);

        });
        call.error(function(data) {
            console.log('(ERROR): getCalculation:', data);
            $scope.d.ks.user_app_calc = null;
        });
    };


    // ------------------------------------------
    // Do Statistics
    // ------------------------------------------
    $scope.getStatistics = function(data_array) {

        // Interessante Berechnungen | Statistics
        var s = {};


        if ($scope.isArray(data_array)) {
            s.n = data_array.length;
            s.min = $scope.min(data_array);
            s.max = $scope.max(data_array);
            s.mean = $scope.mean(data_array);
            s.variance = $scope.variance(data_array);
            s.standard_deviation = $scope.standard_deviation(data_array);
            s.mean_1sd_min = s.mean - s.standard_deviation;
            s.mean_1sd_plus = s.mean + s.standard_deviation;
            s.z_score_min = $scope.z_score(s.min, s.mean, s.standard_deviation);
            s.z_score_max = $scope.z_score(s.max, s.mean, s.standard_deviation);
        };


        // Return
        return s;
    };



    // -----------------------------------
    // Functions
    // -----------------------------------


    // ------------------------------------------
    // What Dimensions are given from Patien-Groups
    // Enhancing | Dimenstions with PG's
    // ------------------------------------------



    $scope.enhanceDimensionsPG = function() {

        function createNDimArray(dimensions) {
            var ret = undefined;
            if (dimensions.length == 1) {
                ret = new Array(dimensions[0]);
                for (var i = 0; i < dimensions[0]; i++)
                    ret[i] = null; //or another value
                return ret;
            } else {
                //recursion
                var rest = dimensions.slice(1);
                ret = new Array(dimensions[0]);
                for (var i = 0; i < dimensions[0]; i++)
                    ret[i] = createNDimArray(rest);
                return ret;
            };
        };


        var dimenstions_app = angular.copy($scope.d.ks.user_app_calc.definitions.dimensions_app);
        var dimensions_pg = $scope.d.ks.create.pg_dimensions;
        var dimensions_all = dimenstions_app.concat(dimensions_pg);

        var n_dimensions = [];
        for (var dIndex = 0; dIndex < dimensions_all.length; dIndex++) {
            var cd = dimensions_all[dIndex];
            n_dimensions.push(cd.array.length)
        };

        var md_all_data_empty = createNDimArray(n_dimensions);


        // Save to $scope
        $scope.d.ks.md.scores_all = angular.copy(md_all_data_empty);
        $scope.d.ks.definitions.md_all_data_empty = angular.copy(md_all_data_empty);
        $scope.d.ks.definitions.dimensions_all = dimensions_all;
        $scope.d.ks.definitions.dimensions_pg = dimensions_pg;
        $scope.d.ks.dimensions_all = angular.copy(dimensions_all);

        // Init 'User-Selection' for Dimensions | jeweils letzter Eintrag
        $scope.d.ks.dimensions_all.forEach(function(current_dim, myDimID) {
            current_dim.selected = current_dim.array[current_dim.array.length - 1];
        });

        // console.log('dimensions_all', n_dimensions, scores_all);

        // Do some more stuff now.
        $scope.writePatientScoresMD();
    };


    $scope.writePatientScoresMD = function() {


        var ps = angular.copy($scope.d.ks.user_app_calc.patient_scores);
        var data = $scope.d.ks.md.scores_all;
        var vars_array = $scope.d.ks.user_app_calc.definitions.variables_array;
        var dimensions_pg = $scope.d.ks.definitions.dimensions_pg;


        function concatAndStatistics(ziel, quelle, patient, vars_array) {

            var default_obj = {
                "patients": [],
                "scores": angular.copy($scope.d.ks.user_app_calc.definitions.variables),
                "statistics": angular.copy($scope.d.ks.user_app_calc.definitions.variables)
            };

            // Set Default if needed
            if (ziel === null) {
                ziel = default_obj;
            };

            // Concat stuff  & do Statistics
            for (var vID = 0; vID < vars_array.length; vID++) {
                var current_var = vars_array[vID];
                ziel.scores[current_var] = ziel.scores[current_var].concat(quelle[current_var]);
                ziel.statistics[current_var] = $scope.getStatistics(ziel.scores[current_var]);
            };

            ziel.patients.push(patient);

            return ziel;
        };

        function getAllVariants(list) {
            // Build all Variants List
            var result = list[0].map(function(item) {
                return [item];
            });

            for (var k = 1; k < list.length; k++) {
                var next = [];
                result.forEach(function(item) {
                    list[k].forEach(function(word) {
                        var line = item.slice(0);
                        line.push(word);
                        next.push(line);
                    })
                });
                result = next;
            };

            return result;
        };

        for (var psID = 0; psID < ps.length; psID++) {

            var source_patient_scores = ps[psID];

            var pid = source_patient_scores.patient.id;
            var source_scores = source_patient_scores.data.scores;
            var source_dimensions = source_patient_scores.data.dimensions;


            for (var sID = 0; sID < source_scores.length; sID++) {
                var current_score = source_scores[sID];
                var md_variants = source_dimensions[sID].md_variants;

                for (var listID = 0; listID < md_variants.length; listID++) {

                    var current_list = md_variants[listID];


                    // Data Dive
                    var data_dive = data;
                    for (var clistID = 0; clistID < current_list.length; clistID++) {
                        var pos_value = current_list[clistID];
                        data_dive = data_dive[pos_value];
                    };

                    // console.log('writePatientScoresMD', current_list, data_dive);


                    // Alle Varianten erstellen.
                    var pg_list = [];
                    var md_variants_pg = [];

                    dimensions_pg.forEach(function(current_dim_pg, myDimID) {
                        pg_list[myDimID] = [];

                        current_dim_pg.array.forEach(function(check_dim_pg, myDimCheckID) {

                            if ((check_dim_pg.pg !== null) && (check_dim_pg.pg_id !== null)) {

                                var isPIDinGroup = $scope.isPIDinGroup(check_dim_pg.pg.patients, pid);
                                // console.log('PG:', current_dim_pg.name, check_dim_pg.text, current_dim_pg, check_dim_pg);
                                if (isPIDinGroup) {
                                    pg_list[myDimID].push(myDimCheckID)
                                };
                            } else {
                                // Alle Patienten
                                pg_list[myDimID].push(myDimCheckID)
                            };
                        });
                    });
                    md_variants_pg = getAllVariants(pg_list);
                    console.log('-> Varianten: ', pid, md_variants_pg);




                    // DIRTY - HACKING HERE!
                    // TO DO: How do I do this better?

                    // In allen Varianten schreiben.
                    md_variants_pg.forEach(function(current_pg_list, myVarID) {

                        var ziel = null;
                        var md_data = null;

                        console.log('->  ', myVarID, current_pg_list, data_dive);

                        if (data_dive !== undefined) {

                        if (current_pg_list.length === 1) {
                            md_data = data_dive[current_pg_list[0]];
                            md_data = concatAndStatistics(md_data, current_score, pid, vars_array);
                            data_dive[current_pg_list[0]] = md_data;
                        };

                        if (current_pg_list.length === 2) {
                            md_data = data_dive[current_pg_list[0]][current_pg_list[1]];
                            md_data = concatAndStatistics(md_data, current_score, pid, vars_array);
                            data_dive[current_pg_list[0]][current_pg_list[1]] = md_data;
                        };

                        if (current_pg_list.length === 3) {
                            md_data = data_dive[current_pg_list[0]][current_pg_list[1]][current_pg_list[2]];
                            md_data = concatAndStatistics(md_data, current_score, pid, vars_array);
                            data_dive[current_pg_list[0]][current_pg_list[1]][current_pg_list[2]] = md_data;
                        };

                        if (current_pg_list.length === 4) {
                            md_data = data_dive[current_pg_list[0]][current_pg_list[1]][current_pg_list[2]][current_pg_list[3]];
                            md_data = concatAndStatistics(md_data, current_score, pid, vars_array);
                            data_dive[current_pg_list[0]][current_pg_list[1]][current_pg_list[2]][current_pg_list[3]] = md_data;
                        };

                        if (current_pg_list.length === 5) {
                            md_data = data_dive[current_pg_list[0]][current_pg_list[1]][current_pg_list[2]][current_pg_list[3]][current_pg_list[4]];
                            md_data = concatAndStatistics(md_data, current_score, pid, vars_array);
                            data_dive[current_pg_list[0]][current_pg_list[1]][current_pg_list[2]][current_pg_list[3]][current_pg_list[4]] = md_data;
                        };

                        if (current_pg_list.length === 6) {
                            md_data = data_dive[current_pg_list[0]][current_pg_list[1]][current_pg_list[2]][current_pg_list[3]][current_pg_list[4]][current_pg_list[5]];
                            md_data = concatAndStatistics(md_data, current_score, pid, vars_array);
                            data_dive[current_pg_list[0]][current_pg_list[1]][current_pg_list[2]][current_pg_list[3]][current_pg_list[4]][current_pg_list[5]] = md_data;
                        };

                        if (current_pg_list.length === 7) {
                            md_data = data_dive[current_pg_list[0]][current_pg_list[1]][current_pg_list[2]][current_pg_list[3]][current_pg_list[4]][current_pg_list[5]][current_pg_list[6]];
                            md_data = concatAndStatistics(md_data, current_score, pid, vars_array);
                            data_dive[current_pg_list[0]][current_pg_list[1]][current_pg_list[2]][current_pg_list[3]][current_pg_list[4]][current_pg_list[5]][current_pg_list[6]] = md_data;
                        };

                        if (current_pg_list.length === 8) {
                            md_data = data_dive[current_pg_list[0]][current_pg_list[1]][current_pg_list[2]][current_pg_list[3]][current_pg_list[4]][current_pg_list[5]][current_pg_list[6]][current_pg_list[7]];
                            md_data = concatAndStatistics(md_data, current_score, pid, vars_array);
                            data_dive[current_pg_list[0]][current_pg_list[1]][current_pg_list[2]][current_pg_list[3]][current_pg_list[4]][current_pg_list[5]][current_pg_list[6]][current_pg_list[7]] = md_data;
                        };

                        if (current_pg_list.length === 9) {
                            md_data = data_dive[current_pg_list[0]][current_pg_list[1]][current_pg_list[2]][current_pg_list[3]][current_pg_list[4]][current_pg_list[5]][current_pg_list[6]][current_pg_list[7]][current_pg_list[8]];
                            md_data = concatAndStatistics(md_data, current_score, pid, vars_array);
                            data_dive[current_pg_list[0]][current_pg_list[1]][current_pg_list[2]][current_pg_list[3]][current_pg_list[4]][current_pg_list[5]][current_pg_list[6]][current_pg_list[7]][current_pg_list[8]] = md_data;
                        };

                        if (current_pg_list.length === 10) {
                            md_data = data_dive[current_pg_list[0]][current_pg_list[1]][current_pg_list[2]][current_pg_list[3]][current_pg_list[4]][current_pg_list[5]][current_pg_list[6]][current_pg_list[7]][current_pg_list[8]][current_pg_list[9]];
                            md_data = concatAndStatistics(md_data, current_score, pid, vars_array);
                            data_dive[current_pg_list[0]][current_pg_list[1]][current_pg_list[2]][current_pg_list[3]][current_pg_list[4]][current_pg_list[5]][current_pg_list[6]][current_pg_list[7]][current_pg_list[8]][current_pg_list[9]] = md_data;
                        };
                        };
                    });



                };
            };
        };

        $scope.pushKSSet();
    };


    // -------------------
    // Change - Events
    // -------------------
    $scope.changeAppCalculation = function() {
        // Calculate stuff
        $scope.getUserAppCalculation($scope.d.ks.app.selected.identifier, $scope.d.ks.app.calculations.selected);
    };

    $scope.changeDimensions = function() {

        var current_ks = $scope.d.ks.result_explorer.ks;

        var data_dive = current_ks.data;
        var current_location = [];
        var current_location_text = "";
        var current_location_full = "";
        var current_location_n_text = "";
        var current_location_n = 0;

        current_ks.dimensions.forEach(function(current_dim, myDimID) {
            current_location.push(current_dim.selected.id);
            if (current_location_text !== "") {
                current_location_text = current_location_text + ' | '
            };
            current_location_text = current_location_text + current_dim.name + ': ' + current_dim.selected.text
            data_dive = data_dive[current_dim.selected.id];
        });


        var my_data = null;
        if (data_dive !== null) {
            my_data = angular.copy(data_dive);
            current_location_n = my_data.patients.length;
            current_location_n_text = 'N=' + current_location_n;
            current_location_full = current_location_text + ' (' + current_location_n_text + ')';
        };

        var location = {
            "data": my_data,
            "path": current_location,
            "text": current_location_text,
            "n_text": current_location_n_text,
            "text_full": current_location_full,
            "n": current_location_n
        };

        current_ks.location = location;


        console.log('(Data) changeDimensions:', $scope.d.ks.result_explorer);
    };


    // -------------------------------
    // Klinikstichproben | Sets
    // -------------------------------

    $scope.getAllKSApps = function() {

        // Looking for all User-Apps with "*_klinikstichprobe" Calculations.

        var search_str = '_klinikstichprobe';
        var all_apps = $scope.d.dataMain.apps.all_user_modules;
        var all_ks_apps = [];
        all_apps.forEach(function(current_app, myAppID) {
            var current_calculations = current_app.calculations;
            current_calculations.forEach(function(current_calc, myCalcID) {
                var n = current_calc.indexOf(search_str);
                if (n !== -1) {
                    all_ks_apps.push(current_app);
                };
            });
        });

        $scope.d.ks.apps = all_ks_apps;
    };


    $scope.setSelectedApp = function(app_index) {
        $scope.d.ks.app.calculations.all = $scope.d.ks.app.selected.calculations;
    };


    $scope.setSelectedCalculation = function() {
        $scope.loadKS();
    };


    $scope.saveKS = function() {

        var identifier = $scope.d.ks.app.selected.identifier;
        var identifier_name = identifier.split('.').join('_');

        var promiseSaveDimensions = dataService.putAppJSON(identifier_name, $scope.d.ks.ks_versions.versions.all);
        promiseSaveDimensions.then(function(data) {

            var text = "(✓) Klinikstichproben erfolgreich gespeichert."
            console.log(text, data);
            $scope.d.functions.showSimpleToast(text);

        });
    };

    $scope.loadKS = function() {

        var identifier = $scope.d.ks.app.selected.identifier;
        var identifier_name = identifier.split('.').join('_');


        // Load from files

        //  if ((identifier === 'ch.suedhang.user.apps.tmt') || (identifier === 'ch.suedhang.user.apps.ks_tmt')) {
        //      var ks_file = i_nclude_as_js_string(
        //          ch_suedhang_user_apps_tmt.json)
        //  
        //      ks_file = JSON.parse(ks_file);
        //  
        //      $scope.d.ks.ks_versions.versions = ks_file;
        //      console.log('(✓) loadKS success: ', identifier, $scope.d.ks.ks_versions.versions.all);
        //  
        //  };
        //  
        //  if ((identifier === 'com.optinomic.user.apps.ks_isk') || (identifier === 'ch.suedhang.user.apps.ks_isk')) {
        //      var ks_file = i_nclude_as_js_string(
        //          com_optinomic_user_apps_ks_isk.json)
        //  
        //      ks_file = JSON.parse(ks_file);
        //  
        //      $scope.d.ks.ks_versions.versions = ks_file;
        //      console.log('(✓) loadKS success: ', identifier, $scope.d.ks.ks_versions.versions.all);
        //  
        //  };
        //  
        //  
        //  if ((identifier === 'com.optinomic.user.apps.ks_bscl') || (identifier === 'ch.suedhang.user.apps.ks_bscl')) {
        //      var ks_file = i_nclude_as_js_string(
        //          com.optinomic.user.apps.ks_bscl.json)
        //  
        //      ks_file = JSON.parse(ks_file);
        //  
        //      $scope.d.ks.ks_versions.versions = ks_file;
        //      console.log('(✓) loadKS success: ', identifier, $scope.d.ks.ks_versions.versions.all);
        //  
        //  };

        // Do not load from Annotations

        //  var promiseSaveDimensions = dataService.getAppJSON(identifier_name);
        //  promiseSaveDimensions.then(function(data) {
        //  
        //      console.log('(✓) loadKS success: ', identifier_name, data);
        //  
        //      // Save Data
        //      if (data !== null) {
        //          $scope.d.ks.ks_versions.versions.all = data;
        //      };
        //  
        //  });


        console.log('(!) saveDimensions', $scope.d.ks.pg_dimensions.dimensions.all);
    };


    $scope.downloadKSSet = function() {

        var identifier = $scope.d.ks.app.selected.identifier;
        var identifier_name = identifier.split('.').join('_');
        var fileName = identifier_name + '.json';

        var data = angular.copy($scope.d.ks.ks_versions.versions);

        dataService.saveData(data, fileName);
    };

    $scope.pushKSSet = function() {

        var sets = $scope.d.ks.ks_versions.versions.all;

        var dimensions_all_copy = angular.copy($scope.d.ks.definitions.dimensions_all);
        dimensions_all_copy.forEach(function(current_dim, dimID) {

            // Cleanup - Don't need to save full PG's here!
            if (current_dim.source === 'pg') {
                current_dim.array.forEach(function(inner_dim, innerDimID) {
                    delete inner_dim.pg;
                });
            };
        });

        var n_scores = 0;
        $scope.d.ks.user_app_calc.patient_scores.forEach(function(d, psID) {
            n_scores = n_scores + d.data.scores.length;
        });

        $scope.d.ks.create.version.dimensions = dimensions_all_copy;
        $scope.d.ks.create.version.variables = $scope.d.ks.definitions.variables_array;
        $scope.d.ks.create.version.n_scores = n_scores;
        $scope.d.ks.create.version.data = $scope.d.ks.md.scores_all;


        sets.push($scope.d.ks.create.version);
        $scope.id_rearrange(sets);

        $scope.d.ks.ks_versions.versions.all = sets;

        $scope.d.ks.create.step = $scope.d.ks.create.step + 1;

        console.log('(!) pushKSSet', sets);
    };

    $scope.appSelected = function() {

        // Load Sets from Annotations
        // => save it to $scope.d.ks.versions.all

        // on success - push:
        var sets = {
            "name": "Sets",
            "disabled": false,
            "tab_index": 1
        };

        $scope.d.ks.ks_versions.tabs.content = sets.name;
        $scope.d.ks.ks_versions.tabs.all.push(sets);


        console.log('(!) appSelected', $scope.d.ks.app);
    };

    $scope.activateSet = function(selected_set) {

        // Save it
        $scope.d.ks.ks_versions.versions.activated = selected_set;


        var identifier = $scope.d.ks.app.selected.identifier;
        var identifier_name = identifier.split('.').join('_');
        var fileName = identifier_name + '_activated.json';

        var data = angular.copy(selected_set);

        dataService.saveData(data, fileName);


        console.log('(!) activateSet', $scope.d.ks.ks_versions);
    };

    $scope.createSet = function() {

        // Cleanup CREATE
        $scope.d.ks.create = {
            "step": 0,
            "pg_dimensions": [],
            "version": {
                "date": new Date(),
                "n_scores": null,
                "dimensions": [],
                "variables": [],
                "data": [],
                "id": 9999
            }
        };

        if ($scope.d.ks.pg_dimensions.dimensions.all.length > 0) {
            $scope.d.ks.create.pg_dimensions = angular.copy($scope.d.ks.pg_dimensions.dimensions.all);
        };

        var create_tab = {
            "name": "Erstellen",
            "disabled": false
        };

        if ($scope.d.ks.ks_versions.tabs.all.length > 2) {
            $scope.d.ks.ks_versions.tabs.all.splice(2, 1);
        };

        $scope.d.ks.ks_versions.tabs.content = create_tab.name;
        $scope.d.ks.ks_versions.tabs.all.push(create_tab);
    };

    $scope.viewSet = function(selected_set) {

        // Set 'last' as Default
        selected_set.dimensions.forEach(function(current_dim, dimID) {
            current_dim.selected = current_dim.array[current_dim.array.length - 1];
        });

        // Fokus Variable
        $scope.d.ks.result_explorer.types.selected_var = selected_set.variables[0];


        // Save it
        $scope.d.ks.result_explorer.ks = angular.copy(selected_set);
        $scope.changeDimensions();
        console.log('(!) result_explorer', $scope.d.ks.result_explorer.ks);


        // on success - push:
        var explorer = {
            "name": "Explorer",
            "disabled": false,
            "tab_index": 2
        };


        if ($scope.d.ks.ks_versions.tabs.all.length > 2) {
            $scope.d.ks.ks_versions.tabs.all.splice(2, 1);
        };

        $scope.d.ks.ks_versions.tabs.content = explorer.name;
        $scope.d.ks.ks_versions.tabs.all.push(explorer);

        console.log('(!) viewSet', $scope.d.ks.result_explorer);
    };


    $scope.deleteSet = function(remove_id) {
        var array = $scope.d.ks.ks_versions.versions.all;
        array.splice(remove_id, 1);
        $scope.id_rearrange(array);

        console.log('(!) deleteSet', array);
    };

    $scope.initSetAddPG = function() {
        $scope.d.ks.create.changed_all_pg_dimensions = false;
        $scope.d.ks.create.pg_dimensions = angular.copy(d.ks.pg_dimensions.dimensions.all);
    };

    $scope.createSetRemovePG = function(remove_id) {
        var array = $scope.d.ks.create.pg_dimensions;
        array.splice(remove_id, 1);
        $scope.id_rearrange(array);

        $scope.d.ks.create.changed_all_pg_dimensions = true;

        console.log('(!) createSetRemovePG', array);
    };

    $scope.createSetUpPG = function(inner_dimension_index) {

        var array = $scope.d.ks.create.pg_dimensions;

        var array_pos_stored = array[inner_dimension_index - 1];
        array[inner_dimension_index - 1] = array[inner_dimension_index];
        array[inner_dimension_index] = array_pos_stored;
        $scope.id_rearrange(array);

        $scope.d.ks.create.changed_all_pg_dimensions = true;

        console.log('(!) inner_dim_up', inner_dimension_index);
    };

    $scope.createSetDownPG = function(inner_dimension_index) {

        var array = $scope.d.ks.create.pg_dimensions;

        var array_pos_stored = array[inner_dimension_index + 1];
        array[inner_dimension_index + 1] = array[inner_dimension_index];
        array[inner_dimension_index] = array_pos_stored;
        $scope.id_rearrange(array);

        $scope.d.ks.create.changed_all_pg_dimensions = true;

        console.log('(!) inner_dim_down', inner_dimension_index);
    };

    $scope.inArray = function(array, my_id) {
        var return_obj = {};
        array.forEach(function(d, ID) {
            if (d.id === my_id) {
                return_obj = d;
            };
        });
        return return_obj;
    };

    $scope.createSetPgDimensions = function() {

        var dimensions_all = $scope.d.ks.create.pg_dimensions;
        var pg = $scope.d.ks.pg;

        dimensions_all.forEach(function(current_dim, dimID) {
            current_dim.array.forEach(function(inner_dim, innerDimID) {
                inner_dim.pg = $scope.inArray(pg, inner_dim.pg_id);
            });
        });

        $scope.d.ks.create.step = $scope.d.ks.create.step + 1;
        // Do the:
        $scope.enhanceDimensionsPG();
        // $scope.writePatientScoresMD

        $scope.d.ks.create.step = $scope.d.ks.create.step + 1;

        console.log('(!) createSetSetPG', dimensions_all);
    };



    // -------------------------------
    // Patienten-Gruppen | Dimensionen
    // -------------------------------

    $scope.saveNow = function() {
        var promiseSaveDimensions = dataService.putAppJSON('pg_dimensions', $scope.d.ks.pg_dimensions.dimensions.all);
        promiseSaveDimensions.then(function(data) {

            var text = "(✓) Dimensionen erfolgreich gespeichert."
            console.log(text, data);
            $scope.d.functions.showSimpleToast(text);

            // Clear Selected
            $scope.cancelDimensions();

        });
    };

    $scope.getDimensions = function() {


        var promiseSaveDimensions = dataService.getAppJSON('pg_dimensions');
        promiseSaveDimensions.then(function(data) {

            console.log('(✓) getDimensions success: ', data);

            // Save Data
            if (data !== null) {
                $scope.d.ks.pg_dimensions.dimensions.all = angular.copy(data);

            };

        });


        console.log('(!) saveDimensions', $scope.d.ks.pg_dimensions.dimensions.all);
    };

    $scope.viewDimensions = function(selected_dimension) {

        $scope.d.ks.pg_dimensions.dimensions.selected = selected_dimension;

        // Tabs
        $scope.d.ks.pg_dimensions.tabs.all[1].disabled = false;
        $scope.d.ks.pg_dimensions.tabs.all[1].name = $scope.d.ks.pg_dimensions.dimensions.selected.name;
        $scope.d.ks.pg_dimensions.tabs.selectedIndex = 1;
        console.log('(!) viewDimensionen', selected_dimension);
    }

    $scope.saveDimensions = function() {
        var quelle = $scope.d.ks.pg_dimensions.dimensions.selected;

        if (quelle.id === 9999) {
            // Hinzufügen
            $scope.d.ks.pg_dimensions.dimensions.all.push(quelle);
        } else {
            // Editieren
            $scope.d.ks.pg_dimensions.dimensions.all[quelle.id] = quelle;
        };

        $scope.id_rearrange($scope.d.ks.pg_dimensions.dimensions.all);


        // dataService.putAppJSON
        $scope.saveNow();

        console.log('(!) saveDimensions', $scope.d.ks.pg_dimensions.dimensions.all);
    };

    $scope.createDimensions = function() {

        var new_dim = {
            "id": 9999,
            "name": "Neu",
            "source": "pg",
            "array": [{
                "id": 0,
                "text": "Unbenannt",
                "pg_id": 1,
                "pg": {}
            }, {
                "id": 0,
                "text": "Alle Patienten",
                "pg_id": null,
                "pg": null
            }]
        };



        $scope.d.ks.pg_dimensions.dimensions.selected = new_dim;

        // Tabs
        $scope.d.ks.pg_dimensions.tabs.all[1].disabled = false;
        $scope.d.ks.pg_dimensions.tabs.all[1].name = "erstellen";
        $scope.d.ks.pg_dimensions.tabs.selectedIndex = 1;
    };

    $scope.cancelDimensions = function() {
        $scope.d.ks.pg_dimensions.dimensions.selected = {};

        // Tabs
        $scope.d.ks.pg_dimensions.tabs.all[1].disabled = false;
        $scope.d.ks.pg_dimensions.tabs.all[1].name = "";
        $scope.d.ks.pg_dimensions.tabs.selectedIndex = 0;
        // console.log('(!) cancelDimensions');
    }

    $scope.deleteDimensions = function(remove_id) {
        var array = $scope.d.ks.pg_dimensions.dimensions.all;
        array.splice(remove_id, 1);
        $scope.id_rearrange(array);

        $scope.saveNow();

        console.log('(!) deleteDimensions', array);
    };

    $scope.inner_dim_add = function(splice_pos) {
        var new_inner_dim = {
            "id": 9999,
            "text": "Unbenannt",
            "pg_id": 1,
            "pg": {}
        };

        var array = $scope.d.ks.pg_dimensions.dimensions.selected.array;
        array.splice(splice_pos + 1, 0, new_inner_dim);
        $scope.id_rearrange(array);


        console.log('(!) inner_dim_add', array);
    };

    $scope.inner_dim_remove = function(remove_id) {
        var array = $scope.d.ks.pg_dimensions.dimensions.selected.array;
        array.splice(remove_id, 1);
        $scope.id_rearrange(array);

        console.log('(!) inner_dim_remove', array);
    };

    $scope.inner_dim_up = function(inner_dimension_index) {

        var array = $scope.d.ks.pg_dimensions.dimensions.selected.array;

        var array_pos_stored = array[inner_dimension_index - 1];
        array[inner_dimension_index - 1] = array[inner_dimension_index];
        array[inner_dimension_index] = array_pos_stored;
        $scope.id_rearrange(array);

        console.log('(!) inner_dim_up', inner_dimension_index);
    };

    $scope.inner_dim_down = function(inner_dimension_index) {

        var array = $scope.d.ks.pg_dimensions.dimensions.selected.array;

        var array_pos_stored = array[inner_dimension_index + 1];
        array[inner_dimension_index + 1] = array[inner_dimension_index];
        array[inner_dimension_index] = array_pos_stored;
        $scope.id_rearrange(array);

        console.log('(!) inner_dim_down', inner_dimension_index);
    };

    // -------------------
    // Small Herlpers
    // -------------------

    $scope.isPIDinGroup = function(patients_array, search_pid) {
        var isPIDinGroup = false;

        for (var id = 0; id < patients_array.length; id++) {
            var current_patient = patients_array[id];

            if (current_patient.id === search_pid) {
                isPIDinGroup = true;
            };
        };

        return isPIDinGroup;
    };

    $scope.isArray = function(obj) {
        return (typeof obj !== 'undefined' &&
            obj && obj.constructor === Array);
    };

    $scope.merge_obj = function(obj1, obj2) {
        var obj3 = {};
        for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
        for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
        return obj3;
    };

    $scope.id_rearrange = function(array) {
        for (var i = 0; i < array.length; i++) {
            array[i].id = i;
        };
    };

    // ------------------------------------------
    //  calculation_simplestatistics.js
    //  S T A T I S T I C S
    // ------------------------------------------

    $scope.sum = function(x) {
        var value = 0;
        for (var i = 0; i < x.length; i++) {
            value += x[i];
        }
        return value;
    }

    $scope.mean = function(x) {
        // The mean of no numbers is null
        if (x.length === 0) return null;

        return $scope.sum(x) / x.length;
    }

    $scope.geometric_mean = function(x) {
        // The mean of no numbers is null
        if (x.length === 0) return null;

        // the starting value.
        var value = 1;

        for (var i = 0; i < x.length; i++) {
            // the geometric mean is only valid for positive numbers
            if (x[i] <= 0) return null;

            // repeatedly multiply the value by each number
            value *= x[i];
        }

        return Math.pow(value, 1 / x.length);
    }

    $scope.harmonic_mean = function(x) {
        // The mean of no numbers is null
        if (x.length === 0) return null;

        var reciprocal_sum = 0;

        for (var i = 0; i < x.length; i++) {
            // the harmonic mean is only valid for positive numbers
            if (x[i] <= 0) return null;

            reciprocal_sum += 1 / x[i];
        }

        // divide n by the the reciprocal sum
        return x.length / reciprocal_sum;
    }

    $scope.root_mean_square = function(x) {
        if (x.length === 0) return null;

        var sum_of_squares = 0;
        for (var i = 0; i < x.length; i++) {
            sum_of_squares += Math.pow(x[i], 2);
        }

        return Math.sqrt(sum_of_squares / x.length);
    }

    $scope.min = function(x) {
        var value;
        for (var i = 0; i < x.length; i++) {
            // On the first iteration of this loop, min is
            // undefined and is thus made the minimum element in the array
            if (x[i] < value || value === undefined) value = x[i];
        }
        return value;
    }

    $scope.max = function(x) {
        var value;
        for (var i = 0; i < x.length; i++) {
            // On the first iteration of this loop, max is
            // undefined and is thus made the maximum element in the array
            if (x[i] > value || value === undefined) value = x[i];
        }
        return value;
    }

    $scope.variance = function(x) {
        // The variance of no numbers is null
        if (x.length === 0) return null;

        var mean_value = $scope.mean(x),
            deviations = [];

        // Make a list of squared deviations from the mean.
        for (var i = 0; i < x.length; i++) {
            deviations.push(Math.pow(x[i] - mean_value, 2));
        }

        // Find the mean value of that list
        return $scope.mean(deviations);
    }

    $scope.standard_deviation = function(x) {
        // The standard deviation of no numbers is null
        if (x.length === 0) return null;

        return Math.sqrt($scope.variance(x));
    }

    $scope.z_score = function(x, mean, standard_deviation) {
        return (x - mean) / standard_deviation;
    }




});