function main(responses) {

    var calc = {};


    // ------------------------------------------
    // H e l p e r   -   F U N C T I O N S
    // ------------------------------------------

    // Runden
    calc.roundToOne = function(num) {
        return +(Math.round(num + "e+1") + "e-1");
    }

    // CH Datumsformat
    calc.formatDateCH = function(date_string) {
        date_string = date_string || null
        if (date_string !== null) {

            // 1952-11-19T00:00:00.000000000000Z
            var year = parseInt(date_string.substring(0, 4));
            var month = parseInt(date_string.substring(5, 7));
            var day = parseInt(date_string.substring(8, 10));
            var date_string_return = day + "." + month + "." + year

            return date_string_return;
        } else {
            return null;
        }
    };


    calc.FAGERSTROEM_Score = function(d) {

        // Calculate AUDIT-Score
        var score = 0;
        var count_valid_scores = 0;
        var anwers = 0;



        if ((d.VZAT020 !== '999') && (d.VZAT020 !== '')) {
            score = score + parseInt(d.VZAT020);
            count_valid_scores = count_valid_scores + 3;
            anwers = anwers + 1;
        };

        if ((d.VZAT030 !== '999') && (d.VZAT030 !== '')) {
            score = score + parseInt(d.VZAT030);
            count_valid_scores = count_valid_scores + 3;
            anwers = anwers + 1;
        };

        if ((d.VZAT040 !== '999') && (d.VZAT040 !== '')) {
            score = score + parseInt(d.VZAT040);
            count_valid_scores = count_valid_scores + 1;
            anwers = anwers + 1;
        };

        if ((d.VZAT050 !== '999') && (d.VZAT050 !== '')) {
            score = score + parseInt(d.VZAT050);
            count_valid_scores = count_valid_scores + 1;
            anwers = anwers + 1;
        };

        if ((d.VZAT060 !== '999') && (d.VZAT060 !== '')) {
            score = score + parseInt(d.VZAT060);
            count_valid_scores = count_valid_scores + 1;
            anwers = anwers + 1;
        };

        if ((d.VZAT070 !== '999') && (d.VZAT070 !== '')) {
            score = score + parseInt(d.VZAT070);
            count_valid_scores = count_valid_scores + 1;
            anwers = anwers + 1;
        };


        var anz_mw_to_add = 10 - count_valid_scores;
        var Fagerstroem_Mean = calc.roundToOne(score / count_valid_scores);


        score = score + (anz_mw_to_add * Fagerstroem_Mean)

        var scale_ranges_fagerstoem = [{
            "from": 0,
            "to": 2,
            "result": "gering ausgeprägte körperliche Nikotinabhängigkeit.",
            "result_color": "#4CAF50",
            "logo_speed": 10
        }, {
            "from": 3,
            "to": 4,
            "result": "mittelstark ausgeprägte körperliche Nikotinabhängigkeit.",
            "result_color": "#FF9800",
            "logo_speed": 25
        }, {
            "from": 5,
            "to": 6,
            "result": "stark ausgeprägte körperliche Nikotinabhängigkeit.",
            "result_color": "#F44336",
            "logo_speed": 50
        }, {
            "from": 7,
            "to": 10,
            "result": "sehr stark ausgeprägte körperliche Nikotinabhängigkeit.",
            "result_color": "#F44336",
            "logo_speed": 55
        }];


        var selected_population = {};

        if (score !== null) {
            selected_population = scale_ranges_fagerstoem[0];

            if (score >= scale_ranges_fagerstoem[1].from) {
                selected_population = scale_ranges_fagerstoem[1];
            };
            if (score >= scale_ranges_fagerstoem[2].from) {
                selected_population = scale_ranges_fagerstoem[2];
            };
            if (score >= scale_ranges_fagerstoem[3].from) {
                selected_population = scale_ranges_fagerstoem[3];
            };
        } else {
            selected_population = {
                "from": 999,
                "to": 999,
                "result": "Keine Interpretation möglich.",
                "result_color": "#F44336",
                "logo_speed": 55
            }
        };



        var nikotin_konsum = parseInt(d.VZAT010);
        var smoker = null;

        if ('VMAB001' in d) {
            var mz_date = d.VMAB001;
        } else {
            var mz_date = d.datestamp
        };

        var mz_datum = calc.formatDateCH(mz_date);



        var motivation_rauchstopp = "";
        var austritt_text = "";
        var motivation_rauchstopp_angabe = false;
        if ("VZAT100" in d) {
            var anser_motivation_rauchstopp = parseInt(d.VZAT100);
            if (anser_motivation_rauchstopp === 1) {
                motivation_rauchstopp_angabe = true;
                motivation_rauchstopp = "Kein Nikotinkonsum im Behandlungszeitraum";
                austritt_text = motivation_rauchstopp + ".";
            };
            if (anser_motivation_rauchstopp === 2) {
                motivation_rauchstopp_angabe = true;
                motivation_rauchstopp = "Aktuell keine Motivation zum Rauchstop vorhanden";
                austritt_text = "Bei Austritt wurde folgende Abstinenzmotivation angegeben: "
                austritt_text = austritt_text + motivation_rauchstopp + ".";

            };
            if (anser_motivation_rauchstopp === 3) {
                motivation_rauchstopp_angabe = true;
                motivation_rauchstopp = "Motivation zum Rauchstop vorhanden, Planung weiterer Schritte ist sinnvoll";
                austritt_text = "Bei Austritt wurde folgende Abstinenzmotivation angegeben: "
                austritt_text = austritt_text + motivation_rauchstopp + ".";
            };
            if (anser_motivation_rauchstopp === 4) {
                motivation_rauchstopp_angabe = true;
                motivation_rauchstopp = "Erste Schritte zum Rauchstop unternommen, Planung weiterer Schritte ist sinnvoll";
                austritt_text = "Bei Austritt wurde folgende Abstinenzmotivation angegeben: "
                austritt_text = austritt_text + motivation_rauchstopp + ".";
            };
            if (anser_motivation_rauchstopp === 5) {
                motivation_rauchstopp_angabe = true;
                motivation_rauchstopp = "Erfolgreicher Rauchstop im Behandlungszeitraum";
                austritt_text = "Bei Austritt wurde folgende Abstinenzmotivation angegeben: "
                austritt_text = austritt_text + motivation_rauchstopp + ".";
            };
            if (anser_motivation_rauchstopp === 999) {
                motivation_rauchstopp_angabe = false;
                motivation_rauchstopp = "Keine Angabe zur Abstinenzmotivation vorhanden.";
                austritt_text = "Keine Angabe zur Abstinenzmotivation vorhanden.";
            };
        };


        switch (nikotin_konsum) {
            case 999:
                var fagerstroem_text = "Das Rauchverhalten ist bei Austritt nicht bekannt.";
                break;
            case 1:
                smoker = false;
                var nichtraucher = "Nichtraucherin";
                if (patient.gender === "male") {
                    nichtraucher = "Nichtraucher";
                };

                var fagerstroem_text = "Am " + mz_datum + " gab " + patient_name + " gab an, «" + nichtraucher + "» zu sein.";


                break;
            default:

                var fagerstroem_text = selected_population.result;
                var fagerstroem_score = score;
                smoker = true;

                fagerstroem_text = "Bei Austritt bestand eine " + fagerstroem_text + " (∑=" + fagerstroem_score + ")."

                if ((score === 999) || (score === null)) {
                    fagerstroem_text = "Das Rauchverhalten ist bei Austritt nicht bekannt.";
                };

        };

        var smoker_obj = {
            "summyary": fagerstroem_text,
            "smoker": smoker,
            "date": mz_date,
            "motivation": motivation_rauchstopp + ".",
            "motivation_full_text": austritt_text,
            "motivation_data": motivation_rauchstopp_angabe,
            "datum": mz_datum
        };

        var return_obj = {
            "FAGERSTROEM_Score": score,
            "Fagerstroem_Mean": Fagerstroem_Mean,
            "valid_scores": count_valid_scores,
            "answers": anwers,
            "interpretation": selected_population,
            "ranges": { "ranges": scale_ranges_fagerstoem },
            "smoker": smoker_obj
        };

        return return_obj;
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
            myResults.FAGERSTROEM = calc.FAGERSTROEM_Score(result);


            // Write Results for the Return
            // Do not modify stuff here
            // myResults.full = myResponses;
            myResults.hash = result['optinomixHASH'];
            myResults.response = response;
            allResults.push(myResults);
        });

        return allResults;
    };


    // Return
    return calc.getResults(responses);


}