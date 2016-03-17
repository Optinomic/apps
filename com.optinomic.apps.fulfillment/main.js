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


    $scope.initApp = function() {

        var app_id = app_id === undefined ? 'ch.suedhang.apps.honos' : app_id;

        var patientListFilter = {
            gender: '',
            city: null,
            zip_code: null,
            age_over: null,
            age_under: null,
            in_stay: '',
            lead_therapist: null,
            cis_lead_doctor: null,
            stay_start_before: null,
            stay_start_after: null,
            stay_stop_before: null,
            stay_stop_after: null
        };

        var init = {
            "app_id": app_id,
            "patientListFilter": patientListFilter
        };

        return init;

    };


    // -----------------------------------
    // Functions
    // -----------------------------------

    $scope.loadMainData = function() {
        // -----------------------------------
        // Get Data: d.dataMain
        // -----------------------------------
        $scope.d.haveData = false;
        $scope.d.appInit = $scope.initApp();

        var dataPromiseMain = dataService.getMainAppData();
        dataPromiseMain.then(function(data) {

            // Save Data to $scope.d
            $scope.d.dataMain = data;

            // We always have data
            $scope.d.haveData = true;

            // Run Functions:

            $scope.getPatientList();
            $scope.getAppResponses($scope.d.appInit.app_id);

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





    // ------------------------
    // Get Patients to check
    // ------------------------
    $scope.getPatientList = function() {

        console.log('(!) - getPatientList: START', $scope.d.appInit);

        var api = dataService.getPatientList($scope.d.appInit.patientListFilter);

        api.success(function(data) {


            data.patients.forEach(function(patient, myindex) {
                patient.data.pid = patient.id;
                patient.data = dataService.createPatientExtras(patient.data);
            });

            console.log('(!) - getPatientList: ', data.patients);


        });

        api.error(function(data) {

            console.log('-- getPatientList Error:', error);

        });


    };


    // ------------------------
    // Get App - ResponseData
    // ------------------------
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

        console.log('(!) getSurveyResponses', sql);


        // Get all 'response' fields
        var api = dataService.runSQL(app_query, sql.delimitter, sql.including_headers, sql.format, sql.direct);

        api.success(function(data) {
            // var response_json = JSON.parse(data.rows[0].response);

            console.log('(!!) getSurveyResponses', data);


        });

        api.error(function(data) {

            var text = '(!) Error in SQL (getSurveyResponses)'
            console.log(text, data);
            // $scope.d.functions.showSimpleToast(text)
        });
    };


    // ------------------------
    // Data-Export
    // ------------------------
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



});
