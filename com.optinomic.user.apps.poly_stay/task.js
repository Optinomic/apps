function main(token) {


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
    }


    function getStays(patient_id) {

        // GET /patients/:patient_id/stays

        return new Promise(function(resolve, reject) {

            var api_call = "/patients/" + patient_id + " /stays";

            helpers.callAPI("GET", api_call, null, null, function(resp_stay) {
                var stay_response = JSON.parse(resp_stay.responseText);
                var stays = stay_response.stays;

                console.log('(!) stays =', patient_id, stay_response.length);

                resolve(stays);
            });
        });
    }




    helpers.callAPI("GET", "/patients", null, null, function(resp) {

        var response = JSON.parse(resp.responseText);
        var patients = response.patients;
        console.log('(!) patients =', patients);


        for (var pID = 0; pID < patients.length; pID++) {

            var current_patient = patients[pID];
            console.log('(+)', pID, current_patient.id, current_patient.data.last_name);


            getStays(current_patient.id).then(function(json) {
                var obj = JSON.parse(json);
                console.log('(!) YES, ', obj);

            }).then(null, function(error) {
                console.log('(!) ERROR, ', error);
            });

        };


    });
}
