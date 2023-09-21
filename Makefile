all:	totp.html totp.xpi
totp.html:	form.html README.md totp.js form.js form-tweaks.js
	set -e; exec >$@; \
	grep -v '^<script' form.html && printf '<hr>\n'; \
	sed 's/totp\.js/#source/' README.md; \
	printf '<script%s>\n%s\n</script>\n' '' "$$(cat form.js form-tweaks.js)" \
	   ' id=source style="display: block; white-space: pre; font-family: monospace; overflow: auto"' "$$(cat totp.js)"
xpi_sources = manifest.json form.html form.js totp.js totp.png
totp.xpi:	$(xpi_sources)
	rm -f $@
	zip $@ $(xpi_sources)
.PHONY:	clean install
clean:
	rm -f totp.html totp.xpi
install:	totp.xpi
	firefox totp.xpi
totp.html totp.xpi:	Makefile
