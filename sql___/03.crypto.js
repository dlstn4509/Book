/**
 * ! 암호화 (encrypt) 평문 -> 암호
 * ! 복호화 (decrypt) 암호 -> 평문
 * ! crypto(단방향 암호화) : 한번 암호화 시키면 복호화를 못시킴 - 비밀번호 (npm : bcrypt)
 * ! cipher(양방향 암호화) : 암호화 <-> 복호화 - https (npm : crypto-js)
 * md5, sha1, sha256, sha512 ... (암호화 기법)
 * rainbow table
 */

const crypto = require('crypto')

const salt = 'sdf(234lg%#@dskj%'

let pass = '123456'
let pass512 = crypto.createHash('sha512').update(pass + salt).digest('base64')

let pass2 = '1234562'
let pass512re = crypto.createHash('sha512').update(pass2 + salt).digest('base64')
// sha512로 암호화하고 base64로 표현해라

/* if(pass512 === pass512re) console.log('로그인 됐습니다.')
else console.log('패스워드가 틀렸습니다') */

// -------------------------------------------------------------------------------------------

const bcrypt = require('bcrypt')
// const salt = 'sdf(234lg%#@dskj%'

const genPass = async pass => {  // 암호화
	return await bcrypt.hash(pass + salt, 5)  // pass에 salt를 더해서 5번 돌려라
}

const comparePass = async (pass, hash) => {  // 검증 (복호화, 일치하면 true, 틀리면 false)
	return await bcrypt.compare(pass + salt, hash)  // pass에 salt를 더해서 hash와 비교해라
}

const passVerify = async () => {
	let pass = '123456'
	let hash = await genPass(pass)  // 비밀번호를 암호화 해라
	/* console.log(hash) */
	// let compare = await comparePass('123456', hash)
	let compare = await comparePass(pass, hash)
	/* console.log(compare) */
}
passVerify()


const passVerify2 = async () => {
	let pass = '123456'
	let salt = 'fgfg32423fgt5)'
	let hash = await bcrypt.hash(pass + salt, 5)
	let compare = await bcrypt.compare(pass + salt, hash)
	/* console.log('verify2: ' + compare) */
}
passVerify2()

// -------------------------------------------------------------------------------------------

const cipher = require('crypto-js')

const encrypt = cipher.AES.encrypt('아버지를 아버지라...', salt).toString() // 암호화
console.log('encrypt : ' + encrypt)

const decrypt  = cipher.AES.decrypt(encrypt, salt) // 복호화
const text = decrypt.toString(cipher.enc.Utf8);
console.log('decrypt : ' + text)