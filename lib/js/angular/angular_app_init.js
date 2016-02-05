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
        'agGrid',
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
            'https://rawgit.com/Optinomic/apps/**',
            'https://cdn.rawgit.com/Optinomic/apps/**',
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
    'agGrid',
    'chart.js',
    'angularMoment',
    'radian'
]);



angular.module('optinomicDataModule').config(function($routeProvider) {
    $routeProvider
        .when('/', {
            controllerAs: 'ctrl',
            controller: 'AppCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });

});





// -----------------------
// Filters
// -----------------------
angular.module('optinomicDataModule').filter('dateToAge', function() {
    return function(input, arg) {
        var today = new Date();
        var birthDate = new Date(input);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    };
});


angular.module('optinomicDataModule').filter('date', function() {
    return function(input, arg) {
        var new_date = new Date(input);
        return new_date.toLocaleDateString();
    };
});




angular.module('optinomicDataModule').controller('MainCtrl', function($scope, $filter, $mdToast, dataService, scopeDService, simpleStatistics) {

    // -----------------------------------
    // Init
    // -----------------------------------
    $scope.d = scopeDService;

    if (parseInt(helpers.getPatientID()) === 0) {
        console.log('User-App: Token=', helpers.getToken());
        $scope.d.app_type = 'user';
    } else {
        console.log('Patient-App: PID=', parseInt(helpers.getPatientID()), ' Token=', helpers.getToken());
        $scope.d.app_type = 'patient';
    };


    // -----------------------------------
    // General shared Functions - $scope.d
    // -----------------------------------

    $scope.d.functions = {};


    // -----------------------------------------------------------
    // Init / Done
    // -----------------------------------------------------------
    $scope.d.functions._InitData = function(source, received) {
        $scope.d._init = $scope.d._init === undefined ? {} : $scope.d._init;
        $scope.d._init[source] = received;
    };
    $scope.d.functions._InitData('dataMain', false);
    $scope.d.functions._InitData('calculations', false);


    // -----------------------------------------------------------
    // GRID
    // http://www.angulargrid.com/angular-grid-resizing/index.php
    // -----------------------------------------------------------
    $scope.d.functions.resizeGrid = function() {
        console.log('resizeGrid:', $scope.d.grid.options)
        $scope.d.grid.options.api.sizeColumnsToFit();
    };

    $scope.d.functions.refreshView = function() {
        console.log('refreshView:', $scope.d.grid.options)
        $scope.d.grid.options.api.refreshView();
    };

    $scope.d.functions.toggleToolPanel = function() {
        var visible = $scope.d.grid.options.api.isToolPanelShowing();
        console.log('toggleToolPanel: Visible=', visible, $scope.d.grid.options)

        if (visible) {
            $scope.d.grid.options.api.showToolPanel(false);
        } else {
            $scope.d.grid.options.api.showToolPanel(true);
        };
    };

    // Optinomic - Grid - Functions

    $scope.d.functions.editValueHandler = function(params) {
        //If API-Safe success then update GRID:
        params.data[params.colDef.field] = params.newValue
        console.log('editValueHandler => Save: ', params.colDef.field, params.newValue, params);
    };

    $scope.d.functions.enrichResults = function(surveyResults) {

        surveyResults = surveyResults === undefined ? [] : surveyResults;

        //console.log('enrichResults', surveyResults);

        // Loop trough every result
        surveyResults.forEach(function(result) {

            var my_response = result;

            // Iterate through object properties
            for (var property in my_response) {
                if (result.hasOwnProperty(property)) {

                    //     date_created_sort: $filter("amDateFormat")(date, 'YYYYMMDDHHmm'),
                    //     date_created_week: $filter("amDateFormat")(date, 'YYYY, ww'),
                    //     date_created_day: $filter("amDateFormat")(date, 'dddd, Do MMMM YYYY'),
                    //     date_created_time: $filter("amDateFormat")(date, 'HH:mm'),


                    if ((property === 'datestamp') || (property === 'startdate') || (property === 'submitdate') || (property === 'filled')) {

                        var date = new Date(result[property]);
                        var propertyName = property + '_year';
                        result[propertyName] = $filter("amDateFormat")(date, 'YYYY');

                        var propertyName = property + '_week';
                        result[propertyName] = $filter("amDateFormat")(date, 'YYYY, ww');

                        var propertyName = property + '_day';
                        result[propertyName] = $filter("amDateFormat")(date, 'DD.MM.YYYY');

                        var propertyName = property + '_weekday';
                        result[propertyName] = $filter("amDateFormat")(date, 'dddd');

                        var propertyName = property + '_time';
                        result[propertyName] = $filter("amDateFormat")(date, 'HH:mm');

                    };

                }
            };

            //console.log('(i) enrichResults - ', my_response);

        });

        //console.log('enrichResults :: ', surveyResults);
        return surveyResults;
    };

    $scope.d.functions.createColumnDefs = function(surveyResults, editable, sort) {

        var DataView = [];
        surveyResults = surveyResults === undefined ? [] : surveyResults;
        editable = editable === undefined ? false : editable;
        sort = sort === undefined ? true : sort;

        var sortByKey = function(array, key) {
            return array.sort(function(a, b) {
                var x = a[key];
                var y = b[key];
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
        };


        // When we have Results
        if (surveyResults.length > 0) {

            surveyResults = $scope.d.functions.enrichResults(surveyResults);


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

                    var do_we_have_to_pinn = {
                        a_date: true,
                        a_time: true
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

                    if ((property === 'filled') || (property === 'datestamp') || (property === 'startdate') || (property === 'submitdate')) {
                        line.width = 145;
                        line.suppressSizeToFit = true;
                        line.hide = true;
                    };

                    if ((property === 'filled_year') || (property === 'datestamp_year') || (property === 'startdate_year') || (property === 'submitdate_year')) {
                        line.width = 145;
                        line.hide = true;
                        line.sort = 'asc';
                        line.filter = 'number';
                    };

                    if ((property === 'filled_week') || (property === 'datestamp_week') || (property === 'startdate_week') || (property === 'submitdate_week')) {
                        line.width = 78;
                        line.hide = true;
                    };

                    if ((property === 'filled_day') || (property === 'datestamp_day') || (property === 'startdate_day') || (property === 'submitdate_day')) {
                        line.hide = false;
                        line.width = 88;
                        line.suppressSizeToFit = true;

                        if (do_we_have_to_pinn.a_date) {
                            line.pinned = 'left';
                            do_we_have_to_pinn.a_date = false;
                        };
                    };

                    if ((property === 'filled_weekday') || (property === 'datestamp_weekday') || (property === 'startdate_weekday') || (property === 'submitdate_weekday')) {
                        line.width = 145;
                        line.hide = true;
                    };

                    if ((property === 'filled_time') || (property === 'datestamp_time') || (property === 'startdate_time') || (property === 'submitdate_time')) {
                        line.hide = false;
                        line.width = 62;
                        line.suppressSizeToFit = true;
                        if (do_we_have_to_pinn.a_time) {
                            line.pinned = 'left';
                            do_we_have_to_pinn.a_time = false;
                        };
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

            if (sort) {
                // Sort by 'headerName'
                DataView = sortByKey(DataView, 'headerName');
            };


        };

        //console.log('createColumnDefs :: ', DataView);
        return DataView;
    };


    // -----------------------------------
    // Toast
    // -----------------------------------

    $scope.getToastPosition = function() {
        $scope.toastPosition = {
            bottom: false,
            top: true,
            left: false,
            right: true
        };

        return Object.keys($scope.toastPosition)
            .filter(function(pos) {
                return $scope.toastPosition[pos];
            })
            .join(' ');
    };


    $scope.d.functions.showSimpleToast = function(mycontent) {
        $mdToast.show(
            $mdToast.simple()
            .textContent(mycontent)
            .position($scope.getToastPosition())
            .hideDelay(3000)
        );
    };

    // -----------------------------------
    // Calculations
    // -----------------------------------

    $scope.d.functions.getCalculation = function(calc_name) {
        // Get specific calculation
        var call = dataService.getAppCalculations(calc_name);

        call.success(function(data) {
            // Save Data to $scope.d
            $scope.d.calculations = $scope.d.calculations === undefined ? [] : $scope.d.calculations;

            var date = new Date();

            var objectToPush = {
                'calculation_name': calc_name,
                'calculation_result': data.calculation_result,
                'calculated_datestamp': date,
                'calculated_date': $filter("amDateFormat")(date, 'DD.MM.YYYY'),
                'calculated_time': $filter("amDateFormat")(date, 'HH:mm')
            };

            $scope.d.calculations.push(objectToPush);
            //console.log('(DATA): getAppCalculation: ', calc_name, data);
        });
        call.error(function(data) {
            console.log('(ERROR): getAppCalculations:', calc_name, data);
        });
    };

    $scope.d.functions.getAllCalculations = function() {
        // Get all Calculations from this app.

        var allCalculations = $scope.d.dataMain.apps.current.calculations;

        allCalculations.forEach(function(calculation) {
            $scope.d.functions.getCalculation(calculation);
        });

        $scope.d.functions._InitData('calculations', true);
    };


    // -----------------------------------
    // Other stuff
    // -----------------------------------

    $scope.d.functions.getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }


});
