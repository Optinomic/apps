[module]
id = ch.suedhang.user.apps.tmt
name = Klinische Stichprobe | TMT
short_description = Klinische Stichproben des Trail Making Test (TMT)
version = include(VERSION)
type = user


[description]
Erstellen der klinischen Stichprobe des TMT. Mit dem TMT wird die Fähigkeit zum visuellen Scannen erfasst, sowie die psychomotorische Geschwindigkeit (Trail Making Test A) und Leistungen der exekutiven Funktionen (insbesondere kognitive Flexibilität und Switching, Trail Making Test B). Der Quotient B /A stellt das 'reine' Maß der im Trail Making Test B erhobenen exekutiven Funktionen dar und ist unabhängig von einer evtl. vorliegenden Verlangsamung. Normwerte sind für letzteren Kennwert nur für Personen ≥ 50-jährig verfügbar.  Faustregel: ein  B/A-Quotient > 2.5 gilt als Hinweis für eine auffällige Testleistung.


[developer]
first_name = Beat
last_name = Ottiger
github_user = ottigerb
email = beat@optinomic.com
company = Optinomic Gmbh
phone = +41 (0)44 508 26 76
website = http://www.optinomic.com/


[dependencies]
ch.suedhang.apps.tmt.production >= 1.0


[template score_overview 4 4]
include(templates/score.html)



[javascript]
include(../lib/js/optinomic/data_module/optinomic_app_api.m4)
include(main.js)


[css]
include(../lib/css/set/optinomic_material_bootstrap.m4)
include(style.css)


[calculation tmt_klinikstichprobe javascript ch.suedhang.apps.tmt.production ch.suedhang.apps.tmt.production:tmt_score]
include(calculations/klinikstichprobe.js)


