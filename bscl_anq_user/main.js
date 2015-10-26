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
            console.log('START, ', $scope.d.dataMain.apps.current.name, $scope.d);

            // Save Data to $scope.d
            $scope.d.dataMain = data;

            // Run App-Functions:
            $scope.setDataView();

            // Display Results
            $scope.d.haveData = true;

            // Finishing: Console Info & Init = done.
            console.log('Welcome, ', $scope.d.dataMain.apps.current.name, $scope.d);
            $scope.d.init = true;
            $scope.d.functions._InitData('dataMain', true);
        });
    };
    $scope.loadMainData();



    // -----------------------------------
    // DataView : angulargrid.com
    // -----------------------------------
    $scope.setDataView = function() {

        // GetData from Calculations
        var myAPI = dataService.getAppCalculationsUser('ch.suedhang.apps.bscl.anq_user', 'get_all_results');
        console.log('myAPI', myAPI);

        myAPI.success(function(data) {
            console.log('(+) getAppCalculationsUser: ', data);
        });

        myAPI.error(function(error) {
            console.log('(!) Error - getAppCalculationsUser: ', error);
        });


        // DataView - Options
        //$scope.d.grid.options = {
        //    headerHeight: 45,
        //    rowHeight: 28,
        //    //rowData: $scope.d.grid.rowData,
        //    //columnDefs: $scope.d.grid.columnDefs,
        //    //pinnedColumnCount: 1,
        //    dontUseScrolls: false,
        //    enableFilter: true,
        //    rowSelection: 'single',
        //    enableColResize: true,
        //    enableCellExpressions: true,
        //    enableSorting: true,
        //    showToolPanel: false
        //};


        //console.log('dataGRID: ', $scope.d.grid);
    };


});
