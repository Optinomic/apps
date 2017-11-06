// The following fields do have all definitions!
d.default_top_fields = [
    { "name": "optinomic_patient_id", "path": "patient_id" },
    { "name": "optinomic_stay_id", "path": "stay_id" },
    { "name": "optinomic_cis_fid", "path": "stay.cis_fid" },
    { "name": "optinomic_event_id", "path": "event_id" },
    { "name": "optinomic_pum_id", "path": "pum_id" },
    { "name": "optinomic_survey_response_id", "path": "survey_response_id" },
    { "name": "MedStatFid", "path": "_function", "function": "_createMedStatFID" },
    { "name": "PID", "path": "patient.cis_pid" },
    { "name": "FID", "path": "stay.cis_fid" }
];