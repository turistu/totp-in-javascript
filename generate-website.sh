#!/bin/bash

# Generates totp.html for https://turistu.github.io/totp.html

set -e

grep -v '^<script' form.html && printf '<hr>\n'
sed 's/totp\.js/#source/' README.md
printf '<script%s>\n%s\n</script>\n' '' "$(cat form.js form-tweaks.js)" \
           ' id=source style="display: block; white-space: pre; font-family: monospace; overflow: auto"' "$(cat totp.js)"
