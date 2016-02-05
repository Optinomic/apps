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
    ]);


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





angular.module('optinomicDataModule').controller('MainCtrl', function($scope, $filter, $mdToast, dataService, scopeDService, simpleStatistics) {

    // -----------------------------------
    // Init
    // -----------------------------------
    $scope.d = scopeDService;



});
