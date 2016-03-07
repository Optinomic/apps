function main(responses) {
    var calc = {};

    // ------------------------------------------
    // H e l p e r   -   F U N C T I O N S
    // ------------------------------------------
        
    // ------------------------------------------
    // F U N C T I O N  -  Main
    // ------------------------------------------
    calc.getResults = function(myResponses) {

        var responses_array = myResponses.survey_responses;
        var allResults = [];

        responses_array.forEach(function(response, myindex) {
            var myResults = {};
            var result = response.data.response;

            // Berechnung AASE-Summenscore
            var aase_score = 0;
                aase_score = aase_score + AASE_AASE1 
                aase_score = aase_score + AASE_AASE2
                aase_score = aase_score + AASE_AASE3
                aase_score = aase_score + AASE_AASE4
                aase_score = aase_score + AASE_AASE5
                aase_score = aase_score + AASE_AASE6
                aase_score = aase_score + AASE_AASE7
                aase_score = aase_score + AASE_AASE8
                aase_score = aase_score + AASE_AASE9
                aase_score = aase_score + AASE_AASE10
                aase_score = aase_score + AASE_AASE11 
                aase_score = aase_score + AASE_AASE12
                aase_score = aase_score + AASE_AASE13
                aase_score = aase_score + AASE_AASE14
                aase_score = aase_score + AASE_AASE15
                aase_score = aase_score + AASE_AASE16
                aase_score = aase_score + AASE_AASE17
                aase_score = aase_score + AASE_AASE18
                aase_score = aase_score + AASE_AASE19
                aase_score = aase_score + AASE_AASE20

        return aase_score;
    };


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
