[module]
id = ch.suedhang.apps.tmt_V3
name = Trail Making Test (TMT)
short_description = Die psychomotorische Geschwindigkeit (TMT A) und kognitive Flexibilität (TMT B) werden erfasst.
version = include(VERSION)
type = patient

[description]

[developer]
first_name = Beat
last_name = Ottiger
github_user = ottigerb
email = beat@optinomic.com
company = Optinomic Gmbh
phone = +41 (0)44 508 26 76
website = http://www.optinomic.com/


[template TMT 6 12]
include(../lib/polymer/index.m4)
include(elements/element-tmt.html)
include(elements/view.html)


[readme]
include(readme.md)

[dependencies]


[survey]
id = tmt_ng
type = ng
responsibility = lead_therapist
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

[email new_event html]
include(emails/new_event.html)

[email overdue html]
include(emails/overdue.html)


[calculation tmt_score javascript]
include(calculations/tmt_score.js)

