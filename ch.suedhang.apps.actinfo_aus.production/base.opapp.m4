[module]
id = ch.suedhang.apps.actinfo_aus.production
name = ActInfo | Austritt
parent = ch.suedhang.apps.actinfo_aus
short_description = actInfo Austrittsfragebogen: Sonderversion für den stationären Alkohol- und Medikamentenbereich.
version = include(VERSION)
type = patient

[description]
act-info (addiction, care and therapy information) Austrittsversion
Themenbereiche: Behandlung/Nachsorge, soziodemografische Angaben, Problemsubstanzen, Psychisches Befinden

[developer]
first_name = Nora
last_name = Schönenberger
github_user = schoenenb
email = nora.schoenenberger@suedhang.ch
company = Suedhang
phone = +41 (0)31 828 14 92
website = http://suedhang.ch/

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

[sql_init]
include(includes/create_view_production.sql)

