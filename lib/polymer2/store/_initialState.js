const initialState = {
  "loading": false,
  "current_patient": {
    "pid": 0
  },
  "signin": {
    "data": {
      "user_id": null,
      "token": null
    },
    "trust_computer": false,
    "isLoggedIn": false
  },
  "apps": {},
  "device": {
    "sizes": {
      "small": null,
      "medium": null,
      "large": null,
      "xlarge": null
    },
    "current": {}
  },
  "user": {
    "info": null,
    "annotations": null
  },
  "patients": {
    "0": {
      "access": {
        "access": true
      },
      "info": {},
      "stays": {
        "data": []
      },
      "events": {
        "data": {
          "aborted": [],
          "done": [],
          "irrelevant": [],
          "to_be_done": []
        }
      }
    }
  },
  "errors": [],
  "opapp": {},
  "events": {},
  "stays": {},
  "logs": {},
  "patient_groups": {
    "data": {}
  },
  "stay_groups": {
    "data": {}
  },
  "patients_list": {
    "all": {},
    "watchlist": {},
    "patient_groups": {}
  }
};


// Set "Current-Defaults"
//initialState.sidebar.current = initialState.sidebar.all[0];
