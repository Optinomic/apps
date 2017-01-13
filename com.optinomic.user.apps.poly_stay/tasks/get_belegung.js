function get_belegung_task(filters) {
    get_patients(filters, function(patients) {
        sequentially_patients(patients, function(patient, next_patient) {
            try {
                console.log("Processing patient #" + patient.id + " ...");


                get_patient_stays(patient, function(patient_stays) {
                    sequentially_stays(patient_stays, function(patient_stay, next_stay) {
                        try {

                            console.log("Processing patient #" + patient.id + " | stay #" + patient_stay.id + " ...");

                            process_stay(patient_stay, next_stay);


                        } catch (e) {
                            console.error(e);
                            next_stay();
                        }
                    });

                    next_patient();

                });

            } catch (e) {
                console.error(e);
                next_patient();
            }
        });
    });
}

function sequentially_patients(objs, f) {
    var i = 0;
    var l = objs.length;
    var next_patient = function() {
        if (i < l) {
            var obj = objs[i];
            i++;
            f(obj, next_patient);
        }
    };
    next_patient();
}

function sequentially_stays(objs, f) {
    var i = 0;
    var l = objs.length;
    var next_stay = function() {
        if (i < l) {
            var obj = objs[i];
            i++;
            f(obj, next_stay);
        }
    };
    next_stay();
}



function get_patients(filters, callback) {
    helpers.callAPI("GET", "/patients", filters, null, function(patients_resp) {
        if (patients_resp.status != 200) {
            console.error(patients_resp.responseText);
        } else {
            var patients = JSON.parse(patients_resp.responseText).patients;
            callback(patients);
        }
    });
}

function get_patient_stays(patient, callback) {

    var api_call = "/patients/" + patient.id + "/stays";

    helpers.callAPI("GET", api_call, null, null, function(stays_resp) {
        if (stays_resp.status != 200) {
            console.error(stays_resp.responseText);
        } else {
            var patient_stays = JSON.parse(stays_resp.responseText).stays;
            callback(patient_stays);
        }
    });
}


function process_stay(stay, next_stay) {

    var cis_fid_str = stay.data.cis_fid.toString();
    cis_fid_str = cis_fid_str.substring(0, (cis_fid_str.length - 2));

    var poly_pid = parseInt(cis_fid_str.substring(0, (cis_fid_str.length - 2)));
    var poly_fid = parseInt(cis_fid_str.substring((cis_fid_str.length - 2), (cis_fid_str.length)));

    var sql = include_as_js_string(belegung_history_from_fid.sql);
    sql = sql.replace("%poly_pid%", poly_pid);
    sql = sql.replace("%poly_fid%", poly_fid);


    var body = {
        "query": sql,
        "direct": "True",
        "format": "json"
    };


    var api_call = "/data_sources/Polypoint/query";

    var return_obj = {};

    helpers.callAPI("POST", api_call, null, body, function(resp_bel) {

        if (resp_bel.status != 200) {
            console.error(resp_bel.responseText);
            next_stay();
        } else {
            return_obj = JSON.parse(resp_bel.responseText);
            console.log('return_obj', stay, return_obj);
            next_stay();
        }

    });
}


function save_belegung_for_patient(input, next) {

    // console.log('(INPUT) save_belegung_for_patient', input);
    // Do something
    next();
}
