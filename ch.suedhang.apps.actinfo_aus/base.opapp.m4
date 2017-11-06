[module]
id = ch.suedhang.apps.actinfo_aus
name = ActInfo | Austritt
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



[template ActInfo 6 35]
include(../lib/polymer/index.m4)
include(../ch.suedhang.apps.actinfo_ein/elements/actinfo-problemsubstanzen.html)
include(../ch.suedhang.apps.actinfo_ein/elements/element-actinfo.html)
include(../ch.suedhang.apps.actinfo_ein/elements/view.html)

[readme]
include(readme.md)

[dependencies]

[javascript]


[css]


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
include(calculations/actinfo_aus_calc.js)


[sql_init]
include(includes/create_view.sql)


