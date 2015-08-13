'use strict';

/**
 * Service for getting Data from API
 */
angular.module('optinomicDataModule')
    .service('dataService', function() {


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


        return dataService;


    });
