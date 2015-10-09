function main(responses) {

    var calc = {};


    // ------------------------------------------
    // F U N C T I O N  -  Main
    // ------------------------------------------
    calc.getResults = function(myResponses) {

        var myResults = {};
        var responses_array = myResponses.survey_responses;

        responses_array.forEach(function(response, myindex) {
            var result = response.data.response;

            myResults.sum_scores = {};
            myResults.sum_scores.gaga = 1 + 2;

            var field = '';
            field = 'BSCL[sq504V06]';
            myResults.sum_scores.aggr = parseInt(result[field]) + 2;

            //myResults.sum_scores.aggr = parseInt(result[BSCL[sq504V06]]) + parseInt(result.BSCL[BSCL_sq504V13]) + parseInt(result.BSCL[BSCL_sq504V40]) + parseInt(result.BSCL[BSCL_sq504V46]) + parseInt(result.BSCL[sq504V06]);

            //    result.sum_scores.angst = parseInt(result.BSCL[BSCL_sq504V01]) + parseInt(result.BSCL[BSCL_sq504V12]) + parseInt(result.BSCL[BSCL_sq504V19]) + parseInt(result.BSCL[BSCL_sq504V38]) + parseInt(result.BSCL[BSCL_sq504V45]) + parseInt(result.BSCL[BSCL_sq504V49]);
            //    result.sum_scores.depr = parseInt(result.BSCL[BSCL_sq504V09]) + parseInt(result.BSCL[BSCL_sq504V16]) + parseInt(result.BSCL[BSCL_sq504V17]) + parseInt(result.BSCL[BSCL_sq504V18]) + parseInt(result.BSCL[BSCL_sq504V35]) + parseInt(result.BSCL[BSCL_sq504V50]);
            //    result.sum_scores.paranoid = parseInt(result.BSCL[BSCL_sq504V04]) + parseInt(result.BSCL[BSCL_sq504V10]) + parseInt(result.BSCL[BSCL_sq504V24]) + parseInt(result.BSCL[BSCL_sq504V48]) + parseInt(result.BSCL[BSCL_sq504V51]);
            //    result.sum_scores.phobisch = parseInt(result.BSCL[BSCL_sq504V08]) + parseInt(result.BSCL[BSCL_sq504V28]) + parseInt(result.BSCL[BSCL_sq504V31]) + parseInt(result.BSCL[BSCL_sq504V43]) + parseInt(result.BSCL[BSCL_sq504V47]);
            //    result.sum_scores.psychot = parseInt(result.BSCL[BSCL_sq504V03]) + parseInt(result.BSCL[BSCL_sq504V14]) + parseInt(result.BSCL[BSCL_sq504V34]) + parseInt(result.BSCL[BSCL_sq504V44]) + parseInt(result.BSCL[BSCL_sq504V53]);
            //    result.sum_scores.somat = parseInt(result.BSCL[BSCL_sq504V02]) + parseInt(result.BSCL[BSCL_sq504V23]) + parseInt(result.BSCL[BSCL_sq504V29]) + parseInt(result.BSCL[BSCL_sq504V30]) + parseInt(result.BSCL[BSCL_sq504V33]) + parseInt(result.BSCL[BSCL_sq504V37]);
            //    result.sum_scores.soz = parseInt(result.BSCL[BSCL_sq504V20]) + parseInt(result.BSCL[BSCL_sq504V21]) + parseInt(result.BSCL[BSCL_sq504V22]) + parseInt(result.BSCL[BSCL_sq504V42]);
            //    result.sum_scores.zwang = parseInt(result.BSCL[BSCL_sq504V05]) + parseInt(result.BSCL[BSCL_sq504V15]) + parseInt(result.BSCL[BSCL_sq504V26]) + parseInt(result.BSCL[BSCL_sq504V27]) + parseInt(result.BSCL[BSCL_sq504V32]) + parseInt(result.BSCL[BSCL_sq504V36]);
            //    result.sum_scores.zusatz = parseInt(result.BSCL[BSCL_sq504V11]) + parseInt(result.BSCL[BSCL_sq504V25]) + parseInt(result.BSCL[BSCL_sq504V39]) + parseInt(result.BSCL[BSCL_sq504V52]);
            //
            //    result.scale_scores = {};
            //    result.scale_scores.aggr = parseFloat(result.sum_scores.aggr / 5);
            //    result.scale_scores.angst = parseFloat(result.sum_scores.angst / 6);
            //    result.scale_scores.depr = parseFloat(result.sum_scores.depr / 6);
            //    result.scale_scores.paranoid = parseFloat(result.sum_scores.paranoid / 5);
            //    result.scale_scores.phobisch = parseFloat(result.sum_scores.phobisch / 5);
            //    result.scale_scores.psychot = parseFloat(result.sum_scores.psychot / 5);
            //    result.scale_scores.somat = parseFloat(result.sum_scores.somat / 7);
            //    result.scale_scores.soz = parseFloat(result.sum_scores.soz / 4);
            //    result.scale_scores.zwang = parseFloat(result.sum_scores.zwang / 6);
            //    result.scale_scores.zusatz = parseFloat(result.sum_scores.zusatz / 4);
            //
            //    result.sum_scores.gsi =
            //        result.sum_scores.aggr +
            //        result.sum_scores.angst +
            //        result.sum_scores.depr +
            //        result.sum_scores.paranoid +
            //        result.sum_scores.phobisch +
            //        result.sum_scores.psychot +
            //        result.sum_scores.somat +
            //        result.sum_scores.soz +
            //        result.sum_scores.zwang +
            //        result.sum_scores.zusatz
            //
            //    result.scale_scores.gsi = parseFloat(result.sum_scores.gsi / 53);
            //    console.log('LOOP: ', result);
            //
        });
        //
        //myResults.result_responses = responses_array;

        return myResults;
    };


    // Return
    return {
        "results": calc.getResults(responses),
        "responses": responses
    };
};
