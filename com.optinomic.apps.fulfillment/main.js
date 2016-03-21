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


        var fulfillment = {
            results: [],
            have_data: false
        };


        var init = {
            "app_id": app_id,
            "fulfillment": fulfillment,
            "patientListFilter": patientListFilter,
            "selectedTabIndex": 0,
            "is_busy": false,
            "promise": {}
        };


        $scope.d.appInit = init;

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

        var dataPromiseMain = dataService.getMainAppData();
        dataPromiseMain.then(function(data) {

            // Save Data to $scope.d
            $scope.d.dataMain = data;

            // Run Functions:
            $scope.d.appInit = $scope.initApp();
            $scope.d.haveData = true;


            // Init - Data Export
            // $scope.setExport();

            // Finishing: Console Info & Init = done.
            console.log('Welcome, ', $scope.d.dataMain.apps.current.name, $scope.d);
            $scope.d.init = true;
        });
    };
    $scope.loadMainData();


    // ------------------------
    // Merge Patients / Survey
    // ------------------------
    $scope.getFulfillment = function() {
        $scope.d.appInit.is_busy = true;

        var dataPromiseFulfillment = dataService.getFulfillmentData($scope.d.appInit.app_id, $scope.d.appInit.patientListFilter);
        dataPromiseFulfillment.then(function(data_fulfill) {
            // When we have the data
            console.log('(✓) PromiseFulfillment', data_fulfill);
            $scope.d.appInit.promise = data_fulfill;


            var patients = $scope.d.appInit.promise.patients;
            var surveys = $scope.d.appInit.promise.survey_responses;


            var returned_fulfillment = [];

            patients.forEach(function(patient, my_patient_index) {

                var stays = patient.data.stays;
                var module_events = patient.data.events.current_module;

                var merge_obj = {
                    patient: patient,
                    stays: stays,
                    events: module_events,
                    surveys: []
                };

                // Save all Surveys per Patient
                surveys.forEach(function(my_survey, my_survey_index) {
                    //console.log('--> survey', patient.id, my_survey.patient_id);
                    if (my_survey.patient_id === patient.id) {
                        merge_obj.surveys.push(my_survey);
                        //console.log('==> survey pushed', my_survey);
                    };
                });

                // Save Survey per stay
                stays.forEach(function(my_stay, my_stay_index) {
                    my_stay.surveys = [];
                    merge_obj.surveys.forEach(function(survey, my_survey_index) {
                        //console.log('--> stay/survey', my_stay, survey);
                        if (my_stay.id === survey.stay_id) {
                            my_stay.surveys.push(survey);
                            // console.log('==> survey pushed to stay', survey);
                        };
                    });
                });


                returned_fulfillment.push(merge_obj);

            });


            // Save Data to $scope
            $scope.d.appInit.fulfillment = {
                results: returned_fulfillment,
                have_data: true
            };


            $scope.d.appInit.is_busy = false;
            $scope.d.appInit.selectedTabIndex = 2;
            console.log('(✓) Fulfillment-Data: ', $scope.d.appInit);


        });
    };


    // ------------------------
    // Data-Export
    // ------------------------
    $scope.setTab = function(TabIndex) {

        TabIndex = TabIndex === undefined ? 0 : TabIndex;

        // Ergebnis anfordern
        if (TabIndex === 2) {
            $scope.getFulfillment();
        };

        // Switch - Tab
        $scope.d.appInit.selectedTabIndex = TabIndex;

    };


    // ------------------------
    // showDetails
    // ------------------------
    $scope.showDetails = function(result_index, patient_id, stay_id, event_id, response_id) {

        var results = $scope.d.appInit.fulfillment.results[result_index];

        var patient_object = {
            "patient_id": patient_id,
            "data": {}
        }

        var stay_object = {
            "stay_id": stay_id,
            "data": {}
        }

        var event_object = {
            "event_id": event_id,
            "event": {}
        }

        var response_object = {
            "response_id": response_id,
            "event": {}
        }

        $scope.d.details = {
            "patient": patient_object,
            "stay": stay_object,
            "event": event_object,
            "response": response_object,
            "fulfillment_result": results,
            "have_data": true
        };



        // API - GET Patien-Details
        var patient_call = dataService.getPatient(patient_id);
        patient_call.success(function(data) {
            //console.log('patient_call = ', data)
            $scope.d.details.patient.data = data;
        });
        patient_call.error(function(data) {
            console.log('Error: patient_call = ', data)
        });


        // API - GET Stay-Details
        var stays_call = dataService.getPatientStays(patient_id);
        stays_call.success(function(data) {
            //console.log('stays_call = ', data)
            data.stays.forEach(function(stay, myindex) {
                if (stay.id === stay_id) {
                    $scope.d.details.stay.data = stay;
                };
            });
        });
        stays_call.error(function(data) {
            console.log('Error: stays_call = ', data)
        });



        console.log('showDetails:', $scope.d.details);

        // Switch - Tab
        $scope.d.appInit.selectedTabIndex = 3;

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
