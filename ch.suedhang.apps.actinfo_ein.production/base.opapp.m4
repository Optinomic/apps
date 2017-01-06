[module]
id = ch.suedhang.apps.actinfo_ein.production
name = ActInfo | Eintritt
parent = ch.suedhang.apps.actinfo_ein
short_description = actInfo Eintrittsfragebogen: Sonderversion für den stationären Alkohol- und Medikamentenbereich.
version = include(VERSION)
type = patient

[description]
act-info (addiction, care and therapy information) ist ein einheitliches, gesamtschweizerisches Klientenmonitoringsystem für den Bereich der Suchthilfe.

Das nationale Dokumentationssystem umfasst Angebote der ambulanten und stationären Behandlung von Problemen mit legalen und illegalen Substanzen sowie von nicht-substanzgebundener Abhängigkeit. act-info ist das Resultat der Harmonisierung der bestehenden Suchthilfestatistiken.

Die beteiligten Forschungsinstitute (Sucht Schweiz Lausanne, ISGF Zürich) sind für die Datenerhebung und die Auswertungen in den einzelnen Behandlungssektoren verantwortlich.

act-info wird durch das Bundesamt für Gesundheit BAG finanziert und koordiniert. Die Verantwortung für das Gesamtprojekt act-info liegt beim BAG.


[developer]
first_name = Nora
last_name = Schönenberger
github_user = schoenenb
email = nora.schoenenberger@suedhang.ch
company = Suedhang
phone = +41 (0)31 828 14 92
website = http://suedhang.ch/

[dependencies]


[survey]
id = actinfo_eintritt_production
type = lime
responsibility = Admin
name = actInfo - Eintritt
host = limesurvey_v2
survey_id = 275667
hash = X74X1754
pid = X74X1748
fid = X74X1747
min_questions =
min_lastpage = 5


[event activation]
type = on_activation
time = 8:00
due_after = 259200
overdue = ignore
description = actInfo - Eintritt
survey = actinfo_eintritt_production



[sql_init]
include(includes/create_view_production.sql)
