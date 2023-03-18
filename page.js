function qs(s){ let e = document.querySelector(s); return e ? e : {} }
function generate_code(e){
	totp(qs('#key').value).then(c => {
		qs('#code').textContent = c;
		navigator.clipboard.writeText(c);
	}).catch(error => qs('#code').textContent = error);
	e.preventDefault()
}
qs('#generate').onclick = generate_code;
qs('#key').oninput = function(e){
	if(this != document.activeElement) return generate_code(e)
}
qs('#show').checked = false;
qs('#show').onchange = function(e){
	qs('#key').type = this.checked ? 'text': 'password'
}
