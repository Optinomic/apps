[module]
id = com.optinomic.apps.dass
name = Die Depressions-Angst-Stress-Skalen (DASS)
short_description = Screening auf Depressivität, Angst und Stress.
version = include(VERSION)
type = patient

[description]
Im neuen Schmerzfragebogen der Deutschen Schmerzgesellschaft (früher: DGSS) ist der DASS als Depressionstest enthalten (Lovibond & Lovibond, 1995; Nilges, & Essau, 2015) Das Verfahren enthält 21 Fragen, mit jeweils 7 Items werden Depressivität sowie Angst und zusätzlich mit einer dritten, ebenfalls aus sieben Items bestehenden Skala Stressbelastung erfasst. Der Fragebogen ist in mehr als 25 Sprachen übersetzt und ist lizenzfrei verwendbar (public domain). 

[developer]
first_name = Beat
last_name = Ottiger
github_user = ottigerb
email = beat@optinomic.com
company = Optinomic Gmbh
phone = +41 (0)44 508 26 76
website = http://www.optinomic.com/


http://survey.demo.optinomic.org//surveys/6bb35ef1-8aa6-43cb-a094-7c0de9f2d24d
http://survey.demo.optinomic.org//surveys/7f2906d3-3af1-4367-b497-6c88f9504783



[template data_survey_responses 6 7]
include(templates/data.html)


[javascript]
include(../lib/js/optinomic/data_module/optinomic_app_api.m4)
include(main.js)


[css]
include(../lib/css/set/optinomic_material_bootstrap.m4)
include(style.css)



[survey]
id = dass_survey
type = ng
responsibility = lead_therapist_and_deputy
name = Fragebogen: Die Depressions-AngstStress-Skalen (DASS)
host = default

[survey_markup dass_survey]
include(survey_markups/dass_survey.html)

[event]
type = on_activation
time = 08:00
due_after = 86400
overdue = ignore
description = Event: Die Depressions-AngstStress-Skalen (DASS)
survey = dass_survey


[email new_event html]
include(emails/new_event.html)

[email overdue html]
include(emails/overdue.html)


[calculation dass_calculation javascript]
include(calculations/dass.js)


