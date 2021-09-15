/* 
    1. 위의 Query가 INSERT라면 rs = {insertId: 15, affectedRows: 1...}
    2. 위의 Query가 UPDATE라면 rs = {affectedRows: 1...}
    3. files Query는 아래와 같다
      1)신규글이라면 아래와 같이 INSERT만 하면 된다
        INSERT INTO files SET oriname=?, savename=?, mimetype=?, size=?, fieldname=?, fidx=?  (fidx는 rs.insertId)
      2)UPDATE라면 일단 k.substr(0, 1).toUpperCase() ? 'C' : 'U' 분기하고, 기존레코드가 있는지 체크한 후 있다면 기존 레코드의 status='0' and 파일도 옮긴다.
        그리고 1)의 INSERT를 실행한다.
        UPDATE files SET status='0' WHERE idx=?  (idx는 SELECT * FROM files WHERE fidx = idx)
*/

const express = require('express')
const router = express.Router()
const {error} = require('../../modules/util')
const {pool} = require('../../modules/mysql-init')
const uploader = require('../../middlewares/multer-book-mw')

router.post('/', uploader.fields([{name: 'cover'}, {name: 'upfile'}]), async (req, res, next) => {
  let sql, values
	try {
		const { title, writer, content, _method, idx } = req.body
		const isUpdate = (_method === 'PUT' && idx)
		sql = isUpdate ? " UPDATE books " : " INSERT INTO books "
		sql += " SET title=?, writer=?, content=? "
		sql += isUpdate ? " WHERE idx= "+idx : ""
		values = [title, writer, content]
		const [rs] = await pool.execute(sql, values)

    if(req.files) {
      let fieldname;
      for(let [k, [v]] of Object.entries(req.files)) {
        fieldname = k.substr(0, 1).toUpperCase() // C or U
        if(isUpdate) {
          sql = " SELECT idx, savename FROM files WHERE fidx=? AND fieldname=? AND status=? "
          values = [idx, fieldname, '1']
          let [rsf] = await pool.execute(sql, values)
          if(rsf.length > 0) {
            sql = " UPDATE files SET status = '0' WHERE idx= " + rsf[0].idx
            await pool.execute(sql)
            await moveFile(rsf[0].savename)
          }
        }
        sql = " INSERT INTO files oriname=?, savename=?, mimetype=?, size=?, fieldname=?, fidx=? "
        values = [v.originalname, v.filename, v.mimetype, v.size, v.fieldname, (isUpdate ? idx : rs.insertId)]
        await pool.execute(sql, values)
      }
      res.redirect(`/${req.lang}/book`)
    }

/* 
    if(req.files) { // 첨부파일이 존재 한다면
      for(let [k, [v]] of Object.entries(req.files)) {
        let {originalname, filename, mimetype, size} = v
        sql = (_method === 'PUT' && idx) ? " UPDATE files " : " INSERT INTO files "
        sql += " SET oriname=?, savename=?, mimetype=?, size=?, fieldname=? "

        values = [rs.insertId, originalname, filename, mimetype, size, k.substr(0, 1).toUpperCase()]
        await pool.execute(sql, values)
      }
    } */

    // res.redirect(`/${req.lang}/book`)
  }
  catch(err) {
    next(error(500, err))
  }
})

router.put('/', (req, res, next) => {
  res.send('받음')
})

module.exports = router