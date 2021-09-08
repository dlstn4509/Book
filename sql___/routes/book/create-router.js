const express = require('express')
const router = express.Router()
const {error} = require('../../modules/util')
const {pool} = require('../../modules/mysql-init')
const uploader = require('../../middlewares/multer-book-mw')

router.post('/', uploader.fields([{name: 'cover'}, {name: 'upfile'}]), async (req, res, next) => {
  try {
    let sql, values;
    const { title, writer, content } = req.body
    sql = 'INSERT INTO books SET title=?, writer=?, content=?'
    values = [title, writer, content]
    const [rs] = await pool.execute(sql, values)

    if(req.file) { // 첨부파일이 존재 한다면
      const {originalname, filename, mimetype, size} = req.files
      sql = 'INSERT INTO files SET fidx=?, oriname=?, savename=?, mimetype=?, size=?'
      values = [rs.insertId, originalname, filename, mimetype, size]
      const [rs2] = await pool.execute(sql, values)
    }
     res.redirect('/book')
  }
  catch(err) {
    next(error(500, err))
  }
})


module.exports = router