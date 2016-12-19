$scope.pdf_make_init = function() {


    $scope.d.docDefinition = angular.copy($scope.d.templates.default_definition);

    // All Doc's here
    $scope.d.docs = [];
    var doc = {};

    // ----------------------------
    // Doc: Notizen
    // ----------------------------
    doc = {
        "id": 0,
        "name": "Notizen",
        "description": "Ein leeres Blatt für Gesprächsnotizen.",
        "content": []
    };

    var date = $filter("amDateFormat")(new Date(), 'DD.MM.YYYY');
    doc.content.push($scope.d.templates.text(date));

    var vertical_line = {
        "margin": [0, 0, 0, 0],
        "canvas": [{
            "type": "line",
            "x1": 85,
            "y1": 0,
            "x2": 85,
            "y2": 720,
            "lineWidth": 0.5,
            "lineColor": "#BDBDBD"
        }]
    };
    doc.content.push(vertical_line);


    // Safe
    $scope.d.docs.push(doc);


    // ----------------------------
    // Doc: Patienten-Assessment
    // ----------------------------
    doc = {
        "id": 2,
        "name": "Patienten-Assessment",
        "description": "Drucken der Zugangsdaten sowie einer Kurzeinführung für das Optinomic Patienten-Assessment.",
        "content": []
    };

    var zugangsdaten = $scope.setAssessmentCredentials($scope.d.dataMain.patient);

    var text_1 = "Sie finden im Patienten-Assessment einige Fragebögen, in denen Sie Aussagen zu verschiedenen Themen und Zeiträumen einschätzen sollen. Am Anfang jedes Fragebogens finden Sie eine kurze Anleitung. Lesen Sie diese bitte sorgfältig durch. Achten Sie dabei auf die rot markierten Angaben zu den Zeiträumen, auf die sich die Fragen und Aussagen beziehen. Diese können von Fragebogen zu Fragebogen unterschiedlich sein.";
    var text_2 = "Alle Fragebögen enthalten Aussagen. Ihre Aufgabe ist zu bewerten, inwieweit diese Aussagen auf Sie bzw. Ihre Situation zutreffen. Antworten Sie möglichst spontan – es gibt keine richtigen oder falschen Antworten. Wichtig ist, dass die jeweilige Antwort für Sie persönlich stimmt. Wir bitten Sie, die aufgeführten Fragebögen in der bestehenden Reihenfolge lückenlos zu bearbeiten. Zum starten JEDES EINZELNEN Fragebogens klicken Sie am rechten Rand des angegebenen Fragebogens auf „START“.";
    var text_3 = "Falls Sie Fragen nicht verstehen oder etwas unklar ist, wenden Sie sich an die anwesende Betreuungsperson.";


    doc.content.push($scope.d.templates.spacer(20));
    doc.content.push($scope.d.templates.patientAddress_clinicLogo);
    doc.content.push($scope.d.templates.spacer(20));
    doc.content.push($scope.d.templates.title(doc.name, $scope.d.templates.patient));

    doc.content.push($scope.d.templates.text(text_1));
    doc.content.push($scope.d.templates.text(text_2));
    doc.content.push($scope.d.templates.text(text_3));
    doc.content.push($scope.d.templates.heading('h1', 'Persönliche Zugangsdaten'));

    var credentials = {
        table: {
            widths: [60, '*'],
            body: [
                [{ text: 'Login', color: 'grey', margin: [0, 6, 0, 6] }, { text: zugangsdaten.login_pid, fontSize: 16, margin: [0, 6, 0, 6] }],
                [{ text: 'Passwort', color: 'grey', margin: [0, 6, 0, 6] }, { text: zugangsdaten.login_pw, fontSize: 16, margin: [0, 6, 0, 6] }]
            ]
        },
        layout: 'noBorders'
    };
    doc.content.push(credentials);

    // Safe
    $scope.d.docs.push(doc);


    // ----------------------------
    // Doc: Eintritts-Assessment
    // ----------------------------
    doc = {
        "id": 1,
        "name": "Eintritts-Assessment",
        "description": "Eintritts-Assessment der Klinik Südhang.",
        "content": []
    };
    doc.content.push($scope.d.templates.spacer(10));
    doc.content.push($scope.d.templates.patientAddress_clinicLogo);
    doc.content.push($scope.d.templates.spacer(20));
    doc.content.push($scope.d.templates.title(doc.name, $scope.d.templates.patient));

    doc.content.push($scope.d.appData["ch.suedhang.apps.actinfo_ein"].pdf);
    doc.content.push($scope.d.appData["ch.suedhang.apps.tmt_V3"].pdf);

    doc.content.push($scope.d.templates.pageBreak());

    var bloc = {
        "alignment": 'left',
        "columns": [{
            stack: $scope.loadAppPDF([], 'ch.suedhang.apps.case.new'),
            "margin": [0, 0, 0, 6]
        }, {
            stack: $scope.loadAppPDF([], 'ch.suedhang.apps.case.new'),
            "margin": [0, 0, 0, 6]
        }],
        "columnGap": 24
    };

    doc.content.push(bloc);

    doc.content.push($scope.d.templates.spacer(12));



    doc.content.push($scope.d.templates.pageBreak());
    doc.content.push($scope.d.templates.spacer(20));

    var z_score_block = {
        "stack": [{
            "text": "Überschrift",
            "style": "h3"
        }, {
            "text": "Dies ist ein Standardtext",
            "style": "text"
        }, {
            "alignment": "left",
            "columns": [{
                "width": 110,
                "fontSize": 10,
                "alignment": "right",
                "text": "LINKS: Dies ist ein Standardtext",
                "margin": [0, 14, 0, 0]
            }, {
                "width": "*",
                "stack": [{
                    "columns": [
                        { "text": "Messzeitpunkt", "alignment": "left" },
                        { "text": "Datum", "alignment": "right" }
                    ],
                    "fontSize": 10,
                    "color": "#212121",
                    "margin": [0, 3, 0, 1]
                }, {
                    "canvas": $scope.d.templates.z_score()
                }, {
                    "columns": [
                        { "text": "Messzeitpunkt", "alignment": "left" },
                        { "text": "Datum", "alignment": "right" }
                    ],
                    "fontSize": 10,
                    "color": "#212121",
                    "margin": [0, 3, 0, 1]
                }, {
                    "canvas": $scope.d.templates.z_score()
                }, {
                    "columns": [
                        { "text": "-3", "alignment": "left" },
                        { "text": "-2", "alignment": "left" },
                        { "text": "-1", "alignment": "left" },
                        { "text": "0", "alignment": "center" },
                        { "text": "1", "alignment": "right" },
                        { "text": "2", "alignment": "right" },
                        { "text": "3", "alignment": "right" }
                    ],
                    "fontSize": 9,
                    "color": "#757575"
                }]
            }, {
                "width": 110,
                "fontSize": 10,
                "alignment": "left",
                "text": "RECHTS: Dies ist ein Standardtext für die Beschreibung, diese kann auch sehr lange sein.",
                "margin": [0, 14, 0, 0]
            }],
            "columnGap": 12,
            "margin": [0, 0, 0, 6]
        }]
    };
    doc.content.push(z_score_block);


    // Safe
    $scope.d.docs.push(doc);




    console.log('(DONE) pdf_make_init', $scope.d.docs);
};
