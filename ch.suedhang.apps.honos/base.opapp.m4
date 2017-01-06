[module]
id = ch.suedhang.apps.honos
name = HoNOS
short_description = Health of the nation outcomes scales (HoNOS).
version = include(VERSION)
type = patient

[description]
Gesundheit und soziale Funktionsfähigkeit, 12 Items.

[developer]
first_name = Beat
last_name = Ottiger
github_user = ottigerb
email = beat@optinomic.com
company = Optinomic Gmbh
phone = +41 (0)44 508 26 76
website = http://www.optinomic.com/

[template scores_table 6 6]
include(templates/table.html)



[dependencies]

[javascript]
include(../lib/js/optinomic/data_module/optinomic_app_api.m4)
include(main.js)


[css]
include(../lib/css/set/optinomic_material_bootstrap.m4)
include(style.css)

[survey]
id = HoNOS
type = lime
responsibility = Admin
name = HoNOS
host = default
survey_id = 927351
hash = X24X325
pid = X24X326
fid = X24X327
min_questions =
min_lastpage = 2

[survey]
id = HoNOS_Verlauf
type = lime
responsibility = Admin
name = HoNOS Verlauf
host = default
survey_id = 912771
hash = X120X3482
pid = X120X3483
fid = X120X3484
min_questions =
min_lastpage = 2

[event activation]
type = on_activation
due_after = 259200
overdue = send_reminder_once
description = HoNOS Eintritt
survey = HoNOS

[event before_exit]
type = before_exit
days = 3
time = 00:00
due_after = 259200
overdue = send_reminder_once
description = HoNOS Austritt
survey = HoNOS


[email new_event html]
include(emails/new_event.html)

[email overdue html]
include(emails/overdue.html)


[sql_init]
include(includes/create_view.sql)

[calculation honos_calculation javascript]
include(calculations/honos.js)


