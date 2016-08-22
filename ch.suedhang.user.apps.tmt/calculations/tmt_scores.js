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
                "TMTAError": [],
                "TMTATime": [],
                "TMTBError": [],
                "TMTBTime": [],
                "Perz_A": [],
                "Perz_B": [],
                "BA_Quotient": [],
                "Details": []
            };

            // Scores Obj. erstellen.
            var scores = {
                "messzeitpunkt": {
                    "eintritt": variables,
                    "austritt": variables,
                    "anderer": variables,
                    "alle": variables,
                },
                "patient_details": {
                    "edu_years": null,
                    "edu_group": {},
                    "age": null
                },
                "patient": current_result.patient,
                "full": current_result
            };

            //
            //    var all_responses = current_result.other_calculations['ch.suedhang.apps.tmt_V3:tmt_score']
            //
            //    all_responses.forEach(function(current_response, myResponseIndex) {
            //
            //        var TMTAError = current_response.TMTAError;
            //        var TMTATime = current_response.TMTATime;
            //        var TMTBError = current_response.TMTBError;
            //        var TMTBTime = current_response.TMTBTime;
            //        var Perz_A = current_response.percentile.result.A;
            //        var Perz_B = current_response.percentile.result.B;
            //        var BA_Quotient = current_response.quotient;
            //
            //        scores.patient_details.edu_years = current_response.edu_years;
            //        scores.patient_details.edu_group = current_response.percentile.age_perz;
            //        scores.patient_details.age = current_response.set_age;
            //
            //        var filled = current_response.response.data.filled;
            //        var event_id = current_response.response.data.event_id;
            //        var pid = current_result.patient.id;
            //
            //
            //        // Details Obj. erstellen.
            //        var details_obj = {
            //            "TMTAError": TMTAError,
            //            "TMTATime": TMTATime,
            //            "TMTBError": TMTBError,
            //            "TMTBTime": TMTBTime,
            //            "Perz_A": Perz_A,
            //            "Perz_B": Perz_B,
            //            "BA_Quotient": BA_Quotient,
            //            "full_response": current_response,
            //            "event_id": event_id,
            //            "patient_id": pid,
            //            "filled_datestamp": filled
            //        };
            //
            //        // Interessante Variablen & Details Obj. speichern.
            //        scores.messzeitpunkt.alle.TMTAError.push(TMTAError);
            //        scores.messzeitpunkt.alle.TMTATime.push(TMTATime);
            //        scores.messzeitpunkt.alle.TMTBError.push(TMTBError);
            //        scores.messzeitpunkt.alle.TMTBTime.push(TMTBTime);
            //        scores.messzeitpunkt.alle.Perz_A.push(Perz_A);
            //        scores.messzeitpunkt.alle.Perz_B.push(Perz_B);
            //        scores.messzeitpunkt.alle.BA_Quotient.push(BA_Quotient);
            //        scores.messzeitpunkt.alle.Details.push(details_obj);
            //
            //        if (current_response.Messzeitpunkt.Messzeitpunkt === 1) {
            //            // Eintritt
            //            scores.messzeitpunkt.eintritt.TMTAError.push(TMTAError);
            //            scores.messzeitpunkt.eintritt.TMTATime.push(TMTATime);
            //            scores.messzeitpunkt.eintritt.TMTBError.push(TMTBError);
            //            scores.messzeitpunkt.eintritt.TMTBTime.push(TMTBTime);
            //            scores.messzeitpunkt.eintritt.Perz_A.push(Perz_A);
            //            scores.messzeitpunkt.eintritt.Perz_B.push(Perz_B);
            //            scores.messzeitpunkt.eintritt.BA_Quotient.push(BA_Quotient);
            //            scores.messzeitpunkt.eintritt.Details.push(details_obj);
            //        };
            //
            //        if (current_response.Messzeitpunkt.Messzeitpunkt === 2) {
            //            // Austritt
            //            scores.messzeitpunkt.austritt.TMTAError.push(TMTAError);
            //            scores.messzeitpunkt.austritt.TMTATime.push(TMTATime);
            //            scores.messzeitpunkt.austritt.TMTBError.push(TMTBError);
            //            scores.messzeitpunkt.austritt.TMTBTime.push(TMTBTime);
            //            scores.messzeitpunkt.austritt.Perz_A.push(Perz_A);
            //            scores.messzeitpunkt.austritt.Perz_B.push(Perz_B);
            //            scores.messzeitpunkt.austritt.BA_Quotient.push(BA_Quotient);
            //            scores.messzeitpunkt.austritt.Details.push(details_obj);
            //        };
            //
            //        if ((current_response.Messzeitpunkt.Messzeitpunkt !== 1) && (current_response.Messzeitpunkt.Messzeitpunkt !== 2)) {
            //            // Anderer Messzeitpunkt
            //            scores.messzeitpunkt.anderer.TMTAError.push(TMTAError);
            //            scores.messzeitpunkt.anderer.TMTATime.push(TMTATime);
            //            scores.messzeitpunkt.anderer.TMTBError.push(TMTBError);
            //            scores.messzeitpunkt.anderer.TMTBTime.push(TMTBTime);
            //            scores.messzeitpunkt.anderer.Perz_A.push(Perz_A);
            //            scores.messzeitpunkt.anderer.Perz_B.push(Perz_B);
            //            scores.messzeitpunkt.anderer.BA_Quotient.push(BA_Quotient);
            //            scores.messzeitpunkt.anderer.Details.push(details_obj);
            //        };
            //    });

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
