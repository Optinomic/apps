'use strict';

/**
 * @name optinomic - App
 *
 * Main module of the application.
 */
angular
    .module('optinomicApp', [
        'ngAnimate',
        'ngAria',
        'ngRoute',
        'ngMaterial'
    ])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'AppCtrl'
            })
            .when('/about', {
                controller: 'AppCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .controller('AppCtrl', function($scope) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        console.log('Hello ANGULAR!', $scope.awesomeThings);
    });
