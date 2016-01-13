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
            $scope.getHisoryPosts();


            // Finishing: Console Info & Init = done.
            console.log('Welcome, ', $scope.d.dataMain.apps.current.name, $scope.d);
            $scope.d.init = true;
        });
    };
    $scope.loadMainData();



    $scope.appInit = function() {
        $scope.d.nodeTree = 'hisoryentrys';
        $scope.d.nodeTree = 'gaga';
        $scope.d.haveData = true;
    };


    $scope.getHisoryPosts = function() {

        var api_call = dataService.getPatientAnnotationsData($scope.d.nodeTree);
        api_call.then(function(data) {
            // Create Array if not already exists.
            $scope.d.historyEntrys = data.historyEntrys === undefined ? [] : data.historyEntrys;
            console.log('(+) getHisoryPosts ', data, $scope.d.historyEntrys);
        });

    };

    $scope.putHisoryPost = function() {

        console.log('RUN: putHisoryPost');

        // Get Current Entrys
        $scope.getHisoryPosts();


        // Push new Entry and Save
        var entry = {
            datum: "21.5.1973",
            dauer: 12,
            verlauf: "Dies ist ein Testeintrag bla bla bla.."
        };

        $scope.d.historyEntrys.push(entry);

        var api_call = dataService.putPatientAnnotationsData($scope.d.nodeTree, $scope.d.historyEntrys);
        api_call.then(function(data) {
            console.log('(+) getHisoryPosts ', data);

            // Get Current Entrys
            $scope.getHisoryPosts();
        });


    };



});
