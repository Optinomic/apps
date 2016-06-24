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
                $scope.setStanineView();
                $scope.setTextSCI();
                $scope.setExport();

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

        var data_query = {};
        data_query = {
            name: 'SCI - Export',
            sql: include_as_js_string(
                SCI_Export.sql)
        };
        module_packages.push(data_query);

        // Init the given Export Settings
        $scope.d.sql_box = $scope.d.functions.getDefaultExportSettings($scope.d.dataMain.params.app_id, module_packages);

    };



    $scope.setTextSCI = function() {

        $scope.d.text_sci = {
            "data": {
                "eintritt": {
                    "available": false,
                    "scores": {}
                },
                "austritt": {
                    "available": false,
                    "scores": {}
                }
            },
            "text": {
                "eintritt": "Eintritt: Undefiniert / Keine Messung erkannt.",
                "austritt": "Austritt: Undefiniert / Keine Messung erkannt."
            }
        };


        // Loop Responses and push to Chart-Data
        var survey_responses = $scope.d.dataMain.survey_responses;
        survey_responses.forEach(function(current_response, myindex) {

            // Check if we have 'Eintritt' & 'Austritt'
            var scores = current_response.calculations[0].calculation_result.scores

            scores[0].question = "Stress durch Verlust";
            scores[1].question = "Stresssymptome";
            scores[2].question = "Positives Denken";
            scores[3].question = "Aktive Stressbewältigung";
            scores[4].question = "Soziale Unterstützung";
            scores[5].question = "Halt im Glauben";
            scores[6].question = "Alkohol- und Zigarettenkonsum";

            var response_to_set = {
                "available": true,
                "scores": scores
            }

            if (current_response.entity.data.response.Erhebungszeitpunkt === '1') {
                $scope.d.text_sci.data.eintritt = response_to_set;
            };
            if (current_response.entity.data.response.Erhebungszeitpunkt === '2') {
                $scope.d.text_sci.data.austritt = response_to_set;
            };

        });

        $scope.buildTextSCI();

    };



    $scope.buildTextSCI = function() {

        var concat_aufzaehlung = function(source, item) {

            item = "«" + item + "»";

            if ((source === null) || (source === '')) {
                source = item;
            } else {
                source = source + ", " + item;
            };

            return source;
        };

        var text = "";
        var patient_anrede = $scope.d.dataMain.patient.data.extras.anrede;
        var patient_in = "Der Patient";
        if ($scope.d.dataMain.patient.data.gender !== "male") {
            patient_in = "Die Patientin";
        };

        // ---------------------------------------
        // Eintrittsmessung vorhanden
        // ---------------------------------------
        if ($scope.d.text_sci.data.eintritt.available === true) {
            console.log('buildTextSCI: Eintrittsmessung vorhanden: ', $scope.d.text_sci);

            text = "";

            // Skala 1-2
            if ($scope.d.text_sci.data.eintritt.scores[0].stanine >= 6) {
                text = text + patient_anrede + " ist durch negative Ereignisse der letzten Monate deutlich belastet"

                if ($scope.d.text_sci.data.eintritt.scores[1].stanine >= 5) {
                    text = text + " und zeigt vermehrt körperliche und psychische Stressymptome"
                };
                text = text + ". ";
            };

            // Skala 3-6
            var geringe_ausp_aufzaehlung = "";
            var geringe_ausp_vorhanden = false;
            var hohe_ausp_aufzaehlung = "";
            var hohe_ausp_vorhanden = false;

            if ($scope.d.text_sci.data.eintritt.scores[2].stanine >= 5) {
                hohe_ausp_vorhanden = true;
                hohe_ausp_aufzaehlung = concat_aufzaehlung(hohe_ausp_aufzaehlung, $scope.d.text_sci.data.eintritt.scores[2].question);
            } else {
                geringe_ausp_vorhanden = true;
                geringe_ausp_aufzaehlung = concat_aufzaehlung(geringe_ausp_aufzaehlung, $scope.d.text_sci.data.eintritt.scores[2].question);
            };

            if ($scope.d.text_sci.data.eintritt.scores[3].stanine >= 5) {
                hohe_ausp_vorhanden = true;
                hohe_ausp_aufzaehlung = concat_aufzaehlung(hohe_ausp_aufzaehlung, $scope.d.text_sci.data.eintritt.scores[3].question);
            } else {
                geringe_ausp_vorhanden = true;
                geringe_ausp_aufzaehlung = concat_aufzaehlung(geringe_ausp_aufzaehlung, $scope.d.text_sci.data.eintritt.scores[3].question);
            };

            if ($scope.d.text_sci.data.eintritt.scores[4].stanine >= 5) {
                hohe_ausp_vorhanden = true;
                hohe_ausp_aufzaehlung = concat_aufzaehlung(hohe_ausp_aufzaehlung, $scope.d.text_sci.data.eintritt.scores[4].question);
            } else {
                geringe_ausp_vorhanden = true;
                geringe_ausp_aufzaehlung = concat_aufzaehlung(geringe_ausp_aufzaehlung, $scope.d.text_sci.data.eintritt.scores[4].question);
            };

            if ($scope.d.text_sci.data.eintritt.scores[5].stanine >= 5) {
                hohe_ausp_vorhanden = true;
                hohe_ausp_aufzaehlung = concat_aufzaehlung(hohe_ausp_aufzaehlung, $scope.d.text_sci.data.eintritt.scores[5].question);
            } else {
                geringe_ausp_vorhanden = true;
                geringe_ausp_aufzaehlung = concat_aufzaehlung(geringe_ausp_aufzaehlung, $scope.d.text_sci.data.eintritt.scores[5].question);
            };

            if (hohe_ausp_vorhanden) {
                text = text + patient_in + " verfügt über folgende hilfreiche Stressbewältigungsstrategien: "
                text = text + hohe_ausp_aufzaehlung + ". ";
            };

            if (geringe_ausp_vorhanden) {
                text = text + patient_anrede + " hat wenig hilfreiche Strategien im Umgang mit Stress zur Verfügung. Daher führen Belastungen sehr wahrscheinlich zu vermehrten körperlichen und psychischen Stressreaktionen. Ein Ausbau folgender Stressbewältigungsfähigkeiten ist empfohlen: "
                text = text + geringe_ausp_aufzaehlung + ". ";
            };

            // Skala 7
            if ($scope.d.text_sci.data.eintritt.scores[6].stanine >= 6) {
                text = text + " Als ungünstige Strategie im Umgang mit Stress weist " + patient_anrede
                text = text + " den vermehrten Konsum von Alkohol und/oder Zigaretten auf."
            };

            // Save text to $scope
            $scope.d.text_sci.text.eintritt = text;
        }

        // ---------------------------------------
        // Eintritts- & Austrittsmessung vorhanden
        // ---------------------------------------
        if (($scope.d.text_sci.data.eintritt.available === true) && ($scope.d.text_sci.data.austritt.available === true)) {
            console.log('buildTextSCI: Eintritts- & Austrittsmessung vorhanden: ', $scope.d.text_sci);

            text = "";


            // Skala 3-6

            var verbesserung_vorhanden = false;
            var verbesserung_aufzaehlung = '';

            if ($scope.d.text_sci.data.austritt.scores[2].stanine > $scope.d.text_sci.data.eintritt.scores[2].stanine) {
                verbesserung_vorhanden = true;
                verbesserung_aufzaehlung = concat_aufzaehlung(verbesserung_aufzaehlung, $scope.d.text_sci.data.eintritt.scores[2].question);
            };

            if ($scope.d.text_sci.data.austritt.scores[3].stanine > $scope.d.text_sci.data.eintritt.scores[3].stanine) {
                verbesserung_vorhanden = true;
                verbesserung_aufzaehlung = concat_aufzaehlung(verbesserung_aufzaehlung, $scope.d.text_sci.data.eintritt.scores[3].question);
            };

            if ($scope.d.text_sci.data.austritt.scores[4].stanine > $scope.d.text_sci.data.eintritt.scores[4].stanine) {
                verbesserung_vorhanden = true;
                verbesserung_aufzaehlung = concat_aufzaehlung(verbesserung_aufzaehlung, $scope.d.text_sci.data.eintritt.scores[4].question);
            };

            if ($scope.d.text_sci.data.austritt.scores[5].stanine > $scope.d.text_sci.data.eintritt.scores[5].stanine) {
                verbesserung_vorhanden = true;
                verbesserung_aufzaehlung = concat_aufzaehlung(verbesserung_aufzaehlung, $scope.d.text_sci.data.eintritt.scores[5].question);
            };

            if (verbesserung_vorhanden) {
                text = text + patient_in + " konnte im Verlauf der Therapie seine Stressbewältigung durch die Strategie(n) " + verbesserung_aufzaehlung + "verbessern. ";
            };


            // Skala 7
            if ($scope.d.text_sci.data.austritt.scores[6].stanine < $scope.d.text_sci.data.eintritt.scores[6].stanine) {
                text = text + " Die ungünstige Strategie des Konsums konnte reduziert werden. ";
            };

            // Save text to $scope
            $scope.d.text_sci.text.austritt = text;

        }

        // Merge Full - Text
        $scope.d.text_sci.text.full = $scope.d.text_sci.text.eintritt + "\n" + $scope.d.text_sci.text.austritt;
    };





    // -----------------------------------
    // Stanine - Chart  <chart-stanine>
    // -----------------------------------


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





});
