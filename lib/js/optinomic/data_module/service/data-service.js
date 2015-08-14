'use strict';

/**
 * Service for getting Data from API
 */
angular.module('optinomicDataModule')
    .service('dataService', function($q, apiService) {


        var dataService = {};

        // -------------------------------------------------------------------------
        // API - Functions
        // -------------------------------------------------------------------------

        dataService.getSurveyResponses = function(app_identifier) {
            return apiService.get("/patients/" + helpers.getPatientID() + "/survey_responses/" + app_identifier, {});
        };


        dataService.getAppCalculations = function(app_identifier, calculation_identifier) {
            return apiService.get("/patients/" + helpers.getPatientID() + "/calculations/" + app_identifier + "/" + calculation_identifier, {});
        };


        dataService.getConfig = function() {
            return apiService.get("/extra_config", {});
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




        // -------------------------------------------------------------------------
        // Main - Functions
        // -------------------------------------------------------------------------

        dataService.getMainAppData = function(app_identifier) {

            // Actions
            var actions = 2;
            var actions_count = 0;

            // Init
            var deferred = $q.defer();
            var api = '';
            var return_data = {};
            return_data.identifier = app_identifier;

            // ------------------------------------------------
            // Action 1:  Survey Responses
            // ------------------------------------------------

            api = dataService.getSurveyResponses(app_identifier);
            var aSurveyResponses = dataService.getData(api);

            aSurveyResponses.then(function(data) {
                return_data.survey_responses = data.survey_responses;

                // Deferred when done.
                actions_count = actions_count + 1;
                if (dataService.checkSuccess(actions, actions_count)) {
                    console.log('==> deferred', return_data);
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
                return_data.config = data;

                // Deferred when done.
                actions_count = actions_count + 1;
                if (dataService.checkSuccess(actions, actions_count)) {
                    console.log('==> deferred', return_data);
                    deferred.resolve(return_data);
                };

            }, function(error) {
                // Error
                deferred.reject(return_data);
                console.log('-- Error:', error);
            });

            return deferred.promise;
        };



        return dataService;


    });
