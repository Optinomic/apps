d.tmt = {
    "options": {
        "min": -5,
        "max": 5,
        "item_height": 58,
        "item_text_left": 100,
        "item_text_right": 100,
        "color_grid": "#9E9E9E",
        "color_clinic_sample": "#888888",
        "color_skin": "grey_dark_to_light",
        "show_baseline": false,
        "show_scale_text": true,
        "show_score_vertical_line": false,
        "show_score_profile_line": true,
        "show_score_circles": true,
        "range_alpha": 0.09,
        "show_settings_block": false,
        "allow_toggle_settings_block": true,
        "topnumber_hide_first_last": false,
        "vertical_grid_every_x": 1,
        "response_title_path": "calculation.tmt_score.Messzeitpunkt.Messzeitpunkt_Text",
        "response_date_path": "date"
    },
    "start": {
        "left_title": "langsam",
        "left_text": "Verlangsamung gegenüber Norm",
        "left_color": "#F44336",
        "right_title": "schnell",
        "right_text": "Schneller im Vergleich zur Norm",
        "right_color": "#4CAF50"
    },
    "scales": [{
        "left_title": "TMT A",
        "left_text": "langsam",
        "right_title": "TMT A",
        "right_text": "schnell",
        "m_norm": "?",
        "sd_norm": "?",
        "score_path": "calculation.tmt_score.percentile.z_scores.tmtA_z_rounded",
        "clinic_sample_var": "TMTAZ",
        "items": 1
    }, {
        "id": 1,
        "left_title": "TMT B",
        "left_text": "langsam",
        "right_title": "TMT B",
        "right_text": "schnell",
        "m_norm": "?",
        "sd_norm": "?",
        "score_path": "calculation.tmt_score.percentile.z_scores.tmtB_z_rounded",
        "clinic_sample_var": "TMTBZ",
        "items": 5
    }],
    "ranges": [{
        "range_start": -999,
        "range_stop": -1,
        "text": "Verlangsamung gegenüber Norm",
        "color": "#C62828"
    }, {
        "range_start": 2,
        "range_stop": 999,
        "text": "Normale Geschwindigkeit",
        "color": "#2E7D32"
    }]
};