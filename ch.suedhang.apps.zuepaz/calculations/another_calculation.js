function main(responses) {
    var calc = {};

    // ------------------------------------------
    // H e l p e r   -   F U N C T I O N S
    // ------------------------------------------

    // Runden
    calc.roundToOne = function(num) {
        return +(Math.round(num + "e+1") + "e-1");
    };


    calc.doZuepaz = function(d) {

        var full_score = 0;

        var anz_anworten_eintritt = 2;
        if (d.Q00001 === "999") {
            anz_anworten_eintritt = anz_anworten_eintritt - 1;
        } else {
        full_score = full_score + parseInt(d.Q00001);

        if (d.Q00002 === "999") {
            anz_anworten_eintritt = anz_anworten_eintritt - 1;
        } else {
        full_score = full_score + parseInt(d.Q00002);

        var zupaz_eintritt_score = full_score;
        var zupaz_eintritt_mean = calc.roundToOne(full_score / anz_anworten_eintritt);

        var anz_anworten_aufenthalt = 3;
        if (d.Q00003 === "999") {
            anz_anworten_aufenthalt = anz_anworten_aufenthalt - 1;
        } else {
        full_score = full_score + parseInt(d.Q00003);

        if (d.Q00004 === "999") {
            anz_anworten_aufenthalt = anz_anworten_aufenthalt - 1;
        } else {
        full_score = full_score + parseInt(d.Q00004);

        if (d.Q00005 === "999") {
            anz_anworten_aufenthalt = anz_anworten_aufenthalt - 1;
        } else {
        full_score = full_score + parseInt(d.Q00005);
        var zupaz_aufenthalt_score = full_score - zupaz_eintritt_score;
        var zupaz_aufenthalt_mean = calc.roundToOne(zupaz_aufenthalt_score / anz_anworten_aufenthalt);

        var anz_anworten_behandlung = 19;
        if (d.Q00006 === "999") {
            anz_anworten_behandlung = anz_anworten_behandlung - 1;
        } else {        
        full_score = full_score + parseInt(d.Q00006);

        if (d.Q00007 === "999") {
            anz_anworten_behandlung = anz_anworten_behandlung - 1;
        } else {  
        full_score = full_score + parseInt(d.Q00007);

        if (d.Q00008 === "999") {
            anz_anworten_behandlung = anz_anworten_behandlung - 1;
        } else {  
        full_score = full_score + parseInt(d.Q00008);

        if (d.Q00009 === "999") {
            anz_anworten_behandlung = anz_anworten_behandlung - 1;
        } else {  
        full_score = full_score + parseInt(d.Q00009);

        if (d.Q00010 === "999") {
            anz_anworten_behandlung = anz_anworten_behandlung - 1;
        } else {  
        full_score = full_score + parseInt(d.Q00010);

        if (d.Q00011 === "999") {
            anz_anworten_behandlung = anz_anworten_behandlung - 1;
        } else {  
        full_score = full_score + parseInt(d.Q00011);

        if (d.Q00012 === "999") {
            anz_anworten_behandlung = anz_anworten_behandlung - 1;
        } else {  
        full_score = full_score + parseInt(d.Q00012);

        if (d.Q00013 === "999") {
            anz_anworten_behandlung = anz_anworten_behandlung - 1;
        } else {  
        full_score = full_score + parseInt(d.Q00013);

        if (d.Q00014 === "999") {
            anz_anworten_behandlung = anz_anworten_behandlung - 1;
        } else {  
        full_score = full_score + parseInt(d.Q00014);

        if (d.Q00015 === "999") {
            anz_anworten_behandlung = anz_anworten_behandlung - 1;
        } else {  
        full_score = full_score + parseInt(d.Q00015);

        if (d.Q00016 === "999") {
            anz_anworten_behandlung = anz_anworten_behandlung - 1;
        } else {  
        full_score = full_score + parseInt(d.Q00016);

        if (d.Q00017 === "999") {
            anz_anworten_behandlung = anz_anworten_behandlung - 1;
        } else {  
        full_score = full_score + parseInt(d.Q00017);


        if (d.Q00018 === "kA" || d.Q00018 === "999") {
            anz_anworten_behandlung = anz_anworten_behandlung - 1;
        } else {
            full_score = full_score + parseInt(d.Q00018);
        };


        if (d.Q00019 === "kA" || d.Q00019 ==="999") {
            anz_anworten_behandlung = anz_anworten_behandlung - 1;
        } else {
            if (parseInt(d.Q00019) === 0) {
                full_score = full_score + 0;
            }
            if (parseInt(d.Q00019) === 1) {
                full_score = full_score + 1;
            }
            if (parseInt(d.Q00019) === 2) {
                full_score = full_score + 2;
            }
            if (parseInt(d.Q00019) === 3) {
                full_score = full_score + 3;
            }
            if (parseInt(d.Q00019) === 4) {
                full_score = full_score + 1;
            }
            if (parseInt(d.Q00019) === 5) {
                full_score = full_score + 0;
            }
        };
        if (d.Q00020 === "999") {
            anz_anworten_behandlung = anz_anworten_behandlung - 1;
        } else {
        full_score = full_score + parseInt(d.Q00020);

        if (d.Q00021 === "999") {
            anz_anworten_behandlung = anz_anworten_behandlung - 1;
        } else {
        full_score = full_score + parseInt(d.Q00021);

        if (d.Q00022 === "999") {
            anz_anworten_behandlung = anz_anworten_behandlung - 1;
        } else {
        full_score = full_score + parseInt(d.Q00022);

        if (d.Q00023 === "999") {
            anz_anworten_behandlung = anz_anworten_behandlung - 1;
        } else {
        full_score = full_score + parseInt(d.Q00023);

        if (d.Q00024 === "999") {
            anz_anworten_behandlung = anz_anworten_behandlung - 1;
        } else {
        full_score = full_score + parseInt(d.Q00024);

        var zupaz_behandlung_score = full_score - zupaz_eintritt_score - zupaz_aufenthalt_score;
        var zupaz_behandlung_mean = calc.roundToOne(zupaz_behandlung_score / anz_anworten_behandlung);


        var anz_anworten_austritt = 6;
        if (d.Q00025 === "999") {
            anz_anworten_austritt = anz_anworten_austritt - 1;
        } else {
        full_score = full_score + parseInt(d.Q00025);

        if (d.Q00026 === "999") {
            anz_anworten_austritt = anz_anworten_austritt - 1;
        } else {
        full_score = full_score + parseInt(d.Q00026);

        if (d.Q00027 === "999") {
            anz_anworten_austritt = anz_anworten_austritt - 1;
        } else {
        if (parseInt(d.Q00027) === 0) {
            full_score = full_score + 0;
        }
        if (parseInt(d.Q00027) === 1) {
            full_score = full_score + 1;
        }
        if (parseInt(d.Q00027) === 2) {
            full_score = full_score + 2;
        }
        if (parseInt(d.Q00027) === 3) {
            full_score = full_score + 3;
        }
        if (parseInt(d.Q00027) === 4) {
            full_score = full_score + 1;
        }
        if (parseInt(d.Q00027) === 5) {
            full_score = full_score + 0;
        }

        if (d.Q00028 === "999") {
            anz_anworten_austritt = anz_anworten_austritt - 1;
        } else {
        full_score = full_score + parseInt(d.Q00028);

        if (d.Q00029 === "999") {
            anz_anworten_austritt = anz_anworten_austritt - 1;
        } else {
        full_score = full_score + parseInt(d.Q00029);

        if (d.Q00030 === "999") {
            anz_anworten_austritt = anz_anworten_austritt - 1;
        } else {
        full_score = full_score + parseInt(d.Q00030);

        var zupaz_austritt_score = full_score - zupaz_eintritt_score - zupaz_aufenthalt_score - zupaz_behandlung_score;
        var zupaz_austritt_mean = calc.roundToOne(zupaz_austritt_score / anz_anworten_austritt);

        var zupaz_full_score = full_score;
        var zupaz_full_mean = calc.roundToOne(full_score / (anz_anworten_eintritt + anz_anworten_aufenthalt + anz_anworten_behandlung + anz_anworten_austritt));



        var return_obj = {
            "full_score": zupaz_full_score,
            "full_mean": zupaz_full_mean,
            "full_count": anz_anworten_eintritt + anz_anworten_aufenthalt + anz_anworten_behandlung + anz_anworten_austritt,
            "austritt_score": zupaz_austritt_score,
            "austritt_mean": zupaz_austritt_mean,
            "austritt_count": anz_anworten_austritt,
            "behandlung_score": zupaz_behandlung_score,
            "behandlung_mean": zupaz_behandlung_mean,
            "behandlung_count": anz_anworten_aufenthalt,
            "aufenthalt_score": zupaz_aufenthalt_score,
            "aufenthalt_mean": zupaz_aufenthalt_mean,
            "aufenthalt_count": anz_anworten_aufenthalt,
            "eintritt_score": zupaz_eintritt_score,
            "eintritt_mean": zupaz_eintritt_mean,
            "eintritt_count": anz_anworten_eintritt
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
            myResults.ZuePaZ = calc.doZuepaz(result);


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
