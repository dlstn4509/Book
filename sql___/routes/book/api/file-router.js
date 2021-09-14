const path = require('path')
const express = require('express')
const router = express.Router()
const { error, moveFile } = require('../../../modules/util')
const { pool } = require('../../../modules/mysql-init')


/* 
할일
1. 실제 파일을 옮긴다
2. files의 레코드를 status='0' 으로 바꾼다.
*/
router.delete('/', async (req, res, next) => {
	try {
		sql = "UPDATE files SET status='0' WHERE idx = " + req.query.idx
		await pool.execute(sql)
	
		sql = "SELECT savename FROM files WHERE idx = " + req.query.idx
		const [rs] = await pool.execute(sql)
	
		for(let {savename} of rs) {
			await moveFile(savename)
		}
	}
	catch(err) {
			res.status(500).json({err})
	}

	res.status(200).json({code: 200, result: 'success'})
})

module.exports = router