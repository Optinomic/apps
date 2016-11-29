[module]
id = com.optinomic.init.poly_stay
name = Stammdaten (Fall)
short_description = Zusätzliche Fall-Stammdaten aus Polypoint.
version = include(VERSION)
type = patient


[description]
Diese Applikation dient zur Sammlung zusätzlich benötigter Fall-Stammdaten. Die Daten werden anhand einem Polypoint-Lookup via ODBC gewonnen. Aufgrund dieser Kriterien wird der Patient automatisch in Patientengruppen eingeteilt.


[developer]
first_name = Beat
last_name = Ottiger
github_user = ottigerb
email = beat@optinomic.com
company = Optinomic Gmbh
phone = +41 (0)44 508 26 76
website = http://www.optinomic.com/


[template init 6 9]
include(templates/init.html)


[javascript]
include(../lib/js/optinomic/data_module/optinomic_app_api.m4)
include(main.js)


[css]
include(../lib/css/set/optinomic_material_bootstrap.m4)
include(style.css)

