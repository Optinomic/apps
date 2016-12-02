[module]
id = com.optinomic.apps.poly_stay
name = Stammdaten (Fälle)
short_description = Zusätzliche Fall-Stammdaten aus Polypoint.
version = include(VERSION)
type = user

[description]
Diese Applikation dient zur Sammlung zusätzlich benötigter Fall-Stammdaten resp. deren Belegungs-Daten. Die Daten werden anhand einem Polypoint-Lookup via ODBC gewonnen und in der Patienten-App gespeichert. Aufgrund dieser Kriterien wird der Patient automatisch in Patientengruppen eingeteilt.

[developer]
first_name = Beat
last_name = Ottiger
github_user = ottigerb
email = beat@optinomic.com
company = Optinomic Gmbh
phone = +41 (0)44 508 26 76
website = http://www.optinomic.com/


[template polypoint_lookup 6 7]
include(templates/poly.html)


[javascript]
include(../lib/js/optinomic/data_module/optinomic_app_api.m4)
include(main.js)


[css]
include(../lib/css/set/optinomic_material_bootstrap.m4)
include(style.css)

