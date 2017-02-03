[module]
id = ch.suedhang.apps.tmt.production
name = Trail Making Test (TMT)
short_description = Visuelles Scannen, psychomotorische Geschwindigkeit und Leistung der exekutiven Funktionen.
parent = ch.suedhang.apps.tmt_V3
version = include(VERSION)
type = patient

[description]
Mit dem TMT wird die Fähigkeit zum visuellen Scannen erfasst, sowie die psychomotorische Geschwindigkeit (Trail Making Test A) und Leistungen der exekutiven Funktionen (insbesondere kognitive Flexibilität und Switching, Trail Making Test B). Der Quotient B /A stellt das 'reine' Maß der im Trail Making Test B erhobenen exekutiven Funktionen dar und ist unabhängig von einer evtl. vorliegenden Verlangsamung. Normwerte sind für letzteren Kennwert nur für Personen ≥ 50-jährig verfügbar.  Faustregel: ein  B/A-Quotient > 2.5 gilt als Hinweis für eine auffällige Testleistung.


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
id = tmt_ng
type = ng
responsibility = Admin
name = Trail Making Test (TMT)
host = default


[survey_markup tmt_ng]
include(survey_markups/tmt_survey.html)


[event activation]
type = on_activation
due_after = 259200
overdue = ignore
description = TMT-Erfassung
survey = tmt_ng

[event exit]
type = before_exit
days = 5
time = 08:00
due_after = 259200
overdue = ignore
description = TMT-Erfassung
survey = tmt_ng


[sql_init]
include(includes/create_view.sql)