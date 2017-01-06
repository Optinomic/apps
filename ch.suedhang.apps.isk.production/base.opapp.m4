[module]
id = ch.suedhang.apps.isk.production
name = ISK-K
parent = ch.suedhang.apps.isk
short_description = Inventar Sozialer Kompetenzen - Kurzform.
version = include(VERSION)
type = patient

[description]
Das Inventar Sozialer Kompetenzen (Kurzversion) erfasst in 33 Aussagen persönliche Verhaltensweisen und Gewohnheiten zu den vier Bereichen: Soziale Orientierung, Offensivität, Selbststeuerung und Reflexibilität. Soziale Kompetenzen sind für unser Funktionieren in der Gesellschaft notwendig. Sind sie zu sehr auf einen selber oder zu sehr auf die Gesellschaft ausgerichtet, dann funktioniert das Zusammenspiel nicht. Mittlere Ausprägungen, welche beide Aspekte berücksichtigen sind daher am günstigsten.


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
id = isk
type = lime
responsibility = patient_via_assessment
name = Inventar Sozialer Kompetenzen
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

[event activation]
type = before_exit
days = 8
time = 08:00
due_after = 259200
overdue = ignore
description = Austritt: Inventar Sozialer Kompetenzen (ISK)
survey = isk