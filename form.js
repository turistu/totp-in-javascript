async function generate(){
	try { CODE.value = await totp(KEY.value); copy('click to copy', true) }
	catch(e){ KEY.setCustomValidity(ERROR.value = e) }
}
function select_is_ok(){
	if(matchMedia('(pointer:coarse)').matches)
		return false; // touchscreen
	if(/\(X11;.* rv:1[2-9][0-9].* Gecko\//.test(navigator.userAgent))
		return false; // pastejack bug 1855345 half-fix broke it
	return true;
}
async function copy(emsg, select){
	try {
		await navigator.clipboard.writeText(CODE.value);
		if(select && select_is_ok())
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
