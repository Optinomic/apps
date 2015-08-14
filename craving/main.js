/**
 * @name Optinomic - AppCtrl
 * ---------------------------------------
 * Controller of the Optinomic-Application.
 */
app.controller('AppCtrl', function($scope, dataService) {

    // -----------------------------------
    // Init
    // -----------------------------------
    $scope.appID = 'com.optinomic.apps.craving';
    $scope.init = false; //Is App initalised?
    $scope.d = {}; //Where Data is stored.

    console.log('PID / Token', dataService.getPatientID(), dataService.getToken());


    // -----------------------------------
    // Functions
    // -----------------------------------

    $scope.loadMainData = function() {
        // -----------------------------------
        // Get Data 
        // -----------------------------------
        var dataPromiseMain = dataService.getMainAppData($scope.appID);
        dataPromiseMain.then(function(data) {

            console.log('(DATA): loadedMainData:', data);

            // Save Data
            $scope.d.dataMain = data;

            // Run Functions
            //$scope.loadResults();

            $scope.init = true;
        });
    };
    $scope.loadMainData();


    $scope.loadResults = function() {

        var call = dataService.getAppCalculations($scope.appID, 'another_calculation');

        call.success(function(data) {
            console.log('(DATA): getAppCalculations:', data);
        });
        call.error(function(data) {
            console.log('(ERROR): getAppCalculations:', data);
        });
    };

});
