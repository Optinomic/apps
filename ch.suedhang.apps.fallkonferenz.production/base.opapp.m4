[module]
id = ch.suedhang.apps.fallkonferenz.production
name = Fallkonferenz
parent = ch.suedhang.apps.fallkonferenz
short_description = Diese Applikation dient zur schnellen Übersicht z.B. für die Fallkonferenz.
version = 1.0
type = patient

[description]
Hinweis: Diese App "vergrössert" nicht den Inhalt beim Betrachten im "alten" Client. Um den Inhalt zu sehen können Sie den Inhalt in einem neuen Browserfenster öffnen oder den client.new verwenden. Danke. 

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
include(elements/view.html)


[javascript]


[css]
