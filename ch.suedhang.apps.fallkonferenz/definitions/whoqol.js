d.whoqol = {
    "options": {
        "min": -2,
        "max": "auto",
        "item_height": 75,
        "item_text_left": 120,
        "item_text_right": 120,
        "color_grid": "#9E9E9E",
        "color_clinic_sample": "#888888",
        "color_skin": "grey_dark_to_light",
        "show_baseline": false,
        "show_scale_text": true,
        "show_score_vertical_line": false,
        "show_score_profile_line": true,
        "show_score_circles": true,
        "show_settings_block": false,
        "allow_toggle_settings_block": true,
        "topnumber_hide_first_last": false,
        "range_alpha": 0.09,
        "vertical_grid_every_x": 1,
        "response_title_path": "calculation.phys_psych_calculation.info.mz.mz_typ",
        "response_date_path": "date"
    },
    "options_sum": {
        "min": -1,
        "max": 101,
        "item_height": 75,
        "item_text_left": 120,
        "item_text_right": 120,
        "color_grid": "#9E9E9E",
        "color_clinic_sample": "#888888",
        "color_skin": "grey_dark_to_light",
        "show_baseline": false,
        "show_scale_text": true,
        "show_score_vertical_line": false,
        "show_score_profile_line": true,
        "show_score_circles": true,
        "show_settings_block": false,
        "allow_toggle_settings_block": true,
        "topnumber_hide_first_last": true,
        "range_alpha": 0.09,
        "vertical_grid_every_x": 10,
        "response_title_path": "calculation.phys_psych_calculation.info.mz.mz_typ",
        "response_date_path": "date"
    },
    "scales": [{
        "left_title": "Körperliche Lebensqualität",
        "left_text": "Hoch",
        "right_title": "Körperliche Lebensqualität",
        "right_text": "Vermindert",
        "score_path": "calculation.phys_psych_calculation.all_results.koerperliche_lebensqualitaet_z_score_inverted"
    }, {
        "id": 1,
        "left_title": "Psychische Lebensqualität",
        "left_text": "Hoch",
        "right_title": "Psychische Lebensqualität",
        "right_text": "Vermindert",
        "score_path": "calculation.phys_psych_calculation.all_results.psychische_lebensqualitaet_z_score_inverted"
    }],
    "ranges_sum": [{
        "range_start": 0,
        "range_stop": 56,
        "text": "Verminderte Lebensqualität",
        "color": "#C62828"
    }, {
        "range_start": 56,
        "range_stop": 100,
        "text": "Normale Lebensqualität",
        "color": "#2E7D32"
    }],
    "ranges": [{
        "range_start": -999,
        "range_stop": 2,
        "text": "Normale Lebensqualität",
        "color": "#2E7D32"
    },{
        "range_start": 2,
        "range_stop": 999,
        "text": "Verminderte Lebensqualität",
        "color": "#C62828"
    }]
};