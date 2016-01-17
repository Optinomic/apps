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
        $scope.d.appState = 'loading';
        $scope.d.haveData = false;
        var dataPromiseMain = dataService.getMainAppData();
        dataPromiseMain.then(function(data) {

            // Save Data to $scope.d
            $scope.d.dataMain = data;

            // Run App-Functions
            $scope.appInit();


            // Finishing: Console Info & Init = done.
            console.log('Welcome, ', $scope.d.dataMain.apps.current.name, $scope.d);
            $scope.d.init = true;
        });
    };
    $scope.loadMainData();



    $scope.loadICD10Sheet = function() {
        // Load ICD-10 Catalog and save them to $scope
        // https://docs.google.com/spreadsheets/d/1PwRVRdExti7295w4OTalHllnkoBNxznTnuOBmNecRWo/pubhtml
        var url = 'https://spreadsheets.google.com/feeds/list/1PwRVRdExti7295w4OTalHllnkoBNxznTnuOBmNecRWo/od6/public/values?alt=json'

        var parse = function(entry) {
            //console.log('parse - loadTarmedSheet - entry: ', entry);
            var icd_id = entry['gsx$id']['$t'];
            var icd_code = entry['gsx$code']['$t'];
            var icd_parent = entry['gsx$parent']['$t'];
            var icd_titel = entry['gsx$titel']['$t'];
            var icd_titel_orig = entry['gsx$titelorig']['$t'];
            var icd_valid_from = entry['gsx$validfrom']['$t'];
            var icd_valid_to = entry['gsx$validto']['$t'];
            var icd_class = entry['gsx$class']['$t'];
            var icd_annotation = entry['gsx$annotation']['$t'];
            var icd_application = entry['gsx$application']['$t'];
            var icd_exklusiva = entry['gsx$exklusiva']['$t'];
            var icd_precision = entry['gsx$precision']['$t'];
            var icd_inklusiva = entry['gsx$inklusiva']['$t'];
            var icd_note = entry['gsx$note']['$t'];

            return {
                icd_id: icd_id,
                icd_code: icd_code,
                icd_parent: icd_parent,
                icd_titel: icd_titel,
                icd_titel_orig: icd_titel_orig,
                icd_valid_from: icd_valid_from,
                icd_valid_to: icd_valid_to,
                icd_class: icd_class,
                icd_annotation: icd_annotation,
                icd_application: icd_application,
                icd_exklusiva: icd_exklusiva,
                icd_precision: icd_precision,
                icd_inklusiva: icd_inklusiva,
                icd_note: icd_note
            };
        }

        $http.get(url)
            .success(function(response) {
                //console.log('(!) loadTARMEDSheet - success: ', response);

                var entries = response['feed']['entry'];

                $scope.d.ICD10_all = [];
                entries.forEach(function(content, myindex) {
                    $scope.d.ICD10_all.push(parse(content));
                });
                console.log('(!) ICD10_all', $scope.d.ICD10_all);

                //$scope.d.TARMEDkapitel = dataService.groupBy($scope.d.TARMEDall, function(item) {
                //    return [item.kapitel_code];
                //});
                //console.log('(!) TARMEDkapitel', $scope.d.TARMEDkapitel);


                // Set 'haveData' because we do not have a survey here!
                $scope.d.haveData = true;

            });
    };

    //$scope.storeSelectedTARMED = function() {
    //    // If user selects a TARMED Tarifposition save the entry.
    //    var entries = $scope.d.TARMEDkapitel[$scope.d.historyNewEntry.tarmed.kapitel_id]
    //        //console.log('storeSelectedTARMED', entries);
    //
    //    entries.forEach(function(content, myindex) {
    //        //console.log('-- storeSelectedTARMED', content);
    //
    //        if (content.tarifpos_code === $scope.d.historyNewEntry.tarmed.selected_tarifpos_code) {
    //            $scope.d.historyNewEntry.tarmed.selected = content;
    //        };
    //    });
    //};

    $scope.appInit = function() {
        $scope.d.nodeTree = 'diagnoses';

        $scope.d.appInit = {};
        var self = $scope.d.appInit;
        self.simulateQuery = false;
        self.isDisabled = false;
        self.repos = loadAll();
        self.querySearch = querySearch;
        self.selectedItemChange = selectedItemChange;
        self.searchTextChange = searchTextChange;

        $scope.loadICD10Sheet();
    };





    // ******************************
    // Internal methods
    // ******************************
    /**
     * Search for repos... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch(query) {
        var results = query ? self.repos.filter(createFilterFor(query)) : self.repos,
            deferred;
        if (self.simulateQuery) {
            deferred = $q.defer();
            $timeout(function() {
                deferred.resolve(results);
            }, Math.random() * 1000, false);
            return deferred.promise;
        } else {
            return results;
        }
    }

    function searchTextChange(text) {
        $log.info('Text changed to ' + text);
    }

    function selectedItemChange(item) {
        $log.info('Item changed to ' + JSON.stringify(item));
    }
    /**
     * Build `components` list of key/value pairs
     */
    function loadAll() {
        var catalog = $scope.d.ICD10_all;
        return catalog.map(function(diagn) {
            diagn.value = diagn.icd_code;
            return diagn;
        });
    }
    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(item) {
            return (item.value.indexOf(lowercaseQuery) === 0);
        };
    }



    //$scope.getUserSettings = function() {
    //
    //    var userSettingsDefault = {
    //        kapitel_id: 3,
    //        selected_tarifpos_code: "02.0210",
    //        dauer: 14,
    //        week_filter: true,
    //        sort_reverse: false
    //    };
    //
    //    var tree = $scope.d.nodeTree;
    //    var api_call = dataService.getAnnotationsData('user', tree);
    //    api_call.then(function(data) {
    //        if (dataService.isEmpty(data)) {
    //            $scope.d.userSettings = userSettingsDefault;
    //            console.log('DEFAULT - getUserSettings', $scope.d.userSettings);
    //        } else {
    //            $scope.d.userSettings = data;
    //
    //            //Apply loaded appInit
    //            $scope.d.appInit.reverse = $scope.d.userSettings.sort_reverse;
    //
    //            if ($scope.d.userSettings.week_filter) {
    //                $scope.d.appInit.filter = '2016, 03';
    //            };
    //
    //            console.log('LOADED - getUserSettings', $scope.d.userSettings);
    //        };
    //
    //    });
    //
    //};


    //$scope.saveUserSettings = function() {
    //
    //    var tree = $scope.d.nodeTree;
    //    var json_value = $scope.d.userSettings;
    //    var api_call = dataService.saveAnnotationsData('user', tree, json_value);
    //    api_call.then(function(data) {
    //        console.log('(+) saveUserSettings - saved: ', json_value);
    //        $scope.getUserSettings();
    //        $scope.d.appState = 'show';
    //    });
    //
    //};



    //$scope.getHisoryEntrys = function() {
    //    // Get Data
    //
    //    $scope.d.historyEntrys = [];
    //    var api_call = dataService.getAnnotationsData('patient', $scope.d.nodeTree);
    //    api_call.then(function(data) {
    //
    //        // Create Array if not already exists.
    //        if (dataService.isEmpty(data)) {
    //            $scope.d.historyEntrys = [];
    //        } else {
    //            $scope.d.historyEntrys = angular.copy(data);
    //        };
    //
    //        // Group Resuls by Calendar-Week
    //        $scope.d.historyEntrysWeek = dataService.groupBy($scope.d.historyEntrys, function(item) {
    //            return [item.datum_week];
    //        });
    //
    //        $scope.d.appState = 'show';
    //
    //        //console.log('(+) getHisoryEntrys ', $scope.d.historyEntrys, $scope.d.historyEntrysWeek);
    //    });
    //};

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


        var api_call = dataService.saveAnnotationsData('patient', $scope.d.nodeTree, $scope.d.historyEntrys);
        api_call.then(function(data) {
            console.log('(+) putHisoryPost - saved: ', $scope.d.historyNewEntry);

            // Update Entrys
            $scope.d.appState = 'show';
            $scope.getHisoryEntrys();
        });
    };


});
