M4 = m4

all: example.opapp

%.opapp: %/base.opapp.m4
	$(M4) $< > $@
