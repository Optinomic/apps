d.aase = {
    "options": {
        "min": -1,
        "max": 5,
        "item_height": 50,
        "item_text_left": 135,
        "item_text_right": 135,
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
        "topnumber_hide_first_last": true,
        "range_alpha": 0.09,
        "vertical_grid_every_x": 1,
        "response_title_path": "calculation.another_calculation.messzeitpunkt.mz_text_substanz",
        "response_date_path": "date"
    },
    "scales": [{
        "left_title": "Negativer Affekt",
        "left_text": "Keine Versuchung",
        "right_title": "Negativer Affekt",
        "right_text": "Starke Versuchung",
        "score_path": "calculation.another_calculation.mean_negativer_affekt",
        "clinic_sample_var": null
    }, {
        "left_title": "Soziale Situationen",
        "left_text": "Keine Versuchung",
        "right_title": "Soziale Situationen",
        "right_text": "Starke Versuchung",
        "score_path": "calculation.another_calculation.mean_soziale_situationen",
        "clinic_sample_var": null
    }, {
        "left_title": "Somatisches Unwohlsein",
        "left_text": "Keine Versuchung",
        "right_title": "Somatisches Unwohlsein",
        "right_text": "Starke Versuchung",
        "score_path": "calculation.another_calculation.mean_somatisches_unwohlsein",
        "clinic_sample_var": null
    }, {
        "left_title": "Entzugserscheinungen",
        "left_text": "Keine Versuchung",
        "right_title": "Entzugserscheinungen",
        "right_text": "Starke Versuchung",
        "score_path": "calculation.another_calculation.mean_entzugserscheinungen",
        "clinic_sample_var": null
    }, {
        "left_title": "Gesamtscore",
        "left_text": "Keine Versuchung",
        "right_title": "Gesamtscore",
        "right_text": "Starke Versuchung",
        "score_path": "calculation.another_calculation.score_mean",
        "clinic_sample_var": null
    }],
    "ranges": [{
        "range_start": 0,
        "range_stop": 0.999,
        "text": "sehr geringe Versuchung",
        "color": "#2E7D32"
    }, {
        "range_start": 1,
        "range_stop": 1.999,
        "text": "geringe Versuchung",
        "color": "#FFA000"
    }, {
        "range_start": 2,
        "range_stop": 2.999,
        "text": "hohe Versuchung",
        "color": "#FB7200"
    }, {
        "range_start": 3,
        "range_stop": 999,
        "text": "sehr hohe Versuchung",
        "color": "#C62828"
    }]
};