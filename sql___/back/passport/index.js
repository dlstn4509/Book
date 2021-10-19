const local = require('./local-strategy')
const kakao = require('./kakao-strategy')
const naver = require('./naver-strategy')
const { findUser } = require('../models/auth')

const serialize = (user, done) => {
	console.log(user)
	// 카카오, 네이버 등등 공통사항 (최초 로그인)
	// 브라우저 쿠키에 idx 남김
	done(null, user.idx)
}

const deserialize = async (idx, done) => {
	// 카카오, 네이버 등등 공통사항 (재접속)
	try {
		const { success, user } = await findUser('idx', idx)
		if(success) done(null, user)
		else done(null, false, '사용자 정보가 없습니다.')
	}
	catch(err) {
		done(err)
	}
}

module.exports = passport => {
	passport.serializeUser(serialize)
	passport.deserializeUser(deserialize)
	local(passport)
	kakao(passport)
	naver(passport)
	// facebook(passport)
}