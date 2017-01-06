[module]
id = ch.suedhang.apps.case.production
name = CASE
parent = ch.suedhang.apps.case.new
short_description = Checkliste zur Abschätzung der Schwere einer Alkoholabhängigkeit (CASE)  und Behandlungsindikation
version = include(VERSION)
type = patient

[description]
Checkliste zur Abschätzung der Schwere einer Alkoholabhängigkeit (CASE)  und Behandlungsindikation. Ab 15 Punkten ist eine stationäre Therapie indiziert. 

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
id = CASE
type = lime
responsibility = Admin
name = CASE
host = limesurvey_v2
survey_id = 553966
hash = X38X1262
pid = X38X1263
fid = X38X1264
min_questions =
min_lastpage = 2


