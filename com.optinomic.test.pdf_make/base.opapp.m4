[module]
id = com.optinomic.test.pdf_make
name = _Druckvorlagen (PDF)
short_description = Druckvorlagen (PDF) öffnen und herunterladen.
version = include(VERSION)
type = patient

[description]
Diese Applikation stellt gewünschte Patienten-Druckvorlagen (PDF) zur Verfügung.

[developer]
first_name = Beat
last_name = Ottiger
github_user = ottigerb
email = beat@optinomic.com
company = Optinomic Gmbh
phone = +41 (0)44 508 26 76
website = http://www.optinomic.com/


[template pdf 6 9]
<head>
	<script src='https://cdn.rawgit.com/Optinomic/apps/master/com.optinomic.test.pdf_make/pdfmake/pdfmake.min.js'></script>
	<script src='https://cdn.rawgit.com/Optinomic/apps/master/com.optinomic.test.pdf_make/pdfmake/vfs_fonts.js'></script>
</head>


include(templates/pdf.html)


[javascript]
include(../lib/js/optinomic/data_module/optinomic_app_api.m4)
include(main.js)


[css]
include(../lib/css/set/optinomic_material_bootstrap.m4)
include(style.css)
