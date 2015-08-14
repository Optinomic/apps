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



    // -----------------------------------
    // Functions
    // -----------------------------------

    $scope.loadMainData = function() {
        // -----------------------------------
        // Get Data 
        // -----------------------------------
        $scope.haveData = false;
        var dataPromiseMain = dataService.getMainAppData($scope.appID);
        dataPromiseMain.then(function(data) {

            console.log('(DATA): loadedMainData:', data);

            // Save Data
            $scope.d.dataMain = data;

            // Check if we have survey_responses | data.
            if (data.survey_responses.length !== 0) {
                $scope.haveData = true;
                console.log('(DATA): haveData:', data.survey_responses.length, $scope.haveData);
            }

            // Run Functions
            console.log('Welcome, ', $scope.d.dataMain.apps.current.name, $scope.d);
            //$scope.loadResults();

            $scope.init = true;
            $scope.haveData = true;
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
