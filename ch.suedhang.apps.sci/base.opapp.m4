[module]
id = ch.suedhang.apps.sci
name = Stress- & Coping-Inventar
short_description = Messung von Stressbelastung, Stresssymptomen und Stressbewältigungs-Strategien (Coping)
version = include(VERSION)
type = patient

[description]
Messung von Stressbelastung, Stresssymptomen und Stressbewältigungs-Strategien (Coping)

[developer]
first_name = Nora
last_name = Schönenberger
github_user = schoenenb
email = nora.schoenenberger@suedhang.ch
company = Suedhang
phone = +41 (0)31 828 14 51
website = http://www.optinomic.com/


[template chart_stanine 6 14]
include(templates/stanine.html)



[dependencies]


[javascript]
include(../lib/js/optinomic/data_module/optinomic_app_api.m4)
include(main.js)


[css]
include(../lib/css/set/optinomic_material_bootstrap.m4)
include(style.css)

[survey]
id = SCI
type = lime
responsibility = lead_therapist
name = Stress- & Coping-Inventar
host = default
survey_id = 933257
hash = X36X990
pid = X36X991
fid = X36X992
min_questions =
min_lastpage = 2

[event]
type = on_activation
time = 19:00
due_after = 259200
overdue = ignore
description = Messung von Stressbelastung, Stresssymptomen und Stressbewältigungs-Strategien (Coping) bei Klinik Ein- und Austritt.
survey = SCI


[calculation scores javascript]
include(calculations/scores.js)


