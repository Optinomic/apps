[module]
id = ch.suedhang.apps.bdi
name = Beck-Depressions-Inventar (BDI-II)
short_description = Schweregrad depressiver Symptomatik im klinischen Bereich
version = include(VERSION)
type = patient


[description]
Schweregrad depressiver Symptomatik im klinischen Bereich.

[developer]
first_name = Nora
last_name = Schoenenberger
github_user = schoenenb
email = Nora.Schoenenberger@suedhang.ch
company = Klinik Südhang
phone = +41 (0)31 828 14 14
website = http://suedhang.ch/de/


[template BDI 6 12]
include(../lib/polymer/index.m4)
include(elements/element-bdi.html)
include(elements/view.html)


[template BDI_simple_score 6 6]
<head>
	<style>	
		include(../lib/css/set/optinomic_material_bootstrap.m4)
		include(style.css)
	</style>	
	<script>
		include(../lib/js/optinomic/data_module/optinomic_app_api.m4)
	</script>
</head>
<script>
include(main.js)
</script>
include(templates/score.html)




[readme]
include(readme.md)

[dependencies]

[javascript]


[css]


[survey]
id = bdi2
type = lime
responsibility = patient_via_assessment
name = Beck-Depressions-Inventar (BDI-II)
host = default
survey_id = 786887
hash = X31X392
pid = X31X393
fid = X31X394
min_lastpage = 3
min_questions =



[event activation]
type = on_activation
time = 08:00
due_after = 259200
overdue = ignore
description = Schweregrad depressiver Symptomatik im klinischen Bereich, 21 Aussagen
survey = bdi2


[event exit]
type = before_exit
days = 7
time = 08:00
due_after = 259200
overdue = ignore
description = Schweregrad depressiver Symptomatik im klinischen Bereich, 21 Aussagen
survey = bdi2



[calculation bdi_score javascript]
include(calculations/bdi_score.js)

[sql_init]
include(includes/create_view.sql)