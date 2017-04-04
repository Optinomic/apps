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
                            "date": new Date(),
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
        actionLoginKomed: function() {
            return function(dispatch) {

                //const base_url = 'https://optinomic.komed-health.com';
                const base_url = 'https://demo.komed-health.com';

                const api_url = base_url + '/account/login';
                // Do async task

                var xhttp = new XMLHttpRequest();
                xhttp.open("POST", api_url, true);
                xhttp.withCredentials = true;
                xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                //xhttp.send('username=optinomic_bot&password=komedkomed');
                xhttp.send('username=drmuster&password=komedkomed');

                xhttp.onreadystatechange = function() {
                    if ((xhttp.status == 200) && (xhttp.readyState == 4)) {

                        var request_url = base_url + '/rooms';

                        var xhttp2 = new XMLHttpRequest();
                        xhttp2.open("GET", request_url, true);
                        xhttp2.withCredentials = true;
                        // xhttp2.setRequestHeader("Content-type", "application/json");
                        xhttp2.send();


                        xhttp2.onreadystatechange = function() {
                            if ((xhttp2.status == 200) && (xhttp2.readyState == 4)) {

                                var response = {
                                    "date": new Date(),
                                    "data": JSON.parse(xhttp2.responseText)
                                };

                                console.log('(✔) Data (' + api_url + '):', response);

                                dispatch({
                                    type: 'KOMED_LOGIN_COMPLETE',
                                    data: response
                                });

                            }
                        }


                    }
                };



            }
        },
        actionGetCurrentUser: function() {
            return function(dispatch) {
                dispatch({
                    type: 'GET_DATA_STARTED'
                });
                const api_url = '/users/' + helpers.getUserID();
                // Do async task
                helpers.callAPI('GET', api_url, {}, {}, function(req) {
                    if (req.status == 200) {
                        var resp = JSON.parse(req.response);
                        var data_return = resp.user.data;
                        data_return.id = resp.user.id;
                        data_return.uid = resp.user.id;
                        data_return.isAdmin = false;
                        if (resp.user.data.role === "Admin") {
                            data_return.isAdmin = true;
                        };

                        var response = {
                            "date": new Date(),
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
                        type: 'GET_CURRENT_USER_COMPLETE',
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


                        data_return.komed_base_url = "https://optinomic.komed-health.com/chat/";
                        data_return.komed_url = data_return.komed_base_url + resp.patient.id;

                        var response = {
                            "date": new Date(),
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

                        var current_stay_id = helpers.getStayID();

                        var response = {
                            "all": stays,
                            "current": {
                                "id": current_stay_id,
                                "data": null,
                                "found": false
                            }
                        }

                        stays.forEach(function(stay, stayID) {
                            stay.data = createStayExtras(stay.data);
                            stay.data.id = stay.id;
                            stay.data.fid = stay.id;
                            if (current_stay_id === stay.id) {
                                response.current.data = stay.data;
                                response.current.found = true;
                            };
                        });

                        var response = {
                            "date": new Date(),
                            "data": stays
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
        actionGetApps: function() {
            return function(dispatch) {
                dispatch({
                    type: 'GET_DATA_STARTED'
                });
                const api_url = '/modules/';
                // Do async task
                helpers.callAPI('GET', api_url, {}, {}, function(req) {
                    if (req.status == 200) {
                        var resp = JSON.parse(req.response);
                        var patient_modules = resp.patient_modules;
                        var user_modules = resp.user_modules;


                        var response = {
                            "date": new Date(),
                            "all": {
                                "patient_modules": patient_modules,
                                "user_modules": user_modules
                            },
                            "current": {
                                "id": helpers.getAppID(),
                                "name": helpers.getAppName(),
                                "data": null,
                                "found": false
                            }
                        };

                        patient_modules.forEach(function(pm, pmID) {
                            if (pm.identifier === helpers.getAppID()) {
                                response.current.data = pm;
                                response.current.name = pm.name;
                                response.current.found = true;
                            }
                        });

                        if (!response.current.found) {
                            user_modules.forEach(function(um, pmID) {
                                if (um.identifier === helpers.getAppID()) {
                                    response.current.data = um;
                                    response.current.name = um.name;
                                    response.current.found = true;
                                }
                            });
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
                        type: 'GET_APPS_COMPLETE',
                        data: response
                    });
                });
            }
        },
        actionGetSurveyResponses: function(requested_app_id) {

            return function(dispatch) {
                dispatch({
                    type: 'GET_DATA_STARTED'
                });

                module_identifier = requested_app_id === undefined ? helpers.getAppID() : requested_app_id;
                console.log('(?) actionGetSurveyResponses', module_identifier);


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
                    dispatch({
                        type: 'GET_DATA_STARTED'
                    });

                    var app_id = requested_app_id === undefined ? helpers.getAppID() : requested_app_id;
                    //console.log('(?) actionGetSurveyResponses | app_id', app_id);

                    if (req.status == 200) {
                        var resp = JSON.parse(req.response);

                        console.log('resp', resp);

                        // Reformat req
                        var return_array = [];
                        resp.survey_responses.forEach(function(current_response, srID) {
                            var return_obj = {};

                            return_obj.all_found = false;

                            return_obj.app_id = null;
                            return_obj.date = current_response.data.filled;

                            return_obj.response_id = current_response.id;
                            return_obj.response = current_response.data.response;

                            return_obj.event = null;
                            return_obj.event_found = false;
                            return_obj.event_id = current_response.data.event_id;

                            return_obj.patient = null;
                            return_obj.patient_found = false;
                            return_obj.patient_id = null;

                            return_obj.stay = null;
                            return_obj.stay_found = false;
                            return_obj.stay_id = null;

                            return_obj.patient_uses_module = null;
                            return_obj.patient_uses_module_found = false;
                            return_obj.patient_uses_module_id = null;

                            return_obj.calculation = null;
                            return_obj.calculation_found = false;
                            return_obj.calculation_found_method = null;


                            resp.events.forEach(function(current_event, eventID) {
                                if (current_event.id === current_response.data.event_id) {
                                    return_obj.event_found = true;

                                    current_event.data.id = current_event.id;
                                    return_obj.event = current_event.data;
                                    return_obj.patient_uses_module_id = current_event.data.patient_uses_module_id;
                                    return_obj.patient_id = current_event.data.patient_id;
                                    return_obj.app_id = current_event.data.module;
                                    app_id = return_obj.app_id;
                                };
                            });


                            if (return_obj.event_found) {
                                resp.patients.forEach(function(current_patient, patientID) {
                                    if (current_patient.id === return_obj.patient_id) {
                                        return_obj.patient_found = true;

                                        current_patient.data.id = current_patient.id;
                                        current_patient.data.pid = current_patient.id;

                                        current_patient.data = createPatientExtras(current_patient.data);
                                        return_obj.patient = current_patient.data;
                                    };
                                });

                                resp.patient_uses_modules.forEach(function(current_pum, pumID) {
                                    if (current_pum.id === return_obj.patient_uses_module_id) {
                                        return_obj.patient_uses_module_found = true;
                                        current_pum.data.id = current_pum.id;
                                        return_obj.patient_uses_module = current_pum.data;
                                        return_obj.stay_id = current_pum.data.stay_id;

                                    };
                                });
                            };

                            if (return_obj.stay_id) {
                                resp.stays.forEach(function(current_stay, stayID) {
                                    if (current_stay.id === return_obj.stay_id) {
                                        return_obj.stay_found = true;

                                        current_stay.data.id = current_stay.id;
                                        current_stay.data.fid = current_stay.id;
                                        current_stay.data = createStayExtras(current_stay.data);

                                        return_obj.stay = current_stay.data;
                                    };
                                });
                            };

                            resp.calculations.forEach(function(current_calculation_top, calculationID) {
                                current_calculation_top.value.forEach(function(current_calculation, calculationID) {
                                    var variant_info = false;
                                    if ("info" in current_calculation) {
                                        if ("response" in current_calculation.info) {
                                            variant_info = true;
                                        };
                                    };

                                    var variant_response = false;
                                    if ("response" in current_calculation) {
                                        if ("data" in current_calculation.response) {
                                            if ("response" in current_calculation.response.data) {
                                                variant_response = true;
                                            };
                                        };
                                    };

                                    if (variant_info) {
                                        var calc_resp = current_calculation.info.response;

                                        if (JSON.stringify(calc_resp) === JSON.stringify(return_obj.response)) {
                                            // console.log('(+) EQUAL: ', calc_resp);
                                            return_obj.calculation_found = true;
                                            return_obj.calculation_found_method = "variant_info";
                                            return_obj.calculation = current_calculation;
                                        };
                                    };

                                    if (variant_response) {
                                        var calc_resp = current_calculation.response.data.response;

                                        if (JSON.stringify(calc_resp) === JSON.stringify(return_obj.response)) {
                                            // console.log('(+) EQUAL: ', calc_resp);
                                            return_obj.calculation_found = true;
                                            return_obj.calculation_found_method = "variant_response";
                                            return_obj.calculation = current_calculation;
                                        };
                                    };


                                });
                            });

                            if (return_obj.calculation_found && return_obj.event_found && return_obj.patient_found && return_obj.stay_found && return_obj.patient_uses_module_found) {
                                return_obj.all_found = true;
                            };

                            // Return all calculations if not found.
                            if (return_obj.calculation_found === false) {
                                return_obj.calculations = resp.calculations;
                            };
                            return_array.push(return_obj);
                        });

                        var response = {
                            "date": new Date(),
                            "data": return_array,
                            "request": data_request,
                            "app_id": app_id
                        };
                        console.log('(✔) Data (' + api_url + '):', response);
                    } else {
                        var response = {
                            "error": true,
                            "error_message": "Failed with status code: " + req.status,
                            "status_code": req.status,
                            "request": data_request,
                            "app_id": app_id
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
        signUpWithTimeout: function(username) {
            return function(dispatch) {
                dispatch({
                    type: 'GET_DATA_STARTED'
                });
                // Do async task
                setTimeout(function() {
                    dispatch({
                        type: 'SIGN_UP_COMPLETE',
                        username: username
                    });
                }, 3000);
            }
        },
        actionSortSurveyResponses: function() {
            return {
                type: 'SORT_SURVEY_RESPONSES'
            };
        }
    }
};