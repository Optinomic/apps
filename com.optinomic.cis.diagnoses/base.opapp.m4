[module]
id = com.optinomic.cis.diagnoses
name = Diagnosen
short_description = Diagnosen nach ICD-10
version = 1.0
type = patient

[description]
Internationale statistische Klassifikation der Krankheiten und verwandter Gesundheitsprobleme (ICD-10)

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

[template diagnoses_list 6 12]
include(templates/diagnoses.html)

[template diagnoses_report_only 6 6]
include(templates/diagnoses_report.html)


[dependencies]

[javascript]
include(../lib/js/optinomic/data_module/optinomic_app_api.m4)
include(main.js)


[css]
include(../lib/css/set/optinomic_material_bootstrap.m4)
include(style.css)

