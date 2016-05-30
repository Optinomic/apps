/**
 * @name Optinomic - AppCtrl
 * ---------------------------------------
 * Controller of the Optinomic-Application.
 */
app.controller('AppCtrl', function($scope, $filter, dataService, scopeDService) {

    // Data-Sharing (do not remove)
    $scope.d = scopeDService;


    // -----------------------------------
    // Main - Functions
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


            $scope.d.haveData = true;
            // Run App-Functions:
            $scope.appInit();


            // Finishing: Console Info & Init = done.
            console.log('Welcome, ', $scope.d.dataMain.apps.current.name, $scope.d);
            $scope.d.init = true;
        });
    };
    $scope.loadMainData();



    // -----------------------------------
    // Application - Init
    // -----------------------------------
    $scope.appInit = function() {

        // Data
        $scope.d.nodeTree = 'init_stay';

        var current_pid = $scope.d.dataMain.params.PID;
        var current_sid = $scope.d.dataMain.params.stay_id;

        // Data-Model

        $scope.d.init_stay = {
            "treatment": [{
                "id": 0,
                "name": "Stationär",
                "description": "Stationärer Aufenthalt",
                "departments": [{
                    "id": 1,
                    "name": "EAS",
                    "description": "Entzugs- und Abklärungsstation",
                    "current_patient": {
                        "used": false
                    }
                }, {
                    "id": 2,
                    "name": "EP",
                    "description": "Entwöhnungsprogramm",
                    "current_patient": {
                        "used": false
                    }
                }]
            }, {
                "id": 1,
                "name": "Teilstationär",
                "description": "Teilstätionärer Aufenthalt",
                "departments": [{
                    "id": 1,
                    "name": "Tagesklinik",
                    "description": "Tagesklinik",
                    "current_patient": {
                        "used": false
                    }
                }]
            }, {
                "id": 2,
                "name": "Ambulant",
                "description": "Ambulanter Aufenthalt",
                "departments": [{
                    "id": 1,
                    "name": "Amulant",
                    "description": "Ambulante Behnadlung am Eigerplatz",
                    "current_patient": {
                        "used": false
                    }
                }]
            }]
        };

        // Set Default: treatment_id = Array Position
        $scope.d.init_stay.selected = {
            "pid": current_pid,
            "sid": current_sid,
            "treatment_id": 0,
            "treatment": {}
        };

        $scope.d.init_stay.current = {
            "pid": current_pid,
            "sid": current_sid,
            "treatment_id": 99999,
            "treatment": {}
        };

        // Show the Details of a History
        $scope.d.init_stay.show_details = {
            "show": false,
            "data": {}
        };

        // For saving the history
        $scope.d.init_stay.history_states = [];

        // For saving the history
        $scope.d.init_stay.patient_group_selector = {};

        // Toggle Visibility
        $scope.d.init_stay.debug = false;
        $scope.d.init_stay.show_history = false;



        // Get Stored Data
        $scope.getInit();
    };




    // -----------------------------------
    // Button - Functions
    // -----------------------------------

    $scope.setCurrentTreatment = function(item) {
        $scope.d.init_stay.selected = item;
    };


    $scope.changeTreatment = function() {
        var treatment_id = parseInt($scope.d.init_stay.selected.treatment_id);
        var current_treatment_id = parseInt($scope.d.init_stay.current.treatment_id);

        if (treatment_id === current_treatment_id) {
            $scope.d.init_stay.selected = angular.copy($scope.d.init_stay.current);
        } else {
            $scope.d.init_stay.selected.treatment = angular.copy($scope.d.init_stay.treatment[treatment_id]);
        };

        //console.log('changeTreatment: ', treatment_id, $scope.d.init_stay.selected, $scope.d.init_stay);
    };


    $scope.showDetails = function(item) {
        // Show always
        $scope.d.init_stay.show_details.show = true;

        // Set Data
        $scope.d.init_stay.show_details.data = item;
    };




    // -----------------------------------
    // Data - Functions (save / load)
    // -----------------------------------

    $scope.savePatientGroupObject = function(my_json) {

        // --------------------------------------------
        // Save and proceed.
        // --------------------------------------------
        var api_write = dataService.putPatientModuleAnnotations(angular.toJson(my_json));

        var aPromise = dataService.getData(api_write);
        aPromise.then(function(data) {

            var text = '(✓) ' + $scope.d.nodeTree + ': Erfolgreich gespeichert.';
            $scope.d.functions.showSimpleToast(text);

            console.log(text, my_json);
            deferred.resolve(return_data);

        }, function(error) {
            // Error
            deferred.reject(error);
            console.log('ERROR: savePatientGroupObject', error);
        });
    };



    $scope.saveInit = function() {

        var nodeTree = $scope.d.nodeTree;
        var history = $scope.d.init_stay.history_states;


        // -------------------------------------
        // Build History - Array
        // -------------------------------------

        history.forEach(function(item, myindex) {
            item.current = false;
        });

        var date = new Date();
        var history_obj = {
            'data': angular.copy($scope.d.init_stay.selected),
            'nodeTree': nodeTree,
            'current': true,
            'datestamp': date,
            'sort': $filter("amDateFormat")(date, 'YYYYMMDDHHmm'),
            'date': $filter("amDateFormat")(date, 'DD.MM.YYYY'),
            'time': $filter("amDateFormat")(date, 'HH:mm')
        };

        history.push(history_obj);


        var patientGroupSelectorObj = {
            "EAS": true
        };


        var saveJSON = {
            "history": history,
            "patient_group_selector": patientGroupSelectorObj
        };

        console.log('saveInit ->  TRY TO SAVE: ', saveJSON);

        // Save History - Array
        //var api_call = dataService.saveAnnotationsData('patient', nodeTree, saveJSON);
        //api_call.then(function(data) {
        //
        //    var text = '(✓) ' + nodeTree + ': Erfolgreich gespeichert.';
        //    //console.log(text, angular.toJson(current_array_to_save, true));
        //
        //    // Update Entrys
        //    $scope.d.functions.showSimpleToast(text);
        //    $scope.getInit();
        //});

        $scope.savePatientGroupObject(saveJSON);

    };


    $scope.getInit = function() {

        var nodeTree = $scope.d.nodeTree;

        // -------------------------------------
        // Get History - Array
        // -------------------------------------

        var api_call = dataService.getAnnotationsData('patient', nodeTree);
        api_call.then(function(data) {


            if (dataService.isEmpty(data)) {
                console.log('getInit = Empty');
            } else {
                console.log('getInit = ', data);

                $scope.d.init_stay.history_states = angular.copy(data.history);
                $scope.d.init_stay.patient_group_selector = angular.copy(data.patient_group_selector);

                $scope.d.init_stay.history_states.forEach(function(item, myindex) {

                    item.data.treatment_id = parseInt(item.data.treatment_id);

                    // Check if 'current'?  Y:Save
                    if (item.current) {
                        $scope.d.init_stay.current = angular.copy(item.data);
                        $scope.d.init_stay.selected = angular.copy(item.data);
                        //console.log('(✓) setCurrentTreatment: ', item.data);
                    };
                });
            };


            // Set Default
            $scope.changeTreatment();

            //console.log('(✓) getInit: ', $scope.d.init_stay.history_states);

        });
    };


});
