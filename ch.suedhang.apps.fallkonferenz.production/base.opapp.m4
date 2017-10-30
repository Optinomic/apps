[module]
id = ch.suedhang.apps.fallkonferenz.production
name = Fallkonferenz
parent = ch.suedhang.apps.fallkonferenz
short_description = Diese Applikation dient zur schnellen Übersicht z.B. für die Fallkonferenz.
version = 1.0
type = patient

[description]
Übersicht der wichtigsten Ergebnisse zu Suchtmittelkonsum (actInfo); Visuellem Scannen, psychomotorischer Geschwindigkeit und Leistung der exekutiven Funktionen (TMT); ADHS-Screening (ASRS); Suchtdruck (AASE-G); Symptomcheckliste (BSCL); Depressions-Inventar (BDI), Inventar Sozialer Kompetenzen (ISK), Stress-Coping-Inventar (SCI) und der Lebensqualität (WHQOL).

Hinweis: Wenn Sie sich nicht im "client.new" befinden, öffnen Sie diese App über das Icon [öffnen] oder [frame].   


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
include(../ch.suedhang.apps.actinfo_ein/elements/actinfo-problemsubstanzen.html)
include(../ch.suedhang.apps.actinfo_ein/elements/element-actinfo.html)
include(elements/element-tmt.html)
include(../ch.suedhang.apps.asrs/elements/element-asrs.html)
include(../ch.suedhang.apps.aase-g/elements/element-aase.html)
include(../ch.suedhang.apps.bscl_anq/elements/element-bscl.html)
include(../ch.suedhang.apps.bdi/elements/element-bdi.html)
include(../ch.suedhang.apps.isk/elements/element-isk.html)
include(elements/element-sci.html)
include(elements/element-whoqol.html)
include(elements/view.html)



[javascript]


[css]
