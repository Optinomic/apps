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

    calc.getSumScores = function(my_data) {

        var scores = [];
        var sum_obj = {};

        //for (var x = 0; x < scores.length; x++) {
        //    var current_score = scores[x];
        //    var current_value = parseInt(my_data[current_score.var]);
        //
        //    if (current_value === 9) {
        //        current_score.sum_score = 'k.A.';
        //        sum_obj.count_kA = sum_obj.count_kA + 1;
        //    } else {
        //        current_score.sum_score = current_value;
        //        sum_obj.sum_total = sum_obj.sum_total + current_value;
        //        sum_obj.count_value = sum_obj.count_value + 1;
        //    };
        //
        //};
        //
        //
        //if (sum_obj.count_value === 0) {
        //    sum_obj.sum_score = 'k.A.';
        //} else {
        //    sum_obj.sum_score = sum_obj.sum_total / sum_obj.count_value * 12;
        //}


        var return_object {
            "total": sum_obj,
            "scores": scores
        };

        return return_object;
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

            // --------------------------
            // Calculations
            // --------------------------
            d.type = calc.getType(r['q401V04']);
            d.dropout = calc.getDropout(r['q401V05'], r['q401V06']);
            d.scores = calc.getSumScores(response.data.response);

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
