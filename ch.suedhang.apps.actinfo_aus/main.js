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

            };

            // Run Public-Functions:
            $scope.d.functions.getAllCalculations();


            // Finishing: Console Info & Init = done.
            console.log('Welcome, ', $scope.d.dataMain.apps.current.name, $scope.d);
            $scope.d.init = true;
        });
    };
    $scope.loadMainData();


    $scope.actInfoInit = function() {


        // Relapsesubstanzen ermitteln

        var results = $scope.d.dataMain.survey_responses;

        results.forEach(function(result, myindex) {
            var response = result.entity.data.response;
            result.relapsesubstanzen = [];

            //var substanz = '';
            var my_result = {};
            var text = '';


            // Alkohol
            if (response['QYAZ020[VYAZ020a]'] === 'Y') {
                text = 'Alkohol';
                result.relapsesubstanzen.push(text);
            };

            // Opiate
            if (response['QYAZ020[VYAZ020b]'] === 'Y') {
                text = 'Opioide (Heroin, Methadon, Codein, usw.)';
                result.relapsesubstanzen.push(text);
            };

            // Kokain
            if (response['QYAZ020[VYAZ020c]'] === 'Y') {
                text = 'Kokain oder Derivate';
                result.relapsesubstanzen.push(text);
            };

            
            // Andere Stimulanzien
            if (response['QYAZ020[VYAZ020d]'] === 'Y') {
                text = 'andere Stimulanzien (Amphetamine, MDMA, Methamphetamine, usw.)';
                result.relapsesubstanzen.push(text);
            };

            // Hypnotika/Sedativa

            if (response['QYAZ020[VYAZ020e]'] === 'Y') {
                text = 'Schlafmittel/Beruhigungsmittel (Benzodiazepine usw.)';
                result.relapsesubstanzen.push(text);
            };

            // Halluzinogene

            if (response['QYAZ020[VYAZ020f]'] === 'Y') {
                text = 'Halluzinogene (LSD, Ketamin, usw.)';
                result.relapsesubstanzen.push(text);
            };

            // Weitere Substanzen
            if (response['QYAZ020[VYAZ020g]'] === 'Y') {
                text = 'Flüchtige Stoffe';
                result.relapsesubstanzen.push(text);
            };

            if (response['QYAZ020[VYAZ020h]'] === 'Y') {
                text = 'Cannabis';
                result.relapsesubstanzen.push(text);
            };

            if (response['QYAZ020[VYAZ020i]'] === 'Y') {
                text = 'Tabak';
                result.relapsesubstanzen.push(text);
            };

            if (response['QYAZ020[VYAZ020j]'] === 'Y') {
                text = response.VYAZ021j;
                result.relapsesubstanzen.push(text);
            };
        });

        $scope.d.current_response = [];
        $scope.d.current_response.push(results[results.length - 1]);
    };


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
            name: 'actInfo - Austritt',
            sql: include_as_js_string(
                export_Nora.sql)
        };
        module_packages.push(data_query);

        // Init the given Export Settings
        $scope.d.sql_box = $scope.d.functions.getDefaultExportSettings($scope.d.dataMain.params.app_id, module_packages);

    };

});
