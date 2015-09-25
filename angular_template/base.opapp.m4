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



[template data_survey_responses 6 7]
include(templates/data.html)

[template chart_tscore 6 9]
include(templates/tscore.html)

[template chart_stanine 6 7]
include(templates/stanine.html)

[template chart_timeline 6 7]
include(templates/chart_timeline.html)

[template data_download 6 3]
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
name = Tägliche Stimmung
username = admin
password = 23or5P6gSv3YjAcJCUe4
base_url = http://limesurvey.optinomic.org/index.php
survey_id = 368847
hash = X1X1
pid = X1X2
fid = X1X3
min_questions =
min_lastpage = 2


[event]

type = daily
time = 19:00
due_after = 86400
overdue = ignore
description = Track your daily craving.
survey = daily_mood

[email new_event html]

include(emails/new_event.html)

[email overdue html]

include(emails/overdue.html)


[calculation another_calculation javascript]

include(calculations/another_calculation.js)
