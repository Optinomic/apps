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
                $scope.setExport();
                $scope.setDataView();
                $scope.setStanineView();


            };

            // FAKE - DATA
            // $scope.d.haveData = true;
            // $scope.setStanineView();

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

        //var data_query = {};
        //data_query = {
        //    name: 'SCI',
        //    sql: in clude_as_js_string(
        //        export.sql)
        //};
        //module_packages.push(data_query);

        // Init the given Export Settings
        $scope.d.sql_box = $scope.d.functions.getDefaultExportSettings($scope.d.dataMain.params.app_id, module_packages);

    };



    // -----------------------------------
    // Stanine - Chart  <chart-stanine>
    // -----------------------------------

    $scope.getRandomAnswerStanine = function() {
        var score_answer = [{
            "question": "Stress durch Verlust",
            "sub_left": "Keine Belastung durch Verlust und negative Ereignisse",
            "sub_right": "Belastung durch Verlust und negative Ereignisse",
            "stanine": $scope.d.functions.getRandomInt(1, 9),
            "sum_score": $scope.d.functions.getRandomInt(0, 100)
        }, {
            "question": "Stresssymptome",
            "sub_left": "Wenige körperliche und psychische Symptome",
            "sub_right": "Viele körperliche und psychische Symptome",
            "stanine": $scope.d.functions.getRandomInt(1, 9),
            "sum_score": $scope.d.functions.getRandomInt(0, 100)
        }, {
            "question": "Positives Denken",
            "sub_left": "Ungünstig: Selbstzweifel und Fokus auf Negatives",
            "sub_right": "Gute Stressbewältigung durch positives Denken",
            "stanine": $scope.d.functions.getRandomInt(1, 9),
            "sum_score": $scope.d.functions.getRandomInt(0, 100)
        }, {
            "question": "Aktive Stressbewältigung",
            "sub_left": "Ungünstig: Stressoren werden nicht beseitigt",
            "sub_right": "Gute aktive und vorbeugende Stressbewältigung",
            "stanine": $scope.d.functions.getRandomInt(1, 9),
            "sum_score": $scope.d.functions.getRandomInt(0, 100)
        }, {
            "question": "Soziale Unterstützung",
            "sub_left": "Ungünstig: Kaum Unterstützung durch andere",
            "sub_right": "Gut: Viel Unterstützung durch Freunde und Bekannte",
            "stanine": $scope.d.functions.getRandomInt(1, 9),
            "sum_score": $scope.d.functions.getRandomInt(0, 100)
        }, {
            "question": "Halt im Glauben",
            "sub_left": "Ungünstig: Kaum religiöser / spiritueller Halt",
            "sub_right": "Gut: Person findet Halt im Glauben",
            "stanine": $scope.d.functions.getRandomInt(1, 9),
            "sum_score": $scope.d.functions.getRandomInt(0, 100)
        }, {
            "question": "Alkohol- und Zigarettenkonsum",
            "sub_left": "Gut: Kein erhöhter Alkohol - oder Zigarettenkonsum",
            "sub_right": "Ungünstige Bewältigung durch Alkohol und Zigaretten",
            "stanine": $scope.d.functions.getRandomInt(1, 9),
            "sum_score": $scope.d.functions.getRandomInt(0, 100)
        }];


        return score_answer;
    };

    $scope.setStanineView = function() {

        $scope.stanine = {};
        $scope.stanine.data = [];

        // Loop Responses and push to Chart-Data
        var survey_responses = $scope.d.dataMain.survey_responses;
        survey_responses.forEach(function(current_response, myindex) {


            // Scores - Update Scores with correct labeling
            var scores = current_response.calculations[0].calculation_result.scores

            scores[0].question = "Stress durch Verlust";
            scores[0].sub_left = "Keine Belastung durch Verlust und negative Ereignisse";
            scores[0].sub_right = "Belastung durch Verlust und negative Ereignisse";

            scores[1].question = "Stresssymptome";
            scores[1].sub_left = "Wenige körperliche und psychische Symptome";
            scores[1].sub_right = "Viele körperliche und psychische Symptome";

            scores[2].question = "Positives Denken";
            scores[2].sub_left = "Ungünstig: Selbstzweifel und Fokus auf Negatives";
            scores[2].sub_right = "Gute Stressbewältigung durch positives Denken";

            scores[3].question = "Aktive Stressbewältigung";
            scores[3].sub_left = "Ungünstig: Stressoren werden nicht beseitigt";
            scores[3].sub_right = "Gute aktive und vorbeugende Stressbewältigung";

            scores[4].question = "Soziale Unterstützung";
            scores[4].sub_left = "Ungünstig: Kaum Unterstützung durch andere";
            scores[4].sub_right = "Gut: Viel Unterstützung durch Freunde und Bekannte";

            scores[5].question = "Halt im Glauben";
            scores[5].sub_left = "Ungünstig: Kaum religiöser / spiritueller Halt";
            scores[5].sub_right = "Gut: Person findet Halt im Glauben";

            scores[6].question = "Alkohol- und Zigarettenkonsum";
            scores[6].sub_left = "Gut: Kein erhöhter Alkohol - oder Zigarettenkonsum";
            scores[6].sub_right = "Ungünstige Bewältigung durch Alkohol und Zigaretten";


            // Create nice Labels
            var date = $scope.d.functions.sureDateInstance(current_response.entity.data.filled);
            var label = $filter("amDateFormat")(date, 'DD.MM.YYYY');
            var label_type = 'Verlauf: ';

            if (current_response.entity.data.response.Erhebungszeitpunkt === '1') {
                label_type = 'Eintritt: ';
            };
            if (current_response.entity.data.response.Erhebungszeitpunkt === '2') {
                label_type = 'Austritt: ';
            };
            label = label_type + label;


            var respone_to_push = {
                "label": label,
                "scores": scores
            }
            $scope.stanine.data.push(respone_to_push);
        });

        // Poulation Data - Get back 'Umlaute'
        var population = $scope.stanine.data[0].scores[0].population.name;
        population = population.replace("Maenner", "Männer");
        population = population.replace("Aelter", "Älter");
        population = population.replace("Juenger", "Jünger");


        $scope.stanine.options = {
            "population_name": population,
            "norm_name": "Normalbereich",
            "start_result": $scope.stanine.data.length - 1
        };

        console.log('(!) setStanineView', $scope.stanine);

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


        // DataView - Options
        $scope.d.grid.options = $scope.d.grid.default_options;
        $scope.d.grid.options.rowData = $scope.d.grid.rowData;
        $scope.d.grid.options.columnDefs = $scope.d.grid.columnDefs;


        //console.log('dataGRID: ', $scope.d.grid);
    };



});
