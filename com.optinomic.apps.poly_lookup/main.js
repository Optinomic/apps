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
            "current": {
                "selected": false,
                "package": {}
            }
        };

        // ODBC - Datenquellen festlegen:

        var data_query = {};
        data_query = {
            "name": 'Patient | Falldaten',
            "sql": include_as_js_string(
                poly_odbc.sql)
        };
        odbc.data_packages.push(data_query);


        $scope.d.odbc = odbc;
        console.log('initODBC :: ', $scope.d.odbc);
    };


    $scope.runODBCQuery = function(selected_odbc_package) {

        // -----------------------------------
        // RUN: ODBC Objekt
        // -----------------------------------

        var d = {
            "selected": true,
            "executed": false,
            "package": selected_odbc_package,
            "data": {}
        };

        // Selektiere Datenquelle setzen.
        $scope.d.odbc.current = d;

        console.log('runODBCQuery :: ', $scope.d.odbc.current);
    };




});
