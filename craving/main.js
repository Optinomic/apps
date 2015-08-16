/**
 * @name Optinomic - AppCtrl
 * ---------------------------------------
 * Controller of the Optinomic-Application.
 */
app.controller('AppCtrl', function($scope, dataService, scopeDService) {

    // -----------------------------------
    // Init
    // -----------------------------------
    $scope.appID = 'com.optinomic.apps.craving';
    $scope.d = scopeDService;


    // -----------------------------------
    // DataView : angulargrid.com
    // -----------------------------------

    var columnDefs = [{
        headerTooltip: "PID",
        headerName: "Patient-ID",
        editable: false,
        field: "PID",
        width: 80
    }, {
        headerTooltip: "FID",
        headerName: "Fall-ID",
        editable: false,
        field: "FID"
    }, {
        headerName: "Datum",
        editable: true,
        field: "datestamp"
    }, {
        headerTooltip: "Suchtdruck_1",
        headerName: "Suchtdruck",
        editable: false,
        field: "Suchtdruck_1"
    }, {
        headerName: "Bemerkungen",
        editable: true,
        field: "diary"
    }];


    //$scope.d.gridOptions = {
    //    columnDefs: columnDefs,
    //    rowData: rowData,
    //    dontUseScrolls: false
    //};

    $scope.d.gridOptions = {
        columnDefs: columnDefs,
        rowData: $scope.d.craving,
        pinnedColumnCount: 1,
        dontUseScrolls: false,
        enableFilter: true,
        enableColResize: true,
        enableSorting: true
    };


    // -----------------------------------
    // Functions
    // -----------------------------------

    $scope.loadMainData = function() {
        // -----------------------------------
        // Get Data 
        // -----------------------------------
        $scope.d.haveData = false;
        var dataPromiseMain = dataService.getMainAppData($scope.appID);
        dataPromiseMain.then(function(data) {

            console.log('(DATA): loadedMainData:', data);

            // Save Data
            $scope.d.dataMain = data;

            // Check if we have survey_responses | data.
            if (data.survey_responses.length !== 0) {
                $scope.d.haveData = true;
                console.log('(DATA): haveData:', data.survey_responses.length, $scope.haveData);
            }

            // Run Functions
            console.log('Welcome, ', $scope.d.dataMain.apps.current.name, $scope.d);
            //$scope.loadResults();

            $scope.init = true;
        });
    };
    $scope.loadMainData();


    $scope.loadResults = function() {

        var call = dataService.getAppCalculations($scope.appID, 'another_calculation');

        call.success(function(data) {
            console.log('(DATA): getAppCalculations:', data);
        });
        call.error(function(data) {
            console.log('(ERROR): getAppCalculations:', data);
        });
    };

});
