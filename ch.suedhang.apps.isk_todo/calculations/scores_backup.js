function main(responses) {
    var calc = {};

    // ------------------------------------------
    // H e l p e r   -   F U N C T I O N S
    // ------------------------------------------

    calc.get_stanine = function(gender, scale, num) {
        // Variablen initialisieren

        // Falls gender nicht gesetzt ist = Mann
        if (gender === null) {
            gender = 'male';
        }

        if (gender === 'male') {
            myscope[i].label.population = 'Maenner';
        } else {
            myscope[i].label.population = 'Frauen';
        }

        // Soziale Orientierung
        if (scale === 0) {
            if (gender === 'male') {
                // M =  =IF(C37<=22; 1; IF(C37=23; 2; IF(C37=24; 2; IF(C37=25; 3; IF(C37=26; 3; IF(C37=27; 4; IF(C37=28; 4; IF(C37=29; 5; IF(C37=30; 5; IF(C37=31; 6; IF(C37=32; 6; IF(C37=33; 7; IF(C37=34; 7; IF(C37=35; 8; IF(C37=36; 8; IF(C37>=37; 9))))))))))))))))
                stanine = 1;
                if (num === 23) {
                    stanine = 2;
                }
                if (num === 24) {
                    stanine = 2;
                }
                if (num === 25) {
                    stanine = 3;
                }
                if (num === 26) {
                    stanine = 3;
                }
                if (num === 27) {
                    stanine = 4;
                }
                if (num === 28) {
                    stanine = 4;
                }
                if (num === 29) {
                    stanine = 5;
                }
                if (num === 30) {
                    stanine = 5;
                }
                if (num === 31) {
                    stanine = 6;
                }
                if (num === 32) {
                    stanine = 6;
                }
                if (num === 33) {
                    stanine = 7;
                }
                if (num === 34) {
                    stanine = 7;
                }
                if (num === 35) {
                    stanine = 8;
                }
                if (num === 36) {
                    stanine = 8;
                }
                if (num >= 37) {
                    stanine = 9;
                }
            } else {
                // F =  =IF(C37<=23; 1; IF(C37=24; 2; IF(C37=25; 2; IF(C37=26; 3; IF(C37=27; 3; IF(C37=28; 4; IF(C37=29; 4; IF(C37=30; 5; IF(C37=31; 5; IF(C37=32; 6; IF(C37=33; 7; IF(C37=34; 7; IF(C37=35; 8; IF(C37=36; 8; IF(C37>=37; 9)))))))))))))))
                stanine = 1;

                if (num === 24) {
                    stanine = 2;
                }
                if (num === 25) {
                    stanine = 2;
                }
                if (num === 26) {
                    stanine = 3;
                }
                if (num === 27) {
                    stanine = 3;
                }
                if (num === 28) {
                    stanine = 4;
                }
                if (num === 29) {
                    stanine = 4;
                }
                if (num === 30) {
                    stanine = 5;
                }
                if (num === 31) {
                    stanine = 5;
                }
                if (num === 32) {
                    stanine = 6;
                }
                if (num === 33) {
                    stanine = 7;
                }
                if (num === 34) {
                    stanine = 7;
                }
                if (num === 35) {
                    stanine = 8;
                }
                if (num === 36) {
                    stanine = 8;
                }
                if (num >= 37) {
                    stanine = 9;
                }
            }
        }

        // Offensivitaet
        if (scale === 1) {
            if (gender === 'male') {
                // M =  =IF(C38<=15; 1; IF(C38=16; 2; IF(C38=17; 3; IF(C38=18; 3; IF(C38=19; 4; IF(C38=20; 4; IF(C38=21; 5; IF(C38=22; 5; IF(C38=23; 6; IF(C38=24; 7; IF(C38=25; 7; IF(C38=26; 8; IF(C38=27; 8; IF(C38>= 28; 9))))))))))))))
                stanine = 1;
                if (num === 16) {
                    stanine = 2;
                }
                if (num === 17) {
                    stanine = 3;
                }
                if (num === 18) {
                    stanine = 3;
                }
                if (num === 19) {
                    stanine = 4;
                }
                if (num === 20) {
                    stanine = 4;
                }
                if (num === 21) {
                    stanine = 5;
                }
                if (num === 22) {
                    stanine = 5;
                }
                if (num === 23) {
                    stanine = 6;
                }
                if (num === 24) {
                    stanine = 7;
                }
                if (num === 25) {
                    stanine = 7;
                }
                if (num === 26) {
                    stanine = 8;
                }
                if (num === 27) {
                    stanine = 8;
                }
                if (num >= 28) {
                    stanine = 9;
                }
            } else {
                // F =  =IF(C38<=14; 1; IF(C38=15; 2; IF(C38=16; 2; IF(C38=17; 3; IF(C38=18; 3; IF(C38=19; 4; IF(C38=20; 4; IF(C38=21; 5; IF(C38=22; 6; IF(C38=23; 6; IF(C38=24; 7; IF(C38=25; 7; IF(C38=26; 8; IF(C38>= 27; 9))))))))))))))
                stanine = 1;
                if (num === 15) {
                    stanine = 2;
                }
                if (num === 16) {
                    stanine = 2;
                }
                if (num === 17) {
                    stanine = 3;
                }
                if (num === 18) {
                    stanine = 3;
                }
                if (num === 19) {
                    stanine = 4;
                }
                if (num === 20) {
                    stanine = 4;
                }
                if (num === 21) {
                    stanine = 5;
                }
                if (num === 22) {
                    stanine = 6;
                }
                if (num === 23) {
                    stanine = 6;
                }
                if (num === 24) {
                    stanine = 7;
                }
                if (num === 25) {
                    stanine = 7;
                }
                if (num === 26) {
                    stanine = 8;
                }
                if (num >= 27) {
                    stanine = 9;
                }

            }
        }

        // Selbststeuerung
        if (scale === 2) {
            if (gender === 'male') {
                // M =  =IF(C39<= 14; 1; IF(C39=15; 2; IF(C39=16; 2; IF(C39=17; 3; IF(C39=18; 3; IF(C39=19; 4; IF(C39=20; 4; IF(C39=21; 5; IF(C39=22; 5; IF(C39=23; 6; IF(C39=24; 6; IF(C39=25; 7; IF(C39=26; 7; IF(C39=27; 8; IF(C39=28; 8; IF(C39>=29; 9))))))))))))))))
                stanine = 1;
                if (num === 15) {
                    stanine = 2;
                }
                if (num === 16) {
                    stanine = 2;
                }
                if (num === 17) {
                    stanine = 3;
                }
                if (num === 18) {
                    stanine = 3;
                }
                if (num === 19) {
                    stanine = 4;
                }
                if (num === 20) {
                    stanine = 4;
                }
                if (num === 21) {
                    stanine = 5;
                }
                if (num === 22) {
                    stanine = 5;
                }
                if (num === 23) {
                    stanine = 6;
                }
                if (num === 24) {
                    stanine = 6;
                }
                if (num === 25) {
                    stanine = 7;
                }
                if (num === 26) {
                    stanine = 7;
                }
                if (num === 27) {
                    stanine = 8;
                }
                if (num === 28) {
                    stanine = 8;
                }
                if (num >= 29) {
                    stanine = 9;
                }
            } else {
                // F = =IF(C39<= 13; 1; IF(C39=14; 2; IF(C39=15; 2; IF(C39=16; 3; IF(C39=17; 3; IF(C39=18; 4; IF(C39=19; 4; IF(C39=20; 5; IF(C39=21; 5; IF(C39=22; 6; IF(C39=23; 6; IF(C39=24; 7; IF(C39=25; 7; IF(C39=26; 8; IF(C39=27; 8; IF(C39>=28; 9)))))))))))))))) 
                stanine = 1;
                if (num === 14) {
                    stanine = 2;
                }
                if (num === 15) {
                    stanine = 2;
                }
                if (num === 16) {
                    stanine = 3;
                }
                if (num === 17) {
                    stanine = 3;
                }
                if (num === 18) {
                    stanine = 4;
                }
                if (num === 19) {
                    stanine = 4;
                }
                if (num === 20) {
                    stanine = 5;
                }
                if (num === 21) {
                    stanine = 5;
                }
                if (num === 22) {
                    stanine = 6;
                }
                if (num === 23) {
                    stanine = 6;
                }
                if (num === 24) {
                    stanine = 7;
                }
                if (num === 25) {
                    stanine = 7;
                }
                if (num === 26) {
                    stanine = 8;
                }
                if (num === 27) {
                    stanine = 8;
                }
                if (num >= 28) {
                    stanine = 9;
                }

            }
        }

        // Reflexibilitaet
        if (scale === 3) {
            if (gender === 'male') {
                // M =  =IF(C40<=15; 1; IF(C40=16; 2; IF(C40=17; 3; IF(C40=18; 3; IF(C40=19; 4; IF(C40=20; 5; IF(C40=21; 6; IF(C40=22; 6; IF(C40=23; 7; IF(C40=24; 8; IF(C40= 25; 8; IF(C40>= 26; 9))))))))))))
                stanine = 1;
                if (num === 16) {
                    stanine = 2;
                }
                if (num === 17) {
                    stanine = 3;
                }
                if (num === 18) {
                    stanine = 3;
                }
                if (num === 19) {
                    stanine = 4;
                }
                if (num === 20) {
                    stanine = 5;
                }
                if (num === 21) {
                    stanine = 5;
                }
                if (num === 22) {
                    stanine = 5;
                }
                if (num === 23) {
                    stanine = 6;
                }
                if (num === 24) {
                    stanine = 7;
                }
                if (num === 25) {
                    stanine = 7;
                }
                if (num === 26) {
                    stanine = 8;
                }
                if (num === 27) {
                    stanine = 8;
                }
                if (num >= 28) {
                    stanine = 9;
                }
            } else {
                // F =  =IF(C40<=15; 1; IF(C40=16; 2; IF(C40=17; 2; IF(C40=18; 3; IF(C40=19; 4; IF(C40=20; 5; IF(C40=21; 5; IF(C40=22; 6; IF(C40=23; 7; IF(C40=24; 7; IF(C40= 25; 8; IF(C40>= 26; 9))))))))))))
                stanine = 1;
                if (num === 16) {
                    stanine = 2;
                }
                if (num === 17) {
                    stanine = 2;
                }
                if (num === 18) {
                    stanine = 3;
                }
                if (num === 19) {
                    stanine = 4;
                }
                if (num === 20) {
                    stanine = 5;
                }
                if (num === 21) {
                    stanine = 5;
                }
                if (num === 22) {
                    stanine = 6;
                }
                if (num === 23) {
                    stanine = 7;
                }
                if (num === 24) {
                    stanine = 7;
                }
                if (num === 25) {
                    stanine = 8;
                }
                if (num >= 26) {
                    stanine = 9;
                }

            }
        }
        //console.log('get_stanine::  Scale:' + scale + ', Gender:' + gender + ', Sum:' + num + ' = Stanine:' + stanine);
        return stanine;
    }

    calc.getScores = function(d, gender) {
        // INIT

        // Variablen initialisieren
        var scores_array = [{
            "question": "Soziale Orientierung",
            "subquestion": "Ausmass, in dem eine Person anderen Menschen offen und mit positiver Grundhaltung gegenueber tritt.",
            "stanine": 0,
            "sum_score": 0,
            "name": 'soz_orient',
            "gender": gender
        }, {
            "question": "Offensivitaet",
            "subquestion": "Faehigkeit, aus sich herauszugehen und im Kontakt mit anderen Menschen eigene Interessen aktiv verwirklichen zu koennen.",
            "stanine": 0,
            "sum_score": 0,
            "name": 'offensiv',
            "gender": gender
        }, {
            "question": "Selbststeuerung",
            "subquestion": "Faehigkeit eines Menschen, flexibel und rational zu handeln, wobei man sich selbst bewusst als Akteur begreift.",
            "stanine": 0,
            "sum_score": 0,
            "name": 'selbststeuerung',
            "gender": gender
        }, {
            "question": "Reflexibilitaet",
            "subquestion": "Faehigkeit einer Person, bei anderen Menschen einen positiven bzw. gewuenschten Eindruck zu erzeugen.",
            "stanine": 0,
            "sum_score": 0,
            "name": 'reflex',
            "gender": gender
        }];

        var score_id = 0;

        // Scores berechnen
        score_id = 0;
        scores_array[score_id].name = 'soz_orient';
        scores_array[score_id].sum_score = 0;
        scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['AISK_AISK1']);
        scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['AISK_AISK5']);
        scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(5 - d['AISK_AISK9']);
        scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(5 - d['AISK_AISK11']);
        scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['AISK_AISK14']);
        scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(5 - d['AISK_AISK18']);
        scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(5 - d['AISK_AISK21']);
        scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(5 - d['AISK_AISK23']);
        scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['AISK_AISK27']);
        scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(5 - d['AISK_AISK31']);
        scores_array[score_id].stanine = calc.get_stanine(gender, score_id, scores_array[score_id].sum_score);

        score_id = 1;
        scores_array[score_id].name = 'offensiv';
        scores_array[score_id].sum_score = 0;
        scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['AISK_AISK2']);
        scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['AISK_AISK6']);
        scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(5 - d['AISK_AISK10']);
        scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['AISK_AISK15']);
        scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['AISK_AISK19']);
        scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['AISK_AISK24']);
        scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['AISK_AISK28']);
        scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(5 - d['AISK_AISK32']);
        scores_array[score_id].stanine = calc.get_stanine(gender, score_id, scores_array[score_id].sum_score);

        score_id = 2;
        scores_array[score_id].name = 'selbststeuerung';
        scores_array[score_id].sum_score = 0;
        scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(5 - d['AISK_AISK3']);
        scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(5 - d['AISK_AISK7']);
        scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(5 - d['AISK_AISK12']);
        scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(5 - d['AISK_AISK16']);
        scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['AISK_AISK20']);
        scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(5 - d['AISK_AISK25']);
        scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['AISK_AISK29']);
        scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(5 - d['AISK_AISK33']);
        scores_array[score_id].stanine = calc.get_stanine(gender, score_id, scores_array[score_id].sum_score);

        score_id = 3;
        scores_array[score_id].name = 'reflex';
        scores_array[score_id].sum_score = 0;
        scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['AISK_AISK4']);
        scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['AISK_AISK8']);
        scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['AISK_AISK13']);
        scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(5 - d['AISK_AISK17']);
        scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['AISK_AISK22']);
        scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['AISK_AISK26']);
        scores_array[score_id].sum_score = scores_array[score_id].sum_score + parseInt(d['AISK_AISK30']);
        scores_array[score_id].stanine = calc.get_stanine(gender, score_id, scores_array[score_id].sum_score);

        return scores_array;
    };


    // ------------------------------------------
    // F U N C T I O N  -  Main
    // ------------------------------------------
    calc.getResults = function(myResponses) {

        var responses_array = myResponses.survey_responses;
        var allResults = [];


        responses_array.forEach(function(response, myindex) {
            var myResults = {};
            var result = response.data.response;

            // Calculate Stuff
            var gender = myResponses.patient.data.gender;

            myResults.scores = calc.getScores(result, gender);

            // Unneeded - Just for DEBUG
            myResults.full_data = myResponses;

            // Write Results for the Return
            // Do not modify stuff down here
            myResults.hash = result['optinomixHASH'];
            myResults.response = response;
            allResults.push(myResults);
        });

        return allResults;
    };


    // Return
    return calc.getResults(responses);
}
