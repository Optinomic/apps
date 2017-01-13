function get_belegung_task(filters) {
    get_patients(filters, function(patients) {
        sequentially_patients(patients, function(patient, next_patient) {
            try {
                console.log("Processing patient #" + patient.id + " ...");


                get_patient_stays(patient, function(patient_stays) {
                    sequentially_stays(patient_stays, function(patient_stay, next_stay) {
                        try {

                            console.log("Processing patient #" + patient.id + " | stay #" + patient_stay.id + " ...");

                            get_stays_odbc(patient_stay).then(function(stay_odbc) {
                                console.log("   =>   ", stay_odbc);
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


function get_stays_odbc(stay) {

    return new Promise(function(resolve, reject) {

        var sql = include_as_js_string(belegung_history_test.sql);

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


            } else {
                return_obj = JSON.parse(resp_bel.responseText);

            }

            console.log('return_obj', return_obj);
            return new return_obj;

            resolve(return_obj);
        });


    });

}


function save_belegung_for_patient(input, next) {

    // console.log('(INPUT) save_belegung_for_patient', input);
    // Do something
    next();
}


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
