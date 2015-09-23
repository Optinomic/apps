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


[template chart_timeline 6 7]
include(templates/chart_timeline.html)

[template data_survey_responses 6 7]
include(templates/data.html)

[template data_download 6 3]
include(templates/download.html)

[template chart_tscore 6 9]
include(templates/tscore.html)

[template chart_stanine 6 7]
include(templates/stanine.html)



[dependencies]

[javascript]

include(../lib/m4/optinomic/optinomic_app_api.m4)
include(main.js)


[css]

include(../lib/css/set/optinomic_material_bootstrap.css)
include(style.css)

[survey]

id = my_craving
type = lime
responsibility = lead_therapist
name = Craving
username = admin
password = go4optinomix
base_url = http://dev.openpsychotherapy.org/index.php
survey_id = 729583
hash = X128X2955
pid = X128X2956
fid = X128X2957
min_questions =
min_lastpage = 1


[event]

type = daily
time = 19:00
due_after = 86400
overdue = ignore
description = Track your daily craving.
survey = my_craving

[email new_event html]

include(emails/new_event.html)

[email overdue html]

include(emails/overdue.html)


[calculation another_calculation javascript]

include(calculations/another_calculation.js)
