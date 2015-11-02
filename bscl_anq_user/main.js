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

            // Run App-Functions:
            //$scope.setDataView();

            var all_results = $scope.d.dataMain.calculations[0].calculation_results.all === undefined ? [] : $scope.d.dataMain.calculations[0].calculation_results.all;

            $scope.calculations = JSON.stringify(all_results, null, 4);
            $scope.calculateGroups(all_results);

            // Display Results
            $scope.d.haveData = true;

            // Finishing: Console Info & Init = done.
            console.log('Welcome, ', $scope.d.dataMain.apps.current.name, $scope.d);
            $scope.d.init = true;
            $scope.d.functions._InitData('dataMain', true);
        });
    };
    $scope.loadMainData();



    $scope.calculateGroups = function(results) {

        var my_return = {};
        my_return.all = results;

        results.forEach(function(current_result, myindex) {
            var current_patient = current_result.patient.pid

            my_return.patient_groups = {};
            var all_groups = $scope.d.dataMain.patient_groups;
            all_groups.forEach(function(patient_group, myindex) {
                my_return.patient_groups[patient_group.data.name] = patient_group;
                my_return.patient_groups[patient_group.data.name].results = [];

                var patients_in_group = my_return.patient_groups[patient_group.data.name].patients;
                console.log('patients_in_group ', patient_group.data.name, patients_in_group);

                //my_return.patient_groups[patient_group.data.name].patients.forEach(function(patient_in_group, myindex) {
                //    if (current_patient === patient_in_group.id) {
                //        my_return.patient_groups[patient_group.data.name].results.push(current_result);
                //    };
                //});

            });


        });



        console.log('calculateGroups: ', my_return);
        return my_return;
    };


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
