d.bscl = {
    "options": {
        "app_id": "org.optinomic.export.toolbox",
        "calculation_id": "bscl_full",
        "name": "BSCL",
        "delimitter": ";"
    },
    "fields": [
        { "name": "optinomic_pid", "path": "patient_id" },
        { "name": "Patient", "path": "patient.extras.full_name" },
        { "name": "age_when_filled", "path": "patient.extras.age_when_filled" },
        { "name": "optinomic_fid", "path": "stay_id" },
        { "name": "cis_fid", "path": "stay.cis_fid" },
        { "name": "Eintritt", "path": "stay.extras.beginn" },
        { "name": "Austritt", "path": "stay.extras.ende" },
        { "name": "Anzahl_Tage", "path": "stay.extras.duration" }
    ]
};