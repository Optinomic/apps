[module]
id = com.optinomic.user.apps.assessment
name = Patienten-Assessment (Einladung)
short_description = Zugangsdaten und Beschreibung drucken
version = include(VERSION)
type = user


[description]
Diese Applikation ermöglicht das Drucken der Zugangsdaten sowie einer Kurzeinführung für das Optinomic Patienten-Assessment.


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

[template print_access 6 12]
<head>
	<script src='https://cdn.rawgit.com/Optinomic/apps/master/com.optinomic.test.pdf_make/pdfmake/pdfmake.min.js'></script>
	<script src='https://cdn.rawgit.com/Optinomic/apps/master/com.optinomic.test.pdf_make/pdfmake/vfs_fonts.js'></script>
</head>
include(templates/app.html)


[javascript]
include(../lib/js/optinomic/data_module/optinomic_app_api.m4)
include(main.js)


[css]
include(../lib/css/set/optinomic_material_bootstrap.m4)
include(style.css)

