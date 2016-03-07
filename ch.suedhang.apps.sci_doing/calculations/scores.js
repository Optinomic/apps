function main(responses) {
    var calc = {};

    // ------------------------------------------
    // H e l p e r   -   F U N C T I O N S
    // ------------------------------------------

    calc.doSomething = function() {
        var score = 73;
        return score;
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


// Berechnung der SCI-Scores

//myResults.score.belastung = parseInt(result['ESCIBelastung_ESCIB1']) + parseInt(result['ESCIBelastung_ESCIB2']) + parseInt(result['ESCIBelastung_ESCIB3']) + parseInt(result['ESCIBelastung_ESCIB4']) 
//+ parseInt(result['ESCIBelastung_ESCIB5']) + parseInt(result['ESCIBelastung_ESCIB6']) + parseInt(result['ESCIBelastung_ESCIB7'])
//myResults.score.stress = parseInt(result['ESCISymptome_ESCIS1']) + parseInt(result['ESCISymptome_ESCIS2']) + parseInt(result['ESCISymptome_ESCIS3']) + parseInt(result['ESCISymptome_ESCIS4']) 
//+ parseInt(result['ESCISymptome_ESCIS5']) + parseInt(result['ESCISymptome_ESCIS6']) + parseInt(result['ESCISymptome_ESCIS7']) + parseInt(result['ESCISymptome_ESCIS8']) 
//+ parseInt(result['ESCISymptome_ESCIS9']) + parseInt(result['ESCISymptome_ESCI10']) + parseInt(result['ESCISymptome_ESCI11']) + parseInt(result['ESCISymptome_ESCI12']) 
//+ parseInt(result['ESCISymptome_ESCI13'])
//myResults.score.coping_pos = parseInt(result['ESCICoping_ESCIC1']) + parseInt(result['ESCICoping_ESCIC5']) + parseInt(result['ESCICoping_ESCIC6']) + parseInt(result['ESCICoping_ESCIC16'])
//myResults.score.coping_ab = parseInt(result['ESCICoping_ESCIC3']) + parseInt(result['ESCICoping_ESCIC7']) + parseInt(result['ESCICoping_ESCIC12']) + parseInt(result['ESCICoping_ESCIC17'])
//myResults.score.coping_su = parseInt(result['ESCICoping_ESCIC4']) + parseInt(result['ESCICoping_ESCIC13']) + parseInt(result['ESCICoping_ESCIC15']) + parseInt(result['ESCICoping_ESCIC19'])
//myResults.score.coping_rel = parseInt(result['ESCICoping_ESCIC8']) + parseInt(result['ESCICoping_ESCIC90']) + parseInt(result['ESCICoping_ESCIC10']) + parseInt(result['ESCICoping_ESCIC18'])
//myResults.score.coping_alk = parseInt(result(5-['ESCICoping_ESCIC2']) + parseInt(result['ESCICoping_ESCIC11']) + parseInt(result['ESCICoping_ESCIC14']) + parseInt(result['ESCICoping_ESCIC20'])