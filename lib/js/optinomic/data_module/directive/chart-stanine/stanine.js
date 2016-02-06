'use strict';

/**
 * @ngdoc directive
 * @name optinomicAppLibraryApp.directive:chartTimeline
 * @description
 * # chartTimeline
 */



angular.module('optinomicDataModule')
    .directive('chartStanine', function() {




        return {
            //templateUrl: 'scripts/directives/chart_stanine.html',
            templateUrl: 'https://cdn.rawgit.com/Optinomic/apps/master/lib/js/optinomic/data_module/directive/chart-stanine/stanine.html?V20160208',

            restrict: 'E',
            //replace: true,
            //transclude: true,
            scope: {
                data: '=data',
                myOptions: '=options'
            },

            link: function postLink(scope, element, attrs) {

                // -----------------------------------------------
                // INIT
                // -----------------------------------------------


                function updateStuff() {
                    // console.log('============= chartStanine (START): ', scope, scope.data.length, scope.myOptions);

                    scope.plot_done = false;
                    scope.myOptions = initOptions(scope.myOptions);

                    scope.multiple = false;
                    if (scope.data.length > 1) {
                        scope.multiple = true;
                    }
                    scope.plot_done = true;
                }


                // -----------------------------------------------
                // FUNCTIONS
                // -----------------------------------------------

                // Init Options
                function initOptions(Options) {

                    Options = Options === undefined ? {} : Options;
                    //var myWidth = window.innerWidth / 100 * 95 + 280;
                    var myWidth = window.innerWidth + 280;
                    //var myHeight = window.innerHeight - 150;
                    var myHeight = 60 * scope.data[0].scores.length;


                    // Set Given Options or Defaults
                    var screenWidth = Options.screenWidth === undefined ? myWidth : Options.screenWidth;
                    var screenHeight = Options.screenHeight === undefined ? myHeight : Options.screenHeight;
                    var population_name = Options.population_name === undefined ? 'Population' : Options.population_name;
                    var norm_name = Options.norm_name === undefined ? 'Normalbereich' : Options.norm_name;
                    var start_result = Options.start_result === undefined ? 0 : Options.start_result;


                    var ReturnedOptions = {
                        'screenWidth': screenWidth,
                        'screenHeight': screenHeight,
                        'population_name': population_name,
                        'start_result': start_result,
                        'norm_name': norm_name
                    };

                    //console.log('Options Return', ReturnedOptions);
                    return ReturnedOptions;
                };


                // Init Options
                scope.nextResult = function(direction) {

                    direction = direction === undefined ? 'next' : direction;

                    var jetzt = scope.myOptions.start_result;
                    var laenge = scope.data.length - 1;



                    if (direction === 'next') {
                        if ((jetzt + 1) > laenge) {
                            jetzt = 0;
                        } else {
                            jetzt = jetzt + 1;
                        }
                    } else {
                        if ((jetzt - 1) < 0) {
                            jetzt = laenge;
                        } else {
                            jetzt = jetzt - 1;
                        }
                    };


                    scope.myOptions.start_result = jetzt;
                    //console.log('nextResult', direction);
                    updateStuff();

                }


                // -----------------------------------------------
                // Watch for changes.
                // -----------------------------------------------
                scope.$watch('data', function() {
                    if (scope.data === undefined) {
                        scope.data = {};
                    } else {
                        updateStuff();
                    }
                }, true);


                scope.$watch('myOptions', function() {
                    updateStuff();
                }, true);


            }
        };

    });
