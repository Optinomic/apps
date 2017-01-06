[module]
id = ch.suedhang.apps.neuroanamnese.production
name = Neuroanamnese Einzelassessment
parent = ch.suedhang.apps.neuroanamnese
short_description = Erhebung relevanter Faktoren für die Normierung der TMT-Referenzstichprobe bei Alkoholabhängigen
version = include(VERSION)
type = patient

[description]
Da die Leistung im TMT durch diverse Einflüsse verändert oder gar vermindert sein kann, werden diese Einflüsse hier abgefragt. Dazu wird eine zusätzliche Erhebung zu Konsum, -dauer & -menge jeglicher psychotroper Substanzen in den vergangenen 30 Tagen bzw. während des stationären Aufenthaltes, zur Medikation, klinischen Befunden und einer medizinischen Anamnese durchgeführt.

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
id = assessment
type = lime
responsibility = Admin
name = Neuroanamnese
host = limesurvey_v2
survey_id = 123983
hash = X30X1109
pid = X30X1110
fid = X30X1111
min_questions =
min_lastpage = 7