[module]
id = com.optinomic.apps.schlaftagebuch
name = Schlaftagebuch
short_description = Schlafstörung (Insomnie) zu erkennen sowie den Verlauf und Erfolg einer Therapie zu kontrollieren.
version = include(VERSION)
type = patient

[description]
Schlaftagebücher (bzw. sog. Schlafprotokolle) sind eines der wichtigsten "Instrumente", wenn es darum geht, die Ursachen einer Schlafstörung (Insomnie) zu erkennen. Auch um den Verlauf und Erfolg einer Therapie zu kontrollieren, sind sie unverzichtbar. Das Schlaftagebucher selber sollte der Patient mindestens 14 Tage lang jeden Tag jeweils am Abend unmittelbar vor dem Zubettgehen und am Morgen, unmittelbar nach dem Aufstehen beantworten. 

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

[template schlaftagebuch 6 7]
include(templates/schlaftagebuch.html)



[javascript]
include(../lib/js/optinomic/data_module/optinomic_app_api.m4)
include(main.js)


[css]
include(../lib/css/set/optinomic_material_bootstrap.m4)
include(style.css)



[survey]
id = protokoll_abend
type = ng
responsibility = patient_via_email
name = Schlaftagebuch: Abendprotokoll
host = default

[survey_markup protokoll_abend]
include(survey_markups/protokoll_abend.html)


[survey]
id = protokoll_morgen
type = ng
responsibility = patient_via_email
name = Schlaftagebuch: Morgenprotokoll
host = default

[survey_markup protokoll_morgen]
include(survey_markups/protokoll_morgen.html)



[event morgen]
type = daily
time = 06:00
due_after = 86400
overdue = ignore
description = Schlaftagebuch: Morgenprotokoll
survey = protokoll_morgen


[event abend]
type = daily
time = 21:30
due_after = 86400
overdue = ignore
description = Schlaftagebuch: Abendprotokoll
survey = protokoll_abend


[email new_event html]
include(emails/new_event.html)

[email overdue html]
include(emails/overdue.html)

