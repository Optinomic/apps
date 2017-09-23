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

        // Altersgruppe & Normwerte WHOQOL [Phys., Psych.]
        if (set_age < 26) {
            if (gender === 'male') {
            // Männer, Altersgruppe 18 - 25 | n = 124
            altersgruppe = 0;
            altersgruppe_text = "Männer, 18 - 25";
            n = 124;
            altersgruppe_found = true;
            var M_Norm = [87.17, 79.07];
            var SD_Norm = [13.62, 14.00];
            } else {
            // Frauen, Altersgruppe 18 - 25 | n = 116
            altersgruppe = 0;
            altersgruppe_text = "Frauen, 18 - 25";
            n = 116;
            altersgruppe_found = true;
            var M_Norm = [86.04, 77.74];
            var SD_Norm = [13.24, 15.12];
            };   
        };

        if ((set_age >= 26) && (set_age <= 35)) {
            if (gender === 'male') {
            // Männer, Altersgruppe 26 - 35 | n = 180
            altersgruppe = 1;
            altersgruppe_text = "Männer, 26 - 35";
            n = 180;
            altersgruppe_found = true;
            var M_Norm = [85.58, 77.80];
            var SD_Norm = [13.02, 14.43];
            } else {
            // Frauen, Altersgruppe 26 - 55 | n = 214
            altersgruppe = 1;
            altersgruppe_text = "Frauen, 26 - 35";
            n = 214;
            altersgruppe_found = true;
            var M_Norm = [82.87, 77.47];
            var SD_Norm = [14.67, 15.41];
            };   
        };

        if ((set_age >= 36) && (set_age <= 45)) {
            if (gender === 'male') {
            // Männer, Altersgruppe 36 - 45 | n = 170
            altersgruppe = 2;
            altersgruppe_text = "Männer, 36 - 45";
            n = 170;
            altersgruppe_found = true;
            var M_Norm = [82.30, 75.28];
            var SD_Norm = [15.76, 16.52];
            } else {
            // Frauen, Altersgruppe 36 - 45 | n = 193
            altersgruppe = 2;
            altersgruppe_text = "Frauen, 36 - 45";
            n = 193;
            altersgruppe_found = true;
            var M_Norm = [79.48, 73.22];
            var SD_Norm = [16.46, 16.31];
            };   
        };

        if ((set_age >= 46) && (set_age <= 55)) {
            if (gender === 'male') {
            // Männer, Altersgruppe 46 - 55 | n = 125
            altersgruppe = 3;
            altersgruppe_text = "Männer, 46 - 55";
            n = 125;
            altersgruppe_found = true;
            var M_Norm = [76.52, 74.69];
            var SD_Norm = [17.71, 15.67];
            } else {
            // Frauen, Altersgruppe 46 - 55 | n = 143
            altersgruppe = 3;
            altersgruppe_text = "Frauen, 46 - 55";
            n = 143;
            altersgruppe_found = true;
            var M_Norm = [77.14, 73.39];
            var SD_Norm = [16.74, 15.28];
            };   
        };

        if ((set_age >= 56) && (set_age <= 65)) {
            if (gender === 'male') {
            // Männer, Altersgruppe 56 - 65 | n = 171
            altersgruppe = 4;
            altersgruppe_text = "Männer, 56 - 65";
            n = 171;
            altersgruppe_found = true;
            var M_Norm = [75.43, 75.67];
            var SD_Norm = [16.37, 13.76];
            };
        }, else {
            // Frauen, Altersgruppe 56 - 65 | n = 224
            altersgruppe = 4;
            altersgruppe_text = "Frauen, 56 - 56";
            n = 224;
            altersgruppe_found = true;
            var M_Norm = [71.03, 70.65];
            var SD_Norm = [17.91, 17.26];
            };   
        };

        if ((set_age >= 66) && (set_age <= 75)) {
            if (gender === 'male') {
            // Männer, Altersgruppe 66 - 75 | n = 121
            altersgruppe = 5;
            altersgruppe_text = "Männer, 66 - 75";
            n = 121;
            altersgruppe_found = true;
            var M_Norm = [68.24, 74.58];
            var SD_Norm = [14.99, 11.96];
            } else {
            // Frauen, Altersgruppe 66 - 75 | n = 148
            altersgruppe = 5;
            altersgruppe_text = "Frauen, 66 - 75";
            n = 148;
            altersgruppe_found = true;
            var M_Norm = [65.04, 67.22];
            var SD_Norm = [17.84, 15.00];
            };   
        };

        if ((set_age >= 76) && (set_age <= 85)) {
            if (gender === 'male') {
            // Männer, Altersgruppe 76 - 85 | n = 31
            altersgruppe = 6;
            altersgruppe_text = "Männer, 76 - 85";
            n = 31;
            altersgruppe_found = true;
            var M_Norm = [59.37, 69.01];
            var SD_Norm = [17.19, 14.51];
            } else {
            // Frauen, Altersgruppe 76 - 85 | n = 80
            altersgruppe = 6;
            altersgruppe_text = "Frauen, 76 - 85";
            n = 80;
            altersgruppe_found = true;
            var M_Norm = [60.49, 64.38];
            var SD_Norm = [14.67, 13.52];
            };   
        };

        if (set_age >= 86) {
            if (gender === 'male') {
            // Männer, Altersgruppe > 85 | n = 3
            altersgruppe = 7;
            altersgruppe_text = "Männer, ab 86";
            n = 3;
            altersgruppe_found = true;
            var M_Norm = [54.56, 50.00];
            var SD_Norm = [22.75, 16.67];
            } else {
            // Frauen, Altersgruppe > 85 | n = 9
            altersgruppe = 7;
            altersgruppe_text = "Frauen, ab 86";
            n = 9;
            altersgruppe_found = true;
            var M_Norm = [51.12, 25.14];
            var SD_Norm = [58.8, 18.45];
            };   

        };