function get_belegung_task(filters) {
    get_patients(filters, function(patients) {
        sequentially_patients(patients, function(patient, next_patient) {
            try {
                console.log("Processing patient #" + patient.id + " ...");


                get_patient_stays(patient, function(patient_stays) {
                    sequentially_stays(patient_stays, function(patient_stay, next_stay) {
                        try {

                            console.log("Processing patient #" + patient.id + " | stay #" + patient_stay.id + " ...");

                            process_stay(patient_stay, next_stay);


                        } catch (e) {
                            console.error(e);
                            next_stay();
                        }
                    });

                    next_patient();

                });

            } catch (e) {
                console.error(e);
                next_patient();
            }
        });
    });
}

function sequentially_patients(objs, f) {
    var i = 0;
    var l = objs.length;
    var next_patient = function() {
        if (i < l) {
            var obj = objs[i];
            i++;
            f(obj, next_patient);
        }
    };
    next_patient();
}

function sequentially_stays(objs, f) {
    var i = 0;
    var l = objs.length;
    var next_stay = function() {
        if (i < l) {
            var obj = objs[i];
            i++;
            f(obj, next_stay);
        }
    };
    next_stay();
}



function get_patients(filters, callback) {
    helpers.callAPI("GET", "/patients", filters, null, function(patients_resp) {
        if (patients_resp.status != 200) {
            console.error(patients_resp.responseText);
        } else {
            var patients = JSON.parse(patients_resp.responseText).patients;
            callback(patients);
        }
    });
}

function get_patient_stays(patient, callback) {

    var api_call = "/patients/" + patient.id + "/stays";

    helpers.callAPI("GET", api_call, null, null, function(stays_resp) {
        if (stays_resp.status != 200) {
            console.error(stays_resp.responseText);
        } else {
            var patient_stays = JSON.parse(stays_resp.responseText).stays;
            callback(patient_stays);
        }
    });
}


function process_stay(stay, next_stay) {

    //INIT
    var belegung = {
        "art": [{
            "bel_id": 0,
            "name": "Unbekannt",
            "description": "Unbekannt / Nicht festgelegt"
        }, {
            "bel_id": 1,
            "name": "EAS",
            "description": "Entzugs- und Abklärungsstation"
        }, {
            "bel_id": 2,
            "name": "EP",
            "description": "Entwöhnungsprogramm"
        }, {
            "bel_id": 3,
            "name": "EAS & EP",
            "description": "Entzugs- & Abklärungsstation sowie Entwöhnungsprogramm"
        }, {
            "bel_id": 4,
            "name": "TK",
            "description": "Tagesklinik"
        }],
        "current": {}
    };

    // Default
    belegung.current = belegung.art[0];

    var annotation_obj = {
        "bel_selector": belegung.current,
        "bel_all": null,
        "pid": stay.patient_id,
        "fid": stay.id
    };


    // Get cuurent_ODBC
    var cis_fid_str = stay.data.cis_fid.toString();
    cis_fid_str = cis_fid_str.substring(0, (cis_fid_str.length - 2));

    var poly_pid = parseInt(cis_fid_str.substring(0, (cis_fid_str.length - 2)));
    var poly_fid = parseInt(cis_fid_str.substring((cis_fid_str.length - 2), (cis_fid_str.length)));

    var sql = include_as_js_string(belegung_history_from_fid.sql);
    sql = sql.replace("%poly_pid%", poly_pid);
    sql = sql.replace("%poly_fid%", poly_fid);


    var body = {
        "query": sql,
        "direct": "True",
        "format": "json"
    };


    var api_call = "/data_sources/Polypoint/query";

    helpers.callAPI("POST", api_call, null, body, function(resp_bel) {

        if (resp_bel.status != 200) {
            console.error(resp_bel.responseText);
            next_stay();
        } else {

            if ((resp_bel.responseText !== null) && (resp_bel.responseText !== '')) {
                var bel_response = JSON.parse(resp_bel.responseText);

                bel_response.rows.forEach(function(bel, my_bel_index) {
                    if ((bel.ORG === "EAS") && (belegung.current.bel_id === 0)) {
                        belegung.current = belegung.art[1];
                    };
                    if ((bel.ORG === "EAS") && (belegung.current.bel_id === 2)) {
                        belegung.current = belegung.art[3];
                    };
                    if ((bel.ORG === "EP") && (belegung.current.bel_id === 0)) {
                        belegung.current = belegung.art[2];
                    };
                    if ((bel.ORG === "EP") && (belegung.current.bel_id === 1)) {
                        belegung.current = belegung.art[3];
                    };
                    if ((bel.ORG === "TK") && (belegung.current.bel_id === 0)) {
                        belegung.current = belegung.art[4];
                    };
                });


                belegung.current.optinomic_pid = stay.patient_id;
                belegung.current.optinomic_fid = stay.id;

                belegung.current.polypoint_paid = bel_response.rows[0].PAID;
                belegung.current.polypoint_pid = bel_response.rows[0].PID;
                belegung.current.polypoint_faid = bel_response.rows[0].FAID;
                belegung.current.polypoint_fid = bel_response.rows[0].FID;

                belegung.current.versicherungsnummer = bel_response.rows[0].VERSICHERUNGSNUMMER;
                belegung.current.eintritt = bel_response.rows[0].EINTRITT;
                belegung.current.eintritt_zeit = bel_response.rows[0].ZEITEINTRITT;
                belegung.current.austritt = bel_response.rows[0].AUSTRITT;
                belegung.current.austritt_zeit = bel_response.rows[0].ZEITAUSTRITT;
                belegung.current.org_current = bel_response.rows[0].ORG_CURRENT;

                belegung.current.phase = stay.data.phase;
            } else {
                var bel_response = null;
            };

            annotation_obj = {
                "bel_selector": belegung.current,
                "bel_all": bel_response,
                "pid": stay.patient_id,
                "fid": stay.id
            };


            console.log('annotation_obj', annotation_obj);
            next_stay();
        }

    });
}


function save_belegung_for_patient(input, next) {

    // console.log('(INPUT) save_belegung_for_patient', input);
    // Do something
    next();
}
