const initialState = {
    "loading": false,
    "clinic": {
        "error": false,
        "data": null
    },
    "currentPatient": {
        "error": false,
        "data": null
    },
    "currentPatientStays": {
        "error": false,
        "data": null
    }
};

const reducer = (state, action) => {
    if (!state) return initialState;
    switch (action.type) {
        case 'GET_DATA_STARTED':
            return Object.assign({}, state, {
                loading: true
            });

        case 'GET_CURRENT_PATIENT_COMPLETE':
            return Object.assign({}, state, {
                loading: false,
                currentPatient: action.data
            });

        case 'GET_CURRENT_PATIENT_STAYS_COMPLETE':
            return Object.assign({}, state, {
                loading: false,
                currentPatientStays: action.data
            });

        case 'GET_CLINIC_COMPLETE':
            return Object.assign({}, state, {
                loading: false,
                clinic: action.data
            });

    }
}
const store = Redux.createStore(
    reducer,
    Redux.applyMiddleware(ReduxThunk.default)
);
const ReduxBehavior = PolymerRedux(store);
const AsyncActionsBehavior = {
    actions: {
        actionGetClinic: function() {
            return function(dispatch) {
                dispatch({
                    type: 'GET_DATA_STARTED'
                });
                const api_url = '/clinic';
                // Do async task
                helpers.callAPI('GET', api_url, {}, {}, function(req) {
                    if (req.status == 200) {
                        var resp = JSON.parse(req.response);

                        // All fields are coming as array: Make Object out of it:
                        var json_data = {};
                        resp.clinic.forEach(function(item, itemIndex) {
                            json_data[item[0]] = item[1];
                        });

                        var response = {
                            "error": false,
                            "data": json_data
                        };
                        response.data.array = resp.clinic;
                        console.log('(✔) Data (' + api_url + '):', response);
                    } else {
                        var response = {
                            "error": true,
                            "error_message": "Failed with status code: " + req.status,
                            "status_code": req.status
                        };
                        console.err('(!) Error: ', response);
                    };
                    dispatch({
                        type: 'GET_CLINIC_COMPLETE',
                        data: response
                    });
                });
            }
        },
        actionGetCurrentPatient: function() {
            return function(dispatch) {
                dispatch({
                    type: 'GET_DATA_STARTED'
                });
                const api_url = '/patients/' + helpers.getPatientID();
                // Do async task
                helpers.callAPI('GET', api_url, {}, {}, function(req) {
                    if (req.status == 200) {
                        var resp = JSON.parse(req.response);
                        var data_return = resp.patient.data;
                        data_return.id = resp.patient.id;
                        data_return.pid = resp.patient.id;
                        data_return = createPatientExtras(data_return);

                        var response = {
                            "error": false,
                            "data": data_return
                        };
                        console.log('(✔) Data (' + api_url + '):', response);
                    } else {
                        var response = {
                            "error": true,
                            "error_message": "Failed with status code: " + req.status,
                            "status_code": req.status
                        };
                        console.err('(!) Error: ', response);
                    };
                    dispatch({
                        type: 'GET_CURRENT_PATIENT_COMPLETE',
                        data: response
                    });
                });
            }
        },
        actionGetCurrentPatientStays: function() {
            return function(dispatch) {
                dispatch({
                    type: 'GET_DATA_STARTED'
                });
                const api_url = '/patients/' + helpers.getPatientID() + '/stays/';
                // Do async task
                helpers.callAPI('GET', api_url, {}, {}, function(req) {
                    if (req.status == 200) {
                        var resp = JSON.parse(req.response);
                        var data_return = resp.stays;
                        //data_return = createPatientExtras(data_return);

                        var response = {
                            "error": false,
                            "data": data_return
                        };
                        console.log('(✔) Data (' + api_url + '):', response);
                    } else {
                        var response = {
                            "error": true,
                            "error_message": "Failed with status code: " + req.status,
                            "status_code": req.status
                        };
                        console.err('(!) Error: ', response);
                    };
                    dispatch({
                        type: 'GET_CURRENT_PATIENT_STAYS_COMPLETE',
                        data: response
                    });
                });
            }
        }
    }
};
