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
        var patient_in_klein = "der Patient";
        if ($scope.d.dataMain.patient.data.gender !== "male") {
            patient_in = "Die Patientin";
            patient_in_klein = "die Patientin";
        };

        // ---------------------------------------
        // Eintrittsmessung vorhanden
        // ---------------------------------------
        if ($scope.d.text_sci.data.eintritt.available === true) {
            console.log('buildTextSCI: Eintrittsmessung vorhanden: ', $scope.d.text_sci);

            text = "";
            text = text + patient_anrede + "  ";

            // Skala 1-2
            // Belastung niedrig
            if (($scope.d.text_sci.data.eintritt.scores[0].stanine < 4) && ($scope.d.text_sci.data.eintritt.scores[1].stanine < 4)) {
                text = text + "war in den letzten Monaten unterdurchschnittlich wenig Belastungen ausgesetzt. Dem entsprechend zeigte er auch wenig psychische oder körperliche Stresssymptome.";
            };

            if (($scope.d.text_sci.data.eintritt.scores[0].stanine < 4) && (($scope.d.text_sci.data.eintritt.scores[1].stanine >= 4) && ($scope.d.text_sci.data.eintritt.scores[1].stanine <= 6))) {
                text = text + "war in den letzten Monaten unterdurchschnittlich wenig Belastungen ausgesetzt, zeigte aber mehr körperliche und psychische Stresssymptome als von der Belastung her zu erwarten wäre. Dies könnte ein Hinweis auf eine chronische Stressreaktion oder unzureichende Stressbewältigungsstrategien sein. Ein Ausbau der Stressbewältigungsfähigkeiten wird empfohlen.";
            };

            if (($scope.d.text_sci.data.eintritt.scores[0].stanine < 4) && ($scope.d.text_sci.data.eintritt.scores[1].stanine > 6)) {
                text = text + "war in den letzten Monaten unterdurchschnittlich wenig Belastungen ausgesetzt. Dennoch zeigte er viele körperliche und psychische Stresssymptome. Dies ist ein Hinweis auf unzureichende Stressbewältigungsstrategien. Ein Ausbau der Stressbewältigungsfähigkeiten ist empfohlen.";
            };

            // Belastung normal
            if ((($scope.d.text_sci.data.eintritt.scores[0].stanine >= 4) && ($scope.d.text_sci.data.eintritt.scores[0].stanine <= 6)) && ($scope.d.text_sci.data.eintritt.scores[1].stanine < 4)) {
                text = text + "war in den letzten Monaten nicht übermässig durch negative Ereignisse belastet und zeigte weniger körperliche oder psychische Stresssymptome als zu erwarten. Dies ist ein Hinweis auf gut funktionierende Stressbewältigungsstrategien.";
            };

            if ((($scope.d.text_sci.data.eintritt.scores[0].stanine >= 4) && ($scope.d.text_sci.data.eintritt.scores[0].stanine <= 6)) && (($scope.d.text_sci.data.eintritt.scores[1].stanine >= 4) && ($scope.d.text_sci.data.eintritt.scores[1].stanine <= 6))) {
                text = text + "war in den letzten Monaten nicht übermässig durch negative Ereignisse belastet und zeigte dementsprechende körperliche und psychische Stresssymptome.";
            };

            if ((($scope.d.text_sci.data.eintritt.scores[0].stanine >= 4) && ($scope.d.text_sci.data.eintritt.scores[0].stanine <= 6)) && ($scope.d.text_sci.data.eintritt.scores[1].stanine < 6)) {
                text = text + "war in den letzten Monaten nicht übermässig durch negative Ereignisse belastet, zeigte aber mehr körperliche und psychische Stresssymptome als von der Belastung her zu erwarten wäre. Dies könnte ein Hinweis auf eine chronische Stressreaktion oder unzureichende Stressbewältigungsstrategien sein. Ein Ausbau der Stressbewältigungsfähigkeiten ist empfohlen.";
            };

            // Belastung hoch
            if (($scope.d.text_sci.data.eintritt.scores[0].stanine > 6) && ($scope.d.text_sci.data.eintritt.scores[1].stanine < 4)) {
                text = text + "ist durch negative Ereignisse der letzten Monate deutlich belastet, zeigte aber sehr wenig Stresssymptome. Dies ist ein Hinweis auf gut funktionierende Stressbewältigungsstrategien.";
            };

            if (($scope.d.text_sci.data.eintritt.scores[0].stanine > 6) && (($scope.d.text_sci.data.eintritt.scores[1].stanine >= 4) && ($scope.d.text_sci.data.eintritt.scores[1].stanine <= 6))) {
                text = text + "ist durch negative Ereignisse der letzten Monate deutlich belastet. Er zeigte allerdings weniger körperliche oder psychische Stresssymptome als zu erwarten. Dies ist ein Hinweis auf gut funktionierende Stressbewältigungsstrategien.";
            };

            if (($scope.d.text_sci.data.eintritt.scores[0].stanine > 6) && ($scope.d.text_sci.data.eintritt.scores[1].stanine > 6)) {
                text = text + "ist durch negative Ereignisse der letzten Monate deutlich belastet und zeigte dementsprechende viele körperliche und psychische Stresssymptome. Ein Ausbau der Stressbewältigungsfähigkeiten könnte hilfreich sein.";
            };

            // Skala 3-6 | gemäss SCI-Text2.doc

            var negative_strategie_ausgepraegt = false;
            if ($scope.d.text_sci.data.eintritt.scores[6].stanine > 6) {
                negative_strategie_ausgepraegt = true;
            };

            var anz_hiflreiche_stressbewaeltigung = 0;
            var hiflreiche_stressbewaeltigung = '';

            if ($scope.d.text_sci.data.eintritt.scores[2].stanine > 5) {
                anz_hiflreiche_stressbewaeltigung = anz_hiflreiche_stressbewaeltigung + 1;
                concat_aufzaehlung(hiflreiche_stressbewaeltigung, $scope.d.text_sci.data.eintritt.scores[2].question);
            };

            if ($scope.d.text_sci.data.eintritt.scores[3].stanine > 5) {
                anz_hiflreiche_stressbewaeltigung = anz_hiflreiche_stressbewaeltigung + 1;
                concat_aufzaehlung(hiflreiche_stressbewaeltigung, $scope.d.text_sci.data.eintritt.scores[3].question);
            };

            if ($scope.d.text_sci.data.eintritt.scores[4].stanine > 5) {
                anz_hiflreiche_stressbewaeltigung = anz_hiflreiche_stressbewaeltigung + 1;
                concat_aufzaehlung(hiflreiche_stressbewaeltigung, $scope.d.text_sci.data.eintritt.scores[4].question);
            };

            if ($scope.d.text_sci.data.eintritt.scores[5].stanine > 5) {
                anz_hiflreiche_stressbewaeltigung = anz_hiflreiche_stressbewaeltigung + 1;
                concat_aufzaehlung(hiflreiche_stressbewaeltigung, $scope.d.text_sci.data.eintritt.scores[5].question);
            };

            $scope.d.text_sci.text.negative_strategie_ausgepraegt = negative_strategie_ausgepraegt;
            $scope.d.text_sci.text.anz_hiflreiche_stressbewaeltigung = anz_hiflreiche_stressbewaeltigung;
            $scope.d.text_sci.text.hiflreiche_stressbewaeltigung = hiflreiche_stressbewaeltigung;


            // Texte 'schreiben'
            text = text + patient_anrede + " ";

            if (anz_hiflreiche_stressbewaeltigung === 0) {

                text = text + "hat keine der bekannten hilfreichen Bewältigungsstrategien zur Verfügung.";

                if (negative_strategie_ausgepraegt) {
                    text = text + " Es ist allein die ungünstige Strategie des Konsum zur Stressbewältigung vorhanden.";
                };
            };

            if (anz_hiflreiche_stressbewaeltigung === 1) {
                text = text + "hat lediglich die hilfreiche Bewältigungsstrategie " + hiflreiche_stressbewaeltigung + " zur Verfügung. Die anderen bekannten hilfreichen Bewältigungsstrategien werden nicht genutzt.";

                if (negative_strategie_ausgepraegt) {} else {
                    text = text + " Zudem ist die ungünstige Strategie des Konsum zur Stressbewältigung vorhanden. Es sollten weitere hilfreiche Strategien erlernt werden um Alternativen zur Konsumstrategie zu schaffen.";
                };
            };

            if (anz_hiflreiche_stressbewaeltigung === 2) {
                text = text + "hat die hilfreiche Bewältigungsstrategien " + hiflreiche_stressbewaeltigung + " zur Verfügung.";

                if (negative_strategie_ausgepraegt) {} else {
                    text = text + " Zudem ist die ungünstige Strategie des Konsum zur Stressbewältigung vorhanden. Es sollte geschaut werden, wie diese ungünstige Strategie besser ersetzt werden könnte.";
                };
            };

            if (anz_hiflreiche_stressbewaeltigung === 3) {
                text = text + "hat viele hilfreiche Bewältigungsstrategien ausgebildet. Durch  " + hiflreiche_stressbewaeltigung + " kann " + patient_in_klein + " Stress gut bewältigen.";

                if (negative_strategie_ausgepraegt) {} else {
                    text = text + " Allerdings ist auch die ungünstige Stressbewältigungstrategie des Konsum vorhanden.";
                };
            };

            if (anz_hiflreiche_stressbewaeltigung >= 4) {
                text = text + "hat sehr viele hilfreiche Bewältigungsstrategien ausgebildet. Durch  " + hiflreiche_stressbewaeltigung + " kann " + patient_in_klein + " Stress gut bewältigen.";

                if (negative_strategie_ausgepraegt) {} else {
                    text = text + " Allerdings ist auch die ungünstige Stressbewältigungstrategie des Konsum vorhanden. Es sollte geschaut werden, was notwendig ist, damit die günstigen Strategien mehr genutzt werden.";
                };
            };


            // Skala 3-6
            // var geringe_ausp_aufzaehlung = "";
            // var geringe_ausp_vorhanden = false;
            // var hohe_ausp_aufzaehlung = "";
            // var hohe_ausp_vorhanden = false;
            // 
            // if ($scope.d.text_sci.data.eintritt.scores[2].stanine >= 5) {
            //     hohe_ausp_vorhanden = true;
            //     hohe_ausp_aufzaehlung = concat_aufzaehlung(hohe_ausp_aufzaehlung, $scope.d.text_sci.data.eintritt.scores[2].question);
            // } else {
            //     geringe_ausp_vorhanden = true;
            //     geringe_ausp_aufzaehlung = concat_aufzaehlung(geringe_ausp_aufzaehlung, $scope.d.text_sci.data.eintritt.scores[2].question);
            // };
            // 
            // if ($scope.d.text_sci.data.eintritt.scores[3].stanine >= 5) {
            //     hohe_ausp_vorhanden = true;
            //     hohe_ausp_aufzaehlung = concat_aufzaehlung(hohe_ausp_aufzaehlung, $scope.d.text_sci.data.eintritt.scores[3].question);
            // } else {
            //     geringe_ausp_vorhanden = true;
            //     geringe_ausp_aufzaehlung = concat_aufzaehlung(geringe_ausp_aufzaehlung, $scope.d.text_sci.data.eintritt.scores[3].question);
            // };
            // 
            // if ($scope.d.text_sci.data.eintritt.scores[4].stanine >= 5) {
            //     hohe_ausp_vorhanden = true;
            //     hohe_ausp_aufzaehlung = concat_aufzaehlung(hohe_ausp_aufzaehlung, $scope.d.text_sci.data.eintritt.scores[4].question);
            // } else {
            //     geringe_ausp_vorhanden = true;
            //     geringe_ausp_aufzaehlung = concat_aufzaehlung(geringe_ausp_aufzaehlung, $scope.d.text_sci.data.eintritt.scores[4].question);
            // };
            // 
            // if ($scope.d.text_sci.data.eintritt.scores[5].stanine >= 5) {
            //     hohe_ausp_vorhanden = true;
            //     hohe_ausp_aufzaehlung = concat_aufzaehlung(hohe_ausp_aufzaehlung, $scope.d.text_sci.data.eintritt.scores[5].question);
            // } else {
            //     geringe_ausp_vorhanden = true;
            //     geringe_ausp_aufzaehlung = concat_aufzaehlung(geringe_ausp_aufzaehlung, $scope.d.text_sci.data.eintritt.scores[5].question);
            // };
            // 
            // if (hohe_ausp_vorhanden) {
            //     text = text + patient_in + " verfügt über folgende hilfreiche Stressbewältigungsstrategien: "
            //     text = text + hohe_ausp_aufzaehlung + ". ";
            // };
            // 
            // if (geringe_ausp_vorhanden) {
            //     text = text + patient_anrede + " hat wenig hilfreiche Strategien im Umgang mit Stress zur Verfügung. Daher führen Belastungen sehr wahrscheinlich zu vermehrten körperlichen und psychischen Stressreaktionen. Ein Ausbau folgender Stressbewältigungsfähigkeiten ist empfohlen: "
            //     text = text + geringe_ausp_aufzaehlung + ". ";
            // };
            // 
            // // Skala 7
            // if ($scope.d.text_sci.data.eintritt.scores[6].stanine >= 6) {
            //     text = text + " Als ungünstige Strategie im Umgang mit Stress weist " + patient_anrede
            //     text = text + " den vermehrten Konsum von Alkohol und/oder Zigaretten auf."
            // };

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
