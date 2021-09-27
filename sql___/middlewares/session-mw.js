const session = require('express-session')

const expressSession = session({ // 양방향 암호 해줌
	secret: process.env.COOKIE_SALT, // salt
	resave: false, // 쿠키를 가지고 있으면 재등록
	saveUninitialized: true,  // 데이터가 없어도 쿠키 생성
	cookie: { secure: false }
})

module.exports = app => {
	app.set('trust proxy', 1) // trust first proxy
	return (expressSession)
}