function qs(s){ return document.querySelector(s) }
async function generate(){
	try {
		qs('#code').value = await totp(qs('#key').value);
		copy('click to copy');
	}catch(e){
		qs('#key').setCustomValidity(e);
		qs('#error').value = 'ERROR: ' + e;
	}
}
async function copy(emsg){
	try {
		await navigator.clipboard.writeText(qs('#code').value);
		if(navigator.userAgent.includes("(X11;"))
			getSelection().selectAllChildren(qs('#code'));
		qs('#code').title = 'copied!';
	}catch(e){
		qs('#code').title = emsg;
	}
}
qs('#generate').onclick = generate;
qs('#key').oninput = function(){
	this.setCustomValidity('');
	qs('#error').value = this.checkValidity() ?
		'' : 'ERROR: only A..Z, 2..7 and spaces allowed';
	if(this !== document.activeElement) generate();
}
qs('#show').checked = false;
qs('#show').onchange = function(){
	qs('#key').type = this.checked ? 'text': 'password';
}
qs('#code').onclick = e => copy('copy failed');
qs('form').className = document.location.hash.substr(1);
qs('form').onsubmit = e => e.preventDefault();
