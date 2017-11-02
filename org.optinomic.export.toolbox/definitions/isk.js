d.isk = {
    "options": {
        "app_id": "org.optinomic.export.toolbox",
        "calculation_id": "isk_full",
        "name": "ISK",
        "delimitter": ";"
    },
    "fields": [
        { "name": "offensivitaet_scale_score", "path": "calculation.all_results.offensivit__t_scale_score" },
        { "name": "offensivitaet_sum_score", "path": "calculation.all_results.offensivit__t_sum_score" },
        { "name": "offensivitaet_z_score", "path": "calculation.all_results.offensivit__t_z_score" }
    ]
};