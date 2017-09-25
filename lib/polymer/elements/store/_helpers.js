// ----------------------------
// Helpers
// ----------------------------

// Add timestamp & API-URL to every request
addOptinomicExtras = function(obj, api_url) {
  api_url = api_url || null;
  obj.api_timestamp = new Date().toISOString();
  obj.api_url = api_url;
  return obj;
};


// Set Value on Obj
function setValue(obj, access, value) {
  //console.error('---> (setValue)', obj, access, value);

  if (typeof(access) == 'string') {
    access = access.split('.');
  }
  if (access.length > 1) {
    var init = obj[access[0]] || {};
    setValue(obj[access.shift()] = init, access, value);
  } else {
    obj[access[0]] = value;
  }
};


debounce = function(fn, wait) {
  var timeout = null;
  var c = function() {
    clearTimeout(timeout);
    timeout = null;
  };
  var t = function(fn) {
    timeout = setTimeout(fn, wait);
  };
  return function() {
    var context = this;
    var args = arguments;
    var f = function() {
      fn.apply(context, args);
    };
    timeout
      ?
      c() || t(f) : t(c) || f();
  }
}


formatDateCH = function(date_string) {
  date_string = date_string || null
  if (date_string !== null) {

    // 1952-11-19T00:00:00.000000000000Z
    var year = parseInt(date_string.substring(0, 4));
    var month = parseInt(date_string.substring(5, 7));
    var day = parseInt(date_string.substring(8, 10));
    var date_string_return = day + "." + month + "." + year

    return date_string_return;
  } else {
    return null;
  }
};

createPatientExtras = function(patient) {

  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }


  // patient.age = $filter('dateToAge')(patient.birthdate);
  // patient.birthday = $filter('date')(patient.birthdate);

  patient.extras = {};
  patient.extras.age = getAge(patient.birthdate);

  patient.extras.birthday = formatDateCH(patient.birthdate);
  patient.extras.birthday_age = patient.extras.birthday + ' | ' + patient.extras.age;


  patient.extras.name = patient.last_name + ' ' + patient.first_name;

  if (patient.gender === 'male') {
    patient.extras.ansprache = 'Herr';
    patient.extras.anrede = 'Herr ' + patient.last_name;
  } else {
    patient.extras.ansprache = 'Frau';
    patient.extras.anrede = 'Frau ' + patient.last_name;
  };
  patient.extras.full_name = patient.extras.ansprache + ' ' + patient.extras.name + ' (' + patient.extras.birthday_age + ')';

  patient.extras.full_address = patient.address1 + ', ' + patient.zip_code + ' ' + patient.city;

  var myPhone = '';
  if (patient.phone_home) {
    myPhone = patient.phone_home;
  }
  if (patient.phone_mobile) {
    if (myPhone != '') {
      myPhone = myPhone + ', ' + patient.phone_mobile;
    } else {
      myPhone = patient.phone_mobile;
    }
  }
  patient.extras.phone = myPhone;
  patient.extras.infoline = patient.extras.full_address

  if (myPhone != '') {
    patient.extras.infoline + ' | ' + patient.extras.phone;
  };


  // -----------------------------------
  // Female = Pink | Male = Blue
  // -----------------------------------
  var myColor = "#3F51B5";
  var myColorAccent = "#E91E63";
  if (patient.gender === "female") {
    myColor = "#E91E63";
    myColorAccent = "#3F51B5";
  }
  patient.extras.color_main = myColor;
  patient.extras.color_accent = myColorAccent;

  return patient.extras;
};

