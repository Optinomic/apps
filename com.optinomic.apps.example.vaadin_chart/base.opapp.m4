[module]
id = com.optinomic.apps.example.vaadin_chart
name = Example Vaadin Chart Example
short_description = Example Vaadin Chart Example
version = include(VERSION)
type = patient

[description]
Just a silly module doing a example Vaadin Chart Example. This is just an example - to show how Optinomic-Apps can be built.

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


[template show_token 6 25]
include(templates/show_token.html)


[javascript]
include(main.js)

[css]
include(style.css)
