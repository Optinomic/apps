function main(responses) {
    var definitions = {
        "user_app_id": "org.optinomic.export.toolbox.suedhang",
        "paitent_app_id": "ch.suedhang.apps.bdi.production",
        "calculation_id": "bdi_score"
    };

    __opapp_include(../lib/calculations/user/survey_responses.js)
}
