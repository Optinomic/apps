function main(responses) {
    var calc = {};

    // ------------------------------------------
    // H e l p e r   -   F U N C T I O N S
    // ------------------------------------------

    calc.doSomething = function() {
        var score = 0;
            score = score + parseInt(BDI1);
            score = score + parseInt(BDI2);
            score = score + parseInt(BDI3);
            score = score + parseInt(BDI4);
            score = score + parseInt(BDI5);
            score = score + parseInt(BDI6);
            score = score + parseInt(BDI7);
            score = score + parseInt(BDI8);
            score = score + parseInt(BDI9);
            score = score + parseInt(BDI10);
            score = score + parseInt(BDI11);
            score = score + parseInt(BDI12);
            score = score + parseInt(BDI13);
            score = score + parseInt(BDI14);
            score = score + parseInt(BDI15);
            score = score + parseInt(BDI16);
            score = score + parseInt(BDI17);
            score = score + parseInt(BDI18);
            score = score + parseInt(BDI19);
            score = score + parseInt(BDI20);
            score = score + parseInt(BDI21);
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
