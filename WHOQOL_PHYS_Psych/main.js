/**
 * @name Optinomic - AppCtrl
 * ---------------------------------------
 * Controller of the Optinomic-Application.
 */
app.controller('AppCtrl', function($scope, $filter, dataService, scopeDService) {

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
                $scope.setCurrentResultDate();
            };

            // Init - Data Export
            $scope.setExport();

            // Run Public-Functions:
            $scope.d.functions.getAllCalculations();

            // Finishing: Console Info & Init = done.
            console.log('Welcome, ', $scope.d.dataMain.apps.current.name, $scope.d);
            $scope.d.init = true;
        });
    };
    $scope.loadMainData();

    // -----------------------------------
    // Navigation
    // -----------------------------------

    $scope.d.navigator = 0;

    $scope.setCurrentResultDate = function() {
        var date = $scope.d.dataMain.calculations[0].calculation_results[$scope.d.navigator].response.data.filled;

        $scope.d.dataMain.calculations[0].calculation_results[$scope.d.navigator].response.data.filled_date = {
            'filled_datestamp': date,
            'filled_date': $filter("amDateFormat")(date, 'DD.MM.YYYY'),
            'filled_time': $filter("amDateFormat")(date, 'HH:mm')
        };

        //console.log('setCurrentResultDate', $scope.d.dataMain.calculations[0].calculation_results[$scope.d.navigator].response.data);
    };


    $scope.prev = function() {
        var count = $scope.d.dataMain.calculations[0].calculation_results.length - 1;

        if ($scope.d.navigator === 0) {
            $scope.d.navigator = count;
        } else {
            $scope.d.navigator = $scope.d.navigator - 1
        };
        $scope.setCurrentResultDate();
    };

    $scope.next = function() {
        var count = $scope.d.dataMain.calculations[0].calculation_results.length - 1;

        if (count === $scope.d.navigator) {
            $scope.d.navigator = 0;
        } else {
            $scope.d.navigator = $scope.d.navigator + 1
        };
        $scope.setCurrentResultDate();

    };


    // -------------------
    // Data-Export
    // -------------------
    $scope.setExport = function() {


        // ------------------------------------------------
        // Export - Pakete definieren
        // i n c l u d e _ a s _ j s _ s t r i n g 
        // => (export.sql) muss sich in /includes befinden
        // ------------------------------------------------

        $scope.d.sql_box = $scope.d.functions.getDefaultExportSettings($scope.d.dataMain.params.app_id);

        // Hinzufügen gespeicherter SQL-Dateien in /includes
        var data_package = {};
        //data_package = {
        //    name: 'Name der Abfrage',
        //    sql: in   clude_as_js_string(
        //        export.sql)
        //};
        //$scope.d.sql_box.packages.push(data_package);


        // Default setzen.
        //$scope.d.export_obj.sql_field = $scope.d.export_obj.packages[0].sql;
        console.log('setExport: ', $scope.d.export_obj);

    };


});
