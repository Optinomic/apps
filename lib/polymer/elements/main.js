Polymer({
    is: 'optinomic-app',
    created: function() {
        console.log('Created: loadData');

        // loadData
        this.dispatch('actionGetCurrentPatient');
        this.dispatch('actionGetClinic');
    },

    ready: function() {
        console.log(this.localName + ' initialized.');
        this.params = {
            "userID": helpers.getUserID(),
            "patientID": helpers.getPatientID(),
            "stayID": helpers.getStayID(),
            "token": helpers.getToken(),
            "appName": helpers.getAppName(),
            "appID": helpers.getAppID(),
            "apiURL": helpers.getApiURL(),
        };
    },


    callAPI: function() {
        console.log('HELLO: callAPI!');
        helpers.callAPI('GET', '/clinic', {}, {}, function(req) {
            if (req.status == 200) {
                var response = JSON.parse(req.response);
                console.log('The response is ', response);
            } else {
                console.err('Error: Failed with status code', req.status);
            }
        });
    },

    behaviors: [ReduxBehavior, AsyncActionsBehavior],

    properties: {
        loading: {
            type: Boolean,
            statePath: 'loading'
        },
        currentPatient: {
            type: Object,
            statePath: 'currentPatient'
        },
        clinic: {
            type: Object,
            statePath: 'clinic'
        }
    }
});


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
    var bd = new Date(patient.birthdate);
    patient.extras.birthday_day = moment(bd).fromNow();

    patient.extras.birthday = moment()[format]('DD.MM.YYYY');
    patient.extras.birthday_age = patient.extras.birthday + ' | ' + patient.extras.age;


    patient.extras.name = patient.last_name + ' ' + patient.first_name;

    if (patient.gender === 'male') {
        patient.extras.name = 'Herr';
    } else {
        patient.extras.name = 'Frau';
    };
    patient.extras.full_name = patient.extras.name + ' ' + patient.extras.name + ' (' + patient.extras.birthday_age + ')';

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
    patient.extras.infoline = patient.extras.fulladdress + ' | ' + patient.extras.phone;


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
