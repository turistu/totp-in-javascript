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
	if(this != document.activeElement) return generate_code(e)
	else { this.setCustomValidity(''); qs('#error').innerHTML = '' }
}
qs('#show').checked = false;
qs('#show').onchange = function(e){
	qs('#key').type = this.checked ? 'text': 'password'
}
