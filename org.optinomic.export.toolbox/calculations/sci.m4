function main(responses) {
    var definitions = {
        "user_app_id": "org.optinomic.export.toolbox",
        "paitent_app_id": "ch.suedhang.apps.sci",
        "calculation_id": "scores"
    };

    include(../lib/calculations/user/survey_responses.js)
}