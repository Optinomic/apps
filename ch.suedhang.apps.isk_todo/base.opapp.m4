[module]
id = ch.suedhang.apps.isk
name = ISK Südhang
short_description = Inventar Sozialer Kompetenzen
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



[template data_survey_responses 6 7]
include(templates/data.html)

[template chart_timeline 6 7]
include(templates/chart_timeline.html)

[template simple_score 4 4]
include(templates/score.html)

[template score_range 2 4]
include(templates/range.html)

[template chart_tscore 6 9]
include(templates/tscore.html)

[template chart_stanine 6 7]
include(templates/stanine.html)

[template data_download 6 14]
include(templates/download.html)


[dependencies]

[javascript]
include(../lib/js/optinomic/data_module/optinomic_app_api.m4)
include(main.js)


[css]
include(../lib/css/set/optinomic_material_bootstrap.m4)
include(style.css)

[survey]
id = isk
type = lime
responsibility = lead_therapist
name = Inventar Sozialer Kompetenzen
host = default
survey_id = 824558
hash = X28X343
pid = X28X344
fid = X28X345
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


[event]
type = on_activation
time = 19:00
due_after = 86400
overdue = ignore
description = Track your daily craving.
survey = isk


[email new_event html]
include(emails/new_event.html)

[email overdue html]
include(emails/overdue.html)


[calculation another_calculation javascript]
include(calculations/another_calculation.js)


