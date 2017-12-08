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
                // $scope.setStanineView();
                // $scope.groupStanineView();
                // $scope.setExport();

            };

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
            sql: __opapp_include_as_js_string(includes/export.sql)
        };
        module_packages.push(data_query);

        // Init the given Export Settings
        $scope.d.sql_box = $scope.d.functions.getDefaultExportSettings($scope.d.dataMain.params.app_id, module_packages);
    };


    // -----------------------------------
    // Stanine - Chart  <chart-stanine>
    // -----------------------------------


    $scope.setStanineView = function() {

        // Ranges initialisieren
        $scope.d.scale_ranges = {
            "ranges": [{
                "from": 1,
                "to": 1.5,
                "result": "Stanine 1",
                "result_color": "green"
            }, {
                "from": 1.5,
                "to": 2.5,
                "result": "Stanine 2",
                "result_color": "green"
            }, {
                "from": 2.5,
                "to": 3.5,
                "result": "Stanine 3",
                "result_color": "green"
            }, {
                "from": 3.5,
                "to": 4.5,
                "result": "Stanine 4",
                "result_color": "green"
            }, {
                "from": 4.5,
                "to": 5.5,
                "result": "Stanine 5",
                "result_color": "green"
            }, {
                "from": 5.5,
                "to": 6.5,
                "result": "Stanine 6",
                "result_color": "green"
            }, {
                "from": 6.5,
                "to": 7.5,
                "result": "Stanine 7",
                "result_color": "green"
            }, {
                "from": 7.5,
                "to": 8.5,
                "result": "Stanine 8",
                "result_color": "green"
            }, {
                "from": 8.5,
                "to": 9,
                "result": "Stanine 9",
                "result_color": "green"
            }]
        };

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


        $scope.stanine = {};
        $scope.stanine.data = [];

        // Loop Responses and push to Chart-Data
        var survey_responses = $scope.d.dataMain.survey_responses;
        survey_responses.forEach(function(current_response, myindex) {


            // Scores

            var score_answer = [{
                "question": "Soziale Orientierung",
                "full": "Sich für andere Menschen einsetzen, aufmerksam und hilfsbereit sein, andere Meinungen tolerieren und Kompromisse anstreben.",
                "auspraegung": "Undefined",
                "interpretation": "Undefined",
                "sub_left": "Auf den eigenen Vorteil bedacht sein, sich nicht für andere interessieren und deren Meinung ignorieren oder gering schätzen",
                "sub_right": "Überinvolviert, Kompromisslosigkeit",
                "stanine": current_response.calculations[0].calculation_result.soziale_orientierung_stanine,
                "sum_score": current_response.calculations[0].calculation_result.soziale_orientierung_sumscore
            }, {
                "question": "Offensivität",
                "full": "Auf andere Menschen zugehen und dabei Konflikte nicht scheuen, Entscheidungen treffen, eigene Interessen tatkräftig verwirklichen.",
                "auspraegung": "Undefined",
                "interpretation": "Undefined",
                "sub_left": "Sich sozial isolieren, Konflikten aus dem Weg gehen, sich unterordnen, Entscheidungen vor sich her schieben",
                "sub_right": "Streitlustig, unüberlegte Entscheidungen",
                "stanine": current_response.calculations[0].calculation_result.offensivitaet_stanine,
                "sum_score": current_response.calculations[0].calculation_result.offensivitaet_sumscore
            }, {
                "question": "Selbststeuerung",
                "full": "Rational handeln, sich nicht von Emotionen bestimmen lassen, die Verantwortung für das Leben bei sich selbst sehen.",
                "auspraegung": "Undefined",
                "interpretation": "Undefined",
                "sub_left": "Sich treiben lassen, in seinem Handeln von ggf. stark schwankenden Emotionen bestimmt sein und die Verantwortung für das eigene Leben in der Umwelt ansiedeln",
                "sub_right": "Zwanghafte Selbstkontrolle",
                "stanine": current_response.calculations[0].calculation_result.selbststeuerung_stanine,
                "sum_score": current_response.calculations[0].calculation_result.selbststeuerung_sumscore
            }, {
                "question": "Reflexibilität",
                "full": "Das eigene Verhalten und die Wirkung auf andere reflektieren und gegebenenfalls gezielt steuern, sich für andere Menschen interessieren.",
                "auspraegung": "Undefined",
                "interpretation": "Undefined",
                "sub_left": "Sich nicht mit seinem Verhalten auseinandersetzten, gleichgültig gegenüber dem Verhalten und Erleben anderer Menschen",
                "sub_right": "Zwanghafte Selbstdarstellung, Rigidität",
                "stanine": current_response.calculations[0].calculation_result.reflexibilitaet_stanine,
                "sum_score": current_response.calculations[0].calculation_result.reflexibilitaet_sumscore
            }];


            // Interpretation hinzufügen

            var soziale_orientierung_auspraegung = 'Gering (1-3)';
            var soziale_orientierung_interpretation = 'Auf den eigenen Vorteil bedacht sein, sich nicht für andere interessieren und deren Meinung ignorieren oder gering schätzen.';

            if (current_response.calculations[0].calculation_result.soziale_orientierung_stanine > 3) {
                soziale_orientierung_auspraegung = 'Mittel (4-6)';
                soziale_orientierung_interpretation = 'Sich für andere Menschen einsetzen, aufmerksam und hilfsbereit sein, andere Meinungen tolerieren und Kompromisse anstreben.';
            };

            if (current_response.calculations[0].calculation_result.soziale_orientierung_stanine > 6) {
                soziale_orientierung_auspraegung = 'Hoch (7-9)';
                soziale_orientierung_interpretation = 'Überinvolviert, Kompromisslosigkeit';
            };
            score_answer[0].auspraegung = soziale_orientierung_auspraegung;
            score_answer[0].interpretation = soziale_orientierung_interpretation;


            var offenisvitaet_auspraegung = 'Gering (1-3)';
            var offenisvitaet_interpretation = 'Sich sozial isolieren, Konflikten aus dem Weg gehen, sich unterordnen, Entscheidungen vor sich her schieben';

            if (current_response.calculations[0].calculation_result.offensivitaet_stanine > 3) {
                offenisvitaet_auspraegung = 'Mittel (4-6)';
                offenisvitaet_interpretation = 'Auf andere Menschen zugehen und dabei Konflikte nicht scheuen, Entscheidungen treffen, eigene Interessen tatkräftig verwirklichen.';
            };

            if (current_response.calculations[0].calculation_result.offensivitaet_stanine > 6) {
                offenisvitaet_auspraegung = 'Hoch (7-9)';
                offenisvitaet_interpretation = 'Streitlustig, unüberlegte Entscheidungen';
            };
            score_answer[1].auspraegung = offenisvitaet_auspraegung;
            score_answer[1].interpretation = offenisvitaet_interpretation;


            var selbststeuerung_auspraegung = 'Gering (1-3)';
            var selbststeuerung_interpretation = 'Sich treiben lassen, in seinem Handeln von ggf. stark schwankenden Emotionen bestimmt sein und die Verantwortung für das eigene Leben in der Umwelt ansiedeln';

            if (current_response.calculations[0].calculation_result.selbststeuerung_stanine > 3) {
                selbststeuerung_auspraegung = 'Mittel (4-6)';
                selbststeuerung_interpretation = 'Rational handeln, sich nicht von Emotionen bestimmen lassen, die Verantwortung für das Leben bei sich selbst sehen';
            };

            if (current_response.calculations[0].calculation_result.selbststeuerung_stanine > 6) {
                selbststeuerung_auspraegung = 'Hoch (7-9)';
                selbststeuerung_interpretation = 'Zwanghafte Selbstkontrolle';
            };
            score_answer[2].auspraegung = selbststeuerung_auspraegung;
            score_answer[2].interpretation = selbststeuerung_interpretation;


            var reflexibilitaet_auspraegung = 'Gering (1-3)';
            var reflexibilitaet_interpretation = 'Sich nicht mit seinem Verhalten auseinandersetzten, gleichgültig gegenüber dem Verhalten und Erleben anderer Menschen';

            if (current_response.calculations[0].calculation_result.reflexibilitaet_stanine > 3) {
                reflexibilitaet_auspraegung = 'Mittel (4-6)';
                reflexibilitaet_interpretation = 'Das eigenen Verhalten und die Wirkung auf andere reflektieren und ggf. gezielt steuern, sich für andere Menschen interessieren';
            };

            if (current_response.calculations[0].calculation_result.reflexibilitaet_stanine > 6) {
                reflexibilitaet_auspraegung = 'Hoch (7-9)';
                reflexibilitaet_interpretation = 'Zwanghafte Selbstdarstellung, Rigidität';
            };
            score_answer[3].auspraegung = reflexibilitaet_auspraegung;
            score_answer[3].interpretation = reflexibilitaet_interpretation;


            // Create nice Labels
            var date = $scope.d.functions.sureDateInstance(current_response.entity.data.filled);
            var label = $filter("amDateFormat")(date, 'DD.MM.YYYY');
            var label_type = 'Verlauf';


            // Unsicher ob die hier noch stimmt - muss noch überprüft werden.
            if (current_response.entity.data.response.Erhebungszeitpunkt === '1') {
                label_type = 'Eintritt';
            };
            if (current_response.entity.data.response.Erhebungszeitpunkt === '2') {
                label_type = 'Austritt';
            };
            label = label_type + ': ' + label;


            var respone_to_push = {
                "mz": label_type,
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


    $scope.groupStanineView = function() {


        var input_data = angular.copy($scope.stanine.data);

        //prepare Array

        var group_array = [];

        var prp = input_data[0].scores;
        prp.forEach(function(current_score, myID) {
            var obj_to_push = {
                "full": current_score.full,
                "question": current_score.question,
                "sub_left": current_score.sub_left,
                "sub_right": current_score.sub_right,
                "data": []
            };

            group_array.push(obj_to_push);

        });

        $scope.d.group_scores = group_array;

        // Fill Scores
        input_data.forEach(function(current_messung, myMessungID) {

            current_messung.scores.forEach(function(current_score, myScoreID) {

                var current_array = $scope.d.group_scores[myScoreID];

                var obj_to_push = {
                    "auspraegung": current_score.auspraegung,
                    "interpretation": current_score.interpretation,
                    "stanine": current_score.stanine,
                    "sum_score": current_score.sum_score,
                    "label": current_messung.label
                };
                current_array.data.push(obj_to_push);

            });

        });

        console.log('groupStanineView', $scope.d.group_scores);


    };


});
