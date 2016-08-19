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


    $scope.setStanineView = function() {

        $scope.stanine = {};
        $scope.stanine.data = [];

        // Loop Responses and push to Chart-Data
        var survey_responses = $scope.d.dataMain.survey_responses;
        survey_responses.forEach(function(current_response, myindex) {


            // Scores

            var score_answer = [{
                "question": "Soziale Orientierung",
                "full": "Ausmass, in dem eine Person anderen Menschen offen und mit positiver Grundhaltung gegenüber tritt.",
                "auspraegung": "Undefined",
                "interpretation": "Undefined",
                "sub_left": "Ausmass, in dem eine Person anderen Menschen offen ...",
                "sub_right": "... und mit positiver Grundhaltung gegenüber tritt. (Σ" + current_response.calculations[0].calculation_result.soziale_orientierung_sumscore + ")",
                "stanine": current_response.calculations[0].calculation_result.soziale_orientierung_stanine,
                "sum_score": current_response.calculations[0].calculation_result.soziale_orientierung_sumscore
            }, {
                "question": "Offensivität",
                "full": "Fähigkeit, aus sich herauszugehen und im Kontakt mit anderen Menschen eigene Interessen aktiv verwirklichen zu können.",
                "auspraegung": "Undefined",
                "interpretation": "Undefined",
                "sub_left": "Fähigkeit, aus sich herauszugehen...",
                "sub_right": "... um eigene Interessen aktiv zu verwirklichen. (Σ" + current_response.calculations[0].calculation_result.offensivitaet_sumscore + ")",
                "stanine": current_response.calculations[0].calculation_result.offensivitaet_stanine,
                "sum_score": current_response.calculations[0].calculation_result.offensivitaet_sumscore
            }, {
                "question": "Selbststeuerung",
                "full": "Fähigkeit eines Menschen, flexibel und rational zu handeln, wobei man sich selbst bewusst als Akteur begreift.",
                "auspraegung": "Undefined",
                "interpretation": "Undefined",
                "sub_left": "Fähigkeit, flexibel und rational zu handeln, ...",
                "sub_right": "... und sich selbst als Akteur begreift. (Σ" + current_response.calculations[0].calculation_result.selbststeuerung_sumscore + ")",
                "stanine": current_response.calculations[0].calculation_result.selbststeuerung_stanine,
                "sum_score": current_response.calculations[0].calculation_result.selbststeuerung_sumscore
            }, {
                "question": "Reflexibilität",
                "full": "Fähigkeit einer Person, bei anderen Menschen einen positiven bzw. gewünschten Eindruck zu erzeugen.",
                "auspraegung": "Undefined",
                "interpretation": "Undefined",
                "sub_left": "Fähigkeit, bei anderen Menschen einen positiven ...",
                "sub_right": "... Eindruck zu erzeugen. (Σ" + current_response.calculations[0].calculation_result.reflexibilitaet_sumscore + ")",
                "stanine": current_response.calculations[0].calculation_result.reflexibilitaet_stanine,
                "sum_score": current_response.calculations[0].calculation_result.reflexibilitaet_sumscore
            }];


            // Interpretation hinzufügen

            var soziale_orientierung_auspraegung = 'gering';
            var soziale_orientierung_interpretation = 'Auf den eigenen Vorteil bedacht sein, sich nicht für andere interessieren und deren Meinung ignorieren oder gering schätzen.';

            if (current_response.calculations[0].calculation_result.soziale_orientierung_stanine > 3) {
                soziale_orientierung_auspraegung = 'mittel';
                soziale_orientierung_interpretation = 'Sich für andere Menschen einsetzen, aufmerksam und hilfsbereit sein, andere Meinungen tolerieren und Kompromisse anstreben.';
            };

            if (current_response.calculations[0].calculation_result.soziale_orientierung_stanine > 6) {
                soziale_orientierung_auspraegung = 'hoch';
                soziale_orientierung_interpretation = 'Überinvolviert, Kompromisslosigkeit';
            };
            score_answer[0].auspraegung = soziale_orientierung_auspraegung;
            score_answer[0].interpretation = soziale_orientierung_interpretation;


            var offenisvitaet_auspraegung = 'gering';
            var offenisvitaet_interpretation = 'Auf den eigenen Vorteil bedacht sein, sich nicht für andere interessieren und deren Meinung ignorieren oder gering schätzen.';

            if (current_response.calculations[0].calculation_result.offensivitaet_stanine > 3) {
                offenisvitaet_auspraegung = 'mittel';
                offenisvitaet_interpretation = 'Sich für andere Menschen einsetzen, aufmerksam und hilfsbereit sein, andere Meinungen tolerieren und Kompromisse anstreben.';
            };

            if (current_response.calculations[0].calculation_result.offensivitaet_stanine > 6) {
                offenisvitaet_auspraegung = 'hoch';
                offenisvitaet_interpretation = 'Überinvolviert, Kompromisslosigkeit';
            };
            score_answer[1].auspraegung = offenisvitaet_auspraegung;
            score_answer[1].interpretation = offenisvitaet_interpretation;


            var selbststeuerung_auspraegung = 'gering';
            var selbststeuerung_interpretation = 'Auf den eigenen Vorteil bedacht sein, sich nicht für andere interessieren und deren Meinung ignorieren oder gering schätzen.';

            if (current_response.calculations[0].calculation_result.selbststeuerung_stanine > 3) {
                selbststeuerung_auspraegung = 'mittel';
                selbststeuerung_interpretation = 'Sich für andere Menschen einsetzen, aufmerksam und hilfsbereit sein, andere Meinungen tolerieren und Kompromisse anstreben.';
            };

            if (current_response.calculations[0].calculation_result.selbststeuerung_stanine > 6) {
                selbststeuerung_auspraegung = 'hoch';
                selbststeuerung_interpretation = 'Überinvolviert, Kompromisslosigkeit';
            };
            score_answer[2].auspraegung = selbststeuerung_auspraegung;
            score_answer[2].interpretation = selbststeuerung_interpretation;


            var reflexibilitaet_auspraegung = 'gering';
            var reflexibilitaet_interpretation = 'Auf den eigenen Vorteil bedacht sein, sich nicht für andere interessieren und deren Meinung ignorieren oder gering schätzen.';

            if (current_response.calculations[0].calculation_result.offensivitaet_stanine > 3) {
                reflexibilitaet_auspraegung = 'mittel';
                reflexibilitaet_interpretation = 'Sich für andere Menschen einsetzen, aufmerksam und hilfsbereit sein, andere Meinungen tolerieren und Kompromisse anstreben.';
            };

            if (current_response.calculations[0].calculation_result.offensivitaet_stanine > 6) {
                reflexibilitaet_auspraegung = 'hoch';
                reflexibilitaet_interpretation = 'Überinvolviert, Kompromisslosigkeit';
            };
            score_answer[3].auspraegung = reflexibilitaet_auspraegung;
            score_answer[3].interpretation = reflexibilitaet_interpretation;


            // Create nice Labels
            var date = $scope.d.functions.sureDateInstance(current_response.entity.data.filled);
            var label = $filter("amDateFormat")(date, 'DD.MM.YYYY');
            var label_type = 'Verlauf: ';


            // Unsicher ob die hier noch stimmt - muss noch überprüft werden.
            if (current_response.entity.data.response.Erhebungszeitpunkt === '1') {
                label_type = 'Eintritt: ';
            };
            if (current_response.entity.data.response.Erhebungszeitpunkt === '2') {
                label_type = 'Austritt: ';
            };
            label = label_type + label;


            var respone_to_push = {
                "label": label,
                "scores": score_answer
            }
            $scope.stanine.data.push(respone_to_push);
        });


        $scope.stanine.options = {
            "population_name": "Inventar Sozialer Kompetenzen - Kurzform",
            "norm_name": "Normalbereich",
            "start_result": $scope.stanine.data.length - 1
        };



        console.log('(!) setStanineView', $scope.stanine);
    };




});
