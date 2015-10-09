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
            myResults.sum_scores.aggr = parseInt(result['BSCL[sq504V06]']) + parseInt(result['BSCL[sq504V13]']) + parseInt(result['BSCL[sq504V40]']) + parseInt(result['BSCL[sq504V41]']) + parseInt(result['BSCL[sq504V46]']);


            myResults.sum_scores.angst = parseInt(result['BSCL[sq504V01]']) + parseInt(result['BSCL[sq504V12]']) + parseInt(result['BSCL[sq504V19]']) + parseInt(result['BSCL[sq504V38]']) + parseInt(result['BSCL[sq504V45']) + parseInt(result['BSCL[sq504V49']);
            myResults.sum_scores.depr = parseInt(result['BSCL[sq504V09]']) + parseInt(result['BSCL[sq504V16]']) + parseInt(result['BSCL[sq504V17]']) + parseInt(result['BSCL[sq504V18]']) + parseInt(result['BSCL[sq504V35]']) + parseInt(result['BSCL[sq504V50]']);
            myResults.sum_scores.paranoid = parseInt(result['BSCL[sq504V04]']) + parseInt(result['BSCL[sq504V10]']) + parseInt(result['BSCL[sq504V24]']) + parseInt(result['BSCL[sq504V48]']) + parseInt(result['BSCL[sq504V51]']);
            myResults.sum_scores.phobisch = parseInt(result['BSCL[sq504V08]']) + parseInt(result['BSCL[sq504V28]']) + parseInt(result['BSCL[sq504V31]']) + parseInt(result['BSCL[sq504V43]']) + parseInt(result['BSCL[sq504V47]']);
            myResults.sum_scores.psychot = parseInt(result['BSCL[sq504V03]']) + parseInt(result['BSCL[sq504V14]']) + parseInt(result['BSCL[sq504V34]']) + parseInt(result['BSCL[sq504V44]']) + parseInt(result['BSCL[sq504V53]']);
            myResults.sum_scores.somat = parseInt(result['BSCL[sq504V02]']) + parseInt(result['BSCL[sq504V23]']) + parseInt(result['BSCL[sq504V29]']) + parseInt(result['BSCL[sq504V30]']) + parseInt(result['BSCL[sq504V33]']) + parseInt(result['BSCL[sq504V37]']);
            myResults.sum_scores.soz = parseInt(result['BSCL[sq504V20]']) + parseInt(result['BSCL[sq504V21]']) + parseInt(result['BSCL[sq504V22]']) + parseInt(result['BSCL[sq504V42]']);
            myResults.sum_scores.zwang = parseInt(result['BSCL[sq504V05]']) + parseInt(result['BSCL[sq504V15]']) + parseInt(result['BSCL[sq504V26]']) + parseInt(result['BSCL[sq504V27]']) + parseInt(result['BSCL[sq504V32]']) + parseInt(result['BSCL[sq504V36]']);
            myResults.sum_scores.zusatz = parseInt(result['BSCL[sq504V11]']) + parseInt(result['BSCL[sq504V25]']) + parseInt(result['BSCL[sq504V39]']) + parseInt(result['BSCL[sq504V52]']);

            myResults.scale_scores = {};
            myResults.scale_scores.aggr = parseFloat(result.sum_scores.aggr / 5);
            myResults.scale_scores.angst = parseFloat(result.sum_scores.angst / 6);
            myResults.scale_scores.depr = parseFloat(result.sum_scores.depr / 6);
            myResults.scale_scores.paranoid = parseFloat(result.sum_scores.paranoid / 5);
            myResults.scale_scores.phobisch = parseFloat(result.sum_scores.phobisch / 5);
            myResults.scale_scores.psychot = parseFloat(result.sum_scores.psychot / 5);
            myResults.scale_scores.somat = parseFloat(result.sum_scores.somat / 7);
            myResults.scale_scores.soz = parseFloat(result.sum_scores.soz / 4);
            myResults.scale_scores.zwang = parseFloat(result.sum_scores.zwang / 6);
            myResults.scale_scores.zusatz = parseFloat(result.sum_scores.zusatz / 4);

            myResults.sum_scores.gsi =
                myResults.sum_scores.aggr +
                myResults.sum_scores.angst +
                myResults.sum_scores.depr +
                myResults.sum_scores.paranoid +
                myResults.sum_scores.phobisch +
                myResults.sum_scores.psychot +
                myResults.sum_scores.somat +
                myResults.sum_scores.soz +
                myResults.sum_scores.zwang +
                myResults.sum_scores.zusatz

            myResults.scale_scores.gsi = parseFloat(myResults.sum_scores.gsi / 53);

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
