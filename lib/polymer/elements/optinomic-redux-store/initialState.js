const initialState = {
    "loading": false,
    "options": {
        "show_app_toolbar": false,
        "sort_ascending": true
    },
    "apps": {
        "all": null,
        "current": {
            "id": helpers.getAppID(),
            "name": helpers.getAppName(),
            "data": null,
            "found": false
        }
    },
    "clinic": {
        "data": null
    },
    "patient": {
        "id": helpers.getPatientID(),
        "data": null
    },
    "stays": {
        "all": null,
        "current": {
            "id": helpers.getStayID(),
            "data": null,
            "found": false
        }
    },
    "survey_responses": {
        "data": {}
    },
    "komed": {
        "data": null,
    },
    "user": {
        "id": helpers.getUserID(),
        "data": null
    },
    "username": null
};
