function main(responses) {
    var calc = {};

    // ------------------------------------------
    // H e l p e r   -   F U N C T I O N S
    // ------------------------------------------

    calc.doSomething = function() {
        var score = 0;
            score = score + parseInt(d['BDI1']);
            score = score + parseInt(d['BDI2']);
            score = score + parseInt(d['BDI3']);
            score = score + parseInt(d['BDI4']);
            score = score + parseInt(d['BDI5']);
            score = score + parseInt(d['BDI6']);
            score = score + parseInt(d['BDI7']);
            score = score + parseInt(d['BDI8']);
            score = score + parseInt(d['BDI9']);
            score = score + parseInt(d['BDI10']);
            score = score + parseInt(d['BDI11']);
            score = score + parseInt(d['BDI12']);
            score = score + parseInt(d['BDI13']);
            score = score + parseInt(d['BDI14']);
            score = score + parseInt(d['BDI15']);
            score = score + parseInt(d['BDI16']);
            score = score + parseInt(d['BDI17']);
            score = score + parseInt(d['BDI18']);
            score = score + parseInt(d['BDI19']);
            score = score + parseInt(d['BDI20']);
            score = score + parseInt(d['BDI21']);
        
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
