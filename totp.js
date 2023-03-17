async function totp(key){
	return hotp(unbase32(key), pack64bu(Math.floor(Date.now() / 30000)));
}
async function hotp(key, counter){
	const y = window.crypto.subtle;
	if(!y) throw 'no window.crypto.subtle object available';
	const k = await y.importKey('raw', key, {name: "HMAC", hash: "SHA-1"}, false, ['sign']);
	return hotp_truncate(await y.sign('HMAC', k, counter));
}
function hotp_truncate(b){
	const a = Array.from(new Uint8Array(b)), i = a[19] & 0xf;
	return (((a[i]&0x7f)<<24|a[i+1]<<16|a[i+2]<<8|a[i+3]) % 1000000).fmt(10, 6)
}

Number.prototype.fmt = function (base, width){
	return this.toString(base).padStart(width, '0')
}
function unbase32(s){
	var t = /[^a-zA-Z2-7\s-]/.exec(s);
	if(t) throw `bad char '${t}' in key`;
	t = s.toLowerCase().match(/[a-z2-7]/g).map(c => "abcdefghijklmnopqrstuvwxyz234567".indexOf(c).fmt(2, 5)).join("");
	if(t.length < 8 || t.length % 8)
		throw `bad ${t.length} bits key length`;
	return new Uint8Array(t.match(/.{8}/g).map(d => parseInt(d, 2)));
}
function pack64bu(v){
	var b = new ArrayBuffer(8), d = new DataView(b);
	d.setUint32(0, Math.floor(v / 4294967296));
	d.setUint32(4, v % 4294967296);
	return new Uint8Array(b);
}
