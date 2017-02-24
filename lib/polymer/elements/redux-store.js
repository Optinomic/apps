const initialState = {
    "loading": false,
    "clinic": {
        "error": false,
        "data": null
    },
    "currentPatient": {
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

        case 'GET_currentPatient_STAYS_COMPLETE':
            return Object.assign({}, state, {
                loading: false,
                currentPatientStays: action.data
            });

        case 'GET_CLINIC_COMPLETE':
            return Object.assign({}, state, {
                loading: false,
                clinic: action.data
            });

        case 'GET_SURVEY_RESPONSES_COMPLETE':
            return Object.assign({}, state, {
                loading: false,
                surveyResponses: action.data
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


                        data_return.komed_base_url = "https://demo.komed-health.com/chat/";
                        data_return.komed_url = data_return.komed_base_url + resp.patient.id;

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
                        var stays = resp.stays;

                        //  var data_return = {
                        //      "all": [],
                        //      "current": null
                        //  };
                        //  
                        //  var current_stay_id = parseInt(helpers.getStayID());
                        //  //data_return = createPatientExtras(data_return);
                        //  stays.forEach(function(stay, stayID) {
                        //      stay.data.id = stay.id;
                        //      stay.data.fid = stay.id;
                        //      stay.data = createStayExtras(stay.data);
                        //      data_return.all.push(stay.data);
                        //      if (current_stay_id === stay.id) {
                        //          data_return.current = stay.data;
                        //      };
                        //  });

                        var response = {
                            "error": false,
                            "data": resp
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
        },
        actionGetSurveyResponses: function() {
            return function(dispatch) {
                dispatch({
                    type: 'GET_DATA_STARTED'
                });


                // GET /stays/:stay_id/survey_responses/:module_identifier/full
                // GET /patients/:patient_id/survey_responses/:module_identifier/full

                var module_identifier = 'ch.suedhang.apps.bscl_anq';
                var current_stay_id = parseInt(helpers.getStayID());

                var data_request = 'undefined';
                if (current_stay_id) {
                    var api_url = '/stays/' + current_stay_id + '/survey_responses/' + module_identifier + '/full';
                    data_request = 'stay';
                } else {
                    var api_url = '/patients/' + helpers.getPatientID() + '/survey_responses/' + module_identifier + '/full';
                    data_request = 'patient';
                };

                // Do async task
                helpers.callAPI('GET', api_url, {}, {}, function(req) {
                    if (req.status == 200) {
                        var resp = JSON.parse(req.response);


                        // Reformat req
                        var return_array = [];
                        resp.survey_responses.forEach(function(current_response, srID) {
                            var return_obj = {};

                            return_obj.date = current_response.data.filled;

                            return_obj.response_id = current_response.id;
                            return_obj.response = current_response.data.response;

                            return_obj.event_id = current_response.data.event_id;
                            return_obj.event = {};
                            resp.events.forEach(function(current_event, eventID) {
                                if (current_event.id === current_response.data.event_id) {
                                    return_obj.event = current_event;
                                };
                            });
                        });


                        var response = {
                            "error": false,
                            "data": resp,
                            "request": data_request
                        };
                        console.log('(✔) Data (' + api_url + '):', response);
                    } else {
                        var response = {
                            "error": true,
                            "error_message": "Failed with status code: " + req.status,
                            "status_code": req.status,
                            "request": data_request
                        };
                        console.err('(!) Error: ', response);
                    };
                    dispatch({
                        type: 'GET_SURVEY_RESPONSES_COMPLETE',
                        data: response
                    });
                });
            }
        },
    }
};
