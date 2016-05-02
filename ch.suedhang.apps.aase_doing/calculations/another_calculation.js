function main(responses) {
    var calc = {};

    // ------------------------------------------
    // H e l p e r   -   F U N C T I O N S
    // ------------------------------------------

    calc.getScore = function() {
        var score = 0;
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
            myResults.something = calc.getScore();


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
