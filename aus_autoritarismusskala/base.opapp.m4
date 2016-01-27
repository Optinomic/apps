[module]
id = com.optinomic.apps.aus
name = Autoritarismusskala (AUS)
short_description = Den Glauben an Autoritäten und die Neigung zu autoritärer Unterordnung erfassen. 
version = include(VERSION)
type = patient

[description]
Selbstbeurteilungsskala mit sieben Items zur Erfassung des Autoritarismus. Die AUS kann bei Probanden ab 12 Jahre eingesetzt werden (Goch, 1997). Mit der sieben Items umfassenden Autoritarismusskala ist die Konstruktion eines homogenen und ökonomischen Forschungsinstrumentes gelungen, welches gleichermaßen in verschiedenen Kulturen (Westdeutschland, Ostdeutschland, Spanien, USA) zur Messung des Autoritarismus geeignet ist (Dalbert, 1996).

[developer]
first_name = Beat
last_name = Ottiger
github_user = ottigerb
email = beat@optinomic.com
company = Optinomic Gmbh
phone = +41 (0)44 508 26 76
website = http://www.optinomic.com/


[template aus_result 6 7]
include(templates/aus.html)


[template aus_survey_responses 6 7]
include(templates/data.html)


[javascript]
include(../lib/js/optinomic/data_module/optinomic_app_api.m4)
include(main.js)


[css]
include(../lib/css/set/optinomic_material_bootstrap.m4)
include(style.css)



[survey]
id = aus_survey
type = ng
responsibility = patient_via_email
name = Selbstbeurteilungsskala: Autoritarismusskala (AUS)
host = default

[survey_markup aus_survey]
include(survey_markups/aus_survey.html)

[event]
type = on_activation
time = 08:00
due_after = 86400
overdue = ignore
description = Event: Die Autoritarismusskala (AUS)
survey = aus_survey


[email new_event html]
include(emails/new_event.html)

[email overdue html]
include(emails/overdue.html)


[calculation aus_calculation javascript]
include(calculations/aus.js)


