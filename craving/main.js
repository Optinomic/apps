'use strict';

/**
 * @name optinomic - App
 *
 * Main module of the application.
 */
angular.module('optinomicApp', [
    'ngAnimate',
    'ngAria',
    'ngRoute',
    'ngMaterial'
]);


angular.controller('AppCtrl', function($scope) {
    $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
    ];

    console.log('Hello ANGULAR!', $scope.awesomeThings);
});
