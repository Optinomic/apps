$scope.loadAppData = function(app_identifier, load_full) {
    // -----------------------------------
    // Get Data: d.dataMain
    // -----------------------------------

    var dataPromiseApp = dataService.getMainAppData(app_identifier, load_full);
    dataPromiseApp.then(function(data) {
        $scope.d.loader.count = $scope.d.loader.count + 1;


        // Finishing: Console Info & Init = done.
        $scope.d.haveData = true;
        console.log('Loaded, ', app_identifier, $scope.d.appData);

        // Save Data to $scope.d
        $scope.d.appData[app_identifier] = {
            "data": data,
            "pdf": []
        };
        var run = $scope.getAppFunctionsAPI();
        $scope.d.appData.api = run;


        $scope.d.appData[app_identifier].app_scope = {};
        var pdf = $scope.d.appData[app_identifier].pdf;


        //  BLOCKS pro Applikation erstellen


        // -----------------------------------------------------------------
        // actInfo - Eintritt
        // -----------------------------------------------------------------

        if (app_identifier === 'ch.suedhang.apps.actinfo_ein') {
            pdf.push($scope.d.templates.heading('h2', 'ActInfo | Eintrittsfragebogen'));


            var act_info_ein_block = {
                "alignment": 'left',
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
            col_1.push($scope.d.templates.text('Folgende Substanzen konsumierte ' + $scope.d.dataMain.patient.data.extras.anrede + ' vor dem aktuellen Entzug in der angegebenen Häufigkeit:'));

            var actinfo_ein_problemsubstanzen_tables = run.actinfo_ein_get_problemsubstanzen_table(data.survey_responses_group["0"]);
            actinfo_ein_problemsubstanzen_tables.forEach(function(table, myTableID) {
                var table_to_push = {
                    "table": {
                        "widths": ['*', '*'],
                        "body": [
                            [{ text: 'Substanz', color: 'grey', fontSize: 11, margin: [0, 6, 0, 0] }, { text: 'Häufigkeit', color: 'grey', fontSize: 11, margin: [0, 6, 0, 0] }],
                        ]
                    },
                    "layout": 'lightHorizontalLines'
                };

                table.problemsubstanzen.forEach(function(ps, myTableID) {
                    var substanz = [{ text: ps.substanz, fontSize: 11, margin: [0, 3, 0, 3] }, { text: ps.label, fontSize: 11, margin: [0, 3, 0, 3] }];
                    table_to_push.table.body.push(substanz);
                });
                col_1.push(table_to_push);
            });

            var col_2 = act_info_ein_block.columns["1"].stack;
            col_2.push($scope.d.templates.heading('h3', 'Alkoholabhängigkeit (AUDIT)'));
            col_2.push($scope.d.templates.text('Grafik?'));

            col_2.push($scope.d.templates.heading('h3', 'Nikotinabhängigkeit'));
            col_2.push($scope.d.templates.text('Bei Eintritt in die Entwöhnungsbehandlung bestand keine / eine Ausprägung Nikotinabhängigkeit.'));

            pdf.push(act_info_ein_block);
        };



        // -----------------------------------------------------------------
        // Case
        // -----------------------------------------------------------------

        if (app_identifier === 'ch.suedhang.apps.case.new') {

            pdf.push($scope.d.templates.heading('h2', 'Abschätzung der Schwere einer Alkoholabhängigkeit (CASE)'));
            pdf.push(run.getCaseList());
            pdf.push($scope.d.templates.caption('Interpretation: Ab 15 Punkten ist eine stationäre Therapie indiziert.'));

        };


        // -----------------------------------------------------------------
        // AASE
        // -----------------------------------------------------------------

        if (app_identifier === 'ch.suedhang.apps.aase-g') {

        };

        // -----------------------------------------------------------------
        // TMT
        // -----------------------------------------------------------------

        if (app_identifier === 'ch.suedhang.apps.tmt_V3') {

            var app_scope = $scope.d.appData[app_identifier].app_scope;

            app_scope.ks = run.tmt_loadKS(data.calculations["0"].calculation_results["0"]);
            // Follow the white rabbit
            run.initTMT();

        };





        // Run pdf_make_init when all Data loaded
        if ($scope.checkDataLoaded($scope.d.loader.actions, $scope.d.loader.count)) {
            $scope.pdf_make_init();
            $scope.d.loader.done = true;
        };

    });
};
