[module]
id = ch.suedhang.apps.asrs
name = ADHS-Screening (ASRS)
short_description = Screening-Test mit Selbstbeurteilungs-Skala für Erwachsene
type = patient

[description]
Der ASRS-Fragebogen kann als Ausgangspunkt zur Erkennung der Anzeichen/Symptome der Erwachsenen-ADHS verwendet werden, soll jedoch nicht eine Beratung bei einer geschulten medizinischen Fachkraft ersetzen. 


[developer]
first_name = Nora
last_name = Schönenberger
github_user = schoenenb
email = nora.schoenenberger@suedhang.ch
company = Suedhang
phone = +41 (0)31 828 14 92
website = http://suedhang.ch/de/


[template asrs_scores 4 4]
include(templates/score.html)


[dependencies]

[javascript]
include(../lib/js/optinomic/data_module/optinomic_app_api.m4)
include(main.js)


[css]
include(../lib/css/set/optinomic_material_bootstrap.m4)
include(style.css)


[survey]
id = asrs_ng
type = ng
responsibility = patient_via_assessment
name = ADHS-Screening (ASRS)
host = default

[survey_markup asrs_ng]
include(survey_markups/asrs_survey.html)


[event activation]
type = on_activation
time = 08:00
due_after = 259200
overdue = ignore
description = ASRS-Erhebung
survey = asrs_ng


[calculation asrs_score javascript]
include(calculations/asrs_score.js)

