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
            $scope.initApp();


            // Finishing: Console Info & Init = done.
            console.log('Welcome, ', $scope.d.dataMain.apps.current.name, $scope.d);
            $scope.d.init = true;
        });
    };
    $scope.loadMainData();


    $scope.initApp = function() {
        var app = {
            "patients": {
                "loaded": false,
                "data": []
            }
        };

        $scope.d.app = app;

        $scope.getPatientList();
    };


    $scope.getPatientList = function() {
        // Init - Params

        var patientListFilter = {
            "gender": '',
            "city": null,
            "zip_code": null,
            "age_over": null,
            "age_under": null,
            "in_stay": 'True',
            "lead_therapist": null,
            "cis_lead_doctor": null,
            "stay_start_before": null,
            "stay_start_after": null,
            "stay_stop_before": null,
            "stay_stop_after": null
        };


        var myAPI = dataService.getPatientList(patientListFilter);

        myAPI.success(function(data) {
            console.log('success: getPatientList', data);

            $scope.d.app.patients.loaded = true;
            $scope.d.app.patients.data = data.patients;
        });

        myAPI.error(function(data) {
            console.log('ERROR: getPatientList', data);

            $scope.d.app.patients.loaded = false;
            $scope.d.app.patients.data = data;
        });
    };



    $scope.initODBC = function() {

        // -----------------------------------
        // Init: ODBC Objekt
        // -----------------------------------

        var odbc = {
            "data_packages": [{
                "name": 'Belegung - History | from FID',
                "sql": include_as_js_string(
                    belegung_history_from_fid.sql)
            }],
            "current": {
                "selected": false,
                "executed": false,
                "package": {},
                "data": {}
            }
        };



        $scope.d.odbc = odbc;
        console.log('initODBC :: ', $scope.d.odbc);
    };


    $scope.downloadODBC = function() {

        var fileName = $scope.d.odbc.current.package.name;
        fileName = fileName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        fileName = fileName + '.json';

        var data = $scope.d.odbc.current.data;

        dataService.saveData(data, fileName);
    };


    $scope.runODBC = function(selected_odbc_package) {

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

        // INIT
        var query = selected_odbc_package.sql;
        var format = 'json';
        var delimitter = ';';
        var including_headers = 'True';
        var direct = 'True';

        //dataService.runDataSource = function(my_query, my_source, my_delimiter, my_including_headers, my_format, my_direct)
        var api = dataService.runDataSource(query, 'Polypoint', delimitter, including_headers, format, direct);

        api.success(function(data) {

            console.log('(DATA) runODBC  :: ', data);

            $scope.d.odbc.current.executed = true;
            $scope.d.odbc.current.data = data;



        });


        api.error(function(data) {
            $scope.d.odbc.current.executed = true;
            $scope.d.odbc.current.data = data;

            console.log('ERROR: runODBC: ', data);
        });



        console.log('runODBC :: ', $scope.d.odbc.current);
    };




});
