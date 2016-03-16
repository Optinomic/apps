/**
 * @name Optinomic - AppCtrl
 * ---------------------------------------
 * Controller of the Optinomic-Application.
 */
app.controller('AppCtrl', function($scope, $http, $filter, $mdDialog, dataService, scopeDService) {

    console.log('(!) AppCtrl - Verlaufseintrag', app);

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
        $scope.d.appState = 'loading';
        $scope.d.haveData = false;
        var dataPromiseMain = dataService.getMainAppData();
        dataPromiseMain.then(function(data) {

            // Save Data to $scope.d
            $scope.d.dataMain = data;

            // Run App-Functions
            $scope.appInit();
            $scope.getNotes();
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
        $scope.d.nodeTree = 'verlaufseintrag';
        $scope.d.nodeTreeNotes = 'notes';

        $scope.d.appInit = {
            filter: '',
            predicate: 'datum_sort',
            reverse: true,
            debug: false
        };

        $scope.d.haveData = true;
        $scope.getUserSettings();
        $scope.loadTARMEDSheet();
    };


    $scope.getUserSettings = function() {

        var userSettingsDefault = {
            kapitel_id: 3,
            selected_tarifpos_code: "02.0210",
            dauer: 14,
            week_filter: true,
            sort_reverse: false
        };

        var tree = $scope.d.nodeTree;
        var api_call = dataService.getAnnotationsData('user', tree);
        api_call.then(function(data) {
            if (dataService.isEmpty(data)) {
                $scope.d.userSettings = userSettingsDefault;
                console.log('DEFAULT - getUserSettings', $scope.d.userSettings);
            } else {
                $scope.d.userSettings = data;

                //Apply loaded appInit
                $scope.d.appInit.reverse = $scope.d.userSettings.sort_reverse;

                if ($scope.d.userSettings.week_filter) {
                    $scope.d.appInit.filter = '2016, 03';
                };

                console.log('LOADED - getUserSettings', $scope.d.userSettings);
            };

        });

    };


    $scope.saveUserSettings = function() {

        var tree = $scope.d.nodeTree;
        var json_value = $scope.d.userSettings;
        var api_call = dataService.saveAnnotationsData('user', tree, json_value);
        api_call.then(function(data) {
            console.log('(+) saveUserSettings - saved: ', json_value);
            $scope.getUserSettings();
            $scope.d.appState = 'show';
        });

    };

    $scope.getNotes = function() {

        function isArray(object) {
            if (object.constructor === Array) return true;
            else return false;
        };

        var api_call = dataService.getAnnotationsData('patient', $scope.d.nodeTreeNotes);
        api_call.then(function(data) {

            if (isArray(data)) {
                //console.log('(->) getNotes - Array', data);

                $scope.d.historyEntrysNotes = {};
                $scope.d.historyEntrysNotes.notes = '';

                var note = '';
                data.forEach(function(item, myindex) {
                    //console.log('(Pushed) ---> ', inner_item, item, myindex);
                    var current_stay = item.save_stamp.getStayID
                    note = note + item.notes + ' (stay:' + current_stay + ') \n';
                    //console.log('---> note: ', note, item);
                });
                $scope.d.historyEntrysNotes.notes = note;

            } else {
                // Create Object if not already exists.
                if (dataService.isEmpty(data)) {
                    $scope.d.historyEntrysNotes = {};
                    $scope.d.historyEntrysNotes.notes = '';
                } else {
                    $scope.d.historyEntrysNotes = angular.copy(data);
                };
            };

            console.log('(+) getNotes', $scope.d.nodeTreeNotes, $scope.d.historyEntrysNotes);
        });

    };

    $scope.saveNotes = function() {


        var datestamp = {};

        // Datestamp festhalten und erweitern.
        var date = new Date();
        datestamp.datum = date;
        datestamp.datum_sort = $filter("amDateFormat")(date, 'YYYYMMDDHHmmsssss');
        datestamp.datum_week = $filter("amDateFormat")(date, 'YYYY, ww');
        datestamp.datum_day = $filter("amDateFormat")(date, 'DD.MM.YYYY');
        datestamp.datum_full_day = $filter("amDateFormat")(date, 'dddd, Do MMMM YYYY');
        datestamp.datum_time = $filter("amDateFormat")(date, 'HH:mm');
        $scope.d.historyEntrysNotes.datestamp = datestamp;

        var api_call = dataService.saveAnnotationsData('patient', $scope.d.nodeTreeNotes, $scope.d.historyEntrysNotes);
        api_call.then(function(data) {
            // Update Entrys
            $scope.getNotes();
            console.log('(+) saveNotes - success: ', $scope.d.nodeTreeNotes, $scope.d.historyEntrysNotes);

            $scope.d.functions.showSimpleToast('Notitzen erfolgreich gespeichert');
        });
    };

    $scope.clearNotes = function() {
        var api_call = dataService.saveAnnotationsData('patient', $scope.d.nodeTreeNotes, {});
        api_call.then(function(data) {
            // Update Entrys
            $scope.getNotes();
            console.log('(+) clearNotes - success: ', $scope.d.nodeTreeNotes, $scope.d.historyEntrysNotes);
        });
    };


    $scope.getHisoryEntrys = function() {
        // Get Data

        $scope.d.historyEntrys = [];
        var api_call = dataService.getAnnotationsData('patient', $scope.d.nodeTree);
        api_call.then(function(data) {

            // Create Array if not already exists.
            if (dataService.isEmpty(data)) {
                $scope.d.historyEntrys = [];
            } else {
                $scope.d.historyEntrys = angular.copy(data);
            };

            // Group Resuls by Calendar-Week
            $scope.d.historyEntrysWeek = dataService.groupBy($scope.d.historyEntrys, function(item) {
                return [item.datum_week];
            });

            $scope.d.appState = 'show';

            //console.log('(+) getHisoryEntrys ', $scope.d.historyEntrys, $scope.d.historyEntrysWeek);
        });




    };

    // -----------------------------------
    // Dialogs
    // -----------------------------------

    $scope.showConfirm = function(ev, currentUID) {

        var my_index = dataService.findIndex($scope.d.historyEntrys, 'uniqueid', currentUID);

        console.log('showConfirm ', currentUID, $scope.d.historyEntrys[my_index]);

        var anz_characters_to_show = 20;
        var dispay_text = $scope.d.historyEntrys[my_index].datum_day + ' | ' + $scope.d.historyEntrys[my_index].verlauf.substring(0, anz_characters_to_show);
        if ($scope.d.historyEntrys[my_index].verlauf.length > anz_characters_to_show) {
            dispay_text = dispay_text + '...';
        };

        console.log('showConfirm: ', ev, my_index);
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .title('Verlaufseintrag löschen?')
            .textContent('Sind Sie sicher, dass Sie den Eintrag (' + dispay_text + ') löschen möchten?')
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

    $scope.saveHistory = function() {
        var api_call = dataService.saveAnnotationsData('patient', $scope.d.nodeTree, $scope.d.historyEntrys);
        api_call.then(function(data) {
            console.log('(+) saveHistory - success: ', $scope.d.historyNewEntry);

            // Update Entrys
            $scope.getHisoryEntrys();
            $scope.d.appState = 'show';

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

    $scope.entryEdit = function(currentUID) {
        // EDIT
        // Store current entry - just for, do not save if 'cancel'.
        var currentIndex = dataService.findIndex($scope.d.historyEntrys, 'uniqueid', currentUID);

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
        $scope.saveHistory();
    };


    $scope.entrySave = function() {
        // Save

        // Datum erweitern.
        var date = $scope.d.historyNewEntry.datum;
        $scope.d.historyNewEntry.datum_sort = $filter("amDateFormat")(date, 'YYYYMMDDHHmmsssss');
        $scope.d.historyNewEntry.datum_week = $filter("amDateFormat")(date, 'YYYY, ww');
        $scope.d.historyNewEntry.datum_day = $filter("amDateFormat")(date, 'DD.MM.YYYY');
        $scope.d.historyNewEntry.datum_full_day = $filter("amDateFormat")(date, 'dddd, Do MMMM YYYY');
        $scope.d.historyNewEntry.datum_time = $filter("amDateFormat")(date, 'HH:mm');
        $scope.d.historyNewEntry.uniqueid = dataService.uniqueid();


        // Push new Entry if 'new'
        if ($scope.d.appState === 'new') {
            $scope.d.historyEntrys.push($scope.d.historyNewEntry);
        };

        // Save edited entry.
        if ($scope.d.appState === 'edit') {
            $scope.d.historyEntrys[$scope.d.historyNewEntryID] = $scope.d.historyNewEntry;
        };


        console.log('Try to save @ putHisoryPost: ', $scope.d.historyEntrys);
        $scope.saveHistory();


    };


    $scope.d.supplyData = [35, 28, 45, 60, 80, 74];
    $scope.d.demandData = [29, 11, 50, 63, 65, 61];

    $scope.supplyData = [35, 28, 45, 60, 80, 74];
    $scope.demandData = [29, 11, 50, 63, 65, 61];

});
