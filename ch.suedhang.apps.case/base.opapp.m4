[module]
id = ch.suedhang.apps.caseV2
name = Optinomic-App (Template)
short_description = Use this as a starting-point for your apps.
version = include(VERSION)
type = patient

[description]
Mit Apps werden Computerprogramme bezeichnet, die genutzt werden, um eine nützliche oder gewünschte nicht systemtechnische Funktionalität zu bearbeiten oder zu unterstützen, das heißt sie dienen der „Lösung von Benutzerproblemen“.

[developer]
first_name = Beat
last_name = Ottiger
github_user = ottigerb
email = beat@optinomic.com
company = Optinomic Gmbh
phone = +41 (0)44 508 26 76
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
min_lastpage = 2


[event daily]
type = on_activation
due_after = 129200
overdue = ignore
description = Track your something.
survey = CASE


[email new_event html]
include(emails/new_event.html)

[email overdue html]
include(emails/overdue.html)


[calculation another_calculation javascript]
include(calculations/another_calculation.js)
