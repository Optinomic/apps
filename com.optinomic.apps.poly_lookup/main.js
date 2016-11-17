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
        $scope.d.haveData = false;
        var dataPromiseMain = dataService.getMainAppData();
        dataPromiseMain.then(function(data) {

            // Save Data to $scope.d
            $scope.d.dataMain = data;
            $scope.d.haveData = true;


            // Run App-Functions:
            $scope.initODBC();


            // Finishing: Console Info & Init = done.
            console.log('Welcome, ', $scope.d.dataMain.apps.current.name, $scope.d);
            $scope.d.init = true;
        });
    };
    $scope.loadMainData();





    $scope.initODBC = function() {

        // -----------------------------------
        // Init: ODBC Objekt
        // -----------------------------------

        var odbc = {
            "data_packages": [],
            "selected": {}
        };

        // ODBC - Datenquellen festlegen:

        var data_query = {};
        data_query = {
            "name": 'Patient | Falldaten',
            "sql": include_as_js_string(
                poly_odbc.sql)
        };
        odbc.data_packages.push(data_query);


        // Default Selektiert setzen.
        odbc.selected = odbc.data_packages[0];


        $scope.d.odbc = odbc;
        console.log('initODBC :: ', $scope.d.odbc);
    };


    $scope.runODBCQuery = function(selected_odbc) {

        // -----------------------------------
        // RUN: ODBC Objekt
        // -----------------------------------

        // Selektiere Datenquelle setzen.
        $scope.d.odbc.selected = selected_odbc;

        console.log('runODBCQuery :: ', $scope.d.odbc.data_packages.selected);
    };




});
