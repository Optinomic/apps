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

        dataService.getUsers = function() {
            return apiService.get("/users", {});
        };

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

        dataService.runSQL = function(my_query, my_delimiter, my_including_headers, my_format, my_direct) {
            //my_query = my_query === undefined ? 'select * from information_schema.tables' : my_query;
            my_delimiter = my_delimiter === undefined ? ';' : my_delimiter;
            my_including_headers = my_including_headers === undefined ? 'True' : my_including_headers;
            my_format = my_format === undefined ? 'csv' : my_format;
            my_direct = my_direct === undefined ? 'False' : my_direct;


            if (my_format === 'csv') {
                var body = {
                    "query": my_query,
                    "delimiter": my_delimiter,
                    "including_headers": my_including_headers,
                    "direct": my_direct,
                    "format": my_format
                };
            } else {
                var body = {
                    "query": my_query,
                    "delimiter": my_delimiter,
                    "direct": my_direct,
                    "format": my_format
                };
            };

            //console.log('(!) runSQL: ', body);
            return apiService.post("/run_sql", body);
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

        dataService.getPatientAnnotations = function() {
            var patient_id = dataService.getPatientID();
            var apiStr = '/patients/' + patient_id + '/annotations';
            return apiService.get(apiStr, {});
        };

        dataService.putPatientAnnotations = function(json_value) {
            var patient_id = dataService.getPatientID();
            var apiStr = '/patients/' + patient_id + '/annotations';
            var body = {
                "value": json_value
            };
            return apiService.put(apiStr, body);
        };

        dataService.getUserAnnotations = function() {
            var user_id = dataService.getUserID();
            var apiStr = '/users/' + user_id + '/annotations';
            return apiService.get(apiStr, {});
        };

        dataService.putUserAnnotations = function(json_value) {

            var user_id = dataService.getUserID();
            //console.log('(!!) API - CALL: putUserAnnotations', user_id, json_value);
            var apiStr = '/users/' + user_id + '/annotations';
            var body = {
                "value": json_value
            };
            return apiService.put(apiStr, body);
        };


        dataService.getPatientModuleAnnotations = function() {
            var patient_id = dataService.getPatientID();
            var module_identifier = dataService.getAppID();

            var apiStr = '/patients/' + patient_id + '/modules/' + module_identifier + '/annotations';
            return apiService.get(apiStr, {});
        };

        dataService.putPatientModuleAnnotations = function(json_value) {
            var patient_id = dataService.getPatientID();
            var module_identifier = dataService.getAppID();
            var apiStr = '/patients/' + patient_id + '/modules/' + module_identifier + '/annotations';
            var body = {
                "value": json_value
            };
            return apiService.put(apiStr, body);
        };


        dataService.getModuleAnnotations = function() {
            var module_identifier = dataService.getAppID();
            var apiStr = '/modules/' + module_identifier + '/patient_annotations';
            return apiService.get(apiStr, {});
        };

        dataService.putModuleAnnotations = function(json_value) {
            var module_identifier = dataService.getAppID();
            var apiStr = '/modules/' + module_identifier + '/annotations';
            var body = {
                "value": json_value
            };
            return apiService.put(apiStr, body);
        };


        // -------------------------------------------------------------------------
        // Helper - Functions
        // -------------------------------------------------------------------------

        dataService.getPatientID = function() {
            return parseInt(helpers.getPatientID());
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

        dataService.getUserID = function() {
            return parseInt(helpers.getUserID());
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
        // Array - Functions
        // -------------------------------------------------------------------------


        dataService.groupBy = function(array, f) {
            var groups = {};
            array.forEach(function(o) {
                var group = JSON.stringify(f(o));
                groups[group] = groups[group] || [];
                groups[group].push(o);
            });
            return Object.keys(groups).map(function(group) {
                return groups[group];
            })
        }

        dataService.isEmpty = function(obj) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop))
                    return false;
            }
            return true;
        };

        dataService.sortByKey = function(array, key) {
            return array.sort(function(a, b) {
                var x = a[key];
                var y = b[key];
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
        };

        dataService.checkSuccess = function(max, count) {

            var allPromised = false;
            if (max === count) {
                allPromised = true;
            }
            //console.log('checkSuccess:', allPromised, max, count);
            return allPromised;
        };

        dataService.findIndex = function(array, attr, value) {
            for (var i = 0; i < array.length; i += 1) {
                if (array[i][attr] === value) {
                    return i;
                }
            }
        };

        // --------------------------------------------------
        // Create uniqueID
        // --------------------------------------------------
        dataService.uniqueid = function() {
            // always start with a letter (for DOM friendlyness)
            var idstr = String.fromCharCode(Math.floor((Math.random() * 25) + 65));
            do {
                // between numbers and characters (48 is 0 and 90 is Z (42-48 = 90)
                var ascicode = Math.floor((Math.random() * 42) + 48);
                if (ascicode < 58 || ascicode > 64) {
                    // exclude all chars between : (58) and @ (64)
                    idstr += String.fromCharCode(ascicode);
                }
            } while (idstr.length < 32);

            return (idstr);
        };



        // -------------------------------------------------------------------------
        // Main - Functions
        // -------------------------------------------------------------------------

        dataService.getMainAppData = function() {

            // Actions
            var actions = 7;
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
            return_data.params.userID = dataService.getUserID();
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

                //console.log('(!) - getSurveyResponses: ', data);

                // All Responses
                var responses = data.survey_responses;
                return_data.survey_responses = responses;


                // Group Responses by survey_name
                return_data.survey_responses_group = dataService.groupBy(responses, function(item) {
                    return [item.event.survey_name];
                });

                // Store Group Definitions with survey_name
                return_data.survey_responses_group_definitions = [];
                return_data.survey_responses_group.forEach(function(current_group, myindex) {

                    var myObject = {
                        'id': myindex,
                        'survey': current_group[0].event.survey_name,
                        'count': return_data.survey_responses_group[myindex].length,
                        'description': current_group[0].event.description,
                        'module': current_group[0].event.module
                    };

                    return_data.survey_responses_group_definitions.push(myObject);
                });


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
                                // console.log('(+) LOOP - calculations: ', data.calculation_result);


                                if (parseInt(helpers.getPatientID()) !== 0) {

                                    // Assign Calculation Result to survey_response
                                    var all_results = data.calculation_result;

                                    return_data.survey_responses.forEach(function(response, myindex) {
                                        // console.log('(+) LOOP - survey_responses: ', response, all_results);
                                        var inner_calculations = [];

                                        if (all_results) {
                                            all_results.forEach(function(current_result, myindex) {
                                                // console.log('(+) Compare: ', current_result.response.data.response, response.entity.data.response);

                                                if (JSON.stringify(current_result.response.data.response) === JSON.stringify(response.entity.data.response)) {
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
                    //console.log('createPatientExtras', data);
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

                    return_data.events.forEach(function(current_event, myindex) {

                        var date = current_event.data.created_at;

                        current_event.data.extras = {};
                        current_event.data.extras.created_year = $filter("amDateFormat")(date, 'YYYY');
                        current_event.data.extras.created_week = $filter("amDateFormat")(date, 'YYYY, ww');
                        current_event.data.extras.created_date = $filter("amDateFormat")(date, 'DD.MM.YYYY');
                        current_event.data.extras.created_time = $filter("amDateFormat")(date, 'HH:mm');

                    });




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


            // ------------------------------------------------
            // Action 7:  All Users
            // ------------------------------------------------

            api = dataService.getUsers();
            var aUsers = dataService.getData(api);

            aUsers.then(function(data) {

                // All Users
                var users = data.users;
                return_data.users = {};
                return_data.users.all = users;

                users.forEach(function(user, myindex) {
                    user.data.uid = user.id;
                    user.data = dataService.createUserExtras(user.data);

                    // Store Current User
                    if (user.id === dataService.getUserID()) {
                        return_data.users.current = user;
                    };
                });

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


            return deferred.promise;
        };


        dataService.getResponsesExtras = function(response) {
            var resp = response.entity.data;

            var date = resp.filled;
            resp.filled_year = $filter("amDateFormat")(date, 'YYYY');
            resp.filled_week = $filter("amDateFormat")(date, 'YYYY, ww');
            resp.filled_day = $filter("amDateFormat")(date, 'DD.MM.YYYY');
            resp.filled_weekday = $filter("amDateFormat")(date, 'dddd');
            resp.filled_time = $filter("amDateFormat")(date, 'HH:mm');

            return response;
        };


        dataService.createUserExtras = function(user) {
            user.age = $filter('dateToAge')(user.birthday);
            user.birthdate = user.birthday;
            //user.birthdate = $filter('date')(user.birthday);
            //user.birthdate = $filter("amDateFormat")(date, 'YYYY-MM-DD');
            //user.birthday_date = moment(user.birthday).toDate();

            user.extras = {};
            user.extras.age = user.age;
            user.extras.birthdate = $filter("amDateFormat")(user.birthday, 'YYYY-MM-DD');
            user.extras.birthday_date = moment(user.extras.birthdate).toDate();
            user.extras.birthday_age = $filter("amDateFormat")(user.birthday, 'DD.MM.YYYY') + ' | ' + user.age;
            user.extras.name = user.last_name + ' ' + user.first_name;


            if (user.gender === 'female') {
                user.extras.ansprache = 'Frau'
            } else {
                user.extras.ansprache = 'Herr'
            };

            user.extras.full_name = user.last_name + ' ' + user.first_name;
            if (user.initials) {
                user.extras.full_name = user.extras.full_name + ' (' + user.initials + ')'
            };

            // -----------------------------------
            // Female = Pink | Male = Blue
            // -----------------------------------
            var myColor = "md-accent";
            var myColorAccent = "md-warn";
            if (user.gender === "female") {
                myColor = "md-warn";
                myColorAccent = "md-accent";
            }
            user.color = {};
            user.color.color = myColor;
            user.color.accent = myColorAccent;

            return user;
        };



        //------------------------------------------
        // Patient / User - Annotations
        //------------------------------------------

        dataService.getAnnotationsData = function(api_direction, node_tree) {
            var deferred = $q.defer();
            var return_data = {};
            var app_id = dataService.getAppID();

            if (api_direction === 'user') {
                var api = dataService.getUserAnnotations();
            } else {
                var api = dataService.getPatientModuleAnnotations();
            };

            var aPromise = dataService.getData(api);
            aPromise.then(function(data) {

                // return_data = data.app === undefined ? {} : data.app;
                // return_data = return_data[app_id] === undefined ? {} : return_data[app_id];
                return_data = return_data[node_tree] === undefined ? {} : return_data[node_tree];
                return_data = JSON.parse(JSON.stringify(return_data));
                console.log('(!) getAnnotationsData - Success', return_data);
                deferred.resolve(return_data);

            }, function(error) {
                // Error
                deferred.reject(return_data);
                console.log('ERROR: getAnnotationsData', error);
            });

            return deferred.promise;
        };

        dataService.saveAnnotationsData = function(api_direction, node_tree, json_value) {

            console.log('(START) saveAnnotationsData', api_direction, node_tree, json_value);


            var deferred = $q.defer();
            var return_data = {};
            var full_data = {};
            var app_id = dataService.getAppID();


            if (api_direction === 'user') {
                var api_read = dataService.getUserAnnotations();
            } else {
                var api_read = dataService.getPatientModuleAnnotations();
            };

            var aPromise = dataService.getData(api_read);
            aPromise.then(function(current_data) {

                full_data = current_data;
                if (node_tree === 'clear') {
                    // Overwrite Settings with given json_value
                    full_data = {};
                };

                // console.log('(1) saveAnnotationsData', full_data);


                // Add App tree with app_id to prevent overwriting duplicate 'node_tree' variables
                //full_data.app = full_data.app === undefined ? {} : full_data.app;
                //full_data.app[app_id] = full_data.app[app_id] === undefined ? {} : full_data.app[app_id];
                //full_data.app[app_id][node_tree] = json_value;
                full_data[node_tree] = full_data[node_tree] === undefined ? {} : full_data[node_tree];
                full_data[node_tree] = json_value;

                console.log('(!) saveAnnotationsData', api_direction, full_data);

                // Save and proceed.
                if (api_direction === 'user') {
                    var api_write = dataService.putUserAnnotations(JSON.stringify(full_data));
                } else {
                    var api_write = dataService.putPatientModuleAnnotations(JSON.stringify(full_data));
                    var api_write = dataService.putModuleAnnotations(JSON.stringify(full_data));
                };

                var aPromise = dataService.getData(api_write);
                aPromise.then(function(data) {

                    console.log('(!) saveAnnotationsData - Success', data, return_data);
                    deferred.resolve(return_data);

                }, function(error) {
                    // Error
                    deferred.reject(error);
                    console.log('ERROR: saveAnnotationsData', error);
                });

            });

            return deferred.promise;
        };


        return dataService;


    });
