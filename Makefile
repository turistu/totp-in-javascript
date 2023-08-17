all:	totp.html totp.xpi
totp.html:	page.html README.md page.js totp.js
	{ grep -v '^<script' page.html && printf '<hr>\n' && \
	  sed 's/totp\.js/#source/' README.md && \
	  printf '<script%s>\n%s\n</script>\n' '' "$$(cat page.js)" \
	    ' style="display: block; white-space: pre; font-family: monospace; overflow: auto"' \
		"$$(cat totp.js)"; } > $@
xpi_sources = manifest.json page.html popup.html page.js totp.js totp.png
totp.xpi:	$(xpi_sources)
	rm -f $@
	zip $@ $(xpi_sources)
.PHONY:	clean install
clean:
	rm -f totp.html totp.xpi
install:	totp.xpi
	firefox totp.xpi
totp.html totp.xpi:	Makefile
