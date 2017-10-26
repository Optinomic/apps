// ----------------------------
// Helpers
// ----------------------------

formatDateCH = function(date_string) {
    if (date_string !== undefined) {

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


    patient.assessment = {};
    patient.assessment.login_pid = patient.cis_pid + "";
    // Password = YYYYMMDD
    var pw = "Fehler";
    if ((patient.birthdate !== "") && (patient.birthdate !== null) && (patient.birthdate !== undefined)) {
        pw = patient.birthdate;
        pw = pw.substring(0, 10);
        pw = pw.replace("-", "");
        pw = pw.replace("-", "");
    };
    patient.assessment.login_pw = pw;


    patient.extras.name = patient.last_name + ' ' + patient.first_name;

    if (patient.gender === 'male') {
        patient.extras.ansprache = 'Herr';
        patient.extras.anrede = 'Herr ' + patient.last_name;
    } else {
        patient.extras.ansprache = 'Frau';
        patient.extras.anrede = 'Frau ' + patient.last_name;
    };
    patient.extras.full_name = patient.extras.ansprache + ' ' + patient.extras.name + ' (' + patient.extras.birthday_age + ')';
    patient.extras.secure = patient.extras.ansprache + ' ' + patient.last_name.charAt(0) + '. ' + patient.first_name.charAt(0) + '. (' + patient.birthdate.substring(0, 4) + ')';

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

    return patient;
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

    return current_stay;
};