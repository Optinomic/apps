function main(responses) {

    var calc = {};

    // ------------------------------------------
    // H e l p e r   -   F U N C T I O N S
    // ------------------------------------------

    calc.asrsScore = function(result) {


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
            "result_color": "#4CAF50"
        }, {
            "from": 4,
            "to": 6,
            "interpretation": "Hinweise auf ADHS vorhanden",
            "result_color": "#FF5722"
        }];

        current_range = ranges[0];

        if (score >= ranges[1].from) {
            current_range = ranges[1];
        };


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

            // ASRS-Score
            myResults.score = calc.asrsScore(result);

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
