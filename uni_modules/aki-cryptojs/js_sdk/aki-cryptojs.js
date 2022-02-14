const CryptoJS = require('crypto-js');  //引入crypto-js

//解密方法AES
function DecryptAES(word,mkey,miv) {
    let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
	let vkey = CryptoJS.enc.Utf8.parse(mkey); //传入的秘钥
	let viv = CryptoJS.enc.Utf8.parse(miv); //传入的秘钥偏移量
    let decrypt = CryptoJS.AES.decrypt(srcs, vkey, { iv: viv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}
//加密方法AES
function EncryptAES(word,mkey,miv) {
    let srcs = CryptoJS.enc.Utf8.parse(word);//传入的消息
	let vkey = CryptoJS.enc.Utf8.parse(mkey); //传入的秘钥
	let viv = CryptoJS.enc.Utf8.parse(miv); //传入的秘钥偏移量
    let encrypted = CryptoJS.AES.encrypt(srcs, vkey, { iv: viv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.ciphertext.toString().toUpperCase();
}
//加密方法HmacSHA256
function EncryptHmacSHA256(word,mkey) {
	let vkey = CryptoJS.enc.Utf8.parse(mkey); //传入的秘钥
    let srcs = CryptoJS.enc.Utf8.parse(word);
	//此方法为HMAC-SHA256的签名方式  具体签名方法可以打印CryptoJS
	let hash = CryptoJS.HmacSHA256(srcs, vkey);
	//这里是使用16进制的方法  具体API 可以打印CryptoJS.enc
	let hashInHex = CryptoJS.enc.Hex.stringify(hash);	
    return hashInHex.toString().toUpperCase();
}

export default {
	EncryptHmacSHA256,
	EncryptAES,
	DecryptAES
}