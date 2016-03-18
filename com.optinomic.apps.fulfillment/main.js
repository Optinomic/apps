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
            in_stay: 'True',
            lead_therapist: null,
            cis_lead_doctor: null,
            stay_start_before: null,
            stay_start_after: null,
            stay_stop_before: null,
            stay_stop_after: null
        };

        var patientList = {
            data: [],
            have_data: false
        };

        var survey_responses = {
            data: {},
            headers: {},
            have_data: false
        };

        var fulfillment = {
            results: [],
            have_data: false
        };


        var init = {
            "app_id": app_id,
            "fulfillment": fulfillment,
            "patientListFilter": patientListFilter,
            "patientList": patientList,
            "survey_responses": survey_responses
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

        //console.log('(!) - getPatientList: START', $scope.d.appInit);

        var api = dataService.getPatientList($scope.d.appInit.patientListFilter);

        api.success(function(data) {

            // Loop Patients and enhance with 'Extras'
            var returned_patients = [];
            data.patients.forEach(function(patient, myindex) {
                patient.data.pid = patient.id;
                patient.data = dataService.createPatientExtras(patient.data);

                // Get all stays from patient
                patient.data.stays = [];
                var api_call = dataService.getStays(patient.id);
                var aStays = dataService.getData(api_call);
                aStays.then(function(stays_data) {
                    var my_stays = stays_data.stays;
                    // Loop Stays and enhance with 'Extras'
                    my_stays.forEach(function(my_stay, myindex) {
                        my_stay = dataService.createStayExtras(patient.id, my_stay);
                    });
                    patient.data.stays = my_stays;
                });

                returned_patients.push(patient.data);
            });

            if (returned_patients.length > 0) {
                $scope.d.appInit.patientList = {
                    data: returned_patients,
                    have_data: true
                };

                // Now we have patients - get survey responses
                $scope.getAppResponses($scope.d.appInit.app_id);

            } else {
                $scope.d.appInit.patientList = {
                    data: [],
                    have_data: false
                };
            };

            // console.log('(!) - getPatientList: ', $scope.d.appInit.patientList);

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

        //console.log('(!) getSurveyResponses', sql);


        // Get all 'response' fields
        var api = dataService.runSQL(app_query, sql.delimitter, sql.including_headers, sql.format, sql.direct);

        api.success(function(data) {

            // Loop Patients and enhance with 'Extras'
            var returned_survey_responses = [];
            data.rows.forEach(function(response, myindex) {
                response.event_id = parseInt(response.event_id);
                response.patient_id = parseInt(response.patient_id);
                response.stay_id = parseInt(response.stay_id);
                response.response = JSON.parse(response.response);

                returned_survey_responses.push(response);
            });

            $scope.d.appInit.survey_responses = {
                data: returned_survey_responses,
                headers: data.headers,
                have_data: true
            };

            // we have patients & surveys - get Fulfillment
            $scope.getFulfillment();

        });

        api.error(function(data) {

            var text = '(!) Error in SQL (getSurveyResponses)'
            console.log(text, data);
            // $scope.d.functions.showSimpleToast(text)
        });
    };


    // ------------------------
    // Merge Patients / Survey
    // ------------------------
    $scope.getFulfillment = function() {

        var patients = $scope.d.appInit.patientList.data;
        var surveys = $scope.d.appInit.survey_responses.data;


        var returned_fulfillment = [];

        patients.forEach(function(patient, my_patient_index) {

            var merge_obj = {
                patient: patient,
                stays: patient.stays,
                surveys: []
            };

            merge_obj.stays.surveys = [];

            surveys.forEach(function(survey, my_survey_index) {
                // Save Survey
                if (survey.patient_id === patient.pid) {
                    merge_obj.surveys.push(survey);

                    patient.stays.forEach(function(stay, my_stay_index) {
                        if (survey.stay_id === stay.id) {
                            merge_obj.stays.surveys.push(stay);
                        };
                    });

                };

            });

            returned_fulfillment.push(merge_obj);

        });


        // Save Data to $scope
        $scope.d.appInit.fulfillment = {
            results: returned_fulfillment,
            have_data: true
        };


        console.log('(✓) Fulfillment-Data: ', $scope.d.appInit);

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
