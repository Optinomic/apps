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

    // -------------------
    // Navigation
    // -------------------
    $scope.prev = function() {
        var count = $scope.d.dataMain.calculations[0].calculation_results.length - 1;

        if ($scope.d.navigator === 0) {
            $scope.d.navigator = count;
        } else {
            $scope.d.navigator = $scope.d.navigator - 1
        };
        $scope.setCurrentResultDate();
        $scope.setAnswerFilter($scope.d.show_answers);
    };

    $scope.next = function() {
        var count = $scope.d.dataMain.calculations[0].calculation_results.length - 1;

        if (count === $scope.d.navigator) {
            $scope.d.navigator = 0;
        } else {
            $scope.d.navigator = $scope.d.navigator + 1
        };
        $scope.setCurrentResultDate();
        $scope.setAnswerFilter($scope.d.show_answers);
    };

        //console.log('dataGRID: ', $scope.d.grid);

    // -------------------
    // Data-Export
    // -------------------
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
            name: 'BDI-II',
            sql: include_as_js_string(
                export.sql)
        };
        module_packages.push(data_query);

        // Init the given Export Settings
        $scope.d.sql_box = $scope.d.functions.getDefaultExportSettings($scope.d.dataMain.params.app_id, module_packages);
    };
});