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


            // Finishing: Console Info & Init = done.
            console.log('Welcome, ', $scope.d.dataMain.apps.current.name, $scope.d);


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
            var icd_display = icd_titel + ", " + icd_code;
            //var value = icd_code + ", " + icd_titel;
            //value = value.toLowerCase();

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
                icd_note: icd_note,
                icd_display: icd_display
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
                //$scope.d.appInit.repos = loadAll($scope.d.ICD10_all);
                $scope.d.appInit.repos = loadAll($scope.d.ICD10_all);


                //$scope.d.TARMEDkapitel = dataService.groupBy($scope.d.TARMEDall, function(item) {
                //    return [item.kapitel_code];
                //});
                //console.log('(!) TARMEDkapitel', $scope.d.TARMEDkapitel);


                // Set 'haveData' because we do not have a survey here!
                $scope.d.loadedICD10Data = true;

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
        $scope.d.appInit.simulateQuery = false;
        $scope.d.appInit.isDisabled = false;
        $scope.d.appInit.noCache = false;
        $scope.d.appInit.repos = [];
        $scope.d.appInit.querySearch = querySearch;
        $scope.d.appInit.selectedItemChange = selectedItemChange;
        $scope.d.appInit.searchTextChange = searchTextChange;
        $scope.d.appInit.searchText = '';

        $scope.d.init = true;
        $scope.d.haveData = true;
        $scope.d.appState = 'show';

    };





    // ******************************
    // Internal methods
    // ******************************
    /**
     * Search for repos... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch(query) {
        var results = query ? $scope.d.appInit.repos.filter(createFilterFor(query)) : $scope.d.appInit.repos,
            deferred;

        //console.log('querySearch', createFilterFor(query), results);
        return results;
    }

    function searchTextChange(text) {
        console.log('Text changed to ', text);
    }

    function selectedItemChange(item) {
        console.log('Item changed to ', JSON.stringify(item));
        $scope.d.appInit.selectedItem = item;
    }
    /**
     * Build `components` list of key/value pairs
     */
    function loadAll(catalog) {
        return catalog.map(function(diagn) {
            diagn._lowerCode = diagn.icd_code.toLowerCase();
            diagn._lowerTitel = diagn.icd_titel.toLowerCase();
            return diagn;
        });
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(item) {
            return (item._lowerTitel.indexOf(lowercaseQuery) >= 0) ||
                (item._lowerCode.indexOf(lowercaseQuery) === 0);
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
        $scope.d.loadedICD10Data = false;
        $scope.d.appState = 'new';

        // Init New Entry
        $scope.d.newEntry = {
            datum: new Date(),
            user: $scope.d.dataMain.users.current.id,
            diagn: {},
            custom_text: ""
        };

        $scope.loadICD10Sheet();

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
