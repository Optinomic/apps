[module]
id = com.optinomic.cis.hisoryentry
name = Verlaufseintrag
short_description = Verlaufseintrag.
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


[template history_entry 6 12]
include(templates/history.html)


[dependencies]

[javascript]
include(../lib/js/optinomic/data_module/optinomic_app_api.m4)
include(main.js)


[css]
include(../lib/css/set/optinomic_material_bootstrap.m4)
include(style.css)

