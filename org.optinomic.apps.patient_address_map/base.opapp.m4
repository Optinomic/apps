[module]
id = org.optinomic.apps.patient_address_map
name = Patient | Maps
short_description = Anschrift des Patienten
version = 1.0
type = patient

[description]
Patientenadresse auf Google-Maps.

[developer]
first_name = Beat
last_name = Ottiger
github_user = ottigerb
email = beat@optinomic.com
company = Optinomic Gmbh
phone = +41 (0)44 508 26 76
website = http://www.optinomic.com/


[template main 6 7]
include(../lib/polymer/elements/template_start.m4)
include(elements/index.html)
include(../lib/polymer/elements/template_end.m4)


[javascript]
include(../lib/polymer/elements/main.m4)


[css]


