[module]
id = ch.suedhang.apps.aase-g
name = AASE-G
short_description = Versuchung in spezifischen Situationen
version = include(VERSION)
type = patient

[description]

[developer]
first_name = Beat
last_name = Ottiger
github_user = ottigerb
email = beat@optinomic.com
company = Optinomic Gmbh
phone = +41 (0)44 508 26 76
website = http://www.optinomic.com/


[template AASE 6 12]
include(../lib/polymer/index.m4)
include(elements/element-aase.html)
include(elements/view.html)



[readme]
include(readme.md)


[dependencies]


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
