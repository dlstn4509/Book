const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const {pool} = require('../../modules/mysql-init')

router.post('/:idx', async (req, res, next) => {
  let sql, values
  try {
    const { title, writer, content, idx } = req.body
    sql = 'UPDATE books SET title=?, writer=?, content=? WHERE idx=?'
    values = [title, writer, content, idx]
    const [rs] = await pool.execute(sql, values)
    if(rs.affectedRows === 1) res.redirect(`/${req.lang}/book`)
    else next(createError(500, '데이터가 수정되지 않았습니다.'))
  }
  catch(err) {
    next(createError(err))
  }
})


module.exports = router