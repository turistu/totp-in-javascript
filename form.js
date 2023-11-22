async function generate(){
	try { CODE.value = await totp(KEY.value); copy('click to copy', true) }
	catch(e){ KEY.setCustomValidity(ERROR.value = e) }
}
function touchscreen(){
	return matchMedia('(pointer:coarse)').matches
}
// half-fix for pastejack bug 1855345 broke it
function select_is_broken(){
	return /\(X11;.* Gecko\//.exec(navigator.userAgent);
}
async function copy(emsg, select){
	try {
		await navigator.clipboard.writeText(CODE.value);
		CODE.title = 'copied!';
		if(select && !touchscreen()){
			if(select_is_broken()) CODE.title = 'copied (for ctrl-V)';
			else getSelection().selectAllChildren(CODE);
		}
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
