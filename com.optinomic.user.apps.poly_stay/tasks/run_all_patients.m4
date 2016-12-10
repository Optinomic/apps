include(tasks/task_start.js)

// Currently not in STAY.
var patient_filters = {
    "in_stay": "False"
};

include(tasks/task_all.js)
include(tasks/task_end.js)
