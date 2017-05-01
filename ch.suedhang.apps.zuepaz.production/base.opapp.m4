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
responsibility = Admin
name = Zuepaz
host = limesurvey_v2
survey_id = 743827
hash = X78X2054
pid = X78X2055
fid = X78X2056
min_questions =
min_lastpage = 4

[event exit]
responsibility = Admin
type = before_exit
days = 7
time = 07:00
due_after = 604800
overdue = ignore
description = Erfassung der Patientenzufriedenheit
survey = ZuePaZ_Suedhang


