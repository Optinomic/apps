function main(responses) {
    var calc = {};

    // ------------------------------------------
    // H e l p e r   -   F U N C T I O N S
    // ------------------------------------------

    calc.getScores = function() {
        var scores_obj = {};

        // Scores berechnen
        scores_obj.belastung = 0;
        scores_obj.belastung = scores_obj.belastung + parseInt(ESCIBelastung[ESCIB1]);
        scores_obj.belastung = scores_obj.belastung + parseInt(ESCIBelastung[ESCIB2]);
        scores_obj.belastung = scores_obj.belastung + parseInt(ESCIBelastung[ESCIB3]);
        scores_obj.belastung = scores_obj.belastung + parseInt(ESCIBelastung[ESCIB4]);
        scores_obj.belastung = scores_obj.belastung + parseInt(ESCIBelastung[ESCIB5]);
        scores_obj.belastung = scores_obj.belastung + parseInt(ESCIBelastung[ESCIB6]);
        scores_obj.belastung = scores_obj.belastung + parseInt(ESCIBelastung[ESCIB7]);

        scores_obj.stress = 0;
        scores_obj.stress = scores_obj.stress + parseInt(ESCISymptome[ESCIS1]);
        scores_obj.stress = scores_obj.stress + parseInt(ESCISymptome[ESCIS2]);
        scores_obj.stress = scores_obj.stress + parseInt(ESCISymptome[ESCIS3]);
        scores_obj.stress = scores_obj.stress + parseInt(ESCISymptome[ESCIS4]);
        scores_obj.stress = scores_obj.stress + parseInt(ESCISymptome[ESCIS5]);
        scores_obj.stress = scores_obj.stress + parseInt(ESCISymptome[ESCIS6]);
        scores_obj.stress = scores_obj.stress + parseInt(ESCISymptome[ESCIS7]);
        scores_obj.stress = scores_obj.stress + parseInt(ESCISymptome[ESCIS8]);
        scores_obj.stress = scores_obj.stress + parseInt(ESCISymptome[ESCIS9]);
        scores_obj.stress = scores_obj.stress + parseInt(ESCISymptome[ESCIS10]);
        scores_obj.stress = scores_obj.stress + parseInt(ESCISymptome[ESCIS11]);
        scores_obj.stress = scores_obj.stress + parseInt(ESCISymptome[ESCIS12]);
        scores_obj.stress = scores_obj.stress + parseInt(ESCISymptome[ESCIS13]);

        scores_obj.coping_pos = 0;
        scores_obj.coping_pos = scores_obj.coping_pos + parseInt(ESCICoping[ESCIC1]);
        scores_obj.coping_pos = scores_obj.coping_pos + parseInt(ESCICoping[ESCIC5]);
        scores_obj.coping_pos = scores_obj.coping_pos + parseInt(ESCICoping[ESCIC6]);
        scores_obj.coping_pos = scores_obj.coping_pos + parseInt(ESCICoping[ESCIC16]);

        scores_obj.coping_ab = 0;
        scores_obj.coping_ab = scores_obj.coping_ab + parseInt(ESCICoping[ESCIC3]);
        scores_obj.coping_ab = scores_obj.coping_ab + parseInt(ESCICoping[ESCIC7]);
        scores_obj.coping_ab = scores_obj.coping_ab + parseInt(ESCICoping[ESCIC12]);
        scores_obj.coping_ab = scores_obj.coping_ab + parseInt(ESCICoping[ESCIC17]);

        scores_obj.coping_su = 0;
        scores_obj.coping_su = scores_obj.coping_su + parseInt(ESCICoping[ESCIC4]);
        scores_obj.coping_su = scores_obj.coping_su + parseInt(ESCICoping[ESCIC13]);
        scores_obj.coping_su = scores_obj.coping_su + parseInt(ESCICoping[ESCIC15]);
        scores_obj.coping_su = scores_obj.coping_su + parseInt(ESCICoping[ESCIC19]);

        scores_obj.coping_rel = 0;
        scores_obj.coping_rel = scores_obj.coping_rel + parseInt(ESCICoping[ESCIC8]);
        scores_obj.coping_rel = scores_obj.coping_rel + parseInt(ESCICoping[ESCIC90]);
        scores_obj.coping_rel = scores_obj.coping_rel + parseInt(ESCICoping[ESCIC10]);
        scores_obj.coping_rel = scores_obj.coping_rel + parseInt(ESCICoping[ESCIC18]);

        scores_obj.coping_alk = 0;
        scores_obj.coping_alk = scores_obj.coping_alk + parseInt(ESCICoping[ESCIC8]);
        scores_obj.coping_alk = scores_obj.coping_alk + (5 - parseInt(ESCICoping[ESCIC2]));
        scores_obj.coping_alk = scores_obj.coping_alk + parseInt(ESCICoping[ESCIC11]);
        scores_obj.coping_alk = scores_obj.coping_alk + parseInt(ESCICoping[ESCIC14]);
        scores_obj.coping_alk = scores_obj.coping_alk + parseInt(ESCICoping[ESCIC20]);


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
