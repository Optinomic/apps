/**
 * @name Optinomic - AppCtrl
 * ---------------------------------------
 * Controller of the Optinomic-Application.
 */
app.controller('AppCtrl', function($scope, $filter, dataService, scopeDService) {

    // -----------------------------------
    // Init
    // -----------------------------------

    // Data-Sharing (do not remove)
    $scope.d = scopeDService;


    // -----------------------------------
    // Functions
    // -----------------------------------

    $scope.loadMainData = function() {
        // -----------------------------------
        // Get Data: d.dataMain
        // -----------------------------------
        $scope.d.haveData = true;

        var dataPromiseMain = dataService.getMainAppData();
        dataPromiseMain.then(function(data) {

            // Save Data to $scope.d
            $scope.d.dataMain = data;
            var current_template = $scope.d.dataMain.params.location.viewname;


            // Run App-Functions
            if (current_template === 'print_access') {
                $scope.appInit();
            };


            // Finishing: Console Info & Init = done.
            console.log('Welcome, ', $scope.d.dataMain.apps.current.name, current_template, $scope.d);

            $scope.d.init = true;
        });
    };
    $scope.loadMainData();



    $scope.appInit = function(selected_group) {

        $scope.d.app = {};
        $scope.d.app.selected_group = null;

        $scope.d.templates = $scope.getTemplates();

    };


    // -----------------------------------
    // PDF-Make - Init
    // -----------------------------------

    $scope.setAssessmentCredentials = function(patient) {
        var assessment = {};
        assessment.login_pid = patient.data.cis_pid + '';

        // Password = YYYYMMDD
        var pw = 'Fehler';

        // console.log('?', patient.data.birthdate);

        if ((patient.data.birthdate !== '') && (patient.data.birthdate !== null) && (patient.data.birthdate !== undefined)) {
            pw = patient.data.birthdate;
            pw = pw.substring(0, 10);
            pw = pw.replace('-', '');
            pw = pw.replace('-', '');
        };

        assessment.login_pw = pw;

        return assessment;
    };

    $scope.createPDF = function() {

        $scope.d.docDefinition = angular.copy($scope.d.templates.default_definition);

        var content = $scope.d.docDefinition.content;

        // Fill Content per Patient
        $scope.d.app.selected_group.patients.forEach(function(p, patientID) {

            var patient_full_name = p.data.extras.full_name;
            var patient_birthday_age = p.data.extras.birthday_age;

            var patient_adress = '';
            patient_adress = patient_adress + p.data.ansprache + '\n';
            patient_adress = patient_adress + p.data.last_name + ' ' + p.data.first_name + '\n';
            patient_adress = patient_adress + p.data.address1 + '\n';
            patient_adress = patient_adress + p.data.zip_code + ' ' + p.data.city;

            var zugangsdaten = $scope.setAssessmentCredentials(p);

            var text_1 = "Sie finden im Patienten-Assessment einige Fragebögen, in denen Sie Aussagen zu verschiedenen Themen und Zeiträumen einschätzen sollen. Am Anfang jedes Fragebogens finden Sie eine kurze Anleitung. Lesen Sie diese bitte sorgfältig durch. Achten Sie dabei auf die rot markierten Angaben zu den Zeiträumen, auf die sich die Fragen und Aussagen beziehen. Diese können von Fragebogen zu Fragebogen unterschiedlich sein.";
            var text_2 = "Alle Fragebögen enthalten Aussagen. Ihre Aufgabe ist zu bewerten, inwieweit diese Aussagen auf Sie bzw. Ihre Situation zutreffen. Antworten Sie möglichst spontan – es gibt keine richtigen oder falschen Antworten. Wichtig ist, dass die jeweilige Antwort für Sie persönlich stimmt. Wir bitten Sie, die aufgeführten Fragebögen in der bestehenden Reihenfolge lückenlos zu bearbeiten. Zum starten JEDES EINZELNEN Fragebogens klicken Sie am rechten Rand des angegebenen Fragebogens auf „START“.";
            var text_3 = "Falls Sie Fragen nicht verstehen oder etwas unklar ist, wenden Sie sich an die anwesende Betreuungsperson.";

            // --------------------------------
            // PDF - Templates
            // --------------------------------


            var patientAddress_clinicLogo = {
                "alignment": "left",
                "columns": [{
                    "stack": [{
                        "margin": [0, 72, 0, 0],
                        "text": " " + patient_adress
                    }]
                }, {
                    "width": 220,
                    "stack": [{
                        "width": 220,
                        "image": d.images.suedhang
                    }, {
                        "margin": [0, 6, 0, 0],
                        "fontSize": 10,
                        "color": "#69604d",
                        "alignment": "left",
                        "text": " Kompetenzzentrum für Mensch und Sucht"
                    }, {
                        "margin": [0, 3, 0, 0],
                        "fontSize": 10,
                        "color": "#69604d",
                        "alignment": "left",
                        "text": " Südhang 1"
                    }, {
                        "margin": [0, 3, 0, 0],
                        "fontSize": 10,
                        "color": "#69604d",
                        "alignment": "left",
                        "text": " CH - 3038 Kirchlindach"
                    }, {
                        "margin": [0, 12, 0, 0],
                        "fontSize": 10,
                        "color": "#69604d",
                        "alignment": "left",
                        "text": " Telefon + 41 31 828 14 14"
                    }, {
                        "margin": [0, 3, 0, 0],
                        "fontSize": 10,
                        "color": "#69604d",
                        "alignment": "left",
                        "text": " Fax +41 31 828 14 24"
                    }]
                }]
            };;

            content.push($scope.d.templates.spacer(10));
            content.push(patientAddress_clinicLogo);
            content.push($scope.d.templates.title('Patienten-Assessment', patient_full_name + ' (' + patient_birthday_age + ')'));
            content.push($scope.d.templates.spacer(12));
            content.push($scope.d.templates.text(text_1));
            content.push($scope.d.templates.text(text_2));
            content.push($scope.d.templates.text(text_3));
            content.push($scope.d.templates.heading('h1', 'Persönliche Zugangsdaten'));

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
            content.push(credentials);

            content.push($scope.d.templates.pageBreak());
        });

        content.push($scope.d.templates.heading('h1', 'Patienten- / Anwesenheitsliste'));
        var anwesenheit = {
            table: {
                widths: [40, '*'],
                body: [
                    [{ text: ' Anwesend', color: 'gray', fontSize: 9, margin: [0, 3, 0, 3] }, { text: ' Patient / Patientin', color: 'gray', margin: [0, 3, 0, 3] }]
                ]
            },
            layout: 'lightHorizontalLines'
        };

        // Fill Content per Patient
        $scope.d.app.selected_group.patients.forEach(function(p, patientID) {
            var patient_full_name = p.data.extras.full_name;
            var patient_birthday_age = p.data.extras.birthday_age;
            var patient_text = ['', { text: " " + patient_full_name + ' (' + patient_birthday_age + ')', margin: [0, 3, 0, 3] }]
            anwesenheit.table.body.push(patient_text);
        });
        content.push(anwesenheit);


    };

    $scope.getTemplates = function() {

        var d = {};


        // --------------------------------
        // Variablen
        // --------------------------------
        d.klinik = $scope.d.dataMain.config.data.customer.contact.name + '\n' + $scope.d.dataMain.config.data.customer.contact.slogan;





        // --------------------------------
        // PDF - Template-Functions
        // --------------------------------


        d.keepTogether = function(given_stack_array) {

            var isArray = function(obj) {
                return (typeof obj !== 'undefined' &&
                    obj && obj.constructor === Array);
            };

            var stack_array = [];

            if (isArray(given_stack_array)) {
                // Array
                stack_array = given_stack_array;
            } else {
                // Object
                stack_array.push(given_stack_array);
            };

            var return_obj = {
                "id": "keepTogetherTable",
                "layout": "noBorders",
                "table": {
                    "dontBreakRows": true,
                    "headerRows": 0,
                    "body": [
                        [{
                            "stack": stack_array
                        }]
                    ]
                }
            };

            return return_obj;
        };

        d.spacer = function(space) {

            space = space === undefined ? 10 : space;

            return {
                "text": "",
                "margin": [0, space, 0, space]
            };
        };

        d.title = function(title, subtitle) {

            title = title === undefined ? "" : title;
            subtitle = subtitle === undefined ? "" : subtitle;

            return {
                "stack": [
                    // second column consists of paragraphs
                    {
                        "text": " " + title,
                        "style": "title",
                        "alignment": "left"
                    }, {
                        "text": " " + subtitle,
                        "style": "caption",
                        "color": "#616161",
                        "margin": [1, 0, 0, 0],
                        "alignment": "left"
                    }
                ],
                "margin": [0, 24, 0, 36]
            };
        };

        d.heading = function(style, text_left, text_right) {

            text_left = text_left === undefined ? "" : text_left;
            text_right = text_right === undefined ? null : text_right;
            style = style === undefined ? "h2" : style;

            if ((style !== "h1") && (style !== "h2") && (style !== "h3")) {
                style = "";
            };

            var left = {
                "text": " " + text_left,
                "style": style,
                "alignment": "left"
            };

            if ((style === "h1") || (style === "h2")) {
                left.color = "#69604d";
            };

            var return_obj = left;

            var right = {
                "text": " " + text_right,
                "style": style,
                "alignment": "right",
                "fontSize": 9,
                "bold": false,
                "color": "#9E9E9E"
            };


            if (text_right !== null) {
                var cols = {
                    "columns": []
                };
                cols.columns.push(left);
                cols.columns.push(right);

                return_obj = cols;
            };

            return return_obj;
        };

        d.text = function(text) {

            text = text === undefined ? "Optinomic" : text;

            return {
                "text": " " + text,
                "style": "p"
            };
        };

        d.caption = function(text) {

            text = text === undefined ? "Optinomic" : text;

            return {
                "text": text,
                "style": "caption"
            };
        };

        d.pageBreak = function(when) {
            when = when === undefined ? "after" : when;
            return { "fontSize": 0, "text": "", "pageOrientation": "portrait", "pageBreak": when };
        };

        d.horizontalLine = function(width) {
            width = width === undefined ? 100 : width;

            var length = 514 / 100 * width;

            var return_obj = {
                "margin": [0, 12, 0, 0],
                "canvas": [{
                    "type": "line",
                    "x1": 0,
                    "y1": 0,
                    "x2": length,
                    "y2": 0,
                    "lineWidth": 1,
                    "lineColor": "#BDBDBD"
                }]
            };


            return return_obj;
        };

        // --------------------------------
        // Default Definition
        // --------------------------------

        d.default_definition = {
            "pageSize": 'A4',
            "pageOrientation": 'portrait',
            "header": {
                "columns": [
                    { "text": "Patienten-Assessment", "alignment": 'left', "style": 'header' },
                    { "text": d.klinik, "alignment": 'right', "style": 'header' }
                ]
            },
            "footer": function(currentPage, pageCount) {
                var obj = {
                    "columns": [
                        { "text": "Zugangsdaten", "alignment": 'left', "style": 'footer' },
                        { "text": "", "alignment": 'right', "style": 'footer' }
                    ]
                };
                return obj;
            },
            "content": [],
            "styles": {
                "header": {
                    "fontSize": 11,
                    "bold": false,
                    "color": "#9E9E9E",
                    "alignment": "left",
                    "margin": [40, 20, 40, 40]
                },
                "footer": {
                    "fontSize": 11,
                    "bold": false,
                    "color": "#9E9E9E",
                    "alignment": "left",
                    "margin": [40, 0, 40, 40]
                },
                "title": {
                    "fontSize": 36,
                    "bold": false,
                    "color": "#69604d",
                    "alignment": "left",
                    "margin": [0, 40, 0, 0]
                },
                "caption": {
                    "fontSize": 11,
                    "bold": false,
                    "color": "#757575",
                    "alignment": "left",
                    "margin": [0, 0, 0, 0]
                },
                "h1": {
                    "fontSize": 18,
                    "bold": false,
                    "color": "#424242",
                    "alignment": "left",
                    "margin": [0, 40, 0, 24]
                },
                "h2": {
                    "fontSize": 15,
                    "bold": false,
                    "color": "#212121",
                    "alignment": "left",
                    "margin": [0, 20, 0, 12]
                },
                "h3": {
                    "bold": true,
                    "color": "#212121",
                    "alignment": "left",
                    "margin": [0, 0, 0, 6]
                },
                "p": {
                    "color": "#212121",
                    "alignment": "left",
                    "fontSize": 12,
                    "margin": [0, 0, 0, 6]
                }
            },
            "defaultStyle": {
                "alignment": "left"
            }
        };

        return d;
    };



    // -----------------------------------
    // PDF-Make - Handles
    // -----------------------------------

    $scope.pdf_open = function() {
        $scope.createPDF();
        console.log('(!) pdf_open', $scope.d.docDefinition);
        pdfMake.createPdf($scope.d.docDefinition).open();
    };

    $scope.pdf_download = function() {
        $scope.createPDF();
        console.log('(!) pdf_download', $scope.d.docDefinition);
        pdfMake.createPdf($scope.d.docDefinition).download();
    };

    // To Inline in Page |  No needed for now.
    $scope.pdf_create = function() {
        const pdfDocGenerator = pdfMake.createPdf($scope.d.docDefinition);
        pdfDocGenerator.getDataUrl((dataUrl) => {
            const targetElement = document.querySelector('#iframeContainer');
            const iframe = document.createElement('iframe');
            iframe.src = dataUrl;
            targetElement.appendChild(iframe);
        });
    };



});
