[module]
id = org.optinomic.export.tmt
name = Export (TMT)
short_description = Export (TMT) | Survey Responses.
version = 1.0
type = user

[description]
Create & Export Survey Responses from TMT. Based on Javascript-Data.

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
include(elements/view.html)


[javascript]


[css]


[calculation tmt_full javascript ch.suedhang.apps.tmt_V3 ch.suedhang.apps.tmt_V3:tmt_score]
include(calculations/full.js)

