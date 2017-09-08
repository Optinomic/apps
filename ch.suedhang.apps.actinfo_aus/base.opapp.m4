[module]
id = ch.suedhang.apps.actinfo_aus
name = ActInfo | Austritt
short_description = actInfo Austrittsfragebogen: Sonderversion für den stationären Alkohol- und Medikamentenbereich.
version = include(VERSION)
type = patient

[description]
act-info (addiction, care and therapy information) Austrittsversion
Themenbereiche: Behandlung/Nachsorge, soziodemografische Angaben, Problemsubstanzen, Psychisches Befinden | Correct Survey


[developer]
first_name = Beat
last_name = Ottiger
github_user = ottigerb
email = beat@optinomic.com
company = Optinomic Gmbh
phone = +41 (0)44 508 26 76
website = http://www.optinomic.com/



[template score 6 6]
include(templates/relapsesubstanzen.html)

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
id = actinfo_austritt
type = lime
responsibility = lead_therapist
name = actInfo - Austritt
host = default
survey_id = 469455
hash = X110X3259
pid = X110X3201
fid = X110X3200
min_questions =
min_lastpage = 5


[event exit]
type = before_exit
time = 08:00
days = 8
due_after = 129200
overdue = ignore
description = actInfo - Austritt
survey = actinfo_austritt


[email new_event html]
include(emails/new_event.html)

[email overdue html]
include(emails/overdue.html)


[calculation another_calculation javascript]
include(calculations/another_calculation.js)


[sql_init]
include(includes/create_view.sql)


