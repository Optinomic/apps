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

angular.module('optinomicDataModule').config(['$compileProvider', function($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|data|blob):/);
}]);






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


angular.module('optinomicDataModule').filter('num', function() {
    return function(input) {
        return parseInt(input, 10);
    };
});



angular.module('optinomicDataModule').controller('MainCtrl', function($scope, $q, $filter, $mdToast, $window, apiService, dataService, scopeDService, simpleStatistics) {

    // -----------------------------------
    // Init
    // -----------------------------------
    $scope.d = scopeDService;


    var start_log = '';
    start_log = start_log + ' PID=' + dataService.getPatientID();
    start_log = start_log + ', StayID=' + dataService.getStayID();
    start_log = start_log + ', AppName=' + dataService.getAppName();
    start_log = start_log + ', AppID=' + dataService.getAppID();
    start_log = start_log + ', UserID=' + dataService.getUserID();
    start_log = start_log + ', Token=' + dataService.getToken();
    start_log = start_log + ', ApiURL=' + dataService.getApiURL();

    if (parseInt(helpers.getPatientID()) === 0) {
        console.log('(✓) User-App: ', start_log, $scope.d);
        $scope.d.app_type = 'user';
    } else {
        console.log('(✓) Patient-App: ', start_log, $scope.d);
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

                    if ((property === 'display') || (property === 'startlanguage') || (property === 'survey_name') || (property === 'lastpage') || (property === 'datestamp') || (property === 'submitdate')) {
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

    // Export - V2

    $scope.d.functions.getDefaultExportSettings = function(app_id, app_packages) {

        // Init
        app_id = app_id === undefined ? '%module_id%' : app_id;
        app_packages = app_packages === undefined ? [] : app_packages;

        var sql_box = {};
        sql_box.delimitter = ';';
        sql_box.including_headers = 'True';
        sql_box.format = 'csv';
        sql_box.direct = 'False';
        sql_box.have_data = false;
        sql_box.data = null;
        sql_box.packages = [];
        sql_box.selectedIndex = 0;
        sql_box.query = "";

        // Date Filter
        var current_year = new Date().getFullYear();
        sql_box.DateFilter = false;
        sql_box.DateFilterFrom = current_year + '-01-01 00:00:00';
        sql_box.DateFilterTo = current_year + '-12-31 00:00:00';
        sql_box.DateFilterFromDate = $scope.d.functions.sureDateInstance(sql_box.DateFilterFrom);
        sql_box.DateFilterToDate = $scope.d.functions.sureDateInstance(sql_box.DateFilterTo);
        sql_box.DateFilterWhere = "\nAND filled >= '" + sql_box.DateFilterFrom + "'::timestamp \nAND  filled < '" + sql_box.DateFilterTo + "'::timestamp;"


        // Querys
        var minimal_query = "SELECT * FROM survey_response WHERE module = '%module_id%';\n";
        minimal_query = minimal_query.replace("%module_id%", app_id);
        var response_query = minimal_query.replace(";", " LIMIT 1;");

        var base_query = "SELECT\n  patient.id AS pid,\n  patient,\n  CASE WHEN patient.gender='Male' THEN 'Herr' ELSE 'Frau' END || ' ' || COALESCE(patient.last_name, '') || ' ' || COALESCE(patient.first_name, '') AS patient_name,\n  patient.four_letter_code,\n    *,\n\n  random_hash,\n  scheduled,\n  filled,\n  module,\n  survey_response.id AS survey_response_id  \n\nFROM survey_response \nINNER JOIN patient ON(survey_response.patient = patient.id) \n\nWHERE module = '%module_id%';\n";
        base_query = base_query.replace("%module_id%", app_id);


        // Querys - current patient
        var patient_query = "";
        var current_patient_where = "\nAND patient='%current_pid%';";
        current_patient_where = current_patient_where.replace("%current_pid%", $scope.d.dataMain.params.PID);
        var current_patient_name = $scope.d.dataMain.patient.data.extras.name;

        // Push - Default - Querys

        // Loop: app_packages
        app_packages.forEach(function(app_package, myindex) {
            sql_box.packages.push(app_package);
            sql_box.query = app_package.sql;
        });


        // WIZARD - QUERY's only when ADMIN
        if ($scope.d.dataMain.users.current.data.role === 'Admin') {

            var data_package = {};
            data_package = {
                name: 'Wizard: Minimal | all Patients',
                sql: minimal_query
            };
            sql_box.packages.push(data_package);

            patient_query = minimal_query;
            patient_query = patient_query.replace(";", current_patient_where);
            data_package = {
                name: 'Wizard: Minimal | ' + current_patient_name,
                sql: patient_query
            };
            sql_box.packages.push(data_package);

            data_package = {
                name: 'Wizard: Response | all Patients',
                sql: base_query
            };
            sql_box.packages.push(data_package);

            patient_query = base_query;
            patient_query = patient_query.replace(";", current_patient_where);
            data_package = {
                name: 'Wizard: Response | ' + current_patient_name,
                sql: patient_query
            };
            sql_box.packages.push(data_package);

            // Get all 'response' fields
            var api = dataService.runSQL(response_query, sql_box.delimitter, 'True', 'json', 'True');

            api.success(function(data) {
                var response_json = JSON.parse(data.rows[0].response);

                var resp_array = [];
                for (var key in response_json) {

                    var resp_var = create_variable_name(key);

                    resp_array.push(key);

                    if ((key.toLowerCase() === 'datestamp') || (key.toLowerCase() === 'datum') || (key.toLowerCase() === 'startdate') || (key.toLowerCase() === 'submitdate') || (key.toLowerCase() === 'filled')) {
                        var key_enhanced = '';

                        key_enhanced = resp_var + '_date'
                        resp_array.push(key_enhanced);

                        key_enhanced = resp_var + '_time'
                        resp_array.push(key_enhanced);

                        key_enhanced = resp_var + '_year'
                        resp_array.push(key_enhanced);

                        key_enhanced = resp_var + '_week'
                        resp_array.push(key_enhanced);

                    };
                };
                resp_array = sortArray(resp_array);
                // console.log('DATA: resp_array: ', resp_array);

                var enhanced_query_string = "";
                resp_array.forEach(function(resp, myindex) {
                    // console.log('----> response', resp);

                    var query_line = "";
                    var resp_var = create_variable_name(resp);

                    // Do not push 'enhaned' fields again
                    if ((resp.indexOf('_date') === -1) && (resp.indexOf('_time') === -1) && (resp.indexOf('_year') === -1) && (resp.indexOf('_week') === -1)) {
                        query_line = "\n  ((cast(response AS json))->>'%def_key%') as %def_key_var%,";
                        query_line = query_line.replace(/%def_key%/g, resp);
                        query_line = query_line.replace(/%def_key_var%/g, resp_var.toLowerCase());
                        enhanced_query_string = enhanced_query_string + query_line;
                    };


                    // If Date field - Enhance and 'to_date'
                    if ((resp.toLowerCase() === 'datestamp') || (resp.toLowerCase() === 'datum') || (resp.toLowerCase() === 'startdate') || (resp.toLowerCase() === 'submitdate') || (resp.toLowerCase() === 'filled')) {

                        var query_line = "\n  TO_DATE(((cast(response AS json))->>'%def_key%'), 'YYYY-MM-DD HH24:MI:SS')  as %def_key_var%_date,\n  SUBSTRING(((cast(response AS json))->>'%def_key%'),12,5) AS %def_key_var%_time,\n  SUBSTRING(((cast(response AS json))->>'%def_key%'),1,4)::integer AS %def_key_var%_year,\n  EXTRACT(WEEK FROM TO_DATE(((cast(response AS json))->>'%def_key%'), 'YYYY-MM-DD HH24:MI:SS')) AS %def_key_var%_week,";

                        query_line = query_line.replace(/%def_key%/g, resp);
                        query_line = query_line.replace(/%def_key_var%/g, resp_var.toLowerCase());
                        enhanced_query_string = enhanced_query_string + query_line;
                    };

                });

                var enhanced_query = base_query.replace("*,", enhanced_query_string);

                // Push - Default
                var data_package = {};
                data_package = {
                    name: 'Wizard: Response (full) | all Patients',
                    sql: enhanced_query
                };
                sql_box.packages.push(data_package);


                patient_query = enhanced_query;
                patient_query = patient_query.replace(";", current_patient_where);
                data_package = {
                    name: 'Wizard: Response (full) | ' + current_patient_name,
                    sql: patient_query
                };
                sql_box.packages.push(data_package);


                if (sql_box.query === "") {
                    // Set Default if not already set by app_packages
                    sql_box.query = patient_query;
                };

                do_return(sql_box);
            });

            api.error(function(data) {

                var text = '(!) Error in SQL-Query (getDefaultExportSettings)'
                console.log(text, data);
                // $scope.d.functions.showSimpleToast(text)
                do_return(sql_box);
                // OUTPUT - ERROR
            });

        };


        var sortArray = function(array) {
            return array.sort(function(a, b) {
                var x = a;
                var y = b;
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
        };

        var do_return = function(return_data) {
            //console.log('DATA: ExportSettings: ', return_data);
            $scope.d.sql_box = return_data;
        };


        var create_variable_name = function(key) {
            var resp_var = "";
            // Remve unalowed chars from variable_name
            resp_var = key.replace("[", "_");
            resp_var = resp_var.replace("]", "");
            return resp_var;
        };
    };

    $scope.d.functions.runExportSQL = function(query) {


        var query = query === undefined ? $scope.d.sql_box.query : query;
        var delimitter = $scope.d.sql_box.delimitter === undefined ? ';' : $scope.d.sql_box.delimitter;
        var including_headers = $scope.d.sql_box.including_headers === undefined ? 'True' : $scope.d.sql_box.including_headers;
        var direct = $scope.d.sql_box.direct === undefined ? 'True' : $scope.d.sql_box.direct;
        var format = $scope.d.sql_box.format === undefined ? 'json' : $scope.d.sql_box.format;


        // Apply Date-Filter
        if ($scope.d.sql_box.DateFilter) {
            $scope.d.sql_box.DateFilterFrom = $filter("amDateFormat")($scope.d.sql_box.DateFilterFromDate, 'YYYY-MMM-DD') + ' 00:00:00';
            $scope.d.sql_box.DateFilterTo = $filter("amDateFormat")($scope.d.sql_box.DateFilterToDate, 'YYYY-MMM-DD') + ' 00:00:00';
            $scope.d.sql_box.DateFilterWhere = "\nAND filled >= '" + $scope.d.sql_box.DateFilterFrom + "'::timestamp \nAND  filled <= '" + $scope.d.sql_box.DateFilterTo + "'::timestamp;"
            query = query.replace(";", $scope.d.sql_box.DateFilterWhere);
        };

        // Apply Patient-Filter

        console.log('runExportSQL', query, delimitter, including_headers, format, direct);


        var api = dataService.runSQL(query, delimitter, including_headers, format, direct);

        api.success(function(data) {
            $scope.d.sql_box.have_data = true;
            $scope.d.sql_box.data = data;
            $scope.d.sql_box.selectedIndex = 2;
        });


        api.error(function(data) {

            var text = '(!) Error in SQL-Query.'
            console.log(text, data);
            $scope.d.functions.showSimpleToast(text)

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
