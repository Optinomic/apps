[module]

id = com.optinomic.apps.example.vaadin_chart
name = Example Vaadin Chart Example
short_description = Example Vaadin Chart Example
version = include(VERSION)
type = patient

[description]

Just a silly module doing a example Vaadin Chart Example. This is just an example - to show how Optinomic-Apps can be built.

[developer]

first_name = Tom
last_name = Feron
github_user = thoferon
email = tho.feron@gmail.com
company = Optinomic
phone = +44 207 568789
website = http://www.optinomic.com

[dependencies]

[template show_token]
include(templates/show_token.html)


[javascript]
include(main.js)

[css]
include(style.css)
