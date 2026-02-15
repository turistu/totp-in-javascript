#!/bin/bash

# Generates totp.html for https://turistu.github.io/totp.html

set -e

# strip lines starting with "<script" from form.html output
grep -v '^<script' form.html && printf '<hr>\n'
# replace totp.js references with #source in README.md output
sed 's/totp\.js/#source/' README.md
# insert form.js form-tweaks.js as scripts, and totp.js as listing
printf '<script>\n%s\n</script>\n' "$(cat form.js form-tweaks.js)"
printf '<script %s>\n%s\n</script>\n' \
            'id=source style="display: block; white-space: pre; font-family: monospace; overflow: auto"' "$(cat totp.js)"
