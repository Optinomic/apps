[module]
id = com.optinomic.user.apps.fulfillment
name = Erfüllungsgrad
short_description = Erfasste Fragebögen mit Angaben zu Patient, Aufenthalt und zugrundeliegendem Ereignis.
type = user

[description]
Diese Userapp ermöglicht einem Datenverantwortlichen / Administrator den Erfüllungsgrad einelner Applikationen im Auge zu behalten. Dies Applikation listet sämtliche erfasste Fragebögen mit Angaben zu Patient, Aufenthalt und zugrundeliegendem Ereignis auf.


[developer]
first_name = Beat
last_name = Ottiger
github_user = ottigerb
email = beat@optinomic.com
company = Optinomic Gmbh
phone = +41 (0)44 508 26 76
website = http://www.optinomic.com/


[template fulfillment 6 8]
include(templates/fulfillment.html)

[template export_toolbox_admin 6 10]
include(templates/download.html)


[javascript]
include(../lib/js/optinomic/data_module/optinomic_app_api.m4)
include(main.js)

[css]
include(../lib/css/set/optinomic_material.m4)
include(style.css)

