if(window.PasswordCredential){
	// chrome, edge
	qs('form').onsubmit = function(e){
		navigator.credentials.store(new PasswordCredential({
			id: qs('#user').value, password: qs('#key').value
		}));
		e.preventDefault();
	}
}else if(!/Gecko\/\d/.test(navigator.userAgent)){
	// firefox doesn't need this kludge
	qs('form').onsubmit = null;
	let iframe = document.createElement('iframe');
	iframe.style.display = 'none';
	qs('form').target = iframe.name = 'fram';
	document.body.appendChild(iframe);
}
