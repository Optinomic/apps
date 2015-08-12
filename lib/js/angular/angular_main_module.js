'use strict';

/**
 * @name optinomic - App
 *
 * Main module of the application.
 */
app = angular
    .module('optinomicApp', [
        'ngAnimate',
        'ngAria',
        'ngRoute',
        'ngMaterial'
    ])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                controllerAs: 'ctrl',
                controller: 'AppCtrl'
            })

        .otherwise({
            redirectTo: '/'
        });
    });
