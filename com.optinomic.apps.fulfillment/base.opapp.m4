[module]
id = com.optinomic.apps.fulfillment
name = Erfüllungsgrad
short_description = Erfüllungsgrad der Applikationen
version = include(VERSION)
type = user

[description]
Übersicht über den Erfüllungsgrad der Applikationen / Fragebögen


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

[template fulfillment 6 8]
include(templates/fulfillment.html)


[javascript]
include(../lib/js/optinomic/data_module/optinomic_app_api.m4)
include(main.js)

[css]
include(../lib/css/set/optinomic_material_bootstrap.m4)
include(style.css)

