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

angular.module('optinomicDataModule').controller('MainCtrl', function($scope, dataService, scopeDService, simpleStatistics) {

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
