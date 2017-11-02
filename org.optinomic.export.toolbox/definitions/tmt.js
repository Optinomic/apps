d.tmt = {
    "options": {
        "app_id": "org.optinomic.export.toolbox",
        "calculation_id": "tmt_full",
        "name": "TMT",
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
        { "name": "Anzahl_Tage", "path": "stay.extras.duration" },
        { "name": "TMTA_Time", "path": "calculation.TMTATime" },
        { "name": "TMTA_Error", "path": "calculation.TMTAError" },
        { "name": "TMTA_Z", "path": "calculation.percentile.z_scores.tmtA_z_rounded" },
        { "name": "TMTB_Time", "path": "calculation.TMTBTime" },
        { "name": "TMTB_Error", "path": "calculation.TMTBError" },
        { "name": "TMTB_Z", "path": "calculation.percentile.z_scores.tmtB_z_rounded" }
    ]
};