function($scope) {

    // Init
    set_nice_birthday();

    var myscope = $scope.HoNOS;

    $scope.current_directive = {
        "title": "Health of the nation outcomes scales (HoNOS)",
        "description": "Gesundheit und soziale Funktionsfähigkeit, 12 Items.",
        "info": $scope.patient.lastName + ' ' + $scope.patient.firstName + ' ( ' + $scope.patient.birthday + ' | ' + $scope.patient.age + ' ):'
    };


    $scope.messzeitpunkt_eintritt_vorhanden = false;
    $scope.messzeitpunkt_verlauf_vorhanden = false;
    $scope.messzeitpunkt_austritt_vorhanden = false;
    $scope.daten_anzeigen = false;
    $scope.graph = 'score_honos=';


    // Functions

    function set_nice_birthday() {
        //console.log('set_nice_birthday', $scope.patient.birthdate);
        var today = new Date();
        var birthDate = new Date($scope.patient.birthdate);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        //console.log('age', age);

        if ($scope.patient.birthdate !== null) {
            $scope.patient.birthday = $scope.patient.birthdate.substring(0, 10);
            $scope.patient.age = age;
        } else {
            $scope.patient.birthday = 'unknown';
            $scope.patient.age = '?';
        }
        //console.log('$scope.patient.birthday = ', $scope.patient.birthday);
    }

    // Runden

    function roundToOne(num) {
        return +(Math.round(num + "e+1") + "e-1");
    }

    // if Data available
    if (myscope !== undefined) {
        $scope.have_data = true;

        // SORT (ARRAY of Objects) - datestamp ascending
        myscope = myscope.sort(function(a, b) {
            var dateA = new Date(a.q402V00),
                dateB = new Date(b.q402V00)
            return dateA - dateB //sort by date ascending
        });

        // Loop durch alle Ergebnisse (Messungen)
        for (var i = 0; i < myscope.length; i++) {

            // Variablen initialisieren
            myscope[i].label = {
                "results": [{
                    "0": {
                        "order": 1,
                        "question": "Überaktives, aggressives, Unruhe stiftendes oder agitiertes Verhalten",
                        "var": "402V01",
                        "sum_score": 0
                    },
                    "1": {
                        "order": 2,
                        "question": "Absichtliche Selbstverletzung",
                        "var": "402V02",
                        "sum_score": 0
                    },
                    "2": {
                        "order": 3,
                        "question": "Problematischer Alkohol- oder Drogenkonsum",
                        "var": "402V03",
                        "sum_score": 0
                    },
                    "3": {
                        "order": 4,
                        "question": "Kognitive Probleme",
                        "var": "402V04",
                        "sum_score": 0
                    },
                    "4": {
                        "order": 5,
                        "question": "Probleme in Zusammenhang mit körperlicher Erkrankung",
                        "var": "02V05",
                        "sum_score": 0
                    },
                    "5": {
                        "order": 6,
                        "question": "Probleme in Zusammenhang mit Halluzinationen und Wahnvorstellung",
                        "var": "402V06",
                        "sum_score": 0
                    },
                    "6": {
                        "order": 7,
                        "question": "Gedrückte Stimmung",
                        "var": "402V07",
                        "sum_score": 0
                    },
                    "7": {
                        "order": 8,
                        "question": "Andere psychische Probleme",
                        "var": "402V08",
                        "sum_score": 0
                    },
                    "8": {
                        "order": 9,
                        "question": "Probleme mit Beziehung",
                        "var": "402V11",
                        "sum_score": 0
                    },
                    "9": {
                        "order": 10,
                        "question": "Probleme mit alltäglichen Aktivitäten",
                        "var": "402V12",
                        "sum_score": 0
                    },
                    "10": {
                        "order": 11,
                        "question": "Probleme durch die Wohnbedingungen",
                        "var": "402V13",
                        "sum_score": 0
                    },
                    "11": {
                        "order": 12,
                        "question": "Probleme durch die Bedingungen in Beruf und Alltag",
                        "var": "402V14",
                        "sum_score": 0
                    }
                }]
            };

            // Einfacher Result_Scope definieren
            var result_scope = [];
            result_scope = myscope[i].label.results[0];

            // Messzeitpunkt auslesen und in results schreiben
            result_scope.messzeitpunkt = 'undefined';
            result_scope.datum = myscope[i].q402V00.substring(0, 10);

            if (myscope[i].q401V04 === '1') {
                result_scope.messzeitpunkt = 'Eintritt';
                $scope.messzeitpunkt_eintritt_vorhanden = true;
            };
            if (myscope[i].q401V04 === '2') {
                result_scope.messzeitpunkt = 'Austritt';
                $scope.messzeitpunkt_austritt_vorhanden = true;
            };
            if (myscope[i].q401V04 === '3') {
                result_scope.messzeitpunkt = 'Verlauf (14-täglich)';
                $scope.messzeitpunkt_verlauf_vorhanden = true;
            };
            if (($scope.messzeitpunkt_eintritt_vorhanden === true) && ($scope.messzeitpunkt_austritt_vorhanden == true)) {
                $scope.daten_anzeigen = true;
            };


            // Dropout
            myscope[i].dropout_code_vorhanden = false;
            if (myscope[i].q401V05 != '0') {
                myscope[i].dropout_code_vorhanden = true;
                if (myscope[i].q401V05 === '1') {
                    myscope[i].dropout_code = 'Patient ist innerhalb von 7 Tagen nach Eintritt ausgetreten.';
                };
                if (myscope[i].q401V05 === '2') {
                    myscope[i].dropout_code = myscope[i].q401V06;
                };
            } else {
                // KEIN DROPOUT


                // Andere psychische Probleme bestimmen und in label.results schreiben.
                if (myscope[i].q402V09 === 'a') {
                    result_scope[7].other = 'Phobisch';
                    result_scope[7].full_question = result_scope[7].question + ': ' + result_scope[7].other;
                };
                if (myscope[i].q402V09 === 'b') {
                    result_scope[7].other = 'Angst';
                    result_scope[7].full_question = result_scope[7].question + ': ' + result_scope[7].other;
                };
                if (myscope[i].q402V09 === 'c') {
                    result_scope[7].other = 'Zwangsgedanken/ -handlungen';
                    result_scope[7].full_question = result_scope[7].question + ': ' + result_scope[7].other;
                };
                if (myscope[i].q402V09 === 'd') {
                    result_scope[7].other = 'Psychische Belastung/ Anspannung';
                    result_scope[7].full_question = result_scope[7].question + ': ' + result_scope[7].other;
                };
                if (myscope[i].q402V09 === 'e') {
                    result_scope[7].other = 'Dissoziativ';
                    result_scope[7].full_question = result_scope[7].question + ': ' + result_scope[7].other;
                };
                if (myscope[i].q402V09 === 'f') {
                    result_scope[7].other = 'Somatoform';
                    result_scope[7].full_question = result_scope[7].question + ': ' + result_scope[7].other;
                };
                if (myscope[i].q402V09 === 'g') {
                    result_scope[7].other = 'Essen';
                    result_scope[7].full_question = result_scope[7].question + ': ' + result_scope[7].other;
                };
                if (myscope[i].q402V09 === 'h') {
                    result_scope[7].other = 'Schlaf';
                    result_scope[7].full_question = result_scope[7].question + ': ' + result_scope[7].other;
                };
                if (myscope[i].q402V09 === 'i') {
                    result_scope[7].other = 'Sexuell';
                    result_scope[7].full_question = result_scope[7].question + ': ' + result_scope[7].other;
                };
                if (myscope[i].q402V09 === 'j') {
                    result_scope[7].other = myscope[i].q402V10;
                    result_scope[7].full_question = result_scope[7].question + ': ' + result_scope[7].other;
                };
                //console.log('Andere psychische Probleme = ', result_scope[7].question);


                // Summenscore berechnen und schreiben
                result_scope.sum_score = 0;
                var n = 0;
                if (myscope[i].H1_402V01 === '9') {
                    result_scope[0].sum_score = 'k.A.'
                } else {
                    result_scope[0].sum_score = parseInt(myscope[i].H1_402V01);
                    result_scope.sum_score = result_scope.sum_score + result_scope[0].sum_score;
                    n = n + 1;
                };
                if (myscope[i].H1_402V02 === '9') {
                    result_scope[1].sum_score = 'k.A.'
                } else {
                    result_scope[1].sum_score = parseInt(myscope[i].H1_402V02);
                    result_scope.sum_score = result_scope.sum_score + result_scope[1].sum_score;
                    n = n + 1;
                };
                if (myscope[i].H1_402V03 === '9') {
                    result_scope[2].sum_score = 'k.A.'
                } else {
                    result_scope[2].sum_score = parseInt(myscope[i].H1_402V03);
                    result_scope.sum_score = result_scope.sum_score + result_scope[2].sum_score;
                    n = n + 1;
                };
                if (myscope[i].H1_402V04 === '9') {
                    result_scope[3].sum_score = 'k.A.'
                } else {
                    result_scope[3].sum_score = parseInt(myscope[i].H1_402V04);
                    result_scope.sum_score = result_scope.sum_score + result_scope[3].sum_score;
                    n = n + 1;
                };
                if (myscope[i].H1_402V05 === '9') {
                    result_scope[4].sum_score = 'k.A.'
                } else {
                    result_scope[4].sum_score = parseInt(myscope[i].H1_402V05);
                    result_scope.sum_score = result_scope.sum_score + result_scope[4].sum_score;
                    n = n + 1;
                };
                if (myscope[i].H1_402V06 === '9') {
                    result_scope[5].sum_score = 'k.A.'
                } else {
                    result_scope[5].sum_score = parseInt(myscope[i].H1_402V06);
                    result_scope.sum_score = result_scope.sum_score + result_scope[5].sum_score;
                    n = n + 1;
                };
                if (myscope[i].H1_402V07 === '9') {
                    result_scope[6].sum_score = 'k.A.'
                } else {
                    result_scope[6].sum_score = parseInt(myscope[i].H1_402V07);
                    result_scope.sum_score = result_scope.sum_score + result_scope[6].sum_score;
                    n = n + 1;
                };
                if (myscope[i].H1_402V08 === '9') {
                    result_scope[7].sum_score = 'k.A.'
                } else {
                    result_scope[7].sum_score = parseInt(myscope[i].H1_402V08);
                    result_scope.sum_score = result_scope.sum_score + result_scope[7].sum_score;
                    n = n + 1;
                };
                if (myscope[i].H2_402V11 === '9') {
                    result_scope[8].sum_score = 'k.A.'
                } else {
                    result_scope[8].sum_score = parseInt(myscope[i].H2_402V11);
                    result_scope.sum_score = result_scope.sum_score + result_scope[8].sum_score;
                    n = n + 1;
                };
                if (myscope[i].H2_402V12 === '9') {
                    result_scope[9].sum_score = 'k.A.'
                } else {
                    result_scope[9].sum_score = parseInt(myscope[i].H2_402V12);
                    result_scope.sum_score = result_scope.sum_score + result_scope[9].sum_score;
                    n = n + 1;
                };
                if (myscope[i].H2_402V13 === '9') {
                    result_scope[10].sum_score = 'k.A.'
                } else {
                    result_scope[10].sum_score = parseInt(myscope[i].H2_402V13);
                    result_scope.sum_score = result_scope.sum_score + result_scope[10].sum_score;
                    n = n + 1;
                };
                if (myscope[i].H2_402V14 === '9') {
                    result_scope[11].sum_score = 'k.A.'
                } else {
                    result_scope[11].sum_score = parseInt(myscope[i].H2_402V14);
                    result_scope.sum_score = result_scope.sum_score + result_scope[11].sum_score;
                    n = n + 1;
                };
                result_scope.n = n;

                if (n === 0) {
                    result_scope.sum_score = 'k.A.';
                } else {
                    result_scope.sum_score = roundToOne(result_scope.sum_score / n * 12);
                    // Wert zu Graph hinzufügen
                    $scope.graph = $scope.graph + result_scope.sum_score + ',';
                }


                // myscope in $scope zurückschreiben
                $scope.HoNOS[i] = myscope[i];
                $scope.HoNOS[i].label.results[0] = result_scope;
            };




            // Neues Default - immer Resultate anzeigen
            $scope.daten_anzeigen = true;


        }

        // Graph - remove latest ','
        $scope.graph = $scope.graph.substring(0, ($scope.graph.length - 1));

    } else {
        // No Data available
        $scope.have_data = false;
    }
    console.log($scope.current_directive.title + ' $scope = ', $scope);
}
