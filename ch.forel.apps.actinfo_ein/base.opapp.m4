[module]
id = ch.forel.apps.actinfo_ein
name = ActInfo | Eintritt
short_description = actInfo Eintrittsfragebogen: Sonderversion für den stationären Alkohol- und Medikamentenbereich.
version = include(VERSION)
type = patient

[description]
act-info (addiction, care and therapy information) ist ein einheitliches, gesamtschweizerisches Klientenmonitoringsystem für den Bereich der Suchthilfe.

Das nationale Dokumentationssystem umfasst Angebote der ambulanten und stationären Behandlung von Problemen mit legalen und illegalen Substanzen sowie von nicht-substanzgebundener Abhängigkeit. act-info ist das Resultat der Harmonisierung der bestehenden Suchthilfestatistiken.

Die beteiligten Forschungsinstitute (Sucht Schweiz Lausanne, ISGF Zürich) sind für die Datenerhebung und die Auswertungen in den einzelnen Behandlungssektoren verantwortlich.

act-info wird durch das Bundesamt für Gesundheit BAG finanziert und koordiniert. Die Verantwortung für das Gesamtprojekt act-info liegt beim BAG.


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


[template score 6 6]
include(templates/score.html)


[template data_download_admin 6 10]
include(templates/download.html)


[dependencies]

[javascript]
include(../lib/js/optinomic/data_module/optinomic_app_api.m4)
include(main.js)


[css]
include(../lib/css/set/optinomic_material_bootstrap.m4)
include(style.css)

[survey]
id = actinfo_eintritt
type = lime
responsibility = lead_therapist
name = actInfo - Eintritt
host = default
survey_id = 451894
hash = X104X2880
pid = X104X2874
fid = X104X2719
min_questions =
min_lastpage = 5



[event activation]
type = on_activation
time = 8:00
due_after = 259200
overdue = ignore
description = actInfo - Eintritt
survey = actinfo_eintritt


[email new_event html]
include(emails/new_event.html)

[email overdue html]
include(emails/overdue.html)


[calculation another_calculation javascript]
include(calculations/another_calculation.js)
