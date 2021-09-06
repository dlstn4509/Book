const path = require('path')
const moment = require('moment')
const express = require('express')
const router = express.Router()
const {error, cutTail, chgStatus} = require('../../modules/util')
const {pool} = require('../../modules/mysql-init')
const createPager = require('../../modules/pager-init')

router.get(['/', '/:page'], async (req, res, next) => {
  try {
    let sql = "SELECT COUNT(idx) FROM books"
    const [[cnt]] = await pool.execute(sql)
    const totalRecord = cnt['COUNT(idx)']
    const page = req.params.page || 1
    const pager = createPager(page, totalRecord, 2, 3)
    
    sql = 'SELECT * FROM books ORDER BY idx DESC LIMIT ?, ?'
    const values = [pager.startIdx.toString(), pager.listCnt.toString()]
    const [rs] = await pool.execute(sql, values) 
    
    const books = rs.map(v => {
      v.createdAt = moment(v.createdAt).format('YYYY-MM-DD')
      v.content = cutTail(v.content)
      v.writer = v.writer || '미상'
      v.status = chgStatus(v.status)
      return v;
    })    

    const title =  '도서 목록'
    const description =  '등록할 도서를 아래에서 입력하세요'
    const js =  'book/list'
    const css =  'book/list'
    
    res.status(200).render('book/list', {title, description, js, css, books, pager})
    // res.status(200).json(rs)
   
  }
  catch(err) {
    next(error(err))
  }
})


module.exports = router