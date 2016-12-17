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
        $scope.d.haveData = true;
        var dataPromiseMain = dataService.getMainAppData();
        dataPromiseMain.then(function(data) {

            // Save Data to $scope.d
            $scope.d.dataMain = data;

            // Save results from "tmt_scores" in $scope
            $scope.getCalculation();

            // Finishing: Console Info & Init = done.
            console.log('Welcome, ', $scope.d.dataMain.apps.current.name, $scope.d);
            $scope.d.init = true;

        });
    };
    $scope.loadMainData();


    // -----------------------------------
    // Klinikstichprobe
    // -----------------------------------

    $scope.getCalculation = function() {
        $scope.d.loaded = false;
        $scope.d.app = 'com.optinomic.user.apps.ks_isk';
        $scope.d.calculation = 'isk_klinikstichprobe';


        // Get specific calculation
        var call = dataService.getAppCalculationsUser($scope.d.app, $scope.d.calculation);

        call.success(function(data) {
            // Save Data to $scope.d
            $scope.d.calculations = data.calculation_result;
            console.log('(DATA): getCalculation | Klinikstichprobe: ', $scope.d.calculations);



            $scope.d.ks = {};
            $scope.d.ks.result_explorer = {
                "types": {
                    "all": [{
                        "id": 0,
                        "name": 'Alle Variablen'
                    }, {
                        "id": 1,
                        "name": 'Einzelne Variablen'
                    }],
                    "selected": null,
                    "selected_var": null
                },
                "ks": {}
            };
            $scope.d.ks.result_explorer.types.selected = $scope.d.ks.result_explorer.types.all[1];


            // Set 'last' as Default
            var dimensions = angular.copy(data.calculation_result.definitions.dimensions_app);
            dimensions.forEach(function(current_dim, dimID) {
                current_dim.selected = current_dim.array[current_dim.array.length - 1];
            });

            // Fokus Variable
            $scope.d.ks.result_explorer.types.selected_var = data.calculation_result.definitions.variables_array[0];


            // Anzahl Messungen bestimmen
            var n_scores = 0;
            data.calculation_result.patient_scores.forEach(function(d, psID) {
                n_scores = n_scores + d.data.scores.length;
            });


            $scope.d.ks.result_explorer.ks = {
                "id": 0,
                "data": data.calculation_result.md_patient_scores,
                "date": new Date(),
                "dimensions": dimensions,
                "location": {},
                "n_scores": n_scores,
                "variables": data.calculation_result.definitions.variables_array
            };

            $scope.changeDimensions();
            $scope.d.loaded = true;
            console.log('(DATA): Data-Explorer: ', $scope.d.ks.result_explorer);

        });

        call.error(function(error) {
            console.log('(ERROR): getCalculation | Klinikstichprobe:', error);
        });
    };

    $scope.changeDimensions = function() {

        var current_ks = $scope.d.ks.result_explorer.ks;

        var data_dive = current_ks.data;
        var current_location = [];
        var current_location_text = "";
        var current_location_full = "";
        var current_location_n_text = "";
        var current_location_n = 0;

        current_ks.dimensions.forEach(function(current_dim, myDimID) {
            current_location.push(current_dim.selected.id);
            if (current_location_text !== "") {
                current_location_text = current_location_text + ' | '
            };
            current_location_text = current_location_text + current_dim.name + ': ' + current_dim.selected.text
            data_dive = data_dive[current_dim.selected.id];
        });


        var my_data = null;
        if (data_dive !== null) {
            my_data = angular.copy(data_dive);
            current_location_n = my_data.patients.length;
            current_location_n_text = 'N=' + current_location_n;
            current_location_full = current_location_text + ' (' + current_location_n_text + ')';
        };

        var location = {
            "data": my_data,
            "path": current_location,
            "text": current_location_text,
            "n_text": current_location_n_text,
            "text_full": current_location_full,
            "n": current_location_n
        };

        current_ks.location = location;


        console.log('(Data) changeDimensions:', $scope.d.ks.result_explorer);
    };

    $scope.saveSet = function() {

        // Export - Set as a JSON-File
        var identifier = $scope.d.app;
        var identifier_name = identifier.split('.').join('_');
        var fileName = identifier_name + '_activated.json';

        var data = angular.copy($scope.d.ks.result_explorer.ks);

        dataService.saveData(data, fileName);

        console.log('(!) saveSet', data);
    };


    $scope.saveCalculationInput = function() {

        // Export - Set as a JSON-File
        var identifier = $scope.d.app;
        var identifier_name = identifier.split('.').join('_');
        var fileName = identifier_name + '_calc_input.json';

        var data = angular.copy($scope.d.calculations);

        dataService.saveData(data, fileName);

        console.log('(!) saveCalculationInput', data);
    };


});
