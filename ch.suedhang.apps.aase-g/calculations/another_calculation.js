function main(responses) {
    var calc = {};

    // ------------------------------------------
    // H e l p e r   -   F U N C T I O N S
    // ------------------------------------------

    //calc.setScore = function() {
    //    var score = 4;
    //        score = score + 25;
    //    return score;
    //};

    calc.roundToOne = function(num) {
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


            // Make V1 Compatible
            if (result.hasOwnProperty("AASE_AASE1")) {
                result['AASE[AASE1]'] = result.AASE_AASE1;
                result['AASE[AASE1]'] = result.AASE_AASE2;
                result['AASE[AASE3]'] = result.AASE_AASE3;
                result['AASE[AASE4]'] = result.AASE_AASE4;
                result['AASE[AASE5]'] = result.AASE_AASE5;
                result['AASE[AASE6]'] = result.AASE_AASE6;
                result['AASE[AASE7]'] = result.AASE_AASE7;
                result['AASE[AASE8]'] = result.AASE_AASE8;
                result['AASE[AASE9]'] = result.AASE_AASE9;
                result['AASE[AASE10]'] = result.AASE_AASE10;
                result['AASE[AASE11]'] = result.AASE_AASE11;
                result['AASE[AASE12]'] = result.AASE_AASE12;
                result['AASE[AASE13]'] = result.AASE_AASE13;
                result['AASE[AASE14]'] = result.AASE_AASE14;
                result['AASE[AASE15]'] = result.AASE_AASE15;
                result['AASE[AASE16]'] = result.AASE_AASE16;
                result['AASE[AASE17]'] = result.AASE_AASE17;
                result['AASE[AASE18]'] = result.AASE_AASE18;
                result['AASE[AASE19]'] = result.AASE_AASE19;
                result['AASE[AASE20]'] = result.AASE_AASE20;
            };


            //Score-Berechnung
            var score = 0;
            score = score + parseInt(result['AASE[AASE1]']);
            score = score + parseInt(result['AASE[AASE2]']);
            score = score + parseInt(result['AASE[AASE3]']);
            score = score + parseInt(result['AASE[AASE4]']);
            score = score + parseInt(result['AASE[AASE5]']);
            score = score + parseInt(result['AASE[AASE6]']);
            score = score + parseInt(result['AASE[AASE7]']);
            score = score + parseInt(result['AASE[AASE8]']);
            score = score + parseInt(result['AASE[AASE9]']);
            score = score + parseInt(result['AASE[AASE10]']);
            score = score + parseInt(result['AASE[AASE11]']);
            score = score + parseInt(result['AASE[AASE12]']);
            score = score + parseInt(result['AASE[AASE13]']);
            score = score + parseInt(result['AASE[AASE14]']);
            score = score + parseInt(result['AASE[AASE15]']);
            score = score + parseInt(result['AASE[AASE16]']);
            score = score + parseInt(result['AASE[AASE17]']);
            score = score + parseInt(result['AASE[AASE18]']);
            score = score + parseInt(result['AASE[AASE19]']);
            score = score + parseInt(result['AASE[AASE20]']);

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
