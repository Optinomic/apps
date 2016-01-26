function main(responses) {
    var calc = {};


    // ------------------------------------------
    // H e l p e r   -   F U N C T I O N S
    // ------------------------------------------

    calc.checkCutOff = function(score, cut_off) {
        var cut_off_reached = false;

        if (score >= cut_off) {
            cut_off_reached = true;
        }

        return cut_off_reached;
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
            d.depression_scale_score = result.dass_item_03 + result.dass_item_05 + result.dass_item_10 + result.dass_item_13 + result.dass_item_16 + result.dass_item_17 + result.dass_item_21;
            d.depression_cutoff = 10;
            d.depression_cutoff_reached = calc.checkCutOff(d.depression_scale_score, d.cutoff_depression);

            // Angst
            d.angst_scale_score = result.dass_item_02 + result.dass_item_04 + result.dass_item_07 + result.dass_item_09 + result.dass_item_15 + result.dass_item_19 + result.dass_item_20;
            d.angst_cutoff = 6;
            d.angst_cutoff_reached = calc.checkCutOff(d.angst_scale_score, d.angst_cutoff);

            // Stress
            d.stress_scale_score = result.dass_item_01 + result.dass_item_06 + result.dass_item_08 + result.dass_item_11 + result.dass_item_12 + result.dass_item_14 + result.dass_item_18;
            d.stress_cutoff = 6;
            d.stress_cutoff_reached = calc.checkCutOff(d.stress_scale_score, d.stress_cutoff);

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
