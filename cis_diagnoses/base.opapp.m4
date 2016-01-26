[module]
id = com.optinomic.cis.diagnoses
name = Diagnosen
short_description = Diagnosen nach ICD-10.
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


[template diagnoses_list 6 12]
include(templates/diagnoses.html)


[template diagnoses_report 6 6]
include(templates/diagnoses_report_only.html)


[dependencies]

[javascript]
include(../lib/js/optinomic/data_module/optinomic_app_api.m4)
include(main.js)


[css]
include(../lib/css/set/optinomic_material_bootstrap.m4)
include(style.css)

