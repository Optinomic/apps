[module]
id = ch.suedhang.apps.bdi
name = Beck-Depressions-Inventar (BDI-II)
short_description = Schweregrad depressiver Symptomatik im klinischen Bereich, 21 Aussagen
version = include(VERSION)
type = patient

[description]
Schweregrad depressiver Symptomatik im klinischen Bereich, 21 Aussagen.

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
id = bdi2
type = lime
responsibility = lead_therapist
name = Beck-Depressions-Inventar (BDI-II)
host = default
survey_id = 786887
hash = X31X392
pid = X31X393
fid = X31X394
min_questions =
min_lastpage = 2


[event activation]
type = on_activation
time = 12:00
due_after = 259200
overdue = ignore
description = Schweregrad depressiver Symptomatik im klinischen Bereich, 21 Aussagen
survey = daily_mood


[email new_event html]
include(emails/new_event.html)

[email overdue html]
include(emails/overdue.html)


[calculation BDI_score javascript]
include(calculations/BDI_score.js)
