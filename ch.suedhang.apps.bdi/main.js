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
                if (current_template === 'simple_score') {
                    $scope.enhance_sr();
                    $scope.bdi_init();
                };

                if (current_template === 'data_export_admin') {
                    $scope.setExport();
                };

                if (current_template === 'scores_print') {
                    $scope.setPrintText();
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


    // -----------------------------------
    // Navigation
    // -----------------------------------

    $scope.d.navigator = 0;



    // -------------------
    // BDI Init
    // -------------------
    $scope.bdi_init = function() {



        $scope.d.show_answers_filters = [{
            "value": 0,
            "name": 'Alle Antworten'
        }, {
            "value": 1,
            "name": 'Antworten mit Score ( >=1 )'
        }, {
            "value": 2,
            "name": 'Antworten mit Score ( >=2 )'
        }, {
            "value": 3,
            "name": 'Antworten mit Score ( =3 )'
        }];

        // Ranges initialisieren
        $scope.scale_ranges = {
            "ranges": [{
                "from": 0,
                "to": 8,
                "result": "Keine Depression",
                "result_color": "green"
            }, {
                "from": 9,
                "to": 13,
                "result": "Minimale Depression",
                "result_color": "green"
            }, {
                "from": 14,
                "to": 19,
                "result": "Leichte Depression",
                "result_color": "orange"
            }, {
                "from": 20,
                "to": 28,
                "result": "Mittelschwere Depression",
                "result_color": "orange"
            }, {
                "from": 29,
                "to": 63,
                "result": "Schwere Depression",
                "result_color": "red"
            }]
        };


        $scope.d.bdi_fragen = [{
            "name": "1. Traurigkeit",
            "answers": [{
                "code": "0",
                "item": "Ich bin nicht traurig"
            }, {
                "code": "1",
                "item": "Ich bin oft traurig"
            }, {
                "code": "2",
                "item": "Ich bin ständig traurig"
            }, {
                "code": "3",
                "item": "Ich bin so traurig oder unglücklich, dass ich es nicht aushalte"
            }]
        }, {
            "name": "2. Pessimismus",
            "answers": [{
                "code": "0",
                "item": "Ich sehe nicht mutlos in die Zukunft"
            }, {
                "code": "1",
                "item": "Ich sehe mutloser in die Zukunft als sonst"
            }, {
                "code": "2",
                "item": "Ich bin mutlos und erwarte nicht, dass meine Situation besser wird"
            }, {
                "code": "3",
                "item": "Ich glaube, dass meine Zukunft hoffnungslos ist und nur noch schlechter wird"
            }]
        }, {
            "name": "3. Versagensgefühle",
            "answers": [{
                "code": "0",
                "item": "Ich fühle mich nicht als Versager"
            }, {
                "code": "1",
                "item": "Ich habe häufiger Versagensgefühle"
            }, {
                "code": "2",
                "item": "Wenn ich zurückblicke, sehe ich eine Menge Fehlschläge"
            }, {
                "code": "3",
                "item": "Ich habe das Gefühl, als Mensch ein völliger Versager zu sein"
            }]
        }, {
            "name": "4. Verlust von Freude",
            "answers": [{
                "code": "0",
                "item": "Ich kann Dinge genauso gut geniessen wie früher"
            }, {
                "code": "1",
                "item": "Ich kann Dinge nicht mehr so geniessen wie früher"
            }, {
                "code": "2",
                "item": "Dinge, die mir früher Freude gemacht haben, kann ich kaum mehr geniessen"
            }, {
                "code": "3",
                "item": "Dinge, die mir früher Freude gemacht haben, kann ich überhaupt nicht mehr geniessen"
            }]
        }, {
            "name": "5. Schuldgefühle",
            "answers": [{
                "code": "0",
                "item": "Ich habe keine besonderen Schuldgefühle"
            }, {
                "code": "1",
                "item": "Ich habe oft Schuldgefühle wegen Dingen, die ich getan habe oder hätte tun sollen"
            }, {
                "code": "2",
                "item": "Ich habe die meiste Zeit Schuldgefühle"
            }, {
                "code": "3",
                "item": "Ich habe ständig Schuldgefühle"
            }]
        }, {
            "name": "6. Bestrafungsgefühle",
            "answers": [{
                "code": "0",
                "item": "Ich habe nicht das Gefühl, für etwas bestraft zu sein"
            }, {
                "code": "1",
                "item": "Ich habe das Gefühl, vielleicht bestraft zu werden"
            }, {
                "code": "2",
                "item": "Ich erwarte, bestraft zu werden"
            }, {
                "code": "3",
                "item": "Ich habe das Gefühl, bestraft zu sein"
            }]
        }, {
            "name": "7. Selbstablehnung",
            "answers": [{
                "code": "0",
                "item": "Ich halte von mir genauso viel wie immer"
            }, {
                "code": "1",
                "item": "Ich habe Vertrauen in mich verloren"
            }, {
                "code": "2",
                "item": "Ich bin von mir enttäuscht"
            }, {
                "code": "3",
                "item": "Ich lehne mich völlig ab"
            }]
        }, {
            "name": "8. Selbstvorwürfe",
            "answers": [{
                "code": "0",
                "item": "Ich kritisiere oder tadle mich nicht mehr als sonst"
            }, {
                "code": "1",
                "item": "Ich bin mir gegenüber kritischer als sonst"
            }, {
                "code": "2",
                "item": "Ich kritisiere mich für all meine Mängel"
            }, {
                "code": "3",
                "item": "Ich gebe mir die Schuld für alles Schlimme, was passiert"
            }]
        }, {
            "name": "9. Selbstmordgedanken",
            "answers": [{
                "code": "0",
                "item": "Ich denke nicht daran, mir etwas anzutun"
            }, {
                "code": "1",
                "item": "Ich denke manchmal an Selbstmord, aber ich würde es nicht tun"
            }, {
                "code": "2",
                "item": "Ich möchte mich am liebsten umbringen"
            }, {
                "code": "3",
                "item": "Ich würde mich umbringen, wenn ich die Gelegenheit dazu hätte"
            }]
        }, {
            "name": "10. Weinen",
            "answers": [{
                "code": "0",
                "item": "Ich weine nicht öfter als früher"
            }, {
                "code": "1",
                "item": "Ich weine jetzt mehr als früher"
            }, {
                "code": "2",
                "item": "Ich weine beim geringsten Anlass"
            }, {
                "code": "3",
                "item": "Ich möchte gern weinen, aber ich kann nicht"
            }]
        }, {
            "name": "11. Unruhe",
            "answers": [{
                "code": "0",
                "item": "Ich bin nicht unruhiger als sonst"
            }, {
                "code": "1",
                "item": "Ich bin unruhiger als sonst"
            }, {
                "code": "2",
                "item": "Ich bin so unruhig, dass es mir schwerfällt, stillzusitzen"
            }, {
                "code": "3",
                "item": "Ich bin so unruhig, dass ich mich ständig bewege oder etwas tun muss"
            }]
        }, {
            "name": "12. Interessenverlust",
            "answers": [{
                "code": "0",
                "item": "Ich habe das Interesse an anderen Menschen oder Tätigkeiten nicht verloren"
            }, {
                "code": "1",
                "item": "Ich habe weniger Interesse an anderen Menschen oder Dingen als sonst"
            }, {
                "code": "2",
                "item": "Ich habe Interesse an anderen Menschen oder Dingen grössten Teils verloren"
            }, {
                "code": "3",
                "item": "Es fällt mir schwer, mich überhaupt für etwas zu interessieren"
            }]
        }, {
            "name": "13. Entschlussunfähigkeit",
            "answers": [{
                "code": "0",
                "item": "Ich bin so entschlussfreudig wie immer"
            }, {
                "code": "1",
                "item": "Es fällt mir schwerer als sonst, Entscheidungen zu treffen"
            }, {
                "code": "2",
                "item": "Es fällt mir sehr viel schwerer als sonst, Entscheidungen zu treffen"
            }, {
                "code": "3",
                "item": "Ich habe Mühe, überhaupt Entscheidungen zu treffen"
            }]
        }, {
            "name": "14. Wertlosigkeit",
            "answers": [{
                "code": "0",
                "item": "Ich fühle mich nicht wertlos"
            }, {
                "code": "1",
                "item": "Ich halte mich für weniger wertvoll und nützlich als sonst"
            }, {
                "code": "2",
                "item": "Verglichen mit anderen Menschen fühle ich mich viel weniger wert"
            }, {
                "code": "3",
                "item": "Ich fühle mich völlig wertlos"
            }]
        }, {
            "name": "15. Energieverlust",
            "answers": [{
                "code": "0",
                "item": "Ich habe so viel Energie wie immer"
            }, {
                "code": "1",
                "item": "Ich habe weniger Energie als sonst"
            }, {
                "code": "2",
                "item": "Ich habe so wenig Energie, dass ich kaum noch etwas schaffe"
            }, {
                "code": "3",
                "item": "Ich habe keine Energie, um überhaupt noch etwas schaffen"
            }]
        }, {
            "name": "16. Veränderungen der Schlafgewohnheiten",
            "answers": [{
                "code": "0",
                "item": "Meine Schlafgewohnheiten haben sich nicht geändert"
            }, {
                "code": "1a",
                "item": "Ich schlafe etwas mehr als sonst"
            }, {
                "code": "1b",
                "item": "Ich schlafe etwas weniger als sonst"
            }, {
                "code": "2a",
                "item": "Ich schlafe viel mehr als sonst"
            }, {
                "code": "2b",
                "item": "Ich schlafe viel weniger als sonst"
            }, {
                "code": "3a",
                "item": "Ich schlafe fast den ganzen Tag"
            }, {
                "code": "3b",
                "item": "Ich wache 1 - 2 Stunden früher auf als gewöhnlich und kann nicht mehr einschlafen"
            }]
        }, {
            "name": "17. Reizbarkeit",
            "answers": [{
                "code": "0",
                "item": "Ich bin nicht reizbarer als sonst"
            }, {
                "code": "1",
                "item": "Ich bin reizbarer als sonst"
            }, {
                "code": "2",
                "item": "Ich bin viel reizbarer als sonst"
            }, {
                "code": "3",
                "item": "Ich fühle mich dauernd gereizt"
            }]
        }, {
            "name": "18. Veränderungen des Appetits",
            "answers": [{
                "code": "0",
                "item": "Mein Appetit hat sich nicht verändert"
            }, {
                "code": "1a",
                "item": "Mein Appetit ist etwas schlechter als sonst"
            }, {
                "code": "1b",
                "item": "Mein Appetit ist etwas grösser als sonst"
            }, {
                "code": "2a",
                "item": "Mein Appetit ist viel schlechter als sonst"
            }, {
                "code": "2b",
                "item": "Mein Appetit ist viel grösser als sonst"
            }, {
                "code": "3a",
                "item": "Ich habe überhaupt keinen Appetit"
            }, {
                "code": "3b",
                "item": "Ich habe ständig Hunger"
            }]
        }, {
            "name": "19. Konzentrationsschwierigkeiten",
            "answers": [{
                "code": "0",
                "item": "Ich kann mich so gut konzentrieren wie immer"
            }, {
                "code": "1",
                "item": "Ich kann mich nicht mehr so gut konzentrieren wie sonst"
            }, {
                "code": "2",
                "item": "Es fällt mir schwer, mich längere Zeit auf irgend etwas zu konzentrieren"
            }, {
                "code": "3",
                "item": "Ich kann mich überhaupt nicht mehr konzentrieren"
            }]
        }, {
            "name": "20. Ermüdung und Erschöpfung",
            "answers": [{
                "code": "0",
                "item": "Ich fühle mich nicht müder oder erschöpfter als sonst"
            }, {
                "code": "1",
                "item": "Ich werde schneller müde oder erschöpft als sonst"
            }, {
                "code": "2",
                "item": "Für viele Dinge, die ich üblicherweise tue, bin ich zu müde oder erschöpft"
            }, {
                "code": "3",
                "item": "Ich bin so müde oder erschöpft, dass ich fast nichts mehr tun kann"
            }]
        }, {
            "name": "21. Verlust an sexuellem Interesse",
            "answers": [{
                "code": "0",
                "item": "Mein Interesse an Sexualität hat sich in letzter Zeit nicht verändert"
            }, {
                "code": "1",
                "item": "Ich interessiere mich weniger für Sexualität als früher"
            }, {
                "code": "2",
                "item": "Ich interessiere mich jetzt viel weniger für Sexualität als früher"
            }, {
                "code": "3",
                "item": "Ich habe das Interesse an Sexualität völlig verloren"
            }]
        }];
    };

    $scope.enhance_sr = function() {
        var survey_responses = $scope.d.dataMain.survey_responses;
        survey_responses.forEach(function(sr, srID) {


            var response = sr.calculations["0"].calculation_result.response.data.response;
            var score = sr.calculations["0"].calculation_result.score;

            var zeipunkt_text = "Nicht festgelegt";
            var zeipunkt_datum = response.Datum;
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


            $scope.d.show_answers = false;
            $scope.d.show_answers_filter = 3;

            // Write
            sr.bdi = {
                "zeipunkt_text": zeipunkt_text,
                "zeipunkt_datum": zeipunkt_datum,
                "score": score.score,
                "interpretation": score.current_range,
                "show_answers": false,
                "show_answers_filter": 3
            };

            // Filter
            $scope.setAnswerFilter(srID, 3);

        });
    };

    // -------------------
    // Navigation
    // -------------------
    $scope.prev = function() {
        var count = $scope.d.dataMain.survey_responses.length - 1;

        if ($scope.d.navigator === 0) {
            $scope.d.navigator = count;
        } else {
            $scope.d.navigator = $scope.d.navigator - 1
        };
        $scope.setAnswerFilter($scope.d.show_answers);
    };

    $scope.next = function() {
        var count = $scope.d.dataMain.survey_responses.length - 1;

        if (count === $scope.d.navigator) {
            $scope.d.navigator = 0;
        } else {
            $scope.d.navigator = $scope.d.navigator + 1
        };
        $scope.setAnswerFilter($scope.d.show_answers);
    };


    // -------------------
    // Filter Answers
    // -------------------
    $scope.setAnswerFilter = function(current_array_id, answer_filter) {

        var results = $scope.d.dataMain.survey_responses[current_array_id].calculations['0'].calculation_result.response.data.response;

        for (var i = 1; i < 22; i++) {

            var current_answer = results['BDI' + i];
            var current_score = parseInt(results['BDI' + i]);


            results['BDI_filter_' + i] = false;
            //console.log(':::> ', i, current_answer, current_score);

            if (current_score >= answer_filter) {
                results['BDI_filter_' + i] = true;
                //console.log(':::::::::  TRUE  > ', i, current_answer, current_score, $scope.d.show_answers_filter);
            };

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
            name: 'BDI-II',
            sql: include_as_js_string(
                export.sql)
        };
        module_packages.push(data_query);

        // Init the given Export Settings
        $scope.d.sql_box = $scope.d.functions.getDefaultExportSettings($scope.d.dataMain.params.app_id, module_packages);
    };


    // -------------------
    // Data-Export
    // -------------------
    $scope.setPrintText = function() {
        var t = {};

        t.patient_anrede = $scope.d.dataMain.patient.data.extras.anrede;

        t.messungen = $scope.d.dataMain.calculations[0].calculation_results;
        // t.messungen = dataService.sortOn(t.messungen, 'response.data.filled', true, false);

        console.log('t.messungen', t);

        t.text_start = t.patient_anrede + " wurde " + t.messungen.length + "x während des Aufenthaltes anhand des Selbstbeurteilungsinstruments «BDI-II» getestet: ";

        $scope.d.text = t;

    };

});
