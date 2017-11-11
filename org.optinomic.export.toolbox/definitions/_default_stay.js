d.default_stay = [{
        "name": "Fall",
        "path": "_function",
        "function": "var cis_fid = source.stay.cis_fid + ''; cis_fid.slice(cis_fid.length - 4, cis_fid.length - 2); var fid = parseInt(cis_fid.slice(cis_fid.length - 4, cis_fid.length - 2)); if (fid > 0) { return fid; } else { return ''; };"
    },
    {
        "name": "MedStatFid",
        "path": "_function",
        "function": "var cis_pid = source.patient.cis_pid + '00'; var cis_fid = source.stay.cis_fid + ''; var medstatfid = parseInt(cis_pid + cis_fid.slice(cis_fid.length - 4, cis_fid.length - 2)); return medstatfid;"
    },
    {
        "name": "optinomic_patient_age_when_filled",
        "path": "patient.extras.age_when_filled"
    },
    {
        "name": "optinomic_filled",
        "path": "survey_response.filled"
    },
    {
        "name": "optinomic_start",
        "path": "stay.start"
    },
    {
        "name": "optinomic_stop",
        "path": "stay.stop"
    }
];