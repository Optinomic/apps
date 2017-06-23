[module]
id = com.optinomic.apps.template
name = Optinomic-App (Template)
short_description = Use this as a starting-point for your apps.
version = include(VERSION)
type = patient

[description]
Mit Apps werden Computerprogramme bezeichnet, die genutzt werden, um eine nützliche oder gewünschte nicht systemtechnische Funktionalität zu bearbeiten oder zu unterstützen, das heißt sie dienen der „Lösung von Benutzerproblemen“.

[developer]
first_name = Beat
last_name = Ottiger
github_user = ottigerb
email = beat@optinomic.com
company = Optinomic Gmbh
phone = +41 (0)44 508 26 76
website = http://www.optinomic.com/

[readme]
include(readme.md)


[template data_survey_responses 6 7]
include(templates/data.html)

[template chart_timeline 6 7]
include(templates/chart_timeline.html)

[template simple_score 4 4]
include(templates/score.html)

[template score_range 2 4]
include(templates/range.html)

[template chart_tscore 6 10]
include(templates/tscore.html)

[template chart_stanine 6 7]
include(templates/stanine.html)

[template export_toolbox_admin 6 10]
include(templates/download.html)


[dependencies]

[javascript]
include(../lib/js/optinomic/data_module/optinomic_app_api.m4)
include(main.js)


[css]
include(../lib/css/set/optinomic_material_bootstrap.m4)
include(style.css)

[survey]
id = daily_mood
type = lime
responsibility = lead_therapist
name = Täglicher Irgendwas
host = default
survey_id = 368847
hash = X1X1
pid = X1X2
fid = X1X3
min_questions =
min_lastpage = 2



[survey]
id = my_ng_survey
type = ng
responsibility = patient_via_email
name = Second example survey
host = default

[survey_markup my_ng_survey]
include(survey_markups/my_ng_survey.html)


[event daily]
type = on_activation
due_after = 129200
overdue = ignore
description = Track your something.
survey = daily_mood


[email new_event html]
include(emails/new_event.html)

[email overdue html]
include(emails/overdue.html)


[calculation another_calculation javascript]
include(calculations/another_calculation.js)
