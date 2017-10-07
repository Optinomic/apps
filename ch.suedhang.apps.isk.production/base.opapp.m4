[module]
id = ch.suedhang.apps.isk.production
name = ISK-K
parent = ch.suedhang.apps.isk
short_description = Inventar Sozialer Kompetenzen
version = include(VERSION)
type = patient

[description]
Persönliche Verhaltensweisen und Gewohnheiten zu den vier Bereichen: Soziale Orientierung, Offensivität, Selbststeuerung und Reflexibilität.


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
id = isk
type = lime
responsibility = patient_via_assessment
name = ISK-K
host = limesurvey_v2
survey_id = 824558
hash = X45X1292
pid = X45X1293
fid = X45X1294
min_questions =
min_lastpage = 2


[event activation]
type = on_activation
time = 08:00
due_after = 259200
overdue = ignore
description = Eintritt: Inventar Sozialer Kompetenzen (ISK)
survey = isk

[event exit]
type = before_exit
days = 10
time = 08:00
due_after = 259200
overdue = ignore
description = Austritt: Inventar Sozialer Kompetenzen (ISK)
survey = isk


