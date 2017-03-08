Polymer({
    is: 'optinomic-app',

    debugdoc: function() {
        console.log('DEBUG ::');
        console.dir(doc);
    },


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




    behaviors: [ReduxBehavior, AsyncActionsBehavior],

    properties: {
        loading: {
            type: Boolean,
            statePath: 'loading'
        },
        clinic: {
            type: Object,
            statePath: 'clinic'
        },
        patient: {
            type: Object,
            statePath: 'patients.current'
        },
        patients: {
            type: Object,
            statePath: 'patients.all'
        },
        currentPatient: {
            type: Object,
            statePath: 'currentPatient'
        },
        komed: {
            type: Object,
            statePath: 'komed'
        }
    }
});


(function() {
    if ('registerElement' in document && 'import' in document.createElement('link') && 'content' in document.createElement('template')) {
        console.log('(!) platform is good!')
    } else {
        // polyfill the platform!
        console.log('(!) polyfill the platform!')
        var e = document.createElement('script');
        e.src = 'https://cdn.rawgit.com/Download/polymer-cdn/upgrade-to-1.8.0/lib/webcomponentsjs/webcomponents-lite.min.js';
        document.body.appendChild(e);
    }
})();
