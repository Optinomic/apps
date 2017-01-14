function main(responses) {
    var calc = {};

    // ------------------------------------------
    // H e l p e r   -   F U N C T I O N S
    // ------------------------------------------

    // Runden
    calc.roundToOne = function(num) {
        return +(Math.round(num + "e+1") + "e-1");
    }


    calc.AUDIT_Score = function(d, gender) {


        // Calculate AUDIT-Score
        var score = 0;
        var count_valid_scores = 0;

        if (d.VZEA010 != '999') {
            score = score + parseInt(d.VZEA010);
            count_valid_scores = count_valid_scores + 1;
        };

        if (d.VZEA020 != '999') {
            score = score + parseInt(d.VZEA020);
            count_valid_scores = count_valid_scores + 1;
        };

        if (d.VZEA030 != '999') {
            score = score + parseInt(d.VZEA030);
            count_valid_scores = count_valid_scores + 1;
        };

        if (d.VZEA040 != '999') {
            score = score + parseInt(d.VZEA040);
            count_valid_scores = count_valid_scores + 1;
        };

        if (d.VZEA050 != '999') {
            score = score + parseInt(d.VZEA050);
            count_valid_scores = count_valid_scores + 1;
        };

        if (d.VZEA060 != '999') {
            score = score + parseInt(d.VZEA060);
            count_valid_scores = count_valid_scores + 1;
        }

        if (d.VZEA070 != '999') {
            score = score + parseInt(d.VZEA070);
            count_valid_scores = count_valid_scores + 1;
        };

        if (d.VZEA080 != '999') {
            score = score + parseInt(d.VZEA080);
            count_valid_scores = count_valid_scores + 1;
        };

        if (d.VZEA090 != '999') {
            score = score + parseInt(d.VZEA090);
            count_valid_scores = count_valid_scores + 1;
        };

        if (d.VZEA100 != '999') {
            score = score + parseInt(d.VZEA100);
            count_valid_scores = count_valid_scores + 1;
        };


        var anz_mw_to_add = 10 - count_valid_scores;
        var AUDIT_Score_Mean = calc.roundToOne(score / count_valid_scores);

        score = score + (anz_mw_to_add * AUDIT_Score_Mean);


        // Populations (Men / Woman)

        var scale_ranges_men = [{
            "from": 0,
            "to": 7,
            "result": "Risikoarmer Alkoholkonsum",
            "result_color": "#4CAF50"
        }, {
            "from": 8,
            "to": 15,
            "result": "Verdacht auf eine alkoholbezogene Störung",
            "result_color": "#FF9800"
        }, {
            "from": 16,
            "to": 40,
            "result": "Hohe Wahrscheinlichkeit einer Alkoholabhängigkeit",
            "result_color": "#F44336"
        }];

        var scale_ranges_woman = [{
            "from": 0,
            "to": 4,
            "result": "Risikoarmer Alkoholkonsum",
            "result_color": "#4CAF50"
        }, {
            "from": 5,
            "to": 14,
            "result": "Verdacht auf eine alkoholbezogene Störung",
            "result_color": "#FF9800"
        }, {
            "from": 15,
            "to": 40,
            "result": "Hohe Wahrscheinlichkeit einer Alkoholabhängigkeit",
            "result_color": "#F44336"
        }];


        // Current Population festlegen
        var current_population = {};

        if (gender === 'male') {
            // Mann
            current_population = scale_ranges_men;
        } else {
            // Frau
            current_population = scale_ranges_woman;
        };


        var selected_population = {};
        selected_population = current_population[0];

        if (score >= current_population[1].from) {
            selected_population = current_population[1];
        };
        if (score >= current_population[2].from) {
            selected_population = current_population[2];
        };


        var return_obj = {
            "AUDIT_Score": score,
            "AUDIT_Score_Mean": AUDIT_Score_Mean,
            "valid_scores": count_valid_scores,
            "gender": gender,
            "interpretation": selected_population,
            "ranges": { "ranges": current_population }
        };


        return return_obj;
    };



    calc.FAGERSTROEM_Score = function(d) {

        // Calculate AUDIT-Score
        var score = 0;

        score = score + parseInt(d.VZET020);
        score = score + parseInt(d.VZET030);
        score = score + parseInt(d.VZET040);
        score = score + parseInt(d.VZET050);
        score = score + parseInt(d.VZET060);
        score = score + parseInt(d.VZET070);


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

            var gender = myResponses.patient.data.gender;

            // Something
            myResults.AUDIT = calc.AUDIT_Score(result, gender);
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
