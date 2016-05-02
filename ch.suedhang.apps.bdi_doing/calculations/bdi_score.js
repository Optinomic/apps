function main(responses) {
    var calc = {};

    // ------------------------------------------
    // H e l p e r   -   F U N C T I O N S
    // ------------------------------------------

    calc.bdiScore = function() {
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
        
        return score;
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

            // Something
            myResults.score = calc.bdiScore();

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
