[module]
id = org.optinomic.export.toolbox.v2
name = Export-Toolbox (V2)
short_description = Export-Toolbox (Beta-Channel)
version = include(VERSION)
type = user

[description]
Export Survey Responses :: This is the Beta-Channel from org.optinomic.export.toolbox (as soon as stable).

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

[template live_run 6 7]
include(../lib/polymer/index.m4)
include(elements/behavior-export-toolbox.html)
include(elements/element-export.html)
include(elements/element-filter.html)
include(elements/element-override-settings.html)
include(elements/live-run.html)

[template create 6 7]
include(../lib/polymer/index.m4)
include(elements/timeu-wizard.html)
include(elements/behavior-export-toolbox.html)
include(elements/element-select-datasource.html)
include(elements/create.html)


[javascript]


[css]

