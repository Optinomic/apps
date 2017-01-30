[module]
id = ch.suedhang.apps.aase-g
name = AASE-G V2
short_description = Versuchung - Erfassung der Versuchung in spezifischen Situationen die Hauptproblemsubstanz zu konsumieren
version = include(VERSION)
type = patient

[description]
Einschätzung von 20 Situationen auf ihre Versuchung, die Hauptproblemsubstanz zu konsumieren. Die Skala wurde ursprünglich für Alkoholabhängige konzipiert.
0 Punkte entsprechen keiner Versuchung, eine maximale Versuchung liegt bei 80 (allgemeiner Summenwert) respektive 4 (Subskalen) Punkten vor.

[developer]
first_name = Beat
last_name = Ottiger
github_user = ottigerb
email = beat@optinomic.com
company = Optinomic Gmbh
phone = +41 (0)44 508 26 76
website = http://www.optinomic.com/


[template score 4 6]
include(templates/score_scales.html)


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

[event exit]
type = before_exit
days = 7
time = 08:00
due_after = 86400
overdue = ignore
description = AASE-G ausfüllen.
survey = aase


[calculation another_calculation javascript]
include(calculations/another_calculation.js)

[sql_init]
include(includes/create_view.sql)
