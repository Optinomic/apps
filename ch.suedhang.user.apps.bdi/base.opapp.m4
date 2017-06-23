[module]
id = ch.suedhang.user.apps.bdi
name = Entwicklung: Beck-Depressions-Inventar (BDI-II)
short_description = Entwicklung: Schweregrad depressiver Symptomatik im klinischen Bereich, 21 Aussagen
version = include(VERSION)
type = user


[description]
Under Development: Entwicklung verschiedener Patientengruppen bzgl. des Schweregrads depressiver Symptomatik im klinischen Bereich, 21 Aussagen.


[developer]
first_name = Beat
last_name = Ottiger
github_user = ottigerb
email = beat@optinomic.com
company = Optinomic Gmbh
phone = +41 (0)44 508 26 76
website = http://www.optinomic.com/


[dependencies]
ch.suedhang.apps.bdi >= 1.0


[template score_overview 4 4]
include(templates/score.html)

[template data_export_admin 6 7]
include(templates/export.html)

[readme]
include(readme.md)

[javascript]
include(../lib/js/optinomic/data_module/optinomic_app_api.m4)
include(main.js)


[css]
include(../lib/css/set/optinomic_material_bootstrap.m4)
include(style.css)


[calculation bdi_scores javascript ch.suedhang.apps.bdi ch.suedhang.apps.bdi:bdi_score]
include(calculations/bdi_score.js)
