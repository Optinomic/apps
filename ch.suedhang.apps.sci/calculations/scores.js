function main(responses) {
    var calc = {};

    // ------------------------------------------
    // H e l p e r   -   F U N C T I O N S
    // ------------------------------------------

    calc.getScores = function(response) {
        var scores_obj = {};

        // Scores berechnen
        scores_obj.belastung = 0;
        scores_obj.belastung = scores_obj.belastung + parseInt(response.ESCIBelastung[ESCIB1]);
        scores_obj.belastung = scores_obj.belastung + parseInt(response.ESCIBelastung[ESCIB2]);
        scores_obj.belastung = scores_obj.belastung + parseInt(response.ESCIBelastung[ESCIB3]);
        scores_obj.belastung = scores_obj.belastung + parseInt(response.ESCIBelastung[ESCIB4]);
        scores_obj.belastung = scores_obj.belastung + parseInt(response.ESCIBelastung[ESCIB5]);
        scores_obj.belastung = scores_obj.belastung + parseInt(response.ESCIBelastung[ESCIB6]);
        scores_obj.belastung = scores_obj.belastung + parseInt(response.ESCIBelastung[ESCIB7]);

        scores_obj.stress = 0;
        scores_obj.stress = scores_obj.stress + parseInt(response.ESCISymptome[ESCIS1]);
        scores_obj.stress = scores_obj.stress + parseInt(response.ESCISymptome[ESCIS2]);
        scores_obj.stress = scores_obj.stress + parseInt(response.ESCISymptome[ESCIS3]);
        scores_obj.stress = scores_obj.stress + parseInt(response.ESCISymptome[ESCIS4]);
        scores_obj.stress = scores_obj.stress + parseInt(response.ESCISymptome[ESCIS5]);
        scores_obj.stress = scores_obj.stress + parseInt(response.ESCISymptome[ESCIS6]);
        scores_obj.stress = scores_obj.stress + parseInt(response.ESCISymptome[ESCIS7]);
        scores_obj.stress = scores_obj.stress + parseInt(response.ESCISymptome[ESCIS8]);
        scores_obj.stress = scores_obj.stress + parseInt(response.ESCISymptome[ESCIS9]);
        scores_obj.stress = scores_obj.stress + parseInt(response.ESCISymptome[ESCIS10]);
        scores_obj.stress = scores_obj.stress + parseInt(response.ESCISymptome[ESCIS11]);
        scores_obj.stress = scores_obj.stress + parseInt(response.ESCISymptome[ESCIS12]);
        scores_obj.stress = scores_obj.stress + parseInt(response.ESCISymptome[ESCIS13]);

        scores_obj.coping_pos = 0;
        scores_obj.coping_pos = scores_obj.coping_pos + parseInt(response.ESCICoping[ESCIC1]);
        scores_obj.coping_pos = scores_obj.coping_pos + parseInt(response.ESCICoping[ESCIC5]);
        scores_obj.coping_pos = scores_obj.coping_pos + parseInt(response.ESCICoping[ESCIC6]);
        scores_obj.coping_pos = scores_obj.coping_pos + parseInt(response.ESCICoping[ESCIC16]);

        scores_obj.coping_ab = 0;
        scores_obj.coping_ab = scores_obj.coping_ab + parseInt(response.ESCICoping[ESCIC3]);
        scores_obj.coping_ab = scores_obj.coping_ab + parseInt(response.ESCICoping[ESCIC7]);
        scores_obj.coping_ab = scores_obj.coping_ab + parseInt(response.ESCICoping[ESCIC12]);
        scores_obj.coping_ab = scores_obj.coping_ab + parseInt(response.ESCICoping[ESCIC17]);

        scores_obj.coping_su = 0;
        scores_obj.coping_su = scores_obj.coping_su + parseInt(response.ESCICoping[ESCIC4]);
        scores_obj.coping_su = scores_obj.coping_su + parseInt(response.ESCICoping[ESCIC13]);
        scores_obj.coping_su = scores_obj.coping_su + parseInt(response.ESCICoping[ESCIC15]);
        scores_obj.coping_su = scores_obj.coping_su + parseInt(response.ESCICoping[ESCIC19]);

        scores_obj.coping_rel = 0;
        scores_obj.coping_rel = scores_obj.coping_rel + parseInt(response.ESCICoping[ESCIC8]);
        scores_obj.coping_rel = scores_obj.coping_rel + parseInt(response.ESCICoping[ESCIC90]);
        scores_obj.coping_rel = scores_obj.coping_rel + parseInt(response.ESCICoping[ESCIC10]);
        scores_obj.coping_rel = scores_obj.coping_rel + parseInt(response.ESCICoping[ESCIC18]);

        scores_obj.coping_alk = 0;
        scores_obj.coping_alk = scores_obj.coping_alk + parseInt(response.ESCICoping[ESCIC8]);
        scores_obj.coping_alk = scores_obj.coping_alk + (5 - parseInt(response.ESCICoping[ESCIC2]));
        scores_obj.coping_alk = scores_obj.coping_alk + parseInt(response.ESCICoping[ESCIC11]);
        scores_obj.coping_alk = scores_obj.coping_alk + parseInt(response.ESCICoping[ESCIC14]);
        scores_obj.coping_alk = scores_obj.coping_alk + parseInt(response.ESCICoping[ESCIC20]);


        return scores_obj;

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
            myResults.scores = calc.getScores(result);


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
