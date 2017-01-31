'use strict';

/**
 * @ngdoc directive
 * @name optinomicDataModule.directive:scoreThreshold
 * @description
 * # scoreThreshold: Displays a simple score - with ranges if needed.
 */
angular.module('optinomicDataModule')
    .directive('scoreThreshold', function() {
        return {
            restrict: 'E',
            //replace: true,
            //transclude: true,
            scope: {
                myscore: '=score',
                mymax: '=max',
                mymin: '=min',
                //myshow_bottom_bar: '=showBottomBar',
                myshow_min_max: '=showMinMax',
                myshow_value_slider: '=showValueSlider',
                myshow_percent_scale: '=showPercentScale',
                myshow_scale_ranges: '=scaleRanges'
            },

            templateUrl: 'https://cdn.rawgit.com/Optinomic/apps/b86df940/lib/js/optinomic/data_module/directive/score-threshold/rawgit/score_v04.html',


            link: function(scope, element, attrs) {

                function get_position(my_value) {
                    var my_corrected_value = my_value - scope.min;
                    my_value = (100 / (scope.max - scope.min) * my_corrected_value) / 100;
                    my_value = my_value * 85 + 7;
                    return my_value;
                }


                function just_do_it() {
                    //Variablen initialisieren
                    scope.score = scope.myscore;
                    scope.max = scope.mymax;
                    scope.min = scope.mymin;
                    scope.value_slider = scope.myshow_value_slider;
                    scope.value_slider = scope.value_slider === undefined ? true : scope.value_slider;

                    if ((scope.score === NaN) || (scope.score === null) || (scope.score === undefined)) {
                        scope.error = true;
                    } else {
                        scope.error = false;
                    };


                    if (scope.myshow_min_max === false) {
                        scope.show_min_max = false;
                    } else {
                        scope.show_min_max = true;
                    }

                    if (scope.myshow_percent_scale === false) {
                        scope.show_percent_scale = false;
                    } else {
                        scope.show_percent_scale = true;
                    }

                    if (scope.myshow_value_slider === false) {
                        scope.value_slider = false;
                    } else {
                        scope.value_slider = true;
                    }

                    if (scope.myshow_scale_ranges === undefined) {
                        scope.show_scale_ranges = false;
                    } else {
                        scope.show_scale_ranges = true;

                        //Loop durch alle Scales
                        for (var i = 0; i < scope.myshow_scale_ranges.ranges.length; i++) {
                            //console.log('Loop - score = ', scope.myscore);
                            scope.myshow_scale_ranges.ranges[i].from_position = get_position(scope.myshow_scale_ranges.ranges[i].from);
                            scope.myshow_scale_ranges.ranges[i].to_position = get_position(scope.myshow_scale_ranges.ranges[i].to);
                            scope.myshow_scale_ranges.ranges[i].width_position = scope.myshow_scale_ranges.ranges[i].to_position - scope.myshow_scale_ranges.ranges[i].from_position;

                            if ((scope.myscore >= scope.myshow_scale_ranges.ranges[i].from) && (scope.myscore <= scope.myshow_scale_ranges.ranges[i].to)) {
                                scope.my_current_scale = i;
                            }
                            //console.log('LOOP = ', scope.myshow_scale_ranges.ranges[i]);
                        }
                        //console.log('Scale Ranges = ', scope.myshow_scale_ranges);
                    }

                    scope.postition = get_position(scope.score);

                    scope.polygon_1 = scope.postition + ',19 ' + (scope.postition - 1) + ',0 ' + (scope.postition + 1) + ',0';
                    scope.polygon_2 = scope.postition + ',81 ' + (scope.postition - 1) + ',100 ' + (scope.postition + 1) + ',100';


                    if (scope.postition >= 50) {
                        scope.postition_score = scope.postition - 1.5;
                        scope.postition_align = 'end';
                    } else {
                        scope.postition_score = scope.postition + 1.5;
                        scope.postition_align = 'start';
                    }
                }

                just_do_it();

                // Watch for changes.
                scope.$watch('myscore', function() {
                    just_do_it();
                }, true);
                scope.$watch('mymax', function() {
                    just_do_it();
                }, true);
                scope.$watch('mymin', function() {
                    just_do_it();
                }, true);
            }
        };
    });
