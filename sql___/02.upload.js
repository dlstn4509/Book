// https://github.com/expressjs/multer/blob/master/doc/README-ko.md

const express = require('express')
const app = express()
const path = require('path')
const multer = require('multer')
const moment = require('moment')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
		const folder = path.join(__dirname, 'storages')
    cb(null, folder)
  },
  filename: (req, file, cb) => {
		const ext = file.originalname.split('.').pop() // 확장자
		const filename = new Date().getTime() + '.' + ext
    cb(null, filename)
  }
})
const limits = {fileSSize : 10000}
const upload = multer({ storage, limits })

require('dotenv').config()
require('./modules/server-init')(app, process.env.PORT)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', express.static(path.join(__dirname, 'public')))

app.post('/file', upload.single('upfile'), (req, res, next) => {
	res.json({...req.body, ...req.file})
})



