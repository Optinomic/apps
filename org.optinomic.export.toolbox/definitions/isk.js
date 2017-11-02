d.isk = {
    "options": {
        "app_id": "org.optinomic.export.toolbox",
        "calculation_id": "isk_full",
        "name": "ISK",
        "delimitter": ";"
    },
    "fields": [
        { "name": "isk_01", "path": "survey_response.response['AISK[AISK1]'']" },
        { "name": "isk_02", "path": "survey_response.response['AISK[AISK2]'']" },
        { "name": "isk_03", "path": "survey_response.response['AISK[AISK3]'']" },
        { "name": "isk_04", "path": "survey_response.response['AISK[AISK4]'']" },
        { "name": "isk_05", "path": "survey_response.response['AISK[AISK5]'']" },
        { "name": "isk_06", "path": "survey_response.response['AISK[AISK6]'']" },
        { "name": "isk_07", "path": "survey_response.response['AISK[AISK7]'']" },
        { "name": "isk_08", "path": "survey_response.response['AISK[AISK8]'']" },
        { "name": "isk_09", "path": "survey_response.response['AISK[AISK9]'']" },
        { "name": "isk_10", "path": "survey_response.response['AISK[AIS10]'']" },
        { "name": "isk_11", "path": "survey_response.response['AISK[AIS11]'']" },
        { "name": "isk_12", "path": "survey_response.response['AISK[AIS12]'']" },
        { "name": "isk_13", "path": "survey_response.response['AISK[AIS13]'']" },
        { "name": "isk_14", "path": "survey_response.response['AISK[AIS14]'']" },
        { "name": "offensivitaet_scale_score", "path": "calculation.all_results.offensivit__t_scale_score" },
        { "name": "offensivitaet_sum_score", "path": "calculation.all_results.offensivit__t_sum_score" },
        { "name": "offensivitaet_z_score", "path": "calculation.all_results.offensivit__t_z_score" }
    ]
};