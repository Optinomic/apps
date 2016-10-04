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


            // Run App-Functions
            $scope.d.ks = $scope.ks_init();


            // Finishing: Console Info & Init = done.
            console.log('Welcome, ', $scope.d.dataMain.apps.current.name, $scope.d);

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
            "selected": {
                "identifier": "ch.suedhang.user.apps.tmt"
            },
            "calculations": {
                "all": ["tmt_klinikstichprobe"],
                "selected": "tmt_klinikstichprobe"
            }
        };



        // Init
        ks.init = false;
        ks.pg = $scope.d.dataMain.patient_groups;
        ks.definitions = {};

        ks.md = {};
        ks.md.selected = {};
        ks.md.selected_info = {};

        ks.result_explorer = {};
        ks.result_explorer.types = [{
            "id": 0,
            "name": 'Alle Variablen'
        }, {
            "id": 1,
            "name": 'Einzelne Variablen'
        }];
        ks.result_explorer.selected = ks.result_explorer.types[1];
        ks.result_explorer.selected_var = null;

        // Calculate stuff
        $scope.getUserAppCalculation(ks.app.selected.identifier, ks.app.calculations.selected);


        return ks;
    };



    // -----------------------------------
    // Calculations
    // -----------------------------------


    $scope.getUserAppCalculation = function(app_id, calc_name) {
        // Get specific calculation - Unneded already in 'd.dataMain.calculations[0].calculation_results'
        var call = dataService.getAppCalculationsUser(app_id, calc_name);

        call.success(function(data) {
            // Save Data to $scope.d
            $scope.d.ks.user_app_calc = data.calculation_result;

            // Clone some stuff for Using
            $scope.d.ks.md.scores = angular.copy($scope.d.ks.user_app_calc.md_patient_scores);
            $scope.d.ks.dimensions_app = angular.copy($scope.d.ks.user_app_calc.definitions.dimensions_app);
            $scope.d.ks.definitions.dimensions_app = angular.copy($scope.d.ks.user_app_calc.definitions.dimensions_app);

            // Init 'User-Selection' for Dimenstions | jeweils letzter Eintrag
            $scope.d.ks.dimensions_app.forEach(function(current_dim, myDimID) {
                current_dim.selected = current_dim.array[current_dim.array.length - 1];
            });
            $scope.d.ks.result_explorer.selected_var = $scope.d.ks.user_app_calc.definitions.variables_array[0];

            // Some more Functions to Run because we have Data.
            $scope.changeDimenstions();
            $scope.enhanceDimensionsPG();


            $scope.d.ks.definitions = $scope.merge_obj($scope.d.ks.definitions, $scope.d.ks.user_app_calc.definitions);

            $scope.d.ks.init = true;
            console.log('(DATA) Init, ', $scope.d.dataMain.apps.current.name, $scope.d.ks);

        });
        call.error(function(data) {
            console.log('(ERROR): getCalculation:', data);
            $scope.d.ks.user_app_calc = null;
        });
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


        // Build GUI for this later

        // GUI:  Create as many of them as user wants
        // Arrange them in dimensions_pg
        // Every group_pg_props have a 'all patients'

        var group_pg_props = [{
            "id": 0,
            "text": "Aktuell oder ehemalig auf EAS",
            "pg": angular.copy($scope.d.dataMain.patient_groups[1])
        }, {
            "id": 1,
            "text": "Alle Patienten",
            "pg": null
        }];

        var dimensions_pg = [{
            "id": 0,
            "name": "EAS",
            "source": "pg",
            "array": angular.copy(group_pg_props)
        }];

        var dimensions_all = dimenstions_app.concat(dimensions_pg);

        var n_dimensions = [];
        for (var dIndex = 0; dIndex < dimensions_all.length; dIndex++) {
            var cd = dimensions_all[dIndex];
            n_dimensions.push(cd.array.length)
        };

        // Save
        $scope.d.ks.md.scores_all = createNDimArray(n_dimensions);
        $scope.d.ks.definitions.dimensions_all = dimensions_all;
        // console.log('dimensions_all', n_dimensions, scores_all);

    };




    // -------------------
    // Change - Events
    // -------------------
    $scope.changeAppCalculation = function() {
        // Calculate stuff
        $scope.getUserAppCalculation($scope.d.ks.app.selected.identifier, $scope.d.ks.app.calculations.selected);
    };

    $scope.changeDimenstions = function() {

        var data_dive = $scope.d.ks.md.scores;
        var current_location = [];
        var current_location_text = ""

        $scope.d.ks.dimensions_app.forEach(function(current_dim, myDimID) {
            current_location.push(current_dim.selected.id);
            if (current_location_text !== "") {
                current_location_text = current_location_text + ' | '
            };
            current_location_text = current_location_text + current_dim.name + ': ' + current_dim.selected.text
            data_dive = data_dive[current_dim.selected.id];
        });

        $scope.d.ks.md.selected = angular.copy(data_dive);
        $scope.d.ks.md.selected_info.current_location_path = current_location;

        console.log('(Data) MD:', current_location, $scope.d.ks.md.selected);

        if (data_dive !== null) {
            var current_location_n = $scope.d.ks.md.selected.scores[$scope.d.ks.user_app_calc.definitions.variables_array[0]].length;
            var current_location_n_text = '(N=' + $scope.d.ks.md.selected.scores[$scope.d.ks.user_app_calc.definitions.variables_array[0]].length + ')';
            current_location_text = current_location_text + ' ' + current_location_n_text;
        };
        $scope.d.ks.md.selected_info.current_location_text = current_location_text;
        $scope.d.ks.md.selected_info.current_location_n = current_location_n;

        console.log('(Data) MD:', current_location, $scope.d.ks.md.selected);
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




});
