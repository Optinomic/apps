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
                $scope.setDataView();
            };

            // Run Public-Functions:
            $scope.d.functions.getAllCalculations();

            // Run App-Functions:
            $scope.setTimelineChartOptions();
            $scope.setTscoreChart();
            $scope.setStanineView();

            // Finishing: Console Info & Init = done.
            console.log('Welcome, ', $scope.d.dataMain.apps.current.name, $scope.d);
            $scope.d.init = true;
        });
    };
    $scope.loadMainData();


    // -----------------------------------
    // Download
    // -----------------------------------
    $scope.d.export = {};
    $scope.d.export.data = {};
    $scope.d.export.have_data = false;
    $scope.d.export.header = 'True';
    $scope.d.export.direct = 'False';
    $scope.d.export.format = 'csv';
    $scope.d.export.file = 1;
    $scope.d.export.delimitter = ';';
    $scope.d.export.sql_field = "select * from information_schema.tables";

    $scope.d.export.sql_field = "SELECT patient.id , patient.last_name , ((cast(response AS json))->>'BSCL[sq504V40]') as gaga , recode_into(((cast(response AS json))->>'BSCL[sq504V40]'), '', '-1') as sq504V40 , recode_into(((cast(response AS json))->>'BSCL[sq504V40]'), '', '0') + 2 as gaga FROM survey_response INNER JOIN patient ON(survey_response.patient = patient.id) WHERE module = 'ch.suedhang.apps.bscl.anq'";


    // ToDO: M4 - Import - remove new lines.

    //var sql_import_string = "in_clude(`templates/export.sql')";
    //$scope.d.export.sql_field = sql_import_string.join(' *\n *');

    //$scope.d.export.sql_field = "SELECT 
    //patient.id, patient.last_name, ((cast(response AS json)) - >> 'BSCL[sq504V40]') as gaga, recode_into(((cast(response AS json)) - >> 'BSCL[sq504V40]'), '', '-1') as sq504V40, recode_into(((cast(response AS json)) - >> 'BSCL[sq504V40]'), '', '0') + 2 as gaga
    //FROM survey_response INNER JOIN patient ON(survey_response.patient = patient.id)
    //WHERE module = 'ch.suedhang.apps.bscl.anq'
    //";

    $scope.export = function() {

        var api = dataService.runSQL($scope.d.export.sql_field, $scope.d.export.delimitter, $scope.d.export.header, $scope.d.export.format, $scope.d.export.direct);
        var aSQL = dataService.getData(api);

        aSQL.then(function(data) {
            $scope.d.export.have_data = true;
            $scope.d.export.data = data;
            console.log('export - Done: ', $scope.d.export.data);
        });

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
            'title': 'Suchtdruck (∑)',
            'focusField': 'dailyMood[mood]',
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

        var resultsArray = $scope.d.dataMain.survey_responses_array;



        $scope.d.grid = {};
        $scope.d.grid.rowData = $scope.d.functions.enrichResults(resultsArray);

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
        $scope.d.grid.options = {
            headerHeight: 45,
            rowHeight: 28,
            rowData: $scope.d.grid.rowData,
            columnDefs: $scope.d.grid.columnDefs,
            //pinnedColumnCount: 1,
            dontUseScrolls: false,
            enableFilter: true,
            rowSelection: 'single',
            enableColResize: true,
            enableCellExpressions: true,
            enableSorting: true,
            showToolPanel: false
        };


        //console.log('dataGRID: ', $scope.d.grid);
    };


});
