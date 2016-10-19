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
        $scope.d.haveData = true;
        var dataPromiseMain = dataService.getMainAppData();
        dataPromiseMain.then(function(data) {

            // Save Data to $scope.d
            $scope.d.dataMain = data;

            // Save results from "tmt_scores" in $scope
            $scope.getCalculation();

            // Finishing: Console Info & Init = done.
            console.log('Welcome, ', $scope.d.dataMain.apps.current.name, $scope.d);
            // console.log(' - (Calculation): tmt_scores: ', $scope.d.dataMain.calculations[1].calculation_results);

            $scope.d.init = true;
        });
    };
    $scope.loadMainData();


    // -----------------------------------
    // Calculations
    // -----------------------------------

    $scope.getCalculation = function() {
        // Get specific calculation - Unneded already in 'd.dataMain.calculations[0].calculation_results'
        var call = dataService.getAppCalculationsUser('ch.suedhang.user.apps.tmt', 'tmt_klinikstichprobe');

        call.success(function(data) {
            // Save Data to $scope.d
            $scope.d.calculations = data.calculation_result;
            console.log('(DATA): getCalculation | tmt_klinikstichprobe: ', $scope.d.calculations);
        });
        call.error(function(data) {
            console.log('(ERROR): getCalculation | tmt_klinikstichprobe:', data);
        });
    };


    // -------------------
    // TMT Init
    // -------------------
    $scope.tmt_init = function() {

        // Simulate responses from 'calculation'
        // var d = $scope.d.dataMain.calculations[0].calculation_results.full;
        var pg = $scope.d.dataMain.patient_groups;

        // Calculate stuff
        // var patient_scores = $scope.getPatientScores(d);
        // var age_edu_obj = $scope.getAgeEduObj()
        // var age_edu_scores = $scope.arrangePatientScoresAgeEdu(patient_scores);
        // var age_edu_statistics = $scope.setAgeEduStatistics(age_edu_scores);


        // var group_scores = $scope.getPatientGroupScores(patient_scores, pg);

        // Safe
        $scope.d.tmt = {};
        // $scope.d.tmt.patient_scores = patient_scores;
        // $scope.d.tmt.age_edu_obj = age_edu_obj;
        // $scope.d.tmt.age_edu_scores = age_edu_scores;
        // $scope.d.tmt.age_edu_statistics = age_edu_statistics;


        // $scope.d.tmt.group_scores = group_scores;

        console.log('TMT', $scope.d.tmt);

    };




});
