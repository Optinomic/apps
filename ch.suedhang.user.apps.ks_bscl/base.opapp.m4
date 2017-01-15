[module]
id = ch.suedhang.user.apps.ks_bscl
name = Klinische Stichprobe | BSCL
short_description = Klinische Stichproben | BSCL (ANQ)
version = include(VERSION)
type = user


[description]
Erstellen der klinischen Stichprobe des BSCL. Die „Brief Symptom Checklist“ (BSCL) ist die Kurzform der SCL-90. Es handelt sich bei der BSCL um eine deutschsprachige Übersetzung von G.H. Franke, deren Ursprung in dem amerikanischen „Brief Symptom Inventory“ (BSI) von L.R. Derogatis (1975) zu finden ist. Es handelt sich bei den 53 Items der BSCL um die fünf bis sechs ladungsstärksten Items pro Skala aus der 90 Items umfassenden SCL-90. Die Urheber- und Markenrechte an der BSCL liegen beim Hogrefe Verlag.


[developer]
first_name = Beat
last_name = Ottiger
github_user = ottigerb
email = beat@optinomic.com
company = Optinomic Gmbh
phone = +41 (0)44 508 26 76
website = http://www.optinomic.com/


[dependencies]
ch.suedhang.apps.bscl_anq.production >= 1.0


[template score_overview 4 4]
include(templates/score.html)



[javascript]
include(../lib/js/optinomic/data_module/optinomic_app_api.m4)
include(main.js)


[css]
include(../lib/css/set/optinomic_material_bootstrap.m4)
include(style.css)


[calculation bscl_klinikstichprobe javascript ch.suedhang.apps.bscl_anq.production ch.suedhang.apps.bscl_anq.production:scores_calculation]
include(calculations/klinikstichprobe.js)




