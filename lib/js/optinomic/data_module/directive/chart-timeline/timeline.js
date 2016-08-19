'use strict';

/**
 * @ngdoc directive
 * @name optinomicDataModule.directive:chartTimeline
 * @description
 * # chartTimeline
 */


angular.module('optinomicDataModule')
    .directive('chartTimeline', function($filter, $sce, simpleStatistics) {
        return {
            //templateUrl: 'scripts/directives/charttimeline.html',
            templateUrl: 'https://rawgit.com/Optinomic/apps/master/lib/js/optinomic/data_module/directive/chart-timeline/timeline.html?V20160312',

            restrict: 'E',
            //replace: true,
            //transclude: true,
            scope: {
                data: '=data',
                vg: '=vg',
                myOptions: '=options'
            },
            link: function postLink(scope, element, attrs) {

                // -----------------------------------------------
                // INIT
                // -----------------------------------------------

                Chart.defaults.global.colours = [
                    '#3F51B5', // blue
                    '#F44336', // red
                    '#4CAF50', // green
                    '#FFEB3B', // yellow
                    '#9C27B0', // purple
                    '#E91E63', // pink
                    '#FF5722' // orange
                ];

                scope.chartOptions = {
                    scaleShowGridLines: true,
                    datasetFill: true,
                    scaleShowLabels: true
                };


                function updateStuff() {

                    //console.log('============= chartTimeline (START): ', scope, scope.data.length, scope.myOptions);

                    scope.myOptions = initOptions(scope.myOptions);

                    sortByKey(scope.data, scope.myOptions.dateField);
                    setfocusField(scope.data);


                    if (scope.myOptions.fillDates) {
                        scope.result_data = fillDate(scope.data);
                        setDateInfo(scope.result_data, scope.myOptions.firstWeekDay, scope.myOptions.language);
                        scope.result_data = saveDataToFilled(scope.data, scope.result_data);
                    } else {
                        scope.result_data = scope.data;
                        setDateInfo(scope.result_data, scope.myOptions.firstWeekDay, scope.myOptions.language);

                    }
                    //console.log('chartTimeline: ', scope, scope.result_data.length);

                    scope.results_grouped = GroupResults(scope.result_data);
                    scope.dateCharts = CreateChartObjects(scope.results_grouped)
                    scope.showChart(scope.myOptions.defaultChart);

                    //console.log('chartTimeline: results_grouped, dateCharts', scope.results_grouped, scope.dateCharts);
                }


                // -----------------------------------------------
                // FUNCTIONS
                // -----------------------------------------------

                // Init Options
                function initOptions(Options) {

                    Options = Options === undefined ? {} : Options;
                    var myWidth = window.innerWidth / 100 * 95;
                    var myHeight = window.innerHeight - 160;


                    // Set Given Options or Defaults
                    var dateField = Options.dateField === undefined ? 'datestamp' : Options.dateField;
                    var firstWeekDay = Options.firstWeekDay === undefined ? 'Mo' : Options.firstWeekDay;
                    var language = Options.language === undefined ? 'De' : Options.language;
                    var focusField = Options.focusField === undefined ? 'value' : Options.focusField;
                    var fillDates = Options.fillDates === undefined ? true : Options.fillDates;
                    var patient = Options.patient === undefined ? 'Patient' : Options.patient;
                    var screenWidth = Options.screenWidth === undefined ? myWidth : Options.screenWidth;
                    var screenHeight = Options.screenHeight === undefined ? myHeight : Options.screenHeight;
                    var defaultChart = Options.defaultChart === undefined ? 'week' : Options.defaultChart;
                    var title = Options.title === undefined ? focusField : Options.title;


                    var ReturnedOptions = {
                        'defaultChart': defaultChart,
                        'dateField': dateField,
                        'firstWeekDay': firstWeekDay,
                        'language': language,
                        'focusField': focusField,
                        'fillDates': fillDates,
                        'patient': patient,
                        'screenWidth': screenWidth,
                        'screenHeight': screenHeight,
                        'title': title
                    };

                    // Some Translations
                    scope.translations = {};
                    if (language === 'De') {
                        scope.translations.fill = 'Alle Kalendertage';
                        scope.translations.day = 'Tag';
                        scope.translations.week = 'Woche';
                        scope.translations.month = 'Monat';
                        scope.translations.quarter = 'Quartal';
                        scope.translations.year = 'Jahr';
                        scope.translations.weekday = 'Wochentag';
                        scope.translations.hour = 'Stunde';
                        scope.translations.settings = 'Einstellungen';
                    } else {
                        scope.translations.fill = 'All calendar days';
                        scope.translations.day = 'Day';
                        scope.translations.week = 'Week';
                        scope.translations.month = 'Month';
                        scope.translations.quarter = 'Quarter';
                        scope.translations.year = 'Year';
                        scope.translations.weekday = 'Weekday';
                        scope.translations.hour = 'Hour';
                        scope.translations.settings = 'Settings';
                    };

                    scope.chartTypes = [{
                        name: 'day',
                        title: scope.translations.day

                    }, {
                        name: 'week',
                        title: scope.translations.week

                    }, {
                        name: 'month',
                        title: scope.translations.month

                    }, {
                        name: 'quarter',
                        title: scope.translations.quarter

                    }, {
                        name: 'year',
                        title: scope.translations.year

                    }, {
                        name: 'weekday',
                        title: scope.translations.weekday

                    }, {
                        name: 'hour',
                        title: scope.translations.hour

                    }, {
                        name: 'am_pm',
                        title: 'am | pm'
                    }];

                    //console.log('Options Return', ReturnedOptions);
                    return ReturnedOptions;
                };


                scope.showChart = function(name) {
                    scope.myOptions.defaultChart = name;
                    //console.log('Show Chart: ', scope.myOptions.defaultChart);

                    // Save selected Chart as dateChart 
                    scope.dateChart = scope.dateCharts[name];
                };

                // Array Gruppieren
                function groupBy(array, f) {
                    var groups = {};
                    array.forEach(function(o) {
                        var group = JSON.stringify(f(o));
                        groups[group] = groups[group] || [];
                        groups[group].push(o);
                    });
                    return Object.keys(groups).map(function(group) {
                        return groups[group];
                    });
                };

                // Array sortieren
                function sortByKey(array, key) {
                    return array.sort(function(a, b) {
                        var x = a[key];
                        var y = b[key];
                        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                    });
                };


                //  DateInfo für jede Messung hinzufügen
                function getBasicStatistics(x) {

                    var basicStatistics = {};
                    return basicStatistics = {
                        count: x.length,
                        min: simpleStatistics.min(x),
                        max: simpleStatistics.max(x),
                        sum: simpleStatistics.sum(x),
                        mean: simpleStatistics.mean(x),
                        variance: simpleStatistics.variance(x),
                        standard_deviation: simpleStatistics.standard_deviation(x),
                        sample_standard_deviation: simpleStatistics.sample_standard_deviation(x),
                        mode: simpleStatistics.mode(x),
                        mad: simpleStatistics.mad(x),
                        median: simpleStatistics.median(x),
                        geometric_mean: simpleStatistics.geometric_mean(x),
                        harmonic_mean: simpleStatistics.harmonic_mean(x),
                        iqr: simpleStatistics.iqr(x),
                        sample_skewness: simpleStatistics.sample_skewness(x),
                        t_test: simpleStatistics.harmonic_mean(x, simpleStatistics.mean(x)),
                        quantile_00: simpleStatistics.quantile(x, 0),
                        quantile_01: simpleStatistics.quantile(x, 0.1),
                        quantile_02: simpleStatistics.quantile(x, 0.2),
                        quantile_03: simpleStatistics.quantile(x, 0.3),
                        quantile_04: simpleStatistics.quantile(x, 0.4),
                        quantile_05: simpleStatistics.quantile(x, 0.5),
                        quantile_06: simpleStatistics.quantile(x, 0.6),
                        quantile_07: simpleStatistics.quantile(x, 0.7),
                        quantile_08: simpleStatistics.quantile(x, 0.8),
                        quantile_09: simpleStatistics.quantile(x, 0.9),
                        quantile_10: simpleStatistics.quantile(x, 1),
                        sample_variance: simpleStatistics.sample_variance(x)
                    };
                };

                // Resultate gruppieren
                function GroupResults(array) {
                    // Array gruppieren
                    var resultsGrouped = {};

                    var array_sort_time = sortByKey(array, scope.myOptions.dateField);

                    resultsGrouped.day = groupBy(array_sort_time, function(item) {
                        return [item.date_info.date_lime];
                    });
                    resultsGrouped.week = groupBy(array_sort_time, function(item) {
                        return [item.date_info.date_year_week];
                    });
                    resultsGrouped.month = groupBy(array_sort_time, function(item) {
                        return [item.date_info.date_year_month];
                    });

                    resultsGrouped.year = groupBy(array_sort_time, function(item) {
                        return [item.date_info.date_year];
                    });


                    var array_sort_weekday = sortByKey(scope.data, 'date_weekday');

                    resultsGrouped.weekday = groupBy(array_sort_weekday, function(item) {
                        return [item.date_info.date_weekday];
                    });

                    var array_sort_quarter = sortByKey(scope.data, 'date_quarter');

                    resultsGrouped.quarter = groupBy(array_sort_quarter, function(item) {
                        return [item.date_info.date_quarter];
                    });


                    var array_sort_hour = sortByKey(scope.data, 'date_time');

                    resultsGrouped.hour = groupBy(array_sort_hour, function(item) {
                        return [item.date_info.date_time.substring(0, 2)];
                    });

                    resultsGrouped.am_pm = groupBy(array_sort_hour, function(item) {
                        return [item.date_info.date_am_pm];
                    });

                    //resultsGrouped.weekday = sortByKey(resultsGrouped.weekday, date_info.date_weekday);

                    return resultsGrouped;
                };


                function getResultsArray(myObject, myField, isNumber) {

                    var result = [];
                    for (var x in myObject) {
                        var currentResult = myObject[x];

                        var dot = myField.indexOf(".");
                        var result_to_push;

                        if (dot === -1) {
                            result_to_push = currentResult[myField];

                        } else {
                            //if we have a dot in myField - create Folder/File logic
                            var folder = myField.substring(0, dot);
                            var file = myField.substring(dot + 1, myField.length);

                            var currentSubResult = currentResult[folder]
                            result_to_push = currentSubResult[file];
                        }

                        if (isNumber) {
                            result.push(parseFloat(result_to_push));
                        } else {
                            result.push(result_to_push);
                        }
                    };

                    //console.log('getResultsArray', result);
                    return result;
                };

                // Remove 'falsy' entries
                function cleanArray(actual) {
                    var newArray = new Array();
                    for (var i = 0; i < actual.length; i++) {
                        if (actual[i]) {
                            newArray.push(actual[i]);
                        }
                    }
                    return newArray;
                }

                // Resultate gruppieren
                function CreateChartObjects(array) {


                    var results = {};
                    for (var i in array) {


                        results[i] = {};
                        var all_result_groups = results[i];

                        //$scope.results[i].weekday = $scope.resultsGrouped.weekday[0].date_info.date_weekday;

                        for (var x in array[i]) {
                            var myCurrent = array[i];
                            var myRawResults = myCurrent[x];

                            all_result_groups[x] = {};
                            var current_result_group = all_result_groups[x];


                            // Store stuff in Results
                            current_result_group.value = [];

                            var resultsArray = getResultsArray(myRawResults, 'value', true);
                            current_result_group.value.push(resultsArray);

                            resultsArray = cleanArray(resultsArray);

                            current_result_group.basicStatistics = getBasicStatistics(resultsArray)


                            if (i === 'day') {
                                current_result_group.labels = getResultsArray(myRawResults, 'date_info.date_lime', false);
                            }
                            if (i === 'weekday') {
                                current_result_group.labels = getResultsArray(myRawResults, 'date_info.date_weekday_full', false);
                            }
                            if (i === 'week') {
                                current_result_group.labels = getResultsArray(myRawResults, 'date_info.date_year_week', false);
                            }
                            if (i === 'month') {
                                current_result_group.labels = getResultsArray(myRawResults, 'date_info.date_year_month', false);
                            }
                            if (i === 'quarter') {
                                current_result_group.labels = getResultsArray(myRawResults, 'date_info.date_quarter', false);
                            }
                            if (i === 'year') {
                                current_result_group.labels = getResultsArray(myRawResults, 'date_info.date_year', true);
                            }
                            if (i === 'am_pm') {
                                current_result_group.labels = getResultsArray(myRawResults, 'date_info.date_am_pm', false);
                            }
                            if (i === 'hour') {
                                current_result_group.labels = getResultsArray(myRawResults, 'date_info.date_time', false);
                                var formatLabel = [];
                                for (var x in current_result_group.labels) {
                                    var current = current_result_group.labels[x];
                                    current = current.substring(0, 2);
                                    formatLabel.push(current);
                                }
                                current_result_group.labels = formatLabel;
                            }


                        }
                    };





                    var dateCharts = {
                        "month": {
                            "labels": [],
                            "series": [
                                scope.myOptions.patient
                            ],
                            "data": [
                                []
                            ]
                        },
                        "day": {
                            "labels": [],
                            "series": [
                                scope.myOptions.patient
                            ],
                            "data": [
                                []
                            ]
                        },
                        "quarter": {
                            "labels": [],
                            "series": [
                                scope.myOptions.patient
                            ],

                            "data": [
                                []
                            ]
                        },
                        "am_pm": {
                            "labels": [],
                            "series": [
                                scope.myOptions.patient
                            ],

                            "data": [
                                []
                            ]
                        },
                        "hour": {
                            "labels": [],
                            "series": [
                                scope.myOptions.patient
                            ],

                            "data": [
                                []
                            ]
                        },
                        "week": {
                            "labels": [],
                            "series": [
                                scope.myOptions.patient
                            ],
                            "data": [
                                []
                            ]
                        },
                        "year": {
                            "labels": [],
                            "series": [
                                scope.myOptions.patient
                            ],
                            "data": [
                                []
                            ]
                        },
                        "weekday": {
                            "labels": [],
                            "series": [
                                scope.myOptions.patient
                            ],
                            "data": [
                                []
                            ]
                        }
                    };



                    // Save Labels & Data

                    for (var i in results) {

                        var currentGroup = results[i];



                        var current_result = dateCharts[i];
                        //console.log('currentGroup: ', i, currentGroup, current_result);

                        for (var x in currentGroup) {
                            //console.log('currentGroup loop: ', i, currentGroup[x]);
                            //var diff = currentGroup[x].basicStatistics.sample_standard_deviation / 2;


                            // Clean Results
                            //for (var y in currentGroup[x].value) {
                            //    var current = currentGroup[x].value[y];
                            //    current = cleanArray(current);
                            //}


                            //var calc_results = arr.filter(function(n){ return n != undefined }); 

                            //console.log('calc_results', calc_results);


                            //current_result.data[0].push(currentGroup[x].basicStatistics.median + diff);

                            var myMedian = currentGroup[x].basicStatistics.median;

                            if (myMedian) {
                                current_result.data[0].push(myMedian);
                            } else {
                                //console.log('myMedian - pushed null', myMedian);
                                current_result.data[0].push(null);
                            };
                            //current_result.data[2].push(currentGroup[x].basicStatistics.median - diff);
                            current_result.labels.push(currentGroup[x].labels[0]);
                        }

                    }

                    return dateCharts;
                };

                //  DateInfo für jede Messung hinzufügen
                function setDateInfo(array, firstWeekDay, language) {
                    for (var i in array) {
                        var current = array[i];
                        var date = current[scope.myOptions.dateField];
                        current.date_info = getDateInfo(date, firstWeekDay, language);
                        current.date_lime = current.date_info.date_lime;
                        current.date_weekday = current.date_info.date_weekday;
                        current.date_quarter = current.date_info.date_quarter;
                        current.date_time = current.date_info.date_time;
                        current.value = current[scope.myOptions.focusField];
                    }
                };

                //  Value (focusField) für jede Messung hinzufügen
                function setfocusField(array) {
                    for (var i in array) {
                        var current = array[i];
                        current.value = current[scope.myOptions.focusField]
                        current.focusField = current[scope.myOptions.focusField]
                    }
                };
                //  Fill 'missings' with empty dates.
                function fillDate(array) {
                    var last = array.length - 1;
                    var firstDate = array[0].datestamp;
                    var lastDate = array[last].datestamp;

                    var fullarray = betweenDate(firstDate, lastDate);

                    return fullarray;
                };


                //  Fill 'missings' with empty dates.
                function saveDataToFilled(data_array, result_array) {

                    setDateInfo(data_array, scope.myOptions.firstWeekDay, scope.myOptions.language);

                    // Group per day and save mean of 'focusField'
                    var days = groupBy(data_array, function(item) {
                        return [item.date_info.date_lime];
                    });

                    //console.log('DAYS: ', days, days.length);

                    for (var i in days) {
                        var current = days[i];
                        var count_values = current.length

                        var focusFieldSum = 0;
                        for (var x in current) {
                            var inner = current[x];
                            if (inner[scope.myOptions.focusField]) {
                                focusFieldSum = focusFieldSum + parseFloat(inner[scope.myOptions.focusField]);
                                current.date = inner.date_info.date_lime;
                            } else {
                                count_values = count_values - 1;
                            }
                        }
                        current.value = focusFieldSum / count_values;
                        //console.log('current', current.value);


                        // Generate fields.
                        for (var y in result_array) {
                            var currentResult = result_array[y];
                            currentResult.date = currentResult.date_info.date_lime;
                            //currentResult.value = null;
                            //currentResult.focusField = null;


                            // Save 'value'
                            if (currentResult.date === current.date) {
                                currentResult.value = current.value;
                                currentResult.focusField = current.value;
                                //console.log('==========================>', current.date, currentResult.date, currentResult.value);
                            };
                        };

                    };

                    return result_array;
                };

                function isDate(dateArg) {
                    var t = (dateArg instanceof Date) ? dateArg : (new Date(dateArg));
                    return !isNaN(t.valueOf());
                };

                function isValidRange(minDate, maxDate) {
                    return (new Date(minDate) <= new Date(maxDate));
                };

                function betweenDate(startDt, endDt) {
                    var error = ((isDate(endDt)) && (isDate(startDt)) && isValidRange(startDt, endDt)) ? false : true;
                    var between = [];
                    if (error) console.log('error occured!!!... Please Enter Valid Dates');
                    else {
                        var currentDate = new Date(startDt),
                            end = new Date(endDt);
                        while (currentDate <= end) {

                            var newDateToPush = {
                                'datestamp': new Date(currentDate)
                            };
                            between.push(newDateToPush);
                            currentDate.setDate(currentDate.getDate() + 1);
                        }
                    }
                    return between;
                };


                //  DateInfo hinzufügen
                function getDateInfo(myDate, firstWeekDay, language) {

                    var myWeekday = '';
                    if (firstWeekDay === 'Mo') {
                        myWeekday = $filter('amDateFormat')(myDate, 'e')
                        myWeekday = myWeekday - 1;

                        if (myWeekday === -1) {
                            myWeekday = 6;
                        };

                    } else {
                        myWeekday = $filter('amDateFormat')(myDate, 'e')
                    };

                    var myWeekdayFull = $filter('amDateFormat')(myDate, 'dddd');
                    if (language === 'De') {
                        if (myWeekdayFull === 'Sunday') {
                            myWeekdayFull = 'Sonntag';
                        };
                        if (myWeekdayFull === 'Monday') {
                            myWeekdayFull = 'Montag';
                        };
                        if (myWeekdayFull === 'Tuesday') {
                            myWeekdayFull = 'Dienstag';
                        };
                        if (myWeekdayFull === 'Wednesday') {
                            myWeekdayFull = 'Mittwoch';
                        };
                        if (myWeekdayFull === 'Thursday') {
                            myWeekdayFull = 'Donnerstag';
                        };
                        if (myWeekdayFull === 'Friday') {
                            myWeekdayFull = 'Freitag';
                        };
                        if (myWeekdayFull === 'Saturday') {
                            myWeekdayFull = 'Samstag';
                        };
                    };

                    var dateInfo = {};
                    return dateInfo = {
                        date: myDate,
                        date_compare: $filter('amDateFormat')(myDate, 'YYYYMMDD'),
                        date_lime: $filter('amDateFormat')(myDate, 'YYYY-MM-DD'),
                        date_sort: $filter('amDateFormat')(myDate, 'YYYYMMDDHHmm'),
                        date_year: $filter('amDateFormat')(myDate, 'YYYY'),
                        date_year_week: $filter('amDateFormat')(myDate, 'YYYY, ww'),
                        date_year_month: $filter('amDateFormat')(myDate, 'YYYY, MM'),
                        date_week: $filter('amDateFormat')(myDate, 'ww'),
                        date_time: $filter('amDateFormat')(myDate, 'HH:mm'),
                        date_month: $filter('amDateFormat')(myDate, 'MM'),
                        date_quarter: $filter('amDateFormat')(myDate, 'Q'),
                        date_weekday: myWeekday,
                        date_weekday_full: myWeekdayFull,
                        date_am_pm: $filter('amDateFormat')(myDate, 'a')
                    };
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
                scope.$watch('vg', function() {
                    if (scope.vg === undefined) {
                        scope.vg = {};
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
