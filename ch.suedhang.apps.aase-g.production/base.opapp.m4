[module]
id = ch.suedhang.apps.aase-g.production
name = AASE-G
parent = ch.suedhang.apps.aase-g
short_description = Versuchung in spezifischen Situationen
version = include(VERSION)
type = patient

[description]

[developer]
first_name = Nora
last_name = Schönenberger
github_user = schoenenb
email = nora.schoenenberger@suedhang.ch
company = Suedhang
phone = +41 (0)31 828 14 92
website = http://suedhang.ch/de/Forschung

[readme]
include(readme.md)

[dependencies]


[survey]
id = aase
type = lime
responsibility = patient_via_assessment
name = AASE-G
host = limesurvey_v2
survey_id = 526942
hash = X68X1538
pid = X68X1539
fid = X68X1540
min_questions =
min_lastpage = 2


[event activation]
type = on_activation
time = 08:00
due_after = 259200
overdue = ignore
description = Eintritt: Abstinenzselbstwirksamkeit - Versuchung durch Substanz
survey = aase

[event exit]
type = before_exit
days = 10
time = 08:00
due_after = 259200
overdue = ignore
description = Austritt: Abstinenzselbstwirksamkeit - Versuchung durch Substanz
survey = aase



