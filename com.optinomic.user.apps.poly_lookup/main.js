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
            "data_packages": [{
                "name": 'Falldaten',
                "sql": __opapp_include_as_js_string(includes/fa.sql)
            }, {
                "name": 'PUBLIC - Falldaten',
                "sql": __opapp_include_as_js_string(includes/public_fa.sql)
            }, {
                "name": 'Patient | Falldaten',
                "sql": __opapp_include_as_js_string(includes/pa_fa.sql)
            }, {
                "name": 'Dispens | Somatik',
                "sql": __opapp_include_as_js_string(includes/dispens_somatik.sql)
            }, {
                "name": 'Medikamente',
                "sql": __opapp_include_as_js_string(includes/medikamente.sql)
            }, {
                "name": 'Dispens | Somatik mit Patienten & Falldaten',
                "sql": __opapp_include_as_js_string(includes/dispens_somatik_pa_fa.sql)
            }, {
                "name": 'Belegung - History',
                "sql": __opapp_include_as_js_string(includes/belegung_history.sql)
            }, {
                "name": 'Belegung - History | from FID',
                "sql": __opapp_include_as_js_string(includes/belegung_history_from_fid.sql)
            }, {
                "name": 'Patient | Falldaten (V2)',
                "sql": __opapp_include_as_js_string(includes/Patient_Falldaten.sql)
            }, {
                "name": 'GET FAID',
                "sql": __opapp_include_as_js_string(includes/get_faid.sql)
            }, {
                "name": 'Listenfelder: Organisationseinheit',
                "sql": __opapp_include_as_js_string(includes/listenfelder_orgeinheit.sql)
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


            // // JSON: Loop all rows and make Object from 'value' & 'response'.
            // if ($scope.d.sql_box.format === 'json') {
            //     if (data.rows.length > 0) {
            //         data.rows.forEach(function(current_row, myRowIndex) {
            //             if (current_row.value !== undefined) {
            //                 var obj = JSON.parse(current_row.value);
            //                 current_row.value = obj
            //             };
            //             if (current_row.response !== undefined) {
            //                 var obj = JSON.parse(current_row.response);
            //                 current_row.response = obj
            //             };
            //         });
            //     };
            // };

        });


        api.error(function(data) {
            $scope.d.odbc.current.executed = true;
            $scope.d.odbc.current.data = data;

            console.log('ERROR: runODBC: ', data);
        });



        console.log('runODBC :: ', $scope.d.odbc.current);
    };




});
