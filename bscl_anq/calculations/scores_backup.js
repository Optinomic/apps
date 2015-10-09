function main(responses) {

    var myResults = {};
    var responses_array = myResponses.survey_responses;

    responses_array.forEach(function(response, myindex) {

        var result = response.data.response;

        var result.sum_scores = {};
        result.sum_scores.aggr = parseInt(BSCL[sq504V06]) + parseInt(BSCL[BSCL_sq504V13]) + parseInt(BSCL[BSCL_sq504V40]) + parseInt(BSCL[BSCL_sq504V46]) + parseInt(BSCL[sq504V06]);
        result.sum_scores.angst = parseInt(BSCL[BSCL_sq504V01]) + parseInt(BSCL[BSCL_sq504V12]) + parseInt(BSCL[BSCL_sq504V19]) + parseInt(BSCL[BSCL_sq504V38]) + parseInt(BSCL[BSCL_sq504V45]) + parseInt(BSCL[BSCL_sq504V49]);
        result.sum_scores.depr = parseInt(BSCL[BSCL_sq504V09]) + parseInt(BSCL[BSCL_sq504V16]) + parseInt(BSCL[BSCL_sq504V17]) + parseInt(BSCL[BSCL_sq504V18]) + parseInt(BSCL[BSCL_sq504V35]) + parseInt(BSCL[BSCL_sq504V50]);
        result.sum_scores.paranoid = parseInt(BSCL[BSCL_sq504V04]) + parseInt(BSCL[BSCL_sq504V10]) + parseInt(BSCL[BSCL_sq504V24]) + parseInt(BSCL[BSCL_sq504V48]) + parseInt(BSCL[BSCL_sq504V51]);
        result.sum_scores.phobisch = parseInt(BSCL[BSCL_sq504V08]) + parseInt(BSCL[BSCL_sq504V28]) + parseInt(BSCL[BSCL_sq504V31]) + parseInt(BSCL[BSCL_sq504V43]) + parseInt(BSCL[BSCL_sq504V47]);
        result.sum_scores.psychot = parseInt(BSCL[BSCL_sq504V03]) + parseInt(BSCL[BSCL_sq504V14]) + parseInt(BSCL[BSCL_sq504V34]) + parseInt(BSCL[BSCL_sq504V44]) + parseInt(BSCL[BSCL_sq504V53]);
        result.sum_scores.somat = parseInt(BSCL[BSCL_sq504V02]) + parseInt(BSCL[BSCL_sq504V23]) + parseInt(BSCL[BSCL_sq504V29]) + parseInt(BSCL[BSCL_sq504V30]) + parseInt(BSCL[BSCL_sq504V33]) + parseInt(BSCL[BSCL_sq504V37]);
        result.sum_scores.soz = parseInt(BSCL[BSCL_sq504V20]) + parseInt(BSCL[BSCL_sq504V21]) + parseInt(BSCL[BSCL_sq504V22]) + parseInt(BSCL[BSCL_sq504V42]);
        result.sum_scores.zwang = parseInt(BSCL[BSCL_sq504V05]) + parseInt(BSCL[BSCL_sq504V15]) + parseInt(BSCL[BSCL_sq504V26]) + parseInt(BSCL[BSCL_sq504V27]) + parseInt(BSCL[BSCL_sq504V32]) + parseInt(BSCL[BSCL_sq504V36]);
        result.sum_scores.zusatz = parseInt(BSCL[BSCL_sq504V11]) + parseInt(BSCL[BSCL_sq504V25]) + parseInt(BSCL[BSCL_sq504V39]) + parseInt(BSCL[BSCL_sq504V52]);


        var result.scale_scores = {};
        result.scale_scores.aggr = parseFloat(result.sum_scores.aggr / 5);
        result.scale_scores.angst = parseFloat(result.sum_scores.angst / 6);
        result.scale_scores.depr = parseFloat(result.sum_scores.depr / 6);
        result.scale_scores.paranoid = parseFloat(result.sum_scores.paranoid / 5);
        result.scale_scores.phobisch = parseFloat(result.sum_scores.phobisch / 5);
        result.scale_scores.psychot = parseFloat(result.sum_scores.psychot / 5);
        result.scale_scores.somat = parseFloat(result.sum_scores.somat / 7);
        result.scale_scores.soz = parseFloat(result.sum_scores.soz / 4);
        result.scale_scores.zwang = parseFloat(result.sum_scores.zwang / 6);
        result.scale_scores.zusatz = parseFloat(result.sum_scores.zusatz / 4);


        result.sum_scores.gsi =
            result.sum_scores.aggr +
            result.sum_scores.angst +
            result.sum_scores.depr +
            result.sum_scores.paranoid +
            result.sum_scores.phobisch +
            result.sum_scores.psychot +
            result.sum_scores.somat +
            result.sum_scores.soz +
            result.sum_scores.zwang +
            result.sum_scores.zusatz

        result.scale_scores.gsi = parseFloat(result.sum_scores.gsi / 53);

    });

    myResults.result_responses = responses_array;


    // Return
    return {
        "results": myResults,
        "responses": responses
    };
};
