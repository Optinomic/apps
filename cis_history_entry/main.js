/**
 * @name Optinomic - AppCtrl
 * ---------------------------------------
 * Controller of the Optinomic-Application.
 */
app.controller('AppCtrl', function($scope, dataService, scopeDService) {

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
        $scope.d.haveData = false;
        var dataPromiseMain = dataService.getMainAppData();
        dataPromiseMain.then(function(data) {

            // Save Data to $scope.d
            $scope.d.dataMain = data;

            // Run App-Functions
            $scope.appInit();
            $scope.getHisoryEntrys();


            // Finishing: Console Info & Init = done.
            console.log('Welcome, ', $scope.d.dataMain.apps.current.name, $scope.d);
            $scope.d.init = true;
        });
    };
    $scope.loadMainData();



    $scope.appInit = function() {
        $scope.d.nodeTree = 'hisoryentrys';
        $scope.d.appState = 'show'
        $scope.d.haveData = true;


        $scope.d.tarmed = [{
            "Name": "Grundleistungen",
            "Code": "00",
            "Kapitel": [{
                "Name": "Ärztliche Zeugnisse, Berichte, Schreiben",
                "Code": "00.06",
                "Tarifposition": [{
                    "Name": "Formalisierter Arztbericht",
                    "Beschreibung": "KV , UV , MV (Zwischenbericht, Verlaufsbericht, Formalisiertes Beiblatt IV",
                    "Code": "00.2205"
                }]
            }]
        }, {
            "Name": "Psychiatrie",
            "Code": "02",
            "Kapitel": [{
                "Name": "Psychiatrische Diagnostik und Therapie",
                "Code": "02.01",
                "Tarifposition": [{
                    "Name": "Einzeltherapie, erste Sitzung",
                    "Code": "02.0010"
                }, {
                    "Name": "Einzeltherapie, jede weitere Sitzung",
                    "Code": "02.0020"
                }, {
                    "Name": "Paartherapie",
                    "Code": "02.0030"
                }, {
                    "Name": "Familientherapie",
                    "Code": "02.0040"
                }, {
                    "Name": "Gruppentherapie",
                    "Code": "02.0050"
                }, {
                    "Name": "Telefonische Konsultation durch den Facharzt für Psychiatrie",
                    "Code": "02.0060"
                }, {
                    "Name": "Ärztliche Leistung in Abwesenheit des Patienten(inkl.Aktenstudium) durch den Facharzt für Psychiatrie",
                    "Code": "02.0070"
                }, {
                    "Name": "Psychiatrische Krisenintervention",
                    "Code": "02.0080"
                }, {
                    "Name": "Psychologische und psychiatrische Testabklärung durch den Facharzt, als alleinige psychiatrische Leistung",
                    "Code": "02.0090"
                }]
            }, {
                "Name": "Nichtärztliche Diagnostik und Therapie in der Psychiatrie",
                "Code": "02.02",
                "Tarifposition": [{
                    "Name": "Einzelsetting",
                    "Code": "02.0110"
                }, {
                    "Name": "Paarsetting",
                    "Code": "02.0120"
                }, {
                    "Name": "Familiensetting",
                    "Code": "02.0130"
                }, {
                    "Name": "Gruppensetting",
                    "Code": "02.0140"
                }, {
                    "Name": "Telefonische Konsultation durch behandelnden Psychologen / Psychotherapeuten",
                    "Code": "02.0150"
                }, {
                    "Name": "Leistung in Abwesenheit des Patienten durch behandelnden Psychologen / Psychotherapeuten",
                    "Code": "02.0160"
                }]
            }, {
                "Name": "Delegierte psychotherapeutische Behandlung in der Arztpraxis",
                "Code": "02.03",
                "Tarifposition": [{
                    "Name": "Einzelsetting",
                    "Code": "02.0210"
                }, {
                    "Name": "Paarsetting",
                    "Code": "02.0220"
                }, {
                    "Name": "Familiensetting",
                    "Code": "02.0230"
                }, {
                    "Name": "Gruppensetting",
                    "Code": "02.0240"
                }, {
                    "Name": "Telefonische Konsultation durch delegierten Psychologen / Psychotherapeuten",
                    "Code": "02.0250"
                }, {
                    "Name": "Leistung in Abwesenheit des Patienten durch delegierten Psychologen / Psychotherapeuten",
                    "Code": "02.0260"
                }]
            }, {
                "Name": "Nichtärztliche ambulante Behandlung in der Psychiatrie",
                "Code": "02.04",
                "Tarifposition": [{
                    "Name": "Einzelsetting",
                    "Code": "02.0310"
                }, {
                    "Name": "Paarsetting",
                    "Code": "02.0320"
                }, {
                    "Name": "Familiensetting",
                    "Code": "02.0330"
                }, {
                    "Name": "Gruppensetting",
                    "Code": "02.0340"
                }, {
                    "Name": "Telefonische Konsultation durch nichtärztliches, behandelndes Personal in der Psychiatrie",
                    "Code": "02.0350"
                }, {
                    "Name": "Leistungen in Abwesenheit des Patienten durch nichtärztliches, behandelndes Personal in der Psychiatrie",
                    "Code": "02.0360"
                }]
            }]
        }];


    };



    $scope.entryCancel = function() {
        $scope.d.appState = 'show';
    };

    $scope.entryNew = function() {
        $scope.d.appState = 'new';

        // Init New Entry
        $scope.d.historyNewEntry = {
            datum: new Date(),
            dauer: 12,
            user: $scope.d.dataMain.users.current.id,
            verlauf: "Dies ist ein neuer Testeintrag bla bla bla.."
        };
    };

    $scope.entryEdit = function(currentIndex) {
        // Store current entry - just for, do not save if 'cancel'.
        $scope.d.historyEditEntry = angular.copy($scope.d.historyEntrys[currentIndex]);
        $scope.d.historyEditEntryID = currentIndex;
        $scope.d.appState = 'edit';

        console.log('entryEdit: ', currentIndex, $scope.d.historyEditEntry);
    };

    $scope.entryDelete = function() {
        $scope.d.appState = 'show';
    };


    $scope.getHisoryEntrys = function() {

        var api_call = dataService.getPatientAnnotationsData($scope.d.nodeTree);
        api_call.then(function(data) {
            // Create Array if not already exists.
            if (dataService.isEmpty(data)) {
                $scope.d.historyEntrys = [];
            } else {
                $scope.d.historyEntrys = data;
            };
            console.log('(+) getHisoryEntrys ', data, $scope.d.historyEntrys);
        });

    };

    $scope.putHisoryPost = function() {

        console.log('RUN: putHisoryPost');

        // Get Current Entrys
        $scope.getHisoryEntrys();


        // Push new Entry if 'new'
        if ($scope.d.appState === 'new') {
            $scope.d.historyEntrys.push($scope.d.historyNewEntry);
        };

        // Save edited entry.
        if ($scope.d.appState === 'edit') {
            $scope.d.historyEntrys[$scope.d.historyEditEntryID] = $scope.d.historyEditEntry;
        };

        var api_call = dataService.putPatientAnnotationsData($scope.d.nodeTree, $scope.d.historyEntrys);
        api_call.then(function(data) {
            console.log('(+) putHisoryPost - saved: ', $scope.d.historyNewEntry);

            // Update Entrys
            $scope.appInit();
            $scope.getHisoryEntrys();
        });

    };


});
