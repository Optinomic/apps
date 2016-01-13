/**
 * @name Optinomic - AppCtrl
 * ---------------------------------------
 * Controller of the Optinomic-Application.
 */
app.controller('AppCtrl', function($scope, dataService, scopeDService) {

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
            $scope.getHisoryEntrys();


            // Finishing: Console Info & Init = done.
            console.log('Welcome, ', $scope.d.dataMain.apps.current.name, $scope.d);
            $scope.d.init = true;
        });
    };
    $scope.loadMainData();



    $scope.appInit = function() {
        $scope.d.nodeTree = 'hisoryentrys';
        $scope.d.nodeTree = 'gaga';
        $scope.d.appState = 'show'
        $scope.d.haveData = true;
    };



    $scope.entryCancel = function() {
        $scope.d.appState = 'show'
    };

    $scope.entryNew = function() {
        $scope.d.appState = 'new'

        // Init New Entry
        $scope.d.historyNewEntry = {
            datum: new Date(),
            dauer: 12,
            user: $scope.d.dataMain.users.current.id,
            verlauf: "Dies ist ein neuer Testeintrag bla bla bla.."
        };
    };

    $scope.entryEdit = function() {
        $scope.d.appState = 'edit'
    };

    $scope.entryDelete = function() {
        $scope.d.appState = 'show'
    };


    $scope.getHisoryEntrys = function() {

        var api_call = dataService.getPatientAnnotationsData($scope.d.nodeTree);
        api_call.then(function(data) {
            // Create Array if not already exists.
            $scope.d.historyEntrys = data === undefined ? [] : data;
            console.log('(+) getHisoryEntrys ', data, $scope.d.historyEntrys);
        });

    };

    $scope.putHisoryPost = function() {

        console.log('RUN: putHisoryPost');

        // Get Current Entrys
        $scope.getHisoryEntrys();


        // Push new Entry and Save
        $scope.d.historyEntrys.push($scope.d.historyNewEntry);

        var api_call = dataService.putPatientAnnotationsData($scope.d.nodeTree, $scope.d.historyEntrys);
        api_call.then(function(data) {
            console.log('(+) putHisoryPost ', data);

            // Update Entrys
            $scope.appInit();
            $scope.getHisoryEntrys();
        });


    };



});
