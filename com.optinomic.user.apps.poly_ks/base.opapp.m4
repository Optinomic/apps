[module]
id = com.optinomic.user.apps.poly_ks
name = Austritt (Kantonsstatistik)
short_description = Austritt (Kantonsstatistik) aus Polypoint.
version = include(VERSION)
type = user

[description]
Diese Applikation dient zur Sammlung der Austritt (Kantonsstatistik). Die Daten werden anhand einem Polypoint-Lookup via ODBC gewonnen und in der Patienten-App gespeichert. Aufgrund dieser Kriterien wird der Patient automatisch in Patientengruppen eingeteilt.

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

[template KANTONSSTATISTIK 6 7]
include(../lib/polymer/index.m4)
include(elements/view.html)


[javascript]

[css]

[task get_ks javascript]
include(tasks/get_ks.m4)
