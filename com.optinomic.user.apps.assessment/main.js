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

            if (current_template === 'print_access') {
                $scope.appInit();
            };


            // Finishing: Console Info & Init = done.
            console.log('Welcome, ', $scope.d.dataMain.apps.current.name, current_template, $scope.d);

            $scope.d.init = true;
        });
    };
    $scope.loadMainData();



    $scope.appInit = function(selected_group) {

        $scope.d.app = {};
        $scope.d.app.selected_group = null;

    };

    $scope.selectPatientGroup = function(selected_group) {

        $scope.d.app.selected_group = selected_group;
        console.log('selectPatientGroup', $scope.d.app.selected_group);

    };


});
