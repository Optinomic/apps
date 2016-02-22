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
        $scope.d.medication_reserve = [];
        $scope.d.medication_reserve_abgabe = [];

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

            // Wirte Medication-Name only if not 'Kein Standardmedikament'
            if (parseInt(item.medi_order) !== 999999) {
                $scope.d.newEntry.medication_name = item.medi_name;
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

        // -------------------------------------
        // Medication
        // -------------------------------------

        $scope.d.medication = [];

        var node = $scope.d.nodeTree;
        var api_call = dataService.getAnnotationsData('patient', node);
        api_call.then(function(data) {

            // Create Array if not already exists.
            if (dataService.isEmpty(data)) {
                $scope.d.medication = [];
            } else {
                $scope.d.medication = angular.copy(data);

                var shouldSave = false;


                // Add special fields
                $scope.d.medication.forEach(function(row, myindex) {

                    row.display = row.medication_name + ' ';
                    row.display = row.display + ' ( ' + row.medication_dosierung_mo;
                    row.display = row.display + ' - ' + row.medication_dosierung_mi;
                    row.display = row.display + ' - ' + row.medication_dosierung_ab;
                    row.display = row.display + ' - ' + row.medication_dosierung_na + ' ) ';


                    row.medication_status_bezeichnung = $scope.d.medication_status[parseInt(row.medication_status)].title;

                    row.medication_start_verordnung_user_initals = '?';
                    row.medication_start_verordnung_user_name = '?';
                    row.medication_stop_verordnung_user_initals = '?';
                    row.medication_stop_verordnung_user_name = '?';
                    $scope.d.dataMain.users.all.forEach(function(user, myindex) {
                        if (user.id === row.medication_start_verordnung_user) {
                            row.medication_start_verordnung_user_initals = user.data.initials;
                            row.medication_start_verordnung_user_name = user.data.extras.name;
                        };

                        if (user.id === row.medication_stop_verordnung_user) {
                            row.medication_stop_verordnung_user_initals = user.data.initials;
                            row.medication_stop_verordnung_user_name = user.data.extras.name;
                        };
                    });

                    // Convert to "Date Instance".

                    row.datestamp = $scope.d.functions.sureDateInstance(row.datestamp);

                    if (row.datestamp_edit) {
                        row.datestamp_edit = $scope.d.functions.sureDateInstance(row.datestamp_edit);
                    };
                    row.medication_start_verordnung_datum = $scope.d.functions.sureDateInstance(row.medication_start_verordnung_datum);

                    if (row.medication_stop_verordnung_datum !== null) {
                        row.medication_stop_verordnung_datum = $scope.d.functions.sureDateInstance(row.medication_stop_verordnung_datum);


                        if (parseInt(row.medication_status) === 0) {
                            // Gestoppt automatisch setzen - falls nötig.

                            var stop_d = row.medication_stop_verordnung_datum;
                            stop_d.setHours(0, 0, 0, 0, 0);
                            var date = new Date();
                            var heute_d = date;
                            heute_d.setHours(0, 0, 0, 0, 0);

                            console.log(' STOP? ---------- ', heute_d.getTime() >= stop_d.getTime(), stop_d, heute_d);


                            if (heute_d.getTime() > stop_d.getTime()) {
                                row.medication_status = 1; //gestoppt.
                                shouldSave = true;
                            };
                        };

                    };

                });


                if (shouldSave) {
                    console.log('Saved Medication because of changes in medication_status');
                    $scope.saveMedication();
                };

            };


            $scope.d.appState = 'show';
            $scope.d._init.grid.data_loader = $scope.d._init.grid.data_loader + 1;

            console.log('(+) getEntrys: medication', $scope.d.medication);
        });


        // -------------------------------------
        // Abgabe der Reserve
        // -------------------------------------

        $scope.d.medication_reserve = [];
        var node = $scope.d.nodeTree + '_reserve';
        var api_call = dataService.getAnnotationsData('patient', node);
        api_call.then(function(data) {


            // Create Array if not already exists.
            if (dataService.isEmpty(data)) {
                $scope.d.medication_reserve = [];
            } else {
                $scope.d.medication_reserve = angular.copy(data);

                var shouldSave = false;

            };


            $scope.d.appState = 'show';
            $scope.d._init.grid.data_loader = $scope.d._init.grid.data_loader + 1;

            console.log('(+) getEntrys: medication_reserve', $scope.d.medication_reserve);

        });


        // -------------------------------------
        // Abgabe der Reserve
        // -------------------------------------

        $scope.d.medication_reserve_abgabe = [];
        var node = $scope.d.nodeTree + '_reserve_abgabe';
        var api_call = dataService.getAnnotationsData('patient', node);
        api_call.then(function(data) {


            // Create Array if not already exists.
            if (dataService.isEmpty(data)) {
                $scope.d.medication_reserve_abgabe = [];
            } else {
                $scope.d.medication_reserve_abgabe = angular.copy(data);

                var shouldSave = false;

            };


            $scope.d.appState = 'show';
            $scope.d._init.grid.data_loader = $scope.d._init.grid.data_loader + 1;

            console.log('(+) getEntrys: medication_reserve_abgabe', $scope.d.medication_reserve_abgabe);

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
            .title($scope.d.medication[myIndex].display)
            .textContent('Sind Sie sicher, dass Sie das Medikament löschen möchten?')
            .ariaLabel('Medikament löschen')
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
        $scope.d._init.grid.grid_ready = false;

    };

    $scope.entryEdit = function(currentUID) {
        // EDIT
        // Store current entry - just for, do not save if 'cancel'.

        var myIndex = dataService.findIndex($scope.d.medication, 'uniqueid', currentUID);


        $scope.d.newEntry = angular.copy($scope.d.medication[myIndex]);
        $scope.d.newEntry.datestamp_edit = new Date();
        $scope.d.newEntryID = myIndex;

        // Make sure - value is a 'date instance' and not a string.
        $scope.d.newEntry.medication_start_verordnung_datum = $scope.d.functions.sureDateInstance($scope.d.newEntry.medication_start_verordnung_datum);
        $scope.d.newEntry.medication_stop_verordnung_datum = $scope.d.functions.sureDateInstance($scope.d.newEntry.medication_stop_verordnung_datum);
        $scope.d.newEntry.datestamp = $scope.d.functions.sureDateInstance($scope.d.newEntry.datestamp);
        $scope.d.newEntry.datestamp_edit = $scope.d.functions.sureDateInstance($scope.d.newEntry.datestamp_edit);


        $scope.loadMedis();
        $scope.d.appInit.autofocus = false;
        $scope.d.appInit.selectedItem = $scope.d.newEntry.diagn;
        $scope.d.appState = 'edit';
        $scope.d._init.grid.grid_ready = false;


        console.log('entryEdit: ', myIndex, $scope.d.newEntry, $scope.d._init.grid);
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

        if ($scope.d.newEntry.medication_start_verordnung_datum) {
            var date = $scope.d.newEntry.medication_start_verordnung_datum;
            $scope.d.newEntry.medication_start_verordnung_datum_sort = $filter("amDateFormat")(date, 'YYYYMMDDHHmmsssss');
            $scope.d.newEntry.medication_start_verordnung_datum_week = $filter("amDateFormat")(date, 'YYYY, ww');
            $scope.d.newEntry.medication_start_verordnung_datum_day = $filter("amDateFormat")(date, 'DD.MM.YYYY');
            $scope.d.newEntry.medication_start_verordnung_datum_time = $filter("amDateFormat")(date, 'HH:mm');
        };

        if ($scope.d.newEntry.medication_stop_verordnung_datum) {
            var date = $scope.d.newEntry.medication_stop_verordnung_datum;
            $scope.d.newEntry.medication_stop_verordnung_datum_sort = $filter("amDateFormat")(date, 'YYYYMMDDHHmmsssss');
            $scope.d.newEntry.medication_stop_verordnung_datum_week = $filter("amDateFormat")(date, 'YYYY, ww');
            $scope.d.newEntry.medication_stop_verordnung_datum_day = $filter("amDateFormat")(date, 'DD.MM.YYYY');
            $scope.d.newEntry.medication_stop_verordnung_datum_time = $filter("amDateFormat")(date, 'HH:mm');
        };


        // Push new Entry if 'new'
        if ($scope.d.appState === 'new') {
            $scope.d.medication.push($scope.d.newEntry);

            // Datum erweitern.
            var date = $scope.d.newEntry.datestamp;
            $scope.d.newEntry.datestamp_sort = $filter("amDateFormat")(date, 'YYYYMMDDHHmmsssss');
            $scope.d.newEntry.datestamp_week = $filter("amDateFormat")(date, 'YYYY, ww');
            $scope.d.newEntry.datestamp_day = $filter("amDateFormat")(date, 'DD.MM.YYYY');
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
            $scope.d.newEntry.datestamp_edit_time = $filter("amDateFormat")(date, 'HH:mm');
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
            headerTooltip: "Medikament-Name",
            pinned: 'left'
        }, {
            cellClass: 'md-body-1',
            editable: false,
            field: "medication_dosierung_mo",
            headerName: "Mo",
            headerTooltip: "Dosierung - Morgen",
            hide: false,
            width: 48,
            suppressSizeToFit: true
        }, {
            cellClass: 'md-body-1',
            editable: false,
            field: "medication_dosierung_mi",
            headerName: "Mi",
            headerTooltip: "Dosierung - Mittag",
            hide: false,
            width: 48,
            suppressSizeToFit: true
        }, {
            cellClass: 'md-body-1',
            editable: false,
            field: "medication_dosierung_ab",
            headerName: "Ab",
            headerTooltip: "Dosierung - Abend",
            hide: false,
            width: 48,
            suppressSizeToFit: true
        }, {
            cellClass: 'md-body-1',
            editable: false,
            field: "medication_dosierung_na",
            headerName: "Na",
            headerTooltip: "Dosierung - Nacht",
            hide: false,
            width: 48,
            suppressSizeToFit: true
        }, {
            headerName: null,
            headerTooltip: "In Compedium nachschlagen",
            width: 30,
            suppressSizeToFit: true,
            templateUrl: 'https://rawgit.com/Optinomic/apps/master/cis_medication/templates/partial/template_info.html'
        }, {
            cellClass: 'md-body-1',
            editable: false,
            field: "medication_dosierung_interval",
            headerName: "Interval",
            headerTooltip: "Verabreichung - Interval",
            hide: true
        }, {
            cellClass: 'md-body-1',
            editable: false,
            field: "medication_status",
            headerName: "Status ID",
            headerTooltip: "Status Code",
            width: 52,
            hide: true
        }, {
            cellClass: 'md-body-1',
            editable: false,
            field: "medication_status_bezeichnung",
            headerName: "Status",
            headerTooltip: "Status Bezeichnung",
            width: 52,
            hide: true
        }, {
            cellClass: 'md-body-1',
            editable: false,
            field: "medication_verabreichung",
            headerName: "Verabreichung",
            headerTooltip: "Verabreichung",
            width: 62,
            hide: true
        }, {
            cellClass: 'md-body-1',
            editable: false,
            field: "medication_start_verordnung_datum_day",
            headerName: "Start",
            headerTooltip: "Verordnung - Start",
            width: 88,
            suppressSizeToFit: true,
            hide: false
        }, {
            cellClass: 'md-body-1',
            editable: false,
            field: "medication_start_verordnung_user",
            headerName: "UID",
            headerTooltip: "Verordnung durch Benutzer ID - Start",
            hide: true
        }, {
            cellClass: 'md-body-1',
            editable: false,
            field: "medication_start_verordnung_user_name",
            headerName: "Name",
            headerTooltip: "Name des Verordners - Start",
            hide: true
        }, {
            cellClass: 'md-body-1',
            editable: false,
            field: "medication_start_verordnung_user_initals",
            headerName: "Kürzel",
            headerTooltip: "Kürzel des Verordners - Start",
            width: 24,
            suppressSizeToFit: true,
            hide: true
        }, {
            cellClass: 'md-body-1',
            editable: false,
            field: "medication_stop_verordnung_datum_day",
            headerName: "Stop",
            headerTooltip: "Verordnung - Stop",
            width: 88,
            suppressSizeToFit: true,
            hide: false
        }, {
            cellClass: 'md-body-1',
            editable: false,
            field: "medication_stop_verordnung_user",
            headerName: "UID",
            headerTooltip: "Verordnung durch Benutzer ID - Stop",
            hide: true
        }, {
            cellClass: 'md-body-1',
            editable: false,
            field: "medication_stop_verordnung_user_name",
            headerName: "Name",
            headerTooltip: "Name des Verordners - Stop Datum",
            hide: true
        }, {
            cellClass: 'md-body-1',
            editable: false,
            field: "medication_stop_verordnung_user_initals",
            headerName: "Kürzel",
            headerTooltip: "Kürzel des Verordners - Stop Datum",
            width: 24,
            suppressSizeToFit: true,
            hide: true
        }, {
            headerName: null,
            headerTooltip: "Medikament bearbeiten",
            width: 30,
            suppressSizeToFit: true,
            templateUrl: 'https://rawgit.com/Optinomic/apps/master/cis_medication/templates/partial/template_edit.html'
        }, {
            headerName: null,
            headerTooltip: "Medikament löschen",
            width: 30,
            suppressSizeToFit: true,
            templateUrl: 'https://rawgit.com/Optinomic/apps/master/cis_medication/templates/partial/template_delete.html'
        }, {
            cellClass: 'md-body-1',
            editable: false,
            field: "medication_bemerkungen",
            headerName: "Bemerkung",
            headerTooltip: "Bemerkungen zur Medikation",
            hide: true
        }, {
            cellClass: 'md-body-1',
            editable: false,
            field: "datestamp_day",
            headerName: "Erstelldatum",
            headerTooltip: "Erstellt - Datum",
            hide: true
        }, {
            cellClass: 'md-body-1',
            editable: false,
            field: "datestamp_time",
            headerName: "Erstellzeit",
            headerTooltip: "Erstellt - Zeit",
            hide: true
        }, {
            cellClass: 'md-body-1',
            editable: false,
            field: "datestamp_edit_day",
            headerName: "Bearbeitungsdatum",
            headerTooltip: "Bearbeitet - Datum",
            hide: true
        }, {
            cellClass: 'md-body-1',
            editable: false,
            field: "datestamp_edit_time",
            headerName: "Bearbeitungszeit",
            headerTooltip: "Bearbeitet - Zeit",
            hide: true
        }];


        var columnDefsReserve = [{
            cellClass: 'md-body-1',
            editable: false,
            field: "medication_name",
            headerName: "Medikament",
            headerTooltip: "Reserve - Medikament",
            pinned: 'left'
        }, {
            cellClass: 'md-body-1',
            editable: false,
            field: "medication_dosierung",
            headerName: "Dosierung (max/24h)",
            headerTooltip: "Reserve - Dosierung (maximal innert 24h)",
            hide: false
        }, {
            headerName: null,
            headerTooltip: "In Compedium nachschlagen",
            width: 30,
            suppressSizeToFit: true,
            templateUrl: 'https://rawgit.com/Optinomic/apps/master/cis_medication/templates/partial/template_info.html'
        }, {
            cellClass: 'md-body-1',
            editable: false,
            field: "medication_indikation",
            headerName: "Indikation",
            headerTooltip: "Reserve - Indikation",
            hide: true
        }, {
            cellClass: 'md-body-1',
            editable: false,
            field: "medication_status",
            headerName: "Status ID",
            headerTooltip: "Status Code",
            width: 52,
            hide: true
        }, {
            cellClass: 'md-body-1',
            editable: false,
            field: "medication_status_bezeichnung",
            headerName: "Status",
            headerTooltip: "Status Bezeichnung",
            width: 52,
            hide: true
        }, {
            cellClass: 'md-body-1',
            editable: false,
            field: "medication_start_verordnung_datum_day",
            headerName: "Start",
            headerTooltip: "Verordnung - Start",
            width: 88,
            suppressSizeToFit: true,
            hide: false
        }, {
            cellClass: 'md-body-1',
            editable: false,
            field: "medication_start_verordnung_user",
            headerName: "UID",
            headerTooltip: "Verordnung durch Benutzer ID - Start",
            hide: true
        }, {
            cellClass: 'md-body-1',
            editable: false,
            field: "medication_start_verordnung_user_name",
            headerName: "Name",
            headerTooltip: "Name des Verordners - Start",
            hide: true
        }, {
            cellClass: 'md-body-1',
            editable: false,
            field: "medication_start_verordnung_user_initals",
            headerName: "Kürzel",
            headerTooltip: "Kürzel des Verordners - Start",
            width: 24,
            suppressSizeToFit: true,
            hide: true
        }, {
            cellClass: 'md-body-1',
            editable: false,
            field: "medication_stop_verordnung_datum_day",
            headerName: "Stop",
            headerTooltip: "Verordnung - Stop",
            width: 88,
            suppressSizeToFit: true,
            hide: false
        }, {
            cellClass: 'md-body-1',
            editable: false,
            field: "medication_stop_verordnung_user",
            headerName: "UID",
            headerTooltip: "Verordnung durch Benutzer ID - Stop",
            hide: true
        }, {
            cellClass: 'md-body-1',
            editable: false,
            field: "medication_stop_verordnung_user_name",
            headerName: "Name",
            headerTooltip: "Name des Verordners - Stop Datum",
            hide: true
        }, {
            cellClass: 'md-body-1',
            editable: false,
            field: "medication_stop_verordnung_user_initals",
            headerName: "Kürzel",
            headerTooltip: "Kürzel des Verordners - Stop Datum",
            width: 24,
            suppressSizeToFit: true,
            hide: true
        }, {
            headerName: null,
            headerTooltip: "Medikament bearbeiten",
            width: 30,
            suppressSizeToFit: true,
            templateUrl: 'https://rawgit.com/Optinomic/apps/master/cis_medication/templates/partial/template_edit.html'
        }, {
            headerName: null,
            headerTooltip: "Medikament löschen",
            width: 30,
            suppressSizeToFit: true,
            templateUrl: 'https://rawgit.com/Optinomic/apps/master/cis_medication/templates/partial/template_delete.html'
        }, {
            cellClass: 'md-body-1',
            editable: false,
            field: "medication_bemerkungen",
            headerName: "Bemerkung",
            headerTooltip: "Bemerkungen zur Medikation",
            hide: true
        }, {
            cellClass: 'md-body-1',
            editable: false,
            field: "datestamp_day",
            headerName: "Erstelldatum",
            headerTooltip: "Erstellt - Datum",
            hide: true
        }, {
            cellClass: 'md-body-1',
            editable: false,
            field: "datestamp_time",
            headerName: "Erstellzeit",
            headerTooltip: "Erstellt - Zeit",
            hide: true
        }, {
            cellClass: 'md-body-1',
            editable: false,
            field: "datestamp_edit_day",
            headerName: "Bearbeitungsdatum",
            headerTooltip: "Bearbeitet - Datum",
            hide: true
        }, {
            cellClass: 'md-body-1',
            editable: false,
            field: "datestamp_edit_time",
            headerName: "Bearbeitungszeit",
            headerTooltip: "Bearbeitet - Zeit",
            hide: true
        }];


        // DataView - Options
        $scope.d.grid.options = $scope.d.grid.default_options;
        $scope.d.grid.options.columnDefs = columnDefs;

        // DataView - Options
        $scope.d.grid_reserve = $scope.d.grid.options;
        $scope.d.grid_reserve.options = $scope.d.grid.default_options;
        $scope.d.grid_reserve.options.columnDefs = columnDefsReserve;

    };




    $scope.updateDataView = function() {



        // Sorting

        var sortModel = [{
            colId: 'medication_status',
            sort: 'asc'
        }, {
            colId: 'medication_name',
            sort: 'asc'
        }];



        // columnDefs - cellStyle or medication_status

        $scope.d.grid.options.columnDefs.forEach(function(columnDef, myindex) {
            columnDef.cellClass = function(params) {

                var return_class = null
                var status = parseInt(params.data.medication_status);

                if (status === 1) {
                    return_class = 'medication-stop';
                };

                if (status === 2) {
                    return_class = 'medication-verweigert';
                };

                return return_class;
            }
        });



        // Enrich results
        var medication_data = $scope.d.functions.enrichResults($scope.d.medication);
        //console.log('medication_data', medication_data, $scope.d.medication);


        // Set Data
        $scope.d.grid.options.rowData = medication_data;
        //$scope.d.grid.options.api.setRowData(medication_data);
        $scope.d.grid.options.api.setSortModel(sortModel);
        $scope.d.grid.options.api.sizeColumnsToFit();


        // --------------------------
        // RESERVE
        // --------------------------

        // Enrich results
        var medication_reserve_data = $scope.d.functions.enrichResults($scope.d.medication_reserve);


        // columnDefs - cellStyle or medication_status

        $scope.d.grid_reserve.options.columnDefs.forEach(function(columnDef, myindex) {
            columnDef.cellClass = function(params) {

                var return_class = null
                var status = parseInt(params.data.medication_status);

                if (status === 1) {
                    return_class = 'medication-stop';
                };

                if (status === 2) {
                    return_class = 'medication-verweigert';
                };

                return return_class;
            }
        });


        // Set Data
        //$scope.d.grid_reserve.options.rowData = medication_reserve_data;
        $scope.d.grid_reserve.options.api.setRowData(medication_reserve_data);
        $scope.d.grid_reserve.options.api.setSortModel(sortModel);
        $scope.d.grid_reserve.options.api.sizeColumnsToFit();

        console.log(' =====> updateDataView: ', $scope.d.grid, $scope.d.grid_reserve);

    };


    // -------------------------------------------------
    // Update Data-Grid when Data loaded & Grid is ready
    // -------------------------------------------------
    $scope.$watch('d._init.grid', function(newValue, oldValue) {
        if (($scope.d._init.grid.grid_ready === true) && ($scope.d._init.grid.data_loader > 0)) {
            // -----------------------------------
            console.log('FIRE: watch - run: updateDataView');
            $scope.updateDataView();

        };
    }, true);



});
