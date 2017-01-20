function main(responses) {
    var calc = {};

    // ------------------------------------------
    // H e l p e r   -   F U N C T I O N S
    // ------------------------------------------

    calc.bdiScore = function(result) {

        var score = 0;
        score = score + parseInt(result['BDI1']);
        score = score + parseInt(result['BDI2']);
        score = score + parseInt(result['BDI3']);
        score = score + parseInt(result['BDI4']);
        score = score + parseInt(result['BDI5']);
        score = score + parseInt(result['BDI6']);
        score = score + parseInt(result['BDI7']);
        score = score + parseInt(result['BDI8']);
        score = score + parseInt(result['BDI9']);
        score = score + parseInt(result['BDI10']);
        score = score + parseInt(result['BDI11']);
        score = score + parseInt(result['BDI12']);
        score = score + parseInt(result['BDI13']);
        score = score + parseInt(result['BDI14']);
        score = score + parseInt(result['BDI15']);
        score = score + parseInt(result['BDI16']);
        score = score + parseInt(result['BDI17']);
        score = score + parseInt(result['BDI18']);
        score = score + parseInt(result['BDI19']);
        score = score + parseInt(result['BDI20']);
        score = score + parseInt(result['BDI21']);



        var current_range = {};

        var ranges = [{
            "from": 0,
            "to": 8,
            "interpretation_de": "Kein Verdacht auf eine Depression",
            "interpretation_en": "No Depression",
            "result_color": "#4CAF50"
        }, {
            "from": 9,
            "to": 13,
            "interpretation_de": "Verdacht auf eine minimale Depression",
            "interpretation_en": "Minimum Depression",
            "result_color": "#4CAF50"
        }, {
            "from": 14,
            "to": 19,
            "interpretation_de": "Verdacht auf eine leichte Depression",
            "interpretation_en": "Light Depression",
            "result_color": "#FF5722"
        }, {
            "from": 20,
            "to": 28,
            "interpretation_de": "Verdacht auf eine mittelschwere Depression",
            "interpretation_en": "Moderate Depression",
            "result_color": "#FF5722"
        }, {
            "from": 29,
            "to": 63,
            "interpretation_de": "Verdacht auf eine schwere Depression",
            "interpretation_en": "Major Depression",
            "result_color": "#F44336"
        }];

        current_range = ranges[0];

        if (score >= ranges[1].from) {
            current_range = ranges[1];
        };
        if (score >= ranges[2].from) {
            current_range = ranges[2];
        };
        if (score >= ranges[3].from) {
            current_range = ranges[3];
        };
        if (score >= ranges[4].from) {
            current_range = ranges[4];
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
            myResults.score = calc.bdiScore(result);

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
