define(`include_as_js_string', `"'`patsubst(patsubst((include($*)), `
', `\\n'), `"', `\\"')'`".slice(1,-11)')dnl
