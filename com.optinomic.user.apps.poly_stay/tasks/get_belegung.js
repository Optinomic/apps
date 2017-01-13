function get_belegung_task(filters) {
    get_patients(filters, function(patients) {
        sequentially_patients(patients, function(patient, next_patient) {
            try {
                console.log("Processing patient #" + patient.id + " ...");


                get_patient_stays(patient, function(patient_stays) {
                    sequentially_stays(patient_stays, function(patient_stay, next_stay) {
                        try {
                            console.log("Processing patient #" + patient.id + " | stay #" + patient_stay.id + " ...");




                            get_stays_odbc(patient_stay, function(patient_stays_odbc) {
                                sequentially_odbc(patient_stays_odbc, function(patient_stay_odbc, next_odbc) {
                                    try {
                                        console.log("Processing patient #" + patient.id + " | stay #" + patient_stay.id + " | ODBC ...");
                                        save_belegung_for_patient(patient_stay_odbc, next_odbc);

                                    } catch (e) {
                                        console.error(e);
                                        next_odbc();
                                    }
                                });

                                next_stay();

                            });





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


function get_stays_odbc(stay, callback) {

    var sql = include_as_js_string(belegung_history_test.sql);

    var body = {
        "query": sql,
        "direct": "True",
        "format": "json"
    };


    var api_call = "/data_sources/Polypoint/query";


    helpers.callAPI("POST", api_call, null, body, function(resp_bel) {


        if (resp_bel.status != 200) {
            console.error(resp_bel.responseText);
        } else {
            var stay_odbc = JSON.parse(resp_bel.responseText);
            console.log('stay_odbc', stay, stay_odbc);

            callback(stay_odbc);
        }
    });
}


function save_belegung_for_patient(input, next) {

    // console.log('(INPUT) save_belegung_for_patient', input);
    // Do something
    next();
}
