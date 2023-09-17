<p>This is a javascript implementation of
a <a href=https://www.rfc-editor.org/rfc/rfc6238>TOTP</a> generator,
using the browser's
<a href=https://w3c.github.io/webcrypto/#subtlecrypto-interface>crypto API</a>.
It should do the exactly same thing as the google authenticator or any other
TOTP generating app.

<p>The <a href=totp.js>javascript code</a> does not send to or fetch any data
from anywhere remotely, and
the <a href=https://turistu.github.io/totp.html>demo page</a>
should work the same when served over https, saved locally or used inside
a browser extension.

<p>I have also packaged this into an <a href=https://addons.mozilla.org/en-US/firefox/addon/totp/>xpi firefox browser extension</a>,
which offers the convenience of generating the TOTP (for a key you have saved)
directly from a toolbar popup instead of having to switch to another tab.
The xpi does not do anything more than that and does not include any content
scripts or filters.
