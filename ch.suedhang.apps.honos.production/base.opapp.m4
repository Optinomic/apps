[module]
id = ch.suedhang.apps.honos.production
name = HoNOS
parent = ch.suedhang.apps.honos
short_description = Health of the nation outcomes scales (HoNOS).
version = include(VERSION)
type = patient

[description]
Gesundheit und soziale Funktionsfähigkeit, 12 Items.


[developer]
first_name = Nora
last_name = Schönenberger
github_user = schoenenb
email = nora.schoenenberger@suedhang.ch
company = Suedhang
phone = +41 (0)31 828 14 92
website = http://suedhang.ch/de/Forschung


[dependencies]


[survey]
id = HoNOS
type = lime
responsibility = lead_therapist
name = HoNOS
host = limesurvey_v2
survey_id = 927351
hash = X41X1274
pid = X41X1275
fid = X41X1276
min_questions =
min_lastpage = 2

[event activation]
type = on_activation
due_after = 259200
overdue = send_reminder_once
description = HoNOS Eintritt
survey = HoNOS

[event before_exit]
type = before_exit
days = 3
time = 00:00
due_after = 259200
overdue = send_reminder_once
description = HoNOS Austritt
survey = HoNOS


[sql_init]
include(includes/create_view_pabs_interface.sql)


