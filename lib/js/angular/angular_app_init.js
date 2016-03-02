'use strict';

/**
 * @name Optinomic - App
 * ---------------------------------------
 * Main module of the application.
 */

// get ag-Grid to create an Angular module and register the ag-Grid directive
agGrid.initialiseAgGridWithAngular1(angular);

var app = angular
    .module('optinomicApp', [
        'optinomicDataModule',
        'ngAnimate',
        'ngAria',
        'ngRoute',
        'ngMaterial',
        'ngMessages',
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
    'ngMessages',
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




angular.module('optinomicDataModule').controller('MainCtrl', function($scope, $q, $filter, $mdToast, $window, apiService, dataService, scopeDService, simpleStatistics) {

    // -----------------------------------
    // Init
    // -----------------------------------
    $scope.d = scopeDService;

    if (parseInt(helpers.getPatientID()) === 0) {
        console.log('User-App: Token=', dataService.getToken());
        $scope.d.app_type = 'user';
    } else {
        console.log('Patient-App: PID=', dataService.getPatientID(), ' Token=', dataService.getToken());
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



    $scope.d.functions.sureDateInstance = function(value) {

        // Make sure that the value is a 'date-instance'.
        if (value && !(value instanceof Date)) {
            if (typeof value === "string")
                value = new Date(value);
            if (Object.prototype.toString.call(value) !== "[object Date]")
                throw Error('The ng-model for md-datepicker must be a Date instance. ' +
                    'Currently the model is a: ' + (typeof value));
        };

        return value;

    };

    // -----------------------------------------------------------
    // Scroll Top
    // -----------------------------------------------------------
    $scope.d.functions.scrollTop = function() {

        $window.scrollTo(0, 0);
        $window.parent.scrollTo(0, 0);
        console.log('scrollTop', $window);

    };


    // -----------------------------------------------------------
    // Visa
    // -----------------------------------------------------------

    $scope.d.functions.visa = function(email, password) {

        var return_object = {
            success: false,
            data: {}
        };

        var deferred = $q.defer();

        var api_call = apiService.post("/signin", {
            email: email,
            password: password,
            no_token: 'True'
        });

        api_call.success(function(data) {

            return_object.success = true;
            return_object.data = data;
            deferred.resolve(return_object);
            console.log('===> Success - getData   ', return_object, deferred);
        });
        api_call.error(function(error) {

            return_object.success = false;
            return_object.data = error;
            deferred.reject(return_object);
            console.log('===> ERROR! getData   ', return_object, deferred);
        });
        return deferred.promise;

    };



    // -----------------------------------------------------------
    // GRID
    // http://www.angulargrid.com/angular-grid-resizing/index.php
    // -----------------------------------------------------------
    $scope.d.functions.resizeGrid = function() {
        //console.log('resizeGrid:', $scope.d.grid.options)
        $scope.d.grid.options.api.sizeColumnsToFit();
    };

    $scope.d.functions.refreshView = function() {
        //console.log('refreshView:', $scope.d.grid.options)
        $scope.d.grid.options.api.refreshView();
    };

    $scope.d.functions.toggleToolPanel = function() {
        var visible = $scope.d.grid.options.api.isToolPanelShowing();
        //console.log('toggleToolPanel: Visible=', visible, $scope.d.grid.options)

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

            var do_we_have_to_pinn = {
                a_date: true,
                a_time: true
            };

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

    $scope.d.functions.unselectRow = function() {
        $scope.d.grid.selected_row = null;
        $scope.d.grid.is_row_selected = false;
        $scope.d.grid.options.api.deselectAll();
    };

    $scope.d.functions.onBtExport = function() {
        // Export Data from ag-grid

        var date = new Date();
        var dateString = $filter("amDateFormat")(date, 'YYYY_MM_DD');
        var appName = $scope.d.dataMain.apps.current.original_name;
        var patientName = $scope.d.dataMain.patient.data.extras.name;
        var fileName = dateString + ' - ' + appName + ' - ' + patientName + '.csv';

        var params = {
            skipHeader: false,
            skipFooters: false,
            skipGroups: false,
            allColumns: $scope.d.grid.export_settings.allColumns,
            fileName: fileName,
            columnSeparator: $scope.d.grid.export_settings.columnSeparator
        };

        $scope.d.grid.options.api.exportDataAsCsv(params);
    };


    // Export - V1

    $scope.d.functions.doExport = function() {

        var api = dataService.runSQL($scope.d.export_obj.sql_field, $scope.d.export_obj.delimitter, $scope.d.export_obj.header, $scope.d.export_obj.format, $scope.d.export_obj.direct);
        var aSQL = dataService.getData(api);

        aSQL.then(function(data) {
            $scope.d.export_obj.have_data = true;
            $scope.d.export_obj.data = data;
            console.log('export - Done: ', $scope.d.export_obj.data);
        });

    };

    // Export - V1

    $scope.d.functions.getDefaultExportSettings = function(app_id) {

        function do_return() {
            console.log('DATA: runExportSQL: ', $scope.d.sql_box);
            return sql_box;
        };

        // Init

        var base_query = "SELECT\n  patient.id as pid,\n  CASE WHEN patient.gender='Male' THEN 'Herr' ELSE 'Frau' END || ' ' || COALESCE(patient.last_name, '') || ' ' || COALESCE(patient.first_name, '') as patient_name,\n  patient.four_letter_code,\n *  \n\nFROM survey_response \nINNER JOIN patient ON(survey_response.patient = patient.id) \n\nWHERE module = '%module_id%'\n";
        base_query = base_query.replace("%module_id%", app_id);

        var sql_box = {};
        sql_box.query = base_query;
        sql_box.delimitter = ';';
        sql_box.including_headers = 'True';
        sql_box.format = 'json';
        sql_box.direct = 'True';
        sql_box.have_data = false;
        sql_box.data = null;
        sql_box.packages = [];
        sql_box.selectedIndex = 0;

        // Push - Default
        var data_package = {};
        data_package = {
            name: 'Default',
            sql: base_query
        };
        sql_box.packages.push(data_package);


        // Get 'response'
        // ToDo:  Run select * from - get responses JSON and enhance base_query with cast-> JSON


        var response_query = "SELECT response FROM survey_response WHERE module = '%module_id%' LIMIT 1;";
        response_query = response_query.replace("%module_id%", app_id);

        var api = dataService.runSQL(response_query, sql_box.delimitter, sql_box.including_headers, sql_box.format, sql_box.direct);

        api.success(function(data) {
            var response_json = data.rows[0].response
            console.log('DATA: response_query: ', response_json);
            sql_box.definitions = data;

            do_return();
        });

        api.error(function(data) {
            console.log('ERROR: response_query: ', data);
            do_return();
        });


    };

    $scope.d.functions.runExportSQL = function(query) {


        var query = query === undefined ? $scope.d.sql_box.query : query;
        var delimitter = $scope.d.sql_box.delimitter === undefined ? ';' : $scope.d.sql_box.delimitter;
        var including_headers = $scope.d.sql_box.including_headers === undefined ? 'True' : $scope.d.sql_box.including_headers;
        var direct = $scope.d.sql_box.direct === undefined ? 'True' : $scope.d.sql_box.direct;
        var format = $scope.d.sql_box.format === undefined ? 'json' : $scope.d.sql_box.format;
        console.log('runExportSQL', query, delimitter, including_headers, format, direct);


        var api = dataService.runSQL(query, delimitter, including_headers, format, direct);

        api.success(function(data) {
            $scope.d.sql_box.have_data = true;
            $scope.d.sql_box.data = data;
            $scope.d.sql_box.selectedIndex = 2;
        });


        api.error(function(data) {
            console.log('ERROR: runExportSQL: ', data);

            var error_text = data.error === undefined ? 'Internal Server Error: Check your SQL-Query!' : data.error;
        });

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
