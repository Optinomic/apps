[module]
id = ch.suedhang.apps.bdi.production
name = Beck-Depressions-Inventar (BDI-II)
parent = ch.suedhang.apps.bdi
short_description = Hinweis auf den Schweregrad depressiver Symptomatik im klinischen Bereich, 21 Aussagen
version = include(VERSION)
type = patient

[description]
Der Summenwert aus den 21 Fragebereichen des Beck-Depressions-Inventar liefert einen Hinweis auf den Schweregrad einer möglichen depressiven Symptomatik.

[developer]
first_name = Nora
last_name = Schönenberger
github_user = schoenenb
email = nora.schoenenberger@suedhang.ch
company = Suedhang
phone = +41 (0)31 828 14 92
website = http://suedhang.ch/de/


[dependencies]


[survey]
id = bdi2
type = lime
responsibility = patient_via_assessment
name = Beck-Depressions-Inventar (BDI-II)
host = limesurvey_v2
survey_id = 786887
hash = X33X1162
pid = X33X1163
fid = X33X1164
min_questions =
min_lastpage = 3


[event activation]
type = on_activation
time = 08:00
due_after = 259200
overdue = ignore
description = Schweregrad depressiver Symptomatik im klinischen Bereich, 21 Aussagen
survey = bdi2


[event activation]
type = before_exit
days = 7
time = 08:00
due_after = 259200
overdue = ignore
description = Schweregrad depressiver Symptomatik im klinischen Bereich, 21 Aussagen
survey = bdi2