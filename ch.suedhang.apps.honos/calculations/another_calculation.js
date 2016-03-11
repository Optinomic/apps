function main(responses) {
    var calc = {};

    // ------------------------------------------
    // H e l p e r   -   F U N C T I O N S
    // ------------------------------------------

    calc.getType = function(my_value) {

        my_value = parseInt(my_value);

        var type = {
            name: 'Verlauf',
            id: my_value
        };

        if (my_value === 1) {
            type.name = 'Eintritt';
        };

        if (my_value === 2) {
            type.name = 'Austritt';
        };

        return type;
    };


    // ------------------------------------------
    // F U N C T I O N  -  Main
    // ------------------------------------------
    calc.getResults = function(myResponses) {

        var responses_array = myResponses.survey_responses;
        var allResults = [];

        responses_array.forEach(function(response, myindex) {
            var d = {};
            var r = response.data.response;

            d.r = r;

            // Calculation
            d.type = calc.getType(r.q401V04);

            d.full_response = myResponses;

            // Write Results for the Return
            // Do not modify stuff here
            d.hash = r['optinomixHASH'];
            d.response = response;
            allResults.push(d);
        });

        return allResults;
    };


    // Return
    return calc.getResults(responses);
}
