d.bscl = {
    "options": {
        "min": -2,
        "max": "auto",
        "item_height": 60,
        "item_text_left": 100,
        "item_text_right": 350,
        "color_grid": "#9E9E9E",
        "color_clinic_sample": "#888888",
        "color_skin": "indigo_grey_pink",
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
    "scales": [{
        "left_title": "Somatisierung",
        "left_text": "",
        "right_title": "",
        "right_text": "Kopfschmerzen, Herzbeschwerden, Atemprobleme, Magenbeschwerden, Muskelschmerzen, Schwächegefühl, Schweregefühl, Unwohlsein usw.",
        "m_norm": [0.23, 0.32],
        "sd_norm": [0.31, 0.33],
        "score_path": "calculation.scores_calculation.all_results.somatisierung_z_score",
        "clinic_sample_var": "somatisierung_z_score",
        "items": 7
    }, {
        "left_title": "Zwanghaftigkeit",
        "left_text": "",
        "right_title": "",
        "right_text": "Gedanken, Impulse und Handlungen, die konstant vorhanden und nicht änderbar und ich-fremd oder ungewollt erlebt werden, Kognitive Leistungsstörungen.",
        "m_norm": [0.50, 0.54],
        "sd_norm": [0.46, 0.43],
        "score_path": "calculation.scores_calculation.all_results.zwanghaftigkeit_z_score",
        "clinic_sample_var": "zwanghaftigkeit_z_score",
        "items": 6
    }, {
        "left_title": "Unsicherheit im Sozialkontakt",
        "left_text": "",
        "right_title": "",
        "right_text": "Unzulänglichkeits- und Minderwertigkeitsgefühle, Selbstabwertungen im sozialen Kontakt, Selbstzweifel, Selbstunsicherheit und negative Erwartungen bzgl. dem eigenen zwischenmenschlichen   Verhalten.",
        "m_norm": [0.35, 0.49],
        "sd_norm": [0.40, 0.45],
        "score_path": "calculation.scores_calculation.all_results.unsicherheit_im_sozialkontakt_z_score",
        "clinic_sample_var": "unsicherheit_im_sozialkontakt_z_score",
        "items": 4
    }, {
        "left_title": "Depressivität",
        "left_text": "",
        "right_title": "",
        "right_text": "Gedrückte Stimmung, Gesunkenes Interesse am Leben, Verringerte Motivation und Energie, Hoffnungslosigkeit, bis hin zu Suizidgedanken.",
        "m_norm": [0.24, 0.33],
        "sd_norm": [0.32, 0.40],
        "score_path": "calculation.scores_calculation.all_results.depressivit__t_z_score",
        "clinic_sample_var": "depressivit__t_z_score",
        "items": 6
    }, {
        "left_title": "Ängstlichkeit",
        "left_text": "",
        "right_title": "",
        "right_text": "Angst mit Nervosität, Spannungen und Zittern, Panikattacken und Schreckgefühlen, Gefühle von Besorgnis und Furcht.",
        "m_norm": [0.29, 0.39],
        "sd_norm": [0.31, 0.36],
        "score_path": "calculation.scores_calculation.all_results.__ngstlichkeit_z_score",
        "clinic_sample_var": "__ngstlichkeit_z_score",
        "items": 6
    }, {
        "left_title": "Aggressivität / Feindseligkeit",
        "left_text": "",
        "right_title": "",
        "right_text": "Reizbarkeit und Unausgeglichenheit bis hin zu starker Aggressivität. Ärger, Aggression, Irritierbarkeit, Zorn und Verstimmung.",
        "m_norm": [0.29, 0.37],
        "sd_norm": [0.35, 0.33],
        "score_path": "calculation.scores_calculation.all_results.aggressivit__t___feindseligkeit_z_score",
        "clinic_sample_var": "aggressivit__t___feindseligkeit_z_score",
        "items": 5
    }, {
        "left_title": "Phobische Angst",
        "left_text": "",
        "right_title": "",
        "right_text": "Andauernde und unangemessene Furcht als Reaktion auf eine Person, einen Platz, ein Objekt oder eine Situation, die zu Vermeidungs- oder Fluchtverhalten führt.",
        "m_norm": [0.14, 0.16],
        "sd_norm": [0.23, 0.25],
        "score_path": "calculation.scores_calculation.all_results.phobische_angst_z_score",
        "clinic_sample_var": "phobische_angst_z_score",
        "items": 5
    }, {
        "left_title": "Paranoides Denken",
        "left_text": "",
        "right_title": "",
        "right_text": "Misstrauen, Minderwertigkeitsgefühle, paranoides Denken: Gedankenprojektion, Feindseligkeit, Einengung, Angst vor Autonomieverlust und wahnhafte Täuschung.",
        "m_norm": [0.33, 0.34],
        "sd_norm": [0.40, 0.38],
        "score_path": "calculation.scores_calculation.all_results.paranoides_denken_z_score",
        "clinic_sample_var": "paranoides_denken_z_score",
        "items": 5
    }, {
        "left_title": "Psychotizismus",
        "left_text": "",
        "right_title": "",
        "right_text": "Gefühl der Isolation und zwischenmenschlichen Entfremdung. Verzerrter, isolierter Lebensstil bis zu Halluzination und Gedankenzerfall.",
        "m_norm": [0.19, 0.19],
        "sd_norm": [0.28, 0.27],
        "score_path": "calculation.scores_calculation.all_results.psychotizismus_z_score",
        "clinic_sample_var": "psychotizismus_z_score",
        "items": 5
    }, {
        "left_title": "GSI",
        "left_text": "Global Severity Index",
        "right_title": "",
        "right_text": "Durchschnittliche Belastung in allen Bereichen",
        "m_norm": [0.28, 0.35],
        "sd_norm": [0.23, 0.23],
        "score_path": "calculation.scores_calculation.all_results.gsi_global_severity_index_z_score",
        "clinic_sample_var": "gsi_global_severity_index_z_score",
        "items": 53
    }],
    "ranges": [{
        "range_start": -999,
        "range_stop": 1,
        "text": "Gesunde Ausprägung",
        "color": "#2E7D32"
    }, {
        "range_start": 2,
        "range_stop": 999,
        "text": "Starke Ausprägung",
        "color": "#C62828"
    }]
};
