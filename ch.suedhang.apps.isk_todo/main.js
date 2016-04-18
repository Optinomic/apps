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
                $scope.setStanineView();
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


    // -----------------------------------
    // Dataexport
    // -----------------------------------

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
            name: 'ISK - Export',
            sql: include_as_js_string(
                export.sql)
        };
        module_packages.push(data_query);

        // Init the given Export Settings
        $scope.d.sql_box = $scope.d.functions.getDefaultExportSettings($scope.d.dataMain.params.app_id, module_packages);
    };


    // -----------------------------------
    // Stanine - Chart  <chart-stanine>
    // -----------------------------------

    $scope.getAnswerStanine = function() {
        var score_answer = [{
            "question": "Soziale Orientierung",
            "sub_left": "Ausmass, in dem eine Person anderen Menschen offen und mit positiver Grundhaltung gegenüber tritt.",
            "sub_right": "Ausmass, in dem eine Person anderen Menschen offen und mit positiver Grundhaltung gegenüber tritt.",
            "stanine": $scope.d.functions.getRandomInt(1, 9),
            "sum_score": $scope.d.functions.getRandomInt(0, 100)
        }, {
            "question": "Offensivität",
            "sub_left": "Fähigkeit, aus sich herauszugehen und im Kontakt mit anderen Menschen eigene Interessen aktiv verwirklichen zu können.",
            "sub_right": "Fähigkeit, aus sich herauszugehen und im Kontakt mit anderen Menschen eigene Interessen aktiv verwirklichen zu können.",
            "stanine": $scope.d.functions.getRandomInt(1, 9),
            "sum_score": $scope.d.functions.getRandomInt(0, 100)
        }, {
            "question": "Selbststeuerung",
            "sub_left": "Fähigkeit eines Menschen, flexibel und rational zu handeln, wobei man sich selbst bewusst als Akteur begreift.",
            "sub_right": "Fähigkeit eines Menschen, flexibel und rational zu handeln, wobei man sich selbst bewusst als Akteur begreift.",
            "stanine": $scope.d.functions.getRandomInt(1, 9),
            "sum_score": $scope.d.functions.getRandomInt(0, 100)
        }, {
            "question": "Reflexibilität",
            "sub_left": "Fähigkeit einer Person, bei anderen Menschen einen positiven bzw. gewünschten Eindruck zu erzeugen.",
            "sub_right": "Fähigkeit einer Person, bei anderen Menschen einen positiven bzw. gewünschten Eindruck zu erzeugen.",
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

            scores[0].question = "Soziale Orientierung";
            scores[0].sub_left = "Ausmass, in dem eine Person anderen Menschen offen und mit positiver Grundhaltung gegenüber tritt.";
            scores[0].sub_right = "Ausmass, in dem eine Person anderen Menschen offen und mit positiver Grundhaltung gegenüber tritt.";

            scores[1].question = "Offensivität";
            scores[1].sub_left = "Fähigkeit, aus sich herauszugehen und im Kontakt mit anderen Menschen eigene Interessen aktiv verwirklichen zu können.";
            scores[1].sub_right = "Fähigkeit, aus sich herauszugehen und im Kontakt mit anderen Menschen eigene Interessen aktiv verwirklichen zu können.";

            scores[2].question = "Selbststeuerung";
            scores[2].sub_left = "Fähigkeit eines Menschen, flexibel und rational zu handeln, wobei man sich selbst bewusst als Akteur begreift.";
            scores[2].sub_right = "Fähigkeit eines Menschen, flexibel und rational zu handeln, wobei man sich selbst bewusst als Akteur begreift.";

            scores[3].question = "Reflexibilität";
            scores[3].sub_left = "Fähigkeit einer Person, bei anderen Menschen einen positiven bzw. gewünschten Eindruck zu erzeugen.";
            scores[3].sub_right = "Fähigkeit einer Person, bei anderen Menschen einen positiven bzw. gewünschten Eindruck zu erzeugen.";

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


        console.log('(!) setStanineView', $scope.stanine);

    };





});
