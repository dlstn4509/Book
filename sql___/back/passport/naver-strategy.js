const NaverStrategy = require('passport-naver').Strategy
// http://127.0.0.1:3001/auth/kakao/cb
const {createSnsUser, existUser, changeUser} = require('../models/auth')

const cb = async (accessToken, refreshToken, profile, done) => {
	try {
		/* 
		console.log('-------------------------')
		console.log(accessToken)
		console.log(refreshToken)
		console.log(profile)
		console.log('-------------------------')
		*/

		let user = {userid: profile.id, accessToken}
		let userSns = {
			accessToken,
			refreshToken,
			provider: 'NA',
			snsid: profile.id,
			snsName: profile._json.nickname || null,
			displayName: profile.displayName || null,
			prifileURL: profile._json.profile_image || null,
			email: profile._json.email || null,
		}
		
		let {success, idx, status} = await existUser('userid', user.userid)
		if(success) {
			if(status === '0') {
				const { success } = await changeUser(idx, { status: '3' })
				const { success: success2 } = await changeUser(idx, { status: '3' }, 'users_sns')
				if(success && success2) user.idx = idx
				else done('Error')
			}
		}
		else {
			let {idx: id} = await changeUser(user, userSns)
			user.idx = id
		}
		done(null, user)
	}
	catch (err) {
		done(err)
	}
}

const naverStrategy = new NaverStrategy({
	clientID : process.env.NAVER_KEY, // 네이버 디벨로퍼 JavaScript 키
	clientSecret: process.env.NAVER_SALT, // 네이버 솔트
	callbackURL : '/auth/naver/cb'
}, cb)

module.exports = passport => passport.use(naverStrategy)