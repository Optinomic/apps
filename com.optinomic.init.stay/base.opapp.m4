[module]
id = com.optinomic.init.stay
name = Stammdaten (Fall)
short_description = Zusätzliche Fall-Stammdaten.
version = include(VERSION)
type = patient


[description]
Diese Applikation dient zur Spezifizierung zusätzlich benötigter Fall-Stammdaten. Aufgrund dieser Kriterien wird der Patient automatisch in Patientengruppen eingeteilt. Diese Funktionalität wird bewusst nicht über eine Schnittstelle gelöst. Flexibilität sowie die Reduktion von Komplexität vs. einmaliger "Doppelbefragung".


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

