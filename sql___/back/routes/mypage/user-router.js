const path = require('path')
const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const { isUser } = require('../../middlewares/auth-mw')
const { alert } = require('../../modules/util')
const { findUser, updateUser } = require('../../models/auth')

// 회원정보 보여주기 		GET : /mypage/user 
router.get('/', isUser, async (req, res, next) => {
	let sql, values
	try {
		req.app.locals.PAGE = 'MYPAGE'
		req.app.locals.js = 'mypage/form'
		req.app.locals.css = 'mypage/form'
		const {success, user} = await findUser('idx', req.user.idx)
		if(success) res.render('mypage/form', {...user})
		else res.send(alert('회원 아님'))
	}
	catch (err) {
		next(createError(err))
	}
})
// 회원정보 수정 				POST : /mypage/user
router.post('/', async (req, res, next) => {
	try {
		const {ERROR} = req.app.locals
		const r = await updateUser(req.body)
		if(r) res.redirect('/')
		else res.send(alert(ERROR.SQL_ERROR))
	}
	catch(err) {
		next(createError(err))
	}
})
// api키 발행		 				POST : /mypage/user/api
router.post('/api', async (req, res, next) => {

})

module.exports = router