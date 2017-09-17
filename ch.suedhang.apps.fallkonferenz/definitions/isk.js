d.isk = {
    "options_text": {
        "min": -8,
        "max": 4,
        "item_height": 76,
        "item_text_left": 256,
        "item_text_right": 140,
        "color_grid": "#9E9E9E",
        "color_clinic_sample": "#888888",
        "color_skin": "grey_dark_to_light",
        "show_baseline": false,
        "show_scale_text": true,
        "show_score_vertical_line": false,
        "show_score_profile_line": true,
        "show_score_circles": true,
        "range_alpha": 0.1,
        "vertical_grid_every_x": 1,
        "response_title_path": "calculation.scores_calculation.info.mz.mz_typ",
        "response_date_path": "date"
    },
    "options_ohne_text": {
        "min": -4,
        "max": "auto",
        "item_height": 50,
        "item_text_left": 150,
        "item_text_right": 150,
        "color_grid": "#9E9E9E",
        "color_clinic_sample": "#888888",
        "color_skin": "grey_dark_to_light",
        "show_baseline": false,
        "show_scale_text": false,
        "show_score_vertical_line": false,
        "show_score_profile_line": true,
        "show_score_circles": true,
        "range_alpha": 0.1,
        "vertical_grid_every_x": 1,
        "response_title_path": "calculation.scores_calculation.info.mz.mz_typ",
        "response_date_path": "calculation.scores_calculation.info.filled"
    },
    "start": {
        "left_title": "Geringe Ausprägung",
        "left_text": "Eine längere Beschreibung bzgl. der geringen Ausprägung.",
        "left_color": "#4CAF50",
        "right_title": "Starke Ausprägung",
        "right_text": "Eine längere Beschreibung bzgl. der starken Ausprägung. Eine längere Beschreibung bzgl. der starken Ausprägung.",
        "right_color": "#F44336"
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