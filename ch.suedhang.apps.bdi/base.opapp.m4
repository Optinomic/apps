[module]
id = ch.suedhang.apps.bdi
name = Beck-Depressions-Inventar (BDI-II)
short_description = Schweregrad depressiver Symptomatik
version = include(VERSION)
type = patient


[description]
Der Summenwert aus den 21 Fragebereichen des Beck Depressions-Inventar liefert einen Hinweis auf den Schweregrad einer möglichen depressiven Symptomatik.


[developer]
first_name = Nora
last_name = Schoenenberger
github_user = schoenenb
email = Nora.Schoenenberger@suedhang.ch
company = Klinik Südhang
phone = +41 (0)31 828 14 14
website = http://suedhang.ch/de/



[template simple_score 4 4]
include(templates/score.html)

[readme]
include(readme.md)

[dependencies]

[javascript]
include(../lib/js/optinomic/data_module/optinomic_app_api.m4)
include(main.js)


[css]
include(../lib/css/set/optinomic_material_bootstrap.m4)
include(style.css)

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