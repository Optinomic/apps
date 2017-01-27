function main(responses) {
    var calc = {};

    // ------------------------------------------
    // H e l p e r   -   F U N C T I O N S
    // ------------------------------------------

    calc.FAGERSTROEM_Score = function(d) {

        // Calculate AUDIT-Score
        var score = 0;
        var valid_scores = 0;

        if (d.VZAT020 != '999') {
            score = score + parseInt(d.VZAT020);
            count_valid_scores = count_valid_scores + 3;
        };
        if (d.VZAT030 != '999') {
            score = score + parseInt(d.VZAT030);
            count_valid_scores = count_valid_scores + 3;
        };

        if (d.VZAT040 != '999') {
            score = score + parseInt(d.VZAT040);
            count_valid_scores = count_valid_scores + 1;
        };

        if (d.VZAT050 != '999') {
            score = score + parseInt(d.VZAT050);
            count_valid_scores = count_valid_scores + 1;
        };

        if (d.VZAT060 != '999') {
            score = score + parseInt(d.VZAT060);
            count_valid_scores = count_valid_scores + 1;
        };

        if (d.VZAT070 != '999') {
            score = score + parseInt(d.VZAT070);
            count_valid_scores = count_valid_scores + 1;
        };

        var anz_mw_to_add = 10 - count_valid_scores;
        var Fagerstroem_Mean = calc.roundToOne(score / count_valid_scores);

        score = score + (anz_mw_to_add * Fagerstroem_Mean)

        var scale_ranges_fagerstoem = [{
            "from": 0,
            "to": 2,
            "result": "Gering ausgeprägte körperliche Abhängigkeit.",
            "result_color": "#4CAF50",
            "logo_speed": 10
        }, {
            "from": 3,
            "to": 4,
            "result": "Mittelstark ausgeprägte körperliche Abhängigkeit.",
            "result_color": "#FF9800",
            "logo_speed": 25
        }, {
            "from": 5,
            "to": 6,
            "result": "Stark ausgeprägte körperliche Abhängigkeit.",
            "result_color": "#F44336",
            "logo_speed": 50
        }, {
            "from": 7,
            "to": 10,
            "result": "Sehr stark ausgeprägte körperliche Abhängigkeit.",
            "result_color": "#F44336",
            "logo_speed": 55
        }];


        var selected_population = {};
        selected_population = scale_ranges_fagerstoem[0];

        if (score >= scale_ranges_fagerstoem[1].from) {
            selected_population = scale_ranges_fagerstoem[1];
        };
        if (score >= scale_ranges_fagerstoem[2].from) {
            selected_population = scale_ranges_fagerstoem[2];
        };
        if (score >= scale_ranges_fagerstoem[3].from) {
            selected_population = scale_ranges_fagerstoem[3];
        };

        var return_obj = {
            "FAGERSTROEM_Score": score,
            "interpretation": selected_population,
            "ranges": { "ranges": scale_ranges_fagerstoem }
        };


        return return_obj;
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
            // myResults.full = myResponses;
            myResults.hash = result['optinomixHASH'];
            myResults.response = response;
            allResults.push(myResults);
        });

        return allResults;
    };


    // Return
    return calc.getResults(responses);
}
