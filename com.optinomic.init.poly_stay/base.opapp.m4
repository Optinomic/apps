[module]
id = com.optinomic.init.poly_stay
name = Belegung (Fall)
short_description = Informationen zur aktuellen Belegung.
version = include(VERSION)
type = patient


[description]
Selektieren Sie den gewünschten Fall um die Belegungsdetails des Patienten anzuzeigen. 


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


[template init 6 9]
include(templates/init.html)


[javascript]
include(../lib/js/optinomic/data_module/optinomic_app_api.m4)
include(main.js)


[css]
include(../lib/css/set/optinomic_material_bootstrap.m4)
include(style.css)

