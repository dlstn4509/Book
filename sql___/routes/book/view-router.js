const path = require('path')
const express = require('express')
const router = express.Router()
const { error, chgStatus, relPath } = require('../../modules/util')
const { pool } = require('../../modules/mysql-init')
const moment = require('moment')

router.get('/:idx',  async (req, res, next) => {
	let sql, values;
	try {
		sql = `SELECT B.*, F.oriname, F.savename
					FROM books B LEFT JOIN files F
					ON B.idx = F.fidx
					WHERE B.idx=?`
		values = [req.params.idx]
		const [[book]] = await pool.execute(sql, values)

		book.createdAt = moment(book.createdAt).format('YYYY-MM-DD HH:mm:ss')
		book.writer = book.writer || '미상'
		book.status = chgStatus(book.status)
		book.savename = relPath(book.savename)
		
		const title = '도서 상세 정보'
		const description = '선택하신 도서의 상세 정보입니다.'
		const css = 'book/view'
		const js = 'book/view'

		if(book) res.status(200).render('book/view.ejs', {title, description, css, js, book})
		else next(error(400, "존재하지 않는 데이터입니다."))
	}
	catch(err) {
		next(error(500, err))
	}
})

module.exports = router