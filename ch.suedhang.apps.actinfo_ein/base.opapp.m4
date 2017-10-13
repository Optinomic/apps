[module]
id = ch.suedhang.apps.actinfo_ein
name = ActInfo | Eintritt
short_description = Sonderversion für den stationären Alkohol- und Medikamentenbereich.
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



[template score 6 6]
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
id = actinfo_eintritt
type = lime
responsibility = lead_therapist
name = actInfo - Eintritt
host = default
survey_id = 275667
hash = X48X652
pid = X48X646
fid = X48X645
min_questions =
min_lastpage = 5


[event activation]
type = on_activation
time = 8:00
due_after = 259200
overdue = ignore
description = actInfo - Eintritt
survey = actinfo_eintritt


[email new_event html]
include(emails/new_event.html)

[email overdue html]
include(emails/overdue.html)


[calculation actinfo_ein javascript]
include(calculations/actinfo_ein_calc.js)


[sql_init]
include(includes/create_view.sql)




