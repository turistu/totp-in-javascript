async function generate(){
	try { CODE.value = await totp(KEY.value); copy('click to copy') }
	catch(e){ KEY.setCustomValidity(ERROR.value = 'ERROR: ' + e) }
}
async function copy(emsg){
	try {
		await navigator.clipboard.writeText(CODE.value);
		if(navigator.userAgent.includes("(X11;"))
			getSelection().selectAllChildren(CODE);
		CODE.title = 'copied!';
	}catch(e){ CODE.title = emsg }
}
GENERATE.onclick = generate;
KEY.oninput = function(){
	KEY.setCustomValidity('');
	ERROR.value = KEY.checkValidity() ?  '' :
		'ERROR: only A..Z, 2..7 and spaces allowed';
	if(KEY !== document.activeElement) generate();
}
SHOW.checked = false;
SHOW.onchange = e => KEY.type = SHOW.checked ? 'text': 'password';
CODE.onclick = e => copy('copy failed');
FORM.onsubmit = e => e.preventDefault();
FORM.className = document.location.hash.substr(1);
