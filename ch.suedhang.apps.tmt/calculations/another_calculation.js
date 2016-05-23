function main(responses) {
    var calc = {};

    // ------------------------------------------
    // H e l p e r   -   F U N C T I O N S
    // ------------------------------------------

    calc.doSomething = function() {
        var score = 73;
        return score;
    };


    calc.quotient = function(A, B){
        var quotient = 2; //{{TMTBTime}} /{{TMTATime}};
        return quotient;
    };

    calc.getPatientAge = function(birth_date) {
        if (birth_date !== null) {
            var today = new Date();
            var birthDate = new Date(birth_date);
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            };
        } else {
            var age = 1;
        };

        return age;
    };

    calc.get_percentile = function(scale, set_age, time, error) {
        var altersgruppe = 0;

        // Altersgruppe & Normwerte Trail Making Test  A und B
        if (set_age < 25) {
            // bis 24
            altersgruppe = 0;
            var perz90 = [16, 35];
            var perz80 = [17, 38];
            var perz70 = [19, 41];
            var perz60 = [20, 44];
            var perz50 = [22, 47];
            var perz40 = [23, 49];
            var perz30 = [25, 54];
            var perz20 = [27, 61];
            var perz10 = [31, 66];
        }
        if ((set_age >= 25) || (set_age <= 34)) {
            // Altersgruppe 25 - 34
            altersgruppe = 1;
            var perz90 = [14, 33];
            var perz80 = [17, 38];
            var perz70 = [19, 45];
            var perz60 = [21, 48];
            var perz50 = [23, 50];
            var perz40 = [25, 53];
            var perz30 = [27, 58];
            var perz20 = [33, 63];
            var perz10 = [40, 67];
        }
        if ((set_age = 35) || (set_age <= 44)) {
            // Altersgruppe 35 - 44
            altersgruppe = 2;
            var perz90 = [16, 40];
            var perz80 = [20, 45];
            var perz70 = [23, 50];
            var perz60 = [24, 53];
            var perz50 = [26, 58];
            var perz40 = [28, 60];
            var perz30 = [32, 62];
            var perz20 = [36, 70];
            var perz10 = [46, 87];
        }
        if ((set_age >= 45) || (set_age <= 50)) {
            // Altersgruppe 45 - 50 (reso. 54?)
            altersgruppe = 3;
            var perz90 = [19, 42];
            var perz80 = [23, 50];
            var perz70 = [27, 59];
            var perz60 = [29, 62];
            var perz50 = [31, 64];
            var perz40 = [33, 68];
            var perz30 = [34, 72];
            var perz20 = [38, 75];
            var perz10 = [50, 84];
        }
        // A oder B
        if (scale === 'A') {
            // TMT - A
            var perz_pos = 0;
        } else {
            // TMT - B
            var perz_pos = 1;
        }


        // Perzentile bestimmen
        var result = 90;
        if (time >= perz80[perz_pos]) {
            result = 80;
        }
        if (time >= perz70[perz_pos]) {
            result = 70;
        }
        if (time >= perz60[perz_pos]) {
            result = 60;
        }
        if (time >= perz50[perz_pos]) {
            result = 50;
        }
        if (time >= perz40[perz_pos]) {
            result = 40;
        }
        if (time >= perz30[perz_pos]) {
            result = 30;
        }
        if (time >= perz20[perz_pos]) {
            result = 20;
        }
        if (time >= perz10[perz_pos]) {
            result = 10;
        }


        return result;
    }



     {
 





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
            allResults.push(myResults);
        });

        return allResults;
    };


    // Return
    return calc.getResults(responses);
}
