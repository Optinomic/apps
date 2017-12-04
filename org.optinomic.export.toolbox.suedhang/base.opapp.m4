[module]
id = org.optinomic.export.toolbox.suedhang
name = Export-Toolbox
short_description = Export-Toolbox
version = 1.0
type = user

[description]
Export Survey Responses

[developer]
first_name = Beat
last_name = Ottiger
github_user = ottigerb
email = beat@optinomic.com
company = Optinomic Gmbh
phone = +41 (0)44 508 26 76
website = http://www.optinomic.com/


[template export 6 7]
include(../lib/polymer/index.m4)
include(elements/behavior-export-toolbox.html)
include(../org.optinomic.export.toolbox/elements/element-export.html)
include(../org.optinomic.export.toolbox/elements/element-filter.html)
include(../org.optinomic.export.toolbox/elements/element-override-settings.html)
include(../org.optinomic.export.toolbox/elements/view.html)

[template create 6 7]
include(../lib/polymer/index.m4)
include(../org.optinomic.export.toolbox/elements/timeu-wizard.html)
include(elements/behavior-export-toolbox.html)
include(../org.optinomic.export.toolbox/elements/element-select-datasource.html)
include(../org.optinomic.export.toolbox/elements/create.html)


[readme]
include(readme.md)


[javascript]


[css]



[calculation aase_new javascript ch.suedhang.apps.aase-g.production ch.suedhang.apps.aase-g.production:another_calculation]
include(calculations/aase.m4)

[calculation actinfo_aus javascript ch.suedhang.apps.actinfo_aus.production ch.suedhang.apps.actinfo_aus.production:another_calculation]
include(calculations/actinfo_aus.m4)

[calculation actinfo_ein_new javascript ch.suedhang.apps.actinfo_ein.production ch.suedhang.apps.actinfo_ein.production:actinfo_ein]
include(calculations/actinfo_ein.m4)

[calculation asrs javascript ch.suedhang.apps.asrs.production ch.suedhang.apps.asrs.production:asrs_score]
include(calculations/asrs.m4)

[calculation bdi javascript ch.suedhang.apps.bdi.production ch.suedhang.apps.bdi.production:bdi_score]
include(calculations/bdi.m4)

[calculation bscl javascript ch.suedhang.apps.bscl_anq.production ch.suedhang.apps.bscl_anq.production:scores_calculation]
include(calculations/bscl.m4)

[calculation case javascript ch.suedhang.apps.case.production ch.suedhang.apps.case.production:another_calculation]
include(calculations/case.m4)

[calculation einzelassessment javascript ch.suedhang.apps.neuroanamnese.production ch.suedhang.apps.neuroanamnese.production:another_calculation]
include(calculations/einzelassessment.m4)

[calculation isk javascript ch.suedhang.apps.isk.production ch.suedhang.apps.isk.production:scores_calculation]
include(calculations/isk.m4)

[calculation sci javascript ch.suedhang.apps.sci.production ch.suedhang.apps.sci.production:scores]
include(calculations/sci.m4)

[calculation tmt javascript ch.suedhang.apps.tmt.production ch.suedhang.apps.tmt.production:tmt_score]
include(calculations/tmt.m4)

[calculation whoqol javascript ch.suedhang.apps.whoqol.production ch.suedhang.apps.whoqol.production:phys_psych_calculation]
include(calculations/whoqol.m4)
