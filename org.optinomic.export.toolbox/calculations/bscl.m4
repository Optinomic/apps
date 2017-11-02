function main(responses) {
    var definitions = {
        "user_app_id": "org.optinomic.export.toolbox",
        "paitent_app_id": "ch.suedhang.apps.bscl_anq",
        "calculation_id": "scores_calculation"
    };

    include(../lib/calculations/user/survey_responses.js)
}