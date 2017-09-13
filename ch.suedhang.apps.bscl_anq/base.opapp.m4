[module]
id = ch.suedhang.apps.bscl_anq
name = BSCL (ANQ)
short_description = Erfassung subjektiver Beeinträchtigung durch körperliche und psychische Symptome.
version = include(VERSION)
type = patient

[description]
Die „Brief Symptom Checklist“ (BSCL) ist die Kurzform der SCL-90. Es handelt sich bei der BSCL um eine deutschsprachige Übersetzung von G.H. Franke, deren Ursprung in dem amerikanischen „Brief Symptom Inventory“ (BSI) von L.R. Derogatis (1975) zu finden ist.

Es handelt sich bei den 53 Items der BSCL um die fünf bis sechs ladungsstärksten Items pro Skala aus der 90 Items umfassenden SCL-90. Die Urheber- und Markenrechte an der BSCL liegen beim Hogrefe Verlag.

[developer]
first_name = Beat
last_name = Ottiger
github_user = ottigerb
email = beat@optinomic.com
company = Optinomic Gmbh
phone = +41 (0)44 508 26 76
website = http://www.optinomic.com/

[readme]
include(readme.md)

[template z_scores 6 10]
include(templates/score_page.html)



[javascript]
include(../lib/js/optinomic/data_module/optinomic_app_api.m4)
include(main.js)


[css]
include(../lib/css/set/optinomic_material_bootstrap.m4)
include(style.css)



[survey]
id = bscl_anq
type = lime
responsibility = patient_via_assessment
name = BSCL - ANQ
host = default
survey_id = 693172
hash = X6X78
pid = X6X73
fid = X6X77
min_questions =
min_lastpage = 2


[event activation]
type = on_activation
time = 08:00
due_after = 86400
overdue = ignore
description = BSCL - ANQ
survey = bscl_anq

[event exit]
type = before_exit
days = 7
time = 08:00
due_after = 86400
overdue = ignore
description = BSCL - ANQ
survey = bscl_anq


[calculation scores_calculation javascript]
include(calculations/bscl_patient_calc.js)

