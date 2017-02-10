function main(responses) {


    var calc = {};


    // ------------------------------------------
    // D e f i n i t i o n s
    // ------------------------------------------


    calc.result_types = ["sum_score", "scale_score", "z_score"];

    calc.result_array = [{
        "id": 0,
        "description": "Soziale Orientierung",
        "full": "Sich für andere Menschen einsetzen, aufmerksam und hilfsbereit sein, andere Meinungen tolerieren und Kompromisse anstreben.",
        "sub_left": "Auf den eigenen Vorteil bedacht sein, sich nicht für andere interessieren und deren Meinung ignorieren oder gering schätzen",
        "sub_right": "Überinvolviert, zu schnelle Kompromissbereitschaft",
        "m_norm": 29.50,
        "sd_norm": 3.82,
        "items": 10
    }, {
        "id": 1,
        "description": "Offensivität",
        "full": "Auf andere Menschen zugehen und dabei Konflikte nicht scheuen, Entscheidungen treffen, eigene Interessen tatkräftig verwirklichen.",
        "sub_left": "Sich sozial isolieren, Konflikten aus dem Weg gehen, sich unterordnen, Entscheidungen vor sich her schieben",
        "sub_right": "Streitlustig, unüberlegte Entscheidungen",
        "m_norm": 21.15,
        "sd_norm": 3.50,
        "items": 8
    }, {
        "id": 2,
        "description": "Selbststeuerung",
        "full": "Rational handeln, sich nicht von Emotionen bestimmen lassen, die Verantwortung für das Leben bei sich selbst sehen.",
        "sub_left": "Sich treiben lassen, in seinem Handeln von ggf. stark schwankenden Emotionen bestimmt sein und die Verantwortung für das eigene Leben in der Umwelt ansiedeln",
        "sub_right": "Zwanghafte Selbstkontrolle",
        "m_norm": 21.30,
        "sd_norm": 3.92,
        "items": 8
    }, {
        "id": 3,
        "description": "Reflexibilität",
        "full": "Das eigene Verhalten und die Wirkung auf andere reflektieren und gegebenenfalls gezielt steuern, sich für andere Menschen interessieren.",
        "sub_left": "Sich nicht mit seinem Verhalten auseinandersetzten, gleichgültig gegenüber dem Verhalten und Erleben anderer Menschen",
        "sub_right": "Zwanghafte Selbstdarstellung, Rigidität",
        "m_norm": 20.25,
        "sd_norm": 2.94,
        "items": 7
    }];


    // ------------------------------------------
    // H e l p e r   -   F U N C T I O N S
    // ------------------------------------------

    calc.set_result_array = function(result_array) {

        function deUmlaut(value) {
            value = value.toLowerCase();
            value = value.replace(/ä/g, 'ae');
            value = value.replace(/ö/g, 'oe');
            value = value.replace(/ü/g, 'ue');
            value = value.replace(/ß/g, 'ss');
            value = value.replace(/ /g, '-');
            value = value.replace(/\./g, '');
            value = value.replace(/,/g, '');
            value = value.replace(/\(/g, '');
            value = value.replace(/\)/g, '');
            return value;
        };

        result_array.forEach(function(d, myResultID) {
            d.short_description = deUmlaut(d.description);
            d.short_description = d.short_description.replace(/[^a-z0-9]/gi, '_').toLowerCase();

            d.result = {};
            var name = "";
            calc.result_types.forEach(function(typ, myTypID) {
                name = d.short_description + "_" + typ;
                d.result[typ] = null;
            });

        });


        return result_array;
    };


    calc.create_all_results = function(result_array) {

        var variables = [];
        var variables_inner = [];
        var results = {};


        result_array.forEach(function(d, myResID) {

            calc.result_types.forEach(function(typ, myTypID) {
                name = d.short_description + "_" + typ;
                results[name] = d.result[typ];
                variables.push(name);
            });

        });

        calc.result_types.forEach(function(typ, myTypID) {
            variables_inner.push(typ);
        });


        var return_obj = {
            "all_variables": variables,
            "variables": variables_inner,
            "all_results": results
        };


        return return_obj;
    };

    // ------------------------------------------
    // F U N C T I O N  -  Main
    // ------------------------------------------
    calc.getResults = function(myResponses) {


        var result_array = calc.set_result_array(calc.result_array);


        var allResults = [];
        var currentPatient = myResponses.patient;


        var responses_array = myResponses.survey_responses;
        responses_array.forEach(function(response, myindex) {
            var d = {};
            d.result_array = calc.cloneObj(result_array);
            var result = response.data.response;


            // -----------------------------------------------
            // Calculate 'sum_score'
            // -----------------------------------------------

            // Soziale Orientierung
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

            d.result_array[0].result.sum_score = soz_orient;


            // Offensivitaet
            var offensiv = 0;
            offensiv = offensiv + parseInt(result['AISK[AISK2]']);
            offensiv = offensiv + parseInt(result['AISK[AISK6]']);
            offensiv = offensiv + parseInt(5 - result['AISK[AIS10]']);
            offensiv = offensiv + parseInt(result['AISK[AIS15]']);
            offensiv = offensiv + parseInt(result['AISK[AIS19]']);
            offensiv = offensiv + parseInt(result['AISK[AIS24]']);
            offensiv = offensiv + parseInt(result['AISK[AIS28]']);
            offensiv = offensiv + parseInt(5 - result['AISK[AIS32]']);

            d.result_array[1].result.sum_score = offensiv;


            // Selbststeuerung
            var selbststeuerung = 0;
            selbststeuerung = selbststeuerung + parseInt(5 - result['AISK[AISK3]']);
            selbststeuerung = selbststeuerung + parseInt(5 - result['AISK[AISK7]']);
            selbststeuerung = selbststeuerung + parseInt(5 - result['AISK[AIS12]']);
            selbststeuerung = selbststeuerung + parseInt(5 - result['AISK[AIS16]']);
            selbststeuerung = selbststeuerung + parseInt(result['AISK[AIS20]']);
            selbststeuerung = selbststeuerung + parseInt(5 - result['AISK[AIS25]']);
            selbststeuerung = selbststeuerung + parseInt(result['AISK[AIS29]']);
            selbststeuerung = selbststeuerung + parseInt(5 - result['AISK[AIS33]']);

            d.result_array[2].result.sum_score = selbststeuerung;


            // Reflexibilitaet
            var reflex = 0;
            reflex = reflex + parseInt(result['AISK[AISK4]']);
            reflex = reflex + parseInt(result['AISK[AISK8]']);
            reflex = reflex + parseInt(result['AISK[AIS13]']);
            reflex = reflex + parseInt(5 - result['AISK[AIS17]']);
            reflex = reflex + parseInt(result['AISK[AIS22]']);
            reflex = reflex + parseInt(result['AISK[AIS26]']);
            reflex = reflex + parseInt(result['AISK[AIS30]']);

            d.result_array[3].result.sum_score = reflex;


            // -----------------------------------------------
            // Calculate 'scale_score'  |  'z_score'
            // -----------------------------------------------

            d.result_array.forEach(function(res, myResID) {
                res.result.scale_score = calc.roundToTwo(res.result.sum_score / res.items);
                res.result.z_score = calc.roundToTwo((res.result.sum_score - res.m_norm) / res.sd_norm);
            });


            // -----------------------------------------------
            // Messzeitpunkt
            // -----------------------------------------------
            var mz = {
                "mz_id": 99,
                "mz_typ": 'Undefined',
                "mz_text": 'Undefined'
            };

            if ("Erhebungszeitpunkt" in result) {
                mz.mz_id = parseInt(result['Erhebungszeitpunkt']);

                if (mz.mz_id === 1) {
                    mz.mz_typ = 'Eintritt';
                    mz.mz_text = 'Eintritt - Entwöhnungstherapie';
                };

                if (mz.mz_id === 2) {
                    mz.mz_typ = 'Austritt';
                    mz.mz_text = 'Austritt - Entwöhnungstherapie';
                };

                if (mz.mz_id === 3) {
                    mz.mz_typ = 'Anderer';
                    mz.mz_text = 'Anderer Messzeitpunkt: ' + result['andererZeitpunkt'];
                };
            };


            // -----------------------------------------------
            // Create 'all_results' Object
            // -----------------------------------------------

            var all_results_obj = calc.create_all_results(d.result_array);
            d.all_results = all_results_obj.all_results;

            // -----------------------------------------------
            // Store Definitions & write results back
            // -----------------------------------------------

            d.definitions = {};
            d.definitions.all_results_variables = all_results_obj.all_variables;
            d.definitions.result_array = result_array;
            d.definitions.variables = all_results_obj.variables;

            response.data.response_id = response.id;
            d.info = response.data;
            d.info.mz = mz;
            d.info.hash = result['optinomixHASH'];
            allResults.push(d);
        });

        return allResults;
    };


    // ------------------------------------------
    // Helpers
    // ------------------------------------------

    calc.cloneObj = function(my_obj) {
        // Clone Obj. and Return
        return JSON.parse(JSON.stringify(my_obj));
    };

    calc.getObjProp = function(my_obj) {
        // Create 'all propertys array'
        var allFullPropertys = [];

        for (var property in my_obj) {
            if (my_obj.hasOwnProperty(property)) {
                allFullPropertys.push(property);
            }
        }

        return allFullPropertys;
    };

    calc.roundToTwo = function(num) {
        // Round a Number to 0.X 
        return +(Math.round(num + "e+2") + "e-2");
    };

    calc.isArray = function(obj) {
        return (typeof obj !== 'undefined' &&
            obj && obj.constructor === Array);
    };

    calc.merge_obj = function(obj1, obj2) {
        var obj3 = {};
        for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
        for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
        return obj3;
    }


    // Return
    return calc.getResults(responses);


}
