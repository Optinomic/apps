[module]

id = com.optinomic.apps.example
name = Example with Makefile
short_description = An example app
version = include(VERSION)
type = patient

[description]

Just a silly module doing nothing. This is just an example - to show how Optinomic-Apps can be built.

[developer]

first_name = Tom
last_name = Feron
github_user = thoferon
email = tho.feron@gmail.com
company = Optinomic
phone = +44 207 568789
website = http://www.optinomic.com

[readme]
include(readme.md)

[dependencies]

[template show_token]

include(templates/show_token.html)

[pdf_template show_items for_pdf_template]

include(pdf_templates/show_items.tex)

[javascript]

include(main.js)

[css]

include(style.css)


[survey]

id = my_survey
type = lime
responsibility = lead_therapist
name = Craving - Test
host = default
survey_id = 368847
hash = X1X1
pid = X1X2
fid = X1X3
min_questions =
min_lastpage = 2


[survey]

id = my_ng_survey
type = ng
responsibility = lead_therapist
name = Second example survey
host = default

[survey_markup my_ng_survey]

include(survey_markups/my_ng_survey.html)

[event daily]

type = daily
time = 13:00
due_after = 86400
overdue = ignore
description = A daily reminder to disable this example module
survey = my_survey

[email new_event plain]

include(emails/new_event.plain)

[email overdue html]

include(emails/overdue.html)

[calculation for_pdf_template javascript]

include(calculations/for_pdf_template.js)

[calculation my_calculation lua]

include(calculations/my_calculation.lua)

[calculation another_calculation javascript]

include(calculations/another_calculation.js)
