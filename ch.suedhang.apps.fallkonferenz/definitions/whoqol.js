d.whoqol = {
    "options": {
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
        "range_alpha": 0.09,
        "vertical_grid_every_x": 10,
        "response_title_path": "event.survey_name",
        "response_date_path": "date"
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
        "left_title": "Körperliche Lebensqualität",
        "left_text": "Vermindert",
        "right_title": "Körperliche Lebensqualität",
        "right_text": "Hoch",
        "score_path": "calculation.phys_psych_calculation.PHYS_sum",
        "items": 1
    }, {
        "id": 1,
        "left_title": "Psychische Lebensqualität",
        "left_text": "Vermindert",
        "right_title": "Psychische Lebensqualität",
        "right_text": "Hoch",
        "score_path": "calculation.phys_psych_calculation.PSYCH_sum",
        "items": 5
    }],
    "ranges": [{
        "range_start": 0,
        "range_stop": 56,
        "text": "Verminderte Lebensqualität",
        "color": "#C62828"
    }, {
        "range_start": 56,
        "range_stop": 100,
        "text": "Normale Lebensqualität",
        "color": "#2E7D32"
    }]
};