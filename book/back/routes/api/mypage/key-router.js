const express = require('express')
const { isUser } = require('../../../middlewares/auth-mw')
const router = express.Router()
const { updateKey } = require('../../../models/auth')

router.get('/', isUser, async (req, res, next) => {
	// http://127.0.0.1:3000/api/mypage/key
	try {
		if(req.user.idx) {
			let { ERROR } = req.app.locals
			let { success, apikey } = await updateKey(req.user.idx)
			if(success) res.status(200).json({ code: 200, apikey })
			else res.status(500).json(ERROR.SQL_ERROR)
		}
		else res.status(401).json(ERROR.AUTH_ERROR)
	}
	catch(err) {
		res.status(500).json(err)
	}
})


module.exports = router