[module]
id = ch.suedhang.apps.fallkonferenz
name = Fallkonferenz
short_description = Diese Applikation dient zur schnellen Übersicht (z.B. für die Fallkonferenz).
version = 1.0
type = patient

[description]
Eine schnelle Übersicht über die wichtigsten Ergebnisse, bestehend aus Suchtmittelkonsum (actInfo); Visuelles Scannen, psychomotorische Geschwindigkeit und Leistung der exekutiven Funktionen (TMT); ADHS-Screening (ASRS); Suchtdruck (AASE-G); Symptomcheckliste (BSCL); Depressions-Inventar (BDI), Inventar Sozialer Kompetenzen (ISK), Stress-Coping-Inventar (SCI) und der Lebensqualität (WHQOL).

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

[template overview 6 7]
include(../lib/polymer/index.m4)
include(elements/actinfo-problemsubstanzen.html)
include(elements/bscl-element.html)
include(elements/view.html)


[javascript]


[css]
