d.tmt = {
    "options": {
        "app_id": "org.optinomic.export.toolbox",
        "calculation_id": "tmt_full",
        "name": "TMT",
        "delimitter": ";"
    },
    "fields": [
        { "name": "TMTA_Time", "path": "calculation.TMTATime" },
        { "name": "TMTA_Error", "path": "calculation.TMTAError" },
        { "name": "TMTA_Z", "path": "calculation.percentile.z_scores.tmtA_z_rounded" },
        { "name": "TMTB_Time", "path": "calculation.TMTBTime" },
        { "name": "TMTB_Error", "path": "calculation.TMTBError" },
        { "name": "TMTB_Z", "path": "calculation.percentile.z_scores.tmtB_z_rounded" }
    ]
};