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



[template simple_score 4 4]
include(templates/score.html)

[template data_export_admin 6 7]
include(templates/export.html)


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
min_lastpage = 1


[calculation case_score javascript]
include(calculations/case_score.js)
