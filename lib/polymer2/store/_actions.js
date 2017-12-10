const AsyncActionsBehavior = {
  actions: {

    // ----------------------------------
    // User
    // ----------------------------------

    getCurrentUser: function(user_id) {

      var api_url = '/users/' + user_id;
      var state_path = 'user.info';

      if (ApiHelpers.shouldCallNow(api_url)) {

        return function(dispatch) {
          dispatch({
            type: 'GET_DATA_STARTED'
          });

          // Do async task
          ApiHelpers.callAPI('GET', api_url, {}, {}, function(req) {
            if (req.status == 200) {

              var resp = JSON.parse(req.response);

              var user = resp.user.data;
              user.user_id = user_id;
              user.is_admin = false;
              if (user.role === 'Admin') {
                user.is_admin = true;
              };

              var response = {
                "user_id": user_id,
                "data": user
              };

              response = addOptinomicExtras(response, api_url);
              dispatch({
                "type": "SET_OBJECT",
                "data": response,
                "statePath": state_path
              });

              console.log('(✔) Data (' + api_url + '):', response);
            } else {
              // Errorhandling
              // While what action with what params error happend
              var error_action = {
                "name": "getCurrentUser",
                "params": []
              }
              error_action.params.push(user_id);

              dispatch({
                "type": "ERROR",
                "error": handleError(req, error_action)
              });
            };

          });
        };
      } else {
        return function(dispatch) {};
      };
    },

    setAnnotations: function(node, object, always) {
      node = node || 'undefined';
      object = object || {};
      always = always || false;

      var api_url = '/annotations';
      var state_path = 'annotations';

      if ((ApiHelpers.shouldCallNow(api_url)) || always) {

        return function(dispatch) {
          dispatch({
            type: 'GET_DATA_STARTED'
          });

          // Do async task
          ApiHelpers.callAPI('GET', api_url, {}, {}, function(req) {
            if (req.status == 200) {

              var annotations = JSON.parse(req.response);
              annotations[node] = object;
              var response = {
                "user_id": user_id,
                "data": annotations
              };
              console.log('(✔) Data (' + api_url + '):', response);
              response = addOptinomicExtras(response, api_url);
              dispatch({
                "type": "SET_OBJECT",
                "data": response,
                "statePath": state_path
              });

              setTimeout(function() {
                var put_parameters = {
                  "value": JSON.stringify(annotations),
                  "benign_change": "True",
                };
                // Do async task
                ApiHelpers.callAPI('PUT', api_url, {}, put_parameters, function(req) {
                  if (req.status == 204) {
                    console.log('(✔) Saved ', node);
                  } else {
                    var response = {
                      "error": true,
                      "error_message": "Failed with status code: " + req.status,
                      "status_code": req.status
                    };
                    console.error('(!) Error: ', response);
                  };
                });
              }, 250);



            } else {
              // Errorhandling
              // While what action with what params error happend
              var error_action = {
                "name": "setAnnotations",
                "params": []
              }
              error_action.params.push(node);
              error_action.params.push(object);
              error_action.params.push(always);

              dispatch({
                "type": "ERROR",
                "error": handleError(req, error_action)
              });
            };


          });
        };
      } else {
        return function(dispatch) {};
      };
    },

    getCurrentUserAnnotations: function(user_id) {

      var api_url = '/users/' + user_id + '/annotations';
      var state_path = 'user.annotations';

      if (ApiHelpers.shouldCallNow(api_url)) {

        return function(dispatch) {
          dispatch({
            type: 'GET_DATA_STARTED'
          });

          // Do async task
          ApiHelpers.callAPI('GET', api_url, {}, {}, function(req) {
            if (req.status == 200) {

              var annotations = JSON.parse(req.response);

              var response = {
                "user_id": user_id,
                "data": annotations
              };

              response = addOptinomicExtras(response, api_url);
              dispatch({
                "type": "SET_OBJECT",
                "data": response,
                "statePath": state_path

              });
              console.log('(✔) Data (' + api_url + '):', response);
            } else {
              // Errorhandling
              // While what action with what params error happend
              var error_action = {
                "name": "getCurrentUserAnnotations",
                "params": []
              }
              error_action.params.push(user_id);

              dispatch({
                "type": "ERROR",
                "error": handleError(req, error_action)
              });
            };


          });
        };
      } else {
        return function(dispatch) {};
      };
    },

    setCurrentUserAnnotations: function(user_id, node, object, always) {
      user_id = user_id || Session.getUserID();
      node = node || 'undefined';
      object = object || {};
      always = always || false;

      var api_url = '/users/' + user_id + '/annotations';
      var state_path = 'user.annotations';

      if ((ApiHelpers.shouldCallNow(api_url)) || always) {

        return function(dispatch) {

          // Do async task
          ApiHelpers.callAPI('GET', api_url, {}, {}, function(req) {
            if (req.status == 200) {

              var annotations = JSON.parse(req.response);
              annotations[node] = object;
              var response = {
                "user_id": user_id,
                "data": annotations
              };
              console.log('(✔) Data (' + api_url + '):', response);
              response = addOptinomicExtras(response, api_url);
              dispatch({
                "type": "SET_OBJECT",
                "data": response,
                "statePath": state_path
              });

              setTimeout(function() {
                var put_parameters = {
                  "value": JSON.stringify(annotations),
                  "benign_change": "True",
                };
                // Do async task
                ApiHelpers.callAPI('PUT', api_url, {}, put_parameters, function(req) {
                  if (req.status == 204) {
                    console.log('(✔) Saved ', node);
                  } else {
                    // Errorhandling
                    // While what action with what params error happend
                    var error_action = {
                      "name": "setCurrentUserAnnotations",
                      "params": []
                    };

                    error_action.params.push(user_id);
                    error_action.params.push(node);
                    error_action.params.push(object);
                    error_action.params.push(always);

                    dispatch({
                      "type": "ERROR",
                      "error": handleError(req, error_action)
                    });
                  };
                });
              }, 250);

            } else {
              // Errorhandling
              // While what action with what params error happend
              var error_action = {
                "name": "setCurrentUserAnnotations",
                "params": []
              };

              error_action.params.push(user_id);
              error_action.params.push(node);
              error_action.params.push(object);
              error_action.params.push(always);

              dispatch({
                "type": "ERROR",
                "error": handleError(req, error_action)
              });
            };


          });
        };
      } else {
        return function(dispatch) {};
      };
    },

    getCurrentUserEvents: function(user_id, status) {

      var api_url = '/users/' + user_id + '/events';
      var state_path = 'user.events';

      if (status) {
        var parmeters = {
          "status": status
        };
      } else {
        var parmeters = {};
      };

      if (ApiHelpers.shouldCallNow(api_url)) {

        return function(dispatch) {
          dispatch({
            type: 'GET_DATA_STARTED'
          });

          // Do async task
          ApiHelpers.callAPI('GET', api_url, parmeters, {}, function(req) {
            if (req.status == 200) {

              var events = JSON.parse(req.response);
              events.user_events.forEach(function(item, itemID) {
                event_pid = item.data.patient_id;
                ApiHelpers.callAPI('GET', '/patients/' + event_pid, {}, {}, function(req) {
                  if (req.status == 200) {

                    var resp = JSON.parse(req.response);
                    var patient = resp.patient;

                    var response = {
                      "data": patient.data,
                      "extras": createPatientExtras(patient.data),
                      "id": parseInt(patient.id),
                      "pid": parseInt(patient.id)
                    };

                    item.patient = response;
                  };
                });
              });

              events.role_events.forEach(function(item, itemID) {
                event_pid = item.data.patient_id;
                ApiHelpers.callAPI('GET', '/patients/' + event_pid, {}, {}, function(req) {
                  if (req.status == 200) {

                    var resp = JSON.parse(req.response);
                    var patient = resp.patient;

                    var response = {
                      "data": patient.data,
                      "extras": createPatientExtras(patient.data),
                      "id": parseInt(patient.id),
                      "pid": parseInt(patient.id)
                    };

                    item.patient = response;
                  };
                });
              });


              var response = {
                "user_id": user_id,
                "data": events
              };

              var time = (events.role_events.length + events.user_events.length + 1) * 250;

              setTimeout(function() {
                dispatch({
                  "type": "SET_OBJECT",
                  "data": response,
                  "statePath": state_path

                });
              }, time);


              response = addOptinomicExtras(response, api_url);
              console.log('(✔) Data (' + api_url + '):', response);

            } else {
              var response = {
                "error": true,
                "error_message": "Failed with status code: " + req.status,
                "status_code": req.status
              };
              console.error('(!) Error: ', response);

              response = addOptinomicExtras(response, api_url);
              dispatch({
                "type": "SET_OBJECT",
                "data": response,
                "statePath": state_path

              });
            };


          });
        };
      } else {
        return function(dispatch) {};
      };
    },


    // ----------------------------------
    // Patient (Current)
    // ----------------------------------

    getCurrentPatient: function(pid) {

      var api_url = '/patients/' + pid;
      var state_path = 'patients.' + pid + '.info';

      if (ApiHelpers.shouldCallNow(api_url)) {

        return function(dispatch) {

          // Do async task
          ApiHelpers.callAPI('GET', api_url, {}, {}, function(req) {
            if (req.status == 200) {

              var resp = JSON.parse(req.response);

              var patient = resp.patient;

              var response = {
                "data": patient.data,
                "extras": createPatientExtras(patient.data),
                "pid": parseInt(pid)
              };

              response = addOptinomicExtras(response, api_url);
              dispatch({
                "type": "SET_OBJECT",
                "data": response,
                "statePath": state_path

              });
              dispatch({
                "type": "SET_OBJECT",
                "data": parseInt(pid),
                "statePath": 'current_patient.pid'

              });
              console.log('(✔) Data (' + api_url + '):', response);
            } else {
              // Errorhandling
              // While what action with what params error happend
              var error_action = {
                "name": "getCurrentPatient",
                "params": []
              };
              error_action.params.push(pid);

              dispatch({
                "type": "ERROR",
                "error": handleError(req, error_action)
              });
            };


          });
        };
      } else {
        return function(dispatch) {};
      };
    },

    getCurrentPatientAccess: function(pid) {

      var api_url = '/patients/' + pid + '/access';
      var state_path = 'patients.' + pid + '.access';


      if (ApiHelpers.shouldCallNow(api_url)) {

        return function(dispatch) {

          // Do async task
          ApiHelpers.callAPI('GET', api_url, {}, {}, function(req) {
            if (req.status == 204) {

              var response = {
                "access": true,
                "pid": parseInt(pid)
              };

              response = addOptinomicExtras(response, api_url);
              dispatch({
                "type": "SET_OBJECT",
                "data": parseInt(pid),
                "statePath": 'current_patient.pid'
              });
              dispatch({
                "type": "SET_OBJECT",
                "data": response,
                "statePath": state_path
              });

              console.log('(✔) Data (' + api_url + '):', response);
            } else {

              var response = {
                "access": false,
                "pid": parseInt(pid)
              };

              response = addOptinomicExtras(response, api_url);
              dispatch({
                "type": "SET_OBJECT",
                "data": parseInt(pid),
                "statePath": 'current_patient.pid'
              });
              dispatch({
                "type": "SET_OBJECT",
                "data": response,
                "statePath": state_path
              });

              console.log('(✔) Data (' + api_url + '):', response);

            };


          });
        };
      } else {
        return function(dispatch) {};
      };
    },

    getCurrentPatientStays: function(pid, always) {
      always = always || false;
      var api_url = '/patients/' + pid + '/stays';
      var state_path = 'patients.' + pid + '.stays';

      var shouldCallNow = ApiHelpers.shouldCallNow(api_url);

      if (shouldCallNow || always) {

        return function(dispatch) {

          // Do async task
          ApiHelpers.callAPI('GET', api_url, {}, {}, function(req) {

            if (req.status == 200) {

              var resp = JSON.parse(req.response);

              var stays = resp.stays;
              var stays_array = [];
              stays.forEach(function(stay, ID) {
                stays_array.push(stay.id);

                stay.data.id = stay.id;
                stay.data.fid = stay.id;
                stay.extras = createStayExtras(stay.data);

                var stay_response = {
                  "data": stay.data,
                  "extras": stay.extras,
                  "id": stay.id,
                  "fid": stay.id
                };

                dispatch({
                  "type": "SET_OBJECT",
                  "data": stay_response,
                  "statePath": 'stays.' + stay.id + '.info'
                });
              });

              var response = {
                "data": stays_array
              };

              response = addOptinomicExtras(response, api_url);
              dispatch({
                "type": "SET_OBJECT",
                "data": response,
                "statePath": state_path

              });

              console.log('(✔) Data (' + api_url + '):', response);
            } else {
              // Errorhandling
              // While what action with what params error happend
              var error_action = {
                "name": "getCurrentPatientStays",
                "params": []
              };
              error_action.params.push(pid);

              dispatch({
                "type": "ERROR",
                "error": handleError(req, error_action)
              });
            };

          });
        };
      } else {
        return function(dispatch) {};
      };
    },

    getCurrentPatientEvents: function(pid, store_events) {
      if ((store_events === null) || (store_events === undefined)) {
        store_events = true;
      };

      var api_url = '/patients/' + pid + '/events';
      var state_path = 'patients.' + pid + '.events';


      if (ApiHelpers.shouldCallNow(api_url + "_" + store_events)) {
        return function(dispatch) {

          // Do async task
          ApiHelpers.callAPI('GET', api_url, {}, {}, function(req) {
            if (req.status == 200) {

              var resp = JSON.parse(req.response);

              var events = resp.events;
              var events_done = [];
              var events_to_be_done = [];
              var events_aborted = [];
              var events_irrelevant = [];

              // Get already stored events
              var stored_events = store.getState();
              if ("events" in stored_events) {
                stored_events = stored_events.events;
              } else {
                stored_events = {};
              };

              events.forEach(function(event, ID) {
                event.data.id = event.id;
                event.data.event_id = event.id;
                event.extras = createEventExtras(event.data);

                if (event.data.status === 'done') {
                  events_done.push(event.id);
                };
                if (event.data.status === 'to_be_done') {
                  events_to_be_done.push(event.id);
                };
                if (event.data.status === 'aborted') {
                  events_aborted.push(event.id);
                };
                if (event.data.status === 'irrelevant') {
                  events_irrelevant.push(event.id);
                };



                // Store events - only if not already stored
                if ((store_events) && (event.data.status !== 'irrelevant')) {
                  Polymer.RenderStatus.afterNextRender(event, function() {
                    if ((stored_events[event.id] === undefined) || (stored_events[event.id] === null)) {
                      dispatch({
                        "type": "SET_OBJECT",
                        "data": event,
                        "statePath": 'events.' + event.id
                      });
                    };
                  });
                };
              });

              var response = {
                "data": {
                  "done": events_done,
                  "to_be_done": events_to_be_done,
                  "aborted": events_aborted,
                  "irrelevant": events_irrelevant
                }
              };

              response = addOptinomicExtras(response, api_url);

              dispatch({
                "type": "SET_OBJECT",
                "data": response,
                "statePath": state_path
              });
              console.log('(✔) Data (' + api_url + '):', response);
            } else {
              // Errorhandling
              // While what action with what params error happend
              var error_action = {
                "name": "getCurrentPatientEvents",
                "params": []
              };
              error_action.params.push(pid);

              dispatch({
                "type": "ERROR",
                "error": handleError(req, error_action)
              });
            };



          });
        };
      } else {
        return function(dispatch) {};
      };
    },


    // ----------------------------------
    // Apps
    // ----------------------------------

    getApps: function() {

      var api_url = '/modules';
      var state_path = 'apps.all';

      if (ApiHelpers.shouldCallNow(api_url)) {

        return function(dispatch) {

          var parameters = {}

          // Do async task
          ApiHelpers.callAPI('GET', api_url, parameters, {}, function(req) {
            if (req.status == 200) {


              var resp = JSON.parse(req.response);

              // Sortieren nach App-Name
              if (resp.patient_modules.length > 0) {
                resp.patient_modules.sort(function(a, b) {
                  var nameA = a.name.toUpperCase(); // ignore upper and lowercase
                  var nameB = b.name.toUpperCase(); // ignore upper and lowercase
                  if (nameA < nameB) {
                    return -1;
                  }
                  if (nameA > nameB) {
                    return 1;
                  }
                  return 0;
                });

                resp.patient_modules.forEach(function(m, mID) {
                  m.first_template = {
                    "found": "false",
                    "name": null
                  };

                  if (m.templates.length > 0) {
                    m.first_template.name = m.templates["0"].name;
                    m.first_template.found = true;
                  };
                });

              };
              if (resp.user_modules.length > 0) {
                resp.user_modules.sort(function(a, b) {
                  var nameA = a.name.toUpperCase(); // ignore upper and lowercase
                  var nameB = b.name.toUpperCase(); // ignore upper and lowercase
                  if (nameA < nameB) {
                    return -1;
                  }
                  if (nameA > nameB) {
                    return 1;
                  }
                  return 0;
                });

                resp.user_modules.forEach(function(m, mID) {
                  m.first_template = {
                    "found": "false",
                    "name": null
                  };

                  if (m.templates.length > 0) {
                    m.first_template.name = m.templates["0"].name;
                    m.first_template.found = true;
                  };
                });
              };

              var response = {
                "data": {
                  "patient_modules": resp.patient_modules,
                  "user_modules": resp.user_modules
                }
              };

              response = addOptinomicExtras(response, api_url);
              dispatch({
                "type": "SET_OBJECT",
                "data": response,
                "statePath": state_path

              });

              console.log('(✔) Data (' + api_url + '):', response, parameters);
            } else {
              // Errorhandling
              // While what action with what params error happend
              var error_action = {
                "name": "getApps",
                "params": []
              };

              dispatch({
                "type": "ERROR",
                "error": handleError(req, error_action)
              });
            };

          });
        };
      } else {
        return function(dispatch) {};
      };
    },

    getAppsActivations: function() {

      // Unneded for now!

      var api_url = '/module_activations';
      var state_path = 'apps.activations';

      if (ApiHelpers.shouldCallNow(api_url)) {

        return function(dispatch) {

          var parameters = {}

          // Do async task
          ApiHelpers.callAPI('GET', api_url, parameters, {}, function(req) {
            if (req.status == 200) {

              var resp = JSON.parse(req.response);

              var response = {
                "data": resp.module_activations
              };

              response = addOptinomicExtras(response, api_url);
              dispatch({
                "type": "SET_OBJECT",
                "data": response,
                "statePath": state_path
              });

              console.log('(✔) Data (' + api_url + '):', response, parameters);
            } else {
              // Errorhandling
              // While what action with what params error happend
              var error_action = {
                "name": "getAppsActivations",
                "params": []
              };

              dispatch({
                "type": "ERROR",
                "error": handleError(req, error_action)
              });
            };

          });
        };
      } else {
        return function(dispatch) {};
      };
    },

    getStayApps: function(pid, fid, always) {

      always = always || false;
      var api_url = '/patients/' + pid + '/modules';
      var state_path = 'stays.' + fid + '.apps_activated';

      if (always ||  (ApiHelpers.shouldCallNow(api_url + "?" + pid + "," + fid, 180))) {

        return function(dispatch) {

          var parameters = {}

          if (fid !== undefined) {
            parameters.stay_id = fid;
          };

          // Do async task
          ApiHelpers.callAPI('GET', api_url, parameters, {}, function(req) {
            if (req.status == 200) {

              var resp = JSON.parse(req.response);

              // Sortieren nach App-Name
              if (resp.activated_patient_uses_modules.length > 0) {
                resp.activated_patient_uses_modules.sort(function(a, b) {
                  var nameA = a.module.name.toUpperCase(); // ignore upper and lowercase
                  var nameB = b.module.name.toUpperCase(); // ignore upper and lowercase
                  if (nameA < nameB) {
                    return -1;
                  }
                  if (nameA > nameB) {
                    return 1;
                  }
                  return 0;
                });

                resp.activated_patient_uses_modules.forEach(function(m, mID) {
                  m.module.first_template = {
                    "found": "false",
                    "name": null
                  };

                  if (m.module.templates.length > 0) {
                    m.module.first_template.name = m.module.templates["0"].name;
                    m.module.first_template.found = true;
                  };
                });

              };

              if (resp.deactivated_modules.length > 0) {
                resp.deactivated_modules.sort(function(a, b) {
                  var nameA = a.name.toUpperCase(); // ignore upper and lowercase
                  var nameB = b.name.toUpperCase(); // ignore upper and lowercase
                  if (nameA < nameB) {
                    return -1;
                  }
                  if (nameA > nameB) {
                    return 1;
                  }
                  return 0;
                });
              };

              var response = {
                "activated": resp.activated_patient_uses_modules,
                "deactivated": resp.deactivated_modules
              };

              response = addOptinomicExtras(response, api_url);
              dispatch({
                "type": "SET_OBJECT",
                "data": response,
                "statePath": state_path

              });

              // Check survey_responses

              if (response.activated.length > 0) {
                response.activated.forEach(function(app, appID) {

                  if (app.module.surveys.length > 0) {
                    if ((pid !== undefined) && (pid !== null)) {
                      if ((fid !== undefined) && (fid !== null)) {
                        setTimeout(function() {
                          Polymer.RenderStatus.afterNextRender(this, function() {
                            dispatch('getSurveyResponses', app.module.identifier, pid, fid, appID);
                          });
                        }.bind(this), 250);
                      };
                    };
                  };

                }.bind(this));
              };


              console.log('(✔) Data (' + api_url + '):', response, parameters);
            } else {
              // Errorhandling
              // While what action with what params error happend
              var error_action = {
                "name": "getStayApps",
                "params": []
              };

              error_action.params.push(pid);
              error_action.params.push(fid);
              error_action.params.push(always);

              dispatch({
                "type": "ERROR",
                "error": handleError(req, error_action)
              });
            };



          });
        };
      } else {
        return function(dispatch) {};
      };
    },

    activateApp: function(pid, fid, aid) {

      var api_url = '/patients/' + pid + '/activate_module';

      if (ApiHelpers.shouldCallNow(api_url + "?" + fid + "/" + aid)) {

        return function(dispatch) {

          var parameters = {}

          if (fid !== undefined) {
            parameters.module_identifier = aid;
            parameters.stay_id = fid;
          };

          // Do async task
          ApiHelpers.callAPI('POST', api_url, parameters, {}, function(req) {
            if (req.status == 204) {
              console.log('(✔) Success :: ', pid, fid, aid, ' activated');

              // Make things refresh
              dispatch('setObject', 'current_patient.fid', '');
              dispatch('setObject', 'current_patient.fid', fid);

            } else {
              console.log('(!) Error :: ', pid, fid, aid, ' not activated');
            };
          });
        };
      } else {
        return function(dispatch) {};
      };
    },

    deactivateApp: function(pid, fid, aid) {

      var api_url = '/patients/' + pid + '/deactivate_module';

      if (ApiHelpers.shouldCallNow(api_url + "?" + fid + "/" + aid)) {

        return function(dispatch) {

          var parameters = {}

          if (fid !== undefined) {
            parameters.module_identifier = aid;
            parameters.stay_id = fid;
          };

          // Do async task
          ApiHelpers.callAPI('POST', api_url, parameters, {}, function(req) {
            if (req.status == 204) {
              console.log('(✔) Success :: ', pid, fid, aid, ' deactivated');

              // Make things refresh
              dispatch('setObject', 'current_patient.fid', '');
              dispatch('setObject', 'current_patient.fid', fid);
            } else {
              console.log('(!) Error :: ', pid, fid, aid, ' not deactivated');
            };
          });
        };
      } else {
        return function(dispatch) {};
      };
    },


    // ----------------------------------
    // Apps - User
    // ----------------------------------

    getUserApps: function(uid, always) {
      always = always || false;
      // GET /users/:user_id/modules
      uid = uid || Session.getUserID();
      var api_url = '/users/' + uid + '/modules';
      var state_path = 'user.apps';

      if ((always === true) || (ApiHelpers.shouldCallNow(api_url))) {

        return function(dispatch) {

          var parameters = {}

          // Do async task
          ApiHelpers.callAPI('GET', api_url, parameters, {}, function(req) {
            if (req.status == 200) {

              var resp = JSON.parse(req.response);


              // user_uses_modules
              var user_uses_modules = [];
              resp.user_uses_modules.forEach(function(app, moduleID) {
                if (app.module !== null) {

                  app.module.first_template = {
                    "found": "false",
                    "name": null
                  };

                  if (app.module.templates.length > 0) {
                    app.module.first_template.name = app.module.templates["0"].name;
                    app.module.first_template.found = true;
                  };

                  user_uses_modules.push(app);

                };
              });

              // console.warn('RESP:::', resp, user_uses_modules);

              // Sortieren nach App-Name
              if (user_uses_modules.length > 0) {
                user_uses_modules.sort(function(a, b) {
                  var nameA = a.module.name.toUpperCase(); // ignore upper and lowercase
                  var nameB = b.module.name.toUpperCase(); // ignore upper and lowercase
                  if (nameA < nameB) {
                    return -1;
                  }
                  if (nameA > nameB) {
                    return 1;
                  }
                  return 0;
                });
              };

              var response = {
                "data": user_uses_modules
              };

              response = addOptinomicExtras(response, api_url);
              dispatch({
                "type": "SET_OBJECT",
                "data": response,
                "statePath": state_path
              });

              console.log('(✔) Data (' + api_url + '):', response, parameters);
            } else {
              // Errorhandling
              // While what action with what params error happend
              var error_action = {
                "name": "getUserApps",
                "params": []
              };
              error_action.params.push(uid);
              error_action.params.push(always);

              dispatch({
                "type": "ERROR",
                "error": handleError(req, error_action)
              });
            };

          });
        };
      } else {
        return function(dispatch) {};
      };
    },

    activateUserApp: function(uid, aid) {

      var api_url = '/users/' + uid + '/activate_module';

      if (ApiHelpers.shouldCallNow(api_url + "?" + aid)) {

        return function(dispatch) {

          var parameters = {
            "module_identifier": aid
          }

          // Do async task
          ApiHelpers.callAPI('POST', api_url, parameters, {}, function(req) {
            if (req.status == 204) {
              console.log('(✔) Success :: ', uid, aid, ' activated');
              this.dispatch('getUserApps', Session.getUserID(), true);
            } else {
              console.log('(!) Error :: ', uid, aid, ' not activated');
            };
          }.bind(this));
        };
      } else {
        return function(dispatch) {};
      };
    },

    deactivateUserApp: function(uid, aid) {

      var api_url = '/users/' + uid + '/deactivate_module';

      if (ApiHelpers.shouldCallNow(api_url + "?" + aid)) {

        return function(dispatch) {

          var parameters = {
            "module_identifier": aid
          }

          // Do async task
          ApiHelpers.callAPI('POST', api_url, parameters, {}, function(req) {
            if (req.status == 204) {
              console.log('(✔) Success :: ', uid, aid, ' deactivated');
              this.dispatch('getUserApps', Session.getUserID(), true);
            } else {
              console.log('(!) Error :: ', uid, aid, ' not deactivated');
            };
          }.bind(this));
        };
      } else {
        return function(dispatch) {};
      };
    },

    // ----------------------------------
    // App-Store
    // ----------------------------------

    activateAppStoreApp: function(module_identifier, version, name_overwrite) {

      var api_url = '/module_activations';

      return function(dispatch) {

        var parameters = {
          "module_identifier": module_identifier,
          "version": version,
          "name_overwrite": name_overwrite
        }

        // Do async task
        ApiHelpers.callAPI('POST', api_url, parameters, {}, function(req) {
          if (req.status == 200) {
            console.log('(✔) Success :: Activated', module_identifier);
            this.dispatch('getGenericCalls', '/modules', 'apps.all', '');
            this.dispatch('getGenericCalls', '/module_activations', 'apps.activated', 'module_activations');
            this.dispatch('getGenericCalls', '/modules/disabled', 'apps.disabled', '');
            this.dispatch('getGenericCalls', '/modules/errors', 'apps.error', 'module_errors');
          } else {

            var error_text = "(!) Error :: Activation"
            if (req.status == 400) {
              error_text = error_text + " | Bad Request in case of validation error";
            };
            if (req.status == 409) {
              error_text = error_text + " | Conflict in case of a problem with the module dependencies";
            };
            console.log(error_text, parameters);
          };
        }.bind(this));
      };

    },

    deactivateAppStoreApp: function(activation_id) {

      var api_url = '/module_activations/' + activation_id;

      return function(dispatch) {

        var parameters = {}

        // Do async task
        ApiHelpers.callAPI('DELETE', api_url, parameters, {}, function(req) {
          if (req.status == 204) {
            console.log('(✔) Success :: Deactivated', activation_id);
            this.dispatch('getGenericCalls', '/modules', 'apps.all', '');
            this.dispatch('getGenericCalls', '/module_activations', 'apps.activated', 'module_activations');
            this.dispatch('getGenericCalls', '/modules/disabled', 'apps.disabled', '');
            this.dispatch('getGenericCalls', '/modules/errors', 'apps.error', 'module_errors');
          } else {
            console.log('(!) Error :: Not Deactivated', activation_id);
          };
        }.bind(this));
      };

    },

    renameAppStoreApp: function(activation_id, name_overwrite) {

      var api_url = '/module_activations/' + activation_id;

      return function(dispatch) {

        var parameters = {
          "name_overwrite": name_overwrite
        }

        // Do async task
        ApiHelpers.callAPI('PUT', api_url, parameters, {}, function(req) {
          if (req.status == 204) {
            console.log('(✔) Success :: Renamed', activation_id, name_overwrite);
            this.dispatch('getGenericCalls', '/modules', 'apps.all', '');
          } else {
            console.log('(!) Error :: Not renamed', activation_id, api_url, parameters);
          };
        }.bind(this));
      };

    },

    // ----------------------------------
    // Hotloaded
    // ----------------------------------

    getHotloaded: function() {

      var api_url = '/modules/hotloaded';
      var state_path = 'hotloaded';


      return function(dispatch) {

        // Do async task
        ApiHelpers.callAPI('GET', api_url, {}, {}, function(req) {
          if (req.status == 200) {

            var resp = JSON.parse(req.response);

            var modules = resp.modules;

            var response = {
              "data": modules
            };

            response = addOptinomicExtras(response, api_url);
            dispatch({
              "type": "SET_OBJECT",
              "data": response,
              "statePath": state_path
            });
            console.log('(✔) Data (' + api_url + '):', response);
          } else {
            // Errorhandling
            // While what action with what params error happend
            var error_action = {
              "name": "getHotloaded",
              "params": []
            };
            error_action.params.push(pid);

            dispatch({
              "type": "ERROR",
              "error": handleError(req, error_action)
            });
          };


        });
      };
    },

    postHotloaded: function(contents) {

      var api_url = '/modules/hotloaded';
      var state_path = 'hotloaded';


      return function(dispatch) {

        // Do async task
        ApiHelpers.callAPI('POST', api_url, {}, contents, function(req) {
          if (req.status == 204) {
            console.log('(✔) Loaded (' + api_url + '):');
          };

          if (req.status == 400) {
            console.error("(!) Can't read App.");
          };

          if (req.status == 404) {
            console.error('(!) App not found:');
          };

          if ((req.status != 204) && (req.status != 400) && (req.status != 404)) {
            console.error('(!) Error:', req.status);
          };

        });
      };

    },

    deleteHotloaded: function() {
      var api_url = '/modules/hotloaded';


      return function(dispatch) {

        // Do async task
        ApiHelpers.callAPI('DELETE', api_url, {}, {}, function(req) {
          if (req.status == 204) {
            console.log('(✔) Deleted (' + api_url + '):');
          } else {
            console.error('(!) Error:', req.status);
          };

        });
      };

    },

    // ----------------------------------
    // Patient - Lists
    // ----------------------------------

    getAllPatients: function() {

      var api_url = '/patients';
      var state_path = 'patients_list.all';

      if (ApiHelpers.shouldCallNow(api_url)) {

        return function(dispatch) {
          dispatch({
            type: 'GET_DATA_STARTED'
          });

          // Do async task
          ApiHelpers.callAPI('GET', api_url, {}, {}, function(req) {
            if (req.status == 200) {

              var resp = JSON.parse(req.response);

              var patients = resp.patients;
              patients.forEach(function(patient, ID) {
                patient.data.id = patient.id;
                patient.data.fid = patient.id;
                patient.extras = createPatientExtras(patient.data);
              });

              var response = {
                "data": patients
              };

              response = addOptinomicExtras(response, api_url);
              dispatch({
                "type": "SET_OBJECT",
                "data": response,
                "statePath": state_path

              });

              console.log('(✔) Data (' + api_url + '):', response);
            } else {
              // Errorhandling
              // While what action with what params error happend
              var error_action = {
                "name": "getAllPatients",
                "params": []
              };

              dispatch({
                "type": "ERROR",
                "error": handleError(req, error_action)
              });
            };


          });
        };
      } else {
        return function(dispatch) {};
      };
    },

    getFilterPatients: function(filter) {

      var api_url = '/patients';
      var state_path = 'patients_list.filter';

      if (ApiHelpers.shouldCallNow(api_url)) {

        return function(dispatch) {
          dispatch({
            type: 'GET_DATA_STARTED'
          });

          // Do async task
          ApiHelpers.callAPI('GET', api_url, filter, {}, function(req) {
            if (req.status == 200) {

              var resp = JSON.parse(req.response);

              var patients = resp.patients;
              patients.forEach(function(patient, ID) {
                patient.data.id = patient.id;
                patient.data.fid = patient.id;
                patient.extras = createPatientExtras(patient.data);
              });

              var response = {
                "data": patients
              };

              response = addOptinomicExtras(response, api_url);
              dispatch({
                "type": "SET_OBJECT",
                "data": response,
                "statePath": state_path
              });

              console.log('(✔) Data (' + api_url + '):', response);
            } else {
              // Errorhandling
              // While what action with what params error happend
              var error_action = {
                "name": "getFilterPatients",
                "params": []
              };
              error_action.params.push(filter);

              dispatch({
                "type": "ERROR",
                "error": handleError(req, error_action)
              });
            };


          });
        };
      } else {
        return function(dispatch) {};
      };
    },

    getWatchlistPatients: function(user_id) {

      user_id = user_id || Session.getUserID();
      var api_url = '/watchlist/' + user_id;
      var state_path = 'patients_list.watchlist';


      return function(dispatch) {
        dispatch({
          type: 'GET_DATA_STARTED'
        });

        // Do async task
        ApiHelpers.callAPI('GET', api_url, {}, {}, function(req) {
          if (req.status == 200) {

            var resp = JSON.parse(req.response);

            var patients = resp.patients;


            patients.forEach(function(patient, ID) {
              patient.data.id = patient.id;
              patient.data.fid = patient.id;
              patient.extras = createPatientExtras(patient.data);
            });

            // Sortieren nach App-Name
            if (patients.length > 0) {
              patients.sort(function(a, b) {
                var nameA = a.extras.name.toUpperCase(); // ignore upper and lowercase
                var nameB = b.extras.name.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }
                return 0;
              });
            };

            var response = {
              "user_id": user_id,
              "data": patients
            };

            response = addOptinomicExtras(response, api_url);
            dispatch({
              "type": "SET_OBJECT",
              "data": response,
              "statePath": state_path
            });

            console.log('(✔) Data (' + api_url + '):', response);
          } else {
            // Errorhandling
            // While what action with what params error happend
            var error_action = {
              "name": "getWatchlistPatients",
              "params": []
            };
            error_action.params.push(user_id);

            dispatch({
              "type": "ERROR",
              "error": handleError(req, error_action)
            });
          };


        });
      };

    },

    getPGPatients: function(pg_id) {

      pg_id = pg_id || 1;
      var api_url = "/patient_groups/" + pg_id + "/patients";
      var state_path = "patients_list.patient_groups." + pg_id;

      if (ApiHelpers.shouldCallNow(api_url)) {

        return function(dispatch) {
          dispatch({
            type: 'GET_DATA_STARTED'
          });

          // Do async task
          ApiHelpers.callAPI('GET', api_url, {}, {}, function(req) {
            if (req.status == 200) {

              var resp = JSON.parse(req.response);

              var patients = resp.patients;
              patients.forEach(function(patient, ID) {
                patient.data.id = patient.id;
                patient.data.fid = patient.id;
                patient.extras = createPatientExtras(patient.data);
              });

              // Sortieren nach Name, Vorname
              if (patients.length > 0) {
                patients.sort(function(a, b) {
                  var nameA = a.extras.name.toUpperCase() + a.data.birthdate; // ignore upper and lowercase
                  var nameB = b.extras.name.toUpperCase() + b.data.birthdate; // ignore upper and lowercase
                  if (nameA < nameB) {
                    return -1;
                  }
                  if (nameA > nameB) {
                    return 1;
                  }
                  return 0;
                });
              };

              var response = {
                "patient_group": pg_id,
                "data": patients
              };

              response = addOptinomicExtras(response, api_url);
              dispatch({
                "type": "SET_OBJECT",
                "data": response,
                "statePath": state_path
              });
              console.log('(✔) Data (' + api_url + '):', response);
            } else {
              // Errorhandling
              // While what action with what params error happend
              var error_action = {
                "name": "getPGPatients",
                "params": []
              };
              error_action.params.push(pg_id);

              dispatch({
                "type": "ERROR",
                "error": handleError(req, error_action)
              });
            };

          });
        };
      } else {
        return function(dispatch) {};
      };
    },

    getAllPG: function() {
      var api_url = '/patient_groups';

      if (ApiHelpers.shouldCallNow(api_url)) {

        return function(dispatch) {

          // Do async task
          ApiHelpers.callAPI('GET', api_url, {}, {}, function(req) {
            if (req.status == 200) {

              var resp = JSON.parse(req.response);

              var patient_groups = resp.patient_groups;
              var patient_groups_array = [];
              patient_groups.forEach(function(pg, pgID) {
                patient_groups_array.push(pg.id);

                pg.data.id = pg.id;

                var pg_response = {
                  "data": pg.data,
                  "id": pg.id
                };

                dispatch({
                  "type": "SET_OBJECT",
                  "data": pg_response,
                  "statePath": 'patient_groups.data.' + pg.id
                });
              });

              dispatch({
                "type": "SET_OBJECT",
                "data": patient_groups_array,
                "statePath": 'patient_groups.all'
              });

              console.log('(✔) Data (' + api_url + '):', patient_groups_array);
            } else {
              // Errorhandling
              // While what action with what params error happend
              var error_action = {
                "name": "getAllPG",
                "params": []
              };

              dispatch({
                "type": "ERROR",
                "error": handleError(req, error_action)
              });
            };

          });
        };
      } else {
        return function(dispatch) {};
      };
    },

    getUserPG: function() {

      var api_url = '/patient_group_watchlist/' + Session.getUserID();

      if (ApiHelpers.shouldCallNow(api_url)) {

        return function(dispatch) {

          // Do async task
          ApiHelpers.callAPI('GET', api_url, {}, {}, function(req) {
            if (req.status == 200) {

              var resp = JSON.parse(req.response);

              var patient_groups = resp.patient_groups;
              var patient_groups_array = [];
              patient_groups.forEach(function(pg, pgID) {
                patient_groups_array.push(pg.id);

                pg.data.id = pg.id;

                var pg_response = {
                  "data": pg.data,
                  "id": pg.id
                };

                dispatch({
                  "type": "SET_OBJECT",
                  "data": pg_response,
                  "statePath": 'patient_groups.data.' + pg.id
                });
              });


              dispatch({
                "type": "SET_OBJECT",
                "data": patient_groups,
                "statePath": 'patient_groups.user'
              });


              console.log('(✔) Data (' + api_url + '):', patient_groups);
            } else {
              // Errorhandling
              // While what action with what params error happend
              var error_action = {
                "name": "getUserPG",
                "params": []
              };

              dispatch({
                "type": "ERROR",
                "error": handleError(req, error_action)
              });
            };

          });
        };
      } else {
        return function(dispatch) {};
      };
    },

    // ----------------------------------
    // Stay - Groups
    // ----------------------------------

    getAllSG: function() {
      var api_url = '/stay_groups';

      if (ApiHelpers.shouldCallNow(api_url)) {

        return function(dispatch) {

          // Do async task
          ApiHelpers.callAPI('GET', api_url, {}, {}, function(req) {
            if (req.status == 200) {

              var resp = JSON.parse(req.response);

              var stay_groups = resp.stay_groups;
              var stay_groups_array = [];
              stay_groups.forEach(function(pg, pgID) {
                stay_groups_array.push(pg.id);

                pg.data.id = pg.id;

                var sg_response = {
                  "data": pg.data,
                  "id": pg.id
                };

                dispatch({
                  "type": "SET_OBJECT",
                  "data": sg_response,
                  "statePath": 'stay_groups.data.' + pg.id
                });
              });

              dispatch({
                "type": "SET_OBJECT",
                "data": stay_groups_array,
                "statePath": 'stay_groups.all'
              });

              console.log('(✔) Data (' + api_url + '):', stay_groups_array);
            } else {
              // Errorhandling
              // While what action with what params error happend
              var error_action = {
                "name": "getAllSG",
                "params": []
              };

              dispatch({
                "type": "ERROR",
                "error": handleError(req, error_action)
              });
            };

          });
        };
      } else {
        return function(dispatch) {};
      };
    },

    getSGStays: function(sg_id) {

      sg_id = sg_id || 1;
      var api_url = "/stay_groups/" + sg_id + "/stays";
      var state_path = "stays_list.stay_groups." + sg_id;

      if (ApiHelpers.shouldCallNow(api_url)) {

        return function(dispatch) {

          // Do async task
          ApiHelpers.callAPI('GET', api_url, {}, {}, function(req) {
            if (req.status == 200) {

              var resp = JSON.parse(req.response);

              var stays = resp.stays;
              stays.forEach(function(stay, ID) {
                stay.data.id = stay.id;
                stay.extras = createStayExtras(stay.data);
              });

              var response = {
                "stay_group": parseInt(sg_id),
                "data": stays
              };

              response = addOptinomicExtras(response, api_url);
              dispatch({
                "type": "SET_OBJECT",
                "data": response,
                "statePath": state_path
              });
              console.log('(✔) Data (' + api_url + '):', response);
            } else {
              // Errorhandling
              // While what action with what params error happend
              var error_action = {
                "name": "getSGStays",
                "params": []
              };
              error_action.params.push(sg_id);

              dispatch({
                "type": "ERROR",
                "error": handleError(req, error_action)
              });
            };

          });
        };
      } else {
        return function(dispatch) {};
      };
    },

    // ----------------------------------
    // Clinic
    // ----------------------------------

    getClinic: function() {

      var api_url = '/clinic';
      var state_path = 'clinic.info';


      if (ApiHelpers.shouldCallNow(api_url)) {

        return function(dispatch) {

          // Do async task
          ApiHelpers.callAPI('GET', api_url, {}, {}, function(req) {
            if (req.status == 200) {

              var resp = JSON.parse(req.response);
              var clinic = resp.clinic;

              var clinic_obj = {};
              clinic.forEach(function(current, ID) {
                clinic_obj[current[0]] = current[1];
              });

              var response = {
                data: {
                  "clinic_array": clinic,
                  "clinic_obj": clinic_obj
                }
              };

              response = addOptinomicExtras(response, api_url);
              console.log('(✔) Data (' + api_url + '):', response);

              dispatch({
                "type": "SET_OBJECT",
                "data": response,
                "statePath": state_path
              });

            } else {
              // Errorhandling
              // While what action with what params error happend
              var error_action = {
                "name": "getClinic",
                "params": []
              };

              dispatch({
                "type": "ERROR",
                "error": handleError(req, error_action)
              });
            };

          });
        };
      } else {
        return function(dispatch) {};
      };
    },


    // ----------------------------------
    // System - Logs
    // ----------------------------------

    getLogs: function(filter) {

      filter = filter || {};

      var api_url = '/logs';
      var state_path = 'logs';


      if (ApiHelpers.shouldCallNow(api_url)) {

        return function(dispatch) {

          // Do async task
          ApiHelpers.callAPI('GET', api_url, filter, {}, function(req) {
            if (req.status == 200) {

              var resp = JSON.parse(req.response);
              var logs = resp.logs;

              var response = {
                data: logs
              };

              response = addOptinomicExtras(response, api_url);
              dispatch({
                "type": "SET_OBJECT",
                "data": response,
                "statePath": state_path
              });
              console.log('(✔) Data (' + api_url + '):', response);
            } else {
              // Errorhandling
              // While what action with what params error happend
              var error_action = {
                "name": "getLogs",
                "params": []
              };
              error_action.params.push(filter);

              dispatch({
                "type": "ERROR",
                "error": handleError(req, error_action)
              });
            };

          });
        };
      } else {
        return function(dispatch) {};
      };
    },


    // ----------------------------------
    // Generic
    // ----------------------------------

    setObject: function(statePath, myObject) {
      return function(dispatch) {

        myObject = myObject === undefined ? {} : myObject;
        statePath = statePath === undefined ? 'undefined' : statePath;

        dispatch({
          type: 'SET_OBJECT',
          data: myObject,
          statePath: statePath
        });

      }
    },

    getGenericCalls: function(api_url, state_path, inner_path) {

      inner_path = inner_path || null;

      if (ApiHelpers.shouldCallNow(api_url + ' ' + state_path)) {

        return function(dispatch) {

          // Do async task
          ApiHelpers.callAPI('GET', api_url, {}, {}, function(req) {
            if (req.status == 200) {

              var resp = JSON.parse(req.response);

              if (inner_path !== null) {
                resp = resp[inner_path];
              };

              var response = {
                "data": resp
              };

              response = addOptinomicExtras(response, api_url);
              dispatch({
                "type": "SET_OBJECT",
                "data": response,
                "statePath": state_path
              });

              console.log('(✔) Data (' + api_url + '):', response);
            } else {
              // Errorhandling
              // While what action with what params error happend
              var error_action = {
                "name": "getGenericCalls",
                "params": []
              };
              error_action.params.push(api_url);
              error_action.params.push(state_path);
              error_action.params.push(inner_path);

              dispatch({
                "type": "ERROR",
                "error": handleError(req, error_action)
              });
            };


          });
        };
      } else {
        return function(dispatch) {};
      };
    },


    // ----------------------------------
    // App
    // ----------------------------------

    saveDeviceSize: function(current_size_obj) {
      return function(dispatch) {


        var response = {
          "sizes": {
            "small": false,
            "medium": false,
            "large": false,
            "xlarge": false
          },
          "current": current_size_obj
        };

        response.sizes[current_size_obj.size] = true;

        dispatch({
          type: 'SAVE_DEVICE_SIZE_COMPLETE',
          data: response
        });
      }
    },

    setCurrentSidebar: function(current_sidebar) {
      return function(dispatch) {

        dispatch({
          type: 'SET_CURRENT_SIDEBAR_COMPLETE',
          data: current_sidebar
        });

      }
    },

    getAppVersion: function() {

      var api_url = '/version';
      var state_path = 'app.version';

      if (ApiHelpers.shouldCallNow(api_url)) {

        return function(dispatch) {

          // Do async task
          ApiHelpers.callAPI('GET', api_url, {}, {}, function(req) {
            if (req.status == 200) {

              var resp = JSON.parse(req.response);
              var version = resp.version

              var response = {
                "data": {
                  "version": version,
                  "short": version.substring(0, 7),
                  "github": "https://github.com/ottigerb/therapy-server/commit/" + version,
                }
              };

              response = addOptinomicExtras(response, api_url);
              dispatch({
                "type": "SET_OBJECT",
                "data": response,
                "statePath": state_path
              });
              console.log('(✔) Data (' + api_url + '):', response);
            } else {
              // Errorhandling
              // While what action with what params error happend
              var error_action = {
                "name": "getAppVersion",
                "params": []
              };

              dispatch({
                "type": "ERROR",
                "error": handleError(req, error_action)
              });
            };

          });
        };
      } else {
        return function(dispatch) {};
      };
    },


    // ----------------------------------
    // Access - Forms
    // ----------------------------------

    requestAccess: function(form_identifier, body) {
      var api_url = '/access_forms/' + form_identifier;
      var pid = body.patient_id || 0;


      return function(dispatch) {

        // Do async task
        ApiHelpers.callAPI('POST', api_url, body, {}, function(req) {
          dispatch({
            "type": "SET_OBJECT",
            "data": 0,
            "statePath": 'current_patient.pid'
          });

          if (req.status == 201) {
            var resp = JSON.parse(req.response);
            var access_form_response_id = resp.access_form_response_id

            var response = {
              "data": {
                "access_form_response_id": access_form_response_id
              }
            };
            console.log('(✔) Data requestAccess (' + api_url + '):', response);

            // Set allow access = true
            var state_path = 'patients.' + pid + '.access';
            var allow_response = {
              "access": true,
              "pid": parseInt(pid)
            };
            allow_response = addOptinomicExtras(allow_response, api_url);
            dispatch({
              "type": "SET_OBJECT",
              "data": allow_response,
              "statePath": state_path
            });
            dispatch({
              "type": "SET_OBJECT",
              "data": parseInt(pid),
              "statePath": 'current_patient.pid'
            });

            ApiHelpers.clearShouldCallNow();
            window.location.href = "#/patient/" + pid;

          } else {
            // Errorhandling
            // While what action with what params error happend
            var error_action = {
              "name": "requestAccess",
              "params": []
            };
            error_action.params.push(form_identifier);
            error_action.params.push(body);

            dispatch({
              "type": "ERROR",
              "error": handleError(req, error_action)
            });
          };

        });
      };

    },


    // ----------------------------------
    // Optinomic-Apps
    // ----------------------------------

    getSurveyResponses: function(module_identifier, pid, fid, appID) {

      return function(dispatch) {

        module_identifier = module_identifier || null;
        pid = pid || null;
        fid = fid || null;
        appID = appID || 0;


        // console.log('(?) actionGetSurveyResponses', module_identifier, pid, fid, appID, state_path);

        var data_request = 'undefined';
        if (fid !== null) {
          var api_url = '/stays/' + fid + '/survey_responses/' + module_identifier;
          var state_path = 'stays.' + fid + '.apps_activated.activated.' + appID + '.survey_responses';
          data_request = 'stay';
        } else {
          var api_url = '/patients/' + pid + '/survey_responses/' + module_identifier;
          var state_path = 'patients.' + pid + '.survey_responses.' + appID;
          data_request = 'patient';
        };

        // Do async task
        ApiHelpers.callAPI('GET', api_url, {}, {}, function(req) {

          var app_id = module_identifier || null;
          //console.log('(?) actionGetSurveyResponses | app_id', app_id);

          if (req.status == 200) {
            var resp = JSON.parse(req.response);

            //console.log('getSurveyResponses', resp.survey_responses);

            // Reformat req
            var return_array = resp.survey_responses;

            if (return_array.length > 0) {
              var have_data = true;
            } else {
              var have_data = false;
            };

            //console.error('survey_responses', return_array);

            var response = {
              "date": new Date(),
              "data": return_array,
              "have_data": have_data,
              "possible_data": true,
              "request": data_request,
              "app_id": app_id
            };

            dispatch({
              "type": "SET_OBJECT",
              "data": response,
              "statePath": state_path
            });
            console.log('(✔) Data (' + api_url + '):', response);
          } else {
            // Errorhandling
            // While what action with what params error happend
            var error_action = {
              "name": "getSurveyResponses",
              "params": []
            };
            error_action.params.push(module_identifier);
            error_action.params.push(pid);
            error_action.params.push(fid);
            error_action.params.push(appID);

            dispatch({
              "type": "ERROR",
              "error": handleError(req, error_action)
            });
          };

        });
      }
    },


    // ----------------------------------
    // Signin
    // ----------------------------------

    trustComputer: function(trust_computer) {
      return function(dispatch) {

        dispatch({
          type: 'SET_TRUST_COMPUTER',
          trust_computer: trust_computer
        });

      }
    },

    clearSignin: function() {
      return function(dispatch) {

        var clear = {
          "data": {
            "user_id": null,
            "token": null
          },
          "isLoggedIn": false,
          "trust_computer": false
        };

        dispatch({
          type: 'SET_SIGNIN_START',
          signin: clear
        });

      }
    },


    // ----------------------------------
    // OPAPP
    // ----------------------------------

    actionSaveParams: function(params) {
      return function(dispatch) {
        dispatch({
          type: 'SAVE_PARAMS_COMPLETE',
          data: params
        });
      }
    },

  }
};
