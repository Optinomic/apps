[module]
id = com.optinomic.init.stay
name = Stammdaten (Fall)
short_description = Zusätzliche Stammdaten zum Fall.
version = include(VERSION)
type = patient

[description]
Diese App dient zur Sammlung zusätzlich benötigter Stammdaten. Diese können wiederum als 'Kriterien' für Patientengruppen dienen.

[developer]
first_name = Beat
last_name = Ottiger
github_user = ottigerb
email = beat@optinomic.com
company = Optinomic Gmbh
phone = +41 (0)44 508 26 76
website = http://www.optinomic.com/


[template dass_result 6 9]
include(templates/init.html)


[javascript]
include(../lib/js/optinomic/data_module/optinomic_app_api.m4)
include(main.js)


[css]
include(../lib/css/set/optinomic_material_bootstrap.m4)
include(style.css)

