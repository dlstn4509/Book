const express = require('express')
const app = express()
const path = require('path')
const uploader = require('./middlewares/multer-mw')

/****************************** view engine *******************/
app.set('view engine', 'ejs')
app.set('views', './views')
app.locals.pretty = true


require('dotenv').config()
require('./modules/server-init')(app, process.env.PORT)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', express.static(path.join(__dirname, 'public')))

app.post('/file', uploader.single('upfile'), (req, res, next) => {
	res.json({...req.body, ...req.file})
})






/***************************** error init ********************/
const _404Router = require('./routes/error/404-router')
const _500Router = require('./routes/error/500-router')
app.use(_404Router)
app.use(_500Router)