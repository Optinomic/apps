'use strict';

/**
 * @name Optinomic - App
 * ---------------------------------------
 * Main module of the application.
 */
var app = angular
    .module('optinomicApp', [
        'optinomicDataModule',
        'ngAnimate',
        'ngAria',
        'ngRoute',
        'ngMaterial',
        'angularGrid',
        'chart.js',
        'angularMoment',
        'radian'
    ])
    .run(function($rootScope) {
        $rootScope.safeApply = function(fn) {
            var phase = $rootScope.$$phase;
            if (phase === '$apply' || phase === '$digest') {
                if (fn && (typeof(fn) === 'function')) {
                    fn();
                }
            } else {
                this.$apply(fn);
            }
        };
    })
    .config(function($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            // Allow same origin resource loads.
            'self',
            // Allow loading from outer templates domain.
            'https://rawgit.com/Optinomic/apps/master/lib/**',
            'https://cdn.rawgit.com/Optinomic/apps/master/lib/**',
            'http://apps.optinomic.org/lib/**'
        ]);
    });


/**
 * @name Optinomic - optinomic/data_module
 * ---------------------------------------
 * Give the apps some data & functions.
 */

angular.module('optinomicDataModule', [
    'ngAnimate',
    'ngAria',
    'ngRoute',
    'ngMaterial',
    'angularGrid',
    'chart.js',
    'angularMoment',
    'radian'
]);

angular.module('optinomicDataModule').config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '../lib/html/optinomic/init.html',
            controllerAs: 'ctrl',
            controller: 'AppCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});

angular.module('optinomicDataModule').controller('MainCtrl', function($scope, $filter, dataService, scopeDService, simpleStatistics) {

    // -----------------------------------
    // Init
    // -----------------------------------
    $scope.d = scopeDService;


    console.log('PID / Token', helpers.getPatientID(), helpers.getToken());


    // -----------------------------------
    // General shared Functions - $scope.d
    // -----------------------------------

    $scope.d.functions = {};

    // -----------------------------------------------------------
    // GRID
    // http://www.angulargrid.com/angular-grid-resizing/index.php
    // -----------------------------------------------------------
    $scope.d.functions.resizeGrid = function() {
        console.log('resizeGrid:', $scope.d.gridOptions)
        $scope.d.gridOptions.api.sizeColumnsToFit();
    };

    $scope.d.functions.toggleToolPanel = function() {
        var visible = $scope.d.gridOptions.api.isToolPanelShowing();
        console.log('toggleToolPanel: Visible=', visible, $scope.d.gridOptions)

        if (visible) {
            $scope.d.gridOptions.api.showToolPanel(false);
        } else {
            $scope.d.gridOptions.api.showToolPanel(true);
        };
    };

    // Optinomic - Grip - Functions

    $scope.d.functions.editValueHandler = function(params) {
        //If API-Safe success then update GRID:
        params.data[params.colDef.field] = params.newValue
        console.log('editValueHandler => Save: ', params.colDef.field, params.newValue, params);
    };

    $scope.d.functions.enrichResults = function(surveyResults) {

        surveyResults = surveyResults === undefined ? {} : surveyResults;

        // Loop trough every result
        surveyResults.forEach(function(result) {

            // Iterate through object properties
            for (var property in result) {
                if (result.hasOwnProperty(property)) {

                    //     date_created_sort: $filter("amDateFormat")(date, 'YYYYMMDDHHmm'),
                    //     date_created_week: $filter("amDateFormat")(date, 'YYYY, ww'),
                    //     date_created_day: $filter("amDateFormat")(date, 'dddd, Do MMMM YYYY'),
                    //     date_created_time: $filter("amDateFormat")(date, 'HH:mm'),


                    if ((property === 'datestamp') || (property === 'startdate') || (property === 'submitdate')) {

                        var date = new Date(result[property]);
                        var propertyName = property + '_week';
                        result[propertyName] = $filter("amDateFormat")(date, 'YYYY, ww');
                    };

                }
            };


        });

        console.log('enrichResults :: ', surveyResults);
        return surveyResults;
    };

    $scope.d.functions.createColumnDefs = function(surveyResults, editable) {

        var DataView = [];
        surveyResults = surveyResults === undefined ? {} : surveyResults;
        editable = editable === undefined ? false : editable;


        // Iterate through object properties
        var result = surveyResults[0]
        for (var property in result) {
            if (result.hasOwnProperty(property)) {
                // do stuff
                //console.log('createColumnDefs :: ', property);

                // Set Default
                var line = {
                    headerTooltip: property,
                    headerName: property,
                    editable: editable,
                    cellClass: 'md-body-1',
                    field: property
                };

                // Set newValueHandler if editable
                if (editable) {
                    line.newValueHandler = $scope.d.functions.editValueHandler;
                };

                // Handle some known special properties
                if ((property === 'PID') || (property === 'FID')) {
                    line.hide = true;
                    line.width = 110;
                    line.suppressSizeToFit = true;
                };

                if ((property === 'datestamp') || (property === 'startdate') || (property === 'submitdate')) {
                    line.width = 145;
                    line.suppressSizeToFit = true;
                };


                if ((property === 'optinomixHASH') || (property === 'ipaddr') || (property === 'refurl') || (property === 'id')) {
                    line.width = 110;
                    line.hide = true;
                };

                if ((property === 'startlanguage') || (property === 'survey_name') || (property === 'lastpage') || (property === 'datestamp') || (property === 'submitdate')) {
                    line.hide = true;
                };

                // Push Line to Return-Array
                DataView.push(line);

            }
        };

        // Loop trough every result
        // surveyResults.forEach(function(result) {
        // });

        // var line = {
        //     source: 'Talks',
        //     room: scope.d.roomID,
        //     done: false,
        //     date_created: date.toString(),
        //     date_created_sort: $filter("amDateFormat")(date, 'YYYYMMDDHHmm'),
        //     date_created_week: $filter("amDateFormat")(date, 'YYYY, ww'),
        //     date_created_day: $filter("amDateFormat")(date, 'dddd, Do MMMM YYYY'),
        //     date_created_time: $filter("amDateFormat")(date, 'HH:mm'),
        //     from_uid: parseInt(sessionService.getUserID()),
        //     to_user_id: null,
        //     to_user_role: null,
        //     to_patient_id: parseInt($routeParams.pid),
        //     to_patient_group: null,
        //     text: null,
        //     answer: {},
        //     icon: 'mdi-comment-text-outline'
        // };

        console.log('createColumnDefs :: ', DataView);
        return DataView;
    };


    // -----------------------------------
    // Data: Get Calculations 
    // -----------------------------------

    $scope.d.functions.getCalculation = function(calc_name) {

        var call = dataService.getAppCalculations(calc_name);

        call.success(function(data) {
            // Save Data to $scope.d
            $scope.d.calculations = $scope.d.calculations === undefined ? {} : $scope.d.calculations;
            $scope.d.calculations[calc_name] = data;
            console.log('(DATA): getAppCalculation: ', calc_name, data);
        });
        call.error(function(data) {
            console.log('(ERROR): getAppCalculations:', calc_name, data);
        });
    };




});
