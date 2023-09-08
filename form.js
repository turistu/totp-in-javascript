function qs(s){ return document.querySelector(s) }
function set_error(s){ qs('#key').setCustomValidity(s); qs('#error').value = s }
function generate(){
	totp(qs('#key').value).then(c => {
		qs('#code').value = c; copy('click to copy');
	}).catch(set_error);
}
function copy(emsg){
	navigator.clipboard.writeText(qs('#code').value).then(() => {
		qs('#code').title = 'copied!';
		if(navigator.userAgent.includes("(X11;"))
			getSelection().selectAllChildren(qs('#code'));
	}).catch(e => qs('#code').title = emsg);
}
qs('#generate').onclick = generate;
qs('#key').oninput = function(){
	set_error('');
	if(this !== document.activeElement) generate();
}
qs('#show').checked = false;
qs('#show').onchange = function(){
	qs('#key').type = this.checked ? 'text': 'password';
}
qs('#code').onclick = e => copy('copy failed');
qs('form').className = document.location.hash.substr(1);
