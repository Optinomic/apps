[module]
id = com.optinomic.apps.whoqol
name = WHOQOL - PHYS / Psych
short_description = The World Health Organization Quality of Life (WHOQOL) - PHYS / Psych.
version = include(VERSION)
type = patient

[description]
Beurteilung der Lebensquälität | Dimensionen PHYS & PSYCH.

[developer]
first_name = Beat
last_name = Ottiger
github_user = ottigerb
email = beat@optinomic.com
company = Optinomic Gmbh
phone = +41 (0)44 508 26 76
website = http://www.optinomic.com/


[template simple_score 6 4]
include(templates/score.html)



[dependencies]

[javascript]
include(../lib/js/optinomic/data_module/optinomic_app_api.m4)
include(main.js)


[css]
include(../lib/css/set/optinomic_material_bootstrap.m4)
include(style.css)

[survey]
id = WHOQOL
type = lime
responsibility = lead_therapist
name = WHOQOL
host = default
survey_id = 663948
hash = X8X140
pid = X8X141
fid = X8X142
min_questions =
min_lastpage = 2


[event]
type = on_activation
due_after = 86400
overdue = ignore
description = WHOQOL ausfüllen.
survey = WHOQOL

[event]
type = before_exit
days = 3
due_after = 86400
overdue = ignore
description = WHOQOL ausfüllen.
survey = WHOQOL


[email new_event html]
include(emails/new_event.html)

[email overdue html]
include(emails/overdue.html)


[calculation another_calculation javascript]
include(calculations/another_calculation.js)


