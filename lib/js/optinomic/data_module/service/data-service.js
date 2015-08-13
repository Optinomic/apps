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


        // -------------------------------------------------------------------------
        // Main - Functions
        // -------------------------------------------------------------------------

        dataService.getMainAppData = function(app_identifier) {

            var deferred = $q.defer();

            // Actions
            var actions = 1;
            var actions_count = 0;

            var return_data = {};


            // ------------------------------------------------
            // Action 1:  Patients
            // ------------------------------------------------

            api = patientsService.getPatients();
            var aSurveyResponses = getDataService.getSurveyResponses('com.optinomic.apps.craving');
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
