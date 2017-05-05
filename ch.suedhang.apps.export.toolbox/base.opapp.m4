[module]
id = ch.suedhang.apps.export.toolbox
name = Export-Toolbox Views
short_description = Einfache Methode um SQL-VIEWS zu aktualisieren. Einfach diese App deaktivieren/aktivieren um die aktualisierten Exports in die Export-Toolbox zu transferieren.
version = include(VERSION)
type = user

[description]
sql_init: This code is executed when a module is installed and is so in a schema specially created for that module. It means accessing the main tables as to be done by prefixing public. to their name. When returning a view/table/function created in this schema, the API does it with a special user which only has read-only access to the other schemas. This is preventing a module from modifying the API tables but also the tables from other modules.


[developer]
first_name = Beat
last_name = Ottiger
github_user = ottigerb
email = beat@optinomic.com
company = Optinomic Gmbh
phone = +41 (0)44 508 26 76
website = http://www.optinomic.com/




[dependencies]

[javascript]
include(../lib/js/optinomic/data_module/optinomic_app_api.m4)


[css]
include(../lib/css/set/optinomic_material_bootstrap.m4)


[sql_init]
include(includes/create_view.sql)




