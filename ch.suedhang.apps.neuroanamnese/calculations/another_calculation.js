function main(responses) {
    var calc = {};

    // ------------------------------------------
    // H e l p e r   -   F U N C T I O N S
    // ------------------------------------------

/*
    calc.getNumItems = function() {
        
        var items = 0;
        if (result.Erhebungszeitpunkt == 1) {
            items = items + parseInt(result['NeuroAnamEin_SQ001']);
            items = items + parseInt(result['NeuroAnamEin_SQ002']);
            items = items + parseInt(result['NeuroAnamEin_SQ003']);
            items = items + parseInt(result['NeuroAnamEin_SQ004']);
            items = items + parseInt(result['NeuroAnamEin_SQ005']);
            items = items + parseInt(result['NeuroAnamEin_SQ006']);
            items = items + parseInt(result['NeuroAnamEin_SQ007']);
            items = items + parseInt(result['NeuroAnamEin_SQ008']);
            items = items + parseInt(result['NeuroAnamEin_SQ009']);
            items = items + parseInt(result['NeuroAnamEin_SQ010']);
            items = items + parseInt(result['NeuroAnamEin_SQ011']);
            items = items + parseInt(result['NeuroAnamEin_SQ013']);
        } else {
            items = items + parseInt(result['NeuroAnamAus_SQ001']);
            items = items + parseInt(result['NeuroAnamAus_SQ002']);
            items = items + parseInt(result['NeuroAnamAus_SQ003']);
            items = items + parseInt(result['NeuroAnamAus_SQ006']);
            items = items + parseInt(result['NeuroAnamAus_SQ007']);
            items = items + parseInt(result['NeuroAnamAus_SQ008']);
            items = items + parseInt(result['NeuroAnamAus_SQ009']);
            items = items + parseInt(result['NeuroAnamAus_SQ010']);
            items = items + parseInt(result['NeuroAnamAus_SQ011']);
            items = items + parseInt(result['NeuroAnamAus_SQ012']);
        };

        return items;
    };
*/

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