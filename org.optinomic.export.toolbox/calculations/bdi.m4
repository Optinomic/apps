function main(responses) {
    var definitions = {
        "user_app_id": "org.optinomic.export.toolbox",
        "paitent_app_id": "ch.suedhang.apps.bdi",
        "calculation_id": "bdi_score"
    };

    __opapp_include(../lib/calculations/user/survey_responses.js)
}
