/**
 * @name Optinomic - AppCtrl
 * ---------------------------------------
 * Controller of the Optinomic-Application.
 */
app.controller('AppCtrl', function($scope, dataService, scopeDService) {

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
        $scope.d.haveData = false;
        var dataPromiseMain = dataService.getMainAppData();
        dataPromiseMain.then(function(data) {

            // Save Data to $scope.d
            $scope.d.dataMain = data;

            // Check if we have survey_responses @ data.
            if (data.survey_responses.length !== 0) {
                console.log('(DATA): survey_responses:', data.survey_responses.length, data.survey_responses);
                $scope.d.haveData = true;
                $scope.setDataView();
            };

            // Run Public-Functions:
            $scope.d.functions.getAllCalculations();

            // Run App-Functions:


            // Finishing: Console Info & Init = done.
            console.log('Welcome, ', $scope.d.dataMain.apps.current.name, $scope.d);
            $scope.d.init = true;
        });
    };
    $scope.loadMainData();

    // -----------------------------------
    // Navigation
    // -----------------------------------

    $scope.d.navigator = 0;
    $scope.prev = function() {
        var count = d.dataMain.calculations[0].calculation_results[d.navigator].length;

        if (count === 0) {
            $scope.d.navigator = count - 1;
        } else {
            $scope.d.navigator = $scope.d.navigator + 1
        };
    };

    $scope.next = function() {
        var count = d.dataMain.calculations[0].calculation_results[d.navigator].length;

        if (count === $scope.d.navigator) {
            $scope.d.navigator = 0;
        } else {
            $scope.d.navigator = $scope.d.navigator + 1
        };
    };


    // -----------------------------------
    // DataView : angulargrid.com
    // -----------------------------------
    $scope.setDataView = function() {



        //console.log('dataGRID: ', $scope.d.grid);
    };


});
