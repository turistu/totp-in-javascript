if(window.PasswordCredential){
	// chromium-based browsers
	FORM.onsubmit = function(e){
		navigator.credentials.store(new PasswordCredential({
			id: USER.value, password: KEY.value
		}));
		e.preventDefault();
	}
}else if(!/Gecko\/\d/.test(navigator.userAgent)){
	// use an invisible iframe as the target of the form on non-chromium
	// and non-gecko browsers
	FORM.onsubmit = null;
	let iframe = document.createElement('iframe');
	iframe.style.display = 'none';
	FORM.target = iframe.name = 'fram';
	document.body.appendChild(iframe);
}
// use execCommand('copy') on older browsers; that usually fails when
// called from anything but an event handler
if(!navigator.clipboard)
	copy = function(emsg){
		try {
			getSelection().selectAllChildren(CODE);
			CODE.title = document.execCommand('copy') ?
				'copied!' : emsg;
		}catch(e){ CODE.title = emsg }
	};
