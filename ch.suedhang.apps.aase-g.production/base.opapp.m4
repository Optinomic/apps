[module]
id = com.optinomic.apps.aase-g.production
name = AASE-G
parent = ch.suedhang.apps.aase-g
short_description = Versuchung - Erfassung der Versuchung in spezifischen Situationen die Hauptproblemsubstanz zu konsumieren
version = include(VERSION)
type = patient

[description]
Einschätzung von 20 Situationen auf ihre Versuchung, die Hauptproblemsubstanz zu konsumieren. Die Skala wurde ursprünglich für Alkoholabhängige konzipiert.
0 Punkte entsprechen keiner Versuchung, eine maximale Versuchung liegt bei 80 (allgemeiner Summenwert) respektive 4 (Subskalen) Punkten vor.


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
id = aase
type = lime
responsibility = patient_via_assessment
name = Alcohol Abstinence Self-Efficacy Scale (AASE)
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

[event activation]
type = before_exit
days = 7
time = 08:00
due_after = 259200
overdue = ignore
description = Austritt: Abstinenzselbstwirksamkeit - Versuchung durch Substanz
survey = aase