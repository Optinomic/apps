[module]
id = ch.suedhang.apps.whoqol.production
name = WHOQOL-BREF
parent = com.optinomic.apps.whoqol
short_description = The World Health Organization Quality of Life (WHOQOL)
version = include(VERSION)
type = patient

[description]
Beurteilung der Physischen und Psychischen Lebensqualität.


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
id = WHOQOL
type = lime
responsibility = patient_via_assessment
name = WHOQOL
host = limesurvey_v2
survey_id = 663948
hash = X60X1485
pid = X60X1486
fid = X60X1487
min_questions =
min_lastpage = 2


[event activation]
type = on_activation
time = 08:00
due_after = 259200
overdue = ignore
description = Eintritt: Lebensqualität (WHOQOL)
survey = WHOQOL

[event before_exit]
type = before_exit
days = 8
time = 08:00
due_after = 259200
overdue = ignore
description = Austritt: Lebensqualität (WHOQOL)
survey = WHOQOL


[sql_init]
include(includes/create_view.sql)

