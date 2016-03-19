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
phone = +41 (0)31 828 14 51
website = http://www.optinomic.com/



[template data_survey_responses 6 7]
include(templates/data.html)

[template chart_timeline 6 7]
include(templates/chart_timeline.html)

[template simple_score 4 4]
include(templates/score.html)

[template score_range 2 4]
include(templates/range.html)

[template chart_tscore 6 9]
include(templates/tscore.html)

[template chart_stanine 6 7]
include(templates/stanine.html)

[template data_download 6 14]
include(templates/download.html)


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
name = Tägliche Stimmung
host = default
survey_id = 123983
hash = X32X913
pid = X32X914
fid = X32X915
min_questions =
min_lastpage = 2


[survey]
id = my_ng_survey
type = ng
responsibility = patient_via_email
name = Second example survey
host = default

[survey_markup my_ng_survey]
include(survey_markups/my_ng_survey.html)


[event activation]
type = on_activation
due_after = 86400
overdue = ignore
description = Track your daily craving.
survey = assessment


[email new_event html]
include(emails/new_event.html)

[email overdue html]
include(emails/overdue.html)


[calculation another_calculation javascript]
include(calculations/another_calculation.js)
