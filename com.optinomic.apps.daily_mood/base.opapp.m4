[module]
id = com.optinomic.apps.daily_mood
name = Tagliche Stimmung
short_description = Stimmungsverlauf.
version = include(VERSION)
type = patient

[description]
Stimmungsverlauf der täglichen Stimmung. Ein einfacher aber effektiver Kennwert.

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

[template daily_mood_timeline 6 4]
include(templates/mood_timeline.html)

[template survey_responses 6 8]
include(templates/data.html)

[template download_admin 6 8]
include(templates/export.html)


[javascript]
include(../lib/js/optinomic/data_module/optinomic_app_api.m4)
include(main.js)


[css]
include(../lib/css/set/optinomic_material_bootstrap.m4)
include(style.css)



[survey]
id = daily_mood_survey
type = ng
responsibility = patient_via_email
name = Selbstbeurteilung: Tägliche Stimmung
host = default

[survey_markup daily_mood_survey]
include(survey_markups/daily_mood_survey.html)

[event Morgen]
type = daily
time = 08:00
due_after = 7200
overdue = send_reminder_once
description = Morgen: Aktuelle Stimmung
survey = daily_mood_survey

[event Mittag]
type = daily
time = 12:00
due_after = 7200
overdue = send_reminder_once
description = Mittag: Aktuelle Stimmung
survey = daily_mood_survey

[event Abend]
type = daily
time = 19:00
due_after = 7200
overdue = send_reminder_once
description = Abend: Aktuelle Stimmung
survey = daily_mood_survey


[email new_event html]
include(emails/new_event.html)

[email overdue html]
include(emails/overdue.html)


