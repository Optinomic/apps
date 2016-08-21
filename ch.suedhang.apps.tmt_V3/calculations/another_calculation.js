function main(responses) {
    var calc = {};

    // ------------------------------------------
    // H e l p e r   -   F U N C T I O N S
    // ------------------------------------------


    calc.roundToTwo = function(num) {
        // Round a Number to 0.X 
        return +(Math.round(num + "e+2") + "e-2");
    };

    calc.quotient = function(d) {
        var TMTBTime = parseInt(d['TMTATime']);
        var TMTATime = parseInt(d['TMTBTime']);
        var result = TMTBTime / TMTATime;

        return result;
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


    calc.get_percentile = function(d, scale, set_age, edu_years, time, error) {
        var altersgruppe = 0;
        var education = 0;

        // Kategorienbildung Education: <= 12 Jahre: 0; > 12 Jahre: 1
        if (edu_years > 12) {
            education = 1;
        } else {
            education = 0;
        }

        // Altersgruppe & Normwerte Trail Making Test  A und B
        if (set_age < 25) {
            // Altersgruppe 18 - 24 | n = 155
            altersgruppe = 0;
            education = 0;
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
        if ((set_age >= 25) && (set_age <= 34)) {
            // Altersgruppe 25 – 34 | n = 33
            altersgruppe = 1;
            education = 0;
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
        if ((set_age >= 35) && (set_age <= 44)) {
            // Altersgruppe 35 – 44 | n = 39
            altersgruppe = 2;
            education = 0;
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
        if ((set_age >= 45) && (set_age <= 54)) {
            // Altersgruppe 45 – 54 | n = 41
            altersgruppe = 3;
            education = 0;
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
        if ((set_age >= 55) && (set_age <= 59)) {
            // Altersgruppe 55 – 59 | n = 58
            altersgruppe = 4;
            education = 0
            var perz90 = [25, 56];
            var perz80 = [27, 64];
            var perz70 = [29, 66];
            var perz60 = [31, 71];
            var perz50 = [32, 74];
            var perz40 = [34, 81];
            var perz30 = [38, 87];
            var perz20 = [40, 98];
            var perz10 = [50, 105];
        }
        if ((set_age >= 55) && (set_age <= 59)) {
            // Altersgruppe 55 – 59 | n = 37
            altersgruppe = 4;
            education = 1
            var perz90 = [22, 42];
            var perz80 = [24, 56];
            var perz70 = [25, 57];
            var perz60 = [26, 61];
            var perz50 = [30, 65];
            var perz40 = [32, 71];
            var perz30 = [33, 74];
            var perz20 = [37, 81];
            var perz10 = [53, 102];
        }
        if ((set_age >= 60) && (set_age <= 64)) {
            // Altersgruppe 60 – 64 | n = 55
            altersgruppe = 5;
            education = 0
            var perz90 = [21, 56];
            var perz80 = [24, 58];
            var perz70 = [26, 62];
            var perz60 = [30, 67];
            var perz50 = [33, 72];
            var perz40 = [37, 75];
            var perz30 = [40, 79];
            var perz20 = [43, 92];
            var perz10 = [45, 96];
        }
        if ((set_age >= 60) && (set_age <= 64)) {
            // Altersgruppe 60 – 64 | n = 31
            altersgruppe = 5;
            education = 1
            var perz90 = [22, 45];
            var perz80 = [25, 48];
            var perz70 = [26, 53];
            var perz60 = [27, 59];
            var perz50 = [31, 60];
            var perz40 = [33, 66];
            var perz30 = [35, 71];
            var perz20 = [37, 77];
            var perz10 = [43, 87];
        }
        if ((set_age >= 65) && (set_age <= 69)) {
            // Altersgruppe 65 – 69 | n = 65
            altersgruppe = 6;
            education = 0
            var perz90 = [24, 60];
            var perz80 = [30, 71];
            var perz70 = [32, 74];
            var perz60 = [36, 81];
            var perz50 = [39, 86];
            var perz40 = [40, 93];
            var perz30 = [44, 103];
            var perz20 = [47, 110];
            var perz10 = [56, 137];
        }
        if ((set_age >= 65) && (set_age <= 69)) {
            // Altersgruppe 65 – 69 | n = 32
            altersgruppe = 6;
            education = 1
            var perz90 = [26, 52];
            var perz80 = [28, 57];
            var perz70 = [30, 63];
            var perz60 = [31, 67];
            var perz50 = [32, 68];
            var perz40 = [34, 71];
            var perz30 = [39, 73];
            var perz20 = [40, 75];
            var perz10 = [45, 77];
        }
        if ((set_age >= 70) && (set_age <= 74)) {
            // Altersgruppe 70 – 74 | n = 76
            altersgruppe = 7;
            education = 0
            var perz90 = [25, 70];
            var perz80 = [30, 79];
            var perz70 = [35, 83];
            var perz60 = [37, 95];
            var perz50 = [38, 101];
            var perz40 = [42, 112];
            var perz30 = [46, 124];
            var perz20 = [52, 146];
            var perz10 = [57, 172];
        }
        if ((set_age >= 70) && (set_age <= 74)) {
            // Altersgruppe 70 – 74 | n = 30
            altersgruppe = 7;
            education = 1
            var perz90 = [26, 59];
            var perz80 = [29, 63];
            var perz70 = [31, 68];
            var perz60 = [33, 80];
            var perz50 = [36, 84];
            var perz40 = [41, 85];
            var perz30 = [42, 103];
            var perz20 = [46, 109];
            var perz10 = [71, 112];
        }
        if ((set_age >= 75) && (set_age <= 79)) {
            // Altersgruppe 75 – 79 | n = 74
            altersgruppe = 8;
            education = 0
            var perz90 = [30, 78];
            var perz80 = [37, 92];
            var perz70 = [39, 96];
            var perz60 = [45, 107];
            var perz50 = [50, 120];
            var perz40 = [53, 140];
            var perz30 = [56, 156];
            var perz20 = [61, 167];
            var perz10 = [72, 189];
        }
        if ((set_age >= 75) && (set_age <= 79)) {
            // Altersgruppe 75 – 79 | n = 34
            altersgruppe = 8;
            education = 1
            var perz90 = [22, 57];
            var perz80 = [27, 59];
            var perz70 = [34, 66];
            var perz60 = [37, 73];
            var perz50 = [40, 87];
            var perz40 = [43, 105];
            var perz30 = [46, 126];
            var perz20 = [58, 141];
            var perz10 = [66, 178];
        }
        if ((set_age >= 80) && (set_age <= 84)) {
            // Altersgruppe 80 – 84 | n = 84
            altersgruppe = 9;
            education = 0
            var perz90 = [31, 72];
            var perz80 = [39, 101];
            var perz70 = [43, 112];
            var perz60 = [49, 119];
            var perz50 = [53, 140];
            var perz40 = [59, 154];
            var perz30 = [66, 176];
            var perz20 = [78, 204];
            var perz10 = [90, 259];
        }
        if ((set_age >= 80) && (set_age <= 84)) {
            // Altersgruppe 80 – 84 | n = 34
            altersgruppe = 9;
            education = 1
            var perz90 = [37, 89];
            var perz80 = [38, 100];
            var perz70 = [41, 111];
            var perz60 = [46, 113];
            var perz50 = [48, 128];
            var perz40 = [56, 131];
            var perz30 = [58, 139];
            var perz20 = [64, 151];
            var perz10 = [101, 227];
        }
        if ((set_age >= 85) && (set_age <= 89)) {
            // Altersgruppe 85 – 89 | n = 16
            altersgruppe = 10;
            education = 0
            var perz90 = [37, 89];
            var perz80 = [39, 95];
            var perz70 = [43, 112];
            var perz60 = [47, 132];
            var perz50 = [55, 143];
            var perz40 = [56, 188];
            var perz30 = [63, 194];
            var perz20 = [72, 214];
            var perz10 = [94, 317];
        }
        if ((set_age >= 85) && (set_age <= 89)) {
            // Altersgruppe 85 – 89 | n = 13
            altersgruppe = 10;
            education = 1
            var perz90 = [35, 70];
            var perz80 = [42, 81];
            var perz70 = [49, 87];
            var perz60 = [52, 90];
            var perz50 = [53, 121];
            var perz40 = [60, 143];
            var perz30 = [67, 156];
            var perz20 = [87, 212];
            var perz10 = [125, 290];
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

    // ------------------------------------------
    // F U N C T I O N  -  Main
    // ------------------------------------------
    calc.getResults = function(d) {

        var responses_array = d.survey_responses;
        var allResults = [];

        responses_array.forEach(function(response, myindex) {
            var myResults = {};
            var result = response.data.response;

            // Age
            myResults.birthdate = d.patient.data.birthdate
            myResults.set_age = calc.getPatientAge(d.patient.data.birthdate);


            // Zeit & Fehler in Integer
            myResults.TMTAError = parseInt(result.TMTAError);
            myResults.TMTBError = parseInt(result.TMTBError);
            myResults.TMTATime = parseInt(result.TMTATime);
            myResults.TMTBTime = parseInt(result.TMTBTime);
            //
            //
            //// calculate stuff
            //
            //myResults.edu_years = calc.roundToTwo(response.data.response.Ausbildungsjahre);
            //myResults.quotient = calc.quotient(result);
            //myResults.results = calc.get_percentile(result, scale, set_age, edu_years, time, error);


            // Write Results for the Return
            // Do not modify stuff here
            myResults.hash = result['optinomixHASH'];
            myResults.response = response;
            myResults.d = d;

            allResults.push(myResults);
        });

        return allResults;
    };


    // Return
    return calc.getResults(responses);
}
