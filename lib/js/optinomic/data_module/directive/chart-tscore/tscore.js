'use strict';

/**
 * @ngdoc directive
 * @name optinomicDataModule.directive:chartTscore
 * @description
 * # chartTscore
 */
angular.module('optinomicDataModule')
    .directive('chartTscore', function() {

        return {
            //templateUrl: 'scripts/directives/chart_tscore.html',
            templateUrl: 'https://rawgit.com/Optinomic/apps/master/lib/js/optinomic/data_module/directive/chart-tscore/tscore.html',

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

                    console.log('============= chartTScore (START): ', scope, scope.data.length, scope.myOptions);

                    scope.plot_done = false;
                    scope.myOptions = initOptions(scope.myOptions);
                    scope.plot = preparePlot(scope.data);

                    scope.plot_done = true;
                }


                // -----------------------------------------------
                // FUNCTIONS
                // -----------------------------------------------

                // Init Options
                function initOptions(Options) {

                    Options = Options === undefined ? {} : Options;
                    var myWidth = window.innerWidth / 100 * 95;
                    //var myHeight = window.innerHeight - 150;
                    var myHeight = 60 * scope.data[0].scores.length;

                    var default_colours = [
                        '#3F51B5', // blue
                        '#F44336', // red
                        '#4CAF50', // green
                        '#FFEB3B', // yellow
                        '#9C27B0', // purple
                        '#E91E63', // pink
                        '#FF5722' // orange
                    ];

                    // Set Given Options or Defaults
                    var screenWidth = Options.screenWidth === undefined ? myWidth : Options.screenWidth;
                    var screenHeight = Options.screenHeight === undefined ? myHeight : Options.screenHeight;
                    var colours = Options.colours === undefined ? default_colours : Options.colours;
                    var show_scores = Options.show_scores === undefined ? false : Options.show_scores;


                    var ReturnedOptions = {
                        'screenWidth': screenWidth,
                        'screenHeight': screenHeight,
                        'colours': colours,
                        'show_scores': show_scores
                    };

                    //console.log('Options Return', ReturnedOptions);
                    return ReturnedOptions;
                };


                // Init Options
                function getColor(count) {

                    if (count > scope.myOptions.colours.length) {
                        // RANDOM
                        var letters = '0123456789ABCDEF'.split('');
                        var color = '#';
                        for (var i = 0; i < 6; i++) {
                            color += letters[Math.floor(Math.random() * 16)];
                        }
                    } else {
                        // GET default_colours
                        var color = scope.myOptions.colours[count];
                    };


                    return color;

                }

                // Init Options
                function preparePlot(data) {


                    var my_answers = [];
                    var maxHeight = 10 / data[0].scores.length;

                    for (var x in data) {
                        var current = data[x];
                        //console.log('current = ', current)

                        var my_titles = [];
                        var my_xs = [];
                        var my_xs_max = [];
                        var my_ys = [];
                        var my_ys_label = [];
                        var trenner = [];


                        var answer = {
                            "label": current.label,
                            "t_scores": [],
                            "colour": getColor(x)
                        };

                        // scope.myOptions.default_colours[x]

                        for (var y in current.scores) {
                            var score = current.scores[y];


                            var myCount = parseInt(y) + 1;
                            var myHeight = maxHeight * myCount;



                            my_xs.push(0);
                            my_xs_max.push(100);
                            my_ys.push(myCount);
                            my_ys_label.push(myHeight - 0.2);
                            trenner.push([myHeight, myHeight]);



                            //console.log('score = ', score)

                            my_titles.push(score.question);
                            answer.t_scores.push(score.t_score);

                        };

                        my_answers.push(answer);

                    };


                    var plot = {

                        "answers": my_answers,

                        "titles": my_titles,

                        "xs": my_xs,
                        "xs_max": my_xs_max,
                        "ys": my_ys,
                        "ys_label": my_ys_label,

                        "trenner": trenner,

                        "area_1": [20, 80],
                        "area_2": [30, 70],
                        "area_3": [40, 60],
                        "area_sc_min": [1, 1],
                        "area_sc_max": [10, 10],

                        "line_x": [0, 100],

                        "line_mw_x": [50, 50],
                        "line_mw_y": [1, 10]

                    };

                    return plot;
                };


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
