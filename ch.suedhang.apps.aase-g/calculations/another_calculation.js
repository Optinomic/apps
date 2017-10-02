function main(responses) {


    var calc = {};

    // ------------------------------------------
    // H e l p e r   -   F U N C T I O N S
    // ------------------------------------------

    // CH Datumsformat
    calc.formatDateCH = function(date_string) {
        date_string = date_string || null
        if (date_string !== null) {

            // 1952-11-19T00:00:00.000000000000Z
            var year = parseInt(date_string.substring(0, 4));
            var month = parseInt(date_string.substring(5, 7));
            var day = parseInt(date_string.substring(8, 10));
            var date_string_return = day + "." + month + "." + year

            return date_string_return;
        } else {
            return null;
        }
    };

    calc.roundToOne = function(num) {
        return +(Math.round(num + "e+1") + "e-1");
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


            // Make V1 Compatible
            if (result.hasOwnProperty("AASE_AASE1")) {
                result['AASE[AASE1]'] = result.AASE_AASE1;
                result['AASE[AASE1]'] = result.AASE_AASE2;
                result['AASE[AASE3]'] = result.AASE_AASE3;
                result['AASE[AASE4]'] = result.AASE_AASE4;
                result['AASE[AASE5]'] = result.AASE_AASE5;
                result['AASE[AASE6]'] = result.AASE_AASE6;
                result['AASE[AASE7]'] = result.AASE_AASE7;
                result['AASE[AASE8]'] = result.AASE_AASE8;
                result['AASE[AASE9]'] = result.AASE_AASE9;
                result['AASE[AASE10]'] = result.AASE_AASE10;
                result['AASE[AASE11]'] = result.AASE_AASE11;
                result['AASE[AASE12]'] = result.AASE_AASE12;
                result['AASE[AASE13]'] = result.AASE_AASE13;
                result['AASE[AASE14]'] = result.AASE_AASE14;
                result['AASE[AASE15]'] = result.AASE_AASE15;
                result['AASE[AASE16]'] = result.AASE_AASE16;
                result['AASE[AASE17]'] = result.AASE_AASE17;
                result['AASE[AASE18]'] = result.AASE_AASE18;
                result['AASE[AASE19]'] = result.AASE_AASE19;
                result['AASE[AASE20]'] = result.AASE_AASE20;
            };


            //Score-Berechnung
            var score = 0;
            if (result.Substanz == 2) {
                score = score + parseInt(result['AASEandere[AASE1]']);
                score = score + parseInt(result['AASEandere[AASE2]']);
                score = score + parseInt(result['AASEandere[AASE3]']);
                score = score + parseInt(result['AASEandere[AASE4]']);
                score = score + parseInt(result['AASEandere[AASE5]']);
                score = score + parseInt(result['AASEandere[AASE6]']);
                score = score + parseInt(result['AASEandere[AASE7]']);
                score = score + parseInt(result['AASEandere[AASE8]']);
                score = score + parseInt(result['AASEandere[AASE9]']);
                score = score + parseInt(result['AASEandere[AASE10]']);
                score = score + parseInt(result['AASEandere[AASE11]']);
                score = score + parseInt(result['AASEandere[AASE12]']);
                score = score + parseInt(result['AASEandere[AASE13]']);
                score = score + parseInt(result['AASEandere[AASE14]']);
                score = score + parseInt(result['AASEandere[AASE15]']);
                score = score + parseInt(result['AASEandere[AASE16]']);
                score = score + parseInt(result['AASEandere[AASE17]']);
                score = score + parseInt(result['AASEandere[AASE18]']);
                score = score + parseInt(result['AASEandere[AASE19]']);
                score = score + parseInt(result['AASEandere[AASE20]']);
            } else {
                score = score + parseInt(result['AASE[AASE1]']);
                score = score + parseInt(result['AASE[AASE2]']);
                score = score + parseInt(result['AASE[AASE3]']);
                score = score + parseInt(result['AASE[AASE4]']);
                score = score + parseInt(result['AASE[AASE5]']);
                score = score + parseInt(result['AASE[AASE6]']);
                score = score + parseInt(result['AASE[AASE7]']);
                score = score + parseInt(result['AASE[AASE8]']);
                score = score + parseInt(result['AASE[AASE9]']);
                score = score + parseInt(result['AASE[AASE10]']);
                score = score + parseInt(result['AASE[AASE11]']);
                score = score + parseInt(result['AASE[AASE12]']);
                score = score + parseInt(result['AASE[AASE13]']);
                score = score + parseInt(result['AASE[AASE14]']);
                score = score + parseInt(result['AASE[AASE15]']);
                score = score + parseInt(result['AASE[AASE16]']);
                score = score + parseInt(result['AASE[AASE17]']);
                score = score + parseInt(result['AASE[AASE18]']);
                score = score + parseInt(result['AASE[AASE19]']);
                score = score + parseInt(result['AASE[AASE20]']);
            };

            myResults.score = calc.roundToOne(score);

            myResults.score_mean = calc.roundToOne(score / 20);




            // Subscores - Info from:
            // https://books.google.ch/books?id=r0niDAAAQBAJ&pg=PA19&lpg=PA19&dq=AASE-G+diagnostik&source=bl&ots=Cnrm0EsN_2&sig=Ho5o3-EX6Ck5BkvTN5wew2-WQ2U&hl=de&sa=X&ved=0ahUKEwix3ca7i_TPAhUJMBoKHZ5vAicQ6AEIHDAA#v=onepage&q=AASE-G%20diagnostik&f=false
            // [Frage] Sollten es nicht je 5 Items sein?




            //  AASE3: Wenn ich mich traurig fühle
            //  AASE5: Wenn ich um jemanden besorgt bin
            //  AASE6: Wenn ich sehr beunruhigt bin und mir Sorgen mache
            //  AASE14: Wenn ich so frustriert bin, dass ich in die Luft gehen könnte
            //  AASE16: Wenn ich das Gefühl habe, dass bei mir alles schief läuft
            //  AASE18: Wenn ich ärgerlich bin
            var score_negativer_affekt = 0;
            if (result.Substanz == 2) {
                score_negativer_affekt = score_negativer_affekt + parseInt(result['AASEandere[AASE3]']);
                score_negativer_affekt = score_negativer_affekt + parseInt(result['AASEandere[AASE5]']);
                score_negativer_affekt = score_negativer_affekt + parseInt(result['AASEandere[AASE6]']);
                score_negativer_affekt = score_negativer_affekt + parseInt(result['AASEandere[AASE14]']);
                score_negativer_affekt = score_negativer_affekt + parseInt(result['AASEandere[AASE16]']);
                score_negativer_affekt = score_negativer_affekt + parseInt(result['AASEandere[AASE18]']);
            } else {
                score_negativer_affekt = score_negativer_affekt + parseInt(result['AASE[AASE3]']);
                score_negativer_affekt = score_negativer_affekt + parseInt(result['AASE[AASE5]']);
                score_negativer_affekt = score_negativer_affekt + parseInt(result['AASE[AASE6]']);
                score_negativer_affekt = score_negativer_affekt + parseInt(result['AASE[AASE14]']);
                score_negativer_affekt = score_negativer_affekt + parseInt(result['AASE[AASE16]']);
                score_negativer_affekt = score_negativer_affekt + parseInt(result['AASE[AASE18]']);
            };

            myResults.score_negativer_affekt = calc.roundToOne(score_negativer_affekt);
            myResults.mean_negativer_affekt = calc.roundToOne(score_negativer_affekt / 6);




            //  AASE4: Wenn ich im Urlaub bin und mich entspannen möchte
            //  AASE8: Wenn ich in einer sozialen Situation ein alkoholisches Getränk angeboten bekomme
            //  AASE15: Wenn ich andere in einer Gaststätte oder bei einer Feier trinken sehe
            //  AASE17: Wenn Menschen, mit denen ich früher getrunken habe, mich zum Alkoholtrinken auffordern
            //  AASE20: Wenn ich voller Freude bin oder mit anderen feiere
            var score_soziale_situationen = 0;
            if (result.Substanz == 2) {
                score_soziale_situationen = score_soziale_situationen + parseInt(result['AASEandere[AASE4]']);
                score_soziale_situationen = score_soziale_situationen + parseInt(result['AASEandere[AASE8]']);
                score_soziale_situationen = score_soziale_situationen + parseInt(result['AASEandere[AASE15]']);
                score_soziale_situationen = score_soziale_situationen + parseInt(result['AASEandere[AASE17]']);
                score_soziale_situationen = score_soziale_situationen + parseInt(result['AASEandere[AASE20]']);
            } else {
                score_soziale_situationen = score_soziale_situationen + parseInt(result['AASE[AASE4]']);
                score_soziale_situationen = score_soziale_situationen + parseInt(result['AASE[AASE8]']);
                score_soziale_situationen = score_soziale_situationen + parseInt(result['AASE[AASE15]']);
                score_soziale_situationen = score_soziale_situationen + parseInt(result['AASE[AASE17]']);
                score_soziale_situationen = score_soziale_situationen + parseInt(result['AASE[AASE20]']);
            };

            myResults.score_soziale_situationen = calc.roundToOne(score_soziale_situationen);
            myResults.mean_soziale_situationen = calc.roundToOne(score_soziale_situationen / 5);




            //  AASE2: Wenn ich Kopfschmerzen habe
            //  AASE12: Wenn ich körperlich erschöpft bin
            //  AASE13: Wenn ich körperliche Verletzungen oder Schmerzen habe
            var score_somatisches_unwohlsein = 0;
            if (result.Substanz == 2) {
                score_somatisches_unwohlsein = score_somatisches_unwohlsein + parseInt(result['AASEandere[AASE2]']);
                score_somatisches_unwohlsein = score_somatisches_unwohlsein + parseInt(result['AASEandere[AASE12]']);
                score_somatisches_unwohlsein = score_somatisches_unwohlsein + parseInt(result['AASEandere[AASE13]']);
            } else {
                score_somatisches_unwohlsein = score_somatisches_unwohlsein + parseInt(result['AASE[AASE2]']);
                score_somatisches_unwohlsein = score_somatisches_unwohlsein + parseInt(result['AASE[AASE12]']);
                score_somatisches_unwohlsein = score_somatisches_unwohlsein + parseInt(result['AASE[AASE13]']);
            };

            myResults.score_somatisches_unwohlsein = calc.roundToOne(score_somatisches_unwohlsein);
            myResults.mean_somatisches_unwohlsein = calc.roundToOne(score_somatisches_unwohlsein / 3);




            //  AASE1: Wenn es mich quält, dass ich mit dem Trinken aufgehört habe oder Entzugserscheinungen habe
            //  AASE7: Wenn ich den Drang verspüre, nur ein einziges alkoholisches Getränk zu probieren, um zu sehen, was dann passiert
            //  AASE9: Wenn ich davon träume, ein alkoholisches Getränk zu mir zu nehmen
            //  AASE10: Wenn ich meine Willenskraft über das Trinken testen möchte
            //  AASE11: Wenn ich ein körperliches Bedürfnis oder ein starkes Verlangen nach Alkohol verspüre
            //  AASE19: Wenn mich ganz unerwartet das Verlangen oder der Drang trifft, etwas Alkoholisches zu trinken
            var score_entzugserscheinungen = 0;
            if (result.Substanz == 2) {
                score_entzugserscheinungen = score_entzugserscheinungen + parseInt(result['AASEandere[AASE1]']);
                score_entzugserscheinungen = score_entzugserscheinungen + parseInt(result['AASEandere[AASE7]']);
                score_entzugserscheinungen = score_entzugserscheinungen + parseInt(result['AASEandere[AASE9]']);
                score_entzugserscheinungen = score_entzugserscheinungen + parseInt(result['AASEandere[AASE10]']);
                score_entzugserscheinungen = score_entzugserscheinungen + parseInt(result['AASEandere[AASE11]']);
                score_entzugserscheinungen = score_entzugserscheinungen + parseInt(result['AASEandere[AASE19]']);
            } else {
                score_entzugserscheinungen = score_entzugserscheinungen + parseInt(result['AASE[AASE1]']);
                score_entzugserscheinungen = score_entzugserscheinungen + parseInt(result['AASE[AASE7]']);
                score_entzugserscheinungen = score_entzugserscheinungen + parseInt(result['AASE[AASE9]']);
                score_entzugserscheinungen = score_entzugserscheinungen + parseInt(result['AASE[AASE10]']);
                score_entzugserscheinungen = score_entzugserscheinungen + parseInt(result['AASE[AASE11]']);
                score_entzugserscheinungen = score_entzugserscheinungen + parseInt(result['AASE[AASE19]']);
            };

            myResults.score_entzugserscheinungen = calc.roundToOne(score_entzugserscheinungen);
            myResults.mean_entzugserscheinungen = calc.roundToOne(score_entzugserscheinungen / 6);



            // Get score
            //myResults.getScore = calc.setScore();


            // Messzeitpunkt
            myResults.messzeitpunkt = {
                "mz_id": 4,
                "mz_text": "Unbekannt"
            };

            if ('Erhebungszeitpunkt' in result) {
                myResults.messzeitpunkt.mz_id = parseInt(result.Erhebungszeitpunkt);
                myResults.messzeitpunkt.mz_date = result.Datum;

                if (myResults.messzeitpunkt.mz_id === 1) {
                    myResults.messzeitpunkt.mz_text = "Eintritt";
                };
                if (myResults.messzeitpunkt.mz_id === 2) {
                    myResults.messzeitpunkt.mz_text = "Austritt";
                };
                if (myResults.messzeitpunkt.mz_id === 3) {
                    myResults.messzeitpunkt.mz_text = "Anderer Messzeitpunkt";
                };

            } else {
                myResults.messzeitpunkt.mz_date = result.datestamp;
            };
            myResults.messzeitpunkt.mz_datum = calc.formatDateCH(myResults.messzeitpunkt.mz_date);


            // Ausgefuellt in Bezug auf Substanz
            if (result.Substanz == 2) {
                myResults.messzeitpunkt.substanz = result.SubstAndere;
            } else {
                myResults.messzeitpunkt.substanz = "Alkohol";
            };
            myResults.messzeitpunkt.mz_text_substanz = myResults.messzeitpunkt.mz_text + " | " + myResults.messzeitpunkt.substanz;
            myResults.messzeitpunkt.full_text = "Am " + myResults.messzeitpunkt.mz_datum + " (" + myResults.messzeitpunkt.mz_text + ") wurde der AASE-G in Bezug auf «" + myResults.messzeitpunkt.substanz + "» ausgefüllt.";


            // Write Results for the Return
            // Do not modify stuff here
            myResults.hash = result['optinomixHASH'];
            myResults.response = response;
            allResults.push(myResults);
        });

        return allResults;
    };


    // Return
    return calc.getResults(responses);



}