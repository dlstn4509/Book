const crypto = require('crypto')
const salt = `lv;ckbl;er`

let pass = `123456`
let pass512 = crypto.createHash('sha512').update(pass + salt).digest('base64')
console.log(pass512)


const bcrypt = require('bcrypt')
const genPass = async pass => {
	return await bcrypt.hash(pass + salt, 5)
}
const comparePass = async (pass, hash) => {
	return await bcrypt.compare(pass + salt, hash)
}

const passVerify = async () => {
	let pass = `123456`
	let salt = `fdlkjcvbmw32`
	let hash = await bcrypt.hash(pass + salt, 5)
	let compare = await bcrypt.compare(pass + salt, hash)
	console.log(compare)
}
passVerify()