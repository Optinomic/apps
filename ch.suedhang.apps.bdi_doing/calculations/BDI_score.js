function main(responses) {
    var calc = {};

    // ------------------------------------------
    // H e l p e r   -   F U N C T I O N S
    // ------------------------------------------

    calc.doSomething = function() {
        var score = 73;
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

            // Berechnung BDI-Summenscore
            var BDI_score = 0;
                BDI_score = BDI_score + BDI1 
                BDI_score = BDI_score + BDI2
                BDI_score = BDI_score + BDI3
                BDI_score = BDI_score + BDI4
                BDI_score = BDI_score + BDI5
                BDI_score = BDI_score + BDI6
                BDI_score = BDI_score + BDI7
                BDI_score = BDI_score + BDI8
                BDI_score = BDI_score + BDI9
                BDI_score = BDI_score + BDI10
                BDI_score = BDI_score + BDI11 
                BDI_score = BDI_score + BDI12
                BDI_score = BDI_score + BDI13
                BDI_score = BDI_score + BDI14
                BDI_score = BDI_score + BDI15
                BDI_score = BDI_score + BDI16
                BDI_score = BDI_score + BDI17
                BDI_score = BDI_score + BDI18
                BDI_score = BDI_score + BDI19
                BDI_score = BDI_score + BDI20
                BDI_score = BDI_score + BDI21
            
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
