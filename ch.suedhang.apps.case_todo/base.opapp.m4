[module]
id = ch.suedhang.apps.case
name = CASE
short_description = Checkliste zur Abschätzung der Schwere einer Alkoholabhängigkeit (CASE)  und Behandlungsindikation
version = include(VERSION)
type = patient

[description]
Checkliste zur Abschätzung der Schwere einer Alkoholabhängigkeit (CASE)  und Behandlungsindikation. Ab 15 Punkten ist eine stationäre Therapie indiziert.

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
id = CASE
type = lime
responsibility = lead_therapist
name = CASE
host = default
survey_id = 553966
hash = X22X876
pid = X22X877
fid = X22X878
pidfid = X114X2861
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


[event]
type = on_activation
due_after = 259200
overdue = ignore
description = CASE-Erhebung
survey = CASE


[email new_event html]
include(emails/new_event.html)

[email overdue html]
include(emails/overdue.html)


[calculation case_score javascript]
include(calculations/case_score.js)


