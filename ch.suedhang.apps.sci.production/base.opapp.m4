[module]
id = com.optinomic.apps.sci.production
name = Stress-Coping-Inventar (SCI)
parent = ch.suedhang.apps.sci
short_description = Messung von Stressbelastung, Stresssymptomen und Stressbewältigungs-Strategien (Coping)
version = include(VERSION)
type = patient

[description]
Das SCI ist ein wissenschaftliches Fragebogen-Instrument zur zuverlässigen Messung von Stressbelastung, Stresssymptomen und Stressbewältigungs-Strategien (Coping). Alle Skalen erreichen überzeugende psychometrische Kennwerte. Eine detaillierte Faktorenanalyse konnte zudem die Annahme von fünf unterschiedlichen Coping-Strategien bestätigen. Weitere Untersuchungen lieferten überzeugende Belege für die Aussagekraft der Skalen. So zeigte sich, dass Personen, die unter viel Stress leiden aber trotzdem nur wenige Folgesymptome aufweisen, mehr adaptive Coping-Strategien einsetzen.


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
id = SCI
type = lime
responsibility = patient_via_assessment
name = Stress- & Coping-Inventar
host = default
survey_id = 933257
hash = X36X990
pid = X36X991
fid = X36X992
min_questions =
min_lastpage = 2

[event activation]
type = on_activation
time = 08:00
due_after = 259200
overdue = ignore
description = Eintritt: Messung von Stressbelastung, Stresssymptomen und Stressbewältigungs-Strategien (Coping)
survey = SCI

[event activation]
type = before_exit
days = 7
time = 08:00
due_after = 259200
overdue = ignore
description = Austritt: Messung von Stressbelastung, Stresssymptomen und Stressbewältigungs-Strategien (Coping)
survey = SCI


