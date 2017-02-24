Polymer({
    is: 'optinomic-app',
    created: function() {
        include(data.js)
    },

    ready: function() {
        // console.log(this.localName + ' initialized.');
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
        },
        komed: {
            type: Object,
            statePath: 'komed'
        }
    }
});

