[module]
id = ch.suedhang.bot.poly_ks
name = Austritt (Kantonsstatistik)
short_description = Austritt (Kantonsstatistik) aus Polypoint.
version = include(VERSION)
type = user

[description]
Diese Applikation dient zur Sammlung der Austritt (Kantonsstatistik). Die Daten werden anhand einem Polypoint-Lookup via ODBC gewonnen und als data_source_query gespeichert. 


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

[template KANTONSSTATISTIK 6 7]
include(../lib/polymer/index.m4)
include(elements/view.html)


[javascript]

[css]

[data_source_query kantonsstatistik Polypoint 0 */12 *]
include(../lib/polymer/index.m4)

