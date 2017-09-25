properties: {
    _clinic: {
        type: Object,
        statePath: 'clinic.data'
    },

    _current_app: {
        type: Object,
        statePath: 'apps.current.data'
    },

    _sr_aase: {
        type: Object,
        statePath: function(state) {
            var app_id = 'ch.suedhang.apps.aase-g'
            if (app_id in state.survey_responses.data) {
                return state.survey_responses.data[app_id]
            } else {
                return null
            };
        }
    },
    _sr_tmt: {
        type: Object,
        statePath: function(state) {
            var app_id = 'ch.suedhang.apps.tmt_V3'
            if (app_id in state.survey_responses.data) {
                return state.survey_responses.data[app_id]
            } else {
                return null
            };
        },
        observer: '_sr_tmtChanged'
    },
    _sr_whoqol: {
        type: Object,
        statePath: function(state) {
            var app_id = 'com.optinomic.apps.whoqol'
            if (app_id in state.survey_responses.data) {
                return state.survey_responses.data[app_id]
            } else {
                return null
            };
        }
    },
    _sr_actinfo_ein: {
        type: Object,
        statePath: function(state) {
            var actinfo_ein = 'ch.suedhang.apps.actinfo_ein'
            if (actinfo_ein in state.survey_responses.data) {
                return state.survey_responses.data[actinfo_ein]
            } else {
                return null
            };
        },
        observer: '_mergeActinfo'
    },
    _sr_actinfo_aus: {
        type: Object,
        statePath: function(state) {
            var actinfo_aus = 'ch.suedhang.apps.actinfo_aus'
            if (actinfo_aus in state.survey_responses.data) {
                return state.survey_responses.data[actinfo_aus]
            } else {
                return null
            };
        },
        observer: '_mergeActinfo'
    },
    _sr_actinfo: {
        type: Object,
        value: {
            "merged": false
        }
    },

    _pdf_full_bscl: {
        type: Object,
        value: null,
        observer: '_buildPDF'
    },
    _pdf_full_asrs: {
        type: Object,
        value: null,
        observer: '_buildPDF'
    },
    _pdf_full_bdi: {
        type: Object,
        value: null,
        observer: '_buildPDF'
    },
    _pdf_full_whoqol: {
        type: Object,
        value: null,
        observer: '_buildPDF'
    },
    _pdf_full_isk: {
        type: Object,
        value: null,
        observer: '_buildPDF'
    },
    _pdf_full_sci: {
        type: Object,
        value: null,
        observer: '_buildPDF'
    },
    _pdf_app_info: {
        type: Object,
        value: null,
        observer: '_buildPDF'
    }
},