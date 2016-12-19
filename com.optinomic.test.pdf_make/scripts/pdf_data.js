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

                var date = $filter("amDateFormat")(data.survey_responses["0"].entity.data.filled, 'DD.MM.YYYY');
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
                actinfo_ein_stack.push($scope.d.templates.noData(app_identifier, 96));
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
                case_stack.push($scope.d.templates.noData(app_identifier, 96));
            };

            var return_obj = {
                "stack": case_stack,
                "margin": [0, 0, 0, 6]
            };

            pdf.eintritt.push(return_obj);
            pdf.all.push(return_obj);
        };


        // -----------------------------------------------------------------
        // AASE
        // -----------------------------------------------------------------
        if (app_identifier === "ch.suedhang.apps.aase-g") {

            var app_title = "AASE"

            var aase_stack = [];
            aase_stack.push($scope.d.templates.horizontalLine(48));
            aase_stack.push($scope.d.templates.heading("h2", app_title));

            if (data.survey_responses.length > 0) {} else {
                aase_stack.push($scope.d.templates.noData(app_identifier, 96));
            };

            var return_obj = {
                "stack": aase_stack,
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
            var description_full = "Der Quotient B /A stellt das 'reine' Maß der im Trail Making Test B erhobenen exekutiven Funktionen dar und ist unabhängig von einer evtl. vorliegenden Verlangsamung. Normwerte sind für letzteren Kennwert nur für Personen ≥ 50-jährig verfügbar. Faustregel: ein B/A-Quotient > 2.5 gilt als Hinweis für eine auffällige Testleistung.";

            pdf.all.push($scope.d.templates.horizontalLine(100));
            pdf.all.push($scope.d.templates.heading("h2", app_title));
            pdf.all.push($scope.d.templates.text(description));
            pdf.eintritt = angular.copy(pdf.all);

            // Nur für 'Alle Resultate'
            pdf.all.push($scope.d.templates.text(description_full));
            pdf.all.push($scope.d.templates.spacer(12));

            if (data.survey_responses.length > 0) {
                var app_scope = $scope.d.appData[app_identifier].app_scope;
                app_scope.ks = run.tmt_loadKS(data.calculations["0"].calculation_results["0"]);
                run.tmt_initTMT();
            } else {
                pdf.eintritt.push($scope.d.templates.noData(app_identifier, 96));
                pdf.all.push($scope.d.templates.noData(app_identifier, 96));
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

            // Nur für 'Alle Resultate'
            pdf.all.push($scope.d.templates.text(description_full));
            pdf.all.push($scope.d.templates.spacer(12));

            if (data.survey_responses.length > 0) {
                var app_scope = $scope.d.appData[app_identifier].app_scope;
                run.bscl_loadKS();
            } else {
                pdf.eintritt.push($scope.d.templates.noData(app_identifier, 96));
                pdf.all.push($scope.d.templates.noData(app_identifier, 96));
            };

        };





        // Run pdf_make_init when all Data loaded
        if ($scope.checkDataLoaded($scope.d.loader.actions, $scope.d.loader.count)) {
            $scope.pdf_make_init();
            $scope.d.loader.done = true;
        };

    });
};
