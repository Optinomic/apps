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



        // -------------------------------------------------------------------------
        // Main - Functions
        // -------------------------------------------------------------------------

        dataService.getMainAppData = function(app_identifier) {

            // Actions
            var actions = 1;
            var actions_count = 0;

            // Init
            var deferred = $q.defer();
            var return_data = {};
            var api = '';


            // ------------------------------------------------
            // Action 1:  Patients
            // ------------------------------------------------

            api = dataService.getSurveyResponses(app_identifier);
            var aSurveyResponses = dataService.getData(api);

            aSurveyResponses.then(function(data) {
                var survey_responses = data;
                return_data.survey_responses = survey_responses;

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
