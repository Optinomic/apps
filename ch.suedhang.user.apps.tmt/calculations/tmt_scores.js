function main(responses) {


    var calc = {};

    // ------------------------------------------
    // H e l p e r   -   F U N C T I O N S
    // ------------------------------------------


    calc.roundToTwo = function(num) {
        // Round a Number to 0.X 
        return +(Math.round(num + "e+2") + "e-2");
    };


    calc.getPatientScores = function(d) {

        // Get all TMT-Scores from a Patient and arrange it in a Array
        var all_scores = []


        for (var i = 0; i < d.length; i++) {
            var current_result = d[i];

            // Interessante Variablen
            var variables = {
                "variables": {
                    "TMTAError": [],
                    "TMTATime": [],
                    "TMTBError": [],
                    "TMTBTime": [],
                    "Perz_A": [],
                    "Perz_B": [],
                    "BA_Quotient": []
                },
                "details": []
            };

            // Scores Obj. erstellen.
            var scores = {
                "patient_details": {
                    "edu_years": null,
                    "edu_group": {},
                    "age": null
                },
                "patient": current_result.patient,
                "all_responses": []
            };
            scores.messzeitpunkt = {};
            scores.messzeitpunkt.alle = {};
            scores.messzeitpunkt.alle.details = [];


            //  "messzeitpunkt": {
            //      "eintritt": JSON.parse(JSON.stringify(variables)),
            //      "austritt": JSON.parse(JSON.stringify(variables)),
            //      "anderer": JSON.parse(JSON.stringify(variables)),
            //      "alle": {
            //          "variables": {
            //              "TMTAError": [],
            //              "TMTATime": [],
            //              "TMTBError": [],
            //              "TMTBTime": [],
            //              "Perz_A": [],
            //              "Perz_B": [],
            //              "BA_Quotient": []
            //          },
            //          "details": []
            //      }
            //  },

            var all_responses = current_result.other_calculations['ch.suedhang.apps.tmt_V3:tmt_score']

            for (var x = 0; x < all_responses.length; x++) {
                var current_response = all_responses[x];


                var TMTAError = current_response.TMTAError;
                var TMTATime = current_response.TMTATime;
                var TMTBError = current_response.TMTBError;
                var TMTBTime = current_response.TMTBTime;
                var Perz_A = current_response.percentile.result.A;
                var Perz_B = current_response.percentile.result.B;
                var BA_Quotient = current_response.quotient;

                scores.patient_details.edu_years = current_response.edu_years;
                scores.patient_details.edu_group = current_response.percentile.age_perz;
                scores.patient_details.age = current_response.set_age;

                var filled = current_response.response.data.filled;
                var event_id = current_response.response.data.event_id;
                var pid = current_result.patient.id;


                // Details Obj. erstellen.
                var details_obj = {
                    "TMTAError": TMTAError,
                    "TMTATime": TMTATime,
                    "TMTBError": TMTBError,
                    "TMTBTime": TMTBTime,
                    "Perz_A": Perz_A,
                    "Perz_B": Perz_B,
                    "BA_Quotient": BA_Quotient,
                    "full_response": current_response,
                    "event_id": event_id,
                    "patient_id": pid,
                    "filled_datestamp": filled
                };

                scores.all_responses.push(details_obj);

                //  // Interessante Variablen & Details Obj. speichern.
                //  scores.messzeitpunkt.alle.variables.TMTAError.push(TMTAError);
                //  scores.messzeitpunkt.alle.variables.TMTATime.push(TMTATime);
                //  scores.messzeitpunkt.alle.variables.TMTBError.push(TMTBError);
                //  scores.messzeitpunkt.alle.variables.TMTBTime.push(TMTBTime);
                //  scores.messzeitpunkt.alle.variables.Perz_A.push(Perz_A);
                //  scores.messzeitpunkt.alle.variables.Perz_B.push(Perz_B);
                //  scores.messzeitpunkt.alle.variables.BA_Quotient.push(BA_Quotient);
                scores.messzeitpunkt.alle.details.push(details_obj);
                //  
                //  if (current_response.Messzeitpunkt.Messzeitpunkt === 1) {
                //      // Eintritt
                //      scores.messzeitpunkt.eintritt.variables.TMTAError.push(TMTAError);
                //      scores.messzeitpunkt.eintritt.variables.TMTATime.push(TMTATime);
                //      scores.messzeitpunkt.eintritt.variables.TMTBError.push(TMTBError);
                //      scores.messzeitpunkt.eintritt.variables.TMTBTime.push(TMTBTime);
                //      scores.messzeitpunkt.eintritt.variables.Perz_A.push(Perz_A);
                //      scores.messzeitpunkt.eintritt.variables.Perz_B.push(Perz_B);
                //      scores.messzeitpunkt.eintritt.variables.BA_Quotient.push(BA_Quotient);
                //      scores.messzeitpunkt.eintritt.details.push(details_obj);
                //  };
                //  
                //  if (current_response.Messzeitpunkt.Messzeitpunkt === 2) {
                //      // Austritt
                //      scores.messzeitpunkt.austritt.variables.TMTAError.push(TMTAError);
                //      scores.messzeitpunkt.austritt.variables.TMTATime.push(TMTATime);
                //      scores.messzeitpunkt.austritt.variables.TMTBError.push(TMTBError);
                //      scores.messzeitpunkt.austritt.variables.TMTBTime.push(TMTBTime);
                //      scores.messzeitpunkt.austritt.variables.Perz_A.push(Perz_A);
                //      scores.messzeitpunkt.austritt.variables.Perz_B.push(Perz_B);
                //      scores.messzeitpunkt.austritt.variables.BA_Quotient.push(BA_Quotient);
                //      scores.messzeitpunkt.austritt.details.push(details_obj);
                //  };
                //  
                //  if ((current_response.Messzeitpunkt.Messzeitpunkt !== 1) && (current_response.Messzeitpunkt.Messzeitpunkt !== 2)) {
                //      // Anderer Messzeitpunkt
                //      scores.messzeitpunkt.anderer.variables.TMTAError.push(TMTAError);
                //      scores.messzeitpunkt.anderer.variables.TMTATime.push(TMTATime);
                //      scores.messzeitpunkt.anderer.variables.TMTBError.push(TMTBError);
                //      scores.messzeitpunkt.anderer.variables.TMTBTime.push(TMTBTime);
                //      scores.messzeitpunkt.anderer.variables.Perz_A.push(Perz_A);
                //      scores.messzeitpunkt.anderer.variables.Perz_B.push(Perz_B);
                //      scores.messzeitpunkt.anderer.variables.BA_Quotient.push(BA_Quotient);
                //      scores.messzeitpunkt.anderer.details.push(details_obj);
                //  };
            };

            all_scores.push(scores);
        };


        return all_scores;
    };

    // ------------------------------------------
    // F U N C T I O N  -  Main
    // ------------------------------------------

    calc.getResults = function(d) {
        // Calculate stuff first.

        // var patient_scores = [];
        var patient_scores = calc.getPatientScores(d);

        // Build & add stuff to returnObj.
        var returnObj = {};
        returnObj.patient_scores = patient_scores;
        returnObj.my_length = d.length;


        returnObj.full = d;

        // Return
        return returnObj;
    };


    // Return
    return calc.getResults(responses);
}
