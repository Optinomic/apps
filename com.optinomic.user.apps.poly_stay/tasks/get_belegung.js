function get_belegung_task(filters) {
    get_patients(filters, function(patients) {
        sequentially(patients, function(patient, next) {
            try {
                console.log("Processing patient #" + patient.id + " ...");
                save_belegung_for_patient(patient, next);
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

function save_belegung_for_patient(patient, next) {
    // Do something
    next();
}
