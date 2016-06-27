[module]
id = ch.suedhang.apps.honos_kurz_2
name = HoNOS Kurzverlauf V2
short_description = Health of the nation outcomes scales (HoNOS).
version = include(VERSION)
type = patient

[description]
Gesundheit und soziale Funktionsfähigkeit, 12 Items.

[developer]
first_name = Nora
last_name = Schoenenberger
github_user = schoenenb
email = Nora.Schoenenberger@suedhang.ch
company = Klinik Südhang
phone = +41 (0)31 828 14 14
website = http://suedhang.ch/de/


[template score_timeline 6 6]
include(templates/score_timeline_small.html)

[template honos1_timeline 3 4]
include(templates/score_timeline_small.html)

[template honos2_timeline 3 4]
include(templates/score_timeline_small.html)

[template honos5_timeline 3 4]
include(templates/score_timeline_small.html)

[template data_results 6 8]
include(templates/data.html)

[template data_download_admin 6 10]
include(templates/download.html)


[dependencies]

[javascript]
include(../lib/js/optinomic/data_module/optinomic_app_api.m4)
include(main.js)


[css]
include(../lib/css/set/optinomic_material_bootstrap.m4)
include(style.css)

[survey]
id = HoNOS_Verlauf_2
type = lime
responsibility = lead_therapist
name = HoNOS_Kurzverlauf2
host = default
survey_id = 168149
hash = X71X1290
pid = X71X1291
fid = X71X1292
min_questions =
min_lastpage = 2



[event activation]
type = on_activation
due_after = 259200
overdue = ignore
description = HoNOS Fragebogen
survey = HoNOS_Verlauf_2

[email new_event html]
include(emails/new_event.html)

[email overdue html]
include(emails/overdue.html)


[calculation honos_calculation javascript]
include(calculations/honos.js)
