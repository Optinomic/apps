d.isk = {
    "options": {
        "app_id": "org.optinomic.export.toolbox",
        "calculation_id": "isk_full",
        "name": "ISK",
        "delimitter": ";"
    },
    "fields": [
        { "name": "isk_01", "path": "survey_response.response.AISK[AISK1]", "type": "number" },
        { "name": "isk_02", "path": "survey_response.response.AISK[AISK2]", "type": "number" },
        { "name": "isk_03", "path": "survey_response.response.AISK[AISK3]", "type": "number" },
        { "name": "isk_04", "path": "survey_response.response.AISK[AISK4]", "type": "number" },
        { "name": "isk_05", "path": "survey_response.response.AISK[AISK5]", "type": "number" },
        { "name": "isk_06", "path": "survey_response.response.AISK[AISK6]", "type": "number" },
        { "name": "isk_07", "path": "survey_response.response.AISK[AISK7]", "type": "number" },
        { "name": "isk_08", "path": "survey_response.response.AISK[AISK8]", "type": "number" },
        { "name": "isk_09", "path": "survey_response.response.AISK[AISK9]", "type": "number" },
        { "name": "isk_10", "path": "survey_response.response.AISK[AIS10]", "type": "number" },
        { "name": "isk_11", "path": "survey_response.response.AISK[AIS11]", "type": "number" },
        { "name": "isk_12", "path": "survey_response.response.AISK[AIS12]", "type": "number" },
        { "name": "isk_13", "path": "survey_response.response.AISK[AIS13]", "type": "number" },
        { "name": "isk_14", "path": "survey_response.response.AISK[AIS14]", "type": "number" },
        { "name": "offensivitaet_scale_score", "path": "calculation.all_results.offensivit__t_scale_score", "type": "number" },
        { "name": "offensivitaet_sum_score", "path": "calculation.all_results.offensivit__t_sum_score", "type": "number" },
        { "name": "offensivitaet_z_score", "path": "calculation.all_results.offensivit__t_z_score", "type": "number" }
    ]
};