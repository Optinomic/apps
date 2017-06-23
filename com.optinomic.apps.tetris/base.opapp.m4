[module]
id = com.optinomic.apps.tetris
name = Tetris
short_description = Puzzleartiges Computerspiel.
version = include(VERSION)
type = patient

[description]
Tetris ist ein puzzleartiges Computerspiel des russischen Programmierers Alexei Paschitnow, der die erste spielbare Version am 6. Juni 1984 auf einem Elektronika-60-Rechner fertigstellte. Ziel dieser Optinomic-App ist die Kognition des Patienten zu erfassen. Anzahl Versuche im Vergleich zum Score.  Aktuell lediglich eine 'spielbare' Tetris-Version.

[developer]
first_name = Beat
last_name = Ottiger
github_user = ottigerb
email = beat@optinomic.com
company = Optinomic Gmbh
phone = +41 (0)44 508 26 76
website = http://www.optinomic.com/

[readme]


[dependencies]

[template tetris  6 10]
include(templates/tetris.html)


[javascript]
include(main.js)

[css]
include(../lib/css/set/optinomic_material.m4)
include(style.css)
