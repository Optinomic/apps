M4 = m4
TARGETS = $(shell find . -type d -maxdepth 1 -name '[a-zA-Z0-9]*' \
	    | sed 's/\.\/\(.*\)/\1.opapp/g')

all: $(TARGETS)

%.opapp: %/base.opapp.m4
	$(M4) $< > $@

clean:
	rm -f *.opapp
