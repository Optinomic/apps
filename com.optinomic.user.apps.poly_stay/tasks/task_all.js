var log = {
    "date": new Date(),
    "timings": {
        "start": new Date(),
        "end": null
    },
    "count": {
        "patients": 0,
        "stays": 0
    },
    "done": {
        "patients": [],
        "stays": []
    }
};
log.patient_filters = patient_filters;

var actions = {
    "total": 0,
    "count": 0
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

                stay.patient_id = patient_id;

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


        var annotation_obj = {
            "bel_selector": belegung.current,
            "bel_all": polypoint_belegung
        };


        var body = {
            "query": my_stay.sql,
            "direct": "True",
            "format": "json"
        };


        var api_call = "/data_sources/Polypoint/query";


        helpers.callAPI("POST", api_call, null, body, function(resp_bel) {

            // Default: Unknown
            belegung.current = belegung.art[0];

            if ((resp_bel.responseText !== null) && (resp_bel.responseText !== '')) {
                var bel_response = JSON.parse(resp_bel.responseText);

                bel_response.rows.forEach(function(bel, my_bel_index) {
                    if ((bel.ORG === "EAS") && (belegung.current.bel_id === 0)) {
                        belegung.current = belegung.art[1];
                    };
                    if ((bel.ORG === "EAS") && (belegung.current.bel_id === 2)) {
                        belegung.current = belegung.art[3];
                    };
                    if ((bel.ORG === "EP") && (belegung.current.bel_id === 0)) {
                        belegung.current = belegung.art[2];
                    };
                    if ((bel.ORG === "EP") && (belegung.current.bel_id === 1)) {
                        belegung.current = belegung.art[3];
                    };
                    if ((bel.ORG === "TK") && (belegung.current.bel_id === 0)) {
                        belegung.current = belegung.art[4];
                    };
                });


                belegung.current.optinomic_pid = my_stay.patient_id;
                belegung.current.optinomic_fid = my_stay.id;

                belegung.current.polypoint_paid = bel_response.rows[0].PAID;
                belegung.current.polypoint_pid = bel_response.rows[0].PID;
                belegung.current.polypoint_faid = bel_response.rows[0].FAID;
                belegung.current.polypoint_fid = bel_response.rows[0].FID;

                belegung.current.versicherungsnummer = bel_response.rows[0].VERSICHERUNGSNUMMER;
                belegung.current.eintritt = bel_response.rows[0].EINTRITT;
                belegung.current.eintritt_zeit = bel_response.rows[0].ZEITEINTRITT;
                belegung.current.austritt = bel_response.rows[0].AUSTRITT;
                belegung.current.austritt_zeit = bel_response.rows[0].ZEITAUSTRITT;
                belegung.current.org_current = bel_response.rows[0].ORG_CURRENT;

                belegung.current.phase = my_stay.data.phase;


            } else {
                var bel_response = null;
            };

            annotation_obj = {
                "bel_selector": belegung.current,
                "bel_all": bel_response,
                "pid": my_stay.patient_id,
                "fid": my_stay.id,
            };


            // process.stdout.write('\033[0G');
            // process.stdout.write(JSON.stringify(annotation_obj));

            resolve(JSON.stringify(annotation_obj));

        });

    });
};


function writeBelegung(annot_obj) {

    return new Promise(function(resolve, reject) {


        var patient_id = parseInt(annot_obj.aktuell_letzter.pid);

        var apiStr = '/patients/' + patient_id + '/modules/com.optinomic.init.poly_stay/annotations';
        var body = {
            "value": JSON.stringify(annot_obj)
        };

        // console.log('writeBelegung:', patient_id, body.value);

        helpers.callAPI("PUT", apiStr, null, body, function(resp_write) {
            console.log(' -> write ', patient_id);
            resolve(JSON.stringify(annot_obj));
        });



    });
};


