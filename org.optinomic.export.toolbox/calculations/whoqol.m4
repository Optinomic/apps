function main(responses) {
    var definitions = {
        "user_app_id": "org.optinomic.export.toolbox",
        "paitent_app_id": "com.optinomic.apps.whoqol",
        "calculation_id": "phys_psych_calculation"
    };

    __opapp_include(../lib/calculations/user/survey_responses.js)
}
