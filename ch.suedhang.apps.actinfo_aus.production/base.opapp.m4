[module]
id = ch.suedhang.apps.actinfo_aus.production
name = ActInfo | Austritt
parent = ch.suedhang.apps.actinfo_aus
short_description = Sonderversion für den stationären Alkohol- und Medikamentenbereich.
version = include(VERSION)
type = patient

[description]

[developer]
first_name = Nora
last_name = Schönenberger
github_user = schoenenb
email = nora.schoenenberger@suedhang.ch
company = Suedhang
phone = +41 (0)31 828 14 92
website = http://suedhang.ch/

[template ActInfo 6 35]
include(../lib/polymer/index.m4)
include(../ch.suedhang.apps.actinfo_ein/elements/actinfo-problemsubstanzen.html)
include(../ch.suedhang.apps.actinfo_ein/elements/element-actinfo.html)
include(../ch.suedhang.apps.actinfo_ein.production/elements/view.html)

[readme]
include(readme.md)

[dependencies]


[survey]
id = actinfo_austritt
type = lime
responsibility = Admin
name = actInfo - Austritt
host = limesurvey_v2
survey_id = 116413
hash = X19X703
pid = X19X645
fid = X19X578
min_questions =
min_lastpage = 5

[event exit]
type = before_exit
time = 08:00
days = 10
due_after = 129200
overdue = ignore
description = actInfo - Austritt
survey = actinfo_austritt


[sql_init]
include(includes/create_view_production.sql)

