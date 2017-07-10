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
  "page_content": {
    "global": [{
      "className": "header",
      "columns": [{
          "body": "clinic_header"
        },
        {
          "body": "toc"
        }
      ]
    }, {
      "className": "footer",
      "columns": [{
        "body": "clinic_footer"
      }]
    }],
    "home": [{
      "className": "all",
      "columns": [{
          "body": "item-1"
        },
        {
          "body": "item-2"
        }
      ]
    }, {
      "className": "all_user_roles",
      "columns": [{
          "body": "item-3"
        },
        {
          "body": "item-4"
        }
      ]
    }],
    "patient": [{
      "className": "all",
      "columns": [{
          "body": "item-1"
        },
        {
          "body": "item-2"
        }
      ]
    }, {
      "className": "user_roles",
      "columns": [{
          "body": "item-3"
        },
        {
          "body": "item-4"
        }
      ]
    }],
    "stay": [{
      "className": "all",
      "columns": [{
          "body": "item-1"
        },
        {
          "body": "item-2"
        }
      ]
    }, {
      "className": "all_user_roles",
      "columns": [{
          "body": "item-3"
        },
        {
          "body": "item-4"
        }
      ]
    }]
  },
  "page_content_edit": {
    "editMode": false
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
  "events": {},
  "stays": {},
  "logs": {},
  "patient_groups": {
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
