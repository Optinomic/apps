
[module]

id = com.optinomic.apps.craving
name = Craving-Tracking
short_description = Substanzverlangen (Alkohol, Tabak, sonstige Drogen) des Patienten
version = include(VERSION)
type = patient

[description]

Substanzverlangen oder Craving (engl. Begierde, Verlangen) ist ein Fachbegriff aus der Suchtmedizin. Craving oder constant craving umschreibt das kontinuierliche und nahezu unbezwingbare Verlangen eines Suchtkranken, sein Suchtmittel (Alkohol, Tabak, sonstige Drogen) zu konsumieren. Craving ist das zentrale Moment des Abhängigkeits- und Entzugssyndroms.


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


[survey]

id = my_ng_survey
type = ng
responsibility = lead_therapist
name = Angular survey example

[survey_markup my_ng_survey]

include(survey_markups/my_ng_survey.html)


[event]

type = daily
time = 19:00
due_after = 86400
overdue = ignore
description = Track your daily craving.
survey = daily_mood

[event]

type = daily
time = 12:00
due_after = 86400
overdue = ignore
description = Track your daily mood with ng-survey.
survey = my_ng_survey


[email new_event html]

include(emails/new_event.html)

[email overdue html]

include(emails/overdue.html)


[calculation another_calculation javascript]

include(calculations/another_calculation.js)
