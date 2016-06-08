function main(responses) {
    var calc = {};

    // ------------------------------------------
    // H e l p e r   -   F U N C T I O N S
    // ------------------------------------------

    calc.doSomething = function() {
        var score = 73;
        return score;
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
            myResults.something = calc.doSomething();


            // Write Results for the Return
            // Do not modify stuff here
            myResults.hash = result['optinomixHASH'];
            myResults.response = response;
            myResults.responses = responses;
            allResults.push(myResults);
        });

        return allResults;
    };


    // Return
    return calc.getResults(responses);
}

/*     calc.roundToOne = function(num) {
        return +(Math.round(num + "e+1") + "e-1");
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


            //Score-Berechnung
            var score = 0;
            score = score + parseInt(result['Abbrueche']);
            score = score + parseInt(result['AbstMot']);
            score = score + parseInt(result['Allein']);
            score = score + parseInt(result['Alter']);
            score = score + parseInt(result['Arbeitslos']);
            score = score + parseInt(result['Craving']);
            score = score + parseInt(result['DauerAbh']);
            score = score + parseInt(result['Kontrollv']);
            score = score + parseInt(result['Leber']);
            score = score + parseInt(result['MorgenTr']);
            score = score + parseInt(result['Neurol']);
            score = score + parseInt(result['Psych']);
            score = score + parseInt(result['Rueckfaelle']);
            score = score + parseInt(result['Somat']);
            score = score + parseInt(result['Wohnen']);
            score = score + parseInt(result['ambEntwoehnung']);
            score = score + parseInt(result['ambEntzugMedi']);
            score = score + parseInt(result['posErw']);
            score = score + parseInt(result['statEntwoehnung']);
            score = score + parseInt(result['statEnzug']);
            
            myResults.score = calc.roundToOne(score)

            // Get score
            //myResults.getScore = calc.setScore();


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
*/