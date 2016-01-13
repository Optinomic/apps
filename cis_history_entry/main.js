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
            $scope.d.haveData = true;


            $scope.getPatientAnnotations()


            var api_call = $scope.getPatientAnnotations();
            api_call.success(function(data) {
                console.log('(+) getPatientAnnotations ', data);
            });
            api_call.error(function(data) {
                console.log('(!) getPatientAnnotations - Error ', data);

            });




            // Finishing: Console Info & Init = done.
            console.log('Welcome, ', $scope.d.dataMain.apps.current.name, $scope.d);
            $scope.d.init = true;
        });
    };
    $scope.loadMainData();


    // -----------------------------------
    // Annotations
    // -----------------------------------


    $scope.getPatientAnnotations = function() {
        var patient_id = $scope.d.dataMain.params.PID;
        var apiStr = '/patients/' + patient_id + '/annotations';
        return apiService.get(apiStr, {});
    };

    $scope.putPatientAnnotations = function(json_value) {
        var patient_id = $scope.d.dataMain.params.PID;
        var apiStr = '/patients/' + patient_id + '/annotations';
        var body = {
            "value": json_value
        };
        return apiService.put(apiStr, body);
    };



});
