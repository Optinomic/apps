[module]
id = com.optinomic.cis.medication
name = Medikamente
short_description = Medikamente (Verodnung, Reserve, Reserveanwendung)
version = include(VERSION)
type = patient

[description]

[developer]
first_name = Beat
last_name = Ottiger
github_user = ottigerb
email = beat@optinomic.com
company = Optinomic Gmbh
phone = +41 (0)44 508 26 76
website = http://www.optinomic.com/



[template medication_table 6 8]
include(templates/medication_grid.html)

[template medication_list 6 12]
include(templates/medication.html)



[javascript]
include(../lib/js/optinomic/data_module/optinomic_app_api.m4)
include(main.js)


[css]
include(../lib/css/set/optinomic_material_bootstrap.m4)
include(style.css)

