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
                if (current_template === 'chart_stanine') {
                    $scope.setStanineView();
                };

                if (current_template === 'sci_stanine') {
                    $scope.setStanineView();
                    $scope.groupStanineView();
                };

                if (current_template === 'text_sci') {
                    $scope.setTextSCI();
                };

                if (current_template === 'data_export_admin') {
                    $scope.setExport();
                };

            };

            // FAKE - DATA
            // $scope.d.haveData = true;
            // $scope.setStanineView();

            // Run Public-Functions:
            // $scope.d.functions.getAllCalculations();


            // Finishing: Console Info & Init = done.
            console.log('Welcome, ', $scope.d.dataMain.apps.current.name, current_template, $scope.d);
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
            sql: __opapp_include_as_js_string(includes/SCI_Export.sql)
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

            scores[0].question = "Stress durch negative Ereignisse";
            scores[1].question = "Stresssymptome";
            scores[2].question = "Positives Denken";
            scores[3].question = "Aktive Stressbewältigung";
            scores[4].question = "Soziale Unterstützung";
            scores[5].question = "Halt im Glauben";
            scores[6].question = "Alkohol- und Zigarettenkonsum";

            var response_to_set = {
                "available": true,
                "scores": scores
            };


            if (current_response.entity.data.response.Erhebungszeitpunkt === '1') {
                $scope.d.text_sci.data.eintritt = response_to_set;
            };
            if (current_response.entity.data.response.Erhebungszeitpunkt === '2') {
                $scope.d.text_sci.data.austritt = response_to_set;
            };


            // Alte Fragebogenversion hatte kein Erhebungszeitpunkt | Spekulation Eintritt
            if ((current_response.entity.data.response.Erhebungszeitpunkt !== '1') && (current_response.entity.data.response.Erhebungszeitpunkt !== '1')) {
                $scope.d.text_sci.data.eintritt = response_to_set;
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
                text = text + "war in den letzten Monaten nicht übermässig durch negative Ereignisse belastet und zeigte dementsprechend körperliche und psychische Stresssymptome.";
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
                text = text + "ist durch negative Ereignisse der letzten Monate deutlich belastet und zeigte dementsprechend viele körperliche und psychische Stresssymptome. Ein Ausbau der Stressbewältigungsfähigkeiten könnte hilfreich sein.";
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
                hiflreiche_stressbewaeltigung = concat_aufzaehlung(hiflreiche_stressbewaeltigung, $scope.d.text_sci.data.eintritt.scores[2].question);
            };

            if ($scope.d.text_sci.data.eintritt.scores[3].stanine > 5) {
                anz_hiflreiche_stressbewaeltigung = anz_hiflreiche_stressbewaeltigung + 1;
                hiflreiche_stressbewaeltigung = concat_aufzaehlung(hiflreiche_stressbewaeltigung, $scope.d.text_sci.data.eintritt.scores[3].question);
            };

            if ($scope.d.text_sci.data.eintritt.scores[4].stanine > 5) {
                anz_hiflreiche_stressbewaeltigung = anz_hiflreiche_stressbewaeltigung + 1;
                hiflreiche_stressbewaeltigung = concat_aufzaehlung(hiflreiche_stressbewaeltigung, $scope.d.text_sci.data.eintritt.scores[4].question);
            };

            if ($scope.d.text_sci.data.eintritt.scores[5].stanine > 5) {
                anz_hiflreiche_stressbewaeltigung = anz_hiflreiche_stressbewaeltigung + 1;
                hiflreiche_stressbewaeltigung = concat_aufzaehlung(hiflreiche_stressbewaeltigung, $scope.d.text_sci.data.eintritt.scores[5].question);
            };

            $scope.d.text_sci.text.negative_strategie_ausgepraegt = negative_strategie_ausgepraegt;
            $scope.d.text_sci.text.anz_hiflreiche_stressbewaeltigung = anz_hiflreiche_stressbewaeltigung;
            $scope.d.text_sci.text.hiflreiche_stressbewaeltigung = hiflreiche_stressbewaeltigung;


            // Texte 'schreiben'
            text = text + " " + patient_anrede + " ";

            if (anz_hiflreiche_stressbewaeltigung === 0) {

                text = text + "hat keine der bekannten hilfreichen Bewältigungsstrategien zur Verfügung.";

                if (negative_strategie_ausgepraegt) {
                    text = text + " Es ist allein die ungünstige Strategie des Konsum zur Stressbewältigung vorhanden.";
                };
            };

            if (anz_hiflreiche_stressbewaeltigung === 1) {
                text = text + "hat lediglich die hilfreiche Bewältigungsstrategie " + hiflreiche_stressbewaeltigung + " zur Verfügung. Die anderen bekannten hilfreichen Bewältigungsstrategien werden nicht genutzt.";

                if (negative_strategie_ausgepraegt) {
                    text = text + " Zudem ist die ungünstige Strategie des Konsum zur Stressbewältigung vorhanden. Es sollten weitere hilfreiche Strategien erlernt werden um Alternativen zur Konsumstrategie zu schaffen.";
                };
            };

            if (anz_hiflreiche_stressbewaeltigung === 2) {
                text = text + "hat die hilfreiche Bewältigungsstrategien " + hiflreiche_stressbewaeltigung + " zur Verfügung.";

                if (negative_strategie_ausgepraegt) {
                    text = text + " Zudem ist die ungünstige Strategie des Konsum zur Stressbewältigung vorhanden. Es sollte geschaut werden, wie diese ungünstige Strategie besser ersetzt werden könnte.";
                };
            };

            if (anz_hiflreiche_stressbewaeltigung === 3) {
                text = text + "hat viele hilfreiche Bewältigungsstrategien ausgebildet. Durch  " + hiflreiche_stressbewaeltigung + " kann " + patient_in_klein + " Stress gut bewältigen.";

                if (negative_strategie_ausgepraegt) {
                    text = text + " Allerdings ist auch die ungünstige Stressbewältigungstrategie des Konsum vorhanden.";
                };
            };

            if (anz_hiflreiche_stressbewaeltigung >= 4) {
                text = text + "hat sehr viele hilfreiche Bewältigungsstrategien ausgebildet. Durch  " + hiflreiche_stressbewaeltigung + " kann " + patient_in_klein + " Stress gut bewältigen.";

                if (negative_strategie_ausgepraegt) {
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

        // Gruppiert nach Sonja
        $scope.d.stanine = {};
        $scope.d.stanine.data_stress = [];
        $scope.d.stanine.data_hilfreich = [];
        $scope.d.stanine.data_unguenstig = [];

        // Loop Responses and push to Chart-Data
        var survey_responses = $scope.d.dataMain.survey_responses;
        survey_responses.forEach(function(current_response, myindex) {


            // Scores - Update Scores with correct labeling
            var scores = current_response.calculations[0].calculation_result.scores

            // Stress
            scores[0].question = "Stress durch negative Ereignisse";
            scores[0].sub_left = "Wenige Stressoren durch negative Ereignisse";
            scores[0].sub_right = "Viele Stressoren durch negative Ereignisse";

            scores[1].question = "Stresssymptome";
            scores[1].sub_left = "Wenig körperliche und psychische Stresssymptome";
            scores[1].sub_right = "Viele körperliche und psychische Stresssymptome";


            // Hilfreiche Strategien

            scores[2].question = "Positives Denken";
            scores[2].sub_left = "Selbstzweifel und Fokus auf Negatives";
            scores[2].sub_right = "Stressbewältigung durch positives Denken";

            scores[3].question = "Aktive Stressbewältigung";
            scores[3].sub_left = "Stressoren werden nicht beseitigt";
            scores[3].sub_right = "Aktive und vorbeugende Stressbewältigung";


            scores[4].question = "Soziale Unterstützung";
            scores[4].sub_left = "Kaum Unterstützung durch andere";
            scores[4].sub_right = "Viel Unterstützung durch Freunde und Bekannte";

            scores[5].question = "Halt im Glauben";
            scores[5].sub_left = "Kaum religiöser / spiritueller Halt";
            scores[5].sub_right = "Person findet Halt im Glauben";


            // Ungünstige Strategien

            scores[6].question = "Alkohol- und Zigarettenkonsum";
            scores[6].sub_left = "Kein erhöhter Akohol- oder Zigarettenkonsum";
            scores[6].sub_right = "Ungünstige Bewältigung durch Alkohol und Zigaretten";


            // Create nice Labels
            var date = $filter("amDateFormat")(current_response.entity.data.response.Datum, 'DD.MM.YYYY');
            var label_type = 'Verlauf';

            if (current_response.entity.data.response.Erhebungszeitpunkt === '1') {
                label_type = 'Eintritt';
            };
            if (current_response.entity.data.response.Erhebungszeitpunkt === '2') {
                label_type = 'Austritt';
            };
            if (current_response.entity.data.response.Erhebungszeitpunkt === '3') {
                label_type = 'Verlauf';
            };

            var label = label_type + ": " + date;


            var respone_to_push = {
                "date": date,
                "label": label,
                "mz_id": parseInt(current_response.entity.data.response.Erhebungszeitpunkt),
                "mz_typ": label_type,
                "scores": scores
            };

            $scope.stanine.data.push(respone_to_push);

            // Gruppiert nach Sonja
            var respone_to_push_copy = {};

            respone_to_push_copy = angular.copy(respone_to_push);
            respone_to_push_copy.scores.splice(2, 5);
            $scope.d.stanine.data_stress.push(respone_to_push_copy);

            respone_to_push_copy = angular.copy(respone_to_push);
            respone_to_push_copy.scores.splice(0, 2);
            respone_to_push_copy.scores.splice(4, 1);
            $scope.d.stanine.data_hilfreich.push(respone_to_push_copy);

            respone_to_push_copy = angular.copy(respone_to_push);
            respone_to_push_copy.scores.splice(0, 6);
            $scope.d.stanine.data_unguenstig.push(respone_to_push_copy);

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

        console.log('(!) setStanineView', $scope.stanine, $scope.d.stanine);
    };

    $scope.groupStanineView = function() {

        // Ranges initialisieren
        $scope.d.scale_ranges = {
            "ranges": [{
                "from": 1,
                "to": 1.5,
                "result": "Stanine 1",
                "result_color": "#5C6BC0"
            }, {
                "from": 1.5,
                "to": 2.5,
                "result": "Stanine 2",
                "result_color": "#5C6BC0"
            }, {
                "from": 2.5,
                "to": 3.5,
                "result": "Stanine 3",
                "result_color": "#5C6BC0"
            }, {
                "from": 3.5,
                "to": 4.5,
                "result": "Stanine 4",
                "result_color": "#5C6BC0"
            }, {
                "from": 4.5,
                "to": 5.5,
                "result": "Stanine 5",
                "result_color": "#5C6BC0"
            }, {
                "from": 5.5,
                "to": 6.5,
                "result": "Stanine 6",
                "result_color": "#5C6BC0"
            }, {
                "from": 6.5,
                "to": 7.5,
                "result": "Stanine 7",
                "result_color": "#5C6BC0"
            }, {
                "from": 7.5,
                "to": 8.5,
                "result": "Stanine 8",
                "result_color": "#5C6BC0"
            }, {
                "from": 8.5,
                "to": 9,
                "result": "Stanine 9",
                "result_color": "#5C6BC0"
            }]
        };

        $scope.d.scale_ranges_stress = angular.copy($scope.d.scale_ranges);
        // 8-9 rot  |  1-2 grün
        //console.log("(?) scale_ranges_stress", $scope.d.scale_ranges_stress);
        $scope.d.scale_ranges_stress.ranges["0"].result_color = "#4CAF50";
        $scope.d.scale_ranges_stress.ranges["1"].result_color = "#4CAF50";
        $scope.d.scale_ranges_stress.ranges["7"].result_color = "#F44336";
        $scope.d.scale_ranges_stress.ranges["8"].result_color = "#F44336";

        $scope.d.scale_ranges_hilfreich = angular.copy($scope.d.scale_ranges);
        // 8-9 grün  |  1-2 grün
        $scope.d.scale_ranges_hilfreich.ranges["0"].result_color = "#4CAF50";
        $scope.d.scale_ranges_hilfreich.ranges["1"].result_color = "#4CAF50";
        $scope.d.scale_ranges_hilfreich.ranges["7"].result_color = "#4CAF50";
        $scope.d.scale_ranges_hilfreich.ranges["8"].result_color = "#4CAF50";

        $scope.d.scale_ranges_unguenstig = angular.copy($scope.d.scale_ranges);
        // 8-9 rot  |  1-2 grün
        $scope.d.scale_ranges_unguenstig.ranges["0"].result_color = "#4CAF50";
        $scope.d.scale_ranges_unguenstig.ranges["1"].result_color = "#4CAF50";
        $scope.d.scale_ranges_unguenstig.ranges["7"].result_color = "#F44336";
        $scope.d.scale_ranges_unguenstig.ranges["8"].result_color = "#F44336";



        $scope.d.stanine_ranges = [{
            "stanine": 1,
            "procent": 4
        }, {
            "stanine": 2,
            "procent": 7
        }, {
            "stanine": 3,
            "procent": 12
        }, {
            "stanine": 4,
            "procent": 17
        }, {
            "stanine": 5,
            "procent": 20
        }, {
            "stanine": 6,
            "procent": 17
        }, {
            "stanine": 7,
            "procent": 12
        }, {
            "stanine": 8,
            "procent": 7
        }, {
            "stanine": 9,
            "procent": 4
        }];


        //prepare Array

        var input_data = angular.copy($scope.d.stanine.data_hilfreich);
        var group_array_hilfreich = [];

        var prp = input_data[0].scores;
        prp.forEach(function(current_score, myID) {
            var obj_to_push = {
                "name": current_score.name,
                "question": current_score.question,
                "population": current_score.population,
                "sub_left": current_score.sub_left,
                "sub_right": current_score.sub_right,
                "data": []
            };

            group_array_hilfreich.push(obj_to_push);

        });

        var input_data = angular.copy($scope.d.stanine.data_stress);
        var group_array_stress = [];

        var prp = input_data[0].scores;
        prp.forEach(function(current_score, myID) {
            var obj_to_push = {
                "name": current_score.name,
                "question": current_score.question,
                "population": current_score.population,
                "sub_left": current_score.sub_left,
                "sub_right": current_score.sub_right,
                "data": []
            };

            group_array_stress.push(obj_to_push);

        });

        var input_data = angular.copy($scope.d.stanine.data_unguenstig);
        var group_array_unguenstig = [];

        var prp = input_data[0].scores;
        prp.forEach(function(current_score, myID) {
            var obj_to_push = {
                "name": current_score.name,
                "question": current_score.question,
                "population": current_score.population,
                "sub_left": current_score.sub_left,
                "sub_right": current_score.sub_right,
                "data": []
            };

            group_array_unguenstig.push(obj_to_push);

        });


        $scope.d.group_scores = {
            "hilfreich": group_array_hilfreich,
            "stress": group_array_stress,
            "unguenstig": group_array_unguenstig
        };



        // Fill Scores
        var input_data = angular.copy($scope.d.stanine.data_hilfreich);

        input_data.forEach(function(current_messung, myMessungID) {

            current_messung.scores.forEach(function(current_score, myScoreID) {

                var current_array = $scope.d.group_scores.hilfreich[myScoreID];

                var obj_to_push = {
                    "label": current_messung.label,
                    "stanine": current_score.stanine,
                    "sum_score": current_score.sum_score
                };
                current_array.data.push(obj_to_push);

            });

        });

        var input_data = angular.copy($scope.d.stanine.data_stress);

        input_data.forEach(function(current_messung, myMessungID) {

            current_messung.scores.forEach(function(current_score, myScoreID) {

                var current_array = $scope.d.group_scores.stress[myScoreID];

                var obj_to_push = {
                    "label": current_messung.label,
                    "stanine": current_score.stanine,
                    "sum_score": current_score.sum_score
                };
                current_array.data.push(obj_to_push);

            });

        });

        var input_data = angular.copy($scope.d.stanine.data_unguenstig);

        input_data.forEach(function(current_messung, myMessungID) {

            current_messung.scores.forEach(function(current_score, myScoreID) {

                var current_array = $scope.d.group_scores.unguenstig[myScoreID];

                var obj_to_push = {
                    "label": current_messung.label,
                    "stanine": current_score.stanine,
                    "sum_score": current_score.sum_score
                };
                current_array.data.push(obj_to_push);

            });

        });



        console.log('groupStanineView', $scope.d.group_scores);
    };



});
