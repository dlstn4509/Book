/************* global require *************/
require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const passport = require('passport');
const passportModule = require('./passport');
const helmet = require('helmet');

const method = require('./middlewares/method-mw');

const logger = require('./middlewares/morgan-mw');
const session = require('./middlewares/session-mw');
const locals = require('./middlewares/locals-mw');
const langMW = require('./middlewares/lang-mw');

/*************** server init **************/
require('./modules/server-init')(app, process.env.PORT);

/*************** helmet init **************/
app.use(helmet({ contentSecurityPolicy: false }));

/*************** static init **************/
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'storages')));

/************** view engine ***************/
app.set('view engine', 'ejs');
app.set('views', './views');
app.locals.pretty = true;

/*************** middleware ***************/
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(method());
app.use(session(app));

/**************** passport ****************/ // 패스포트 세팅 무조건 넣음
passportModule(passport);
app.use(passport.initialize());
app.use(passport.session());

/***************** locals *****************/
app.use(locals);

/*************** logger init **************/
app.use(logger);

/*************** router init **************/
const bookRouter = require('./routes/book');
const apiBookRouter = require('./routes/api/book');
const authRouter = require('./routes/auth');
const apiAuthRouter = require('./routes/api/auth');
const mypageRouter = require('./routes/mypage');
const apiMypageRouter = require('./routes/api/mypage');

app.use(langMW);
app.use('/book', bookRouter);
app.use('/api/book', apiBookRouter);
app.use('/auth', authRouter);
app.use('/api/auth', apiAuthRouter);
app.use('/mypage', mypageRouter);
app.use('/api/mypage', apiMypageRouter);

/**************** error init **************/
const _404Router = require('./routes/error/404-router');
const _500Router = require('./routes/error/500-router');
const { Passport } = require('passport');
const { nextTick } = require('process');

app.use(_404Router);
app.use(_500Router);
