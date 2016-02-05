<<<<<<< HEAD
define(`include_as_js_string', `"'`patsubst(patsubst(include($*), `
', `\\n'), `"', `\\"')'`"')
=======
define(`include_as_js_string', `"'`patsubst(patsubst(include(includes/$*), `
', `\\n'), `"', `\\"')'`"')
>>>>>>> origin/master
