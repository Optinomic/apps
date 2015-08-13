/**
 * @name Optinomic - AppCtrl
 * ---------------------------------------
 * Controller of the Optinomic-Application.
 */
app.controller('AppCtrl', function($scope, dataService) {

    // -----------------------------------
    // Init
    // -----------------------------------
    $scope.init = false;

    $scope.app = {
        'id': 'com.optinomic.apps.craving',
        'title': 'Craving-App',
        'subtitle': 'Some Text Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod labore et dolore ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    };

    console.log('Welcome, ', $scope.app.title, $scope.app.id);
    console.log('Token / PID ', helpers.getToken(), helpers.getPatientID());



    // -----------------------------------
    // Functions
    // -----------------------------------

    //$scope.loadMainData = function() {
    //    // -----------------------------------
    //    // Get Data 
    //    // -----------------------------------
    //    var dataPromiseMain = dataService.getMainAppData($scope.app.id);
    //    dataPromiseMain.then(function(data) {

    //        console.log('(DATA): getMainAppData:', data);


    //        $scope.init = true;
    //    });
    //};
    //$scope.loadMainData();


    //dataService.getSurveyResponses('$scope.app.id').success(function(data) {
    //    console.log('(DATA): getMainAppData:', data);
    //});


});
