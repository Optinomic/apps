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

              console.log('(✔) Data (' + api_url + '):', response);
            } else {
              var response = {
                "error": true,
                "error_message": "Failed with status code: " + req.status,
                "status_code": req.status
              };
              console.error('(!) Error: ', response);
            };

            response = addOptinomicExtras(response, api_url);
            dispatch({
              "type": "SET_OBJECT",
              "data": response,
              "statePath": state_path

            });
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
              console.log('(✔) Data (' + api_url + '):', response);
            } else {
              var response = {
                "error": true,
                "error_message": "Failed with status code: " + req.status,
                "status_code": req.status
              };
              console.error('(!) Error: ', response);
            };

            response = addOptinomicExtras(response, api_url);
            dispatch({
              "type": "SET_OBJECT",
              "data": response,
              "statePath": state_path

            });
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
              console.log('(✔) Data ??? (' + api_url + '):', response);


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

              console.log('(✔) Data (' + api_url + '):', response);
            } else {
              var response = {
                "error": true,
                "error_message": "Failed with status code: " + req.status,
                "status_code": req.status
              };
              console.error('(!) Error: ', response);
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

              console.log('(✔) Data (' + api_url + '):', response);
            } else {
              var response = {
                "access": false,
                "pid": parseInt(pid)
              };
              console.error('(!) Error: ', response);
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
          });
        };
      } else {
        return function(dispatch) {};
      };
    },

    getCurrentPatientStays: function(pid) {
      var api_url = '/patients/' + pid + '/stays';
      var state_path = 'patients.' + pid + '.stays';

      if (ApiHelpers.shouldCallNow(api_url)) {

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

              console.log('(✔) Data (' + api_url + '):', response);
            } else {
              var response = {
                "error": true,
                "error_message": "Failed with status code: " + req.status,
                "status_code": req.status
              };
              console.error('(!) Error: ', response);
            };

            response = addOptinomicExtras(response, api_url);
            dispatch({
              "type": "SET_OBJECT",
              "data": response,
              "statePath": state_path

            });

          });
        };
      } else {
        return function(dispatch) {};
      };
    },

    getCurrentPatientEvents: function(pid) {

      var api_url = '/patients/' + pid + '/events';
      var state_path = 'patients.' + pid + '.events';

      if (ApiHelpers.shouldCallNow(api_url)) {

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
              events.forEach(function(event, ID) {
                event.data.id = event.id;
                event.data.event_id = event.id;
                event.extras = createEventExtras(event.data);


                dispatch({
                  "type": "SET_OBJECT",
                  "data": event,
                  "statePath": 'events.' + event.id
                });

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
              });

              var response = {
                "data": {
                  "done": events_done,
                  "to_be_done": events_to_be_done,
                  "aborted": events_aborted,
                  "irrelevant": events_irrelevant
                }
              };

              console.log('(✔) Data (' + api_url + '):', response);
            } else {
              var response = {
                "error": true,
                "error_message": "Failed with status code: " + req.status,
                "status_code": req.status
              };
              console.error('(!) Error: ', response);
            };

            response = addOptinomicExtras(response, api_url);
            dispatch({
              "type": "SET_OBJECT",
              "data": response,
              "statePath": state_path
            });

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
              };

              var response = {
                "data": {
                  "patient_modules": resp.patient_modules,
                  "user_modules": resp.user_modules
                }
              };

              console.log('(✔) Data (' + api_url + '):', response, parameters);
            } else {
              var response = {
                "error": true,
                "error_message": "Failed with status code: " + req.status,
                "status_code": req.status
              };
              console.error('(!) Error: ', response);
            };

            response = addOptinomicExtras(response, api_url);
            dispatch({
              "type": "SET_OBJECT",
              "data": response,
              "statePath": state_path

            });

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

              console.log('(✔) Data (' + api_url + '):', response, parameters);
            } else {
              var response = {
                "error": true,
                "error_message": "Failed with status code: " + req.status,
                "status_code": req.status
              };
              console.error('(!) Error: ', response);
            };

            response = addOptinomicExtras(response, api_url);
            dispatch({
              "type": "SET_OBJECT",
              "data": response,
              "statePath": state_path

            });

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

      if (always ||  (ApiHelpers.shouldCallNow(api_url + "?" + pid + "," + fid))) {

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

              console.log('(✔) Data (' + api_url + '):', response, parameters);
            } else {
              var response = {
                "error": true,
                "error_message": "Failed with status code: " + req.status,
                "status_code": req.status
              };
              console.error('(!) Error: ', response);
            };

            response = addOptinomicExtras(response, api_url);
            dispatch({
              "type": "SET_OBJECT",
              "data": response,
              "statePath": state_path

            });

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

              console.log('(✔) Data (' + api_url + '):', response, parameters);
            } else {
              var response = {
                "error": true,
                "error_message": "Failed with status code: " + req.status,
                "status_code": req.status
              };
              console.error('(!) Error: ', response);
            };

            response = addOptinomicExtras(response, api_url);
            dispatch({
              "type": "SET_OBJECT",
              "data": response,
              "statePath": state_path
            });

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

              console.log('(✔) Data (' + api_url + '):', response);
            } else {
              var response = {
                "error": true,
                "error_message": "Failed with status code: " + req.status,
                "status_code": req.status
              };
              console.error('(!) Error: ', response);
            };

            response = addOptinomicExtras(response, api_url);
            dispatch({
              "type": "SET_OBJECT",
              "data": response,
              "statePath": state_path

            });
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

              console.log('(✔) Data (' + api_url + '):', response);
            } else {
              var response = {
                "error": true,
                "error_message": "Failed with status code: " + req.status,
                "status_code": req.status
              };
              console.error('(!) Error: ', response);
            };

            response = addOptinomicExtras(response, api_url);
            dispatch({
              "type": "SET_OBJECT",
              "data": response,
              "statePath": state_path

            });
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

            console.log('(✔) Data (' + api_url + '):', response);
          } else {
            var response = {
              "error": true,
              "error_message": "Failed with status code: " + req.status,
              "status_code": req.status
            };
            console.error('(!) Error: ', response);
          };

          response = addOptinomicExtras(response, api_url);
          dispatch({
            "type": "SET_OBJECT",
            "data": response,
            "statePath": state_path

          });
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

              var response = {
                "patient_group": pg_id,
                "data": patients
              };

              console.log('(✔) Data (' + api_url + '):', response);
            } else {
              var response = {
                "error": true,
                "error_message": "Failed with status code: " + req.status,
                "status_code": req.status
              };
              console.error('(!) Error: ', response);
            };

            response = addOptinomicExtras(response, api_url);
            dispatch({
              "type": "SET_OBJECT",
              "data": response,
              "statePath": state_path
            });
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


              console.log('(✔) Data (' + api_url + '):', response);
            } else {
              var response = {
                "error": true,
                "error_message": "Failed with status code: " + req.status,
                "status_code": req.status
              };
              console.error('(!) Error: ', response);
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


              console.log('(✔) Data (' + api_url + '):', response);
            } else {
              var response = {
                "error": true,
                "error_message": "Failed with status code: " + req.status,
                "status_code": req.status
              };
              console.error('(!) Error: ', response);
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

              console.log('(✔) Data (' + api_url + '):', response);
            } else {
              var response = {
                "error": true,
                "error_message": "Failed with status code: " + req.status,
                "status_code": req.status
              };
              console.error('(!) Error: ', response);
            };

            response = addOptinomicExtras(response, api_url);
            dispatch({
              "type": "SET_OBJECT",
              "data": response,
              "statePath": state_path
            });
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

              console.log('(✔) Data (' + api_url + '):', response);
            } else {
              var response = {
                "error": true,
                "error_message": "Failed with status code: " + req.status,
                "status_code": req.status
              };
              console.error('(!) Error: ', response);
            };

            response = addOptinomicExtras(response, api_url);
            dispatch({
              "type": "SET_OBJECT",
              "data": response,
              "statePath": state_path
            });
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

              console.log('(✔) Data (' + api_url + '):', response);
            } else {
              var response = {
                "error": true,
                "error_message": "Failed with status code: " + req.status,
                "status_code": req.status
              };
              console.error('(!) Error: ', response);
            };

            response = addOptinomicExtras(response, api_url);
            dispatch({
              "type": "SET_OBJECT",
              "data": response,
              "statePath": state_path
            });
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

              console.log('(✔) Data (' + api_url + '):', response);
            } else {
              var response = {
                "error": true,
                "error_message": "Failed with status code: " + req.status,
                "status_code": req.status
              };
              console.error('(!) Error: ', response);
            };

            response = addOptinomicExtras(response, api_url);
            dispatch({
              "type": "SET_OBJECT",
              "data": response,
              "statePath": state_path
            });
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

      if (ApiHelpers.shouldCallNow(api_url)) {

        return function(dispatch) {

          // Do async task
          ApiHelpers.callAPI('POST', api_url, body, {}, function(req) {
            if (req.status == 201) {

              var resp = JSON.parse(req.response);
              var access_form_response_id = resp.access_form_response_id

              var response = {
                "data": {
                  "access_form_response_id": access_form_response_id
                }
              };

              console.log('(✔) Data (' + api_url + '):', response);
              window.location.href = "#/patient/" + pid;

            } else {
              var response = {
                "error": true,
                "error_message": "Failed with status code: " + req.status,
                "status_code": req.status
              };
              alert(response);
              console.error('(!) Error: ', response);
            };

          });
        };
      } else {
        return function(dispatch) {};
      };
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


  }
};
