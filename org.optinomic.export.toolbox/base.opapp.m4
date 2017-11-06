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
include(elements/view.html)


[javascript]


[css]


[calculation tmt_full javascript ch.suedhang.apps.tmt_V3 ch.suedhang.apps.tmt_V3:tmt_score]
include(calculations/tmt.m4)

[calculation bscl_full javascript ch.suedhang.apps.bscl_anq ch.suedhang.apps.bscl_anq:scores_calculation]
include(calculations/bscl.m4)

[calculation isk_full javascript ch.suedhang.apps.isk ch.suedhang.apps.isk:scores_calculation]
include(calculations/isk.m4)

