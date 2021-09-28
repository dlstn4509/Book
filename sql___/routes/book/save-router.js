const express = require('express')
const router = express.Router()
const {moveFile} = require('../../modules/util')
const {pool} = require('../../modules/mysql-init')
const createError = require('http-errors')
const uploader = require('../../middlewares/multer-book-mw')
const { isUser, isMyBook } = require('../../middlewares/auth-mw')
const { updateBook, createBook } = require('../../models/book')

router.post('/', isMyBook('body', 'U'), isUser, uploader.fields([{name: 'cover'}, {name: 'upfile'}]), async (req, res, next) => {
	try {
    let book = { ...req.body, fidx: req.session.user.idx }
		const r = (book._method === 'PUT' && book.idx) 
			? await createBook(book)
			: await updateBook(book)

    if(req.files) { // 파일이 있을때
      let fieldname;
      for(let [k, [v]] of Object.entries(req.files)) {
        fieldname = k.substr(0, 1).toUpperCase() // C or U
        if(isUpdate) { // 수정일때
          sql = " SELECT idx, savename FROM files WHERE fidx=? AND fieldname=? AND status=? "
          values = [idx, fieldname, '1']
          let [rsf] = await pool.execute(sql, values)
          if(rsf.length > 0) {
            sql = " UPDATE files SET status = '0' WHERE idx= " + rsf[0].idx
            await pool.execute(sql)
            await moveFile(rsf[0].savename)
          }
        }
        sql = " INSERT INTO files SET oriname=?, savename=?, mimetype=?, size=?, fieldname=?, fidx=? "
        values = [v.originalname, v.filename, v.mimetype, v.size, fieldname, (isUpdate ? idx : rs.insertId)]
        await pool.execute(sql, values)
      }
      res.redirect(`/${req.lang}/book`)
    }
  }
  catch(err) {
    next(createError(500, err))
  }
})

module.exports = router