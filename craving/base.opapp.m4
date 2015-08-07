[module]

id = com.optinomic.apps.craving
name = Craving-Tracking
short_description = Substanzverlangen (Alkohol, Tabak, sonstige Drogen) des Patienten
version = 1.0

[description]

Substanzverlangen oder Craving (engl. Begierde, Verlangen) ist ein Fachbegriff aus der Suchtmedizin. Craving oder constant craving umschreibt das kontinuierliche und nahezu unbezwingbare Verlangen eines Suchtkranken, sein Suchtmittel (Alkohol, Tabak, sonstige Drogen) zu konsumieren. Craving ist das zentrale Moment des Abhängigkeits- und Entzugssyndroms.

[developer]

first_name = Beat
last_name = Ottiger
github_user = ottigerb
email = beat@optinomic.com
company = Optinomic Gmbh
phone = +41 (0)44 508 26 76
website = http://www.optinomic.com/

[template show_craving 6 12]

include(craving/templates/show_craving.html)


[javascript]

include(craving/main.js)

[css]

include(lib/css/set/optinomic_bootstrap.css)
include(craving/style.css)

[survey]

id = my_craving
type = lime
responsibility = lead_therapist
name = craving
username = admin
password = go4optinomic
base_url = http://dev.openpsychotherapy.org/index.php/admin/remotecontrol
survey_id = 729583
hash = X128X2955
pid = X128X2956
fid = X128X2957
min_questions =
min_lastpage = 1


[event]

type = daily
time = 19:00
due_after = 86400
overdue = ignore
description = A daily reminder to disable this example module
survey = my_craving

[email new_event html]

include(craving/emails/new_event.html)

[email overdue html]

include(craving/emails/overdue.html)


[calculation another_calculation javascript]

include(craving/calculations/another_calculation.js)
