d.tmt = {
    "options": {
        "app_id": "org.optinomic.export.toolbox.suedhang",
        "calculation_id": "tmt_full",
        "name": "TMT1",
        "delimitter": ";"
    },
    "fields": [
        { "name": "TMTA_Time", "path": "calculation.TMTATime", "type": "number" },
        { "name": "TMTA_Error", "path": "calculation.TMTAError", "type": "number" },
        { "name": "TMTA_Z", "path": "calculation.percentile.z_scores.tmtA_z_rounded", "type": "number" },
        { "name": "TMTB_Time", "path": "calculation.TMTBTime", "type": "number" },
        { "name": "TMTB_Error", "path": "calculation.TMTBError", "type": "number" },
        { "name": "TMTB_Z", "path": "calculation.percentile.z_scores.tmtB_z_rounded", "type": "number" }
    ]
};