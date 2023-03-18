function unbase32x(s){
	let p = 0, t = s?.toLowerCase().match(/=+\s*$|\S/g)?.map(c => {
		const i = "abcdefghijklmnopqrstuvwxyz234567".indexOf(c);
		if(i >= 0) return i.fmt(2, 5);
		if(p = c.match(/^(=|={3,4}|={6})\s*$/)?.[1].length) return '';
		throw `bad char '${c}' in key`;
	}).join("");
	if(!t) throw `empty key`;
	if(t.length + p * 5 & 7) throw `bad ${t.length} bits key length`;
	return new Uint8Array(t.match(/.{8}/g).map(d => parseInt(d, 2)));
}
