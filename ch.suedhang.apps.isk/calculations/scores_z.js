function main(responses) {
    var calc = {};

    // ------------------------------------------
    // H e l p e r   -   F U N C T I O N S
    // ------------------------------------------



    calc.getPatientAge = function(birth_date) {
        if (birth_date !== null) {
            var today = new Date();
            var birthDate = new Date(birth_date);
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            };
        } else {
            var age = 1;
        };

        return age;
    };

    calc.getPatientAgeMz = function(birth_date, survey_filled_date) {
        if (birth_date !== null) {
            var today = new Date(survey_filled_date);
            var birthDate = new Date(birth_date);
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            };
        } else {
            var age = 1;
        };

        return age;
    };

/*
    calc.z_scores = function(soz_orient, offensiv, selbststeuerung, reflex) {

        // Calculate stuff
        var m_norm = [29.50, 21.15, 21.30, 20.25]
        var sd_norm = [3.82, 3.50, 3.92, 2.94]       
*/


    // ------------------------------------------
    // F U N C T I O N  -  Main
    // ------------------------------------------
    calc.getResults = function(myResponses) {

        var responses_array = myResponses.survey_responses;
        var allResults = [];



        responses_array.forEach(function(response, myindex) {
            var myResults = {};
            var result = response.data.response;

            // Calculate Stuff


            var gender = myResponses.patient.data.gender;
            myResults.gender = gender;


            // Soziale Orientierung
            var m_norm = 29.50;
            var sd_norm = 3.82;
            var soz_orient = 0;
            soz_orient = soz_orient + parseInt(result['AISK[AISK1]']);
            soz_orient = soz_orient + parseInt(result['AISK[AISK5]']);
            soz_orient = soz_orient + parseInt(result['AISK[AISK9]']);
            soz_orient = soz_orient + parseInt(result['AISK[AIS11]']);
            soz_orient = soz_orient + parseInt(result['AISK[AIS14]']);
            soz_orient = soz_orient + parseInt(result['AISK[AIS18]']);
            soz_orient = soz_orient + parseInt(result['AISK[AIS21]']);
            soz_orient = soz_orient + parseInt(result['AISK[AIS23]']);
            soz_orient = soz_orient + parseInt(result['AISK[AIS27]']);
            soz_orient = soz_orient + parseInt(result['AISK[AIS31]']);
            myResults.soziale_orientierung_sumscore = soz_orient;
            soz_orient_z = (soz_orient - m_norm) / sd_norm;

            // Offensivitaet
            var m_norm = 21.15;
            var sd_norm = 3.50;
            var offensiv = 0;
            offensiv = offensiv + parseInt(result['AISK[AISK2]']);
            offensiv = offensiv + parseInt(result['AISK[AISK6]']);
            offensiv = offensiv + parseInt(5 - result['AISK[AIS10]']);
            offensiv = offensiv + parseInt(result['AISK[AIS15]']);
            offensiv = offensiv + parseInt(result['AISK[AIS19]']);
            offensiv = offensiv + parseInt(result['AISK[AIS24]']);
            offensiv = offensiv + parseInt(result['AISK[AIS28]']);
            offensiv = offensiv + parseInt(5 - result['AISK[AIS32]']);
            myResults.offensivitaet_sumscore = offensiv;
            offensiv_z = (offensiv - m_norm) / sd_norm;

            // Selbststeuerung
            var m_norm = 21.30;
            var sd_norm = 3.92;
            var selbststeuerung = 0;
            selbststeuerung = selbststeuerung + parseInt(5 - result['AISK[AISK3]']);
            selbststeuerung = selbststeuerung + parseInt(5 - result['AISK[AISK7]']);
            selbststeuerung = selbststeuerung + parseInt(5 - result['AISK[AIS12]']);
            selbststeuerung = selbststeuerung + parseInt(5 - result['AISK[AIS16]']);
            selbststeuerung = selbststeuerung + parseInt(result['AISK[AIS20]']);
            selbststeuerung = selbststeuerung + parseInt(5 - result['AISK[AIS25]']);
            selbststeuerung = selbststeuerung + parseInt(result['AISK[AIS29]']);
            selbststeuerung = selbststeuerung + parseInt(5 - result['AISK[AIS33]']);
            myResults.selbststeuerung_sumscore = selbststeuerung;
            selbststeuerung_z = (selbststeuerung - m_norm) / sd_norm;

            // Reflexibilitaet
            var m_norm = 20.25;
            var sd_norm = 2.94;            
            var reflex = 0;
            reflex = reflex + parseInt(result['AISK[AISK4]']);
            reflex = reflex + parseInt(result['AISK[AISK8]']);
            reflex = reflex + parseInt(result['AISK[AIS13]']);
            reflex = reflex + parseInt(5 - result['AISK[AIS17]']);
            reflex = reflex + parseInt(result['AISK[AIS22]']);
            reflex = reflex + parseInt(result['AISK[AIS26]']);
            reflex = reflex + parseInt(result['AISK[AIS30]']);
            myResults.reflexibilitaet_sumscore = reflex;
            reflex_z = (reflex - m_norm) / sd_norm;



            // Unneeded - Just for DEBUG
            // myResults.full_data = myResponses;

            // Write Results for the Return
            // Do not modify stuff down here
            myResults.hash = result['optinomixHASH'];
            myResults.response = response;
            allResults.push(myResults);
        });

        return allResults;
    };


    // Return
    return calc.getResults(responses);
}
