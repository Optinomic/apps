'use strict';

/**
 * @ngdoc directive
 * @name optinomicDataModule.directive:chartTscore
 * @description
 * # chartTscore
 */
angular.module('optinomicDataModule')
    .directive('chartTscore', function(simpleStatistics) {

        return {
            //templateUrl: 'scripts/directives/chart_tscore.html',
            templateUrl: 'https://cdn.rawgit.com/Optinomic/apps/master/lib/js/optinomic/data_module/directive/chart-tscore/tscore.html?V20160206',

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

                    //console.log('============= chartTScore (START): ', scope, scope.data.length, scope.myOptions);

                    scope.plot_done = false;
                    scope.myOptions = initOptions(scope.myOptions);
                    scope.plot = preparePlot(scope.data);
                    scope.plot = scope.getShowAnswers();

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
                    var language = Options.language === undefined ? 'De' : Options.language;
                    var colours = Options.colours === undefined ? default_colours : Options.colours;
                    var show_responses = Options.show_responses === undefined ? true : Options.show_responses;
                    var show_scores = Options.show_scores === undefined ? true : Options.show_scores;
                    var show_mean = Options.show_mean === undefined ? false : Options.show_mean;
                    var axis_label = Options.axis_label === undefined ? 'T-Wert' : Options.axis_label;


                    var ReturnedOptions = {
                        'screenWidth': screenWidth,
                        'screenHeight': screenHeight,
                        'language': language,
                        'colours': colours,
                        'show_responses': show_responses,
                        'show_scores': show_scores,
                        'show_mean': show_mean,
                        'axis_label': axis_label
                    };

                    // Some Translations
                    scope.translations = {};
                    if (language === 'De') {
                        scope.translations.showScores = 'Werte anzeigen';
                        scope.translations.mean = 'Mittelwert';
                    } else {
                        scope.translations.showScores = 'Show Scores';
                        scope.translations.mean = 'Mean';
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
                    //var maxHeight = 1.25;


                    var allScores = [];
                    for (var y in data[0].scores) {
                        allScores[y] = [];
                    };


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
                            "label_datestamp": current.label_datestamp,
                            "t_scores": [],
                            "colour": getColor(x),
                            "show": scope.myOptions.show_scores
                        };

                        // scope.myOptions.default_colours[x]

                        for (var y in current.scores) {
                            var score = current.scores[y];


                            var myCount = parseInt(y) + 1;
                            var myHeight = maxHeight * myCount;


                            my_xs.push(0);
                            my_xs_max.push(100);
                            my_ys.push(myHeight);
                            my_ys_label.push(myHeight - 0.2);
                            trenner.push([myHeight, myHeight]);



                            //console.log('score = ', score)

                            my_titles.push(score.question);
                            answer.t_scores.push(score.t_score);


                            allScores[y].push(score.t_score);

                        };

                        my_answers.push(answer);

                    };


                    if (scope.data.length > 1) {
                        // Calculate MEAN and save it
                        var meanAnswer = {
                            "label": scope.translations.mean,
                            "label_datestamp": 'mean',
                            "t_scores": [],
                            "colour": getColor(data.length),
                            "show": scope.myOptions.show_mean
                        };

                        for (var x in allScores) {
                            var currentScore = allScores[x];
                            var calcMean = simpleStatistics.mean(currentScore);

                            var mw = Math.round(calcMean * 10) / 10 //Round to 1 Decimal-place
                            meanAnswer.t_scores.push(mw);
                        };

                        my_answers.push(meanAnswer);
                    };


                    // Prepare RETURN

                    var plot = {

                        "answers": my_answers,
                        "meanAnswer": meanAnswer,

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


                // Show - Selected  Answers
                scope.getShowAnswers = function() {

                    var plot_answers = scope.plot;
                    plot_answers.answersShow = [];

                    for (var x in plot_answers.answers) {
                        var current = plot_answers.answers[x];
                        if (current.show) {
                            plot_answers.answersShow.push(current);
                        }
                    };

                    //console.log('plot_answers -> ', plot_answers)
                    scope.plot_done = true;
                    return plot_answers;
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
                    scope.getShowAnswers();
                }, true);


            }
        };

    });
