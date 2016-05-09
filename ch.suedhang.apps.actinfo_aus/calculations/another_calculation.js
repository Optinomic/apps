function main(responses) {
    var calc = {};

    // ------------------------------------------
    // H e l p e r   -   F U N C T I O N S
    // ------------------------------------------

    // Runden
    calc.roundToOne = function(num) {
        return +(Math.round(num + "e+1") + "e-1");
    }


    calc.FAGERSTROEM_Score = function(d) {

        // Calculate Fagerström-Score
        var score = 0;
        var count_valid_scores = 0;

        if (d.VZAT020 != '999') {
            score = score + parseInt(d.VZAT020);
            count_valid_scores = count_valid_scores + 1;
        };

        if (d.VZAT030 != '999') {
            score = score + parseInt(d.VZAT030);
            count_valid_scores = count_valid_scores + 1;
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

 
        var anz_mw_to_add = 6 - count_valid_scores;
        var FAGER_Score_Mean = calc.roundToOne(score / count_valid_scores);

        score = score + (anz_mw_to_add * FAGER_Score_Mean);

        var scale_ranges_fagerstroem = [{
            "from": 0,
            "to": 2,
            "result": "Geringe körperliche Abhängigkeit.",
            "result_color": "#4CAF50",
            "logo_speed": 10
        }, {
            "from": 3,
            "to": 4,
            "result": "Mittlere körperliche Abhängigkeit.",
            "result_color": "#FF9800",
            "logo_speed": 25
        }, {
            "from": 5,
            "to": 6,
            "result": "Starke körperliche Abhängigkeit.",
            "result_color": "#F44336",
            "logo_speed": 50
        }, {
            "from": 7,
            "to": 10,
            "result": "Sehr starke körperliche Abhängigkeit.",
            "result_color": "#F44336",
            "logo_speed": 55
        }];


        var selected_population = {};
        selected_population = scale_ranges_fagerstroem[0];

        if (score >= scale_ranges_fagerstroem[1].from) {
            selected_population = scale_ranges_fagerstroem[1];
        };
        if (score >= scale_ranges_fagerstroem[2].from) {
            selected_population = scale_ranges_fagerstroem[2];
        };
        if (score >= scale_ranges_fagerstroem[3].from) {
            selected_population = scale_ranges_fagerstroem[3];
        };


        var return_obj = {
            "FAGERSTROEM_Score": score,
            "FAGERSTROEM_Score_Mean": FAGER_Score_Mean
            "valid_scores": count_valid_scores,
            "interpretation": selected_population,
            "ranges": { "ranges": scale_ranges_fagerstroem }
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

            var gender = myResponses.patient.data.gender;

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
