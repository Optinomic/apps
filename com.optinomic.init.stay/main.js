/**
 * @name Optinomic - AppCtrl
 * ---------------------------------------
 * Controller of the Optinomic-Application.
 */
app.controller('AppCtrl', function($scope, $filter, dataService, scopeDService) {

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
    // Init
    // -----------------------------------
    $scope.appInit = function() {

        // Data

        var current_pid = $scope.d.dataMain.params.PID;
        var current_sid = $scope.d.dataMain.params.stay_id;

        // Data-Model

        $scope.d.stay_init = {
            "treatment": [{
                "id": 0,
                "name": "Stationär",
                "description": "Stationärer Aufenthalt",
                "departments": [{
                    "id": 1,
                    "name": "EAS",
                    "description": "Entzugs- und Abklärungsstation",
                    "current_patient": {
                        "pid": current_pid,
                        "sid": current_sid,
                        "used": false
                    }
                }, {
                    "id": 2,
                    "name": "EAS",
                    "description": "Entzugs- und Abklärungsstation",
                    "current_patient": {
                        "pid": current_pid,
                        "sid": current_sid,
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
                        "pid": current_pid,
                        "sid": current_sid,
                        "used": false
                    }
                }]
            }, {
                "id": 2,
                "name": "Ambulant",
                "description": "Ambulanter Aufenthalt",
                "departments": [{
                    "id": 1,
                    "name": "Tagesklinik",
                    "description": "Tagesklinik",
                    "current_patient": {
                        "pid": current_pid,
                        "sid": current_sid,
                        "used": false
                    }
                }]
            }]
        };

        // Set Default: treatment_id = Array Position
        $scope.d.stay_init.selected = {
            "treatment_id": 0;
        };
        $scope.changeTreatment();
    };



    // -----------------------------------
    // Button - Functions
    // -----------------------------------

    $scope.changeTreatment = function() {
        var treatment_id = $scope.d.stay_init.selected.treatment_id;
        $scope.d.stay_init.selected.treatment = $scope.d.stay_init.treatment[treatment_id];
        console.log('changeTreatment: ', $scope.d.stay_init.selected);
    };

    $scope.saveInit = function() {

        console.log('saveInit', $scope.d.stay_init);
    };




});
