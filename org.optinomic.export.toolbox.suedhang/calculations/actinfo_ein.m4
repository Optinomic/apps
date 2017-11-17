function main(responses) {
    var definitions = {
        "user_app_id": "org.optinomic.export.toolbox",
        "paitent_app_id": "ch.suedhang.apps.actinfo_ein.production",
        "calculation_id": "actinfo_ein"
    };

    include(../lib/calculations/user/survey_responses.js)
}
