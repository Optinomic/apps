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


// Add timestamp & API-URL to every request
handleError = function(req, error_action) {

  var error = {
    "error": true,
    "error_message": "Failed with status code: " + req.status,
    "status": req.status,
    "statusText": req.statusText,
    "responseURL": req.responseURL,
    "readyState": req.readyState,
    "error_action": error_action
  };

  try {
    var responseText = JSON.parse(req.responseText);
    if ("error" in responseText) {
      error.responseErrorText = responseText.error;
    };
  } catch (err) {
    error.responseErrorText = null
  };

  if (req.status !== 0) {
    console.error("(!) " + req.status + " (" + req.statusText + ")", error);
    // window.location.href = "#/errors";
  };

  return error;
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
  current_stay.extras.in_stay = false;

  // Calculate - Duration of the stay
  if (current_stay.stop) {
    current_stay.extras.duration = Math.floor((Date.parse(current_stay.stop) - Date.parse(current_stay.start)) / 86400000);
    current_stay.extras.duration = current_stay.extras.duration + 1; //incl. start & stop date
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
    translated_de = "In aktueller Behandlung";
    translated_en = "the patient is currently in stay";
    current_stay.extras.in_stay = true;
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

