function main(responses) {
    var calc = {};

    // ------------------------------------------
    // H e l p e r   -   F U N C T I O N S
    // ------------------------------------------



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


    // ------------------------------------------
    // F U N C T I O N  -  Main
    // ------------------------------------------
    calc.getResults = function(myResponses) {

        var responses_array = myResponses.survey_responses;
        var allResults = [];



        responses_array.forEach(function(response, myindex) {
            var myResults = {};
            var result = response.data.response;

            // Calculate Stuff


            var soz_orient = 0;
            soz_orient = soz_orient + parseInt(result['AISK[AIS1]']);
            soz_orient = soz_orient + parseInt(result['AISK[AIS5]']);
            soz_orient = soz_orient + parseInt(result['AISK[AIS9]']);
            soz_orient = soz_orient + parseInt(result['AISK[AIS11]']);
            soz_orient = soz_orient + parseInt(result['AISK[AIS14]']);
            soz_orient = soz_orient + parseInt(result['AISK[AIS18]']);
            soz_orient = soz_orient + parseInt(result['AISK[AIS21]']);
            soz_orient = soz_orient + parseInt(result['AISK[AIS23]']);
            soz_orient = soz_orient + parseInt(result['AISK[AIS27]']);
            soz_orient = soz_orient + parseInt(result['AISK[AIS31]']);
            myResults.sumscore_soz_orient = soz_orient;


            var offensiv = 0;
            offensiv = offensiv + parseInt(result['AISK[AIS2]']);
            offensiv = offensiv + parseInt(result['AISK[AIS6]']);
            offensiv = offensiv + parseInt(5 - result['AISK[AIS10]']);
            offensiv = offensiv + parseInt(result['AISK[AIS15]']);
            offensiv = offensiv + parseInt(result['AISK[AIS19]']);
            offensiv = offensiv + parseInt(result['AISK[AIS24]']);
            offensiv = offensiv + parseInt(result['AISK[AIS28]']);
            offensiv = offensiv + parseInt(5 - result['AISK[AIS32]']);
            myResults.sumscore_offensiv = offensiv;









            // Unneeded - Just for DEBUG
            myResults.full_data = myResponses;

            // Write Results for the Return
            // Do not modify stuff down here
            myResults.hash = result['optinomixHASH'];
            myResults.response = response;
            allResults.push(myResults);
        });

        return allResults;
    };


    // Return
    return calc.getResults(responses);
}
