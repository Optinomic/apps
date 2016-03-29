[module]
id = ch.suedhang.apps.isk
name = ISK Südhang
short_description = Persönliche Verhaltensweisen und Gewohnheiten, 33 Aussagen.
version = include(VERSION)
type = patient

[description]
Das Inventar Sozialer Kompetenzen (Kurzversion) erfasst in 33 Aussagen persönliche Verhaltensweisen und Gewohnheiten zu den vier Bereichen:
soziale Orientierung, Offensivität, Sebststeuerung und Reflexibilität.

[developer]
first_name = Beat
last_name = Ottiger
github_user = ottigerb
email = beat@optinomic.com
company = Optinomic Gmbh
phone = +41 (0)44 508 26 76
website = http://www.optinomic.com/



[template chart_tscore 6 9]
include(templates/tscore.html)

[template chart_stanine 6 7]
include(templates/stanine.html)

[template data_export 6 7]
include(templates/export.html)



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


[event activation]
type = on_activation
time = 19:00
due_after = 86400
overdue = ignore
description = Schätzen Sie Ihre persönlichen Verhaltensweisen und Gewohnheiten im Umgang mit anderen Personen ein.
survey = isk


[email new_event html]
include(emails/new_event.html)

[email overdue html]
include(emails/overdue.html)


[calculation scores_calculation javascript]
include(calculations/scores.js)
