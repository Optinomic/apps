'use strict';

/**
 * Service for getting Data from API
 */
angular.module('optinomicDataModule')
    .service('dataService', function($q, $filter, apiService) {


        var dataService = {};

        // -------------------------------------------------------------------------
        // API - Functions
        // -------------------------------------------------------------------------

        dataService.getSurveyResponses = function() {
            return apiService.get("/patients/" + helpers.getPatientID() + "/survey_responses/" + helpers.getAppID(), {});
        };

        dataService.getAppCalculations = function(calculation_identifier) {
            return apiService.get("/patients/" + helpers.getPatientID() + "/calculations/" + helpers.getAppID() + "/" + calculation_identifier, {});
        };

        dataService.getAppCalculationsUser = function(my_module_identifier, my_calculation_identifier) {
            return apiService.get("/calculations/" + my_module_identifier + "/" + my_calculation_identifier, {});
        };

        dataService.getConfig = function() {
            return apiService.get("/extra_config", {});
        };

        dataService.getAllApps = function() {
            return apiService.get("/modules", {});
        };

        dataService.getCurrentPatient = function() {
            return apiService.get("/patients/" + helpers.getPatientID() + "/full", {});
        };

        dataService.getPatientEvents = function() {
            return apiService.get("/patients/" + helpers.getPatientID() + "/events", {});
        };

        dataService.getPatientGroups = function() {
            return apiService.get("/patient_groups", {});
        };

        dataService.getPatientsFromPatientGroup = function(currentGroup) {
            var apiStr = "/patient_groups/" + currentGroup + "/patients";
            return apiService.get(apiStr, {});
        };


        // -------------------------------------------------------------------------
        // Helper - Functions
        // -------------------------------------------------------------------------

        dataService.getPatientID = function() {
            return helpers.getPatientID();
        };

        dataService.getToken = function() {
            return helpers.getToken();
        };

        dataService.getAppName = function() {
            return helpers.getAppName();
        };

        dataService.getAppID = function() {
            return helpers.getAppID();
        };

        dataService.getApiURL = function() {
            return helpers.getApiURL();
        };




        dataService.checkSuccess = function(max, count) {

            var allPromised = false;
            if (max === count) {
                allPromised = true;
            }
            //console.log('checkSuccess:', allPromised, max, count);
            return allPromised;
        };

        dataService.getData = function(api_call) {
            var deferred = $q.defer();

            api_call.success(function(data) {
                deferred.resolve(data);
                //console.log('===> Success - getData   ', data, deferred);
            });
            api_call.error(function(data) {
                deferred.reject(data);
                console.log('===> ERROR! getData   ', data, deferred);
            });
            return deferred.promise;
        };


        dataService.getClinicData = function(clinic_key) {

            // This function is a 'clone' from 
            // /client/app/modules/optinomic-module/service/clinics-service.js
            // Update here and there!   

            var data = {};


            switch (clinic_key) {
                case '1':
                    {
                        data = {

                            firebaseRoot: 'https://optinomic.firebaseio.com/',

                            customer: {
                                id: 1,
                                contact: {
                                    name: 'Klinik Südhang',
                                    slogan: 'Kompetenzzentrum für Mensch und Sucht',
                                    address: 'Südhang 1, 3038 Kirchlindach',
                                    phone: '+41 (0)31 828 14 14',
                                    email: 'info@suedhang.ch',
                                    logo: 'http://suedhang.ch/images/content/Logo_Suedhang_Retina.png',
                                    www: 'http://suedhang.ch/de/'
                                },
                                admin: {
                                    name: 'Katrin Schläfli',
                                    phone: '+41 (0)31 828 14 15',
                                    email: 'katrin.schlaefli@suedhang.ch'
                                }
                            },

                            talksRooms: [{
                                id: 0,
                                name: 'GeneralInformation',
                                icon: 'mdi-duck',
                                journal: {
                                    integrate_in_timeline: true
                                }
                            }, {
                                id: 1,
                                name: 'QuestionsAndAnswers',
                                icon: 'mdi-help',
                                journal: {
                                    integrate_in_timeline: false
                                }
                            }]

                        };
                        break;
                    }

                default:
                    {
                        data = {

                            firebaseRoot: 'https://optinomic.firebaseio.com/',

                            customer: {
                                id: 1,
                                contact: {
                                    name: 'Optinomic',
                                    slogan: 'Testumgebung',
                                    address: 'Haldenstr.7, 8942 Oberrieden',
                                    phone: '+41 (0)44 508 26 76',
                                    email: 'info@optinomic.com',
                                    logo: 'http://www.optinomic.com/wp-content/uploads/2014/09/optinomic_logo_medium.png',
                                    www: 'http://www.optinomic.com'
                                },
                                admin: {
                                    name: 'Beat Ottiger',
                                    phone: '+41(0)79 635 85 84',
                                    email: 'beat@optinomic.com'
                                }
                            },

                            talksRooms: [{
                                id: 0,
                                name: 'GeneralInformation',
                                icon: 'mdi-duck',
                                journal: {
                                    integrate_in_timeline: true
                                }
                            }, {
                                id: 1,
                                name: 'QuestionsAndAnswers',
                                icon: 'mdi-help',
                                journal: {
                                    integrate_in_timeline: false
                                }
                            }]

                        };
                    }
            }


            data.all = {
                client_version: '20150717'
            };

            return data;
        };


        dataService.createPatientExtras = function(patient) {
            //console.log('createPatientExtras ', patient);
            patient.age = $filter('dateToAge')(patient.birthdate);
            patient.birthday = $filter('date')(patient.birthdate);

            patient.extras = {};
            patient.extras.age = patient.age;
            patient.extras.birthday = patient.birthday;
            patient.extras.birthday_age = patient.birthday + ' | ' + patient.age;
            patient.extras.name = patient.last_name + ' ' + patient.first_name;

            if (patient.gender === 'male') {
                patient.ansprache = 'Herr'
            } else {
                patient.ansprache = 'Frau'
            };

            patient.extras.full_name = patient.last_name + ' ' + patient.first_name;
            if (patient.title) {
                patient.extras.full_name = patient.title + ' ' + patient.extras.full_name;
            };
            patient.extras.full_name = patient.ansprache + ' ' + patient.extras.full_name;

            patient.extras.fulladdress = patient.address1 + ', ' + patient.zip_code + ' ' + patient.city;

            var myPhone = '';
            if (patient.phone_home) {
                myPhone = patient.phone_home;
            }
            if (patient.phone_mobile) {
                if (myPhone != '') {
                    myPhone = myPhone + ', ' + patient.phone_mobile;
                } else {
                    myPhone = patient.phone_mobile;
                }
            }
            patient.extras.phone = myPhone;


            patient.extras.infoline = patient.extras.fulladdress + ' | ' + patient.extras.phone;


            // -----------------------------------
            // Female = Pink | Male = Blue
            // -----------------------------------
            var myColor = "md-accent";
            var myColorAccent = "md-warn";
            if (patient.gender === "female") {
                myColor = "md-warn";
                myColorAccent = "md-accent";
            }
            patient.color = {};
            patient.color.color = myColor;
            patient.color.accent = myColorAccent;



            return patient;
        };




        // -------------------------------------------------------------------------
        // Main - Functions
        // -------------------------------------------------------------------------

        dataService.getMainAppData = function() {

            // Actions
            var actions = 5;
            var actions_count = 0;

            // Init
            var deferred = $q.defer();
            var api = '';
            var return_data = {};


            // ------------------------------------------------
            // Get Params from Helper Functions
            // ------------------------------------------------
            var app_identifier = dataService.getAppID();
            return_data.identifier = app_identifier;

            return_data.params = {};
            return_data.params.PID = dataService.getPatientID();
            return_data.params.token = dataService.getToken();
            return_data.params.app_name = dataService.getAppName();
            return_data.params.app_id = app_identifier;
            return_data.params.api_url = dataService.getApiURL();
            //console.log('Parameters', return_data.params);

            // ------------------------------------------------
            // Action 1:  Survey Responses
            // ------------------------------------------------

            api = dataService.getSurveyResponses(app_identifier);
            var aSurveyResponses = dataService.getData(api);

            aSurveyResponses.then(function(data) {

                var responses = data.survey_responses;
                var survey_responses_array = [];
                responses.forEach(function(response, myindex) {
                    dataService.getResponsesExtras(response);
                    survey_responses_array.push(response.data.response);
                });

                return_data.survey_responses = responses;
                return_data.survey_responses_array = survey_responses_array;

                // Deferred when done.
                actions_count = actions_count + 1;
                if (dataService.checkSuccess(actions, actions_count)) {
                    deferred.resolve(return_data);
                };
            }, function(error) {
                // Error
                deferred.reject(return_data);
                console.log('-- Error:', error);
            });


            // ------------------------------------------------
            // Action 2:  Get Config
            // ------------------------------------------------

            api = dataService.getConfig();
            var aConfig = dataService.getData(api);

            aConfig.then(function(data) {
                var configData = data.extra_config;
                return_data.config = configData;

                // Get Clini-Data
                // ToDo - Move Entries from getClinicData!
                return_data.config.data = dataService.getClinicData(configData.key);
                return_data.config.api = {};
                return_data.config.api.url = dataService.getApiURL();

                // Deferred when done.
                actions_count = actions_count + 1;
                if (dataService.checkSuccess(actions, actions_count)) {
                    deferred.resolve(return_data);
                };
            }, function(error) {
                // Error
                deferred.reject(return_data);
                console.log('-- Error:', error);
            });


            // ------------------------------------------------
            // Action 3:  Get current App Info
            // ------------------------------------------------
            api = dataService.getAllApps();
            var aApps = dataService.getData(api);

            aApps.then(function(data) {
                var myApp = {};

                if (parseInt(helpers.getPatientID()) === 0) {
                    myApp.all = data.user_modules;
                } else {
                    myApp.all = data.patient_modules;
                };


                // Save current app details
                myApp.all.forEach(function(current_app, myindex) {
                    if (current_app.identifier === app_identifier) {
                        myApp.current = current_app;


                        return_data.calculations = [];
                        // ------------------------------------------------
                        // Action 3a:  App - Calculations
                        // ------------------------------------------------
                        actions = actions + current_app.calculations.length;


                        current_app.calculations.forEach(function(calculatons, myindex) {

                            if (parseInt(helpers.getPatientID()) === 0) {
                                console.log('User App - Calculation: ', current_app.identifier, calculatons)
                                api = dataService.getAppCalculationsUser(current_app.identifier, calculatons);
                            } else {
                                console.log('Patient App - Calculation: ', current_app.identifier, calculatons)
                                api = dataService.getAppCalculations(calculatons);
                            };
                            var aCalculation = dataService.getData(api);

                            aCalculation.then(function(data) {

                                var date = new Date();
                                var objectToPush = {
                                    'calculation_name': calculatons,
                                    'calculation_results': data.calculation_result,
                                    'calculated_datestamp': date,
                                    'calculated_date': $filter("amDateFormat")(date, 'DD.MM.YYYY'),
                                    'calculated_time': $filter("amDateFormat")(date, 'HH:mm')
                                };

                                return_data.calculations.push(objectToPush);
                                //console.log('(+) LOOP - calculations: ', data.calculation_result);


                                if (parseInt(helpers.getPatientID()) !== 0) {

                                    // Assign Calculation Result to survey_response
                                    var all_results = data.calculation_result;

                                    return_data.survey_responses.forEach(function(response, myindex) {
                                        //console.log('(+) LOOP - survey_responses: ', response, all_results, myindex);
                                        var inner_calculations = [];

                                        if (all_results) {
                                            all_results.forEach(function(current_result, myindex) {
                                                //console.log('(+) Compare: ', current_result.response.data.response, response.data.response);

                                                if (JSON.stringify(current_result.response.data.response) === JSON.stringify(response.data.response)) {
                                                    var myResult = current_result;
                                                    //console.log('(+) EQUAL: ', current_result);

                                                    var objectToPush = {
                                                        'calculation_name': calculatons,
                                                        'calculation_result': myResult,
                                                        'calculated_datestamp': date,
                                                        'calculated_date': $filter("amDateFormat")(date, 'DD.MM.YYYY'),
                                                        'calculated_time': $filter("amDateFormat")(date, 'HH:mm')
                                                    };
                                                    inner_calculations.push(objectToPush);
                                                };
                                            });
                                            response.calculations = inner_calculations;
                                        };

                                    });
                                };


                                // Deferred when done.
                                actions_count = actions_count + 1;
                                if (dataService.checkSuccess(actions, actions_count)) {
                                    deferred.resolve(return_data);
                                };
                            }, function(error) {
                                // Error
                                deferred.reject(return_data);
                                console.log('-- Error:', error);
                            });

                        });

                    };
                });

                return_data.apps = myApp;

                // Deferred when done.
                actions_count = actions_count + 1;
                if (dataService.checkSuccess(actions, actions_count)) {
                    deferred.resolve(return_data);
                };
            }, function(error) {
                // Error
                deferred.reject(return_data);
                console.log('-- Error:', error);
            });

            // ------------------------------------------------
            // Action 4:  Patient - Details
            // ------------------------------------------------

            if (parseInt(helpers.getPatientID()) === 0) {
                actions_count = actions_count + 1;
            } else {
                api = dataService.getCurrentPatient();
                var aPatient = dataService.getData(api);

                aPatient.then(function(data) {
                    return_data.patient = data;
                    console.log('createPatientExtras', data);
                    return_data.patient.data = dataService.createPatientExtras(data.patient.data);

                    // Deferred when done.
                    actions_count = actions_count + 1;
                    if (dataService.checkSuccess(actions, actions_count)) {
                        deferred.resolve(return_data);
                    };
                }, function(error) {
                    // Error
                    deferred.reject(return_data);
                    console.log('-- Error:', error);
                });
            };


            // ------------------------------------------------
            // Action 5:  Patient Events
            // ------------------------------------------------

            if (parseInt(helpers.getPatientID()) === 0) {
                actions_count = actions_count + 1;
            } else {
                api = dataService.getPatientEvents(app_identifier);
                var aEvents = dataService.getData(api);

                aEvents.then(function(data) {

                    return_data.events = data.events;

                    // Deferred when done.
                    actions_count = actions_count + 1;
                    if (dataService.checkSuccess(actions, actions_count)) {
                        deferred.resolve(return_data);
                    };
                }, function(error) {
                    // Error
                    deferred.reject(return_data);
                    console.log('-- Error:', error);
                });

            };


            // ------------------------------------------------
            // Action 6:  Patient-Groups
            // ------------------------------------------------
            api = dataService.getPatientGroups();
            var aPatientGroups = dataService.getData(api);
            aPatientGroups.then(function(dataPatientGroups) {
                //console.log('dataPatientGroups dataPatientGroups', dataPatientGroups);

                var patient_groups = dataPatientGroups.patient_groups;
                return_data.patient_groups = patient_groups;


                // GET Patients from the Groups
                actions = actions + patient_groups.length;
                patient_groups.forEach(function(current_pg, myindex) {

                    api = dataService.getPatientsFromPatientGroup(current_pg.id);
                    var aPatients = dataService.getData(api);
                    aPatients.then(function(dataPatients) {
                        var patients = dataPatients.patients;
                        current_pg.patients = patients;

                        patients.forEach(function(patient, myindex) {
                            patient.data.pid = patient.id;
                            patient.data = dataService.createPatientExtras(patient.data);
                        });

                        // Deferred when done.
                        actions_count = actions_count + 1;
                        if (dataService.checkSuccess(actions, actions_count)) {
                            //console.log('==> deferred', return_data);
                            deferred.resolve(return_data);
                        };


                    }, function(error) {
                        // Error
                        deferred.reject(return_data);
                        console.log('-- Error:', error);
                    });
                });


                // Deferred when done.
                actions_count = actions_count + 1;
                if (dataService.checkSuccess(actions, actions_count)) {
                    //console.log('==> deferred', return_data);
                    deferred.resolve(return_data);
                };


            }, function(error) {
                // Error
                deferred.reject(return_data);
                console.log('-- Error:', error);
            });





            return deferred.promise;
        };


        dataService.getResponsesExtras = function(response) {
            var resp = response.data;

            var date = resp.filled;
            resp.filled_year = $filter("amDateFormat")(date, 'YYYY');
            resp.filled_week = $filter("amDateFormat")(date, 'YYYY, ww');
            resp.filled_day = $filter("amDateFormat")(date, 'DD.MM.YYYY');
            resp.filled_weekday = $filter("amDateFormat")(date, 'dddd');
            resp.filled_time = $filter("amDateFormat")(date, 'HH:mm');

            return response;
        };

        return dataService;


    });
