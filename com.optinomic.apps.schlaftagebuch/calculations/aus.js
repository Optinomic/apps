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

            // Depression
            d.autoritarismuss_scale_score_sum = result.aus_item_01 + result.aus_item_03 + result.aus_item_03 + result.aus_item_04 + result.aus_item_05 + result.aus_item_06 + result.aus_item_07;
            d.autoritarismuss_scale_score = calc.round(d.autoritarismuss_scale_score_sum / 7);


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
