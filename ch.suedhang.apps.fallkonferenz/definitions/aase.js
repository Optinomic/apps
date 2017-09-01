d.aase = {
    "options": {
        "min": 0,
        "max": 63,
        "item_height": 50,
        "item_text_left": 130,
        "item_text_right": 130,
        "color_grid": "#9E9E9E",
        "color_clinic_sample": "#888888",
        "color_skin": "grey_dark_to_light",
        "show_baseline": true,
        "show_scale_text": false,
        "show_score_vertical_line": true,
        "show_score_profile_line": false,
        "show_score_circles": true,
        "show_settings_block": true,
        "range_alpha": 0.1,
        "vertical_grid_every_x": 3,
        "response_title_path": "calculation.bdi_score.score.current_range.interpretation_de",
        "response_date_path": "date"
    },
    "scales": [{
        "left_title": "keine Versuchung",
        "left_text": "",
        "right_title": "starke Versuchung",
        "right_text": "",
        "score_path": "calculations.calculation_result",
        "clinic_sample_var": null
    }],
    "ranges": [{
        "range_start": 0,
        "range_stop": 1.5,
        "text": "",
        "color": "#2E7D32"
    }, {
        "range_start": 1.5,
        "range_stop": 2.5,
        "text": "",
        "color": "#FFA000"
    }, {
        "range_start": 2.5,
        "range_stop": 3.5,
        "text": "",
        "color": "#FB7200"
    }, {
        "range_start": 3.5,
        "range_stop": 4,
        "text": "",
        "color": "#C62828"
    }]
};