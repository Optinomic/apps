[module]
id = org.optinomic.apps.patient_address_map
name = Patientenadresse | Navi
short_description = Patientenadresse & Navigation zum Patienten.
version = 1.0
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


[template address 6 7]
include(../lib/polymer/templates/template_start.m4)
include(elements/address.html)
include(../lib/polymer/templates/template_end.m4)

[template navigation 6 7]
include(../lib/polymer/templates/template_start.m4)
include(elements/navigation.html)
include(../lib/polymer/templates/template_end.m4)

[javascript]
include(../lib/polymer/elements/main.m4)


[css]


