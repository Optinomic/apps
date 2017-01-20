[module]
id = ch.suedhang.apps.neuroanamnese
name = Neuroanamnese Einzelassessment
short_description = Erhebung relevanter Faktoren für die Normierung der TMT-Referenzstichprobe bei Alkoholabhängigen
version = include(VERSION)
type = patient

[description]
Da die Leistung im TMT durch diverse Einflüsse verändert oder gar vermindert sein kann, werden diese Einflüsse hier abgefragt. Dazu wird eine zusätzliche Erhebung zu Konsum, -dauer & -menge jeglicher psychotroper Substanzen in den vergangenen 30 Tagen bzw. während des stationären Aufenthaltes, zur Medikation, klinischen Befunden und einer medizinischen Anamnese durchgeführt.

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


[dependencies]

[javascript]
include(../lib/js/optinomic/data_module/optinomic_app_api.m4)
include(main.js)


[css]
include(../lib/css/set/optinomic_material_bootstrap.m4)
include(style.css)

[survey]
id = assessment
type = lime
responsibility = lead_therapist
name = Neuroanamnese
host = default
survey_id = 123983
hash = X59X1182
pid = X59X1183
fid = X59X1184
min_questions =
min_lastpage = 7


[event activation]
type = on_activation
due_after = 345600
overdue = ignore
description = Neuroanamnese zum TMT
survey = assessment


[email new_event html]
include(emails/new_event.html)

[email overdue html]
include(emails/overdue.html)


[calculation another_calculation javascript]
include(calculations/another_calculation.js)
