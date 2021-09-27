/****************************** global require ****************/
require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()
const methodInit = require('./modules/method-init')
const logger = require('./middlewares/morgan-mw')
const session = require('./middlewares/session-mw')


/****************************** sever init ******************/
require('./modules/server-init')(app, process.env.PORT)


/****************************** view engine *******************/
app.set('view engine', 'ejs')
app.set('views', './views')
app.locals.pretty = true
app.locals.tabTitle = 'Express 게시판'
// app.locals 에 등록한 변수는 view에서 접근 가능
// (view에 모든값이 locals에 들어가 있다.)


/****************************** middleware ********************/
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(methodInit())
app.use(session(app))



/***************************** static init ********************/
app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/uploads', express.static(path.join(__dirname, 'storages')))

app.use(logger)



/***************************** router init ********************/
const langMW = require('./middlewares/lang-mw')
const bookRouter = require('./routes/book')
const authRouter = require('./routes/auth')
const apiBookRouter = require('./routes/api/book')
const apiAuthRouter = require('./routes/api/auth')

app.use(langMW)
app.use('/book', bookRouter)
app.use('/auth', authRouter)
app.use('/api/book', apiBookRouter)
app.use('/api/auth', apiAuthRouter)




/***************************** error init ********************/
const _404Router = require('./routes/error/404-router')
const _500Router = require('./routes/error/500-router')
app.use(_404Router)
app.use(_500Router)




