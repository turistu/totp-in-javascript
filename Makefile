all:	totp.html totp.xpi
totp.html:	form.html README.md totp.js form.js form-tweaks.js
	./generate-website.sh > totp.html
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
