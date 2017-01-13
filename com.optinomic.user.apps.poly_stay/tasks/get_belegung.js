function get_belegung_task(filters) {
    get_patients(filters, function(patients) {
        sequentially(patients, function(patient, next) {
            try {
                console.log("Processing patient #" + patient.id + " ...");




                get_patient_stays(patient.id, function(patient_stays) {
                    sequentially(patient_stays, function(patient_stay, next_patient_stay) {
                        try {
                            console.log("Processing stay #" + patient_stay.id + " ...");
                            save_belegung_for_patient(patient_stay, next_patient_stay);

                        } catch (e) {
                            console.error(e);
                            next_patient_stay();
                        }
                    });
                });



            } catch (e) {
                console.error(e);
                next();
            }
        });
    });
}

function sequentially(objs, f) {
    var i = 0;
    var l = objs.length;
    var next = function() {
        if (i < l) {
            var obj = objs[i];
            i++;
            f(obj, next);
        }
    };
    next();
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

function get_patient_stays(patient_id, callback) {

    var api_call = "/patients/" + patient_id + "/stays";

    helpers.callAPI("GET", api_call, null, null, function(stays_resp) {
        if (stays_resp.status != 200) {
            console.error(stays_resp.responseText);
        } else {
            var patient_stays = JSON.parse(stays_resp.responseText).stays;
            callback(patient_stays);
        }
    });
}



function save_belegung_for_patient(input, next) {

    console.log('(INPUT) save_belegung_for_patient', patient_stay);
    // Do something
    next();
}
