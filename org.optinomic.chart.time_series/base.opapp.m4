[module]
id = org.optinomic.chart.time_series
name = Chart: Time-Series
short_description = Time-Series analyses
version = include(VERSION)
type = user

[description]
Easy Time-Series analyses.

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
include(../org.optinomic.export.toolbox/elements/element-export.html)
include(../org.optinomic.export.toolbox/elements/behavior-export-toolbox.html)
include(elements/behavior-charts.html)
include(elements/element-chart.html)
include(elements/view.html)


[javascript]


[css]


[calculation bscl_full javascript ch.suedhang.apps.bscl_anq ch.suedhang.apps.bscl_anq:scores_calculation]
include(calculations/full.js)

