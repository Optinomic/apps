/**
 * @name Optinomic - AppCtrl
 * ---------------------------------------
 * Controller of the Optinomic-Application.
 */
app.controller('AppCtrl', function($scope, $filter, $q, dataService, scopeDService) {

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
            $scope.initApp();


            // Finishing: Console Info & Init = done.
            console.log('Welcome, ', $scope.d.dataMain.apps.current.name, $scope.d);
            $scope.d.init = true;
        });
    };
    $scope.loadMainData();


    $scope.initApp = function() {
        var app = {
            "patients": {
                "odbc": false,
                "loaded": false,
                "data": []
            },
            "status": {
                "text": "Applikation initialisieren."
            }
        };

        $scope.d.app = app;

        $scope.getPatientList();
    };


    $scope.getPatientList = function() {
        // Init - Params

        $scope.d.app.status.text = "Patienten (in aktueller Behandlung) laden.";

        var patientListFilter = {
            "gender": '',
            "city": null,
            "zip_code": null,
            "age_over": null,
            "age_under": null,
            "in_stay": 'True',
            "lead_therapist": null,
            "cis_lead_doctor": null,
            "stay_start_before": null,
            "stay_start_after": null,
            "stay_stop_before": null,
            "stay_stop_after": null
        };


        var myAPI = dataService.getPatientsStays(patientListFilter);

        myAPI.then(function(data) {
            console.log('success: getPatientList', data);
            $scope.d.app.status.text = "Patienten (in aktueller Behandlung) geladen.";


            $scope.d.app.patients.loaded = true;
            $scope.d.app.patients.data = {};


            var dataPromiseODBC = $scope.getODBCData(data.patients);
            dataPromiseODBC.then(function(data) {
                $scope.d.app.patients.odbc = true;
                $scope.d.app.status.text = "Belegung aller Patienten ermittelt.";


                console.log('(YES) dataPromiseODBC', data);
                $scope.d.app.patients.data = data;
            });


        });


    };


    $scope.getODBCData = function(patients) {

        // Init - Params


        // Actions
        var actions = patients.length;
        var actions_count = 0;

        // Init
        var deferred = $q.defer();
        var api = '';
        var return_data = {};


        // Get poly_pid | poly_fid
        patients.forEach(function(patient, my_patient_index) {
            actions = actions + patient.data.stays.length;
            actions_count = actions_count + 1;




            patient.data.stays.forEach(function(stay, my_stay_index) {
                var cis_fid_str = stay.data.cis_fid.toString();
                cis_fid_str = cis_fid_str.substring(0, (cis_fid_str.length - 2));

                stay.poly_pid = parseInt(cis_fid_str.substring(0, (cis_fid_str.length - 2)));
                stay.poly_fid = parseInt(cis_fid_str.substring((cis_fid_str.length - 1), (cis_fid_str.length)));



                var sql = include_as_js_string(belegung_history_from_fid.sql);
                sql = sql.replace("%poly_pid%", stay.poly_pid);
                sql = sql.replace("%poly_fid%", stay.poly_fid);



                // INIT
                var format = 'json';
                var delimitter = ';';
                var including_headers = 'True';
                var direct = 'True';

                //dataService.runDataSource = function(my_query, my_source, my_delimiter, my_including_headers, my_format, my_direct)
                var api = dataService.runDataSource(sql, 'Polypoint', delimitter, including_headers, format, direct);
                var aODBC = dataService.getData(api);

                aODBC.then(function(data) {

                    $scope.d.app.status.text = "Belegung für Patient (" + my_patient_index + "/" + patients.length + ") ermitteln.";


                    stay.polypoint_belegung = data;

                    // Deferred when done.
                    actions_count = actions_count + 1;
                    if (dataService.checkSuccess(actions, actions_count)) {
                        deferred.resolve(patients);
                    };

                }, function(error) {

                    stay.polypoint_belegung = error;

                    // Error
                    deferred.reject(return_data);
                    console.log('-- Error:', error);
                });


                // console.log('STAY: ', my_patient_index, my_stay_index, sql);

                // stay.polypoint_belegung = {};
                // stay.polypoint_belegung = $scope.runODBC(sql);


            });
        });

        return deferred.promise;

    };



    $scope.initODBC = function() {

        // -----------------------------------
        // Init: ODBC Objekt
        // -----------------------------------

        var odbc = {
            "data_packages": [{
                "name": 'Belegung - History | from FID',
                "sql": include_as_js_string(
                    belegung_history_from_fid.sql)
            }],
            "current": {
                "selected": false,
                "executed": false,
                "package": {},
                "data": {}
            }
        };



        $scope.d.odbc = odbc;
        console.log('initODBC :: ', $scope.d.odbc);
    };


    $scope.downloadODBC = function() {

        var fileName = $scope.d.odbc.current.package.name;
        fileName = fileName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        fileName = fileName + '.json';

        var data = $scope.d.odbc.current.data;

        dataService.saveData(data, fileName);
    };


    $scope.runODBC = function(sql) {

        // -----------------------------------
        // RUN: ODBC Objekt
        // -----------------------------------


        // INIT
        var query = sql;
        var format = 'json';
        var delimitter = ';';
        var including_headers = 'True';
        var direct = 'True';

        //dataService.runDataSource = function(my_query, my_source, my_delimiter, my_including_headers, my_format, my_direct)
        var api = dataService.runDataSource(query, 'Polypoint', delimitter, including_headers, format, direct);

        api.success(function(data) {

            console.log('(DATA) runODBC  :: ', data);

            return data;

        });


        api.error(function(data) {
            console.log('ERROR: runODBC: ', data);
        });


        console.log('runODBC :: ', sql);
    };




});
