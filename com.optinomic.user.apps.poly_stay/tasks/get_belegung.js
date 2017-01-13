function get_belegung_task(filters) {
    get_patients(filters, function(patients) {
        sequentially_patients(patients, function(patient, next_patient) {
            try {
                console.log("Processing patient #" + patient.id + " ...");


                get_patient_stays(patient.id, function(patient_stays) {
                    sequentially_stays(patient_stays, function(patient_stay, next_stay) {
                        try {
                            console.log("Processing stay #" + patient_stay.id + " ...");
                            save_belegung_for_patient(patient_stay, next_stay);

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

function sequentially_odbc(objs, f) {
    var i = 0;
    var l = objs.length;
    var next_odbc = function() {
        if (i < l) {
            var obj = objs[i];
            i++;
            f(obj, next_odbc);
        }
    };
    next_odbc();
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

    console.log('(INPUT) save_belegung_for_patient', input);
    // Do something
    next_stay();
}
