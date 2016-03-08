[module]
id = ch.suedhang.apps.sci
name = Stress- und Coping-Inventar
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


[template chart_stanine 6 10]
include(templates/stanine.html)

[template data_export 6 8]
include(templates/export.html)


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
hash = X20X257
pid = X20X258
fid = X20X259
min_questions =
min_lastpage = 2


[event]
type = on_activation
overdue = ignore
description = Messung von Stressbelastung, Stresssymptomen und Stressbewältigungs-Strategien (Coping) bei Klinik Ein- und Austritt.
survey = SCI


[calculation scores javascript]
include(calculations/scores.js)


