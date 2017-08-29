d.tmt = {
    "options": {
        "min": -4,
        "max": "auto",
        "item_height": 75,
        "item_text_left": 100,
        "item_text_right": 100,
        "color_grid": "#9E9E9E",
        "color_clinic_sample": "#888888",
        "color_skin": "grey_dark_to_light",
        "show_baseline": true,
        "show_scale_text": true,
        "show_score_vertical_line": false,
        "show_score_profile_line": true,
        "show_score_circles": true,
        "range_alpha": 0.1,
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
        "left_text": "Mental Speed",
        "right_title": "TMT A",
        "right_text": "Mental Speed",
        "m_norm": "?",
        "sd_norm": "?",
        "score_path": "calculation.tmt_score.percentile.z_scores.tmtA_z_rounded",
        "clinic_sample_var": "TMTAZ",
        "items": 1
    }, {
        "id": 1,
        "left_title": "TMT B",
        "left_text": "Task Switching",
        "right_title": "TMT B",
        "right_text": "Task Switching",
        "m_norm": "?",
        "sd_norm": "?",
        "score_path": "calculation.tmt_score.percentile.z_scores.tmtB_z_rounded",
        "clinic_sample_var": "TMTBZ",
        "items": 5
    }],
    "ranges": [{
        "range_start": -999,
        "range_stop": -1,
        "text": "Verlangsamung",
        "color": "#C62828"
    }, {
        "range_start": 2,
        "range_stop": 999,
        "text": "Normale Geschwindigkeit",
        "color": "#2E7D32"
    }]
};