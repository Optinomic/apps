/**
 * @name Optinomic - AppCtrl
 * ---------------------------------------
 * Controller of the Optinomic-Application.
 */
app.controller('AppCtrl', function($scope, $http, $filter, $mdDialog, $sce, dataService, scopeDService) {

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
        $scope.d.nodeTree = 'diagnoses';

        $scope.d.appInit = {};
        $scope.d.appInit.noCache = false;
        $scope.d.appInit.repos = [];
        $scope.d.appInit.querySearch = querySearch;
        $scope.d.appInit.selectedItemChange = selectedItemChange;
        $scope.d.appInit.searchTextChange = searchTextChange;
        $scope.d.appInit.searchText = '';
        $scope.d.appInit.autofocus = true;
        $scope.d.appInit.show_controls = [];

        $scope.d.appInit.filter = '';
        $scope.d.appInit.predicate = 'diagn_rank';
        $scope.d.appInit.reverse = false;

        $scope.d.diagnoses = [];

        $scope.d.init = true;
        $scope.d.haveData = true;
        $scope.d.loadedICD10Data = false;
        $scope.d.appState = 'show';

    };





    // ******************************
    // Internal methods
    // ******************************


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
                diagn: {},
                diagn_selected: false,
                diagn_rank: null,
                custom_text: ""
            };
        } else {
            // Create JSON to save
            var reduced_item = {
                icd_class: item.icd_class,
                icd_code: item.icd_code,
                icd_display: item.icd_display,
                icd_id: item.icd_id,
                icd_titel: item.icd_titel
            }

            $scope.d.newEntry = {
                datestamp: new Date(),
                user: $scope.d.dataMain.users.current.id,
                diagn: reduced_item,
                diagn_selected: true,
                diagn_rank: $scope.d.diagnoses.length + 1,
                custom_text: item.icd_display
            };
            console.log('Stored Selected in d.newEntry', $scope.d.newEntry);
        };
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



    $scope.getEntrys = function() {
        // Get Data

        $scope.d.diagnoses = [];
        var api_call = dataService.getAnnotationsData('patient', $scope.d.nodeTree);
        api_call.then(function(data) {

            // Create Array if not already exists.
            if (dataService.isEmpty(data)) {
                $scope.d.diagnoses = [];
            } else {
                $scope.d.diagnoses = angular.copy(data);

                //  Interpretiere Newlines  \n
                $scope.d.diagnoses.forEach(function(diagnose, myindex) {
                    diagnose.custom_text_html = $sce.trustAsHtml(diagnose.custom_text.replace(/(\r\n|\n|\r)/gm, "<br>"));
                });
            };


            $scope.d.appState = 'show';

            console.log('(+) getEntrys ', $scope.d.diagnoses);
        });
    };

    // -----------------------------------
    // Dialogs
    // -----------------------------------

    $scope.showConfirm = function(ev, my_uid) {
        console.log('showConfirm: ', ev, my_uid);

        var myIndex = dataService.findIndex($scope.d.diagnoses, 'uniqueid', my_uid);

        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .title('Verlaufseintrag löschen?')
            .textContent('Sind Sie sicher, dass Sie die Diagnose (' + $scope.d.diagnoses[myIndex].custom_text + ') löschen möchten?')
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


    $scope.loadICD10 = function() {

        if ($scope.d.loadedICD10Data) {
            $scope.d.appInit.repos = loadAll($scope.d.ICD10_all);
        } else {
            $scope.loadICD10Sheet();
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
        $scope.loadICD10();
        $scope.d.appState = 'new';
    };

    $scope.entryEdit = function(currentUID) {
        // EDIT
        // Store current entry - just for, do not save if 'cancel'.

        var myIndex = dataService.findIndex($scope.d.diagnoses, 'uniqueid', currentUID);


        $scope.d.newEntry = angular.copy($scope.d.diagnoses[myIndex]);
        $scope.d.newEntry.datestamp_edit = new Date();
        $scope.d.newEntryID = myIndex;

        $scope.loadICD10();
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
        $scope.d.diagnoses = dataService.sortByKey($scope.d.diagnoses, 'diagn_rank')

        // Rank anpassen
        var currentIndex = dataService.findIndex($scope.d.diagnoses, 'uniqueid', currentUID);

        if (currentIndex !== 0) {
            var prevIndex = currentIndex - 1;
            $scope.d.diagnoses[currentIndex].diagn_rank = $scope.d.diagnoses[currentIndex].diagn_rank - 1;
            $scope.d.diagnoses[prevIndex].diagn_rank = $scope.d.diagnoses[prevIndex].diagn_rank + 1;

            $scope.saveDiagnoses();
            console.log('entryUp', $scope.d.diagnoses[currentIndex], currentIndex, prevIndex);
        };

    };

    $scope.entryDown = function(currentUID) {
        // Diagnose abwerten

        // Diagnosen nach 'rank' sortieren
        $scope.d.diagnoses = dataService.sortByKey($scope.d.diagnoses, 'diagn_rank');

        var max = $scope.d.diagnoses.length - 1;
        var currentIndex = dataService.findIndex($scope.d.diagnoses, 'uniqueid', currentUID);

        // Rank anpassen
        if (currentIndex !== max) {
            var nextIndex = currentIndex + 1;
            $scope.d.diagnoses[currentIndex].diagn_rank = $scope.d.diagnoses[currentIndex].diagn_rank + 1;
            $scope.d.diagnoses[nextIndex].diagn_rank = $scope.d.diagnoses[nextIndex].diagn_rank - 1;

            $scope.saveDiagnoses();
            console.log('entryDown', $scope.d.diagnoses[currentIndex], currentIndex, nextIndex);
        };


    };


    $scope.entryDelete = function(my_index) {
        $scope.d.diagnoses.splice(my_index, 1);

        // Diagnosen nach 'rank' sortieren
        $scope.d.diagnoses = dataService.sortByKey($scope.d.diagnoses, 'diagn_rank');
        // Diagnosen neu hochnummerieren.
        $scope.d.diagnoses.forEach(function(diagn, myindex) {
            diagn.diagn_rank = myindex + 1;
        });

        console.log('Deleted - Index', my_index);
        $scope.saveDiagnoses();
    };


    $scope.saveDiagnoses = function() {
        var api_call = dataService.saveAnnotationsData('patient', $scope.d.nodeTree, $scope.d.diagnoses);
        api_call.then(function(data) {
            console.log('(+) saveDiagnoses - success: ', $scope.d.diagnoses);

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
            $scope.d.diagnoses.push($scope.d.newEntry);

            // Datum erweitern.
            var date = $scope.d.newEntry.datestamp;
            $scope.d.newEntry.datestamp_sort = $filter("amDateFormat")(date, 'YYYYMMDDHHmmsssss');
            $scope.d.newEntry.datestamp_week = $filter("amDateFormat")(date, 'YYYY, ww');
            $scope.d.newEntry.datestamp_day = $filter("amDateFormat")(date, 'DD.MM.YYYY');
            $scope.d.newEntry.datestamp_full_day = $filter("amDateFormat")(date, 'dddd, Do MMMM YYYY');
            $scope.d.newEntry.datestamp_time = $filter("amDateFormat")(date, 'HH:mm');
            $scope.d.newEntry.datestamp = $scope.d.newEntry.datestamp.toString();
        };

        // Save edited entry.
        if ($scope.d.appState === 'edit') {
            $scope.d.diagnoses[$scope.d.newEntryID] = $scope.d.newEntry;

            // Datum erweitern.
            var date = $scope.d.newEntry.datestamp_edit;
            $scope.d.newEntry.datestamp_edit_sort = $filter("amDateFormat")(date, 'YYYYMMDDHHmmsssss');
            $scope.d.newEntry.datestamp_edit_week = $filter("amDateFormat")(date, 'YYYY, ww');
            $scope.d.newEntry.datestamp_edit_day = $filter("amDateFormat")(date, 'DD.MM.YYYY');
            $scope.d.newEntry.datestamp_edit_full_day = $filter("amDateFormat")(date, 'dddd, Do MMMM YYYY');
            $scope.d.newEntry.datestamp_edit_time = $filter("amDateFormat")(date, 'HH:mm');
            $scope.d.newEntry.datestamp_edit = $scope.d.newEntry.datestamp_edit.toString();
        };


        console.log('Try to save @ putHisoryPost: ', $scope.d.diagnoses);


        var api_call = dataService.saveAnnotationsData('patient', $scope.d.nodeTree, $scope.d.diagnoses);
        api_call.then(function(data) {
            console.log('(+) entrySave - success: ', $scope.d.newEntry);

            // Update Entrys
            $scope.d.appState = 'show';
            $scope.getEntrys();
        });
    };



});
