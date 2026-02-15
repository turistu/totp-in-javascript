class TOTPForm {
	constructor(GENERATE, CODE, KEY, ERROR) {
		this.code = CODE
		this.key = KEY
		this.error = ERROR

		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this#bound_methods_in_classes
		this.generate = this.generate.bind(this)

		GENERATE.onclick = this.generate
	}

	async generate() {
		try {
			this.code.value = await totp(this.key.value);
			copy('click to copy', true)
		} catch(e) {
			this.key.setCustomValidity(this.error.value = e)
		}
	}
}

function touchscreen(){
	return matchMedia('(pointer:coarse)').matches
}
// half-fix for pastejack bug 1855345 broke it
function select_is_broken(){
	return /\(X11;.* Gecko\//.exec(navigator.userAgent);
}
async function copy(emsg, select){
	if(CODE.value === '') return
	try {
		await navigator.clipboard.writeText(CODE.value);
		CODE.title = 'copied!';
		if(select && !touchscreen()){
			if(select_is_broken()) CODE.title = 'copied (for ctrl-V)';
			else getSelection().selectAllChildren(CODE);
		}
	}catch(e){ CODE.title = emsg }
}

const totpWrapper = new TOTPForm(GENERATE, CODE, KEY, ERROR);
KEY.oninput = function(){
	KEY.setCustomValidity('');
	ERROR.value = KEY.checkValidity() ?  '' :
		Error('only A..Z, 2..7 and spaces allowed');
	if(KEY !== document.activeElement) totpWrapper.generate();
}
SHOW.checked = false;
SHOW.onchange = e => KEY.type = SHOW.checked ? 'text': 'password';
CODE.onclick = e => copy('copy failed');
FORM.onsubmit = e => e.preventDefault();
// add class="popup" when html code is called from panel button
// view-source:moz-extension://xxxxxxxx/form.html#popup
FORM.className = document.location.hash.substr(1);
