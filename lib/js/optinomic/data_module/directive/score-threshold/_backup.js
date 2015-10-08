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
                myshow_min_max: '=showMinMax',
                myshow_percent_scale: '=showPercentScale',
                myshow_scale_ranges: '=scaleRanges'
            },

            template: '<div style="width:100%;">' +
                '<div id="svg_box">' +

                '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="70" viewBox="0 0 100 100" preserveAspectRatio="none">' +
                '<defs>' +
                '<linearGradient id="grad_entry" x1="0%" y1="0%" x2="100%" y2="0%">' +
                '<stop offset="0%" style="stop-color:#FAFAFA;stop-opacity:1" />' +
                '<stop offset="100%" style="stop-color:#E0E0E0;stop-opacity:1" />' +
                '</linearGradient>' +
                '<linearGradient id="grad_exit" x1="0%" y1="0%" x2="100%" y2="0%">' +
                '<stop offset="0%" style="stop-color:#E0E0E0;stop-opacity:1" />' +
                '<stop offset="100%" style="stop-color:#FAFAFA;stop-opacity:1" />' +
                '</linearGradient>' +
                '</defs>' +

                '<rect x="0" y="0" width="100" height="100" fill="white" />' +
                '<rect x="7" y="20" width="85" height="60" fill="#E0E0E0" />' +
                '<rect x="7" y="20" width="33" height="60" fill="url(#grad_entry)" />' +
                '<rect x="59" y="20" width="33" height="60" fill="url(#grad_exit)" />' +
                '<line x1="7" y1="20" x2="92" y2="20" style="stroke:#BDBDBD;stroke-width:1" />' +
                '<line x1="7" y1="50" x2="92" y2="50" style="stroke:#BDBDBD;stroke-width:1" />' +
                '<line x1="7" y1="80" x2="92" y2="80" style="stroke:#BDBDBD;stroke-width:1" />' +

                '<g ng-show="show_scale_ranges" fill="none">' +
                '<rect ng-repeat="range in myshow_scale_ranges.ranges" ng-hide="my_current_scale === $index" opacity="1" ng-attr-x="{{range.from_position}}" y="35" ng-attr-width="{{range.width_position}}" height="30" fill="#E8EAF6" />' +
                '<rect ng-repeat="range in myshow_scale_ranges.ranges" ng-show="my_current_scale === $index" opacity="1" ng-attr-x="{{range.from_position}}" y="30" ng-attr-width="{{range.width_position}}" height="40" fill="#5C6BC0" />' +
                '</g>' +

                '<g ng-show="show_percent_scale" fill="none">' +
                '<rect x="15.5" y="45" width="0.2" height="10" fill="#757575" />' +
                '<rect x="24" y="45" width="0.2" height="10" fill="#757575" />' +
                '<rect x="32.5" y="45" width="0.2" height="10" fill="#757575" />' +
                '<rect x="41" y="45" width="0.2" height="10" fill="#757575" />' +
                '<rect x="49.5" y="20" width="0.2" height="60" fill="#757575" />' +
                '<rect x="58" y="45" width="0.2" height="10" fill="#757575" />' +
                '<rect x="66.5" y="45" width="0.2" height="10" fill="#757575" />' +
                '<rect x="75" y="45" width="0.2" height="10" fill="#757575" />' +
                '<rect x="83.5" y="45" width="0.2" height="10" fill="#757575" />' +
                '</g>' +


                '<g fill="none">' +
                '<rect x="7" y="85" ng-attr-width="{{postition-7}}" height="15" fill="#3F51B5" opacity="0.5">' +
                '<animate attributeName="width" attributeType="XML" from="7" to="{{postition-7}}" begin="0s" dur="2s" fill="remove" calcMode="spline" keySplines="0 0.75 0.25 1" keyTimes="0;1" />' +
                '</rect>' +
                '</g>' +

                '<svg fill="none">' +
                '<rect ng-attr-x="{{postition-0.1}}" y="0" width="0.2" height="100" fill="black">' +
                '<animate attributeName="x" attributeType="XML" from="7" to="{{postition-0.1}}" begin="0s" dur="2s" fill="remove" calcMode="spline" keySplines="0 0.75 0.25 1" keyTimes="0;1" />' +
                '</rect>' +
                '</svg>' +

                '<svg fill="#3F51B5">' +
                '<polygon ng-attr-points="{{polygon_1}}"  />' +
                '<polygon ng-attr-points="{{polygon_2}}"  />' +
                '</svg>' +


                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 10" preserveAspectRatio="none">' +
                '<g ng-show="show_min_max" fill="none">' +
                '<text x="6" text-anchor="end" y="4.8" font-family="Arial" font-size="2" fill="#9E9E9E">Min</text>' +
                '<text x="6" text-anchor="end" y="7.25" font-family="Arial" font-size="2" fill="black">{{min}}</text>' +
                '<text x="93" text-anchor="start" y="4.8" font-family="Arial" font-size="2" fill="#9E9E9E">Max</text>' +
                '<text x="93" text-anchor="start" y="7.25" font-family="Arial" font-size="2" fill="black">{{max}}</text>' +
                '</g>' +

                '<text ng-attr-x="{{postition_score}}" text-anchor="{{postition_align}}" style="stroke:#FAFAFA;stroke-width:0.1" y="6.8" font-family="Arial" font-size="5" fill="black">' +
                '{{score}}' +
                '<animate attributeName="x" attributeType="XML" from="7" to="{{postition_score}}" begin="0s" dur="3s" fill="remove" calcMode="spline" keySplines="0 0.75 0.25 1" keyTimes="0;1" />' +
                '</text>' +
                '</svg>' +

                '</svg>' +
                '</div>' +

                '<div style="margin-top: 50px;">' +
                '&nbsp;' +
                '</div>' +
                '</div>',

            link: function(scope, element, attrs, ngModel) {

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
