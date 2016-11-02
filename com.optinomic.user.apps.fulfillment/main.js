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

            // Run Functions:
            $scope.d.app = $scope.initApp();
            $scope.d.haveData = true;


            // Finishing: Console Info & Init = done.
            console.log('Welcome, ', $scope.d.dataMain.apps.current.name, $scope.d);
            $scope.d.init = true;
        });
    };
    $scope.loadMainData();



    // ------------------------
    // Functions
    // ------------------------

    $scope.initApp = function() {

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


        var fulfillment = {
            "results": [],
            "have_data": false,
            "loaded": false
        };

        var view_name_format = {
            "format": 'json',
            "direct": 'True'
        };

        // What views where created in [sql_init]
        var sql_views = ['fulfillment_survey_response_view'];

        // Create Return Obj;
        var app = {
            "app_selected": null,
            "fulfillment": fulfillment,
            "patientListFilter": patientListFilter,
            "sql_views": sql_views,
            "selectedTabIndex": 0,
            "is_busy": false,
            "details": {
                "have_data": false
            },
            "view_name_format": view_name_format,
            "patients": {
                "data": [],
                "loaded": false
            },
            "fulfillment": {
                "data": {
                    "all": [],
                    "grouped_by_patient": []
                },
                "loaded": false
            },
        };

        return app;
    };



    $scope.setTab = function(TabIndex) {

        TabIndex = TabIndex === undefined ? 0 : TabIndex;

        // Ergebnis anfordern
        if (TabIndex === 2) {
            $scope.getPatientList();
            $scope.getViewData();
        };

        // Switch - Tab
        $scope.d.app.selectedTabIndex = TabIndex;

    };




    $scope.getPatientList = function() {
        // Init - Params
        var patientListFilter = $scope.d.app.patientListFilter;


        var myAPI = dataService.getPatientList(patientListFilter);

        myAPI.success(function(data) {
            console.log('success: getPatientList', data);

            $scope.d.app.patients.loaded = true;
            $scope.d.app.patients.data = data.patients;
            $scope.d.app.selectedTabIndex = 2;
        });

        myAPI.error(function(data) {
            console.log('ERROR: getPatientList', data);

            $scope.d.app.patients.loaded = false;
            $scope.d.app.patients.data = data;
        });
    };


    $scope.getViewData = function() {

        $scope.d.app.fulfillment.loaded = false;

        var module_identifier = 'com.optinomic.user.apps.fulfillment';
        var view_name = 'fulfillment_survey_response_view';
        var body_params = $scope.d.app.view_name_format;
        var myAPI = dataService.runView(module_identifier, view_name, body_params);

        myAPI.success(function(data) {

            var selected_module_data = [];

            data.rows.forEach(function(current_row, myRowIndex) {
                if (current_row.sr_module === $scope.d.app.app_selected.identifier) {

                    // ID's are Integer
                    current_row.sr_patient_id = parseInt(current_row.sr_patient_id);
                    current_row.sr_event_id = parseInt(current_row.sr_event_id);
                    current_row.sr_stay_id = parseInt(current_row.sr_stay_id);
                    current_row.sr_id = parseInt(current_row.sr_id);

                    current_row.response = JSON.parse(current_row.response);

                    selected_module_data.push(current_row);
                };
            });

            // Group by patient_id
            var selected_module_data_by_patient = dataService.groupBy(selected_module_data, function(item) {
                return [item.sr_patient_id];
            });

            // Merge Patients with 'fullfillment' Data
            var patients = $scope.d.app.patients.data;

            patients.forEach(function(current_patient, myPatientIndex) {

                var patient_fulfillment_obj = {
                    "found": false,
                    "count": 0,
                    "data": []
                }

                selected_module_data_by_patient.forEach(function(current_grouped_patient, myGroupIndex) {
                    if (current_patient.id === current_grouped_patient[0].sr_patient_id) {

                        var selected_module_data_by_patient_stay = dataService.groupBy(current_grouped_patient, function(item) {
                            return [item.sr_stay_id];
                        });

                        patient_fulfillment_obj = {
                            "found": true,
                            "count": current_grouped_patient.length,
                            "data": selected_module_data_by_patient_stay
                        };

                    };

                    // Write to 'Patient'
                    current_patient.fulfillment = patient_fulfillment_obj;
                });
            });


            // Save to $scope
            $scope.d.app.fulfillment.loaded = true;
            $scope.d.app.fulfillment.data.all = selected_module_data;
            $scope.d.app.fulfillment.data.grouped_by_patient = selected_module_data_by_patient;

            console.log('success: getViewResults', data, selected_module_data);
        });

        myAPI.error(function(data) {
            console.log('ERROR: getViewResults', data);

            $scope.d.app.fulfillment.loaded = false;
            $scope.d.app.fulfillment.data = data;
        });
    };


    $scope.showPatientDetails = function(p_array_id) {

        $scope.d.app.details.have_data = true;
        $scope.d.app.details.patient = $scope.d.app.patients.data[p_array_id];
        $scope.d.app.details.patient_array_id = p_array_id;
        $scope.d.app.selectedTabIndex = 3;

        console.log('=> showPatientDetails', $scope.d.app.details);

    };

    $scope.clearPatientDetails = function() {

        $scope.d.app.details.have_data = false;
        $scope.d.app.details.patient = [];
        $scope.d.app.details.patient_array_id = null;
        $scope.d.app.selectedTabIndex = 2;

        console.log('=> clearPatientDetails', $scope.d.app.details);

    };



    // ------------------------
    // Unneeded
    // ------------------------
    $scope.showDetails = function(result_obj, patient_id, stay_id, event_id, response_id) {

        result_obj = result_obj === undefined ? {} : result_obj;
        patient_id = patient_id === undefined ? 0 : patient_id;
        stay_id = stay_id === undefined ? 0 : stay_id;
        event_id = event_id === undefined ? 0 : event_id;
        response_id = response_id === undefined ? 0 : response_id;


        var patient_object = {
            "patient_id": patient_id,
            "data": {}
        };

        var stay_object = {
            "stay_id": stay_id,
            "data": {}
        };

        var event_object = {
            "event_id": event_id,
            "data": {}
        };

        var response_object = {
            "response_id": response_id,
            "data": {}
        };

        $scope.d.details = {
            "patient": patient_object,
            "stay": stay_object,
            "event": event_object,
            "response": response_object,
            "fulfillment": result_obj,
            "have_data": true
        };


        // Patient-Details
        $scope.d.details.patient.data = result_obj.patient.data;

        // Stay-Details
        result_obj.stays.forEach(function(stay, myindex) {
            if (stay.id === stay_id) {
                $scope.d.details.stay.data = stay;
            };
        });

        // event-Details
        result_obj.events.forEach(function(event, myindex) {
            if (event.id === event_id) {
                $scope.d.details.event.data = event;
            };
        });

        // surveys-Details
        result_obj.surveys.forEach(function(survey, myindex) {
            if (survey.survey_response_id === response_id) {
                $scope.d.details.response.data = survey;
            };
        });


        console.log('showDetails:', $scope.d.details);

        // Switch - Tab
        $scope.d.app.selectedTabIndex = 3;
    };






});
