/**
 * @name Optinomic - AppCtrl
 * ---------------------------------------
 * Controller of the Optinomic-Application.
 */
app.controller('AppCtrl', function($scope, $filter, dataService, scopeDService) {

    // Data-Sharing (do not remove)
    $scope.d = scopeDService;

    // -----------------------------------
    // Main - Functions
    // -----------------------------------

    $scope.loadMainData = function() {
        // -----------------------------------
        // Get Data: d.dataMain
        // -----------------------------------
        $scope.d.haveData = false;
        var dataPromiseMain = dataService.getMainAppData();
        dataPromiseMain.then(function(data) {

            // Save Data to $scope.d
            $scope.d.dataMain = data;



            // Run App-Functions:
            $scope.getEntrys();


            // Finishing: Console Info & Init = done.
            console.log('Welcome, ', $scope.d.dataMain.apps.current.name, $scope.d);
            $scope.d.init = true;
        });
    };
    $scope.loadMainData();



    // -----------------------------------
    // Application - Init
    // -----------------------------------

    $scope.getEntrys = function() {
        // Get Data

        $scope.d.belegung = [];
        var api_call = dataService.getPatientModuleAnnotations();

        api_call.success(function(data) {
            $scope.d.belegung = data;


            $scope.d.belegung.current_stay = null;

            data.alle.forEach(function(stay, my_stay_index) {
                if (parseInt(stay.bel_selector.optinomic_fid) === parseInt($scope.d.dataMain.params.stay_id)) {
                    $scope.d.belegung.current_stay = stay;
                };
            });


            $scope.d.haveData = true;
            console.log('(✓) getEntrys ', $scope.d.belegung);
        });

        api_call.error(function(data) {
            console.log('(ERROR) getEntrys ', data);
        });

    };



});
