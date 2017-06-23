[module]
id = ch.forel.apps.zuepaz
name = ZüPaZ - Version Forel
short_description = Zürcher Patientenzufriedenheit Fragebogen mit spezifischen Anpassungen für die Forel-Klinik 
version = include(VERSION)
type = patient

[description]
Hier wird die Zufriedenheit der Patienten mit der Behandlung in der Forel-Klinik erfragt - vom Eintritt bis zum Austritt, in den Bereichen Hotellerie, Informationsfluss, Therapieangebote und Behandlung durch das (therapeutische) Personal.

[developer]
first_name = Hans
last_name = Menning
github_user = HansaYohaku
email = hans.menning@forel-klinik.ch
company = Forel-Klinik
phone = +41 (0)52 369 14 12
website = https://www.forel-klinik.ch/

[readme]
include(readme.md)


[template ZuePaZ 6 14]
include(templates/score.html)

[dependencies]

[javascript]
include(../lib/js/optinomic/data_module/optinomic_app_api.m4)
include(main.js)

[css]
include(../lib/css/set/optinomic_material_bootstrap.m4)
include(style.css)

[survey]
id = ZuePaZ_Forel
type = lime
responsibility = lead_therapist
name = Zuepaz
host = default
survey_id = 743827
hash = X39X464
pid = X39X465
fid = X39X466
min_questions =
min_lastpage = 4

[event exit]
responsibility = lead_therapist
type = before_exit
days = 7
time = 07:00
due_after = 604800
overdue = ignore
description = Erfassung der Patientenzufriedenheit
survey = ZuePaZ_Forel

[email new_event html]
include(emails/new_event.html)

[email overdue html]
include(emails/overdue.html)

[calculation another_calculation javascript]
include(calculations/another_calculation.js)
