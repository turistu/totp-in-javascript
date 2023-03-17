function qs(s){ return document.querySelector(s) }
function generate_code(e){
	totp(qs('#key').value).then(c => {
		qs('#code').textContent = c;
		navigator.clipboard.writeText(c);
	}).catch(error => qs('#code').textContent = error);
	e.preventDefault()
}
qs('#form').onsubmit = generate_code;
qs('#key').oninput = function(e){
	if(this != document.activeElement) return generate_code(e)
}
if(s = qs('#show')){
	s.checked = false;
	s.onchange = function(e){
		qs('#key').type = this.checked ? 'text': 'password'
	}
}
