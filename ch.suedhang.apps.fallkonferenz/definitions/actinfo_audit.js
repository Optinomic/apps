d.actinfo_audit = {
                "options": {
                    "min": 0,
                    "max": 40,
                    "item_height": 50,
                    "item_text_left": 100,
                    "item_text_right": 100,
                    "color_grid": "#9E9E9E",
                    "color_clinic_sample": "#888888",
                    "color_skin": "grey_dark_to_light",
                    "show_baseline": true,
                    "show_scale_text": true,
                    "show_score_vertical_line": true,
                    "show_score_profile_line": false,
                    "show_score_circles": true,
                    "show_settings_block": true,
                    "range_alpha": 0.1,
                    "vertical_grid_every_x": 5,
                    "response_title_path": "calculation.actinfo_ein_calc.AUDIT.interpretation.result",
                    "response_date_path": "date"
                },
                "scales": [{
                    "left_title": "Alkohol",
                    "left_text": "Gering",
                    "right_title": "Alkohol",
                    "right_text": "Stark",
                    "score_path": "calculation.actinfo_ein_calc.AUDIT.AUDIT_Score",
                    "clinic_sample_var": null
                }],
                "ranges": [{
                    "range_start": 0,
                    "range_stop": 7,
                    "text": "Risikoarmer Alkoholkonsum",
                    "color": "#2E7D32"
                }, {
                    "range_start": 7,
                    "range_stop": 15,
                    "text": "Verdacht auf eine alkoholbezogene Störung",
                    "color": "#FBB100"
                }, {
                    "range_start": 15,
                    "range_stop": 40,
                    "text": "Hohe Wahrscheinlichkeit einer Alkoholabhängigkeit",
                    "color": "#C62828"
                }]
            };