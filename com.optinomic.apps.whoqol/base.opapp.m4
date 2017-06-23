[module]
id = com.optinomic.apps.whoqol
name = WHOQOL - Phys. / Psych.
short_description = The World Health Organization Quality of Life (WHOQOL)
version = include(VERSION)
type = patient

[description]
Beurteilung der Physischen und Psychischen Lebensqualität.

[developer]
first_name = Beat
last_name = Ottiger
github_user = ottigerb
email = beat@optinomic.com
company = Optinomic Gmbh
phone = +41 (0)44 508 26 76
website = http://www.optinomic.com/


[template simple_score 6 7]
include(templates/score.html)

[readme]
include(readme.md)

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
responsibility = patient_via_assessment
name = WHOQOL
host = default
survey_id = 663948
hash = X8X140
pid = X8X141
fid = X8X142
min_questions =
min_lastpage = 2


[event activation]
type = on_activation
time = 08:00
due_after = 86400
overdue = ignore
description = WHOQOL ausfüllen.
survey = WHOQOL

[event exit]
type = before_exit
days = 7
time = 08:00
due_after = 86400
overdue = ignore
description = WHOQOL ausfüllen.
survey = WHOQOL



[calculation phys_psych_calculation javascript]
include(calculations/phys_psych_calculation.js)

