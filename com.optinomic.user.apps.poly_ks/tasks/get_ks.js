function get_ks_task() {



    callODBC().then(function(response) {

        var rows = JSON.parse(JSON.stringify(response.rows));
        console.log('(!) DATA callODBC: ', rows.length);


        var saved_data = [];

        for (var rID = 0; rID < rows.length; rID++) {
            var row = response.rows[rID];



            // STATISTIK_KANTON_AUSTRITTSART
            var TYP_AUSTRITTSART = "90";
            row.TYP_AUSTRITTSART = TYP_AUSTRITTSART;

            //STATISTIK_KANTON_WEITERBEH
            row.TYP_WEITERBEHANDLUNG = TYP_AUSTRITTSART;

            //STATISTIK_KANTON_WOHNSITUATION
            row.TYP_WOHNSITUATION = TYP_AUSTRITTSART;

            //STATISTIK_KANTON_NEUEADRESSE
            if (row.STATISTIK_KANTON_NEUEADRESSE === "Keine neue Adresse oder Telefonnummer") {
                row.TYP_NEUE_ADRESSE = "0";
            } else {
                row.TYP_NEUE_ADRESSE = "1";
            };


            console.log('(!) row =', rID, row.TYP_AUSTRITTSART, row.STATISTIK_KANTON_AUSTRITTSART);

            //Save
            saved_data.push(row);
        };

        console.log('(!) DATA SAVE: ', saved_data.length);

        writeKS(JSON.parse(JSON.stringify(saved_data))).then(function(log_json) {
            console.log('(!) FINISHED! ');
        }).then(null, function(error) {
            console.log('(!) ANNOTATION-ERROR, ', error);
        });

    }).then(null, function(error) {
        console.log('(!) callODBC-ERROR, ', error);
    });


};


function callODBC() {

    return new Promise(function(resolve, reject) {

        var sql = include_as_js_string(odbc_kantonsstatistik.sql);

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

        helpers.callAPI("PUT", apiStr, null, body, function() {
            resolve(JSON.stringify(body));
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