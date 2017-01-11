[module]
id = ch.suedhang.apps.zuepaz.production
name = Patientenzufriedenheit (ZüPaZ)
short_description = Zürcher Patientenzufriedenheit Fragebogen mit spezifischen Anpassungen für die Klinik Südhang
parent = ch.suedhang.apps.zuepaz
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


[dependencies]


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


[sql_init]
include(includes/create_view.sql)
