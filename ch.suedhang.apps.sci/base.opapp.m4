[module]
id = ch.suedhang.apps.sci
name = Stress-Coping-Inventar (SCI)
short_description = Messung von Stressbelastung, Stresssymptomen und Stressbewältigungs-Strategien (Coping)
version = include(VERSION)
type = patient

[description]
Das SCI ist ein wissenschaftliches Fragebogen-Instrument zur zuverlässigen Messung von Stressbelastung, Stresssymptomen und Stressbewältigungs-Strategien (Coping). Alle Skalen erreichen überzeugende psychometrische Kennwerte. Eine detaillierte Faktorenanalyse konnte zudem die Annahme von fünf unterschiedlichen Coping-Strategien bestätigen. Weitere Untersuchungen lieferten überzeugende Belege für die Aussagekraft der Skalen. So zeigte sich, dass Personen, die unter viel Stress leiden aber trotzdem nur wenige Folgesymptome aufweisen, mehr adaptive Coping-Strategien einsetzen.

[developer]
first_name = Beat
last_name = Ottiger
github_user = ottigerb
email = beat@optinomic.com
company = Optinomic Gmbh
phone = +41 (0)44 508 26 76
website = http://www.optinomic.com/


[template sci_stanine 6 12]
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
responsibility = patient_via_assessment
name = Stress- & Coping-Inventar
host = default
survey_id = 933257
hash = X122X3529
pid = X122X3530
fid = X122X3531
min_questions =
min_lastpage = 13

[event activation]
type = on_activation
time = 08:00
due_after = 259200
overdue = ignore
description = Messung von Stressbelastung, Stresssymptomen und Stressbewältigungs-Strategien (Coping) bei Klinik Ein- und Austritt.
survey = SCI

[event exit]
type = before_exit
days = 7
time = 08:00
due_after = 259200
overdue = ignore
description = Messung von Stressbelastung, Stresssymptomen und Stressbewältigungs-Strategien (Coping) bei Klinik Ein- und Austritt.
survey = SCI


[calculation scores javascript]
include(calculations/scores.js)


[sql_init]
include(includes/create_view.sql)
