[module]
id = ch.suedhang.user.apps.ks_whoqol
name = Klinische Stichprobe | WHOQOL-BREF
short_description = Klinische Stichproben | WHOQOL-BREF 
version = include(VERSION)
type = user


[description]
Erstellen der klinischen Stichprobe des WHOQOL-BREF (The World Health Organization Quality of Life). Beurteilung der Physischen und Psychischen Lebensqualität. 


[developer]
first_name = Beat
last_name = Ottiger
github_user = ottigerb
email = beat@optinomic.com
company = Optinomic Gmbh
phone = +41 (0)44 508 26 76
website = http://www.optinomic.com/


[dependencies]


[template score_overview 4 4]
include(templates/score.html)

[readme]
include(readme.md)

[javascript]
include(../lib/js/optinomic/data_module/optinomic_app_api.m4)
include(main.js)


[css]
include(../lib/css/set/optinomic_material_bootstrap.m4)
include(style.css)


[calculation whoqol_klinikstichprobe javascript ch.suedhang.apps.whoqol.production ch.suedhang.apps.whoqol.production:phys_psych_calculation]
include(calculations/klinikstichprobe.js)





