function main(responses) {


    var calc = {};


    // ------------------------------------------
    // D e f i n i t i o n s
    // ------------------------------------------


    // ------------------------------------------
    // H e l p e r   -   F U N C T I O N S
    // ------------------------------------------

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

    calc.create_zusatzitems = function(response, mz) {

        var zusatzitem = {
            "id": parseInt(response.id),
            "items": [{
                "id": 0,
                "name": "Schlechter Appetit",
                "result": null,
                "field": parseInt(response["BSCL[sq504V11]"])
            }, {
                "id": 1,
                "name": "Einschlafschwierigkeiten",
                "result": null,
                "field": parseInt(response["BSCL[sq504V25]"])
            }, {
                "id": 2,
                "name": "Gedanken an den Tod und ans Sterben",
                "result": null,
                "field": parseInt(response["BSCL[sq504V39]"])
            }, {
                "id": 3,
                "name": "Schuldgefühle",
                "result": null,
                "field": parseInt(response["BSCL[sq504V52]"])
            }]
        };

        zusatzitem = Object.assign(zusatzitem, mz);

        // Interpretation
        zusatzitem.items.forEach(function(item, itemID) {
            item.result = "k.A.";

            if (item.field === 0) {
                item.result = "überhaupt nicht";
            };
            if (item.field === 1) {
                item.result = "ein wenig";
            };
            if (item.field === 2) {
                item.result = "ziemlich";
            };
            if (item.field === 3) {
                item.result = "stark";
            };
            if (item.field === 4) {
                item.result = "sehr stark";
            };
            if (isNaN(item.field)) {
                item.result = "k.A.";
                item.field = 99;
            };
        });


        return zusatzitem;
    };

    // ------------------------------------------
    // F U N C T I O N  -  Main
    // ------------------------------------------
    calc.getResults = function(myResponses) {


        var allResults = [];
        var currentPatient = myResponses.patient;

        // Gender:  Position
        // 0 = Männer
        // 1 = Frauen
        var gender_pos = null;
        if (currentPatient.data.gender === 'male') {
            gender_pos = 0;
            patient_in = "Patient";
        } else {
            gender_pos = 1;
            patient_in = "Patientin";
        };

        var responses_array = myResponses.survey_responses;
        responses_array.forEach(function(response, myindex) {
            var d = {};
            var result = response.data.response;


            // -----------------------------------------------
            // Messzeitpunkt
            // -----------------------------------------------
            var mz = {
                "mz_id": 99,
                "mz_typ": 'Undefined',
                "mz_text": 'Undefined',
                "dropout": null,
                "dropout_code": null,
                "dropout_reason": null
            };


            if ("Eintrittsort" in result) {

                var my_messzeitpunkt = parseInt(result['q501V04']);
                var my_eintrittsort = parseInt(result['Eintrittsort']);
                var my_austrittsort = parseInt(result['Austrittsort']);


                if ((my_messzeitpunkt === 1) && (my_eintrittsort === 1)) {
                    mz.mz_id = 0;
                    mz.mz_typ = 'Eintritt EAS';
                    mz.mz_text = 'Eintritt - EAS';
                };

                if ((my_messzeitpunkt === 2) && (my_austrittsort === 2)) {
                    mz.mz_id = 1;
                    mz.mz_typ = 'Austritt EP';
                    mz.mz_text = 'Austritt - EP';
                };


                if (my_messzeitpunkt === 3) {
                    mz.mz_id = 2;
                    mz.mz_typ = 'Übertritt EP';
                    mz.mz_text = 'Übertritt EP';
                };

                if ((my_messzeitpunkt === 1) && (my_eintrittsort === 2)) {
                    mz.mz_id = 4;
                    mz.mz_typ = 'Eintritt EP';
                    mz.mz_text = 'Eintritt - EP';
                };


                if ((my_messzeitpunkt === 2) && (my_austrittsort === 1)) {
                    mz.mz_id = 3;
                    mz.mz_typ = 'Austritt EAS';
                    mz.mz_text = 'Austritt - EAS';
                };
            };

            // Messdatum
            if ('q504V00' in result) {
                mz.mz_date = result.q504V00;
            } else {
                mz.mz_date = result.datestamp;
            };

            mz.mz_datum = calc.formatDateCH(mz.mz_date);

            // Dropout
            if ("q501V05" in result) {
                mz.dropout_code = parseInt(result.q501V05);

                if (mz.dropout_code === 0) {
                    mz.dropout = false;
                } else {
                    mz.dropout = true;

                    if (mz.dropout_code === 1) {
                        mz.dropout_reason = patient_in + " lehnt die Testaufnahme ab.";
                    };

                    if (mz.dropout_code === 2) {
                        mz.dropout_reason = patient_in + " ist aus sprachlichen Gründen nicht in der Lage.";
                    };

                    if (mz.dropout_code === 3) {
                        mz.dropout_reason = patient_in + " ist zu krank.";
                    };

                    if (mz.dropout_code === 4) {
                        mz.dropout_reason = patient_in + " ist verstorben.";
                    };

                    if (mz.dropout_code === 5) {
                        mz.dropout_reason = patient_in + " ist jünger als 18-jährig.";
                    };

                    if (mz.dropout_code === 6) {
                        mz.dropout_reason = patient_in + " ist 7 Tage nach Erhebung des Eintritts-BSCL wieder ausgetreten.";
                    };

                    if (mz.dropout_code === 7) {
                        mz.dropout_reason = patient_in + " ist unvorhergesehen ausgetreten (Abbruch).";
                    };

                    if (mz.dropout_code === 8) {
                        mz.dropout_reason = "Anderer Grund: " + result.q501V06;
                    };

                };
            };

            // -----------------------------------------------
            // Zusatzitems
            // -----------------------------------------------
            d.zusatzitem = calc.create_zusatzitems(result, mz);
            allResults.push(d.zusatzitem);
        });



        // -----------------------------------------------
        // Sort Results
        // -----------------------------------------------

        function sortByKey(array, key) {
            return array.sort(function(a, b) {
                var x = a[key];
                var y = b[key];
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
        }

        allResults = sortByKey(allResults, "mz_date");


        // -----------------------------------------------
        // Build pdfmake Table
        // -----------------------------------------------

        var table = {
            "headerRows": 1,
            "layout": "lightHorizontalLines",
            "margin": [0, 6, 0, 12],
            "table": {
                "widths": [95, "*", "*", "*", "*"],
                "body": []
            }
        };

        var talbe_header = [
            [
                { "text": "Messzeitpunkt", "style": "p", "margin": [0, 0, 0, 0] },
                { "text": "Datum", "style": "chart_p", "margin": [0, 0, 0, 6] },
            ],
            { "text": "Schlechter Appetit", "alignment": "center", "style": "p" },
            { "text": "Einschlaf-schwierigkeiten", "alignment": "center", "style": "p" },
            { "text": "Gedanken an Tod & Sterben", "alignment": "center", "style": "p" },
            { "text": "Schuldgefühle", "alignment": "center", "style": "p" }
        ];

        table.table.body.push(talbe_header);





        allResults.forEach(function(result, resultID) {

            // console.log(resultID, result);

            if (result.dropout) {
                // Dropout
                var messung = [
                    [
                        { "text": result.mz_typ, "style": "p", "margin": [0, 6, 0, 0] },
                        { "text": result.mz_datum, "style": "chart_p", "margin": [0, 0, 0, 6] },
                    ],
                    {
                        "colSpan": 4,
                        "margin": [0, 6, 0, 0],
                        "text": [
                            { "text": result.dropout_reason + "\n", "style": "p" },
                            { "text": "Dropout (" + result.dropout_code + ")", "style": "chart_p", "color": "#F44336" }
                        ]
                    }
                ];
            } else {
                // Daten vorhanden

                var text_0 = "k.A.";
                var text_1 = "k.A.";
                var text_2 = "k.A.";
                var text_3 = "k.A.";

                result.items.forEach(function(item, itemID) {
                    if (parseInt(item.id) === 0) {
                        text_0 = item.result;
                    };
                    if (parseInt(item.id) === 1) {
                        text_1 = item.result;
                    };
                    if (parseInt(item.id) === 2) {
                        text_2 = item.result;
                    };
                    if (parseInt(item.id) === 3) {
                        text_3 = item.result;
                    };

                });
                var messung = [
                    [
                        { "text": result.mz_typ, "style": "p", "margin": [0, 6, 0, 0] },
                        { "text": result.mz_datum, "style": "chart_p", "margin": [0, 0, 0, 6] },
                    ],
                    { "text": text_0, "style": "p", "alignment": "center", "margin": [0, 10, 0, 0] },
                    { "text": text_1, "style": "p", "alignment": "center", "margin": [0, 10, 0, 0] },
                    { "text": text_2, "style": "p", "alignment": "center", "margin": [0, 10, 0, 0] },
                    { "text": text_3, "style": "p", "alignment": "center", "margin": [0, 10, 0, 0] }
                ];
            };


            table.table.body.push(messung);


        });



        var return_stack = {
            "id": "bscl_zusatzangaben",
            "stack": []
        };

        var h2 = {
            "text": "Zusatzangaben",
            "style": "h2",
            "alignment": "left"
        };

        return_stack.stack.push(h2);
        return_stack.stack.push(table);

        var return_obj = {
            "pdfmake": {
                "zusatzangaben": return_stack,
                "toc": [{
                    "id": "zusatzangaben",
                    "name": "Tabelle Zusatzangaben"
                }]
            }
        };


        // debug
        console.log(JSON.stringify(return_stack, null, 2));


        return return_obj;
    };


    // Return
    return calc.getResults(responses);


};