function main(token) {

    //    Run this thing:
    //    cd /var/therapyserver/
    //    therapy-server-components task-runner /var/therapyserver/config/config.json com.optinomic.apps.poly_stay get_belegung


    // Currently on STAY.
    var patient_filters = {
        in_stay: "True"
    };


    var log = {
        "date": new Date(),
        "count": {
            "patients": 0,
            "stays": 0,
            "bel_odbc": 0,
            "annotiations": 0
        },
        "done": {
            "patients": [],
            "stays": [],
            "bel_odbc": [],
            "annotiations": []
        }
    };



    function Promise(fn) {
        var state = 'pending';
        var value;
        var deferred = null;

        function resolve(newValue) {
            try {
                if (newValue && typeof newValue.then === 'function') {
                    newValue.then(resolve, reject);
                    return;
                }
                state = 'resolved';
                value = newValue;

                if (deferred) {
                    handle(deferred);
                }
            } catch (e) {
                reject(e);
            }
        }

        function reject(reason) {
            state = 'rejected';
            value = reason;

            if (deferred) {
                handle(deferred);
            }
        }

        function handle(handler) {
            if (state === 'pending') {
                deferred = handler;
                return;
            }

            var handlerCallback;

            if (state === 'resolved') {
                handlerCallback = handler.onResolved;
            } else {
                handlerCallback = handler.onRejected;
            }

            if (!handlerCallback) {
                if (state === 'resolved') {
                    handler.resolve(value);
                } else {
                    handler.reject(value);
                }

                return;
            }

            var ret;
            try {
                ret = handlerCallback(value);
                handler.resolve(ret);
            } catch (e) {
                handler.reject(e);
            }
        }

        this.then = function(onResolved, onRejected) {
            return new Promise(function(resolve, reject) {
                handle({
                    onResolved: onResolved,
                    onRejected: onRejected,
                    resolve: resolve,
                    reject: reject
                });
            });
        };

        fn(resolve, reject);
    };


    function getStays(patient_id) {
        // GET /patients/:patient_id/stays
        return new Promise(function(resolve, reject) {

            var api_call = "/patients/" + patient_id + "/stays";
            // console.log('(?) api_call, ', api_call);

            helpers.callAPI("GET", api_call, null, null, function(resp_stay) {
                var stay_response = JSON.parse(resp_stay.responseText);
                var stays = stay_response.stays;


                for (var sID = 0; sID < stays.length; sID++) {
                    var stay = stays[sID];

                    var cis_fid_str = stay.data.cis_fid.toString();
                    cis_fid_str = cis_fid_str.substring(0, (cis_fid_str.length - 2));

                    stay.poly_pid = parseInt(cis_fid_str.substring(0, (cis_fid_str.length - 2)));
                    stay.poly_fid = parseInt(cis_fid_str.substring((cis_fid_str.length - 2), (cis_fid_str.length)));

                    var sql = include_as_js_string(belegung_history_from_fid.sql);
                    sql = sql.replace("%poly_pid%", stay.poly_pid);
                    sql = sql.replace("%poly_fid%", stay.poly_fid);

                    stay.sql = sql;

                    // console.log('(!) stay =', patient_id, stays.length, cis_fid_str, stay.poly_pid, stay.poly_fid);
                };



                resolve(JSON.stringify(stays));
            });
        });
    };


    function getODBCBelegung(my_stay) {

        // GET /patients/:patient_id/stays
        return new Promise(function(resolve, reject) {


            var polypoint_belegung = {};



            var belegung = {
                "art": [{
                    "bel_id": 0,
                    "name": "Unbekannt",
                    "description": "Unbekannt / Nicht festgelegt"
                }, {
                    "bel_id": 1,
                    "name": "EAS",
                    "description": "Entzugs- und Abklärungsstation"
                }, {
                    "bel_id": 2,
                    "name": "EP",
                    "description": "Entwöhnungsprogramm"
                }, {
                    "bel_id": 3,
                    "name": "EAS & EP",
                    "description": "Entzugs- & Abklärungsstation sowie Entwöhnungsprogramm"
                }, {
                    "bel_id": 4,
                    "name": "TK",
                    "description": "Tagesklinik"
                }],
                "current": {}
            };
            belegung.current = belegung.art[0];


            var belegung = {
                "body": polypoint_belegung,
                "api_str": api_call
            };


            var annotation_obj = {
                "bel_selector": belegung.current,
                "bel_all": polypoint_belegung
            };


            var query_stuff = {
                "query": my_stay.sql,
                "delimiter": ";",
                "direct": "True",
                "format": "json"
            }

            var api_call = "/data_sources/Polypoint/query";


            //   helpers.callAPI("GET", api_call, null, null, function(resp_stay) {
            //   
            //   
            //       
            //   });

            var annotation_obj = {
                "bel_selector": belegung.current,
                "bel_all": polypoint_belegung
            };
            resolve(JSON.stringify(annotation_obj));

        });
    };


    function writeBelegung(annot_obj) {

        console.log('---writeBelegung', annot_obj);


        return new Promise(function(resolve, reject) {

            resolve(JSON.stringify(annot_obj));

        });
    };





    helpers.callAPI("GET", "/patients", patient_filters, null, function(resp) {

        var response = JSON.parse(resp.responseText);
        var patients = response.patients;
        log.count.patients = patients.length;


        for (var pID = 0; pID < patients.length; pID++) {

            var current_patient = patients[pID];
            var patient_id = parseInt(current_patient.id);
            log.done.patients.push(patient_id);


            // console.log('(+)', pID, patient_id, current_patient.data.last_name);

            getStays(current_patient.id).then(function(stay_json) {
                var stays = JSON.parse(stay_json);
                log.count.stays = log.count.stays + stays.length;

                for (var sID = 0; sID < stays.length; sID++) {

                    var current_stay = stays[sID];
                    var stay_id = parseInt(current_stay.id);
                    log.done.stays.push(stay_id);


                    // console.log('---current_stay', current_stay);

                    getODBCBelegung(current_stay).then(function(bel_json) {
                        var bel = JSON.parse(bel_json);

                        process.stdout.write('\033[0G');
                        process.stdout.write('(✓) BEL-DATA: ' + patient_id + ' | ' + stay_id);
                        // console.log('(✓) BEL-DATA, ', bel, log);

                    }).then(null, function(error) {
                        console.log('(!) BEL-ERROR, ', error);
                    });

                };

                // console.log('(✓) STAY-DATA, ', patients.length, current_stay);

            }).then(null, function(error) {
                console.log('(!) ERROR, ', error);
            });

        };


        // console.log('(!) Total Patients =', patients.length);


    });
}
