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
	const a = new Uint8Array(b), i = a[19] & 0xf;
	return fmt(10, 6, ((a[i]&0x7f)<<24|a[i+1]<<16|a[i+2]<<8|a[i+3]) % 1000000);
}

function fmt(base, width, num){
	return num.toString(base).padStart(width, '0')
}
function unbase32(s){
	const t = s?.toLowerCase().match(/\S/g)?.map(c => {
		const i = "abcdefghijklmnopqrstuvwxyz234567".indexOf(c);
		if(i < 0) throw `bad char '${c}' in key`;
		return fmt(2, 5, i);
	}).join("");
	if(!t) throw `empty key`;
	if(t.length & 7) throw `bad ${t.length} bits key length`;
	return new Uint8Array(t.match(/.{8}/g).map(d => parseInt(d, 2)));
}
function pack64bu(v){
	let b = new ArrayBuffer(8), d = new DataView(b);
	d.setUint32(0, Math.floor(v / 4294967296));
	d.setUint32(4, v % 4294967296);
	return new Uint8Array(b);
}
