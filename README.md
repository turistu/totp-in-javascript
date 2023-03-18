<p>This is a javascript implementation of a <a href=https://www.rfc-editor.org/rfc/rfc6238>TOTP</a> generator,
using the browser's <a href=https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto>crypto API</a>.
It should do the exactly same thing as the google authenticator,
the <code><a href=https://www.nongnu.org/oath-toolkit/oathtool.1.html>oathtool</a> --totp -b ...</code> command, or any other TOTP generating app.

<p>The javascript code does not send to or fetch any data from anywhere
remotely, and <a href=https://turistu.github.io/totp.html>this page</a> should
work the same when served over https, saved locally or used inside a browser
extension.

<p>The TOTP shared key should be in <a href=https://datatracker.ietf.org/doc/html/rfc4648#section-6>base32</a> format,
eg <code>TK7P33KPE527ZTOX</code> (github) or <code>opid zgaw quda ip7q tj3z izo7 oemp t7dm</code> (google).

<p>The <q>User</q> field is not used for generating the OTP, its only purpose
is to help you save and autocomplete different keys using the browser's
password manager.

<p>This could be packaged into an <a href=https://addons.mozilla.org/en-US/firefox/addon/totp/>xpi firefox browser extension</a>, which will
offer the convenience of generating the TOTP (for a key you have saved)
directly from a toolbar popup instead of having to switch to another tab.
The xpi does not do anything more than that and does not include any content
scripts or filters.