createStayExtras = function(current_stay) {
  current_stay.extras = {};

  // Calculate - Duration of the stay
  if (current_stay.stop) {
    current_stay.extras.duration = Math.floor((Date.parse(current_stay.stop) - Date.parse(current_stay.start)) / 86400000);
    current_stay.extras.duration = current_stay.extras.duration + 2; //incl. start & stop date
  } else {
    current_stay.extras.duration = Math.floor((new Date() - Date.parse(current_stay.start)) / 86400000);
  };

  // phase - translation
  var phase = current_stay.phase;
  var translated_de = "";
  if (phase === 'before_stay') {
    translated_de = "Bevorstehende Behandlung";
    translated_en = "the stay starts in the future";
  };
  if (phase === 'in_stay') {
    translated_de = "In akuteller Behandlung";
    translated_en = "the patient is currently in stay";
  };
  if (phase === 'after_exit') {
    translated_de = "Die Behandlung wurde vor weniger als 14 Tage beendet";
    translated_en = "the stay ended less than 14 days ago (included)";
  };
  if (phase === 'frozen') {
    translated_de = "Die Behandlung wurde manuell eingefroren";
    translated_en = "the stay has manually been frozen (no more events, changes, ...)";
  };
  if (phase === 'unfrozen') {
    translated_de = "Die Behandlung ist abgeschlossen, wurde jedoch zur Bearbeitung wieder geöffnet";
    translated_en = "the stay is complete but has been unfrozen by somebody";
  };
  if (phase === 'complete') {
    translated_de = "Die Behandlung wurde vor mehr als 14 Tage beendet";
    translated_en = "the stay ended more than 14 days ago";
  };
  current_stay.extras.phase_de = translated_de;
  current_stay.extras.phase_en = translated_en;

  // from_to
  current_stay.extras.beginn = formatDateCH(current_stay.start);
  current_stay.extras.from_to = formatDateCH(current_stay.start);
  current_stay.extras.from_to = current_stay.extras.from_to + ' - ';
  if (current_stay.stop) {
    current_stay.extras.from_to = current_stay.extras.from_to + formatDateCH(current_stay.stop);
    current_stay.extras.ende = formatDateCH(current_stay.stop);
  } else {
    current_stay.extras.from_to = current_stay.extras.from_to + "Unbekannt";
  };

  return current_stay.extras;
};

createEventExtras = function(current_event) {
  var extras = {};

  extras.created_at = formatDateCH(current_event.created_at);
  extras.due = formatDateCH(current_event.due);
  extras.status = current_event.status.charAt(0).toUpperCase() + current_event.status.slice(1);

  extras.status_de = "Undefined";
  if (current_event.status === 'done') {
    extras.status_de = "Erledigt";
    extras.show_do_it_now = false;
  };
  if (current_event.status === 'to_be_done') {
    extras.status_de = "Offen";
    extras.show_do_it_now = true;
  };
  if (current_event.status === 'aborted') {
    extras.status_de = "Abgebrochen";
    extras.show_do_it_now = false;
  };
  if (current_event.status === 'irrelevant') {
    extras.status_de = "Nicht relevant";
    extras.show_do_it_now = false;
  };

  return extras;
}


// ----------------------------
//  Redux Store
// ----------------------------

var store = Redux.createStore(reducer, Redux.applyMiddleware(ReduxThunk.default));
var ReduxBehavior = PolymerRedux(store);

var state = store.getState();
console.log('User-State @--> ', state);


// START Subscribing to localStorageUser
store.subscribe(function() {
  // Save to localStorage!
  var options = UserStore.getOptions();
  var state = store.getState();
  if (Session.getUserID()) {
    options.name = options.name_prefix + Session.getUserID();
  };

  // console.log('check @', ' --> ', localStorageOptions, state);
  if ((options.using) && (options.name !== "unknown")) {
    if (options.console) {
      var now = Date();
      console.log('User-State @', now, ' --> ', state);
    };

    if (ApiHelpers.shouldCallNow('save_state')) {
      // All the taxing stuff you do
      setTimeout(function(state) {
        var save_state = store.getState();

        var delete_if_there = function(property) {
          if (property in save_state) {
            delete save_state[property];
          };
        };

        function isQuotaExceeded(e) {
          var quotaExceeded = false;
          if (e) {
            if (e.code) {
              switch (e.code) {
                case 22:
                  quotaExceeded = true;
                  break;
                case 1014:
                  // Firefox
                  if (e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                    quotaExceeded = true;
                  }
                  break;
              }
            } else if (e.number === -2147024882) {
              // Internet Explorer 8
              quotaExceeded = true;
            }
          }
          return quotaExceeded;
        }

        // Remove stuff - don't want to save:
        save_state.patients_list.all = {};
        delete_if_there('logs');
        delete_if_there('current_user_to_edit');
        delete_if_there('current_patient_group');
        delete_if_there('delete');

        try {
          localStorage.setItem(options.name, JSON.stringify(save_state));
          console.warn('(✔) Saved | User-State', save_state);
        } catch (e) {
          if (isQuotaExceeded(e)) {

            save_state.patients_list.patient_groups = {};
            save_state.events = {};
            console.error('(!!!)', 'Storage full: Deleted more:', save_state);

            try {
              localStorage.setItem(options.name, JSON.stringify(save_state));
              console.warn('(✔) Saved | User-State', save_state);
            } catch (e) {
              if (isQuotaExceeded(e)) {
                console.error('(!!!)', 'Storage full: Nothing saved:', save_state);
              };
            };

          };
        };

      }, 5000);
    };
  };
});
