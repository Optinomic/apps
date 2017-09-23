function main(responses) {
    var calc = {};

    // ------------------------------------------
    // H e l p e r   -   F U N C T I O N S
    // ------------------------------------------

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


            // myResults.sum_scores = {};
            // myResults.sum_scores.aggr = parseInt(result['BSCL[sq504V06]']) + parseInt(result['BSCL[sq504V13]']) + parseInt(result['BSCL[sq504V40]']) + parseInt(result['BSCL[sq504V41]']) + parseInt(result['BSCL[sq504V46]']);



            // Berchnung PHYS
            var PHYS_sum = 0;
            var PHYS_avg = 0;
            PHYS_sum = PHYS_sum + (6 - parseInt(result['EWHOQOL39[EWHOQOL3]']));
            PHYS_sum = PHYS_sum + (6 - parseInt(result['EWHOQOL39[EWHOQOL4]']));
            PHYS_sum = PHYS_sum + parseInt(result['EWHOQOL1014[EWHOQOL10]']);
            PHYS_sum = PHYS_sum + parseInt(result['EWHOQOL15']);
            PHYS_sum = PHYS_sum + parseInt(result['EWHOQOL1625[EWHOQOL16]']);
            PHYS_sum = PHYS_sum + parseInt(result['EWHOQOL1625[EWHOQOL17]']);
            PHYS_sum = PHYS_sum + parseInt(result['EWHOQOL1625[EWHOQOL18]']);

            myResults.PHYS_sum = PHYS_sum;

            PHYS_avg = PHYS_sum / 7;
            PHYS_avg = (PHYS_avg * 4 - 4) * (100 / 16);
            myResults.PHYS_avg = calc.roundToOne(PHYS_avg);


            // Berchnung PSYCH
            var PSYCH_sum = 0;
            var PSYCH_avg = 0;

            PSYCH_sum = PSYCH_sum + parseInt(result['EWHOQOL39[EWHOQOL5]']);
            PSYCH_sum = PSYCH_sum + parseInt(result['EWHOQOL39[EWHOQOL6]']);
            PSYCH_sum = PSYCH_sum + parseInt(result['EWHOQOL39[EWHOQOL7]']);
            PSYCH_sum = PSYCH_sum + parseInt(result['EWHOQOL1014[EWHOQOL11]']);
            PSYCH_sum = PSYCH_sum + parseInt(result['EWHOQOL1625[EWHOQOL19]']);
            PSYCH_sum = PSYCH_sum + (6 - parseInt(result['EWHOQOL26']));

            myResults.PSYCH_sum = PSYCH_sum;

            PSYCH_avg = PSYCH_sum / 6;
            PSYCH_avg = (PSYCH_avg * 4 - 4) * (100 / 16);

            //myResults.PSYCH_avg = Math.round(PSYCH_avg);
            myResults.PSYCH_avg = calc.roundToOne(PSYCH_avg);


            // Something
            // myResults.something = calc.doSomething();


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
