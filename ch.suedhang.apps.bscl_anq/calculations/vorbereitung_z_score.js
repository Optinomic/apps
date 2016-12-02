angular.module('optinomicCalculation').factory('calculation', function() {

    var calculation = {};

    calculation.main = function(responses) {

        // Copy | Paste From here
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 



        var calc = {};


        // ------------------------------------------
        // D e f i n i t i o n s
        // ------------------------------------------


        calc.result_types = ["sum_score", "scale_score", "t_score", "z_score", "stanine"];

        calc.result_array = [{
            "id": 0,
            "description": "GSI (Global Severity Index)",
            "items": 53
        }, {
            "id": 1,
            "description": "Psychotizismus",
            "items": 5
        }, {
            "id": 2,
            "description": "Paranoides Denken",
            "items": 5
        }, {
            "id": 3,
            "description": "Phobische Angst",
            "items": 5
        }, {
            "id": 4,
            "description": "Aggressivität/ Feindseligkeit",
            "items": 5
        }, {
            "id": 5,
            "description": "Ängstlichkeit",
            "items": 6
        }, {
            "id": 6,
            "description": "Depressivität",
            "items": 6
        }, {
            "id": 7,
            "description": "Unsicherheit im Sozialkontakt",
            "items": 4
        }, {
            "id": 8,
            "description": "Zwanghaftigkeit",
            "items": 6
        }, {
            "id": 9,
            "description": "Somatisierung",
            "items": 7
        }, {
            "id": 10,
            "description": "Zusatzitems",
            "items": 4
        }];


        // ------------------------------------------
        // H e l p e r   -   F U N C T I O N S
        // ------------------------------------------

        calc.set_result_array = function(result_array) {

            function deUmlaut(value) {
                value = value.toLowerCase();
                value = value.replace(/ä/g, 'ae');
                value = value.replace(/ö/g, 'oe');
                value = value.replace(/ü/g, 'ue');
                value = value.replace(/ß/g, 'ss');
                value = value.replace(/ /g, '-');
                value = value.replace(/\./g, '');
                value = value.replace(/,/g, '');
                value = value.replace(/\(/g, '');
                value = value.replace(/\)/g, '');
                return value;
            };

            result_array.forEach(function(d, myResultID) {
                d.short_description = deUmlaut(d.description);
                d.short_description = d.short_description.replace(/[^a-z0-9]/gi, '_').toLowerCase();

                d.result = {};
                calc.result_types.forEach(function(typ, myTypID) {
                    d.result[typ] = null;
                });


            });


            return result_array;
        };

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


            var result_array = calc.set_result_array(calc.result_array);


            var allResults = [];
            var currentPatient = myResponses.patient;


            var responses_array = myResponses.survey_responses;
            responses_array.forEach(function(response, myindex) {
                var d = {};
                d.result_array = calc.cloneObj(result_array);
                var result = response.data.response;

                // -----------------------------------
                // sum_scores
                // -----------------------------------
                d.result_array[1].result.sum_score = parseInt(result['BSCL[sq504V03]']) + parseInt(result['BSCL[sq504V14]']) + parseInt(result['BSCL[sq504V34]']) + parseInt(result['BSCL[sq504V44]']) + parseInt(result['BSCL[sq504V53]']);
                d.result_array[2].result.sum_score = parseInt(result['BSCL[sq504V04]']) + parseInt(result['BSCL[sq504V10]']) + parseInt(result['BSCL[sq504V24]']) + parseInt(result['BSCL[sq504V48]']) + parseInt(result['BSCL[sq504V51]']);
                d.result_array[3].result.sum_score = parseInt(result['BSCL[sq504V08]']) + parseInt(result['BSCL[sq504V28]']) + parseInt(result['BSCL[sq504V31]']) + parseInt(result['BSCL[sq504V43]']) + parseInt(result['BSCL[sq504V47]']);
                d.result_array[4].result.sum_score = parseInt(result['BSCL[sq504V06]']) + parseInt(result['BSCL[sq504V13]']) + parseInt(result['BSCL[sq504V40]']) + parseInt(result['BSCL[sq504V41]']) + parseInt(result['BSCL[sq504V46]']);
                d.result_array[5].result.sum_score = parseInt(result['BSCL[sq504V01]']) + parseInt(result['BSCL[sq504V12]']) + parseInt(result['BSCL[sq504V19]']) + parseInt(result['BSCL[sq504V38]']) + parseInt(result['BSCL[sq504V45]']) + parseInt(result['BSCL[sq504V49]']);
                d.result_array[6].result.sum_score = parseInt(result['BSCL[sq504V09]']) + parseInt(result['BSCL[sq504V16]']) + parseInt(result['BSCL[sq504V17]']) + parseInt(result['BSCL[sq504V18]']) + parseInt(result['BSCL[sq504V35]']) + parseInt(result['BSCL[sq504V50]']);
                d.result_array[7].result.sum_score = parseInt(result['BSCL[sq504V20]']) + parseInt(result['BSCL[sq504V21]']) + parseInt(result['BSCL[sq504V22]']) + parseInt(result['BSCL[sq504V42]']);
                d.result_array[8].result.sum_score = parseInt(result['BSCL[sq504V05]']) + parseInt(result['BSCL[sq504V15]']) + parseInt(result['BSCL[sq504V26]']) + parseInt(result['BSCL[sq504V27]']) + parseInt(result['BSCL[sq504V32]']) + parseInt(result['BSCL[sq504V36]']);
                d.result_array[9].result.sum_score = parseInt(result['BSCL[sq504V02]']) + parseInt(result['BSCL[sq504V07]']) + parseInt(result['BSCL[sq504V23]']) + parseInt(result['BSCL[sq504V29]']) + parseInt(result['BSCL[sq504V30]']) + parseInt(result['BSCL[sq504V33]']) + parseInt(result['BSCL[sq504V37]']);
                d.result_array[10].result.sum_score = parseInt(result['BSCL[sq504V11]']) + parseInt(result['BSCL[sq504V25]']) + parseInt(result['BSCL[sq504V39]']) + parseInt(result['BSCL[sq504V52]']);

                d.result_array[0].result.sum_score =
                    d.result_array[1].result.sum_score +
                    d.result_array[2].result.sum_score +
                    d.result_array[3].result.sum_score +
                    d.result_array[4].result.sum_score +
                    d.result_array[5].result.sum_score +
                    d.result_array[6].result.sum_score +
                    d.result_array[7].result.sum_score +
                    d.result_array[8].result.sum_score +
                    d.result_array[9].result.sum_score +
                    d.result_array[10].result.sum_score;

                d.result_array[0].result.stanine = calc.get_stanine(0, d.result_array[0].result.sum_score, currentPatient.data.gender, result['Eintrittsort']);




                d.result_array.forEach(function(res, myResID) {
                    res.result.scale_score = calc.roundToTwo(res.result.sum_score / res.items);
                    res.result.t_score = calc.get_t_score(myResID, res.result.sum_score);
                });



                // d.t_scores = {};
                // d.t_scores.gsi = calc.get_t_score(0, d.sum_scores.gsi);
                // d.t_scores.psychot = calc.get_t_score(1, d.scale_scores.psychot);
                // d.t_scores.paranoid = calc.get_t_score(2, d.sum_scores.paranoid);
                // d.t_scores.phobisch = calc.get_t_score(3, d.sum_scores.phobisch);
                // d.t_scores.aggr = calc.get_t_score(4, d.sum_scores.aggr);
                // d.t_scores.angst = calc.get_t_score(5, d.sum_scores.angst);
                // d.t_scores.depr = calc.get_t_score(6, d.sum_scores.depr);
                // d.t_scores.soz = calc.get_t_score(7, d.sum_scores.soz);
                // d.t_scores.zwang = calc.get_t_score(8, d.sum_scores.zwang);
                // d.t_scores.somat = calc.get_t_score(9, d.sum_scores.somat);

                //  d.stanine = {};

                d.definitions = {};
                d.definitions.result_array = result_array;

                // write results back
                response.data.response_id = response.id;
                d.info = response.data;
                d.info.hash = result['optinomixHASH'];
                allResults.push(d);
            });

            return allResults;
        };


        // ------------------------------------------
        // Helpers
        // ------------------------------------------

        calc.cloneObj = function(my_obj) {
            // Clone Obj. and Return
            return JSON.parse(JSON.stringify(my_obj));
        };

        calc.getObjProp = function(my_obj) {
            // Create 'all propertys array'
            var allFullPropertys = [];

            for (var property in my_obj) {
                if (my_obj.hasOwnProperty(property)) {
                    allFullPropertys.push(property);
                }
            }

            return allFullPropertys;
        };

        calc.roundToTwo = function(num) {
            // Round a Number to 0.X 
            return +(Math.round(num + "e+2") + "e-2");
        };

        calc.isArray = function(obj) {
            return (typeof obj !== 'undefined' &&
                obj && obj.constructor === Array);
        };

        calc.merge_obj = function(obj1, obj2) {
            var obj3 = {};
            for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
            for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
            return obj3;
        }


        // Return
        return calc.getResults(responses);


        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        // Copy | Paste Until here

    };
    return calculation;
});
