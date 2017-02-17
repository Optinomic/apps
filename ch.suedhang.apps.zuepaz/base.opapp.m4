[module]
id = ch.suedhang.apps.zuepaz
name = ZüPaZ - Version Südhang
short_description = Zürcher Patientenzufriedenheit Fragebogen mit spezifischen Anpassungen für die Klinik Südhang
version = include(VERSION)
type = patient

[description]
Es wird die allgemeine Zufriedenheit der Patienten mit der Klinik Südhang erfragt - vom Eintritt bis zum Austritt, in den Bereichen Hotellerie, Informationsfluss, Therapieangebote und Behandlung durch das (therapeutische) Personal.

[developer]
first_name = Nora
last_name = Schönenberger
github_user = schoenenb
email = nora.schoenenberger@suedhang.ch
company = Suedhang
phone = +41 (0)31 828 14 51
website = http://www.optinomic.com/


[template ZuePaZ 6 14]
include(templates/score_new.html)

[dependencies]

[javascript]
include(../lib/js/optinomic/data_module/optinomic_app_api.m4)
include(main.js)

[css]
include(../lib/css/set/optinomic_material_bootstrap.m4)
include(style.css)

[survey]
id = ZuePaZ_Suedhang
type = lime
responsibility = lead_therapist
name = Zuepaz
host = default
survey_id = 743827
hash = X39X464
pid = X39X465
fid = X39X466
min_questions =
min_lastpage = 4

[event exit]
responsibility = lead_therapist
type = before_exit
days = 7
time = 07:00
due_after = 604800
overdue = ignore
description = Erfassung der Patientenzufriedenheit
survey = ZuePaZ_Suedhang

[email new_event html]
include(emails/new_event.html)

[email overdue html]
include(emails/overdue.html)

[calculation another_calculation javascript]
include(calculations/zuepaz.js)

[sql_init]
include(includes/create_view.sql)