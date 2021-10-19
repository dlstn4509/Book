const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const { alert } = require('../../modules/util')
const { isUser, isGuest } = require('../../middlewares/auth-mw')
const { deleteUser } = require('../../models/auth/delete-user')

router.get('/', isUser, (req, res, next) => {
	req.app.locals.PAGE = 'WITHDRAWAL'
	req.app.locals.js = 'auth/withdrawal'
	req.app.locals.css = 'auth/withdrawal'
	req.app.locals.info = null
	res.status(200).render('auth/withdrawal')
})

router.post('/', isUser, async (req, res, next) => {
  // 실제 탈퇴 처리
	try {
    const { ALERT, ERROR } = req.app.locals;
    const user = { ...req.body, idx: req.user.idx, status: req.user.status }
		const { success } = await deleteUser(user)
    if(success) {
      req.logout()
      res.locals.user = null
      res.send(alert(ALERT.WITHDRAWAL))
    }
    else res.send(alert(ERROR.SQL_ERROR))
	}
	catch(err) {
		next(createError(err))
	}
})

module.exports = router