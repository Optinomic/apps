[module]
id = ch.suedhang.apps.bdi.production
name = Beck-Depressions-Inventar (BDI-II)
parent = ch.suedhang.apps.bdi
short_description = Schweregrad depressiver Symptomatik im klinischen Bereich
version = include(VERSION)
type = patient

[description]

[developer]
first_name = Nora
last_name = Schönenberger
github_user = schoenenb
email = nora.schoenenberger@suedhang.ch
company = Suedhang
phone = +41 (0)31 828 14 92
website = http://suedhang.ch/de/

[template BDI 6 12]
include(../lib/polymer/index.m4)
include(../ch.suedhang.apps.bdi/elements/element-bdi.html)
include(elements/view.html)

[template BDI_simple_score 6 6]
<style>	
	include(../lib/css/set/optinomic_material_bootstrap.m4)
	include(style.css)
</style>	
include(templates/score.html)
<script>
	include(../lib/js/optinomic/data_module/optinomic_app_api.m4)
	include(main.js)
</script>


[readme]
include(readme.md)

[dependencies]


[survey]
id = bdi2
type = lime
responsibility = patient_via_assessment
name = BDI II
host = limesurvey_v2
survey_id = 786887
hash = X33X1162
pid = X33X1163
fid = X33X1164
min_questions =
min_lastpage = 3


[event activation]
type = on_activation
time = 08:00
due_after = 259200
overdue = ignore
description = Schweregrad depressiver Symptomatik im klinischen Bereich, 21 Aussagen
survey = bdi2


[event exit]
type = before_exit
days = 10
time = 08:00
due_after = 259200
overdue = ignore
description = Schweregrad depressiver Symptomatik im klinischen Bereich, 21 Aussagen
survey = bdi2



