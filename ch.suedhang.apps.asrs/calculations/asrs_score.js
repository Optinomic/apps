function main(responses) {
    var calc = {};

    // ------------------------------------------
    // H e l p e r   -   F U N C T I O N S
    // ------------------------------------------

    calc.asrsScore = function(result) {

        var score = 0;

        if (ASRS_1 > 2) {
        	score = score + 1;
        };
        if (ASRS_2 > 2) {
        	score = score + 1;
        };
        if (ASRS_3 > 2) {
        	score = score + 1;
        };
        if (ASRS_4 > 3) {
        	score = score + 1;
        };
        if (ASRS_5 > 3) {
        	score = score + 1;
        };
        if (ASRS_6 > 3) {
        	score = score + 1;
        };
        

        var current_range = {};

        var ranges = [{
            "from": 0,
            "to": 2,
            "interpretation": "Keine Hinweise auf ADHS",
            "result_color": "#4CAF50"
        }, {
            "from": 3,
            "to": 6,
            "interpretation": "Hinweise auf ADHS vorhanden",
            "result_color": "#FF5722"
        }];

        current_range = ranges[0];

        if (score >= ranges[1].from) {
            current_range = ranges[1];
        };
        if (score >= ranges[2].from) {
            current_range = ranges[2];
        };


        var return_obj = {
            "score": score,
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

            // BDI-Score
            myResults.score = calc.asrsScore(result);

            // Write Results for the Return
            // Do not modify stuff here
            myResults.hash = result['optinomixHASH'];
            myResults.response = response;
            // myResults.full_responses = myResponses;
            allResults.push(myResults);
        });

        return allResults;
    };


    // Return
    return calc.getResults(responses);
}
