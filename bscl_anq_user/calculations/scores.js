function main(data) {


    var calc = {};

    calc.get_t_score = function(scale, score) {
        // Variablen initialisieren
        var t_score = 0;

        if (scale !== 0) {
            t_score = 40;

            if (scale === 1) {
                // Psychotizismus
                t_score = 44;
                if (score >= 1) {
                    t_score = 54;
                }
                if (score >= 2) {
                    t_score = 59;
                }
                if (score >= 3) {
                    t_score = 63;
                }
                if (score >= 4) {
                    t_score = 68;
                }
                if (score >= 5) {
                    t_score = 71;
                }
                if (score >= 6) {
                    t_score = 73;
                }
                if (score >= 7) {
                    t_score = 76;
                }
                if (score >= 9) {
                    t_score = 78;
                }
                if (score >= 10) {
                    t_score = 80;
                }
            }
            if (scale === 2) {
                // Paranoides Denken
                t_score = 41;
                if (score >= 1) {
                    t_score = 49;
                }
                if (score >= 2) {
                    t_score = 54;
                }
                if (score >= 3) {
                    t_score = 58;
                }
                if (score >= 4) {
                    t_score = 61;
                }
                if (score >= 5) {
                    t_score = 65;
                }
                if (score >= 6) {
                    t_score = 68;
                }
                if (score >= 7) {
                    t_score = 71;
                }
                if (score >= 8) {
                    t_score = 74;
                }
                if (score >= 13) {
                    t_score = 78;
                }
                if (score >= 14) {
                    t_score = 80;
                }
            }
            if (scale === 3) {
                // Phobische Angst
                t_score = 45;
                if (score >= 1) {
                    t_score = 55;
                }
                if (score >= 2) {
                    t_score = 61;
                }
                if (score >= 3) {
                    t_score = 65;
                }
                if (score >= 4) {
                    t_score = 69;
                }
                if (score >= 5) {
                    t_score = 74;
                }
                if (score >= 6) {
                    t_score = 76;
                }
                if (score >= 7) {
                    t_score = 78;
                }
                if (score >= 8) {
                    t_score = 80;
                }
            }
            if (scale === 4) {
                // Aggressivität/ Feindseligkeit
                t_score = 38;
                if (score >= 1) {
                    t_score = 48;
                }
                if (score >= 2) {
                    t_score = 55;
                }
                if (score >= 3) {
                    t_score = 59;
                }
                if (score >= 4) {
                    t_score = 63;
                }
                if (score >= 5) {
                    t_score = 66;
                }
                if (score >= 6) {
                    t_score = 69;
                }
                if (score >= 7) {
                    t_score = 71;
                }
                if (score >= 8) {
                    t_score = 72;
                }
                if (score >= 9) {
                    t_score = 75;
                }
                if (score >= 10) {
                    t_score = 78;
                }
                if (score >= 11) {
                    t_score = 80;
                }
            }
            if (scale === 5) {
                // Ängstlichkeit
                t_score = 38;
                if (score >= 1) {
                    t_score = 48;
                }
                if (score >= 2) {
                    t_score = 52;
                }
                if (score >= 3) {
                    t_score = 57;
                }
                if (score >= 4) {
                    t_score = 60;
                }
                if (score >= 5) {
                    t_score = 63;
                }
                if (score >= 6) {
                    t_score = 66;
                }
                if (score >= 7) {
                    t_score = 70;
                }
                if (score >= 8) {
                    t_score = 73;
                }
                if (score >= 9) {
                    t_score = 76;
                }
                if (score >= 10) {
                    t_score = 78;
                }
                if (score >= 16) {
                    t_score = 80;
                }
            }
            if (scale === 6) {
                // Depressivität
                t_score = 41;
                if (score >= 1) {
                    t_score = 50;
                }
                if (score >= 2) {
                    t_score = 55;
                }
                if (score >= 3) {
                    t_score = 58;
                }
                if (score >= 4) {
                    t_score = 61;
                }
                if (score >= 5) {
                    t_score = 64;
                }
                if (score >= 6) {
                    t_score = 67;
                }
                if (score >= 7) {
                    t_score = 69;
                }
                if (score >= 8) {
                    t_score = 71;
                }
                if (score >= 9) {
                    t_score = 72;
                }
                if (score >= 10) {
                    t_score = 74;
                }
                if (score >= 11) {
                    t_score = 75;
                }
                if (score >= 13) {
                    t_score = 76;
                }
                if (score >= 15) {
                    t_score = 78;
                }
                if (score >= 16) {
                    t_score = 80;
                }
            }
            if (scale === 7) {
                // Unsicherheit im Sozialkontakt
                t_score = 40;
                if (score >= 1) {
                    t_score = 48;
                }
                if (score >= 2) {
                    t_score = 54;
                }
                if (score >= 3) {
                    t_score = 58;
                }
                if (score >= 4) {
                    t_score = 63;
                }
                if (score >= 5) {
                    t_score = 66;
                }
                if (score >= 6) {
                    t_score = 69;
                }
                if (score >= 7) {
                    t_score = 72;
                }
                if (score >= 8) {
                    t_score = 75;
                }
                if (score >= 9) {
                    t_score = 77;
                }
                if (score >= 10) {
                    t_score = 80;
                }
            }
            if (scale === 8) {
                // Zwanghaftigkeit
                t_score = 35;
                if (score >= 1) {
                    t_score = 43;
                }
                if (score >= 2) {
                    t_score = 48;
                }
                if (score >= 3) {
                    t_score = 51;
                }
                if (score >= 4) {
                    t_score = 55;
                }
                if (score >= 5) {
                    t_score = 58;
                }
                if (score >= 6) {
                    t_score = 62;
                }
                if (score >= 7) {
                    t_score = 64;
                }
                if (score >= 8) {
                    t_score = 66;
                }
                if (score >= 9) {
                    t_score = 68;
                }
                if (score >= 10) {
                    t_score = 69;
                }
                if (score >= 11) {
                    t_score = 72;
                }
                if (score >= 12) {
                    t_score = 74;
                }
                if (score >= 14) {
                    t_score = 75;
                }
                if (score >= 15) {
                    t_score = 78;
                }
                if (score >= 16) {
                    t_score = 80;
                }
            }
            if (scale === 9) {
                // Somatisierung
                t_score = 40;

                if (score >= 1) {
                    t_score = 49;
                }

                if (score >= 2) {
                    t_score = 54;
                }

                if (score >= 3) {
                    t_score = 57;
                }

                if (score >= 4) {
                    t_score = 61;
                }

                if (score >= 5) {
                    t_score = 63;
                }

                if (score >= 6) {
                    t_score = 65;
                }

                if (score >= 7) {
                    t_score = 66;
                }

                if (score >= 8) {
                    t_score = 69;
                }

                if (score >= 9) {
                    t_score = 72;
                }

                if (score >= 10) {
                    t_score = 74;
                }

                if (score >= 11) {
                    t_score = 75;
                }

                if (score >= 12) {
                    t_score = 75;
                }

                if (score >= 13) {
                    t_score = 77;
                }

                if (score >= 14) {
                    t_score = 80;
                }
            }
        } else {

            // GSI
            t_score = 24;

            if (score >= 1) {
                t_score = 30;
            }

            if (score >= 2) {
                t_score = 34;
            }

            if (score >= 3) {
                t_score = 36;
            }

            if (score >= 4) {
                t_score = 38;
            }

            if (score >= 5) {
                t_score = 40;
            }

            if (score >= 6) {
                t_score = 41;
            }

            if (score >= 7) {
                t_score = 43;
            }

            if (score >= 8) {
                t_score = 44;
            }

            if (score >= 9) {
                t_score = 45;
            }

            if (score >= 10) {
                t_score = 46;
            }

            if (score >= 11) {
                t_score = 48;
            }

            if (score >= 13) {
                t_score = 49;
            }

            if (score >= 14) {
                t_score = 50;
            }

            if (score >= 15) {
                t_score = 51;
            }

            if (score >= 16) {
                t_score = 52;
            }

            if (score >= 17) {
                t_score = 53;
            }

            if (score >= 19) {
                t_score = 54;
            }

            if (score >= 20) {
                t_score = 55;
            }

            if (score >= 22) {
                t_score = 56;
            }

            if (score >= 23) {
                t_score = 57;
            }

            if (score >= 25) {
                t_score = 58;
            }

            if (score >= 27) {
                t_score = 59;
            }

            if (score >= 29) {
                t_score = 60;
            }

            if (score >= 31) {
                t_score = 61;
            }

            if (score >= 32) {
                t_score = 62;
            }

            if (score >= 33) {
                t_score = 63;
            }

            if (score >= 34) {
                t_score = 64;
            }

            if (score >= 35) {
                t_score = 65;
            }

            if (score >= 37) {
                t_score = 66;
            }

            if (score >= 40) {
                t_score = 67;
            }

            if (score >= 41) {
                t_score = 68;
            }

            if (score >= 42) {
                t_score = 69;
            }

            if (score >= 47) {
                t_score = 70;
            }

            if (score >= 48) {
                t_score = 71;
            }

            if (score >= 51) {
                t_score = 72;
            }

            if (score >= 60) {
                t_score = 73;
            }

            if (score >= 61) {
                t_score = 74;
            }

            if (score >= 65) {
                t_score = 75;
            }

            if (score >= 70) {
                t_score = 77;
            }

            if (score >= 75) {
                t_score = 80;
            }
        }
        return t_score;
    };

    calc.get_stanine = function(scale, score, gender, eintrittsort) {
        // Variablen initialisieren

        // Falls gender nicht gesetzt ist = Mann
        if ((gender === '') || (gender === null) || (gender === undefined)) {
            gender = 'male';
        }

        // Falls eintrittsort nicht gesetzt ist = Entwöhnung
        if ((eintrittsort === '') || (eintrittsort === null) || (eintrittsort === undefined)) {
            // 1 = Entzug
            // 2 = Entwöhnung
            eintrittsort = '2';
        }

        var stanine = 0;


        if (scale === 0) {
            if (gender === 'male') {

                if (eintrittsort === '1') {

                    stanine = 1;

                    if (score >= 3) {
                        stanine = 2;
                    }

                    if (score >= 8) {
                        stanine = 3;
                    }

                    if (score >= 16) {
                        stanine = 4;
                    }

                    if (score >= 28) {
                        stanine = 5;
                    }

                    if (score >= 43) {
                        stanine = 6;
                    }

                    if (score >= 62) {
                        stanine = 7;
                    }

                    if (score >= 86) {
                        stanine = 8;
                    }

                    if (score >= 110) {
                        stanine = 9;
                    }
                }

                if (eintrittsort === '2') {
                    stanine = 1;

                    if (score >= 1) {
                        stanine = 2;
                    }

                    if (score >= 2) {
                        stanine = 2;
                    }

                    if (score >= 6) {
                        stanine = 3;
                    }

                    if (score >= 10) {
                        stanine = 4;
                    }

                    if (score >= 17) {
                        stanine = 5;
                    }

                    if (score >= 29) {
                        stanine = 6;
                    }

                    if (score >= 46) {
                        stanine = 7;
                    }

                    if (score >= 69) {
                        stanine = 8;
                    }
                    if (score >= 88) {
                        stanine = 9;
                    }
                }

            } else {

                if (eintrittsort === '1') {
                    stanine = 1;

                    if (score >= 5) {
                        stanine = 2;
                    }

                    if (score >= 12) {
                        stanine = 3;
                    }

                    if (score >= 20) {
                        stanine = 4;
                    }

                    if (score >= 33) {
                        stanine = 5;
                    }

                    if (score >= 51) {
                        stanine = 6;
                    }

                    if (score >= 72) {
                        stanine = 7;
                    }

                    if (score >= 99) {
                        stanine = 8;
                    }

                    if (score >= 127) {
                        stanine = 9;
                    }
                }

                if (eintrittsort === '2') {
                    stanine = 1;

                    if (score >= 2) {
                        stanine = 2;
                    }

                    if (score >= 6) {
                        stanine = 3;
                    }

                    if (score >= 13) {
                        stanine = 4;
                    }

                    if (score >= 24) {
                        stanine = 5;
                    }

                    if (score >= 33) {
                        stanine = 6;
                    }

                    if (score >= 56) {
                        stanine = 7;
                    }

                    if (score >= 76) {
                        stanine = 8;
                    }
                    if (score >= 100) {
                        stanine = 9;
                    }
                }

            }
        }

        return stanine;
    };

    // ------------------------------------------
    // F U N C T I O N  -  Main
    // ------------------------------------------
    calc.getResults = function(myResponses) {


        var currentPatient = myResponses.patient;
        //var responses_foreign = myResponses.foreign_survey_responses;


        var myResults = {};
        var result = myResponses.response;

        myResults.sum_scores = {};
        myResults.sum_scores.aggr = parseInt(result['BSCL[sq504V06]']) + parseInt(result['BSCL[sq504V13]']) + parseInt(result['BSCL[sq504V40]']) + parseInt(result['BSCL[sq504V41]']) + parseInt(result['BSCL[sq504V46]']);
        myResults.sum_scores.angst = parseInt(result['BSCL[sq504V01]']) + parseInt(result['BSCL[sq504V12]']) + parseInt(result['BSCL[sq504V19]']) + parseInt(result['BSCL[sq504V38]']) + parseInt(result['BSCL[sq504V45]']) + parseInt(result['BSCL[sq504V49]']);
        myResults.sum_scores.depr = parseInt(result['BSCL[sq504V09]']) + parseInt(result['BSCL[sq504V16]']) + parseInt(result['BSCL[sq504V17]']) + parseInt(result['BSCL[sq504V18]']) + parseInt(result['BSCL[sq504V35]']) + parseInt(result['BSCL[sq504V50]']);
        myResults.sum_scores.paranoid = parseInt(result['BSCL[sq504V04]']) + parseInt(result['BSCL[sq504V10]']) + parseInt(result['BSCL[sq504V24]']) + parseInt(result['BSCL[sq504V48]']) + parseInt(result['BSCL[sq504V51]']);
        myResults.sum_scores.phobisch = parseInt(result['BSCL[sq504V08]']) + parseInt(result['BSCL[sq504V28]']) + parseInt(result['BSCL[sq504V31]']) + parseInt(result['BSCL[sq504V43]']) + parseInt(result['BSCL[sq504V47]']);
        myResults.sum_scores.psychot = parseInt(result['BSCL[sq504V03]']) + parseInt(result['BSCL[sq504V14]']) + parseInt(result['BSCL[sq504V34]']) + parseInt(result['BSCL[sq504V44]']) + parseInt(result['BSCL[sq504V53]']);
        myResults.sum_scores.somat = parseInt(result['BSCL[sq504V02]']) + parseInt(result['BSCL[sq504V23]']) + parseInt(result['BSCL[sq504V29]']) + parseInt(result['BSCL[sq504V30]']) + parseInt(result['BSCL[sq504V33]']) + parseInt(result['BSCL[sq504V37]']);
        myResults.sum_scores.soz = parseInt(result['BSCL[sq504V20]']) + parseInt(result['BSCL[sq504V21]']) + parseInt(result['BSCL[sq504V22]']) + parseInt(result['BSCL[sq504V42]']);
        myResults.sum_scores.zwang = parseInt(result['BSCL[sq504V05]']) + parseInt(result['BSCL[sq504V15]']) + parseInt(result['BSCL[sq504V26]']) + parseInt(result['BSCL[sq504V27]']) + parseInt(result['BSCL[sq504V32]']) + parseInt(result['BSCL[sq504V36]']);
        myResults.sum_scores.zusatz = parseInt(result['BSCL[sq504V11]']) + parseInt(result['BSCL[sq504V25]']) + parseInt(result['BSCL[sq504V39]']) + parseInt(result['BSCL[sq504V52]']);

        myResults.scale_scores = {};
        myResults.scale_scores.aggr = parseFloat(myResults.sum_scores.aggr / 5);
        myResults.scale_scores.angst = parseFloat(myResults.sum_scores.angst / 6);
        myResults.scale_scores.depr = parseFloat(myResults.sum_scores.depr / 6);
        myResults.scale_scores.paranoid = parseFloat(myResults.sum_scores.paranoid / 5);
        myResults.scale_scores.phobisch = parseFloat(myResults.sum_scores.phobisch / 5);
        myResults.scale_scores.psychot = parseFloat(myResults.sum_scores.psychot / 5);
        myResults.scale_scores.somat = parseFloat(myResults.sum_scores.somat / 7);
        myResults.scale_scores.soz = parseFloat(myResults.sum_scores.soz / 4);
        myResults.scale_scores.zwang = parseFloat(myResults.sum_scores.zwang / 6);
        myResults.scale_scores.zusatz = parseFloat(myResults.sum_scores.zusatz / 4);

        myResults.sum_scores.gsi =
            myResults.sum_scores.aggr +
            myResults.sum_scores.angst +
            myResults.sum_scores.depr +
            myResults.sum_scores.paranoid +
            myResults.sum_scores.phobisch +
            myResults.sum_scores.psychot +
            myResults.sum_scores.somat +
            myResults.sum_scores.soz +
            myResults.sum_scores.zwang +
            myResults.sum_scores.zusatz

        myResults.scale_scores.gsi = parseFloat(myResults.sum_scores.gsi / 53);


        myResults.t_scores = {};
        myResults.t_scores.gsi = calc.get_t_score(0, myResults.sum_scores.gsi);
        myResults.t_scores.psychot = calc.get_t_score(1, myResults.scale_scores.psychot);
        myResults.t_scores.paranoid = calc.get_t_score(2, myResults.sum_scores.paranoid);
        myResults.t_scores.phobisch = calc.get_t_score(3, myResults.sum_scores.phobisch);
        myResults.t_scores.aggr = calc.get_t_score(4, myResults.sum_scores.aggr);
        myResults.t_scores.angst = calc.get_t_score(5, myResults.sum_scores.angst);
        myResults.t_scores.depr = calc.get_t_score(6, myResults.sum_scores.depr);
        myResults.t_scores.soz = calc.get_t_score(7, myResults.sum_scores.soz);
        myResults.t_scores.zwang = calc.get_t_score(8, myResults.sum_scores.zwang);
        myResults.t_scores.somat = calc.get_t_score(9, myResults.sum_scores.somat);

        myResults.stanine = {};
        myResults.stanine.gsi = calc.get_stanine(0, myResults.sum_scores.gsi, currentPatient.gender, result['Eintrittsort']);


        // write results back
        myResults.hash = result['optinomixHASH'];

        return myResults;
    };


    // ------------------------------------------
    // H e l p e r   -   F U N C T I O N S
    // ------------------------------------------

    calc.prepare = function(my_data) {

        // Prepare all 'responses' in a nice array

        var all_responses = my_data;

        var prepare_return_data = {
            "all": []
        };

        all_responses.forEach(function(response, myindex) {
            var inner_response = response.foreign_survey_responses['ch.suedhang.apps.bscl.anq'];
            //
            if (inner_response.length >= 1) {
                inner_response.forEach(function(real_response, myindex) {
                    real_response.data.id = real_response.id;
                    real_response.data.patient = response.patient.data;
                    real_response.data.patient.pid = response.patient.id;

                    prepare_return_data.all.push(real_response.data);
                });
            };
        });


        // Get Results
        prepare_return_data.all.forEach(function(current_resonse, myindex) {
            current_resonse.results = calc.getResults(current_resonse);
        });


        return prepare_return_data;
    };



    //calc.responses = calc.prepare(data);
    //console.log('(+) calc.responses', calc.responses);

    //calc.entry_data = data;



    // Return
    return calc.prepare(data);

};
