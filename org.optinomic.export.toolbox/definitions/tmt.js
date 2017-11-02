d.tmt = {
    "options": {
        "calculation_id": "tmt_full",
        "delimitter": ";"
    },
    "fields": [
        { "name": "optinomic_pid", "path": "patient_id", "type": "integer" },
        { "name": "optinomic_fid", "path": "stay_id", "type": "integer" },
        { "name": "offensivitaet_scale_score", "path": "calculation.all_results.offensivit__t_scale_score", "type": "real" },
        { "name": "offensivitaet_sum_score", "path": "calculation.all_results.offensivit__t_sum_score", "type": "real" },
        { "name": "offensivitaet_z_score", "path": "calculation.all_results.offensivit__t_z_score", "type": "real" }
    ]
};