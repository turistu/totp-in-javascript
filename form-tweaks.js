if(window.PasswordCredential){
	// chrome, edge
	FORM.onsubmit = function(e){
		navigator.credentials.store(new PasswordCredential({
			id: USER.value, password: KEY.value
		}));
		e.preventDefault();
	}
}else if(!/Gecko\/\d/.test(navigator.userAgent)){
	// firefox doesn't need this kludge
	FORM.onsubmit = null;
	let iframe = document.createElement('iframe');
	iframe.style.display = 'none';
	FORM.target = iframe.name = 'fram';
	document.body.appendChild(iframe);
}
