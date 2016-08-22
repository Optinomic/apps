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
        var all_scores = [];

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
                "BA_Quotient": []
            };

            // Scores Obj. erstellen.
            var scores = {
                "patient_details": {
                    "edu_years": null,
                    "edu_group": {},
                    "age": null
                },
                "mz_alle_vars": JSON.parse(JSON.stringify(variables)),
                "mz_eintritt_vars": JSON.parse(JSON.stringify(variables)),
                "mz_austritt_vars": JSON.parse(JSON.stringify(variables)),
                "mz_alle_details": [],
                "mz_eintritt_details": [],
                "mz_austritt_details": [],
                "mz_anderer_details": [],
                "patient": current_result.patient
            };



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

                var mz = current_response.mz;


                // Details Obj. erstellen.
                var details_obj = {
                    "TMTAError": TMTAError,
                    "TMTATime": TMTATime,
                    "TMTBError": TMTBError,
                    "TMTBTime": TMTBTime,
                    "Perz_A": Perz_A,
                    "Perz_B": Perz_B,
                    "BA_Quotient": BA_Quotient,
                    "mz": mz,
                    "full_response": current_response,
                    "event_id": event_id,
                    "patient_id": pid,
                    "filled_datestamp": filled
                };

                var details_obj_clone = JSON.parse(JSON.stringify(details_obj));
                //var details_obj_clone_2 = JSON.parse(JSON.stringify(details_obj_clone_1));


                // Interessante Variablen & Details Obj. speichern.
                scores.mz_alle_details.push(details_obj_clone);
                scores.mz_alle_vars.TMTAError.push(TMTAError);
                scores.mz_alle_vars.TMTATime.push(TMTATime);
                scores.mz_alle_vars.TMTBError.push(TMTBError);
                scores.mz_alle_vars.TMTBTime.push(TMTBTime);
                scores.mz_alle_vars.Perz_A.push(Perz_A);
                scores.mz_alle_vars.Perz_B.push(Perz_B);
                scores.mz_alle_vars.BA_Quotient.push(BA_Quotient);


                //details_responses.mz_eintritt_details.push(details_obj_clone_2);

                if (mz === 1) {
                    // Eintritt
                    //scores.mz_eintritt_details.push(details_obj);
                    scores.mz_eintritt_variables.TMTAError.push(TMTAError);
                    scores.mz_eintritt_variables.TMTATime.push(TMTATime);
                    scores.mz_eintritt_variables.TMTBError.push(TMTBError);
                    scores.mz_eintritt_variables.TMTBTime.push(TMTBTime);
                    scores.mz_eintritt_variables.Perz_A.push(Perz_A);
                    scores.mz_eintritt_variables.Perz_B.push(Perz_B);
                    scores.mz_eintritt_variables.BA_Quotient.push(BA_Quotient);
                };


                //  
                //  if (current_response.Messzeitpunkt.Messzeitpunkt === 2) {
                //      // Austritt
                //      scores.mz_austritt_details.push(details_obj);
                //      scores.mz_austritt_variables.TMTAError.push(TMTAError);
                //      scores.mz_austritt_variables.TMTBError.push(TMTBError);
                //      scores.mz_austritt_variables.TMTBTime.push(TMTBTime);
                //      scores.mz_austritt_variables.Perz_A.push(Perz_A);
                //      scores.mz_austritt_variables.Perz_B.push(Perz_B);
                //      scores.mz_austritt_variables.BA_Quotient.push(BA_Quotient);
                //  };


                // 
                // if ((current_response.Messzeitpunkt.Messzeitpunkt !== 1) && (current_response.Messzeitpunkt.Messzeitpunkt !== 2)) {
                //     // Anderer Messzeitpunkt
                //     scores.mz_anderer_details.push(details_obj);
                //     scores.mz_anderer_variables.TMTAError.push(TMTAError);
                //     scores.mz_anderer_variables.TMTBError.push(TMTBError);
                //     scores.mz_anderer_variables.TMTBTime.push(TMTBTime);
                //     scores.mz_anderer_variables.Perz_A.push(Perz_A);
                //     scores.mz_anderer_variables.Perz_B.push(Perz_B);
                //     scores.mz_anderer_variables.BA_Quotient.push(BA_Quotient);
                // };
            };

            // scores.messzeitpunkt = mz_alle;
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
