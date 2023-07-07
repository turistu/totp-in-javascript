function qs(s){ return document.querySelector(s) || {} }
function generate_code(e){
	totp(qs('#key').value).then(c => {
		qs('#code').textContent = c;
		navigator.clipboard.writeText(c);
	}).catch(error => {
		qs('#error').textContent = 'ERROR: ' + error;
		qs('#key').setCustomValidity('failed');
	})
}
qs('#generate').onclick = generate_code;
qs('#key').oninput = function(e){
	this.setCustomValidity('');
	qs('#error').innerHTML = '';
	if(this !== document.activeElement) generate_code(e);
}
qs('#show').checked = false;
qs('#show').onchange = function(e){
	qs('#key').type = this.checked ? 'text': 'password'
}
