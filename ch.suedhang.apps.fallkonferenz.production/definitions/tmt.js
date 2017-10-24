d.tmt = {
    "options": {
        "min": -6,
        "max": 6,
        "item_height": 58,
        "item_text_left": 100,
        "item_text_right": 100,
        "color_grid": "#9E9E9E",
        "color_clinic_sample": "#888888",
        "color_skin": "grey_dark_to_light",
        "show_baseline": false,
        "show_ranges_overview": false,
        "show_scale_text": true,
        "show_score_vertical_line": false,
        "show_score_profile_line": true,
        "show_score_circles": true,
        "range_alpha": 0.09,
        "show_settings_block": false,
        "allow_toggle_settings_block": true,
        "topnumber_hide_first_last": false,
        "vertical_grid_every_x": 1,
        "norm_sample": "Z-Normierung anhand von Gesunden",
        "response_title_path": "calculation.tmt_score.Messzeitpunkt.Messzeitpunkt_Text",
        "response_date_path": "date"
    },
    "start": {
        "left_title": "schnell",
        "left_text": "Schneller im Vergleich zur Norm",
        "left_color": "#4CAF50",
        "right_title": "langsam",
        "right_text": "Verlangsamung gegenüber Norm",
        "right_color": "#F44336"
    },
    "scales": [{
        "left_title": "TMT A",
        "left_text": "schnell",
        "right_title": "TMT A",
        "right_text": "langsam",
        "score_path": "calculation.tmt_score.percentile.z_scores.tmtA_z_neu_rounded",
        "clinic_sample_var": "TMTAZ",
        "items": 1
    }, {
        "id": 1,
        "left_title": "TMT B",
        "left_text": "schnell",
        "right_title": "TMT B",
        "right_text": "langsam",
        "score_path": "calculation.tmt_score.percentile.z_scores.tmtB_z_neu_rounded",
        "clinic_sample_var": "TMTBZ",
        "items": 5
    }],
    "ranges": [{
        "range_start": -999,
        "range_stop": -2,
        "text": "Normale Geschwindigkeit",
        "color": "#2E7D32"
    }, {
        "range_start": 1,
        "range_stop": 999,
        "text": "Verlangsamung gegenüber Norm",
        "color": "#C62828"
    }]
};