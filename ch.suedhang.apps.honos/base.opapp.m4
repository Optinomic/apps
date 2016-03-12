[module]
id = ch.suedhang.apps.honos
name = HoNOS
short_description = Health of the nation outcomes scales (HoNOS).
version = include(VERSION)
type = patient

[description]
Gesundheit und soziale Funktionsfähigkeit, 12 Items.

[developer]
first_name = Beat
last_name = Ottiger
github_user = ottigerb
email = beat@optinomic.com
company = Optinomic Gmbh
phone = +41 (0)44 508 26 76
website = http://www.optinomic.com/

[template score_timeline 6 6]
include(templates/score_timeline_small.html)

[template honos1_timeline 3 4]
include(templates/score_timeline_small.html)

[template honos2_timeline 3 4]
include(templates/score_timeline_small.html)

[template honos3_timeline 3 4]
include(templates/score_timeline_small.html)

[template honos4_timeline 3 4]
include(templates/score_timeline_small.html)

[template honos5_timeline 3 4]
include(templates/score_timeline_small.html)

[template honos6_timeline 3 4]
include(templates/score_timeline_small.html)

[template honos7_timeline 3 4]
include(templates/score_timeline_small.html)

[template honos8_timeline 3 4]
include(templates/score_timeline_small.html)

[template honos9_timeline 3 4]
include(templates/score_timeline_small.html)

[template honos10_timeline 3 4]
include(templates/score_timeline_small.html)

[template honos11_timeline 3 4]
include(templates/score_timeline_small.html)

[template honos12_timeline 3 4]
include(templates/score_timeline_small.html)


[template data_results 6 8]
include(templates/data.html)

[template data_download 6 10]
include(templates/download.html)


[dependencies]

[javascript]
include(../lib/js/optinomic/data_module/optinomic_app_api.m4)
include(main.js)


[css]
include(../lib/css/set/optinomic_material_bootstrap.m4)
include(style.css)

[survey]
id = HoNOS
type = lime
responsibility = lead_therapist
name = HoNOS
host = default
survey_id = 927351
hash = X24X325
pid = X24X326
fid = X24X327
min_questions =
min_lastpage = 2



[event]
type = on_activation
due_after = 259200
overdue = ignore
description = HoNOS Fragebogen
survey = HoNOS

[email new_event html]
include(emails/new_event.html)

[email overdue html]
include(emails/overdue.html)


[calculation honos_calculation javascript]
include(calculations/honos.js)


