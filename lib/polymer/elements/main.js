Polymer({
    is: 'optinomic-app',
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
    getClinic: function() {
        this.dispatch('actionGetClinic');
    },
    signUp: function() {
        const username = helpers.getAppName();
        this.dispatch('signUpWithTimeout', username);
    },
    properties: {
        loading: {
            type: Boolean,
            statePath: 'loading'
        },
        username: {
            type: String,
            statePath: 'username'
        },
        clinic: {
            type: Object,
            statePath: 'clinic'
        }
    }
});
