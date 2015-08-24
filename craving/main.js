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

    var columnDefs = [{
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
    }, {
        headerTooltip: "PID",
        headerName: "Patient-ID",
        editable: false,
        field: "PID",
        width: 90
    }, {
        headerTooltip: "FID",
        headerName: "Fall-ID",
        editable: false,
        field: "FID",
        width: 90
    }];

    // DataView - Options
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
        // Get Data: d.dataMain
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

            $scope.setTimelineChartOptions();


            $scope.init = true;


            //FAKE DATA:  Do this in 'loadResults'.success
            $scope.d.haveData = true;
        });
    };
    $scope.loadMainData();




    $scope.loadResults = function() {
        // -----------------------------------
        // Get Survey-Results: 
        // -----------------------------------
        var call = dataService.getAppCalculations($scope.appID, 'another_calculation');

        call.success(function(data) {
            console.log('(DATA): getAppCalculations:', data);
        });
        call.error(function(data) {
            console.log('(ERROR): getAppCalculations:', data);
        });
    };


    $scope.setTimelineChartOptions = function() {
        // -----------------------------------
        // Chart: Timeline Options
        // -----------------------------------
        var myPatient = $scope.d.dataMain.patient.patient.data;
        var patientFullName = myPatient.last_name + ' ' + myPatient.first_name;

        $scope.d.options = {
            'title': 'Suchtdruck',
            'focusField': 'Suchtdruck_1',
            'fillDates': true,
            'firstWeekDay': 'Mo',
            'patient': patientFullName
        };


    };

});