function writeLog(log) {

    return new Promise(function(resolve, reject) {

        log.timings.end = new Date();
        log.timings.duration = log.timings.end - log.timings.start;
        log.timings.duration_min = log.timings.duration / 1000 / 60;

        // Get current logs - array
        var apiStr = '/modules/com.optinomic.apps.poly_stay/annotations';
        helpers.callAPI("GET", apiStr, null, null, function(resp_get_logs) {
            var all_logs = JSON.parse(resp_get_logs.responseText);


            // Check isEmpty
            var hasOwnProperty = Object.prototype.hasOwnProperty;

            function isEmpty(obj) {

                // null and undefined are "empty"
                if (obj == null) return true;

                // Assume if it has a length property with a non-zero value
                // that that property is correct.
                if (obj.length > 0) return false;
                if (obj.length === 0) return true;

                // If it isn't an object at this point
                // it is empty, but it can't be anything *but* empty
                // Is it empty?  Depends on your application.
                if (typeof obj !== "object") return true;

                // Otherwise, does it have any properties of its own?
                // Note that this doesn't handle
                // toString and valueOf enumeration bugs in IE < 9
                for (var key in obj) {
                    if (hasOwnProperty.call(obj, key)) return false;
                }

                return true;
            };


            if (isEmpty(all_logs)) {
                all_logs.logs = []
            };

            all_logs.logs.push(log);


            var body = {
                "value": JSON.stringify(all_logs)
            };

            // console.log('writeBelegung:', patient_id, body.value);

            helpers.callAPI("PUT", apiStr, null, body, function(resp_put_logs) {
                console.log(' -> Done:', all_logs.logs.length);
                resolve(JSON.stringify(all_logs));
            });


        });

    });
};


helpers.callAPI("GET", "/patients", patient_filters, null, function(resp) {

    var response = JSON.parse(resp.responseText);
    var patients = response.patients;
    var patients_anz = patients.length;
    var patients_count = 0;
    log.count.patients = patients.length;

    //actions.total = actions.total + patients.length;


    for (var pID = 0; pID < patients.length; pID++) {

        var current_patient = patients[pID];
        var patient_id = parseInt(current_patient.id);
        log.done.patients.push(patient_id);
        // actions.count = actions.count + 1;

        // console.log('(+)', pID, patient_id, current_patient.data.last_name);

        getStays(current_patient.id).then(function(stay_json) {
            var stays = JSON.parse(stay_json);
            log.count.stays = log.count.stays + stays.length;

            var stays_anz = stays.length;
            var stays_count = 0;

            // actions.total = actions.total + stays.length;

            for (var sID = 0; sID < stays.length; sID++) {

                var current_stay = stays[sID];
                var stay_id = parseInt(current_stay.id);
                log.done.stays.push(stay_id);


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

                var bel_array = [];
                var was_obj = {};

                belegung.art.forEach(function(bel, my_bel_index) {
                    was_obj[bel.bel_id] = false;
                });


                // console.log('---current_stay', current_stay);

                getODBCBelegung(current_stay).then(function(bel_json) {
                    stays_count = stays_count + 1;
                    var bel = JSON.parse(bel_json);

                    bel_array.push(bel);
                    was_obj[bel.bel_selector.bel_id] = true;

                    if (checkDone('Stays', stays_anz, stays_count)) {



                        var annotation_obj = {
                            "alle": bel_array,
                            "aktuell_letzter": bel_array[0],
                            "war_einmal": was_obj,
                            "war_einmal_legende": belegung.art
                        };


                        writeBelegung(annotation_obj).then(function(annotation_json) {
                            patients_count = patients_count + 1;

                            var annotation = JSON.parse(annotation_json);

                            // console.log('(✓) annotation-DATA, ', annotation);

                            if (checkDone('Patients', patients_anz, patients_count)) {


                                writeLog(log).then(function(log_json) {

                                    console.log('(✓) FINISHED! ');


                                }).then(null, function(error) {
                                    console.log('(!) ANNOTATION-ERROR, ', error);
                                });


                            };

                            // console.log('(✓) BEL-DATA, ', bel, log);

                        }).then(null, function(error) {
                            console.log('(!) ANNOTATION-ERROR, ', error);
                        });


                    };



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
