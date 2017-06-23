[module]
id = ch.forel.apps.actinfo_aus
name = ActInfo | Austritt
short_description = actInfo Austrittsfragebogen: Sonderversion für den stationären Alkohol- und Medikamentenbereich.
version = include(VERSION)
type = patient

[description]
act-info (addiction, care and therapy information) Austrittsversion

act-info (addiction, care and therapy information) ist ein einheitliches, gesamtschweizerisches Klientenmonitoringsystem für den Bereich der Suchthilfe. Themenbereiche: Behandlung/Nachsorge, soziodemografische Angaben, Problemsubstanzen, Psychisches Befinden

[developer]
first_name = Hans
last_name = Menning
github_user = HansaYohaku
email = hans.menning@psychologie.ch
company = Optinomic Gmbh
phone = +41 (0)78 636 64 64
website = https://www.forel-klinik.ch/

[readme]
include(readme.md)


[template score 6 6]
include(templates/score.html)

[template data_download_admin 6 10]
include(templates/download.html)


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
survey_id = 116413
hash = X98X2558
pid = X98X2500
fid = X98X2433
min_questions =
min_lastpage = 3


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
