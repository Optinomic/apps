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

        var d = {};

        //  Create GUI for THIS later:
        var app_id = 'ch.suedhang.user.apps.tmt';
        var app_claculation = 'tmt_klinikstichprobe';


        // Init
        d.init = false;
        d.pg = $scope.d.dataMain.patient_groups;
        d.md = {};
        d.md.selected = {};
        d.md.selected_info = {};

        // Calculate stuff
        $scope.getUserAppCalculation(app_id, app_claculation);


        return d;
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

            // Init 'User-Selection' for Dimenstions | jeweils letzter Eintrag
            $scope.d.ks.dimensions_app.forEach(function(current_dim, myDimID) {
                current_dim.selected = current_dim.array[current_dim.array.length - 1];
            });
            $scope.changeDimenstions();

            $scope.d.ks.init = true;
            console.log('(DATA) Init, ', $scope.d.dataMain.apps.current.name, $scope.d.ks);

        });
        call.error(function(data) {
            console.log('(ERROR): getCalculation:', data);
            $scope.d.ks.user_app_calc = null;
        });
    };



    // -------------------
    // Change - Events
    // -------------------
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

        $scope.d.ks.md.selected = data_dive;
        $scope.d.ks.md.selected_info.current_location_path = current_location;
        $scope.d.ks.md.selected_info.current_location_text = current_location_text;

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

    $scope.createNDimArray = function(dimensions) {
        var t, i = 0,
            s = dimensions[0],
            arr = new Array(s);
        if (dimensions.length < 3)
            for (t = dimensions[1]; i < s;) arr[i++] = new Array(t);
        else
            for (t = dimensions.slice(1); i < s;) arr[i++] = createNDimArray(t);
        return arr;
    }



});
