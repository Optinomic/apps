[module]
id = ch.suedhang.apps.isk
name = ISK Südhang
short_description = Inventar Sozialer Kompetenzen - Kurzform.
version = include(VERSION)
type = patient

[description]
Das Inventar Sozialer Kompetenzen (Kurzversion) erfasst in 33 Aussagen persönliche Verhaltensweisen und Gewohnheiten zu den vier Bereichen: Soziale Orientierung, Offensivität, Selbststeuerung und Reflexibilität. Soziale Kompetenzen sind für unser Funktionieren in der Gesellschaft notwendig. Sind sie zu sehr auf einen selber oder zu sehr auf die Gesellschaft ausgerichtet, dann funktioniert das Zusammenspiel nicht. Mittlere Ausprägungen, welche beide Aspekte berücksichtigen sind daher am günstigsten.

[developer]
first_name = Beat
last_name = Ottiger
github_user = ottigerb
email = beat@optinomic.com
company = Optinomic Gmbh
phone = +41 (0)44 508 26 76
website = http://www.optinomic.com/


[template z_scores 6 20]
include(templates/score_page.html)


[dependencies]

[javascript]
include(../lib/js/optinomic/data_module/optinomic_app_api.m4)
include(main.js)


[css]
include(../lib/css/set/optinomic_material_bootstrap.m4)
include(style.css)

[survey]
id = isk
type = lime
responsibility = patient_via_assessment
name = Inventar Sozialer Kompetenzen
host = limesurvey_v2
survey_id = 824558
hash = X28X343
pid = X28X344
fid = X28X345
min_questions =
min_lastpage = 2


[event activation]
type = on_activation
time = 08:00
due_after = 86400
overdue = ignore
description = Schätzen Sie Ihre persönlichen Verhaltensweisen und Gewohnheiten im Umgang mit anderen Personen ein.
survey = isk

[event activation]
type = before_exit
days = 7
time = 08:00
due_after = 86400
overdue = ignore
description = Schätzen Sie Ihre persönlichen Verhaltensweisen und Gewohnheiten im Umgang mit anderen Personen ein.
survey = isk



[calculation scores_calculation javascript]
include(calculations/isk_patient_calc.js)

[sql_init]
include(includes/create_view.sql)
