[module]
id = ch.suedhang.apps.case.new
name = CASE
short_description = Checkliste zur Abschätzung der Schwere einer Alkoholabhängigkeit (CASE) und Behandlungsindikation
version = include(VERSION)
type = patient

[description]
Checkliste zur Abschätzung der Schwere einer Alkoholabhängigkeit (CASE) und Behandlungsindikation. Ab 15 Punkten ist eine stationäre Therapie indiziert. 

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

[readme]
include(readme.md)

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
hash = X62X1245
pid = X62X1246
fid = X62X1247
min_questions =
min_lastpage = 2


[event daily]
type = on_activation
due_after = 345600
overdue = ignore
description = Alkoholabhängigkeit (CASE) und Behandlungsindikation.
survey = CASE


[email new_event html]
include(emails/new_event.html)

[email overdue html]
include(emails/overdue.html)


[calculation another_calculation javascript]
include(calculations/another_calculation.js)


[sql_init]
include(includes/create_view.sql)

