function qs(s){ return document.querySelector(s) || {} }
function generate_code(){
	totp(qs('#key').value).then(c => {
		qs('#code').textContent = c;
		navigator.clipboard.writeText(c);
	}).catch(error => {
		qs('#error').textContent = 'ERROR: ' + error;
		qs('#key').setCustomValidity('failed');
	})
}
qs('#generate').onclick = generate_code;
qs('#key').oninput = function(){
	this.setCustomValidity('');
	qs('#error').innerHTML = '';
	if(this !== document.activeElement) generate_code();
}
qs('#show').checked = false;
qs('#show').onchange = function(){
	qs('#key').type = this.checked ? 'text': 'password';
}
qs('#code').onclick = function(){
	navigator.clipboard.writeText(this.textContent);
}
