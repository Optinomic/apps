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
            $scope.setDataView();
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

        $scope.d.appInit.show_controls = [];

        $scope.d.appInit.filter = '';
        $scope.d.appInit.sortStr = '[medication_status, medication_name]';

        $scope.d.medication = [];

        $scope.d.init = true;
        $scope.d.haveData = true;
        $scope.d.loadedMedicationData = false;
        $scope.d.appState = 'show';


        $scope.d.medication_verabreichung = ['oral', 'parenteral', 'topisch']
        $scope.d.medication_status = [{
            id: 0,
            title: 'aktiv',
            color: '#FFFFFF'
        }, {
            id: 1,
            title: 'gestoppt',
            color: '#9FA8DA'
        }, {
            id: 2,
            title: 'verweigert',
            color: '#EF9A9A'
        }];


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
                medication_name: item.medi_name,
                medication_verabreichung: 'oral',
                medication_start_verordnung_datum: new Date(),
                medication_start_verordnung_user: $scope.d.dataMain.users.current.id,
                medication_dosierung_mo: 0,
                medication_dosierung_mi: 0,
                medication_dosierung_ab: 0,
                medication_dosierung_na: 0,
                medication_dosierung_interval: '',
                medication_stop_verordnung_datum: null,
                medication_stop_verordnung_user: null,
                medication_bemerkungen: '',
                medication_status: 0
            };

            $scope.createLinks();
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
            $scope.updateDataView();

            //console.log('(+) getEntrys ', $scope.d.medication);
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



    $scope.entryNotDefaultMedication = function(new_medication_name) {

        var not_default = {
            "medi_order": "999999",
            "medi_code": "",
            "medi_name": "Kein Standardmedikament (bitte spezifizieren)",
            "medi_info": "",
            "medi_activated": true,
            "_lowerCode": "",
            "_lowerName": "kein standardmedikament (bitte spezifizieren)"
        };

        // $scope.d.appInit.searchText = 'Kein Standardmedikament (bitte spezifizieren)';
        $scope.d.appInit.selectedItem = not_default;
        $scope.d.newEntry.medication_selected = true;
        $scope.d.newEntry.medication = not_default;
        $scope.d.newEntry.medi_name = new_medication_name;
    };





    $scope.entryDelete = function(my_index) {
        $scope.d.medication.splice(my_index, 1);

        // Medikamente nach 'rank' sortieren
        $scope.d.medication = dataService.sortByKey($scope.d.medication, 'medi_name');

        console.log('Deleted - Index', my_index);
        $scope.saveMedication();
    };


    $scope.saveMedication = function() {

        var api_call = dataService.saveAnnotationsData('patient', $scope.d.nodeTree, $scope.d.medication);
        api_call.then(function(data) {
            console.log('(+) saveDiagnoses - success: ', $scope.d.medication);

            // Update Entrys
            $scope.d.appState = 'show';
            $scope.getEntrys();
        });
    };

    $scope.createLinks = function() {
        // Create URL's for nice lookup
        var code_full = $scope.d.newEntry.medication_name;
        var code_dot = code_full.indexOf(' ');
        var code_parent = code_full.substring(0, code_dot);

        var search_string = "";

        if (code_dot !== -1) {
            search_string = code_parent;
        } else {
            search_string = code_full;
        };
        $scope.d.newEntry.url_compendium = "https://compendium.ch/search/all/" + search_string + "/contains/de";
        $scope.d.newEntry.url_open_drug_db = "http://just-medical.oddb.org/de/just-medical/search/zone/drugs/search_query/" + search_string + "/search_type/st_oddb#best_result";

    };


    $scope.entrySave = function() {
        // Save

        $scope.d.newEntry.uniqueid = dataService.uniqueid();
        $scope.createLinks();

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
            $scope.d.newEntry.datestamp = $scope.d.newEntry.datestamp.toString();
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
            $scope.d.newEntry.datestamp_edit = $scope.d.newEntry.datestamp_edit.toString();
        };

        console.log('Try to save: ', $scope.d.medication);
        $scope.saveMedication();
    };


    // -----------------------------------
    // DataView : angulargrid.com
    // -----------------------------------
    $scope.setDataView = function() {

        // If we have multiple surveys - make sure to take the right 'responses'.
        var currentResultGroup = 0;
        $scope.d.dataMain.survey_responses_group_definitions.forEach(function(current_group_def, myindex) {
            if (current_group_def.survey === 'aus_survey') {
                currentResultGroup = current_group_def.id;
            };
        });

        // Loop trough all responses from selected 'survey-group' above and save respnses in survey_responses_array
        $scope.d.dataMain.survey_responses_array = [];
        $scope.d.dataMain.survey_responses_group[currentResultGroup].forEach(function(current_result, myindex) {
            var my_response = current_result.entity.data.response;

            // If ng-survey survey @ some more info to 'response'.
            my_response.filled = current_result.entity.data.filled;
            my_response.survey_name = current_result.event.survey_name;

            $scope.d.dataMain.survey_responses_array.push(my_response);
        });
        var resultsArray = $scope.d.dataMain.survey_responses_array;


        // Init Responses
        $scope.d.grid = {};
        $scope.d.grid.rowData = $scope.d.functions.enrichResults(resultsArray);

        // automatic
        $scope.d.grid.columnDefs = $scope.d.functions.createColumnDefs($scope.d.grid.rowData, true);


        // DataView - Options
        $scope.d.grid.options = {
            headerHeight: 45,
            rowHeight: 28,
            rowData: $scope.d.grid.rowData,
            columnDefs: $scope.d.grid.columnDefs,
            //pinnedColumnCount: 1,
            dontUseScrolls: false,
            enableFilter: true,
            rowSelection: 'single',
            enableColResize: true,
            enableCellExpressions: true,
            enableSorting: true,
            showToolPanel: false
        };


        //console.log('dataGRID: ', $scope.d.grid);
    };


    $scope.updateDataView = function() {

        console.log(' ===== updateDataView =====');


        var NEWrowData = [{
            medication_name: "Mercedes",
            model: "Celica",
            price: 35000
        }, {
            medication_name: "BMW",
            model: "Mondeo",
            price: 32000
        }, {
            medication_name: "Ford",
            model: "Focus",
            price: 32000
        }, {
            medication_name: "Porsche",
            model: "Boxter",
            price: 72000
        }];
    };

    $scope.d.grid.options.api.setRowData(NEWrowData);

});
