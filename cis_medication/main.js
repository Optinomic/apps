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


        // Data Grid
        $scope.d._init.grid = {
            grid_ready: false,
            data_loader: 0
        };


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

            $scope.d._init.grid.data_loader = $scope.d._init.grid.data_loader + 1;

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


        var columnDefs = [{
            cellClass: 'md-body-1',
            editable: false,
            field: "medication_name",
            headerName: "Medikament",
            headerTooltip: "Medikament-Name"
        }, {
            cellClass: 'md-body-1',
            editable: false,
            field: "medication_dosierung_mo",
            headerName: "Morgen",
            headerTooltip: "Dosierung - Morgen",
            hide: false,
            width: 80,
            suppressSizeToFit: true
        }, {
            cellClass: 'md-body-1',
            editable: false,
            field: "medication_dosierung_mi",
            headerName: "Mittag",
            headerTooltip: "Dosierung - Mittag",
            hide: false,
            width: 80,
            suppressSizeToFit: true
        }, {
            cellClass: 'md-body-1',
            editable: false,
            field: "medication_dosierung_ab",
            headerName: "Abend",
            headerTooltip: "Dosierung - Abend",
            hide: false,
            width: 80,
            suppressSizeToFit: true
        }, {
            cellClass: 'md-body-1',
            editable: false,
            field: "medication_dosierung_na",
            headerName: "Nacht",
            headerTooltip: "Dosierung - Nacht",
            hide: false,
            width: 80,
            suppressSizeToFit: true
        }];



        // Init 
        $scope.d.grid = {};
        //$scope.d.grid.options.rowData = $scope.d.functions.enrichResults(resultsArray);

        // automatic
        //$scope.d.grid.options.columnDefs = $scope.d.functions.createColumnDefs($scope.d.grid.rowData, true);


        // DataView - Options
        $scope.d.grid.options = {
            headerHeight: 45,
            rowHeight: 28,
            rowData: [],
            columnDefs: columnDefs,
            //pinnedColumnCount: 1,
            dontUseScrolls: false,
            enableFilter: true,
            rowSelection: 'single',
            enableColResize: true,
            enableCellExpressions: true,
            enableSorting: true,
            showToolPanel: false,

            // EVENTS
            onReady: function(event) {
                console.log('the grid is now ready - updating');
                $scope.d._init.grid.grid_ready = true;

            },
        };


        //console.log('dataGRID: ', $scope.d.grid);
    };


    // -----------------------------------
    // Do Stuff when all Data is loaded
    // -----------------------------------

    $scope.$watch('d._init.dataMain', function(newValue, oldValue) {
        //console.log('=== $watch - userSidebar MainCtrl ===');
        if (newValue === true) {
            console.log('FIRE: ViewPatientsCtrl');
            $scope.setPatientViews();

            // Open corresponding SideNav 
            $scope.openSidenav(1);

            if (!$scope.d.patient_page) {
                $scope.setCurrentPage();
            };
        }
    });




    $scope.updateDataView = function() {

        console.log(' ===== updateDataView =====');


        var NEWrowData = [{
            "datestamp_week": "2016, 05",
            "datestamp_edit": "Wed Jan 27 2016 20:41:39 GMT+0100 (CET)",
            "medication_start_verordnung_user": 2,
            "datestamp": "Wed Jan 27 2016 20:36:24 GMT+0100 (CET)",
            "medication_verabreichung": "oral",
            "medication_stop_verordnung_datum": null,
            "url_open_drug_db": "http://just-medical.oddb.org/de/just-medical/search/zone/drugs/search_query/SYMBICORT/search_type/st_oddb#best_result",
            "medication_dosierung_ab": 0,
            "medication_dosierung_mi": 0,
            "datestamp_time": "20:36",
            "datestamp_full_day": "Wednesday, 27th January 2016",
            "medication_dosierung_mo": 0,
            "medication_name": "SYMBICORT 100/6 Turbuhaler",
            "datestamp_edit_time": "20:41",
            "medication_dosierung_interval": "",
            "uniqueid": "XV27WPB2HYI6X9EF754SDW3C3T0VW6KR",
            "medication_dosierung_na": 1,
            "datestamp_edit_sort": "201601272041393939",
            "user": 2,
            "datestamp_day": "27.01.2016",
            "medication_start_verordnung_datum": "2016-01-27T19:36:24.131Z",
            "datestamp_edit_week": "2016, 05",
            "datestamp_edit_day": "27.01.2016",
            "medication_stop_verordnung_user": null,
            "datestamp_sort": "201601272036242424",
            "medication_selected": true,
            "$$hashKey": "object:757",
            "medication_bemerkungen": "",
            "medication_status": 0,
            "datestamp_edit_full_day": "Wednesday, 27th January 2016",
            "url_compendium": "https://compendium.ch/search/all/SYMBICORT/contains/de",
            "medication": {
                "medi_order": "100",
                "medi_info": "120 Dos",
                "medi_activated": true,
                "_lowerName": "symbicort 100/6 turbuhaler",
                "_lowerCode": "2321493",
                "medi_code": "2321493",
                "medi_name": "SYMBICORT 100/6 Turbuhaler"
            }
        }, {
            "datestamp_week": "2016, 05",
            "medication_start_verordnung_user": 2,
            "datestamp": "Wed Jan 27 2016 20:44:45 GMT+0100 (CET)",
            "medication_verabreichung": "oral",
            "medication_stop_verordnung_datum": null,
            "url_open_drug_db": "http://just-medical.oddb.org/de/just-medical/search/zone/drugs/search_query/Sugus/search_type/st_oddb#best_result",
            "medication_dosierung_ab": 1,
            "medication_dosierung_mi": 1,
            "datestamp_time": "20:44",
            "datestamp_full_day": "Wednesday, 27th January 2016",
            "medication_dosierung_mo": 0,
            "medication_name": "Sugus (gelb)",
            "medication_dosierung_interval": "",
            "uniqueid": "KYT0Q2KXLE7Q4VOY3IHVN9HF5SEJJ44X",
            "medication_dosierung_na": 0,
            "user": 2,
            "datestamp_day": "27.01.2016",
            "medication_start_verordnung_datum": "2016-01-27T19:44:45.998Z",
            "medication_stop_verordnung_user": null,
            "datestamp_sort": "201601272044454545",
            "medication_selected": true,
            "$$hashKey": "object:758",
            "medication_bemerkungen": "",
            "medication_status": 0,
            "url_compendium": "https://compendium.ch/search/all/Sugus/contains/de",
            "medication": {
                "medi_order": "999999",
                "medi_info": "",
                "medi_activated": true,
                "_lowerName": "kein standardmedikament (bitte spezifizieren)",
                "_lowerCode": "",
                "medi_code": "",
                "medi_name": "Kein Standardmedikament (bitte spezifizieren)"
            }
        }, {
            "datestamp_week": "2016, 05",
            "medication_start_verordnung_user": 2,
            "datestamp": "Wed Jan 27 2016 20:45:49 GMT+0100 (CET)",
            "medication_verabreichung": "oral",
            "medication_stop_verordnung_datum": null,
            "url_open_drug_db": "http://just-medical.oddb.org/de/just-medical/search/zone/drugs/search_query/AMARYL/search_type/st_oddb#best_result",
            "medication_dosierung_ab": 0,
            "medication_dosierung_mi": 0,
            "datestamp_time": "20:45",
            "datestamp_full_day": "Wednesday, 27th January 2016",
            "medication_dosierung_mo": 0,
            "medication_name": "AMARYL ARRAY Tabl 2 mg",
            "medication_dosierung_interval": "",
            "uniqueid": "FUNCGJM2CPHWC41VFCIEOFYS6DQTAYJF",
            "medication_dosierung_na": 0,
            "user": 2,
            "datestamp_day": "27.01.2016",
            "medication_start_verordnung_datum": "2016-01-27T19:45:49.356Z",
            "medication_stop_verordnung_user": null,
            "datestamp_sort": "201601272045494949",
            "medication_selected": true,
            "medication_bemerkungen": "",
            "medication_status": 0,
            "url_compendium": "https://compendium.ch/search/all/AMARYL/contains/de",
            "medication": {
                "medi_order": "100",
                "medi_info": "30 Stk",
                "medi_activated": false,
                "_lowerName": "amaryl tabl 2 mg",
                "_lowerCode": "1686206",
                "medi_code": "1686206",
                "medi_name": "AMARYL Tabl 2 mg"
            }
        }];

        var new_data = $scope.d.medication

        // Set Data
        $scope.d.grid.options.rowData = new_data;
        $scope.d.grid.options.api.setRowData(new_data);

        // Set Optimal Size
        $scope.d.functions.resizeGrid();


    };


    // -------------------------------------------------
    // Update Data-Grid when Data loaded & Grid is ready
    // -------------------------------------------------
    $scope.$watch('d._init.grid', function(newValue, oldValue) {
        if (($scope.d._init.grid.grid_ready === true) && ($scope.d._init.grid.data_loader > 0)) {
            // -----------------------------------
            console.log('FIRE: updateDataView');
            $scope.updateDataView();

        };
    }, true);



});
