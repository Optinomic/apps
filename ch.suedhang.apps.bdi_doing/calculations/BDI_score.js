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

                           // Berechnung BDI-Summenscore
            var BDI_score = 0;
                BDI_score = BDI_score + parseInt(BDI1);
                BDI_score = BDI_score + parseInt(BDI2);
                BDI_score = BDI_score + parseInt(BDI3);
                BDI_score = BDI_score + parseInt(BDI4);
                BDI_score = BDI_score + parseInt(BDI5);
                BDI_score = BDI_score + parseInt(BDI6);
                BDI_score = BDI_score + parseInt(BDI7);
                BDI_score = BDI_score + parseInt(BDI8);
                BDI_score = BDI_score + parseInt(BDI9);
                BDI_score = BDI_score + parseInt(BDI10);
                BDI_score = BDI_score + parseInt(BDI11);
                BDI_score = BDI_score + parseInt(BDI12);
                BDI_score = BDI_score + parseInt(BDI13);
                BDI_score = BDI_score + parseInt(BDI14);
                BDI_score = BDI_score + parseInt(BDI15);
                BDI_score = BDI_score + parseInt(BDI16);
                BDI_score = BDI_score + parseInt(BDI17);
                BDI_score = BDI_score + parseInt(BDI18);
                BDI_score = BDI_score + parseInt(BDI19);
                BDI_score = BDI_score + parseInt(BDI20);
                BDI_score = BDI_score + parseInt(BDI21);

            myResults.BDI_score = BDI_score;

            
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
