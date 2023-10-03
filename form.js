async function generate(){
	try { CODE.value = await totp(KEY.value); copy('click to copy') }
	catch(e){ KEY.setCustomValidity(ERROR.value = e) }
}
async function copy(emsg){
	try {
		await navigator.clipboard.writeText(CODE.value);
		if(!matchMedia('(pointer:coarse)').matches)
			getSelection().selectAllChildren(CODE);
		CODE.title = 'copied!';
	}catch(e){ CODE.title = emsg }
}
GENERATE.onclick = generate;
KEY.oninput = function(){
	KEY.setCustomValidity('');
	ERROR.value = KEY.checkValidity() ?  '' :
		Error('only A..Z, 2..7 and spaces allowed');
	if(KEY !== document.activeElement) generate();
}
SHOW.checked = false;
SHOW.onchange = e => KEY.type = SHOW.checked ? 'text': 'password';
CODE.onclick = e => copy('copy failed');
FORM.onsubmit = e => e.preventDefault();
FORM.className = document.location.hash.substr(1);
if(window.PasswordCredential){
	// chromium-based browsers
	FORM.onsubmit = function(e){
		navigator.credentials.store(new PasswordCredential({
			id: USER.value, password: KEY.value
		}));
		e.preventDefault();
	}
}else if(!/Gecko\/\d/.test(navigator.userAgent)){
	// use an invisible iframe as the target of the form on non-chromium
	// and non-gecko browsers
	FORM.onsubmit = null;
	let iframe = document.createElement('iframe');
	iframe.style.display = 'none';
	FORM.target = iframe.name = 'fram';
	document.body.appendChild(iframe);
}
// use execCommand('copy') on older browsers; that usually fails when
// called from anything but an event handler
if(!navigator.clipboard)
	copy = function(emsg){
		getSelection().selectAllChildren(CODE);
		CODE.title = document.execCommand('copy') ? 'copied!' : emsg;
		if(matchMedia('(pointer:coarse)').matches)
			getSelection().removeAllRanges();
	};
