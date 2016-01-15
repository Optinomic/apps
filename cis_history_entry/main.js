/**
 * @name Optinomic - AppCtrl
 * ---------------------------------------
 * Controller of the Optinomic-Application.
 */
app.controller('AppCtrl', function($scope, $http, $filter, $mdDialog, dataService, scopeDService) {

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
        // Load TARMED Tarifpositionen and save them to $scope
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

                $scope.d.TARMEDkapitel = dataService.groupBy($scope.d.TARMEDall, function(item) {
                    return [item.kapitel_code];
                });
                //console.log('(!) TARMEDkapitel', $scope.d.TARMEDkapitel);


                // Set 'haveData' because we do not have a survey here!
                $scope.d.haveData = true;

            });
    };

    $scope.storeSelectedTARMED = function() {
        // If user selects a TARMED Tarifposition save the entry.
        var entries = $scope.d.TARMEDkapitel[$scope.d.historyNewEntry.tarmed.kapitel_id]
            //console.log('storeSelectedTARMED', entries);

        entries.forEach(function(content, myindex) {
            //console.log('-- storeSelectedTARMED', content);

            if (content.tarifpos_code === $scope.d.historyNewEntry.tarmed.selected_tarifpos_code) {
                $scope.d.historyNewEntry.tarmed.selected = content;
            };
        });
    };

    $scope.appInit = function() {
        $scope.d.nodeTree = 'hisoryentrys_new4';
        $scope.d.appState = 'show';

        $scope.d.appInit = {
            filter: [],
            predicate: 'datum_sort',
            reverse: true,
            debug: false
        };

        $scope.loadTARMEDSheet();
        $scope.getUserSettings();
    };


    $scope.getUserSettings = function() {

        var userSettingsDefault = {
            kapitel_id: 3,
            selected_tarifpos_code: "02.0210",
            dauer: 14,
            week_filter: true,
            sort_reverse: false
        };

        var api_call = dataService.getUserAnnotationsData($scope.d.nodeTree);
        api_call.then(function(data) {
            if (dataService.isEmpty(data)) {
                console.log('DEFAULT - getUserSettings');
                $scope.d.userSettings = userSettingsDefault;
            } else {
                console.log('LOADED - getUserSettings', data);
                $scope.d.userSettings = data;
            };

        });

    };


    $scope.saveUserSettings = function() {

        var json_value = $scope.d.userSettings;
        var api_call = dataService.putUserAnnotationsData($scope.d.nodeTree, json_value);
        api_call.then(function(data) {
            console.log('(+) saveUserSettings - saved: ', json_value);
            $scope.getUserSettings();
            $scope.d.appState = 'show';
        });

    };



    $scope.getHisoryEntrys = function() {
        // Get Data

        var api_call = dataService.getPatientAnnotationsData($scope.d.nodeTree);
        api_call.then(function(data) {
            // Create Array if not already exists.
            if (dataService.isEmpty(data)) {
                $scope.d.historyEntrys = [];
            } else {
                $scope.d.historyEntrys = data;
            };

            // Group Resuls by Calendar-Week
            $scope.d.historyEntrysWeek = dataService.groupBy($scope.d.historyEntrys, function(item) {
                return [item.datum_week];
            });

            //console.log('(+) getHisoryEntrys ', $scope.d.historyEntrys, $scope.d.historyEntrysWeek);
        });
    };

    // -----------------------------------
    // Dialogs
    // -----------------------------------

    $scope.showConfirm = function(ev, my_index) {
        console.log('showConfirm: ', ev, my_index);
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .title('Verlaufseintrag löschen?')
            .textContent('Sind Sie sicher, dass Sie diesen Eintrag löschen möchten?')
            .ariaLabel('Eintrag löschen')
            .targetEvent(ev)
            .ok('Löschen')
            .cancel('Abbrechen');
        $mdDialog.show(confirm).then(function() {

            console.log('You selected: Delete!');
            $scope.entryDelete(my_index);

        }, function() {

            console.log('You selected: Cancel!');
            $scope.entryCancel();

        });
    };


    // -----------------------------------
    // Actions
    // -----------------------------------


    $scope.entryCancel = function() {
        // Cancel
        $scope.d.appState = 'show';
    };


    $scope.entryNew = function() {
        // New
        $scope.d.appState = 'new';

        // Init New Entry
        $scope.d.historyNewEntry = {
            datum: new Date(),
            user: $scope.d.dataMain.users.current.id,
            tarmed: {},
            verlauf: ""
        };

        // Set UserDefaultSettings
        $scope.d.historyNewEntry.dauer = $scope.d.userSettings.dauer;
        $scope.d.historyNewEntry.tarmed.kapitel_id = $scope.d.userSettings.kapitel_id;
        $scope.d.historyNewEntry.tarmed.selected_tarifpos_code = $scope.d.userSettings.selected_tarifpos_code;
        $scope.storeSelectedTARMED();

    };

    $scope.entryEdit = function(currentIndex) {
        // EDIT
        // Store current entry - just for, do not save if 'cancel'.
        $scope.d.historyNewEntry = angular.copy($scope.d.historyEntrys[currentIndex]);
        $scope.d.historyNewEntry.datum = new Date($scope.d.historyNewEntry.datum);

        $scope.d.historyNewEntryID = currentIndex;
        $scope.d.appState = 'edit';


        console.log('entryEdit: ', currentIndex, $scope.d.historyNewEntry);
    };


    $scope.entrySettings = function() {
        // Cancel
        $scope.d.appState = 'settings';
    };


    $scope.entryDelete = function(my_index) {
        $scope.d.historyEntrys.splice(my_index, 1);
        console.log('Deleted - Index', my_index);
    };


    $scope.entrySave = function() {
        // Save

        // Datum erweitern.
        var date = $scope.d.historyNewEntry.datum;
        $scope.d.historyNewEntry.datum_sort = $filter("amDateFormat")(date, 'YYYYMMDDHHmm');
        $scope.d.historyNewEntry.datum_week = $filter("amDateFormat")(date, 'YYYY, ww');
        $scope.d.historyNewEntry.datum_day = $filter("amDateFormat")(date, 'DD.MM.YYYY');
        $scope.d.historyNewEntry.datum_full_day = $filter("amDateFormat")(date, 'dddd, Do MMMM YYYY');
        $scope.d.historyNewEntry.datum_time = $filter("amDateFormat")(date, 'HH:mm');

        // Push new Entry if 'new'
        if ($scope.d.appState === 'new') {
            $scope.d.historyEntrys.push($scope.d.historyNewEntry);
        };

        // Save edited entry.
        if ($scope.d.appState === 'edit') {
            $scope.d.historyEntrys[$scope.d.historyNewEntryID] = $scope.d.historyNewEntry;
        };


        console.log('Try to save @ putHisoryPost: ', $scope.d.historyEntrys);


        var api_call = dataService.putPatientAnnotationsData($scope.d.nodeTree, $scope.d.historyEntrys);
        api_call.then(function(data) {
            console.log('(+) putHisoryPost - saved: ', $scope.d.historyNewEntry);

            // Update Entrys
            $scope.d.appState = 'show';
            $scope.getHisoryEntrys();
        });
    };


});
