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
        'ngMaterial'
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
    'angularMoment'
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


    $scope.d.functions = {};
    // -----------------------------------------------------------
    // GRID
    // http://www.angulargrid.com/angular-grid-resizing/index.php
    // -----------------------------------------------------------
    $scope.d.functions.resizeGrid = function() {
        console.log('resizeGrid:', $scope.d.gridOptions)
        $scope.d.gridOptions.api.sizeColumnsToFit();
    };




});
