all:	totp.html totp.xpi
page.html:	form.html page.js totp.js
	{ cat form.html && \
	  printf '<script src=%s></script>\n' totp.js page.js; } > $@
totp.html:	form.html README.md page.js totp.js
	{ cat form.html README.md && \
	  printf '<hr>\n<script style="display: block; white-space: pre; font-family: monospace">\n' && \
	  cat totp.js && \
	  printf '</script>\n<script>\n' && \
	  cat page.js && \
	  printf '</script>'; } > $@
xpi_sources = manifest.json page.html popup.html page.js totp.js totp.png
totp.xpi:	$(xpi_sources)
	rm -f $@
	zip $@ $(xpi_sources)
.PHONY:	clean distclean install
distclean:	clean
	rm -f totp.html totp.xpi
clean:
	rm -f page.html
install:	totp.xpi
	firefox totp.xpi
page.html totp.html totp.xpi:	Makefile
