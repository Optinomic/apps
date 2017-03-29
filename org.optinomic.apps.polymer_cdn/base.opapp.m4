[module]
id = org.optinomic.apps.polymer_cdn
name = Optinomic | Polymer
short_description = Optinomic Apps using Polymer & Optinomic/polymer-cdn.
version = 1.0
type = patient

[description]
Optinomic-App Template using Polymer via Optinomic/polymer-cdn and Redux to store data.

[developer]
first_name = Beat
last_name = Ottiger
github_user = ottigerb
email = beat@optinomic.com
company = Optinomic Gmbh
phone = +41 (0)44 508 26 76
website = http://www.optinomic.com/


[template main 6 7]
include(elements/index.html)
include(../lib/polymer/templates/template_end.m4)

[template main 6 7]
include(elements/index_variante_1.html)
include(../lib/polymer/templates/template_end.m4)

[template admin 6 7]
include(elements/admin.html)
include(../lib/polymer/templates/template_end.m4)


[javascript]
include(../lib/polymer/elements/main.js)


[css]
