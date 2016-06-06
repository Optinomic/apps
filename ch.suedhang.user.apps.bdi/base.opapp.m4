[module]
id = ch.suedhang.user.apps.bdi
name = Beck-Depressions-Inventar (BDI-II)
short_description = Entwicklung: Schweregrad depressiver Symptomatik im klinischen Bereich, 21 Aussagen
version = include(VERSION)
type = user


[description]
Entwicklung verschiedener Patientengruppen bzgl. des Schweregrads depressiver Symptomatik im klinischen Bereich, 21 Aussagen.


[developer]
first_name = Beat
last_name = Ottiger
github_user = ottigerb
email = beat@optinomic.com
company = Optinomic Gmbh
phone = +41 (0)44 508 26 76
website = http://www.optinomic.com/


[dependencies]
ch.suedhang.apps.bdi >= 1.0


[template score_overview 4 4]
include(templates/score.html)

[template data_export_admin 6 7]
include(templates/export.html)


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
min_lastpage = 3
min_questions =



[event activation]
type = on_activation
time = 12:00
due_after = 259200
overdue = ignore
description = Schweregrad depressiver Symptomatik im klinischen Bereich, 21 Aussagen
survey = bdi2


[email new_event html]
include(emails/new_event.html)

[email overdue html]
include(emails/overdue.html)


[calculation bdi_score javascript]
include(calculations/bdi_score.js)
