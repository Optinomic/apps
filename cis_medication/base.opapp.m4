[module]
id = com.optinomic.cis.medication
name = Medikamente
short_description = Medikamente (Verodnung, Reserve, Reserveanwendung)
version = include(VERSION)
type = patient

[description]
Build 2

[developer]
first_name = Beat
last_name = Ottiger
github_user = ottigerb
email = beat@optinomic.com
company = Optinomic Gmbh
phone = +41 (0)44 508 26 76
website = http://www.optinomic.com/


[template medikamente 6 8]
include(templates/medication_grid.html)

[template reserve_medikamente 6 8]
include(templates/medication_reserve_grid.html)


[javascript]
include(../lib/js/optinomic/data_module/optinomic_app_api.m4)
include(main.js)


[css]
include(../lib/css/set/optinomic_material_bootstrap.m4)
include(style.css)

