$scope.loadAppData = function(app_identifier, load_full) {
    // -----------------------------------
    // Get Data: d.dataMain
    // -----------------------------------

    var dataPromiseApp = dataService.getMainAppData(app_identifier, load_full);
    dataPromiseApp.then(function(data) {
        $scope.d.loader.count = $scope.d.loader.count + 1;


        // Finishing: Console Info & Init = done.
        $scope.d.haveData = true;
        console.log("Loaded, ", app_identifier, $scope.d.appData);

        // Save Data to $scope.d
        var appData = {
            "app_scope": {},
            "data": data,
            "pdf": {
                "all": [],
                "eintritt": []
            }
        };
        $scope.d.appData[app_identifier] = appData;

        var run = $scope.getAppFunctionsAPI();
        $scope.d.appData.api = run;



        var pdf = $scope.d.appData[app_identifier].pdf;


        //  BLOCKS pro Applikation erstellen


        // -----------------------------------------------------------------
        // actInfo - Eintritt
        // -----------------------------------------------------------------
        if (app_identifier === "ch.suedhang.apps.actinfo_ein") {

            var app_title = "ActInfo | Eintrittsfragebogen";

            var actinfo_ein_stack = [];
            actinfo_ein_stack.push($scope.d.templates.horizontalLine(100));

            if (data.survey_responses.length > 0) {

                var date = $filter("amDateFormat")(data.survey_responses["0"].entity.data.filled, "DD.MM.YYYY");
                actinfo_ein_stack.push($scope.d.templates.heading("h2", app_title, date));

                var act_info_ein_block = {
                    "alignment": "left",
                    "columns": [{
                        "stack": [],
                        "margin": [0, 0, 0, 6]
                    }, {
                        "stack": [],
                        "margin": [0, 0, 0, 6]
                    }],
                    "columnGap": 24
                };


                var col_1 = act_info_ein_block.columns["0"].stack;
                col_1.push($scope.d.templates.heading("h3", "Substanzkonsum"));
                col_1.push($scope.d.templates.text("Folgende Substanzen konsumierte " + $scope.d.dataMain.patient.data.extras.anrede + " vor dem aktuellen Entzug in der angegebenen Häufigkeit:"));

                var actinfo_ein_problemsubstanzen_tables = run.actinfo_ein_get_problemsubstanzen_table(data.survey_responses_group["0"]);
                actinfo_ein_problemsubstanzen_tables.forEach(function(table, myTableID) {
                    var table_to_push = {
                        "table": {
                            "widths": ["*"],
                            "body": [
                                [{ "text": "Substanz: Häufigkeit", "color": "grey", "fontSize": 9, "margin": [0, 6, 0, 3] }],
                            ]
                        },
                        "layout": "lightHorizontalLines"
                    };

                    table.problemsubstanzen.forEach(function(ps, myTableID) {
                        var substanz = [{
                            "text": [
                                { "text": ps.substanz + ": ", "bold": true, "fontSize": 11 },
                                { "text": ps.label, "bold": false, "fontSize": 11 }
                            ],
                            "margin": [0, 3, 0, 3]
                        }];
                        table_to_push.table.body.push(substanz);
                    });
                    col_1.push(table_to_push);
                });


                // AUDIT | Fagerström

                var act_info_ein_calculation = $scope.d.appData[app_identifier].data.calculations["0"].calculation_results;

                var audit_stack = {
                    "stack": [],
                    "margin": [0, 0, 0, 12]
                };

                var fagerstroem_stack = {
                    "stack": [],
                    "margin": [0, 0, 0, 6]
                };

                act_info_ein_calculation.forEach(function(calc, calcID) {
                    var date = $filter("amDateFormat")(calc.response.data.filled, "DD.MM.YYYY");

                    var audit_text = "Am " + date + " wies " + $scope.d.dataMain.patient.data.extras.anrede + " im AUDIT " + calc.AUDIT.AUDIT_Score + " Punkte auf."
                    audit_text = audit_text + ", was auf eine «" + calc.AUDIT.interpretation.result + "» schliesen lässt."
                    audit_stack.stack.push(audit_text);

                    var fagerstroem_text = calc.FAGERSTROEM.interpretation.result;
                    fagerstroem_text = fagerstroem_text.replace("Abhängigkeit.", "Nikotinabhängigkeit");
                    fagerstroem_text = "Bei Eintritt in die Entwöhnungsbehandlung bestand eine «" + fagerstroem_text + "»."
                    fagerstroem_stack.stack.push(fagerstroem_text);
                });

                var col_2 = act_info_ein_block.columns["1"].stack;
                col_2.push($scope.d.templates.heading("h3", "Alkoholabhängigkeit (AUDIT)"));
                col_2.push(audit_stack);

                col_2.push($scope.d.templates.heading("h3", "Nikotinabhängigkeit (Fagerström)"));
                col_2.push(fagerstroem_stack);

                actinfo_ein_stack.push(act_info_ein_block);
            } else {
                actinfo_ein_stack.push($scope.d.templates.heading("h2", app_title));
                actinfo_ein_stack.push($scope.d.templates.noData(app_identifier, 84));
            };

            var return_obj = {
                "stack": actinfo_ein_stack,
                "margin": [0, 0, 0, 6]
            };

            pdf.eintritt.push(return_obj);
            pdf.all.push(return_obj);
        };

        // -----------------------------------------------------------------
        // Case
        // -----------------------------------------------------------------
        if (app_identifier === "ch.suedhang.apps.case.new") {

            var app_title = "Abschätzung der Schwere einer Alkoholabhängigkeit (CASE)";

            var case_stack = [];
            case_stack.push($scope.d.templates.horizontalLine(48));
            case_stack.push($scope.d.templates.heading("h2", app_title));

            if (data.survey_responses.length > 0) {
                case_stack.push(run.getCaseList());
                case_stack.push($scope.d.templates.caption("Interpretation: Ab 15 Punkten ist eine stationäre Therapie indiziert."));
            } else {
                case_stack.push($scope.d.templates.noData(app_identifier, 84));
            };

            var return_obj = {
                "stack": case_stack,
                "margin": [0, 0, 0, 6]
            };

            pdf.eintritt.push(return_obj);
            pdf.all.push(return_obj);
        };

        // -----------------------------------------------------------------
        // TMT
        // -----------------------------------------------------------------
        if (app_identifier === "ch.suedhang.apps.tmt_V3") {

            var app_title = "Trail Making Test (TMT)";
            var description = "Mit dem TMT wird die Fähigkeit zum visuellen Scannen, sowie die psychomotorische Geschwindigkeit (TMT A) und Leistungen der exekutiven Funktionen, insbesondere kognitive Flexibilität und Switching (TMT B) erfasst.";
            var description_full = "Der Quotient B /A stellt das reine Mass der im Trail Making Test B erhobenen exekutiven Funktionen dar und ist unabhängig von einer evtl. vorliegenden Verlangsamung. Normwerte sind für letzteren Kennwert nur für Personen ≥ 50-jährig verfügbar. Faustregel: ein B/A-Quotient > 2.5 gilt als Hinweis für eine auffällige Testleistung.";

            pdf.all.push($scope.d.templates.horizontalLine(100));
            pdf.all.push($scope.d.templates.heading("h2", app_title));
            pdf.all.push($scope.d.templates.text(description));
            pdf.eintritt = angular.copy(pdf.all);

            // Nur für "Alle Resultate"
            pdf.all.push($scope.d.templates.text(description_full));
            pdf.all.push($scope.d.templates.spacer(12));

            if (data.survey_responses.length > 0) {
                var app_scope = $scope.d.appData[app_identifier].app_scope;
                app_scope.ks = run.tmt_loadKS(data.calculations["0"].calculation_results["0"]);
                run.tmt_initTMT();
            } else {
                pdf.eintritt.push($scope.d.templates.noData(app_identifier, 84));
                pdf.all.push($scope.d.templates.noData(app_identifier, 84));
            };
        };

        // -----------------------------------------------------------------
        // BSCL
        // -----------------------------------------------------------------
        if (app_identifier === "ch.suedhang.apps.bscl_anq") {

            var app_title = "Brief Symptom Checklist (BSCL)";
            var description = "Die „Brief Symptom Checklist“ (BSCL) ist die Kurzform der SCL-90. Es handelt sich bei der BSCL um eine deutschsprachige Übersetzung von G.H. Franke, deren Ursprung in dem amerikanischen „Brief Symptom Inventory“ (BSI) von L.R. Derogatis (1975) zu finden ist.";
            var description_full = "Es handelt sich bei den 53 Items der BSCL um die fünf bis sechs ladungsstärksten Items pro Skala aus der 90 Items umfassenden SCL-90. Die Urheber- und Markenrechte an der BSCL liegen beim Hogrefe Verlag.";

            pdf.all.push($scope.d.templates.horizontalLine(100));
            pdf.all.push($scope.d.templates.heading("h2", app_title));
            pdf.all.push($scope.d.templates.text(description));
            pdf.eintritt = angular.copy(pdf.all);

            // Nur für "Alle Resultate"
            pdf.all.push($scope.d.templates.text(description_full));

            if (data.survey_responses.length > 0) {
                run.bscl();
            } else {
                pdf.eintritt.push($scope.d.templates.noData(app_identifier, 84));
                pdf.all.push($scope.d.templates.noData(app_identifier, 84));
            };
        };

        // -----------------------------------------------------------------
        // AASE-G
        // -----------------------------------------------------------------
        if (app_identifier === "ch.suedhang.apps.aase-g") {

            var app_title = "Abstinenzzuversicht (AASE-G)";
            var description = "Schwierigkeit der Hauptproblemsubstanz zu widerstehen";

            pdf.all.push($scope.d.templates.horizontalLine(100));
            pdf.all.push($scope.d.templates.heading("h2", app_title));
            pdf.eintritt = angular.copy(pdf.all);

            // Nur für "Alle Resultate"

            if (data.survey_responses.length > 0) {
                data.survey_responses.forEach(function(sr, srID) {

                    var calc = sr.calculations["0"].calculation_result;

                    // 1 = Eintritt | 2 = Austritt | 3=Anderer Messzeitpunkt
                    var mz = 3; // Default für "Unbekannt"
                    if ("Erhebungszeitpunkt" in sr.entity.data.response) {
                        mz = parseInt(sr.entity.data.response.Erhebungszeitpunkt);
                    };

                    var date = $filter("amDateFormat")(sr.entity.data.filled, "DD.MM.YYYY");
                    if ("Datum" in sr.entity.data.response) {
                        date = $filter("amDateFormat")(sr.entity.data.response.Datum, "DD.MM.YYYY");
                    };

                    var ranges = [{
                        "from": 20,
                        "text": "sehr geringe Abstinenzzuversicht"
                    }, {
                        "from": 40,
                        "text": "geringe Abstinenzzuversicht"
                    }, {
                        "from": 60,
                        "text": "hohe Abstinenzzuversicht"
                    }, {
                        "from": 80,
                        "text": "sehr hohe Abstinenzzuversicht"
                    }];

                    var interpretation = {};
                    ranges.forEach(function(range, rangeID) {
                        if (parseInt(calc.score) >= range.from) {
                            interpretation = range;
                        };
                    });


                    var score_text = "Am " + date + " wies " + $scope.d.dataMain.patient.data.extras.anrede + " im AASE-G " + calc.score + " Punkte auf. ";
                    score_text = score_text + "Ensprechend liegt eine «" + interpretation.text + "» für die Hauptproblemsubstanz vor.";


                    var scales = {
                        "alignment": "center",
                        "columns": [{
                            "text": [{ "text": "Negativer\nAffekt\n", "style": "p" }, { "text": calc.mean_negativer_affekt.toString(), "style": "h3" }]
                        }, {
                            "text": [{ "text": "Soziale\nSituationen\n", "style": "p" }, { "text": calc.mean_soziale_situationen.toString(), "style": "h3" }]
                        }, {
                            "text": [{ "text": "Somatisches\nUnwohlsein\n", "style": "p" }, { "text": calc.mean_somatisches_unwohlsein.toString(), "style": "h3" }]
                        }, {
                            "text": [{ "text": "Entzugs-\nerscheinungen\n", "style": "p" }, { "text": calc.mean_entzugserscheinungen.toString(), "style": "h3" }]
                        }]
                    };

                    var return_obj = {
                        "stack": [],
                        "margin": [0, 0, 0, 0]
                    }
                    return_obj.stack.push($scope.d.templates.text(score_text));
                    return_obj.stack.push(scales);


                    if (mz === 1) {
                        pdf.eintritt.push(return_obj);
                    };
                    pdf.all.push(return_obj);

                });

            } else {
                pdf.eintritt.push($scope.d.templates.noData(app_identifier, 84));
                pdf.all.push($scope.d.templates.noData(app_identifier, 84));
            };
        };

        // -----------------------------------------------------------------
        // BDI-II
        // -----------------------------------------------------------------
        if (app_identifier === "ch.suedhang.apps.bdi") {

            var app_title = "Beck-Depressions-Inventar (BDI-II)";
            var description = "Schweregrad depressiver Symptomatik im klinischen Bereich.";

            pdf.all.push($scope.d.templates.horizontalLine(100));
            pdf.all.push($scope.d.templates.heading("h2", app_title));
            pdf.eintritt = angular.copy(pdf.all);


            if (data.survey_responses.length > 0) {

                var intro_text = $scope.d.dataMain.patient.data.extras.anrede + " wurde " + data.survey_responses.length + "x während des Aufenthaltes anhand des Selbstbeurteilungsinstruments «BDI-II» getestet:";
                pdf.all.push($scope.d.templates.text(intro_text));
                pdf.eintritt.push($scope.d.templates.text(intro_text));

                var list_array = [];

                data.survey_responses.forEach(function(sr, srID) {

                    var calc = sr.calculations["0"].calculation_result;


                    var date = $filter("amDateFormat")(sr.entity.data.filled, "DD.MM.YYYY");

                    var score = calc.score.score;
                    var interpretation = calc.score.current_range.interpretation_de;
                    var messung_text = "Am " + date + " wurden " + score.toString() + " Punkte erreicht, was als eine «" + interpretation + "» interpretiert werden kann.";

                    list_array.push($scope.d.templates.text(messung_text));
                });


                var messungen_liste = {
                    "ul": list_array,
                    "margin": [0, 0, 0, 6]
                };

                pdf.all.push(messungen_liste);
                pdf.eintritt.push(messungen_liste);


            } else {
                pdf.eintritt.push($scope.d.templates.noData(app_identifier, 84));
                pdf.all.push($scope.d.templates.noData(app_identifier, 84));
            };
        };

        // -----------------------------------------------------------------
        // ISK
        // -----------------------------------------------------------------
        if (app_identifier === "ch.suedhang.apps.isk") {

            var app_title = "Soziale Kompetenzen (ISK)";
            var description = "Das Inventar Sozialer Kompetenzen (Kurzversion) erfasst in 33 Aussagen persönliche Verhaltensweisen und Gewohnheiten zu den vier Bereichen: Soziale Orientierung, Offensivität, Selbststeuerung und Reflexibilität.";
            var description_full = "Soziale Kompetenzen sind für unser Funktionieren in der Gesellschaft notwendig. Sind sie zu sehr auf einen selber oder zu sehr auf die Gesellschaft ausgerichtet, dann funktioniert das Zusammenspiel nicht. Mittlere Ausprägungen, welche beide Aspekte berücksichtigen sind daher am günstigsten.";

            pdf.all.push($scope.d.templates.horizontalLine(100));
            pdf.all.push($scope.d.templates.heading("h2", app_title));
            pdf.all.push($scope.d.templates.text(description));
            pdf.eintritt = angular.copy(pdf.all);

            // Nur für "Alle Resultate"
            pdf.all.push($scope.d.templates.text(description_full));

            if (data.survey_responses.length > 0) {
                run.isk();
            } else {
                pdf.eintritt.push($scope.d.templates.noData(app_identifier, 84));
                pdf.all.push($scope.d.templates.noData(app_identifier, 84));
            };
        };


        // Run pdf_make_init when all Data loaded
        if ($scope.checkDataLoaded($scope.d.loader.actions, $scope.d.loader.count)) {
            $scope.pdf_make_init();
            $scope.d.loader.done = true;
        };

    });
};
