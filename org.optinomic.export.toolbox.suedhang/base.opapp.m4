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

[readme]
include(readme.md)

[template main 6 7]
include(../lib/polymer/index.m4)
include(../org.optinomic.export.toolbox/elements/behavior-export-toolbox.html)
include(../org.optinomic.export.toolbox/elements/element-export.html)
include(../org.optinomic.export.toolbox/elements/view.html)


[javascript]


[css]


[calculation tmt_full javascript ch.suedhang.apps.tmt.production ch.suedhang.apps.tmt.production:tmt_score]
include(calculations/full.js)

[calculation bscl_full javascript ch.suedhang.apps.bscl_anq.production ch.suedhang.apps.bscl_anq.production:scores_calculation]
include(calculations/full.js)

[calculation isk_full javascript ch.suedhang.apps.isk.production ch.suedhang.apps.isk.production:scores_calculation]
include(calculations/full.js)

