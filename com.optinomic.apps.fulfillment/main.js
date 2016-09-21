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
            "have_data": false
        };


        var init = {
            "app_id": app_id,
            "fulfillment": fulfillment,
            "patientListFilter": patientListFilter,
            "selectedTabIndex": 0,
            "get_view_name_format": get_view_name_format,
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
                    timeline: [],
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




            // ----------------------------------
            // Create Timeline Array:
            // ----------------------------------


            returned_fulfillment.forEach(function(result, my_result_index) {

                var timeline = [];
                var timeline_item = {};


                // Stays
                result.stays.forEach(function(stay, my_stay_index) {

                    // Eintritt
                    timeline_item = {};
                    timeline_item.date = stay.data.start;
                    timeline_item.time = stay.data.start.substring(11, 16);
                    timeline_item.logo = 'mdi-flag';
                    timeline_item.type = 'stay';
                    timeline_item.line_1 = 'Eintritt';
                    timeline_item.line_2 = stay.from_to;
                    timeline_item.line_3 = stay.duration + ' Tage';
                    timeline_item.url = stay.url;
                    timeline_item.data = stay;
                    timeline.push(timeline_item);

                    // Austritt
                    if (stay.data.stop !== null) {
                        timeline_item = {};
                        timeline_item.date = stay.data.stop;
                        timeline_item.time = stay.data.stop.substring(11, 16);
                        timeline_item.logo = 'mdi-flag-checkered';
                        timeline_item.type = 'stay';
                        timeline_item.line_1 = 'Austritt';
                        timeline_item.line_2 = stay.from_to;
                        timeline_item.line_3 = stay.duration + ' Tage';
                        timeline_item.url = stay.url;
                        timeline_item.data = stay;
                        timeline.push(timeline_item);
                    };

                });

                // Events
                result.events.forEach(function(event, my_event_index) {
                    var timeline_item = {};

                    // Event
                    timeline_item.date = event.data.created_at;
                    timeline_item.time = event.data.created_at.substring(11, 16);
                    timeline_item.logo = 'mdi-clock';
                    timeline_item.type = 'event';
                    timeline_item.line_1 = event.data.survey_name;
                    timeline_item.line_2 = event.data.status;
                    timeline_item.line_3 = event.data.description;
                    timeline_item.url = event.data.url;
                    timeline_item.data = event;

                    timeline_item.class = 'grey';

                    if (event.data.status === 'done') {
                        timeline_item.class = 'green';
                    }
                    if (event.data.status === 'to_be_done') {
                        timeline_item.class = 'red';
                    }


                    // Find - Survey Response for this event


                    timeline_item.survey = {};
                    timeline_item.survey.logo = 'mdi-database';
                    timeline_item.survey.type = 'survey-none';
                    timeline_item.survey.date = new Date();
                    timeline_item.survey.date = timeline_item.survey.date.toString();
                    timeline_item.survey.time = timeline_item.survey.date.substring(11, 16);
                    timeline_item.survey.line_1 = event.data.survey_name;
                    timeline_item.survey.line_2 = event.data.status;
                    timeline_item.survey.line_3 = event.data.description;
                    timeline_item.survey.url = event.data.url;
                    timeline_item.survey.class = 'grey';
                    timeline_item.survey.data = {};


                    result.surveys.forEach(function(survey, my_survey_index) {

                        if (event.id === survey.event_id) {

                            var date1 = $scope.d.functions.sureDateInstance(event.data.created_at);
                            var date2 = $scope.d.functions.sureDateInstance(survey.filled);
                            var timeDiff = Math.abs(date2.getTime() - date1.getTime());
                            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                            var diffHours = Math.ceil(timeDiff / (1000 * 3600));

                            timeline_item.survey.date = survey.filled;
                            timeline_item.survey.time = survey.filled.substring(11, 16);
                            timeline_item.survey.logo = 'mdi-database-plus';
                            timeline_item.survey.type = 'survey';
                            timeline_item.survey.line_1 = event.data.survey_name;
                            timeline_item.survey.line_2 = 'Tage: ' + diffDays;
                            timeline_item.survey.line_3 = 'Stunden: ' + diffHours;
                            timeline_item.survey.url = event.data.url;
                            timeline_item.survey.class = 'green';
                            timeline_item.survey.data = survey;

                            timeline_item.logo = 'mdi-check';
                        };

                    });


                    timeline.push(timeline_item);

                });

                // Sort & Save Timeline
                timeline = dataService.sortByKey(timeline, 'date');
                result.timeline = timeline;

            });



            // Save Data to $scope
            $scope.d.appInit.fulfillment = {
                "results": returned_fulfillment,
                "have_data": true
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
