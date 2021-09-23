const crypto = require('crypto')
const salt = 'fdgkdl234kljg'

let pass = '123456'
let pass512 = crypto.createHash('sha512').update(pass + salt).digest('base64')
console.log(pass512)

let pass2 = '123456'
let pass512re = crypto.createHash('sha512').update(pass2+salt).digest('base64')
console.log(pass512re)


const bcrypt = require('bcrypt')
const genPass = async pass => {
	return await bcrypt.hash(pass + salt, 5)
}
const comparePass = async (pass, hash) => {
	return await bcrypt.compare(pass + salt, hash)
}

const passVerify = async () => {
	let pass = '123456'
	let salt = 'fdgkdl234kljg'
	let hash = await bcrypt.hash(pass + salt, 5)
	console.log(hash)
	let compare = await bcrypt.compare(pass + salt, hash)
	console.log(compare)
}
// passVerify()



const cryptoJs = require('crypto-js')
const encrypt = cryptoJs.AES.encrypt('여름이였다...', salt)
console.log('encrypt : ' + encrypt)
const decrypt = cryptoJs.AES.decrypt(encrypt, salt).toString(cryptoJs.enc.Utf8)
console.log('decrypt : ' + decrypt)
