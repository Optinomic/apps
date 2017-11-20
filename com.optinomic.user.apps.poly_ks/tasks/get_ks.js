function get_ks_task() {



    callODBC().then(function(response) {

        var rows = JSON.parse(JSON.stringify(response.rows));
        console.log('(!) DATA callODBC: ', rows.length);



        enhanceODBCData(rows).then(function(saved_data) {
            console.log('(!) enhanceODBCData FINISHED! ', saved_data.length);
            // doWrite(saved_data);


            getPatients().then(function(patients_data) {
            
            
                function patientFound(value) {
                    return value = cis_pid;
                };
                
                var found_patients = [];
                
                for (var pID = 0; pID < patients_data.length; pID++) {
                    var patient = patients_data[pID];

                    var cis_pid = parseInt(patient.data.cis_pid);
                    
                    for (var odbcID = 0; odbcID < saved_data.length; odbcID++) {
                        var odbc_patient = saved_data[odbcID];
                        // console.log('(?) ', odbc_patient.PID, cis_pid);
                        
                        if (parseInt(odbc_patient.ID_PID) === cis_pid) {
                            found_patients.push(patient);
                            odbc_patient.optinomic_pid = parseInt(patient.id);
                            odbc_patient.optinomic_pid_found = true;
                            break;
                        };
                    };
                };
                
                doWrite(saved_data);
                
                
                console.log('(!) getPatients FINISHED! ', patients_data.length, found_patients.length);
                
            }).then(null, function(error) {
                console.log('(!) patients_data-ERROR, ', error);
            });


        }).then(null, function(error) {
            console.log('(!) enhanceODBCData-ERROR, ', error);
        });



    }).then(null, function(error) {
        console.log('(!) callODBC-ERROR, ', error);
    });



};


function callODBC() {

    return new Promise(function(resolve, reject) {

        var sql = include_as_js_string(odbc_kantonsstatistik_typ.sql);

        var body = {
            "query": sql,
            "direct": "True",
            "format": "json"
        };


        var api_call = "/data_sources/Polypoint/query";

        helpers.callAPI("POST", api_call, null, body, function(resp_odbc) {

            if (resp_odbc.status != 200) {
                console.error(resp_odbc.responseText);

            } else {

                if ((resp_odbc.responseText !== null) && (resp_odbc.responseText !== '')) {
                    var response = JSON.parse(resp_odbc.responseText);

                } else {
                    var response = null;
                };

            };

            resolve(response);
        });

    });
};


function getPatients(patients_data) {

    return new Promise(function(resolve, reject) {

        var api_call = "/patients";
        // console.log('(?) api_call, ', api_call);

        helpers.callAPI("GET", api_call, null, null, function(resp_patients) {
            var resp = JSON.parse(resp_patients.responseText);
            var patients = resp.patients;

            resolve(patients);
        });

    });
};

function getPatientStays(patient_id) {
    // GET /patients/:patient_id/stays
    return new Promise(function(resolve, reject) {

        var api_call = "/patients/" + patient_id + "/stays";
        // console.log('(?) api_call, ', api_call);

        helpers.callAPI("GET", api_call, null, null, function(resp_stay) {
            var stay_response = JSON.parse(resp_stay.responseText);
            var stays = stay_response.stays;

            resolve(stays);
        });
    });
};


function enhanceODBCData(odbc_data) {

    return new Promise(function(resolve, reject) {
        var saved_data = [];

        for (var rID = 0; rID < odbc_data.length; rID++) {
            var row = JSON.parse(JSON.stringify(odbc_data[rID]));


            row.WOHNSITUATION_TYP = parseInt(row.WOHNSITUATION_TYP);
            row.WEITERBEHANDLUNG_TYP = parseInt(row.WEITERBEHANDLUNG_TYP);
            row.AUSTRITT_TYP = parseInt(row.AUSTRITT_TYP);


            //Save
            saved_data.push(row);
        };

        resolve(saved_data);

    });
};


function doWrite(data) {
    writeKS(JSON.parse(JSON.stringify(data))).then(function(log_json) {
        console.log('(!) FINISHED! ');
    }).then(null, function(error) {
        console.log('(!) ANNOTATION-ERROR, ', error);
    });
};

function writeKS(odbc_data) {

    return new Promise(function(resolve, reject) {

        var d = new Date();
        var n = d.toISOString();

        var save_obj = {
            "date": n,
            "data": odbc_data
        };

        // Write Annotations
        var apiStr = '/modules/com.optinomic.user.apps.poly_ks/annotations';

        var body = {
            "value": JSON.stringify(save_obj)
        };

        helpers.callAPI("PUT", apiStr, null, body, function(resp) {
            if (resp.status != 204) {
                console.error("PUT", apiStr, resp);
            } else {
                resolve(JSON.stringify(body));
            }
        });

    });
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