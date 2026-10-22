async function totp(key){
	let a = {};
	a.key = key.replace(/\b(\w+)=(\S+)/g, (m, k, v) => (a[k] = v, ""));
	return hotp(a);
}
async function hotp({key, digits = 6, hash = 'SHA-1', secs = 30,
		counter = Date.now() / 1000 / secs,
		rkey = unbase32(key), rcounter = b64u(counter)}){
	let y = self.crypto.subtle;
	if(!y) throw Error('no self.crypto.subtle object available');
	let k = await y.importKey('raw', rkey, {name: 'HMAC', hash}, false, ['sign']);
	return hotp_truncate(await y.sign('HMAC', k, rcounter), digits);
}
function hotp_truncate(buf, digits){
	let a = new Uint8Array(buf), i = a[a.length - 1] & 0xf;
	return fmt(10, digits, ((a[i]&0x7f)<<24 | a[i+1]<<16 | a[i+2]<<8 | a[i+3]) % 10**digits);
}

function fmt(base, width, num){
	return num.toString(base).padStart(width, '0')
}
function unbase32(s){
	let t = (s.toLowerCase().match(/\S/g)||[]).map(c => {
		let i = 'abcdefghijklmnopqrstuvwxyz234567'.indexOf(c);
		if(i < 0) throw Error(`bad char '${c}' in key`);
		return fmt(2, 5, i);
	}).join('');
	if(t.length < 8) throw Error('key too short');
	return new Uint8Array(t.match(/.{8}/g).map(d => parseInt(d, 2)));
}
function b64u(v){
	let b = new ArrayBuffer(8), d = new DataView(b);
	d.setUint32(0, v / 2**32);
	d.setUint32(4, v);
	return b;
}
