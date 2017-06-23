[module]
id = com.optinomic.user.apps.klinikstichproben
name = Klinische Stichproben
short_description = Klinikstichproben erstellen und verwalten
version = include(VERSION)
type = user


[description]
Under Development! Erstellen von klinischen Stichproben auf Basis von N-Dimensianalen Arrays aus Patient-Calculations sowie Patientengruppen - Dimensionen. Ziel dieser Applikation ist, klinische Stichproben einfach für jegliche Optinomic-App zur Verfügung zu stellen. 


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

[dependencies]
ch.suedhang.apps.tmt_V3 >= 1.0


[template klinikstichproben 6 12]
include(templates/app.html)

[template pg_dimensions 6 10]
include(templates/pg_dimensions.html)


[javascript]
include(../lib/js/optinomic/data_module/optinomic_app_api.m4)
include(main.js)


[css]
include(../lib/css/set/optinomic_material_bootstrap.m4)
include(style.css)




