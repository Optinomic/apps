[module]
id = ch.suedhang.apps.pdf_druckvorlagen
name = _Druckvorlagen (PDF)
short_description = Druckvorlagen als PDF-Files öffnen und herunterladen.
version = include(VERSION)
type = patient

[description]

[developer]
first_name = Beat
last_name = Ottiger
github_user = ottigerb
email = beat@optinomic.com
company = Optinomic Gmbh
phone = +41 (0)44 508 26 76
website = http://www.optinomic.com/


[template pdf 6 9]
include(../lib/html/optinomic/templates/pdfmake.html)
include(templates/pdf.html)

[template assessment_report_only 6 9]
include(../lib/html/optinomic/templates/pdfmake.html)
include(templates/assessment.html)

[readme]
include(readme.md)

[javascript]
include(../lib/js/optinomic/data_module/optinomic_app_api.m4)
include(main.m4)


[css]
include(../lib/css/set/optinomic_material_bootstrap.m4)
include(style.css)
