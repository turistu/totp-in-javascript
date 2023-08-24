function qs(s){ return document.querySelector(s) || {} }
function generate(event){
	totp(qs('#key').value).then(c => {
		qs('#code').textContent = c; copy(event);
	}).catch(error => {
		qs('#error').textContent = 'ERROR: ' + error;
		qs('#key').setCustomValidity('failed');
	})
}
function copy(event){
	const code = qs('#code'), sel = getSelection();
	navigator.clipboard.writeText(code.textContent).then(() => {
		code.title = 'copied!'; sel.selectAllChildren(code);
	}).catch(error => {
		code.title = event ? 'copy failed' : 'click to copy';
		if(sel.containsNode(code)) sel.removeAllRanges();
	})
}
qs('#generate').onclick = generate;
qs('#key').oninput = function(){
	this.setCustomValidity(''); qs('#error').innerHTML = '';
	if(this !== document.activeElement) generate();
}
qs('#show').checked = false;
qs('#show').onchange = function(){
	qs('#key').type = this.checked ? 'text': 'password';
}
qs('#code').onclick = copy;
