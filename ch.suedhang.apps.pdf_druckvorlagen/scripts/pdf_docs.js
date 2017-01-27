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

    var text_1 = "Sie finden auf unserer Fragebogen-Plattform einige Fragebögen, in denen Sie Aussagen zu verschiedenen Themen und Zeiträumen einschätzen sollen. Am Anfang jedes Fragebogens finden Sie eine kurze Anleitung. Lesen Sie diese bitte sorgfältig durch.Achten Sie dabei auf die hervorgehobenen Angaben zu den Zeiträumen, auf die sich die Fragen und Aussagen beziehen. Diese können von Fragebogen zu Fragebogen unterschiedlich sein.";
    var text_2 = "Alle Fragebögen enthalten Aussagen. Ihre Aufgabe ist zu bewerten, inwieweit diese Aussagen auf Sie bzw. Ihre Situation zutreffen. Antworten Sie möglichst spontan – es gibt keine richtigen oder falschen Antworten. Wichtig ist, dass die jeweilige Antwort für Sie persönlich stimmt.";
    var text_3 = "Wir bitten Sie, die aufgeführten Fragebögen in der bestehenden Reihenfolge lückenlos zu bearbeiten. Zum starten JEDES EINZELNEN Fragebogens klicken Sie am rechten Rand des angegebenen Fragebogens auf «START». Wenn Sie einen Fragebogen fertig bearbeitet und abgeschickt haben, schliessen sie den entsprechenden Tab und gelangen somit wieder auf die Startseite.";
    var text_4 = "Falls Sie Fragen nicht verstehen oder etwas unklar ist, wenden Sie sich an die anwesende Betreuungsperson.";


    doc.content.push($scope.d.templates.spacer(20));
    doc.content.push($scope.d.templates.patientAddress_clinicLogo);
    doc.content.push($scope.d.templates.spacer(20));
    doc.content.push($scope.d.templates.title(doc.name, $scope.d.templates.patient));

    doc.content.push($scope.d.templates.text(text_1));
    doc.content.push($scope.d.templates.text(text_2));
    doc.content.push($scope.d.templates.text(text_3));
    doc.content.push($scope.d.templates.text(text_4));
    doc.content.push($scope.d.templates.heading("h1", "Persönliche Zugangsdaten"));

    var credentials = {
        table: {
            widths: [60, "*"],
            body: [
                [{ text: "Patienten-ID", color: "grey", margin: [0, 0, 0, 6] }, { text: zugangsdaten.login_pid, fontSize: 16, margin: [0, 6, 0, 6] }],
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
        "version": "1.2",
        "description": "Eintritts-Assessment der Klinik Südhang.",
        "content": []
    };
    doc.content.push($scope.d.templates.spacer(10));
    doc.content.push($scope.d.templates.patientAddress_clinicLogo);
    doc.content.push($scope.d.templates.title(doc.name, $scope.d.templates.patient));

    var stay_text = "Wir berichten über den Aufenthalt vom " + $scope.d.current_stay.from_to + ".";
    doc.content.push($scope.d.templates.text(stay_text));
    doc.content.push($scope.d.templates.spacer(12));

    doc.content.push($scope.d.appData["ch.suedhang.apps.actinfo_ein.production"].pdf.eintritt);

    doc.content.push($scope.d.templates.pageBreak());
    doc.content.push($scope.d.appData["ch.suedhang.apps.tmt.production"].pdf.eintritt);

    doc.content.push($scope.d.appData["ch.suedhang.apps.bscl_anq.production"].pdf.eintritt);

    doc.content.push($scope.d.appData["ch.suedhang.apps.aase-g.production"].pdf.eintritt);

    doc.content.push($scope.d.appData["ch.suedhang.apps.bdi.production"].pdf.eintritt);

    doc.content.push($scope.d.appData["ch.suedhang.apps.isk.production"].pdf.eintritt);

    doc.content.push($scope.d.appData["ch.suedhang.apps.sci.production"].pdf.eintritt);

    doc.content.push($scope.d.appData["ch.suedhang.apps.whoqol.production"].pdf.eintritt);

    doc.content.push($scope.d.templates.spacer(20));
    doc.content.push($scope.d.templates.getCalculatedStamp(doc));

    // Safe
    $scope.d.docs.push(doc);




    // ----------------------------
    // Doc: Austritts-Assessment
    // ----------------------------
    doc = {
        "id": 1,
        "name": "Austritts-Assessment",
        "version": "1.2",
        "description": "Austritts-Assessment der Klinik Südhang.",
        "content": []
    };
    doc.content.push($scope.d.templates.spacer(10));
    doc.content.push($scope.d.templates.patientAddress_clinicLogo);
    doc.content.push($scope.d.templates.title(doc.name, $scope.d.templates.patient));

    var stay_text = "Wir berichten über den Aufenthalt vom " + $scope.d.current_stay.from_to + ".";
    doc.content.push($scope.d.templates.text(stay_text));
    doc.content.push($scope.d.templates.spacer(12));

    doc.content.push($scope.d.appData["ch.suedhang.apps.actinfo_ein.production"].pdf.all);

    doc.content.push($scope.d.appData["ch.suedhang.apps.actinfo_aus.production"].pdf.all);

    doc.content.push($scope.d.appData["ch.suedhang.apps.tmt.production"].pdf.all);

    doc.content.push($scope.d.appData["ch.suedhang.apps.bscl_anq.production"].pdf.all);

    doc.content.push($scope.d.appData["ch.suedhang.apps.aase-g.production"].pdf.all);

    doc.content.push($scope.d.appData["ch.suedhang.apps.bdi.production"].pdf.all);

    doc.content.push($scope.d.appData["ch.suedhang.apps.isk.production"].pdf.all);

    doc.content.push($scope.d.appData["ch.suedhang.apps.sci.production"].pdf.all);

    doc.content.push($scope.d.appData["ch.suedhang.apps.whoqol.production"].pdf.all);

    doc.content.push($scope.d.templates.spacer(20));
    doc.content.push($scope.d.templates.getCalculatedStamp(doc));

    // Safe
    $scope.d.docs.push(doc);


    // Sort Docs by 'name'
    $scope.d.docs = $scope.sortByKey($scope.d.docs, "name");

    console.log("(DONE) pdf_make_init", $scope.d.docs);
};
