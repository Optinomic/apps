/**
 * @name Optinomic - AppCtrl
 * ---------------------------------------
 * Controller of the Optinomic-Application.
 */
app.controller('AppCtrl', function($scope, $http, dataService, scopeDService) {

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



    $scope.loadTARMEDSheet = function() {
        var url = 'https://spreadsheets.google.com/feeds/list/1sHarXye8LLwM6u0sRWwiHdBIp9uKc9jMxvkbbBxyf5w/od6/public/values?alt=json'

        var parse = function(entry) {
            //console.log('parse - loadTarmedSheet - entry: ', entry);
            var leistungsgruppe_code = entry['gsx$leistungsgruppecode']['$t'];
            var leistungsgruppe_beschreibung = entry['gsx$leistungsgruppebeschreibung']['$t'];
            var kapitel_code = entry['gsx$kapitelcode']['$t'];
            var kapitel_beschreibung = entry['gsx$kapitelbeschreibung']['$t'];
            var tarifpos_code = entry['gsx$tarifpositioncode']['$t'];
            var tarifpos_beschreibung = entry['gsx$tarifpositionbeschreibung']['$t'];
            var tarifpos_info = entry['gsx$tarifpositionzusatz']['$t'];

            return {
                leistungsgruppe_code: leistungsgruppe_code,
                leistungsgruppe_beschreibung: leistungsgruppe_beschreibung,
                kapitel_code: kapitel_code,
                kapitel_beschreibung: kapitel_beschreibung,
                tarifpos_code: tarifpos_code,
                tarifpos_beschreibung: tarifpos_beschreibung,
                tarifpos_info: tarifpos_info
            };
        }

        $http.get(url)
            .success(function(response) {
                //console.log('(!) loadTARMEDSheet - success: ', response);

                var entries = response['feed']['entry'];

                $scope.d.TARMEDall = [];
                entries.forEach(function(content, myindex) {
                    $scope.d.TARMEDall.push(parse(content));
                    //console.log('(-) loadTARMEDSheet - content: ', myindex, content);
                });
                //console.log('(!) TARMEDall', $scope.d.TARMEDall);

                // Group Responses
                //$scope.d.TARMEDleistungsgruppe = dataService.groupBy($scope.d.TARMEDall, function(item) {
                //    return [item.leistungsgruppe_code];
                //});
                //console.log('(!) TARMEDleistungsgruppe', $scope.d.TARMEDleistungsgruppe);


                $scope.d.TARMEDkapitel = dataService.groupBy($scope.d.TARMEDall, function(item) {
                    return [item.kapitel_code];
                });
                //console.log('(!) TARMEDkapitel', $scope.d.TARMEDkapitel);


                // Set 'haveData' because we do not have a survey here!
                $scope.d.haveData = true;

            });
    };

    $scope.appInit = function() {
        $scope.d.nodeTree = 'hisoryentrys';
        $scope.d.appState = 'show'

        $scope.loadTARMEDSheet();
    };



    $scope.entryCancel = function() {
        $scope.d.appState = 'show';
    };


    $scope.storeSelectedTARMED = function() {
        var entries = $scope.d.TARMEDkapitel[$scope.d.historyNewEntry.tarmed.kapitel_id]
            //console.log('storeSelectedTARMED', entries);

        entries.forEach(function(content, myindex) {
            //console.log('-- storeSelectedTARMED', content);

            if (content.tarifpos_code === $scope.d.historyNewEntry.tarmed.selected_tarifpos_code) {
                $scope.d.historyNewEntry.tarmed.selected = content;
            };
        });
    };


    $scope.entryNew = function() {
        $scope.d.appState = 'new';

        // Init New Entry
        $scope.d.historyNewEntry = {
            datum: new Date(),
            dauer: 12,
            user: $scope.d.dataMain.users.current.id,
            tarmed: {
                kapitel_id: 3,
                selected: {}
            },
            verlauf: "Dies ist ein neuer Testeintrag bla bla bla.."
        };
    };

    $scope.entryEdit = function(currentIndex) {
        // Store current entry - just for, do not save if 'cancel'.
        $scope.d.historyNewEntry = angular.copy($scope.d.historyEntrys[currentIndex]);
        $scope.d.historyNewEntryID = currentIndex;
        $scope.d.appState = 'edit';

        console.log('entryEdit: ', currentIndex, $scope.d.historyNewEntry);
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
            $scope.d.historyEntrys[$scope.d.historyNewEntryID] = $scope.d.historyNewEntry;
        };


        var api_call = dataService.putPatientAnnotationsData($scope.d.nodeTree, JSON.stringify($scope.d.historyEntrys));
        api_call.then(function(data) {
            console.log('(+) putHisoryPost - saved: ', $scope.d.historyNewEntry);

            // Update Entrys
            $scope.appInit();
            $scope.getHisoryEntrys();
        });

    };


});
