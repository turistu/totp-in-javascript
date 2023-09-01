function qs(s){ return document.querySelector(s) }
function generate(){
	totp(qs('#key').value).then(c => {
		qs('#code').textContent = c; copy();
	}).catch(error => {
		qs('#error').textContent = 'ERROR: ' + error;
		qs('#key').setCustomValidity('failed');
	})
}
function copy(e){
	navigator.clipboard.writeText(qs('#code').textContent).then(() => {
		qs('#code').title = 'copied!';
		if(navigator.userAgent.includes("(X11;"))
			getSelection().selectAllChildren(qs('#code'));
	}).catch(error => {
		qs('#code').title = e ? 'copy failed' : 'click to copy';
	})
}
qs('#generate').onclick = generate;
qs('#key').oninput = function(){
	this.setCustomValidity(''); qs('#error').innerHTML = '';
	if(this !== document.activeElement) generate();
}
qs('#show').onclick = function(e){
	qs('#key').type = qs('#key').type === 'text' ? 'password' : 'text';
	e.preventDefault();
}
qs('#code').onclick = copy;
qs('form').className = document.location.hash.substr(1);
