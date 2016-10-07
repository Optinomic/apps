[module]
id = ch.suedhang.apps.aase-g
name = AASE-G V2
short_description = Abstinenzzuversicht - Schwierigkeit der Hauptproblemsubstanz zu widerstehen
version = include(VERSION)
type = patient

[description]
Einschätzung von 20 Situationen auf ihre Versuchung bzw. der Zuversicht, der Hauptproblemsubstanz widerstehen zu können.

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
id = aase
type = lime
responsibility = patient_via_assessment
name = Alcohol Abstinence Self-Efficacy Scale (AASE)
host = default
survey_id = 526942
hash = X34X410
pid = X34X411
fid = X34X412
min_questions =
min_lastpage = 2


[event activation]
type = on_activation
time = 08:00
due_after = 86400
overdue = ignore
description = AASE-G ausfüllen.
survey = aase

[event activation]
type = before_exit
days = 7
due_after = 86400
overdue = ignore
description = AASE-G ausfüllen.
survey = aase


[calculation another_calculation javascript]
include(calculations/another_calculation.js)
