[module]
id = ch.suedhang.apps.bscl_anq.production
name = BSCL (ANQ)
parent = ch.suedhang.apps.bscl_anq
short_description = Erfassung subjektiver Beeinträchtigung durch körperliche und psychische Symptome.
version = include(VERSION)
type = patient

[description]
Die „Brief Symptom Checklist“ (BSCL) ist die Kurzform der SCL-90. Es handelt sich bei der BSCL um eine deutschsprachige Übersetzung von G.H. Franke, deren Ursprung in dem amerikanischen „Brief Symptom Inventory“ (BSI) von L.R. Derogatis (1975) zu finden ist.

Es handelt sich bei den 53 Items der BSCL um die fünf bis sechs ladungsstärksten Items pro Skala aus der 90 Items umfassenden SCL-90. Die Urheber- und Markenrechte an der BSCL liegen beim Hogrefe Verlag.

[developer]
first_name = Nora
last_name = Schönenberger
github_user = schoenenb
email = nora.schoenenberger@suedhang.ch
company = Suedhang
phone = +41 (0)31 828 14 92
website = http://suedhang.ch/de/

[dependencies]

[survey]
id = bscl_anq
type = lime
responsibility = patient_via_assessment
name = BSCL (Brief Symptom Check List)
host = limesurvey_v2
survey_id = 366636
hash = X36X1188
pid = X36X1183
fid = X36X1187
min_questions =
min_lastpage = 2

[survey]
id = bscl_admin
type = lime
responsibility = Admin
name = BSCL - Admin
host = limesurvey_v2
survey_id = 264947
hash = X81X2070
pid = X81X2065
fid = X81X2069
min_questions =
min_lastpage = 2


[event activation]
type = on_activation
time = 08:00
due_after = 259200
overdue = ignore
description = BSCL - Eintritt
survey = bscl_anq

[event exit]
type = before_exit
days = 10
time = 08:00
due_after = 259200
overdue = ignore
description = BSCL - Austritt
survey = bscl_anq

[sql_init]
include(includes/create_view_production.sql)


