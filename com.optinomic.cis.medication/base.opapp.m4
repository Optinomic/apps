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

[readme]
include(readme.md)


[template medikamente 6 15]
include(templates/medication_tabs.html)

[template medikamente_report_only 6 15]
include(templates/medication_report.html)



[javascript]
include(../lib/js/optinomic/data_module/optinomic_app_api.m4)
include(main.js)


[css]
include(../lib/css/set/optinomic_material.m4)
include(style.css)

