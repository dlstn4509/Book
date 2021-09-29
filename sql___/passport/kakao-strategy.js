const KakaoStrategy = require('passport-kakao').Strategy
// http://127.0.0.1:3001/auth/kakao/cb
const {createSnsUser} = require('../models/auth')

const cb = async (accessToken, refreshToken, profile, done) => {
	try {
/* 		console.log('-------------------------')
		console.log(accessToken)
		console.log(refreshToken)
		console.log(profile)
		console.log('-------------------------') */
		let user = {userid: profile.id, accessToken}
		let userSns = {
			accessToken,
			refreshToken,
			provider: 'KA',
			snsid: profile.id,
			snsName: profile.username,
			displayName: profile.displayName,
			prifileURL: profile._json.properties.profile_image,
			email: profile._json.kakao_account.email,
		}
		const {idx} = await createSnsUser(user, userSns)
		user.idx = idx
		done(null, user)
	}
	catch (err) {
		done(err)
	}
}

const kakaoStrategy = new KakaoStrategy({
	clientID : process.env.KAKAO_KEY, // 카카오 디벨로퍼 JavaScript 키
	clientSecret: process.env.KAKAO_SALT, // 카카오 솔트
	callbackURL : '/auth/kakao/cb'
}, cb)

module.exports = passport => passport.use(kakaoStrategy)