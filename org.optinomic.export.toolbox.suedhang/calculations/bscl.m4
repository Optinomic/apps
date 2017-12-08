function main(responses) {
    var definitions = {
        "user_app_id": "org.optinomic.export.toolbox.suedhang",
        "paitent_app_id": "ch.suedhang.apps.bscl_anq.production",
        "calculation_id": "scores_calculation"
    };

    __opapp_include(../lib/calculations/user/survey_responses.js)
}
