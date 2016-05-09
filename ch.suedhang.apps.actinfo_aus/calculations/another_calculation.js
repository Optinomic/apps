function main(responses) {
    var calc = {};

    // ------------------------------------------
    // H e l p e r   -   F U N C T I O N S
    // ------------------------------------------

    calc.FAGERSTROEM_Score = function(d) {

        // Calculate AUDIT-Score
        var score = 0;

        score = score + parseInt(d.VZAT020);
        score = score + parseInt(d.VZAT030);
        score = score + parseInt(d.VZAT040);
        score = score + parseInt(d.VZAT050);
        score = score + parseInt(d.VZAT060);
        score = score + parseInt(d.VZAT070);


        var return_obj = {
            "FAGERSTROEM_Score": score
        };


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
            myResults.FAGERSTROEM = calc.FAGERSTROEM_Score(result);


            // Write Results for the Return
            // Do not modify stuff here
            myResults.full = myResponses;            
            myResults.hash = result['optinomixHASH'];
            myResults.response = response;
            allResults.push(myResults);
        });

        return allResults;
    };


    // Return
    return calc.getResults(responses);
}
