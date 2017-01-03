$scope.pdf_make_init = function() {


    $scope.d.docDefinition = angular.copy($scope.d.templates.default_definition);

    // All Doc"s here
    $scope.d.docs = [];
    var doc = {};

    // ----------------------------
    // Doc: Notizen
    // ----------------------------
    doc = {
        "id": 0,
        "name": "Notizen",
        "version": "1.0",
        "description": "Ein leeres Blatt für Gesprächsnotizen.",
        "content": []
    };

    var date = $filter("amDateFormat")(new Date(), "DD.MM.YYYY");
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
        "version": "1.0",
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
    doc.content.push($scope.d.templates.heading("h1", "Persönliche Zugangsdaten"));

    var credentials = {
        table: {
            widths: [60, "*"],
            body: [
                [{ text: "Login", color: "grey", margin: [0, 6, 0, 6] }, { text: zugangsdaten.login_pid, fontSize: 16, margin: [0, 6, 0, 6] }],
                [{ text: "Passwort", color: "grey", margin: [0, 6, 0, 6] }, { text: zugangsdaten.login_pw, fontSize: 16, margin: [0, 6, 0, 6] }]
            ]
        },
        layout: "noBorders"
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
        "version": "1.0",
        "description": "Eintritts-Assessment der Klinik Südhang.",
        "content": []
    };
    doc.content.push($scope.d.templates.spacer(10));
    doc.content.push($scope.d.templates.patientAddress_clinicLogo);
    doc.content.push($scope.d.templates.spacer(20));
    doc.content.push($scope.d.templates.title(doc.name, $scope.d.templates.patient));

    var stay_text = "Wir berichten über den Aufenthalt vom " + $scope.d.current_stay.from_to ".";
    doc.content.push($scope.d.templates.text(stay_text));

    doc.content.push($scope.d.appData["ch.suedhang.apps.actinfo_ein"].pdf.eintritt);

    doc.content.push($scope.d.appData["ch.suedhang.apps.tmt_V3"].pdf.eintritt);

    doc.content.push($scope.d.appData["ch.suedhang.apps.aase-g"].pdf.eintritt);

    doc.content.push($scope.d.appData["ch.suedhang.apps.bdi"].pdf.eintritt);

    doc.content.push($scope.d.appData["ch.suedhang.apps.bscl_anq"].pdf.eintritt);

    doc.content.push($scope.d.appData["ch.suedhang.apps.isk"].pdf.eintritt);

    doc.content.push($scope.d.appData["ch.suedhang.apps.sci"].pdf.eintritt);

    doc.content.push($scope.d.appData["com.optinomic.apps.whoqol"].pdf.eintritt);

    doc.content.push($scope.d.templates.spacer(20));
    doc.content.push($scope.d.templates.getCalculatedStamp(doc));


    //  doc.content.push($scope.d.templates.spacer(12));
    //  var bloc = {
    //      "alignment": "left",
    //      "columns": [{
    //          stack: $scope.loadAppPDF("eintritt", [], "ch.suedhang.apps.case.new"),
    //          "margin": [0, 0, 0, 6]
    //      }, {
    //          stack: $scope.loadAppPDF("eintritt", [], "ch.suedhang.apps.case.new"),
    //          "margin": [0, 0, 0, 6]
    //      }],
    //      "columnGap": 24
    //  };
    //  doc.content.push(bloc);



    // Safe
    $scope.d.docs.push(doc);




    // ----------------------------
    // Doc: Austritts-Assessment
    // ----------------------------
    doc = {
        "id": 1,
        "name": "Austritts-Assessment",
        "version": "1.0",
        "description": "Austritts-Assessment der Klinik Südhang.",
        "content": []
    };
    doc.content.push($scope.d.templates.spacer(10));
    doc.content.push($scope.d.templates.patientAddress_clinicLogo);
    doc.content.push($scope.d.templates.spacer(20));
    doc.content.push($scope.d.templates.title(doc.name, $scope.d.templates.patient));

    var stay_text = "Wir berichten über den Aufenthalt vom " + $scope.d.current_stay.from_to ".";
    doc.content.push($scope.d.templates.text(stay_text));

    doc.content.push($scope.d.appData["ch.suedhang.apps.actinfo_ein"].pdf.all);

    doc.content.push($scope.d.appData["ch.suedhang.apps.actinfo_aus"].pdf.all);

    doc.content.push($scope.d.appData["ch.suedhang.apps.aase-g"].pdf.all);

    doc.content.push($scope.d.appData["ch.suedhang.apps.bdi"].pdf.all);

    doc.content.push($scope.d.appData["ch.suedhang.apps.tmt_V3"].pdf.all);

    doc.content.push($scope.d.appData["ch.suedhang.apps.bscl_anq"].pdf.all);

    doc.content.push($scope.d.appData["ch.suedhang.apps.isk"].pdf.all);

    doc.content.push($scope.d.appData["ch.suedhang.apps.sci"].pdf.all);

    doc.content.push($scope.d.appData["com.optinomic.apps.whoqol"].pdf.all);

    doc.content.push($scope.d.templates.spacer(20));
    doc.content.push($scope.d.templates.getCalculatedStamp(doc));

    // Safe
    $scope.d.docs.push(doc);


    // Sort Docs by 'name'
    $scope.d.docs = $scope.sortByKey($scope.d.docs, "name");

    console.log("(DONE) pdf_make_init", $scope.d.docs);
};
