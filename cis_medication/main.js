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
            $scope.getEntrys();


            // Finishing: Console Info & Init = done.
            console.log('Welcome, ', $scope.d.dataMain.apps.current.name, $scope.d);


        });
    };
    $scope.loadMainData();



    $scope.loadMediCatalog = function() {
        // Load Medication Catalog and save them to $scope

        // https://docs.google.com/spreadsheets/d/1TLZqqd4_7h2z4CSrDNznEw5oepSCHEH2oMeWOBNa0wo/pubhtml
        var url = 'https://spreadsheets.google.com/feeds/list/1TLZqqd4_7h2z4CSrDNznEw5oepSCHEH2oMeWOBNa0wo/od6/public/values?alt=json'

        var parse = function(entry) {
            //console.log('parse - loadTarmedSheet - entry: ', entry);
            var medi_order = entry['gsx$reihenfolge']['$t'];
            var medi_code = entry['gsx$pharmacode']['$t'];
            var medi_name = entry['gsx$bezeichnung']['$t'];
            var medi_info = entry['gsx$zusatz']['$t'];

            if (entry['gsx$aktiviert']['$t'] === 'T') {
                var medi_activated = true;
            } else {
                var medi_activated = false;
            };

            return {
                medi_order: medi_order,
                medi_code: medi_code,
                medi_name: medi_name,
                medi_info: medi_info,
                medi_activated: medi_activated
            };
        }

        $http.get(url)
            .success(function(response) {
                //console.log('(!) loadTARMEDSheet - success: ', response);

                var entries = response['feed']['entry'];

                $scope.d.Medikamente_all = [];
                entries.forEach(function(content, myindex) {
                    $scope.d.Medikamente_all.push(parse(content));
                });
                console.log('(!) loadMediCatalog', $scope.d.Medikamente_all);

                //$scope.d.appInit.repos = loadAll($scope.d.Medikamente_all);
                $scope.d.appInit.repos = loadAll($scope.d.Medikamente_all);


                //$scope.d.TARMEDkapitel = dataService.groupBy($scope.d.TARMEDall, function(item) {
                //    return [item.kapitel_code];
                //});
                //console.log('(!) TARMEDkapitel', $scope.d.TARMEDkapitel);


                // Set 'haveData' because we do not have a survey here!
                $scope.d.loadedMedicationData = true;

            });
    };

    //$scope.storeSelectedTARMED = function() {
    //    // If user selects a TARMED Tarifposition save the entry.
    //    var entries = $scope.d.TARMEDkapitel[$scope.d.newEntry.tarmed.kapitel_id]
    //        //console.log('storeSelectedTARMED', entries);
    //
    //    entries.forEach(function(content, myindex) {
    //        //console.log('-- storeSelectedTARMED', content);
    //
    //        if (content.tarifpos_code === $scope.d.newEntry.tarmed.selected_tarifpos_code) {
    //            $scope.d.newEntry.tarmed.selected = content;
    //        };
    //    });
    //};

    $scope.appInit = function() {
        $scope.d.nodeTree = 'medication';

        $scope.d.appInit = {};
        $scope.d.appInit.noCache = false;
        $scope.d.appInit.repos = [];
        $scope.d.appInit.querySearch = querySearch;
        $scope.d.appInit.selectedItemChange = selectedItemChange;
        $scope.d.appInit.searchTextChange = searchTextChange;
        $scope.d.appInit.searchText = '';
        $scope.d.appInit.autofocus = true;
        $scope.d.appInit.medi_not_found = false;

        $scope.d.appInit.show_controls = [];

        $scope.d.appInit.filter = '';
        $scope.d.appInit.predicate = '';
        $scope.d.appInit.reverse = false;

        $scope.d.medication = [];

        $scope.d.init = true;
        $scope.d.haveData = true;
        $scope.d.loadedMedicationData = false;
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

        if (item === undefined) {
            $scope.d.newEntry = {
                datestamp: new Date(),
                user: $scope.d.dataMain.users.current.id,
                medication: {},
                medication_selected: false
            };
        } else {
            // Create JSON to save

            $scope.d.newEntry = {
                datestamp: new Date(),
                user: $scope.d.dataMain.users.current.id,
                medication: item,
                medication_selected: true,
                medi_name: item.medi_name
            };
            console.log('Stored Selected in d.newEntry', $scope.d.newEntry);
        };
    }

    /**
     * Build `components` list of key/value pairs
     */
    function loadAll(catalog) {
        return catalog.map(function(entry) {
            entry._lowerCode = entry.medi_code.toLowerCase();
            entry._lowerName = entry.medi_name.toLowerCase();
            return entry;
        });
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(item) {
            return (item._lowerName.indexOf(lowercaseQuery) >= 0) ||
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



    $scope.getEntrys = function() {
        // Get Data

        $scope.d.medication = [];
        var api_call = dataService.getAnnotationsData('patient', $scope.d.nodeTree);
        api_call.then(function(data) {

            // Create Array if not already exists.
            if (dataService.isEmpty(data)) {
                $scope.d.medication = [];
            } else {
                $scope.d.medication = angular.copy(data);
            };


            $scope.d.appState = 'show';

            console.log('(+) getEntrys ', $scope.d.medication);
        });
    };

    // -----------------------------------
    // Dialogs
    // -----------------------------------

    $scope.showConfirm = function(ev, my_uid) {
        console.log('showConfirm: ', ev, my_uid);

        var myIndex = dataService.findIndex($scope.d.medication, 'uniqueid', my_uid);

        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .title('Verlaufseintrag löschen?')
            .textContent('Sind Sie sicher, dass Sie die Diagnose (' + $scope.d.medication[myIndex].custom_text + ') löschen möchten?')
            .ariaLabel('Eintrag löschen')
            .targetEvent(ev)
            .ok('Löschen')
            .cancel('Abbrechen');
        $mdDialog.show(confirm).then(function() {

            console.log('You selected: Delete!');
            $scope.entryDelete(myIndex);

        }, function() {

            console.log('You selected: Cancel!');
            $scope.entryCancel();

        });
    };


    $scope.loadMedis = function() {

        if ($scope.d.loadedMedicationData) {
            $scope.d.appInit.repos = loadAll($scope.d.Medikamente_all);
        } else {
            $scope.loadMediCatalog();
        };

    };

    // -----------------------------------
    // Actions
    // -----------------------------------


    $scope.entryCancel = function() {
        // Cancel
        $scope.getEntrys();
    };


    $scope.entryNew = function() {
        // New

        // Init New Entry
        $scope.d.appInit.searchText = '';
        $scope.d.appInit.selectedItem = {};
        $scope.d.newEntry = {
            datestamp: new Date(),
            user: $scope.d.dataMain.users.current.id,
            diagn: {},
            diagn_selected: false,
            diagn_rank: null,
            custom_text: ""
        };
        $scope.loadMedis();
        $scope.d.appState = 'new';
    };

    $scope.entryEdit = function(currentUID) {
        // EDIT
        // Store current entry - just for, do not save if 'cancel'.

        var myIndex = dataService.findIndex($scope.d.medication, 'uniqueid', currentUID);


        $scope.d.newEntry = angular.copy($scope.d.medication[myIndex]);
        $scope.d.newEntry.datestamp_edit = new Date();
        $scope.d.newEntryID = myIndex;

        $scope.loadMedis();
        $scope.d.appInit.autofocus = false;
        $scope.d.appInit.selectedItem = $scope.d.newEntry.diagn;
        $scope.d.appState = 'edit';


        console.log('entryEdit: ', myIndex, $scope.d.newEntry);
    };


    $scope.entrySettings = function() {
        // Cancel
        $scope.d.appState = 'settings';
    };

    $scope.entryUp = function(currentUID) {
        // Diagnose aufwerten

        // Diagnosen nach 'rank' sortieren
        $scope.d.medication = dataService.sortByKey($scope.d.medication, 'diagn_rank')

        // Rank anpassen
        var currentIndex = dataService.findIndex($scope.d.medication, 'uniqueid', currentUID);

        if (currentIndex !== 0) {
            var prevIndex = currentIndex - 1;
            $scope.d.medication[currentIndex].diagn_rank = $scope.d.medication[currentIndex].diagn_rank - 1;
            $scope.d.medication[prevIndex].diagn_rank = $scope.d.medication[prevIndex].diagn_rank + 1;

            $scope.saveDiagnoses();
            console.log('entryUp', $scope.d.medication[currentIndex], currentIndex, prevIndex);
        };

    };

    $scope.entryDown = function(currentUID) {
        // Diagnose abwerten

        // Diagnosen nach 'rank' sortieren
        $scope.d.medication = dataService.sortByKey($scope.d.medication, 'diagn_rank');

        var max = $scope.d.medication.length - 1;
        var currentIndex = dataService.findIndex($scope.d.medication, 'uniqueid', currentUID);

        // Rank anpassen
        if (currentIndex !== max) {
            var nextIndex = currentIndex + 1;
            $scope.d.medication[currentIndex].diagn_rank = $scope.d.medication[currentIndex].diagn_rank + 1;
            $scope.d.medication[nextIndex].diagn_rank = $scope.d.medication[nextIndex].diagn_rank - 1;

            $scope.saveDiagnoses();
            console.log('entryDown', $scope.d.medication[currentIndex], currentIndex, nextIndex);
        };


    };


    $scope.entryDelete = function(my_index) {
        $scope.d.medication.splice(my_index, 1);

        // Diagnosen nach 'rank' sortieren
        $scope.d.medication = dataService.sortByKey($scope.d.medication, 'diagn_rank');
        // Diagnosen neu hochnummerieren.
        $scope.d.medication.forEach(function(diagn, myindex) {
            diagn.diagn_rank = myindex + 1;
        });

        console.log('Deleted - Index', my_index);
        $scope.saveDiagnoses();
    };


    $scope.saveDiagnoses = function() {
        var api_call = dataService.saveAnnotationsData('patient', $scope.d.nodeTree, $scope.d.medication);
        api_call.then(function(data) {
            console.log('(+) saveDiagnoses - success: ', $scope.d.medication);

            // Update Entrys
            $scope.d.appState = 'show';
            $scope.getEntrys();
        });
    };


    $scope.entrySave = function() {
        // Save

        $scope.d.newEntry.uniqueid = dataService.uniqueid();


        // Create URL's for nice lookup

        var code_full = $scope.d.newEntry.diagn.icd_code;
        var code_dot = code_full.indexOf('.');
        var code_parent = code_full.substring(0, code_dot);

        if (code_dot !== -1) {
            // http://www.icd-code.de/suche/icd/code/F52.-.html?sp=Sf52.7
            $scope.d.newEntry.icd_url_info = "http://www.icd-code.de/suche/icd/code/" + code_parent + ".-.html?sp=S" + code_full;
        } else {
            // http://www.icd-code.de/suche/icd/code/Z63.html?sp=Sz63
            $scope.d.newEntry.icd_url_info = "http://www.icd-code.de/suche/icd/code/" + code_full + ".html?sp=S" + code_full;
        };


        // Push new Entry if 'new'
        if ($scope.d.appState === 'new') {
            $scope.d.medication.push($scope.d.newEntry);

            // Datum erweitern.
            var date = $scope.d.newEntry.datestamp;
            $scope.d.newEntry.datestamp_sort = $filter("amDateFormat")(date, 'YYYYMMDDHHmmsssss');
            $scope.d.newEntry.datestamp_week = $filter("amDateFormat")(date, 'YYYY, ww');
            $scope.d.newEntry.datestamp_day = $filter("amDateFormat")(date, 'DD.MM.YYYY');
            $scope.d.newEntry.datestamp_full_day = $filter("amDateFormat")(date, 'dddd, Do MMMM YYYY');
            $scope.d.newEntry.datestamp_time = $filter("amDateFormat")(date, 'HH:mm');

        };

        // Save edited entry.
        if ($scope.d.appState === 'edit') {
            $scope.d.medication[$scope.d.newEntryID] = $scope.d.newEntry;

            // Datum erweitern.
            var date = $scope.d.newEntry.datestamp_edit;
            $scope.d.newEntry.datestamp_edit_sort = $filter("amDateFormat")(date, 'YYYYMMDDHHmmsssss');
            $scope.d.newEntry.datestamp_edit_week = $filter("amDateFormat")(date, 'YYYY, ww');
            $scope.d.newEntry.datestamp_edit_day = $filter("amDateFormat")(date, 'DD.MM.YYYY');
            $scope.d.newEntry.datestamp_edit_full_day = $filter("amDateFormat")(date, 'dddd, Do MMMM YYYY');
            $scope.d.newEntry.datestamp_edit_time = $filter("amDateFormat")(date, 'HH:mm');

        };


        console.log('Try to save @ putHisoryPost: ', $scope.d.medication);


        var api_call = dataService.saveAnnotationsData('patient', $scope.d.nodeTree, $scope.d.medication);
        api_call.then(function(data) {
            console.log('(+) entrySave - success: ', $scope.d.newEntry);

            // Update Entrys
            $scope.d.appState = 'show';
            $scope.getEntrys();
        });
    };


});
