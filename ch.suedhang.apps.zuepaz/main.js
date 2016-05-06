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
            };

            // Run Public-Functions:
            $scope.d.functions.getAllCalculations();

            // Run App-Functions:
            $scope.initZuePaZ();

            // Finishing: Console Info & Init = done.
            console.log('Welcome, ', $scope.d.dataMain.apps.current.name, $scope.d);
            $scope.d.init = true;
        });
    };
    $scope.loadMainData();





    // -----------------------------------
    // Init
    // -----------------------------------

    $scope.initZuePaZ = function() {
        // Variablen initialisieren
        $scope.d.scale_ranges = {
            "ranges": [{
                "from": 0,
                "to": 1,
                "result": "Unzufrieden",
                "result_color": "red"
            }, {
                "from": 1,
                "to": 2,
                "result": "Weder noch",
                "result_color": "orange"
            }, {
                "from": 2,
                "to": 3,
                "result": "Zufrieden",
                "result_color": "green"
            }]
        };
    };

});
