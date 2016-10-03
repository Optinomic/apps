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
            $scope.ks_init();


            // Finishing: Console Info & Init = done.
            console.log('Welcome, ', $scope.d.dataMain.apps.current.name, $scope.d);

            $scope.d.init = true;
        });
    };
    $scope.loadMainData();



    // -------------------
    // TMT Init
    // -------------------
    $scope.ks_init = function() {

        //  Create GUI for THIS later:
        var app_id = 'ch.suedhang.user.apps.tmt';
        var app_claculation = 'tmt_klinikstichprobe';


        // Init
        var ks = {};
        var pg = $scope.d.dataMain.patient_groups;


        // Calculate stuff
        $scope.getUserAppCalculation(app_id, app_claculation);



        // Safe
        ks.pg = pg;


        // Safe to $scope
        $scope.d.ks = ks;

        console.log('(!) Init, ', $scope.d.dataMain.apps.current.name, $scope.d.ks);
    };



    // -----------------------------------
    // Calculations
    // -----------------------------------


    $scope.getUserAppCalculation = function(app_id, calc_name) {
        // Get specific calculation - Unneded already in 'd.dataMain.calculations[0].calculation_results'
        var call = dataService.getAppCalculationsUser(app_id, calc_name);

        call.success(function(data) {
            // Save Data to $scope.d
            console.log('(DATA): getCalculation: ', data.calculation_result);
            $scope.d.ks.user_app_calc = data.calculation_result;

        });
        call.error(function(data) {
            console.log('(ERROR): getCalculation:', data);
            $scope.d.ks.user_app_calc = {};
        });
    };



    // -------------------
    // Unneeded
    // -------------------



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
