[module]
id = com.optinomic.apps.poly_lookup
name = Polypoint - Connector
short_description = ODBC :: POLY-Query 
version = include(VERSION)
type = user

[description]
Ziel dieser App ist eine Sammlung von Polypoint ODBC-Abfragen zur Verfügung zu stellen und diese auszuführen. Dieses Polypoint-Lookup funktioniert nur in der Klinik Südhang.

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

[template polypoint_lookup 6 7]
include(templates/poly.html)


[javascript]
include(../lib/js/optinomic/data_module/optinomic_app_api.m4)
include(main.js)


[css]
include(../lib/css/set/optinomic_material_bootstrap.m4)
include(style.css)

