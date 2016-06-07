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


            // Run App-Functions:
            $scope.bdi_init();
            $scope.getPatientScores();
            $scope.getCalculation();


            // Finishing: Console Info & Init = done.
            console.log('Welcome, ', $scope.d.dataMain.apps.current.name, $scope.d);
            $scope.d.init = true;
        });
    };
    $scope.loadMainData();


    // -----------------------------------
    // Calculations
    // -----------------------------------

    $scope.getCalculation = function() {
        // Get specific calculation - Unneded already in 'd.dataMain.calculations[0].calculation_results'
        var call = dataService.getAppCalculationsUser('ch.suedhang.user.apps.bdi', 'bdi_scores');

        call.success(function(data) {
            // Save Data to $scope.d
            $scope.d.calculations = data;
            //console.log('(DATA): getCalculation: ', data);
        });
        call.error(function(data) {
            console.log('(ERROR): getCalculation:', data);
        });
    };






    // -------------------
    // BDI Init
    // -------------------
    $scope.bdi_init = function() {


        $scope.d.bdi_scores = {};


        $scope.d.bdi = {};


        // Ranges initialisieren
        $scope.d.bdi.scale_ranges = {
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


        $scope.d.bdi.bdi_fragen = [{
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


    // -------------------
    // Data
    // -------------------
    $scope.getPatientScores = function() {
        // Get all BDI-Scores from a Patient and arrange it in a Array

        var all_results = $scope.d.dataMain.calculations[0].calculation_results.full;
        var patients = []

        all_results.forEach(function(current_result, myResultIndex) {

            var data_model = {
                "patient": current_result.patient,
                "scores": current_result.other_calculations.ch['suedhang.apps.bdi:bdi_score']
            };

            patients.push(data_model);
        });


        $scope.d.bdi_scores.patients = patients;

    };

    // -------------------
    // Navigation
    // -------------------
    $scope.prev = function() {

    };

    $scope.next = function() {

    };


    $scope.setCurrentResultDate = function() {
        var date = $scope.d.dataMain.calculations[0].calculation_results[$scope.d.navigator].response.data.filled;

        $scope.d.dataMain.calculations[0].calculation_results[$scope.d.navigator].response.data.filled_date = {
            'filled_datestamp': date,
            'filled_date': $filter("amDateFormat")(date, 'DD.MM.YYYY'),
            'filled_time': $filter("amDateFormat")(date, 'HH:mm')
        };

        //console.log('setCurrentResultDate', $scope.d.dataMain.calculations[0].calculation_results[$scope.d.navigator].response.data);
    };



});
