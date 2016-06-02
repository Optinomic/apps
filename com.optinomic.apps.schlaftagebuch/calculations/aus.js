function main(responses) {
    var calc = {};


    // ------------------------------------------
    // H e l p e r   -   F U N C T I O N S
    // ------------------------------------------

    calc.round = function(numb) {

        numb = +numb.toFixed(2);

        return numb;
    };


    // ------------------------------------------
    // F U N C T I O N  -  Main
    // ------------------------------------------
    calc.getResults = function(myResponses) {

        var responses_array = myResponses.survey_responses;
        var allResults = [];

        responses_array.forEach(function(response, myindex) {
            var d = {};
            var result = response.data.response;

            d.full = myResponses;

            // Write Results for the Return
            // Do not modify stuff here
            d.hash = result['optinomixHASH'];
            d.response = response;
            allResults.push(d);
        });

        return allResults;
    };


    // Return
    return calc.getResults(responses);
}
