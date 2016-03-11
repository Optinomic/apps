function main(responses) {
    var calc = {};

    // ------------------------------------------
    // H e l p e r   -   F U N C T I O N S
    // ------------------------------------------

    calc.getType = function(my_value) {

        my_value = parseInt(my_value);

        var type = {
            name: 'Verlauf (14-täglich)',
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
            var myResults = {};
            var result = response.data.response;

            // Something
            myResults.type = result;


            myResults.something = calc.doSomething();
            myResults.full_data = myResponses;

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
