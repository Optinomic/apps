[module]
id = org.optinomic.export.toolbox.suedhang
name = Export-Toolbox
short_description = Export-Toolbox
version = 1.0
parent = org.optinomic.export.toolbox
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


[javascript]


[css]


[calculation tmt_full javascript ch.suedhang.apps.tmt.production ch.suedhang.apps.tmt.production:tmt_score]
include(calculations/tmt.m4)

[calculation bscl_full javascript ch.suedhang.apps.bscl_anq.production ch.suedhang.apps.bscl_anq.production:scores_calculation]
include(calculations/bscl.m4)

[calculation isk_full javascript ch.suedhang.apps.isk.production ch.suedhang.apps.isk.production:scores_calculation]
include(calculations/isk.m4)

