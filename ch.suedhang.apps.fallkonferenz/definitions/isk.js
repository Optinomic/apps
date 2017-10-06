d.isk = {
    "options": {
        "min": -8,
        "max": 4,
        "item_height": 76,
        "item_text_left": 256,
        "item_text_right": 164,
        "color_grid": "#9E9E9E",
        "color_clinic_sample": "#888888",
        "color_skin": "grey_dark_to_light",
        "show_baseline": false,
        "show_ranges_overview": false,
        "show_scale_text": true,
        "show_score_vertical_line": false,
        "show_score_profile_line": true,
        "show_score_circles": true,
        "show_settings_block": false,
        "allow_toggle_settings_block": true,
        "topnumber_hide_first_last": false,
        "range_alpha": 0.09,
        "vertical_grid_every_x": 1,
        "norm_sample": "Z-Werte aufgrund der Normstichprobe nach Kanning (2009) berechnet.",
        "response_title_path": "calculation.scores_calculation.info.mz.mz_typ",
        "response_date_path": "date"
    },
    "scales": [{
        "left_title": "Soziale Orientierung",
        "left_text": "Auf den eigenen Vorteil bedacht sein, sich nicht für andere interessieren und deren Meinung ignorieren oder gering schätzen.",
        "right_title": "Soziale Orientierung",
        "right_text": "Überinvolviert, zu schnelle Kompromissbereitschaft",
        "m_norm": [0.23, 0.32],
        "sd_norm": [0.31, 0.33],
        "score_path": "calculation.scores_calculation.all_results.soziale_orientierung_z_score",
        "clinic_sample_var": "soziale_orientierung_z_score",
        "items": 10
    }, {
        "id": 1,
        "left_title": "Offensivität",
        "left_text": "Sich sozial isolieren, Konflikten aus dem Weg gehen, sich unterordnen, Entscheidungen vor sich her schieben.",
        "right_title": "Offensivität",
        "right_text": "Streitlustig, unüberlegte Entscheidungen",
        "m_norm": [0.19, 0.19],
        "sd_norm": [0.28, 0.27],
        "score_path": "calculation.scores_calculation.all_results.offensivit__t_z_score",
        "clinic_sample_var": "offensivit__t_z_score",
        "items": 8
    }, {
        "left_title": "Selbststeuerung",
        "left_text": "Sich treiben lassen, in seinem Handeln von ggf. stark schwankenden Emotionen bestimmt sein und die Verantwortung für das eigene Leben in der Umwelt ansiedeln.",
        "right_title": "Selbststeuerung",
        "right_text": "Zwanghafte Selbstkontrolle",
        "m_norm": [0.33, 0.34],
        "sd_norm": [0.40, 0.38],
        "score_path": "calculation.scores_calculation.all_results.selbststeuerung_z_score",
        "clinic_sample_var": "selbststeuerung_z_score",
        "items": 8
    }, {
        "left_title": "Reflexibilität",
        "left_text": "Sich nicht mit seinem Verhalten auseinandersetzten, gleichgültig gegenüber dem Verhalten und Erleben anderer Menschen.",
        "right_title": "Reflexibilität",
        "right_text": "Zwanghafte Selbstdarstellung, Rigidität",
        "m_norm": [0.14, 0.16],
        "sd_norm": [0.23, 0.25],
        "score_path": "calculation.scores_calculation.all_results.reflexibilit__t_z_score",
        "clinic_sample_var": "reflexibilit__t_z_score",
        "items": 7
    }],
    "ranges": [{
        "range_start": -999,
        "range_stop": -2,
        "text": "starke Ausprägung",
        "color": "#F44336"
    }, {
        "range_start": -1,
        "range_stop": 1,
        "text": "normale Ausprägung",
        "color": "#4CAF50"
    }, {
        "range_start": 2,
        "range_stop": 999,
        "text": "starke Ausprägung",
        "color": "#F44336"
    }]
};