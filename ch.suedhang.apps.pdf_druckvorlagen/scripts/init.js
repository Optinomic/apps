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


        // Get all Templates
        $scope.d.templates = $scope.getTemplates();


        // Get current Stay
        var current_stay_id = $scope.d.dataMain.params.stay_id;
        var current_pid = $scope.d.dataMain.params.PID;
        $scope.d.current_stay = null;

        $scope.d.dataMain.patient.stays.forEach(function(current_stay, myStayID) {
            if (current_stay.id === current_stay_id) {
                $scope.d.current_stay = dataService.createStayExtras(current_pid, current_stay);
            };
        });


        // Load App-Data
        $scope.d.appData = {};

        $scope.loadAppData('ch.suedhang.apps.actinfo_ein', false);
        $scope.loadAppData('ch.suedhang.apps.aase-g', false);
        $scope.loadAppData('ch.suedhang.apps.tmt_V3', false);
        $scope.loadAppData('ch.suedhang.apps.bscl_anq', false);
        $scope.loadAppData('ch.suedhang.apps.bdi', false);
        $scope.loadAppData('ch.suedhang.apps.isk', false);
        $scope.loadAppData('ch.suedhang.apps.sci', false);
        $scope.loadAppData('com.optinomic.apps.whoqol', false);
        $scope.loadAppData('ch.suedhang.apps.actinfo_aus', false);

        // $scope.loadAppData('ch.suedhang.apps.case.new', false);


        $scope.d.loader = {
            "actions": 9,
            "count": 0,
            "done": false
        };





        // Finishing: Console Info & Init = done.
        console.log('Welcome, ', $scope.d.dataMain.apps.current.name, $scope.d);
        $scope.d.init = true;
    });
};
$scope.loadMainData();


// -------------------------------------------
// Helper - Functions
// -------------------------------------------

$scope.roundToTwo = function(num) {
    // Round a Number to 0.X 
    return +(Math.round(num + "e+2") + "e-2");
};

$scope.sortByKey = function(array, key) {
    return array.sort(function(a, b) {
        var x = a[key];
        var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
};

$scope.twoDigits = function(id) {
    var return_text = '';
    id = parseInt(id);
    if (id < 10) {
        return_text = '0' + id.toString();
    } else {
        return_text = id.toString();
    };
    return return_text;
};
