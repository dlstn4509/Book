const path = require('path')
const express = require('express')
const router = express.Router()
const { alert } = require('../../modules/util')
const { pool } = require('../../modules/mysql-init')
const { isUser } = require('../../middlewares/auth-mw')

router.get('/', isUser, (req, res, next) => { // logout 처리
	req.session.destroy() // 세션 삭제
	res.locals.user = null
	res.send(alert('로그아웃 되었습니다.'))
})

module.exports = router