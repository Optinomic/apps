function main(responses) {

    var calc = {};

    // ------------------------------------------
    // H e l p e r   -   F U N C T I O N S
    // ------------------------------------------


    calc.getNumItems = function(result) {

        var items = 0;


        if ("NeuroAnamEin_SQ001" in result) {
            // V1-Daten Version ebenfalls unterstützen
            // Diese haben wir bei der Migration V1->V2 nicht angefasst.

            if (parseInt(result.Erhebungszeitpunkt) === 1) {
                items = items + parseInt(result['NeuroAnamEin_SQ001']);
                items = items + parseInt(result['NeuroAnamEin_SQ002']);
                items = items + parseInt(result['NeuroAnamEin_SQ003']);
                items = items + parseInt(result['NeuroAnamEin_SQ004']);
                items = items + parseInt(result['NeuroAnamEin_SQ005']);
                items = items + parseInt(result['NeuroAnamEin_SQ006']);
                items = items + parseInt(result['NeuroAnamEin_SQ007']);
                items = items + parseInt(result['NeuroAnamEin_SQ008']);
                items = items + parseInt(result['NeuroAnamEin_SQ009']);
                items = items + parseInt(result['NeuroAnamEin_SQ010']);
                items = items + parseInt(result['NeuroAnamEin_SQ011']);
                items = items + parseInt(result['NeuroAnamEin_SQ013']);
            } else {
                items = items + parseInt(result['NeuroAnamAus_SQ001']);
                items = items + parseInt(result['NeuroAnamAus_SQ002']);
                items = items + parseInt(result['NeuroAnamAus_SQ003']);
                items = items + parseInt(result['NeuroAnamAus_SQ006']);
                items = items + parseInt(result['NeuroAnamAus_SQ007']);
                items = items + parseInt(result['NeuroAnamAus_SQ008']);
                items = items + parseInt(result['NeuroAnamAus_SQ009']);
                items = items + parseInt(result['NeuroAnamAus_SQ010']);
                items = items + parseInt(result['NeuroAnamAus_SQ011']);
                items = items + parseInt(result['NeuroAnamAus_SQ012']);
            };
        } else {
            //V2-Daten Version
            if (parseInt(result.Erhebungszeitpunkt) === 1) {
                items = items + parseInt(result['NeuroAnamEin[SQ001]']);
                items = items + parseInt(result['NeuroAnamEin[SQ002]']);
                items = items + parseInt(result['NeuroAnamEin[SQ003]']);
                items = items + parseInt(result['NeuroAnamEin[SQ004]']);
                items = items + parseInt(result['NeuroAnamEin[SQ005]']);
                items = items + parseInt(result['NeuroAnamEin[SQ006]']);
                items = items + parseInt(result['NeuroAnamEin[SQ007]']);
                items = items + parseInt(result['NeuroAnamEin[SQ008]']);
                items = items + parseInt(result['NeuroAnamEin[SQ009]']);
                items = items + parseInt(result['NeuroAnamEin[SQ010]']);
                items = items + parseInt(result['NeuroAnamEin[SQ011]']);
                items = items + parseInt(result['NeuroAnamEin[SQ012]']);
            } else {
                items = items + parseInt(result['NeuroAnamAus[SQ001]']);
                items = items + parseInt(result['NeuroAnamAus[SQ002]']);
                items = items + parseInt(result['NeuroAnamAus[SQ003]']);
                items = items + parseInt(result['NeuroAnamAus[SQ007]']);
                items = items + parseInt(result['NeuroAnamAus[SQ008]']);
                items = items + parseInt(result['NeuroAnamAus[SQ009]']);
                items = items + parseInt(result['NeuroAnamAus[SQ010]']);
                items = items + parseInt(result['NeuroAnamAus[SQ011]']);
                items = items + parseInt(result['NeuroAnamAus[SQ012]']);
                items = items + parseInt(result['NeuroAnamAus[SQ013]']);
            };

        }



        return items;
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

            // Something
            myResults.items = calc.getNumItems(result);
            myResults.mz = parseInt(result.Erhebungszeitpunkt);


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
