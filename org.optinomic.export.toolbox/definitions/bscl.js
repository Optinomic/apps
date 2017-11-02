d.bscl = {
    "options": {
        "app_id": "org.optinomic.export.toolbox",
        "calculation_id": "tmt_full",
        "name": "bscl_full",
        "delimitter": ";"
    },
    "fields": [
        { "name": "optinomic_pid", "path": "patient_id" },
        { "name": "optinomic_fid", "path": "stay_id" },
        { "name": "offensivitaet_scale_score", "path": "calculation.all_results.offensivit__t_scale_score" },
        { "name": "offensivitaet_sum_score", "path": "calculation.all_results.offensivit__t_sum_score" },
        { "name": "offensivitaet_z_score", "path": "calculation.all_results.offensivit__t_z_score" }
    ]
};