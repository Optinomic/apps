function main(responses) {
    var calc = {};

    // ------------------------------------------
    // H e l p e r   -   F U N C T I O N S
    // ------------------------------------------

    calc.doSomething = function() {
        var score = 0;
            score = score + parseInt(d['AASE[AASE1]']);
            score = score + parseInt(d['AASE[AASE2]']);
            score = score + parseInt(d['AASE[AASE3]']);
            score = score + parseInt(d['AASE[AASE4]']);
            score = score + parseInt(d['AASE[AASE5]']);
            score = score + parseInt(d['AASE[AASE6]']);
            score = score + parseInt(d['AASE[AASE7]']);
            score = score + parseInt(d['AASE[AASE8]']);
            score = score + parseInt(d['AASE[AASE9]']);
            score = score + parseInt(d['AASE[AASE10]']);
            score = score + parseInt(d['AASE[AASE11]']);
            score = score + parseInt(d['AASE[AASE12]']);
            score = score + parseInt(d['AASE[AASE13]']);
            score = score + parseInt(d['AASE[AASE14]']);
            score = score + parseInt(d['AASE[AASE15]']);
            score = score + parseInt(d['AASE[AASE16]']);
            score = score + parseInt(d['AASE[AASE17]']);
            score = score + parseInt(d['AASE[AASE18]']);
            score = score + parseInt(d['AASE[AASE19]']);
            score = score + parseInt(d['AASE[AASE20]']);

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
            myResults.something = calc.doSomething();


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
