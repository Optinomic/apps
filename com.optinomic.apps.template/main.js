/**
 * @name Optinomic - AppCtrl
 * ---------------------------------------
 * Controller of the Optinomic-Application.
 */
app.controller('AppCtrl', function($scope, dataService, scopeDService) {

    // -----------------------------------
    // Init
    // -----------------------------------

    // Data-Sharing (do not remove)
    $scope.d = scopeDService;


    // -----------------------------------
    // Functions
    // -----------------------------------

    $scope.loadMainData = function() {
        // -----------------------------------
        // Get Data: d.dataMain
        // -----------------------------------
        $scope.d.haveData = false;
        var dataPromiseMain = dataService.getMainAppData();
        dataPromiseMain.then(function(data) {

            // Save Data to $scope.d
            $scope.d.dataMain = data;

            // Check if we have survey_responses @ data.
            if (data.survey_responses.length !== 0) {
                console.log('(DATA): survey_responses:', data.survey_responses.length, data.survey_responses);
                $scope.d.haveData = true;


                // Run App-Functions:
                $scope.setExport();
                $scope.setDataView();
                $scope.setTimelineChartOptions();
                $scope.setTscoreChart();
                $scope.setStanineView();


            };

            // Run Public-Functions:
            $scope.d.functions.getAllCalculations();


            // Finishing: Console Info & Init = done.
            console.log('Welcome, ', $scope.d.dataMain.apps.current.name, $scope.d);
            $scope.d.init = true;
        });
    };
    $scope.loadMainData();





    $scope.setExport = function() {


        // ------------------------------------------------
        // Export - Pakete definieren
        // i n c l u d e _ a s _ j s _ s t r i n g
        // => (export.sql) muss sich in /includes befinden
        // ------------------------------------------------


        // Hinzufügen gespeicherter SQL-Dateien in /includes
        var module_packages = [];
        var data_query = {};

        data_query = {
            name: 'WHQOL-Example (with stay)',
            sql: __opapp_include_as_js_string(includes/export.sql)
        };
        module_packages.push(data_query);

        // Init the given Export Settings
        $scope.d.sql_box = $scope.d.functions.getDefaultExportSettings($scope.d.dataMain.params.app_id, module_packages);

    };




    // -----------------------------------
    // <score-threshold>
    // -----------------------------------

    // Ranges initialisieren
    $scope.scale_ranges = {
        "ranges": [{
            "from": 0,
            "to": 8,
            "result": "Keine Depression",
            "result_color": "green"
        }, {
            "from": 9,
            "to": 13,
            "result": "Minimale Depression",
            "result_color": "green"
        }, {
            "from": 14,
            "to": 19,
            "result": "Leichte Depression",
            "result_color": "orange"
        }, {
            "from": 20,
            "to": 28,
            "result": "Mittelschwere Depression",
            "result_color": "orange"
        }, {
            "from": 29,
            "to": 63,
            "result": "Schwere Depression",
            "result_color": "red"
        }]
    };



    // -----------------------------------
    // Chart: Timeline
    // -----------------------------------

    $scope.setTimelineChartOptions = function() {
        // -----------------------------------
        // Chart: Timeline Options
        // - fillDates:  Still experimental
        // -----------------------------------
        var myPatient = $scope.d.dataMain.patient.patient.data;
        var patientFullName = myPatient.last_name + ' ' + myPatient.first_name;

        $scope.d.timeline = {};
        $scope.d.timeline.data = $scope.d.dataMain.survey_responses_array;

        $scope.d.timeline.options = {
            'title': 'Tägliche Stimmung (∑)',
            'focusField': 'score',
            'dateField': 'filled',
            'fillDates': false,
            'firstWeekDay': 'Mo',
            'patient': patientFullName
        };
    };


    // -----------------------------------
    // Chart: T-Score <chart-tscore>
    // -----------------------------------

    $scope.getAnswer = function() {
        var score_answer = [{
            "question": "GSI (Global Severity Index)",
            "t_score": $scope.d.functions.getRandomInt(0, 100),
            "stanine": 0,
            "sum_score": 0
        }, {
            "question": "Psychotizismus",
            "t_score": $scope.d.functions.getRandomInt(0, 100),
            "stanine": 0,
            "sum_score": 0
        }, {
            "question": "Paranoides Denken",
            "t_score": $scope.d.functions.getRandomInt(0, 100),
            "stanine": 0,
            "sum_score": 0
        }, {
            "question": "Phobische Angst",
            "t_score": $scope.d.functions.getRandomInt(0, 100),
            "stanine": 0,
            "sum_score": 0
        }, {
            "question": "Aggressivität/ Feindseligkeit",
            "t_score": $scope.d.functions.getRandomInt(0, 100),
            "stanine": 0,
            "sum_score": 0
        }, {
            "question": "Ängstlichkeit",
            "t_score": $scope.d.functions.getRandomInt(0, 100),
            "stanine": 0,
            "sum_score": 0
        }, {
            "question": "Depressivität",
            "t_score": $scope.d.functions.getRandomInt(0, 100),
            "stanine": 0,
            "sum_score": 0
        }, {
            "question": "Unsicherheit im Sozialkontakt",
            "t_score": $scope.d.functions.getRandomInt(0, 100),
            "stanine": 0,
            "sum_score": 0
        }, {
            "question": "Zwanghaftigkeit",
            "t_score": $scope.d.functions.getRandomInt(0, 100),
            "stanine": 0,
            "sum_score": 0
        }, {
            "question": "Somatisierung",
            "t_score": $scope.d.functions.getRandomInt(0, 100),
            "stanine": 0,
            "sum_score": 0
        }];

        return score_answer;
    };

    $scope.setTscoreChart = function() {

        // Options
        $scope.options_plot = {
            'show_scores': true
        };

        // Results
        $scope.plotdata = [{
            "label": "Eintritt",
            "scores": $scope.getAnswer()
        }, {
            "label": "Austritt",
            "scores": $scope.getAnswer()
        }];
    };


    // -----------------------------------
    // Stanine - Chart  <chart-stanine>
    // -----------------------------------

    $scope.getAnswerStanine = function() {
        var score_answer = [{
            "question": "Stress durch Unsicherheit",
            "sub_left": "Stabiles Umfeld. Keine Belastung.",
            "sub_right": "Unsicherheit in wichtigen Lebensbereichen",
            "stanine": $scope.d.functions.getRandomInt(1, 9),
            "sum_score": $scope.d.functions.getRandomInt(0, 100)
        }, {
            "question": "Stress durch Überforderung",
            "sub_left": "Keine Belastung durch Überforderung",
            "sub_right": "Überforderung in wichtigen Lebensbereichen",
            "stanine": $scope.d.functions.getRandomInt(1, 9),
            "sum_score": $scope.d.functions.getRandomInt(0, 100)
        }, {
            "question": "Stress durch Verlust",
            "sub_left": "Keine Belastung durch Verlust und negative Ereignisse",
            "sub_right": "Belastung durch Verlust und negative Ereignisse",
            "stanine": $scope.d.functions.getRandomInt(1, 9),
            "sum_score": $scope.d.functions.getRandomInt(0, 100)
        }, {
            "question": "Soziale Unterstützung",
            "sub_left": "Ungünstig: Kaum Unterstützung durch andere",
            "sub_right": "Gut: Viel Unterstützung durch Freunde und Bekannte",
            "stanine": $scope.d.functions.getRandomInt(1, 9),
            "sum_score": $scope.d.functions.getRandomInt(0, 100)
        }];

        return score_answer;
    };

    $scope.setStanineView = function() {

        $scope.stanine = {};
        $scope.stanine.data = [{
            "label": "Eintritt",
            "scores": $scope.getAnswerStanine()
        }, {
            "label": "Verlauf 12.12.1996",
            "scores": $scope.getAnswerStanine()
        }, {
            "label": "Austritt",
            "scores": $scope.getAnswerStanine()
        }];

        $scope.stanine.options = {
            "population_name": "Männer, 31-50 Jahre",
            "norm_name": "Normalbereich",
            "start_result": $scope.stanine.data.length - 1
        };
    };


    // -----------------------------------
    // DataView : angulargrid.com
    // -----------------------------------
    $scope.setDataView = function() {

        // If we have multiple surveys - make sure to take the right 'responses'.
        var currentResultGroup = 0;
        $scope.d.dataMain.survey_responses_group_definitions.forEach(function(current_group_def, myindex) {
            if (current_group_def.survey === 'Second example survey') {
                currentResultGroup = current_group_def.id;
            };
        });

        // Loop trough all responses from selected 'survey-group' above and save respnses in survey_responses_array
        $scope.d.dataMain.survey_responses_array = [];
        $scope.d.dataMain.survey_responses_group[currentResultGroup].forEach(function(current_result, myindex) {
            var my_response = current_result.entity.data.response;

            // If ng-survey survey @ some more info to 'response'.
            my_response.filled = current_result.entity.data.filled;
            my_response.survey_name = current_result.event.survey_name;

            $scope.d.dataMain.survey_responses_array.push(my_response);
        });
        var resultsArray = $scope.d.dataMain.survey_responses_array;


        // automatic or manually like (columnDefsManually)
        $scope.d.grid.columnDefs = $scope.d.functions.createColumnDefs($scope.d.grid.rowData, true);

        // columnDefsManually: If you want to create columnDefs manually:
        // Ref: http://www.angulargrid.com/angular-grid-column-definitions/index.php
        var columnDefsManually = [{
            headerTooltip: "Datum",
            headerName: "Datum",
            editable: true,
            suppressSizeToFit: true,
            width: 145,
            field: "datestamp",
            cellClass: 'md-body-1',
        }, {
            headerTooltip: "Suchtdruck_1",
            headerName: "Suchtdruck (Int)",
            cellClass: 'md-body-2',
            suppressSizeToFit: true,
            width: 110,
            valueGetter: 'parseInt(data.Suchtdruck_1)',
            filter: 'number'
        }, {
            headerName: "Bemerkungen",
            editable: true,
            cellClass: 'md-body-1',
            field: "diary",
            filter: 'text'
        }, {
            headerTooltip: "PID",
            headerName: "Patient-ID",
            editable: false,
            field: "PID",
            hide: true,
            cellClass: 'md-body-1',
            width: 90
        }, {
            headerTooltip: "FID",
            headerName: "Fall-ID",
            editable: false,
            field: "FID",
            hide: true,
            cellClass: 'md-body-1',
            width: 90
        }];


        // DataView - Options
        $scope.d.grid.options = $scope.d.grid.default_options;
        $scope.d.grid.options.rowData = $scope.d.grid.rowData;
        $scope.d.grid.options.columnDefs = $scope.d.grid.columnDefs;


        //console.log('dataGRID: ', $scope.d.grid);
    };


    // Testdata
    $scope.d.craving = [{
        'Suchtdruck_1': '52',
        'datestamp': '2014-10-17 12:21:57',
        'refurl': 'http://demo.optinomic.org/runaction/Suchtdruck%20%28Craving%29/do%20craving%20now/25',
        'ipaddr': '178.82.213.88',
        'optinomixHASH': '4284fe621ec08b05',
        'submitdate': '2014-10-17 12:21:57',
        'survey_name': 'craving',
        'startdate': '2014-10-17 12:20:51',
        'diary': 'Created by [Do it now craving] - Button',
        'startlanguage': 'de',
        'PID': '12',
        'id': '97',
        'something': 1052,
        'FID': '654321',
        'lastpage': '5'
    }, {
        'Suchtdruck_1': '88',
        'datestamp': '2014-10-19 19:04:04',
        'refurl': '',
        'ipaddr': '178.82.213.88',
        'optinomixHASH': '14137380042493700000001',
        'submitdate': '2014-10-19 19:04:04',
        'survey_name': 'craving',
        'startdate': '2014-10-19 19:03:44',
        'diary': 'Ich wünsche Dir einen wunderschönen Tag \n',
        'startlanguage': 'de',
        'PID': '12',
        'id': '103',
        'something': null,
        'FID': '654321',
        'lastpage': '5'
    }, {
        'Suchtdruck_1': '7',
        'datestamp': '2014-10-20 20:43:08',
        'refurl': '',
        'ipaddr': '178.82.213.88',
        'optinomixHASH': '14138244019509190000001',
        'submitdate': '2014-10-20 20:43:08',
        'survey_name': 'craving',
        'startdate': '2014-10-20 20:42:51',
        'diary': 'Another - 21h - entry.',
        'startlanguage': 'de',
        'PID': '12',
        'id': '107',
        'something': 1007,
        'FID': '654321',
        'lastpage': '5'
    }, {
        'Suchtdruck_1': '1',
        'datestamp': '2014-10-20 21:06:22',
        'refurl': '',
        'ipaddr': '178.82.213.88',
        'optinomixHASH': '14136516032177690000001',
        'submitdate': '2014-10-20 21:06:22',
        'survey_name': 'craving',
        'startdate': '2014-10-20 21:06:07',
        'diary': 'Another - 21:06',
        'startlanguage': 'de',
        'PID': '12',
        'id': '108',
        'something': 1001,
        'FID': '654321',
        'lastpage': '5'
    }, {
        'Suchtdruck_1': '74',
        'datestamp': '2014-10-21 19:00:41',
        'refurl': '',
        'ipaddr': '178.82.213.88',
        'optinomixHASH': '14139108024947040000001',
        'submitdate': '2014-10-21 19:00:41',
        'survey_name': 'craving',
        'startdate': '2014-10-21 19:00:30',
        'diary': '19h done',
        'startlanguage': 'de',
        'PID': '12',
        'id': '110',
        'something': 1074,
        'FID': '654321',
        'lastpage': '5'
    }, {
        'Suchtdruck_1': '65',
        'datestamp': '2014-10-22 19:00:35',
        'refurl': '',
        'ipaddr': '178.82.213.88',
        'optinomixHASH': '14139972021894060000001',
        'submitdate': '2014-10-22 19:00:35',
        'survey_name': 'craving',
        'startdate': '2014-10-22 19:00:26',
        'diary': '19h ',
        'startlanguage': 'de',
        'PID': '12',
        'id': '114',
        'something': 1065,
        'FID': '654321',
        'lastpage': '5'
    }, {
        'Suchtdruck_1': '76',
        'datestamp': '2014-10-23 19:01:08',
        'refurl': '',
        'ipaddr': '178.82.213.88',
        'optinomixHASH': '14140836022057210000001',
        'submitdate': '2014-10-23 19:01:08',
        'survey_name': 'craving',
        'startdate': '2014-10-23 19:00:59',
        'diary': '19h - done',
        'startlanguage': 'de',
        'PID': '12',
        'id': '115',
        'something': 1076,
        'FID': '654321',
        'lastpage': '5'
    }, {
        'Suchtdruck_1': '63',
        'datestamp': '2014-11-03 08:44:43',
        'refurl': 'http://demo.optinomic.org/patient/25',
        'ipaddr': '178.82.213.88',
        'optinomixHASH': '14149513586844010000001',
        'submitdate': '2014-11-03 08:44:43',
        'survey_name': 'craving',
        'startdate': '2014-11-03 08:44:14',
        'diary': 'Clicked the button at patient - page.',
        'startlanguage': 'de',
        'PID': '12',
        'id': '117',
        'something': null,
        'FID': '654321',
        'lastpage': '5'
    }, {
        'Suchtdruck_1': '50',
        'datestamp': '2014-11-03 23:58:11',
        'refurl': '',
        'ipaddr': '178.82.213.88',
        'optinomixHASH': '14150377811281420000001',
        'submitdate': '2014-11-03 23:58:11',
        'survey_name': 'craving',
        'startdate': '2014-11-03 23:57:40',
        'diary': 'Mail from 21h - filled out @ 24h',
        'startlanguage': 'de',
        'PID': '12',
        'id': '118',
        'something': 1050,
        'FID': '654321',
        'lastpage': '5'
    }, {
        'Suchtdruck_1': '73',
        'datestamp': '2014-11-05 07:21:19',
        'refurl': '',
        'ipaddr': '213.55.184.232',
        'optinomixHASH': '14151241706791780000001',
        'submitdate': '2014-11-05 07:21:19',
        'survey_name': 'craving',
        'startdate': '2014-11-05 07:20:59',
        'diary': 'Done ',
        'startlanguage': 'de',
        'PID': '12',
        'id': '119',
        'something': 1073,
        'FID': '654321',
        'lastpage': '5'
    }, {
        'Suchtdruck_1': '85',
        'datestamp': '2014-11-05 22:39:44',
        'refurl': '',
        'ipaddr': '178.82.213.88',
        'optinomixHASH': '14152105862270580000001',
        'submitdate': '2014-11-05 22:39:44',
        'survey_name': 'craving',
        'startdate': '2014-11-05 22:38:47',
        'diary': 'First Mail - received @ 22:39',
        'startlanguage': 'de',
        'PID': '12',
        'id': '120',
        'something': 1085,
        'FID': '654321',
        'lastpage': '5'
    }, {
        'Suchtdruck_1': '69',
        'datestamp': '2014-11-06 19:40:49',
        'refurl': '',
        'ipaddr': '178.82.213.88',
        'optinomixHASH': '2e5c3412deda4289',
        'submitdate': '2014-11-06 19:40:49',
        'survey_name': 'craving',
        'startdate': '2014-11-06 19:40:31',
        'diary': '19:34 Mail',
        'startlanguage': 'de',
        'PID': '12',
        'id': '122',
        'something': 1069,
        'FID': '654321',
        'lastpage': '5'
    }, {
        'Suchtdruck_1': '83',
        'datestamp': '2014-11-07 22:16:57',
        'refurl': '',
        'ipaddr': '178.82.213.88',
        'optinomixHASH': '14153845888512990000001',
        'submitdate': '2014-11-07 22:16:57',
        'survey_name': 'craving',
        'startdate': '2014-11-07 22:15:33',
        'diary': 'First reminder mail - initial mail ignored. If no more mail is coming = perfect! :) ',
        'startlanguage': 'de',
        'PID': '12',
        'id': '123',
        'something': 1083,
        'FID': '654321',
        'lastpage': '5'
    }, {
        'Suchtdruck_1': '69',
        'datestamp': '2014-11-09 08:08:20',
        'refurl': '',
        'ipaddr': '178.82.213.88',
        'optinomixHASH': '14154702512222380000001',
        'submitdate': '2014-11-09 08:08:20',
        'survey_name': 'craving',
        'startdate': '2014-11-09 08:07:55',
        'diary': '7h mail. Working fine ',
        'startlanguage': 'de',
        'PID': '12',
        'id': '124',
        'something': 1069,
        'FID': '654321',
        'lastpage': '5'
    }, {
        'Suchtdruck_1': '50',
        'datestamp': '2014-11-09 19:18:06',
        'refurl': '',
        'ipaddr': '178.82.213.88',
        'optinomixHASH': '14155569998988060000001',
        'submitdate': '2014-11-09 19:18:06',
        'survey_name': 'craving',
        'startdate': '2014-11-09 19:17:56',
        'diary': '19:17',
        'startlanguage': 'de',
        'PID': '12',
        'id': '129',
        'something': 1050,
        'FID': '654321',
        'lastpage': '5'
    }, {
        'Suchtdruck_1': '71',
        'datestamp': '2014-11-10 19:32:51',
        'refurl': '',
        'ipaddr': '178.82.213.88',
        'optinomixHASH': '14156431713785170000001',
        'submitdate': '2014-11-10 19:32:51',
        'survey_name': 'craving',
        'startdate': '2014-11-10 19:32:36',
        'diary': 'It works ',
        'startlanguage': 'de',
        'PID': '12',
        'id': '130',
        'something': 1071,
        'FID': '654321',
        'lastpage': '5'
    }, {
        'Suchtdruck_1': '21',
        'datestamp': '2014-11-11 22:02:35',
        'refurl': '',
        'ipaddr': '178.82.213.88',
        'optinomixHASH': '14157295822147370000001',
        'submitdate': '2014-11-11 22:02:35',
        'survey_name': 'craving',
        'startdate': '2014-11-11 22:02:28',
        'diary': '',
        'startlanguage': 'de',
        'PID': '12',
        'id': '134',
        'something': 1021,
        'FID': '654321',
        'lastpage': '5'
    }, {
        'Suchtdruck_1': '50',
        'datestamp': '2014-11-12 19:13:38',
        'refurl': '',
        'ipaddr': '178.82.213.88',
        'optinomixHASH': '14158159705041450000001',
        'submitdate': '2014-11-12 19:13:38',
        'survey_name': 'craving',
        'startdate': '2014-11-12 19:13:31',
        'diary': '19:13',
        'startlanguage': 'de',
        'PID': '12',
        'id': '136',
        'something': 1050,
        'FID': '654321',
        'lastpage': '5'
    }, {
        'Suchtdruck_1': '50',
        'datestamp': '2014-11-13 21:13:37',
        'refurl': '',
        'ipaddr': '178.82.213.88',
        'optinomixHASH': '14159023711522110000001',
        'submitdate': '2014-11-13 21:13:37',
        'survey_name': 'craving',
        'startdate': '2014-11-13 21:13:32',
        'diary': '',
        'startlanguage': 'de',
        'PID': '12',
        'id': '140',
        'something': 1050,
        'FID': '654321',
        'lastpage': '5'
    }, {
        'Suchtdruck_1': '50',
        'datestamp': '2014-11-14 19:21:50',
        'refurl': '',
        'ipaddr': '178.82.213.88',
        'optinomixHASH': '14159887748010720000001',
        'submitdate': '2014-11-14 19:21:50',
        'survey_name': 'craving',
        'startdate': '2014-11-14 19:21:37',
        'diary': '19:13',
        'startlanguage': 'de',
        'PID': '12',
        'id': '141',
        'something': 1050,
        'FID': '654321',
        'lastpage': '5'
    }, {
        'Suchtdruck_1': '11',
        'datestamp': '2014-11-15 23:14:36',
        'refurl': '',
        'ipaddr': '178.82.213.88',
        'optinomixHASH': '14160751712906030000001',
        'submitdate': '2014-11-15 23:14:36',
        'survey_name': 'craving',
        'startdate': '2014-11-15 23:14:16',
        'diary': '23:13 Reminder ',
        'startlanguage': 'de',
        'PID': '12',
        'id': '146',
        'something': 1011,
        'FID': '654321',
        'lastpage': '5'
    }, {
        'Suchtdruck_1': '9',
        'datestamp': '2014-11-16 19:34:06',
        'refurl': '',
        'ipaddr': '178.82.213.88',
        'optinomixHASH': '14161615695617110000001',
        'submitdate': '2014-11-16 19:34:06',
        'survey_name': 'craving',
        'startdate': '2014-11-16 19:33:46',
        'diary': 'Just done ',
        'startlanguage': 'de',
        'PID': '12',
        'id': '147',
        'something': 1009,
        'FID': '654321',
        'lastpage': '5'
    }, {
        'Suchtdruck_1': '71',
        'datestamp': '2014-11-17 19:14:37',
        'refurl': '',
        'ipaddr': '178.82.213.88',
        'optinomixHASH': '14162479738556080000001',
        'submitdate': '2014-11-17 19:14:37',
        'survey_name': 'craving',
        'startdate': '2014-11-17 19:14:26',
        'diary': 'Soon! :-)',
        'startlanguage': 'de',
        'PID': '12',
        'id': '150',
        'something': 1071,
        'FID': '654321',
        'lastpage': '5'
    }, {
        'Suchtdruck_1': '27',
        'datestamp': '2014-11-18 19:16:39',
        'refurl': '',
        'ipaddr': '10.176.233.247',
        'optinomixHASH': '14163343771849490000001',
        'submitdate': '2014-11-18 19:16:39',
        'survey_name': 'craving',
        'startdate': '2014-11-18 19:16:11',
        'diary': 'Not deactivated already? ',
        'startlanguage': 'de',
        'PID': '12',
        'id': '155',
        'something': 1027,
        'FID': '654321',
        'lastpage': '5'
    }, {
        'Suchtdruck_1': '61',
        'datestamp': '2014-11-24 11:08:24',
        'refurl': 'http://demo.optinomic.org/patient/25',
        'ipaddr': '178.82.213.88',
        'optinomixHASH': '54567848a61d38f',
        'submitdate': '2014-11-24 11:08:24',
        'survey_name': 'craving',
        'startdate': '2014-11-24 11:08:05',
        'diary': 'On activation - now every 2 days @ 19h',
        'startlanguage': 'de',
        'PID': '12',
        'id': '166',
        'something': 1061,
        'FID': '654321',
        'lastpage': '5'
    }, {
        'Suchtdruck_1': '100',
        'datestamp': '2014-11-24 19:11:18',
        'refurl': '',
        'ipaddr': '178.82.213.88',
        'optinomixHASH': '14168521788955520000001',
        'submitdate': '2014-11-24 19:11:18',
        'survey_name': 'craving',
        'startdate': '2014-11-24 19:10:34',
        'diary': 'Already today? Next should be Wednesday. ',
        'startlanguage': 'de',
        'PID': '12',
        'id': '167',
        'something': 1100,
        'FID': '654321',
        'lastpage': '5'
    }, {
        'Suchtdruck_1': '75',
        'datestamp': '2014-11-26 19:04:50',
        'refurl': '',
        'ipaddr': '178.82.213.88',
        'optinomixHASH': '14170249737049020000001',
        'submitdate': '2014-11-26 19:04:50',
        'survey_name': 'craving',
        'startdate': '2014-11-26 19:04:31',
        'diary': 'Mittwoch -> Freitag should be next.',
        'startlanguage': 'de',
        'PID': '12',
        'id': '171',
        'something': 1075,
        'FID': '654321',
        'lastpage': '5'
    }, {
        'Suchtdruck_1': '71',
        'datestamp': '2014-11-28 19:04:48',
        'refurl': '',
        'ipaddr': '178.82.213.88',
        'optinomixHASH': '14171977715331030000001',
        'submitdate': '2014-11-28 19:04:48',
        'survey_name': 'craving',
        'startdate': '2014-11-28 19:04:35',
        'diary': 'Firday - it works! :-)',
        'startlanguage': 'de',
        'PID': '12',
        'id': '174',
        'something': 1071,
        'FID': '654321',
        'lastpage': '5'
    }, {
        'Suchtdruck_1': '50',
        'datestamp': '2014-06-30 19:10:00',
        'refurl': '',
        'ipaddr': '178.82.213.88',
        'optinomixHASH': '14173705778560900000001',
        'submitdate': '2014-11-30 19:10:00',
        'survey_name': 'craving',
        'startdate': '2014-11-30 19:09:55',
        'diary': '',
        'startlanguage': 'de',
        'PID': '12',
        'id': '182',
        'something': 1050,
        'FID': '654321',
        'lastpage': '5'
    }, {
        'Suchtdruck_1': '12',
        'datestamp': '2014-12-02 19:03:56',
        'refurl': '',
        'ipaddr': '178.82.213.88',
        'optinomixHASH': '14175433891820340000001',
        'submitdate': '2014-12-02 19:03:56',
        'survey_name': 'craving',
        'startdate': '2014-12-02 19:03:49',
        'diary': '',
        'startlanguage': 'de',
        'PID': '12',
        'id': '184',
        'something': 1012,
        'FID': '654321',
        'lastpage': '5'
    }, {
        'Suchtdruck_1': '71',
        'datestamp': '2014-07-04 20:03:39',
        'refurl': '',
        'ipaddr': '178.82.213.88',
        'optinomixHASH': '14177161619822780000001',
        'submitdate': '2014-12-04 20:03:39',
        'survey_name': 'craving',
        'startdate': '2014-12-04 20:03:35',
        'diary': '',
        'startlanguage': 'de',
        'PID': '12',
        'id': '187',
        'something': 1071,
        'FID': '654321',
        'lastpage': '5'
    }, {
        'Suchtdruck_1': '66',
        'datestamp': '2014-12-05 11:35:07',
        'refurl': 'http://demo.optinomic.org/runaction/Suchtdruck%20%28Craving%29/do%20craving%20now/25',
        'ipaddr': '178.82.213.88',
        'optinomixHASH': '55455ed9e59a09d2',
        'submitdate': '2014-12-05 11:35:07',
        'survey_name': 'craving',
        'startdate': '2014-12-05 11:35:04',
        'diary': '',
        'startlanguage': 'de',
        'PID': '12',
        'id': '188',
        'something': 1066,
        'FID': '654321',
        'lastpage': '5'
    }, {
        'Suchtdruck_1': '50',
        'datestamp': '2014-12-05 11:42:47',
        'refurl': 'http://demo.optinomic.org/runaction/Suchtdruck%20%28Craving%29/do%20craving%20now/25',
        'ipaddr': '178.82.213.88',
        'optinomixHASH': '7aa71f9c78f78e59',
        'submitdate': '2014-12-05 11:42:47',
        'survey_name': 'craving',
        'startdate': '2014-12-05 11:42:43',
        'diary': '',
        'startlanguage': 'de',
        'PID': '12',
        'id': '191',
        'something': 1050,
        'FID': '654321',
        'lastpage': '5'
    }];



});
