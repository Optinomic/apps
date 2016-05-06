function main(responses) {
    var calc = {};

    // ------------------------------------------
    // H e l p e r   -   F U N C T I O N S
    // ------------------------------------------

    calc.AUDIT_Score = function(d, gender) {


        // Calculate AUDIT-Score
        var score = 0;

        score = score + parseInt(d.VZEA010);
        score = score + parseInt(d.VZEA020);
        score = score + parseInt(d.VZEA030);
        score = score + parseInt(d.VZEA040);
        score = score + parseInt(d.VZEA050);
        score = score + parseInt(d.VZEA060);
        score = score + parseInt(d.VZEA070);
        score = score + parseInt(d.VZEA080);
        score = score + parseInt(d.VZEA090);
        score = score + parseInt(d.VZEA100);
        score = score + 1;



        // Populations (Men / Woman)

        var scale_ranges_men = [{
            "from": 0,
            "to": 7,
            "result": "Risikoarmer Alkoholkonsum",
            "result_color": "green"
        }, {
            "from": 8,
            "to": 15,
            "result": "Verdacht auf eine alkoholbezogene Stoerung",
            "result_color": "orange"
        }, {
            "from": 16,
            "to": 40,
            "result": "Hohe Wahrscheinlichkeit einer Alkoholabhaengigkeit",
            "result_color": "red"
        }];

        var scale_ranges_woman = [{
            "from": 0,
            "to": 4,
            "result": "Risikoarmer Alkoholkonsum",
            "result_color": "green"
        }, {
            "from": 5,
            "to": 14,
            "result": "Verdacht auf eine alkoholbezogene Stoerung",
            "result_color": "orange"
        }, {
            "from": 15,
            "to": 40,
            "result": "Hohe Wahrscheinlichkeit einer Alkoholabhaengigkeit",
            "result_color": "red"
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
        score = score + parseInt(d.VZEA050);
        score = score + parseInt(d.VZET060);
        score = score + parseInt(d.VZET070);


        var scale_ranges_fagerstoem = [{
            "from": 0,
            "to": 2,
            "result": "Geringe koerperliche Abhaengigkeit.",
            "result_color": "green",
            "logo_speed": 10
        }, {
            "from": 3,
            "to": 4,
            "result": "Mittlere koerperliche Abhaengigkeit.",
            "result_color": "orange",
            "logo_speed": 25
        }, {
            "from": 5,
            "to": 6,
            "result": "Starke koerperliche Abhaengigkeit.",
            "result_color": "red",
            "logo_speed": 50
        }, {
            "from": 7,
            "to": 10,
            "result": "Sehr starke koerperliche Abhaengigkeit.",
            "result_color": "red",
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
