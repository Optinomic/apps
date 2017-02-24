[module]
id = org.optinomic.apps.komed_health
name = Komed-Health <-> Optinomic  
short_description = Intelligent communication in healthcare
version = 1.0
type = patient

[description]
Intelligent communication in healthcare | Optinomic-Integration into Komed-Health

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
include(elements/komed-iframe.html)
include(../lib/polymer/elements/template_end.m4)


[javascript]
include(../lib/polymer/elements/main.m4)


[css]


