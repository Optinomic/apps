[module]
id = ch.suedhang.user.apps.ks_isk.production
name = Klinische Stichprobe | ISK
short_description = Klinische Stichproben | Inventar Sozialer Kompetenzen - Kurzform
parent = com.optinomic.user.apps.ks_isk
version = include(VERSION)
type = user


[description]
Erstellen der klinischen Stichprobe des ISK. Das Inventar Sozialer Kompetenzen (Kurzversion) erfasst in 33 Aussagen persönliche Verhaltensweisen und Gewohnheiten zu den vier Bereichen: Soziale Orientierung, Offensivität, Selbststeuerung und Reflexibilität. Soziale Kompetenzen sind für unser Funktionieren in der Gesellschaft notwendig. Sind sie zu sehr auf einen selber oder zu sehr auf die Gesellschaft ausgerichtet, dann funktioniert das Zusammenspiel nicht. Mittlere Ausprägungen, welche beide Aspekte berücksichtigen sind daher am günstigsten.


[developer]
first_name = Beat
last_name = Ottiger
github_user = ottigerb
email = beat@optinomic.com
company = Optinomic Gmbh
phone = +41 (0)44 508 26 76
website = http://www.optinomic.com/


[dependencies]
ch.suedhang.apps.isk >= 1.0



[calculation isk_klinikstichprobe javascript ch.suedhang.apps.isk.production ch.suedhang.apps.isk.production:scores_calculation]
include(calculations/klinikstichprobe.js)



