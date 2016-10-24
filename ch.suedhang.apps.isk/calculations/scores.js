function main(responses) {
    var calc = {};

    // ------------------------------------------
    // H e l p e r   -   F U N C T I O N S
    // ------------------------------------------



    calc.getPatientAge = function(birth_date) {
        if (birth_date !== null) {
            var today = new Date();
            var birthDate = new Date(birth_date);
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            };
        } else {
            var age = 1;
        };

        return age;
    };


    calc.get_stanine = function(gender, scale, num) {
        // Variablen initialisieren

        // Falls gender nicht gesetzt ist = Mann
        if (gender === null) {
            gender = 'male';
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
            myResults.gender = gender;


            // Soziale Orientierung
            var soz_orient = 0;
            soz_orient = soz_orient + parseInt(result['AISK[AISK1]']);
            soz_orient = soz_orient + parseInt(result['AISK[AISK5]']);
            soz_orient = soz_orient + parseInt(result['AISK[AISK9]']);
            soz_orient = soz_orient + parseInt(result['AISK[AIS11]']);
            soz_orient = soz_orient + parseInt(result['AISK[AIS14]']);
            soz_orient = soz_orient + parseInt(result['AISK[AIS18]']);
            soz_orient = soz_orient + parseInt(result['AISK[AIS21]']);
            soz_orient = soz_orient + parseInt(result['AISK[AIS23]']);
            soz_orient = soz_orient + parseInt(result['AISK[AIS27]']);
            soz_orient = soz_orient + parseInt(result['AISK[AIS31]']);
            myResults.soziale_orientierung_sumscore = soz_orient;
            myResults.soziale_orientierung_stanine = calc.get_stanine(gender, 0, soz_orient);


            // Offensivitaet
            var offensiv = 0;
            offensiv = offensiv + parseInt(result['AISK[AISK2]']);
            offensiv = offensiv + parseInt(result['AISK[AISK6]']);
            offensiv = offensiv + parseInt(5 - result['AISK[AIS10]']);
            offensiv = offensiv + parseInt(result['AISK[AIS15]']);
            offensiv = offensiv + parseInt(result['AISK[AIS19]']);
            offensiv = offensiv + parseInt(result['AISK[AIS24]']);
            offensiv = offensiv + parseInt(result['AISK[AIS28]']);
            offensiv = offensiv + parseInt(5 - result['AISK[AIS32]']);
            myResults.offensivitaet_sumscore = offensiv;
            myResults.offensivitaet_stanine = calc.get_stanine(gender, 1, offensiv);


            // Selbststeuerung
            var selbststeuerung = 0;
            selbststeuerung = selbststeuerung + parseInt(5 - result['AISK[AISK3]']);
            selbststeuerung = selbststeuerung + parseInt(5 - result['AISK[AISK7]']);
            selbststeuerung = selbststeuerung + parseInt(5 - result['AISK[AIS12]']);
            selbststeuerung = selbststeuerung + parseInt(5 - result['AISK[AIS16]']);
            selbststeuerung = selbststeuerung + parseInt(result['AISK[AIS20]']);
            selbststeuerung = selbststeuerung + parseInt(5 - result['AISK[AIS25]']);
            selbststeuerung = selbststeuerung + parseInt(result['AISK[AIS29]']);
            selbststeuerung = selbststeuerung + parseInt(5 - result['AISK[AIS33]']);
            myResults.selbststeuerung_sumscore = selbststeuerung;
            myResults.selbststeuerung_stanine = calc.get_stanine(gender, 2, selbststeuerung);


            // Reflexibilitaet
            var reflex = 0;
            reflex = reflex + parseInt(result['AISK[AISK4]']);
            reflex = reflex + parseInt(result['AISK[AISK8]']);
            reflex = reflex + parseInt(result['AISK[AIS13]']);
            reflex = reflex + parseInt(5 - result['AISK[AIS17]']);
            reflex = reflex + parseInt(result['AISK[AIS22]']);
            reflex = reflex + parseInt(result['AISK[AIS26]']);
            reflex = reflex + parseInt(result['AISK[AIS30]']);
            myResults.reflexibilitaet_sumscore = reflex;
            myResults.reflexibilitaet_stanine = calc.get_stanine(gender, 3, reflex);




            // Unneeded - Just for DEBUG
            // myResults.full_data = myResponses;

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
