async function totp(key, secs = 30, digits = 6){
	return hotp(unbase32(key), pack64bu(Date.now() / 1000 / secs), digits);
}
async function hotp(key, counter, digits){
	let y = window.crypto.subtle;
	if(!y) throw 'no window.crypto.subtle object available';
	let k = await y.importKey('raw', key, {name: 'HMAC', hash: 'SHA-1'}, false, ['sign']);
	return hotp_truncate(await y.sign('HMAC', k, counter), digits);
}
function hotp_truncate(buf, digits){
	let a = new Uint8Array(buf), i = a[19] & 0xf;
	return fmt(10, digits, ((a[i]&0x7f)<<24 | a[i+1]<<16 | a[i+2]<<8 | a[i+3]) % 10**digits);
}

function fmt(base, width, num){
	return num.toString(base).padStart(width, '0')
}
function unbase32(s){
	let t = (s.toLowerCase().match(/\S/g)||[]).map(c => {
		let i = 'abcdefghijklmnopqrstuvwxyz234567'.indexOf(c);
		if(i < 0) throw `bad char '${c}' in key`;
		return fmt(2, 5, i);
	}).join('');
	if(t.length < 8) throw 'key too short';
	return new Uint8Array(t.match(/.{8}/g).map(d => parseInt(d, 2)));
}
function pack64bu(v){
	let b = new ArrayBuffer(8), d = new DataView(b);
	d.setUint32(0, v / 2**32);
	d.setUint32(4, v);
	return b;
}
