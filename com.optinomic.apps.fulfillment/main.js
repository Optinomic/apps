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

            // We always have data
            $scope.d.haveData = true;


            $scope.getAppResponses('ch.suedhang.apps.honos');

            // Init - Data Export
            // $scope.setExport();

            // Run Public-Functions:
            // $scope.d.functions.getAllCalculations();

            // Finishing: Console Info & Init = done.
            console.log('Welcome, ', $scope.d.dataMain.apps.current.name, $scope.d);
            $scope.d.init = true;
        });
    };
    $scope.loadMainData();



    // -------------------
    // Data-Export
    // -------------------
    $scope.setExport = function() {


        // ------------------------------------------------
        // Export - Pakete definieren
        // i n c l u d e _ a s _ j s _ s t r i n g 
        // => (export.sql) muss sich in /includes befinden
        // ------------------------------------------------


        // Hinzufügen gespeicherter SQL-Dateien in /includes
        var module_packages = [];
        // var data_query = {};
        // data_query = {
        //     name: 'WHQOL (with stay)',
        //     sql: in clude_as_js_string(
        //         WHQOL.sql)
        // };
        // module_packages.push(data_query);


        $scope.d.sql_box = $scope.d.functions.getDefaultExportSettings($scope.d.dataMain.params.app_id, module_packages);


    };



    // -------------------
    // Get Data
    // -------------------
    $scope.getAppResponses = function(app_id) {

        // Init
        app_id = app_id === undefined ? 'ch.suedhang.apps.honos' : app_id;

        // Querys
        var app_query = include_as_js_string(
            responses.sql);

        app_query = app_query.replace("%module_id%", app_id);



        var sql = {};
        sql.delimitter = ';';
        sql.including_headers = 'True';
        sql.format = 'json';
        sql.direct = 'True';
        sql.have_data = false;
        sql.data = null;
        sql.packages = [];
        sql.selectedIndex = 0;
        sql.query = app_query;

        console.log('(!) getSurveyResponses', sql);


        // Get all 'response' fields
        var api = dataService.runSQL(app_query, sql.delimitter, sql.including_headers, sql.format, sql.direct);

        api.success(function(data) {
            // var response_json = JSON.parse(data.rows[0].response);

            console.log('(!!) getSurveyResponses', response_json);


        });

        api.error(function(data) {

            var text = '(!) Error in SQL (getSurveyResponses)'
            console.log(text, data);
            // $scope.d.functions.showSimpleToast(text)
        });


    };


});
