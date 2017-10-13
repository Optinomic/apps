[module]
id = ch.suedhang.apps.tmt.production
name = Trail Making Test (TMT)
short_description = Die psychomotorische Geschwindigkeit (TMT A) und kognitive Flexibilität (TMT B) werden erfasst.
parent = ch.suedhang.apps.tmt_V3
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
website = http://suedhang.ch/de/Forschung

[readme]
include(readme.md)

[dependencies]


[survey]
id = tmt_ng
type = ng
responsibility = Admin
name = Trail Making Test (TMT)
host = default


[survey_markup tmt_ng]
include(survey_markups/tmt_survey.html)


[event activation]
type = on_activation
due_after = 259200
overdue = ignore
description = TMT-Erfassung Eintritt
survey = tmt_ng

[event exit]
type = before_exit
days = 5
time = 08:00
due_after = 259200
overdue = ignore
description = TMT-Erfassung Austritt
survey = tmt_ng