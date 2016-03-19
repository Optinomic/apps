[module]
id = ch.suedhang.apps.aase
name = AASE-G
short_description = Erfassung der Abstinenzzuversicht
version = include(VERSION)
type = patient

[description]
Potenzial einer Person auf den Alkoholkonsum verzichten zu können.

[developer]
first_name = Beat
last_name = Ottiger
github_user = ottigerb
email = beat@optinomic.com
company = Optinomic Gmbh
phone = +41 (0)44 508 26 76
website = http://www.optinomic.com/


[template data_survey_responses 6 7]
include(templates/data.html)

[template chart_timeline 6 7]
include(templates/chart_timeline.html)

[template simple_score 4 4]
include(templates/score.html)

[template data_download 6 14]
include(templates/download.html)


[dependencies]
\\ Abrechnung = S && Abteilung = 2

[javascript]
include(../lib/js/optinomic/data_module/optinomic_app_api.m4)
include(main.js)


[css]
include(../lib/css/set/optinomic_material_bootstrap.m4)
include(style.css)

[survey]
id = aase
type = lime
responsibility = lead_therapist
name = Alcohol Abstinence Self-Efficacy Scale (AASE)
host = default
survey_id = 526942
hash = X4X64
pid = X4X65
fid = X113X2858
min_questions =
min_lastpage = 2

[survey_markup my_ng_survey]
include(survey_markups/my_ng_survey.html)

[event activation]
type = on_activation
time = 12:00
due_after = 259200
overdue = ignore
description = Einschätzung der aktuellen Abstinenzzuversicht
survey = aase

[event exit]
type = before_exit
days = 3
time = 12:00
due_after = 259200
overdue = ignore
description = Einschätzung der aktuellen Abstinenzzuversicht
survey = aase

[email new_event html]
include(emails/new_event.html)

[email overdue html]
include(emails/overdue.html)


[calculation aase_score javascript]
include(calculations/aase_score.js)
