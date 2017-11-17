[module]
id = org.optinomic.export.toolbox
name = Export-Toolbox
short_description = Export-Toolbox
version = include(VERSION)
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

[readme]
include(readme.md)

[template export 6 7]
include(../lib/polymer/index.m4)
include(elements/behavior-export-toolbox.html)
include(elements/element-export.html)
include(elements/element-filter.html)
include(elements/element-override-settings.html)
include(elements/view.html)

[template create 6 7]
include(../lib/polymer/index.m4)
include(elements/timeu-wizard.html)
include(elements/behavior-export-toolbox.html)
include(elements/element-select-datasource.html)
include(elements/create.html)


[javascript]


[css]


[calculation tmt javascript ch.suedhang.apps.tmt_V3 ch.suedhang.apps.tmt_V3:tmt_score]
include(calculations/tmt.m4)

[calculation bscl javascript ch.suedhang.apps.bscl_anq ch.suedhang.apps.bscl_anq:scores_calculation]
include(calculations/bscl.m4)

[calculation isk javascript ch.suedhang.apps.isk ch.suedhang.apps.isk:scores_calculation]
include(calculations/isk.m4)

[calculation actinfo_ein javascript ch.suedhang.apps.actinfo_ein ch.suedhang.apps.actinfo_ein:actinfo_ein]
include(calculations/actinfo_ein.m4)

[calculation aase javascript ch.suedhang.apps.aase-g ch.suedhang.apps.aase-g:another_calculation]
include(calculations/aase.m4)
