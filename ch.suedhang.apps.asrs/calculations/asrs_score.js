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


        calc.asrsScore = function(result, datum) {


            // ---------------------------
            // Score berechnen
            // --------------------------

            var score = 0;
            var sum = 0;

            if (parseInt(result.ASRS_1) > 1) {
                score = score + 1;
            };
            if (parseInt(result.ASRS_2) > 1) {
                score = score + 1;
            };
            if (parseInt(result.ASRS_3) > 1) {
                score = score + 1;
            };
            if (parseInt(result.ASRS_4) > 2) {
                score = score + 1;
            };
            if (parseInt(result.ASRS_5) > 2) {
                score = score + 1;
            };
            if (parseInt(result.ASRS_6) > 2) {
                score = score + 1;
            };

            sum = sum + parseInt(result.ASRS_1) + parseInt(result.ASRS_2) + parseInt(result.ASRS_3) + parseInt(result.ASRS_4) + parseInt(result.ASRS_5) + parseInt(result.ASRS_6);


            // ---------------------------
            // Aktuellen Range berechnen
            // --------------------------

            var current_range = {};

            var ranges = [{
                "from": 0,
                "to": 3,
                "interpretation": "Keine Hinweise auf ADHS vorhanden",
                "result_color": "#2E7D32"
            }, {
                "from": 4,
                "to": 6,
                "interpretation": "Hinweise auf ADHS vorhanden",
                "result_color": "#C62828"
            }];

            current_range = ranges[0];

            if (score >= ranges[1].from) {
                current_range = ranges[1];
            };


            var zahltext = "Keine";
            if (score === 1) {
                zahltext = "Eine";
            };
            if (score === 2) {
                zahltext = "Zwei";
            };
            if (score === 3) {
                zahltext = "Drei";
            };
            if (score === 4) {
                zahltext = "Vier";
            };
            if (score === 5) {
                zahltext = "Fünf";
            };
            if (score === 6) {
                zahltext = "Sechs";
            };

            current_range.text = zahltext + " der sechs Screeningfragen lagen am " + datum + " im auffälligen Bereich (" + sum + " von 24 Punkten).";

            var return_obj = {
                "score": score,
                "sum": sum,
                "current_range": current_range,
                "ranges": ranges
            };

            return return_obj;
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


                // Messzeitpunkt
                myResults.messzeitpunkt = {};

                myResults.messzeitpunkt.mz_date = response.data.filled;
                myResults.messzeitpunkt.mz_datum = calc.formatDateCH(myResults.messzeitpunkt.mz_date);

                // ASRS-Score
                myResults.score = calc.asrsScore(result, calc.formatDateCH(response.data.filled));

                myResults.adhs_references = false;
                if (myResults.score > 3) {
                    myResults.adhs_references = true;
                };

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