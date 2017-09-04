d.asrs = {
    "options": {
        "min": 0,
        "max": 6,
        "item_height": 50,
        "item_text_left": 135,
        "item_text_right": 135,
        "color_grid": "#9E9E9E",
        "color_clinic_sample": "#888888",
        "color_skin": "grey_dark_to_light",
        "show_baseline": false,
        "show_scale_text": true,
        "show_score_vertical_line": false,
        "show_score_profile_line": true,
        "show_score_circles": true,
        "show_settings_block": true,
        "range_alpha": 0.05,
        "vertical_grid_every_x": 1,
        "response_title_path": "calculation.another_calculation.messzeitpunkt.mz_text",
        "response_date_path": "calculation.asrs_score.score.current_range.interpretation"
    },
    "scales": [{
        "left_title": "ADHS",
        "left_text": "Keine Hinweise",
        "right_title": "ADHS",
        "right_text": "Hinweise vorhanden",
        "score_path": "calculation.asrs_score.score.score",
        "clinic_sample_var": null
    }],
    "ranges": [{
        "range_start": 0,
        "range_stop": 3,
        "text": "Keine Hinweise auf ADHS vorhanden",
        "color": "#4CAF50"
    }, {
        "range_start": 4,
        "range_stop": 6,
        "text": "Hinweise auf ADHS vorhanden",
        "color": "#F44336"
    }]
};