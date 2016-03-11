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

    calc.getDropout = function(my_value, my_raeson) {

        my_value = parseInt(my_value);

        var obj = {
            dropout: false,
            dropout_raeson: '',
            dropout_id: my_value
        };

        if (my_value === 1) {
            obj.dropout = true;
            obj.dropout_raeson = 'Patient ist innerhalb von 7 Tagen nach Eintritt ausgetreten.';
        };

        if (my_value === 2) {
            obj.dropout = true;
            obj.dropout_raeson = my_raeson;
        };

        return obj;
    };


    calc.getSumScores = function(r) {

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

            // --------------------------------
            // Calculation
            // --------------------------------
            d.type = calc.getType(r.q401V04);
            d.dropout = calc.getDropout(r['q401V05'], r['q401V06']);

            d.full_response = myResponses;

            // Write Results for the Return
            // Do not modify stuff here
            d.r = r;
            d.hash = r['optinomixHASH'];
            d.response = response;
            allResults.push(d);
        });

        return allResults;
    };


    // Return
    return calc.getResults(responses);
}
