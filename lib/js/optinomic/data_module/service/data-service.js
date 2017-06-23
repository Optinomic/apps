'use strict';

/**
 * Service for getting Data from API
 */
angular.module('optinomicDataModule')
    .service('dataService', function($q, $filter, $window, apiService) {


        var dataService = {};

        // -------------------------------------------------------------------------
        // API - Functions
        // -------------------------------------------------------------------------

        dataService.getUser = function(userID) {
            return apiService.get("/users/" + userID, {});
        };

        dataService.getUsers = function() {
            return apiService.get("/users", {});
        };

        dataService.getSurveyResponses = function(stay_id, app_identifier) {
            stay_id = stay_id === NaN ? 0 : stay_id;
            app_identifier = app_identifier === undefined ? helpers.getAppID() : app_identifier;

            var have_stay = false;
            if (stay_id > 0) {
                have_stay = true;
            };

            if (have_stay) {
                var api_call = "/stays/" + stay_id + "/survey_responses/" + app_identifier;
            } else {
                var api_call = "/patients/" + helpers.getPatientID() + "/survey_responses/" + app_identifier;
            };

            // console.log('(! API) - getSurveyResponses: ', stay_id, have_stay, api_call);
            return apiService.get(api_call, {});
        };

        dataService.getAppCalculations = function(calculation_identifier, app_identifier) {
            app_identifier = app_identifier === undefined ? helpers.getAppID() : app_identifier;
            return apiService.get("/patients/" + helpers.getPatientID() + "/calculations/" + app_identifier + "/" + calculation_identifier, {});
        };

        dataService.getAppCalculationsUser = function(app_identifier, my_calculation_identifier) {
            app_identifier = app_identifier === undefined ? helpers.getAppID() : app_identifier;
            return apiService.get("/calculations/" + app_identifier + "/" + my_calculation_identifier, {});
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


        dataService.runDataSource = function(my_query, my_source, my_delimiter, my_including_headers, my_format, my_direct) {
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

            var api_str = "/data_sources/" + my_source + "/query";

            console.log('(!) runDataSource: ', api_str, body);
            return apiService.post(api_str, body);
        };


        dataService.runView = function(module_identifier, view_name, body_params) {
            // https://doc.optinomic.org/V2/Developers/api.html#post-modulesmoduleidentifierrunviewviewname
            module_identifier = module_identifier === undefined ? '' : module_identifier;
            view_name = view_name === undefined ? '' : view_name;
            body_params = body_params === undefined ? {} : body_params;

            var api_str = "/modules/" + module_identifier + "/run_view/" + view_name;

            console.log('(!) runView: ', module_identifier, view_name, body_params);
            return apiService.post(api_str, body_params);
        };

        dataService.getAppViews = function(module_identifier) {
            // https://doc.optinomic.org/V2/Developers/api.html#get-modulesmoduleidentifiersqlviews

            module_identifier = module_identifier === undefined ? '' : module_identifier;
            var api_str = "/modules/" + module_identifier + "/sql_views";

            //console.log('(!) getAppViews: ', api_str);
            return apiService.get(api_str, {});
        };


        dataService.getAllApps = function() {
            return apiService.get("/modules", {});
        };

        dataService.getPatient = function(PID) {
            PID = PID === undefined ? helpers.getPatientID() : PID;
            return apiService.get("/patients/" + PID, {});
        };

        dataService.getPatientStays = function(PID) {
            PID = PID === undefined ? helpers.getPatientID() : PID;
            return apiService.get("/patients/" + PID + "/stays", {});
        };


        dataService.getCurrentPatient = function() {
            return apiService.get("/patients/" + helpers.getPatientID() + "/full", {});
        };

        dataService.getPatientEvents = function(PID) {
            PID = PID === undefined ? helpers.getPatientID() : PID;
            return apiService.get("/patients/" + PID + "/events", {});
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
            // GET annotations on a module and a patient in particular

            var patient_id = dataService.getPatientID();
            var module_identifier = dataService.getAppID();

            var apiStr = '/patients/' + patient_id + '/modules/' + module_identifier + '/annotations';
            return apiService.get(apiStr, {});
        };

        dataService.getAllPatientsModuleAnnotations = function() {
            // to get the annotations of the above endpoint for ALL patients.

            var module_identifier = dataService.getAppID();

            var apiStr = '/modules/' + module_identifier + '/patient_annotations';
            return apiService.get(apiStr, {});
        };


        dataService.putPatientModuleAnnotations = function(json_value, patient_id, module_identifier) {
            // PUT annotations on a module and a patient in particular

            patient_id = patient_id === undefined ? dataService.getPatientID() : patient_id;
            module_identifier = module_identifier === undefined ? dataService.getAppID() : module_identifier;

            var apiStr = '/patients/' + patient_id + '/modules/' + module_identifier + '/annotations';
            var body = {
                "value": json_value
            };

            //console.log('(Debug) putPatientModuleAnnotations', apiStr, body, json_value);
            return apiService.put(apiStr, body);
        };


        dataService.getModuleAnnotations = function(module_identifier) {
            // GET annotations on modules, nothing to do with patients here

            module_identifier = module_identifier === undefined ? dataService.getAppID() : module_identifier;

            var apiStr = '/modules/' + module_identifier + '/annotations';
            return apiService.get(apiStr, {});
        };

        dataService.putModuleAnnotations = function(json_value, module_identifier) {
            // PUT annotations on modules, nothing to do with patients here

            module_identifier = module_identifier === undefined ? dataService.getAppID() : module_identifier;

            var apiStr = '/modules/' + module_identifier + '/annotations';
            var body = {
                "value": json_value
            };
            return apiService.put(apiStr, body);
        };

        dataService.getPatientList = function(myParams) {

            myParams = myParams === undefined ? {} : myParams;

            var apiStr = "/patients";

            var body = {
                gender: myParams.gender,
                city: myParams.city,
                zip_code: myParams.zip_code,
                age_over: myParams.age_over,
                age_under: myParams.age_under,
                in_stay: myParams.in_stay,
                lead_therapist: myParams.lead_therapist,
                cis_lead_doctor: myParams.cis_lead_doctor,
                stay_start_before: myParams.stay_start_before,
                stay_start_after: myParams.stay_start_after,
                stay_stop_before: myParams.stay_stop_before,
                stay_stop_after: myParams.stay_stop_after
            };

            return apiService.get(apiStr, body);
        };

        dataService.getStays = function(mypid) {
            return apiService.get("/patients/" + mypid + "/stays", {});
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

        dataService.getStayID = function() {
            return parseInt(helpers.getStayID());
        };

        dataService.getData = function(api_call) {
            var deferred = $q.defer();

            api_call.success(function(data) {
                deferred.resolve(data);
                //console.log('===> Success - getData   ', data, deferred);
            });
            api_call.error(function(error) {
                deferred.reject(error);
                console.log('===> APP-ERROR! getData @ ', error, api_call);

                // Retry:
                $window.location.reload();
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

            patient.extras.anrede = patient.ansprache + ' ' + patient.last_name;

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

        dataService.createStayExtras = function(current_pid, current_stay) {

            current_stay.url = '#/patient/' + current_pid + '/stay/' + current_stay.id;
            current_stay.url_edit = current_stay.url + '/edit';

            // Calculate - Duration of the stay
            if (current_stay.data.stop) {
                current_stay.duration = Math.floor((Date.parse(current_stay.data.stop) - Date.parse(current_stay.data.start)) / 86400000);
                current_stay.duration = current_stay.duration + 2; //incl. start & stop date
            } else {
                current_stay.duration = Math.floor((new Date() - Date.parse(current_stay.data.start)) / 86400000);
            }

            // from_to
            current_stay.from_to = $filter('date')(current_stay.data.start);
            current_stay.from_to = current_stay.from_to + ' - ';
            if (current_stay.data.stop) {
                current_stay.from_to = current_stay.from_to + $filter('date')(current_stay.data.stop);
            } else {
                current_stay.from_to = current_stay.from_to + 'Unbekannt';
            }

            // set stay-icon
            current_stay.icon = 'chevron-right';
            if (current_stay.data.phase === 'before_stay') {
                current_stay.icon = 'mdi-timer-sand';
            }
            if (current_stay.data.phase === 'in_stay') {
                current_stay.icon = 'mdi-check';
            }
            if (current_stay.data.phase === 'after_exit') {
                current_stay.icon = 'mdi-timelapse';
            }
            if (current_stay.data.phase === 'frozen') {
                current_stay.icon = 'mdi-lock';
            }
            if (current_stay.data.phase === 'complete') {
                current_stay.icon = 'mdi-check-all';
            }
            if (current_stay.data.phase === 'unfrozen') {
                current_stay.icon = 'mdi-lock-open';
            }

            // set Team

            current_stay.team = {};
            current_stay.team.lead_therapist = null;
            current_stay.team.lead_therapist_deputy = null;
            current_stay.team.lead_doctor = null;

            if (current_stay.data.lead_therapist_id_overwrite) {
                dataService.getUser(current_stay.data.lead_therapist_id_overwrite).success(function(data) {
                    current_stay.team.lead_therapist = data.user;
                });
            } else {
                if (current_stay.data.lead_therapist_id) {
                    dataService.getUser(current_stay.data.lead_therapist_id).success(function(data) {
                        current_stay.team.lead_therapist = data.user;
                    });
                };
            };

            if (current_stay.data.deputy_lead_therapist_id) {
                dataService.getUser(current_stay.data.deputy_lead_therapist_id).success(function(data) {
                    current_stay.team.lead_therapist_deputy = data.user;
                });
            };

            if (current_stay.data.cis_lead_doctor) {
                dataService.getUser(current_stay.data.cis_lead_doctor).success(function(data) {
                    current_stay.team.lead_doctor = data.user;
                });
            };



            return current_stay;
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

        dataService.sortByKey = function(array, key, order) {

            order = order === undefined ? 'asc' : order;
            console.log('sortByKey: ', array, key, order);

            return array.sort(function(a, b) {
                var x = a[key];
                var y = b[key];

                if (order === 'asc') {
                    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                } else {
                    return ((x < y) ? 1 : ((x > y) ? -1 : 0));
                };
            });
        };


        dataService.sortOn = function(arr, prop, reverse, numeric) {

            // Ensure there's a property
            if (!prop || !arr) {
                return arr
            }

            // Set up sort function
            var sort_by = function(field, rev, primer) {

                // Return the required a,b function
                return function(a, b) {

                    // Reset a, b to the field
                    a = primer(a[field]), b = primer(b[field]);

                    // Do actual sorting, reverse as needed
                    return ((a < b) ? -1 : ((a > b) ? 1 : 0)) * (rev ? -1 : 1);
                }

            }

            // Distinguish between numeric and string to prevent 100's from coming before smaller
            // e.g.
            // 1
            // 20
            // 3
            // 4000
            // 50

            if (numeric) {

                // Do sort "in place" with sort_by function
                arr.sort(sort_by(prop, reverse, function(a) {

                    // - Force value to a string.
                    // - Replace any non numeric characters.
                    // - Parse as float to allow 0.02 values.
                    return parseFloat(String(a).replace(/[^0-9.-]+/g, ''));

                }));
            } else {

                // Do sort "in place" with sort_by function
                arr.sort(sort_by(prop, reverse, function(a) {

                    // - Force value to string.
                    return String(a).toUpperCase();

                }));
            }
        }

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


        // --------------------------------------------------
        // Get Current View
        // --------------------------------------------------
        dataService.getCurrentView = function() {
            var return_obj = {};

            return_obj.url = $window.location.pathname;
            return_obj.viewname = return_obj.url.substring(return_obj.url.lastIndexOf('/') + 1);

            return return_obj;
        };


        // -------------------------------------------------------------------------
        // Main - Functions
        // -------------------------------------------------------------------------

        dataService.getMainAppData = function(app_identifier, full) {

            app_identifier = app_identifier === undefined ? dataService.getAppID() : app_identifier;
            full = full === undefined ? true : full;


            // Actions
            var actions = 7;
            var actions_count = 0;

            // Init
            var deferred = $q.defer();
            var api = '';
            var return_data = {};


            function isArray(object) {
                if (object.constructor === Array) return true;
                else return false;
            };

            // ------------------------------------------------
            // Get Params from Helper Functions
            // ------------------------------------------------
            return_data.identifier = app_identifier;

            var stay_id = dataService.getStayID();
            stay_id = stay_id === NaN ? 0 : stay_id;
            var have_stay = false;
            if (stay_id > 0) {
                have_stay = true;
            };

            return_data.params = {};
            return_data.params.PID = dataService.getPatientID();
            return_data.params.userID = dataService.getUserID();
            return_data.params.token = dataService.getToken();
            return_data.params.app_name = dataService.getAppName();
            return_data.params.app_id = app_identifier;
            return_data.params.stay_id = stay_id;
            return_data.params.have_stay = have_stay;
            return_data.params.api_url = dataService.getApiURL();

            return_data.params.location = dataService.getCurrentView();

            //console.log('Parameters', return_data.params);



            // ------------------------------------------------
            // Action 1:  Survey Responses
            // ------------------------------------------------

            api = dataService.getSurveyResponses(dataService.getStayID(), app_identifier);
            var aSurveyResponses = dataService.getData(api);

            aSurveyResponses.then(function(data) {

                //console.log('(!) - getSurveyResponses: ', data);

                // All Responses
                var responses = data.survey_responses;

                // Sort 
                var sortByFilled = function(array) {
                    return array.sort(function(a, b) {
                        var x = a.entity.data.filled;
                        var y = b.entity.data.filled;
                        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                    });
                };
                responses = sortByFilled(responses);

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


            if (full) {
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
            } else {
                actions_count = actions_count + 1;
            };




            // ------------------------------------------------
            // Action 3:  Get current App Info
            // ------------------------------------------------
            api = dataService.getAllApps();
            var aApps = dataService.getData(api);

            aApps.then(function(data) {
                var myApp = {};

                myApp.all_user_modules = data.user_modules;
                myApp.all_patient_modules = data.patient_modules;

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
                                // console.log('User App - Calculation: ', current_app.identifier, calculatons)
                                api = dataService.getAppCalculationsUser(current_app.identifier, calculatons);
                            } else {
                                // console.log('Patient App - Calculation: ', current_app.identifier, calculatons)
                                api = dataService.getAppCalculations(calculatons, current_app.identifier);
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
                                    var all_results_valid = isArray(all_results);


                                    if (all_results_valid) {

                                        if ('survey_responses' in return_data !== undefined) {
                                            return_data.survey_responses.forEach(function(response, myindex) {
                                                // console.log('(+) LOOP - survey_responses: ', response, all_results);
                                                var inner_calculations = [];

                                                all_results.forEach(function(current_result, myindex) {

                                                    var variant_new = false;
                                                    if ("info" in current_result) {
                                                        if ("response" in current_result.info) {
                                                            variant_new = true;
                                                        };
                                                    };

                                                    // console.log('(+) Compare: ', variant_new, current_result, response.entity.data.response);

                                                    if (variant_new) {
                                                        if (JSON.stringify(current_result.info.response) === JSON.stringify(response.entity.data.response)) {
                                                            var myResult = current_result;
                                                            // console.log('(+) EQUAL: ', current_result);

                                                            var objectToPush = {
                                                                'calculation_name': calculatons,
                                                                'calculation_result': myResult,
                                                                'calculated_datestamp': date,
                                                                'calculated_date': $filter("amDateFormat")(date, 'DD.MM.YYYY'),
                                                                'calculated_time': $filter("amDateFormat")(date, 'HH:mm')
                                                            };
                                                            inner_calculations.push(objectToPush);
                                                        };
                                                    } else {
                                                        if (JSON.stringify(current_result.response.data.response) === JSON.stringify(response.entity.data.response)) {
                                                            var myResult = current_result;
                                                            // console.log('(+) EQUAL: ', current_result);

                                                            var objectToPush = {
                                                                'calculation_name': calculatons,
                                                                'calculation_result': myResult,
                                                                'calculated_datestamp': date,
                                                                'calculated_date': $filter("amDateFormat")(date, 'DD.MM.YYYY'),
                                                                'calculated_time': $filter("amDateFormat")(date, 'HH:mm')
                                                            };
                                                            inner_calculations.push(objectToPush);
                                                        };
                                                    };


                                                });
                                                response.calculations = inner_calculations;
                                            });
                                        };
                                    } else {
                                        console.log('(ERROR) Calculation - Debug: ', all_results);
                                    };
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

            if (full) {
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
            } else {
                actions_count = actions_count + 1;
            };


            // ------------------------------------------------
            // Action 5:  Patient Events
            // ------------------------------------------------
            if (full) {
                if (parseInt(helpers.getPatientID()) === 0) {
                    actions_count = actions_count + 1;
                } else {
                    api = dataService.getPatientEvents(helpers.getPatientID());
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
            } else {
                actions_count = actions_count + 1;
            };


            // ------------------------------------------------
            // Action 6:  All Users
            // ------------------------------------------------
            if (full) {
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
            } else {
                actions_count = actions_count + 1;
            };


            // ------------------------------------------------
            // Action 7:  Patient-Groups
            // ------------------------------------------------
            if (full) {
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
            } else {
                actions_count = actions_count + 1;
            };


            return deferred.promise;
        };


        dataService.getPatientsStays = function(patientListFilter) {

            // Init - Params
            var patientListFilterDefault = {
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

            patientListFilter = patientListFilter === undefined ? patientListFilterDefault : patientListFilter;


            // Actions
            var actions = 1;
            var actions_count = 0;

            // Init
            var deferred = $q.defer();
            var api = '';
            var return_data = {};


            // ------------------------------------------------
            // Action 1:  Get Patient List
            // ------------------------------------------------

            api = dataService.getPatientList(patientListFilter);
            var aPatients = dataService.getData(api);

            aPatients.then(function(data) {
                //console.log('1: Patients', data);

                // All Responses
                var patients = data.patients;

                patients.forEach(function(patient, my_patient_index) {

                    patient.data.pid = patient.id;
                    patient.data = dataService.createPatientExtras(patient.data);
                    //console.log('--: Patient', my_patient_index, patient);


                    // ------------------------------------------------
                    // Action 1a:  Get Stays from Patient
                    // ------------------------------------------------
                    actions = actions + 1;
                    api = dataService.getStays(patient.id);
                    var aStays = dataService.getData(api);

                    aStays.then(function(stays_data) {
                        var my_stays = stays_data.stays;
                        my_stays.forEach(function(my_stay, my_stay_index) {
                            my_stay = dataService.createStayExtras(patient.id, my_stay);
                            //console.log('--: Stay', my_stay_index, my_stay);

                        });
                        patient.data.stays = my_stays;

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

                actions_count = actions_count + 1;
                return_data.patients = patients;


            }, function(error) {
                // Error
                deferred.reject(return_data);
                console.log('-- Error:', error);
            });


            return deferred.promise;
        };


        dataService.getFulfillmentData = function(app_identifier, patientListFilter) {

            // Init - Params
            var patientListFilterDefault = {
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

            app_identifier = app_identifier === undefined ? 'ch.suedhang.apps.honos' : app_identifier;
            patientListFilter = patientListFilter === undefined ? patientListFilterDefault : patientListFilter;


            // Actions
            var actions = 2;
            var actions_count = 0;

            // Init
            var deferred = $q.defer();
            var api = '';
            var return_data = {};


            // ------------------------------------------------
            // Action 1:  Get Patient List
            // ------------------------------------------------

            api = dataService.getPatientList(patientListFilter);
            var aPatients = dataService.getData(api);

            aPatients.then(function(data) {
                //console.log('1: Patients', data);

                // All Responses
                var patients = data.patients;

                patients.forEach(function(patient, my_patient_index) {

                    patient.data.pid = patient.id;
                    patient.data = dataService.createPatientExtras(patient.data);
                    //console.log('--: Patient', my_patient_index, patient);


                    // ------------------------------------------------
                    // Action 1a:  Get Stays from Patient
                    // ------------------------------------------------
                    actions = actions + 1;
                    api = dataService.getStays(patient.id);
                    var aStays = dataService.getData(api);

                    aStays.then(function(stays_data) {
                        var my_stays = stays_data.stays;
                        my_stays.forEach(function(my_stay, my_stay_index) {
                            my_stay = dataService.createStayExtras(patient.id, my_stay);
                            //console.log('--: Stay', my_stay_index, my_stay);

                        });
                        patient.data.stays = my_stays;

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
                    // Action 2a:  Get Events from Patient
                    // ------------------------------------------------
                    actions = actions + 1;
                    api = dataService.getPatientEvents(patient.id);
                    var aEvents = dataService.getData(api);

                    aEvents.then(function(events_data) {
                        var my_events = events_data.events;
                        var my_events_module = [];
                        my_events.forEach(function(my_event, my_event_index) {
                            //console.log('--: Event', my_event_index, my_event);

                            if (my_event.data.module === app_identifier) {
                                my_events_module.push(my_event);
                            };
                        });

                        patient.data.events = {
                            "all": my_events,
                            "current_module": my_events_module
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

                actions_count = actions_count + 1;
                return_data.patients = patients;


                // Group Responses by survey_name
                //return_data.survey_responses_group = dataService.groupBy(responses, function(item) {
                //    return [item.event.survey_name];
                //});


            }, function(error) {
                // Error
                deferred.reject(return_data);
                console.log('-- Error:', error);
            });


            // ------------------------------------------------
            // Action 2:  Get Survey Responses
            // ------------------------------------------------

            // Querys
            var app_query = "SELECT sr.id as survey_response_id, srf.module as module,sr.response, sr.event_id, sr.filled, ev.patient as patient_id,first(s.id) as stay_id FROM survey_responses as sr LEFT JOIN survey_response as srf on sr.id = srf.id LEFT JOIN event as ev on ev.id = sr.event_id LEFT JOIN stay as s on s.patient = ev.patient and s.start <= ev.created_at and (s.stop >= ev.created_at or s.stop is null) WHERE srf.module = '%module_id%' GROUP BY sr.id, srf.module, sr.response, sr.event_id, sr.filled, ev.patient";
            app_query = app_query.replace("%module_id%", app_identifier);
            console.log('Action 2:', app_query);


            var sql = {};
            sql.delimitter = ';';
            sql.including_headers = 'True';
            sql.format = 'json';
            sql.direct = 'True';


            api = dataService.runSQL(app_query, sql.delimitter, sql.including_headers, sql.format, sql.direct);
            var aSQL = dataService.getData(api);

            aSQL.then(function(data) {

                var returned_survey_responses = [];
                data.rows.forEach(function(response, myindex) {
                    response.event_id = parseInt(response.event_id);
                    response.patient_id = parseInt(response.patient_id);
                    response.stay_id = parseInt(response.stay_id);
                    response.survey_response_id = parseInt(response.survey_response_id);
                    response.response = JSON.parse(response.response);

                    returned_survey_responses.push(response);
                });

                return_data.survey_responses = returned_survey_responses;

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

            function isArray(object) {
                if (object.constructor === Array) return true;
                else return false;
            }

            if (api_direction === 'user') {
                var api = dataService.getUserAnnotations();
            } else {
                var api = dataService.getPatientModuleAnnotations();
            };


            var aPromise = dataService.getData(api);
            aPromise.then(function(data) {
                    var return_array = [];

                    return_data = data[node_tree] === undefined ? [] : data[node_tree];
                    return_data = JSON.parse(JSON.stringify(return_data));
                    // console.log('(!) getAnnotationsData - Success', data, node_tree, return_data);

                    // Loop return_data and return just data per stay / all if !have_stay.

                    var stay_id = dataService.getStayID();
                    stay_id = stay_id === NaN ? 0 : stay_id;
                    var have_stay = false;
                    if (stay_id > 0) {
                        have_stay = true;
                    };

                    //console.log('(?) ---> ', stay_id, return_data);

                    if (return_data.length > 0) {
                        return_data.forEach(function(item, myindex) {

                            if (item.stay === stay_id) {
                                console.log('(GET) ---> ', item, myindex);
                                return_array = item.data;
                            };

                            if (have_stay === false) {

                                if (isArray(item.data)) {
                                    if (item.data.length > 0) {
                                        item.data.forEach(function(inner_item, myindex) {
                                            //console.log('(Pushed) ---> ', inner_item, item, myindex);
                                            return_array.push(inner_item);
                                        });
                                    };
                                } else {
                                    // Get Last - Object (ToDo)
                                    return_array.push(item.data);
                                };

                            };

                        });
                    };

                    console.log('(!) getAnnotationsData - Return:', node_tree, return_array);
                    deferred.resolve(return_array);

                },
                function(error) {
                    // Error
                    deferred.reject(return_array);
                    console.log('ERROR: getAnnotationsData', error);
                });

            return deferred.promise;
        };

        dataService.saveAnnotationsData = function(api_direction, node_tree, json_value) {

            json_value = json_value === undefined ? {} : json_value;

            var deferred = $q.defer();
            var return_data = {};
            var full_data = {};
            var app_id = dataService.getAppID();



            //console.log('(START) saveAnnotationsData', api_direction, node_tree, json_value);

            function isArray(object) {
                if (object.constructor === Array) return true;
                else return false;
            }

            function getSaveStamp() {
                var save_stamp = {};
                save_stamp.getPatientID = dataService.getPatientID();
                save_stamp.getAppName = dataService.getAppName();
                save_stamp.getAppID = dataService.getAppID();
                save_stamp.getApiURL = dataService.getApiURL();
                save_stamp.getUserID = dataService.getUserID();
                save_stamp.getStayID = dataService.getStayID();

                var date = new Date();
                save_stamp.date = {
                    'saved_datestamp': date,
                    'saved_date': $filter("amDateFormat")(date, 'DD.MM.YYYY'),
                    'saved_time': $filter("amDateFormat")(date, 'HH:mm')
                };

                return save_stamp;
            }


            // Check json_value and enhance with save_stamp
            // Add and save - save_stamp if needed | array.
            if (isArray(json_value)) {
                json_value.forEach(function(item, myindex) {
                    if ((item.save_stamp === undefined) || (item.save_stamp === NaN)) {
                        // Add / Save a 'save stamp' - used to identify stay
                        item.save_stamp = getSaveStamp();
                    }
                });
            } else {
                json_value.save_stamp = getSaveStamp();
            };


            var stay_id = dataService.getStayID();
            stay_id = stay_id === NaN ? 0 : stay_id;

            var data_model = {
                "stay": stay_id,
                "data": json_value
            };

            //console.log('(!) saveAnnotationsData - data_model', data_model);


            // Patient or User Annotation
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
                full_data[node_tree] = full_data[node_tree] === undefined ? [] : full_data[node_tree];

                // Do not overwrite if only a specific stay - data is set
                var data_saved = false;
                full_data[node_tree].forEach(function(item, myindex) {
                    if (item.stay === stay_id) {
                        item.data = data_model.data;
                        data_saved = true;
                    };
                });
                if (data_saved === false) {
                    full_data[node_tree].push(data_model);
                };

                // console.log('(!) saveAnnotationsData - 2', api_direction, full_data[node_tree]);

                // --------------------------------------------
                // Save and proceed.
                // --------------------------------------------
                if (api_direction === 'user') {
                    //var api_write = dataService.putUserAnnotations(JSON.stringify(full_data));
                    var api_write = dataService.putUserAnnotations(angular.toJson(full_data));
                    //var api_write = dataService.putUserAnnotations(full_data);

                } else {
                    //var api_write = dataService.putPatientModuleAnnotations(JSON.stringify(full_data));
                    var api_write = dataService.putPatientModuleAnnotations(angular.toJson(full_data));
                    //var api_write = dataService.putPatientModuleAnnotations(full_data);
                };



                var aPromise = dataService.getData(api_write);
                aPromise.then(function(data) {

                    console.log('(✓) saveAnnotationsData =', full_data);
                    deferred.resolve(return_data);

                }, function(error) {
                    // Error
                    deferred.reject(error);
                    console.log('ERROR: saveAnnotationsData', error);
                });

            });

            return deferred.promise;
        };

        dataService.getAppJSON = function(grid_node) {

            var deferred = $q.defer();
            var return_data = {};

            var api = dataService.getModuleAnnotations();
            var aGrid = dataService.getData(api);

            aGrid.then(function(data) {
                //console.log('(!) getGrid - START: ', data);


                // Set Filter
                if ((dataService.isEmpty(data)) || (dataService.isEmpty(data[grid_node]))) {
                    return_data = null;
                    //console.log('(!) get default grid for user ', user_id);
                } else {

                    data[grid_node] = data[grid_node] === undefined ? {} : data[grid_node];
                    //console.log('(?) GRID ', grid_node, grid[grid_node])


                    if (dataService.isEmpty(data[grid_node])) {
                        return_data = null;
                        //console.log('(!) get fresh user Grid: ', grid_node, cloneDefault);
                    } else {
                        // Take stored Data.
                        return_data = data[grid_node];
                    };

                    // return_data = JSON.parse(returnArray);
                    // return_data = returnArray;
                    // return_data.grid = annotationsService.sortByKey(grid, 'sort');
                    // return_data.node = grid_node;

                };

                //console.info(JSON.stringify(return_data));
                //console.log('(Grid) ', grid_node, ' loaded: ', return_data);

                deferred.resolve(return_data);

            }, function(error) {
                // Error
                deferred.reject(return_data);
                console.log('(ERROR) getAppJSON', error);
            });

            return deferred.promise;
        };

        dataService.putAppJSON = function(node_tree, json_value) {

            console.log('(?) putJSON', node_tree, json_value);

            var deferred = $q.defer();
            var return_data = {};


            var api = dataService.getModuleAnnotations();
            var allAnnotations = dataService.getData(api);

            allAnnotations.then(function(data) {

                var full_data = angular.copy(data);
                //console.log('(?) 1', full_data);

                full_data[node_tree] = json_value;
                //console.log('(?) 2', full_data);

                var my_full_json = JSON.stringify(full_data);
                var api = dataService.putModuleAnnotations(my_full_json);

                api.success(function(data) {
                    console.log('(+) Saved: ', full_data);
                    //annotationsService.showToast('Erfolgreich gespeichert  |  Successfully saved!');
                    deferred.resolve(full_data[node_tree]);
                });

                api.error(function(error) {
                    alert("(ERROR) putAppJSON" + error);
                });

            });

            return deferred.promise;
        };

        dataService.saveData = (function() {
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.setAttribute('style', "display: none");
            // a.style = "display: none";
            return function(data, fileName) {
                var json = JSON.stringify(data),
                    blob = new Blob([json], { type: "octet/stream" }),
                    url = window.URL.createObjectURL(blob);
                a.href = url;
                a.download = fileName;
                a.click();
                window.URL.revokeObjectURL(url);
            };
        }());



        return dataService;


    });
