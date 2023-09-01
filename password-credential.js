// this currently only seems to work in chrome
// where it is also the most reliable way, though it still does not work
// with with file:// and chrome-extension:// urls
if(window.PasswordCredential)
	qs('form').onsubmit = function(e){
		navigator.credentials.store(new PasswordCredential({
			id: qs('#user').value, password: qs('#key').value
		}));
		e.preventDefault();
	}
