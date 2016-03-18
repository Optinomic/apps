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
        $scope.d.appInit = $scope.initApp();

        var dataPromiseMain = dataService.getMainAppData();
        dataPromiseMain.then(function(data) {

            // Save Data to $scope.d
            $scope.d.dataMain = data;

            // Run Functions:
            $scope.getFulfillment();

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


        var dataPromiseFulfillment = dataService.getFulfillmentData($scope.d.appInit.app_id, $scope.d.appInit.patientListFilter);
        dataPromiseFulfillment.then(function(data_fulfill) {
            // When we have the data
            $scope.d.haveData = true;
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

            console.log('(✓) Fulfillment-Data: ', $scope.d.appInit);


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
