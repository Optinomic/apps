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

            var current_template = $scope.d.dataMain.params.location.viewname;


            // Check if we have survey_responses @ data.
            if (data.survey_responses.length !== 0) {
                console.log('(DATA): survey_responses:', data.survey_responses.length, data.survey_responses);
                $scope.d.haveData = true;


                // Run Specific Functions only when needed.
                if (current_template === 'score') {
                    $scope.enhance_sr();
                };

                if (current_template === 'data_export_admin') {
                    $scope.setExport();
                };

                // Run App-Functions:

            };

            // Run Public-Functions:
            $scope.d.functions.getAllCalculations();


            // Finishing: Console Info & Init = done.
            console.log('Welcome, ', $scope.d.dataMain.apps.current.name, current_template, $scope.d);
            $scope.d.init = true;
        });
    };
    $scope.loadMainData();


    $scope.enhance_sr = function() {
        var survey_responses = $scope.d.dataMain.survey_responses;
        survey_responses.forEach(function(sr, srID) {


            var response = sr.entity.data.response;
            var calculation = sr.calculations["0"].calculation_result;

            var zeipunkt_text = "Nicht festgelegt";

            if ('Datum' in response) {
                var zeipunkt_datum = new Date(response.Datum).toISOString();
            } else {
                var zeipunkt_datum = sr.entity.data.filled;
            };

            if ("Erhebungszeitpunkt" in response) {
                if (parseInt(response.Erhebungszeitpunkt) === 1) {
                    zeipunkt_text = "Eintritt";
                };
                if (parseInt(response.Erhebungszeitpunkt) === 2) {
                    zeipunkt_text = "Austritt";
                };
                if (parseInt(response.Erhebungszeitpunkt) === 3) {
                    zeipunkt_text = "Anderer: " + response.andererZeitpunkt;
                };
            } else {
                response.Erhebungszeitpunkt = 3
                response.andererZeitpunkt = "Nicht festgelegt"
            };

            var substanz_text = "Alkohol";
            if ("Substanz" in response) {
                if (parseInt(response.Substanz) === 1) {
                    substanz_text = "Alkohol";
                };
                if (parseInt(response.Substanz) === 2) {
                    substanz_text = response.SubstAndere;
                };
            } else {
                response.Substanz = "1"
            };


            // Write
            sr.date = zeipunkt_datum;
            sr.aase = {
                "zeipunkt_text": zeipunkt_text,
                "zeipunkt_datum": zeipunkt_datum,
                "substanz_text": substanz_text,
                "calculation": calculation,
                "response": response
            };
        });

        // Sort survey_responses
        survey_responses.sort(function(a, b) {
            var nameA = a.date
            var nameB = b.date
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
    };


    // -----------------------------------
    // Navigation
    // -----------------------------------

    $scope.d.navigator = 0;



    $scope.prev = function() {
        var count = $scope.d.dataMain.survey_responses.length - 1;

        if ($scope.d.navigator === 0) {
            $scope.d.navigator = count;
        } else {
            $scope.d.navigator = $scope.d.navigator - 1
        };
    };

    $scope.next = function() {
        var count = $scope.d.dataMain.survey_responses.length - 1;

        if (count === $scope.d.navigator) {
            $scope.d.navigator = 0;
        } else {
            $scope.d.navigator = $scope.d.navigator + 1
        };
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


        // Hinzufügen gespeicherter SQL-Dateien in /includes
        var module_packages = [];
        var data_query = {};

        data_query = {
            name: 'AASE-G',
            sql: __opapp_include_as_js_string(includes/export.sql)
        };
        module_packages.push(data_query);

        // Init the given Export Settings
        $scope.d.sql_box = $scope.d.functions.getDefaultExportSettings($scope.d.dataMain.params.app_id, module_packages);

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
            my_response.filled = current_result.entity.data.response.Datum;
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
            field: "Datum",
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

});
