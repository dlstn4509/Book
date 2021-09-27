const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session)
const { pool } = require('../modules/mysql-init')

const storeOptions = {
	expiration: 86400000,
}

const expressSession = session({
	secret: process.env.COOKIE_SALT,
	resave: false,
	saveUninitialized: true,
	store: new MySQLStore(storeOptions, pool),
	cookie: { 
		secure: false,
		httpOnly: true,
	},
})

module.exports = app => {
	app.set('trust proxy', 1)
	return expressSession
}


/* 
const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session)

const storeOptions = {
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
}

const expressSession = session({ // 양방향 암호 해줌
	secret: process.env.COOKIE_SALT, // salt
	resave: false, // 쿠키를 가지고 있으면 재등록
	saveUninitialized: true,  // 데이터가 없어도 쿠키 생성
	store: new MySQLStore(storeOptions),
	cookie: {
		secure: false,
		httpOnly: true,
	},
})

module.exports = app => {
	app.set('trust proxy', 1) // trust first proxy
	return expressSession
}
*/
