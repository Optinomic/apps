[module]
id = ch.suedhang.apps.asrs.production
name = ADHS-Screening (ASRS)
parent = ch.suedhang.apps.asrs
short_description = Screening-Test mit Selbstbeurteilungs-Skala für Erwachsene
version = include(VERSION)
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

[readme]
include(readme.md)

[dependencies]


[survey]
id = asrs_ng
type = ng
responsibility = patient_via_assessment
name = ASRS
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