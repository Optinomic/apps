[module]
id = ch.suedhang.apps.tmt_V3
name = TMT Südhang | V3
short_description = Trail Making Test (TMT)
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
website = http://www.optinomic.com/



[template simple_score 4 4]
include(templates/score.html)

[template export_toolbox_admin 6 10]
include(templates/download.html)


[dependencies]

[javascript]
include(../lib/js/optinomic/data_module/optinomic_app_api.m4)
include(main.js)


[css]
include(../lib/css/set/optinomic_material_bootstrap.m4)
include(style.css)

[survey]
id = tmt
type = lime
responsibility = lead_therapist
name = Trail Making Test (TMT)
host = default
survey_id = 581952
hash = X43X482
pid = X43X483
fid = X43X484
min_questions =
min_lastpage = 3


[event activation]
type = on_activation
due_after = 259200
overdue = ignore
description = TMT-Erfassung
survey = tmt


[email new_event html]
include(emails/new_event.html)

[email overdue html]
include(emails/overdue.html)


[calculation tmt_score javascript]
include(calculations/tmt_score.js)
